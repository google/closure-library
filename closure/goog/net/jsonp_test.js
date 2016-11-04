// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.net.JsonpTest');
goog.setTestOnly('goog.net.JsonpTest');

goog.require('goog.net.Jsonp');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');
goog.require('goog.userAgent');

// Global vars to facilitate a shared set up function.

var timeoutWasCalled;
var timeoutHandler;

var fakeUrl = 'http://fake-site.eek/';

var originalTimeout;
function setUp() {
  timeoutWasCalled = false;
  timeoutHandler = null;
  originalTimeout = window.setTimeout;
  window.setTimeout = function(handler, time) {
    timeoutWasCalled = true;
    timeoutHandler = handler;
  };
}

// Firefox throws a JS error when a script is not found.  We catch that here and
// ensure the test case doesn't fail because of it.
var originalOnError = window.onerror;
window.onerror = function(msg, url, line) {
  // TODO(user): Safari 3 on the farm returns an object instead of the typical
  // params.  Pass through errors for safari for now.
  if (goog.userAgent.WEBKIT ||
      msg == 'Error loading script' && url.indexOf('fake-site') != -1) {
    return true;
  } else {
    return originalOnError && originalOnError(msg, url, line);
  }
};

function tearDown() {
  window.setTimeout = originalTimeout;
}

// Quick function records the before-state of the DOM, and then return a
// a function to check that XDC isn't leaving stuff behind.
function newCleanupGuard() {
  var bodyChildCount = document.body.childNodes.length;

  return function() {
    // let any timeout queues finish before we check these:
    window.setTimeout(function() {
      var propCounter = 0;

      // All callbacks should have been deleted or be the null function.
      for (var key in goog.global) {
        // NOTES: callbacks are stored on goog.global with property
        // name prefixed with goog.net.Jsonp.CALLBACKS.
        if (key.indexOf(goog.net.Jsonp.CALLBACKS) == 0) {
          var callbackId = goog.net.Jsonp.getCallbackId_(key);
          if (goog.global[callbackId] &&
              goog.global[callbackId] != goog.nullFunction) {
            propCounter++;
          }
        }
      }

      assertEquals(
          'script cleanup', bodyChildCount, document.body.childNodes.length);
      assertEquals('window jsonp array empty', 0, propCounter);
    }, 0);
  }
}

function getScriptElement(result) {
  return result.deferred_.defaultScope_.script_;
}


// Check that send function is sane when things go well.
function testSend() {
  var replyReceived;
  var jsonp = new goog.net.Jsonp(fakeUrl);

  var checkCleanup = newCleanupGuard();

  var userCallback = function(data) { replyReceived = data; };

  var payload = {atisket: 'atasket', basket: 'yellow'};
  var result = jsonp.send(payload, userCallback);

  var script = getScriptElement(result);

  assertNotNull('script created', script);
  assertEquals('encoding is utf-8', 'UTF-8', script.charset);

  // Check that the URL matches our payload.
  assertTrue('payload in url', script.src.indexOf('basket=yellow') > -1);
  assertTrue('server url', script.src.indexOf(fakeUrl) == 0);

  // Now, we have to track down the name of the callback function, so we can
  // call that to simulate a returned request + verify that the callback
  // function does not break if it receives a second unexpected parameter.
  var callbackName = /callback=([^&]+)/.exec(script.src)[1];
  var callbackFunc = eval(callbackName);
  callbackFunc(
      {some: 'data', another: ['data', 'right', 'here']}, 'unexpected');
  assertEquals('input was received', 'right', replyReceived.another[1]);

  // Because the callbackFunc calls cleanUp_ and that calls setTimeout which
  // we have overwritten, we have to call the timeoutHandler to actually do
  // the cleaning.
  timeoutHandler();

  checkCleanup();
  timeoutHandler();
}


// Check that send function is sane when things go well.
function testSendWhenCallbackHasTwoParameters() {
  var replyReceived, replyReceived2;
  var jsonp = new goog.net.Jsonp(fakeUrl);

  var checkCleanup = newCleanupGuard();

  var userCallback = function(data, opt_data2) {
    replyReceived = data;
    replyReceived2 = opt_data2;
  };

  var payload = {atisket: 'atasket', basket: 'yellow'};
  var result = jsonp.send(payload, userCallback);
  var script = getScriptElement(result);

  // Test a callback function that receives two parameters.
  var callbackName = /callback=([^&]+)/.exec(script.src)[1];
  var callbackFunc = eval(callbackName);
  callbackFunc('param1', {some: 'data', another: ['data', 'right', 'here']});
  assertEquals('input was received', 'param1', replyReceived);
  assertEquals('second input was received', 'right', replyReceived2.another[1]);

  // Because the callbackFunc calls cleanUp_ and that calls setTimeout which
  // we have overwritten, we have to call the timeoutHandler to actually do
  // the cleaning.
  timeoutHandler();

  checkCleanup();
  timeoutHandler();
}

