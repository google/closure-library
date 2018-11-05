// Copyright 2016 The Closure Library Authors. All Rights Reserved.
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

/** @fileoverview testcases for CSS Sanitizer.*/

goog.provide('goog.html.CssSanitizerTest');
goog.setTestOnly();

goog.require('goog.array');
goog.require('goog.html.SafeStyle');
goog.require('goog.html.SafeStyleSheet');
goog.require('goog.html.SafeUrl');
goog.require('goog.html.sanitizer.CssSanitizer');
goog.require('goog.html.testing');
goog.require('goog.string');
goog.require('goog.testing.dom');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');
goog.require('goog.userAgent.product');
goog.require('goog.userAgent.product.isVersion');


var isIE8 = goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(9);


var isSafari9OrOlder =
    goog.userAgent.product.SAFARI && !goog.userAgent.product.isVersion(10);


var supportsDomParser =
    !goog.userAgent.IE || goog.userAgent.isVersionOrHigher(10);


/**
 * @param {string} cssText CSS text usually associated with an inline style.
 * @return {!CSSStyleDeclaration} A styleSheet object.
 */
function getStyleFromCssText(cssText) {
  var styleDecleration = document.createElement('div').style;
  styleDecleration.cssText = cssText || '';
  return styleDecleration;
}


/**
 * Asserts that the expected CSS text is equal to the actual CSS text.
 * @param {string} expectedCssText Expected CSS text.
 * @param {string} actualCssText Actual CSS text.
 */
function assertCSSTextEquals(expectedCssText, actualCssText) {
  if (isIE8) {
    // We get a bunch of default values set in IE8 because of the way we iterate
    // over the CSSStyleDecleration keys.
    // TODO(danesh): Fix IE8 or remove this hack. It will be problematic for
    // tests which have an extra semi-colon in the value (even if quoted).
    var actualCssArray = actualCssText.split(/\s*;\s*/);
    var ie8StyleString = 'WIDTH: 0px; BOTTOM: 0px; HEIGHT: 0px; TOP: 0px; ' +
        'RIGHT: 0px; TEXT-DECORATION: none underline overline line-through; ' +
        'LEFT: 0px; TEXT-DECORATION: underline line-through;';
    goog.array.forEach(ie8StyleString.split(/\s*;\s*/), function(ie8Css) {
      goog.array.remove(actualCssArray, ie8Css);
    });
    actualCssText = actualCssArray.join('; ');
  }
  assertEquals(
      getStyleFromCssText(expectedCssText).cssText,
      getStyleFromCssText(actualCssText).cssText);
}


/**
 * Gets sanitized inline style.
 * @param {string} sourceCss CSS to be sanitized.
 * @param {function (string, string):?goog.html.SafeUrl=} opt_urlRewrite URL
 *     rewriter that only returns a goog.html.SafeUrl.
 * @return {string} Sanitized inline style.
 */
function getSanitizedInlineStyle(sourceCss, opt_urlRewrite) {
  try {
    return goog.html.SafeStyle.unwrap(
               goog.html.sanitizer.CssSanitizer.sanitizeInlineStyle(
                   getStyleFromCssText(sourceCss), opt_urlRewrite)) ||
        '';
  } catch (err) {
    // IE8 doesn't like setting invalid properties. It throws an "Invalid
    // Argument" exception.
    if (!isIE8) {
      throw err;
    }
    return '';
  }
}


/**
 * Asserts that the input CSS text is equal to the expected CSS text after
 * sanitization using {@link CssSanitizer.sanitizeStyleSheetString}.
 * @param {string} expectedCssText
 * @param {string} inputCssText
 * @param {?string=} opt_containerId
 * @param {function(string, string):?SafeUrl=} opt_uriRewriter
 */
function assertSanitizedCssEquals(
    expectedCssText, inputCssText, opt_containerId, opt_uriRewriter) {
  assertBrowserSanitizedCssEquals(
      {chrome: expectedCssText}, inputCssText, opt_containerId,
      opt_uriRewriter);
}


