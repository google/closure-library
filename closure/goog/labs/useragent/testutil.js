/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides test-only functions for setting the user agent.
 */

goog.module('goog.labs.userAgent.testUtil');
goog.setTestOnly();

const util = goog.require('goog.labs.userAgent.util');

/**
 * Override the user agent with the given values.
 * @param {string} userAgent The userAgent override.
 * @param {?NavigatorUAData} userAgentData The userAgentData override. Pass
 *     `null` to specify the absence of userAgentData.
 */
function setUserAgent(userAgent, userAgentData) {
  util.setUserAgent(userAgent);
  util.setUserAgentData(userAgentData);
}
exports.setUserAgent = setUserAgent;

/**
 * If the user agent string or user agent data object was overridden using
 * setUserAgent, reset it so that native browser values are used instead.
 */
function resetUserAgent() {
  util.setUserAgent(null);
  util.resetUserAgentData();
}
exports.resetUserAgent = resetUserAgent;
