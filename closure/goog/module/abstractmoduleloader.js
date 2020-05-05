/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An interface for module loading.
 */

goog.module('goog.module.AbstractModuleLoader');
goog.module.declareLegacyNamespace();

const {ModuleInfo} = goog.require('goog.module');

/**
 * Optional parameters for the loadModules method.
 * @record
 */
class LoadOptions {
  constructor() {
    /**
     * Whether to bypass cache while loading the module.
     * @const {boolean|undefined}
     */
    this.forceReload;

    /**
     * The callback if module loading is an error.
     * @const {(function(?number): void)|undefined}
     */
    this.onError;

    /**
     * The callback if module loading is a success.
     * @const {(function(): void)|undefined}
     */
    this.onSuccess;

    /**
     * The callback if module loading times out.
     * @const {(function(): void)|undefined}
     */
    this.onTimeout;
  }
}

/**
 * An interface that loads JavaScript modules.
 * @interface
 */
class AbstractModuleLoader {
  /**
   * Loads a list of JavaScript modules.
   *
   * @param {!Array<string>} ids The module ids in dependency order.
   * @param {!Object<string, !ModuleInfo>} moduleInfoMap A mapping
   *     from module id to ModuleInfo object.
   * @param {!LoadOptions=} loadOptions
   */
  loadModules(ids, moduleInfoMap, loadOptions) {};


  /**
   * Pre-fetches a JavaScript module.
   *
   * @param {string} id The module id.
   * @param {!ModuleInfo} moduleInfo The module info.
   */
  prefetchModule(id, moduleInfo) {};
}

exports = AbstractModuleLoader;
