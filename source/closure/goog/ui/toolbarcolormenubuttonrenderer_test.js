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

goog.module('goog.ui.ToolbarColorMenuButtonRendererTest');
goog.setTestOnly();

const RendererHarness = goog.require('goog.testing.ui.RendererHarness');
const ToolbarColorMenuButton = goog.require('goog.ui.ToolbarColorMenuButton');
const ToolbarColorMenuButtonRenderer = goog.require('goog.ui.ToolbarColorMenuButtonRenderer');
const dom = goog.require('goog.dom');
const rendererasserts = goog.require('goog.testing.ui.rendererasserts');
const testSuite = goog.require('goog.testing.testSuite');

let harness;

testSuite({
  setUp() {
    harness = new RendererHarness(
        ToolbarColorMenuButtonRenderer.getInstance(), dom.getElement('parent'),
        dom.getElement('decoratedButton'));
  },

  tearDown() {
    harness.dispose();
  },

  testEquality() {
    harness.attachControlAndRender(new ToolbarColorMenuButton('Foo'));
    harness.attachControlAndDecorate(new ToolbarColorMenuButton());
    harness.assertDomMatches();
  },

  testDoesntCallGetCssClassInConstructor() {
    rendererasserts.assertNoGetCssClassCallsInConstructor(
        ToolbarColorMenuButtonRenderer);
  },
});
