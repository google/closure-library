// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.debug.ErrorHandlerTest');
goog.setTestOnly();

const ErrorHandler = goog.require('goog.debug.ErrorHandler');
const MockControl = goog.require('goog.testing.MockControl');
const testSuite = goog.require('goog.testing.testSuite');

let oldGetObjectByName;

// provide our own window that implements our instrumented and
// immediate-call versions of setTimeout and setInterval
let fakeWin = {};

let errorHandler;
let mockControl;

function badTimer() {
  arguments.callee.called = true;
  throw 'die die die';
}

function assertSetTimeoutError(caught) {
  assertMethodCalledHelper('setTimeout', caught);
}

function assertSetIntervalError(caught) {
  assertMethodCalledHelper('setInterval', caught);
}

function assertRequestAnimationFrameError(caught) {
  assertMethodCalledHelper('requestAnimationFrame', caught);
}

function assertMethodCalledHelper(method, caught) {
  assertTrue('exception not thrown', !!caught);
  assertEquals(
      'exception not caught by error handler', caught.cause, errorHandler.ex);
  assertTrue(`fake ${method} not called`, !!fakeWin[method].called);
  assertTrue(
      `"this" not passed to original ${method}`,
      fakeWin[method].that === fakeWin);
}

testSuite({
  setUp() {
    mockControl = new MockControl();
    // On IE, globalEval happens async. So make it synchronous.
    goog.globalEval = (str) => {
      eval(str);
    };

    oldGetObjectByName = goog.getObjectByName;
    goog.getObjectByName = (name) => {
      if (name == 'window') {
        return fakeWin;
      } else {
        return oldGetObjectByName(name);
      }
    };

    fakeWin.setTimeout = function(fn, time) {
      fakeWin.setTimeout.called = true;
      fakeWin.setTimeout.that = this;
      if (goog.isString(fn)) {
        eval(fn);
      } else {
        fn.apply(this, Array.prototype.slice.call(arguments, 2));
      }
    };

    fakeWin.setInterval = function(fn, time) {
      fakeWin.setInterval.called = true;
      fakeWin.setInterval.that = this;
      if (goog.isString(fn)) {
        eval(fn);
      } else {
        fn.apply(this, Array.prototype.slice.call(arguments, 2));
      }
    };

    fakeWin.requestAnimationFrame = function(fn) {
      fakeWin.requestAnimationFrame.called = true;
      fakeWin.requestAnimationFrame.that = this;
      fn();
    };

    // just record the exception in the error handler when it happens
    errorHandler = new ErrorHandler(function(ex) {
      this.ex = ex;
    });
  },

  tearDown() {
    mockControl.$tearDown();
    goog.dispose(errorHandler);
    errorHandler = null;

    goog.getObjectByName = oldGetObjectByName;

    delete badTimer['__protected__'];
  },

  testWrapSetTimeout() {
    errorHandler.protectWindowSetTimeout();

    let caught;

    try {
      fakeWin.setTimeout(badTimer, 3);
    } catch (ex) {
      caught = ex;
    }
    assertSetTimeoutError(caught);
  },

  testWrapSetTimeoutWithoutException() {
    errorHandler.protectWindowSetTimeout();

    fakeWin.setTimeout((x, y) => {
      assertEquals('test', x);
      assertEquals(7, y);
    }, 3, 'test', 7);
  },

  testWrapSetTimeoutWithString() {
    errorHandler.protectWindowSetTimeout();

    let caught;

    try {
      fakeWin.setTimeout('badTimer()', 3);
    } catch (ex) {
      caught = ex;
    }
    assertSetTimeoutError(caught);
  },

  testWrapSetInterval() {
    errorHandler.protectWindowSetInterval();

    let caught;

    try {
      fakeWin.setInterval(badTimer, 3);
    } catch (ex) {
      caught = ex;
    }
    assertSetIntervalError(caught);
  },

  testWrapSetIntervalWithoutException() {
    errorHandler.protectWindowSetInterval();

    fakeWin.setInterval((x, y) => {
      assertEquals('test', x);
      assertEquals(7, y);
    }, 3, 'test', 7);
  },

  testWrapSetIntervalWithString() {
    errorHandler.protectWindowSetInterval();

    let caught;

    try {
      fakeWin.setInterval('badTimer()', 3);
    } catch (ex) {
      caught = ex;
    }
    assertSetIntervalError(caught);
  },

  testWrapRequestAnimationFrame() {
    errorHandler.protectWindowRequestAnimationFrame();

    let caught;
    try {
      fakeWin.requestAnimationFrame(badTimer);
    } catch (ex) {
      caught = ex;
    }
    assertRequestAnimationFrameError(caught);
  },

  testDisposal() {
    fakeWin = goog.getObjectByName('window');
    const originalSetTimeout = fakeWin.setTimeout;
    const originalSetInterval = fakeWin.setInterval;

    errorHandler.protectWindowSetTimeout();
    errorHandler.protectWindowSetInterval();

    assertNotEquals(originalSetTimeout, fakeWin.setTimeout);
    assertNotEquals(originalSetInterval, fakeWin.setInterval);

    errorHandler.dispose();

    assertEquals(originalSetTimeout, fakeWin.setTimeout);
    assertEquals(originalSetInterval, fakeWin.setInterval);
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

  testGetProtectedFunction() {
    const fn = () => {
      throw new Error('Foo');
    };
    const protectedFn = errorHandler.getProtectedFunction(fn);
    const e = assertThrows(protectedFn);
    assertTrue(e instanceof ErrorHandler.ProtectedFunctionError);
    assertEquals('Foo', e.cause.message);
  },

  testGetProtectedFunctionNullError() {
    const fn = () => {
      throw null;
    };
    const protectedFn = errorHandler.getProtectedFunction(fn);
    const e = assertThrows(protectedFn);
    assertTrue(e instanceof ErrorHandler.ProtectedFunctionError);
    assertNull(e.cause);
  },

  testGetProtectedFunction_withoutWrappedErrors() {
    const shouldCallErrorLog = !!Error.captureStackTrace;
    if (shouldCallErrorLog) {
      mockControl.createMethodMock(goog.global.console, 'error');
    }
    errorHandler.setWrapErrors(false);
    const fn = () => {
      const e = new Error('Foo');
      e.stack = 'STACK';
      throw e;
    };
    const protectedFn = errorHandler.getProtectedFunction(fn);
    if (shouldCallErrorLog) {
      goog.global.console.error('Foo', 'STACK');
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
    let protectedFn = errorHandler.getProtectedFunction(fn);
    let e = assertThrows(protectedFn);
    assertTrue(e instanceof Error);
    assertEquals(
        ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX + 'Foo', e.message);

    const stringError = () => {
      throw 'String';
    };
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

    fakeWin.setTimeout(() => {
      fakeWin.setTimeout(badTimer, 3);
    }, 3);
    assertEquals(
        'Error handler should only have been executed once.', 1, numErrors);
  },
});
