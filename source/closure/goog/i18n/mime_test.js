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

goog.module('goog.i18n.mime.encodeTest');
goog.setTestOnly();

const encode = goog.require('goog.i18n.mime.encode');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testEncodeAllAscii() {
    // A string holding all the characters that should be encoded unchanged.
    // Double-quote is doubled to avoid annoying syntax highlighting in emacs,
    // which doesn't recognize the double-quote as being in a string constant.
    const identity =
        '!""#$%&\'()*+,-./0123456789:;<>@ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        '[\\]^`abcdefghijklmnopqrstuvwxyz{|}~';
    assertEquals(identity, encode(identity));
  },

  testEncodeSpecials() {
    assertEquals('=?UTF-8?Q?=f0=9f=92=a9?=', encode('💩'));
    assertEquals('=?UTF-8?Q?=3f=5f=3d_?=', encode('?_= '));
    assertEquals('=?UTF-8?Q?=3f=5f=3d_=22=22?=', encode('?_= ""', true));
  },

  testEncodeUnicode() {
    // Two-byte UTF-8, plus a special
    assertEquals('=?UTF-8?Q?=c2=82=de=a0_dude?=', encode('\u0082\u07a0 dude'));
    // Three-byte UTF-8, plus a special
    assertEquals('=?UTF-8?Q?=e0=a0=80=ef=bf=bf=3d?=', encode('\u0800\uffff='));
  },
});
