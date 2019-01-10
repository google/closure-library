// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

/**
 * @fileoverview Unit tests for goog.dom.safe.
 */

goog.provide('goog.dom.safeTest');
goog.setTestOnly('goog.dom.safeTest');

goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.safe');
goog.require('goog.dom.safe.InsertAdjacentHtmlPosition');
goog.require('goog.html.SafeHtml');
goog.require('goog.html.SafeScript');
goog.require('goog.html.SafeStyle');
goog.require('goog.html.SafeUrl');
goog.require('goog.html.TrustedResourceUrl');
goog.require('goog.html.testing');
goog.require('goog.string');
goog.require('goog.string.Const');
goog.require('goog.testing');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');


var mockWindowOpen;


function tearDown() {
  if (mockWindowOpen) {
    mockWindowOpen.$tearDown();
  }
}


function testInsertAdjacentHtml() {
  var writtenHtml;
  var writtenPosition;
  var mockNode = /** @type {!Node} */ ({
    'insertAdjacentHTML': function(position, html) {
      writtenPosition = position;
      writtenHtml = html;
    }
  });

  goog.dom.safe.insertAdjacentHtml(
      mockNode, goog.dom.safe.InsertAdjacentHtmlPosition.BEFOREBEGIN,
      goog.html.SafeHtml.create('div', {}, 'foobar'));
  assertEquals('<div>foobar</div>', writtenHtml);
  assertEquals('beforebegin', writtenPosition);
}


function testSetInnerHtml() {
  var mockElement =
      /** @type {!Element} */ ({'tagName': 'DIV', 'innerHTML': 'blarg'});
  var html = '<script>somethingTrusted();<' +
      '/script>';
  var safeHtml = goog.html.testing.newSafeHtmlForTest(html);
  goog.dom.safe.setInnerHtml(mockElement, safeHtml);
  assertEquals(html, mockElement.innerHTML);
}

function testSetInnerHtml_doesntAllowScript() {
  var script =
      /** @type {!Element} */ ({'tagName': 'SCRIPT', 'innerHTML': 'blarg'});
  var safeHtml = goog.html.SafeHtml.htmlEscape('alert(1);');
  assertThrows(function() { goog.dom.safe.setInnerHtml(script, safeHtml); });
}

function testSetInnerHtml_doesntAllowStyle() {
  var style =
      /** @type {!Element} */ ({'tagName': 'STYLE', 'innerHTML': 'blarg'});
  var safeHtml = goog.html.SafeHtml.htmlEscape('A { color: red; }');
  assertThrows(function() { goog.dom.safe.setInnerHtml(style, safeHtml); });
}

/**
 * When innerHTML is assigned on an element in IE, IE recursively severs all
 * parent-children links in the removed content. This test ensures that that
 * doesn't happen when re-rendering an element with soy.
 */
function testSetInnerHtml_leavesChildrenInIE() {
  // Given a div with existing content.
  var grandchildDiv = goog.dom.createElement(goog.dom.TagName.DIV);
  var childDiv =
      goog.dom.createDom(goog.dom.TagName.DIV, null, [grandchildDiv]);
  var testDiv = goog.dom.createDom(goog.dom.TagName.DIV, null, [childDiv]);
  // Expect parent/children links.
  assertArrayEquals(
      'Expect testDiv to contain childDiv.', [childDiv],
      Array.from(testDiv.children));
  assertEquals(
      'Expect childDiv to be contained in testDiv.', testDiv,
      childDiv.parentElement);
  assertArrayEquals(
      'Expect childDiv to contain grandchildDiv.', [grandchildDiv],
      Array.from(childDiv.children));
  assertEquals(
      'Expect grandchildDiv to be contained in childDiv.', childDiv,
      grandchildDiv.parentElement);

  // When the div's content is re-rendered.
  var safeHtml = goog.html.testing.newSafeHtmlForTest('<a></a>');
  goog.dom.safe.setInnerHtml(testDiv, safeHtml);
  assertEquals(
      `Expect testDiv's contents to complete change`, '<a></a>',
      testDiv.innerHTML.toLowerCase());
  // Expect the previous childDiv tree to retain its parent-child connections.
  assertArrayEquals(
      'Expect childDiv to still contain grandchildDiv.', [grandchildDiv],
      Array.from(childDiv.children));
  assertEquals(
      'Expect grandchildDiv to still be contained in childDiv.', childDiv,
      grandchildDiv.parentElement);
}

