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

goog.module('goog.editor.plugins.AbstractBubblePluginTest');
goog.setTestOnly();

const AbstractBubblePlugin = goog.require('goog.editor.plugins.AbstractBubblePlugin');
const BrowserEvent = goog.require('goog.events.BrowserEvent');
const Bubble = goog.require('goog.ui.editor.Bubble');
const EventType = goog.require('goog.events.EventType');
const FieldMock = goog.require('goog.testing.editor.FieldMock');
const GoogTestingEvent = goog.require('goog.testing.events.Event');
const KeyCodes = goog.require('goog.events.KeyCodes');
const TagName = goog.require('goog.dom.TagName');
const TestHelper = goog.require('goog.testing.editor.TestHelper');
const dom = goog.require('goog.dom');
const events = goog.require('goog.testing.events');
const functions = goog.require('goog.functions');
const style = goog.require('goog.style');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let testHelper;
let fieldDiv;
const COMMAND = 'base';
let fieldMock;
let bubblePlugin;
let link;
let link2;

/**
 * This is a helper function for setting up the targetElement with a
 * given direction.
 * @param {string} dir The direction of the targetElement, 'ltr' or 'rtl'.
 */
function prepareTargetWithGivenDirection(dir) {
  style.setStyle(document.body, 'direction', dir);

  fieldDiv.style.direction = dir;
  fieldDiv.innerHTML = '<a href="http://www.google.com">Google</a>';
  link = fieldDiv.firstChild;

  fieldMock.$replay();
  bubblePlugin.createBubbleContents = (bubbleContainer) => {
    bubbleContainer.innerHTML = '<div style="border:1px solid blue;">B</div>';
    style.setStyle(bubbleContainer, 'border', '1px solid white');
  };
  bubblePlugin.registerFieldObject(fieldMock);
  bubblePlugin.enable(fieldMock);
  bubblePlugin.createBubble(link);
}

/**
 * Similar in intent to mock reset, but implemented by recreating the mock
 * variable. $reset() can't work because it will reset general any-time
 * expectations done in the fieldMock constructor.
 */
function resetFieldMock() {
  fieldMock = new FieldMock();
  bubblePlugin.fieldObject = fieldMock;
}

function helpTestCreateBubble(fn = undefined) {
  fieldMock.$replay();
  let numCalled = 0;
  bubblePlugin.createBubbleContents = (bubbleContainer) => {
    numCalled++;
    assertNotNull('bubbleContainer should not be null', bubbleContainer);
  };
  if (fn) {
    fn();
  }
  bubblePlugin.createBubble(link);
  assertEquals('createBubbleContents should be called', 1, numCalled);
  fieldMock.$verify();
}

/**
 * Sends a tab key event to the bubble.
 * @return {boolean} whether the bubble hanlded the event.
 */
function simulateTabKeyOnBubble() {
  return simulateKeyDownOnBubble(KeyCodes.TAB, false);
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
  if (userAgent.GECKO) {
    bubblePlugin.getSharedBubble_()
        .getContentElement()
        .ownerDocument.designMode = 'off';
  }

  const event = new GoogTestingEvent(EventType.KEYDOWN, null);
  event.keyCode = keyCode;
  event.ctrlKey = isCtrl;
  return bubblePlugin.handleKeyDown(event);
}

function assertFocused(element) {
  // The activeElement assertion below doesn't work in IE7. At this time IE7 is
  // no longer supported by any client product, so we don't care.
  if (userAgent.IE && !userAgent.isVersionOrHigher(8)) {
    return;
  }
  assertEquals('unexpected focus', element, document.activeElement);
}

