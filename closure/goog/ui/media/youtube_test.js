// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.media.YoutubeTest');
goog.setTestOnly();

const FlashObject = goog.require('goog.ui.media.FlashObject');
const TagName = goog.require('goog.dom.TagName');
const Youtube = goog.require('goog.ui.media.Youtube');
const YoutubeModel = goog.require('goog.ui.media.YoutubeModel');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

let youtube;
let control;
const YOUTUBE_VIDEO_ID = 'dMH0bHeiRNg';
const YOUTUBE_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;
const parent = dom.createElement(TagName.DIV);

function assertExtractsCorrectly(expectedVideoId, url) {
  const youtube = YoutubeModel.newInstance(url);
  assertEquals(`videoid for ${url}`, expectedVideoId, youtube.getVideoId());
}
testSuite({
  setUp() {
    const model = new YoutubeModel(YOUTUBE_VIDEO_ID, 'evolution of dance');
    control = Youtube.newControl(model);
  },

  tearDown() {
    control.dispose();
  },

  testBasicRendering() {
    control.render(parent);
    const el = dom.getElementsByTagNameAndClass(
        TagName.DIV, Youtube.CSS_CLASS, parent);
    assertEquals(1, el.length);
    assertEquals(YOUTUBE_URL, control.getDataModel().getUrl());
  },

  testParsingUrl() {
    // a simple link
    assertExtractsCorrectly(
        'uddeBVmKTqE', 'http://www.youtube.com/watch?v=uddeBVmKTqE');
    // a simple mobile link
    assertExtractsCorrectly(
        'uddeBVmKTqE', 'http://m.youtube.com/watch?v=uddeBVmKTqE');
    // a secure mobile link
    assertExtractsCorrectly(
        'uddeBVmKTqE', 'https://m.youtube.com/watch?v=uddeBVmKTqE');
    // a simple youtube-nocookie link
    assertExtractsCorrectly(
        'uddeBVmKTqE', 'http://www.youtube-nocookie.com/watch?v=uddeBVmKTqE');
    // a simple /embed/ link
    assertExtractsCorrectly(
        'uddeBVmKTqE', 'http://www.youtube.com/embed/uddeBVmKTqE?controls=0');
    // a -nocookie /embed/ link
    assertExtractsCorrectly(
        'uddeBVmKTqE',
        'http://www.youtube-nocookie.com/embed/uddeBVmKTqE?controls=0');
    // a simple short link
    assertExtractsCorrectly('uddeBVmKTqE', 'http://youtu.be/uddeBVmKTqE');
    // a secure short link
    assertExtractsCorrectly('uddeBVmKTqE', 'https://youtu.be/uddeBVmKTqE');
    // a secure short link with a CGI parameter
    assertExtractsCorrectly(
        'uddeBVmKTqE', 'https://youtu.be/uddeBVmKTqE?feature=channel');
    // a channel link
    assertExtractsCorrectly(
        '4Pb9e1uu3EQ',
        'http://www.youtube.com/watch?v=4Pb9e1uu3EQ&feature=channel');
    // a UK link
    assertExtractsCorrectly(
        'xqWXO87TlH4',
        'http://uk.youtube.com/watch?gl=GB&hl=en-GB&v=xqWXO87TlH4');
    // an India link
    assertExtractsCorrectly(
        '10FKWOn4qGA',
        'http://www.youtube.com/watch?gl=IN&hl=en-GB&v=10FKWOn4qGA');
    // an ad
    assertExtractsCorrectly(
        'wk1_kDJhyBk',
        'http://www.youtube.com/watch?v=wk1_kDJhyBk&feature=yva-video-display');
    // a related video
    assertExtractsCorrectly(
        '7qL2PuLF0SI',
        'http://www.youtube.com/watch?v=7qL2PuLF0SI&feature=related');
    // with a timestamp
    assertExtractsCorrectly(
        'siJZXtsdfsf', 'http://www.youtube.com/watch?v=siJZXtsdfsf#t=2m59s');
    // with a timestamp and multiple hash params
    assertExtractsCorrectly(
        'siJZXtabdef',
        'http://www.youtube.com/watch?v=siJZXtabdef#t=1m59s&videos=foo');
    // with a timestamp, multiple regular and hash params
    assertExtractsCorrectly(
        'siJZXtabxyz',
        'http://www.youtube.com/watch?foo=bar&v=siJZXtabxyz&x=y#t=1m30s' +
            '&videos=bar');
    // only hash params
    assertExtractsCorrectly(
        'MWBpQoPwT3U',
        'http://www.youtube.com/watch#!playnext=1&playnext_from=TL' +
            '&videos=RX1XPmgerGo&v=MWBpQoPwT3U');
    // only hash params
    assertExtractsCorrectly(
        'MWBpQoPwT3V',
        'http://www.youtube.com/watch#!playnext=1&playnext_from=TL' +
            '&videos=RX1XPmgerGp&v=MWBpQoPwT3V&foo=bar');
    assertExtractsCorrectly(
        'jqxENMKaeCU',
        'http://www.youtube.com/watch#!v=jqxENMKaeCU&feature=related');
    // Lots of query params, some of them w/ numbers, one of them before the
    // video ID
    assertExtractsCorrectly(
        'qbce2yN81mE',
        'http://www.youtube.com/watch?usg=AFQjCNFf90T3fekgdVBmPp-Wgya5_CTSaw' +
            '&v=qbce2yN81mE&source=video&vgc=rss');
    assertExtractsCorrectly(
        'Lc-8onVA5Jk',
        'http://www.youtube.com/watch?v=Lc-8onVA5Jk&feature=dir');
    // Last character in the video ID is '-' (a non-word but valid character)
    // and the video ID is the last query parameter
    assertExtractsCorrectly(
        'Lc-8onV5Jk-', 'http://www.youtube.com/watch?v=Lc-8onV5Jk-');

    const invalidUrls = [
      'http://invalidUrl/watch?v=dMH0bHeiRNg',
      'http://www$youtube.com/watch?v=dMH0bHeiRNg',
      'http://www.youtube$com/watch?v=dMH0bHeiRNg',
      'http://w_w.youtube.com/watch?v=dMH0bHeiRNg',
    ];
    for (let i = 0, j = invalidUrls.length; i < j; ++i) {
      const e = assertThrows('parser expects a well formed URL', () => {
        YoutubeModel.newInstance(invalidUrls[i]);
      });
      assertEquals(
          'failed to parse video id from youtube url: ' + invalidUrls[i],
          e.message);
    }
  },

  testBuildingUrl() {
    assertEquals(YOUTUBE_URL, YoutubeModel.buildUrl(YOUTUBE_VIDEO_ID));
  },

  testCreatingModel() {
    const model = new YoutubeModel(YOUTUBE_VIDEO_ID);
    assertEquals(YOUTUBE_VIDEO_ID, model.getVideoId());
    assertEquals(YOUTUBE_URL, model.getUrl());
    assertUndefined(model.getCaption());
  },

  testCreatingDomOnInitialState() {
    control.render(parent);
    const preview = dom.getElementsByTagNameAndClass(
        TagName.IMG, Youtube.CSS_CLASS + '-thumbnail0', parent);
    assertEquals(1, preview.length);

    const caption = dom.getElementsByTagNameAndClass(
        TagName.DIV, Youtube.CSS_CLASS + '-caption', parent);
    assertEquals(1, caption.length);

    const flash =
        dom.getElementsByTagNameAndClass(TagName.DIV, FlashObject.CSS_CLASS);
    assertEquals(0, flash.length);
  },

  testCreatingDomOnSelectedState() {
    control.render(parent);
    control.setSelected(true);
    const preview = dom.getElementsByTagNameAndClass(
        TagName.IMG, Youtube.CSS_CLASS + '-preview', parent);
    assertEquals(0, preview.length);

    const caption = dom.getElementsByTagNameAndClass(
        TagName.DIV, Youtube.CSS_CLASS + '-caption', parent);
    assertEquals(1, caption.length);

    const flash = dom.getElementsByTagNameAndClass(
        TagName.DIV, FlashObject.CSS_CLASS, parent);
    assertEquals(1, flash.length);
  },

  testSettingSelectedStateAfterRender() {
    control.render(parent);
    control.setSelected(true);

    let preview = dom.getElementsByTagNameAndClass(
        TagName.IMG, Youtube.CSS_CLASS + '-preview', parent);
    assertEquals(0, preview.length);

    let caption = dom.getElementsByTagNameAndClass(
        TagName.DIV, Youtube.CSS_CLASS + '-caption', parent);
    assertEquals(1, caption.length);

    let flash = dom.getElementsByTagNameAndClass(
        TagName.DIV, FlashObject.CSS_CLASS, parent);
    assertEquals(1, flash.length);

    control.setSelected(false);

    preview = dom.getElementsByTagNameAndClass(
        TagName.IMG, Youtube.CSS_CLASS + '-thumbnail0', parent);
    assertEquals(1, preview.length);

    caption = dom.getElementsByTagNameAndClass(
        TagName.DIV, Youtube.CSS_CLASS + '-caption', parent);
    assertEquals(1, caption.length);

    // setting select as false doesn't actually remove the flash movie from
    // the DOM tree, which means that setting selected to true won't actually
    // restart the movie. TODO(user): fix this.
    flash = dom.getElementsByTagNameAndClass(
        TagName.DIV, FlashObject.CSS_CLASS, parent);
    assertEquals(1, flash.length);

    control.setSelected(true);

    flash = dom.getElementsByTagNameAndClass(
        TagName.DIV, FlashObject.CSS_CLASS, parent);
    assertEquals(1, flash.length);
  },

  testUrlMatcher() {
    const matcher = YoutubeModel.MATCHER_;
    assertTrue(matcher.test('http://www.youtube.com/watch?v=55D-ybnYQSs'));
    assertTrue(matcher.test('https://youtube.com/watch?v=55D-ybnYQSs'));
    assertTrue(
        matcher.test('https://youtube.com/watch?blarg=blop&v=55D-ybnYQSs'));
    assertTrue(matcher.test('http://www.youtube.com/watch?v=55D-ybnYQSs#wee'));

    assertFalse(matcher.test('http://www.cnn.com/watch?v=55D-ybnYQSs#wee'));
    assertFalse(matcher.test('ftp://www.youtube.com/watch?v=55D-ybnYQSs#wee'));
  },
});
