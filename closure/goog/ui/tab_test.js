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

goog.module('goog.ui.TabTest');
goog.setTestOnly();

const Component = goog.require('goog.ui.Component');
const TabRenderer = goog.require('goog.ui.TabRenderer');
const UiTab = goog.require('goog.ui.Tab');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

let sandbox;
let tab;

testSuite({
  setUp() {
    sandbox = dom.getElement('sandbox');
    tab = new UiTab('Hello');
  },

  tearDown() {
    tab.dispose();
    dom.removeChildren(sandbox);
  },

  testConstructor() {
    assertNotNull('Tab must not be null', tab);
    assertEquals('Tab must have expected content', 'Hello', tab.getContent());
    assertEquals(
        'Tab\'s renderer must default to TabRenderer',
        TabRenderer.getInstance(), tab.getRenderer());
    assertTrue(
        'Tab must support the SELECTED state',
        tab.isSupportedState(Component.State.SELECTED));
    assertTrue(
        'SELECTED must be an auto-state',
        tab.isAutoState(Component.State.SELECTED));
    assertTrue(
        'Tab must dispatch transition events for the DISABLED state',
        tab.isDispatchTransitionEvents(Component.State.DISABLED));
    assertTrue(
        'Tab must dispatch transition events for the SELECTED state',
        tab.isDispatchTransitionEvents(Component.State.SELECTED));
  },

  testGetSetTooltip() {
    assertUndefined('Tooltip must be undefined by default', tab.getTooltip());
    tab.setTooltip('Hello, world!');
    assertEquals(
        'Tooltip must have expected value', 'Hello, world!', tab.getTooltip());
  },

  testSetAriaLabel() {
    assertNull('Tab must not have aria label by default', tab.getAriaLabel());
    tab.setAriaLabel('My tab');
    tab.render();
    const element = tab.getElementStrict();
    assertNotNull('Element must not be null', element);
    assertEquals(
        'Tab element must have expected aria-label', 'My tab',
        element.getAttribute('aria-label'));
    assertEquals(
        'Tab element must have expected aria role', 'tab',
        element.getAttribute('role'));
    tab.setAriaLabel('My new tab');
    assertEquals(
        'Tab element must have updated aria-label', 'My new tab',
        element.getAttribute('aria-label'));
    assertEquals(
        'Tab element must have expected aria role', 'tab',
        element.getAttribute('role'));
  },
});
