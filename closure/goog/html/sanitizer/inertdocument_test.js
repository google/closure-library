/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview testcases for createInertDocument. */

goog.module('goog.html.inertDocumentTests');
goog.setTestOnly();

const testSuite = goog.require('goog.testing.testSuite');
const {createInertDocument} = goog.require('goog.html.sanitizer.inertDocument');

testSuite({
  testInertDocument() {
    if (!document.implementation.createHTMLDocument) {
      return;  // skip test
    }

    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    window.xssFiredInertDocument = false;
    const doc = createInertDocument();
    const script = doc.createElement('script');
    script.text = 'window.xssFiredInertDocument = true';
    doc.body.appendChild(script);
    assertFalse(window.xssFiredInertDocument);
  },
});
