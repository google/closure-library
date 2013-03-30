// Copyright 2013 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS-IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Various User-Agent strings.
 * See http://go/useragentexamples and http://www.useragentstring.com/ for
 * examples.
 *
 */

goog.provide('goog.labs.userAgent.testAgents');
goog.setTestOnly('goog.labs.userAgent.testAgents');

goog.scope(function() {
var testAgents = goog.labs.userAgent.testAgents;


/** @const {string} */
testAgents.ANDROID_BROWSER =
    'Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; ' +
    'HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) ' +
    'Version/4.0 Mobile Safari/533.1';


/** @const {string} */
testAgents.IE_8 =
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';


/** @const {string} */
testAgents.IE_8_COMPATIBILITY =
    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Trident/4.0)';


/** @const {string} */
testAgents.IE_9 =
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)';


/** @const {string} */
testAgents.FIREFOX_19 =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:19.0) ' +
    'Gecko/20100101 Firefox/19.0';


/** @const {string} */
testAgents.SAFARI_6 =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_1) ' +
    'AppleWebKit/536.25 (KHTML, like Gecko) ' +
    'Version/6.0 Safari/536.25';


/** @const {string} */
testAgents.OPERA_10 =
    'Opera/9.80 (S60; SymbOS; Opera Mobi/447; U; en) ' +
    'Presto/2.4.18 Version/10.00';


/** @const {string} */
testAgents.IPHONE_6 =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 ' +
    'like Mac OS X) AppleWebKit/536.26 ' +
    '(KHTML, like Gecko) Mobile/10A5376e';


/** @const {string} */
testAgents.IPAD_6 =
    'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) ' +
    'AppleWebKit/536.26 (KHTML, like Gecko) ' +
    'Version/6.0 Mobile/10A403 Safari/8536.25';


/** @const {string} */
testAgents.CHROME_25 =
    'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) ' +
    'AppleWebKit/535.8 (KHTML, like Gecko) ' +
    'Chrome/25.0.1000.10 Safari/535.8';


/** @const {string} */
testAgents.CHROME_ANDROID =
    'Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) ' +
    'AppleWebKit/535.7 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile ' +
    'Safari/535.7';


/** @const {string} */
testAgents.CHROME_IPHONE =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X; en-us) ' +
    'AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/22.0.1194.0 Mobile/11E53 ' +
    'Safari/7534.48.3';


/** @const {string} */
testAgents.CHROME_OS =
    'Mozilla/5.0 (X11; CrOS x86_64 3701.62.0) AppleWebKit/537.31 ' +
    '(KHTML, like Gecko) Chrome/26.0.1410.40 Safari/537.31';
});  // goog.scope
