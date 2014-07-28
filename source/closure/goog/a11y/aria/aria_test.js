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
// limitations under the License.goog.provide('goog.a11y.ariaTest');

goog.provide('goog.a11y.ariaTest');
goog.setTestOnly('goog.a11y.ariaTest');

goog.require('goog.a11y.aria');
goog.require('goog.a11y.aria.Role');
goog.require('goog.a11y.aria.State');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.testing.jsunit');

var ARIA = goog.a11y.aria;
var Role = goog.a11y.aria.Role;
var State = goog.a11y.aria.State;
var sandbox;
var someDiv;
var someSpan;
var htmlButton;

function setUp() {
  sandbox = goog.dom.getElement('sandbox');
  someDiv = goog.dom.createDom(
      goog.dom.TagName.DIV, {id: 'someDiv'}, 'DIV');
  someSpan = goog.dom.createDom(
      goog.dom.TagName.SPAN, {id: 'someSpan'}, 'SPAN');
  htmlButton = goog.dom.createDom(
      goog.dom.TagName.BUTTON, {id: 'someButton'}, 'BUTTON');
  goog.dom.appendChild(sandbox, someDiv);
  goog.dom.appendChild(someDiv, someSpan);
}

function tearDown() {
  goog.dom.removeChildren(sandbox);
  someDiv = null;
  someSpan = null;
  htmlButton = null;
}

function testGetSetRole() {
  assertNull('someDiv\'s role should be null', ARIA.getRole(someDiv));
  assertNull('someSpan\'s role should be null', ARIA.getRole(someSpan));

  ARIA.setRole(someDiv, Role.MENU);
  ARIA.setRole(someSpan, Role.MENU_ITEM);

  assertEquals('someDiv\'s role should be MENU',
      Role.MENU, ARIA.getRole(someDiv));
  assertEquals('someSpan\'s role should be MENU_ITEM',
      Role.MENU_ITEM, ARIA.getRole(someSpan));

  var div = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.dom.appendChild(sandbox, div);
  goog.dom.appendChild(div, goog.dom.createDom(goog.dom.TagName.SPAN,
      {id: 'anotherSpan', role: Role.CHECKBOX}));
  assertEquals('anotherSpan\'s role should be CHECKBOX',
      Role.CHECKBOX, ARIA.getRole(goog.dom.getElement('anotherSpan')));
}

function testGetSetState() {
  assertThrows('Should throw because no state is specified.',
      function() {
        ARIA.getState(someDiv);
      });
  assertThrows('Should throw because no state is specified.',
      function() {
        ARIA.getState(someDiv);
      });
  ARIA.setState(someDiv, State.LABELLEDBY, 'someSpan');

  assertEquals('someDiv\'s labelledby state should be "someSpan"',
      'someSpan', ARIA.getState(someDiv, State.LABELLEDBY));

  // Test setting for aria-activedescendant with empty value.
  assertFalse(someDiv.hasAttribute ?
      someDiv.hasAttribute('aria-activedescendant') :
      !!someDiv.getAttribute('aria-activedescendant'));
  ARIA.setState(someDiv, State.ACTIVEDESCENDANT, 'someSpan');
  assertEquals('someSpan', ARIA.getState(someDiv, State.ACTIVEDESCENDANT));
  ARIA.setState(someDiv, State.ACTIVEDESCENDANT, '');
  assertFalse(someDiv.hasAttribute ?
      someDiv.hasAttribute('aria-activedescendant') :
      !!someDiv.getAttribute('aria-activedescendant'));

  // Test setting state that has a default value to empty value.
  assertFalse(someDiv.hasAttribute ?
      someDiv.hasAttribute('aria-relevant') :
      !!someDiv.getAttribute('aria-relevant'));
  ARIA.setState(someDiv, State.RELEVANT, ARIA.RelevantValues.TEXT);
  assertEquals(
      ARIA.RelevantValues.TEXT, ARIA.getState(someDiv, State.RELEVANT));
  ARIA.setState(someDiv, State.RELEVANT, '');
  assertEquals(
      ARIA.RelevantValues.ADDITIONS + ' ' + ARIA.RelevantValues.TEXT,
      ARIA.getState(someDiv, State.RELEVANT));
}

function testGetStateString() {
  ARIA.setState(someDiv, State.LABEL, 'test_label');
  ARIA.setState(
      someSpan, State.LABEL, ARIA.getStateString(someDiv, State.LABEL));
  assertEquals(ARIA.getState(someDiv, State.LABEL),
      ARIA.getState(someSpan, State.LABEL));
  assertEquals('The someDiv\'s enum value should be "test_label".',
      'test_label', ARIA.getState(someDiv, State.LABEL));
  assertEquals('The someSpan\'s enum value should be "copy move".',
      'test_label', ARIA.getStateString(someSpan, State.LABEL));
  ARIA.setState(someDiv, State.MULTILINE, true);
  var thrown = false;
  try {
    ARIA.getStateString(someDiv, State.MULTILINE);
  } catch (e) {
    thrown = true;
  }
  assertTrue('invalid use of getStateString on boolean.', thrown);
  ARIA.setState(someDiv, State.LIVE, ARIA.LivePriority.ASSERTIVE);
  thrown = false;
  ARIA.setState(someDiv, State.LEVEL, 1);
  try {
    ARIA.getStateString(someDiv, State.LEVEL);
  } catch (e) {
    thrown = true;
  }
  assertTrue('invalid use of getStateString on numbers.', thrown);
}


