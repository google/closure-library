/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Callback object that tests if a pattern matches at least once.
 */

goog.provide('goog.dom.pattern.callback.Test');

goog.require('goog.iter.StopIteration');



/**
 * Callback class for testing for at least one match.
 * @constructor
 * @final
 */
goog.dom.pattern.callback.Test = function() {
  'use strict';
  /**
   * Whether or not the pattern matched.
   *
   * @type {boolean}
   */
  this.matched = false;

  /**
   * The callback function.  Suitable as a callback for
   * {@link goog.dom.pattern.Matcher}.
   * @private {?Function}
   */
  this.callback_ = null;
};


/**
 * Get a bound callback function that is suitable as a callback for
 * {@link goog.dom.pattern.Matcher}.
 *
 * @return {!Function} A callback function.
 */
goog.dom.pattern.callback.Test.prototype.getCallback = function() {
  'use strict';
  if (!this.callback_) {
    this.callback_ = goog.bind(function(node, position) {
      'use strict';
      // Mark our match.
      this.matched = true;

      // Stop searching.
      throw goog.iter.StopIteration;
    }, this);
  }
  return this.callback_;
};


/**
 * Reset the counter.
 */
goog.dom.pattern.callback.Test.prototype.reset = function() {
  'use strict';
  this.matched = false;
};
