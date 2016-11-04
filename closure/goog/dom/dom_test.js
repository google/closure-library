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

/**
 * @fileoverview Shared code for dom_test.html and dom_quirks_test.html.
 */

/** @suppress {extraProvide} */
goog.provide('goog.dom.dom_test');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.BrowserFeature');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.InputType');
goog.require('goog.dom.NodeType');
goog.require('goog.dom.TagName');
goog.require('goog.functions');
goog.require('goog.html.testing');
goog.require('goog.object');
goog.require('goog.string.Const');
goog.require('goog.string.Unicode');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.asserts');
goog.require('goog.userAgent');
goog.require('goog.userAgent.product');
goog.require('goog.userAgent.product.isVersion');

goog.setTestOnly('dom_test');

var $ = goog.dom.getElement;

var divForTestingScrolling;
var myIframe;
var myIframeDoc;
var stubs;

function setUpPage() {
  stubs = new goog.testing.PropertyReplacer();
  divForTestingScrolling = goog.dom.createElement(goog.dom.TagName.DIV);
  divForTestingScrolling.style.width = '5000px';
  divForTestingScrolling.style.height = '5000px';
  document.body.appendChild(divForTestingScrolling);

  // Setup for the iframe
  myIframe = $('myIframe');
  myIframeDoc = goog.dom.getFrameContentDocument(
      /** @type {HTMLIFrameElement} */ (myIframe));

  // Set up document for iframe: total height of elements in document is 65
  // If the elements are not create like below, IE will get a wrong height for
  // the document.
  myIframeDoc.open();
  // Make sure we progate the compat mode
  myIframeDoc.write(
      (goog.dom.isCss1CompatMode() ? '<!DOCTYPE html>' : '') +
      '<style>body{margin:0;padding:0}</style>' +
      '<div style="height:42px;font-size:1px;line-height:0;">' +
      'hello world</div>' +
      '<div style="height:23px;font-size:1px;line-height:0;">' +
      'hello world</div>');
  myIframeDoc.close();
}

function tearDownPage() {
  document.body.removeChild(divForTestingScrolling);
}

function tearDown() {
  window.scrollTo(0, 0);
  stubs.reset();
}

function testDom() {
  assert('Dom library exists', typeof goog.dom != 'undefined');
}

function testGetElement() {
  var el = $('testEl');
  assertEquals('Should be able to get id', el.id, 'testEl');

  assertEquals($, goog.dom.getElement);
  assertEquals(goog.dom.$, goog.dom.getElement);
}

function testGetElementDomHelper() {
  var domHelper = new goog.dom.DomHelper();
  var el = domHelper.getElement('testEl');
  assertEquals('Should be able to get id', el.id, 'testEl');
}

function testGetRequiredElement() {
  var el = goog.dom.getRequiredElement('testEl');
  assertTrue(goog.isDefAndNotNull(el));
  assertEquals('testEl', el.id);
  assertThrows(function() { goog.dom.getRequiredElement('does_not_exist'); });
}

function testGetRequiredElementDomHelper() {
  var domHelper = new goog.dom.DomHelper();
  var el = domHelper.getRequiredElement('testEl');
  assertTrue(goog.isDefAndNotNull(el));
  assertEquals('testEl', el.id);
  assertThrows(function() {
    goog.dom.getRequiredElementByClass('does_not_exist', container);
  });
}

function testGetRequiredElementByClassDomHelper() {
  var domHelper = new goog.dom.DomHelper();
  assertNotNull(domHelper.getRequiredElementByClass('test1'));
  assertNotNull(domHelper.getRequiredElementByClass('test2'));

  var container = domHelper.getElement('span-container');
  assertNotNull(domHelper.getElementByClass('test1', container));
  assertThrows(function() {
    domHelper.getRequiredElementByClass('does_not_exist', container);
  });
}

function testGetElementsByTagName() {
  var divs = goog.dom.getElementsByTagName(goog.dom.TagName.DIV);
  assertTrue(divs.length > 0);
  var el = goog.dom.getRequiredElement('testEl');
  var spans = goog.dom.getElementsByTagName(goog.dom.TagName.SPAN, el);
  assertTrue(spans.length > 0);
}

function testGetElementsByTagNameDomHelper() {
  var domHelper = new goog.dom.DomHelper();
  var divs = domHelper.getElementsByTagName(goog.dom.TagName.DIV);
  assertTrue(divs.length > 0);
  var el = domHelper.getRequiredElement('testEl');
  var spans = domHelper.getElementsByTagName(goog.dom.TagName.SPAN, el);
  assertTrue(spans.length > 0);
}

function testGetElementsByTagNameAndClass() {
  assertEquals(
      'Should get 6 spans',
      goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.SPAN).length, 6);
  assertEquals(
      'Should get 6 spans',
      goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.SPAN).length, 6);
  assertEquals(
      'Should get 3 spans',
      goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.SPAN, 'test1')
          .length,
      3);
  assertEquals(
      'Should get 1 span',
      goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.SPAN, 'test2')
          .length,
      1);
  assertEquals(
      'Should get 1 span',
      goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.SPAN, 'test2')
          .length,
      1);
  assertEquals(
      'Should get lots of elements',
      goog.dom.getElementsByTagNameAndClass().length,
      document.getElementsByTagName('*').length);

  assertEquals(
      'Should get 1 span', goog.dom
                               .getElementsByTagNameAndClass(
                                   goog.dom.TagName.SPAN, null, $('testEl'))
                               .length,
      1);

  // '*' as the tag name should be equivalent to all tags
  var container = goog.dom.getElement('span-container');
  assertEquals(
      5,
      goog.dom.getElementsByTagNameAndClass('*', undefined, container).length);
  assertEquals(
      3, goog.dom.getElementsByTagNameAndClass('*', 'test1', container).length);
  assertEquals(
      1, goog.dom.getElementsByTagNameAndClass('*', 'test2', container).length);

  // Some version of WebKit have problems with mixed-case class names
  assertEquals(
      1, goog.dom.getElementsByTagNameAndClass(undefined, 'mixedCaseClass')
             .length);

  // Make sure that out of bounds indices are OK
  assertUndefined(
      goog.dom.getElementsByTagNameAndClass(undefined, 'noSuchClass')[0]);

  assertEquals(
      goog.dom.getElementsByTagNameAndClass,
      goog.dom.getElementsByTagNameAndClass);
}

function testGetElementsByClass() {
  assertEquals(3, goog.dom.getElementsByClass('test1').length);
  assertEquals(1, goog.dom.getElementsByClass('test2').length);
  assertEquals(0, goog.dom.getElementsByClass('nonexistant').length);

  var container = goog.dom.getElement('span-container');
  assertEquals(3, goog.dom.getElementsByClass('test1', container).length);
}

function testGetElementByClass() {
  assertNotNull(goog.dom.getElementByClass('test1'));
  assertNotNull(goog.dom.getElementByClass('test2'));
  // assertNull(goog.dom.getElementByClass('nonexistant'));

  var container = goog.dom.getElement('span-container');
  assertNotNull(goog.dom.getElementByClass('test1', container));
}

function testSetProperties() {
  var attrs = {'name': 'test3', 'title': 'A title', 'random': 'woop'};
  var el = $('testEl');

  var res = goog.dom.setProperties(el, attrs);
  assertEquals('Should be equal', el.name, 'test3');
  assertEquals('Should be equal', el.title, 'A title');
  assertEquals('Should be equal', el.random, 'woop');
}

function testSetPropertiesDirectAttributeMap() {
  var attrs = {'usemap': '#myMap'};
  var el = goog.dom.createDom(goog.dom.TagName.IMG);

  var res = goog.dom.setProperties(el, attrs);
  assertEquals('Should be equal', '#myMap', el.getAttribute('usemap'));
}

function testSetPropertiesDirectAttributeMapChecksForOwnProperties() {
  stubs.set(Object.prototype, 'customProp', 'sdflasdf.,m.,<>fsdflas213!@#');
  var attrs = {'usemap': '#myMap'};
  var el = goog.dom.createDom(goog.dom.TagName.IMG);

  var res = goog.dom.setProperties(el, attrs);
  assertEquals('Should be equal', '#myMap', el.getAttribute('usemap'));
}

function testSetPropertiesAria() {
  var attrs = {
    'aria-hidden': 'true',
    'aria-label': 'This is a label',
    'role': 'presentation'
  };
  var el = goog.dom.createDom(goog.dom.TagName.DIV);

  goog.dom.setProperties(el, attrs);
  assertEquals('Should be equal', 'true', el.getAttribute('aria-hidden'));
  assertEquals(
      'Should be equal', 'This is a label', el.getAttribute('aria-label'));
  assertEquals('Should be equal', 'presentation', el.getAttribute('role'));
}

function testSetPropertiesData() {
  var attrs = {
    'data-tooltip': 'This is a tooltip',
    'data-tooltip-delay': '100'
  };
  var el = goog.dom.createDom(goog.dom.TagName.DIV);

  goog.dom.setProperties(el, attrs);
  assertEquals(
      'Should be equal', 'This is a tooltip', el.getAttribute('data-tooltip'));
  assertEquals('Should be equal', '100', el.getAttribute('data-tooltip-delay'));
}

