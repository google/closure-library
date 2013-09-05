// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Shared test function to reset the constants in
 * goog.userAgent.*
 */

goog.provide('goog.userAgentTestUtil');
goog.provide('goog.userAgentTestUtil.UserAgents');

goog.require('goog.labs.userAgent.browser');
goog.require('goog.labs.userAgent.engine');
goog.require('goog.userAgent');

goog.setTestOnly('goog.userAgentTestUtil');


/**
 * Rerun the initialization code to set all of the goog.userAgent constants.
 */
goog.userAgentTestUtil.reinitializeUserAgent = function() {

  // Unfortunately we can't isolate the useragent setting in a function
  // we can call, because things rely on it compiling to nothing when
  // one of the ASSUME flags is set, and the compiler isn't smart enough
  // to do that when the setting is done inside a function that's inlined.
  goog.userAgent.OPERA = goog.labs.userAgent.browser.isOpera();
  goog.userAgent.IE = goog.labs.userAgent.browser.isIE();
  goog.userAgent.GECKO = goog.labs.userAgent.engine.isGecko();
  goog.userAgent.WEBKIT = goog.labs.userAgent.engine.isWebKit();
  goog.userAgent.MOBILE = goog.userAgent.isMobile_();
  goog.userAgent.SAFARI = goog.userAgent.WEBKIT;

  goog.userAgent.initPlatform_();
  goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
  goog.userAgent.VERSION = goog.userAgent.determineVersion_();
};


/**
 * Browser definitions.
 * @enum {string}
 */
goog.userAgentTestUtil.UserAgents = {
  GECKO: 'GECKO',
  IE: 'IE',
  OPERA: 'OPERA',
  WEBKIT: 'WEBKIT'
};


/**
 * Return whether a given user agent has been detected.
 * @param {number} agent Value in UserAgents.
 * @return {boolean} Whether the user agent has been detected.
 */
goog.userAgentTestUtil.getUserAgentDetected = function(agent) {
  switch (agent) {
    case goog.userAgentTestUtil.UserAgents.GECKO:
      return goog.labs.userAgent.engine.isGecko();
    case goog.userAgentTestUtil.UserAgents.IE:
      return goog.labs.userAgent.browser.isIE();
    case goog.userAgentTestUtil.UserAgents.OPERA:
      return goog.labs.userAgent.browser.isOpera();
    case goog.userAgentTestUtil.UserAgents.WEBKIT:
      return goog.labs.userAgent.engine.isWebKit();
  }
  return null;
};
