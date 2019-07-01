// Copyright 2014 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.testing.TestCaseTest');
goog.setTestOnly('goog.testing.TestCaseTest');

goog.require('goog.Promise');
goog.require('goog.Timer');
goog.require('goog.functions');
goog.require('goog.string');
goog.require('goog.testing.ExpectedFailures');
goog.require('goog.testing.FunctionMock');
goog.require('goog.testing.JsUnitException');
goog.require('goog.testing.MethodMock');
goog.require('goog.testing.MockRandom');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.TestCase');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');


// Dual of fail().
const ok = function() {
  assertTrue(true);
};

// Native Promise-based equivalent of ok().
const okPromise = function() {
  return Promise.resolve(null);
};

// Native Promise-based equivalent of fail().
const failPromise = function() {
  return Promise.reject(null);
};

// Native Promise-based test that returns promise which never resolves.
const neverResolvedPromise = function() {
  return new Promise(function() {});
};

// goog.Promise-based equivalent of ok().
const okGoogPromise = function() {
  return goog.Promise.resolve(null);
};

// goog.Promise-based equivalent of fail().
const failGoogPromise = function() {
  return goog.Promise.reject(new Error());
};

// Native Promise-based test that returns promise which never resolves.
const neverResolvedGoogPromise = function() {
  return new goog.Promise(function() {});
};

/** @type {!Array<string>} */
let events;

function setUp() {
  // TODO(b/25875505): Fix unreported assertions (go/failonunreportedasserts).
  goog.testing.TestCase.getActiveTestCase().failOnUnreportedAsserts = false;
  events = [];
}

/**
 * @param {string} name
 * @return {function()}
 */
function event(name) {
  return function() {
    events.push(name);
  };
}

function testEmptyTestCase() {
  const testCase = new goog.testing.TestCase();
  testCase.runTests();
  assertTrue(testCase.isSuccess());
  const result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(0, result.totalCount);
  assertEquals(0, result.runCount);
  assertEquals(0, result.successCount);
  assertEquals(0, result.errors.length);
}

function testCompletedCallbacks() {
  const callback = goog.testing.FunctionMock('completed');
  const testCase = new goog.testing.TestCase();

  testCase.addCompletedCallback(callback);
  testCase.addCompletedCallback(callback);

  callback().$times(2);

  callback.$replay();
  testCase.runTests();
  callback.$verify();
  callback.$reset();

  assertTrue(testCase.isSuccess());

  // Executing a second time should not remember the callback.
  callback.$replay();
  testCase.runTests();
  callback.$verify();
}

function testEmptyTestCaseReturningPromise() {
  return new goog.testing.TestCase().runTestsReturningPromise().then(
      function(result) {
        assertTrue(result.complete);
        assertEquals(0, result.totalCount);
        assertEquals(0, result.runCount);
        assertEquals(0, result.successCount);
        assertEquals(0, result.errors.length);
      });
}

function testTestCase_SyncSuccess() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', ok);
  testCase.runTests();
  assertTrue(testCase.isSuccess());
  const result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(1, result.totalCount);
  assertEquals(1, result.runCount);
  assertEquals(1, result.successCount);
  assertEquals(0, result.errors.length);
}

function testTestCaseReturningPromise_SyncSuccess() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', ok);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(0, result.errors.length);
  });
}

function testTestCaseReturningPromise_GoogPromiseResolve() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', okGoogPromise);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(0, result.errors.length);
  });
}

function testTestCaseReturningPromise_PromiseResolve() {
  if (!('Promise' in goog.global)) {
    return;
  }
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', okPromise);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(0, result.errors.length);
  });
}

function testTestCase_DoubleFailure() {
  let doneCount = 0;
  const testCase = new goog.testing.TestCase();

  testCase.setTestDoneCallback(function() {
    doneCount++;
  });

  testCase.addNewTest('foo', fail, null, [{tearDown: fail}]);
  testCase.runTests();
  assertFalse(testCase.isSuccess());
  const result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(1, result.totalCount);
  assertEquals(1, result.runCount);
  assertEquals(0, result.successCount);
  assertEquals(2, result.errors.length);

  assertEquals('testDone must be called exactly once.', 1, doneCount);

  // Make sure we strip all TestCase stack frames:
  assertNotContains('testcase.js', result.errors[0].toString());
}

