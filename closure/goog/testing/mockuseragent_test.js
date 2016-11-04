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

goog.provide('goog.testing.MockUserAgentTest');

goog.require('goog.dispose');
goog.require('goog.testing.MockUserAgent');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

goog.setTestOnly('goog.testing.MockUserAgentTest');

var mockUserAgent;

function setUp() {
  mockUserAgent = new goog.testing.MockUserAgent();
}

function tearDown() {
  goog.dispose(mockUserAgent);
  assertFalse(mockUserAgent.installed_);
}

function testMockUserAgentInstall() {
  var originalUserAgentFunction = goog.userAgent.getUserAgentString;

  assertFalse(!!mockUserAgent.installed_);

  mockUserAgent.install();
  assertTrue(mockUserAgent.installed_);
  assertNotEquals(goog.userAgent.getUserAgentString, originalUserAgentFunction);

  mockUserAgent.uninstall();
  assertFalse(mockUserAgent.installed_);
  assertEquals(originalUserAgentFunction, goog.userAgent.getUserAgentString);
}

function testMockUserAgentGetAgent() {
  var uaString = 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) ' +
      'AppleWebKit/525.13 (KHTML, like Gecko) ' +
      'Chrome/0.2.149.27 Safari/525.13';

  mockUserAgent = new goog.testing.MockUserAgent();
  mockUserAgent.setUserAgentString(uaString);
  mockUserAgent.install();

  assertTrue(mockUserAgent.installed_);
  assertEquals(uaString, goog.userAgent.getUserAgentString());
}

function testMockUserAgentNavigator() {
  var fakeNavigator = {};

  mockUserAgent = new goog.testing.MockUserAgent();
  mockUserAgent.setNavigator(fakeNavigator);
  mockUserAgent.install();

  assertTrue(mockUserAgent.installed_);
  assertEquals(fakeNavigator, goog.userAgent.getNavigator());
}

function testMockUserAgentDocumentMode() {
  var fakeDocumentMode = -1;

  mockUserAgent = new goog.testing.MockUserAgent();
  mockUserAgent.setDocumentMode(fakeDocumentMode);
  mockUserAgent.install();

  assertTrue(mockUserAgent.installed_);
  assertEquals(fakeDocumentMode, goog.userAgent.getDocumentMode_());
  assertEquals(fakeDocumentMode, goog.userAgent.DOCUMENT_MODE);
}
