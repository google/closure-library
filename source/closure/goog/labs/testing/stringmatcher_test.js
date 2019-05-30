// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.labs.testing.stringMatcherTest');
goog.setTestOnly();

const MatcherError = goog.require('goog.labs.testing.MatcherError');
/** @suppress {extraRequire} */
const StringContainsInOrderMatcher = goog.require('goog.labs.testing.StringContainsInOrderMatcher');
const assertThat = goog.require('goog.labs.testing.assertThat');
const testSuite = goog.require('goog.testing.testSuite');

function assertMatcherError(callable, errorString) {
  const e = assertThrows(errorString || 'callable throws exception', callable);
  assertTrue(e instanceof MatcherError);
}
testSuite({
  testAnyString() {
    assertThat('foo', anyString(), 'typeof "foo" == "string"');
    assertMatcherError(() => {
      assertThat(1, anyString());
    }, 'typeof 1 == "string"');
  },

  testContainsString() {
    assertThat('hello', containsString('ell'), 'hello contains ell');

    assertMatcherError(() => {
      assertThat('hello', containsString('world!'));
    }, 'containsString should throw exception when it fails');
  },

  testEndsWith() {
    assertThat('hello', endsWith('llo'), 'hello ends with llo');

    assertMatcherError(() => {
      assertThat('minutes', endsWith('midnight'));
    }, 'endsWith should throw exception when it fails');
  },

  testEqualToIgnoringWhitespace() {
    assertThat(
        '    h\n   EL L\tO', equalToIgnoringWhitespace('h el l o'),
        '"   h   EL L\tO   " is equal to "h el l o"');

    assertMatcherError(() => {
      assertThat('hybrid', equalToIgnoringWhitespace('theory'));
    }, 'equalToIgnoringWhitespace should throw exception when it fails');
  },

  testEquals() {
    assertThat('hello', equals('hello'), 'hello equals hello');

    assertMatcherError(() => {
      assertThat('thousand', equals('suns'));
    }, 'equals should throw exception when it fails');
  },

  testStartsWith() {
    assertThat('hello', startsWith('hel'), 'hello starts with hel');

    assertMatcherError(() => {
      assertThat('linkin', startsWith('park'));
    }, 'startsWith should throw exception when it fails');
  },

  testStringContainsInOrder() {
    assertThat(
        'hello', stringContainsInOrder(['h', 'el', 'el', 'l', 'o']),
        'hello contains in order: [h, el, l, o]');

    assertMatcherError(() => {
      assertThat('hybrid', stringContainsInOrder(['hy', 'brid', 'theory']));
    }, 'stringContainsInOrder should throw exception when it fails');
  },

  testMatchesRegex() {
    assertThat('foobar', matchesRegex(/foobar/));
    assertThat('foobar', matchesRegex(/oobar/));

    assertMatcherError(() => {
      assertThat('foo', matchesRegex(/^foobar$/));
    }, 'matchesRegex should throw exception when it fails');
  },
});
