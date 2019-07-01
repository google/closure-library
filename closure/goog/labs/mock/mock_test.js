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

goog.provide('goog.labs.mockTest');
goog.setTestOnly('goog.labs.mockTest');

goog.require('goog.array');
goog.require('goog.labs.mock');
goog.require('goog.labs.mock.TimeoutError');
goog.require('goog.labs.mock.VerificationError');
goog.require('goog.labs.mock.timeout');
goog.require('goog.labs.mock.verification');
/** @suppress {extraRequire} */
goog.require('goog.labs.testing.AnythingMatcher');
/** @suppress {extraRequire} */
goog.require('goog.labs.testing.GreaterThanMatcher');
goog.require('goog.string');
goog.require('goog.testing.jsunit');

const ParentClass = function() {};
ParentClass.prototype.method1 = function() {};
ParentClass.prototype.x = 1;
ParentClass.prototype.val = 0;
ParentClass.prototype.incrementVal = function() {
  this.val++;
};

const ChildClass = function() {};
goog.inherits(ChildClass, ParentClass);
ChildClass.prototype.method2 = function() {};
ChildClass.prototype.y = 2;

class ParentClassEs6 {
  /** Parent method */
  parent() {}
}

class ChildClassEs6 extends ParentClassEs6 {
  /** Child method */
  child() {}
}

function testParentClass() {
  const parentMock = goog.labs.mock.mock(ParentClass);

  assertNotUndefined(parentMock.method1);
  assertUndefined(parentMock.method1());
  assertUndefined(parentMock.method2);
  assertNotUndefined(parentMock.x);
  assertUndefined(parentMock.y);
  assertTrue(
      'Mock should be an instance of the mocked class.',
      parentMock instanceof ParentClass);
}

function testParentClassEs6() {
  const parentMock = goog.labs.mock.mock(ParentClassEs6);

  assertNotUndefined(parentMock.parent);
  assertUndefined(parentMock.parent());
  assertTrue(
      'Mock should be an instance of the mocked class.',
      parentMock instanceof ParentClassEs6);
}

function testChildClass() {
  const childMock = goog.labs.mock.mock(ChildClass);

  assertNotUndefined(childMock.method1);
  assertUndefined(childMock.method1());
  assertNotUndefined(childMock.method2);
  assertUndefined(childMock.method2());
  assertNotUndefined(childMock.x);
  assertNotUndefined(childMock.y);
  assertTrue(
      'Mock should be an instance of the mocked class.',
      childMock instanceof ChildClass);
}

function testChildClassEs6() {
  const childMock = goog.labs.mock.mock(ChildClassEs6);

  assertNotUndefined(childMock.parent);
  assertUndefined(childMock.parent());
  assertNotUndefined(childMock.child);
  assertUndefined(childMock.child());
  assertTrue(
      'Mock should be an instance of the mocked class.',
      childMock instanceof ChildClassEs6);
}

function testParentClassInstance() {
  const parentMock = goog.labs.mock.mock(new ParentClass());

  assertNotUndefined(parentMock.method1);
  assertUndefined(parentMock.method1());
  assertUndefined(parentMock.method2);
  assertNotUndefined(parentMock.x);
  assertUndefined(parentMock.y);
  assertTrue(
      'Mock should be an instance of the mocked class.',
      parentMock instanceof ParentClass);
}

function testParentClassEs6Instance() {
  const parentMock = goog.labs.mock.mock(new ParentClassEs6());

  assertNotUndefined(parentMock.parent);
  assertUndefined(parentMock.parent());
  assertTrue(
      'Mock should be an instance of the mocked class.',
      parentMock instanceof ParentClassEs6);
}

function testChildClassInstance() {
  const childMock = goog.labs.mock.mock(new ChildClass());

  assertNotUndefined(childMock.method1);
  assertUndefined(childMock.method1());
  assertNotUndefined(childMock.method2);
  assertUndefined(childMock.method2());
  assertNotUndefined(childMock.x);
  assertNotUndefined(childMock.y);
  assertTrue(
      'Mock should be an instance of the mocked class.',
      childMock instanceof ChildClass);
}

