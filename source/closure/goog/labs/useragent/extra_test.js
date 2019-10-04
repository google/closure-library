// Copyright 2019 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Description of this file.
 */
goog.module('goog.labs.userAgent.extraTest');
goog.setTestOnly();

const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const browser = goog.require('goog.labs.userAgent.browser');
const extra = goog.require('goog.labs.userAgent.extra');
const testAgents = goog.require('goog.labs.userAgent.testAgents');
const testSuite = goog.require('goog.testing.testSuite');
const util = goog.require('goog.labs.userAgent.util');

const stubs = new PropertyReplacer();

/**
 * Replaces the navigator object on goog.global.
 * @param {?Object|undefined} navigatorObj The navigator object to set
 */
function setGlobalNavigator(navigatorObj) {
  const mockGlobal = {
    'navigator': navigatorObj,
  };
  stubs.set(goog, 'global', mockGlobal);
}

testSuite({
  tearDown: function() {
    stubs.reset();
  },
  testSafariDesktopOnMobile: function() {
    util.setUserAgent(testAgents.SAFARI_13);
    setGlobalNavigator({'maxTouchPoints': 5});
    assertTrue(browser.isSafari());
    assertFalse(browser.isChrome());
    assertTrue(extra.isSafariDesktopOnMobile());

    setGlobalNavigator({'maxTouchPoints': 0});
    assertFalse(extra.isSafariDesktopOnMobile());

    setGlobalNavigator({});
    assertFalse(extra.isSafariDesktopOnMobile());

    util.setUserAgent(testAgents.IPAD_6);
    assertFalse(extra.isSafariDesktopOnMobile());
  },
});
