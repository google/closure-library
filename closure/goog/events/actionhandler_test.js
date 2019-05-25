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

goog.module('goog.events.ActionHandlerTest');
goog.setTestOnly();

const ActionHandler = goog.require('goog.events.ActionHandler');
const dom = goog.require('goog.dom');
const events = goog.require('goog.events');
const testSuite = goog.require('goog.testing.testSuite');
const testingEvents = goog.require('goog.testing.events');

let actionHandler;

// Tests to see that both the BEFOREACTION and ACTION events are fired

// Tests to see that the ACTION event is fired, even if there is no
// BEFOREACTION handler.

// If the BEFOREACTION listener swallows the event, it should cancel the
// ACTION event.

testSuite({
  setUp() {
    actionHandler = new ActionHandler(dom.getElement('actionDiv'));
  },

  tearDown() {
    actionHandler.dispose();
  },

  testActionHandlerWithBeforeActionHandler() {
    let actionEventFired = false;
    let beforeActionFired = false;
    events.listen(actionHandler, ActionHandler.EventType.ACTION, (e) => {
      actionEventFired = true;
    });
    events.listen(actionHandler, ActionHandler.EventType.BEFOREACTION, (e) => {
      beforeActionFired = true;
    });
    testingEvents.fireClickSequence(dom.getElement('actionDiv'));
    assertTrue('BEFOREACTION event was not fired', beforeActionFired);
    assertTrue('ACTION event was not fired', actionEventFired);
  },

  testActionHandlerWithoutBeforeActionHandler() {
    let actionEventFired = false;
    events.listen(actionHandler, ActionHandler.EventType.ACTION, (e) => {
      actionEventFired = true;
    });
    testingEvents.fireClickSequence(dom.getElement('actionDiv'));
    assertTrue('ACTION event was not fired', actionEventFired);
  },

  testBeforeActionCancel() {
    const actionEventFired = false;
    let beforeActionFired = false;
    events.listen(actionHandler, ActionHandler.EventType.ACTION, (e) => {
      actionEvent = e;
    });
    events.listen(actionHandler, ActionHandler.EventType.BEFOREACTION, (e) => {
      beforeActionFired = true;
      e.preventDefault();
    });
    testingEvents.fireClickSequence(dom.getElement('actionDiv'));
    assertTrue(beforeActionFired);
    assertFalse(actionEventFired);
  },
});
