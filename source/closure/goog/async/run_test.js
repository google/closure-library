// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.async.runTest');
goog.setTestOnly();

const recordFunction = goog.require('goog.testing.recordFunction');
const run = goog.require('goog.async.run');
const testSuite = goog.require('goog.testing.testSuite');

let mockClock;
let futureCallback1;
let futureCallback2;

let futurePromise1;
let futurePromise2;

testSuite({
  setUpPage() {
    goog.ASSUME_PROMISE = true;
    // See run_text_tick_test.js for tests covering the nextTick code path.
  },

  setUp() {
    futurePromise1 = new Promise((resolve) => {
      futureCallback1 = new recordFunction(resolve);
    });
    futurePromise2 = new Promise((resolve) => {
      futureCallback2 = new recordFunction(resolve);
    });
  },

  tearDown() {
    futureCallback1 = null;
    futureCallback2 = null;
    futurePromise1 = null;
    futurePromise2 = null;
  },

  tearDownPage() {
    goog.ASSUME_PROMISE = false;
  },

  testCalledAsync() {
    if (!Promise) return;
    return new Promise((allDone) => {
      run(futureCallback1);
      run(futureCallback2);

      assertEquals(0, futureCallback1.getCallCount());
      assertEquals(0, futureCallback2.getCallCount());

      // but the callbacks are scheduled...
      Promise.all([futurePromise1, futurePromise2]).then(() => {
        // and called.
        assertEquals(1, futureCallback1.getCallCount());
        assertEquals(1, futureCallback2.getCallCount());

        // and aren't called a second time.
        assertEquals(1, futureCallback1.getCallCount());
        assertEquals(1, futureCallback2.getCallCount());
        allDone();
      });
    });
  },

  testSequenceCalledInOrder() {
    if (!Promise) return;
    return new Promise((allDone) => {
      const checkCallback1 = () => {
        futureCallback1();
        // called before futureCallback2
        assertEquals(0, futureCallback2.getCallCount());
      };
      const checkCallback2 = () => {
        futureCallback2();
        // called after futureCallback1
        assertEquals(1, futureCallback1.getCallCount());
      };
      run(checkCallback1);
      run(checkCallback2);

      // goog.async.run doesn't call the top callback immediately.
      assertEquals(0, futureCallback1.getCallCount());

      // but the callbacks are scheduled...
      Promise.all([futurePromise1, futurePromise2]).then(() => {
        // and called during the same "tick".
        assertEquals(1, futureCallback1.getCallCount());
        assertEquals(1, futureCallback2.getCallCount());
        allDone();
      });
    });
  },

  testSequenceScheduledTwice() {
    if (!Promise) return;
    return new Promise((allDone) => {
      run(futureCallback1);
      run(futureCallback1);

      // goog.async.run doesn't call the top callback immediately.
      assertEquals(0, futureCallback1.getCallCount());

      // but the callbacks are scheduled...
      futurePromise1.then(() => {
        // and called twice during the same "tick".
        assertEquals(2, futureCallback1.getCallCount());
        allDone();
      });
    });
  },

  testSequenceCalledSync() {
    if (!Promise) return;
    return new Promise((allDone) => {
      const wrapCallback1 = () => {
        futureCallback1();
        run(futureCallback2);
        // goog.async.run doesn't call the inner callback immediately.
        assertEquals(0, futureCallback2.getCallCount());
      };
      run(wrapCallback1);

      // goog.async.run doesn't call the top callback immediately.
      assertEquals(0, futureCallback1.getCallCount());

      // but the callbacks are scheduled...
      futurePromise1.then(() => {
        // and called during the same "tick".
        assertEquals(1, futureCallback1.getCallCount());
        assertEquals(1, futureCallback2.getCallCount());
        allDone();
      });
    });
  },

  testScope() {
    if (!Promise) return;
    return new Promise((allDone) => {
      const aScope = {};
      run(futureCallback1);
      run(futureCallback2, aScope);

      // the callbacks are scheduled...
      Promise.all([futurePromise1, futurePromise2]).then(() => {
        // and called.
        assertEquals(1, futureCallback1.getCallCount());
        assertEquals(1, futureCallback2.getCallCount());

        // and get the correct scope.
        const last1 = futureCallback1.popLastCall();
        assertEquals(0, last1.getArguments().length);
        assertEquals(goog.global, last1.getThis());

        const last2 = futureCallback2.popLastCall();
        assertEquals(0, last2.getArguments().length);
        assertEquals(aScope, last2.getThis());
        allDone();
      });
    });
  },
});
