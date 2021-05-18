/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview File which defines dummy object to work around undefined
 * properties compiler warning for weak dependencies on
 * {@link goog.debug.ErrorHandler#protectEntryPoint}.
 */

goog.provide('goog.debug.errorHandlerWeakDep');


/**
 * Dummy object to work around undefined properties compiler warning.
 * @type {!Object<string,Function>}
 */
goog.debug.errorHandlerWeakDep = {
  /**
   * @param {Function} fn An entry point function to be protected.
   * @param {boolean=} opt_tracers Whether to install tracers around the
   *     fn.
   * @return {Function} A protected wrapper function that calls the
   *     entry point function.
   */
  protectEntryPoint: function(fn, opt_tracers) {
    'use strict';
    return fn;
  }
};
