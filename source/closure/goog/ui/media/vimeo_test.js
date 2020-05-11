/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.ui.media.VimeoTest');
goog.setTestOnly();

const FlashObject = goog.require('goog.ui.media.FlashObject');
const Media = goog.require('goog.ui.media.Media');
const TagName = goog.require('goog.dom.TagName');
const Vimeo = goog.require('goog.ui.media.Vimeo');
const VimeoModel = goog.require('goog.ui.media.VimeoModel');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

let vimeo;
let control;
const VIMEO_ID = '3001295';
const VIMEO_URL = `http://vimeo.com/${VIMEO_ID}`;
const VIMEO_URL_HD = `http://vimeo.com/hd#${VIMEO_ID}`;
const VIMEO_URL_SECURE = `https://vimeo.com/${VIMEO_ID}`;
const parent = dom.createElement(TagName.DIV);

function assertExtractsCorrectly(expectedVideoId, url) {
  const model = VimeoModel.newInstance(url);
  assertEquals(`Video id for ${url}`, expectedVideoId, model.getVideoId());
}
testSuite({
  setUp() {
    vimeo = new Vimeo();
    const model = new VimeoModel(VIMEO_ID, 'vimeo caption');
    control = new Media(model, vimeo);
    control.setSelected(true);
  },

  tearDown() {
    control.dispose();
  },

  testBasicRendering() {
    control.render(parent);
    const el =
        dom.getElementsByTagNameAndClass(TagName.DIV, Vimeo.CSS_CLASS, parent);
    assertEquals(1, el.length);
    assertEquals(VIMEO_URL_SECURE, control.getDataModel().getUrl());
  },

  testParsingUrl() {
    assertExtractsCorrectly(VIMEO_ID, VIMEO_URL);
    assertExtractsCorrectly(VIMEO_ID, VIMEO_URL_HD);
    assertExtractsCorrectly(VIMEO_ID, VIMEO_URL_SECURE);

    const invalidUrl = 'http://invalidUrl/filename.doc';
    const e = assertThrows('parser expects a well formed URL', () => {
      VimeoModel.newInstance(invalidUrl);
    });
    assertEquals(`failed to parse vimeo url: ${invalidUrl}`, e.message);
  },

  testBuildingUrl() {
    assertEquals(VIMEO_URL_SECURE, VimeoModel.buildUrl(VIMEO_ID));
  },

  testCreatingModel() {
    const model = new VimeoModel(VIMEO_ID);
    assertEquals(VIMEO_ID, model.getVideoId());
    assertEquals(VIMEO_URL_SECURE, model.getUrl());
    assertUndefined(model.getCaption());
  },

  testCreatingDomOnInitialState() {
    control.render(parent);
    const caption = dom.getElementsByTagNameAndClass(
        TagName.DIV, Vimeo.CSS_CLASS + '-caption', parent);
    assertEquals(1, caption.length);

    const flash = dom.getElementsByTagNameAndClass(
        TagName.DIV, FlashObject.CSS_CLASS, parent);
    assertEquals(1, flash.length);
  },
});
