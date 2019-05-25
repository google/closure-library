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

goog.module('goog.style.webkitScrollbarsTest');
goog.setTestOnly();

const ExpectedFailures = goog.require('goog.testing.ExpectedFailures');
const asserts = goog.require('goog.asserts');
const style = goog.require('goog.style');
/** @suppress {extraRequire} */
const styleScrollbarTester = goog.require('goog.styleScrollbarTester');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let expectedFailures;

testSuite({
  setUpPage() {
    expectedFailures = new ExpectedFailures();
  },

  tearDown() {
    expectedFailures.handleTearDown();

    // Assert that the test loaded.
    asserts.assert(testScrollbarWidth);
  },

  testScrollBarWidth_webkitScrollbar() {
    expectedFailures.expectFailureFor(!userAgent.WEBKIT);

    try {
      const width = style.getScrollbarWidth();
      assertEquals('Scrollbar width should be 16', 16, width);
    } catch (e) {
      expectedFailures.handleException(e);
    }
  },

  testScrollBarWidth_webkitScrollbarWithCustomClass() {
    expectedFailures.expectFailureFor(!userAgent.WEBKIT);

    try {
      const customWidth = style.getScrollbarWidth('otherScrollBar');
      assertEquals('Custom width should be 10', 10, customWidth);
    } catch (e) {
      expectedFailures.handleException(e);
    }
  },
});
