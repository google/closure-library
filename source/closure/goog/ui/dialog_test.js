// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.ui.DialogTest');
goog.setTestOnly('goog.ui.DialogTest');

goog.require('goog.a11y.aria');
goog.require('goog.a11y.aria.Role');
goog.require('goog.a11y.aria.State');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.fx.css3');
goog.require('goog.html.SafeHtml');
goog.require('goog.html.testing');
goog.require('goog.style');
goog.require('goog.testing.MockClock');
goog.require('goog.testing.events');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');
goog.require('goog.ui.Dialog');
goog.require('goog.userAgent');
let bodyChildElement;
let decorateTarget;
let dialog;
let mockClock;

function setUp() {
  mockClock = new goog.testing.MockClock(true);
  bodyChildElement = goog.dom.createElement(goog.dom.TagName.DIV);
  document.body.appendChild(bodyChildElement);
  dialog = new goog.ui.Dialog();
  const buttons = new goog.ui.Dialog.ButtonSet();
  buttons.set(goog.ui.Dialog.DefaultButtonKeys.CANCEL, 'Foo!', false, true);
  buttons.set(goog.ui.Dialog.DefaultButtonKeys.OK, 'OK', true);
  dialog.setButtonSet(buttons);
  dialog.setVisible(true);

  decorateTarget = goog.dom.createDom(goog.dom.TagName.DIV);
  document.body.appendChild(decorateTarget);
}

function tearDown() {
  dialog.dispose();
  goog.dom.removeNode(bodyChildElement);
  goog.dom.removeNode(decorateTarget);
  mockClock.dispose();
}

function testCrossFrameFocus() {
  // Firefox (3.6, maybe future versions) fails this test when there are too
  // many other test files being run concurrently.
  if (goog.userAgent.IE || goog.userAgent.GECKO) {
    return;
  }
  dialog.setVisible(false);
  const iframeWindow = goog.dom.getElement('f').contentWindow;
  const iframeInput = goog.dom.getElementsByTagName(
      goog.dom.TagName.INPUT, iframeWindow.document)[0];
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  const dialogElement = dialog.getElement();
  let focusCounter = 0;
  goog.events.listen(dialogElement, 'focus', function() { focusCounter++; });
  iframeInput.focus();
  dialog.setVisible(true);
  dialog.setVisible(false);
  iframeInput.focus();
  dialog.setVisible(true);
  assertEquals(2, focusCounter);
}

function testNoDisabledButtonFocus() {
  dialog.setVisible(false);
  const buttonEl =
      dialog.getButtonSet().getButton(goog.ui.Dialog.DefaultButtonKeys.OK);
  buttonEl.disabled = true;
  let focused = false;
  buttonEl.focus = function() { focused = true; };
  dialog.setVisible(true);
  assertFalse('Should not have called focus on disabled button', focused);
}

function testNoTitleClose() {
  assertTrue(goog.style.isElementShown(dialog.getTitleCloseElement()));
  dialog.setHasTitleCloseButton(false);
  assertFalse(goog.style.isElementShown(dialog.getTitleCloseElement()));
}


/**
 * Helper that clicks the first button in the dialog and checks if that
 * results in a goog.ui.Dialog.EventType.SELECT being dispatched.
 * @param {boolean} disableButton Whether to disable the button being
 *     tested.
 * @return {boolean} Whether a goog.ui.Dialog.EventType.SELECT was dispatched.
 */
function checkSelectDispatchedOnButtonClick(disableButton) {
  const aButton = goog.dom.getElementsByTagName(
      goog.dom.TagName.BUTTON, dialog.getButtonElement())[0];
  assertNotEquals(aButton, null);
  aButton.disabled = disableButton;
  let wasCalled = false;
  const callRecorder = function() {
    wasCalled = true;
  };
  goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, callRecorder);
  goog.testing.events.fireClickSequence(aButton);
  return wasCalled;
}

function testButtonClicksDispatchSelectEvents() {
  assertTrue(
      'Select event should be dispatched' +
          ' when clicking on an enabled button',
      checkSelectDispatchedOnButtonClick(false));
}

function testDisabledButtonClicksDontDispatchSelectEvents() {
  assertFalse(
      'Select event should not be dispatched' +
          ' when clicking on a disabled button',
      checkSelectDispatchedOnButtonClick(true));
}

