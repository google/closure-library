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

goog.provide('goog.editor.TableTest');
goog.setTestOnly('goog.editor.TableTest');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.editor.Table');
goog.require('goog.testing.jsunit');

function setUp() {
  var inputTables = goog.dom.getElementsByTagName(goog.dom.TagName.TABLE);
  testElements = {};
  testObjects = {};
  for (var i = 0; i < inputTables.length; i++) {
    var originalTable = inputTables[i];
    if (originalTable.id.substring(0, 5) == 'test-') {
      var tableName = originalTable.id.substring(5);
      var testTable = originalTable.cloneNode(true);
      testTable.id = tableName;
      testElements[tableName] = testTable;
      document.body.appendChild(testTable);
      testObjects[tableName] = new goog.editor.Table(testTable);
    }
  }
}

function tearDown() {
  for (var tableName in testElements) {
    document.body.removeChild(testElements[tableName]);
    delete testElements[tableName];
    delete testObjects[tableName];
  }
  testElements = null;
  testObjects = null;
}

function tableSanityCheck(editableTable, rowCount, colCount) {
  assertEquals(
      'Table has expected number of rows', rowCount, editableTable.rows.length);
  for (var i = 0, row; row = editableTable.rows[i]; i++) {
    assertEquals(
        'Row ' + i + ' has expected number of columns', colCount,
        row.columns.length);
  }
}

function testBasicTable() {
  // Do some basic sanity checking on the editable table structure
  tableSanityCheck(testObjects.basic, 4, 3);
  var originalRows =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.basic);
  assertEquals(
      'Basic table row count, compared to source', originalRows.length,
      testObjects.basic.rows.length);
  assertEquals(
      'Basic table row count, known value', 4, testObjects.basic.rows.length);
  assertEquals(
      'Basic table first row element', originalRows[0],
      testObjects.basic.rows[0].element);
  assertEquals(
      'Basic table last row element', originalRows[3],
      testObjects.basic.rows[3].element);
  assertEquals(
      'Basic table first row length', 3,
      testObjects.basic.rows[0].columns.length);
  assertEquals(
      'Basic table last row length', 3,
      testObjects.basic.rows[3].columns.length);
}

function testTortureTable() {
  // Do basic sanity checking on torture table structure
  tableSanityCheck(testObjects.torture, 9, 3);
  var originalRows =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.torture);
  assertEquals(
      'Torture table row count, compared to source', originalRows.length,
      testObjects.torture.rows.length);
  assertEquals(
      'Torture table row count, known value', 9,
      testObjects.torture.rows.length);
}

function _testInsertRowResult(element, editableTable, newTr, index) {
  var originalRowCount;
  if (element == testElements.basic) {
    originalRowCount = 4;
  } else if (element == testElements.torture) {
    originalRowCount = 9;
  }

  assertEquals(
      'Row was added to table', originalRowCount + 1,
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, element).length);
  assertEquals(
      'Row was added at position ' + index,
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, element)[index],
      newTr);
  assertEquals(
      'Row knows its own position', index, editableTable.rows[index].index);
  assertEquals(
      'EditableTable shows row at position ' + index, newTr,
      editableTable.rows[index].element);
  assertEquals(
      'New row has correct number of TDs', 3,
      goog.dom.getElementsByTagName(goog.dom.TagName.TD, newTr).length);
}

function testInsertRowAtBeginning() {
  var tr = testObjects.basic.insertRow(0);
  _testInsertRowResult(testElements.basic, testObjects.basic, tr, 0);
}

function testInsertRowInMiddle() {
  var tr = testObjects.basic.insertRow(2);
  _testInsertRowResult(testElements.basic, testObjects.basic, tr, 2);
}

function testInsertRowAtEnd() {
  assertEquals(
      'Table has expected number of existing rows', 4,
      testObjects.basic.rows.length);
  var tr = testObjects.basic.insertRow(4);
  _testInsertRowResult(testElements.basic, testObjects.basic, tr, 4);
}

