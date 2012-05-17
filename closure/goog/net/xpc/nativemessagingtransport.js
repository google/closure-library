// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Contains the class which uses native messaging
 * facilities for cross domain communication.
 *
 */


goog.provide('goog.net.xpc.NativeMessagingTransport');

goog.require('goog.Timer');
goog.require('goog.async.Deferred');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.net.xpc');
goog.require('goog.net.xpc.CrossPageChannelRole');
goog.require('goog.net.xpc.Transport');



/**
 * The native messaging transport
 *
 * Uses document.postMessage() to send messages to other documents.
 * Receiving is done by listening on 'message'-events on the document.
 *
 * @param {goog.net.xpc.CrossPageChannel} channel The channel this
 *     transport belongs to.
 * @param {string} peerHostname The hostname (protocol, domain, and port) of the
 *     peer.
 * @param {goog.dom.DomHelper=} opt_domHelper The dom helper to use for
 *     finding the correct window/document.
 * @param {boolean=} opt_oneSidedHandshake If this is true, only the outer
 *     transport sends a SETUP message and expects a SETUP_ACK.  The inner
 *     transport goes connected when it receives the SETUP.
 * @constructor
 * @extends {goog.net.xpc.Transport}
 */
goog.net.xpc.NativeMessagingTransport = function(channel, peerHostname,
    opt_domHelper, opt_oneSidedHandshake) {
  goog.base(this, opt_domHelper);

  /**
   * The channel this transport belongs to.
   * @type {goog.net.xpc.CrossPageChannel}
   * @private
   */
  this.channel_ = channel;

  /**
   * The hostname of the peer. This parameterizes all calls to postMessage, and
   * should contain the precise protocol, domain, and port of the peer window.
   * @type {string}
   * @private
   */
  this.peerHostname_ = peerHostname || '*';

  /**
   * The event handler.
   * @type {!goog.events.EventHandler}
   * @private
   */
  this.eventHandler_ = new goog.events.EventHandler(this);

  /**
   * Timer for connection reattempts.
   * @type {!goog.Timer}
   * @private
   */
  this.maybeAttemptToConnectTimer_ = new goog.Timer(100, this.getWindow());

  /**
   * Whether one-sided handshakes are enabled.
   * @type {boolean}
   * @private
   */
  this.oneSidedHandshake_ = !!opt_oneSidedHandshake;

  /**
   * Fires once we've received our SETUP_ACK message.
   * @type {!goog.async.Deferred}
   * @private
   */
  this.setupAckReceived_ = new goog.async.Deferred();

  /**
   * Fires once we've sent our SETUP_ACK message.
   * @type {!goog.async.Deferred}
   * @private
   */
  this.setupAckSent_ = new goog.async.Deferred();

  /**
   * Fires once we're marked connected.
   * @type {!goog.async.Deferred}
   * @private
   */
  this.connected_ = new goog.async.Deferred();

  // We don't want to mark ourselves connected until we have sent whatever
  // message will cause our counterpart in the other frame to also declare
  // itself connected, if there is such a message.  Otherwise we risk a user
  // message being sent in advance of that message, and it being discarded.
  if (this.oneSidedHandshake_) {
    if (this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.INNER) {
      // One sided handshake, inner frame:
      // SETUP_ACK must be received.
      this.connected_.awaitDeferred(this.setupAckReceived_);
    } else {
      // One sided handshake, outer frame:
      // SETUP_ACK must be sent.
      this.connected_.awaitDeferred(this.setupAckSent_);
    }
  } else {
    // Two sided handshake:
    // SETUP_ACK has to have been received, and sent.
    this.connected_.awaitDeferred(this.setupAckReceived_);

    // TODO(dbk): Restore this line.  It is necessary to guarantee that the
    // peer frame is in the connected state when it receives its first message,
    // but prevents cases where the peer disappears and reconnects.
    // this.connected_.awaitDeferred(this.setupAckSent_);
  }
  this.connected_.addCallback(this.notifyConnected_, this);
  this.connected_.callback(true);

  this.eventHandler_.
      listen(this.maybeAttemptToConnectTimer_, goog.Timer.TICK,
          this.maybeAttemptToConnect_);
};
goog.inherits(goog.net.xpc.NativeMessagingTransport, goog.net.xpc.Transport);


/**
 * Length of the delay in milliseconds between the channel being connected and
 * the connection callback being called, in cases where coverage of timing flaws
 * is required.
 * @type {number}
 * @private
 */
