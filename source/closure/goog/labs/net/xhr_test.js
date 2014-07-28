// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.labs.net.xhrTest');
goog.setTestOnly('goog.labs.net.xhrTest');

goog.require('goog.Promise');
goog.require('goog.labs.net.xhr');
goog.require('goog.net.XmlHttp');
goog.require('goog.string');
goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.MockClock');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

function setupStubXMLHttpRequest() {

  mockClock = new goog.testing.MockClock(true);

  var stubXhr = {
    sent: false,
    aborted: false,
    status: 0,
    headers: {},
    open: function(method, url, async) {
      this.method = method;
      this.url = url;
      this.async = async;
    },
    setRequestHeader: function(key, value) {
      this.headers[key] = value;
    },
    overrideMimeType: function(mimeType) {
      this.mimeType = mimeType;
    },
    abort: function() {
      this.aborted = true;
      this.load(0);
    },
    send: function(data) {
      this.data = data;
      this.sent = true;
    },
    load: function(status) {
      this.status = status;
      this.readyState = 4;
      if (this.onreadystatechange) this.onreadystatechange();
    }
  };

  goog.net.XmlHttp = function() {
    return stubXhr;
  };
  for (var x in originalXmlHttp) {
    goog.net.XmlHttp[x] = originalXmlHttp[x];
  }

  return stubXhr;
}


var xhr = goog.labs.net.xhr;
var originalXmlHttp = goog.net.XmlHttp;
var mockClock;

var testCase = new goog.testing.AsyncTestCase(document.title);
testCase.stepTimeout = 5 * 1000;

testCase.autoDiscoverTests();

testCase.tearDown = function() {
  if (mockClock) {
    mockClock.dispose();
    mockClock = null;
  }
  goog.net.XmlHttp = originalXmlHttp;
};

G_testRunner.initialize(testCase);

// Many tests don't work on the local file system due to cross-origin
// restrictions in Chrome without --allow-file-access-from-files.
// They will run on the farm or on a Closure Test server.
var shouldRunLocally = goog.userAgent.IE || goog.userAgent.GECKO ||
    goog.string.startsWith(document.location.href, 'file://');

function testSimpleRequest() {
  if (shouldRunLocally) return;

  testCase.waitForAsync('simpleRequest');
  xhr.send('GET', 'testdata/xhr_test_text.data').then(function(xhr) {
    assertEquals('Just some data.', xhr.responseText);
    assertEquals(200, xhr.status);
    testCase.continueTesting();
  }, fail /* opt_onRejected */);
}

function testGetText() {
  if (shouldRunLocally) return;

  testCase.waitForAsync('getText');
  xhr.get('testdata/xhr_test_text.data').then(function(responseText) {
    assertEquals('Just some data.', responseText);
    testCase.continueTesting();
  }, fail /* opt_onRejected */);
}

function testGetTextWithJson() {
  if (shouldRunLocally) return;

  testCase.waitForAsync('getTextWithJson');
  xhr.get('testdata/xhr_test_json.data').then(function(responseText) {
    assertEquals('while(1);\n{"stat":"ok","count":12345}\n', responseText);
    testCase.continueTesting();
  }, fail /* opt_onRejected */);
}

function testPostText() {
  if (shouldRunLocally) return;

  testCase.waitForAsync('postText');
  xhr.post('testdata/xhr_test_text.data', 'post-data').then(
      function(responseText) {
        // No good way to test post-data gets transported.
        assertEquals('Just some data.', responseText);
        testCase.continueTesting();
      }, fail /* opt_onRejected */);
}

function testGetJson() {
  if (shouldRunLocally) return;

  testCase.waitForAsync('getJson');
  xhr.getJson('testdata/xhr_test_json.data', {xssiPrefix: 'while(1);\n'}).then(
      function(responseObj) {
        assertEquals('ok', responseObj['stat']);
        assertEquals(12345, responseObj['count']);
        testCase.continueTesting();
      }, fail /* opt_onRejected */);
}

function testSerialRequests() {
  if (shouldRunLocally) return;

  xhr.get('testdata/xhr_test_text.data').
      then(function(response) {
        return xhr.getJson(
            'testdata/xhr_test_json.data', {xssiPrefix: 'while(1);\n'});
      }).then(function(responseObj) {
        // Data that comes through to callbacks should be from the 2nd request.
        assertEquals('ok', responseObj['stat']);
        assertEquals(12345, responseObj['count']);
        testCase.continueTesting();
      }, fail /* opt_onRejected */);
}

