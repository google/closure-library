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

goog.module('goog.i18n.uCharNamesTest');
goog.setTestOnly();

const testSuite = goog.require('goog.testing.testSuite');
const uCharNames = goog.require('goog.i18n.uCharNames');

testSuite({
  testToName() {
    const result = uCharNames.toName(' ');
    assertEquals('Space', result);
  },

  testToNameForNumberKey() {
    const result = uCharNames.toName('\u2028');
    assertEquals('Line Separator', result);
  },

  testToNameForVariationSelector() {
    const result = uCharNames.toName('\ufe00');
    assertEquals('Variation Selector - 1', result);
  },

  testToNameForVariationSelectorSupp() {
    const result = uCharNames.toName('\uDB40\uDD00');
    assertEquals('Variation Selector - 17', result);
  },

  testToNameForNull() {
    const result = uCharNames.toName('a');
    assertNull(result);
  },
});
