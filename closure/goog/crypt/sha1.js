// Copyright 2005 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new goog.crypt.sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */

goog.provide('goog.crypt.Sha1');

goog.require('goog.crypt.Hash');



/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @extends {goog.crypt.Hash}
 * @final
 * @struct
 */
goog.crypt.Sha1 = function() {
  goog.crypt.Sha1.base(this, 'constructor');

  this.blockSize = 512 / 8;

  /**
   * Holds the previous values of accumulated variables a-e in the compress_
   * function.
   * @type {!Array.<number>|Uint32Array}
   * @private
   */
  this.chain_ = goog.global['Uint32Array'] ? new Uint32Array(5) : [];

  /**
   * A buffer holding the partially computed hash result.
   * @type {!Array.<number>|Uint8Array}
   * @private
   */
  this.buf_ = goog.global['Uint8Array'] ? new Uint8Array(64) : [];

  /**
   * An array of 80 words, each a part of the message to be hashed.  Referred to
   * as the message schedule in the docs.
   * @type {!Array.<number>|Uint32Array}
   * @private
   */
  this.W_ = goog.global['Uint32Array'] ? new Uint32Array(80) : [];

  /**
   * Contains data needed to pad messages less than 64 bytes.
   * @type {!Array.<number>|Uint8Array}
   * @private
   */
  this.pad_ = goog.global['Uint8Array'] ? new Uint8Array(this.blockSize) : [];

  this.pad_[0] = 128;
  for (var i = 1; i < this.blockSize; ++i) {
    this.pad_[i] = 0;
  }

  /**
   * @private {number}
   */
  this.inbuf_ = 0;

  /**
   * @private {number}
   */
  this.total_ = 0;

  this.reset();
};
goog.inherits(goog.crypt.Sha1, goog.crypt.Hash);


/** @override */
goog.crypt.Sha1.prototype.reset = function() {
  this.chain_[0] = 0x67452301;
  this.chain_[1] = 0xefcdab89;
  this.chain_[2] = 0x98badcfe;
  this.chain_[3] = 0x10325476;
  this.chain_[4] = 0xc3d2e1f0;

  this.inbuf_ = 0;
  this.total_ = 0;
};


/**
 * Internal compress helper function.
 * @param {Array.<number>|Uint8Array} buf Block to compress.
 * @private
 */
goog.crypt.Sha1.prototype.compress_ = function(buf) {
  var W = this.W_;
  var offset = 0;
  for (var i = 0; i < 16; i++) {
    W[i] = (buf[offset] << 24) |
        (buf[offset + 1] << 16) |
        (buf[offset + 2] << 8) |
        (buf[offset + 3]);
    offset += 4;
  }

  // expand to 80 words
  for (var i = 16; i < 80; i++) {
    var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
    W[i] = ((t << 1) | (t >>> 31)) | 0;
  }

  var a = this.chain_[0] | 0;
  var b = this.chain_[1] | 0;
  var c = this.chain_[2] | 0;
  var d = this.chain_[3] | 0;
  var e = this.chain_[4] | 0;
  var f = 0;
  var k = 0;

  for (var i = 0; i < 80; i++) {
    if (i < 40) {
      if (i < 20) {
        f = d ^ (b & (c ^ d));
        k = 0x5a827999;
      } else {
        f = b ^ c ^ d;
        k = 0x6ed9eba1;
      }
    } else {
      if (i < 60) {
        f = (b & c) | (d & (b | c));
        k = 0x8f1bbcdc;
      } else {
        f = b ^ c ^ d;
        k = 0xca62c1d6;
      }
    }

    // As a performance optimization, construct the sum a pair at a time
    // with casting to integer (bitwise OR) to eliminate unnecessary
    // double<->integer conversions.  Original statement is:
    //    var t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) | 0;
    var partialSum1 = (((a << 5) | (a >>> 27)) + f) | 0;
    var partialSum2 = (e + (k | 0)) | 0;
    var partialSum3 = (partialSum2 + (W[i] | 0)) | 0;
    var t = (partialSum1 + partialSum3) | 0;

    e = d;
    d = c;
    c = ((b << 30) | (b >>> 2)) | 0;
    b = a;
    a = t;
  }

  this.chain_[0] = (this.chain_[0] + a) | 0;
  this.chain_[1] = (this.chain_[1] + b) | 0;
  this.chain_[2] = (this.chain_[2] + c) | 0;
  this.chain_[3] = (this.chain_[3] + d) | 0;
  this.chain_[4] = (this.chain_[4] + e) | 0;
};


/** @override */
goog.crypt.Sha1.prototype.update = function(bytes, opt_length) {
  if (!goog.isDef(opt_length)) {
    opt_length = bytes.length;
  }

  var n = 0;
  var buf = this.buf_;
  var inbuf = this.inbuf_;

  while (n < opt_length) {
    if (goog.isString(bytes)) {
      while (n < opt_length) {
        buf[inbuf] = bytes.charCodeAt(n);
        ++inbuf;
        ++n;
        if (inbuf == this.blockSize) {
          this.compress_(buf);
          inbuf = 0;
        }
      }
    } else {
      while (n < opt_length) {
        buf[inbuf] = bytes[n];
        ++inbuf;
        ++n;
        if (inbuf == this.blockSize) {
          this.compress_(buf);
          inbuf = 0;
        }
      }
    }
  }

  this.inbuf_ = inbuf;
  this.total_ += opt_length;
};


/** @override */
goog.crypt.Sha1.prototype.digest = function() {
  var digest = [];
  var totalBits = this.total_ * 8;

  // Add pad 0x80 0x00*.
  if (this.inbuf_ < 56) {
    this.update(this.pad_, 56 - this.inbuf_);
  } else {
    this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
  }

  // Add # bits.
  for (var i = this.blockSize - 1; i >= 56; i--) {
    this.buf_[i] = totalBits & 255;
    totalBits /= 256; // Don't use bit-shifting here!
  }

  this.compress_(this.buf_);

  var n = 0;
  for (var i = 0; i < 5; i++) {
    for (var j = 24; j >= 0; j -= 8) {
      digest[n] = (this.chain_[i] >> j) & 255;
      ++n;
    }
  }

  return digest;
};
