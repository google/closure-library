# Copyright 2009 The Closure Library Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


"""Scans a source JS file for its provided and required namespaces.

Simple class to scan a JavaScript file and express its dependencies.
"""




import re

_BASE_REGEX_STRING = '^\s*goog\.%s\(\s*[\'"](.+)[\'"]\s*\)'
_PROVIDE_REGEX = re.compile(_BASE_REGEX_STRING % 'provide')
_REQUIRES_REGEX = re.compile(_BASE_REGEX_STRING % 'require')


class Source(object):
  """Scans a JavaScript source for its provided and required namespaces."""

  def __init__(self, source):
    """Initialize a source.

    Args:
      source: str, The JavaScript source.
    """

    self.provides = set()
    self.requires = set()

    self._source = source
    self._ScanSource()

  def __str__(self):
    return 'Source %s' % self._path

  def GetSource(self):
    """Get the source as a string."""
    return self._source

  def _ScanSource(self):
    """Fill in provides and requires by scanning the source."""

    # TODO: Strip source comments first, as these might be in a comment
    # block.  RegExes can be borrowed from other projects.
    source = self.GetSource()
    for line in source.splitlines():
      match = _PROVIDE_REGEX.match(line)
      if match:
        self.provides.add(match.group(1))
      match = _REQUIRES_REGEX.match(line)
      if match:
        self.requires.add(match.group(1))


def GetFileContents(path):
  """Get a file's contents as a string.

  Args:
    path: str, Path to file.

  Returns:
    str, Contents of file.

  Raises:
    IOError: An error occurred opening or reading the file.

  """
  fileobj = open(path)
  try:
    return fileobj.read()
  finally:
    fileobj.close()
