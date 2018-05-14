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

goog.provide('goog.testing.eventsTest');
goog.setTestOnly('goog.testing.eventsTest');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.InputType');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.math.Coordinate');
goog.require('goog.string');
goog.require('goog.style');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.events');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');
goog.require('goog.userAgent');

var firedEventTypes;
var firedEventCoordinates;
var firedScreenCoordinates;
var firedShiftKeys;
var firedKeyCodes;
var root;
var log;
var input;
var testButton;
var parentEl;
var childEl;
var coordinate = new goog.math.Coordinate(123, 456);
var stubs = new goog.testing.PropertyReplacer();
var eventCount;

function setUpPage() {
  root = goog.dom.getElement('root');
  log = goog.dom.getElement('log');
  input = goog.dom.getElement('input');
  testButton = goog.dom.getElement('testButton');
  parentEl = goog.dom.getElement('parentEl');
  childEl = goog.dom.getElement('childEl');
}

function setUp() {
  stubs.reset();
  goog.events.removeAll(root);
  goog.events.removeAll(log);
  goog.events.removeAll(input);
  goog.events.removeAll(testButton);
  goog.events.removeAll(parentEl);
  goog.events.removeAll(childEl);

  goog.dom.removeChildren(root);
  firedEventTypes = [];
  firedEventCoordinates = [];
  firedScreenCoordinates = [];
  firedShiftKeys = [];
  firedKeyCodes = [];

  for (var key in goog.events.EventType) {
    goog.events.listen(root, goog.events.EventType[key], function(e) {
      firedEventTypes.push(e.type);
      var coord = new goog.math.Coordinate(e.clientX, e.clientY);
      firedEventCoordinates.push(coord);

      firedScreenCoordinates.push(
          new goog.math.Coordinate(e.screenX, e.screenY));

      firedShiftKeys.push(!!e.shiftKey);
      firedKeyCodes.push(e.keyCode);
    });
  }

  eventCount =
      {parentBubble: 0, parentCapture: 0, childCapture: 0, childBubble: 0};
  // Event listeners for the capture/bubble test.
  goog.events.listen(parentEl, goog.events.EventType.CLICK, function(e) {
    eventCount.parentCapture++;
    assertEquals(parentEl, e.currentTarget);
    assertEquals(childEl, e.target);
  }, true);
  goog.events.listen(childEl, goog.events.EventType.CLICK, function(e) {
    eventCount.childCapture++;
    assertEquals(childEl, e.currentTarget);
    assertEquals(childEl, e.target);
  }, true);
  goog.events.listen(childEl, goog.events.EventType.CLICK, function(e) {
    eventCount.childBubble++;
    assertEquals(childEl, e.currentTarget);
    assertEquals(childEl, e.target);
  });
  goog.events.listen(parentEl, goog.events.EventType.CLICK, function(e) {
    eventCount.parentBubble++;
    assertEquals(parentEl, e.currentTarget);
    assertEquals(childEl, e.target);
  });
}

function tearDownPage() {
  for (var key in goog.events.EventType) {
    var type = goog.events.EventType[key];
    if (type == 'mousemove' || type == 'mouseout' || type == 'mouseover') {
      continue;
    }
    goog.dom.appendChild(
        input, goog.dom.createDom(
                   goog.dom.TagName.LABEL, null,
                   goog.dom.createDom(
                       goog.dom.TagName.INPUT,
                       {'id': type, 'type': goog.dom.InputType.CHECKBOX}),
                   type, goog.dom.createDom(goog.dom.TagName.BR)));
    goog.events.listen(testButton, type, function(e) {
      if (goog.dom.getElement(e.type).checked) {
        e.preventDefault();
      }

      log.innerHTML +=
          goog.string.subs('<br />%s (%s, %s)', e.type, e.clientX, e.clientY);
    });
  }
}

function testMouseEnter() {
  goog.testing.events.fireMouseEnterEvent(root, null);
  goog.testing.events.fireMouseEnterEvent(root, null, coordinate);
  assertEventTypes(['mouseenter', 'mouseenter']);
  assertCoordinates([goog.style.getClientPosition(root), coordinate]);
}

function testMouseLeave() {
  goog.testing.events.fireMouseLeaveEvent(root, null);
  goog.testing.events.fireMouseLeaveEvent(root, null, coordinate);
  assertEventTypes(['mouseleave', 'mouseleave']);
  assertCoordinates([goog.style.getClientPosition(root), coordinate]);
}

