// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

let expectedFailures;

testSuite({
  setUpPage() {
    expectedFailures = new ExpectedFailures();
  },

  tearDown() {
    expectedFailures.handleTearDown();
  },

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
  }
});
