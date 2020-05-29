/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The minimal set of browser externs needed for :server_side_js,
 * a target that is supposed to export a subset of Closure library that works
 * without browser APIs. This file is needed because the string library has
 * historically been a (rather major) part of this subset, but recently added
 * transitive dependencies on Blob and MediaSource, which are web APIs. For
 * example, Blob is in w3c_fileapi.js:
 *
 * string -> dom:safe -> html:trustedresourceurl -> fs:blob -> w3c_fileapi
 *
 * Ideally, this file doesn't need to exist at all, and we use server-side unit
 * tests to enforce that these APIs are fully functional in non-browser
 * environments, rather than use externs. See b/156542894 for more info.
 *
 * @externs
 */

/**
 * @param {!Array<string>|!Blob|!ArrayBuffer} blobParts
 * @param {!Object} options
 * @constructor
 */
function Blob(blobParts, options) {}

/**
 * @constructor
 */
function MediaSource() {}
