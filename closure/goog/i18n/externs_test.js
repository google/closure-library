/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Testing inclusion of externs and handling in compiled code.
 * Sets options for ECMASCript Intl object classes, retrieving them
 * as resolved options. Compares the results to determine if any are mangled.
 * If so, javascript/externs/intl.js needs to be updated.
 */

/**
 * Namespaces for Closure classes with Intl implementations.
 */
goog.module('goog.i18n.externsTest');
goog.setTestOnly();


const testSuite = goog.require('goog.testing.testSuite');

/**
 * Check that all the resolved options are legal. If an option is not
 * defined in javascript/externs, compiling will give a garbled, unexpected
 * option in resolved options.
 *
 * Finding these unexpect values indicates that the externs file needs
 * to be updated.
 */

testSuite({
  setUpPage() {},

  getTestName: function() {
    return 'Intl Extern Options test';
  },

  testDateTimeOptions() {
    /* For each set of options in setup:
       Create an object.
       Get the resolved options.
       Check each to see if it's in the allowed set of output options.
    */
    if (Intl === undefined || Intl.DateTimeFormat === undefined) return;

    const setup = [
      [
        ['dateStyle', 'long'],
        ['timeStyle', 'short'],
      ],
      [
        ['dateStyle', 'short'],
        ['timeStyle', 'full'],
        ['timeZone', 'UTC'],
      ],
      [
        ['calendar', 'islamic'],
        ['numberingSystem', 'arab'],
        ['dateStyle', 'short'],
        ['timeStyle', 'full'],
        ['timeZone', 'UTC'],
      ],
    ];

    const outputOptions = [
      'locale',
      'dateStyle',
      'timeStyle',
      'calendar',
      'dayPeriod',
      'numberingSystem',
      'timeZone',
      'hour12',
      'hourCycle',
      'formatMatcher',
      'weekday',
      'era',
      'year',
      'month',
      'day',
      'hour',
      'minute',
      'second',
      'fractionalSecondDigits',
      'timeZoneName',
    ];
    const locale = 'pl';
    for (let i = 0; i < setup.length; i++) {
      const options = setup[i];
      const fmt = new Intl.DateTimeFormat(locale, options);
      const resolvedOptions = fmt.resolvedOptions();

      for (let option in resolvedOptions) {
        // Check that every option is expected.
        assertTrue('Checking for ' + option, outputOptions.includes(option));
      }
    }
  },

  testNumberFormatOptions() {
    /* For each set of options in setup:
       Create an object.
       Get the resolved options.
       Check each to see if it's in the allowed set of output options.
    */
    if (Intl === undefined || Intl.NumberFormat === undefined) return;

    const setup = [
      [
        ['dateStyle', 'long'],
        ['timeStyle', 'short'],
      ],
      [
        ['dateStyle', 'short'],
        ['timeStyle', 'full'],
        ['timeZone', 'UTC'],
      ],
      [
        ['calendar', 'islamic'],
        ['numberingSystem', 'arab'],
        ['dateStyle', 'short'],
        ['timeStyle', 'full'],
        ['timeZone', 'UTC'],
      ],
    ];

    const outputOptions = [
      'locale', 'numberingSystem', 'notation', 'compactDisplay', 'signDisplay',
      'useGrouping', 'currency', 'currencyDisplay', 'minimumIntegerDigits',
      'minimumFractionDigits', 'maximumFractionDigits',
      'minimumSignificantDigits', 'maximumSignificantDigits', 'style'
    ];
    const locale = 'pl';
    for (let i = 0; i < setup.length; i++) {
      const options = setup[i];
      const fmt = new Intl.NumberFormat(locale, options);
      const resolvedOptions = fmt.resolvedOptions();

      for (let option in resolvedOptions) {
        // Check that every option is expected.
        assertTrue('Checking for ' + option, outputOptions.includes(option));
      }
    }
  },

  testPluralOptions() {
    /* For each set of options in setup:
       Create an object.
       Get the resolved options.
       Check each to see if it's in the allowed set of output options.
    */
    if (Intl === undefined || Intl.PluralRules === undefined) return;
    const setup = [
      [
        ['type', 'cardinal'], ['minimumIntegerDigits', 1],
        ['minimumFractionDigits', 0], ['maximumFractionDigits', 1]
      ],
      [
        ['type', 'ordinal'], ['minimumIntegerDigits', 1],
        ['minimumFractionDigits', 0], ['maximumFractionDigits', 1]
      ],
      [['minimumSignificantDigits', 1], ['maximumSignificantDigits', 1]],
    ];

    const outputOptions = [
      'locale', 'pluralCategories', 'type', 'minimumIntegerDigits',
      'minimumFractionDigits', 'maximumFractionDigits',
      'minimumSignificantDigits', 'maximumSignificantDigits'
    ];

    const locale = 'fr';
    for (let i = 0; i < setup.length; i++) {
      const options = setup[i];
      const fmt = new Intl.PluralRules(locale, options);
      const resolvedOptions = fmt.resolvedOptions();

      for (let option in resolvedOptions) {
        // Check that every option is expected.
        assertTrue('Checking for ' + option, outputOptions.includes(option));
      }
    }
  },

  testRdtfOptions() {
    /* For each set of options in setup of RelativeTimeFormat
       Create an object.
       Get the resolved options.
       Check each to see if it's in the allowed set of output options.
    */
    if (Intl === undefined || Intl.RelativeTimeFormat === undefined) return;

    const setup = [
      [
        [],
      ],
      [
        ['numeric', 'auto'],
      ],
      [
        ['style', 'long'],
      ],
      [
        ['numeric', 'auto'],
        ['style', 'long'],
      ],
    ];

    const outputOptions = ['locale', 'numberingSystem', 'numeric', 'style'];

    const locale = 'hl';
    for (let i = 0; i < setup.length; i++) {
      const options = setup[i];
      const fmt = new Intl.RelativeTimeFormat(locale, options);
      const resolvedOptions = fmt.resolvedOptions();

      for (let option in resolvedOptions) {
        // Check that every option is expected.
        assertTrue('Checking for ' + option, outputOptions.includes(option));
      }
    }
  },

  testListFormat() {
    /* For each set of options in setup of ListFormat
       Create an object.
       Get the resolved options.
       Check each to see if it's in the allowed set of output options.
    */
    if (Intl === undefined || Intl.ListFormat === undefined) return;

    const setup = [
      [
        [],
      ],
      [
        ['type', 'disjunction'],
      ],
      [
        ['style', 'long'],
      ],
      [
        ['type', 'disjunction'],
        ['style', 'long'],
      ],
    ];

    const outputOptions = [
      'locale',
      'style',
      'type',
    ];

    const locale = 'ru';
    for (let i = 0; i < setup.length; i++) {
      const options = setup[i];
      const fmt = new Intl.ListFormat(locale, options);
      const resolvedOptions = fmt.resolvedOptions();

      for (let option in resolvedOptions) {
        // Check that every option is expected.
        assertTrue('Checking for ' + option, outputOptions.includes(option));
      }
    }
  },

  testBogusOption() {
    // Check that nothing is included in resolved options for
    // undefined options.

    if (Intl === undefined || Intl.DateTimeFormat === undefined) return;
    const options = [
      [
        ['unexpectedNumber', 1],
        ['unexpectedString', 'string'],
        ['calendar', 'islamic'],
        ['numberingSystem', 'arab'],
        ['dateStyle', 'short'],
        ['timeStyle', 'full'],
        ['timeZone', 'UTC'],
      ],
    ];

    const expectedOptions = [
      'locale',
      'dateStyle',
      'timeStyle',
      'calendar',
      'dayPeriod',
      'numberingSystem',
      'timeZone',
      'hour12',
      'hourCycle',
      'formatMatcher',
      'weekday',
      'era',
      'year',
      'month',
      'day',
      'hour',
      'minute',
      'second',
      'fractionalSecondDigits',
      'timeZoneName',
    ];
    const locale = 'ar-EG';
    const fmt = new Intl.DateTimeFormat(locale, options);
    const resolvedOptions = fmt.resolvedOptions();

    let resolvedCount = 0;
    for (let prop in resolvedOptions) resolvedCount++;
    let expectedCount = 0;
    const unexpectedResolved = [];
    for (let option in resolvedOptions) {
      // Check that every option is expected.
      if (expectedOptions.includes(option)) {
        expectedCount += 1;
      } else {
        unexpectedResolved.push(option);
      }
    }

    assertEquals(unexpectedResolved.length, 0);
    assertEquals(resolvedCount, expectedCount);
  }
});
