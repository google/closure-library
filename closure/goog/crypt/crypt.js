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

/**
 * @fileoverview Namespace with crypto related helper functions.
 */

goog.provide('goog.crypt');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.userAgent');

/**
 * Removes the TextDecoder polyfill if there is no need to support IE11.
 * @define {boolean}
 */
goog.crypt.ASSUME_ENCODING_API = goog.define(
    'goog.crypt.ASSUME_ENCODING_API',
    goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_GECKO);

/**
 * Turns a string into an array of bytes; a "byte" being a JS number in the
 * range 0-255. Multi-byte characters are written as little-endian.
 * @param {string} str String value to arrify.
 * @return {!Array<number>} Array of numbers corresponding to the
 *     UCS character codes of each character in str.
 */
goog.crypt.stringToByteArray = function(str) {
  var output = [], p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    // NOTE: c <= 0xffff since JavaScript strings are UTF-16.
    if (c > 0xff) {
      output[p++] = c & 0xff;
      c >>= 8;
    }
    output[p++] = c;
  }
  return output;
};


/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param {!Uint8Array|!Array<number>} bytes Array of numbers representing
 *     characters.
 * @return {string} Stringification of the array.
 */
goog.crypt.byteArrayToString = function(bytes) {
  var CHUNK_SIZE = 8192;

  // Special-case the simple case for speed's sake.
  if (bytes.length <= CHUNK_SIZE) {
    return String.fromCharCode.apply(null, bytes);
  }

  // The remaining logic splits conversion by chunks since
  // Function#apply() has a maximum parameter count.
  // See discussion: http://goo.gl/LrWmZ9

  var str = '';
  for (var i = 0; i < bytes.length; i += CHUNK_SIZE) {
    var chunk = goog.array.slice(bytes, i, i + CHUNK_SIZE);
    str += String.fromCharCode.apply(null, chunk);
  }
  return str;
};


/**
 * Turns an array of numbers into the hex string given by the concatenation of
 * the hex values to which the numbers correspond.
 * @param {Uint8Array|Array<number>} array Array of numbers representing
 *     characters.
 * @param {string=} opt_separator Optional separator between values
 * @return {string} Hex string.
 */
goog.crypt.byteArrayToHex = function(array, opt_separator) {
  return goog.array
      .map(
          array,
          function(numByte) {
            var hexByte = numByte.toString(16);
            return hexByte.length > 1 ? hexByte : '0' + hexByte;
          })
      .join(opt_separator || '');
};


/**
 * Converts a hex string into an integer array.
 * @param {string} hexString Hex string of 16-bit integers (two characters
 *     per integer).
 * @return {!Array<number>} Array of {0,255} integers for the given string.
 */
goog.crypt.hexToByteArray = function(hexString) {
  goog.asserts.assert(
      hexString.length % 2 == 0, 'Key string length must be multiple of 2');
  var arr = [];
  for (var i = 0; i < hexString.length; i += 2) {
    arr.push(parseInt(hexString.substring(i, i + 2), 16));
  }
  return arr;
};


/**
 * Converts a JS string to a UTF-8 "byte" array.
 * @param {string} str 16-bit unicode string.
 * @return {!Array<number>} UTF-8 byte array.
 */
goog.crypt.stringToUtf8ByteArray = function(str) {
  // TODO(user): Use native implementations if/when available
  var out = [], p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = (c >> 6) | 192;
      out[p++] = (c & 63) | 128;
    } else if (
        ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
        ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
      out[p++] = (c >> 18) | 240;
      out[p++] = ((c >> 12) & 63) | 128;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    } else {
      out[p++] = (c >> 12) | 224;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    }
  }
  return out;
};

/**
 * Converts a byte array, interpreted as a sequence of UTF-8 code units, to a
 * JavaScript string (i.e., a sequence of UTF-16 code units), as specified in
 * https://encoding.spec.whatwg.org/#utf-8-decode.
 * @param {!Uint8Array|!Array<number>} bytes UTF-8 byte array.
 * @return {string} JavaScript string (UTF-16).
 */
goog.crypt.utf8ByteArrayToString = function(bytes) {
  if (goog.crypt.ASSUME_ENCODING_API || goog.global.TextDecoder) {
    if (goog.isArray(bytes)) {
      bytes = new Uint8Array(bytes);
    }
    return new TextDecoder().decode(bytes);
  }
  // In JavaScript, unlike many other languages, string concatenation in a loop
  // generally isn't O(n^2). See https://jsperf.com/string-building-options.
  var output = '';
  var position = 0;
  if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB &&
      bytes[2] === 0xBF) {
    position = 3;
  }
  var codePoint = 0;
  var bytesSeen = 0;
  var bytesNeeded = 0;
  var lowerBoundary = 0x80;
  var upperBoundary = 0xBF;
  for (; position < bytes.length; position++) {
    var byt = bytes[position];
    if (bytesNeeded === 0) {
      if (byt >= 0x00 && byt <= 0x7F) {
        output += String.fromCharCode(byt);
      } else if (byt >= 0xC2 && byt <= 0xDF) {
        bytesNeeded = 1;
        codePoint = byt & 0x1F;
      } else if (byt >= 0xE0 && byt <= 0xEF) {
        if (byt === 0xE0) {
          lowerBoundary = 0xA0;
        } else if (byt === 0xED) {
          upperBoundary = 0x9F;
        }
        bytesNeeded = 2;
        codePoint = byt & 0xF;
      } else if (byt >= 0xF0 && byt <= 0xF4) {
        if (byt === 0xF0) {
          lowerBoundary = 0x90;
        } else if (byt === 0xF4) {
          upperBoundary = 0x8F;
        }
        bytesNeeded = 3;
        codePoint = byt & 0x7;
      } else {
        output += '\uFFFD';
      }
    } else if (byt < lowerBoundary || byt > upperBoundary) {
      codePoint = 0;
      bytesNeeded = 0;
      bytesSeen = 0;
      lowerBoundary = 0x80;
      upperBoundary = 0xBF;
      position--;
      output += '\uFFFD';
    } else {
      lowerBoundary = 0x80;
      upperBoundary = 0xBF;
      codePoint = (codePoint << 6) | (byt & 0x3F);
      bytesSeen++;
      if (bytesSeen === bytesNeeded) {
        if (codePoint < 0x10000) {
          output += String.fromCharCode(codePoint);
        } else {
          // UTF-16 surrogate pair
          output +=
              String.fromCharCode(((codePoint - 0x10000) >> 10) + 0xD800) +
              String.fromCharCode(((codePoint - 0x10000) & 0x3FF) + 0xDC00);
        }
        codePoint = 0;
        bytesNeeded = 0;
        bytesSeen = 0;
      }
    }
  }
  if (bytesNeeded !== 0) {
    output += '\uFFFD';
  }
  return output;
};


/**
 * XOR two byte arrays.
 * @param {!Uint8Array|!Int8Array|!Array<number>} bytes1 Byte array 1.
 * @param {!Uint8Array|!Int8Array|!Array<number>} bytes2 Byte array 2.
 * @return {!Array<number>} Resulting XOR of the two byte arrays.
 */
goog.crypt.xorByteArray = function(bytes1, bytes2) {
  goog.asserts.assert(
      bytes1.length == bytes2.length, 'XOR array lengths must match');

  var result = [];
  for (var i = 0; i < bytes1.length; i++) {
    result.push(bytes1[i] ^ bytes2[i]);
  }
  return result;
};
