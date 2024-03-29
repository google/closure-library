/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities related to alpha/transparent colors and alpha color
 * conversion.
 */

goog.provide('goog.color.alpha');

goog.require('goog.color');


/**
 * Parses an alpha color out of a string.
 * @param {string} str Color in some format.
 * @return {{hex: string, type: string}} 'hex' is a string containing
 *     a hex representation of the color, and 'type' is a string
 *     containing the type of color format passed in ('hex', 'rgb', 'named').
 */
goog.color.alpha.parse = function(str) {
  'use strict';
  const result = {};
  str = String(str);

  const maybeHex = goog.color.prependHashIfNecessaryHelper(str);
  if (goog.color.alpha.isValidAlphaHexColor_(maybeHex)) {
    result.hex = goog.color.alpha.normalizeAlphaHex_(maybeHex);
    result.type = 'hex';
    return result;
  } else {
    const rgba = goog.color.alpha.isValidRgbaColor_(str);
    if (rgba.length) {
      result.hex = goog.color.alpha.rgbaArrayToHex(rgba);
      result.type = 'rgba';
      return result;
    } else {
      const hsla = goog.color.alpha.isValidHslaColor_(str);
      if (hsla.length) {
        result.hex = goog.color.alpha.hslaArrayToHex(hsla);
        result.type = 'hsla';
        return result;
      }
    }
  }
  throw new Error(str + ' is not a valid color string');
};


/**
 * Converts a hex representation of a color to RGBA.
 * @param {string} hexColor Color to convert.
 * @return {string} string of the form 'rgba(R,G,B,A)' which can be used in
 *    styles.
 */
goog.color.alpha.hexToRgbaStyle = function(hexColor) {
  'use strict';
  return goog.color.alpha.rgbaStyle_(goog.color.alpha.hexToRgba(hexColor));
};


/**
 * Extracts a substring, from startIdx to endIdx, of the normalized (lowercase
 * #rrggbbaa) form of a hex-with-alpha color.
 * @param {string} colorWithAlpha The alpha hex color to get the hex color from.
 *     This may be four or eight digits.
 * @param {number} startIdx The start index within the #rrggbbaa color.
 * @param {number} endIdx The end index within the #rrggbbbaa color.
 * @return {string} The requested startIdx-to-endIdx substring from the color.
 * @private
 */
goog.color.alpha.extractColor_ = function(colorWithAlpha, startIdx, endIdx) {
  'use strict';
  if (goog.color.alpha.isValidAlphaHexColor_(colorWithAlpha)) {
    const fullColor = goog.color.prependHashIfNecessaryHelper(colorWithAlpha);
    const normalizedColor = goog.color.alpha.normalizeAlphaHex_(fullColor);
    return normalizedColor.substring(startIdx, endIdx);
  } else {
    throw new Error(colorWithAlpha + ' is not a valid 8-hex color string');
  }
};


/**
 * Gets the hex color part of an alpha hex color. For example, both '#abcd' and
 * '#AABBCC12' return '#aabbcc'.
 * @param {string} colorWithAlpha The alpha hex color to get the hex color from.
 * @return {string} The hex color where the alpha part has been stripped off.
 */
goog.color.alpha.extractHexColor = function(colorWithAlpha) {
  'use strict';
  return goog.color.alpha.extractColor_(colorWithAlpha, 0, 7);
};


/**
 * Gets the alpha color part of an alpha hex color. For example, both '#123A'
 * and '#123456aa' return 'aa'. The result is always two characters long.
 * @param {string} colorWithAlpha The alpha hex color to get the hex color from.
 * @return {string} The two-character alpha from the given color.
 */
goog.color.alpha.extractAlpha = function(colorWithAlpha) {
  'use strict';
  return goog.color.alpha.extractColor_(colorWithAlpha, 7, 9);
};


/**
 * Regular expression for extracting the digits in a hex color quadruplet.
 * @const {!RegExp}
 * @private
 */
goog.color.alpha.hexQuadrupletRe_ = /#(.)(.)(.)(.)/;


