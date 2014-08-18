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
 * @fileoverview Provides a function to schedule running a function as soon
 * as possible after the current JS execution stops and yields to the event
 * loop.
 *
 */

goog.provide('goog.async');

goog.require('goog.debug.entryPointRegistry');
goog.require('goog.functions');
goog.require('goog.testing.watchers');


/**
 * Throw an item without interrupting the current execution context.  For
 * example, if processing a group of items in a loop, sometimes it is useful
 * to report an error while still allowing the rest of the batch to be
 * processed.
 * @param {*} exception
 */
goog.async.throwException = function(exception) {
  // Each throw needs to be in its own context.
  goog.global.setTimeout(function() { throw exception; }, 0);
};


/**
 * Fires the provided callbacks as soon as possible after the current JS
 * execution context. setTimeout(…, 0) always takes at least 5ms for legacy
 * reasons.
 *
 * This will not schedule the callback as a microtask (i.e. a task that can
 * preempt user input or networking callbacks). It is meant to emulate what
 * setTimeout(_, 0) would do if it were not throttled. If you desire microtask
 * behavior, use {@see goog.Promise} instead.
 *
 * @param {function(this:SCOPE)} callback Callback function to fire as soon as
 *     possible.
 * @param {SCOPE=} opt_context Object in whose scope to call the listener.
 * @template SCOPE
 */
goog.async.nextTick = function(callback, opt_context) {
  var cb = callback;
  if (opt_context) {
    cb = goog.bind(callback, opt_context);
  }
  cb = goog.async.nextTick.wrapCallback_(cb);
  // Introduced and currently only supported by IE10.
  if (goog.isFunction(goog.global.setImmediate)) {
    goog.global.setImmediate(cb);
    return;
  }
  // Look for and cache the custom fallback version of setImmediate.
  if (!goog.async.nextTick.setImmediate_) {
    goog.async.nextTick.setImmediate_ =
        goog.async.nextTick.getSetImmediateEmulator_();
  }
  goog.async.nextTick.setImmediate_(cb);
};


/**
 * Cache for the setImmediate implementation.
 * @type {function(function())}
 * @private
 */
goog.async.nextTick.setImmediate_;


/**
 * Determines the best possible implementation to run a function as soon as
 * the JS event loop is idle.
 * @return {function(function())} The "setImmediate" implementation.
 * @private
 */
goog.async.nextTick.getSetImmediateEmulator_ = function() {
  // Create a private message channel and use it to postMessage empty messages
  // to ourselves.
  var Channel = goog.global['MessageChannel'];
  // If MessageChannel is not available and we are in a browser, implement
  // an iframe based polyfill in browsers that have postMessage and
  // document.addEventListener. The latter excludes IE8 because it has a
  // synchronous postMessage implementation.
  if (typeof Channel === 'undefined' && typeof window !== 'undefined' &&
      window.postMessage && window.addEventListener) {
    /** @constructor */
    Channel = function() {
      // Make an empty, invisible iframe.
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = '';
      document.documentElement.appendChild(iframe);
      var win = iframe.contentWindow;
      var doc = win.document;
      doc.open();
      doc.write('');
      doc.close();
      // Do not post anything sensitive over this channel, as the workaround for
      // pages with file: origin could allow that information to be modified or
      // intercepted.
      var message = 'callImmediate' + Math.random();
      // The same origin policy rejects attempts to postMessage from file: urls
      // unless the origin is '*'.
      // TODO(b/16335441): Use '*' origin for data: and other similar protocols.
      var origin = win.location.protocol == 'file:' ?
          '*' : win.location.protocol + '//' + win.location.host;
      var onmessage = goog.bind(function(e) {
        // Validate origin and message to make sure that this message was
        // intended for us.
        if (e.origin != origin && e.data != message) {
          return;
        }
        this['port1'].onmessage();
      }, this);
      win.addEventListener('message', onmessage, false);
      this['port1'] = {};
      this['port2'] = {
        postMessage: function() {
          win.postMessage(message, origin);
        }
      };
    };
  }
  if (typeof Channel !== 'undefined') {
    var channel = new Channel();
    // Use a fifo linked list to call callbacks in the right order.
    var head = {};
    var tail = head;
    channel['port1'].onmessage = function() {
      head = head.next;
      var cb = head.cb;
      head.cb = null;
      cb();
    };
    return function(cb) {
      tail.next = {
        cb: cb
      };
      tail = tail.next;
      channel['port2'].postMessage(0);
    };
  }
  // Implementation for IE6-8: Script elements fire an asynchronous
  // onreadystatechange event when inserted into the DOM.
  if (typeof document !== 'undefined' && 'onreadystatechange' in
      document.createElement('script')) {
    return function(cb) {
      var script = document.createElement('script');
      script.onreadystatechange = function() {
        // Clean up and call the callback.
        script.onreadystatechange = null;
        script.parentNode.removeChild(script);
        script = null;
        cb();
        cb = null;
      };
      document.documentElement.appendChild(script);
    };
  }
  // Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
  // or more.
  return function(cb) {
    goog.global.setTimeout(cb, 0);
  };
};


