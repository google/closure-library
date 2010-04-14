// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Copyright 2009 Google Inc. All Rights Reserved
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
 * @fileoverview Definition of the ErrorReporter class, which creates an error
 * handler that reports any errors raised to a URL.
 *
 */

goog.provide('goog.debug.ErrorReporter');
goog.provide('goog.debug.ErrorReporter.ExceptionEvent')

goog.require('goog.debug');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');
goog.require('goog.net.XhrIo');
goog.require('goog.string');
goog.require('goog.uri.utils');


/**
 * Constructs an error reporter. Internal Use Only. To install an error
 * reporter see the {@see #install} method below.
 *
 * @param {string} handlerUrl The URL to which all errors will be reported.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
goog.debug.ErrorReporter = function(handlerUrl) {
  /**
   * The URL at which all errors caught by this handler will be logged.
   *
   * @type {string}
   * @private
   */
  this.handlerUrl_ = handlerUrl;

  this.setup_();
};
goog.inherits(goog.debug.ErrorReporter, goog.events.EventTarget);


/**
 * Event broadcast when an exception is logged.
 * @param {Error} error The exception that was was reported.
 * @constructor
 * @extends {goog.events.Event}
 */
goog.debug.ErrorReporter.ExceptionEvent = function(error) {
  goog.events.Event.call(this, goog.debug.ErrorReporter.ExceptionEvent.TYPE);

  /**
   * The error that was reported.
   * @type {Error}
   */
  this.error = error;
};
goog.inherits(goog.debug.ErrorReporter.ExceptionEvent, goog.events.Event);


/**
 * Event type for notifying of a logged exception.
 * @type {string}
 */
goog.debug.ErrorReporter.ExceptionEvent.TYPE =
    goog.events.getUniqueId('exception');


/**
 * The internal error handler used to catch all errors.
 *
 * @type {goog.debug.ErrorHandler}
 * @private
 */
goog.debug.ErrorReporter.prototype.errorHandler_ = null;


/**
 * Extra headers for the error-reporting XHR.
 * @type {Object|goog.structs.Map|undefined}
 * @private
 */
goog.debug.ErrorReporter.prototype.extraHeaders_;


/**
 * Logging object.
 *
 * @type {goog.debug.Logger}
 * @private
 */
goog.debug.ErrorReporter.logger_ =
    goog.debug.Logger.getLogger('goog.debug.ErrorReporter');


/**
 * Installs an error reporter to catch all JavaScript errors raised.
 *
 * @param {string} loggingUrl The URL to which the errors caught will be
 *     reported.
 * @return {goog.debug.ErrorReporter} The error reporter.
 */
goog.debug.ErrorReporter.install = function(loggingUrl) {
  var instance = new goog.debug.ErrorReporter(loggingUrl);
  return instance;
};


/**
 * Installs exception protection for an entry point function in addition
 * to those that are protected by default.
 * Has no effect in IE because window.onerror is used for reporting
 * exceptions in that case.
 *
 * @param {Function} fn An entry point function to be protected.
 * @param {boolean=} opt_tracers Whether to install tracers around the fn.
 * @return {Function} A protected wrapper function that calls the entry point
 *     function or null if the entry point could not be protected.
 */
goog.debug.ErrorReporter.prototype.protectAdditionalEntryPoint = function(fn,
    opt_tracers) {
  if (this.errorHandler_) {
    return this.errorHandler_.protectEntryPoint(fn, opt_tracers);
  }
  return null;
};


/**
 * Add headers to the logging url.
 * @param {Object|goog.structs.Map} loggingHeaders Extra headers to send
 *     to the logging URL.
 */
goog.debug.ErrorReporter.prototype.setLoggingHeaders =
    function(loggingHeaders) {
  this.extraHeaders_ = loggingHeaders;
};


/**
 * Sets up the error reporter.
 *
 * @private
 */
goog.debug.ErrorReporter.prototype.setup_ = function() {
  if (goog.userAgent.IE) {
    // Use "onerror" because caught exceptions in IE don't provide line number.
    goog.debug.catchErrors(
        goog.bind(this.handleException, this), false, null);
  } else {
    // "onerror" doesn't work with FF2 or Chrome
    this.errorHandler_ = new goog.debug.ErrorHandler(
        goog.bind(this.handleException, this));

    this.errorHandler_.protectWindowSetTimeout();
    this.errorHandler_.protectWindowSetInterval();
    goog.events.protectBrowserEventEntryPoint(this.errorHandler_);
    goog.net.XhrIo.protectEntryPoints(this.errorHandler_);
  }
};


/**
 * Handler for caught exceptions. Sends report to the LoggingServlet and
 * notifies any listeners.
 *
 * @param {Error} e The exception.
 */
goog.debug.ErrorReporter.prototype.handleException = function(e) {
  var error = (/** @type {!Error} */ goog.debug.normalizeErrorObject(e));

  try {
    this.dispatchEvent(new goog.debug.ErrorReporter.ExceptionEvent(error));
  } catch (ex) {
    // Swallow exception to avoid infinite recursion.
  }

  // Make sure when handling exceptions that the error file name contains only
  // the basename (e.g. "file.js"). goog.debug.catchErrors does this stripping,
  // but goog.debug.ErrorHandler.protectEntryPoint does not.
  var baseName = String(error.fileName).split(/[\/\\]/).pop();

  // Strip the query part of the URL.
  baseName = String(baseName).split('?', 2)[0];

  this.sendErrorReport(error.message, baseName, error.lineNumber, error.stack);
};


/**
 * Sends an error report to the logging URL.
 *
 * @param {string} message Error description.
 * @param {string} fileName URL of the JavaScript file with the error.
 * @param {number} line Line number of the error.
 * @param {string=} opt_trace Call stack trace of the error.
 */
goog.debug.ErrorReporter.prototype.sendErrorReport =
    function(message, fileName, line, opt_trace) {
  try {
    // Create the logging URL.
    var requestUrl = goog.uri.utils.appendParams(this.handlerUrl_,
        'script', fileName, 'error', message, 'line', line);
    var queryData = goog.uri.utils.buildQueryData(['trace', opt_trace]);

    // Send the request with the contents of the error.
    goog.net.XhrIo.send(requestUrl, null, 'POST',
        queryData, this.extraHeaders_);
  } catch (e) {
    var logMessage = goog.string.buildString(
        'Error occurred in sending an error report.\n\n',
        'script:', fileName, '\n',
        'line:', line, '\n',
        'error:', message, '\n',
        'trace:', opt_trace);
    goog.debug.ErrorReporter.logger_.info(logMessage);
  }
};
