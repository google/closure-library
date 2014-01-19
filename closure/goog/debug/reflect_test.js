// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.debug.reflectTest');
goog.setTestOnly('goog.debug.reflectTest');

goog.require('goog.debug.reflect');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

var typeOf = goog.debug.reflect.typeOf;
var className = goog.debug.reflect.className;

function testBasicTypes() {
  assertEquals('undefined', typeOf(undefined));
  assertEquals('null', typeOf(null));
  assertEquals('boolean', typeOf(false));
  assertEquals('number', typeOf(0));
  assertEquals('string', typeOf(''));

  assertUndefined(className(undefined));
  assertUndefined(className(null));
  assertUndefined(className(false));
  assertUndefined(className(0));
  assertUndefined(className(''));
}

function testWrapperTypes() {
  assertEquals('Boolean', typeOf(new Boolean(false)));
  assertEquals('Number', typeOf(new Number(0)));
  assertEquals('String', typeOf(new String('')));

  assertEquals('Boolean', className(Boolean));
  assertEquals('Number', className(Number));
  assertEquals('String', className(String));
}

function testBuiltInTypes() {
  assertEquals('Array', typeOf([]));
  assertEquals('Date', typeOf(new Date));
  assertEquals('Error', typeOf(new Error));
  assertEquals('Function', typeOf(function() {}));
  assertEquals('Object', typeOf({}));
  assertEquals('RegExp', typeOf(/./));

  assertEquals('Array', className(Array));
  assertEquals('Date', className(Date));
  assertEquals('Error', className(Error));
  assertEquals('Object', className(Object));
}

function testGoogProvidedTypes() {
  // Force type map reinitialization with the goog.provided types.
  delete goog.debug.reflect.typeMap_;

  goog.provide('x.a');
  x.a = function() {};
  x.a.b = function() {};

  assertEquals('Object', typeOf(x));
  assertEquals('x.a', typeOf(new x.a));
  assertEquals('Object', typeOf(new x.a.b));

  assertUndefined(className(x));
  assertEquals('x.a', className(x.a));
  assertUndefined(className(x.a.b));
}

function testUnregisteredTypes() {
  var oldIE = goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(8);
  assertEquals(oldIE ? 'ActiveXObject' : 'HTMLDocument', typeOf(document));

  var expectedTypeOfBody = oldIE ? 'ActiveXObject' : 'HTMLBodyElement';
  assertEquals(expectedTypeOfBody, typeOf(document.body));

  var expectedTypeOfWindow = 'Window';
  if (goog.userAgent.WEBKIT || goog.userAgent.OPERA) {
    // Note: window.constructor.name is 'DOMWindow' in Chrome but the type
    // DOMWindow is not exposed to JavaScript.
    expectedTypeOfWindow = 'Object';
  }
  if (oldIE) {
    expectedTypeOfWindow = 'ActiveXObject';
  }
  assertEquals(expectedTypeOfWindow, typeOf(window));
}
