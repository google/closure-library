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

goog.provide('goog.editor.plugins.AbstractBubblePluginTest');
goog.setTestOnly('goog.editor.plugins.AbstractBubblePluginTest');

goog.require('goog.dom');
goog.require('goog.editor.plugins.AbstractBubblePlugin');
goog.require('goog.events.BrowserEvent');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.functions');
goog.require('goog.style');
goog.require('goog.testing.editor.FieldMock');
goog.require('goog.testing.editor.TestHelper');
goog.require('goog.testing.events');
goog.require('goog.testing.events.Event');
goog.require('goog.testing.jsunit');
goog.require('goog.ui.editor.Bubble');
goog.require('goog.userAgent');

var testHelper;
var fieldDiv;
var COMMAND = 'base';
var FIELDMOCK;
var bubblePlugin;
var link;
var link2;

function setUpPage() {
  fieldDiv = goog.dom.getElement('field');
  var viewportSize = goog.dom.getViewportSize();
  // Some tests depends on enough size of viewport.
  if (viewportSize.width < 600 || viewportSize.height < 440) {
    window.moveTo(0, 0);
    window.resizeTo(640, 480);
  }
}

function setUp() {
  testHelper = new goog.testing.editor.TestHelper(fieldDiv);
  testHelper.setUpEditableElement();
  FIELDMOCK = new goog.testing.editor.FieldMock();

  bubblePlugin = new goog.editor.plugins.AbstractBubblePlugin(COMMAND);
  bubblePlugin.fieldObject = FIELDMOCK;

  fieldDiv.innerHTML = '<a href="http://www.google.com">Google</a>' +
      '<a href="http://www.google.com">Google2</a>';
  link = fieldDiv.firstChild;
  link2 = fieldDiv.lastChild;

  window.scrollTo(0, 0);
  goog.style.setStyle(document.body, 'direction', 'ltr');
  goog.style.setStyle(document.getElementById('field'), 'position', 'static');
}

function tearDown() {
  bubblePlugin.closeBubble();
  testHelper.tearDownEditableElement();
}


/**
 * This is a helper function for setting up the targetElement with a
 * given direction.
 *
 * @param {string} dir The direction of the targetElement, 'ltr' or 'rtl'.
 */
function prepareTargetWithGivenDirection(dir) {
  goog.style.setStyle(document.body, 'direction', dir);

  fieldDiv.style.direction = dir;
  fieldDiv.innerHTML = '<a href="http://www.google.com">Google</a>';
  link = fieldDiv.firstChild;

  FIELDMOCK.$replay();
  bubblePlugin.createBubbleContents = function(bubbleContainer) {
    bubbleContainer.innerHTML = '<div style="border:1px solid blue;">B</div>';
    goog.style.setStyle(bubbleContainer, 'border', '1px solid white');
  };
  bubblePlugin.registerFieldObject(FIELDMOCK);
  bubblePlugin.enable(FIELDMOCK);
  bubblePlugin.createBubble(link);
}

function helpTestCreateBubble(opt_fn) {
  FIELDMOCK.$replay();
  var numCalled = 0;
  bubblePlugin.createBubbleContents = function(bubbleContainer) {
    numCalled++;
    assertNotNull('bubbleContainer should not be null', bubbleContainer);
  };
  if (opt_fn) {
    opt_fn();
  }
  bubblePlugin.createBubble(link);
  assertEquals('createBubbleContents should be called', 1, numCalled);
  FIELDMOCK.$verify();
}

function testCreateBubble(opt_fn) {
  helpTestCreateBubble(opt_fn);
  assertTrue(bubblePlugin.getSharedBubble_() instanceof goog.ui.editor.Bubble);

  assertTrue('Bubble should be visible', bubblePlugin.isVisible());
}

function testOpeningBubbleCallsOnShow() {
  var numCalled = 0;
  testCreateBubble(function() {
    bubblePlugin.onShow = function() {
      numCalled++;
    };
  });

  assertEquals('onShow should be called', 1, numCalled);
  FIELDMOCK.$verify();
}

function testCloseBubble() {
  testCreateBubble();

  bubblePlugin.closeBubble();
  assertFalse('Bubble should not be visible', bubblePlugin.isVisible());
  FIELDMOCK.$verify();
}

