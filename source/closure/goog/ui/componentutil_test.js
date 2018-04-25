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

goog.provide('goog.ui.ComponentUtilTest');
goog.setTestOnly('goog.ui.ComponentUtilTest');

goog.require('goog.events.EventType');
goog.require('goog.events.PointerAsMouseEventType');
goog.require('goog.testing.jsunit');
goog.require('goog.ui.Component');
goog.require('goog.ui.ComponentUtil');

var component;

function setUp() {
  component = new goog.ui.Component();
}

function tearDown() {
  component.dispose();
}

function testGetMouseEventType() {
  component.setPointerEventsEnabled(false);
  assertEquals(
      'Component must use mouse events when specified.',
      goog.ui.ComponentUtil.getMouseEventType(component),
      goog.events.EventType);

  component.setPointerEventsEnabled(true);
  assertEquals(
      'Component must use pointer events when specified.',
      goog.ui.ComponentUtil.getMouseEventType(component),
      goog.events.PointerAsMouseEventType);
}
