// Copyright 2013 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////
//                                                                           //
// Any edits to this file must be applied to vec3f_test.js by running:       //
//   swap_type.sh vec3d_test.js > vec3f_test.js                              //
//                                                                           //
////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////

goog.provide('goog.vec.vec3dTest');
goog.setTestOnly('goog.vec.vec3dTest');

goog.require('goog.testing.jsunit');
goog.require('goog.vec.vec3d');

function testCreate() {
  var v = goog.vec.vec3d.create();
  assertElementsEquals([0, 0, 0], v);
}

function testCreateFromArray() {
  var v = goog.vec.vec3d.createFromArray([1, 2, 3]);
  assertElementsEquals([1, 2, 3], v);
}

function testCreateFromValues() {
  var v = goog.vec.vec3d.createFromValues(1, 2, 3);
  assertElementsEquals([1, 2, 3], v);
}

function testClone() {
  var v0 = goog.vec.vec3d.createFromValues(1, 2, 3);
  var v1 = goog.vec.vec3d.clone(v0);
  assertElementsEquals([1, 2, 3], v1);
}

function testSet() {
  var v = goog.vec.vec3d.create();
  goog.vec.vec3d.setFromValues(v, 1, 2, 3);
  assertElementsEquals([1, 2, 3], v);

  goog.vec.vec3d.setFromArray(v, [4, 5, 6]);
  assertElementsEquals([4, 5, 6], v);

  var w = goog.vec.vec3d.create();
  goog.vec.vec3d.setFromValues(w, 1, 2, 3);
  assertElementsEquals([1, 2, 3], w);

  goog.vec.vec3d.setFromArray(w, [4, 5, 6]);
  assertElementsEquals([4, 5, 6], w);
}

function testAdd() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [1, 2, 3]);
  var v1 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [4, 5, 6]);
  var v2 = goog.vec.vec3d.setFromVec3d(goog.vec.vec3d.create(), v0);

  goog.vec.vec3d.add(v2, v1, v2);
  assertElementsEquals([1, 2, 3], v0);
  assertElementsEquals([4, 5, 6], v1);
  assertElementsEquals([5, 7, 9], v2);

  goog.vec.vec3d.add(goog.vec.vec3d.add(v0, v1, v2), v0, v2);
  assertElementsEquals([6, 9, 12], v2);
}

function testSubtract() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [1, 2, 3]);
  var v1 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [4, 5, 6]);
  var v2 = goog.vec.vec3d.setFromVec3d(goog.vec.vec3d.create(), v0);

  goog.vec.vec3d.subtract(v2, v1, v2);
  assertElementsEquals([1, 2, 3], v0);
  assertElementsEquals([4, 5, 6], v1);
  assertElementsEquals([-3, -3, -3], v2);

  goog.vec.vec3d.setFromValues(v2, 0, 0, 0);
  goog.vec.vec3d.subtract(v1, v0, v2);
  assertElementsEquals([3, 3, 3], v2);

  v2 = goog.vec.vec3d.setFromVec3d(goog.vec.vec3d.create(), v0);
  goog.vec.vec3d.subtract(v2, v1, v2);
  assertElementsEquals([-3, -3, -3], v2);

  goog.vec.vec3d.subtract(goog.vec.vec3d.subtract(v1, v0, v2), v0, v2);
  assertElementsEquals([2, 1, 0], v2);
}

function testNegate() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [1, 2, 3]);
  var v1 = goog.vec.vec3d.create();

  goog.vec.vec3d.negate(v0, v1);
  assertElementsEquals([-1, -2, -3], v1);
  assertElementsEquals([1, 2, 3], v0);

  goog.vec.vec3d.negate(v0, v0);
  assertElementsEquals([-1, -2, -3], v0);
}

function testAbs() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [-1, -2, -3]);
  var v1 = goog.vec.vec3d.create();

  goog.vec.vec3d.abs(v0, v1);
  assertElementsEquals([1, 2, 3], v1);
  assertElementsEquals([-1, -2, -3], v0);

  goog.vec.vec3d.abs(v0, v0);
  assertElementsEquals([1, 2, 3], v0);
}

function testScale() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [1, 2, 3]);
  var v1 = goog.vec.vec3d.create();

  goog.vec.vec3d.scale(v0, 4, v1);
  assertElementsEquals([4, 8, 12], v1);
  assertElementsEquals([1, 2, 3], v0);

  goog.vec.vec3d.setFromArray(v1, v0);
  goog.vec.vec3d.scale(v1, 5, v1);
  assertElementsEquals([5, 10, 15], v1);
}

