// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview The SafeHtml type and its builders.
 *
 * TODO(user): Link to document stating type contract.
 */

goog.provide('goog.html.SafeHtml');

goog.require('goog.asserts');
goog.require('goog.i18n.bidi.DirectionalString');
goog.require('goog.string');
goog.require('goog.string.TypedString');



/**
 * A string that is safe to use in HTML context in DOM APIs and HTML documents.
 *
 * A SafeHtml is a string-like object that carries the security type contract
 * that its value as a string will not cause untrusted script execution when
 * evaluated as HTML in a browser.
 *
 * Values of this type are guaranteed to be safe to use in HTML contexts,
 * such as, assignment to the innerHTML DOM property, or interpolation into
 * a HTML template in HTML PC_DATA context, in the sense that the use will not
 * result in a Cross-Site-Scripting vulnerability.
 *
 * Instances of this type must be created via its factory methods
 * ({@code goog.html.SafeHtml.from}, {@code goog.html.SafeHtml.htmlEscape}, etc
 * and not by invoking its constructor.  The constructor intentionally takes no
 * parameters and the type is immutable; hence only a default instance
 * corresponding to the empty string can be obtained via constructor invocation.
 *
 * @see goog.html.SafeHtml#from
 * @see goog.html.SafeHtml#htmlEscape
 * @constructor
 * @final
 * @struct
 * @implements {goog.i18n.bidi.DirectionalString}
 * @implements {goog.string.TypedString}
 */
goog.html.SafeHtml = function() {
  /**
   * The contained value of this SafeHtml.  The field has a purposely ugly
   * name to make (non-compiled) code that attempts to directly access this
   * field stand out.
   * @private {string}
   */
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = '';

  /**
   * A type marker used to implement additional run-time type checking.
   * @see goog.string.SafeHtml#unwrap
   * @const
   * @private
   */
  this.SAFE_HTML_TYPE_MARKER__GOOG_HTML_SECURITY_PRIVATE_ =
      goog.html.SafeHtml.TYPE_MARKER__GOOG_HTML_SECURITY_PRIVATE_;

  /**
   * This SafeHtml's directionality, or null if unknown.
   * @private {?goog.i18n.bidi.Dir}
   */
  this.dir_ = null;
};


/**
 * @override
 * @const
 */
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = true;


/** @override */
goog.html.SafeHtml.prototype.getDirection = function() {
  return this.dir_;
};


/**
 * @override
 * @const
 */
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = true;


/**
 * Returns this SafeHtml's value a string.
 *
 * IMPORTANT: In code where it is security-relevant that an object's type is
 * indeed {@code SafeHtml}, use {@code goog.html.SafeHtml.unwrap} instead of
 * this method.
 *
 * @see goog.string.SafeHtml#unwrap
 * @override
 */
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
};


/**
 * Returns a debug string-representation of this value.
 *
 * To obtain the actual string value wrapped in a SafeHtml, use
 * {@code goog.html.SafeHtml.unwrap}.
 *
 * @see goog.string.SafeHtml#unwrap
 * @override
 */
goog.html.SafeHtml.prototype.toString = function() {
  return 'SafeHtml{' + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + '}';
};


/**
 * Performs a runtime check that the provided object is indeed a SafeHtml
 * object, and returns its value.
 * @param {!goog.html.SafeHtml} safeHtml The object to extract from.
 * @return {string} The SafeHtml object's contained string, unless the run-time
 *     type check fails. In that case, {@code unwrap} returns an innocuous
 *     string, or, if assertions are enabled, throws
 *     {@code goog.asserts.AssertionError}.
 */
goog.html.SafeHtml.unwrap = function(safeHtml) {
  // Perform additional run-time type-checking to ensure that safeHtml is indeed
  // an instance of the expected type.  This provides some additional protection
  // against security bugs due to application code that disables type checks.
  // Specifically, the following checks are performed:
  // 1. The object is an instance of the expected type.
  // 2. The object is not an instance of a subclass.
  // 3. The object carries a type marker for the expected type. "Faking" an
  // object requires a reference to the type marker, which has names intended
  // to stand out in code reviews.
  if (safeHtml instanceof goog.html.SafeHtml &&
      safeHtml.constructor === goog.html.SafeHtml &&
      safeHtml.SAFE_HTML_TYPE_MARKER__GOOG_HTML_SECURITY_PRIVATE_ ===
          goog.html.SafeHtml.TYPE_MARKER__GOOG_HTML_SECURITY_PRIVATE_) {
    return safeHtml.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
  } else {
    goog.asserts.fail('expected object of type SafeHtml, got \'' +
                      safeHtml + '\'');
    return 'type_error:SafeHtml';
  }
};


