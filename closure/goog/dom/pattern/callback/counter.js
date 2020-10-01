/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Callback object that counts matches.
 */

goog.provide('goog.dom.pattern.callback.Counter');



/**
 * Callback class for counting matches.
 * @constructor
 * @final
 */
goog.dom.pattern.callback.Counter = function() {
  'use strict';
  /**
   * The count of objects matched so far.
   *
   * @type {number}
   */
  this.count = 0;

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
goog.dom.pattern.callback.Counter.prototype.getCallback = function() {
  'use strict';
  if (!this.callback_) {
    this.callback_ = goog.bind(function() {
      'use strict';
      this.count++;
      return false;
    }, this);
  }
  return this.callback_;
};


/**
 * Reset the counter.
 */
goog.dom.pattern.callback.Counter.prototype.reset = function() {
  'use strict';
  this.count = 0;
};
