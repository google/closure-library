// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.dom.textassert_test');
goog.setTestOnly();

const testSuite = goog.require('goog.testing.testSuite');
const textAssert = goog.require('goog.dom.textAssert');
const userAgent = goog.require('goog.userAgent');

testSuite({
  shouldRunTests() {
    return !userAgent.IE || userAgent.isVersionOrHigher(9);
  },

  testAssertIsTextThrowsWithHtmlTags: function() {
    const e = assertThrows(() => textAssert.assertHtmlFree('<b>a<\\b>'));
    assertEquals(
        'Assertion failed: String has HTML original: ' +
            '<b>a<\\b>, escaped: &lt;b&gt;a&lt;\\b&gt;',
        e.message);
  },

  testAssertIsTextThrowsWithHtmlEntities: function() {
    const e = assertThrows(() => {
      textAssert.assertHtmlFree('a&amp;b');
    });
    assertEquals(
        'Assertion failed: String has HTML original: ' +
            'a&amp;b, escaped: a&amp;amp;b',
        e.message);
  },

  testAssertIsTextDoesNotChangeText: function() {
    const plain = 'text';
    assertEquals(plain, textAssert.assertHtmlFree(plain));
  },
});
