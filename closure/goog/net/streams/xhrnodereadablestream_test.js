// Copyright 2015 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.net.streams.XhrNodeReadableStreamTest');
goog.setTestOnly();

const NodeReadableStream = goog.require('goog.net.streams.NodeReadableStream');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const XhrNodeReadableStream = goog.require('goog.net.streams.XhrNodeReadableStream');
const XhrStreamReader = goog.require('goog.net.streams.XhrStreamReader');
const asserts = goog.require('goog.testing.asserts');
const testSuite = goog.require('goog.testing.testSuite');

let xhrReader;
let xhrStream;

const EventType = NodeReadableStream.EventType;
const Status = XhrStreamReader.Status;

let propertyReplacer;

/**
 * Constructs a duck-type XhrStreamReader to simulate xhr events.
 * @final
 */
class MockXhrStreamReader {
  constructor() {
    // mocked API

    this.setStatusHandler = function(handler) {
      this.statusHandler_ = handler;
    };

    this.setDataHandler = function(handler) {
      this.dataHandler_ = handler;
    };

    this.getStatus = function() {
      return this.status_;
    };

    // simulated events

    this.onData = function(messages) {
      this.dataHandler_(messages);
    };

    this.onStatus = function(status) {
      this.status_ = status;
      this.statusHandler_();
    };
  }
}