function testEnterKeyDispatchesDefaultSelectEvents() {
  const okButton = goog.dom.getElementsByTagName(
      goog.dom.TagName.BUTTON, dialog.getButtonElement())[1];
  assertNotEquals(okButton, null);
  let wasCalled = false;
  const callRecorder = function() {
    wasCalled = true;
  };
  goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, callRecorder);
  // Test that event is not dispatched when default button is disabled.
  okButton.disabled = true;
  goog.testing.events.fireKeySequence(
      dialog.getElement(), goog.events.KeyCodes.ENTER);
  assertFalse(wasCalled);
  // Test that event is dispatched when default button is enabled.
  okButton.disabled = false;
  goog.testing.events.fireKeySequence(
      dialog.getElement(), goog.events.KeyCodes.ENTER);
  assertTrue(wasCalled);
}

function testEnterKeyOnDisabledDefaultButtonDoesNotDispatchSelectEvents() {
  const okButton = goog.dom.getElementsByTagName(
      goog.dom.TagName.BUTTON, dialog.getButtonElement())[1];
  okButton.focus();

  const callRecorder = goog.testing.recordFunction();
  goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, callRecorder);

  okButton.disabled = true;
  goog.testing.events.fireKeySequence(okButton, goog.events.KeyCodes.ENTER);
  assertEquals(0, callRecorder.getCallCount());

  okButton.disabled = false;
  goog.testing.events.fireKeySequence(okButton, goog.events.KeyCodes.ENTER);
  assertEquals(1, callRecorder.getCallCount());
}

function testEnterKeyDoesNothingOnSpecialFormElements() {
  checkEnterKeyDoesNothingOnSpecialFormElement(
      goog.html.SafeHtml.create('textarea', {}, 'Hello dialog'),
      'TEXTAREA');

  checkEnterKeyDoesNothingOnSpecialFormElement(
      goog.html.SafeHtml.create('select', {}, 'Selection'),
      'SELECT');

  checkEnterKeyDoesNothingOnSpecialFormElement(
      goog.html.SafeHtml.create('a', {'href': 'http://google.com'},
          'Hello dialog'),
      'A');
}

function checkEnterKeyDoesNothingOnSpecialFormElement(content, tagName) {
  dialog.setSafeHtmlContent(content);
  const formElement =
      dialog.getContentElement().getElementsByTagName(tagName)[0];
  let wasCalled = false;
  const callRecorder = function() {
    wasCalled = true;
  };
  goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, callRecorder);

  // Enter does not fire on the enabled form element.
  goog.testing.events.fireKeySequence(formElement, goog.events.KeyCodes.ENTER);
  assertFalse(wasCalled);

  // Enter fires on the disabled form element.
  formElement.disabled = true;
  goog.testing.events.fireKeySequence(formElement, goog.events.KeyCodes.ENTER);
  assertTrue(wasCalled);
}

function testEscapeKeyDoesNothingOnSpecialFormElements() {
  dialog.setSafeHtmlContent(goog.html.SafeHtml.create('select', {}, [
    goog.html.SafeHtml.create('option', {}, 'Hello'),
    goog.html.SafeHtml.create('option', {}, 'dialog')
  ]));
  const select = dialog.getContentElement().getElementsByTagName('SELECT')[0];
  let wasCalled = false;
  const callRecorder = function() {
    wasCalled = true;
  };
  goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, callRecorder);

  // Escape does not fire on the enabled select box.
  goog.testing.events.fireKeySequence(select, goog.events.KeyCodes.ESC);
  assertFalse(wasCalled);

  // Escape fires on the disabled select.
  select.disabled = true;
  goog.testing.events.fireKeySequence(select, goog.events.KeyCodes.ESC);
  assertTrue(wasCalled);
}

function testEscapeCloses() {
  // If escapeCloses is set to false, the dialog should ignore the escape key
  assertTrue(dialog.isEscapeToCancel());
  dialog.setEscapeToCancel(false);
  assertFalse(dialog.isEscapeToCancel());

  const buttons = new goog.ui.Dialog.ButtonSet();
  buttons.set(goog.ui.Dialog.DefaultButtonKeys.OK, 'OK', true);
  dialog.setButtonSet(buttons);
  goog.testing.events.fireKeySequence(
      dialog.getContentElement(), goog.events.KeyCodes.ESC);
  assertTrue(dialog.isVisible());

  // Having a cancel button should make no difference, escape should still not
  // work.
  buttons.set(goog.ui.Dialog.DefaultButtonKeys.CANCEL, 'Foo!', false, true);
  dialog.setButtonSet(buttons);
  goog.testing.events.fireKeySequence(
      dialog.getContentElement(), goog.events.KeyCodes.ESC);
  assertTrue(dialog.isVisible());
}

