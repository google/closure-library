/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for working with ES6 iterables.
 *
 * The goal is that this should be a replacement for goog.iter which uses
 * a now non-standard approach to iterables.
 *
 * @see https://goo.gl/Rok5YQ
 */

goog.module('goog.labs.collections.iters');


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
 * @param {!Iterable<VALUE>} iterable
 * @param {function(VALUE) : *} f
 * @template VALUE
 */
exports.forEach = function(iterable, f) {
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
 * @param {!Iterable<VALUE>} iterable
 * @param {function(this: THIS, VALUE): RESULT} f
 * @return {!Iterable<RESULT>} The created iterable that gives the mapped
 *     values.
 * @template THIS, VALUE, RESULT
 */
exports.map = function*(iterable, f) {
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
 * @param {!Iterable<VALUE>} iterable
 * @param {function(VALUE): boolean} f
 * @return {!Iterable<VALUE>} The created iterable that gives the mapped
 *     values.
 * @template VALUE
 */
exports.filter = function*(iterable, f) {
  for (const elem of iterable) {
    if (f(elem)) {
      yield elem;
    }
  }
};


/**
 * @template T
 * @implements {IteratorIterable<T>}
 */
class ConcatIterator {
  /** @param {!Array<!Iterator<T>>} iterators */
  constructor(iterators) {
    /** @private @const {!Array<!Iterator<T>>} */
    this.iterators_ = iterators;

    /** @private {number} */
    this.iterIndex_ = 0;
  }

  [Symbol.iterator]() {
    return this;
  }

  /** @override */
  next() {
    while (this.iterIndex_ < this.iterators_.length) {
      const result = this.iterators_[this.iterIndex_].next();
      if (!result.done) {
        return result;
      }
      this.iterIndex_++;
    }
    return /** @type {!IIterableResult<T>} */ ({done: true});
  }
}


/**
 * Concatenates multiple iterators to create a new iterable.
 *
 * When next() is called on the return iterator, it will call next() on the
 * current passed iterator. When the current passed iterator is exhausted, it
 * will move on to the next iterator until there are no more left.
 *
 * All generator return values will be ignored (i.e. when childIter.next()
 * returns {done: true, value: notUndefined} it will be treated as just
 * {done: true}).
 *
 * @param {...!Iterable<VALUE>} iterables
 * @return {!IteratorIterable<VALUE>}
 * @template VALUE
 */
exports.concat = function(...iterables) {
  return new ConcatIterator(iterables.map(exports.getIterator));
};
