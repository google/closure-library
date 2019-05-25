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

goog.module('goog.testing.messaging.MockMessageChannelTest');
goog.setTestOnly();

const MockControl = goog.require('goog.testing.MockControl');
const MockMessageChannel = goog.require('goog.testing.messaging.MockMessageChannel');
const messaging = goog.require('goog.messaging');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testPipe() {
    const mockControl = new MockControl();
    const ch1 = new MockMessageChannel(mockControl);
    const ch2 = new MockMessageChannel(mockControl);
    ch1.send('ping', 'HELLO');
    ch2.send('pong', {key: 'value'});
    messaging.pipe(ch1, ch2);

    mockControl.$replayAll();
    ch2.receive('ping', 'HELLO');
    ch1.receive('pong', {key: 'value'});
    mockControl.$verifyAll();
  },
});
