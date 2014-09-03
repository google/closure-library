// Copyright 2014 The Closure Library Authors. All Rights Reserved.
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

/**
 */

goog.provide('goog.labs.structs.WeakMapTest');
goog.setTestOnly('goog.labs.structs.WeakMapTest');

goog.require('goog.labs.structs.WeakMap');
goog.require('goog.labs.structs.weak');
goog.require('goog.testing.jsunit');


function shouldRunTests() {
  return goog.labs.structs.weak.SUPPORTED_BROWSER;
}


var map;
var key;


function setUp() {
  map = new goog.labs.structs.WeakMap;
  key = {};
}


function tearDown() {
  key = null;
}


function testSetInvalidKey() {
  // Test one invalid key to ensure goog.labs.structs.weak.checkKeyType is
  // called. Other invalid key types are tested in goog.labs.structs.weakTest.*.
  assertThrows(function() {
    map.set(1, 1);
  });
}


function testSetContainsKeyRemove() {
  assertFalse(map.containsKey(key));
  map.set(key, 1);
  assertTrue(map.containsKey(key));
  map.remove(key);
  assertFalse(map.containsKey(key));
}


function testSetGet() {
  assertUndefined(map.get(key));
  map.set(key, 1);
  assertEquals(map.get(key), 1);
}


function testSetOverwritesValue() {
  map.set(key, 1);
  map.set(key, 4);
  assertEquals(map.get(key), 4);
}


function testGetDefaultValue() {
  assertEquals(map.get(key, 'default'), 'default');
  map.set(key, 1);
  assertEquals(map.get(key, 'default'), 1);
  map.remove(key);
  assertEquals(map.get(key, 'default'), 'default');
}