function testKeydownClosesWithoutButtonSet() {
  // Clear button set
  dialog.setButtonSet(null);

  // Create a custom button.
  dialog.setSafeHtmlContent(goog.html.SafeHtml.create('button',
      {'id': 'button', 'name': 'ok'},
      'OK'));
  let wasCalled = false;
  function called() { wasCalled = true; }
  const element = goog.dom.getElement('button');
  goog.events.listen(element, goog.events.EventType.KEYPRESS, called);
  // Listen for 'Enter' on the button.
  // This tests using a dialog with no ButtonSet that has been set. Uses
  // a custom button.  The callback should be called with no exception thrown.
  goog.testing.events.fireKeySequence(element, goog.events.KeyCodes.ENTER);
  assertTrue('Should have gotten event on the button.', wasCalled);
}

function testEnterKeyWithoutDefaultDoesNotPreventPropagation() {
  const buttons = new goog.ui.Dialog.ButtonSet();
  buttons.set(goog.ui.Dialog.DefaultButtonKeys.CANCEL, 'Foo!', false);
  // Set a button set without a default selected button
  dialog.setButtonSet(buttons);
  dialog.setSafeHtmlContent(goog.html.SafeHtml.create('span',
      {'id': 'linkel', 'tabindex': '0'},
      'Link Span'));

  let call = false;
  function called() { call = true; }
  const element = document.getElementById('linkel');
  goog.events.listen(element, goog.events.EventType.KEYDOWN, called);
  goog.testing.events.fireKeySequence(element, goog.events.KeyCodes.ENTER);

  assertTrue('Should have gotten event on the link', call);
}

function testPreventDefaultedSelectCausesStopPropagation() {
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);

  const callCount = 0;
  let keypressCount = 0;
  let keydownCount = 0;

  const preventDefaulter = function(e) {
    e.preventDefault();
  };

  goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, preventDefaulter);
  goog.events.listen(document.body, goog.events.EventType.KEYPRESS, function() {
    keypressCount++;
  });
  goog.events.listen(document.body, goog.events.EventType.KEYDOWN, function() {
    keydownCount++;
  });

  // Ensure that if the SELECT event is prevented, all key events
  // are still stopped from propagating.
  goog.testing.events.fireKeySequence(
      dialog.getElement(), goog.events.KeyCodes.ENTER);
  assertEquals('The KEYPRESS should be stopped', 0, keypressCount);
  assertEquals('The KEYDOWN should not be stopped', 1, keydownCount);

  keypressCount = 0;
  keydownCount = 0;
  goog.testing.events.fireKeySequence(
      dialog.getElement(), goog.events.KeyCodes.ESC);
  assertEquals('The KEYDOWN should be stopped', 0, keydownCount);
  // Note: Some browsers don't yield keypresses on escape, so don't check.

  goog.events.unlisten(
      dialog, goog.ui.Dialog.EventType.SELECT, preventDefaulter);

  keypressCount = 0;
  keydownCount = 0;
  goog.testing.events.fireKeySequence(
      dialog.getElement(), goog.events.KeyCodes.ENTER);
  assertEquals('The KEYPRESS should be stopped', 0, keypressCount);
  assertEquals('The KEYDOWN should not be stopped', 1, keydownCount);
}

function testEnterKeyHandledInKeypress() {
  let inKeyPress = false;
  goog.events.listen(document.body, goog.events.EventType.KEYPRESS, function() {
    inKeyPress = true;
  }, true /* capture */);
  goog.events.listen(document.body, goog.events.EventType.KEYPRESS, function() {
    inKeyPress = false;
  }, false /* !capture */);
  let selectCalled = false;
  goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, function() {
    selectCalled = true;
    assertTrue(
        'Select must be dispatched during keypress to allow popups',
        inKeyPress);
  });

  goog.testing.events.fireKeySequence(
      dialog.getElement(), goog.events.KeyCodes.ENTER);
  assertTrue(selectCalled);
}

