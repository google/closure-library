// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.events.EventObserverTest');
goog.setTestOnly();

const EventObserver = goog.require('goog.testing.events.EventObserver');
const GoogEvent = goog.require('goog.events.Event');
const GoogEventTarget = goog.require('goog.events.EventTarget');
const googArray = goog.require('goog.array');
const googEvents = goog.require('goog.events');
const testSuite = goog.require('goog.testing.testSuite');

// Return an event's type
function getEventType(e) {
  return e.type;
}

testSuite({
  testGetEvents() {
    const observer = new EventObserver();
    const target = new GoogEventTarget();
    googEvents.listen(target, ['foo', 'bar', 'baz'], observer);

    const eventTypes =
        ['bar', 'baz', 'foo', 'qux', 'quux', 'corge', 'foo', 'baz'];
    googArray.forEach(eventTypes, goog.bind(target.dispatchEvent, target));

    const replayEvents = observer.getEvents();

    assertArrayEquals(
        'Only the listened-for event types should be remembered',
        ['bar', 'baz', 'foo', 'foo', 'baz'],
        googArray.map(observer.getEvents(), getEventType));

    assertArrayEquals(
        ['bar'], googArray.map(observer.getEvents('bar'), getEventType));
    assertArrayEquals(
        ['baz', 'baz'], googArray.map(observer.getEvents('baz'), getEventType));
    assertArrayEquals(
        ['foo', 'foo'], googArray.map(observer.getEvents('foo'), getEventType));
  },

  testHandleEvent() {
    const events = [
      new GoogEvent('foo'),
      new GoogEvent('bar'),
      new GoogEvent('baz'),
    ];

    const observer = new EventObserver();
    googArray.forEach(events, goog.bind(observer.handleEvent, observer));

    assertArrayEquals(events, observer.getEvents());
    assertArrayEquals([events[0]], observer.getEvents('foo'));
    assertArrayEquals([events[1]], observer.getEvents('bar'));
    assertArrayEquals([events[2]], observer.getEvents('baz'));
  },

  testClear() {
    const event = new GoogEvent('foo');

    const observer = new EventObserver();
    observer.handleEvent(event);

    assertArrayEquals([event], observer.getEvents());

    observer.clear();

    assertArrayEquals([], observer.getEvents());

    const otherEvent = new GoogEvent('baz');
    observer.handleEvent(otherEvent);

    assertArrayEquals([otherEvent], observer.getEvents());
  },
});
