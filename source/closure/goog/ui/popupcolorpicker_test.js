// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.PopupColorPickerTest');
goog.setTestOnly();

const ColorPicker = goog.require('goog.ui.ColorPicker');
const PopupColorPicker = goog.require('goog.ui.PopupColorPicker');
const dom = goog.require('goog.dom');
const events = goog.require('goog.events');
const testSuite = goog.require('goog.testing.testSuite');
const testingEvents = goog.require('goog.testing.events');

// Unittest to ensure that the popup gets created in createDom().

// Unittest to ensure the popup opens with a custom color picker.

testSuite({
  testPopupCreation() {
    const picker = new PopupColorPicker();
    picker.createDom();
    assertNotNull(picker.getPopup());
  },

  testAutoHideIsSetProperly() {
    const picker = new PopupColorPicker();
    picker.createDom();
    picker.setAutoHide(true);
    const containingDiv = dom.getElement('containingDiv');
    picker.setAutoHideRegion(containingDiv);
    assertTrue(picker.getAutoHide());
    assertEquals(containingDiv, picker.getAutoHideRegion());
  },

  testCustomColorPicker() {
    const button1 = document.getElementById('button1');
    const domHelper = dom.getDomHelper();
    const colorPicker = new ColorPicker();
    colorPicker.setColors(['#ffffff', '#000000']);
    const picker = new PopupColorPicker(domHelper, colorPicker);
    picker.render();
    picker.attach(button1);
    assertNotNull(picker.getColorPicker());
    assertNotNull(picker.getPopup().getElement());
    assertNull(picker.getSelectedColor());

    let changeEvents = 0;
    events.listen(picker, ColorPicker.EventType.CHANGE, (e) => {
      changeEvents++;
    });

    // Select the first color.
    testingEvents.fireClickSequence(button1);
    testingEvents.fireClickSequence(
        document.getElementById('goog-palette-cell-0').firstChild);
    assertEquals('#ffffff', picker.getSelectedColor());
    assertEquals(1, changeEvents);
  },
});
