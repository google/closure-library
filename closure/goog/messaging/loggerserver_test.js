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

goog.module('goog.messaging.LoggerServerTest');
goog.setTestOnly();

const Level = goog.require('goog.log.Level');
const LogManager = goog.require('goog.debug.LogManager');
const Logger = goog.require('goog.debug.Logger');
const LoggerServer = goog.require('goog.messaging.LoggerServer');
const MockControl = goog.require('goog.testing.MockControl');
const MockMessageChannel = goog.require('goog.testing.messaging.MockMessageChannel');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const log = goog.require('goog.log');
const testSuite = goog.require('goog.testing.testSuite');

let mockControl;
let channel;
let stubs;

testSuite({
  setUpPage() {
    stubs = new PropertyReplacer();
  },

  setUp() {
    mockControl = new MockControl();
    channel = new MockMessageChannel(mockControl);
    stubs.set(
        LogManager, 'getLogger',
        mockControl.createFunctionMock('goog.log.getLogger'));
  },

  tearDown() {
    channel.dispose();
    stubs.reset();
  },

  testCommandWithoutChannelName() {
    const mockLogger = mockControl.createStrictMock(Logger);
    log.getLogger('test.object.Name').$returns(mockLogger);
    log.log(mockLogger, Level.SEVERE, '[remote logger] foo bar', null);
    mockControl.$replayAll();

    const server = new LoggerServer(channel, 'log');
    channel.receive('log', {
      name: 'test.object.Name',
      level: Level.SEVERE.value,
      message: 'foo bar',
      exception: null,
    });
    mockControl.$verifyAll();
    server.dispose();
  },

  testCommandWithChannelName() {
    const mockLogger = mockControl.createStrictMock(Logger);
    log.getLogger('test.object.Name').$returns(mockLogger);
    log.log(mockLogger, Level.SEVERE, '[some channel] foo bar', null);
    mockControl.$replayAll();

    const server = new LoggerServer(channel, 'log', 'some channel');
    channel.receive('log', {
      name: 'test.object.Name',
      level: Level.SEVERE.value,
      message: 'foo bar',
      exception: null,
    });
    mockControl.$verifyAll();
    server.dispose();
  },

  testCommandWithException() {
    const mockLogger = mockControl.createStrictMock(Logger);
    log.getLogger('test.object.Name').$returns(mockLogger);
    log.log(
        mockLogger, Level.SEVERE, '[some channel] foo bar',
        {message: 'Bad things', stack: ['foo', 'bar']});
    mockControl.$replayAll();

    const server = new LoggerServer(channel, 'log', 'some channel');
    channel.receive('log', {
      name: 'test.object.Name',
      level: Level.SEVERE.value,
      message: 'foo bar',
      exception: {message: 'Bad things', stack: ['foo', 'bar']},
    });
    mockControl.$verifyAll();
    server.dispose();
  },
});
