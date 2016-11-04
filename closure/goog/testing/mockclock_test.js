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

goog.provide('goog.testing.MockClockTest');
goog.setTestOnly('goog.testing.MockClockTest');

goog.require('goog.Promise');
goog.require('goog.Timer');
goog.require('goog.events');
goog.require('goog.functions');
goog.require('goog.testing.MockClock');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');

var stubs = new goog.testing.PropertyReplacer();

function tearDown() {
  stubs.reset();
}

function testMockClockWasInstalled() {
  var clock = new goog.testing.MockClock();
  var originalTimeout = window.setTimeout;
  clock.install();
  assertNotEquals(window.setTimeout, originalTimeout);
  setTimeout(function() {}, 100);
  assertEquals(1, clock.getTimeoutsMade());
  setInterval(function() {}, 200);
  assertEquals(2, clock.getTimeoutsMade());
  clock.uninstall();
  assertEquals(window.setTimeout, originalTimeout);
  assertNull(clock.replacer_);
}


function testSetTimeoutAndTick() {
  var clock = new goog.testing.MockClock(true);
  var m5 = false, m10 = false, m15 = false, m20 = false;
  setTimeout(function() { m5 = true; }, 5);
  setTimeout(function() { m10 = true; }, 10);
  setTimeout(function() { m15 = true; }, 15);
  setTimeout(function() { m20 = true; }, 20);
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
}


function testSetImmediateAndTick() {
  var clock = new goog.testing.MockClock(true);
  var tick0 = false;
  var tick1 = false;
  setImmediate(function() { tick0 = true; });
  setImmediate(function() { tick1 = true; });
  assertEquals(2, clock.getTimeoutsMade());
  assertEquals(0, clock.getCallbacksTriggered());

  clock.tick(0);
  assertEquals(2, clock.getCallbacksTriggered());
  assertTrue(tick0);
  assertTrue(tick1);

  clock.uninstall();
}


function testSetInterval() {
  var clock = new goog.testing.MockClock(true);
  var times = 0;
  setInterval(function() { times++; }, 100);

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
}


function testRequestAnimationFrame() {
  goog.global.requestAnimationFrame = function() {};
  var clock = new goog.testing.MockClock(true);
  var times = [];
  var recFunc = goog.testing.recordFunction(function(now) { times.push(now); });
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
}


function testClearTimeout() {
  var clock = new goog.testing.MockClock(true);
  var ran = false;
  var c = setTimeout(function() { ran = true; }, 100);
  clock.tick(50);
  assertFalse(ran);
  clearTimeout(c);
  clock.tick(100);
  assertFalse(ran);
  clock.uninstall();
}


function testClearInterval() {
  var clock = new goog.testing.MockClock(true);
  var times = 0;
  var c = setInterval(function() { times++; }, 100);

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
}


