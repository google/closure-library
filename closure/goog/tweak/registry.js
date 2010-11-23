// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Definition for goog.tweak.Registry.
 * Most clients should not use this class directly, but instead use the API
 * defined in tweak.js. One possible use case for directly using TweakRegistry
 * is to register tweaks that are not known at compile time.
 *
 * @author agrieve@google.com (Andrew Grieve)
 */

goog.provide('goog.tweak.Registry');

goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.object');
goog.require('goog.tweak.BaseEntry');
goog.require('goog.uri.utils');



/**
 * Singleton that manages all tweaks.
 * @param {string=} opt_queryParams Value of window.location.search.
 * @constructor
 */
goog.tweak.Registry = function(opt_queryParams) {
  /**
   * A map of entry.key -> entry object
   * @type {!Object.<!goog.tweak.BaseEntry>}
   * @private
   */
  this.entryMap_ = {};

  /**
   * The map of query params to use when initializing entry settings.
   * @type {!Object.<string>}
   * @private
   */
  this.parsedQueryParams_ =
      goog.tweak.Registry.parseQueryParams(opt_queryParams);

  /**
   * List of callbacks to call when a new entry is registered.
   * @type {!Array.<!Function>}
   * @private
   */
  this.onRegisterListeners_ = [];
};


/**
 * The logger for this class.
 * @type {!goog.debug.Logger}
 * @private
 */
goog.tweak.Registry.prototype.logger_ =
    goog.debug.Logger.getLogger('goog.tweak.Registry');


/**
 * Simple parser for query params. Makes all keys lower-case.
 * @param {string=} opt_queryParams The part of the url between the ? and the #.
 *     Uses window.location.search if not given.
 * @return {!Object.<string>} map of key->value.
 */
goog.tweak.Registry.parseQueryParams = function(opt_queryParams) {
  var queryParams = opt_queryParams || window.location.search;
  // Convert + to a space.
  queryParams = queryParams.replace(/\+/g, ' ');
  // Strip off the leading ? and split on &.
  queryParams = queryParams.substr(1).split('&');
  var ret = {};

  for (var i = 0, il = queryParams.length; i < il; ++i) {
    var entry = queryParams[i].split('=');
    if (entry[0]) {
      ret[decodeURIComponent(entry[0]).toLowerCase()] = entry[1] || '';
    }
  }
  return ret;
};


/**
 * Registers the given tweak setting/action.
 * @param {goog.tweak.BaseEntry} entry The entry.
 */
goog.tweak.Registry.prototype.register = function(entry) {
  var key = entry.getKey();
  var oldBaseEntry = this.entryMap_[key];
  if (oldBaseEntry) {
    if (oldBaseEntry == entry) {
      this.logger_.warning('Tweak entry registered twice: ' + key);
      return;
    }
    goog.asserts.fail(
        'Tweak entry registered twice and with different types: ' + key);
  }

  // Set its value from the query params.
  if (entry instanceof goog.tweak.BaseSetting) {
    if (entry.getParamName()) {
      entry.setInitialQueryParamValue(
          this.parsedQueryParams_[entry.getParamName()]);
    }
  }

  this.entryMap_[key] = entry;
  // Call all listeners.
  for (var i = 0, callback; callback = this.onRegisterListeners_[i]; ++i) {
    callback(entry);
  }
};


/**
 * Adds a callback to be called whenever a new tweak is added.
 * @param {!Function} func The callback.
 */
goog.tweak.Registry.prototype.addOnRegisterListener = function(func) {
  this.onRegisterListeners_.push(func);
};


/**
 * Returns the BaseEntry with the given key. Asserts if it does not exists.
 * @param {string} key The unique string that identifies this entry.
 * @return {!goog.tweak.BaseEntry} The entry.
 */
goog.tweak.Registry.prototype.getEntry = function(key) {
  key = key.toLowerCase();
  var ret = this.entryMap_[key];
  goog.asserts.assert(ret, 'Tweak not registered: ' + key);
  return /** @type {!goog.tweak.BaseEntry} */ (ret);
};


/**
 * Returns the boolean setting with the given key. Asserts if the key does not
 * refer to a registered entry or if it refers to one of the wrong type.
 * @param {string} key The unique string that identifies this entry.
 * @return {!goog.tweak.BooleanSetting} The entry.
 */
