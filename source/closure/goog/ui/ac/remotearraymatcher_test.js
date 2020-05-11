/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.ui.ac.RemoteArrayMatcherTest');
goog.setTestOnly();

const MockControl = goog.require('goog.testing.MockControl');
const NetXhrIo = goog.require('goog.testing.net.XhrIo');
const RemoteArrayMatcher = goog.require('goog.ui.ac.RemoteArrayMatcher');
/** @suppress {extraRequire} */
const XhrIo = goog.require('goog.net.XhrIo');
const testSuite = goog.require('goog.testing.testSuite');

const url = 'http://www.google.com';
const token = 'goog';
const maxMatches = 5;
const fullToken = 'google';

const responseJsonText = '["eric", "larry", "sergey", "marissa", "pupius"]';
const responseJson = JSON.parse(responseJsonText);

let mockControl;
let mockMatchHandler;

testSuite({
  setUp() {
    goog.net.XhrIo = /** @type {?} */ (NetXhrIo);
    mockControl = new MockControl();
    mockMatchHandler = mockControl.createFunctionMock();
  },

  testRequestMatchingRows_noSimilarTrue() {
    const matcher = new RemoteArrayMatcher(url);
    mockMatchHandler(token, responseJson);
    mockControl.$replayAll();
    matcher.requestMatchingRows(token, maxMatches, mockMatchHandler, fullToken);
    matcher.xhr_.simulateResponse(200, responseJsonText);
    mockControl.$verifyAll();
    mockControl.$resetAll();
  },

  testRequestMatchingRows_twoCalls() {
    const matcher = new RemoteArrayMatcher(url);

    const dummyMatchHandler = mockControl.createFunctionMock();

    mockMatchHandler(token, responseJson);
    mockControl.$replayAll();

    matcher.requestMatchingRows(
        token, maxMatches, dummyMatchHandler, fullToken);

    matcher.requestMatchingRows(token, maxMatches, mockMatchHandler, fullToken);
    matcher.xhr_.simulateResponse(200, responseJsonText);
    mockControl.$verifyAll();
    mockControl.$resetAll();
  },
});
