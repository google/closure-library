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
 * @fileoverview Collection of unitility functions for Unicode character.
 *
 */

goog.provide('goog.i18n.uChar');


/**
 * Map used for looking up the char data.  Will be created lazily.
 * @type {Object}
 * @private
 */
goog.i18n.uChar.charData_ = null;


/**
 * Gets the U+ notation string of a Unicode character. Ex: 'U+0041' for 'A'.
 * @param {string} ch The given character.
 * @return {string} The U+ notation of the given character.
 */
goog.i18n.uChar.toHexString = function(ch) {
  var chCode = goog.i18n.uChar.toCharCode(ch);
  var chCodeStr = 'U+' + goog.i18n.uChar.padString_(
      chCode.toString(16).toUpperCase(), 4, '0');

  return chCodeStr;
};


/**
 * Gets a string padded with given character to get given size.
 * @param {string} str The given string to be padded.
 * @param {number} length The target size of the string.
 * @param {string} ch The character to be padded with.
 * @return {string} The padded string.
 * @private
 */
goog.i18n.uChar.padString_ = function(str, length, ch) {
  while (str.length < length) {
    str = ch + str;
  }
  return str;
};


/**
 * Gets Unicode value of the given character.
 * @param {string} ch The given character.
 * @return {number} The Unicode value of the character.
 */
goog.i18n.uChar.toCharCode = function(ch) {
  var chCode = ch.charCodeAt(0);
  if (chCode >= 0xD800 && chCode <= 0xDBFF) {
    var chCode2 = ch.charCodeAt(1);
    chCode = (chCode - 0xD800) * 0x400 + chCode2 - 0xDC00 + 0x10000;
  }

  return chCode;
};


/**
 * Gets a character from the given Unicode value.
 * @param {number} code The Unicode value of the character.
 * @return {?string} The character from Unicode value.
 */
goog.i18n.uChar.fromCharCode = function(code) {
  if (!code || code > 0x10FFFF) {
    return null;
  } else if (code >= 0x10000) {
    var hi = Math.floor((code - 0x10000) / 0x400) + 0xD800;
    var lo = (code - 0x10000) % 0x400 + 0xDC00;
    return String.fromCharCode(hi) + String.fromCharCode(lo);
  } else {
    return String.fromCharCode(code);
  }
};


/**
 * Gets the name of a character, if available, returns null otherwise.
 * @param {string} ch The character.
 * @return {?string} The name of the character.
 */
goog.i18n.uChar.toName = function(ch) {
  if (!goog.i18n.uChar.charData_) {
    goog.i18n.uChar.createCharData_();
  }

  var names = goog.i18n.uChar.charData_;
  var chCode = goog.i18n.uChar.toCharCode(ch);
  var chCodeStr = chCode + '';

  if (ch in names) {
    return names[ch];
  } else if (chCodeStr in names) {
    return names[chCode];
  } else if (0xFE00 <= chCode && chCode <= 0xFE0F ||
           0xE0100 <= chCode && chCode <= 0xE01EF) {
    var seqnum;
    if (0xFE00 <= chCode && chCode <= 0xFE0F) {
      // Variation selectors from 1 to 16.
      seqnum = chCode - 0xFDFF;
    } else {
      // Variation selectors from 17 to 256.
      seqnum = chCode - 0xE00EF;
    }

    /** @desc Variation selector with the sequence number. */
    var MSG_VARIATION_SELECTOR_SEQNUM =
        goog.getMsg('Variation Selector - {$seqnum}', {'seqnum': seqnum});
    return MSG_VARIATION_SELECTOR_SEQNUM;
  }
  return null;
};


/**
 * Following lines are programatically created.
 * Details: https://sites/cibu/character-picker
 **/

/**
 * Sets up the character map, lazily.  Some characters are indexed by their
 * decimal value.
 * @private
 */