function testSetStyle() {
  var style =
      goog.html.SafeStyle.fromConstant(goog.string.Const.from('color: red;'));
  var elem = document.createElement('div');
  assertEquals('', elem.style.color);  // sanity check

  goog.dom.safe.setStyle(elem, style);
  assertEquals('red', elem.style.color);
}

function testDocumentWrite() {
  var mockDoc = /** @type {!Document} */ ({
    'html': null,
    /** @suppress {globalThis} */
    'write': function(html) { this['html'] = html; }
  });
  var html = '<script>somethingTrusted();<' +
      '/script>';
  var safeHtml = goog.html.testing.newSafeHtmlForTest(html);
  goog.dom.safe.documentWrite(mockDoc, safeHtml);
  assertEquals(html, mockDoc.html);
}


function testsetLinkHrefAndRel_trustedResourceUrl() {
  var mockLink = /** @type {!HTMLLinkElement} */ ({'href': null, 'rel': null});

  var url = goog.html.TrustedResourceUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  // Test case-insensitive too.
  goog.dom.safe.setLinkHrefAndRel(mockLink, url, 'foo, Stylesheet, bar');
  assertEquals('javascript:trusted();', mockLink.href);

  goog.dom.safe.setLinkHrefAndRel(mockLink, url, 'foo, bar');
  assertEquals('javascript:trusted();', mockLink.href);
}


function testsetLinkHrefAndRel_safeUrl() {
  var mockLink = /** @type {!HTMLLinkElement} */ ({'href': null, 'rel': null});

  var url = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  assertThrows(function() {
    goog.dom.safe.setLinkHrefAndRel(mockLink, url, 'foo, stylesheet, bar');
  });

  goog.dom.safe.setLinkHrefAndRel(mockLink, url, 'foo, bar');
  assertEquals('javascript:trusted();', mockLink.href);
}


function testsetLinkHrefAndRel_string() {
  var mockLink = /** @type {!HTMLLinkElement} */ ({'href': null, 'rel': null});

  assertThrows(function() {
    goog.dom.safe.setLinkHrefAndRel(
        mockLink, 'javascript:evil();', 'foo, stylesheet, bar');
  });
  withAssertionFailure(function() {
    goog.dom.safe.setLinkHrefAndRel(mockLink, 'javascript:evil();', 'foo, bar');
  });
  assertEquals('about:invalid#zClosurez', mockLink.href);
}

function testsetLinkHrefAndRel_assertsType() {
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('A');
    var ex = assertThrows(function() {
      goog.dom.safe.setLinkHrefAndRel(
          /** @type {!HTMLLinkElement} */ (otherElement), 'http://example.com/',
          'author');
    });
    assert(
        goog.string.contains(ex.message, 'Argument is not a HTMLLinkElement'));
  }
}

/**
 * Returns a link element, incorrectly typed as a Location.
 * @return {!Location}
 * @suppress {checkTypes}
 */
function makeLinkElementTypedAsLocation() {
  return document.createElement('LINK');
}

function testSetLocationHref() {
  var mockLoc = /** @type {!Location} */ ({'href': 'blarg'});
  withAssertionFailure(function() {
    goog.dom.safe.setLocationHref(mockLoc, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', mockLoc.href);

  mockLoc = /** @type {!Location} */ ({'href': 'blarg'});
  var safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  goog.dom.safe.setLocationHref(mockLoc, safeUrl);
  assertEquals('javascript:trusted();', mockLoc.href);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var ex = assertThrows(function() {
      goog.dom.safe.setLocationHref(makeLinkElementTypedAsLocation(), safeUrl);
    });
    assert(goog.string.contains(ex.message, 'Argument is not a Location'));
  }
}

function testReplaceLocationSafeString() {
  // TODO(bangert): the mocks don't work on IE 8
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    /** @type {?} */
    var mockLoc = new goog.testing.StrictMock(window.location);
    mockLoc.replace('http://example.com/');
    mockLoc.$replay();
    goog.dom.safe.replaceLocation(mockLoc, 'http://example.com/');
    mockLoc.$verify();
    mockLoc.$reset();
  }
}

function testReplaceLocationEvilString() {
  // TODO(bangert): the mocks don't work on IE 8
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    /** @type {?} */
    var mockLoc = new goog.testing.StrictMock(window.location);
    mockLoc.replace('about:invalid#zClosurez');
    mockLoc.$replay();
    withAssertionFailure(function() {
      goog.dom.safe.replaceLocation(mockLoc, 'javascript:evil();');
    });
    mockLoc.$verify();
    mockLoc.$reset();
  }
}

