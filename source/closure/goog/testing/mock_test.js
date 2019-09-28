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

goog.module('goog.testing.MockTest');
goog.setTestOnly();

const Mock = goog.require('goog.testing.Mock');
const MockControl = goog.require('goog.testing.MockControl');
const MockExpectation = goog.require('goog.testing.MockExpectation');
const googArray = goog.require('goog.array');
const testSuite = goog.require('goog.testing.testSuite');
const testing = goog.require('goog.testing');

// The object that we will be mocking
class RealObject {
  a() {
    fail('real object should never be called');
  }

  b() {
    fail('real object should never be called');
  }
}

const matchers = testing.mockmatchers;
let mock;

testSuite({
  setUp() {
    const obj = new RealObject();
    mock = new Mock(obj);
  },

  testMockErrorMessage() {
    const expectation = new MockExpectation('a');
    assertEquals(0, expectation.getErrorMessageCount());
    assertEquals('', expectation.getErrorMessage());

    expectation.addErrorMessage('foo failed');
    assertEquals(1, expectation.getErrorMessageCount());
    assertEquals('foo failed', expectation.getErrorMessage());

    expectation.addErrorMessage('bar failed');
    assertEquals(2, expectation.getErrorMessageCount());
    assertEquals('foo failed\nbar failed', expectation.getErrorMessage());
  },

  testVerifyArgumentList() {
    const expectation = new MockExpectation('a');
    assertEquals('', expectation.getErrorMessage());

    // test single string arg
    expectation.argumentList = ['foo'];
    assertTrue(mock.$verifyCall(expectation, 'a', ['foo']));

    // single numeric arg
    expectation.argumentList = [2];
    assertTrue(mock.$verifyCall(expectation, 'a', [2]));

    // single object arg (using standard === comparison)
    const obj = {prop1: 'prop1', prop2: 2};
    expectation.argumentList = [obj];
    assertTrue(mock.$verifyCall(expectation, 'a', [obj]));

    // make sure comparison succeeds if args are similar, but not ===
    const obj2 = {prop1: 'prop1', prop2: 2};
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
  },

  testVerifyArgumentListForObjectMethods() {
    const expectation = new MockExpectation('toString');
    expectation.argumentList = [];
    assertTrue(mock.$verifyCall(expectation, 'toString', []));
  },

  testRegisterArgumentListVerifier() {
    const expectationA = new MockExpectation('a');
    const expectationB = new MockExpectation('b');

    // Simple matcher that return true if all args are === equivalent.
    mock.$registerArgumentListVerifier(
        'a',
        (expectedArgs, args) =>
            googArray.equals(expectedArgs, args, (a, b) => a === b));

    // test single string arg
    expectationA.argumentList = ['foo'];
    assertTrue(mock.$verifyCall(expectationA, 'a', ['foo']));

    // single numeric arg
    expectationA.argumentList = [2];
    assertTrue(mock.$verifyCall(expectationA, 'a', [2]));

    // single object arg (using standard === comparison)
    const obj = {prop1: 'prop1', prop2: 2};
    expectationA.argumentList = [obj];
    expectationB.argumentList = [obj];
    assertTrue(mock.$verifyCall(expectationA, 'a', [obj]));
    assertTrue(mock.$verifyCall(expectationB, 'b', [obj]));

    // if args are similar, but not ===, then comparison should succeed
    // for method with registered object matcher, and fail for method without
    const obj2 = {prop1: 'prop1', prop2: 2};
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
  },

  testCreateProxy() {
    mock = new Mock(RealObject, false, true);
    assertTrue(mock.$proxy instanceof RealObject);
    assertThrows(() => {
      new Mock(RealObject, true, true);
    });
    assertThrows(() => {
      new Mock(1, false, true);
    });
  },

  testValidConstructorArgument() {
    const someNamespace = {};
    assertThrows(() => {
      new Mock(someNamespace.RealObjectWithTypo);
    });
  },

  testArgumentsAsString() {
    assertEquals('()', mock.$argumentsAsString([]));
    assertEquals(
        '(string, number, object, null)',
        mock.$argumentsAsString(['red', 1, {}, null]));
  },

  testThrowCallExceptionBadArgs() {
    let msg;
    mock.$throwException = (m) => {
      msg = m;
    };

    mock.$throwCallException('fn1', ['b'], {
      name: 'fn1',
      argumentList: ['c'],
      getErrorMessage: function() {
        return '';
      },
    });
    assertContains(
        'Bad arguments to fn1().\nActual: (string)\nExpected: (string)', msg);
  },

  testThrowCallExceptionUnexpected() {
    let msg;
    mock.$throwException = (m) => {
      msg = m;
    };

    mock.$throwCallException('fn1', ['b']);
    assertEquals(
        'Unexpected call to fn1(string).\n' +
            'Did you forget to $replay?',
        msg);
  },

  testThrowCallExceptionUnexpectedWithNext() {
    let msg;
    mock.$throwException = (m) => {
      msg = m;
    };

    mock.$throwCallException('fn1', ['b'], {
      name: 'fn2',
      argumentList: [3],
      getErrorMessage: function() {
        return '';
      },
    });
    assertEquals(
        'Unexpected call to fn1(string).\n' +
            'Did you forget to $replay?\n' +
            'Next expected call was to fn2(number)',
        msg);
  },

  // This tests that base Object functions which are not enumerable in IE can
  // be mocked correctly.
  testBindNonEnumerableFunctions() {
    // Create Foo and override non enumerable functions.
    const Foo = class {};
    Foo.prototype.constructor = () => {
      fail('real object should never be called');
    };
    Foo.prototype.hasOwnProperty = () => {
      fail('real object should never be called');
    };
    Foo.prototype.isPrototypeOf = () => {
      fail('real object should never be called');
    };
    Foo.prototype.propertyIsEnumerable = () => {
      fail('real object should never be called');
    };
    Foo.prototype.toLocaleString = () => {
      fail('real object should never be called');
    };
    Foo.prototype.toString = () => {
      fail('real object should never be called');
    };
    Foo.prototype.valueOf = () => {
      fail('real object should never be called');
    };

    // Create Mock and set $returns for toString.
    const mockControl = new MockControl();
    const mock = mockControl.createLooseMock(Foo);
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
  },

  testMockInheritedMethods() {
    const SubType = () => {};
    goog.inherits(SubType, RealObject);
    SubType.prototype.c = () => {
      fail('real object should never be called');
    };

    const mockControl = new MockControl();
    const mock = mockControl.createLooseMock(SubType);
    mock.a().$returns('a');
    mock.b().$returns('b');
    mock.c().$returns('c');

    // Execute and assert that the Mock is working correctly.
    mockControl.$replayAll();
    assertEquals('a', mock.a());
    assertEquals('b', mock.b());
    assertEquals('c', mock.c());
    mockControl.$verifyAll();
  },

  testMockStaticMethods() {
    const SomeType = () => {};
    SomeType.staticMethod = () => {
      fail('real object should never be called');
    };

    const mockControl = new MockControl();
    const mock = mockControl.createLooseMock(
        SomeType, false /* opt_ignoreUnexpectedCalls */,
        true /* opt_mockStaticMethods */);
    mock.staticMethod().$returns('staticMethod');

    // Execute and assert that the Mock is working correctly.
    mockControl.$replayAll();
    assertEquals('staticMethod', mock.staticMethod());
    mockControl.$verifyAll();
  },

  testMockEs6ClassMethods() {
    const Foo = class {
      a() {
        fail('real object should never be called');
      }
    };

    const mockControl = new MockControl();
    const mock = mockControl.createLooseMock(Foo);
    mock.a().$returns('a');

    // Execute and assert that the Mock is working correctly.
    mockControl.$replayAll();
    assertEquals('a', mock.a());
    mockControl.$verifyAll();
  },

  testMockEs6ClassStaticMethods() {
    const Foo = class {
      static a() {
        fail('real object should never be called');
      }
      static apply() {
        fail('real object should never be called');
      }
    };

    const mockControl = new MockControl();
    const mock = mockControl.createLooseMock(
        Foo, false /* opt_ignoreUnexpectedCalls */,
        true /* opt_mockStaticMethods */);
    mock.a().$returns('a');
    mock.apply().$returns('apply');

    // Execute and assert that the Mock is working correctly.
    mockControl.$replayAll();
    assertEquals('a', mock.a());
    assertEquals('apply', mock.apply());
    mockControl.$verifyAll();
  },

  async testLooseMockAsynchronousVerify() {
    const mockControl = new MockControl();
    const looseMock = mockControl.createLooseMock(RealObject);
    looseMock.a().$returns('a');

    const strictMock = mockControl.createStrictMock(RealObject);
    strictMock.a().$returns('a');

    mockControl.$replayAll();
    setTimeout(() => {
      looseMock.a();
    }, 0);
    setTimeout(() => {
      strictMock.a();
    }, 0);
    await mockControl.$waitAndVerifyAll();
  },

  testVerifyWhileInRecord() {
    const mockControl = new MockControl();
    const looseMock = mockControl.createLooseMock(RealObject);
    looseMock.a();

    try {
      mockControl.$verifyAll();
    } catch (ex) {
      assertEquals(
          'Threw an exception while in record mode, did you $replay?\n' +
              'Not enough calls to a\n' +
              'Expected: 1 but was: 0',
          ex.toString());
      const getTestCase =
          goog.getObjectByName('goog.testing.TestCase.getActiveTestCase');
      const testCase = getTestCase && getTestCase();
      if (testCase) {
        testCase.invalidateAssertionException(ex);
      }
      return;
    }

    fail('Expected exception');
  },
});
