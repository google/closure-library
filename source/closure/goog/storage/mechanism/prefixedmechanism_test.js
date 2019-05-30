// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.storage.mechanism.PrefixedMechanismTest');
goog.setTestOnly();

const HTML5LocalStorage = goog.require('goog.storage.mechanism.HTML5LocalStorage');
const PrefixedMechanism = goog.require('goog.storage.mechanism.PrefixedMechanism');
/** @suppress {extraRequire} */
const mechanismSeparationTester = goog.require('goog.storage.mechanism.mechanismSeparationTester');
/** @suppress {extraRequire} */
const mechanismSharingTester = goog.require('goog.storage.mechanism.mechanismSharingTester');
const testSuite = goog.require('goog.testing.testSuite');

let submechanism = null;

testSuite({
  setUp() {
    submechanism = new HTML5LocalStorage();
    if (submechanism.isAvailable()) {
      mechanism = new PrefixedMechanism(submechanism, 'test');
      mechanism_shared = new PrefixedMechanism(submechanism, 'test');
      mechanism_separate = new PrefixedMechanism(submechanism, 'test2');
    }
  },

  tearDown() {
    if (!!mechanism) {
      mechanism.clear();
      mechanism = null;
    }
    if (!!mechanism_shared) {
      mechanism_shared.clear();
      mechanism_shared = null;
    }
    if (!!mechanism_separate) {
      mechanism_separate.clear();
      mechanism_separate = null;
    }
  },

  testAvailability() {
    if (submechanism.isAvailable()) {
      assertNotNull(mechanism);
      assertNotNull(mechanism_shared);
      assertNotNull(mechanism_separate);
    }
  },
});
