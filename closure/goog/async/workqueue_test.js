// Copyright 2015 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.async.WorkQueueTest');
goog.setTestOnly();

const WorkQueue = goog.require('goog.async.WorkQueue');
const testSuite = goog.require('goog.testing.testSuite');

const id = 0;
let queue = null;

testSuite({
  setUp() {
    queue = new WorkQueue();
  },

  tearDown() {
    queue = null;
  },

  testEntriesReturnedInOrder() {
    const fn1 = () => {};
    const scope1 = {};
    const fn2 = () => {};
    const scope2 = {};
    queue.add(fn1, scope1);
    queue.add(fn2, scope2);

    let item = queue.remove();
    assertEquals(fn1, item.fn);
    assertEquals(scope1, item.scope);
    assertNull(item.next);

    item = queue.remove();
    assertEquals(fn2, item.fn);
    assertEquals(scope2, item.scope);
    assertNull(item.next);

    item = queue.remove();
    assertNull(item);
  },

  testReturnedItemReused() {
    const fn1 = () => {};
    const scope1 = {};

    const fn2 = () => {};
    const scope2 = {};

    assertEquals(0, WorkQueue.freelist_.occupants());

    queue.add(fn1, scope1);
    const item1 = queue.remove();

    assertEquals(0, WorkQueue.freelist_.occupants());

    queue.returnUnused(item1);

    assertEquals(1, WorkQueue.freelist_.occupants());

    queue.add(fn2, scope2);

    assertEquals(0, WorkQueue.freelist_.occupants());

    const item2 = queue.remove();

    assertEquals(item1, item2);
  },

  testEmptyQueueReturnNull() {
    const item1 = queue.remove();
    assertNull(item1);
  },
});
