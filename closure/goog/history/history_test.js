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

/**
 * @fileoverview Unit tests for goog.history.History.
 */

/** @suppress {extraProvide} */
goog.module('goog.HistoryTest');
goog.setTestOnly();

const Const = goog.require('goog.string.Const');
const GoogHistory = goog.require('goog.History');
const TrustedResourceUrl = goog.require('goog.html.TrustedResourceUrl');
const dispose = goog.require('goog.dispose');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

// Mimimal function to exercise construction.

// TODO(nnaze): Test additional behavior.
testSuite({
  testCreation() {
    const input = dom.getElement('hidden-input');
    const iframe = dom.getElement('hidden-iframe');

    try {
      const history = new GoogHistory(undefined, undefined, input, iframe);
    } finally {
      dispose(history);
    }

    // Test that SafeHtml.create() calls in constructor succeed.
    try {
      // Undefined opt_input and opt_iframe will result in use document.write(),
      // which in some browsers overrides the current page and causes the
      // test to fail.
      const history = new GoogHistory(
          true,
          TrustedResourceUrl.fromConstant(Const.from('blank_test_helper.html')),
          input, iframe);
    } finally {
      dispose(history);
    }
  },

  testIsHashChangeSupported() {
    // This is the policy currently implemented.
    const supportsOnHashChange =
        (userAgent.IE ? document.documentMode >= 8 : 'onhashchange' in window);

    assertEquals(supportsOnHashChange, GoogHistory.isOnHashChangeSupported());
  },
});
