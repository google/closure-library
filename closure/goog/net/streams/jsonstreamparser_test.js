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

goog.provide('goog.net.streams.JsonStreamParserTest');
goog.setTestOnly('goog.net.streams.JsonStreamParserTest');

goog.require('goog.net.streams.JsonStreamParser');
goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');


// TODO(user): fuzzy tests to be added

function testEmptyStream() {
  var parser = new goog.net.streams.JsonStreamParser();
  var result = parser.parse('[]');
  assertNull(result);
}

function testEmptyStreamMore() {
  var parser = new goog.net.streams.JsonStreamParser();
  var result = parser.parse('  [   ]  ');
  assertNull(result);

  parser = new goog.net.streams.JsonStreamParser();
  result = parser.parse('  [   ');
  assertNull(result);

  result = parser.parse('  ]   ');
  assertNull(result);

  parser = new goog.net.streams.JsonStreamParser();
  assertThrows(function() {
    parser.parse(' a [   ');
  });

  parser = new goog.net.streams.JsonStreamParser();
  parser.parse(' [   ');
  assertThrows(function() {
    parser.parse(' ]  a   ');
  });
}

function testSingleMessage() {
  var parser = new goog.net.streams.JsonStreamParser();
  var result = parser.parse('[{"a" : "b"}]');
  assertEquals(1, result.length);
  assertEquals('b', result[0].a);
}

function testSingleMessageInChunks() {
  var parser = new goog.net.streams.JsonStreamParser();
  var result = parser.parse('[{"a" : ');
  assertNull(result);
  result = parser.parse('"b"}]');
  assertEquals(1, result.length);
  assertEquals('b', result[0].a);

  parser = new goog.net.streams.JsonStreamParser();
  result = parser.parse('[ {  "a" : ');
  assertNull(result);
  result = parser.parse('"b"} ');
  assertEquals(1, result.length);
  assertEquals('b', result[0].a);

  result = parser.parse('] ');
  assertNull(result);
}

function testTwoMessages() {
  var parser = new goog.net.streams.JsonStreamParser();
  var result = parser.parse('[{"a" : "b"}, {"c" : "d"}]');
  assertEquals(2, result.length);
  assertEquals('b', result[0].a);
  assertEquals('d', result[1].c);
}

function testTwoMessagesInChunks() {
  var parser = new goog.net.streams.JsonStreamParser();
  var result = parser.parse('[{"a" : "b"}, ');
  assertEquals(1, result.length);
  assertEquals('b', result[0].a);
  result = parser.parse('{"c" : "d"} ');
  assertEquals(1, result.length);
  assertEquals('d', result[0].c);
  result = parser.parse('] ');
  assertNull(result);
  assertThrows(function() {
    parser.parse('  a   ');
  });
}
