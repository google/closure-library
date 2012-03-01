// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Defines a NoticeType class used to denote different
 * notification type of an observable.
 */

goog.provide('goog.labs.observe.NoticeType');



/**
 * A notice type is used to denote different notification type that an
 * observable fires.
 * @param {string} debugString String used to help during
 *     debugging. This is typically short (but descriptive enough)
 *     string. It need not be unique across the entire application.
 * @constructor
 */
goog.labs.observe.NoticeType = function(debugString) {
  /**
   * @type {string}
   * @private
   */
  this.type_ = debugString + String(goog.labs.observe.NoticeType.nextId_++);
};


/**
 * @return {string} String representation of this notice type. The
 *     value is guaranteed to be unique across all instances of
 *     NoticeType.
 */
goog.labs.observe.NoticeType.prototype.toString = function() {
  return this.type_;
};


/**
 * A generator for unique id used to generate internal representation
 * of notice type.
 * @type {number}
 * @private
 */
goog.labs.observe.NoticeType.nextId_ = 0;


/**
 * A special notice type that denotes all notice type. When used in
 * {@code observe} method, this means "observe all type of
 * changes". When used in {@code notify} method, this means "notifies
 * all observers".
 * @type {!goog.labs.observe.NoticeType}
 * @const
 */
goog.labs.observe.NoticeType.ALL = new goog.labs.observe.NoticeType('all');