function testMouseOver() {
  goog.testing.events.fireMouseOverEvent(root, null);
  goog.testing.events.fireMouseOverEvent(root, null, coordinate);
  assertEventTypes(['mouseover', 'mouseover']);
  assertCoordinates([goog.style.getClientPosition(root), coordinate]);
}

function testMouseOut() {
  goog.testing.events.fireMouseOutEvent(root, null);
  goog.testing.events.fireMouseOutEvent(root, null, coordinate);
  assertEventTypes(['mouseout', 'mouseout']);
  assertCoordinates([goog.style.getClientPosition(root), coordinate]);
}

function testFocus() {
  goog.testing.events.fireFocusEvent(root);
  assertEventTypes(['focus']);
}

function testFocusIn() {
  goog.testing.events.fireFocusInEvent(root);
  assertEventTypes([goog.events.EventType.FOCUSIN]);
}

function testBlur() {
  goog.testing.events.fireBlurEvent(root);
  assertEventTypes(['blur']);
}

function testClickSequence() {
  assertTrue(goog.testing.events.fireClickSequence(root));
  assertEventTypes(['mousedown', 'mouseup', 'click']);
  var rootPosition = goog.style.getClientPosition(root);
  assertCoordinates([rootPosition, rootPosition, rootPosition]);
}

function testClickSequenceWithCoordinate() {
  assertTrue(goog.testing.events.fireClickSequence(root, null, coordinate));
  assertCoordinates([coordinate, coordinate, coordinate]);
  assertArrayEquals([false, false, false], firedShiftKeys);
}

function testTouchStart() {
  goog.testing.events.fireTouchStartEvent(root);
  goog.testing.events.fireTouchStartEvent(root, coordinate);
  assertEventTypes(['touchstart', 'touchstart']);
  assertCoordinates([goog.style.getClientPosition(root), coordinate]);
}

function testTouchMove() {
  goog.testing.events.fireTouchMoveEvent(root);
  goog.testing.events.fireTouchMoveEvent(root, coordinate, {touches: []});
  assertEventTypes(['touchmove', 'touchmove']);
  assertCoordinates([goog.style.getClientPosition(root), coordinate]);
}

function testTouchEnd() {
  goog.testing.events.fireTouchEndEvent(root);
  goog.testing.events.fireTouchEndEvent(root, coordinate);
  assertEventTypes(['touchend', 'touchend']);
  assertCoordinates([goog.style.getClientPosition(root), coordinate]);
}

function testTouchSequence() {
  assertTrue(goog.testing.events.fireTouchSequence(root));
  assertEventTypes(['touchstart', 'touchend']);
  var rootPosition = goog.style.getClientPosition(root);
  assertCoordinates([rootPosition, rootPosition]);
}

function testTouchSequenceWithCoordinate() {
  assertTrue(goog.testing.events.fireTouchSequence(root, coordinate));
  assertCoordinates([coordinate, coordinate]);
}

function testClickSequenceWithEventProperty() {
  assertTrue(
      goog.testing.events.fireClickSequence(
          root, null, undefined, {shiftKey: true}));
  assertArrayEquals([true, true, true], firedShiftKeys);
}

function testClickSequenceCancellingMousedown() {
  preventDefaultEventType('mousedown');
  assertFalse(goog.testing.events.fireClickSequence(root));
  assertEventTypes(['mousedown', 'mouseup', 'click']);
}

function testClickSequenceCancellingMousedownWithCoordinate() {
  preventDefaultEventType('mousedown');
  assertFalse(goog.testing.events.fireClickSequence(root, null, coordinate));
  assertCoordinates([coordinate, coordinate, coordinate]);
}

function testClickSequenceCancellingMouseup() {
  preventDefaultEventType('mouseup');
  assertFalse(goog.testing.events.fireClickSequence(root));
  assertEventTypes(['mousedown', 'mouseup', 'click']);
}

function testClickSequenceCancellingMouseupWithCoordinate() {
  preventDefaultEventType('mouseup');
  assertFalse(goog.testing.events.fireClickSequence(root, null, coordinate));
  assertCoordinates([coordinate, coordinate, coordinate]);
}

function testClickSequenceCancellingClick() {
  preventDefaultEventType('click');
  assertFalse(goog.testing.events.fireClickSequence(root));
  assertEventTypes(['mousedown', 'mouseup', 'click']);
}

function testClickSequenceCancellingClickWithCoordinate() {
  preventDefaultEventType('click');
  assertFalse(goog.testing.events.fireClickSequence(root, null, coordinate));
  assertCoordinates([coordinate, coordinate, coordinate]);
}

