// Copyright 2014 The Closure Library Authors. All Rights Reserved.
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

/** @fileoverview Unit tests for SafeScript and its builders. */

goog.module('goog.html.safeScriptTest');
goog.setTestOnly();

const Const = goog.require('goog.string.Const');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const SafeScript = goog.require('goog.html.SafeScript');
const googObject = goog.require('goog.object');
const testSuite = goog.require('goog.testing.testSuite');
const trustedtypes = goog.require('goog.html.trustedtypes');

const stubs = new PropertyReplacer();
const policy = goog.createTrustedTypesPolicy('closure_test');

testSuite({
  tearDown() {
    stubs.reset();
  },

  testSafeScript() {
    const script = 'var string = \'hello\';';
    const safeScript = SafeScript.fromConstant(Const.from(script));
    const extracted = SafeScript.unwrap(safeScript);
    assertEquals(script, extracted);
    assertEquals(script, safeScript.getTypedStringValue());
    assertEquals(`SafeScript{${script}}`, String(safeScript));

    // Interface marker is present.
    assertTrue(safeScript.implementsGoogStringTypedString);
  },

  /** @suppress {checkTypes} */
  testUnwrap() {
    const privateFieldName = 'privateDoNotAccessOrElseSafeScriptWrappedValue_';
    const markerFieldName =
        'SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_';
    const propNames =
        googObject.getKeys(SafeScript.fromConstant(Const.from('')));
    assertContains(privateFieldName, propNames);
    assertContains(markerFieldName, propNames);
    const evil = {};
    evil[privateFieldName] = 'var string = \'evil\';';
    evil[markerFieldName] = {};

    const exception = assertThrows(() => {
      SafeScript.unwrap(evil);
    });
    assertContains('expected object of type SafeScript', exception.message);
  },

  testUnwrapTrustedScript() {
    let safeValue = SafeScript.fromConstant(Const.from('script'));
    let trustedValue = SafeScript.unwrapTrustedScript(safeValue);
    assertEquals(safeValue.getTypedStringValue(), trustedValue);
    stubs.set(trustedtypes, 'PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY', policy);
    safeValue = SafeScript.fromConstant(Const.from('script'));
    trustedValue = SafeScript.unwrapTrustedScript(safeValue);
    assertEquals(safeValue.getTypedStringValue(), trustedValue.toString());
    assertTrue(
        goog.global.TrustedScript ? trustedValue instanceof TrustedScript :
                                    goog.isString(trustedValue));
  },

  testFromConstant_allowsEmptyString() {
    assertEquals(SafeScript.EMPTY, SafeScript.fromConstant(Const.from('')));
  },

  testEmpty() {
    assertEquals('', SafeScript.unwrap(SafeScript.EMPTY));
  },

  testFromConstantAndArgs() {
    const script = SafeScript.fromConstantAndArgs(
        Const.from(
            'function(str, num, nul, json) { foo(str, num, nul, json); }'),
        'hello world', 42, null, {'foo': 'bar'});
    assertEquals(
        '(function(str, num, nul, json) { foo(str, num, nul, json); })' +
            '("hello world", 42, null, {"foo":"bar"});',
        SafeScript.unwrap(script));
  },

  testFromConstantAndArgs_escaping() {
    const script = SafeScript.fromConstantAndArgs(
        Const.from('function(str) { alert(str); }'), '</script</script');
    assertEquals(
        '(function(str) { alert(str); })' +
            '("\\x3c/script\\x3c/script");',
        SafeScript.unwrap(script));
  },

  testFromConstantAndArgs_eval() {
    const script = SafeScript.fromConstantAndArgs(
        Const.from('function(arg1, arg2) { return arg1 * arg2; }'), 21, 2);
    const result = eval(SafeScript.unwrap(script));
    assertEquals(42, result);
  },

  testFromJson() {
    const json = SafeScript.fromJson({'a': 1, 'b': this.testFromJson});
    assertEquals('{"a":1}', SafeScript.unwrap(json));
  },
});
