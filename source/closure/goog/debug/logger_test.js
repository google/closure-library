/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.debug.LoggerTest');
goog.setTestOnly();

const LogManager = goog.require('goog.debug.LogManager');
const Logger = goog.require('goog.debug.Logger');
const testSuite = goog.require('goog.testing.testSuite');

function getDebug(sb, logger, level) {
  let spacer = '';
  if (level) {
    spacer = (new Array(level + 1)).join(' ');
  }
  sb[sb.length] = spacer;
  const name = logger.getName();
  if (name) {
    sb[sb.length] = name;
  } else {
    sb[sb.length] = 'ROOT';
  }
  sb[sb.length] = '\n';
  const children = logger.getChildren();
  for (let key in children) {
    getDebug(sb, children[key], level + 1);
  }
}

class TestHandler {
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
  testLogging() {
    const root = LogManager.getRoot();
    const handler = new TestHandler();
    const f = goog.bind(handler.onPublish, handler);
    root.addHandler(f);
    const l4 = Logger.getLogger('goog.bar.baaz');
    l4.log(Logger.Level.WARNING, 'foo');
    assertNotNull(handler.logRecord);
    assertEquals(Logger.Level.WARNING, handler.logRecord.getLevel());
    assertEquals('foo', handler.logRecord.getMessage());
    handler.logRecord = null;
    root.removeHandler(f);
    l4.log(Logger.Level.WARNING, 'foo');
    assertNull(handler.logRecord);
  },

  testFiltering() {
    const root = LogManager.getRoot();
    const handler = new TestHandler();
    const f = goog.bind(handler.onPublish, handler);
    root.addHandler(f);
    const l3 = Logger.getLogger('goog.bar.foo');
    l3.setLevel(Logger.Level.WARNING);
    const l4 = Logger.getLogger('goog.bar.baaz');
    l4.setLevel(Logger.Level.INFO);
    l4.log(Logger.Level.WARNING, 'foo');
    assertNotNull(handler.logRecord);
    assertEquals(Logger.Level.WARNING, handler.logRecord.getLevel());
    assertEquals('foo', handler.logRecord.getMessage());
    handler.reset();
    l3.log(Logger.Level.INFO, 'bar');
    assertNull(handler.logRecord);
    l3.log(Logger.Level.WARNING, 'baaz');
    assertNotNull(handler.logRecord);
    handler.reset();
    l3.log(Logger.Level.SEVERE, 'baaz');
    assertNotNull(handler.logRecord);
  },

  testException() {
    const root = LogManager.getRoot();
    const handler = new TestHandler();
    const f = goog.bind(handler.onPublish, handler);
    root.addHandler(f);
    const logger = Logger.getLogger('goog.debug.logger_test');
    const ex = Error('boo!');
    logger.severe('hello', ex);
    assertNotNull(handler.logRecord);
    assertEquals(Logger.Level.SEVERE, handler.logRecord.getLevel());
    assertEquals('hello', handler.logRecord.getMessage());
    assertEquals(ex, handler.logRecord.getException());
    assertEquals('boo!', handler.logRecord.getException().message);
  },

  testMessageCallbacks() {
    const root = LogManager.getRoot();
    const handler = new TestHandler();
    const f = goog.bind(handler.onPublish, handler);
    root.addHandler(f);
    const l3 = Logger.getLogger('goog.bar.foo');
    l3.setLevel(Logger.Level.WARNING);

    l3.log(Logger.Level.INFO, () => {
      throw 'Message callback shouldn\'t be called when below logger\'s level!';
    });
    assertNull(handler.logRecord);

    l3.log(Logger.Level.WARNING, () => 'heya');
    assertNotNull(handler.logRecord);
    assertEquals(Logger.Level.WARNING, handler.logRecord.getLevel());
    assertEquals('heya', handler.logRecord.getMessage());
  },

  testGetLogRecord() {
    const name = 'test.get.log.record';
    const level = 1;
    const msg = 'msg';

    const logger = Logger.getLogger(name);
    /** @suppress {checkTypes} suppression added to enable type checking */
    const logRecord = logger.getLogRecord(level, msg);

    assertEquals(name, logRecord.getLoggerName());
    assertEquals(level, logRecord.getLevel());
    assertEquals(msg, logRecord.getMessage());

    assertNull(logRecord.getException());
  },

  testGetLogRecordWithException() {
    const name = 'test.get.log.record';
    const level = 1;
    const msg = 'msg';
    const ex = Error('Hi');

    const logger = Logger.getLogger(name);
    /** @suppress {checkTypes} suppression added to enable type checking */
    const logRecord = logger.getLogRecord(level, msg, ex);

    assertEquals(name, logRecord.getLoggerName());
    assertEquals(level, logRecord.getLevel());
    assertEquals(msg, logRecord.getMessage());
    assertEquals(ex, logRecord.getException());
  },
});