// For a double click, IE fires selectstart instead of the second mousedown,
// but we don't simulate selectstart. Also, IE doesn't fire the second click.
var DBLCLICK_SEQ =
    (goog.userAgent.IE ?
         ['mousedown', 'mouseup', 'click', 'mouseup', 'dblclick'] :
         [
           'mousedown', 'mouseup', 'click', 'mousedown', 'mouseup', 'click',
           'dblclick'
         ]);


var DBLCLICK_SEQ_COORDS = goog.array.repeat(coordinate, DBLCLICK_SEQ.length);

function testDoubleClickSequence() {
  assertTrue(goog.testing.events.fireDoubleClickSequence(root));
  assertEventTypes(DBLCLICK_SEQ);
}

function testDoubleClickSequenceWithCoordinate() {
  assertTrue(goog.testing.events.fireDoubleClickSequence(root, coordinate));
  assertCoordinates(DBLCLICK_SEQ_COORDS);
}

function testDoubleClickSequenceCancellingMousedown() {
  preventDefaultEventType('mousedown');
  assertFalse(goog.testing.events.fireDoubleClickSequence(root));
  assertEventTypes(DBLCLICK_SEQ);
}

function testDoubleClickSequenceCancellingMousedownWithCoordinate() {
  preventDefaultEventType('mousedown');
  assertFalse(goog.testing.events.fireDoubleClickSequence(root, coordinate));
  assertCoordinates(DBLCLICK_SEQ_COORDS);
}

function testDoubleClickSequenceCancellingMouseup() {
  preventDefaultEventType('mouseup');
  assertFalse(goog.testing.events.fireDoubleClickSequence(root));
  assertEventTypes(DBLCLICK_SEQ);
}

function testDoubleClickSequenceCancellingMouseupWithCoordinate() {
  preventDefaultEventType('mouseup');
  assertFalse(goog.testing.events.fireDoubleClickSequence(root, coordinate));
  assertCoordinates(DBLCLICK_SEQ_COORDS);
}

function testDoubleClickSequenceCancellingClick() {
  preventDefaultEventType('click');
  assertFalse(goog.testing.events.fireDoubleClickSequence(root));
  assertEventTypes(DBLCLICK_SEQ);
}

function testDoubleClickSequenceCancellingClickWithCoordinate() {
  preventDefaultEventType('click');
  assertFalse(goog.testing.events.fireDoubleClickSequence(root, coordinate));
  assertCoordinates(DBLCLICK_SEQ_COORDS);
}

function testDoubleClickSequenceCancellingDoubleClick() {
  preventDefaultEventType('dblclick');
  assertFalse(goog.testing.events.fireDoubleClickSequence(root));
  assertEventTypes(DBLCLICK_SEQ);
}

function testDoubleClickSequenceCancellingDoubleClickWithCoordinate() {
  preventDefaultEventType('dblclick');
  assertFalse(goog.testing.events.fireDoubleClickSequence(root, coordinate));
  assertCoordinates(DBLCLICK_SEQ_COORDS);
}

function testKeySequence() {
  assertTrue(
      goog.testing.events.fireKeySequence(root, goog.events.KeyCodes.ZERO));
  assertEventTypes(['keydown', 'keypress', 'keyup']);
}

function testKeySequenceCancellingKeydown() {
  preventDefaultEventType('keydown');
  assertFalse(
      goog.testing.events.fireKeySequence(root, goog.events.KeyCodes.ZERO));
  assertEventTypes(['keydown', 'keyup']);
}

function testKeySequenceCancellingKeypress() {
  preventDefaultEventType('keypress');
  assertFalse(
      goog.testing.events.fireKeySequence(root, goog.events.KeyCodes.ZERO));
  assertEventTypes(['keydown', 'keypress', 'keyup']);
}

function testKeySequenceCancellingKeyup() {
  preventDefaultEventType('keyup');
  assertFalse(
      goog.testing.events.fireKeySequence(root, goog.events.KeyCodes.ZERO));
  assertEventTypes(['keydown', 'keypress', 'keyup']);
}

function testKeySequenceWithEscapeKey() {
  assertTrue(
      goog.testing.events.fireKeySequence(root, goog.events.KeyCodes.ESC));
  if (goog.userAgent.EDGE || goog.userAgent.GECKO ||
      (goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher('525'))) {
    assertEventTypes(['keydown', 'keyup']);
  } else {
    assertEventTypes(['keydown', 'keypress', 'keyup']);
  }
}

