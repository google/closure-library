// Copyright 2018 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview RelativeDateTimeFormat provides methods to format simple
 * relative dates and times into a string in a user friendly way and a locale
 * sensitive manner. Numeric quantities are supported with negative values
 * indicating the past, zero meaning now, and positive for the future. Specific
 * named times such as "tomorrow" are returned and correctly pluralized results
 * are given for relative times without specific names such as "in 5 days" or "3
 * weeks ago". The result is localized according to current locale value.
 *
 * Similar to the ICU4J class com/ibm/icu/text/RelativeDateTimeFormatter:
 * http://icu-project.org/apiref/icu4j/com/ibm/icu/text/RelativeDateTimeFormatter.html
 */

goog.module('goog.i18n.RelativeDateTimeFormat');

var MessageFormat = goog.require('goog.i18n.MessageFormat');
var asserts = goog.require('goog.asserts');
var relativeDateTimeSymbols = goog.require('goog.i18n.relativeDateTimeSymbols');

/**
 * @constructor
 * @param {!RelativeDateTimeFormat.NumericOption=} opt_numeric
 *     This optional string determines if formatted output is always
 *     the numeric formatting rather than available relative strings.
 *     ALWAYS (default) forces numeric results in all uses of this instance.
 *     AUTO mode uses available relative strings such as "tomorrow", falling
 * back to numeric.
 * @param {!RelativeDateTimeFormat.Style=} opt_style
 *     This optional value determines the style of the relative time output.
 *     Values include LONG, SHORT, NARROW. Default is LONG.
 *     as part of the resulting formatted string
 * @param {!relativeDateTimeSymbols.RelativeDateTimeSymbols=}
 *     opt_relativeDateTimeSymbols This optional value can be used to set the
 *     data for to use for this instance rather than obtaining from
 *     relativedatetimesymbols.
 * @final
 */
var RelativeDateTimeFormat = function(
    opt_numeric, opt_style, opt_relativeDateTimeSymbols) {
  asserts.assert(
      goog.isDef(opt_relativeDateTimeSymbols) ||
          goog.isDef(relativeDateTimeSymbols.getRelativeDateTimeSymbols()),
      'goog.i18n.RelativeDateTimeSymbols or explicit symbols must be defined');
  /**
   * Flag to force numeric mode in all cases. Normally true.
   * @private @type {boolean}
   */
  this.alwaysNumeric_ = true;
  if (opt_numeric) {
    asserts.assert(
        opt_numeric == RelativeDateTimeFormat.NumericOption.ALWAYS ||
            opt_numeric == RelativeDateTimeFormat.NumericOption.AUTO,
        'Invalid opt_numeric value');
    if (opt_numeric == RelativeDateTimeFormat.NumericOption.ALWAYS) {
      this.alwaysNumeric_ = true;
    } else if (opt_numeric == RelativeDateTimeFormat.NumericOption.AUTO) {
      this.alwaysNumeric_ = false;
    }
  }

  /** @private @type {!RelativeDateTimeFormat.Style} */
  this.style_ = RelativeDateTimeFormat.Style.LONG;
  if (opt_style) {
    asserts.assert(
        opt_style >= RelativeDateTimeFormat.Style.LONG &&
            opt_style <= RelativeDateTimeFormat.Style.NARROW,
        'Style must be LONG, SHORT, or NARROW');
    this.style_ = opt_style;
  }

  /**
   * RelativeDateTimeSymbols object for locale data required by the formatter.
   * @private @const {!relativeDateTimeSymbols.RelativeDateTimeSymbols}
   */
  this.rdtfSymbols_ = opt_relativeDateTimeSymbols ||
      relativeDateTimeSymbols.getRelativeDateTimeSymbols();
};

/**
 * Values for setting the numeric mode in the constructor.
 * @enum {string}
 */
RelativeDateTimeFormat.NumericOption = {
  ALWAYS: 'always',
  AUTO: 'auto',
};

/**
 * Collection of public style symbols.
 * @enum {number}
 */
RelativeDateTimeFormat.Style = {
  LONG: 0,
  SHORT: 1,
  NARROW: 2
};

/**
 * Relative unit constants for public use.
 * @enum {number}
 */
RelativeDateTimeFormat.Unit = {
  YEAR: 0,
  QUARTER: 1,
  MONTH: 2,
  WEEK: 3,
  DAY: 4,
  HOUR: 5,
  MINUTE: 6,
  SECOND: 7
};

/**
 * Formats a string with the amount and relative unit. If data for the quantity
 * is not available in the requested style, then it falls back to next style. If
 * not available in any style, then it reverts to formatNumeric for the same
 * unit.
 * @param {number} quantity  A desired offset from current time, negative
 *     for past, 0 for now, positive for future.
 * @param {!RelativeDateTimeFormat.Unit} relativeUnit  Type such as HOUR, YEAR,
 *     QUARTER.
 * @return {string} The formatted result.
 */
