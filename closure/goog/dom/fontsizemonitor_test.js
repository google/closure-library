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

goog.provide('goog.dom.FontSizeMonitorTest');
goog.setTestOnly('goog.dom.FontSizeMonitorTest');

goog.require('goog.dom');
goog.require('goog.dom.FontSizeMonitor');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.events');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

function isBuggyGecko() {
  return goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher('1.9');
}

var monitor;

function setUp() {
  monitor = new goog.dom.FontSizeMonitor();
}

function tearDown() {
  monitor.dispose();
}

function getResizeTarget() {
  return goog.userAgent.IE ?
      monitor.sizeElement_ :
      goog.dom.getFrameContentWindow(monitor.sizeElement_);
}

function testFontSizeNoChange() {
  // This tests that firing the resize event without changing the font-size
  // does not trigger the event.

  var fired = false;
  goog.events.listen(
      monitor, goog.dom.FontSizeMonitor.EventType.CHANGE,
      function(e) { fired = true; });

  var resizeEvent = new goog.events.Event('resize', getResizeTarget());
  goog.testing.events.fireBrowserEvent(resizeEvent);

  assertFalse('The font size should not have changed', fired);
}

function testFontSizeChanged() {
  // One can trigger the iframe resize by changing the
  // document.body.style.fontSize but the event is fired asynchronously in
  // Firefox.  Instead, we just override the lastWidth_ to simulate that the
  // size changed.

  var fired = false;
  goog.events.listen(
      monitor, goog.dom.FontSizeMonitor.EventType.CHANGE,
      function(e) { fired = true; });

  monitor.lastWidth_--;

  var resizeEvent = new goog.events.Event('resize', getResizeTarget());
  goog.testing.events.fireBrowserEvent(resizeEvent);

  assertTrue('The font size should have changed', fired);
}

function testCreateAndDispose() {
  var frameCount = window.frames.length;
  var iframeElementCount =
      goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME).length;
  var divElementCount =
      goog.dom.getElementsByTagName(goog.dom.TagName.DIV).length;

  var monitor = new goog.dom.FontSizeMonitor();
  monitor.dispose();

  var newFrameCount = window.frames.length;
  var newIframeElementCount =
      goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME).length;
  var newDivElementCount =
      goog.dom.getElementsByTagName(goog.dom.TagName.DIV).length;

  assertEquals(
      'There should be no trailing frames', frameCount + isBuggyGecko(),
      newFrameCount);
  assertEquals(
      'There should be no trailing iframe elements',
      iframeElementCount + isBuggyGecko(), newIframeElementCount);
  assertEquals(
      'There should be no trailing div elements', divElementCount,
      newDivElementCount);
}

function testWithDomHelper() {
  var frameCount = window.frames.length;
  var iframeElementCount =
      goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME).length;
  var divElementCount =
      goog.dom.getElementsByTagName(goog.dom.TagName.DIV).length;

  var monitor = new goog.dom.FontSizeMonitor(goog.dom.getDomHelper());

  var newFrameCount = window.frames.length;
  var newIframeElementCount =
      goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME).length;
  var newDivElementCount =
      goog.dom.getElementsByTagName(goog.dom.TagName.DIV).length;

  if (goog.userAgent.IE) {
    assertEquals(
        'There should be one new div element', divElementCount + 1,
        newDivElementCount);
  } else {
    assertEquals(
        'There should be one new frame', frameCount + 1, newFrameCount);
    assertEquals(
        'There should be one new iframe element', iframeElementCount + 1,
        newIframeElementCount);
  }

  // Use the first iframe in the doc.  This is added in the HTML markup.
  var win = window.frames[0];
  var doc = win.document;
  doc.open();
  doc.write('<html><body></body></html>');
  doc.close();
  var domHelper = goog.dom.getDomHelper(doc);

  var frameCount2 = win.frames.length;
  var iframeElementCount2 =
      goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME, doc).length;
  var divElementCount2 =
      goog.dom.getElementsByTagName(goog.dom.TagName.DIV, doc).length;

  var monitor2 = new goog.dom.FontSizeMonitor(domHelper);

  var newFrameCount2 = win.frames.length;
  var newIframeElementCount2 =
      goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME, doc).length;
  var newDivElementCount2 =
      goog.dom.getElementsByTagName(goog.dom.TagName.DIV, doc).length;

  if (goog.userAgent.IE) {
    assertEquals(
        'There should be one new div element', divElementCount2 + 1,
        newDivElementCount2);
  } else {
    assertEquals(
        'There should be one new frame', frameCount2 + 1, newFrameCount2);
    assertEquals(
        'There should be one new iframe element', iframeElementCount2 + 1,
        newIframeElementCount2);
  }

  monitor.dispose();
  monitor2.dispose();
}

