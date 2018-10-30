/**
 * @license
 * Copyright 2018 The Closure Library Authors. All Rights Reserved.
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

const {execute} = require('../../bin/closuremakedeps');
const path = require('path');
const fs = require('fs');
const jasmineDiff = require('jasmine-diff');

// This test isn't that slow unless you're debugging.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

const CLOSURE_SUB_DIR = 'closure/goog';

// The entry point of the module is bootstrap/nodejs.js. Need to back out.
const CLOSURE_LIBRARY_PATH =
    path.resolve(require.resolve('google-closure-library'), '../../../../');
const CLOSURE_PATH = path.resolve(CLOSURE_LIBRARY_PATH, CLOSURE_SUB_DIR);
const THIRD_PARTY_PATH =
    path.resolve(CLOSURE_LIBRARY_PATH, 'third_party', CLOSURE_SUB_DIR);

/**
 * @param {string} flag
 * @param {string} value
 * @return {!Array<string>}
 */
function flag(flag, value) {
  return [flag, value];
}

/**
 * @param {string} p
 * @return {!Array<string>}
 */
function exclude(p) {
  return flag('--exclude', path.resolve(CLOSURE_PATH, p));
}

/**
 * Skips lines for test files, as those are not present in the npm package for
 * the library.
 *
 *
 * @param {string} line
 * @return {boolean}
 */
function skipTests(line) {
  return !/goog\.addDependency\('[^']*_test\.js/.test(line);
}

describe('closure-make-deps', function() {
  beforeEach(function() {
    jasmine.addMatchers(jasmineDiff(jasmine, {
      colors: false,
      inline: false,
    }));
  });

  it('produces closure library deps file', async function() {
    const expectedContents =
        fs.readFileSync(path.resolve(CLOSURE_PATH, 'deps.js'), {
            encoding: 'utf8'
          }).replace(/^(\/\/.*)?\n/gm, '');
    const flags = [
      ...flag('--root', CLOSURE_PATH),
      ...flag('--root', THIRD_PARTY_PATH),
      ...exclude('transpile.js'),
      ...exclude('testing/testdata'),
      ...exclude('bin'),
      ...exclude('conformance'),
      ...exclude('css'),
      ...exclude('demos'),
      ...exclude('docs'),
      ...exclude('transpile'),
      ...exclude('debug_loader_integration_tests'),
      ...exclude('base_debug_loader_test.js'),
    ];
    const result = await execute(flags);
    expect(result.errors.filter(e => e.fatal).map(e => e.toString()))
        .toEqual([]);

    let resultLines = result.text.split('\n');
    resultLines = resultLines.filter(skipTests);

    let expectedLines = expectedContents.split('\n');
    expectedLines = expectedLines.filter(skipTests);

    expect(resultLines).toEqual(expectedLines);
  });
});
