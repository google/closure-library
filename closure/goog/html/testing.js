
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
 * @fileoverview Utilities to create arbitrary values of goog.html types for
 * testing purposes. These utility methods perform no validation, and the
 * resulting instances may violate type contracts.
 *
 * These methods are useful when types are constructed in a manner where using
 * the production API is too inconvenient. Please do use the production API
 * whenever possible; there is value in having tests reflect common usage and it
 * avoids, by design, non-contract complying instances from being created.
 */


goog.provide('goog.html.testing');
goog.setTestOnly();

goog.require('goog.html.SafeHtml');
goog.require('goog.html.SafeUrl');
goog.require('goog.string.Const');


/**
 * Creates a SafeHtml wrapping the given value. No validation is performed.
 *
 * This function is for use in tests only and must never be used in production
 * code.
 *
 * @param {string} html The string to wrap into a SafeHtml.
 * @param {?goog.i18n.bidi.Dir=} opt_dir The optional directionality of the
 *     SafeHtml to be constructed. A null or undefined value signifies an
 *     unknown directionality.
 * @return {!goog.html.SafeHtml}
 */
goog.html.testing.newSafeHtmlForTest = function(html, opt_dir) {
  return goog.html.SafeHtml.potentiallyDangerousUncheckedConversionFromString(
      goog.string.Const.from('This function is TestOnly restricted, ' +
                             'and hence can\'t result in security bugs. ' +
                             'Security review: b/7685625.'),
      html, opt_dir);
};


/**
 * Creates a SafeUrl wrapping the given value. No validation is performed.
 *
 * This function is for use in tests only and must never be used in production
 * code.
 *
 * @param {string} url String to wrap into a SafeUrl.
 * @return {!goog.html.SafeUrl}
 */
goog.html.testing.newSafeUrlForTest = function(url) {
  return goog.html.SafeUrl.potentiallyDangerousUncheckedConversionFromString(
      goog.string.Const.from('This function is TestOnly restricted, ' +
                             'and hence can\'t result in security bugs.' +
                             'Security review: b/7685625.'),
      url);
};
