// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.fx.AnimationTest');
goog.setTestOnly();

const Animation = goog.require('goog.fx.Animation');
const MockClock = goog.require('goog.testing.MockClock');
const events = goog.require('goog.events');
const testSuite = goog.require('goog.testing.testSuite');

let clock;

testSuite({
  setUpPage() {
    clock = new MockClock(true);
  },

  tearDownPage() {
    clock.dispose();
  },

  testPauseLogic() {
    const anim = new Animation([], [], 3000);
    let nFrames = 0;
    let progress = 0;
    events.listen(anim, Animation.EventType.ANIMATE, (e) => {
      assertRoughlyEquals(e.progress, progress, 1e-6);
      nFrames++;
    });
    events.listen(anim, Animation.EventType.END, (e) => {
      nFrames++;
    });
    const nSteps = 10;
    for (let i = 0; i < nSteps; i++) {
      progress = i / (nSteps - 1);
      anim.setProgress(progress);
      anim.play();
      anim.pause();
    }
    assertEquals(nSteps, nFrames);
  },

  testPauseOffset() {
    const anim = new Animation([0], [1000], 1000);
    anim.play();

    assertEquals(0, anim.coords[0]);
    assertRoughlyEquals(0, anim.progress, 1e-4);

    clock.tick(300);

    assertEquals(300, anim.coords[0]);
    assertRoughlyEquals(0.3, anim.progress, 1e-4);

    anim.pause();

    clock.tick(400);

    assertEquals(300, anim.coords[0]);
    assertRoughlyEquals(0.3, anim.progress, 1e-4);

    anim.play();

    assertEquals(300, anim.coords[0]);
    assertRoughlyEquals(0.3, anim.progress, 1e-4);

    clock.tick(400);

    assertEquals(700, anim.coords[0]);
    assertRoughlyEquals(0.7, anim.progress, 1e-4);

    anim.pause();

    clock.tick(300);

    assertEquals(700, anim.coords[0]);
    assertRoughlyEquals(0.7, anim.progress, 1e-4);

    anim.play();

    const lastPlay = goog.now();

    assertEquals(700, anim.coords[0]);
    assertRoughlyEquals(0.7, anim.progress, 1e-4);

    clock.tick(300);

    assertEquals(1000, anim.coords[0]);
    assertRoughlyEquals(1, anim.progress, 1e-4);
    assertEquals(Animation.State.STOPPED, anim.getStateInternal());
  },

  testClockReset() {
    const anim = new Animation([0], [1000], 1000);
    anim.play();

    assertEquals(0, anim.coords[0]);
    assertRoughlyEquals(0, anim.progress, 1e-4);

    // Possible when clock is reset.
    clock.tick(-200000);
    anim.pause();
    anim.play();

    assertEquals(0, anim.coords[0]);
    assertRoughlyEquals(0, anim.progress, 1e-4);

    // Animation shoud still only last a second.
    clock.tick(900);
    anim.pause();
    anim.play();

    assertEquals(900, anim.coords[0]);
    assertRoughlyEquals(0.9, anim.progress, 1e-4);
  },

  testSetProgress() {
    const anim = new Animation([0], [1000], 3000);
    let nFrames = 0;
    anim.play();
    anim.setProgress(0.5);
    events.listen(anim, Animation.EventType.ANIMATE, (e) => {
      assertEquals(500, e.coords[0]);
      assertRoughlyEquals(0.5, e.progress, 1e-4);
      nFrames++;
    });
    anim.cycle(goog.now());
    anim.stop();
    assertEquals(1, nFrames);
  },
});
