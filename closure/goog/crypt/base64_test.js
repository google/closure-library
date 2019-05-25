// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.crypt.base64Test');
goog.setTestOnly();

const base64 = goog.require('goog.crypt.base64');
const crypt = goog.require('goog.crypt');
const testSuite = goog.require('goog.testing.testSuite');

// Static test data
// clang-format off
const tests = [
  '', '',
  'f', 'Zg==',
  'fo', 'Zm8=',
  'foo', 'Zm9v',
  'foob', 'Zm9vYg==',
  'fooba', 'Zm9vYmE=',
  'foobar', 'Zm9vYmFy',

  // Testing non-ascii characters (1-10 in chinese)
  '\xe4\xb8\x80\xe4\xba\x8c\xe4\xb8\x89\xe5\x9b\x9b\xe4\xba\x94\xe5' +
      '\x85\xad\xe4\xb8\x83\xe5\x85\xab\xe4\xb9\x9d\xe5\x8d\x81',
  '5LiA5LqM5LiJ5Zub5LqU5YWt5LiD5YWr5Lmd5Y2B'];
// clang-format on

/**
 * Asserts that `encoded` matches `expected` when base64 decoded as byte array.
 * @param {!Array<number>} expected The expected binary decoded content.
 * @param {string} encoded The base64 encoded content to check.
 * @param {boolean=} webSafe True if we should use the web-safe alphabet.
 */
function assertDecodeToByteArrayEquals(expected, encoded, webSafe = undefined) {
  const dec = base64.decodeStringToByteArray(encoded, webSafe);
  assertArrayEquals(expected, dec);
}

/**
 * Asserts that `encoded` matches `expected` when base64 decoded as uint8array,
 * if supported on this browser (otherwise this function is a no-op).
 * @param {!Array<number>} expected The expected binary decoded content.
 * @param {string} encoded The base64 encoded content to check.
 */
function assertDecodeToUint8ArrayEquals(expected, encoded) {
  if (goog.global.Uint8Array) {
    const dec = base64.decodeStringToUint8Array(encoded);
    assertArrayEquals(expected, Array.prototype.slice.call(dec));
  }
}

// Tests that decoding a string where the length is not a multiple of 4 does
// not produce spurious trailing zeroes.  This is a regression test for
// cl/65120705, which fixes a bug that was introduced when support for
// non-padded base64 encoding was added in cl/20209336.

testSuite({
  testByteArrayEncoding() {
    // Let's see if it's sane by feeding it some well-known values. Index i
    // has the input and index i+1 has the expected value.
    for (let i = 0; i < tests.length; i += 2) {
      let enc = base64.encodeByteArray(crypt.stringToByteArray(tests[i]));
      assertEquals(tests[i + 1], enc);
      const expected = crypt.stringToByteArray(tests[i]);
      assertDecodeToByteArrayEquals(expected, enc);
      assertDecodeToUint8ArrayEquals(expected, enc);

      // Check that obsolete websafe param has no effect.
      assertDecodeToByteArrayEquals(expected, enc, true /* websafe */);

      // Re-encode as websafe.
      enc = base64.encodeByteArray(
          crypt.stringToByteArray(tests[i], true /* websafe */));

      // Check that decoding accepts websafe codes.
      assertDecodeToByteArrayEquals(expected, enc);
      assertDecodeToUint8ArrayEquals(expected, enc);

      // Check that obsolete websafe param has no effect.
      assertDecodeToByteArrayEquals(expected, enc, true /* websafe */);
    }
  },

  testOddLengthByteArrayEncoding() {
    const buffer = [0, 0, 0];
    const encodedBuffer = base64.encodeByteArray(buffer);
    assertEquals('AAAA', encodedBuffer);

    assertDecodeToByteArrayEquals(buffer, encodedBuffer);
    assertDecodeToUint8ArrayEquals(buffer, encodedBuffer);
  },

  testOddLengthByteArrayDecoding() {
    // The base-64 encoding of the bytes [97, 98, 99, 100], with no padding.
    // The padded version would be "YWJjZA==" (length 8), or "YWJjZA.." if
    // web-safe.
    const encodedBuffer = 'YWJjZA';

    const expected = crypt.stringToByteArray('abcd');
    assertDecodeToByteArrayEquals(expected, encodedBuffer);
    assertDecodeToUint8ArrayEquals(expected, encodedBuffer);

    // Repeat the test in web-safe decoding mode.
    assertDecodeToByteArrayEquals(expected, encodedBuffer, true /* web-safe */);
  },

  testShortcutPathEncoding() {
    // Test the higher-level API (tests the btoa/atob shortcut path)
    for (let i = 0; i < tests.length; i += 2) {
      const enc = base64.encodeString(tests[i]);
      assertEquals(tests[i + 1], enc);
      const dec = base64.decodeString(enc);
      assertEquals(tests[i], dec);
    }
  },

  testMultipleIterations() {
    // Now run it through its paces

    const numIterations = 100;
    for (let i = 0; i < numIterations; i++) {
      const input = [];
      for (let j = 0; j < i; j++) input[j] = j % 256;

      const encoded = base64.encodeByteArray(input);
      assertDecodeToByteArrayEquals(input, encoded);
      assertDecodeToUint8ArrayEquals(input, encoded);
    }
  },

  testWebSafeEncoding() {
    // Test non-websafe / websafe difference
    const test = '>>>???>>>???=/+';
    const testArr = crypt.stringToByteArray(test);

    let enc = base64.encodeByteArray(testArr);
    assertEquals('Non-websafe broken?', 'Pj4+Pz8/Pj4+Pz8/PS8r', enc);

    enc = base64.encodeString(test);
    assertEquals('Non-websafe broken?', 'Pj4+Pz8/Pj4+Pz8/PS8r', enc);

    enc = base64.encodeByteArray(testArr, true /* websafe */);
    assertEquals('Websafe encoding broken', 'Pj4-Pz8_Pj4-Pz8_PS8r', enc);

    enc = base64.encodeString(test, true);
    assertEquals('Non-websafe broken?', 'Pj4-Pz8_Pj4-Pz8_PS8r', enc);
    assertDecodeToByteArrayEquals(testArr, enc);
    assertDecodeToUint8ArrayEquals(testArr, enc);

    const dec = base64.decodeString(enc, true /* websafe */);
    assertEquals('Websafe decoding broken', test, dec);

    // Test parsing malformed characters
    assertThrows('Didn\'t throw on malformed input', () => {
      base64.decodeStringToByteArray('foooooo)oooo');
    });
    // Test parsing malformed characters
    assertThrows('Didn\'t throw on malformed input', () => {
      base64.decodeStringToUint8Array('foooooo)oooo');
    });
  },

  testDecodeIgnoresSpace() {
    const spaceTests = [
      // [encoded, expected decoded]
      [' \n\t\r', ''],
      ['Z g =\n=', 'f'],
      ['Zm 8=', 'fo'],
      [' Zm 9v', 'foo'],
      ['Zm9v Yg ==\t ', 'foob'],
      ['\nZ m9  vYm\n E=', 'fooba'],
      ['  \nZ \tm9v YmFy  ', 'foobar'],
    ];

    for (let i = 0; i < spaceTests.length; i++) {
      const thisTest = spaceTests[i];
      const encoded = thisTest[0];
      const expectedStr = thisTest[1];
      const expected = crypt.stringToByteArray(expectedStr);

      assertDecodeToByteArrayEquals(expected, encoded);
      assertDecodeToUint8ArrayEquals(expected, encoded);
      assertEquals(expectedStr, base64.decodeString(encoded));
    }
  },
});