function testKeySequenceForMacActionKeys() {
  stubs.set(goog.userAgent, 'GECKO', true);
  stubs.set(goog.userAgent, 'MAC', true);
  goog.testing.events.fireKeySequence(
      root, goog.events.KeyCodes.C, {'metaKey': true});
  assertEventTypes(['keydown', 'keyup']);
}

function testKeySequenceForOptionKeysOnMac() {
  // Mac uses an option (or alt) key to type non-ASCII characters. This test
  // verifies we can emulate key events sent when typing such non-ASCII
  // characters.
  stubs.set(goog.userAgent, 'WEBKIT', true);
  stubs.set(goog.userAgent, 'MAC', true);

  var optionKeyCodes = [
    [0xc0, 0x00e6],  // option+'
    [0xbc, 0x2264],  // option+,
    [0xbd, 0x2013],  // option+-
    [0xbe, 0x2265],  // option+.
    [0xbf, 0x00f7],  // option+/
    [0x30, 0x00ba],  // option+0
    [0x31, 0x00a1],  // option+1
    [0x32, 0x2122],  // option+2
    [0x33, 0x00a3],  // option+3
    [0x34, 0x00a2],  // option+4
    [0x35, 0x221e],  // option+5
    [0x36, 0x00a7],  // option+6
    [0x37, 0x00b6],  // option+7
    [0x38, 0x2022],  // option+8
    [0x39, 0x00aa],  // option+9
    [0xba, 0x2026],  // option+;
    [0xbb, 0x2260],  // option+=
    [0xdb, 0x201c],  // option+[
    [
      0xdc, 0x00ab
    ],               // option+\
    [0xdd, 0x2018],  // option+]
    [0x41, 0x00e5],  // option+a
    [0x42, 0x222b],  // option+b
    [0x43, 0x00e7],  // option+c
    [0x44, 0x2202],  // option+d
    [0x45, 0x00b4],  // option+e
    [0x46, 0x0192],  // option+f
    [0x47, 0x00a9],  // option+g
    [0x48, 0x02d9],  // option+h
    [0x49, 0x02c6],  // option+i
    [0x4a, 0x2206],  // option+j
    [0x4b, 0x02da],  // option+k
    [0x4c, 0x00ac],  // option+l
    [0x4d, 0x00b5],  // option+m
    [0x4e, 0x02dc],  // option+n
    [0x4f, 0x00f8],  // option+o
    [0x50, 0x03c0],  // option+p
    [0x51, 0x0153],  // option+q
    [0x52, 0x00ae],  // option+r
    [0x53, 0x00df],  // option+s
    [0x54, 0x2020],  // option+t
    [0x56, 0x221a],  // option+v
    [0x57, 0x2211],  // option+w
    [0x58, 0x2248],  // option+x
    [0x59, 0x00a5],  // option+y
    [0x5a, 0x03a9]   // option+z
  ];

  for (var i = 0; i < optionKeyCodes.length; ++i) {
    firedEventTypes = [];
    firedKeyCodes = [];
    var keyCode = optionKeyCodes[i][0];
    var keyPressKeyCode = optionKeyCodes[i][1];
    goog.testing.events.fireNonAsciiKeySequence(
        root, keyCode, keyPressKeyCode, {'altKey': true});
    assertEventTypes(['keydown', 'keypress', 'keyup']);
    assertArrayEquals([keyCode, keyPressKeyCode, keyCode], firedKeyCodes);
  }
}

var CONTEXTMENU_SEQ = goog.userAgent.WINDOWS ?
    ['mousedown', 'mouseup', 'contextmenu'] :
    goog.userAgent.GECKO ? ['mousedown', 'contextmenu', 'mouseup'] :
                           goog.userAgent.WEBKIT && goog.userAgent.MAC ?
                           ['mousedown', 'contextmenu', 'mouseup', 'click'] :
                           ['mousedown', 'contextmenu', 'mouseup'];

function testContextMenuSequence() {
  assertTrue(goog.testing.events.fireContextMenuSequence(root));
  assertEventTypes(CONTEXTMENU_SEQ);
}

function testContextMenuSequenceWithCoordinate() {
  assertTrue(goog.testing.events.fireContextMenuSequence(root, coordinate));
  assertEventTypes(CONTEXTMENU_SEQ);
  assertCoordinates(goog.array.repeat(coordinate, CONTEXTMENU_SEQ.length));
}

function testContextMenuSequenceCancellingMousedown() {
  preventDefaultEventType('mousedown');
  assertFalse(goog.testing.events.fireContextMenuSequence(root));
  assertEventTypes(CONTEXTMENU_SEQ);
}

