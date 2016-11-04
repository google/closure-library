// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Definition of the goog.async.Throttle class.
 *
 * @see ../demos/timers.html
 */

goog.provide('goog.Throttle');
goog.provide('goog.async.Throttle');

goog.require('goog.Disposable');
goog.require('goog.Timer');



/**
 * Throttle will perform an action that is passed in no more than once
 * per interval (specified in milliseconds). If it gets multiple signals
 * to perform the action while it is waiting, it will only perform the action
 * once at the end of the interval.
 * @param {function(this: T, ...?)} listener Function to callback when the
 *     action is triggered.
 * @param {number} interval Interval over which to throttle. The listener can
 *     only be called once per interval.
 * @param {T=} opt_handler Object in whose scope to call the listener.
 * @constructor
 * @struct
 * @extends {goog.Disposable}
 * @final
 * @template T
 */
goog.async.Throttle = function(listener, interval, opt_handler) {
  goog.async.Throttle.base(this, 'constructor');

  /**
   * Function to callback
   * @type {function(this: T, ...?)}
   * @private
   */
  this.listener_ =
      opt_handler != null ? goog.bind(listener, opt_handler) : listener;

  /**
   * Interval for the throttle time
   * @type {number}
   * @private
   */
  this.interval_ = interval;

  /**
   * Cached callback function invoked after the throttle timeout completes
   * @type {Function}
   * @private
   */
  this.callback_ = goog.bind(this.onTimer_, this);

  /**
   * The last arguments passed into {@code fire}.
   * @private {!IArrayLike}
   */
  this.args_ = [];
};
goog.inherits(goog.async.Throttle, goog.Disposable);



/**
 * A deprecated alias.
 * @deprecated Use goog.async.Throttle instead.
 * @constructor
 * @final
 */
goog.Throttle = goog.async.Throttle;


/**
 * Indicates that the action is pending and needs to be fired.
 * @type {boolean}
 * @private
 */
goog.async.Throttle.prototype.shouldFire_ = false;


/**
 * Indicates the count of nested pauses currently in effect on the throttle.
 * When this count is not zero, fired actions will be postponed until the
 * throttle is resumed enough times to drop the pause count to zero.
 * @type {number}
 * @private
 */
goog.async.Throttle.prototype.pauseCount_ = 0;


/**
 * Timer for scheduling the next callback
 * @type {?number}
 * @private
 */
goog.async.Throttle.prototype.timer_ = null;


/**
 * Notifies the throttle that the action has happened. It will throttle the call
 * so that the callback is not called too often according to the interval
 * parameter passed to the constructor, passing the arguments from the last call
 * of this function into the throttled function.
 * @param {...?} var_args Arguments to pass on to the throttled function.
 */
goog.async.Throttle.prototype.fire = function(var_args) {
  this.args_ = arguments;
  if (!this.timer_ && !this.pauseCount_) {
    this.doAction_();
  } else {
    this.shouldFire_ = true;
  }
};


/**
 * Cancels any pending action callback. The throttle can be restarted by
 * calling {@link #fire}.
 */
goog.async.Throttle.prototype.stop = function() {
  if (this.timer_) {
    goog.Timer.clear(this.timer_);
    this.timer_ = null;
    this.shouldFire_ = false;
    this.args_ = [];
  }
};


/**
 * Pauses the throttle.  All pending and future action callbacks will be
 * delayed until the throttle is resumed.  Pauses can be nested.
 */
goog.async.Throttle.prototype.pause = function() {
  this.pauseCount_++;
};


/**
 * Resumes the throttle.  If doing so drops the pausing count to zero, pending
 * action callbacks will be executed as soon as possible, but still no sooner
 * than an interval's delay after the previous call.  Future action callbacks
 * will be executed as normal.
 */
goog.async.Throttle.prototype.resume = function() {
  this.pauseCount_--;
  if (!this.pauseCount_ && this.shouldFire_ && !this.timer_) {
    this.shouldFire_ = false;
    this.doAction_();
  }
};


/** @override */
goog.async.Throttle.prototype.disposeInternal = function() {
  goog.async.Throttle.base(this, 'disposeInternal');
  this.stop();
};


/**
 * Handler for the timer to fire the throttle
 * @private
 */
goog.async.Throttle.prototype.onTimer_ = function() {
  this.timer_ = null;

  if (this.shouldFire_ && !this.pauseCount_) {
    this.shouldFire_ = false;
    this.doAction_();
  }
};


/**
 * Calls the callback
 * @private
 */
goog.async.Throttle.prototype.doAction_ = function() {
  this.timer_ = goog.Timer.callOnce(this.callback_, this.interval_);
  this.listener_.apply(null, this.args_);
};