/**
 * Asserts that on each browser the input CSS text is equal to the expected CSS
 * text after sanitization using {@link CssSanitizer.sanitizeStyleSheetString}.
 * Automatically verifies that on older browsers the sanitizer returns an empty
 * string.
 * @param {{
 *     chrome: string,
 *     firefox: (string|undefined),
 *     safari: (string|undefined),
 *     newIE: (string|undefined),
 *     ie10: (string|undefined)}} expectedCssTextByBrowser An object that maps
 *     each browser to a different expected value. All browsers but chrome are
 *     optional. If a browser is missing, the chrome expected value is used
 *     instead.
 * @param {string} inputCssText
 * @param {?string=} opt_containerId
 * @param {function(string, string):?SafeUrl=} opt_uriRewriter
 */
function assertBrowserSanitizedCssEquals(
    expectedCssTextByBrowser, inputCssText, opt_containerId, opt_uriRewriter) {
  var expectedCssText = undefined;
  if (goog.userAgent.product.CHROME) {
    expectedCssText = expectedCssTextByBrowser.chrome;
  } else if (goog.userAgent.product.FIREFOX) {
    expectedCssText = expectedCssTextByBrowser.firefox;
  } else if (goog.userAgent.product.SAFARI) {
    expectedCssText = expectedCssTextByBrowser.safari;
  } else if (goog.userAgent.product.IE && document.documentMode == 10) {
    expectedCssText = expectedCssTextByBrowser.ie10;
    console.log('ie10');
  } else if (
      goog.userAgent.product.IE && !goog.userAgent.isVersionOrHigher(10)) {
    // Don't even try with chrome as default for IE8 and IE9.
    expectedCssText = '';
  } else if (goog.userAgent.product.IE || goog.userAgent.product.EDGE) {
    expectedCssText = expectedCssTextByBrowser.newIE;
  } else {
    throw new Error('Unrecognized browser, this function needs to be updated.');
  }
  if (expectedCssText == undefined) {
    expectedCssText = expectedCssTextByBrowser.chrome;
  }
  assertEquals(
      expectedCssText,
      goog.html.SafeStyleSheet.unwrap(
          goog.html.sanitizer.CssSanitizer.sanitizeStyleSheetString(
              inputCssText,
              opt_containerId === undefined ? 'foo' : opt_containerId,
              opt_uriRewriter)));
}


/**
 * Converts rules in STYLE tags into style attributes on the tags they apply to,
 * and returns a new string.
 * @param {string} html
 * @return {string}
 */
function inlineStyleRulesString(html) {
  var tree = goog.html.sanitizer.CssSanitizer.safeParseHtmlAndGetInertElement(
      '<span>' + html + '</span>');
  if (tree == null) {
    return '';
  }
  goog.html.sanitizer.CssSanitizer.inlineStyleRules(tree);
  return tree.innerHTML;
}


/**
 * Inlines the rules in STYLE tags in the original HTML and asserts that it is
 * the same as the expected HTML.
 * @param {string} expectedHtml
 * @param {string} originalHtml
 */
function assertInlinedStyles(expectedHtml, originalHtml) {
  var inlinedHtml = inlineStyleRulesString(originalHtml);
  if (!supportsDomParser) {
    assertEquals('', inlinedHtml);
    return;
  }
  goog.testing.dom.assertHtmlMatches(
      expectedHtml, inlinedHtml, true /* opt_strictAttributes */);
}


function testValidCss() {
  var actualCSS = 'font-family: inherit';
  var expectedCSS = 'font-family: inherit';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));

  // .1 -> 0.1; 1.0 -> 1
  actualCSS = 'padding: 1pt .1pt 1pt 1.0em';
  expectedCSS = 'padding: 1pt 0.1pt 1pt 1em';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));

  // Negative margins are allowed.
  actualCSS = 'margin:    -7px -.5px -23px -1.25px';
  expectedCSS = 'margin: -7px -0.5px -23px -1.25px';
  if (isIE8) {
    // IE8 doesn't like sub-pixels
    // https://blogs.msdn.microsoft.com/ie/2010/11/03/sub-pixel-fonts-in-ie9/
    expectedCSS = expectedCSS.replace('-0.5px', '0px');
    expectedCSS = expectedCSS.replace('-1.25px', '-1px');
  }
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));

  actualCSS = 'quotes: "{" "}" "<" ">"';
  expectedCSS = 'quotes: "{" "}" "<" ">";';
  if (isSafari9OrOlder) {
    // We never figured out why Safari didn't work here, but it's obsolete now.
    expectedCSS = 'quotes: \'{\';';
  }
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));
}