function testSetTableProperties() {
  var attrs = {
    'style': 'padding-left: 10px;',
    'class': 'mytestclass',
    'height': '101',
    'cellpadding': '15'
  };
  var el = $('testTable1');

  var res = goog.dom.setProperties(el, attrs);
  assertEquals('Should be equal', el.style.paddingLeft, '10px');
  assertEquals('Should be equal', el.className, 'mytestclass');
  assertEquals('Should be equal', el.getAttribute('height'), '101');
  assertEquals('Should be equal', el.cellPadding, '15');
}

function testGetViewportSize() {
  // TODO: This is failing in the test runner now, fix later.
  // var dims = getViewportSize();
  // assertNotUndefined('Should be defined at least', dims.width);
  // assertNotUndefined('Should be defined at least', dims.height);
}

function testGetViewportSizeInIframe() {
  var iframe = /** @type {HTMLIFrameElement} */ (goog.dom.getElement('iframe'));
  var contentDoc = goog.dom.getFrameContentDocument(iframe);
  contentDoc.write('<body></body>');

  var outerSize = goog.dom.getViewportSize();
  var innerSize = (new goog.dom.DomHelper(contentDoc)).getViewportSize();
  assert('Viewport sizes must not match', innerSize.width != outerSize.width);
}

function testGetDocumentHeightInIframe() {
  var doc = goog.dom.getDomHelper(myIframeDoc).getDocument();
  var height = goog.dom.getDomHelper(myIframeDoc).getDocumentHeight();

  // Broken in webkit/edge quirks mode and in IE8+
  if ((goog.dom.isCss1CompatMode_(doc) ||
       !goog.userAgent.WEBKIT && !goog.userAgent.EDGE) &&
      !isIE8OrHigher()) {
    assertEquals('height should be 65', 42 + 23, height);
  }
}

function testCreateDom() {
  var el = goog.dom.createDom(
      goog.dom.TagName.DIV, {
        style: 'border: 1px solid black; width: 50%; background-color: #EEE;',
        onclick: "alert('woo')"
      },
      goog.dom.createDom(
          goog.dom.TagName.P, {style: 'font: normal 12px arial; color: red; '},
          'Para 1'),
      goog.dom.createDom(
          goog.dom.TagName.P,
          {style: 'font: bold 18px garamond; color: blue; '}, 'Para 2'),
      goog.dom.createDom(
          goog.dom.TagName.P,
          {style: 'font: normal 24px monospace; color: green'}, 'Para 3 ',
          goog.dom.createDom(
              goog.dom.TagName.A, {name: 'link', href: 'http://bbc.co.uk'},
              'has a link'),
          ', how cool is this?'));

  assertEquals(
      'Tagname should be a DIV', String(goog.dom.TagName.DIV), el.tagName);
  assertEquals('Style width should be 50%', '50%', el.style.width);
  assertEquals(
      'first child is a P tag', String(goog.dom.TagName.P),
      el.childNodes[0].tagName);
  assertEquals('second child .innerHTML', 'Para 2', el.childNodes[1].innerHTML);

  assertEquals(goog.dom.createDom, goog.dom.createDom);
}

function testCreateDomNoChildren() {
  var el;

  // Test unspecified children.
  el = goog.dom.createDom(goog.dom.TagName.DIV);
  assertNull('firstChild should be null', el.firstChild);

  // Test null children.
  el = goog.dom.createDom(goog.dom.TagName.DIV, null, null);
  assertNull('firstChild should be null', el.firstChild);

  // Test empty array of children.
  el = goog.dom.createDom(goog.dom.TagName.DIV, null, []);
  assertNull('firstChild should be null', el.firstChild);
}

function testCreateDomAcceptsArray() {
  var items = [
    goog.dom.createDom(goog.dom.TagName.LI, {}, 'Item 1'),
    goog.dom.createDom(goog.dom.TagName.LI, {}, 'Item 2')
  ];
  var ul = goog.dom.createDom(goog.dom.TagName.UL, {}, items);
  assertEquals('List should have two children', 2, ul.childNodes.length);
  assertEquals(
      'First child should be an LI tag', String(goog.dom.TagName.LI),
      ul.firstChild.tagName);
  assertEquals('Item 1', ul.childNodes[0].innerHTML);
  assertEquals('Item 2', ul.childNodes[1].innerHTML);
}

function testCreateDomStringArg() {
  var el;

  // Test string arg.
  el = goog.dom.createDom(goog.dom.TagName.DIV, null, 'Hello');
  assertEquals(
      'firstChild should be a text node', goog.dom.NodeType.TEXT,
      el.firstChild.nodeType);
  assertEquals(
      'firstChild should have node value "Hello"', 'Hello',
      el.firstChild.nodeValue);

  // Test text node arg.
  el = goog.dom.createDom(
      goog.dom.TagName.DIV, null, goog.dom.createTextNode('World'));
  assertEquals(
      'firstChild should be a text node', goog.dom.NodeType.TEXT,
      el.firstChild.nodeType);
  assertEquals(
      'firstChild should have node value "World"', 'World',
      el.firstChild.nodeValue);
}

function testCreateDomNodeListArg() {
  var el;
  var emptyElem = goog.dom.createDom(goog.dom.TagName.DIV);
  var simpleElem =
      goog.dom.createDom(goog.dom.TagName.DIV, null, 'Hello, world!');
  var complexElem = goog.dom.createDom(
      goog.dom.TagName.DIV, null, 'Hello, ',
      goog.dom.createDom(goog.dom.TagName.B, null, 'world'),
      goog.dom.createTextNode('!'));

  // Test empty node list.
  el = goog.dom.createDom(goog.dom.TagName.DIV, null, emptyElem.childNodes);
  assertNull('emptyElem.firstChild should be null', emptyElem.firstChild);
  assertNull('firstChild should be null', el.firstChild);

  // Test simple node list.
  el = goog.dom.createDom(goog.dom.TagName.DIV, null, simpleElem.childNodes);
  assertNull('simpleElem.firstChild should be null', simpleElem.firstChild);
  assertEquals(
      'firstChild should be a text node with value "Hello, world!"',
      'Hello, world!', el.firstChild.nodeValue);

  // Test complex node list.
  el = goog.dom.createDom(goog.dom.TagName.DIV, null, complexElem.childNodes);
  assertNull('complexElem.firstChild should be null', complexElem.firstChild);
  assertEquals('Element should have 3 child nodes', 3, el.childNodes.length);
  assertEquals(
      'childNodes[0] should be a text node with value "Hello, "', 'Hello, ',
      el.childNodes[0].nodeValue);
  assertEquals(
      'childNodes[1] should be an element node with tagName "B"',
      String(goog.dom.TagName.B), el.childNodes[1].tagName);
  assertEquals(
      'childNodes[2] should be a text node with value "!"', '!',
      el.childNodes[2].nodeValue);
}

function testCreateDomWithTypeAttribute() {
  var el = goog.dom.createDom(
      goog.dom.TagName.BUTTON,
      {'type': goog.dom.InputType.RESET, 'id': 'cool-button'}, 'Cool button');
  assertNotNull('Button with type attribute was created successfully', el);
  assertEquals(
      'Button has correct type attribute', goog.dom.InputType.RESET, el.type);
  assertEquals('Button has correct id', 'cool-button', el.id);
}

function testCreateDomWithClassList() {
  var el = goog.dom.createDom(goog.dom.TagName.DIV, ['foo', 'bar']);
  assertEquals('foo bar', el.className);
}

function testContains() {
  assertTrue(
      'HTML should contain BODY',
      goog.dom.contains(document.documentElement, document.body));
  assertTrue(
      'Document should contain BODY',
      goog.dom.contains(document, document.body));

  var d = goog.dom.createDom(goog.dom.TagName.P, null, 'A paragraph');
  var t = d.firstChild;
  assertTrue('Same element', goog.dom.contains(d, d));
  assertTrue('Same text', goog.dom.contains(t, t));
  assertTrue('Nested text', goog.dom.contains(d, t));
  assertFalse('Nested text, reversed', goog.dom.contains(t, d));
  assertFalse('Disconnected element', goog.dom.contains(document, d));
  goog.dom.appendChild(document.body, d);
  assertTrue('Connected element', goog.dom.contains(document, d));
  goog.dom.removeNode(d);
}

function testCreateDomWithClassName() {
  var el = goog.dom.createDom(goog.dom.TagName.DIV, 'cls');
  assertNull('firstChild should be null', el.firstChild);
  assertEquals(
      'Tagname should be a DIV', String(goog.dom.TagName.DIV), el.tagName);
  assertEquals('ClassName should be cls', 'cls', el.className);

  el = goog.dom.createDom(goog.dom.TagName.DIV, '');
  assertEquals('ClassName should be empty', '', el.className);
}

