/**
 * Copyright 2013 The Closure Library Authors. All Rights Reserved.
 * Author: malteubl@google.com (Malte Ubl)
 */

goog.module('goog.async.deferredAsyncTest');
goog.setTestOnly();
const Deferred = goog.require('goog.async.Deferred');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  shouldRunTests() {
    return !!Error.captureStackTrace;
  },

  testErrorStack() {
    var d;
    // Get the deferred from somewhere deep in the callstack.
    (function immediate() {
      (function immediate2() {
        d = new Deferred();
        d.addCallback(function actuallyThrows() {
          throw new Error('Foo');
        });
      })();
    })();

    window.setTimeout(function willThrow() {
      (function callbackCaller() {
        d.callback();
      })();
    }, 0);

    return d.then(fail, function(error) {
      assertContains('Foo', error.stack);
      assertContains('testErrorStack', error.stack);
      assertContains('callbackCaller', error.stack);
      assertContains('willThrow', error.stack);
      assertContains('actuallyThrows', error.stack);
      assertContains('DEFERRED OPERATION', error.stack);
      assertContains('immediate', error.stack);
      assertContains('immediate2', error.stack);
    });
  },


  testErrorStack_forErrback() {
    var d = new Deferred();

    window.setTimeout(function willThrow() {
      d.errback(new Error('Foo'));
    }, 0);

    return d.then(fail, function(error) {
      assertContains('Foo', error.stack);
      assertContains('testErrorStack_forErrback', error.stack);
      assertContains('willThrow', error.stack);
      assertContains('DEFERRED OPERATION', error.stack);
    });
  },

  testErrorStack_nested() {
    var d = new Deferred();

    window.setTimeout(function async1() {
      var nested = new Deferred();
      nested.addErrback(function nestedErrback(error) {
        d.errback(error);
      });
      window.setTimeout(function async2() {
        (function immediate() {
          nested.errback(new Error('Foo'));
        })();
      });
    }, 0);

    return d.then(fail, function(error) {
      assertContains('Foo', error.stack);
      assertContains('testErrorStack_nested', error.stack);
      assertContains('async1', error.stack);
      assertContains('async2', error.stack);
      assertContains('immediate', error.stack);
      assertContains('DEFERRED OPERATION', error.stack);
    });
  },

  testErrorStack_doesNotTouchCustomStack() {
    var d = new Deferred();
    d.addCallback(function actuallyThrows() {
      var e = new Error('Foo');
      e.stack = 'STACK';
      throw e;
    });

    window.setTimeout(function willThrow() {
      (function callbackCaller() {
        d.callback();
      })();
    }, 0);

    return d.then(fail, function(error) {
      assertEquals('STACK', error.stack);
    });
  },

  testFromPromiseWithDeferred() {
    var result;
    var p = new Deferred();
    var d = Deferred.fromPromise(p);
    d.addCallback(function(value) {
      result = value;
    });
    assertUndefined(result);
    p.callback('promise');
    return d.then(function() {
      assertEquals('promise', result);
    });
  },

  testFromPromiseWithNativePromise() {
    if (!Promise) {
      return;
    }
    var result;
    var p = new Promise(function(resolve) {
      resolve('promise');
    });
    var d = Deferred.fromPromise(p);
    d.addCallback(function(value) {
      result = value;
    });
    assertUndefined(result);
    return p.then(function() {
      assertEquals('promise', result);
    });
  }
});
