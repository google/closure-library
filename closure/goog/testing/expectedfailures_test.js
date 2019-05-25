// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.ExpectedFailuresTest');
goog.setTestOnly();

const ExpectedFailures = goog.require('goog.testing.ExpectedFailures');
const JsUnitException = goog.require('goog.testing.JsUnitException');
const Logger = goog.require('goog.debug.Logger');
const TestCase = goog.require('goog.testing.TestCase');
const testSuite = goog.require('goog.testing.testSuite');

let count;
let expectedFailures;
let lastLevel;
let lastMessage;

// Stub out the logger.
ExpectedFailures.prototype.logger_.log = (level, message) => {
  lastLevel = level;
  lastMessage = message;
  count++;
};

// Individual test methods.

testSuite({
  setUp() {
    // TODO(b/25875505): Fix unreported assertions (go/failonunreportedasserts).
    TestCase.getActiveTestCase().failOnUnreportedAsserts = false;

    expectedFailures = new ExpectedFailures();
    count = 0;
    lastLevel = lastMessage = '';
  },

  testNoExpectedFailure() {
    expectedFailures.handleTearDown();
  },

  testPreventExpectedFailure() {
    expectedFailures.expectFailureFor(true);

    expectedFailures.handleException(new JsUnitException('', ''));
    assertEquals('Should have logged a message', 1, count);
    assertEquals(
        'Should have logged an info message', Logger.Level.INFO, lastLevel);
    assertContains(
        'Should log a suppression message', 'Suppressing test failure',
        lastMessage);

    expectedFailures.handleTearDown();
    assertEquals('Should not have logged another message', 1, count);
  },

  testDoNotPreventException() {
    const ex = 'exception';
    expectedFailures.expectFailureFor(false);
    const e = assertThrows('Should have rethrown exception', () => {
      expectedFailures.handleException(ex);
    });
    assertEquals('Should rethrow same exception', ex, e);
  },

  testExpectedFailureDidNotOccur() {
    expectedFailures.expectFailureFor(true);

    expectedFailures.handleTearDown();
    assertEquals('Should have logged a message', 1, count);
    assertEquals(
        'Should have logged a warning', Logger.Level.WARNING, lastLevel);
    assertContains(
        'Should log a suppression message', 'Expected a test failure',
        lastMessage);
  },

  testRun() {
    expectedFailures.expectFailureFor(true);

    expectedFailures.run(() => {
      fail('Expected failure');
    });

    assertEquals('Should have logged a message', 1, count);
    assertEquals(
        'Should have logged an info message', Logger.Level.INFO, lastLevel);
    assertContains(
        'Should log a suppression message', 'Suppressing test failure',
        lastMessage);

    expectedFailures.handleTearDown();
    assertEquals('Should not have logged another message', 1, count);
  },

  testRunStrict() {
    expectedFailures.expectFailureFor(true);

    const ex = assertThrows(() => {
      expectedFailures.run(
          () => {
              // Doesn't fail!
          });
    });
    assertContains(
        'Expected a test failure in \'testRunStrict\' but the test passed.',
        ex.message);
  },

  testRunLenient() {
    expectedFailures.expectFailureFor(true);

    expectedFailures.run(
        () => {
            // Doesn't fail!
        },
        true);
    expectedFailures.handleTearDown();
    assertEquals('Should have logged a message', 1, count);
    assertEquals(
        'Should have logged a warning', Logger.Level.WARNING, lastLevel);
    assertContains(
        'Should log a suppression message', 'Expected a test failure',
        lastMessage);
  },
});
