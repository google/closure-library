// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.a11y.aria.AnnouncerTest');
goog.setTestOnly('goog.a11y.aria.AnnouncerTest');

goog.require('goog.a11y.aria');
goog.require('goog.a11y.aria.Announcer');
goog.require('goog.a11y.aria.LivePriority');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.iframe');
goog.require('goog.testing.jsunit');

var sandbox;
var someDiv;
var someSpan;

function setUp() {
  sandbox = goog.dom.getElement('sandbox');
  someDiv = goog.dom.createDom('div', {id: 'someDiv'}, 'DIV');
  someSpan = goog.dom.createDom('span', {id: 'someSpan'}, 'SPAN');
  sandbox.appendChild(someDiv);
  someDiv.appendChild(someSpan);
}

function tearDown() {
  sandbox.innerHTML = '';
  someDiv = null;
  someSpan = null;
}

function testAnnouncerAndDispose() {
  var text = 'test content';
  var announcer = new goog.a11y.aria.Announcer(goog.dom.getDomHelper());
  announcer.say(text);
  checkLiveRegionContains(text, 'polite');
  goog.dispose(announcer);
}

function testAnnouncerTwice() {
  var text = 'test content1';
  var text2 = 'test content2';
  var announcer = new goog.a11y.aria.Announcer(goog.dom.getDomHelper());
  announcer.say(text);
  announcer.say(text2);
  checkLiveRegionContains(text2, 'polite');
  goog.dispose(announcer);
}

function testAnnouncerAssertive() {
  var text = 'test content';
  var announcer = new goog.a11y.aria.Announcer(goog.dom.getDomHelper());
  announcer.say(text, goog.a11y.aria.LivePriority.ASSERTIVE);
  checkLiveRegionContains(text, 'assertive');
  goog.dispose(announcer);
}

function testAnnouncerInIframe() {
  var text = 'test content';
  var frame = goog.dom.iframe.createWithContent(sandbox);
  var helper = goog.dom.getDomHelper(
      goog.dom.getFrameContentDocument(frame).body);
  var announcer = new goog.a11y.aria.Announcer(helper);
  announcer.say(text, 'polite', helper);
  checkLiveRegionContains(text, 'polite', helper);
  goog.dispose(announcer);
}

function checkLiveRegionContains(text, priority, opt_domHelper) {
  var dom = opt_domHelper || goog.dom.getDomHelper();
  var divs = dom.getElementsByTagNameAndClass('div', null);
  var liveRegions = [];
  goog.array.forEach(divs, function(div) {
    if (goog.a11y.aria.getState(div, 'live') == priority) {
      liveRegions.push(div);
    }
  });
  assertEquals(1, liveRegions.length);
  assertEquals(text, goog.dom.getTextContent(liveRegions[0]));
}
