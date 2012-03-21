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
 * @fileoverview Convenient functions for observer-observable.
 */

goog.provide('goog.labs.observe');

goog.require('goog.labs.observe.Observer');


// TODO(user): Consider moving this to
// goog.labs.observe.Observer.fromFunction.
/**
 * Creates an observer that calls the given function.
 * @param {function(!goog.labs.observe.Notice)} fn Function to be converted.
 * @param {Object=} opt_scope Optional scope to execute the function.
 * @return {!goog.labs.observe.Observer} An observer object.
 */
goog.labs.observe.toObserver = function(fn, opt_scope) {
  return new goog.labs.observe.FunctionObserver_(fn, opt_scope);
};



/**
 * An observer that calls the given function on {@code notify}.
 * @param {function(!goog.labs.observe.Notice)} fn Function to delegate to.
 * @param {Object=} opt_scope Optional scope to execute the function.
 * @constructor
 * @implements {goog.labs.observe.Observer}
 * @private
 */
goog.labs.observe.FunctionObserver_ = function(fn, opt_scope) {
  this.fn_ = fn;
  this.scope_ = opt_scope;
};


/** @override */
goog.labs.observe.FunctionObserver_.prototype.notify = function(notice) {
  this.fn_.call(this.scope_, notice);
};


/** @override */
goog.labs.observe.FunctionObserver_.prototype.equals = function(observer) {
  return this.fn_ === observer.fn_ && this.scope_ === observer.scope_;
};
