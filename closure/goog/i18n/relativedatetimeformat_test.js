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

var LocaleFeature = goog.require('goog.i18n.LocaleFeature');

const NumberFormatSymbols_ar_EG = goog.require('goog.i18n.NumberFormatSymbols_ar_EG');
const NumberFormatSymbols_en = goog.require('goog.i18n.NumberFormatSymbols_en');
const NumberFormatSymbols_es = goog.require('goog.i18n.NumberFormatSymbols_es');
const NumberFormatSymbols_fa = goog.require('goog.i18n.NumberFormatSymbols_fa');

const RelativeDateTimeFormat = goog.require('goog.i18n.RelativeDateTimeFormat');

const relativeDateTimeSymbols = goog.require('goog.i18n.relativeDateTimeSymbols');
const relativeDateTimeSymbolsExt = goog.require('goog.i18n.relativeDateTimeSymbolsExt');

var testSuite = goog.require('goog.testing.testSuite');

var Plurals_en = goog.i18n.pluralRules.enSelect_;
var Plurals_he = goog.i18n.pluralRules.heSelect_;
var Plurals_ar = goog.i18n.pluralRules.arSelect_;


/**
 * @param {string} locale
 * @param {number} style
 * @param {number} direction
 * @param {number} unit
 * @param {string} expected
 * @param {string|undefined} pluralrules
 * @constructor
 */
const DirectionData = function(
    locale, style, direction, unit, expected, pluralrules) {
  this.locale = locale;
  this.style = style;
  this.direction = direction;
  this.unit = unit;
  this.expected = expected;
  this.pluralrules = pluralrules;
};


/** @const {!Object<string, !Object>} */
const localeSymbols = {
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
  'ar': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbols.RelativeDateTimeSymbols_ar,
  },
  'ar_EG': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbols.RelativeDateTimeSymbols_ar_EG,
  },
  'ar_LY': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbolsExt.RelativeDateTimeSymbols_ar_LY,
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
  'fa': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbols.RelativeDateTimeSymbols_fa,
  },
  'he': {
    RelativeDateTimeFormatSymbols:
        relativeDateTimeSymbols.RelativeDateTimeSymbols_he,
  },
};

// clang-format off
const formatDirectionTestData = [
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

  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, 1, RelativeDateTimeFormat.Unit.WEEK, 'الأسبوع القادم', Plurals_ar),

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

// TODO(icu/12171): re-examine when ICU4J and CLDR data are updated.
const forcedNumericTestData = [
  // Special cases for MINUTE and HOUR, and SECOND != 0, forced numeric mode.
    new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0.0, RelativeDateTimeFormat.Unit.SECOND, 'now'),
  new DirectionData(
      'en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.MINUTE, 'this minute'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.SECOND, 'now'),
  new DirectionData(
      'en', RelativeDateTimeFormat.Style.LONG, 1, RelativeDateTimeFormat.Unit.MINUTE, 'in 1 minute'),
  new DirectionData(
      'en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.HOUR, 'this hour'),
];

const formatNumericTestData = [
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 7, RelativeDateTimeFormat.Unit.DAY, 'in 7 days'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -2, RelativeDateTimeFormat.Unit.DAY, '2 days ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -1.5, RelativeDateTimeFormat.Unit.DAY, '1.5 days ago'),
  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.DAY, '1 day ago'),

  new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.DAY, 'in 0 days'),
  new DirectionData('en', RelativeDateTimeFormat.Style.SHORT, 2, RelativeDateTimeFormat.Unit.HOUR, 'in 2 hr.'),

  new DirectionData('en', RelativeDateTimeFormat.Style.SHORT, 0, RelativeDateTimeFormat.Unit.HOUR, 'in 0 hr.'),  // Not "this hour"

    new DirectionData('en', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.SECOND, 'in 0 seconds'),

    new DirectionData('en', RelativeDateTimeFormat.Style.LONG, -0, RelativeDateTimeFormat.Unit.SECOND, '0 seconds ago'),

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
];

