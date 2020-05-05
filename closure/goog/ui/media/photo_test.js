/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.ui.media.PhotoTest');
goog.setTestOnly();

const MediaModel = goog.require('goog.ui.media.MediaModel');
const Photo = goog.require('goog.ui.media.Photo');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');
const testing = goog.require('goog.html.testing');

let control;
const PHOTO_URL = testing.newTrustedResourceUrlForTest('http://foo/bar.jpg');

testSuite({
  setUp() {
    const photo = new MediaModel(PHOTO_URL, 'title', 'description');
    photo.setPlayer(new MediaModel.Player(PHOTO_URL));
    control = Photo.newControl(photo);
  },

  tearDown() {
    control.dispose();
  },

  testBasicRendering() {
    control.render();
    const el = dom.getElementsByTagNameAndClass(TagName.DIV, Photo.CSS_CLASS);
    assertEquals(1, el.length);
    const img = dom.getElementsByTagNameAndClass(
        TagName.IMG, Photo.CSS_CLASS + '-image');
    assertEquals(1, img.length);
    const caption = dom.getElementsByTagNameAndClass(
        TagName.DIV, Photo.CSS_CLASS + '-caption');
    assertEquals(1, caption.length);
    const content = dom.getElementsByTagNameAndClass(
        TagName.DIV, Photo.CSS_CLASS + '-description');
    assertEquals(1, content.length);
  },
});
