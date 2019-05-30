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

goog.module('goog.ui.ScrollFloaterTest');
goog.setTestOnly();

const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const ScrollFloater = goog.require('goog.ui.ScrollFloater');
const dom = goog.require('goog.dom');
const events = goog.require('goog.events');
const style = goog.require('goog.style');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testScrollFloater() {
    const scrollFloater = new ScrollFloater();
    const floater = dom.getElement('floater');
    scrollFloater.decorate(floater);

    assertTrue('Default state is enabled', scrollFloater.isScrollingEnabled());
    assertFalse(
        'On unscrolled page should not be floating',
        scrollFloater.isFloating());

    scrollFloater.setScrollingEnabled(false);

    assertFalse(
        'We can disable the floater', scrollFloater.isScrollingEnabled());
    scrollFloater.dispose();
  },

  testScrollFloaterEvents() {
    const scrollFloater = new ScrollFloater();
    const floater = dom.getElement('floater');
    scrollFloater.setContainerElement(dom.getElement('container'));
    scrollFloater.decorate(floater);

    let floatWasCalled = false;
    let callRecorder = () => {
      floatWasCalled = true;
    };
    events.listen(scrollFloater, ScrollFloater.EventType.FLOAT, callRecorder);
    scrollFloater.float_(ScrollFloater.FloatMode_.TOP);
    assertTrue('FLOAT event was called', floatWasCalled);
    assertTrue('Should be floating', scrollFloater.isFloating());
    assertFalse('Should not be pinned', scrollFloater.isPinned());

    let dockWasCalled = false;
    callRecorder = () => {
      dockWasCalled = true;
    };
    events.listen(scrollFloater, ScrollFloater.EventType.DOCK, callRecorder);
    scrollFloater.dock_();
    assertTrue('DOCK event was called', dockWasCalled);
    assertFalse('Should not be floating', scrollFloater.isFloating());
    assertFalse('Should not be pinned', scrollFloater.isPinned());

    let pinWasCalled = false;
    callRecorder = () => {
      pinWasCalled = true;
    };
    events.listen(scrollFloater, ScrollFloater.EventType.PIN, callRecorder);
    scrollFloater.pin_();
    assertTrue('PIN event was called', pinWasCalled);
    assertFalse('Should not be floating', scrollFloater.isFloating());
    assertTrue('Should be pinned', scrollFloater.isPinned());

    scrollFloater.dispose();
  },

  testScrollFloaterEventCancellation() {
    const scrollFloater = new ScrollFloater();
    const floater = dom.getElement('floater');
    scrollFloater.decorate(floater);

    // Event handler that returns false to cancel the event.
    const eventCanceller = () => false;

    // Have eventCanceller handle the FLOAT event and verify cancellation.
    events.listen(scrollFloater, ScrollFloater.EventType.FLOAT, eventCanceller);
    scrollFloater.float_(ScrollFloater.FloatMode_.TOP);
    assertFalse('Should not be floating', scrollFloater.isFloating());

    // Have eventCanceller handle the PIN event and verify cancellation.
    events.listen(scrollFloater, ScrollFloater.EventType.PIN, eventCanceller);
    scrollFloater.dock_();
    assertFalse('Should not be pinned', scrollFloater.isPinned());

    // Detach eventCanceller and enable floating.
    events.unlisten(
        scrollFloater, ScrollFloater.EventType.FLOAT, eventCanceller);
    scrollFloater.float_(ScrollFloater.FloatMode_.TOP);

    // Have eventCanceller handle the DOCK event and verify cancellation.
    events.listen(scrollFloater, ScrollFloater.EventType.DOCK, eventCanceller);
    scrollFloater.dock_();
    assertTrue('Should still be floating', scrollFloater.isFloating());

    scrollFloater.dispose();
  },

  testScrollFloaterUpdateStyleOnFloatEvent() {
    const scrollFloater = new ScrollFloater();
    const floater = dom.getElement('floater');
    scrollFloater.decorate(floater);

    // Event handler that sets the font size of the scrollfloater to 20px.
    const updateStyle = (e) => {
      style.setStyle(e.target.getElement(), 'font-size', '20px');
    };

    // Set the current font size to 10px.
    style.setStyle(scrollFloater.getElement(), 'font-size', '10px');
    events.listen(scrollFloater, ScrollFloater.EventType.FLOAT, updateStyle);
    scrollFloater.float_(ScrollFloater.FloatMode_.BOTTOM);

    // Ensure event handler got called and updated the font size.
    assertEquals(
        'Font size should be 20px', '20px',
        style.getStyle(scrollFloater.getElement(), 'font-size'));

    assertEquals(
        'Top should be auto', 'auto',
        style.getStyle(scrollFloater.getElement(), 'top'));
    assertEquals(
        'Bottom should be 0px', 0,
        parseInt(style.getStyle(scrollFloater.getElement(), 'bottom')));

    scrollFloater.dispose();
  },

  testScrollFloaterHandlesHorizontalScrolling() {
    const scrollFloater = new ScrollFloater();
    const floater = dom.getElement('floater');
    scrollFloater.decorate(floater);

    scrollFloater.float_(ScrollFloater.FloatMode_.TOP);

    // For some reason the default position of the tested SF is 16px left.
    assertEquals(
        'Element should be left aligned', '16px',
        style.getStyle(scrollFloater.getElement(), 'left'));

    const propReplacer = new PropertyReplacer();
    propReplacer.set(dom, 'getDocumentScroll', () => ({'x': 20}));

    scrollFloater.float_(ScrollFloater.FloatMode_.TOP);

    assertEquals(
        'Element should be scrolled to the left', '-4px',
        style.getStyle(scrollFloater.getElement(), 'left'));

    propReplacer.reset();
    scrollFloater.dispose();
  },
});
