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
 * @fileoverview An interface for asynchronous message-passing channels.
 *
 *
 */


goog.provide('goog.messaging.MessageChannel');



/**
 * @interface
 */
goog.messaging.MessageChannel = function() {};


/**
 * Initiates the channel connection. When this method is called, all the
 * information needed to connect the channel has to be available.
 *
 * @param {Function} opt_connectCb Called when the channel has been connected
 *     and is ready to use.
 */
goog.messaging.MessageChannel.prototype.connect = function(opt_connectCb) {};


/**
 * @return {boolean} Whether the channel is connected.
 */
goog.messaging.MessageChannel.prototype.isConnected = function() {};


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
 */
goog.messaging.MessageChannel.prototype.registerService =
    function(serviceName, callback, opt_jsonEncoded) {};


/**
 * Registers a service to be called when a message is received that doesn't
 * match any other services.
 *
 * @param {function(string, (string|Object))} callback The callback to process
 *     the incoming messages. Passed the service name and the payload. Since
 *     some channels can pass objects natively, the payload may be either an
 *     object or a string.
 */
goog.messaging.MessageChannel.prototype.registerDefaultService =
    function(callback) {};


/**
 * Sends a message over the channel.
 *
 * @param {string} serviceName The name of the service this message should be
 *     delivered to.
 * @param {string|Object} payload The value of the message. If this is an
 *     Object, it is serialized to JSON before sending. It's the responsibility
 *     of implementors of this class to perform the serialization.
 */
goog.messaging.MessageChannel.prototype.send =
    function(serviceName, payload) {};
