// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for WebChannelBase.@suppress {accessControls}
 * Private methods are accessed for test purposes.
 */

goog.module('goog.labs.net.webChannel.webChannelBaseTransportTest');
goog.setTestOnly();

const ChannelRequest = goog.require('goog.labs.net.webChannel.ChannelRequest');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const WebChannel = goog.require('goog.net.WebChannel');
const WebChannelBase = goog.require('goog.labs.net.webChannel.WebChannelBase');
const WebChannelBaseTransport = goog.require('goog.labs.net.webChannel.WebChannelBaseTransport');
const Wire = goog.require('goog.labs.net.webChannel.Wire');
const events = goog.require('goog.events');
const functions = goog.require('goog.functions');
const googJson = goog.require('goog.json');
const testSuite = goog.require('goog.testing.testSuite');

let webChannel;
const channelUrl = 'http://127.0.0.1:8080/channel';

const stubs = new PropertyReplacer();

/** Stubs ChannelRequest. */
function stubChannelRequest() {
  stubs.set(ChannelRequest, 'supportsXhrStreaming', functions.FALSE);
}

/**
 * Simulates the WebChannelBase firing the open event for the given channel.
 * @param {!WebChannelBase} channel The WebChannelBase.
 */
function simulateOpenEvent(channel) {
  assertNotNull(channel.getHandler());
  channel.getHandler().channelOpened();
}

/**
 * Simulates the WebChannelBase firing the close event for the given channel.
 * @param {!WebChannelBase} channel The WebChannelBase.
 */
function simulateCloseEvent(channel) {
  assertNotNull(channel.getHandler());
  channel.getHandler().channelClosed();
}

/**
 * Simulates the WebChannelBase firing the error event for the given channel.
 * @param {!WebChannelBase} channel The WebChannelBase.
 */
function simulateErrorEvent(channel) {
  assertNotNull(channel.getHandler());
  channel.getHandler().channelError();
}

/**
 * Simulates the WebChannelBase firing the message event for the given channel.
 * @param {!WebChannelBase} channel The WebChannelBase.
 * @param {String} data The message data.
 */
