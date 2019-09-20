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
