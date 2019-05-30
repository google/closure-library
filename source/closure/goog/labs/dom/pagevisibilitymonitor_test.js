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
