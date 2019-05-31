// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** @fileoverview Unit tests for paths. */

goog.module('goog.math.pathsTest');
goog.setTestOnly();

const Coordinate = goog.require('goog.math.Coordinate');
const paths = goog.require('goog.math.paths');
const testSuite = goog.require('goog.testing.testSuite');

const regularNGon = paths.createRegularNGon;
const arrow = paths.createArrow;

function assertArrayRoughlyEquals(expected, actual, delta) {
  const message = `Expected: ${expected}, Actual: ${actual}`;
  assertEquals(`Wrong length. ${message}`, expected.length, actual.length);
  for (let i = 0; i < expected.length; i++) {
    assertRoughlyEquals(
        `Wrong item at ${i}. ${message}`, expected[i], actual[i], delta);
  }
}

function $coord(x, y) {
  return new goog.math.Coordinate(x, y);
}

testSuite({
  testSquare() {
    const square = regularNGon($coord(10, 10), $coord(0, 10), 4);
    assertArrayRoughlyEquals(
        [0, 10, 10, 0, 20, 10, 10, 20], square.arguments_, 0.05);
  },
});
