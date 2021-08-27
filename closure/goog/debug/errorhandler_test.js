/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.debug.ErrorHandlerTest');
goog.setTestOnly();

const DebugError = goog.require('goog.debug.Error');
const ErrorHandler = goog.require('goog.debug.ErrorHandler');
const MockControl = goog.require('goog.testing.MockControl');
const dispose = goog.require('goog.dispose');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

let errorHandler;
let mockControl;

let state = {};

/**
 * A function that throws errors.
 */
function errorThrower() {
  throw 'die die die';
}

/**
 * @suppress {strictMissingProperties} suppression added to enable type
 * checking
 */
function assertMethodCalledHelper(method, caught) {
  assertTrue('exception not thrown', Boolean(caught));
  assertTrue(
      'the re-thrown exception must be a DebugError',
      caught instanceof DebugError);
  assertEquals(
      'exception not caught by error handler', caught.cause, errorHandler.ex);
  assertTrue(
      `fake ${method} not called`, state.fake[method].getCallCount() >= 1);
  assertTrue(
      `"this" not passed to original ${method}`,
      state.fake[method].getLastCall().getThis() === state.real.window);
}

/**
 * @param {!Function} callback
 * @param {number} ignoredTime
 * @param {...*} args
 */
function callImmediately(callback, ignoredTime, ...args) {
  callback(...args);
}