function testInsertRowAtEndNoIndexArgument() {
  assertEquals(
      'Table has expected number of existing rows', 4,
      testObjects.basic.rows.length);
  var tr = testObjects.basic.insertRow();
  _testInsertRowResult(testElements.basic, testObjects.basic, tr, 4);
}

function testInsertRowAtBeginningRowspan() {
  // Test inserting a row when the existing DOM row at that index has
  // a cell with a rowspan. This should be just like a regular insert -
  // the rowspan shouldn't have any effect.
  assertEquals(
      'Cell has starting rowspan', 2,
      goog.dom
          .getFirstElementChild(goog.dom.getElementsByTagName(
              goog.dom.TagName.TR, testElements.torture)[0])
          .rowSpan);
  var tr = testObjects.torture.insertRow(0);
  // Among other things this verifies that the new row has 3 child TDs.
  _testInsertRowResult(testElements.torture, testObjects.torture, tr, 0);
}

function testInsertRowAtEndingRowspan() {
  // Test inserting a row when there's a cell in a previous DOM row
  // with a rowspan that extends into the row with the given index
  // and ends there. This should be just like a regular insert -
  // the rowspan shouldn't have any effect.
  assertEquals(
      'Cell has ending rowspan', 4,
      goog.dom
          .getLastElementChild(goog.dom.getElementsByTagName(
              goog.dom.TagName.TR, testElements.torture)[5])
          .rowSpan);
  var tr = testObjects.torture.insertRow();
  // Among other things this verifies that the new row has 3 child TDs.
  _testInsertRowResult(testElements.torture, testObjects.torture, tr, 9);
}

function testInsertRowAtSpanningRowspan() {
  // Test inserting a row at an index where there's a cell with a rowspan
  // that begins in a previous row and continues into the next row. In this
  // case the existing cell's rowspan should be extended, and the new
  // tr should have one less child element.
  var rowSpannedCell = testObjects.torture.rows[7].columns[2];
  assertTrue(
      'Existing cell has overlapping rowspan',
      rowSpannedCell.startRow == 5 && rowSpannedCell.endRow == 8);
  var tr = testObjects.torture.insertRow(7);
  assertEquals(
      'New DOM row has one less cell', 2,
      goog.dom.getElementsByTagName(goog.dom.TagName.TD, tr).length);
  assertEquals(
      'Rowspanned cell listed in new EditableRow\'s columns',
      testObjects.torture.rows[6].columns[2].element,
      testObjects.torture.rows[7].columns[2].element);
}

function _testInsertColumnResult(newCells, element, editableTable, index) {
  for (var rowNo = 0, row; row = editableTable.rows[rowNo]; rowNo++) {
    assertEquals('Row includes new column', 4, row.columns.length);
  }
  assertEquals(
      'New cell in correct position', newCells[0],
      editableTable.rows[0].columns[index].element);
}

function testInsertColumnAtBeginning() {
  var startColCount = testObjects.basic.rows[0].columns.length;
  var newCells = testObjects.basic.insertColumn(0);
  assertEquals(
      'New cell added for each row', testObjects.basic.rows.length,
      newCells.length);
  assertEquals(
      'Insert column incremented column length', startColCount + 1,
      testObjects.basic.rows[0].columns.length);
  _testInsertColumnResult(newCells, testElements.basic, testObjects.basic, 0);
}

function testInsertColumnAtEnd() {
  var startColCount = testObjects.basic.rows[0].columns.length;
  var newCells = testObjects.basic.insertColumn(3);
  assertEquals(
      'New cell added for each row', testObjects.basic.rows.length,
      newCells.length);
  assertEquals(
      'Insert column incremented column length', startColCount + 1,
      testObjects.basic.rows[0].columns.length);
  _testInsertColumnResult(newCells, testElements.basic, testObjects.basic, 3);
}

