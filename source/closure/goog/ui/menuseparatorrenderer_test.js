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

goog.module('goog.ui.MenuSeparatorRendererTest');
goog.setTestOnly();

const MenuSeparator = goog.require('goog.ui.MenuSeparator');
const MenuSeparatorRenderer = goog.require('goog.ui.MenuSeparatorRenderer');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

let sandbox;
let originalSandbox;

testSuite({
  setUp() {
    sandbox = dom.getElement('sandbox');
    originalSandbox = sandbox.cloneNode(true);
  },

  tearDown() {
    sandbox.parentNode.replaceChild(originalSandbox, sandbox);
  },

  testDecorate() {
    const separator = new MenuSeparator();
    const dummyId = 'foo';
    separator.setId(dummyId);
    assertEquals(dummyId, separator.getId());
    const renderer = new MenuSeparatorRenderer();
    renderer.decorate(separator, dom.getElement('separator'));
    assertEquals('separator', separator.getId());
  },
});
