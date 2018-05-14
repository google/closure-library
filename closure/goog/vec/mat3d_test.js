// Copyright 2013 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////
//                                                                           //
// Any edits to this file must be applied to mat3f_test.js by running:       //
//   swap_type.sh mat3d_test.js > mat3f_test.js                              //
//                                                                           //
////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////

goog.provide('goog.vec.mat3dTest');
goog.setTestOnly('goog.vec.mat3dTest');

goog.require('goog.testing.jsunit');
goog.require('goog.vec.mat3d');

var randommat3d = goog.vec.mat3d.setFromValues(goog.vec.mat3d.create(),
    0.8025078773498535,
    0.7559120655059814,
    0.15274643898010254,
    0.19196106493473053,
    0.0890120416879654,
    0.15422114729881287,
    0.09754583984613419,
    0.44862601161003113,
    0.9196512699127197);

function testCreate() {
  var m = goog.vec.mat3d.create();
  assertElementsEquals([0, 0, 0, 0, 0, 0, 0, 0, 0], m);
}

function testCreateIdentity() {
  var m = goog.vec.mat3d.createIdentity();
  assertElementsEquals([1, 0, 0, 0, 1, 0, 0, 0, 1], m);
}

function testSet() {
  var m0 = goog.vec.mat3d.create();
  var m1 = goog.vec.mat3d.setFromArray(
      goog.vec.mat3d.create(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  goog.vec.mat3d.setFromArray(m0, m1);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m0);

  goog.vec.mat3d.setFromValues(m0, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  assertElementsEquals([2, 3, 4, 5, 6, 7, 8, 9, 10], m0);
}

function testSetDiagonal() {
  var m0 = goog.vec.mat3d.create();
  goog.vec.mat3d.setDiagonalValues(m0, 1, 2, 3);
  assertElementsEquals([1, 0, 0, 0, 2, 0, 0, 0, 3], m0);

  goog.vec.mat3d.setDiagonal(m0, [4, 5, 6]);
  assertElementsEquals([4, 0, 0, 0, 5, 0, 0, 0, 6], m0);
}

function testSetGetColumn() {
  var m0 = goog.vec.mat3d.create();
  goog.vec.mat3d.setColumn(m0, 0, [1, 2, 3]);
  goog.vec.mat3d.setColumn(m0, 1, [4, 5, 6]);
  goog.vec.mat3d.setColumn(m0, 2, [7, 8, 9]);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m0);

  var v0 = [0, 0, 0];
  goog.vec.mat3d.getColumn(m0, 0, v0);
  assertElementsEquals([1, 2, 3], v0);
  goog.vec.mat3d.getColumn(m0, 1, v0);
  assertElementsEquals([4, 5, 6], v0);
  goog.vec.mat3d.getColumn(m0, 2, v0);
  assertElementsEquals([7, 8, 9], v0);
}

function testSetGetColumns() {
  var m0 = goog.vec.mat3d.create();
  goog.vec.mat3d.setColumns(m0, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m0);

  var v0 = [0, 0, 0], v1 = [0, 0, 0], v2 = [0, 0, 0];
  goog.vec.mat3d.getColumns(m0, v0, v1, v2);
  assertElementsEquals([1, 2, 3], v0);
  assertElementsEquals([4, 5, 6], v1);
  assertElementsEquals([7, 8, 9], v2);
}

function testSetGetRow() {
  var m0 = goog.vec.mat3d.create();
  goog.vec.mat3d.setRow(m0, 0, [1, 2, 3]);
  goog.vec.mat3d.setRow(m0, 1, [4, 5, 6]);
  goog.vec.mat3d.setRow(m0, 2, [7, 8, 9]);
  assertElementsEquals([1, 4, 7, 2, 5, 8, 3, 6, 9], m0);

  var v0 = [0, 0, 0];
  goog.vec.mat3d.getRow(m0, 0, v0);
  assertElementsEquals([1, 2, 3], v0);
  goog.vec.mat3d.getRow(m0, 1, v0);
  assertElementsEquals([4, 5, 6], v0);
  goog.vec.mat3d.getRow(m0, 2, v0);
  assertElementsEquals([7, 8, 9], v0);
}

function testSetGetRows() {
  var m0 = goog.vec.mat3d.create();
  goog.vec.mat3d.setRows(m0, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
  assertElementsEquals([1, 4, 7, 2, 5, 8, 3, 6, 9], m0);

  var v0 = [0, 0, 0], v1 = [0, 0, 0], v2 = [0, 0, 0];
  goog.vec.mat3d.getRows(m0, v0, v1, v2);
  assertElementsEquals([1, 2, 3], v0);
  assertElementsEquals([4, 5, 6], v1);
  assertElementsEquals([7, 8, 9], v2);
}

function testMakeZero() {
  var m0 = goog.vec.mat3d.setFromArray(
      goog.vec.mat3d.create(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m0);
  goog.vec.mat3d.makeZero(m0);
  assertElementsEquals([0, 0, 0, 0, 0, 0, 0, 0, 0], m0);
}

function testMakeIdentity() {
  var m0 = goog.vec.mat3d.create();
  goog.vec.mat3d.makeIdentity(m0);
  assertElementsEquals([1, 0, 0, 0, 1, 0, 0, 0, 1], m0);
}

function testSetGetElement() {
  var m0 = goog.vec.mat3d.create();
  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      var value = c * 3 + r + 1;
      goog.vec.mat3d.setElement(m0, r, c, value);
      assertEquals(value, goog.vec.mat3d.getElement(m0, r, c));
    }
  }
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m0);
}

