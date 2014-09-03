// Copyright 2014 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.labs.structs.weak.unsupportedBrowserTest');
goog.setTestOnly('goog.labs.structs.weak.unsupportedBrowserTest');

goog.require('goog.asserts.AssertionError');
goog.require('goog.labs.structs.WeakMap');
goog.require('goog.labs.structs.weak');
goog.require('goog.testing.jsunit');


function shouldRunTests() {
  return !goog.labs.structs.weak.SUPPORTED_BROWSER;
}


function testMapConstructorFails() {
  var err = assertThrows(function() {
    new goog.labs.structs.WeakMap;
  });
  assertTrue(err instanceof goog.asserts.AssertionError);
}
