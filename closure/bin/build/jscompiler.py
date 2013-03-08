# Copyright 2010 The Closure Library Authors. All Rights Reserved.
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

"""Utility to use the Closure Compiler CLI from Python."""


import logging
import re
import subprocess


# Pulls a version number from the first line of 'java -version'.
# Versions are in the format of n.n.*. See
# http://www.oracle.com/technetwork/java/javase/versioning-naming-139433.html
_VERSION_REGEX = re.compile(r'"([0-9]\.[0-9]+)')


class JsCompilerError(Exception):
  """Raised if there's an error in calling the compiler."""
  pass


def _GetJavaVersionString():
  """Get the version string from the Java VM."""
  return subprocess.check_output(['java', '-version'], stderr=subprocess.STDOUT)


def _ParseJavaVersion(version_string):
  """Returns the string for the current version of Java installed.

  Args:
    version_string: String of the Java version (e.g. '1.7.2-ea').

  Returns:
    The major and minor versions, as a float (e.g. 1.7).
  """
  match = _VERSION_REGEX.search(version_string)
  if match:
    return float(match.group(1))


def _GetJsCompilerArgs(compiler_jar_path, java_version, source_paths,
                       jvm_flags, compiler_flags):
  """Assembles arguments for call to JsCompiler."""

  if java_version < 1.6:
    raise JsCompilerError('Closure Compiler requires Java 1.6 or higher. '
                          'Please visit http://www.java.com/getjava')

  args = ['java']

  # Add JVM flags we believe will produce the best performance.  See
  # https://groups.google.com/forum/#!topic/closure-library-discuss/7w_O9-vzlj4

  # Attempt 32-bit mode if we're <= Java 1.7
  if java_version >= 1.7:
    args += ['-d32']

  # Prefer the "client" VM.
  args += ['-client']

  # Add JVM flags, if any
  if jvm_flags:
    args += jvm_flags

  # Add the application JAR.
  args += ['-jar', compiler_jar_path]

  for path in source_paths:
    args += ['--js', path]

  # Add compiler flags, if any.
  if compiler_flags:
    args += compiler_flags

  return args


def Compile(compiler_jar_path, source_paths,
            jvm_flags=None,
            compiler_flags=None):
  """Prepares command-line call to Closure Compiler.

  Args:
    compiler_jar_path: Path to the Closure compiler .jar file.
    source_paths: Source paths to build, in order.
    jvm_flags: A list of additional flags to pass on to JVM.
    compiler_flags: A list of additional flags to pass on to Closure Compiler.

  Returns:
    The compiled source, as a string, or None if compilation failed.
  """

  java_version = _ParseJavaVersion(_GetJavaVersionString())

  args = _GetJsCompilerArgs(
      compiler_jar_path, java_version, source_paths, jvm_flags, compiler_flags)

  logging.info('Compiling with the following command: %s', ' '.join(args))

  try:
    return subprocess.check_output(args)
  except subprocess.CalledProcessError:
    raise JsCompilerError('JavaScript compilation failed.')
