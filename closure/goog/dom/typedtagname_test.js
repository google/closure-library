// Copyright 2016 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.dom.TypedTagNameTest');
goog.setTestOnly('goog.dom.TypedTagNameTest');

goog.require('goog.dom.TypedTagName');
goog.require('goog.testing.jsunit');


function testPropertyNamesEqualValues() {
  for (var name in goog.dom.TypedTagName) {
    assertEquals(name, String(goog.dom.TypedTagName[name]));
  }
}


/**
 * @param {!goog.dom.TypedTagName<T>} tagName
 * @return {T}
 * @template T
 */
function createTypedElement(tagName) {
  return document.createElement(String(tagName));
}


function testTypedTagNameType() {
  /** @type {!HTMLAnchorElement} */
  var a = createTypedElement(goog.dom.TypedTagName.A);
}
