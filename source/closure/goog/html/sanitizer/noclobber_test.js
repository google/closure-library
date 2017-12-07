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

/** @fileoverview Tests for {@link goog.html.sanitizer.noclobber} */

goog.module('goog.html.sanitizer.noclobberTest');
goog.setTestOnly();

var NodeType = goog.require('goog.dom.NodeType');
var noclobber = goog.require('goog.html.sanitizer.noclobber');
var testSuite = goog.require('goog.testing.testSuite');
var userAgentProduct = goog.require('goog.userAgent.product');


const antiClobberingSupported =
    !userAgentProduct.IE || document.documentMode >= 10;

/**
 * @param {string} html
 * @return {!Element}
 */
function htmlToElement(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

/**
 * @param {string} name
 * @return {!Element}
 */
function getClobberedElement(name) {
  return htmlToElement('<form id="foo"><input name="' + name + '"></form>');
}

testSuite({
  testElement() {
    if (!antiClobberingSupported) {
      return;
    }
    var element = getClobberedElement('attributes');
    var attributes = noclobber.getElementAttributes(element);
    assertNotEquals(element.attributes, attributes);
    if (Object.getOwnPropertyDescriptor(Element.prototype, 'attributes')) {
      assertTrue(attributes instanceof NamedNodeMap);
    } else {
      assertNull(attributes);
    }

    element = getClobberedElement('hasAttribute');
    assertTrue(noclobber.hasElementAttribute(element, 'id'));
    assertFalse(noclobber.hasElementAttribute(element, 'bar'));

    element = getClobberedElement('getAttribute');
    assertEquals('foo', noclobber.getElementAttribute(element, 'id'));

    element = getClobberedElement('setAttribute');
    noclobber.setElementAttribute(element, 'id', 'bar');
    assertEquals('bar', noclobber.getElementAttribute(element, 'id'));

    element = getClobberedElement('removeAttribute');
    assertTrue(element.hasAttribute('id'));
    noclobber.removeElementAttribute(element, 'id');
    assertFalse(element.hasAttribute('id'));

    element = getClobberedElement('innerHTML');
    var innerHTML = noclobber.getElementInnerHTML(element);
    if (Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML')) {
      assertEquals('<input name="innerHTML">', innerHTML);
    } else {
      assertEquals('', innerHTML);
    }

    element = getClobberedElement('style');
    var style = noclobber.getElementStyle(element);
    if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style') &&
        !userAgentProduct.SAFARI) {
      assertTrue(style instanceof CSSStyleDeclaration);
    } else {
      assertNull(style);
    }

    element = getClobberedElement('getElementsByTagName');
    assertArrayEquals(
        Array.from(element.children),
        noclobber.getElementsByTagName(element, 'input'));

    element = htmlToElement(
        '<form><input name="sheet"><style>color:red</style></form>');
    document.body.appendChild(element);  // needs to be rooted into the DOM.
    assertEquals(
        element.children[1].sheet,
        noclobber.getElementStyleSheet(element.children[1]));

    element = getClobberedElement('matches');
    assertTrue(noclobber.elementMatches(element, '#foo'));
    assertFalse(noclobber.elementMatches(element, '#bar'));
  },

  testNode() {
    if (!antiClobberingSupported) {
      return;
    }
    var element = getClobberedElement('nodeName');
    assertEquals('FORM', noclobber.getNodeName(element));

    element = getClobberedElement('nodeType');
    noclobber.assertNodeIsElement(element);
    assertEquals(NodeType.ELEMENT, noclobber.getNodeType(element));

    element = getClobberedElement('parentNode');
    assertEquals('DIV', noclobber.getParentNode(element).nodeName);

    element = getClobberedElement('childNodes');
    assertTrue(noclobber.getChildNodes(element) instanceof NodeList);
  },

  testCSSStyleDeclaration() {
    if (!antiClobberingSupported) {
      return;
    }
    var element = getClobberedElement('getPropertyValue');
    element.style.setProperty('color', 'red');
    assertEquals('red', noclobber.getCssPropertyValue(element.style, 'color'));

    element = getClobberedElement('setProperty');
    noclobber.setCssProperty(element.style, 'color', 'red');
    assertEquals('red', element.style.color);
  },

  testCSSStyleDeclaration_notClobbered() {
    // On IE8 and IE9 the CSS functions should still work when the property is
    // not clobbered (assuming optionalAntiClobbering is true).
    var element = getClobberedElement('notClobbered');
    if (element.style.setProperty) {
      element.style.setProperty('color', 'red');
    } else {
      element.style.setAttribute('color', 'red');
    }
    assertEquals(
        'red',
        noclobber.getCssPropertyValue(
            element.style, 'color', true /* opt_optionalAntiClobbering */));

    element = getClobberedElement('notClobbered');
    noclobber.setCssProperty(
        element.style, 'color', 'red', true /* opt_optionalAntiClobbering */);
    assertEquals('red', element.style.color);
  }
});
