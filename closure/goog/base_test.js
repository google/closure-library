// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for Closure's base.js.
 */

goog.provide('goog.baseTest');

goog.setTestOnly('goog.baseTest');

goog.require('goog.Promise');
// Used to test dynamic loading works, see testRequire*
goog.require('goog.Timer');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.functions');
goog.require('goog.object');
goog.require('goog.test_module');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');
goog.require('goog.userAgent');

var earlyTestModuleGet = goog.module.get('goog.test_module');

/**
 * @param {?} name
 * @return {?}
 */
function getFramedVars(name) {
  var w = window.frames[name];
  var doc = w.document;
  doc.open();
  doc.write(
      '<script>' +
      'var a = [0, 1, 2];' +
      'var o = {a: 0, b: 1};' +
      'var n = 42;' +
      'var b = true;' +
      'var s = "string";' +
      'var nv = null;' +
      'var u = undefined;' +
      'var fv = function(){};' +
      '</' +
      'script>');
  doc.close();
  return {
    'array': w.a,
    'object': w.o,
    'number': w.n,
    'boolean': w.b,
    'string': w.s,
    'functionVar': w.fv,
    'nullVar': w.nv,
    'undefinedVar': w.u
  };
}

var framedVars = getFramedVars('f1');
var framedVars2 = getFramedVars('f2');
// remove iframe
var iframeElement = document.getElementById('f2');
iframeElement.parentNode.removeChild(iframeElement);
var stubs = new goog.testing.PropertyReplacer();
var originalGoogBind = goog.bind;

function tearDown() {
  goog.setCssNameMapping(undefined);
  stubs.reset();
  goog.bind = originalGoogBind;
}

function testLibrary() {
  assertNotUndefined("'goog' not loaded", goog);
}

function testDefine() {
  goog.define('SOME_DEFINE', 123);  // overridden by 456
  assertEquals(SOME_DEFINE, 456);

  goog.define('SOME_OTHER_DEFINE', 123);  // not overridden
  assertEquals(SOME_OTHER_DEFINE, 123);

  goog.provide('ns');

  goog.define('ns.SOME_DEFINE', 123);  // overridden by 456
  assertEquals(SOME_DEFINE, 456);

  goog.define('ns.SOME_OTHER_DEFINE', 123);  // not overridden
  assertEquals(SOME_OTHER_DEFINE, 123);
}

function testProvide() {
  goog.provide('goog.test.name.space');
  assertNotUndefined('provide failed: goog.test', goog.test);
  assertNotUndefined('provide failed: goog.test.name', goog.test.name);
  assertNotUndefined(
      'provide failed: goog.test.name.space', goog.test.name.space);

  // ensure that providing 'goog.test.name' doesn't throw an exception
  goog.provide('goog.test');
  goog.provide('goog.test.name');

  delete goog.test;
}

function testProvideStrictness() {
  goog.provide('goog.xy');
  assertProvideFails('goog.xy');

  goog.provide('goog.xy.z');
  assertProvideFails('goog.xy');

  window['goog']['xyz'] = 'Bob';
  assertProvideFails('goog.xyz');

  delete goog.xy;
  delete goog.xyz;
}

/** @param {?} namespace */
function assertProvideFails(namespace) {
  assertThrows(
      'goog.provide(' + namespace + ') should have failed',
      goog.partial(goog.provide, namespace));
}

function testIsProvided() {
  goog.provide('goog.explicit');
  assertTrue(goog.isProvided_('goog.explicit'));
  goog.provide('goog.implicit.explicit');
  assertFalse(goog.isProvided_('goog.implicit'));
  assertTrue(goog.isProvided_('goog.implicit.explicit'));
}

function testGlobalize() {
  var a = {a: 1, b: 2, c: 3};
  var b = {};
  goog.globalize(a, b);
  assertNotUndefined('Globalize to arbitrary object', b.a);
  assertNotUndefined('Globalize to arbitrary object', b.b);
  assertNotUndefined('Globalize to arbitrary object', b.c);
}

function testExportSymbol() {
  var date = new Date();

  assertTrue(typeof nodots == 'undefined');
  goog.exportSymbol('nodots', date);
  assertEquals(date, nodots);
  nodots = undefined;

  assertTrue(typeof gotcher == 'undefined');
  goog.exportSymbol('gotcher.dots.right.Here', date);
  assertEquals(date, gotcher.dots.right.Here);
  gotcher = undefined;

  goog.provide('an.existing.path');
  assertNotNull(an.existing.path);
  goog.exportSymbol('an.existing.path', date);
  assertEquals(date, an.existing.path);
  an = undefined;

  var foo = {foo: 'foo'};
  var bar = {bar: 'bar'};
  var baz = {baz: 'baz'};
  goog.exportSymbol('one.two.three.Four', foo);
  goog.exportSymbol('one.two.three.five', bar);
  goog.exportSymbol('one.two.six', baz);
  assertEquals(foo, one.two.three.Four);
  assertEquals(bar, one.two.three.five);
  assertEquals(baz, one.two.six);

  var win = {};
  var fooBar = {foo: 'foo', bar: 'bar'};
  goog.exportSymbol('one.two.four', fooBar, win);
  assertEquals(fooBar, win.one.two.four);
  assertTrue('four' in win.one.two);
  assertFalse('four' in one.two);
  one = undefined;
}

goog.exportSymbol('exceptionTest', function() { throw Error('ERROR'); });

function testExportSymbolExceptions() {
  var e = assertThrows(
      'Exception wasn\'t thrown by exported function', exceptionTest);
  assertEquals('Unexpected error thrown', 'ERROR', e.message);
}

//=== tests for Require logic ===

function testRequireClosure() {
  assertNotUndefined('goog.Timer should be available', goog.Timer);
  assertNotUndefined(
      'goog.events.EventTarget should be available',
      /** @suppress {missingRequire} */ goog.events.EventTarget);
}

function testRequireWithExternalDuplicate() {
  // Do a provide without going via goog.require. Then goog.require it
  // indirectly and ensure it doesn't cause a duplicate script.
  goog.addDependency('dup.js', ['dup.base'], []);
  goog.addDependency('dup-child.js', ['dup.base.child'], ['dup.base']);
  goog.provide('dup.base');

  stubs.set(goog, 'isDocumentFinishedLoading_', false);
  stubs.set(goog.global, 'CLOSURE_IMPORT_SCRIPT', function(src) {
    if (src == goog.basePath + 'dup.js') {
      fail('Duplicate script written!');
    } else if (src == goog.basePath + 'dup-child.js') {
      // Allow expected script.
      return true;
    } else {
      // Avoid affecting other state.
      return false;
    }
  });

  // To differentiate this call from the real one.
  var require = goog.require;
  require('dup.base.child');
}