function testEnsureThatDocIsOpenedForGecko() {
  var pr = new goog.testing.PropertyReplacer();
  pr.set(goog.userAgent, 'GECKO', true);
  pr.set(goog.userAgent, 'IE', false);

  var openCalled = false;
  var closeCalled = false;
  var instance = {
    document: {
      open: function() { openCalled = true; },
      close: function() { closeCalled = true; }
    },
    attachEvent: function() {}
  };

  pr.set(goog.dom, 'getFrameContentWindow', function() { return instance; });

  try {
    var monitor = new goog.dom.FontSizeMonitor();

    assertTrue('doc.open should have been called', openCalled);
    assertTrue('doc.close should have been called', closeCalled);

    monitor.dispose();
  } finally {
    pr.reset();
  }
}

function testFirefox2WorkAroundFirefox3() {
  var pr = new goog.testing.PropertyReplacer();
  pr.set(goog.userAgent, 'GECKO', true);
  pr.set(goog.userAgent, 'IE', false);

  try {
    // 1.9 should clear iframes
    pr.set(goog.userAgent, 'VERSION', '1.9');
    goog.userAgent.isVersionOrHigherCache_ = {};

    var frameCount = window.frames.length;
    var iframeElementCount =
        goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME).length;
    var divElementCount =
        goog.dom.getElementsByTagName(goog.dom.TagName.DIV).length;

    var monitor = new goog.dom.FontSizeMonitor();
    monitor.dispose();

    var newFrameCount = window.frames.length;
    var newIframeElementCount =
        goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME).length;
    var newDivElementCount =
        goog.dom.getElementsByTagName(goog.dom.TagName.DIV).length;

    assertEquals(
        'There should be no trailing frames', frameCount, newFrameCount);
    assertEquals(
        'There should be no trailing iframe elements', iframeElementCount,
        newIframeElementCount);
    assertEquals(
        'There should be no trailing div elements', divElementCount,
        newDivElementCount);
  } finally {
    pr.reset();
  }
}


function testFirefox2WorkAroundFirefox2() {
  var pr = new goog.testing.PropertyReplacer();
  pr.set(goog.userAgent, 'GECKO', true);
  pr.set(goog.userAgent, 'IE', false);

  try {
    // 1.8 should NOT clear iframes
    pr.set(goog.userAgent, 'VERSION', '1.8');
    goog.userAgent.isVersionOrHigherCache_ = {};

    var frameCount = window.frames.length;
    var iframeElementCount =
        goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME).length;
    var divElementCount =
        goog.dom.getElementsByTagName(goog.dom.TagName.DIV).length;

    var monitor = new goog.dom.FontSizeMonitor();
    monitor.dispose();

    var newFrameCount = window.frames.length;
    var newIframeElementCount =
        goog.dom.getElementsByTagName(goog.dom.TagName.IFRAME).length;
    var newDivElementCount =
        goog.dom.getElementsByTagName(goog.dom.TagName.DIV).length;

    assertEquals(
        'There should be no trailing frames', frameCount + 1, newFrameCount);
    assertEquals(
        'There should be no trailing iframe elements', iframeElementCount + 1,
        newIframeElementCount);
    assertEquals(
        'There should be no trailing div elements', divElementCount,
        newDivElementCount);
  } finally {
    pr.reset();
  }
}
