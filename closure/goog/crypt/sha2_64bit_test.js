// Copyright 2014 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.crypt.Sha2_64bit_test');
goog.setTestOnly('goog.crypt.Sha2_64bit_test');

goog.require('goog.array');
goog.require('goog.crypt');
goog.require('goog.crypt.Sha384');
goog.require('goog.crypt.Sha512');
goog.require('goog.crypt.Sha512_256');
goog.require('goog.crypt.hashTester');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');


/**
 * Each object in the test vector array is a source text and one or more
 * hashes of that source text.  The source text is either a string or a
 * byte array.
 * <p>
 * All hash values, except for the empty string, are from public sources:
 *   csrc.nist.gov/publications/fips/fips180-2/fips180-2withchangenotice.pdf
 *   csrc.nist.gov/groups/ST/toolkit/documents/Examples/SHA384.pdf
 *   csrc.nist.gov/groups/ST/toolkit/documents/Examples/SHA512_256.pdf
 *   csrc.nist.gov/groups/ST/toolkit/documents/Examples/SHA2_Additional.pdf
 *   en.wikipedia.org/wiki/SHA-2#Examples_of_SHA-2_variants
 */
var TEST_VECTOR = [
  {
    // Make sure the algorithm correctly handles the empty string
    source: '',
    512: 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce' +
        '47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e'
  },
  {
    source: 'abc',
    512: 'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a' +
        '2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f',
    384: 'cb00753f45a35e8bb5a03d699ac65007272c32ab0eded163' +
        '1a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7',
    256: '53048e2681941ef99b2e29b76b4c7dabe4c2d0c634fc6d46e0e2f13107e7af23'
  },
  {
    source: 'abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmn' +
        'hijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu',
    512: '8e959b75dae313da8cf4f72814fc143f8f7779c6eb9f7fa17299aeadb6889018' +
        '501d289e4900f7e4331b99dec4b5433ac7d329eeb6dd26545e96e55b874be909',
    384: '09330c33f71147e83d192fc782cd1b4753111b173b3b05d2' +
        '2fa08086e3b0f712fcc7c71a557e2db966c3e9fa91746039',
    256: '3928e184fb8690f840da3988121d31be65cb9d3ef83ee6146feac861e19b563a'
  },
  {
    source: 'The quick brown fox jumps over the lazy dog',
    512: '07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb64' +
        '2e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6',
    384: 'ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c49' +
        '4011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1',
    256: 'dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d'
  }
];


/**
 * For each integer key N, the value is the SHA-512 value of a string
 * consisting of N repetitions of the character 'a'.
 */
var TEST_FENCEPOST_VECTOR = {
  110: 'c825949632e509824543f7eaf159fb6041722fce3c1cdcbb613b3d37ff107c51' +
      '9417baac32f8e74fe29d7f4823bf6886956603dca5354a6ed6e4a542e06b7d28',
  111: 'fa9121c7b32b9e01733d034cfc78cbf67f926c7ed83e82200ef8681819692176' +
      '0b4beff48404df811b953828274461673c68d04e297b0eb7b2b4d60fc6b566a2',
  112: 'c01d080efd492776a1c43bd23dd99d0a2e626d481e16782e75d54c2503b5dc32' +
      'bd05f0f1ba33e568b88fd2d970929b719ecbb152f58f130a407c8830604b70ca',
  113: '55ddd8ac210a6e18ba1ee055af84c966e0dbff091c43580ae1be703bdb85da31' +
      'acf6948cf5bd90c55a20e5450f22fb89bd8d0085e39f85a86cc46abbca75e24d'
};


/**
 * Simple sanity tests for hash functions.
 */
function testBasicOperations() {
  var sha512 = new goog.crypt.Sha512();
  goog.crypt.hashTester.runBasicTests(sha512);

  var sha384 = new goog.crypt.Sha384();
  goog.crypt.hashTester.runBasicTests(sha384);

  var sha256 = new goog.crypt.Sha512_256();
  goog.crypt.hashTester.runBasicTests(sha256);
}


/**
 * Function called by the actual testers to ensure that specific strings
 * hash to specific published values.
 *
 * Each item in the vector has a "source" and one or more additional keys.
 * If the item has a key matching the key argument passed to this
 * function, it is the expected value of the hash function.
 *
 * @param {!goog.crypt.Sha2_64bit} hasher The hasher to test
 * @param {number} length The length of the resulting hash, in bits.
 *     Also the key to use in TEST_VECTOR for the expected hash value
 */
