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
 * @fileoverview Unit tests for
 * goog.labs.net.webChannel.ForwardChannelRequestPool.
 * @suppress {accessControls} Private methods are accessed for test purposes.
 *
 */


goog.provide('goog.labs.net.webChannel.forwardChannelRequestPoolTest');

goog.require('goog.labs.net.webChannel.ChannelRequest');
goog.require('goog.labs.net.webChannel.ForwardChannelRequestPool');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.labs.net.webChannel.forwardChannelRequestPoolTest');


var propertyReplacer = new goog.testing.PropertyReplacer();
var req = new goog.labs.net.webChannel.ChannelRequest(null, null);


function shouldRunTests() {
  return goog.labs.net.webChannel.ChannelRequest.supportsXhrStreaming();
}


function setUp() {}


function tearDown() {
  propertyReplacer.reset();
}


function stubSpdyCheck(spdyEnabled) {
  propertyReplacer.set(
      goog.labs.net.webChannel.ForwardChannelRequestPool, 'isSpdyEnabled_',
      function() { return spdyEnabled; });
}


function testSpdyEnabled() {
  stubSpdyCheck(true);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();
  assertFalse(pool.isFull());
  assertEquals(0, pool.getRequestCount());
  pool.addRequest(req);
  assertTrue(pool.hasPendingRequest());
  assertTrue(pool.hasRequest(req));
  pool.removeRequest(req);
  assertFalse(pool.hasPendingRequest());

  for (var i = 0; i < pool.getMaxSize(); i++) {
    pool.addRequest(new goog.labs.net.webChannel.ChannelRequest(null, null));
  }
  assertTrue(pool.isFull());

  // do not fail
  pool.addRequest(req);
  assertTrue(pool.isFull());
}


function testSpdyNotEnabled() {
  stubSpdyCheck(false);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();
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
}


function testApplyClientProtocol() {
  stubSpdyCheck(false);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();
  assertEquals(1, pool.getMaxSize());
  pool.applyClientProtocol('spdy/3');
  assertTrue(pool.getMaxSize() > 1);
  pool.applyClientProtocol('foo-bar');  // no effect
  assertTrue(pool.getMaxSize() > 1);

  pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();
  assertEquals(1, pool.getMaxSize());
  pool.applyClientProtocol('quic/x');
  assertTrue(pool.getMaxSize() > 1);

  pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();
  assertEquals(1, pool.getMaxSize());
  pool.applyClientProtocol('h2');
  assertTrue(pool.getMaxSize() > 1);

  stubSpdyCheck(true);

  pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();
  assertTrue(pool.getMaxSize() > 1);
  pool.applyClientProtocol('foo/3');  // no effect
  assertTrue(pool.getMaxSize() > 1);
}


function testPendingMessagesWithSpdyDisabled() {
  stubSpdyCheck(false);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();
  assertEquals(1, pool.getMaxSize());
  assertEquals(0, pool.getPendingMessages().length);

  var req = new goog.labs.net.webChannel.ChannelRequest(null, null);
  pool.addRequest(req);

  assertEquals(0, pool.getPendingMessages().length);

  req.setPendingMessages([null, null]);  // null represents the message
  assertEquals(2, pool.getPendingMessages().length);

  req = new goog.labs.net.webChannel.ChannelRequest(null, null);
  req.setPendingMessages([null]);
  pool.addRequest(req);
  assertEquals(1, pool.getPendingMessages().length);

  pool.removeRequest(req);
  assertEquals(0, pool.getPendingMessages().length);
}


function testCanelAndPendingMessagesWithSpdyDisabled() {
  stubSpdyCheck(false);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();

  var req = new goog.labs.net.webChannel.ChannelRequest(null, null);
  req.setPendingMessages([null, null]);  // null represents the message
  pool.addRequest(req);
  assertEquals(2, pool.getPendingMessages().length);

  var req1 = new goog.labs.net.webChannel.ChannelRequest(null, null);
  pool.addRequest(req1);
  req1.setPendingMessages([null]);
  assertEquals(1, pool.getPendingMessages().length);

  pool.cancel();
  assertEquals(0, pool.getRequestCount());

  assertEquals(1, pool.getPendingMessages().length);
}


function testAddPendingMessagesWithSpdyEnabled() {
  stubSpdyCheck(false);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();

  pool.addPendingMessages([null, null]);
  assertEquals(2, pool.getPendingMessages().length);

  var req = new goog.labs.net.webChannel.ChannelRequest(null, null);
  req.setPendingMessages([null, null]);  // null represents the message
  pool.addRequest(req);

  assertEquals(4, pool.getPendingMessages().length);

  pool.addPendingMessages([null]);
  assertEquals(5, pool.getPendingMessages().length);
}


function testPendingMessagesWithSpdyEnabled() {
  stubSpdyCheck(true);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();
  assertTrue(pool.getMaxSize() > 1);
  assertEquals(0, pool.getPendingMessages().length);

  var req = new goog.labs.net.webChannel.ChannelRequest(null, null);
  pool.addRequest(req);

  assertEquals(0, pool.getPendingMessages().length);

  req.setPendingMessages([null, null]);  // null represents the message
  assertEquals(2, pool.getPendingMessages().length);

  var req1 = new goog.labs.net.webChannel.ChannelRequest(null, null);
  pool.addRequest(req1);
  assertEquals(2, pool.getPendingMessages().length);
  req1.setPendingMessages([null]);
  assertEquals(3, pool.getPendingMessages().length);

  pool.removeRequest(req1);
  assertEquals(2, pool.getPendingMessages().length);

  pool.removeRequest(req);
  assertEquals(0, pool.getPendingMessages().length);
}


function testCanelAndPendingMessagesWithSpdyEnabled() {
  stubSpdyCheck(true);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();

  var req = new goog.labs.net.webChannel.ChannelRequest(null, null);
  req.setPendingMessages([null, null]);  // null represents the message
  pool.addRequest(req);

  var req1 = new goog.labs.net.webChannel.ChannelRequest(null, null);
  pool.addRequest(req1);
  req1.setPendingMessages([null]);

  assertEquals(3, pool.getPendingMessages().length);

  pool.cancel();
  assertEquals(0, pool.getRequestCount());

  assertEquals(3, pool.getPendingMessages().length);
}


function testAddPendingMessagesWithSpdyEnabled() {
  stubSpdyCheck(true);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();

  pool.addPendingMessages([null, null]);
  assertEquals(2, pool.getPendingMessages().length);

  var req = new goog.labs.net.webChannel.ChannelRequest(null, null);
  req.setPendingMessages([null, null]);  // null represents the message
  pool.addRequest(req);

  var req1 = new goog.labs.net.webChannel.ChannelRequest(null, null);
  pool.addRequest(req1);
  req1.setPendingMessages([null]);

  assertEquals(5, pool.getPendingMessages().length);

  pool.addPendingMessages([null, null]);
  assertEquals(7, pool.getPendingMessages().length);
}


function testClearPendingMessages() {
  stubSpdyCheck(true);

  var pool = new goog.labs.net.webChannel.ForwardChannelRequestPool();

  pool.addPendingMessages([null, null]);
  assertEquals(2, pool.getPendingMessages().length);

  pool.clearPendingMessages();
  assertEquals(0, pool.getPendingMessages().length);
}