// Check that send function works correctly when callback param value is
// specified.
function testSendWithCallbackParamValue() {
  var replyReceived;
  var jsonp = new goog.net.Jsonp(fakeUrl);

  var checkCleanup = newCleanupGuard();

  var userCallback = function(data) { replyReceived = data; };

  var payload = {atisket: 'atasket', basket: 'yellow'};
  var result = jsonp.send(payload, userCallback, undefined, 'dummyId');

  var script = getScriptElement(result);

  assertNotNull('script created', script);
  assertEquals('encoding is utf-8', 'UTF-8', script.charset);

  // Check that the URL matches our payload.
  assertTrue('payload in url', script.src.indexOf('basket=yellow') > -1);
  assertTrue(
      'dummyId in url',
      script.src.indexOf(
          'callback=' + goog.net.Jsonp.getCallbackId_('dummyId')) > -1);
  assertTrue('server url', script.src.indexOf(fakeUrl) == 0);

  // Now, we simulate a returned request using the known callback function
  // name.
  var callbackFunc =
      eval('callback=' + goog.net.Jsonp.getCallbackId_('dummyId'));
  callbackFunc({some: 'data', another: ['data', 'right', 'here']});
  assertEquals('input was received', 'right', replyReceived.another[1]);

  // Because the callbackFunc calls cleanUp_ and that calls setTimeout which
  // we have overwritten, we have to call the timeoutHandler to actually do
  // the cleaning.
  timeoutHandler();

  checkCleanup();
  timeoutHandler();
}


// Check that the send function is sane when the thing goes south.
function testSendFailure() {
  var replyReceived = false;
  var errorReplyReceived = false;

  var jsonp = new goog.net.Jsonp(fakeUrl);

  var checkCleanup = newCleanupGuard();

  var userCallback = function(data) { replyReceived = data; };
  var userErrorCallback = function(data) { errorReplyReceived = data; };

  var payload = {justa: 'test'};

  jsonp.send(payload, userCallback, userErrorCallback);

  assertTrue('timeout called', timeoutWasCalled);

  // Now, simulate the time running out, so we go into error mode.
  // After jsonp.send(), the timeoutHandler now is the Jsonp.cleanUp_ function.
  timeoutHandler();
  // But that function also calls a setTimeout(), so it changes the timeout
  // handler once again, so to actually clean up we have to call the
  // timeoutHandler() once again. Fun!
  timeoutHandler();

  assertFalse('standard callback not called', replyReceived);

  // The user's error handler should be called back with the same payload
  // passed back to it.
  assertEquals('error handler called', 'test', errorReplyReceived.justa);

  // Check that the relevant cleanup has occurred.
  checkCleanup();
  // Check cleanup just calls setTimeout so we have to call the handler to
  // actually check that the cleanup worked.
  timeoutHandler();
}


// Check that a cancel call works and cleans up after itself.
function testCancel() {
  var checkCleanup = newCleanupGuard();

  var successCalled = false;
  var successCallback = function() { successCalled = true; };

  // Send and cancel a request, then make sure it was cleaned up.
  var jsonp = new goog.net.Jsonp(fakeUrl);
  var requestObject = jsonp.send({test: 'foo'}, successCallback);
  jsonp.cancel(requestObject);

  for (var key in goog.global[goog.net.Jsonp.CALLBACKS]) {
    // NOTES: callbacks are stored on goog.global with property
    // name prefixed with goog.net.Jsonp.CALLBACKS.
    if (key.indexOf('goog.net.Jsonp.CALLBACKS') == 0) {
      var callbackId = goog.net.Jsonp.getCallbackId_(key);
      assertNotEquals(
          'The success callback should have been removed',
          goog.global[callbackId], successCallback);
    }
  }

  // Make sure cancelling removes the script tag
  checkCleanup();
  timeoutHandler();
}

function testPayloadParameters() {
  var checkCleanup = newCleanupGuard();

  var jsonp = new goog.net.Jsonp(fakeUrl);
  var result = jsonp.send({'foo': 3, 'bar': 'baz'});

  var script = getScriptElement(result);
  assertEquals(
      'Payload parameters should have been added to url.',
      fakeUrl + '?foo=3&bar=baz', script.src);

  checkCleanup();
  timeoutHandler();
}

function testNonce() {
  var checkCleanup = newCleanupGuard();

  var jsonp = new goog.net.Jsonp(fakeUrl);
  jsonp.setNonce('foo');
  var result = jsonp.send();

  var script = getScriptElement(result);
  assertEquals(
      'Nonce attribute should have been added to script element.', 'foo',
      script.getAttribute('nonce'));

  checkCleanup();
  timeoutHandler();
}

function testOptionalPayload() {
  var checkCleanup = newCleanupGuard();

  var errorCallback = goog.testing.recordFunction();

  var stubs = new goog.testing.PropertyReplacer();
  stubs.set(
      goog.global, 'setTimeout', function(errorHandler) { errorHandler(); });

  var jsonp = new goog.net.Jsonp(fakeUrl);
  var result = jsonp.send(null, null, errorCallback);

  var script = getScriptElement(result);
  assertEquals(
      'Parameters should not have been added to url.', fakeUrl, script.src);

  // Clear the script hooks because we triggered the error manually.
  script.onload = goog.nullFunction;
  script.onerror = goog.nullFunction;
  script.onreadystatechange = goog.nullFunction;

  var errorCallbackArguments = errorCallback.getLastCall().getArguments();
  assertEquals(1, errorCallbackArguments.length);
  assertNull(errorCallbackArguments[0]);

  checkCleanup();
  stubs.reset();
}
