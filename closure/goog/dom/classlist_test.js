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

/** @fileoverview Shared code for classlist_test.html. */

goog.module('goog.dom.classlist_test');
goog.setTestOnly();

const ExpectedFailures = goog.require('goog.testing.ExpectedFailures');
const TagName = goog.require('goog.dom.TagName');
const classlist = goog.require('goog.dom.classlist');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

let expectedFailures;

testSuite({
  setUpPage() {
    expectedFailures = new ExpectedFailures();
  },

  tearDown() {
    expectedFailures.handleTearDown();
  },

  testGet() {
    const el = dom.createElement(TagName.DIV);
    assertTrue(classlist.get(el).length == 0);
    el.className = 'C';
    assertElementsEquals(['C'], classlist.get(el));
    el.className = 'C D';
    assertElementsEquals(['C', 'D'], classlist.get(el));
    el.className = 'C\nD';
    assertElementsEquals(['C', 'D'], classlist.get(el));
    el.className = ' C ';
    assertElementsEquals(['C'], classlist.get(el));
  },

  testContainsWithNewlines() {
    const el = dom.getElement('p1');
    assertTrue(
        'Should not have SOMECLASS', classlist.contains(el, 'SOMECLASS'));
    assertTrue(
        'Should also have OTHERCLASS', classlist.contains(el, 'OTHERCLASS'));
    assertFalse(
        'Should not have WEIRDCLASS', classlist.contains(el, 'WEIRDCLASS'));
  },

  testContainsCaseSensitive() {
    const el = dom.getElement('p2');
    assertFalse(
        'Should not have camelcase', classlist.contains(el, 'camelcase'));
    assertFalse(
        'Should not have CAMELCASE', classlist.contains(el, 'CAMELCASE'));
    assertTrue('Should have camelCase', classlist.contains(el, 'camelCase'));
  },

  testAddNotAddingMultiples() {
    const el = dom.createElement(TagName.DIV);
    classlist.add(el, 'A');
    assertEquals('A', el.className);
    classlist.add(el, 'A');
    assertEquals('A', el.className);
    classlist.add(el, 'B', 'B');
    assertEquals('A B', el.className);
  },

  testAddCaseSensitive() {
    const el = dom.createElement(TagName.DIV);
    classlist.add(el, 'A');
    assertTrue(classlist.contains(el, 'A'));
    assertFalse(classlist.contains(el, 'a'));
    classlist.add(el, 'a');
    assertTrue(classlist.contains(el, 'A'));
    assertTrue(classlist.contains(el, 'a'));
    assertEquals('A a', el.className);
  },

  testAddAll() {
    const elem = dom.createElement(TagName.DIV);
    elem.className = 'foo goog-bar';

    classlist.addAll(elem, ['goog-baz', 'foo']);
    assertEquals(3, classlist.get(elem).length);
    assertTrue(classlist.contains(elem, 'foo'));
    assertTrue(classlist.contains(elem, 'goog-bar'));
    assertTrue(classlist.contains(elem, 'goog-baz'));
  },

  testAddAllEmpty() {
    const classes = 'foo bar';
    const elem = dom.createElement(TagName.DIV);
    elem.className = classes;

    classlist.addAll(elem, []);
    assertEquals(elem.className, classes);
  },

  testRemove() {
    const el = dom.createElement(TagName.DIV);
    el.className = 'A B C';
    classlist.remove(el, 'B');
    assertEquals('A C', el.className);
  },

  testRemoveCaseSensitive() {
    const el = dom.createElement(TagName.DIV);
    el.className = 'A B C';
    classlist.remove(el, 'b');
    assertEquals('A B C', el.className);
  },

  testRemoveAll() {
    const elem = dom.createElement(TagName.DIV);
    elem.className = 'foo bar baz';

    classlist.removeAll(elem, ['bar', 'foo']);
    assertFalse(classlist.contains(elem, 'foo'));
    assertFalse(classlist.contains(elem, 'bar'));
    assertTrue(classlist.contains(elem, 'baz'));
  },

  testRemoveAllOne() {
    const elem = dom.createElement(TagName.DIV);
    elem.className = 'foo bar baz';

    classlist.removeAll(elem, ['bar']);
    assertFalse(classlist.contains(elem, 'bar'));
    assertTrue(classlist.contains(elem, 'foo'));
    assertTrue(classlist.contains(elem, 'baz'));
  },

  testRemoveAllSomeNotPresent() {
    const elem = dom.createElement(TagName.DIV);
    elem.className = 'foo bar baz';

    classlist.removeAll(elem, ['a', 'bar']);
    assertTrue(classlist.contains(elem, 'foo'));
    assertFalse(classlist.contains(elem, 'bar'));
    assertTrue(classlist.contains(elem, 'baz'));
  },

  testRemoveAllCaseSensitive() {
    const elem = dom.createElement(TagName.DIV);
    elem.className = 'foo bar baz';

    classlist.removeAll(elem, ['BAR', 'foo']);
    assertFalse(classlist.contains(elem, 'foo'));
    assertTrue(classlist.contains(elem, 'bar'));
    assertTrue(classlist.contains(elem, 'baz'));
  },

  testEnable() {
    const el = dom.getElement('p1');
    classlist.set(el, 'SOMECLASS FIRST');

    assertTrue('Should have FIRST class', classlist.contains(el, 'FIRST'));
    assertTrue(
        'Should have SOMECLASS class', classlist.contains(el, 'SOMECLASS'));

    classlist.enable(el, 'FIRST', false);

    assertFalse('Should not have FIRST class', classlist.contains(el, 'FIRST'));
    assertTrue(
        'Should have SOMECLASS class', classlist.contains(el, 'SOMECLASS'));

    classlist.enable(el, 'FIRST', true);

    assertTrue('Should have FIRST class', classlist.contains(el, 'FIRST'));
    assertTrue(
        'Should have SOMECLASS class', classlist.contains(el, 'SOMECLASS'));
  },

  testEnableNotAddingMultiples() {
    const el = dom.createElement(TagName.DIV);
    classlist.enable(el, 'A', true);
    assertEquals('A', el.className);
    classlist.enable(el, 'A', true);
    assertEquals('A', el.className);
    classlist.enable(el, 'B', 'B', true);
    assertEquals('A B', el.className);
  },

  testEnableAllRemove() {
    const elem = dom.createElement(TagName.DIV);
    elem.className = 'foo bar baz';

    // Test removing some classes (some not present).
    classlist.enableAll(elem, ['a', 'bar'], false /* enable */);
    assertTrue(classlist.contains(elem, 'foo'));
    assertFalse(classlist.contains(elem, 'bar'));
    assertTrue(classlist.contains(elem, 'baz'));
    assertFalse(classlist.contains(elem, 'a'));
  },

  testEnableAllAdd() {
    const elem = dom.createElement(TagName.DIV);
    elem.className = 'foo bar';

    // Test adding some classes (some duplicate).
    classlist.enableAll(elem, ['a', 'bar', 'baz'], true /* enable */);
    assertTrue(classlist.contains(elem, 'foo'));
    assertTrue(classlist.contains(elem, 'bar'));
    assertTrue(classlist.contains(elem, 'baz'));
    assertTrue(classlist.contains(elem, 'a'));
  },

  testSwap() {
    const el = dom.getElement('p1');
    classlist.set(el, 'SOMECLASS FIRST');

    assertTrue('Should have FIRST class', classlist.contains(el, 'FIRST'));
    assertTrue('Should have FIRST class', classlist.contains(el, 'SOMECLASS'));
    assertFalse(
        'Should not have second class', classlist.contains(el, 'second'));

    classlist.swap(el, 'FIRST', 'second');

    assertFalse('Should not have FIRST class', classlist.contains(el, 'FIRST'));
    assertTrue('Should have FIRST class', classlist.contains(el, 'SOMECLASS'));
    assertTrue('Should have second class', classlist.contains(el, 'second'));

    classlist.swap(el, 'second', 'FIRST');

    assertTrue('Should have FIRST class', classlist.contains(el, 'FIRST'));
    assertTrue('Should have FIRST class', classlist.contains(el, 'SOMECLASS'));
    assertFalse(
        'Should not have second class', classlist.contains(el, 'second'));
  },

  testToggle() {
    const el = dom.getElement('p1');
    classlist.set(el, 'SOMECLASS FIRST');

    assertTrue('Should have FIRST class', classlist.contains(el, 'FIRST'));
    assertTrue(
        'Should have SOMECLASS class', classlist.contains(el, 'SOMECLASS'));

    let ret = classlist.toggle(el, 'FIRST');

    assertFalse('Should not have FIRST class', classlist.contains(el, 'FIRST'));
    assertTrue(
        'Should have SOMECLASS class', classlist.contains(el, 'SOMECLASS'));
    assertFalse('Return value should have been false', ret);

    ret = classlist.toggle(el, 'FIRST');

    assertTrue('Should have FIRST class', classlist.contains(el, 'FIRST'));
    assertTrue(
        'Should have SOMECLASS class', classlist.contains(el, 'SOMECLASS'));
    assertTrue('Return value should have been true', ret);
  },

  testAddRemoveString() {
    const el = dom.createElement(TagName.DIV);
    el.className = 'A';

    classlist.addRemove(el, 'A', 'B');
    assertEquals('B', el.className);

    classlist.addRemove(el, 'Z', 'C');
    assertEquals('B C', el.className);

    classlist.addRemove(el, 'C', 'D');
    assertEquals('B D', el.className);

    classlist.addRemove(el, 'D', 'B');
    assertEquals('B', el.className);
  },
});
