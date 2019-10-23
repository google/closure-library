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

goog.module('goog.storage.mechanism.HTML5WebStorageTest');
goog.setTestOnly('goog.storage.mechanism.HTML5WebStorageTest');

const ErrorCode = goog.require('goog.storage.mechanism.ErrorCode');
const HTML5WebStorage = goog.require('goog.storage.mechanism.HTML5WebStorage');
const testSuite = goog.require('goog.testing.testSuite');


/**
 * A minimal WebStorage implementation that throws exceptions for disabled
 * storage. Since we cannot have unit tests running in Safari private mode to
 * test this, we need to mock an exception throwing when trying to set a value.
 *
 * @param {boolean=} opt_isStorageDisabled If true, throws exceptions emulating
 *     Private browsing mode.  If false, storage quota will be marked as
 *     exceeded.
 * @constructor
 */
function MockThrowableStorage(opt_isStorageDisabled) {
  this.isStorageDisabled_ = !!opt_isStorageDisabled;
  this.length = opt_isStorageDisabled ? 0 : 1;
}


/** @override */
MockThrowableStorage.prototype.setItem = function(key, value) {
  if (this.isStorageDisabled_) {
    throw ErrorCode.STORAGE_DISABLED;
  } else {
    throw ErrorCode.QUOTA_EXCEEDED;
  }
};


/** @override */
MockThrowableStorage.prototype.removeItem = function(key) {};


/**
 * A very simple, dummy implementation of key(), merely to verify that calls to
 * HTML5WebStorage#key are proxied through.
 * @param {number} index A key index.
 * @return {string} The key associated with that index.
 */
MockThrowableStorage.prototype.key = function(index) {
  return 'dummyKey';
};



/**
 * Provides an HTML5WebStorage wrapper for MockThrowableStorage.
 *
 * @constructor
 * @extends {HTML5WebStorage}
 */
function HTML5MockStorage(opt_isStorageDisabled) {
  HTML5MockStorage.base(
      this, 'constructor', new MockThrowableStorage(opt_isStorageDisabled));
}
goog.inherits(HTML5MockStorage, HTML5WebStorage);


testSuite({
  testIsNotAvailableWhenQuotaExceeded() {
    const storage = new HTML5MockStorage(false);
    assertFalse(storage.isAvailable());
  },

  testIsNotAvailableWhenStorageDisabled() {
    const storage = new HTML5MockStorage(true);
    assertFalse(storage.isAvailable());
  },

  testSetThrowsExceptionWhenQuotaExceeded() {
    const storage = new HTML5MockStorage(false);
    let isQuotaExceeded = false;
    try {
      storage.set('foobar', '1');
    } catch (e) {
      isQuotaExceeded = e == ErrorCode.QUOTA_EXCEEDED;
    }
    assertTrue(isQuotaExceeded);
  },

  testSetThrowsExceptionWhenStorageDisabled() {
    const storage = new HTML5MockStorage(true);
    let isStorageDisabled = false;
    try {
      storage.set('foobar', '1');
    } catch (e) {
      isStorageDisabled = e == ErrorCode.STORAGE_DISABLED;
    }
    assertTrue(isStorageDisabled);
  },

  testKeyIterationWithKeyMethod() {
    const storage = new HTML5MockStorage(true);
    assertEquals('dummyKey', storage.key(1));
  },
});
