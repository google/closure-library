/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An API compatibility layer for goog.log.LogRecord.
 * TODO(user): Delete this file once all references to it have been
 *   removed.
 */

goog.provide('goog.debug.LogRecord');

goog.require('goog.log.LogRecord');

/**
 * @deprecated Use {goog.log.LogRecord} instead.
 * @constructor
 * @final
 */
goog.debug.LogRecord = goog.log.LogRecord;