function testShiftTabAtTopSetsUpWrapAndDoesNotPreventPropagation() {
  dialog.setupBackwardTabWrap = goog.testing.recordFunction();
  shiftTabRecorder = goog.testing.recordFunction();

  goog.events.listen(
      dialog.getElement(), goog.events.EventType.KEYDOWN, shiftTabRecorder);
  const shiftProperties = {shiftKey: true};
  goog.testing.events.fireKeySequence(
      dialog.getElement(), goog.events.KeyCodes.TAB, shiftProperties);

  assertNotNull(
      'Should have gotten event on Shift+TAB', shiftTabRecorder.getLastCall());
  assertNotNull(
      'Backward tab wrap should have been set up',
      dialog.setupBackwardTabWrap.getLastCall());
}

function testButtonsWithContentsDispatchSelectEvents() {
  const aButton = goog.dom.getElementsByTagName(
      goog.dom.TagName.BUTTON, dialog.getButtonElement())[0];
  const aSpan = goog.dom.createElement(goog.dom.TagName.SPAN);
  aButton.appendChild(aSpan);
  let wasCalled = false;
  const callRecorder = function() {
    wasCalled = true;
  };
  goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, callRecorder);
  goog.testing.events.fireClickSequence(aSpan);
  assertTrue(wasCalled);
}

function testAfterHideEvent() {
  let wasCalled = false;
  const callRecorder = function() {
    wasCalled = true;
  };
  goog.events.listen(dialog, goog.ui.Dialog.EventType.AFTER_HIDE, callRecorder);
  dialog.setVisible(false);
  assertTrue(wasCalled);
}

function testAfterShowEvent() {
  dialog.setVisible(false);
  let wasCalled = false;
  const callRecorder = function() {
    wasCalled = true;
  };
  goog.events.listen(dialog, goog.ui.Dialog.EventType.AFTER_SHOW, callRecorder);
  dialog.setVisible(true);
  assertTrue(wasCalled);
}

function testCannedButtonSets() {
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  assertButtons([goog.ui.Dialog.DefaultButtonKeys.OK]);

  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
  assertButtons([
    goog.ui.Dialog.DefaultButtonKeys.OK, goog.ui.Dialog.DefaultButtonKeys.CANCEL
  ]);

  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.YES_NO);
  assertButtons([
    goog.ui.Dialog.DefaultButtonKeys.YES, goog.ui.Dialog.DefaultButtonKeys.NO
  ]);

  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.YES_NO_CANCEL);
  assertButtons([
    goog.ui.Dialog.DefaultButtonKeys.YES, goog.ui.Dialog.DefaultButtonKeys.NO,
    goog.ui.Dialog.DefaultButtonKeys.CANCEL
  ]);

  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.CONTINUE_SAVE_CANCEL);
  assertButtons([
    goog.ui.Dialog.DefaultButtonKeys.CONTINUE,
    goog.ui.Dialog.DefaultButtonKeys.SAVE,
    goog.ui.Dialog.DefaultButtonKeys.CANCEL
  ]);
}

function testFactoryButtonSets() {
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
  assertButtons([goog.ui.Dialog.DefaultButtonKeys.OK]);

  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
  assertButtons([
    goog.ui.Dialog.DefaultButtonKeys.OK, goog.ui.Dialog.DefaultButtonKeys.CANCEL
  ]);

  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.createYesNo());
  assertButtons([
    goog.ui.Dialog.DefaultButtonKeys.YES, goog.ui.Dialog.DefaultButtonKeys.NO
  ]);

  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.createYesNoCancel());
  assertButtons([
    goog.ui.Dialog.DefaultButtonKeys.YES, goog.ui.Dialog.DefaultButtonKeys.NO,
    goog.ui.Dialog.DefaultButtonKeys.CANCEL
  ]);

  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.createContinueSaveCancel());
  assertButtons([
    goog.ui.Dialog.DefaultButtonKeys.CONTINUE,
    goog.ui.Dialog.DefaultButtonKeys.SAVE,
    goog.ui.Dialog.DefaultButtonKeys.CANCEL
  ]);
}

