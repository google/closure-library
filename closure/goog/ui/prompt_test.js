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

goog.module('goog.ui.PromptTest');
goog.setTestOnly();

const BidiInput = goog.require('goog.ui.BidiInput');
const Dialog = goog.require('goog.ui.Dialog');
const InputHandler = goog.require('goog.events.InputHandler');
const KeyCodes = goog.require('goog.events.KeyCodes');
const Prompt = goog.require('goog.ui.Prompt');
const events = goog.require('goog.testing.events');
const functions = goog.require('goog.functions');
const googString = goog.require('goog.string');
const product = goog.require('goog.userAgent.product');
const selection = goog.require('goog.dom.selection');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let prompt;

// An interactive test so we can manually see what it looks like.
function newPrompt() {
  prompt = new Prompt('title', 'Prompt:', (result) => {
    alert(`Result: ${result}`);
    goog.dispose(prompt);
  }, 'defaultValue');
  prompt.setVisible(true);
}
testSuite({
  setUp() {
    document.body.focus();
  },

  tearDown() {
    goog.dispose(prompt);
  },

  testFocusOnInputElement() {
    // FF does not perform focus if the window is not active in the first place.
    if (userAgent.GECKO && document.hasFocus && !document.hasFocus()) {
      return;
    }

    let promptResult = undefined;
    prompt = new Prompt('title', 'Prompt:', (result) => {
      promptResult = result;
    }, 'defaultValue');
    prompt.setVisible(true);

    if (product.CHROME) {
      // For some reason, this test fails non-deterministically on Chrome,
      // but only on the test farm.
      return;
    }
    assertEquals('defaultValue', selection.getText(prompt.userInputEl_));
  },

  testValidationFunction() {
    let promptResult = undefined;
    prompt = new Prompt('title', 'Prompt:', (result) => {
      promptResult = result;
    }, '');
    prompt.setValidationFunction(functions.not(googString.isEmptyOrWhitespace));
    prompt.setVisible(true);

    const buttonSet = prompt.getButtonSet();
    const okButton = buttonSet.getButton(Dialog.DefaultButtonKeys.OK);
    assertTrue(okButton.disabled);

    prompt.userInputEl_.value = '';
    events.fireKeySequence(prompt.userInputEl_, KeyCodes.SPACE);
    assertTrue(okButton.disabled);
    prompt.userInputEl_.value = 'foo';
    events.fireKeySequence(prompt.userInputEl_, KeyCodes.X);
    assertFalse(okButton.disabled);
  },

  testBidiInput() {
    const shalomInHebrew = '\u05e9\u05dc\u05d5\u05dd';
    const promptResult = undefined;
    prompt = new Prompt('title', 'Prompt:', functions.NULL, '');
    const bidiInput = new BidiInput();
    prompt.setInputDecoratorFn(goog.bind(bidiInput.decorate, bidiInput));
    prompt.setVisible(true);

    prompt.userInputEl_.value = shalomInHebrew;
    events.fireKeySequence(prompt.userInputEl_, KeyCodes.SPACE);
    events.fireBrowserEvent({'target': prompt.userInputEl_, 'type': 'input'});
    bidiInput.inputHandler_.dispatchEvent(InputHandler.EventType.INPUT);
    assertEquals('rtl', prompt.userInputEl_.dir);

    prompt.userInputEl_.value = 'shalomInEnglish';
    events.fireKeySequence(prompt.userInputEl_, KeyCodes.SPACE);
    events.fireBrowserEvent({'target': prompt.userInputEl_, 'type': 'input'});
    bidiInput.inputHandler_.dispatchEvent(InputHandler.EventType.INPUT);
    assertEquals('ltr', prompt.userInputEl_.dir);
    goog.dispose(bidiInput);
  },

  testBidiInput_off() {
    const shalomInHebrew = '\u05e9\u05dc\u05d5\u05dd';
    const promptResult = undefined;
    prompt = new Prompt('title', 'Prompt:', functions.NULL, '');
    prompt.setVisible(true);

    prompt.userInputEl_.value = shalomInHebrew;
    events.fireKeySequence(prompt.userInputEl_, KeyCodes.SPACE);
    events.fireBrowserEvent({'target': prompt.userInputEl_, 'type': 'input'});
    assertEquals('', prompt.userInputEl_.dir);

    prompt.userInputEl_.value = 'shalomInEnglish';
    events.fireKeySequence(prompt.userInputEl_, KeyCodes.SPACE);
    assertEquals('', prompt.userInputEl_.dir);
  },
});
