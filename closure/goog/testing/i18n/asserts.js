/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Assert functions that account for locale data changes.
 *
 * The locale data gets updated from CLDR (http://cldr.unicode.org/),
 * and CLDR gets an update about twice per year.
 * So the locale data are expected to change.
 * This can make unit tests quite fragile:
 *   assertEquals("Dec 31, 2013, 1:23pm", format);
 * Now imagine that the decision is made to add a dot after abbreviations,
 * and a comma between date and time.
 * The previous assert will fail, because the string is now
 *   "Dec. 31 2013, 1:23pm"
 *
 * One option is to not unit test the results of the formatters client side,
 * and just trust that CLDR and closure/i18n takes care of that.
 * The other option is to be a more flexible when testing.
 * This is the role of assertI18nEquals, to centralize all the small
 * differences between hard-coded values in unit tests and the current result.
 * It allows some decupling, so that the closure/i18n can be updated without
 * breaking all the clients using it.
 * For the example above, this will succeed:
 *   assertI18nEquals("Dec 31, 2013, 1:23pm", "Dec. 31, 2013 1:23pm");
 * It does this by white-listing, no "guessing" involved.
 *
 * But I would say that the best practice is the first option: trust the
 * library, stop unit-testing it.
 */

goog.provide('goog.testing.i18n.asserts');
goog.setTestOnly('goog.testing.i18n.asserts');

goog.require('goog.testing.jsunit');


/**
 * A map of known tests where locale data changed, but the old values are
 * still tested for by various clients.
 * @const {!Object<string, string>}
 * @private
 */
goog.testing.i18n.asserts.EXPECTED_VALUE_MAP_ = {
    // NOTE: Add mappings for each test file using addI18nMapping.
};

/**
 * A regular expression for identifying all horizontal white space
 * characters. Same as \h in a Java regex Pattern.
 * @const {!RegExp}
 * @private
 */
goog.testing.i18n.asserts.HORIZONTAL_WHITE_SPACE_REGEX =
    new RegExp('[ \t\xA0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]', 'g');

/**
 * Asserts that the two values are "almost equal" from i18n perspective.
 * All horizontal white space is stripped before comparison.
 * I18n-equivalent strings are set with addI18nMapping.
 *
 * @param {string} a The expected value or comment.
 * @param {string} b The actual or expected.
 * @param {string=} opt_c Null or the actual value.
 */
goog.testing.i18n.asserts.assertI18nEquals = function(a, b, opt_c) {
  'use strict';
  let expected;
  let actual;
  let msg;  // The comment to be added, if any
  // If there are 3 arguments, the first is a comment.
  if (opt_c) {
    msg = a;
    expected = b;
    actual = opt_c;
  } else {
    expected = a;
    actual = b;
  }

  if (expected === actual) {
    return;
  }

  // Compare with all horizontal white space characters removed, making
  // this less brittle.
  let wsFixedActual = actual.replace(
      goog.testing.i18n.asserts.HORIZONTAL_WHITE_SPACE_REGEX, '');

  // Now, check if the expected string and the actual result differ only
  // in whitespace by stripping white space characters from each.
  if (expected &&
      (expected.replace(
           goog.testing.i18n.asserts.HORIZONTAL_WHITE_SPACE_REGEX, '') ===
       wsFixedActual)) {
    return;
  }

  // Also handle an alternate string, ignoring whitespace.
  // Note that expected can be null!
  const newExpected =
      goog.testing.i18n.asserts.EXPECTED_VALUE_MAP_[expected] || expected;
  const wsFixedExpected = (!newExpected) ?
      newExpected :
      newExpected.replace(
          goog.testing.i18n.asserts.HORIZONTAL_WHITE_SPACE_REGEX, '');

  if (msg) {
    assertEquals(msg, wsFixedExpected, wsFixedActual);
  } else {
    assertEquals(wsFixedExpected, wsFixedActual);
  }
};


/**
 * Asserts that needle, or a string i18n-equivalent to needle, is a substring of
 * haystack. I18n-equivalent strings are set with addI18nMapping.
 *
 * @param {string} needle The substring to search for.
 * @param {string} haystack The string to search within.
 */
goog.testing.i18n.asserts.assertI18nContains = function(needle, haystack) {
  'use strict';
  if (needle === haystack) {
    return;
  }

  const newNeedle = goog.testing.i18n.asserts.EXPECTED_VALUE_MAP_[needle];
  if (haystack.indexOf(newNeedle) !== -1) {
    return;
  }

  assertContains(needle, haystack);
};


/**
 * Adds two strings as being i18n-equivalent. Call this
 * method in your unit test file to add mappings scoped to the file.
 *
 * @param {string} expected The expected string in assertI18nEquals.
 * @param {string} equivalent A string which is i18n-equal.
 */
goog.testing.i18n.asserts.addI18nMapping = function(expected, equivalent) {
  'use strict';
  if (goog.testing.i18n.asserts.EXPECTED_VALUE_MAP_.hasOwnProperty(expected)) {
    throw new RangeError('Mapping for string already exists');
  }
  goog.testing.i18n.asserts.EXPECTED_VALUE_MAP_[expected] = equivalent;
};
