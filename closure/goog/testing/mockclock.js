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
 * @fileoverview Mock Clock implementation for working with setTimeout,
 * setInterval, clearTimeout and clearInterval within unit tests.
 *
 * Derived from jsUnitMockTimeout.js, contributed to JsUnit by
 * Pivotal Computer Systems, www.pivotalsf.com
 *
 */

goog.setTestOnly('goog.testing.MockClock');
goog.provide('goog.testing.MockClock');

goog.require('goog.Disposable');
goog.require('goog.async.run');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.events');
goog.require('goog.testing.events.Event');



/**
 * Class for unit testing code that uses setTimeout and clearTimeout.
 *
 * NOTE: If you are using MockClock to test code that makes use of
 *       goog.fx.Animation, then you must either:
 *
 * 1. Install and dispose of the MockClock in setUpPage() and tearDownPage()
 *    respectively (rather than setUp()/tearDown()).
 *
 * or
 *
 * 2. Ensure that every test clears the animation queue by calling
 *    mockClock.tick(x) at the end of each test function (where `x` is large
 *    enough to complete all animations).
 *
 * Otherwise, if any animation is left pending at the time that
 * MockClock.dispose() is called, that will permanently prevent any future
 * animations from playing on the page.
 *
 * @param {boolean=} opt_autoInstall Install the MockClock at construction time.
 * @constructor
 * @extends {goog.Disposable}
 * @final
 */
goog.testing.MockClock = function(opt_autoInstall) {
  goog.Disposable.call(this);

  /**
   * Reverse-order queue of timers to fire.
   *
   * The last item of the queue is popped off.  Insertion happens from the
   * right.  For example, the expiration times for each element of the queue
   * might be in the order 300, 200, 200.
   *
   * @type {Array<Object>}
   * @private
   */
  this.queue_ = [];

  /**
   * Set of timeouts that should be treated as cancelled.
   *
   * Rather than removing cancelled timers directly from the queue, this set
   * simply marks them as deleted so that they can be ignored when their
   * turn comes up.  The keys are the timeout keys that are cancelled, each
   * mapping to true.
   *
   * @private {Object<number, boolean>}
   */
  this.deletedKeys_ = {};

  if (opt_autoInstall) {
    this.install();
  }
};
goog.inherits(goog.testing.MockClock, goog.Disposable);


/**
 * Default wait timeout for mocking requestAnimationFrame (in milliseconds).
 *
 * @type {number}
 * @const
 */
goog.testing.MockClock.REQUEST_ANIMATION_FRAME_TIMEOUT = 20;


/**
 * ID to use for next timeout.  Timeout IDs must never be reused, even across
 * MockClock instances.
 * @public {number}
 */
goog.testing.MockClock.nextId = Math.round(Math.random() * 10000);


/**
 * Count of the number of setTimeout/setInterval/etc. calls received by this
 * instance.
 * @type {number}
 * @private
 */
goog.testing.MockClock.prototype.timeoutsMade_ = 0;


/**
 * Count of the number of timeout/interval/etc. callbacks triggered by this
 * instance.
 * @type {number}
 * @private
 */
goog.testing.MockClock.prototype.callbacksTriggered_ = 0;


/**
 * PropertyReplacer instance which overwrites and resets setTimeout,
 * setInterval, etc. or null if the MockClock is not installed.
 * @type {goog.testing.PropertyReplacer}
 * @private
 */
goog.testing.MockClock.prototype.replacer_ = null;


/**
 * The current simulated time in milliseconds.
 * @type {number}
 * @private
 */
goog.testing.MockClock.prototype.nowMillis_ = 0;


/**
 * Additional delay between the time a timeout was set to fire, and the time
 * it actually fires.  Useful for testing workarounds for this Firefox 2 bug:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=291386
 * May be negative.
 * @type {number}
 * @private
 */
goog.testing.MockClock.prototype.timeoutDelay_ = 0;


/**
 * The real set timeout for reference.
 * @const @private {!Function}
 */