function testTestCase_RepeatedFailure() {
  const stubs = new goog.testing.PropertyReplacer();
  // Prevent the mock from the inner test from forcibly failing the outer test.
  stubs.replace(
      goog.global, 'G_testRunner', null, true /* opt_allowNullOrUndefined */);

  let doneCount;
  let testCase;
  try {
    doneCount = 0;
    testCase = new goog.testing.TestCase();

    testCase.setTestDoneCallback(function() {
      doneCount++;
    });

    const mock = goog.testing.FunctionMock();
    testCase.addNewTest(
        'foo', function() {
          mock(1).$once();
          mock.$replay();
          // This throws a bad-parameter exception immediately.
          mock(2);
        }, null, [{
          // This throws the recorded exception again.
          // Calling this in tearDown is a common pattern (eg, in Environment).
          tearDown: goog.bind(mock.$verify, mock),
        }]);
    testCase.runTests();
  } finally {
    stubs.reset();
  }
  assertFalse(testCase.isSuccess());
  const result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(1, result.totalCount);
  assertEquals(1, result.runCount);
  assertEquals(0, result.successCount);
  assertEquals(1, result.errors.length);

  assertEquals('testDone must be called exactly once.', 1, doneCount);

  // Make sure we strip all TestCase stack frames:
  assertNotContains('testcase.js', result.errors[0].toString());
}

function testTestCase_SyncFailure() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', fail);
  testCase.runTests();
  assertFalse(testCase.isSuccess());
  const result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(1, result.totalCount);
  assertEquals(1, result.runCount);
  assertEquals(0, result.successCount);
  assertEquals(1, result.errors.length);
  assertEquals('foo', result.errors[0].source);

  // Make sure we strip all TestCase stack frames:
  assertNotContains('testcase.js', result.errors[0].toString());
}

function testTestCaseReturningPromise_SyncFailure() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', fail);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(0, result.successCount);
    assertEquals(1, result.errors.length);
    assertEquals('foo', result.errors[0].source);

    // Make sure we strip all TestCase stack frames:
    assertNotContains('testcase.js', result.errors[0].toString());
  });
}

function testTestCaseReturningPromise_GoogPromiseReject() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', failGoogPromise);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(0, result.successCount);
    assertEquals(1, result.errors.length);
    assertEquals('foo', result.errors[0].source);

    // Make sure we strip all TestCase stack frames:
    assertNotContains('testcase.js', result.errors[0].toString());
  });
}

function testTestCaseReturningPromise_GoogPromiseTimeout() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', neverResolvedGoogPromise);
  let startTimestamp = new Date().getTime();
  // We have to decrease timeout for the artificial 'foo' test otherwise current
  // test will timeout.
  testCase.promiseTimeout = 500;
  startTimestamp = new Date().getTime();
  return testCase.runTestsReturningPromise().then(function(result) {
    const elapsedTime = new Date().getTime() - startTimestamp;
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(0, result.successCount);
    assertEquals(1, result.errors.length);
    // Check that error message mentions test name.
    assertContains('foo', result.errors[0].toString());
    // Check that error message mentions how to change timeout.
    assertContains(
        'goog.testing.TestCase.getActiveTestCase().promiseTimeout',
        result.errors[0].toString());
    if (!goog.userAgent.EDGE_OR_IE) {
      assertTrue(
          `Expected ${elapsedTime} to be >= ${testCase.promiseTimeout}.`,
          elapsedTime >= testCase.promiseTimeout);
    }
  });
}

function testTestCaseReturningPromise_PromiseReject() {
  if (!('Promise' in goog.global)) {
    return;
  }
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', failPromise);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(0, result.successCount);
    assertEquals(1, result.errors.length);
    assertEquals('foo', result.errors[0].source);
  });
}

function testTestCaseReturningPromise_PromiseTimeout() {
  if (!('Promise' in goog.global)) {
    return;
  }
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', neverResolvedPromise);
  // We have to decrease timeout for the artificial 'foo' test otherwise current
  // test will timeout.
  testCase.promiseTimeout = 500;
  const startTimestamp = new Date().getTime();
  return testCase.runTestsReturningPromise().then(function(result) {
    const elapsedTime = new Date().getTime() - startTimestamp;
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(0, result.successCount);
    assertEquals(1, result.errors.length);
    // Check that error message mentions test name.
    assertContains('foo', result.errors[0].toString());
    // Check that error message mentions how to change timeout.
    assertContains(
        'goog.testing.TestCase.getActiveTestCase().promiseTimeout',
        result.errors[0].toString());
    if (!goog.userAgent.EDGE_OR_IE) {
      assertTrue(
          `Expected ${elapsedTime} to be >= ${testCase.promiseTimeout}.`,
          elapsedTime >= testCase.promiseTimeout);
    }
  });
}

function testTestCase_SyncSuccess_SyncFailure() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', ok);
  testCase.addNewTest('bar', fail);
  testCase.runTests();
  assertFalse(testCase.isSuccess());
  const result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(2, result.totalCount);
  assertEquals(2, result.runCount);
  assertEquals(1, result.successCount);
  assertEquals(1, result.errors.length);
  assertEquals('bar', result.errors[0].source);
}