function testChildClassEs6Instance() {
  const childMock = goog.labs.mock.mock(new ChildClassEs6());

  assertNotUndefined(childMock.parent);
  assertUndefined(childMock.parent());
  assertNotUndefined(childMock.child);
  assertUndefined(childMock.child());
  assertTrue(
      'Mock should be an instance of the mocked class.',
      childMock instanceof ChildClassEs6);
}

function testNonEnumerableProperties() {
  const mockObject = goog.labs.mock.mock({});
  assertNotUndefined(mockObject.toString);
  goog.labs.mock.when(mockObject).toString().then(function() {
    return 'toString';
  });
  assertEquals('toString', mockObject.toString());
}

function testBasicStubbing() {
  const obj = {
    method1: function(i) {
      return 2 * i;
    },
    method2: function(i, str) {
      return str;
    },
    method3: function(x) {
      return x;
    }
  };

  const mockObj = goog.labs.mock.mock(obj);
  goog.labs.mock.when(mockObj).method1(2).then(function(i) { return i; });

  assertEquals(4, obj.method1(2));
  assertEquals(2, mockObj.method1(2));
  assertUndefined(mockObj.method1(4));

  goog.labs.mock.when(mockObj).method2(1, 'hi').then(function(i) {
    return 'oh';
  });
  assertEquals('hi', obj.method2(1, 'hi'));
  assertEquals('oh', mockObj.method2(1, 'hi'));
  assertUndefined(mockObj.method2(3, 'foo'));

  goog.labs.mock.when(mockObj).method3(4).thenReturn(10);
  assertEquals(4, obj.method3(4));
  assertEquals(10, mockObj.method3(4));
  goog.labs.mock.verify(mockObj).method3(4);
  assertUndefined(mockObj.method3(5));
}

function testMockFunctions() {
  function x(i) { return i; }

  const mockedFunc = goog.labs.mock.mockFunction(x);
  goog.labs.mock.when(mockedFunc)(100).thenReturn(10);
  goog.labs.mock.when(mockedFunc)(50).thenReturn(25);

  assertEquals(100, x(100));
  assertEquals(10, mockedFunc(100));
  assertEquals(25, mockedFunc(50));
}

function testMockFunctionsWithNullableParameters() {
  const func = function(nullableObject) {
    return 0;
  };
  const mockedFunc = goog.labs.mock.mockFunction(func);
  goog.labs.mock.when(mockedFunc)(null).thenReturn(-1);

  assertEquals(0, func(null));
  assertEquals(-1, mockedFunc(null));
}

function testMockConstructor() {
  const Ctor = function() {
    this.isMock = false;
  };
  const mockInstance = {isMock: true};
  const MockCtor = goog.labs.mock.mockConstructor(Ctor);
  goog.labs.mock.when(MockCtor)().thenReturn(mockInstance);
  assertEquals(mockInstance, new MockCtor());
}

function testMockConstructorCopiesProperties() {
  const Ctor = function() {};
  Ctor.myParam = true;
  const MockCtor = goog.labs.mock.mockConstructor(Ctor);
  assertTrue(MockCtor.myParam);
}

function testStubbingConsecutiveCalls() {
  const obj = {
    method: function(i) {
      return i * 42;
    }
  };

  const mockObj = goog.labs.mock.mock(obj);
  goog.labs.mock.when(mockObj).method(1).thenReturn(3).thenReturn(4);

  assertEquals(42, obj.method(1));
  assertEquals(3, mockObj.method(1));
  assertEquals(4, mockObj.method(1));
  assertEquals(4, mockObj.method(1));

  const x = function(i) {
    return i;
  };
  const mockedFunc = goog.labs.mock.mockFunction(x);
  goog.labs.mock.when(mockedFunc)(100).thenReturn(10).thenReturn(25);

  assertEquals(100, x(100));
  assertEquals(10, mockedFunc(100));
  assertEquals(25, mockedFunc(100));
  assertEquals(25, mockedFunc(100));
}

function testStubbingMultipleObjectStubsNonConflictingArgsAllShouldWork() {
  const obj = {
    method: function(i) {
      return i * 2;
    }
  };
  const mockObj = goog.labs.mock.mock(obj);

  goog.labs.mock.when(mockObj).method(2).thenReturn(100);
  goog.labs.mock.when(mockObj).method(5).thenReturn(45);

  assertEquals(100, mockObj.method(2));
  assertEquals(45, mockObj.method(5));
}

