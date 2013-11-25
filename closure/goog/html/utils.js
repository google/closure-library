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
 * @fileoverview HTML processing utilities for HTML in string form.
 */

goog.provide('goog.html.utils');

goog.require('goog.string');


/**
 * Extracts text from HTML.
 * Block-level elements such as div are surrounded with whitespace,
 * but inline elements are not. Span is treated as a block level element
 * because it is often used as a container.
 * Multiple break spaces are compressed and trimmed.
 *
 * @param {string} value The input HTML to have tags removed.
 * @return {string} A representation of value without tags, HTML comments, or
 *     other non-text content.
 */
goog.html.utils.stripHtmlTags = function(value) {
  // TODO(user): Make a version that extracts text attributes such as alt.
  return goog.string.trim(goog.string.unescapeEntities(
      value.replace(goog.html.utils.HTML_ATTRIBUTE_REGEX_, '>').
      replace(goog.html.utils.NO_SPACE_HTML_TAG_REGEX_, '').
      replace(goog.html.utils.HTML_TAG_REGEX_, ' ').
      replace(/[\n\t ]+/g, ' ')));
};


/**
 * Matches all attributes.
 *
 * @type {RegExp}
 * @private
 */
goog.html.utils.HTML_ATTRIBUTE_REGEX_ =
    /\s([^>'"]*=|"[^"]*"|'[^']*')*>/g;


/**
 * Matches all tags that do not require extra space.
 *
 * @type {RegExp}
 * @private
 */
goog.html.utils.NO_SPACE_HTML_TAG_REGEX_ =
    /<\/?((a[bcd][a-z0-9:\-]*)|b|(em)|i|(small)|(strong)|(su[bp])|u)>/gi;


/**
 * Matches all tags, HTML comments, and DOCTYPEs in tag soup HTML.
 * By removing these, and replacing any '<' or '>' characters with
 * entities we guarantee that the result can be embedded into a
 * an attribute without introducing a tag boundary.
 *
 * @type {RegExp}
 * @private
 */
goog.html.utils.HTML_TAG_REGEX_ =
    /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g;
