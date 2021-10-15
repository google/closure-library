/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for userAgentPlatform. */

goog.module('goog.labs.userAgent.platformTest');
goog.setTestOnly();

const highEntropyData = goog.require('goog.labs.userAgent.highEntropy.highEntropyData');
const testAgentData = goog.require('goog.labs.userAgent.testAgentData');
const testAgents = goog.require('goog.labs.userAgent.testAgents');
const testSuite = goog.require('goog.testing.testSuite');
const userAgentPlatform = goog.require('goog.labs.userAgent.platform');
const util = goog.require('goog.labs.userAgent.util');

/**
 * Asserts that getVersion correctly returns the given version.
 * @param {string} version
 */
function assertPreUACHVersion(version) {
  assertEquals(version, userAgentPlatform.getVersion());
}

/**
 * Asserts that isVersionOrHigher correctly identifies that the platform version
 * is within the given range.
 * @param {string} lowVersion
 * @param {string} highVersion
 */
function assertPreUACHVersionBetween(lowVersion, highVersion) {
  assertTrue(userAgentPlatform.isVersionOrHigher(lowVersion));
  assertFalse(userAgentPlatform.isVersionOrHigher(highVersion));
}

/**
 * Asserts that userAgentPlatform.version correctly matches the given version.
 * @param {string} version
 * @param {boolean=} alreadyLoaded Whether getIfLoaded() should be expected to
 * return a defined value before load() is ever called.
 */
async function assertVersion(version, alreadyLoaded = false) {
  const platformVersion = userAgentPlatform.version;
  if (alreadyLoaded) {
    assertEquals(
        version, platformVersion.getIfLoaded()?.toVersionStringForLogging());
  }
  assertEquals(
      version, (await platformVersion.load()).toVersionStringForLogging());
  assertEquals(
      version, platformVersion.getIfLoaded()?.toVersionStringForLogging());
}

/**
 * Asserts that userAgentPlatform.version can be used to correctly identify that
 * the platform version is within the given range.
 * @param {string} lowVersion
 * @param {string} highVersion
 */
async function assertVersionBetween(lowVersion, highVersion) {
  const loadedPlatformVersion = await userAgentPlatform.version.load();
  assertNotNullNorUndefined(loadedPlatformVersion);
  assertTrue(loadedPlatformVersion.isAtLeast(lowVersion));
  assertFalse(loadedPlatformVersion.isAtLeast(highVersion));
}