//=== tests for language enhancements ===

function testTypeOf() {
  assertEquals('array', goog.typeOf([]));
  assertEquals('string', goog.typeOf('string'));
  assertEquals('number', goog.typeOf(123));
  assertEquals('null', goog.typeOf(null));
  assertEquals('undefined', goog.typeOf(undefined));
  assertEquals('object', goog.typeOf({}));
  assertEquals('function', goog.typeOf(function() {}));

  // Make sure that NodeList is not treated as an array... NodeLists should
  // be of type object but Safari incorrectly reports it as function so a not
  // equals test will have to suffice here.
  assertNotEquals('array', goog.typeOf(document.getElementsByName('*')));
  assertNotEquals('function', goog.typeOf(document.getElementsByName('*')));
  assertEquals('object', goog.typeOf(document.getElementsByName('*')));
}

function testTypeOfFramed() {
  assertEquals('array', goog.typeOf(framedVars.array));
  assertEquals('string', goog.typeOf(framedVars.string));
  assertEquals('number', goog.typeOf(framedVars.number));
  assertEquals('null', goog.typeOf(framedVars.nullVar));
  assertEquals('undefined', goog.typeOf(framedVars.undefinedVar));
  assertEquals('object', goog.typeOf(framedVars.object));
  assertEquals('function', goog.typeOf(framedVars.functionVar));

  // Opera throws when trying to do cross frame typeof on node lists.
  // IE behaves very strange when it comes to DOM nodes on disconnected frames.
}

function testTypeOfFramed2() {
  assertEquals('array', goog.typeOf(framedVars2.array));
  assertEquals('string', goog.typeOf(framedVars2.string));
  assertEquals('number', goog.typeOf(framedVars2.number));
  assertEquals('null', goog.typeOf(framedVars2.nullVar));
  assertEquals('undefined', goog.typeOf(framedVars2.undefinedVar));
  assertEquals('object', goog.typeOf(framedVars2.object));
  assertEquals('function', goog.typeOf(framedVars2.functionVar));

  // Opera throws when trying to do cross frame typeof on node lists.
  // IE behaves very strange when it comes to DOM nodes on disconnected frames.
}

function testIsDef() {
  var defined = 'foo';
  var nullVar = null;
  var notDefined;

  assertTrue('defined should be defined', goog.isDef(defined));
  assertTrue('null should be defined', goog.isDef(nullVar));
  assertFalse('undefined should not be defined', goog.isDef(notDefined));
}

function testIsDefAndNotNull() {
  assertTrue('string is defined and non-null', goog.isDefAndNotNull(''));
  assertTrue('object is defined and non-null', goog.isDefAndNotNull({}));
  assertTrue(
      'function is defined and non-null',
      goog.isDefAndNotNull(goog.nullFunction));
  assertTrue('zero is defined and non-null', goog.isDefAndNotNull(0));
  assertFalse('null', goog.isDefAndNotNull(null));
  assertFalse('undefined', goog.isDefAndNotNull(undefined));
}

function testIsNull() {
  var notNull = 'foo';
  var nullVar = null;
  var notDefined;

  assertFalse('defined should not be null', goog.isNull(notNull));
  assertTrue('null should be null', goog.isNull(nullVar));
  assertFalse('undefined should not be null', goog.isNull(notDefined));
}

function testIsArray() {
  var array = [1, 2, 3];
  var arrayWithLengthSet = [1, 2, 3];
  arrayWithLengthSet.length = 2;
  var objWithArrayFunctions = {slice: function() {}, length: 0};
  var object = {a: 1, b: 2, c: 3};
  var nullVar = null;
  var notDefined;
  var elem = document.getElementById('elem');
  var text = document.getElementById('text').firstChild;
  var impostor = document.body.getElementsByTagName('BOGUS');
  impostor.push = Array.prototype.push;
  impostor.pop = Array.prototype.pop;
  impostor.slice = Array.prototype.slice;
  impostor.splice = Array.prototype.splice;

  assertTrue('array should be an array', goog.isArray(array));
  assertTrue(
      'arrayWithLengthSet should be an array',
      goog.isArray(arrayWithLengthSet));
  assertFalse(
      'object with array functions should not be an array unless ' +
          'length is not enumerable',
      goog.isArray(objWithArrayFunctions));
  assertFalse('object should not be an array', goog.isArray(object));
  assertFalse('null should not be an array', goog.isArray(nullVar));
  assertFalse('undefined should not be an array', goog.isArray(notDefined));
  assertFalse('NodeList should not be an array', goog.isArray(elem.childNodes));
  assertFalse('TextNode should not be an array', goog.isArray(text));
  assertTrue(
      'Array of nodes should be an array',
      goog.isArray([elem.firstChild, elem.lastChild]));
  assertFalse('An impostor should not be an array', goog.isArray(impostor));
}

function testTypeOfAcrossWindow() {
  if (goog.userAgent.IE && goog.userAgent.isVersionOrHigher('10') &&
      !goog.userAgent.isVersionOrHigher('11')) {
    // TODO(johnlenz): This test is flaky on IE10 (passing 90+% of the time).
    // When it flakes the values are undefined which appears to indicate the
    // script did not run in the opened window and not a failure of the logic
    // we are trying to test.
    return;
  }

  var w = window.open('', 'blank');
  if (w) {
    try {
      var d = w.document;
      d.open();
      d.write(
          '<script>function fun(){};' +
          'var arr = [];' +
          'var x = 42;' +
          'var s = "";' +
          'var b = true;' +
          'var obj = {length: 0, splice: {}, call: {}};' +
          '</' +
          'script>');
      d.close();

      assertEquals('function', goog.typeOf(w.fun));
      assertEquals('array', goog.typeOf(w.arr));
      assertEquals('number', goog.typeOf(w.x));
      assertEquals('string', goog.typeOf(w.s));
      assertEquals('boolean', goog.typeOf(w.b));
      assertEquals('object', goog.typeOf(w.obj));
    } finally {
      w.close();
    }
  }
}

