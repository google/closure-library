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

/** @fileoverview Unit tests for SafeUrl and its builders. */

goog.module('goog.html.safeUrlTest');
goog.setTestOnly();

const Const = goog.require('goog.string.Const');
const Dir = goog.require('goog.i18n.bidi.Dir');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const SafeUrl = goog.require('goog.html.SafeUrl');
const TrustedResourceUrl = goog.require('goog.html.TrustedResourceUrl');
const googObject = goog.require('goog.object');
const safeUrlTestVectors = goog.require('goog.html.safeUrlTestVectors');
const testSuite = goog.require('goog.testing.testSuite');
const trustedtypes = goog.require('goog.html.trustedtypes');
const userAgent = goog.require('goog.userAgent');

const stubs = new PropertyReplacer();
const policy = goog.createTrustedTypesPolicy('closure_test');

/** @return {boolean} True if running on IE9 or lower. */
function isIE9OrLower() {
  return userAgent.IE && !userAgent.isVersionOrHigher('10');
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
  const safeUrl = SafeUrl.fromBlob(new Blob(['test'], {type: type}));
  const extracted = SafeUrl.unwrap(safeUrl);
  if (isSafe) {
    assertEquals('blob:', extracted.substring(0, 5));
  } else {
    assertEquals(SafeUrl.INNOCUOUS_STRING, extracted);
  }
}

