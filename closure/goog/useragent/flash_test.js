// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.userAgent.flashTest');
goog.setTestOnly('goog.userAgent.flashTest');

goog.require('goog.testing.jsunit');
goog.require('goog.userAgent.flash');

// For now, just test that the flash variables exist, the test runner will
// pick up any runtime errors.
// TODO(user): Mock out each browser implementation and test the code path
// correctly detects the flash version for each case.
function testFlash() {
  assertNotUndefined(goog.userAgent.flash.HAS_FLASH);
  assertNotUndefined(goog.userAgent.flash.VERSION);
  assertEquals(typeof goog.userAgent.flash.isVersion('5'), 'boolean');
}
