// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.ui.ServerChartTest');
goog.setTestOnly('goog.ui.ServerChartTest');

goog.require('goog.Uri');
goog.require('goog.events');
goog.require('goog.testing.jsunit');
goog.require('goog.ui.ServerChart');

function testSchemeIndependentBarChartRequest() {
  const bar = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.BAR, 180, 104, null);
  tryToCreateBarChart(bar);
  const uri = bar.getUri();
  const schemeIndependentUri =
      new goog.Uri(goog.ui.ServerChart.CHART_SERVER_SCHEME_INDEPENDENT_URI);
  assertEquals('', uri.getScheme());
  assertEquals(schemeIndependentUri.getDomain(), uri.getDomain());
}

function testHttpBarChartRequest() {
  const bar = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.BAR, 180, 104, null,
      goog.ui.ServerChart.CHART_SERVER_HTTP_URI);
  tryToCreateBarChart(bar);
  const uri = bar.getUri();
  const httpUri = new goog.Uri(goog.ui.ServerChart.CHART_SERVER_HTTP_URI);
  assertEquals('http', uri.getScheme());
  assertEquals(httpUri.getDomain(), uri.getDomain());
}

function testHttpsBarChartRequest() {
  const bar = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.BAR, 180, 104, null,
      goog.ui.ServerChart.CHART_SERVER_HTTPS_URI);
  tryToCreateBarChart(bar);
  const uri = bar.getUri();
  const httpsUri = new goog.Uri(goog.ui.ServerChart.CHART_SERVER_HTTPS_URI);
  assertEquals('https', uri.getScheme());
  assertEquals(httpsUri.getDomain(), uri.getDomain());
}

function testMinValue() {
  const pie =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.PIE3D, 180, 104);
  pie.addDataSet([1, 2, 3], '000000');
  assertEquals(pie.getMinValue(), 0);

  const line =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.LINE, 180, 104);
  line.addDataSet([1, 2, 3], '000000');
  assertEquals(line.getMinValue(), 1);
}

function testMargins() {
  const pie =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.PIE3D, 180, 104);
  pie.setMargins(1, 2, 3, 4);
  assertEquals(
      '1,2,3,4',
      pie.getUri().getParameterValue(goog.ui.ServerChart.UriParam.MARGINS));
}

function testSetParameterValue() {
  const scatter =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.SCATTER, 180, 104);
  const key = goog.ui.ServerChart.UriParam.DATA_COLORS;
  const value = '000000,FF0000|00FF00|0000FF';
  scatter.setParameterValue(key, value);

  assertEquals(
      'unexpected parameter value', value,
      scatter.getUri().getParameterValue(key));

  scatter.removeParameter(key);

  assertUndefined(
      'parameter not removed', scatter.getUri().getParameterValue(key));
}

function testTypes() {
  let chart;

  chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.CONCENTRIC_PIE, 180, 104);

  assertTrue(chart.isPieChart());
  assertFalse(chart.isBarChart());
  assertFalse(chart.isMap());
  assertFalse(chart.isLineChart());

  chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_GROUPED_BAR, 180, 104);

  assertFalse(chart.isPieChart());
  assertTrue(chart.isBarChart());
  assertTrue(chart.isHorizontalBarChart());
  assertTrue(chart.isGroupedBarChart());
  assertFalse(chart.isVerticalBarChart());
  assertFalse(chart.isStackedBarChart());

  chart = new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.BAR, 180, 104);
  assertTrue(chart.isBarChart());
  assertTrue(chart.isStackedBarChart());
  assertFalse(chart.isGroupedBarChart());

  chart =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.XYLINE, 180, 104);
  assertTrue('I thought lxy was a line chart', chart.isLineChart());
  assertFalse('lxy is definitely not a pie chart', chart.isPieChart());
}

function testBarChartRequest() {
  const bar =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.BAR, 180, 104);
  tryToCreateBarChart(bar);
  const httpUri = new goog.Uri(goog.ui.ServerChart.CHART_SERVER_URI);
  const uri = bar.getUri();
  assertEquals(httpUri.getDomain(), uri.getDomain());
}

