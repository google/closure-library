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

/** @fileoverview Unit tests for the storage interface. */

goog.module('goog.storage.storage_test');
goog.setTestOnly();

const ErrorCode = goog.require('goog.storage.ErrorCode');
const FakeMechanism = goog.require('goog.testing.storage.FakeMechanism');
const StorageStorage = goog.require('goog.storage.Storage');
const asserts = goog.require('goog.testing.asserts');
const functions = goog.require('goog.functions');
const storageTester = goog.require('goog.storage.storageTester');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testBasicOperations() {
    const mechanism = new FakeMechanism();
    const storage = new StorageStorage(mechanism);
    storageTester.runBasicTests(storage);
  },

  testMechanismCommunication() {
    const mechanism = new FakeMechanism();
    const storage = new StorageStorage(mechanism);

    // Invalid JSON.
    mechanism.set('first', '');
    assertEquals(ErrorCode.INVALID_VALUE, assertThrows(() => {
                   storage.get('first');
                 }));
    mechanism.set('second', '(');
    assertEquals(ErrorCode.INVALID_VALUE, assertThrows(() => {
                   storage.get('second');
                 }));

    // Cleaning up.
    storage.remove('first');
    storage.remove('second');
    assertUndefined(storage.get('first'));
    assertUndefined(storage.get('second'));
    assertNull(mechanism.get('first'));
    assertNull(mechanism.get('second'));
  },

  testMechanismFailsGracefullyOnInvalidValue() {
    const mechanism = {
      get: functions.error('Invalid value'),
    };
    const storage = new StorageStorage(mechanism);
    assertUndefined(storage.get('foobar'));
  },
});
