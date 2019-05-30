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

goog.module('goog.ui.HsvPaletteTest');
goog.setTestOnly();

const Component = goog.require('goog.ui.Component');
const Coordinate = goog.require('goog.math.Coordinate');
const GoogEvent = goog.require('goog.events.Event');
const HsvPalette = goog.require('goog.ui.HsvPalette');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const TagName = goog.require('goog.dom.TagName');
const classlist = goog.require('goog.dom.classlist');
const events = goog.require('goog.events');
const googColor = goog.require('goog.color');
const style = goog.require('goog.style');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let samplePalette;
let eventWasFired;
const stubs = new PropertyReplacer();

testSuite({
  setUp() {
    samplePalette = new HsvPalette();
    eventWasFired = false;
  },

  tearDown() {
    samplePalette.dispose();
    stubs.reset();
  },

  testRtl() {
    samplePalette.render(document.getElementById('sandboxRtl'));
    const color = '#ffffff';
    samplePalette.inputElement.value = color;
    samplePalette.handleInput(null);
    const expectedRight = samplePalette.hsImageEl_.offsetWidth -
        Math.ceil(samplePalette.hsHandleEl_.offsetWidth / 2);
    assertEquals(
        `${expectedRight}px`, samplePalette.hsHandleEl_.style['right']);
    assertEquals('', samplePalette.hsHandleEl_.style['left']);
  },

  testOptionalInitialColor() {
    const initialColor = '#0000ff';
    const customInitialPalette = new HsvPalette(null, initialColor);
    assertEquals(
        initialColor, googColor.parse(customInitialPalette.getColor()).hex);
  },

  testCustomClassName() {
    const customClassName = 'custom-plouf';
    const customClassPalette = new HsvPalette(null, null, customClassName);
    customClassPalette.createDom();
    assertTrue(
        classlist.contains(customClassPalette.getElement(), customClassName));
  },

  testCannotDecorate() {
    assertFalse(samplePalette.canDecorate());
  },

  testSetColor() {
    let color = '#abcdef';
    samplePalette.setColor(color);
    assertEquals(color, googColor.parse(samplePalette.getColor()).hex);
    color = 'abcdef';
    samplePalette.setColor(color);
    assertEquals(`#${color}`, googColor.parse(samplePalette.getColor()).hex);
  },

  testChangeEventWithDisableDispatchEventOmitted() {
    // TODO(user): Add functionality to goog.testing.events to assert
    // an event was fired.
    events.listen(samplePalette, Component.EventType.ACTION, () => {
      eventWasFired = true;
    });
    samplePalette.setColor('#123456');
    assertTrue(eventWasFired);
  },

  testChangeEventWithDisableDispatchEventTrue() {
    events.listen(samplePalette, Component.EventType.ACTION, () => {
      eventWasFired = true;
    });
    samplePalette.setColor('#123456', true);
    assertFalse(eventWasFired);
  },

  testChangeEventWithDisableDispatchEventFalse() {
    events.listen(samplePalette, Component.EventType.ACTION, () => {
      eventWasFired = true;
    });
    samplePalette.setColor('#123456', false);
    assertTrue(eventWasFired);
  },

  testSetHsv() {
    // Start from red.
    samplePalette.setColor('#ff0000');

    // Setting hue to 0.5 should yield cyan.
    samplePalette.setHsv(0.5, null, null);
    assertEquals('#00ffff', googColor.parse(samplePalette.getColor()).hex);

    // Setting saturation to 0 should yield white.
    samplePalette.setHsv(null, 0, null);
    assertEquals('#ffffff', googColor.parse(samplePalette.getColor()).hex);

    // Setting value/brightness to 0 should yield black.
    samplePalette.setHsv(null, null, 0);
    assertEquals('#000000', googColor.parse(samplePalette.getColor()).hex);
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
          ['goog-hsv-palette', 'goog-hsv-palette-noalpha'],
          classlist.get(elem));
    } else {
      assertEquals(
          'The noalpha class must not be present', 'goog-hsv-palette',
          elem.className);
    }
  },

  testRenderWithEnableBrowserSpellcheckOnInputFalse() {
    samplePalette.render(document.getElementById('sandbox'));

    const inputElement =
        samplePalette.getRequiredElementByClass('goog-hsv-palette-input');
    assertFalse(inputElement.spellcheck);
  },

  testSwatchTextIsReadable() {
    samplePalette.render(document.getElementById('sandbox'));

    const swatchElement = samplePalette.swatchElement;

    // Text should be black when background is light.
    samplePalette.setColor('#ccffff');
    assertEquals(
        '#000000', googColor.parse(style.getStyle(swatchElement, 'color')).hex);

    // Text should be white when background is dark.
    samplePalette.setColor('#410800');
    assertEquals(
        '#ffffff', googColor.parse(style.getStyle(swatchElement, 'color')).hex);
  },

  testInputColor() {
    samplePalette.render(document.getElementById('sandbox'));
    const color = '#001122';
    samplePalette.inputElement.value = color;
    samplePalette.handleInput(null);
    assertEquals(color, googColor.parse(samplePalette.getColor()).hex);
  },

  testHandleMouseMoveValue() {
    samplePalette.render(document.getElementById('sandbox'));
    stubs.set(goog.dom, 'getPageScroll', () => new Coordinate(0, 0));

    // Raising the value/brightness of a dark red should yield a lighter red.
    samplePalette.setColor('#630c00');
    style.setPageOffset(samplePalette.valueBackgroundImageElement, 0, 0);
    style.setSize(samplePalette.valueBackgroundImageElement, 10, 100);
    const boundaries =
        style.getBounds(samplePalette.valueBackgroundImageElement, 0, 0);

    const event = new GoogEvent();
    event.clientY = -50;
    // TODO(user): Use
    // goog.testing.events.fireMouseDownEvent(
    //     samplePalette.valueBackgroundImageElement);
    // when google.testing.events support specifying properties of the event
    // or find out how tod o it if it already supports it.
    samplePalette.handleMouseMoveV_(boundaries, event);
    assertEquals('#ff1e00', googColor.parse(samplePalette.getColor()).hex);
  },

  testHandleMouseMoveHueSaturation() {
    samplePalette.render(document.getElementById('sandbox'));
    stubs.set(goog.dom, 'getPageScroll', () => new Coordinate(0, 0));

    // The following hue/saturation selection should yield a light yellow.
    style.setPageOffset(samplePalette.hsImageEl_, 0, 0);
    style.setSize(samplePalette.hsImageEl_, 100, 100);
    const boundaries = style.getBounds(samplePalette.hsImageEl_);

    const event = new GoogEvent();
    event.clientX = 20;
    event.clientY = 85;
    // TODO(user): Use goog.testing.events when appropriate (see above).
    samplePalette.handleMouseMoveHs_(boundaries, event);
    assertEquals('#ffeec4', googColor.parse(samplePalette.getColor()).hex);
  },
});
