// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

/**
 * @fileoverview Unit tests for log.
 */

/** @suppress {extraProvide} */
goog.module('goog.logTest');
goog.setTestOnly();

const Level = goog.require('goog.log.Level');
const LogManager = goog.require('goog.debug.LogManager');
const log = goog.require('goog.log');
const testSuite = goog.require('goog.testing.testSuite');

/**
 * A simple log handler that remembers the last record published.
 * @private
 */
class TestHandler_ {
  constructor() {
    this.logRecord = null;
  }

  onPublish(logRecord) {
    this.logRecord = logRecord;
  }

  reset() {
    this.logRecord = null;
  }
}

testSuite({
  testParents() {
    const logger2sibling1 = log.getLogger('goog.test');
    const logger2sibling2 = log.getLogger('goog.bar');
    const logger3sibling1 = log.getLogger('goog.bar.foo');
    const logger3siblint2 = log.getLogger('goog.bar.baaz');
    const rootLogger = LogManager.getRoot();
    const googLogger = log.getLogger('goog');
    assertEquals(rootLogger, googLogger.getParent());
    assertEquals(googLogger, logger2sibling1.getParent());
    assertEquals(googLogger, logger2sibling2.getParent());
    assertEquals(logger2sibling2, logger3sibling1.getParent());
    assertEquals(logger2sibling2, logger3siblint2.getParent());
  },

  testLogging1() {
    const root = LogManager.getRoot();
    const handler = new TestHandler_();
    const f = goog.bind(handler.onPublish, handler);
    log.addHandler(root, f);
    const logger = log.getLogger('goog.bar.baaz');
    log.log(logger, Level.WARNING, 'foo');
    assertNotNull(handler.logRecord);
    assertEquals(Level.WARNING, handler.logRecord.getLevel());
    assertEquals('foo', handler.logRecord.getMessage());
    handler.logRecord = null;

    log.removeHandler(root, f);
    log.log(logger, Level.WARNING, 'foo');
    assertNull(handler.logRecord);
  },

  testLogging2() {
    const root = LogManager.getRoot();
    const handler = new TestHandler_();
    const f = goog.bind(handler.onPublish, handler);
    log.addHandler(root, f);
    const logger = log.getLogger('goog.bar.baaz');
    log.warning(logger, 'foo');
    assertNotNull(handler.logRecord);
    assertEquals(Level.WARNING, handler.logRecord.getLevel());
    assertEquals('foo', handler.logRecord.getMessage());
    handler.logRecord = null;

    log.removeHandler(root, f);
    log.log(logger, Level.WARNING, 'foo');
    assertNull(handler.logRecord);
  },

  testFiltering() {
    const root = LogManager.getRoot();
    const handler = new TestHandler_();
    const f = goog.bind(handler.onPublish, handler);
    root.addHandler(f);
    const logger1 = log.getLogger('goog.bar.foo', Level.WARNING);
    const logger2 = log.getLogger('goog.bar.baaz', Level.INFO);
    log.warning(logger2, 'foo');
    assertNotNull(handler.logRecord);
    assertEquals(Level.WARNING, handler.logRecord.getLevel());
    assertEquals('foo', handler.logRecord.getMessage());
    handler.reset();
    log.info(logger1, 'bar');
    assertNull(handler.logRecord);
    log.warning(logger1, 'baaz');
    assertNotNull(handler.logRecord);
    handler.reset();
    log.error(logger1, 'baaz');
    assertNotNull(handler.logRecord);
  },

  testException() {
    const root = LogManager.getRoot();
    const handler = new TestHandler_();
    const f = goog.bind(handler.onPublish, handler);
    root.addHandler(f);
    const logger = log.getLogger('goog.debug.logger_test');
    const ex = Error('boo!');
    log.error(logger, 'hello', ex);
    assertNotNull(handler.logRecord);
    assertEquals(Level.SEVERE, handler.logRecord.getLevel());
    assertEquals('hello', handler.logRecord.getMessage());
    assertEquals(ex, handler.logRecord.getException());
  },

  testMessageCallbacks() {
    const root = LogManager.getRoot();
    const handler = new TestHandler_();
    const f = goog.bind(handler.onPublish, handler);
    root.addHandler(f);
    const logger = log.getLogger('goog.bar.foo');
    logger.setLevel(Level.WARNING);

    logger.log(Level.INFO, () => {
      throw 'Message callback shouldn\'t be called when below logger\'s level!';
    });
    assertNull(handler.logRecord);

    logger.log(Level.WARNING, () => 'heya');
    assertNotNull(handler.logRecord);
    assertEquals(Level.WARNING, handler.logRecord.getLevel());
    assertEquals('heya', handler.logRecord.getMessage());
  },

  testGetLogRecord() {
    const name = 'test.get.log.record';
    const level = Level.FINE;
    const msg = 'msg';

    const logger = log.getLogger(name);
    const logRecord = logger.getLogRecord(level, msg);

    assertEquals(name, logRecord.getLoggerName());
    assertEquals(level, logRecord.getLevel());
    assertEquals(msg, logRecord.getMessage());

    assertNull(logRecord.getException());
  },

  testGetLogRecordWithException() {
    const name = 'test.get.log.record';
    const level = Level.FINE;
    const msg = 'msg';
    const ex = Error('Hi');

    const logger = log.getLogger(name);
    const logRecord = logger.getLogRecord(level, msg, ex);

    assertEquals(name, logRecord.getLoggerName());
    assertEquals(level, logRecord.getLevel());
    assertEquals(msg, logRecord.getMessage());
    assertEquals(ex, logRecord.getException());
  },
});
