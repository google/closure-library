// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.style.transitionTest');
goog.setTestOnly();

const style = goog.require('goog.style');
const testSuite = goog.require('goog.testing.testSuite');
const transition = goog.require('goog.style.transition');
const userAgent = goog.require('goog.userAgent');

/** Fake element. */
let element;

function getTransitionStyle(element) {
  return element.style['transition'] || style.getStyle(element, 'transition');
}

testSuite({
  setUp() {
    element = {'style': {}};
  },

  testSetWithNoProperty() {
    try {
      transition.set(element, []);
    } catch (e) {
      return;
    }
    fail('Should fail when no property is given.');
  },

  testSetWithString() {
    transition.set(element, 'opacity 1s ease-in 0.125s');
    assertEquals('opacity 1s ease-in 0.125s', getTransitionStyle(element));
  },

  testSetWithSingleProperty() {
    transition.set(
        element,
        {property: 'opacity', duration: 1, timing: 'ease-in', delay: 0.125});
    assertEquals('opacity 1s ease-in 0.125s', getTransitionStyle(element));
  },

  testSetWithMultipleStrings() {
    transition.set(element, ['width 1s ease-in', 'height 0.5s linear 1s']);
    assertEquals(
        'width 1s ease-in,height 0.5s linear 1s', getTransitionStyle(element));
  },

  testSetWithMultipleProperty() {
    transition.set(element, [
      {property: 'width', duration: 1, timing: 'ease-in', delay: 0},
      {property: 'height', duration: 0.5, timing: 'linear', delay: 1},
    ]);
    assertEquals(
        'width 1s ease-in 0s,height 0.5s linear 1s',
        getTransitionStyle(element));
  },

  testRemoveAll() {
    style.setStyle(element, 'transition', 'opacity 1s ease-in');
    transition.removeAll(element);
    assertEquals('', getTransitionStyle(element));
  },

  testAddAndRemoveOnRealElement() {
    if (!transition.isSupported()) {
      return;
    }

    const div = document.getElementById('test');
    transition.set(div, 'opacity 1s ease-in 125ms');
    assertEquals('opacity 1s ease-in 125ms', getTransitionStyle(div));
    transition.removeAll(div);
    assertEquals('', getTransitionStyle(div));
  },

  testSanityDetectionOfCss3Transition() {
    const support = transition.isSupported();

    // IE support starts at IE10.
    if (userAgent.IE) {
      assertEquals(userAgent.isVersionOrHigher('10.0'), support);
    }

    // FF support start at FF4 (Gecko 2.0)
    if (userAgent.GECKO) {
      assertEquals(userAgent.isVersionOrHigher('2.0'), support);
    }

    // Webkit support has existed for a long time, we assume support on
    // most webkit version in used today.
    if (userAgent.WEBKIT) {
      assertTrue(support);
    }
  },
});
