/**
 * @fileoverview Tests for whitespace module functions.
 */
goog.module('goog.testing.i18n.whitespace_test');
goog.setTestOnly();

const testSuite = goog.require('goog.testing.testSuite');
const {assertEquals} = goog.require('goog.testing.asserts');
const {normalizeWhitespace} = goog.require('goog.testing.i18n.whitespace');

testSuite({
  testWhitespaceNormalization() {
    assertEquals('', normalizeWhitespace('\u1680'));
    assertEquals('ab', normalizeWhitespace('a\u3000b'));
    assertEquals('abc', normalizeWhitespace('\ta\u00a0\u0020b\u205fc'));
    assertEquals('xy', normalizeWhitespace('x\u0020y'));
    assertEquals('xy', normalizeWhitespace('x\u202fy'));
    assertEquals('xy', normalizeWhitespace('x\t\u00a0y'));
  },
});
