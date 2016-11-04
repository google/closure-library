// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.events.PasteHandlerTest');
goog.setTestOnly('goog.events.PasteHandlerTest');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.BrowserEvent');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.PasteHandler');
goog.require('goog.testing.MockClock');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

function setUp() {
  textarea = new goog.events.EventTarget();
  textarea.value = '';
  clock = new goog.testing.MockClock(true);
  handler = new goog.events.PasteHandler(textarea);
  pasted = false;
  goog.events.listen(
      handler, goog.events.PasteHandler.EventType.PASTE,
      function() { pasted = true; });
}

function tearDown() {
  textarea.dispose();
  handler.dispose();
  clock.dispose();
}

function newBrowserEvent(type) {
  if (goog.isString(type)) {
    return new goog.events.BrowserEvent({type: type});
  } else {
    return new goog.events.BrowserEvent(type);
  }
}

function testDispatchingPasteEventSupportedByAFewBrowsersWork() {
  if (!goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  var handlerThatSupportsPasteEvents = new goog.events.PasteHandler(textarea);
  // user clicks on the textarea and give it focus
  goog.events.listen(
      handlerThatSupportsPasteEvents, goog.events.PasteHandler.EventType.PASTE,
      function() { pasted = true; });
  textarea.dispatchEvent(newBrowserEvent('paste'));
  assertTrue(pasted);
}

function testJustTypingDoesntFirePasteEvent() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  // user clicks on the textarea and give it focus
  textarea.dispatchEvent(newBrowserEvent(goog.events.EventType.FOCUS));
  assertFalse(pasted);
  // user starts typing
  textarea.dispatchEvent(newBrowserEvent({
    type: goog.events.EventType.KEYDOWN,
    keyCode: goog.events.KeyCodes.A
  }));
  textarea.value = 'a';
  assertFalse(pasted);

  // still typing
  textarea.dispatchEvent(
      {type: goog.events.EventType.KEYDOWN, keyCode: goog.events.KeyCodes.B});
  textarea.value = 'ab';
  assertFalse(pasted);

  // ends typing
  textarea.dispatchEvent(
      {type: goog.events.EventType.KEYDOWN, keyCode: goog.events.KeyCodes.C});
  textarea.value = 'abc';
  assertFalse(pasted);
}

function testStartsOnInitialState() {
  assertTrue(handler.getState() == goog.events.PasteHandler.State.INIT);
  assertFalse(pasted);
}

function testBlurOnInit() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  textarea.dispatchEvent(goog.events.EventType.BLUR);
  assertTrue(handler.getState() == goog.events.PasteHandler.State.INIT);
  assertFalse(pasted);
}

function testFocusOnInit() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  textarea.dispatchEvent(goog.events.EventType.FOCUS);
  assertTrue(handler.getState() == goog.events.PasteHandler.State.FOCUSED);
  assertFalse(pasted);
}

function testInputOnFocus() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  // user clicks on the textarea
  textarea.dispatchEvent(newBrowserEvent(goog.events.EventType.FOCUS));
  clock.tick(
      goog.events.PasteHandler.MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER +
      1);
  // and right click -> paste a text!
  textarea.dispatchEvent(newBrowserEvent('input'));
  assertTrue(handler.getState() == goog.events.PasteHandler.State.FOCUSED);
  // make sure we detected it
  assertTrue(pasted);
}

function testKeyPressOnFocus() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  // user clicks on the textarea
  textarea.dispatchEvent(newBrowserEvent(goog.events.EventType.FOCUS));

  // starts typing something
  textarea.dispatchEvent(newBrowserEvent({
    type: goog.events.EventType.KEYDOWN,
    keyCode: goog.events.KeyCodes.A
  }));
  assertTrue(handler.getState() == goog.events.PasteHandler.State.TYPING);
  assertFalse(pasted);

  // and then presses ctrl+v
  textarea.dispatchEvent(newBrowserEvent({
    type: goog.events.EventType.KEYDOWN,
    keyCode: goog.events.KeyCodes.V,
    ctrlKey: true
  }));
  assertTrue(handler.getState() == goog.events.PasteHandler.State.TYPING);

  // makes sure we detected it
  assertTrue(pasted);
}

