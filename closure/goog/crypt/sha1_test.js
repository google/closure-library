// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.crypt.Sha1Test');
goog.setTestOnly();

const Sha1 = goog.require('goog.crypt.Sha1');
const crypt = goog.require('goog.crypt');
const hashTester = goog.require('goog.crypt.hashTester');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

testSuite({
  testBasicOperations() {
    const sha1 = new Sha1();
    hashTester.runBasicTests(sha1);
  },

  testBlockOperations() {
    const sha1 = new Sha1();
    hashTester.runBlockTests(sha1, 64);
  },

  testHashing() {
    // Test vectors from:
    // csrc.nist.gov/publications/fips/fips180-2/fips180-2withchangenotice.pdf

    // Empty stream.
    const sha1 = new Sha1();
    assertEquals(
        'da39a3ee5e6b4b0d3255bfef95601890afd80709',
        crypt.byteArrayToHex(sha1.digest()));

    // Test one-block message.
    sha1.reset();
    sha1.update([0x61, 0x62, 0x63]);
    assertEquals(
        'a9993e364706816aba3e25717850c26c9cd0d89d',
        crypt.byteArrayToHex(sha1.digest()));

    // Test multi-block message.
    sha1.reset();
    sha1.update('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq');
    assertEquals(
        '84983e441c3bd26ebaae4aa1f95129e5e54670f1',
        crypt.byteArrayToHex(sha1.digest()));

    // The following test might cause timeouts on IE7 and IE8. See b/22873770.
    if (!userAgent.IE || userAgent.isVersionOrHigher('9')) {
      // Test long message.
      const thousandAs = [];
      for (let i = 0; i < 1000; ++i) {
        thousandAs[i] = 0x61;
      }
      sha1.reset();
      for (let i = 0; i < 1000; ++i) {
        sha1.update(thousandAs);
      }
      assertEquals(
          '34aa973cd4c4daa4f61eeb2bdbad27316534016f',
          crypt.byteArrayToHex(sha1.digest()));
    }

    // Test standard message.
    sha1.reset();
    sha1.update('The quick brown fox jumps over the lazy dog');
    assertEquals(
        '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12',
        crypt.byteArrayToHex(sha1.digest()));
  },
});