function testTestCaseReturningPromise_SyncSuccess_SyncFailure() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', ok);
  testCase.addNewTest('bar', fail);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(2, result.totalCount);
    assertEquals(2, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(1, result.errors.length);
    assertEquals('bar', result.errors[0].source);
  });
}

function testTestCaseReturningPromise_GoogPromiseResolve_GoogPromiseReject() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', okGoogPromise);
  testCase.addNewTest('bar', failGoogPromise);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(2, result.totalCount);
    assertEquals(2, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(1, result.errors.length);
    assertEquals('bar', result.errors[0].source);

    // Make sure we strip all TestCase stack frames:
    assertNotContains('testcase.js', result.errors[0].toString());
  });
}

function testTestCaseReturningPromise_PromiseResolve_PromiseReject() {
  if (!('Promise' in goog.global)) {
    return;
  }
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', okPromise);
  testCase.addNewTest('bar', failPromise);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(2, result.totalCount);
    assertEquals(2, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(1, result.errors.length);
    assertEquals('bar', result.errors[0].source);
  });
}

function testTestCaseReturningPromise_PromiseResolve_GoogPromiseReject() {
  if (!('Promise' in goog.global)) {
    return;
  }
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', okPromise);
  testCase.addNewTest('bar', failGoogPromise);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(2, result.totalCount);
    assertEquals(2, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(1, result.errors.length);
    assertEquals('bar', result.errors[0].source);
  });
}

function testTestCaseReturningPromise_GoogPromiseResolve_PromiseReject() {
  if (!('Promise' in goog.global)) {
    return;
  }
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', okGoogPromise);
  testCase.addNewTest('bar', failPromise);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(2, result.totalCount);
    assertEquals(2, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(1, result.errors.length);
    assertEquals('bar', result.errors[0].source);
  });
}

function testTestCaseReturningPromise_PromisesInSetUpAndTest() {
  if (!('Promise' in goog.global)) {
    return;
  }
  const testCase = new goog.testing.TestCase();
  testCase.setUpPage = function() {
    event('setUpPage-called')();
    return goog.Timer.promise().then(function() {
      event('setUpPage-promiseFinished')();
    });
  };
  testCase.setUp = function() {
    event('setUp-called')();
    return goog.Timer.promise().then(function() {
      event('setUp-promiseFinished')();
    });
  };
  testCase.addNewTest('foo', function() {
    event('foo-called')();
    return goog.Timer.promise().then(function() {
      event('foo-promiseFinished')();
    });
  });

  // Initially only setUpPage should have been called.
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(0, result.errors.length);

    assertArrayEquals(
        [
          'setUpPage-called', 'setUpPage-promiseFinished', 'setUp-called',
          'setUp-promiseFinished', 'foo-called', 'foo-promiseFinished'
        ],
        events);
  });
}

function testTestCaseNeverRun() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', fail);
  // Missing testCase.runTests()
  const result = testCase.getResult();
  assertFalse(result.complete);
  assertEquals(0, result.totalCount);
  assertEquals(0, result.runCount);
  assertEquals(0, result.successCount);
  assertEquals(0, result.errors.length);
}

function testParseRunTests() {
  assertNull(goog.testing.TestCase.parseRunTests_(''));
  assertNull(goog.testing.TestCase.parseRunTests_('?runTests='));
  assertObjectEquals(
      {'testOne': true},
      goog.testing.TestCase.parseRunTests_('?runTests=testOne'));
  assertObjectEquals(
      {'testOne': true, 'testTwo': true},
      goog.testing.TestCase.parseRunTests_(
          '?foo=bar&runTests=testOne,testTwo'));
  assertObjectEquals(
      {
        '1': true,
        '2': true,
        '3': true,
        'testShouting': true,
        'TESTSHOUTING': true
      },
      goog.testing.TestCase.parseRunTests_(
          '?RUNTESTS=testShouting,TESTSHOUTING,1,2,3'));
}

function testSortOrder_natural() {
  const testCase = new goog.testing.TestCase();
  testCase.setOrder('natural');

  let testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_a', function() { assertEquals(1, testIndex++); });
  testCase.addNewTest('test_b', function() { assertEquals(2, testIndex++); });
  testCase.orderTests_();
  testCase.runTests();

  assertTrue(testCase.isSuccess());
  const result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(3, result.runCount);
  assertEquals(3, result.successCount);
  assertEquals(0, result.errors.length);
}

