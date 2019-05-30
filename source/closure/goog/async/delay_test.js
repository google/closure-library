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
goog.module('goog.async.DelayTest');
goog.setTestOnly();

const Delay = goog.require('goog.async.Delay');
const MockClock = goog.require('goog.testing.MockClock');
const testSuite = goog.require('goog.testing.testSuite');

let invoked = false;
let delay = null;
let clock = null;

function callback() {
  invoked = true;
}

testSuite({
  setUp() {
    clock = new MockClock(true);
    invoked = false;
    delay = new Delay(callback, 200);
  },

  tearDown() {
    clock.dispose();
    delay.dispose();
  },

  testDelay() {
    delay.start();
    assertFalse(invoked);

    clock.tick(100);
    assertFalse(invoked);

    clock.tick(100);
    assertTrue(invoked);
  },

  testStop() {
    delay.start();

    clock.tick(100);
    assertFalse(invoked);

    delay.stop();
    clock.tick(100);
    assertFalse(invoked);
  },

  testIsActive() {
    assertFalse(delay.isActive());
    delay.start();
    assertTrue(delay.isActive());
    clock.tick(200);
    assertFalse(delay.isActive());
  },

  testRestart() {
    delay.start();
    clock.tick(100);

    delay.stop();
    assertFalse(invoked);

    delay.start();
    clock.tick(199);
    assertFalse(invoked);

    clock.tick(1);
    assertTrue(invoked);

    invoked = false;
    delay.start();
    clock.tick(200);
    assertTrue(invoked);
  },

  testStartIfNotActive() {
    delay.startIfNotActive();
    clock.tick(100);

    delay.stop();
    assertFalse(invoked);

    delay.startIfNotActive();
    clock.tick(199);
    assertFalse(invoked);

    clock.tick(1);
    assertTrue(invoked);

    invoked = false;
    delay.start();
    clock.tick(199);

    assertFalse(invoked);

    delay.startIfNotActive();
    clock.tick(1);

    assertTrue(invoked);
  },

  testOverride() {
    delay.start(50);
    clock.tick(49);
    assertFalse(invoked);

    clock.tick(1);
    assertTrue(invoked);
  },

  testDispose() {
    delay.start();
    delay.dispose();
    assertTrue(delay.isDisposed());

    clock.tick(500);
    assertFalse(invoked);
  },

  testFire() {
    delay.start();

    clock.tick(50);
    delay.fire();
    assertTrue(invoked);
    assertFalse(delay.isActive());

    invoked = false;
    clock.tick(200);
    assertFalse(
        'Delay fired early with fire call, timeout should have been ' +
            'cleared',
        invoked);
  },

  testFireIfActive() {
    delay.fireIfActive();
    assertFalse(invoked);

    delay.start();
    delay.fireIfActive();
    assertTrue(invoked);
    invoked = false;
    clock.tick(300);
    assertFalse(
        'Delay fired early with fireIfActive, timeout should have been ' +
            'cleared',
        invoked);
  },
});
