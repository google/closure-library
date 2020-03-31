/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A MessageChannel decorator that wraps a deferred MessageChannel
 * and enqueues messages and service registrations until that channel exists.
 */

goog.provide('goog.messaging.DeferredChannel');

// interface
goog.forwardDeclare('goog.async.Deferred');
goog.require('goog.Disposable');
goog.require('goog.messaging.MessageChannel');



/**
 * Creates a new DeferredChannel, which wraps a deferred MessageChannel and
 * enqueues messages to be sent once the wrapped channel is resolved.
 *
 * @param {!goog.async.Deferred<!goog.messaging.MessageChannel>} deferredChannel
 *     The underlying deferred MessageChannel.
 * @constructor
 * @extends {goog.Disposable}
 * @implements {goog.messaging.MessageChannel}
 * @final
 */
goog.messaging.DeferredChannel = function(deferredChannel) {
  goog.messaging.DeferredChannel.base(this, 'constructor');

  /** @private {!goog.async.Deferred<!goog.messaging.MessageChannel>} */
  this.deferred_ = deferredChannel;
};
goog.inherits(goog.messaging.DeferredChannel, goog.Disposable);


/**
 * Cancels the wrapped Deferred.
 */
goog.messaging.DeferredChannel.prototype.cancel = function() {
  this.deferred_.cancel();
};


/** @override */
goog.messaging.DeferredChannel.prototype.connect = function(opt_connectCb) {
  if (opt_connectCb) {
    opt_connectCb();
  }
};


/** @override */
goog.messaging.DeferredChannel.prototype.isConnected = function() {
  return true;
};


/** @override */
goog.messaging.DeferredChannel.prototype.registerService = function(
    serviceName, callback, opt_objectPayload) {
  this.deferred_.addCallback(function(resolved) {
    resolved.registerService(serviceName, callback, opt_objectPayload);
  });
};


/** @override */
goog.messaging.DeferredChannel.prototype.registerDefaultService = function(
    callback) {
  this.deferred_.addCallback(function(resolved) {
    resolved.registerDefaultService(callback);
  });
};


/** @override */
goog.messaging.DeferredChannel.prototype.send = function(serviceName, payload) {
  this.deferred_.addCallback(function(resolved) {
    resolved.send(serviceName, payload);
  });
};


/** @override */
goog.messaging.DeferredChannel.prototype.disposeInternal = function() {
  this.cancel();
  goog.messaging.DeferredChannel.base(this, 'disposeInternal');
};