testSuite({
  setUp() {
    // setUserAgent uses the browser's original user agent string if null is
    // passed to it, so pass an empty string instead.
    util.setUserAgent('');
    util.setUserAgentData(null);
    highEntropyData.resetAllForTesting();
  },

  async testAndroid() {
    let uaString = testAgents.ANDROID_BROWSER_233;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isAndroid());

    assertPreUACHVersion('2.3.3');
    assertPreUACHVersionBetween('2.3.0', '2.3.5');
    await assertVersion('2.3.3', true);
    await assertVersionBetween('2.3.0', '2.3.5');
    await assertVersionBetween('2.3', '2.4');
    await assertVersionBetween('2', '3');

    uaString = testAgents.ANDROID_BROWSER_221;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isAndroid());

    assertPreUACHVersion('2.2.1');
    assertPreUACHVersionBetween('2.2.0', '2.2.5');
    await assertVersion('2.2.1', true);
    await assertVersionBetween('2.2.0', '2.2.5');
    await assertVersionBetween('2.2', '2.3');
    await assertVersionBetween('2', '3');

    uaString = testAgents.CHROME_ANDROID;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isAndroid());

    assertPreUACHVersion('4.0.2');
    assertPreUACHVersionBetween('4.0.0', '4.1.0');
    await assertVersion('4.0.2', true);
    await assertVersionBetween('4.0.0', '4.1.0');
    await assertVersionBetween('4.0', '4.1');
    await assertVersionBetween('4', '5');
  },

  async testAndroidUserAgentData() {
    const uaData = testAgentData.withHighEntropyData(
        testAgentData.CHROME_USERAGENT_DATA_MOBILE, {
          platformVersion: '11.0.0',
        });
    util.setUserAgentData(uaData);
    await assertVersion('11.0.0');
  },

  async testAndroidUserAgentDataWithRejectedHighEntropyValues() {
    const uaData = testAgentData.CHROME_USERAGENT_DATA_MOBILE;
    util.setUserAgentData(uaData);
    assertEquals(undefined, userAgentPlatform.version.getIfLoaded());

    await assertRejects(userAgentPlatform.version.load());
    assertEquals(undefined, userAgentPlatform.version.getIfLoaded());
  },

  async testKindleFire() {
    const uaString = testAgents.KINDLE_FIRE;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isAndroid());
    assertPreUACHVersion('4.0.3');
    await assertVersion('4.0.3', true);
  },

  async testIpod() {
    const uaString = testAgents.SAFARI_IPOD;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpod());
    assertTrue(userAgentPlatform.isIos());
    await assertVersion('', true);
  },

  async testIphone() {
    let uaString = testAgents.SAFARI_IPHONE_421;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('4.2.1');
    assertPreUACHVersionBetween('4', '5');
    await assertVersion('4.2.1', true);
    await assertVersionBetween('4', '5');
    await assertVersionBetween('4.2', '4.3');

    uaString = testAgents.SAFARI_IPHONE_6;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('6.0');
    assertPreUACHVersionBetween('5', '7');
    await assertVersion('6.0', true);
    await assertVersionBetween('5', '7');

    uaString = testAgents.SAFARI_IPHONE_IOS_14;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('14.6');
    assertPreUACHVersionBetween('14', '15');
    await assertVersion('14.6', true);
    await assertVersionBetween('14', '15');

    uaString = testAgents.SAFARI_IPHONE_IOS_15;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('15.0');
    assertPreUACHVersionBetween('15', '16');
    await assertVersion('15.0', true);
    await assertVersionBetween('15', '16');

    uaString = testAgents.SAFARI_IPHONE_32;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('3.2');
    assertPreUACHVersionBetween('3', '4');
    await assertVersion('3.2', true);
    await assertVersionBetween('3', '4');

    uaString = testAgents.WEBVIEW_IPAD;
    util.setUserAgent(uaString);
    assertFalse(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('6.0');
    assertPreUACHVersionBetween('5', '7');
    await assertVersion('6.0', true);
    await assertVersionBetween('5', '7');

    uaString = testAgents.FIREFOX_IPHONE;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertFalse(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('5.1.1');
    assertPreUACHVersionBetween('4', '6');
    await assertVersion('5.1.1', true);
    await assertVersionBetween('4', '6');
  },

  async testIpad() {
    let uaString = testAgents.IPAD_4;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('3.2');
    assertPreUACHVersionBetween('3', '4');
    await assertVersion('3.2', true);
    await assertVersionBetween('3', '4');
    await assertVersionBetween('3.1', '4');

    uaString = testAgents.IPAD_5;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('5.1');
    assertPreUACHVersionBetween('5', '6');
    await assertVersion('5.1', true);
    await assertVersionBetween('5', '6');

    uaString = testAgents.IPAD_6;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());

    assertPreUACHVersion('6.0');
    assertPreUACHVersionBetween('5', '7');
    await assertVersion('6.0', true);
    await assertVersionBetween('5', '7');

    uaString = testAgents.SAFARI_DESKTOP_IPAD_IOS_15;
    util.setUserAgent(uaString);
    assertFalse(userAgentPlatform.isIpad());
    assertFalse(userAgentPlatform.isIos());
    assertTrue(userAgentPlatform.isMacintosh());
    // In Safari desktop mode, the OS version reported is Mac OS version.

    assertPreUACHVersion('10.15.6');
    assertPreUACHVersionBetween('10.15.6', '10.15.7');
    await assertVersion('10.15.6', true);
    await assertVersionBetween('10.15.6', '10.15.7');

    uaString = testAgents.SAFARI_MOBILE_IPAD_IOS_15;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());
    assertFalse(userAgentPlatform.isMacintosh());

    assertPreUACHVersion('15.0');
    assertPreUACHVersionBetween('15.0', '15.1');
    await assertVersion('15.0', true);
    await assertVersionBetween('15.0', '15.1');

    uaString = testAgents.CHROME_IPAD_IOS_15;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());
    assertFalse(userAgentPlatform.isMacintosh());

    assertPreUACHVersion('15.0');
    assertPreUACHVersionBetween('15.0', '15.1');
    await assertVersion('15.0', true);
    await assertVersionBetween('15.0', '15.1');
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  async testMac() {
    let uaString = testAgents.CHROME_MAC;
    const platform = 'IntelMac';
    util.setUserAgent(uaString, platform);
    assertTrue(userAgentPlatform.isMacintosh());

    assertPreUACHVersion('10.8.2');
    assertPreUACHVersionBetween('10', '11');
    await assertVersion('10.8.2', true);
    await assertVersionBetween('10', '11');
    await assertVersionBetween('10.8', '10.9');
    await assertVersionBetween('10.8.1', '10.8.3');

    uaString = testAgents.OPERA_MAC;
    util.setUserAgent(uaString, platform);
    assertTrue(userAgentPlatform.isMacintosh());

    assertPreUACHVersion('10.6.8');
    assertPreUACHVersionBetween('10', '11');
    await assertVersion('10.6.8', true);
    await assertVersionBetween('10', '11');
    await assertVersionBetween('10.6', '10.7');
    await assertVersionBetween('10.6.5', '10.7.0');

    uaString = testAgents.SAFARI_MAC;
    util.setUserAgent(uaString, platform);

    assertTrue(userAgentPlatform.isMacintosh());
    assertPreUACHVersionBetween('10', '11');
    await assertVersionBetween('10', '11');
    await assertVersionBetween('10.6', '10.7');
    await assertVersionBetween('10.6.5', '10.7.0');

    uaString = testAgents.FIREFOX_MAC;
    util.setUserAgent(uaString, platform);
    assertTrue(userAgentPlatform.isMacintosh());

    assertPreUACHVersion('11.7.9');
    assertPreUACHVersionBetween('11', '12');
    await assertVersion('11.7.9', true);
    await assertVersionBetween('11', '12');
    await assertVersionBetween('11.7', '11.8');
    await assertVersionBetween('11.7.9', '11.8.0');

    uaString = testAgents.SAFARI_MAC_OS_BIG_SUR;
    util.setUserAgent(uaString);
    assertFalse(userAgentPlatform.isIpad());
    assertFalse(userAgentPlatform.isIos());
    assertTrue(userAgentPlatform.isMacintosh());

    assertPreUACHVersion('10.15.7');
    assertPreUACHVersionBetween('10.15.7', '10.15.8');
    await assertVersion('10.15.7', true);
    await assertVersionBetween('10.15.7', '10.15.8');
  },

  async testMacOSUserAgentData() {
    const uaData =
        testAgentData.withHighEntropyData(testAgentData.CHROME_USERAGENT_DATA, {
          platformVersion: '11.6.0',
        });
    util.setUserAgentData(uaData);
    await assertVersion('11.6.0');
  },

  async testLinux() {
    let uaString = testAgents.FIREFOX_LINUX;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isLinux());
    await assertVersion('', true);

    uaString = testAgents.CHROME_LINUX;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isLinux());
    await assertVersion('', true);

    uaString = testAgents.OPERA_LINUX;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isLinux());
    await assertVersion('', true);
  },

  async testWindows() {
    let uaString = testAgents.SAFARI_WINDOWS;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());

    assertPreUACHVersion('6.1');
    assertPreUACHVersionBetween('6', '7');
    await assertVersion('6.1', true);
    await assertVersionBetween('6', '7');

    uaString = testAgents.IE_10;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());

    assertPreUACHVersion('6.2');
    assertPreUACHVersionBetween('6', '6.5');
    await assertVersion('6.2', true);
    await assertVersionBetween('6', '6.5');

    uaString = testAgents.CHROME_25;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());

    assertPreUACHVersion('5.1');
    assertPreUACHVersionBetween('5', '6');
    await assertVersion('5.1', true);
    await assertVersionBetween('5', '6');

    uaString = testAgents.FIREFOX_WINDOWS;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());

    assertPreUACHVersion('6.1');
    assertPreUACHVersionBetween('6', '7');
    await assertVersion('6.1', true);
    await assertVersionBetween('6', '7');

    uaString = testAgents.IE_11;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());

    assertPreUACHVersion('6.3');
    assertPreUACHVersionBetween('6', '6.5');
    await assertVersion('6.3', true);
    await assertVersionBetween('6', '6.5');

    uaString = testAgents.IE_10_MOBILE;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());
    await assertVersion('8.0', true);
  },

  async testChromeOS() {
    let uaString = testAgents.CHROME_OS_910;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isChromeOS());

    assertPreUACHVersion('9.10.0');
    assertPreUACHVersionBetween('9', '10');
    await assertVersion('9.10.0', true);
    await assertVersionBetween('9', '10');

    uaString = testAgents.CHROME_OS;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isChromeOS());

    assertPreUACHVersion('3701.62.0');
    assertPreUACHVersionBetween('3701', '3702');
    await assertVersion('3701.62.0', true);
    await assertVersionBetween('3701', '3702');
  },

  async testChromecast() {
    const uaString = testAgents.CHROMECAST;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isChromecast());
    assertPreUACHVersion('');
    await assertVersion('', true);
  },

  async testKaiOS() {
    const uaString = testAgents.KAIOS;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isKaiOS());
    assertPreUACHVersion('2.5');
    await assertVersion('2.5', true);
  },
});
