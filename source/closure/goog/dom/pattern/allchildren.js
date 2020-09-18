/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview DOM pattern to match any children of a tag.
 */

goog.provide('goog.dom.pattern.AllChildren');

goog.require('goog.dom.pattern.AbstractPattern');
goog.require('goog.dom.pattern.MatchType');
goog.requireType('goog.dom.TagWalkType');



/**
 * Pattern object that matches any nodes at or below the current tree depth.
 *
 * @constructor
 * @extends {goog.dom.pattern.AbstractPattern}
 */
goog.dom.pattern.AllChildren = function() {
  'use strict';
  /**
   * Tracks the matcher's depth to detect the end of the tag.
   *
   * @private {number}
   */
  this.depth_ = 0;
};
goog.inherits(goog.dom.pattern.AllChildren, goog.dom.pattern.AbstractPattern);


/**
 * Test whether the given token is on the same level.
 *
 * @param {Node} token Token to match against.
 * @param {goog.dom.TagWalkType} type The type of token.
 * @return {goog.dom.pattern.MatchType} `MATCHING` if the token is on the
 *     same level or deeper and `BACKTRACK_MATCH` if not.
 * @override
 */
goog.dom.pattern.AllChildren.prototype.matchToken = function(token, type) {
  'use strict';
  this.depth_ += type;

  if (this.depth_ >= 0) {
    return goog.dom.pattern.MatchType.MATCHING;
  } else {
    this.depth_ = 0;
    return goog.dom.pattern.MatchType.BACKTRACK_MATCH;
  }
};


/**
 * Reset any internal state this pattern keeps.
 * @override
 */
goog.dom.pattern.AllChildren.prototype.reset = function() {
  'use strict';
  this.depth_ = 0;
};
