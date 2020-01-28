/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wraps an iterable storage mechanism and creates artificial
 * namespaces using a prefix in the global namespace.
 */

goog.provide('goog.storage.mechanism.PrefixedMechanism');

goog.require('goog.iter.Iterator');
goog.require('goog.storage.mechanism.IterableMechanism');



/**
 * Wraps an iterable storage mechanism and creates artificial namespaces.
 *
 * @param {!goog.storage.mechanism.IterableMechanism} mechanism Underlying
 *     iterable storage mechanism.
 * @param {string} prefix Prefix for creating an artificial namespace.
 * @constructor
 * @struct
 * @extends {goog.storage.mechanism.IterableMechanism}
 * @final
 */
goog.storage.mechanism.PrefixedMechanism = function(mechanism, prefix) {
  goog.storage.mechanism.PrefixedMechanism.base(this, 'constructor');
  /**
   * The mechanism to be prefixed.
   *
   * @private {goog.storage.mechanism.IterableMechanism}
   */
  this.mechanism_ = mechanism;

  /**
   * The prefix for creating artificial namespaces.
   *
   * @private {string}
   */
  this.prefix_ = prefix + '::';
};
goog.inherits(
    goog.storage.mechanism.PrefixedMechanism,
    goog.storage.mechanism.IterableMechanism);


/** @override */
goog.storage.mechanism.PrefixedMechanism.prototype.set = function(key, value) {
  this.mechanism_.set(this.prefix_ + key, value);
};


/** @override */
goog.storage.mechanism.PrefixedMechanism.prototype.get = function(key) {
  return this.mechanism_.get(this.prefix_ + key);
};


/** @override */
goog.storage.mechanism.PrefixedMechanism.prototype.remove = function(key) {
  this.mechanism_.remove(this.prefix_ + key);
};


/** @override */
goog.storage.mechanism.PrefixedMechanism.prototype.__iterator__ = function(
    opt_keys) {
  var subIter = this.mechanism_.__iterator__(true);
  var selfObj = this;
  var newIter = new goog.iter.Iterator();
  newIter.next = function() {
    var key = /** @type {string} */ (subIter.next());
    while (key.substr(0, selfObj.prefix_.length) != selfObj.prefix_) {
      key = /** @type {string} */ (subIter.next());
    }
    return opt_keys ? key.substr(selfObj.prefix_.length) :
                      selfObj.mechanism_.get(key);
  };
  return newIter;
};