function testClearInterval2() {
  // Tests that we can clear the interval from inside the function
  var clock = new goog.testing.MockClock(true);
  var times = 0;
  var c = setInterval(function() {
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
}


function testCancelRequestAnimationFrame() {
  goog.global.requestAnimationFrame = function() {};
  goog.global.cancelRequestAnimationFrame = function() {};
  var clock = new goog.testing.MockClock(true);
  var ran = false;
  var c = goog.global.requestAnimationFrame(function() { ran = true; });
  clock.tick(10);
  assertFalse(ran);
  goog.global.cancelRequestAnimationFrame(c);
  clock.tick(20);
  assertFalse(ran);
  clock.uninstall();
}


function testMockGoogNow() {
  assertNotEquals(0, goog.now());
  var clock = new goog.testing.MockClock(true);
  assertEquals(0, goog.now());
  clock.tick(50);
  assertEquals(50, goog.now());
  clock.uninstall();
  assertNotEquals(50, goog.now());
}


function testTimeoutDelay() {
  var clock = new goog.testing.MockClock(true);
  var m5 = false, m10 = false, m20 = false;
  setTimeout(function() { m5 = true; }, 5);
  setTimeout(function() { m10 = true; }, 10);
  setTimeout(function() { m20 = true; }, 20);

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
}


function testTimerCallbackCanCreateIntermediateTimer() {
  var clock = new goog.testing.MockClock(true);
  var sequence = [];

  // Create 3 timers: 1, 2, and 3.  Timer 1 should fire at T=1, timer 2 at
  // T=2, and timer 3 at T=3.  The catch: Timer 2 is created by the
  // callback within timer 0.

  // Testing method: Create a simple string sequencing each timer and at
  // what time it fired.

  setTimeout(function() {
    sequence.push('timer1 at T=' + goog.now());
    setTimeout(function() { sequence.push('timer2 at T=' + goog.now()); }, 1);
  }, 1);

  setTimeout(function() { sequence.push('timer3 at T=' + goog.now()); }, 3);

  clock.tick(4);

  assertEquals(
      'Each timer should fire in sequence at the correct time.',
      'timer1 at T=1, timer2 at T=2, timer3 at T=3', sequence.join(', '));

  clock.uninstall();
}


function testCorrectArgumentsPassedToCallback() {
  var clock = new goog.testing.MockClock(true);
  var timeoutId;
  var timeoutExecuted = false;

  timeoutId = setTimeout(function(arg) {
    assertEquals('"this" must be goog.global', goog.global, this);
    assertEquals('The timeout ID must be the first parameter', timeoutId, arg);
    assertEquals('Exactly one argument must be passed', 1, arguments.length);
    timeoutExecuted = true;
  }, 1);

  clock.tick(4);

  assertTrue('The timeout was not executed', timeoutExecuted);

  clock.uninstall();
}


function testTickZero() {
  var clock = new goog.testing.MockClock(true);
  var calls = 0;

  setTimeout(function() {
    assertEquals('I need to be first', 0, calls);
    calls++;
  }, 0);

  setTimeout(function() {
    assertEquals('I need to be second', 1, calls);
    calls++;
  }, 0);

  clock.tick(0);
  assertEquals(2, calls);

  setTimeout(function() {
    assertEquals('I need to be third', 2, calls);
    calls++;
  }, 0);

  clock.tick(0);
  assertEquals(3, calls);

  assertEquals('Time should still be zero', 0, goog.now());

  clock.uninstall();
}


function testReset() {
  var clock = new goog.testing.MockClock(true);

  var id = setTimeout(function() {
    fail('Timeouts should be cleared after a reset');
  }, 0);

  clock.reset();
  clock.tick(999999);

  var calls = 0;
  setTimeout(function() { calls++; }, 10);
  clearTimeout(id);
  clock.tick(100);
  assertEquals(
      'New timeout should still run after clearing from before reset', 1,
      calls);

  clock.uninstall();
}


function testNewClockWithOldTimeoutId() {
  var clock = new goog.testing.MockClock(true);

  var id = setTimeout(function() {
    fail('Timeouts should be cleared after uninstall');
  }, 0);

  clock.uninstall();
  clock = new goog.testing.MockClock(true);

  var calls = 0;
  setTimeout(function() { calls++; }, 10);
  clearTimeout(id);
  clock.tick(100);
  assertEquals(
      'Timeout should still run after cancelling from old clock', 1, calls);
  clock.uninstall();
}


function testQueueInsertionHelper() {
  var queue = [];

  function queueToString() {
    var buffer = [];
    for (var i = 0; i < queue.length; i++) {
      buffer.push(queue[i].runAtMillis);
    }
    return buffer.join(',');
  }

  goog.testing.MockClock.insert_({runAtMillis: 2}, queue);
  assertEquals('Only item', '2', queueToString());

  goog.testing.MockClock.insert_({runAtMillis: 4}, queue);
  assertEquals('Biggest item', '4,2', queueToString());

  goog.testing.MockClock.insert_({runAtMillis: 5}, queue);
  assertEquals('An even bigger item', '5,4,2', queueToString());

  goog.testing.MockClock.insert_({runAtMillis: 1}, queue);
  assertEquals('Smallest item', '5,4,2,1', queueToString());

  goog.testing.MockClock.insert_({runAtMillis: 1, dup: true}, queue);
  assertEquals('Duplicate smallest item', '5,4,2,1,1', queueToString());
  assertTrue('Duplicate item comes at a smaller index', queue[3].dup);

  goog.testing.MockClock.insert_({runAtMillis: 3}, queue);
  goog.testing.MockClock.insert_({runAtMillis: 3, dup: true}, queue);
  assertEquals('Duplicate a middle item', '5,4,3,3,2,1,1', queueToString());
  assertTrue('Duplicate item comes at a smaller index', queue[2].dup);
}


function testIsTimeoutSet() {
  var clock = new goog.testing.MockClock(true);
  var timeoutKey = setTimeout(function() {}, 1);
  assertTrue(
      'Timeout ' + timeoutKey + ' should be set',
      clock.isTimeoutSet(timeoutKey));
  var nextTimeoutKey = timeoutKey + 1;
  assertFalse(
      'Timeout ' + nextTimeoutKey + ' should not be set',
      clock.isTimeoutSet(nextTimeoutKey));
  clearTimeout(timeoutKey);
  assertFalse(
      'Timeout ' + timeoutKey + ' should no longer be set',
      clock.isTimeoutSet(timeoutKey));
  var newTimeoutKey = setTimeout(function() {}, 1);
  clock.tick(5);
  assertFalse(
      'Timeout ' + timeoutKey + ' should not be set',
      clock.isTimeoutSet(timeoutKey));
  assertTrue(
      'Timeout ' + newTimeoutKey + ' should be set',
      clock.isTimeoutSet(newTimeoutKey));
  clock.uninstall();
}


function testBalksOnTimeoutsGreaterThanMaxInt() {
  // Browsers have trouble with timeout greater than max int, so we
  // want Mock Clock to fail if this happens.
  var clock = new goog.testing.MockClock(true);
  // Functions on window don't seem to be able to throw exceptions in
  // IE6.  Explicitly reading the property makes it work.
  var setTimeout = window.setTimeout;
  assertThrows('Timeouts > MAX_INT should fail', function() {
    setTimeout(goog.nullFunction, 2147483648);
  });
  assertThrows('Timeouts much greater than MAX_INT should fail', function() {
    setTimeout(goog.nullFunction, 2147483648 * 10);
  });
  clock.uninstall();
}


function testCorrectSetTimeoutIsRestored() {
  var safe = goog.functions.error('should not have been called');
  stubs.set(window, 'setTimeout', safe);

  var clock = new goog.testing.MockClock(true);
  assertNotEquals('setTimeout is replaced', safe, window.setTimeout);
  clock.uninstall();
  // NOTE: If this assertion proves to be flaky in IE, the string value of
  // the two functions have to be compared as described in
  // goog.testing.TestCase#finalize.
  assertEquals('setTimeout is restored', safe, window.setTimeout);
}


function testMozRequestAnimationFrame() {
  // Setting this function will indirectly tell the mock clock to mock it out.
  stubs.set(window, 'mozRequestAnimationFrame', goog.nullFunction);

  var clock = new goog.testing.MockClock(true);

  var mozBeforePaint = goog.testing.recordFunction();
  goog.events.listen(window, 'MozBeforePaint', mozBeforePaint);

  window.mozRequestAnimationFrame(null);
  assertEquals(0, mozBeforePaint.getCallCount());

  clock.tick(goog.testing.MockClock.REQUEST_ANIMATION_FRAME_TIMEOUT);
  assertEquals(1, mozBeforePaint.getCallCount());
  clock.dispose();
}


function testClearBeforeSet() {
  var clock = new goog.testing.MockClock(true);
  var expectedId = goog.testing.MockClock.nextId;
  window.clearTimeout(expectedId);

  var fn = goog.testing.recordFunction();
  var actualId = window.setTimeout(fn, 0);
  assertEquals(
      'In order for this test to work, we have to guess the ids in advance',
      expectedId, actualId);
  clock.tick(1);
  assertEquals(1, fn.getCallCount());
  clock.dispose();
}


function testNonFunctionArguments() {
  var clock = new goog.testing.MockClock(true);

  // Unlike normal setTimeout and friends, we only accept functions (not
  // strings, not undefined, etc). Make sure that if we get a non-function, we
  // fail early rather than on the next .tick() operation.

  assertThrows('setTimeout with a non-function value should fail', function() {
    window.setTimeout(undefined, 0);
  });
  clock.tick(1);

  assertThrows('setTimeout with a string should fail', function() {
    window.setTimeout('throw new Error("setTimeout string eval!");', 0);
  });
  clock.tick(1);

  clock.dispose();
}


function testUnspecifiedTimeout() {
  var clock = new goog.testing.MockClock(true);
  var m0a = false, m0b = false, m10 = false;
  setTimeout(function() { m0a = true; });
  setTimeout(function() { m10 = true; }, 10);
  assertEquals(2, clock.getTimeoutsMade());

  assertFalse(m0a);
  assertFalse(m0b);
  assertFalse(m10);

  assertEquals(0, clock.tick(0));
  assertEquals(0, clock.getCurrentTime());

  assertTrue(m0a);
  assertFalse(m0b);
  assertFalse(m10);

  setTimeout(function() { m0b = true; });
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
}


function testUnspecifiedInterval() {
  var clock = new goog.testing.MockClock(true);
  var times = 0;
  var handle = setInterval(function() {
    if (++times >= 5) {
      clearInterval(handle);
    }
  });

  clock.tick(0);
  assertEquals(5, times);

  clock.uninstall();
}


function testTickPromise() {
  var clock = new goog.testing.MockClock(true);

  var p = goog.Promise.resolve('foo');
  assertEquals('foo', clock.tickPromise(p));

  var rejected = goog.Promise.reject(new Error('failed'));
  var e = assertThrows(function() { clock.tickPromise(rejected); });
  assertEquals('failed', e.message);

  var delayed = goog.Timer.promise(500, 'delayed');
  e = assertThrows(function() { clock.tickPromise(delayed); });
  assertEquals(
      'Promise was expected to be resolved after mock clock tick.', e.message);
  assertEquals('delayed', clock.tickPromise(delayed, 500));

  clock.dispose();
}
