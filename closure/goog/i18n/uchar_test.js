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

goog.module('goog.i18n.uCharTest');
goog.setTestOnly();

const testSuite = goog.require('goog.testing.testSuite');
const uChar = goog.require('goog.i18n.uChar');

testSuite({
  testToHexString() {
    const result = uChar.toHexString('\uD869\uDED6');
    assertEquals('U+2A6D6', result);
  },

  testPadString() {
    const result = uChar.padString_('abc', 4, '0');
    assertEquals('0abc', result);
  },

  testToCharCode() {
    const result = uChar.toCharCode('\uD869\uDED6');
    assertEquals(0x2A6D6, result);
  },

  testcodePointAt() {
    // Basic cases.
    assertEquals(0x006C, uChar.getCodePointAround('Hello!', 2));
    assertEquals(
        0x2708 /* Airplane symbol (non-ASCII) */,
        uChar.getCodePointAround('Hello\u2708', 5));

    // Supplementary characters.
    assertEquals(0x2A6D6, uChar.getCodePointAround('\uD869\uDED6', 0));
    assertEquals(-0x2A6D6, uChar.getCodePointAround('\uD869\uDED6', 1));
    assertEquals(
        0xD869,
        uChar.getCodePointAround(
            '\uD869' +
                'w',
            0));
    assertEquals(
        0xDED6,
        uChar.getCodePointAround(
            '\uD869' +
                'w' +
                '\uDED6',
            2));
  },

  testBuildSupplementaryCodePoint() {
    const result = uChar.buildSupplementaryCodePoint(0xD869, 0xDED6);
    assertEquals(0x2A6D6, result);
    assertNull(uChar.buildSupplementaryCodePoint(0xDED6, 0xD869));
    assertNull(uChar.buildSupplementaryCodePoint(0xD869, 0xAC00));
  },

  testCharCount() {
    assertEquals(2, uChar.charCount(0x2A6D6));
    assertEquals(1, uChar.charCount(0xAC00));
  },

  testIsSupplementaryCodePoint() {
    assertTrue(uChar.isSupplementaryCodePoint(0x2A6D6));
    assertFalse(uChar.isSupplementaryCodePoint(0xAC00));
  },

  testIsLeadSurrogateCodepoint() {
    assertTrue(uChar.isLeadSurrogateCodePoint(0xD869));
    assertFalse(uChar.isLeadSurrogateCodePoint(0xDED6));
    assertFalse(uChar.isLeadSurrogateCodePoint(0xAC00));
  },

  testIsTrailSurrogateCodePoint() {
    assertTrue(uChar.isTrailSurrogateCodePoint(0xDED6));
    assertFalse(uChar.isTrailSurrogateCodePoint(0xD869));
    assertFalse(uChar.isTrailSurrogateCodePoint(0xAC00));
  },

  testFromCharCode() {
    const result = uChar.fromCharCode(0x2A6D6);
    assertEquals('\uD869\uDED6', result);
  },

  testFromCharCode_invalidValues() {
    let result = uChar.fromCharCode(-1);
    assertEquals(null, result);

    result = uChar.fromCharCode(uChar.CODE_POINT_MAX_VALUE_ + 1);
    assertEquals(null, result);

    result = uChar.fromCharCode(null);
    assertEquals(null, result);

    result = uChar.fromCharCode(undefined);
    assertEquals(null, result);

    result = uChar.fromCharCode(NaN);
    assertEquals(null, result);
  },
});
