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
 * @fileoverview Closure user agent detection.
 * @see <a href="http://www.useragentstring.com/">User agent strings</a>
 * For more information on browser brand, platform, or device see the other
 * sub-namespaces in goog.labs.userAgent(browser, platform, and device
 * respectively.)
 *
 */

goog.provide('goog.labs.userAgent.engine');

goog.require('goog.memoize');


/**
 * Returns the user agent string.
 *
 * @return {?string} The user agent string.
 */
goog.labs.userAgent.engine.getUserAgentString = goog.memoize(function() {
  return goog.global['navigator'] ? goog.global['navigator'].userAgent : null;
});


/**
 * @return {boolean} Whether the rendering engine is Presto.
 * @private
 */
goog.labs.userAgent.engine.matchPresto_ = function() {
  var ua = goog.labs.userAgent.engine.getUserAgentString();
  return ua.indexOf('Presto') >= 0;
};


/**
 * @private
 * @return {boolean} Whether the rendering engine is IE.
 */
goog.labs.userAgent.engine.matchIE_ = function() {
  var ua = goog.labs.userAgent.engine.getUserAgentString();
  return ua.indexOf('MSIE') >= 0;
};


/**
 * @private
 * @return {boolean} Whether the rendering engine is WebKit.
 */
goog.labs.userAgent.engine.matchWebKit_ = function() {
  var ua = goog.labs.userAgent.engine.getUserAgentString();
  return ua.indexOf('WebKit') >= 0;
};


/**
 * @private
 * @return {boolean} Whether the rendering engine is Gecko.
 */
goog.labs.userAgent.engine.matchGecko_ = function() {
  var ua = goog.labs.userAgent.engine.getUserAgentString();
  return ua.indexOf('Gecko') >= 0;
};


/**
 * @return {boolean} Whether the rendering engine is Presto.
 */
goog.labs.userAgent.engine.isPresto =
    goog.memoize(goog.labs.userAgent.engine.matchPresto_);


/**
 * @return {boolean} Whether the rendering engine is IE.
 */
goog.labs.userAgent.engine.isTrident =
    goog.memoize(goog.labs.userAgent.engine.matchIE_);


/**
 * @return {boolean} Whether the rendering engine is WebKit.
 */
goog.labs.userAgent.engine.isWebKit =
    goog.memoize(goog.labs.userAgent.engine.matchWebKit_);


/**
 * @return {boolean} Whether the rendering engine is Gecko.
 */
goog.labs.userAgent.engine.isGecko =
    goog.memoize(goog.labs.userAgent.engine.matchGecko_);


/**
 * @return {string} The rendering engine's version or empty string if version
 *     can't be determined.
 * @private
 */
goog.labs.userAgent.engine.getVersion_ = goog.memoize(function() {
  var engineRegex, engineVersion;
  if (goog.labs.userAgent.engine.isWebKit()) {
    engineRegex = /WebKit\/(\S+)/;
  } else if (goog.labs.userAgent.engine.isTrident()) {
    engineRegex = /Trident\/([^\);]+)(\)|;)/;
  } else if (goog.labs.userAgent.engine.isGecko()) {
    engineRegex = /rv\:([^\);]+)(\)|;)/;
  } else if (goog.labs.userAgent.engine.isPresto()) {
    engineRegex = /Presto\/(\S+)/;
  }

  if (engineRegex) {
    var arr = engineRegex.exec(goog.labs.userAgent.engine.getUserAgentString());
    engineVersion = arr ? arr[1] : '';
  }
  return engineVersion || '';
});


/**
 * @param {string|number} version The version to check.
 * @return {boolean} Whether the rendering engine version is higher or the same
 *     as the given version.
 */
goog.labs.userAgent.engine.isVersionOrHigher = function(version) {
  return goog.string.compareVersions(goog.labs.userAgent.engine.getVersion_(),
                                     version) >= 0;
};
