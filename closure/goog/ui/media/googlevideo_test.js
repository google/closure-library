/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.ui.media.GoogleVideoTest');
goog.setTestOnly();

const FlashObject = goog.require('goog.ui.media.FlashObject');
const GoogleVideo = goog.require('goog.ui.media.GoogleVideo');
const GoogleVideoModel = goog.require('goog.ui.media.GoogleVideoModel');
const Media = goog.require('goog.ui.media.Media');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

let video;
let control;
const VIDEO_URL_PREFIX = 'https://video.google.com/videoplay?docid=';
const VIDEO_ID = '7582902000166025817';
const VIDEO_URL = VIDEO_URL_PREFIX + VIDEO_ID;
const parent = dom.createElement(TagName.DIV);

function assertExtractsCorrectly(expectedVideoId, url) {
  const model = GoogleVideoModel.newInstance(url);
  assertEquals(`Video id for ${url}`, expectedVideoId, model.getVideoId());
}
testSuite({
  setUp() {
    video = new GoogleVideo();
    const model = new GoogleVideoModel(VIDEO_ID, 'video caption');
    control = new Media(model, video);
    control.setSelected(true);
  },

  tearDown() {
    control.dispose();
  },

  testBasicRendering() {
    control.render(parent);
    const el = dom.getElementsByTagNameAndClass(
        TagName.DIV, GoogleVideo.CSS_CLASS, parent);
    assertEquals(1, el.length);
    assertEquals(VIDEO_URL, control.getDataModel().getUrl());
  },

  testParsingUrl() {
    assertExtractsCorrectly(VIDEO_ID, VIDEO_URL);
    // Test a url with # at the end.
    assertExtractsCorrectly(VIDEO_ID, `${VIDEO_URL}#`);
    // Test a url with a negative docid.
    assertExtractsCorrectly('-123', `${VIDEO_URL_PREFIX}-123`);
    // Test a url with two docids. The valid one is the second.
    assertExtractsCorrectly('123', `${VIDEO_URL}#docid=123`);

    const invalidUrl = 'http://invalidUrl/filename.doc';
    const e = assertThrows('parser expects a well formed URL', () => {
      GoogleVideoModel.newInstance(invalidUrl);
    });
    assertEquals(
        `failed to parse video id from GoogleVideo url: ${invalidUrl}`,
        e.message);
  },

  testBuildingUrl() {
    assertEquals(VIDEO_URL, GoogleVideoModel.buildUrl(VIDEO_ID));
  },

  testCreatingModel() {
    const model = new GoogleVideoModel(VIDEO_ID);
    assertEquals(VIDEO_ID, model.getVideoId());
    assertEquals(VIDEO_URL, model.getUrl());
    assertUndefined(model.getCaption());
  },

  testCreatingDomOnInitialState() {
    control.render(parent);
    const caption = dom.getElementsByTagNameAndClass(
        TagName.DIV, GoogleVideo.CSS_CLASS + '-caption', parent);
    assertEquals(1, caption.length);

    const flash = dom.getElementsByTagNameAndClass(
        TagName.DIV, FlashObject.CSS_CLASS, parent);
    assertEquals(1, flash.length);
  },
});
