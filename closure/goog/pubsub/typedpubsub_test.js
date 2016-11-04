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

goog.provide('goog.pubsub.TypedPubSubTest');
goog.setTestOnly('goog.pubsub.TypedPubSubTest');

goog.require('goog.array');
goog.require('goog.pubsub.TopicId');
goog.require('goog.pubsub.TypedPubSub');
goog.require('goog.testing.jsunit');

var pubsub;

function setUp() {
  pubsub = new goog.pubsub.TypedPubSub();
}

function tearDown() {
  pubsub.dispose();
}

function testConstructor() {
  assertNotNull('PubSub instance must not be null', pubsub);
  assertTrue(
      'PubSub instance must have the expected type',
      pubsub instanceof goog.pubsub.TypedPubSub);
}

function testDispose() {
  assertFalse(
      'PubSub instance must not have been disposed of', pubsub.isDisposed());
  pubsub.dispose();
  assertTrue('PubSub instance must have been disposed of', pubsub.isDisposed());
}

function testSubscribeUnsubscribe() {
  function foo1() {}
  function bar1() {}
  function foo2() {}
  function bar2() {}

  /** const */ var FOO = new goog.pubsub.TopicId('foo');
  /** const */ var BAR = new goog.pubsub.TopicId('bar');
  /** const */ var BAZ = new goog.pubsub.TopicId('baz');

  assertEquals(
      'Topic "foo" must not have any subscribers', 0, pubsub.getCount(FOO));
  assertEquals(
      'Topic "bar" must not have any subscribers', 0, pubsub.getCount(BAR));

  pubsub.subscribe(FOO, foo1);
  assertEquals('Topic "foo" must have 1 subscriber', 1, pubsub.getCount(FOO));
  assertEquals(
      'Topic "bar" must not have any subscribers', 0, pubsub.getCount(BAR));

  pubsub.subscribe(BAR, bar1);
  assertEquals('Topic "foo" must have 1 subscriber', 1, pubsub.getCount(FOO));
  assertEquals('Topic "bar" must have 1 subscriber', 1, pubsub.getCount(BAR));

  pubsub.subscribe(FOO, foo2);
  assertEquals('Topic "foo" must have 2 subscribers', 2, pubsub.getCount(FOO));
  assertEquals('Topic "bar" must have 1 subscriber', 1, pubsub.getCount(BAR));

  pubsub.subscribe(BAR, bar2);
  assertEquals('Topic "foo" must have 2 subscribers', 2, pubsub.getCount(FOO));
  assertEquals('Topic "bar" must have 2 subscribers', 2, pubsub.getCount(BAR));

  assertTrue(pubsub.unsubscribe(FOO, foo1));
  assertEquals('Topic "foo" must have 1 subscriber', 1, pubsub.getCount(FOO));
  assertEquals('Topic "bar" must have 2 subscribers', 2, pubsub.getCount(BAR));

  assertTrue(pubsub.unsubscribe(FOO, foo2));
  assertEquals('Topic "foo" must have no subscribers', 0, pubsub.getCount(FOO));
  assertEquals('Topic "bar" must have 2 subscribers', 2, pubsub.getCount(BAR));

  assertTrue(pubsub.unsubscribe(BAR, bar1));
  assertEquals('Topic "foo" must have no subscribers', 0, pubsub.getCount(FOO));
  assertEquals('Topic "bar" must have 1 subscriber', 1, pubsub.getCount(BAR));

  assertTrue(pubsub.unsubscribe(BAR, bar2));
  assertEquals('Topic "foo" must have no subscribers', 0, pubsub.getCount(FOO));
  assertEquals('Topic "bar" must have no subscribers', 0, pubsub.getCount(BAR));

  assertFalse(
      'Unsubscribing a nonexistent topic must return false',
      pubsub.unsubscribe(BAZ, foo1));

  assertFalse(
      'Unsubscribing a nonexistent function must return false',
      pubsub.unsubscribe(FOO, function() {}));
}

