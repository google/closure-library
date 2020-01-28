/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Functions to list locale-specific font list and generic name.
 * Generic name used for a font family would be locale dependent. For example,
 * for 'zh'(Chinese) users, the name for Serif family would be in Chinese.
 * Further documentation at: http://go/genericfontnames.
 */

goog.provide('goog.locale.genericFontNames');


/**
 * This object maps (resourceName, localeName) to a resourceObj.
 * @type {Object}
 * @private
 */
goog.locale.genericFontNames.data_ = {};


/**
 * Normalizes the given locale id to standard form. eg: zh_Hant_TW.
 * Many a times, input locale would be like: zh-tw, zh-hant-tw.
 * @param {string} locale The locale id to be normalized.
 * @return {string} Normalized locale id.
 * @private
 */
goog.locale.genericFontNames.normalize_ = function(locale) {
  locale = locale.replace(/-/g, '_');
  locale =
      locale.replace(/_[a-z]{2}$/, function(str) { return str.toUpperCase(); });

  locale = locale.replace(/[a-z]{4}/, function(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  });
  return locale;
};


/**
 * Gets the list of fonts and their generic names for the given locale.
 * @param {string} locale The locale for which font lists and font family names
 *     to be produced. The expected locale id is as described in
 *     http://wiki/Main/IIISynonyms in all lowercase for easy matching.
 *     Smallest possible id is expected.
 *     Examples: 'zh', 'zh-tw', 'iw' instead of 'zh-CN', 'zh-Hant-TW', 'he'.
 * @return {Array<Object>} List of objects with generic name as 'caption' and
 *     corresponding font name lists as 'value' property.
 */
goog.locale.genericFontNames.getList = function(locale) {

  locale = goog.locale.genericFontNames.normalize_(locale);
  if (locale in goog.locale.genericFontNames.data_) {
    return goog.locale.genericFontNames.data_[locale];
  }
  return [];
};
