// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('goog.math.Vec3Test');
goog.setTestOnly('goog.math.Vec3Test');

goog.require('goog.math.Coordinate3');
goog.require('goog.math.Vec3');
goog.require('goog.testing.jsunit');

function assertVec3Equals(a, b) {
  assertTrue(b + ' should be equal to ' + a, goog.math.Vec3.equals(a, b));
}

function testVec3() {
  var v = new goog.math.Vec3(3.14, 2.78, -7.21);
  assertEquals(3.14, v.x);
  assertEquals(2.78, v.y);
  assertEquals(-7.21, v.z);
}


function testRandomUnit() {
  var a = goog.math.Vec3.randomUnit();
  assertRoughlyEquals(1.0, a.magnitude(), 1e-10);
}


function testRandom() {
  var a = goog.math.Vec3.random();
  assertTrue(a.magnitude() <= 1.0);
}


function testFromCoordinate3() {
  var a = new goog.math.Coordinate3(-2, 10, 4);
  var b = goog.math.Vec3.fromCoordinate3(a);
  assertEquals(-2, b.x);
  assertEquals(10, b.y);
  assertEquals(4, b.z);
}


function testClone() {
  var a = new goog.math.Vec3(1, 2, 5);
  var b = a.clone();

  assertEquals(a.x, b.x);
  assertEquals(a.y, b.y);
  assertEquals(a.z, b.z);
}


function testMagnitude() {
  var a = new goog.math.Vec3(0, 10, 0);
  var b = new goog.math.Vec3(3, 4, 5);
  var c = new goog.math.Vec3(-4, 3, 8);

  assertEquals(10, a.magnitude());
  assertEquals(Math.sqrt(50), b.magnitude());
  assertEquals(Math.sqrt(89), c.magnitude());
}


function testSquaredMagnitude() {
  var a = new goog.math.Vec3(-3, -4, -5);
  assertEquals(50, a.squaredMagnitude());
}


function testScale() {
  var a = new goog.math.Vec3(1, 2, 3);
  a.scale(0.5);

  assertEquals(0.5, a.x);
  assertEquals(1, a.y);
  assertEquals(1.5, a.z);
}


function testInvert() {
  var a = new goog.math.Vec3(3, 4, 5);
  a.invert();

  assertEquals(-3, a.x);
  assertEquals(-4, a.y);
  assertEquals(-5, a.z);
}


function testNormalize() {
  var a = new goog.math.Vec3(5, 5, 5);
  a.normalize();
  assertRoughlyEquals(1.0, a.magnitude(), 1e-10);
}


function testAdd() {
  var a = new goog.math.Vec3(1, -1, 7);
  a.add(new goog.math.Vec3(3, 3, 3));
  assertVec3Equals(new goog.math.Vec3(4, 2, 10), a);
}


function testSubtract() {
  var a = new goog.math.Vec3(1, -1, 4);
  a.subtract(new goog.math.Vec3(3, 3, 3));
  assertVec3Equals(new goog.math.Vec3(-2, -4, 1), a);
}


function testEquals() {
  var a = new goog.math.Vec3(1, 2, 5);

  assertFalse(a.equals(null));
  assertFalse(a.equals(new goog.math.Vec3(1, 3, 5)));
  assertFalse(a.equals(new goog.math.Vec3(2, 2, 2)));

  assertTrue(a.equals(a));
  assertTrue(a.equals(new goog.math.Vec3(1, 2, 5)));
}


function testSum() {
  var a = new goog.math.Vec3(0.5, 0.25, 1.2);
  var b = new goog.math.Vec3(0.5, 0.75, -0.6);

  var c = goog.math.Vec3.sum(a, b);
  assertVec3Equals(new goog.math.Vec3(1, 1, 0.6), c);
}


function testDifference() {
  var a = new goog.math.Vec3(0.5, 0.25, 3);
  var b = new goog.math.Vec3(0.5, 0.75, 5);

  var c = goog.math.Vec3.difference(a, b);
  assertVec3Equals(new goog.math.Vec3(0, -0.5, -2), c);
}


function testDistance() {
  var a = new goog.math.Vec3(3, 4, 5);
  var b = new goog.math.Vec3(-3, -4, 5);

  assertEquals(10, goog.math.Vec3.distance(a, b));
}


function testSquaredDistance() {
  var a = new goog.math.Vec3(3, 4, 5);
  var b = new goog.math.Vec3(-3, -4, 5);

  assertEquals(100, goog.math.Vec3.squaredDistance(a, b));
}


function testVec3Equals() {
  assertTrue(goog.math.Vec3.equals(null, null, null));
  assertFalse(goog.math.Vec3.equals(null, new goog.math.Vec3()));

  var a = new goog.math.Vec3(1, 3, 5);
  assertTrue(goog.math.Vec3.equals(a, a));
  assertTrue(goog.math.Vec3.equals(a, new goog.math.Vec3(1, 3, 5)));
  assertFalse(goog.math.Vec3.equals(1, new goog.math.Vec3(3, 1, 5)));
}


function testDot() {
  var a = new goog.math.Vec3(0, 5, 2);
  var b = new goog.math.Vec3(3, 0, 5);
  assertEquals(10, goog.math.Vec3.dot(a, b));

  var c = new goog.math.Vec3(-5, -5, 5);
  var d = new goog.math.Vec3(0, 7, -2);
  assertEquals(-45, goog.math.Vec3.dot(c, d));
}


function testCross() {
  var a = new goog.math.Vec3(3, 0, 0);
  var b = new goog.math.Vec3(0, 2, 0);
  assertVec3Equals(new goog.math.Vec3(0, 0, 6), goog.math.Vec3.cross(a, b));

  var c = new goog.math.Vec3(1, 2, 3);
  var d = new goog.math.Vec3(4, 5, 6);
  assertVec3Equals(new goog.math.Vec3(-3, 6, -3), goog.math.Vec3.cross(c, d));
}


function testLerp() {
  var a = new goog.math.Vec3(0, 0, 0);
  var b = new goog.math.Vec3(10, 10, 10);

  for (var i = 0; i <= 10; i++) {
    var c = goog.math.Vec3.lerp(a, b, i / 10);
    assertEquals(i, c.x);
    assertEquals(i, c.y);
    assertEquals(i, c.z);
  }
}