function
testStubbingMultipleObjectStubsConflictingArgsMostRecentShouldPrevail() {
  const obj = {
    method: function(i) {
      return i * 2;
    }
  };
  const mockObj = goog.labs.mock.mock(obj);

  goog.labs.mock.when(mockObj).method(2).thenReturn(100);
  goog.labs.mock.when(mockObj).method(2).thenReturn(45);

  assertEquals(45, mockObj.method(2));
}

function testStubbingMultipleFunctionStubsNonConflictingArgsAllShouldWork() {
  const x = function(i) {
    return i;
  };
  const mockedFunc = goog.labs.mock.mockFunction(x);

  goog.labs.mock.when(mockedFunc)(100).thenReturn(10);
  goog.labs.mock.when(mockedFunc)(10).thenReturn(132);

  assertEquals(10, mockedFunc(100));
  assertEquals(132, mockedFunc(10));
}

function
testStubbingMultipleFunctionStubsConflictingArgsMostRecentShouldPrevail() {
  const x = function(i) {
    return i;
  };
  const mockedFunc = goog.labs.mock.mockFunction(x);

  goog.labs.mock.when(mockedFunc)(100).thenReturn(10);
  goog.labs.mock.when(mockedFunc)(100).thenReturn(132);

  assertEquals(132, mockedFunc(100));
}

function testSpying() {
  const obj = {
    method1: function(i) {
      return 2 * i;
    },
    method2: function(i) {
      return 5 * i;
    }
  };

  const spyObj = goog.labs.mock.spy(obj);
  goog.labs.mock.when(spyObj).method1(2).thenReturn(5);

  assertEquals(2, obj.method1(1));
  assertEquals(5, spyObj.method1(2));
  goog.labs.mock.verify(spyObj).method1(2);
  assertEquals(2, spyObj.method1(1));
  goog.labs.mock.verify(spyObj).method1(1);
  assertEquals(20, spyObj.method2(4));
  goog.labs.mock.verify(spyObj).method2(4);
}

function testSpyingSelfInteraction() {
  class A {
    method1() {
      this.method2();
    }
    method2() {}
  }
  const spyObj = goog.labs.mock.spy(new A());

  spyObj.method1();
  goog.labs.mock.verify(spyObj).method2();
}

function testSpyParentClassInstance() {
  const parent = new ParentClass();
  const parentMock = goog.labs.mock.spy(parent);

  assertNotUndefined(parentMock.method1);
  assertUndefined(parentMock.method1());
  assertUndefined(parentMock.method2);
  assertNotUndefined(parentMock.x);
  assertUndefined(parentMock.y);
  assertTrue(
      'Mock should be an instance of the mocked class.',
      parentMock instanceof ParentClass);
  const incrementedOrigVal = parent.val + 1;
  parentMock.incrementVal();
  assertEquals(
      'Changes in the spied object should reflect in the spy.',
      incrementedOrigVal, parentMock.val);
}

function testSpyChildClassInstance() {
  const child = new ChildClass();
  const childMock = goog.labs.mock.spy(child);

  assertNotUndefined(childMock.method1);
  assertUndefined(childMock.method1());
  assertNotUndefined(childMock.method2);
  assertUndefined(childMock.method2());
  assertNotUndefined(childMock.x);
  assertNotUndefined(childMock.y);
  assertTrue(
      'Mock should be an instance of the mocked class.',
      childMock instanceof ParentClass);
  const incrementedOrigVal = child.val + 1;
  childMock.incrementVal();
  assertEquals(
      'Changes in the spied object should reflect in the spy.',
      incrementedOrigVal, childMock.val);
}

function testVerifyForObjects() {
  const obj = {
    method1: function(i) {
      return 2 * i;
    },
    method2: function(i) {
      return 5 * i;
    }
  };

  const mockObj = goog.labs.mock.mock(obj);
  goog.labs.mock.when(mockObj).method1(2).thenReturn(5);

  assertEquals(5, mockObj.method1(2));
  goog.labs.mock.verify(mockObj).method1(2);
  const e =
      assertThrows(goog.partial(goog.labs.mock.verify(mockObj).method2, 2));
  assertTrue(e instanceof goog.labs.mock.VerificationError);
}

