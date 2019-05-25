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

goog.module('goog.structs.CollectionTest');
goog.setTestOnly();

const AvlTree = goog.require('goog.structs.AvlTree');
const StructsSet = goog.require('goog.structs.Set');
const testSuite = goog.require('goog.testing.testSuite');

// Simple exercise of a collection object.
function exerciseCollection(collection) {
  assertEquals(0, collection.getCount());

  for (let i = 1; i <= 10; i++) {
    assertFalse(collection.contains(i));
    collection.add(i);
    assertTrue(collection.contains(i));
    assertEquals(i, collection.getCount());
  }

  assertEquals(10, collection.getCount());

  for (let i = 10; i > 0; i--) {
    assertTrue(collection.contains(i));
    collection.remove(i);
    assertFalse(collection.contains(i));
    assertEquals(i - 1, collection.getCount());
  }

  assertEquals(0, collection.getCount());
}
testSuite({
  testSet() {
    const set = new StructsSet();
    exerciseCollection(set);
  },

  testAvlTree() {
    const tree = new AvlTree();
    exerciseCollection(tree);
  },
});