testSuite({
  tearDown() {
    stubs.reset();
  },

  testSafeUrl() {
    const safeUrl = SafeUrl.fromConstant(Const.from('javascript:trusted();'));
    const extracted = SafeUrl.unwrap(safeUrl);
    assertEquals('javascript:trusted();', extracted);
    assertEquals('javascript:trusted();', SafeUrl.unwrap(safeUrl));
    assertEquals('SafeUrl{javascript:trusted();}', String(safeUrl));

    // URLs are always LTR.
    assertEquals(Dir.LTR, safeUrl.getDirection());

    // Interface markers are present.
    assertTrue(safeUrl.implementsGoogStringTypedString);
    assertTrue(safeUrl.implementsGoogI18nBidiDirectionalString);
  },

  testSafeUrlIsSafeMimeType_withSafeType() {
    assertTrue(SafeUrl.isSafeMimeType('audio/ogg'));
    assertTrue(SafeUrl.isSafeMimeType('image/png'));
    assertTrue(SafeUrl.isSafeMimeType('iMage/pNg'));
    assertTrue(SafeUrl.isSafeMimeType('video/mpeg'));
    assertTrue(SafeUrl.isSafeMimeType('video/ogg'));
    assertTrue(SafeUrl.isSafeMimeType('video/mp4'));
    assertTrue(SafeUrl.isSafeMimeType('video/ogg'));
    assertTrue(SafeUrl.isSafeMimeType('video/webm'));
    assertTrue(SafeUrl.isSafeMimeType('video/quicktime'));
  },

  testSafeUrlIsSafeMimeType_withUnsafeType() {
    assertFalse(SafeUrl.isSafeMimeType(''));
    assertFalse(SafeUrl.isSafeMimeType('ximage/png'));
    assertFalse(SafeUrl.isSafeMimeType('image/pngx'));
    assertFalse(SafeUrl.isSafeMimeType('video/whatever'));
    assertFalse(SafeUrl.isSafeMimeType('video/'));
  },

  testSafeUrlFromBlob_withSafeType() {
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

    assertBlobTypeIsSafe('image/png;foo=bar', true);
    assertBlobTypeIsSafe('image/png;foo="bar"', true);
    assertBlobTypeIsSafe('image/png;foo="bar;baz"', true);
    assertBlobTypeIsSafe('image/png;foo="bar";baz=bar', true);
  },

  testSafeUrlFromBlob_withUnsafeType() {
    if (isIE9OrLower()) {
      return;
    }
    assertBlobTypeIsSafe('', false);
    assertBlobTypeIsSafe('ximage/png', false);
    assertBlobTypeIsSafe('image/pngx', false);
    assertBlobTypeIsSafe('video/whatever', false);
    assertBlobTypeIsSafe('video/', false);

    assertBlobTypeIsSafe('image/png;foo', false);
    assertBlobTypeIsSafe('image/png;foo=', false);
    assertBlobTypeIsSafe('image/png;foo=bar;', false);
    assertBlobTypeIsSafe('image/png;foo=bar;baz', false);

    // Maybe not wrong, but we reject nonetheless for simplicity.
    assertBlobTypeIsSafe('image/png;foo=bar&', false);
    assertBlobTypeIsSafe('image/png;foo=%3Cbar', false);
  },

  testSafeUrlFromFacebookMessengerUrl_fbMessengerShareUrl() {
    const expected = 'fb-messenger://share?link=https%3A%2F%2Fwww.google.com';
    const observed = SafeUrl.fromFacebookMessengerUrl(
        'fb-messenger://share?link=https%3A%2F%2Fwww.google.com');
    assertEquals(expected, SafeUrl.unwrap(observed));
  },

  testSafeUrlFromFacebookMessengerUrl_fbMessengerEvilUrl() {
    const observed = SafeUrl.fromFacebookMessengerUrl(
        'fb-messenger://evil?link=https%3A%2F%2Fwww.google.com');
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlFromWhatsAppUrl_whatsAppSendUrl() {
    const expected = 'whatsapp://send?text=foo';
    const observed = SafeUrl.fromWhatsAppUrl('whatsapp://send?text=foo');
    assertEquals(expected, SafeUrl.unwrap(observed));
  },

  testSafeUrlFromWhatsAppUrl_whatsAppEvilUrl() {
    const observed = SafeUrl.fromWhatsAppUrl('whatsapp://evil?text=foo');
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sanitizeTelUrl() {
    const vectors = safeUrlTestVectors.TEL_VECTORS;
    for (let i = 0; i < vectors.length; ++i) {
      const v = vectors[i];
      const observed = SafeUrl.fromTelUrl(v.input);
      assertEquals(v.expected, SafeUrl.unwrap(observed));
    }
  },

  testSafeUrlSanitize_sanitizeSshUrl() {
    const vectors = safeUrlTestVectors.SSH_VECTORS;
    for (let i = 0; i < vectors.length; ++i) {
      const v = vectors[i];
      const observed = SafeUrl.fromSshUrl(v.input);
      assertEquals('SSH Url: ' + v.input, v.expected, SafeUrl.unwrap(observed));
    }
  },

  testSafeUrlSanitize_sipUrlEmail() {
    const expected = 'sip:username@example.com';
    const observed = SafeUrl.fromSipUrl('sip:username@example.com');
    assertEquals(expected, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sipsUrlEmail() {
    const expected = 'sips:username@example.com';
    const observed = SafeUrl.fromSipUrl('sips:username@example.com');
    assertEquals(expected, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sipProtocolCase() {
    const expected = 'Sip:username@example.com';
    const observed = SafeUrl.fromSipUrl('Sip:username@example.com');
    assertEquals(expected, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sipUrlWithPort() {
    const observed = SafeUrl.fromSipUrl('sip:username@example.com:5000');
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sipUrlFragment() {
    const observed = SafeUrl.fromSipUrl('sip:user#name@example.com');
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sipUrlWithPassword() {
    const observed = SafeUrl.fromSipUrl('sips:username:password@example.com');
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sipUrlWithOptions() {
    const observed = SafeUrl.fromSipUrl('sips:user;na=me@example.com');
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sipUrlWithPercent() {
    const observed = SafeUrl.fromSipUrl('sip:user%40name@example.com');
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sipUrlWithAmbiguousQuery() {
    const observed = SafeUrl.fromSipUrl('sip:user?name@example.com');
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sanitizeSmsUrl() {
    const vectors = safeUrlTestVectors.SMS_VECTORS;
    for (let i = 0; i < vectors.length; ++i) {
      const v = vectors[i];
      const observed = SafeUrl.fromSmsUrl(v.input);
      assertEquals(v.expected, SafeUrl.unwrap(observed));
    }
  },

  testSafeUrlSanitize_sanitizeChromeExtension() {
    const extensionId = Const.from('1234567890abcdef');
    let observed = SafeUrl.sanitizeChromeExtensionUrl(
        'chrome-extension://1234567890abcdef/foo/bar', extensionId);
    assertEquals(
        'chrome-extension://1234567890abcdef/foo/bar',
        SafeUrl.unwrap(observed));

    observed = SafeUrl.sanitizeChromeExtensionUrl(
        'chrome-extension://1234567890abcdef/foo/bar', [extensionId]);
    assertEquals(
        'chrome-extension://1234567890abcdef/foo/bar',
        SafeUrl.unwrap(observed));

    observed = SafeUrl.sanitizeChromeExtensionUrl(
        'not-a-chrome-extension://1234567890abcdef/foo/bar', extensionId);
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));

    observed = SafeUrl.sanitizeChromeExtensionUrl(
        'chrome-extension://fedcba0987654321/foo/bar', extensionId);
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sanitizeFirefoxExtension() {
    const extensionId = Const.from('1234-5678-90ab-cdef');
    let observed = SafeUrl.sanitizeFirefoxExtensionUrl(
        'moz-extension://1234-5678-90ab-cdef/foo/bar', extensionId);
    assertEquals(
        'moz-extension://1234-5678-90ab-cdef/foo/bar',
        SafeUrl.unwrap(observed));

    observed = SafeUrl.sanitizeFirefoxExtensionUrl(
        'moz-extension://ms-browser-extension://1234-5678-90ab-cdef/foo/bar',
        extensionId);
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testSafeUrlSanitize_sanitizeEdgeExtension() {
    const extensionId = Const.from('1234-5678-90ab-cdef');
    let observed = SafeUrl.sanitizeEdgeExtensionUrl(
        'ms-browser-extension://1234-5678-90ab-cdef/foo/bar', extensionId);
    assertEquals(
        'ms-browser-extension://1234-5678-90ab-cdef/foo/bar',
        SafeUrl.unwrap(observed));

    observed = SafeUrl.sanitizeEdgeExtensionUrl(
        'chrome-extension://1234-5678-90ab-cdef/foo/bar', extensionId);
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(observed));
  },

  testFromTrustedResourceUrl() {
    const url = Const.from('test');
    const trustedResourceUrl = TrustedResourceUrl.fromConstant(url);
    const safeUrl = SafeUrl.fromTrustedResourceUrl(trustedResourceUrl);
    assertEquals(Const.unwrap(url), SafeUrl.unwrap(safeUrl));
  },

  /** @suppress {checkTypes} */
  testUnwrap() {
    const privateFieldName = 'privateDoNotAccessOrElseSafeUrlWrappedValue_';
    const markerFieldName = 'SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_';
    const propNames = googObject.getKeys(SafeUrl.sanitize(''));
    assertContains(privateFieldName, propNames);
    assertContains(markerFieldName, propNames);
    const evil = {};
    evil[privateFieldName] = 'javascript:evil()';
    evil[markerFieldName] = {};

    const exception = assertThrows(() => {
      SafeUrl.unwrap(evil);
    });
    assertContains('expected object of type SafeUrl', exception.message);
  },

  testUnwrapTrustedURL() {
    let safeValue = SafeUrl.sanitize('https://example.com/');
    let trustedValue = SafeUrl.unwrapTrustedURL(safeValue);
    assertEquals(safeValue.getTypedStringValue(), trustedValue);
    stubs.set(trustedtypes, 'PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY', policy);
    safeValue = SafeUrl.sanitize('https://example.com/');
    trustedValue = SafeUrl.unwrapTrustedURL(safeValue);
    assertEquals(safeValue.getTypedStringValue(), trustedValue.toString());
    assertTrue(
        goog.global.TrustedURL ? trustedValue instanceof TrustedURL :
                                 goog.isString(trustedValue));
  },

  testSafeUrlSanitize_sanitizeUrl() {
    const vectors = safeUrlTestVectors.BASE_VECTORS;
    for (let i = 0; i < vectors.length; ++i) {
      const v = vectors[i];
      const isDataUrl = v.input.match(/^data:/i);
      const observed =
          isDataUrl ? SafeUrl.fromDataUrl(v.input) : SafeUrl.sanitize(v.input);
      assertEquals(v.expected, SafeUrl.unwrap(observed));
      if (v.safe) {
        const asserted = SafeUrl.sanitizeAssertUnchanged(v.input, isDataUrl);
        assertEquals(v.expected, SafeUrl.unwrap(asserted));
      } else {
        assertThrows(() => {
          SafeUrl.sanitizeAssertUnchanged(v.input, isDataUrl);
        });
      }
    }
  },

  testSafeUrlSanitize_sanitizeProgramConstants() {
    // .sanitize() works on program constants.
    const good = Const.from('http://example.com/');
    const goodOutput = SafeUrl.sanitize(good);
    assertEquals('http://example.com/', SafeUrl.unwrap(goodOutput));
    const asserted = SafeUrl.sanitizeAssertUnchanged(good);
    assertEquals('http://example.com/', SafeUrl.unwrap(asserted));

    // .sanitize() does not exempt values known to be program constants.
    const bad = Const.from('data:blah');
    const badOutput = SafeUrl.sanitize(bad);
    assertEquals(SafeUrl.INNOCUOUS_STRING, SafeUrl.unwrap(badOutput));
    assertThrows(() => {
      SafeUrl.sanitizeAssertUnchanged(bad);
    });
  },

  testSafeUrlSanitize_idempotentForSafeUrlArgument() {
    // This matches the safe prefix.
    let safeUrl = SafeUrl.sanitize('https://www.google.com/');
    let safeUrl2 = SafeUrl.sanitize(safeUrl);
    assertEquals(SafeUrl.unwrap(safeUrl), SafeUrl.unwrap(safeUrl2));

    // This doesn't match the safe prefix, getting converted into an innocuous
    // string.
    safeUrl = SafeUrl.sanitize('disallowed:foo');
    safeUrl2 = SafeUrl.sanitize(safeUrl);
    assertEquals(SafeUrl.unwrap(safeUrl), SafeUrl.unwrap(safeUrl2));
  },

  testSafeUrlSanitize_base64ImageSrc() {
    const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAA';
    const safeUrl = SafeUrl.fromDataUrl(dataUrl);
    assertEquals(SafeUrl.unwrap(safeUrl), dataUrl);
  },

  testSafeUrlSanitize_base64ImageSrcWithCRLF() {
    const dataUrl =
        'data:image/png;base64,iVBORw0KGgoA%0AAAANSUhEUgA%0DAAT4AAA%0A';
    const safeUrl = SafeUrl.fromDataUrl(dataUrl);
    assertEquals(
        SafeUrl.unwrap(safeUrl),
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAA');
  },
});
