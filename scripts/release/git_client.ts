import {gitP, SimpleGit} from 'simple-git';

/**
 * @fileoverview A module that exports a convenience class to interface with
 * git.
 */

/**
 * An interface that describes a git commit.
 */
export interface Change {
  /** A commit hash. */
  hash: string;
  /** A commit message. */
  message: string;
}

/**
 * A class that provides an stripped-down interface for git.
 */
export class GitClient {
  private readonly simpleGit: SimpleGit;

  /**
   * Constructs a new GitClient.
   * @param path The path that the git CLI should treat as its working
   * directory.
   */
  constructor(path: string) {
    this.simpleGit = gitP(path);
  }

  /**
   * Returns a list of commits in the given commit range, in order of ascending
   * commit time. Merge commits are excluded.
   * @param range The range of the list of commits.
   * @param range.from The _exclusive_ start of the range.
   * @param range.to The _inclusive_ end of the range.
   * @returns A list of commits.
   */
  async listCommits({from, to}: {from: string; to: string}): Promise<Change[]> {
    return [
      ...(await this.simpleGit.log(['--no-merges', `${from}..${to}`])).all,
    ].reverse();
  }

  /**
   * Returns the contents of a file at the given commit.
   * @param commitish The commit at which the file should be checked out.
   * @param file The path to the file whose contents should be returned.
   * @returns The contents of the file.
   */
  async getFile(commitish: string, file: string) {
    return await this.simpleGit.show([`${commitish}:${file}`]);
  }
}
