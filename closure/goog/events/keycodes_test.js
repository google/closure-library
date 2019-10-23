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

goog.module('goog.events.KeyCodesTest');
goog.setTestOnly('goog.events.KeyCodesTest');

const BrowserEvent = goog.require('goog.events.BrowserEvent');
const KeyCodes = goog.require('goog.events.KeyCodes');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const googObject = goog.require('goog.object');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');


let stubs;

testSuite({
  setUpPage() {
    stubs = new PropertyReplacer();
  },

  tearDown() {
    stubs.reset();
  },

  testTextModifyingKeys() {
    const specialTextModifiers = googObject.createSet(
        KeyCodes.BACKSPACE, KeyCodes.DELETE, KeyCodes.ENTER, KeyCodes.MAC_ENTER,
        KeyCodes.TAB, KeyCodes.WIN_IME);

    if (!userAgent.GECKO) {
      specialTextModifiers[KeyCodes.WIN_KEY_FF_LINUX] = 1;
    }

    const keysToTest = {};
    for (const keyId in KeyCodes) {
      const key = KeyCodes[keyId];
      if (goog.isFunction(key)) {
        // skip static methods
        continue;
      }

      keysToTest[keyId] = key;
    }
    for (let i = KeyCodes.FIRST_MEDIA_KEY; i <= KeyCodes.LAST_MEDIA_KEY; i++) {
      keysToTest['MEDIA_KEY_' + i] = i;
    }


    for (const keyId in keysToTest) {
      const key = keysToTest[keyId];
      const fakeEvent = createEventWithKeyCode(key);

      if (KeyCodes.isCharacterKey(key) || (key in specialTextModifiers)) {
        assertTrue(
            'Expected key to modify text: ' + keyId,
            KeyCodes.isTextModifyingKeyEvent(fakeEvent));
      } else {
        assertFalse(
            'Expected key to not modify text: ' + keyId,
            KeyCodes.isTextModifyingKeyEvent(fakeEvent));
      }
    }
  },

  testKeyCodeZero() {
    const zeroEvent = createEventWithKeyCode(0);
    assertEquals(!userAgent.GECKO, KeyCodes.isTextModifyingKeyEvent(zeroEvent));
    assertEquals(
        userAgent.WEBKIT || userAgent.EDGE, KeyCodes.isCharacterKey(0));
  },

  testPhantomKey() {
    // KeyCode 255 deserves its own test to make sure this does not regress,
    // because it's so weird. See the comments in the KeyCode enum.
    const fakeEvent = createEventWithKeyCode(KeyCodes.PHANTOM);
    assertFalse(
        'Expected phantom key to not modify text',
        KeyCodes.isTextModifyingKeyEvent(fakeEvent));
    assertFalse(KeyCodes.isCharacterKey(fakeEvent));
  },

  testNonUsKeyboards() {
    const fakeEvent = createEventWithKeyCode(1092 /* Russian a */);
    assertTrue(
        'Expected key to not modify text: 1092',
        KeyCodes.isTextModifyingKeyEvent(fakeEvent));
  },

  testNormalizeGeckoKeyCode() {
    stubs.set(userAgent, 'GECKO', true);

    // Test Gecko-specific key codes.
    assertEquals(
        KeyCodes.normalizeGeckoKeyCode(KeyCodes.FF_EQUALS), KeyCodes.EQUALS);
    assertEquals(
        KeyCodes.normalizeKeyCode(KeyCodes.FF_EQUALS), KeyCodes.EQUALS);

    assertEquals(
        KeyCodes.normalizeGeckoKeyCode(KeyCodes.FF_SEMICOLON),
        KeyCodes.SEMICOLON);
    assertEquals(
        KeyCodes.normalizeKeyCode(KeyCodes.FF_SEMICOLON), KeyCodes.SEMICOLON);

    assertEquals(
        KeyCodes.normalizeGeckoKeyCode(KeyCodes.MAC_FF_META), KeyCodes.META);
    assertEquals(
        KeyCodes.normalizeKeyCode(KeyCodes.MAC_FF_META), KeyCodes.META);

    assertEquals(
        KeyCodes.normalizeGeckoKeyCode(KeyCodes.WIN_KEY_FF_LINUX),
        KeyCodes.WIN_KEY);
    assertEquals(
        KeyCodes.normalizeKeyCode(KeyCodes.WIN_KEY_FF_LINUX), KeyCodes.WIN_KEY);

    // Test general key codes.
    assertEquals(
        KeyCodes.normalizeGeckoKeyCode(KeyCodes.COMMA), KeyCodes.COMMA);
    assertEquals(KeyCodes.normalizeKeyCode(KeyCodes.COMMA), KeyCodes.COMMA);
  },

  testNormalizeMacWebKitKeyCode() {
    stubs.set(userAgent, 'GECKO', false);
    stubs.set(userAgent, 'MAC', true);
    stubs.set(userAgent, 'WEBKIT', true);

    // Test Mac WebKit specific key codes.
    assertEquals(
        KeyCodes.normalizeMacWebKitKeyCode(KeyCodes.MAC_WK_CMD_LEFT),
        KeyCodes.META);
    assertEquals(
        KeyCodes.normalizeKeyCode(KeyCodes.MAC_WK_CMD_LEFT), KeyCodes.META);

    assertEquals(
        KeyCodes.normalizeMacWebKitKeyCode(KeyCodes.MAC_WK_CMD_RIGHT),
        KeyCodes.META);
    assertEquals(
        KeyCodes.normalizeKeyCode(KeyCodes.MAC_WK_CMD_RIGHT), KeyCodes.META);

    // Test general key codes.
    assertEquals(
        KeyCodes.normalizeMacWebKitKeyCode(KeyCodes.COMMA), KeyCodes.COMMA);
    assertEquals(KeyCodes.normalizeKeyCode(KeyCodes.COMMA), KeyCodes.COMMA);
  },

});


/**
 * @param {number} i
 * @return {!BrowserEvent}
 */
function createEventWithKeyCode(i) {
  const fakeEvent = new BrowserEvent('keydown');
  fakeEvent.keyCode = i;
  return fakeEvent;
}
