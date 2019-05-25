// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.i18n.uChar.LocalNameFetcherTest');
goog.setTestOnly();

const LocalNameFetcher = goog.require('goog.i18n.uChar.LocalNameFetcher');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

let nameFetcher = null;

testSuite({
  setUp() {
    nameFetcher = new LocalNameFetcher();
  },

  testGetName_exists() {
    const callback = recordFunction((name) => {
      assertEquals('Space', name);
    });
    nameFetcher.getName(' ', callback);
    assertEquals(1, callback.getCallCount());
  },

  testGetName_variationSelector() {
    const callback = recordFunction((name) => {
      assertEquals('Variation Selector - 1', name);
    });
    nameFetcher.getName('\ufe00', callback);
    assertEquals(1, callback.getCallCount());
  },

  testGetName_missing() {
    const callback = recordFunction((name) => {
      assertNull(name);
    });
    nameFetcher.getName('P', callback);
    assertEquals(1, callback.getCallCount());
  },

  testIsNameAvailable_withAvailableName() {
    assertTrue(nameFetcher.isNameAvailable(' '));
  },

  testIsNameAvailable_withoutAvailableName() {
    assertFalse(nameFetcher.isNameAvailable('a'));
  },
});