function testInsertColumnAtEndNoIndexArgument() {
  var startColCount = testObjects.basic.rows[0].columns.length;
  var newCells = testObjects.basic.insertColumn();
  assertEquals(
      'New cell added for each row', testObjects.basic.rows.length,
      newCells.length);
  assertEquals(
      'Insert column incremented column length', startColCount + 1,
      testObjects.basic.rows[0].columns.length);
  _testInsertColumnResult(newCells, testElements.basic, testObjects.basic, 3);
}

function testInsertColumnInMiddle() {
  var startColCount = testObjects.basic.rows[0].columns.length;
  var newCells = testObjects.basic.insertColumn(2);
  assertEquals(
      'New cell added for each row', testObjects.basic.rows.length,
      newCells.length);
  assertEquals(
      'Insert column incremented column length', startColCount + 1,
      testObjects.basic.rows[0].columns.length);
  _testInsertColumnResult(newCells, testElements.basic, testObjects.basic, 2);
}

function testInsertColumnAtBeginningColSpan() {
  var cells = testObjects.torture.insertColumn(0);
  tableSanityCheck(testObjects.torture, 9, 4);
  assertEquals(
      'New cell was added before colspanned cell', 1,
      testObjects.torture.rows[3].columns[0].colSpan);
  assertEquals(
      'New cell was added and returned',
      testObjects.torture.rows[3].columns[0].element, cells[3]);
}

function testInsertColumnAtEndingColSpan() {
  var cells = testObjects.torture.insertColumn();
  tableSanityCheck(testObjects.torture, 9, 4);
  assertEquals(
      'New cell was added after colspanned cell', 1,
      testObjects.torture.rows[0].columns[3].colSpan);
  assertEquals(
      'New cell was added and returned',
      testObjects.torture.rows[0].columns[3].element, cells[0]);
}

function testInsertColumnAtSpanningColSpan() {
  assertEquals(
      'Existing cell has expected colspan', 3,
      testObjects.torture.rows[4].columns[1].colSpan);
  var cells = testObjects.torture.insertColumn(1);
  tableSanityCheck(testObjects.torture, 9, 4);
  assertEquals(
      'Existing cell increased colspan', 4,
      testObjects.torture.rows[4].columns[1].colSpan);
  assertEquals(
      '3 cells weren\'t created due to existing colspans', 6, cells.length);
}

function testRemoveFirstRow() {
  var originalRow =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.basic)[0];
  testObjects.basic.removeRow(0);
  tableSanityCheck(testObjects.basic, 3, 3);
  assertNotEquals(
      'Row was removed from table element', originalRow,
      goog.dom.getElementsByTagName(
          goog.dom.TagName.TR, testElements.basic)[0]);
}

function testRemoveLastRow() {
  var originalRow =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.basic)[3];
  testObjects.basic.removeRow(3);
  tableSanityCheck(testObjects.basic, 3, 3);
  assertNotEquals(
      'Row was removed from table element', originalRow,
      goog.dom.getElementsByTagName(
          goog.dom.TagName.TR, testElements.basic)[3]);
}

function testRemoveMiddleRow() {
  var originalRow =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.basic)[2];
  testObjects.basic.removeRow(2);
  tableSanityCheck(testObjects.basic, 3, 3);
  assertNotEquals(
      'Row was removed from table element', originalRow,
      goog.dom.getElementsByTagName(
          goog.dom.TagName.TR, testElements.basic)[2]);
}

function testRemoveRowAtBeginingRowSpan() {
  var originalRow = testObjects.torture.removeRow(0);
  tableSanityCheck(testObjects.torture, 8, 3);
  assertNotEquals(
      'Row was removed from table element', originalRow,
      goog.dom.getElementsByTagName(
          goog.dom.TagName.TR, testElements.basic)[0]);
  assertEquals(
      'Rowspan correctly adjusted', 1,
      testObjects.torture.rows[0].columns[0].rowSpan);
}

