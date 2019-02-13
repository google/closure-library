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

goog.provide('goog.dom.fullscreen_test');
goog.setTestOnly('goog.dom.fullscreen_test');

goog.require('goog.dom.DomHelper');
goog.require('goog.dom.fullscreen');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');

var domHelper;
var mockDoc;
var stubs;

function setUp() {
  mockDoc = {};
  domHelper = new goog.dom.DomHelper();
  stubs = new goog.testing.PropertyReplacer();
  stubs.replace(domHelper, 'getDocument', function() {
    return mockDoc;
  });
}

function testGetFullScreenElement() {
  var element = document.createElement('div');
  mockDoc.fullscreenElement = element;
  assertEquals(element, goog.dom.fullscreen.getFullScreenElement(domHelper));
}

function testGetFullScreenElementNotFullScreen() {
  assertNull(goog.dom.fullscreen.getFullScreenElement(domHelper));
}
