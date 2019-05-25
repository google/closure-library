// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.i18n.CharListDecompressorTest');
goog.setTestOnly();

const CharListDecompressor = goog.require('goog.i18n.CharListDecompressor');
const testSuite = goog.require('goog.testing.testSuite');

const decompressor = new CharListDecompressor();

testSuite({
  testBuildCharMap() {
    assertEquals(0, decompressor.charMap_['0']);
    assertEquals(10, decompressor.charMap_['A']);
    assertEquals(87, decompressor.charMap_['}']);
  },

  testGetCodeAt() {
    const code = decompressor.getCodeAt_('321', 1, 2);
    assertEquals(90, code);
  },

  testAddCharsForType0() {
    const list = ['a'];
    const lastcode = decompressor.addChars_(list, 97, 0, 0);
    assertArrayEquals(['a', 'b'], list);
    assertEquals(98, lastcode);
  },

  testAddCharsForType1() {
    const list = ['a'];
    const lastcode = decompressor.addChars_(list, 98, 0, 1);
    assertArrayEquals(['a', 'a'], list);
    assertEquals(97, lastcode);
  },

  testAddCharsForType2() {
    const list = ['a'];
    const lastcode = decompressor.addChars_(list, 97, 1, 2);
    assertArrayEquals(['a', 'b', 'c'], list);
    assertEquals(99, lastcode);
  },

  testToCharList() {
    const list = decompressor.toCharList('%812E<E');  // a, x-z, p-r
    assertArrayEquals(['a', 'x', 'y', 'z', 'p', 'q', 'r'], list);
  },
});
