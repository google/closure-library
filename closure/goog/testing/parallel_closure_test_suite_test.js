// Copyright 2015 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS-IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('goog.testing.parallelClosureTestSuiteTest');
goog.setTestOnly('goog.testing.parallelClosureTestSuiteTest');

const ArgumentMatcher = goog.require('goog.testing.mockmatchers.ArgumentMatcher');
const MockControl = goog.require('goog.testing.MockControl');
const MultiTestRunner = goog.require('goog.testing.MultiTestRunner');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const TestCase = goog.require('goog.testing.TestCase');
const dom = goog.require('goog.dom');
const mockmatchers = goog.require('goog.testing.mockmatchers');
const parallelClosureTestSuite = goog.require('goog.testing.parallelClosureTestSuite');
const testSuite = goog.require('goog.testing.testSuite');

const mocks = new MockControl();
const stubs = new PropertyReplacer();

function setTestRunnerGlobals(
    testTimeout, allTests, parallelFrames, parallelTimeout) {
  const tr = goog.global['G_parallelTestRunner'] = {};
  tr['testTimeout'] = testTimeout;
  tr['allTests'] = allTests;
  tr['parallelFrames'] = parallelFrames;
  tr['parallelTimeout'] = parallelTimeout;
}

testSuite({
  tearDown: function() {
    goog.global['G_parallelTestRunner'] = undefined;
    mocks.$tearDown();
    stubs.reset();
  },

  testProcessAllTestResultsEmptyResults: function() {
    const testResults = [];
    const allResults =
        parallelClosureTestSuite.processAllTestResults(testResults);
    assertEquals(0, allResults.totalTests);
    assertEquals(0, allResults.totalFailures);
    assertEquals('', allResults.failureReports);
    assertObjectEquals({}, allResults.allResults);
  },

  testProcessAllTestResultsNoFailures: function() {
    const testResults = [{'testA': []}, {'testB': []}];
    const allResults =
        parallelClosureTestSuite.processAllTestResults(testResults);
    assertEquals(2, allResults.totalTests);
    assertEquals(0, allResults.totalFailures);
    assertEquals('', allResults.failureReports);
    assertObjectEquals({'testA': [], 'testB': []}, allResults.allResults);
  },

  testProcessAllTestResultsWithFailures: function() {
    let testResults = [{'testA': []}, {'testB': ['testB Failed!']}];
    let allResults =
        parallelClosureTestSuite.processAllTestResults(testResults);
    assertEquals(2, allResults.totalTests);
    assertEquals(1, allResults.totalFailures);
    assertEquals('testB Failed!\n', allResults.failureReports);
    assertObjectEquals(
        {'testA': [], 'testB': ['testB Failed!']}, allResults.allResults);

    testResults = [{'testA': ['testA Failed!']}, {'testB': ['testB Failed!']}];
    allResults = parallelClosureTestSuite.processAllTestResults(testResults);
    assertEquals(2, allResults.totalTests);
    assertEquals(2, allResults.totalFailures);
    assertContains('testB Failed!\n', allResults.failureReports);
    assertContains('testA Failed!\n', allResults.failureReports);
    assertObjectEquals(
        {'testA': ['testA Failed!'], 'testB': ['testB Failed!']},
        allResults.allResults);
  },

  testSetUpPageTestRunnerInitializedProperly: function() {
    setTestRunnerGlobals(100, ['foo.html'], 8, 360);
    const mockRender =
        mocks.createMethodMock(MultiTestRunner.prototype, 'render');
    const elementMatcher = new ArgumentMatcher(function(container) {
      return dom.isElement(container);
    });
    const testCaseObj = {promiseTimeout: -1};
    stubs.set(
        TestCase, 'getActiveTestCase', function() { return testCaseObj; });

    mockRender(elementMatcher);

    mocks.$replayAll();

    const testRunner = parallelClosureTestSuite.setUpPage();
    assertArrayEquals(['foo.html'], testRunner.getAllTests());
    assertEquals(8, testRunner.getPoolSize());
    assertEquals(100000, testRunner.getTimeout());
    assertEquals(360000, testCaseObj.promiseTimeout);
    mocks.$verifyAll();
    testRunner.dispose();
  },

  testRunAllTestsFailures: function() {
    setTestRunnerGlobals(100, ['foo.html', 'bar.html'], 8, 360);
    const mockStart =
        mocks.createMethodMock(MultiTestRunner.prototype, 'start');
    const mockFail = mocks.createMethodMock(goog.global, 'fail');
    const failureMatcher = new ArgumentMatcher(function(failMsg) {
      return /testA Failed!/.test(failMsg) &&
          /1 of 2 test\(s\) failed/.test(failMsg);
    });
    // Don't want this test case's timeout overwritten, so set a stub for
    // getActiveTestCase.
    stubs.set(
        TestCase, 'getActiveTestCase', function() { return {timeout: 100}; });

    mockStart();
    fail(failureMatcher);

    mocks.$replayAll();

    const testRunner = parallelClosureTestSuite.setUpPage();
    const testPromise = parallelClosureTestSuite.testRunAllTests();
    testRunner.dispatchEvent({
      'type': MultiTestRunner.TESTS_FINISHED,
      'allTestResults': [{'testA': ['testA Failed!']}, {'testB': []}]
    });

    return testPromise.then(function() {
      mocks.$verifyAll();
      testRunner.dispose();
    });
  },

  testRunAllTestsSuccess: function() {
    setTestRunnerGlobals(100, ['foo.html', 'bar.html'], 8, 360);
    const mockStart =
        mocks.createMethodMock(MultiTestRunner.prototype, 'start');
    const mockFail = mocks.createMethodMock(goog.global, 'fail');
    const failureMatcher = new ArgumentMatcher(function(failMsg) {
      return /testA Failed!/.test(failMsg) &&
          /1 of 2 test\(s\) failed/.test(failMsg);
    });
    // Don't want this test case's timeout overwritten, so set a stub for
    // getActiveTestCase.
    stubs.set(
        TestCase, 'getActiveTestCase', function() { return {timeout: 100}; });

    mockStart();
    fail(mockmatchers.ignoreArgument).$times(0);

    mocks.$replayAll();

    const testRunner = parallelClosureTestSuite.setUpPage();
    const testPromise = parallelClosureTestSuite.testRunAllTests();
    testRunner.dispatchEvent({
      'type': MultiTestRunner.TESTS_FINISHED,
      'allTestResults': [{'testA': []}, {'testB': []}]
    });

    return testPromise.then(function() {
      mocks.$verifyAll();
      testRunner.dispose();
    });
  }
});
