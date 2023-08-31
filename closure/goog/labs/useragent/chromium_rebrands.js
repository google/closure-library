/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This file contains definitions for browser Brands that are for
 * Chromium-based browsers.
 */

goog.module('goog.labs.userAgent.chromiumRebrands');
goog.module.declareLegacyNamespace();

/**
 * The set of browsers that are based on Chromium, but also identify themselves
 * in UACH API surfaces with their user-recognizable brand (e.g. Chrome, Brave,
 * Opera etc). In most cases, it is better to check against the Chromium brand
 * (defined in goog.labs.userAgent.Brand) to check the underlying JS engine
 * version, or do feature detection for the specific API surface, instead
 * checking for these brands.
 * @enum {string}
 */
const ChromiumRebrand = {
  GOOGLE_CHROME: 'Google Chrome',
  BRAVE: 'Brave',
  OPERA: 'Opera',
  EDGE: 'Microsoft Edge',
};

exports.ChromiumRebrand = ChromiumRebrand;