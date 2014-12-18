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
 */

goog.module('goog.labs.iterable');


/**
 * Call a function with every value of an iterable.
 *
 * Warning: this function will never halt if given an iterable that
 * is never exhausted.
 *
 * @param {!function(this: THIS, VALUE): void} f
 * @param {!Iterable<VALUE>} iterable
 * @param {THIS=} opt_obj The object to be used as the value of 'this' within f.
 * @template THIS,VALUE
 */
exports.forEach = function(f, iterable, opt_obj) {
  while (true) {
    var next = iterable.next();
    if (next.done) {
      return;
    }
    f.call(opt_obj, next.value);
  }
};
