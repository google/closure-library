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
goog.require('goog.html.TrustedResourceUrl');
goog.require('goog.html.safeUrlTestVectors');
goog.require('goog.i18n.bidi.Dir');
goog.require('goog.object');
goog.require('goog.string.Const');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

goog.setTestOnly('goog.html.safeUrlTest');


function testSafeUrl() {
  var safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  var extracted = goog.html.SafeUrl.unwrap(safeUrl);
  assertEquals('javascript:trusted();', extracted);
  assertEquals('javascript:trusted();', goog.html.SafeUrl.unwrap(safeUrl));
  assertEquals('SafeUrl{javascript:trusted();}', String(safeUrl));

  // URLs are always LTR.
  assertEquals(goog.i18n.bidi.Dir.LTR, safeUrl.getDirection());

  // Interface markers are present.
  assertTrue(safeUrl.implementsGoogStringTypedString);
  assertTrue(safeUrl.implementsGoogI18nBidiDirectionalString);
}


function testSafeUrlFromBlob_withSafeType() {
  if (isIE9OrLower()) {
    return;
  }
  assertBlobTypeIsSafe('audio/ogg', true);
  assertBlobTypeIsSafe('image/png', true);
  assertBlobTypeIsSafe('iMage/pNg', true);
  assertBlobTypeIsSafe('video/mpeg', true);
  assertBlobTypeIsSafe('video/ogg', true);
  assertBlobTypeIsSafe('video/mp4', true);
  assertBlobTypeIsSafe('video/ogg', true);
  assertBlobTypeIsSafe('video/webm', true);
  assertBlobTypeIsSafe('video/quicktime', true);
}


function testSafeUrlFromBlob_withUnsafeType() {
  if (isIE9OrLower()) {
    return;
  }
  assertBlobTypeIsSafe('', false);
  assertBlobTypeIsSafe('ximage/png', false);
  assertBlobTypeIsSafe('image/pngx', false);
  assertBlobTypeIsSafe('video/whatever', false);
  assertBlobTypeIsSafe('video/', false);
}


/** @return {boolean} True if running on IE9 or lower. */
function isIE9OrLower() {
  return goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('10');
}


/**
 * Tests creating a SafeUrl from a blob with the given MIME type, asserting
 * whether or not the SafeUrl returned is innocuous or not depending on the
 * given boolean.
 * @param {string} type MIME type to test
 * @param {boolean} isSafe Whether the given MIME type should be considered safe
 *     by {@link SafeUrl.fromBlob}.
 */
function assertBlobTypeIsSafe(type, isSafe) {
  var safeUrl = goog.html.SafeUrl.fromBlob(new Blob(['test'], {type: type}));
  var extracted = goog.html.SafeUrl.unwrap(safeUrl);
  if (isSafe) {
    assertEquals('blob:', extracted.substring(0, 5));
  } else {
    assertEquals(goog.html.SafeUrl.INNOCUOUS_STRING, extracted);
  }
}


function testSafeUrlSanitize_sanitizeTelUrl() {
  var vectors = goog.html.safeUrlTestVectors.TEL_VECTORS;
  for (var i = 0; i < vectors.length; ++i) {
    var v = vectors[i];
    var observed = goog.html.SafeUrl.fromTelUrl(v.input);
    assertEquals(v.expected, goog.html.SafeUrl.unwrap(observed));
  }
}


