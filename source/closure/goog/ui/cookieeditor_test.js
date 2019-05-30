// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.CookieEditorTest');
goog.setTestOnly();

const CookieEditor = goog.require('goog.ui.CookieEditor');
const EventType = goog.require('goog.events.EventType');
const GoogEvent = goog.require('goog.events.Event');
const cookies = goog.require('goog.net.cookies');
const dom = goog.require('goog.dom');
const events = goog.require('goog.testing.events');
const testSuite = goog.require('goog.testing.testSuite');

const COOKIE_KEY = 'my_fabulous_cookie';
let COOKIE_VALUES;

cookies.get = (key) => COOKIE_VALUES[key];

cookies.set = (key, value) => COOKIE_VALUES[key] = value;

cookies.remove = (key, value) => {
  delete COOKIE_VALUES[key];
};

function newCookieEditor(cookieValue = undefined) {
  // Set cookie.
  if (cookieValue) {
    cookies.set(COOKIE_KEY, cookieValue);
  }

  // Render editor.
  const editor = new CookieEditor();
  editor.selectCookie(COOKIE_KEY);
  editor.render(dom.getElement('test_container'));
  assertEquals(
      'wrong text area value', cookieValue || '',
      editor.textAreaElem_.value || '');

  return editor;
}

testSuite({
  setUp() {
    dom.removeChildren(dom.getElement('test_container'));
    COOKIE_VALUES = {};
  },

  testRender() {
    // Render editor.
    const editor = newCookieEditor();

    // All expected elements created?
    const elem = editor.getElement();
    assertNotNullNorUndefined('missing element', elem);
    assertNotNullNorUndefined('missing clear button', editor.clearButtonElem_);
    assertNotNullNorUndefined(
        'missing update button', editor.updateButtonElem_);
    assertNotNullNorUndefined('missing text area', editor.textAreaElem_);
  },

  testEditCookie() {
    // Render editor.
    const editor = newCookieEditor();

    // Invalid value.
    let newValue = 'my bad value;';
    editor.textAreaElem_.value = newValue;
    events.fireBrowserEvent(
        new GoogEvent(EventType.CLICK, editor.updateButtonElem_));
    assertTrue('unexpected cookie value', !cookies.get(COOKIE_KEY));

    // Valid value.
    newValue = 'my fabulous value';
    editor.textAreaElem_.value = newValue;
    events.fireBrowserEvent(
        new GoogEvent(EventType.CLICK, editor.updateButtonElem_));
    assertEquals('wrong cookie value', newValue, cookies.get(COOKIE_KEY));
  },

  testClearCookie() {
    // Render editor.
    const value = 'I will be cleared';
    const editor = newCookieEditor(value);

    // Clear value.
    events.fireBrowserEvent(
        new GoogEvent(EventType.CLICK, editor.clearButtonElem_));
    assertTrue('unexpected cookie value', !cookies.get(COOKIE_KEY));
  },
});
