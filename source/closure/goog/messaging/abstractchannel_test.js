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

goog.module('goog.messaging.AbstractChannelTest');
goog.setTestOnly();

const AbstractChannel = goog.require('goog.messaging.AbstractChannel');
const AsyncMockControl = goog.require('goog.testing.async.MockControl');
const MockControl = goog.require('goog.testing.MockControl');
const testSuite = goog.require('goog.testing.testSuite');

let mockControl;
let mockWorker;
let asyncMockControl;
let channel;

testSuite({
  setUp() {
    mockControl = new MockControl();
    asyncMockControl = new AsyncMockControl(mockControl);
    channel = new AbstractChannel();
  },

  tearDown() {
    channel.dispose();
    mockControl.$verifyAll();
  },

  testConnect() {
    channel.connect(
        asyncMockControl.createCallbackMock('connectCallback', () => {}));
  },

  testIsConnected() {
    assertTrue('Channel should be connected by default', channel.isConnected());
  },

  testDeliverString() {
    channel.registerService(
        'foo',
        asyncMockControl.asyncAssertEquals(
            'should pass string to service', 'bar'),
        false /* opt_json */);
    channel.deliver('foo', 'bar');
  },

  testDeliverDeserializedString() {
    channel.registerService(
        'foo',
        asyncMockControl.asyncAssertEquals(
            'should pass string to service', '{"bar":"baz"}'),
        false /* opt_json */);
    channel.deliver('foo', {bar: 'baz'});
  },

  testDeliverObject() {
    channel.registerService(
        'foo',
        asyncMockControl.asyncAssertEquals(
            'should pass string to service', {bar: 'baz'}),
        true /* opt_json */);
    channel.deliver('foo', {bar: 'baz'});
  },

  testDeliverSerializedObject() {
    channel.registerService(
        'foo',
        asyncMockControl.asyncAssertEquals(
            'should pass string to service', {bar: 'baz'}),
        true /* opt_json */);
    channel.deliver('foo', '{"bar":"baz"}');
  },
});
