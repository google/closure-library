// Copyright 2014 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Utilities for working with ES6 iterables.
 *
 * The goal is that this should be a replacement for goog.iter which uses
 * a now non-standard approach to iterables.
 *
 * @see https://goo.gl/Rok5YQ
 */

goog.module('goog.labs.collections.iterables');


/**
 * Get the iterator for an iterable.
 * @param {!Iterable<VALUE>} iterable
 * @return {!Iterator<VALUE>}
 * @template VALUE
 */
exports.getIterator = function(iterable) {
  return iterable[goog.global.Symbol.iterator]();
};


/**
 * Call a function with every value of an iterable.
 *
 * Warning: this function will never halt if given an iterable that
 * is never exhausted.
 *
 * @param {function(VALUE) : *} f
 * @param {!Iterable<VALUE>} iterable
 * @template VALUE
 */
exports.forEach = function(f, iterable) {
  for (const elem of iterable) {
    f(elem);
  }
};


/**
 * Maps the values of one iterable to create another iterable.
 *
 * When next() is called on the returned iterable, it will call the given
 * function `f` with the next value of the given iterable
 * `iterable` until the given iterable is exhausted.
 *
 * @param {function(this: THIS, VALUE): RESULT} f
 * @param {!Iterable<VALUE>} iterable
 * @return {!Iterable<RESULT>} The created iterable that gives the mapped
 *     values.
 * @template THIS, VALUE, RESULT
 */
exports.map = function*(f, iterable) {
  for (const elem of iterable) {
    yield f(elem);
  }
};


/**
 * Filter elements from one iterator to create another iterable.
 *
 * When next() is called on the returned iterator, it will call next() on the
 * given iterator and call the given function `f` with that value until `true`
 * is returned or the given iterator is exhausted.
 *
 * @param {function(VALUE): boolean} f
 * @param {!Iterable<VALUE>} iterable
 * @return {!Iterable<VALUE>} The created iterable that gives the mapped
 *     values.
 * @template VALUE
 */
exports.filter = function*(f, iterable) {
  for (const elem of iterable) {
    if (f(elem)) {
      yield elem;
    }
  }
};
