// Copyright 2011 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

goog.provide('goog.vec.QuaternionTest');
goog.setTestOnly('goog.vec.QuaternionTest');

goog.require('goog.testing.jsunit');
goog.require('goog.vec.Mat3');
goog.require('goog.vec.Mat4');
goog.require('goog.vec.Quaternion');
goog.require('goog.vec.Vec3');
goog.require('goog.vec.vec3f');

function testCreateIdentityFloat32() {
  var q = goog.vec.Quaternion.createIdentityFloat32();
  assertElementsEquals([0, 0, 0, 1], q);
}

function testInvert() {
  var q0 = goog.vec.Quaternion.createFloat32FromValues(1, 2, 3, 4);
  var q1 = goog.vec.Quaternion.createFloat32();

  goog.vec.Quaternion.invert(q0, q1);
  assertElementsRoughlyEqual([1, 2, 3, 4], q0, goog.vec.EPSILON);
  assertElementsRoughlyEqual([-0.033333, -0.066666, -0.1, 0.133333], q1,
      goog.vec.EPSILON);
}

function testConjugate() {
  var q0 = goog.vec.Quaternion.createFloat32FromValues(1, 2, 3, 4);
  var q1 = goog.vec.Quaternion.createFloat32();

  goog.vec.Quaternion.conjugate(q0, q1);
  assertElementsEquals([1, 2, 3, 4], q0);
  assertElementsEquals([-1, -2, -3, 4], q1);

  goog.vec.Quaternion.conjugate(q1, q1);
  assertElementsEquals([1, 2, 3, 4], q1);

  // Conjugate and inverse of a normalized quaternion should be equal.
  var q2 = goog.vec.Quaternion.createFloat32();
  var q3 = goog.vec.Quaternion.createFloat32();

  goog.vec.Quaternion.normalize(q0, q2);
  goog.vec.Quaternion.conjugate(q2, q2);

  goog.vec.Quaternion.normalize(q0, q3);
  goog.vec.Quaternion.invert(q3, q3);

  assertElementsRoughlyEqual(q2, q3, goog.vec.EPSILON);
}

function testConcat() {
  var q0 = goog.vec.Quaternion.createFloat32FromValues(1, 2, 3, 4);
  var q1 = goog.vec.Quaternion.createFloat32FromValues(2, 3, 4, 5);
  var q2 = goog.vec.Quaternion.createFloat32();
  goog.vec.Quaternion.concat(q0, q1, q2);
  assertElementsEquals([12, 24, 30, 0], q2);

  goog.vec.Quaternion.concat(q0, q1, q0);
  assertElementsEquals([12, 24, 30, 0], q0);
}

function testMakeIdentity() {
  var q = goog.vec.Quaternion.createFloat32FromValues(1, 2, 3, 4);
  goog.vec.Quaternion.makeIdentity(q);
  assertElementsEquals([0, 0, 0, 1], q);
}

function testRotateX() {
  var q = goog.vec.Quaternion.createIdentityFloat32();
  goog.vec.Quaternion.rotateX(q, Math.PI / 2, q);

  var axis = goog.vec.Vec3.createFloat32();
  var angle = goog.vec.Quaternion.toAngleAxis(q, axis);

  assertElementsRoughlyEqual([1, 0, 0], axis, goog.vec.EPSILON);
  assertRoughlyEquals(Math.PI / 2, angle, goog.vec.EPSILON);
}

function testRotateY() {
  var q = goog.vec.Quaternion.createIdentityFloat32();
  goog.vec.Quaternion.rotateY(q, Math.PI / 2, q);

  var axis = goog.vec.Vec3.createFloat32();
  var angle = goog.vec.Quaternion.toAngleAxis(q, axis);

  assertElementsRoughlyEqual([0, 1, 0], axis, goog.vec.EPSILON);
  assertRoughlyEquals(Math.PI / 2, angle, goog.vec.EPSILON);
}

function testRotateZ() {
  var q = goog.vec.Quaternion.createIdentityFloat32();
  goog.vec.Quaternion.rotateZ(q, Math.PI / 2, q);

  var axis = goog.vec.Vec3.createFloat32();
  var angle = goog.vec.Quaternion.toAngleAxis(q, axis);

  assertElementsRoughlyEqual([0, 0, 1], axis, goog.vec.EPSILON);
  assertRoughlyEquals(Math.PI / 2, angle, goog.vec.EPSILON);
}

function testTransformVec() {
  var q = goog.vec.Quaternion.createIdentityFloat32();
  goog.vec.Quaternion.rotateX(q, Math.PI / 2, q);

  var v0 = goog.vec.vec3f.setFromArray(goog.vec.vec3f.create(), [0, 0, 1]);
  var v1 = goog.vec.vec3f.create();

  goog.vec.Quaternion.transformVec(v0, q, v1);
  assertElementsRoughlyEqual([0, -1, 0], v1, goog.vec.EPSILON);
}

