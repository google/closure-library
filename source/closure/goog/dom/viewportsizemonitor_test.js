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

goog.module('goog.dom.ViewportSizeMonitorTest');
goog.setTestOnly();

const EventType = goog.require('goog.events.EventType');
const GoogEvent = goog.require('goog.events.Event');
const GoogEventTarget = goog.require('goog.events.EventTarget');
const MockClock = goog.require('goog.testing.MockClock');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const Size = goog.require('goog.math.Size');
const ViewportSizeMonitor = goog.require('goog.dom.ViewportSizeMonitor');
const events = goog.require('goog.events');
const testSuite = goog.require('goog.testing.testSuite');

let propertyReplacer;
let fakeWindow;
let viewportSizeMonitor;
let mockClock;
let viewportSize;

class FakeWindow extends GoogEventTarget {
  fireResize() {
    return this.dispatchEvent(new FakeResizeEvent());
  }
}

class FakeResizeEvent extends GoogEvent {
  constructor(obj) {
    super();
    this.type = EventType.RESIZE;
  }
}

function getViewportSize() {
  return viewportSize;
}

function setViewportSize(w, h, fireEvent) {
  viewportSize = new Size(w, h);
  if (fireEvent) {
    fakeWindow.fireResize();
  }
}

const eventWasFired = {};
function getListenerFn(id) {
  return () => {
    propertyReplacer.set(eventWasFired, id, true);
  };
}

function listenerWasCalled(id) {
  return !!eventWasFired[id];
}

testSuite({
  setUp() {
    propertyReplacer = new PropertyReplacer();
    propertyReplacer.set(goog.dom, 'getViewportSize', getViewportSize);
    mockClock = new MockClock();
    mockClock.install();
    fakeWindow = new FakeWindow();
    setViewportSize(300, 300);
    viewportSizeMonitor = new ViewportSizeMonitor(fakeWindow);
  },

  tearDown() {
    propertyReplacer.reset();
    mockClock.uninstall();
  },

  testResizeEvent() {
    events.listen(viewportSizeMonitor, EventType.RESIZE, getListenerFn(1));
    assertFalse(
        'Listener should not be called if window was not resized',
        listenerWasCalled(1));
    setViewportSize(300, 300, true);
    assertFalse(
        'Listener should not be called for bogus resize event',
        listenerWasCalled(1));
    setViewportSize(301, 301, true);
    assertTrue(
        'Listener should be called for valid resize event',
        listenerWasCalled(1));
  },

  testInstanceGetter() {
    const fakeWindow1 = new FakeWindow();
    const monitor1 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow1);
    const monitor2 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow1);
    assertEquals(
        'The same window should give us the same instance monitor', monitor1,
        monitor2);

    const fakeWindow2 = new FakeWindow();
    const monitor3 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow2);
    assertNotEquals(
        'Different windows should give different instances', monitor1,
        monitor3);

    assertEquals(
        'Monitors should match if opt_window is not provided',
        ViewportSizeMonitor.getInstanceForWindow(),
        ViewportSizeMonitor.getInstanceForWindow());
  },

  testRemoveInstanceForWindow() {
    const fakeWindow1 = new FakeWindow();
    const monitor1 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow1);

    ViewportSizeMonitor.removeInstanceForWindow(fakeWindow1);
    assertTrue(monitor1.isDisposed());

    const monitor2 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow1);
    assertNotEquals(monitor1, monitor2);
  },
});