function testRemoveRowAtEndingRowSpan() {
  var originalRow = goog.dom.getElementsByTagName(
      goog.dom.TagName.TR, testElements.torture)[8];
  testObjects.torture.removeRow(8);
  tableSanityCheck(testObjects.torture, 8, 3);
  assertNotEquals(
      'Row was removed from table element', originalRow,
      goog.dom.getElementsByTagName(
          goog.dom.TagName.TR, testElements.basic)[8]);
  assertEquals(
      'Rowspan correctly adjusted', 3,
      testObjects.torture.rows[7].columns[2].rowSpan);
}

function testRemoveRowAtSpanningRowSpan() {
  var originalRow = goog.dom.getElementsByTagName(
      goog.dom.TagName.TR, testElements.torture)[7];
  testObjects.torture.removeRow(7);
  tableSanityCheck(testObjects.torture, 8, 3);
  assertNotEquals(
      'Row was removed from table element', originalRow,
      goog.dom.getElementsByTagName(
          goog.dom.TagName.TR, testElements.basic)[7]);
  assertEquals(
      'Rowspan correctly adjusted', 3,
      testObjects.torture.rows[6].columns[2].rowSpan);
}

function _testRemoveColumn(index) {
  var tr =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.basic)[0];
  var sampleCell =
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, tr)[index];
  testObjects.basic.removeColumn(index);
  tableSanityCheck(testObjects.basic, 4, 2);
  tr =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.basic)[0];
  assertNotEquals(
      'Test cell removed from column', sampleCell,
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, tr)[index]);
}

function testRemoveFirstColumn() {
  _testRemoveColumn(0);
}

function testRemoveMiddleColumn() {
  _testRemoveColumn(1);
}

function testRemoveLastColumn() {
  _testRemoveColumn(2);
}

function testRemoveColumnAtStartingColSpan() {
  testObjects.torture.removeColumn(0);
  tableSanityCheck(testObjects.torture, 9, 2);
  var tr = goog.dom.getElementsByTagName(
      goog.dom.TagName.TR, testElements.torture)[5]
  assertEquals(
      'Colspan was decremented correctly', 1,
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, tr)[0].colSpan);
}

function testRemoveColumnAtEndingColSpan() {
  testObjects.torture.removeColumn(2);
  tableSanityCheck(testObjects.torture, 9, 2);
  var tr = goog.dom.getElementsByTagName(
      goog.dom.TagName.TR, testElements.torture)[1];
  assertEquals(
      'Colspan was decremented correctly', 1,
      goog.dom.getElementsByTagName(goog.dom.TagName.TD, tr)[0].colSpan);
}

function testRemoveColumnAtSpanningColSpan() {
  testObjects.torture.removeColumn(2);
  tableSanityCheck(testObjects.torture, 9, 2);
  var tr = goog.dom.getElementsByTagName(
      goog.dom.TagName.TR, testElements.torture)[4]
  assertEquals(
      'Colspan was decremented correctly', 2,
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, tr)[0].colSpan);
}

function testMergeCellsInRow() {
  testObjects.basic.mergeCells(0, 0, 0, 2);
  tableSanityCheck(testObjects.basic, 4, 3);
  var trs =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.basic);
  assertEquals(
      'Cells merged', 1,
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, trs[0]).length);
  assertEquals(
      'Merged cell has correct colspan', 3,
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, trs[0])[0].colSpan);
  assertEquals(
      'Merged cell has correct rowspan', 1,
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, trs[0])[0].rowSpan);
}

function testMergeCellsInColumn() {
  testObjects.basic.mergeCells(0, 0, 2, 0);
  tableSanityCheck(testObjects.basic, 4, 3);
  var trs =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.basic);
  assertEquals(
      'Other cells still in row', 3,
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, trs[0]).length);
  assertEquals(
      'Merged cell has correct colspan', 1,
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, trs[0])[0].colSpan);
  assertEquals(
      'Merged cell has correct rowspan', 3,
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, trs[0])[0].rowSpan);
  assert(
      'Cell appears in multiple rows after merge',
      testObjects.basic.rows[0].columns[0] ==
          testObjects.basic.rows[2].columns[0]);
}