function testSortOrder_random() {
  const testCase = new goog.testing.TestCase();
  testCase.setOrder('random');

  let testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_a', function() { assertEquals(2, testIndex++); });
  testCase.addNewTest('test_b', function() { assertEquals(1, testIndex++); });

  const mockRandom = new goog.testing.MockRandom([0.5, 0.5]);
  mockRandom.install();
  try {
    testCase.orderTests_();
  } finally {
    // Avoid using a global tearDown() for cleanup, since all TestCase instances
    // auto-detect and share the global life cycle functions.
    mockRandom.uninstall();
  }

  testCase.runTests();

  assertTrue(testCase.isSuccess());
  const result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(3, result.runCount);
  assertEquals(3, result.successCount);
  assertEquals(0, result.errors.length);
}

function testSortOrder_sorted() {
  const testCase = new goog.testing.TestCase();
  testCase.setOrder('sorted');

  let testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(2, testIndex++); });
  testCase.addNewTest('test_a', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_b', function() { assertEquals(1, testIndex++); });
  testCase.orderTests_();
  testCase.runTests();

  assertTrue(testCase.isSuccess());
  const result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(3, result.runCount);
  assertEquals(3, result.successCount);
  assertEquals(0, result.errors.length);
}

function testRunTests() {
  const testCase = new goog.testing.TestCase();
  testCase.setTestsToRun({'test_a': true, 'test_c': true});

  let testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_a', function() { assertEquals(1, testIndex++); });
  testCase.addNewTest('test_b', fail);
  testCase.runTests();

  assertTrue(testCase.isSuccess());
  const result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(2, result.runCount);
  assertEquals(2, result.successCount);
  assertEquals(0, result.errors.length);
}

function testRunTests_byIndex() {
  const testCase = new goog.testing.TestCase();
  testCase.setTestsToRun({'0': true, '2': true});

  let testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_a', fail);
  testCase.addNewTest('test_b', function() { assertEquals(1, testIndex++); });
  testCase.runTests();

  assertTrue(testCase.isSuccess());
  const result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(2, result.runCount);
  assertEquals(2, result.successCount);
  assertEquals(0, result.errors.length);
}

function testMaybeFailTestEarly() {
  const message = 'Error in setUpPage().';
  const testCase = new goog.testing.TestCase();
  testCase.setUpPage = function() {
    throw new Error(message);
  };
  testCase.addNewTest('test', ok);
  testCase.runTests();
  assertFalse(testCase.isSuccess());
  const errors = testCase.getResult().errors;
  assertEquals(1, errors.length);
  assertContains(message, errors[0].toString());
}

function testSetUpReturnsPromiseThatTimesOut() {
  const testCase = new goog.testing.TestCase();
  testCase.promiseTimeout = 500;
  testCase.setUp = neverResolvedGoogPromise;
  testCase.addNewTest('test', ok);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.errors.length);
    assertContains('setUp', result.errors[0].toString());
  });
}

function testTearDownReturnsPromiseThatTimesOut() {
  const testCase = new goog.testing.TestCase();
  testCase.promiseTimeout = 500;
  testCase.tearDown = neverResolvedGoogPromise;
  testCase.addNewTest('test', ok);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.errors.length);
    assertContains('tearDown', result.errors[0].toString());
  });
}

function testTearDown_complexJsUnitExceptionIssue() {  // http://b/110796519
  const testCase = new goog.testing.TestCase();

  const getTestCase = goog.functions.constant(testCase);
  const stubs = new goog.testing.PropertyReplacer();
  stubs.replace(window, '_getCurrentTestCase', getTestCase);
  stubs.replace(goog.testing.TestCase, 'getActiveTestCase', getTestCase);

  testCase.tearDown = function() {
    try {
      fail('First error');
    } catch (e1) {
      try {
        fail('Second error');
      } catch (e2) {
      }
      throw e1;
    }
  };
  testCase.addNewTest('test', ok);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);

    assertNotEquals(
        'Expect the failure to be associated with the test.', 0,
        result.resultsByName['test'].length);

    assertEquals(2, result.errors.length);
    assertContains('tearDown', result.errors[0].toString());

    assertContains('First error', result.errors[1].toString());
    assertContains('Second error', result.errors[0].toString());
  });
}

function testFailOnUnreportedAsserts_EnabledByDefault() {
  assertTrue(new goog.testing.TestCase().failOnUnreportedAsserts);
}


/**
 * Verifies that:
 * <ol>
 * <li>when the `failOnUnreportedAsserts` flag is disabled, the test
 *     function passes;
 * <li>when the `failOnUnreportedAsserts` flag is enabled, the test
 *     function passes if `shouldPassWithFlagEnabled` is true and fails if
 *     it is false; and that
 * <li>when the `failOnUnreportedAsserts` flag is enabled, and in addition
 *     `invalidateAssertionException` is stubbed out to do nothing, the
 *     test function fails.
 * </ol>
 * @param {boolean} shouldPassWithFlagEnabled
 * @param {function(): !goog.Promise} testFunction
 * @return {!goog.Promise}
 */
