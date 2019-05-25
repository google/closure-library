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

goog.module('goog.testing.ui.styleTest');
goog.setTestOnly();

const TestCase = goog.require('goog.testing.TestCase');
const dom = goog.require('goog.dom');
const style = goog.require('goog.testing.ui.style');
const testSuite = goog.require('goog.testing.testSuite');

// Write iFrame tag to load reference FastUI markup. Then, our tests will
// compare the generated markup to the reference markup.
const refPath = 'style_reference.html';
style.writeReferenceFrame(refPath);

// assertStructureMatchesReference should succeed if the structure, node
// names, and classes match.

// assertStructureMatchesReference should fail if one of the nodes is
// missing a class.

// assertStructureMatchesReference should NOT fail if one of the nodes has
// an additional class.

// assertStructureMatchesReference should fail if there is a missing child
// node somewhere in the DOM structure.

// assertStructureMatchesReference should fail if there is an extra child
// node somewhere in the DOM structure.

testSuite({
  setUp() {
    // TODO(b/25875505): Fix unreported assertions (go/failonunreportedasserts).
    TestCase.getActiveTestCase().failOnUnreportedAsserts = false;
  },

  testCorrect() {
    const el = dom.getFirstElementChild(dom.getElement('correct'));
    style.assertStructureMatchesReference(el, 'reference');
  },

  testMissingClass() {
    const el = dom.getFirstElementChild(dom.getElement('missing-class'));
    const e = assertThrows(() => {
      style.assertStructureMatchesReference(el, 'reference');
    });
    assertContains('all reference classes', e.message);
  },

  testExtraClass() {
    const el = dom.getFirstElementChild(dom.getElement('extra-class'));
    style.assertStructureMatchesReference(el, 'reference');
  },

  testMissingChild() {
    const el = dom.getFirstElementChild(dom.getElement('missing-child'));
    const e = assertThrows(() => {
      style.assertStructureMatchesReference(el, 'reference');
    });
    assertContains('same number of children', e.message);
  },

  testExtraChild() {
    const el = dom.getFirstElementChild(dom.getElement('extra-child'));
    const e = assertThrows(() => {
      style.assertStructureMatchesReference(el, 'reference');
    });
    assertContains('same number of children', e.message);
  },
});
