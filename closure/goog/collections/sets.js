// Copyright 2019 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Set operations for ES6 Sets.
 *
 * See design doc at go/closure-es6-set
 */

goog.module('goog.collections.sets');

const iterable = goog.require('goog.labs.iterable');

// Note: Set operations are being proposed for EcmaScript. See proposal here:
// https://github.com/tc39/proposal-set-methods

// When these methods become available in JS engines, they should be used in
// place of these utility methods and these methods will be deprecated.
// Call sites can be automatically migrated. For example,
// "iterable.filter(a, b)" becomes "a.filter(b)".

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
  return new Set(iterable.filter(elem => a.has(elem), b));
};

// TODO(b/117771144): Implement union, difference, and symmetricDifference.
