// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Soy data primitives.
 *
 * The goal is to encompass data types used by Soy, especially to mark content
 * as known to be "safe".
 *
 * @author gboyer@google.com (Garrett Boyer)
 */

goog.provide('goog.soy.data');
goog.provide('goog.soy.data.SanitizedContentKind');


/**
 * A type of textual content.
 *
 * This is an enum of type Object so that these values are unforgeable.
 *
 * @enum {!Object}
 */
goog.soy.data.SanitizedContentKind = {

  /**
   * A snippet of HTML that does not start or end inside a tag, comment, entity,
   * or DOCTYPE; and that does not contain any executable code
   * (JS, {@code <object>}s, etc.) from a different trust domain.
   */
  HTML: goog.DEBUG ? {sanitizedContentKindHtml: true} : {},

  /**
   * A sequence of code units that can appear between quotes (either kind) in a
   * JS program without causing a parse error, and without causing any side
   * effects.
   * <p>
   * The content should not contain unescaped quotes, newlines, or anything else
   * that would cause parsing to fail or to cause a JS parser to finish the
   * string its parsing inside the content.
   * <p>
   * The content must also not end inside an escape sequence ; no partial octal
   * escape sequences or odd number of '{@code \}'s at the end.
   */
  JS_STR_CHARS: goog.DEBUG ? {sanitizedContentJsStrChars: true} : {},

  /** A properly encoded portion of a URI. */
  URI: goog.DEBUG ? {sanitizedContentUri: true} : {},

  /** An attribute name and value such as {@code dir="ltr"}. */
  HTML_ATTRIBUTE: goog.DEBUG ? {sanitizedContentHtmlAttribute: true} : {},

  // TODO: Consider separating rules, declarations, and values into
  // separate types, but for simplicity, we'll treat explicitly blessed
  // SanitizedContent as allowed in all of these contexts.
  /**
   * A CSS3 declaration, property, value or group of semicolon separated
   * declarations.
   */
  CSS: goog.DEBUG ? {sanitizedContentCss: true} : {},

  /**
   * Unsanitized plain-text content.
   *
   * This is effectively the "null" entry of this enum, and is sometimes used
   * to explicitly mark content that should never be used unescaped. Since any
   * string is safe to use as text, being of ContentKind.TEXT makes no
   * guarantees about its safety in any other context such as HTML.
   */
  TEXT: goog.DEBUG ? {sanitizedContentKindText: true} : {}
};
