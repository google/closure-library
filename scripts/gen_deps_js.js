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
 * @fileoverview A utility to write deps.js for Closure Library.
 */

const {closureMakeDeps} = require('google-closure-deps');

const CLOSURE_PATH = 'closure/goog';
const THIRD_PARTY_PATH = 'third_party/closure/goog';

const PREAMBLE = `
// Copyright The Closure Library Authors.
// SPDX-License-Identifier: Apache-2.0

// This file has been auto-generated, please do not edit.
// To regenerate, run \`npm run gen_deps_js\` in the root directory of the
// Closure Library git repository.

// Disable Clang formatter for this file.
// See http://goo.gl/SdiwZH
// clang-format off
`.trimStart();

/**
 * Prints the generated deps.js contents.
 * @return {!Promise<number>} the exit code
 */
async function main() {
  try {
    const {text, errors} = await closureMakeDeps.execute([
      '--root',    CLOSURE_PATH,
      '--root',    THIRD_PARTY_PATH,
      '--exclude', '**/*_test.js',
      '--exclude', '**/tester.js',
      '--exclude', '**/*_test_vectors.js',
      '--exclude', '**/*_test_suite.js',
      '--exclude', '**/*_test_cases.js',
      '--exclude', '**/testdata/**/*.js',
      '--exclude', `${CLOSURE_PATH}/css`,
      '--exclude', `${CLOSURE_PATH}/demos`,
      '--exclude', `${CLOSURE_PATH}/deps.js`,
      '--exclude', `${CLOSURE_PATH}/transpile.js`
    ]);
    // Print all encountered errors. Errors are not necessarily fatal.
    for (const error of errors) {
      console.error(error.toString());
    }
    if (text) {
      console.log(`${PREAMBLE}\n${text.trim()}`);
      return 0;
    } else {
      // No text indicates that the errors were fatal.
      return 1;
    }
  } catch (e) {
    console.error(e);
    return 1;
  }
}

main().then(code => process.exit(code));
