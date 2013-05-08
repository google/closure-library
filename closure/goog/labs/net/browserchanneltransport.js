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
 * @fileoverview Implementation of a WebChannel transport using BrowserChannel.
 *
 * When BrowserChannel is used as the underlying transport, the capabilities
 * of the WebChannel are limited to what's supported by the BrowserChannel.
 * Particularly, multiplexing is not possible, and only strings are
 * supported as message types.
 *
 * This is a package private implementation of the {@link goog.net.WebChannel}
 * API.
 *
 * @visibility {//visibility:private}
 */

goog.provide('goog.net.BrowserChannelTransport');

goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.net.BrowserChannel');
goog.require('goog.net.WebChannel');
goog.require('goog.net.WebChannelTransport');
goog.require('goog.string');
goog.require('goog.string.path');



/**
 * Implementation of {@link goog.net.WebChannelTransport} with
 * {@link goog.net.BrowserChannel} as the underlying transport
 *
 * @constructor
 * @implements {goog.net.WebChannelTransport}
 */
goog.net.BrowserChannelTransport = function() {
};


/**
 * @override
 */
goog.net.BrowserChannelTransport.prototype.createWebChannel = function(
    url, opt_options) {
  return new goog.net.BrowserChannelTransport.Channel(url, opt_options);
};



/**
 * Implementation of the {@link goog.net.WebChannel} interface.
 *
 * @param {string} url The URL path for the new WebChannel instance.
 * @param {!goog.net.WebChannel.Options=} opt_options Configuration for the
 *     new WebChannel instance.
 *
 * @constructor
 * @implements {goog.net.WebChannel}
 * @extends {goog.events.EventTarget}
 */
goog.net.BrowserChannelTransport.Channel = function(url, opt_options) {
  goog.base(this);

  /**
   * The underlying browserchannel object.
   *
   * @type {!goog.net.BrowserChannel}
   * @private
   */
  this.browserChannel_ = new goog.net.BrowserChannel();

  /**
   * The URL of the target server end-point.
   *
   * @type {string}
   * @private
   */
  this.url_ = url;

  /**
   * The channel options.
   *
   * @type {?goog.net.WebChannel.Options}
   * @private
   */
  this.options_ = opt_options || null;

  /**
   * The logger for this class.
   * @type {!goog.debug.Logger}
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger(
      'goog.net.BrowserChannelTransport');

};
goog.inherits(goog.net.BrowserChannelTransport.Channel,
    goog.events.EventTarget);


goog.scope(function() {
var Channel = goog.net.BrowserChannelTransport.Channel;


/**
 * The browserchannel handler.
 *
 * @type {!goog.net.BrowserChannel.Handler}
 * @private
 */
Channel.prototype.browserChannelHandler_;


/**
 * Test path for the browserchannel is always set to "/url/test".
 *
 * TODO(user): The test path may be made configurable via the options.
 *
 * @override
 */
Channel.prototype.open = function() {
  var testUrl = goog.string.path.join(this.url_, 'test');
  this.browserChannel_.connect(testUrl, this.url_);

  this.browserChannelHandler_ = new Channel.Handler_(this);
  this.browserChannel_.setHandler(this.browserChannelHandler_);
};


/**
 * @override
 */
Channel.prototype.close = function() {
  this.browserChannel_.disconnect();
};


/**
 * The BrowserChannel only supports object types.
 *
 * @param {!goog.net.WebChannel.MessageData} message The message to send.
 * @override
 */
Channel.prototype.send = function(message) {
  goog.asserts.assert(goog.isObject(message), 'only object type expected');
  this.browserChannel_.sendMap(message);
};


/**
 * @override
 */
Channel.prototype.disposeInternal = function() {
  this.browserChannel_.setHandler(null);
  delete this.browserChannelHandler_;
  this.browserChannel_.disconnect();
  delete this.browserChannel_;

  goog.base(this, 'disposeInternal');
};



/**
 * The message event.
 *
 * @param {!Array} array The data array from browserchannel.
 * @constructor
 * @extends {goog.net.WebChannel.MessageEvent}
 */
Channel.MessageEvent = function(array) {
  goog.base(this);

  this.data = array;
};
goog.inherits(Channel.MessageEvent, goog.net.WebChannel.MessageEvent);



/**
 * The error event.
 *
 * @param {goog.net.BrowserChannel.Error} error The browserchannel error code.
 * @constructor
 * @extends {goog.net.WebChannel.ErrorEvent}
 */
Channel.ErrorEvent = function(error) {
  goog.base(this);

  /**
   * Transport specific error code is not to be propagated with the event.
   */
  this.status = goog.net.WebChannel.ErrorStatus.NETWORK_ERROR;
};
goog.inherits(Channel.ErrorEvent, goog.net.WebChannel.ErrorEvent);



/**
 * Implementation of the {@link goog.net.BrowserChannel.Handler} interface.
 *
 * @param {!goog.net.BrowserChannelTransport.Channel} channel The enclosing
 * WebChannel object.
 *
 * @constructor
 * @extends {goog.net.BrowserChannel.Handler}
 * @private
 */
Channel.Handler_ = function(channel) {
  goog.base(this);

  /**
   * @type {!goog.net.BrowserChannelTransport.Channel}
   * @private
   */
  this.channel_ = channel;
};
goog.inherits(Channel.Handler_, goog.net.BrowserChannel.Handler);


/**
 * @override
 */
Channel.Handler_.prototype.channelOpened = function(
    browserChannel) {
  this.channel_.logger_.info('WebChannel opened on ' + this.channel_.url_);
  this.channel_.dispatchEvent(goog.net.WebChannel.EventType.OPEN);
};


/**
 * @override
 */
Channel.Handler_.prototype.channelHandleArray = function(
    browserChannel, array) {
  goog.asserts.assert(array, 'array expected to be defined');

  this.channel_.dispatchEvent(new Channel.MessageEvent(array));
};


/**
 * @override
 */
Channel.Handler_.prototype.channelError = function(
    browserChannel, error) {
  this.channel_.logger_.info('WebChannel aborted on ' + this.channel_.url_ +
      ' due to BrowserChannel error: ' + error);
  this.channel_.dispatchEvent(new Channel.ErrorEvent(error));
};


/**
 * @override
 */
Channel.Handler_.prototype.channelClosed = function(
    browserChannel, opt_pendingMaps, opt_undeliveredMaps) {
  this.channel_.logger_.info('WebChannel closed on ' + this.channel_.url_);
  this.channel_.dispatchEvent(goog.net.WebChannel.EventType.CLOSE);
};
});  // goog.scope
