// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.net.XhrManagerTest');
goog.setTestOnly();

const EventType = goog.require('goog.net.EventType');
const XhrIo = goog.require('goog.net.XhrIo');
const XhrIoPool = goog.require('goog.testing.net.XhrIoPool');
const XhrManager = goog.require('goog.net.XhrManager');
const events = goog.require('goog.events');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

/** @type {XhrManager} */
let xhrManager;

/** @type {goog.testing.net.XhrIo} */
let xhrIo;

testSuite({
  setUp() {
    xhrManager = new XhrManager();
    xhrManager.xhrPool_ = new XhrIoPool();
    xhrIo = xhrManager.xhrPool_.getXhr();
  },

  tearDown() {
    goog.dispose(xhrManager);
  },

  testGetOutstandingRequestIds() {
    assertArrayEquals(
        'No outstanding requests', [], xhrManager.getOutstandingRequestIds());

    xhrManager.send('test1', '/test1');
    assertArrayEquals(
        'Single outstanding request', ['test1'],
        xhrManager.getOutstandingRequestIds());

    xhrManager.send('test2', '/test2');
    assertArrayEquals(
        'Two outstanding requests', ['test1', 'test2'],
        xhrManager.getOutstandingRequestIds());

    xhrIo.simulateResponse(200, 'data');
    assertArrayEquals(
        'Single outstanding request', ['test2'],
        xhrManager.getOutstandingRequestIds());

    xhrIo.simulateResponse(200, 'data');
    assertArrayEquals(
        'No outstanding requests', [], xhrManager.getOutstandingRequestIds());
  },

  testForceAbortQueuedRequest() {
    xhrManager.send('test', '/test');
    xhrManager.send('queued', '/queued');

    assertNotThrows(
        'Forced abort of queued request should not throw an error',
        goog.bind(xhrManager.abort, xhrManager, 'queued', true));

    assertNotThrows(
        'Forced abort of normal request should not throw an error',
        goog.bind(xhrManager.abort, xhrManager, 'test', true));
  },

  testDefaultResponseType() {
    const callback = recordFunction((e) => {
      assertEquals('test1', e.id);
      assertEquals(XhrIo.ResponseType.DEFAULT, e.xhrIo.getResponseType());
    });
    events.listenOnce(xhrManager, EventType.READY, callback);
    xhrManager.send('test1', '/test2');
    assertEquals(1, callback.getCallCount());

    xhrIo.simulateResponse(200, 'data');  // Do this to make tearDown() happy.
  },

  testNonDefaultResponseType() {
    const callback = recordFunction((e) => {
      assertEquals('test2', e.id);
      assertEquals(XhrIo.ResponseType.ARRAY_BUFFER, e.xhrIo.getResponseType());
    });
    events.listenOnce(xhrManager, EventType.READY, callback);
    xhrManager.send(
        'test2', '/test2', undefined /* opt_method */,
        undefined /* opt_content */, undefined /* opt_headers */,
        undefined /* opt_priority */, undefined /* opt_callback */,
        undefined /* opt_maxRetries */, XhrIo.ResponseType.ARRAY_BUFFER);
    assertEquals(1, callback.getCallCount());

    xhrIo.simulateResponse(200, 'data');  // Do this to make tearDown() happy.
  },
});
