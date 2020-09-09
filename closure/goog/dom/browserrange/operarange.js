/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the Opera specific range wrapper.  Inherits most
 * functionality from W3CRange, but adds exceptions as necessary.
 *
 * DO NOT USE THIS FILE DIRECTLY.  Use goog.dom.Range instead.
 */


goog.provide('goog.dom.browserrange.OperaRange');

goog.require('goog.dom.browserrange.W3cRange');



/**
 * The constructor for Opera specific browser ranges.
 * @param {Range} range The range object.
 * @constructor
 * @extends {goog.dom.browserrange.W3cRange}
 * @final
 */
goog.dom.browserrange.OperaRange = function(range) {
  'use strict';
  goog.dom.browserrange.W3cRange.call(this, range);
};
goog.inherits(goog.dom.browserrange.OperaRange, goog.dom.browserrange.W3cRange);


/**
 * Creates a range object that selects the given node's text.
 * @param {Node} node The node to select.
 * @return {!goog.dom.browserrange.OperaRange} A Opera range wrapper object.
 */
goog.dom.browserrange.OperaRange.createFromNodeContents = function(node) {
  'use strict';
  return new goog.dom.browserrange.OperaRange(
      goog.dom.browserrange.W3cRange.getBrowserRangeForNode(node));
};


/**
 * Creates a range object that selects between the given nodes.
 * @param {Node} startNode The node to start with.
 * @param {number} startOffset The offset within the node to start.
 * @param {Node} endNode The node to end with.
 * @param {number} endOffset The offset within the node to end.
 * @return {!goog.dom.browserrange.OperaRange} A wrapper object.
 */
goog.dom.browserrange.OperaRange.createFromNodes = function(
    startNode, startOffset, endNode, endOffset) {
  'use strict';
  return new goog.dom.browserrange.OperaRange(
      goog.dom.browserrange.W3cRange.getBrowserRangeForNodes(
          startNode, startOffset, endNode, endOffset));
};


/** @override */
goog.dom.browserrange.OperaRange.prototype.selectInternal = function(
    selection, reversed) {
  'use strict';
  // Avoid using addRange as we have to removeAllRanges first, which
  // blurs editable fields in Opera.
  selection.collapse(this.getStartNode(), this.getStartOffset());
  if (this.getEndNode() != this.getStartNode() ||
      this.getEndOffset() != this.getStartOffset()) {
    selection.extend(this.getEndNode(), this.getEndOffset());
  }
  // This can happen if the range isn't in an editable field.
  if (selection.rangeCount == 0) {
    selection.addRange(this.range_);
  }
};
