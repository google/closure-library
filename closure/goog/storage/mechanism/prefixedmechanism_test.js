/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.storage.mechanism.PrefixedMechanismTest');
goog.setTestOnly();

const HTML5LocalStorage = goog.require('goog.storage.mechanism.HTML5LocalStorage');
const PrefixedMechanism = goog.require('goog.storage.mechanism.PrefixedMechanism');
/** @suppress {extraRequire} */
const mechanismSeparationTester = goog.require('goog.storage.mechanism.mechanismSeparationTester');
/** @suppress {extraRequire} */
const mechanismSharingTester = goog.require('goog.storage.mechanism.mechanismSharingTester');
const testSuite = goog.require('goog.testing.testSuite');

let submechanism = null;

testSuite({
  setUp() {
    submechanism = new HTML5LocalStorage();
    if (submechanism.isAvailable()) {
      mechanism = new PrefixedMechanism(submechanism, 'test');
      mechanism_shared = new PrefixedMechanism(submechanism, 'test');
      mechanism_separate = new PrefixedMechanism(submechanism, 'test2');
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
    if (submechanism.isAvailable()) {
      assertNotNull(mechanism);
      assertNotNull(mechanism_shared);
      assertNotNull(mechanism_separate);
    }
  },
});