function testVerifyForFunctions() {
  const func = function(i) {
    return i;
  };

  const mockFunc = goog.labs.mock.mockFunction(func);
  goog.labs.mock.when(mockFunc)(2).thenReturn(55);
  assertEquals(55, mockFunc(2));
  goog.labs.mock.verify(mockFunc)(2);
  goog.labs.mock.verify(mockFunc)(lessThan(3));

  const e = assertThrows(goog.partial(goog.labs.mock.verify(mockFunc), 3));
  assertTrue(e instanceof goog.labs.mock.VerificationError);
}

function testVerifyForFunctionsWithNullableParameters() {
  const func = function(nullableObject) {};
  const mockFuncCalled = goog.labs.mock.mockFunction(func);
  const mockFuncNotCalled = goog.labs.mock.mockFunction(func);

  mockFuncCalled(null);

  goog.labs.mock.verify(mockFuncCalled)(null);
  const e = assertThrows(
      goog.partial(goog.labs.mock.verify(mockFuncNotCalled), null));
  assertTrue(e instanceof goog.labs.mock.VerificationError);
}

function testVerifyPassesWhenVerificationModeReturnsTrue() {
  const trueMode = {
    verify: function(number) {
      return true;
    },
    describe: function() {
      return '';
    }
  };

  const mockObj = goog.labs.mock.mock({doThing: function() {}});

  goog.labs.mock.verify(mockObj, trueMode).doThing();
}

function testVerifyFailsWhenVerificationModeReturnsFalse() {
  const falseMode = {
    verify: function(number) {
      return false;
    },
    describe: function() {
      return '';
    }
  };
  const mockObj = goog.labs.mock.mock({doThing: function() {}});

  assertThrows(goog.labs.mock.verify(mockObj, falseMode).doThing);
}

function testVerificationErrorMessagePutsVerificationModeInRightPlace() {
  const modeDescription = 'test';
  const mode = {
    verify: function(number) {
      return false;
    },
    describe: function() {
      return modeDescription;
    }
  };
  const mockObj = goog.labs.mock.mock({methodName: function() {}});
  mockObj.methodName(2);

  e = assertThrows(goog.labs.mock.verify(mockObj, mode).methodName);
  // The mode description should be between the expected method
  // invocation and a newline.
  assertTrue(goog.string.contains(
      e.message, 'methodName() ' + modeDescription + '\n'));
}


/**
* When a function invocation verification fails, it should show the failed
* expectation call, as well as the recorded calls to the same method.
*/
function testVerificationErrorMessages() {
  const mock = goog.labs.mock.mock({
    method: function(i) {
      return i;
    }
  });

  // Failure when there are no recorded calls.
  let e = assertThrows(function() {
    goog.labs.mock.verify(mock).method(4);
  });
  assertTrue(e instanceof goog.labs.mock.VerificationError);
  let expected = '\nExpected: method(4) at least 1 times\n' +
      'Recorded: No recorded calls';
  assertEquals(expected, e.message);


  // Failure when there are recorded calls with ints and functions
  // as arguments.
  const callback = function() {};
  const callbackId = goog.labs.mock.getUid(callback);

  mock.method(1);
  mock.method(2);
  mock.method(callback);

  e = assertThrows(function() { goog.labs.mock.verify(mock).method(3); });
  assertTrue(e instanceof goog.labs.mock.VerificationError);

  expected = '\nExpected: method(3) at least 1 times\n' +
      'Recorded: method(1),\n' +
      '          method(2),\n' +
      '          method(<function #anonymous' + callbackId + '>)';
  assertEquals(expected, e.message);

  // With mockFunctions
  const mockCallback = goog.labs.mock.mockFunction(callback);
  e = assertThrows(function() { goog.labs.mock.verify(mockCallback)(5); });
  expected = '\nExpected: #mockFor<#anonymous' + callbackId + '>(5) at least' +
      ' 1 times\n' +
      'Recorded: No recorded calls';

  mockCallback(8);
  goog.labs.mock.verify(mockCallback)(8);
  assertEquals(expected, e.message);

  // Objects with circular references should not fail.
  const obj = {x: 1};
  obj.y = obj;

  mockCallback(obj);
  e = assertThrows(function() { goog.labs.mock.verify(mockCallback)(5); });
  assertTrue(e instanceof goog.labs.mock.VerificationError);

  // Should respect string representation of different custom classes.
  const myClass = function() {};
  myClass.prototype.toString = function() { return '<superClass>'; };

  const mockFunction = goog.labs.mock.mockFunction(function f() {});
  mockFunction(new myClass());

  e = assertThrows(function() { goog.labs.mock.verify(mockFunction)(5); });
  expected = '\nExpected: #mockFor<f>(5) at least 1 times\n' +
      'Recorded: #mockFor<f>(<superClass>)';
  assertEquals(expected, e.message);
}

