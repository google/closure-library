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

/**
 * @fileoverview Unit tests for goog.html.SafeStyle and its builders.
 */

goog.provide('goog.html.safeStyleTest');

goog.require('goog.html.SafeStyle');
goog.require('goog.string.Const');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.html.safeStyleTest');


function testSafeStyle() {
  var style = 'width: 1em;height: 1em;';
  var safeStyle =
      goog.html.SafeStyle.fromConstant(goog.string.Const.from(style));
  var extracted = goog.html.SafeStyle.unwrap(safeStyle);
  assertEquals(style, extracted);
  assertEquals(style, safeStyle.getTypedStringValue());
  assertEquals('SafeStyle{' + style + '}', String(safeStyle));

  // Interface marker is present.
  assertTrue(safeStyle.implementsGoogStringTypedString);
}


/** @suppress {checkTypes} */
function testUnwrap() {
  var evil = {};
  evil.safeStyleValueWithSecurityContract__googHtmlSecurityPrivate_ =
      'width: expression(evil);';
  evil.SAFE_STYLE_TYPE_MARKER__GOOG_HTML_SECURITY_PRIVATE_ = {};

  var exception = assertThrows(function() {
    goog.html.SafeStyle.unwrap(evil);
  });
  assertTrue(
      exception.message.indexOf('expected object of type SafeStyle') > 0);
}


function testFromConstant_allowsEmptyString() {
  assertEquals(
      goog.html.SafeStyle.EMPTY,
      goog.html.SafeStyle.fromConstant(goog.string.Const.from('')));
}

function testFromConstant_throwsOnForbiddenCharacters() {
  assertThrows(function() {
    goog.html.SafeStyle.fromConstant(goog.string.Const.from('<'));
  });
}


function testFromConstant_throwsIfNoFinalSemicolon() {
  assertThrows(function() {
    goog.html.SafeStyle.fromConstant(goog.string.Const.from('width: 1em'));
  });
}


function testFromConstant_throwsIfNoColon() {
  assertThrows(function() {
    goog.html.SafeStyle.fromConstant(goog.string.Const.from('width= 1em;'));
  });
}


function testEmpty() {
  assertEquals('', goog.html.SafeStyle.unwrap(goog.html.SafeStyle.EMPTY));
}
