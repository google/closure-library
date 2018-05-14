// Copyright 2007 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

goog.provide('goog.graphics.ext.PathTest');
goog.setTestOnly('goog.graphics.ext.PathTest');

goog.require('goog.graphics');
goog.require('goog.graphics.ext.Path');
goog.require('goog.math.Rect');
goog.require('goog.testing.graphics');
goog.require('goog.testing.jsunit');

function testClone() {
  var path = new goog.graphics.ext.Path().moveTo(0, 0).lineTo(1, 1).
      curveTo(2, 2, 3, 3, 4, 4).arc(5, 5, 6, 6, 0, 90, false).close();
  assertTrue('Cloned path is a goog.graphics.ext.Path',
      path instanceof goog.graphics.ext.Path);
}

function testBoundingBox() {
  var path = new goog.graphics.ext.Path().moveTo(0, 0).lineTo(1, 1).
      curveTo(2, 2, 3, 3, 4, 4).close();
  assertTrue('Bounding box is correct', goog.math.Rect.equals(
      path.getBoundingBox(), new goog.math.Rect(0, 0, 4, 4)));
}

function testModifyBounds() {
  var path1 = new goog.graphics.ext.Path().moveTo(0, 0).lineTo(1, 1).
      curveTo(2, 2, 3, 3, 4, 4).close();
  goog.testing.graphics.assertPathEquals(
      ['M', -2, -2, 'L', 0, 0, 'C', 2, 2, 4, 4, 6, 6, 'X'],
      path1.modifyBounds(-1, -1, 2, 2));
}
