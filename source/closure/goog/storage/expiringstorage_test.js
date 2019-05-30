// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.storage.ExpiringStorageTest');
goog.setTestOnly();

const ExpiringStorage = goog.require('goog.storage.ExpiringStorage');
const FakeMechanism = goog.require('goog.testing.storage.FakeMechanism');
const MockClock = goog.require('goog.testing.MockClock');
const storageTester = goog.require('goog.storage.storageTester');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testBasicOperations() {
    const mechanism = new FakeMechanism();
    const storage = new ExpiringStorage(mechanism);
    storageTester.runBasicTests(storage);
  },

  testExpiration() {
    const mechanism = new FakeMechanism();
    const clock = new MockClock(true);
    const storage = new ExpiringStorage(mechanism);

    // No expiration.
    storage.set('first', 'one second', 1000);
    storage.set('second', 'permanent');
    storage.set('third', 'two seconds', 2000);
    storage.set('fourth', 'permanent');
    clock.tick(100);
    assertEquals('one second', storage.get('first'));
    assertEquals('permanent', storage.get('second'));
    assertEquals('two seconds', storage.get('third'));
    assertEquals('permanent', storage.get('fourth'));

    // A key has expired.
    clock.tick(1000);
    assertUndefined(storage.get('first'));
    assertEquals('permanent', storage.get('second'));
    assertEquals('two seconds', storage.get('third'));
    assertEquals('permanent', storage.get('fourth'));
    assertNull(mechanism.get('first'));

    // Add an already expired key.
    storage.set('fourth', 'one second again', 1000);
    assertNull(mechanism.get('fourth'));
    assertUndefined(storage.get('fourth'));

    // Another key has expired.
    clock.tick(1000);
    assertEquals('permanent', storage.get('second'));
    assertUndefined(storage.get('third'));
    assertNull(mechanism.get('third'));

    // Clean up.
    storage.remove('second');
    assertNull(mechanism.get('second'));
    assertUndefined(storage.get('second'));
    clock.uninstall();
  },

  testClockSkew() {
    const mechanism = new FakeMechanism();
    const storage = new ExpiringStorage(mechanism);
    const clock = new MockClock(true);

    // Simulate clock skew.
    clock.tick(100);
    storage.set('first', 'one second', 1000);
    clock.reset();
    assertUndefined(storage.get('first'));
    assertNull(mechanism.get('first'));

    clock.uninstall();
  },
});
