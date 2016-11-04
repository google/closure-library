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

goog.provide('goog.dom.xmlTest');
goog.setTestOnly('goog.dom.xmlTest');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.xml');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

function testSerialize() {
  var doc = goog.dom.xml.createDocument();
  var node = doc.createElement('root');
  doc.appendChild(node);

  var serializedNode = goog.dom.xml.serialize(node);
  assertTrue(/<root ?\/>/.test(serializedNode));

  var serializedDoc = goog.dom.xml.serialize(doc);
  assertTrue(/(<\?xml version="1.0"\?>)?<root ?\/>/.test(serializedDoc));
}

function testSerializeWithActiveX() {
  // Prefer ActiveXObject if available.
  var doc = goog.dom.xml.createDocument('', '', true);
  var node = doc.createElement('root');
  doc.appendChild(node);

  var serializedNode = goog.dom.xml.serialize(node);
  assertTrue(/<root ?\/>/.test(serializedNode));

  var serializedDoc = goog.dom.xml.serialize(doc);
  assertTrue(/(<\?xml version="1.0"\?>)?<root ?\/>/.test(serializedDoc));
}

function testBelowMaxDepthInIE() {
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('9')) {
    // This value is only effective in IE8 and below
    goog.dom.xml.MAX_ELEMENT_DEPTH = 5;
    var junk = '<a><b><c><d><e>Hello</e></d></c></b></a>';
    var doc = goog.dom.xml.loadXml(junk);
    assertEquals(
        'Should not have caused a parse error', 0, Number(doc.parseError));
  }
}

function testAboveMaxDepthInIE() {
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('9')) {
    // This value is only effective in IE8 and below
    goog.dom.xml.MAX_ELEMENT_DEPTH = 4;
    var junk = '<a><b><c><d><e>Hello</e></d></c></b></a>';
    var doc = goog.dom.xml.loadXml(junk);
    assertNotEquals(
        'Should have caused a parse error', 0, Number(doc.parseError));
  }
}

function testBelowMaxSizeInIE() {
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('9')) {
    // This value is only effective in IE8 and below
    goog.dom.xml.MAX_XML_SIZE_KB = 1;
    var junk = '<a>' + new Array(50).join('<b>junk</b>') + '</a>';
    var doc = goog.dom.xml.loadXml(junk);
    assertEquals(
        'Should not have caused a parse error', 0, Number(doc.parseError));
  }
}

function testMaxSizeInIE() {
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('9')) {
    // This value is only effective in IE8 and below
    goog.dom.xml.MAX_XML_SIZE_KB = 1;
    var junk = '<a>' + new Array(1000).join('<b>junk</b>') + '</a>';
    var doc = goog.dom.xml.loadXml(junk);
    assertNotEquals(
        'Should have caused a parse error', 0, Number(doc.parseError));
  }
}

function testSelectSingleNodeNoActiveX() {
  if (goog.userAgent.IE) {
    return;
  }

  var xml = goog.dom.xml.loadXml('<a><b><c>d</c></b></a>');
  var node = xml.firstChild;
  var bNode = goog.dom.xml.selectSingleNode(node, 'b');
  assertNotNull(bNode);
}

function testSelectSingleNodeWithActiveX() {
  // Enable ActiveXObject so IE has xpath support.
  var xml = goog.dom.xml.loadXml('<a><b><c>d</c></b></a>', true);
  var node = xml.firstChild;
  var bNode = goog.dom.xml.selectSingleNode(node, 'b');
  assertNotNull(bNode);
}

function testSelectNodesNoActiveX() {
  if (goog.userAgent.IE) {
    return;
  }

  var xml = goog.dom.xml.loadXml('<a><b><c>d</c></b><b>foo</b></a>');
  var node = xml.firstChild;
  var bNodes = goog.dom.xml.selectNodes(node, 'b');
  assertNotNull(bNodes);
  assertEquals(2, bNodes.length);
}

function testSelectNodesWithActiveX() {
  var xml = goog.dom.xml.loadXml('<a><b><c>d</c></b><b>foo</b></a>', true);
  var node = xml.firstChild;
  var bNodes = goog.dom.xml.selectNodes(node, 'b');
  assertNotNull(bNodes);
  assertEquals(2, bNodes.length);
}

function testSetAttributes() {
  var xmlElement = goog.dom.xml.createDocument().createElement('root');
  var domElement = goog.dom.createElement(goog.dom.TagName.DIV);
  var attrs =
      {name: 'test3', title: 'A title', random: 'woop', cellpadding: '123'};

  goog.dom.xml.setAttributes(xmlElement, attrs);
  goog.dom.xml.setAttributes(domElement, attrs);

  assertEquals('test3', xmlElement.getAttribute('name'));
  assertEquals('test3', domElement.getAttribute('name'));

  assertEquals('A title', xmlElement.getAttribute('title'));
  assertEquals('A title', domElement.getAttribute('title'));

  assertEquals('woop', xmlElement.getAttribute('random'));
  assertEquals('woop', domElement.getAttribute('random'));

  assertEquals('123', xmlElement.getAttribute('cellpadding'));
  assertEquals('123', domElement.getAttribute('cellpadding'));
}
