/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.userAgent.flashTest');
goog.setTestOnly();

const flash = goog.require('goog.userAgent.flash');
const testSuite = goog.require('goog.testing.testSuite');

// For now, just test that the flash variables exist, the test runner will
// pick up any runtime errors.
// TODO(user): Mock out each browser implementation and test the code path
// correctly detects the flash version for each case.

testSuite({
  testFlash() {
    assertNotUndefined(flash.HAS_FLASH);
    assertNotUndefined(flash.VERSION);
    assertEquals(typeof flash.isVersion('5'), 'boolean');
  },
});
