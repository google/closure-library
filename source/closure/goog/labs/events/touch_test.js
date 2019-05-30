// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

/** @fileoverview Unit tests for touch. */

goog.module('goog.labs.events.touchTest');
goog.setTestOnly();

const testSuite = goog.require('goog.testing.testSuite');
const touch = goog.require('goog.labs.events.touch');

testSuite({
  testMouseEvent() {
    const fakeTarget = {};

    const fakeMouseMove = {
      'clientX': 1,
      'clientY': 2,
      'screenX': 3,
      'screenY': 4,
      'target': fakeTarget,
      'type': 'mousemove',
    };

    const data = touch.getTouchData(fakeMouseMove);
    assertEquals(1, data.clientX);
    assertEquals(2, data.clientY);
    assertEquals(3, data.screenX);
    assertEquals(4, data.screenY);
    assertEquals(fakeTarget, data.target);
  },

  testTouchEvent() {
    const fakeTarget = {};

    const fakeTouch = {
      'clientX': 1,
      'clientY': 2,
      'screenX': 3,
      'screenY': 4,
      'target': fakeTarget,
    };

    const fakeTouchStart = {
      'targetTouches': [fakeTouch],
      'target': fakeTarget,
      'type': 'touchstart',
    };

    const data = touch.getTouchData(fakeTouchStart);
    assertEquals(1, data.clientX);
    assertEquals(2, data.clientY);
    assertEquals(3, data.screenX);
    assertEquals(4, data.screenY);
    assertEquals(fakeTarget, data.target);
  },

  testTouchChangeEvent() {
    const fakeTarget = {};

    const fakeTouch = {
      'clientX': 1,
      'clientY': 2,
      'screenX': 3,
      'screenY': 4,
      'target': fakeTarget,
    };

    const fakeTouchStart = {
      'changedTouches': [fakeTouch],
      'target': fakeTarget,
      'type': 'touchend'
    };

    const data = touch.getTouchData(fakeTouchStart);
    assertEquals(1, data.clientX);
    assertEquals(2, data.clientY);
    assertEquals(3, data.screenX);
    assertEquals(4, data.screenY);
    assertEquals(fakeTarget, data.target);
  },
});
