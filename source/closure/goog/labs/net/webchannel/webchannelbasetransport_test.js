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
 * @fileoverview Unit tests for goog.labs.net.webChannel.WebChannelBase.
 * @suppress {accessControls} Private methods are accessed for test purposes.
 *
 */


goog.provide('goog.labs.net.webChannel.webChannelBaseTransportTest');

goog.require('goog.events');
goog.require('goog.functions');
goog.require('goog.json');
goog.require('goog.labs.net.webChannel.ChannelRequest');
goog.require('goog.labs.net.webChannel.WebChannelBase');
goog.require('goog.labs.net.webChannel.WebChannelBaseTransport');
goog.require('goog.labs.net.webChannel.Wire');
goog.require('goog.net.WebChannel');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');


goog.setTestOnly('goog.labs.net.webChannel.webChannelBaseTransportTest');


let webChannel;
const channelUrl = 'http://127.0.0.1:8080/channel';

const stubs = new goog.testing.PropertyReplacer();


function shouldRunTests() {
  return goog.labs.net.webChannel.ChannelRequest.supportsXhrStreaming();
}


function setUp() {}


function tearDown() {
  goog.dispose(webChannel);
  stubs.reset();
}


/**
 * Stubs goog.labs.net.webChannel.ChannelRequest.
 */
function stubChannelRequest() {
  stubs.set(
      goog.labs.net.webChannel.ChannelRequest, 'supportsXhrStreaming',
      goog.functions.FALSE);
}


function testUnsupportedTransports() {
  stubChannelRequest();

  const err = assertThrows(function() {
    const webChannelTransport =
        new goog.labs.net.webChannel.WebChannelBaseTransport();
  });
  assertContains('error', err.message);
}

function testOpenWithUrl() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);

  let eventFired = false;
  goog.events.listen(
      webChannel, goog.net.WebChannel.EventType.OPEN,
      function(e) { eventFired = true; });

  webChannel.open();
  assertFalse(eventFired);

  const channel = webChannel.channel_;
  assertNotNull(channel);

  simulateOpenEvent(channel);
  assertTrue(eventFired);
}

function testOpenWithTestUrl() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'testUrl': channelUrl + '/footest'};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const testPath = webChannel.channel_.connectionTest_.path_;
  assertNotNullNorUndefined(testPath);
}

function testOpenWithCustomHeaders() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'messageHeaders': {'foo-key': 'foo-value'}};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const extraHeaders_ = webChannel.channel_.extraHeaders_;
  assertNotNullNorUndefined(extraHeaders_);
  assertEquals('foo-value', extraHeaders_['foo-key']);
  assertEquals(undefined, extraHeaders_['X-Client-Protocol']);
}

function testOpenWithInitHeaders() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'initMessageHeaders': {'foo-key': 'foo-value'}};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const initHeaders_ = webChannel.channel_.initHeaders_;
  assertNotNullNorUndefined(initHeaders_);
  assertEquals('foo-value', initHeaders_['foo-key']);
}

function testOpenWithMessageContentType() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'messageContentType': 'application/protobuf+json'};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const initHeaders_ = webChannel.channel_.initHeaders_;
  assertNotNullNorUndefined(initHeaders_);
  assertEquals(
      'application/protobuf+json', initHeaders_['X-WebChannel-Content-Type']);
}

function testOpenWithMessageContentTypeAndInitHeaders() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {
    'messageContentType': 'application/protobuf+json',
    'initMessageHeaders': {'foo-key': 'foo-value'}
  };
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const initHeaders_ = webChannel.channel_.initHeaders_;
  assertNotNullNorUndefined(initHeaders_);
  assertEquals(
      'application/protobuf+json', initHeaders_['X-WebChannel-Content-Type']);
  assertEquals('foo-value', initHeaders_['foo-key']);
}

function testClientProtocolHeaderRequired() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'clientProtocolHeaderRequired': true};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const extraHeaders_ = webChannel.channel_.extraHeaders_;
  assertNotNullNorUndefined(extraHeaders_);
  assertEquals('webchannel', extraHeaders_['X-Client-Protocol']);
}

function testClientProtocolHeaderNotRequiredByDefault() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);
  webChannel.open();

  const extraHeaders_ = webChannel.channel_.extraHeaders_;
  assertNull(extraHeaders_);
}

function testClientProtocolHeaderRequiredWithCustomHeader() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {
    'clientProtocolHeaderRequired': true,
    'messageHeaders': {'foo-key': 'foo-value'}
  };
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const extraHeaders_ = webChannel.channel_.extraHeaders_;
  assertNotNullNorUndefined(extraHeaders_);
  assertEquals('foo-value', extraHeaders_['foo-key']);
  assertEquals('webchannel', extraHeaders_['X-Client-Protocol']);
}

function testOpenWithCustomParams() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'messageUrlParams': {'foo-key': 'foo-value'}};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const extraParams = webChannel.channel_.extraParams_;
  assertNotNullNorUndefined(extraParams);
}

function testOpenWithHttpSessionIdParam() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'httpSessionIdParam': 'xsessionid'};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const httpSessionIdParam = webChannel.channel_.getHttpSessionIdParam();
  assertEquals('xsessionid', httpSessionIdParam);
}

