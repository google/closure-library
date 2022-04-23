/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides access to high-entropy user agent values.
 */

goog.module('goog.labs.userAgent.highEntropy.highEntropyData');

const {HighEntropyValue} = goog.require('goog.labs.userAgent.highEntropy.highEntropyValue');

/**
 * fullVersionList is currently not implemented in Chromium.
 * TODO(user): When fullVersionList is added, remove this value.
 */
let fullVersionListAvailable = false;

/**
 * A helper function to check whether fullVersionList is available in the
 * current browser.
 * TODO(user): When fullVersionList is added, move hasFullVersionList()
 * to browser.js, and inline the browser version check. For example, if it is
 * implemented in Chromium 101, have hasFullVersionList simply return
 * `browser.versionOf(CHROMIUM) >= 101`.
 * @return {boolean}
 */
function hasFullVersionList() {
  return fullVersionListAvailable;
}
exports.hasFullVersionList = hasFullVersionList;

/**
 * A test-only function to set whether it should be assumed fullVersionList is
 * available in the browser.
 * TODO(user): When fullVersionList is added, remove this function, as
 * behavior when fullVersionList is either present or absent would be testable
 * by setting the user agent and user agent data accordingly.
 * @param {boolean} value
 */
function setHasFullVersionListForTesting(value) {
  fullVersionListAvailable = value;
}
exports.setHasFullVersionListForTesting = setHasFullVersionListForTesting;

/**
 * @type {!HighEntropyValue<!Array<!NavigatorUABrandVersion>>}
 */
const fullVersionList = new HighEntropyValue('fullVersionList');
exports.fullVersionList = fullVersionList;

/**
 * @type {!HighEntropyValue<string>}
 */
const platformVersion = new HighEntropyValue('platformVersion');
exports.platformVersion = platformVersion;

/**
 * Reset all high-entropy values to their initial state.
 */
function resetAllForTesting() {
  fullVersionList.resetForTesting();
  platformVersion.resetForTesting();
}
exports.resetAllForTesting = resetAllForTesting;