function testSafeUrlSanitize_sipUrlEmail() {
  var expected = 'sip:username@example.com';
  var observed = goog.html.SafeUrl.fromSipUrl('sip:username@example.com');
  assertEquals(expected, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sipsUrlEmail() {
  var expected = 'sips:username@example.com';
  var observed = goog.html.SafeUrl.fromSipUrl('sips:username@example.com');
  assertEquals(expected, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sipProtocolCase() {
  var expected = 'Sip:username@example.com';
  var observed = goog.html.SafeUrl.fromSipUrl('Sip:username@example.com');
  assertEquals(expected, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sipUrlWithPort() {
  var observed = goog.html.SafeUrl.fromSipUrl('sip:username@example.com:5000');
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sipUrlFragment() {
  var observed = goog.html.SafeUrl.fromSipUrl('sip:user#name@example.com');
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sipUrlWithPassword() {
  var observed =
      goog.html.SafeUrl.fromSipUrl('sips:username:password@example.com');
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sipUrlWithOptions() {
  var observed = goog.html.SafeUrl.fromSipUrl('sips:user;na=me@example.com');
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sipUrlWithPercent() {
  var observed = goog.html.SafeUrl.fromSipUrl('sip:user%40name@example.com');
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sipUrlWithAmbiguousQuery() {
  var observed = goog.html.SafeUrl.fromSipUrl('sip:user?name@example.com');
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sanitizeSmsUrl() {
  var vectors = goog.html.safeUrlTestVectors.SMS_VECTORS;
  for (var i = 0; i < vectors.length; ++i) {
    var v = vectors[i];
    var observed = goog.html.SafeUrl.fromSmsUrl(v.input);
    assertEquals(v.expected, goog.html.SafeUrl.unwrap(observed));
  }
}


function testSafeUrlSanitize_sanitizeChromeExtension() {
  var extensionId = goog.string.Const.from('1234567890abcdef');
  var observed = goog.html.SafeUrl.sanitizeChromeExtensionUrl(
      'chrome-extension://1234567890abcdef/foo/bar', extensionId);
  assertEquals(
      'chrome-extension://1234567890abcdef/foo/bar',
      goog.html.SafeUrl.unwrap(observed));

  observed = goog.html.SafeUrl.sanitizeChromeExtensionUrl(
      'chrome-extension://1234567890abcdef/foo/bar', [extensionId]);
  assertEquals(
      'chrome-extension://1234567890abcdef/foo/bar',
      goog.html.SafeUrl.unwrap(observed));

  observed = goog.html.SafeUrl.sanitizeChromeExtensionUrl(
      'not-a-chrome-extension://1234567890abcdef/foo/bar', extensionId);
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));

  observed = goog.html.SafeUrl.sanitizeChromeExtensionUrl(
      'chrome-extension://fedcba0987654321/foo/bar', extensionId);
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sanitizeFirefoxExtension() {
  var extensionId = goog.string.Const.from('1234-5678-90ab-cdef');
  var observed = goog.html.SafeUrl.sanitizeFirefoxExtensionUrl(
      'moz-extension://1234-5678-90ab-cdef/foo/bar', extensionId);
  assertEquals(
      'moz-extension://1234-5678-90ab-cdef/foo/bar',
      goog.html.SafeUrl.unwrap(observed));

  observed = goog.html.SafeUrl.sanitizeFirefoxExtensionUrl(
      'moz-extension://ms-browser-extension://1234-5678-90ab-cdef/foo/bar',
      extensionId);
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));
}


function testSafeUrlSanitize_sanitizeEdgeExtension() {
  var extensionId = goog.string.Const.from('1234-5678-90ab-cdef');
  var observed = goog.html.SafeUrl.sanitizeEdgeExtensionUrl(
      'ms-browser-extension://1234-5678-90ab-cdef/foo/bar', extensionId);
  assertEquals(
      'ms-browser-extension://1234-5678-90ab-cdef/foo/bar',
      goog.html.SafeUrl.unwrap(observed));

  observed = goog.html.SafeUrl.sanitizeEdgeExtensionUrl(
      'chrome-extension://1234-5678-90ab-cdef/foo/bar', extensionId);
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(observed));
}


function testFromTrustedResourceUrl() {
  var url = goog.string.Const.from('test');
  var trustedResourceUrl = goog.html.TrustedResourceUrl.fromConstant(url);
  var safeUrl = goog.html.SafeUrl.fromTrustedResourceUrl(trustedResourceUrl);
  assertEquals(
      goog.string.Const.unwrap(url), goog.html.SafeUrl.unwrap(safeUrl));
}


/** @suppress {checkTypes} */
function testUnwrap() {
  var privateFieldName = 'privateDoNotAccessOrElseSafeUrlWrappedValue_';
  var markerFieldName = 'SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_';
  var propNames = goog.object.getKeys(goog.html.SafeUrl.sanitize(''));
  assertContains(privateFieldName, propNames);
  assertContains(markerFieldName, propNames);
  var evil = {};
  evil[privateFieldName] = 'javascript:evil()';
  evil[markerFieldName] = {};

  var exception = assertThrows(function() { goog.html.SafeUrl.unwrap(evil); });
  assertContains('expected object of type SafeUrl', exception.message);
}


function testSafeUrlSanitize_sanitizeUrl() {
  var vectors = goog.html.safeUrlTestVectors.BASE_VECTORS;
  for (var i = 0; i < vectors.length; ++i) {
    var v = vectors[i];
    if (v.input.match(/^data:/i)) {
      var observed = goog.html.SafeUrl.fromDataUrl(v.input);
      assertEquals(v.expected, goog.html.SafeUrl.unwrap(observed));
    } else {
      var observed = goog.html.SafeUrl.sanitize(v.input);
      assertEquals(v.expected, goog.html.SafeUrl.unwrap(observed));
      if (v.safe) {
        var asserted = goog.html.SafeUrl.sanitizeAssertUnchanged(v.input);
        assertEquals(v.expected, goog.html.SafeUrl.unwrap(asserted));
      } else {
        assertThrows(function() {
          goog.html.SafeUrl.sanitizeAssertUnchanged(v.input);
        });
      }
    }
  }
}


function testSafeUrlSanitize_sanitizeProgramConstants() {
  // .sanitize() works on program constants.
  var good = goog.string.Const.from('http://example.com/');
  var goodOutput = goog.html.SafeUrl.sanitize(good);
  assertEquals('http://example.com/', goog.html.SafeUrl.unwrap(goodOutput));
  var asserted = goog.html.SafeUrl.sanitizeAssertUnchanged(good);
  assertEquals('http://example.com/', goog.html.SafeUrl.unwrap(asserted));

  // .sanitize() does not exempt values known to be program constants.
  var bad = goog.string.Const.from('data:blah');
  var badOutput = goog.html.SafeUrl.sanitize(bad);
  assertEquals(
      goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.unwrap(badOutput));
  assertThrows(function() {
    goog.html.SafeUrl.sanitizeAssertUnchanged(bad);
  });
}

function testSafeUrlSanitize_sanitizePlainStringWithTypedStringProperty() {
  // .sanitize() works on plain strings with property that wrongly indicates
  // that the text is of a type that implements `goog.string.TypedString`. This
  // simulates a property renaming collision with a String property set
  // externally (b/80124112).
  var plainString = 'http://example.com/';
  plainString.implementsGoogStringTypedString = true;
  var output = goog.html.SafeUrl.sanitize(plainString);
  assertEquals('http://example.com/', goog.html.SafeUrl.unwrap(output));
  var asserted = goog.html.SafeUrl.sanitizeAssertUnchanged(plainString);
  assertEquals('http://example.com/', goog.html.SafeUrl.unwrap(asserted));
}

function testSafeUrlSanitize_idempotentForSafeUrlArgument() {
  // This matches the safe prefix.
  var safeUrl = goog.html.SafeUrl.sanitize('https://www.google.com/');
  var safeUrl2 = goog.html.SafeUrl.sanitize(safeUrl);
  assertEquals(
      goog.html.SafeUrl.unwrap(safeUrl), goog.html.SafeUrl.unwrap(safeUrl2));

  // This doesn't match the safe prefix, getting converted into an innocuous
  // string.
  safeUrl = goog.html.SafeUrl.sanitize('disallowed:foo');
  safeUrl2 = goog.html.SafeUrl.sanitize(safeUrl);
  assertEquals(
      goog.html.SafeUrl.unwrap(safeUrl), goog.html.SafeUrl.unwrap(safeUrl2));
}

function testSafeUrlSanitize_base64ImageSrc() {
  var dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAA';
  var safeUrl = goog.html.SafeUrl.fromDataUrl(dataUrl);
  assertEquals(goog.html.SafeUrl.unwrap(safeUrl), dataUrl);
}

function testSafeUrlSanitize_base64ImageSrcWithCRLF() {
  var dataUrl = 'data:image/png;base64,iVBORw0KGgoA%0AAAANSUhEUgA%0DAAT4AAA%0A';
  var safeUrl = goog.html.SafeUrl.fromDataUrl(dataUrl);
  assertEquals(
      goog.html.SafeUrl.unwrap(safeUrl),
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAA');
}