function testReplaceLocationSafeUrl() {
  // TODO(bangert): the mocks don't work on IE 8
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var safeUrl = goog.html.SafeUrl.fromConstant(
        goog.string.Const.from('javascript:trusted();'));
    /** @type {?} */
    var mockLoc = new goog.testing.StrictMock(window.location);
    mockLoc.replace('javascript:trusted();');
    mockLoc.$replay();
    goog.dom.safe.replaceLocation(mockLoc, safeUrl);
    mockLoc.$verify();
    mockLoc.$reset();
  }
}

function testAssignLocationSafeString() {
  var location;
  var fakeLoc = /** @type {!Location} */ ({
    assign: function(value) {
      location = value;
    }
  });
  goog.dom.safe.assignLocation(fakeLoc, 'http://example.com/');
  assertEquals(location, 'http://example.com/');
}

function testAssignLocationEvilString() {
  var location;
  var fakeLoc = /** @type {!Location} */ ({
    assign: function(value) {
      location = value;
    }
  });
  withAssertionFailure(function() {
    goog.dom.safe.assignLocation(fakeLoc, 'javascript:evil();');
  });
  assertEquals(location, 'about:invalid#zClosurez');
}

function testAssignLocationSafeUrl() {
  var location;
  var fakeLoc = /** @type {!Location} */ ({
    assign: function(value) {
      location = value;
    }
  });
  var safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  goog.dom.safe.assignLocation(fakeLoc, safeUrl);
  assertEquals(location, 'javascript:trusted();');
}

