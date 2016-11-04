// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Datastructure: Circular Buffer.
 *
 * Implements a buffer with a maximum size. New entries override the oldest
 * entries when the maximum size has been reached.
 *
 */


goog.provide('goog.structs.CircularBuffer');



/**
 * Class for CircularBuffer.
 * @param {number=} opt_maxSize The maximum size of the buffer.
 * @constructor
 * @template T
 */
goog.structs.CircularBuffer = function(opt_maxSize) {
  /**
   * Index of the next element in the circular array structure.
   * @private {number}
   */
  this.nextPtr_ = 0;

  /**
   * Maximum size of the the circular array structure.
   * @private {number}
   */
  this.maxSize_ = opt_maxSize || 100;

  /**
   * Underlying array for the CircularBuffer.
   * @private {!Array<T>}
   */
  this.buff_ = [];
};


/**
 * Adds an item to the buffer. May remove the oldest item if the buffer is at
 * max size.
 * @param {T} item The item to add.
 * @return {T|undefined} The removed old item, if the buffer is at max size.
 *     Return undefined, otherwise.
 */
goog.structs.CircularBuffer.prototype.add = function(item) {
  var previousItem = this.buff_[this.nextPtr_];
  this.buff_[this.nextPtr_] = item;
  this.nextPtr_ = (this.nextPtr_ + 1) % this.maxSize_;
  return previousItem;
};


/**
 * Returns the item at the specified index.
 * @param {number} index The index of the item. The index of an item can change
 *     after calls to {@code add()} if the buffer is at maximum size.
 * @return {T} The item at the specified index.
 */
goog.structs.CircularBuffer.prototype.get = function(index) {
  index = this.normalizeIndex_(index);
  return this.buff_[index];
};


/**
 * Sets the item at the specified index.
 * @param {number} index The index of the item. The index of an item can change
 *     after calls to {@code add()} if the buffer is at maximum size.
 * @param {T} item The item to add.
 */
goog.structs.CircularBuffer.prototype.set = function(index, item) {
  index = this.normalizeIndex_(index);
  this.buff_[index] = item;
};


/**
 * Returns the current number of items in the buffer.
 * @return {number} The current number of items in the buffer.
 */
goog.structs.CircularBuffer.prototype.getCount = function() {
  return this.buff_.length;
};


/**
 * @return {boolean} Whether the buffer is empty.
 */
goog.structs.CircularBuffer.prototype.isEmpty = function() {
  return this.buff_.length == 0;
};


/**
 * Empties the current buffer.
 */
goog.structs.CircularBuffer.prototype.clear = function() {
  this.buff_.length = 0;
  this.nextPtr_ = 0;
};


/** @return {!Array<T>} The values in the buffer. */
goog.structs.CircularBuffer.prototype.getValues = function() {
  // getNewestValues returns all the values if the maxCount parameter is the
  // count
  return this.getNewestValues(this.getCount());
};


/**
 * Returns the newest values in the buffer up to {@code count}.
 * @param {number} maxCount The maximum number of values to get. Should be a
 *     positive number.
 * @return {!Array<T>} The newest values in the buffer up to {@code count}.
 */
goog.structs.CircularBuffer.prototype.getNewestValues = function(maxCount) {
  var l = this.getCount();
  var start = this.getCount() - maxCount;
  var rv = [];
  for (var i = start; i < l; i++) {
    rv.push(this.get(i));
  }
  return rv;
};


/** @return {!Array<number>} The indexes in the buffer. */
goog.structs.CircularBuffer.prototype.getKeys = function() {
  var rv = [];
  var l = this.getCount();
  for (var i = 0; i < l; i++) {
    rv[i] = i;
  }
  return rv;
};


/**
 * Whether the buffer contains the key/index.
 * @param {number} key The key/index to check for.
 * @return {boolean} Whether the buffer contains the key/index.
 */
goog.structs.CircularBuffer.prototype.containsKey = function(key) {
  return key < this.getCount();
};


/**
 * Whether the buffer contains the given value.
 * @param {T} value The value to check for.
 * @return {boolean} Whether the buffer contains the given value.
 */
goog.structs.CircularBuffer.prototype.containsValue = function(value) {
  var l = this.getCount();
  for (var i = 0; i < l; i++) {
    if (this.get(i) == value) {
      return true;
    }
  }
  return false;
};


/**
 * Returns the last item inserted into the buffer.
 * @return {T|null} The last item inserted into the buffer,
 *     or null if the buffer is empty.
 */
goog.structs.CircularBuffer.prototype.getLast = function() {
  if (this.getCount() == 0) {
    return null;
  }
  return this.get(this.getCount() - 1);
};


/**
 * Helper function to convert an index in the number space of oldest to
 * newest items in the array to the position that the element will be at in the
 * underlying array.
 * @param {number} index The index of the item in a list ordered from oldest to
 *     newest.
 * @return {number} The index of the item in the CircularBuffer's underlying
 *     array.
 * @private
 */
goog.structs.CircularBuffer.prototype.normalizeIndex_ = function(index) {
  if (index >= this.buff_.length) {
    throw Error('Out of bounds exception');
  }

  if (this.buff_.length < this.maxSize_) {
    return index;
  }

  return (this.nextPtr_ + Number(index)) % this.maxSize_;
};
