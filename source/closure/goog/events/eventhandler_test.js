// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.events.EventHandlerTest');
goog.setTestOnly();

const EventHandler = goog.require('goog.events.EventHandler');
const GoogEventTarget = goog.require('goog.events.EventTarget');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const events = goog.require('goog.events');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

let a;
let b;
let c;
let d;
let eh;

let propertyReplacer;

testSuite({
  setUpPage() {
    a = document.getElementById('a');
    b = document.getElementById('b');
    c = document.getElementById('c');
    d = document.getElementById('d');
    propertyReplacer = new PropertyReplacer();
  },

  tearDown() {
    goog.dispose(eh);
    propertyReplacer.reset();
  },

  testEventHandlerClearsListeners() {
    function tmp() {}

    events.listen(a, 'click', tmp);

    assertEquals(1, events.getListeners(a, 'click', false).length);

    eh = new EventHandler();
    eh.listen(a, 'click');
    eh.listen(a, 'keypress');
    eh.listen(b, 'mouseover');
    eh.listen(c, 'mousedown');
    eh.listen(d, 'click');
    eh.listen(d, 'mousedown');

    assertEquals(2, events.getListeners(a, 'click', false).length);
    assertEquals(1, events.getListeners(a, 'keypress', false).length);
    assertEquals(1, events.getListeners(b, 'mouseover', false).length);
    assertEquals(1, events.getListeners(c, 'mousedown', false).length);
    assertEquals(1, events.getListeners(d, 'click', false).length);
    assertEquals(1, events.getListeners(d, 'mousedown', false).length);

    eh.unlisten(d, 'mousedown');

    assertEquals(2, events.getListeners(a, 'click', false).length);
    assertEquals(1, events.getListeners(a, 'keypress', false).length);
    assertEquals(1, events.getListeners(b, 'mouseover', false).length);
    assertEquals(1, events.getListeners(c, 'mousedown', false).length);
    assertEquals(1, events.getListeners(d, 'click', false).length);
    assertEquals(0, events.getListeners(d, 'mousedown', false).length);

    eh.dispose();

    assertEquals(1, events.getListeners(a, 'click', false).length);
    assertEquals(0, events.getListeners(a, 'keypress', false).length);
    assertEquals(0, events.getListeners(b, 'mouseover', false).length);
    assertEquals(0, events.getListeners(c, 'mousedown', false).length);
    assertEquals(0, events.getListeners(d, 'click', false).length);
    assertEquals(0, events.getListeners(d, 'mousedown', false).length);

    events.unlisten(a, 'click', tmp);
    assertEquals(0, events.getListeners(a, 'click', false).length);
  },

  testListenArray() {
    eh = new EventHandler();

    eh.listen(a, ['click', 'mousedown', 'mouseup']);

    assertEquals(1, events.getListeners(a, 'click', false).length);
    assertEquals(1, events.getListeners(a, 'mousedown', false).length);
    assertEquals(1, events.getListeners(a, 'mouseup', false).length);

    eh.unlisten(a, ['click', 'mousedown', 'mouseup']);

    assertEquals(0, events.getListeners(a, 'click', false).length);
    assertEquals(0, events.getListeners(a, 'mousedown', false).length);
    assertEquals(0, events.getListeners(a, 'mouseup', false).length);

    eh.listen(a, ['click', 'mousedown', 'mouseup']);

    assertEquals(1, events.getListeners(a, 'click', false).length);
    assertEquals(1, events.getListeners(a, 'mousedown', false).length);
    assertEquals(1, events.getListeners(a, 'mouseup', false).length);

    eh.removeAll();

    assertEquals(0, events.getListeners(a, 'click', false).length);
    assertEquals(0, events.getListeners(a, 'mousedown', false).length);
    assertEquals(0, events.getListeners(a, 'mouseup', false).length);
  },

  testListenOnceRemovesListenerWhenFired() {
    const target = new GoogEventTarget();
    eh = new EventHandler();
    const handler = recordFunction();
    eh.listenOnce(target, 'click', handler);

    target.dispatchEvent('click');
    assertEquals(
        'One event should have been dispatched', 1, handler.getCallCount());

    target.dispatchEvent('click');
    assertEquals(
        'No event should have been dispatched', 1, handler.getCallCount());
  },

  testListenOnceListenerIsCleanedUp() {
    const target = new GoogEventTarget();
    eh = new EventHandler();
    const handler = recordFunction();
    eh.listenOnce(target, 'click', handler);

    eh.removeAll();

    target.dispatchEvent('click');
    assertEquals(0, handler.getCallCount());
  },

  testClearListenersWithListenOnceListenerRemoved() {
    const target = new GoogEventTarget();
    eh = new EventHandler();

    const handler = recordFunction();
    eh.listenOnce(target, 'click', handler);

    assertNotNull(events.getListener(target, 'click', handler, false, eh));

    target.dispatchEvent('click');
    assertEquals(
        'One event should have been dispatched', 1, handler.getCallCount());

    assertNull(events.getListener(target, 'click', handler, false, eh));

    eh.removeAll();

    target.dispatchEvent('click');
    assertEquals(
        'No event should have been dispatched', 1, handler.getCallCount());
  },

  testListenOnceArray() {
    const target = new GoogEventTarget();

    eh = new EventHandler();
    const handler = recordFunction();
    eh.listenOnce(target, ['click', 'mousedown', 'mouseup'], handler);

    target.dispatchEvent('click');
    assertEquals(
        '1 event should have been dispatched', 1, handler.getCallCount());
    assertEquals(
        'Should be a click event', 'click',
        handler.getLastCall().getArgument(0).type);

    target.dispatchEvent('click');
    assertEquals('No event should be dispatched', 1, handler.getCallCount());

    target.dispatchEvent('mouseup');
    assertEquals(
        '1 event should have been dispatched', 2, handler.getCallCount());
    assertEquals(
        'Should be a mouseup event', 'mouseup',
        handler.getLastCall().getArgument(0).type);

    target.dispatchEvent('mouseup');
    assertEquals('No event should be dispatched', 2, handler.getCallCount());

    target.dispatchEvent('mousedown');
    assertEquals(
        '1 event should have been dispatched', 3, handler.getCallCount());
    assertEquals(
        'Should be a mousedown event', 'mousedown',
        handler.getLastCall().getArgument(0).type);

    target.dispatchEvent('mousedown');
    assertEquals('No event should be dispatched', 3, handler.getCallCount());
  },

  testListenUnlistenWithObjectHandler() {
    const target = new GoogEventTarget();
    eh = new EventHandler();
    const handlerObj = {handleEvent: recordFunction()};
    eh.listen(target, 'click', handlerObj);

    target.dispatchEvent('click');
    assertEquals(
        'One event should have been dispatched', 1,
        handlerObj.handleEvent.getCallCount());

    target.dispatchEvent('click');
    assertEquals(
        'One event should have been dispatched', 2,
        handlerObj.handleEvent.getCallCount());

    eh.unlisten(target, 'click', handlerObj);
    target.dispatchEvent('click');
    assertEquals(
        'No event should have been dispatched', 2,
        handlerObj.handleEvent.getCallCount());
  },

  testListenOnceWithObjectHandler() {
    const target = new GoogEventTarget();
    eh = new EventHandler();
    const handlerObj = {handleEvent: recordFunction()};
    eh.listenOnce(target, 'click', handlerObj);

    target.dispatchEvent('click');
    assertEquals(
        'One event should have been dispatched', 1,
        handlerObj.handleEvent.getCallCount());

    target.dispatchEvent('click');
    assertEquals(
        'No event should have been dispatched', 1,
        handlerObj.handleEvent.getCallCount());
  },

  testGetListenerCount() {
    eh = new EventHandler();
    assertEquals('0 listeners registered initially', 0, eh.getListenerCount());
    const target = new GoogEventTarget();
    eh.listen(target, 'click', goog.nullFunction, false);
    eh.listen(target, 'click', goog.nullFunction, true);
    assertEquals('2 listeners registered', 2, eh.getListenerCount());
    eh.unlisten(target, 'click', goog.nullFunction, true);
    assertEquals('1 listener removed, 1 left', 1, eh.getListenerCount());
    eh.removeAll();
    assertEquals('all listeners removed', 0, eh.getListenerCount());
  },

  testRemoveAllCheckSForOwnKeys() {
    propertyReplacer.set(Object.prototype, 'customMethod', () => {
      throw new Error('NOOOOOOOOOOO');
    });
    eh = new EventHandler();
    // If removeAll doesn't check keys using hasOwnProperty it will also try
    // unlisten using customMethod function as key and will throw error.
    eh.removeAll();
  },
});