/**
 * Normalize a hex representation of an alpha color.
 * @param {string} hexColor an alpha hex color string.
 * @return {string} hex color in the format '#rrggbbaa' with all lowercase
 *     literals.
 * @private
 */
goog.color.alpha.normalizeAlphaHex_ = function(hexColor) {
  'use strict';
  if (!goog.color.alpha.isValidAlphaHexColor_(hexColor)) {
    throw new Error('\'' + hexColor + '\' is not a valid alpha hex color');
  }
  if (hexColor.length == 5) {  // of the form #RGBA
    hexColor = hexColor.replace(
        goog.color.alpha.hexQuadrupletRe_, '#$1$1$2$2$3$3$4$4');
  }
  return hexColor.toLowerCase();
};


/**
 * Converts an 8-hex representation of a color to RGBA.
 * @param {string} hexColor Color to convert.
 * @return {!Array<number>} array containing [r, g, b, a].
 *     r, g, b are ints between 0
 *     and 255, and a is a value between 0 and 1.
 */
goog.color.alpha.hexToRgba = function(hexColor) {
  'use strict';
  // TODO(user): Enhance code sharing with goog.color, for example by
  //     adding a goog.color.genericHexToRgb method.
  hexColor = goog.color.alpha.normalizeAlphaHex_(hexColor);
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const a = parseInt(hexColor.slice(7, 9), 16);

  return [r, g, b, a / 255];
};


/**
 * Converts a color from RGBA to hex representation.
 * @param {number} r Amount of red, int between 0 and 255.
 * @param {number} g Amount of green, int between 0 and 255.
 * @param {number} b Amount of blue, int between 0 and 255.
 * @param {number} a Amount of alpha, float between 0 and 1.
 * @return {string} hex representation of the color.
 */
goog.color.alpha.rgbaToHex = function(r, g, b, a) {
  'use strict';
  const intAlpha = Math.floor(a * 255);
  if (isNaN(intAlpha) || intAlpha < 0 || intAlpha > 255) {
    // TODO(user): The CSS spec says the value should be clamped.
    throw new Error(
        '"(' + r + ',' + g + ',' + b + ',' + a +
        '") is not a valid RGBA color');
  }
  const hexA = goog.color.prependZeroIfNecessaryHelper(intAlpha.toString(16));
  return goog.color.rgbToHex(r, g, b) + hexA;
};


/**
 * Converts a color from HSLA to hex representation.
 * @param {number} h Amount of hue, int between 0 and 360.
 * @param {number} s Amount of saturation, int between 0 and 100.
 * @param {number} l Amount of lightness, int between 0 and 100.
 * @param {number} a Amount of alpha, float between 0 and 1.
 * @return {string} hex representation of the color.
 */
goog.color.alpha.hslaToHex = function(h, s, l, a) {
  'use strict';
  const intAlpha = Math.floor(a * 255);
  if (isNaN(intAlpha) || intAlpha < 0 || intAlpha > 255) {
    // TODO(user): The CSS spec says the value should be clamped.
    throw new Error(
        '"(' + h + ',' + s + ',' + l + ',' + a +
        '") is not a valid HSLA color');
  }
  const hexA = goog.color.prependZeroIfNecessaryHelper(intAlpha.toString(16));
  return goog.color.hslToHex(h, s / 100, l / 100) + hexA;
};


/**
 * Converts a color from RGBA to hex representation.
 * @param {!Array<number>} rgba Array of [r, g, b, a], with r, g, b in [0, 255]
 *     and a in [0, 1].
 * @return {string} hex representation of the color.
 */
goog.color.alpha.rgbaArrayToHex = function(rgba) {
  'use strict';
  return goog.color.alpha.rgbaToHex(rgba[0], rgba[1], rgba[2], rgba[3]);
};


/**
 * Converts a color from RGBA to an RGBA style string.
 * @param {number} r Value of red, in [0, 255].
 * @param {number} g Value of green, in [0, 255].
 * @param {number} b Value of blue, in [0, 255].
 * @param {number} a Value of alpha, in [0, 1].
 * @return {string} An 'rgba(r,g,b,a)' string ready for use in a CSS rule.
 */
