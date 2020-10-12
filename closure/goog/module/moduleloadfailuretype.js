/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The possible reasons for a module load failure callback being
 * fired. Moved to a separate file to allow it to be used across packages.
 */

goog.module('goog.module.ModuleLoadFailureType');
goog.module.declareLegacyNamespace();

/**
 * The possible reasons for a module load failure callback being fired.
 * @enum {number}
 */
exports = {
  /** 401 Status. */
  UNAUTHORIZED: 0,

  /** Error status (not 401) returned multiple times. */
  CONSECUTIVE_FAILURES: 1,

  /** Request timeout. */
  TIMEOUT: 2,

  /** 410 status, old code gone. */
  OLD_CODE_GONE: 3,

  /** The onLoad callbacks failed. */
  INIT_ERROR: 4
};
