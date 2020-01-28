/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.storage.mechanism.HTML5LocalStorageTest');
goog.setTestOnly();

const HTML5LocalStorage = goog.require('goog.storage.mechanism.HTML5LocalStorage');
/** @suppress {extraRequire} */
const mechanismSeparationTester = goog.require('goog.storage.mechanism.mechanismSeparationTester');
/** @suppress {extraRequire} */
const mechanismSharingTester = goog.require('goog.storage.mechanism.mechanismSharingTester');
/** @suppress {extraRequire} */
const mechanismTestDefinition = goog.require('goog.storage.mechanism.mechanismTestDefinition');
const product = goog.require('goog.userAgent.product');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

testSuite({
  shouldRunTests() {
    // Disabled in Safari because Apple SafariDriver runs tests in Private
    // Browsing mode, and Safari does not permit writing to localStorage in
    // Private Browsing windows.
    return !product.SAFARI;
  },

  setUp() {
    const localStorage = new HTML5LocalStorage();
    if (localStorage.isAvailable()) {
      mechanism = localStorage;
      // There should be at least 2 MiB.
      minimumQuota = 2 * 1024 * 1024;
      mechanism_shared = new HTML5LocalStorage();
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
  },

  testAvailability() {
    if (userAgent.WEBKIT && userAgent.isVersionOrHigher('532.5') ||
        userAgent.GECKO && userAgent.isVersionOrHigher('1.9.1') ||
        userAgent.IE && userAgent.isVersionOrHigher('8')) {
      assertNotNull(mechanism);
      assertTrue(mechanism.isAvailable());
      assertNotNull(mechanism_shared);
      assertTrue(mechanism_shared.isAvailable());
    }
  },
});
