/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Defines for goog.labs.userAgent.
 */

goog.module('goog.labs.userAgent');

/**
 * @define {string} Optional runtime override for the USE_CLIENT_HINTS flag.
 * If this is set (for example, to 'foo.bar') then any value of USE_CLIENT_HINTS
 * will be overridden by `globalThis.foo.bar` if it is non-null.
 * This flag will be removed in December 2021.
 */
const USE_CLIENT_HINTS_OVERRIDE =
    goog.define('goog.labs.userAgent.USE_CLIENT_HINTS_OVERRIDE', '');

/**
 * @define {boolean} If true, use navigator.userAgentData
 * TODO(user) Flip flag in 2021/12.
 */
const USE_CLIENT_HINTS =
    goog.define('goog.labs.userAgent.USE_CLIENT_HINTS', false);

/** @const {boolean} */
exports.USE_CLIENT_HINTS =
    (USE_CLIENT_HINTS_OVERRIDE ?
         goog.getObjectByName(USE_CLIENT_HINTS_OVERRIDE) :
         undefined) ??
    USE_CLIENT_HINTS;
