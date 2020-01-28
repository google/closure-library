/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thick wrapper around ellipses.
 */


goog.provide('goog.graphics.ext.Ellipse');

goog.forwardDeclare('goog.graphics.ext.Group');
goog.require('goog.graphics.ext.StrokeAndFillElement');



/**
 * Wrapper for a graphics ellipse element.
 * @param {goog.graphics.ext.Group} group Parent for this element.
 * @constructor
 * @extends {goog.graphics.ext.StrokeAndFillElement}
 * @final
 */
goog.graphics.ext.Ellipse = function(group) {
  // Initialize with some stock values.
  var wrapper = group.getGraphicsImplementation().drawEllipse(
      1, 1, 2, 2, null, null, group.getWrapper());
  goog.graphics.ext.StrokeAndFillElement.call(this, group, wrapper);
};
goog.inherits(
    goog.graphics.ext.Ellipse, goog.graphics.ext.StrokeAndFillElement);


/**
 * Redraw the ellipse.  Called when the coordinate system is changed.
 * @protected
 * @override
 */
goog.graphics.ext.Ellipse.prototype.redraw = function() {
  goog.graphics.ext.Ellipse.superClass_.redraw.call(this);

  // Our position is already transformed in transform_, but because this is an
  // ellipse we need to position the center.
  var xRadius = this.getWidth() / 2;
  var yRadius = this.getHeight() / 2;
  var wrapper = this.getWrapper();
  wrapper.setCenter(xRadius, yRadius);
  wrapper.setRadius(xRadius, yRadius);
};
