// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.DimensionPickerRendererTest');
goog.setTestOnly();

const DimensionPicker = goog.require('goog.ui.DimensionPicker');
const DimensionPickerRenderer = goog.require('goog.ui.DimensionPickerRenderer');
const LivePriority = goog.require('goog.a11y.aria.LivePriority');
const googArray = goog.require('goog.array');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

let renderer;
let picker;

testSuite({
  setUp() {
    renderer = new DimensionPickerRenderer();
    picker = new DimensionPicker(renderer);
  },

  tearDown() {
    picker.dispose();
  },

  /**
   * Tests that the right aria label is added when the highlighted
   * size changes.
   */
  testSetHighlightedSizeUpdatesLiveRegion() {
    picker.render();

    const sayFunction = recordFunction();
    renderer.announcer_.say = sayFunction;
    renderer.setHighlightedSize(picker, 3, 7);

    assertEquals(1, sayFunction.getCallCount());

    assertTrue(googArray.equals(
        ['3 by 7', LivePriority.ASSERTIVE],
        sayFunction.getLastCall().getArguments()));
  },
});
