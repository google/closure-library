// Copyright 2011 The Closure Library Authors. All Rights Reserved
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
 * @fileoverview The jsaction dispatcher.
 * Serves as the registry with which clients register jsaction handlers.
 * When EventContract finds a jsaction to be invoked for an event, it
 * calls the dispatcher, which then looks up the corresponding handler
 * function and invokes it.
 *
 * Usage:
 *
 * The dispatcher first needs to be hooked up to an instance of
 * goog.jsaction.EventContract.
 *
 * var dispatcher = new goog.jsaction.Dispatcher;
 * eventContract.setDispatcher(dispatcher);
 *
 * Clients can register handlers for the jsactions they use in their
 * markup. For example, the code to add the action handler for element
 *   <div jsaction="foo.bar">Do stuff</div>
 * would look like this:
 *
 * var fooBarHandler = function(context) {
 *   // Do stuff.
 * };
 * dispatcher.registerHandlers('foo', {'bar': fooBarHandler});
 *
 */


goog.provide('goog.jsaction.Dispatcher');
goog.provide('goog.jsaction.HandlerFunction');

goog.require('goog.jsaction.Context');
goog.require('goog.jsaction.EventContract');
goog.require('goog.jsaction.util');


/**
 * The signature of action handler functions.
 * @typedef {function(!goog.jsaction.Context):void}
 */
goog.jsaction.HandlerFunction;



/**
 * Creates jsaction dispatcher that serves as registry for
 * action handlers and dispatches actions to appropriate handlers.
 * @constructor
 */
goog.jsaction.Dispatcher = function() {
  /**
   * The handler registry.
   * @type {!Object.<string, !goog.jsaction.HandlerFunction>}
   * @private
   */
  this.handlers_ = {};
};


/**
 * Registers action handlers.
 * @param {string} ns The namespace.
 * @param {!Object.<string, !goog.jsaction.HandlerFunction>} handlers
 *     The handlers. Map from action name to action handler function.
 */
goog.jsaction.Dispatcher.prototype.registerHandlers = function(ns, handlers) {
  for (var name in handlers) {
    this.handlers_[ns + '.' + name] = handlers[name];
  }
};


/**
 * Dispatches an action to the appropriate handler function.
 * @param {string} action The action.
 * @param {!Element} elem The element.
 * @param {!Event} e The event object.
 * @param {number} time The time when the event occured.
 * @return {boolean} Whether the action has been handled.
 */
goog.jsaction.Dispatcher.prototype.dispatch = function(
    action, elem, e, time) {
  var handler = this.handlers_[action];
  if (handler) {
    handler(new goog.jsaction.Context(action, elem, e, time));

    goog.jsaction.util.preventDefault(e);

    return true;
  }

  return false;
};
