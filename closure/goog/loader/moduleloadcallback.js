// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview A simple callback mechanism for notification about module
 * loads. Should be considered package-private to goog.loader.
 *
 */

goog.provide('goog.loader.ModuleLoadCallback');

goog.require('goog.debug.entryPointRegistry');



/**
 * Class used to encapsulate the callbacks to be called when a module loads.
 * @param {Function} fn Callback function.
 * @param {Object=} opt_handler Optional handler under whose scope to execute
 *     the callback.
 * @constructor
 * @final
 */
goog.loader.ModuleLoadCallback = function(fn, opt_handler) {
  /**
   * Callback function.
   * @type {Function}
   * @private
   */
  this.fn_ = fn;

  /**
   * Optional handler under whose scope to execute the callback.
   * @type {Object|undefined}
   * @private
   */
  this.handler_ = opt_handler;
};


/**
 * Completes the operation and calls the callback function if appropriate.
 * @param {*} context The module context.
 */
goog.loader.ModuleLoadCallback.prototype.execute = function(context) {
  if (this.fn_) {
    this.fn_.call(this.handler_ || null, context);
    this.handler_ = null;
    this.fn_ = null;
  }
};


/**
 * Abort the callback, but not the actual module load.
 */
goog.loader.ModuleLoadCallback.prototype.abort = function() {
  this.fn_ = null;
  this.handler_ = null;
};


// Register the browser event handler as an entry point, so that
// it can be monitored for exception handling, etc.
goog.debug.entryPointRegistry.register(
    /**
     * @param {function(!Function): !Function} transformer The transforming
     *     function.
     */
    function(transformer) {
      goog.loader.ModuleLoadCallback.prototype.execute =
          transformer(goog.loader.ModuleLoadCallback.prototype.execute);
    });
