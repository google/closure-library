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

goog.provide('goog.messaging.RespondingChannelTest');
goog.setTestOnly('goog.messaging.RespondingChannelTest');

goog.require('goog.Promise');
goog.require('goog.messaging.RespondingChannel');
goog.require('goog.testing.MockControl');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.messaging.MockMessageChannel');
goog.require('goog.testing.recordFunction');

var CH1_REQUEST = {'request': 'quux1'};
var CH2_REQUEST = {'request': 'quux2'};
var CH1_RESPONSE = {'response': 'baz1'};
var CH2_RESPONSE = {'response': 'baz2'};
var SERVICE_NAME = 'serviceName';

var mockControl;
var ch1;
var ch2;
var respondingCh1;
var respondingCh2;
var stubs;

function setUp() {
  mockControl = new goog.testing.MockControl();

  ch1 = new goog.testing.messaging.MockMessageChannel(mockControl);
  ch2 = new goog.testing.messaging.MockMessageChannel(mockControl);

  respondingCh1 = new goog.messaging.RespondingChannel(ch1);
  respondingCh2 = new goog.messaging.RespondingChannel(ch2);

  stubs = new goog.testing.PropertyReplacer();
}

function tearDown() {
  respondingCh1.dispose();
  respondingCh2.dispose();
  mockControl.$verifyAll();
  stubs.reset();
}

function testSendWithSignature() {
  // 1 to 2 and back.
  var message1Ch1Request = {'data': CH1_REQUEST, 'signature': 0};
  var message1Ch2Response = {'data': CH2_RESPONSE, 'signature': 0};
  var message2Ch1Request = {'data': CH1_REQUEST, 'signature': 1};
  var message2Ch2Response = {'data': CH2_RESPONSE, 'signature': 1};
  // 2 to 1 and back.
  var message3Ch2Request = {'data': CH2_REQUEST, 'signature': 0};
  var message3Ch1Response = {'data': CH1_RESPONSE, 'signature': 0};
  var message4Ch2Request = {'data': CH2_REQUEST, 'signature': 1};
  var message4Ch1Response = {'data': CH1_RESPONSE, 'signature': 1};

  // The RespondingChannel calls send() synchronously from its send() method.
  // Request sent from channel 1 to channel 2.
  ch1.send('public:' + SERVICE_NAME, message1Ch1Request);
  ch1.send('public:' + SERVICE_NAME, message2Ch1Request);

  // Request sent from channel 2 to channel 1.
  ch2.send('public:' + SERVICE_NAME, message3Ch2Request);
  ch2.send('public:' + SERVICE_NAME, message4Ch2Request);

  // It calls send() asynchronously when it receives a message.
  // Request sent from channel 1 to channel 2.
  ch2.send('private:mics', message1Ch2Response);
  ch2.send('private:mics', message2Ch2Response);

  // Request sent from channel 2 to channel 1.
  ch1.send('private:mics', message3Ch1Response);
  ch1.send('private:mics', message4Ch1Response);

  mockControl.$replayAll();

  var hasInvokedCh1 = false;
  var hasInvokedCh2 = false;
  var hasReturnedFromCh1 = false;
  var hasReturnedFromCh2 = false;

  var serviceCallback1 = function(message) {
    hasInvokedCh1 = true;
    assertObjectEquals(CH2_REQUEST, message);
    return CH1_RESPONSE;
  };

  var serviceCallback2 = function(message) {
    hasInvokedCh2 = true;
    assertObjectEquals(CH1_REQUEST, message);
    return CH2_RESPONSE;
  };

  var invocationCallback1 = function(message) {
    hasReturnedFromCh2 = true;
    assertObjectEquals(CH2_RESPONSE, message);
  };

  var invocationCallback2 = function(message) {
    hasReturnedFromCh1 = true;
    assertObjectEquals(CH1_RESPONSE, message);
  };

  respondingCh1.registerService(SERVICE_NAME, serviceCallback1);
  respondingCh2.registerService(SERVICE_NAME, serviceCallback2);

  respondingCh1.send(SERVICE_NAME, CH1_REQUEST, invocationCallback1);
  ch2.receive('public:' + SERVICE_NAME, message1Ch1Request);
  ch1.receive('private:mics', message1Ch2Response);

  respondingCh1.send(SERVICE_NAME, CH1_REQUEST, invocationCallback1);
  ch2.receive('public:' + SERVICE_NAME, message2Ch1Request);
  ch1.receive('private:mics', message2Ch2Response);

  respondingCh2.send(SERVICE_NAME, CH2_REQUEST, invocationCallback2);
  ch1.receive('public:' + SERVICE_NAME, message3Ch2Request);
  ch2.receive('private:mics', message3Ch1Response);

  respondingCh2.send(SERVICE_NAME, CH2_REQUEST, invocationCallback2);
  ch1.receive('public:' + SERVICE_NAME, message4Ch2Request);
  ch2.receive('private:mics', message4Ch1Response);

  // Wait for asynchronous calls to occur.
  return goog.Promise.resolve().then(function() {
    assertTrue(
        hasInvokedCh1 && hasInvokedCh2 && hasReturnedFromCh1 &&
        hasReturnedFromCh2);
  });
}

function testWaitsForAsyncCallbackBeforeSendingResponse() {
  stubs.set(ch1, 'send', goog.testing.recordFunction());
  ch1.send('private:mics', {'data': CH1_RESPONSE, 'signature': 0});
  mockControl.$replayAll();

  var whenResponseReady = goog.Promise.withResolver();
  var serviceHandler = function(message) {
    return whenResponseReady.promise;
  };

  respondingCh1.registerService(SERVICE_NAME, serviceHandler);
  ch1.receive('public:' + SERVICE_NAME, {'data': CH1_REQUEST, 'signature': 0});
  // The call to send() before $replayAll() counts as one call.
  ch1.send.assertCallCount(1);

  whenResponseReady.resolve(CH1_RESPONSE);
  return whenResponseReady.promise.then(function() {
    ch1.send.assertCallCount(2);
  });
}
