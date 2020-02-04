/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.debug.ErrorHandlerAsyncTest');
goog.setTestOnly();

const ErrorHandler = goog.require('goog.debug.ErrorHandler');
const GoogPromise = goog.require('goog.Promise');
// const TestCase = goog.require('goog.testing.TestCase');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

/** @type {!goog.promise.Resolver} */
let resolver;

const testCase = {};

testCase.setUpPage = function() {
  resolver = GoogPromise.withResolver();

  this.oldTimeout = window.setTimeout;
  this.oldInterval = window.setInterval;
  this.oldRequestAnimationFrame = window.requestAnimationFrame;

  // Whether requestAnimationFrame is available for testing.
  this.testingReqAnimFrame = !!window.requestAnimationFrame;

  // Whether a rejection handler is available for testing.
  this.testingUnhandledRejection = 'onunhandledrejection' in window;

  this.handler = new ErrorHandler(goog.bind(this.onException, this));
  this.handler.protectWindowSetTimeout();
  this.handler.protectWindowSetInterval();
  this.handler.protectWindowRequestAnimationFrame();
  this.handler.catchUnhandledRejections();
  this.exceptions = [];
  this.errors = 0;

  // Override the error event handler, since we are purposely throwing
  // exceptions from global functions, and expect them
  this.oldWindowOnError = window.onerror;
  window.onerror = goog.bind(this.onError, this);

  window.setTimeout(goog.bind(this.timeOut, this), 10);
  this.intervalId = window.setInterval(goog.bind(this.interval, this), 20);

  if (this.testingReqAnimFrame) {
    window.requestAnimationFrame(goog.bind(this.animFrame, this));
  }

  if (this.testingUnhandledRejection) {
    this.async();
  }

  this.promiseTimeout = 10000;  // 10s.
};

testCase.tearDownPage = function() {
  window.setTimeout = this.oldTimeout;
  window.setInterval = this.oldInterval;
  window.requestAnimationFrame = this.oldRequestAnimationFrame;
};

testCase.onException = function(e) {
  this.exceptions.push(e);
  if (this.timeoutHit && this.intervalHit &&
      (!this.testingReqAnimFrame || this.animFrameHit) &&
      (!this.testingUnhandledRejection || this.async)) {
    resolver.resolve();
  }
};

testCase.onError = function(msg, url, line) {
  this.errors++;
  return true;
};

testCase.timeOut = function() {
  this.timeoutHit = true;
  throw testCase.timeOut;
};

testCase.interval = function() {
  this.intervalHit = true;
  window.clearTimeout(this.intervalId);
  throw testCase.interval;
};

testCase.animFrame = function() {
  this.animFrameHit = true;
  throw testCase.animFrame;
};

/** Test uncaught errors in async/await */
testCase.async = async function() {
  this.asyncHit = true;
  const p = Promise.resolve();
  await p;
  throw testCase.async;
};

testCase.testResults = function() {
  return resolver.promise.then(function() {
    let animFrameHit;
    let asyncHit;
    let intervalHit;
    let timeoutHit;

    for (let i = 0; i < this.exceptions.length; ++i) {
      switch (this.exceptions[i]) {
        case this.timeOut:
          timeoutHit = true;
          break;
        case this.interval:
          intervalHit = true;
          break;
        case this.animFrame:
          animFrameHit = true;
          break;
        case this.async:
          asyncHit = true;
          break;
      }
    }

    assertTrue('timeout exception not received', timeoutHit);
    assertTrue('timeout not called', this.timeoutHit);
    assertTrue('interval exception not received', intervalHit);
    assertTrue('interval not called', this.intervalHit);
    if (this.testingReqAnimFrame) {
      assertTrue('anim frame exception not received', animFrameHit);
      assertTrue('animFrame not called', this.animFrameHit);
    }
    if (this.testingUnhandledRejection) {
      assertTrue('Unhandled Rejection exception not received', asyncHit);
    }

    if (!userAgent.WEBKIT) {
      let expectedRethrownCount = 2;
      if (this.testingReqAnimFrame) expectedRethrownCount++;
      if (this.testingUnhandledRejection) expectedRethrownCount++;
      assertEquals(
          `${expectedRethrownCount} exceptions should have been rethrown`,
          expectedRethrownCount, this.errors);
    }
  }, null, this);
};

testSuite(testCase);