const formatFarsiData = [
  // Other locales, too!
  new DirectionData('fa', RelativeDateTimeFormat.Style.SHORT, 3, RelativeDateTimeFormat.Unit.DAY, '۳ روز بعد'),
  new DirectionData('fa', RelativeDateTimeFormat.Style.SHORT, -3, RelativeDateTimeFormat.Unit.MONTH, '۳ ماه پیش'),
  new DirectionData('fa', RelativeDateTimeFormat.Style.SHORT, -17, RelativeDateTimeFormat.Unit.HOUR, '۱۷ ساعت پیش'),
  new DirectionData('fa', RelativeDateTimeFormat.Style.SHORT, 9, RelativeDateTimeFormat.Unit.SECOND, '۹ ثانیه بعد'),
  new DirectionData('fa', RelativeDateTimeFormat.Style.SHORT, -11, RelativeDateTimeFormat.Unit.WEEK, '۱۱ هفته پیش'),
];

const formatArEgData = [
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.LONG, 0, RelativeDateTimeFormat.Unit.DAY, 'خلال ٠ يوم', Plurals_ar),
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, 0, RelativeDateTimeFormat.Unit.DAY, 'خلال ٠ يوم', Plurals_ar),
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, 1, RelativeDateTimeFormat.Unit.MONTH, 'خلال شهر واحد', Plurals_ar),
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, -1, RelativeDateTimeFormat.Unit.DAY, 'قبل يوم واحد', Plurals_ar),
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, 2, RelativeDateTimeFormat.Unit.DAY, 'خلال يومين', Plurals_ar),
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, 3, RelativeDateTimeFormat.Unit.HOUR, 'خلال ٣ ساعات', Plurals_ar),
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, 28, RelativeDateTimeFormat.Unit.SECOND, 'خلال ٢٨ ثانية', Plurals_ar),
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, 101, RelativeDateTimeFormat.Unit.WEEK, 'خلال ١٠١ أسبوع', Plurals_ar),
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.SHORT, 1.5, RelativeDateTimeFormat.Unit.YEAR, 'خلال ١٫٥ سنة', Plurals_ar),
];

const formatNumericSpanishData = [
  new DirectionData('es', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.DAY, 'hace 1 día'),
  new DirectionData('es', RelativeDateTimeFormat.Style.SHORT, -2, RelativeDateTimeFormat.Unit.DAY, 'hace 2 días'),

  new DirectionData('es', RelativeDateTimeFormat.Style.SHORT, 3, RelativeDateTimeFormat.Unit.DAY, 'dentro de 3 días'),
];


const formatNumericExtendedData = [
  new DirectionData('ar_AE', RelativeDateTimeFormat.Style.LONG, -2,
                    RelativeDateTimeFormat.Unit.DAY, 'قبل يومين', Plurals_ar),
  new DirectionData('ar_EG', RelativeDateTimeFormat.Style.LONG, -2,
                    RelativeDateTimeFormat.Unit.DAY, 'قبل يومين', Plurals_ar),
  new DirectionData('agq', RelativeDateTimeFormat.Style.LONG, -1, RelativeDateTimeFormat.Unit.DAY, '-1 d'),
  new DirectionData('agq', RelativeDateTimeFormat.Style.SHORT, 2, RelativeDateTimeFormat.Unit.DAY, '+2 d'),
  new DirectionData('as', RelativeDateTimeFormat.Style.SHORT, 1, RelativeDateTimeFormat.Unit.DAY, '1 দিনত'),
  new DirectionData('as', RelativeDateTimeFormat.Style.SHORT, 3, RelativeDateTimeFormat.Unit.DAY, '3 দিনত'),
];

const formatNumericRtlData = [
  new DirectionData('he', RelativeDateTimeFormat.Style.LONG, -2,
                    RelativeDateTimeFormat.Unit.DAY, 'לפני יומיים', Plurals_he),
  // Should this be 'לפני יומיים'?
  new DirectionData('he', RelativeDateTimeFormat.Style.LONG, 2,
                    RelativeDateTimeFormat.Unit.DAY, 'בעוד יומיים', Plurals_he),
  // Should this be 'בעוד יומיים'?
  new DirectionData('he', RelativeDateTimeFormat.Style.LONG, -3,
                    RelativeDateTimeFormat.Unit.DAY, 'לפני 3 ימים', Plurals_he),
  new DirectionData('ar', RelativeDateTimeFormat.Style.LONG, -2,
                    RelativeDateTimeFormat.Unit.DAY, 'قبل يومين', Plurals_ar),
  new DirectionData('ar', RelativeDateTimeFormat.Style.LONG, 2,
                    RelativeDateTimeFormat.Unit.DAY, 'خلال يومين', Plurals_ar),
];

