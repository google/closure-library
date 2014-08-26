// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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
 *
 * @fileoverview This class supports the dynamic loading of compiled
 * javascript modules at runtime, as descibed in the designdoc.
 *
 *   <http://go/js_modules_design>
 *
 */

goog.provide('goog.module');

goog.require('goog.module.Loader');


/**
 * Wrapper of goog.module.Loader.require() for use in modules.
 * See method goog.module.Loader.require() for
 * explanation of params.
 *
 * @param {string} module The name of the module. Usually, the value
 *     is defined as a constant whose name starts with MOD_.
 * @param {number|string} symbol The ID of the symbol. Usually, the value is
 *     defined as a constant whose name starts with SYM_.
 * @param {Function} callback This function will be called with the
 *     resolved symbol as the argument once the module is loaded.
 */
goog.module.require = function(module, symbol, callback) {
  goog.module.Loader.getInstance().require(module, symbol, callback);
};


/**
 * Wrapper of goog.module.Loader.provide() for use in modules
 * See method goog.module.Loader.provide() for explanation of params.
 *
 * @param {string} module The name of the module. Cf. parameter module
 *     of method require().
 * @param {number|string=} opt_symbol The symbol being defined, or nothing
 *     when all symbols of the module are defined. Cf. parameter symbol of
 *     method require().
 * @param {Object=} opt_object The object bound to the symbol, or nothing when
 *     all symbols of the module are defined.
 */
goog.module.provide = function(module, opt_symbol, opt_object) {
  goog.module.Loader.getInstance().provide(
      module, opt_symbol, opt_object);
};


/**
 * Wrapper of init() so that we only need to export this single
 * identifier instead of three. See method goog.module.Loader.init() for
 * explanation of param.
 *
 * @param {string} urlBase The URL of the base library.
 * @param {Function=} opt_urlFunction Function that creates the URL for the
 *     module file. It will be passed the base URL for module files and the
 *     module name and should return the fully-formed URL to the module file to
 *     load.
 */
goog.module.initLoader = function(urlBase, opt_urlFunction) {
  goog.module.Loader.getInstance().init(urlBase, opt_urlFunction);
};


/**
 * Produces a function that delegates all its arguments to a
 * dynamically loaded function. This is used to export dynamically
 * loaded functions.
 *
 * @param {string} module The module to load from.
 * @param {number|string} symbol The ID of the symbol to load from the module.
 *     This symbol must resolve to a function.
 * @return {!Function} A function that forwards all its arguments to
 *     the dynamically loaded function specified by module and symbol.
 */
goog.module.loaderCall = function(module, symbol) {
  return function() {
    var args = arguments;
    goog.module.require(module, symbol, function(f) {
      f.apply(null, args);
    });
  };
};