goog.net.xpc.NativeMessagingTransport.CONNECTION_DELAY_MS_ = 200;


/**
 * Flag indicating if this instance of the transport has been initialized.
 * @type {boolean}
 * @private
 */
goog.net.xpc.NativeMessagingTransport.prototype.initialized_ = false;


/**
 * The transport type.
 * @type {number}
 */
goog.net.xpc.NativeMessagingTransport.prototype.transportType =
    goog.net.xpc.TransportTypes.NATIVE_MESSAGING;


/**
 * Tracks the number of NativeMessagingTransport channels that have been
 * initialized but not disposed yet in a map keyed by the UID of the window
 * object.  This allows for multiple windows to be initiallized and listening
 * for messages.
 * @type {Object.<number>}
 * @private
 */
goog.net.xpc.NativeMessagingTransport.activeCount_ = {};


/**
 * Initializes this transport. Registers a listener for 'message'-events
 * on the document.
 * @param {Window} listenWindow The window to listen to events on.
 * @private
 */
goog.net.xpc.NativeMessagingTransport.initialize_ = function(listenWindow) {
  var uid = goog.getUid(listenWindow);
  var value = goog.net.xpc.NativeMessagingTransport.activeCount_[uid];
  if (!goog.isNumber(value)) {
    value = 0;
  }
  if (value == 0) {
    // Listen for message-events. These are fired on window in FF3 and on
    // document in Opera.
    goog.events.listen(
        listenWindow.postMessage ? listenWindow : listenWindow.document,
        'message',
        goog.net.xpc.NativeMessagingTransport.messageReceived_,
        false,
        goog.net.xpc.NativeMessagingTransport);
  }
  goog.net.xpc.NativeMessagingTransport.activeCount_[uid] = value + 1;
};


/**
 * Processes an incoming message-event.
 * @param {goog.events.BrowserEvent} msgEvt The message event.
 * @return {boolean} True if message was successfully delivered to a channel.
 * @private
 */
goog.net.xpc.NativeMessagingTransport.messageReceived_ = function(msgEvt) {
  var data = msgEvt.getBrowserEvent().data;

  if (!goog.isString(data)) {
    return false;
  }

  var headDelim = data.indexOf('|');
  var serviceDelim = data.indexOf(':');

  // make sure we got something reasonable
  if (headDelim == -1 || serviceDelim == -1) {
    return false;
  }

  var channelName = data.substring(0, headDelim);
  var service = data.substring(headDelim + 1, serviceDelim);
  var payload = data.substring(serviceDelim + 1);

  goog.net.xpc.logger.fine('messageReceived: channel=' + channelName +
                           ', service=' + service + ', payload=' + payload);

  // Attempt to deliver message to the channel. Keep in mind that it may not
  // exist for several reasons, including but not limited to:
  //  - a malformed message
  //  - the channel simply has not been created
  //  - channel was created in a different namespace
  //  - message was sent to the wrong window
  //  - channel has become stale (e.g. caching iframes and back clicks)
  var channel = goog.net.xpc.channels_[channelName];
  if (channel) {
    channel.deliver_(service, payload, msgEvt.getBrowserEvent().origin);
    return true;
  }

  // Check if there are any stale channel names that can be updated.
  for (var staleChannelName in goog.net.xpc.channels_) {
    var staleChannel = goog.net.xpc.channels_[staleChannelName];
    if (staleChannel.getRole() == goog.net.xpc.CrossPageChannelRole.INNER &&
        !staleChannel.isConnected() &&
        service == goog.net.xpc.TRANSPORT_SERVICE_ &&
        payload == goog.net.xpc.SETUP) {
      // Inner peer received SETUP message but channel names did not match.
      // Start using the channel name sent from outer peer. The channel name
      // of the inner peer can easily become out of date, as iframe's and their
      // JS state get cached in many browsers upon page reload or history
      // navigation (particularly Firefox 1.5+). We can trust the outer peer,
      // since we only accept postMessage messages from the same hostname that
      // originally setup the channel.
      goog.net.xpc.logger.fine('changing channel name to ' + channelName);
      staleChannel.name = channelName;
      // Remove old stale pointer to channel.
      delete goog.net.xpc.channels_[staleChannelName];
      // Create fresh pointer to channel.
      goog.net.xpc.channels_[channelName] = staleChannel;
      staleChannel.deliver_(service, payload);
      return true;
    }
  }

  // Failed to find a channel to deliver this message to, so simply ignore it.
  goog.net.xpc.logger.info('channel name mismatch; message ignored"');
  return false;
};


