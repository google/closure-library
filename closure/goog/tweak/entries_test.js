// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.tweak.BaseEntryTest');
goog.setTestOnly();

const MockControl = goog.require('goog.testing.MockControl');
const testSuite = goog.require('goog.testing.testSuite');
/** @suppress {extraRequire} needed for createRegistryEntries. */
const testhelpers = goog.require('goog.tweak.testhelpers');

let mockControl;

testSuite({
  setUp() {
    mockControl = new MockControl();
  },

  tearDown() {
    goog.tweak.registry_ = null;
    mockControl.$verifyAll();
  },

  testGetValue_defaultValues() {
    createRegistryEntries('');
    assertFalse('wrong initial value for bool', boolEntry.getValue());
    assertEquals('wrong initial value for enum', 'A', strEnumEntry.getValue());
    assertEquals('wrong initial value for str', '', strEntry.getValue());

    assertEquals('wrong initial value for bool2', true, boolEntry2.getValue());
    assertEquals('wrong initial value for enum2', 1, numEnumEntry.getValue());
    assertEquals('wrong initial value for str2', 'foo', strEntry2.getValue());

    assertFalse('wrong initial value for BoolOne', boolOneEntry.getValue());
    assertTrue('wrong initial value for BoolTwo', boolTwoEntry.getValue());
  },

  testGetValue_nonDefaultValues() {
    createRegistryEntries('?bool=1&enum=C');
    // These have the restartRequired option set.
    boolEntry.setValue(false);
    strEntry.setValue('foo');
    numEntry.setValue(5);
    assertTrue('wrong value for boolean', boolEntry.getValue());
    assertEquals(
        'wrong value for string', strEntry.getDefaultValue(),
        strEntry.getValue());
    assertEquals(
        'wrong value for num', numEntry.getDefaultValue(), numEntry.getValue());

    // These do not have the restartRequired option set.
    strEnumEntry.setValue('B');
    boolOneEntry.setValue(true);
    assertEquals('wrong value for strEnum', 'B', strEnumEntry.getValue());
    assertEquals('wrong value for boolOne', true, boolOneEntry.getValue());
  },

  testCallbacks() {
    createRegistryEntries('');
    const mockCallback = mockControl.createFunctionMock();
    boolEntry.addCallback(mockCallback);
    boolOneEntry.addCallback(mockCallback);
    strEnumEntry.addCallback(mockCallback);
    numEnumEntry.addCallback(mockCallback);

    mockCallback(boolEntry);
    mockCallback(boolOneEntry);
    mockCallback(strEnumEntry);
    mockCallback(numEnumEntry);
    mockControl.$replayAll();

    boolEntry.setValue(true);
    boolOneEntry.setValue(true);
    strEnumEntry.setValue('C');
    numEnumEntry.setValue(3);
  },
});
