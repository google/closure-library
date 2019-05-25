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

goog.module('goog.editor.plugins.AbstractTabHandlerTest');
goog.setTestOnly();

const AbstractTabHandler = goog.require('goog.editor.plugins.AbstractTabHandler');
const BrowserEvent = goog.require('goog.events.BrowserEvent');
const Field = goog.require('goog.editor.Field');
const FieldMock = goog.require('goog.testing.editor.FieldMock');
const KeyCodes = goog.require('goog.events.KeyCodes');
const StrictMock = goog.require('goog.testing.StrictMock');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let tabHandler;
let editableField;
let handleTabKeyCalled = false;

testSuite({
  setUp() {
    editableField = new FieldMock();
    editableField.inModalMode = Field.prototype.inModalMode;
    editableField.setModalMode = Field.prototype.setModalMode;

    tabHandler = new AbstractTabHandler();
    tabHandler.registerFieldObject(editableField);
    tabHandler.handleTabKey = (e) => {
      handleTabKeyCalled = true;
      return true;
    };
  },

  tearDown() {
    tabHandler.dispose();
  },

  testHandleKey() {
    const event = new StrictMock(BrowserEvent);
    event.keyCode = KeyCodes.TAB;
    event.ctrlKey = false;
    event.metaKey = false;

    assertTrue(
        'Event must be handled when no modifier keys are pressed.',
        tabHandler.handleKeyboardShortcut(event, '', false));
    assertTrue(handleTabKeyCalled);
    handleTabKeyCalled = false;

    editableField.setModalMode(true);
    if (userAgent.GECKO) {
      assertFalse(
          'Event must not be handled when in modal mode',
          tabHandler.handleKeyboardShortcut(event, '', false));
      assertFalse(handleTabKeyCalled);
    } else {
      assertTrue(
          'Event must be handled when in modal mode',
          tabHandler.handleKeyboardShortcut(event, '', false));
      assertTrue(handleTabKeyCalled);
      handleTabKeyCalled = false;
    }

    event.ctrlKey = true;
    assertFalse(
        'Plugin must never handle tab key press when ctrlKey is pressed.',
        tabHandler.handleKeyboardShortcut(event, '', false));
    assertFalse(handleTabKeyCalled);

    event.ctrlKey = false;
    event.metaKey = true;
    assertFalse(
        'Plugin must never handle tab key press when metaKey is pressed.',
        tabHandler.handleKeyboardShortcut(event, '', false));
    assertFalse(handleTabKeyCalled);
  },
});
