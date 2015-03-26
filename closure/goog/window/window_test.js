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

goog.provide('goog.windowTest');
goog.setTestOnly('goog.windowTest');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.functions');
goog.require('goog.labs.userAgent.browser');
goog.require('goog.labs.userAgent.engine');
goog.require('goog.labs.userAgent.platform');
goog.require('goog.string');
goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');
goog.require('goog.window');

var newWin;
var REDIRECT_URL_PREFIX = 'window_test.html?runTests=';
var asyncTestCase =
    goog.testing.AsyncTestCase.createAndInstall(document.title);
asyncTestCase.stepTimeout = 5000;

var WIN_LOAD_TRY_TIMEOUT = 100;
var MAX_WIN_LOAD_TRIES = 50; // 50x100ms = 5s waiting for window to load.

var stubs = new goog.testing.PropertyReplacer();

function setUpPage() {
  var anchors = goog.dom.getElementsByTagNameAndClass(
      goog.dom.TagName.DIV, 'goog-like-link');
  for (var i = 0; i < anchors.length; i++) {
    goog.events.listen(
        anchors[i], 'click',
        function(e) {
          goog.window.open(
              goog.dom.getTextContent(e.target), {'noreferrer': true});
        });
  }
}


// To test goog.window.open we open a new window with this file again. Once
// the new window gets to this point in the file it sets this variable to true,
// so that the test knows that the new window has been populated with
// properties like referrer and location.
var newWinLoaded = true;

function setUp() {
  newWin = undefined;
}

function tearDown() {
  if (newWin) {
    newWin.close();
  }
  stubs.reset();
}


/**
 * Uses setTimeout to keep checking if a new window has been loaded, and once
 * it has, calls the given continuation function and then calls
 * asyncTestCase.continueTesting() to resume the flow of the test.
 * @param {Function} continueFn Continuation function to be called when the
 *     new window has loaded.
 * @param {number=} opt_numTries Number of times this method has checked if
 *     the window has loaded, to prevent getting in an endless setTimeout
 *     loop. (Used internally, callers should omit.)
 */
function continueAfterWindowLoaded(continueFn, opt_numTries) {
  opt_numTries = opt_numTries || 0;
  if (!newWin) {
    fail('newWin not set, test forgot to set variable?');
  }
  if (newWin.newWinLoaded) {
    continueFn();
    asyncTestCase.continueTesting();
  } else if (opt_numTries > MAX_WIN_LOAD_TRIES) {
    fail('Window did not load after maximum number of checks.');
    asyncTestCase.continueTesting();
  } else {
    setTimeout(goog.partial(continueAfterWindowLoaded,
                            continueFn, ++opt_numTries),
               WIN_LOAD_TRY_TIMEOUT);
  }
}


/**
 * Helper to kick off a test that opens a window and checks that the referrer
 * is hidden if requested and the url is properly encoded/decoded.
 * @param {boolean} noreferrer Whether to test the noreferrer option.
 * @param {string} urlParam Url param to append to the url being opened.
 */
function doTestOpenWindow(noreferrer, urlParam) {
  newWin = goog.window.open(REDIRECT_URL_PREFIX + urlParam,
                            {'noreferrer': noreferrer});
  if (!newWin) {
    fail('Could not open new window. Check if popup blocker is enabled.');
  }
  asyncTestCase.waitForAsync('Waiting for window to open and load.');
  continueAfterWindowLoaded(
      goog.partial(continueTestOpenWindow, noreferrer, urlParam));
}


/**
 * Helper callback to do asserts after the window opens.
 * @param {boolean} noreferrer Whether the noreferrer option is being tested.
 * @param {string} urlParam Url param appended to the url being opened.
 */
function continueTestOpenWindow(noreferrer, urlParam) {
  if (noreferrer) {
    assertEquals('Referrer should have been stripped',
                 '', newWin.document.referrer);
  }

  var newWinUrl = decodeURI(newWin.location);
  var expectedUrlSuffix = decodeURI(urlParam);
  assertTrue('New window href should have ended with <' + expectedUrlSuffix +
      '> but was <' + newWinUrl + '>',
      goog.string.endsWith(newWinUrl, expectedUrlSuffix));
}


function testOpenNotEncoded() {
  // TODO(user): Fix. "Permission denied" on IE. Error only happens
  // sometimes, perhaps a race condition.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(false, 'bogus~');
}

function testOpenEncoded() {
  // TODO(user): Fix. "Permission denied" on IE 11.
  if (goog.labs.userAgent.browser.isIE() &&
      goog.labs.userAgent.browser.isVersionOrHigher(11)) {
    return;
  }

  doTestOpenWindow(false, 'bogus%7E');
}

