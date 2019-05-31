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

/** @fileoverview Unit tests for TrustedResourceUrl and its builders. */

goog.module('goog.html.trustedResourceUrlTest');
goog.setTestOnly();

const Const = goog.require('goog.string.Const');
const Dir = goog.require('goog.i18n.bidi.Dir');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const TrustedResourceUrl = goog.require('goog.html.TrustedResourceUrl');
const googObject = goog.require('goog.object');
const testSuite = goog.require('goog.testing.testSuite');
const trustedtypes = goog.require('goog.html.trustedtypes');

const stubs = new PropertyReplacer();
const policy = goog.createTrustedTypesPolicy('closure_test');

/**
 * Asserts that format with no arguments is allowed and results in a URL
 * with itself.
 * @param {!Const} format
 */
function assertValidFormat(format) {
  const url = TrustedResourceUrl.format(format, {});
  assertEquals(Const.unwrap(format), TrustedResourceUrl.unwrap(url));
}

/**
 * Asserts that format with no arguments throws.
 * @param {!Const} format
 * @param {!Object<string|number|!Const>=} args
 */
function assertInvalidFormat(format, args = undefined) {
  const exception = assertThrows(Const.unwrap(format), () => {
    TrustedResourceUrl.format(format, args || {});
  });
  assertContains('Invalid TrustedResourceUrl format', exception.message);
}

