/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Policy to convert strings to Trusted Types. See
 * https://github.com/WICG/trusted-types for details.
 *
 */

goog.provide('goog.html.trustedtypes');

/** @package @const {?TrustedTypePolicy} */
goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY =
    goog.TRUSTED_TYPES_POLICY_NAME ?
    goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + '#html') :
    null;
