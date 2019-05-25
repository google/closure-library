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

goog.module('goog.editor.plugins.EmoticonsTest');
goog.setTestOnly();

const Emoji = goog.require('goog.ui.emoji.Emoji');
const Emoticons = goog.require('goog.editor.plugins.Emoticons');
const Field = goog.require('goog.editor.Field');
const TagName = goog.require('goog.dom.TagName');
const Uri = goog.require('goog.Uri');
const dom = goog.require('goog.dom');
const googArray = goog.require('goog.array');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let HTML;

function assertUriEquals(expected, actual) {
  const winUri = new Uri(window.location);
  assertEquals(
      winUri.resolve(new Uri(expected)).toString(),
      winUri.resolve(new Uri(actual)).toString());
}
testSuite({
  setUp() {
    HTML = dom.getElement('parent').innerHTML;
  },

  tearDown() {
    dom.getElement('parent').innerHTML = HTML;
  },

  testEmojiWithEmoticonsPlugin() {
    const plugin = new Emoticons();
    const field = new Field('testField');
    field.registerPlugin(plugin);
    field.makeEditable();
    field.focusAndPlaceCursorAtStart();

    const src = 'testdata/emoji/4F4.gif';
    const id = '4F4';
    const emoji = new Emoji(src, id);
    field.execCommand(Emoticons.COMMAND, emoji);

    // The url may be relative or absolute.
    const imgs =
        field.getEditableDomHelper().getElementsByTagNameAndClass(TagName.IMG);
    assertEquals(1, imgs.length);

    const img = imgs[0];
    assertUriEquals(src, img.getAttribute('src'));
    assertEquals(id, img.getAttribute(Emoji.ATTRIBUTE));
    assertEquals(id, img.getAttribute(Emoji.DATA_ATTRIBUTE));

    const range = field.getRange();
    assertNotNull('must have a selection', range);
    assertTrue('range must be a cursor', range.isCollapsed());

    if (!userAgent.IE) {
      const webkitValid = (2 == range.getStartOffset());
      const otherValid =
          (2 ==
           googArray.indexOf(
               range.getContainerElement().childNodes, range.getStartNode()));

      assertTrue('range starts after image', webkitValid || otherValid);
    }

    assertEquals(
        'range must be around image', img.parentElement,
        range.getContainerElement());
  },
});
