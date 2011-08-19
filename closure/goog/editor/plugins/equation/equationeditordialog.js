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

goog.provide('goog.editor.plugins.equation.EquationEditorDialog');

goog.require('goog.dom');
goog.require('goog.editor.plugins.equation.EquationEditor');
goog.require('goog.editor.plugins.equation.ImageRenderer');
goog.require('goog.editor.plugins.equation.TexEditor');
goog.require('goog.ui.Dialog');
goog.require('goog.ui.Dialog.ButtonSet');



/**
 * User interface for equation editor plugin standalone tests.
 * @constructor
 * @param {string=} opt_equation Encoded equation. If not specified, starts with
 *     an empty equation.
 * @extends {goog.ui.Dialog}
 */
goog.editor.plugins.equation.EquationEditorDialog = function(opt_equation) {
  goog.ui.Dialog.call(this);
  this.setTitle('Equation Editor');

  var buttonSet = new goog.ui.Dialog.ButtonSet();
  buttonSet.set(goog.ui.Dialog.DefaultButtonKeys.OK,
      opt_equation ? 'Save changes' : 'Insert equation',
      true);
  buttonSet.set(goog.ui.Dialog.DefaultButtonKeys.CANCEL,
      'Cancel', false, true);
  this.setButtonSet(buttonSet);

  // Create the main editor contents.
  var contentElement = this.getContentElement();
  var domHelper = goog.dom.getDomHelper(contentElement);
  var context = this.populateContext_();

  /**
   * The equation editor main API.
   * @type {goog.editor.plugins.equation.TexEditor}
   * @private
   */
  this.equationEditor_ =
      new goog.editor.plugins.equation.TexEditor(context, '', domHelper);

  this.equationEditor_.addEventListener(
      goog.editor.plugins.equation.EquationEditor.EventType.CHANGE,
      this.onChange_, false, this);

  this.equationEditor_.render(this.getContentElement());
  this.setEquation(opt_equation || '');

  goog.dom.classes.add(this.getDialogElement(), 'ee-modal-dialog');
};
goog.inherits(goog.editor.plugins.equation.EquationEditorDialog,
    goog.ui.Dialog);


/**
 * The dialog's OK button element.
 * @type {Element?}
 * @private
 */
goog.editor.plugins.equation.EquationEditorDialog.prototype.okButton_;


/** @inheritDoc */
goog.editor.plugins.equation.EquationEditorDialog.prototype.setVisible =
    function(visible) {
  goog.base(this, 'setVisible', visible);
  this.equationEditor_.setVisible(visible);
};


/**
 * Populates the context of this dialog.
 * @return {Object} The context that this dialog runs in.
 * @private
 */
goog.editor.plugins.equation.EquationEditorDialog.prototype.populateContext_ =
    function() {
  var context = {};
  context.paletteManager = new goog.editor.plugins.equation.PaletteManager();
  return context;
};


/**
 * Handles CHANGE event fired when user changes equation.
 * @param {goog.editor.plugins.equation.ChangeEvent} e The event object.
 * @private
 */
goog.editor.plugins.equation.EquationEditorDialog.prototype.onChange_ =
    function(e) {
  if (!this.okButton_) {
    this.okButton_ = this.getButtonSet().getButton(
        goog.ui.Dialog.DefaultButtonKeys.OK);
  }
  this.okButton_.disabled = !e.isValid;
};


/**
 * Returns the encoded equation.
 * @return {string} The encoded equation.
 */
goog.editor.plugins.equation.EquationEditorDialog.prototype.getEquation =
    function() {
  return this.equationEditor_.getEquation();
};


/**
 * Sets the encoded equation.
 * @param {string} equation The encoded equation.
 */
goog.editor.plugins.equation.EquationEditorDialog.prototype.setEquation =
    function(equation) {
  this.equationEditor_.setEquation(equation);
};


/**
 * @return {string} The html code to embed in the document.
 */
goog.editor.plugins.equation.EquationEditorDialog.prototype.getHtml =
    function() {
  return this.equationEditor_.getHtml();
};