function simulateMessageEvent(channel, data) {
  assertNotNull(channel.getHandler());
  channel.getHandler().channelHandleArray(channel, data);
}
testSuite({
  shouldRunTests() {
    return ChannelRequest.supportsXhrStreaming();
  },

  setUp() {},

  tearDown() {
    goog.dispose(webChannel);
    stubs.reset();
  },

  testUnsupportedTransports() {
    stubChannelRequest();

    const err = assertThrows(() => {
      const webChannelTransport = new WebChannelBaseTransport();
    });
    assertContains('error', err.message);
  },

  testOpenWithUrl() {
    const webChannelTransport = new WebChannelBaseTransport();
    webChannel = webChannelTransport.createWebChannel(channelUrl);

    let eventFired = false;
    events.listen(webChannel, WebChannel.EventType.OPEN, (e) => {
      eventFired = true;
    });

    webChannel.open();
    assertFalse(eventFired);

    const channel = webChannel.channel_;
    assertNotNull(channel);

    simulateOpenEvent(channel);
    assertTrue(eventFired);
  },

  testOpenWithTestUrl() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'testUrl': `${channelUrl}/footest`};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const testPath = webChannel.channel_.connectionTest_.path_;
    assertNotNullNorUndefined(testPath);
  },

  testOpenWithCustomHeaders() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'messageHeaders': {'foo-key': 'foo-value'}};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const extraHeaders_ = webChannel.channel_.extraHeaders_;
    assertNotNullNorUndefined(extraHeaders_);
    assertEquals('foo-value', extraHeaders_['foo-key']);
    assertEquals(undefined, extraHeaders_['X-Client-Protocol']);
  },

  testOpenWithInitHeaders() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'initMessageHeaders': {'foo-key': 'foo-value'}};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const initHeaders_ = webChannel.channel_.initHeaders_;
    assertNotNullNorUndefined(initHeaders_);
    assertEquals('foo-value', initHeaders_['foo-key']);
  },

  testOpenWithMessageContentType() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'messageContentType': 'application/protobuf+json'};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const initHeaders_ = webChannel.channel_.initHeaders_;
    assertNotNullNorUndefined(initHeaders_);
    assertEquals(
        'application/protobuf+json', initHeaders_['X-WebChannel-Content-Type']);
  },

  testOpenWithMessageContentTypeAndInitHeaders() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {
      'messageContentType': 'application/protobuf+json',
      'initMessageHeaders': {'foo-key': 'foo-value'},
    };
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const initHeaders_ = webChannel.channel_.initHeaders_;
    assertNotNullNorUndefined(initHeaders_);
    assertEquals(
        'application/protobuf+json', initHeaders_['X-WebChannel-Content-Type']);
    assertEquals('foo-value', initHeaders_['foo-key']);
  },

  testClientProtocolHeaderRequired() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'clientProtocolHeaderRequired': true};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const extraHeaders_ = webChannel.channel_.extraHeaders_;
    assertNotNullNorUndefined(extraHeaders_);
    assertEquals('webchannel', extraHeaders_['X-Client-Protocol']);
  },

  testClientProtocolHeaderNotRequiredByDefault() {
    const webChannelTransport = new WebChannelBaseTransport();
    webChannel = webChannelTransport.createWebChannel(channelUrl);
    webChannel.open();

    const extraHeaders_ = webChannel.channel_.extraHeaders_;
    assertNull(extraHeaders_);
  },

  testClientProtocolHeaderRequiredWithCustomHeader() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {
      'clientProtocolHeaderRequired': true,
      'messageHeaders': {'foo-key': 'foo-value'},
    };
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const extraHeaders_ = webChannel.channel_.extraHeaders_;
    assertNotNullNorUndefined(extraHeaders_);
    assertEquals('foo-value', extraHeaders_['foo-key']);
    assertEquals('webchannel', extraHeaders_['X-Client-Protocol']);
  },

  testOpenWithCustomParams() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'messageUrlParams': {'foo-key': 'foo-value'}};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const extraParams = webChannel.channel_.extraParams_;
    assertNotNullNorUndefined(extraParams);
  },

  testOpenWithHttpSessionIdParam() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'httpSessionIdParam': 'xsessionid'};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const httpSessionIdParam = webChannel.channel_.getHttpSessionIdParam();
    assertEquals('xsessionid', httpSessionIdParam);
  },

  testOpenWithDuplicatedHttpSessionIdParam() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {
      'messageUrlParams': {'xsessionid': 'abcd1234'},
      'httpSessionIdParam': 'xsessionid',
    };
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    const httpSessionIdParam = webChannel.channel_.getHttpSessionIdParam();
    assertEquals('xsessionid', httpSessionIdParam);

    const extraParams = webChannel.channel_.extraParams_;
    assertUndefined(extraParams['xsessionid']);
  },

  testOpenWithCorsEnabled() {
    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'supportsCrossDomainXhr': true};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    assertTrue(webChannel.channel_.supportsCrossDomainXhrs_);
  },

  testSendRawJsonDefaultValue() {
    let channelMsg;
    stubs.set(WebChannelBase.prototype, 'sendMap', (message) => {
      channelMsg = message;
    });

    const webChannelTransport = new WebChannelBaseTransport();
    webChannel = webChannelTransport.createWebChannel(channelUrl);
    webChannel.open();

    webChannel.send({foo: 'bar'});
    assertEquals('bar', channelMsg.foo);
  },

  testSendRawJsonUndefinedValue() {
    let channelMsg;
    stubs.set(WebChannelBase.prototype, 'sendMap', (message) => {
      channelMsg = message;
    });

    const webChannelTransport = new WebChannelBaseTransport();
    const options = {};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    webChannel.send({foo: 'bar'});
    assertEquals('bar', channelMsg.foo);
  },

  testSendRawJsonExplicitTrueValue() {
    let channelMsg;
    stubs.set(WebChannelBase.prototype, 'sendMap', (message) => {
      channelMsg = message;
    });
    stubs.set(WebChannelBase.prototype, 'getServerVersion', () => 12);

    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'sendRawJson': true};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    webChannel.send({foo: 'bar'});

    const receivedMsg = googJson.parse(channelMsg[Wire.RAW_DATA_KEY]);
    assertEquals('bar', receivedMsg.foo);
  },

  testSendRawJsonExplicitFalseValue() {
    let channelMsg;
    stubs.set(WebChannelBase.prototype, 'sendMap', (message) => {
      channelMsg = message;
    });
    stubs.set(WebChannelBase.prototype, 'getServerVersion', () => 12);

    const webChannelTransport = new WebChannelBaseTransport();
    const options = {'sendRawJson': false};
    webChannel = webChannelTransport.createWebChannel(channelUrl, options);
    webChannel.open();

    webChannel.send({foo: 'bar'});
    assertEquals('bar', channelMsg.foo);
  },

  testOpenThenCloseChannel() {
    const webChannelTransport = new WebChannelBaseTransport();
    webChannel = webChannelTransport.createWebChannel(channelUrl);

    let eventFired = false;
    events.listen(webChannel, WebChannel.EventType.CLOSE, (e) => {
      eventFired = true;
    });

    webChannel.open();
    assertFalse(eventFired);

    const channel = webChannel.channel_;
    assertNotNull(channel);

    simulateCloseEvent(channel);
    assertTrue(eventFired);
  },

  testChannelError() {
    const webChannelTransport = new WebChannelBaseTransport();
    webChannel = webChannelTransport.createWebChannel(channelUrl);

    let eventFired = false;
    events.listen(webChannel, WebChannel.EventType.ERROR, (e) => {
      eventFired = true;
      assertEquals(WebChannel.ErrorStatus.NETWORK_ERROR, e.status);
    });

    webChannel.open();
    assertFalse(eventFired);

    const channel = webChannel.channel_;
    assertNotNull(channel);

    simulateErrorEvent(channel);
    assertTrue(eventFired);
  },

  testChannelMessage() {
    const webChannelTransport = new WebChannelBaseTransport();
    webChannel = webChannelTransport.createWebChannel(channelUrl);

    let eventFired = false;
    const data = 'foo';
    events.listen(webChannel, WebChannel.EventType.MESSAGE, (e) => {
      eventFired = true;
      assertEquals(e.data, data);
    });

    webChannel.open();
    assertFalse(eventFired);

    const channel = webChannel.channel_;
    assertNotNull(channel);

    simulateMessageEvent(channel, data);
    assertTrue(eventFired);
  },
});
