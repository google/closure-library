// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.labs.testing.logicMatcherTest');
goog.setTestOnly();

/** @suppress {extraRequire} */
const AllOfMatcher = goog.require('goog.labs.testing.AllOfMatcher');
/** @suppress {extraRequire} */
const GreaterThanMatcher = goog.require('goog.labs.testing.GreaterThanMatcher');
const MatcherError = goog.require('goog.labs.testing.MatcherError');
const assertThat = goog.require('goog.labs.testing.assertThat');
const testSuite = goog.require('goog.testing.testSuite');

function assertMatcherError(callable, errorString) {
  const e = assertThrows(errorString || 'callable throws exception', callable);
  assertTrue(e instanceof MatcherError);
}
testSuite({
  testAnyOf() {
    assertThat(5, anyOf(greaterThan(4), lessThan(3)), '5 > 4 || 5 < 3');
    assertThat(2, anyOf(greaterThan(4), lessThan(3)), '2 > 4 || 2 < 3');

    assertMatcherError(() => {
      assertThat(4, anyOf(greaterThan(5), lessThan(2)));
    }, 'anyOf should throw exception when it fails');
  },

  testAllOf() {
    assertThat(5, allOf(greaterThan(4), lessThan(6)), '5 > 4 && 5 < 6');

    assertMatcherError(() => {
      assertThat(4, allOf(lessThan(5), lessThan(3)));
    }, 'allOf should throw exception when it fails');
  },

  testIsNot() {
    assertThat(5, isNot(greaterThan(6)), '5 !> 6');

    assertMatcherError(() => {
      assertThat(4, isNot(greaterThan(3)));
    }, 'isNot should throw exception when it fails');
  },
});
