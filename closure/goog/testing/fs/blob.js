// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Mock blob object.
 *
 */

goog.provide('goog.testing.fs.Blob');

goog.require('goog.crypt');
goog.require('goog.crypt.base64');



/**
 * A mock Blob object. The data is stored as a string.
 *
 * @param {string=} opt_data The string data encapsulated by the blob.
 * @param {string=} opt_type The mime type of the blob.
 * @constructor
 */
goog.testing.fs.Blob = function(opt_data, opt_type) {
  /**
   * @see http://www.w3.org/TR/FileAPI/#dfn-type
   * @type {string}
   */
  this.type = opt_type || '';

  this.setDataInternal(opt_data || '');
};


/**
 * The data encapsulated by the blob as an Array of bytes, a "byte" being a
 * JS number in the range 0-255.
 * @type {Array<number>}
 * @private
 */
goog.testing.fs.Blob.prototype.data_;


/**
 * @see http://www.w3.org/TR/FileAPI/#dfn-size
 * @type {number}
 */
goog.testing.fs.Blob.prototype.size;


/**
 * Creates a blob with bytes of a blob ranging from the optional start
 * parameter up to but not including the optional end parameter, and with a type
 * attribute that is the value of the optional contentType parameter.
 * @see http://www.w3.org/TR/FileAPI/#dfn-slice
 * @param {number=} opt_start The start byte offset.
 * @param {number=} opt_end The end point of a slice.
 * @param {string=} opt_contentType The type of the resulting Blob.
 * @return {!goog.testing.fs.Blob} The result blob of the slice operation.
 */
goog.testing.fs.Blob.prototype.slice = function(
    opt_start, opt_end, opt_contentType) {
  var relativeStart;
  if (goog.isNumber(opt_start)) {
    relativeStart = (opt_start < 0) ?
        Math.max(this.size + opt_start, 0) :
        Math.min(opt_start, this.size);
  } else {
    relativeStart = 0;
  }
  var relativeEnd;
  if (goog.isNumber(opt_end)) {
    relativeEnd = (opt_end < 0) ?
        Math.max(this.size + opt_end, 0) :
        Math.min(opt_end, this.size);
  } else {
    relativeEnd = this.size;
  }
  var span = Math.max(relativeEnd - relativeStart, 0);
  var blob =
      new goog.testing.fs.Blob('', opt_contentType);
  blob.setDataBytes_(this.data_.slice(relativeStart, relativeStart + span));
  return blob;
};


/**
 * @return {string} The string data encapsulated by the blob as UTF-8.
 * @override
 */
goog.testing.fs.Blob.prototype.toString = function() {
  return goog.crypt.utf8ByteArrayToString(this.data_);
};


/**
 * @return {!ArrayBuffer} The string data encapsulated by the blob as an
 *     ArrayBuffer.
 */
goog.testing.fs.Blob.prototype.toArrayBuffer = function() {
  var buf = new ArrayBuffer(this.data_.length);
  var arr = new Uint8Array(buf);
  for (var i = 0; i < this.data_.length; i++) {
    arr[i] = this.data_[i];
  }
  return buf;
};


/**
 * @return {string} The string data encapsulated by the blob as a data: URI.
 */
goog.testing.fs.Blob.prototype.toDataUrl = function() {
  return 'data:' + this.type + ';base64,' +
      goog.crypt.base64.encodeByteArray(this.data_);
};


/**
 * Sets the internal contents of the blob. This should only be called by other
 * functions inside the {@code goog.testing.fs} namespace.
 *
 * @param {Array<number>} data The data for this Blob as an Array of bytes,
 *     a "byte" being a JS number in the range 0-255.
 * @private
 */
goog.testing.fs.Blob.prototype.setDataBytes_ = function(data) {
  this.data_ = data;
  this.size = this.data_.length;
};


/**
 * Sets the internal contents of the blob to a string.
 * @param {string} data An UTF-8 string.
 */
goog.testing.fs.Blob.prototype.setDataInternal = function(data) {
  this.setDataBytes_(goog.crypt.stringToUtf8ByteArray(data));
};

