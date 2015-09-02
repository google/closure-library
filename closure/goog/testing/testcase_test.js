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
goog.require('goog.string');
goog.require('goog.testing.MockRandom');
goog.require('goog.testing.TestCase');
goog.require('goog.testing.jsunit');


// Dual of fail().
var ok = function() { assertTrue(true); };

// Native Promise-based equivalent of ok().
var okPromise = function() { return Promise.resolve(null); };

// Native Promise-based equivalent of fail().
var failPromise = function() { return Promise.reject(null); };

// Native Promise-based test that returns promise which never resolves.
var neverResolvedPromise = function() { return new Promise(function() {}); };

// goog.Promise-based equivalent of ok().
var okGoogPromise = function() { return goog.Promise.resolve(null); };

// goog.Promise-based equivalent of fail().
var failGoogPromise = function() { return goog.Promise.reject(null); };

// Native Promise-based test that returns promise which never resolves.
var neverResolvedGoogPromise = function() {
  return new goog.Promise(function() {});
};

function testEmptyTestCase() {
  var testCase = new goog.testing.TestCase();
  testCase.runTests();
  assertTrue(testCase.isSuccess());
  var result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(0, result.totalCount);
  assertEquals(0, result.runCount);
  assertEquals(0, result.successCount);
  assertEquals(0, result.errors.length);
}

function testEmptyTestCaseReturningPromise() {
  return new goog.testing.TestCase().runTestsReturningPromise().
      then(function(result) {
        assertTrue(result.complete);
        assertEquals(0, result.totalCount);
        assertEquals(0, result.runCount);
        assertEquals(0, result.successCount);
        assertEquals(0, result.errors.length);
      });
}

function testTestCase_SyncSuccess() {
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', ok);
  testCase.runTests();
  assertTrue(testCase.isSuccess());
  var result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(1, result.totalCount);
  assertEquals(1, result.runCount);
  assertEquals(1, result.successCount);
  assertEquals(0, result.errors.length);
}

function testTestCaseReturningPromise_SyncSuccess() {
  var testCase = new goog.testing.TestCase();
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
  var testCase = new goog.testing.TestCase();
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
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', okPromise);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(1, result.successCount);
    assertEquals(0, result.errors.length);
  });
}

function testTestCase_SyncFailure() {
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', fail);
  testCase.runTests();
  assertFalse(testCase.isSuccess());
  var result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(1, result.totalCount);
  assertEquals(1, result.runCount);
  assertEquals(0, result.successCount);
  assertEquals(1, result.errors.length);
  assertEquals('foo', result.errors[0].source);
}

