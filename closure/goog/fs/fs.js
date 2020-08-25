/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wrappers for the HTML5 File API. These wrappers closely mirror
 * the underlying APIs, but use Closure-style events and Deferred return values.
 * Their existence also makes it possible to mock the FileSystem API for testing
 * in browsers that don't support it natively.
 *
 * When adding public functions to anything under this namespace, be sure to add
 * its mock counterpart to goog.testing.fs.
 */

goog.provide('goog.fs');

goog.require('goog.async.Deferred');
goog.require('goog.fs.Error');
goog.require('goog.fs.FileSystemImpl');
goog.require('goog.fs.url');


/**
 * Get a wrapped FileSystem object.
 *
 * @param {goog.fs.FileSystemType_} type The type of the filesystem to get.
 * @param {number} size The size requested for the filesystem, in bytes.
 * @return {!goog.async.Deferred} The deferred {@link goog.fs.FileSystem}. If an
 *     error occurs, the errback is called with a {@link goog.fs.Error}.
 * @private
 */
goog.fs.get_ = function(type, size) {
  'use strict';
  var requestFileSystem =
      goog.global.requestFileSystem || goog.global.webkitRequestFileSystem;

  if (!goog.isFunction(requestFileSystem)) {
    return goog.async.Deferred.fail(new Error('File API unsupported'));
  }

  var d = new goog.async.Deferred();
  requestFileSystem(
      type, size,
      function(fs) {
        'use strict';
        d.callback(new goog.fs.FileSystemImpl(fs));
      },
      function(err) {
        'use strict';
        d.errback(new goog.fs.Error(err, 'requesting filesystem'));
      });
  return d;
};


/**
 * The two types of filesystem.
 *
 * @enum {number}
 * @private
 */
goog.fs.FileSystemType_ = {
  /**
   * A temporary filesystem may be deleted by the user agent at its discretion.
   */
  TEMPORARY: 0,
  /**
   * A persistent filesystem will never be deleted without the user's or
   * application's authorization.
   */
  PERSISTENT: 1
};


/**
 * Returns a temporary FileSystem object. A temporary filesystem may be deleted
 * by the user agent at its discretion.
 *
 * @param {number} size The size requested for the filesystem, in bytes.
 * @return {!goog.async.Deferred} The deferred {@link goog.fs.FileSystem}. If an
 *     error occurs, the errback is called with a {@link goog.fs.Error}.
 */
goog.fs.getTemporary = function(size) {
  'use strict';
  return goog.fs.get_(goog.fs.FileSystemType_.TEMPORARY, size);
};


/**
 * Returns a persistent FileSystem object. A persistent filesystem will never be
 * deleted without the user's or application's authorization.
 *
 * @param {number} size The size requested for the filesystem, in bytes.
 * @return {!goog.async.Deferred} The deferred {@link goog.fs.FileSystem}. If an
 *     error occurs, the errback is called with a {@link goog.fs.Error}.
 */
goog.fs.getPersistent = function(size) {
  'use strict';
  return goog.fs.get_(goog.fs.FileSystemType_.PERSISTENT, size);
};


/**
 * Creates a blob URL for a blob object.
 * Throws an error if the browser does not support Object Urls.
 *
 * TODO(user): Update references to this method to use
 * goog.fs.url.createObjectUrl instead.
 *
 * @param {!Blob} blob The object for which to create the URL.
 * @return {string} The URL for the object.
 */
goog.fs.createObjectUrl = function(blob) {
  'use strict';
  return goog.fs.url.createObjectUrl(blob);
};


/**
 * Revokes a URL created by {@link goog.fs.createObjectUrl}.
 * Throws an error if the browser does not support Object Urls.
 *
 * TODO(user): Update references to this method to use
 * goog.fs.url.revokeObjectUrl instead.
 *
 * @param {string} url The URL to revoke.
 */
goog.fs.revokeObjectUrl = function(url) {
  'use strict';
  goog.fs.url.revokeObjectUrl(url);
};


/**
 * Checks whether this browser supports Object Urls. If not, calls to
 * createObjectUrl and revokeObjectUrl will result in an error.
 *
 * TODO(user): Update references to this method to use
 * goog.fs.url.browserSupportsObjectUrls instead.
 *
 * @return {boolean} True if this browser supports Object Urls.
 */
goog.fs.browserSupportsObjectUrls = function() {
  'use strict';
  return goog.fs.url.browserSupportsObjectUrls();
};


/**
 * Slices the blob. The returned blob contains data from the start byte
 * (inclusive) till the end byte (exclusive). Negative indices can be used
 * to count bytes from the end of the blob (-1 == blob.size - 1). Indices
 * are always clamped to blob range. If end is omitted, all the data till
 * the end of the blob is taken.
 *
 * @param {!Blob} blob The blob to be sliced.
 * @param {number} start Index of the starting byte.
 * @param {number=} opt_end Index of the ending byte.
 * @return {Blob} The blob slice or null if not supported.
 */
goog.fs.sliceBlob = function(blob, start, opt_end) {
  'use strict';
  if (opt_end === undefined) {
    opt_end = blob.size;
  }
  if (blob.slice) {
    return blob.slice(start, opt_end);
  }
  return null;
};
