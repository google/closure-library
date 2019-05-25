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

goog.module('goog.events.OnlineHandlerTest');
goog.setTestOnly();

const BrowserFeature = goog.require('goog.events.BrowserFeature');
const EventHandler = goog.require('goog.events.EventHandler');
const GoogEvent = goog.require('goog.events.Event');
const MockClock = goog.require('goog.testing.MockClock');
const NetworkStatusMonitor = goog.require('goog.net.NetworkStatusMonitor');
const OnlineHandler = goog.require('goog.events.OnlineHandler');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const events = goog.require('goog.events');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

const stubs = new PropertyReplacer();
const clock = new MockClock();
let online = true;
let onlineCount;
let offlineCount;

function listenToEvents(oh) {
  onlineCount = 0;
  offlineCount = 0;

  events.listen(oh, NetworkStatusMonitor.EventType.ONLINE, (e) => {
    assertTrue(oh.isOnline());
    onlineCount++;
  });
  events.listen(oh, NetworkStatusMonitor.EventType.OFFLINE, (e) => {
    assertFalse(oh.isOnline());
    offlineCount++;
  });
}

testSuite({
  setUp() {
    stubs.set(OnlineHandler.prototype, 'isOnline', () => online);
  },

  tearDown() {
    stubs.reset();
    clock.uninstall();
  },

  testConstructAndDispose() {
    const oh = new OnlineHandler();
    oh.dispose();
  },

  testNoOnlineProperty() {
    stubs.set(BrowserFeature, 'HAS_NAVIGATOR_ONLINE_PROPERTY', false);
    stubs.set(EventHandler.prototype, 'listen', recordFunction());

    const oh = new OnlineHandler();

    assertEquals(0, oh.eventHandler_.listen.getCallCount());

    oh.dispose();
  },

  testNonHtml5() {
    clock.install();
    stubs.set(BrowserFeature, 'HAS_HTML5_NETWORK_EVENT_SUPPORT', false);

    const oh = new OnlineHandler();
    listenToEvents(oh);

    clock.tick(500);
    online = false;
    clock.tick(500);

    assertEquals(0, onlineCount);
    assertEquals(1, offlineCount);

    online = true;
    clock.tick(500);

    assertEquals(1, onlineCount);
    assertEquals(1, offlineCount);

    oh.dispose();
    clock.dispose();
  },

  testHtml5() {
    stubs.set(BrowserFeature, 'HAS_HTML5_NETWORK_EVENT_SUPPORT', true);

    // Test for browsers that fire network events on document.body.
    stubs.set(BrowserFeature, 'HTML5_NETWORK_EVENTS_FIRE_ON_BODY', true);

    let oh = new OnlineHandler();
    listenToEvents(oh);

    online = false;
    let e = new GoogEvent('offline');
    events.fireListeners(document.body, e.type, false, e);

    assertEquals(0, onlineCount);
    assertEquals(1, offlineCount);

    online = true;
    e = new GoogEvent('online');
    events.fireListeners(document.body, e.type, false, e);

    assertEquals(1, onlineCount);
    assertEquals(1, offlineCount);

    oh.dispose();

    // Test for browsers that fire network events on window.
    stubs.set(BrowserFeature, 'HTML5_NETWORK_EVENTS_FIRE_ON_BODY', false);

    oh = new OnlineHandler();
    listenToEvents(oh);

    online = false;
    e = new GoogEvent('offline');
    events.fireListeners(window, e.type, false, e);

    assertEquals(0, onlineCount);
    assertEquals(1, offlineCount);

    online = true;
    e = new GoogEvent('online');
    events.fireListeners(window, e.type, false, e);

    assertEquals(1, onlineCount);
    assertEquals(1, offlineCount);

    oh.dispose();
  },
});