goog.color.alpha.rgbaToRgbaStyle = function(r, g, b, a) {
  'use strict';
  if (isNaN(r) || r < 0 || r > 255 || isNaN(g) || g < 0 || g > 255 ||
      isNaN(b) || b < 0 || b > 255 || isNaN(a) || a < 0 || a > 1) {
    throw new Error(
        '"(' + r + ',' + g + ',' + b + ',' + a +
        ')" is not a valid RGBA color');
  }
  return goog.color.alpha.rgbaStyle_([r, g, b, a]);
};


/**
 * Converts a color from RGBA to an RGBA style string.
 * @param {(!Array<number>|!Float32Array)} rgba Array of [r, g, b, a],
 *     with r, g, b in [0, 255] and a in [0, 1].
 * @return {string} An 'rgba(r,g,b,a)' string ready for use in a CSS rule.
 */
goog.color.alpha.rgbaArrayToRgbaStyle = function(rgba) {
  'use strict';
  return goog.color.alpha.rgbaToRgbaStyle(rgba[0], rgba[1], rgba[2], rgba[3]);
};


/**
 * Converts a color from HSLA to hex representation.
 * @param {!Array<number>} hsla Array of [h, s, l, a], where h is an integer in
 *     [0, 360], s and l are integers in [0, 100], and a is in [0, 1].
 * @return {string} hex representation of the color, such as '#af457eff'.
 */
goog.color.alpha.hslaArrayToHex = function(hsla) {
  'use strict';
  return goog.color.alpha.hslaToHex(hsla[0], hsla[1], hsla[2], hsla[3]);
};


/**
 * Converts a color from HSLA to an RGBA style string.
 * @param {!Array<number>} hsla Array of [h, s, l, a], where h is and integer in
 *     [0, 360], s and l are integers in [0, 100], and a is in [0, 1].
 * @return {string} An 'rgba(r,g,b,a)' string ready for use in a CSS rule.
 */
goog.color.alpha.hslaArrayToRgbaStyle = function(hsla) {
  'use strict';
  return goog.color.alpha.hslaToRgbaStyle(hsla[0], hsla[1], hsla[2], hsla[3]);
};


/**
 * Converts a color from HSLA to an RGBA style string.
 * @param {number} h Amount of hue, int between 0 and 360.
 * @param {number} s Amount of saturation, int between 0 and 100.
 * @param {number} l Amount of lightness, int between 0 and 100.
 * @param {number} a Amount of alpha, float between 0 and 1.
 * @return {string} An 'rgba(r,g,b,a)' string ready for use in a CSS rule.
 *     styles.
 */
goog.color.alpha.hslaToRgbaStyle = function(h, s, l, a) {
  'use strict';
  return goog.color.alpha.rgbaStyle_(goog.color.alpha.hslaToRgba(h, s, l, a));
};


/**
 * Converts a color from HSLA color space to RGBA color space.
 * @param {number} h Amount of hue, int between 0 and 360.
 * @param {number} s Amount of saturation, int between 0 and 100.
 * @param {number} l Amount of lightness, int between 0 and 100.
 * @param {number} a Amount of alpha, float between 0 and 1.
 * @return {!Array<number>} [r, g, b, a] values for the color, where r, g, b
 *     are integers in [0, 255] and a is a float in [0, 1].
 */
goog.color.alpha.hslaToRgba = function(h, s, l, a) {
  'use strict';
  return goog.color.hslToRgb(h, s / 100, l / 100).concat(a);
};


/**
 * Converts a color from RGBA color space to HSLA color space.
 * Modified from {@link http://en.wikipedia.org/wiki/HLS_color_space}.
 * @param {number} r Value of red, in [0, 255].
 * @param {number} g Value of green, in [0, 255].
 * @param {number} b Value of blue, in [0, 255].
 * @param {number} a Value of alpha, in [0, 255].
 * @return {!Array<number>} [h, s, l, a] values for the color, with h an int in
 *     [0, 360] and s, l and a in [0, 1].
 */
