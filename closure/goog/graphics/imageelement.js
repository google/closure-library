/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thin wrapper around the DOM element for images.
 */


goog.provide('goog.graphics.ImageElement');

goog.require('goog.graphics.Element');



/**
 * Interface for a graphics image element.
 * You should not construct objects from this constructor. Instead,
 * you should use `goog.graphics.Graphics.drawImage` and it
 * will return an implementation of this interface for you.
 *
 * @param {Element} element The DOM element to wrap.
 * @param {goog.graphics.AbstractGraphics} graphics The graphics creating
 *     this element.
 * @constructor
 * @extends {goog.graphics.Element}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
goog.graphics.ImageElement = function(element, graphics) {
  goog.graphics.Element.call(this, element, graphics);
};
goog.inherits(goog.graphics.ImageElement, goog.graphics.Element);


/**
 * Update the position of the image.
 *
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 */
goog.graphics.ImageElement.prototype.setPosition = goog.abstractMethod;


/**
 * Update the size of the image.
 *
 * @param {number} width Width of image.
 * @param {number} height Height of image.
 */
goog.graphics.ImageElement.prototype.setSize = goog.abstractMethod;


/**
 * Update the source of the image.
 * @param {string} src Source of the image.
 */
goog.graphics.ImageElement.prototype.setSource = goog.abstractMethod;
