// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview An interface for module loading.
 */

goog.module('goog.module.AbstractModuleLoader');
goog.module.declareLegacyNamespace();

const {ModuleInfo} = goog.require('goog.module');


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
   * @param {?function()=} successFn The callback if module loading is a
   *     success.
   * @param {?function(?number)=} errorFn The callback if module loading is an
   *     error.
   * @param {?function()=} timeoutFn The callback if module loading times out.
   * @param {boolean=} forceReload Whether to bypass cache while loading the
   *     module.
   */
  loadModules(ids, moduleInfoMap, successFn, errorFn, timeoutFn, forceReload) {
  };


  /**
   * Pre-fetches a JavaScript module.
   *
   * @param {string} id The module id.
   * @param {!ModuleInfo} moduleInfo The module info.
   */
  prefetchModule(id, moduleInfo) {};
}

exports = AbstractModuleLoader;
