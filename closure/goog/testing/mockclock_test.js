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

goog.module('goog.testing.MockClockTest');
goog.setTestOnly();

const GoogPromise = goog.require('goog.Promise');
const MockClock = goog.require('goog.testing.MockClock');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const Timer = goog.require('goog.Timer');
const events = goog.require('goog.events');
const functions = goog.require('goog.functions');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

const stubs = new PropertyReplacer();

testSuite({
  tearDown() {
    stubs.reset();
  },

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
    goog.global.requestAnimationFrame = () => {};
    const clock = new MockClock(true);
    const times = [];
    const recFunc = recordFunction((now) => {
      times.push(now);
    });
    goog.global.requestAnimationFrame(recFunc);
    clock.tick(50);
    assertEquals(1, clock.getCallbacksTriggered());
    assertEquals(1, recFunc.getCallCount());
    assertEquals(20, times[0]);

    goog.global.requestAnimationFrame(recFunc);
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
    goog.global.requestAnimationFrame = () => {};
    goog.global.cancelRequestAnimationFrame = () => {};
    const clock = new MockClock(true);
    let ran = false;
    const c = goog.global.requestAnimationFrame(() => {
      ran = true;
    });
    clock.tick(10);
    assertFalse(ran);
    goog.global.cancelRequestAnimationFrame(c);
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
      assertEquals('"this" must be goog.global', goog.global, this);
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

    assertThrows('setTimeout with a non-function value should fail', () => {
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
});
