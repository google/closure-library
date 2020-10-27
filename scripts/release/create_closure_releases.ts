import {Change, GitClient} from './git_client';
import {GitHubClient} from './github_client';

/**
 * @fileoverview A module that exports `createClosureReleases`, which
 * asynchronously creates GitHub Releases for Closure Library when a new one is
 * warranted. This module can be run as a script, where `createClosureReleases`
 * is simply invoked immediately.
 */

/**
 * Used for testing only, so that a client class constructor can be spied on
 * and mocked.
 */
export const clientImplementationsForTesting = {
  GitHubClient,
  GitClient,
};

/**
 * A regex to capture the major version number in a package.json version field.
 */
const CAPTURE_PJSON_MAJOR_VERSION = /^v?(\d+)\.\d+\.\d+$/;

/** A regex to match release notes in a commit message. */
const MATCH_RELNOTES = /RELNOTES(?:\[(INC|NEW)\])?:(.*)/;
/** A regex to match indications of a rollback in a commit message. */
const MATCH_ROLLBACK = /(?:roll(?:[s-]|\s+)?back|revert).*\s([A-Fa-f0-9]{7,})[\s.]/i;
/**
 * A regex to match indications that a commit message shouldn't be reflected in
 * a GitHub Release body.
 */
const MATCH_INVALID_NOTE = /(none|n\/?a)\.?$/i;

/**
 * The allowed change types for release notes (NONE being implicit when no
 * change type is specified.) and corresponding GitHub Release body header.
 */
const RELEASE_HEADINGS = [
  {
    changeType: 'NEW',
    heading: '**New Additions**',
  },
  {
    changeType: 'INC',
    heading: '**Backwards Incompatible Changes**',
  },
  {
    changeType: 'NONE',
    heading: '**Other Changes**',
  },
];

/**
 * Checks whether two commit hashes represent the same commit.
 * This check is commutative.
 * @param a A first hash.
 * @param b A second hash.
 * @returns Whether two commit hashes represent the same commit.
 */
function commitHashesEqual(a: string, b: string) {
  return a.startsWith(b) || b.startsWith(a);
}

/**
 * Escape GitHub Markdown in the provided string.
 * @param note The string to escape.
 * @returns The escaped string.
 */
