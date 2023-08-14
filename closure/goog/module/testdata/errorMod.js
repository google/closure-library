/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview File #1 of error module.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */

goog.provide('goog.module.testdata.errorMod');

goog.setTestOnly('goog.module.testdata.errorMod');

goog.require('goog.module.ModuleManager');

goog.module.ModuleManager.getInstance().beforeLoadModuleCode('errorMod');

throw new Error('errorMod should not load.');