function testIsArrayLike() {
  var array = [1, 2, 3];
  var objectWithNumericLength = {length: 2};
  var objectWithNonNumericLength = {length: 'a'};
  var object = {a: 1, b: 2};
  var nullVar = null;
  var notDefined;
  var elem = document.getElementById('elem');
  var text = document.getElementById('text').firstChild;

  assertTrue('array should be array-like', goog.isArrayLike(array));
  assertTrue(
      'obj w/numeric length should be array-like',
      goog.isArrayLike(objectWithNumericLength));
  assertFalse(
      'obj w/non-numeric length should not be array-like',
      goog.isArrayLike(objectWithNonNumericLength));
  assertFalse('object should not be array-like', goog.isArrayLike(object));
  assertFalse('null should not be array-like', goog.isArrayLike(nullVar));
  assertFalse(
      'undefined should not be array-like', goog.isArrayLike(notDefined));
  assertTrue(
      'NodeList should be array-like', goog.isArrayLike(elem.childNodes));
  // TODO(attila): Fix isArrayLike to return false for text nodes!
  // assertFalse('TextNode should not be array-like', goog.isArrayLike(text));
  assertTrue(
      'Array of nodes should be array-like',
      goog.isArrayLike([elem.firstChild, elem.lastChild]));
}


/**
 * Use mock date in testIsDateLike() rather than a real goog.date.Date to
 * minimize dependencies in this unit test.
 */
function MockGoogDate() {}

/** @return {number} */
MockGoogDate.prototype.getFullYear = function() {
  return 2007;
};


function testIsDateLike() {
  var jsDate = new Date();
  var googDate = new MockGoogDate();
  var string = 'foo';
  var number = 1;
  var nullVar = null;
  var notDefined;

  assertTrue('js Date should be date-like', goog.isDateLike(jsDate));
  assertTrue('goog Date should be date-like', goog.isDateLike(googDate));
  assertFalse('string should not be date-like', goog.isDateLike(string));
  assertFalse('number should not be date-like', goog.isDateLike(number));
  assertFalse('nullVar should not be date-like', goog.isDateLike(nullVar));
  assertFalse('undefined should not be date-like', goog.isDateLike(notDefined));
}

function testIsString() {
  var string = 'foo';
  var number = 2;
  var nullVar = null;
  var notDefined;

  assertTrue('string should be a string', goog.isString(string));
  assertFalse('number should not be a string', goog.isString(number));
  assertFalse('null should not be a string', goog.isString(nullVar));
  assertFalse('undefined should not be a string', goog.isString(notDefined));
}

function testIsBoolean() {
  var b = true;
  var s = 'true';
  var num = 1;
  var nullVar = null;
  var notDefined;

  assertTrue('boolean should be a boolean', goog.isBoolean(b));
  assertFalse('string should not be a boolean', goog.isBoolean(s));
  assertFalse('number should not be a boolean', goog.isBoolean(num));
  assertFalse('null should not be a boolean', goog.isBoolean(nullVar));
  assertFalse('undefined should not be a boolean', goog.isBoolean(notDefined));
}

function testIsNumber() {
  var number = 1;
  var string = '1';
  var nullVar = null;
  var notDefined;

  assertTrue('number should be a number', goog.isNumber(number));
  assertFalse('string should not be a number', goog.isNumber(string));
  assertFalse('null should not be a number', goog.isNumber(nullVar));
  assertFalse('undefined should not be a number', goog.isNumber(notDefined));
}

function testIsFunction() {
  var func = function() { return 1; };
  var object = {a: 1, b: 2};
  var nullVar = null;
  var notDefined;

  assertTrue('function should be a function', goog.isFunction(func));
  assertFalse('object should not be a function', goog.isFunction(object));
  assertFalse('null should not be a function', goog.isFunction(nullVar));
  assertFalse(
      'undefined should not be a function', goog.isFunction(notDefined));
}

function testIsObject() {
  var object = {a: 1, b: 2};
  var string = 'b';
  var nullVar = null;
  var notDefined;
  var array = [0, 1, 2];
  var fun = function() {};

  assertTrue('object should be an object', goog.isObject(object));
  assertTrue('array should be an object', goog.isObject(array));
  assertTrue('function should be an object', goog.isObject(fun));
  assertFalse('string should not be an object', goog.isObject(string));
  assertFalse('null should not be an object', goog.isObject(nullVar));
  assertFalse('undefined should not be an object', goog.isObject(notDefined));
}


//=== tests for unique ID methods ===

function testGetUid() {
  var a = {};
  var b = {};
  var c = {};

  var uid1 = goog.getUid(a);
  var uid2 = goog.getUid(b);
  var uid3 = goog.getUid(c);

  assertNotEquals('Unique IDs must be unique', uid1, uid2);
  assertNotEquals('Unique IDs must be unique', uid1, uid3);
  assertNotEquals('Unique IDs must be unique', uid2, uid3);
}

function testHasUid() {
  var a = {};

  assertFalse(goog.hasUid(a));
  assertFalse(goog.UID_PROPERTY_ in a);

  var uid = goog.getUid(a);
  assertTrue(goog.hasUid(a));
  assertEquals(uid, goog.getUid(a));
}

function testRemoveUidFromPlainObject() {
  var a = {};
  var uid = goog.getUid(a);
  goog.removeUid(a);
  assertNotEquals(
      "An object's old and new unique IDs should be different", uid,
      goog.getUid(a));
}

function testRemoveUidFromObjectWithoutUid() {
  var a = {};
  // Removing a unique ID should not fail even if it did not exist
  goog.removeUid(a);
}

function testRemoveUidFromNode() {
  var node = goog.dom.createElement(goog.dom.TagName.DIV);
  var nodeUid = goog.getUid(node);
  goog.removeUid(node);
  assertNotEquals(
      "A node's old and new unique IDs should be different", nodeUid,
      goog.getUid(node));
}

function testConstructorUid() {
  function BaseClass() {}
  function SubClass() {}
  goog.inherits(SubClass, BaseClass);

  var baseClassUid = goog.getUid(BaseClass);
  var subClassUid = goog.getUid(SubClass);

  assertTrue(
      'Unique ID of BaseClass must be a number',
      typeof baseClassUid == 'number');
  assertTrue(
      'Unique ID of SubClass must be a number', typeof subClassUid == 'number');
  assertNotEquals(
      'Unique IDs of BaseClass and SubClass must differ', baseClassUid,
      subClassUid);
  assertNotEquals(
      'Unique IDs of BaseClass and SubClass instances must differ',
      goog.getUid(new BaseClass), goog.getUid(new SubClass));

  assertEquals(
      'Unique IDs of BaseClass.prototype and SubClass.prototype ' +
          'should differ, but to keep the implementation simple, we do not ' +
          'handle this edge case.',
      goog.getUid(BaseClass.prototype), goog.getUid(SubClass.prototype));
}


/**
 * Tests against Chrome bug where the re-created element will have the uid
 * property set but undefined. See bug 1252508.
 */
