/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.i18n.LocaleFeatureTest');
const LocaleFeature = goog.require('goog.i18n.LocaleFeature');


goog.setTestOnly('goog.i18n.localeFeatureTest');

const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testUseEcmaScript: function() {
    assertTrue((typeof (LocaleFeature.USE_ECMASCRIPT_I18N) !== 'undefined'));
  },

  testRdtfFlag: function() {
    assertTrue(
        (typeof (LocaleFeature.USE_ECMASCRIPT_I18N_RDTF) !== 'undefined'));
  },
});
