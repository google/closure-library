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
 * @fileoverview Unit tests for goog.labs.userAgent.engine.
 */

goog.provide('goog.labs.userAgent.engineTest');

goog.require('goog.labs.userAgent.engine');
goog.require('goog.labs.userAgent.testAgents');
goog.require('goog.labs.userAgent.util');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.labs.userAgent.engineTest');

var testAgents = goog.labs.userAgent.testAgents;

function setUp() {
  goog.labs.userAgent.util.setUserAgent(null);
}

function assertVersion(version) {
  assertEquals(version, goog.labs.userAgent.engine.getVersion());
}

function assertLowAndHighVersions(lowVersion, highVersion) {
  assertTrue(goog.labs.userAgent.engine.isVersionOrHigher(lowVersion));
  assertFalse(goog.labs.userAgent.engine.isVersionOrHigher(highVersion));
}

function testPresto() {
  goog.labs.userAgent.util.setUserAgent(testAgents.OPERA_LINUX);
  assertTrue(goog.labs.userAgent.engine.isPresto());
  assertVersion('2.9.168');
  assertLowAndHighVersions('2.9', '2.10');

  goog.labs.userAgent.util.setUserAgent(testAgents.OPERA_MAC);
  assertTrue(goog.labs.userAgent.engine.isPresto());
  assertVersion('2.9.168');
  assertLowAndHighVersions('2.9', '2.10');
}

function testTrident() {
  goog.labs.userAgent.util.setUserAgent(testAgents.IE_10);
  assertTrue(goog.labs.userAgent.engine.isTrident());
  assertVersion('6.0');
  assertLowAndHighVersions('6.0', '7.0');

  goog.labs.userAgent.util.setUserAgent(testAgents.IE_8);
  assertTrue(goog.labs.userAgent.engine.isTrident());
  assertVersion('4.0');
  assertLowAndHighVersions('4.0', '5.0');

  goog.labs.userAgent.util.setUserAgent(testAgents.IE_9_COMPATIBILITY);
  assertTrue(goog.labs.userAgent.engine.isTrident());
  assertVersion('5.0');
  assertLowAndHighVersions('5.0', '6.0');

  goog.labs.userAgent.util.setUserAgent(goog.labs.userAgent.testAgents.IE_11);
  assertTrue(goog.labs.userAgent.engine.isTrident());
  assertVersion('7.0');
  assertLowAndHighVersions('6.0', '8.0');
}

function testWebKit() {
  goog.labs.userAgent.util.setUserAgent(testAgents.ANDROID_BROWSER_235);
  assertTrue(goog.labs.userAgent.engine.isWebKit());
  assertVersion('533.1');
  assertLowAndHighVersions('533.0', '534.0');

  goog.labs.userAgent.util.setUserAgent(testAgents.CHROME_25);
  assertTrue(goog.labs.userAgent.engine.isWebKit());
  assertVersion('535.8');
  assertLowAndHighVersions('535.0', '536.0');

  goog.labs.userAgent.util.setUserAgent(testAgents.SAFARI_6);
  assertTrue(goog.labs.userAgent.engine.isWebKit());
  assertVersion('536.25');
  assertLowAndHighVersions('536.0', '537.0');

  goog.labs.userAgent.util.setUserAgent(testAgents.SAFARI_IPHONE);
  assertTrue(goog.labs.userAgent.engine.isWebKit());
  assertVersion('533.17.9');
  assertLowAndHighVersions('533.0', '534.0');
}

function testGecko() {
  goog.labs.userAgent.util.setUserAgent(
      'Mozilla/5.0 (Windows NT 6.1; rv:15.0) Gecko/20120716 Firefox/15.0a2');
  assertTrue(goog.labs.userAgent.engine.isGecko());
  assertVersion('15.0a2');
  assertLowAndHighVersions('14.0', '16.0');
  // This is actually not at V15 because it is alpha 2
  assertFalse(goog.labs.userAgent.engine.isVersionOrHigher('15'));

  goog.labs.userAgent.util.setUserAgent(
      'Mozilla/6.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011 ' +
      'Firefox/16.0.1');
  assertTrue(goog.labs.userAgent.engine.isGecko());
  assertVersion('16.0.1');
  assertLowAndHighVersions('16.0', '17.0');

  goog.labs.userAgent.util.setUserAgent(
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:14.0) ' +
      'Gecko/20100101 Firefox/14.0.1');
  assertTrue(goog.labs.userAgent.engine.isGecko());
  assertVersion('14.0.1');
  assertLowAndHighVersions('14.0', '15.0');
}

