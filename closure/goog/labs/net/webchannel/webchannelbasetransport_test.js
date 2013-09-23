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
goog.require('goog.labs.net.webChannel.WebChannelBaseTransport');
goog.require('goog.net.WebChannel');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.labs.net.webChannel.webChannelBaseTransportTest');


var webChannel;
var channelUrl = 'http://127.0.0.1:8080/channel';

var propertyReplacer = new goog.testing.PropertyReplacer();


function setUp() {
  propertyReplacer.set(
      /** @suppress {missingRequire} */ goog.labs.net.webChannel,
      'WebChannelBase',
      MockWebChannelBase);
}

function tearDown() {
  propertyReplacer.reset();
  goog.dispose(webChannel);
}

function testOpenWithUrl() {
  var webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);

  var eventFired = false;
  goog.events.listen(webChannel, goog.net.WebChannel.EventType.OPEN,
      function(e) {
        eventFired = true;
      });

  webChannel.open();
  assertFalse(eventFired);

  var channel = webChannel.channel_;
  assertNotNull(channel);

  simulateOpenEvent(channel);
  assertTrue(eventFired);
}

function testOpenWithTestUrl() {
  var webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  var options = {'testUrl': channelUrl + '/footest'};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);

  var testPath = webChannel.testPath_;
  assertNotNull(testPath);
}

function testOpenWithCustomHeaders() {
  var webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  var options = {'messageHeaders': {'foo-key': 'foo-value'}};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  var extraHeaders_ = webChannel.extraHeaders_;
  assertNotNull(extraHeaders_);
}

function testOpenWithCustomParams() {
  var webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  var options = {'messageUrlParams': {'foo-key': 'foo-value'}};
  webChannel = webChannelTransport.createWebChannel(channelUrl, options);
  webChannel.open();

  var extraParams = webChannel.extraUrlParams_;
  assertNotNull(extraParams);
}

function testOpenThenCloseChannel() {
  var webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);

  var eventFired = false;
  goog.events.listen(webChannel, goog.net.WebChannel.EventType.CLOSE,
      function(e) {
        eventFired = true;
      });

  webChannel.open();
  assertFalse(eventFired);

  var channel = webChannel.channel_;
  assertNotNull(channel);

  simulateCloseEvent(channel);
  assertTrue(eventFired);
}


function testChannelError() {
  var webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);

  var eventFired = false;
  goog.events.listen(webChannel, goog.net.WebChannel.EventType.ERROR,
      function(e) {
        eventFired = true;
        assertEquals(goog.net.WebChannel.ErrorStatus.NETWORK_ERROR, e.status);
      });

  webChannel.open();
  assertFalse(eventFired);

  var channel = webChannel.channel_;
  assertNotNull(channel);

  simulateErrorEvent(channel);
  assertTrue(eventFired);
}


function testChannelMessage() {
  var webChannelTransport =
      new goog.labs.net.webChannel.WebChannelBaseTransport();
  webChannel = webChannelTransport.createWebChannel(channelUrl);

  var eventFired = false;
  var data = 'foo';
  goog.events.listen(webChannel, goog.net.WebChannel.EventType.MESSAGE,
      function(e) {
        eventFired = true;
        assertEquals(e.data, data);
      });

  webChannel.open();
  assertFalse(eventFired);

  var channel = webChannel.channel_;
  assertNotNull(channel);

  simulateMessageEvent(channel, data);
  assertTrue(eventFired);
}


/**
 * Simulates the WebChannelBase firing the open event for the given channel.
 * @param {!MockWebChannelBase} bc The mock WebChannelBase.
 */
function simulateOpenEvent(bc) {
  assertNotNull(bc.getHandler());
  bc.getHandler().channelOpened();
}


/**
 * Simulates the WebChannelBase firing the close event for the given channel.
 * @param {!MockWebChannelBase} bc The mock WebChannelBase.
 */
function simulateCloseEvent(bc) {
  assertNotNull(bc.getHandler());
  bc.getHandler().channelClosed();
}


/**
 * Simulates the WebChannelBase firing the error event for the given channel.
 * @param {!MockWebChannelBase} bc The mock WebChannelBase.
 */
function simulateErrorEvent(bc) {
  assertNotNull(bc.getHandler());
  bc.getHandler().channelError();
}


/**
 * Simulates the WebChannelBase firing the message event for the given channel.
 * @param {!MockWebChannelBase} bc The mock WebChannelBase.
 * @param {String} data The message data.
 */
function simulateMessageEvent(bc, data) {
  assertNotNull(bc.getHandler());
  bc.getHandler().channelHandleArray(bc, data);
}



/**
 * Mock WebChannelBase constructor. Fields are cached values for validation.
 * @constructor
 * @struct
 */
MockWebChannelBase = function() {
  /** @private {?goog.labs.net.webChannel.WebChannelBase.Handler} */
  this.handler_ = null;

  /** @private {?string} */
  this.testPath_ = null;

  /** @private {Object} */
  this.extraHeaders_ = null;

  /** @private {Object} */
  this.extraUrlParams_ = null;
};


/**
 * Mocks out the setHandler method of the WebChannelBase.
 */
MockWebChannelBase.prototype.setHandler = function(handler) {
  this.handler_ = handler;
};


/**
 * Mocks out the getHandler method of the WebChannelBase.
 *
 * @return {?goog.labs.net.webChannel.WebChannelBase.Handler} The handler.
 */
MockWebChannelBase.prototype.getHandler = function(handler) {
  return this.handler_;
};


/**
 * Mocks out the connect method of the WebChannelBase.
 */
MockWebChannelBase.prototype.connect = function(testPath, channelPath,
    opt_extraUrlParams) {
  this.testPath_ = testPath;
  this.extraUrlParams_ = opt_extraUrlParams || null;
};


/**
 * Mocks out the disconnect method of the WebChannelBase.
 */
MockWebChannelBase.prototype.disconnect = function() {
  // Nothing to do here.
};


/**
 * Mocks out the sendMap method of the WebChannelBase.
 */
MockWebChannelBase.prototype.sendMap = function(message) {
  // Nothing to do here.
};


/**
 * Mocks out the setExtraHeaders method of the WebChannelBase.
 * @param {Object} extraHeaders The HTTP headers.
 */
MockWebChannelBase.prototype.setExtraHeaders = function(extraHeaders) {
  this.extraHeaders_ = extraHeaders;
};
