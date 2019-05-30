// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.AnimatedZippyTest');
goog.setTestOnly();

const AnimatedZippy = goog.require('goog.ui.AnimatedZippy');
const Animation = goog.require('goog.fx.Animation');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const Role = goog.require('goog.a11y.aria.Role');
const State = goog.require('goog.a11y.aria.State');
const Transition = goog.require('goog.fx.Transition');
const Zippy = goog.require('goog.ui.Zippy');
const aria = goog.require('goog.a11y.aria');
const asserts = goog.require('goog.asserts');
const dom = goog.require('goog.dom');
const events = goog.require('goog.events');
const functions = goog.require('goog.functions');
const testSuite = goog.require('goog.testing.testSuite');
const testingAsserts = goog.require('goog.testing.asserts');

let animatedZippy;
let animatedZippyHeaderEl;
let propertyReplacer;

testSuite({
  setUp() {
    animatedZippyHeaderEl = dom.getElement('t1');
    asserts.assert(animatedZippyHeaderEl);
    animatedZippy =
        new AnimatedZippy(animatedZippyHeaderEl, dom.getElement('c1'));

    propertyReplacer = new PropertyReplacer();
  },

  tearDown() {
    propertyReplacer.reset();
    animatedZippy.dispose();
  },

  testConstructor() {
    assertNotNull('must not be null', animatedZippy);
    assertEquals(aria.getRole(animatedZippyHeaderEl), Role.TAB);
  },

  testConstructorAriaRoleOverride() {
    animatedZippy = new AnimatedZippy(
        animatedZippyHeaderEl, dom.getElement('c1'), null, null, Role.BUTTON);
    assertEquals(aria.getRole(animatedZippyHeaderEl), Role.BUTTON);
  },

  testExpandCollapse() {
    let animationsPlayed = 0;
    let toggleEventsFired = 0;

    propertyReplacer.replace(Animation.prototype, 'play', function() {
      animationsPlayed++;
      this.dispatchAnimationEvent(Transition.EventType.END);
    });
    propertyReplacer.replace(
        AnimatedZippy.prototype, 'onAnimate_', functions.NULL);

    events.listenOnce(animatedZippy, Zippy.Events.TOGGLE, (e) => {
      toggleEventsFired++;
      assertTrue('TOGGLE event must be for expansion', e.expanded);
      assertEquals('expanded must be true', true, animatedZippy.isExpanded());
      assertEquals(
          'aria-expanded must be true', 'true',
          aria.getState(animatedZippyHeaderEl, State.EXPANDED));
    });

    animatedZippy.expand();

    events.listenOnce(animatedZippy, Zippy.Events.TOGGLE, (e) => {
      toggleEventsFired++;
      assertFalse('TOGGLE event must be for collapse', e.expanded);
      assertEquals('expanded must be false', false, animatedZippy.isExpanded());
      assertEquals(
          'aria-expanded must be false', 'false',
          aria.getState(animatedZippyHeaderEl, State.EXPANDED));
    });

    animatedZippy.collapse();

    assertEquals('animations must play', 2, animationsPlayed);
    assertEquals('TOGGLE events must fire', 2, toggleEventsFired);
  },

  /** Tests the TOGGLE_ANIMATION_BEGIN event. */
  testToggleBegin() {
    let animationsPlayed = 0;
    let toggleEventsFired = 0;

    propertyReplacer.replace(Animation.prototype, 'play', function() {
      animationsPlayed++;
      this.dispatchAnimationEvent(Transition.EventType.BEGIN);
      this.dispatchAnimationEvent(Transition.EventType.END);
    });
    propertyReplacer.replace(
        AnimatedZippy.prototype, 'onAnimate_', functions.NULL);

    events.listenOnce(
        animatedZippy, AnimatedZippy.Events.TOGGLE_ANIMATION_BEGIN, (e) => {
          toggleEventsFired++;
          assertTrue(
              'TOGGLE_ANIMATION_BEGIN event must be for expansion', e.expanded);
          assertEquals(
              'expanded must be false', false, animatedZippy.isExpanded());
          assertEquals(
              'aria-expanded must be true', 'true',
              aria.getState(animatedZippyHeaderEl, State.EXPANDED));
        });

    animatedZippy.expand();

    events.listenOnce(
        animatedZippy, AnimatedZippy.Events.TOGGLE_ANIMATION_BEGIN, (e) => {
          toggleEventsFired++;
          assertFalse(
              'TOGGLE_ANIMATION_BEGIN event must be for collapse', e.expanded);
          assertEquals(
              'expanded must be true', true, animatedZippy.isExpanded());
          assertEquals(
              'aria-expanded must be false', 'false',
              aria.getState(animatedZippyHeaderEl, State.EXPANDED));
        });

    animatedZippy.collapse();

    assertEquals('animations must play', 2, animationsPlayed);
    assertEquals(
        'TOGGLE_ANIMATION_BEGIN events must fire', 2, toggleEventsFired);
  },

  /** Tests the TOGGLE_ANIMATION_END event. */
  testToggleEnd() {
    let animationsPlayed = 0;
    let toggleEventsFired = 0;

    propertyReplacer.replace(Animation.prototype, 'play', function() {
      animationsPlayed++;
      this.dispatchAnimationEvent(Transition.EventType.END);
    });
    propertyReplacer.replace(
        AnimatedZippy.prototype, 'onAnimate_', functions.NULL);

    events.listenOnce(
        animatedZippy, AnimatedZippy.Events.TOGGLE_ANIMATION_END, (e) => {
          toggleEventsFired++;
          assertTrue(
              'TOGGLE_ANIMATION_END event must be for expansion', e.expanded);
          assertEquals(
              'expanded must be true', true, animatedZippy.isExpanded());
          assertEquals(
              'aria-expanded must be true', 'true',
              aria.getState(animatedZippyHeaderEl, State.EXPANDED));
        });

    animatedZippy.expand();

    events.listenOnce(
        animatedZippy, AnimatedZippy.Events.TOGGLE_ANIMATION_END, (e) => {
          toggleEventsFired++;
          assertFalse(
              'TOGGLE_ANIMATION_END event must be for collapse', e.expanded);
          assertEquals(
              'expanded must be false', false, animatedZippy.isExpanded());
          assertEquals(
              'aria-expanded must be false', 'false',
              aria.getState(animatedZippyHeaderEl, State.EXPANDED));
        });

    animatedZippy.collapse();

    assertEquals('animations must play', 2, animationsPlayed);
    assertEquals('TOGGLE_ANIMATION_END events must fire', 2, toggleEventsFired);
  },
});