function testCompareNodeOrder() {
  var b1 = $('b1');
  var b2 = $('b2');
  var p2 = $('p2');

  assertEquals(
      'equal nodes should compare to 0', 0, goog.dom.compareNodeOrder(b1, b1));

  assertTrue(
      'parent should come before child', goog.dom.compareNodeOrder(p2, b1) < 0);
  assertTrue(
      'child should come after parent', goog.dom.compareNodeOrder(b1, p2) > 0);

  assertTrue(
      'parent should come before text child',
      goog.dom.compareNodeOrder(b1, b1.firstChild) < 0);
  assertTrue(
      'text child should come after parent',
      goog.dom.compareNodeOrder(b1.firstChild, b1) > 0);

  assertTrue(
      'first sibling should come before second',
      goog.dom.compareNodeOrder(b1, b2) < 0);
  assertTrue(
      'second sibling should come after first',
      goog.dom.compareNodeOrder(b2, b1) > 0);

  assertTrue(
      'text node after cousin element returns correct value',
      goog.dom.compareNodeOrder(b1.nextSibling, b1) > 0);
  assertTrue(
      'text node before cousin element returns correct value',
      goog.dom.compareNodeOrder(b1, b1.nextSibling) < 0);

  assertTrue(
      'text node is before once removed cousin element',
      goog.dom.compareNodeOrder(b1.firstChild, b2) < 0);
  assertTrue(
      'once removed cousin element is before text node',
      goog.dom.compareNodeOrder(b2, b1.firstChild) > 0);

  assertTrue(
      'text node is after once removed cousin text node',
      goog.dom.compareNodeOrder(b1.nextSibling, b1.firstChild) > 0);
  assertTrue(
      'once removed cousin text node is before text node',
      goog.dom.compareNodeOrder(b1.firstChild, b1.nextSibling) < 0);

  assertTrue(
      'first text node is before second text node',
      goog.dom.compareNodeOrder(b1.previousSibling, b1.nextSibling) < 0);
  assertTrue(
      'second text node is after first text node',
      goog.dom.compareNodeOrder(b1.nextSibling, b1.previousSibling) > 0);

  assertTrue(
      'grandchild is after grandparent',
      goog.dom.compareNodeOrder(b1.firstChild, b1.parentNode) > 0);
  assertTrue(
      'grandparent is after grandchild',
      goog.dom.compareNodeOrder(b1.parentNode, b1.firstChild) < 0);

  assertTrue(
      'grandchild is after grandparent',
      goog.dom.compareNodeOrder(b1.firstChild, b1.parentNode) > 0);
  assertTrue(
      'grandparent is after grandchild',
      goog.dom.compareNodeOrder(b1.parentNode, b1.firstChild) < 0);

  assertTrue(
      'second cousins compare correctly',
      goog.dom.compareNodeOrder(b1.firstChild, b2.firstChild) < 0);
  assertTrue(
      'second cousins compare correctly in reverse',
      goog.dom.compareNodeOrder(b2.firstChild, b1.firstChild) > 0);

  assertTrue(
      'testEl2 is after testEl',
      goog.dom.compareNodeOrder($('testEl2'), $('testEl')) > 0);
  assertTrue(
      'testEl is before testEl2',
      goog.dom.compareNodeOrder($('testEl'), $('testEl2')) < 0);

  var p = $('order-test');
  var text1 = document.createTextNode('1');
  p.appendChild(text1);
  var text2 = document.createTextNode('1');
  p.appendChild(text2);

  assertEquals(
      'Equal text nodes should compare to 0', 0,
      goog.dom.compareNodeOrder(text1, text1));
  assertTrue(
      'First text node is before second',
      goog.dom.compareNodeOrder(text1, text2) < 0);
  assertTrue(
      'Second text node is after first',
      goog.dom.compareNodeOrder(text2, text1) > 0);
  assertTrue(
      'Late text node is after b1',
      goog.dom.compareNodeOrder(text1, $('b1')) > 0);

  assertTrue(
      'Document node is before non-document node',
      goog.dom.compareNodeOrder(document, b1) < 0);
  assertTrue(
      'Non-document node is after document node',
      goog.dom.compareNodeOrder(b1, document) > 0);
}

function testFindCommonAncestor() {
  var b1 = $('b1');
  var b2 = $('b2');
  var p1 = $('p1');
  var p2 = $('p2');
  var testEl2 = $('testEl2');

  assertNull('findCommonAncestor() = null', goog.dom.findCommonAncestor());
  assertEquals(
      'findCommonAncestor(b1) = b1', b1, goog.dom.findCommonAncestor(b1));
  assertEquals(
      'findCommonAncestor(b1, b1) = b1', b1,
      goog.dom.findCommonAncestor(b1, b1));
  assertEquals(
      'findCommonAncestor(b1, b2) = p2', p2,
      goog.dom.findCommonAncestor(b1, b2));
  assertEquals(
      'findCommonAncestor(p1, b2) = body', document.body,
      goog.dom.findCommonAncestor(p1, b2));
  assertEquals(
      'findCommonAncestor(testEl2, b1, b2, p1, p2) = body', document.body,
      goog.dom.findCommonAncestor(testEl2, b1, b2, p1, p2));

  var outOfDoc = goog.dom.createElement(goog.dom.TagName.DIV);
  assertNull(
      'findCommonAncestor(outOfDoc, b1) = null',
      goog.dom.findCommonAncestor(outOfDoc, b1));
}

function testRemoveNode() {
  var b = goog.dom.createElement(goog.dom.TagName.B);
  var el = $('p1');
  el.appendChild(b);
  goog.dom.removeNode(b);
  assertTrue('b should have been removed', el.lastChild != b);
}

function testReplaceNode() {
  var n = $('toReplace');
  var previousSibling = n.previousSibling;
  var goodNode =
      goog.dom.createDom(goog.dom.TagName.DIV, {'id': 'goodReplaceNode'});
  goog.dom.replaceNode(goodNode, n);

  assertEquals(
      'n should have been replaced', previousSibling.nextSibling, goodNode);
  assertNull('n should no longer be in the DOM tree', $('toReplace'));

  var badNode =
      goog.dom.createDom(goog.dom.TagName.DIV, {'id': 'badReplaceNode'});
  goog.dom.replaceNode(badNode, n);
  assertNull('badNode should not be in the DOM tree', $('badReplaceNode'));
}

function testAppendChildAt() {
  var parent = $('p2');
  var origNumChildren = parent.childNodes.length;

  var child1 = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.dom.insertChildAt(parent, child1, origNumChildren);
  assertEquals(origNumChildren + 1, parent.childNodes.length);

  var child2 = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.dom.insertChildAt(parent, child2, origNumChildren + 42);
  assertEquals(origNumChildren + 2, parent.childNodes.length);

  var child3 = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.dom.insertChildAt(parent, child3, 0);
  assertEquals(origNumChildren + 3, parent.childNodes.length);

  var child4 = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.dom.insertChildAt(parent, child3, 2);
  assertEquals(origNumChildren + 3, parent.childNodes.length);

  parent.removeChild(child1);
  parent.removeChild(child2);
  parent.removeChild(child3);

  var emptyParentNotInDocument = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.dom.insertChildAt(emptyParentNotInDocument, child1, 0);
  assertEquals(1, emptyParentNotInDocument.childNodes.length);
}

function testFlattenElement() {
  var text = document.createTextNode('Text');
  var br = goog.dom.createElement(goog.dom.TagName.BR);
  var span = goog.dom.createDom(goog.dom.TagName.SPAN, null, text, br);
  assertEquals('span should have 2 children', 2, span.childNodes.length);

  var el = $('p1');
  el.appendChild(span);

  var ret = goog.dom.flattenElement(span);

  assertTrue('span should have been removed', el.lastChild != span);
  assertFalse(
      'span should have no parent', !!span.parentNode &&
          span.parentNode.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT);
  assertEquals('span should have no children', 0, span.childNodes.length);
  assertEquals('Last child of p should be br', br, el.lastChild);
  assertEquals(
      'Previous sibling of br should be text', text, br.previousSibling);

  var outOfDoc = goog.dom.createDom(goog.dom.TagName.SPAN, null, '1 child');
  // Should do nothing.
  goog.dom.flattenElement(outOfDoc);
  assertEquals(
      'outOfDoc should still have 1 child', 1, outOfDoc.childNodes.length);
}

function testIsNodeLike() {
  assertTrue('document should be node like', goog.dom.isNodeLike(document));
  assertTrue(
      'document.body should be node like', goog.dom.isNodeLike(document.body));
  assertTrue(
      'a text node should be node like',
      goog.dom.isNodeLike(document.createTextNode('')));

  assertFalse('null should not be node like', goog.dom.isNodeLike(null));
  assertFalse('a string should not be node like', goog.dom.isNodeLike('abcd'));

  assertTrue(
      'custom object should be node like', goog.dom.isNodeLike({nodeType: 1}));
}

function testIsElement() {
  assertFalse('document is not an element', goog.dom.isElement(document));
  assertTrue('document.body is an element', goog.dom.isElement(document.body));
  assertFalse(
      'a text node is not an element',
      goog.dom.isElement(document.createTextNode('')));
  assertTrue(
      'an element created with createElement() is an element',
      goog.dom.isElement(goog.dom.createElement(goog.dom.TagName.A)));

  assertFalse('null is not an element', goog.dom.isElement(null));
  assertFalse('a string is not an element', goog.dom.isElement('abcd'));

  assertTrue('custom object is an element', goog.dom.isElement({nodeType: 1}));
  assertFalse(
      'custom non-element object is a not an element',
      goog.dom.isElement({someProperty: 'somevalue'}));
}

