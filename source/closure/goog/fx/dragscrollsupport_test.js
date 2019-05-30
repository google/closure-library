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

goog.module('goog.fx.DragScrollSupportTest');
goog.setTestOnly();

const Coordinate = goog.require('goog.math.Coordinate');
const DragScrollSupport = goog.require('goog.fx.DragScrollSupport');
const GoogRect = goog.require('goog.math.Rect');
const MockClock = goog.require('goog.testing.MockClock');
const events = goog.require('goog.testing.events');
const testSuite = goog.require('goog.testing.testSuite');

let vContainerDiv;
let vContentDiv;
let hContainerDiv;
let hContentDiv;
let clock;

testSuite({
  setUpPage() {
    vContainerDiv = document.getElementById('vContainerDiv');
    vContentDiv = document.getElementById('vContentDiv');
    hContainerDiv = document.getElementById('hContainerDiv');
    hContentDiv = document.getElementById('hContentDiv');
  },

  setUp() {
    clock = new MockClock(true);
  },

  tearDown() {
    clock.dispose();
  },

  testDragZeroMarginDivVContainer() {
    const dsc = new DragScrollSupport(vContainerDiv);

    // Set initial scroll state.
    let scrollTop = 50;
    vContainerDiv.scrollTop = scrollTop;

    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing inside the vContainer should not trigger scrolling.',
        scrollTop, vContainerDiv.scrollTop);
    assertEquals(
        'Scroll timer should not tick yet', 0, clock.getTimeoutsMade());

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 10));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing above the vContainer should trigger scrolling up.',
        scrollTop > vContainerDiv.scrollTop);
    scrollTop = vContainerDiv.scrollTop;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing above the vContainer should trigger scrolling up.',
        scrollTop > vContainerDiv.scrollTop);

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 110));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing below the vContainer should trigger scrolling down.',
        scrollTop < vContainerDiv.scrollTop);
    scrollTop = vContainerDiv.scrollTop;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing below the vContainer should trigger scrolling down.',
        scrollTop < vContainerDiv.scrollTop);

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing inside the vContainer should stop scrolling.', scrollTop,
        vContainerDiv.scrollTop);

    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);

    dsc.dispose();
  },

  testDragZeroMarginDivHContainer() {
    const dsc = new DragScrollSupport(hContainerDiv);

    // Set initial scroll state.
    let scrollLeft = 50;
    hContainerDiv.scrollLeft = scrollLeft;

    events.fireMouseMoveEvent(hContainerDiv, new Coordinate(200 + 50, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing inside the hContainer should not trigger scrolling.',
        scrollLeft, hContainerDiv.scrollLeft);
    assertEquals(
        'Scroll timer should not tick yet', 0, clock.getTimeoutsMade());

    scrollLeft = hContainerDiv.scrollLeft;
    events.fireMouseMoveEvent(hContainerDiv, new Coordinate(200 - 10, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing left of the hContainer should trigger scrolling left.',
        scrollLeft > hContainerDiv.scrollLeft);
    scrollLeft = hContainerDiv.scrollLeft;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing left of the hContainer should trigger scrolling left.',
        scrollLeft > hContainerDiv.scrollLeft);

    scrollLeft = hContainerDiv.scrollLeft;
    events.fireMouseMoveEvent(
        hContainerDiv, new Coordinate(200 + 110, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing right of the hContainer should trigger scrolling right.',
        scrollLeft < hContainerDiv.scrollLeft);
    scrollLeft = hContainerDiv.scrollLeft;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing right of the hContainer should trigger scrolling right.',
        scrollLeft < hContainerDiv.scrollLeft);

    scrollLeft = hContainerDiv.scrollLeft;
    events.fireMouseMoveEvent(hContainerDiv, new Coordinate(200 + 50, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing inside the hContainer should stop scrolling.', scrollLeft,
        hContainerDiv.scrollLeft);

    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);

    dsc.dispose();
  },

  testDragMarginDivVContainer() {
    const dsc = new DragScrollSupport(vContainerDiv, 20);

    // Set initial scroll state.
    let scrollTop = 50;
    vContainerDiv.scrollTop = scrollTop;

    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing inside the vContainer should not trigger scrolling.',
        scrollTop, vContainerDiv.scrollTop);
    assertEquals(
        'Scroll timer should not tick yet', 0, clock.getTimeoutsMade());

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 30));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing above the margin should trigger scrolling up.',
        scrollTop > vContainerDiv.scrollTop);
    scrollTop = vContainerDiv.scrollTop;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing above the margin should trigger scrolling up.',
        scrollTop > vContainerDiv.scrollTop);

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 90));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing below the margin should trigger scrolling down.',
        scrollTop < vContainerDiv.scrollTop);
    scrollTop = vContainerDiv.scrollTop;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing above the margin should trigger scrolling down.',
        scrollTop < vContainerDiv.scrollTop);

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing inside the margin should stop scrolling.', scrollTop,
        vContainerDiv.scrollTop);

    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);

    // 5 timeouts are scheduled, but the last one is cancelled.
    assertEquals(
        'Scroll timer should have ticked 4 times', 4,
        clock.getCallbacksTriggered());

    dsc.dispose();
  },

  testDragMarginScrollConstrainedDivVContainer() {
    const dsc = new DragScrollSupport(vContainerDiv, 20);
    dsc.setConstrainScroll(true);

    // Set initial scroll state.
    let scrollTop = 50;
    vContainerDiv.scrollTop = scrollTop;

    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing inside the vContainer should not trigger scrolling.',
        scrollTop, vContainerDiv.scrollTop);
    assertEquals(
        'Scroll timer should not tick yet', 0, clock.getTimeoutsMade());

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 30));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing above the margin should trigger scrolling up.',
        scrollTop > vContainerDiv.scrollTop);
    scrollTop = vContainerDiv.scrollTop;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing above the margin should trigger scrolling up.',
        scrollTop > vContainerDiv.scrollTop);

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 90));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing below the margin should trigger scrolling down.',
        scrollTop < vContainerDiv.scrollTop);
    scrollTop = vContainerDiv.scrollTop;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing above the margin should trigger scrolling down.',
        scrollTop < vContainerDiv.scrollTop);

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing inside the margin should stop scrolling.', scrollTop,
        vContainerDiv.scrollTop);

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 10));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing above the vContainer should not trigger scrolling up.',
        scrollTop, vContainerDiv.scrollTop);
    scrollTop = vContainerDiv.scrollTop;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing above the vContainer should not trigger scrolling up.',
        scrollTop, vContainerDiv.scrollTop);

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(50, 20 + 110));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing below the vContainer should not trigger scrolling down.',
        scrollTop, vContainerDiv.scrollTop);
    scrollTop = vContainerDiv.scrollTop;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing below the vContainer should not trigger scrolling down.',
        scrollTop, vContainerDiv.scrollTop);

    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);

    scrollTop = vContainerDiv.scrollTop;
    events.fireMouseMoveEvent(vContainerDiv, new Coordinate(150, 20 + 90));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing to the right of the vContainer should not trigger ' +
            'scrolling up.',
        scrollTop, vContainerDiv.scrollTop);
    scrollTop = vContainerDiv.scrollTop;
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Mousing to the right of the vContainer should not trigger ' +
            'scrolling up.',
        scrollTop, vContainerDiv.scrollTop);

    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);

    // 5 timeouts are scheduled, but the last one is cancelled.
    assertEquals(
        'Scroll timer should have ticked 4 times', 4,
        clock.getCallbacksTriggered());

    dsc.dispose();
  },

  testSetHorizontalScrolling() {
    const dsc = new DragScrollSupport(hContainerDiv);
    dsc.setHorizontalScrolling(false);

    // Set initial scroll state.
    let scrollLeft = 50;
    hContainerDiv.scrollLeft = scrollLeft;

    events.fireMouseMoveEvent(hContainerDiv, new Coordinate(200 - 10, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Horizontal scrolling should be turned off', 0,
        clock.getTimeoutsMade());

    events.fireMouseMoveEvent(
        hContainerDiv, new Coordinate(200 + 110, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertEquals(
        'Horizontal scrolling should be turned off', 0,
        clock.getTimeoutsMade());

    dsc.setHorizontalScrolling(true);
    scrollLeft = hContainerDiv.scrollLeft;
    events.fireMouseMoveEvent(hContainerDiv, new Coordinate(200 - 10, 20 + 50));
    clock.tick(DragScrollSupport.TIMER_STEP_ + 1);
    assertTrue(
        'Mousing left of the hContainer should trigger scrolling left.',
        scrollLeft > hContainerDiv.scrollLeft);

    dsc.dispose();
  },

  testConstrainBoundsWithMargin() {
    const rect = DragScrollSupport.prototype.constrainBounds_.call(
        {margin_: 25}, new GoogRect(0, 0, 100, 100));
    assertEquals(25, rect.left);
    assertEquals(25, rect.top);
    assertEquals(25, rect.left);
    assertEquals(50, rect.width);
    assertEquals(50, rect.height);
  },
});
