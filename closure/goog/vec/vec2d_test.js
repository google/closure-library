// Copyright 2013 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////
//                                                                           //
// Any edits to this file must be applied to vec2f_test.js by running:       //
//   swap_type.sh vec2d_test.js > vec2f_test.js                              //
//                                                                           //
////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////

goog.provide('goog.vec.vec2dTest');
goog.setTestOnly('goog.vec.vec2dTest');

goog.require('goog.testing.jsunit');
goog.require('goog.vec.vec2d');

function testCreate() {
  var v = goog.vec.vec2d.create();
  assertElementsEquals([0, 0], v);
}

function testCreateFromArray() {
  var v = goog.vec.vec2d.createFromArray([1, 2]);
  assertElementsEquals([1, 2], v);
}

function testCreateFromValues() {
  var v = goog.vec.vec2d.createFromValues(1, 2);
  assertElementsEquals([1, 2], v);
}

function testClone() {
  var v0 = goog.vec.vec2d.createFromValues(1, 2);
  var v1 = goog.vec.vec2d.clone(v0);
  assertElementsEquals([1, 2], v1);
}

function testSet() {
  var v = goog.vec.vec2d.create();
  goog.vec.vec2d.setFromValues(v, 1, 2);
  assertElementsEquals([1, 2], v);

  goog.vec.vec2d.setFromArray(v, [4, 5]);
  assertElementsEquals([4, 5], v);

  var w = goog.vec.vec2d.create();
  goog.vec.vec2d.setFromValues(w, 1, 2);
  assertElementsEquals([1, 2], w);

  goog.vec.vec2d.setFromArray(w, [4, 5]);
  assertElementsEquals([4, 5], w);
}

function testAdd() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [1, 2]);
  var v1 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [4, 5]);
  var v2 = goog.vec.vec2d.setFromVec2d(goog.vec.vec2d.create(), v0);

  goog.vec.vec2d.add(v2, v1, v2);
  assertElementsEquals([1, 2], v0);
  assertElementsEquals([4, 5], v1);
  assertElementsEquals([5, 7], v2);

  goog.vec.vec2d.add(goog.vec.vec2d.add(v0, v1, v2), v0, v2);
  assertElementsEquals([6, 9], v2);
}

function testSubtract() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [1, 2]);
  var v1 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [4, 5]);
  var v2 = goog.vec.vec2d.setFromVec2d(goog.vec.vec2d.create(), v0);

  goog.vec.vec2d.subtract(v2, v1, v2);
  assertElementsEquals([1, 2], v0);
  assertElementsEquals([4, 5], v1);
  assertElementsEquals([-3, -3], v2);

  goog.vec.vec2d.setFromValues(v2, 0, 0);
  goog.vec.vec2d.subtract(v1, v0, v2);
  assertElementsEquals([3, 3], v2);

  v2 = goog.vec.vec2d.setFromVec2d(goog.vec.vec2d.create(), v0);
  goog.vec.vec2d.subtract(v2, v1, v2);
  assertElementsEquals([-3, -3], v2);

  goog.vec.vec2d.subtract(goog.vec.vec2d.subtract(v1, v0, v2), v0, v2);
  assertElementsEquals([2, 1], v2);
}

function testMultiply() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [1, 2]);
  var v1 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [4, 5]);
  var v2 = goog.vec.vec2d.setFromVec2d(goog.vec.vec2d.create(), v0);

  goog.vec.vec2d.componentMultiply(v2, v1, v2);
  assertElementsEquals([1, 2], v0);
  assertElementsEquals([4, 5], v1);
  assertElementsEquals([4, 10], v2);

  goog.vec.vec2d.componentMultiply(goog.vec.vec2d.componentMultiply(v0, v1, v2), v0, v2);
  assertElementsEquals([4, 20], v2);
}

function testDivide() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [1, 2]);
  var v1 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [4, 5]);
  var v2 = goog.vec.vec2d.setFromVec2d(goog.vec.vec2d.create(), v0);

  goog.vec.vec2d.componentDivide(v2, v1, v2);
  assertElementsRoughlyEqual([1, 2], v0, 10e-5);
  assertElementsRoughlyEqual([4, 5], v1, 10e-5);
  assertElementsRoughlyEqual([.25, .4], v2, 10e-5);

  goog.vec.vec2d.setFromValues(v2, 0, 0);
  goog.vec.vec2d.componentDivide(v1, v0, v2);
  assertElementsRoughlyEqual([4, 2.5], v2, 10e-5);

  v2 = goog.vec.vec2d.setFromVec2d(goog.vec.vec2d.create(), v0);
  goog.vec.vec2d.componentDivide(v2, v1, v2);
  assertElementsRoughlyEqual([.25, .4], v2, 10e-5);

  goog.vec.vec2d.componentDivide(goog.vec.vec2d.componentDivide(v1, v0, v2), v0, v2);
  assertElementsRoughlyEqual([4, 1.25], v2, 10e-5);
}

function testNegate() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [1, 2]);
  var v1 = goog.vec.vec2d.create();

  goog.vec.vec2d.negate(v0, v1);
  assertElementsEquals([-1, -2], v1);
  assertElementsEquals([1, 2], v0);

  goog.vec.vec2d.negate(v0, v0);
  assertElementsEquals([-1, -2], v0);
}

function testAbs() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [-1, -2]);
  var v1 = goog.vec.vec2d.create();

  goog.vec.vec2d.abs(v0, v1);
  assertElementsEquals([1, 2], v1);
  assertElementsEquals([-1, -2], v0);

  goog.vec.vec2d.abs(v0, v0);
  assertElementsEquals([1, 2], v0);
}