async function testWait() {
  const mockParent = goog.labs.mock.mock(ParentClass);

  setTimeout(() => {
    mockParent.method1();
  }, 0);

  await goog.labs.mock.waitAndVerify(mockParent).method1();
}

async function testWaitOnMultipleMethodCalls() {
  const mockParent = goog.labs.mock.mock(ParentClass);
  const timeoutMode = goog.labs.mock.timeout.timeout(150);
  const verificationMode = goog.labs.mock.verification.times(2);

  setTimeout(() => {
    mockParent.method1();
  }, 0);
  setTimeout(() => {
    mockParent.method1();
  }, 0);

  await goog.labs.mock.waitAndVerify(mockParent, verificationMode, timeoutMode)
      .method1();
}

async function testWaitOnDifferentFunctions() {
  const mockParent = goog.labs.mock.mock(ParentClass);

  setTimeout(() => {
    mockParent.incrementVal();
  }, 0);

  setTimeout(() => {
    mockParent.method1();
  }, 0);

  await goog.labs.mock.waitAndVerify(mockParent).method1();
  await goog.labs.mock.waitAndVerify(mockParent).incrementVal();
}

async function testWaitOnSameFunctionWithDifferentArgs() {
  const mockParent = goog.labs.mock.mock(ParentClass);

  setTimeout(() => {
    mockParent.method1(1);
  }, 0);

  setTimeout(() => {
    mockParent.method1(2);
  }, 0);

  await goog.labs.mock.waitAndVerify(mockParent).method1(2);
  await goog.labs.mock.waitAndVerify(mockParent).method1(1);
}

async function testWaitWithTimeoutMode() {
  const mockParent = goog.labs.mock.mock(ParentClass);
  const timeoutMode = goog.labs.mock.timeout.timeout(1);

  setTimeout(() => {
    mockParent.method1();
  }, 50);

  const e = await assertRejects(
      goog.labs.mock.waitAndVerify(mockParent, timeoutMode).method1());
  assertTrue(e instanceof goog.labs.mock.TimeoutError);
  assertEquals(
      e.message,
      'Function call was either not invoked or never met criteria specified ' +
          'by provided verification mode. \n' +
          'Expected: method1() at least 1 times\n' +
          'Recorded: No recorded calls');
}

async function testWaitWithVerificationMode() {
  const mockParent = goog.labs.mock.mock(ParentClass);
  const verificationMode = goog.labs.mock.verification.times(2);

  mockParent.method1();

  const e = await assertRejects(
      goog.labs.mock.waitAndVerify(mockParent, verificationMode).method1());
  assertEquals(
      e.message,
      'Function call was either not invoked or never met criteria specified ' +
          'by provided verification mode. \n' +
          'Expected: method1() 2 times\n' +
          'Recorded: method1()');
}

async function testWaitOnSameMethodTwice() {
  const mockParent = goog.labs.mock.mock(ParentClass);

  mockParent.method1();

  await goog.labs.mock.waitAndVerify(mockParent).method1();
  await goog.labs.mock.waitAndVerify(mockParent).method1();
}

