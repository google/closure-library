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
 * @fileoverview Defines static functions that aid in chaining of asynchronous
 * Results. This provides a convenience for use cases where asynchronous
 * operations must happen serially i.e. subsequent asynchronous operations are
 * dependent on data returned by prior asynchronous operations.
 */

goog.provide('goog.labs.async.chain');

goog.require('goog.labs.async.Result');
goog.require('goog.labs.async.ResultBase');
goog.require('goog.labs.async.wait');


/**
 * The chain allows chaining of multiple asynchronous results.
 * Ideally used when one asynchronous action is dependent upon the result
 * returned by a prior asynchronous action.
 *
 * It accepts a result and an action callback as arguments and returns a
 * result. The action callback is called when the first result succeeds and is
 * supposed to return a second result. The returned result is resolved when one
 * of both of the results resolve (depending on their success or failure.) The
 * state and value of the returned result in the various cases is documented
 * below:
 *
 * First Result State:    Second Result State:    Returned Result State:
 * SUCCESS                SUCCESS                 SUCCESS
 * SUCCESS                ERROR                   ERROR
 * ERROR                  Not created             ERROR
 *
 * The value of the returned result, in the case both results succeed, is the
 * value of the second result (the result returned by the action callback.)
 *
 * @param {!goog.labs.async.Result} result The result to chain.
 * @param {!function(!goog.labs.async.Result):!goog.labs.async.Result}
 *     actionCallback The callback called when the result is resolved. This
 *     callback must return a Result.
 *
 * @return {!goog.labs.async.Result} A result that is resolved when both
 *     the given Result and the Result returned by the actionCallback have
 *     resolved.
 */
goog.labs.async.chain = function(result, actionCallback) {
  var returnedResult = new goog.labs.async.ResultBase();

  // Wait for the first action.
  goog.labs.async.wait(result, function(result) {
    if (result.getState() == goog.labs.async.Result.State.SUCCESS) {

      // The first action succeeded. Chain the dependent action.
      var dependentResult = actionCallback(result);
      goog.labs.async.wait(dependentResult, function(dependentResult) {

        // The dependent action completed. Set the returned result based on the
        // dependent action's outcome.
        if (dependentResult.getState() ==
            goog.labs.async.Result.State.SUCCESS) {
          returnedResult.setValue(dependentResult.getValue());
        } else {
          returnedResult.setError();
        }
      });
    } else {
      // First action failed, the returned result should also fail.
      returnedResult.setError();
    }
  });

  return returnedResult;
};
