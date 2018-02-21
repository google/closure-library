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
 * @fileoverview Common code for all loader integration tests. Allows tests to
 * asynchronously finish via a done method and defines some basic assertion
 * methods. This way is done rather than pull in and use jsunit in these tests
 * so that these tests are *only* loading what they're testing, since these
 * tests are all about loading.
 */

// "Loader Test State"
window['LT_STATE'] = 'INIT';

// No need to pull in the Closure deps file. Helps speed things up.
var CLOSURE_NO_DEPS = true;

/**
 * Override to require multiple calls to done in a single test be required to
 * finish the test.
 */
var NUM_TESTS = 1;

var numTestsDone = 0;


/**
 * @param {string|Event} messageOrEvent
 * @param {string} url
 * @param {number} line
 * @param {number} colno
 * @param {!Error} error
 */
window.onerror = function(messageOrEvent, url, line, colno, error) {
  window['LT_STATE'] = 'FAILED';
  var message = maybeGetStack(error);
  if (!message) {
    var colstr = colno != null ? '\nColumn: ' + colno : '';
    message = 'JS ERROR: ' + messageOrEvent + '\nURL: ' + url +
        '\nLine: ' + line + colstr;
  }
  window['LT_MSG'] = message;
};


/**
 * @param {!Error} error
 * @return {string}
 */
function maybeGetStack(error) {
  if (typeof error == 'object') {
    var stack = error.stack;
    if (stack && typeof stack == 'string') {
      return stack;
    }
  }
  return '';
}


/**
 * Alerts the basic test infrastructure that the test has finished successfully.
 */
function done() {
  if (++numTestsDone == NUM_TESTS && window['LT_STATE'] == 'INIT') {
    window['LT_STATE'] = 'PASSED';
  }
}


/**
 * @param {boolean} actual
 */
function assertTrue(actual) {
  assertEquals(true, actual);
}


/**
 * @param {boolean} actual
 */
function assertFalse(actual) {
  assertEquals(false, actual);
}


/**
 * @param {?} actual
 */
function assertNull(actual) {
  assertEquals(null, actual);
}


/**
 * @param {?} actual
 */
function assertNotNull(actual) {
  if (null === actual) {
    throw new Error('Assertion failed. Expected value to not be null.');
  }
}


/**
 * @param {?} expected
 * @param {?} actual
 */
function assertEquals(expected, actual) {
  if (expected !== actual) {
    throw new Error(
        'Assertion failed. Expected ' + expected + ' but was ' + actual);
  }
}
