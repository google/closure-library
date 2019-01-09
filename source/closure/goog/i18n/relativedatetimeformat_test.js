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

goog.module('goog.i18n.RelativeDateTimeFormatTest');
goog.setTestOnly('goog.i18n.RelativeDateTimeFormatTest');

var RelativeDateTimeFormat = goog.require('goog.i18n.RelativeDateTimeFormat');

var relativeDateTimeSymbols = goog.require('goog.i18n.relativeDateTimeSymbols');
var relativeDateTimeSymbolsExt = goog.require('goog.i18n.relativeDateTimeSymbolsExt');


var testSuite = goog.require('goog.testing.testSuite');

/**
 * @param {string} locale
 * @param {number} style
 * @param {number} direction
 * @param {number} unit
 * @param {string} expected
 * @constructor
 */
var DirectionData = function(locale, style, direction, unit, expected) {
  this.locale = locale;
  this.style = style;
  this.direction = direction;
  this.unit = unit;
  this.expected = expected;
};


/** @const {!Object<string, !Object>} */
var localeSymbols = {
  'en': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbols.RelativeDateTimeSymbols_en,
  },
  'es': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbols.RelativeDateTimeSymbols_es,
  },
  'fr': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbols.RelativeDateTimeSymbols_fr,
  },
  'ar_EG': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbols.RelativeDateTimeSymbols_ar_EG,
  },
  'agq': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbolsExt.RelativeDateTimeSymbols_agq,
  },
  'ar_AE': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbolsExt.RelativeDateTimeSymbols_ar_AE,
  },
  'as': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbolsExt.RelativeDateTimeSymbols_as,
  },
};