function testIsWindow() {
  var global = goog.global;
  var frame = window.frames['frame'];
  var otherWindow = window.open('', 'blank');
  var object = {window: goog.global};
  var nullVar = null;
  var notDefined;

  try {
    // Use try/finally to ensure that we clean up the window we open, even if an
    // assertion fails or something else goes wrong.
    assertTrue(
        'global object in HTML context should be a window',
        goog.dom.isWindow(goog.global));
    assertTrue('iframe window should be a window', goog.dom.isWindow(frame));
    if (otherWindow) {
      assertTrue(
          'other window should be a window', goog.dom.isWindow(otherWindow));
    }
    assertFalse('object should not be a window', goog.dom.isWindow(object));
    assertFalse('null should not be a window', goog.dom.isWindow(nullVar));
    assertFalse(
        'undefined should not be a window', goog.dom.isWindow(notDefined));
  } finally {
    if (otherWindow) {
      otherWindow.close();
    }
  }
}

function testGetOwnerDocument() {
  assertEquals(goog.dom.getOwnerDocument($('p1')), document);
  assertEquals(goog.dom.getOwnerDocument(document.body), document);
  assertEquals(goog.dom.getOwnerDocument(document.documentElement), document);
}

// Tests the breakages resulting in rollback cl/64715474
function testGetOwnerDocumentNonNodeInput() {
  // We should fail on null.
  assertThrows(function() { goog.dom.getOwnerDocument(null); });
  assertEquals(document, goog.dom.getOwnerDocument(window));
}

function testDomHelper() {
  var x = new goog.dom.DomHelper(window.frames['frame'].document);
  assertTrue(
      'Should have some HTML', x.getDocument().body.innerHTML.length > 0);
}

function testGetFirstElementChild() {
  var p2 = $('p2');
  var b1 = goog.dom.getFirstElementChild(p2);
  assertNotNull('First element child of p2 should not be null', b1);
  assertEquals('First element child is b1', 'b1', b1.id);

  var c = goog.dom.getFirstElementChild(b1);
  assertNull('First element child of b1 should be null', c);

  // Test with an undefined firstElementChild attribute.
  var b2 = $('b2');
  var mockP2 = {
    childNodes: [b1, b2],
    firstChild: b1,
    firstElementChild: undefined
  };

  b1 = goog.dom.getFirstElementChild(mockP2);
  assertNotNull('First element child of mockP2 should not be null', b1);
  assertEquals('First element child is b1', 'b1', b1.id);
}

function testGetLastElementChild() {
  var p2 = $('p2');
  var b2 = goog.dom.getLastElementChild(p2);
  assertNotNull('Last element child of p2 should not be null', b2);
  assertEquals('Last element child is b2', 'b2', b2.id);

  var c = goog.dom.getLastElementChild(b2);
  assertNull('Last element child of b2 should be null', c);

  // Test with an undefined lastElementChild attribute.
  var b1 = $('b1');
  var mockP2 = {
    childNodes: [b1, b2],
    lastChild: b2,
    lastElementChild: undefined
  };

  b2 = goog.dom.getLastElementChild(mockP2);
  assertNotNull('Last element child of mockP2 should not be null', b2);
  assertEquals('Last element child is b2', 'b2', b2.id);
}

function testGetNextElementSibling() {
  var b1 = $('b1');
  var b2 = goog.dom.getNextElementSibling(b1);
  assertNotNull('Next element sibling of b1 should not be null', b1);
  assertEquals('Next element sibling is b2', 'b2', b2.id);

  var c = goog.dom.getNextElementSibling(b2);
  assertNull('Next element sibling of b2 should be null', c);

  // Test with an undefined nextElementSibling attribute.
  var mockB1 = {nextSibling: b2, nextElementSibling: undefined};

  b2 = goog.dom.getNextElementSibling(mockB1);
  assertNotNull('Next element sibling of mockB1 should not be null', b1);
  assertEquals('Next element sibling is b2', 'b2', b2.id);
}

function testGetPreviousElementSibling() {
  var b2 = $('b2');
  var b1 = goog.dom.getPreviousElementSibling(b2);
  assertNotNull('Previous element sibling of b2 should not be null', b1);
  assertEquals('Previous element sibling is b1', 'b1', b1.id);

  var c = goog.dom.getPreviousElementSibling(b1);
  assertNull('Previous element sibling of b1 should be null', c);

  // Test with an undefined previousElementSibling attribute.
  var mockB2 = {previousSibling: b1, previousElementSibling: undefined};

  b1 = goog.dom.getPreviousElementSibling(mockB2);
  assertNotNull('Previous element sibling of mockB2 should not be null', b1);
  assertEquals('Previous element sibling is b1', 'b1', b1.id);
}

function testGetChildren() {
  var p2 = $('p2');
  var children = goog.dom.getChildren(p2);
  assertNotNull('Elements array should not be null', children);
  assertEquals(
      'List of element children should be length two.', 2, children.length);

  var b1 = $('b1');
  var b2 = $('b2');
  assertObjectEquals('First element child should be b1.', b1, children[0]);
  assertObjectEquals('Second element child should be b2.', b2, children[1]);

  var noChildren = goog.dom.getChildren(b1);
  assertNotNull('Element children array should not be null', noChildren);
  assertEquals(
      'List of element children should be length zero.', 0, noChildren.length);

  // Test with an undefined children attribute.
  var mockP2 = {childNodes: [b1, b2], children: undefined};

  children = goog.dom.getChildren(mockP2);
  assertNotNull('Elements array should not be null', children);
  assertEquals(
      'List of element children should be length two.', 2, children.length);

  assertObjectEquals('First element child should be b1.', b1, children[0]);
  assertObjectEquals('Second element child should be b2.', b2, children[1]);
}

function testGetNextNode() {
  var tree = goog.dom.safeHtmlToNode(goog.html.testing.newSafeHtmlForTest(
      '<div>' +
      '<p>Some text</p>' +
      '<blockquote>Some <i>special</i> <b>text</b></blockquote>' +
      '<address><!-- comment -->Foo</address>' +
      '</div>'));

  assertNull(goog.dom.getNextNode(null));

  var node = tree;
  var next = function() { return node = goog.dom.getNextNode(node); };

  assertEquals(String(goog.dom.TagName.P), next().tagName);
  assertEquals('Some text', next().nodeValue);
  assertEquals(String(goog.dom.TagName.BLOCKQUOTE), next().tagName);
  assertEquals('Some ', next().nodeValue);
  assertEquals(String(goog.dom.TagName.I), next().tagName);
  assertEquals('special', next().nodeValue);
  assertEquals(' ', next().nodeValue);
  assertEquals(String(goog.dom.TagName.B), next().tagName);
  assertEquals('text', next().nodeValue);
  assertEquals(String(goog.dom.TagName.ADDRESS), next().tagName);
  assertEquals(goog.dom.NodeType.COMMENT, next().nodeType);
  assertEquals('Foo', next().nodeValue);

  assertNull(next());
}

function testGetPreviousNode() {
  var tree = goog.dom.safeHtmlToNode(goog.html.testing.newSafeHtmlForTest(
      '<div>' +
      '<p>Some text</p>' +
      '<blockquote>Some <i>special</i> <b>text</b></blockquote>' +
      '<address><!-- comment -->Foo</address>' +
      '</div>'));

  assertNull(goog.dom.getPreviousNode(null));

  var node = tree.lastChild.lastChild;
  var previous = function() { return node = goog.dom.getPreviousNode(node); };

  assertEquals(goog.dom.NodeType.COMMENT, previous().nodeType);
  assertEquals(String(goog.dom.TagName.ADDRESS), previous().tagName);
  assertEquals('text', previous().nodeValue);
  assertEquals(String(goog.dom.TagName.B), previous().tagName);
  assertEquals(' ', previous().nodeValue);
  assertEquals('special', previous().nodeValue);
  assertEquals(String(goog.dom.TagName.I), previous().tagName);
  assertEquals('Some ', previous().nodeValue);
  assertEquals(String(goog.dom.TagName.BLOCKQUOTE), previous().tagName);
  assertEquals('Some text', previous().nodeValue);
  assertEquals(String(goog.dom.TagName.P), previous().tagName);
  assertEquals(String(goog.dom.TagName.DIV), previous().tagName);

  if (!goog.userAgent.IE) {
    // Internet Explorer maintains a parentNode for Elements after they are
    // removed from the hierarchy. Everyone else agrees on a null parentNode.
    assertNull(previous());
  }
}

