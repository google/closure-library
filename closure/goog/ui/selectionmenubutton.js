// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Copyright 2009 Google Inc. All Rights Reserved.

/**
 * @fileoverview A customized MenuButton for selection of items among lists.
 * Menu contains 'select all' and 'select none' MenuItems for selecting all and
 * no items by default. Other MenuItems can be added by user.
 *
 * The checkbox content fires the action events associated with the 'select all'
 * and 'select none' menu items.
 *
 */

goog.provide('goog.ui.SelectionMenuButton');
goog.provide('goog.ui.SelectionMenuButton.ActionType');

goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuButton');
goog.require('goog.ui.MenuItem');


/**
 * A selection menu button control.  Extends {@link goog.ui.MenuButton}.
 * Menu contains 'select all' and 'select none' MenuItems for selecting all and
 * no items by default. Other MenuItems can be added by user.
 *
 * The checkbox content fires the action events associated with the 'select all'
 * and 'select none' menu items.
 *
 * @param {goog.ui.ButtonRenderer} opt_renderer Renderer used to render or
 *     decorate the menu button; defaults to {@link goog.ui.MenuButtonRenderer}.
 * @param {goog.ui.MenuItemRenderer} opt_itemRenderer Optional menu item
 *     renderer.
 * @param {goog.dom.DomHelper} opt_domHelper Optional DOM hepler, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.MenuButton}
 */
goog.ui.SelectionMenuButton = function(opt_renderer,
                                       opt_itemRenderer,
                                       opt_domHelper) {
  goog.ui.MenuButton.call(this,
                          null,
                          null,
                          opt_renderer,
                          opt_domHelper);
  this.initialItemRenderer_ = opt_itemRenderer || null;
};
goog.inherits(goog.ui.SelectionMenuButton, goog.ui.MenuButton);


/**
 * Item renderer used for the first 2 items, 'select all' and 'select none'.
 * @type {goog.ui.MenuItemRenderer}
 * @private
 */
goog.ui.SelectionMenuButton.prototype.initialItemRenderer_;


/**
 * Constants for menu action types.
 * @enum {string}
 */
goog.ui.SelectionMenuButton.ActionType = {
  ALL: 'all',
  NONE: 'none'
};


/**
 * Disables button and embedded checkbox.
 * @param {boolean} enable Whether to enable or disable the button.
 * @override
 */
goog.ui.SelectionMenuButton.prototype.setEnabled = function(enable) {
  goog.ui.SelectionMenuButton.superClass_.setEnabled.call(this, enable);
  this.getCheckbox_().disabled = !enable;
};


/** @inheritDoc */
goog.ui.SelectionMenuButton.prototype.handleMouseDown = function(e) {
  if (e.target != this.getCheckbox_()) {
    goog.ui.SelectionMenuButton.superClass_.handleMouseDown.call(this, e);
  }
};


/**
 * Gets the checkbox element. Needed because if decorating html, getContent()
 * may include and comment/text elements in addition to the input element.
 * @return {Element} Checkbox.
 * @private
 */
goog.ui.SelectionMenuButton.prototype.getCheckbox_ = function() {
  var elements = this.dom_.getElementsByTagNameAndClass(
      'input',
      goog.getCssName('goog-selectionmenubutton-checkbox'),
      this.getContentElement());
  return elements[0];
};


/**
 * Checkbox click handler.
 * @param {goog.events.BrowserEvent} e Checkbox click event.
 * @private
 */
goog.ui.SelectionMenuButton.prototype.handleCheckboxClick_ = function(e) {
  if (e.target.checked) {
    this.getItemAt(0).dispatchEvent(  // 'All' item
        goog.ui.Component.EventType.ACTION);
  } else {
    this.getItemAt(1).dispatchEvent(  // 'None' item
        goog.ui.Component.EventType.ACTION);
  }
};


/**
 * Menu action handler to update checkbox checked state.
 * @param {goog.events.Event} e Menu action event.
 * @private
 */
goog.ui.SelectionMenuButton.prototype.handleMenuAction_ = function(e) {
  if (e.target.getModel() == goog.ui.SelectionMenuButton.ActionType.ALL) {
    this.getCheckbox_().checked = true;
  } else {
    this.getCheckbox_().checked = false;
  }
};


/**
 * Set up events related to the checkbox.
 * @private
 */
goog.ui.SelectionMenuButton.prototype.addCheckboxEvent_ = function() {
  this.getHandler().listen(this.getCheckbox_(),
                           goog.events.EventType.CLICK,
                           this.handleCheckboxClick_);
  this.getHandler().listen(this.getMenu(),
                           goog.ui.Component.EventType.ACTION,
                           this.handleMenuAction_);
  this.getItemAt(0).setModel(goog.ui.SelectionMenuButton.ActionType.ALL);
  this.getItemAt(1).setModel(goog.ui.SelectionMenuButton.ActionType.NONE);
};


/**
 * Adds the checkbox to the button, and adds 2 items to the menu corresponding
 * to 'select all' and 'select none'.
 * @override
 * @protected
 */
goog.ui.SelectionMenuButton.prototype.createDom = function() {
  goog.ui.SelectionMenuButton.superClass_.createDom.call(this);
  var checkbox = this.dom_.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = goog.getCssName('goog-selectionmenubutton-checkbox');
  this.setContent(checkbox);

  /** @desc Text for 'All' button, used to select all items in a list. */
  var MSG_SELECTIONMENUITEM_ALL = goog.getMsg('All');
  /** @desc Text for 'None' button, used to unselect all items in a list. */
  var MSG_SELECTIONMENUITEM_NONE = goog.getMsg('None');

  var itemAll = new goog.ui.MenuItem(MSG_SELECTIONMENUITEM_ALL,
                                     null,
                                     this.dom_,
                                     this.initialItemRenderer_);
  var itemNone = new goog.ui.MenuItem(MSG_SELECTIONMENUITEM_NONE,
                                      null,
                                      this.dom_,
                                      this.initialItemRenderer_);
  this.addItem(itemAll);
  this.addItem(itemNone);

  this.addCheckboxEvent_();
};


/** @inheritDoc */
goog.ui.SelectionMenuButton.prototype.decorateInternal = function(element) {
  goog.ui.SelectionMenuButton.superClass_.decorateInternal.call(this, element);
  this.addCheckboxEvent_();
};


// Register a decorator factory function for goog.ui.SelectionMenuButton.
goog.ui.registry.setDecoratorByClassName(
    goog.getCssName('goog-selectionmenubutton-button'),
    function() {
      return new goog.ui.SelectionMenuButton();
    });
