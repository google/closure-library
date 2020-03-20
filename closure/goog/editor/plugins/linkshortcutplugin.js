/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Adds a keyboard shortcut for the link command.
 */

goog.provide('goog.editor.plugins.LinkShortcutPlugin');

goog.forwardDeclare('goog.editor.Link');
goog.require('goog.editor.Command');
goog.require('goog.editor.Plugin');



/**
 * Plugin to add a keyboard shortcut for the link command
 * @constructor
 * @extends {goog.editor.Plugin}
 * @final
 */
goog.editor.plugins.LinkShortcutPlugin = function() {
  goog.editor.plugins.LinkShortcutPlugin.base(this, 'constructor');
};
goog.inherits(goog.editor.plugins.LinkShortcutPlugin, goog.editor.Plugin);


/** @override */
goog.editor.plugins.LinkShortcutPlugin.prototype.getTrogClassId = function() {
  return 'LinkShortcutPlugin';
};


/**
 * @override
 */
goog.editor.plugins.LinkShortcutPlugin.prototype.handleKeyboardShortcut =
    function(e, key, isModifierPressed) {
  if (isModifierPressed && key == 'k' && !e.shiftKey) {
    var link = /** @type {goog.editor.Link?} */ (
        this.getFieldObject().execCommand(goog.editor.Command.LINK));
    if (link) {
      link.finishLinkCreation(this.getFieldObject());
    }
    return true;
  }

  return false;
};