function testSetTextContent() {
  var p1 = $('p1');
  var s = 'hello world';
  goog.dom.setTextContent(p1, s);
  assertEquals(
      'We should have one childNode after setTextContent', 1,
      p1.childNodes.length);
  assertEquals(s, p1.firstChild.data);
  assertEquals(s, p1.innerHTML);

  s = 'four elefants < five ants';
  var sHtml = 'four elefants &lt; five ants';
  goog.dom.setTextContent(p1, s);
  assertEquals(
      'We should have one childNode after setTextContent', 1,
      p1.childNodes.length);
  assertEquals(s, p1.firstChild.data);
  assertEquals(sHtml, p1.innerHTML);

  // ensure that we remove existing children
  p1.innerHTML = 'a<b>b</b>c';
  s = 'hello world';
  goog.dom.setTextContent(p1, s);
  assertEquals(
      'We should have one childNode after setTextContent', 1,
      p1.childNodes.length);
  assertEquals(s, p1.firstChild.data);

  // same but start with an element
  p1.innerHTML = '<b>a</b>b<i>c</i>';
  s = 'hello world';
  goog.dom.setTextContent(p1, s);
  assertEquals(
      'We should have one childNode after setTextContent', 1,
      p1.childNodes.length);
  assertEquals(s, p1.firstChild.data);

  // Text/CharacterData
  goog.dom.setTextContent(p1, 'before');
  s = 'after';
  goog.dom.setTextContent(p1.firstChild, s);
  assertEquals(
      'We should have one childNode after setTextContent', 1,
      p1.childNodes.length);
  assertEquals(s, p1.firstChild.data);

  // DocumentFragment
  var df = document.createDocumentFragment();
  s = 'hello world';
  goog.dom.setTextContent(df, s);
  assertEquals(
      'We should have one childNode after setTextContent', 1,
      df.childNodes.length);
  assertEquals(s, df.firstChild.data);

  // clean up
  goog.dom.removeChildren(p1);
}

function testFindNode() {
  var expected = document.body;
  var result = goog.dom.findNode(document, function(n) {
    return n.nodeType == goog.dom.NodeType.ELEMENT &&
        n.tagName == goog.dom.TagName.BODY;
  });
  assertEquals(expected, result);

  expected = goog.dom.getElementsByTagName(goog.dom.TagName.P)[0];
  result = goog.dom.findNode(document, function(n) {
    return n.nodeType == goog.dom.NodeType.ELEMENT &&
        n.tagName == goog.dom.TagName.P;
  });
  assertEquals(expected, result);

  result = goog.dom.findNode(document, function(n) { return false; });
  assertUndefined(result);
}

function testFindNodes() {
  var expected = goog.dom.getElementsByTagName(goog.dom.TagName.P);
  var result = goog.dom.findNodes(document, function(n) {
    return n.nodeType == goog.dom.NodeType.ELEMENT &&
        n.tagName == goog.dom.TagName.P;
  });
  assertEquals(expected.length, result.length);
  assertEquals(expected[0], result[0]);
  assertEquals(expected[1], result[1]);

  result = goog.dom.findNodes(document, function(n) { return false; }).length;
  assertEquals(0, result);
}

function createTestDom(txt) {
  var dom = goog.dom.createDom(goog.dom.TagName.DIV);
  dom.innerHTML = txt;
  return dom;
}

function testIsFocusableTabIndex() {
  assertFalse(
      'isFocusableTabIndex() must be false for no tab index',
      goog.dom.isFocusableTabIndex(goog.dom.getElement('noTabIndex')));
  assertFalse(
      'isFocusableTabIndex() must be false for tab index -2',
      goog.dom.isFocusableTabIndex(goog.dom.getElement('tabIndexNegative2')));
  assertFalse(
      'isFocusableTabIndex() must be false for tab index -1',
      goog.dom.isFocusableTabIndex(goog.dom.getElement('tabIndexNegative1')));

  // WebKit on Mac doesn't support focusable DIVs until version 526 and later.
  if (!goog.userAgent.WEBKIT || !goog.userAgent.MAC ||
      goog.userAgent.isVersionOrHigher('526')) {
    assertTrue(
        'isFocusableTabIndex() must be true for tab index 0',
        goog.dom.isFocusableTabIndex(goog.dom.getElement('tabIndex0')));
    assertTrue(
        'isFocusableTabIndex() must be true for tab index 1',
        goog.dom.isFocusableTabIndex(goog.dom.getElement('tabIndex1')));
    assertTrue(
        'isFocusableTabIndex() must be true for tab index 2',
        goog.dom.isFocusableTabIndex(goog.dom.getElement('tabIndex2')));
  }
}

function testSetFocusableTabIndex() {
  // WebKit on Mac doesn't support focusable DIVs until version 526 and later.
  if (!goog.userAgent.WEBKIT || !goog.userAgent.MAC ||
      goog.userAgent.isVersionOrHigher('526')) {
    // Test enabling focusable tab index.
    goog.dom.setFocusableTabIndex(goog.dom.getElement('noTabIndex'), true);
    assertTrue(
        'isFocusableTabIndex() must be true after enabling tab index',
        goog.dom.isFocusableTabIndex(goog.dom.getElement('noTabIndex')));

    // Test disabling focusable tab index that was added programmatically.
    goog.dom.setFocusableTabIndex(goog.dom.getElement('noTabIndex'), false);
    assertFalse(
        'isFocusableTabIndex() must be false after disabling tab ' +
            'index that was programmatically added',
        goog.dom.isFocusableTabIndex(goog.dom.getElement('noTabIndex')));

    // Test disabling focusable tab index that was specified in markup.
    goog.dom.setFocusableTabIndex(goog.dom.getElement('tabIndex0'), false);
    assertFalse(
        'isFocusableTabIndex() must be false after disabling tab ' +
            'index that was specified in markup',
        goog.dom.isFocusableTabIndex(goog.dom.getElement('tabIndex0')));

    // Test re-enabling focusable tab index.
    goog.dom.setFocusableTabIndex(goog.dom.getElement('tabIndex0'), true);
    assertTrue(
        'isFocusableTabIndex() must be true after reenabling tabindex',
        goog.dom.isFocusableTabIndex(goog.dom.getElement('tabIndex0')));
  }
}

function testIsFocusable() {
  // Test all types of form elements with no tab index specified are focusable.
  assertTrue(
      'isFocusable() must be true for anchor elements with ' +
          'no tab index',
      goog.dom.isFocusable(goog.dom.getElement('noTabIndexAnchor')));
  assertTrue(
      'isFocusable() must be true for input elements with ' +
          'no tab index',
      goog.dom.isFocusable(goog.dom.getElement('noTabIndexInput')));
  assertTrue(
      'isFocusable() must be true for textarea elements with ' +
          'no tab index',
      goog.dom.isFocusable(goog.dom.getElement('noTabIndexTextArea')));
  assertTrue(
      'isFocusable() must be true for select elements with ' +
          'no tab index',
      goog.dom.isFocusable(goog.dom.getElement('noTabIndexSelect')));
  assertTrue(
      'isFocusable() must be true for button elements with ' +
          'no tab index',
      goog.dom.isFocusable(goog.dom.getElement('noTabIndexButton')));

  // Test form element with negative tab index is not focusable.
  assertFalse(
      'isFocusable() must be false for form elements with ' +
          'negative tab index',
      goog.dom.isFocusable(goog.dom.getElement('negTabIndexButton')));

  // Test form element with zero tab index is focusable.
  assertTrue(
      'isFocusable() must be true for form elements with ' +
          'zero tab index',
      goog.dom.isFocusable(goog.dom.getElement('zeroTabIndexButton')));

  // Test form element with positive tab index is focusable.
  assertTrue(
      'isFocusable() must be true for form elements with ' +
          'positive tab index',
      goog.dom.isFocusable(goog.dom.getElement('posTabIndexButton')));

  // Test disabled form element with no tab index is not focusable.
  assertFalse(
      'isFocusable() must be false for disabled form elements with ' +
          'no tab index',
      goog.dom.isFocusable(goog.dom.getElement('disabledNoTabIndexButton')));

  // Test disabled form element with negative tab index is not focusable.
  assertFalse(
      'isFocusable() must be false for disabled form elements with ' +
          'negative tab index',
      goog.dom.isFocusable(goog.dom.getElement('disabledNegTabIndexButton')));

  // Test disabled form element with zero tab index is not focusable.
  assertFalse(
      'isFocusable() must be false for disabled form elements with ' +
          'zero tab index',
      goog.dom.isFocusable(goog.dom.getElement('disabledZeroTabIndexButton')));

  // Test disabled form element with positive tab index is not focusable.
  assertFalse(
      'isFocusable() must be false for disabled form elements with ' +
          'positive tab index',
      goog.dom.isFocusable(goog.dom.getElement('disabledPosTabIndexButton')));

  // Test non-form types should return same value as isFocusableTabIndex()
  assertEquals(
      'isFocusable() and isFocusableTabIndex() must agree for ' +
          ' no tab index',
      goog.dom.isFocusableTabIndex(goog.dom.getElement('noTabIndex')),
      goog.dom.isFocusable(goog.dom.getElement('noTabIndex')));
  assertEquals(
      'isFocusable() and isFocusableTabIndex() must agree for ' +
          ' tab index -2',
      goog.dom.isFocusableTabIndex(goog.dom.getElement('tabIndexNegative2')),
      goog.dom.isFocusable(goog.dom.getElement('tabIndexNegative2')));
  assertEquals(
      'isFocusable() and isFocusableTabIndex() must agree for ' +
          ' tab index -1',
      goog.dom.isFocusableTabIndex(goog.dom.getElement('tabIndexNegative1')),
      goog.dom.isFocusable(goog.dom.getElement('tabIndexNegative1')));

  // Make sure IE doesn't throw for detached elements. IE can't measure detached
  // elements, and calling getBoundingClientRect() will throw Unspecified Error.
  goog.dom.isFocusable(goog.dom.createDom(goog.dom.TagName.BUTTON));
}