function tryToCreateBarChart(bar) {
  bar.addDataSet([8, 23, 7], '008000');
  bar.addDataSet([31, 11, 7], 'ffcc33');
  bar.addDataSet([2, 43, 70, 3, 43, 74], '3072f3');
  bar.setLeftLabels(['', '20K', '', '60K', '', '100K']);
  bar.setXLabels(['O', 'N', 'D']);
  bar.setMaxValue(100);
  const uri = bar.getUri();
  assertEquals('br', uri.getParameterValue(goog.ui.ServerChart.UriParam.TYPE));
  assertEquals(
      '180x104', uri.getParameterValue(goog.ui.ServerChart.UriParam.SIZE));
  assertEquals(
      'e:D6NtDQ,S7F4DQ,AAaxsZApaxvA',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));
  assertEquals(
      '008000,ffcc33,3072f3',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA_COLORS));
  assertEquals(
      '100K||60K||20K|',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.LEFT_Y_LABELS));
  assertEquals(
      'O|N|D', uri.getParameterValue(goog.ui.ServerChart.UriParam.X_LABELS));
}

function testClearDataSets() {
  let chart =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.BAR, 180, 104);
  tryToCreateBarChart(chart);
  const uriBefore = chart.getUri();
  chart.clearDataSets();
  chart = new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.BAR, 180, 104);
  tryToCreateBarChart(chart);
  const uriAfter = chart.getUri();
  assertEquals(uriBefore.getScheme(), uriAfter.getScheme());
  assertEquals(uriBefore.getDomain(), uriAfter.getDomain());
  assertEquals(uriBefore.getPath(), uriAfter.getPath());
}

function testMultipleDatasetsTextEncoding() {
  const chart =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.BAR, 180, 104);
  chart.setEncodingType(goog.ui.ServerChart.EncodingType.TEXT);
  chart.addDataSet([0, 25, 100], '008000');
  chart.addDataSet([12, 2, 7.1], '112233');
  chart.addDataSet([82, 16, 2], '3072f3');
  const uri = chart.getUri();
  assertEquals(
      't:0,25,100|12,2,7.1|82,16,2',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));
}

function testVennDiagramRequest() {
  const venn =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.VENN, 300, 200);
  venn.setTitle('Google Employees');
  const weights = [
    80,  // Size of circle A
    60,  // Size of circle B
    40,  // Size of circle C
    20,  // Overlap of A and B
    20,  // Overlap of A and C
    20,  // Overlap of B and C
    5
  ];  // Overlap of A, B and C
  const labels = [
    'C Hackers',   // Label for A
    'LISP Gurus',  // Label for B
    'Java Jockeys'
  ];  // Label for C
  venn.setVennSeries(weights, labels);
  const uri = venn.getUri();
  const httpUri = new goog.Uri(goog.ui.ServerChart.CHART_SERVER_URI);
  assertEquals(httpUri.getDomain(), uri.getDomain());
  assertEquals('v', uri.getParameterValue(goog.ui.ServerChart.UriParam.TYPE));
  assertEquals(
      '300x200', uri.getParameterValue(goog.ui.ServerChart.UriParam.SIZE));
  assertEquals(
      'e:..u7d3MzMzMzAA',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));
  assertEquals(
      'Google Employees',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.TITLE));
  assertEquals(
      labels.join('|'),
      uri.getParameterValue(goog.ui.ServerChart.UriParam.LEGEND_TEXTS));
}


function testSparklineChartRequest() {
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.SPARKLINE, 300, 200);
  chart.addDataSet([8, 23, 7], '008000');
  chart.addDataSet([31, 11, 7], 'ffcc33');
  chart.addDataSet([2, 43, 70, 3, 43, 74], '3072f3');
  chart.setLeftLabels(['', '20K', '', '60K', '', '100K']);
  chart.setXLabels(['O', 'N', 'D']);
  chart.setMaxValue(100);
  const uri = chart.getUri();
  assertEquals('ls', uri.getParameterValue(goog.ui.ServerChart.UriParam.TYPE));
  assertEquals(
      '300x200', uri.getParameterValue(goog.ui.ServerChart.UriParam.SIZE));
  assertEquals(
      'e:D6NtDQ,S7F4DQ,AAaxsZApaxvA',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));
  assertEquals(
      '008000,ffcc33,3072f3',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA_COLORS));
  assertEquals(
      '100K||60K||20K|',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.LEFT_Y_LABELS));
  assertEquals(
      'O|N|D', uri.getParameterValue(goog.ui.ServerChart.UriParam.X_LABELS));
}

