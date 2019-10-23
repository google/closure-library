// Copyright 2008 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

goog.module('goog.demos.editor.HelloWorldDialogTest');
goog.setTestOnly('goog.demos.editor.HelloWorldDialogTest');

const ArgumentMatcher = goog.require('goog.testing.mockmatchers.ArgumentMatcher');
const DomHelper = goog.require('goog.dom.DomHelper');
const EventHandler = goog.require('goog.events.EventHandler');
const EventType = goog.require('goog.ui.editor.AbstractDialog.EventType');
const HelloWorldDialog = goog.require('goog.demos.editor.HelloWorldDialog');
const LooseMock = goog.require('goog.testing.LooseMock');
const googTestingEvents = goog.require('goog.testing.events');
const testSuite = goog.require('goog.testing.testSuite');

let dialog;
let mockOkHandler;

const CUSTOM_MESSAGE = 'Hello, cruel world...';

testSuite({
  setUp() {
    mockOkHandler = new LooseMock(EventHandler);
  },

  tearDown() {
    dialog.dispose();
  },

  /**
   * Tests that when you show the dialog, the input field has the correct
   * sample text in it.
   */
  testShow() {
    mockOkHandler.$replay();
    createAndShow();

    assertEquals(
        'Input field has incorrect sample text', 'Hello, world!',
        dialog.input_.value);
    mockOkHandler.$verify();
  },

  /**
   * Tests that clicking OK dispatches an event carying the entered message.
   */
  testOk() {
    expectOk(CUSTOM_MESSAGE);
    mockOkHandler.$replay();
    createAndShow();

    dialog.input_.value = CUSTOM_MESSAGE;
    googTestingEvents.fireClickSequence(dialog.getOkButtonElement());

    mockOkHandler.$verify();  // Verifies OK is dispatched with correct message.
  },
});

/**
 * Creates and shows the dialog to be tested.
 */
function createAndShow() {
  dialog = new HelloWorldDialog(new DomHelper());
  dialog.addEventListener(EventType.OK, mockOkHandler);
  dialog.show();
}

/**
 * Sets up the mock event handler to expect an OK event with the given
 * message.
 * @param {string} message Hello world message the OK event is expected to
 *     carry.
 */
function expectOk(message) {
  mockOkHandler.handleEvent(new ArgumentMatcher(function(arg) {
    return arg.type == EventType.OK && arg.message == message;
  }));
}