goog.testing.MockClock.REAL_SETTIMEOUT_ = goog.global.setTimeout;


/**
 * Installs the MockClock by overriding the global object's implementation of
 * setTimeout, setInterval, clearTimeout and clearInterval.
 */
goog.testing.MockClock.prototype.install = function() {
  if (!this.replacer_) {
    if (goog.testing.MockClock.REAL_SETTIMEOUT_ !== goog.global.setTimeout) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(
            'Non default setTimeout detected. ' +
            'Use of multiple MockClock instances or other clock mocking ' +
            'should be avoided due to unspecified behavior and ' +
            'the resulting fragility.');
      }
    }

    var r = this.replacer_ = new goog.testing.PropertyReplacer();
    r.set(goog.global, 'setTimeout', goog.bind(this.setTimeout_, this));
    r.set(goog.global, 'setInterval', goog.bind(this.setInterval_, this));
    r.set(goog.global, 'setImmediate', goog.bind(this.setImmediate_, this));
    r.set(goog.global, 'clearTimeout', goog.bind(this.clearTimeout_, this));
    r.set(goog.global, 'clearInterval', goog.bind(this.clearInterval_, this));
    // goog.Promise uses goog.async.run. In order to be able to test
    // Promise-based code, we need to make sure that goog.async.run uses
    // nextTick instead of native browser Promises. This means that it will
    // default to setImmediate, which is replaced above. Note that we test for
    // the presence of goog.async.run.forceNextTick to be resilient to the case
    // where tests replace goog.async.run directly.
    goog.async.run.forceNextTick &&
        goog.async.run.forceNextTick(goog.testing.MockClock.REAL_SETTIMEOUT_);

    // Replace the requestAnimationFrame functions.
    this.replaceRequestAnimationFrame_();

    // PropertyReplacer#set can't be called with renameable functions.
    this.oldGoogNow_ = goog.now;
    goog.now = goog.bind(this.getCurrentTime, this);
  }
};


/**
 * Installs the mocks for requestAnimationFrame and cancelRequestAnimationFrame.
 * @private
 */
goog.testing.MockClock.prototype.replaceRequestAnimationFrame_ = function() {
  var r = this.replacer_;
  var requestFuncs = [
    'requestAnimationFrame', 'webkitRequestAnimationFrame',
    'mozRequestAnimationFrame', 'oRequestAnimationFrame',
    'msRequestAnimationFrame'
  ];

  var cancelFuncs = [
    'cancelAnimationFrame', 'cancelRequestAnimationFrame',
    'webkitCancelRequestAnimationFrame', 'mozCancelRequestAnimationFrame',
    'oCancelRequestAnimationFrame', 'msCancelRequestAnimationFrame'
  ];

  for (var i = 0; i < requestFuncs.length; ++i) {
    if (goog.global && goog.global[requestFuncs[i]]) {
      r.set(
          goog.global, requestFuncs[i],
          goog.bind(this.requestAnimationFrame_, this));
    }
  }

  for (var i = 0; i < cancelFuncs.length; ++i) {
    if (goog.global && goog.global[cancelFuncs[i]]) {
      r.set(
          goog.global, cancelFuncs[i],
          goog.bind(this.cancelRequestAnimationFrame_, this));
    }
  }
};


/**
 * Removes the MockClock's hooks into the global object's functions and revert
 * to their original values.
 */
goog.testing.MockClock.prototype.uninstall = function() {
  if (this.replacer_) {
    this.replacer_.reset();
    this.replacer_ = null;
    goog.now = this.oldGoogNow_;
  }

  this.resetAsyncQueue_();
};


/** @override */
goog.testing.MockClock.prototype.disposeInternal = function() {
  this.uninstall();
  this.queue_ = null;
  this.deletedKeys_ = null;
  goog.testing.MockClock.superClass_.disposeInternal.call(this);
};


/**
 * Resets the MockClock, removing all timeouts that are scheduled and resets
 * the fake timer count.
 */