function testInvalidCssRemoved() {
  var actualCSS;

  // Tests all have null results.
  var expectedCSS = '';

  actualCSS = 'font: Arial Black,monospace,Helvetica,#88ff88';
  // Hash values are not allowed so are dropped.
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));

  // Negative numbers for border not allowed.
  actualCSS = 'border : -7px -0.5px -23px -1.25px';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));

  // Negative numbers converted to empty.
  actualCSS = 'padding: -0 -.0 -0. -0.0 ';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));

  // Invalid values not allowed.
  actualCSS = 'padding : #123 - 5 "5"';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));

  // Font-family does not allow quantities at all.
  actualCSS = 'font-family: 7 .5 23 1.25 -7 -.5 -23 -1.25 +7 +.5 +23 +1.25 ' +
      '7cm .5em 23.mm 1.25px -7cm -.5em -23.mm -1.25px ' +
      '+7cm +.5em +23.mm +1.25px 0 .0 -0+00.0 /';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));

  actualCSS = 'background: bogus url("foo.png") transparent';
  assertCSSTextEquals(
      expectedCSS,
      getSanitizedInlineStyle(actualCSS, goog.html.SafeUrl.sanitize));

  // expression(...) is not allowed for font so is rejected wholesale -- the
  // internal string "pwned" is not passed through.
  actualCSS = 'font-family: Arial Black,monospace,expression(return "pwned"),' +
      'Helvetica,#88ff88';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));
}


function testCssBackground() {
  var actualCSS, expectedCSS;

  function proxyUrl(url) {
    return goog.html.testing.newSafeUrlForTest(
        'https://goo.gl/proxy?url=' + url);
  }

  // Don't require the URL sanitizer to protect string boundaries.
  actualCSS = 'background-image: url("javascript:evil(1337)")';
  expectedCSS = '';
  assertCSSTextEquals(
      expectedCSS,
      getSanitizedInlineStyle(actualCSS, goog.html.SafeUrl.sanitize));

  actualCSS = 'background-image: url("http://goo.gl/foo.png")';
  expectedCSS =
      'background-image: url(https://goo.gl/proxy?url=http://goo.gl/foo.png)';
  assertCSSTextEquals(
      expectedCSS, getSanitizedInlineStyle(actualCSS, proxyUrl));

  // Without any URL sanitizer.
  actualCSS = 'background: transparent url("Bar.png")';
  var sanitizedCss = getSanitizedInlineStyle(actualCSS);
  assertFalse(goog.string.contains(sanitizedCss, 'background-image'));
  assertFalse(goog.string.contains(sanitizedCss, 'Bar.png'));
}

function testVendorPrefixed() {
  var actualCSS = '-webkit-text-stroke: 1px red';
  var expectedCSS = '';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));
}

function testDisallowedFunction() {
  var actualCSS = 'border-width: calc(10px + 20px)';
  var expectedCSS = '';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));
}

function testColor() {
  var colors = [
    'red', 'Red', 'RED', 'Gray', 'grey', '#abc', '#123', '#ABC123',
    'rgb( 127, 64 , 255 )'
  ];
  var notcolors = [
    // Finding words that are not X11 colors is harder than you think.
    'killitwithfire', 'invisible', 'expression(red=blue)', '#aa-1bb',
    '#expression', '#doevil'
    // 'rgb(0, 0, 100%)' // Invalid in all browsers
    // 'rgba(128,255,128,50%)', // Invalid in all browsers
  ];

  for (var i = 0; i < colors.length; ++i) {
    var validColorValue = 'color: ' + colors[i];
    assertCSSTextEquals(
        validColorValue, getSanitizedInlineStyle(validColorValue));
  }

  for (var i = 0; i < notcolors.length; ++i) {
    var invalidColorValue = 'color: ' + notcolors[i];
    assertCSSTextEquals('', getSanitizedInlineStyle(invalidColorValue));
  }
}


