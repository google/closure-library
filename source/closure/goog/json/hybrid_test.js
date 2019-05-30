// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

/** @fileoverview Unit tests for hybrid. */

goog.module('goog.json.hybridTest');
goog.setTestOnly();

const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const googJson = goog.require('goog.json');
const hybrid = goog.require('goog.json.hybrid');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

const propertyReplacer = new PropertyReplacer();

let jsonParse;
let jsonStringify;
let googJsonParse;
let googJsonSerialize;

function isIe7() {
  return userAgent.IE && !userAgent.isVersionOrHigher('8');
}

function parseJson() {
  const obj = hybrid.parse('{"a": 2}');
  assertObjectEquals({'a': 2}, obj);
}

function serializeJson() {
  const str = hybrid.stringify({b: 2});
  assertEquals('{"b":2}', str);
}

testSuite({
  setUp() {
    googJsonParse = recordFunction(googJson.parse);
    googJsonSerialize = recordFunction(googJson.serialize);

    propertyReplacer.set(googJson, 'parse', googJsonParse);
    propertyReplacer.set(googJson, 'serialize', googJsonSerialize);

    jsonParse = recordFunction(goog.global.JSON && goog.global.JSON.parse);
    jsonStringify =
        recordFunction(goog.global.JSON && goog.global.JSON.stringify);

    if (goog.global.JSON) {
      propertyReplacer.set(goog.global.JSON, 'parse', jsonParse);
      propertyReplacer.set(goog.global.JSON, 'stringify', jsonStringify);
    }
  },

  tearDown() {
    propertyReplacer.reset();
  },

  testParseNativeJsonPresent() {
    // No native JSON in IE7
    if (isIe7()) {
      return;
    }

    parseJson();
    assertEquals(1, jsonParse.getCallCount());
    assertEquals(0, googJsonParse.getCallCount());
  },

  testStringifyNativeJsonPresent() {
    // No native JSON in IE7
    if (isIe7()) {
      return;
    }

    serializeJson();

    assertEquals(1, jsonStringify.getCallCount());
    assertEquals(0, googJsonSerialize.getCallCount());
  },

  testParseNativeJsonAbsent() {
    propertyReplacer.set(goog.global, 'JSON', null);

    parseJson();

    assertEquals(0, jsonParse.getCallCount());
    assertEquals(0, jsonStringify.getCallCount());
    assertEquals(1, googJsonParse.getCallCount());
  },

  testStringifyNativeJsonAbsent() {
    propertyReplacer.set(goog.global, 'JSON', null);

    serializeJson();

    assertEquals(0, jsonStringify.getCallCount());
    assertEquals(1, googJsonSerialize.getCallCount());
  },

  testParseCurrentBrowserParse() {
    parseJson();
    assertEquals(isIe7() ? 0 : 1, jsonParse.getCallCount());
    assertEquals(isIe7() ? 1 : 0, googJsonParse.getCallCount());
  },

  testParseCurrentBrowserStringify() {
    serializeJson();
    assertEquals(isIe7() ? 0 : 1, jsonStringify.getCallCount());
    assertEquals(isIe7() ? 1 : 0, googJsonSerialize.getCallCount());
  },
});