function testAddMat() {
  var m0 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var m1 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 3, 4, 5, 6, 7, 8, 9, 1, 2);
  var m2 = goog.vec.mat3d.create();
  goog.vec.mat3d.addMat(m0, m1, m2);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m0);
  assertElementsEquals([3, 4, 5, 6, 7, 8, 9, 1, 2], m1);
  assertElementsEquals([4, 6, 8, 10, 12, 14, 16, 9, 11], m2);

  goog.vec.mat3d.addMat(m0, m1, m0);
  assertElementsEquals([3, 4, 5, 6, 7, 8, 9, 1, 2], m1);
  assertElementsEquals([4, 6, 8, 10, 12, 14, 16, 9, 11], m0);
}

function testSubMat() {
  var m0 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var m1 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 3, 4, 5, 6, 7, 8, 9, 1, 2);
  var m2 = goog.vec.mat3d.create();

  goog.vec.mat3d.subMat(m0, m1, m2);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m0);
  assertElementsEquals([3, 4, 5, 6, 7, 8, 9, 1, 2], m1);
  assertElementsEquals([-2, -2, -2, -2, -2, -2, -2, 7, 7], m2);

  goog.vec.mat3d.subMat(m1, m0, m1);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m0);
  assertElementsEquals([2, 2, 2, 2, 2, 2, 2, -7, -7], m1);
}

function testMultScalar() {
  var m0 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var m1 = goog.vec.mat3d.create();

  goog.vec.mat3d.multScalar(m0, 5, m1);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m0);
  assertElementsEquals([5, 10, 15, 20, 25, 30, 35, 40, 45], m1);

  goog.vec.mat3d.multScalar(m0, 5, m0);
  assertElementsEquals([5, 10, 15, 20, 25, 30, 35, 40, 45], m0);
}

function testMultMat() {
  var m0 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var m1 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var m2 = goog.vec.mat3d.create();

  goog.vec.mat3d.multMat(m0, m1, m2);
  assertElementsEquals([30, 36, 42, 66, 81, 96, 102, 126, 150], m2);

  goog.vec.mat3d.addMat(m0, m1, m1);
  goog.vec.mat3d.multMat(m0, m1, m1);
  assertElementsEquals([60, 72, 84, 132, 162, 192, 204, 252, 300], m1);
}

function testTranspose() {
  var m0 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var m1 = goog.vec.mat3d.create();
  goog.vec.mat3d.transpose(m0, m1);
  assertElementsEquals([1, 4, 7, 2, 5, 8, 3, 6, 9], m1);
  goog.vec.mat3d.transpose(m1, m1);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], m1);
}

function testInvert() {
  var m0 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 1, 1, 1, 1, 1, 1, 1, 1, 1);
  assertFalse(goog.vec.mat3d.invert(m0, m0));
  assertElementsEquals([1, 1, 1, 1, 1, 1, 1, 1, 1], m0);

  goog.vec.mat3d.setFromValues(m0, 1, 2, 3, 1, 3, 4, 3, 4, 5);
  assertTrue(goog.vec.mat3d.invert(m0, m0));
  assertElementsEquals([0.5, -1.0, 0.5, -3.5, 2.0, 0.5, 2.5, -1.0, -0.5], m0);

  goog.vec.mat3d.makeScale(m0, .01, .01, .01);
  assertTrue(goog.vec.mat3d.invert(m0, m0));
  var m1 = goog.vec.mat3d.create();
  goog.vec.mat3d.makeScale(m1, 100, 100, 100);
  assertElementsEquals(m1, m0);
}

