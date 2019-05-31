// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.messaging.MultiChannelTest');
goog.setTestOnly();

const IgnoreArgument = goog.require('goog.testing.mockmatchers.IgnoreArgument');
const MockControl = goog.require('goog.testing.MockControl');
const MockMessageChannel = goog.require('goog.testing.messaging.MockMessageChannel');
const MultiChannel = goog.require('goog.messaging.MultiChannel');
const testSuite = goog.require('goog.testing.testSuite');

let mockControl;
let mockChannel;
let multiChannel;
let channel0;
let channel1;
let channel2;

function expectedFn(name, callback) {
  const ignored = new IgnoreArgument();
  const fn = mockControl.createFunctionMock(name);
  fn(ignored).$does(function(args) { callback.apply(this, args); });
  return function() { fn(arguments); };
}

function notExpectedFn() {
  return mockControl.createFunctionMock('notExpectedFn');
}

function assertEqualsFn() {
  const expectedArgs = Array.prototype.slice.call(arguments);
  return expectedFn('assertEqualsFn', function() {
    assertObjectEquals(expectedArgs, Array.prototype.slice.call(arguments));
  });
}

testSuite({
  setUp() {
    mockControl = new MockControl();
    mockChannel = new MockMessageChannel(mockControl);
    multiChannel = new MultiChannel(mockChannel);
    channel0 = multiChannel.createVirtualChannel('foo');
    channel1 = multiChannel.createVirtualChannel('bar');
  },

  tearDown() {
    multiChannel.dispose();
    mockControl.$verifyAll();
    assertTrue(mockChannel.disposed);
  },

  testSend0() {
    mockChannel.send('foo:fooBar', {foo: 'bar'});
    mockControl.$replayAll();
    channel0.send('fooBar', {foo: 'bar'});
  },

  testSend1() {
    mockChannel.send('bar:fooBar', {foo: 'bar'});
    mockControl.$replayAll();
    channel1.send('fooBar', {foo: 'bar'});
  },

  testReceive0() {
    channel0.registerService('fooBar', assertEqualsFn('Baz bang'));
    channel1.registerService('fooBar', notExpectedFn());
    mockControl.$replayAll();
    mockChannel.receive('foo:fooBar', 'Baz bang');
  },

  testReceive1() {
    channel1.registerService('fooBar', assertEqualsFn('Baz bang'));
    channel0.registerService('fooBar', notExpectedFn());
    mockControl.$replayAll();
    mockChannel.receive('bar:fooBar', 'Baz bang');
  },

  testDefaultReceive0() {
    channel0.registerDefaultService(assertEqualsFn('fooBar', 'Baz bang'));
    channel1.registerDefaultService(notExpectedFn());
    mockControl.$replayAll();
    mockChannel.receive('foo:fooBar', 'Baz bang');
  },

  testDefaultReceive1() {
    channel1.registerDefaultService(assertEqualsFn('fooBar', 'Baz bang'));
    channel0.registerDefaultService(notExpectedFn());
    mockControl.$replayAll();
    mockChannel.receive('bar:fooBar', 'Baz bang');
  },

  testReceiveAfterDisposed() {
    channel0.registerService('fooBar', notExpectedFn());
    mockControl.$replayAll();
    channel0.dispose();
    mockChannel.receive('foo:fooBar', 'Baz bang');
  },

  testReceiveAfterParentDisposed() {
    channel0.registerService('fooBar', notExpectedFn());
    mockControl.$replayAll();
    multiChannel.dispose();
    mockChannel.receive('foo:fooBar', 'Baz bang');
  },
});
