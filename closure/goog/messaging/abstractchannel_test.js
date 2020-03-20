/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

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
