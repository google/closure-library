// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Defines static 'wait' functions that provide a convenient way
 * to wait on results of asynchronous operations.
 *
 * Example:
 * <pre>
 *
 *  var result = xhr.get('testdata/xhr_test_text.data');
 *
 *  // Attach success and failure handlers.
 *  goog.labs.result.wait.onSuccess(result, function(result) {
 *    var dataValue = result.getValue();
 *    alert('value : ' + dataValue);
 *  });
 *
 *  goog.labs.result.wait.onError(result, function(error) {
 *   // Failed asynchronous call!
 *  });
 *  </pre>
 *
 */


goog.provide('goog.labs.result.wait');

goog.require('goog.labs.result.Result');


/**
 * Calls the handler on resolution of the result (success or failure).
 * The handler is passed the result object as the only parameter. The call will
 * be immediate if the result is no longer pending.
 *
 * @param {!goog.labs.result.Result} result The result to install the handlers.
 * @param {!function(!goog.labs.result.Result)} handler The handler to be
 *     called. The handler is passed the result object as the only parameter.
 * @param {!Object=} opt_scope Optional scope for the handler.
 */
goog.labs.result.wait = function(result, handler, opt_scope) {
  result.wait(opt_scope ? goog.bind(handler, opt_scope) : handler);
};


/**
 * Calls the handler if the result succeeds. The result object is the only
 * parameter passed to the handler. The call will be immediate if the result
 * has already succeeded.
 *
 * @param {!goog.labs.result.Result} result The result to install the handlers.
 * @param {!function(*, !goog.labs.result.Result)} handler The handler to be
 *     called. The handler is passed the result value and the result as
 *     parameters.
 * @param {!Object=} opt_scope Optional scope for the handler.
 */
goog.labs.result.wait.onSuccess = function(result, handler, opt_scope) {
  goog.labs.result.wait(result, function(res) {
    if (res.getState() == goog.labs.result.Result.State.SUCCESS) {
      // 'this' refers to opt_scope
      handler.call(this, res.getValue(), res);
    }
  }, opt_scope);
};


/**
 * Calls the handler if the result action errors. The result object is passed as
 * the only parameter to the handler. The call will be immediate if the result
 * object has already resolved to an error.
 *
 * @param {!goog.labs.result.Result} result The result to install the handlers.
 * @param {!function(!goog.labs.result.Result)} handler The handler to be
 *     called. The handler is passed the result object as the only parameter.
 * @param {!Object=} opt_scope Optional scope for the handler.
 */
goog.labs.result.wait.onError = function(result, handler, opt_scope) {
  goog.labs.result.wait(result, function(res) {
    if (res.getState() == goog.labs.result.Result.State.ERROR) {
      // 'this' refers to opt_scope
      handler.call(this, res);
    }
  }, opt_scope);
};