goog.tweak.Registry.prototype.getBooleanSetting = function(key) {
  var entry = this.getEntry(key);
  goog.asserts.assertInstanceof(entry, goog.tweak.BooleanSetting,
      'getBooleanSetting called on wrong type of BaseSetting');
  return /** @type {!goog.tweak.BooleanSetting} */ (entry);
};


/**
 * Returns the string setting with the given key. Asserts if the key does not
 * refer to a registered entry or if it refers to one of the wrong type.
 * @param {string} key The unique string that identifies this entry.
 * @return {!goog.tweak.StringSetting} The entry.
 */
goog.tweak.Registry.prototype.getStringSetting = function(key) {
  var entry = this.getEntry(key);
  goog.asserts.assertInstanceof(entry, goog.tweak.StringSetting,
      'getStringSetting called on wrong type of BaseSetting');
  return /** @type {!goog.tweak.StringSetting} */ (entry);
};


/**
 * Returns the numeric setting with the given key. Asserts if the key does not
 * refer to a registered entry or if it refers to one of the wrong type.
 * @param {string} key The unique string that identifies this entry.
 * @return {!goog.tweak.NumericSetting} The entry.
 */
goog.tweak.Registry.prototype.getNumericSetting = function(key) {
  var entry = this.getEntry(key);
  goog.asserts.assertInstanceof(entry, goog.tweak.NumericSetting,
      'getNumericSetting called on wrong type of BaseSetting');
  return /** @type {!goog.tweak.NumericSetting} */ (entry);
};


/**
 * Creates and returns an array of all BaseSetting objects with an associted
 * query parameter.
 * @param {boolean} excludeChildEntries Exclude BooleanInGroupSettings.
 * @param {boolean} excludeNonSettings Exclude entries that are not subclasses
 *     of BaseSetting.
 * @return {!Array.<!goog.tweak.BaseSetting>} The settings.
 */
goog.tweak.Registry.prototype.extractEntries =
    function(excludeChildEntries, excludeNonSettings) {
  var entries = [];
  for (var key in this.entryMap_) {
    var entry = this.entryMap_[key];
    if (entry instanceof goog.tweak.BaseSetting) {
      if (excludeChildEntries && !entry.getParamName()) {
        continue;
      }
    } else if (excludeNonSettings) {
      continue;
    }
    entries.push(entry);
  }
  return entries;
};


/**
 * Returns the query part of the URL that will apply all set tweaks.
 * @param {string=} opt_existingSearchStr The part of the url between the ? and
 *     the #. Uses window.location.search if not given.
 * @return {string} The query string.
 */
goog.tweak.Registry.prototype.makeUrlQuery =
    function(opt_existingSearchStr) {
  var existingParams = opt_existingSearchStr == undefined ?
      window.location.search : opt_existingSearchStr;

  var sortedEntries = this.extractEntries(true /* excludeChildEntries */,
                                          true /* excludeNonSettings */);
  // Sort the params so that the urlQuery has stable ordering.
  sortedEntries.sort(function(a, b) {
    return goog.array.defaultCompare(a.getParamName(), b.getParamName());
  });

  // Add all values that are not set to their defaults.
  var keysAndValues = [];
  for (var i = 0, entry; entry = sortedEntries[i]; ++i) {
    var encodedValue = entry.getEncodedValue();
    if (encodedValue != null) {
      keysAndValues.push(entry.getParamName(), encodedValue);
    }
    // Strip all tweak query params from the existing query string. This will
    // make the final query string contain only the tweak settings that are set
    // to their non-default values and also maintain non-tweak related query
    // parameters.
    existingParams = goog.uri.utils.removeParam(existingParams,
        encodeURIComponent(/** @type {string} */ (entry.getParamName())));
  }

  var tweakParams = goog.uri.utils.buildQueryData(keysAndValues);
  // Decode spaces and commas in order to make the URL more readable.
  tweakParams = tweakParams.replace(/%2C/g, ',').replace(/%20/g, '+');
  return !tweakParams ? existingParams :
      existingParams ? existingParams + '&' + tweakParams :
      '?' + tweakParams;
};