function testZindexBehavior() {
  // Don't use the default return values.
  FIELDMOCK.$reset();
  FIELDMOCK.getAppWindow().$anyTimes().$returns(window);
  FIELDMOCK.getEditableDomHelper().$anyTimes()
      .$returns(goog.dom.getDomHelper(document));
  FIELDMOCK.getBaseZindex().$returns(2);
  bubblePlugin.createBubbleContents = goog.nullFunction;
  FIELDMOCK.$replay();

  bubblePlugin.createBubble(link);
  assertEquals('2',
      '' + bubblePlugin.getSharedBubble_().bubbleContainer_.style.zIndex);

  FIELDMOCK.$verify();
}

function testNoTwoBubblesOpenAtSameTime() {
  FIELDMOCK.$replay();
  var origClose = goog.bind(bubblePlugin.closeBubble, bubblePlugin);
  var numTimesCloseCalled = 0;
  bubblePlugin.closeBubble = function() {
    numTimesCloseCalled++;
    origClose();
  };
  bubblePlugin.getBubbleTargetFromSelection = goog.functions.identity;
  bubblePlugin.createBubbleContents = goog.nullFunction;

  bubblePlugin.handleSelectionChangeInternal(link);
  assertEquals(0, numTimesCloseCalled);
  assertEquals(link, bubblePlugin.targetElement_);
  FIELDMOCK.$verify();

  bubblePlugin.handleSelectionChangeInternal(link2);
  assertEquals(1, numTimesCloseCalled);
  assertEquals(link2, bubblePlugin.targetElement_);
  FIELDMOCK.$verify();
}

function testHandleSelectionChangeWithEvent() {
  FIELDMOCK.$replay();
  var fakeEvent =
      new goog.events.BrowserEvent({type: 'mouseup', target: link});
  bubblePlugin.getBubbleTargetFromSelection = goog.functions.identity;
  bubblePlugin.createBubbleContents = goog.nullFunction;
  bubblePlugin.handleSelectionChange(fakeEvent);
  assertTrue('Bubble should have been opened', bubblePlugin.isVisible());
  assertEquals('Bubble target should be provided event\'s target',
               link, bubblePlugin.targetElement_);
}

function testHandleSelectionChangeWithTarget() {
  FIELDMOCK.$replay();
  bubblePlugin.getBubbleTargetFromSelection = goog.functions.identity;
  bubblePlugin.createBubbleContents = goog.nullFunction;
  bubblePlugin.handleSelectionChange(undefined, link2);
  assertTrue('Bubble should have been opened', bubblePlugin.isVisible());
  assertEquals('Bubble target should be provided target',
               link2, bubblePlugin.targetElement_);
}


/**
 * Regression test for @bug 2945341
 */
function testSelectOneTextCharacterNoError() {
  FIELDMOCK.$replay();
  bubblePlugin.getBubbleTargetFromSelection = goog.functions.identity;
  bubblePlugin.createBubbleContents = goog.nullFunction;
  // Select first char of first link's text node.
  testHelper.select(link.firstChild, 0, link.firstChild, 1);
  // This should execute without js errors.
  bubblePlugin.handleSelectionChange();
  assertTrue('Bubble should have been opened', bubblePlugin.isVisible());
  FIELDMOCK.$verify();
}

function testTabKeyEvents() {
  FIELDMOCK.$replay();
  bubblePlugin.enableKeyboardNavigation(true /* enable link tabbing */);
  bubblePlugin.getBubbleTargetFromSelection = goog.functions.identity;
  var bubbleLink1, bubbleLink2;
  bubblePlugin.createBubbleContents = function(container) {
    bubbleLink1 = this.createLink('linkInBubble1', 'Foo', false, container);
    bubbleLink2 = this.createLink('linkInBubble2', 'Bar', false, container);
  };
  bubblePlugin.handleSelectionChangeInternal(link);

  assertTrue('Bubble should be visible', bubblePlugin.isVisible());

  var tabHandledByBubble = simulateTabKeyOnBubble();
  assertTrue('The action should be handled by the plugin', tabHandledByBubble);
  assertFocused(bubbleLink1);

  // Tab on the first link. The test framework doesn't easily let us verify
  // the desired behavior - namely, that the second link gets focused - but at
  // least we verify that the field doesn't get the focused.
  goog.testing.events.fireKeySequence(bubbleLink1, goog.events.KeyCodes.TAB);

  FIELDMOCK.$verify();

  // Tabbing on the last link should trigger focus() of the target field.
  FIELDMOCK.resetClientTestExpectations();
  FIELDMOCK.focus();
  FIELDMOCK.$replay();
  goog.testing.events.fireKeySequence(bubbleLink2, goog.events.KeyCodes.TAB);
  FIELDMOCK.$verify();
}