var formatAutoRtlData = [
  new DirectionData('he', RelativeDateTimeFormat.Style.LONG, -2,
                    RelativeDateTimeFormat.Unit.DAY, 'שלשום', Plurals_he),
  new DirectionData('he', RelativeDateTimeFormat.Style.LONG, -3,
                    RelativeDateTimeFormat.Unit.DAY, 'לפני 3 ימים', Plurals_he),
  new DirectionData('ar', RelativeDateTimeFormat.Style.LONG, -2,
                    RelativeDateTimeFormat.Unit.DAY, 'أول أمس', Plurals_ar),
];

// clang-format on

/** @return {string} Error description. */
DirectionData.prototype.getErrorDescription = function() {
  return 'Error for locale:' + this.locale + ' style: ' + this.style +
      ' quantity =' + this.direction + ' unit =' + this.unit +
      ' pluralrules = ' + this.pluralrules + '\'';
};

// Tests both JavaScript and ECMAScript on supporting browsers.
// Sets up goog.USE_ECMASCRIPT_I18N_RDTF flag in each function.
var testECMAScriptOptions = [false];
var rdtf = new RelativeDateTimeFormat();
if (rdtf.hasNativeRdtf()) {
  // Add test if the browser environment supports ECMAScript implementation.
  testECMAScriptOptions.push(true);
}