function testLegendPositionRequest() {
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.SPARKLINE, 300, 200);
  chart.addDataSet([0, 100], '008000', 'foo');
  chart.setLegendPosition(goog.ui.ServerChart.LegendPosition.TOP);
  assertEquals('t', chart.getLegendPosition());
  const uri = chart.getUri();
  assertEquals(
      't', uri.getParameterValue(goog.ui.ServerChart.UriParam.LEGEND_POSITION));
}

function testSetGridParameter() {
  const gridArg = '20,20,4,4';
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.SPARKLINE, 300, 200);
  chart.addDataSet([0, 100], '008000', 'foo');
  chart.setGridParameter(gridArg);
  assertEquals(gridArg, chart.getGridParameter());
  const uri = chart.getUri();
  assertEquals(
      gridArg, uri.getParameterValue(goog.ui.ServerChart.UriParam.GRID));
}

function testSetMarkerParameter() {
  const markerArg = 's,FF0000,0,-1,5';
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.SPARKLINE, 300, 200);
  chart.addDataSet([0, 100], '008000', 'foo');
  chart.setMarkerParameter(markerArg);
  assertEquals(markerArg, chart.getMarkerParameter());
  const uri = chart.getUri();
  assertEquals(
      markerArg, uri.getParameterValue(goog.ui.ServerChart.UriParam.MARKERS));
}

function testNullDataPointRequest() {
  let chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.SPARKLINE, 300, 200);
  chart.addDataSet([40, null, 10], '008000');
  assertEquals(10, chart.getMinValue());
  assertEquals(40, chart.getMaxValue());
  let uri = chart.getUri();
  assertEquals(
      'e:..__AA', uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));

  chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.SPARKLINE, 300, 200);
  chart.addDataSet([-5, null, -1], '008000');
  assertEquals(-5, chart.getMinValue());
  assertEquals(-1, chart.getMaxValue());
  uri = chart.getUri();
  assertEquals(
      'e:AA__..', uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));
}

function testSetBarSpaceWidths() {
  const noSpaceBetweenBarsSpecified = '20';
  const noSpaceBetweenBarsChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.VERTICAL_STACKED_BAR);
  noSpaceBetweenBarsChart.setBarSpaceWidths(20);
  let uri = noSpaceBetweenBarsChart.getUri();
  assertEquals(
      noSpaceBetweenBarsSpecified,
      uri.getParameterValue(goog.ui.ServerChart.UriParam.BAR_HEIGHT));

  const spaceBetweenBarsSpecified = '20,5';
  const spaceBetweenBarsChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR);
  spaceBetweenBarsChart.setBarSpaceWidths(20, 5);
  uri = spaceBetweenBarsChart.getUri();
  assertEquals(
      spaceBetweenBarsSpecified,
      uri.getParameterValue(goog.ui.ServerChart.UriParam.BAR_HEIGHT));

  const spaceBetweenGroupsSpecified = '20,5,6';
  const spaceBetweenGroupsChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR);
  spaceBetweenGroupsChart.setBarSpaceWidths(20, 5, 6);
  uri = spaceBetweenGroupsChart.getUri();
  assertEquals(
      spaceBetweenGroupsSpecified,
      uri.getParameterValue(goog.ui.ServerChart.UriParam.BAR_HEIGHT));

  const groupsButNotBarsSpecified = '20,6';
  const groupsButNotBarsChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR);
  groupsButNotBarsChart.setBarSpaceWidths(20, undefined, 6);
  uri = groupsButNotBarsChart.getUri();
  assertEquals(
      groupsButNotBarsSpecified,
      uri.getParameterValue(goog.ui.ServerChart.UriParam.BAR_HEIGHT));
}

