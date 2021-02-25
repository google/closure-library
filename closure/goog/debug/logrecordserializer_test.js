/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.debug.logRecordSerializerTest');
goog.setTestOnly();

const logRecordSerializer = goog.require('goog.debug.logRecordSerializer');
const testSuite = goog.require('goog.testing.testSuite');
const {Level, LogRecord} = goog.require('goog.log');

const NOW = 1311484654000;
const SEQ = 1231;

testSuite({
  testBasic() {
    const rec = new LogRecord(
        Level.FINE, 'An awesome message', 'logger.name', NOW, SEQ);
    const thawed =
        logRecordSerializer.parse(logRecordSerializer.serialize(rec));

    assertEquals(Level.FINE, thawed.getLevel());
    assertEquals('An awesome message', thawed.getMessage());
    assertEquals('logger.name', thawed.getLoggerName());
    assertEquals(NOW, thawed.getMillis());
    assertEquals(SEQ, thawed.getSequenceNumber());
    assertNull(thawed.getException());
  },

  /**
     @suppress {strictMissingProperties} suppression added to enable type
     checking
   */
  testWithException() {
    const err = new Error('it broke!');
    const rec = new LogRecord(
        Level.FINE, 'An awesome message', 'logger.name', NOW, SEQ);
    rec.setException(err);
    const thawed =
        logRecordSerializer.parse(logRecordSerializer.serialize(rec));
    assertEquals(err.message, thawed.getException().message);
  },

  testCustomLogLevel() {
    const rec = new LogRecord(
        new Level('CUSTOM', -1), 'An awesome message', 'logger.name', NOW, SEQ);
    const thawed =
        logRecordSerializer.parse(logRecordSerializer.serialize(rec));

    assertEquals('CUSTOM', thawed.getLevel().name);
    assertEquals(-1, thawed.getLevel().value);
  },

  testWeirdLogLevel() {
    const rec = new LogRecord(
        new Level('FINE', -1), 'An awesome message', 'logger.name', NOW, SEQ);
    const thawed =
        logRecordSerializer.parse(logRecordSerializer.serialize(rec));

    assertEquals('FINE', thawed.getLevel().name);
    // Makes sure that the log leve is still -1 even though the name
    // FINE is predefind.
    assertEquals(-1, thawed.getLevel().value);
  },
});