testSuite({
  tearDown() {
    stubs.reset();
  },

  testTrustedResourceUrl() {
    const url = 'javascript:trusted();';
    const trustedResourceUrl = TrustedResourceUrl.fromConstant(Const.from(url));
    const extracted = TrustedResourceUrl.unwrap(trustedResourceUrl);
    assertEquals(url, extracted);
    assertEquals(url, trustedResourceUrl.getTypedStringValue());
    assertEquals(
        'TrustedResourceUrl{javascript:trusted();}',
        String(trustedResourceUrl));

    // URLs are always LTR.
    assertEquals(Dir.LTR, trustedResourceUrl.getDirection());

    // Interface markers are present.
    assertTrue(trustedResourceUrl.implementsGoogStringTypedString);
    assertTrue(trustedResourceUrl.implementsGoogI18nBidiDirectionalString);
  },

  testFormat_validFormatString() {
    // With scheme.
    assertValidFormat(Const.from('httpS://www.gOOgle.com/'));
    // Scheme-relative.
    assertValidFormat(Const.from('//www.google.com/'));
    // Origin with hyphen and port.
    assertValidFormat(Const.from('//ww-w.google.com:1000/path'));
    // IPv6 origin.
    assertValidFormat(Const.from('//[::1]/path'));
    // Path-absolute.
    assertValidFormat(Const.from('/path'));
    assertValidFormat(Const.from('/path/x'));
    assertValidFormat(Const.from('/path#x'));
    assertValidFormat(Const.from('/path?x'));
    // Mixed case.
    assertValidFormat(Const.from('httpS://www.google.cOm/pAth'));
    assertValidFormat(Const.from('about:blank#'));
    assertValidFormat(Const.from('about:blank#x'));
    // Relative path.
    assertValidFormat(Const.from('path/'));
    assertValidFormat(Const.from('path/a'));
    assertValidFormat(Const.from('../'));
    assertValidFormat(Const.from('../a'));
    assertValidFormat(Const.from('?a'));
    assertValidFormat(Const.from('path?a'));
    assertValidFormat(Const.from('path/?a'));
    assertValidFormat(Const.from('#a'));
    assertValidFormat(Const.from('path#a'));
    assertValidFormat(Const.from('path/#a'));

    // TODO(jakubvrana): Disallow, allows crafting '//' prefix.
    const url =
        TrustedResourceUrl.format(Const.from('/%{path}/'), {'path': ''});
    assertEquals('//', TrustedResourceUrl.unwrap(url));
  },

  testFormat_args() {
    const url = TrustedResourceUrl.format(
        Const.from('/path/%{dir1}/%{dir2}?n1=v1%{opt_param}'), {
          'dir1': 'd%/?#=',
          'dir2': 2,
          'opt_param': Const.from('n2=v2%/?#='),
        });
    assertEquals(
        '/path/d%25%2F%3F%23%3D/2?n1=v1n2=v2%/?#=',
        TrustedResourceUrl.unwrap(url));

    // Only \w is permitted inside %{...}.
    const url2 = TrustedResourceUrl.format(
        Const.from('/path/%{!%{label}}%{foo'), {'label': 'value'});
    assertEquals('/path/%{!value}%{foo', TrustedResourceUrl.unwrap(url2));
  },

  testFormat_missingArgs() {
    const exception = assertThrows(() => {
      TrustedResourceUrl.format(
          Const.from('https://www.google.com/path/%{arg1}'),
          {'arg2': 'irrelevant'});
    });
    assertContains('no valid label mapping found', exception.message);
  },

  testFormat_invalidFormatString() {
    // Invalid scheme.
    assertInvalidFormat(Const.from('ftp://'));
    // Missing origin.
    assertInvalidFormat(Const.from('https:'));
    assertInvalidFormat(Const.from('https://'));
    assertInvalidFormat(Const.from('https:///'));
    assertInvalidFormat(Const.from('//'));
    assertInvalidFormat(Const.from('///'));
    // Missing / after origin.
    assertInvalidFormat(Const.from('https://google.com'));
    // Invalid char in origin.
    assertInvalidFormat(Const.from('https://www.google%.com/'));
    assertInvalidFormat(Const.from('https://www.google\\.com/'));
    assertInvalidFormat(Const.from('https://user:password@www.google.com/'));
    // Two slashes, would allow origin to be set dynamically.
    assertInvalidFormat(Const.from('//'));
    // Two slashes. IE allowed (allows?) '\' instead of '/'.
    assertInvalidFormat(Const.from('/\\'));
    // Path.
    assertInvalidFormat(Const.from(''));      // Allows appending anything.
    assertInvalidFormat(Const.from('/'));     // Allows appending '/'.
    assertInvalidFormat(Const.from('path'));  // Allows appending ':'.
    assertInvalidFormat(Const.from('%{path}'), {'path': ''});
    assertInvalidFormat(Const.from('%{path}/'), {'path': ''});
    assertInvalidFormat(Const.from('//%{domain}'), {'domain': ''});
  },

  testFromConstants() {
    assertEquals(
        '', TrustedResourceUrl.unwrap(TrustedResourceUrl.fromConstants([])));
    assertEquals(
        'foo', TrustedResourceUrl.unwrap(TrustedResourceUrl.fromConstants([
          Const.from('foo'),
        ])));
    assertEquals(
        'foobar', TrustedResourceUrl.unwrap(TrustedResourceUrl.fromConstants([
          Const.from('foo'),
          Const.from('bar'),
        ])));
  },

  testCloneWithParams() {
    const url =
        TrustedResourceUrl.fromConstant(Const.from('https://example.com/'));

    assertEquals(
        'https://example.com/',
        url.cloneWithParams(undefined).getTypedStringValue());

    assertEquals(
        'https://example.com/',
        url.cloneWithParams(null).getTypedStringValue());

    assertEquals(
        'https://example.com/?search%25',
        url.cloneWithParams('search%').getTypedStringValue());

    assertEquals(
        'https://example.com/?a=%3F%23%26&b=1&e=x&e=y',
        url.cloneWithParams(
               {'a': '?#&', 'b': 1, 'c': null, 'd': undefined, 'e': ['x', 'y']})
            .getTypedStringValue());

    assertEquals(
        'https://example.com/',
        url.cloneWithParams(undefined, null).getTypedStringValue());

    assertEquals(
        'https://example.com/#hash%25',
        url.cloneWithParams(undefined, 'hash%').getTypedStringValue());

    assertEquals(
        'https://example.com/#a=%3F%23%26&b=1&e=x&e=y',
        url.cloneWithParams(
               undefined,
               {'a': '?#&', 'b': 1, 'c': null, 'd': undefined, 'e': ['x', 'y']})
            .getTypedStringValue());

    const hashAndSearchUrl = TrustedResourceUrl.fromConstant(
        Const.from('https://example.com/?a=x#top'));

    assertEquals(
        'https://example.com/?a=x#top',
        hashAndSearchUrl.cloneWithParams(undefined).getTypedStringValue());

    assertEquals(
        'https://example.com/?a=x#top',
        hashAndSearchUrl.cloneWithParams(null).getTypedStringValue());

    assertEquals(
        'https://example.com/?search%25#top',
        hashAndSearchUrl.cloneWithParams('search%').getTypedStringValue());

    assertEquals(
        'https://example.com/?a=x&a=%3F%23%26&b=1&e=x&e=y#top',
        hashAndSearchUrl
            .cloneWithParams({
              'a': '?#&',
              'b': 1,
              'c': null,
              'd': undefined,
              'e': ['x', 'y']
            })
            .getTypedStringValue());

    assertEquals(
        'https://example.com/?a=x#top',
        hashAndSearchUrl.cloneWithParams(undefined, null)
            .getTypedStringValue());

    assertEquals(
        'https://example.com/?a=x#hash%25',
        hashAndSearchUrl.cloneWithParams(undefined, 'hash%')
            .getTypedStringValue());

    assertEquals(
        'https://example.com/?a=x#top&a=%3F%23%26&b=2&e=z&e=z',
        hashAndSearchUrl
            .cloneWithParams(undefined, {
              'a': '?#&',
              'b': 2,
              'c': null,
              'd': undefined,
              'e': ['z', 'z']
            })
            .getTypedStringValue());

    assertEquals(
        'https://example.com/' +
            '?a=x&a=%3F%23%26&b=1&e=x&e=y#top&a=%3F%23%26&b=2&e=z&e=z',
        hashAndSearchUrl
            .cloneWithParams(
                {
                  'a': '?#&',
                  'b': 1,
                  'c': null,
                  'd': undefined,
                  'e': ['x', 'y']
                },
                {
                  'a': '?#&',
                  'b': 2,
                  'c': null,
                  'd': undefined,
                  'e': ['z', 'z']
                })
            .getTypedStringValue());

    assertEquals(
        'https://example.com/#top',
        hashAndSearchUrl.cloneWithParams('').getTypedStringValue());

    assertEquals(
        'https://example.com/?a=x',
        hashAndSearchUrl.cloneWithParams(undefined, '').getTypedStringValue());

    assertEquals(
        'https://example.com/?a=y',
        TrustedResourceUrl.fromConstant(Const.from('https://example.com/?'))
            .cloneWithParams({'a': 'y'})
            .getTypedStringValue());
  },

  testFormatWithParams() {
    let url = TrustedResourceUrl.formatWithParams(
        Const.from('https://example.com/'), {}, {'a': '&'});
    assertEquals('https://example.com/?a=%26', url.getTypedStringValue());

    url = TrustedResourceUrl.formatWithParams(
        Const.from('https://example.com/%{file}'), {'file': 'abc'},
        {'b': 1, 'c': null, 'd': undefined});
    assertEquals('https://example.com/abc?b=1', url.getTypedStringValue());

    url = TrustedResourceUrl.formatWithParams(
        Const.from('https://example.com/'), {}, {'a': ['x', 'y']});
    assertEquals('https://example.com/?a=x&a=y', url.getTypedStringValue());

    url = TrustedResourceUrl.formatWithParams(
        Const.from('https://example.com/%{prestoId}'), {'prestoId': 1},
        {'origin': 'https://example.com/'});
    assertEquals(
        'https://example.com/1?origin=https%3A%2F%2Fexample.com%2F',
        url.getTypedStringValue());

    url = TrustedResourceUrl.formatWithParams(
        Const.from('https://example.com/%{file}?a=x#top'), {'file': 'abc'},
        {'a': '?#&', 'b': 1, 'c': null, 'd': undefined, 'e': ['x', 'y']},
        {'a': '?#&', 'b': 2, 'c': null, 'd': undefined, 'e': ['z', 'z']});

    assertEquals(
        'https://example.com/abc' +
            '?a=x&a=%3F%23%26&b=1&e=x&e=y#top&a=%3F%23%26&b=2&e=z&e=z',
        url.getTypedStringValue());
  },

  /** @suppress {checkTypes} */
  testUnwrap() {
    const privateFieldName =
        'privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_';
    const markerFieldName =
        'TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_';
    const propNames =
        googObject.getKeys(TrustedResourceUrl.fromConstant(Const.from('')));
    assertContains(privateFieldName, propNames);
    assertContains(markerFieldName, propNames);
    const evil = {};
    evil[privateFieldName] = 'http://example.com/evil.js';
    evil[markerFieldName] = {};

    const exception = assertThrows(() => {
      TrustedResourceUrl.unwrap(evil);
    });
    assertContains(
        'expected object of type TrustedResourceUrl', exception.message);
  },

  testUnwrapTrustedScriptURL() {
    let safeValue =
        TrustedResourceUrl.fromConstant(Const.from('https://example.com/'));
    let trustedValue = TrustedResourceUrl.unwrapTrustedScriptURL(safeValue);
    assertEquals(safeValue.getTypedStringValue(), trustedValue);
    stubs.set(trustedtypes, 'PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY', policy);
    safeValue =
        TrustedResourceUrl.fromConstant(Const.from('https://example.com/'));
    trustedValue = TrustedResourceUrl.unwrapTrustedScriptURL(safeValue);
    assertEquals(safeValue.getTypedStringValue(), trustedValue.toString());
    assertTrue(
        goog.global.TrustedScriptURL ?
            trustedValue instanceof TrustedScriptURL :
            goog.isString(trustedValue));
  },

  testUnwrapTrustedURL() {
    let safeValue =
        TrustedResourceUrl.fromConstant(Const.from('https://example.com/'));
    let trustedValue = TrustedResourceUrl.unwrapTrustedURL(safeValue);
    assertEquals(safeValue.getTypedStringValue(), trustedValue);
    stubs.set(trustedtypes, 'PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY', policy);
    safeValue =
        TrustedResourceUrl.fromConstant(Const.from('https://example.com/'));
    trustedValue = TrustedResourceUrl.unwrapTrustedURL(safeValue);
    assertEquals(safeValue.getTypedStringValue(), trustedValue.toString());
    assertTrue(
        goog.global.TrustedURL ? trustedValue instanceof TrustedURL :
                                 goog.isString(trustedValue));
  },
});