function testUidNotUndefinedOnReusedElement() {
  var div = goog.dom.createElement(goog.dom.TagName.DIV);
  document.body.appendChild(div);
  div.innerHTML = '<form id="form"></form>';
  var span = goog.dom.getElementsByTagName(goog.dom.TagName.FORM, div)[0];
  goog.getUid(span);

  div.innerHTML = '<form id="form"></form>';
  var span2 = goog.dom.getElementsByTagName(goog.dom.TagName.FORM, div)[0];
  assertNotUndefined(goog.getUid(span2));
}

function testWindowUid() {
  var uid = goog.getUid(window);
  assertTrue('window unique id is a number', goog.isNumber(uid));
  assertEquals('returns the same id second time', uid, goog.getUid(window));
  goog.removeUid(window);
  assertNotEquals(
      'generates new id after the old one is removed', goog.getUid(window));
}

//=== tests for clone method ===

function testClonePrimitive() {
  assertEquals(
      'cloning a primitive should return an equal primitive', 5,
      goog.cloneObject(5));
}

function testCloneObjectThatHasACloneMethod() {
  var original = {
    name: 'original',
    clone: function() { return {name: 'clone'}; }
  };

  var clone = goog.cloneObject(original);
  assertEquals('original', original.name);
  assertEquals('clone', clone.name);
}

function testCloneFlatObject() {
  var original = {a: 1, b: 2, c: 3};
  var clone = goog.cloneObject(original);
  assertNotEquals(original, clone);
  assertEquals(1, clone.a);
  assertEquals(2, clone.b);
  assertEquals(3, clone.c);
}

function testCloneDeepObject() {
  var original = {a: 1, b: {c: 2, d: 3}, e: {f: {g: 4, h: 5}}};
  var clone = goog.cloneObject(original);

  assertNotEquals(original, clone);
  assertNotEquals(original.b, clone.b);
  assertNotEquals(original.e, clone.e);

  assertEquals(1, clone.a);
  assertEquals(2, clone.b.c);
  assertEquals(3, clone.b.d);
  assertEquals(4, clone.e.f.g);
  assertEquals(5, clone.e.f.h);
}

function testCloneFunctions() {
  var original = {f: function() { return 'hi'; }};
  var clone = goog.cloneObject(original);

  assertNotEquals(original, clone);
  assertEquals('hi', clone.f());
  assertEquals(original.f, clone.f);
}


//=== tests for bind() and friends ===

// Function.prototype.bind and Function.prototype.partial are purposefullly
// not defined in open sourced Closure.  These functions sniff for their
// presence.

var foo = 'global';
var obj = {foo: 'obj'};

/**
 * @param {?} arg1
 * @param {?} arg2
 * @return {?}
 */
function getFoo(arg1, arg2) {
  return {foo: this.foo, arg1: arg1, arg2: arg2};
}

function testBindWithoutObj() {
  if (Function.prototype.bind) {
    assertEquals(foo, getFoo.bind()().foo);
  }
}

function testBindWithObj() {
  if (Function.prototype.bind) {
    assertEquals(obj.foo, getFoo.bind(obj)().foo);
  }
}

function testBindWithNullObj() {
  if (Function.prototype.bind) {
    assertEquals(foo, getFoo.bind()().foo);
  }
}

function testBindStaticArgs() {
  if (Function.prototype.bind) {
    var fooprime = getFoo.bind(obj, 'hot', 'dog');
    var res = fooprime();
    assertEquals(obj.foo, res.foo);
    assertEquals('hot', res.arg1);
    assertEquals('dog', res.arg2);
  }
}

function testBindDynArgs() {
  if (Function.prototype.bind) {
    var res = getFoo.bind(obj)('hot', 'dog');
    assertEquals(obj.foo, res.foo);
    assertEquals('hot', res.arg1);
    assertEquals('dog', res.arg2);
  }
}

function testBindCurriedArgs() {
  if (Function.prototype.bind) {
    var res = getFoo.bind(obj, 'hot')('dog');
    assertEquals(obj.foo, res.foo);
    assertEquals('hot', res.arg1);
    assertEquals('dog', res.arg2);
  }
}

function testBindDoubleBind() {
  var getFooP = goog.bind(getFoo, obj, 'hot');
  var getFooP2 = goog.bind(getFooP, null, 'dog');

  var res = getFooP2();
  assertEquals("res.arg1 should be 'hot'", 'hot', res.arg1);
  assertEquals("res.arg2 should be 'dog'", 'dog', res.arg2);
}

function testBindWithCall() {
  var obj = {};
  var obj2 = {};
  var f = function() {
    assertEquals('this should be bound to obj', obj, this);
  };
  var b = goog.bind(f, obj);
  b.call(null);
  b.call(obj2);
}

function testBindJs() {
  assertEquals(1, goog.bindJs_(add, {valueOf: function() { return 1; }})());
  assertEquals(3, goog.bindJs_(add, null, 1, 2)());
}

function testBindNative() {
  if (Function.prototype.bind &&
      Function.prototype.bind.toString().indexOf('native code') != -1) {
    assertEquals(
        1, goog.bindNative_(add, {valueOf: function() { return 1; }})());
    assertEquals(3, goog.bindNative_(add, null, 1, 2)());

    assertThrows(function() { goog.bindNative_(null, null); });
  }
}

function testBindDefault() {
  assertEquals(1, goog.bind(add, {valueOf: function() { return 1; }})());
  assertEquals(3, goog.bind(add, null, 1, 2)());
}

/**
 * @param {...?} var_args
 * @return {?}
 */
