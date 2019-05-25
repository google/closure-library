// Copyright 2015 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.urlTest');
goog.setTestOnly();

const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const testSuite = goog.require('goog.testing.testSuite');
const url = goog.require('goog.fs.url');

const stubs = new PropertyReplacer();

testSuite({
  testBrowserSupportsObjectUrls() {
    stubs.remove(goog.global, 'URL');
    stubs.remove(goog.global, 'webkitURL');
    stubs.remove(goog.global, 'createObjectURL');

    assertFalse(url.browserSupportsObjectUrls());
    try {
      url.createObjectUrl();
      fail();
    } catch (e) {
      assertEquals(
          'This browser doesn\'t seem to support blob URLs', e.message);
    }

    const objectUrl = {};
    function createObjectURL() {
      return objectUrl;
    }
    stubs.set(goog.global, 'createObjectURL', createObjectURL);

    assertTrue(url.browserSupportsObjectUrls());
    assertEquals(objectUrl, url.createObjectUrl());

    stubs.reset();
  },
});
