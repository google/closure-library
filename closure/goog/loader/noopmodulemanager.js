/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An implementation of goog.loader.AbstractModuleManager that
 * does not perform any late-loading. This implementation will be fetched by all
 * MSS applications that do NOT initialize another implementation.
 */
goog.module('goog.loader.NoopModuleManager');

const AbstractModuleManager = goog.require('goog.loader.AbstractModuleManager');

class NoopModuleManager extends AbstractModuleManager {
  /**
   * This method is added to the post-module by the MSS Compiler, so we will let
   * it execute without throwing an error.
   * @override
   */
  beforeLoadModuleCode(id) {}

  /** @override */
  execOnLoad(
      moduleId, fn, opt_handler, opt_noLoad, opt_userInitiated,
      opt_preferSynchronous) {
    throw notImplemented('execOnLoad');
  }

  /** @override */
  getModuleInfo(id) {
    throw notImplemented('getModuleInfo');
  }

  /** @override */
  isModuleLoading(id) {
    throw notImplemented('isModuleLoading');
  }

  /** @override */
  load(moduleId, opt_userInitiated) {
    throw notImplemented('load');
  }

  /** @override */
  loadMultiple(moduleIds, opt_userInitiated) {
    throw notImplemented('loadMultiple');
  }

  /** @override */
  preloadModule(id, opt_timeout) {
    throw notImplemented('preloadModule');
  }

  /**
   * This method is added to the post-module by the MSS Compiler, so we will let
   * it execute without throwing an error.
   * @override
   */
  setLoaded() {}
}

/**
 * Returns a method not implemented error that can be thrown by the caller.
 * @param {string} methodName
 * @return {!Error}
 */
// MOE:begin_strip
function notImplemented(methodName) {
  return new Error(
      'The `' + methodName + '` method is not implemented on ' +
      '`goog.loader.NoopModuleManager`. Please see go/mss-setup for more ' +
      'information on how to register a default module manager.');
}
/* MOE:end_strip_and_replace
function notImplemented(methodName) {
  return new Error(
        'The `' + methodName + '` method is not implemented on ' +
        '`goog.loader.NoopModuleManager`. Please register a default module ' +
        'manager.');
}
*/

exports = NoopModuleManager;
