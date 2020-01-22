/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.json.processorTest');
goog.setTestOnly();

const NativeJsonProcessor = goog.require('goog.json.NativeJsonProcessor');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let SUPPORTS_NATIVE_JSON = false;

const REPLACER = function(k, v) {
  return !!k ? v + 'd' : v;
};

const REVIVER = function(k, v) {
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
