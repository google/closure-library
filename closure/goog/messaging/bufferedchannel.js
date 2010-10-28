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

/**
 * @fileoverview A wrapper for asynchronous message-passing channels that buffer
 * their output until both ends of the channel are connected.
 *
 */

goog.provide('goog.messaging.BufferedChannel');
goog.provide('goog.messaging.BufferedChannel.ReservedServiceNameError');

goog.require('goog.Timer');
goog.require('goog.Uri');
goog.require('goog.debug.Error');
goog.require('goog.debug.Logger');
goog.require('goog.events');
goog.require('goog.messaging.MessageChannel');



/**
 * Creates a new BufferedChannel, which operates like its underlying channel
 * except that it buffers calls to send until it receives a message from its
 * peer claiming that the peer is ready to receive.  The peer is also expected
 * to be a BufferedChannel, though this is not enforced.
 *
 * @param {!goog.messaging.MessageChannel} messageChannel The MessageChannel
 *     we're wrapping.
 * @param {number=} opt_interval Polling interval for sending ready
 *     notifications to peer, in ms.  Default is 50.
 * @constructor
 * @extends {goog.Disposable}
 * @implements {goog.messaging.MessageChannel};
 */
goog.messaging.BufferedChannel = function(messageChannel, opt_interval) {
  goog.Disposable.call(this);

  /**
   * Buffer of messages to be sent when the channel's peer is ready.
   *
   * @type {Array.<Object>}
   * @private
   */
  this.buffer_ = [];

  /**
   * Delegate that we're wrapping.
   *
   * @type {goog.messaging.MessageChannel}
   * @private
   */
  this.messageChannel_ = messageChannel;

  /**
   * Timer for the peer ready ping loop.
   *
   * @type {goog.Timer}
   * @private
   */
  this.timer_ = new goog.Timer(
      opt_interval || goog.messaging.BufferedChannel.DEFAULT_INTERVAL_MILLIS_);

  this.messageChannel_.registerService(
      goog.messaging.BufferedChannel.PEER_READY_SERVICE_NAME_,
      goog.bind(this.setPeerReady_, this));
};
goog.inherits(goog.messaging.BufferedChannel, goog.Disposable);


/**
 * Default polling interval (in ms) for setPeerReady_ notifications.
 *
 * @type {number}
 * @const
 * @private
 */
goog.messaging.BufferedChannel.DEFAULT_INTERVAL_MILLIS_ = 50;


/**
 * Reserved name of the service which handles peer ready pings.
 *
 * @type {string}
 * @const
 * @private
 */
goog.messaging.BufferedChannel.PEER_READY_SERVICE_NAME_ = 'setPeerReady_';


/**
 * Begins the peer ready notification loop.
 *
 * @private
 */
goog.messaging.BufferedChannel.prototype.beginPolling_ = function() {
  this.timer_.start();
  goog.events.listen(
      this.timer_, goog.Timer.TICK, goog.bind(this.poll_, this));
};


/**
 * Connects the channel, runs the (optional) passed callback, and starts the
 * peer ready notification loop.  When this method is called, all the
 * information needed to connect the channel must be available.
 *
 * @see goog.messaging.MessageChannel.connect
 */
goog.messaging.BufferedChannel.prototype.connect = function(opt_connectCb) {
  if (opt_connectCb) opt_connectCb();
  this.messageChannel_.connect(goog.bind(this.beginPolling_, this));
};


/**
 * @return {boolean} Whether or not the channel is connected.  Note that this
 *     conveys no information about the status of the channel's peer.
 *
 * @see goog.messaging.MessageChannel.isConnected
 */
goog.messaging.BufferedChannel.prototype.isConnected = function() {
  return this.messageChannel_.isConnected();
};


/**
 * @return {boolean} Whether the channel's peer is ready.
 */
goog.messaging.BufferedChannel.prototype.isPeerReady = function() {
  return this.peerReady_;
};


/**
 * Logger.
 *
 * @type {goog.debug.Logger}
 * @const
 * @private
 */
goog.messaging.BufferedChannel.prototype.logger_ = goog.debug.Logger.getLogger(
    'goog.messaging.bufferedchannel');


/**
  * Whether or not the peer channel is ready to receive messages.
  *
  * @type {boolean}
  * @private
  */
goog.messaging.BufferedChannel.prototype.peerReady_ = false;


