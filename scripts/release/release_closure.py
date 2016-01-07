#!/usr/bin/env python
#
# Script to create new draft Closure Library release through the GitHub REST
# API.
#
# Usage from the root of a closure-library Git repo:
#   release_closure.py -c=<COMMIT_SHA>

import argparse
import collections
import httplib
import json
import os
import re
import subprocess
import sys
import time

PARSER = argparse.ArgumentParser(description='Closure Library Release Script')
PARSER.add_argument('-c', '--commit', required=True,
                    help='The Git commit SHA to mark as new release')

ARGS = PARSER.parse_args()

COMMIT_ID = ARGS.commit

GITHUB_API_DOMAIN = 'api.github.com'

OWNER_AND_REPO = 'google/closure-library'
GIT_REPO_URL = 'https://github.com/' + OWNER_AND_REPO + '.git'
REPO_ENDPOINT = '/repos/' + OWNER_AND_REPO
RELEASES_ENDPOINT = REPO_ENDPOINT + '/releases'
LATEST_RELEASE_ENDPOINT = RELEASES_ENDPOINT + '/latest'

RELNOTE_RE = re.compile('RELNOTES(\[(INC|NEW)\])?:\s*(.*)')

class GitHubClient:
  """Client used to communicate with Git API."""

  def __init__(self):
    self.connection = httplib.HTTPSConnection(GITHUB_API_DOMAIN)

  def GetLatestRelease(self):
    """Gets the commit SHA of the latest Closure Library release.

    Returns:
      A string representing the release commit SHA.
    Raises:
      Exception: If an HTTP error occurs fetching the release.
    """
    release_info = self._Get(LATEST_RELEASE_ENDPOINT)
    latest = release_info['target_commitish']

    # The API returns "master" if the last release is at head. We want the
    # commit SHA.
    if latest == 'master':
      latest = subprocess.check_output('git rev-parse origin/master',
                                       shell=True)

    return latest.strip()

  def CreateNewRelease(self, tag, target_commit, name, body, draft, prelease):
    """Creates new release at specified commit SHA.

    Sends authorized HTTP request to the GitHub API to create the new release.
    The payload is created with the arguments passed in.

    Args:
      tag: {string} The name of the tagged release.
      target_commit: {string} The commit at which to do the release.
      name: {string} Commit name visible on releases page.
      body: {string} The release description body. Can be markdown.
      draft: {boolean} Whether the release is a draft release (i.e., publicly
          visible).
      prelease: {boolean} Whether the release is considered the final/stable
          release.
    Raises:
      Exception: If an HTTP error occurs fetching the release.
    """
    payload = json.dumps({'tag_name': tag,
                          'target_commitish': target_commit,
                          'name': name,
                          'body': body,
                          'draft': draft,
                          'prelease': prelease})
    headers = {'Accept': 'application/json'}
    response = self._Post((RELEASES_ENDPOINT + '?access_token=' +
                          self._GetAccessToken()),
                          payload, headers)
    print ('Successfully created new release %s. Verify the release draft '
           'here:\n\n %s' % (tag, response['html_url']))

  def _HttpRequest(self, verb, url, params, headers):
    """Sends HTTP request to GH API.

    Args:
      verb: {string} The HTTP verb of the request.
      url: {string} The relative URL of the request.
      params: {string} Either the URL params for GET requests or the POST
          raw entity-body. For GET requests, the params should be url encoded.
      headers: {dictionary} The HTTP headers to send with the request.
    Returns:
      The request's response text.
    Raises:
      Exception: If request doesn't return 200 or 201 status code.
    """
    headers['User-Agent'] = 'Google-Closure-Library'
    self.connection.request(verb, url, params, headers)
    response =  self.connection.getresponse()
    if response.status == httplib.OK or response.status == httplib.CREATED:
      return json.loads(response.read())
    else:
      raise Exception('Request to %s failed with %s %s.\n\n%s' %
                      (url, response.status, response.reason, response.read()))

  def _Get(self, url, params='', headers={}):
    return self._HttpRequest('GET', url, params, headers)

  def _Post(self, url, body='', headers={}):
    return self._HttpRequest('POST', url, body, headers)

  def _GetAccessToken(self):
    try:
      return os.environ['GITHUB_API_TOKEN']
    except KeyError:
      sys.exit('No GITHUB_API_TOKEN environment variable found!')


