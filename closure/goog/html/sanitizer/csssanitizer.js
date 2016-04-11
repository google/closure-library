// Copyright 2016 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview
 * JavaScript support for client-side CSS sanitization.
 *
 * @author danesh@google.com (Danesh Irani)
 * @author mikesamuel@gmail.com (Mike Samuel)
 */

goog.provide('goog.html.sanitizer.CssSanitizer');

goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string');


/**
 * The set of characters that need to be normalized inside url("...").
 * We normalize newlines because they are not allowed inside quoted strings,
 * normalize quote characters, angle-brackets, and asterisks because they
 * could be used to break out of the URL or introduce targets for CSS
 * error recovery.  We normalize parentheses since they delimit unquoted
 * URLs and calls and could be a target for error recovery.
 * @const @private {!RegExp}
 */
goog.html.sanitizer.CssSanitizer.NORM_URL_REGEXP_ = /[\n\f\r\"\'()*<>]/g;


/**
 * The replacements for NORM_URL_REGEXP.
 * @private @const {!Object<string, string>}
 */
goog.html.sanitizer.CssSanitizer.NORM_URL_REPLACEMENTS_ = {
  '\n': '%0a',
  '\f': '%0c',
  '\r': '%0d',
  '"': '%22',
  '\'': '%27',
  '(': '%28',
  ')': '%29',
  '*': '%2a',
  '<': '%3c',
  '>': '%3e'
};


/**
 * Normalizes a character for use in a url() directive.
 * @param {string} ch Character to be normalized.
 * @return {?string} Normalized character.
 * @private
 */
goog.html.sanitizer.CssSanitizer.normalizeUrlChar_ = function(ch) {
  return goog.html.sanitizer.CssSanitizer.NORM_URL_REPLACEMENTS_[ch] || null;
};


/**
 * Constructs a safe URI from a given uri and prop using a given uriRewriter
 * function.
 * @param {string} uri Uri to be sanitized.
 * @param {string} propName Property name which contained the Uri.
 * @param {?function(string, string):?string} uriRewriter A URI rewriter that
 *    returns an unwrapped goog.html.SafeUrl.
 * @return {?string} Safe Uri for use in CSS.
 * @private
 */
goog.html.sanitizer.CssSanitizer.getSafeUri_ = function(
    uri, propName, uriRewriter) {
  if (!uriRewriter) {
    return null;
  }
  var safeUri = uriRewriter(uri, propName);
  if (safeUri) {
    return 'url("' +
        safeUri.replace(
            goog.html.sanitizer.CssSanitizer.NORM_URL_REGEXP_,
            goog.html.sanitizer.CssSanitizer.normalizeUrlChar_) +
        '")';
  }
  return null;
};


/**
 * Allowed CSS functions
 * @const @private {!Array<string>}
 */
goog.html.sanitizer.CssSanitizer.ALLOWED_FUNCTIONS_ = [
  'rgb',
  'rgba',
  'alpha',
  'rect',
  'image',
  'linear-gradient',
  'radial-gradient',
  'repeating-linear-gradient',
  'repeating-radial-gradient',
  'cubic-bezier',
  'matrix',
  'perspective',
  'rotate',
  'rotate3d',
  'rotatex',
  'rotatey',
  'steps',
  'rotatez',
  'scale',
  'scale3d',
  'scalex',
  'scaley',
  'scalez',
  'skew',
  'skewx',
  'skewy',
  'translate',
  'translate3d',
  'translatex',
  'translatey',
  'translatez'
];


/**
 * Removes a vendor prefix from a property name.
 * @param {string} propName A property name.
 * @return {string} A property name without vendor prefixes.
 * @private
 */
goog.html.sanitizer.CssSanitizer.withoutVendorPrefix_ = function(propName) {
  // http://stackoverflow.com/a/5411098/20394 has a fairly extensive list
  // of vendor prefices. Blink has not declared a vendor prefix distinct from
  // -webkit- and http://css-tricks.com/tldr-on-vendor-prefix-drama/ discusses
  // how Mozilla recognizes some -webkit- prefixes.
  // http://wiki.csswg.org/spec/vendor-prefixes talks more about
  // cross-implementation, and lists other prefixes.
  return propName.replace(
      /^-(?:apple|css|epub|khtml|moz|mso?|o|rim|wap|webkit|xv)-(?=[a-z])/i, '');
};


/**
 * Given a browser-parsed CSS value sanitizes the value.
 * @param {string} propName A property name.
 * @param {string} propValue Value of the property as parsed by the browser.
 * @param {function(string, string)=} opt_uriRewriter A URI rewriter that
 *    returns an unwrapped goog.html.SafeUrl.
 * @return {?string} Sanitized property value or null.
 * @private
 */
goog.html.sanitizer.CssSanitizer.sanitizeProperty_ = function(
    propName, propValue, opt_uriRewriter) {
  var propertyValue = goog.string.trim(propValue).toLowerCase();
  if (propertyValue === '') {
    return null;
  }

  if (goog.string.startsWith(propertyValue, 'url(')) {
    // Handle url("...") by rewriting the body.
    if (opt_uriRewriter) {
      // Preserve original case
      propertyValue = goog.string.trim(propValue);
      // TODO(danesh): Check if we need to resolve this Uri.
      var uri = goog.string.stripQuotes(
          propertyValue.substring(4, propertyValue.length - 1), '"\'');

      propertyValue = goog.html.sanitizer.CssSanitizer.getSafeUri_(
          uri, propName, opt_uriRewriter);
    } else {
      propertyValue = null;
    }
  } else if (propertyValue.indexOf('(') > 0) {
    if (goog.string.countOf(propertyValue, '(') > 1 ||
        !(goog.array.contains(
              goog.html.sanitizer.CssSanitizer.ALLOWED_FUNCTIONS_,
              propertyValue.substring(0, propertyValue.indexOf('('))) &&
          goog.string.endsWith(propertyValue, ')'))) {
      // Functions start at a token like "name(" and end with a ")" taking
      // into account nesting.
      // TODO(danesh): Handle functions that may need recursing or that may
      // appear in the middle of a string. For now, just allow functions which
      // aren't nested.
      propertyValue = null;
    }
  }
  return propertyValue;
};


/**
 * Sanitizes an inline style attribute. Short-hand attributes are expanded to
 * their individual elements. Note: The sanitizer does not output vendor
 * prefixed styles.
 * @param {?CSSStyleDeclaration} cssStyle A CSS style object.
 * @param {function(string, string)=} opt_uriRewriter A URI rewriter that
 *    returns an unwrapped goog.html.SafeUrl.
 * @return {?string} A sanitized inline cssText.
 * @package
 */
goog.html.sanitizer.CssSanitizer.sanitizeInlineStyle = function(
    cssStyle, opt_uriRewriter) {
  if (!cssStyle) {
    return null;
  }

  var cleanCssStyle = document.createElement('div').style;
  var cssPropNames =
      goog.html.sanitizer.CssSanitizer.getCssPropNames_(cssStyle);

  for (var i = 0; i < cssPropNames.length; i++) {
    var propName =
        goog.html.sanitizer.CssSanitizer.withoutVendorPrefix_(cssPropNames[i]);
    if (!goog.html.sanitizer.CssSanitizer.isDisallowedPropertyName_(propName)) {
      var propValue =
          goog.html.sanitizer.CssSanitizer.getCssValue_(cssStyle, propName);

      var sanitizedValue = goog.html.sanitizer.CssSanitizer.sanitizeProperty_(
          propName, propValue, opt_uriRewriter);
      goog.html.sanitizer.CssSanitizer.setCssValue_(
          cleanCssStyle, propName, sanitizedValue);
    }
  }
  return cleanCssStyle.cssText || null;
};


/**
 * Provides a cross-browser way to get a CSS property names.
 * @param {!CSSStyleDeclaration} cssStyle A CSS style object.
 * @return {!Array<string>} CSS property names.
 * @private
 */
goog.html.sanitizer.CssSanitizer.getCssPropNames_ = function(cssStyle) {
  var propNames = [];
  if (goog.isArrayLike(cssStyle)) {
    // Gets property names via item().
    // https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-item
    propNames = Array.prototype.slice.call(cssStyle);
  } else {
    // In IE8 and other older browers we have to iterate over all the property
    // names.
    propNames = goog.object.getKeys(cssStyle);
  }
  return propNames;
};


/**
 * Provides a way to get a CSS value without falling prey to things like
 * &lt;form&gt;&lt;input name="propertyValue"&gt;
 * &lt;input name="propertyValue"&gt;&lt;/form&gt;. If not available,
 * likely only older browsers, fallback to a direct call.
 * @param {!CSSStyleDeclaration} cssStyle A CSS style object.
 * @param {string} propName A property name.
 * @return {string} Value of the property as parsed by the browser.
 * @private
 */
goog.html.sanitizer.CssSanitizer.getCssValue_ = function(cssStyle, propName) {
  var getPropDescriptor = Object.getOwnPropertyDescriptor(
      CSSStyleDeclaration.prototype, 'getPropertyValue');
  if (getPropDescriptor && cssStyle.getPropertyValue) {
    return getPropDescriptor.value.call(cssStyle, propName);
  } else if (cssStyle.getAttribute) {
    // In IE8 and other older browers we make a direct call to getAttribute.
    return String(cssStyle.getAttribute(propName));
  } else {
    // Unsupported, likely quite old, browser.
    return '';
  }
};


/**
 * Provides a way to set a CSS value without falling prey to things like
 * &lt;form&gt;&lt;input name="property"&gt;
 * &lt;input name="property"&gt;&lt;/form&gt;. If not available,
 * likely only older browsers, fallback to a direct call.
 * @param {!CSSStyleDeclaration} cssStyle A CSS style object.
 * @param {string} propName A property name.
 * @param {?string} sanitizedValue Sanitized value of the property to be set
 *     on the CSS style object.
 * @private
 */
goog.html.sanitizer.CssSanitizer.setCssValue_ = function(
    cssStyle, propName, sanitizedValue) {
  if (sanitizedValue) {
    var setPropDescriptor = Object.getOwnPropertyDescriptor(
        CSSStyleDeclaration.prototype, 'setProperty');
    if (setPropDescriptor && cssStyle.setProperty) {
      setPropDescriptor.value.call(cssStyle, propName, sanitizedValue);
    } else if (cssStyle.setAttribute) {
      // In IE8 and other older browers we make a direct call to setAttribute.
      cssStyle.setAttribute(propName, sanitizedValue);
    }
  }
};


/**
 * Checks whether the property name specified should be disallowed.
 * @param {string} propName A property name.
 * @return {boolean} Whether the property name is disallowed.
 * @private
 */
goog.html.sanitizer.CssSanitizer.isDisallowedPropertyName_ = function(
    propName) {
  // getPropertyValue doesn't deal with custom variables properly and will NOT
  // decode CSS escapes (but the browser will do so silently). Simply disallow
  // custom variables (http://www.w3.org/TR/css-variables/#defining-variables).
  return goog.string.startsWith(propName, '--') ||
      goog.string.startsWith(propName, 'var');
};
