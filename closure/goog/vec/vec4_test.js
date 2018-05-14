// Copyright 2011 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

goog.provide('goog.vec.Vec4Test');
goog.setTestOnly('goog.vec.Vec4Test');

goog.require('goog.testing.jsunit');
goog.require('goog.vec.Vec4');

function testDeprecatedConstructor() {
  assertElementsEquals([0, 0, 0, 0], goog.vec.Vec4.create());

  assertElementsEquals([1, 2, 3, 4],
      goog.vec.Vec4.createFromValues(1, 2, 3, 4));

  assertElementsEquals([1, 2, 3, 4],
      goog.vec.Vec4.createFromArray([1, 2, 3, 4]));

  var v = goog.vec.Vec4.createFromValues(1, 2, 3, 4);
  assertElementsEquals([1, 2, 3, 4], goog.vec.Vec4.clone(v));
}

function testConstructor() {
  assertElementsEquals([0, 0, 0, 0], goog.vec.Vec4.createFloat32());

  assertElementsEquals([1, 2, 3, 4],
      goog.vec.Vec4.createFloat32FromValues(1, 2, 3, 4));

  assertElementsEquals([1, 2, 3, 4],
      goog.vec.Vec4.createFloat32FromArray([1, 2, 3, 4]));

  var v = goog.vec.Vec4.createFloat32FromValues(1, 2, 3, 4);
  assertElementsEquals([1, 2, 3, 4], goog.vec.Vec4.cloneFloat32(v));

  assertElementsEquals([0, 0, 0, 0], goog.vec.Vec4.createFloat64());

  assertElementsEquals([1, 2, 3, 4],
      goog.vec.Vec4.createFloat64FromValues(1, 2, 3, 4));

  assertElementsEquals([1, 2, 3, 4],
      goog.vec.Vec4.createFloat64FromArray([1, 2, 3, 4]));

  var w = goog.vec.Vec4.createFloat64FromValues(1, 2, 3, 4);
  assertElementsEquals([1, 2, 3, 4], goog.vec.Vec4.cloneFloat64(w));
}

function testSet() {
  var v = goog.vec.Vec4.createFloat32();
  goog.vec.Vec4.setFromValues(v, 1, 2, 3, 4);
  assertElementsEquals([1, 2, 3, 4], v);

  goog.vec.Vec4.setFromArray(v, [4, 5, 6, 7]);
  assertElementsEquals([4, 5, 6, 7], v);
}

function testAdd() {
  var v0 = goog.vec.Vec4.createFloat32FromArray([1, 2, 3, 4]);
  var v1 = goog.vec.Vec4.createFloat32FromArray([5, 6, 7, 8]);
  var v2 = goog.vec.Vec4.cloneFloat32(v0);

  goog.vec.Vec4.add(v2, v1, v2);
  assertElementsEquals([1, 2, 3, 4], v0);
  assertElementsEquals([5, 6, 7, 8], v1);
  assertElementsEquals([6, 8, 10, 12], v2);

  goog.vec.Vec4.add(goog.vec.Vec4.add(v0, v1, v2), v0, v2);
  assertElementsEquals([7, 10, 13, 16], v2);
}

function testSubtract() {
  var v0 = goog.vec.Vec4.createFloat32FromArray([4, 3, 2, 1]);
  var v1 = goog.vec.Vec4.createFloat32FromArray([5, 6, 7, 8]);
  var v2 = goog.vec.Vec4.cloneFloat32(v0);

  goog.vec.Vec4.subtract(v2, v1, v2);
  assertElementsEquals([4, 3, 2, 1], v0);
  assertElementsEquals([5, 6, 7, 8], v1);
  assertElementsEquals([-1, -3, -5, -7], v2);

  goog.vec.Vec4.setFromValues(v2, 0, 0, 0, 0);
  goog.vec.Vec4.subtract(v1, v0, v2);
  assertElementsEquals([1, 3, 5, 7], v2);

  goog.vec.Vec4.subtract(goog.vec.Vec4.subtract(v1, v0, v2), v0, v2);
  assertElementsEquals([-3, 0, 3, 6], v2);
}

function testNegate() {
  var v0 = goog.vec.Vec4.createFloat32FromArray([1, 2, 3, 4]);
  var v1 = goog.vec.Vec4.createFloat32();

  goog.vec.Vec4.negate(v0, v1);
  assertElementsEquals([-1, -2, -3, -4], v1);
  assertElementsEquals([1, 2, 3, 4], v0);

  goog.vec.Vec4.negate(v0, v0);
  assertElementsEquals([-1, -2, -3, -4], v0);
}

function testAbs() {
  var v0 = goog.vec.Vec4.createFloat32FromValues(-1, -2, -3, -4);
  var v1 = goog.vec.Vec4.createFloat32();

  goog.vec.Vec4.abs(v0, v1);
  assertElementsEquals([1, 2, 3, 4], v1);
  assertElementsEquals([-1, -2, -3, -4], v0);

  goog.vec.Vec4.abs(v0, v0);
  assertElementsEquals([1, 2, 3, 4], v0);
}

