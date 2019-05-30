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

goog.module('goog.ui.IdleTimerTest');
goog.setTestOnly();

const IdleTimer = goog.require('goog.ui.IdleTimer');
const MockActivityMonitor = goog.require('goog.ui.MockActivityMonitor');
const MockClock = goog.require('goog.testing.MockClock');
const events = goog.require('goog.events');
const testSuite = goog.require('goog.testing.testSuite');

let clock;

testSuite({
  setUp() {
    clock = new MockClock(true);
    goog.now = goog.bind(clock.getCurrentTime, clock);
  },

  tearDown() {
    clock.dispose();
  },

  /** Tests whether an event is fired when the user becomes idle */
  testBecomeIdle() {
    const idleThreshold = 1000;
    const mockActivityMonitor = new MockActivityMonitor();
    const idleTimer = new IdleTimer(idleThreshold, mockActivityMonitor);

    mockActivityMonitor.simulateEvent();
    assertFalse('Precondition: user should be active', idleTimer.isIdle());

    let onBecomeIdleCount = 0;
    const onBecomeIdle = () => {
      onBecomeIdleCount += 1;
    };
    events.listen(idleTimer, IdleTimer.Event.BECOME_IDLE, onBecomeIdle);

    clock.tick(idleThreshold);
    mockActivityMonitor.simulateEvent();
    clock.tick(idleThreshold);
    assert('The BECOME_IDLE event fired too early', onBecomeIdleCount == 0);
    assertFalse('The user should still be active', idleTimer.isIdle());

    clock.tick(1);
    assert('The BECOME_IDLE event fired too late', onBecomeIdleCount == 1);
    assert('The user should be idle', idleTimer.isIdle());

    idleTimer.dispose();
  },

  /** Tests whether an event is fired when the user becomes active */
  testBecomeActive() {
    const idleThreshold = 1000;
    const mockActivityMonitor = new MockActivityMonitor();
    const idleTimer = new IdleTimer(idleThreshold, mockActivityMonitor);

    clock.tick(idleThreshold + 1);
    assert('Precondition: user should be idle', idleTimer.isIdle());

    let onBecomeActiveCount = 0;
    const onBecomeActive = () => {
      onBecomeActiveCount += 1;
    };
    events.listen(idleTimer, IdleTimer.Event.BECOME_ACTIVE, onBecomeActive);

    clock.tick(idleThreshold);
    assert('The BECOME_ACTIVE event fired too early', onBecomeActiveCount == 0);
    assert('The user should still be idle', idleTimer.isIdle());

    mockActivityMonitor.simulateEvent();
    assert('The BECOME_ACTIVE event fired too late', onBecomeActiveCount == 1);
    assertFalse('The user should be active', idleTimer.isIdle());

    idleTimer.dispose();
  },
});
