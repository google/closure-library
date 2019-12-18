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
goog.require('goog.fs.FileReader');
goog.require('goog.fs.FileSystemImpl');
goog.require('goog.fs.blob');
goog.require('goog.fs.url');
goog.require('goog.userAgent');


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
  var requestFileSystem =
      goog.global.requestFileSystem || goog.global.webkitRequestFileSystem;

  if (!goog.isFunction(requestFileSystem)) {
    return goog.async.Deferred.fail(new Error('File API unsupported'));
  }

  var d = new goog.async.Deferred();
  requestFileSystem(
      type, size, function(fs) { d.callback(new goog.fs.FileSystemImpl(fs)); },
      function(err) {
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
  return goog.fs.url.browserSupportsObjectUrls();
};


/**
 * Concatenates one or more values together and converts them to a Blob.
 *
 * TODO(user): Update references to use goog.fs.blob.getBlob instead.
 *
 * @param {...(string|!Blob|!ArrayBuffer)} var_args The values that will make up
 *     the resulting blob.
 * @return {!Blob} The blob.
 * @deprecated Use goog.fs.blob.getBlob().
 */
goog.fs.getBlob = goog.fs.blob.getBlob;


/**
 * Creates a blob with the given properties.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Blob for more details.
 *
 * TODO(user): Update references to use goog.fs.blob.getBlobWithProperties
 * instead.
 *
 * @param {!Array<string|!Blob|!ArrayBuffer>} parts The values that will make up
 *     resulting blob.
 * @param {string=} opt_type The MIME type of the Blob.
 * @param {string=} opt_endings Specifies how strings containing newlines are to
 *     be written out.
 * @return {!Blob} The blob.
 * @deprecated Use goog.fs.blob.getBlobWithProperties().
 */
goog.fs.getBlobWithProperties = goog.fs.blob.getBlobWithProperties;


/**
 * Converts a Blob or a File into a string. This should only be used when the
 * blob is known to be small.
 *
 * @param {!Blob} blob The blob to convert.
 * @param {string=} opt_encoding The name of the encoding to use.
 * @return {!goog.async.Deferred} The deferred string. If an error occurrs, the
 *     errback is called with a {@link goog.fs.Error}.
 * @deprecated Use {@link goog.fs.FileReader.readAsText} instead.
 */
goog.fs.blobToString = function(blob, opt_encoding) {
  return goog.fs.FileReader.readAsText(blob, opt_encoding);
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
  if (opt_end === undefined) {
    opt_end = blob.size;
  }
  if (blob.webkitSlice) {
    // Natively accepts negative indices, clamping to the blob range and
    // range end is optional. See http://trac.webkit.org/changeset/83873
    return blob.webkitSlice(start, opt_end);
  } else if (blob.mozSlice) {
    // Natively accepts negative indices, clamping to the blob range and
    // range end is optional. See https://developer.mozilla.org/en/DOM/Blob
    // and http://hg.mozilla.org/mozilla-central/rev/dae833f4d934
    return blob.mozSlice(start, opt_end);
  } else if (blob.slice) {
    // Old versions of Firefox and Chrome use the original specification.
    // Negative indices are not accepted, only range end is clamped and
    // range end specification is obligatory.
    // See http://www.w3.org/TR/2009/WD-FileAPI-20091117/
    if ((goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher('13.0')) ||
        (goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher('537.1'))) {
      if (start < 0) {
        start += blob.size;
      }
      if (start < 0) {
        start = 0;
      }
      if (opt_end < 0) {
        opt_end += blob.size;
      }
      if (opt_end < start) {
        opt_end = start;
      }
      return blob.slice(start, opt_end - start);
    }
    // IE and the latest versions of Firefox and Chrome use the new
    // specification. Natively accepts negative indices, clamping to the blob
    // range and range end is optional.
    // See http://dev.w3.org/2006/webapi/FileAPI/
    return blob.slice(start, opt_end);
  }
  return null;
};
