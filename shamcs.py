"""Script to generate MC tests for Closure SHA functions"""

from binascii import hexlify
from hashlib import sha1, sha224, sha256, sha384, sha512

from Crypto.Cipher import AES

C = AES.new('Closure Library SHA KATs        ')
MC_START = ''.join(C.encrypt(('MC' * 15) + '\x00' + chr(i)) for i in range(16))


TEST_TEMPLATE = '''\
function test{shatitle}() {{
  var inital_state = '{initial_state}';
  var count = {count};
  var state = goog.crypt.stringToByteArray(initial_state);
  var digest;
  for (var i = 0; i < count; i++) {{
    sha.reset();
    sha.update(state);
    digest = sha.digest();
    state = goog.array.concat(digest, state);
  }}
  assertEquals({lenfinal}, state.length);
  assertEquals('{expected}',
    goog.crypt.byteArrayToHex(digest));
}}
'''


def genmc(sha, name, blocklen, digestlen):
    count = (2 ** 17) // digestlen
    print('count = {}'.format(count))
    state = MC_START
    for i in range(count):
        digest = sha(state).digest()
        state = digest + state
    final_state = state

    print(len(final_state))
    print('final_state = {}'.format(hexlify(digest)))


SHAS = [(sha1, 'sha1', 64, 160//8),
        (sha224, 'sha224', 64, 224//8),
        (sha256, 'sha256', 64, 256//8),
        (sha384, 'sha384', 128, 384//8),
        (sha512, 'sha512', 128, 512//8)]

for s in SHAS:
    genmc(*s)