function verifyTestOutcomeForFailOnUnreportedAssertsFlag(
    shouldPassWithFlagEnabled, testFunction) {
  return verifyWithFlagEnabledAndNoInvalidation(testFunction)
      .then(function() {
        return verifyWithFlagEnabled(testFunction, shouldPassWithFlagEnabled);
      })
      .then(function() { return verifyWithFlagDisabled(testFunction); });
}

function verifyWithFlagDisabled(testFunction) {
  // With the flag disabled, the test is expected to pass, as any caught
  // exception would not be reported.
  const testCase = new goog.testing.TestCase();
  const getTestCase = goog.functions.constant(testCase);
  testCase.addNewTest('test', testFunction);
  testCase.failOnUnreportedAsserts = false;

  const stubs = new goog.testing.PropertyReplacer();
  stubs.replace(window, '_getCurrentTestCase', getTestCase);
  stubs.replace(goog.testing.TestCase, 'getActiveTestCase', getTestCase);

  const promise = new goog
                      .Promise(function(resolve, reject) {
                        testCase.addCompletedCallback(resolve);
                      })
                      .then(function() {
                        assertTrue(testCase.isSuccess());
                        const result = testCase.getResult();
                        assertTrue(result.complete);
                        assertEquals(0, result.errors.length);
                      })
                      .thenAlways(function() {
                        stubs.reset();
                      });

  testCase.runTests();
  return promise;
}

function verifyWithFlagEnabled(testFunction, shouldPassWithFlagEnabled) {
  // With the flag enabled, the test is expected to pass if shouldPassWithFlag
  // is true, and fail if shouldPassWithFlag is false.
  const testCase = new goog.testing.TestCase();
  const getTestCase = goog.functions.constant(testCase);
  testCase.addNewTest('test', testFunction);
  testCase.failOnUnreportedAsserts = true;

  const stubs = new goog.testing.PropertyReplacer();
  stubs.replace(window, '_getCurrentTestCase', getTestCase);
  stubs.replace(goog.testing.TestCase, 'getActiveTestCase', getTestCase);

  const promise =
      new goog
          .Promise(function(resolve, reject) {
            testCase.addCompletedCallback(resolve);
          })
          .then(function() {
            assertEquals(shouldPassWithFlagEnabled, testCase.isSuccess());
            const result = testCase.getResult();
            assertTrue(result.complete);
            // Expect both the caught assertion and the failOnUnreportedAsserts
            // error.
            assertEquals(
                shouldPassWithFlagEnabled ? 0 : 2, result.errors.length);
          })
          .thenAlways(function() {
            stubs.reset();
          });

  testCase.runTests();
  return promise;
}

function verifyWithFlagEnabledAndNoInvalidation(testFunction) {
  // With the flag enabled, the test is expected to pass if shouldPassWithFlag
  // is true, and fail if shouldPassWithFlag is false.
  const testCase = new goog.testing.TestCase();
  const getTestCase = goog.functions.constant(testCase);
  testCase.addNewTest('test', testFunction);
  testCase.failOnUnreportedAsserts = true;

  const stubs = new goog.testing.PropertyReplacer();
  stubs.replace(window, '_getCurrentTestCase', getTestCase);
  stubs.replace(goog.testing.TestCase, 'getActiveTestCase', getTestCase);
  stubs.replace(
      goog.testing.TestCase.prototype, 'invalidateAssertionException',
      goog.nullFunction);

  const promise = new goog
                      .Promise(function(resolve, reject) {
                        testCase.addCompletedCallback(resolve);
                      })
                      .then(function() {
                        assertFalse(testCase.isSuccess());
                        const result = testCase.getResult();
                        assertTrue(result.complete);
                        // Expect both the caught assertion and the
                        // failOnUnreportedAsserts error.
                        assertEquals(2, result.errors.length);
                      })
                      .thenAlways(function() {
                        stubs.reset();
                      });

  testCase.runTests();
  return promise;
}

function testFailOnUnreportedAsserts_SwallowedException() {
  return verifyTestOutcomeForFailOnUnreportedAssertsFlag(false, function() {
    try {
      assertTrue(false);
    } catch (e) {
      // Swallow the exception generated by the assertion.
    }
  });
}

function testFailOnUnreportedAsserts_SwallowedFail() {
  return verifyTestOutcomeForFailOnUnreportedAssertsFlag(false, function() {
    try {
      fail();
    } catch (e) {
      // Swallow the exception generated by fail.
    }
  });
}

function testFailOnUnreportedAsserts_SwallowedAssertThrowsException() {
  return verifyTestOutcomeForFailOnUnreportedAssertsFlag(false, function() {
    try {
      assertThrows(goog.nullFunction);
    } catch (e) {
      // Swallow the exception generated by assertThrows.
    }
  });
}

