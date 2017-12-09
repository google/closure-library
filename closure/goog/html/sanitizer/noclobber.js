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
var googArray = goog.require('goog.array');
var googAsserts = goog.require('goog.asserts');
var userAgent = goog.require('goog.userAgent');

/** @const {boolean} */
var hasPrototypes = !userAgent.IE || document.documentMode >= 10;

// Functions we use to avoid looking up the prototypes and the descriptors
// multiple times.
/** @const @enum {?Function} */
var Methods = {
  ATTRIBUTES_GETTER: hasPrototypes ?
      googAsserts.assert(
          (Object.getOwnPropertyDescriptor(Element.prototype, 'attributes') ||
           // Edge and IE define this Element property on Node instead of
           // Element.
           Object.getOwnPropertyDescriptor(Node.prototype, 'attributes'))
              .get) :
      null,
  HAS_ATTRIBUTE: hasPrototypes ? Element.prototype.hasAttribute : null,
  GET_ATTRIBUTE: hasPrototypes ? Element.prototype.getAttribute : null,
  SET_ATTRIBUTE: hasPrototypes ? Element.prototype.setAttribute : null,
  REMOVE_ATTRIBUTE: hasPrototypes ? Element.prototype.removeAttribute : null,
  INNER_HTML_GETTER: hasPrototypes ?
      googAsserts.assert(
          (Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML') ||
           // IE defines this Element property on HTMLElement.
           Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML'))
              .get) :
      null,
  GET_ELEMENTS_BY_TAG_NAME: hasPrototypes ?
      Element.prototype.getElementsByTagName :
      null,
  MATCHES: hasPrototypes ?
      (Element.prototype.matches || Element.prototype.msMatchesSelector) :
      null,
  NODE_NAME_GETTER: hasPrototypes ?
      googAsserts.assert(
          Object.getOwnPropertyDescriptor(Node.prototype, 'nodeName').get) :
      null,
  NODE_TYPE_GETTER: hasPrototypes ?
      googAsserts.assert(
          Object.getOwnPropertyDescriptor(Node.prototype, 'nodeType').get) :
      null,
  PARENT_NODE_GETTER: hasPrototypes ?
      googAsserts.assert(
          Object.getOwnPropertyDescriptor(Node.prototype, 'parentNode').get) :
      null,
  CHILD_NODES_GETTER: hasPrototypes ?
      googAsserts.assert(
          Object.getOwnPropertyDescriptor(Node.prototype, 'childNodes').get) :
      null,
  STYLE_GETTER: hasPrototypes ?
      googAsserts.assert(
          (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style') ||
           // Safari 10 defines the property on Element instead of
           // HTMLElement.
           Object.getOwnPropertyDescriptor(Element.prototype, 'style'))
              .get) :
      null,
  SHEET_GETTER: hasPrototypes ?
      googAsserts.assert(
          Object.getOwnPropertyDescriptor(HTMLStyleElement.prototype, 'sheet')
              .get) :
      null,
  GET_PROPERTY_VALUE: hasPrototypes ?
      CSSStyleDeclaration.prototype.getPropertyValue :
      null,
  SET_PROPERTY: hasPrototypes ? CSSStyleDeclaration.prototype.setProperty : null
};

/**
 * Calls the provided DOM prototype or property descriptor and returns its
 * result.
 * @param {?Function} fn
 * @param {*} object
 * @param {...*} var_args
 * @return {?}
 */
function genericNoClobberCall(fn, object, var_args) {
  if (fn) {
    return fn.apply(object, googArray.slice(arguments, 2));
  }
  throw new Error('Not supported');
}

/**
 * Returns an element's attributes without falling prey to things like
 * <form><input name="attributes"></form>. Equivalent to {@code
 * node.attributes}.
 * @param {!Element} element
 * @return {?NamedNodeMap}
 */
function getElementAttributes(element) {
  return genericNoClobberCall(Methods.ATTRIBUTES_GETTER, element);
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
  return genericNoClobberCall(Methods.HAS_ATTRIBUTE, element, attrName);
}

/**
 * Returns a specific attribute from an element without falling prey to
 * things like <form><input name="getAttribute"></form>.
 * Equivalent to {@code element.getAttribute("foo")}.
 * @param {!Element} element
 * @param {string} attrName
 * @return {?string}
 */
function getElementAttribute(element, attrName) {
  return genericNoClobberCall(Methods.GET_ATTRIBUTE, element, attrName);
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
  if (Methods.SET_ATTRIBUTE) {
    try {
      Methods.SET_ATTRIBUTE.call(element, name, value);
      return;
    } catch (e) {
      // IE throws an exception if the src attribute contains HTTP credentials.
      // However the attribute gets set anyway.
      if (e.message.indexOf('A security problem occurred') != -1) {
        return;
      }
      throw e;
    }
  }
  throw new Error('Not Supported.');
}

/**
 * Deletes a specific attribute from an element without falling prey to
 * things like <form><input name="removeAttribute"></form>.
 * Equivalent to {@code element.removeAttribute("foo")}.
 * @param {!Element} element
 * @param {string} attrName
 */
function removeElementAttribute(element, attrName) {
  genericNoClobberCall(Methods.REMOVE_ATTRIBUTE, element, attrName);
}

/**
 * Returns a node's innerHTML property value without falling prey to things like
 * <form><input name="innerHTML"></form>. Equivalent to {@code
 * element.innerHTML}.
 * @param {!Element} element
 * @return {string}
 */
function getElementInnerHTML(element) {
  return genericNoClobberCall(Methods.INNER_HTML_GETTER, element);
}

/**
 * Returns an element's style without falling prey to things like
 * <form><input name="style"></form>.
 * @param {!Element} element
 * @return {?CSSStyleDeclaration}
 */
function getElementStyle(element) {
  assertHTMLElement(element);
  return genericNoClobberCall(Methods.STYLE_GETTER, element);
}

/**
 * Asserts that the Element is an HTMLElement, or throws an exception.
 * @param {!Element} element
 */
function assertHTMLElement(element) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('Not an HTMLElement');
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
  return Array.from(
      genericNoClobberCall(Methods.GET_ELEMENTS_BY_TAG_NAME, element, name));
}