goog.color.alpha.rgbaToHsla = function(r, g, b, a) {
  'use strict';
  return goog.color.rgbToHsl(r, g, b).concat(a);
};


/**
 * Converts a color from RGBA color space to HSLA color space.
 * @param {!Array<number>} rgba [r, g, b, a] values for the color, each in
 *     [0, 255].
 * @return {!Array<number>} [h, s, l, a] values for the color, with h in
 *     [0, 360] and s, l and a in [0, 1].
 */
goog.color.alpha.rgbaArrayToHsla = function(rgba) {
  'use strict';
  return goog.color.alpha.rgbaToHsla(rgba[0], rgba[1], rgba[2], rgba[3]);
};


/**
 * Helper for isValidAlphaHexColor_.
 * @const {!RegExp}
 * @private
 */
goog.color.alpha.validAlphaHexColorRe_ = /^#(?:[0-9a-f]{4}){1,2}$/i;


/**
 * Checks if a string is a valid alpha hex color.  We expect strings of the
 * format #RRGGBBAA (ex: #1b3d5f5b) or #RGBA (ex: #3CAF == #33CCAAFF).
 * @param {string} str String to check.
 * @return {boolean} Whether the string is a valid alpha hex color.
 * @private
 */
// TODO(user): Support percentages when goog.color also supports them.
goog.color.alpha.isValidAlphaHexColor_ = function(str) {
  'use strict';
  return goog.color.alpha.validAlphaHexColorRe_.test(str);
};


/**
 * Helper for isNormalizedAlphaHexColor_.
 * @const {!RegExp}
 * @private
 */
goog.color.alpha.normalizedAlphaHexColorRe_ = /^#[0-9a-f]{8}$/;


/**
 * Checks if a string is a normalized alpha hex color.
 * We expect strings of the format #RRGGBBAA (ex: #1b3d5f5b)
 * using only lowercase letters.
 * @param {string} str String to check.
 * @return {boolean} Whether the string is a normalized hex color.
 * @private
 */
goog.color.alpha.isNormalizedAlphaHexColor_ = function(str) {
  'use strict';
  return goog.color.alpha.normalizedAlphaHexColorRe_.test(str);
};


/**
 * A pattern capturing any 3-digit number (without leading 0s).
 * @const {!RegExp}
 * @private
 */
goog.color.alpha.re0_999_ = /(0|[1-9]\d{0,2})/;

/**
 * A pattern capturing [0.0000000000...1.0000000000].
 * Number before dot is optional.
 * @const {!RegExp}
 * @private
 */
goog.color.alpha.re0_1_ = /(0|1|0?\.\d{1,10}|1\.0{1,10})/;

/**
 * Regular expression for matching and capturing RGBA style strings. Helper for
 * isValidRgbaColor_.
 * @type {!RegExp}
 * @private
 */
goog.color.alpha.rgbaColorRe_ = new RegExp(
    '^\\s*(?:rgba)?\\(' +                             //
        goog.color.alpha.re0_999_.source + ',\\s*' +  //
        goog.color.alpha.re0_999_.source + ',\\s*' +  //
        goog.color.alpha.re0_999_.source + ',\\s*' +  //
        goog.color.alpha.re0_1_.source + '\\)\\s*$',
    'i');


/**
 * Regular expression for matching and capturing HSLA style strings. Helper for
 * isValidHslaColor_.
 * @type {!RegExp}
 * @private
 */
goog.color.alpha.hslaColorRe_ = new RegExp(
    '^\\s*(?:hsla)?\\(' +                              //
        goog.color.alpha.re0_999_.source + ',\\s*' +   //
        goog.color.alpha.re0_999_.source + '%,\\s*' +  //
        goog.color.alpha.re0_999_.source + '%,\\s*' +  //
        goog.color.alpha.re0_1_.source + '\\)\\s*$',
    'i');

