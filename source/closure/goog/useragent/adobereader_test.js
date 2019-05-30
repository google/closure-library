// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.userAgent.adobeReaderTest');
goog.setTestOnly();

const adobeReader = goog.require('goog.userAgent.adobeReader');
const testSuite = goog.require('goog.testing.testSuite');

// For now, just test that the variables exist, the test runner will
// pick up any runtime errors.
// TODO(chrisn): Mock out each browser implementation and test the code path
// correctly detects the version for each case.

testSuite({
  testAdobeReader() {
    assertNotUndefined(adobeReader.HAS_READER);
    assertNotUndefined(adobeReader.VERSION);
    assertNotUndefined(adobeReader.SILENT_PRINT);
  },
});
