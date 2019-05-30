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

goog.module('goog.fxTest');
goog.setTestOnly();

const Animation = goog.require('goog.fx.Animation');
const MockClock = goog.require('goog.testing.MockClock');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const googObject = goog.require('goog.object');
const testSuite = goog.require('goog.testing.testSuite');

// TODO(arv): Add tests for the event dispatches.
// TODO(arv): Add tests for the calculation of the coordinates.

let anim2;
let anim;
let clock;
let replacer;

testSuite({
  setUpPage() {
    clock = new MockClock(true);
  },

  tearDownPage() {
    clock.dispose();
  },

  setUp() {
    replacer = new PropertyReplacer();
  },

  tearDown() {
    replacer.reset();

    if (anim && anim.dispose) {
      anim.dispose();
    }

    if (anim2 && anim2.dispose) {
      anim2.dispose();
    }
  },

  testAnimationConstructor() {
    assertThrows('Should throw since first arg is not an array', () => {
      new Animation(1, [2], 3);
    });
    assertThrows('Should throw since second arg is not an array', () => {
      new Animation([1], 2, 3);
    });
    assertThrows('Should throw since the length are different', () => {
      new Animation([0, 1], [2], 3);
    });
  },

  testPlayAndStopDoesNotLeaveAnyActiveAnimations() {
    anim = new Animation([0], [1], 1000);

    assertTrue(
        'There should be no active animations',
        googObject.isEmpty(goog.fx.anim.activeAnimations_));

    anim.play();
    assertEquals(
        'There should be one active animations', 1,
        googObject.getCount(goog.fx.anim.activeAnimations_));

    anim.stop();
    assertTrue(
        'There should be no active animations',
        googObject.isEmpty(goog.fx.anim.activeAnimations_));

    anim.play();
    assertEquals(
        'There should be one active animations', 1,
        googObject.getCount(goog.fx.anim.activeAnimations_));

    anim.pause();
    assertTrue(
        'There should be no active animations',
        googObject.isEmpty(goog.fx.anim.activeAnimations_));
  },
});
