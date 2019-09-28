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

goog.module('goog.labs.testing.environmentTest');
goog.setTestOnly();

const Environment = goog.require('goog.labs.testing.Environment');
const MockControl = goog.require('goog.testing.MockControl');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const TestCase = goog.require('goog.testing.TestCase');
const asserts = goog.require('goog.asserts');
const testingTestSuite = goog.require('goog.testing.testSuite');

let testCase = null;
let mockControl = null;
let replacer = null;
let testSuite = null;

// Use this flag to control whether the global JsUnit lifecycle events are being
// called as part of the test lifecycle or as part of the "mocked" environment.
let testing = false;

// Bootstrap it because... why not.
const env = new Environment();
// The outer test case.
const realTestCase = goog.labs.testing.EnvironmentTestCase_.getInstance();

/** @suppress {visibility} */
function setUpTestCase() {
  /** @suppress {missingRequire} */
  testCase = new goog.labs.testing.EnvironmentTestCase_();
  goog.labs.testing.EnvironmentTestCase_.getInstance = () =>
      asserts.assert(testCase);
}

/**
 * @param {?TestCase} testCase
 * @param {string} name
 * @param {string} message
 * @suppress {visibility}
 */
function assertTestFailure(testCase, name, message) {
  assertContains(
      message,
      asserts.assert(testCase).getResult().resultsByName[name][0].toString());
}

/**
 * @param {?TestCase} testCase
 * @param {!Environment} environment
 * @suppress {visibility}
 */
function registerEnvironment(testCase, environment) {
  asserts.assert(testCase).registerEnvironment_(environment);
}

/**
 * @param {?TestCase} testCase
 * @return {!IThenable<!TestCase.Result>}
 * @suppress {visibility}
 */
function runTestsReturningPromise(testCase) {
  return asserts.assert(testCase).runTestsReturningPromise();
}

