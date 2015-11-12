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
 * @fileoverview  Topic-based publish/subscribe channel implementation.
 *
 * @author attila@google.com (Attila Bodis)
 */

goog.provide('goog.pubsub.PubSub');

goog.require('goog.Disposable');
goog.require('goog.array');
goog.require('goog.async.run');



/**
 * Topic-based publish/subscribe channel.  Maintains a map of topics to
 * subscriptions.  When a message is published to a topic, all functions
 * subscribed to that topic are invoked in the order they were added.
 * Uncaught errors abort publishing.
 *
 * Topics may be identified by any nonempty string, <strong>except</strong>
 * strings corresponding to native Object properties, e.g. "constructor",
 * "toString", "hasOwnProperty", etc.
 *
 * @constructor
 * @param {boolean=} opt_async Enable asynchronous behavior.  Recommended for
 *     new code.  See notes on the publish() method.
 * @extends {goog.Disposable}
 */
goog.pubsub.PubSub = function(opt_async) {
  goog.pubsub.PubSub.base(this, 'constructor');

  /**
   * The next available subscription key.  Internally, this is an index into the
   * sparse array of subscriptions.
   *
   * @private {number}
   */
  this.key_ = 1;

  /**
   * Array of subscription keys pending removal once publishing is done.
   *
   * @private {!Array<number>}
   * @const
   */
  this.pendingKeys_ = [];

  /**
   * Lock to prevent the removal of subscriptions during publishing. Incremented
   * at the beginning of {@link #publish}, and decremented at the end.
   *
   * @private {number}
   */
  this.publishDepth_ = 0;

  /**
   * Sparse array of subscriptions. Each subscription is represented by a tuple
   * comprising a topic identifier, a function, and an optional context object.
   * Each tuple occupies three consecutive positions in the array, with the
   * topic identifier at index n, the function at index (n + 1), the context
   * object at index (n + 2), the next topic at index (n + 3), etc. (This
   * representation minimizes the number of object allocations and has been
   * shown to be faster than an array of objects with three key-value pairs or
   * three parallel arrays, especially on IE.) Once a subscription is removed
   * via {@link #unsubscribe} or {@link #unsubscribeByKey}, the three
   * corresponding array elements are deleted, and never reused. This means the
   * total number of subscriptions during the lifetime of the pubsub channel is
   * limited by the maximum length of a JavaScript array to (2^32 - 1) / 3 =
   * 1,431,655,765 subscriptions, which should suffice for most applications.
   *
   * @private {!Array<?>}
   * @const
   */
  this.subscriptions_ = [];

  /**
   * Map of topics to arrays of subscription keys.
   *
   * @private {!Object<!Array<number>>}
   */
  this.topics_ = {};

  /**
   * @private @const {boolean}
   */
  this.async_ = Boolean(opt_async);
};
goog.inherits(goog.pubsub.PubSub, goog.Disposable);


/**
 * Subscribes a function to a topic.  The function is invoked as a method on
 * the given {@code opt_context} object, or in the global scope if no context
 * is specified.  Subscribing the same function to the same topic multiple
 * times will result in multiple function invocations while publishing.
 * Returns a subscription key that can be used to unsubscribe the function from
 * the topic via {@link #unsubscribeByKey}.
 *
 * @param {string} topic Topic to subscribe to.
 * @param {Function} fn Function to be invoked when a message is published to
 *     the given topic.
 * @param {Object=} opt_context Object in whose context the function is to be
 *     called (the global scope if none).
 * @return {number} Subscription key.
 */
goog.pubsub.PubSub.prototype.subscribe = function(topic, fn, opt_context) {
  var keys = this.topics_[topic];
  if (!keys) {
    // First subscription to this topic; initialize subscription key array.
    keys = this.topics_[topic] = [];
  }

  // Push the tuple representing the subscription onto the subscription array.
  var key = this.key_;
  this.subscriptions_[key] = topic;
  this.subscriptions_[key + 1] = fn;
  this.subscriptions_[key + 2] = opt_context;
  this.key_ = key + 3;

  // Push the subscription key onto the list of subscriptions for the topic.
  keys.push(key);

  // Return the subscription key.
  return key;
};


