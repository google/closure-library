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

goog.module('goog.labs.testing.decoratorMatcherTest');
goog.setTestOnly();

/** @suppress {extraRequire} */
const AnythingMatcher = goog.require('goog.labs.testing.AnythingMatcher');
/** @suppress {extraRequire} */
const GreaterThanMatcher = goog.require('goog.labs.testing.GreaterThanMatcher');
const MatcherError = goog.require('goog.labs.testing.MatcherError');
const assertThat = goog.require('goog.labs.testing.assertThat');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testAnythingMatcher() {
    assertThat(true, anything(), 'anything matches true');
    assertThat(false, anything(), 'false matches anything');
  },

  testIs() {
    assertThat(5, is(greaterThan(4)), '5 is > 4');
  },

  testDescribedAs() {
    const e = assertThrows(() => {
      assertThat(4, describedAs('this is a test', greaterThan(6)));
    });
    assertTrue(e instanceof MatcherError);
    assertEquals('this is a test', e.message);
  },
});
