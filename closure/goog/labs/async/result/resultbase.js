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
 * @fileoverview A ResultBase object that implements goog.labs.async.Result.
 * See below for a more detailed description.
 */

goog.provide('goog.labs.async.ResultBase');
goog.provide('goog.labs.async.ResultBase.StateError');

goog.require('goog.debug.Error');
goog.require('goog.labs.async.Result');



/**
 * A ResultBase object is a basic implementation of the goog.labs.async.Result
 * interface. This could be subclassed(e.g. XHRResult) or instantiated and
 * returned by another class as a form of result. The caller receiving the
 * result could then attach handlers to be called when the result is resolved
 * (success or error).
 *
 * @constructor
 * @implements {goog.labs.async.Result}
 */
goog.labs.async.ResultBase = function() {
  /**
   * The current state of this Result.
   * @type {goog.labs.async.Result.State}
   * @private
   */
  this.state_ = goog.labs.async.Result.State.PENDING;

  /**
   * The list of handlers to call when this Result is resolved.
   * @type {!Array.<!function(goog.labs.async.ResultBase)>}
   * @private
   */
  this.handlers_ = [];
};


/**
 * The 'value' of this Result.
 * @type {*}
 * @private
 */
goog.labs.async.ResultBase.prototype.value_;


/**
 * The error slug for this Result.
 * @type {*}
 * @private
 */
goog.labs.async.ResultBase.prototype.error_;



/**
 * Error thrown if there is an attempt to set the value or error for this result
 * more than once.
 *
 * @constructor
 * @extends {goog.debug.Error}
 */
goog.labs.async.ResultBase.StateError = function() {
  goog.base(this, 'Multiple attempts to set the state of this Result');
};
goog.inherits(goog.labs.async.ResultBase.StateError, goog.debug.Error);


/**
 * Returns the state of this object.
 *
 * @return {!goog.labs.async.Result.State} The current state of this Result.
 */
goog.labs.async.ResultBase.prototype.getState = function() {
  return this.state_;
};


/**
 * Returns the value of this object.
 *
 * @return {*} The current value of this Result.
 */
goog.labs.async.ResultBase.prototype.getValue = function() {
  return this.value_;
};


/**
 * Returns the error slug for this object.
 *
 * @return {*} The current error for this Result.
 */
goog.labs.async.ResultBase.prototype.getError = function() {
  return this.error_;
};


/**
 * Attaches handlers to be called when the value of this Result is available.
 *
 * @param {!function(!goog.labs.async.ResultBase)} handler The function called
 *     when the value is available. The function is passed the Result object
 *     as the only argument.
 */
goog.labs.async.ResultBase.prototype.wait = function(handler) {
  if (this.isPending_()) {
    this.handlers_.push(handler);
  } else {
    handler(this);
  }
};


/**
 * Sets the value of this Result, changing the state.
 *
 * @param {*} value The value to set for this Result.
 */
goog.labs.async.ResultBase.prototype.setValue = function(value) {
  if (this.isPending_()) {
    this.value_ = value;
    this.state_ = goog.labs.async.Result.State.SUCCESS;
    this.callHandlers_();
  } else {
    throw new goog.labs.async.ResultBase.StateError();
  }
};


/**
 * Sets the Result to be an error Result.
 *
 * @param {*=} opt_error Optional error slug to set for this Result.
 */
goog.labs.async.ResultBase.prototype.setError = function(opt_error) {
  if (this.isPending_()) {
    this.error_ = opt_error;
    this.state_ = goog.labs.async.Result.State.ERROR;
    this.callHandlers_();
  } else {
    throw new goog.labs.async.ResultBase.StateError();
  }
};


/**
 * Calls the handlers registered for this Result.
 *
 * @private
 */
goog.labs.async.ResultBase.prototype.callHandlers_ = function() {
  while (this.handlers_.length) {
    var callback = this.handlers_.shift();
    callback(this);
  }
};


/**
 * Returns whether this Result is pending.
 *
 * @return {boolean} Whether the Result is pending.
 * @private
 */
goog.labs.async.ResultBase.prototype.isPending_ = function() {
  return this.state_ == goog.labs.async.Result.State.PENDING;
};
