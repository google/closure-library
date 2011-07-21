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

goog.provide('goog.editor.plugins.EquationEditorPlugin');
goog.provide('goog.editor.plugins.EquationEditorPlugin.Dialog');
goog.provide('goog.editor.plugins.EquationEditorPlugin.OkEvent');

goog.require('goog.editor.Command');
goog.require('goog.editor.plugins.AbstractDialogPlugin');
goog.require('goog.editor.plugins.equation.EquationEditor');
goog.require('goog.editor.plugins.equation.ImageRenderer');
goog.require('goog.editor.plugins.equation.TexEditor');
goog.require('goog.editor.range');
goog.require('goog.functions');
goog.require('goog.ui.editor.AbstractDialog');
goog.require('goog.ui.editor.AbstractDialog.Builder');



/**
 * A plugin that opens the equation editor in a dialog window.
 * @param {string=} opt_helpUrl A URL pointing to help documentation.
 * @constructor
 * @extends {goog.editor.plugins.AbstractDialogPlugin}
 */
goog.editor.plugins.EquationEditorPlugin = function(opt_helpUrl) {
  /**
   * The IMG element for the equation being edited, null if creating a new
   * equation.
   * @type {Element}
   * @private
   */
  this.originalElement_;

  /**
   * A URL pointing to help documentation.
   * @type {string}
   * @private
   */
  this.helpUrl_ = opt_helpUrl || '';

  /**
   * The listener key for double click events.
   * @type {number?}
   * @private
   */
  this.dblClickKey_;

  goog.editor.plugins.AbstractDialogPlugin.call(this,
      goog.editor.Command.EQUATION);
};
goog.inherits(goog.editor.plugins.EquationEditorPlugin,
    goog.editor.plugins.AbstractDialogPlugin);


/**
 * The logger for the EquationEditorPlugin.
 * @type {goog.debug.Logger}
 * @private
 */
goog.editor.plugins.EquationEditorPlugin.prototype.logger_ =
    goog.debug.Logger.getLogger('goog.editor.plugins.EquationEditorPlugin');


/** @inheritDoc */
goog.editor.plugins.EquationEditorPlugin.prototype.getTrogClassId =
    goog.functions.constant('EquationEditorPlugin');


/**
 * @inheritDoc
 */
goog.editor.plugins.EquationEditorPlugin.prototype.createDialog =
    function(dom, opt_arg) {
  var equationImgEl = /** @type {Element} */ (opt_arg || null);

  var equationStr = equationImgEl ?
      goog.editor.plugins.equation.ImageRenderer.getEquationFromImage(
          equationImgEl) : '';

  this.originalElement_ = equationImgEl;
  var dialog = new goog.editor.plugins.EquationEditorPlugin.Dialog(
      this.populateContext_(), dom, equationStr, this.helpUrl_);
  dialog.addEventListener(goog.ui.editor.AbstractDialog.EventType.OK,
      this.handleOk_,
      false,
      this);
  return dialog;
};


/**
 * Populates the context that this plugin runs in.
 * @return {Object} The context that this plugin runs in.
 * @private
 */
goog.editor.plugins.EquationEditorPlugin.prototype.populateContext_ =
    function() {
  var context = {};
  context.paletteManager = new goog.editor.plugins.equation.PaletteManager();
  return context;
};


/**
 * Returns the selected text in the editable field for using as initial
 * equation string for the equation editor.
 *
 * TODO(user): Sanity check the selected text and return it only if it
 *     reassembles a TeX equation and is not too long.
 *
 * @return {string} Selected text in the editable field for using it as
 *     initial equation string for the equation editor.
 * @private
 */
goog.editor.plugins.EquationEditorPlugin.prototype.getEquationFromSelection_ =
    function() {
  var range = this.fieldObject.getRange();
  if (range) {
    return range.getText();
  }

  return '';
};



/**
 * OK event object for the equation editor dialog.
 * @param {string} equationHtml html containing the equation to put in the
 *     editable field.
 * @constructor
 * @extends {goog.events.Event}
 */
goog.editor.plugins.EquationEditorPlugin.OkEvent = function(equationHtml) {
  this.equationHtml = equationHtml;
};
goog.inherits(goog.editor.plugins.EquationEditorPlugin.OkEvent,
    goog.events.Event);


/**
 * Event type.
 * @type {goog.ui.editor.AbstractDialog.EventType}
 * @override
 */
goog.editor.plugins.EquationEditorPlugin.OkEvent.prototype.type =
    goog.ui.editor.AbstractDialog.EventType.OK;


/**
 * HTML containing the equation to put in the editable field.
 * @type {string}
 */
goog.editor.plugins.EquationEditorPlugin.OkEvent.prototype.equationHtml;


/** @inheritDoc */
goog.editor.plugins.EquationEditorPlugin.prototype.enable =
    function(fieldObject) {
  goog.base(this, 'enable', fieldObject);
  if (this.isEnabled(fieldObject)) {
    this.dblClickKey_ = goog.events.listen(fieldObject.getElement(),
        goog.events.EventType.DBLCLICK,
        goog.bind(this.handleDoubleClick_, this), false, this);
  }
};


/** @inheritDoc */
goog.editor.plugins.EquationEditorPlugin.prototype.disable =
    function(fieldObject) {
  goog.base(this, 'disable', fieldObject);
  if (!this.isEnabled(fieldObject)) {
    goog.events.unlistenByKey(this.dblClickKey_);
  }
};