function testSubscribeUnsubscribeWithContext() {
  function foo() {}
  function bar() {}

  var contextA = {};
  var contextB = {};

  /** const */ var TOPIC_X = new goog.pubsub.TopicId('X');

  assertEquals(
      'Topic "X" must not have any subscribers', 0, pubsub.getCount(TOPIC_X));

  pubsub.subscribe(TOPIC_X, foo, contextA);
  assertEquals('Topic "X" must have 1 subscriber', 1, pubsub.getCount(TOPIC_X));

  pubsub.subscribe(TOPIC_X, bar);
  assertEquals(
      'Topic "X" must have 2 subscribers', 2, pubsub.getCount(TOPIC_X));

  pubsub.subscribe(TOPIC_X, bar, contextB);
  assertEquals(
      'Topic "X" must have 3 subscribers', 3, pubsub.getCount(TOPIC_X));

  assertFalse(
      'Unknown function/context combination return false',
      pubsub.unsubscribe(TOPIC_X, foo, contextB));

  assertTrue(pubsub.unsubscribe(TOPIC_X, foo, contextA));
  assertEquals(
      'Topic "X" must have 2 subscribers', 2, pubsub.getCount(TOPIC_X));

  assertTrue(pubsub.unsubscribe(TOPIC_X, bar));
  assertEquals('Topic "X" must have 1 subscriber', 1, pubsub.getCount(TOPIC_X));

  assertTrue(pubsub.unsubscribe(TOPIC_X, bar, contextB));
  assertEquals(
      'Topic "X" must have no subscribers', 0, pubsub.getCount(TOPIC_X));
}

