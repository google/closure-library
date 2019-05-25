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

goog.module('goog.ui.MenuButtonRendererTest');
goog.setTestOnly();

const MenuButton = goog.require('goog.ui.MenuButton');
const MenuButtonRenderer = goog.require('goog.ui.MenuButtonRenderer');
const State = goog.require('goog.a11y.aria.State');
const TagName = goog.require('goog.dom.TagName');
const aria = goog.require('goog.a11y.aria');
const classlist = goog.require('goog.dom.classlist');
const dom = goog.require('goog.dom');
const rendererasserts = goog.require('goog.testing.ui.rendererasserts');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let decoratedButton;
let renderedButton;
let savedRootTree;

function assertButtonsEqual() {
  assertHTMLEquals(
      'Rendered button and decorated button produced different HTML!',
      renderedButton.getElement().innerHTML,
      decoratedButton.getElement().innerHTML);
}

/**
 * Render the given button as a child of 'parent'.
 * @param {goog.ui.Button} button A button with content 'Foo'.
 */
function renderOnParent(button) {
  button.render(dom.getElement('parent'));
}

/**
 * Decaorate the button with id 'button'.
 * @param {goog.ui.Button} button A button with no content.
 */
function decorateDemoButton(button) {
  button.decorate(dom.getElement('decoratedButton'));
}

/**
 * Verify that the button's caption is never the direct
 * child of an inline-block element.
 * @param {goog.ui.Button} button A button.
 */
function checkButtonCaption(button) {
  let contentElement = button.getContentElement();
  assertEquals('Foo', contentElement.innerHTML);
  assertTrue(hasInlineBlock(contentElement));
  assert(hasInlineBlock(contentElement.parentNode));

  button.setContent('Bar');
  contentElement = button.getContentElement();
  assertEquals('Bar', contentElement.innerHTML);
  assertTrue(hasInlineBlock(contentElement));
  assert(hasInlineBlock(contentElement.parentNode));
}

/**
 * Verify that the menu button has the correct ARIA attributes
 * @param {goog.ui.Button} button A button.
 */
function checkAriaState(button) {
  assertEquals(
      'menu buttons should have default aria-expanded == false', 'false',
      aria.getState(button.getElement(), State.EXPANDED));
  button.setOpen(true);
  assertEquals(
      'menu buttons should not aria-expanded == true after ' +
          'opening',
      'true', aria.getState(button.getElement(), State.EXPANDED));
}

function hasInlineBlock(el) {
  return classlist.contains(el, 'goog-inline-block');
}

testSuite({
  setUp() {
    savedRootTree = dom.getElement('root').cloneNode(true);
    decoratedButton = null;
    renderedButton = null;
  },

  tearDown() {
    if (decoratedButton) {
      decoratedButton.dispose();
    }

    if (renderedButton) {
      renderedButton.dispose();
    }

    const root = dom.getElement('root');
    root.parentNode.replaceChild(savedRootTree, root);
  },

  testRendererWithTextContent() {
    renderedButton = new MenuButton('Foo');
    renderOnParent(renderedButton);
    checkButtonCaption(renderedButton);
    checkAriaState(renderedButton);

    decoratedButton = new MenuButton();
    decorateDemoButton(decoratedButton);
    checkButtonCaption(decoratedButton);
    checkAriaState(decoratedButton);

    assertButtonsEqual();
  },

  testRendererWithNodeContent() {
    renderedButton = new MenuButton(dom.createDom(TagName.DIV, null, 'Foo'));
    renderOnParent(renderedButton);

    const contentEl = renderedButton.getContentElement();
    if (userAgent.IE || userAgent.OPERA) {
      assertHTMLEquals('<div unselectable="on">Foo</div>', contentEl.innerHTML);
    } else {
      assertHTMLEquals('<div>Foo</div>', contentEl.innerHTML);
    }
    assertTrue(hasInlineBlock(contentEl));
  },

  testSetContent() {
    renderedButton = new MenuButton();
    renderOnParent(renderedButton);

    let contentEl = renderedButton.getContentElement();
    assertHTMLEquals('', contentEl.innerHTML);

    renderedButton.setContent('Foo');
    contentEl = renderedButton.getContentElement();
    assertHTMLEquals('Foo', contentEl.innerHTML);
    assertTrue(hasInlineBlock(contentEl));

    renderedButton.setContent(dom.createDom(TagName.DIV, null, 'Bar'));
    contentEl = renderedButton.getContentElement();
    assertHTMLEquals('<div>Bar</div>', contentEl.innerHTML);

    renderedButton.setContent('Foo');
    contentEl = renderedButton.getContentElement();
    assertHTMLEquals('Foo', contentEl.innerHTML);
  },

  testDoesntCallGetCssClassInConstructor() {
    rendererasserts.assertNoGetCssClassCallsInConstructor(MenuButtonRenderer);
  },
});
