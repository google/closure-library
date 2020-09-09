/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview DOM pattern base class.
 */

goog.provide('goog.dom.pattern.AbstractPattern');

goog.require('goog.dom.TagWalkType');
goog.require('goog.dom.pattern.MatchType');



/**
 * Base pattern class for DOM matching.
 *
 * @constructor
 */
goog.dom.pattern.AbstractPattern = function() {
  'use strict';
  /**
   * The first node matched by this pattern.
   * @type {?Node}
   */
  this.matchedNode = null;
};


/**
 * Reset any internal state this pattern keeps.
 */
goog.dom.pattern.AbstractPattern.prototype.reset = function() {
  // The base implementation does nothing.
};


/**
 * Test whether this pattern matches the given token.
 *
 * @param {Node} token Token to match against.
 * @param {goog.dom.TagWalkType} type The type of token.
 * @return {goog.dom.pattern.MatchType} `MATCH` if the pattern matches.
 */
goog.dom.pattern.AbstractPattern.prototype.matchToken = function(token, type) {
  'use strict';
  return goog.dom.pattern.MatchType.NO_MATCH;
};
