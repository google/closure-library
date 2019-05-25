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

goog.module('goog.editor.plugins.HeaderFormatterTest');
goog.setTestOnly();

const BasicTextFormatter = goog.require('goog.editor.plugins.BasicTextFormatter');
const BrowserEvent = goog.require('goog.events.BrowserEvent');
const Command = goog.require('goog.editor.Command');
const FieldMock = goog.require('goog.testing.editor.FieldMock');
const HeaderFormatter = goog.require('goog.editor.plugins.HeaderFormatter');
const LooseMock = goog.require('goog.testing.LooseMock');
const TestHelper = goog.require('goog.testing.editor.TestHelper');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let field;
let editableField;
let headerFormatter;
let btf;
let testHelper;

testSuite({
  setUpPage() {
    field = dom.getElement('field');
    testHelper = new TestHelper(field);
  },

  setUp() {
    testHelper.setUpEditableElement();
    editableField = new FieldMock();
    headerFormatter = new HeaderFormatter();
    headerFormatter.registerFieldObject(editableField);
    btf = new BasicTextFormatter();
    btf.registerFieldObject(editableField);
  },

  tearDown() {
    editableField = null;
    headerFormatter.dispose();
    testHelper.tearDownEditableElement();
  },

  testHeaderShortcuts() {
    dom.setTextContent(field, 'myText');

    const textNode = field.firstChild;
    testHelper.select(textNode, 0, textNode, textNode.length);

    editableField.getElement();
    editableField.$anyTimes();
    editableField.$returns(field);

    editableField.getPluginByClassId('Bidi');
    editableField.$anyTimes();
    editableField.$returns(null);

    editableField.execCommand(
        Command.FORMAT_BLOCK, HeaderFormatter.HEADER_COMMAND.H1);
    // Bypass EditableField's execCommand and directly call
    // basicTextFormatter's.  Future version of headerformatter will include
    // that code in its own execCommand.
    editableField.$does(() => {
      btf.execCommandInternal(
          BasicTextFormatter.COMMAND.FORMAT_BLOCK,
          HeaderFormatter.HEADER_COMMAND.H1);
    });

    const event = new LooseMock(BrowserEvent);
    if (userAgent.GECKO) {
      event.stopPropagation();
    }

    editableField.$replay();
    event.$replay();

    assertTrue(
        'Event handled',
        headerFormatter.handleKeyboardShortcut(event, '1', true));
    assertEquals('Field contains a header', 'H1', field.firstChild.nodeName);

    editableField.$verify();
    event.$verify();
  },
});
