/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Set operations for ES6 Sets.
 *
 * See design doc at go/closure-es6-set
 */

goog.module('goog.collections.sets');

const iterables = goog.require('goog.labs.collections.iterables');

// Note: Set operations are being proposed for EcmaScript. See proposal here:
// https://github.com/tc39/proposal-set-methods

// When these methods become available in JS engines, they should be used in
// place of these utility methods and these methods will be deprecated.
// Call sites can be automatically migrated. For example,
// "iterables.filter(a, b)" becomes "a.filter(b)".

/**
 * Creates a new set containing the elements that appear in both given
 * collections.
 *
 * @param {!Set<T>} a
 * @param {!Iterable<T>} b
 * @returns {!Set<T>}
 * @template T
 */
exports.intersection = function(a, b) {
  return new Set(iterables.filter(b, elem => a.has(elem)));
};

/**
 * Creates a new set containing the elements that appear in both given
 * collections.
 *
 * @param {!Set<T>} a
 * @param {!Iterable<T>} b
 * @return {!Set<T>}
 * @template T
 */
exports.union = function(a, b) {
  const set = new Set(a);
  iterables.forEach(b, elem => set.add(elem));
  return set;
};


/**
 * Creates a new set containing the elements that appear in the first collection
 * but not in the second.
 *
 * @param {!Set<T>} a
 * @param {!Iterable<T>} b
 * @return {!Set<T>}
 * @template T
 */
exports.difference = function(a, b) {
  const set = new Set(a);
  iterables.forEach(b, elem => set.delete(elem));
  return set;
};

/**
 * Creates a new set containing the elements that appear in a or b but not
 * both.
 *
 * @param {!Set<T>} a
 * @param {!Set<T>} b
 * @return {!Set<T>}
 * @template T
 */
// TODO(nnaze): Consider widening the type of b per discussion in
// https://github.com/tc39/proposal-set-methods/issues/56
exports.symmetricDifference = function(a, b) {
  const newSet = new Set(a);
  for (const elem of b) {
    if (a.has(elem)) {
      newSet.delete(elem);
    } else {
      newSet.add(elem);
    }
  }
  return newSet;
};

// TODO(nnaze): Add additional methods from
// https://github.com/tc39/proposal-set-methods as needed.
