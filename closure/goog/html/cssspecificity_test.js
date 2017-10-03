// Copyright 2016 The Closure Library Authors. All Rights Reserved.
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

/** @fileoverview Unit tests for the CSS specificity calculator. */

goog.module('goog.html.CssSpecificityTest');
goog.setTestOnly();

var CssSpecificity = goog.require('goog.html.CssSpecificity');
var testSuite = goog.require('goog.testing.testSuite');
var userAgent = goog.require('goog.userAgent');
var userAgentProduct = goog.require('goog.userAgent.product');


/**
 * @param {!Array<number>} expected
 * @param {string} selector
 */
function assertSpecificityEquals(expected, selector) {
  var specificity = CssSpecificity.getSpecificity(selector);
  if (userAgentProduct.IE && !userAgent.isVersionOrHigher(9)) {
    assertArrayEquals([0, 0, 0, 0], specificity);
  } else {
    assertArrayEquals(expected, specificity);
  }
}

testSuite({
  testGetSpecificity: function() {
    // @see http://css-tricks.com/specifics-on-css-specificity/
    assertSpecificityEquals([0, 1, 1, 3], 'ul#nav li.active a');
    assertSpecificityEquals([0, 0, 2, 3], 'body.ie7 .col_3 h2 ~ h2');
    assertSpecificityEquals([0, 1, 0, 2], '#footer *:not(nav) li');
    assertSpecificityEquals([0, 0, 0, 7], 'ul > li ul li ol li:first-letter');

    // @see http://reference.sitepoint.com/css/specificity
    assertSpecificityEquals([0, 2, 1, 3], 'body#home div#warning p.message');
    assertSpecificityEquals([0, 2, 1, 3], '* body#home>div#warning p.message');
    assertSpecificityEquals([0, 2, 1, 1], '#home #warning p.message');
    assertSpecificityEquals([0, 1, 1, 1], '#warning p.message');
    assertSpecificityEquals([0, 1, 0, 1], '#warning p');
    assertSpecificityEquals([0, 0, 1, 1], 'p.message');
    assertSpecificityEquals([0, 0, 0, 1], 'p');

    // Test pseudo-element with uppercase letters.
    assertSpecificityEquals([0, 0, 0, 2], 'li:bEfoRE');

    // Pseudo-class tests.
    assertSpecificityEquals([0, 0, 1, 2], 'li:first-child+p');
    assertSpecificityEquals([0, 0, 1, 2], 'li:nth-child(even)+p');
    assertSpecificityEquals([0, 0, 1, 2], 'li:nth-child(2n+1)+p');
    assertSpecificityEquals([0, 0, 1, 2], 'li:nth-child( 2n + 1 )+p');
    assertSpecificityEquals([0, 0, 1, 2], 'li:nth-child(2n-1)+p');
    assertSpecificityEquals([0, 0, 1, 2], 'li:nth-child(2n-1) p');
    assertSpecificityEquals([0, 0, 1, 0], ':lang(nl-be)');
  }
});