function testCustomVariablesSanitized() {
  var actualCSS = '\\2d-leak: leakTest; background: var(--leak);';
  assertCSSTextEquals('', getSanitizedInlineStyle(actualCSS));
}


function testExpressionsPreserved() {
  if (isIE8) {
    // Disable this test as IE8 doesn't support expressions.
    // https://msdn.microsoft.com/en-us/library/ms537634(v=VS.85).aspx
    return;
  }

  var actualCSS, expectedCSS;
  actualCSS = 'background-image: linear-gradient(to bottom right, red, blue)';
  expectedCSS = 'background-image: linear-gradient(to right bottom, red, blue)';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));
}


function testMultipleInlineStyles() {
  var actualCSS = 'margin: 1px ; padding: 0';
  var expectedCSS = 'margin: 1px; padding: 0px;';
  assertCSSTextEquals(expectedCSS, getSanitizedInlineStyle(actualCSS));
}


function testSanitizeInlineStyleString_basic() {
  assertInlineStyleStringEquals('', '');
  assertInlineStyleStringEquals('color: red;', 'color: red');
  assertInlineStyleStringEquals(
      'color: green; padding: 10px;', 'color: green; padding: 10px');
}


function testSanitizeInlineStyleString_malicious() {
  assertInlineStyleStringEquals('', 'color: expression("pwned")');
}


function testSanitizeInlineStyleString_url() {
  assertInlineStyleStringEquals(
      '', 'background-image: url("http://example.com")');

  assertInlineStyleStringEquals(
      '', 'background-image: url("http://example.com")', function(uri) {
        return null;
      });
  assertInlineStyleStringEquals(
      'background-image: url("http://example.com");',
      'background-image: url("http://example.com")',
      goog.html.SafeUrl.sanitize);
}


function testSanitizeInlineStyleString_unbalancedParenthesesInUnquotedUrl() {
  assertEquals(
      '',
      goog.html.SafeStyle.unwrap(
          goog.html.sanitizer.CssSanitizer.sanitizeInlineStyleString(
              'background-image: url(http://example.com/aaa(a)',
              goog.html.SafeUrl.sanitize)));
  assertEquals(
      '',
      goog.html.SafeStyle.unwrap(
          goog.html.sanitizer.CssSanitizer.sanitizeInlineStyleString(
              'background-image: url(http://example.com/aaa)a)',
              goog.html.SafeUrl.sanitize)));
}


function testSanitizeInlineStyleString_preservesCase() {
  assertInlineStyleStringEquals(
      'font-family: Roboto, sans-serif', 'font-family: Roboto, sans-serif');
}


function testSanitizeInlineStyleString_simpleFunctions() {
  var expectedCss = 'color: rgb(1,2,3);';
  assertInlineStyleStringEquals(expectedCss, expectedCss);
  expectedCss = 'background-image: linear-gradient(red, blue);';
  assertInlineStyleStringEquals(expectedCss, expectedCss);
}


function testSanitizeInlineStyleString_nestedFunction() {
  var expectedCss =
      'background-image: linear-gradient(217deg, rgba(255,0,0,.8), blue);';
  assertInlineStyleStringEquals(expectedCss, expectedCss);
}


function testSanitizeInlineStyleString_repeatingLinearGradient() {
  var expectedCss = 'background-image: repeating-linear-gradient(' +
      '-45deg, rgb(66, 133, 244), rgb(66, 133, 244) 4px, ' +
      'rgb(255, 255, 255) 4px, rgb(255, 255, 255) 5px, ' +
      'rgb(66, 133, 244) 5px, rgb(66, 133, 244) 8px);';
  assertInlineStyleStringEquals(expectedCss, expectedCss);
}


