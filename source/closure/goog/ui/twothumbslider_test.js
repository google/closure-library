/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.ui.TwoThumbSliderTest');
goog.setTestOnly();

const SliderBase = goog.require('goog.ui.SliderBase');
const TwoThumbSlider = goog.require('goog.ui.TwoThumbSlider');
const testSuite = goog.require('goog.testing.testSuite');

let slider;

testSuite({
  tearDown() {
    goog.dispose(slider);
  },

  testGetCssClass() {
    slider = new TwoThumbSlider();
    assertEquals(
        'goog-twothumbslider-horizontal',
        slider.getCssClass(SliderBase.Orientation.HORIZONTAL));
    assertEquals(
        'goog-twothumbslider-vertical',
        slider.getCssClass(SliderBase.Orientation.VERTICAL));
  },
});