function add(var_args) {
  var sum = Number(this) || 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

function testPartial() {
  var f = function(x, y) { return x + y; };
  var g = goog.partial(f, 1);
  assertEquals(3, g(2));

  var h = goog.partial(f, 1, 2);
  assertEquals(3, h());

  var i = goog.partial(f);
  assertEquals(3, i(1, 2));
}

function testPartialUsesGlobal() {
  var f = function(x, y) {
    assertEquals(goog.global, this);
    return x + y;
  };
  var g = goog.partial(f, 1);
  var h = goog.partial(g, 2);
  assertEquals(3, h());
}

function testPartialWithCall() {
  var obj = {};
  var f = function(x, y) {
    assertEquals(obj, this);
    return x + y;
  };
  var g = goog.partial(f, 1);
  var h = goog.partial(g, 2);
  assertEquals(3, h.call(obj));
}

function testPartialAndBind() {
  // This ensures that this "survives" through a partial.
  var p = goog.partial(getFoo, 'hot');
  var b = goog.bind(p, obj, 'dog');

  var res = b();
  assertEquals(obj.foo, res.foo);
  assertEquals('hot', res.arg1);
  assertEquals('dog', res.arg2);
}

function testBindAndPartial() {
  // This ensures that this "survives" through a partial.
  var b = goog.bind(getFoo, obj, 'hot');
  var p = goog.partial(b, 'dog');

  var res = p();
  assertEquals(obj.foo, res.foo);
  assertEquals('hot', res.arg1);
  assertEquals('dog', res.arg2);
}

function testPartialMultipleCalls() {
  var f = goog.testing.recordFunction();

  var a = goog.partial(f, 'foo');
  var b = goog.partial(a, 'bar');

  a();
  a();
  b();
  b();

  assertEquals(4, f.getCallCount());

  var calls = f.getCalls();
  assertArrayEquals(['foo'], calls[0].getArguments());
  assertArrayEquals(['foo'], calls[1].getArguments());
  assertArrayEquals(['foo', 'bar'], calls[2].getArguments());
  assertArrayEquals(['foo', 'bar'], calls[3].getArguments());
}

function testGlobalEval() {
  goog.globalEval('var foofoofoo = 125;');
  assertEquals('Var should be globally assigned', 125, goog.global.foofoofoo);
  var foofoofoo = 128;
  assertEquals('Global should not have changed', 125, goog.global.foofoofoo);

  // NOTE(user): foofoofoo would normally be available in the function scope,
  // via the scope chain, but the JsUnit framework seems to do something weird
  // which makes it not work.
}

function testGlobalEvalWithHtml() {
  // Make sure we don't trip on HTML markup in the code
  goog.global.evalTestResult = 'failed';
  goog.global.evalTest = function(arg) { goog.global.evalTestResult = arg; };

  goog.globalEval('evalTest("<test>")');

  assertEquals(
      'Should be able to evaluate strings with HTML in', '<test>',
      goog.global.evalTestResult);
}


//=== tests for inherits ===

function testInherits() {
  function Foo() {}
  function Bar() {}
  goog.inherits(Bar, Foo);
  var bar = new Bar();

  assert('object should be instance of constructor', bar instanceof Bar);
  assert('object should be instance of base constructor', bar instanceof Foo);
}

function testInherits_constructor() {
  function Foo() {}
  function Bar() {}
  goog.inherits(Bar, Foo);
  var bar = new Bar();

  assertEquals(
      'constructor property should match constructor function', Bar,
      bar.constructor);
  assertEquals(
      'Superclass constructor should match constructor function', Foo,
      Bar.superClass_.constructor);
}


//=== tests for makeSingleton ===
function testMakeSingleton() {
  function Foo() {}
  goog.addSingletonGetter(Foo);

  assertNotNull('Should add get instance function', Foo.getInstance);

  var x = Foo.getInstance();
  assertNotNull('Should successfully create an object', x);

  var y = Foo.getInstance();
  assertEquals('Should return the same object', x, y);

  delete Foo.instance_;

  var z = Foo.getInstance();
  assertNotNull('Should work after clearing for testing', z);

  assertNotEquals(
      'Should return a different object after clearing for testing', x, z);
}


//=== tests for now ===

function testNow() {
  var toleranceMilliseconds = 20;  // 10 ms was not enough for IE7.
  var now1 = new Date().getTime();
  var now2 = goog.now();
  assertTrue(Math.abs(now1 - now2) < toleranceMilliseconds);
}


//=== test non-html context ===

function testInHtmlDocument() {
  var savedGoogGlobal = goog.global;
  try {
    goog.global = {};
    assertFalse(goog.inHtmlDocument_());
    goog.global.document = {};
    assertFalse(goog.inHtmlDocument_());
    goog.global.document.write = function() {};
    assertTrue(goog.inHtmlDocument_());
  } finally {
    // Restore context to respect other tests.
    goog.global = savedGoogGlobal;
  }
}

function testLoadInNonHtmlNotThrows() {
  var savedGoogGlobal = goog.global;
  try {
    goog.global = {};
    goog.global.document = {};
    assertFalse(goog.inHtmlDocument_());
    // The goog code which is executed at load.
    goog.findBasePath_();
    goog.writeScriptTag_(goog.basePath + 'deps.js');
  } finally {
    // Restore context to respect other tests.
    goog.global = savedGoogGlobal;
  }
}

function testLoadBaseWithQueryParamOk() {
  var savedGoogGlobal = goog.global;
  try {
    goog.global = {};
    goog.global.document = {
      write: goog.nullFunction,
      getElementsByTagName:
          goog.functions.constant([{src: '/path/to/base.js?zx=5'}])
    };
    assertTrue(goog.inHtmlDocument_());
    goog.findBasePath_();
    assertEquals('/path/to/', goog.basePath);
  } finally {
    // Restore context to respect other tests.
    goog.global = savedGoogGlobal;
  }
}

//=== tests for getmsg ===
function testGetMsgWithDollarSigns() {
  var msg = goog.getMsg('{$amount} per minute', {amount: '$0.15'});
  assertEquals('$0.15 per minute', msg);
  msg = goog.getMsg('{$amount} per minute', {amount: '$0.$1$5'});
  assertEquals('$0.$1$5 per minute', msg);

  msg = goog.getMsg('This is a {$rate} sale!', {rate: '$$$$$$$$$$10'});
  assertEquals('This is a $$$$$$$$$$10 sale!', msg);
  msg = goog.getMsg(
      '{$name}! Hamburgers: {$hCost}, Hotdogs: {$dCost}.',
      {name: 'Burger Bob', hCost: '$0.50', dCost: '$100'});
  assertEquals('Burger Bob! Hamburgers: $0.50, Hotdogs: $100.', msg);
}


function testGetMsgWithPlaceholders() {
  var msg = goog.getMsg('{$a} has {$b}', {a: '{$b}', b: 1});
  assertEquals('{$b} has 1', msg);

  msg = goog.getMsg('{$a}{$b}', {b: ''});
  assertEquals('{$a}', msg);
}


//=== miscellaneous tests ===

function testGetObjectByName() {
  var m = {
    'undefined': undefined,
    'null': null,
    emptyString: '', 'false': false, 'true': true,
    zero: 0,
    one: 1,
    two: {three: 3, four: {five: 5}}, 'six|seven': '6|7', 'eight.nine': 8.9
  };
  goog.global.m = m;

  assertNull(goog.getObjectByName('m.undefined'));
  assertNull(goog.getObjectByName('m.null'));
  assertEquals(goog.getObjectByName('m.emptyString'), '');
  assertEquals(goog.getObjectByName('m.false'), false);
  assertEquals(goog.getObjectByName('m.true'), true);
  assertEquals(goog.getObjectByName('m.zero'), 0);
  assertEquals(goog.getObjectByName('m.one'), 1);
  assertEquals(goog.getObjectByName('m.two.three'), 3);
  assertEquals(goog.getObjectByName('m.two.four.five'), 5);
  assertEquals(goog.getObjectByName('m.six|seven'), '6|7');
  assertNull(goog.getObjectByName('m.eight.nine'));
  assertNull(goog.getObjectByName('m.notThere'));

  assertEquals(goog.getObjectByName('one', m), 1);
  assertEquals(goog.getObjectByName('two.three', m), 3);
  assertEquals(goog.getObjectByName('two.four.five', m), 5);
  assertEquals(goog.getObjectByName('six|seven', m), '6|7');
  assertNull(goog.getObjectByName('eight.nine', m));
  assertNull(goog.getObjectByName('notThere', m));
}


function testGetCssName() {
  assertEquals('classname', goog.getCssName('classname'));
  assertEquals('random-classname', goog.getCssName('random-classname'));
  assertEquals('control-modifier', goog.getCssName('control', 'modifier'));

  goog.setCssNameMapping({'goog': 'a', 'disabled': 'b'}, 'BY_PART');
  var g = goog.getCssName('goog');
  assertEquals('a', g);
  assertEquals('a-b', goog.getCssName(g, 'disabled'));
  assertEquals('a-b', goog.getCssName('goog-disabled'));
  assertEquals('a-button', goog.getCssName('goog-button'));

  goog.setCssNameMapping({'goog-button': 'a', 'active': 'b'}, 'BY_WHOLE');

  g = goog.getCssName('goog-button');
  assertEquals('a', g);
  assertEquals('a-b', goog.getCssName(g, 'active'));
  assertEquals('goog-disabled', goog.getCssName('goog-disabled'));

  e = assertThrows(function() { goog.getCssName('.name'); });
  assertEquals(
      'className passed in goog.getCssName must not start with ".".' +
          ' You passed: .name',
      e.message);

  assertNull(goog.getCssName(null));
}

function testGetCssName_nameMapFn() {
  assertEquals('classname', goog.getCssName('classname'));

  goog.global.CLOSURE_CSS_NAME_MAP_FN = function(classname) {
    return classname + '!';
  };

  assertEquals('classname!', goog.getCssName('classname'));
}

function testAddDependency() {
  stubs.set(goog, 'writeScriptTag_', goog.nullFunction);

  goog.addDependency('foo.js', ['testDep.foo'], ['testDep.bar']);

  goog.provide('testDep.bar');

  // To differentiate this call from the real one.
  var require = goog.require;

  // this used to throw an exception
  require('testDep.foo');

  assertTrue(goog.isObject(testDep.bar));

  // Unset provided namespace so the test can be re-run.
  testDep = undefined;
}

function testAddDependencyModule() {
  var load = goog.testing.recordFunction();
  stubs.set(goog, 'writeScriptTag_', load);

  goog.addDependency('mod.js', ['testDep.mod'], [], true);
  goog.addDependency('empty.js', ['testDep.empty'], [], {});
  goog.addDependency('mod-goog.js', ['testDep.goog'], [], {'module': 'goog'});

  // To differentiate this call from the real one.
  var require = goog.require;

  var assertModuleLoad = function(module, args) {
    assertEquals(2, args.length);
    assertEquals('', args[0]);
    assertRegExp(
        '^goog\\.retrieveAndExec_\\(".*/' + module + '", true, false\\);$',
        args[1]);
  };

  require('testDep.mod');
  assertEquals(1, load.getCallCount());
  assertModuleLoad('mod.js', load.getCalls()[0].getArguments());

  require('testDep.empty');
  assertEquals(2, load.getCallCount());
  assertEquals(2, load.getCalls()[1].getArguments().length);
  assertRegExp('^.*/empty.js$', load.getCalls()[1].getArguments()[0]);
  assertUndefined(load.getCalls()[1].getArguments()[1]);

  require('testDep.goog');
  assertEquals(3, load.getCallCount());
  assertModuleLoad('mod-goog.js', load.getCalls()[2].getArguments());

  // Unset provided namespace so the test can be re-run.
  testDep = undefined;
}

function testAddDependencyEs6() {
  var script = null;
  var requireTranspilation = false;
  stubs.set(goog, 'needsTranspile_', function() {
    return requireTranspilation;
  });
  stubs.set(goog, 'writeScriptTag_', function(src, scriptText) {
    if (script != null) {
      throw new Error('Multiple scripts written');
    }
    script = scriptText;
  });

  goog.addDependency(
      'fancy.js', ['testDep.fancy'], [],
      {'lang': 'es6-impl', 'module': 'goog'});
  goog.addDependency('super.js', ['testDep.superFancy'], [], {'lang': 'es6'});

  // To differentiate this call from the real one.
  var require = goog.require;

  requireTranspilation = false;
  require('testDep.fancy');
  assertRegExp(
      /^goog\.retrieveAndExec_\(".*\/fancy\.js", true, false\);$/, script);
  script = null;

  requireTranspilation = true;
  require('testDep.superFancy');
  assertRegExp(
      /^goog\.retrieveAndExec_\(".*\/super\.js", false, true\);$/, script);

  // Unset provided namespace so the test can be re-run.
  testDep = undefined;
}

function testBaseMethod() {
  function A() {}
  A.prototype.foo = function(x, y) { return x + y; };

  function B() {}
  goog.inherits(B, A);
  B.prototype.foo = function(x, y) { return 2 + goog.base(this, 'foo', x, y); };

  function C() {}
  goog.inherits(C, B);
  C.prototype.foo = function(x, y) { return 4 + goog.base(this, 'foo', x, y); };

  var d = new C();
  d.foo = function(x, y) { return 8 + goog.base(this, 'foo', x, y); };

  assertEquals(15, d.foo(1, 0));
  assertEquals(16, d.foo(1, 1));
  assertEquals(16, d.foo(2, 0));
  assertEquals(7, (new C()).foo(1, 0));
  assertEquals(3, (new B()).foo(1, 0));
  assertThrows(function() { goog.base(d, 'foo', 1, 0); });

  delete B.prototype.foo;
  assertEquals(13, d.foo(1, 0));

  delete C.prototype.foo;
  assertEquals(9, d.foo(1, 0));
}

function testBaseMethodAndBaseCtor() {
  // This will fail on FF4.0 if the following bug is not fixed:
  // https://bugzilla.mozilla.org/show_bug.cgi?id=586482
  function A(x, y) { this.foo(x, y); }
  A.prototype.foo = function(x, y) { this.bar = x + y; };

  function B(x, y) { goog.base(this, x, y); }
  goog.inherits(B, A);
  B.prototype.foo = function(x, y) {
    goog.base(this, 'foo', x, y);
    this.bar = this.bar * 2;
  };

  assertEquals(14, new B(3, 4).bar);
}

function testBaseClass() {
  function A(x, y) { this.foo = x + y; }

  function B(x, y) {
    goog.base(this, x, y);
    this.foo += 2;
  }
  goog.inherits(B, A);

  function C(x, y) {
    goog.base(this, x, y);
    this.foo += 4;
  }
  goog.inherits(C, B);

  function D(x, y) {
    goog.base(this, x, y);
    this.foo += 8;
  }
  goog.inherits(D, C);

  assertEquals(15, (new D(1, 0)).foo);
  assertEquals(16, (new D(1, 1)).foo);
  assertEquals(16, (new D(2, 0)).foo);
  assertEquals(7, (new C(1, 0)).foo);
  assertEquals(3, (new B(1, 0)).foo);
}

function testClassBaseOnMethod() {
  function A() {}
  A.prototype.foo = function(x, y) { return x + y; };

  function B() {}
  goog.inherits(B, A);
  B.prototype.foo = function(x, y) { return 2 + B.base(this, 'foo', x, y); };

  function C() {}
  goog.inherits(C, B);
  C.prototype.foo = function(x, y) { return 4 + C.base(this, 'foo', x, y); };

  var d = new C();
  assertEquals(7, d.foo(1, 0));
  assertEquals(8, d.foo(1, 1));
  assertEquals(8, d.foo(2, 0));
  assertEquals(3, (new B()).foo(1, 0));

  delete B.prototype.foo;
  assertEquals(5, d.foo(1, 0));

  delete C.prototype.foo;
  assertEquals(1, d.foo(1, 0));
}

function testClassBaseOnConstructor() {
  function A(x, y) { this.foo = x + y; }

  function B(x, y) {
    B.base(this, 'constructor', x, y);
    this.foo += 2;
  }
  goog.inherits(B, A);

  function C(x, y) {
    C.base(this, 'constructor', x, y);
    this.foo += 4;
  }
  goog.inherits(C, B);

  function D(x, y) {
    D.base(this, 'constructor', x, y);
    this.foo += 8;
  }
  goog.inherits(D, C);

  assertEquals(15, (new D(1, 0)).foo);
  assertEquals(16, (new D(1, 1)).foo);
  assertEquals(16, (new D(2, 0)).foo);
  assertEquals(7, (new C(1, 0)).foo);
  assertEquals(3, (new B(1, 0)).foo);
}

function testClassBaseOnMethodAndBaseCtor() {
  function A(x, y) { this.foo(x, y); }
  A.prototype.foo = function(x, y) { this.bar = x + y; };

  function B(x, y) { B.base(this, 'constructor', x, y); }
  goog.inherits(B, A);
  B.prototype.foo = function(x, y) {
    B.base(this, 'foo', x, y);
    this.bar = this.bar * 2;
  };

  assertEquals(14, new B(3, 4).bar);
}

function testGoogRequireCheck() {
  stubs.set(goog, 'ENABLE_DEBUG_LOADER', true);
  stubs.set(goog, 'useStrictRequires', true);
  stubs.set(goog, 'implicitNamespaces_', {});

  // Aliased so that build tools do not mistake this for an actual call.
  var require = goog.require;
  assertThrows('Requiring non-required namespace should fail', function() {
    require('far.outnotprovided');
  });

  assertUndefined(goog.global.far);
  assertEvaluatesToFalse(goog.getObjectByName('far.out'));
  assertObjectEquals({}, goog.implicitNamespaces_);
  assertFalse(goog.isProvided_('far.out'));

  goog.provide('far.out');

  assertNotUndefined(far.out);
  assertEvaluatesToTrue(goog.getObjectByName('far.out'));
  assertObjectEquals({'far': true}, goog.implicitNamespaces_);
  assertTrue(goog.isProvided_('far.out'));

  goog.global.far.out = 42;
  assertEquals(42, goog.getObjectByName('far.out'));
  assertTrue(goog.isProvided_('far.out'));

  // Empty string should be allowed.
  goog.global.far.out = '';
  assertEquals('', goog.getObjectByName('far.out'));
  assertTrue(goog.isProvided_('far.out'));

  // Null or undefined are not allowed.
  goog.global.far.out = null;
  assertNull(goog.getObjectByName('far.out'));
  assertFalse(goog.isProvided_('far.out'));

  goog.global.far.out = undefined;
  assertNull(goog.getObjectByName('far.out'));
  assertFalse(goog.isProvided_('far.out'));

  stubs.reset();
  delete far;
}

/**
 * @return {?}
 */
function diables_testCspSafeGoogRequire() {
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('10')) {
    return;
  }

  stubs.set(goog, 'ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING', true);

  // Aliased so that build tools do not mistake this for an actual call.
  var require = goog.require;

  require('goog.Uri');

  // Set a timeout to allow the user agent to finish parsing this script block,
  // thus allowing the appended script (via goog.require) to execute.
  var ASYNC_TIMEOUT_MS = 1000;

  var resolver = goog.Promise.withResolver();
  window.setTimeout(function() {
    assertNotUndefined(goog.Uri);
    resolver.resolve();
    stubs.reset();
  }, ASYNC_TIMEOUT_MS);

  return resolver.promise;
}

