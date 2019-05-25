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

goog.module('goog.testing.StrictMockTest');
goog.setTestOnly();

const StrictMock = goog.require('goog.testing.StrictMock');
const testSuite = goog.require('goog.testing.testSuite');

// The object that we will be mocking
class RealObject {
  a() {
    fail('real object should never be called');
  }

  b() {
    fail('real object should never be called');
  }

  c() {
    fail('real object should never be called');
  }
}

let mock;

testSuite({
  setUp() {
    const obj = new RealObject();
    mock = new StrictMock(obj);
  },

  testMockFunction() {
    const mock = new StrictMock(RealObject);
    mock.a();
    mock.b();
    mock.c();
    mock.$replay();
    mock.a();
    mock.b();
    mock.c();
    mock.$verify();

    mock.$reset();

    assertThrows(() => {
      mock.x();
    });
  },

  testSimpleExpectations() {
    mock.a();
    mock.$replay();
    mock.a();
    mock.$verify();

    mock.$reset();

    mock.a();
    mock.b();
    mock.a();
    mock.a();
    mock.$replay();
    mock.a();
    mock.b();
    mock.a();
    mock.a();
    mock.$verify();
  },

  testFailToSetExpectation() {
    mock.$replay();
    assertThrowsJsUnitException(goog.bind(mock.a, mock));

    mock.$reset();

    mock.$replay();
    assertThrowsJsUnitException(goog.bind(mock.b, mock));
  },

  testUnexpectedCall() {
    mock.a();
    mock.$replay();
    mock.a();
    assertThrowsJsUnitException(goog.bind(mock.a, mock));

    mock.$reset();

    mock.a();
    mock.$replay();
    assertThrowsJsUnitException(goog.bind(mock.b, mock));
  },

  testNotEnoughCalls() {
    mock.a();
    mock.$replay();
    assertThrowsJsUnitException(goog.bind(mock.$verify, mock));

    mock.$reset();

    mock.a();
    mock.b();
    mock.$replay();
    mock.a();
    assertThrowsJsUnitException(goog.bind(mock.$verify, mock));
  },

  testOutOfOrderCalls() {
    mock.a();
    mock.b();
    mock.$replay();
    assertThrowsJsUnitException(goog.bind(mock.b, mock));
  },

  testVerify() {
    mock.a();
    mock.$replay();
    mock.a();
    mock.$verify();

    mock.$reset();

    mock.a();
    mock.$replay();
    assertThrowsJsUnitException(goog.bind(mock.$verify, mock));
  },

  testArgumentMatching() {
    mock.a('foo');
    mock.b('bar');
    mock.$replay();
    mock.a('foo');
    assertThrowsJsUnitException(() => {
      mock.b('foo');
    });

    mock.$reset();
    mock.a('foo');
    mock.a('bar');
    mock.$replay();
    mock.a('foo');
    mock.a('bar');
    mock.$verify();

    mock.$reset();
    mock.a('foo');
    mock.a('bar');
    mock.$replay();
    assertThrowsJsUnitException(() => {
      mock.a('bar');
    });
  },

  testReturnValue() {
    mock.a().$returns(5);
    mock.$replay();

    assertEquals('Mock should return the right value', 5, mock.a());

    mock.$verify();
  },

  testMultipleReturnValues() {
    mock.a().$returns(3);
    mock.a().$returns(2);
    mock.a().$returns(1);

    mock.$replay();

    assertArrayEquals(
        'Mock should return the right value sequence', [3, 2, 1],
        [mock.a(), mock.a(), mock.a()]);

    mock.$verify();
  },

  testAtMostOnce() {
    // Zero times SUCCESS.
    mock.a().$atMostOnce();
    mock.$replay();
    mock.$verify();

    mock.$reset();

    // One time SUCCESS.
    mock.a().$atMostOnce();
    mock.$replay();
    mock.a();
    mock.$verify();

    mock.$reset();

    // Many times FAIL.
    mock.a().$atMostOnce();
    mock.$replay();
    mock.a();
    assertThrowsJsUnitException(goog.bind(mock.a, mock));

    mock.$reset();

    // atMostOnce only lasts until a new method is called.
    mock.a().$atMostOnce();
    mock.b();
    mock.a();
    mock.$replay();
    mock.b();
    assertThrowsJsUnitException(goog.bind(mock.$verify, mock));
  },

  testAtLeastOnce() {
    // atLeastOnce does not mean zero times
    mock.a().$atLeastOnce();
    mock.$replay();
    assertThrowsJsUnitException(goog.bind(mock.$verify, mock));

    mock.$reset();

    // atLeastOnce does mean three times
    mock.a().$atLeastOnce();
    mock.$replay();
    mock.a();
    mock.a();
    mock.a();
    mock.$verify();

    mock.$reset();

    // atLeastOnce only lasts until a new method is called
    mock.a().$atLeastOnce();
    mock.b();
    mock.a();
    mock.$replay();
    mock.a();
    mock.a();
    mock.b();
    mock.a();
    assertThrowsJsUnitException(goog.bind(mock.a, mock));
  },

  testAtLeastOnceWithArgs() {
    mock.a('asdf').$atLeastOnce();
    mock.a('qwert');
    mock.$replay();
    mock.a('asdf');
    mock.a('asdf');
    mock.a('qwert');
    mock.$verify();

    mock.$reset();

    mock.a('asdf').$atLeastOnce();
    mock.a('qwert');
    mock.$replay();
    mock.a('asdf');
    mock.a('asdf');
    assertThrowsJsUnitException(() => {
      mock.a('zxcv');
    });
    assertThrowsJsUnitException(goog.bind(mock.$verify, mock));
  },

  testAnyTimes() {
    mock.a().$anyTimes();
    mock.$replay();
    mock.$verify();

    mock.$reset();

    mock.a().$anyTimes();
    mock.$replay();
    mock.a();
    mock.a();
    mock.a();
    mock.a();
    mock.a();
    mock.$verify();
  },

  testAnyTimesWithArguments() {
    mock.a('foo').$anyTimes();
    mock.$replay();
    mock.$verify();

    mock.$reset();

    mock.a('foo').$anyTimes();
    mock.a('bar').$anyTimes();
    mock.$replay();
    mock.a('foo');
    mock.a('foo');
    mock.a('foo');
    mock.a('bar');
    mock.a('bar');
    mock.$verify();
  },

  testZeroTimes() {
    mock.a().$times(0);
    mock.$replay();
    mock.$verify();

    mock.$reset();

    mock.a().$times(0);
    mock.$replay();
    assertThrowsJsUnitException(() => {
      mock.a();
    });
  },

  testZeroTimesWithArguments() {
    mock.a('foo').$times(0);
    mock.$replay();
    mock.$verify();

    mock.$reset();

    mock.a('foo').$times(0);
    mock.$replay();
    assertThrowsJsUnitException(() => {
      mock.a('foo');
    });
  },

  testTooManyCalls() {
    mock.a().$times(2);
    mock.$replay();
    mock.a();
    mock.a();
    assertThrowsJsUnitException(() => {
      mock.a();
    });
  },

  testTooManyCallsWithArguments() {
    mock.a('foo').$times(2);
    mock.$replay();
    mock.a('foo');
    mock.a('foo');
    assertThrowsJsUnitException(() => {
      mock.a('foo');
    });
  },

  testMultipleSkippedAnyTimes() {
    mock.a().$anyTimes();
    mock.b().$anyTimes();
    mock.c().$anyTimes();
    mock.$replay();
    mock.c();
    mock.$verify();
  },

  testMultipleSkippedAnyTimesWithArguments() {
    mock.a('foo').$anyTimes();
    mock.a('bar').$anyTimes();
    mock.a('baz').$anyTimes();
    mock.$replay();
    mock.a('baz');
    mock.$verify();
  },

  testVerifyThrows() {
    mock.a(1);
    mock.$replay();
    mock.a(1);
    try {
      mock.a(2);
      fail('bad mock, should fail');
    } catch (ex) {
      // this could be an event handler, for example
    }
    assertThrowsJsUnitException(goog.bind(mock.$verify, mock));
  },

  testThrows() {
    mock.a().$throws('exception!');
    mock.$replay();
    assertThrows(goog.bind(mock.a, mock));
    mock.$verify();
  },

  testDoes() {
    mock.a(1, 2).$does((a, b) => a + b);
    mock.$replay();
    assertEquals('Mock should call the function', 3, mock.a(1, 2));
    mock.$verify();
  },

  testErrorMessageForBadArgs() {
    mock.a();
    mock.$anyTimes();

    mock.$replay();

    const e = assertThrowsJsUnitException(() => {
      mock.a('a');
    });

    assertContains('Bad arguments to a()', e.message);
  },

  async testWaitAndVerify() {
    mock.a();
    mock.$replay();

    setTimeout(() => {
      mock.a();
    }, 0);
    await mock.$waitAndVerify();
  },

  async testWaitAndVerify_Multiple() {
    mock.a().$times(2);
    mock.$replay();

    setTimeout(() => {
      mock.a();
    }, 0);
    setTimeout(() => {
      mock.a();
    }, 50);
    await mock.$waitAndVerify();
  },

  async testWaitAndVerify_Never() {
    mock.a().$never();
    mock.$replay();

    await mock.$waitAndVerify();
  },

  async testWaitAndVerify_Synchronous() {
    mock.a();
    mock.$replay();

    mock.a();
    await mock.$waitAndVerify();
  },

  async testWaitAndVerify_Exception() {
    mock.a();
    mock.$replay();

    setTimeout(() => {
      assertThrowsJsUnitException(() => {
        mock.a(false);
      });
    }, 0);
    await assertRejects(mock.$waitAndVerify());
  },

  async testWaitAndVerify_Reset() {
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
  },
});
