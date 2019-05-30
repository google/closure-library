// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.async.MockControlTest');
goog.setTestOnly();

const AsyncMockControl = goog.require('goog.testing.async.MockControl');
const Deferred = goog.require('goog.async.Deferred');
const MockControl = goog.require('goog.testing.MockControl');
const TestCase = goog.require('goog.testing.TestCase');
const asserts = goog.require('goog.testing.asserts');
const testSuite = goog.require('goog.testing.testSuite');

let mockControl;
let asyncMockControl;

let mockControl2;
let asyncMockControl2;

function assertVerifyFails() {
  assertThrowsJsUnitException(() => {
    mockControl.$verifyAll();
  });
}

testSuite({
  setUp() {
    // TODO(b/25875505): Fix unreported assertions (go/failonunreportedasserts).
    TestCase.getActiveTestCase().failOnUnreportedAsserts = false;

    mockControl = new MockControl();
    asyncMockControl = new AsyncMockControl(mockControl);

    // We need two of these for the tests where we need to verify our meta-test
    // assertions without verifying our tested assertions.
    mockControl2 = new MockControl();
    asyncMockControl2 = new AsyncMockControl(mockControl2);
  },

  testCreateCallbackMockFailure() {
    asyncMockControl.createCallbackMock('failingCallbackMock', () => {});
    assertVerifyFails();
  },

  testCreateCallbackMockSuccess() {
    const callback =
        asyncMockControl.createCallbackMock('succeedingCallbackMock', () => {});
    callback();
    mockControl.$verifyAll();
  },

  testCreateCallbackMockSuccessWithArg() {
    const callback = asyncMockControl.createCallbackMock(
        'succeedingCallbackMockWithArg',
        asyncMockControl.createCallbackMock('metaCallbackMock', (val) => {
          assertEquals(10, val);
        }));
    callback(10);
    mockControl.$verifyAll();
  },

  testCreateCallbackMockSuccessWithArgs() {
    const callback = asyncMockControl.createCallbackMock(
        'succeedingCallbackMockWithArgs',
        asyncMockControl.createCallbackMock(
            'metaCallbackMock', (val1, val2, val3) => {
              assertEquals(10, val1);
              assertEquals('foo', val2);
              assertObjectEquals({foo: 'bar'}, val3);
            }));
    callback(10, 'foo', {foo: 'bar'});
    mockControl.$verifyAll();
  },

  testAsyncAssertEqualsFailureNeverCalled() {
    asyncMockControl.asyncAssertEquals('never called', 12);
    assertVerifyFails();
  },

  testAsyncAssertEqualsFailureNumberOfArgs() {
    assertThrowsJsUnitException(() => {
      asyncMockControl.asyncAssertEquals('wrong number of args', 12)();
    });
  },

  testAsyncAssertEqualsFailureOneArg() {
    assertThrowsJsUnitException(() => {
      asyncMockControl.asyncAssertEquals('wrong arg value', 12)(13);
    });
  },

  testAsyncAssertEqualsFailureThreeArgs() {
    assertThrowsJsUnitException(() => {
      asyncMockControl.asyncAssertEquals('wrong arg values', 1, 2, 15)(
          2, 2, 15);
    });
  },

  testAsyncAssertEqualsSuccessNoArgs() {
    asyncMockControl.asyncAssertEquals('should be called')();
    mockControl.$verifyAll();
  },

  testAsyncAssertEqualsSuccessThreeArgs() {
    asyncMockControl.asyncAssertEquals('should have args', 1, 2, 3)(1, 2, 3);
    mockControl.$verifyAll();
  },

  testAssertDeferredErrorFailureNoError() {
    const deferred = new Deferred();
    asyncMockControl.assertDeferredError(deferred, () => {});
    assertVerifyFails();
  },

  testAssertDeferredErrorSuccess() {
    const deferred = new Deferred();
    asyncMockControl.assertDeferredError(deferred, () => {
      deferred.errback(new Error('FAIL'));
    });
    mockControl.$verifyAll();
  },

  testAssertDeferredEqualsFailureActualDeferredNeverResolves() {
    const actual = new Deferred();
    asyncMockControl.assertDeferredEquals('doesn\'t resolve', 12, actual);
    assertVerifyFails();
  },

  testAssertDeferredEqualsFailureActualDeferredNeverResolvesBoth() {
    const actualDeferred = new Deferred();
    const expectedDeferred = new Deferred();
    expectedDeferred.callback(12);
    asyncMockControl.assertDeferredEquals(
        'doesn\'t resolve', expectedDeferred, actualDeferred);
    assertVerifyFails();
  },

  testAssertDeferredEqualsFailureExpectedDeferredNeverResolves() {
    const expected = new Deferred();
    asyncMockControl.assertDeferredEquals('doesn\'t resolve', expected, 12);
    assertVerifyFails();
  },

  testAssertDeferredEqualsFailureExpectedDeferredNeverResolvesBoth() {
    const actualDeferred = new Deferred();
    const expectedDeferred = new Deferred();
    actualDeferred.callback(12);
    asyncMockControl.assertDeferredEquals(
        'doesn\'t resolve', expectedDeferred, actualDeferred);
    assertVerifyFails();
  },

  testAssertDeferredEqualsFailureWrongValueActualDeferred() {
    const actual = new Deferred();
    asyncMockControl.assertDeferredEquals('doesn\'t resolve', 12, actual);
    asyncMockControl2.assertDeferredError(actual, () => {
      actual.callback(13);
    });
    mockControl2.$verifyAll();
  },

  testAssertDeferredEqualsFailureWrongValueExpectedDeferred() {
    const expected = new Deferred();
    asyncMockControl.assertDeferredEquals('doesn\'t resolve', expected, 12);
    asyncMockControl2.assertDeferredError(expected, () => {
      expected.callback(13);
    });
    mockControl2.$verifyAll();
  },

  testAssertDeferredEqualsFailureWongValueBothDeferred() {
    const actualDeferred = new Deferred();
    const expectedDeferred = new Deferred();
    asyncMockControl.assertDeferredEquals(
        'different values', expectedDeferred, actualDeferred);
    expectedDeferred.callback(12);
    asyncMockControl2.assertDeferredError(actualDeferred, () => {
      actualDeferred.callback(13);
    });
    assertVerifyFails();
    mockControl2.$verifyAll();
  },

  testAssertDeferredEqualsFailureNeitherDeferredEverResolves() {
    const actualDeferred = new Deferred();
    const expectedDeferred = new Deferred();
    asyncMockControl.assertDeferredEquals(
        'doesn\'t resolve', expectedDeferred, actualDeferred);
    assertVerifyFails();
  },

  testAssertDeferredEqualsSuccessActualDeferred() {
    const actual = new Deferred();
    asyncMockControl.assertDeferredEquals('should succeed', 12, actual);
    actual.callback(12);
    mockControl.$verifyAll();
  },

  testAssertDeferredEqualsSuccessExpectedDeferred() {
    const expected = new Deferred();
    asyncMockControl.assertDeferredEquals('should succeed', expected, 12);
    expected.callback(12);
    mockControl.$verifyAll();
  },

  testAssertDeferredEqualsSuccessBothDeferred() {
    const actualDeferred = new Deferred();
    const expectedDeferred = new Deferred();
    asyncMockControl.assertDeferredEquals(
        'should succeed', expectedDeferred, actualDeferred);
    expectedDeferred.callback(12);
    actualDeferred.callback(12);
    mockControl.$verifyAll();
  },
});