function testDefaultButtonClassName() {
  const key = 'someKey';
  const msg = 'someMessage';
  let isDefault = false;
  const buttonSetOne = new goog.ui.Dialog.ButtonSet().set(key, msg, isDefault);
  dialog.setButtonSet(buttonSetOne);
  const defaultClassName = goog.getCssName(buttonSetOne.class_, 'default');
  const buttonOne = buttonSetOne.getButton(key);
  assertNotEquals(defaultClassName, buttonOne.className);
  isDefault = true;
  const buttonSetTwo = new goog.ui.Dialog.ButtonSet().set(key, msg, isDefault);
  dialog.setButtonSet(buttonSetTwo);
  const buttonTwo = buttonSetTwo.getButton(key);
  assertEquals(defaultClassName, buttonTwo.className);
}

function testGetButton() {
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  const buttons =
      document.getElementsByName(goog.ui.Dialog.DefaultButtonKeys.OK);
  assertEquals(
      buttons[0],
      dialog.getButtonSet().getButton(goog.ui.Dialog.DefaultButtonKeys.OK));
}

function testGetAllButtons() {
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.YES_NO_CANCEL);
  const buttons = goog.dom.getElementsByTagName(
      goog.dom.TagName.BUTTON, dialog.getElement());
  for (let i = 0; i < buttons.length; i++) {
    assertEquals(buttons[i], dialog.getButtonSet().getAllButtons()[i]);
  }
}

function testSetButtonEnabled() {
  const buttonSet = goog.ui.Dialog.ButtonSet.createYesNoCancel();
  dialog.setButtonSet(buttonSet);
  assertFalse(
      buttonSet.getButton(goog.ui.Dialog.DefaultButtonKeys.NO).disabled);
  buttonSet.setButtonEnabled(goog.ui.Dialog.DefaultButtonKeys.NO, false);
  assertTrue(buttonSet.getButton(goog.ui.Dialog.DefaultButtonKeys.NO).disabled);
  buttonSet.setButtonEnabled(goog.ui.Dialog.DefaultButtonKeys.NO, true);
  assertFalse(
      buttonSet.getButton(goog.ui.Dialog.DefaultButtonKeys.NO).disabled);
}

function testSetAllButtonsEnabled() {
  const buttonSet = goog.ui.Dialog.ButtonSet.createContinueSaveCancel();
  dialog.setButtonSet(buttonSet);
  const buttons = buttonSet.getAllButtons();
  for (let i = 0; i < buttons.length; i++) {
    assertFalse(buttons[i].disabled);
  }

  buttonSet.setAllButtonsEnabled(false);
  for (let i = 0; i < buttons.length; i++) {
    assertTrue(buttons[i].disabled);
  }

  buttonSet.setAllButtonsEnabled(true);
  for (let i = 0; i < buttons.length; i++) {
    assertFalse(buttons[i].disabled);
  }
}

function testIframeMask() {
  const prevNumFrames =
      goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.IFRAME).length;
  // generate a new dialog
  dialog.dispose();
  dialog = new goog.ui.Dialog(null, true /* iframe mask */);
  dialog.setVisible(true);

  // Test that the dialog added one iframe to the document.
  // The absolute number of iframes should not be tested because,
  // in certain cases, the test runner itself can can add an iframe
  // to the document as part of a strategy not to block the UI for too long.
  // See goog.async.nextTick.getSetImmediateEmulator_.
  const curNumFrames =
      goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.IFRAME).length;
  assertEquals('No iframe mask created', prevNumFrames + 1, curNumFrames);
}

function testNonModalDialog() {
  const prevNumFrames =
      goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.IFRAME).length;
  // generate a new dialog
  dialog.dispose();
  dialog = new goog.ui.Dialog(null, true /* iframe mask */);
  dialog.setModal(false);
  assertAriaHidden(false);
  dialog.setVisible(true);
  assertAriaHidden(true);

  // Test that the dialog did not change the number of iframes in the document.
  // The absolute number of iframes should not be tested because,
  // in certain cases, the test runner itself can can add an iframe
  // to the document as part of a strategy not to block the UI for too long.
  // See goog.async.nextTick.getSetImmediateEmulator_.
  const curNumFrames =
      goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.IFRAME).length;
  assertEquals(
      'Iframe mask created for modal dialog', prevNumFrames, curNumFrames);
}

