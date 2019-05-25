// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.BidiInputTest');
goog.setTestOnly();

const BidiInput = goog.require('goog.ui.BidiInput');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  setUp() {
    document.body.focus();
  },

  tearDown() {
    document.getElementById('emptyText').value = '';
    document.getElementById('bidiText').value = 'hello, world!';
  },

  testEmptyInput() {
    const bidiInput = new BidiInput();
    const emptyText = dom.getElement('emptyText');
    bidiInput.decorate(emptyText);
    assertEquals('', bidiInput.getValue());
    bidiInput.setValue('hello!');
    assertEquals('hello!', bidiInput.getValue());
  },

  testSetDirection() {
    const shalomInHebrew = '\u05e9\u05dc\u05d5\u05dd';
    const isAGoodLanguageInHebrew =
        '\u05d4\u05d9\u05d0 \u05e9\u05e4\u05d4 \u05d8\u05d5\u05d1\u05d4';
    const learnInHebrew = '\u05dc\u05de\u05d3';

    const bidiInput = new BidiInput();
    const bidiText = dom.getElement('bidiText');
    bidiInput.decorate(bidiText);
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue(shalomInHebrew);
    assertEquals('rtl', bidiInput.getDirection());

    bidiInput.setValue('hello!');
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue(`:) , ? ! ${shalomInHebrew}`);
    assertEquals('rtl', bidiInput.getDirection());

    bidiInput.setValue(':) , ? ! hello!');
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue('   ;)   ');
    assertEquals(null, bidiInput.getDirection());

    bidiInput.setValue(`${shalomInHebrew}, how are you today?`);
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue(`Hello is ${shalomInHebrew} in Hebrew`);
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue(`JavaScript ${isAGoodLanguageInHebrew}`);
    assertEquals('rtl', bidiInput.getDirection());

    bidiInput.setValue(`${learnInHebrew} JavaScript`);
    assertEquals('rtl', bidiInput.getDirection());

    bidiInput.setValue('');
    assertEquals(null, bidiInput.getDirection());
  },

  testSetDirection_inContenteditableDiv() {
    const shalomInHebrew = '\u05e9\u05dc\u05d5\u05dd';
    const isAGoodLanguageInHebrew =
        '\u05d4\u05d9\u05d0 \u05e9\u05e4\u05d4 \u05d8\u05d5\u05d1\u05d4';
    const learnInHebrew = '\u05dc\u05de\u05d3';

    const bidiInput = new BidiInput();
    const bidiTextDiv = dom.getElement('bidiTextDiv');
    bidiInput.decorate(bidiTextDiv);
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue(shalomInHebrew);
    assertEquals('rtl', bidiInput.getDirection());

    bidiInput.setValue('hello!');
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue(`:) , ? ! ${shalomInHebrew}`);
    assertEquals('rtl', bidiInput.getDirection());

    bidiInput.setValue(':) , ? ! hello!');
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue('   ;)   ');
    assertEquals(null, bidiInput.getDirection());

    bidiInput.setValue(`${shalomInHebrew}, how are you today?`);
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue(`Hello is ${shalomInHebrew} in Hebrew`);
    assertEquals('ltr', bidiInput.getDirection());

    bidiInput.setValue(`JavaScript ${isAGoodLanguageInHebrew}`);
    assertEquals('rtl', bidiInput.getDirection());

    bidiInput.setValue(`${learnInHebrew} JavaScript`);
    assertEquals('rtl', bidiInput.getDirection());

    bidiInput.setValue('');
    assertEquals(null, bidiInput.getDirection());
  },
});
