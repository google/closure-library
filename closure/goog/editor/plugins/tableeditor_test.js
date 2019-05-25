// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.editor.plugins.TableEditorTest');
goog.setTestOnly();

const ExpectedFailures = goog.require('goog.testing.ExpectedFailures');
const FieldMock = goog.require('goog.testing.editor.FieldMock');
const JsUnitException = goog.require('goog.testing.JsUnitException');
const Range = goog.require('goog.dom.Range');
const TableEditor = goog.require('goog.editor.plugins.TableEditor');
const TagName = goog.require('goog.dom.TagName');
const TestCase = goog.require('goog.testing.TestCase');
const TestHelper = goog.require('goog.testing.editor.TestHelper');
const dom = goog.require('goog.dom');
const googObject = goog.require('goog.object');
const googString = goog.require('goog.string');
const testSuite = goog.require('goog.testing.testSuite');
const userAgent = goog.require('goog.userAgent');

let field;
let plugin;
let fieldMock;
let expectedFailures;
let testHelper;

/**
 * Helper routine which returns the number of cells in the table.
 * @param {Element} table The table in question.
 * @return {number} Number of cells.
 */
function getCellCount(table) {
  return table.cells ? table.cells.length :
                       table.rows[0].cells.length * table.rows.length;
}

/**
 * Helper method which creates a table and puts the cursor on the first TD.
 * In IE, the cursor isn't positioned in the first cell (TD) and we simulate
 * that behavior explicitly to be consistent across all browsers.
 * @param {Object} op_tableProps Optional table properties.
 */
