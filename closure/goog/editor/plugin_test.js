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

goog.module('goog.editor.PluginTest');
goog.setTestOnly();

const Field = goog.require('goog.editor.Field');
const Plugin = goog.require('goog.editor.Plugin');
const StrictMock = goog.require('goog.testing.StrictMock');
const functions = goog.require('goog.functions');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let plugin;
let fieldObject;

testSuite({
  setUp() {
    plugin = new Plugin();
    fieldObject = {};
  },

  tearDown() {
    plugin.dispose();
  },

  testRegisterFieldObject() {
    plugin.registerFieldObject(fieldObject);
    assertEquals(
        'Register field object must be stored in protected field.', fieldObject,
        plugin.fieldObject);

    assertFalse(
        'Newly registered plugin must not be enabled.',
        plugin.isEnabled(fieldObject));
  },

  testUnregisterFieldObject() {
    plugin.registerFieldObject(fieldObject);
    plugin.enable(fieldObject);
    plugin.unregisterFieldObject(fieldObject);

    assertNull(
        'fieldObject property must be undefined after ' +
            'unregistering a field object.',
        plugin.fieldObject);
    assertFalse(
        'Unregistered field object must not be enabled',
        plugin.isEnabled(fieldObject));
  },

  testEnable() {
    plugin.registerFieldObject(fieldObject);
    plugin.enable(fieldObject);

    assertTrue(
        'Enabled field object must be enabled according to isEnabled().',
        plugin.isEnabled(fieldObject));
  },

  testDisable() {
    plugin.registerFieldObject(fieldObject);
    plugin.enable(fieldObject);
    plugin.disable(fieldObject);

    assertFalse(
        'Disabled field object must be disabled according to ' +
            'isEnabled().',
        plugin.isEnabled(fieldObject));
  },

  testIsEnabled() {
    // Other base cases covered while testing enable() and disable().

    assertFalse(
        'Unregistered field object must be disabled according ' +
            'to isEnabled().',
        plugin.isEnabled(fieldObject));
  },

  testIsSupportedCommand() {
    assertFalse(
        'Base plugin class must not support any commands.',
        plugin.isSupportedCommand('+indent'));
  },

  testExecCommand() {
    const mockField = new StrictMock(Field);
    plugin.registerFieldObject(mockField);

    if (userAgent.GECKO) {
      mockField.stopChangeEvents(true, true);
    }
    mockField.dispatchBeforeChange();
    // Note(user): dispatch change turns back on (delayed) change events.
    mockField.dispatchChange();
    mockField.dispatchSelectionChangeEvent();
    mockField.$replay();

    let passedArg;
    let passedCommand;

    plugin.execCommandInternal = (command, arg) => {
      passedCommand = command;
      passedArg = arg;
    };
    plugin.execCommand('+indent', true);

    // Verify that execCommand dispatched the expected events.
    mockField.$verify();
    mockField.$reset();
    // Verify that execCommandInternal was called with the correct arguments.
    assertEquals('+indent', passedCommand);
    assertTrue(passedArg);

    plugin.isSilentCommand = functions.constant(true);
    mockField.$replay();
    plugin.execCommand('+outdent', false);
    // Verify that execCommand on a silent plugin dispatched no events.
    mockField.$verify();
    // Verify that execCommandInternal was called with the correct arguments.
    assertEquals('+outdent', passedCommand);
    assertFalse(passedArg);
  },

  /** Regression test for http://b/issue?id=1471355 . */
  testExecCommandException() {
    const mockField = new StrictMock(Field);
    plugin.registerFieldObject(mockField);
    plugin.execCommandInternal = () => {
      throw 1;
    };

    if (userAgent.GECKO) {
      mockField.stopChangeEvents(true, true);
    }
    mockField.dispatchBeforeChange();
    // Note(user): dispatch change turns back on (delayed) change events.
    mockField.dispatchChange();
    mockField.dispatchSelectionChangeEvent();
    mockField.$replay();

    assertThrows('Exception should not be swallowed', () => {
      plugin.execCommand();
    });

    // Verifies that cleanup is done despite the exception.
    mockField.$verify();
  },

  testDisposed() {
    plugin.registerFieldObject(fieldObject);
    plugin.dispose();
    assert(plugin.getDisposed());
    assertNull(
        'Disposed plugin must not have a field object.', plugin.fieldObject);
    assertFalse(
        'Disposed plugin must not have an enabled field object.',
        plugin.isEnabled(fieldObject));
  },

  testIsAndSetAutoDispose() {
    assertTrue('Plugin must start auto-disposable', plugin.isAutoDispose());

    plugin.setAutoDispose(false);
    assertFalse(plugin.isAutoDispose());

    plugin.setAutoDispose(true);
    assertTrue(plugin.isAutoDispose());
  },
});
