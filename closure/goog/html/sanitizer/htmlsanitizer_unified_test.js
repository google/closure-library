/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Test for HTML sanitizer with test vectors. */

goog.module('goog.html.HtmlSanitizerUnifiedTest');
goog.setTestOnly();

const SafeHtml = goog.require('goog.html.SafeHtml');
const SanitizerBuilder = goog.require('goog.html.sanitizer.HtmlSanitizer.Builder');
const testSuite = goog.require('goog.testing.testSuite');
const testVectors = goog.require('goog.html.htmlTestVectors');
const userAgent = goog.require('goog.userAgent');

const isSupported = !userAgent.IE || userAgent.isVersionOrHigher(10);
const sanitizer = new SanitizerBuilder().build();

const suite = {};
for (const v of testVectors.HTML_TEST_VECTORS) {
  suite[`testVector[${v.name}]`] = function() {
    const sanitized = SafeHtml.unwrap(sanitizer.sanitize(v.input));
    if (isSupported) {
      assertContains(sanitized, v.acceptable);
    } else {
      assertEquals('', sanitized);
    }
  };
}

testSuite(suite);
