// Copyright 2008 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

goog.provide('goog.demos.editor.HelloWorldTest');
goog.setTestOnly('goog.demos.editor.HelloWorldTest');

goog.require('goog.demos.editor.HelloWorld');
goog.require('goog.dom');
goog.require('goog.testing.editor.FieldMock');
goog.require('goog.testing.editor.TestHelper');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

var FIELD;
var plugin;
var fieldMock;
var testHelper;

function setUpPage() {
  FIELD = goog.dom.getElement('field');
  testHelper = new goog.testing.editor.TestHelper(FIELD);
}

function setUp() {
  testHelper.setUpEditableElement();
  FIELD.focus();
  plugin = new goog.demos.editor.HelloWorld();
  fieldMock = /** @type {?} */ (new goog.testing.editor.FieldMock());
  plugin.registerFieldObject(fieldMock);
}

function tearDown() {
  testHelper.tearDownEditableElement();
}

function testIsSupportedCommand() {
  fieldMock.$replay();
  assertTrue('+helloWorld should be suported',
      plugin.isSupportedCommand('+helloWorld'));
  assertFalse('other commands should not be supported',
      plugin.isSupportedCommand('blah'));
  fieldMock.$verify();
}

function testExecCommandInternal() {
  // fails on Firefox
  if (goog.userAgent.GECKO) {
    return;
  }

  fieldMock.$replay();
  var result = plugin.execCommandInternal(
      goog.demos.editor.HelloWorld.COMMAND.HELLO_WORLD);
  assertUndefined(result);
  var spans = FIELD.getElementsByTagName('span');
  assertEquals(1, spans.length);
  var helloWorldSpan = spans.item(0);
  assertEquals('Hello World!', goog.dom.getTextContent(helloWorldSpan));
  fieldMock.$verify();
}
