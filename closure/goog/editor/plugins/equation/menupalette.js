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

goog.provide('goog.editor.plugins.equation.MenuPalette');
goog.provide('goog.editor.plugins.equation.MenuPaletteRenderer');

goog.require('goog.editor.plugins.equation.Palette');
goog.require('goog.editor.plugins.equation.PaletteRenderer');

goog.require('goog.math.Size');
goog.require('goog.style');



/**
 * Constructs a new menu palette.
 * @param {goog.editor.plugins.equation.PaletteManager} paletteManager The
 *     manager of the palette.
 * @extends {goog.editor.plugins.equation.Palette}
 * @constructor
 */
goog.editor.plugins.equation.MenuPalette = function(paletteManager) {
  goog.editor.plugins.equation.Palette.call(this, paletteManager,
      goog.editor.plugins.equation.Palette.Type.MENU,
      0, 0, 46, 18,
      [goog.editor.plugins.equation.Palette.Type.GREEK,
       goog.editor.plugins.equation.Palette.Type.SYMBOL,
       goog.editor.plugins.equation.Palette.Type.COMPARISON,
       goog.editor.plugins.equation.Palette.Type.MATH,
       goog.editor.plugins.equation.Palette.Type.ARROW],
      goog.editor.plugins.equation.MenuPaletteRenderer.getInstance());
  this.setSize(new goog.math.Size(5, 1));
};
goog.inherits(goog.editor.plugins.equation.MenuPalette,
    goog.editor.plugins.equation.Palette);


/**
 * The CSS class name for the palette.
 * @type {string}
 */
goog.editor.plugins.equation.MenuPalette.CSS_CLASS = 'ee-menu-palette';


/**
 * Overrides the setVisible method to make menu palette always visible.
 * @param {boolean} visible Whether to show or hide the component.
 * @param {boolean=} opt_force If true, doesn't check whether the component
 *     already has the requested visibility, and doesn't dispatch any events.
 * @return {boolean} Whether the visibility was changed.
 */
goog.editor.plugins.equation.MenuPalette.prototype.setVisible = function(
    visible, opt_force) {
  return goog.base(this, 'setVisible', true, opt_force);
};



/**
 * The renderer for menu palette.
 * @extends {goog.editor.plugins.equation.PaletteRenderer}
 * @constructor
 */
goog.editor.plugins.equation.MenuPaletteRenderer = function() {
  goog.ui.PaletteRenderer.call(this);
};
goog.inherits(goog.editor.plugins.equation.MenuPaletteRenderer,
    goog.editor.plugins.equation.PaletteRenderer);
goog.addSingletonGetter(goog.editor.plugins.equation.MenuPaletteRenderer);


/** @inheritDoc */
goog.editor.plugins.equation.MenuPaletteRenderer.prototype.getCssClass =
    function() {
  return goog.editor.plugins.equation.MenuPalette.CSS_CLASS;
};
