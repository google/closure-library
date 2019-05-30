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

goog.module('goog.events.InputHandlerTest');
goog.setTestOnly();

const EventHandler = goog.require('goog.events.EventHandler');
const EventType = goog.require('goog.events.EventType');
const GoogTestingEvent = goog.require('goog.testing.events.Event');
const InputHandler = goog.require('goog.events.InputHandler');
const KeyCodes = goog.require('goog.events.KeyCodes');
const dom = goog.require('goog.dom');
const events = goog.require('goog.testing.events');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let inputHandler;
let eventHandler;

function listenToInput(inputHandler) {
  const callback = recordFunction();
  eventHandler.listen(inputHandler, InputHandler.EventType.INPUT, callback);
  return callback;
}

function fireFakeInputEvent(input) {
  // Simulate the input event that IE fires on focus when a placeholder
  // is present.
  input.focus();
  if (userAgent.IE && userAgent.isVersionOrHigher(10)) {
    // IE fires an input event with keycode 0
    fireInputEvent(input, 0);
  }
}

function fireInputEvent(input, keyCode) {
  const inputEvent = new GoogTestingEvent(EventType.INPUT, input);
  inputEvent.keyCode = keyCode;
  inputEvent.charCode = keyCode;
  events.fireBrowserEvent(inputEvent);
}
testSuite({
  setUp() {
    eventHandler = new EventHandler();
  },

  tearDown() {
    goog.dispose(inputHandler);
    goog.dispose(eventHandler);
  },

  testInputWithPlaceholder() {
    const input = dom.getElement('input-w-placeholder');
    inputHandler = new InputHandler(input);
    const callback = listenToInput(inputHandler);
    fireFakeInputEvent(input);
    assertEquals(0, callback.getCallCount());
  },

  testInputWithPlaceholder_withValue() {
    const input = dom.getElement('input-w-placeholder');
    inputHandler = new InputHandler(input);
    const callback = listenToInput(inputHandler);
    input.value = 'foo';
    fireFakeInputEvent(input);
    assertEquals(0, callback.getCallCount());
  },

  testInputWithPlaceholder_someKeys() {
    const input = dom.getElement('input-w-placeholder');
    inputHandler = new InputHandler(input);
    const callback = listenToInput(inputHandler);
    input.focus();
    input.value = 'foo';

    fireInputEvent(input, KeyCodes.M);
    assertEquals(1, callback.getCallCount());
  },
});
