/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview File #1 of module A.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */

goog.provide('goog.module.testdata.modA_1');


goog.setTestOnly('goog.module.testdata.modA_1');

goog.require('goog.testing.asserts');

if (window.modA1Loaded) {
  goog.testing.asserts.fail('modA_1 loaded twice');
}
window.modA1Loaded = true;
