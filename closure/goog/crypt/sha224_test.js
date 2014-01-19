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

goog.provide('goog.crypt.Sha224Test');
goog.setTestOnly('goog.crypt.Sha224Test');

goog.require('goog.crypt');
goog.require('goog.crypt.Sha224');
goog.require('goog.crypt.hashTester');
goog.require('goog.testing.jsunit');

function testBasicOperations() {
  var sha224 = new goog.crypt.Sha224();
  goog.crypt.hashTester.runBasicTests(sha224);
}

function testHashing() {
  // Test vectors from:
  // csrc.nist.gov/publications/fips/fips180-2/fips180-2withchangenotice.pdf

  var sha224 = new goog.crypt.Sha224();

  // One block message.
  sha224.update(goog.crypt.stringToByteArray('abc'));
  assertElementsEquals(
      goog.crypt.hexToByteArray(
          '23097d223405d8228642a477bda2' +
          '55b32aadbce4bda0b3f7e36c9da7'),
      sha224.digest());

  // Multi-block message.
  sha224.reset();
  sha224.update(
      goog.crypt.stringToByteArray(
          'abcdbcdecdefdefgefghfghighij' +
          'hijkijkljklmklmnlmnomnopnopq'));
  assertElementsEquals(
      goog.crypt.hexToByteArray(
          '75388b16512776cc5dba5da1fd89' +
          '0150b0c6455cb4f58b1952522525'),
      sha224.digest());
}
