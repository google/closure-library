/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

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
