/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.net.CorsXmlHttpFactoryTest');
goog.setTestOnly();

const CorsXmlHttpFactory = goog.require('goog.net.CorsXmlHttpFactory');
const IeCorsXhrAdapter = goog.require('goog.net.IeCorsXhrAdapter');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

testSuite({
  testBrowserSupport() {
    const requestFactory = new CorsXmlHttpFactory();
    if (userAgent.IE) {
      if (userAgent.isVersionOrHigher('10')) {
        // Continue: IE10 supports CORS requests using native XMLHttpRequest.
      } else if (userAgent.isVersionOrHigher('8')) {
        assertTrue(requestFactory.createInstance() instanceof IeCorsXhrAdapter);
        return;
      } else {
        try {
          requestFactory.createInstance();
          fail('Error expected.');
        } catch (e) {
          assertEquals('Unsupported browser', e.message);
          return;
        }
      }
    }
    // All other browsers support CORS requests using native XMLHttpRequest.
    assertTrue(requestFactory.createInstance() instanceof XMLHttpRequest);
  },
});
