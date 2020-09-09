/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview DOM pattern to match a sequence of other patterns.
 */

goog.provide('goog.dom.pattern.Sequence');

goog.require('goog.dom.NodeType');
goog.require('goog.dom.pattern');
goog.require('goog.dom.pattern.AbstractPattern');
goog.require('goog.dom.pattern.MatchType');
goog.requireType('goog.dom.TagWalkType');



/**
 * Pattern object that matches a sequence of other patterns.
 *
 * @param {Array<goog.dom.pattern.AbstractPattern>} patterns Ordered array of
 *     patterns to match.
 * @param {boolean=} opt_ignoreWhitespace Optional flag to ignore text nodes
 *     consisting entirely of whitespace.  The default is to not ignore them.
 * @constructor
 * @extends {goog.dom.pattern.AbstractPattern}
 * @final
 */
goog.dom.pattern.Sequence = function(patterns, opt_ignoreWhitespace) {
  'use strict';
  /**
   * Ordered array of patterns to match.
   *
   * @type {Array<goog.dom.pattern.AbstractPattern>}
   */
  this.patterns = patterns;

  /**
   * Whether or not to ignore whitespace only Text nodes.
   *
   * @private {boolean}
   */
  this.ignoreWhitespace_ = !!opt_ignoreWhitespace;

  /**
   * Position in the patterns array we have reached by successful matches.
   *
   * @private {number}
   */
  this.currentPosition_ = 0;
};
goog.inherits(goog.dom.pattern.Sequence, goog.dom.pattern.AbstractPattern);


/**
 * Regular expression for breaking text nodes.
 * @private {!RegExp}
 */
goog.dom.pattern.Sequence.BREAKING_TEXTNODE_RE_ = /^\s*$/;


/**
 * Test whether the given token starts, continues, or finishes the sequence
 * of patterns given in the constructor.
 *
 * @param {Node} token Token to match against.
 * @param {goog.dom.TagWalkType} type The type of token.
 * @return {goog.dom.pattern.MatchType} <code>MATCH</code> if the pattern
 *     matches, <code>MATCHING</code> if the pattern starts a match, and
 *     <code>NO_MATCH</code> if the pattern does not match.
 * @override
 */
goog.dom.pattern.Sequence.prototype.matchToken = function(token, type) {
  'use strict';
  // If the option is set, ignore any whitespace only text nodes
  if (this.ignoreWhitespace_ && token.nodeType == goog.dom.NodeType.TEXT &&
      goog.dom.pattern.Sequence.BREAKING_TEXTNODE_RE_.test(token.nodeValue)) {
    return goog.dom.pattern.MatchType.MATCHING;
  }

  switch (this.patterns[this.currentPosition_].matchToken(token, type)) {
    case goog.dom.pattern.MatchType.MATCH:
      // Record the first token we match.
      if (this.currentPosition_ == 0) {
        this.matchedNode = token;
      }

      // Move forward one position.
      this.currentPosition_++;

      // Check if this is the last position.
      if (this.currentPosition_ == this.patterns.length) {
        this.reset();
        return goog.dom.pattern.MatchType.MATCH;
      } else {
        return goog.dom.pattern.MatchType.MATCHING;
      }

    case goog.dom.pattern.MatchType.MATCHING:
      // This can happen when our child pattern is a sequence or a repetition.
      return goog.dom.pattern.MatchType.MATCHING;

    case goog.dom.pattern.MatchType.BACKTRACK_MATCH:
      // This means a repetitive match succeeded 1 token ago.
      // TODO(robbyw): Backtrack further if necessary.
      this.currentPosition_++;

      if (this.currentPosition_ == this.patterns.length) {
        this.reset();
        return goog.dom.pattern.MatchType.BACKTRACK_MATCH;
      } else {
        // Retry the same token on the next pattern.
        return this.matchToken(token, type);
      }

    default:
      this.reset();
      return goog.dom.pattern.MatchType.NO_MATCH;
  }
};


/**
 * Reset any internal state this pattern keeps.
 * @override
 */
goog.dom.pattern.Sequence.prototype.reset = function() {
  'use strict';
  if (this.patterns[this.currentPosition_]) {
    this.patterns[this.currentPosition_].reset();
  }
  this.currentPosition_ = 0;
};
