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
 * @fileoverview Unit tests for goog.html.SafeHtml and its builders.
 */

goog.provide('goog.html.safeHtmlTest');

goog.require('goog.html.SafeHtml');
goog.require('goog.html.SafeUrl');
goog.require('goog.html.testing');
goog.require('goog.html.uncheckedconversions');
goog.require('goog.i18n.bidi.Dir');
goog.require('goog.string.Const');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.html.safeHtmlTest');



function testSafeHtml() {
  // TODO(user): Consider using SafeHtmlBuilder instead of newSafeHtmlForTest,
  // when available.
  var safeHtml = goog.html.testing.newSafeHtmlForTest('Hello <em>World</em>');
  assertEquals('Hello <em>World</em>', goog.html.SafeHtml.unwrap(safeHtml));
  assertEquals('Hello <em>World</em>', safeHtml.getTypedStringValue());
  assertEquals('SafeHtml{Hello <em>World</em>}', String(safeHtml));
  assertNull(safeHtml.getDirection());

  safeHtml = goog.html.testing.newSafeHtmlForTest(
      'World <em>Hello</em>', goog.i18n.bidi.Dir.RTL);
  assertEquals('World <em>Hello</em>', goog.html.SafeHtml.unwrap(safeHtml));
  assertEquals('World <em>Hello</em>', safeHtml.getTypedStringValue());
  assertEquals('SafeHtml{World <em>Hello</em>}', String(safeHtml));
  assertEquals(goog.i18n.bidi.Dir.RTL, safeHtml.getDirection());

  // Interface markers are present.
  assertTrue(safeHtml.implementsGoogStringTypedString);
  assertTrue(safeHtml.implementsGoogI18nBidiDirectionalString);

  // Pre-defined constant.
  assertEquals('', goog.html.SafeHtml.unwrap(goog.html.SafeHtml.EMPTY));
}


/** @suppress {checkTypes} */
function testUnwrap() {
  var evil = {};
  evil.safeHtmlValueWithSecurityContract__googHtmlSecurityPrivate_ =
      '<script>evil()</script';
  evil.SAFE_HTML_TYPE_MARKER__GOOG_HTML_SECURITY_PRIVATE_ = {};

  var exception = assertThrows(function() {
    goog.html.SafeHtml.unwrap(evil);
  });
  assertTrue(exception.message.indexOf('expected object of type SafeHtml') > 0);
}


function testSafeHtmlFromEscapedText() {
  // TODO(user): goog.string.htmlEscape currently doesn't escape single-quotes.
  // It should.  Include that in the test once it does.
  var safeHtml = goog.html.SafeHtml.htmlEscape('Hello <em>"&World</em>');
  var extracted = goog.html.SafeHtml.unwrap(safeHtml);
  assertEquals('Hello &lt;em&gt;&quot;&amp;World&lt;/em&gt;', extracted);
  assertEquals('SafeHtml{Hello &lt;em&gt;&quot;&amp;World&lt;/em&gt;}',
      String(safeHtml));
}


function testSafeHtmlFrom() {
  // goog.html.SafeHtml passes through .from unchanged.
  var safeHtmlIn = goog.html.SafeHtml.htmlEscape('<b>in</b>');
  assertTrue(safeHtmlIn === goog.html.SafeHtml.from(safeHtmlIn));

  // Plain strings are escaped.
  assertEquals('this &amp; that',
      goog.html.SafeHtml.unwrap(goog.html.SafeHtml.from('this & that')));

  // Creating from a SafeUrl escapes and retains the known direction (which is
  // fixed to RTL for URLs).
  var safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('http://example.com/?foo&bar'));
  var escapedUrl = goog.html.SafeHtml.from(safeUrl);
  assertEquals('http://example.com/?foo&amp;bar',
      goog.html.SafeHtml.unwrap(escapedUrl));
  assertEquals(goog.i18n.bidi.Dir.LTR, escapedUrl.getDirection());

  // Creating SafeHtml from a goog.string.Const escapes as well (i.e., the
  // value is treated like any other string). To create HTML markup from
  // program literals, SafeHtmlBuilder should be used.
  assertEquals('this &amp; that',
      goog.html.SafeHtml.unwrap(
          goog.html.SafeHtml.from(
              goog.string.Const.from('this & that'))));
}


function testSafeHtmlUncheckedConversion() {
  var safeHtml =
      goog.html.uncheckedconversions.
          safeHtmlFromStringKnownToSatisfyTypeContract(
              goog.string.Const.from(
                  'Safe because value is constant and ends in inner HTML. ' +
                  'Security review: b/7685625.'),
              'Hello <em>World</em>');
  var extracted = goog.html.SafeHtml.unwrap(safeHtml);
  assertEquals('Hello <em>World</em>', extracted);
  assertEquals('SafeHtml{Hello <em>World</em>}', String(safeHtml));
}