function escapeGitHubMarkdown(note: string) {
  // "Escape" GitHub mentions (i.e., "@user") by surrounding in backticks.
  note = note.replace(/(@\w+)/g, '`$1`');
  // Escape known markdown characters with a leading backslash.
  note = note.replace(/([*_(){}#!.<>[\]])/g, '\\$1');
  return note;
}

/**
 * Creates a GitHub Release body based on a list of git commit hashes and
 * messages.
 * @param changes The list of git commit information.
 * @returns A string representing a Markdown-formatted GitHub release body.
 */
function createReleaseNotes(changes: Change[]) {
  // Populate `releaseNotes` based on `changes`.
  // One entry in `releaseNotes` may correspond to several entries in `changes`.
  const releaseNotes: Array<{
    changeType: string;
    noteText: string;
    hashes: string[];
  }> = [];
  for (const {hash, message} of changes) {
    // Don't include a message like "RELNOTES: n/a".
    if (MATCH_INVALID_NOTE.test(message)) {
      continue;
    }

    const rollback = MATCH_ROLLBACK.exec(message);
    if (rollback) {
      // If we find a rollback commit, try to find the original change that got
      // rolled back by this one via commit hash.
      const rolledbackHash = rollback[1];
      const matchingChange = releaseNotes.find(change =>
        change.hashes.some(hash => commitHashesEqual(hash, rolledbackHash))
      );
      if (matchingChange) {
        matchingChange.hashes = matchingChange.hashes.filter(
          hash => !commitHashesEqual(hash, rolledbackHash)
        );
      }
    } else {
      const matchedRelnotes = MATCH_RELNOTES.exec(message);
      if (matchedRelnotes) {
        const changeType = matchedRelnotes[1] || 'NONE';
        const noteText = escapeGitHubMarkdown(matchedRelnotes[2].trim());
        if (noteText) {
          const matchingChange = releaseNotes.find(
            change =>
              change.noteText === noteText && change.changeType === changeType
          );
          if (matchingChange) {
            // Merge entries with the same release notes, for the sake of
            // de-duplicating repetitive changes.
            matchingChange.hashes.push(hash);
          } else {
            releaseNotes.push({
              changeType,
              noteText,
              hashes: [hash],
            });
          }
        }
      }
    }
  }

  // Populate `body` with formatted release notes.
  let body = '';
  for (const {changeType, heading} of RELEASE_HEADINGS) {
    const formattedChangesForHeading = releaseNotes
      .filter(changeNote => changeNote.changeType === changeType)
      // It's possible to have an empty hashes list if a change was rolled back.
      .filter(({hashes}) => hashes.length !== 0)
      .map(({noteText, hashes}) => `* ${noteText} (${hashes.join(', ')})`)
      .join('\n');

    // Conditionally append a section and its header to `body` if the section
    // isn't empty.
    // We don't want to add headers for empty sections.
    if (formattedChangesForHeading) {
      if (body) body += '\n';
      body += `${heading}\n${formattedChangesForHeading}\n`;
    }
  }
  if (!body) {
    body = 'No release notes.';
  }
  return body;
}

/**
 * Extracts and returns the major version from package.json in the repo managed
 * by `git` at commit `hash`.
 * @param git The GitClient instance to use.
 * @param hash The commit hash at which package.json should be read.
 * @returns The major version string from package.json, prefixed with a 'v'.
 */
async function getMajorVersionAtCommit(git: GitClient, hash: string) {
  const pJsonRaw = await git.getFile(hash, 'package.json');
  const pJson = JSON.parse(pJsonRaw);
  const matchedPJsonVersion = CAPTURE_PJSON_MAJOR_VERSION.exec(pJson.version);
  if (!matchedPJsonVersion) {
    throw new Error(
      `Bad package.json version string '${pJson.version}' @ ${hash}`
    );
  }
  return `v${matchedPJsonVersion[1]}`;
}

/**
 * Given an API token, create GitHub Releases for each major version bump to
 * Closure Library since the last GitHub Release.
 * @param gitHubApiToken The GitHub API token.
 */
export async function createClosureReleases(gitHubApiToken: string) {
  // Initialize clients.
  const impls = clientImplementationsForTesting;
  const git = new impls.GitClient(process.cwd());
  const github = new impls.GitHubClient({
    owner: 'google',
    repo: 'closure-library',
    userAgent: 'Google-Closure-Library',
    token: gitHubApiToken,
  });

  // Get the commit SHA of the latest GitHub release.
  const from = await github.getLatestRelease();
  const versionAtLastRelease = await getMajorVersionAtCommit(git, from);

  // Get the list of commits since `from`.
  const commits = await git.listCommits({from, to: 'HEAD'});

  // Identify the commits in which the package.json major version changed.
  const pJsonVersions: Array<{version: string; changes: Change[]}> = [];
  // We need to push a placeholder object for the last release. This helps us
  // figure out whether the immediate next commit has a version bump or not.
  pJsonVersions.push({version: versionAtLastRelease, changes: []});
  let seenCommits: Change[] = [];
  for (const commit of commits) {
    const version = await getMajorVersionAtCommit(git, commit.hash);
    seenCommits.push(commit);
    if (!pJsonVersions.some(entry => entry.version === version)) {
      pJsonVersions.push({
        version,
        changes: seenCommits,
      });
      seenCommits = [];
    }
  }
  // Remove the placeholder object mentioned above.
  pJsonVersions.shift();

  // Draft a new GitHub release for each package.json version change seen.
  for (const {version, changes} of pJsonVersions) {
    const name = `Closure Library ${version}`;
    const tagName = version;
    const commit = changes[changes.length - 1].hash;
    const body = createReleaseNotes(changes);
    // Create the release
    const url = await github.draftRelease({tagName, commit, name, body});
    console.log(`Drafted release for ${version} at ${url}`);
  }
}

// Run this module as a script if specified as the entry point.
if (require.main === module) {
  if (!process.env.GITHUB_TOKEN) {
    console.error('Need GITHUB_TOKEN env var to create releases.');
    process.exit(1);
  }
  createClosureReleases(process.env.GITHUB_TOKEN).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
