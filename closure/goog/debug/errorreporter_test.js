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

goog.module('goog.debug.ErrorReporterTest');
goog.setTestOnly();

const DebugError = goog.require('goog.debug.Error');
const ErrorReporter = goog.require('goog.debug.ErrorReporter');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const TestCase = goog.require('goog.testing.TestCase');
const errorcontext = goog.require('goog.debug.errorcontext');
const events = goog.require('goog.events');
const functions = goog.require('goog.functions');
const product = goog.require('goog.userAgent.product');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

class MockXhrIo {
  onReadyStateChangeEntryPoint_() {}

  static protectEntryPoints() {}

  static send(
      url, callback = undefined, method = undefined, content = undefined,
      headers = undefined, timeInterval = undefined) {
    MockXhrIo.lastUrl = url;
    MockXhrIo.lastContent = content;
    MockXhrIo.lastHeaders = headers;
  }
}

MockXhrIo.lastUrl = null;

let errorReporter;
const originalSetTimeout = window.setTimeout;
const stubs = new PropertyReplacer();
const url = 'http://www.your.tst/more/bogus.js';
const encodedUrl = 'http%3A%2F%2Fwww.your.tst%2Fmore%2Fbogus.js';

function throwAnErrorWith(script, line, message, stack = undefined) {
  const error = {message: message, fileName: script, lineNumber: line};
  if (stack) {
    error['stack'] = stack;
  }

  throw error;
}

