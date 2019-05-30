// Copyright 2014 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.CharCounterTest');
goog.setTestOnly();

const CharCounter = goog.require('goog.ui.CharCounter');
const asserts = goog.require('goog.testing.asserts');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let charCounter;
let countElement;
let inputElement;

const incremental = CharCounter.Display.INCREMENTAL;
const remaining = CharCounter.Display.REMAINING;
const maxLength = 25;

function setupCheckLength(content, mode) {
  inputElement.value = content;
  charCounter.setDisplayMode(mode);
  charCounter.checkLength();
}

testSuite({
  setUp() {
    inputElement = dom.getElement('test-textarea-id');
    inputElement.value = '';
    countElement = dom.getElementByClass('char-count');
    dom.setTextContent(countElement, '');
    charCounter = new CharCounter(inputElement, countElement, maxLength);
  },

  tearDown() {
    charCounter.dispose();
  },

  testConstructor() {
    assertNotNull('Character counter can not be null', charCounter);
    assertEquals(maxLength.toString(), dom.getTextContent(countElement));
  },

  testSetMaxLength() {
    charCounter.setMaxLength(10);
    assertEquals('10', dom.getTextContent(countElement));

    const tooLongContent = 'This is too long text content';
    inputElement.value = tooLongContent;
    charCounter.setMaxLength(10);
    assertEquals('0', dom.getTextContent(countElement));
    assertEquals('This is to', inputElement.value);
  },

  testGetMaxLength() {
    assertEquals(maxLength, charCounter.getMaxLength());
  },

  testSetDisplayMode() {
    // Test counter to be in incremental mode
    charCounter.setDisplayMode(incremental);
    assertEquals('0', dom.getTextContent(countElement));

    // Test counter to be in remaining mode
    charCounter.setDisplayMode(remaining);
    assertEquals(maxLength.toString(), dom.getTextContent(countElement));
  },

  testGetDisplayMode() {
    assertEquals(remaining, charCounter.getDisplayMode());

    const incrementalCharCounter =
        new CharCounter(inputElement, countElement, maxLength, incremental);
    assertEquals(incremental, incrementalCharCounter.getDisplayMode());
  },

  testCheckLength() {
    // Test the characters remaining in DOM
    setupCheckLength('', remaining);
    assertEquals(maxLength.toString(), dom.getTextContent(countElement));

    // Test the characters incremental in DOM
    setupCheckLength('', incremental);
    assertEquals('0', dom.getTextContent(countElement));
  },

  testCheckLength_limitedContent() {
    const limitedContent = 'Limited text content';
    const limitedContentLength = limitedContent.length;
    const remainingLimitedContentLength = maxLength - limitedContentLength;

    // Set some content and test the characters remaining in DOM
    setupCheckLength(limitedContent, remaining);

    assertEquals(limitedContent, inputElement.value);
    assertEquals(
        remainingLimitedContentLength.toString(),
        dom.getTextContent(countElement));

    // Test the characters incremented in DOM with limited content
    charCounter.setDisplayMode(incremental);
    charCounter.checkLength();

    assertEquals(limitedContent, inputElement.value);
    assertEquals(
        limitedContentLength.toString(), dom.getTextContent(countElement));
  },

  testCheckLength_overflowContent() {
    const tooLongContent = 'This is too long text content';
    const truncatedContent = 'This is too long text con';

    // Set content longer than the maxLength and test the characters remaining
    // in DOM with overflowing content
    setupCheckLength(tooLongContent, remaining);

    assertEquals(truncatedContent, inputElement.value);
    assertEquals('0', dom.getTextContent(countElement));

    // Set content longer than the maxLength and test the characters
    // incremented in DOM with overflowing content
    setupCheckLength(tooLongContent, incremental);

    assertEquals(truncatedContent, inputElement.value);
    assertEquals(maxLength.toString(), dom.getTextContent(countElement));
  },

  testCheckLength_newLineContent() {
    const newLineContent = 'New\nline';
    const newLineContentLength = newLineContent.length;
    const remainingNewLineContentLength = maxLength - newLineContentLength;

    const carriageReturnContent = 'New\r\nline';
    const carriageReturnContentLength = carriageReturnContent.length;
    const remainingCarriageReturnContentLength =
        maxLength - carriageReturnContentLength;

    // Set some content with new line characters and test the characters
    // remaining in DOM
    setupCheckLength(newLineContent, remaining);

    // Test for IE 7,8 which appends \r to \n
    if (userAgent.IE && !userAgent.isVersionOrHigher('9.0')) {
      assertEquals(carriageReturnContent, inputElement.value);
      assertEquals(
          remainingCarriageReturnContentLength.toString(),
          dom.getTextContent(countElement));
    } else {
      assertEquals(newLineContent, inputElement.value);
      assertEquals(
          remainingNewLineContentLength.toString(),
          dom.getTextContent(countElement));
    }

    // Set some content with new line characters and test the characters
    // incremental in DOM
    setupCheckLength(newLineContent, incremental);

    // Test for IE 7,8 which appends \r to \n
    if (userAgent.IE && !userAgent.isVersionOrHigher('9.0')) {
      assertEquals(carriageReturnContent, inputElement.value);
      assertEquals(
          carriageReturnContentLength.toString(),
          dom.getTextContent(countElement));
    } else {
      assertEquals(newLineContent, inputElement.value);
      assertEquals(
          newLineContentLength.toString(), dom.getTextContent(countElement));
    }
  },

  testCheckLength_carriageReturnContent() {
    const newLineContent = 'New\nline';
    const newLineContentLength = newLineContent.length;
    const remainingNewLineContentLength = maxLength - newLineContentLength;

    const carriageReturnContent = 'New\r\nline';
    const carriageReturnContentLength = carriageReturnContent.length;
    const remainingCarriageReturnContentLength =
        maxLength - carriageReturnContentLength;

    // Set some content with carriage return characters and test the
    // characters remaining in DOM
    setupCheckLength(carriageReturnContent, remaining);

    // Test for IE 7,8
    if (userAgent.IE && !userAgent.isVersionOrHigher('9.0')) {
      assertEquals(carriageReturnContent, inputElement.value);
      assertEquals(
          remainingCarriageReturnContentLength.toString(),
          dom.getTextContent(countElement));
    } else {
      // Others replace \r\n with \n
      assertEquals(newLineContent, inputElement.value);
      assertEquals(
          remainingNewLineContentLength.toString(),
          dom.getTextContent(countElement));
    }

    // Set some content with carriage return characters and test the
    // characters incremental in DOM
    setupCheckLength(carriageReturnContent, incremental);

    // Test for IE 7,8
    if (userAgent.IE && !userAgent.isVersionOrHigher('9.0')) {
      assertEquals(carriageReturnContent, inputElement.value);
      assertEquals(
          carriageReturnContentLength.toString(),
          dom.getTextContent(countElement));
    } else {
      // Others replace \r\n with \n
      assertEquals(newLineContent, inputElement.value);
      assertEquals(
          newLineContentLength.toString(), dom.getTextContent(countElement));
    }
  },
});
