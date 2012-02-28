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
 * @fileoverview The module loader for loading modules across the network.
 *
 * Webkit and IE do not guarantee that scripts appended to the document
 * are executed in the order they are added. For production mode, we use
 * XHRs to load scripts, because they do not have this problem and they
 * have superior mechanisms for handling failure. However, XHR-evaled
 * scripts are harder to debug.
 *
 * In debugging mode, we use normal script tags. In order to make this work
 * in WebKit and IE, we load the scripts in serial: we do not execute
 * script B to the document until we are certain that script A is
 * finished loading.
 *
 */

goog.provide('goog.module.ModuleLoader');

goog.require('goog.Disposable');
goog.require('goog.array');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.module.AbstractModuleLoader');
goog.require('goog.net.BulkLoader');
goog.require('goog.net.EventType');
goog.require('goog.net.jsloader');


/**
 * A class that loads Javascript modules.
 * @constructor
 * @extends {goog.Disposable}
 * @implements {goog.module.AbstractModuleLoader}
 */
goog.module.ModuleLoader = function() {
  goog.Disposable.call(this);

  /**
   * Event handler for managing handling events.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eventHandler_ = new goog.events.EventHandler(this);
};
goog.inherits(goog.module.ModuleLoader, goog.Disposable);


/**
 * A logger.
 * @type {goog.debug.Logger}
 * @protected
 */
goog.module.ModuleLoader.prototype.logger = goog.debug.Logger.getLogger(
    'goog.module.ModuleLoader');


/**
 * Whether debug mode is enabled.
 * @type {boolean}
 * @private
 */
goog.module.ModuleLoader.prototype.debugMode_ = false;


/**
 * The postfix to check for in code received from the server before it is
 * evaluated on the client.
 * @type {?string}
 * @private
 */
goog.module.ModuleLoader.prototype.codePostfix_ = null;


/**
 * Gets the debug mode for the loader.
 * @return {boolean} debugMode Whether the debug mode is enabled.
 */
goog.module.ModuleLoader.prototype.getDebugMode = function() {
  return this.debugMode_;
};


/**
 * Sets the debug mode for the loader.
 * @param {boolean} debugMode Whether the debug mode is enabled.
 */
goog.module.ModuleLoader.prototype.setDebugMode = function(debugMode) {
  this.debugMode_ = debugMode;
};


/**
 * Set the postfix to check for when we receive code from the server.
 * @param {string} codePostfix The postfix.
 */
goog.module.ModuleLoader.prototype.setCodePostfix = function(
    codePostfix) {
  this.codePostfix_ = codePostfix;
};


/** @override */
goog.module.ModuleLoader.prototype.loadModules = function(
    ids, moduleInfoMap, opt_successFn, opt_errorFn, opt_timeoutFn,
    opt_forceReload) {
  this.loadModulesInternal(ids, moduleInfoMap, opt_successFn, opt_errorFn,
      opt_timeoutFn, opt_forceReload);
};


/**
 * Evaluate the JS code.
 * @param {Array.<string>} moduleIds The module ids.
 * @param {string} jsCode The JS code.
 * @return {boolean} Whether the JS code was evaluated successfully.
 */
goog.module.ModuleLoader.prototype.evaluateCode = function(
    moduleIds, jsCode) {
  var success = true;
  try {
    if (this.validateCodePostfix_(jsCode)) {
      goog.globalEval(jsCode);
    } else {
      success = false;
    }
  } catch (e) {
    success = false;
    // TODO(user): Consider throwing an exception here.
    this.logger.warning('Loaded incomplete code for module(s): ' +
        moduleIds, e);
  }

  return success;
};


/**
 * Handles a successful response to a request for one or more modules.
 * @param {string} jsCode the JS code.
 * @param {Array.<string>} moduleIds The ids of the modules requested.
 * @param {function()} successFn The callback for success.
 * @param {function(?number)} errorFn The callback for error.
 */
goog.module.ModuleLoader.prototype.handleRequestSuccess = function(
    jsCode, moduleIds, successFn, errorFn) {
  this.logger.info('Code loaded for module(s): ' + moduleIds);

  var success = this.evaluateCode(moduleIds, jsCode);
  if (!success) {
    this.handleRequestError(moduleIds, errorFn, null);
  } else if (success && successFn) {
    successFn();
  }
};


/**
 * Handles an error during a request for one or more modules.
 * @param {Array.<string>} moduleIds The ids of the modules requested.
 * @param {function(?number)} errorFn The function to call on failure.
 * @param {?number} status The response status.
 */
goog.module.ModuleLoader.prototype.handleRequestError = function(
    moduleIds, errorFn, status) {
  this.logger.warning('Request failed for module(s): ' + moduleIds);

  if (errorFn) {
    errorFn(status);
  }
};


/**
 * Handles a timeout during a request for one or more modules.
 * @param {Array.<string>} moduleIds The ids of the modules requested.
 * @param {function()} timeoutFn The function to call on timeout.
 */
goog.module.ModuleLoader.prototype.handleRequestTimeout = function(
    moduleIds, timeoutFn) {
  this.logger.warning('Request timed out for module(s): ' + moduleIds);

  if (timeoutFn) {
    timeoutFn();
  }
};


/**
 * Validate the js code received from the server.
 * @param {string} jsCode The JS code.
 * @return {boolean} TRUE iff the jsCode is valid.
 * @private
 */
goog.module.ModuleLoader.prototype.validateCodePostfix_ = function(
    jsCode) {
  return this.codePostfix_ ?
      goog.string.endsWith(jsCode, this.codePostfix_) : true;
};


/**
 * Loads a list of JavaScript modules.
 * @param {Array.<string>} ids The module ids in dependency order.
 * @param {Object} moduleInfoMap A mapping from module id to ModuleInfo object.
 * @param {?function()=} opt_successFn The callback if module loading is a
 *     success.
 * @param {?function(number)=} opt_errorFn The callback if module loading is in
 *     error.
 * @param {?function()=} opt_timeoutFn The callback if module loading times out
 * @param {boolean=} opt_forceReload Whether to bypass cache while loading the
 *     module.
 * @protected
 */
goog.module.ModuleLoader.prototype.loadModulesInternal = function(
    ids, moduleInfoMap, opt_successFn, opt_errorFn, opt_timeoutFn,
    opt_forceReload) {
  var uris = [];
  for (var i = 0; i < ids.length; i++) {
    goog.array.extend(uris, moduleInfoMap[ids[i]].getUris());
  }
  this.logger.info('loadModules ids:' + ids + ' uris:' + uris);

  if (this.getDebugMode()) {
    // In debug mode use <script> tags rather than XHRs to load the files.
    // This makes it possible to debug and inspect stack traces more easily.
    // It's also possible to use it to load JavaScript files that are hosted on
    // another domain.
    goog.net.jsloader.loadMany(uris);
  } else {
    var bulkLoader = new goog.net.BulkLoader(uris);
    var eventHandler = this.eventHandler_;
    eventHandler.listen(
        bulkLoader,
        goog.net.EventType.SUCCESS,
        goog.bind(this.handleSuccess, this, bulkLoader, ids,
            opt_successFn, opt_errorFn),
        false,
        null);
    eventHandler.listen(
        bulkLoader,
        goog.net.EventType.ERROR,
        goog.bind(this.handleError, this, bulkLoader, ids, opt_errorFn),
        false,
        null);
    // TODO(user): Need to handle timeouts in the module loading code.

    bulkLoader.load();
  }
};


/**
 * Handles a successful response to a request for one or more modules.
 *
 * @param {goog.net.BulkLoader} bulkLoader The bulk loader.
 * @param {Array.<string>} moduleIds The ids of the modules requested.
 * @param {function()} successFn The callback for success.
 * @param {function(?number)} errorFn The callback for error.
 */
goog.module.ModuleLoader.prototype.handleSuccess = function(
    bulkLoader, moduleIds, successFn, errorFn) {
  var jsCode = bulkLoader.getResponseTexts().join('\n');

  this.handleRequestSuccess(jsCode, moduleIds, successFn, errorFn);

  // NOTE: A bulk loader instance is used for loading a set of module ids. Once
  // these modules have been loaded succesfully or in error the bulk loader
  // should be disposed as it is not needed anymore. A new bulk loader is
  // instantiated for any new modules to be loaded. The dispose is called
  // on a timer so that the bulkloader has a chance to release its
  // objects.
  goog.Timer.callOnce(bulkLoader.dispose, 5, bulkLoader);
};


/**
 * Handles an error during a request for one or more modules.
 * @param {goog.net.BulkLoader} bulkLoader The bulk loader.
 * @param {Array.<string>} moduleIds The ids of the modules requested.
 * @param {function(?number)} errorFn The function to call on failure.
 * @param {number} status The response status.
 */
goog.module.ModuleLoader.prototype.handleError = function(
    bulkLoader, moduleIds, errorFn, status) {
  this.handleRequestError(moduleIds, errorFn, status);

  // NOTE: A bulk loader instance is used for loading a set of module ids. Once
  // these modules have been loaded succesfully or in error the bulk loader
  // should be disposed as it is not needed anymore. A new bulk loader is
  // instantiated for any new modules to be loaded. The dispose is called
  // on another thread so that the bulkloader has a chance to release its
  // objects.
  goog.Timer.callOnce(bulkLoader.dispose, 5, bulkLoader);
};


/** @override */
goog.module.ModuleLoader.prototype.disposeInternal = function() {
  goog.module.ModuleLoader.superClass_.disposeInternal.call(this);

  this.eventHandler_.dispose();
  this.eventHandler_ = null;
};
