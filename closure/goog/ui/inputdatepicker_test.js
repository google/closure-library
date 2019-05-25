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

goog.module('goog.ui.InputDatePickerTest');
goog.setTestOnly();

const DateTimeFormat = goog.require('goog.i18n.DateTimeFormat');
const DateTimeParse = goog.require('goog.i18n.DateTimeParse');
const InputDatePicker = goog.require('goog.ui.InputDatePicker');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

const dateTimeFormatter = new DateTimeFormat('MM/dd/yyyy');
const dateTimeParser = new DateTimeParse('MM/dd/yyyy');

let inputDatePicker;
let popupDatePicker;

/**
 * Creates a new InputDatePicker and calls setPopupParentElement with the
 * specified element, if provided. If el is null, then setPopupParentElement
 * is not called.
 * @param {Element} el If non-null, the argument to pass to
 *     inputDatePicker.setPopupParentElement().
 */
function setPopupParentElement(el) {
  inputDatePicker = new InputDatePicker(dateTimeFormatter, dateTimeParser);

  if (el) {
    inputDatePicker.setPopupParentElement(el);
  }

  inputDatePicker.render(dom.getElement('renderElement'));
  popupDatePicker = inputDatePicker.popupDatePicker_;
}

testSuite({
  setUp() {},

  tearDown() {
    if (inputDatePicker) {
      inputDatePicker.dispose();
    }
    if (popupDatePicker) {
      popupDatePicker.dispose();
    }
    dom.removeChildren(dom.getElement('renderElement'));
    dom.removeChildren(dom.getElement('popupParent'));
  },

  /**
   * Ensure that if setPopupParentElement is not called, that the
   * PopupDatePicker is parented to the body element.
   */
  test_setPopupParentElementDefault() {
    setPopupParentElement(null);
    assertEquals(
        'PopupDatePicker should be parented to the body element', document.body,
        popupDatePicker.getElement().parentNode);
  },

  /**
   * Ensure that if setPopupParentElement is called, that the
   * PopupDatePicker is parented to the specified element.
   */
  test_setPopupParentElement() {
    const popupParentElement = dom.getElement('popupParent');
    setPopupParentElement(popupParentElement);
    assertEquals(
        'PopupDatePicker should be parented to the popupParent DIV',
        popupParentElement, popupDatePicker.getElement().parentNode);
  },

  test_ItParsesDataCorrectly() {
    inputDatePicker = new InputDatePicker(dateTimeFormatter, dateTimeParser);
    inputDatePicker.render(dom.getElement('renderElement'));

    inputDatePicker.createDom();
    inputDatePicker.setInputValue('8/9/2009');

    const parsedDate = inputDatePicker.getInputValueAsDate_();
    assertEquals(2009, parsedDate.getYear());
    assertEquals(7, parsedDate.getMonth());  // Months start from 0
    assertEquals(9, parsedDate.getDate());
  },

  test_ItUpdatesItsValueOnPopupShown() {
    inputDatePicker = new InputDatePicker(dateTimeFormatter, dateTimeParser);

    setPopupParentElement(null);
    inputDatePicker.setInputValue('1/1/1');
    inputDatePicker.showForElement(document.body);
    const inputValue = inputDatePicker.getInputValue();
    assertEquals('01/01/0001', inputValue);
  },

  test_ItDoesNotClearInputOnPopupShown() {
    // if popup does not have a date set, don't update input value
    inputDatePicker = new InputDatePicker(dateTimeFormatter, dateTimeParser);

    setPopupParentElement(null);
    inputDatePicker.setInputValue('i_am_not_a_date');
    inputDatePicker.showForElement(document.body);
    const inputValue = inputDatePicker.getInputValue();
    assertEquals('i_am_not_a_date', inputValue);
  },
});
