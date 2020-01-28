/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thin wrapper around the DOM element for rectangles.
 */


goog.provide('goog.graphics.RectElement');

goog.require('goog.graphics.StrokeAndFillElement');



/**
 * Interface for a graphics rectangle element.
 * You should not construct objects from this constructor. The graphics
 * will return an implementation of this interface for you.
 * @param {Element} element The DOM element to wrap.
 * @param {goog.graphics.AbstractGraphics} graphics The graphics creating
 *     this element.
 * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
 * @param {goog.graphics.Fill?} fill The fill to use for this element.
 * @constructor
 * @extends {goog.graphics.StrokeAndFillElement}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
goog.graphics.RectElement = function(element, graphics, stroke, fill) {
  goog.graphics.StrokeAndFillElement.call(
      this, element, graphics, stroke, fill);
};
goog.inherits(goog.graphics.RectElement, goog.graphics.StrokeAndFillElement);


/**
 * Update the position of the rectangle.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 */
goog.graphics.RectElement.prototype.setPosition = goog.abstractMethod;


/**
 * Update the size of the rectangle.
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 */
goog.graphics.RectElement.prototype.setSize = goog.abstractMethod;
