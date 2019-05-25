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

goog.module('goog.net.streams.JsonStreamParserTest');
goog.setTestOnly();

const JsonFuzzing = goog.require('goog.labs.testing.JsonFuzzing');
const JsonStreamParser = goog.require('goog.net.streams.JsonStreamParser');
const asserts = goog.require('goog.testing.asserts');
const googArray = goog.require('goog.array');
const googJson = goog.require('goog.json');
const testSuite = goog.require('goog.testing.testSuite');
const utils = goog.require('goog.uri.utils');

let debug;

/**
 * Debug is enabled with "&debug=on" on the URL.
 * @param {string} info The debug info
 */
function print(info) {
  if (debug) {
    debug.innerHTML += `<p><p>${info}`;
  }
}

// TODO(user): add a fuzzy test for this.

testSuite({
  setUp() {
    const uri = window.document.URL;
    if (uri) {
      const debugFlag = utils.getParamValue(uri, 'debug');
      if (debugFlag) {
        debug = window.document.getElementById('debug');
      }
    }
  },

  testEmptyStream() {
    const parser = new JsonStreamParser();
    const result = parser.parse('[]');
    assertNull(result);
  },

  testEmptyStreamMore() {
    let parser = new JsonStreamParser();
    let result = parser.parse('  [   ]  ');
    assertNull(result);

    parser = new JsonStreamParser();
    result = parser.parse('  [   ');
    assertNull(result);

    result = parser.parse('  ]   ');
    assertNull(result);

    parser = new JsonStreamParser();
    assertThrows(() => {
      parser.parse(' a [   ');
    });
    assertThrows(() => {
      parser.parse(' [ ] ');
    });
  },

  testSingleMessage() {
    const parser = new JsonStreamParser();
    const result = parser.parse('[{"a" : "b"}]');
    assertEquals(1, result.length);
    assertEquals('b', result[0].a);
  },

  testEnclosingArray() {
    const parser = new JsonStreamParser();
    let result = parser.parse('[\n');
    assertNull(result);

    result = parser.parse('{"a" : "b"}');
    assertEquals(1, result.length);
    assertEquals('b', result[0].a);

    result = parser.parse('\n]');
    assertNull(result);
  },

  testSingleMessageInChunks() {
    let parser = new JsonStreamParser();
    let result = parser.parse('[{"a" : ');
    assertNull(result);
    result = parser.parse('"b"}]');
    assertEquals(1, result.length);
    assertEquals('b', result[0].a);

    parser = new JsonStreamParser();
    result = parser.parse('[ {  "a" : ');
    assertNull(result);
    result = parser.parse('"b"} ');
    assertEquals(1, result.length);
    assertEquals('b', result[0].a);

    result = parser.parse('] ');
    assertNull(result);
  },

  testTwoMessages() {
    const parser = new JsonStreamParser();
    const result = parser.parse('[{"a" : "b"}, {"c" : "d"}]');
    assertEquals(2, result.length);
    assertEquals('b', result[0].a);
    assertEquals('d', result[1].c);
  },

  testTwoMessagesInChunks() {
    const parser = new JsonStreamParser();
    let result = parser.parse('[{"a" : "b"}, ');
    assertEquals(1, result.length);
    assertEquals('b', result[0].a);
    result = parser.parse('{"c" : "d"} ');
    assertEquals(1, result.length);
    assertEquals('d', result[0].c);
    result = parser.parse('] ');
    assertNull(result);
    assertThrows(() => {
      parser.parse('  a   ');
    });
  },

  /** Parse a fuzzy json string only once. */
  testSingleFuzzyMessages() {
    const fuzzing = new JsonFuzzing();

    // total # of tests
    for (let i = 0; i < 5; i++) {
      const data = fuzzing.newArray();
      const dataString = googJson.serialize(data);
      const parser = new JsonStreamParser();
      const result = parser.parse(dataString);

      assertEquals(data.length, result.length);
      googArray.forEach(data, (elm, index) => {
        assertNotNull(elm);
        assertObjectEquals(dataString, elm, result[index]);
      });
    }
  },

  /**
   * Parse a fuzzy json string split (in two chunks) at each index of the
   * string. This is a VERY expensive test, so change the fuzzing options for
   * manual runs as required.
   */
  testChunkedFuzzyMessages() {
    const options = {jsonSize: 5, numFields: 5, arraySize: 4, maxDepth: 3};
    const fuzzing = new JsonFuzzing(options);

    const data = fuzzing.newArray();
    const dataString = googJson.serialize(data);

    print(dataString);

    for (let j = 1; j < dataString.length; j++) {
      const parser = new JsonStreamParser();
      let result = [];

      const string1 = dataString.substring(0, j);

      let parsed = parser.parse(string1);
      if (parsed) {
        result = googArray.concat(result, parsed);
      }

      const string2 = dataString.substring(j);

      parsed = parser.parse(string2);
      if (parsed) {
        result = googArray.concat(result, parsed);
      }

      assertEquals(data.length, result.length);
      googArray.forEach(data, (elm, index) => {
        assertObjectEquals(dataString, elm, result[index]);
      });
    }
  },

  /** Parse a fuzzy json string in randomly generated chunks. */
  testRandomlyChunkedFuzzyMessages() {
    const fuzzing = new JsonFuzzing();

    const data = fuzzing.newArray();
    const dataString = googJson.serialize(data);

    const parser = new JsonStreamParser();

    let result = [];

    print(dataString);

    // randomly generated chunks
    let pos = 0;
    while (pos < dataString.length) {
      const num = fuzzing.nextInt(1, dataString.length - pos);
      const next = pos + num;
      const subString = dataString.substring(pos, next);

      print(subString);

      pos = next;
      const parsed = parser.parse(subString);
      if (parsed) {
        result = googArray.concat(result, parsed);
      }
    }

    assertEquals(data.length, result.length);
    googArray.forEach(data, (elm, index) => {
      assertObjectEquals(
          `${dataString}
@${index}`,
          elm, result[index]);
    });
  },

  testGetExtraInput() {
    let parser = new JsonStreamParser();
    const result = parser.parse('[] , [[1, 2, 3]]');
    assertNull(result);
    assertTrue(parser.done());
    assertEquals(' , [[1, 2, 3]]', parser.getExtraInput());

    parser = new JsonStreamParser();
    assertFalse(parser.done());
    parser.parse(' [{"a" : "b"}, {"c" : "d"   ');
    assertFalse(parser.done());
    parser.parse(' } ]  a   ');
    assertTrue(parser.done());
    assertEquals('  a   ', parser.getExtraInput());
  },

  testDeliverMessageAsRawString() {
    const parser = new JsonStreamParser({'deliverMessageAsRawString': true});
    const result = parser.parse(' [{"a" : "b"}, {"c" : "d"},[],{}] ');
    assertEquals(4, result.length);
    assertEquals('{"a" : "b"}', result[0]);
    assertEquals(' {"c" : "d"}', result[1]);
    assertEquals('[]', result[2]);
    assertEquals('{}', result[3]);
  },
});