function testSetAutomaticBarWidth() {
  const noSpaceBetweenBarsSpecified = 'a';
  const noSpaceBetweenBarsChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.VERTICAL_STACKED_BAR);
  noSpaceBetweenBarsChart.setAutomaticBarWidth();
  let uri = noSpaceBetweenBarsChart.getUri();
  assertEquals(
      noSpaceBetweenBarsSpecified,
      uri.getParameterValue(goog.ui.ServerChart.UriParam.BAR_HEIGHT));

  const spaceBetweenBarsSpecified = 'a,5';
  const spaceBetweenBarsChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR);
  spaceBetweenBarsChart.setAutomaticBarWidth(5);
  uri = spaceBetweenBarsChart.getUri();
  assertEquals(
      spaceBetweenBarsSpecified,
      uri.getParameterValue(goog.ui.ServerChart.UriParam.BAR_HEIGHT));

  const spaceBetweenGroupsSpecified = 'a,5,6';
  const spaceBetweenGroupsChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR);
  spaceBetweenGroupsChart.setAutomaticBarWidth(5, 6);
  uri = spaceBetweenGroupsChart.getUri();
  assertEquals(
      spaceBetweenGroupsSpecified,
      uri.getParameterValue(goog.ui.ServerChart.UriParam.BAR_HEIGHT));

  const groupsButNotBarsSpecified = 'a,6';
  const groupsButNotBarsChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR);
  groupsButNotBarsChart.setAutomaticBarWidth(undefined, 6);
  uri = groupsButNotBarsChart.getUri();
  assertEquals(
      groupsButNotBarsSpecified,
      uri.getParameterValue(goog.ui.ServerChart.UriParam.BAR_HEIGHT));
}

function testSetDataScaling() {
  const dataScalingArg = '0,160';
  const dataArg = 't:0,50,100,130';
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.VERTICAL_STACKED_BAR, 300, 200);
  chart.addDataSet([0, 50, 100, 130], '008000');
  chart.setDataScaling(0, 160);
  const uri = chart.getUri();
  assertEquals(
      dataScalingArg,
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA_SCALING));
  assertEquals(
      dataArg, uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));
}

function testSetMultiAxisLabelStyle() {
  const noFontSizeChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR, 300, 200);
  noFontSizeChart.addDataSet([0, 50, 100, 130], '008000');
  let axisNumber = noFontSizeChart.addMultiAxis(
      goog.ui.ServerChart.MultiAxisType.LEFT_Y_AXIS);
  const noFontSizeArgs = axisNumber + ',009000';
  noFontSizeChart.setMultiAxisLabelStyle(axisNumber, '009000');
  const noFontSizeUri = noFontSizeChart.getUri();
  assertEquals(
      noFontSizeArgs, noFontSizeUri.getParameterValue(
                          goog.ui.ServerChart.UriParam.MULTI_AXIS_STYLE));

  const noAlignChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR, 300, 200);
  noAlignChart.addDataSet([0, 50, 100, 130], '008000');
  const xAxisNumber =
      noAlignChart.addMultiAxis(goog.ui.ServerChart.MultiAxisType.X_AXIS);
  const yAxisNumber =
      noAlignChart.addMultiAxis(goog.ui.ServerChart.MultiAxisType.LEFT_Y_AXIS);
  const noAlignArgs = xAxisNumber + ',009000,12|' + yAxisNumber + ',007000,14';
  noAlignChart.setMultiAxisLabelStyle(xAxisNumber, '009000', 12);
  noAlignChart.setMultiAxisLabelStyle(yAxisNumber, '007000', 14);
  const noAlignUri = noAlignChart.getUri();
  assertEquals(
      noAlignArgs, noAlignUri.getParameterValue(
                       goog.ui.ServerChart.UriParam.MULTI_AXIS_STYLE));

  const noLineTicksChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR, 300, 200);
  noLineTicksChart.addDataSet([0, 50, 100, 130], '008000');
  axisNumber = noLineTicksChart.addMultiAxis(
      goog.ui.ServerChart.MultiAxisType.LEFT_Y_AXIS);
  const noLineTicksArgs = axisNumber + ',009000,12,0';
  noLineTicksChart.setMultiAxisLabelStyle(
      axisNumber, '009000', 12,
      goog.ui.ServerChart.MultiAxisAlignment.ALIGN_CENTER);
  const noLineTicksUri = noLineTicksChart.getUri();
  assertEquals(
      noLineTicksArgs, noLineTicksUri.getParameterValue(
                           goog.ui.ServerChart.UriParam.MULTI_AXIS_STYLE));


  const allParamsChart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR, 300, 200);
  allParamsChart.addDataSet([0, 50, 100, 130], '008000');
  axisNumber = allParamsChart.addMultiAxis(
      goog.ui.ServerChart.MultiAxisType.LEFT_Y_AXIS);
  const allParamsArgs = axisNumber + ',009000,12,0,lt';
  allParamsChart.setMultiAxisLabelStyle(
      axisNumber, '009000', 12,
      goog.ui.ServerChart.MultiAxisAlignment.ALIGN_CENTER,
      goog.ui.ServerChart.AxisDisplayType.LINE_AND_TICKS);
  const allParamsUri = allParamsChart.getUri();
  assertEquals(
      allParamsArgs, allParamsUri.getParameterValue(
                         goog.ui.ServerChart.UriParam.MULTI_AXIS_STYLE));
}

