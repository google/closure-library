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
const os = require('os');

// This test isn't that slow unless you're debugging.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// By default assume this is running based on the structure of the git repo.
// closure_deps/ lives in the save repo as Closure, and the library's code is in
// closure/goog and third_party/closure/goog.
const CLOSURE_SUB_DIR = process.env.CLOSURE_SUB_DIR || 'closure/goog';
const CLOSURE_LIBRARY_PATH =
    process.env.CLOSURE_LIBRARY_PATH || path.resolve(__dirname, '../../../');

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
  const tempFile = path.join(os.tmpdir(), 'closuremakejsdepstmp.js');
  const tempFileRelativePath = path.relative(CLOSURE_PATH, tempFile);

  const closureDepsContents =
      fs.readFileSync(path.resolve(CLOSURE_PATH, 'deps.js'), {
          encoding: 'utf8'
        }).replace(/^(\/\/.*)?\n/gm, '');

  beforeEach(function() {
    jasmine.addMatchers(jasmineDiff(jasmine, {
      colors: false,
      inline: false,
    }));
  });

  afterEach(() => {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  });

  it('produces closure library deps file', async function() {
    const flags = [
      ...flag('--root', CLOSURE_PATH),
      ...flag('--root', THIRD_PARTY_PATH),
      ...exclude('deps.js'),
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

    let expectedLines = closureDepsContents.split('\n');
    expectedLines = expectedLines.filter(skipTests);

    expect(resultLines).toEqual(expectedLines);
  });

  it('merge only deps produces same file', async function() {
    const flags = [
      ...flag('--merge-deps', 'true'),
      ...flag('--closure-path', CLOSURE_PATH),
      ...flag('-f', path.join(CLOSURE_PATH, 'deps.js')),
    ];

    const result = await execute(flags);
    expect(result.errors).toEqual([]);
    expect(result.text).toEqual(closureDepsContents);
  });

  it('input deps file forward declares symbols', async function() {
    fs.writeFileSync(
        tempFile, `goog.module('ex');\ngoog.require('goog.array');`);

    const flags = [
      ...flag('--closure-path', CLOSURE_PATH),
      ...flag('-f', path.join(CLOSURE_PATH, 'deps.js')),
      ...flag('-f', tempFile)
    ];

    const result = await execute(flags);
    expect(result.errors).toEqual([]);
    expect(result.text)
        .toEqual(
            `goog.addDependency('${tempFileRelativePath}'` +
            `, ['ex'], ['goog.array'], {'module': 'goog'});\n`);
  });

  it('missing require is error', async function() {
    fs.writeFileSync(tempFile, `goog.require('goog.array');`);

    const flags = [
      ...flag('--closure-path', CLOSURE_PATH),
      ...flag('-f', tempFile)
    ];

    try {
      await execute(flags);
      fail();
    } catch (error) {
      expect(error.toString())
          .toEqual(
              `Error: Error in source file "${tempFile}": ` +
              `Could not find "goog.array".`);
    }
  });

  it('merge deps and input file', async function() {
    fs.writeFileSync(tempFile, `goog.module('a.b');`);

    const expectedExtraFileLine = `goog.addDependency('${
        tempFileRelativePath}', ['a.b'], [], {'module': 'goog'});\n`;

    const expectedContents = expectedExtraFileLine + closureDepsContents;

    const flags = [
      ...flag('--merge-deps', 'true'),
      ...flag('--closure-path', CLOSURE_PATH),
      ...flag('-f', tempFile),
      ...flag('-f', path.join(CLOSURE_PATH, 'deps.js')),
    ];

    const result = await execute(flags);
    expect(result.errors).toEqual([]);
    expect(result.text).toEqual(expectedContents);
  });
});
