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

goog.module('goog.graphics.CanvasGraphicsTest');
goog.setTestOnly();

const CanvasGraphics = goog.require('goog.graphics.CanvasGraphics');
const SolidFill = goog.require('goog.graphics.SolidFill');
const Stroke = goog.require('goog.graphics.Stroke');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

let graphics;

function shouldRunTests() {
  graphics = new CanvasGraphics(100, 100);
  graphics.createDom();
  return graphics.canvas_.getContext;
}

testSuite({
  setUp() {
    graphics = new CanvasGraphics(100, 100);
    graphics.createDom();
    dom.getElement('root').appendChild(graphics.getElement());
    graphics.enterDocument();
  },

  tearDown() {
    graphics.dispose();
    dom.removeNode(graphics.getElement());
  },

  testDrawRemoveRect() {
    const fill = new SolidFill('red');
    const stroke = new Stroke('blue');
    const element = graphics.drawRect(10, 10, 80, 80, stroke, fill);
    assertEquals(1, graphics.canvasElement.children_.length);
    graphics.removeElement(element);
    assertEquals(0, graphics.canvasElement.children_.length);
  },

  testDrawRemoveNestedRect() {
    const fill = new SolidFill('red');
    const stroke = new Stroke('blue');
    const group = graphics.createGroup();
    assertEquals(1, graphics.canvasElement.children_.length);
    assertEquals(0, graphics.canvasElement.children_[0].children_.length);
    const element = graphics.drawRect(10, 10, 80, 80, stroke, fill, group);
    assertEquals(1, graphics.canvasElement.children_.length);
    assertEquals(1, graphics.canvasElement.children_[0].children_.length);
    graphics.removeElement(element);
    assertEquals(1, graphics.canvasElement.children_.length);
    assertEquals(0, graphics.canvasElement.children_[0].children_.length);
  },
});
