/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.i18n.GraphemeBreakTest');
goog.setTestOnly();

const GraphemeBreak = goog.require('goog.i18n.GraphemeBreak');
const testSuite = goog.require('goog.testing.testSuite');
const uChar = goog.require('goog.i18n.uChar');

/** @const {function(number):?string} */
const fromCharCode = uChar.fromCharCode;

testSuite({
  testEmptyInput() {
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings('a', ''));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings('', 'b'));
  },

  testBreakNormalAscii() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(
        'a'.charCodeAt(0), 'b'.charCodeAt(0), true));

    assertTrue(GraphemeBreak.hasGraphemeBreakStrings('a', 'b', true));
  },

  testBreakAsciiWithExtendedChar() {
    assertFalse(
        GraphemeBreak.hasGraphemeBreak('a'.charCodeAt(0), 0x0300, true));

    assertFalse(
        GraphemeBreak.hasGraphemeBreakStrings('a', fromCharCode(0x0300), true));
  },

  testBreakSurrogates() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0xDA00, 0xDC00, true));
    assertFalse(GraphemeBreak.hasGraphemeBreak(0xDBFF, 0xDFFF, true));

    assertFalse(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0xDA00), fromCharCode(0xDC00), true));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0xDBFF), fromCharCode(0xDFFF), true));
  },

  testBreakHangLxL() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0x1100, 0x1100, true));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0x1100), fromCharCode(0x1100), true));
  },

  testBreakHangL_T() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x1100, 0x11A8));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0x1100), fromCharCode(0x11A8)));
  },

  testBreakHangLVxV() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0xAC00, 0x1160, true));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0xAC00), fromCharCode(0x1160), true));
  },

  testBreakHangLV_L() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0xAC00, 0x1100, true));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0xAC00), fromCharCode(0x1100), true));
  },

  testBreakHangLVTxT() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0xAC01, 0x11A8, true));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0xAC01), fromCharCode(0x11A8), true));
  },

  testBreakThaiPrependLegacy() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x0E40, 0x0E01, false));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0x0E40), fromCharCode(0x0E01), false));
  },

  testBreakThaiPrependExtended() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x0E40, 0x0E01, true));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0x0E40), fromCharCode(0x0E01), true));
  },

  testBreakDevaSpacingMarkLegacy() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x0915, 0x093E, false));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0x0915), fromCharCode(0x093E), false));
  },

  testBreakDevaSpacingMarkExtended() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0x0915, 0x093E, true));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0x0915), fromCharCode(0x093E), true));
  },

  testBreakDevaViramaSpace() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x094D, 0x0020));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0x094D), fromCharCode(0x0020)));
  },

  testBreakDevaViramaConsonant() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0x094D, 0x0915));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings(
        fromCharCode(0x094D), fromCharCode(0x0915)));
  },

  testEmojiSequences() {
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings('👦', '🏼'));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings('👨\u200D', '🚒'));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings('👨', '\u200D🚒'));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings(
        '🕵️‍♀️', '👨‍🚒'));
  },

  testEmojiFlagSequences() {
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings('🇦🇨🇦', '🇨'));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings('🇦🇨', '🇦🇨'));
  },
});
