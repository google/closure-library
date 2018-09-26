// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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

/** @fileoverview Tests for {@link goog.html.sanitizer.SafeDomTreeProcessor} */

goog.module('goog.html.sanitizer.SafeDomTreeProcessorTest');
goog.setTestOnly();

var SafeDomTreeProcessor = goog.require('goog.html.sanitizer.SafeDomTreeProcessor');
var noclobber = goog.require('goog.html.sanitizer.noclobber');
var testSuite = goog.require('goog.testing.testSuite');
var testingDom = goog.require('goog.testing.dom');

/**
 * Concrete subclass that defines an identity transformation function.
 * @final @constructor @struct
 * @extends {SafeDomTreeProcessor}
 */
var NoopProcessor = function() {};
goog.inherits(NoopProcessor, SafeDomTreeProcessor);

/** @override */
NoopProcessor.prototype.processRoot = function(newRoot) {};

/** @override */
NoopProcessor.prototype.preProcessHtml = function(html) {
  return html;
};

/** @override */
NoopProcessor.prototype.createTextNode = function(originalNode) {
  return document.createTextNode(originalNode.data);
};

/** @override */
NoopProcessor.prototype.createElementWithoutAttributes = function(
    originalElement) {
  return document.createElement(noclobber.getNodeName(originalElement));
};

/** @override */
NoopProcessor.prototype.processElementAttribute = function(element, attribute) {
  return attribute.value;
};

testSuite({
  testBasic() {
    var input = '';
    assertHtmlMatchesOnSupportedBrowser(
        input, new NoopProcessor().processToString(input));

    input = 'foo';
    assertHtmlMatchesOnSupportedBrowser(
        input, new NoopProcessor().processToString(input));

    input = '<p id="foo">foo</p>';
    assertHtmlMatchesOnSupportedBrowser(
        input, new NoopProcessor().processToString(input));

    input = '<p id="foo"><b>foo</b></p>';
    assertHtmlMatchesOnSupportedBrowser(
        input, new NoopProcessor().processToString(input));
  },

  testEmptyTag() {
    var input = '<div></div>';
    var actual = new NoopProcessor().processToString(input);

    if (SafeDomTreeProcessor.SAFE_PARSING_SUPPORTED) {
      assertEquals(input, actual);
    } else {
      assertEquals('', actual);
    }
  },

  testTagChanged() {
    var processor = new NoopProcessor();
    processor.createElementWithoutAttributes = anchorToFoo;
    var input = '<a href="bar"><p>baz</p></a>';
    var expected = '<foo href="bar"><p>baz</p></foo>';
    assertHtmlMatchesOnSupportedBrowser(
        expected, processor.processToString(input));
  },

  testTagDropped() {
    var processor = new NoopProcessor();
    processor.createElementWithoutAttributes = function(originalElement) {
      return originalElement.tagName.toUpperCase() == 'A' ?
          null :
          document.createElement(originalElement.tagName);
    };

    var input = '<a href="bar"><p>baz</p></a>';
    var expected = '';
    assertHtmlMatchesOnSupportedBrowser(
        expected, processor.processToString(input));

    input = '<p>foo<a>b</a></p><a href="bar"><p>baz</p></a>';
    expected = '<p>foo</p>';
    assertHtmlMatchesOnSupportedBrowser(
        expected, processor.processToString(input));

    input = '<a href="bar"><p>baz</p></a><p>foo<a>b</a></p>';
    expected = '<p>foo</p>';
    assertHtmlMatchesOnSupportedBrowser(
        expected, processor.processToString(input));

    input = '<div><p>foo<a href="a">b</a></p></div>';
    expected = '<div><p>foo</p></div>';
    assertHtmlMatchesOnSupportedBrowser(
        expected, processor.processToString(input));
  },

  testAttributeDropped() {
    var processor = new NoopProcessor();
    processor.processElementAttribute = function(element, attribute) {
      return attribute.name == 'src' ? null : attribute.value;
    };

    var input = '<img src="aaa" id="foo" />';
    var expected = '<img id="foo" />';
    assertHtmlMatchesOnSupportedBrowser(
        expected, processor.processToString(input));
  },

  testTemplateDropped() {
    var input = '<div><template id="foo"><p>foo</p></template></div>';
    var expected = '<div></div>';
    assertHtmlMatchesOnSupportedBrowser(
        expected, new NoopProcessor().processToString(input));
  },

  testProcessRoot() {
    var processor = new NoopProcessor();
    processor.processRoot = function(spanElement) {
      spanElement.id = 'bar';
    };

    var input = '<p>foo</p>';
    var expected = '<span id="bar"><p>foo</p></span>';
    assertHtmlMatchesOnSupportedBrowser(
        expected, processor.processToString(input));
  },

  testPreprocessHtml() {
    var processor = new NoopProcessor();
    processor.preProcessHtml = function(html) {
      return html.toLowerCase();
    };

    var input = '<p id="BAR">FOO</p>';
    var expected = '<p id="bar">foo</p>';
    assertHtmlMatchesOnSupportedBrowser(
        expected, processor.processToString(input));
  }
});

/**
 * @param {!Element} originalElement
 * @return {!Element}
 */
function anchorToFoo(originalElement) {
  return document.createElement(
      originalElement.tagName.toUpperCase() == 'A' ? 'foo' :
                                                     originalElement.tagName);
}

/**
 * @param {string} expected
 * @param {string} actual
 */
function assertHtmlMatchesOnSupportedBrowser(expected, actual) {
  if (SafeDomTreeProcessor.SAFE_PARSING_SUPPORTED) {
    testingDom.assertHtmlMatches(
        expected, actual, true /* opt_strictAttributes */);
  } else {
    assertEquals('', actual);
  }
}
