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

goog.module('goog.editor.plugins.LinkShortcutPluginTest');
goog.setTestOnly();

const BasicTextFormatter = goog.require('goog.editor.plugins.BasicTextFormatter');
const Field = goog.require('goog.editor.Field');
const KeyCodes = goog.require('goog.events.KeyCodes');
const LinkBubble = goog.require('goog.editor.plugins.LinkBubble');
const LinkShortcutPlugin = goog.require('goog.editor.plugins.LinkShortcutPlugin');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const events = goog.require('goog.testing.events');
const product = goog.require('goog.userAgent.product');
const testSuite = goog.require('goog.testing.testSuite');
const testingDom = goog.require('goog.testing.dom');

let propertyReplacer;

testSuite({
  setUp() {
    propertyReplacer = new PropertyReplacer();
  },

  tearDown() {
    propertyReplacer.reset();
    const field = document.getElementById('cleanup');
    dom.removeChildren(field);
    field.innerHTML = '<div id="field">http://www.google.com/</div>';
  },

  testShortcutCreatesALink() {
    if (product.SAFARI) {
      // TODO(b/20733468): Disabled so we can get the rest of the Closure test
      // suite running in a continuous build. Will investigate later.
      return;
    }

    propertyReplacer.set(window, 'prompt', () => 'http://www.google.com/');
    const linkBubble = new LinkBubble();
    const formatter = new BasicTextFormatter();
    const plugin = new LinkShortcutPlugin();
    const fieldEl = document.getElementById('field');
    const field = new Field('field');
    field.registerPlugin(formatter);
    field.registerPlugin(linkBubble);
    field.registerPlugin(plugin);
    field.makeEditable();
    field.focusAndPlaceCursorAtStart();
    const textNode = testingDom.findTextNode('http://www.google.com/', fieldEl);
    events.fireKeySequence(field.getElement(), KeyCodes.K, {ctrlKey: true});

    const href = dom.getElementsByTagName(TagName.A, field.getElement())[0];
    assertEquals('http://www.google.com/', href.href);
    const bubbleLink = document.getElementById(LinkBubble.TEST_LINK_ID_);
    assertEquals('http://www.google.com/', bubbleLink.innerHTML);
  },
});