function hashGoldenTester(hasher, length) {
  goog.array.forEach(TEST_VECTOR, function(data) {
    hasher.update(data.source);
    var digest = hasher.digest();
    assertEquals('Hash digest has the wrong length', length, digest.length * 8);
    if (data[length]) {
      // We're given an expected value
      var expected = goog.crypt.hexToByteArray(data[length]);
      assertElementsEquals(
          'Wrong result for hash' + length + '(\'' + data.source + '\')',
          expected, digest);
    }
    hasher.reset();
  });
}


/** Test that Sha512() returns the published values */
function testHashing512() {
  hashGoldenTester(new goog.crypt.Sha512(), 512);
}


/** Test that Sha384 returns the published values */
function testHashing384() {
  hashGoldenTester(new goog.crypt.Sha384(), 384);
}


/** Test that Sha512_256 returns the published values */
function testHashing256() {
  hashGoldenTester(new goog.crypt.Sha512_256(), 256);
}


/** Test that the opt_length works */
function testHashing_optLength() {
  var hasher = new goog.crypt.Sha512();
  hasher.update('1234567890');
  var digest1 = hasher.digest();
  hasher.reset();
  hasher.update('12345678901234567890', 10);
  var digest2 = hasher.digest();
  assertElementsEquals(digest1, digest2);
}


/**
 * Make sure that we correctly handle strings whose length is 110-113.
 * This is the area where we are likely to hit fencepost errors in the padding
 * code.
 */
function testFencepostErrors() {
  var hasher = new goog.crypt.Sha512();
  A64 = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  A128 = A64 + A64;
  for (var i = 110; i <= 113; i++) {
    hasher.update(A128, i);
    var digest = hasher.digest();
    var expected = goog.crypt.hexToByteArray(TEST_FENCEPOST_VECTOR[i]);
    assertElementsEquals('Fencepost ' + i, expected, digest);
    hasher.reset();
  }
}


/** Test one really large string using SHA512 */
function testHashing512Large() {
  // This test tends to time out on IE7 and IE8. See b/22873770.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher('9')) {
    var hasher = new goog.crypt.Sha512();
    hasher.update(goog.array.repeat(0, 1000000));
    var digest = hasher.digest();
    var expected = goog.crypt.hexToByteArray(
        'ce044bc9fd43269d5bbc946cbebc3bb711341115cc4abdf2edbc3ff2c57ad4b1' +
        '5deb699bda257fea5aef9c6e55fcf4cf9dc25a8c3ce25f2efe90908379bff7ed');
    assertElementsEquals(expected, digest);
  }
}


/** Check that the code throws an error for bad input */
function testBadInput_nullNotAllowed() {
  var hasher = new goog.crypt.Sha512();
  assertThrows('Null input not allowed', function() { hasher.update({}); });
}

function testBadInput_noFloatingPoint() {
  var hasher = new goog.crypt.Sha512();
  assertThrows('Floating point not allows', function() {
    hasher.update([1, 2, 3, 4, 4.5]);
  });
}

function testBadInput_negativeNotAllowed() {
  var hasher = new goog.crypt.Sha512();
  assertThrows('Negative not allowed', function() {
    hasher.update([1, 2, 3, 4, -10]);
  });
}

function testBadInput_mustBeByteArray() {
  var hasher = new goog.crypt.Sha512();
  assertThrows('Must be byte array', function() {
    hasher.update([1, 2, 3, 4, {}]);
  });
}

function testBadInput_byteTooLarge() {
  var hasher = new goog.crypt.Sha512();
  assertThrows('>255 not allowed', function() {
    hasher.update([1, 2, 3, 4, 256]);
  });
}

function testBadInput_characterTooLarge() {
  var hasher = new goog.crypt.Sha512();
  assertThrows('>255 not allowed', function() {
    hasher.update('abc' + String.fromCharCode(256));
  });
}


function testHasherNeedsReset_beforeDigest() {
  var hasher = new goog.crypt.Sha512();
  hasher.update('abc');
  hasher.digest();
  assertThrows('Need reset after digest', function() { hasher.digest(); });
}


function testHasherNeedsReset_beforeUpdate() {
  var hasher = new goog.crypt.Sha512();
  hasher.update('abc');
  hasher.digest();
  assertThrows('Need reset after digest', function() { hasher.update('abc'); });
}

function testHashingArrayLike() {
  // Create array-like object
  var obj = {};
  obj.length = 26;
  for (var i = 0; i < 26; i++) {
    obj[i] = 97 + i;
  }

  // Check hashing
  var hasher = new goog.crypt.Sha512();
  hasher.update(obj);
  var digest1 = hasher.digest();

  hasher.reset();

  hasher.update('abcdefghijklmnopqrstuvwxyz', 26);
  var digest2 = hasher.digest();

  assertElementsEquals(digest1, digest2);
}