function testBadUrlDetectedAsError() {
  if (shouldRunLocally) return;

  testCase.waitForAsync('badUrl');
  xhr.getJson('unknown-file.dat').then(
      fail /* opt_onFulfilled */,
      function(err) {
        assertTrue(
            'Error should be an HTTP error', err instanceof xhr.HttpError);
        assertEquals(404, err.status);
        assertNotNull(err.xhr);
        testCase.continueTesting();
      });
}

function testBadOriginTriggersOnErrorHandler() {
  testCase.waitForAsync('badOrigin');
  xhr.get('http://www.google.com').then(
      fail /* opt_onFulfilled */,
      function(err) {
        // In IE this will be a goog.labs.net.xhr.Error since it is thrown
        //  when calling xhr.open(), other browsers will raise an HttpError.
        assertTrue('Error should be an xhr error', err instanceof xhr.Error);
        assertNotNull(err.xhr);
        testCase.continueTesting();
      });
}

function testAbortRequest() {
  if (shouldRunLocally) return;

  testCase.waitForAsync('abortRequest');
  var promise = xhr.send('GET', 'test-url', null).then(
      fail /* opt_onFulfilled */,
      function(error, result) {
        assertTrue(error instanceof goog.Promise.CancellationError);
        testCase.continueTesting();
      });
  promise.cancel();
}

//============================================================================
// The following tests are synchronous and use a stubbed out XMLHttpRequest.
//============================================================================

function testSendNoOptions() {
  var stubXhr = setupStubXMLHttpRequest();
  var called = false;
  xhr.send('GET', 'test-url', null).then(function(xhr) {
    called = true;
    assertEquals('Objects should be equal', xhr, stubXhr);
  }, fail /* opt_onRejected */);

  assertTrue('XHR should have been sent', stubXhr.sent);
  assertFalse('Callback should not yet have been called', called);

  stubXhr.load(200);
  mockClock.tick();

  assertTrue('Callback should have been called', called);
  assertEquals('GET', stubXhr.method);
  assertEquals('test-url', stubXhr.url);
}

function testSendPostSetsDefaultHeader() {
  var stubXhr = setupStubXMLHttpRequest();
  xhr.send('POST', 'test-url', null).
      then(undefined /* opt_onResolved */, fail /* opt_onRejected */);

  stubXhr.load(200);
  mockClock.tick();

  assertEquals('POST', stubXhr.method);
  assertEquals('test-url', stubXhr.url);
  assertEquals('application/x-www-form-urlencoded;charset=utf-8',
      stubXhr.headers['Content-Type']);
}

function testSendPostHeaders() {
  var stubXhr = setupStubXMLHttpRequest();
  xhr.send('POST', 'test-url', null, {
    headers: {'Content-Type': 'text/plain', 'X-Made-Up': 'FooBar'}
  }).then(undefined /* opt_onResolved */, fail /* opt_onRejected */);

  stubXhr.load(200);
  mockClock.tick();

  assertEquals('POST', stubXhr.method);
  assertEquals('test-url', stubXhr.url);
  assertEquals('text/plain', stubXhr.headers['Content-Type']);
  assertEquals('FooBar', stubXhr.headers['X-Made-Up']);
}

function testSendWithCredentials() {
  var stubXhr = setupStubXMLHttpRequest();
  xhr.send('POST', 'test-url', null, {withCredentials: true}).
      then(undefined /* opt_onResolved */, fail /* opt_onRejected */);

  stubXhr.load(200);
  mockClock.tick();

  assertTrue('XHR should have been sent', stubXhr.sent);
  assertTrue(stubXhr.withCredentials);
}

function testSendWithMimeType() {
  var stubXhr = setupStubXMLHttpRequest();
  xhr.send('POST', 'test-url', null, {mimeType: 'text/plain'}).
      then(undefined /* opt_onResolved */, fail /* opt_onRejected */);

  stubXhr.load(200);
  mockClock.tick();

  assertTrue('XHR should have been sent', stubXhr.sent);
  assertEquals('text/plain', stubXhr.mimeType);
}