function testTabKeyEventsWithShiftKey() {
  FIELDMOCK.$replay();
  bubblePlugin.enableKeyboardNavigation(true /* enable link tabbing */);
  bubblePlugin.getBubbleTargetFromSelection = goog.functions.identity;
  var bubbleLink1;
  bubblePlugin.createBubbleContents = function(container) {
    bubbleLink1 = this.createLink('linkInBubble1', 'Foo', false, container);
    // The test acts only on one link, but we give another one to make sure
    // that the link we act on is not also the last.
    this.createLink('linkInBubble2', 'Bar', false, container);
  };
  bubblePlugin.handleSelectionChangeInternal(link);

  assertTrue('Bubble should be visible', bubblePlugin.isVisible());

  var tabHandledByBubble = simulateTabKeyOnBubble();
  assertTrue('The action should be handled by the plugin', tabHandledByBubble);
  assertFocused(bubbleLink1);
  FIELDMOCK.$verify();

  // Shift-tabbing on the first link should trigger focus() of the target field.
  FIELDMOCK.resetClientTestExpectations();
  FIELDMOCK.focus();
  FIELDMOCK.$replay();
  goog.testing.events.fireKeySequence(
      bubbleLink1, goog.events.KeyCodes.TAB, {shiftKey: true});
  FIELDMOCK.$verify();
}

function testTabKeyNoEffectKeyboardNavDisabled() {
  FIELDMOCK.$replay();
  bubblePlugin.getBubbleTargetFromSelection = goog.functions.identity;
  var bubbleLink;
  bubblePlugin.createBubbleContents = function(container) {
    bubbleLink = this.createLink('linkInBubble', 'Foo', false, container);
  };
  bubblePlugin.handleSelectionChangeInternal(link);

  assertTrue('Bubble should be visible', bubblePlugin.isVisible());

  var tabHandledByBubble = simulateTabKeyOnBubble();
  assertFalse('The action should not be handled by the plugin',
      tabHandledByBubble);
  assertNotFocused(bubbleLink);

  // Verify that tabbing the link doesn't cause focus of the field.
  goog.testing.events.fireKeySequence(bubbleLink, goog.events.KeyCodes.TAB);

  FIELDMOCK.$verify();
}

function testOtherKeyEventNoEffectKeyboardNavEnabled() {
  FIELDMOCK.$replay();
  bubblePlugin.enableKeyboardNavigation(true /* enable link tabbing */);
  bubblePlugin.getBubbleTargetFromSelection = goog.functions.identity;
  var bubbleLink;
  bubblePlugin.createBubbleContents = function(container) {
    bubbleLink = this.createLink('linkInBubble', 'Foo', false, container);
  };
  bubblePlugin.handleSelectionChangeInternal(link);

  assertTrue('Bubble should be visible', bubblePlugin.isVisible());

  // Test pressing CTRL + B: this should not have any effect.
  var keyHandledByBubble =
      simulateKeyDownOnBubble(goog.events.KeyCodes.B, true);

  assertFalse('The action should not be handled by the plugin',
      keyHandledByBubble);
  assertNotFocused(bubbleLink);

  FIELDMOCK.$verify();
}


/**
 * Sends a tab key event to the bubble.
 * @return {boolean} whether the bubble hanlded the event.
 */
function simulateTabKeyOnBubble() {
  return simulateKeyDownOnBubble(goog.events.KeyCodes.TAB, false);
}


/**
 * Sends a key event to the bubble.
 * @param {number} keyCode
 * @param {boolean} isCtrl
 * @return {boolean} whether the bubble hanlded the event.
 */
function simulateKeyDownOnBubble(keyCode, isCtrl) {
  // In some browsers (e.g. FireFox) the editable field is marked with
  // designMode on. In the test setting (and not in production setting), the
  // bubble element shares the same window and hence the designMode. In this
  // mode, activeElement remains the <body> and isn't changed along with the
  // focus as a result of tab key.
  bubblePlugin.getSharedBubble_().getContentElement().
      ownerDocument.designMode = 'off';

  var event =
      new goog.testing.events.Event(goog.events.EventType.KEYDOWN, null);
  event.keyCode = keyCode;
  event.ctrlKey = isCtrl;
  return bubblePlugin.handleKeyDown(event);
}


function assertFocused(element) {
  // The activeElement assertion below doesn't work in IE7. At this time IE7 is
  // no longer supported by any client product, so we don't care.
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(8)) {
    return;
  }
  assertEquals('unexpected focus', element, document.activeElement);
}


function assertNotFocused(element) {
  assertNotEquals('unexpected focus', element, document.activeElement);
}
