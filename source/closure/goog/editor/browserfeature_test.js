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

goog.module('goog.editor.BrowserFeatureTest');
goog.setTestOnly();

const BrowserFeature = goog.require('goog.editor.BrowserFeature');
const ExpectedFailures = goog.require('goog.testing.ExpectedFailures');
const Range = goog.require('goog.dom.Range');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

let expectedFailures;

testSuite({
  setUpPage() {
    expectedFailures = new ExpectedFailures();
  },

  tearDown() {
    const root = dom.getElement('root');
    dom.removeChildren(root);
    expectedFailures.handleTearDown();
  },

  testEmptyNodeNormalization() {
    const root = dom.getElement('root');
    dom.appendChild(root, dom.createTextNode('text'));

    const textNode = root.firstChild;
    textNode.splitText(0);
    root.normalize();

    assertEquals(
        'NORMALIZE_CORRUPTS_EMPTY_TEXT_NODES incorrect for ' +
            navigator.userAgent,
        BrowserFeature.NORMALIZE_CORRUPTS_EMPTY_TEXT_NODES,
        textNode.parentNode == null);
  },

  testLeavesPWhenRemovingLists() {
    if (!BrowserFeature.HAS_CONTENT_EDITABLE) {
      return;
    }
    const root = dom.getElement('root');
    dom.removeChildren(root);
    root.innerHTML = '<div>foo</div>';
    Range.createFromNodeContents(root.firstChild.firstChild).select();
    document.execCommand('insertorderedlist', false, true);
    document.execCommand('insertorderedlist', false, true);

    assertEquals(
        'LEAVES_P_WHEN_REMOVING_LISTS incorrect for ' + navigator.userAgent,
        BrowserFeature.LEAVES_P_WHEN_REMOVING_LISTS,
        !!dom.getElementsByTagName(TagName.P, root).length);
  },

  testActiveElement() {
    const root = dom.getElement('root');
    const div = dom.createElement(TagName.DIV);
    root.appendChild(div);
    div.tabIndex = 0;
    div.focus();

    expectedFailures.expectFailureFor(!BrowserFeature.HAS_ACTIVE_ELEMENT);
    try {
      assertEquals(
          'document.activeElement should be the created div', div,
          document.activeElement);
    } catch (e) {
      expectedFailures.handleException(e);
    }
  },

  testNormalizeCorruption() {
    const root = dom.getElement('testNormalizeCorruption');
    const textNode = root.firstChild;
    textNode.splitText(0);
    const secondTextNode = textNode.nextSibling;

    root.normalize();

    expectedFailures.expectFailureFor(
        BrowserFeature.NORMALIZE_CORRUPTS_EMPTY_TEXT_NODES);
    try {
      assertEquals(
          'text node should not be corrupted', textNode, root.firstChild);
    } catch (e) {
      expectedFailures.handleException(e);

      expectedFailures.expectFailureFor(
          BrowserFeature.NORMALIZE_CORRUPTS_ALL_TEXT_NODES);
      try {
        assertEquals(
            'first text node should be corrupted and replaced by sibling',
            secondTextNode, root.firstChild);
      } catch (e) {
        expectedFailures.handleException(e);
      }
    }
  },
});