goog.testing.MockClock.prototype.reset = function() {
  this.queue_ = [];
  this.deletedKeys_ = {};
  this.nowMillis_ = 0;
  this.timeoutsMade_ = 0;
  this.callbacksTriggered_ = 0;
  this.timeoutDelay_ = 0;

  this.resetAsyncQueue_();
};


/**
 * Resets the async queue when this clock resets.
 * @private
 */
goog.testing.MockClock.prototype.resetAsyncQueue_ = function() {
  goog.async.run.resetQueue();
};


/**
 * Sets the amount of time between when a timeout is scheduled to fire and when
 * it actually fires.
 * @param {number} delay The delay in milliseconds.  May be negative.
 */
goog.testing.MockClock.prototype.setTimeoutDelay = function(delay) {
  this.timeoutDelay_ = delay;
};


/**
 * @return {number} delay The amount of time between when a timeout is
 *     scheduled to fire and when it actually fires, in milliseconds.  May
 *     be negative.
 */
goog.testing.MockClock.prototype.getTimeoutDelay = function() {
  return this.timeoutDelay_;
};


/**
 * Increments the MockClock's time by a given number of milliseconds, running
 * any functions that are now overdue.
 * @param {number=} opt_millis Number of milliseconds to increment the counter.
 *     If not specified, clock ticks 1 millisecond.
 * @return {number} Current mock time in milliseconds.
 */
goog.testing.MockClock.prototype.tick = function(opt_millis) {
  if (typeof opt_millis != 'number') {
    opt_millis = 1;
  }
  var endTime = this.nowMillis_ + opt_millis;
  this.runFunctionsWithinRange_(endTime);
  this.nowMillis_ = endTime;
  return endTime;
};


/**
 * Takes a promise and then ticks the mock clock. If the promise successfully
 * resolves, returns the value produced by the promise. If the promise is
 * rejected, it throws the rejection as an exception. If the promise is not
 * resolved at all, throws an exception.
 * Also ticks the general clock by the specified amount.
 *
 * @param {!goog.Thenable<T>} promise A promise that should be resolved after
 *     the mockClock is ticked for the given opt_millis.
 * @param {number=} opt_millis Number of milliseconds to increment the counter.
 *     If not specified, clock ticks 1 millisecond.
 * @return {T}
 * @template T
 */
goog.testing.MockClock.prototype.tickPromise = function(promise, opt_millis) {
  var value;
  var error;
  var resolved = false;
  promise.then(
      function(v) {
        value = v;
        resolved = true;
      },
      function(e) {
        error = e;
        resolved = true;
      });
  this.tick(opt_millis);
  if (!resolved) {
    throw new Error(
        'Promise was expected to be resolved after mock clock tick.');
  }
  if (error) {
    throw error;
  }
  return value;
};


/**
 * @return {number} The number of timeouts or intervals that have been
 * scheduled. A setInterval call is only counted once.
 */
goog.testing.MockClock.prototype.getTimeoutsMade = function() {
  return this.timeoutsMade_;
};


/**
 * @return {number} The number of timeout or interval callbacks that have been
 * triggered. For setInterval, each callback is counted separately.
 */
goog.testing.MockClock.prototype.getCallbacksTriggered = function() {
  return this.callbacksTriggered_;
};


/**
 * @return {number} The MockClock's current time in milliseconds.
 */
goog.testing.MockClock.prototype.getCurrentTime = function() {
  return this.nowMillis_;
};


/**
 * @param {number} timeoutKey The timeout key.
 * @return {boolean} Whether the timer has been set and not cleared,
 *     independent of the timeout's expiration.  In other words, the timeout
 *     could have passed or could be scheduled for the future.  Either way,
 *     this function returns true or false depending only on whether the
 *     provided timeoutKey represents a timeout that has been set and not
 *     cleared.
 */
goog.testing.MockClock.prototype.isTimeoutSet = function(timeoutKey) {
  return timeoutKey < goog.testing.MockClock.nextId &&
      timeoutKey >= goog.testing.MockClock.nextId - this.timeoutsMade_ &&
      !this.deletedKeys_[timeoutKey];
};


