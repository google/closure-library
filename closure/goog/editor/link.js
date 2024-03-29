/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A utility class for managing editable links.
 */

goog.provide('goog.editor.Link');

goog.require('goog.dom');
goog.require('goog.dom.NodeType');
goog.require('goog.dom.TagName');
goog.require('goog.editor.Command');
goog.require('goog.editor.Field');
goog.require('goog.editor.node');
goog.require('goog.editor.range');
goog.require('goog.string');
goog.require('goog.uri.utils');
goog.require('goog.uri.utils.ComponentIndex');



/**
 * Wrap an editable link.
 * @param {HTMLAnchorElement} anchor The anchor element.
 * @param {boolean} isNew Whether this is a new link.
 * @constructor
 * @final
 */
goog.editor.Link = function(anchor, isNew) {
  'use strict';
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


  /**
   * Any extra anchors created by the browser from a selection in the same
   * operation that created the primary link
   * @type {!Array<HTMLAnchorElement>}
   * @private
   */
  this.extraAnchors_ = [];
};


/**
 * @return {HTMLAnchorElement} The anchor element.
 */
goog.editor.Link.prototype.getAnchor = function() {
  'use strict';
  return this.anchor_;
};


/**
 * @return {!Array<HTMLAnchorElement>} The extra anchor elements, if any,
 *     created by the browser from a selection.
 */
goog.editor.Link.prototype.getExtraAnchors = function() {
  'use strict';
  return this.extraAnchors_;
};


/**
 * @return {string} The inner text for the anchor.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
goog.editor.Link.prototype.getCurrentText = function() {
  'use strict';
  if (!this.currentText_) {
    var anchor = this.getAnchor();

    var leaf = goog.editor.node.getLeftMostLeaf(anchor);
    if (leaf.tagName && leaf.tagName == goog.dom.TagName.IMG) {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      this.currentText_ = leaf.getAttribute('alt') || '';
    } else {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      this.currentText_ = goog.dom.getRawTextContent(this.getAnchor());
    }
  }
  return this.currentText_;
};


/**
 * @return {boolean} Whether the link is new.
 */
goog.editor.Link.prototype.isNew = function() {
  'use strict';
  return this.isNew_;
};


/**
 * Set the url without affecting the isNew() status of the link.
 * @param {string} url A URL.
 */
goog.editor.Link.prototype.initializeUrl = function(url) {
  'use strict';
  this.getAnchor().href = url;
};


/**
 * Removes the link, leaving its contents in the document.  Note that this
 * object will no longer be usable/useful after this call.
 */
goog.editor.Link.prototype.removeLink = function() {
  'use strict';
  goog.dom.flattenElement(this.anchor_);
  this.anchor_ = null;
  while (this.extraAnchors_.length) {
    goog.dom.flattenElement(/** @type {Element} */ (this.extraAnchors_.pop()));
  }
};


/**
 * Change the link.
 * @param {string} newText New text for the link. If the link contains all its
 *     text in one descendant, newText will only replace the text in that
 *     one node. Otherwise, we'll change the innerHTML of the whole
 *     link to newText.
 * @param {string} newUrl A new URL.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
goog.editor.Link.prototype.setTextAndUrl = function(newText, newUrl) {
  'use strict';
  var anchor = this.getAnchor();
  anchor.href = newUrl;

  // If the text did not change, don't update link text.
  var currentText = this.getCurrentText();
  if (newText != currentText) {
    var leaf = goog.editor.node.getLeftMostLeaf(anchor);

    if (leaf.tagName && leaf.tagName == goog.dom.TagName.IMG) {
      leaf.setAttribute('alt', newText ? newText : '');
    } else {
      if (leaf.nodeType == goog.dom.NodeType.TEXT) {
        leaf = leaf.parentNode;
      }

      if (goog.dom.getRawTextContent(leaf) != currentText) {
        leaf = anchor;
      }

      goog.dom.removeChildren(leaf);
      var domHelper = goog.dom.getDomHelper(leaf);
      goog.dom.appendChild(leaf, domHelper.createTextNode(newText));
    }

    // The text changed, so force getCurrentText to recompute.
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
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
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
goog.editor.Link.prototype.placeCursorRightOf = function() {
  'use strict';
  goog.editor.range.placeCursorNextTo(this.getAnchor(), false);
};


/**
 * Updates the cursor position and link bubble for this link.
 * @param {goog.editor.Field} field The field in which the link is created.
 * @param {string} url The link url.
 * @private
 */
goog.editor.Link.prototype.updateLinkDisplay_ = function(field, url) {
  'use strict';
  this.initializeUrl(url);
  this.placeCursorRightOf();
  field.execCommand(goog.editor.Command.UPDATE_LINK_BUBBLE);
};


/**
 * @return {string?} The modified string for the link if the link
 *     text appears to be a valid link. Returns null if this is not
 *     a valid link address.
 */
goog.editor.Link.prototype.getValidLinkFromText = function() {
  'use strict';
  var text = goog.string.trim(this.getCurrentText());
  if (goog.editor.Link.isLikelyUrl(text)) {
    if (text.search(/:/) < 0) {
      return 'http://' + goog.string.trimLeft(text);
    }
    return text;
  } else if (goog.editor.Link.isLikelyEmailAddress(text)) {
    return 'mailto:' + text;
  }
  return null;
};


