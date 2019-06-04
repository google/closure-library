// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.net.cookiesTest');
goog.setTestOnly();

const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const cookies = goog.require('goog.net.cookies');
const googArray = goog.require('goog.array');
const testSuite = goog.require('goog.testing.testSuite');

let baseCount = 0;
const stubs = new PropertyReplacer();

function checkForCookies() {
  if (!cookies.isEnabled()) {
    let message = 'Cookies must be enabled to run this test.';
    if (location.protocol == 'file:') {
      message += '\nNote that cookies for local files are disabled in some ' +
          'browsers.\nThey can be enabled in Chrome with the ' +
          '--enable-file-cookies flag.';
    }

    fail(message);
  }
}

// TODO(chrisn): Testing max age > 0 requires a mock clock.

function mockSetCookie(var_args) {
  const setCookie = cookies.setCookie_;
  try {
    let result;
    cookies.setCookie_ = function(arg) {
      result = arg;
    };
    cookies.set.apply(cookies, arguments);
    return result;
  } finally {
    cookies.setCookie_ = setCookie;
  }
}

function assertValidName(name) {
  assertTrue(`${name} should be valid`, cookies.isValidName(name));
}

function assertInvalidName(name) {
  assertFalse(`${name} should be invalid`, cookies.isValidName(name));
  assertThrows(() => {
    cookies.set(name, 'value');
  });
}

function assertValidValue(val) {
  assertTrue(`${val} should be valid`, cookies.isValidValue(val));
}

function assertInvalidValue(val) {
  assertFalse(`${val} should be invalid`, cookies.isValidValue(val));
  assertThrows(() => {
    cookies.set('name', val);
  });
}

