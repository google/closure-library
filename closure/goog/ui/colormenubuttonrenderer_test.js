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

goog.module('goog.ui.ColorMenuButtonTest');
goog.setTestOnly();

const ColorMenuButton = goog.require('goog.ui.ColorMenuButton');
const ColorMenuButtonRenderer = goog.require('goog.ui.ColorMenuButtonRenderer');
const RendererHarness = goog.require('goog.testing.ui.RendererHarness');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const rendererasserts = goog.require('goog.testing.ui.rendererasserts');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let harness;

testSuite({
  setUp() {
    harness = new RendererHarness(
        ColorMenuButtonRenderer.getInstance(), dom.getElement('parent'),
        dom.getElement('decoratedButton'));
  },

  tearDown() {
    harness.dispose();
  },

  testEquality() {
    harness.attachControlAndRender(new ColorMenuButton('Foo'));
    harness.attachControlAndDecorate(new ColorMenuButton());
    harness.assertDomMatches();
  },

  testWrapCaption() {
    const caption = dom.createDom(TagName.DIV, null, 'Foo');
    const wrappedCaption =
        ColorMenuButtonRenderer.wrapCaption(caption, dom.getDomHelper());
    assertNotEquals(
        'Caption should have been wrapped', caption, wrappedCaption);
    assertEquals(
        'Wrapped caption should have indicator css class',
        'goog-color-menu-button-indicator', wrappedCaption.className);
  },

  testSetCaptionValue() {
    const caption = dom.createDom(TagName.DIV, null, 'Foo');
    const wrappedCaption =
        ColorMenuButtonRenderer.wrapCaption(caption, dom.getDomHelper());
    ColorMenuButtonRenderer.setCaptionValue(wrappedCaption, 'red');

    const expectedColor = userAgent.IE && !userAgent.isDocumentModeOrHigher(9) ?
        '#ff0000' :
        'rgb(255, 0, 0)';
    assertEquals(expectedColor, caption.style.borderBottomColor);
  },

  testDoesntCallGetCssClassInConstructor() {
    rendererasserts.assertNoGetCssClassCallsInConstructor(
        ColorMenuButtonRenderer);
  },
});
