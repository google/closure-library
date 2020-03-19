/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.labs.dom.PageVisibilityMonitorTest');
goog.setTestOnly();

const GoogTestingEvent = goog.require('goog.testing.events.Event');
const PageVisibilityMonitor = goog.require('goog.labs.dom.PageVisibilityMonitor');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const events = goog.require('goog.events');
const functions = goog.require('goog.functions');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');
const testingEvents = goog.require('goog.testing.events');

const stubs = new PropertyReplacer();
let vh;

testSuite({
  tearDown() {
    goog.dispose(vh);
    vh = null;
    stubs.reset();
  },

  testConstructor() {
    vh = new PageVisibilityMonitor();
  },

  testNoVisibilitySupport() {
    stubs.set(
        PageVisibilityMonitor.prototype, 'getBrowserEventType_',
        functions.NULL);

    const listener = recordFunction();
    vh = new PageVisibilityMonitor();

    events.listen(vh, 'visibilitychange', listener);

    const e = new GoogTestingEvent('visibilitychange');
    e.target = window.document;
    testingEvents.fireBrowserEvent(e);
    assertEquals(0, listener.getCallCount());
  },

  testListener() {
    stubs.set(
        PageVisibilityMonitor.prototype, 'getBrowserEventType_',
        functions.constant('visibilitychange'));

    const listener = recordFunction();
    vh = new PageVisibilityMonitor();

    events.listen(vh, 'visibilitychange', listener);

    const e = new GoogTestingEvent('visibilitychange');
    e.target = window.document;
    testingEvents.fireBrowserEvent(e);

    assertEquals(1, listener.getCallCount());
  },

  testListenerForWebKit() {
    stubs.set(
        PageVisibilityMonitor.prototype, 'getBrowserEventType_',
        functions.constant('webkitvisibilitychange'));

    const listener = recordFunction();
    vh = new PageVisibilityMonitor();

    events.listen(vh, 'visibilitychange', listener);

    const e = new GoogTestingEvent('webkitvisibilitychange');
    e.target = window.document;
    testingEvents.fireBrowserEvent(e);

    assertEquals(1, listener.getCallCount());
  },
});
