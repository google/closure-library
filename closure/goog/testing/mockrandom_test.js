// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.MockRandomTest');
goog.setTestOnly();

const MockRandom = goog.require('goog.testing.MockRandom');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testMockRandomInstall() {
    const random = new MockRandom([]);
    const originalRandom = Math.random;

    assertFalse(!!random.installed_);

    random.install();
    assertTrue(random.installed_);
    assertNotEquals(Math.random, originalRandom);

    random.uninstall();
    assertFalse(random.installed_);
    assertEquals(originalRandom, Math.random);
  },

  testMockRandomRandom() {
    const random = new MockRandom([], true);

    assertFalse(random.hasMoreValues());

    random.inject(2);
    assertTrue(random.hasMoreValues());
    assertEquals(2, Math.random());

    random.inject([1, 2, 3]);
    assertTrue(random.hasMoreValues());
    assertEquals(1, Math.random());
    assertEquals(2, Math.random());
    assertEquals(3, Math.random());
    assertFalse(random.hasMoreValues());
    assertNotUndefined(Math.random());
  },

  testRandomStrictlyFromSequence() {
    const random = new MockRandom([], /* install */ true);
    random.setStrictlyFromSequence(true);
    assertFalse(random.hasMoreValues());
    assertThrows(() => {
      Math.random();
    });

    random.inject(3);
    assertTrue(random.hasMoreValues());
    assertNotThrows(() => {
      Math.random();
    });

    random.setStrictlyFromSequence(false);
    assertFalse(random.hasMoreValues());
    assertNotThrows(() => {
      Math.random();
    });
  },
});