function testFailOnUnreportedAsserts_SwallowedAssertNotThrowsException() {
  return verifyTestOutcomeForFailOnUnreportedAssertsFlag(false, function() {
    try {
      assertNotThrows(goog.functions.error());
    } catch (e) {
      // Swallow the exception generated by assertNotThrows.
    }
  });
}

function testFailOnUnreportedAsserts_SwallowedExceptionViaPromise() {
  return verifyTestOutcomeForFailOnUnreportedAssertsFlag(false, function() {
    return goog.Promise.resolve()
        .then(function() { assertTrue(false); })
        .thenCatch(function(e) {
          // Swallow the exception generated by the assertion.
        });
  });
}

function testFailOnUnreportedAsserts_NotForAssertThrowsJsUnitException() {
  return verifyTestOutcomeForFailOnUnreportedAssertsFlag(true, function() {
    assertThrowsJsUnitException(function() { assertTrue(false); });
  });
}

function testFailOnUnreportedAsserts_NotForExpectedFailures() {
  return verifyTestOutcomeForFailOnUnreportedAssertsFlag(true, function() {
    const expectedFailures = new goog.testing.ExpectedFailures();
    expectedFailures.expectFailureFor(true);
    try {
      assertTrue(false);
    } catch (e) {
      expectedFailures.handleException(e);
    }
  });
}

function testFailOnUnreportedAsserts_ReportUnpropagatedAssertionExceptions() {
  const testCase = new goog.testing.TestCase();

  const e1 = new goog.testing.JsUnitException('foo123');
  const e2 = new goog.testing.JsUnitException('bar456');

  const mockRecordError = goog.testing.MethodMock(testCase, 'recordError');
  mockRecordError('test', e1);
  mockRecordError('test', e2);
  mockRecordError.$replay();

  testCase.thrownAssertionExceptions_.push(e1);
  testCase.thrownAssertionExceptions_.push(e2);

  const exception = testCase.reportUnpropagatedAssertionExceptions_('test');
  assertContains('One or more assertions were', exception.toString());

  mockRecordError.$verify();
  mockRecordError.$tearDown();
}

function testUnreportedAsserts_failedTest() {
  const testCase = new goog.testing.TestCase();
  testCase.addNewTest('testFailSync', function() {
    try {
      assertEquals('Obi-wan', 'Qui-gon');
    } catch (e) {
    }
    assertEquals('Sidious', 'Palpatine');
  });
  testCase.addNewTest('testFailAsync', function() {
    return goog.Promise.resolve().then(function() {
      try {
        assertEquals('Kirk', 'Spock');
      } catch (e) {
      }
      assertEquals('Uhura', 'Scotty');
    });
  });
  testCase.addNewTest('testJustOneFailure', function() {
    return goog.Promise.resolve().then(function() {
      assertEquals('R2D2', 'C3PO');
    });
  });

  const stubs = new goog.testing.PropertyReplacer();
  const getTestCase = goog.functions.constant(testCase);
  stubs.replace(window, '_getCurrentTestCase', getTestCase);

  stubs.replace(goog.testing.TestCase, 'getActiveTestCase', getTestCase);
  return testCase.runTestsReturningPromise()
      .then(function() {
        const errors = testCase.getResult().errors.map(function(e) {
          return e.message;
        });

        assertArrayEquals(
            [
              // Sync:
              'Expected <Obi-wan> (String) but was <Qui-gon> (String)',
              'Expected <Sidious> (String) but was <Palpatine> (String)',
              // Async:
              'Expected <Kirk> (String) but was <Spock> (String)',
              'Expected <Uhura> (String) but was <Scotty> (String)',
              // JustOneFailure:
              'Expected <R2D2> (String) but was <C3PO> (String)',
            ],
            errors);

        const extraLogMessages =
            testCase.getResult().messages.filter(function(m) {
              return goog.string.contains(
                  m, '1 additional exceptions were swallowed by the test');
            });
        assertEquals(
            'Expect an additional-exception warning only for the two tests ' +
                'that swallowed an exception.',
            2, extraLogMessages.length);
      })
      .thenAlways(function() {
        stubs.reset();
      });
}


function testSetObj() {
  const testCase = new goog.testing.TestCase();
  assertEquals(0, testCase.getCount());
  testCase.setTestObj({testOk: ok, somethingElse: fail});
  assertEquals(1, testCase.getCount());
  // Make sure test count doesn't change after initializeTestCase
  goog.testing.TestCase.initializeTestCase(testCase, undefined);
  assertEquals(1, testCase.getCount());
}

