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

/**
 * @fileoverview A palette of symbols.
 *
 */

goog.provide('goog.editor.plugins.equation.SymbolPalette');

goog.require('goog.editor.plugins.equation.Palette');

goog.require('goog.math.Size');



/**
 * Constructs a new symbols palette.
 * @param {goog.editor.plugins.equation.PaletteManager} paletteManager The
 *     manager of the palette.
 * @extends {goog.editor.plugins.equation.Palette}
 * @constructor
 */
goog.editor.plugins.equation.SymbolPalette = function(paletteManager) {
  goog.editor.plugins.equation.Palette.call(this, paletteManager,
      goog.editor.plugins.equation.Palette.Type.SYMBOL,
      0, 50, 18, 18,
      ['\\times',
       '\\div',
       '\\cdot',
       '\\pm',
       '\\mp',
       '\\ast',
       '\\star',
       '\\circ',
       '\\bullet',
       '\\oplus',
       '\\ominus',
       '\\oslash',
       '\\otimes',
       '\\odot',
       '\\dagger',
       '\\ddagger',
       '\\vee',
       '\\wedge',
       '\\cap',
       '\\cup',
       '\\aleph',
       '\\Re',
       '\\Im',
       '\\top',
       '\\bot',
       '\\infty',
       '\\partial',
       '\\forall',
       '\\exists',
       '\\neg',
       '\\angle',
       '\\triangle',
       '\\diamond']);

  this.setSize(new goog.math.Size(7, 5));
};
goog.inherits(goog.editor.plugins.equation.SymbolPalette,
    goog.editor.plugins.equation.Palette);