testSuite({
  setUp() {
    checkForCookies();

    // Make sure there are no cookies set by previous, bad tests.
    cookies.clear();
    baseCount = cookies.getCount();
  },

  tearDown() {
    // Clear up after ourselves.
    cookies.clear();
    stubs.reset();
  },

  testIsEnabled() {
    assertEquals(navigator.cookieEnabled, cookies.isEnabled());
  },

  testCount() {
    // setUp empties the cookies

    cookies.set('testa', 'A');
    assertEquals(baseCount + 1, cookies.getCount());
    cookies.set('testb', 'B');
    cookies.set('testc', 'C');
    assertEquals(baseCount + 3, cookies.getCount());
    cookies.remove('testa');
    cookies.remove('testb');
    assertEquals(baseCount + 1, cookies.getCount());
    cookies.remove('testc');
    assertEquals(baseCount + 0, cookies.getCount());
  },

  testSet() {
    cookies.set('testa', 'testb');
    assertEquals('testb', cookies.get('testa'));
    cookies.remove('testa');
    assertEquals(undefined, cookies.get('testa'));
    // check for invalid characters in name and value
  },

  testGetKeys() {
    cookies.set('testa', 'A');
    cookies.set('testb', 'B');
    cookies.set('testc', 'C');
    const keys = cookies.getKeys();
    assertTrue(googArray.contains(keys, 'testa'));
    assertTrue(googArray.contains(keys, 'testb'));
    assertTrue(googArray.contains(keys, 'testc'));
  },

  testGetValues() {
    cookies.set('testa', 'A');
    cookies.set('testb', 'B');
    cookies.set('testc', 'C');
    const values = cookies.getValues();
    assertTrue(googArray.contains(values, 'A'));
    assertTrue(googArray.contains(values, 'B'));
    assertTrue(googArray.contains(values, 'C'));
  },

  testContainsKey() {
    assertFalse(cookies.containsKey('testa'));
    cookies.set('testa', 'A');
    assertTrue(cookies.containsKey('testa'));
    cookies.set('testb', 'B');
    assertTrue(cookies.containsKey('testb'));
    cookies.remove('testb');
    assertFalse(cookies.containsKey('testb'));
    cookies.remove('testa');
    assertFalse(cookies.containsKey('testa'));
  },

  testContainsValue() {
    assertFalse(cookies.containsValue('A'));
    cookies.set('testa', 'A');
    assertTrue(cookies.containsValue('A'));
    cookies.set('testb', 'B');
    assertTrue(cookies.containsValue('B'));
    cookies.remove('testb');
    assertFalse(cookies.containsValue('B'));
    cookies.remove('testa');
    assertFalse(cookies.containsValue('A'));
  },

  testIsEmpty() {
    // we cannot guarantee that we have no cookies so testing for the true
    // case cannot be done without a mock document.cookie
    cookies.set('testa', 'A');
    assertFalse(cookies.isEmpty());
    cookies.set('testb', 'B');
    assertFalse(cookies.isEmpty());
    cookies.remove('testb');
    assertFalse(cookies.isEmpty());
    cookies.remove('testa');
  },

  testRemove() {
    assertFalse(
        '1. Cookie should not contain "testa"', cookies.containsKey('testa'));
    cookies.set('testa', 'A', undefined, '/');
    assertTrue(
        '2. Cookie should contain "testa"', cookies.containsKey('testa'));
    cookies.remove('testa', '/');
    assertFalse(
        '3. Cookie should not contain "testa"', cookies.containsKey('testa'));

    cookies.set('testa', 'A');
    assertTrue(
        '4. Cookie should contain "testa"', cookies.containsKey('testa'));
    cookies.remove('testa');
    assertFalse(
        '5. Cookie should not contain "testa"', cookies.containsKey('testa'));
  },

  testStrangeValue() {
    // This ensures that the pattern key2=value in the value does not match
    // the key2 cookie.
    const value = 'testb=bbb';
    const value2 = 'ccc';

    cookies.set('testa', value);
    cookies.set('testb', value2);

    assertEquals(value, cookies.get('testa'));
    assertEquals(value2, cookies.get('testb'));
  },

  testSetCookiePath() {
    assertEquals('foo=bar;path=/xyz', mockSetCookie('foo', 'bar', -1, '/xyz'));
  },

  testSetCookieDomain() {
    assertEquals(
        'foo=bar;domain=google.com',
        mockSetCookie('foo', 'bar', -1, null, 'google.com'));
  },

  testSetCookieSecure() {
    assertEquals(
        'foo=bar;secure', mockSetCookie('foo', 'bar', -1, null, null, true));
  },

  testSetCookieMaxAgeZero() {
    const result = mockSetCookie('foo', 'bar', 0);
    const pattern =
        new RegExp('foo=bar;expires=' + new Date(1970, 1, 1).toUTCString());
    if (!result.match(pattern)) {
      fail(`expected match against ${pattern} got ${result}`);
    }
  },

  testGetEmptyCookie() {
    const value = '';

    cookies.set('test', value);

    assertEquals(value, cookies.get('test'));
  },

  testGetEmptyCookieIE() {
    stubs.set(cookies, 'getCookie_', () => 'test1; test2; test3');

    assertEquals('', cookies.get('test1'));
    assertEquals('', cookies.get('test2'));
    assertEquals('', cookies.get('test3'));
  },

  testGetReallyEmptyCookieIE() {
    stubs.set(cookies, 'getCookie_', () => 'test1; ; test3');

    assertEquals('', cookies.get('test1'));
    assertEquals('', cookies.get(''));
    assertEquals('', cookies.get('test3'));
    assertEquals(3, cookies.getCount());
  },

  testValidName() {
    assertValidName('foo');
    assertInvalidName('foo bar');
    assertInvalidName('foo=bar');
    assertInvalidName('foo;bar');
    assertInvalidName('foo\nbar');
  },

  testValidValue() {
    assertValidValue('foo');
    assertValidValue('foo bar');
    assertValidValue('foo=bar');
    assertInvalidValue('foo;bar');
    assertInvalidValue('foo\nbar');
  },
});
