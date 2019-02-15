// Copyright 2015 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.net.FetchXmlHttpFactoryTest');
goog.setTestOnly('goog.net.FetchXmlHttpFactoryTest');

goog.require('goog.net.FetchXmlHttp');
goog.require('goog.net.FetchXmlHttpFactory');
goog.require('goog.testing.MockControl');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');
goog.require('goog.userAgent.product');
goog.require('goog.userAgent.product.isVersion');


/** @type {!goog.testing.MockControl} */
var mockControl;


/** @type {!goog.testing.FunctionMock} */
var fetchMock;


/** @type {!goog.net.FetchXmlHttpFactory} */
var factory;


/** @type {!WorkerGlobalScope} */
var worker;


/**
 * Whether the browser supports running this test.
 * @return {boolean}
 */
function shouldRunTests() {
  return goog.userAgent.product.CHROME && goog.userAgent.product.isVersion(43);
}

function setUp() {
  mockControl = new goog.testing.MockControl();
  worker = {};
  fetchMock = mockControl.createFunctionMock('fetch');
  worker.fetch = fetchMock;
  factory = new goog.net.FetchXmlHttpFactory(worker);
}


function tearDown() {
  mockControl.$tearDown();
}


/**
 * Verifies the open method.
 */
function testOpen() {
  mockControl.$replayAll();

  var xhr = factory.createInstance();
  assertEquals(0, xhr.status);
  assertEquals('', xhr.responseText);
  assertEquals(xhr.readyState, goog.net.FetchXmlHttp.RequestState.UNSENT);

  var onReadyStateChangeHandler = new goog.testing.recordFunction();
  xhr.onreadystatechange = onReadyStateChangeHandler;
  xhr.open('GET', 'https://www.google.com', true /* opt_async */);
  assertEquals(xhr.readyState, goog.net.FetchXmlHttp.RequestState.OPENED);
  onReadyStateChangeHandler.assertCallCount(1);

  mockControl.$verifyAll();
}


/**
 * Verifies the open method when the ready state is not unsent.
 */
function testOpen_notUnsent() {
  mockControl.$replayAll();

  var xhr = factory.createInstance();
  xhr.open('GET', 'https://www.google.com', true /* opt_async */);
  assertThrows(function() {
    xhr.open('GET', 'https://www.google.com', true /* opt_async */);
  });

  mockControl.$verifyAll();
}


/**
 * Verifies that synchronous fetches are not supported.
 */
function testOpen_notAsync() {
  mockControl.$replayAll();

  var xhr = factory.createInstance();

  assertThrows(function() {
    xhr.open('GET', 'https://www.google.com', false /* opt_async */);
  });

  mockControl.$verifyAll();
}


/**
 * Verifies the send method.
 * @return {!Promise<void>}
 */
function testSend() {
  fetchMock(new Request('https://www.google.com', {
    headers: new Headers(),
    method: 'GET'
  })).$returns(Promise.resolve(createSuccessResponse()));

  mockControl.$replayAll();
  return verifySend('GET');
}


/**
 * Verifies the send method with POST mode.
 * @return {!Promise<void>}
 */
function testSendPost() {
  fetchMock(new Request('https://www.google.com', {
    headers: new Headers(),
    method: 'POST'
  })).$returns(Promise.resolve(createSuccessResponse()));

  mockControl.$replayAll();
  return verifySend('POST');
}


/**
 * Verifies the send method including credentials.
 * @return {!Promise<void>}
 */
function testSend_includeCredentials() {
  factory = new goog.net.FetchXmlHttpFactory(worker);
  factory.setCredentialsMode(/** @type {RequestCredentials} */ ('include'));
  fetchMock(new Request('https://www.google.com', {
    headers: new Headers(),
    method: 'POST',
    credentials: 'include'
  })).$returns(Promise.resolve(createSuccessResponse()));

  mockControl.$replayAll();
  return verifySend('POST');
}


/**
 * Verifies the send method setting cache mode.
 * @return {!Promise<void>}
 */
function testSend_setCacheMode() {
  factory = new goog.net.FetchXmlHttpFactory(worker);
  factory.setCacheMode(/** @type {RequestCache} */ ('no-cache'));
  fetchMock(new Request('https://www.google.com', {
    headers: new Headers(),
    method: 'POST',
    cache: 'no-cache'
  })).$returns(Promise.resolve(createSuccessResponse()));

  mockControl.$replayAll();
  return verifySend('POST');
}


/**
 * Util function to verify send method.
 * @param {string} sendMethod
 * @param {number=} expectedStatusCode
 * @param {boolean=} isStream
 * @param {boolean=} isArrayBuffer
 * @return {!Promise<void>}
 */
