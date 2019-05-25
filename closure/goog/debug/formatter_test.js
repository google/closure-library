// Copyright 2014 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.debug.FormatterTest');
goog.setTestOnly();

const HtmlFormatter = goog.require('goog.debug.HtmlFormatter');
const LogRecord = goog.require('goog.debug.LogRecord');
const Logger = goog.require('goog.debug.Logger');
const SafeHtml = goog.require('goog.html.SafeHtml');
const testSuite = goog.require('goog.testing.testSuite');

const EXPECTED_RECORD_HTML_RE =
    '^prefix \\[.*?\\] \\[ &#160;.*?s\\] \\[loggerName\\] ' +
    '<span class="dbg-f">mess<br> &#160;age<br>Message:';
let logRecord;

testSuite({
  setUp() {
    logRecord =
        new LogRecord(Logger.Level.CONFIG, 'mess\n  age', 'loggerName', 1, 100);
    // Exception needs to be present for exception text to get printed
    // by HtmlFormatter.
    logRecord.setException(new Error('exc\n  eption'));
  },

  testExposeException() {
    const expected = 'Message: message&quot;<br>' +
        'Url: <a href="view-source:http://fileName&quot;" ' +
        'target="_new">http://fileName&quot;</a><br>' +
        'Line: lineNumber&quot;<br><br>' +
        'Browser stack:<br>' +
        'stack&quot;-&gt; [end]';
    const error = {
      message: 'message"',
      fileName: 'http://fileName"',
      lineNumber: 'lineNumber"',
      stack: 'stack"',
    };
    const actualHtml = HtmlFormatter.exposeExceptionAsHtml(error);
    let actual = SafeHtml.unwrap(actualHtml);
    actual = actual.substring(0, expected.length);
    assertEquals(expected, actual);
  },

  testHtmlFormatter_formatRecord() {
    const formatter = new HtmlFormatter('prefix');
    const actual = formatter.formatRecord(logRecord);
    assertRegExp(EXPECTED_RECORD_HTML_RE, actual);
  },

  testHtmlFormatter_formatRecordAsHtml() {
    const formatter = new HtmlFormatter('prefix');
    const actual = formatter.formatRecordAsHtml(logRecord);
    assertRegExp(EXPECTED_RECORD_HTML_RE, SafeHtml.unwrap(actual));
  },
});