function testSetBackgroundFill() {
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR, 300, 200);
  assertEquals(0, chart.getBackgroundFill().length);
  chart.setBackgroundFill([{color: '00ff00'}]);
  assertObjectEquals(
      {area: 'bg', effect: 's', color: '00ff00'}, chart.getBackgroundFill()[0]);
  chart.setBackgroundFill([{color: '00ff00'}, {area: 'c', color: '00ff00'}]);
  assertObjectEquals(
      {area: 'bg', effect: 's', color: '00ff00'}, chart.getBackgroundFill()[0]);
  assertObjectEquals(
      {area: 'c', effect: 's', color: '00ff00'}, chart.getBackgroundFill()[1]);

  chart.setParameterValue(
      goog.ui.ServerChart.UriParam.BACKGROUND_FILL,
      'bg,s,00ff00|c,lg,45,ff00ff|bg,s,ff00ff');
  assertEquals(0, chart.getBackgroundFill().length);
}

function testSetMultiAxisRange() {
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR, 300, 200);
  const x = chart.addMultiAxis(goog.ui.ServerChart.MultiAxisType.X_AXIS);
  const top = chart.addMultiAxis(goog.ui.ServerChart.MultiAxisType.TOP_AXIS);
  chart.setMultiAxisRange(x, -500, 500, 100);
  chart.setMultiAxisRange(top, 0, 10);
  const range = chart.getMultiAxisRange();

  assertArrayEquals(range[x], [-500, 500, 100]);
  assertArrayEquals(range[top], [0, 10]);
}

function testGetConvertedValue() {
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.VERTICAL_STACKED_BAR);

  assertThrows('No exception thrown when minValue > maxValue', function() {
    const result = chart.getConvertedValue_(
        90, 24, 3, goog.ui.ServerChart.EncodingType.SIMPLE);
  });

  assertEquals(
      '_', chart.getConvertedValue_(
               90, 100, 101, goog.ui.ServerChart.EncodingType.SIMPLE));

  assertEquals(
      '_', chart.getConvertedValue_(
               null, 0, 5, goog.ui.ServerChart.EncodingType.SIMPLE));
  assertEquals(
      '__', chart.getConvertedValue_(
                null, 0, 150, goog.ui.ServerChart.EncodingType.EXTENDED));
  assertEquals(
      '24', chart.getConvertedValue_(
                24, 1, 200, goog.ui.ServerChart.EncodingType.TEXT));
  assertEquals(
      'H', chart.getConvertedValue_(
               24, 1, 200, goog.ui.ServerChart.EncodingType.SIMPLE));
  assertEquals(
      'HZ', chart.getConvertedValue_(
                24, 1, 200, goog.ui.ServerChart.EncodingType.EXTENDED));

  // Out-of-range values should give a missing data point, not an empty string.
  assertEquals(
      '__', chart.getConvertedValue_(
                0, 1, 200, goog.ui.ServerChart.EncodingType.EXTENDED));
  assertEquals(
      '__', chart.getConvertedValue_(
                201, 1, 200, goog.ui.ServerChart.EncodingType.EXTENDED));
  assertEquals(
      '_', chart.getConvertedValue_(
               0, 1, 200, goog.ui.ServerChart.EncodingType.SIMPLE));
  assertEquals(
      '_', chart.getConvertedValue_(
               201, 1, 200, goog.ui.ServerChart.EncodingType.SIMPLE));
  assertEquals(
      '_', chart.getConvertedValue_(
               0, 1, 200, goog.ui.ServerChart.EncodingType.TEXT));
  assertEquals(
      '_', chart.getConvertedValue_(
               201, 1, 200, goog.ui.ServerChart.EncodingType.TEXT));
}