function testGetTextContent() {
  function t(inp, out) {
    assertEquals(
        out.replace(/ /g, '_'),
        goog.dom.getTextContent(createTestDom(inp)).replace(/ /g, '_'));
  }

  t('abcde', 'abcde');
  t('a<b>bcd</b>efgh', 'abcdefgh');
  t('a<script type="text/javascript' +
        '">var a=1;<' +
        '/script>h',
    'ah');
  t('<html><head><style type="text/css">' +
        'p{margin:100%;padding:5px}\n.class{background-color:red;}</style>' +
        '</head><body><h1>Hello</h1>\n<p>One two three</p>\n<table><tr><td>a' +
        '<td>b</table><' +
        'script>var a = \'foo\';' +
        '</scrip' +
        't></body></html>',
    'HelloOne two threeab');
  t('abc<br>def', 'abc\ndef');
  t('abc<br>\ndef', 'abc\ndef');
  t('abc<br>\n\ndef', 'abc\ndef');
  t('abc<br><br>\ndef', 'abc\n\ndef');
  t(' <b>abcde  </b>   ', 'abcde ');
  t(' <b>abcde    </b> hi  ', 'abcde hi ');
  t(' \n<b>abcde  </b>   ', 'abcde ');
  t(' \n<b>abcde  </b>   \n\n\n', 'abcde ');
  t('<p>abcde</p>\nfg', 'abcdefg');
  t('\n <div>  <b>abcde  </b>   ', 'abcde ');
  t(' \n&shy;<b>abcde &shy; </b>   \n\n\n&shy;', 'abcde ');
  t(' \n&shy;\n\n&shy;\na   ', 'a ');
  t(' \n<wbr></wbr><b>abcde <wbr></wbr> </b>   \n\n\n<wbr></wbr>', 'abcde ');
  t('a&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b',
    goog.dom.BrowserFeature.CAN_USE_INNER_TEXT ? 'a     b' :
                                                 'a\xA0\xA0\xA0\xA0\xA0b');
}

function testGetNodeTextLength() {
  assertEquals(6, goog.dom.getNodeTextLength(createTestDom('abcdef')));
  assertEquals(8, goog.dom.getNodeTextLength(createTestDom('a<b>bcd</b>efgh')));
  assertEquals(
      2, goog.dom.getNodeTextLength(
             createTestDom(
                 'a<script type="text/javascript' +
                 '">var a = 1234;<' +
                 '/script>h')));
  assertEquals(
      4, goog.dom.getNodeTextLength(
             createTestDom('a<br>\n<!-- some comments -->\nfo')));
  assertEquals(
      20,
      goog.dom.getNodeTextLength(
          createTestDom(
              '<html><head><style type="text/css">' +
              'p{margin:100%;padding:5px}\n.class{background-color:red;}</style>' +
              '</head><body><h1>Hello</h1><p>One two three</p><table><tr><td>a<td>b' +
              '</table><' +
              'script>var a = \'foo\';</scrip' +
              't></body></html>')));
  assertEquals(
      10, goog.dom.getNodeTextLength(createTestDom('a<b>bcd</b><br />efghi')));
}

function testGetNodeTextOffset() {
  assertEquals(
      4, goog.dom.getNodeTextOffset($('offsetTest1'), $('offsetParent1')));
  assertEquals(12, goog.dom.getNodeTextOffset($('offsetTest1')));
}

function testGetNodeAtOffset() {
  var html = '<div id=a>123<b id=b>45</b><span id=c>67<b id=d>89<i id=e>01' +
      '</i>23<i id=f>45</i>67</b>890<i id=g>123</i><b id=h>456</b>' +
      '</span></div><div id=i>7890<i id=j>123</i></div>';
  var node = goog.dom.createElement(goog.dom.TagName.DIV);
  node.innerHTML = html;
  var rv = {};

  goog.dom.getNodeAtOffset(node, 2, rv);
  assertEquals('123', rv.node.nodeValue);
  assertEquals('a', rv.node.parentNode.id);
  assertEquals(1, rv.remainder);

  goog.dom.getNodeAtOffset(node, 3, rv);
  assertEquals('123', rv.node.nodeValue);
  assertEquals('a', rv.node.parentNode.id);
  assertEquals(2, rv.remainder);

  goog.dom.getNodeAtOffset(node, 5, rv);
  assertEquals('45', rv.node.nodeValue);
  assertEquals('b', rv.node.parentNode.id);
  assertEquals(1, rv.remainder);

  goog.dom.getNodeAtOffset(node, 6, rv);
  assertEquals('67', rv.node.nodeValue);
  assertEquals('c', rv.node.parentNode.id);
  assertEquals(0, rv.remainder);

  goog.dom.getNodeAtOffset(node, 23, rv);
  assertEquals('123', rv.node.nodeValue);
  assertEquals('g', rv.node.parentNode.id);
  assertEquals(2, rv.remainder);

  goog.dom.getNodeAtOffset(node, 30, rv);
  assertEquals('7890', rv.node.nodeValue);
  assertEquals('i', rv.node.parentNode.id);
  assertEquals(3, rv.remainder);
}

// IE inserts line breaks and capitalizes nodenames.
function assertEqualsCaseAndLeadingWhitespaceInsensitive(value1, value2) {
  value1 = value1.replace(/^\s+|\s+$/g, '').toLowerCase();
  value2 = value2.replace(/^\s+|\s+$/g, '').toLowerCase();
  assertEquals(value1, value2);
}

function testGetOuterHtml() {
  var contents = '<b>foo</b>';
  var node = goog.dom.createElement(goog.dom.TagName.DIV);
  node.setAttribute('foo', 'bar');
  node.innerHTML = contents;
  assertEqualsCaseAndLeadingWhitespaceInsensitive(
      goog.dom.getOuterHtml(node), '<div foo="bar">' + contents + '</div>');

  var imgNode = goog.dom.createElement(goog.dom.TagName.IMG);
  imgNode.setAttribute('foo', 'bar');
  assertEqualsCaseAndLeadingWhitespaceInsensitive(
      goog.dom.getOuterHtml(imgNode), '<img foo="bar">');
}


function testGetWindowFrame() {
  var frameWindow = window.frames['frame'];
  var frameDocument = frameWindow.document;
  var frameDomHelper = new goog.dom.DomHelper(frameDocument);

  // Cannot use assertEquals since IE fails on ===
  assertTrue(frameWindow == frameDomHelper.getWindow());
}

function testGetWindow() {
  var domHelper = new goog.dom.DomHelper();
  // Cannot use assertEquals since IE fails on ===
  assertTrue(window == domHelper.getWindow());
}

function testGetWindowStatic() {
  // Cannot use assertEquals since IE fails on ===
  assertTrue(window == goog.dom.getWindow());
}

function testIsNodeList() {
  var elem = document.getElementById('p2');
  var text = document.getElementById('b2').firstChild;

  assertTrue(
      'NodeList should be a node list', goog.dom.isNodeList(elem.childNodes));
  assertFalse('TextNode should not be a node list', goog.dom.isNodeList(text));
  assertFalse(
      'Array of nodes should not be a node list',
      goog.dom.isNodeList([elem.firstChild, elem.lastChild]));
}

function testGetFrameContentDocument() {
  var iframe = goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME)[0];
  var name = iframe.name;
  var iframeDoc = goog.dom.getFrameContentDocument(iframe);
  assertEquals(window.frames[name].document, iframeDoc);
}

function testGetFrameContentWindow() {
  var iframe = goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME)[0];
  var name = iframe.name;
  var iframeWin = goog.dom.getFrameContentWindow(iframe);
  assertEquals(window.frames[name], iframeWin);
}

function testGetFrameContentWindowNotInitialized() {
  var iframe = goog.dom.createDom(goog.dom.TagName.IFRAME);
  assertNull(goog.dom.getFrameContentWindow(iframe));
}

function testCanHaveChildren() {
  var EMPTY_ELEMENTS = goog.object.createSet(
      goog.dom.TagName.APPLET, goog.dom.TagName.AREA, goog.dom.TagName.BASE,
      goog.dom.TagName.BR, goog.dom.TagName.COL, goog.dom.TagName.COMMAND,
      goog.dom.TagName.EMBED, goog.dom.TagName.FRAME, goog.dom.TagName.HR,
      goog.dom.TagName.IMG, goog.dom.TagName.INPUT, goog.dom.TagName.IFRAME,
      goog.dom.TagName.ISINDEX, goog.dom.TagName.KEYGEN, goog.dom.TagName.LINK,
      goog.dom.TagName.NOFRAMES, goog.dom.TagName.NOSCRIPT,
      goog.dom.TagName.META, goog.dom.TagName.OBJECT, goog.dom.TagName.PARAM,
      goog.dom.TagName.SCRIPT, goog.dom.TagName.SOURCE, goog.dom.TagName.STYLE,
      goog.dom.TagName.TRACK, goog.dom.TagName.WBR);

  // IE opens a dialog warning about using Java content if an EMBED is created.
  var IE_ILLEGAL_ELEMENTS = goog.object.createSet(goog.dom.TagName.EMBED);

  for (var tag in goog.dom.TagName) {
    if (goog.userAgent.IE && tag in IE_ILLEGAL_ELEMENTS) {
      continue;
    }

    var expected = !(tag in EMPTY_ELEMENTS);
    var node = goog.dom.createElement(tag);
    assertEquals(
        tag + ' should ' + (expected ? '' : 'not ') + 'have children', expected,
        goog.dom.canHaveChildren(node));

    // Make sure we can _actually_ add a child if we identify the node as
    // allowing children.
    if (goog.dom.canHaveChildren(node)) {
      node.appendChild(goog.dom.createDom(goog.dom.TagName.DIV, null, 'foo'));
    }
  }
}