testSuite({
  getTestName: function() {
    return 'RelativeDateTimeFormat Tests';
  },

  setUp: function() {
    goog.LOCALE = 'en';
    goog.i18n.NumberFormatSymbols = NumberFormatSymbols_en;
    goog.i18n.pluralRules.select = Plurals_en;
    LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = false;
  },

  tearDown: function() {
    goog.i18n.NumberFormatSymbols = NumberFormatSymbols_en;
    goog.LOCALE = 'en';
  },

  // Test with style, but no number formatting.
  testFormatStyle: function() {
    // Try with both JavaScript and ECMAScript implementations, if present.
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      for (let i = 0; i < formatDirectionTestData.length; i++) {
        const data = formatDirectionTestData[i];
        const symbols = localeSymbols[data.locale];
        goog.LOCALE = data.locale;

        const fmt = new RelativeDateTimeFormat(
            RelativeDateTimeFormat.NumericOption.AUTO, data.style,
            symbols.RelativeDateTimeFormatSymbols);

        const result = fmt.format(data.direction, data.unit);
        assertEquals(data.getErrorDescription(), data.expected, result);
      }
    }
  },

  testFormatNumericStyle: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      goog.i18n.NumberFormatSymbols = NumberFormatSymbols_en;
      for (let i = 0; i < formatNumericTestData.length; i++) {
        const data = formatNumericTestData[i];
        const symbols = localeSymbols[data.locale];
        goog.LOCALE = data.locale;
        const fmtAlways = new RelativeDateTimeFormat(
            RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
            symbols.RelativeDateTimeFormatSymbols);

        const result = fmtAlways.format(data.direction, data.unit);
        assertEquals(data.getErrorDescription(), data.expected, result);

        const fmtUndefined = new RelativeDateTimeFormat(
            undefined, data.style, symbols.RelativeDateTimeFormatSymbols);
        assertEquals(
            data.getErrorDescription(), data.expected,
            fmtUndefined.format(data.direction, data.unit));
      }
    }
  },

  testNumericMode: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      goog.i18n.NumberFormatSymbols = NumberFormatSymbols_es;
      goog.LOCALE = 'es';
      const data = new DirectionData(
          'es', RelativeDateTimeFormat.Style.LONG, -1,
          RelativeDateTimeFormat.Unit.DAY, 'ayer');

      const symbols = localeSymbols[data.locale];
      const fmt = new RelativeDateTimeFormat(
          RelativeDateTimeFormat.NumericOption.AUTO, data.style,
          symbols.RelativeDateTimeFormatSymbols);

      let numMode = fmt.getNumericMode();
      assertEquals(
          data.getErrorDescription(), numMode,
          RelativeDateTimeFormat.NumericOption.AUTO);
      const result = fmt.format(data.direction, data.unit);
      assertEquals(data.getErrorDescription(), data.expected, result);

      // Try with forced numeric mode.
      const fmtNumericOnly = new RelativeDateTimeFormat(
          RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
          symbols.RelativeDateTimeFormatSymbols);
      numMode = fmtNumericOnly.getNumericMode();
      assertEquals(
          data.getErrorDescription(), numMode,
          RelativeDateTimeFormat.NumericOption.ALWAYS);
      const numResult = fmtNumericOnly.format(data.direction, data.unit);
      assertEquals(data.getErrorDescription(), 'hace 1 día', numResult);
    }
  },

  testFormatNumericSpanishStyle: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      goog.i18n.NumberFormatSymbols = NumberFormatSymbols_es;
      goog.LOCALE = 'es';
      for (let i = 0; i < formatNumericSpanishData.length; i++) {
        const data = formatNumericSpanishData[i];
        const symbols = localeSymbols[data.locale];
        const fmt = new RelativeDateTimeFormat(
            RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
            symbols.RelativeDateTimeFormatSymbols);

        const result = fmt.format(data.direction, data.unit);
        assertEquals(data.getErrorDescription(), data.expected, result);
      }
    }
  },

  testFormatNumericFarsiStyle: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      for (let i = 0; i < formatFarsiData.length; i++) {
        const data = formatFarsiData[i];
        const symbols = localeSymbols[data.locale];
        goog.i18n.NumberFormatSymbols = NumberFormatSymbols_fa;

        goog.LOCALE = data.locale;
        const fmt = new RelativeDateTimeFormat(
            RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
            symbols.RelativeDateTimeFormatSymbols);

        const result = fmt.format(data.direction, data.unit);
        assertEquals(data.getErrorDescription(), data.expected, result);
      }
    }
  },

  testFormatNumericArEgStyle: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      for (let i = 0; i < formatArEgData.length; i++) {
        const data = formatArEgData[i];
        const symbols = localeSymbols[data.locale];
        goog.i18n.NumberFormatSymbols = NumberFormatSymbols_ar_EG;

        goog.LOCALE = data.locale;
        goog.i18n.pluralRules.select = data.pluralrules;
        const fmt = new RelativeDateTimeFormat(
            RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
            symbols.RelativeDateTimeFormatSymbols);

        const result = fmt.format(data.direction, data.unit);
        assertEquals(data.getErrorDescription(), data.expected, result);
      }
    }
  },

  testFormatNumericExtendedStyle: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      for (let i = 0; i < formatNumericExtendedData.length; i++) {
        const data = formatNumericExtendedData[i];
        const symbols = localeSymbols[data.locale];
        goog.LOCALE = data.locale;
        const fmt = new RelativeDateTimeFormat(
            RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
            symbols.RelativeDateTimeFormatSymbols);

        if (data.pluralrules) {
          goog.i18n.pluralRules.select = data.pluralrules;
        } else {
          goog.i18n.pluralRules.select = Plurals_en;
        }

        /* Only test ECMAScript mode if locale data is expected */
        if (!fmt.isNativeMode()) {
          const result = fmt.format(data.direction, data.unit);
          assertEquals(data.getErrorDescription(), data.expected, result);
        }
      }
    }
  },

  testForcedNumeric: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      goog.i18n.NumberFormatSymbols = NumberFormatSymbols_en;
      for (let i = 0; i < forcedNumericTestData.length; i++) {
        const data = forcedNumericTestData[i];
        const symbols = localeSymbols[data.locale];
        goog.LOCALE = data.locale;
        const fmt = new RelativeDateTimeFormat(
            RelativeDateTimeFormat.NumericOption.AUTO, data.style,
            symbols.RelativeDateTimeFormatSymbols);

        const result = fmt.format(data.direction, data.unit);
        assertEquals(data.getErrorDescription(), data.expected, result);
      }
    }
  },

  testFormatNumericRtl: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      goog.i18n.NumberFormatSymbols = NumberFormatSymbols_en;
      for (var i = 0; i < formatNumericRtlData.length; i++) {
        var data = formatNumericRtlData[i];
        var symbols = localeSymbols[data.locale];
        goog.LOCALE = data.locale;

        // Explicitly set plural rules to get correct option.
        goog.i18n.pluralRules.select = data.pluralrules;

        let fmt = new RelativeDateTimeFormat(
            RelativeDateTimeFormat.NumericOption.ALWAYS, data.style,
            symbols.RelativeDateTimeFormatSymbols);

        var result = fmt.format(data.direction, data.unit);
        assertEquals(data.getErrorDescription(), data.expected, result);
      }
    }
  },

  testFormatAutoRtl: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      for (let i = 0; i < formatAutoRtlData.length; i++) {
        const data = formatAutoRtlData[i];
        const symbols = localeSymbols[data.locale];
        goog.LOCALE = data.locale;
        goog.i18n.pluralRules.select = data.pluralrules;
        const fmt = new RelativeDateTimeFormat(
            RelativeDateTimeFormat.NumericOption.AUTO, data.style,
            symbols.RelativeDateTimeFormatSymbols);

        const result = fmt.format(data.direction, data.unit);
        assertEquals(data.getErrorDescription(), data.expected, result);
      }
    }
  },

  // Test that retrieving style works.
  testGetStyle: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      let fmt = new RelativeDateTimeFormat();
      let style = fmt.getFormatStyle();
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
    }
  },

  // Test that retrieving relative unit is returned when defined only.
  testGetRelativeStringDefined: function() {
    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      let fmt = new RelativeDateTimeFormat();

      if (!fmt.isNativeMode()) {
        // These are only applicable for JavaScript implementation.
        var result =
            fmt.isOffsetDefinedForUnit(RelativeDateTimeFormat.Unit.DAY, -7);
        assertUndefined(result);  // Expect undefined for Day -7

        result =
            fmt.isOffsetDefinedForUnit(RelativeDateTimeFormat.Unit.DAY, -2);
        assertUndefined(result);  // Expect undefined for Day -2 English

        result =
            fmt.isOffsetDefinedForUnit(RelativeDateTimeFormat.Unit.YEAR, -1);
        assertEquals('last year', result);

        result = fmt.isOffsetDefinedForUnit(RelativeDateTimeFormat.Unit.DAY, 0);
        assertEquals('today', result);

        result =
            fmt.isOffsetDefinedForUnit(RelativeDateTimeFormat.Unit.QUARTER, 1);
        assertEquals('next quarter', result);

        result = fmt.isOffsetDefinedForUnit(RelativeDateTimeFormat.Unit.DAY, 2);
        assertUndefined(result);  // No special term for in 2 days in English
      }
    }
  },

  testEnShort: function() {
    goog.LOCALE = 'en';

    for (const val of testECMAScriptOptions) {
      LocaleFeature.USE_ECMASCRIPT_I18N_RDTF = val;

      let fmt = new RelativeDateTimeFormat(
          RelativeDateTimeFormat.NumericOption.ALWAYS,
          RelativeDateTimeFormat.Style.SHORT);
      var result = fmt.format(2, RelativeDateTimeFormat.Unit.HOUR);
      assertEquals('in 2 hr.', result);

      result = fmt.format(1, RelativeDateTimeFormat.Unit.QUARTER);
      assertEquals('in 1 qtr.', result);

      var fmtAuto = new RelativeDateTimeFormat(
          RelativeDateTimeFormat.NumericOption.AUTO,
          RelativeDateTimeFormat.Style.SHORT);
      var result = fmtAuto.format(2, RelativeDateTimeFormat.Unit.HOUR);
      assertEquals('in 2 hr.', result);

      result = fmtAuto.format(1, RelativeDateTimeFormat.Unit.QUARTER);
      assertEquals('next qtr.', result);
    }
  },
});
