// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Utilities for adding, removing and setting ARIA roles
 * as defined by W3C ARIA Working Draft:
 *     http://www.w3.org/TR/2010/WD-wai-aria-20100916/
 * All modern browsers have some form of ARIA support, so no browser checks are
 * performed when adding ARIA to components.
 *
 */
goog.provide('goog.a11y.aria');

goog.require('goog.a11y.aria.State');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.object');


/**
 * ARIA states/properties prefix.
 * @private
 */
goog.a11y.aria.ARIA_PREFIX_ = 'aria-';


/**
 * Sets the role of an element.
 * @param {!Element} element DOM node to set role of.
 * @param {!goog.a11y.aria.Role|string} roleName role name(s).
 */
goog.a11y.aria.setRole = function(element, roleName) {
  element.setAttribute('role', roleName);
};


/**
 * Gets role of an element.
 * @param {!Element} element DOM node to get role of.
 * @return {!goog.a11y.aria.Role|string} rolename.
 */
goog.a11y.aria.getRole = function(element) {
  return /** @type {goog.a11y.aria.Role} */ (
      element.getAttribute('role')) || '';
};


/**
 * Sets the state or property of an element.
 * @param {!Element} element DOM node where we set state.
 * @param {!goog.a11y.aria.State|string} state State attribute being set.
 * Automatically adds prefix 'aria-' to the state name.
 * @param {string|boolean|number} value Value for the state attribute.
 */
goog.a11y.aria.setState = function(element, state, value) {
  element.setAttribute('aria-' + state, value);
};


/**
 * Remove the state or property for the element.
 * @param {!Element} element DOM node where we set state.
 * @param {!goog.a11y.aria.State} stateName State name.
 */
goog.a11y.aria.removeState = function(element, stateName) {
  element.removeAttribute(goog.a11y.aria.getAriaAttributeName_(stateName));
};


/**
 * Gets value of specified state or property.
 * @param {!Element} element DOM node to get state from.
 * @param {!goog.a11y.aria.State|string} stateName State name.
 * @return {string} Value of the state attribute.
 */
goog.a11y.aria.getState = function(element, stateName) {
  var attrb = /** @type {string|number|boolean} */ (
      element.getAttribute('aria-' + stateName));
  // Check for multiple representations -  attrb might
  // be a boolean or a string
  if ((attrb === true) || (attrb === false)) {
    return attrb ? 'true' : 'false';
  } else if (!attrb) {
    return '';
  } else {
    return String(attrb);
  }
};


/**
 * Gets the activedescendant of the given element.
 * @param {!Element} element DOM node to get activedescendant from.
 * @return {Element} DOM node of the activedescendant.
 */
goog.a11y.aria.getActiveDescendant = function(element) {
  var id = goog.a11y.aria.getState(
      element, goog.a11y.aria.State.ACTIVEDESCENDANT);
  return goog.dom.getOwnerDocument(element).getElementById(id);
};


/**
 * Sets the activedescendant value for an element.
 * @param {!Element} element DOM node to set activedescendant to.
 * @param {Element} activeElement DOM node being set as activedescendant.
 */
goog.a11y.aria.setActiveDescendant = function(element, activeElement) {
  goog.a11y.aria.setState(element, goog.a11y.aria.State.ACTIVEDESCENDANT,
      activeElement ? activeElement.id : '');
};


/**
 * Gets the label of the given element.
 * @param {!Element} element DOM node to get label from.
 * @return {string} label The label.
 */
goog.a11y.aria.getLabel = function(element) {
  return goog.a11y.aria.getState(element, goog.a11y.aria.State.LABEL);
};


/**
 * Adds the 'aria-' prefix to ariaName.
 * @param {string} ariaName ARIA state/property name.
 * @private
 * @return {string} The ARIA attribute name with added 'aria-' prefix.
 * @throws {Error} If no such attribute exists.
 */
goog.a11y.aria.getAriaAttributeName_ = function(ariaName) {
  if (goog.asserts.ENABLE_ASSERTS) {
    goog.asserts.assert(ariaName, 'ARIA attribute cannot be empty.');
    goog.asserts.assert(goog.object.containsValue(
        goog.a11y.aria.State, ariaName),
        'No such ARIA attribute ' + ariaName);
  }
  return goog.a11y.aria.ARIA_PREFIX_ + ariaName;
};


/**
 * Sets the label of the given element.
 * @param {!Element} element DOM node to set label to.
 * @param {string} label The label to set.
 */
goog.a11y.aria.setLabel = function(element, label) {
  goog.a11y.aria.setState(element, goog.a11y.aria.State.LABEL, label);
};