function testContextMenuSequenceCancellingMouseup() {
  preventDefaultEventType('mouseup');
  assertFalse(goog.testing.events.fireContextMenuSequence(root));
  assertEventTypes(CONTEXTMENU_SEQ);
}

function testContextMenuSequenceCancellingContextMenu() {
  preventDefaultEventType('contextmenu');
  assertFalse(goog.testing.events.fireContextMenuSequence(root));
  assertEventTypes(CONTEXTMENU_SEQ);
}

function testContextMenuSequenceFakeMacWebkit() {
  stubs.set(goog.userAgent, 'WINDOWS', false);
  stubs.set(goog.userAgent, 'MAC', true);
  stubs.set(goog.userAgent, 'WEBKIT', true);
  assertTrue(goog.testing.events.fireContextMenuSequence(root));
  assertEventTypes(['mousedown', 'contextmenu', 'mouseup', 'click']);
}

function testCaptureBubble_simple() {
  assertTrue(goog.testing.events.fireClickEvent(childEl));
  assertObjectEquals(
      {parentCapture: 1, childCapture: 1, childBubble: 1, parentBubble: 1},
      eventCount);
}

function testCaptureBubble_preventDefault() {
  goog.events.listen(childEl, goog.events.EventType.CLICK, function(e) {
    e.preventDefault();
  });
  assertFalse(goog.testing.events.fireClickEvent(childEl));
  assertObjectEquals(
      {parentCapture: 1, childCapture: 1, childBubble: 1, parentBubble: 1},
      eventCount);
}

function testCaptureBubble_stopPropagationParentCapture() {
  goog.events.listen(parentEl, goog.events.EventType.CLICK, function(e) {
    e.stopPropagation();
  }, true /* capture */);
  assertTrue(goog.testing.events.fireClickEvent(childEl));
  assertObjectEquals(
      {parentCapture: 1, childCapture: 0, childBubble: 0, parentBubble: 0},
      eventCount);
}

function testCaptureBubble_stopPropagationChildCapture() {
  goog.events.listen(childEl, goog.events.EventType.CLICK, function(e) {
    e.stopPropagation();
  }, true /* capture */);
  assertTrue(goog.testing.events.fireClickEvent(childEl));
  assertObjectEquals(
      {parentCapture: 1, childCapture: 1, childBubble: 0, parentBubble: 0},
      eventCount);
}

function testCaptureBubble_stopPropagationChildBubble() {
  goog.events.listen(childEl, goog.events.EventType.CLICK, function(e) {
    e.stopPropagation();
  });
  assertTrue(goog.testing.events.fireClickEvent(childEl));
  assertObjectEquals(
      {parentCapture: 1, childCapture: 1, childBubble: 1, parentBubble: 0},
      eventCount);
}

function testCaptureBubble_stopPropagationParentBubble() {
  goog.events.listen(parentEl, goog.events.EventType.CLICK, function(e) {
    e.stopPropagation();
  });
  assertTrue(goog.testing.events.fireClickEvent(childEl));
  assertObjectEquals(
      {parentCapture: 1, childCapture: 1, childBubble: 1, parentBubble: 1},
      eventCount);
}

function testMixinListenable() {
  var obj = {};
  obj.doFoo = goog.testing.recordFunction();

  goog.testing.events.mixinListenable(obj);

  obj.doFoo();
  assertEquals(1, obj.doFoo.getCallCount());

  var handler = goog.testing.recordFunction();
  goog.events.listen(obj, 'test', handler);
  obj.dispatchEvent('test');
  assertEquals(1, handler.getCallCount());
  assertEquals(obj, handler.getLastCall().getArgument(0).target);

  goog.events.unlisten(obj, 'test', handler);
  obj.dispatchEvent('test');
  assertEquals(1, handler.getCallCount());

  goog.events.listen(obj, 'test', handler);
  obj.dispose();
  obj.dispatchEvent('test');
  assertEquals(1, handler.getCallCount());
}


/**
 * Assert that the list of events given was fired, in that order.
 */
function assertEventTypes(list) {
  assertArrayEquals(list, firedEventTypes);
}


/**
 * Assert that the list of event coordinates given was caught, in that order.
 */
function assertCoordinates(list) {
  assertArrayEquals(list, firedEventCoordinates);
  assertArrayEquals(list, firedScreenCoordinates);
}


/** Prevent default the event of the given type on the root element. */
function preventDefaultEventType(type) {
  goog.events.listen(root, type, preventDefault);
}

function preventDefault(e) {
  e.preventDefault();
}
