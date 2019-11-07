// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.net.IframeIoTest');
goog.setTestOnly('goog.net.IframeIoTest');

const DivConsole = goog.require('goog.debug.DivConsole');
const Event = goog.require('goog.testing.events.Event');
const EventType = goog.require('goog.events.EventType');
const IframeIo = goog.require('goog.net.IframeIo');
const Level = goog.require('goog.log.Level');
const LogManager = goog.require('goog.debug.LogManager');
const TEST_ONLY = goog.require('goog.net.IframeIo.TEST_ONLY');
const TagName = goog.require('goog.dom.TagName');
const debug = goog.require('goog.debug');
const dom = goog.require('goog.dom');
const events = goog.require('goog.events');
const log = goog.require('goog.log');
const testSuite = goog.require('goog.testing.testSuite');
const testingEvents = goog.require('goog.testing.events');
const userAgent = goog.require('goog.userAgent');

// MANUAL TESTS - The tests should be run in the browser from the Closure Test
// Server

// Set up a logger to track responses
LogManager.getRoot().setLevel(Level.INFO);
let logconsole;
const testLogger = log.getLogger('test');


/**
 * Creates an iframeIo instance and sets up the test environment.
 * @return {!IframeIo}
 */
function getTestIframeIo() {
  logconsole.addSeparator();
  logconsole.getFormatter().resetRelativeTimeStart();

  const io = new IframeIo();
  io.setErrorChecker(checkForError);

  events.listen(io, 'success', onSuccess);
  events.listen(io, 'error', onError);
  events.listen(io, 'ready', onReady);

  return io;
}


/**
 * Checks for error strings returned by the GSE and error variables that
 * the Gmail server and GFE set on certain errors.
 * @param {!Document} doc
 */
function checkForError(doc) {
  const win = dom.getWindow(doc);
  const text = doc.body.textContent || doc.body.innerText || '';
  const gseError = text.match(/([^\n]+)\nError ([0-9]{3})/);
  if (gseError) {
    return '(Error ' + gseError[2] + ') ' + gseError[1];
  } else if (win.gmail_error) {
    return win.gmail_error + 700;
  } else if (win.rc) {
    return 600 + win.rc % 100;
  } else {
    return null;
  }
}


/**
 * Logs the status of an iframeIo object
 * @param {!IframeIo} i
 */
function logStatus(i) {
  log.fine(testLogger, 'Is complete/success/active: ' + [
    i.isComplete(),
    i.isSuccess(),
    i.isActive(),
  ].join('/'));
}

/**
 * @param {!Event} e
 */
function onSuccess(e) {
  log.warning(testLogger, 'Request Succeeded');
  logStatus(e.target);
}

/**
 * @param {!Event} e
 */
function onError(e) {
  log.warning(testLogger, 'Request Errored: ' + e.target.getLastError());
  logStatus(e.target);
}

/**
 * @param {!Event} e
 */
function onReady(e) {
  log.info(testLogger, 'Test finished and iframe ready, disposing test object');
  e.target.dispose();
}


function simpleGet() {
  const io = getTestIframeIo();
  events.listen(io, 'complete', onSimpleTestComplete);
  io.send('/iframeio/ping', 'GET');
}


function simplePost() {
  const io = getTestIframeIo();
  events.listen(io, 'complete', onSimpleTestComplete);
  io.send('/iframeio/ping', 'POST');
}

/**
 * @param {!Event} e
 */
function onSimpleTestComplete(e) {
  log.info(testLogger, 'ResponseText: ' + e.target.getResponseText());
}

function abort() {
  const io = getTestIframeIo();
  events.listen(io, 'complete', onAbortComplete);
  events.listen(io, 'abort', onAbort);
  io.send('/iframeio/ping', 'GET');
  io.abort();
}

/**
 * @param {!Event} e
 */
function onAbortComplete(e) {
  log.info(testLogger, 'Hmm, request should have been aborted');
}

/**
 * @param {!Event} e
 */
function onAbort(e) {
  log.info(testLogger, 'Request aborted');
}


function errorGse404() {
  const io = getTestIframeIo();
  io.send('/iframeio/404', 'GET');
}

/**
 * @param {string} method
 */
function jsonEcho(method) {
  const io = getTestIframeIo();
  events.listen(io, 'complete', onJsonComplete);
  const data = {'p1': 'x', 'p2': 'y', 'p3': 'z', 'r': 10};
  io.send('/iframeio/jsonecho?q1=a&q2=b&q3=c&r=5', method, false, data);
}

/**
 * @param {!Event} e
 */
function onJsonComplete(e) {
  log.info(testLogger, 'ResponseText: ' + e.target.getResponseText());
  const json = e.target.getResponseJson();
  log.info(testLogger, 'ResponseJson:\n' + debug.deepExpose(json, true));
}


function sendFromForm() {
  const io = getTestIframeIo();
  events.listen(io, 'success', onUploadSuccess);
  events.listen(io, 'error', onUploadError);
  io.sendFromForm(document.getElementById('uploadform'));
}

/**
 * @param {!Event} e
 */
