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

goog.module('goog.dom.MultiRangeTest');
goog.setTestOnly();

const MultiRange = goog.require('goog.dom.MultiRange');
const Range = goog.require('goog.dom.Range');
const dom = goog.require('goog.dom');
const iter = goog.require('goog.iter');
const testSuite = goog.require('goog.testing.testSuite');

let range;

testSuite({
  setUp() {
    range = new MultiRange.createFromTextRanges([
      Range.createFromNodeContents(dom.getElement('test2')),
      Range.createFromNodeContents(dom.getElement('test1')),
    ]);
  },

  testStartAndEnd() {
    assertEquals(dom.getElement('test1').firstChild, range.getStartNode());
    assertEquals(0, range.getStartOffset());
    assertEquals(dom.getElement('test2').firstChild, range.getEndNode());
    assertEquals(6, range.getEndOffset());
  },

  testStartAndEndIterator() {
    const it = iter.toIterator(range);
    assertEquals(dom.getElement('test1').firstChild, it.getStartNode());
    assertEquals(0, it.getStartTextOffset());
    assertEquals(dom.getElement('test2').firstChild, it.getEndNode());
    assertEquals(3, it.getEndTextOffset());

    it.next();
    it.next();
    assertEquals(6, it.getEndTextOffset());
  },

  testIteration() {
    const tags = iter.toArray(range);
    assertEquals(2, tags.length);

    assertEquals(dom.getElement('test1').firstChild, tags[0]);
    assertEquals(dom.getElement('test2').firstChild, tags[1]);
  },
});