function testMergeCellsInRowAndColumn() {
  testObjects.basic.mergeCells(1, 1, 3, 2);
  tableSanityCheck(testObjects.basic, 4, 3);
  var trs =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.basic);
  var mergedCell =
      goog.dom.getElementsByTagName(goog.dom.TagName.TD, trs[1])[1];
  assertEquals('Merged cell has correct rowspan', 3, mergedCell.rowSpan);
  assertEquals('Merged cell has correct colspan', 2, mergedCell.colSpan);
}

function testMergeCellsAlreadyMerged() {
  testObjects.torture.mergeCells(5, 0, 8, 2);
  tableSanityCheck(testObjects.torture, 9, 3);
  var trs =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.torture);
  var mergedCell =
      goog.dom.getElementsByTagName(goog.dom.TagName.TH, trs[5])[0];
  assertEquals('Merged cell has correct rowspan', 4, mergedCell.rowSpan);
  assertEquals('Merged cell has correct colspan', 3, mergedCell.colSpan);
}

function testIllegalMergeNonRectangular() {
  // This should fail because it involves trying to merge two parts
  // of a 3-colspan cell with other cells
  var mergeSucceeded = testObjects.torture.mergeCells(3, 1, 5, 2);
  if (mergeSucceeded) {
    throw 'EditableTable allowed impossible merge!';
  }
  tableSanityCheck(testObjects.torture, 9, 3);
}

function testIllegalMergeSingleCell() {
  // This should fail because it involves merging a single cell
  var mergeSucceeded = testObjects.torture.mergeCells(0, 1, 0, 1);
  if (mergeSucceeded) {
    throw 'EditableTable allowed impossible merge!';
  }
  tableSanityCheck(testObjects.torture, 9, 3);
}

function testSplitCell() {
  testObjects.torture.splitCell(1, 1);
  tableSanityCheck(testObjects.torture, 9, 3);
  var trs =
      goog.dom.getElementsByTagName(goog.dom.TagName.TR, testElements.torture);
  assertEquals(
      'Cell was split into multiple columns in row 1', 3,
      trs[1].getElementsByTagName('*').length);
  assertEquals(
      'Cell was split into multiple columns in row 2', 3,
      trs[2].getElementsByTagName('*').length);
}

function testChildTableRowsNotCountedInParentTable() {
  tableSanityCheck(testObjects.nested, 2, 3);
  for (var i = 0; i < testObjects.nested.rows.length; i++) {
    var tr = testObjects.nested.rows[i].element;
    // A tr's parent is tbody, parent of that is table - check to
    // make sure the ancestor table is as expected. This means
    // that none of the child table's rows have been erroneously
    // loaded into the EditableTable.
    assertEquals(
        'Row is child of parent table', testElements.nested,
        tr.parentNode.parentNode);
  }
}

/*
  // TODO(user): write more unit tests for selection stuff.
  // The following code is left in here for reference in implementing
  // this TODO.

    var tds = goog.dom.getElementsByTagName(
        goog.dom.TagName.TD, goog.dom.getElement('test1'));
    var range = goog.dom.Range.createFromNodes(tds[7], tds[9]);
    range.select();
    var cellSelection = new goog.editor.Table.CellSelection(range);
    assertEquals(0, cellSelection.getFirstColumnIndex());
    assertEquals(2, cellSelection.getLastColumnIndex());
    assertEquals(2, cellSelection.getFirstRowIndex());
    assertEquals(2, cellSelection.getLastRowIndex());
    assertTrue(cellSelection.isRectangle());

    range = goog.dom.Range.createFromNodes(tds[7], tds[12]);
    range.select();
    var cellSelection2 = new goog.editor.Table.CellSelection(range);
    assertFalse(cellSelection2.isRectangle());
*/
