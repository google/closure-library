// Copyright 2018 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for goog.labs.net.webChannel.environment.
 *
 */

goog.module('goog.labs.net.webChannel.EnvironmentTest');
goog.setTestOnly('goog.labs.net.webChannel.EnvironmentTest');

var environment = goog.require('goog.labs.net.webChannel.environment');
var testSuite = goog.require('goog.testing.testSuite');
var userAgent = goog.require('goog.userAgent');

testSuite({
  testPollingRequiredForEdge: function() {
    if (!userAgent.EDGE) return;

    assertTrue(environment.isPollingRequired());

    // 100ms as the lower-bound, enforced in tests
    assertTrue(environment.getPollingInterval() > 100);
  },
});