async function testSetObj_Nested() {
  const testCase = new goog.testing.TestCase();
  assertEquals(0, testCase.getCount());
  testCase.setTestObj({
    setUp: event('setUp1'),
    testOk: event('testOk'),
    somethingElse: fail,
    testNested: {
      setUp: event('setUp2'),
      test: event('testNested'),
      tearDown: event('tearDown2')
    },
    testNestedIgnoreTests: {
      shouldRunTests() {
        event('shouldRunTests')();
        return false;
      },

      // 3 tests - 1 of which is nested. shouldRunTests should only be called
      // once.
      testShouldNotRun: event('SHOULD NEVER HAPPEN'),
      testAlsoShouldNotRun: event('ALSO SHOULD NEVER HAPPEN'),

      testSuperNestedIgnore: {
        testShouldNotRun: event('SHOULD NEVER HAPPEN NESTED'),
      },
    },
    testThrowShouldRunTests: {
      shouldRunTests() {
        event('throw shouldRunTests')();
        throw new Error('bar');
      },

      testShouldNotRun: event('SHOULD NEVER HAPPEN THROW'),
      testAlsoShouldNotRun: event('ALSO SHOULD NEVER HAPPEN THROW'),

      testSuperNestedIgnore: {
        testShouldNotRun: event('SHOULD NEVER HAPPEN NESTED THROW'),
      },
    },
    testNestedSuite: {
      setUp: event('setUp3'),
      testA: event('testNestedSuite_A'),
      testB: event('testNestedSuite_B'),
      testSuperNestedSuite: {
        setUp: event('setUp4'),
        testC: event('testNestedSuite_SuperNestedSuite_C'),
        tearDown: event('tearDown4')
      },
      tearDown: event('tearDown3')
    },
    tearDown: event('tearDown1')
  });
  assertEquals(11, testCase.getCount());
  const tests = testCase.getTests();
  const names = [];
  for (let i = 0; i < tests.length; i++) {
    names.push(tests[i].name);
  }
  assertArrayEquals(
      [
        'testOk',
        'testNested',
        'testNestedIgnoreTests_ShouldNotRun',
        'testNestedIgnoreTests_AlsoShouldNotRun',
        'testNestedIgnoreTests_SuperNestedIgnore_ShouldNotRun',
        'testThrowShouldRunTests_ShouldNotRun',
        'testThrowShouldRunTests_AlsoShouldNotRun',
        'testThrowShouldRunTests_SuperNestedIgnore_ShouldNotRun',
        'testNestedSuite_A',
        'testNestedSuite_B',
        'testNestedSuite_SuperNestedSuite_C',
      ],
      names);
  await testCase.runTestsReturningPromise();
  assertArrayEquals(
      [
        'setUp1',
        'testOk',
        'tearDown1',
        'setUp1',
        'setUp2',
        'testNested',
        'tearDown2',
        'tearDown1',
        'shouldRunTests',
        'throw shouldRunTests',
        'setUp1',
        'setUp3',
        'testNestedSuite_A',
        'tearDown3',
        'tearDown1',
        'setUp1',
        'setUp3',
        'testNestedSuite_B',
        'tearDown3',
        'tearDown1',
        'setUp1',
        'setUp3',
        'setUp4',
        'testNestedSuite_SuperNestedSuite_C',
        'tearDown4',
        'tearDown3',
        'tearDown1',
      ],
      events);
}

function testSetObj_es6Class() {
  let FooTest;
  try {
    eval(
        'FooTest = class { testOk() {assertTrue(true); } somethingElse() {} }');
  } catch (ex) {
    // IE cannot parse ES6.
    return;
  }
  const testCase = new goog.testing.TestCase();
  assertEquals(0, testCase.getCount());
  testCase.setTestObj(new FooTest());
  assertEquals(1, testCase.getCount());
}

function testSetTestObj_alreadyInitialized() {
  const testCase = new goog.testing.TestCase();
  testCase.setTestObj({test1: ok, test2: ok});
  try {
    testCase.setTestObj({test3: ok, test4: ok});
    fail('Overriding the test object should fail');
  } catch (e) {
    assertContains(
        'Test methods have already been configured.\n' +
            'Tests previously found:\ntest1\ntest2\n' +
            'New tests found:\ntest3\ntest4',
        e.toString());
  }
}

function testCurrentTestName() {
  const currentTestName = goog.testing.TestCase.currentTestName;
  assertEquals('testCurrentTestName', currentTestName);
}