/**
 * Handles one tick of our peer ready notification loop.  This entails sending
 * a ready ping to the peer and shutting down the loop if we've received a ping
 * ourselves.
 *
 * @private
 */
goog.messaging.BufferedChannel.prototype.poll_ = function() {
  // Must always send before stopping the notification loop.  Otherwise, we will
  // commonly fail to transmit to our peer that we're ready because we received
  // their ready ping between two of ours.
  this.messageChannel_.send('setPeerReady_', null);
  if (this.isPeerReady()) this.timer_.stop();
};


/**
 * Registers a service to be called when a message is received.
 *
 * @param {string} serviceName The name of the service.
 * @param {function((string|Object))} callback The callback to process the
 *     incoming messages. Passed the payload. If opt_jsonEncoded is set, the
 *     payload is decoded and passed as an object.
 * @param {boolean} opt_jsonEncoded If true, incoming messages for this service
 *     are expected to contain a JSON-encoded object and will be deserialized
 *     automatically. It's the responsibility of implementors of this class to
 *     perform the deserialization.
 * @throws {goog.messaging.BufferedChannel.ReservedServiceNameError} if the
 *     passed serviceName is reserved for BufferedChannel's use.
 */
goog.messaging.BufferedChannel.prototype.registerService = function(
    serviceName, callback, opt_jsonEncoded) {
  if (serviceName == goog.messaging.BufferedChannel.PEER_READY_SERVICE_NAME_) {
    throw new goog.messaging.BufferedChannel.ReservedServiceNameError(
        'cannot register service with reserved name ' +
        goog.messaging.BufferedChannel.PEER_READY_SERVICE_NAME_);
  }
  this.messageChannel_.registerService(serviceName, callback, opt_jsonEncoded);
};


/** @inheritDoc */
goog.messaging.BufferedChannel.prototype.registerDefaultService = function(
    callback) {
  this.messageChannel_.registerDefaultService(callback);
};


/**
 * Send a message over the channel.  If the peer is not ready, the message will
 * be buffered and sent once we've received a ready message from our peer.
 *
 * @param {string} serviceName The name of the service this message should be
 *     delivered to.
 * @param {string|Object} payload The value of the message.  If this is an
 *     Object, it is serialized to JSON before sending.  It's the responsibility
 *     of implementors of this class to perform the serialization.
 * @see goog.net.xpc.BufferedChannel.send
 */
goog.messaging.BufferedChannel.prototype.send = function(serviceName, payload) {
  if (this.isPeerReady()) {
    this.messageChannel_.send(serviceName, payload);
  } else {
    goog.messaging.BufferedChannel.prototype.logger_.fine(
        'buffering message ' + serviceName);
    this.buffer_.push({serviceName: serviceName, payload: payload});
  }
};


/**
 * Marks the channel's peer as ready, then sends buffered messages and nulls the
 * buffer.  Subsequent calls to setPeerReady_ have no effect.
 *
 * @private
 */
goog.messaging.BufferedChannel.prototype.setPeerReady_ = function() {
  if (this.peerReady_) return;
  this.peerReady_ = true;
  for (var i = 0; i < this.buffer_.length; i++) {
    var message = this.buffer_[i];
    goog.messaging.BufferedChannel.prototype.logger_.fine(
        'sending buffered message ' + message.serviceName);
    this.messageChannel_.send(message.serviceName, message.payload);
  }
  this.buffer_ = null;
};


/** @inheritDoc */
goog.messaging.BufferedChannel.prototype.disposeInternal = function() {
  goog.dispose(this.messageChannel_);
  goog.dispose(this.timer_);
  goog.base(this, 'disposeInternal');
};



/**
 * Creates the custom error thrown when clients attempt to register a service
 * with the name reserved for the peer ready notification handler.
 *
 * @param {*=} opt_msg The message associated with this error.
 * @constructor
 * @extends {goog.debug.Error}
 */
goog.messaging.BufferedChannel.ReservedServiceNameError = function(opt_msg) {
  goog.debug.Error.call(this, opt_msg);
};
goog.inherits(
    goog.messaging.BufferedChannel.ReservedServiceNameError, goog.debug.Error);


/** @inheritDoc */
goog.messaging.BufferedChannel.ReservedServiceNameError.prototype.name =
    'ReservedServiceNameError';
