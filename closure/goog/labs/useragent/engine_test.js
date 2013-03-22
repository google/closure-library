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
 * @fileoverview Unit tests for goog.labs.userAgent.engine.
 */

goog.provide('goog.labs.userAgent.engineTest');

goog.require('goog.array');
goog.require('goog.labs.userAgent.engine');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');

goog.setTestOnly('goog.labs.userAgent.engineTest');

var propertyReplacer = new goog.testing.PropertyReplacer();

function setUp() {
  goog.memoize.clearCache(goog.labs.userAgent.engine);
}

function tearDown() {
  propertyReplacer.reset();
}

function testPresto() {
  var uaStrings = [
    'Opera/9.80 (Windows NT 6.1; U; es-ES) Presto/2.9.181 Version/12.00',
    'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168' +
        ' Version/11.52',
    'Opera/9.80 (X11; Linux i686; U; ru) Presto/2.8.131 Version/11.11'];

  uaCheckHelper(uaStrings, 'Presto', [['2.9', '2.9.1', '2.9.18'],
                  ['2.9.1', '2.9.168'], ['2.8', '2.8.13', '2.8.131']]);
}

function testTrident() {
  var uaStrings = [
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; ' +
        'Trident/4.0; SLCC2; Media Center PC 6.0; InfoPath.2; MS-RTC LM 8)',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)'];

  uaCheckHelper(uaStrings, 'Trident', [['6.0'], ['4.0'], ['5.0']]);
}

function testWebKit() {

  var uaStrings = [
    'Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40)' +
        'AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
    'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) ' +
        'AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.370.0 Safari/533.4',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.55.3 ' +
        '(KHTML, like Gecko) Version/5.1.3 Safari/534.53.10',
    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.15 ' +
        '(KHTML, like Gecko) Chrome/24.0.1295.0 Safari/537.15'];

  uaCheckHelper(uaStrings, 'WebKit', [['533', '533.1'], ['533.3', '533.4'],
                  ['534.5', '534.55.3'], ['537.1', '537.15']]);
}

function testGecko() {
  var uaStrings = [
    'Mozilla/5.0 (Windows NT 6.1; rv:15.0) Gecko/20120716 Firefox/15.0a2',
    'Mozilla/6.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011' +
        'Firefox/16.0.1',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:14.0) Gecko/20100101' +
        'Firefox/14.0.1'];

  uaCheckHelper(uaStrings, 'Gecko', [['15.0a2'], ['16.0', '16.0.1'], ['14.0']]);
}


// Helper functions


/**
 * Accepts a list of user agent strings, the engine for the given strings, and
 * a list of lists of version numbers corresponding to each user agent string in
 * order, and checks that the rendering engine and version number is detected
 * correctly for each string.
 *
 * @param {!Array.<string>} uaStrings A list of user agent strings.
 * @param {string} engine Name of the rendering engine.
 * @param {!Array.<!Array>} versions A list of list of versions corresponding to
 *     each user agent string.
 */
function uaCheckHelper(uaStrings, engine, versions) {
  goog.array.forEach(uaStrings, function(uaString, i) {
    goog.memoize.clearCache(goog.labs.userAgent.engine);

    setGlobalUAString(uaString);

    assertTrue(goog.labs.userAgent.engine['is' + engine]());
    goog.array.forEach(versions[i], function(version) {
      assertTrue(goog.labs.userAgent.engine.isVersionOrHigher(version));
    });
  });
}

function setGlobalUAString(uaString) {
  var mockGlobal = {
    'navigator': {
      'userAgent': uaString
    }
  };
  propertyReplacer.set(goog, 'global', mockGlobal);
}

function setOperaInGlobalScope() {
  goog.global['opera'] = {
    version: function() {
      return '9.20';
    }
  };
}

function clearOperaFromGlobalScope() {
  goog.global['opera'] = undefined;
}
