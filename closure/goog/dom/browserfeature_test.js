// Copyright 2019 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.dom.BrowserFeatureTest');
goog.setTestOnly();

goog.require('goog.dom');
goog.require('goog.dom.BrowserFeature');
goog.require('goog.testing.testSuite');

let context2d = null;
let contextwebgl = null;

goog.testing.testSuite({
  setUp() {
    try {
      const canvas = new window.OffscreenCanvas(0, 0);
      context2d = canvas.getContext('2d');
    } catch (ex) {
    }
  },

  testOffscreenCanvasSupport() {
    assertEquals(
        Boolean(context2d), goog.dom.BrowserFeature.OFFSCREEN_CANVAS_2D);
  },

  testOffscreenCanvas2DUsage() {
    if (!goog.dom.BrowserFeature.OFFSCREEN_CANVAS_2D) {
      return;
    }

    assertNotNullNorUndefined(window.OffscreenCanvas);
    const canvas = new window.OffscreenCanvas(1, 1);
    assertNotNullNorUndefined(canvas);

    const ctx = canvas.getContext('2d');
    assertNotNullNorUndefined(ctx);
  }
});
