/**
 * @license
 * Copyright 2021 The Closure Library Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview A utility to write alltests.js for Closure Library.
 */

const {promises: fs} = require('fs');

const CLOSURE_PATH = 'closure/goog';
const THIRD_PARTY_PATH = 'third_party/closure/goog';

const PREAMBLE = `
// Copyright The Closure Library Authors.
// SPDX-License-Identifier: Apache-2.0

// This file has been auto-generated, please do not edit.
// To regenerate, run \`npm run gen_alltests_js\` in the root directory of the
// Closure Library git repository.
`.trimStart();

const POSTAMBLE = `
// If we're running in a nodejs context, export tests. Used when running tests
// externally on Travis.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = _allTests;
}
`.trimStart();

/**
 * Calls fs.readdir recursively on the given path and subdirectories.
 * Returns only the list of files.
 * @param {string} path The path to read.
 */
async function readdirRecursive(path) {
  const filesAndDirectories = (await fs.readdir(path))
    .map(fileOrDirectory => `${path}/${fileOrDirectory}`)
    .sort();
  const files = [];
  for (const fileOrDirectory of filesAndDirectories) {
    const fileStat = await fs.stat(fileOrDirectory);
    if (fileStat.isDirectory()) {
      files.push(...await readdirRecursive(fileOrDirectory));
    } else {
      files.push(fileOrDirectory);
    }
  }
  return files;
}

/**
 * Prints the generated alltests.js contents.
 * @return {!Promise<number>} The exit code.
 */
async function main() {
  try {
    // Get a list of all *_test.html files.
    const allTestHtmls = [
      ...await readdirRecursive(CLOSURE_PATH),
      ...await readdirRecursive(THIRD_PARTY_PATH),
    ].filter(f => f.endsWith('_test.html'));
    if (allTestHtmls.length === 0) {
      throw new Error('No *_test.html files found. Did you run `npm run gen_test_htmls`?');
    }

    const output = [
      PREAMBLE,
      'var _allTests = [',
      ...allTestHtmls.map(f => `  '${f}',`),
      ']',
      POSTAMBLE
    ];
    console.log(output.join('\n'));
    return 0;
  } catch (e) {
    console.error(e);
    return 1;
  }
}

main().then(code => process.exit(code));
