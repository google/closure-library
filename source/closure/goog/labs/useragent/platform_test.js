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

/** @fileoverview Unit tests for userAgentPlatform. */

goog.module('goog.labs.userAgent.platformTest');
goog.setTestOnly();

const testAgents = goog.require('goog.labs.userAgent.testAgents');
const testSuite = goog.require('goog.testing.testSuite');
const userAgentPlatform = goog.require('goog.labs.userAgent.platform');
const util = goog.require('goog.labs.userAgent.util');

function assertVersion(version) {
  assertEquals(version, userAgentPlatform.getVersion());
}

function assertVersionBetween(lowVersion, highVersion) {
  assertTrue(userAgentPlatform.isVersionOrHigher(lowVersion));
  assertFalse(userAgentPlatform.isVersionOrHigher(highVersion));
}
testSuite({
  setUp() {
    util.setUserAgent(null);
  },

  testAndroid() {
    let uaString = testAgents.ANDROID_BROWSER_233;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isAndroid());
    assertVersion('2.3.3');
    assertVersionBetween('2.3.0', '2.3.5');
    assertVersionBetween('2.3', '2.4');
    assertVersionBetween('2', '3');

    uaString = testAgents.ANDROID_BROWSER_221;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isAndroid());
    assertVersion('2.2.1');
    assertVersionBetween('2.2.0', '2.2.5');
    assertVersionBetween('2.2', '2.3');
    assertVersionBetween('2', '3');

    uaString = testAgents.CHROME_ANDROID;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isAndroid());
    assertVersion('4.0.2');
    assertVersionBetween('4.0.0', '4.1.0');
    assertVersionBetween('4.0', '4.1');
    assertVersionBetween('4', '5');

    uaString = testAgents.GO2PHONE;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isAndroid());
    assertVersion('8.1.0');
    assertVersionBetween('8.0', '8.2');
    assertVersionBetween('8', '9');
  },

  testKindleFire() {
    const uaString = testAgents.KINDLE_FIRE;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isAndroid());
    assertVersion('4.0.3');
  },

  testIpod() {
    const uaString = testAgents.SAFARI_IPOD;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpod());
    assertTrue(userAgentPlatform.isIos());
    assertVersion('');
  },

  testIphone() {
    let uaString = testAgents.SAFARI_IPHONE_421;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIos());
    assertVersion('4.2.1');
    assertVersionBetween('4', '5');
    assertVersionBetween('4.2', '4.3');

    uaString = testAgents.SAFARI_IPHONE_6;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIos());
    assertVersion('6.0');
    assertVersionBetween('5', '7');

    uaString = testAgents.SAFARI_IPHONE_32;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIos());
    assertVersion('3.2');
    assertVersionBetween('3', '4');

    uaString = testAgents.WEBVIEW_IPAD;
    util.setUserAgent(uaString);
    assertFalse(userAgentPlatform.isIphone());
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());
    assertVersion('6.0');
    assertVersionBetween('5', '7');

    uaString = testAgents.FIREFOX_IPHONE;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIphone());
    assertFalse(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());
    assertVersion('5.1.1');
    assertVersionBetween('4', '6');
  },

  testIpad() {
    let uaString = testAgents.IPAD_4;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());
    assertVersion('3.2');
    assertVersionBetween('3', '4');
    assertVersionBetween('3.1', '4');

    uaString = testAgents.IPAD_5;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());
    assertVersion('5.1');
    assertVersionBetween('5', '6');

    uaString = testAgents.IPAD_6;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isIpad());
    assertTrue(userAgentPlatform.isIos());
    assertVersion('6.0');
    assertVersionBetween('5', '7');
  },

  testMac() {
    let uaString = testAgents.CHROME_MAC;
    const platform = 'IntelMac';
    util.setUserAgent(uaString, platform);
    assertTrue(userAgentPlatform.isMacintosh());
    assertVersion('10.8.2');
    assertVersionBetween('10', '11');
    assertVersionBetween('10.8', '10.9');
    assertVersionBetween('10.8.1', '10.8.3');

    uaString = testAgents.OPERA_MAC;
    util.setUserAgent(uaString, platform);
    assertTrue(userAgentPlatform.isMacintosh());
    assertVersion('10.6.8');
    assertVersionBetween('10', '11');
    assertVersionBetween('10.6', '10.7');
    assertVersionBetween('10.6.5', '10.7.0');

    uaString = testAgents.SAFARI_MAC;
    util.setUserAgent(uaString, platform);
    assertTrue(userAgentPlatform.isMacintosh());
    assertVersionBetween('10', '11');
    assertVersionBetween('10.6', '10.7');
    assertVersionBetween('10.6.5', '10.7.0');

    uaString = testAgents.FIREFOX_MAC;
    util.setUserAgent(uaString, platform);
    assertTrue(userAgentPlatform.isMacintosh());
    assertVersion('11.7.9');
    assertVersionBetween('11', '12');
    assertVersionBetween('11.7', '11.8');
    assertVersionBetween('11.7.9', '11.8.0');
  },

  testLinux() {
    let uaString = testAgents.FIREFOX_LINUX;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isLinux());
    assertVersion('');

    uaString = testAgents.CHROME_LINUX;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isLinux());
    assertVersion('');

    uaString = testAgents.OPERA_LINUX;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isLinux());
    assertVersion('');
  },

  testWindows() {
    let uaString = testAgents.SAFARI_WINDOWS;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());
    assertVersion('6.1');
    assertVersionBetween('6', '7');

    uaString = testAgents.IE_10;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());
    assertVersion('6.2');
    assertVersionBetween('6', '6.5');

    uaString = testAgents.CHROME_25;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());
    assertVersion('5.1');
    assertVersionBetween('5', '6');

    uaString = testAgents.FIREFOX_WINDOWS;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());
    assertVersion('6.1');
    assertVersionBetween('6', '7');

    uaString = testAgents.IE_11;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());
    assertVersion('6.3');
    assertVersionBetween('6', '6.5');

    uaString = testAgents.IE_10_MOBILE;
    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isWindows());
    assertVersion('8.0');
  },

  testChromeOS() {
    let uaString = testAgents.CHROME_OS_910;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isChromeOS());
    assertVersion('9.10.0');
    assertVersionBetween('9', '10');

    uaString = testAgents.CHROME_OS;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isChromeOS());
    assertVersion('3701.62.0');
    assertVersionBetween('3701', '3702');
  },

  testChromecast() {
    const uaString = testAgents.CHROMECAST;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isChromecast());
    assertVersion('');
  },

  testKaiOS() {
    const uaString = testAgents.KAIOS;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isKaiOS());
    assertVersion('2.5');
  },

  testGo2Phone() {
    const uaString = testAgents.GO2PHONE;

    util.setUserAgent(uaString);
    assertTrue(userAgentPlatform.isGo2Phone());
    assertVersion('8.1.0');
  },
});
