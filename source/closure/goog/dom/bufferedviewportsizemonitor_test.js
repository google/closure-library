// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

/**
 * @fileoverview Tests for BufferedViewportSizeMonitor.
 *
 */

/** @suppress {extraProvide} */
goog.module('goog.dom.BufferedViewportSizeMonitorTest');
goog.setTestOnly();

const BufferedViewportSizeMonitor = goog.require('goog.dom.BufferedViewportSizeMonitor');
const EventType = goog.require('goog.events.EventType');
const GoogTestingEvent = goog.require('goog.testing.events.Event');
const MockClock = goog.require('goog.testing.MockClock');
const Size = goog.require('goog.math.Size');
const ViewportSizeMonitor = goog.require('goog.dom.ViewportSizeMonitor');
const events = goog.require('goog.events');
const testSuite = goog.require('goog.testing.testSuite');
const testingEvents = goog.require('goog.testing.events');

const RESIZE_DELAY = BufferedViewportSizeMonitor.RESIZE_EVENT_DELAY_MS_;
const INITIAL_SIZE = new Size(111, 111);

let mockControl;
let viewportSizeMonitor;
let bufferedVsm;
const timer = new MockClock();
let resizeEventCount = 0;
let size;

const resizeCallback = () => {
  resizeEventCount++;
};

function resize(width, height) {
  size = new Size(width, height);
  testingEvents.fireBrowserEvent(
      new GoogTestingEvent(EventType.RESIZE, viewportSizeMonitor));
}
testSuite({
  setUp() {
    timer.install();

    size = INITIAL_SIZE;
    viewportSizeMonitor = new ViewportSizeMonitor();
    viewportSizeMonitor.getSize = () => size;
    bufferedVsm = new BufferedViewportSizeMonitor(viewportSizeMonitor);

    events.listen(bufferedVsm, EventType.RESIZE, resizeCallback);
  },

  tearDown() {
    events.unlisten(bufferedVsm, EventType.RESIZE, resizeCallback);
    resizeEventCount = 0;
    timer.uninstall();
  },

  testInitialSizes() {
    assertTrue(Size.equals(INITIAL_SIZE, bufferedVsm.getSize()));
  },

  testWindowResize() {
    assertEquals(0, resizeEventCount);
    resize(100, 100);
    timer.tick(RESIZE_DELAY - 1);
    assertEquals(
        'No resize expected before the delay is fired', 0, resizeEventCount);
    timer.tick(1);
    assertEquals('Expected resize after delay', 1, resizeEventCount);
    assertTrue(Size.equals(new Size(100, 100), bufferedVsm.getSize()));
  },

  testWindowResize_eventBatching() {
    assertEquals(
        'No resize calls expected before resize events', 0, resizeEventCount);
    resize(100, 100);
    timer.tick(RESIZE_DELAY - 1);
    resize(200, 200);
    assertEquals(
        'No resize expected before the delay is fired', 0, resizeEventCount);
    timer.tick(1);
    assertEquals(
        'No resize expected when delay is restarted', 0, resizeEventCount);
    timer.tick(RESIZE_DELAY);
    assertEquals('Expected resize after delay', 1, resizeEventCount);
  },

  testWindowResize_noChange() {
    resize(100, 100);
    timer.tick(RESIZE_DELAY);
    assertEquals(1, resizeEventCount);
    resize(100, 100);
    timer.tick(RESIZE_DELAY);
    assertEquals(
        'No resize expected when size doesn\'t change', 1, resizeEventCount);
    assertTrue(Size.equals(new Size(100, 100), bufferedVsm.getSize()));
  },

  testWindowResize_previousSize() {
    resize(100, 100);
    timer.tick(RESIZE_DELAY);
    assertEquals(1, resizeEventCount);
    assertTrue(Size.equals(new Size(100, 100), bufferedVsm.getSize()));

    resize(200, 200);
    timer.tick(RESIZE_DELAY);
    assertEquals(2, resizeEventCount);
    assertTrue(Size.equals(new Size(200, 200), bufferedVsm.getSize()));
  },
});