function testSanitizeInlineStyleString_noUrlPropertyValueFanOut() {
  if (goog.userAgent.IE && document.documentMode < 10) {
    return;
  }
  // Property fanout is ok, but value fanout isn't, because it would lead to
  // CssPropertySanitizer dropping the value. Check that no browser does
  // value fanout.
  var safeStyle = goog.html.sanitizer.CssSanitizer.sanitizeInlineStyleString(
      'background: url("http://foo.com/a")', goog.html.SafeUrl.sanitize);
  var output = goog.html.SafeStyle.unwrap(safeStyle);
  // We can't use assertInlineStyleStringEquals, the browser is inconsistent
  // about fanout of properties. We'll use plain substring matching instead.
  assertContains('url("http://foo.com/a")', output);
}


/**
 * @param {string} expectedCssText
 * @param {string} inputCssText
 * @param {function(string, string):?goog.html.SafeUrl=} opt_uriRewriter A URI
 *     rewriter that returns a goog.html.SafeUrl.
 */
function assertInlineStyleStringEquals(
    expectedCssText, inputCssText, opt_uriRewriter) {
  if (goog.userAgent.IE && document.documentMode < 10) {
    expectedCssText = '';
  }

  var safeStyle = goog.html.sanitizer.CssSanitizer.sanitizeInlineStyleString(
      inputCssText, opt_uriRewriter);
  var output = goog.html.SafeStyle.unwrap(safeStyle);
  assertCSSTextEquals(expectedCssText, output);
}


/**
 * @suppress {accessControls}
 */
function testInertDocument() {
  if (!document.implementation.createHTMLDocument) {
    return;  // skip test
  }

  window.xssFiredInertDocument = false;
  var doc = goog.html.sanitizer.CssSanitizer.createInertDocument_();
  try {
    doc.write('<script> window.xssFiredInertDocument = true; </script>');
  } catch (e) {
    // ignore
  }
  assertFalse(window.xssFiredInertDocument);
}


/**
 * @suppress {accessControls}
 */
function testInertCustomElements() {
  if (typeof HTMLTemplateElement != 'function' || !document.registerElement) {
    return;  // skip test
  }

  var inertDoc = goog.html.sanitizer.CssSanitizer.createInertDocument_();
  var xFooConstructor = document.registerElement('x-foo');
  var xFooElem =
      document.implementation.createHTMLDocument('').createElement('x-foo');
  assertTrue(xFooElem instanceof xFooConstructor);  // sanity check

  var inertXFooElem = inertDoc.createElement('x-foo');
  assertFalse(inertXFooElem instanceof xFooConstructor);
}


function testSanitizeStyleSheetString_basic() {
  var input = '';
  assertSanitizedCssEquals(input, input);

  input = 'a {color: red}';
  var expected = '#foo a{color: red;}';
  assertSanitizedCssEquals(expected, input);

  input = 'a {color: red} b {color:red; not-allowed: 1; ' +
      'background-image: url(\'http://not.allowed\');}';
  expected = '#foo a{color: red;}#foo b{color: red;}';
  assertSanitizedCssEquals(expected, input);
}


function testSanitizeInlineStyleString_noSelector() {
  var input = 'a{color: red;}';
  assertSanitizedCssEquals(input, input, null /* opt_containerId */);
}


function testSanitizeStyleSheetString_comma() {
  var input = 'a, b, c > d {color: red}';
  var expected = '#foo a,#foo b,#foo c > d{color: red;}';
  assertSanitizedCssEquals(expected, input);
}


function testSanitizeStyleSheetString_atRule() {
  var input = '@media screen { a { color: red; } }';
  var expected = '';
  assertSanitizedCssEquals(expected, input);
}


function testSanitizeStyleSheetString_borderSpacing() {
  var input = 'table { border-spacing: 0px; }';
  var expected = '#foo table{border-spacing: 0px;}';
  assertSanitizedCssEquals(expected, input);
}


