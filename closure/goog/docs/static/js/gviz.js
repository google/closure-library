// Copyright 2009 Google Inc. All Rights Reserved.

/**
 * GViz hooks for grokdoc.
 *
 * Example Usage:
 *
 * <table class='gviz-org-chart' style='display:none;'>
 *  <tr><td>Pa</td><td>Grandpa</td></tr>
 *  <tr><td>Me</td><td>Pa</td></tr>
 * </table>
 *
 * On load, the table will be replaced with an org chart.
 *
 * @author nicksantos@google.com (Nick Santos);
 */

goog.require('goog.dom');

goog.provide('grokdoc.gviz');

/**
 * A set of decorators for gviz charts. Keyed by the css class of the chart.
 */
grokdoc.gviz.decorators = {};

/**
 * Decorate a table element with an org chart.
 * @param {Element} table A table element.
 */
grokdoc.gviz.decorators['gviz-org-chart'] = function(table) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('string', 'Parent');

  for (var i = 0, row = table.rows[0]; row = table.rows[i]; i++) {
    if (row.cells.length >= 2) {
      // Gviz requires an array of arrays.
      data.addRows([[row.cells[0].innerHTML, row.cells[1].innerHTML]]);
    }
  }

  var chartRoot = goog.dom.$dom('div', 'goog-inline-block');
  table.parentNode.replaceChild(chartRoot, table);

  var chart = new google.visualization.OrgChart(chartRoot);
  chart.draw(data, {'allowHtml': true, 'allowCollapse': true});
};

/**
 * Decorate all the gviz charts on the page.
 */
grokdoc.gviz.init = function() {
  var tables = goog.dom.$$('table');
  var results = [];
  var table, i = 0;
  while ((table = tables[i++])) {
    var fn = grokdoc.gviz.decorators[table.className];
    if (fn) {
      fn(table);
    }
  }
};

goog.exportSymbol('grokdoc.gviz.init', grokdoc.gviz.init);
document.write(
    '<script type="text/javascript" ' +
        'src="http://www.google.com/jsapi"></script>' +
    '<script type="text/javascript">' +
        ' google.load("visualization", "1", {packages:[\"orgchart\"]});' +
        ' google.setOnLoadCallback(grokdoc.gviz.init); ' +
    '</script>');