// clang-format off
var formatDirectionTestData = [
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.DAY, 'yesterday'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.DAY, 'today'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.DAY, 'tomorrow'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 2, RelativeDateTimeFormat.Unit.DAY, 'in 2 days'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -2, RelativeDateTimeFormat.Unit.DAY, '2 days ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.SHORT, -2, RelativeDateTimeFormat.Unit.DAY, '2 days ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.NARROW, -2, RelativeDateTimeFormat.Unit.DAY, '2 days ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -2, RelativeDateTimeFormat.Unit.WEEK, '2 weeks ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -2, RelativeDateTimeFormat.Unit.WEEK, '2 weeks ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.WEEK, 'last week'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.WEEK, 'this week'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.WEEK, 'next week'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.WEEK, 'next week'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 2, RelativeDateTimeFormat.Unit.WEEK, 'in 2 weeks'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -3, RelativeDateTimeFormat.Unit.WEEK, '3 weeks ago'),
 new DirectionData('en', RelativeDateTimeFormat.Style.NARROW, 5, RelativeDateTimeFormat.Unit.WEEK, 'in 5 wk.'),
  new DirectionData('en', RelativeDateTimeFormat.Style.NARROW, -5, RelativeDateTimeFormat.Unit.WEEK, '5 wk. ago'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.SECOND, 'in 1 second'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.SECOND, 'now'),
  new DirectionData(
      'en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.SECOND, 'now'),
  new DirectionData(
      'en', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.SECOND, '1 second ago'),
  new DirectionData(
      'en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.MINUTE, 'in 1 minute'),

  new DirectionData(
      'en', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.MINUTE, '1 minute ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.HOUR, 'in 1 hour'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.HOUR, '1 hour ago'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.MONTH, 'next month'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.QUARTER, 'next quarter'),
  new DirectionData('en', RelativeDateTimeFormat.Style.SHORT, 1, RelativeDateTimeFormat.Unit.QUARTER, 'next qtr.'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 2, RelativeDateTimeFormat.Unit.YEAR, 'in 2 years'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.WEEK, 'next week'),
  new DirectionData('en', RelativeDateTimeFormat.Style.SHORT, 1, RelativeDateTimeFormat.Unit.WEEK, 'next wk.'),
  new DirectionData('en', RelativeDateTimeFormat.Style.NARROW, 1, RelativeDateTimeFormat.Unit.WEEK, 'next wk.'),

  // TODO: test other STYLES and LOCALES
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, 1, RelativeDateTimeFormat.Unit.WEEK, 'الأسبوع القادم'),

  /* Trying with locale "es" */
  new DirectionData('es', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.DAY, 'ayer'),
  new DirectionData('es', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.DAY, 'hoy'),
  new DirectionData('es', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.DAY, 'mañana'),
  new DirectionData('es', RelativeDateTimeFormat.Style.LONG, 2, RelativeDateTimeFormat.Unit.DAY, 'pasado mañana'),
  new DirectionData('es', RelativeDateTimeFormat.Style.LONG, -2, RelativeDateTimeFormat.Unit.DAY, 'anteayer'),
  new DirectionData('es', RelativeDateTimeFormat.Style.SHORT, -2, RelativeDateTimeFormat.Unit.DAY, 'anteayer'),
  new DirectionData('es', RelativeDateTimeFormat.Style.NARROW, -2, RelativeDateTimeFormat.Unit.DAY, 'anteayer'),

  new DirectionData('fr', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.SECOND, 'il y a 1 seconde'),
  new DirectionData('fr', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.SECOND, 'maintenant')
];


var formatNumericTestData = [
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 7, RelativeDateTimeFormat.Unit.DAY, 'in 7 days'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -2, RelativeDateTimeFormat.Unit.DAY, '2 days ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -1.5, RelativeDateTimeFormat.Unit.DAY, '1.5 days ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.DAY, '1 day ago'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.DAY, 'in 0 days'),
  new DirectionData('en', RelativeDateTimeFormat.Style.SHORT, 2, RelativeDateTimeFormat.Unit.HOUR, 'in 2 hr.'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 2, RelativeDateTimeFormat.Unit.DAY, 'in 2 days'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 2.5, RelativeDateTimeFormat.Unit.DAY, 'in 2.5 days'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0.5, RelativeDateTimeFormat.Unit.DAY, 'in 0.5 days'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -2, RelativeDateTimeFormat.Unit.WEEK, '2 weeks ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.WEEK, '1 week ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.WEEK, 'in 0 weeks'),

  // Test with negative zero
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -0, RelativeDateTimeFormat.Unit.WEEK, '0 weeks ago'),

  new DirectionData('en', RelativeDateTimeFormat.Style.SHORT, 1, RelativeDateTimeFormat.Unit.WEEK, 'in 1 wk.'),
  new DirectionData('en', RelativeDateTimeFormat.Style.SHORT, 6, RelativeDateTimeFormat.Unit.WEEK, 'in 6 wk.'),
  new DirectionData('en', RelativeDateTimeFormat.Style.NARROW, 2, RelativeDateTimeFormat.Unit.WEEK, 'in 2 wk.'),
  // TODO: Lots more needed.

  new DirectionData('fr', RelativeDateTimeFormat.Style.NARROW, 2, RelativeDateTimeFormat.Unit.SECOND, '+2 s'),
  new DirectionData('fr', RelativeDateTimeFormat.Style.LONG, 2, RelativeDateTimeFormat.Unit.SECOND, 'dans 2 secondes'),
  new DirectionData('fr', RelativeDateTimeFormat.Style.SHORT, 2, RelativeDateTimeFormat.Unit.SECOND, 'dans 2 s'),

  // Test signed zero
  new DirectionData('en', RelativeDateTimeFormat.Style.NARROW, 0, RelativeDateTimeFormat.Unit.WEEK, 'in 0 wk.'),
  new DirectionData('en', RelativeDateTimeFormat.Style.NARROW, -0, RelativeDateTimeFormat.Unit.WEEK, '0 wk. ago'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -0, RelativeDateTimeFormat.Unit.DAY, '0 days ago'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -0, RelativeDateTimeFormat.Unit.MONTH, '0 months ago'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -0, RelativeDateTimeFormat.Unit.QUARTER, '0 quarters ago'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -0, RelativeDateTimeFormat.Unit.YEAR, '0 years ago'),

  // Other locales, too!
];

var formatNumericSpanishData = [
  new DirectionData('es', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.DAY, 'hace 1 día'),
  new DirectionData('es', RelativeDateTimeFormat.Style.SHORT, -2, RelativeDateTimeFormat.Unit.DAY, 'hace 2 días'),

  new DirectionData('es', RelativeDateTimeFormat.Style.SHORT, 3, RelativeDateTimeFormat.Unit.DAY, 'dentro de 3 días'),
];


var formatNumericExtendedData = [
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.LONG, -2, RelativeDateTimeFormat.Unit.DAY, 'قبل 2 يوم'),
  new DirectionData('agq', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.DAY, '-1 d'),
  new DirectionData('agq', RelativeDateTimeFormat.Style.SHORT, 2, RelativeDateTimeFormat.Unit.DAY, '+2 d'),
  new DirectionData('ar_AE', RelativeDateTimeFormat.Style.LONG, -2, RelativeDateTimeFormat.Unit.DAY, 'قبل 2 يوم'),
  new DirectionData('as', RelativeDateTimeFormat.Style.SHORT, 1, RelativeDateTimeFormat.Unit.DAY, '1 দিনত'),
  new DirectionData('as', RelativeDateTimeFormat.Style.SHORT, 3, RelativeDateTimeFormat.Unit.DAY, '3 দিনত'),
];

// clang-format on

