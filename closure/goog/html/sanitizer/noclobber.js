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

/**
 * @fileoverview Utility DOM functions resistant to DOM clobbering.
 * @supported Unless specified in the method documentation, IE 10 and newer.
 */

goog.module('goog.html.sanitizer.noclobber');
goog.module.declareLegacyNamespace();

var NodeType = goog.require('goog.dom.NodeType');
var googAsserts = goog.require('goog.asserts');
var googDom = goog.require('goog.dom');
var userAgent = goog.require('goog.userAgent');

// TODO(b/70187054): check if we can stop saving the property descriptors and
// save the values directly instead. Also see if it's possible to stop using
// bracket notation to access propertyDescriptors methods.

/**
 * Map of property descriptors we use to avoid looking up the prototypes
 * multiple times.
 * @type {!Object<string, ?ObjectPropertyDescriptor>}
 */
var propertyDescriptors = !userAgent.IE || document.documentMode >= 10 ? {
  'attributes':
      Object.getOwnPropertyDescriptor(Element.prototype, 'attributes'),
  'hasAttribute':
      Object.getOwnPropertyDescriptor(Element.prototype, 'hasAttribute'),
  'getAttribute':
      Object.getOwnPropertyDescriptor(Element.prototype, 'getAttribute'),
  'setAttribute':
      Object.getOwnPropertyDescriptor(Element.prototype, 'setAttribute'),
  'removeAttribute':
      Object.getOwnPropertyDescriptor(Element.prototype, 'removeAttribute'),
  'innerHTML': Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML'),
  'getElementsByTagName': Object.getOwnPropertyDescriptor(
      Element.prototype, 'getElementsByTagName'),
  'matches': Object.getOwnPropertyDescriptor(Element.prototype, 'matches') ||
      Object.getOwnPropertyDescriptor(Element.prototype, 'msMatchesSelector'),
  'nodeName': Object.getOwnPropertyDescriptor(Node.prototype, 'nodeName'),
  'nodeType': Object.getOwnPropertyDescriptor(Node.prototype, 'nodeType'),
  'parentNode': Object.getOwnPropertyDescriptor(Node.prototype, 'parentNode'),
  'childNodes': Object.getOwnPropertyDescriptor(Node.prototype, 'childNodes'),
  'textContent': Object.getOwnPropertyDescriptor(Node.prototype, 'textContent'),
  'style': Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style'),
  'sheet': Object.getOwnPropertyDescriptor(HTMLStyleElement.prototype, 'sheet'),
  'getPropertyValue': Object.getOwnPropertyDescriptor(
      CSSStyleDeclaration.prototype, 'getPropertyValue'),
  'setProperty': Object.getOwnPropertyDescriptor(
      CSSStyleDeclaration.prototype, 'setProperty')
} :
                                                                         {};

/**
 * Returns an element's attributes without falling prey to things like
 * <form><input name="attributes"></form>. Equivalent to {@code
 * node.attributes}.
 * @param {!Element} element
 * @return {?NamedNodeMap}
 */
function getElementAttributes(element) {
  var attrDescriptor = propertyDescriptors['attributes'];
  if (attrDescriptor && attrDescriptor.get) {
    return attrDescriptor.get.apply(element);
  } else {
    return element.attributes instanceof NamedNodeMap ? element.attributes :
                                                        null;
  }
}

/**
 * Returns whether an element has a specific attribute, without falling prey to
 * things like <form><input name="hasAttribute"></form>.
 * Equivalent to {@code element.hasAttribute("foo")}.
 * @param {!Element} element
 * @param {string} attrName
 * @return {boolean}
 */
function hasElementAttribute(element, attrName) {
  var descriptor = propertyDescriptors['hasAttribute'];
  if (descriptor && descriptor.value) {
    return descriptor.value.call(element, attrName);
  } else {
    return typeof element.hasAttribute == 'function' ?
        element.hasAttribute(attrName) :
        false;
  }
}

/**
 * Returns a specific attribute from an element without falling prey to
 * things like <form><input name="getAttribute"></form>.
 * Equivalent to {@code element.getAttribute("foo")}.
 * @param {!Element} element
 * @param {string} attrName
 * @return {string}
 */
function getElementAttribute(element, attrName) {
  var descriptor = propertyDescriptors['getAttribute'];
  if (descriptor && descriptor.value) {
    var ret = descriptor.value.call(element, attrName);
    return ret || '';  // FireFox returns null
  } else {
    return '';
  }
}

/**
 * Sets an element's attributes without falling prey to things like
 * <form><input name="setAttribute"></form>. Equivalent to {@code
 * element.setAttribute("foo", "bar")}.
 * @param {!Element} element
 * @param {string} name
 * @param {string} value
 */
