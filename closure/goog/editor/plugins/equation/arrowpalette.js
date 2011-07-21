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

goog.provide('goog.editor.plugins.equation.ArrowPalette');

goog.require('goog.editor.plugins.equation.Palette');

goog.require('goog.math.Size');



/**
 * Constructs a new arrows palette.
 * @param {goog.editor.plugins.equation.PaletteManager} paletteManager The
 *     manager of the palette.
 * @extends {goog.editor.plugins.equation.Palette}
 * @constructor
 */
goog.editor.plugins.equation.ArrowPalette = function(paletteManager) {
  goog.editor.plugins.equation.Palette.call(this, paletteManager,
      goog.editor.plugins.equation.Palette.Type.ARROW,
      0, 150, 18, 18,
      ['\\leftarrow',
       '\\rightarrow',
       '\\leftrightarrow',
       '\\Leftarrow',
       '\\Rightarrow',
       '\\Leftrightarrow',
       '\\uparrow',
       '\\downarrow',
       '\\updownarrow',
       '\\Uparrow',
       '\\Downarrow',
       '\\Updownarrow']);
  this.setSize(new goog.math.Size(12, 1));
};
goog.inherits(goog.editor.plugins.equation.ArrowPalette,
    goog.editor.plugins.equation.Palette);
