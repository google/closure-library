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

goog.module('goog.a11y.aria.AnnouncerTest');
goog.setTestOnly();

const Announcer = goog.require('goog.a11y.aria.Announcer');
const LivePriority = goog.require('goog.a11y.aria.LivePriority');
const MockClock = goog.require('goog.testing.MockClock');
const State = goog.require('goog.a11y.aria.State');
const TagName = goog.require('goog.dom.TagName');
const aria = goog.require('goog.a11y.aria');
const googArray = goog.require('goog.array');
const googDom = goog.require('goog.dom');
const iframe = goog.require('goog.dom.iframe');
const testSuite = goog.require('goog.testing.testSuite');

let sandbox;
let someDiv;
let someSpan;
let mockClock;

function getLiveRegion(priority, domHelper = undefined) {
  const dom = domHelper || googDom.getDomHelper();
  const divs = dom.getElementsByTagNameAndClass(TagName.DIV, null);
  const liveRegions = [];
  googArray.forEach(divs, (div) => {
    if (aria.getState(div, 'live') == priority) {
      liveRegions.push(div);
    }
  });
  assertEquals(1, liveRegions.length);
  return liveRegions[0];
}

function checkLiveRegionContains(text, priority, domHelper = undefined) {
  const liveRegion = getLiveRegion(priority, domHelper);
  mockClock.tick(1);
  assertEquals(text, googDom.getTextContent(liveRegion));
}
testSuite({
  setUp() {
    sandbox = googDom.getElement('sandbox');
    someDiv = googDom.createDom(TagName.DIV, {id: 'someDiv'}, 'DIV');
    someSpan = googDom.createDom(TagName.SPAN, {id: 'someSpan'}, 'SPAN');
    sandbox.appendChild(someDiv);
    someDiv.appendChild(someSpan);

    mockClock = new MockClock(true);
  },

  tearDown() {
    googDom.removeChildren(sandbox);
    someDiv = null;
    someSpan = null;

    goog.dispose(mockClock);
  },

  testAnnouncerAndDispose() {
    const text = 'test content';
    const announcer = new Announcer(googDom.getDomHelper());
    announcer.say(text);
    checkLiveRegionContains(text, 'polite');
    goog.dispose(announcer);
  },

  testAnnouncerTwice() {
    const text = 'test content1';
    const text2 = 'test content2';
    const announcer = new Announcer(googDom.getDomHelper());
    announcer.say(text);
    announcer.say(text2);
    checkLiveRegionContains(text2, 'polite');
    goog.dispose(announcer);
  },

  testAnnouncerTwiceSameMessage() {
    const text = 'test content';
    const announcer = new Announcer(googDom.getDomHelper());
    announcer.say(text);
    const firstLiveRegion = getLiveRegion('polite');
    announcer.say(text, undefined);
    const secondLiveRegion = getLiveRegion('polite');
    assertEquals(firstLiveRegion, secondLiveRegion);
    checkLiveRegionContains(text, 'polite');
    goog.dispose(announcer);
  },

  testAnnouncerAssertive() {
    const text = 'test content';
    const announcer = new Announcer(googDom.getDomHelper());
    announcer.say(text, LivePriority.ASSERTIVE);
    checkLiveRegionContains(text, 'assertive');
    goog.dispose(announcer);
  },

  testAnnouncerInIframe() {
    const text = 'test content';
    const frame = iframe.createWithContent(sandbox);
    const helper =
        googDom.getDomHelper(googDom.getFrameContentDocument(frame).body);
    const announcer = new Announcer(helper);
    announcer.say(text, 'polite', helper);
    checkLiveRegionContains(text, 'polite', helper);
    goog.dispose(announcer);
  },

  testAnnouncerWithAriaHidden() {
    const text = 'test content1';
    const text2 = 'test content2';
    const announcer = new Announcer(googDom.getDomHelper());
    announcer.say(text);
    // Set aria-hidden attribute on the live region (simulates a modal dialog
    // being opened).
    const liveRegion = getLiveRegion('polite');
    aria.setState(liveRegion, State.HIDDEN, true);

    // Announce a new message and make sure that the aria-hidden was removed.
    announcer.say(text2);
    checkLiveRegionContains(text2, 'polite');
    assertEquals('', aria.getState(liveRegion, State.HIDDEN));
    goog.dispose(announcer);
  },
});
