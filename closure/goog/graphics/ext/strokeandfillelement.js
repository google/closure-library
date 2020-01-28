/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thick wrapper around elements with stroke and fill.
 */


goog.provide('goog.graphics.ext.StrokeAndFillElement');

goog.forwardDeclare('goog.graphics.Fill');
goog.forwardDeclare('goog.graphics.Stroke');
goog.forwardDeclare('goog.graphics.StrokeAndFillElement');
goog.forwardDeclare('goog.graphics.ext.Group');
goog.require('goog.graphics.ext.Element');



/**
 * Interface for a graphics element that has a stroke and fill.
 * This is the base interface for ellipse, rectangle and other
 * shape interfaces.
 * You should not construct objects from this constructor. Use a subclass.
 * @param {goog.graphics.ext.Group} group Parent for this element.
 * @param {goog.graphics.StrokeAndFillElement} wrapper The thin wrapper to wrap.
 * @constructor
 * @extends {goog.graphics.ext.Element}
 */
goog.graphics.ext.StrokeAndFillElement = function(group, wrapper) {
  goog.graphics.ext.Element.call(this, group, wrapper);
};
goog.inherits(
    goog.graphics.ext.StrokeAndFillElement, goog.graphics.ext.Element);


/**
 * Sets the fill for this element.
 * @param {goog.graphics.Fill?} fill The fill object.
 */
goog.graphics.ext.StrokeAndFillElement.prototype.setFill = function(fill) {
  this.getWrapper().setFill(fill);
};


/**
 * Sets the stroke for this element.
 * @param {goog.graphics.Stroke?} stroke The stroke object.
 */
goog.graphics.ext.StrokeAndFillElement.prototype.setStroke = function(stroke) {
  this.getWrapper().setStroke(stroke);
};


/**
 * Redraw the rectangle.  Called when the coordinate system is changed.
 * @protected
 * @override
 */
goog.graphics.ext.StrokeAndFillElement.prototype.redraw = function() {
  this.getWrapper().reapplyStroke();
};