function testSanitizeStyleSheetString_urlRewrite() {
  var urlRewriter = function(url) {
    if (input.indexOf('bar') > -1) {
      return goog.html.SafeUrl.sanitize(url);
    } else {
      return null;
    }
  };

  var input = 'a {background-image: url("http://bar.com")}';
  var quoted = '#foo a{background-image: url("http://bar.com");}';
  // Safari will add a slash.
  var slash = '#foo a{background-image: url("http://bar.com/");}';
  assertBrowserSanitizedCssEquals(
      {safari: slash, chrome: quoted}, input, undefined /* opt_containerId */,
      urlRewriter);

  input = 'a {background-image: url("http://nope.com")}';
  var expected = '#foo a{}';
  assertSanitizedCssEquals(
      expected, input, undefined /* opt_containerId */, urlRewriter);

  input = 'a{background-image: url("javascript:alert(\"bar\")")}';
  expected = '#foo a{}';
  assertSanitizedCssEquals(
      expected, input, undefined /* opt_containerId */, urlRewriter);
}


function testSanitizeStyleSheetString_unrecognized() {
  var input = 'a {mso-font-size: 2px; color: black}';
  var expected = 'a{color: black;}';
  assertSanitizedCssEquals(expected, input, null /* opt_containerId */);
}


function testSanitizeStyleSheetString_malformed() {
  var input = '<script>alert(1)</script>';
  var expected = '';
  assertSanitizedCssEquals(expected, input);

  input = 'a { } </style><script>alert(1)</script><style>';
  expected = '#foo a{}';
  assertSanitizedCssEquals(expected, input);

  input = 'a < b { } a { font-size: 10px }';
  expected = '#foo a{font-size: 10px;}';
  assertSanitizedCssEquals(expected, input);

  input = 'a {;;;} a { font-size: 10px } ;;; a { background-image: url(() }};;';
  expected = '#foo a{}#foo a{font-size: 10px;}';
  assertSanitizedCssEquals(expected, input);

  input = 'a[a=\"ccc] { color: red;}';
  expected = '';
  assertSanitizedCssEquals(expected, input);
}


function testSanitizeStyleSheetString_stringWithNoEscapedQuotesInSelector() {
  var input = 'a[data-foo="foo,bar"], b { color: red }';
  // IE converts the string to single quotes.
  var doubleQuoted = '#foo a[data-foo="foo,bar"],#foo b{color: red;}';
  var singleQuoted = '#foo a[data-foo=\'foo,bar\'],#foo b{color: red;}';
  assertBrowserSanitizedCssEquals(
      {chrome: doubleQuoted, newIE: singleQuoted, ie10: singleQuoted}, input);

  input = 'a[data-foo=\'foo,bar\'], b { color: red }';
  // Chrome converts the string to double quotes.
  doubleQuoted = '#foo a[data-foo="foo,bar"],#foo b{color: red;}';
  singleQuoted = '#foo a[data-foo=\'foo,bar\'],#foo b{color: red;}';
  assertBrowserSanitizedCssEquals(
      {chrome: doubleQuoted, newIE: singleQuoted, ie10: singleQuoted}, input);

  input = 'a[foo="foo,bar"][bar="baz"], b { color: blue }';
  doubleQuoted = '#foo a[foo="foo,bar"][bar="baz"],#foo b{color: blue;}';
  singleQuoted = '#foo a[foo=\'foo,bar\'][bar=\'baz\'],#foo b{color: blue;}';
  assertBrowserSanitizedCssEquals(
      {chrome: doubleQuoted, newIE: singleQuoted, ie10: singleQuoted}, input);

  input = 'a[foo="foo,bar"], b, c[foo="f,b"][bar="f,b"] { color: red }';
  doubleQuoted = '#foo a[foo="foo,bar"],#foo b,#foo c[foo="f,b"][bar="f,b"]' +
      '{color: red;}';
  singleQuoted =
      '#foo a[foo=\'foo,bar\'],#foo b,#foo c[bar=\'f,b\'][foo=\'f,b\']' +
      '{color: red;}';
  assertBrowserSanitizedCssEquals(
      {chrome: doubleQuoted, newIE: singleQuoted, ie10: singleQuoted}, input);
}


