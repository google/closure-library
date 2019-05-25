// Copyright 2018 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.ComponentUtilTest');
goog.setTestOnly();

const Component = goog.require('goog.ui.Component');
const ComponentUtil = goog.require('goog.ui.ComponentUtil');
const MouseAsMouseEventType = goog.require('goog.events.MouseAsMouseEventType');
const PointerAsMouseEventType = goog.require('goog.events.PointerAsMouseEventType');
const testSuite = goog.require('goog.testing.testSuite');

let component;

testSuite({
  setUp() {
    component = new Component();
  },

  tearDown() {
    component.dispose();
  },

  testGetMouseEventType() {
    component.setPointerEventsEnabled(false);
    assertEquals(
        'Component must use mouse events when specified.',
        ComponentUtil.getMouseEventType(component), MouseAsMouseEventType);

    component.setPointerEventsEnabled(true);
    assertEquals(
        'Component must use pointer events when specified.',
        ComponentUtil.getMouseEventType(component), PointerAsMouseEventType);
  },
});
