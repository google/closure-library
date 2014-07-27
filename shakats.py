#!/usr/bin/env python
"""Python script to generate systematic KATs for Closure's SHA tests.

(Because the SHA2-64b implementations, in particular, are fairly complex
this script generates "pseudo-random" inputs to try to test them over a
reasonable domain. The resulting file is large.)
"""
from __future__ import division, print_function

from binascii import hexlify
from hashlib import sha1, sha224, sha256, sha384, sha512

from Crypto.Cipher import AES

# AES256
C = AES.new('Closure Library SHA KATs        ')

TEST_HEADER = '''\
goog.provide('goog.crypt.ShaKatsTest');
goog.setTestOnly('goog.crypt.ShaKatsTest');

goog.require('goog.array');
goog.require('goog.crypt');
goog.require('goog.crypt.Sha1');
goog.require('goog.crypt.Sha224');
goog.require('goog.crypt.Sha256');
goog.require('goog.crypt.Sha384');
goog.require('goog.crypt.Sha512');
goog.require('goog.testing.jsunit');

'''


def katbytes(katlen):
    """Generate a pseudorandom message to digest."""
    n = (katlen + 15) // 16
    s = ''
    for x in range(n):
      block = 'KAT {katlen:04}B: {x:02}/{n:02}'.format(katlen=katlen, x=x, n=n)
      s += C.encrypt(block)
    return s[:katlen]


TEST1_TEMPLATE = '''\
  // {shaname} length {len}
  original_input = goog.crypt.hexToByteArray('{prompt}');
  original_strinput = goog.crypt.byteArrayToString(original_input);
  original_expected = '{kat}';

  input = goog.array.clone(original_input);
  strinput = goog.crypt.byteArrayToString(input);
  expected = original_expected;

  // Sanity check.
  assertEquals(original_expected, expected);
  assertElementsEquals(original_input, input);
  assertEquals(original_strinput, strinput);

  // Single-call bytearray
  sha.reset();
  sha.update(input);
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));
  // Single-call string
  sha.reset();
  sha.update(strinput);
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));
  // Single-call bytearray with explicit length
  sha.reset();
  sha.update(input, {len});
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));
  // Single-call string with explicit length
  sha.reset();
  sha.update(strinput, {len} + 16);
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));
  // Single-call bytearray with explicit length overrun
  sha.reset();
  sha.update(input, {len});
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));
  // Single-call string with explicit length overrun
  sha.reset();
  sha.update(strinput, {len} + 16);
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));
  // Byte-by-byte from bytearray
  sha.reset();
  for (var i = 0; i < {len}; i++) {{
    sha.update(goog.array.slice(input, i, i+1));
  }}
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));
  // Block-by-block from string
  sha.reset();
  for (var i = 0; i < {len}; i += blockSize) {{
    sha.update(strinput.substr(i, blockSize));
  }}
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));
  // (Block+1)-at-a-time from string
  sha.reset();
  for (var i = 0; i < {len}; i += (blockSize + 1)) {{
    sha.update(strinput.substr(i, (blockSize + 1)));
  }}
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));
  // (Block+1)-at-a-time, alternating strings and bytearrays
  sha.reset();
  for (var i = 0; i < {len}; i += (blockSize + 1)) {{
    var inbuf;
    if (i & 1) {{
      inbuf = strinput.substr(i, (blockSize + 1));
    }} else {{
      inbuf = goog.array.slice(input, i, i + (blockSize + 1));
    }}
    sha.update(inbuf);
  }}
  assertEquals(expected,
               goog.crypt.byteArrayToHex(sha.digest()));

  // Sanity check.
  assertEquals(original_expected, expected);
  assertElementsEquals(original_input, input);
  assertEquals(original_strinput, strinput);

'''
SHAS = [[sha1, sha224, sha256, sha384, sha512],
        ['sha1', 'sha224', 'sha256', 'sha384', 'sha512']]

FUNC_TEMPLATE = '''\
function testKats{shatitle}() {{
  var sha = new goog.crypt.{shatitle}();
  var blockSize = sha.blockSize;
  var input = '';
  var expected = '';
  var strinput = '';
  var original_input = '';
  var original_expected = '';
  {tests}
}}

'''

def gen_test1():
  for sha, shaname in zip(*SHAS):
    body = []
    for katlen in range(1585):
      prompt = katbytes(katlen)
      answer = sha(prompt).digest()
      t = TEST1_TEMPLATE.format(prompt=hexlify(prompt), len=katlen,
                                shaname=shaname, kat=hexlify(answer))
      body += [t]
    print(FUNC_TEMPLATE.format(shatitle=shaname.title(), tests='\n'.join(body)))

if __name__ == '__main__':
  print(TEST_HEADER)
  gen_test1()
