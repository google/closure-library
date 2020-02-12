/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A one dimensional linear interpolator.
 */

goog.provide('goog.math.interpolator.Linear1');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.math');
goog.require('goog.math.interpolator.Interpolator1');



/**
 * A one dimensional linear interpolator.
 * @implements {goog.math.interpolator.Interpolator1}
 * @constructor
 * @final
 */
goog.math.interpolator.Linear1 = function() {
  /**
   * The abscissa of the data points.
   * @type {!Array<number>}
   * @private
   */
  this.x_ = [];

  /**
   * The ordinate of the data points.
   * @type {!Array<number>}
   * @private
   */
  this.y_ = [];
};


/** @override */
goog.math.interpolator.Linear1.prototype.setData = function(x, y) {
  goog.asserts.assert(
      x.length == y.length,
      'input arrays to setData should have the same length');
  if (x.length == 1) {
    this.x_ = [x[0], x[0] + 1];
    this.y_ = [y[0], y[0]];
  } else {
    this.x_ = x.slice();
    this.y_ = y.slice();
  }
};


/** @override */
goog.math.interpolator.Linear1.prototype.interpolate = function(x) {
  var pos = goog.array.binarySearch(this.x_, x);
  if (pos < 0) {
    pos = -pos - 2;
  }
  pos = goog.math.clamp(pos, 0, this.x_.length - 2);

  var progress = (x - this.x_[pos]) / (this.x_[pos + 1] - this.x_[pos]);
  return goog.math.lerp(this.y_[pos], this.y_[pos + 1], progress);
};


/** @override */
goog.math.interpolator.Linear1.prototype.getInverse = function() {
  var interpolator = new goog.math.interpolator.Linear1();
  interpolator.setData(this.y_, this.x_);
  return interpolator;
};