function testLateRequireProtection() {
  if (!document.readyState) return;
  var e = assertThrows(function() {
    // To differentiate this call from the real one.
    var require = goog.require;
    require('goog.ui.Component');
  });

  assertContains('after document load', e.message);
}

function testDefineClass() {
  var Base = goog.defineClass(null, {
    constructor: function(foo) { this.foo = foo; },
    statics: {x: 42},
    frobnicate: function() { return this.foo + this.foo; }
  });
  var Derived = goog.defineClass(Base, {
    constructor: function() { Derived.base(this, 'constructor', 'bar'); },
    frozzle: function(foo) { this.foo = foo; }
  });

  assertEquals(42, Base.x);
  var der = new Derived();
  assertEquals('barbar', der.frobnicate());
  der.frozzle('qux');
  assertEquals('quxqux', der.frobnicate());
}

function testDefineClass_interface() {
  /** @interface */
  var Interface =
      goog.defineClass(null, {statics: {foo: 'bar'}, qux: function() {}});
  assertEquals('bar', Interface.foo);
  assertThrows(function() { new Interface(); });
}

function testDefineClass_seals() {
  if (!(Object.seal instanceof Function)) return;  // IE<9 doesn't have seal
  var A = goog.defineClass(null, {constructor: function() {}});
  var a = new A();
  try {
    a.foo = 'bar';
  } catch (expectedInStrictModeOnly) { /* ignored */
  }
  assertEquals(undefined, a.foo);
}