class Release:
  """Utility class to perform Closure releases."""

  def __init__(self):
    self.client = GitHubClient()

  def NewRelease(self, release_commit):
    """Creates new release at specified commit SHA.

    Args:
      tag: {string} The name of the tagged release.
      target_commit: {string} The commit at which to do the release.
      name: {string} Commit name visible on releases page.
      body: {string} The release description body. Can be markdown.
      draft: {boolean} Whether the release is a draft release (i.e., publicly
          visible).
      prelease: {boolean} Whether the release is considered the final/stable
          release.
    Raises:
      Exception: If an HTTP error occurs fetching the release.
    """
    latest = self.client.GetLatestRelease()

    if release_commit == latest:
      sys.exit('Specified commit id is already the latest release. '
               'No action taken.')

    relnotes = self._GetReleaseNotes(latest, release_commit)

    tag = 'v' + time.strftime('%Y%m%d')
    name = 'Closure Library ' + tag

    self.client.CreateNewRelease(tag, release_commit, name,
                                 self._GetFormattedReleaseBody(relnotes),
                                 True, False)

  def _GetCommitLog(self, from_commit, to_commit):
    """Gets commit messages between two commits.

    Args:
      from_commit: {string} Commit SHA of where to start search.
      to_commit: {string} Commit SHA of where to end search.
    Returns:
      List of raw commit message strings.
    Raises:
      Exception: No commit messages are found between commits.
    """
    git_cmd = ('git log %s..%s --format=%%B%%x1e --no-merges' %
               (from_commit, to_commit));
    raw_logs = subprocess.check_output(git_cmd, shell=True)
    if len(raw_logs):
      return raw_logs.strip('\n\x1e').split('\x1e')
    else:
      raise Exception('No commit messages found between %s and %s.' %
                      (from_commit, to_commit))

  def _GetReleaseNotes(self, from_commit, to_commit):
    """Gets release notes between two commits.

    Gets the release notes between two commits by parsing the "RELNOTES" tags
    from commit messages.

    Args:
      from_commit: {string} Commit SHA of where to start search.
      to_commit: {string} Commit SHA of where to end search.
    Returns:
      List of tuples representing the release type and its note. For example:
        [('NEW', 'New change'), ('INC', 'Incompatible change'),
         ('NONE', 'Other change')]
    """
    logs = self._GetCommitLog(from_commit, to_commit)
    relnotes = []

    for log in logs:
      change_type = 'NONE'
      results = RELNOTE_RE.search(log)
      if results is not None:
        groups = results.groups()
        if groups[1] is not None:
          change_type = groups[1]
        relnotes.append((change_type, groups[2]))

    return relnotes

  def _GetFormattedReleaseBody(self, relnotes):
    """Creates a markdown release description body."""
    release_info = collections.OrderedDict([
        ('NEW', {'notes': [], 'heading': '**New Additions**'}),
        ('INC', {'notes': [], 'heading': '**Backwards Incompatible Changes**'}),
        ('NONE', {'notes': [], 'heading': '**Other Changes**'})
    ])

    for reltype, note in relnotes:
      if note:
        release_info[reltype]['notes'].append('* ' + note)

    body = ''
    for reltype, content in release_info.items():
      if len(content['notes']):
        body += content['heading'] + '\n' + '\n'.join(content['notes']) + '\n\n'

    if not body:
      body = 'No release notes.'

    return body.strip()


def main():
  release = Release()

  release.NewRelease(COMMIT_ID)

  sys.exit(0)


if __name__ == '__main__':
  main()