function testEquals() {
  var m0 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var m1 = goog.vec.mat3d.setFromArray(goog.vec.mat3d.create(), m0);
  assertTrue(goog.vec.mat3d.equals(m0, m1));
  assertTrue(goog.vec.mat3d.equals(m1, m0));
  for (var i = 0; i < 9; i++) {
    m1[i] = 15;
    assertFalse(goog.vec.mat3d.equals(m0, m1));
    assertFalse(goog.vec.mat3d.equals(m1, m0));
    m1[i] = i + 1;
  }
}

function testMultVec3() {
  var m0 = goog.vec.mat3d.setFromValues(
      goog.vec.mat3d.create(), 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var v0 = [1, 2, 3];
  var v1 = [0, 0, 0];

  goog.vec.mat3d.multVec3(m0, v0, v1);
  assertElementsEquals([30, 36, 42], v1);
  goog.vec.mat3d.multVec3(m0, v0, v0);
  assertElementsEquals([30, 36, 42], v0);
}

function testSetValues() {
  var a0 = goog.vec.mat3d.create();
  assertElementsEquals([0, 0, 0, 0, 0, 0, 0, 0, 0], a0);
  goog.vec.mat3d.setFromValues(a0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], a0);

  var a1 = goog.vec.mat3d.create();
  goog.vec.mat3d.setDiagonalValues(a1, 1, 2, 3);
  assertElementsEquals([1, 0, 0, 0, 2, 0, 0, 0, 3], a1);

  goog.vec.mat3d.setColumnValues(a1, 0, 2, 3, 4);
  goog.vec.mat3d.setColumnValues(a1, 1, 5, 6, 7);
  goog.vec.mat3d.setColumnValues(a1, 2, 8, 9, 1);
  assertElementsEquals([2, 3, 4, 5, 6, 7, 8, 9, 1], a1);

  goog.vec.mat3d.setRowValues(a1, 0, 1, 4, 7);
  goog.vec.mat3d.setRowValues(a1, 1, 2, 5, 8);
  goog.vec.mat3d.setRowValues(a1, 2, 3, 6, 9);
  assertElementsEquals([1, 2, 3, 4, 5, 6, 7, 8, 9], a1);
}

function testMakeTranslate() {
  var m0 = goog.vec.mat3d.create();
  goog.vec.mat3d.makeTranslate(m0, 3, 4);
  assertElementsEquals([1, 0, 0, 0, 1, 0, 3, 4, 1], m0);
}

function testMakeScale() {
  var m0 = goog.vec.mat3d.create();
  goog.vec.mat3d.makeScale(m0, 3, 4, 5);
  assertElementsEquals([3, 0, 0, 0, 4, 0, 0, 0, 5], m0);
}

function testMakeRotate() {
  var m0 = goog.vec.mat3d.create();
  goog.vec.mat3d.makeRotate(m0, Math.PI / 2, 0, 0, 1);
  var v0 = [0, 1, 0, -1, 0, 0, 0, 0, 1];
  assertElementsRoughlyEqual(m0, v0, goog.vec.EPSILON);

  var m1 = goog.vec.mat3d.create();
  goog.vec.mat3d.makeRotate(m1, -Math.PI / 4, 0, 0, 1);
  goog.vec.mat3d.multMat(m0, m1, m1);
  var v1 = [0.7071068, 0.7071068, 0, -0.7071068, 0.7071068, 0, 0, 0, 1];
  assertElementsRoughlyEqual(m1, v1, goog.vec.EPSILON);
}

function testMakeRotateX() {
  var m0 = goog.vec.mat3d.create();
  var m1 = goog.vec.mat3d.create();

  goog.vec.mat3d.makeRotateX(m0, Math.PI / 7);
  goog.vec.mat3d.makeRotate(m1, Math.PI / 7, 1, 0, 0);
  assertElementsRoughlyEqual(m0, m1, goog.vec.EPSILON);
}

function testMakeRotateY() {
  var m0 = goog.vec.mat3d.create();
  var m1 = goog.vec.mat3d.create();

  goog.vec.mat3d.makeRotateY(m0, Math.PI / 7);
  goog.vec.mat3d.makeRotate(m1, Math.PI / 7, 0, 1, 0);
  assertElementsRoughlyEqual(m0, m1, goog.vec.EPSILON);
}

function testMakeRotateZ() {
  var m0 = goog.vec.mat3d.create();
  var m1 = goog.vec.mat3d.create();

  goog.vec.mat3d.makeRotateZ(m0, Math.PI / 7);
  goog.vec.mat3d.makeRotate(m1, Math.PI / 7, 0, 0, 1);
  assertElementsRoughlyEqual(m0, m1, goog.vec.EPSILON);
}

