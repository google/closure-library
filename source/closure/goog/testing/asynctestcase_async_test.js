// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.AsyncTestCaseAsyncTest');
goog.setTestOnly();

const AsyncTestCase = goog.require('goog.testing.AsyncTestCase');
const TestCase = goog.require('goog.testing.TestCase');
/** @suppress {extraRequire} */
const jsunit = goog.require('goog.testing.jsunit');

// Has the setUp() function been called.
const setUpCalled = false;
// Has the current test function completed. This helps us to ensure that
// the next test is not started before the previous completed.
let curTestIsDone = true;
// Use an asynchronous test runner for our tests.

/**
 * Uses window.setTimeout() to perform asynchronous behaviour and uses
 * asyncTestCase.waitForAsync() and asyncTestCase.continueTesting() to mark
 * the beginning and end of it.
 * @param {number} numAsyncCalls The number of asynchronous calls to make.
 * @param {string} name The name of the current step.
 */
function doAsyncStuff(numAsyncCalls, name) {
  if (numAsyncCalls > 0) {
    curTestIsDone = false;
    asyncTestCase.waitForAsync(
        `doAsyncStuff-${name}` +
        '(' + numAsyncCalls + ')');
    window.setTimeout(() => {
      doAsyncStuff(numAsyncCalls - 1, name);
    }, 0);
  } else {
    curTestIsDone = true;
    asyncTestCase.continueTesting();
  }
}

const doAsyncSignals = () => {
  curTestIsDone = false;
  window.setTimeout(() => {
    curTestIsDone = true;
    asyncTestCase.signal();
  }, 0);
};

const asyncTestCase = new AsyncTestCase(document.title);
asyncTestCase.setTestObj({
  setUpPage() {
    debug('setUpPage was called.');
    doAsyncStuff(3, 'setUpPage');
  },

  setUp() {
    assertTrue(curTestIsDone);
    doAsyncStuff(3, 'setUp');
  },

  tearDown() {
    assertTrue(curTestIsDone);
  },

  test1() {
    assertTrue(curTestIsDone);
    doAsyncStuff(1, 'test1');
  },

  test2_asyncContinueThenWait() {
    const activeTest = asyncTestCase.activeTest_;
    function async1() {
      asyncTestCase.continueTesting();
      asyncTestCase.waitForAsync('2');
      window.setTimeout(async2, 0);
    }
    function async2() {
      asyncTestCase.continueTesting();
      assertEquals(
          'Did not wait for inner waitForAsync', activeTest,
          asyncTestCase.activeTest_);
    }
    asyncTestCase.waitForAsync('1');
    window.setTimeout(async1, 0);
  },

  test3() {
    assertTrue(curTestIsDone);
    doAsyncStuff(2, 'test3');
  },

  tearDownPage() {
    debug('tearDownPage was called.');
    assertTrue(curTestIsDone);
  },

  testSignalsReturn() {
    doAsyncSignals();
    doAsyncSignals();
    doAsyncSignals();
    asyncTestCase.waitForSignals(3);
  },

  testSignalsMixedSyncAndAsync() {
    asyncTestCase.signal();
    doAsyncSignals();
    doAsyncSignals();
    asyncTestCase.waitForSignals(3);
  },

  testSignalsMixedSyncAndAsyncMultipleWaits() {
    asyncTestCase.signal();
    doAsyncSignals();
    asyncTestCase.waitForSignals(1);
    doAsyncSignals();
    asyncTestCase.waitForSignals(2);
  },

  testSignalsCallContinueTestingBeforeFinishing() {
    doAsyncSignals();
    asyncTestCase.waitForSignals(2);

    window.setTimeout(() => {
      const thrown = assertThrows(() => {
        asyncTestCase.continueTesting();
      });
      assertEquals('Still waiting for 1 signals.', thrown.message);
    }, 0);
    doAsyncSignals();  // To not timeout.
  },

  testCurrentTestName() {
    const currentTestName = TestCase.currentTestName;
    assertEquals('testCurrentTestName', currentTestName);
  },

  testCurrentTestNameAsync() {
    const getAssertSameTest = () => {
      const expectedTestCase = TestCase.getActiveTestCase();
      const expectedTestName = (expectedTestCase ? expectedTestCase.getName() :
                                                   '<no active TestCase>') +
          '.' + (TestCase.currentTestName || '<no active test name>');
      const assertSameTest = () => {
        const currentTestCase = TestCase.getActiveTestCase();
        const currentTestName = (currentTestCase ? currentTestCase.getName() :
                                                   '<no active TestCase>') +
                '.' + TestCase.currentTestName ||
            '<no active test name>';
        assertEquals(expectedTestName, currentTestName);
        assertEquals(expectedTestCase, currentTestCase);
      };
      return assertSameTest;
    };
    const assertSameTest = getAssertSameTest();
    // do something asynchronously...
    asyncTestCase.waitForSignals(1, 'Awaiting asynchronous callback');
    setTimeout(() => {
      // ... and ensure the later half runs during the same test:
      assertSameTest();
      asyncTestCase.signal();
    });
  },
});
TestCase.initializeTestRunner(asyncTestCase);
