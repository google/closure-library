/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.userAgentQuirksTest');
goog.setTestOnly();

const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

testSuite({
  testGetDocumentModeInQuirksMode() {
    // This test file is forcing quirks mode.
    const expected = userAgent.IE ? 5 : undefined;
    assertEquals(expected, userAgent.DOCUMENT_MODE);
  },
});