RelativeDateTimeFormat.prototype.format = function(quantity, relativeUnit) {
  asserts.assertNumber(quantity, 'Quantity must be a number');
  asserts.assert(
      relativeUnit >= RelativeDateTimeFormat.Unit.YEAR &&
          relativeUnit <= RelativeDateTimeFormat.Unit.SECOND,
      'Unit must be one of the supported values');

  /**
   * Find the right data based on Unit, quantity, and plural.
   */
  var rdtfUnitPattern = this.getUnitStylePattern_(relativeUnit);

  var dirString = quantity.toString();

  // Check for force numeric and having relative value with the given quantity.
  if (!this.alwaysNumeric_ && rdtfUnitPattern && rdtfUnitPattern.RELATIVE &&
      rdtfUnitPattern.RELATIVE[dirString]) {
    return rdtfUnitPattern.RELATIVE[dirString];
  } else {
    // Direction data doesn't exist. Fallback to format numeric.
    return this.formatNumericInternal_(quantity, rdtfUnitPattern);
  }
};


/**
 * Format with forced numeric value and relative unit.
 * @param {number} quantity  The number of units.
 *     Negative zero will use PAST, while unsiged or positive indicates FUTURE.
 * @param {!relativeDateTimeSymbols.StyleElement} unitStylePattern  Has PAST and
 *     FUTURE fields.
 * @return {string}  The formatted result.
 * @private
 */
RelativeDateTimeFormat.prototype.formatNumericInternal_ = function(
    quantity, unitStylePattern) {
  if (!unitStylePattern) return '';

  /**
   * Stores the plural formatting string.
   * @type {string}
   */
  var relTimeString;
  var absQuantity = Math.abs(quantity);

  // Apply MessageFormat to the unit with FUTURE or PAST quantity, with test for
  // signed zero value.
  if (quantity > 0 || (quantity == 0 && (1 / quantity) == Infinity)) {
    relTimeString = unitStylePattern.FUTURE;
  } else {
    // Negative zero is interpreted as the past.
    relTimeString = unitStylePattern.PAST;
  }

  /**
   * Formatter for the messages requiring units. Plural formatting needed.
   * @type {?MessageFormat}
   */
  var msgFormatter = new MessageFormat(relTimeString);
  return msgFormatter.format({'N': absQuantity});
};


/**
 * From the data, return the information for the given unit and style.
 * @param {number} relativeUnit
 * @return {!relativeDateTimeSymbols.StyleElement}  RelativeUnitStyle
 * @private
 */
RelativeDateTimeFormat.prototype.getUnitStylePattern_ = function(relativeUnit) {
  var unitInfo = this.getUnitPattern_(relativeUnit);
  asserts.assertObject(unitInfo);

  var styleInfo = this.getStylePattern_(unitInfo);
  asserts.assertObject(unitInfo);

  return styleInfo;
};

/**
 * Use public unit symbol to retrieve data for that unit.
 * @param {number|!relativeDateTimeSymbols.RelativeDateTimeFormatStyles} unit
 * @return {!relativeDateTimeSymbols.RelativeDateTimeFormatStyles}
 * @private
 */
RelativeDateTimeFormat.prototype.getUnitPattern_ = function(unit) {
  switch (unit) {
    default:
    case RelativeDateTimeFormat.Unit.YEAR:
      return this.rdtfSymbols_.YEAR;
    case RelativeDateTimeFormat.Unit.QUARTER:
      return this.rdtfSymbols_.QUARTER;
    case RelativeDateTimeFormat.Unit.MONTH:
      return this.rdtfSymbols_.MONTH;
    case RelativeDateTimeFormat.Unit.WEEK:
      return this.rdtfSymbols_.WEEK;
    case RelativeDateTimeFormat.Unit.DAY:
      return this.rdtfSymbols_.DAY;
    case RelativeDateTimeFormat.Unit.HOUR:
      return this.rdtfSymbols_.HOUR;
    case RelativeDateTimeFormat.Unit.MINUTE:
      return this.rdtfSymbols_.MINUTE;
    case RelativeDateTimeFormat.Unit.SECOND:
      return this.rdtfSymbols_.SECOND;
  }
};

/**
 * Use public unit symbol to retrieve data for that unit, given the style.
 * @param{!relativeDateTimeSymbols.RelativeDateTimeFormatStyles} unit
 * @return {!relativeDateTimeSymbols.StyleElement}
 * @private
 */
RelativeDateTimeFormat.prototype.getStylePattern_ = function(unit) {
  switch (this.style_) {
    default:
    case RelativeDateTimeFormat.Style.LONG:
      return unit.LONG;
    case RelativeDateTimeFormat.Style.SHORT:
      return unit.SHORT;
    case RelativeDateTimeFormat.Style.NARROW:
      return unit.NARROW;
  }
};

/**
 * Returns the style set for this formatter.
 * @return {number}  One of LONG, SHORT, NARROW,
 */
RelativeDateTimeFormat.prototype.getFormatStyle = function() {
  return this.style_;
};

/**
 * Returns the status of the alwaysNumeric field.
 * @return {!RelativeDateTimeFormat.NumericOption}
 */
RelativeDateTimeFormat.prototype.getNumericMode = function() {
  if (this.alwaysNumeric_) {
    return RelativeDateTimeFormat.NumericOption.ALWAYS;
  } else {
    return RelativeDateTimeFormat.NumericOption.AUTO;
  }
};

exports = RelativeDateTimeFormat;