/**
 * Runs any function that is scheduled before a certain time.  Timeouts can
 * be made to fire early or late if timeoutDelay_ is non-0.
 * @param {number} endTime The latest time in the range, in milliseconds.
 * @private
 */
goog.testing.MockClock.prototype.runFunctionsWithinRange_ = function(endTime) {
  var adjustedEndTime = endTime - this.timeoutDelay_;

  // Repeatedly pop off the last item since the queue is always sorted.
  while (this.queue_ && this.queue_.length &&
         this.queue_[this.queue_.length - 1].runAtMillis <= adjustedEndTime) {
    var timeout = this.queue_.pop();

    if (!(timeout.timeoutKey in this.deletedKeys_)) {
      // Only move time forwards.
      this.nowMillis_ =
          Math.max(this.nowMillis_, timeout.runAtMillis + this.timeoutDelay_);
      // Call timeout in global scope and pass the timeout key as the argument.
      this.callbacksTriggered_++;
      timeout.funcToCall.call(goog.global, timeout.timeoutKey);
      // In case the interval was cleared in the funcToCall
      if (timeout.recurring) {
        this.scheduleFunction_(
            timeout.timeoutKey, timeout.funcToCall, timeout.millis, true);
      }
    }
  }
};


/**
 * Schedules a function to be run at a certain time.
 * @param {number} timeoutKey The timeout key.
 * @param {Function} funcToCall The function to call.
 * @param {number} millis The number of milliseconds to call it in.
 * @param {boolean} recurring Whether to function call should recur.
 * @private
 */
goog.testing.MockClock.prototype.scheduleFunction_ = function(
    timeoutKey, funcToCall, millis, recurring) {
  if (!goog.isFunction(funcToCall)) {
    // Early error for debuggability rather than dying in the next .tick()
    throw new TypeError(
        'The provided callback must be a function, not a ' + typeof funcToCall);
  }

  var timeout = {
    runAtMillis: this.nowMillis_ + millis,
    funcToCall: funcToCall,
    recurring: recurring,
    timeoutKey: timeoutKey,
    millis: millis
  };

  goog.testing.MockClock.insert_(timeout, this.queue_);
};


/**
 * Inserts a timer descriptor into a descending-order queue.
 *
 * Later-inserted duplicates appear at lower indices.  For example, the
 * asterisk in (5,4,*,3,2,1) would be the insertion point for 3.
 *
 * @param {Object} timeout The timeout to insert, with numerical runAtMillis
 *     property.
 * @param {Array<Object>} queue The queue to insert into, with each element
 *     having a numerical runAtMillis property.
 * @private
 */
goog.testing.MockClock.insert_ = function(timeout, queue) {
  // Although insertion of N items is quadratic, requiring goog.structs.Heap
  // from a unit test will make tests more prone to breakage.  Since unit
  // tests are normally small, scalability is not a primary issue.

  // Find an insertion point.  Since the queue is in reverse order (so we
  // can pop rather than unshift), and later timers with the same time stamp
  // should be executed later, we look for the element strictly greater than
  // the one we are inserting.

  for (var i = queue.length; i != 0; i--) {
    if (queue[i - 1].runAtMillis > timeout.runAtMillis) {
      break;
    }
    queue[i] = queue[i - 1];
  }

  queue[i] = timeout;
};


/**
 * Maximum 32-bit signed integer.
 *
 * Timeouts over this time return immediately in many browsers, due to integer
 * overflow.  Such known browsers include Firefox, Chrome, and Safari, but not
 * IE.
 *
 * @type {number}
 * @private
 */
goog.testing.MockClock.MAX_INT_ = 2147483647;


/**
 * Schedules a function to be called after {@code millis} milliseconds.
 * Mock implementation for setTimeout.
 * @param {Function} funcToCall The function to call.
 * @param {number=} opt_millis The number of milliseconds to call it after.
 * @return {number} The number of timeouts created.
 * @private
 */
