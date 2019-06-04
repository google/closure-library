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

/** @fileoverview Unit tests for ChannelRequest. */

goog.module('goog.labs.net.webChannel.channelRequestTest');
goog.setTestOnly();

const ChannelRequest = goog.require('goog.labs.net.webChannel.ChannelRequest');
const MockClock = goog.require('goog.testing.MockClock');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const ServerReachability = goog.require('goog.labs.net.webChannel.requestStats.ServerReachability');
const Uri = goog.require('goog.Uri');
const WebChannelDebug = goog.require('goog.labs.net.webChannel.WebChannelDebug');
const XhrIo = goog.require('goog.testing.net.XhrIo');
const functions = goog.require('goog.functions');
const recordFunction = goog.require('goog.testing.recordFunction');
const requestStats = goog.require('goog.labs.net.webChannel.requestStats');
const testSuite = goog.require('goog.testing.testSuite');

let channelRequest;
let mockChannel;
let mockClock;
let stubs;
let xhrIo;
let reachabilityEvents;

/** Time to wait for a network request to time out, before aborting. */
const WATCHDOG_TIME = 2000;

/** Time to throttle readystatechange events. */
const THROTTLE_TIME = 500;

/** A really long time - used to make sure no more timeouts will fire. */
const ALL_DAY_MS = 1000 * 60 * 60 * 24;

function shouldRunTests() {
  return ChannelRequest.supportsXhrStreaming();
}

/**
 * Constructs a duck-type WebChannelBase that tracks the completed requests.
 * @final
 */
class MockWebChannelBase {
  constructor() {
    this.isClosed = () => false;
    this.isActive = () => true;
    this.shouldUseSecondaryDomains = () => false;
    this.completedRequests = [];
    this.onRequestComplete = function(request) {
      this.completedRequests.push(request);
    };
    this.onRequestData = (request, data) => {};
  }
}

/**
 * Creates a real ChannelRequest object, with some modifications for
 * testability:
 * <ul>
 * <li>The channel is a mock channel.
 * <li>The new watchdogTimeoutCallCount property tracks onWatchDogTimeout()
 *     calls.
 * <li>The timeout is set to WATCHDOG_TIME.
 * </ul>
 */
function createChannelRequest() {
  xhrIo = new XhrIo();
  xhrIo.abort = xhrIo.abort || function() { this.active_ = false; };

  // Install mock channel and no-op debug logger.
  mockChannel = new MockWebChannelBase();
  channelRequest = new ChannelRequest(mockChannel, new WebChannelDebug());

  // Install test XhrIo.
  mockChannel.createXhrIo = () => xhrIo;

  // Install watchdogTimeoutCallCount.
  channelRequest.watchdogTimeoutCallCount = 0;
  channelRequest.originalOnWatchDogTimeout = channelRequest.onWatchDogTimeout_;
  channelRequest.onWatchDogTimeout_ = function() {
    channelRequest.watchdogTimeoutCallCount++;
    return channelRequest.originalOnWatchDogTimeout();
  };

  channelRequest.setTimeout(WATCHDOG_TIME);
}

function checkReachabilityEvents(reqMade, reqSucceeded, reqFail, backChannel) {
  assertEquals(
      reqMade, reachabilityEvents[ServerReachability.REQUEST_MADE] || 0);
  assertEquals(
      reqSucceeded,
      reachabilityEvents[ServerReachability.REQUEST_SUCCEEDED] || 0);
  assertEquals(
      reqFail, reachabilityEvents[ServerReachability.REQUEST_FAILED] || 0);
  assertEquals(
      backChannel,
      reachabilityEvents[ServerReachability.BACK_CHANNEL_ACTIVITY] || 0);
}

