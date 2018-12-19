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

goog.provide('goog.testing.LooseMockTest');
goog.setTestOnly('goog.testing.LooseMockTest');

goog.require('goog.testing.LooseMock');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.mockmatchers');

// The object that we will be mocking
var RealObject = function() {};

RealObject.prototype.a = function() {
  fail('real object should never be called');
};

RealObject.prototype.b = function() {
  fail('real object should never be called');
};

var mock;


function setUp() {
  var obj = new RealObject();
  mock = new goog.testing.LooseMock(obj);
}


// Most of the basic functionality is tested in strictmock_test; these tests
// cover the cases where loose mocks are different from strict mocks
function testSimpleExpectations() {
  mock.a(5);
  mock.b();
  mock.$replay();
  mock.a(5);
  mock.b();
  mock.$verify();

  mock.$reset();

  mock.a();
  mock.b();
  mock.$replay();
  mock.b();
  mock.a();
  mock.$verify();

  mock.$reset();

  mock.a(5).$times(2);
  mock.a(5);
  mock.a(2);
  mock.$replay();
  mock.a(5);
  mock.a(5);
  mock.a(5);
  mock.a(2);
  mock.$verify();
}


function testMultipleExpectations() {
  mock.a().$returns(1);
  mock.a().$returns(2);
  mock.$replay();
  assertEquals(1, mock.a());
  assertEquals(2, mock.a());
  mock.$verify();
}


function testMultipleExpectationArgs() {
  mock.a('asdf').$anyTimes();
  mock.a('qwer').$anyTimes();
  mock.b().$times(3);
  mock.$replay();
  mock.a('asdf');
  mock.b();
  mock.a('asdf');
  mock.a('qwer');
  mock.b();
  mock.a('qwer');
  mock.b();
  mock.$verify();

  mock.$reset();

  mock.a('asdf').$anyTimes();
  mock.a('qwer').$anyTimes();
  mock.$replay();
  mock.a('asdf');
  mock.a('qwer');
  goog.bind(mock.a, mock, 'asdf');
  goog.bind(mock.$verify, mock);
}

function testSameMethodOutOfOrder() {
  mock.a('foo').$returns(1);
  mock.a('bar').$returns(2);
  mock.$replay();
  assertEquals(2, mock.a('bar'));
  assertEquals(1, mock.a('foo'));
}

function testSameMethodDifferentReturnValues() {
  mock.a('foo').$returns(1).$times(2);
  mock.a('foo').$returns(3);
  mock.a('bar').$returns(2);
  mock.$replay();
  assertEquals(1, mock.a('foo'));
  assertEquals(2, mock.a('bar'));
  assertEquals(1, mock.a('foo'));
  assertEquals(3, mock.a('foo'));
  assertThrowsJsUnitException(function() {
    mock.a('foo');
    mock.$verify();
  });
}

function testSameMethodBrokenExpectations() {
  // This is a weird corner case.
  // No way to ever make this verify no matter what you call after replaying,
  // because the second expectation of mock.a('foo') will be masked by
  // the first expectation that can be called any number of times, and so we
  // can never satisfy that second expectation.
  mock.a('foo').$returns(1).$anyTimes();
  mock.a('bar').$returns(2);
  mock.a('foo').$returns(3);

  // LooseMock can detect this case and fail on $replay.
  assertThrowsJsUnitException(goog.bind(mock.$replay, mock));
  mock.$reset();

  // This is a variant of the corner case above, but it's harder to determine
  // that the expectation to mock.a('bar') can never be satisfied. So we don't
  // fail on $replay, but we do fail on $verify.
  mock.a(goog.testing.mockmatchers.isString).$returns(1).$anyTimes();
  mock.a('bar').$returns(2);
  mock.$replay();

  assertEquals(1, mock.a('foo'));
  assertEquals(1, mock.a('bar'));
  assertThrowsJsUnitException(goog.bind(mock.$verify, mock));
}

function testSameMethodMultipleAnyTimes() {
  mock.a('foo').$returns(1).$anyTimes();
  mock.a('foo').$returns(2).$anyTimes();
  mock.$replay();
  assertEquals(1, mock.a('foo'));
  assertEquals(1, mock.a('foo'));
  assertEquals(1, mock.a('foo'));
  // Note we'll never return 2 but that's ok.
  mock.$verify();
}

