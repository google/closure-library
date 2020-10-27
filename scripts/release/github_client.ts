import {Octokit} from '@octokit/rest';

/**
 * @fileoverview A module that exports a convenience class to interface with the
 * GitHub REST API.
 */

/**
 * A class that provides an stripped-down interface for the GitHub REST API.
 */
export class GitHubClient {
  private readonly owner: string;
  private readonly repo: string;
  private readonly octokit: Octokit;

  /**
   * Constructs a new GitHubClient.
   * @param options Options for constructing this GitHubClient.
   * @param options.owner The owner of the repository.
   * @param options.repo The repository name.
   * @param options.userAgent A unique user-agent for this application, as
   * requested in GitHub API documentation.
   * @param options.token A GitHub API token.
   */
  constructor({
    owner,
    repo,
    userAgent,
    token,
  }: {
    owner: string;
    repo: string;
    userAgent: string;
    token: string;
  }) {
    this.owner = owner;
    this.repo = repo;
    this.octokit = new Octokit({
      auth: token,
      userAgent,
    });
  }

  /**
   * Returns the hash of the commit tagged under the latest GitHub Release.
   * @returns The hash of the commit tagged under the latest GitHub Release.
   */
  async getLatestRelease() {
    const {data} = await this.octokit.repos.getLatestRelease({
      owner: this.owner,
      repo: this.repo,
    });
    return data.target_commitish;
  }

  /**
   * Drafts a new GitHub Release.
   * @param options Options for drafting the GitHub Release.
   * @param options.tagName The name of the tag to associate with this release.
   * @param options.commit The commit to tag for this release.
   * @param options.name The name of the release.
   * @param options.body The body text for the release.
   * @returns The URL to the GitHub Web UI for managing the drafted release.
   */
  async draftRelease({
    tagName,
    commit,
    name,
    body,
  }: {
    tagName: string;
    commit: string;
    name: string;
    body: string;
  }) {
    const {data} = await this.octokit.repos.createRelease({
      owner: this.owner,
      repo: this.repo,
      tag_name: tagName,
      target_commitish: commit,
      name,
      body,
      draft: true,
    });
    return data.html_url;
  }
}