function testSwapModalForOpenDialog() {
  dialog.dispose();
  dialog = new goog.ui.Dialog(null, true /* iframe mask */);
  assertAriaHidden(false);
  dialog.setVisible(true);
  assertAriaHidden(true);
  dialog.setModal(false);
  assertAriaHidden(false);
  assertFalse(
      'IFrame bg element should not be in dom',
      goog.dom.contains(document.body, dialog.getBackgroundIframe()));
  assertFalse(
      'bg element should not be in dom',
      goog.dom.contains(document.body, dialog.getBackgroundElement()));

  dialog.setModal(true);
  assertAriaHidden(true);
  assertTrue(
      'IFrame bg element should be in dom',
      goog.dom.contains(document.body, dialog.getBackgroundIframe()));
  assertTrue(
      'bg element should be in dom',
      goog.dom.contains(document.body, dialog.getBackgroundElement()));

  assertEquals(
      'IFrame bg element is a child of body', document.body,
      dialog.getBackgroundIframe().parentNode);
  assertEquals(
      'bg element is a child of body', document.body,
      dialog.getBackgroundElement().parentNode);

  assertTrue(
      'IFrame bg element should visible',
      goog.style.isElementShown(dialog.getBackgroundIframe()));
  assertTrue(
      'bg element should be visible',
      goog.style.isElementShown(dialog.getBackgroundElement()));
}


/**
 * Assert that the dialog has buttons with the given keys in the correct
 * order.
 * @param {Array<string>} keys An array of button keys.
 */
function assertButtons(keys) {
  const buttons = goog.dom.getElementsByTagName(
      goog.dom.TagName.BUTTON, dialog.getElement());
  const actualKeys = [];
  for (let i = 0; i < buttons.length; i++) {
    actualKeys[i] = buttons[i].name;
  }
  assertArrayEquals(keys, actualKeys);
}

function testButtonSetOkFiresDialogEventOnEscape() {
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  let wasCalled = false;
  const callRecorder = function() {
    wasCalled = true;
  };
  goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, callRecorder);
  goog.testing.events.fireKeySequence(
      dialog.getElement(), goog.events.KeyCodes.ESC);
  assertTrue(wasCalled);
}

function testHideButtons_afterRender() {
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  assertTrue(goog.style.isElementShown(dialog.buttonEl_));
  dialog.setButtonSet(null);
  assertFalse(goog.style.isElementShown(dialog.buttonEl_));
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  assertTrue(goog.style.isElementShown(dialog.buttonEl_));
}

function testHideButtons_beforeRender() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.setButtonSet(null);
  dialog.setVisible(true);
  assertFalse(goog.style.isElementShown(dialog.buttonEl_));
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  assertTrue(goog.style.isElementShown(dialog.buttonEl_));
}

function testHideButtons_beforeDecorate() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.setButtonSet(null);
  dialog.decorate(decorateTarget);
  dialog.setVisible(true);
  assertFalse(goog.style.isElementShown(dialog.buttonEl_));
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  assertTrue(goog.style.isElementShown(dialog.buttonEl_));
}

function testAriaLabelledBy_render() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.render();
  assertTrue(!!dialog.getTitleTextElement().id);
  assertNotNull(dialog.getElement());
  assertEquals(
      dialog.getTitleTextElement().id,
      goog.a11y.aria.getState(dialog.getElement(), 'labelledby'));
}

function testAriaLabelledBy_decorate() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.decorate(decorateTarget);
  dialog.setVisible(true);
  assertTrue(!!dialog.getTitleTextElement().id);
  assertNotNull(dialog.getElement());
  assertEquals(
      dialog.getTitleTextElement().id,
      goog.a11y.aria.getState(dialog.getElement(), 'labelledby'));
}


function testPreferredAriaRole_renderDefault() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.render();
  assertNotNull(dialog.getElement());
  assertEquals(
      dialog.getPreferredAriaRole(),
      goog.a11y.aria.getRole(dialog.getElement()));
}

function testPreferredAriaRole_decorateDefault() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.decorate(decorateTarget);
  assertNotNull(dialog.getElement());
  assertEquals(
      dialog.getPreferredAriaRole(),
      goog.a11y.aria.getRole(dialog.getElement()));
}

function testPreferredAriaRole_renderOverride() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.setPreferredAriaRole(goog.a11y.aria.Role.ALERTDIALOG);
  dialog.render();
  assertNotNull(dialog.getElement());
  assertEquals(
      goog.a11y.aria.Role.ALERTDIALOG,
      goog.a11y.aria.getRole(dialog.getElement()));
}

