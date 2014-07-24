// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.crypt.Sha256Test');
goog.setTestOnly('goog.crypt.Sha256Test');

goog.require('goog.array');
goog.require('goog.crypt');
goog.require('goog.crypt.Sha256');
goog.require('goog.crypt.hashTester');
goog.require('goog.testing.jsunit');

function testBasicOperations() {
  var sha256 = new goog.crypt.Sha256();
  goog.crypt.hashTester.runBasicTests(sha256);
}

function testHashing() {
  // Test vectors from:
  // csrc.nist.gov/publications/fips/fips180-2/fips180-2withchangenotice.pdf

  var sha256 = new goog.crypt.Sha256();

  // Empty message.
  sha256.update([]);
  assertElementsEquals(
      goog.crypt.hexToByteArray(
          'e3b0c44298fc1c149afbf4c8996fb924' +
          '27ae41e4649b934ca495991b7852b855'),
      sha256.digest());

  // One block message.
  sha256.reset();
  sha256.update(goog.crypt.stringToByteArray('abc'));
  assertElementsEquals(
      goog.crypt.hexToByteArray(
          'ba7816bf8f01cfea414140de5dae2223' +
          'b00361a396177a9cb410ff61f20015ad'),
      sha256.digest());

  // Multi-block message.
  sha256.reset();
  sha256.update(
      goog.crypt.stringToByteArray(
          'abcdbcdecdefdefgefghfghighij' +
          'hijkijkljklmklmnlmnomnopnopq'));
  assertElementsEquals(
      goog.crypt.hexToByteArray(
          '248d6a61d20638b8e5c026930c3e6039' +
          'a33ce45964ff2167f6ecedd419db06c1'),
      sha256.digest());

  sha256.reset();
  sha256.update(goog.string.repeat('a', 1024));
  assertEquals('2edc986847e209b4016e141a6dc8716d3207350f416969382d431539bf292e4a',
               goog.crypt.byteArrayToHex(sha256.digest()));

  sha256.reset();
  sha256.update(goog.string.repeat('a', 55));
  assertEquals('9f4390f8d30c2dd92ec9f095b65e2b9ae9b0a925a5258e241c9f1e910f734318',
               goog.crypt.byteArrayToHex(sha256.digest()));

  sha256.reset();
  sha256.update(goog.crypt.stringToByteArray(goog.string.repeat('a', 1024)));
  assertElementsEquals(
    goog.crypt.hexToByteArray(
        '2edc986847e209b4016e141a6dc8716d' +
        '3207350f416969382d431539bf292e4a'),
    sha256.digest());
  sha256.reset();
}

function testOffset() {
  var sha256 = new goog.crypt.Sha256();

  // Test that offsets work correctly.
  var message = goog.crypt.stringToByteArray(goog.string.repeat('a', 64));
  var expected = goog.crypt.hexToByteArray(
    '3de53b4923d85706b5a9fa5492ee38ab25314bf42203ac22adb15b4e63960c19');

  // Offsets from 0 to 64.
  sha256.reset();
  for (var i = 0; i < 65; i++) {
     sha256.update(message, i);
  }
  assertElementsEquals(expected, sha256.digest());

  // Offsets from 0 to 70 to include empty message cases.
  sha256.reset();
  for (var i = 0; i < 65; i++) {
     sha256.update(message, i);
   }
  assertElementsEquals(expected, sha256.digest());
}

function testShortMonteCarlo() {
  // A Monte Carlo test for short message.
  var sha256 = new goog.crypt.Sha256();

  var expected = goog.crypt.hexToByteArray(
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  sha256.reset();
  var t = goog.array.repeat(0, 32);
  for (var i = 0; i < 16384; i++) {
    var offset = (t[0] & 31) + 1;
    sha256.update(t, offset);
    t = sha256.digest();
    sha256.reset();
  }
  assertElementsEquals(expected, sha256.digest());
}
