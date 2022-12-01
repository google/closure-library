/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilites for creating and running console tasks which improve
 * stack traces of asynchronous code using the Async Stack Tagging API
 * (https://developer.chrome.com/docs/devtools/console/api/#createtask).
 */

goog.module('goog.debug.asyncStackTag');
goog.module.declareLegacyNamespace();

const {assertExists} = goog.require('goog.asserts');

/** @const {symbol|undefined} */
const CONSOLE_TASK_SYMBOL =
    'createTask' in console ? Symbol('consoleTask') : undefined;

/**
 * Utility to wrap the function to tag its stack at this point. If the function
 * has already been tagged, this does nothing.
 * @param {!T} fn
 * @param {string=} name
 * @return {!T}
 * @template T
 */
function wrap(fn, name = 'anonymous') {
  if (!goog.DEBUG || !('createTask' in console)) return fn;
  if (fn[assertExists(CONSOLE_TASK_SYMBOL)]) {
    return fn;
  }
  const consoleTask = console.createTask(fn.name || name);
  function wrappedFn(...args) {
    return consoleTask['run'](() => fn.call(/** @type {?} */ (this), ...args));
  }
  wrappedFn[assertExists(CONSOLE_TASK_SYMBOL)] = consoleTask;
  return wrappedFn;
}

exports = {
  wrap,
};