function verifySend(
    sendMethod, expectedStatusCode = 200, isStream = false,
    isArrayBuffer = false) {
  return new Promise((resolve, reject) => {
    var xhr = factory.createInstance();
    var expectedBody = 'responseBody';
    if (isArrayBuffer) {
      xhr.responseType = 'arraybuffer';
    }
    xhr.open(sendMethod, 'https://www.google.com', true /* opt_async */);
    var lastState;
    var lastBufferSize = 0;
    var numberOfUpdates = 0;
    xhr.onreadystatechange = function() {
      if (xhr.readyState ===
          goog.net.FetchXmlHttp.RequestState.HEADER_RECEIVED) {
        lastState = xhr.readyState;
        var expectedHeaders =
            'dummyheader: dummyHeaderValue\r\ndummyheader2: dummyHeaderValue2';
        if (!isStream && !isArrayBuffer) {
          expectedHeaders =
              'content-type: text/plain;charset=UTF-8\r\n' + expectedHeaders;
        }
        assertEquals(0, xhr.status);
        assertEquals('', xhr.responseText);
        assertEquals('dummyHeaderValue', xhr.getResponseHeader('dummyHeader'));
        assertEquals(expectedHeaders, xhr.getAllResponseHeaders());
      } else if (
          xhr.readyState === goog.net.FetchXmlHttp.RequestState.LOADING) {
        lastState = xhr.readyState;
        assertEquals(0, xhr.status);
        assertEquals(0, expectedBody.indexOf(xhr.responseText));
        if (isStream && xhr.responseText) {
          assertTrue(xhr.responseText.length > lastBufferSize);
          lastBufferSize = xhr.responseText.length;
          numberOfUpdates++;
        }
      } else if (xhr.readyState === goog.net.FetchXmlHttp.RequestState.DONE) {
        assertEquals(goog.net.FetchXmlHttp.RequestState.LOADING, lastState);
        assertEquals(expectedStatusCode, xhr.status);
        if (isArrayBuffer) {
          assertTrue(xhr.response instanceof ArrayBuffer);
          assertEquals(8, xhr.response.byteLength);
        } else {
          assertEquals(expectedBody, xhr.responseText);
        }
        if (isStream) {
          assertEquals(expectedBody.length, numberOfUpdates);
        }
        resolve();
      } else {
        reject(new Error('Unexpected request state ' + xhr.readyState));
      }
    };
    xhr.send();
    assertEquals(xhr.readyState, goog.net.FetchXmlHttp.RequestState.OPENED);

    mockControl.$verifyAll();
  });
}


/**
 * Verifies the send method in case of error response.
 * @return {!Promise<void>}
 */
function testSend_error() {
  fetchMock(new Request('https://www.google.com', {
    headers: new Headers(),
    method: 'GET'
  })).$returns(Promise.resolve(createFailedResponse()));

  mockControl.$replayAll();

  return verifySend('GET', 500 /* expectedStatusCode */);
}


/**
 * Tests that streaming responses are properly handled.
 * @return {!Promise<void>}
 */
function testSend_streaming() {
  fetchMock(new Request('https://www.google.com', {
    headers: new Headers(),
    method: 'POST'
  })).$returns(Promise.resolve(createSuccessStreamingResponse()));

  mockControl.$replayAll();
  return verifySend('POST', 200 /* expectedStatusCode */, true /* isStream */);
}


/**
 * Verifies the send method in case of getting an ArrayBuffer response.
 * @return {!Promise<void>}
 */
function testSend_arrayBuffer() {
  fetchMock(new Request('https://www.google.com', {
    headers: new Headers(),
    method: 'POST'
  })).$returns(Promise.resolve(createArrayBufferResponse()));
  mockControl.$replayAll();
  return verifySend(
      'POST', 200 /* expectedStatusCode */, false /* isStream */,
      true /* isArrayBuffer */);
}


/**
 * Verifies the send method in case of failure to fetch the url.
 * @return {!Promise<void>}
 */
function testSend_failToFetch() {
  var failedPromise = new Promise(function() {
    throw new Error('failed to fetch');
  });
  fetchMock(new Request('https://www.google.com', {
    headers: new Headers(),
    method: 'GET'
  })).$returns(failedPromise);

  mockControl.$replayAll();
  return new Promise((resolve) => {
    var xhr = factory.createInstance();
    xhr.open('GET', 'https://www.google.com', true /* opt_async */);
    xhr.onreadystatechange = function() {
      assertEquals(xhr.readyState, goog.net.FetchXmlHttp.RequestState.DONE);
      assertEquals(0, xhr.status);
      assertEquals('', xhr.responseText);
      resolve();
    };
    xhr.send();
    assertEquals(xhr.readyState, goog.net.FetchXmlHttp.RequestState.OPENED);

    mockControl.$verifyAll();
  });
}


/**
 * Creates a successful response.
 * @return {!Response}
 */
function createSuccessResponse() {
  var headers = new Headers();
  headers.set('dummyHeader', 'dummyHeaderValue');
  headers.set('dummyHeader2', 'dummyHeaderValue2');
  return new Response(
      'responseBody' /* opt_body */, {status: 200, headers: headers});
}


/**
 * Creates a successful streaming response which returns each letter a separate
 * chunk with a 10ms delay between them.
 * @return {!Response}
 */
function createSuccessStreamingResponse() {
  const headers = new Headers();
  headers.set('dummyHeader', 'dummyHeaderValue');
  headers.set('dummyHeader2', 'dummyHeaderValue2');
  const bytes = new TextEncoder().encode('responseBody');
  const body = new ReadableStream({
    pull(controller) {
      for (let i = 0; i < bytes.length; i++) {
        controller.enqueue(bytes.slice(i, i + 1));
      }
      controller.close();
    }
  });
  return new Response(body, {status: 200, statusText: 'OK', headers: headers});
}


/**
 * Creates a successful response with an ArrayBuffer payload.
 * @return {!Response}
 */
function createArrayBufferResponse() {
  const headers = new Headers();
  headers.set('dummyHeader', 'dummyHeaderValue');
  headers.set('dummyHeader2', 'dummyHeaderValue2');
  return new Response(
      new ArrayBuffer(8), {status: 200, statusText: 'OK', headers: headers});
}


/**
 * Creates a successful response.
 * @return {!Response}
 */
function createFailedResponse() {
  var headers = new Headers();
  headers.set('dummyHeader', 'dummyHeaderValue');
  headers.set('dummyHeader2', 'dummyHeaderValue2');
  return new Response(
      'responseBody' /* opt_body */, {status: 500, headers: headers});
}
