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

goog.provide('goog.editor.plugins.TableEditorTest');
goog.setTestOnly('goog.editor.plugins.TableEditorTest');

goog.require('goog.dom');
goog.require('goog.dom.Range');
goog.require('goog.dom.TagName');
goog.require('goog.editor.plugins.TableEditor');
goog.require('goog.object');
goog.require('goog.string');
goog.require('goog.testing.ExpectedFailures');
goog.require('goog.testing.JsUnitException');
goog.require('goog.testing.TestCase');
goog.require('goog.testing.editor.FieldMock');
goog.require('goog.testing.editor.TestHelper');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

var field;
var plugin;
var fieldMock;
var expectedFailures;
var testHelper;

function setUpPage() {
  field = goog.dom.getElement('field');
  expectedFailures = new goog.testing.ExpectedFailures();
}

function setUp() {
  // TODO(b/25875505): Fix unreported assertions (go/failonunreportedasserts).
  goog.testing.TestCase.getActiveTestCase().failOnUnreportedAsserts = false;

  testHelper = new goog.testing.editor.TestHelper(goog.dom.getElement('field'));
  testHelper.setUpEditableElement();
  field.focus();
  plugin = new goog.editor.plugins.TableEditor();
  fieldMock = new goog.testing.editor.FieldMock();
  plugin.registerFieldObject(fieldMock);
  if (goog.userAgent.IE &&
      (goog.userAgent.compare(goog.userAgent.VERSION, '7.0') >= 0)) {
    goog.testing.TestCase.protectedTimeout_ = window.setTimeout;
  }
}

function tearDown() {
  testHelper.tearDownEditableElement();
  expectedFailures.handleTearDown();
}

function testEnable() {
  fieldMock.$replay();

  plugin.enable(fieldMock);
  assertTrue('Plugin should be enabled', plugin.isEnabled(fieldMock));

  if (goog.userAgent.GECKO) {
    // This code path is executed only for GECKO browsers but we can't
    // verify it because of a GECKO bug while reading the value of the
    // command "enableObjectResizing".
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=506368
    expectedFailures.expectFailureFor(goog.userAgent.GECKO);
    try {
      var doc = plugin.getFieldDomHelper().getDocument();
      assertTrue(
          'Object resizing should be enabled',
          doc.queryCommandValue('enableObjectResizing'));
    } catch (e) {
      // We need to marshal our exception in order for it to be handled
      // properly.
      expectedFailures.handleException(new goog.testing.JsUnitException(e));
    }
  }
  fieldMock.$verify();
}

function testIsSupportedCommand() {
  goog.object.forEach(
      goog.editor.plugins.TableEditor.COMMAND, function(command) {
        assertTrue(
            goog.string.subs('Plugin should support %s', command),
            plugin.isSupportedCommand(command));
      });
  assertFalse(
      'Plugin shouldn\'t support a bogus command',
      plugin.isSupportedCommand('+fable'));
}

function testCreateTable() {
  fieldMock.$replay();
  createTableAndSelectCell();
  var table = plugin.getCurrentTable_();
  assertNotNull('Table should not be null', table);
  assertEquals(
      'Table should have the default number of rows', 2, table.rows.length);
  assertEquals(
      'Table should have the default number of cells', 8, getCellCount(table));
  fieldMock.$verify();
}

function testInsertRowBefore() {
  fieldMock.$replay();
  createTableAndSelectCell();
  var table = plugin.getCurrentTable_();
  var selectedRow = fieldMock.getRange().getContainerElement().parentNode;
  assertNull(
      'Selected row shouldn\'t have a previous sibling',
      selectedRow.previousSibling);
  assertEquals('Table should have two rows', 2, table.rows.length);
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.INSERT_ROW_BEFORE);
  assertEquals('A row should have been inserted', 3, table.rows.length);

  // Assert that we inserted a row above the currently selected row.
  assertNotNull(
      'Selected row should have a previous sibling',
      selectedRow.previousSibling);
  fieldMock.$verify();
}

function testInsertRowAfter() {
  fieldMock.$replay();
  createTableAndSelectCell({width: 2, height: 1});
  var selectedRow = fieldMock.getRange().getContainerElement().parentNode;
  var table = plugin.getCurrentTable_();
  assertEquals('Table should have one row', 1, table.rows.length);
  assertNull(
      'Selected row shouldn\'t have a next sibling', selectedRow.nextSibling);
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.INSERT_ROW_AFTER);
  assertEquals('A row should have been inserted', 2, table.rows.length);
  // Assert that we inserted a row after the currently selected row.
  assertNotNull(
      'Selected row should have a next sibling', selectedRow.nextSibling);
  fieldMock.$verify();
}

