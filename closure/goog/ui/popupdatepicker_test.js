// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.ui.PopupDatePickerTest');
goog.setTestOnly('goog.ui.PopupDatePickerTest');

goog.require('goog.date.Date');
goog.require('goog.events');
goog.require('goog.testing.MockControl');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');
goog.require('goog.ui.DatePicker');
goog.require('goog.ui.PopupBase');
goog.require('goog.ui.PopupDatePicker');

var mockControl;
var popupDatePicker;

function setUp() {
  mockControl = new goog.testing.MockControl();
  popupDatePicker = new goog.ui.PopupDatePicker();
}

function tearDown() {
  popupDatePicker.dispose();
  mockControl.$tearDown();
}

function testIsVisible() {
  assertFalse(popupDatePicker.isVisible());
  popupDatePicker.createDom();
  assertFalse(popupDatePicker.isVisible());
  popupDatePicker.render();
  assertFalse(popupDatePicker.isVisible());
  popupDatePicker.showPopup(document.body);
  assertTrue(popupDatePicker.isVisible());
  popupDatePicker.hidePopup();
  assertFalse(popupDatePicker.isVisible());
}

function testFiresShowAndHideEvents() {
  var showHandler = goog.testing.recordFunction();
  var hideHandler = goog.testing.recordFunction();
  goog.events.listen(
      popupDatePicker, goog.ui.PopupBase.EventType.SHOW, showHandler);
  goog.events.listen(
      popupDatePicker, goog.ui.PopupBase.EventType.HIDE, hideHandler);
  popupDatePicker.createDom();
  popupDatePicker.render();
  assertEquals(0, showHandler.getCallCount());
  assertEquals(0, hideHandler.getCallCount());

  popupDatePicker.showPopup(document.body);
  // Bug in goog.ui.Popup: the SHOW event is fired twice.
  assertEquals(2, showHandler.getCallCount());
  assertEquals(0, hideHandler.getCallCount());
  showHandler.reset();

  popupDatePicker.hidePopup();
  assertEquals(0, showHandler.getCallCount());
  assertEquals(1, hideHandler.getCallCount());
}

function testShow() {
  popupDatePicker.createDom();
  popupDatePicker.render();
  var datePicker = popupDatePicker.getDatePicker();
  var date = new goog.date.Date();

  // Date should be overwritten when opt_keepDate not specified.
  datePicker.setDate(date);
  popupDatePicker.showPopup(document.body, undefined /* opt_keepDate */);
  assertNull(datePicker.getDate());

  // Date should be overwritten when opt_keepDate is false.
  datePicker.setDate(date);
  popupDatePicker.showPopup(document.body, false /* opt_keepDate */);
  assertNull(datePicker.getDate());

  // Date should be preserved when opt_keepDate is true.
  datePicker.setDate(date);
  popupDatePicker.showPopup(document.body, true /* opt_keepDate */);
  assertTrue(date.equals(datePicker.getDate()));
}

/**
 * Tests that repositioning based on DatePicker growth happens if the flag is
 * enabled.
 */
function testRepositioning_whenDatePickerGrows_withFlagEnabled() {
  // Given a PopupDatePicker showing with KeepAllWeeksInViewport = true.
  popupDatePicker.setKeepAllWeeksInViewport(true);
  popupDatePicker.createDom();
  popupDatePicker.render();
  var datePicker = popupDatePicker.getDatePicker();
  var date = new goog.date.Date();

  datePicker.setDate(date);
  popupDatePicker.showPopup(document.body, undefined /* opt_keepDate */);

  mockControl.createMethodMock(popupDatePicker.popup_, 'reposition');

  // Expect the PopupDatePicker to reposition.
  popupDatePicker.popup_.reposition().$once();

  mockControl.$replayAll();

  // When the DatePicker reports a size increase.
  datePicker.dispatchEvent(goog.ui.DatePicker.Events.GRID_SIZE_INCREASE);
  mockControl.$verifyAll();
}

/**
 * Tests that repositioning based on DatePicker growth does not happen if the
 * flag is disabled.
 */
function testRepositioning_whenDatePickerGrows_withFlagDisabled() {
  // Given a PopupDatePicker showing with KeepAllWeeksInViewport = false,
  // default state.
  popupDatePicker.createDom();
  popupDatePicker.render();
  var datePicker = popupDatePicker.getDatePicker();
  var date = new goog.date.Date();

  datePicker.setDate(date);
  popupDatePicker.showPopup(document.body, undefined /* opt_keepDate */);

  mockControl.createMethodMock(popupDatePicker.popup_, 'reposition');

  // Expect the PopupDatePicker not to reposition.
  popupDatePicker.popup_.reposition().$never();

  mockControl.$replayAll();

  // When the DatePicker reports a size increase.
  datePicker.dispatchEvent(goog.ui.DatePicker.Events.GRID_SIZE_INCREASE);
  mockControl.$verifyAll();
}
