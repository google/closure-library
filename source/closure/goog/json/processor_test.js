// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.json.processorTest');
goog.setTestOnly();

const NativeJsonProcessor = goog.require('goog.json.NativeJsonProcessor');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let SUPPORTS_NATIVE_JSON = false;

var REPLACER = function(k, v) {
  return !!k ? v + 'd' : v;
};

var REVIVER = function(k, v) {
  return !!k ? v.substring(0, v.length - 1) : v;
};

// Just sanity check parsing and stringifying.
// Thorough tests are in json_test.html.

function runParsingTest(parser, input, expected) {
  assertEquals(expected, parser.stringify(parser.parse(input)));
}
testSuite({
  setUpPage() {
    SUPPORTS_NATIVE_JSON = goog.global['JSON'] &&
        !(userAgent.GECKO && !userAgent.isVersionOrHigher('5.0'));
  },

  testNativeParser() {
    if (!SUPPORTS_NATIVE_JSON) {
      return;
    }
    const json = '{"a":1,"b":{"c":2}}';
    runParsingTest(new NativeJsonProcessor(), json, json);
  },

  testNativeParser_withReplacer() {
    if (!SUPPORTS_NATIVE_JSON) {
      return;
    }
    runParsingTest(
        new NativeJsonProcessor(REPLACER), '{"a":"foo","b":"goo"}',
        '{"a":"food","b":"good"}');
  },

  testNativeParser_withReviver() {
    if (!SUPPORTS_NATIVE_JSON) {
      return;
    }
    const json = '{"a":"fod","b":"god"}';
    runParsingTest(new NativeJsonProcessor(REPLACER, REVIVER), json, json);
  },
});