/**
 * Returns an element's style without falling prey to things like
 * <form><input name="style"></form>.
 * @param {!Element} element
 * @return {?CSSStyleSheet}
 */
function getElementStyleSheet(element) {
  assertHTMLElement(element);
  return genericNoClobberCall(Methods.SHEET_GETTER, element);
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
  return genericNoClobberCall(Methods.MATCHES, element, selector);
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
  return genericNoClobberCall(Methods.NODE_NAME_GETTER, node);
}

/**
 * Returns a node's nodeType without falling prey to things like
 * `<form><input name="nodeType"></form>`.
 * @param {!Node} node
 * @return {number}
 */
function getNodeType(node) {
  return genericNoClobberCall(Methods.NODE_TYPE_GETTER, node);
}

/**
 * Returns a node's parentNode without falling prey to things like
 * <form><input name="parentNode"></form>.
 * @param {!Node} node
 * @return {?Node}
 */
function getParentNode(node) {
  return genericNoClobberCall(Methods.PARENT_NODE_GETTER, node);
}

/**
 * Returns the value of node.childNodes without falling prey to things like
 * <form><input name="childNodes"></form>.
 * @param {!Node} node
 * @return {?NodeList}
 */
function getChildNodes(node) {
  return genericNoClobberCall(Methods.CHILD_NODES_GETTER, node);
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
  if (Methods.GET_PROPERTY_VALUE) {
    return Methods.GET_PROPERTY_VALUE.call(cssStyle, propName);
  } else if (opt_allowClobbering) {
    // In IE8 and IE9 we make a direct call to getAttribute.
    return String(cssStyle.getAttribute(propName) || '');
  }
  throw new Error('Not Supported.');
}

/**
 * Provides a way to set a CSS value without falling prey to things like
 * <form><input name="property"></form>.
 * @param {!CSSStyleDeclaration} cssStyle A CSS style object.
 * @param {string} propName A property name.
 * @param {string} sanitizedValue Sanitized value of the property to be set
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
  if (Methods.SET_PROPERTY) {
    Methods.SET_PROPERTY.call(cssStyle, propName, sanitizedValue);
    return;
  } else if (opt_allowClobbering) {
    // In IE8 and IE9 we make a direct call to setAttribute.
    cssStyle.setAttribute(propName, sanitizedValue);
    return;
  }
  throw new Error('Not Supported.');
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
