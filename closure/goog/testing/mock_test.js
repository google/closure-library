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

goog.provide('goog.testing.MockTest');
goog.setTestOnly('goog.testing.MockTest');

goog.require('goog.array');
goog.require('goog.testing');
goog.require('goog.testing.Mock');
goog.require('goog.testing.MockControl');
goog.require('goog.testing.MockExpectation');
goog.require('goog.testing.jsunit');

// The object that we will be mocking
var RealObject = function() {};

RealObject.prototype.a = function() {
  fail('real object should never be called');
};

RealObject.prototype.b = function() {
  fail('real object should never be called');
};

var matchers = goog.testing.mockmatchers;
var mock;

function setUp() {
  var obj = new RealObject();
  mock = new goog.testing.Mock(obj);
}

function testMockErrorMessage() {
  var expectation = new goog.testing.MockExpectation('a');
  assertEquals(0, expectation.getErrorMessageCount());
  assertEquals('', expectation.getErrorMessage());

  expectation.addErrorMessage('foo failed');
  assertEquals(1, expectation.getErrorMessageCount());
  assertEquals('foo failed', expectation.getErrorMessage());

  expectation.addErrorMessage('bar failed');
  assertEquals(2, expectation.getErrorMessageCount());
  assertEquals('foo failed\nbar failed', expectation.getErrorMessage());
}

function testVerifyArgumentList() {
  var expectation = new goog.testing.MockExpectation('a');
  assertEquals('', expectation.getErrorMessage());

  // test single string arg
  expectation.argumentList = ['foo'];
  assertTrue(mock.$verifyCall(expectation, 'a', ['foo']));

  // single numeric arg
  expectation.argumentList = [2];
  assertTrue(mock.$verifyCall(expectation, 'a', [2]));

  // single object arg (using standard === comparison)
  var obj = {prop1: 'prop1', prop2: 2};
  expectation.argumentList = [obj];
  assertTrue(mock.$verifyCall(expectation, 'a', [obj]));

  // make sure comparison succeeds if args are similar, but not ===
  var obj2 = {prop1: 'prop1', prop2: 2};
  expectation.argumentList = [obj];
  assertTrue(mock.$verifyCall(expectation, 'a', [obj2]));
  assertEquals('', expectation.getErrorMessage());

  // multiple args
  expectation.argumentList = ['foo', 2, obj, obj2];
  assertTrue(mock.$verifyCall(expectation, 'a', ['foo', 2, obj, obj2]));

  // test flexible arg matching.
  expectation.argumentList = ['foo', matchers.isNumber];
  assertTrue(mock.$verifyCall(expectation, 'a', ['foo', 1]));

  expectation.argumentList = [new matchers.InstanceOf(RealObject)];
  assertTrue(mock.$verifyCall(expectation, 'a', [new RealObject()]));
}

function testVerifyArgumentListForObjectMethods() {
  var expectation = new goog.testing.MockExpectation('toString');
  expectation.argumentList = [];
  assertTrue(mock.$verifyCall(expectation, 'toString', []));
}

function testRegisterArgumentListVerifier() {
  var expectationA = new goog.testing.MockExpectation('a');
  var expectationB = new goog.testing.MockExpectation('b');

  // Simple matcher that return true if all args are === equivalent.
  mock.$registerArgumentListVerifier('a', function(expectedArgs, args) {
    return goog.array.equals(
        expectedArgs, args, function(a, b) { return (a === b); });
  });

  // test single string arg
  expectationA.argumentList = ['foo'];
  assertTrue(mock.$verifyCall(expectationA, 'a', ['foo']));

  // single numeric arg
  expectationA.argumentList = [2];
  assertTrue(mock.$verifyCall(expectationA, 'a', [2]));

  // single object arg (using standard === comparison)
  var obj = {prop1: 'prop1', prop2: 2};
  expectationA.argumentList = [obj];
  expectationB.argumentList = [obj];
  assertTrue(mock.$verifyCall(expectationA, 'a', [obj]));
  assertTrue(mock.$verifyCall(expectationB, 'b', [obj]));

  // if args are similar, but not ===, then comparison should succeed
  // for method with registered object matcher, and fail for method without
  var obj2 = {prop1: 'prop1', prop2: 2};
  expectationA.argumentList = [obj];
  expectationB.argumentList = [obj];
  assertFalse(mock.$verifyCall(expectationA, 'a', [obj2]));
  assertTrue(mock.$verifyCall(expectationB, 'b', [obj2]));


  // multiple args, should fail for method with registered arg matcher,
  // and succeed for method without.
  expectationA.argumentList = ['foo', 2, obj, obj2];
  expectationB.argumentList = ['foo', 2, obj, obj2];
  assertFalse(mock.$verifyCall(expectationA, 'a', ['foo', 2, obj2, obj]));
  assertTrue(mock.$verifyCall(expectationB, 'b', ['foo', 2, obj2, obj]));
}


