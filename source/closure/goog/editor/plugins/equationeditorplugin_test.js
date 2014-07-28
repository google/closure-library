// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.editor.plugins.EquationEditorPluginTest');
goog.setTestOnly('goog.editor.plugins.EquationEditorPluginTest');

goog.require('goog.dom');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.TagName');
goog.require('goog.editor.plugins.EquationEditorPlugin');
goog.require('goog.testing.MockControl');
goog.require('goog.testing.MockRange');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.editor.FieldMock');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.mockmatchers.ArgumentMatcher');
goog.require('goog.ui.editor.EquationEditorOkEvent');

var plugin;
var imgElem;

var mockCtrl;
var mockRange;
var mockField;
var mockEditor;
var mockPlaceCursorNextTo;
var propertyReplacer = new goog.testing.PropertyReplacer();
var fieldObj;
var fieldElem;
var domHelper = new goog.dom.DomHelper();
var IMG_URL = 'https://www.google.com/chart?cht=tx&chf=bg,s,' +
              'FFFFFF00&chco=000000&chl=x^2%2Fy^2';

function setUp() {
  mockCtrl = new goog.testing.MockControl();
  mockRange = new goog.testing.MockRange();
  mockCtrl.addMock(mockRange);
  mockField = new goog.testing.editor.FieldMock(undefined, undefined,
                                                mockRange);
  mockCtrl.addMock(mockField);
  mockPlaceCursorNextTo = mockCtrl.createFunctionMock('placeCursorNextTo');
}

function tearDown() {
  plugin.dispose();
}


/**
 * Sets up expectations for testing when the OK event fires: the field is
 * focused, the image is inserted.
 * @param {string} imageUrl Url of the image being inserted.
 */
function setUpTestOk(imageUrl) {
  mockField.focus().$times(1);
  var tempImage = goog.dom.createDom(goog.dom.TagName.IMG, {src: imageUrl});
  var fullImageUrl = tempImage.src;
  var createdNodeMatcher = new goog.testing.mockmatchers.ArgumentMatcher(
      function(arg) {
        if (!arg) {
          return true;
        }
        return arg.tagName == goog.dom.TagName.IMG &&
            arg.src == fullImageUrl;
      },
      '<IMG src="' + imageUrl + '">');
  mockPlaceCursorNextTo(createdNodeMatcher, false);
  mockRange.isCollapsed().$times(1);
  mockRange.removeContents().$times(1);
  mockRange.insertNode(
      domHelper.htmlToDocumentFragment(imageUrl), false).$times(1);
  propertyReplacer.setPath(
      'goog.editor.range.placeCursorNextTo', mockPlaceCursorNextTo);
  mockField.dispatchChange().$times(1);
}


/**
 * Tests that when the OK event fires the editable field is properly updated.
 */
function testOk() {
  setUpTestOk(IMG_URL);
  mockField.dispatchBeforeChange().$times(1);
  mockCtrl.$replayAll();

  plugin = new goog.editor.plugins.EquationEditorPlugin();
  plugin.registerFieldObject(mockField);
  var dialog = plugin.createDialog(domHelper);
  // Mock of execCommand + clicking OK without actually opening the dialog.
  dialog.dispatchEvent(
      new goog.ui.editor.EquationEditorOkEvent(IMG_URL));
  mockCtrl.$verifyAll();
}
