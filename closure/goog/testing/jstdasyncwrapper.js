// Copyright 2016 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview A utility for wrapping a JSTD test object so that any test
 * methods are receive a queue that is compatible with JSTD but supports the
 * JsUnit async API of returning a promise in the test method.
 *
 * To convert a JSTD object call convertToAsyncTestObj on it and run with the
 * JsUnit test runner.
 */

goog.provide('goog.testing.JsTdAsyncWrapper');

goog.require('goog.Promise');



/**
 * Wraps an object's methods by passing in a Queue that is based on the JSTD
 * async API. The queue exposes a promise that resolves when the queue
 * completes. This promise can be used in JsUnit tests.
 * @param {!Object} original The original JSTD test object. The object should
 *     contain methods such as testXyz or setUp.
 * @return {!Object} A object that has all test methods wrapped in a fake
 *     testing queue.
 */
goog.testing.JsTdAsyncWrapper.convertToAsyncTestObj = function(original) {
  // Wraps a call to a test function and passes an instance of a fake queue
  // into the test function.
  var queueWrapperFn = function(fn) {
    return function() {
      var queue = new goog.testing.JsTdAsyncWrapper.Queue_(this);
      fn.call(this, queue);
      return queue.chain;
    };
  };

  var newTestObj = {};
  for (var prop in original) {
    // If this is a test or tearDown/setUp method wrap the method with a queue
    if (prop.indexOf('test') == 0 || prop == 'setUp' || prop == 'tearDown') {
      newTestObj[prop] = queueWrapperFn(original[prop]);
    } else {
      newTestObj[prop] = original[prop];
    }
  }
  return newTestObj;
};



/**
 * A queue that mirrors the JSTD Async Queue api but exposes a promise that
 * resolves once the queue is complete for compatibility with JsUnit.
 * @param {!Object} testObj The test object containing all test methods. This
 *     object is passed into queue callbacks as the "this" object.
 * @constructor
 * @private
 */
goog.testing.JsTdAsyncWrapper.Queue_ = function(testObj) {
  /**
   * The chain of testing step promises.
   * @type {!Promise<undefined>}
   */
  this.chain = Promise.resolve();

  /**
   * A delegate that is used within a defer call.
   * @private {?goog.testing.JsTdAsyncWrapper.Queue_}
   */
  this.delegate_ = null;

  /**
   * thisArg that should be used by default for addCallback function calls.
   * @private {!Object}
   */
  this.testObj_ = testObj;
};


/**
 * @param {string} stepName The name of the current testing step.
 * @param {function(!goog.testing.JsTdAsyncWrapper.Pool_=)} fn A function that
 * will be
 *     called.
 */
goog.testing.JsTdAsyncWrapper.Queue_.prototype.defer = function(stepName, fn) {
  // If another queue.defer is called within a pool callback it should be
  // executed after the current one. Any defer that is called within a defer
  // will be passed to a delegate and the current defer waits till all delegate
  // defer are resolved.
  if (this.delegate_) {
    this.delegate_.defer(stepName, fn);
    return;
  }
  this.chain =
      this.chain
          .then(goog.bind(
              function() {
                this.delegate_ =
                    new goog.testing.JsTdAsyncWrapper.Queue_(this.testObj_);
                var pool =
                    new goog.testing.JsTdAsyncWrapper.Pool_(this.testObj_);
                fn.call(this.testObj_, pool);
                return pool.poolComplete();
              },
              this))
          .then(goog.bind(function() { return this.delegate_.chain; }, this))
          .then(goog.bind(function() { this.delegate_ = null; }, this))
          .then(undefined, function(e) {
            e.message = 'In step ' + stepName + ', error: ' + e.message;
            throw e;
          });
};



/**
 * A fake pool that mimics the JSTD AsyncTestCase's pool object.
 * @param {!Object} testObj The test object containing all test methods. This
 *     object is passed into queue callbacks as the "this" object.
 * @constructor
 * @private
 */
goog.testing.JsTdAsyncWrapper.Pool_ = function(testObj) {

  /** @private {number} */
  this.outstandingCallbacks_ = 0;

  /** @private {!goog.promise.Resolver<undefined>} */
  this.poolComplete_ = goog.Promise.withResolver();

  /**
   * thisArg that should be used by default for defer function calls.
   * @private {!Object}
   */
  this.testObj_ = testObj;
};


/**
 * @return {function()}
 */
goog.testing.JsTdAsyncWrapper.Pool_.prototype.noop = function() {
  return this.addCallback(function() {});
};


/**
 * @param {function(...*):*} fn A function that should be wrapped in a callback.
 *     The pool will wait on all callbacks to be executed.
 * @return {function(...*):*}
 */
goog.testing.JsTdAsyncWrapper.Pool_.prototype.add = function(fn) {
  return this.addCallback(fn);
};


/**
 * @param {function(...*):*} fn The function to add to the pool.
 * @param {?number=} opt_n The number of permitted uses of the given callback;
 *     defaults to one.
 * @param {?number=} opt_timeout The timeout in milliseconds.
 *     This is not supported in the adapter for now. Specifying this argument
 *     will result in a test failure.
 * @param {?string=} opt_description The callback description.
 * @return {function()}
 */
goog.testing.JsTdAsyncWrapper.Pool_.prototype.addCallback = function(
    fn, opt_n, opt_timeout, opt_description) {
  // TODO(mtragut): This could be fixed if required by test cases.
  if (opt_timeout || opt_description) {
    throw Error(
        'Setting timeout or description in a pool callback is not supported.');
  }
  var numCallbacks = opt_n || 1;
  this.outstandingCallbacks_ = this.outstandingCallbacks_ + numCallbacks;
  return goog.bind(function() {
    try {
      fn.apply(this.testObj_, arguments);
    } catch (e) {
      if (opt_description) {
        e.message = opt_description + e.message;
      }
      this.poolComplete_.reject(e);
    }
    this.outstandingCallbacks_ = this.outstandingCallbacks_ - 1;
    if (this.outstandingCallbacks_ == 0) {
      this.poolComplete_.resolve();
    }
  }, this);
};


/**
 * @param {string} msg The message to print if the error callback gets called.
 * @return {function()}
 */
goog.testing.JsTdAsyncWrapper.Pool_.prototype.addErrback = function(msg) {
  return goog.bind(function() {
    var errorMsg = msg;
    if (arguments.length) {
      errorMsg += ' - Error callback called with params: ( ';
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        errorMsg += arg + ' ';
        if (arg instanceof Error) {
          errorMsg += '\n' + arg.stack + '\n';
        }
      }
      errorMsg += ')';
    }
    this.poolComplete_.reject(errorMsg);
  }, this);
};


/**
 * @return {!goog.Promise<undefined>} A promise that fires when all promise
 *     of the pool are fullfilled and rejects if any one promise rejects. Since
 *     new promises can be added during a the chain that leads the the initial
 *     "round" of completions remaining callbacks are processed recursively.
 */
goog.testing.JsTdAsyncWrapper.Pool_.prototype.poolComplete = function() {
  if (this.outstandingCallbacks_ == 0) {
    this.poolComplete_.resolve();
  }
  return this.poolComplete_.promise;
};
