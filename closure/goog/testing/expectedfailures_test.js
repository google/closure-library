/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.testing.ExpectedFailuresTest');
goog.setTestOnly();

const ExpectedFailures = goog.require('goog.testing.ExpectedFailures');
const JsUnitException = goog.require('goog.testing.JsUnitException');
const Logger = goog.require('goog.debug.Logger');
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

    const ex = assertThrowsJsUnitException(() => {
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