/**
 * Handles transport service messages.
 * @param {string} payload The message content.
 */
goog.net.xpc.NativeMessagingTransport.prototype.transportServiceHandler =
    function(payload) {
  switch (payload) {
    case goog.net.xpc.SETUP:
      this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
      if (!this.setupAckSent_.hasFired()) {
        this.setupAckSent_.callback(true);
      }
      break;
    case goog.net.xpc.SETUP_ACK_:
      if (!this.setupAckReceived_.hasFired()) {
        this.setupAckReceived_.callback(true);
      }
      break;
  }
};


/**
 * Connects this transport.
 */
goog.net.xpc.NativeMessagingTransport.prototype.connect = function() {
  goog.net.xpc.NativeMessagingTransport.initialize_(this.getWindow());
  this.initialized_ = true;
  this.maybeAttemptToConnect_();
};


/**
 * Connects to other peer. In the case of the outer peer, the setup messages are
 * likely sent before the inner peer is ready to receive them. Therefore, this
 * function will continue trying to send the SETUP message until the inner peer
 * responds. In the case of the inner peer, it will occasionally have its
 * channel name fall out of sync with the outer peer, particularly during
 * soft-reloads and history navigations.
 * @private
 */
goog.net.xpc.NativeMessagingTransport.prototype.maybeAttemptToConnect_ =
    function() {
  // In a one-sided handshake, the outer frame does not send a SETUP message,
  // but the inner frame does.
  var outerFrame = this.channel_.getRole() ==
      goog.net.xpc.CrossPageChannelRole.OUTER;
  if ((this.oneSidedHandshake_ && outerFrame) ||
      this.channel_.isConnected() ||
      this.isDisposed()) {
    this.maybeAttemptToConnectTimer_.stop();
    return;
  }
  this.maybeAttemptToConnectTimer_.start();
  this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP);
};


/**
 * Sends a message.
 * @param {string} service The name off the service the message is to be
 * delivered to.
 * @param {string} payload The message content.
 * @override
 */
goog.net.xpc.NativeMessagingTransport.prototype.send = function(service,
                                                                payload) {
  var win = this.channel_.peerWindowObject_;
  if (!win) {
    goog.net.xpc.logger.fine('send(): window not ready');
    return;
  }

  // postMessage is a method of the window object, except in some versions of
  // Opera, where it is a method of the document object.
  var obj = win.postMessage ? win : win.document;
  this.send = function(service, payload) {
    goog.net.xpc.logger.fine('send(): payload=' + payload +
                             ' to hostname=' + this.peerHostname_);
    obj.postMessage(this.channel_.name + '|' + service + ':' + payload,
                    this.peerHostname_);
  };
  this.send(service, payload);
};


/**
 * Notify the channel that this transport is connected.  A short delay is
 * required to paper over timing vulnerabilities.
 * @private
 */
goog.net.xpc.NativeMessagingTransport.prototype.notifyConnected_ =
    function() {
  this.channel_.notifyConnected(
      goog.net.xpc.NativeMessagingTransport.CONNECTION_DELAY_MS_);
};


/** @override */
goog.net.xpc.NativeMessagingTransport.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  if (this.initialized_) {
    var listenWindow = this.getWindow();
    var uid = goog.getUid(listenWindow);
    var value = goog.net.xpc.NativeMessagingTransport.activeCount_[uid];
    goog.net.xpc.NativeMessagingTransport.activeCount_[uid] = value - 1;
    if (value == 1) {
      goog.events.unlisten(
          listenWindow.postMessage ? listenWindow : listenWindow.document,
          'message',
          goog.net.xpc.NativeMessagingTransport.messageReceived_,
          false,
          goog.net.xpc.NativeMessagingTransport);
    }
  }

  goog.dispose(this.eventHandler_);
  delete this.eventHandler_;

  goog.dispose(this.maybeAttemptToConnectTimer_);
  delete this.maybeAttemptToConnectTimer_;

  this.setupAckReceived_.cancel();
  delete this.setupAckReceived_;
  this.setupAckSent_.cancel();
  delete this.setupAckSent_;
  this.connected_.cancel();
  delete this.connected_;

  // Cleaning up this.send as it is an instance method, created in
  // goog.net.xpc.NativeMessagingTransport.prototype.send and has a closure over
  // this.channel_.peerWindowObject_.
  delete this.send;
};
