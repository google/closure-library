/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A utility to check that all files adhere to Google open-source standards.
 */

const {promises: fs} = require('fs');
const {exec} = require('child_process');
const path = require('path');
const {promisify} = require('util');

const IGNORED_EXTENSIONS = ['.gif', '.jpg', '.png', '.txt', '.data',
'.json', '.enc', '.exe', '.yml'];
const IGNORED_FILES = [
  'AUTHORS',
  'CONTRIBUTING',
  'LICENSE',
  'README.md',
  '.npmignore',
  'closure-deps/AUTHORS',
  'closure-deps/CONTRIBUTING',
  'closure-deps/LICENSE',
  'closure-deps/README.md',
  'closure/known_issues/testdata/closure_library_warnings.txt'
];

const APACHE_LICENSE_REGEXES = [
  /apache license.*2\.0/i,
  /SPDX-License-Identifier: Apache-2.0/
];
const CC_BY_LICENSE_REGEXES = [
  /Documentation licensed under CC BY 4\.0/,
  /License available at https:\/\/creativecommons\.org\/licenses\/by\/4\.0\//
];
const CONFORMANCE_ALLOWLIST_REGEX = /whitelist: \'(?!closurei\/)/i;
const CLOSURE_AUTHORS_COPYRIGHT_REGEX = /Copyright( 20\d\d)? The Closure Library Authors/;
const DOC_FILE_REGEX = /(?:^doc\/.*\.html|\.md)$/;
const GOOGLE_COPYRIGHT_REGEX = /copyright.{,70}[^@]google/i;

const CONFORMANCE_PROTO_PATH = 'closure/goog/conformance_proto.txt';

const execP = promisify(exec);

async function* yieldClosureFiles() {
  const {stdout} = await execP('git ls-files');
  const files = stdout.split('\n').filter(x => x);
  for (const filePath of files) {
    const ext = path.extname(filePath);
    if (IGNORED_EXTENSIONS.includes(ext) ||
    IGNORED_FILES.includes(filePath) ||
    filePath.startsWith('third_party'))
      continue;
    yield {
      filePath,
      contents: (await fs.readFile(filePath, 'utf8')).split('\n')
    };
  }
}

/**
 * A collection of licensing and file reference checks for open-sourced Closure
 * files.
 */
class ClosureOSSChecker {
  /**
   * Checks whether a conformance textproto file contains only Closure paths.
   * @param {string} filePath The path to conformance_proto.txt.
   * @param {!Array<string>} contents The contents of conformance_proto.txt.
   * @returns {!Array<string>} A list of error strings. An empty list indicates
   * that the check passes.
   */
  static hasOnlyClosurePathsInConformance(filePath, contents) {
    const errors = [];
    let lineNo = 1;
    for (const line of contents) {
      if (CONFORMANCE_ALLOWLIST_REGEX.test(line)) {
        errors.push(`${filePath}: Non-Closure path found on line ${lineNo}`);
      }
      lineNo++;
    }
    return errors;
  }

  /**
   * Checks whether the given file has a copyright notice for Closure Authors.
   * @param {string} filePath The path to the file to scan.
   * @param {!Array<string>} contents The contents of a file to scan.
   * @returns {!Array<string>} A list of error strings. An empty list indicates
   * that the check passes.
   */
  static hasClosureCopyright(filePath, contents) {
    for (const line of contents) {
      if (CLOSURE_AUTHORS_COPYRIGHT_REGEX.test(line)) {
        return [];
      }
    }
    return [`${filePath}: Could not find Closure Authors copyright in file.`];
  }

  /**
   * Checks whether the given file mentions the Apache 2 license.
   * @param {string} filePath The path to the file to scan.
   * @param {!Array<string>} contents The contents of a file to scan.
   * @returns {!Array<string>} A list of error strings. An empty list indicates
   * that the check passes.
   */
  static mentionsApache(filePath, contents) {
    for (const line of contents) {
      if (APACHE_LICENSE_REGEXES.some(regex => regex.test(line))) {
        return [];
      }
    }
    return [`${filePath}: File does not mention Apache License 2.0`];
  }

  /**
   * Checks whether the given file mentions the CC BY license.
   * @param {string} filePath The path to the file to scan.
   * @param {!Array<string>} contents The contents of a file to scan.
   * @returns {!Array<string>} A list of error strings. An empty list indicates
   * that the check passes.
   */
  static mentionsCCBYLicense(filePath, contents) {
    let remaining = CC_BY_LICENSE_REGEXES;
    for (const line of contents) {
      remaining = remaining.filter(regex => !regex.test(line));
      if (remaining.length === 0) {
        return [];
      }
    }
    return [`${filePath}: Documentation file does not mention CC BY 4.0 license`];
  }

  /**
   * Checks whether the given file is free of any Google copyright notices.
   * @param {string} filePath The path to the file to scan.
   * @param {!Array<string>} contents The contents of a file to scan.
   * @returns {!Array<string>} A list of error strings. An empty list indicates
   * that the check passes.
   */
  static omitsGoogleCopyright(filePath, contents) {
    const errors = [];
    let lineNo = 1;
    for (const line of contents) {
      if (GOOGLE_COPYRIGHT_REGEX.test(line)) {
        errors.push(`${filePath}: Copyright Google statement found on line ${lineNo}`);
      }
      lineNo++;
    }
    return errors;
  }
}
 
 /**
  * Checks that open-sourced files in this repository satisfy licensing and file
  * reference checks.
  * @return {!Promise<number>} The exit code.
  */
 async function main() {
    const errors = [];

    const conformanceProto = (await fs.readFile(path.relative(`${__dirname}/..`, CONFORMANCE_PROTO_PATH), 'utf8')).split('\n');
    errors.push(...ClosureOSSChecker.hasOnlyClosurePathsInConformance(CONFORMANCE_PROTO_PATH, conformanceProto));

    for await (const {filePath, contents} of yieldClosureFiles()) {
      errors.push(...ClosureOSSChecker.omitsGoogleCopyright(filePath, contents));

      if (DOC_FILE_REGEX.test(filePath)) {
        errors.push(...ClosureOSSChecker.mentionsCCBYLicense(filePath, contents));
      } else if (!filePath.startsWith('doc/')) {
        errors.push(...ClosureOSSChecker.mentionsApache(filePath, contents));
        errors.push(...ClosureOSSChecker.hasClosureCopyright(filePath, contents));
      }
    }
    if (errors.length > 0) {
      console.error(errors.join('\n'));
    } else {
      console.error('All checks pass');
    }
   return errors.length > 0 ? 1 : 0;
 }
 
 main().then(code => process.exit(code));
 