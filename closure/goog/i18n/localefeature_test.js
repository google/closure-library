// Copyright 2019 The Closure Library Authors. All Rights Reserved.
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
