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

/** @fileoverview Unit tests for goog.labs.net.Image. */

goog.module('goog.labs.net.imageTest');
goog.setTestOnly();

const TestCase = goog.require('goog.testing.TestCase');
const googString = goog.require('goog.string');
const netImage = goog.require('goog.labs.net.image');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  setUpPage() {
    TestCase.getActiveTestCase().promiseTimeout = 10000;  // 10s
  },

  testValidImage() {
    const url = 'testdata/cleardot.gif';

    return netImage.load(url).then((value) => {
      assertEquals('IMG', value.tagName);
      assertTrue(googString.endsWith(value.src, url));
    });
  },

  testInvalidImage() {
    const url = 'testdata/invalid.gif';  // This file does not exist.

    return netImage.load(url).then(
        () => {
          fail('Invalid image should not resolve');
        },
        (errResult) => {
          assertNull(errResult);
        });
  },

  testImageFactory() {
    const returnedImage = new Image();
    const factory = () => returnedImage;
    const countedFactory = recordFunction(factory);

    const url = 'testdata/cleardot.gif';

    return netImage.load(url, countedFactory).then((value) => {
      assertEquals(returnedImage, value);
      assertEquals(1, countedFactory.getCallCount());
    });
  },

  testExistingImage() {
    const image = new Image();

    const url = 'testdata/cleardot.gif';

    return netImage.load(url, image).then((value) => {
      assertEquals(image, value);
    });
  },
});
