// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.style.layoutassertsTest');
goog.setTestOnly();

const TagName = goog.require('goog.dom.TagName');
const TestCase = goog.require('goog.testing.TestCase');
const dom = goog.require('goog.dom');
/** @suppress {extraRequire} */
const layoutasserts = goog.require('goog.testing.style.layoutasserts');
const style = goog.require('goog.style');
const testSuite = goog.require('goog.testing.testSuite');

let div1;
let div2;
const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 100;

testSuite({
  setUp() {
    // TODO(b/25875505): Fix unreported assertions (go/failonunreportedasserts).
    TestCase.getActiveTestCase().failOnUnreportedAsserts = false;

    div1 = dom.createDom(TagName.DIV, {
      id: 'test',
      className: 'test',
      style: 'position:absolute;top:0;left:0;' +
          'width:' + DEFAULT_WIDTH + 'px;' +
          'height:' + DEFAULT_HEIGHT + 'px;' +
          'background-color:#EEE',
      innerHTML: 'abc',
    });
    div2 = dom.createDom(TagName.DIV, {
      id: 'test2',
      className: 'test2',
      style: 'position:absolute;' +
          'top:0;left:0;' +
          'width:' + DEFAULT_WIDTH + 'px;' +
          'height:' + DEFAULT_HEIGHT + 'px;' +
          'background-color:#F00',
      innerHTML: 'abc',
    });
  },

  tearDown() {
    div1 = null;
    div2 = null;
  },

  /** Tests assertIsVisible. */
  testAssertIsVisible() {
    assertThrows(
        'Exception should be thrown when asserting visibility.',
        goog.bind(assertIsVisible, null, null));  // assertIsVisible(null)

    // Attach it to BODY tag and assert that it is visible.
    document.body.appendChild(div1);
    assertIsVisible('Div should be visible.', div1);

    // Tests with hidden element
    style.setElementShown(div1, false /* display */);
    assertThrows(
        'Exception should be thrown when asserting visibility.',
        goog.bind(assertIsVisible, null, div1));

    // Clean up.
    document.body.removeChild(div1);
  },

  /** Tests assertNotVisible. */
  testAssertNotVisible() {
    // Tests null as a parameter.
    const element = null;
    assertNotVisible(element);

    // Attach the element to BODY element, assert should fail.
    document.body.appendChild(div1);
    assertThrows(
        'Exception should be thrown when asserting non-visibility.',
        goog.bind(assertNotVisible, null, div1));

    // Clean up.
    document.body.removeChild(div1);
  },

  /** Tests assertIsIntersect. */
  testAssertIntersect() {
    document.body.appendChild(div1);
    document.body.appendChild(div2);

    // No intersection
    style.setPosition(div1, 0, 0);
    style.setPosition(div2, 500, 500);
    assertThrows(
        'Exception should be thrown when asserting intersection.',
        goog.bind(assertIntersect, null, div1, div2));
    assertNoIntersect(div1, div2);

    // Some intersection
    style.setPosition(div1, 0, 0);
    style.setPosition(div2, 50, 50);
    assertThrows(
        'Exception should be thrown when asserting no intersection.',
        goog.bind(assertNoIntersect, null, div1, div2));
    assertIntersect(div1, div2);

    // Completely superimposed.
    style.setPosition(div1, 0, 0);
    style.setPosition(div2, 0, 0);
    assertThrows(
        'Exception should be thrown when asserting no intersection.',
        goog.bind(assertNoIntersect, null, div1, div2));
    assertIntersect(div1, div2);
  },

  /** Tests assertWidth. */
  testAssertWidth() {
    document.body.appendChild(div1);

    // Test correct width
    assertWidth(div1, DEFAULT_WIDTH);

    // Test wrong width
    assertThrows(
        'Exception should be thrown when elements has wrong width',
        goog.bind(assertWidth, null, div1, 400));

    // Test a valid tolerance value
    assertWidthWithinTolerance(div1, 180, 20);

    // Test exceeding tolerance value
    assertThrows(
        'Exception should be thrown when element\'s width exceeds tolerance',
        goog.bind(assertWidthWithinTolerance, null, div1, 100, 0.1));
  },

  /** Tests assertHeight. */
  testAssertHeight() {
    document.body.appendChild(div1);

    // Test correct height
    assertHeight(div1, DEFAULT_HEIGHT);

    // Test wrong height
    assertThrows(
        'Exception should be thrown when element has wrong height.',
        goog.bind(assertHeightWithinTolerance, null, div1, 300));

    // Test a valid tolerance value
    assertHeightWithinTolerance(div1, 90, 10);

    // Test exceeding tolerance value
    assertThrows(
        'Exception should be thrown when element\'s height exceeds tolerance',
        goog.bind(assertHeight, null, div1, 50, 0.2));
  },

  /** Tests assertIsLeftOf. */
  testAssertIsLeftOf() {
    document.body.appendChild(div1);
    document.body.appendChild(div2);

    // Test elements of same size & location
    assertThrows(
        'Exception should be thrown when elements intersect.',
        goog.bind(assertIsLeftOf, null, div1, div2));
    assertThrows(
        'Exception should be thrown when elements intersect.',
        goog.bind(assertIsStrictlyLeftOf, null, div1, div2));

    // Test elements that are not left to right
    style.setPosition(div1, 100, 0);
    style.setPosition(div2, 0, 0);
    assertThrows(
        'Exception should be thrown when elements are not left to right.',
        goog.bind(assertIsLeftOf, null, div1, div2));
    assertThrows(
        'Exception should be thrown when elements are not left to right.',
        goog.bind(assertIsStrictlyLeftOf, null, div1, div2));

    // Test elements that intersect, but is left to right
    style.setPosition(div1, 0, 0);
    style.setPosition(div2, 100, 0);
    assertIsLeftOf(div1, div2);
    assertThrows(
        'Exception should be thrown when elements intersect.',
        goog.bind(assertIsStrictlyLeftOf, null, div1, div2));

    // Test elements that are strictly left to right
    style.setPosition(div1, 0, 0);
    style.setPosition(div2, 999, 0);
    assertIsLeftOf(div1, div2);
    assertIsStrictlyLeftOf(div1, div2);
  },

  /** Tests assertIsAbove. */
  testAssertIsAbove() {
    document.body.appendChild(div1);
    document.body.appendChild(div2);

    // Test elements of same size & location
    assertThrows(
        'Exception should be thrown when elements intersect.',
        goog.bind(assertIsAbove, null, div1, div2));
    assertThrows(
        'Exception should be thrown when elements intersect.',
        goog.bind(assertIsStrictlyAbove, null, div1, div2));

    // Test elements that are not top to bottom
    style.setPosition(div1, 0, 999);
    style.setPosition(div2, 0, 0);
    assertThrows(
        'Exception should be thrown when elements are not top to bottom.',
        goog.bind(assertIsAbove, null, div1, div2));
    assertThrows(
        'Exception should be thrown when elements are not top to bottom.',
        goog.bind(assertIsStrictlyAbove, null, div1, div2));

    // Test elements that intersect, but is top to bottom
    style.setPosition(div1, 0, 0);
    style.setPosition(div2, 0, 50);
    assertIsAbove(div1, div2);
    assertThrows(
        'Exception should be thrown when elements intersect.',
        goog.bind(assertIsStrictlyAbove, null, div1, div2));

    // Test elements that are top to bottom
    style.setPosition(div1, 0, 0);
    style.setPosition(div2, 0, 999);
    assertIsAbove(div1, div2);
    assertIsStrictlyAbove(div1, div2);
  },
});
