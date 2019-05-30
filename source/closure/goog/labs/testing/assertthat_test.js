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

goog.module('goog.labs.testing.assertThatTest');
goog.setTestOnly();

const MatcherError = goog.require('goog.labs.testing.MatcherError');
const assertThat = goog.require('goog.labs.testing.assertThat');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

let describeFn;
let failureMatchesFn;
let successMatchesFn;
let successTestMatcher;

let failureTestMatcher;

testSuite({
  setUp() {
    successMatchesFn = new recordFunction(() => true);
    failureMatchesFn = new recordFunction(() => false);
    describeFn = new recordFunction();

    successTestMatcher = () =>
        ({matches: successMatchesFn, describe: describeFn});
    failureTestMatcher = () =>
        ({matches: failureMatchesFn, describe: describeFn});
  },

  testAssertthatAlwaysCallsMatches() {
    const value = 7;
    assertThat(value, successTestMatcher(), 'matches is called on success');

    assertEquals(1, successMatchesFn.getCallCount());
    const matchesCall = successMatchesFn.popLastCall();
    assertEquals(value, matchesCall.getArgument(0));

    const e = assertThrows(goog.bind(
        assertThat, null, value, failureTestMatcher(),
        'matches is called on failure'));

    assertTrue(e instanceof MatcherError);

    assertEquals(1, failureMatchesFn.getCallCount());
  },

  testAssertthatCallsDescribeOnFailure() {
    const value = 7;
    const e = assertThrows(goog.bind(
        assertThat, null, value, failureTestMatcher(),
        'describe is called on failure'));

    assertTrue(e instanceof MatcherError);

    assertEquals(1, failureMatchesFn.getCallCount());
    assertEquals(1, describeFn.getCallCount());

    const matchesCall = describeFn.popLastCall();
    assertEquals(value, matchesCall.getArgument(0));
  },
});
