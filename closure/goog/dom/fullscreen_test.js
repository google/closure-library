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

goog.module('goog.dom.fullscreen_test');
goog.setTestOnly();

const DomHelper = goog.require('goog.dom.DomHelper');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const asserts = goog.require('goog.testing.asserts');
const fullscreen = goog.require('goog.dom.fullscreen');
const testSuite = goog.require('goog.testing.testSuite');

let domHelper;
let mockDoc;
let stubs;

testSuite({
  setUp() {
    mockDoc = {};
    domHelper = new DomHelper();
    stubs = new PropertyReplacer();
    stubs.replace(domHelper, 'getDocument', () => mockDoc);
  },

  testGetFullScreenElement() {
    const element = document.createElement('div');
    mockDoc.fullscreenElement = element;
    assertEquals(element, fullscreen.getFullScreenElement(domHelper));
  },

  testGetFullScreenElementNotFullScreen() {
    assertNull(fullscreen.getFullScreenElement(domHelper));
  },
});