function testDefineClass_unsealable() {
  var LegacyBase = function() {};
  LegacyBase.prototype.foo = null;
  LegacyBase.prototype.setFoo = function(foo) { this.foo = foo; };
  goog.tagUnsealableClass(LegacyBase);

  var Derived = goog.defineClass(LegacyBase, {constructor: function() {}});

  var der = new Derived();
  der.setFoo('bar');
  assertEquals('bar', der.foo);
}

function testDefineClass_constructorIsNotWrappedWhenSealingIsDisabled() {
  var org = goog.defineClass;
  var ctr = null;
  var replacement = function(superClass, def) {
    ctr = def.constructor;
    return org(superClass, def);
  };
  // copy all the properties
  goog.object.extend(replacement, org);
  replacement.SEAL_CLASS_INSTANCES = false;

  stubs.replace(goog, 'defineClass', replacement);
  var MyClass = goog.defineClass(null, {constructor: function() {}});
  assertEquals('The constructor should not be wrapped.', ctr, MyClass);
}

function testDefineClass_unsealableConstructorIsWrapped() {
  var LegacyBase = function() {};
  LegacyBase.prototype.foo = null;
  LegacyBase.prototype.setFoo = function(foo) { this.foo = foo; };
  goog.tagUnsealableClass(LegacyBase);

  var org = goog.defineClass;
  var ctr = null;
  var replacement = function(superClass, def) {
    ctr = def.constructor;
    return org(superClass, def);
  };
  // copy all the properties
  goog.object.extend(replacement, org);

  stubs.replace(goog, 'defineClass', replacement);
  var Derived = goog.defineClass(LegacyBase, {constructor: function() {}});

  assertNotEquals('The constructor should be wrapped.', ctr, Derived);
}

