// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.messaging.BufferedChannelTest');
goog.setTestOnly();

const AsyncMockControl = goog.require('goog.testing.async.MockControl');
const BufferedChannel = goog.require('goog.messaging.BufferedChannel');
const DebugConsole = goog.require('goog.debug.Console');
const Level = goog.require('goog.log.Level');
const MockClock = goog.require('goog.testing.MockClock');
const MockControl = goog.require('goog.testing.MockControl');
const MockMessageChannel = goog.require('goog.testing.messaging.MockMessageChannel');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const log = goog.require('goog.log');
const testSuite = goog.require('goog.testing.testSuite');

let clock;
const messages = [
  {serviceName: 'firstService', payload: 'firstPayload'},
  {serviceName: 'secondService', payload: 'secondPayload'},
];
let mockControl;
let asyncMockControl;

function assertMessageArraysEqual(ma1, ma2) {
  assertEquals('message array lengths differ', ma1.length, ma2.length);
  for (let i = 0; i < ma1.length; i++) {
    assertEquals(
        'message array serviceNames differ', ma1[i].serviceName,
        ma2[i].serviceName);
    assertEquals(
        'message array payloads differ', ma1[i].payload, ma2[i].payload);
  }
}

testSuite({
  setUpPage() {
    if (goog.global.console) {
      new DebugConsole().setCapturing(true);
    }
    const logger = log.getLogger('goog.messaging');
    logger.setLevel(Level.ALL);
    log.addHandler(logger, (logRecord) => {
      const msg = dom.createDom(TagName.DIV);
      msg.innerHTML = logRecord.getMessage();
      dom.appendChild(dom.getElement('debug-div'), msg);
    });
    clock = new MockClock();
    mockControl = new MockControl();
    asyncMockControl = new AsyncMockControl(mockControl);
  },

  setUp() {
    clock.install();
  },

  tearDown() {
    clock.uninstall();
    mockControl.$tearDown();
  },

  testDelegationToWrappedChannel() {
    const mockChannel = new MockMessageChannel(mockControl);
    const channel = new BufferedChannel(mockChannel);

    channel.registerDefaultService(asyncMockControl.asyncAssertEquals(
        'default service should be delegated', 'defaultServiceName',
        'default service payload'));
    channel.registerService(
        'normalServiceName',
        asyncMockControl.asyncAssertEquals(
            'normal service should be delegated', 'normal service payload'));
    mockChannel.send(
        BufferedChannel.USER_CHANNEL_NAME_ + ':message', 'payload');

    mockControl.$replayAll();
    channel.peerReady_ = true;  // Prevent buffering so we delegate send calls.
    mockChannel.receive(
        BufferedChannel.USER_CHANNEL_NAME_ + ':defaultServiceName',
        'default service payload');
    mockChannel.receive(
        BufferedChannel.USER_CHANNEL_NAME_ + ':normalServiceName',
        'normal service payload');
    channel.send('message', 'payload');
    mockControl.$verifyAll();
  },

  testOptionalConnectCallbackExecutes() {
    const mockChannel = new MockMessageChannel(mockControl);
    const channel = new BufferedChannel(mockChannel);
    const mockConnectCb = mockControl.createFunctionMock('mockConnectCb');
    mockConnectCb();

    mockControl.$replayAll();
    channel.connect(mockConnectCb);
    mockControl.$verifyAll();
  },

  testSendExceptionsInSendReadyPingStopsTimerAndReraises() {
    const mockChannel = new MockMessageChannel(mockControl);
    const channel = new BufferedChannel(mockChannel);

    const errorMessage = 'errorMessage';
    mockChannel
        .send(
            BufferedChannel.CONTROL_CHANNEL_NAME_ + ':' +
                BufferedChannel.PEER_READY_SERVICE_NAME_,
            /* payload */ '')
        .$throws(Error(errorMessage));
    channel.timer_.enabled = true;

    mockControl.$replayAll();
    const exception = assertThrows(() => {
      channel.sendReadyPing_();
    });
    assertContains(errorMessage, exception.message);
    assertFalse(channel.timer_.enabled);
    mockControl.$verifyAll();
  },

  testPollingIntervalDefaultAndOverride() {
    const mockChannel = new MockMessageChannel(mockControl);
    const channel = new BufferedChannel(mockChannel);

    assertEquals(
        BufferedChannel.DEFAULT_INTERVAL_MILLIS_, channel.timer_.getInterval());
    const interval = 100;
    const longIntervalChannel =
        new BufferedChannel(new MockMessageChannel(mockControl), interval);
    assertEquals(interval, longIntervalChannel.timer_.getInterval());
  },

  testBidirectionalCommunicationBuffersUntilReadyPingsSucceed() {
    const mockChannel1 = new MockMessageChannel(mockControl);
    const mockChannel2 = new MockMessageChannel(mockControl);
    const bufferedChannel1 = new BufferedChannel(mockChannel1);
    const bufferedChannel2 = new BufferedChannel(mockChannel2);
    mockChannel1
        .send(BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_', '')
        .$does(() => {
          bufferedChannel2.setPeerReady_('');
        });
    mockChannel2
        .send(BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_', '1')
        .$does(() => {
          bufferedChannel1.setPeerReady_('1');
        });
    mockChannel1
        .send(BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_', '1')
        .$does(() => {
          bufferedChannel2.setPeerReady_('1');
        });
    mockChannel1.send(
        BufferedChannel.USER_CHANNEL_NAME_ + ':' + messages[0].serviceName,
        messages[0].payload);
    mockChannel2.send(
        BufferedChannel.USER_CHANNEL_NAME_ + ':' + messages[1].serviceName,
        messages[1].payload);

    mockControl.$replayAll();
    bufferedChannel1.send(messages[0].serviceName, messages[0].payload);
    bufferedChannel2.send(messages[1].serviceName, messages[1].payload);
    assertMessageArraysEqual([messages[0]], bufferedChannel1.buffer_);
    assertMessageArraysEqual([messages[1]], bufferedChannel2.buffer_);
    // First tick causes setPeerReady_ to fire, which in turn flushes the
    // buffers.
    clock.tick(BufferedChannel.DEFAULT_INTERVAL_MILLIS_);
    assertEquals(bufferedChannel1.buffer_, null);
    assertEquals(bufferedChannel2.buffer_, null);
    // Now that peers are ready, a second tick causes no more sends.
    clock.tick(BufferedChannel.DEFAULT_INTERVAL_MILLIS_);
    mockControl.$verifyAll();
  },

  testBidirectionalCommunicationReconnectsAfterOneSideRestarts() {
    const mockChannel1 = new MockMessageChannel(mockControl);
    const mockChannel2 = new MockMessageChannel(mockControl);
    const mockChannel3 = new MockMessageChannel(mockControl);
    const bufferedChannel1 = new BufferedChannel(mockChannel1);
    const bufferedChannel2 = new BufferedChannel(mockChannel2);
    const bufferedChannel3 = new BufferedChannel(mockChannel3);

    // First tick
    mockChannel1
        .send(BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_', '')
        .$does(() => {
          bufferedChannel2.setPeerReady_('');
        });
    mockChannel2
        .send(BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_', '1')
        .$does(() => {
          bufferedChannel1.setPeerReady_('1');
        });
    mockChannel1
        .send(BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_', '1')
        .$does(() => {
          bufferedChannel2.setPeerReady_('1');
        });
    mockChannel3.send(
        BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_',
        '');  // pretend it's not ready to connect yet

    // Second tick
    mockChannel3
        .send(BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_', '')
        .$does(() => {
          bufferedChannel1.setPeerReady_('');
        });

    // Third tick
    mockChannel1
        .send(BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_', '1')
        .$does(() => {
          bufferedChannel3.setPeerReady_('1');
        });
    mockChannel3
        .send(BufferedChannel.CONTROL_CHANNEL_NAME_ + ':setPeerReady_', '1')
        .$does(() => {
          bufferedChannel1.setPeerReady_('1');
        });

    mockChannel1.send(
        BufferedChannel.USER_CHANNEL_NAME_ + ':' + messages[0].serviceName,
        messages[0].payload);
    mockChannel3.send(
        BufferedChannel.USER_CHANNEL_NAME_ + ':' + messages[1].serviceName,
        messages[1].payload);

    mockControl.$replayAll();
    // First tick causes setPeerReady_ to fire, which sets up the connection
    // between channels 1 and 2.
    clock.tick(BufferedChannel.DEFAULT_INTERVAL_MILLIS_);
    assertTrue(bufferedChannel1.peerReady_);
    assertTrue(bufferedChannel2.peerReady_);
    // Now pretend that channel 2 went down and was replaced by channel 3, which
    // is trying to connect with channel 1.
    clock.tick(BufferedChannel.DEFAULT_INTERVAL_MILLIS_);
    assertTrue(bufferedChannel1.peerReady_);
    clock.tick(BufferedChannel.DEFAULT_INTERVAL_MILLIS_);
    assertTrue(bufferedChannel3.peerReady_);
    bufferedChannel1.send(messages[0].serviceName, messages[0].payload);
    bufferedChannel3.send(messages[1].serviceName, messages[1].payload);
    // All timers stopped, nothing happens on the fourth tick.
    clock.tick(BufferedChannel.DEFAULT_INTERVAL_MILLIS_);
    mockControl.$verifyAll();
  },
});
