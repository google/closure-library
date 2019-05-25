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

goog.module('goog.positioning.MenuAnchoredPositionTest');
goog.setTestOnly();

const Corner = goog.require('goog.positioning.Corner');
const MenuAnchoredPosition = goog.require('goog.positioning.MenuAnchoredPosition');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

let offscreenAnchor;
let onscreenAnchor;
let customAnchor;
let menu;
let savedMenuHtml;

testSuite({
  setUp() {
    offscreenAnchor = dom.getElement('offscreen-anchor');
    onscreenAnchor = dom.getElement('onscreen-anchor');
    customAnchor = dom.getElement('custom-anchor');
    customAnchor.style.left = '0';
    customAnchor.style.top = '0';

    menu = dom.getElement('menu');
    savedMenuHtml = menu.innerHTML;
    menu.style.left = '20px';
    menu.style.top = '20px';
  },

  tearDown() {
    menu.innerHTML = savedMenuHtml;
  },

  testRepositionWithAdjustAndOnscreenAnchor() {
    // Add so many children that it can't possibly fit onscreen.
    for (let i = 0; i < 200; i++) {
      menu.appendChild(dom.createDom(TagName.DIV, null, `New Item ${i}`));
    }

    const pos = new MenuAnchoredPosition(onscreenAnchor, Corner.TOP_LEFT, true);
    pos.reposition(menu, Corner.TOP_LEFT);

    const offset = 0;
    assertEquals(offset, menu.offsetTop);
    assertEquals(5, menu.offsetLeft);
  },

  testRepositionWithAdjustAndOffscreenAnchor() {
    // This does not get adjusted because it's too far offscreen.
    const pos =
        new MenuAnchoredPosition(offscreenAnchor, Corner.TOP_LEFT, true);
    pos.reposition(menu, Corner.TOP_LEFT);

    assertEquals(-1000, menu.offsetTop);
    assertEquals(-1000, menu.offsetLeft);
  },

  testRespositionFailoverEvenWhenResizeHeightIsOn() {
    const pos =
        new MenuAnchoredPosition(onscreenAnchor, Corner.TOP_LEFT, true, true);
    pos.reposition(menu, Corner.TOP_RIGHT);

    // The menu should not get positioned offscreen.
    assertEquals(5, menu.offsetTop);
    assertEquals(5, menu.offsetLeft);
  },

  testRepositionToBottomLeftWhenBottomFailsAndRightFailsAndResizeOn() {
    const pageSize = dom.getViewportSize();
    customAnchor.style.left = (pageSize.width - 10) + 'px';

    // Add so many children that it can't possibly fit onscreen.
    for (let i = 0; i < 200; i++) {
      menu.appendChild(dom.createDom(TagName.DIV, null, `New Item ${i}`));
    }

    const pos =
        new MenuAnchoredPosition(customAnchor, Corner.TOP_LEFT, true, true);
    pos.reposition(menu, Corner.TOP_LEFT);
    assertEquals(menu.offsetLeft + menu.offsetWidth, customAnchor.offsetLeft);
  },
});