// Validate the behavior of goog.module when used from traditional files.
function testGoogModuleGet() {
  // assert that goog.module doesn't modify the global namespace
  assertUndefined(
      'module failed to protect global namespace: ' +
          'goog.test_module_dep',
      goog.test_module_dep);

  // assert that goog.module with goog.module.declareLegacyNamespace is present.
  assertNotUndefined(
      'module failed to declare global namespace: ' +
          'goog.test_module',
      goog.test_module);

  // assert that a require'd goog.module is available immediately after the
  // goog.require call.
  assertNotUndefined(
      'module failed to protect global namespace: ' +
          'goog.test_module_dep',
      earlyTestModuleGet);


  // assert that an non-existent module request doesn't throw and returns null.
  assertEquals(null, goog.module.get('unrequired.module.id'));

  // Validate the module exports
  var testModuleExports = goog.module.get('goog.test_module');
  assertTrue(goog.isFunction(testModuleExports));

  // Validate that the module exports object has not changed
  assertEquals(earlyTestModuleGet, testModuleExports);
}


// Validate the behavior of goog.module when used from traditional files.
function testGoogLoadModuleByUrl() {
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('10')) {
    // IE before 10 don't report an error.
    return;
  }

  stubs.set(goog, 'loadFileSync_', function(src) {
    return 'closure load file sync: ' + src;
  });

  // "goog.loadModuleByUrl" is not a general purpose code loader, it can
  // not be used to late load code.
  var err = assertThrows(
      'loadModuleFromUrl should not hide failures',
      function() { goog.loadModuleFromUrl('bogus url'); });
  assertContains('Cannot write "bogus url" after document load', err.message);
}


function testLoadFileSync() {
  var fileContents = goog.loadFileSync_('deps.js');
  assertTrue(
      'goog.loadFileSync_ returns string', typeof fileContents === 'string');
  assertTrue('goog.loadFileSync_ string length > 0', fileContents.length > 0);

  stubs.set(goog.global, 'CLOSURE_LOAD_FILE_SYNC', function(src) {
    return 'closure load file sync: ' + src;
  });

  assertEquals(
      'goog.CLOSURE_LOAD_FILE_SYNC override', goog.loadFileSync_('test url'),
      'closure load file sync: test url');
}


function testNormalizePath1() {
  assertEquals('foo/path.js', goog.normalizePath_('./foo/./path.js'));
  assertEquals('foo/path.js', goog.normalizePath_('bar/../foo/path.js'));
  assertEquals('bar/path.js', goog.normalizePath_('bar/foo/../path.js'));
  assertEquals('path.js', goog.normalizePath_('bar/foo/../../path.js'));

  assertEquals('../foo/path.js', goog.normalizePath_('../foo/path.js'));
  assertEquals('../../foo/path.js', goog.normalizePath_('../../foo/path.js'));
  assertEquals('../path.js', goog.normalizePath_('../foo/../path.js'));
  assertEquals('../../path.js', goog.normalizePath_('../foo/../../path.js'));

  assertEquals('/../foo/path.js', goog.normalizePath_('/../foo/path.js'));
  assertEquals('/path.js', goog.normalizePath_('/foo/../path.js'));
  assertEquals('/foo/path.js', goog.normalizePath_('/./foo/path.js'));

  assertEquals('//../foo/path.js', goog.normalizePath_('//../foo/path.js'));
  assertEquals('//path.js', goog.normalizePath_('//foo/../path.js'));
  assertEquals('//foo/path.js', goog.normalizePath_('//./foo/path.js'));

  assertEquals('http://../x/y.js', goog.normalizePath_('http://../x/y.js'));
  assertEquals('http://path.js', goog.normalizePath_('http://foo/../path.js'));
  assertEquals('http://x/path.js', goog.normalizePath_('http://./x/path.js'));
}




function testGoogModuleNames() {
  // avoid usage checks
  var module = goog.module;

  function assertInvalidId(id) {
    var err = assertThrows(function() { module(id); });
    assertEquals('Invalid module identifier', err.message);
  }

  function assertValidId(id) {
    // This is a cheesy check, but we validate that we don't get an invalid
    // namespace warning, but instead get a module isn't loaded correctly
    // error.
    var err = assertThrows(function() { module(id); });
    assertTrue(err.message.indexOf('has been loaded incorrectly') != -1);
  }

  assertInvalidId('/somepath/module.js');
  assertInvalidId('./module.js');
  assertInvalidId('1');

  assertValidId('a');
  assertValidId('a.b');
  assertValidId('a.b.c');
  assertValidId('aB.Cd.eF');
  assertValidId('a1.0E.Fg');

  assertValidId('_');
  assertValidId('$');
  assertValidId('_$');
  assertValidId('$_');
}