function testSlerp() {
  var q0 = goog.vec.Quaternion.createFloat32FromValues(1, 2, 3, 4);
  var q1 = goog.vec.Quaternion.createFloat32FromValues(5, -6, 7, -8);
  var q2 = goog.vec.Quaternion.createFloat32();

  goog.vec.Quaternion.slerp(q0, q1, 0, q2);
  assertElementsEquals([5, -6, 7, -8], q2);

  goog.vec.Quaternion.normalize(q0, q0);
  goog.vec.Quaternion.normalize(q1, q1);

  goog.vec.Quaternion.slerp(q0, q0, .5, q2);
  assertElementsEquals(q0, q2);

  goog.vec.Quaternion.slerp(q0, q1, 0, q2);
  assertElementsEquals(q0, q2);

  goog.vec.Quaternion.slerp(q0, q1, 1, q2);
  if (q1[3] * q2[3] < 0) {
    goog.vec.Quaternion.negate(q2, q2);
  }
  assertElementsEquals(q1, q2);

  goog.vec.Quaternion.slerp(q0, q1, .3, q2);
  assertElementsRoughlyEqual(
      [-0.000501537327541, 0.4817612034640, 0.2398775270769, 0.842831337398],
      q2, goog.vec.EPSILON);

  goog.vec.Quaternion.slerp(q0, q1, .5, q2);
  assertElementsRoughlyEqual(
      [-0.1243045421171, 0.51879732466, 0.0107895780990, 0.845743047108],
      q2, goog.vec.EPSILON);

  goog.vec.Quaternion.slerp(q0, q1, .8, q0);
  assertElementsRoughlyEqual(
      [-0.291353561485, 0.506925588797, -0.3292443285721, 0.741442999653],
      q0, goog.vec.EPSILON);
}

function testFromRotMatrix() {
  var m0 = goog.vec.Mat3.createFloat32FromValues(
      -0.408248, 0.8796528, -0.244016935,
      -0.4082482, 0.06315623, 0.9106836,
      0.8164965, 0.47140452, 0.3333333);
  var q0 = goog.vec.Quaternion.createFloat32();
  goog.vec.Quaternion.fromRotationMatrix3(m0, q0);
  assertElementsRoughlyEqual(
      [0.22094256606638, 0.53340203646030, 0.64777022739548, 0.497051689967954],
      q0, goog.vec.EPSILON);

  var m1 = goog.vec.Mat3.createFloat32FromValues(
      -0.544310, 0, 0.838884, 0, 1, 0, -0.838884, 0, -0.544310);
  var q1 = goog.vec.Quaternion.createFloat32();
  goog.vec.Quaternion.fromRotationMatrix3(m1, q1);
  assertElementsRoughlyEqual(
      [0, -0.87872350215912, 0, 0.477331042289734], q1, goog.vec.EPSILON);

  var m2 = goog.vec.Mat4.createFloat32FromValues(
      -0.408248, 0.8796528, -0.244016935, 0, -0.4082482, 0.06315623, 0.9106836,
      0, 0.8164965, 0.47140452, 0.3333333, 0, 0, 0, 0, 1);
  var q2 = goog.vec.Quaternion.createFloat32();
  goog.vec.Quaternion.fromRotationMatrix4(m2, q2);
  assertElementsRoughlyEqual(
      [0.22094256606638, 0.53340203646030, 0.64777022739548, 0.497051689967954],
      q2, goog.vec.EPSILON);

  var m3 = goog.vec.Mat4.createFloat32FromValues(
      -0.544310, 0, 0.838884, 0, 0, 1, 0, 0, -0.838884, 0, -0.544310, 0, 0, 0,
      0, 1);
  var q3 = goog.vec.Quaternion.createFloat32();
  goog.vec.Quaternion.fromRotationMatrix4(m3, q3);
  assertElementsRoughlyEqual(
      [0, -0.87872350215912, 0, 0.477331042289734], q3, goog.vec.EPSILON);

  assertElementsRoughlyEqual(q0, q2, goog.vec.EPSILON);
  assertElementsRoughlyEqual(q1, q3, goog.vec.EPSILON);
}

function testToRotMatrix() {
  var q0 = goog.vec.Quaternion.createFloat32FromValues(
      0.22094256606638, 0.53340203646030,
      0.64777022739548, 0.497051689967954);
  var m0 = goog.vec.Mat3.createFloat32();
  goog.vec.Quaternion.toRotationMatrix3(q0, m0);

  assertElementsRoughlyEqual(
      [-0.408248, 0.8796528, -0.244016935,
       -0.4082482, 0.06315623, 0.9106836,
       0.8164965, 0.47140452, 0.3333333],
      m0, goog.vec.EPSILON);

  var m1 = goog.vec.Mat4.createFloat32();
  goog.vec.Quaternion.toRotationMatrix4(q0, m1);

  assertElementsRoughlyEqual(
      [-0.408248, 0.8796528, -0.244016935, 0,
       -0.4082482, 0.06315623, 0.9106836, 0,
       0.8164965, 0.47140452, 0.3333333, 0,
       0, 0, 0, 1],
      m1, goog.vec.EPSILON);
}