function testOpenWithDuplicatedHttpSessionIdParam() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {
    'messageUrlParams': {'xsessionid': 'abcd1234'},
    'httpSessionIdParam': 'xsessionid'
  };
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  const httpSessionIdParam = webChannel.channel_.getHttpSessionIdParam();
  assertEquals('xsessionid', httpSessionIdParam);

  const extraParams = webChannel.channel_.extraParams_;
  assertUndefined(extraParams['xsessionid']);
}

function testOpenWithCorsEnabled() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'supportsCrossDomainXhr': true};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  assertTrue(webChannel.channel_.supportsCrossDomainXhrs_);
}

function testSendRawJsonDefaultValue() {
  let channelMsg;
  stubs.set(
      goog.labs.net.webChannel.WebChannelBase.prototype, 'sendMap',
      function(message) {
        channelMsg = message;
      });

  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);
  webChannel.open();

  webChannel.send({foo: 'bar'});
  assertEquals('bar', channelMsg.foo);
}

function testSendRawJsonUndefinedValue() {
  let channelMsg;
  stubs.set(
      goog.labs.net.webChannel.WebChannelBase.prototype, 'sendMap',
      function(message) {
        channelMsg = message;
      });

  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  webChannel.send({foo: 'bar'});
  assertEquals('bar', channelMsg.foo);
}

function testSendRawJsonExplicitTrueValue() {
  let channelMsg;
  stubs.set(
      goog.labs.net.webChannel.WebChannelBase.prototype, 'sendMap',
      function(message) {
        channelMsg = message;
      });
  stubs.set(
      goog.labs.net.webChannel.WebChannelBase.prototype, 'getServerVersion',
      function() {
        return 12;
      });

  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'sendRawJson': true};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  webChannel.send({foo: 'bar'});

  const receivedMsg =
      goog.json.parse(channelMsg[goog.labs.net.webChannel.Wire.RAW_DATA_KEY]);
  assertEquals('bar', receivedMsg.foo);
}

function testSendRawJsonExplicitFalseValue() {
  let channelMsg;
  stubs.set(
      goog.labs.net.webChannel.WebChannelBase.prototype, 'sendMap',
      function(message) {
        channelMsg = message;
      });
  stubs.set(
      goog.labs.net.webChannel.WebChannelBase.prototype, 'getServerVersion',
      function() {
        return 12;
      });

  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  const options = {'sendRawJson': false};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  webChannel.send({foo: 'bar'});
  assertEquals('bar', channelMsg.foo);
}

function testOpenThenCloseChannel() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);

  let eventFired = false;
  goog.events.listen(
      webChannel, goog.net.WebChannel.EventType.CLOSE,
      function(e) { eventFired = true; });

  webChannel.open();
  assertFalse(eventFired);

  const channel = webChannel.channel_;
  assertNotNull(channel);

  simulateCloseEvent(channel);
  assertTrue(eventFired);
}


function testChannelError() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);

  let eventFired = false;
  goog.events.listen(
      webChannel, goog.net.WebChannel.EventType.ERROR, function(e) {
        eventFired = true;
        assertEquals(goog.net.WebChannel.ErrorStatus.NETWORK_ERROR, e.status);
      });

  webChannel.open();
  assertFalse(eventFired);

  const channel = webChannel.channel_;
  assertNotNull(channel);

  simulateErrorEvent(channel);
  assertTrue(eventFired);
}


function testChannelMessage() {
  const webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);

  let eventFired = false;
  const data = 'foo';
  goog.events.listen(
      webChannel, goog.net.WebChannel.EventType.MESSAGE, function(e) {
        eventFired = true;
        assertEquals(e.data, data);
      });

  webChannel.open();
  assertFalse(eventFired);

  const channel = webChannel.channel_;
  assertNotNull(channel);

  simulateMessageEvent(channel, data);
  assertTrue(eventFired);
}


/**
 * Simulates the WebChannelBase firing the open event for the given channel.
 * @param {!goog.labs.net.webChannel.WebChannelBase} channel The WebChannelBase.
 */
function simulateOpenEvent(channel) {
  assertNotNull(channel.getHandler());
  channel.getHandler().channelOpened();
}


/**
 * Simulates the WebChannelBase firing the close event for the given channel.
 * @param {!goog.labs.net.webChannel.WebChannelBase} channel The WebChannelBase.
 */
function simulateCloseEvent(channel) {
  assertNotNull(channel.getHandler());
  channel.getHandler().channelClosed();
}


/**
 * Simulates the WebChannelBase firing the error event for the given channel.
 * @param {!goog.labs.net.webChannel.WebChannelBase} channel The WebChannelBase.
 */
function simulateErrorEvent(channel) {
  assertNotNull(channel.getHandler());
  channel.getHandler().channelError();
}


/**
 * Simulates the WebChannelBase firing the message event for the given channel.
 * @param {!goog.labs.net.webChannel.WebChannelBase} channel The WebChannelBase.
 * @param {String} data The message data.
 */
function simulateMessageEvent(channel, data) {
  assertNotNull(channel.getHandler());
  channel.getHandler().channelHandleArray(channel, data);
}
