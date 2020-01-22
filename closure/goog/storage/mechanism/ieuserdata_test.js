/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.storage.mechanism.IEUserDataTest');
goog.setTestOnly();

const IEUserData = goog.require('goog.storage.mechanism.IEUserData');
/** @suppress {extraRequire} */
const mechanismSeparationTester = goog.require('goog.storage.mechanism.mechanismSeparationTester');
/** @suppress {extraRequire} */
const mechanismSharingTester = goog.require('goog.storage.mechanism.mechanismSharingTester');
/** @suppress {extraRequire} */
const mechanismTestDefinition = goog.require('goog.storage.mechanism.mechanismTestDefinition');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

testSuite({
  setUp() {
    const ieUserData = new IEUserData('test');
    if (ieUserData.isAvailable()) {
      mechanism = ieUserData;
      // There should be at least 32 KiB.
      minimumQuota = 32 * 1024;
      mechanism_shared = new IEUserData('test');
      mechanism_separate = new IEUserData('test2');
    }
  },

  tearDown() {
    if (!!mechanism) {
      mechanism.clear();
      mechanism = null;
    }
    if (!!mechanism_shared) {
      mechanism_shared.clear();
      mechanism_shared = null;
    }
    if (!!mechanism_separate) {
      mechanism_separate.clear();
      mechanism_separate = null;
    }
  },

  testAvailability() {
    if (userAgent.IE && !userAgent.isDocumentModeOrHigher(9)) {
      assertNotNull(mechanism);
      assertTrue(mechanism.isAvailable());
      assertNotNull(mechanism_shared);
      assertTrue(mechanism_shared.isAvailable());
      assertNotNull(mechanism_separate);
      assertTrue(mechanism_separate.isAvailable());
    }
  },

  testEncoding() {
    function assertEncodingPair(cleartext, encoded) {
      assertEquals(encoded, IEUserData.encodeKey_(cleartext));
      assertEquals(cleartext, IEUserData.decodeKey_(encoded));
    }
    assertEncodingPair('simple', '_simple');
    assertEncodingPair(
        'aa.bb%cc!\0$\u4e00.', '_aa.2Ebb.25cc.21.00.24.E4.B8.80.2E');
  },
});
