// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Copyright 2008 Google Inc. All Rights Reserved.

/**
 * @fileoverview MockUserAgent overrides goog.userAgent.getUserAgentString()
 *     depending on a specified configuration.
 *
 */

goog.provide('goog.testing.MockUserAgent');

goog.require('goog.Disposable');
goog.require('goog.userAgent');


/**
 * Class for unit testing code that uses goog.userAgent.
 *
 * @extends {goog.Disposable}
 * @constructor
 */
goog.testing.MockUserAgent = function() {
  goog.Disposable.call(this);

  /**
   * The userAgent string used by goog.userAgent.
   * @type {string}
   * @private
   */
  this.userAgent_ = goog.userAgent.getUserAgentString();

  /**
   * The original goog.userAgent.getUserAgentString function.
   * @type {Function}
   * @private
   */
  this.originalUserAgentFunction_ = goog.userAgent.getUserAgentString;
};
goog.inherits(goog.testing.MockUserAgent, goog.Disposable);


/**
 * Whether this MockUserAgent has been installed.
 * @type {boolean}
 * @private
 */
goog.testing.MockUserAgent.prototype.installed_;


/**
 * Installs this MockUserAgent.
 */
goog.testing.MockUserAgent.prototype.install = function() {
  if (!this.installed_) {
    goog.userAgent.getUserAgentString =
        goog.bind(this.getUserAgentString, this);
    this.installed_ = true;
  }
};


/**
 * @return {string} The userAgent set in this class.
 */
goog.testing.MockUserAgent.prototype.getUserAgentString = function() {
  return this.userAgent_;
};


/**
 * @param {string} userAgent The desired userAgent string to use.
 */
goog.testing.MockUserAgent.prototype.setUserAgentString = function(userAgent) {
  this.userAgent_ = userAgent;
};


/**
 * Uninstalls the MockUserAgent.
 */
goog.testing.MockUserAgent.prototype.uninstall = function() {
  if (this.installed_) {
    goog.userAgent.getUserAgentString = this.originalUserAgentFunction_;
    this.installed_ = false;
  }
};


/**
 * Disposes of the MockUserAgent.
 */
goog.testing.MockUserAgent.prototype.disposeInternal = function() {
  this.uninstall();
  delete this.userAgent_;
  delete this.originalUserAgentFunction_;
  goog.testing.MockUserAgent.superClass_.disposeInternal.call(this);
};
