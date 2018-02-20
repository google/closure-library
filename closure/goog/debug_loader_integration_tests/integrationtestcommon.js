// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Common code for tests for debug loaders.
 */

goog.module('goog.debug.loader.integrationTestCommon');
goog.setTestOnly('goog.debug.loader.integrationTestCommon');

var GoogPromise = goog.require('goog.Promise');
/** @suppress {extraRequire} */
var jsunit = goog.require('goog.testing.jsunit');
var testSuite = goog.require('goog.testing.testSuite');


// These two constants limit the check for completion loop and preven it from
// running forever. Doesn't matter if they're a little longer than the jsunit
// timeout - just so long as they eventually halt.
var MAX_RETRIES = 15;
var MS_BETWEEN_RETRIES = 100;


/**
 * @param {!HTMLIFrameElement} iframe
 * @return {!function(): (!function(): !GoogPromise)}
 */
function checkCompletion(iframe) {
  return function() {
    return new GoogPromise(function(resolve, reject) {
      var window = iframe.contentWindow;
      var retryCount = 0;
      function doCheck() {
        if (window['LT_STATE'] == 'FAILED') {
          reject(window['LT_MSG']);
        } else if (window['LT_STATE'] == 'PASSED') {
          resolve();
        } else if (++retryCount >= MAX_RETRIES) {
          reject(new Error('Test timed out.'));
        } else {
          setTimeout(doCheck, MS_BETWEEN_RETRIES);
        }
      }
      doCheck();
    });
  };
}


/**
 * Creates the test sutie for this integration test.
 */
exports.createTestSuite = function() {
  var oldOnload = window.onload || function() {};
  window.onload = function() {
    oldOnload();
    oldOnload = null;

    var fn;
    try {
      var iframe = /** @type {!HTMLIFrameElement} */ (
          document.getElementById('testFrame'));
      fn = checkCompletion(iframe);
    } catch (error) {
      fn = function() {
        throw error;
      };
    }
    testSuite({'test': fn});
  };
};
