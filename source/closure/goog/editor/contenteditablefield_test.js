// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.editor.ContentEditableFieldTest');
goog.setTestOnly();

const ContentEditableField = goog.require('goog.editor.ContentEditableField');
const SafeHtml = goog.require('goog.html.SafeHtml');
const googDom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');


const HTML = '<div id="testField">I am text.</div>';

goog.global.FieldConstructor = ContentEditableField;

testSuite({
  setUp() {
    googDom.getElement('parent').innerHTML = HTML;
    assertTrue(
        'FieldConstructor should be set by the test HTML file',
        goog.isFunction(FieldConstructor));
  },

  testNoIframeAndSameElement() {
    const field = new ContentEditableField('testField');
    field.makeEditable();
    assertFalse(field.usesIframe());
    assertEquals(
        'Original element should equal field element',
        field.getOriginalElement(), field.getElement());
    assertEquals(
        'Sanity check on original element', 'testField',
        field.getOriginalElement().id);
    assertEquals(
        'Editable document should be same as main document', document,
        field.getEditableDomHelper().getDocument());
    field.dispose();
  },

  testMakeEditableAndUnEditable() {
    const elem = googDom.getElement('testField');
    googDom.setTextContent(elem, 'Hello world');
    const field = new ContentEditableField('testField');

    field.makeEditable();
    assertEquals('true', String(elem.contentEditable));
    assertEquals('Hello world', googDom.getTextContent(elem));
    field.setSafeHtml(
        false /* addParas */, SafeHtml.htmlEscape('Goodbye world'));
    assertEquals('Goodbye world', googDom.getTextContent(elem));

    field.makeUneditable();
    assertNotEquals('true', String(elem.contentEditable));
    assertEquals('Goodbye world', googDom.getTextContent(elem));
    field.dispose();
  },
});
