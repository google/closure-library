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

goog.module('goog.editor.focusTest');
goog.setTestOnly();

const BrowserFeature = goog.require('goog.editor.BrowserFeature');
const focus = goog.require('goog.editor.focus');
const selection = goog.require('goog.dom.selection');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  setUp() {
    // Make sure focus is not in the input to begin with.
    const dummy = document.getElementById('dummyLink');
    dummy.focus();
  },

  /**
   * Tests that focusInputField() puts focus in the input field and sets the
   * cursor to the end of the text cointained inside.
   */
  testFocusInputField() {
    const input = document.getElementById('myInput');
    assertNotEquals(
        'Input should not be focused initially', input, document.activeElement);

    focus.focusInputField(input);
    if (BrowserFeature.HAS_ACTIVE_ELEMENT) {
      assertEquals(
          'Input should be focused after call to focusInputField', input,
          document.activeElement);
    }
    assertEquals(
        'Selection should start at the end of the input text',
        input.value.length, selection.getStart(input));
    assertEquals(
        'Selection should end at the end of the input text', input.value.length,
        selection.getEnd(input));
  },
});
