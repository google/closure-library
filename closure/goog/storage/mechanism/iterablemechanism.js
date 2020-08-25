/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Interface for storing, retieving and scanning data using some
 * persistence mechanism.
 */

goog.provide('goog.storage.mechanism.IterableMechanism');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.iter');
goog.require('goog.storage.mechanism.Mechanism');



/**
 * Interface for all iterable storage mechanisms.
 *
 * @constructor
 * @struct
 * @extends {goog.storage.mechanism.Mechanism}
 * @abstract
 */
goog.storage.mechanism.IterableMechanism = function() {
  'use strict';
  goog.storage.mechanism.IterableMechanism.base(this, 'constructor');
};
goog.inherits(
    goog.storage.mechanism.IterableMechanism, goog.storage.mechanism.Mechanism);


/**
 * Get the number of stored key-value pairs.
 *
 * Could be overridden in a subclass, as the default implementation is not very
 * efficient - it iterates over all keys.
 *
 * @return {number} Number of stored elements.
 */
goog.storage.mechanism.IterableMechanism.prototype.getCount = function() {
  'use strict';
  var count = 0;
  goog.iter.forEach(this.__iterator__(true), function(key) {
    'use strict';
    goog.asserts.assertString(key);
    count++;
  });
  return count;
};


/**
 * Returns an iterator that iterates over the elements in the storage. Will
 * throw goog.iter.StopIteration after the last element.
 *
 * @param {boolean=} opt_keys True to iterate over the keys. False to iterate
 *     over the values.  The default value is false.
 * @return {!goog.iter.Iterator} The iterator.
 */
goog.storage.mechanism.IterableMechanism.prototype.__iterator__ =
    goog.abstractMethod;


/**
 * Remove all key-value pairs.
 *
 * Could be overridden in a subclass, as the default implementation is not very
 * efficient - it iterates over all keys.
 */
goog.storage.mechanism.IterableMechanism.prototype.clear = function() {
  'use strict';
  // This converts the keys to an array first because otherwise
  // removing while iterating results in unstable ordering of keys and
  // can skip keys or terminate early.
  var keys = goog.iter.toArray(this.__iterator__(true));
  var selfObj = this;
  goog.array.forEach(keys, function(key) {
    'use strict';
    selfObj.remove(key);
  });
};
