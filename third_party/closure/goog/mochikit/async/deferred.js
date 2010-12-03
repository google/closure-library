// Copyright 2007 Bob Ippolito. All Rights Reserved.
// Modifications Copyright 2009 The Closure Library Authors. All Rights
// Reserved.

/**
 * @license Portions of this code are from MochiKit, received by
 * The Closure Authors under the MIT license. All other code is Copyright
 * 2005-2009 The Closure Authors. All Rights Reserved.
 */

/**
 * @fileoverview Classes for tracking asynchronous operations and handling the
 * results. The Deferred object here is patterned after the Deferred object in
 * the Twisted python networking framework.
 *
 * See: http://twistedmatrix.com/projects/core/documentation/howto/defer.html
 *
 * Based on the Dojo code which in turn is based on the MochiKit code.
 *
 */

goog.provide('goog.async.Deferred');
goog.provide('goog.async.Deferred.AlreadyCalledError');
goog.provide('goog.async.Deferred.CancelledError');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.debug.Error');



/**
 * Represents the results of an asynchronous operation. A Deferred object
 * starts with no result, and then gets a result at some point in the future.
 * @param {Function=} opt_canceller A function that will be called if the
 *     deferred is cancelled.
 * @param {Object=} opt_defaultScope The default scope to call callbacks with.
 * @constructor
 */
goog.async.Deferred = function(opt_canceller, opt_defaultScope) {
  /**
   * Entries in the chain are arrays containing a callback, errback, and
   * optional scope. Callbacks or errbacks may be null.
   * @type {!Array.<!Array>}
   * @private
   */
  this.chain_ = [];

  /**
   * If provided, this is the function to call when the deferred is cancelled.
   * @type {Function|undefined}
   * @private
   */
  this.canceller_ = opt_canceller;

  /**
   * The default scope to execute callbacks in.
   * @type {Object}
   * @private
   */
  this.defaultScope_ = opt_defaultScope || null;
};


/**
 * Whether the deferred has been fired.
 * @type {boolean}
 * @private
 */
goog.async.Deferred.prototype.fired_ = false;


/**
 * Whether the last result in the callback chain was an error.
 * @type {boolean}
 * @private
 */
goog.async.Deferred.prototype.hadError_ = false;


/**
 * The current Deferred result, updated by registered callbacks and errbacks.
 * @type {*}
 * @private
 */
goog.async.Deferred.prototype.result_;


/**
 * The number of times this deferred has been paused.
 * @type {number}
 * @private
 */
goog.async.Deferred.prototype.paused_ = 0;


/**
 * If the deferred was cancelled but it did not have a canceller then this gets
 * set to true.
 * @type {boolean}
 * @private
 */
goog.async.Deferred.prototype.silentlyCancelled_ = false;

/**
 * If a callback returns a deferred then this deferred is considered a chained
 * deferred and once it is chained we cannot add more callbacks.
 * @type {boolean}
 * @private
 */
goog.async.Deferred.prototype.chained_ = false;


/**
 * If an error is thrown during Deferred execution with no errback to catch it,
 * the error is rethrown after a timeout. Reporting the error after a timeout
 * allows execution to continue in the calling context.
 * @type {number}
 * @private
 */
goog.async.Deferred.prototype.unhandledExceptionTimeoutId_;


/**
 * Cancels a deferred that has not yet received a value. If this Deferred is
 * paused waiting for a chained Deferred to fire, the chained Deferred will also
 * be cancelled.
 */
goog.async.Deferred.prototype.cancel = function() {
  if (!this.hasFired()) {
    if (this.canceller_) {
      // Call in user-specified scope.
      this.canceller_.call(this.defaultScope_, this);
    } else {
      this.silentlyCancelled_ = true;
    }
    if (!this.hasFired()) {
      this.errback(new goog.async.Deferred.CancelledError(this));
    }
  } else if (this.result_ instanceof goog.async.Deferred) {
    this.result_.cancel();
  }
};


/**
 * Pauses the deferred.
 * @private
 */
goog.async.Deferred.prototype.pause_ = function() {
  this.paused_++;
};


/**
 * Resumes a paused deferred.
 * @private
 */
goog.async.Deferred.prototype.unpause_ = function() {
  // TODO(user): Rename
  this.paused_--;
  if (this.paused_ == 0 && this.hasFired()) {
    this.fire_();
  }
};


/**
 * Called when a dependent deferred fires.
 * @param {*} res The result of the dependent deferred.
 * @private
 */
goog.async.Deferred.prototype.continue_ = function(res) {
  this.resback_(res);
  this.unpause_();
};


/**
 * Called when either a success or a failure happens.
 * @param {*} res The result.
 * @private
 */
