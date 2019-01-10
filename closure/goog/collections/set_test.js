// Copyright 2019 The Closure Library Authors. All Rights Reserved.
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

/**
 * @fileoverview Unit tests for goog.collections.set.
 */

goog.module('goog.collections.setTest');
goog.setTestOnly('goog.collections.setTest');

const set = goog.require('goog.collections.set');
const testSuite = goog.require('goog.testing.testSuite');

goog.require('goog.testing.jsunit');

testSuite({
  testIntersection() {
    assertSameElements([2], set.intersection([1, 2], [2, 3]));
    assertSameElements([], set.intersection([], []));
    assertSameElements([1], set.intersection([1, 1, 1], [1, 1]));
  }
});