function testInsertColumnBefore() {
  fieldMock.$replay();
  createTableAndSelectCell({width: 1, height: 1});
  var table = plugin.getCurrentTable_();
  var selectedCell = fieldMock.getRange().getContainerElement();
  assertEquals('Table should have one cell', 1, getCellCount(table));
  assertNull(
      'Selected cell shouldn\'t have a previous sibling',
      selectedCell.previousSibling);
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.INSERT_COLUMN_BEFORE);
  assertEquals('A cell should have been inserted', 2, getCellCount(table));
  assertNotNull(
      'Selected cell should have a previous sibling',
      selectedCell.previousSibling);
  fieldMock.$verify();
}

function testInsertColumnAfter() {
  fieldMock.$replay();
  createTableAndSelectCell({width: 1, height: 1});
  var table = plugin.getCurrentTable_();
  var selectedCell = fieldMock.getRange().getContainerElement();
  assertEquals('Table should have one cell', 1, getCellCount(table));
  assertNull(
      'Selected cell shouldn\'t have a next sibling', selectedCell.nextSibling);
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.INSERT_COLUMN_AFTER);
  assertEquals('A cell should have been inserted', 2, getCellCount(table));
  assertNotNull(
      'Selected cell should have a next sibling', selectedCell.nextSibling);
  fieldMock.$verify();
}

function testRemoveRows() {
  fieldMock.$replay();
  createTableAndSelectCell({width: 1, height: 2});
  var table = plugin.getCurrentTable_();
  var selectedCell = fieldMock.getRange().getContainerElement();
  selectedCell.id = 'selected';
  assertEquals('Table should have two rows', 2, table.rows.length);
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.REMOVE_ROWS);
  assertEquals('A row should have been removed', 1, table.rows.length);
  assertNull(
      'The correct row should have been removed',
      goog.dom.getElement('selected'));

  // Verify that the table is removed if we don't have any rows.
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.REMOVE_ROWS);
  assertEquals(
      'The table should have been removed', 0,
      goog.dom.getElementsByTagName(goog.dom.TagName.TABLE, field).length);
  fieldMock.$verify();
}

function testRemoveColumns() {
  fieldMock.$replay();
  createTableAndSelectCell({width: 2, height: 1});
  var table = plugin.getCurrentTable_();
  var selectedCell = fieldMock.getRange().getContainerElement();
  selectedCell.id = 'selected';
  assertEquals('Table should have two cells', 2, getCellCount(table));
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.REMOVE_COLUMNS);
  assertEquals('A cell should have been removed', 1, getCellCount(table));
  assertNull(
      'The correct cell should have been removed',
      goog.dom.getElement('selected'));

  // Verify that the table is removed if we don't have any columns.
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.REMOVE_COLUMNS);
  assertEquals(
      'The table should have been removed', 0,
      goog.dom.getElementsByTagName(goog.dom.TagName.TABLE, field).length);
  fieldMock.$verify();
}

function testSplitCell() {
  fieldMock.$replay();
  createTableAndSelectCell({width: 1, height: 1});
  var table = plugin.getCurrentTable_();
  var selectedCell = fieldMock.getRange().getContainerElement();
  // Splitting is only supported if we set these attributes.
  selectedCell.rowSpan = '1';
  selectedCell.colSpan = '2';
  goog.dom.setTextContent(selectedCell, 'foo');
  goog.dom.Range.createFromNodeContents(selectedCell).select();
  assertEquals('Table should have one cell', 1, getCellCount(table));
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.SPLIT_CELL);
  assertEquals('The cell should have been split', 2, getCellCount(table));
  assertEquals(
      'The cell content should be intact', 'foo', selectedCell.innerHTML);
  assertNotNull(
      'The new cell should be inserted before', selectedCell.previousSibling);
  fieldMock.$verify();
}

function testMergeCells() {
  fieldMock.$replay();
  createTableAndSelectCell({width: 2, height: 1});
  var table = plugin.getCurrentTable_();
  var selectedCell = fieldMock.getRange().getContainerElement();
  goog.dom.setTextContent(selectedCell, 'foo');
  goog.dom.setTextContent(selectedCell.nextSibling, 'bar');
  var range = goog.dom.Range.createFromNodeContents(
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, table)[0]);
  range.select();
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.MERGE_CELLS);
  expectedFailures.expectFailureFor(
      goog.userAgent.IE && goog.userAgent.isVersionOrHigher('8'));
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
}


/**
 * Helper routine which returns the number of cells in the table.
 *
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
 *
 * @param {Object} op_tableProps Optional table properties.
 */
function createTableAndSelectCell(opt_tableProps) {
  goog.dom.Range.createCaret(field, 1).select();
  plugin.execCommandInternal(
      goog.editor.plugins.TableEditor.COMMAND.TABLE, opt_tableProps);
  if (goog.userAgent.IE) {
    var range = goog.dom.Range.createFromNodeContents(
        goog.dom.getElementsByTagName(goog.dom.TagName.TD, field)[0]);
    range.select();
  }
}