function testMagnitudeSquared() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [1, 2, 3]);
  assertEquals(14, goog.vec.vec3d.magnitudeSquared(v0));
}

function testMagnitude() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [1, 2, 3]);
  assertEquals(Math.sqrt(14), goog.vec.vec3d.magnitude(v0));
}

function testNormalize() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [2, 3, 4]);
  var v1 = goog.vec.vec3d.create();
  var v2 = goog.vec.vec3d.create();
  goog.vec.vec3d.scale(
      v0, 1 / goog.vec.vec3d.magnitude(v0), v2);

  goog.vec.vec3d.normalize(v0, v1);
  assertElementsEquals(v2, v1);
  assertElementsEquals([2, 3, 4], v0);

  goog.vec.vec3d.setFromArray(v1, v0);
  goog.vec.vec3d.normalize(v1, v1);
  assertElementsEquals(v2, v1);
}

function testDot() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [1, 2, 3]);
  var v1 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [4, 5, 6]);
  assertEquals(32, goog.vec.vec3d.dot(v0, v1));
  assertEquals(32, goog.vec.vec3d.dot(v1, v0));
}

function testCross() {
  var v0 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [1, 2, 3]);
  var v1 = goog.vec.vec3d.setFromArray(goog.vec.vec3d.create(), [4, 5, 6]);
  var crossVec = goog.vec.vec3d.create();

  goog.vec.vec3d.cross(v0, v1, crossVec);
  assertElementsEquals([1, 2, 3], v0);
  assertElementsEquals([4, 5, 6], v1);
  assertElementsEquals([-3, 6, -3], crossVec);

  goog.vec.vec3d.setFromArray(crossVec, v1);
  goog.vec.vec3d.cross(crossVec, v0, crossVec);
  assertElementsEquals([1, 2, 3], v0);
  assertElementsEquals([4, 5, 6], v1);
  assertElementsEquals([3, -6, 3], crossVec);

  goog.vec.vec3d.cross(v0, v0, v0);
  assertElementsEquals([0, 0, 0], v0);
}

function testDistanceSquared() {
  var v0 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 1, 2, 3);
  var v1 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 1, 2, 3);
  assertEquals(0, goog.vec.vec3d.distanceSquared(v0, v1));
  goog.vec.vec3d.setFromValues(v0, 1, 2, 3);
  goog.vec.vec3d.setFromValues(v1, -1, -2, -1);
  assertEquals(36, goog.vec.vec3d.distanceSquared(v0, v1));
}

function testDistance() {
  var v0 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 1, 2, 3);
  var v1 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 1, 2, 3);
  assertEquals(0, goog.vec.vec3d.distance(v0, v1));
  goog.vec.vec3d.setFromValues(v0, 1, 2, 3);
  goog.vec.vec3d.setFromValues(v1, -1, -2, -1);
  assertEquals(6, goog.vec.vec3d.distance(v0, v1));
}

function testDirection() {
  var v0 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 1, 2, 3);
  var v1 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 1, 2, 3);
  var dirVec = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 4, 5, 6);
  goog.vec.vec3d.direction(v0, v1, dirVec);
  assertElementsEquals([0, 0, 0], dirVec);
  goog.vec.vec3d.setFromValues(v0, 0, 0, 0);
  goog.vec.vec3d.setFromValues(v1, 1, 0, 0);
  goog.vec.vec3d.direction(v0, v1, dirVec);
  assertElementsEquals([1, 0, 0], dirVec);
  goog.vec.vec3d.setFromValues(v0, 1, 1, 1);
  goog.vec.vec3d.setFromValues(v1, 0, 0, 0);
  goog.vec.vec3d.direction(v0, v1, dirVec);
  assertElementsRoughlyEqual(
      [-0.5773502588272095, -0.5773502588272095, -0.5773502588272095],
      dirVec, goog.vec.EPSILON);
}

function testLerp() {
  var v0 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 1, 2, 3);
  var v1 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 10, 20, 30);
  var v2 = goog.vec.vec3d.setFromVec3d(goog.vec.vec3d.create(), v0);

  goog.vec.vec3d.lerp(v2, v1, 0, v2);
  assertElementsEquals([1, 2, 3], v2);
  goog.vec.vec3d.lerp(v2, v1, 1, v2);
  assertElementsEquals([10, 20, 30], v2);
  goog.vec.vec3d.lerp(v0, v1, .5, v2);
  assertElementsEquals([5.5, 11, 16.5], v2);
}

