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
 * @define {boolean} If true, use navigator.userAgentData
 * TODO(user) Flip flag in 2021/12.
 */
const USE_CLIENT_HINTS =
    goog.define('goog.labs.userAgent.USE_CLIENT_HINTS', false);
exports.USE_CLIENT_HINTS = USE_CLIENT_HINTS;
