/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for silverlight. */

goog.module('goog.html.silverlightTest');
goog.setTestOnly();

const Const = goog.require('goog.string.Const');
const SafeHtml = goog.require('goog.html.SafeHtml');
const TrustedResourceUrl = goog.require('goog.html.TrustedResourceUrl');
const silverlight = goog.require('goog.html.silverlight');
const testSuite = goog.require('goog.testing.testSuite');

function assertSameHtml(expected, html) {
  assertEquals(expected, SafeHtml.unwrap(html));
}
testSuite({
  testCreateObjectForSilverlight() {
    const trustedResourceUrl = TrustedResourceUrl.fromConstant(
        Const.from('https://google.com/trusted&'));
    assertSameHtml(
        '<object data="data:application/x-silverlight-2," ' +
            'type="application/x-silverlight-2" typemustmatch="" ' +
            'class="test&lt;">' +
            '<param name="source" value="https://google.com/trusted&amp;">' +
            '<param name="onload" value="onload&lt;">' +
            '</object>',
        silverlight.createObject(
            trustedResourceUrl, {'onload': 'onload<'}, {'class': 'test<'}));

    // Cannot override params, case insensitive.
    assertThrows(() => {
      silverlight.createObject(trustedResourceUrl, {'datA': 'cantdothis'});
    });

    // Cannot override attributes, case insensitive.
    assertThrows(() => {
      silverlight.createObject(trustedResourceUrl, {}, {'datA': 'cantdothis'});
    });
  },
});
