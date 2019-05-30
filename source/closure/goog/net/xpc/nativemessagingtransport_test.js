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

goog.module('goog.net.xpc.NativeMessagingTransportTest');
goog.setTestOnly();

const CfgFields = goog.require('goog.net.xpc.CfgFields');
const CrossPageChannel = goog.require('goog.net.xpc.CrossPageChannel');
const CrossPageChannelRole = goog.require('goog.net.xpc.CrossPageChannelRole');
const NativeMessagingTransport = goog.require('goog.net.xpc.NativeMessagingTransport');
const dom = goog.require('goog.dom');
const events = goog.require('goog.events');
const netXpc = goog.require('goog.net.xpc');
const testSuite = goog.require('goog.testing.testSuite');

// This test only tests the native messaing transport protocol version 2.
// Testing of previous versions and of backward/forward compatibility is done
// in crosspagechannel_test.html.

function checkSignalConnected(
    oneSidedHandshake, innerFrame, peerProtocolVersion, protocolVersion) {
  const xpc = getTestChannel();
  let connected = false;
  xpc.notifyConnected = () => {
    if (connected) {
      fail('unexpected');
    } else {
      connected = true;
    }
  };
  xpc.getRole = () =>
      innerFrame ? CrossPageChannelRole.INNER : CrossPageChannelRole.OUTER;
  xpc.isConnected = () => false;

  const transport = new NativeMessagingTransport(
      xpc, 'http://g.com', undefined /* opt_domHelper */,
      oneSidedHandshake /* opt_oneSidedHandshake */, 2 /* protocolVerion */);
  let sentPayloads = [];
  transport.send = (service, payload) => {
    assertEquals(netXpc.TRANSPORT_SERVICE_, service);
    sentPayloads.push(payload);
  };
  function assertSent(payloads) {
    assertArrayEquals(payloads, sentPayloads);
    sentPayloads = [];
  }
  const endpointId = transport.endpointId_;
  const peerEndpointId1 = 'abc123';
  const peerEndpointId2 = 'def234';

  assertFalse(connected);
  if (!oneSidedHandshake || innerFrame) {
    transport.transportServiceHandler(
        netXpc.SETUP_NTPV2 + ',' + peerEndpointId1);
    transport.transportServiceHandler(netXpc.SETUP);
    assertSent([netXpc.SETUP_ACK_NTPV2]);
    assertFalse(connected);
    transport.transportServiceHandler(netXpc.SETUP_ACK_NTPV2);
    assertSent([]);
    assertTrue(connected);
  } else {
    transport.transportServiceHandler(netXpc.SETUP_ACK_NTPV2);
    assertSent([]);
    assertFalse(connected);
    transport.transportServiceHandler(
        netXpc.SETUP_NTPV2 + ',' + peerEndpointId1);
    transport.transportServiceHandler(netXpc.SETUP);
    assertSent([netXpc.SETUP_ACK_NTPV2]);
    assertTrue(connected);
  }

  // Verify that additional transport service traffic doesn't cause duplicate
  // notifications.
  transport.transportServiceHandler(netXpc.SETUP_NTPV2 + ',' + peerEndpointId1);
  transport.transportServiceHandler(netXpc.SETUP);
  assertSent([netXpc.SETUP_ACK_NTPV2]);
  transport.transportServiceHandler(netXpc.SETUP_ACK_NTPV2);
  assertSent([]);

  // Simulate a reconnection by sending a SETUP message from a frame with a
  // different endpoint id.  No further connection callbacks should fire, but
  // a new SETUP message should be triggered.
  transport.transportServiceHandler(netXpc.SETUP_NTPV2 + ',' + peerEndpointId2);
  transport.transportServiceHandler(netXpc.SETUP);
  assertSent([
    netXpc.SETUP_ACK_NTPV2,
    netXpc.SETUP_NTPV2 + ',' + endpointId,
  ]);
  transport.transportServiceHandler(netXpc.SETUP_ACK_NTPV2);
  assertSent([]);
}

/**
 * Creates a Mock Event object used to test browser events.
 * @param {string} origin The URI origin, or '*', of the event.
 * @param {string} data The data to associate with the event.
 * @return {!Object} The created object representing a browser event.
 */
function createMockEvent(origin, data) {
  const event = {};
  event.getBrowserEvent = () => ({origin: origin, data: data});
  return event;
}

function getTestChannel(domHelper = undefined) {
  const cfg = {};
  cfg[CfgFields.CHANNEL_NAME] = 'test_channel';
  cfg[CfgFields.PEER_HOSTNAME] = 'trusted_origin';
  return new CrossPageChannel(
      cfg, domHelper, undefined /* opt_domHelper */,
      false /* opt_oneSidedHandshake */, 2 /* opt_protocolVersion */);
}

