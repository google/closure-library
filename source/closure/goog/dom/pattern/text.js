/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview DOM pattern to match a text node.
 */

goog.provide('goog.dom.pattern.Text');

goog.require('goog.dom.NodeType');
goog.require('goog.dom.pattern');
goog.require('goog.dom.pattern.AbstractPattern');
goog.require('goog.dom.pattern.MatchType');
goog.requireType('goog.dom.TagWalkType');



/**
 * Pattern object that matches text by exact matching or regular expressions.
 *
 * @param {string|RegExp} match String or regular expression to match against.
 * @constructor
 * @extends {goog.dom.pattern.AbstractPattern}
 * @final
 */
goog.dom.pattern.Text = function(match) {
  'use strict';
  /**
   * The text or regular expression to match.
   *
   * @private {string|RegExp}
   */
  this.match_ = match;
};
goog.inherits(goog.dom.pattern.Text, goog.dom.pattern.AbstractPattern);


/**
 * Test whether the given token is a text token which matches the string or
 * regular expression provided in the constructor.
 *
 * @param {Node} token Token to match against.
 * @param {goog.dom.TagWalkType} type The type of token.
 * @return {goog.dom.pattern.MatchType} <code>MATCH</code> if the pattern
 *     matches, <code>NO_MATCH</code> otherwise.
 * @override
 */
goog.dom.pattern.Text.prototype.matchToken = function(token, type) {
  'use strict';
  if (token.nodeType == goog.dom.NodeType.TEXT &&
      goog.dom.pattern.matchStringOrRegex(this.match_, token.nodeValue)) {
    this.matchedNode = token;
    return goog.dom.pattern.MatchType.MATCH;
  }

  return goog.dom.pattern.MatchType.NO_MATCH;
};