goog.async.Deferred.prototype.resback_ = function(res) {
  this.fired_ = true;
  this.result_ = res;
  this.fire_();
};


/**
 * Verifies that the deferred has not yet been fired.
 * @private
 * @throws {Error} If this has already been fired.
 */
goog.async.Deferred.prototype.check_ = function() {
  if (this.hasFired()) {
    if (!this.silentlyCancelled_) {
      throw new goog.async.Deferred.AlreadyCalledError(this);
    }
    this.silentlyCancelled_ = false;
  }
};


/**
 * Record a successful result for this operation, and send the result
 * to all registered callback functions.
 * @param {*} result The result of the operation.
 */
goog.async.Deferred.prototype.callback = function(result) {
  this.check_();
  this.assertNotDeferred_(result);
  this.resback_(result);
};


/**
 * Record that this operation failed with an error, and send the error
 * to all registered errback functions.
 * @param {*} result The error result of the operation.
 */
goog.async.Deferred.prototype.errback = function(result) {
  this.check_();
  this.assertNotDeferred_(result);
  // Ensure we pass along the object as an Error.
  this.resback_(result instanceof Error ? result : Error(result));
};


/**
 * Asserts that an object is not a Deferred.
 * @param {*} obj The object to test.
 * @throws {Error} Throws an exception if the object is a Deferred.
 * @private
 */
goog.async.Deferred.prototype.assertNotDeferred_ = function(obj) {
  goog.asserts.assert(
      !(obj instanceof goog.async.Deferred),
      'Deferred instances can only be chained if they are the result of a ' +
      'callback');
};


/**
 * Register a callback function, to be called when a successful result
 * is available.
 * @param {!Function} cb The function to be called on a successful result.
 * @param {Object=} opt_scope An optional scope to call the callback in.
 * @return {!goog.async.Deferred} The deferred object for chaining.
 */
goog.async.Deferred.prototype.addCallback = function(cb, opt_scope) {
  return this.addCallbacks(cb, null, opt_scope);
};


/**
 * Register a callback function, to be called if this operation fails.
 * @param {!Function} eb The function to be called on an unsuccessful result.
 * @param {Object=} opt_scope An optional scope to call the errback in.
 * @return {!goog.async.Deferred} The deferred object for chaining.
 */
goog.async.Deferred.prototype.addErrback = function(eb, opt_scope) {
  return this.addCallbacks(null, eb, opt_scope);
};


/**
 * Registers a callback function and errback function.
 * @param {Function} cb The function to be called on a successful result.
 * @param {Function} eb The function to be called on an unsuccessful result.
 * @param {Object=} opt_scope An optional scope to call the callbacks in.
 * @return {!goog.async.Deferred} The deferred object for chaining.
 */
goog.async.Deferred.prototype.addCallbacks = function(cb, eb, opt_scope) {
  goog.asserts.assert(!this.chained_, 'Chained Deferreds can not be re-used');
  this.chain_.push([cb, eb, opt_scope]);
  if (this.hasFired()) {
    this.fire_();
  }
  return this;
};


/**
 * Adds another deferred to the end of this deferred's processing chain.
 *
 * Use this when you want otherDeferred to be called at the end of
 * thisDeferred's previous callbacks.
 *
 * @param {!goog.async.Deferred} otherDeferred The Deferred to chain.
 * @return {!goog.async.Deferred} The deferred object for chaining.
 */
goog.async.Deferred.prototype.chainDeferred = function(otherDeferred) {
  this.addCallbacks(
      otherDeferred.callback, otherDeferred.errback, otherDeferred);
  return this;
};


/**
 * Makes this Deferred wait for otherDeferred to be called, and its preceding
 * callbacks to be executed, before continuing with the callback sequence.
 *
 * This is equivalent to adding a callback that returns otherDeferred, but
 * doesn't prevent additional callbacks from being added to otherDeferred.
 *
 * @param {!goog.async.Deferred} otherDeferred The Deferred to wait for.
 * @return {!goog.async.Deferred} The deferred object for chaining.
 */
goog.async.Deferred.prototype.awaitDeferred = function(otherDeferred) {
  this.addCallback(function() {
    var d = new goog.async.Deferred();
    otherDeferred.chainDeferred(d);
    return d;
  });
  return this;
};


/**
 * Registers a function as both callback and errback.
 * @param {!Function} f The function to be called on any result.
 * @param {Object=} opt_scope An optional scope to call the callbacks in.
 * @return {!goog.async.Deferred} The deferred object for chaining.
 */
goog.async.Deferred.prototype.addBoth = function(f, opt_scope) {
  return this.addCallbacks(f, f, opt_scope);
};


