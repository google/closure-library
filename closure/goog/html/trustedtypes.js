/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Policy to convert strings to Trusted Types. See
 * https://github.com/WICG/trusted-types for details.
 */

goog.provide('goog.html.trustedtypes');
goog.require('goog.memoize');


/**
 * Creates a (singleton) Trusted Type Policy for Safe HTML Types.
 * @return {?TrustedTypePolicy}
 * @package
 */
goog.html.trustedtypes.getPolicyPrivateDoNotAccessOrElse = function() {
  if (!goog.TRUSTED_TYPES_POLICY_NAME) {
    // Binary not configured for Trusted Types.
    return null;
  }
  return goog.memoize(goog.createTrustedTypesPolicy)(
      goog.TRUSTED_TYPES_POLICY_NAME + '#html');
};
