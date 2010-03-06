// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Copyright 2007 Google, Inc. All Rights Reserved.

/**
 * @fileoverview A utility class for managing editable links.
 *
 */

goog.provide('goog.editor.Link');

goog.require('goog.dom');
goog.require('goog.dom.NodeType');
goog.require('goog.dom.Range');
goog.require('goog.editor.BrowserFeature');
goog.require('goog.editor.node');
goog.require('goog.editor.range');
goog.require('goog.string.Unicode');


/**
 * Wrap an editable link.
 * @param {HTMLAnchorElement} anchor The anchor element.
 * @param {boolean} isNew Whether this is a new link.
 * @constructor
 */
goog.editor.Link = function(anchor, isNew) {
  /**
   * The link DOM element.
   * @type {HTMLAnchorElement}
   * @private
   */
  this.anchor_ = anchor;

  /**
   * Whether this link represents a link just added to the document.
   * @type {boolean}
   * @private
   */
  this.isNew_ = isNew;
};


/**
 * @return {HTMLAnchorElement} The anchor element.
 */
goog.editor.Link.prototype.getAnchor = function() {
  return this.anchor_;
};


/**
 * @return {string} The inner text for the anchor.
 */
goog.editor.Link.prototype.getCurrentText = function() {
  if (!this.currentText_) {
    this.currentText_ = goog.dom.getRawTextContent(this.getAnchor());
  }
  return this.currentText_;
};


/**
 * @return {boolean} Whether the link is new.
 */
goog.editor.Link.prototype.isNew = function() {
  return this.isNew_;
};


/**
 * Set the url without affecting the isNew() status of the link.
 * @param {string} url A URL.
 */
goog.editor.Link.prototype.initializeUrl = function(url) {
  this.getAnchor().href = url;
};


/**
 * Removes the link, leaving its contents in the document.  Note that this
 * object will no longer be usable/useful after this call.
 */
goog.editor.Link.prototype.removeLink = function() {
  goog.dom.flattenElement(this.anchor_);
  this.anchor_ = null;
};


/**
 * Change the link.
 * @param {string} newText New text for the link. If the link contains all its
 *     text in one descendent, newText will only replace the text in that
 *     one node. Otherwise, we'll change the innerHTML of the whole
 *     link to newText.
 * @param {string} newUrl A new URL.
 */
goog.editor.Link.prototype.setTextAndUrl = function(newText, newUrl) {
  var anchor = this.getAnchor();
  anchor.href = newUrl;

  // If the text did not change, don't update link text.
  var currentText = this.getCurrentText();
  if (newText != currentText) {
    var leaf = goog.editor.node.getLeftMostLeaf(anchor);
    if (leaf.nodeType == goog.dom.NodeType.TEXT) {
      leaf = leaf.parentNode;
    }

    if (goog.dom.getRawTextContent(leaf) != currentText) {
      leaf = anchor;
    }

    goog.dom.removeChildren(leaf);

    var domHelper = goog.dom.getDomHelper(leaf);
    goog.dom.appendChild(leaf, domHelper.createTextNode(newText));

    // The text changed, so force getCurrentText to recompute.
    this.currentText_ = null;
  }

  this.isNew_ = false;
};


/**
 * Places the cursor to the right of the anchor.
 * Note that this is different from goog.editor.range's placeCursorNextTo
 * in that it specifically handles the placement of a cursor in browsers
 * that trap you in links, by adding a space when necessary and placing the
 * cursor after that space.
 */
goog.editor.Link.prototype.placeCursorRightOf = function() {
  var anchor = this.getAnchor();
  // If the browser gets stuck in a link if we place the cursor next to it,
  // we'll place the cursor after a space instead.
  if (goog.editor.BrowserFeature.GETS_STUCK_IN_LINKS) {
    var spaceNode;
    var nextSibling = anchor.nextSibling;

    // Check if there is already a space after the link.  Only handle the
    // simple case - the next node is a text node that starts with a space.
    if (nextSibling &&
        nextSibling.nodeType == goog.dom.NodeType.TEXT &&
        (goog.string.startsWith(nextSibling.data, goog.string.Unicode.NBSP) ||
         goog.string.startsWith(nextSibling.data, ' '))) {
      spaceNode = nextSibling;
    } else {
      // If there isn't an obvious space to use, create one after the link.
      var dh = goog.dom.getDomHelper(anchor);
      spaceNode = dh.createTextNode(goog.string.Unicode.NBSP);
      goog.dom.insertSiblingAfter(spaceNode, anchor);
    }

    // Move the selection after the space.
    var range = goog.dom.Range.createCaret(spaceNode, 1);
    range.select();
  } else {
    goog.editor.range.placeCursorNextTo(anchor, false);
  }
};


/**
 * Initialize a new link.
 * @param {HTMLAnchorElement} anchor The anchor element.
 * @param {string} url The initial URL.
 * @param {string} opt_target The target.
 * @return {goog.editor.Link} The link.
 */
goog.editor.Link.createNewLink = function(anchor, url, opt_target) {
  var link = new goog.editor.Link(anchor, true);
  link.initializeUrl(url);

  if (opt_target) {
    anchor.target = opt_target;
  }

  return link;
};