function testTestCaseReturningPromise_SyncFailure() {
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', fail);
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

function testTestCaseReturningPromise_GoogPromiseReject() {
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', failGoogPromise);
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

function testTestCaseReturningPromise_GoogPromiseTimeout() {
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', neverResolvedGoogPromise);
  var startTimestamp = new Date().getTime();
  // We have to decrease timeout for the artificial 'foo' test otherwise current
  // test will timeout.
  testCase.promiseTimeout = 500;
  var startTimestamp = new Date().getTime();
  return testCase.runTestsReturningPromise().then(function(result) {
    var elapsedTime = new Date().getTime() - startTimestamp;
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(0, result.successCount);
    assertEquals(1, result.errors.length);
    // Check that error message mentions test name.
    assertTrue(goog.string.contains(result.errors[0].message, 'foo'));
    // Check that error message mentions how to change timeout.
    assertTrue(goog.string.contains(result.errors[0].message,
        'G_testRunner.testCase.promiseTimeout'));
    assertTrue(elapsedTime >= testCase.promiseTimeout - 100 &&
        elapsedTime <= testCase.promiseTimeout + 100);
  });
}

function testTestCaseReturningPromise_PromiseReject() {
  if (!('Promise' in goog.global)) {
    return;
  }
  var testCase = new goog.testing.TestCase();
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
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', neverResolvedPromise);
  // We have to decrease timeout for the artificial 'foo' test otherwise current
  // test will timeout.
  testCase.promiseTimeout = 500;
  var startTimestamp = new Date().getTime();
  return testCase.runTestsReturningPromise().then(function(result) {
    var elapsedTime = new Date().getTime() - startTimestamp;
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.totalCount);
    assertEquals(1, result.runCount);
    assertEquals(0, result.successCount);
    assertEquals(1, result.errors.length);
    // Check that error message mentions test name.
    assertTrue(goog.string.contains(result.errors[0].message, 'foo'));
    // Check that error message mentions how to change timeout.
    assertTrue(goog.string.contains(result.errors[0].message,
        'G_testRunner.testCase.promiseTimeout'));
    assertTrue(elapsedTime >= testCase.promiseTimeout - 100 &&
        elapsedTime <= testCase.promiseTimeout + 100);
  });
}

function testTestCase_SyncSuccess_SyncFailure() {
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', ok);
  testCase.addNewTest('bar', fail);
  testCase.runTests();
  assertFalse(testCase.isSuccess());
  var result = testCase.getResult();
  assertTrue(result.complete);
  assertEquals(2, result.totalCount);
  assertEquals(2, result.runCount);
  assertEquals(1, result.successCount);
  assertEquals(1, result.errors.length);
  assertEquals('bar', result.errors[0].source);
}

function testTestCaseReturningPromise_SyncSuccess_SyncFailure() {
  var testCase = new goog.testing.TestCase();
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
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', okGoogPromise);
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

function testTestCaseReturningPromise_PromiseResolve_PromiseReject() {
  if (!('Promise' in goog.global)) {
    return;
  }
  var testCase = new goog.testing.TestCase();
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
  var testCase = new goog.testing.TestCase();
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
  var testCase = new goog.testing.TestCase();
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

function testTestCaseNeverRun() {
  var testCase = new goog.testing.TestCase();
  testCase.addNewTest('foo', fail);
  // Missing testCase.runTests()
  var result = testCase.getResult();
  assertFalse(result.complete);
  assertEquals(0, result.totalCount);
  assertEquals(0, result.runCount);
  assertEquals(0, result.successCount);
  assertEquals(0, result.errors.length);
}

function testParseOrder() {
  assertNull(goog.testing.TestCase.parseOrder_(''));
  assertNull(goog.testing.TestCase.parseOrder_('?order=invalid'));
  assertEquals('natural', goog.testing.TestCase.parseOrder_('?order=natural'));
  assertEquals('sorted', goog.testing.TestCase.parseOrder_('?a&order=sorted'));
  assertEquals('random', goog.testing.TestCase.parseOrder_('?b&order=random'));
  assertEquals('random', goog.testing.TestCase.parseOrder_('?ORDER=RANDOM'));
}

function testParseRunTests() {
  assertNull(goog.testing.TestCase.parseRunTests_(''));
  assertNull(goog.testing.TestCase.parseRunTests_('?runTests='));
  assertObjectEquals({
    'testOne': true
  }, goog.testing.TestCase.parseRunTests_('?runTests=testOne'));
  assertObjectEquals({
    'testOne': true,
    'testTwo': true
  }, goog.testing.TestCase.parseRunTests_('?foo=bar&runTests=testOne,testTwo'));
  assertObjectEquals({
    '1': true,
    '2': true,
    '3': true,
    'testShouting': true,
    'TESTSHOUTING': true
  }, goog.testing.TestCase.parseRunTests_(
      '?RUNTESTS=testShouting,TESTSHOUTING,1,2,3'));
}

function testSortOrder_natural() {
  var testCase = new goog.testing.TestCase();
  testCase.setOrder('natural');

  var testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_a', function() { assertEquals(1, testIndex++); });
  testCase.addNewTest('test_b', function() { assertEquals(2, testIndex++); });
  testCase.orderTests_();
  testCase.runTests();

  assertTrue(testCase.isSuccess());
  var result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(3, result.runCount);
  assertEquals(3, result.successCount);
  assertEquals(0, result.errors.length);
}

function testSortOrder_random() {
  var testCase = new goog.testing.TestCase();
  testCase.setOrder('random');

  var testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_a', function() { assertEquals(2, testIndex++); });
  testCase.addNewTest('test_b', function() { assertEquals(1, testIndex++); });

  var mockRandom = new goog.testing.MockRandom([0.5, 0.5]);
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
  var result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(3, result.runCount);
  assertEquals(3, result.successCount);
  assertEquals(0, result.errors.length);
}

function testSortOrder_sorted() {
  var testCase = new goog.testing.TestCase();
  testCase.setOrder('sorted');

  var testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(2, testIndex++); });
  testCase.addNewTest('test_a', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_b', function() { assertEquals(1, testIndex++); });
  testCase.orderTests_();
  testCase.runTests();

  assertTrue(testCase.isSuccess());
  var result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(3, result.runCount);
  assertEquals(3, result.successCount);
  assertEquals(0, result.errors.length);
}

function testRunTests() {
  var testCase = new goog.testing.TestCase();
  testCase.setTestsToRun({
    'test_a': true,
    'test_c': true
  });

  var testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_a', function() { assertEquals(1, testIndex++);});
  testCase.addNewTest('test_b', fail);
  testCase.runTests();

  assertTrue(testCase.isSuccess());
  var result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(2, result.runCount);
  assertEquals(2, result.successCount);
  assertEquals(0, result.errors.length);
}

function testRunTests_byIndex() {
  var testCase = new goog.testing.TestCase();
  testCase.setTestsToRun({
    '0': true,
    '2': true
  });

  var testIndex = 0;
  testCase.addNewTest('test_c', function() { assertEquals(0, testIndex++); });
  testCase.addNewTest('test_a', fail);
  testCase.addNewTest('test_b', function() { assertEquals(1, testIndex++); });
  testCase.runTests();

  assertTrue(testCase.isSuccess());
  var result = testCase.getResult();
  assertEquals(3, result.totalCount);
  assertEquals(2, result.runCount);
  assertEquals(2, result.successCount);
  assertEquals(0, result.errors.length);
}

function testMaybeFailTestEarly() {
  var message = 'Error in setUpPage().';
  var testCase = new goog.testing.TestCase();
  testCase.setUpPage = function() {
    throw Error(message);
  };
  testCase.addNewTest('test', ok);
  testCase.runTests();
  assertFalse(testCase.isSuccess());
  var errors = testCase.getResult().errors;
  assertEquals(1, errors.length);
  assertEquals(message, errors[0].message);
}

function testSetUpReturnsPromiseThatTimesOut() {
  var testCase = new goog.testing.TestCase();
  testCase.promiseTimeout = 500;
  testCase.setUp = neverResolvedGoogPromise;
  testCase.addNewTest('test', ok);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.errors.length);
    assertTrue(goog.string.contains(result.errors[0].message, 'setUp'));
  });
}

function testTearDownReturnsPromiseThatTimesOut() {
  var testCase = new goog.testing.TestCase();
  testCase.promiseTimeout = 500;
  testCase.tearDown = neverResolvedGoogPromise;
  testCase.addNewTest('test', ok);
  return testCase.runTestsReturningPromise().then(function(result) {
    assertFalse(testCase.isSuccess());
    assertTrue(result.complete);
    assertEquals(1, result.errors.length);
    assertTrue(goog.string.contains(result.errors[0].message, 'tearDown'));
  });
}

