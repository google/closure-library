// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.events.EventTypeTest');
goog.setTestOnly();

const BrowserFeature = goog.require('goog.events.BrowserFeature');
const EventType = goog.require('goog.events.EventType');
const PointerFallbackEventType = goog.require('goog.events.PointerFallbackEventType');
const PointerTouchFallbackEventType = goog.require('goog.events.PointerTouchFallbackEventType');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

testSuite({
  testPointerFallbackEventType() {
    if (BrowserFeature.POINTER_EVENTS) {
      // Pointer events are supported; use W3C PointerEvent
      assertEquals(EventType.POINTERDOWN, PointerFallbackEventType.POINTERDOWN);
    } else if (BrowserFeature.MSPOINTER_EVENTS) {
      // Only IE10 should support MSPointerEvent
      assertTrue(
          userAgent.IE && userAgent.isVersionOrHigher('10') &&
          !userAgent.isVersionOrHigher('11'));
      // W3C PointerEvent not supported; fall back to MSPointerEvent
      assertEquals(
          EventType.MSPOINTERDOWN, PointerFallbackEventType.POINTERDOWN);
    } else {
      // Pointer events not supported; fall back to MouseEvent
      assertEquals(EventType.MOUSEDOWN, PointerFallbackEventType.POINTERDOWN);
    }
  },

  testPointerTouchFallbackEventType() {
    if (BrowserFeature.POINTER_EVENTS) {
      // Pointer events are supported; use W3C PointerEvent
      assertEquals(
          EventType.POINTERDOWN, PointerTouchFallbackEventType.POINTERDOWN);
    } else if (BrowserFeature.MSPOINTER_EVENTS) {
      // Only IE10 should support MSPointerEvent
      assertTrue(
          userAgent.IE && userAgent.isVersionOrHigher('10') &&
          !userAgent.isVersionOrHigher('11'));
      // W3C PointerEvent not supported; fall back to MSPointerEvent
      assertEquals(
          EventType.MSPOINTERDOWN, PointerTouchFallbackEventType.POINTERDOWN);
    } else {
      // Pointer events not supported; fall back to TouchEvent
      assertEquals(
          EventType.TOUCHSTART, PointerTouchFallbackEventType.POINTERDOWN);
    }
  },
});