function testCurrentTestNamePromise() {
  const getAssertSameTest = function() {
    const expectedTestCase = goog.testing.TestCase.getActiveTestCase();
    const expectedTestName = (expectedTestCase ? expectedTestCase.getName() :
                                                 '<no active TestCase>') +
        '.' +
        (goog.testing.TestCase.currentTestName || '<no active test name>');
    const assertSameTest = function() {
      const currentTestCase = goog.testing.TestCase.getActiveTestCase();
      const currentTestName = (currentTestCase ? currentTestCase.getName() :
                                                 '<no active TestCase>') +
              '.' + goog.testing.TestCase.currentTestName ||
          '<no active test name>';
      assertEquals(expectedTestName, currentTestName);
      assertEquals(expectedTestCase, currentTestCase);
    };
    return assertSameTest;
  };
  const assertSameTest = getAssertSameTest();
  // do something asynchronously...
  return new goog.Promise(function(resolve, reject) {
    // ... ensure the earlier half runs during the same test ...
    assertSameTest();
    setTimeout(function() {
      // ... and also ensure the later half runs during the same test:
      try {
        assertSameTest();
        resolve();
      } catch (assertionFailureOrResolveException) {
        reject(assertionFailureOrResolveException);
      }
    });
  });
}

let testDoneTestsSeen = [];
let testDoneErrorsSeen = {};
let testDoneRuntime = {};
/**
 * @param {goog.testing.TestCase} test
 * @param {Array<string>} errors
 */
function storeCallsAndErrors(test, errors) {
  testDoneTestsSeen.push(test.name);
  testDoneErrorsSeen[test.name] = [];
  for (let i = 0; i < errors.length; i++) {
    testDoneErrorsSeen[test.name].push(errors[i].split('\n')[0]);
  }
  testDoneRuntime[test.name] = test.getElapsedTime();
}
/**
 * @param {Array<goog.testing.TestCase>} expectedTests
 * @param {Array<Array<string>>} expectedErrors
 */
function assertStoreCallsAndErrors(expectedTests, expectedErrors) {
  assertArrayEquals(expectedTests, testDoneTestsSeen);
  for (let i = 0; i < expectedTests.length; i++) {
    const name = expectedTests[i];
    assertArrayEquals(expectedErrors, testDoneErrorsSeen[name]);
    assertEquals(typeof testDoneRuntime[testDoneTestsSeen[i]], 'number');
  }
}

function testCallbackToTestDoneOk() {
  testDoneTestsSeen = [];
  testDoneErrorsSeen = {};
  testDoneRuntime = {};
  const testCase = new goog.testing.TestCase('fooCase');
  testCase.addNewTest('foo', okGoogPromise);
  testCase.setTestDoneCallback(storeCallsAndErrors);
  return testCase.runTestsReturningPromise().then(function() {
    assertStoreCallsAndErrors(['foo'], []);
  });
}

function testCallbackToTestDoneFail() {
  testDoneTestsSeen = [];
  testDoneErrorsSeen = [];
  testDoneRuntime = {};
  const testCase = new goog.testing.TestCase('fooCase');
  testCase.addNewTest('foo', failGoogPromise);
  testCase.setTestDoneCallback(storeCallsAndErrors);
  return testCase.runTestsReturningPromise().then(function() {
    assertStoreCallsAndErrors(['foo'], ['ERROR in foo']);
  });
}

/**
 * @return {!Promise<null>}
 */
function mockTestName() {
  return failGoogPromise();
}

function testInitializeTestCase() {
  testDoneTestsSeen = [];
  testDoneErrorsSeen = [];
  const testCase = new goog.testing.TestCase('fooCase');
  testCase.getAutoDiscoveryPrefix = function() {
    return 'mockTestName';
  };
  const outerTestCase = goog.testing.TestCase.getActiveTestCase();
  goog.global['G_testRunner'].testCase = null;
  goog.testing.TestCase.initializeTestCase(testCase, storeCallsAndErrors);
  const checkAfterInitialize = goog.testing.TestCase.getActiveTestCase();
  goog.global['G_testRunner'].testCase = outerTestCase;
  // This asserts require G_testRunner to be set.
  assertEquals(checkAfterInitialize, testCase);
  assertEquals(goog.testing.TestCase.getActiveTestCase(), outerTestCase);
  // If the individual test feature is used to selecte this test, erase it.
  testCase.setTestsToRun(null);
  return testCase.runTestsReturningPromise().then(function() {
    assertStoreCallsAndErrors(['mockTestName'], ['ERROR in mockTestName']);
  });
}

function testChainSetupTestCase() {
  const objectChain = [
    {setUp: event('setUp1'), tearDown: event('tearDown1')},
    {setUp: event('setUp2'), tearDown: event('tearDown2')}
  ];

  const testCase = new goog.testing.TestCase('fooCase');
  testCase.addNewTest('foo', okGoogPromise, undefined, objectChain);

  return testCase.runTestsReturningPromise().then(function() {
    assertArrayEquals(['setUp1', 'setUp2', 'tearDown2', 'tearDown1'], events);
  });
}
