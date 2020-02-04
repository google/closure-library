/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A singleton interface for managing JavaScript code modules.
 */

goog.module('goog.loader.activeModuleManager');
goog.module.declareLegacyNamespace();

const AbstractModuleManager = goog.require('goog.loader.AbstractModuleManager');
const asserts = goog.require('goog.asserts');


/** @type {?AbstractModuleManager} */
let moduleManager = null;

/** @type {?function(): !AbstractModuleManager} */
let getDefault = null;

/**
 * Gets the active module manager, instantiating one if necessary.
 * @return {!AbstractModuleManager}
 */
function get() {
  if (!moduleManager && getDefault) {
    moduleManager = getDefault();
  }
  asserts.assert(
      moduleManager != null, 'The module manager has not yet been set.');
  return moduleManager;
}

/**
 * Sets the active module manager. This should never be used to override an
 * existing manager.
 *
 * @param {!AbstractModuleManager} newModuleManager
 */
function set(newModuleManager) {
  asserts.assert(
      moduleManager == null, 'The module manager cannot be redefined.');
  moduleManager = newModuleManager;
}

/**
 * Stores a callback that will be used  to get an AbstractModuleManager instance
 * if set() is not called before the first get() call.
 * @param {function(): !AbstractModuleManager} fn
 */
function setDefault(fn) {
  getDefault = fn;
}

/** Test-only method for removing the active module manager. */
const reset = function() {
  moduleManager = null;
};

exports = {
  get,
  set,
  setDefault,
  reset,
};