function testSetAnchorHref() {
  var anchor = /** @type {!HTMLAnchorElement} */ (document.createElement('A'));
  withAssertionFailure(function() {
    goog.dom.safe.setAnchorHref(anchor, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', anchor.href);

  anchor = /** @type {!HTMLAnchorElement} */ (document.createElement('A'));
  var safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  goog.dom.safe.setAnchorHref(anchor, safeUrl);
  assertEquals('javascript:trusted();', anchor.href);

  // Works with mocks too.
  var mockAnchor = /** @type {!HTMLAnchorElement} */ ({'href': 'blarg'});
  withAssertionFailure(function() {
    goog.dom.safe.setAnchorHref(mockAnchor, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', mockAnchor.href);

  mockAnchor = /** @type {!HTMLAnchorElement} */ ({'href': 'blarg'});
  safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  goog.dom.safe.setAnchorHref(mockAnchor, safeUrl);
  assertEquals('javascript:trusted();', mockAnchor.href);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('LINK');
    var ex = assertThrows(function() {
      goog.dom.safe.setAnchorHref(
          /** @type {!HTMLAnchorElement} */ (otherElement), safeUrl);
    });
    assert(goog.string.contains(
        ex.message, 'Argument is not a HTMLAnchorElement'));
  }
}

function testSetInputFormActionHarmlessString() {
  var element = goog.dom.createElement(goog.dom.TagName.INPUT);
  goog.dom.safe.setInputFormAction(element, 'http://foo.com/');
  assertEquals('http://foo.com/', element.formAction);
}

function testSetInputFormActionEvilString() {
  var element = goog.dom.createElement(goog.dom.TagName.INPUT);
  withAssertionFailure(function() {
    goog.dom.safe.setInputFormAction(element, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', element.formAction);
}

function testSetInputFormActionSafeUrl() {
  var element = goog.dom.createElement(goog.dom.TagName.INPUT);
  goog.dom.safe.setInputFormAction(
      element,
      goog.html.SafeUrl.fromConstant(
          goog.string.Const.from('javascript:trusted();')));
  assertEquals('javascript:trusted();', element.formAction);
}


function testSetInputFormActionAssertsType() {
  /** @type {?} */
  var element = goog.dom.createElement(goog.dom.TagName.FORM);
  withAssertionFailure(function() {
    goog.dom.safe.setInputFormAction(element, 'foo');
  });
  assertEquals('foo', element.formAction);
}

function testSetButtonFormActionHarmlessString() {
  var element = goog.dom.createElement(goog.dom.TagName.BUTTON);
  goog.dom.safe.setButtonFormAction(element, 'http://foo.com/');
  assertEquals('http://foo.com/', element.formAction);
}

function testSetButtonFormActionEvilString() {
  var element = goog.dom.createElement(goog.dom.TagName.BUTTON);
  withAssertionFailure(function() {
    goog.dom.safe.setButtonFormAction(element, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', element.formAction);
}

function testSetButtonFormActionSafeUrl() {
  var element = goog.dom.createElement(goog.dom.TagName.BUTTON);
  goog.dom.safe.setButtonFormAction(
      element,
      goog.html.SafeUrl.fromConstant(
          goog.string.Const.from('javascript:trusted();')));
  assertEquals('javascript:trusted();', element.formAction);
}

function testSetFormElementActionAssertsType() {
  /** @type {?} */
  var element = goog.dom.createElement(goog.dom.TagName.INPUT);
  withAssertionFailure(function() {
    goog.dom.safe.setFormElementAction(element, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', element.action);
}

function testSetFormElementActionHarmlessString() {
  var element = goog.dom.createElement(goog.dom.TagName.FORM);
  goog.dom.safe.setFormElementAction(element, 'http://foo.com');
  assertEquals('http://foo.com/', element.action);  // url is normalized
}

function testSetFormElementActionEvilString() {
  var element = goog.dom.createElement(goog.dom.TagName.FORM);
  withAssertionFailure(function() {
    goog.dom.safe.setFormElementAction(element, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', element.action);
}

function testSetFormElementActionSafeUrl() {
  var element = goog.dom.createElement(goog.dom.TagName.FORM);
  goog.dom.safe.setFormElementAction(
      element,
      goog.html.SafeUrl.fromConstant(
          goog.string.Const.from('javascript:trusted();')));
  assertEquals('javascript:trusted();', element.action);
}

function testSetImageSrc_withSafeUrlObject() {
  var mockImageElement = /** @type {!HTMLImageElement} */ ({'src': 'blarg'});
  withAssertionFailure(function() {
    goog.dom.safe.setImageSrc(mockImageElement, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', mockImageElement.src);

  mockImageElement = /** @type {!HTMLImageElement} */ ({'src': 'blarg'});
  var safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  goog.dom.safe.setImageSrc(mockImageElement, safeUrl);
  assertEquals('javascript:trusted();', mockImageElement.src);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('SCRIPT');
    var ex = assertThrows(function() {
      goog.dom.safe.setImageSrc(
          /** @type {!HTMLImageElement} */ (otherElement), safeUrl);
    });
    assert(
        goog.string.contains(ex.message, 'Argument is not a HTMLImageElement'));
  }
}

function testSetImageSrc_withHttpsUrl() {
  var mockImageElement = /** @type {!HTMLImageElement} */ ({'src': 'blarg'});

  var safeUrl = 'https://trusted_url';
  goog.dom.safe.setImageSrc(mockImageElement, safeUrl);
  assertEquals(safeUrl, mockImageElement.src);
}

function testSetAudioSrc() {
  var mockAudioElement = /** @type {!HTMLAudioElement} */ ({'src': 'blarg'});
  var safeUrl = 'https://trusted_url';
  goog.dom.safe.setAudioSrc(mockAudioElement, safeUrl);
  assertEquals(safeUrl, mockAudioElement.src);

  mockAudioElement = /** @type {!HTMLAudioElement} */ ({'src': 'blarg'});
  withAssertionFailure(function() {
    goog.dom.safe.setAudioSrc(mockAudioElement, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', mockAudioElement.src);

  mockAudioElement = /** @type {!HTMLAudioElement} */ ({'src': 'blarg'});
  safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  goog.dom.safe.setAudioSrc(mockAudioElement, safeUrl);
  assertEquals('javascript:trusted();', mockAudioElement.src);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('SCRIPT');
    var ex = assertThrows(function() {
      goog.dom.safe.setAudioSrc(
          /** @type {!HTMLAudioElement} */ (otherElement), safeUrl);
    });
    assert(
        goog.string.contains(ex.message, 'Argument is not a HTMLAudioElement'));
  }
}

function testSetVideoSrc() {
  var mockVideoElement = /** @type {!HTMLVideoElement} */ ({'src': 'blarg'});
  var safeUrl = 'https://trusted_url';
  goog.dom.safe.setVideoSrc(mockVideoElement, safeUrl);
  assertEquals(safeUrl, mockVideoElement.src);

  mockVideoElement = /** @type {!HTMLVideoElement} */ ({'src': 'blarg'});
  withAssertionFailure(function() {
    goog.dom.safe.setVideoSrc(mockVideoElement, 'javascript:evil();');
  });
  assertEquals('about:invalid#zClosurez', mockVideoElement.src);

  mockVideoElement = /** @type {!HTMLVideoElement} */ ({'src': 'blarg'});
  safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  goog.dom.safe.setVideoSrc(mockVideoElement, safeUrl);
  assertEquals('javascript:trusted();', mockVideoElement.src);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('SCRIPT');
    var ex = assertThrows(function() {
      goog.dom.safe.setVideoSrc(
          /** @type {!HTMLVideoElement} */ (otherElement), safeUrl);
    });
    assert(
        goog.string.contains(ex.message, 'Argument is not a HTMLVideoElement'));
  }
}

function testSetEmbedSrc() {
  var url = goog.html.TrustedResourceUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  var mockElement = /** @type {!HTMLEmbedElement} */ ({'src': 'blarg'});
  goog.dom.safe.setEmbedSrc(mockElement, url);
  assertEquals('javascript:trusted();', mockElement.src);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('IMAGE');
    var ex = assertThrows(function() {
      goog.dom.safe.setEmbedSrc(
          /** @type {!HTMLEmbedElement} */ (otherElement), url);
    });
    assert(
        goog.string.contains(ex.message, 'Argument is not a HTMLEmbedElement'));
  }
}

function testSetFrameSrc() {
  var url = goog.html.TrustedResourceUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  var mockElement = /** @type {!HTMLFrameElement} */ ({'src': 'blarg'});
  goog.dom.safe.setFrameSrc(mockElement, url);
  assertEquals('javascript:trusted();', mockElement.src);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('IMAGE');
    var ex = assertThrows(function() {
      goog.dom.safe.setFrameSrc(
          /** @type {!HTMLFrameElement} */ (otherElement), url);
    });
    assert(
        goog.string.contains(ex.message, 'Argument is not a HTMLFrameElement'));
  }
}

function testSetIframeSrc() {
  var url = goog.html.TrustedResourceUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  var mockElement = /** @type {!HTMLIFrameElement} */ ({'src': 'blarg'});
  goog.dom.safe.setIframeSrc(mockElement, url);
  assertEquals('javascript:trusted();', mockElement.src);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('IMAGE');
    var ex = assertThrows(function() {
      goog.dom.safe.setIframeSrc(
          /** @type {!HTMLIFrameElement} */ (otherElement), url);
    });
    assert(goog.string.contains(
        ex.message, 'Argument is not a HTMLIFrameElement'));
  }
}

function testSetIframeSrcdoc() {
  var html = goog.html.SafeHtml.create('div', {}, 'foobar');
  var mockIframe = /** @type {!HTMLIFrameElement} */ ({'srcdoc': ''});
  goog.dom.safe.setIframeSrcdoc(mockIframe, html);
  assertEquals('<div>foobar</div>', mockIframe.srcdoc);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('IMAGE');
    var ex = assertThrows(function() {
      goog.dom.safe.setIframeSrcdoc(
          /** @type {!HTMLIFrameElement} */ (otherElement), html);
    });
    assert(goog.string.contains(
        ex.message, 'Argument is not a HTMLIFrameElement'));
  }
}

function testSetObjectData() {
  var url = goog.html.TrustedResourceUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  var mockElement = /** @type {!HTMLObjectElement} */ ({'data': 'blarg'});
  goog.dom.safe.setObjectData(mockElement, url);
  assertEquals('javascript:trusted();', mockElement.data);

  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('IMAGE');
    var ex = assertThrows(function() {
      goog.dom.safe.setObjectData(
          /** @type {!HTMLObjectElement} */ (otherElement), url);
    });
    assert(goog.string.contains(
        ex.message, 'Argument is not a HTMLObjectElement'));
  }
}

function testSetScriptSrc() {
  var url = goog.html.TrustedResourceUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  var mockElement = /** @type {!HTMLScriptElement} */ ({
    'src': 'blarg',
    /** @suppress {globalThis} */
    'setAttribute': function(attr, value) {
      this[attr] = value;
    }
  });
  // clear nonce cache for test.
  /** @type {?} */ (goog).cspNonce_ = null;

  // Place a nonced script in the page.
  var nonce = 'ThisIsANonceThisIsANonceThisIsANonce';
  var noncedScript = goog.dom.createElement(goog.dom.TagName.SCRIPT);
  noncedScript.setAttribute('nonce', nonce);
  document.body.appendChild(noncedScript);
  goog.dom.safe.setScriptSrc(mockElement, url);

  try {
    assertEquals('javascript:trusted();', mockElement.src);
    assertEquals(nonce, mockElement.nonce);
  } finally {
    goog.dom.removeNode(noncedScript);
  }
  // Asserts correct runtime type.
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10)) {
    var otherElement = document.createElement('IMAGE');
    var ex = assertThrows(function() {
      goog.dom.safe.setScriptSrc(
          /** @type {!HTMLScriptElement} */ (otherElement), url);
    });
    assert(goog.string.contains(
        ex.message, 'Argument is not a HTMLScriptElement'));
  }
}

function testSetScriptContent() {
  var mockScriptElement = /** @type {!HTMLScriptElement} */ ({
    /** @suppress {globalThis} */
    'setAttribute': function(attr, value) {
      this[attr] = value;
    }
  });
  // clear nonce cache for test.
  /** @type {?} */ (goog).cspNonce_ = null;

  // Place a nonced script in the page.
  var nonce = 'ThisIsANonceThisIsANonceThisIsANonce';
  var noncedScript = goog.dom.createElement(goog.dom.TagName.SCRIPT);
  noncedScript.setAttribute('nonce', nonce);
  document.body.appendChild(noncedScript);
  var content =
      goog.html.SafeScript.fromConstant(goog.string.Const.from('alert(1);'));
  goog.dom.safe.setScriptContent(mockScriptElement, content);

  try {
    assertEquals(goog.html.SafeScript.unwrap(content), mockScriptElement.text);
    assertEquals(nonce, mockScriptElement.nonce);
  } finally {
    goog.dom.removeNode(noncedScript);
  }
}

function testOpenInWindow() {
  mockWindowOpen =
      /** @type {?} */ (goog.testing.createMethodMock(window, 'open'));
  var fakeWindow = {};

  mockWindowOpen('about:invalid#zClosurez', 'name', 'specs', true)
      .$returns(fakeWindow);
  mockWindowOpen.$replay();
  var retVal = withAssertionFailure(function() {
    return goog.dom.safe.openInWindow(
        'javascript:evil();', window, goog.string.Const.from('name'), 'specs',
        true);
  });
  mockWindowOpen.$verify();
  assertEquals(
      'openInWindow should return the created window', fakeWindow, retVal);

  mockWindowOpen.$reset();
  retVal = null;

  var safeUrl = goog.html.SafeUrl.fromConstant(
      goog.string.Const.from('javascript:trusted();'));
  mockWindowOpen('javascript:trusted();', 'name', 'specs', true)
      .$returns(fakeWindow);
  mockWindowOpen.$replay();
  retVal = goog.dom.safe.openInWindow(
      safeUrl, window, goog.string.Const.from('name'), 'specs', true);
  mockWindowOpen.$verify();
  assertEquals(
      'openInWindow should return the created window', fakeWindow, retVal);
}

/**
 * Tests that f raises an AssertionError and runs f while disabling assertion
 * errors.
 *
 * @param {function():*} f function with a failing assertion.
 * @return {*} the return value of f.
 */
function withAssertionFailure(f) {
  assertThrows(f);
  goog.asserts.setErrorHandler(function(error) {});
  try {
    return f();
  } finally {
    goog.asserts.setErrorHandler(goog.asserts.DEFAULT_ERROR_HANDLER);
  }
}
