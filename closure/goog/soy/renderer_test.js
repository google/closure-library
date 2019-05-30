// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.soy.RendererTest');
goog.setTestOnly();

const Dir = goog.require('goog.i18n.bidi.Dir');
const NodeType = goog.require('goog.dom.NodeType');
const Renderer = goog.require('goog.soy.Renderer');
const SafeHtml = goog.require('goog.html.SafeHtml');
const SanitizedContentKind = goog.require('goog.soy.data.SanitizedContentKind');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const recordFunction = goog.require('goog.testing.recordFunction');
/** @suppress {extraRequire} */
const testHelper = goog.require('goog.soy.testHelper');
const testSuite = goog.require('goog.testing.testSuite');

let handleRender;

const dataSupplier = {
  getData: function() {
    return {name: 'IjValue'};
  }
};

testSuite({
  setUp() {
    // Replace the empty default implementation.
    handleRender = Renderer.prototype.handleRender =
        recordFunction(Renderer.prototype.handleRender);
  },

  testRenderElement() {
    const testDiv = dom.createElement(TagName.DIV);

    const renderer = new Renderer(dataSupplier);
    renderer.renderElement(
        testDiv, example.injectedDataTemplate, {name: 'Value'});
    assertEquals('ValueIjValue', elementToInnerHtml(testDiv));
    assertEquals(testDiv, handleRender.getLastCall().getArguments()[0]);
    handleRender.assertCallCount(1);
  },

  testRenderElementWithNoTemplateData() {
    const testDiv = dom.createElement(TagName.DIV);

    const renderer = new Renderer(dataSupplier);
    renderer.renderElement(testDiv, example.noDataTemplate);
    assertEquals('<div>Hello</div>', elementToInnerHtml(testDiv));
    assertEquals(testDiv, handleRender.getLastCall().getArguments()[0]);
    handleRender.assertCallCount(1);
  },

  testRenderAsFragment() {
    const renderer = new Renderer(dataSupplier);
    const fragment = renderer.renderAsFragment(
        example.injectedDataTemplate, {name: 'Value'});
    assertEquals('ValueIjValue', fragmentToHtml(fragment));
    assertEquals(fragment, handleRender.getLastCall().getArguments()[0]);
    handleRender.assertCallCount(1);
  },

  testRenderAsFragmentWithNoTemplateData() {
    const renderer = new Renderer(dataSupplier);
    const fragment = renderer.renderAsFragment(example.noDataTemplate);
    assertEquals(NodeType.ELEMENT, fragment.nodeType);
    assertEquals('<div>Hello</div>', fragmentToHtml(fragment));
    assertEquals(fragment, handleRender.getLastCall().getArguments()[0]);
    handleRender.assertCallCount(1);
  },

  testRenderAsElement() {
    const renderer = new Renderer(dataSupplier);
    const element =
        renderer.renderAsElement(example.injectedDataTemplate, {name: 'Value'});
    assertEquals('ValueIjValue', elementToInnerHtml(element));
    assertEquals(element, handleRender.getLastCall().getArguments()[0]);
    handleRender.assertCallCount(1);
  },

  testRenderAsElementWithNoTemplateData() {
    const renderer = new Renderer(dataSupplier);
    const elem = renderer.renderAsElement(example.noDataTemplate);
    assertEquals('Hello', elementToInnerHtml(elem));
    assertEquals(elem, handleRender.getLastCall().getArguments()[0]);
  },

  testRenderConvertsToString() {
    const renderer = new Renderer(dataSupplier);
    assertEquals(
        'Output should be a string', 'Hello <b>World</b>',
        renderer.render(example.sanitizedHtmlTemplate));
    assertUndefined(handleRender.getLastCall().getArguments()[0]);
    handleRender.assertCallCount(1);
  },

  testRenderRejectsNonHtmlStrictTemplates() {
    const renderer = new Renderer(dataSupplier);
    assertEquals(
        'Assertion failed: ' +
            'render was called with a strict template of kind other than "html"' +
            ' (consider using renderText or renderStrict)',
        assertThrows(() => {
          renderer.render(example.unsanitizedTextTemplate, {});
        }).message);
    handleRender.assertCallCount(0);
  },

  testRenderStrictDoesNotConvertToString() {
    const renderer = new Renderer(dataSupplier);
    const result = renderer.renderStrict(example.sanitizedHtmlTemplate);
    assertEquals('Hello <b>World</b>', result.content);
    assertEquals(SanitizedContentKind.HTML, result.contentKind);
    assertUndefined(handleRender.getLastCall().getArguments()[0]);
    handleRender.assertCallCount(1);
  },

  testRenderStrictValidatesOutput() {
    const renderer = new Renderer(dataSupplier);
    // Passes.
    renderer.renderStrict(example.sanitizedHtmlTemplate, {});
    // No SanitizedContent at all.
    assertEquals(
        'Assertion failed: ' +
            'renderStrict cannot be called on a text soy template',
        assertThrows(() => {
          renderer.renderStrict(example.stringTemplate, {});
        }).message);
    assertUndefined(handleRender.getLastCall().getArguments()[0]);
    // Passes.
    renderer.renderStrictOfKind(
        example.sanitizedHtmlTemplate, {}, SanitizedContentKind.HTML);
    // Wrong content kind.
    assertEquals(
        'Assertion failed: ' +
            'renderStrict was called with the wrong kind of template',
        assertThrows(() => {
          renderer.renderStrictOfKind(
              example.sanitizedHtmlTemplate, {}, SanitizedContentKind.JS);
        }).message);
    assertUndefined(handleRender.getLastCall().getArguments()[0]);

    // Rendering non-HTML template fails:
    assertEquals(
        'Assertion failed: ' +
            'renderStrict was called with the wrong kind of template',
        assertThrows(() => {
          renderer.renderStrict(example.unsanitizedTextTemplate, {});
        }).message);
    assertUndefined(handleRender.getLastCall().getArguments()[0]);
    handleRender.assertCallCount(2);
  },

  testRenderStrictUri() {
    const renderer = new Renderer(dataSupplier);
    const result = renderer.renderStrictUri(example.sanitizedUriTemplate, {});
    assertEquals(SanitizedContentKind.URI, result.contentKind);
    assertEquals(
        'Assertion failed: ' +
            'renderStrict was called with the wrong kind of template',
        assertThrows(() => {
          renderer.renderStrictUri(example.sanitizedHtmlTemplate, {});
        }).message);
    handleRender.assertCallCount(1);
  },

  testRenderText() {
    const renderer = new Renderer(dataSupplier);
    // RenderText works on string templates.
    assertEquals('<b>XSS</b>', renderer.renderText(example.stringTemplate));
    // RenderText on non-text template fails.
    assertEquals(
        'Assertion failed: ' +
            'renderText was called with a template of kind other than "text"',
        assertThrows(() => {
          renderer.renderText(example.sanitizedHtmlTemplate, {});
        }).message);
    handleRender.assertCallCount(1);
  },

  testRenderSafeHtml() {
    const renderer = new Renderer(dataSupplier);
    const result = renderer.renderSafeHtml(example.sanitizedHtmlTemplate);
    assertEquals('Hello <b>World</b>', SafeHtml.unwrap(result));
    assertEquals(Dir.LTR, result.getDirection());
  },
});