/**
 * Helper function that is overrided to protect callbacks with entry point
 * monitor if the application monitors entry points.
 * @param {function()} callback Callback function to fire as soon as possible.
 * @return {function()} The wrapped callback.
 * @private
 */
goog.async.nextTick.wrapCallback_ = goog.functions.identity;


// Register the callback function as an entry point, so that it can be
// monitored for exception handling, etc. This has to be done in this file
// since it requires special code to handle all browsers.
goog.debug.entryPointRegistry.register(
    /**
     * @param {function(!Function): !Function} transformer The transforming
     *     function.
     */
    function(transformer) {
      goog.async.nextTick.wrapCallback_ = transformer;
    });



/**
 * Fires the provided callback just before the current callstack unwinds, or as
 * soon as possible after the current JS execution context.
 * @param {function(this:THIS)} callback
 * @param {THIS=} opt_context Object to use as the "this value" when calling
 *     the provided function.
 * @template THIS
 */
goog.async.run = function(callback, opt_context) {
  if (!goog.async.run.schedule_) {
    goog.async.run.initializeRunner_();
  }
  if (!goog.async.run.workQueueScheduled_) {
    // Nothing is currently scheduled, schedule it now.
    goog.async.run.schedule_();
    goog.async.run.workQueueScheduled_ = true;
  }

  goog.async.run.workQueue_.push(
      new goog.async.run.WorkItem_(callback, opt_context));
};


/**
 * Initializes the function to use to process the work queue.
 * @private
 */
goog.async.run.initializeRunner_ = function() {
  // If native Promises are available in the browser, just schedule the callback
  // on a fulfilled promise, which is specified to be async, but as fast as
  // possible.
  if (goog.global.Promise && goog.global.Promise.resolve) {
    var promise = goog.global.Promise.resolve();
    goog.async.run.schedule_ = function() {
      promise.then(goog.async.run.processWorkQueue);
    };
  } else {
    goog.async.run.schedule_ = function() {
      goog.async.nextTick(goog.async.run.processWorkQueue);
    };
  }
};


/**
 * Forces goog.async.run to use nextTick instead of Promise.
 *
 * This should only be done in unit tests. It's useful because MockClock
 * replaces nextTick, but not the browser Promise implementation, so it allows
 * Promise-based code to be tested with MockClock.
 */
goog.async.run.forceNextTick = function() {
  goog.async.run.schedule_ = function() {
    goog.async.nextTick(goog.async.run.processWorkQueue);
  };
};


/**
 * The function used to schedule work asynchronousely.
 * @private {function()}
 */
goog.async.run.schedule_;


/** @private {boolean} */
goog.async.run.workQueueScheduled_ = false;


/** @private {!Array.<!goog.async.run.WorkItem_>} */
goog.async.run.workQueue_ = [];


if (goog.DEBUG) {
  /**
   * Reset the event queue.
   * @private
   */
  goog.async.run.resetQueue_ = function() {
    goog.async.run.workQueueScheduled_ = false;
    goog.async.run.workQueue_ = [];
  };

  // If there is a clock implemenation in use for testing
  // and it is reset, reset the queue.
  goog.testing.watchers.watchClockReset(goog.async.run.resetQueue_);
}


/**
 * Run any pending goog.async.run work items. This function is not intended
 * for general use, but for use by entry point handlers to run items ahead of
 * goog.async.nextTick.
 */
goog.async.run.processWorkQueue = function() {
  // NOTE: additional work queue items may be pushed while processing.
  while (goog.async.run.workQueue_.length) {
    // Don't let the work queue grow indefinitely.
    var workItems = goog.async.run.workQueue_;
    goog.async.run.workQueue_ = [];
    for (var i = 0; i < workItems.length; i++) {
      var workItem = workItems[i];
      try {
        workItem.fn.call(workItem.scope);
      } catch (e) {
        goog.async.throwException(e);
      }
    }
  }

  // There are no more work items, reset the work queue.
  goog.async.run.workQueueScheduled_ = false;
};



/**
 * @constructor
 * @final
 * @struct
 * @private
 *
 * @param {function()} fn
 * @param {Object|null|undefined} scope
 */
goog.async.run.WorkItem_ = function(fn, scope) {
  /** @const */ this.fn = fn;
  /** @const */ this.scope = scope;
};