/**
 * Shorthand for union of types that can be sensibly converted to strings.
 * @private
 * @typedef {string|number|boolean|!goog.string.TypedString|
 *           !goog.i18n.bidi.DirectionalString}
 */
goog.html.StringLike_;


/**
 * Returns HTML-escaped text as a SafeHtml object.
 *
 * If text is of a type that implements
 * {@code goog.i18n.bidi.DirectionalString}, the directionality of the new
 * {@code SafeHtml} object is set to {@code text}'s directionality, if known.
 * Otherwise, the directionality of the resulting SafeHtml is unknown (i.e.,
 * {@code null}).
 *
 * @param {!goog.html.StringLike_} text The string to escape.
 * @return {!goog.html.SafeHtml} The escaped string, wrapped as a SafeHtml.
 */
goog.html.SafeHtml.htmlEscape = function(text) {
  var dir = null;
  if (text.implementsGoogI18nBidiDirectionalString) {
    dir = text.getDirection();
  }
  var textAsString;
  if (text.implementsGoogStringTypedString) {
    textAsString = text.getTypedStringValue();
  } else {
    textAsString = String(text);
  }
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse_(
      goog.string.htmlEscape(textAsString), dir);
};


/**
 * Coerces an arbitrary object into a SafeHtml object.
 *
 * If {@code textOrHtml} is already of type {@code goog.html.SafeHtml}, the same
 * object is returned. Otherwise, {@code textOrHtml} is coerced to string, and
 * HTML-escaped. If {@code textOrHtml} is of a type that implements
 * {@code goog.i18n.bidi.DirectionalString}, its directionality, if known, is
 * preserved.
 *
 * @param {!goog.html.StringLike_|!goog.html.SafeHtml} textOrHtml The text or
 *     SafeHtml to coerce.
 * @return {!goog.html.SafeHtml} The resulting SafeHtml object.
 */
goog.html.SafeHtml.from = function(textOrHtml) {
  if (textOrHtml instanceof goog.html.SafeHtml) {
    return textOrHtml;
  } else if (textOrHtml.implementsGoogI18nBidiDirectionalString) {
    // Do not coerce to string, to preserve directionality.
    return goog.html.SafeHtml.htmlEscape(textOrHtml);
  } else if (textOrHtml.implementsGoogStringTypedString) {
    return goog.html.SafeHtml.htmlEscape(textOrHtml.getTypedStringValue());
  } else {
    return goog.html.SafeHtml.htmlEscape(String(textOrHtml));
  }
};


/**
 * Type marker for the SafeHtml type, used to implement additional run-time
 * type checking.
 * @const
 * @private
 */
goog.html.SafeHtml.TYPE_MARKER__GOOG_HTML_SECURITY_PRIVATE_ = {};


/**
 * Utility method to create SafeHtml instances.
 *
 * This function is considered "package private", i.e. calls (using "suppress
 * visibility") from other files within this package are considered acceptable.
 * DO NOT call this function from outside the goog.html package; use appropriate
 * wrappers instead.
 *
 * @param {string} html The string to initialize the SafeHtml object with.
 * @param {?goog.i18n.bidi.Dir} dir The directionality of the SafeHtml to be
 *     constructed, or null if unknown.
 * @return {!goog.html.SafeHtml} The initialized SafeHtml object.
 * @private
 */
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse_ = function(
    html, dir) {
  var safeHtml = new goog.html.SafeHtml();
  safeHtml.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = html;
  safeHtml.dir_ = dir;
  return safeHtml;
};


/**
 * A SafeHtml instance corresponding to the empty string.
 * @const {!goog.html.SafeHtml}
 */
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.htmlEscape('');