function createTableAndSelectCell(tableProps = undefined) {
  Range.createCaret(field, 1).select();
  plugin.execCommandInternal(TableEditor.COMMAND.TABLE, tableProps);
  if (userAgent.IE) {
    const range = Range.createFromNodeContents(
        dom.getElementsByTagName(TagName.TD, field)[0]);
    range.select();
  }
}
testSuite({
  setUpPage() {
    field = dom.getElement('field');
    expectedFailures = new ExpectedFailures();
  },

  setUp() {
    // TODO(b/25875505): Fix unreported assertions (go/failonunreportedasserts).
    TestCase.getActiveTestCase().failOnUnreportedAsserts = false;

    testHelper = new TestHelper(dom.getElement('field'));
    testHelper.setUpEditableElement();
    field.focus();
    plugin = new TableEditor();
    fieldMock = new FieldMock();
    plugin.registerFieldObject(fieldMock);
    if (userAgent.IE && (userAgent.compare(userAgent.VERSION, '7.0') >= 0)) {
      TestCase.protectedTimeout_ = window.setTimeout;
    }
  },

  tearDown() {
    testHelper.tearDownEditableElement();
    expectedFailures.handleTearDown();
  },

  testEnable() {
    fieldMock.$replay();

    plugin.enable(fieldMock);
    assertTrue('Plugin should be enabled', plugin.isEnabled(fieldMock));

    if (userAgent.GECKO) {
      // This code path is executed only for GECKO browsers but we can't
      // verify it because of a GECKO bug while reading the value of the
      // command "enableObjectResizing".
      // See https://bugzilla.mozilla.org/show_bug.cgi?id=506368
      expectedFailures.expectFailureFor(userAgent.GECKO);
      try {
        const doc = plugin.getFieldDomHelper().getDocument();
        assertTrue(
            'Object resizing should be enabled',
            doc.queryCommandValue('enableObjectResizing'));
      } catch (e) {
        // We need to marshal our exception in order for it to be handled
        // properly.
        expectedFailures.handleException(new JsUnitException(e));
      }
    }
    fieldMock.$verify();
  },

  testIsSupportedCommand() {
    googObject.forEach(TableEditor.COMMAND, (command) => {
      assertTrue(
          googString.subs('Plugin should support %s', command),
          plugin.isSupportedCommand(command));
    });
    assertFalse(
        'Plugin shouldn\'t support a bogus command',
        plugin.isSupportedCommand('+fable'));
  },

  testCreateTable() {
    fieldMock.$replay();
    createTableAndSelectCell();
    const table = plugin.getCurrentTable_();
    assertNotNull('Table should not be null', table);
    assertEquals(
        'Table should have the default number of rows', 2, table.rows.length);
    assertEquals(
        'Table should have the default number of cells', 8,
        getCellCount(table));
    fieldMock.$verify();
  },

  testInsertRowBefore() {
    fieldMock.$replay();
    createTableAndSelectCell();
    const table = plugin.getCurrentTable_();
    const selectedRow = fieldMock.getRange().getContainerElement().parentNode;
    assertNull(
        'Selected row shouldn\'t have a previous sibling',
        selectedRow.previousSibling);
    assertEquals('Table should have two rows', 2, table.rows.length);
    plugin.execCommandInternal(TableEditor.COMMAND.INSERT_ROW_BEFORE);
    assertEquals('A row should have been inserted', 3, table.rows.length);

    // Assert that we inserted a row above the currently selected row.
    assertNotNull(
        'Selected row should have a previous sibling',
        selectedRow.previousSibling);
    fieldMock.$verify();
  },

  testInsertRowAfter() {
    fieldMock.$replay();
    createTableAndSelectCell({width: 2, height: 1});
    const selectedRow = fieldMock.getRange().getContainerElement().parentNode;
    const table = plugin.getCurrentTable_();
    assertEquals('Table should have one row', 1, table.rows.length);
    assertNull(
        'Selected row shouldn\'t have a next sibling', selectedRow.nextSibling);
    plugin.execCommandInternal(TableEditor.COMMAND.INSERT_ROW_AFTER);
    assertEquals('A row should have been inserted', 2, table.rows.length);
    // Assert that we inserted a row after the currently selected row.
    assertNotNull(
        'Selected row should have a next sibling', selectedRow.nextSibling);
    fieldMock.$verify();
  },

  testInsertColumnBefore() {
    fieldMock.$replay();
    createTableAndSelectCell({width: 1, height: 1});
    const table = plugin.getCurrentTable_();
    const selectedCell = fieldMock.getRange().getContainerElement();
    assertEquals('Table should have one cell', 1, getCellCount(table));
    assertNull(
        'Selected cell shouldn\'t have a previous sibling',
        selectedCell.previousSibling);
    plugin.execCommandInternal(TableEditor.COMMAND.INSERT_COLUMN_BEFORE);
    assertEquals('A cell should have been inserted', 2, getCellCount(table));
    assertNotNull(
        'Selected cell should have a previous sibling',
        selectedCell.previousSibling);
    fieldMock.$verify();
  },

  testInsertColumnAfter() {
    fieldMock.$replay();
    createTableAndSelectCell({width: 1, height: 1});
    const table = plugin.getCurrentTable_();
    const selectedCell = fieldMock.getRange().getContainerElement();
    assertEquals('Table should have one cell', 1, getCellCount(table));
    assertNull(
        'Selected cell shouldn\'t have a next sibling',
        selectedCell.nextSibling);
    plugin.execCommandInternal(TableEditor.COMMAND.INSERT_COLUMN_AFTER);
    assertEquals('A cell should have been inserted', 2, getCellCount(table));
    assertNotNull(
        'Selected cell should have a next sibling', selectedCell.nextSibling);
    fieldMock.$verify();
  },

  testRemoveRows() {
    fieldMock.$replay();
    createTableAndSelectCell({width: 1, height: 2});
    const table = plugin.getCurrentTable_();
    const selectedCell = fieldMock.getRange().getContainerElement();
    selectedCell.id = 'selected';
    assertEquals('Table should have two rows', 2, table.rows.length);
    plugin.execCommandInternal(TableEditor.COMMAND.REMOVE_ROWS);
    assertEquals('A row should have been removed', 1, table.rows.length);
    assertNull(
        'The correct row should have been removed', dom.getElement('selected'));

    // Verify that the table is removed if we don't have any rows.
    plugin.execCommandInternal(TableEditor.COMMAND.REMOVE_ROWS);
    assertEquals(
        'The table should have been removed', 0,
        dom.getElementsByTagName(TagName.TABLE, field).length);
    fieldMock.$verify();
  },

  testRemoveColumns() {
    fieldMock.$replay();
    createTableAndSelectCell({width: 2, height: 1});
    const table = plugin.getCurrentTable_();
    const selectedCell = fieldMock.getRange().getContainerElement();
    selectedCell.id = 'selected';
    assertEquals('Table should have two cells', 2, getCellCount(table));
    plugin.execCommandInternal(TableEditor.COMMAND.REMOVE_COLUMNS);
    assertEquals('A cell should have been removed', 1, getCellCount(table));
    assertNull(
        'The correct cell should have been removed',
        dom.getElement('selected'));

    // Verify that the table is removed if we don't have any columns.
    plugin.execCommandInternal(TableEditor.COMMAND.REMOVE_COLUMNS);
    assertEquals(
        'The table should have been removed', 0,
        dom.getElementsByTagName(TagName.TABLE, field).length);
    fieldMock.$verify();
  },

  testSplitCell() {
    fieldMock.$replay();
    createTableAndSelectCell({width: 1, height: 1});
    const table = plugin.getCurrentTable_();
    const selectedCell = fieldMock.getRange().getContainerElement();
    // Splitting is only supported if we set these attributes.
    selectedCell.rowSpan = '1';
    selectedCell.colSpan = '2';
    dom.setTextContent(selectedCell, 'foo');
    Range.createFromNodeContents(selectedCell).select();
    assertEquals('Table should have one cell', 1, getCellCount(table));
    plugin.execCommandInternal(TableEditor.COMMAND.SPLIT_CELL);
    assertEquals('The cell should have been split', 2, getCellCount(table));
    assertEquals(
        'The cell content should be intact', 'foo', selectedCell.innerHTML);
    assertNotNull(
        'The new cell should be inserted before', selectedCell.previousSibling);
    fieldMock.$verify();
  },

  testMergeCells() {
    fieldMock.$replay();
    createTableAndSelectCell({width: 2, height: 1});
    const table = plugin.getCurrentTable_();
    const selectedCell = fieldMock.getRange().getContainerElement();
    dom.setTextContent(selectedCell, 'foo');
    dom.setTextContent(selectedCell.nextSibling, 'bar');
    const range = Range.createFromNodeContents(
        dom.getElementsByTagName(TagName.TR, table)[0]);
    range.select();
    plugin.execCommandInternal(TableEditor.COMMAND.MERGE_CELLS);
    expectedFailures.expectFailureFor(
        userAgent.IE && userAgent.isVersionOrHigher('8'));
    try {
      // In IE8, even after explicitly setting the range to span
      // multiple cells, the browser selection only contains the first TD
      // which causes the merge operation to fail.
      assertEquals('The cells should be merged', 1, getCellCount(table));
      assertEquals(
          'The cell should have expected colspan', 2, selectedCell.colSpan);
      assertHTMLEquals(
          'The content should be merged', 'foo bar', selectedCell.innerHTML);
    } catch (e) {
      expectedFailures.handleException(e);
    }
    fieldMock.$verify();
  },
});
