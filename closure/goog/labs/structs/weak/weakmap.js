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
 * @fileoverview Datastructure: Weak Map.
 *
 */

goog.provide('goog.labs.structs.WeakMap');

goog.require('goog.asserts');
goog.require('goog.labs.structs.weak');


/**
 * Class for weak map datastructure. A weak map is like a map, except its keys
 * are not enumerable, and key-value pairs can be garbage collected if there are
 * no other references to them. Keys must be extensible objects, not primitives
 * or non-extensible objects (no freeze/seal/preventExtensions).
 *
 * IMPORTANT CAVEAT: On browsers that do not provide a native WeakMap
 * implementation, this data structure is only partially weak, and CAN LEAK
 * MEMORY. Specifically, if a key is no longer held, the key-value pair can be
 * garbage collected; however, if a key is still held when the Map is no longer
 * held, the value (and some metadata) may not get collected.
 *
 * RECOMMENDATIONS: If the lifetime of the Map is expected to be shorter than
 * that of its keys, the keys should be explicitly removed when they are
 * disposed. If this is not possible, this library may be inappopriate for the
 * application.
 *
 * BROWSER COMPATIBILITY: This library is compatible with browsers with a
 * correct implementation of Object.defineProperty (IE9+, FF4+, SF5.1+, CH5+,
 * OP12+, etc). The Map constructor will fail on unsupported browsers.
 * @see goog.labs.structs.weak.SUPPORTED_BROWSER
 * @see http://kangax.github.io/compat-table/es5/#Object.defineProperty
 *
 * @final @struct @constructor
 * @template K, V
 */
// TODO(user): Accept initializer arguments.
goog.labs.structs.WeakMap = goog.labs.structs.weak.USE_NATIVE_WEAKMAP ?
    function() {
      /** @private @const */
      this.weakMap_ = new goog.global['WeakMap'];
      // TODO(user): unquote WeakMap when ES6 is final and added to externs.
    } :
    function() {
      goog.asserts.assert(goog.labs.structs.weak.SUPPORTED_BROWSER,
                          'Browser does not support weak map shim');

      /** @private @const */
      this.id_ = goog.labs.structs.weak.generateId();
    };


/**
 * Adds a key-value pair to the map.
 * @param {K} key The key.
 * @param {V} value The value to add.
 * @this {!goog.labs.structs.WeakMap}
 */
goog.labs.structs.WeakMap.prototype.set =
    goog.labs.structs.weak.USE_NATIVE_WEAKMAP ?
    function(key, value) {
      goog.labs.structs.weak.checkKeyType(key);
      this.weakMap_.set(key, value);
    } :
    function(key, value) {
      goog.labs.structs.weak.set(this.id_, key, value);
    };


/**
 * Returns the value for the given key. If the key is not found and the default
 * value is not given this will return {@code undefined}.
 * @param {K} key The key to get the value for.
 * @param {DEFAULT=} opt_val The value to return if no item is found for the
 * given key, defaults to undefined.
 * @return {V|DEFAULT}
 * @template DEFAULT
 */
goog.labs.structs.WeakMap.prototype.get = function(key, opt_val) {
  return this.containsKey(key) ? this.get_(key) : opt_val;
};


/**
 * Returns the value for the given key, or undefined. Helper for get.
 * @param {K} key The key to get the value for.
 * @return {V|undefined}
 * @private
 * @this {!goog.labs.structs.WeakMap}
 */
goog.labs.structs.WeakMap.prototype.get_ =
    goog.labs.structs.weak.USE_NATIVE_WEAKMAP ?
    function(key) {
      return this.weakMap_.get(key);
    } :
    function(key) {
      return key.hasOwnProperty(goog.labs.structs.weak.WEAKREFS_PROPERTY_NAME) ?
          key[goog.labs.structs.weak.WEAKREFS_PROPERTY_NAME][this.id_] :
          undefined;
    };


/**
 * Tests whether the map contains the given key.
 * @param {K} key The key to check for.
 * @return {boolean}
 * @this {!goog.labs.structs.WeakMap}
 */
goog.labs.structs.WeakMap.prototype.containsKey =
    goog.labs.structs.weak.USE_NATIVE_WEAKMAP ?
    function(key) {
      goog.labs.structs.weak.checkKeyType(key);
      return this.weakMap_.has(key);
    } :
    function(key) {
      return goog.labs.structs.weak.has(this.id_, key);
    };


/**
 * Removes a key-value pair based on the key.
 * @param {K} key The key to remove.
 * @return {boolean} Whether object was removed.
 * @this {!goog.labs.structs.WeakMap}
 */
goog.labs.structs.WeakMap.prototype.remove =
    goog.labs.structs.weak.USE_NATIVE_WEAKMAP ?
    function(key) {
      goog.labs.structs.weak.checkKeyType(key);
      // quoted delete to compile as ES3
      return this.weakMap_['delete'](key);
    } :
    function(key) {
      return goog.labs.structs.weak.remove(this.id_, key);
    };