function testGetAncestorNoElement() {
  assertNull(goog.dom.getAncestor(
      null /* element */, goog.functions.TRUE /* matcher */));
  assertNull(goog.dom.getAncestor(
      null /* element */, goog.functions.TRUE /* matcher */,
      true /* opt_includeNode */));
}

function testGetAncestorNoMatch() {
  var elem = goog.dom.getElement('nestedElement');
  assertNull(goog.dom.getAncestor(elem, function() { return false; }));
}

function testGetAncestorMatchSelf() {
  var elem = goog.dom.getElement('nestedElement');
  var matched = goog.dom.getAncestor(elem, function() { return true; }, true);
  assertEquals(elem, matched);
}

function testGetAncestorNoMatchSelf() {
  var elem = goog.dom.getElement('nestedElement');
  var matched = goog.dom.getAncestor(elem, function() { return true; });
  assertEquals(elem.parentNode, matched);
}

function testGetAncestorWithMaxSearchStepsMatchSelf() {
  var elem = goog.dom.getElement('nestedElement');
  var matched =
      goog.dom.getAncestor(elem, function() { return true; }, true, 2);
  assertEquals(elem, matched);
}

function testGetAncestorWithMaxSearchStepsMatch() {
  var elem = goog.dom.getElement('nestedElement');
  var searchEl = elem.parentNode.parentNode;
  var matched = goog.dom.getAncestor(
      elem, function(el) { return el == searchEl; }, false, 1);
  assertEquals(searchEl, matched);
}

function testGetAncestorWithMaxSearchStepsNoMatch() {
  var elem = goog.dom.getElement('nestedElement');
  var searchEl = elem.parentNode.parentNode;
  var matched = goog.dom.getAncestor(
      elem, function(el) { return el == searchEl; }, false, 0);
  assertNull(matched);
}

function testGetAncestorByTagWithMaxSearchStepsNoMatch() {
  var elem = goog.dom.getElement('nestedElement');
  var searchEl = elem.parentNode.parentNode;
  var matched = goog.dom.getAncestorByTagNameAndClass(
      elem, goog.dom.TagName.DIV, /* class */ undefined, 0);
  assertNull(matched);
}

function testGetAncestorByTagNameNoMatch() {
  var elem = goog.dom.getElement('nestedElement');
  assertNull(goog.dom.getAncestorByTagNameAndClass(elem, goog.dom.TagName.IMG));
}

function testGetAncestorByTagNameOnly() {
  var elem = goog.dom.getElement('nestedElement');
  var expected = goog.dom.getElement('testAncestorDiv');
  assertEquals(
      expected,
      goog.dom.getAncestorByTagNameAndClass(elem, goog.dom.TagName.DIV));
  assertEquals(expected, goog.dom.getAncestorByTagNameAndClass(elem, 'div'));
}

function testGetAncestorByClassWithMaxSearchStepsNoMatch() {
  var elem = goog.dom.getElement('nestedElement');
  var searchEl = elem.parentNode.parentNode;
  var matched = goog.dom.getAncestorByClass(elem, 'testAncestor', 0);
  assertNull(matched);
}

function testGetAncestorByClassNameNoMatch() {
  var elem = goog.dom.getElement('nestedElement');
  assertNull(goog.dom.getAncestorByClass(elem, 'bogusClassName'));
}

function testGetAncestorByClassName() {
  var elem = goog.dom.getElement('nestedElement');
  var expected = goog.dom.getElement('testAncestorP');
  assertEquals(expected, goog.dom.getAncestorByClass(elem, 'testAncestor'));
}

function testGetAncestorByTagNameAndClass() {
  var elem = goog.dom.getElement('nestedElement');
  var expected = goog.dom.getElement('testAncestorDiv');
  assertEquals(
      expected, goog.dom.getAncestorByTagNameAndClass(
                    elem, goog.dom.TagName.DIV, 'testAncestor'));
  assertNull(
      'Should return null if no search criteria are given',
      goog.dom.getAncestorByTagNameAndClass(elem));
}

function testCreateTable() {
  var table = goog.dom.createTable(2, 3, true);
  assertEquals(
      2, goog.dom.getElementsByTagName(goog.dom.TagName.TR, table).length);
  assertEquals(
      3, goog.dom.getElementsByTagName(goog.dom.TagName.TR, table)[0]
             .childNodes.length);
  assertEquals(
      6, goog.dom.getElementsByTagName(goog.dom.TagName.TD, table).length);
  assertEquals(
      goog.string.Unicode.NBSP,
      goog.dom.getElementsByTagName(goog.dom.TagName.TD, table)[0]
          .firstChild.nodeValue);

  table = goog.dom.createTable(2, 3, false);
  assertEquals(
      2, goog.dom.getElementsByTagName(goog.dom.TagName.TR, table).length);
  assertEquals(
      3, goog.dom.getElementsByTagName(goog.dom.TagName.TR, table)[0]
             .childNodes.length);
  assertEquals(
      6, goog.dom.getElementsByTagName(goog.dom.TagName.TD, table).length);
  assertEquals(
      0, goog.dom.getElementsByTagName(goog.dom.TagName.TD, table)[0]
             .childNodes.length);
}

function testSafeHtmlToNode() {
  var docFragment = goog.dom.safeHtmlToNode(
      goog.html.testing.newSafeHtmlForTest('<a>1</a><b>2</b>'));
  assertNull(docFragment.parentNode);
  assertEquals(2, docFragment.childNodes.length);

  var div = goog.dom.safeHtmlToNode(
      goog.html.testing.newSafeHtmlForTest('<div>3</div>'));
  assertEquals(String(goog.dom.TagName.DIV), div.tagName);

  var script = goog.dom.safeHtmlToNode(
      goog.html.testing.newSafeHtmlForTest('<script></script>'));
  assertEquals(String(goog.dom.TagName.SCRIPT), script.tagName);

  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    // Removing an Element from a DOM tree in IE sets its parentNode to a new
    // DocumentFragment. Bizarre!
    assertEquals(
        goog.dom.NodeType.DOCUMENT_FRAGMENT,
        goog.dom.removeNode(div).parentNode.nodeType);
  } else {
    assertNull(div.parentNode);
  }
}

/**
 * Assert that the given goog.string.Const, when converted to a Node,
 * stringifies in one of the specified ways.
 *
 * @param{!Array<string>} potentialStringifications
 * @param{...!goog.string.Const} var_args The constants to use.
 */
function assertConstHtmlToNodeStringifiesToOneOf(
    potentialStringifications, var_args) {
  var node =
      goog.dom.constHtmlToNode.apply(undefined, goog.array.slice(arguments, 1));
  var stringified = goog.dom.getOuterHtml(node);
  if (goog.array.find(potentialStringifications, function(element) {
        return element == stringified;
      }) === null) {
    fail(
        'Unexpected stringification for a node built from "' +
        goog.array.map(goog.array.slice(arguments, 1), goog.string.Const.unwrap)
            .join('') +
        '": "' + stringified + '"');
  }
}

function testRegularConstHtmlToNodeStringifications() {
  assertConstHtmlToNodeStringifiesToOneOf(
      ['<b>foo</b>', '<B>foo</B>'], goog.string.Const.from('<b>foo</b>'));

  assertConstHtmlToNodeStringifiesToOneOf(
      ['<br>', '<BR>'], goog.string.Const.from('<br>'));

  assertConstHtmlToNodeStringifiesToOneOf(
      [
        '<SVG></B>', '<svg></svg>', '<svg xmlns="http://www.w3.org/2000/svg" />'
      ],
      goog.string.Const.from('<svg></b>'));

  assertConstHtmlToNodeStringifiesToOneOf(
      ['<unknown></unknown>', '<unknown>', '<UNKNOWN />'],
      goog.string.Const.from('<unknown />'));

  assertConstHtmlToNodeStringifiesToOneOf(
      ['&lt;"&amp;', '&lt;"'], goog.string.Const.from('<"&'));
}

function testConcatenatedConstHtmlToNodeStringifications() {
  assertConstHtmlToNodeStringifiesToOneOf(
      ['<b>foo</b>', '<B>foo</B>'], goog.string.Const.from('<b>foo<'),
      goog.string.Const.from('/b>'));

  assertConstHtmlToNodeStringifiesToOneOf(
      ['<b>foo</b>', '<B>foo</B>'], goog.string.Const.from('<b>foo</b>'),
      goog.string.Const.from(''));

  assertConstHtmlToNodeStringifiesToOneOf(['']);
}

