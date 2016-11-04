// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.testing.AsyncTestCaseTest');
goog.setTestOnly('goog.testing.AsyncTestCaseTest');

goog.require('goog.debug.Error');
goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');

function testControlBreakingExceptionThrown() {
  var asyncTestCase = new goog.testing.AsyncTestCase();

  // doAsyncError with no message.
  try {
    asyncTestCase.doAsyncError();
  } catch (e) {
    assertTrue(e.isControlBreakingException);
    assertEquals('', e.message);
  }

  // doAsyncError with string.
  var errorMessage1 = 'Error message 1';
  try {
    asyncTestCase.doAsyncError(errorMessage1);
  } catch (e) {
    assertTrue(e.isControlBreakingException);
    assertEquals(errorMessage1, e.message);
  }

  // doAsyncError with error.
  var errorMessage2 = 'Error message 2';
  try {
    var error = new goog.debug.Error(errorMessage2);
    asyncTestCase.doAsyncError(error);
  } catch (e) {
    assertTrue(e.isControlBreakingException);
    assertEquals(errorMessage2, e.message);
  }
}

function testMaybeFailTestEarly() {
  var message = 'Error in setUpPage().';
  var asyncTestCase = new goog.testing.AsyncTestCase();
  asyncTestCase.setUpPage = function() { throw Error(message); };
  asyncTestCase.addNewTest('test', function() { assertTrue(true); });
  asyncTestCase.runTests();
  window.setTimeout(function() {
    assertFalse(asyncTestCase.isSuccess());
    var errors = asyncTestCase.getResult().errors;
    assertEquals(1, errors.length);
    assertEquals(message, errors[0].message);
  }, asyncTestCase.stepTimeout * 2);
}