testSuite({
  setUp() {
    // TODO(b/25875505): Fix unreported assertions (go/failonunreportedasserts).
    TestCase.getActiveTestCase().failOnUnreportedAsserts = false;

    stubs.set(goog.net, 'XhrIo', MockXhrIo);
    ErrorReporter.ALLOW_AUTO_PROTECT = true;
  },

  tearDown() {
    goog.dispose(errorReporter);
    stubs.reset();
    MockXhrIo.lastUrl = null;
  },

  testsendErrorReport() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.sendErrorReport('message', 'filename.js', 123, 'trace');

    assertEquals(
        '/log?script=filename.js&error=message&line=123', MockXhrIo.lastUrl);
    assertEquals('trace=trace', MockXhrIo.lastContent);
  },

  testsendErrorReportWithCustomSender() {
    let uri = null;
    let method = null;
    let content = null;
    let headers = null;
    function mockXhrSender(uriIn, methodIn, contentIn, headersIn) {
      uri = uriIn;
      method = methodIn;
      content = contentIn;
      headers = headersIn;
    }

    errorReporter = new ErrorReporter('/log');
    errorReporter.setXhrSender(mockXhrSender);
    errorReporter.sendErrorReport('message', 'filename.js', 123, 'trace');

    assertEquals('/log?script=filename.js&error=message&line=123', uri);
    assertEquals('POST', method);
    assertEquals('trace=trace', content);
    assertUndefined(headers);
  },

  testsendErrorReport_noTrace() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.sendErrorReport('message', 'filename.js', 123);

    assertEquals(
        '/log?script=filename.js&error=message&line=123', MockXhrIo.lastUrl);
    assertEquals('', MockXhrIo.lastContent);
  },

  test_nonInternetExplorerSendErrorReport() {
    if (product.SAFARI) {
      // TODO(b/20733468): Disabled so we can get the rest of the Closure test
      // suite running in a continuous build. Will investigate later.
      return;
    }

    stubs.set(userAgent, 'IE', false);
    stubs.set(goog.global, 'setTimeout', (fcn, time) => {
      fcn.call();
    });

    errorReporter = ErrorReporter.install('/errorreporter');

    const errorFunction = goog.partial(throwAnErrorWith, url, 5, 'Hello :)');

    try {
      goog.global.setTimeout(errorFunction, 0);
    } catch (e) {
      // Expected. The error is rethrown after sending.
    }

    assertEquals(
        `/errorreporter?script=${encodedUrl}&error=Hello%20%3A)&line=5`,
        MockXhrIo.lastUrl);
    assertEquals('trace=Not%20available', MockXhrIo.lastContent);
  },

  test_internetExplorerSendErrorReport() {
    stubs.set(userAgent, 'IE', true);
    stubs.set(userAgent, 'isVersionOrHigher', functions.FALSE);

    // Remove test runner's onerror handler so the test doesn't fail.
    stubs.set(goog.global, 'onerror', null);

    errorReporter = ErrorReporter.install('/errorreporter');
    goog.global.onerror('Goodbye :(', url, 22);
    assertEquals(
        `/errorreporter?script=${encodedUrl}` +
            '&error=Goodbye%20%3A(&line=22',
        MockXhrIo.lastUrl);
    assertEquals('trace=Not%20available', MockXhrIo.lastContent);
  },

  test_setLoggingHeaders() {
    stubs.set(userAgent, 'IE', true);
    stubs.set(userAgent, 'isVersionOrHigher', functions.FALSE);
    // Remove test runner's onerror handler so the test doesn't fail.
    stubs.set(goog.global, 'onerror', null);

    errorReporter = ErrorReporter.install('/errorreporter');
    errorReporter.setLoggingHeaders('header!');
    goog.global.onerror('Goodbye :(', 'http://www.your.tst/more/bogus.js', 22);
    assertEquals('header!', MockXhrIo.lastHeaders);
  },

  test_nonInternetExplorerSendErrorReportWithTrace() {
    stubs.set(userAgent, 'IE', false);
    stubs.set(goog.global, 'setTimeout', (fcn, time) => {
      fcn.call();
    });

    errorReporter = ErrorReporter.install('/errorreporter');

    const trace = 'Error(\"Something Wrong\")@:0\n' +
        '$MF$E$Nx$([object Object])@http://a.b.c:83/a/f.js:901\n' +
        '([object Object])@http://a.b.c:813/a/f.js:37';

    const errorFunction =
        goog.partial(throwAnErrorWith, url, 5, 'Hello :)', trace);

    try {
      goog.global.setTimeout(errorFunction, 0);
    } catch (e) {
      // Expected. The error is rethrown after sending.
    }

    assertEquals(
        `/errorreporter?script=${encodedUrl}&error=Hello%20%3A)&line=5`,
        MockXhrIo.lastUrl);
    assertEquals(
        'trace=' +
            'Error(%22Something%20Wrong%22)%40%3A0%0A' +
            '%24MF%24E%24Nx%24(%5Bobject%20Object%5D)%40' +
            'http%3A%2F%2Fa.b.c%3A83%2Fa%2Ff.js%3A901%0A' +
            '(%5Bobject%20Object%5D)%40http%3A%2F%2Fa.b.c%3A813%2Fa%2Ff.js%3A37',
        MockXhrIo.lastContent);
  },

  testProtectAdditionalEntryPoint_nonIE() {
    stubs.set(userAgent, 'IE', false);

    errorReporter = ErrorReporter.install('/errorreporter');
    const fn = () => {};
    const protectedFn = errorReporter.protectAdditionalEntryPoint(fn);
    assertNotNull(protectedFn);
    assertNotEquals(fn, protectedFn);
  },

  testProtectAdditionalEntryPoint_IE() {
    stubs.set(userAgent, 'IE', true);
    stubs.set(userAgent, 'isVersionOrHigher', functions.FALSE);

    errorReporter = ErrorReporter.install('/errorreporter');
    const fn = () => {};
    const protectedFn = errorReporter.protectAdditionalEntryPoint(fn);
    assertNull(protectedFn);
  },

  testHandleException_dispatchesEvent() {
    errorReporter = ErrorReporter.install('/errorreporter');
    let loggedErrors = 0;
    events.listen(errorReporter, ErrorReporter.ExceptionEvent.TYPE, (event) => {
      assertNotNullNorUndefined(event.error);
      loggedErrors++;
    });
    errorReporter.handleException(new Error());
    errorReporter.handleException(new Error());
    assertEquals(
        'Expected 2 errors. ' +
            '(Ensure an exception was not swallowed.)',
        2, loggedErrors);
  },

  testHandleException_includesContext() {
    errorReporter = ErrorReporter.install('/errorreporter');
    let loggedErrors = 0;
    const testError = new Error('test error');
    const testContext = {'contextParam': 'contextValue'};
    events.listen(errorReporter, ErrorReporter.ExceptionEvent.TYPE, (event) => {
      assertNotNullNorUndefined(event.error);
      assertObjectEquals({contextParam: 'contextValue'}, event.context);
      loggedErrors++;
    });
    errorReporter.handleException(testError, testContext);
    assertEquals(
        'Expected 1 error. ' +
            '(Ensure an exception was not swallowed.)',
        1, loggedErrors);
  },

  testContextProvider() {
    errorReporter =
        ErrorReporter.install('/errorreporter', (error, context) => {
          context.providedContext = 'value';
        });
    let loggedErrors = 0;
    const testError = new Error('test error');
    events.listen(errorReporter, ErrorReporter.ExceptionEvent.TYPE, (event) => {
      assertNotNullNorUndefined(event.error);
      assertObjectEquals({providedContext: 'value'}, event.context);
      loggedErrors++;
    });
    errorReporter.handleException(testError);
    assertEquals(
        'Expected 1 error. ' +
            '(Ensure an exception was not swallowed.)',
        1, loggedErrors);
  },

  testContextProvider_withOtherContext() {
    errorReporter =
        ErrorReporter.install('/errorreporter', (error, context) => {
          context.providedContext = 'value';
        });
    let loggedErrors = 0;
    const testError = new Error('test error');
    events.listen(errorReporter, ErrorReporter.ExceptionEvent.TYPE, (event) => {
      assertNotNullNorUndefined(event.error);
      assertObjectEquals(
          {providedContext: 'value', otherContext: 'value'}, event.context);
      loggedErrors++;
    });
    errorReporter.handleException(testError, {'otherContext': 'value'});
    assertEquals(
        'Expected 1 error. ' +
            '(Ensure an exception was not swallowed.)',
        1, loggedErrors);
  },

  testErrorWithContext() {
    errorReporter = ErrorReporter.install('/errorreporter');
    let loggedErrors = 0;
    const testError = new Error('test error');
    errorcontext.addErrorContext(testError, 'key1', 'value1');
    errorcontext.addErrorContext(testError, 'animalType', 'dog');
    events.listen(errorReporter, ErrorReporter.ExceptionEvent.TYPE, (event) => {
      assertNotNullNorUndefined(event.error);
      assertObjectEquals({key1: 'value1', animalType: 'dog'}, event.context);
      loggedErrors++;
    });
    errorReporter.handleException(testError);
    assertEquals(
        'Expected 1 error. ' +
            '(Ensure an exception was not swallowed.)',
        1, loggedErrors);
  },

  testErrorWithDifferentContextSources() {
    errorReporter =
        ErrorReporter.install('/errorreporter', (error, context) => {
          context.providedContext = 'provided ctx';
        });
    let loggedErrors = 0;
    const testError = new Error('test error');
    errorcontext.addErrorContext(testError, 'addErrorContext', 'some value');
    events.listen(errorReporter, ErrorReporter.ExceptionEvent.TYPE, (event) => {
      assertNotNullNorUndefined(event.error);
      assertObjectEquals(
          {
            addErrorContext: 'some value',
            providedContext: 'provided ctx',
            handleExceptionContext: 'another value',
          },
          event.context);
      loggedErrors++;
    });
    errorReporter.handleException(
        testError, {handleExceptionContext: 'another value'});
    assertEquals(
        'Expected 1 error. ' +
            '(Ensure an exception was not swallowed.)',
        1, loggedErrors);
  },

  testHandleException_ignoresExceptionsDuringEventDispatch() {
    errorReporter = ErrorReporter.install('/errorreporter');
    events.listen(errorReporter, ErrorReporter.ExceptionEvent.TYPE, (event) => {
      fail('This exception should be swallowed.');
    });
    errorReporter.handleException(new Error());
  },

  testHandleException_doNotReportErrorToServer() {
    const error = new DebugError();
    error.reportErrorToServer = false;
    errorReporter.handleException(error);
    assertNull(MockXhrIo.lastUrl);
  },

  testDisposal() {
    errorReporter = ErrorReporter.install('/errorreporter');
    if (!userAgent.IE) {
      assertNotEquals(originalSetTimeout, window.setTimeout);
    }
    goog.dispose(errorReporter);
    assertEquals(originalSetTimeout, window.setTimeout);
  },

  testSetContextPrefix() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.setContextPrefix('baz.');
    errorReporter.sendErrorReport(
        'message', 'filename.js', 123, 'trace', {'foo': 'bar'});
    assertEquals('trace=trace&baz.foo=bar', MockXhrIo.lastContent);
  },

  testTruncationLimit() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.setTruncationLimit(6);
    errorReporter.sendErrorReport(
        'message', 'filename.js', 123, 'trace', {'foo': 'bar'});
    assertEquals('trace=', MockXhrIo.lastContent);
  },

  testZeroTruncationLimit() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.setTruncationLimit(0);
    errorReporter.sendErrorReport(
        'message', 'filename.js', 123, 'trace', {'foo': 'bar'});
    assertEquals('', MockXhrIo.lastContent);
  },

  testTruncationLimitLargerThanBody() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.setTruncationLimit(9999);
    errorReporter.sendErrorReport(
        'message', 'filename.js', 123, 'trace', {'foo': 'bar'});
    assertEquals('trace=trace&context.foo=bar', MockXhrIo.lastContent);
  },

  testSetNegativeTruncationLimit() {
    errorReporter = new ErrorReporter('/log');
    assertThrows(() => {
      errorReporter.setTruncationLimit(-10);
    });
  },

  testSetTruncationLimitNull() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.setTruncationLimit(null);
    errorReporter.sendErrorReport(
        'message', 'filename.js', 123, 'trace', {'foo': 'bar'});
    assertEquals('trace=trace&context.foo=bar', MockXhrIo.lastContent);
  },

  testAttemptAutoProtectWithAllowAutoProtectOff() {
    ErrorReporter.ALLOW_AUTO_PROTECT = false;
    assertThrows(() => {
      errorReporter = new ErrorReporter('/log', (e, context) => {}, false);
    });
  },

  testSetAdditionalArgumentsArgsEmptyObject() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.setAdditionalArguments({});
    errorReporter.sendErrorReport(
        'message', 'filename.js', 123, 'trace', {'foo': 'bar'});
    assertEquals(
        '/log?script=filename.js&error=message&line=123', MockXhrIo.lastUrl);
  },

  testSetAdditionalArgumentsSingleArgument() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.setAdditionalArguments({'extra': 'arg'});
    errorReporter.sendErrorReport(
        'message', 'filename.js', 123, 'trace', {'foo': 'bar'});
    assertEquals(
        '/log?script=filename.js&error=message&line=123&extra=arg',
        MockXhrIo.lastUrl);
  },

  testSetAdditionalArgumentsMultipleArguments() {
    errorReporter = new ErrorReporter('/log');
    errorReporter.setAdditionalArguments({'extra': 'arg', 'cat': 'dog'});
    errorReporter.sendErrorReport(
        'message', 'filename.js', 123, 'trace', {'foo': 'bar'});
    assertEquals(
        '/log?script=filename.js&error=message&line=123&extra=arg&cat=dog',
        MockXhrIo.lastUrl);
  },
});