testSuite({
  setUp() {
    mockClock = new MockClock();
    mockClock.install();
    reachabilityEvents = {};
    stubs = new PropertyReplacer();

    // Mock out the stat notification code.
    const notifyServerReachabilityEvent = (reachabilityType) => {
      if (!reachabilityEvents[reachabilityType]) {
        reachabilityEvents[reachabilityType] = 0;
      }
      reachabilityEvents[reachabilityType]++;
    };
    stubs.set(
        requestStats, 'notifyServerReachabilityEvent',
        notifyServerReachabilityEvent);
  },

  tearDown() {
    stubs.reset();
    mockClock.uninstall();
  },

  /**
   * Run through the lifecycle of a long lived request, checking that the right
   * network events are reported.
   */
  testNetworkEvents() {
    createChannelRequest();

    channelRequest.xmlHttpPost(new Uri('some_uri'), 'some_postdata', true);
    checkReachabilityEvents(1, 0, 0, 0);
    if (ChannelRequest.supportsXhrStreaming()) {
      xhrIo.simulatePartialResponse('17\nI am a BC Message');
      checkReachabilityEvents(1, 0, 0, 1);
      xhrIo.simulatePartialResponse('23\nI am another BC Message');
      checkReachabilityEvents(1, 0, 0, 2);
      xhrIo.simulateResponse(200, '16\Final BC Message');
      checkReachabilityEvents(1, 1, 0, 2);
    } else {
      xhrIo.simulateResponse(200, '16\Final BC Message');
      checkReachabilityEvents(1, 1, 0, 0);
    }
  },

  /** Test throttling of readystatechange events. */
  testNetworkEvents_throttleReadyStateChange() {
    createChannelRequest();
    channelRequest.setReadyStateChangeThrottle(THROTTLE_TIME);

    const recordedHandler = recordFunction(channelRequest.xmlHttpHandler_);
    stubs.set(channelRequest, 'xmlHttpHandler_', recordedHandler);

    channelRequest.xmlHttpPost(new Uri('some_uri'), 'some_postdata', true);
    assertEquals(1, recordedHandler.getCallCount());

    checkReachabilityEvents(1, 0, 0, 0);
    if (ChannelRequest.supportsXhrStreaming()) {
      xhrIo.simulatePartialResponse('17\nI am a BC Message');
      checkReachabilityEvents(1, 0, 0, 1);
      assertEquals(3, recordedHandler.getCallCount());

      // Second event should be throttled
      xhrIo.simulatePartialResponse('23\nI am another BC Message');
      assertEquals(3, recordedHandler.getCallCount());

      xhrIo.simulatePartialResponse('27\nI am yet another BC Message');
      assertEquals(3, recordedHandler.getCallCount());
      mockClock.tick(THROTTLE_TIME);

      checkReachabilityEvents(1, 0, 0, 3);
      // Only one more call because of throttling.
      assertEquals(4, recordedHandler.getCallCount());

      xhrIo.simulateResponse(200, '16\Final BC Message');
      checkReachabilityEvents(1, 1, 0, 3);
      assertEquals(5, recordedHandler.getCallCount());
    } else {
      xhrIo.simulateResponse(200, '16\Final BC Message');
      checkReachabilityEvents(1, 1, 0, 0);
    }
  },

  /**
   * Make sure that the request "completes" with an error when the timeout
   * expires.
   */
  testRequestTimeout() {
    createChannelRequest();

    channelRequest.xmlHttpPost(new Uri('some_uri'), 'some_postdata', true);
    assertEquals(0, channelRequest.watchdogTimeoutCallCount);
    assertEquals(0, channelRequest.channel_.completedRequests.length);

    // Watchdog timeout.
    mockClock.tick(WATCHDOG_TIME);
    assertEquals(1, channelRequest.watchdogTimeoutCallCount);
    assertEquals(1, channelRequest.channel_.completedRequests.length);
    assertFalse(channelRequest.getSuccess());

    // Make sure no more timers are firing.
    mockClock.tick(ALL_DAY_MS);
    assertEquals(1, channelRequest.watchdogTimeoutCallCount);
    assertEquals(1, channelRequest.channel_.completedRequests.length);

    checkReachabilityEvents(1, 0, 1, 0);
  },

  testRequestTimeoutWithUnexpectedException() {
    createChannelRequest();
    channelRequest.channel_.createXhrIo = functions.error('Weird error');

    try {
      channelRequest.xmlHttpGet(new Uri('some_uri'), true, null);
      fail('Expected error');
    } catch (e) {
      assertEquals('Weird error', e.message);
    }

    assertEquals(0, channelRequest.watchdogTimeoutCallCount);
    assertEquals(0, channelRequest.channel_.completedRequests.length);

    // Watchdog timeout.
    mockClock.tick(WATCHDOG_TIME);
    assertEquals(1, channelRequest.watchdogTimeoutCallCount);
    assertEquals(1, channelRequest.channel_.completedRequests.length);
    assertFalse(channelRequest.getSuccess());

    // Make sure no more timers are firing.
    mockClock.tick(ALL_DAY_MS);
    assertEquals(1, channelRequest.watchdogTimeoutCallCount);
    assertEquals(1, channelRequest.channel_.completedRequests.length);

    checkReachabilityEvents(0, 0, 1, 0);
  },
});