function testSanitizeStyleSheetString_stringWithEscapedQuotesInSelector() {
  // Contains an escaped string, but the selector is converted to a[a='a"b']
  // before the regex is executed.
  var input = 'a[a="a\\"b"] { color: black; }';
  var doubleQuoted = '#foo a[a="a\\"b"]{color: black;}';
  var singleQuoted = '#foo a[a=\'a"b\']{color: black;}';
  assertBrowserSanitizedCssEquals(
      {chrome: doubleQuoted, ie10: singleQuoted, newIE: singleQuoted}, input);

  input = 'a[a="a\\\'b"] { color: grey; }';
  doubleQuoted = '#foo a[a="a\'b"]{color: grey;}';
  singleQuoted = '#foo a[a=\'a\\\'b\']{color: grey;}';
  assertBrowserSanitizedCssEquals(
      {
        chrome: doubleQuoted,
        firefox: doubleQuoted,
        ie10: '',
        newIE: singleQuoted
      },
      input);

  input = 'a[a=\'\\\'b\'] {color: red; }';
  doubleQuoted = '#foo a[a="\'b"]{color: red;}';
  singleQuoted = '#foo a[a=\'\\\'b\']{color: red;}';
  assertBrowserSanitizedCssEquals(
      {
        chrome: doubleQuoted,
        firefox: doubleQuoted,
        newIE: singleQuoted,
        ie10: ''
      },
      input);

  input = 'a[foo=\'b\\\'a, ,\'] { color: blue; }';
  doubleQuoted = '#foo a[foo="b\'a, ,"]{color: blue;}';
  singleQuoted = '#foo a[foo=\'b\\\'a, ,\']{color: blue;}';
  assertBrowserSanitizedCssEquals(
      {
        chrome: doubleQuoted,
        firefox: doubleQuoted,
        newIE: singleQuoted,
        ie10: ''
      },
      input);

  input = 'a[a=\'a\\"b\'] { color: black; }';
  doubleQuoted = '#foo a[a="a\\"b"]{color: black;}';
  singleQuoted = '#foo a[a=\'a"b\']{color: black;}';
  assertBrowserSanitizedCssEquals(
      {chrome: doubleQuoted, ie10: singleQuoted, newIE: singleQuoted}, input);
}


function testSanitizeInlineStyleString_invalidSelector() {
  var input = 'a{}';
  if (supportsDomParser) {
    assertThrows(function() {
      goog.html.sanitizer.CssSanitizer.sanitizeStyleSheetString(
          input, '</style>');
    });
  }
}


function testInlineStyleRules_empty() {
  assertInlinedStyles('', '');
}


function testInlineStyleRules_basic() {
  var input = '<style>a{color:red}</style><a>foo</a>';
  var expected = '<a style="color:red;">foo</a>';
  assertInlinedStyles(expected, input);
}


function testInlineStyleRules_onlyStyle() {
  var input = '<style>a{color:red}</style>';
  assertInlinedStyles('', input);
}


function testInlineStyleRules_noStyle() {
  var input = '<a>hi</a>';
  assertInlinedStyles(input, input);
}


function testInlineStyleRules_onlyText() {
  var input = 'hello';
  assertInlinedStyles(input, input);
}


function testInlineStyleRules_specificity() {
  var input = '<style>a{color: red; border: 1px}' +
      '#foo{color: white; border: 2px}</style>' +
      '<a id="foo" style="color: black">foo</a>';
  var expected = '<a id="foo" style="color: black; border: 2px">foo</a>';
  assertInlinedStyles(expected, input);
}


function testInlineStyleRules_media() {
  var input = '<style>a{color: red;} @media screen { border: 1px; }</style>' +
      '<a id="foo">foo</a>';
  var expected = '<a id="foo" style="color: red;">foo</a>';
  assertInlinedStyles(expected, input);
}


function testInlineStyleRules_background() {
  var input = '<style>a{background: none;}</style><a id="foo">foo</a>';
  var expected = goog.userAgent.product.SAFARI ?
      // Safari will expand multi-value properties such as background, border,
      // etc into multiple properties. The result is more verbose but it should
      // not affect the effective style.
      ('<a id="foo" style="background-image: none; ' +
       'background-position: initial initial; ' +
       'background-repeat: initial initial;">foo</a>') :
      '<a id="foo" style="background: none;">foo</a>';
  assertInlinedStyles(expected, input);
}