function testCreateProxy() {
  mock = new goog.testing.Mock(RealObject, false, true);
  assertTrue(mock.$proxy instanceof RealObject);
  assertThrows(function() { new goog.testing.Mock(RealObject, true, true); });
  assertThrows(function() { new goog.testing.Mock(1, false, true); });
}


function testValidConstructorArgument() {
  var someNamespace = {};
  assertThrows(function() {
    new goog.testing.Mock(someNamespace.RealObjectWithTypo);
  });
}


function testArgumentsAsString() {
  assertEquals('()', mock.$argumentsAsString([]));
  assertEquals(
      '(string, number, object, null)',
      mock.$argumentsAsString(['red', 1, {}, null]));
}


function testThrowCallExceptionBadArgs() {
  var msg;
  mock.$throwException = function(m) { msg = m; };

  mock.$throwCallException('fn1', ['b'], {
    name: 'fn1',
    argumentList: ['c'],
    getErrorMessage: function() { return ''; }
  });
  assertContains(
      'Bad arguments to fn1().\nActual: (string)\nExpected: (string)', msg);
}

function testThrowCallExceptionUnexpected() {
  var msg;
  mock.$throwException = function(m) { msg = m; };

  mock.$throwCallException('fn1', ['b']);
  assertEquals('Unexpected call to fn1(string).', msg);
}

function testThrowCallExceptionUnexpectedWithNext() {
  var msg;
  mock.$throwException = function(m) { msg = m; };

  mock.$throwCallException('fn1', ['b'], {
    name: 'fn2',
    argumentList: [3],
    getErrorMessage: function() { return ''; }
  });
  assertEquals(
      'Unexpected call to fn1(string).\n' +
          'Next expected call was to fn2(number)',
      msg);
}

// This tests that base Object functions which are not enumerable in IE can
// be mocked correctly.
function testBindNonEnumerableFunctions() {
  // Create Foo and override non enumerable functions.
  var Foo = function() {};
  Foo.prototype.constructor = function() {
    fail('real object should never be called');
  };
  Foo.prototype.hasOwnProperty = function() {
    fail('real object should never be called');
  };
  Foo.prototype.isPrototypeOf = function() {
    fail('real object should never be called');
  };
  Foo.prototype.propertyIsEnumerable = function() {
    fail('real object should never be called');
  };
  Foo.prototype.toLocaleString = function() {
    fail('real object should never be called');
  };
  Foo.prototype.toString = function() {
    fail('real object should never be called');
  };
  Foo.prototype.valueOf = function() {
    fail('real object should never be called');
  };

  // Create Mock and set $returns for toString.
  var mockControl = new goog.testing.MockControl();
  var mock = mockControl.createLooseMock(Foo);
  mock.constructor().$returns('constructor');
  mock.hasOwnProperty().$returns('hasOwnProperty');
  mock.isPrototypeOf().$returns('isPrototypeOf');
  mock.propertyIsEnumerable().$returns('propertyIsEnumerable');
  mock.toLocaleString().$returns('toLocaleString');
  mock.toString().$returns('toString');
  mock.valueOf().$returns('valueOf');

  // Execute and assert that the Mock is working correctly.
  mockControl.$replayAll();
  assertEquals('constructor', mock.constructor());
  assertEquals('hasOwnProperty', mock.hasOwnProperty());
  assertEquals('isPrototypeOf', mock.isPrototypeOf());
  assertEquals('propertyIsEnumerable', mock.propertyIsEnumerable());
  assertEquals('toLocaleString', mock.toLocaleString());
  assertEquals('toString', mock.toString());
  assertEquals('valueOf', mock.valueOf());
  mockControl.$verifyAll();
}

function testMockInheritedMethods() {
  var SubType = function() {};
  goog.inherits(SubType, RealObject);
  SubType.prototype.c = function() {
    fail('real object should never be called');
  };

  var mockControl = new goog.testing.MockControl();
  var mock = mockControl.createLooseMock(SubType);
  mock.a().$returns('a');
  mock.b().$returns('b');
  mock.c().$returns('c');

  // Execute and assert that the Mock is working correctly.
  mockControl.$replayAll();
  assertEquals('a', mock.a());
  assertEquals('b', mock.b());
  assertEquals('c', mock.c());
  mockControl.$verifyAll();
}

function testMockEs6ClassMethods() {
  // Create an ES6 class via eval so we can bail out if it's a syntax error in
  // browsers that don't support ES6 classes.
  try {
    eval(
        'var Foo = class {' +
        '  a() {' +
        '    fail(\'real object should never be called\');' +
        '  }' +
        '}');
  } catch (e) {
    if (e instanceof SyntaxError) {
      return;
    }
  }

  var mockControl = new goog.testing.MockControl();
  var mock = mockControl.createLooseMock(Foo);
  mock.a().$returns('a');

  // Execute and assert that the Mock is working correctly.
  mockControl.$replayAll();
  assertEquals('a', mock.a());
  mockControl.$verifyAll();
}