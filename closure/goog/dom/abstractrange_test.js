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

goog.module('goog.dom.AbstractRangeTest');
goog.setTestOnly();

const AbstractRange = goog.require('goog.dom.AbstractRange');
const Range = goog.require('goog.dom.Range');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testCorrectDocument() {
    const a = dom.getElement('a').contentWindow;
    const b = dom.getElement('b').contentWindow;

    a.document.body.focus();
    let selection = AbstractRange.getBrowserSelectionForWindow(a);
    assertNotNull('Selection must not be null', selection);
    let range = Range.createFromBrowserSelection(selection);
    assertEquals(
        'getBrowserSelectionForWindow must return selection in the ' +
            'correct document',
        a.document, range.getDocument());

    // This is intended to trip up Internet Explorer --
    // see http://b/2048934
    b.document.body.focus();
    selection = AbstractRange.getBrowserSelectionForWindow(a);
    // Some (non-IE) browsers keep a separate selection state for each document
    // in the same browser window. That's fine, as long as the selection object
    // requested from the window object is correctly associated with that
    // window's document.
    if (selection != null && selection.rangeCount != 0) {
      range = Range.createFromBrowserSelection(selection);
      assertEquals(
          'getBrowserSelectionForWindow must return selection in ' +
              'the correct document',
          a.document, range.getDocument());
    } else {
      assertTrue(selection == null || selection.rangeCount == 0);
    }
  },

  testSelectionIsControlRange() {
    const c = dom.getElement('c').contentWindow;
    // Only IE supports control ranges
    if (c.document.body.createControlRange) {
      const controlRange = c.document.body.createControlRange();
      controlRange.add(dom.getElementsByTagName(TagName.IMG, c.document)[0]);
      controlRange.select();
      const selection = AbstractRange.getBrowserSelectionForWindow(c);
      assertNotNull('Selection must not be null', selection);
    }
  },
});
