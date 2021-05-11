/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A single module to define user-agent specific environment
 * details.
 *
 */

goog.module('goog.labs.net.webChannel.environment');

goog.module.declareLegacyNamespace();

var userAgent = goog.require('goog.userAgent');


/**
 * The default polling interval in millis for Edge.
 *
 * Currently on edge, new-chunk events may be not be fired (at all) if a new
 * chunk arrives within 50ms following the previous chunk. This may be fixed
 * in future, which requires changes to the whatwg spec too.
 *
 * @private @const {number}
 */
var EDGE_POLLING_INTERVAL_ = 125;


/**
 * History:
 *
 * IE11 is still using Trident, the traditional engine for IE.
 * Edge is using EdgeHTML, a fork of Trident. We are seeing the same issue
 * on IE-11 (reported in 2017), so treat IE the same as Edge for now.
 *
 * We used to do polling for Opera (only) with an 250ms interval, because Opera
 * only fires readyState == INTERACTIVE once. Opera switched to WebKit in 2013,
 * and then to Blink (chrome).
 *
 * TODO(user): check the raw UA string to keep polling for old, mobile operas
 * that may still be affected. For old Opera, double the polling interval
 * to 250ms.
 *
 * @return {boolean} True if polling is required with XHR.
 */
exports.isPollingRequired = function() {
  return userAgent.EDGE_OR_IE;
};


/**
 * How often to poll (in MS) for changes to responseText in browsers that don't
 * fire onreadystatechange during incremental loading of the response body.
 *
 * @return {number|undefined} The polling interval (MS) for the current U-A;
 * or undefined if polling is not supposed to be enabled.
 */
exports.getPollingInterval = function() {
  if (userAgent.EDGE_OR_IE) {
    return EDGE_POLLING_INTERVAL_;
  }

  return undefined;
};


/**
 * For Fetch/upload OT, make three requests against the server endpoint.
 * POST requests contain only dummy payload.
 *
 * https://developers.chrome.com/origintrials/#/view_trial/3524066708417413121
 *
 * 1) google.com token
 *
 * A329ozYiTjUmNz0Eh5wffNLiRjiVtFBptKBulP7UYXxKSuMVVhP3pVnlHnbrBg2ALEPd63boPZArHXg3+WlmagkAAAB/eyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkZldGNoVXBsb2FkU3RyZWFtaW5nIiwiZXhwaXJ5IjoxNjA4OTIzMjA4LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==
 *
 * 2) googleapis.com token
 *
 * To be registered after 1) is deployed.
 *
 * https://developers.chrome.com/origintrials/#/trials
 *
 * This function is expected to be called from background during the handshake.
 * Exceptions will be logged by the caller.
 *
 * No stats or logs are collected on the client-side. To be disabled once the
 * OT is expired.
 *
 * @param {string} path The base URL path for the requests
 */
exports.startOriginTrials = function(path) {
  // NE: may need check if path has already contains query params?

  // 1st req:  path?ot=1
  // non-streaming upload request

  // 2nd req:  path?ot=2
  // h2-only streaming upload request

  // 3rd req:  path?ot=3
  // h1-allowed streaming upload request

  // Example calling a Chrome API:
  // goog.global.chrome.loadTimes().wasFetchedViaSpdy
};