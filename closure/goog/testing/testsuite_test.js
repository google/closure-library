// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.testSuiteTest');
goog.setTestOnly();

const TestCase = goog.require('goog.testing.TestCase');
const asserts = goog.require('goog.testing.asserts');
const testSuite = goog.require('goog.testing.testSuite');

let calls;

testSuite({
  setUp() {
    calls = 0;
    TestCase.initializeTestRunner = () => {
      calls++;
    };
    testSuite.resetForTesting();
  },

  testTestSuiteInitializesRunner() {
    testSuite({testOne: function() {}});
    assert(calls == 1);
  },

  testTestSuiteInitializesRunnerThrowsOnSecondCall() {
    testSuite({testOne: function() {}});
    assertThrows(() => {
      testSuite({testTwo: function() {}});
    });
  },
});
