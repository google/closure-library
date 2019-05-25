// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.HsvaPaletteTest');
goog.setTestOnly();

const Coordinate = goog.require('goog.math.Coordinate');
const GoogEvent = goog.require('goog.events.Event');
const HsvaPalette = goog.require('goog.ui.HsvaPalette');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const TagName = goog.require('goog.dom.TagName');
const classlist = goog.require('goog.dom.classlist');
const colorAlpha = goog.require('goog.color.alpha');
const style = goog.require('goog.style');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let samplePalette;
const eventWasFired = false;
const stubs = new PropertyReplacer();

testSuite({
  setUp() {
    samplePalette = new HsvaPalette();
  },

  tearDown() {
    samplePalette.dispose();
    stubs.reset();
  },

  testZeroAlpha() {
    const palette = new HsvaPalette(null, undefined, 0);
    assertEquals(0, palette.getAlpha());
  },

  testOptionalInitialColor() {
    const alpha = 0.5;
    const color = '#0000ff';
    const palette = new HsvaPalette(null, color, alpha);
    assertEquals(color, palette.getColor());
    assertEquals(alpha, palette.getAlpha());
  },

  testCustomClassName() {
    const customClassName = 'custom-plouf';
    const customClassPalette =
        new HsvaPalette(null, null, null, customClassName);
    customClassPalette.createDom();
    assertTrue(
        classlist.contains(customClassPalette.getElement(), customClassName));
  },

  testSetColor() {
    let color = '#abcdef01';
    samplePalette.setColorRgbaHex(color);
    assertEquals(color, colorAlpha.parse(samplePalette.getColorRgbaHex()).hex);
    color = 'abcdef01';
    samplePalette.setColorRgbaHex(color);
    assertEquals(
        `#${color}`, colorAlpha.parse(samplePalette.getColorRgbaHex()).hex);
  },

  testRender() {
    samplePalette.render(document.getElementById('sandbox'));

    assertTrue(samplePalette.isInDocument());

    const elem = samplePalette.getElement();
    assertNotNull(elem);
    assertEquals(String(TagName.DIV), elem.tagName);

    if (userAgent.IE && !userAgent.isVersionOrHigher('7')) {
      assertSameElements(
          'On IE6, the noalpha class must be present',
          ['goog-hsva-palette', 'goog-hsva-palette-noalpha'],
          classlist.get(elem));
    } else {
      assertEquals(
          'The noalpha class must not be present', 'goog-hsva-palette',
          elem.className);
    }
  },

  testInputColor() {
    samplePalette.render(document.getElementById('sandbox'));
    const color = '#00112233';
    samplePalette.inputElement.value = color;
    samplePalette.handleInput(null);
    assertEquals(color, colorAlpha.parse(samplePalette.getColorRgbaHex()).hex);
  },

  testHandleMouseMoveAlpha() {
    samplePalette.render(document.getElementById('sandbox'));
    stubs.set(goog.dom, 'getPageScroll', () => new Coordinate(0, 0));

    // Lowering the opacity of a dark, opaque red should yield a
    // more transparent red.
    samplePalette.setColorRgbaHex('#630c0000');
    style.setPageOffset(samplePalette.aImageEl_, 0, 0);
    style.setSize(samplePalette.aImageEl_, 10, 100);
    const boundaries = style.getBounds(samplePalette.aImageEl_);

    const event = new GoogEvent();
    event.clientY = boundaries.top;
    samplePalette.handleMouseMoveA_(boundaries, event);

    assertEquals('#630c00ff', samplePalette.getColorRgbaHex());
  },

  testSwatchOpacity() {
    samplePalette.render(document.getElementById('sandbox'));

    samplePalette.setAlpha(1);
    assertEquals(1, style.getOpacity(samplePalette.swatchElement));

    samplePalette.setAlpha(0x99 / 0xff);
    assertEquals(0.6, style.getOpacity(samplePalette.swatchElement));

    samplePalette.setAlpha(0);
    assertEquals(0, style.getOpacity(samplePalette.swatchElement));
  },

  testNoTransparencyBehavior() {
    samplePalette.render(document.getElementById('sandbox'));

    samplePalette.inputElement.value = '#abcdef22';
    samplePalette.handleInput(null);
    samplePalette.inputElement.value = '#abcdef';
    samplePalette.handleInput(null);
    assertEquals(1, style.getOpacity(samplePalette.swatchElement));
  },
});