function testPreferredAriaRole_decorateOverride() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.setPreferredAriaRole(goog.a11y.aria.Role.ALERTDIALOG);
  dialog.decorate(decorateTarget);
  assertNotNull(dialog.getElement());
  assertEquals(
      goog.a11y.aria.Role.ALERTDIALOG,
      goog.a11y.aria.getRole(dialog.getElement()));
}

function testDefaultOpacityIsAppliedOnRender() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.render();
  assertEquals(0.5, goog.style.getOpacity(dialog.getBackgroundElement()));
}

function testDefaultOpacityIsAppliedOnDecorate() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.decorate(decorateTarget);
  assertEquals(0.5, goog.style.getOpacity(dialog.getBackgroundElement()));
}

function testDraggableStyle() {
  assertTrue(
      'draggable CSS class is set',
      goog.dom.classlist.contains(
          dialog.titleEl_, 'modal-dialog-title-draggable'));
  dialog.setDraggable(false);
  assertFalse(
      'draggable CSS class is removed',
      goog.dom.classlist.contains(
          dialog.titleEl_, 'modal-dialog-title-draggable'));
}

function testDraggingLifecycle() {
  dialog.dispose();

  dialog = new goog.ui.Dialog();
  dialog.setDraggerLimits_ = goog.testing.recordFunction();
  dialog.createDom();
  assertNull('dragger is not created in createDom', dialog.dragger_);

  dialog.setVisible(true);
  assertNotNull(
      'dragger is created when the dialog is rendered', dialog.dragger_);

  assertNull(
      'dragging limits are not set just before dragging',
      dialog.setDraggerLimits_.getLastCall());
  goog.testing.events.fireMouseDownEvent(dialog.titleEl_);
  assertNotNull(
      'dragging limits are set', dialog.setDraggerLimits_.getLastCall());

  dialog.exitDocument();
  assertNull('dragger is cleaned up in exitDocument', dialog.dragger_);
}

function testDisposingVisibleDialogWithTransitionsDoesNotThrowException() {
  const transition =
      goog.fx.css3.fadeIn(dialog.getElement(), 0.1 /* duration */);

  dialog.setTransition(transition, transition, transition, transition);
  dialog.setVisible(true);
  dialog.dispose();
  // Nothing to assert. We only want to ensure that there is no error.
}

function testEventsDuringAnimation() {
  dialog.dispose();
  dialog = new goog.ui.Dialog();
  dialog.render();
  dialog.setTransition(
      goog.fx.css3.fadeIn(dialog.getElement(), 1),
      goog.fx.css3.fadeIn(dialog.getBackgroundElement(), 1),
      goog.fx.css3.fadeOut(dialog.getElement(), 1),
      goog.fx.css3.fadeOut(dialog.getBackgroundElement(), 1));
  dialog.setVisible(true);
  assertTrue(dialog.isVisible());

  const buttonSet = dialog.getButtonSet();
  const button = buttonSet.getButton(buttonSet.getDefault());

  // The button event fires while the animation is still going.
  goog.testing.events.fireClickSequence(button);
  mockClock.tick(2000);
  assertFalse(dialog.isVisible());
}

function testHtmlContent() {
  dialog.setSafeHtmlContent(
      goog.html.testing.newSafeHtmlForTest(
          '<span class="theSpan">Hello</span>'));
  const spanEl =
      goog.dom.getElementByClass('theSpan', dialog.getContentElement());
  assertEquals('Hello', goog.dom.getTextContent(spanEl));
  assertEquals('<span class="theSpan">Hello</span>', dialog.getContent());
  assertEquals(
      '<span class="theSpan">Hello</span>',
      goog.html.SafeHtml.unwrap(dialog.getSafeHtmlContent()));
}

function testSetTextContent() {
  dialog.setTextContent('Dinner <3\nTogether');
  assertEquals('Dinner &lt;3<br>Together', dialog.getContent());
}

function testFocus() {
  // Focus should go to the dialog element.
  document.body.focus();
  dialog.focus();
  assertEquals(dialog.getElement(), document.activeElement);
}

// Asserts that a test element which is a child of the document body has the
// aria property 'hidden' set on it, or not.
function assertAriaHidden(expectedHidden) {
  const expectedString = expectedHidden ? 'true' : '';
  assertEquals(
      expectedString,
      goog.a11y.aria.getState(bodyChildElement, goog.a11y.aria.State.HIDDEN));
}