/** @return {string} Error description. */
DirectionData.prototype.getErrorDescription = function() {
  return 'Error for locale:' + this.locale + ' style: ' + this.style +
      ' quantity =' + this.direction + ' unit =' + this.unit + '\'';
};

testSuite({
  // Test with style, but no number formatting.
  testFormatStyle: function() {
    for (var i = 0; i < formatDirectionTestData.length; i++) {
      var data = formatDirectionTestData[i];
      var symbols = localeSymbols[data.locale];
      // TODO: also test with "always"
      var fmt = new RelativeDateTimeFormat(
          RelativeDateTimeFormat.NumericOption.AUTO, data.style,
          symbols.RelativeDateTimeFormatSymbols);

      var result = fmt.format(data.direction, data.unit);
      assertEquals(data.getErrorDescription(), data.expected, result);
    }
  },

  testFormatNumericStyle: function() {
    for (var i = 0; i < formatNumericTestData.length; i++) {
      var data = formatNumericTestData[i];
      var symbols = localeSymbols[data.locale];
      var fmtAlways = new RelativeDateTimeFormat(
          RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
          symbols.RelativeDateTimeFormatSymbols);

      var result = fmtAlways.format(data.direction, data.unit);
      assertEquals(data.getErrorDescription(), data.expected, result);

      var fmtUndefined = new RelativeDateTimeFormat(
          undefined, data.style, symbols.RelativeDateTimeFormatSymbols);
      assertEquals(
          data.getErrorDescription(), data.expected,
          fmtUndefined.format(data.direction, data.unit));
    }
  },

  testNumericMode: function() {
    var data = new DirectionData(
        'es', RelativeDateTimeFormat.Style.LONG, -1,
        RelativeDateTimeFormat.Unit.DAY, 'ayer');

    var symbols = localeSymbols[data.locale];
    var fmt = new RelativeDateTimeFormat(
        RelativeDateTimeFormat.NumericOption.AUTO, data.style,
        symbols.RelativeDateTimeFormatSymbols);

    var numMode = fmt.getNumericMode();
    assertEquals(
        data.getErrorDescription(), numMode,
        RelativeDateTimeFormat.NumericOption.AUTO);
    var result = fmt.format(data.direction, data.unit);
    assertEquals(data.getErrorDescription(), data.expected, result);

    // Try with forced numeric mode.
    var fmtNumericOnly = new RelativeDateTimeFormat(
        RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
        symbols.RelativeDateTimeFormatSymbols);
    numMode = fmtNumericOnly.getNumericMode();
    assertEquals(
        data.getErrorDescription(), numMode,
        RelativeDateTimeFormat.NumericOption.ALWAYS);
    var numResult = fmtNumericOnly.format(data.direction, data.unit);
    assertEquals(data.getErrorDescription(), 'hace 1 día', numResult);
  },

  testFormatNumericSpanishStyle: function() {
    for (var i = 0; i < formatNumericSpanishData.length; i++) {
      var data = formatNumericSpanishData[i];
      var symbols = localeSymbols[data.locale];
      var fmt = new RelativeDateTimeFormat(
          RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
          symbols.RelativeDateTimeFormatSymbols);

      var result = fmt.format(data.direction, data.unit);
      assertEquals(data.getErrorDescription(), data.expected, result);
    }
  },

  testFormatNumericExtendedStyle: function() {
    for (var i = 0; i < formatNumericExtendedData.length; i++) {
      var data = formatNumericExtendedData[i];
      var symbols = localeSymbols[data.locale];
      var fmt = new RelativeDateTimeFormat(
          RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
          symbols.RelativeDateTimeFormatSymbols);

      var result = fmt.format(data.direction, data.unit);
      assertEquals(data.getErrorDescription(), data.expected, result);
    }
  },

  // Test that retrieving style works.
  testGetStyle: function() {
    var fmt = new RelativeDateTimeFormat();
    var style = fmt.getFormatStyle();
    assertEquals(
        'bad style returned', RelativeDateTimeFormat.Style.LONG, style);

    fmt = new RelativeDateTimeFormat(
        undefined, RelativeDateTimeFormat.Style.LONG);
    style = fmt.getFormatStyle();
    assertEquals(
        'bad style returned', RelativeDateTimeFormat.Style.LONG, style);

    fmt = new RelativeDateTimeFormat(
        undefined, RelativeDateTimeFormat.Style.SHORT);
    style = fmt.getFormatStyle();
    assertEquals(
        'bad style returned', RelativeDateTimeFormat.Style.SHORT, style);

    fmt = new RelativeDateTimeFormat(
        undefined, RelativeDateTimeFormat.Style.NARROW);
    style = fmt.getFormatStyle();
    assertEquals(
        'bad style returned', RelativeDateTimeFormat.Style.NARROW, style);
  },

});
