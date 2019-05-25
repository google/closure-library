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
