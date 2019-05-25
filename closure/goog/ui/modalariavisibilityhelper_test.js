// Copyright 2015 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.ModalAriaVisibilityHelperTest');
goog.setTestOnly();

const ModalAriaVisibilityHelper = goog.require('goog.ui.ModalAriaVisibilityHelper');
const State = goog.require('goog.a11y.aria.State');
const aria = goog.require('goog.a11y.aria');
const dom = goog.require('goog.dom');
const googString = goog.require('goog.string');
const testSuite = goog.require('goog.testing.testSuite');

function assertUnalteredElements() {
  assertEmptyAriaHiddenState('div-2-1');
  assertAriaHiddenState('div-3', 'false');
  assertAriaHiddenState('div-5', 'true');
}

/**
 * @param {string} id Id of the element.
 * @return {!ModalAriaVisibilityHelper}
 */
function createHelper(id) {
  return new ModalAriaVisibilityHelper(dom.getElement(id), dom.getDomHelper());
}

function clearAriaState(id) {
  aria.removeState(dom.getElement(id), State.HIDDEN);
}

/** @param {string} id Id of the element. */
function assertEmptyAriaHiddenState(id) {
  const element = dom.getElement(id);
  assertTrue(googString.isEmptyOrWhitespace(
      googString.makeSafe(aria.getState(element, State.HIDDEN))));
}

/**
 * @param {string} id Id of the element.
 * @param {string} expectedState
 */
function assertAriaHiddenState(id, expectedState) {
  const element = dom.getElement(id);
  assertEquals(expectedState, aria.getState(element, State.HIDDEN));
}
testSuite({
  tearDown() {
    clearAriaState('div-1');
    clearAriaState('div-2');
    clearAriaState('div-4');
  },

  testHide() {
    const helper = createHelper('div-1');
    helper.setBackgroundVisibility(true /* hide */);

    assertUnalteredElements();
    assertEmptyAriaHiddenState('div-1');
    assertAriaHiddenState('div-2', 'true');
    assertAriaHiddenState('div-4', 'true');
  },

  testUnhide() {
    const helper = createHelper('div-1');
    helper.setBackgroundVisibility(false /* hide */);

    assertUnalteredElements();
    assertEmptyAriaHiddenState('div-1');
    assertEmptyAriaHiddenState('div-2');
    assertEmptyAriaHiddenState('div-4');
  },

  testMultipleCalls() {
    const helper = createHelper('div-2');
    helper.setBackgroundVisibility(true /* hide */);

    assertUnalteredElements();
    assertAriaHiddenState('div-1', 'true');
    assertEmptyAriaHiddenState('div-2');
    assertAriaHiddenState('div-4', 'true');

    helper.setBackgroundVisibility(false /* hide */);

    assertUnalteredElements();
    assertEmptyAriaHiddenState('div-1');
    assertEmptyAriaHiddenState('div-2');
    assertEmptyAriaHiddenState('div-4');

    helper.setBackgroundVisibility(true /* hide */);

    assertUnalteredElements();
    assertAriaHiddenState('div-1', 'true');
    assertEmptyAriaHiddenState('div-2');
    assertAriaHiddenState('div-4', 'true');
  },
});