/**
 * @return {boolean} Whether callback or errback has been called on this
 *     deferred.
 */
goog.async.Deferred.prototype.hasFired = function() {
  return this.fired_;
};


/**
 * @param {*} res The current callback result.
 * @return {boolean} Whether the current result is an error that should cause
 *     registered errbacks to fire. May be overridden by subclasses to handle
 *     special error types.
 * @protected
 */
goog.async.Deferred.prototype.isError = function(res) {
  return res instanceof Error;
};


/**
 * @return {boolean} Whether an errback has been registered.
 */
goog.async.Deferred.prototype.hasErrback_ = function() {
  return goog.array.some(this.chain_, function(chainRow) {
    // The errback is the second element in the array.
    return goog.isFunction(chainRow[1]);
  });
};


/**
 * Exhausts the callback sequence once a result is available.
 * @private
 */
goog.async.Deferred.prototype.fire_ = function() {
  if (this.unhandledExceptionTimeoutId_ && this.hasFired() &&
      this.hasErrback_()) {
    // It is possible to add errbacks after the Deferred has fired. If a new
    // errback is added immediately after the Deferred encountered an unhandled
    // error, but before that error is rethrown, cancel the rethrow.
    goog.global.clearTimeout(this.unhandledExceptionTimeoutId_);
    delete this.unhandledExceptionTimeoutId_;
  }

  var res = this.result_;
  var unhandledException = false;
  var cb;

  while (this.chain_.length && this.paused_ == 0) {
    var chainEntry = this.chain_.shift();

    var callback = chainEntry[0];
    var errback = chainEntry[1];
    var scope = chainEntry[2];

    if (this.isError(res)) {
      this.hadError_ = true;
    }
    var f = this.hadError_ ? errback : callback;

    if (f) {
      try {
        var ret = f.call(scope || this.defaultScope_, res);

        // If no result, then use previous result.
        if (goog.isDef(ret)) {
          res = ret;
        }

        if (res instanceof goog.async.Deferred) {
          cb = goog.bind(this.continue_, this);
          this.pause_();
        }
        this.hadError_ = false;

      } catch (ex) {
        res = ex;
        this.hadError_ = true;

        if (!this.hasErrback_()) {
          // If an error is thrown with no additional errbacks in the queue,
          // prepare to rethrow the error.
          unhandledException = true;
        }
      }
    }
  }

  this.result_ = res;

  if (cb && this.paused_) {
    res.addBoth(cb);
    res.chained_ = true;
  }

  if (unhandledException) {
    // Rethrow the unhandled error after a timeout. Execution will continue, but
    // the error will be seen by global handlers and the user. The rethrow will
    // be canceled if another errback is appended before the timeout executes.
    this.unhandledExceptionTimeoutId_ = goog.global.setTimeout(function() {
      throw res;
    }, 0);
  }
};


/**
 * Creates a deferred that always succeeds.
 * @param {*} res The result.
 * @return {!goog.async.Deferred} The deferred object.
 */
goog.async.Deferred.succeed = function(res) {
  var d = new goog.async.Deferred();
  d.callback(res);
  return d;
};


/**
 * Creates a deferred that always fails.
 * @param {*} res The error result.
 * @return {!goog.async.Deferred} The deferred object.
 */
goog.async.Deferred.fail = function(res) {
  var d = new goog.async.Deferred();
  d.errback(res);
  return d;
};


/**
 * An error sub class that is used when a deferred has already been called.
 * @param {!goog.async.Deferred} deferred The deferred object.
 * @constructor
 * @extends {goog.debug.Error}
 */
goog.async.Deferred.AlreadyCalledError = function(deferred) {
  goog.debug.Error.call(this);

  /**
   * The deferred that raised this error.
   * @type {goog.async.Deferred}
   */
  this.deferred = deferred;
};
goog.inherits(goog.async.Deferred.AlreadyCalledError, goog.debug.Error);


/**
 * Message text.
 * @type {string}
 * @override
 */
goog.async.Deferred.AlreadyCalledError.prototype.message = 'Already called';



/**
 * An error sub class that is used when a deferred is cancelled.
 * @param {!goog.async.Deferred} deferred The deferred object.
 * @constructor
 * @extends {goog.debug.Error}
 */
goog.async.Deferred.CancelledError = function(deferred) {
  goog.debug.Error.call(this);

  /**
   * The deferred that raised this error.
   * @type {goog.async.Deferred}
   */
  this.deferred = deferred;
};
goog.inherits(goog.async.Deferred.CancelledError, goog.debug.Error);


/**
 * Message text.
 * @type {string}
 * @override
 */
goog.async.Deferred.CancelledError.prototype.message = 'Deferred was cancelled';