function onUploadSuccess(e) {
  log.log(testLogger, Level.SHOUT, 'Upload Succeeded');
  log.info(testLogger, 'ResponseText: ' + e.target.getResponseText());
}

/**
 * @param {!Event} e
 */
function onUploadError(e) {
  log.log(testLogger, Level.SHOUT, 'Upload Errored');
  log.info(testLogger, 'ResponseText: ' + e.target.getResponseText());
}


function redirect1() {
  const io = getTestIframeIo();
  io.send('/iframeio/redirect', 'GET');
}

function redirect2() {
  const io = getTestIframeIo();
  io.send('/iframeio/move', 'GET');
}

function badUrl() {
  const io = getTestIframeIo();
  io.send('http://news.bbc.co.uk', 'GET');
}

function localUrl1() {
  const io = getTestIframeIo();
  events.listen(io, 'complete', onLocalSuccess);
  io.send('c:\test.txt', 'GET');
}

function localUrl2() {
  const io = getTestIframeIo();
  events.listen(io, 'success', onLocalSuccess);
  io.send('//test.txt', 'GET');
}

/**
 * @param {!Event} e
 */
function onLocalSuccess(e) {
  log.info(testLogger, 'The file was found:\n' + e.target.getResponseText());
}

function getServerTime(noCache) {
  const io = getTestIframeIo();
  events.listen(io, 'success', onTestCacheSuccess);
  io.send('/iframeio/datetime', 'GET', noCache);
}

/**
 * @param {!Event} e
 */
function onTestCacheSuccess(e) {
  log.info(testLogger, 'Date reported: ' + e.target.getResponseText());
}


function errorGmail() {
  const io = getTestIframeIo();
  events.listen(io, 'error', onGmailError);
  io.send('/iframeio/gmailerror', 'GET');
}

/**
 * @param {!Event} e
 */
function onGmailError(e) {
  log.info(testLogger, 'Gmail error: ' + e.target.getLastError());
}


function errorGfe() {
  const io = getTestIframeIo();
  events.listen(io, 'error', onGfeError);
  io.send('/iframeio/gfeerror', 'GET');
}

/**
 * @param {!Event} e
 */
function onGfeError(e) {
  log.info(testLogger, 'GFE error: ' + e.target.getLastError());
}



function incremental() {
  const io = getTestIframeIo();
  io.send('/iframeio/incremental', 'GET');
}

window['P'] = function(iframe, data) {
  IframeIo.getInstanceByName(iframe.name);
  log.info(testLogger, 'Data received - ' + data);
};


function postForm() {
  const io = getTestIframeIo();
  events.listen(io, 'complete', onJsonComplete);
  io.sendFromForm(document.getElementById('testfrm'));
}


// UNIT TESTS
testSuite({
  setUpPage() {
    const logconsole = new DivConsole(document.getElementById('log'));
    logconsole.setCapturing(true);
  },

  // TODO(user): How to unit test all of this?  Creating a MockIframe could
  // help for the IE code path, but since the other browsers require weird
  // behaviors this becomes very tricky.


  testGetForm() {
    const frm1 = TEST_ONLY.getForm();
    const frm2 = TEST_ONLY.getForm();
    assertEquals(frm1, frm2);
  },


  testAddFormInputs() {
    const form = dom.createElement(TagName.FORM);
    IframeIo.addFormInputs_(form, {'a': 1, 'b': 2, 'c': 3});
    const inputs = dom.getElementsByTagName(dom.TagName.INPUT, form);
    assertEquals(3, inputs.length);
    for (let i = 0; i < inputs.length; i++) {
      assertEquals('hidden', inputs[i].type);
      const n = inputs[i].name;
      assertEquals(n == 'a' ? '1' : n == 'b' ? '2' : '3', inputs[i].value);
    }
  },

  testAddFormArrayInputs() {
    const form = dom.createElement(TagName.FORM);
    const data = {'a': ['blue', 'green'], 'b': ['red', 'pink', 'white']};
    IframeIo.addFormInputs_(form, data);
    const inputs = dom.getElementsByTagName(TagName.INPUT, form);
    assertEquals(5, inputs.length);
    for (let i = 0; i < inputs.length; i++) {
      assertEquals('hidden', inputs[i].type);
      const n = inputs[i].name;
      assertContains(inputs[i].value, data[n]);
    }
  },

  testNotIgnoringResponse() {
    // This test can't run in IE because we can't forge the check for
    // iframe.readyState = 'complete'.
    if (userAgent.IE) {
      return;
    }
    const iframeIo = new IframeIo();
    iframeIo.send('about:blank');
    // Simulate the frame finishing loading.
    testingEvents.fireBrowserEvent(
        new Event(EventType.LOAD, iframeIo.getRequestIframe()));
    assertTrue(iframeIo.isComplete());
  },

  testIgnoreResponse() {
    const iframeIo = new IframeIo();
    iframeIo.setIgnoreResponse(true);
    iframeIo.send('about:blank');
    // Simulate the frame finishing loading.
    testingEvents.fireBrowserEvent(
        new Event(EventType.LOAD, iframeIo.getRequestIframe()));
    // Although the request is complete, the IframeIo isn't paying attention.
    assertFalse(iframeIo.isComplete());
  },


});
