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

goog.module('goog.debug.entryPointRegistryTest');
goog.setTestOnly();

const ErrorHandler = goog.require('goog.debug.ErrorHandler');
const entryPointRegistry = goog.require('goog.debug.entryPointRegistry');
const testSuite = goog.require('goog.testing.testSuite');

let lastError;
let errorHandler;
let errorFn;

testSuite({
  setUp() {
    lastError = null;
    errorFn = (message) => {
      throw {message: message};
    };
    errorHandler = new ErrorHandler((ex) => {
      lastError = ex;
    });
    entryPointRegistry.refList_ = [];
  },

  testMonitorAndUnmonitor() {
    entryPointRegistry.register((transformer) => {
      errorFn = transformer(errorFn);
    });
    entryPointRegistry.monitorAll(errorHandler);

    let e = assertThrows('expected error', goog.partial(errorFn, 'Hello!'));
    assertEquals('Error in protected function: Hello!', e.message);
    assertEquals('Hello!', lastError.message);

    entryPointRegistry.unmonitorAllIfPossible(errorHandler);

    e = assertThrows('expected error', goog.partial(errorFn, 'Goodbye!'));
    assertEquals('Goodbye!', e.message);
    assertEquals('Hello!', lastError.message);
  },

  testRegisterAfterMonitor() {
    entryPointRegistry.monitorAll(errorHandler);
    entryPointRegistry.register((transformer) => {
      errorFn = transformer(errorFn);
    });

    let e = assertThrows('expected error', goog.partial(errorFn, 'Hello!'));
    assertEquals('Error in protected function: Hello!', e.message);
    assertEquals('Hello!', lastError.message);

    entryPointRegistry.unmonitorAllIfPossible(errorHandler);

    e = assertThrows('expected error', goog.partial(errorFn, 'Goodbye!'));
    assertEquals('Goodbye!', e.message);
    assertEquals('Hello!', lastError.message);
  },

  testInvalidUnmonitor() {
    entryPointRegistry.monitorAll(errorHandler);
    const e = assertThrows(
        'expected error',
        goog.partial(
            entryPointRegistry.unmonitorAllIfPossible, new ErrorHandler()));
    assertEquals(
        'Assertion failed: Only the most recent monitor can be unwrapped.',
        e.message);
    entryPointRegistry.unmonitorAllIfPossible(errorHandler);
  },
});
