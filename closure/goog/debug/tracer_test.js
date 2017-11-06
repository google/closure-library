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

goog.provide('goog.debug.TraceTest');
goog.setTestOnly('goog.debug.TraceTest');

goog.require('goog.array');
goog.require('goog.debug.Trace');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');

function testTracer() {
  goog.debug.Trace.initCurrentTrace();
  var t = goog.debug.Trace.startTracer('foo');
  var sum = 0;
  for (var i = 0; i < 100000; i++) {
    sum += i;
  }
  goog.debug.Trace.stopTracer(t);
  var trace = goog.debug.Trace.getFormattedTrace();
  var lines = trace.split('\n');
  assertEquals(8, lines.length);
  assertNotNull(lines[0].match(/^\s*\d+\.\d+\s+Start\s+foo$/));
  assertNotNull(lines[1].match(/^\s*\d+\s+\d+\.\d+\s+Done\s+\d+ ms\s+foo$/));
}

function testPerf() {
  goog.debug.Trace.initCurrentTrace();
  var count = 1000;
  var start = goog.now();
  for (var i = 0; i < count; i++) {
    var t = goog.debug.Trace.startTracer('foo');
    var t2 = goog.debug.Trace.startTracer('foo.bar');
    var t3 = goog.debug.Trace.startTracer('foo.bar.baz');
    goog.debug.Trace.stopTracer(t3);
    var t4 = goog.debug.Trace.startTracer('foo.bar.bim');
    goog.debug.Trace.stopTracer(t4);
    goog.debug.Trace.stopTracer(t2);
    goog.debug.Trace.stopTracer(t);
  }
  count *= 4;
  var end = goog.now();
}

/** @type {!Function} */
const recorder = goog.testing.recordFunction();

/**
 * Checks if the actual log of a fake listener matches the expectations.
 * @param {!Array<!Array<*>>} expected The expected log from the fake listener.
 * @param {!Function} recorder The output of {@code goog.testing.recordFunction}
 *     for logging all calls to the fake listener.
 * @return {boolean} True if the recorder's log is expected.
 */
function validateRecordedListener(expected, recorder) {
  assertObjectEquals(
      expected, goog.array.map(recorder.getCalls(), function(call) {
        return call.getArguments();
      }));
}

function setUp() {
  goog.debug.Trace.initCurrentTrace();
  goog.debug.Trace.removeAllListeners();
  recorder.reset();
}

function testListenerStopTracerSilence() {
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(recorder, 'start'),
    stop: goog.partial(recorder, 'stop'),
    comment: goog.partial(recorder, 'comment'),
  });
  const t = goog.debug.Trace.startTracer('first');
  // 1000ms should be enough for silencing the tracer.
  goog.debug.Trace.stopTracer(t, 1000);
  validateRecordedListener([['start', t, 'first'], ['stop', t]], recorder);
}

function testListenerStartTracerType() {
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(recorder, 'start'),
    stop: goog.partial(recorder, 'stop'),
    comment: goog.partial(recorder, 'comment'),
  });
  const t = goog.debug.Trace.startTracer('first', 'New Type');
  goog.debug.Trace.stopTracer(t);
  validateRecordedListener(
      [['start', t, '[New Type] first'], ['stop', t]], recorder);
}

function testListenerCommentTracerType() {
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(recorder, 'start'),
    stop: goog.partial(recorder, 'stop'),
    comment: goog.partial(recorder, 'comment'),
  });
  goog.debug.Trace.addComment('foo', 'bar');
  validateRecordedListener([['comment', '[bar] foo']], recorder);
}

function testListenerCommentTracerTime() {
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(recorder, 'start'),
    stop: goog.partial(recorder, 'stop'),
    comment: goog.partial(recorder, 'comment'),
  });
  const timestamp = goog.now() - 10;
  goog.debug.Trace.addComment('first', null, timestamp);
  validateRecordedListener([['comment', 'first', timestamp]], recorder);
}

function testListenerCommentTracerAlone() {
  goog.debug.Trace.addTraceCallbacks({
    comment: goog.partial(recorder, 'comment'),
  });
  goog.debug.Trace.addComment('foo');
  validateRecordedListener([['comment', 'foo']], recorder);
}

function testListenerCommentTracerNoLog() {
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(recorder, 'start'),
    stop: goog.partial(recorder, 'stop'),
  });
  goog.debug.Trace.addComment('foo');
  validateRecordedListener([], recorder);
}

function testListenerStartStopTracerOnly() {
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(recorder, 'start'),
    stop: goog.partial(recorder, 'stop'),
  });
  const t = goog.debug.Trace.startTracer('bar');
  goog.debug.Trace.stopTracer(t);
  validateRecordedListener([['start', t, 'bar'], ['stop', t]], recorder);
}

function testTwoListeners() {
  const r1 = goog.testing.recordFunction();
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(r1, 'start'),
    stop: goog.partial(r1, 'stop'),
  });
  const t0 = goog.debug.Trace.startTracer('first');
  goog.debug.Trace.stopTracer(t0);
  const expected1 = [['start', t0, 'first'], ['stop', t0]];
  validateRecordedListener(expected1, r1);

  const r2 = goog.testing.recordFunction();
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(r2, 'start'),
    stop: goog.partial(r2, 'stop'),
    comment: goog.partial(r2, 'comment'),
  });
  const t1 = goog.debug.Trace.startTracer('second', 'XType');
  const t2 = goog.debug.Trace.startTracer('third');
  goog.debug.Trace.addComment('NoTime');
  const currentTime = goog.now();
  goog.debug.Trace.addComment('WithTime', null, currentTime);
  goog.debug.Trace.addComment('NoTime', 'YType');
  goog.debug.Trace.stopTracer(t2);
  goog.debug.Trace.stopTracer(t1);

  const expected2 = [
    ['start', t1, '[XType] second'],
    ['start', t2, 'third'],
    ['comment', 'NoTime'],
    ['comment', 'WithTime', currentTime],
    ['comment', '[YType] NoTime'],
    ['stop', t2],
    ['stop', t1],
  ];
  validateRecordedListener(expected2, r2);

  const expectedNoComment = [
    ['start', t0, 'first'],
    ['stop', t0],
    ['start', t1, '[XType] second'],
    ['start', t2, 'third'],
    ['stop', t2],
    ['stop', t1],
  ];
  validateRecordedListener(expectedNoComment, r1);
}
