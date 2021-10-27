/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.dom.iterTest');
goog.setTestOnly();

const AncestorIterator = goog.require('goog.dom.iter.AncestorIterator');
const ChildIterator = goog.require('goog.dom.iter.ChildIterator');
const NodeType = goog.require('goog.dom.NodeType');
const SiblingIterator = goog.require('goog.dom.iter.SiblingIterator');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');
const testingDom = goog.require('goog.testing.dom');

let test;
let br;

testSuite({
  setUpPage() {
    test = dom.getElement('test');
    br = dom.getElement('br');
  },

  testNextSibling() {
    const expectedContent = ['#br', 'def'];
    testingDom.assertNodesMatch(
        new SiblingIterator(test.firstChild), expectedContent);
    testingDom.assertNodesMatch(
        new SiblingIterator(test.firstChild), expectedContent, false);
  },

  testNextSiblingInclusive() {
    const expectedContent = ['abc', '#br', 'def'];
    testingDom.assertNodesMatch(
        new SiblingIterator(test.firstChild, true), expectedContent);
    testingDom.assertNodesMatch(
        new SiblingIterator(test.firstChild, true), expectedContent, false);
  },

  testPreviousSibling() {
    const expectedContent = ['#br', 'abc'];
    testingDom.assertNodesMatch(
        new SiblingIterator(test.lastChild, false, true), expectedContent);
    testingDom.assertNodesMatch(
        new SiblingIterator(test.lastChild, false, true), expectedContent,
        false);
  },

  testPreviousSiblingInclusive() {
    const expectedContent = ['def', '#br', 'abc'];
    testingDom.assertNodesMatch(
        new SiblingIterator(test.lastChild, true, true), expectedContent);
    testingDom.assertNodesMatch(
        new SiblingIterator(test.lastChild, true, true), expectedContent,
        false);
  },

  testChildIterator() {
    const expectedContent = ['abc', '#br', 'def'];
    testingDom.assertNodesMatch(new ChildIterator(test), expectedContent);
    testingDom.assertNodesMatch(
        new ChildIterator(test), expectedContent, false);
  },

  testChildIteratorIndex() {
    const expectedContent = ['#br', 'def'];
    testingDom.assertNodesMatch(
        new ChildIterator(test, false, 1), expectedContent);
    testingDom.assertNodesMatch(
        new ChildIterator(test, false, 1), expectedContent, false);
  },

  testChildIteratorReverse() {
    const expectedContent = ['def', '#br', 'abc'];
    testingDom.assertNodesMatch(new ChildIterator(test, true), expectedContent);
    testingDom.assertNodesMatch(
        new ChildIterator(test, true), expectedContent, false);
  },

  testEmptyChildIteratorReverse() {
    const expectedContent = [];
    testingDom.assertNodesMatch(new ChildIterator(br, true), expectedContent);
    testingDom.assertNodesMatch(
        new ChildIterator(br, true), expectedContent, false);
  },

  testChildIteratorIndexReverse() {
    const expectedContent = ['#br', 'abc'];
    testingDom.assertNodesMatch(
        new ChildIterator(test, true, 1), expectedContent);
    testingDom.assertNodesMatch(
        new ChildIterator(test, true, 1), expectedContent, false);
  },

  testAncestorIterator() {
    const expectedContent = ['#test', '#body', '#html', NodeType.DOCUMENT];
    testingDom.assertNodesMatch(new AncestorIterator(br), expectedContent);
    testingDom.assertNodesMatch(
        new AncestorIterator(br), expectedContent, false);
  },

  testAncestorIteratorInclusive() {
    const expectedContent =
        ['#br', '#test', '#body', '#html', NodeType.DOCUMENT];
    testingDom.assertNodesMatch(
        new AncestorIterator(br, true), expectedContent);
    testingDom.assertNodesMatch(
        new AncestorIterator(br, true), expectedContent, false);
  },
});
