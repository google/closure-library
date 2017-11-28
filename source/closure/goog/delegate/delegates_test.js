// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.delegate.delegatesTest');
goog.setTestOnly();

const delegates = goog.require('goog.delegate.delegates');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');
goog.require('goog.testing.jsunit');

testSuite({

  shouldRunTests() {
    return typeof Array.prototype.map == 'function';
  },

  testFunctionsActuallyCalled() {
    const funcs = [
      recordFunction(),
      recordFunction(() => ''),
      recordFunction(() => 42),
      recordFunction(),
    ];
    const assertCallCounts = (...counts) => {
      assertArrayEquals(counts, funcs.map(f => f.getCallCount()));
      funcs.forEach(f => f.reset());
    };

    assertUndefined(delegates.callFirst(funcs, f => f()));
    assertCallCounts(1, 0, 0, 0);
    assertEquals('', delegates.callUntilDefinedAndNotNull(funcs, f => f()));
    assertCallCounts(1, 1, 0, 0);
    assertEquals(42, delegates.callUntilTruthy(funcs, f => f()));
    assertCallCounts(1, 1, 1, 0);
  },

  testResultNeverDefined() {
    const funcs = [
      recordFunction(),
      recordFunction(),
    ];
    const assertCallCounts = (...counts) => {
      assertArrayEquals(counts, funcs.map(f => f.getCallCount()));
      funcs.forEach(f => f.reset());
    };

    assertUndefined(delegates.callFirst(funcs, f => f()));
    assertCallCounts(1, 0);
    assertUndefined(delegates.callUntilDefinedAndNotNull(funcs, f => f()));
    assertCallCounts(1, 1);
    assertFalse(delegates.callUntilTruthy(funcs, f => f()));
    assertCallCounts(1, 1);
  },
});