function testGetChartServerValues() {
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.HORIZONTAL_STACKED_BAR);
  const values = [0, 1, 2, 56, 90, 120];
  const minValue = 0;
  const maxValue = 140;
  const expectedSimple = 'AABYn0';
  assertEquals(
      expectedSimple, chart.getChartServerValues_(values, minValue, maxValue));
  const expectedText = '0,1,2,56,90,120';
  assertEquals(
      expectedSimple, chart.getChartServerValues_(values, minValue, maxValue));
}

function testUriLengthLimit() {
  const chart = new goog.ui.ServerChart(
      goog.ui.ServerChart.ChartType.SPARKLINE, 300, 200);
  let longUri = null;
  goog.events.listen(
      chart, goog.ui.ServerChart.Event.URI_TOO_LONG,
      function(e) { longUri = e.uri; });
  assertEquals(
      goog.ui.ServerChart.EncodingType.AUTOMATIC, chart.getEncodingType());
  chart.addDataSet(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], '008000');
  assertEquals(
      'e:AAHHOOVVccjjqqxx44..AAHHOOVVccjjqqxx44..',
      chart.getUri().getParameterValue(goog.ui.ServerChart.UriParam.DATA));
  chart.setUriLengthLimit(100);
  assertEquals(
      's:AHOUbipv29AHOUbipv29',
      chart.getUri().getParameterValue(goog.ui.ServerChart.UriParam.DATA));
  chart.setUriLengthLimit(80);
  assertEquals(null, longUri);
  chart.getUri();
  assertNotEquals(null, longUri);
}

function testVisibleDataSets() {
  let uri;

  const bar =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.BAR, 180, 104);
  bar.addDataSet([8, 23, 7], '008000');
  bar.addDataSet([31, 11, 7], 'ffcc33');
  bar.addDataSet([2, 43, 70, 3, 43, 74], '3072f3');
  bar.setMaxValue(100);

  bar.setNumVisibleDataSets(0);
  uri = bar.getUri();
  assertEquals(
      'e0:D6NtDQ,S7F4DQ,AAaxsZApaxvA',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));

  bar.setNumVisibleDataSets(1);
  uri = bar.getUri();
  assertEquals(
      'e1:D6NtDQ,S7F4DQ,AAaxsZApaxvA',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));

  bar.setNumVisibleDataSets(2);
  uri = bar.getUri();
  assertEquals(
      'e2:D6NtDQ,S7F4DQ,AAaxsZApaxvA',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));

  bar.setNumVisibleDataSets(null);
  uri = bar.getUri();
  assertEquals(
      'e:D6NtDQ,S7F4DQ,AAaxsZApaxvA',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.DATA));
}

function testTitle() {
  const chart =
      new goog.ui.ServerChart(goog.ui.ServerChart.ChartType.BAR, 180, 104);
  assertEquals('Default title size', 13.5, chart.getTitleSize());
  assertEquals('Default title color', '333333', chart.getTitleColor());
  chart.setTitle('Test title');
  chart.setTitleSize(7);
  chart.setTitleColor('ff0000');
  const uri = chart.getUri();
  assertEquals(
      'Changing chart title failed', 'Test title',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.TITLE));
  assertEquals(
      'Changing title size and color failed', 'ff0000,7',
      uri.getParameterValue(goog.ui.ServerChart.UriParam.TITLE_FORMAT));
  assertEquals('New title size', 7, chart.getTitleSize());
  assertEquals('New title color', 'ff0000', chart.getTitleColor());
}
