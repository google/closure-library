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

goog.module('goog.positioning.AnchoredPositionTest');
goog.setTestOnly();

const AnchoredPosition = goog.require('goog.positioning.AnchoredPosition');
const Corner = goog.require('goog.positioning.Corner');
const Overflow = goog.require('goog.positioning.Overflow');
const googDom = goog.require('goog.dom');
const style = goog.require('goog.style');
const testSuite = goog.require('goog.testing.testSuite');

let anchor;
let doc;
let dom;
let frame;
let popup;
let viewportSize;

const popupLength = 20;
const anchorLength = 100;

// No enough space at the bottom and no overflow adjustment.

// No enough space at the bottom and ADJUST_Y overflow adjustment.

testSuite({
  setUp() {
    frame = document.getElementById('frame1');
    doc = googDom.getFrameContentDocument(frame);
    dom = googDom.getDomHelper(doc);
    viewportSize = dom.getViewportSize();
    anchor = dom.getElement('anchor');
    popup = dom.getElement('popup');
    style.setSize(popup, popupLength, popupLength);
    style.setPosition(popup, popupLength, popupLength);
    style.setSize(anchor, anchorLength, anchorLength);
  },

  testRepositionWithDefaultOverflow() {
    const avp = new AnchoredPosition(anchor, Corner.BOTTOM_LEFT);
    const newTop = viewportSize.height - anchorLength;
    style.setPosition(anchor, 50, newTop);
    const anchorRect = style.getBounds(anchor);

    avp.reposition(popup, Corner.TOP_LEFT);
    const popupRect = style.getBounds(popup);
    assertEquals(anchorRect.top + anchorRect.height, popupRect.top);
  },

  testRepositionWithOverflow() {
    const avp =
        new AnchoredPosition(anchor, Corner.BOTTOM_LEFT, Overflow.ADJUST_Y);
    const newTop = viewportSize.height - anchorLength;
    style.setPosition(anchor, 50, newTop);
    const anchorRect = style.getBounds(anchor);

    avp.reposition(popup, Corner.TOP_LEFT);
    const popupRect = style.getBounds(popup);
    assertEquals(
        anchorRect.top + anchorRect.height, popupRect.top + popupRect.height);
  },
});