testingTestSuite(testSuite = {
  setUp() {
    // These methods end up being called by the test framework for these tests
    // as well as the part of the environment that is being tested as part
    // of the test.  Bail if the test is already running.
    if (testing) {
      // This value is used by the testSetupReturnsValue test below
      return 'hello';
    }

    // Temporarily override the initializeTestRunner method to avoid installing
    // our "test" TestCase.
    const initFn = TestCase.initializeTestRunner;
    TestCase.initializeTestRunner = () => {};
    setUpTestCase();
    TestCase.initializeTestRunner = initFn;

    mockControl = new MockControl();

    replacer = new PropertyReplacer();
  },

  tearDown() {
    if (testing) {
      return;
    }

    replacer.reset();

    mockControl.$resetAll();
    mockControl.$tearDown();
  },

  async testLifecycle() {
    testing = true;

    const envOne = mockControl.createStrictMock(Environment);
    const envTwo = mockControl.createStrictMock(Environment);
    const envThree = mockControl.createStrictMock(Environment);
    const testMethod = mockControl.createFunctionMock('testMethod');

    testCase.addNewTest('testFake', testMethod);

    registerEnvironment(testCase, envOne);
    registerEnvironment(testCase, envTwo);
    registerEnvironment(testCase, envThree);

    envOne.setUpPage();
    envTwo.setUpPage();
    envThree.setUpPage();

    envOne.setUp();
    envTwo.setUp();
    envThree.setUp();

    testMethod();

    envThree.tearDown();
    envTwo.tearDown();
    envOne.tearDown();

    envThree.tearDownPage();
    envTwo.tearDownPage();
    envOne.tearDownPage();

    mockControl.$replayAll();
    await runTestsReturningPromise(testCase);
    mockControl.$verifyAll();

    testing = false;
  },

  async testLifecycle_withObject() {
    testing = true;

    const envOne = mockControl.createStrictMock(Environment);
    const envTwo = mockControl.createStrictMock(Environment);
    const envThree = mockControl.createStrictMock(Environment);
    const testObject = {
      configureEnvironment:
          mockControl.createFunctionMock('configureEnvironment1'),
      setUp: mockControl.createFunctionMock('setUp1'),
      testSuite: {
        configureEnvironment:
            mockControl.createFunctionMock('configureEnvironment2'),
        setUp: mockControl.createFunctionMock('setUp2'),
        test: mockControl.createFunctionMock('test'),
        tearDown: mockControl.createFunctionMock('tearDown2'),
      },
      tearDown: mockControl.createFunctionMock('tearDown1'),
    };

    testCase.setTestObj(testObject);

    registerEnvironment(testCase, envOne);
    registerEnvironment(testCase, envTwo);
    registerEnvironment(testCase, envThree);

    envOne.setUpPage();
    envTwo.setUpPage();
    envThree.setUpPage();

    testObject.configureEnvironment();
    testObject.testSuite.configureEnvironment();
    envOne.setUp();
    envTwo.setUp();
    envThree.setUp();

    testObject.setUp();
    testObject.testSuite.setUp();
    testObject.testSuite.test();
    testObject.testSuite.tearDown();
    testObject.tearDown();

    envThree.tearDown();
    envTwo.tearDown();
    envOne.tearDown();

    envThree.tearDownPage();
    envTwo.tearDownPage();
    envOne.tearDownPage();

    mockControl.$replayAll();
    await runTestsReturningPromise(testCase);
    mockControl.$verifyAll();

    testing = false;
  },

  async testLifecycle_withPromises() {
    testing = true;

    const envOne = mockControl.createStrictMock(Environment);
    registerEnvironment(testCase, envOne);
    const envTwo = mockControl.createStrictMock(Environment);
    registerEnvironment(testCase, envTwo);
    const testObj = {
      'configureEnvironment':
          mockControl.createFunctionMock('configureEnvironment'),
      'setUpPage': mockControl.createFunctionMock('setUpPage'),
      'setUp': mockControl.createFunctionMock('setUp'),
      'tearDown': mockControl.createFunctionMock('tearDown'),
      'tearDownPage': mockControl.createFunctionMock('tearDownPage'),
      'testFoo': mockControl.createFunctionMock('testFoo'),
      'testBar': {
        'configureEnvironment':
            mockControl.createFunctionMock('configureEnvironmentTest'),
        'setUp': mockControl.createFunctionMock('setUpTest'),
        'test': mockControl.createFunctionMock('testBar'),
        'tearDown': mockControl.createFunctionMock('tearDownTest'),
      },
    };
    testCase.setTestObj(testObj);

    envOne.setUpPage();
    envTwo.setUpPage();
    testObj.setUpPage();

    testObj.configureEnvironment();
    envOne.setUp();
    envTwo.setUp();
    testObj.setUp();
    testObj.testFoo();
    testObj.tearDown();
    envTwo.tearDown();
    envOne.tearDown();

    testObj.configureEnvironment();
    testObj.testBar.configureEnvironment();
    envOne.setUp();
    envTwo.setUp();
    testObj.setUp();
    testObj.testBar.setUp();
    testObj.testBar.test();
    testObj.testBar.tearDown();
    testObj.tearDown();
    envTwo.tearDown();
    envOne.tearDown();

    testObj.tearDownPage();
    envTwo.tearDownPage();
    envOne.tearDownPage();

    mockControl.$replayAll();

    const result = await runTestsReturningPromise(testCase);

    mockControl.$verifyAll();
    assertTrue(result.complete);
    assertEquals(2, result.totalCount);
    assertEquals(2, result.runCount);
    assertEquals(2, result.successCount);
    assertEquals(0, result.errors.length);

    testing = false;
  },

  testTearDownWithMockControl() {
    testing = true;

    const envWith = new Environment();
    const envWithout = new Environment();

    const mockControlMock = mockControl.createStrictMock(MockControl);
    const mockControlCtorMock =
        mockControl.createMethodMock(goog.testing, 'MockControl');
    mockControlCtorMock().$times(1).$returns(mockControlMock);
    // Expecting verify / reset calls twice since two environments use the same
    // mockControl, but only one created it and is allowed to tear it down.
    mockControlMock.$verifyAll();
    mockControlMock.$replayAll();
    mockControlMock.$verifyAll();
    mockControlMock.$resetAll();
    mockControlMock.$tearDown().$times(1);
    mockControlMock.$verifyAll();
    mockControlMock.$replayAll();
    mockControlMock.$verifyAll();
    mockControlMock.$resetAll();

    mockControl.$replayAll();
    envWith.withMockControl();
    envWithout.mockControl = mockControlMock;
    envWith.tearDown();
    envWithout.tearDown();
    mockControl.$verifyAll();
    mockControl.$resetAll();

    testing = false;
  },

  testAutoDiscoverTests() {
    testing = true;

    const setUpPageFn = testCase.setUpPage;
    const setUpFn = testCase.setUp;
    const tearDownFn = testCase.tearDown;
    const tearDownPageFn = testCase.tearDownPage;

    goog.global.testDummy1 = function() {};
    goog.global.testDummy2 = function() {};
    testCase.autoDiscoverTests();

    assertEquals(setUpPageFn, testCase.setUpPage);
    assertEquals(setUpFn, testCase.setUp);
    assertEquals(tearDownFn, testCase.tearDown);
    assertEquals(tearDownPageFn, testCase.tearDownPage);

    // Note that this number changes when more tests are added to this file as
    // the environment reflects on the window global scope for JsUnit.
    assertEquals(2, testCase.getTests().length);

    testing = false;
  },

  // Verify "goog.testing.testSuite" integration
  testTestSuiteTests() {
    testing = true;

    // don't try to reinitialize the test runner, while a test is running.
    replacer.set(TestCase, 'initializeTestRunner', () => {});

    // with an active environment.
    new Environment();

    const setUpPageFn = testCase.setUpPage;
    const setUpFn = testCase.setUp;
    const tearDownFn = testCase.tearDown;
    const tearDownPageFn = testCase.tearDownPage;

    testingTestSuite.initialized_ = false;
    testingTestSuite({
      // These lifecycle methods should not override the environment testcase
      // methods but they should be called, when the test runs.
      setUp: function() {},
      tearDown: function() {},
      setUpPage: function() {},
      tearDownPage: function() {},
      // This test method should be added.
      testMe: function() {},
      testMeToo: {
        setUp: function() {},
        testA: function() {},
        testB: function() {},
        tearDown: function() {},
      },
    });

    assertEquals(setUpPageFn, testCase.setUpPage);
    assertEquals(setUpFn, testCase.setUp);
    assertEquals(tearDownFn, testCase.tearDown);
    assertEquals(tearDownPageFn, testCase.tearDownPage);

    assertEquals(3, testCase.getTests().length);

    testing = false;
  },

  async testSetupReturnsValue() {
    testing = true;
    testCase.setLifecycleObj(testSuite);

    new Environment();

    // Expect the environment to pass on any value returned by the user defined
    // setUp method.
    assertEquals('hello', await testCase.setUp());

    testCase.tearDown();
    testing = false;
  },

  async testMockClock() {
    testing = true;

    new Environment().withMockClock();

    testCase.addNewTest('testThatThrowsEventually', () => {
      setTimeout(() => {
        throw new Error('LateErrorMessage');
      }, 200);
    });

    await runTestsReturningPromise(testCase);
    assertTestFailure(testCase, 'testThatThrowsEventually', 'LateErrorMessage');

    testing = false;
  },

  async testMockControl() {
    testing = true;

    const env = new Environment().withMockControl();
    const test = env.mockControl.createFunctionMock('test');

    testCase.addNewTest('testWithoutVerify', () => {
      test();
      env.mockControl.$replayAll();
      test();
    });

    await runTestsReturningPromise(testCase);
    assertNull(env.mockClock);

    testing = false;
  },

  async testMock() {
    testing = true;

    const env = new Environment().withMockControl();
    const mock = env.mock({test: function() {}});

    testCase.addNewTest('testMockCalled', () => {
      mock.test().$times(2);

      env.mockControl.$replayAll();
      mock.test();
      mock.test();
      env.mockControl.$verifyAll();
    });

    await runTestsReturningPromise(testCase);

    testing = false;
  },

  async testLooseMock() {
    testing = true;

    const env = new Environment().withMockControl();
    const mock = env.looseMock({
      a: function() {},
      b: function() {},
    });

    testCase.addNewTest('testLooseMockCalled', () => {
      mock.a().$times(2);
      mock.b().$times(2);

      env.mockControl.$replayAll();
      mock.a();
      mock.b();
      mock.a();
      mock.b();
      env.mockControl.$verifyAll();
    });

    await runTestsReturningPromise(testCase);

    testing = false;
  },

  async testLooseMockIgnoresUnexpected() {
    testing = true;

    const env = new Environment().withMockControl();
    const mock = env.looseMock(
        {
          a: function() {},
          b: function() {},
        },
        true);

    testCase.addNewTest('testLooseMockIgnoresUnexpectedCalls', () => {
      env.mockControl.$replayAll();
      mock.a();
      mock.b();
      mock.b();
      mock.a();
      env.mockControl.$verifyAll();
    });

    await runTestsReturningPromise(testCase);

    testing = false;
  },
});
