/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper class for recording the calls of a function.
 *
 * Example:
 * <pre>
 * var stubs = new goog.testing.PropertyReplacer();
 *
 * function tearDown() {
 *   stubs.reset();
 * }
 *
 * function testShuffle() {
 *   stubs.replace(Math, 'random', goog.testing.recordFunction(Math.random));
 *   var arr = shuffle([1, 2, 3, 4, 5]);
 *   assertSameElements([1, 2, 3, 4, 5], arr);
 *   assertEquals(4, Math.random.getCallCount());
 * }
 * </pre>
 */

goog.module('goog.testing.recordFunction');
goog.module.declareLegacyNamespace();
goog.setTestOnly('goog.testing.recordFunction');

const FunctionCall = goog.require('goog.testing.FunctionCall');
const GoogPromise = goog.require('goog.Promise');
const Resolver = goog.require('goog.promise.Resolver');
const functions = goog.require('goog.functions');
const {assertEquals} = goog.require('goog.testing.asserts');

/**
 * A function that represents the return type of recordFunction.
 * @param {...?} var_args
 * @return {?}
 */
function recordedFunctionType(var_args) {}

/**
 * @return {number} Total number of calls.
 */
recordedFunctionType.getCallCount = function() {};

/**
 * Asserts that the function was called a certain number of times.
 * @param {number|string} a The expected number of calls (1 arg) or debug
 *     message (2 args).
 * @param {number=} opt_b The expected number of calls (2 args only).
 */
recordedFunctionType.assertCallCount = function(a, opt_b) {};

/**
 * @return {!Array<!FunctionCall>} All calls of the recorded
 *     function.
 */
recordedFunctionType.getCalls = function() {};

/**
 * @return {?FunctionCall} Last call of the recorded function or
 *     null if it hasn't been called.
 */
recordedFunctionType.getLastCall = function() {};

/**
 * Returns and removes the last call of the recorded function.
 * @return {?FunctionCall} Last call of the recorded function or
 *     null if it hasn't been called.
 */
recordedFunctionType.popLastCall = function() {};

/**
 * Returns a GoogPromise that resolves when the recorded function has equal
 * to or greater than the number of calls.
 * @param {number} num
 * @return {!GoogPromise<undefined>}
 */
recordedFunctionType.waitForCalls = function(num) {};

/**
 * Resets the recorded function and removes all calls.
 * @return {void}
 */
recordedFunctionType.reset = function() {};

/**
 * Wraps the function into another one which calls the inner function and
 * records its calls. The recorded function will have 3 static methods:
 * `getCallCount`, `getCalls` and `getLastCall` but won't
 * inherit the original function's prototype and static fields.
 *
 * @param {!Function=} opt_f The function to wrap and record. Defaults to
 *     functions.UNDEFINED.
 * @return {!recordFunction.Type} The wrapped function.
 */
function recordFunction(opt_f) {
  const f = opt_f || functions.UNDEFINED;
  const calls = [];
  /** @type {?Resolver} */
  let waitForCallsResolver = null;
  /** @type {number} */
  let waitForCallsCount = 0;

  function maybeResolveWaitForCalls() {
    if (waitForCallsResolver && calls.length >= waitForCallsCount) {
      waitForCallsResolver.resolve();
      waitForCallsResolver = null;
      waitForCallsCount = 0;
    }
  }

  /** @type {!recordFunction.Type} */
  function recordedFunction() {
    const owner = /** @type {?} */ (this);
    try {
      const ret = f.apply(owner, arguments);
      calls.push(new FunctionCall(f, owner, arguments, ret, null));
      maybeResolveWaitForCalls();
      return ret;
    } catch (err) {
      calls.push(new FunctionCall(f, owner, arguments, undefined, err));
      maybeResolveWaitForCalls();
      throw err;
    }
  }

  /**
   * @return {number} Total number of calls.
   */
  recordedFunction.getCallCount = function() {
    return calls.length;
  };

  /**
   * Asserts that the function was called a certain number of times.
   * @param {number|string} a The expected number of calls (1 arg) or debug
   *     message (2 args).
   * @param {number=} opt_b The expected number of calls (2 args only).
   */
  recordedFunction.assertCallCount = function(a, opt_b) {
    const actual = calls.length;
    const expected = arguments.length == 1 ? a : opt_b;
    const message = arguments.length == 1 ? '' : ' ' + a;
    assertEquals(
        'Expected ' + expected + ' call(s), but was ' + actual + '.' + message,
        expected, actual);
  };

  /**
   * @return {!Array<!FunctionCall>} All calls of the recorded
   *     function.
   */
  recordedFunction.getCalls = function() {
    return calls;
  };


  /**
   * @return {?FunctionCall} Last call of the recorded function or
   *     null if it hasn't been called.
   */
  recordedFunction.getLastCall = function() {
    return calls[calls.length - 1] || null;
  };

  /**
   * Returns and removes the last call of the recorded function.
   * @return {?FunctionCall} Last call of the recorded function or
   *     null if it hasn't been called.
   */
  recordedFunction.popLastCall = function() {
    return calls.pop() || null;
  };

  /**
   * Returns a GoogPromise that resolves when the recorded function has equal
   * to or greater than the number of calls.
   * @param {number} num
   * @return {!GoogPromise<undefined>}
   */
  recordedFunction.waitForCalls = function(num) {
    waitForCallsCount = num;
    waitForCallsResolver = GoogPromise.withResolver();
    const promise = waitForCallsResolver.promise;
    maybeResolveWaitForCalls();
    return promise;
  };

  /**
   * Resets the recorded function and removes all calls.
   */
  recordedFunction.reset = function() {
    calls.length = 0;
    waitForCallsResolver = null;
    waitForCallsCount = 0;
  };

  return recordedFunction;
}

/** @typedef {typeof recordedFunctionType} */
recordFunction.Type;

exports = recordFunction;