function testSlerp() {
  var v0 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 0, 0, 1);
  var v1 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 1, 0, 0);
  var v2 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), -1, 0, 0);
  var v3 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), -5, 0, 0);
  var v4 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 0, 0, -1);
  var v5 = goog.vec.vec3d.setFromVec3d(goog.vec.vec3d.create(), v0);

  // Try f == 0 and f == 1.
  goog.vec.vec3d.slerp(v5, v1, 0, v5);
  assertElementsEquals([0, 0, 1], v5);
  goog.vec.vec3d.slerp(v5, v1, 1, v5);
  assertElementsEquals([1, 0, 0], v5);

  // Try slerp between perpendicular vectors.
  goog.vec.vec3d.slerp(v0, v1, .5, v5);
  assertElementsRoughlyEqual(
      [ Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2 ], v5,
      goog.vec.EPSILON);

  // Try slerp between vectors of opposite directions (+Z and -Z).
  v5 = goog.vec.vec3d.slerp(v0, v4, .5, v5);
  // Axis of rotation is arbitrary, but result should be 90 degrees from both
  // v0 and v4 when f = 0.5.
  assertRoughlyEquals(Math.PI / 2, Math.acos(goog.vec.vec3d.dot(v5, v0)),
                      goog.vec.EPSILON);
  assertRoughlyEquals(Math.PI / 2, Math.acos(goog.vec.vec3d.dot(v5, v4)),
                      goog.vec.EPSILON);

  // f == 0.25, result should be 45-degrees to v0, and 135 to v4.
  v5 = goog.vec.vec3d.slerp(v0, v4, .25, v5);
  assertRoughlyEquals(Math.PI / 4, Math.acos(goog.vec.vec3d.dot(v5, v0)),
                      goog.vec.EPSILON);
  assertRoughlyEquals(Math.PI * 3 / 4, Math.acos(goog.vec.vec3d.dot(v5, v4)),
                      goog.vec.EPSILON);

  // f = 0.75, result should be 135-degrees to v0, and 45 to v4.
  v5 = goog.vec.vec3d.slerp(v0, v4, .75, v5);
  assertRoughlyEquals(Math.PI * 3 / 4, Math.acos(goog.vec.vec3d.dot(v5, v0)),
                      goog.vec.EPSILON);
  assertRoughlyEquals(Math.PI / 4, Math.acos(goog.vec.vec3d.dot(v5, v4)),
                      goog.vec.EPSILON);

  // Same as above, but on opposite directions of the X-axis.
  v5 = goog.vec.vec3d.slerp(v1, v2, .5, v5);
  // Axis of rotation is arbitrary, but result should be 90 degrees from both
  // v1 and v2 when f = 0.5.
  assertRoughlyEquals(Math.PI / 2, Math.acos(goog.vec.vec3d.dot(v5, v1)),
                      goog.vec.EPSILON);
  assertRoughlyEquals(Math.PI / 2, Math.acos(goog.vec.vec3d.dot(v5, v2)),
                      goog.vec.EPSILON);

  // f == 0.25, result should be 45-degrees to v1, and 135 to v2.
  v5 = goog.vec.vec3d.slerp(v1, v2, .25, v5);
  assertRoughlyEquals(Math.PI / 4, Math.acos(goog.vec.vec3d.dot(v5, v1)),
                      goog.vec.EPSILON);
  assertRoughlyEquals(Math.PI * 3 / 4, Math.acos(goog.vec.vec3d.dot(v5, v2)),
                      goog.vec.EPSILON);

  // f = 0.75, result should be 135-degrees to v1, and 45 to v2.
  v5 = goog.vec.vec3d.slerp(v1, v2, .75, v5);
  assertRoughlyEquals(Math.PI * 3 / 4, Math.acos(goog.vec.vec3d.dot(v5, v1)),
                      goog.vec.EPSILON);
  assertRoughlyEquals(Math.PI / 4, Math.acos(goog.vec.vec3d.dot(v5, v2)),
                      goog.vec.EPSILON);

  // Try vectors that aren't perpendicular or opposite/same direction.
  var v6 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(),
                                        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
  goog.vec.vec3d.slerp(v1, v6, .9, v5);

  // The vectors are 45 degrees apart, for f == 0.9, results should be 1/10 of
  // that from v6 and 9/10 of that away from v1.
  assertRoughlyEquals((Math.PI / 4) * 0.9, Math.acos(goog.vec.vec3d.dot(v1, v5)),
                      goog.vec.EPSILON);
  assertRoughlyEquals((Math.PI / 4) * 0.1, Math.acos(goog.vec.vec3d.dot(v6, v5)),
                      goog.vec.EPSILON);

  // Between vectors of the same direction, where one is non-unit-length
  // (magnitudes should be lerp-ed).
  goog.vec.vec3d.slerp(v2, v3, .5, v5);
  assertElementsEquals([-3, 0, 0], v5);

  // Between perpendicular vectors, where one is non-unit length.
  goog.vec.vec3d.slerp(v0, v3, .5, v5);
  assertRoughlyEquals(3, goog.vec.vec3d.magnitude(v5), goog.vec.EPSILON);
  assertElementsRoughlyEqual(
      [ -3 * (Math.sqrt(2) / 2), 0, 3 * (Math.sqrt(2) / 2) ], v5,
      goog.vec.EPSILON);

  // And vectors of opposite directions, where one is non-unit length.
  goog.vec.vec3d.slerp(v1, v3, .5, v5);
  // Axis of rotation is arbitrary, but result should be 90 degrees from both
  // v1 and v3.
  assertRoughlyEquals(
      Math.PI / 2,
      Math.acos(goog.vec.vec3d.dot(v5, v1) / (goog.vec.vec3d.magnitude(v5) *
                                              goog.vec.vec3d.magnitude(v1))),
      goog.vec.EPSILON);
  assertRoughlyEquals(
      Math.PI / 2,
      Math.acos(goog.vec.vec3d.dot(v5, v3) / (goog.vec.vec3d.magnitude(v3) *
                                              goog.vec.vec3d.magnitude(v5))),
      goog.vec.EPSILON);
  // Magnitude should be linearly interpolated.
  assertRoughlyEquals(3, goog.vec.vec3d.magnitude(v5), goog.vec.EPSILON);

  // Try a case where the vectors are the same direction (the same vector in
  // this case), but where numerical error results in a dot product
  // slightly greater than 1. Taking the acos of this would result in NaN.
  var v7 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 0.009, 0.147,
                                        0.989);
  goog.vec.vec3d.slerp(v7, v7, .25, v5);
  assertElementsRoughlyEqual([ v7[0], v7[1], v7[2] ], v5, goog.vec.EPSILON);
}