/**
 * Subscribes a single-use function to a topic.  The function is invoked as a
 * method on the given {@code opt_context} object, or in the global scope if
 * no context is specified, and is then unsubscribed.  Returns a subscription
 * key that can be used to unsubscribe the function from the topic via
 * {@link #unsubscribeByKey}.
 *
 * @param {string} topic Topic to subscribe to.
 * @param {Function} fn Function to be invoked once and then unsubscribed when
 *     a message is published to the given topic.
 * @param {Object=} opt_context Object in whose context the function is to be
 *     called (the global scope if none).
 * @return {number} Subscription key.
 */
goog.pubsub.PubSub.prototype.subscribeOnce = function(topic, fn, opt_context) {
  // Keep track of whether the function was called.  This is necessary because
  // in async mode, multiple calls could be scheduled before the function has
  // the opportunity to unsubscribe itself.
  var called = false;

  // Behold the power of lexical closures!
  var key = this.subscribe(topic, function(var_args) {
    if (!called) {
      called = true;

      // Unsubuscribe before calling function so the function is unscubscribed
      // even if it throws an exception.
      this.unsubscribeByKey(key);

      fn.apply(opt_context, arguments);
    }
  }, this);
  return key;
};


/**
 * Unsubscribes a function from a topic.  Only deletes the first match found.
 * Returns a Boolean indicating whether a subscription was removed.
 *
 * @param {string} topic Topic to unsubscribe from.
 * @param {Function} fn Function to unsubscribe.
 * @param {Object=} opt_context Object in whose context the function was to be
 *     called (the global scope if none).
 * @return {boolean} Whether a matching subscription was removed.
 */
goog.pubsub.PubSub.prototype.unsubscribe = function(topic, fn, opt_context) {
  var keys = this.topics_[topic];
  if (keys) {
    // Find the subscription key for the given combination of topic, function,
    // and context object.
    var subscriptions = this.subscriptions_;
    var key = goog.array.find(keys, function(k) {
      return subscriptions[k + 1] == fn && subscriptions[k + 2] == opt_context;
    });
    // Zero is not a valid key.
    if (key) {
      return this.unsubscribeByKey(key);
    }
  }

  return false;
};


/**
 * Removes a subscription based on the key returned by {@link #subscribe}.
 * No-op if no matching subscription is found.  Returns a Boolean indicating
 * whether a subscription was removed.
 *
 * @param {number} key Subscription key.
 * @return {boolean} Whether a matching subscription was removed.
 */
goog.pubsub.PubSub.prototype.unsubscribeByKey = function(key) {
  var topic = this.subscriptions_[key];
  if (topic) {
    // Subscription tuple found.
    var keys = this.topics_[topic];

    if (this.publishDepth_ != 0) {
      // Defer removal until after publishing is complete, but replace the
      // function with a no-op so it isn't called.
      this.pendingKeys_.push(key);
      this.subscriptions_[key + 1] = goog.nullFunction;
    } else {
      if (keys) {
        goog.array.remove(keys, key);
      }
      delete this.subscriptions_[key];
      delete this.subscriptions_[key + 1];
      delete this.subscriptions_[key + 2];
    }
  }

  return !!topic;
};


/**
 * Publishes a message to a topic.  Calls functions subscribed to the topic in
 * the order in which they were added, passing all arguments along.
 *
 * If this object was created with async=true, subscribed functions are called
 * via goog.async.run().  Otherwise, the functions are called directly, and if
 * any of them throw an uncaught error, publishing is aborted.
 *
 * @param {string} topic Topic to publish to.
 * @param {...*} var_args Arguments that are applied to each subscription
 *     function.
 * @return {boolean} Whether any subscriptions were called.
 */
