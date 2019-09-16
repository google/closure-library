// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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

// Mock JScript functions
goog.module('goog.userAgent.jscriptTest');
goog.setTestOnly();

const jscript = goog.require('goog.userAgent.jscript');
const testSuite = goog.require('goog.testing.testSuite');



goog.global['ScriptEngine'] = function() {
  return 'JScript';
};

goog.global['ScriptEngineMajorVersion'] = function() {
  return 1;
};

goog.global['ScriptEngineMinorVersion'] = function() {
  return 2;
};

goog.global['ScriptEngineBuildVersion'] = function() {
  return 3456;
};


testSuite({
  setUpPage() {
    jscript.init();
  },

  testHasJscript() {
    assertTrue('Should have jscript', jscript.HAS_JSCRIPT);
  },

  testVersion() {
    assertEquals('Version should be 1.2.3456', '1.2.3456', jscript.VERSION);
  },

  testIsVersion() {
    assertTrue(
        'Should be version 1.2.3456 or larger', jscript.isVersion('1.2.3456'));
    assertTrue('Should be version 1.2 or larger', jscript.isVersion('1.2'));
    assertFalse(
        'Should not be version 8.9 or larger', jscript.isVersion('8.9'));
  },
});