function testMax() {
  var v0 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 10, 20, 30);
  var v1 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 5, 25, 35);
  var v2 = goog.vec.vec3d.create();

  goog.vec.vec3d.max(v0, v1, v2);
  assertElementsEquals([10, 25, 35], v2);
  goog.vec.vec3d.max(v1, v0, v1);
  assertElementsEquals([10, 25, 35], v1);
  goog.vec.vec3d.max(v2, 20, v2);
  assertElementsEquals([20, 25, 35], v2);
}

function testMin() {
  var v0 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 10, 20, 30);
  var v1 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 5, 25, 35);
  var v2 = goog.vec.vec3d.create();

  goog.vec.vec3d.min(v0, v1, v2);
  assertElementsEquals([5, 20, 30], v2);
  goog.vec.vec3d.min(v1, v0, v1);
  assertElementsEquals([5, 20, 30], v1);
  goog.vec.vec3d.min(v2, 20, v2);
  assertElementsEquals([5, 20, 20], v2);
}

function testEquals() {
  var v0 = goog.vec.vec3d.setFromValues(goog.vec.vec3d.create(), 1, 2, 3);
  var v1 = goog.vec.vec3d.setFromVec3d(goog.vec.vec3d.create(), v0);
  assertElementsEquals(v0, v1);

  v1[0] = 4;
  assertFalse(goog.vec.vec3d.equals(v0, v1));

  v1 = goog.vec.vec3d.setFromVec3d(goog.vec.vec3d.create(), v0);
  v1[1] = 4;
  assertFalse(goog.vec.vec3d.equals(v0, v1));

  v1 = goog.vec.vec3d.setFromVec3d(goog.vec.vec3d.create(), v0);
  v1[2] = 4;
  assertFalse(goog.vec.vec3d.equals(v0, v1));
}