async function testWaitWithTimeoutAndVerificationMode() {
  const mockParent = goog.labs.mock.mock(ParentClass);
  const timeoutMode = goog.labs.mock.timeout.timeout(150);
  const verificationMode = goog.labs.mock.verification.times(2);

  setTimeout(() => {
    mockParent.method1();
  }, 50);

  setTimeout(() => {
    mockParent.method1();
  }, 250);

  const e = await assertRejects(
      goog.labs.mock.waitAndVerify(mockParent, timeoutMode, verificationMode)
          .method1());
  assertTrue(e instanceof goog.labs.mock.TimeoutError);
  assertEquals(
      e.message,
      'Function call was either not invoked or never met criteria specified ' +
          'by provided verification mode. \n' +
          'Expected: method1() 2 times\n' +
          'Recorded: method1()');
}

async function testPassingVerificationModeBeforeTimeoutMode() {
  const mockParent = goog.labs.mock.mock(ParentClass);
  const timeoutMode = goog.labs.mock.timeout.timeout(150);
  const verificationMode = goog.labs.mock.verification.times(2);

  setTimeout(() => {
    mockParent.method1();
  }, 50);

  setTimeout(() => {
    mockParent.method1();
  }, 250);

  const e = await assertRejects(
      goog.labs.mock.waitAndVerify(mockParent, verificationMode, timeoutMode)
          .method1());
  assertTrue(e instanceof goog.labs.mock.TimeoutError);
  assertEquals(
      e.message,
      'Function call was either not invoked or never met criteria specified ' +
          'by provided verification mode. \n' +
          'Expected: method1() 2 times\n' +
          'Recorded: method1()');
}

/**
* Asserts that the given string contains a list of others strings
* in the given order.
*/
function assertContainsInOrder(str, var_args) {
  const expected = goog.array.splice(arguments, 1);
  const indices = goog.array.map(expected, function(val) {
    return str.indexOf(val);
  });

  for (let i = 0; i < expected.length; i++) {
    let msg = 'Missing "' + expected[i] + '" from "' + str + '"';
    assertTrue(msg, indices[i] != -1);

    if (i > 0) {
      msg = '"' + expected[i - 1] + '" should come before "' + expected[i] +
          '" in "' + str + '"';
      assertTrue(msg, indices[i] > indices[i - 1]);
    }
  }
}

function testMatchers() {
  const obj = {
    method1: function(i) {
      return 2 * i;
    },
    method2: function(i) {
      return 5 * i;
    }
  };

  const mockObj = goog.labs.mock.mock(obj);

  goog.labs.mock.when(mockObj).method1(greaterThan(4)).thenReturn(100);
  goog.labs.mock.when(mockObj).method1(lessThan(4)).thenReturn(40);

  assertEquals(100, mockObj.method1(5));
  assertEquals(100, mockObj.method1(6));
  assertEquals(40, mockObj.method1(2));
  assertEquals(40, mockObj.method1(1));
  assertUndefined(mockObj.method1(4));
}

function testMatcherVerify() {
  const obj = {
    method: function(i) {
      return 2 * i;
    }
  };

  // Using spy objects.
  const spy = goog.labs.mock.spy(obj);

  spy.method(6);

  goog.labs.mock.verify(spy).method(greaterThan(4));
  let e = assertThrows(
      goog.partial(goog.labs.mock.verify(spy).method, lessThan(4)));
  assertTrue(e instanceof goog.labs.mock.VerificationError);

  // Using mocks
  const mockObj = goog.labs.mock.mock(obj);

  mockObj.method(8);

  goog.labs.mock.verify(mockObj).method(greaterThan(7));
  e = assertThrows(
      goog.partial(goog.labs.mock.verify(mockObj).method, lessThan(7)));
  assertTrue(e instanceof goog.labs.mock.VerificationError);
}

function testMatcherVerifyCollision() {
  const obj = {
    method: function(i) {
      return 2 * i;
    }
  };
  const mockObj = goog.labs.mock.mock(obj);

  goog.labs.mock.when(mockObj).method(5).thenReturn(100);
  assertNotEquals(100, mockObj.method(greaterThan(2)));
}

function testMatcherVerifyCollisionBetweenMatchers() {
  const obj = {
    method: function(i) {
      return 2 * i;
    }
  };
  const mockObj = goog.labs.mock.mock(obj);

  goog.labs.mock.when(mockObj).method(anything()).thenReturn(100);

  const e = assertThrows(
      goog.partial(goog.labs.mock.verify(mockObj).method, anything()));
  assertTrue(e instanceof goog.labs.mock.VerificationError);
}