function testScale() {
  var v0 = goog.vec.Vec4.createFloat32FromArray([1, 2, 3, 4]);
  var v1 = goog.vec.Vec4.createFloat32();

  goog.vec.Vec4.scale(v0, 4, v1);
  assertElementsEquals([4, 8, 12, 16], v1);
  assertElementsEquals([1, 2, 3, 4], v0);

  goog.vec.Vec4.setFromArray(v1, v0);
  goog.vec.Vec4.scale(v1, 5, v1);
  assertElementsEquals([5, 10, 15, 20], v1);
}

function testMagnitudeSquared() {
  var v0 = goog.vec.Vec4.createFloat32FromArray([1, 2, 3, 4]);
  assertEquals(30, goog.vec.Vec4.magnitudeSquared(v0));
}

function testMagnitude() {
  var v0 = goog.vec.Vec4.createFloat32FromArray([1, 2, 3, 4]);
  assertEquals(Math.sqrt(30), goog.vec.Vec4.magnitude(v0));
}

function testNormalize() {
  var v0 = goog.vec.Vec4.createFloat32FromArray([2, 3, 4, 5]);
  var v1 = goog.vec.Vec4.createFloat32();
  var v2 = goog.vec.Vec4.createFloat32();
  goog.vec.Vec4.scale(v0, 1 / goog.vec.Vec4.magnitude(v0), v2);

  goog.vec.Vec4.normalize(v0, v1);
  assertElementsEquals(v2, v1);
  assertElementsEquals([2, 3, 4, 5], v0);

  goog.vec.Vec4.setFromArray(v1, v0);
  goog.vec.Vec4.normalize(v1, v1);
  assertElementsEquals(v2, v1);
}

function testDot() {
  var v0 = goog.vec.Vec4.createFloat32FromArray([1, 2, 3, 4]);
  var v1 = goog.vec.Vec4.createFloat32FromArray([5, 6, 7, 8]);
  assertEquals(70, goog.vec.Vec4.dot(v0, v1));
  assertEquals(70, goog.vec.Vec4.dot(v1, v0));
}

function testLerp() {
  var v0 = goog.vec.Vec4.createFloat32FromValues(1, 2, 3, 4);
  var v1 = goog.vec.Vec4.createFloat32FromValues(10, 20, 30, 40);
  var v2 = goog.vec.Vec4.cloneFloat32(v0);

  goog.vec.Vec4.lerp(v2, v1, 0, v2);
  assertElementsEquals([1, 2, 3, 4], v2);
  goog.vec.Vec4.lerp(v2, v1, 1, v2);
  assertElementsEquals([10, 20, 30, 40], v2);
  goog.vec.Vec4.lerp(v0, v1, .5, v2);
  assertElementsEquals([5.5, 11, 16.5, 22], v2);
}

function testMax() {
  var v0 = goog.vec.Vec4.createFloat32FromValues(10, 20, 30, 40);
  var v1 = goog.vec.Vec4.createFloat32FromValues(5, 25, 35, 30);
  var v2 = goog.vec.Vec4.createFloat32();

  goog.vec.Vec4.max(v0, v1, v2);
  assertElementsEquals([10, 25, 35, 40], v2);
  goog.vec.Vec4.max(v1, v0, v1);
  assertElementsEquals([10, 25, 35, 40], v1);
  goog.vec.Vec4.max(v2, 20, v2);
  assertElementsEquals([20, 25, 35, 40], v2);
}

function testMin() {
  var v0 = goog.vec.Vec4.createFloat32FromValues(10, 20, 30, 40);
  var v1 = goog.vec.Vec4.createFloat32FromValues(5, 25, 35, 30);
  var v2 = goog.vec.Vec4.createFloat32();

  goog.vec.Vec4.min(v0, v1, v2);
  assertElementsEquals([5, 20, 30, 30], v2);
  goog.vec.Vec4.min(v1, v0, v1);
  assertElementsEquals([5, 20, 30, 30], v1);
  goog.vec.Vec4.min(v2, 20, v2);
  assertElementsEquals([5, 20, 20, 20], v2);
}

function testEquals() {
  var v0 = goog.vec.Vec4.createFloat32FromValues(1, 2, 3, 4);
  var v1 = goog.vec.Vec4.cloneFloat32(v0);
  assertElementsEquals(v0, v1);

  v1[0] = 5;
  assertFalse(goog.vec.Vec4.equals(v0, v1));

  v1 = goog.vec.Vec4.cloneFloat32(v0);
  v1[1] = 5;
  assertFalse(goog.vec.Vec4.equals(v0, v1));

  v1 = goog.vec.Vec4.cloneFloat32(v0);
  v1[2] = 5;
  assertFalse(goog.vec.Vec4.equals(v0, v1));

  v1 = goog.vec.Vec4.cloneFloat32(v0);
  v1[3] = 5;
  assertFalse(goog.vec.Vec4.equals(v0, v1));
}
