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

goog.module('goog.ui.RoundedPanelTest');
goog.setTestOnly();

const CssRoundedPanel = goog.require('goog.ui.CssRoundedPanel');
const GraphicsRoundedPanel = goog.require('goog.ui.GraphicsRoundedPanel');
const RoundedPanel = goog.require('goog.ui.RoundedPanel');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

testSuite({
  /**
   * Tests RoundedPanel.create(), ensuring that the proper instance is
   * created based on user-agent
   */
  testRoundedPanelCreate() {
    const rcp = RoundedPanel.create(
        15, 5, '#cccccc', '#cccccc', RoundedPanel.Corner.ALL);
    if (userAgent.GECKO && userAgent.isVersionOrHigher('1.9a')) {
      assertTrue(
          'For Firefox 3.0+ (uses Gecko 1.9+), an instance of ' +
              'goog.ui.CssRoundedPanel should be returned.',
          rcp instanceof CssRoundedPanel);
    } else if (userAgent.WEBKIT && userAgent.isVersionOrHigher('500')) {
      assertTrue(
          'For Safari 3.0+, an instance of goog.ui.CssRoundedPanel ' +
              'should be returned.',
          rcp instanceof CssRoundedPanel);
    } else if (userAgent.EDGE) {
      assertTrue(
          'For MS Edge, an instance of goog.ui.CssRoundedPanel ' +
              'should be returned.',
          rcp instanceof CssRoundedPanel);
    } else if (
        userAgent.GECKO || userAgent.IE || userAgent.OPERA ||
        userAgent.WEBKIT) {
      assertTrue(
          'For Gecko 1.8- (ex. Firefox 2.0-, Camino 1.5-, etc.), ' +
              'IE, Opera, and Safari 2.0-, an instance of ' +
              'goog.ui.GraphicsRoundedPanel should be returned.',
          rcp instanceof GraphicsRoundedPanel);
    } else {
      assertNull('For non-supported user-agents, null is returned.', rcp);
    }
  },
});
