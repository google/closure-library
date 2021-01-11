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

// Disable Clang formatter for this file.
// See http://goo.gl/SdiwZH
// clang-format off
`.trimStart();

/**
 * Returns the contents of deps.js.
 * @returns {!Promise<string>}
 */
async function main() {
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
  for (const error of errors) {
    console.error(error.toString());
  }
  if (text) {
    const result = [PREAMBLE, text.trim()].join('\n');
    return result;
  }
  return '';
}

main().then(console.log, console.error);
