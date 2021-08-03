/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for device. */

goog.module('goog.labs.userAgent.deviceTest');
goog.setTestOnly();

const device = goog.require('goog.labs.userAgent.device');
const testAgents = goog.require('goog.labs.userAgent.testAgents');
const testSuite = goog.require('goog.testing.testSuite');
const util = goog.require('goog.labs.userAgent.util');

function assertIsMobile(uaString) {
  util.setUserAgent(uaString);
  assertTrue(device.isMobile());
  assertFalse(device.isTablet());
  assertFalse(device.isDesktop());
}

function assertIsTablet(uaString) {
  util.setUserAgent(uaString);
  assertTrue(device.isTablet());
  assertFalse(device.isMobile());
  assertFalse(device.isDesktop());
}

function assertIsDesktop(uaString) {
  util.setUserAgent(uaString);
  assertTrue(device.isDesktop());
  assertFalse(device.isMobile());
  assertFalse(device.isTablet());
}
testSuite({
  setUp() {
    util.setUserAgent(null);
  },

  testMobile() {
    assertIsMobile(testAgents.ANDROID_BROWSER_235);
    assertIsMobile(testAgents.CHROME_ANDROID);
    assertIsMobile(testAgents.SAFARI_IPHONE_6);
    assertIsMobile(testAgents.IE_10_MOBILE);
  },

  testTablet() {
    assertIsTablet(testAgents.CHROME_ANDROID_TABLET);
    assertIsTablet(testAgents.KINDLE_FIRE);
    assertIsTablet(testAgents.IPAD_6);
  },

  testDesktop() {
    assertIsDesktop(testAgents.CHROME_25);
    assertIsDesktop(testAgents.OPERA_10);
    assertIsDesktop(testAgents.FIREFOX_19);
    assertIsDesktop(testAgents.IE_9);
    assertIsDesktop(testAgents.IE_10);
    assertIsDesktop(testAgents.IE_11);
  },
});