function testMouseOverOnInit() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  // user has something on the events
  textarea.value = 'pasted string';
  // and right click -> paste it on the textarea, WITHOUT giving focus
  textarea.dispatchEvent(newBrowserEvent(goog.events.EventType.MOUSEOVER));
  assertTrue(handler.getState() == goog.events.PasteHandler.State.INIT);
  // makes sure we detect it
  assertTrue(pasted);

  pasted = false;

  // user normaly mouseovers the textarea, with no text change
  textarea.dispatchEvent(goog.events.EventType.MOUSEOVER);
  assertTrue(handler.getState() == goog.events.PasteHandler.State.INIT);
  // text area value doesn't change
  assertFalse(pasted);
}

function testMouseOverAfterTyping() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  textarea.dispatchEvent(goog.events.EventType.FOCUS);
  assertFalse(pasted);
  textarea.dispatchEvent(
      {type: goog.events.EventType.KEYDOWN, keyCode: goog.events.KeyCodes.A});
  assertFalse(pasted);
  textarea.value = 'a';
  textarea.dispatchEvent('input');
  assertFalse(pasted);
  assertEquals('a', handler.oldValue_);
  textarea.dispatchEvent(goog.events.EventType.MOUSEOVER);
  assertFalse(pasted);
}

function testTypingAndThenRightClickPaste() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  textarea.dispatchEvent(goog.events.EventType.FOCUS);

  textarea.dispatchEvent(
      {type: goog.events.EventType.KEYDOWN, keyCode: goog.events.KeyCodes.A});
  assertFalse(pasted);
  textarea.value = 'a';
  clock.tick(
      goog.events.PasteHandler.MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER +
      1);
  textarea.dispatchEvent('input');
  assertFalse(pasted);

  assertEquals('a', handler.oldValue_);

  textarea.value = 'ab';
  clock.tick(
      goog.events.PasteHandler.MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER +
      1);
  textarea.dispatchEvent(newBrowserEvent('input'));
  assertTrue(pasted);
}

function testTypingReallyFastDispatchesTwoInputEventsBeforeTheKeyDownEvent() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  textarea.dispatchEvent(goog.events.EventType.FOCUS);

  // keydown and input events seems to be fired indepently: even though input
  // should happen after the key event, it doesn't if the user types fast
  // enough. FF2 + linux doesn't fire keydown events for every key pressed when
  // you type fast enough. if one of the keydown events gets swallowed, two
  // input events are fired consecutively. notice that there is a similar
  // scenario, that actually does produce a valid paste action.
  // {@see testRightClickRightClickAlsoDispatchesTwoConsecutiveInputEvents}

  textarea.dispatchEvent(
      {type: goog.events.EventType.KEYDOWN, keyCode: goog.events.KeyCodes.A});
  assertFalse(pasted);
  textarea.value = 'a';
  clock.tick(
      goog.events.PasteHandler.MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER -
      1);
  textarea.dispatchEvent('input');
  assertFalse(pasted);

  // second key down events gets fired on a different order
  textarea.value = 'ab';
  clock.tick(
      goog.events.PasteHandler.MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER -
      1);
  textarea.dispatchEvent('input');
  assertFalse(pasted);
}

function testRightClickRightClickAlsoDispatchesTwoConsecutiveInputEvents() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  textarea.dispatchEvent(goog.events.EventType.FOCUS);

  // there is also another case that two consecutive INPUT events are fired,
  // but in a valid paste action: if the user edit -> paste -> edit -> paste,
  // it is a valid paste action.

  textarea.value = 'a';
  clock.tick(
      goog.events.PasteHandler.MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER +
      1);
  textarea.dispatchEvent(newBrowserEvent('input'));
  assertTrue(pasted);

  // second key down events gets fired on a different order
  textarea.value = 'ab';
  clock.tick(
      goog.events.PasteHandler.MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER +
      1);
  textarea.dispatchEvent(newBrowserEvent('input'));
  assertTrue(pasted);
}

