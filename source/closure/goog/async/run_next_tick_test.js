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
/**
 * @fileoverview tests run using its goog.async.nextTick codepath
 * activated via MockClock.
 */

goog.module('goog.async.runNextTickTest');
goog.setTestOnly();

const MockClock = goog.require('goog.testing.MockClock');
const recordFunction = goog.require('goog.testing.recordFunction');
const run = goog.require('goog.async.run');
const testSuite = goog.require('goog.testing.testSuite');

let mockClock;
let futureCallback1;
let futureCallback2;

testSuite({
  setUpPage() {
    mockClock = new MockClock();
    mockClock.install();
  },

  setUp() {
    mockClock.reset();
    futureCallback1 = new recordFunction();
    futureCallback2 = new recordFunction();
  },

  tearDown() {
    futureCallback1 = null;
    futureCallback2 = null;
  },

  tearDownPage() {
    mockClock.uninstall();
    goog.dispose(mockClock);
  },

  testCalledAsync() {
    run(futureCallback1);
    run(futureCallback2);

    assertEquals(0, futureCallback1.getCallCount());
    assertEquals(0, futureCallback2.getCallCount());

    // but the callbacks are scheduled...
    mockClock.tick();

    // and called.
    assertEquals(1, futureCallback1.getCallCount());
    assertEquals(1, futureCallback2.getCallCount());

    // and aren't called a second time.
    assertEquals(1, futureCallback1.getCallCount());
    assertEquals(1, futureCallback2.getCallCount());
  },

  testSequenceCalledInOrder() {
    futureCallback1 = new recordFunction(() => {
      // called before futureCallback2
      assertEquals(0, futureCallback2.getCallCount());
    });
    futureCallback2 = new recordFunction(() => {
      // called after futureCallback1
      assertEquals(1, futureCallback1.getCallCount());
    });
    run(futureCallback1);
    run(futureCallback2);

    // goog.async.run doesn't call the top callback immediately.
    assertEquals(0, futureCallback1.getCallCount());

    // but the callbacks are scheduled...
    mockClock.tick();

    // and called during the same "tick".
    assertEquals(1, futureCallback1.getCallCount());
    assertEquals(1, futureCallback2.getCallCount());
  },

  testSequenceScheduledTwice() {
    run(futureCallback1);
    run(futureCallback1);

    // goog.async.run doesn't call the top callback immediately.
    assertEquals(0, futureCallback1.getCallCount());

    // but the callbacks are scheduled...
    mockClock.tick();

    // and called twice during the same "tick".
    assertEquals(2, futureCallback1.getCallCount());
  },

  testSequenceCalledSync() {
    futureCallback1 = new recordFunction(() => {
      run(futureCallback2);
      // goog.async.run doesn't call the inner callback immediately.
      assertEquals(0, futureCallback2.getCallCount());
    });
    run(futureCallback1);

    // goog.async.run doesn't call the top callback immediately.
    assertEquals(0, futureCallback1.getCallCount());

    // but the callbacks are scheduled...
    mockClock.tick();

    // and called during the same "tick".
    assertEquals(1, futureCallback1.getCallCount());
    assertEquals(1, futureCallback2.getCallCount());
  },

  testScope() {
    const aScope = {};
    run(futureCallback1);
    run(futureCallback2, aScope);

    // the callbacks are scheduled...
    mockClock.tick();

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
  },
});
