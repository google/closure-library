/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.testing.MockClockTest');
goog.setTestOnly();

const GoogPromise = goog.require('goog.Promise');
const MockClock = goog.require('goog.testing.MockClock');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const Timer = goog.require('goog.Timer');
const array = goog.require('goog.array');
const events = goog.require('goog.events');
const functions = goog.require('goog.functions');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

const stubs = new PropertyReplacer();

/**
 * Waits using native promises.
 *
 * @param {number} ms
 * @return {!Promise<void>} Resolves after ms
 */
function waitFor(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Waits using GoogPromise.
 *
 * @param {number} ms
 * @return {!GoogPromise<void>} Resolves after ms
 */
function googWaitFor(ms) {
  return new GoogPromise(resolve => {
    setTimeout(resolve, ms);
  });
}

testSuite({
  tearDown() {
    stubs.reset();
  },

  testAsyncSupport: {
    setUp() {
      this.clock = new MockClock(true);
    },

    tearDown() {
      this.clock.uninstall();
    },

    async testInterleavedGoogPromiseCallbacks() {
      const result = [];

      await GoogPromise.resolve(null);
      result.push(1);

      setTimeout(() => result.push(3), 5);
      result.push(2);
      await this.clock.tickAsync(6);
      result.push(4);

      const promise = GoogPromise.resolve(null)
                          .then(() => Timer.promise(5))
                          .then(() => result.push(5))
                          .then(() => Timer.promise(5));

      await this.clock.tickAsync(11);
      await promise;
      result.push(6);

      assertArrayEquals([1, 2, 3, 4, 5, 6], result);
    },

    async testTimerInNativePromise() {
      const result = [];
      const promise = Promise.resolve()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then(() => Timer.promise(5))
                          .then(() => result.push(1))
                          .then(() => waitFor(5));

      await this.clock.tickAsync(11);
      await promise;
      result.push(2);

      assertArrayEquals([1, 2], result);
    },

    async testInterleavedNativePromiseCallbacks() {
      function waitFor(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      const result = [];

      await Promise.resolve();
      result.push(1);

      setTimeout(() => result.push(3), 5);
      result.push(2);
      await this.clock.tickAsync(6);
      result.push(4);

      const promise = Timer.promise(5)
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then(() => result.push(5))
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then(() => waitFor(5))
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then()
                          .then(() => result.push(6));

      await this.clock.tickAsync(11);
      await promise;
      result.push(7);

      assertArrayEquals([1, 2, 3, 4, 5, 6, 7], result);
    },

    async testSequenceOfTimeouts() {
      const result = [];

      async function runAsyncCode() {
        for (var i = 0; i < 30; i += 3) {
          result.push(i);
          await waitFor(10);
          result.push(i + 1);
          await Timer.promise(10);
          result.push(i + 2);
        }
      }

      runAsyncCode();
      await this.clock.tickAsync(600);

      assertArrayEquals(array.range(30), result);
    },
  },

  testAsyncMockClock: {
    setUp() {
      this.clock = new MockClock({autoInstall: true});
    },

    tearDown() {
      this.clock.dispose();
    },

    async testInteroperability() {
      // This test ensures that a mix of async and synchronous MockClocks work
      // as expected with Promises and GoogPromises.
      const out = [];
      await this.clock.tickAndResolve(
          100, waitFor(100).then(() => out.push(1)));
      assertArrayEquals(out, [1]);

      await this.clock.tickAndResolve(
          100, googWaitFor(100).then(() => out.push(2)));
      assertArrayEquals(out, [1, 2]);
      this.clock.uninstall();

      // Verify that Synchronous MockClock changes GoogPromise behavior when
      // installed after async MockClock.
      const syncClock = new MockClock(true);
      // Synchronous MockClock executes googPromise.then synchronously. The
      // googWaitFor executor and chained promise should execute when syncClock
      // is ticked.
      const promise3 = googWaitFor(100).then(() => out.push(3));

      assertArrayEquals(out, [1, 2]);
      syncClock.tick(100);
      assertArrayEquals(out, [1, 2, 3]);

      // Synchronous MockClock does not synchronously resolve native Promises.
      // Although the waitFor executor will run when syncClock is ticked, the
      // chained promise will not execute until the next await.
      waitFor(0).then(() => out.push(4));
      syncClock.tick();

      // The chained `then` is never executed because synchronous MockClock
      // resets the work queue when uninstalled.
      promise3.then(() => out.push(-1));
      syncClock.uninstall();

      // Chained promise callback is executed after next await.
      await Promise.resolve();
      assertArrayEquals(out, [1, 2, 3, 4]);

      // Verify that async MockClock still works as expected after the
      // synchronous MockClock was uninstalled.
      this.clock.install();
      await this.clock.tickAndResolve(
          100, waitFor(100).then(() => out.push(5)));
      assertArrayEquals(out, [1, 2, 3, 4, 5]);

      // Async MockClock executes GoogPromise asynchronously. It should not
      // resolve until awaited.
      const promise6 =
          this.clock.tickAndResolve(100, googWaitFor(100).then(() => {
            out.push(6);
          }));
      assertArrayEquals(out, [1, 2, 3, 4, 5]);
      await promise6;
      assertArrayEquals(out, [1, 2, 3, 4, 5, 6]);
    },

    async testTickAndResolveGoogPromiseRejectsValue() {
      const promise = googWaitFor(100).then(() => {throw new Error('reject')});
      const error =
          await assertRejects(this.clock.tickAndResolve(101, promise));
      assertEquals(error.message, 'reject');
    },

    async testTickAndResolveGoogPromiseReturnsValue() {
      const promise = googWaitFor(100).then(() => 'value');
      const result = await this.clock.tickAndResolve(100, promise);
      assertEquals(result, 'value');
    },

    async testTickAndResolvePromiseRejectsValue() {
      const promise = waitFor(100).then(() => {throw new Error('reject')});
      const error =
          await assertRejects(this.clock.tickAndResolve(100, promise));
      assertEquals(error.message, 'reject');
    },

    async testTickAndResolvePromiseReturnsValue() {
      const promise = waitFor(100).then(() => 'value');
      const result = await this.clock.tickAndResolve(100, promise);
      assertEquals(result, 'value');
    },

    async testTickAndResolveThrowsIfUnresolved() {
      const error =
          await assertRejects(this.clock.tickAndResolve(50, waitFor(100)));
      assertEquals(
          'Promise was expected to be resolved after mock clock tick.',
          error.message);
    },

    async testTickThrows() {
      assertThrows(
          'Async MockClock does not support tick. Use tickAsync() instead.',
          () => this.clock.tick());
    },

    async testTickPromiseThrows() {
      assertThrows(
          'Async MockClock does not support tickPromise. ' +
              'Use tickAndResolve(millis, promise) instead.',
          () => this.clock.tickPromise(waitFor(100), 100));
    }
  },

  testTimeWarp: {
    async testSetsTime() {
      const clock = new MockClock(true);

      const newDate = new Date(2121, 12, 12);

      // Schedule an callback in the interval and make sure it sees the new date
      setTimeout(() => assertEquals(+newDate, Date.now()), 999999);

      await clock.doTimeWarpAsync(newDate);
      assertEquals(+newDate, Date.now());
    },

    async testSkipsSetIntervals() {
      const clock = new MockClock(true);

      const fn = recordFunction();
      setInterval(fn, 7);
      await clock.doTimeWarpAsync(new Date(2121, 12, 12));

      assertEquals(1, fn.getCallCount());
      // Expect the interval to continue in future ticks.
      clock.tick(7);
      assertEquals(2, fn.getCallCount());
    },

    async testSkipsRecursiveSetTimeouts() {
      const clock = new MockClock(true);

      const fn = recordFunction(() => setTimeout(fn, 7));
      setTimeout(fn, 7);
      await clock.doTimeWarpAsync(new Date(2121, 12, 12));

      assertEquals(1, fn.getCallCount());
      // Expect the timeout to continue in future ticks.
      clock.tick(7);
      assertEquals(2, fn.getCallCount());
    },
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testMockClockWasInstalled() {
    const clock = new MockClock();
    const originalTimeout = window.setTimeout;
    clock.install();
    assertNotEquals(window.setTimeout, originalTimeout);
    setTimeout(() => {}, 100);
    assertEquals(1, clock.getTimeoutsMade());
    setInterval(() => {}, 200);
    assertEquals(2, clock.getTimeoutsMade());
    clock.uninstall();
    assertEquals(window.setTimeout, originalTimeout);
    assertNull(clock.replacer_);
  },

  testSetTimeoutAndTick() {
    const clock = new MockClock(true);
    let m10 = false;
    let m15 = false;
    let m20 = false;
    let m5 = false;

    setTimeout(() => {
      m5 = true;
    }, 5);
    setTimeout(() => {
      m10 = true;
    }, 10);
    setTimeout(() => {
      m15 = true;
    }, 15);
    setTimeout(() => {
      m20 = true;
    }, 20);
    assertEquals(4, clock.getTimeoutsMade());

    assertEquals(4, clock.tick(4));
    assertEquals(4, clock.getCurrentTime());
    assertEquals(0, clock.getCallbacksTriggered());

    assertFalse(m5);
    assertFalse(m10);
    assertFalse(m15);
    assertFalse(m20);

    assertEquals(5, clock.tick(1));
    assertEquals(5, clock.getCurrentTime());
    assertEquals(1, clock.getCallbacksTriggered());

    assertTrue('m5 should now be true', m5);
    assertFalse(m10);
    assertFalse(m15);
    assertFalse(m20);

    assertEquals(10, clock.tick(5));
    assertEquals(10, clock.getCurrentTime());
    assertEquals(2, clock.getCallbacksTriggered());

    assertTrue('m5 should be true', m5);
    assertTrue('m10 should now be true', m10);
    assertFalse(m15);
    assertFalse(m20);

    assertEquals(15, clock.tick(5));
    assertEquals(15, clock.getCurrentTime());
    assertEquals(3, clock.getCallbacksTriggered());

    assertTrue('m5 should be true', m5);
    assertTrue('m10 should be true', m10);
    assertTrue('m15 should now be true', m15);
    assertFalse(m20);

    assertEquals(20, clock.tick(5));
    assertEquals(20, clock.getCurrentTime());
    assertEquals(4, clock.getCallbacksTriggered());

    assertTrue('m5 should be true', m5);
    assertTrue('m10 should be true', m10);
    assertTrue('m15 should be true', m15);
    assertTrue('m20 should now be true', m20);

    clock.uninstall();
  },

  testSetImmediateAndTick() {
    const clock = new MockClock(true);
    let tick0 = false;
    let tick1 = false;
    setImmediate(() => {
      tick0 = true;
    });
    setImmediate(() => {
      tick1 = true;
    });
    assertEquals(2, clock.getTimeoutsMade());
    assertEquals(0, clock.getCallbacksTriggered());

    clock.tick(0);
    assertEquals(2, clock.getCallbacksTriggered());
    assertTrue(tick0);
    assertTrue(tick1);

    clock.uninstall();
  },

  testSetInterval() {
    const clock = new MockClock(true);
    let times = 0;
    setInterval(() => {
      times++;
    }, 100);

    clock.tick(500);
    assertEquals(5, clock.getCallbacksTriggered());
    assertEquals(5, times);
    clock.tick(100);
    assertEquals(6, clock.getCallbacksTriggered());
    assertEquals(6, times);
    clock.tick(100);
    assertEquals(7, clock.getCallbacksTriggered());
    assertEquals(7, times);
    clock.tick(50);
    assertEquals(7, clock.getCallbacksTriggered());
    assertEquals(7, times);
    clock.tick(50);
    assertEquals(8, clock.getCallbacksTriggered());
    assertEquals(8, times);

    clock.uninstall();
  },

  testRequestAnimationFrame() {
    globalThis.requestAnimationFrame = () => {};
    const clock = new MockClock(true);
    const times = [];
    const recFunc = recordFunction((now) => {
      times.push(now);
    });
    globalThis.requestAnimationFrame(recFunc);
    clock.tick(50);
    assertEquals(1, clock.getCallbacksTriggered());
    assertEquals(1, recFunc.getCallCount());
    assertEquals(20, times[0]);

    globalThis.requestAnimationFrame(recFunc);
    clock.tick(100);
    assertEquals(2, clock.getCallbacksTriggered());
    assertEquals(2, recFunc.getCallCount());
    assertEquals(70, times[1]);

    clock.uninstall();
  },

  testClearTimeout() {
    const clock = new MockClock(true);
    let ran = false;
    const c = setTimeout(() => {
      ran = true;
    }, 100);
    clock.tick(50);
    assertFalse(ran);
    clearTimeout(c);
    clock.tick(100);
    assertFalse(ran);
    clock.uninstall();
  },

  testClearInterval() {
    const clock = new MockClock(true);
    let times = 0;
    const c = setInterval(() => {
      times++;
    }, 100);

    clock.tick(500);
    assertEquals(5, times);
    clock.tick(100);
    assertEquals(6, times);
    clock.tick(100);
    clearInterval(c);
    assertEquals(7, times);
    clock.tick(50);
    assertEquals(7, times);
    clock.tick(50);
    assertEquals(7, times);

    clock.uninstall();
  },

  testClearInterval2() {
    // Tests that we can clear the interval from inside the function
    const clock = new MockClock(true);
    let times = 0;
    const c = setInterval(() => {
      times++;
      if (times == 6) {
        clearInterval(c);
      }
    }, 100);

    clock.tick(500);
    assertEquals(5, times);
    clock.tick(100);
    assertEquals(6, times);
    clock.tick(100);
    assertEquals(6, times);
    clock.tick(50);
    assertEquals(6, times);
    clock.tick(50);
    assertEquals(6, times);

    clock.uninstall();
  },

  testCancelRequestAnimationFrame() {
    globalThis.requestAnimationFrame = () => {};
    globalThis.cancelRequestAnimationFrame = () => {};
    const clock = new MockClock(true);
    let ran = false;
    const c = globalThis.requestAnimationFrame(() => {
      ran = true;
    });
    clock.tick(10);
    assertFalse(ran);
    globalThis.cancelRequestAnimationFrame(c);
    clock.tick(20);
    assertFalse(ran);
    clock.uninstall();
  },

  testMockGoogNow() {
    assertNotEquals(0, goog.now());
    const clock = new MockClock(true);
    assertEquals(0, goog.now());
    clock.tick(50);
    assertEquals(50, goog.now());
    clock.uninstall();
    assertNotEquals(50, goog.now());
  },

  testMockDateNow() {
    assertNotEquals(0, Date.now());
    const clock = new MockClock(true);
    assertEquals(0, Date.now());
    clock.tick(50);
    assertEquals(50, Date.now());
    clock.uninstall();
    assertNotEquals(50, Date.now());
  },

  testMockDateNow_unmockDateNow_autoInstall() {
    assertNotEquals(0, Date.now());
    const clock = new MockClock(true);
    clock.unmockDateNow();
    assertNotEquals(0, Date.now());
    clock.uninstall();
    assertNotEquals(0, Date.now());
  },

  testMockDateNow_unmockDateNow_manualInstall() {
    assertNotEquals(0, Date.now());
    const clock = new MockClock();
    clock.unmockDateNow();
    clock.install();
    assertNotEquals(0, Date.now());
    clock.uninstall();
    assertNotEquals(0, Date.now());
  },

  testTimeoutDelay() {
    const clock = new MockClock(true);
    let m10 = false;
    let m20 = false;
    let m5 = false;

    setTimeout(() => {
      m5 = true;
    }, 5);
    setTimeout(() => {
      m10 = true;
    }, 10);
    setTimeout(() => {
      m20 = true;
    }, 20);

    // Fire 3ms early, so m5 fires at t=2
    clock.setTimeoutDelay(-3);
    clock.tick(1);
    assertFalse(m5);
    assertFalse(m10);
    clock.tick(1);
    assertTrue(m5);
    assertFalse(m10);

    // Fire 3ms late, so m10 fires at t=13
    clock.setTimeoutDelay(3);
    assertEquals(12, clock.tick(10));
    assertEquals(12, clock.getCurrentTime());
    assertFalse(m10);
    clock.tick(1);
    assertTrue(m10);
    assertFalse(m20);

    // Fire 10ms early, so m20 fires now, since it's after t=10
    clock.setTimeoutDelay(-10);
    assertFalse(m20);
    assertEquals(14, clock.tick(1));
    assertEquals(14, clock.getCurrentTime());
    assertTrue(m20);

    clock.uninstall();
  },

  testTimerCallbackCanCreateIntermediateTimer() {
    const clock = new MockClock(true);
    const sequence = [];

    // Create 3 timers: 1, 2, and 3.  Timer 1 should fire at T=1, timer 2 at
    // T=2, and timer 3 at T=3.  The catch: Timer 2 is created by the
    // callback within timer 0.

    // Testing method: Create a simple string sequencing each timer and at
    // what time it fired.

    setTimeout(() => {
      sequence.push('timer1 at T=' + goog.now());
      setTimeout(() => {
        sequence.push('timer2 at T=' + goog.now());
      }, 1);
    }, 1);

    setTimeout(() => {
      sequence.push('timer3 at T=' + goog.now());
    }, 3);

    clock.tick(4);

    assertEquals(
        'Each timer should fire in sequence at the correct time.',
        'timer1 at T=1, timer2 at T=2, timer3 at T=3', sequence.join(', '));

    clock.uninstall();
  },

  testCorrectArgumentsPassedToCallback() {
    const clock = new MockClock(true);
    let timeoutId;
    let timeoutExecuted = false;

    timeoutId = setTimeout(function(arg) {
      assertEquals('"this" must be globalThis', globalThis, this);
      assertEquals(
          'The timeout ID must be the first parameter', timeoutId, arg);
      assertEquals('Exactly one argument must be passed', 1, arguments.length);
      timeoutExecuted = true;
    }, 1);

    clock.tick(4);

    assertTrue('The timeout was not executed', timeoutExecuted);

    clock.uninstall();
  },

  testTickZero() {
    const clock = new MockClock(true);
    let calls = 0;

    setTimeout(() => {
      assertEquals('I need to be first', 0, calls);
      calls++;
    }, 0);

    setTimeout(() => {
      assertEquals('I need to be second', 1, calls);
      calls++;
    }, 0);

    clock.tick(0);
    assertEquals(2, calls);

    setTimeout(() => {
      assertEquals('I need to be third', 2, calls);
      calls++;
    }, 0);

    clock.tick(0);
    assertEquals(3, calls);

    assertEquals('Time should still be zero', 0, goog.now());

    clock.uninstall();
  },

  testReset() {
    const clock = new MockClock(true);

    const id = setTimeout(() => {
      fail('Timeouts should be cleared after a reset');
    }, 0);

    clock.reset();
    clock.tick(999999);

    let calls = 0;
    setTimeout(() => {
      calls++;
    }, 10);
    clearTimeout(id);
    clock.tick(100);
    assertEquals(
        'New timeout should still run after clearing from before reset', 1,
        calls);

    clock.uninstall();
  },

  testNewClockWithOldTimeoutId() {
    let clock = new MockClock(true);

    const id = setTimeout(() => {
      fail('Timeouts should be cleared after uninstall');
    }, 0);

    clock.uninstall();
    clock = new MockClock(true);

    let calls = 0;
    setTimeout(() => {
      calls++;
    }, 10);
    clearTimeout(id);
    clock.tick(100);
    assertEquals(
        'Timeout should still run after cancelling from old clock', 1, calls);
    clock.uninstall();
  },

  /**
     @suppress {visibility,checkTypes} suppression added to enable type
     checking
   */
  testQueueInsertionHelper() {
    const queue = [];

    function queueToString() {
      const buffer = [];
      for (let i = 0; i < queue.length; i++) {
        buffer.push(queue[i].runAtMillis);
      }
      return buffer.join(',');
    }

    MockClock.insert_({runAtMillis: 2}, queue);
    assertEquals('Only item', '2', queueToString());

    MockClock.insert_({runAtMillis: 4}, queue);
    assertEquals('Biggest item', '4,2', queueToString());

    MockClock.insert_({runAtMillis: 5}, queue);
    assertEquals('An even bigger item', '5,4,2', queueToString());

    MockClock.insert_({runAtMillis: 1}, queue);
    assertEquals('Smallest item', '5,4,2,1', queueToString());

    MockClock.insert_({runAtMillis: 1, dup: true}, queue);
    assertEquals('Duplicate smallest item', '5,4,2,1,1', queueToString());
    assertTrue('Duplicate item comes at a smaller index', queue[3].dup);

    MockClock.insert_({runAtMillis: 3}, queue);
    MockClock.insert_({runAtMillis: 3, dup: true}, queue);
    assertEquals('Duplicate a middle item', '5,4,3,3,2,1,1', queueToString());
    assertTrue('Duplicate item comes at a smaller index', queue[2].dup);
  },

  testIsTimeoutSet() {
    const clock = new MockClock(true);
    const timeoutKey = setTimeout(() => {}, 1);
    assertTrue(
        `Timeout ${timeoutKey} should be set`, clock.isTimeoutSet(timeoutKey));
    const nextTimeoutKey = timeoutKey + 1;
    assertFalse(
        `Timeout ${nextTimeoutKey} should not be set`,
        clock.isTimeoutSet(nextTimeoutKey));
    clearTimeout(timeoutKey);
    assertFalse(
        `Timeout ${timeoutKey} should no longer be set`,
        clock.isTimeoutSet(timeoutKey));
    const newTimeoutKey = setTimeout(() => {}, 1);
    clock.tick(5);
    assertFalse(
        `Timeout ${timeoutKey} should not be set`,
        clock.isTimeoutSet(timeoutKey));
    assertTrue(
        `Timeout ${newTimeoutKey} should be set`,
        clock.isTimeoutSet(newTimeoutKey));
    clock.uninstall();
  },

  testBalksOnTimeoutsGreaterThanMaxInt() {
    // Browsers have trouble with timeout greater than max int, so we
    // want Mock Clock to fail if this happens.
    const clock = new MockClock(true);
    // Functions on window don't seem to be able to throw exceptions in
    // IE6.  Explicitly reading the property makes it work.
    const setTimeout = window.setTimeout;
    assertThrows('Timeouts > MAX_INT should fail', () => {
      setTimeout(goog.nullFunction, 2147483648);
    });
    assertThrows('Timeouts much greater than MAX_INT should fail', () => {
      setTimeout(goog.nullFunction, 2147483648 * 10);
    });
    clock.uninstall();
  },

  testCorrectSetTimeoutIsRestored() {
    const safe = functions.error('should not have been called');
    stubs.set(window, 'setTimeout', safe);

    const clock = new MockClock(true);
    assertNotEquals('setTimeout is replaced', safe, window.setTimeout);
    clock.uninstall();
    // NOTE: If this assertion proves to be flaky in IE, the string value of
    // the two functions have to be compared as described in
    // goog.testing.TestCase#finalize.
    assertEquals('setTimeout is restored', safe, window.setTimeout);
  },

  testMozRequestAnimationFrame() {
    // Setting this function will indirectly tell the mock clock to mock it out.
    stubs.set(window, 'mozRequestAnimationFrame', goog.nullFunction);

    const clock = new MockClock(true);

    const mozBeforePaint = recordFunction();
    events.listen(window, 'MozBeforePaint', mozBeforePaint);

    window.mozRequestAnimationFrame(null);
    assertEquals(0, mozBeforePaint.getCallCount());

    clock.tick(MockClock.REQUEST_ANIMATION_FRAME_TIMEOUT);
    assertEquals(1, mozBeforePaint.getCallCount());
    clock.dispose();
  },

  testClearBeforeSet() {
    const clock = new MockClock(true);
    const expectedId = MockClock.nextId;
    window.clearTimeout(expectedId);

    const fn = recordFunction();
    const actualId = window.setTimeout(fn, 0);
    assertEquals(
        'In order for this test to work, we have to guess the ids in advance',
        expectedId, actualId);
    clock.tick(1);
    assertEquals(1, fn.getCallCount());
    clock.dispose();
  },

  testNonFunctionArguments() {
    const clock = new MockClock(true);

    // Unlike normal setTimeout and friends, we only accept functions (not
    // strings, not undefined, etc). Make sure that if we get a non-function, we
    // fail early rather than on the next .tick() operation.

    assertThrows(
        'setTimeout with a non-function value should fail', /**
                                                               @suppress {checkTypes}
                                                               suppression added
                                                               to enable type
                                                               checking
                                                             */
        () => {
          window.setTimeout(undefined, 0);
        });
    clock.tick(1);

    assertThrows('setTimeout with a string should fail', () => {
      window.setTimeout('throw new Error("setTimeout string eval!");', 0);
    });
    clock.tick(1);

    clock.dispose();
  },

  testUnspecifiedTimeout() {
    const clock = new MockClock(true);
    let m0a = false;
    let m0b = false;
    let m10 = false;

    setTimeout(() => {
      m0a = true;
    });
    setTimeout(() => {
      m10 = true;
    }, 10);
    assertEquals(2, clock.getTimeoutsMade());

    assertFalse(m0a);
    assertFalse(m0b);
    assertFalse(m10);

    assertEquals(0, clock.tick(0));
    assertEquals(0, clock.getCurrentTime());

    assertTrue(m0a);
    assertFalse(m0b);
    assertFalse(m10);

    setTimeout(() => {
      m0b = true;
    });
    assertEquals(3, clock.getTimeoutsMade());

    assertEquals(0, clock.tick(0));
    assertEquals(0, clock.getCurrentTime());

    assertTrue(m0a);
    assertTrue(m0b);
    assertFalse(m10);

    assertEquals(10, clock.tick(10));
    assertEquals(10, clock.getCurrentTime());

    assertTrue(m0a);
    assertTrue(m0b);
    assertTrue(m10);

    clock.uninstall();
  },

  testUnspecifiedInterval() {
    const clock = new MockClock(true);
    let times = 0;
    const handle = setInterval(() => {
      if (++times >= 5) {
        clearInterval(handle);
      }
    });

    clock.tick(0);
    assertEquals(5, times);

    clock.uninstall();
  },

  testTickPromise() {
    const clock = new MockClock(true);

    const p = GoogPromise.resolve('foo');
    assertEquals('foo', clock.tickPromise(p));

    const rejected = GoogPromise.reject(new Error('failed'));
    let e = assertThrows(() => {
      clock.tickPromise(rejected);
    });
    assertEquals('failed', e.message);

    const delayed = Timer.promise(500, 'delayed');
    e = assertThrows(() => {
      clock.tickPromise(delayed);
    });
    assertEquals(
        'Promise was expected to be resolved after mock clock tick.',
        e.message);
    assertEquals('delayed', clock.tickPromise(delayed, 500));

    clock.dispose();
  },

  testMockClockInvalidConstructor() {
    assertThrows(
        'Async MockClock cannot be configured with {resetScheduler: false}.',
        () => {
          new MockClock({resetScheduler: false});
        });
  },

  testUninstallWithResetScheduler() {
    goog.async.run.resetScheduler();
    const originalSchedule = goog.async.run.schedule_;
    const clock = new MockClock({
      autoInstall: true,
      resetScheduler: true,
      synchronous: true,
    });
    const mockClockScheduler = goog.async.run.schedule_;
    // Verify synchronous MockClock replaces schedule_.
    assertNotEquals(mockClockScheduler, originalSchedule);
    clock.uninstall();
    // Verify schedule_ is restored after MockClock is uninstalled.
    assertNotEquals(goog.async.run.schedule_, mockClockScheduler);
  },

  testSynchronousMockClockTickAndResolveThrows() {
    const clock = new MockClock(true);
    assertThrows(
        'Synchronous MockClock does not support tickAndResolve.',
        () => this.clock.tick());
    clock.uninstall();
  },
});