testSuite({
  setUpPage() {
    state.real = {window, setTimeout, setInterval};
  },
  setUp() {
    state.fake = {};

    state.fake.setTimeout = recordFunction(callImmediately);
    state.real.window.setTimeout = state.fake.setTimeout;

    state.fake.setInterval = recordFunction(callImmediately);
    state.real.window.setInterval = state.fake.setInterval;

    state.fake.requestAnimationFrame = recordFunction(callImmediately);
    state.real.window.requestAnimationFrame = state.fake.requestAnimationFrame;

    mockControl = new MockControl();

    // On IE, globalEval happens async. So make it synchronous.
    goog.globalEval = (str) => {
      eval(str);
    };

    // just record the exception in the error handler when it happens
    errorHandler = new ErrorHandler(function(ex) {
      this.ex = ex;
    });
  },

  tearDown() {
    mockControl.$tearDown();
    dispose(errorHandler);
    errorHandler = null;
  },

  testWrapSetTimeout() {
    errorHandler.protectWindowSetTimeout();

    let caught;

    try {
      state.real.window.setTimeout(errorThrower, 3);
    } catch (ex) {
      caught = ex;
    }
    assertMethodCalledHelper('setTimeout', caught);
  },

  testWrapSetTimeoutWithoutException() {
    errorHandler.protectWindowSetTimeout();

    state.real.window.setTimeout((x, y) => {
      assertEquals('test', x);
      assertEquals(7, y);
    }, 3, 'test', 7);
  },

  testWrapSetTimeoutWithString() {
    errorHandler.protectWindowSetTimeout();

    let caught;

    try {
      state.real.window.setTimeout('badTimer()', 3);
    } catch (ex) {
      caught = ex;
    }
    assertMethodCalledHelper('setTimeout', caught);
  },

  testWrapSetInterval() {
    errorHandler.protectWindowSetInterval();

    let caught;

    try {
      state.real.window.setInterval(errorThrower, 3);
    } catch (ex) {
      caught = ex;
    }
    assertMethodCalledHelper('setInterval', caught);
  },

  testWrapSetIntervalWithoutException() {
    errorHandler.protectWindowSetInterval();

    state.real.window.setInterval((x, y) => {
      assertEquals('test', x);
      assertEquals(7, y);
    }, 3, 'test', 7);
  },

  testWrapSetIntervalWithString() {
    errorHandler.protectWindowSetInterval();

    let caught;

    try {
      state.real.window.setInterval('badTimer()', 3);
    } catch (ex) {
      caught = ex;
    }
    assertMethodCalledHelper('setInterval', caught);
  },

  testWrapRequestAnimationFrame() {
    errorHandler.protectWindowRequestAnimationFrame();

    let caught;
    try {
      state.real.window.requestAnimationFrame(errorThrower);
    } catch (ex) {
      caught = ex;
    }
    assertMethodCalledHelper('requestAnimationFrame', caught);
  },

  testDisposal() {
    errorHandler.protectWindowSetTimeout();
    errorHandler.protectWindowSetInterval();

    assertNotEquals(state.real.window.setTimeout, state.fake.setTimeout);
    assertNotEquals(state.real.window.setInterval, state.fake.setInterval);

    errorHandler.dispose();

    assertEquals(state.real.window.setTimeout, state.fake.setTimeout);
    assertEquals(state.real.window.setInterval, state.fake.setInterval);
  },

  testUnwrap() {
    const fn = () => {};
    const wrappedFn = errorHandler.wrap(fn);
    assertNotEquals(wrappedFn, fn);

    assertEquals(fn, errorHandler.unwrap(fn));
    assertEquals(fn, errorHandler.unwrap(wrappedFn));
  },

  testStackPreserved() {
    let e;
    let hasStacks;
    function specialFunctionName() {
      const e = Error();
      hasStacks = !!e.stack;
      throw e;
    }
    const wrappedFn = errorHandler.wrap(specialFunctionName);
    try {
      wrappedFn();
    } catch (exception) {
      e = exception;
    }
    assertTrue(!!e);
    if (hasStacks) {
      assertContains('specialFunctionName', e.stack);
    }
  },

  /**
     @suppress {strictMissingProperties} suppression added to enable type
     checking
   */
  testGetProtectedFunction() {
    const fn = () => {
      throw new Error('Foo');
    };
    /** @suppress {visibility} suppression added to enable type checking */
    const protectedFn = errorHandler.getProtectedFunction(fn);
    const e = assertThrows(protectedFn);
    assertTrue(e instanceof ErrorHandler.ProtectedFunctionError);
    assertEquals('Foo', e.cause.message);
  },

  /**
     @suppress {strictMissingProperties} suppression added to enable type
     checking
   */
  testGetProtectedFunctionNullError() {
    const fn = () => {
      throw null;
    };
    /** @suppress {visibility} suppression added to enable type checking */
    const protectedFn = errorHandler.getProtectedFunction(fn);
    const e = assertThrows(protectedFn);
    assertTrue(e instanceof ErrorHandler.ProtectedFunctionError);
    assertNull(e.cause);
  },

  testGetProtectedFunction_withoutWrappedErrors() {
    const shouldCallErrorLog = !!Error.captureStackTrace;
    if (shouldCallErrorLog) {
      mockControl.createMethodMock(globalThis.console, 'error');
    }
    errorHandler.setWrapErrors(false);
    const fn = () => {
      const e = new Error('Foo');
      e.stack = 'STACK';
      throw e;
    };
    /** @suppress {visibility} suppression added to enable type checking */
    const protectedFn = errorHandler.getProtectedFunction(fn);
    if (shouldCallErrorLog) {
      globalThis.console.error('Foo', 'STACK');
    }
    mockControl.$replayAll();
    const e = assertThrows(protectedFn);
    mockControl.$verifyAll();
    assertTrue(e instanceof Error);
    assertEquals('Foo', e.message);
    assertEquals(e.stack, 'STACK');
  },

  testGetProtectedFunction_withoutWrappedErrorsWithMessagePrefix() {
    errorHandler.setWrapErrors(false);
    errorHandler.setPrefixErrorMessages(true);
    const fn = () => {
      throw new Error('Foo');
    };
    /** @suppress {visibility} suppression added to enable type checking */
    let protectedFn = errorHandler.getProtectedFunction(fn);
    let e = assertThrows(protectedFn);
    assertTrue(e instanceof Error);
    assertEquals(
        ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX + 'Foo', e.message);

    const stringError = () => {
      throw 'String';
    };
    /** @suppress {visibility} suppression added to enable type checking */
    protectedFn = errorHandler.getProtectedFunction(stringError);
    e = assertThrows(protectedFn);
    assertEquals('string', typeof e);
    assertEquals(
        ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX + 'String', e);
  },

  testProtectedFunction_infiniteLoop() {
    let numErrors = 0;
    const errorHandler = new ErrorHandler((ex) => {
      numErrors++;
    });
    errorHandler.protectWindowSetTimeout();

    state.real.window.setTimeout(() => {
      state.real.window.setTimeout(errorThrower, 3);
    }, 3);
    assertEquals(
        'Error handler should only have been executed once.', 1, numErrors);
  },
});