goog.pubsub.PubSub.prototype.publish = function(topic, var_args) {
  var keys = this.topics_[topic];
  if (keys) {
    // Copy var_args to a new array so they can be passed to subscribers.
    // Note that we can't use Array.slice or goog.array.toArray for this for
    // performance reasons. Using those with the arguments object will cause
    // deoptimization.
    var args = new Array(arguments.length - 1);
    for (var i = 1, len = arguments.length; i < len; i++) {
      args[i - 1] = arguments[i];
    }

    if (this.async_) {
      // For each key in the list of subscription keys for the topic, schedule
      // the function to be applied to the arguments in the appropriate context.
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        goog.pubsub.PubSub.runAsync_(
            this.subscriptions_[key + 1],
            this.subscriptions_[key + 2],
            args);
      }
    } else {
      // We must lock subscriptions and remove them at the end, so we don't
      // adversely affect the performance of the common case by cloning the key
      // array.
      this.publishDepth_++;

      try {
        // For each key in the list of subscription keys for the topic, apply
        // the function to the arguments in the appropriate context.  The length
        // of the array must be fixed during the iteration, since subscribers
        // may add new subscribers during publishing.
        for (i = 0, len = keys.length; i < len; i++) {
          var key = keys[i];
          this.subscriptions_[key + 1].apply(
              this.subscriptions_[key + 2], args);
        }
      } finally {
        // Always unlock subscriptions, even if a subscribed method throws an
        // uncaught exception. This makes it possible for users to catch
        // exceptions themselves and unsubscribe remaining subscriptions.
        this.publishDepth_--;

        if (this.pendingKeys_.length > 0 && this.publishDepth_ == 0) {
          var pendingKey;
          while ((pendingKey = this.pendingKeys_.pop())) {
            this.unsubscribeByKey(pendingKey);
          }
        }
      }
    }

    // At least one subscriber was called.
    return i != 0;
  }

  // No subscribers were found.
  return false;
};


/**
 * Runs a function asynchronously with the given context and arguments.
 * @param {!Function} func The function to call.
 * @param {*} context The context in which to call {@code func}.
 * @param {!Array} args The arguments to pass to {@code func}.
 * @private
 */
goog.pubsub.PubSub.runAsync_ = function(func, context, args) {
  goog.async.run(function() {
    func.apply(context, args);
  });
};


/**
 * Clears the subscription list for a topic, or all topics if unspecified.
 * @param {string=} opt_topic Topic to clear (all topics if unspecified).
 */
goog.pubsub.PubSub.prototype.clear = function(opt_topic) {
  if (opt_topic) {
    var keys = this.topics_[opt_topic];
    if (keys) {
      goog.array.forEach(keys, this.unsubscribeByKey, this);
      delete this.topics_[opt_topic];
    }
  } else {
    this.subscriptions_.length = 0;
    this.topics_ = {};
    // We don't reset key_ on purpose, because we want subscription keys to be
    // unique throughout the lifetime of the application.  Reusing subscription
    // keys could lead to subtle errors in client code.
  }
};


/**
 * Returns the number of subscriptions to the given topic (or all topics if
 * unspecified). This number will not change while publishing any messages.
 * @param {string=} opt_topic The topic (all topics if unspecified).
 * @return {number} Number of subscriptions to the topic.
 */
goog.pubsub.PubSub.prototype.getCount = function(opt_topic) {
  if (opt_topic) {
    var keys = this.topics_[opt_topic];
    return keys ? keys.length : 0;
  }

  var count = 0;
  for (var topic in this.topics_) {
    count += this.getCount(topic);
  }

  return count;
};


/** @override */
goog.pubsub.PubSub.prototype.disposeInternal = function() {
  goog.pubsub.PubSub.base(this, 'disposeInternal');
  this.clear();
  this.pendingKeys_.length = 0;
};
