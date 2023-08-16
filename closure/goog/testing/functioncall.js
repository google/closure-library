/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper class for recording the calls of a function.
 */

goog.module('goog.testing.FunctionCall');
goog.module.declareLegacyNamespace();
goog.setTestOnly('goog.testing.FunctionCall');

/**
 * Struct for a single function call.
 * @param {!Function} func The called function.
 * @param {!Object} thisContext `this` context of called function.
 * @param {!Arguments} args Arguments of the called function.
 * @param {*} ret Return value of the function or undefined in case of error.
 * @param {*} error The error thrown by the function or null if none.
 * @constructor
 */
function FunctionCall(func, thisContext, args, ret, error) {
  this.function_ = func;
  this.thisContext_ = thisContext;
  this.arguments_ = Array.prototype.slice.call(args);
  this.returnValue_ = ret;
  this.error_ = error;
}


/**
 * @return {!Function} The called function.
 */
FunctionCall.prototype.getFunction = function() {
  return this.function_;
};


/**
 * @return {!Object} `this` context of called function. It is the same as
 *     the created object if the function is a constructor.
 */
FunctionCall.prototype.getThis = function() {
  return this.thisContext_;
};


/**
 * @return {!Array<?>} Arguments of the called function.
 */
FunctionCall.prototype.getArguments = function() {
  return this.arguments_;
};


/**
 * Returns the nth argument of the called function.
 * @param {number} index 0-based index of the argument.
 * @return {*} The argument value or undefined if there is no such argument.
 */
FunctionCall.prototype.getArgument = function(index) {
  return this.arguments_[index];
};


/**
 * @return {*} Return value of the function or undefined in case of error.
 */
FunctionCall.prototype.getReturnValue = function() {
  return this.returnValue_;
};


/**
 * @return {*} The error thrown by the function or null if none.
 */
FunctionCall.prototype.getError = function() {
  return this.error_;
};

exports = FunctionCall;