function testToAngleAxis() {
  // Test the identity rotation.
  var q0 = goog.vec.Quaternion.createFloat32FromValues(0, 0, 0, 1);
  var axis = goog.vec.Vec3.createFloat32();
  var angle = goog.vec.Quaternion.toAngleAxis(q0, axis);
  assertRoughlyEquals(0.0, angle, goog.vec.EPSILON);
  assertElementsRoughlyEqual([1, 0, 0], axis, goog.vec.EPSILON);

  // Check equivalent representations of the same rotation.
  goog.vec.Quaternion.setFromValues(
      q0, -0.288675032, 0.622008682, -0.17254543, 0.70710678);
  angle = goog.vec.Quaternion.toAngleAxis(q0, axis);
  assertRoughlyEquals(Math.PI / 2, angle, goog.vec.EPSILON);
  assertElementsRoughlyEqual([-0.408248, 0.8796528, -0.244016],
                             axis, goog.vec.EPSILON);
  // The polar opposite unit quaternion is the same rotation, so we
  // check that the negated quaternion yields the negated angle and axis.
  goog.vec.Quaternion.negate(q0, q0);
  angle = goog.vec.Quaternion.toAngleAxis(q0, axis);
  assertRoughlyEquals(-Math.PI / 2, angle, goog.vec.EPSILON);
  assertElementsRoughlyEqual([0.408248, -0.8796528, 0.244016],
                             axis, goog.vec.EPSILON);

  // Verify that the inverse rotation yields the inverse axis.
  goog.vec.Quaternion.conjugate(q0, q0);
  angle = goog.vec.Quaternion.toAngleAxis(q0, axis);
  assertRoughlyEquals(-Math.PI / 2, angle, goog.vec.EPSILON);
  assertElementsRoughlyEqual([-0.408248, 0.8796528, -0.244016],
                             axis, goog.vec.EPSILON);
}

function testFromAngleAxis() {
  // Test identity rotation (zero angle or multiples of TWO_PI).
  var angle = 0.0;
  var axis = goog.vec.Vec3.createFloat32FromValues(-0.408248, 0.8796528,
                                                   -0.244016);
  var q0 = goog.vec.Quaternion.createFloat32();
  goog.vec.Quaternion.fromAngleAxis(angle, axis, q0);
  assertElementsRoughlyEqual([0, 0, 0, 1], q0, goog.vec.EPSILON);
  angle = 4 * Math.PI;
  goog.vec.Quaternion.fromAngleAxis(angle, axis, q0);
  assertElementsRoughlyEqual([0, 0, 0, 1], q0, goog.vec.EPSILON);

  // General test of various rotations around axes of different lengths.
  angle = Math.PI / 2;
  goog.vec.Quaternion.fromAngleAxis(angle, axis, q0);
  assertElementsRoughlyEqual(
      [-0.288675032, 0.622008682, -0.17254543, 0.70710678],
      q0, goog.vec.EPSILON);
  // Angle multiples of TWO_PI with a scaled axis should be the same.
  angle += 4 * Math.PI;
  goog.vec.Vec3.scale(axis, 7.0, axis);
  goog.vec.Quaternion.fromAngleAxis(angle, axis, q0);
  assertElementsRoughlyEqual(
      [-0.288675032, 0.622008682, -0.17254543, 0.70710678],
      q0, goog.vec.EPSILON);
  goog.vec.Vec3.setFromValues(axis, 1, 5, 8);
  goog.vec.Quaternion.fromAngleAxis(angle, axis, q0);
  assertElementsRoughlyEqual(
      [0.074535599, 0.372677996, 0.596284794, 0.70710678],
      q0, goog.vec.EPSILON);

  // Check equivalent representations of the same rotation.
  angle = Math.PI / 5;
  goog.vec.Vec3.setFromValues(axis, 5, -2, -10);
  goog.vec.Quaternion.fromAngleAxis(angle, axis, q0);
  assertElementsRoughlyEqual(
      [0.136037146, -0.0544148586, -0.27207429, 0.951056516],
      q0, goog.vec.EPSILON);
  // The negated angle and axis should yield the same rotation.
  angle = -Math.PI / 5;
  goog.vec.Vec3.negate(axis, axis);
  goog.vec.Quaternion.fromAngleAxis(angle, axis, q0);
  assertElementsRoughlyEqual(
      [0.136037146, -0.0544148586, -0.27207429, 0.951056516],
      q0, goog.vec.EPSILON);
}
