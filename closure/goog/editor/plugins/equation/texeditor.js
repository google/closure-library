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

goog.provide('goog.editor.plugins.equation.TexEditor');

goog.require('goog.dom');
goog.require('goog.editor.plugins.equation.ImageRenderer');
goog.require('goog.editor.plugins.equation.TexPane');
goog.require('goog.ui.Component');



/**
 * User interface for equation editor plugin.
 * @constructor
 * @param {Object} context The context that this Tex editor runs in.
 * @param {string} helpUrl URL pointing to help documentation.
 * @param {goog.dom.DomHelper=} opt_domHelper DomHelper to use.
 * @extends {goog.ui.Component}
 */
goog.editor.plugins.equation.TexEditor = function(
    context, helpUrl, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

  /**
   * The context that this Tex editor runs in.
   * @type {Object}
   * @private
   */
  this.context_ = context;

  /**
   * A URL pointing to help documentation.
   * @type {string}
   * @private
   */
  this.helpUrl_ = helpUrl;
};
goog.inherits(goog.editor.plugins.equation.TexEditor, goog.ui.Component);


/**
 * The TeX editor pane.
 * @type {goog.editor.plugins.equation.TexPane}
 * @private
 */
goog.editor.plugins.equation.TexEditor.prototype.texPane_ = null;


/** @inheritDoc */
goog.editor.plugins.equation.TexEditor.prototype.createDom = function() {
  goog.base(this, 'createDom');
  this.createDom_();
};


/**
 * Creates main editor contents.
 * @private
 */
goog.editor.plugins.equation.TexEditor.prototype.createDom_ = function() {
  var contentElement = this.getElement();
  this.texPane_ = new goog.editor.plugins.equation.TexPane(this.context_,
      this.helpUrl_, this.dom_);
  this.addChild(this.texPane_);
  this.texPane_.render(contentElement);
  this.texPane_.setVisible(true);
};


/** @inheritDoc */
goog.editor.plugins.equation.TexEditor.prototype.decorateInternal =
    function(element) {
  this.setElementInternal(element);
  this.createDom_();
};


/**
 * Returns the encoded equation.
 * @return {string} The encoded equation.
 */
goog.editor.plugins.equation.TexEditor.prototype.getEquation = function() {
  return this.texPane_.getEquation();
};


/**
 * Parse an equation and draw it.
 * Clears any previous displayed equation.
 * @param {string} equation The equation text to parse.
 */
goog.editor.plugins.equation.TexEditor.prototype.setEquation =
    function(equation) {
  this.texPane_.setEquation(equation);
};


/**
 * @return {string} The html code to embed in the document.
 */
goog.editor.plugins.equation.TexEditor.prototype.getHtml = function() {
  return goog.editor.plugins.equation.ImageRenderer.getHtml(this.getEquation());
};


/**
 * Checks whether the current equation is valid and can be used in a document.
 * @return {boolean} Whether the equation valid.
 */
goog.editor.plugins.equation.TexEditor.prototype.isValid = function() {
  return goog.editor.plugins.equation.ImageRenderer.isEquationTooLong(
      this.getEquation());
};


/**
 * Sets the visibility of the editor.
 * @param {boolean} visible Whether the editor should be visible.
 */
goog.editor.plugins.equation.TexEditor.prototype.setVisible =
    function(visible) {
  this.texPane_.setVisible(visible);
};


/** @inheritDoc */
goog.editor.plugins.equation.TexEditor.prototype.disposeInternal =
    function() {
  if (this.texPane_) {
    this.texPane_.dispose();
  }
  this.context_ = null;
  goog.base(this, 'disposeInternal');
};

