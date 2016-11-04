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


goog.provide('goog.fx.easingTest');
goog.setTestOnly('goog.fx.easingTest');

goog.require('goog.fx.easing');
goog.require('goog.testing.jsunit');


function testEaseIn() {
  assertEquals(0, goog.fx.easing.easeIn(0));
  assertEquals(1, goog.fx.easing.easeIn(1));
  assertRoughlyEquals(Math.pow(0.5, 3), goog.fx.easing.easeIn(0.5), 0.01);
}

function testEaseOut() {
  assertEquals(0, goog.fx.easing.easeOut(0));
  assertEquals(1, goog.fx.easing.easeOut(1));
  assertRoughlyEquals(1 - Math.pow(0.5, 3), goog.fx.easing.easeOut(0.5), 0.01);
}
