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

goog.provide('goog.editor.plugins.equation.MathPalette');

goog.require('goog.editor.plugins.equation.Palette');

goog.require('goog.math.Size');



/**
 * Constructs a new math palette.
 * @param {goog.editor.plugins.equation.PaletteManager} paletteManager The
 *     manager of the palette.
 * @extends {goog.editor.plugins.equation.Palette}
 * @constructor
 */
goog.editor.plugins.equation.MathPalette = function(paletteManager) {
  goog.editor.plugins.equation.Palette.call(this, paletteManager,
      goog.editor.plugins.equation.Palette.Type.MATH,
      0, 90, 30, 56,
      ['x_{a}',
       'x^{b}',
       'x_{a}^{b}',
       '\\bar{x}',
       '\\tilde{x}',
       '\\frac{a}{b}',
       '\\sqrt{x}',
       '\\sqrt[n]{x}',
       '\\bigcap_{a}^{b}',
       '\\bigcup_{a}^{b}',
       '\\prod_{a}^{b}',
       '\\coprod_{a}^{b}',
       '\\left( x \\right)',
       '\\left[ x \\right]',
       '\\left\\{ x \\right\\}',
       '\\left| x \\right|',
       '\\int_{a}^{b}',
       '\\oint_{a}^{b}',
       '\\sum_{a}^{b}{x}',
       '\\lim_{a \\rightarrow b}{x}']);
  this.setSize(new goog.math.Size(10, 2));
};
goog.inherits(goog.editor.plugins.equation.MathPalette,
    goog.editor.plugins.equation.Palette);