function testSubscribeOnce() {
  var called, context;

  /** @const */ SOME_TOPIC = new goog.pubsub.TopicId('someTopic');

  called = false;
  pubsub.subscribeOnce(SOME_TOPIC, function() { called = true; });
  assertEquals(
      'Topic must have one subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertFalse('Subscriber must not have been called yet', called);

  pubsub.publish(SOME_TOPIC);
  assertEquals(
      'Topic must have no subscribers', 0, pubsub.getCount(SOME_TOPIC));
  assertTrue('Subscriber must have been called', called);

  context = {called: false};
  pubsub.subscribeOnce(SOME_TOPIC, function() { this.called = true; }, context);
  assertEquals(
      'Topic must have one subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertFalse('Subscriber must not have been called yet', context.called);

  pubsub.publish(SOME_TOPIC);
  assertEquals(
      'Topic must have no subscribers', 0, pubsub.getCount(SOME_TOPIC));
  assertTrue('Subscriber must have been called', context.called);

  context = {called: false, value: 0};
  pubsub.subscribeOnce(SOME_TOPIC, function(value) {
    this.called = true;
    this.value = value;
  }, context);
  assertEquals(
      'Topic must have one subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertFalse('Subscriber must not have been called yet', context.called);
  assertEquals('Value must have expected value', 0, context.value);

  pubsub.publish(SOME_TOPIC, 17);
  assertEquals(
      'Topic must have no subscribers', 0, pubsub.getCount(SOME_TOPIC));
  assertTrue('Subscriber must have been called', context.called);
  assertEquals('Value must have been updated', 17, context.value);
}

function testSubscribeOnce_boundFn() {
  var context = {called: false, value: 0};

  /** @const */ SOME_TOPIC = new goog.pubsub.TopicId('someTopic');

  function subscriber(value) {
    this.called = true;
    this.value = value;
  }

  pubsub.subscribeOnce(SOME_TOPIC, goog.bind(subscriber, context));
  assertEquals(
      'Topic must have one subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertFalse('Subscriber must not have been called yet', context.called);
  assertEquals('Value must have expected value', 0, context.value);

  pubsub.publish(SOME_TOPIC, 17);
  assertEquals(
      'Topic must have no subscribers', 0, pubsub.getCount(SOME_TOPIC));
  assertTrue('Subscriber must have been called', context.called);
  assertEquals('Value must have been updated', 17, context.value);
}

function testSubscribeOnce_partialFn() {
  var called = false;
  var value = 0;

  /** @const */ SOME_TOPIC = new goog.pubsub.TopicId('someTopic');

  function subscriber(hasBeenCalled, newValue) {
    called = hasBeenCalled;
    value = newValue;
  }

  pubsub.subscribeOnce(SOME_TOPIC, goog.partial(subscriber, true));
  assertEquals(
      'Topic must have one subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertFalse('Subscriber must not have been called yet', called);
  assertEquals('Value must have expected value', 0, value);

  pubsub.publish(SOME_TOPIC, 17);
  assertEquals(
      'Topic must have no subscribers', 0, pubsub.getCount(SOME_TOPIC));
  assertTrue('Subscriber must have been called', called);
  assertEquals('Value must have been updated', 17, value);
}

function testSelfResubscribe() {
  var value = null;

  /** @const */ SOME_TOPIC = new goog.pubsub.TopicId('someTopic');

  function resubscribe(iteration, newValue) {
    pubsub.subscribeOnce(SOME_TOPIC, goog.partial(resubscribe, iteration + 1));
    value = newValue + ':' + iteration;
  }

  pubsub.subscribeOnce(SOME_TOPIC, goog.partial(resubscribe, 0));
  assertEquals('Topic must have 1 subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertNull('Value must be null', value);

  pubsub.publish(SOME_TOPIC, 'foo');
  assertEquals('Topic must have 1 subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertEquals('Value be as expected', 'foo:0', value);

  pubsub.publish(SOME_TOPIC, 'bar');
  assertEquals('Topic must have 1 subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertEquals('Value be as expected', 'bar:1', value);

  pubsub.publish(SOME_TOPIC, 'baz');
  assertEquals('Topic must have 1 subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertEquals('Value be as expected', 'baz:2', value);
}

function testUnsubscribeByKey() {
  var key1, key2, key3;

  /** const */ var TOPIC_X = new goog.pubsub.TopicId('X');
  /** const */ var TOPIC_Y = new goog.pubsub.TopicId('Y');

  key1 = pubsub.subscribe(TOPIC_X, function() {});
  key2 = pubsub.subscribe(TOPIC_Y, function() {});

  assertEquals('Topic "X" must have 1 subscriber', 1, pubsub.getCount(TOPIC_X));
  assertEquals('Topic "Y" must have 1 subscriber', 1, pubsub.getCount(TOPIC_Y));
  assertNotEquals('Subscription keys must be distinct', key1, key2);

  pubsub.unsubscribeByKey(key1);
  assertEquals(
      'Topic "X" must have no subscribers', 0, pubsub.getCount(TOPIC_X));
  assertEquals('Topic "Y" must have 1 subscriber', 1, pubsub.getCount(TOPIC_Y));

  key3 = pubsub.subscribe(TOPIC_X, function() {});
  assertEquals('Topic "X" must have 1 subscriber', 1, pubsub.getCount(TOPIC_X));
  assertEquals('Topic "Y" must have 1 subscriber', 1, pubsub.getCount(TOPIC_Y));
  assertNotEquals('Subscription keys must be distinct', key1, key3);
  assertNotEquals('Subscription keys must be distinct', key2, key3);

  pubsub.unsubscribeByKey(key1);  // Obsolete key; should be no-op.
  assertEquals('Topic "X" must have 1 subscriber', 1, pubsub.getCount(TOPIC_X));
  assertEquals('Topic "Y" must have 1 subscriber', 1, pubsub.getCount(TOPIC_Y));

  pubsub.unsubscribeByKey(key2);
  assertEquals('Topic "X" must have 1 subscriber', 1, pubsub.getCount(TOPIC_X));
  assertEquals(
      'Topic "Y" must have no subscribers', 0, pubsub.getCount(TOPIC_Y));

  pubsub.unsubscribeByKey(key3);
  assertEquals(
      'Topic "X" must have no subscribers', 0, pubsub.getCount(TOPIC_X));
  assertEquals(
      'Topic "Y" must have no subscribers', 0, pubsub.getCount(TOPIC_Y));
}

function testSubscribeUnsubscribeMultiple() {
  function foo() {}
  function bar() {}

  var context = {};

  /** const */ var TOPIC_X = new goog.pubsub.TopicId('X');
  /** const */ var TOPIC_Y = new goog.pubsub.TopicId('Y');
  /** const */ var TOPIC_Z = new goog.pubsub.TopicId('Z');

  assertEquals(
      'Pubsub channel must not have any subscribers', 0, pubsub.getCount());

  assertEquals(
      'Topic "X" must not have any subscribers', 0, pubsub.getCount(TOPIC_X));
  assertEquals(
      'Topic "Y" must not have any subscribers', 0, pubsub.getCount(TOPIC_Y));
  assertEquals(
      'Topic "Z" must not have any subscribers', 0, pubsub.getCount(TOPIC_Z));

  goog.array.forEach([TOPIC_X, TOPIC_Y, TOPIC_Z], function(topic) {
    pubsub.subscribe(topic, foo);
  });
  assertEquals('Topic "X" must have 1 subscriber', 1, pubsub.getCount(TOPIC_X));
  assertEquals('Topic "Y" must have 1 subscriber', 1, pubsub.getCount(TOPIC_Y));
  assertEquals('Topic "Z" must have 1 subscriber', 1, pubsub.getCount(TOPIC_Z));

  goog.array.forEach([TOPIC_X, TOPIC_Y, TOPIC_Z], function(topic) {
    pubsub.subscribe(topic, bar, context);
  });
  assertEquals(
      'Topic "X" must have 2 subscribers', 2, pubsub.getCount(TOPIC_X));
  assertEquals(
      'Topic "Y" must have 2 subscribers', 2, pubsub.getCount(TOPIC_Y));
  assertEquals(
      'Topic "Z" must have 2 subscribers', 2, pubsub.getCount(TOPIC_Z));

  assertEquals(
      'Pubsub channel must have a total of 6 subscribers', 6,
      pubsub.getCount());

  goog.array.forEach([TOPIC_X, TOPIC_Y, TOPIC_Z], function(topic) {
    pubsub.unsubscribe(topic, foo);
  });
  assertEquals('Topic "X" must have 1 subscriber', 1, pubsub.getCount(TOPIC_X));
  assertEquals('Topic "Y" must have 1 subscriber', 1, pubsub.getCount(TOPIC_Y));
  assertEquals('Topic "Z" must have 1 subscriber', 1, pubsub.getCount(TOPIC_Z));

  goog.array.forEach([TOPIC_X, TOPIC_Y, TOPIC_Z], function(topic) {
    pubsub.unsubscribe(topic, bar, context);
  });
  assertEquals(
      'Topic "X" must not have any subscribers', 0, pubsub.getCount(TOPIC_X));
  assertEquals(
      'Topic "Y" must not have any subscribers', 0, pubsub.getCount(TOPIC_Y));
  assertEquals(
      'Topic "Z" must not have any subscribers', 0, pubsub.getCount(TOPIC_Z));

  assertEquals(
      'Pubsub channel must not have any subscribers', 0, pubsub.getCount());
}

function testPublish() {
  var context = {};
  var fooCalled = false;
  var barCalled = false;

  /** @const */ SOME_TOPIC = new goog.pubsub.TopicId('someTopic');

  function foo(record) {
    fooCalled = true;
    assertEquals('x must have expected value', 'x', record.x);
    assertEquals('y must have expected value', 'y', record.y);
  }

  function bar(record) {
    barCalled = true;
    assertEquals('Context must have expected value', context, this);
    assertEquals('x must have expected value', 'x', record.x);
    assertEquals('y must have expected value', 'y', record.y);
  }

  pubsub.subscribe(SOME_TOPIC, foo);
  pubsub.subscribe(SOME_TOPIC, bar, context);

  assertTrue(pubsub.publish(SOME_TOPIC, {x: 'x', y: 'y'}));
  assertTrue('foo() must have been called', fooCalled);
  assertTrue('bar() must have been called', barCalled);

  fooCalled = false;
  barCalled = false;
  assertTrue(pubsub.unsubscribe(SOME_TOPIC, foo));

  assertTrue(pubsub.publish(SOME_TOPIC, {x: 'x', y: 'y'}));
  assertFalse('foo() must not have been called', fooCalled);
  assertTrue('bar() must have been called', barCalled);

  fooCalled = false;
  barCalled = false;
  pubsub.subscribe('differentTopic', foo);

  assertTrue(pubsub.publish(SOME_TOPIC, {x: 'x', y: 'y'}));
  assertFalse('foo() must not have been called', fooCalled);
  assertTrue('bar() must have been called', barCalled);
}

function testPublishEmptyTopic() {
  var fooCalled = false;
  function foo() { fooCalled = true; }

  /** @const */ SOME_TOPIC = new goog.pubsub.TopicId('someTopic');

  assertFalse(
      'Publishing to nonexistent topic must return false',
      pubsub.publish(SOME_TOPIC));

  pubsub.subscribe(SOME_TOPIC, foo);
  assertTrue(
      'Publishing to topic with subscriber must return true',
      pubsub.publish(SOME_TOPIC));
  assertTrue('Foo must have been called', fooCalled);

  pubsub.unsubscribe(SOME_TOPIC, foo);
  fooCalled = false;
  assertFalse(
      'Publishing to topic without subscribers must return false',
      pubsub.publish(SOME_TOPIC));
  assertFalse('Foo must nothave been called', fooCalled);
}

function testSubscribeWhilePublishing() {
  // It's OK for a subscriber to add a new subscriber to its own topic,
  // but the newly added subscriber shouldn't be called until the next
  // publish cycle.

  var firstCalled = false;
  var secondCalled = false;

  /** @const */ SOME_TOPIC = new goog.pubsub.TopicId('someTopic');

  pubsub.subscribe(SOME_TOPIC, function() {
    pubsub.subscribe(SOME_TOPIC, function() { secondCalled = true; });
    firstCalled = true;
  });
  assertEquals(
      'Topic must have one subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertFalse(
      'No subscriber must have been called yet', firstCalled || secondCalled);

  pubsub.publish(SOME_TOPIC);
  assertEquals(
      'Topic must have two subscribers', 2, pubsub.getCount(SOME_TOPIC));
  assertTrue('The first subscriber must have been called', firstCalled);
  assertFalse(
      'The second subscriber must not have been called yet', secondCalled);

  pubsub.publish(SOME_TOPIC);
  assertEquals(
      'Topic must have three subscribers', 3, pubsub.getCount(SOME_TOPIC));
  assertTrue('The first subscriber must have been called', firstCalled);
  assertTrue('The second subscriber must also have been called', secondCalled);
}

function testUnsubscribeWhilePublishing() {
  // It's OK for a subscriber to unsubscribe another subscriber from its
  // own topic, but the subscriber in question won't actually be removed
  // until after publishing is complete.

  var firstCalled = false;
  var secondCalled = false;
  var thirdCalled = false;

  /** const */ var TOPIC_X = new goog.pubsub.TopicId('X');

  function first() {
    assertTrue(
        'unsubscribe() must return true when removing a topic',
        pubsub.unsubscribe(TOPIC_X, second));
    assertEquals(
        'Topic "X" must still have 3 subscribers', 3, pubsub.getCount(TOPIC_X));
    firstCalled = true;
  }
  pubsub.subscribe(TOPIC_X, first);

  function second() { secondCalled = true; }
  pubsub.subscribe(TOPIC_X, second);

  function third() {
    assertTrue(
        'unsubscribe() must return true when removing a topic',
        pubsub.unsubscribe(TOPIC_X, first));
    assertEquals(
        'Topic "X" must still have 3 subscribers', 3, pubsub.getCount(TOPIC_X));
    thirdCalled = true;
  }
  pubsub.subscribe(TOPIC_X, third);

  assertEquals(
      'Topic "X" must have 3 subscribers', 3, pubsub.getCount(TOPIC_X));
  assertFalse(
      'No subscribers must have been called yet',
      firstCalled || secondCalled || thirdCalled);

  assertTrue(pubsub.publish(TOPIC_X));
  assertTrue('First function must have been called', firstCalled);
  assertFalse('Second function must have been called', secondCalled);
  assertTrue('Third function must have been called', thirdCalled);
  assertEquals(
      'Topic "X" must have 1 subscriber after publishing', 1,
      pubsub.getCount(TOPIC_X));
}

function testUnsubscribeSelfWhilePublishing() {
  // It's OK for a subscriber to unsubscribe itself, but it won't actually
  // be removed until after publishing is complete.

  var selfDestructCalled = false;

  /** @const */ SOME_TOPIC = new goog.pubsub.TopicId('someTopic');

  function selfDestruct() {
    assertTrue(
        'unsubscribe() must return true when removing a topic',
        pubsub.unsubscribe(SOME_TOPIC, arguments.callee));
    assertEquals(
        'Topic must still have 1 subscriber', 1, pubsub.getCount(SOME_TOPIC));
    selfDestructCalled = true;
  }

  pubsub.subscribe(SOME_TOPIC, selfDestruct);
  assertEquals('Topic must have 1 subscriber', 1, pubsub.getCount(SOME_TOPIC));
  assertFalse(
      'selfDestruct() must not have been called yet', selfDestructCalled);

  pubsub.publish(SOME_TOPIC);
  assertTrue('selfDestruct() must have been called', selfDestructCalled);
  assertEquals(
      'Topic must have no subscribers after publishing', 0,
      pubsub.getCount(SOME_TOPIC));
}

function testPublishReturnValue() {
  /** @const */ SOME_TOPIC = new goog.pubsub.TopicId('someTopic');
  pubsub.subscribe(SOME_TOPIC, function() {
    pubsub.unsubscribe(SOME_TOPIC, arguments.callee);
  });
  assertTrue(
      'publish() must return true even if the only subscriber ' +
          'removes itself during publishing',
      pubsub.publish(SOME_TOPIC));
}

function testNestedPublish() {
  var x1 = false;
  var x2 = false;
  var y1 = false;
  var y2 = false;

  /** @const */ TOPIC_X = new goog.pubsub.TopicId('X');
  /** @const */ TOPIC_Y = new goog.pubsub.TopicId('Y');

  pubsub.subscribe(TOPIC_X, function() {
    pubsub.publish(TOPIC_Y);
    pubsub.unsubscribe(TOPIC_X, arguments.callee);
    x1 = true;
  });

  pubsub.subscribe(TOPIC_X, function() { x2 = true; });

  pubsub.subscribe(TOPIC_Y, function() {
    pubsub.unsubscribe(TOPIC_Y, arguments.callee);
    y1 = true;
  });

  pubsub.subscribe(TOPIC_Y, function() { y2 = true; });

  pubsub.publish(TOPIC_X);

  assertTrue('x1 must be true', x1);
  assertTrue('x2 must be true', x2);
  assertTrue('y1 must be true', y1);
  assertTrue('y2 must be true', y2);
}

function testClear() {
  function fn() {}

  var topics = [
    new goog.pubsub.TopicId('W'), new goog.pubsub.TopicId('X'),
    new goog.pubsub.TopicId('Y'), new goog.pubsub.TopicId('Z')
  ];

  goog.array.forEach(topics, function(topic) { pubsub.subscribe(topic, fn); });
  assertEquals('Pubsub channel must have 4 subscribers', 4, pubsub.getCount());

  pubsub.clear(topics[0]);
  assertEquals('Pubsub channel must have 3 subscribers', 3, pubsub.getCount());

  pubsub.clear(topics[1]);
  pubsub.clear(topics[2]);
  assertEquals('Pubsub channel must have 1 subscriber', 1, pubsub.getCount());

  pubsub.clear();
  assertEquals('Pubsub channel must have no subscribers', 0, pubsub.getCount());
}

function testNestedSubscribeOnce() {
  var calls = 0;

  pubsub.subscribeOnce('X', function() { calls++; });

  pubsub.subscribe('Y', function() {
    pubsub.publish('X');
    pubsub.publish('X');
  });

  pubsub.publish('Y');

  assertEquals('X must be called once', 1, calls);
}
