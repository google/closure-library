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

goog.module('goog.ui.DrilldownRowTest');
goog.setTestOnly();

const DrilldownRow = goog.require('goog.ui.DrilldownRow');
const SafeHtml = goog.require('goog.html.SafeHtml');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');

function createHtmlForRow(rowText) {
  return SafeHtml.create(
      TagName.TR, {},
      SafeHtml.concat(
          SafeHtml.create(TagName.TD, {}, rowText),
          SafeHtml.create(TagName.TD, {}, 'Second column')));
}
testSuite({
  testMakeRows() {
    const ff = dom.getElement('firstRow');
    const d = new DrilldownRow({});
    const d1 = new DrilldownRow({html: createHtmlForRow('Second row')});
    const d2 = new DrilldownRow({html: createHtmlForRow('Third row')});
    const d21 = new DrilldownRow({html: createHtmlForRow('Fourth row')});
    const d22 = new DrilldownRow(DrilldownRow.sampleProperties);
    d.decorate(ff);
    d.addChild(d1, true);
    d.addChild(d2, true);
    d2.addChild(d21, true);
    d2.addChild(d22, true);

    assertThrows(() => {
      d.findIndex();
    });

    assertEquals(0, d1.findIndex());
    assertEquals(1, d2.findIndex());
  },
});
