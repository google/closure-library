// Copyright 2016 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.testing.MockUtilTest');

goog.require('goog.testing.MockUtil');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.testing.MockUtilTest');



function testEnumerableProperties() {
  var obj = {a: function() {}, b: 'b', c: function(x) {}};
  assertSameElements(
      ['a', 'b', 'c'], goog.testing.MockUtil.getAllProperties(obj));
}

function testNonEnumerableProperties() {
  var obj = {};
  try {
    Object.defineProperty(obj, 'foo', {value: 'bar', enumerable: false});
  } catch (ex) {
    // IE8 doesn't allow Object.defineProperty on non-DOM elements.
    if (ex.message == 'Object doesn\'t support this action') {
      return;
    }
  }

  var expected = goog.isDef(Object.getOwnPropertyNames) ? ['foo'] : [];
  assertSameElements(expected, goog.testing.MockUtil.getAllProperties(obj));
}

function testInheritedProperties() {
  var parent = function() {};
  parent.prototype.a = null;

  var child = function() {};
  goog.inherits(child, parent);
  child.prototype.b = null;

  var expected = ['a', 'b'];
  if (goog.isDef(Object.getOwnPropertyNames)) {
    expected.push('constructor');
  }

  assertSameElements(
      expected, goog.testing.MockUtil.getAllProperties(child.prototype));
}

function testEs6ClassProperties() {
  // Create an ES6 class via eval so we can bail out if it's a syntax error in
  // browsers that don't support ES6 classes.
  try {
    eval(
        'var Foo = class {' +
        '  a() {}' +
        '};' +
        'Foo.prototype.b = null;' +
        'var Bar = class extends Foo {' +
        '  c() {}' +
        '};');
  } catch (e) {
    if (e instanceof SyntaxError) {
      return;
    }
  }

  assertSameElements(
      ['a', 'b', 'constructor'],
      goog.testing.MockUtil.getAllProperties(Foo.prototype));
  assertSameElements(
      ['a', 'b', 'c', 'constructor'],
      goog.testing.MockUtil.getAllProperties(Bar.prototype));
}