function setElementAttribute(element, name, value) {
  var attrDescriptor = propertyDescriptors['setAttribute'];
  if (attrDescriptor && attrDescriptor.value) {
    try {
      attrDescriptor.value.call(element, name, value);
    } catch (e) {
      // IE throws an exception if the src attribute contains HTTP credentials.
      // However the attribute gets set anyway.
      if (e.message.indexOf('A security problem occurred') == -1) {
        throw e;
      }
    }
  }
}

/**
 * Deletes a specific attribute from an element without falling prey to
 * things like <form><input name="removeAttribute"></form>.
 * Equivalent to {@code element.removeAttribute("foo")}.
 * @param {!Element} element
 * @param {string} attrName
 */
function removeElementAttribute(element, attrName) {
  var descriptor = propertyDescriptors['removeAttribute'];
  if (descriptor && descriptor.value) {
    descriptor.value.call(element, attrName);
  }
}

/**
 * Returns a node's innerHTML property value without falling prey to things like
 * <form><input name="innerHTML"></form>. Equivalent to {@code
 * element.innerHTML}.
 * @param {!Element} element
 * @return {string}
 */
function getElementInnerHTML(element) {
  var descriptor = propertyDescriptors['innerHTML'];
  if (descriptor && descriptor.get) {
    return descriptor.get.apply(element);
  } else {
    return (typeof element.innerHTML == 'string') ? element.innerHTML : '';
  }
}

/**
 * Returns an element's style without falling prey to things like
 * <form><input name="style"></form>.
 * @param {!Element} element
 * @return {?CSSStyleDeclaration}
 */
function getElementStyle(element) {
  var styleDescriptor = propertyDescriptors['style'];
  if (element instanceof HTMLElement && styleDescriptor &&
      styleDescriptor.get) {
    return styleDescriptor.get.apply(element);
  } else {
    return element.style instanceof CSSStyleDeclaration ? element.style : null;
  }
}

/**
 * Get the children of a specific tag matching the provided tag name without
 * falling prey to things like <form><input name="getElementsByTagName"></form>.
 * Equivalent to {@code element.getElementsByTagName("foo")}.
 * @param {!Element} element
 * @param {string} name
 * @return {!Array<!Element>}
 */
function getElementsByTagName(element, name) {
  var descriptor = propertyDescriptors['getElementsByTagName'];
  if (descriptor && descriptor.value) {
    return Array.from(descriptor.value.call(element, name));
  } else {
    return (typeof element.getElementsByTagName == 'function') ?
        Array.from(element.getElementsByTagName(name)) :
        [];
  }
}

/**
 * Returns an element's style without falling prey to things like
 * <form><input name="style"></form>.
 * @param {!Element} element
 * @return {?CSSStyleSheet}
 */
function getElementStyleSheet(element) {
  var descriptor = propertyDescriptors['sheet'];
  if (element instanceof HTMLStyleElement && descriptor && descriptor.get) {
    return descriptor.get.apply(element);
  } else {
    return element.sheet instanceof CSSStyleSheet ? element.sheet : null;
  }
}

/**
 * Returns true if the element would be selected by the provided selector,
 * without falling prey to things like <form><input name="setAttribute"></form>.
 * Equivalent to {@code element.matches("foo")}.
 * @param {!Element} element
 * @param {string} selector
 * @return {boolean}
 */
function elementMatches(element, selector) {
  var descriptor = propertyDescriptors['matches'];
  if (descriptor && descriptor.value) {
    return descriptor.value.call(element, selector);
  } else {
    return false;
  }
}

/**
 * Asserts that a Node is an Element, without falling prey to things like
 * <form><input name="nodeType"></form>.
 * @param {!Node} node
 * @return {!Element}
 */
function assertNodeIsElement(node) {
  if (googAsserts.ENABLE_ASSERTS && !isNodeElement(node)) {
    googAsserts.fail(
        'Expected Node of type Element but got Node of type %s',
        getNodeType(node));
  }
  return /** @type {!Element} */ (node);
}

/**
 * Returns whether the node is an Element, without falling prey to things like
 * <form><input name="nodeType"></form>.
 * @param {!Node} node
 * @return {boolean}
 */
function isNodeElement(node) {
  return getNodeType(node) == NodeType.ELEMENT;
}

/**
 * Returns a node's nodeName without falling prey to things like
 * <form><input name="nodeName"></form>.
 * @param {!Node} node
 * @return {string}
 */
function getNodeName(node) {
  var nodeNameDescriptor = propertyDescriptors['nodeName'];
  if (nodeNameDescriptor && nodeNameDescriptor.get) {
    return nodeNameDescriptor.get.apply(node);
  } else {
    return (typeof node.nodeName == 'string') ? node.nodeName : 'unknown';
  }
}

/**
 * Returns a node's nodeType without falling prey to things like
 * `<form><input name="nodeType"></form>`.
 * @param {!Node} node
 * @return {number}
 */