function testScale() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [1, 2]);
  var v1 = goog.vec.vec2d.create();

  goog.vec.vec2d.scale(v0, 4, v1);
  assertElementsEquals([4, 8], v1);
  assertElementsEquals([1, 2], v0);

  goog.vec.vec2d.setFromArray(v1, v0);
  goog.vec.vec2d.scale(v1, 5, v1);
  assertElementsEquals([5, 10], v1);
}

function testMagnitudeSquared() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [1, 2]);
  assertEquals(5, goog.vec.vec2d.magnitudeSquared(v0));
}

function testMagnitude() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [1, 2]);
  assertEquals(Math.sqrt(5), goog.vec.vec2d.magnitude(v0));
}

function testNormalize() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [2, 3]);
  var v1 = goog.vec.vec2d.create();
  var v2 = goog.vec.vec2d.create();
  goog.vec.vec2d.scale(
      v0, 1 / goog.vec.vec2d.magnitude(v0), v2);

  goog.vec.vec2d.normalize(v0, v1);
  assertElementsEquals(v2, v1);
  assertElementsEquals([2, 3], v0);

  goog.vec.vec2d.setFromArray(v1, v0);
  goog.vec.vec2d.normalize(v1, v1);
  assertElementsEquals(v2, v1);
}

function testDot() {
  var v0 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [1, 2]);
  var v1 = goog.vec.vec2d.setFromArray(goog.vec.vec2d.create(), [4, 5]);
  assertEquals(14, goog.vec.vec2d.dot(v0, v1));
  assertEquals(14, goog.vec.vec2d.dot(v1, v0));
}

function testDistanceSquared() {
  var v0 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 1, 2);
  var v1 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 1, 2);
  assertEquals(0, goog.vec.vec2d.distanceSquared(v0, v1));
  goog.vec.vec2d.setFromValues(v0, 1, 2);
  goog.vec.vec2d.setFromValues(v1, -1, -2);
  assertEquals(20, goog.vec.vec2d.distanceSquared(v0, v1));
}

function testDistance() {
  var v0 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 1, 2);
  var v1 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 1, 2);
  assertEquals(0, goog.vec.vec2d.distance(v0, v1));
  goog.vec.vec2d.setFromValues(v0, 2, 3);
  goog.vec.vec2d.setFromValues(v1, -2, 0);
  assertEquals(5, goog.vec.vec2d.distance(v0, v1));
}

function testDirection() {
  var v0 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 1, 2);
  var v1 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 1, 2);
  var dirVec = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 4, 5);
  goog.vec.vec2d.direction(v0, v1, dirVec);
  assertElementsEquals([0, 0], dirVec);
  goog.vec.vec2d.setFromValues(v0, 0, 0);
  goog.vec.vec2d.setFromValues(v1, 1, 0);
  goog.vec.vec2d.direction(v0, v1, dirVec);
  assertElementsEquals([1, 0], dirVec);
  goog.vec.vec2d.setFromValues(v0, 1, 1);
  goog.vec.vec2d.setFromValues(v1, 0, 0);
  goog.vec.vec2d.direction(v0, v1, dirVec);
  assertElementsRoughlyEqual(
      [-0.707106781, -0.707106781],
      dirVec, goog.vec.EPSILON);
}

function testLerp() {
  var v0 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 1, 2);
  var v1 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 10, 20);
  var v2 = goog.vec.vec2d.setFromVec2d(goog.vec.vec2d.create(), v0);

  goog.vec.vec2d.lerp(v2, v1, 0, v2);
  assertElementsEquals([1, 2], v2);
  goog.vec.vec2d.lerp(v2, v1, 1, v2);
  assertElementsEquals([10, 20], v2);
  goog.vec.vec2d.lerp(v0, v1, .5, v2);
  assertElementsEquals([5.5, 11], v2);
}

function testMax() {
  var v0 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 10, 20);
  var v1 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 5, 25);
  var v2 = goog.vec.vec2d.create();

  goog.vec.vec2d.max(v0, v1, v2);
  assertElementsEquals([10, 25], v2);
  goog.vec.vec2d.max(v1, v0, v1);
  assertElementsEquals([10, 25], v1);
  goog.vec.vec2d.max(v2, 20, v2);
  assertElementsEquals([20, 25], v2);
}

function testMin() {
  var v0 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 10, 20);
  var v1 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 5, 25);
  var v2 = goog.vec.vec2d.create();

  goog.vec.vec2d.min(v0, v1, v2);
  assertElementsEquals([5, 20], v2);
  goog.vec.vec2d.min(v1, v0, v1);
  assertElementsEquals([5, 20], v1);
  goog.vec.vec2d.min(v2, 10, v2);
  assertElementsEquals([5, 10], v2);
}

function testEquals() {
  var v0 = goog.vec.vec2d.setFromValues(goog.vec.vec2d.create(), 1, 2);
  var v1 = goog.vec.vec2d.setFromVec2d(goog.vec.vec2d.create(), v0);
  assertElementsEquals(v0, v1);

  v1[0] = 4;
  assertFalse(goog.vec.vec2d.equals(v0, v1));

  v1 = goog.vec.vec2d.setFromVec2d(goog.vec.vec2d.create(), v0);
  v1[1] = 4;
  assertFalse(goog.vec.vec2d.equals(v0, v1));
}