function testSendWithHttpError() {
  var stubXhr = setupStubXMLHttpRequest();
  var err;
  xhr.send('POST', 'test-url', null).then(
      fail /* opt_onResolved */,
      function(error) { err = error; } /* opt_onRejected */);

  stubXhr.load(500);
  mockClock.tick();

  assertTrue('XHR should have been sent', stubXhr.sent);
  assertTrue(err instanceof xhr.HttpError);
  assertEquals(500, err.status);
}

function testSendWithTimeoutNotHit() {
  // TODO(user): This test fails in safari if it is run as part of a batch
  // but passes when run on its own.  Something strange is going on to do
  // with the references to window.clearTimeout inside onreadystatechange and
  // the mockclock overrides.
  if (goog.userAgent.SAFARI) return;

  var stubXhr = setupStubXMLHttpRequest();
  var err;
  xhr.send('POST', 'test-url', null, {timeoutMs: 1500}).
      then(undefined /* opt_onResolved */, fail /* opt_onRejected */);
  assertTrue(mockClock.getTimeoutsMade() > 0);
  mockClock.tick(1400);
  stubXhr.load(200);
  mockClock.tick(200);
  assertTrue('XHR should have been sent', stubXhr.sent);
  assertFalse('XHR should not have been aborted', stubXhr.aborted);
}

function testSendWithTimeoutHit() {
  var stubXhr = setupStubXMLHttpRequest();
  var err;
  xhr.send('POST', 'test-url', null, {timeoutMs: 50}).then(
      fail /* opt_onResolved */,
      function(error) { err = error; } /* opt_onRejected */);
  assertTrue(mockClock.getTimeoutsMade() > 0);
  mockClock.tick(50);
  assertTrue('XHR should have been sent', stubXhr.sent);
  assertTrue('XHR should have been aborted', stubXhr.aborted);
  assertTrue(err instanceof xhr.TimeoutError);
}

function testCancelRequest() {
  var stubXhr = setupStubXMLHttpRequest();
  var err;
  var promise = xhr.send('GET', 'test-url', null, {timeoutMs: 50}).then(
      fail /* opt_onResolved */,
      function(error) {
        err = error;
        if (error instanceof goog.Promise.CancellationError) {
          stubXhr.abort();
        }
      });
  promise.cancel();
  stubXhr.load(0);  // Call load anyway, shoudn't make a difference.
  mockClock.tick(100);  // Timeout should never be called.

  assertTrue('XHR should have been sent', stubXhr.sent);
  assertTrue('XHR should have been aborted', stubXhr.aborted);
  assertTrue(err instanceof goog.Promise.CancellationError);
}

function testGetJson() {
  var stubXhr = setupStubXMLHttpRequest();
  var responseData;
  xhr.getJson('test-url').then(function(responseObj) {
    responseData = responseObj;
  }, fail /* opt_onRejected */);

  stubXhr.responseText = '{"a": 1, "b": 2}';
  stubXhr.load(200);
  mockClock.tick();

  assertObjectEquals({a: 1, b: 2}, responseData);
}

function testGetJsonWithXssiPrefix() {
  var stubXhr = setupStubXMLHttpRequest();
  var responseData;
  xhr.getJson('test-url', {xssiPrefix: 'while(1);\n'}).then(
      function(responseObj) { responseData = responseObj; },
      fail /* opt_onRejected */);

  stubXhr.responseText = 'while(1);\n{"a": 1, "b": 2}';
  stubXhr.load(200);
  mockClock.tick();

  assertObjectEquals({a: 1, b: 2}, responseData);
}

function testSendWithClientException() {
  var stubXhr = setupStubXMLHttpRequest();
  stubXhr.send = function(data) {
    throw new Error('CORS XHR with file:// schemas not allowed.');
  };
  var err;
  xhr.send('POST', 'file://test-url', null).then(
      fail /* opt_onResolved */,
      function(error) { err = error; } /* opt_onRejected */);

  stubXhr.load(0);
  mockClock.tick();

  assertFalse('XHR should not have been sent', stubXhr.sent);
  assertTrue(err instanceof Error);
  assertTrue(
      /CORS XHR with file:\/\/ schemas not allowed./.test(err.message));
}
