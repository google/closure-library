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

goog.module('goog.testing.fsTest');
goog.setTestOnly();

const FsBlob = goog.require('goog.testing.fs.Blob');
const fs = goog.require('goog.testing.fs');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testObjectUrls() {
    const blob = fs.getBlob('foo');
    const url = fs.createObjectUrl(blob);
    assertTrue(fs.isObjectUrlGranted(blob));
    fs.revokeObjectUrl(url);
    assertFalse(fs.isObjectUrlGranted(blob));
  },

  testGetBlob() {
    assertEquals(
        new FsBlob('foobarbaz').toString(),
        fs.getBlob('foo', 'bar', 'baz').toString());
    assertEquals(
        new FsBlob('foobarbaz').toString(),
        fs.getBlob('foo', new FsBlob('bar'), 'baz').toString());
  },

  testBlobToString() {
    return fs.blobToString(new FsBlob('foobarbaz')).then((result) => {
      assertEquals('foobarbaz', result);
    });
  },

  testGetBlobWithProperties() {
    assertEquals(
        'data:spam/eggs;base64,Zm9vYmFy',
        new fs.getBlobWithProperties(['foo', new FsBlob('bar')], 'spam/eggs')
            .toDataUrl());
  },

  testSliceBlob() {
    let myBlob = new FsBlob('0123456789');
    let actual = new fs.sliceBlob(myBlob, 1, 3);
    let expected = new FsBlob('12');
    assertEquals(expected.toString(), actual.toString());

    myBlob = new FsBlob('0123456789');
    actual = new fs.sliceBlob(myBlob, 0, -1);
    expected = new FsBlob('012345678');
    assertEquals(expected.toString(), actual.toString());
  },
});
