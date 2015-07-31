// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for goog.i18.diacritics.
 */

goog.provide('goog.i18n.diacriticsTest');
goog.setTestOnly('goog.i18n.diacriticsTest');

goog.require('goog.i18n.diacritics');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');


function testNormalizeDiacritics() {
  // normalize does not work correctly in IE7: it no-ops.
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('8')) {
    return;
  }

  var normalize = goog.i18n.diacritics.normalize;
  assertEquals('Nina', normalize('\u00D1ina')); // Ñina
  assertEquals('Andre', normalize('Andr\u00E9')); // André
  assertEquals('Benoit', normalize('Beno\u00EEt')); // Benoît
  assertEquals('Horacek', normalize('Hor\u00E1\u010Dek')); // Horáček
  assertEquals('Hafstrom', normalize('H\u00E5fstr\u00F6m')); // Håfström
  assertEquals('Tepes', normalize('\u0162epe\u015F')); // Ţepeş
  assertEquals('Isarescu', normalize('Is\u0103rescu')); // Isărescu
  assertEquals('Dalins', normalize('D\u0101li\u0146\u0161')); // Dāliņš
  assertEquals('Erno', normalize('Ern\u0151')); // Ernő
  assertEquals('foo', normalize('foo')); // foo
}