function getNodeType(node) {
  var nodeTypeDescriptor = propertyDescriptors['nodeType'];
  if (nodeTypeDescriptor && nodeTypeDescriptor.get) {
    return nodeTypeDescriptor.get.apply(node);
  } else {
    return (typeof node.nodeType == 'number') ? node.nodeType : 0;
  }
}

/**
 * Returns a node's parentNode without falling prey to things like
 * <form><input name="parentNode"></form>.
 * @param {!Node} node
 * @return {?Node}
 */
function getParentNode(node) {
  var parentNodeDescriptor = propertyDescriptors['parentNode'];
  if (parentNodeDescriptor && parentNodeDescriptor.get) {
    return parentNodeDescriptor.get.apply(node);
  } else {
    // We need to ensure that parentNode is returning the actual parent node
    // and not a child node that happens to have a name of "parentNode".
    // We check that the node returned by parentNode is itself not named
    // "parentNode" - this could happen legitimately but on IE we have no better
    // means of avoiding the pitfall.
    var parentNode = node.parentNode;
    if (parentNode && parentNode.name && typeof parentNode.name == 'string' &&
        parentNode.name.toLowerCase() == 'parentnode') {
      return null;
    } else {
      return parentNode;
    }
  }
}

/**
 * Returns the value of node.childNodes without falling prey to things like
 * <form><input name="childNodes"></form>.
 * @param {!Node} node
 * @return {?NodeList}
 */
function getChildNodes(node) {
  var descriptor = propertyDescriptors['childNodes'];
  if (googDom.isElement(node) && descriptor && descriptor.get) {
    return descriptor.get.apply(node);
  } else {
    return node.childNodes instanceof NodeList ? node.childNodes : null;
  }
}

/**
 * Provides a way to get a CSS value without falling prey to things like
 * <form><input name="propertyValue"></form>.
 * @param {!CSSStyleDeclaration} cssStyle A CSS style object.
 * @param {string} propName A property name.
 * @param {boolean=} opt_allowClobbering If true, on IE8 and IE9 the
 *     method just tries to get the value using the clobber-vulnerable method.
 *     If false, it just returns null on those browsers, because there is no
 *     way to perform the operation in a clobber-safe manner.
 * @return {string} Value of the property as parsed by the browser.
 * @supported Works with IE8 and newer, but anti-clobbering functionality is
 *     only available with IE10 and newer.
 */
function getCssPropertyValue(cssStyle, propName, opt_allowClobbering) {
  var descriptor = propertyDescriptors['getPropertyValue'];
  if (descriptor && cssStyle.getPropertyValue) {
    // getPropertyValue on Safari can return null
    return descriptor.value.call(cssStyle, propName) || '';
  } else if (cssStyle.getAttribute && opt_allowClobbering) {
    // In IE8 and other older browers we make a direct call to getAttribute.
    return String(cssStyle.getAttribute(propName) || '');
  } else {
    // Unsupported, likely quite old, browser.
    return '';
  }
}

/**
 * Provides a way to set a CSS value without falling prey to things like
 * <form><input name="property"></form>.
 * @param {!CSSStyleDeclaration} cssStyle A CSS style object.
 * @param {string} propName A property name.
 * @param {?string} sanitizedValue Sanitized value of the property to be set
 *     on the CSS style object.
 * @param {boolean=} opt_allowClobbering If true, on IE8 and IE9 the
 *     method just tries to get the value using the clobber-vulnerable method.
 *     If false, it just returns null on those browsers, because there is no
 *     way to perform the operation in a clobber-safe manner.
 * @supported Works with IE8 and newer, but anti-clobbering functionality is
 *     only available with IE10 and newer.
 */
function setCssProperty(
    cssStyle, propName, sanitizedValue, opt_allowClobbering) {
  if (sanitizedValue) {
    var descriptor = propertyDescriptors['setProperty'];
    if (descriptor && cssStyle.setProperty) {
      descriptor.value.call(cssStyle, propName, sanitizedValue);
    } else if (cssStyle.setAttribute && opt_allowClobbering) {
      // In IE8 and other older browers we make a direct call to setAttribute.
      cssStyle.setAttribute(propName, sanitizedValue);
    }
  }
}

exports = {
  getElementAttributes: getElementAttributes,
  hasElementAttribute: hasElementAttribute,
  getElementAttribute: getElementAttribute,
  setElementAttribute: setElementAttribute,
  removeElementAttribute: removeElementAttribute,
  getElementInnerHTML: getElementInnerHTML,
  getElementStyle: getElementStyle,
  getElementsByTagName: getElementsByTagName,
  getElementStyleSheet: getElementStyleSheet,
  elementMatches: elementMatches,
  assertNodeIsElement: assertNodeIsElement,
  isNodeElement: isNodeElement,
  getNodeName: getNodeName,
  getNodeType: getNodeType,
  getParentNode: getParentNode,
  getChildNodes: getChildNodes,
  getCssPropertyValue: getCssPropertyValue,
  setCssProperty: setCssProperty
};
