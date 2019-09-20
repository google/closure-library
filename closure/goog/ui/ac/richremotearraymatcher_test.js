// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.ac.RichRemoteArrayMatcherTest');
goog.setTestOnly();

const MockControl = goog.require('goog.testing.MockControl');
const NetXhrIo = goog.require('goog.testing.net.XhrIo');
const RichRemoteArrayMatcher = goog.require('goog.ui.ac.RichRemoteArrayMatcher');
/** @suppress {extraRequire} */
const XhrIo = goog.require('goog.net.XhrIo');
const testSuite = goog.require('goog.testing.testSuite');

const url = 'http://www.google.com';
const token = 'goog';
const maxMatches = 5;

const responseJsonText = '[["type1", "eric", "larry", "sergey"]]';
const responseJsonType1 = ['eric', 'larry', 'sergey'];

let mockControl;
let mockMatchHandler;

/**
 * Callback for type1 responses.
 * @param {string} response
 * @return {string}
 */
function type1(response) {
  return response;
}

testSuite({
  setUp() {
    goog.net.XhrIo = /** @type {?} */ (NetXhrIo);
    mockControl = new MockControl();
    mockMatchHandler = mockControl.createFunctionMock();
  },

  testRequestMatchingRows() {
    const matcher = new RichRemoteArrayMatcher(url);
    mockMatchHandler(token, responseJsonType1);
    mockControl.$replayAll();
    matcher.requestMatchingRows(token, maxMatches, mockMatchHandler);
    matcher.xhr_.simulateResponse(200, responseJsonText);
    mockControl.$verifyAll();
    mockControl.$resetAll();
  },

  testSetRowBuilder() {
    const matcher = new RichRemoteArrayMatcher(url);
    matcher.setRowBuilder((type, response) => {
      assertEquals('type1', type);
      return response;
    });
    mockMatchHandler(token, responseJsonType1);
    mockControl.$replayAll();
    matcher.requestMatchingRows(token, maxMatches, mockMatchHandler);
    matcher.xhr_.simulateResponse(200, responseJsonText);
    mockControl.$verifyAll();
    mockControl.$resetAll();
  },
});
