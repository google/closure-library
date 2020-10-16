/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An API compatibility layer for goog.log.LogBuffer.
 * TODO(user): Delete this file once all references to it have been
 *   removed.
 */

goog.module('goog.debug.LogBuffer');
goog.module.declareLegacyNamespace();

const LogBuffer = goog.require('goog.log.LogBuffer');

/**
 * Gets the current LogBuffer instance, creating it if it doesn't exist.
 * @return {!LogBuffer}
 */
exports.getInstance = () => {
  return LogBuffer.getInstance();
};

/**
 * Returns whether buffering is enabled.
 * @return {boolean}
 */
exports.isBufferingEnabled = () => {
  return LogBuffer.getInstance().isBufferingEnabled();
};
