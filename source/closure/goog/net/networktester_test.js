// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.net.NetworkTesterTest');
goog.setTestOnly();

const GoogUri = goog.require('goog.Uri');
const MockClock = goog.require('goog.testing.MockClock');
const NetworkTester = goog.require('goog.net.NetworkTester');
const testSuite = goog.require('goog.testing.testSuite');

let clock;

function assertUriEquals(/** !GoogUri */ expected, /** string */ actual) {
  expected = expected.clone();
  const actualUri = new GoogUri(actual);

  assertEquals(expected.getScheme(), '');
  assertEquals(expected.setScheme(actualUri.getScheme()).toString(), actual);
}

// Handler object for verifying callback
class Handler {
  constructor() {
    this.events_ = [];
  }

  callback(result) {
    this.events_.push(result);
  }

  isEmpty() {
    return this.events_.length == 0;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Handler is empty');
    }
    return this.events_.shift();
  }
}

// override image constructor for test - can't use a real image due to
// async load of images - have to simulate it
class Image {}
testSuite({
  setUp() {
    clock = new MockClock(true);
  },

  tearDown() {
    clock.dispose();
  },

  testSuccess() {
    // set up the tster
    const handler = new Handler();
    const tester = new NetworkTester(handler.callback, handler);
    assertFalse(tester.isRunning());
    tester.start();
    assertTrue(handler.isEmpty());
    assertTrue(tester.isRunning());

    // simulate the image load and verify
    const image = tester.image_;
    assertUriEquals(tester.getUri(), image.src);
    assertTrue(handler.isEmpty());
    image.onload.call(null);
    assertTrue(handler.dequeue());
    assertFalse(tester.isRunning());
  },

  testFailure() {
    // set up the tester
    const handler = new Handler();
    const tester = new NetworkTester(handler.callback, handler);
    assertFalse(tester.isRunning());
    tester.start();
    assertTrue(handler.isEmpty());
    assertTrue(tester.isRunning());

    // simulate the image failure and verify
    const image = tester.image_;
    assertUriEquals(tester.getUri(), image.src);
    assertTrue(handler.isEmpty());
    image.onerror.call(null);
    assertFalse(handler.dequeue());
    assertFalse(tester.isRunning());
  },

  testAbort() {
    // set up the tester
    const handler = new Handler();
    const tester = new NetworkTester(handler.callback, handler);
    assertFalse(tester.isRunning());
    tester.start();
    assertTrue(handler.isEmpty());
    assertTrue(tester.isRunning());

    // simulate the image abort and verify
    const image = tester.image_;
    assertUriEquals(tester.getUri(), image.src);
    assertTrue(handler.isEmpty());
    image.onabort.call(null);
    assertFalse(handler.dequeue());
    assertFalse(tester.isRunning());
  },

  testTimeout() {
    // set up the tester
    const handler = new Handler();
    const tester = new NetworkTester(handler.callback, handler);
    assertFalse(tester.isRunning());
    tester.start();
    assertTrue(handler.isEmpty());
    assertTrue(tester.isRunning());

    // simulate the image timeout and verify
    const image = tester.image_;
    assertUriEquals(tester.getUri(), image.src);
    assertTrue(handler.isEmpty());
    clock.tick(10000);
    assertFalse(handler.dequeue());
    assertFalse(tester.isRunning());
  },

  testRetries() {
    // set up the tester
    const handler = new Handler();
    const tester = new NetworkTester(handler.callback, handler);
    tester.setNumRetries(1);
    assertEquals(tester.getAttemptCount(), 0);
    assertFalse(tester.isRunning());
    tester.start();
    assertTrue(handler.isEmpty());
    assertTrue(tester.isRunning());
    assertEquals(tester.getAttemptCount(), 1);

    // try number 1 fails
    let image = tester.image_;
    assertUriEquals(tester.getUri(), image.src);
    assertTrue(handler.isEmpty());
    image.onerror.call(null);
    assertTrue(handler.isEmpty());
    assertTrue(tester.isRunning());
    assertEquals(tester.getAttemptCount(), 2);

    // try number 2 succeeds
    image = tester.image_;
    assertUriEquals(tester.getUri(), image.src);
    assertTrue(handler.isEmpty());
    image.onload.call(null);
    assertTrue(handler.dequeue());
    assertFalse(tester.isRunning());
    assertEquals(tester.getAttemptCount(), 2);
  },

  testPauseBetweenRetries() {
    // set up the tester
    const handler = new Handler();
    const tester = new NetworkTester(handler.callback, handler);
    tester.setNumRetries(1);
    tester.setPauseBetweenRetries(1000);
    assertFalse(tester.isRunning());
    tester.start();
    assertTrue(handler.isEmpty());
    assertTrue(tester.isRunning());

    // try number 1 fails
    let image = tester.image_;
    assertUriEquals(tester.getUri(), image.src);
    assertTrue(handler.isEmpty());
    image.onerror.call(null);
    assertTrue(handler.isEmpty());
    assertTrue(tester.isRunning());

    // need to pause 1000 ms for the second attempt
    assertNull(tester.image_);
    clock.tick(1000);

    // try number 2 succeeds
    image = tester.image_;
    assertUriEquals(tester.getUri(), image.src);
    assertTrue(handler.isEmpty());
    image.onload.call(null);
    assertTrue(handler.dequeue());
    assertFalse(tester.isRunning());
  },

  testNonDefaultUri() {
    const handler = new Handler();
    const newUri = new GoogUri('//www.google.com/images/cleardot2.gif');
    const tester = new NetworkTester(handler.callback, handler, newUri);
    const testerUri = tester.getUri();
    assertTrue(testerUri.toString().indexOf('cleardot2') > -1);
  },

  testOffline() {
    // set up the tester
    const handler = new Handler();
    const tester = new NetworkTester(handler.callback, handler);
    const orgGetNavigatorOffline = NetworkTester.getNavigatorOffline_;
    NetworkTester.getNavigatorOffline_ = () => true;
    try {
      assertFalse(tester.isRunning());
      tester.start();
      assertTrue(handler.isEmpty());
      assertTrue(tester.isRunning());

      // the call is done async
      clock.tick(1);

      assertFalse(handler.dequeue());
      assertFalse(tester.isRunning());
    } finally {
      // Clean up!
      NetworkTester.getNavigatorOffline_ = orgGetNavigatorOffline;
    }
  },

  testGetAttemptCount() {
    // set up the tester
    const handler = new Handler();
    const tester = new NetworkTester(handler.callback, handler);
    assertEquals(tester.getAttemptCount(), 0);
    assertTrue(tester.attempt_ === tester.getAttemptCount());
    assertFalse(tester.isRunning());
    tester.start();
    assertTrue(tester.isRunning());
    assertTrue(tester.attempt_ === tester.getAttemptCount());
  },
});
