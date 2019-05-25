// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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
goog.module('goog.async.nextTickTest');
goog.setTestOnly();

const ErrorHandler = goog.require('goog.debug.ErrorHandler');
const GoogPromise = goog.require('goog.Promise');
const MockClock = goog.require('goog.testing.MockClock');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const TagName = goog.require('goog.dom.TagName');
const Timer = goog.require('goog.Timer');
const browser = goog.require('goog.labs.userAgent.browser');
const dom = goog.require('goog.dom');
const entryPointRegistry = goog.require('goog.debug.entryPointRegistry');
const nextTick = goog.require('goog.async.nextTick');
const testSuite = goog.require('goog.testing.testSuite');

let clock;
const propertyReplacer = new PropertyReplacer();

testSuite({
  setUp() {
    clock = null;
  },

  tearDown() {
    if (clock) {
      clock.uninstall();
    }
    // Unset the cached setImmediate_ behavior so it's re-evaluated for each
    // test.
    nextTick.setImmediate_ = undefined;
    propertyReplacer.reset();
  },

  testNextTick() {
    return new GoogPromise((resolve, reject) => {
      let c = 0;
      const max = 100;
      let async = true;
      const counterStep = (i) => {
        async = false;
        assertEquals('Order correct', i, c);
        c++;
        if (c === max) {
          resolve();
        }
      };
      for (let i = 0; i < max; i++) {
        nextTick(goog.partial(counterStep, i));
      }
      assertTrue(async);
    });
  },

  testNextTickSetImmediate() {
    return new GoogPromise((resolve, reject) => {
      let c = 0;
      const max = 100;
      let async = true;
      const counterStep = (i) => {
        async = false;
        assertEquals('Order correct', i, c);
        c++;
        if (c === max) {
          resolve();
        }
      };
      for (let i = 0; i < max; i++) {
        nextTick(
            goog.partial(counterStep, i), undefined,
            /* opt_useSetImmediate */ true);
      }
      assertTrue(async);
    });
  },

  testNextTickContext() {
    return new GoogPromise((resolve, reject) => {
      const context = {};
      let c = 0;
      const max = 10;
      let async = true;
      const counterStep = function(i) {
        async = false;
        assertEquals('Order correct', i, c);
        assertEquals(context, this);
        c++;
        if (c === max) {
          resolve();
        }
      };
      for (let i = 0; i < max; i++) {
        nextTick(goog.partial(counterStep, i), context);
      }
      assertTrue(async);
    });
  },

  testNextTickMockClock() {
    clock = new MockClock(true);
    let result = '';
    nextTick(() => {
      result += 'a';
    });
    nextTick(() => {
      result += 'b';
    });
    nextTick(() => {
      result += 'c';
    });
    assertEquals('', result);
    clock.tick(0);
    assertEquals('abc', result);
  },

  testNextTickDoesntSwallowError() {
    return new GoogPromise((resolve, reject) => {
      const sentinel = 'sentinel';

      propertyReplacer.replace(window, 'onerror', (e) => {
        e = '' + e;
        // Don't test for contents in IE7, which does not preserve the exception
        // message.
        if (e.indexOf('Exception thrown and not caught') == -1) {
          assertContains(sentinel, e);
        }
        resolve();
        return false;
      });

      nextTick(() => {
        throw sentinel;
      });
    });
  },

  testNextTickProtectEntryPoint() {
    return new GoogPromise((resolve, reject) => {
      let errorHandlerCallbackCalled = false;
      const errorHandler = new ErrorHandler(() => {
        errorHandlerCallbackCalled = true;
      });

      // MS Edge will always use goog.global.setImmediate, so ensure we get
      // to setImmediate_ here. See useSetImmediate_ implementation for details
      // on Edge special casing.
      propertyReplacer.set(nextTick, 'useSetImmediate_', () => false);

      // This is only testing wrapping the callback with the protected entry
      // point, so it's okay to replace this function with a fake.
      propertyReplacer.set(nextTick, 'setImmediate_', (cb) => {
        try {
          cb();
          fail('The callback should have thrown an error.');
        } catch (e) {
          assertTrue(errorHandlerCallbackCalled);
          assertTrue(e instanceof ErrorHandler.ProtectedFunctionError);
        } finally {
          // Restore setImmediate so it doesn't interfere with Promise behavior.
          propertyReplacer.reset();
        }
        resolve();
      });

      entryPointRegistry.monitorAll(errorHandler);
      nextTick(() => {
        throw new Error('This should be caught by the protected function.');
      });
    });
  },

  testNextTick_notStarvedBySetTimeout() {
    // This test will timeout when affected by
    // http://codeforhire.com/2013/09/21/setimmediate-and-messagechannel-broken-on-internet-explorer-10/
    // This test would fail without the fix introduced in cl/72472221
    // It keeps scheduling 0 timeouts and a single nextTick. If the nextTick
    // ever fires, the IE specific problem does not occur.
    let timeout;
    function busy() {
      timeout = setTimeout(() => {
        busy();
      }, 0);
    }
    busy();

    return new GoogPromise((resolve, reject) => {
      nextTick(() => {
        if (timeout) {
          clearTimeout(timeout);
        }
        resolve();
      });
    });
  },

  /**
   * Test a scenario in which the iframe used by the postMessage polyfill gets a
   * message that does not have match what is expected. In this case, the
   * polyfill should not try to invoke a callback (which would result in an
   * error because there would be no callbacks in the linked list).
   */
  testPostMessagePolyfillDoesNotPumpCallbackQueueIfMessageIsIncorrect() {
    // EDGE/IE does not use the postMessage polyfill.
    if (browser.isIE() || browser.isEdge()) {
      return;
    }

    // Force postMessage polyfill for setImmediate.
    propertyReplacer.set(window, 'setImmediate', undefined);
    propertyReplacer.set(window, 'MessageChannel', undefined);

    let callbackCalled = false;
    nextTick(() => {
      callbackCalled = true;
    });

    const frame = dom.getElementsByTagName(TagName.IFRAME)[0];
    frame.contentWindow.postMessage(
        'bogus message',
        window.location.protocol + '//' + window.location.host);

    let error = null;
    frame.contentWindow.onerror = (e) => {
      error = e;
    };
    return Timer.promise(3)
        .then(() => {
          assert('Callback should have been called.', callbackCalled);
          assertNull('An unexpected error was thrown.', error);
        })
        .thenAlways(() => {
          dom.removeNode(frame);
        });
  },

  testBehaviorOnPagesWithOverriddenWindowConstructor() {
    propertyReplacer.set(goog.global, 'Window', {});
    this.testNextTick();
    this.testNextTickSetImmediate();
    this.testNextTickMockClock();
  },
});
