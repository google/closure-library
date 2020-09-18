/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a fake storage mechanism for testing.
 */

goog.provide('goog.testing.storage.FakeMechanism');
goog.setTestOnly('goog.testing.storage.FakeMechanism');

goog.require('goog.storage.mechanism.IterableMechanism');
goog.require('goog.structs.Map');



/**
 * Creates a fake iterable mechanism.
 *
 * @constructor
 * @extends {goog.storage.mechanism.IterableMechanism}
 * @final
 */
goog.testing.storage.FakeMechanism = function() {
  'use strict';
  /**
   * @type {goog.structs.Map}
   * @private
   */
  this.storage_ = new goog.structs.Map();
};
goog.inherits(
    goog.testing.storage.FakeMechanism,
    goog.storage.mechanism.IterableMechanism);


/** @override */
goog.testing.storage.FakeMechanism.prototype.set = function(key, value) {
  'use strict';
  this.storage_.set(key, value);
};


/** @override */
goog.testing.storage.FakeMechanism.prototype.get = function(key) {
  'use strict';
  return /** @type {?string} */ (
      this.storage_.get(key, null /* default value */));
};


/** @override */
goog.testing.storage.FakeMechanism.prototype.remove = function(key) {
  'use strict';
  this.storage_.remove(key);
};


/** @override */
goog.testing.storage.FakeMechanism.prototype.__iterator__ = function(opt_keys) {
  'use strict';
  return this.storage_.__iterator__(opt_keys);
};
