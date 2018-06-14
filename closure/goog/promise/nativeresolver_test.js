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

goog.module('goog.promise.nativeResolverTest');
goog.setTestOnly();

const NativeResolver = goog.require('goog.promise.NativeResolver');
const testSuite = goog.require('goog.testing.testSuite');

let resolver;

testSuite({
  setUp() {
    resolver = new NativeResolver();
  },

  testResolve() {
    resolver.resolve('test');
    return resolver.promise.then((val) => {
      assertEquals('test', val);
    }, fail);
  },

  testReject() {
    resolver.reject(new Error('test'));
    return resolver.promise.then(fail, (e) => {
      assertEquals('test', e.message);
    });
  }
});
