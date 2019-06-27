// Copyright 2019 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.streams.liteImplTest');
goog.setTestOnly();

const full = goog.require('goog.streams.full');
const testSuite = goog.require('goog.testing.testSuite');
const {ReadableStream, ReadableStreamDefaultController, newReadableStream} = goog.require('goog.streams.lite');

/** @type {!ReadableStream<string>} */
let stream;
/** @type {!ReadableStreamDefaultController<string>} */
let controller;

const tests = {
  async testEnqueue_ThenRead() {
    const chunk = 'foo';
    controller.enqueue(chunk);
    const reader = stream.getReader();
    const readResult = await reader.read();
    assertFalse(readResult.done);
    assertEquals(chunk, readResult.value);
  },

  testEnqueue_Closed() {
    controller.close();
    assertThrows(() => {
      controller.enqueue('foo');
    });
  },

  testEnqueue_Closing() {
    controller.enqueue('foo');
    controller.close();
    assertThrows(() => {
      controller.enqueue('bar');
    });
  },

  testEnqueue_Errored() {
    controller.error(new Error('error'));
    assertThrows(() => {
      controller.enqueue('foo');
    });
  },

  async testRead_ThenEnqueue() {
    const chunk = 'foo';
    const reader = stream.getReader();
    const read = reader.read();
    controller.enqueue(chunk);
    const readResult = await read;
    assertFalse(readResult.done);
    assertEquals(chunk, readResult.value);
  },

  async testRead_Closed() {
    controller.close();
    const reader = stream.getReader();
    const readResult = await reader.read();
    assertTrue(readResult.done);
    assertUndefined(readResult.value);
  },

  async testRead_Closing() {
    const chunk = 'foo';
    controller.enqueue(chunk);
    controller.close();
    const reader = stream.getReader();
    let readResult = await reader.read();
    assertFalse(readResult.done);
    assertEquals(chunk, readResult.value);
    readResult = await reader.read();
    assertTrue(readResult.done);
    assertUndefined(readResult.value);
  },

  async testRead_Errored() {
    const error = new Error('error');
    controller.error(error);
    const reader = stream.getReader();
    const rejectedError = await assertRejects(reader.read());
    assertEquals(error, rejectedError);
  },

  async testRead_ThenClosed() {
    const reader = stream.getReader();
    const read = reader.read();
    controller.close();
    const readResult = await read;
    assertTrue(readResult.done);
    assertUndefined(readResult.value);
  },

  async testRead_ThenErrored() {
    const error = new Error('error');
    const reader = stream.getReader();
    const read = reader.read();
    controller.error(error);
    const rejectedError = await assertRejects(read);
    assertEquals(error, rejectedError);
  },

  testClose_Closed() {
    controller.close();
    assertThrows(() => {
      controller.close();
    });
  },

  testClose_Closing() {
    controller.enqueue('foo');
    controller.close();
    assertThrows(() => {
      controller.close();
    });
  },

  async testLocked() {
    assertFalse(stream.locked);
    const reader = stream.getReader();
    assertTrue(stream.locked);
    reader.releaseLock();
    assertFalse(stream.locked);
  },

  testLocked_Closed() {
    const reader = stream.getReader();
    assertTrue(stream.locked);
    controller.close();
    assertTrue(stream.locked);
    reader.releaseLock();
    assertFalse(stream.locked);
  },

  testLocked_Closing() {
    const reader = stream.getReader();
    controller.enqueue('foo');
    assertTrue(stream.locked);
    controller.close();
    assertTrue(stream.locked);
    reader.releaseLock();
    assertFalse(stream.locked);
  },

  testLocked_Errored() {
    const reader = stream.getReader();
    assertTrue(stream.locked);
    stream.error(new Error('error'));
    assertTrue(stream.locked);
    reader.releaseLock();
    assertFalse(stream.locked);
  },

  async testClosed_Close() {
    stream.close();
    const reader = stream.getReader();
    const closed = reader.closed;
    const closedResult = await closed;
    assertUndefined(closedResult);
  },

  async testClosed_ThenClosed() {
    const reader = stream.getReader();
    const closed = reader.closed;
    stream.close();
    const closedResult = await closed;
    assertUndefined(closedResult);
  },

  async testClosed_Closing() {
    controller.enqueue('foo');
    controller.close();
    const reader = stream.getReader();
    const closed = reader.closed;
    await reader.read();
    const closedResult = await closed;
    assertUndefined(closedResult);
  },

  async testClosed_ThenClosing() {
    const reader = stream.getReader();
    const closed = reader.closed;
    controller.enqueue('foo');
    controller.close();
    await reader.read();
    const closedResult = await closed;
    assertUndefined(closedResult);
  },

  async testClosed_Errored() {
    const error = new Error('error');
    controller.error(error);
    const reader = stream.getReader();
    const rejectedError = await assertRejects(reader.closed);
    assertEquals(error, rejectedError);
  },

  async testClosed_ThenErrored() {
    const reader = stream.getReader();
    const closed = reader.closed;
    controller.error(new Error('error'));
    await assertRejects(closed);
  },

  async testClosed_ThenReleaseLock() {
    const reader = stream.getReader();
    const closed = reader.closed;
    reader.releaseLock();
    await assertRejects(closed);
  },

  testGetReader_WhileLocked() {
    stream.getReader();
    assertThrows(() => {
      stream.getReader();
    });
  },

  testReleaseLock_WhileOutstandingReads() {
    const reader = stream.getReader();
    reader.read();
    assertThrows(() => {
      reader.releaseLock();
    });
  },

  testReleaseLock_Released() {
    const reader = stream.getReader();
    reader.releaseLock();
    reader.releaseLock();
  },

  async testStart_RejectedPromise() {
    const error = new Error('error');
    const stream = newReadableStream({
      start() {
        return Promise.reject(error);
      }
    });
    const reader = stream.getReader();
    const rejectedError = await assertRejects(reader.read());
    assertEquals(error, rejectedError);
  },
};

testSuite(Object.assign({}, tests, {
  setUp() {
    stream = newReadableStream({
      /** @param  {!ReadableStreamDefaultController<string>} ctlr */
      start(ctlr) {
        controller = ctlr;
      },
    });
  },

  testNewReadableStream_InvalidAttributes() {
    assertThrows(() => {
      newReadableStream({});
    });
    assertThrows(() => {
      newReadableStream({
        start() {},
        pull() {},
      });
    });
    assertThrows(() => {
      newReadableStream({
        start() {},
        cancel() {},
      });
    });
    assertThrows(() => {
      newReadableStream({
        start() {},
        type: 'bytes',
      });
    });
    assertThrows(() => {
      newReadableStream({
        start() {},
        autoAllocateChunkSize: 1,
      });
    });
  },

  testfull: Object.assign({}, tests, {
    setUp() {
      stream = full.newReadableStream({
        /** @param  {!ReadableStreamDefaultController<string>} ctlr */
        start(ctlr) {
          controller = ctlr;
        },
      });
    },
  }),
}));