goog.i18n.uChar.createCharData_ = function() {


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ARABIC_SIGN_SANAH_ = goog.getMsg('Arabic Sign Sanah');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_EN_QUAD_ = goog.getMsg('En Quad');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ARABIC_SIGN_SAFHA_ = goog.getMsg('Arabic Sign Safha');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ARABIC_FOOTNOTE_MARKER_ = goog.getMsg('Arabic Footnote Marker');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_FOUR_PER_EM_SPACE_ = goog.getMsg('Four-per-em Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_THREE_PER_EM_SPACE_ = goog.getMsg('Three-per-em Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_FIGURE_SPACE_ = goog.getMsg('Figure Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MONGOLIAN_SOFT_HYPHEN_ = goog.getMsg('Mongolian Soft Hyphen');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_THIN_SPACE_ = goog.getMsg('Thin Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_SOFT_HYPHEN_ = goog.getMsg('Soft Hyphen');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ZERO_WIDTH_SPACE_ = goog.getMsg('Zero Width Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ARMENIAN_HYPHEN_ = goog.getMsg('Armenian Hyphen');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ZERO_WIDTH_JOINER_ = goog.getMsg('Zero Width Joiner');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_EM_SPACE_ = goog.getMsg('Em Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_SYRIAC_ABBREVIATION_MARK_ = goog.getMsg('Syriac Abbreviation Mark');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MONGOLIAN_VOWEL_SEPARATOR_ = goog.getMsg('Mongolian Vowel Separator');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_NON_BREAKING_HYPHEN_ = goog.getMsg('Non-breaking Hyphen');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HYPHEN_ = goog.getMsg('Hyphen');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_EM_QUAD_ = goog.getMsg('Em Quad');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_EN_SPACE_ = goog.getMsg('En Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HORIZONTAL_BAR_ = goog.getMsg('Horizontal Bar');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_EM_DASH_ = goog.getMsg('Em Dash');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_DOUBLE_OBLIQUE_HYPHEN_ = goog.getMsg('Double Oblique Hyphen');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MUSICAL_SYMBOL_END_PHRASE_ = goog.getMsg('Musical Symbol End Phrase');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MEDIUM_MATHEMATICAL_SPACE_ = goog.getMsg('Medium Mathematical Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_WAVE_DASH_ = goog.getMsg('Wave Dash');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_SPACE_ = goog.getMsg('Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HYPHEN_WITH_DIAERESIS_ = goog.getMsg('Hyphen With Diaeresis');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_IDEOGRAPHIC_SPACE_ = goog.getMsg('Ideographic Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_RIGHT_TO_LEFT_EMBEDDING_ = goog.getMsg('Right-to-left Embedding');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_SIX_PER_EM_SPACE_ = goog.getMsg('Six-per-em Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HYPHEN_MINUS_ = goog.getMsg('Hyphen-minus');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_POP_DIRECTIONAL_FORMATTING_ =
      goog.getMsg('Pop Directional Formatting');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_NARROW_NO_BREAK_SPACE_ = goog.getMsg('Narrow No-break Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_RIGHT_TO_LEFT_OVERRIDE_ = goog.getMsg('Right-to-left Override');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_PRESENTATION_FORM_FOR_VERTICAL_EM_DASH_ =
      goog.getMsg('Presentation Form For Vertical Em Dash');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_WAVY_DASH_ = goog.getMsg('Wavy Dash');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_PRESENTATION_FORM_FOR_VERTICAL_EN_DASH_ =
      goog.getMsg('Presentation Form For Vertical En Dash');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_KHMER_VOWEL_INHERENT_AA_ = goog.getMsg('Khmer Vowel Inherent Aa');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_KHMER_VOWEL_INHERENT_AQ_ = goog.getMsg('Khmer Vowel Inherent Aq');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_PUNCTUATION_SPACE_ = goog.getMsg('Punctuation Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HALFWIDTH_HANGUL_FILLER_ = goog.getMsg('Halfwidth Hangul Filler');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_LEFT_TO_RIGHT_EMBEDDING_ = goog.getMsg('Left-to-right Embedding');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HEBREW_PUNCTUATION_MAQAF_ = goog.getMsg('Hebrew Punctuation Maqaf');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HAIR_SPACE_ = goog.getMsg('Hair Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_NO_BREAK_SPACE_ = goog.getMsg('No-break Space');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_FULLWIDTH_HYPHEN_MINUS_ = goog.getMsg('Fullwidth Hyphen-minus');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_PARAGRAPH_SEPARATOR_ = goog.getMsg('Paragraph Separator');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_LEFT_TO_RIGHT_OVERRIDE_ = goog.getMsg('Left-to-right Override');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_SMALL_HYPHEN_MINUS_ = goog.getMsg('Small Hyphen-minus');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_COMBINING_GRAPHEME_JOINER_ = goog.getMsg('Combining Grapheme Joiner');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ZERO_WIDTH_NON_JOINER_ = goog.getMsg('Zero Width Non-joiner');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MUSICAL_SYMBOL_BEGIN_PHRASE_ =
      goog.getMsg('Musical Symbol Begin Phrase');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ARABIC_NUMBER_SIGN_ = goog.getMsg('Arabic Number Sign');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_RIGHT_TO_LEFT_MARK_ = goog.getMsg('Right-to-left Mark');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_OGHAM_SPACE_MARK_ = goog.getMsg('Ogham Space Mark');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_SMALL_EM_DASH_ = goog.getMsg('Small Em Dash');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_LEFT_TO_RIGHT_MARK_ = goog.getMsg('Left-to-right Mark');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ARABIC_END_OF_AYAH_ = goog.getMsg('Arabic End Of Ayah');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HANGUL_CHOSEONG_FILLER_ = goog.getMsg('Hangul Choseong Filler');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HANGUL_FILLER_ = goog.getMsg('Hangul Filler');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_FUNCTION_APPLICATION_ = goog.getMsg('Function Application');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_HANGUL_JUNGSEONG_FILLER_ = goog.getMsg('Hangul Jungseong Filler');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_INVISIBLE_SEPARATOR_ = goog.getMsg('Invisible Separator');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_INVISIBLE_TIMES_ = goog.getMsg('Invisible Times');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_INVISIBLE_PLUS_ = goog.getMsg('Invisible Plus');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_WORD_JOINER_ = goog.getMsg('Word Joiner');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_LINE_SEPARATOR_ = goog.getMsg('Line Separator');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_KATAKANA_HIRAGANA_DOUBLE_HYPHEN_ =
      goog.getMsg('Katakana-hiragana Double Hyphen');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_EN_DASH_ = goog.getMsg('En Dash');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MUSICAL_SYMBOL_BEGIN_BEAM_ = goog.getMsg('Musical Symbol Begin Beam');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_FIGURE_DASH_ = goog.getMsg('Figure Dash');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MUSICAL_SYMBOL_BEGIN_TIE_ = goog.getMsg('Musical Symbol Begin Tie');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MUSICAL_SYMBOL_END_BEAM_ = goog.getMsg('Musical Symbol End Beam');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MUSICAL_SYMBOL_BEGIN_SLUR_ = goog.getMsg('Musical Symbol Begin Slur');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MUSICAL_SYMBOL_END_TIE_ = goog.getMsg('Musical Symbol End Tie');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_INTERLINEAR_ANNOTATION_ANCHOR_ =
      goog.getMsg('Interlinear Annotation Anchor');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_MUSICAL_SYMBOL_END_SLUR_ = goog.getMsg('Musical Symbol End Slur');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_INTERLINEAR_ANNOTATION_TERMINATOR_ =
      goog.getMsg('Interlinear Annotation Terminator');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_INTERLINEAR_ANNOTATION_SEPARATOR_ =
      goog.getMsg('Interlinear Annotation Separator');


/**
 * @desc Name for a symbol, character or a letter. Used in a pop-up balloon,
 *   shown to a document editing user trying to insert a special character.
 *   The balloon help would appear while the user hovers over the character
 *   displayed. Newlines are not allowed; translation should be a noun and
 *   as consise as possible. More details:
 *   docs/fileview?id=0B8NbxddKsFtwYjExMGJjNzgtYjkzOS00NjdiLTlmOGQtOGVhZDkyZDU5YjM4.
 * @type {string}
 * @private
 */
  var MSG_ZERO_WIDTH_NO_BREAK_SPACE_ = goog.getMsg('Zero Width No-break Space');

  goog.i18n.uChar.charData_ = {
    '\u0601': MSG_ARABIC_SIGN_SANAH_,
    '\u2000': MSG_EN_QUAD_,
    '\u0603': MSG_ARABIC_SIGN_SAFHA_,
    '\u0602': MSG_ARABIC_FOOTNOTE_MARKER_,
    '\u2005': MSG_FOUR_PER_EM_SPACE_,
    '\u2004': MSG_THREE_PER_EM_SPACE_,
    '\u2007': MSG_FIGURE_SPACE_,
    '\u1806': MSG_MONGOLIAN_SOFT_HYPHEN_,
    '\u2009': MSG_THIN_SPACE_,
    '\u00AD': MSG_SOFT_HYPHEN_,
    '\u200B': MSG_ZERO_WIDTH_SPACE_,
    '\u058A': MSG_ARMENIAN_HYPHEN_,
    '\u200D': MSG_ZERO_WIDTH_JOINER_,
    '\u2003': MSG_EM_SPACE_,
    '\u070F': MSG_SYRIAC_ABBREVIATION_MARK_,
    '\u180E': MSG_MONGOLIAN_VOWEL_SEPARATOR_,
    '\u2011': MSG_NON_BREAKING_HYPHEN_,
    '\u2010': MSG_HYPHEN_,
    '\u2001': MSG_EM_QUAD_,
    '\u2002': MSG_EN_SPACE_,
    '\u2015': MSG_HORIZONTAL_BAR_,
    '\u2014': MSG_EM_DASH_,
    '\u2E17': MSG_DOUBLE_OBLIQUE_HYPHEN_,
    '\u1D17A': MSG_MUSICAL_SYMBOL_END_PHRASE_,
    '\u205F': MSG_MEDIUM_MATHEMATICAL_SPACE_,
    '\u301C': MSG_WAVE_DASH_,
    ' ': MSG_SPACE_,
    '\u2E1A': MSG_HYPHEN_WITH_DIAERESIS_,
    '\u3000': MSG_IDEOGRAPHIC_SPACE_,
    '\u202B': MSG_RIGHT_TO_LEFT_EMBEDDING_,
    '\u2006': MSG_SIX_PER_EM_SPACE_,
    '-': MSG_HYPHEN_MINUS_,
    '\u202C': MSG_POP_DIRECTIONAL_FORMATTING_,
    '\u202F': MSG_NARROW_NO_BREAK_SPACE_,
    '\u202E': MSG_RIGHT_TO_LEFT_OVERRIDE_,
    '\uFE31': MSG_PRESENTATION_FORM_FOR_VERTICAL_EM_DASH_,
    '\u3030': MSG_WAVY_DASH_,
    '\uFE32': MSG_PRESENTATION_FORM_FOR_VERTICAL_EN_DASH_,
    '\u17B5': MSG_KHMER_VOWEL_INHERENT_AA_,
    '\u17B4': MSG_KHMER_VOWEL_INHERENT_AQ_,
    '\u2008': MSG_PUNCTUATION_SPACE_,
    '\uFFA0': MSG_HALFWIDTH_HANGUL_FILLER_,
    '\u202A': MSG_LEFT_TO_RIGHT_EMBEDDING_,
    '\u05BE': MSG_HEBREW_PUNCTUATION_MAQAF_,
    '\u200A': MSG_HAIR_SPACE_,
    '\u00A0': MSG_NO_BREAK_SPACE_,
    '\uFF0D': MSG_FULLWIDTH_HYPHEN_MINUS_,
    '8233': MSG_PARAGRAPH_SEPARATOR_,
    '\u202D': MSG_LEFT_TO_RIGHT_OVERRIDE_,
    '\uFE63': MSG_SMALL_HYPHEN_MINUS_,
    '\u034F': MSG_COMBINING_GRAPHEME_JOINER_,
    '\u200C': MSG_ZERO_WIDTH_NON_JOINER_,
    '\u1D179': MSG_MUSICAL_SYMBOL_BEGIN_PHRASE_,
    '\u0600': MSG_ARABIC_NUMBER_SIGN_,
    '\u200F': MSG_RIGHT_TO_LEFT_MARK_,
    '\u1680': MSG_OGHAM_SPACE_MARK_,
    '\uFE58': MSG_SMALL_EM_DASH_,
    '\u200E': MSG_LEFT_TO_RIGHT_MARK_,
    '\u06DD': MSG_ARABIC_END_OF_AYAH_,
    '\u115F': MSG_HANGUL_CHOSEONG_FILLER_,
    '\u3164': MSG_HANGUL_FILLER_,
    '\u2061': MSG_FUNCTION_APPLICATION_,
    '\u1160': MSG_HANGUL_JUNGSEONG_FILLER_,
    '\u2063': MSG_INVISIBLE_SEPARATOR_,
    '\u2062': MSG_INVISIBLE_TIMES_,
    '\u2064': MSG_INVISIBLE_PLUS_,
    '\u2060': MSG_WORD_JOINER_,
    '8232': MSG_LINE_SEPARATOR_,
    '\u30A0': MSG_KATAKANA_HIRAGANA_DOUBLE_HYPHEN_,
    '\u2013': MSG_EN_DASH_,
    '\u1D173': MSG_MUSICAL_SYMBOL_BEGIN_BEAM_,
    '\u2012': MSG_FIGURE_DASH_,
    '\u1D175': MSG_MUSICAL_SYMBOL_BEGIN_TIE_,
    '\u1D174': MSG_MUSICAL_SYMBOL_END_BEAM_,
    '\u1D177': MSG_MUSICAL_SYMBOL_BEGIN_SLUR_,
    '\u1D176': MSG_MUSICAL_SYMBOL_END_TIE_,
    '\uFFF9': MSG_INTERLINEAR_ANNOTATION_ANCHOR_,
    '\u1D178': MSG_MUSICAL_SYMBOL_END_SLUR_,
    '\uFFFB': MSG_INTERLINEAR_ANNOTATION_TERMINATOR_,
    '\uFFFA': MSG_INTERLINEAR_ANNOTATION_SEPARATOR_,
    '\uFEFF': MSG_ZERO_WIDTH_NO_BREAK_SPACE_
  };
};