/**
 * Checks if a string is a valid rgba color.  We expect strings of the format
 * '(r, g, b, a)', or 'rgba(r, g, b, a)', where r, g, b are ints in [0, 255]
 *     and a is a float in [0, 1].
 * @param {string} str String to check.
 * @return {!Array<number>} the integers [r, g, b, a] for valid colors or the
 *     empty array for invalid colors.
 * @private
 */
goog.color.alpha.isValidRgbaColor_ = function(str) {
  'use strict';
  // Each component is separate (rather than using a repeater) so we can
  // capture the match. Also, we explicitly set each component to be either 0,
  // or start with a non-zero, to prevent octal numbers from slipping through.
  const regExpResultArray = str.match(goog.color.alpha.rgbaColorRe_);
  if (regExpResultArray) {
    const r = Number(regExpResultArray[1]);
    const g = Number(regExpResultArray[2]);
    const b = Number(regExpResultArray[3]);
    const a = Number(regExpResultArray[4]);
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 &&
        a >= 0 && a <= 1) {
      return [r, g, b, a];
    }
  }
  return [];
};


/**
 * Checks if a string is a valid hsla color.  We expect strings of the format
 * 'hsla(h, s, l, a)', where s in an int in [0, 360], s and l are percentages
 *     between 0 and 100 such as '50%' or '70%', and a is a float in [0, 1].
 * @param {string} str String to check.
 * @return {!Array<number>} the integers [h, s, l, a] for valid colors or the
 *     empty array for invalid colors.
 * @private
 */
goog.color.alpha.isValidHslaColor_ = function(str) {
  'use strict';
  // Each component is separate (rather than using a repeater) so we can
  // capture the match. Also, we explicitly set each component to be either 0,
  // or start with a non-zero, to prevent octal numbers from slipping through.
  const regExpResultArray = str.match(goog.color.alpha.hslaColorRe_);
  if (regExpResultArray) {
    const h = Number(regExpResultArray[1]);
    const s = Number(regExpResultArray[2]);
    const l = Number(regExpResultArray[3]);
    const a = Number(regExpResultArray[4]);
    if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100 &&
        a >= 0 && a <= 1) {
      return [h, s, l, a];
    }
  }
  return [];
};


/**
 * Takes an array of [r, g, b, a] and converts it into a string appropriate for
 * CSS styles. The alpha channel value is rounded to 3 decimal places to make
 * sure the produced string is not too long.
 * @param {!Array<number>} rgba [r, g, b, a] with r, g, b in [0, 255] and a
 *     in [0, 1].
 * @return {string} string of the form 'rgba(r,g,b,a)'.
 * @private
 */
goog.color.alpha.rgbaStyle_ = function(rgba) {
  'use strict';
  const roundedRgba = rgba.slice(0);
  roundedRgba[3] = Math.round(rgba[3] * 1000) / 1000;
  return 'rgba(' + roundedRgba.join(',') + ')';
};


/**
 * Converts from h,s,v,a values to a hex string
 * @param {number} h Hue, in [0, 1].
 * @param {number} s Saturation, in [0, 1].
 * @param {number} v Value, in [0, 255].
 * @param {number} a Alpha, in [0, 1].
 * @return {string} hex representation of the color.
 */
goog.color.alpha.hsvaToHex = function(h, s, v, a) {
  'use strict';
  const alpha = Math.floor(a * 255);
  return goog.color.hsvArrayToHex([h, s, v]) +
      goog.color.prependZeroIfNecessaryHelper(alpha.toString(16));
};


/**
 * Converts from an HSVA array to a hex string
 * @param {!Array<number>} hsva Array of [h, s, v, a] in
 *     [[0, 1], [0, 1], [0, 255], [0, 1]].
 * @return {string} hex representation of the color.
 */
goog.color.alpha.hsvaArrayToHex = function(hsva) {
  'use strict';
  return goog.color.alpha.hsvaToHex(hsva[0], hsva[1], hsva[2], hsva[3]);
};
