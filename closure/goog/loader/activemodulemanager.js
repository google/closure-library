// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview A singleton interface for managing Javascript code modules.
 */

goog.module('goog.loader.activeModuleManager');
goog.module.declareLegacyNamespace();

const AbstractModuleManager = goog.require('goog.loader.AbstractModuleManager');
const activeModule_manager_asserts = goog.require('goog.asserts');


/** @type {?AbstractModuleManager} */
let moduleManager = null;

/**
 * Gets the active module manager, instantiating one if necessary.
 *
 * @param {(function():!AbstractModuleManager)=} getDefault
 * @return {!AbstractModuleManager}
 */
const get = function(getDefault = undefined) {
  if (!moduleManager && getDefault) {
    moduleManager = getDefault();
  }
  activeModule_manager_asserts.assert(
      moduleManager != null, 'The module manager has not yet been set.');
  return moduleManager;
};

/**
 * Sets the active module manager. This should never be used to override an
 * existing manager.
 *
 * @param {!AbstractModuleManager} newModuleManager
 */
const set = function(newModuleManager) {
  activeModule_manager_asserts.assert(
      moduleManager == null, 'The module manager cannot be redefined.');
  moduleManager = newModuleManager;
};

/** Test-only method for removing the active module manager. */
const reset = function() {
  moduleManager = null;
};


exports = {
  get,
  set,
  reset,
};
