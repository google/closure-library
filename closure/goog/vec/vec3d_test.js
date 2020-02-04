/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////
//                                                                           //
// Any edits to this file must be applied to vec3f_test.js by running:       //
//   swap_type.sh vec3d_test.js > vec3f_test.js                              //
//                                                                           //
////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////

goog.module('goog.vec.vec3dTest');
goog.setTestOnly();

const testSuite = goog.require('goog.testing.testSuite');
const vec3d = goog.require('goog.vec.vec3d');

testSuite({
  testCreate() {
    const v = vec3d.create();
    assertElementsEquals([0, 0, 0], v);
  },

  testCreateFromArray() {
    const v = vec3d.createFromArray([1, 2, 3]);
    assertElementsEquals([1, 2, 3], v);
  },

  testCreateFromValues() {
    const v = vec3d.createFromValues(1, 2, 3);
    assertElementsEquals([1, 2, 3], v);
  },

  testClone() {
    const v0 = vec3d.createFromValues(1, 2, 3);
    const v1 = vec3d.clone(v0);
    assertElementsEquals([1, 2, 3], v1);
  },

  testSet() {
    const v = vec3d.create();
    vec3d.setFromValues(v, 1, 2, 3);
    assertElementsEquals([1, 2, 3], v);

    vec3d.setFromArray(v, [4, 5, 6]);
    assertElementsEquals([4, 5, 6], v);

    const w = vec3d.create();
    vec3d.setFromValues(w, 1, 2, 3);
    assertElementsEquals([1, 2, 3], w);

    vec3d.setFromArray(w, [4, 5, 6]);
    assertElementsEquals([4, 5, 6], w);
  },

  testAdd() {
    const v0 = vec3d.setFromArray(vec3d.create(), [1, 2, 3]);
    const v1 = vec3d.setFromArray(vec3d.create(), [4, 5, 6]);
    const v2 = vec3d.setFromVec3d(vec3d.create(), v0);

    vec3d.add(v2, v1, v2);
    assertElementsEquals([1, 2, 3], v0);
    assertElementsEquals([4, 5, 6], v1);
    assertElementsEquals([5, 7, 9], v2);

    vec3d.add(vec3d.add(v0, v1, v2), v0, v2);
    assertElementsEquals([6, 9, 12], v2);
  },

  testSubtract() {
    const v0 = vec3d.setFromArray(vec3d.create(), [1, 2, 3]);
    const v1 = vec3d.setFromArray(vec3d.create(), [4, 5, 6]);
    let v2 = vec3d.setFromVec3d(vec3d.create(), v0);

    vec3d.subtract(v2, v1, v2);
    assertElementsEquals([1, 2, 3], v0);
    assertElementsEquals([4, 5, 6], v1);
    assertElementsEquals([-3, -3, -3], v2);

    vec3d.setFromValues(v2, 0, 0, 0);
    vec3d.subtract(v1, v0, v2);
    assertElementsEquals([3, 3, 3], v2);

    v2 = vec3d.setFromVec3d(vec3d.create(), v0);
    vec3d.subtract(v2, v1, v2);
    assertElementsEquals([-3, -3, -3], v2);

    vec3d.subtract(vec3d.subtract(v1, v0, v2), v0, v2);
    assertElementsEquals([2, 1, 0], v2);
  },

  testNegate() {
    const v0 = vec3d.setFromArray(vec3d.create(), [1, 2, 3]);
    const v1 = vec3d.create();

    vec3d.negate(v0, v1);
    assertElementsEquals([-1, -2, -3], v1);
    assertElementsEquals([1, 2, 3], v0);

    vec3d.negate(v0, v0);
    assertElementsEquals([-1, -2, -3], v0);
  },

  testAbs() {
    const v0 = vec3d.setFromArray(vec3d.create(), [-1, -2, -3]);
    const v1 = vec3d.create();

    vec3d.abs(v0, v1);
    assertElementsEquals([1, 2, 3], v1);
    assertElementsEquals([-1, -2, -3], v0);

    vec3d.abs(v0, v0);
    assertElementsEquals([1, 2, 3], v0);
  },

  testScale() {
    const v0 = vec3d.setFromArray(vec3d.create(), [1, 2, 3]);
    const v1 = vec3d.create();

    vec3d.scale(v0, 4, v1);
    assertElementsEquals([4, 8, 12], v1);
    assertElementsEquals([1, 2, 3], v0);

    vec3d.setFromArray(v1, v0);
    vec3d.scale(v1, 5, v1);
    assertElementsEquals([5, 10, 15], v1);
  },

  testMagnitudeSquared() {
    const v0 = vec3d.setFromArray(vec3d.create(), [1, 2, 3]);
    assertEquals(14, vec3d.magnitudeSquared(v0));
  },

  testMagnitude() {
    const v0 = vec3d.setFromArray(vec3d.create(), [1, 2, 3]);
    assertEquals(Math.sqrt(14), vec3d.magnitude(v0));
  },

  testNormalize() {
    const v0 = vec3d.setFromArray(vec3d.create(), [2, 3, 4]);
    const v1 = vec3d.create();
    const v2 = vec3d.create();
    vec3d.scale(v0, 1 / vec3d.magnitude(v0), v2);

    vec3d.normalize(v0, v1);
    assertElementsEquals(v2, v1);
    assertElementsEquals([2, 3, 4], v0);

    vec3d.setFromArray(v1, v0);
    vec3d.normalize(v1, v1);
    assertElementsEquals(v2, v1);
  },

  testDot() {
    const v0 = vec3d.setFromArray(vec3d.create(), [1, 2, 3]);
    const v1 = vec3d.setFromArray(vec3d.create(), [4, 5, 6]);
    assertEquals(32, vec3d.dot(v0, v1));
    assertEquals(32, vec3d.dot(v1, v0));
  },

  testCross() {
    const v0 = vec3d.setFromArray(vec3d.create(), [1, 2, 3]);
    const v1 = vec3d.setFromArray(vec3d.create(), [4, 5, 6]);
    const crossVec = vec3d.create();

    vec3d.cross(v0, v1, crossVec);
    assertElementsEquals([1, 2, 3], v0);
    assertElementsEquals([4, 5, 6], v1);
    assertElementsEquals([-3, 6, -3], crossVec);

    vec3d.setFromArray(crossVec, v1);
    vec3d.cross(crossVec, v0, crossVec);
    assertElementsEquals([1, 2, 3], v0);
    assertElementsEquals([4, 5, 6], v1);
    assertElementsEquals([3, -6, 3], crossVec);

    vec3d.cross(v0, v0, v0);
    assertElementsEquals([0, 0, 0], v0);
  },

  testDistanceSquared() {
    const v0 = vec3d.setFromValues(vec3d.create(), 1, 2, 3);
    const v1 = vec3d.setFromValues(vec3d.create(), 1, 2, 3);
    assertEquals(0, vec3d.distanceSquared(v0, v1));
    vec3d.setFromValues(v0, 1, 2, 3);
    vec3d.setFromValues(v1, -1, -2, -1);
    assertEquals(36, vec3d.distanceSquared(v0, v1));
  },

  testDistance() {
    const v0 = vec3d.setFromValues(vec3d.create(), 1, 2, 3);
    const v1 = vec3d.setFromValues(vec3d.create(), 1, 2, 3);
    assertEquals(0, vec3d.distance(v0, v1));
    vec3d.setFromValues(v0, 1, 2, 3);
    vec3d.setFromValues(v1, -1, -2, -1);
    assertEquals(6, vec3d.distance(v0, v1));
  },

  testDirection() {
    const v0 = vec3d.setFromValues(vec3d.create(), 1, 2, 3);
    const v1 = vec3d.setFromValues(vec3d.create(), 1, 2, 3);
    const dirVec = vec3d.setFromValues(vec3d.create(), 4, 5, 6);
    vec3d.direction(v0, v1, dirVec);
    assertElementsEquals([0, 0, 0], dirVec);
    vec3d.setFromValues(v0, 0, 0, 0);
    vec3d.setFromValues(v1, 1, 0, 0);
    vec3d.direction(v0, v1, dirVec);
    assertElementsEquals([1, 0, 0], dirVec);
    vec3d.setFromValues(v0, 1, 1, 1);
    vec3d.setFromValues(v1, 0, 0, 0);
    vec3d.direction(v0, v1, dirVec);
    assertElementsRoughlyEqual(
        [-0.5773502588272095, -0.5773502588272095, -0.5773502588272095], dirVec,
        goog.vec.EPSILON);
  },

  testLerp() {
    const v0 = vec3d.setFromValues(vec3d.create(), 1, 2, 3);
    const v1 = vec3d.setFromValues(vec3d.create(), 10, 20, 30);
    const v2 = vec3d.setFromVec3d(vec3d.create(), v0);

    vec3d.lerp(v2, v1, 0, v2);
    assertElementsEquals([1, 2, 3], v2);
    vec3d.lerp(v2, v1, 1, v2);
    assertElementsEquals([10, 20, 30], v2);
    vec3d.lerp(v0, v1, .5, v2);
    assertElementsEquals([5.5, 11, 16.5], v2);
  },

  testSlerp() {
    const v0 = vec3d.setFromValues(vec3d.create(), 0, 0, 1);
    const v1 = vec3d.setFromValues(vec3d.create(), 1, 0, 0);
    const v2 = vec3d.setFromValues(vec3d.create(), -1, 0, 0);
    const v3 = vec3d.setFromValues(vec3d.create(), -5, 0, 0);
    const v4 = vec3d.setFromValues(vec3d.create(), 0, 0, -1);
    let v5 = vec3d.setFromVec3d(vec3d.create(), v0);

    // Try f == 0 and f == 1.
    vec3d.slerp(v5, v1, 0, v5);
    assertElementsEquals([0, 0, 1], v5);
    vec3d.slerp(v5, v1, 1, v5);
    assertElementsEquals([1, 0, 0], v5);

    // Try slerp between perpendicular vectors.
    vec3d.slerp(v0, v1, .5, v5);
    assertElementsRoughlyEqual(
        [Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2], v5, goog.vec.EPSILON);

    // Try slerp between vectors of opposite directions (+Z and -Z).
    v5 = vec3d.slerp(v0, v4, .5, v5);
    // Axis of rotation is arbitrary, but result should be 90 degrees from both
    // v0 and v4 when f = 0.5.
    assertRoughlyEquals(
        Math.PI / 2, Math.acos(vec3d.dot(v5, v0)), goog.vec.EPSILON);
    assertRoughlyEquals(
        Math.PI / 2, Math.acos(vec3d.dot(v5, v4)), goog.vec.EPSILON);

    // f == 0.25, result should be 45-degrees to v0, and 135 to v4.
    v5 = vec3d.slerp(v0, v4, .25, v5);
    assertRoughlyEquals(
        Math.PI / 4, Math.acos(vec3d.dot(v5, v0)), goog.vec.EPSILON);
    assertRoughlyEquals(
        Math.PI * 3 / 4, Math.acos(vec3d.dot(v5, v4)), goog.vec.EPSILON);

    // f = 0.75, result should be 135-degrees to v0, and 45 to v4.
    v5 = vec3d.slerp(v0, v4, .75, v5);
    assertRoughlyEquals(
        Math.PI * 3 / 4, Math.acos(vec3d.dot(v5, v0)), goog.vec.EPSILON);
    assertRoughlyEquals(
        Math.PI / 4, Math.acos(vec3d.dot(v5, v4)), goog.vec.EPSILON);

    // Same as above, but on opposite directions of the X-axis.
    v5 = vec3d.slerp(v1, v2, .5, v5);
    // Axis of rotation is arbitrary, but result should be 90 degrees from both
    // v1 and v2 when f = 0.5.
    assertRoughlyEquals(
        Math.PI / 2, Math.acos(vec3d.dot(v5, v1)), goog.vec.EPSILON);
    assertRoughlyEquals(
        Math.PI / 2, Math.acos(vec3d.dot(v5, v2)), goog.vec.EPSILON);

    // f == 0.25, result should be 45-degrees to v1, and 135 to v2.
    v5 = vec3d.slerp(v1, v2, .25, v5);
    assertRoughlyEquals(
        Math.PI / 4, Math.acos(vec3d.dot(v5, v1)), goog.vec.EPSILON);
    assertRoughlyEquals(
        Math.PI * 3 / 4, Math.acos(vec3d.dot(v5, v2)), goog.vec.EPSILON);

    // f = 0.75, result should be 135-degrees to v1, and 45 to v2.
    v5 = vec3d.slerp(v1, v2, .75, v5);
    assertRoughlyEquals(
        Math.PI * 3 / 4, Math.acos(vec3d.dot(v5, v1)), goog.vec.EPSILON);
    assertRoughlyEquals(
        Math.PI / 4, Math.acos(vec3d.dot(v5, v2)), goog.vec.EPSILON);

    // Try vectors that aren't perpendicular or opposite/same direction.
    const v6 = vec3d.setFromValues(
        vec3d.create(), Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
    vec3d.slerp(v1, v6, .9, v5);

    // The vectors are 45 degrees apart, for f == 0.9, results should be 1/10 of
    // that from v6 and 9/10 of that away from v1.
    assertRoughlyEquals(
        (Math.PI / 4) * 0.9, Math.acos(vec3d.dot(v1, v5)), goog.vec.EPSILON);
    assertRoughlyEquals(
        (Math.PI / 4) * 0.1, Math.acos(vec3d.dot(v6, v5)), goog.vec.EPSILON);

    // Between vectors of the same direction, where one is non-unit-length
    // (magnitudes should be lerp-ed).
    vec3d.slerp(v2, v3, .5, v5);
    assertElementsEquals([-3, 0, 0], v5);

    // Between perpendicular vectors, where one is non-unit length.
    vec3d.slerp(v0, v3, .5, v5);
    assertRoughlyEquals(3, vec3d.magnitude(v5), goog.vec.EPSILON);
    assertElementsRoughlyEqual(
        [-3 * (Math.sqrt(2) / 2), 0, 3 * (Math.sqrt(2) / 2)], v5,
        goog.vec.EPSILON);

    // And vectors of opposite directions, where one is non-unit length.
    vec3d.slerp(v1, v3, .5, v5);
    // Axis of rotation is arbitrary, but result should be 90 degrees from both
    // v1 and v3.
    assertRoughlyEquals(
        Math.PI / 2,
        Math.acos(
            vec3d.dot(v5, v1) / (vec3d.magnitude(v5) * vec3d.magnitude(v1))),
        goog.vec.EPSILON);
    assertRoughlyEquals(
        Math.PI / 2,
        Math.acos(
            vec3d.dot(v5, v3) / (vec3d.magnitude(v3) * vec3d.magnitude(v5))),
        goog.vec.EPSILON);
    // Magnitude should be linearly interpolated.
    assertRoughlyEquals(3, vec3d.magnitude(v5), goog.vec.EPSILON);

    // Try a case where the vectors are the same direction (the same vector in
    // this case), but where numerical error results in a dot product
    // slightly greater than 1. Taking the acos of this would result in NaN.
    const v7 = vec3d.setFromValues(vec3d.create(), 0.009, 0.147, 0.989);
    vec3d.slerp(v7, v7, .25, v5);
    assertElementsRoughlyEqual([v7[0], v7[1], v7[2]], v5, goog.vec.EPSILON);
  },

  testMax() {
    const v0 = vec3d.setFromValues(vec3d.create(), 10, 20, 30);
    const v1 = vec3d.setFromValues(vec3d.create(), 5, 25, 35);
    const v2 = vec3d.create();

    vec3d.max(v0, v1, v2);
    assertElementsEquals([10, 25, 35], v2);
    vec3d.max(v1, v0, v1);
    assertElementsEquals([10, 25, 35], v1);
    vec3d.max(v2, 20, v2);
    assertElementsEquals([20, 25, 35], v2);
  },

  testMin() {
    const v0 = vec3d.setFromValues(vec3d.create(), 10, 20, 30);
    const v1 = vec3d.setFromValues(vec3d.create(), 5, 25, 35);
    const v2 = vec3d.create();

    vec3d.min(v0, v1, v2);
    assertElementsEquals([5, 20, 30], v2);
    vec3d.min(v1, v0, v1);
    assertElementsEquals([5, 20, 30], v1);
    vec3d.min(v2, 20, v2);
    assertElementsEquals([5, 20, 20], v2);
  },

  testEquals() {
    const v0 = vec3d.setFromValues(vec3d.create(), 1, 2, 3);
    let v1 = vec3d.setFromVec3d(vec3d.create(), v0);
    assertElementsEquals(v0, v1);

    v1[0] = 4;
    assertFalse(vec3d.equals(v0, v1));

    v1 = vec3d.setFromVec3d(vec3d.create(), v0);
    v1[1] = 4;
    assertFalse(vec3d.equals(v0, v1));

    v1 = vec3d.setFromVec3d(vec3d.create(), v0);
    v1[2] = 4;
    assertFalse(vec3d.equals(v0, v1));
  },
});