testSuite({
  setUp() {
    xhrReader = new MockXhrStreamReader();
    xhrStream = new XhrNodeReadableStream(xhrReader);

    propertyReplacer = new PropertyReplacer();
    propertyReplacer.replace(xhrStream, 'handleError_', (message) => {
      // the real XhrNodeReadableStream class ignores any error thrown
      // from inside a callback function, but we want to see those assert
      // errors thrown by the test callback function installed by unit tests
      fail(message);
    });
  },

  tearDown() {
    propertyReplacer.reset();
  },

  testOneDataCallback() {
    let delivered = false;

    const callback = (message) => {
      delivered = true;
      assertEquals('a', message.a);
    };

    xhrStream.on(EventType.DATA, callback);

    xhrReader.onData([{a: 'a'}]);
    assertTrue(delivered);
  },

  testMultipleDataCallbacks() {
    let delivered = 0;

    const callback = (message) => {
      delivered++;
      assertEquals('a', message.a);
    };

    xhrStream.on(EventType.DATA, callback);
    xhrStream.on(EventType.DATA, callback);

    xhrReader.onData([{a: 'a'}]);
    assertEquals(2, delivered);
  },

  testOrderedDataCallbacks() {
    let delivered = 0;

    const callback1 = (message) => {
      assertEquals(0, delivered++);
      assertEquals('a', message.a);
    };

    const callback2 = (message) => {
      assertEquals(1, delivered++);
      assertEquals('a', message.a);
    };

    xhrStream.on(EventType.DATA, callback1);
    xhrStream.on(EventType.DATA, callback2);

    xhrReader.onData([{a: 'a'}]);
    assertEquals(2, delivered);
  },

  testMultipleMessagesCallbacks() {
    let delivered = 0;

    const callback1 = (message) => {
      if (message.a) {
        assertEquals(0, delivered++);
        assertEquals('a', message.a);
      } else if (message.b) {
        assertEquals(2, delivered++);
        assertEquals('b', message.b);
      } else {
        fail('unexpected message');
      }
    };

    const callback2 = (message) => {
      if (message.a) {
        assertEquals(1, delivered++);
        assertEquals('a', message.a);
      } else if (message.b) {
        assertEquals(3, delivered++);
        assertEquals('b', message.b);
      } else {
        fail('unexpected message');
      }
    };

    xhrStream.on(EventType.DATA, callback1);
    xhrStream.on(EventType.DATA, callback2);

    xhrReader.onData([{a: 'a'}, {b: 'b'}]);
    assertEquals(4, delivered);
  },

  testMultipleMessagesWithOnceCallbacks() {
    let delivered = 0;

    const callback1 = (message) => {
      if (message.a) {
        assertEquals(0, delivered++);
        assertEquals('a', message.a);
      } else if (message.b) {
        assertEquals(1, delivered++);
        assertEquals('b', message.b);
      } else if (message.c) {
        assertEquals(4, delivered++);
        assertEquals('c', message.c);
      } else {
        fail('unexpected message');
      }
    };

    const callback2 = (message) => {
      if (message.a) {
        assertEquals(2, delivered++);
        assertEquals('a', message.a);
      } else if (message.b) {
        assertEquals(3, delivered++);
        assertEquals('b', message.b);
      } else {
        fail('unexpected message');
      }
    };

    xhrStream.on(EventType.DATA, callback1);
    xhrStream.once(EventType.DATA, callback2);

    xhrReader.onData([{a: 'a'}, {b: 'b'}]);
    assertEquals(4, delivered);

    xhrReader.onData([{c: 'c'}]);
    assertEquals(5, delivered);
  },

  testMultipleMessagesWithRemovedCallbacks() {
    let delivered = 0;

    const callback1 = (message) => {
      if (message.a) {
        assertEquals(0, delivered++);
        assertEquals('a', message.a);
      } else if (message.c) {
        assertEquals(3, delivered++);
        assertEquals('c', message.c);
      } else {
        fail('unexpected message');
      }
    };

    const callback2 = (message) => {
      if (message.a) {
        assertEquals(1, delivered++);
        assertEquals('a', message.a);
      } else if (message.b) {
        assertEquals(2, delivered++);
        assertEquals('b', message.b);
      } else {
        fail('unexpected message');
      }
    };

    xhrStream.on(EventType.DATA, callback1);
    xhrStream.once(EventType.DATA, callback2);

    xhrReader.onData([{a: 'a'}]);
    assertEquals(2, delivered);

    xhrStream.removeListener(EventType.DATA, callback1);
    xhrStream.once(EventType.DATA, callback2);

    xhrReader.onData([{b: 'b'}]);
    assertEquals(3, delivered);

    xhrStream.on(EventType.DATA, callback1);
    xhrStream.once(EventType.DATA, callback2);
    xhrStream.removeListener(EventType.DATA, callback2);

    xhrReader.onData([{c: 'c'}]);
    assertEquals(4, delivered);

    xhrStream.removeListener(EventType.DATA, callback1);
    xhrReader.onData([{d: 'd'}]);
    assertEquals(4, delivered);
  },

  testOrderedStatusCallbacks() {
    checkStatusMapping(Status.ACTIVE, EventType.READABLE);

    checkStatusMapping(Status.BAD_DATA, EventType.ERROR);
    checkStatusMapping(Status.HANDLER_EXCEPTION, EventType.ERROR);
    checkStatusMapping(Status.NO_DATA, EventType.ERROR);
    checkStatusMapping(Status.TIMEOUT, EventType.ERROR);
    checkStatusMapping(Status.XHR_ERROR, EventType.ERROR);

    checkStatusMapping(Status.CANCELLED, EventType.CLOSE);

    checkStatusMapping(Status.SUCCESS, EventType.END);

    function checkStatusMapping(status, event) {
      let delivered = 0;

      const callback1 = () => {
        if (delivered == 0) {
          delivered++;
        } else if (delivered == 2) {
          delivered++;
        } else {
          fail('unexpected status change');
        }
        assertEquals(status, xhrReader.getStatus());
      };

      const callback2 = () => {
        assertEquals(1, delivered++);
        assertEquals(status, xhrReader.getStatus());
      };

      xhrStream.on(event, callback1);
      xhrStream.once(event, callback2);

      xhrReader.onStatus(status);
      assertEquals(2, delivered);

      xhrReader.onStatus(status);
      assertEquals(3, delivered);

      xhrStream.removeListener(event, callback1);

      xhrReader.onStatus(status);
      assertEquals(3, delivered);
    }
  },

  testOrderedStatusMultipleCallbacks() {
    checkStatusMapping(Status.ACTIVE, EventType.READABLE);

    function checkStatusMapping(status, event) {
      let delivered = 0;

      const callback1 = () => {
        if (delivered == 0) {
          delivered++;
        } else if (delivered == 2) {
          delivered++;
        } else if (delivered == 4) {
          delivered++;
        } else {
          fail('unexpected status change');
        }
        assertEquals(status, xhrReader.getStatus());
      };

      const callback2 = () => {
        if (delivered == 1) {
          delivered++;
        } else if (delivered == 3) {
          delivered++;
        } else if (delivered == 5) {
          delivered++;
        } else if (delivered == 6) {
          delivered++;
        } else {
          fail('unexpected status change');
        }
        assertEquals(status, xhrReader.getStatus());
      };

      xhrStream.on(event, callback1);
      xhrStream.on(event, callback2);

      xhrStream.once(event, callback1);
      xhrStream.once(event, callback2);

      xhrReader.onStatus(status);
      assertEquals(4, delivered);

      xhrReader.onStatus(status);
      assertEquals(6, delivered);

      xhrStream.removeListener(event, callback1);

      xhrReader.onStatus(status);
      assertEquals(7, delivered);
    }
  },
});