function testMiddleClickWithoutFocusTriggersPasteEvent() {
  if (goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  // if the textarea is NOT selected, and then we use the middle button,
  // FF2+linux pastes what was last highlighted, causing a paste action.
  textarea.dispatchEvent(goog.events.EventType.FOCUS);
  textarea.dispatchEvent(newBrowserEvent('input'));
  assertTrue(pasted);
}


function testMacRightClickPasteRequiresCtrlBecauseItHasOneButton() {
  if (!goog.userAgent.OPERA || !goog.userAgent.MAC) {
    return;
  }
  var handler = new goog.events.PasteHandler(textarea);
  // user clicks on the textarea and give it focus
  goog.events.listen(
      handler, goog.events.PasteHandler.EventType.PASTE,
      function() { pasted = true; });
  textarea.dispatchEvent(goog.events.EventType.FOCUS);
  assertFalse(pasted);
  textarea.dispatchEvent({type: goog.events.EventType.KEYDOWN, keyCode: 0});
  assertFalse(pasted);
  clock.tick(
      goog.events.PasteHandler.MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER +
      1);
  textarea.dispatchEvent(newBrowserEvent('input'));
  assertTrue(pasted);
}

function testOperaMacFiresKeyCode17WhenAppleKeyPressedButDoesNotFireKeyDown() {
  if (!goog.userAgent.OPERA || !goog.userAgent.MAC) {
    return;
  }
  var handler = new goog.events.PasteHandler(textarea);
  // user clicks on the textarea and give it focus
  goog.events.listen(
      handler, goog.events.PasteHandler.EventType.PASTE,
      function() { pasted = true; });
  textarea.dispatchEvent(goog.events.EventType.FOCUS);
  assertFalse(pasted);
  // apple key is pressed, generating a keydown event
  textarea.dispatchEvent({type: goog.events.EventType.KEYDOWN, keyCode: 17});
  assertFalse(pasted);
  clock.tick(
      goog.events.PasteHandler.MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER +
      1);
  // and then text is added magically without any extra keydown events.
  textarea.dispatchEvent(newBrowserEvent('input'));
  assertTrue(pasted);
}

function testScriptingDoesntTriggerPasteEvents() {
  var handlerUsedToListenForScriptingChanges =
      new goog.events.PasteHandler(textarea);
  pasted = false;
  // user clicks on the textarea and give it focus
  goog.events.listen(
      handlerUsedToListenForScriptingChanges,
      goog.events.PasteHandler.EventType.PASTE, function() { pasted = true; });
  goog.dom.getElement('foo').value = 'dear paste handler,';
  assertFalse(pasted);
  goog.dom.getElement('foo').value = 'please dont misunderstand script changes';
  assertFalse(pasted);
  goog.dom.getElement('foo').value = 'with user generated paste events';
  assertFalse(pasted);
  goog.dom.getElement('foo').value = 'thanks!';
  assertFalse(pasted);
}

function testAfterPaste() {
  if (!goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  var handlerThatSupportsPasteEvents = new goog.events.PasteHandler(textarea);
  pasted = false;
  goog.events.listen(
      handlerThatSupportsPasteEvents, goog.events.PasteHandler.EventType.PASTE,
      function() { pasted = true; });
  var afterPasteFired = false;
  goog.events.listen(
      handlerThatSupportsPasteEvents,
      goog.events.PasteHandler.EventType.AFTER_PASTE,
      function() { afterPasteFired = true; });

  // Initial paste event comes before AFTER_PASTE has fired.
  textarea.dispatchEvent(newBrowserEvent('paste'));
  assertTrue(pasted);
  assertFalse(afterPasteFired);

  // Once text is pasted, it takes a bit to detect it, at which point
  // AFTER_PASTE is fired.
  clock.tick(goog.events.PasteHandler.PASTE_POLLING_PERIOD_MS_);
  textarea.value = 'text';
  clock.tick(goog.events.PasteHandler.PASTE_POLLING_PERIOD_MS_);
  assertTrue(afterPasteFired);
}


function testAfterPasteNotFiredIfDelayTooLong() {
  if (!goog.events.PasteHandler.SUPPORTS_NATIVE_PASTE_EVENT) {
    return;
  }
  var handlerThatSupportsPasteEvents = new goog.events.PasteHandler(textarea);
  pasted = false;
  goog.events.listen(
      handlerThatSupportsPasteEvents, goog.events.PasteHandler.EventType.PASTE,
      function() { pasted = true; });
  var afterPasteFired = false;
  goog.events.listen(
      handlerThatSupportsPasteEvents,
      goog.events.PasteHandler.EventType.AFTER_PASTE,
      function() { afterPasteFired = true; });

  // Initial paste event comes before AFTER_PASTE has fired.
  textarea.dispatchEvent(newBrowserEvent('paste'));
  assertTrue(pasted);
  assertFalse(afterPasteFired);

  // If the new text doesn't show up in time, we never fire AFTER_PASTE.
  clock.tick(goog.events.PasteHandler.PASTE_POLLING_TIMEOUT_MS_);
  textarea.value = 'text';
  clock.tick(goog.events.PasteHandler.PASTE_POLLING_PERIOD_MS_);
  assertFalse(afterPasteFired);
}
