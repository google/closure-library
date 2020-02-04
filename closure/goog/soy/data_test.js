/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.soy.dataTest');
goog.setTestOnly();

const SafeHtml = goog.require('goog.html.SafeHtml');
const SafeStyleSheet = goog.require('goog.html.SafeStyleSheet');
const SafeUrl = goog.require('goog.html.SafeUrl');
const TrustedResourceUrl = goog.require('goog.html.TrustedResourceUrl');
/** @suppress {extraRequire} */
const testHelper = goog.require('goog.soy.testHelper');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testToSafeHtml() {
    let html;

    html = example.sanitizedHtmlTemplate().toSafeHtml();
    assertEquals('Hello <b>World</b>', SafeHtml.unwrap(html));
  },

  testToSafeUrl() {
    let url;

    url = example.sanitizedSmsUrlTemplate().toSafeUrl();
    assertEquals('sms:123456789', SafeUrl.unwrap(url));

    url = example.sanitizedHttpUrlTemplate().toSafeUrl();
    assertEquals('https://google.com/foo?n=917', SafeUrl.unwrap(url));
  },

  testToSafeStyleSheet() {
    const url = example.sanitizedCssTemplate().toSafeStyleSheet();
    assertEquals('html{display:none}', SafeStyleSheet.unwrap(url));
  },

  testToTrustedResourceUrl() {
    let url;

    url =
        example.sanitizedTrustedResourceUriTemplate({}).toTrustedResourceUrl();
    assertEquals('https://google.com/a.js', TrustedResourceUrl.unwrap(url));
  },
});
