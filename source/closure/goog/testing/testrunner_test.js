// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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

goog.setTestOnly();

goog.require('goog.testing.TestCase');
goog.require('goog.testing.TestRunner');
goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');


let testRunner;
let testCase;

function setUp() {
  testRunner = new goog.testing.TestRunner();
  testCase = new goog.testing.TestCase();
}

function testInitialize() {
  assert(!testRunner.isInitialized());
  testRunner.initialize(testCase);
  assert(testRunner.isInitialized());
}

function testIsFinished() {
  testRunner.initialize(testCase);
  // uuid is optional
  assert(!testRunner.isFinished());
  // If provided, uuid is remembered.
  assert(!testRunner.isFinished(1.0));
  // If provided, uuid is checked.
  assert(!testRunner.isFinished(1.0));
  assertThrows(function() {
    testRunner.isFinished(2.0);
  });
}

function testGetUuid() {
  testRunner.getSearchString = () => '?goop';
  assertEquals(testRunner.getUuid(), null);
  testRunner.getSearchString = () => '?uuid=1.0';
  assertEquals(testRunner.getUuid(), 1.0);
  testRunner.getSearchString = () => '?uuid=.1';
  assertEquals(testRunner.getUuid(), .1);
  testRunner.getSearchString = () => '?uuid=.1111';
  assertEquals(testRunner.getUuid(), .1111);
  testRunner.getSearchString = () => '?uuid=.1111&foo=bar';
  assertEquals(testRunner.getUuid(), .1111);
}

function testInitializeUuid() {
  assert(!testRunner.isInitialized());
  testRunner.getSearchString = () => '?uuid=.111';
  testRunner.initialize(testCase);
  // We can poll for isFinished multiple times if the uuid matches.
  assert(!testRunner.isFinished(.111));
  assert(!testRunner.isFinished(.111));
  assertThrows(function() {
    testRunner.isFinished(2.0);
  });
}