function testOpenEncodedPercent() {
  // TODO(user): Fix. Results in bogus~ instead of bogus%7E on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  // Intent of url is to pass %7E to the server, so it was encoded to %257E .
  doTestOpenWindow(false, 'bogus%257E');
}

function testOpenNotEncodedHidingReferrer() {
  // TODO(user): Fix. "Permission denied" on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(true, 'bogus~');
}

function testOpenEncodedHidingReferrer() {
  // TODO(user): Fix. "Permission denied" on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(true, 'bogus%7E');
}

function testOpenEncodedPercentHidingReferrer() {
  // TODO(user): Fix. "Permission denied" on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  // Intent of url is to pass %7E to the server, so it was encoded to %257E .
  doTestOpenWindow(true, 'bogus%257E');
}

function testOpenSemicolon() {
  // TODO(user): Fix. "Permission denied" on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(true, 'beforesemi;aftersemi');
}

function testTwoSemicolons() {
  // TODO(user): Fix. "Permission denied" on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(true, 'a;b;c');
}

function testOpenAmpersand() {
  // TODO(user): Fix. "Permission denied" on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(true, 'this&that');
}

function testOpenSingleQuote() {
  // TODO(user): Fix. "Permission denied" on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(true, "'");
}

function testOpenDoubleQuote() {
  // TODO(user): Fix. "Permission denied" on IE. Also IE won't encode
  // " and Closure test server will fail with 400 when seeing it.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(true, '"');
}

function testOpenTag() {
  // TODO(user): Fix. "Permission denied" on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(true, '<');
}

function testCloseTag() {
  // TODO(user): Fix. "Permission denied" on IE.
  if (goog.labs.userAgent.browser.isIE()) {
    return;
  }

  doTestOpenWindow(true, '>');
}

function testOpenBlank() {
  newWin = goog.window.openBlank('Loading...');
  asyncTestCase.waitForAsync('Waiting for temp window to open and load.');
  var urlParam = 'bogus~';

  var continueFn = function() {
    newWin.location.href = REDIRECT_URL_PREFIX + urlParam;
    continueAfterWindowLoaded(
        goog.partial(continueTestOpenWindow, false, urlParam));
  };
  setTimeout(continueFn, 100);
}


function testOpenIosBlank() {
  if (!goog.labs.userAgent.engine.isWebKit() || !window.navigator) {
    // Don't even try this on IE8!
    return;
  }
  var attrs = {};
  var dispatchedEvent = null;
  var element = {
    setAttribute: function(name, value) {
      attrs[name] = value;
    },
    dispatchEvent: function(event) {
      dispatchedEvent = event;
    }
  };
  stubs.replace(window.document, 'createElement', function(name) {
    if (name == goog.dom.TagName.A) {
      return element;
    }
    return null;
  });
  stubs.set(window.navigator, 'standalone', true);
  stubs.replace(goog.labs.userAgent.platform, 'isIos', goog.functions.TRUE);

  var newWin = goog.window.open('http://google.com', {
    target: '_blank'
  });

  // This mode cannot return a new window.
  assertNotNull(newWin);
  assertUndefined(newWin.document);

  // Attributes.
  assertEquals('http://google.com', attrs['href']);
  assertEquals('_blank', attrs['target']);
  assertEquals('', attrs['rel'] || '');

  // Click event.
  assertNotNull(dispatchedEvent);
  assertEquals('click', dispatchedEvent.type);
}


function testOpenIosBlankNoreferrer() {
  if (!goog.labs.userAgent.engine.isWebKit() || !window.navigator) {
    // Don't even try this on IE8!
    return;
  }
  var attrs = {};
  var dispatchedEvent = null;
  var element = {
    setAttribute: function(name, value) {
      attrs[name] = value;
    },
    dispatchEvent: function(event) {
      dispatchedEvent = event;
    }
  };
  stubs.replace(window.document, 'createElement', function(name) {
    if (name == goog.dom.TagName.A) {
      return element;
    }
    return null;
  });
  stubs.set(window.navigator, 'standalone', true);
  stubs.replace(goog.labs.userAgent.platform, 'isIos', goog.functions.TRUE);

  var newWin = goog.window.open('http://google.com', {
    target: '_blank',
    noreferrer: true
  });

  // This mode cannot return a new window.
  assertNotNull(newWin);
  assertUndefined(newWin.document);

  // Attributes.
  assertEquals('http://google.com', attrs['href']);
  assertEquals('_blank', attrs['target']);
  assertEquals('noreferrer', attrs['rel']);

  // Click event.
  assertNotNull(dispatchedEvent);
  assertEquals('click', dispatchedEvent.type);
}
