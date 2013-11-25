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
 * @fileoverview Unit tests for goog.html.SafeUrl and its builders.
 */

goog.provide('goog.html.safeUrlTest');

goog.require('goog.html.SafeUrl');
goog.require('goog.html.uncheckedconversions');
goog.require('goog.i18n.bidi.Dir');
goog.require('goog.string.Const');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.html.safeUrlTest');



function testSafeUrl() {
  var safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  var extracted = goog.html.SafeUrl.unwrap(safeUrl);
  assertEquals('javascript:trusted();', extracted);
  assertEquals('javascript:trusted();', safeUrl.getTypedStringValue());
  assertEquals('SafeUrl{javascript:trusted();}', String(safeUrl));

  // URLs are always LTR.
  assertEquals(goog.i18n.bidi.Dir.LTR, safeUrl.getDirection());

  // Interface markers are present.
  assertTrue(safeUrl.implementsGoogStringTypedString);
  assertTrue(safeUrl.implementsGoogI18nBidiDirectionalString);
}


/** @suppress {checkTypes} */
function testUnwrap() {
  var evil = {};
  evil.safeUrlValueWithSecurityContract__googHtmlSecurityPrivate_ =
      '<script>evil()</script';
  evil.SAFE_URL_TYPE_MARKER__GOOG_HTML_SECURITY_PRIVATE_ = {};

  var exception = assertThrows(function() {
    goog.html.SafeUrl.unwrap(evil);
  });
  assertTrue(exception.message.indexOf('expected object of type SafeUrl') > 0);
}


/**
 * Assert that url passes through sanitization unchanged.
 * @param {string|!goog.string.TypedString} url The URL to sanitize.
 */
function assertGoodUrl(url) {
  var expected = url;
  if (url.implementsGoogStringTypedString) {
    expected = url.getTypedStringValue();
  }
  var safeUrl = goog.html.SafeUrl.sanitize(url);
  var extracted = goog.html.SafeUrl.unwrap(safeUrl);
  assertEquals(expected, extracted);
}


/**
 * Assert that url fails sanitization.
 * @param {string|!goog.string.TypedString} url The URL to sanitize.
 */
function assertBadUrl(url) {
  assertThrows(function() {
    goog.html.SafeUrl.sanitize(url);
  });
}


function testSafeUrlSanitize() {
  assertGoodUrl('http://example.com/');
  assertGoodUrl('https://example.com/path?foo=bar#baz');
  // Scheme-less URL with authority.
  assertGoodUrl('//example.com/path');
  // Absolute path with no authority.
  assertGoodUrl('/path');
  assertGoodUrl('/path?foo=bar#baz');
  // Relative path.
  assertGoodUrl('path');
  assertGoodUrl('path?foo=bar#baz');
  assertGoodUrl('p//ath');
  assertGoodUrl('p//ath?foo=bar#baz');
  // mailto:
  assertGoodUrl('mailto:foo@examlpe.com');

  // .sanitize() works on program constants.
  assertGoodUrl(goog.string.Const.from('http://example.com/'));


  assertBadUrl('javascript:evil();');
  assertBadUrl('javascript:evil();//\nhttp://good.com/');
  assertBadUrl('data:blah');

  // .sanitize() does not exempt values known to be program constants.
  assertBadUrl(goog.string.Const.from('data:blah'));
}


/** @suppress {visibility} */
function testSanitizeWithoutAssertion() {
  // Since assertions are enabled when this test runs and we don't want to
  // fiddle with goog.asserts.ENABLE_ASSERTS, we instead call sanitizeInternal_
  // with shouldThrow==false.
  assertEquals(
      'data:image/png;base64,zClosurez',
      goog.html.SafeUrl.unwrap(
          goog.html.SafeUrl.sanitizeInternal_('javascript:evil()', false)));
}


function testSafeUrlFrom() {
  var safeUrlIn = goog.html.SafeUrl.sanitize('http://good.com/');
  assertTrue(safeUrlIn === goog.html.SafeUrl.from(safeUrlIn));

  assertEquals('http://alsogood.com/',
      goog.html.SafeUrl.unwrap(goog.html.SafeUrl.from('http://alsogood.com/')));

  assertThrows(function() {
    goog.html.SafeUrl.from('javascript:evil()');
  });
}


function testSafeUrlUncheckedConversion() {
  var safeUrl =
      goog.html.uncheckedconversions.
          safeUrlFromStringKnownToSatisfyTypeContract(
              goog.string.Const.from('Safe because value is constant. ' +
                                     'Security review: b/7685625.'),
              'javascript:trusted();');
  var extracted = goog.html.SafeUrl.unwrap(safeUrl);
  assertEquals('javascript:trusted();', extracted);
  assertEquals('SafeUrl{javascript:trusted();}', String(safeUrl));
}