function testVerifyForUnmockedMethods() {
  const Task = function() {};
  Task.prototype.run = function() {};

  const mockTask = goog.labs.mock.mock(Task);
  mockTask.run();

  goog.labs.mock.verify(mockTask).run();
}

function testFormatMethodCall() {
  const formatMethodCall = goog.labs.mock.formatMethodCall_;
  assertEquals('alert()', formatMethodCall('alert'));
  assertEquals('sum(2, 4)', formatMethodCall('sum', [2, 4]));
  assertEquals('sum("2", "4")', formatMethodCall('sum', ['2', '4']));
  assertEquals(
      'call(<function unicorn>)',
      formatMethodCall('call', [function unicorn() {}]));

  const arg = {x: 1, y: {hello: 'world'}};
  assertEquals(
      'call(' + goog.labs.mock.formatValue_(arg) + ')',
      formatMethodCall('call', [arg]));
}

function testGetFunctionName() {
  const f1 = function() {};
  const f2 = function() {};
  const named = function myName() {};

  assert(
      goog.string.startsWith(
          goog.labs.mock.getFunctionName_(f1), '#anonymous'));
  assert(
      goog.string.startsWith(
          goog.labs.mock.getFunctionName_(f2), '#anonymous'));
  assertNotEquals(
      goog.labs.mock.getFunctionName_(f1), goog.labs.mock.getFunctionName_(f2));
  assertEquals('myName', goog.labs.mock.getFunctionName_(named));
}

function testFormatObject() {
  let obj;
  let obj2;
  let obj3;

  obj = {x: 1};
  assertEquals(
      '{"x":1 _id:' + goog.labs.mock.getUid(obj) + '}',
      goog.labs.mock.formatValue_(obj));
  assertEquals('{"x":1}', goog.labs.mock.formatValue_(obj, false /* id */));

  obj = {x: 'hello'};
  assertEquals(
      '{"x":"hello" _id:' + goog.labs.mock.getUid(obj) + '}',
      goog.labs.mock.formatValue_(obj));
  assertEquals(
      '{"x":"hello"}', goog.labs.mock.formatValue_(obj, false /* id */));

  obj3 = {};
  obj2 = {y: obj3};
  obj3.x = obj2;
  assertEquals(
      '{"x":{"y":<recursive/dupe obj_' + goog.labs.mock.getUid(obj3) + '> ' +
          '_id:' + goog.labs.mock.getUid(obj2) + '} ' +
          '_id:' + goog.labs.mock.getUid(obj3) + '}',
      goog.labs.mock.formatValue_(obj3));
  assertEquals(
      '{"x":{"y":<recursive/dupe>}}',
      goog.labs.mock.formatValue_(obj3, false /* id */));


  obj = {x: function y() {}};
  assertEquals(
      '{"x":<function y> _id:' + goog.labs.mock.getUid(obj) + '}',
      goog.labs.mock.formatValue_(obj));
  assertEquals(
      '{"x":<function y>}', goog.labs.mock.formatValue_(obj, false /* id */));
}

function testGetUid() {
  const obj1 = {};
  const obj2 = {};
  const func1 = function() {};
  const func2 = function() {};

  assertNotEquals(goog.labs.mock.getUid(obj1), goog.labs.mock.getUid(obj2));
  assertNotEquals(goog.labs.mock.getUid(func1), goog.labs.mock.getUid(func2));
  assertNotEquals(goog.labs.mock.getUid(obj1), goog.labs.mock.getUid(func2));
  assertEquals(goog.labs.mock.getUid(obj1), goog.labs.mock.getUid(obj1));
  assertEquals(goog.labs.mock.getUid(func1), goog.labs.mock.getUid(func1));
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

  const mockObj = goog.labs.mock.mock(Foo);
  goog.labs.mock.when(mockObj).a().thenReturn('a');
  assertThrowsJsUnitException(function() { new Foo().a(); });
  assertEquals('a', mockObj.a());
  goog.labs.mock.verify(mockObj).a();
}
