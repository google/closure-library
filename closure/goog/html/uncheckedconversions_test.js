// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for goog.html.uncheckedconversions.
 */

goog.provide('goog.html.uncheckedconversionsTest');

goog.require('goog.html.SafeHtml');
goog.require('goog.html.SafeUrl');
goog.require('goog.html.TrustedResourceUrl');
goog.require('goog.html.uncheckedconversions');
goog.require('goog.i18n.bidi.Dir');
goog.require('goog.string.Const');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.html.uncheckedconversionsTest');


function testSafeHtmlFromStringKnownToSatisfyTypeContract_ok() {
  var html = '<div>irrelevant</div>';
  var safeHtml = goog.html.uncheckedconversions.
      safeHtmlFromStringKnownToSatisfyTypeContract(
          goog.string.Const.from('Test'),
          html,
          goog.i18n.bidi.Dir.LTR);
  assertEquals(html, goog.html.SafeHtml.unwrap(safeHtml));
  assertEquals(goog.i18n.bidi.Dir.LTR, safeHtml.getDirection());
}


function testSafeHtmlFromStringKnownToSatisfyTypeContract_error() {
  assertThrows(function() {
    goog.html.uncheckedconversions.
        safeHtmlFromStringKnownToSatisfyTypeContract(
            goog.string.Const.from(''),
            'irrelevant');
  });
}


function testSafeUrlFromStringKnownToSatisfyTypeContract_ok() {
  var url = 'http://www.irrelevant.com';
  var safeUrl = goog.html.uncheckedconversions.
      safeUrlFromStringKnownToSatisfyTypeContract(
          goog.string.Const.from(
              'Safe because value is constant. Security review: b/7685625.'),
              url);
  assertEquals(url, goog.html.SafeUrl.unwrap(safeUrl));
}


function testSafeUrlFromStringKnownToSatisfyTypeContract_error() {
  assertThrows(function() {
    goog.html.uncheckedconversions.
        safeUrlFromStringKnownToSatisfyTypeContract(
            goog.string.Const.from(''),
            'http://irrelevant.com');
  });
}


function testTrustedResourceUrlFromStringKnownToSatisfyTypeContract_ok() {
  var url = 'http://www.irrelevant.com';
  var trustedResourceUrl = goog.html.uncheckedconversions.
      trustedResourceUrlFromStringKnownToSatisfyTypeContract(
          goog.string.Const.from(
              'Safe because value is constant. Security review: b/7685625.'),
              url);
  assertEquals(url, goog.html.TrustedResourceUrl.unwrap(trustedResourceUrl));
}


function testTrustedResourceFromStringKnownToSatisfyTypeContract_error() {
  assertThrows(function() {
    goog.html.uncheckedconversions.
        trustedResourceUrlFromStringKnownToSatisfyTypeContract(
            goog.string.Const.from(''),
            'http://irrelevant.com');
  });
}
