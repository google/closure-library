// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.singletonTest');
goog.setTestOnly();

const asserts = goog.require('goog.testing.asserts');
const singleton = goog.require('goog.testing.singleton');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testGetInstance() {
    function SingletonClass() {}
    goog.addSingletonGetter(SingletonClass);

    const s1 = SingletonClass.getInstance();
    const s2 = SingletonClass.getInstance();
    assertEquals('second getInstance call returns the same instance', s1, s2);

    singleton.reset();
    const s3 = SingletonClass.getInstance();
    assertNotEquals('getInstance returns a new instance after reset', s1, s3);
  },
});
