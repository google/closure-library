/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.provide('goog.pubsub.TypedPubSub');

goog.forwardDeclare('goog.pubsub.TopicId');
goog.require('goog.Disposable');
goog.require('goog.pubsub.PubSub');



/**
 * This object is a temporary shim that provides goog.pubsub.TopicId support
 * for goog.pubsub.PubSub.  See b/12477087 for more info.
 * @param {boolean=} opt_async Enable asynchronous behavior.  Recommended for
 *     new code.  See notes on `goog.pubsub.PubSub.publish`.
 * @constructor
 * @extends {goog.Disposable}
 */
goog.pubsub.TypedPubSub = function(opt_async) {
  goog.pubsub.TypedPubSub.base(this, 'constructor');

  this.pubSub_ = new goog.pubsub.PubSub(opt_async);
  this.registerDisposable(this.pubSub_);
};
goog.inherits(goog.pubsub.TypedPubSub, goog.Disposable);


/**
 * See `goog.pubsub.PubSub.subscribe`.
 * @param {!goog.pubsub.TopicId<PAYLOAD>} topic Topic to subscribe to.
 * @param {function(this:CONTEXT, PAYLOAD)} fn Function to be invoked when a
 *     message is published to the given topic.
 * @param {CONTEXT=} opt_context Object in whose context the function is to be
 *     called (the global scope if none).
 * @return {number} Subscription key.
 * @template PAYLOAD, CONTEXT
 */
goog.pubsub.TypedPubSub.prototype.subscribe = function(topic, fn, opt_context) {
  return this.pubSub_.subscribe(topic.toString(), fn, opt_context);
};


/**
 * See `goog.pubsub.PubSub.subscribeOnce`.
 * @param {!goog.pubsub.TopicId<PAYLOAD>} topic Topic to subscribe to.
 * @param {function(this:CONTEXT, PAYLOAD)} fn Function to be invoked once and
 *     then unsubscribed when a message is published to the given topic.
 * @param {CONTEXT=} opt_context Object in whose context the function is to be
 *     called (the global scope if none).
 * @return {number} Subscription key.
 * @template PAYLOAD, CONTEXT
 */
goog.pubsub.TypedPubSub.prototype.subscribeOnce = function(
    topic, fn, opt_context) {
  return this.pubSub_.subscribeOnce(topic.toString(), fn, opt_context);
};


/**
 * See `goog.pubsub.PubSub.unsubscribe`.
 * @param {!goog.pubsub.TopicId<PAYLOAD>} topic Topic to unsubscribe from.
 * @param {function(this:CONTEXT, PAYLOAD)} fn Function to unsubscribe.
 * @param {CONTEXT=} opt_context Object in whose context the function was to be
 *     called (the global scope if none).
 * @return {boolean} Whether a matching subscription was removed.
 * @template PAYLOAD, CONTEXT
 */
goog.pubsub.TypedPubSub.prototype.unsubscribe = function(
    topic, fn, opt_context) {
  return this.pubSub_.unsubscribe(topic.toString(), fn, opt_context);
};


/**
 * See `goog.pubsub.PubSub.unsubscribeByKey`.
 * @param {number} key Subscription key.
 * @return {boolean} Whether a matching subscription was removed.
 */
goog.pubsub.TypedPubSub.prototype.unsubscribeByKey = function(key) {
  return this.pubSub_.unsubscribeByKey(key);
};


/**
 * See `goog.pubsub.PubSub.publish`.
 * @param {!goog.pubsub.TopicId<PAYLOAD>} topic Topic to publish to.
 * @param {PAYLOAD} payload Payload passed to each subscription function.
 * @return {boolean} Whether any subscriptions were called.
 * @template PAYLOAD
 */
goog.pubsub.TypedPubSub.prototype.publish = function(topic, payload) {
  return this.pubSub_.publish(topic.toString(), payload);
};


/**
 * See `goog.pubsub.PubSub.clear`.
 * @param {!goog.pubsub.TopicId<PAYLOAD>=} opt_topic Topic to clear (all topics
 *     if unspecified).
 * @template PAYLOAD
 */
goog.pubsub.TypedPubSub.prototype.clear = function(opt_topic) {
  this.pubSub_.clear(
      opt_topic !== undefined ? opt_topic.toString() : undefined);
};


/**
 * See `goog.pubsub.PubSub.getCount`.
 * @param {!goog.pubsub.TopicId<PAYLOAD>=} opt_topic The topic (all topics if
 *     unspecified).
 * @return {number} Number of subscriptions to the topic.
 * @template PAYLOAD
 */
goog.pubsub.TypedPubSub.prototype.getCount = function(opt_topic) {
  return this.pubSub_.getCount(
      opt_topic !== undefined ? opt_topic.toString() : undefined);
};
