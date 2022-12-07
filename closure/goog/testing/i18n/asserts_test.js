/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Unit tests for goog.testing.i18n.asserts.
 */

goog.module('goog.testing.i18n.assertsTest');
goog.setTestOnly();

const ExpectedFailures = goog.require('goog.testing.ExpectedFailures');
const asserts = goog.require('goog.testing.i18n.asserts');
const testSuite = goog.require('goog.testing.testSuite');

// Add this mapping for testing only
asserts.addI18nMapping('mappedValue', 'newValue');
asserts.addI18nMapping('X\u0020Y', 'AB');

let expectedFailures;

testSuite({
  setUpPage() {
    expectedFailures = new ExpectedFailures();
  },

  tearDown() {
    expectedFailures.handleTearDown();
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testEdgeCases() {
    // Pass
    asserts.assertI18nEquals(null, null);
    asserts.assertI18nEquals('', '');

    // Fail
    expectedFailures.expectFailureFor(true);
    try {
      asserts.assertI18nEquals(null, '');
      asserts.assertI18nEquals(null, 'test');
      asserts.assertI18nEquals('', null);
      asserts.assertI18nEquals('', 'test');
      asserts.assertI18nEquals('test', null);
      asserts.assertI18nEquals('test', '');
    } catch (e) {
      expectedFailures.handleException(e);
    }
  },

  testContains() {
    // Real contains
    asserts.assertI18nContains('mappedValue', '** mappedValue');
    // i18n mapped contains
    asserts.assertI18nContains('mappedValue', '** newValue');

    // Negative testing
    expectedFailures.expectFailureFor(true);
    try {
      asserts.assertI18nContains('mappedValue', '** dummy');
    } catch (e) {
      expectedFailures.handleException(e);
    }
  },

  testMappingWorks() {
    // Real equality
    asserts.assertI18nEquals('test', 'test');
    // i18n mapped equality
    asserts.assertI18nEquals('mappedValue', 'newValue');

    // Negative testing
    expectedFailures.expectFailureFor(true);
    try {
      asserts.assertI18nEquals('unmappedValue', 'newValue');
    } catch (e) {
      expectedFailures.handleException(e);
    }
  },

  testWhiteSpaceStringWorks() {
    asserts.assertI18nEquals(' ', '\u1680');
    asserts.assertI18nEquals('a\u2001b ', 'a\u3000b');
    asserts.assertI18nEquals('  ab  ', 'a\u3000b');
    asserts.assertI18nEquals('a\u2001b ', 'a\u3000b');
    asserts.assertI18nEquals('\ta\u00a0\u0020b\u205fC ', 'abC');

    // And check mapped value with flexible space mapping, using several
    // strings with different white space characters
    const expectedValue = 'X\u0020Y';
    asserts.assertI18nEquals(expectedValue, 'X\u0020Y');
    asserts.assertI18nEquals(expectedValue, 'XY');
    asserts.assertI18nEquals(expectedValue, 'X\u202fY');
    asserts.assertI18nEquals(expectedValue, 'X\t\u00a0Y');

    asserts.assertI18nEquals(expectedValue, 'AB');
    asserts.assertI18nEquals(expectedValue, ' A B ');
    asserts.assertI18nEquals(expectedValue, 'A\tB');
    asserts.assertI18nEquals(expectedValue, 'A\u202fB');
    asserts.assertI18nEquals(expectedValue, 'A\u00a0B');
    asserts.assertI18nEquals(expectedValue, 'AB\u2000\t');
    asserts.assertI18nEquals(expectedValue, '\u0020\u2002AB\u3000\t');
  }

});
