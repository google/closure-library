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

goog.module('goog.storage.mechanism.ErrorHandlingMechanismTest');
goog.setTestOnly();

const ErrorHandlingMechanism = goog.require('goog.storage.mechanism.ErrorHandlingMechanism');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

const error = new Error();

const submechanism = {
  get: function() {
    throw error;
  },
  set: function() {
    throw error;
  },
  remove: function() {
    throw error;
  },
};

const handler = recordFunction(goog.nullFunction);
let mechanism;

testSuite({
  setUp() {
    mechanism = new ErrorHandlingMechanism(submechanism, handler);
  },

  tearDown() {
    handler.reset();
  },

  testSet() {
    mechanism.set('foo', 'bar');
    assertEquals(1, handler.getCallCount());
    assertArrayEquals(
        [
          error,
          ErrorHandlingMechanism.Operation.SET,
          'foo',
          'bar',
        ],
        handler.getLastCall().getArguments());
  },

  testGet() {
    mechanism.get('foo');
    assertEquals(1, handler.getCallCount());
    assertArrayEquals(
        [
          error,
          ErrorHandlingMechanism.Operation.GET,
          'foo',
        ],
        handler.getLastCall().getArguments());
  },

  testRemove() {
    mechanism.remove('foo');
    assertEquals(1, handler.getCallCount());
    assertArrayEquals(
        [
          error,
          ErrorHandlingMechanism.Operation.REMOVE,
          'foo',
        ],
        handler.getLastCall().getArguments());
  },
});