testSuite({
  tearDown() {
    NativeMessagingTransport.activeCount_ = {};
    events.removeAll(window.postMessage ? window : document, 'message');
  },

  testConstructor() {
    const xpc = getTestChannel();

    let t = new NativeMessagingTransport(
        xpc, 'http://g.com:80', undefined /* opt_domHelper */,
        false /* opt_oneSidedHandshake */, 2 /* opt_protocolVersion */);
    assertEquals('http://g.com:80', t.peerHostname_);

    t = new NativeMessagingTransport(
        xpc, null /* peerHostName */, undefined /* opt_domHelper */,
        false /* opt_oneSidedHandshake */, 2 /* opt_protocolVersion */);
    assertEquals('*', t.peerHostname_);
    t.dispose();
  },

  testConstructorDom() {
    const xpc = getTestChannel();

    const t = new NativeMessagingTransport(
        xpc, 'http://g.com:80', dom.getDomHelper(),
        false /* opt_oneSidedHandshake */, 2 /* opt_protocolVersion */);
    assertEquals('http://g.com:80', t.peerHostname_);

    const t2 = new NativeMessagingTransport(
        xpc, null /* peerHostName */, false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);
    assertEquals('*', t2.peerHostname_);
    t2.dispose();
  },

  testDispose() {
    const xpc = getTestChannel();
    const listenedObj = window.postMessage ? window : document;

    const t0 = new NativeMessagingTransport(
        xpc, null /* peerHostName */, false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);
    assertEquals(0, events.removeAll(listenedObj, 'message'));
    t0.dispose();
    assertEquals(0, events.removeAll(listenedObj, 'message'));

    const t1 = new NativeMessagingTransport(
        xpc, null /* peerHostName */, false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);
    t1.connect();
    t1.dispose();
    assertEquals(0, events.removeAll(listenedObj, 'message'));

    const t2 = new NativeMessagingTransport(
        xpc, null /* peerHostName */, false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);
    const t3 = new NativeMessagingTransport(
        xpc, null /* peerHostName */, false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);
    t2.connect();
    t3.connect();
    t2.dispose();
    assertEquals(1, events.removeAll(listenedObj, 'message'));
  },

  testDisposeWithDom() {
    const xpc = getTestChannel(dom.getDomHelper());
    const listenedObj = window.postMessage ? window : document;

    const t0 = new NativeMessagingTransport(
        xpc, null /* peerHostName */, false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);
    assertEquals(0, events.removeAll(listenedObj, 'message'));
    t0.dispose();
    assertEquals(0, events.removeAll(listenedObj, 'message'));

    const t1 = new NativeMessagingTransport(
        xpc, null /* peerHostName */, false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);
    t1.connect();
    t1.dispose();
    assertEquals(0, events.removeAll(listenedObj, 'message'));

    const t2 = new NativeMessagingTransport(
        xpc, null /* peerHostName */, false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);
    const t3 = new NativeMessagingTransport(
        xpc, null /* peerHostName */, false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);
    t2.connect();
    t3.connect();
    t2.dispose();
    assertEquals(1, events.removeAll(listenedObj, 'message'));
  },

  testBogusMessages() {
    let e = createMockEvent('origin_unknown', 'bogus_message');
    assertFalse(NativeMessagingTransport.messageReceived_(e));

    e = createMockEvent('origin_unknown', 'bogus|message');
    assertFalse(NativeMessagingTransport.messageReceived_(e));

    e = createMockEvent('origin_unknown', 'bogus|message:data');
    assertFalse(NativeMessagingTransport.messageReceived_(e));
  },

  testSendingMessagesToUnconnectedInnerPeer() {
    const xpc = getTestChannel();

    let payloadResult;
    let serviceResult;

    xpc.xpcDeliver = (service, payload) => {
      serviceResult = service;
      payloadResult = payload;
    };

    // Construct an unconnected inner peer.
    xpc.getRole = () => CrossPageChannelRole.INNER;
    xpc.isConnected = () => false;
    const t = new NativeMessagingTransport(
        xpc, 'http://g.com', false /* opt_oneSidedHandshake */,
        2 /* opt_protocolVersion */);

    // Test a valid message.
    let e = createMockEvent(
        'origin_unknown', 'test_channel|test_service:test_payload');
    assertTrue(NativeMessagingTransport.messageReceived_(e));
    assertEquals('test_service', serviceResult);
    assertEquals('test_payload', payloadResult);
    assertEquals(
        'Ensure channel name has not been changed.', 'test_channel',
        t.channel_.name);

    // Test that sending a SETUP message from an untrusted origin doesn't update
    // the channel name.  This is a regression test for b/33746803.
    e = createMockEvent('untrusted_origin', 'new_channel|tp:SETUP');
    assertFalse(NativeMessagingTransport.messageReceived_(e));
    assertEquals(
        'Channel name should not change from untrusted origin', 'test_channel',
        t.channel_.name);

    // Test updating a stale inner peer.
    e = createMockEvent('trusted_origin', 'new_channel|tp:SETUP');
    assertTrue(NativeMessagingTransport.messageReceived_(e));
    assertEquals('tp', serviceResult);
    assertEquals('SETUP', payloadResult);
    assertEquals(
        'Ensure channel name has been updated.', 'new_channel',
        t.channel_.name);
    t.dispose();
  },

  testSignalConnected_innerFrame() {
    checkSignalConnected(false /* oneSidedHandshake */, true /* innerFrame */);
  },

  testSignalConnected_outerFrame() {
    checkSignalConnected(false /* oneSidedHandshake */, false /* innerFrame */);
  },

  testSignalConnected_singleSided_innerFrame() {
    checkSignalConnected(true /* oneSidedHandshake */, true /* innerFrame */);
  },

  testSignalConnected_singleSided_outerFrame() {
    checkSignalConnected(true /* oneSidedHandshake */, false /* innerFrame */);
  },
});
