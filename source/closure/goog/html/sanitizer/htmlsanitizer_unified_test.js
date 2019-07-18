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