/**
 * Handles double clicks in the field area.
 * @param {goog.events.Event} e The event.
 * @private
 */
goog.editor.plugins.EquationEditorPlugin.prototype.handleDoubleClick_ =
    function(e) {
  var node = /** @type {Node} */ (e.target);
  this.execCommand(goog.editor.Command.EQUATION, node);
};



/**
 * Equation editor dialog (based on goog.ui.editor.AbstractDialog).
 * @param {Object} context The context that this dialog runs in.
 * @param {goog.dom.DomHelper} domHelper DomHelper to be used to create the
 *     dialog's dom structure.
 * @param {string} equation Initial equation.
 * @param {string} helpUrl URL pointing to help documentation.
 * @constructor
 * @extends {goog.ui.editor.AbstractDialog}
 */
goog.editor.plugins.EquationEditorPlugin.Dialog = function(context, domHelper,
    equation, helpUrl) {
  goog.ui.editor.AbstractDialog.call(this, domHelper);
  this.equationEditor_ =
      new goog.editor.plugins.equation.TexEditor(context, helpUrl);
  this.equationEditor_.render();
  this.equationEditor_.setEquation(equation);
  this.equationEditor_.addEventListener(goog.editor.Command.EQUATION,
      this.onChange_, false, this);
};
goog.inherits(goog.editor.plugins.EquationEditorPlugin.Dialog,
    goog.ui.editor.AbstractDialog);


/**
 * The equation editor actual UI.
 * @type {goog.editor.plugins.equation.TexEditor}
 * @private
 */
goog.editor.plugins.EquationEditorPlugin.Dialog.prototype.equationEditor_;


/**
 * The dialog's OK button element.
 * @type {Element?}
 * @private
 */
goog.editor.plugins.EquationEditorPlugin.Dialog.prototype.okButton_;


/** @inheritDoc */
goog.editor.plugins.EquationEditorPlugin.Dialog.prototype.
    createDialogControl = function() {
  var builder = new goog.ui.editor.AbstractDialog.Builder(this);

  /**
   * @desc The title of the equation editor dialog.
   */
  var MSG_EE_DIALOG_TITLE = goog.getMsg('Equation Editor');

  /**
   * @desc Button label for the equation editor dialog for adding
   * a new equation.
   */
  var MSG_EE_BUTTON_SAVE_NEW = goog.getMsg('Insert equation');

  /**
   * @desc Button label for the equation editor dialog for saving
   * a modified equation.
   */
  var MSG_EE_BUTTON_SAVE_MODIFY = goog.getMsg('Save changes');

  var okButtonText = this.equationEditor_.getEquation() ?
      MSG_EE_BUTTON_SAVE_MODIFY : MSG_EE_BUTTON_SAVE_NEW;

  builder.setTitle(MSG_EE_DIALOG_TITLE)
    .setContent(this.equationEditor_.getElement())
    .addOkButton(okButtonText)
    .addCancelButton();

  return builder.build();
};


/**
 * @inheritDoc
 */
goog.editor.plugins.EquationEditorPlugin.Dialog.prototype.createOkEvent =
    function(e) {
  if (this.equationEditor_.isValid()) {
    // Equation is not valid, don't close the dialog.
    return null;
  }
  var equationHtml = this.equationEditor_.getHtml();
  return new goog.editor.plugins.EquationEditorPlugin.OkEvent(equationHtml);
};


/**
 * Handles CHANGE event fired when user changes equation.
 * @param {goog.editor.plugins.equation.ChangeEvent} e The
 *     event object.
 * @private
 */
goog.editor.plugins.EquationEditorPlugin.Dialog.prototype.onChange_ =
    function(e) {
  if (!this.okButton_) {
    this.okButton_ = this.getButtonElement(
        goog.ui.Dialog.DefaultButtonKeys.OK);
  }
  this.okButton_.disabled = !e.isValid;
};


/**
 * Called when user clicks OK. Inserts the equation at cursor position in the
 * active editable field.
 * @param {goog.editor.plugins.EquationEditorPlugin.OkEvent} e The OK event.
 * @private
 */
goog.editor.plugins.EquationEditorPlugin.prototype.handleOk_ =
    function(e) {
  // First restore the selection so we can manipulate the editable field's
  // content according to what was selected.
  this.restoreOriginalSelection();

  // Notify listeners that the editable field's contents are about to change.
  this.fieldObject.dispatchBeforeChange();

  var dh = this.getFieldDomHelper();
  var node = dh.htmlToDocumentFragment(e.equationHtml);

  if (this.originalElement_) {
    // Editing existing equation: replace the old equation node with the new
    // one.
    goog.dom.replaceNode(node, this.originalElement_);
  } else {
    // Clear out what was previously selected, unless selection is already
    // empty (aka collapsed), and replace it with the new equation node.
    // TODO(user): there is a bug in FF where removeContents() may remove a
    // <br> right before and/or after the selection. Currently this is fixed
    // only for case of collapsed selection where we simply avoid calling
    // removeContants().
    var range = this.fieldObject.getRange();
    if (!range.isCollapsed()) {
      range.removeContents();
    }
    node = range.insertNode(node, false);
  }

  // Place the cursor to the right of the
  // equation image.
  goog.editor.range.placeCursorNextTo(node, false);

  this.fieldObject.dispatchChange();
};