function testFailingFast() {
  mock.a().$anyTimes();
  mock.$replay();
  mock.a();
  mock.a();
  assertThrowsJsUnitException(goog.bind(mock.b, mock));
  mock.$reset();

  // too many
  mock.a();
  mock.b();
  mock.$replay();
  mock.a();
  mock.b();

  var e = assertThrowsJsUnitException(goog.bind(mock.a, mock));

  assertContains('Too many calls to a', e.message);
}

function testTimes() {
  mock.a().$times(3);
  mock.b().$times(2);
  mock.$replay();
  mock.a();
  mock.b();
  mock.b();
  mock.a();
  mock.a();
  mock.$verify();
}


function testFailingSlow() {
  // not enough
  mock.a().$times(3);
  mock.$replay();
  mock.a();
  mock.a();
  assertThrowsJsUnitException(goog.bind(mock.$verify, mock));

  mock.$reset();

  // not enough, interleaved order
  mock.a().$times(3);
  mock.b().$times(3);
  mock.$replay();
  mock.a();
  mock.b();
  mock.a();
  mock.b();
  assertThrowsJsUnitException(goog.bind(mock.$verify, mock));

  mock.$reset();
  // bad args
  mock.a('asdf').$anyTimes();
  mock.$replay();
  mock.a('asdf');
  assertThrowsJsUnitException(goog.bind(mock.a, mock, 'qwert'));
  assertThrowsJsUnitException(goog.bind(mock.$verify, mock));
}


function testArgsAndReturns() {
  mock.a('asdf').$atLeastOnce().$returns(5);
  mock.b('qwer').$times(2).$returns(3);
  mock.$replay();
  assertEquals(5, mock.a('asdf'));
  assertEquals(3, mock.b('qwer'));
  assertEquals(5, mock.a('asdf'));
  assertEquals(5, mock.a('asdf'));
  assertEquals(3, mock.b('qwer'));
  mock.$verify();
}


function testThrows() {
  mock.a().$throws('exception!');
  mock.$replay();
  assertThrows(goog.bind(mock.a, mock));
  mock.$verify();
}


function testDoes() {
  mock.a(1, 2).$does(function(a, b) { return a + b; });
  mock.$replay();
  assertEquals('Mock should call the function', 3, mock.a(1, 2));
  mock.$verify();
}

function testIgnoresExtraCalls() {
  mock = new goog.testing.LooseMock(RealObject, true);
  mock.a();
  mock.$replay();
  mock.a();
  mock.b();  // doesn't throw
  mock.$verify();
}

function testSkipAnyTimes() {
  mock = new goog.testing.LooseMock(RealObject);
  mock.a(1).$anyTimes();
  mock.a(2).$anyTimes();
  mock.a(3).$anyTimes();
  mock.$replay();
  mock.a(1);
  mock.a(3);
  mock.$verify();
}

function testErrorMessageForBadArgs() {
  mock.a();
  mock.$anyTimes();

  mock.$replay();

  var e = assertThrowsJsUnitException(function() {
    mock.a('a');
  });

  assertContains('Bad arguments to a()', e.message);
}

async function testWaitAndVerify() {
  mock.a();
  mock.$replay();

  setTimeout(() => {
    mock.a();
  }, 0);
  await mock.$waitAndVerify();
}

async function testWaitAndVerify_Multiple() {
  mock.a().$times(2);
  mock.$replay();

  setTimeout(() => {
    mock.a();
  }, 0);
  setTimeout(() => {
    mock.a();
  }, 50);
  await mock.$waitAndVerify();
}

async function testWaitAndVerify_Never() {
  mock.a().$never();
  mock.$replay();

  await mock.$waitAndVerify();
}

async function testWaitAndVerify_Synchronous() {
  mock.a();
  mock.$replay();

  mock.a();
  await mock.$waitAndVerify();
}

async function testWaitAndVerify_Exception() {
  mock.a();
  mock.$replay();

  setTimeout(() => {
    assertThrowsJsUnitException(() => {
      mock.a(false);
    });
  }, 0);
  await assertRejects(mock.$waitAndVerify());
}

async function testWaitAndVerify_Reset() {
  mock.a();
  mock.$replay();

  setTimeout(() => {
    mock.a();
  }, 0);
  await mock.$waitAndVerify();
  mock.$reset();
  mock.a();
  mock.$replay();

  setTimeout(() => {
    mock.a();
  }, 0);
  await mock.$waitAndVerify();
}