function assertNotFocused(element) {
  assertNotEquals('unexpected focus', element, document.activeElement);
}
testSuite({
  setUpPage() {
    fieldDiv = dom.getElement('field');
    const viewportSize = dom.getViewportSize();
    // Some tests depends on enough size of viewport.
    if (viewportSize.width < 600 || viewportSize.height < 440) {
      window.moveTo(0, 0);
      window.resizeTo(640, 480);
    }
  },

  setUp() {
    testHelper = new TestHelper(fieldDiv);
    testHelper.setUpEditableElement();
    fieldMock = new FieldMock();

    bubblePlugin = new AbstractBubblePlugin(COMMAND);
    bubblePlugin.fieldObject = fieldMock;

    fieldDiv.innerHTML = '<a href="http://www.google.com">Google</a>' +
        '<a href="http://www.google.com">Google2</a>';
    link = fieldDiv.firstChild;
    link2 = fieldDiv.lastChild;

    window.scrollTo(0, 0);
    style.setStyle(document.body, 'direction', 'ltr');
    style.setStyle(document.getElementById('field'), 'position', 'static');
  },

  tearDown() {
    bubblePlugin.closeBubble();
    testHelper.tearDownEditableElement();
  },

  testCreateBubble(fn = undefined) {
    helpTestCreateBubble(fn);
    assertTrue(bubblePlugin.getSharedBubble_() instanceof Bubble);

    assertTrue('Bubble should be visible', bubblePlugin.isVisible());
  },

  testOpeningBubbleCallsOnShow() {
    let numCalled = 0;
    this.testCreateBubble(() => {
      bubblePlugin.onShow = () => {
        numCalled++;
      };
    });

    assertEquals('onShow should be called', 1, numCalled);
    fieldMock.$verify();
  },

  testCloseBubble() {
    this.testCreateBubble();

    bubblePlugin.closeBubble();
    assertFalse('Bubble should not be visible', bubblePlugin.isVisible());
    fieldMock.$verify();
  },

  testZindexBehavior() {
    // Don't use the default return values.
    fieldMock.$reset();
    fieldMock.getAppWindow().$anyTimes().$returns(window);
    fieldMock.getEditableDomHelper().$anyTimes().$returns(
        dom.getDomHelper(document));
    fieldMock.getBaseZindex().$returns(2);
    bubblePlugin.createBubbleContents = goog.nullFunction;
    fieldMock.$replay();

    bubblePlugin.createBubble(link);
    assertEquals(
        '2',
        '' + bubblePlugin.getSharedBubble_().bubbleContainer_.style.zIndex);

    fieldMock.$verify();
  },

  testNoTwoBubblesOpenAtSameTime() {
    fieldMock.$replay();
    const origClose = goog.bind(bubblePlugin.closeBubble, bubblePlugin);
    let numTimesCloseCalled = 0;
    bubblePlugin.closeBubble = () => {
      numTimesCloseCalled++;
      origClose();
    };
    bubblePlugin.getBubbleTargetFromSelection = functions.identity;
    bubblePlugin.createBubbleContents = goog.nullFunction;

    bubblePlugin.handleSelectionChangeInternal(link);
    assertEquals(0, numTimesCloseCalled);
    assertEquals(link, bubblePlugin.targetElement_);
    fieldMock.$verify();

    bubblePlugin.handleSelectionChangeInternal(link2);
    assertEquals(1, numTimesCloseCalled);
    assertEquals(link2, bubblePlugin.targetElement_);
    fieldMock.$verify();
  },

  testHandleSelectionChangeWithEvent() {
    fieldMock.$replay();
    const fakeEvent = new BrowserEvent({type: 'mouseup', target: link});
    bubblePlugin.getBubbleTargetFromSelection = functions.identity;
    bubblePlugin.createBubbleContents = goog.nullFunction;
    bubblePlugin.handleSelectionChange(fakeEvent);
    assertTrue('Bubble should have been opened', bubblePlugin.isVisible());
    assertEquals(
        'Bubble target should be provided event\'s target', link,
        bubblePlugin.targetElement_);
  },

  testHandleSelectionChangeWithTarget() {
    fieldMock.$replay();
    bubblePlugin.getBubbleTargetFromSelection = functions.identity;
    bubblePlugin.createBubbleContents = goog.nullFunction;
    bubblePlugin.handleSelectionChange(undefined, link2);
    assertTrue('Bubble should have been opened', bubblePlugin.isVisible());
    assertEquals(
        'Bubble target should be provided target', link2,
        bubblePlugin.targetElement_);
  },

  /** Regression test for @bug 2945341 */
  testSelectOneTextCharacterNoError() {
    fieldMock.$replay();
    bubblePlugin.getBubbleTargetFromSelection = functions.identity;
    bubblePlugin.createBubbleContents = goog.nullFunction;
    // Select first char of first link's text node.
    testHelper.select(link.firstChild, 0, link.firstChild, 1);
    // This should execute without js errors.
    bubblePlugin.handleSelectionChange();
    assertTrue('Bubble should have been opened', bubblePlugin.isVisible());
    fieldMock.$verify();
  },

  testTabKeyEvents() {
    fieldMock.$replay();
    bubblePlugin.enableKeyboardNavigation(true);
    bubblePlugin.getBubbleTargetFromSelection = functions.identity;
    let nonTabbable1;
    let tabbable1;
    let tabbable2;
    let nonTabbable2;
    bubblePlugin.createBubbleContents = (container) => {
      nonTabbable1 = dom.createDom(TagName.DIV);
      tabbable1 = dom.createDom(TagName.DIV);
      tabbable2 = dom.createDom(TagName.DIV);
      nonTabbable2 = dom.createDom(TagName.DIV);
      dom.append(container, nonTabbable1, tabbable1, tabbable2, nonTabbable2);
      bubblePlugin.setTabbable(tabbable1);
      bubblePlugin.setTabbable(tabbable2);
    };
    bubblePlugin.handleSelectionChangeInternal(link);
    assertTrue('Bubble should be visible', bubblePlugin.isVisible());

    const tabHandledByBubble = simulateTabKeyOnBubble();
    assertTrue(
        'The action should be handled by the plugin', tabHandledByBubble);
    assertFocused(tabbable1);

    // Tab on the first tabbable. The test framework doesn't easily let us
    // verify the desired behavior - namely, that the second tabbable gets
    // focused - but we verify that the field doesn't get the focus.
    events.fireKeySequence(tabbable1, KeyCodes.TAB);

    fieldMock.$verify();

    // Tabbing on the last tabbable should trigger focus() of the target field.
    resetFieldMock();
    fieldMock.focus();
    fieldMock.$replay();
    events.fireKeySequence(tabbable2, KeyCodes.TAB);
    fieldMock.$verify();
  },

  testTabKeyEventsWithShiftKey() {
    fieldMock.$replay();
    bubblePlugin.enableKeyboardNavigation(true);
    bubblePlugin.getBubbleTargetFromSelection = functions.identity;
    let nonTabbable;
    let tabbable1;
    let tabbable2;
    bubblePlugin.createBubbleContents = (container) => {
      nonTabbable = dom.createDom(TagName.DIV);
      tabbable1 = dom.createDom(TagName.DIV);
      // The test acts only on one tabbable, but we give another one to make
      // sure that the tabbable we act on is not also the last.
      tabbable2 = dom.createDom(TagName.DIV);
      dom.append(container, nonTabbable, tabbable1, tabbable2);
      bubblePlugin.setTabbable(tabbable1);
      bubblePlugin.setTabbable(tabbable2);
    };
    bubblePlugin.handleSelectionChangeInternal(link);

    assertTrue('Bubble should be visible', bubblePlugin.isVisible());

    const tabHandledByBubble = simulateTabKeyOnBubble();
    assertTrue(
        'The action should be handled by the plugin', tabHandledByBubble);
    assertFocused(tabbable1);
    fieldMock.$verify();

    // Shift-tabbing on the first tabbable should trigger focus() of the target
    // field.
    resetFieldMock();
    fieldMock.focus();
    fieldMock.$replay();
    events.fireKeySequence(tabbable1, KeyCodes.TAB, {shiftKey: true});
    fieldMock.$verify();
  },

  testLinksAreTabbable() {
    fieldMock.$replay();
    bubblePlugin.enableKeyboardNavigation(true);
    bubblePlugin.getBubbleTargetFromSelection = functions.identity;
    let nonTabbable1;
    let nonTabbable2;
    let bubbleLink1;
    let bubbleLink2;
    bubblePlugin.createBubbleContents = function(container) {
      nonTabbable1 = dom.createDom(TagName.DIV);
      dom.appendChild(container, nonTabbable1);
      bubbleLink1 = this.createLink('linkInBubble1', 'Foo', false, container);
      bubbleLink2 = this.createLink('linkInBubble2', 'Bar', false, container);
      nonTabbable2 = dom.createDom(TagName.DIV);
      dom.appendChild(container, nonTabbable2);
    };
    bubblePlugin.handleSelectionChangeInternal(link);
    assertTrue('Bubble should be visible', bubblePlugin.isVisible());

    const tabHandledByBubble = simulateTabKeyOnBubble();
    assertTrue(
        'The action should be handled by the plugin', tabHandledByBubble);
    assertFocused(bubbleLink1);

    fieldMock.$verify();

    // Tabbing on the last link should trigger focus() of the target field.
    resetFieldMock();
    fieldMock.focus();
    fieldMock.$replay();
    events.fireKeySequence(bubbleLink2, KeyCodes.TAB);
    fieldMock.$verify();
  },

  testTabKeyNoEffectKeyboardNavDisabled() {
    fieldMock.$replay();
    bubblePlugin.getBubbleTargetFromSelection = functions.identity;
    let bubbleLink;
    bubblePlugin.createBubbleContents = function(container) {
      bubbleLink = this.createLink('linkInBubble', 'Foo', false, container);
    };
    bubblePlugin.handleSelectionChangeInternal(link);

    assertTrue('Bubble should be visible', bubblePlugin.isVisible());

    const tabHandledByBubble = simulateTabKeyOnBubble();
    assertFalse(
        'The action should not be handled by the plugin', tabHandledByBubble);
    assertNotFocused(bubbleLink);

    // Verify that tabbing the link doesn't cause focus of the field.
    events.fireKeySequence(bubbleLink, KeyCodes.TAB);

    fieldMock.$verify();
  },

  testOtherKeyEventNoEffectKeyboardNavEnabled() {
    fieldMock.$replay();
    bubblePlugin.enableKeyboardNavigation(true);
    bubblePlugin.getBubbleTargetFromSelection = functions.identity;
    let bubbleLink;
    bubblePlugin.createBubbleContents = function(container) {
      bubbleLink = this.createLink('linkInBubble', 'Foo', false, container);
    };
    bubblePlugin.handleSelectionChangeInternal(link);

    assertTrue('Bubble should be visible', bubblePlugin.isVisible());

    // Test pressing CTRL + B: this should not have any effect.
    const keyHandledByBubble = simulateKeyDownOnBubble(KeyCodes.B, true);

    assertFalse(
        'The action should not be handled by the plugin', keyHandledByBubble);
    assertNotFocused(bubbleLink);

    fieldMock.$verify();
  },

  testSetTabbableSetsTabIndex() {
    const element1 = dom.createDom(TagName.DIV);
    const element2 = dom.createDom(TagName.DIV);
    element1.setAttribute('tabIndex', '1');

    bubblePlugin.setTabbable(element1);
    bubblePlugin.setTabbable(element2);

    assertEquals('1', element1.getAttribute('tabIndex'));
    assertEquals('0', element2.getAttribute('tabIndex'));
  },

  testDisable() {
    this.testCreateBubble();
    fieldMock.setUneditable(true);
    bubblePlugin.disable(fieldMock);
    bubblePlugin.closeBubble();
  },
});