function testGetStateStringArray() {
  ARIA.setState(someDiv, State.LABELLEDBY, ['1', '2']);
  ARIA.setState(someSpan, State.LABELLEDBY,
      ARIA.getStringArrayStateInternalUtil(someDiv, State.LABELLEDBY));
  assertEquals(ARIA.getState(someDiv, State.LABELLEDBY),
      ARIA.getState(someSpan, State.LABELLEDBY));

  assertEquals('The someDiv\'s enum value should be "1 2".', '1 2',
      ARIA.getState(someDiv, State.LABELLEDBY));
  assertEquals('The someSpan\'s enum value should be "1 2".', '1 2',
      ARIA.getState(someSpan, State.LABELLEDBY));

  assertSameElements('The someDiv\'s enum value should be "1 2".',
      ['1', '2'],
      ARIA.getStringArrayStateInternalUtil(someDiv, State.LABELLEDBY));
  assertSameElements('The someSpan\'s enum value should be "1 2".',
      ['1', '2'],
      ARIA.getStringArrayStateInternalUtil(someSpan, State.LABELLEDBY));
}


function testGetStateNumber() {
  ARIA.setState(someDiv, State.LEVEL, 1);
  ARIA.setState(
      someSpan, State.LEVEL, ARIA.getStateNumber(someDiv, State.LEVEL));
  assertEquals(ARIA.getState(someDiv, State.LEVEL),
      ARIA.getState(someSpan, State.LEVEL));
  assertEquals('The someDiv\'s enum value should be "1".', '1',
      ARIA.getState(someDiv, State.LEVEL));
  assertEquals('The someSpan\'s enum value should be "1".', '1',
      ARIA.getState(someSpan, State.LEVEL));
  assertEquals('The someDiv\'s enum value should be "1".', 1,
      ARIA.getStateNumber(someDiv, State.LEVEL));
  assertEquals('The someSpan\'s enum value should be "1".', 1,
      ARIA.getStateNumber(someSpan, State.LEVEL));
  ARIA.setState(someDiv, State.MULTILINE, true);
  var thrown = false;
  try {
    ARIA.getStateNumber(someDiv, State.MULTILINE);
  } catch (e) {
    thrown = true;
  }
  assertTrue('invalid use of getStateNumber on boolean.', thrown);
  ARIA.setState(someDiv, State.LIVE, ARIA.LivePriority.ASSERTIVE);
  thrown = false;
  try {
    ARIA.getStateBoolean(someDiv, State.LIVE);
  } catch (e) {
    thrown = true;
  }
  assertTrue('invalid use of getStateNumber on strings.', thrown);
}

function testGetStateBoolean() {
  assertNull(ARIA.getStateBoolean(someDiv, State.MULTILINE));

  ARIA.setState(someDiv, State.MULTILINE, false);
  assertFalse(ARIA.getStateBoolean(someDiv, State.MULTILINE));

  ARIA.setState(someDiv, State.MULTILINE, true);
  ARIA.setState(someSpan, State.MULTILINE,
      ARIA.getStateBoolean(someDiv, State.MULTILINE));
  assertEquals(ARIA.getState(someDiv, State.MULTILINE),
      ARIA.getState(someSpan, State.MULTILINE));
  assertEquals('The someDiv\'s enum value should be "true".', 'true',
      ARIA.getState(someDiv, State.MULTILINE));
  assertEquals('The someSpan\'s enum value should be "true".', 'true',
      ARIA.getState(someSpan, State.MULTILINE));
  assertEquals('The someDiv\'s enum value should be "true".', true,
      ARIA.getStateBoolean(someDiv, State.MULTILINE));
  assertEquals('The someSpan\'s enum value should be "true".', true,
      ARIA.getStateBoolean(someSpan, State.MULTILINE));
  ARIA.setState(someDiv, State.LEVEL, 1);
  var thrown = false;
  try {
    ARIA.getStateBoolean(someDiv, State.LEVEL);
  } catch (e) {
    thrown = true;
  }
  assertTrue('invalid use of getStateBoolean on numbers.', thrown);
  ARIA.setState(someDiv, State.LIVE, ARIA.LivePriority.ASSERTIVE);
  thrown = false;
  try {
    ARIA.getStateBoolean(someDiv, State.LIVE);
  } catch (e) {
    thrown = true;
  }
  assertTrue('invalid use of getStateBoolean on strings.', thrown);
}

function testGetSetActiveDescendant() {
  ARIA.setActiveDescendant(someDiv, null);
  assertNull('someDiv\'s activedescendant should be null',
      ARIA.getActiveDescendant(someDiv));

  ARIA.setActiveDescendant(someDiv, someSpan);

  assertEquals('someDiv\'s active descendant should be "someSpan"',
      someSpan, ARIA.getActiveDescendant(someDiv));
}

function testGetSetLabel() {
  assertEquals('someDiv\'s label should be ""', '', ARIA.getLabel(someDiv));

  ARIA.setLabel(someDiv, 'somelabel');
  assertEquals('someDiv\'s label should be "somelabel"', 'somelabel',
      ARIA.getLabel(someDiv));
}
