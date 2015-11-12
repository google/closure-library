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

goog.provide('goog.events.EventId');

// Note: in the comment below there is a zero-width space \u008b between
// the * and / in the sample code, so that the */ doesn't end the comment
// block.
// To recreate the zero-width space execute in a browser console:
//      console.log('*\u008b/');
// and copy/paste the result where needed.


/**
 * A templated class that is used when registering for events. Typical usage:
 *
 * <pre>
 * /** @type {goog.events.EventId&lt;MyEventObj&gt;}*/
 * var myEventId = new goog.events.EventId(
 *     goog.events.getUniqueId(('someEvent'));
 *
 * // No need to cast or declare here since the compiler knows the
 * // correct type of 'evt' (MyEventObj).
 * something.listen(myEventId, function(evt) {});
 * </pre>
 *
 * @param {string} eventId
 * @template T
 * @constructor
 * @struct
 * @final
 */
goog.events.EventId = function(eventId) {
  /** @const */ this.id = eventId;
};


/**
 * @override
 */
goog.events.EventId.prototype.toString = function() {
  return this.id;
};
