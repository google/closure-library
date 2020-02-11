/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.dom.TagNameTest');
goog.setTestOnly();

const TagName = goog.require('goog.dom.TagName');
const googObject = goog.require('goog.object');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testCorrectNumberOfTagNames() {
    assertEquals(130, googObject.getCount(TagName));
  },

  testPropertyNamesEqualValues() {
    for (let propertyName in TagName) {
      assertEquals(propertyName, String(TagName[propertyName]));
    }
  },
});
