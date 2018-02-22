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
 * @fileoverview Unit tests for ForwardChannelRequestPool.
 * @suppress {accessControls} Private methods are accessed for test purposes.
 *
 */

goog.module('goog.labs.net.webChannel.ForwardChannelRequestPoolTest');
goog.setTestOnly('goog.labs.net.webChannel.ForwardChannelRequestPoolTest');

var ChannelRequest = goog.require('goog.labs.net.webChannel.ChannelRequest');
var ForwardChannelRequestPool = goog.require('goog.labs.net.webChannel.ForwardChannelRequestPool');
var PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
var testSuite = goog.require('goog.testing.testSuite');

var propertyReplacer = new PropertyReplacer();
var req = new ChannelRequest(null, null);

testSuite({
  shouldRunTests: function() {
    return ChannelRequest.supportsXhrStreaming();
  },

  setUp: function() {},

  tearDown: function() {
    propertyReplacer.reset();
  },

  stubSpdyCheck: function(spdyEnabled) {
    propertyReplacer.set(
        ForwardChannelRequestPool, 'isSpdyOrHttp2Enabled_', function() {
          return spdyEnabled;
        });
  },

  testSpdyEnabled: function() {
    this.stubSpdyCheck(true);

    var pool = new ForwardChannelRequestPool();
    assertFalse(pool.isFull());
    assertEquals(0, pool.getRequestCount());
    pool.addRequest(req);
    assertTrue(pool.hasPendingRequest());
    assertTrue(pool.hasRequest(req));
    pool.removeRequest(req);
    assertFalse(pool.hasPendingRequest());

    for (var i = 0; i < pool.getMaxSize(); i++) {
      pool.addRequest(new ChannelRequest(null, null));
    }
    assertTrue(pool.isFull());

    // do not fail
    pool.addRequest(req);
    assertTrue(pool.isFull());
  },

  testSpdyNotEnabled: function() {
    this.stubSpdyCheck(false);

    var pool = new ForwardChannelRequestPool();
    assertFalse(pool.isFull());
    assertEquals(0, pool.getRequestCount());
    pool.addRequest(req);
    assertTrue(pool.hasPendingRequest());
    assertTrue(pool.hasRequest(req));
    assertTrue(pool.isFull());
    pool.removeRequest(req);
    assertFalse(pool.hasPendingRequest());

    // do not fail
    pool.addRequest(req);
    assertTrue(pool.isFull());
  },

  testApplyClientProtocol: function() {
    this.stubSpdyCheck(false);

    var pool = new ForwardChannelRequestPool();
    assertEquals(1, pool.getMaxSize());
    pool.applyClientProtocol('spdy/3');
    assertTrue(pool.getMaxSize() > 1);
    pool.applyClientProtocol('foo-bar');  // no effect
    assertTrue(pool.getMaxSize() > 1);

    pool = new ForwardChannelRequestPool();
    assertEquals(1, pool.getMaxSize());
    pool.applyClientProtocol('quic/x');
    assertTrue(pool.getMaxSize() > 1);

    pool = new ForwardChannelRequestPool();
    assertEquals(1, pool.getMaxSize());
    pool.applyClientProtocol('h2');
    assertTrue(pool.getMaxSize() > 1);

    this.stubSpdyCheck(true);

    pool = new ForwardChannelRequestPool();
    assertTrue(pool.getMaxSize() > 1);
    pool.applyClientProtocol('foo/3');  // no effect
    assertTrue(pool.getMaxSize() > 1);
  },

  testPendingMessagesWithSpdyDisabled: function() {
    this.stubSpdyCheck(false);

    var pool = new ForwardChannelRequestPool();
    assertEquals(1, pool.getMaxSize());
    assertEquals(0, pool.getPendingMessages().length);

    var req = new ChannelRequest(null, null);
    pool.addRequest(req);

    assertEquals(0, pool.getPendingMessages().length);

    req.setPendingMessages([null, null]);  // null represents the message
    assertEquals(2, pool.getPendingMessages().length);

    req = new ChannelRequest(null, null);
    req.setPendingMessages([null]);
    pool.addRequest(req);
    assertEquals(1, pool.getPendingMessages().length);

    pool.removeRequest(req);
    assertEquals(0, pool.getPendingMessages().length);
  },

  testCanelAndPendingMessagesWithSpdyDisabled: function() {
    this.stubSpdyCheck(false);

    var pool = new ForwardChannelRequestPool();

    var req = new ChannelRequest(null, null);
    req.setPendingMessages([null, null]);  // null represents the message
    pool.addRequest(req);
    assertEquals(2, pool.getPendingMessages().length);

    var req1 = new ChannelRequest(null, null);
    pool.addRequest(req1);
    req1.setPendingMessages([null]);
    assertEquals(1, pool.getPendingMessages().length);

    pool.cancel();
    assertEquals(0, pool.getRequestCount());

    assertEquals(1, pool.getPendingMessages().length);
  },

  testAddPendingMessagesWithSpdyEnabled: function() {
    this.stubSpdyCheck(false);

    var pool = new ForwardChannelRequestPool();

    pool.addPendingMessages([null, null]);
    assertEquals(2, pool.getPendingMessages().length);

    var req = new ChannelRequest(null, null);
    req.setPendingMessages([null, null]);  // null represents the message
    pool.addRequest(req);

    assertEquals(4, pool.getPendingMessages().length);

    pool.addPendingMessages([null]);
    assertEquals(5, pool.getPendingMessages().length);
  },

  testPendingMessagesWithSpdyEnabled: function() {
    this.stubSpdyCheck(true);

    var pool = new ForwardChannelRequestPool();
    assertTrue(pool.getMaxSize() > 1);
    assertEquals(0, pool.getPendingMessages().length);

    var req = new ChannelRequest(null, null);
    pool.addRequest(req);

    assertEquals(0, pool.getPendingMessages().length);

    req.setPendingMessages([null, null]);  // null represents the message
    assertEquals(2, pool.getPendingMessages().length);

    var req1 = new ChannelRequest(null, null);
    pool.addRequest(req1);
    assertEquals(2, pool.getPendingMessages().length);
    req1.setPendingMessages([null]);
    assertEquals(3, pool.getPendingMessages().length);

    pool.removeRequest(req1);
    assertEquals(2, pool.getPendingMessages().length);

    pool.removeRequest(req);
    assertEquals(0, pool.getPendingMessages().length);
  },

  testCanelAndPendingMessagesWithSpdyEnabled: function() {
    this.stubSpdyCheck(true);

    var pool = new ForwardChannelRequestPool();

    var req = new ChannelRequest(null, null);
    req.setPendingMessages([null, null]);  // null represents the message
    pool.addRequest(req);

    var req1 = new ChannelRequest(null, null);
    pool.addRequest(req1);
    req1.setPendingMessages([null]);

    assertEquals(3, pool.getPendingMessages().length);

    pool.cancel();
    assertEquals(0, pool.getRequestCount());

    assertEquals(3, pool.getPendingMessages().length);
  },

  testAddAndSetPendingMessagesWithSpdyEnabled: function() {
    this.stubSpdyCheck(true);

    var pool = new ForwardChannelRequestPool();

    pool.addPendingMessages([null, null]);
    assertEquals(2, pool.getPendingMessages().length);

    var req = new ChannelRequest(null, null);
    req.setPendingMessages([null, null]);  // null represents the message
    pool.addRequest(req);

    var req1 = new ChannelRequest(null, null);
    pool.addRequest(req1);
    req1.setPendingMessages([null]);

    assertEquals(5, pool.getPendingMessages().length);

    pool.addPendingMessages([null, null]);
    assertEquals(7, pool.getPendingMessages().length);
  },

  testClearPendingMessages: function() {
    this.stubSpdyCheck(true);

    var pool = new ForwardChannelRequestPool();

    pool.addPendingMessages([null, null]);
    assertEquals(2, pool.getPendingMessages().length);

    pool.clearPendingMessages();
    assertEquals(0, pool.getPendingMessages().length);
  },
});