function testSpecialConstHtmlToNodeStringifications() {
  // body one is IE8, \r\n is opera.
  assertConstHtmlToNodeStringifiesToOneOf(
      [
        '<script></script>', '<SCRIPT></SCRIPT>', '<script></body></script>',
        '\r\n' +
            '<SCRIPT></SCRIPT>'
      ],
      goog.string.Const.from('<script>'));

  assertConstHtmlToNodeStringifiesToOneOf(
      ['&lt;% %&gt;', '<% %>'], goog.string.Const.from('<% %>'));

  assertConstHtmlToNodeStringifiesToOneOf(
      ['&lt;% <script> %></script>', '<% <script> %>'],
      goog.string.Const.from('<% <script> %>'));

  assertConstHtmlToNodeStringifiesToOneOf(
      ['</ hi />', '<!-- hi /-->', ''], goog.string.Const.from('</ hi />'));

  assertConstHtmlToNodeStringifiesToOneOf(
      ['<!-- <script --> /&gt;', '</ <script>/&gt;', ' /&gt;'],
      goog.string.Const.from('</ <script > />'));
}

function testAppend() {
  var div = goog.dom.createElement(goog.dom.TagName.DIV);
  var b = goog.dom.createElement(goog.dom.TagName.B);
  var c = document.createTextNode('c');
  goog.dom.append(div, 'a', b, c);
  assertEqualsCaseAndLeadingWhitespaceInsensitive('a<b></b>c', div.innerHTML);
}

function testAppend2() {
  var dom = new goog.dom.DomHelper(myIframeDoc);
  var div = dom.createElement(goog.dom.TagName.DIV);
  var b = dom.createElement(goog.dom.TagName.B);
  var c = myIframeDoc.createTextNode('c');
  goog.dom.append(div, 'a', b, c);
  assertEqualsCaseAndLeadingWhitespaceInsensitive('a<b></b>c', div.innerHTML);
}

function testAppend3() {
  var div = goog.dom.createElement(goog.dom.TagName.DIV);
  var b = goog.dom.createElement(goog.dom.TagName.B);
  var c = document.createTextNode('c');
  goog.dom.append(div, ['a', b, c]);
  assertEqualsCaseAndLeadingWhitespaceInsensitive('a<b></b>c', div.innerHTML);
}

function testAppend4() {
  var div = goog.dom.createElement(goog.dom.TagName.DIV);
  var div2 = goog.dom.createElement(goog.dom.TagName.DIV);
  div2.innerHTML = 'a<b></b>c';
  goog.dom.append(div, div2.childNodes);
  assertEqualsCaseAndLeadingWhitespaceInsensitive('a<b></b>c', div.innerHTML);
  assertFalse(div2.hasChildNodes());
}

function testGetDocumentScroll() {
  // setUpPage added divForTestingScrolling to the DOM. It's not init'd here so
  // it can be shared amonst other tests.
  window.scrollTo(100, 100);

  assertEquals(100, goog.dom.getDocumentScroll().x);
  assertEquals(100, goog.dom.getDocumentScroll().y);
}

function testGetDocumentScrollOfFixedViewport() {
  // iOS and perhaps other environments don't actually support scrolling.
  // Instead, you view the document's fixed layout through a screen viewport.
  // We need getDocumentScroll to handle this case though.
  // In case of IE10 though, we do want to use scrollLeft/scrollTop
  // because the rest of the positioning is done off the scrolled away origin.
  var fakeDocumentScrollElement = {scrollLeft: 0, scrollTop: 0};
  var fakeDocument = {
    defaultView: {pageXOffset: 100, pageYOffset: 100},
    documentElement: fakeDocumentScrollElement,
    body: fakeDocumentScrollElement
  };
  var dh = goog.dom.getDomHelper(document);
  dh.setDocument(fakeDocument);
  if (goog.userAgent.IE && goog.userAgent.isVersionOrHigher(10)) {
    assertEquals(0, dh.getDocumentScroll().x);
    assertEquals(0, dh.getDocumentScroll().y);
  } else {
    assertEquals(100, dh.getDocumentScroll().x);
    assertEquals(100, dh.getDocumentScroll().y);
  }
}


function testGetDocumentScrollFromDocumentWithoutABody() {
  // Some documents, like SVG docs, do not have a body element. The document
  // element should be used when computing the document scroll for these
  // documents.
  var fakeDocument = {
    defaultView: {pageXOffset: 0, pageYOffset: 0},
    documentElement: {scrollLeft: 0, scrollTop: 0}
  };

  var dh = new goog.dom.DomHelper(fakeDocument);
  assertEquals(fakeDocument.documentElement, dh.getDocumentScrollElement());
  assertEquals(0, dh.getDocumentScroll().x);
  assertEquals(0, dh.getDocumentScroll().y);
  // OK if this does not throw.
}

function testDefaultToScrollingElement() {
  var fakeDocument = {documentElement: {}, body: {}};
  var dh = new goog.dom.DomHelper(fakeDocument);

  // When scrollingElement isn't supported or is null (no element causes
  // scrolling), then behavior is UA-dependent for maximum compatibility.
  assertTrue(
      dh.getDocumentScrollElement() == fakeDocument.body ||
      dh.getDocumentScrollElement() == fakeDocument.documentElement);
  fakeDocument.scrollingElement = null;
  assertTrue(
      dh.getDocumentScrollElement() == fakeDocument.body ||
      dh.getDocumentScrollElement() == fakeDocument.documentElement);

  // But when scrollingElement is set, we use it directly.
  fakeDocument.scrollingElement = fakeDocument.documentElement;
  assertEquals(fakeDocument.documentElement, dh.getDocumentScrollElement());
  fakeDocument.scrollingElement = fakeDocument.body;
  assertEquals(fakeDocument.body, dh.getDocumentScrollElement());
}

function testActiveElementIE() {
  if (!goog.userAgent.IE) {
    return;
  }

  var link = goog.dom.getElement('link');
  link.focus();

  assertEquals(link.tagName, goog.dom.getActiveElement(document).tagName);
  assertEquals(link, goog.dom.getActiveElement(document));
}

function testParentElement() {
  var testEl = $('testEl');
  var bodyEl = goog.dom.getParentElement(testEl);
  assertNotNull(bodyEl);
  var htmlEl = goog.dom.getParentElement(bodyEl);
  assertNotNull(htmlEl);
  var documentNotAnElement = goog.dom.getParentElement(htmlEl);
  assertNull(documentNotAnElement);

  var tree = goog.dom.safeHtmlToNode(goog.html.testing.newSafeHtmlForTest(
      '<div>' +
      '<p>Some text</p>' +
      '<blockquote>Some <i>special</i> <b>text</b></blockquote>' +
      '<address><!-- comment -->Foo</address>' +
      '</div>'));
  assertNull(goog.dom.getParentElement(tree));
  pEl = goog.dom.getNextNode(tree);
  var fragmentRootEl = goog.dom.getParentElement(pEl);
  assertEquals(tree, fragmentRootEl);

  var detachedEl = goog.dom.createDom(goog.dom.TagName.DIV);
  var detachedHasNoParent = goog.dom.getParentElement(detachedEl);
  assertNull(detachedHasNoParent);

  // svg is not supported in IE8 and below or in IE9 quirks mode
  var supported = !goog.userAgent.IE ||
      goog.userAgent.isDocumentModeOrHigher(10) ||
      (goog.dom.isCss1CompatMode() && goog.userAgent.isDocumentModeOrHigher(9));
  if (!supported) {
    return;
  }

  var svg = $('testSvg');
  assertNotNull(svg);
  var rect = $('testRect');
  assertNotNull(rect);
  var g = $('testG');
  assertNotNull(g);

  if (goog.userAgent.IE && goog.userAgent.isVersionOrHigher('9')) {
    // test to make sure IE9 is returning undefined for .parentElement
    assertUndefined(g.parentElement);
    assertUndefined(rect.parentElement);
    assertUndefined(svg.parentElement);
  }
  var shouldBeG = goog.dom.getParentElement(rect);
  assertEquals(g, shouldBeG);
  var shouldBeSvg = goog.dom.getParentElement(g);
  assertEquals(svg, shouldBeSvg);
  var shouldBeBody = goog.dom.getParentElement(svg);
  assertEquals(bodyEl, shouldBeBody);
}


/**
 * @return {boolean} Returns true if the userAgent is IE8 or higher.
 */
function isIE8OrHigher() {
  return goog.userAgent.IE && goog.userAgent.product.isVersion('8');
}

/**
 * Stub out goog.dom.getWindow with passed object.
 * @param {!Object} win Fake window object.
 */
function setWindow(win) {
  stubs.set(goog.dom, 'getWindow', goog.functions.constant(win));
}

function testDevicePixelRatio() {
  var devicePixelRatio = 1.5;
  setWindow({
    'matchMedia': function(query) {
      return {
        'matches': devicePixelRatio >= parseFloat(query.split(': ')[1], 10)
      };
    }
  });

  assertEquals(devicePixelRatio, goog.dom.getPixelRatio());

  setWindow({'devicePixelRatio': 2.0});
  assertEquals(2, goog.dom.getPixelRatio());

  setWindow({});
  assertEquals(1, goog.dom.getPixelRatio());
}
