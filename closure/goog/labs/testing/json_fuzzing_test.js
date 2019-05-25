// Copyright 2015 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.labs.testing.JsonFuzzingTest');
goog.setTestOnly();

const JsonFuzzing = goog.require('goog.labs.testing.JsonFuzzing');
const asserts = goog.require('goog.testing.asserts');
const googJson = goog.require('goog.json');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testValidJson() {
    const fuzzing = new JsonFuzzing();  // seeded with now()

    for (let i = 0; i < 10; i++) {
      const data = fuzzing.newArray();
      assertTrue(goog.isArray(data));
      // JSON compatible
      assertNotThrows(() => {
        googJson.serialize(data);
      });
    }
  },
});