goog.testing.MockClock.prototype.setTimeout_ = function(
    funcToCall, opt_millis) {
  var millis = opt_millis || 0;
  if (millis > goog.testing.MockClock.MAX_INT_) {
    throw Error(
        'Bad timeout value: ' + millis + '.  Timeouts over MAX_INT ' +
        '(24.8 days) cause timeouts to be fired ' +
        'immediately in most browsers, except for IE.');
  }
  this.timeoutsMade_++;
  this.scheduleFunction_(
      goog.testing.MockClock.nextId, funcToCall, millis, false);
  return goog.testing.MockClock.nextId++;
};


/**
 * Schedules a function to be called every {@code millis} milliseconds.
 * Mock implementation for setInterval.
 * @param {Function} funcToCall The function to call.
 * @param {number=} opt_millis The number of milliseconds between calls.
 * @return {number} The number of timeouts created.
 * @private
 */
goog.testing.MockClock.prototype.setInterval_ = function(
    funcToCall, opt_millis) {
  var millis = opt_millis || 0;
  this.timeoutsMade_++;
  this.scheduleFunction_(
      goog.testing.MockClock.nextId, funcToCall, millis, true);
  return goog.testing.MockClock.nextId++;
};


/**
 * Schedules a function to be called when an animation frame is triggered.
 * Mock implementation for requestAnimationFrame.
 * @param {Function} funcToCall The function to call.
 * @return {number} The number of timeouts created.
 * @private
 */
goog.testing.MockClock.prototype.requestAnimationFrame_ = function(funcToCall) {
  return this.setTimeout_(goog.bind(function() {
    if (funcToCall) {
      funcToCall(this.getCurrentTime());
    } else if (goog.global.mozRequestAnimationFrame) {
      var event = new goog.testing.events.Event('MozBeforePaint', goog.global);
      event['timeStamp'] = this.getCurrentTime();
      goog.testing.events.fireBrowserEvent(event);
    }
  }, this), goog.testing.MockClock.REQUEST_ANIMATION_FRAME_TIMEOUT);
};


/**
 * Schedules a function to be called immediately after the current JS
 * execution.
 * Mock implementation for setImmediate.
 * @param {Function} funcToCall The function to call.
 * @return {number} The number of timeouts created.
 * @private
 */
goog.testing.MockClock.prototype.setImmediate_ = function(funcToCall) {
  return this.setTimeout_(funcToCall, 0);
};


/**
 * Clears a timeout.
 * Mock implementation for clearTimeout.
 * @param {number} timeoutKey The timeout key to clear.
 * @private
 */
goog.testing.MockClock.prototype.clearTimeout_ = function(timeoutKey) {
  // Some common libraries register static state with timers.
  // This is bad. It leads to all sorts of crazy test problems where
  // 1) Test A sets up a new mock clock and a static timer.
  // 2) Test B sets up a new mock clock, but re-uses the static timer
  //    from Test A.
  // 3) A timeout key from test A gets cleared, breaking a timeout in
  //    Test B.
  //
  // For now, we just hackily fail silently if someone tries to clear a timeout
  // key before we've allocated it.
  // Ideally, we should throw an exception if we see this happening.
  if (this.isTimeoutSet(timeoutKey)) {
    this.deletedKeys_[timeoutKey] = true;
  }
};


/**
 * Clears an interval.
 * Mock implementation for clearInterval.
 * @param {number} timeoutKey The interval key to clear.
 * @private
 */
goog.testing.MockClock.prototype.clearInterval_ = function(timeoutKey) {
  this.clearTimeout_(timeoutKey);
};


/**
 * Clears a requestAnimationFrame.
 * Mock implementation for cancelRequestAnimationFrame.
 * @param {number} timeoutKey The requestAnimationFrame key to clear.
 * @private
 */
goog.testing.MockClock.prototype.cancelRequestAnimationFrame_ = function(
    timeoutKey) {
  this.clearTimeout_(timeoutKey);
};
