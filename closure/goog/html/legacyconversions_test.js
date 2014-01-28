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
 * @fileoverview Unit tests for goog.html.legacyconversions.
 */

goog.provide('goog.html.legacyconversionsTest');

goog.require('goog.html.SafeHtml');
goog.require('goog.html.SafeUrl');
goog.require('goog.html.TrustedResourceUrl');
goog.require('goog.html.legacyconversions');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.html.legacyconversionsTest');


/** @type {!goog.testing.PropertyReplacer} */
var stubs = new goog.testing.PropertyReplacer();


function setUp() {
  // Reset goog.html.legacyconveresions global defines for each test case.
  stubs.set(goog.html.legacyconversions, 'ALLOW_LEGACY_CONVERSIONS', true);
  stubs.set(
      goog.html.legacyconversions, 'ALLOW_LEGACY_CONVERSION_OVERRIDES', false);
}


function testSafeHtmlFromString_allowedIfNotGloballyDisabled() {
  var helloWorld = 'Hello <em>World</em>';
  var safeHtml = goog.html.legacyconversions.safeHtmlFromString(helloWorld);
  assertEquals(helloWorld, goog.html.SafeHtml.unwrap(safeHtml));
  assertNull(safeHtml.getDirection());

  // Also allowed if module override is set.
  safeHtml = goog.html.legacyconversions.safeHtmlFromString(helloWorld, true);
  assertEquals(helloWorld, goog.html.SafeHtml.unwrap(safeHtml));

  // As well if global override flag is set.
  stubs.set(
      goog.html.legacyconversions, 'ALLOW_LEGACY_CONVERSION_OVERRIDES', true);
  safeHtml = goog.html.legacyconversions.safeHtmlFromString(helloWorld, false);
  assertEquals(helloWorld, goog.html.SafeHtml.unwrap(safeHtml));

  // Or both.
  safeHtml = goog.html.legacyconversions.safeHtmlFromString(helloWorld, true);
  assertEquals(helloWorld, goog.html.SafeHtml.unwrap(safeHtml));
}


function testSafeHtmlFromString_guardedByGlobalFlag() {
  stubs.set(goog.html.legacyconversions, 'ALLOW_LEGACY_CONVERSIONS', false);
  assertEquals(
      'Error: Legacy conversion from string to goog.html types is disabled',
      assertThrows(function() {
        goog.html.legacyconversions.safeHtmlFromString(
            'Possibly untrusted <html>');
      }).message);

  // Conversion is disallowed if module override is set, but
  // ALLOW_LEGACY_CONVERSION_OVERRIDES is not.
  assertEquals(
      'Error: Legacy conversion from string to goog.html types is disabled',
      assertThrows(function() {
        goog.html.legacyconversions.safeHtmlFromString(
            'Possibly untrusted <html>', true);
      }).message);
}


function testSafeHtmlFromString_allowedByOverride() {
  var helloWorld = 'Hello <em>World</em>';
  stubs.set(goog.html.legacyconversions, 'ALLOW_LEGACY_CONVERSIONS', false);
  stubs.set(
      goog.html.legacyconversions, 'ALLOW_LEGACY_CONVERSION_OVERRIDES', true);

  var safeHtml = goog.html.legacyconversions.safeHtmlFromString(
      helloWorld, true);
  assertEquals(helloWorld, goog.html.SafeHtml.unwrap(safeHtml));
}


function testSafeUrlFromString() {
  var url = 'https://www.google.com';
  var safeUrl = goog.html.legacyconversions.safeUrlFromString(url);
  assertEquals(url, goog.html.SafeUrl.unwrap(safeUrl));
}


function testTrustedResourceUrlFromString() {
  var url = 'https://www.google.com/script.js';
  var trustedResourceUrl =
      goog.html.legacyconversions.trustedResourceUrlFromString(url);
  assertEquals(url, goog.html.TrustedResourceUrl.unwrap(trustedResourceUrl));
}
