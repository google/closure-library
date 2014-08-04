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


  // Some additional tests.

  // A longer message KAT.
  sha256.reset();
  sha256.update(goog.string.repeat('a', 1024));
  assertEquals(
      '2edc986847e209b4016e141a6dc8716d3207350f416969382d431539bf292e4a',
      goog.crypt.byteArrayToHex(sha256.digest()));

  // (Near-)boundary values:
  // 55B + ubint64 == 63 < 64
  sha256.reset();
  sha256.update(goog.string.repeat('a', 55));
  assertEquals(
      '9f4390f8d30c2dd92ec9f095b65e2b9ae9b0a925a5258e241c9f1e910f734318',
      goog.crypt.byteArrayToHex(sha256.digest()));
  // 56B + ubint64 == 64
  sha256.reset();
  sha256.update(goog.string.repeat('a', 56));
  assertEquals(
      'b35439a4ac6f0948b6d6f9e3c6af0f5f590ce20f1bde7090ef7970686ec6738a',
      goog.crypt.byteArrayToHex(sha256.digest()));
}

function testLength() {
  var sha = new goog.crypt.Sha256();

  // Test that lengths work correctly.
  var message = goog.crypt.hexToByteArray(
      'd9b28b643d16efc8a17a532c05deb79069421bf4cda67f58310ae3bc956e4720' +
      'f9d2ab845d360fe8c19a734c25fed7b089623b14edc69f78512a03dcb58e6740');

  // Lengths from 0 to 64.
  sha.reset();
  for (var i = 0; i < 64; i++) {
    sha.update(message, i);
  }
  assertElementsEquals(goog.crypt.hexToByteArray(
      '6011bfb853f860ae65e32d2ad16323a2c34cac39404415cc946820526055060f'),
      sha.digest());

  // Lengths from 0 to 71 to include message overrun cases.
  sha.reset();
  for (var i = 0; i < 71; i++) {
    sha.update(message, i);
  }
  assertElementsEquals(goog.crypt.hexToByteArray(
      '8e586a48e640619400a2ea428256a091c06f3597c9e8a343528c5efd8b62db8f'),
      sha.digest());
}

function testShortMonteCarlo() {
  // A Monte Carlo test for short message.
  var sha256 = new goog.crypt.Sha256();

  var t = goog.crypt.hexToByteArray(
      '02df179ad95607e1cef33be31fac9030da6b2ed260f19e61773d046610fde14d');
  sha256.reset();
  var t = goog.array.repeat(0, 32);
  for (var i = 0; i < 16384; i++) {
    var offset = (t[0] & 31);
    sha256.update(t, offset);
    t = sha256.digest();
    sha256.reset();
  }
  assertElementsEquals(
      goog.crypt.hexToByteArray(
      '6a9513334da3e141517d28e3115de6a44fe9026e0b1da030c0acc85b4a475ef9'),
      t);
}

function testPreschedule() {
  // Test using prescheduled messages.
  var sha = new goog.crypt.Sha256();
  var message = goog.crypt.hexToByteArray(
      'd9b28b643d16efc8a17a532c05deb79069421bf4cda67f58310ae3bc956e4720' +
      'f9d2ab845d360fe8c19a734c25fed7b089623b14edc69f78512a03dcb58e6740');

  var scheduled = sha.preschedule(message);
  sha.scheduledUpdate(scheduled);
  var w_scheduled = goog.array.toArray(sha.hash_);
  var digest_scheduled = sha.digest();

  sha.reset();
  sha.update(message);
  var w_afterupdate = goog.array.toArray(sha.hash_);
  assertElementsEquals(w_scheduled, w_afterupdate);
  assertElementsEquals(sha.digest(), digest_scheduled);
}
