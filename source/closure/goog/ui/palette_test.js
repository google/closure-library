// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.PaletteTest');
goog.setTestOnly();

const Component = goog.require('goog.ui.Component');
const Container = goog.require('goog.ui.Container');
const EventType = goog.require('goog.events.EventType');
const GoogTestingEvent = goog.require('goog.testing.events.Event');
const KeyCodes = goog.require('goog.events.KeyCodes');
const KeyEvent = goog.require('goog.events.KeyEvent');
const Palette = goog.require('goog.ui.Palette');
const aria = goog.require('goog.a11y.aria');
const dom = goog.require('goog.dom');
const googEvents = goog.require('goog.events');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

let palette;
let nodes;

testSuite({
  setUp() {
    nodes = [];
    for (let i = 0; i < 23; i++) {
      const node = dom.createTextNode(`node[${i}]`);
      nodes.push(node);
    }
    palette = new Palette(nodes);
  },

  tearDown() {
    palette.dispose();
    dom.removeChildren(document.getElementById('sandbox'));
  },

  testAfterHighlightListener() {
    palette.setHighlightedIndex(0);
    const handler = new recordFunction();
    googEvents.listen(palette, Palette.EventType.AFTER_HIGHLIGHT, handler);
    palette.setHighlightedIndex(2);
    assertEquals(1, handler.getCallCount());
    palette.setHighlightedIndex(-1);
    assertEquals(2, handler.getCallCount());
  },

  testHighlightItemUpdatesParentA11yActiveDescendant() {
    const container = new Container();
    container.render(document.getElementById('sandbox'));
    container.addChild(palette, true);

    palette.setHighlightedItem(nodes[0]);
    assertEquals(
        'Node 0 cell should be the container\'s active descendant',
        palette.getRenderer().getCellForItem(nodes[0]),
        aria.getActiveDescendant(container.getElement()));

    palette.setHighlightedItem(nodes[1]);
    assertEquals(
        'Node 1 cell should be the container\'s active descendant',
        palette.getRenderer().getCellForItem(nodes[1]),
        aria.getActiveDescendant(container.getElement()));

    palette.setHighlightedItem();
    assertNull(
        'Container should have no active descendant',
        aria.getActiveDescendant(container.getElement()));

    container.dispose();
  },

  testHighlightCellEvents() {
    const container = new Container();
    container.render(document.getElementById('sandbox'));
    container.addChild(palette, true);
    const renderer = palette.getRenderer();

    let events = [];
    let targetElements = [];
    const handleEvent = (e) => {
      events.push(e);
      targetElements.push(e.target.getElement());
    };
    palette.getHandler().listen(
        palette,
        [
          this,
          Component.EventType.HIGHLIGHT,
          this,
          Component.EventType.UNHIGHLIGHT,
        ],
        handleEvent);

    // Test highlight events on first selection
    palette.setHighlightedItem(nodes[0]);
    assertEquals('Should have fired 1 event', 1, events.length);
    assertEquals(
        'HIGHLIGHT event should be fired', Component.EventType.HIGHLIGHT,
        events[0].type);
    assertEquals(
        'Event should be fired for node[0] cell',
        renderer.getCellForItem(nodes[0]), targetElements[0]);

    events = [];
    targetElements = [];

    // Only fire highlight events when there is a selection change
    palette.setHighlightedItem(nodes[0]);
    assertEquals('Should have fired 0 events', 0, events.length);

    // Test highlight events on cell change
    palette.setHighlightedItem(nodes[1]);
    assertEquals('Should have fired 2 events', 2, events.length);
    const unhighlightEvent = events.shift();
    const highlightEvent = events.shift();
    assertEquals(
        'UNHIGHLIGHT should be fired first', Component.EventType.UNHIGHLIGHT,
        unhighlightEvent.type);
    assertEquals(
        'UNHIGHLIGHT should be fired for node[0] cell',
        renderer.getCellForItem(nodes[0]), targetElements[0]);
    assertEquals(
        'HIGHLIGHT should be fired after UNHIGHLIGHT',
        Component.EventType.HIGHLIGHT, highlightEvent.type);
    assertEquals(
        'HIGHLIGHT should be fired for node[1] cell',
        renderer.getCellForItem(nodes[1]), targetElements[1]);

    events = [];
    targetElements = [];

    // Test highlight events when a cell is unselected
    palette.setHighlightedItem();

    assertEquals('Should have fired 1 event', 1, events.length);
    assertEquals(
        'UNHIGHLIGHT event should be fired', Component.EventType.UNHIGHLIGHT,
        events[0].type);
    assertEquals(
        'Event should be fired for node[1] cell',
        renderer.getCellForItem(nodes[1]), targetElements[0]);
  },

  testHandleKeyEventLoops() {
    palette.setHighlightedIndex(0);
    const createKeyEvent = (keyCode) => {
      return new KeyEvent(
          keyCode, 0 /* charCode */, false /* repeat */,
          new GoogTestingEvent(EventType.KEYDOWN));
    };
    palette.handleKeyEvent(createKeyEvent(KeyCodes.LEFT));
    assertEquals(nodes.length - 1, palette.getHighlightedIndex());

    palette.handleKeyEvent(createKeyEvent(KeyCodes.RIGHT));
    assertEquals(0, palette.getHighlightedIndex());
  },

  testSetHighlight() {
    assertEquals(-1, palette.getHighlightedIndex());
    palette.setHighlighted(true);
    assertEquals(0, palette.getHighlightedIndex());

    palette.setHighlightedIndex(3);
    palette.setHighlighted(false);
    assertEquals(-1, palette.getHighlightedIndex());
    palette.setHighlighted(true);
    assertEquals(3, palette.getHighlightedIndex());

    palette.setHighlighted(false);
    palette.setHighlightedIndex(5);
    palette.setHighlighted(true);
    assertEquals(5, palette.getHighlightedIndex());
    palette.setHighlighted(true);
    assertEquals(5, palette.getHighlightedIndex());
  },

  testPerformActionInternal() {
    const container = new Container();
    container.render(document.getElementById('sandbox'));
    container.addChild(palette, true);
    palette.setActive(true);
    palette.setSelectedIndex(1);
    palette.setHighlightedIndex(3);
    palette.setHighlighted(true);
    assertEquals(1, palette.getSelectedIndex());
    assertEquals(3, palette.getHighlightedIndex());

    // Click somewhere in the palette, but not inside a cell.
    const mouseUp = new googEvents.BrowserEvent(
        {type: 'mouseup', button: 1, target: palette});
    palette.handleMouseUp(mouseUp);

    // Highlight and selection are both unchanged (user did not select
    // anything).
    assertEquals(1, palette.getSelectedIndex());
    assertEquals(3, palette.getHighlightedIndex());
  },

  testSetAriaLabel() {
    assertNull(
        'Palette must not have aria label by default', palette.getAriaLabel());
    palette.setAriaLabel('My Palette');
    palette.render();
    const element = palette.getElementStrict();
    assertNotNull('Element must not be null', element);
    assertEquals(
        'Palette element must have expected aria-label', 'My Palette',
        element.getAttribute('aria-label'));
    assertEquals(
        'Palette element must have expected aria role', 'grid',
        element.getAttribute('role'));
    palette.setAriaLabel('My new Palette');
    assertEquals(
        'Palette element must have updated aria-label', 'My new Palette',
        element.getAttribute('aria-label'));
  },
});
