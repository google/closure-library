/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview adaptor of XhrStreamReader to the NodeReadableStream interface.
 */

goog.provide('goog.net.streams.XhrNodeReadableStream');

goog.require('goog.array');
goog.require('goog.log');
goog.require('goog.net.streams.NodeReadableStream');
goog.require('goog.net.streams.XhrStreamReader');



/**
 * The XhrNodeReadableStream class.
 *
 * @param {!goog.net.streams.XhrStreamReader} xhrReader The XhrStreamReader
 *    object that handles the events of the underlying Xhr.
 * @constructor
 * @implements {goog.net.streams.NodeReadableStream}
 * @struct
 * @final
 * @package
 */
goog.net.streams.XhrNodeReadableStream = function(xhrReader) {
  'use strict';
  /**
   * @const
   * @private {?goog.log.Logger} the logger.
   */
  this.logger_ = goog.log.getLogger('goog.net.streams.XhrNodeReadableStream');


  /**
   * The xhr reader.
   *
   * @private {!goog.net.streams.XhrStreamReader} the xhr reader.
   */
  this.xhrReader_ = xhrReader;

  this.xhrReader_.setDataHandler(goog.bind(this.onData_, this));
  this.xhrReader_.setStatusHandler(goog.bind(this.onStatusChange_, this));

  /**
   * The callback map, keyed by eventTypes.
   *
   * @private {!Object<Array<function(!Object=)>>}
   */
  this.callbackMap_ = {};

  /**
   * The callback-once map, keyed by eventTypes.
   *
   * @private {!Object<Array<function(!Object=)>>}
   */
  this.callbackOnceMap_ = {};
};


/**
 * @override
 */
goog.net.streams.XhrNodeReadableStream.prototype.on = function(
    eventType, callback) {
  'use strict';
  let callbacks = this.callbackMap_[eventType];
  if (!callbacks) {
    callbacks = [];
    this.callbackMap_[eventType] = callbacks;
  }

  callbacks.push(callback);
  return this;
};


/**
 * @override
 */
goog.net.streams.XhrNodeReadableStream.prototype.addListener = function(
    eventType, callback) {
  'use strict';
  this.on(eventType, callback);
  return this;
};


/**
 * @override
 */
goog.net.streams.XhrNodeReadableStream.prototype.removeListener = function(
    eventType, callback) {
  'use strict';
  const callbacks = this.callbackMap_[eventType];
  if (callbacks) {
    goog.array.remove(callbacks, callback);  // keep the empty array
  }

  const onceCallbacks = this.callbackOnceMap_[eventType];
  if (onceCallbacks) {
    goog.array.remove(onceCallbacks, callback);
  }

  return this;
};


/**
 * @override
 */
goog.net.streams.XhrNodeReadableStream.prototype.once = function(
    eventType, callback) {
  'use strict';
  let callbacks = this.callbackOnceMap_[eventType];
  if (!callbacks) {
    callbacks = [];
    this.callbackOnceMap_[eventType] = callbacks;
  }

  callbacks.push(callback);
  return this;
};


/**
 * Handles any new data from XHR.
 *
 * @param {!Array<!Object>} messages New messages, to be delivered in order
 *    and atomically.
 * @private
 */
goog.net.streams.XhrNodeReadableStream.prototype.onData_ = function(messages) {
  'use strict';
  const callbacks =
      this.callbackMap_[goog.net.streams.NodeReadableStream.EventType.DATA];
  if (callbacks) {
    this.doMessages_(messages, callbacks);
  }

  const onceCallbacks =
      this.callbackOnceMap_[goog.net.streams.NodeReadableStream.EventType.DATA];
  if (onceCallbacks) {
    this.doMessages_(messages, onceCallbacks);
  }
  this.callbackOnceMap_[goog.net.streams.NodeReadableStream.EventType.DATA] =
      [];
};


/**
 * Deliver messages to registered callbacks.
 *
 * Exceptions are caught and logged (debug), and ignored otherwise.
 *
 * @param {!Array<!Object>} messages The messages to be delivered
 * @param {!Array<function(!Object=)>} callbacks The callbacks.
 * @private
 */
goog.net.streams.XhrNodeReadableStream.prototype.doMessages_ = function(
    messages, callbacks) {
  'use strict';
  const self = this;
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];

    goog.array.forEach(callbacks, function(callback) {
      'use strict';
      try {
        callback(message);
      } catch (ex) {
        self.handleError_('message-callback exception (ignored) ' + ex);
      }
    });
  }
};


/**
 * Handles any state changes from XHR.
 *
 * @private
 */
goog.net.streams.XhrNodeReadableStream.prototype.onStatusChange_ = function() {
  'use strict';
  const currentStatus = this.xhrReader_.getStatus();
  const Status = goog.net.streams.XhrStreamReader.Status;
  const EventType = goog.net.streams.NodeReadableStream.EventType;

  switch (currentStatus) {
    case Status.ACTIVE:
      this.doStatus_(EventType.READABLE);
      break;

    case Status.BAD_DATA:
    case Status.HANDLER_EXCEPTION:
    case Status.NO_DATA:
    case Status.TIMEOUT:
    case Status.XHR_ERROR:
      this.doStatus_(EventType.ERROR);
      break;

    case Status.CANCELLED:
      this.doStatus_(EventType.CLOSE);
      break;

    case Status.SUCCESS:
      this.doStatus_(EventType.END);
      break;
  }
};


/**
 * Run status change callbacks.
 *
 * @param {string} eventType The event type
 * @private
 */
goog.net.streams.XhrNodeReadableStream.prototype.doStatus_ = function(
    eventType) {
  'use strict';
  const callbacks = this.callbackMap_[eventType];
  const self = this;
  if (callbacks) {
    goog.array.forEach(callbacks, function(callback) {
      'use strict';
      try {
        callback();
      } catch (ex) {
        self.handleError_('status-callback exception (ignored) ' + ex);
      }
    });
  }

  const onceCallbacks = this.callbackOnceMap_[eventType];
  if (onceCallbacks) {
    goog.array.forEach(onceCallbacks, function(callback) {
      'use strict';
      callback();
    });
  }

  this.callbackOnceMap_[eventType] = [];
};


/**
 * Log an error
 *
 * @param {string} message The error message
 * @private
 */
goog.net.streams.XhrNodeReadableStream.prototype.handleError_ = function(
    message) {
  'use strict';
  goog.log.error(this.logger_, message);
};