function testRotate() {
  var m0 = goog.vec.mat3d.makeIdentity(goog.vec.mat3d.create());
  goog.vec.mat3d.rotate(m0, Math.PI / 2, 0, 0, 1);
  assertElementsRoughlyEqual(
      [0, 1, 0, -1, 0, 0, 0, 0, 1],
      m0, goog.vec.EPSILON);

  goog.vec.mat3d.rotate(m0, -Math.PI / 4, 0, 0, 1);
  assertElementsRoughlyEqual(
      [0.7071068, 0.7071068, 0,
       -0.7071068, 0.7071068, 0,
       0, 0, 1],
      m0, goog.vec.EPSILON);
}

function testRotateX() {
  var m0 = goog.vec.mat3d.create();
  var m1 = goog.vec.mat3d.setFromArray(goog.vec.mat3d.create(), randommat3d);

  goog.vec.mat3d.makeRotateX(m0, Math.PI / 7);
  goog.vec.mat3d.multMat(m1, m0, m0);
  goog.vec.mat3d.rotateX(m1, Math.PI / 7);
  assertElementsRoughlyEqual(m0, m1, goog.vec.EPSILON);
}

function testRotateY() {
  var m0 = goog.vec.mat3d.create();
  var m1 = goog.vec.mat3d.setFromArray(goog.vec.mat3d.create(), randommat3d);

  goog.vec.mat3d.makeRotateY(m0, Math.PI / 7);
  goog.vec.mat3d.multMat(m1, m0, m0);
  goog.vec.mat3d.rotateY(m1, Math.PI / 7);
  assertElementsRoughlyEqual(m0, m1, goog.vec.EPSILON);
}

function testRotateZ() {
  var m0 = goog.vec.mat3d.create();
  var m1 = goog.vec.mat3d.setFromArray(goog.vec.mat3d.create(), randommat3d);

  goog.vec.mat3d.makeRotateZ(m0, Math.PI / 7);
  goog.vec.mat3d.multMat(m1, m0, m0);
  goog.vec.mat3d.rotateZ(m1, Math.PI / 7);
  assertElementsRoughlyEqual(m0, m1, goog.vec.EPSILON);
}

function testMakeEulerZXZ() {
  var m0 = goog.vec.mat3d.create();
  var roll = 0.200982 * 2 * Math.PI;
  var tilt = 0.915833 * Math.PI;
  var yaw = 0.839392 * 2 * Math.PI;

  goog.vec.mat3d.makeRotate(m0, roll, 0, 0, 1);
  goog.vec.mat3d.rotate(m0, tilt, 1, 0, 0);
  goog.vec.mat3d.rotate(m0, yaw, 0, 0, 1);

  var m1 = goog.vec.mat3d.create();
  goog.vec.mat3d.makeEulerZXZ(m1, roll, tilt, yaw);
  assertElementsRoughlyEqual(m0, m1, goog.vec.EPSILON);


  var euler = [0, 0, 0];
  goog.vec.mat3d.toEulerZXZ(m0, euler);

  assertRoughlyEquals(roll, euler[0], goog.vec.EPSILON);
  assertRoughlyEquals(tilt, euler[1], goog.vec.EPSILON);
  assertRoughlyEquals(yaw, euler[2], goog.vec.EPSILON);

  // Test negative tilt now.
  goog.vec.mat3d.makeRotate(m0, roll, 0, 0, 1);
  goog.vec.mat3d.rotate(m0, -tilt, 1, 0, 0);
  goog.vec.mat3d.rotate(m0, yaw, 0, 0, 1);

  goog.vec.mat3d.makeEulerZXZ(m1, roll, -tilt, yaw);
  assertElementsRoughlyEqual(m0, m1, goog.vec.EPSILON);

  var euler = [0, 0, 0];
  goog.vec.mat3d.toEulerZXZ(m0, euler, true);

  assertRoughlyEquals(roll, euler[0], goog.vec.EPSILON);
  assertRoughlyEquals(-tilt, euler[1], goog.vec.EPSILON);
  assertRoughlyEquals(yaw, euler[2], goog.vec.EPSILON);
}

function testEulerZXZExtrema() {
  var m0 = goog.vec.mat3d.setFromArray(goog.vec.mat3d.create(),
      [1, 0, 0, 0, 0, -1, 0, 1, 0]);
  var m1 = goog.vec.mat3d.setFromArray(goog.vec.mat3d.create(),
      [0, 0, 0, 0, 0, 0, 0, 0, 0]);

  var euler = [0, 0, 0];
  goog.vec.mat3d.toEulerZXZ(m0, euler);
  assertElementsRoughlyEqual(
      [Math.PI, Math.PI / 2, Math.PI], euler, goog.vec.EPSILON);
  goog.vec.mat3d.makeEulerZXZ(m1, euler[0], euler[1], euler[2]);
  assertElementsRoughlyEqual(m0, m1, goog.vec.EPSILON);
}