/**
 * After link creation, finish creating the link depending on the type
 * of link being created.
 * @param {goog.editor.Field} field The field where this link is being created.
 */
goog.editor.Link.prototype.finishLinkCreation = function(field) {
  'use strict';
  var linkFromText = this.getValidLinkFromText();
  if (linkFromText) {
    this.updateLinkDisplay_(field, linkFromText);
  } else {
    field.execCommand(goog.editor.Command.MODAL_LINK_EDITOR, this);
  }
};


/**
 * Initialize a new link.
 * @param {HTMLAnchorElement} anchor The anchor element.
 * @param {string} url The initial URL.
 * @param {string=} opt_target The target.
 * @param {Array<HTMLAnchorElement>=} opt_extraAnchors Extra anchors created
 *     by the browser when parsing a selection.
 * @return {!goog.editor.Link} The link.
 */
goog.editor.Link.createNewLink = function(
    anchor, url, opt_target, opt_extraAnchors) {
  'use strict';
  var link = new goog.editor.Link(anchor, true);
  link.initializeUrl(url);

  if (opt_target) {
    anchor.target = opt_target;
  }
  if (opt_extraAnchors) {
    link.extraAnchors_ = opt_extraAnchors;
  }

  return link;
};


/**
 * Initialize a new link using text in anchor, or empty string if there is no
 * likely url in the anchor.
 * @param {HTMLAnchorElement} anchor The anchor element with likely url content.
 * @param {string=} opt_target The target.
 * @return {!goog.editor.Link} The link.
 */
goog.editor.Link.createNewLinkFromText = function(anchor, opt_target) {
  'use strict';
  var link = new goog.editor.Link(anchor, true);
  var text = link.getValidLinkFromText();
  link.initializeUrl(text ? text : '');
  if (opt_target) {
    anchor.target = opt_target;
  }
  return link;
};


/**
 * Returns true if str could be a URL, false otherwise
 *
 * Ex: TR_Util.isLikelyUrl_("http://www.google.com") == true
 *     TR_Util.isLikelyUrl_("www.google.com") == true
 *
 * @param {string} str String to check if it looks like a URL.
 * @return {boolean} Whether str could be a URL.
 */
goog.editor.Link.isLikelyUrl = function(str) {
  'use strict';
  // Whitespace means this isn't a domain.
  if (/\s/.test(str)) {
    return false;
  }

  if (goog.editor.Link.isLikelyEmailAddress(str)) {
    return false;
  }

  // Add a scheme if the url doesn't have one - this helps the parser.
  var addedScheme = false;
  if (!/^[^:\/?#.]+:/.test(str)) {
    str = 'http://' + str;
    addedScheme = true;
  }

  // Parse the domain.
  var parts = goog.uri.utils.split(str);

  // Relax the rules for special schemes.
  var scheme = parts[goog.uri.utils.ComponentIndex.SCHEME];
  if (['mailto', 'aim'].indexOf(scheme) != -1) {
    return true;
  }

  // Require domains to contain a '.', unless the domain is fully qualified and
  // forbids domains from containing invalid characters.
  var domain = parts[goog.uri.utils.ComponentIndex.DOMAIN];
  if (!domain ||
      (addedScheme && (domain.indexOf('.') === -1 || domain.length < 3)) ||
      (/[^\w\d\-\u0100-\uffff.%]/.test(domain))) {
    return false;
  }

  // Require http and ftp paths to start with '/'.
  var path = parts[goog.uri.utils.ComponentIndex.PATH];
  return !path || path.indexOf('/') == 0;
};


/**
 * Regular expression that matches strings that could be an email address.
 * @type {RegExp}
 * @private
 */
goog.editor.Link.LIKELY_EMAIL_ADDRESS_ = new RegExp(
    '^' +                         // Test from start of string
        '[\\w-]+(\\.[\\w-]+)*' +  // Dot-delimited alphanumerics and dashes
                                  // (name)
        '\\@' +                   // @
        '([\\w-]+\\.)+' +         // Alphanumerics, dashes and dots (domain)
        '(\\d+|\\w\\w+)$',  // Domain ends in at least one number or 2 letters
    'i');


/**
 * Returns true if str could be an email address, false otherwise
 *
 * Ex: goog.editor.Link.isLikelyEmailAddress_("some word") == false
 *     goog.editor.Link.isLikelyEmailAddress_("foo@foo.com") == true
 *
 * @param {string} str String to test for being email address.
 * @return {boolean} Whether "str" looks like an email address.
 */
goog.editor.Link.isLikelyEmailAddress = function(str) {
  'use strict';
  return goog.editor.Link.LIKELY_EMAIL_ADDRESS_.test(str);
};


/**
 * Determines whether or not a url is an email link.
 * @param {string} url A url.
 * @return {boolean} Whether the url is a mailto link.
 */
goog.editor.Link.isMailto = function(url) {
  'use strict';
  return !!url && goog.string.startsWith(url, 'mailto:');
};
