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
goog.forwardDeclare('goog.debug.StopTraceDetail');


/** @type {!Function} */
const recorder = goog.testing.recordFunction();
/** @const {!goog.debug.StopTraceDetail} */
const TRACE_CANCELLED = {
  wasCancelled: true
};
/** @const {!goog.debug.StopTraceDetail} */
const NORMAL_STOP = {};

function setUp() {
  goog.debug.Trace.initCurrentTrace();
  goog.debug.Trace.removeAllListeners();
  recorder.reset();
}

function testProperEventReleaseViaResetForComment() {
  goog.debug.Trace.startTracer('foo');
  // The Start event and its id are released due to calling the reset method.
  goog.debug.Trace.clearCurrentTrace();

  // Recycling the last Start event.
  goog.debug.Trace.addComment('abc');
  goog.debug.Trace.startTracer('foo');
  goog.debug.Trace.clearCurrentTrace();

  const t1 = goog.debug.Trace.startTracer('f1');
  const t2 = goog.debug.Trace.startTracer('f2');
  assertNotEquals('The trace ids cannot repeat.', t1, t2);
}

function testProperEventReleaseViaThresholdForComment() {
  const t3 = goog.debug.Trace.startTracer('foo');
  // The Start event and its id are released due to 1000ms threshold.
  goog.debug.Trace.stopTracer(t3, 1000);

  // Recycling the last Start event.
  goog.debug.Trace.addComment('abc');
  goog.debug.Trace.startTracer('foo');
  goog.debug.Trace.clearCurrentTrace();

  const t1 = goog.debug.Trace.startTracer('f1');
  const t2 = goog.debug.Trace.startTracer('f2');
  assertNotEquals('The trace ids cannot repeat.', t1, t2);
}

function testProperEventReleaseViaResetForStop() {
  goog.debug.Trace.startTracer('foo');
  goog.debug.Trace.startTracer('foo');
  // The Start events and their ids are released because of reseting.
  goog.debug.Trace.clearCurrentTrace();

  // Recycling the last two Start events.
  const t0 = goog.debug.Trace.startTracer('foo');
  goog.debug.Trace.stopTracer(t0);
  goog.debug.Trace.clearCurrentTrace();

  const t1 = goog.debug.Trace.startTracer('fa');
  goog.debug.Trace.startTracer('fb');
  const t2 = goog.debug.Trace.startTracer('fc');
  // No id is repeated.
  assertNotEquals('The trace ids cannot repeat.', t1, t2);
}

function testProperEventReleaseViaThresholdForStop() {
  let t1 = goog.debug.Trace.startTracer('f1');
  let t2 = goog.debug.Trace.startTracer('f2');
  // The Start events and their ids are released due to 1000ms threshold.
  goog.debug.Trace.stopTracer(t2, 1000);
  goog.debug.Trace.stopTracer(t1, 1000);

  // Recycling the last two Start events.
  const t0 = goog.debug.Trace.startTracer('foo');
  goog.debug.Trace.stopTracer(t0);
  goog.debug.Trace.clearCurrentTrace();

  t1 = goog.debug.Trace.startTracer('fa');
  goog.debug.Trace.startTracer('fb');
  t2 = goog.debug.Trace.startTracer('fc');
  // No id is repeated.
  assertNotEquals('The trace ids cannot repeat.', t1, t2);
}

function testTracer() {
  const t = goog.debug.Trace.startTracer('foo');
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += i;
  }
  goog.debug.Trace.stopTracer(t);
  const trace = goog.debug.Trace.getFormattedTrace();
  const lines = trace.split('\n');
  assertEquals(8, lines.length);
  assertNotNull(lines[0].match(/^\s*\d+\.\d+\s+Start\s+foo$/));
  assertNotNull(lines[1].match(/^\s*\d+\s+\d+\.\d+\s+Done\s+\d+ ms\s+foo$/));
}

/**
 * Checks if the actual log of a fake listener matches the expectations.
 * @param {!Array<!Array<*>>} expected The expected log from the fake listener.
 * @param {!Function} recorder The output of `goog.testing.recordFunction`
 *     for logging all calls to the fake listener.
 * @return {boolean} True if the recorder's log is expected.
 */
function validateRecordedListener(expected, recorder) {
  assertObjectEquals(
      expected, goog.array.map(recorder.getCalls(), function(call) {
        return call.getArguments();
      }));
}

function testListenerTooManyOpenTraces() {
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(recorder, 'start'),
    stop: goog.partial(recorder, 'stop'),
  });
  const expected = [];
  const openTraces = [];
  for (let i = 0; 2 * i <= goog.debug.Trace.MAX_TRACE_SIZE; i++) {
    const t = goog.debug.Trace.startTracer('trace');
    expected.push(['start', t, 'trace']);
    openTraces.push(t);
  }
  // Triggering the giant thread warning to clear open traces.
  const t = goog.debug.Trace.startTracer('last');
  for (let j = 0; 2 * j <= goog.debug.Trace.MAX_TRACE_SIZE; j++) {
    expected.push(['stop', openTraces[j], TRACE_CANCELLED]);
  }
  expected.push(['start', t, 'last']);
  validateRecordedListener(expected, recorder);
}


function testListenerGiantThread() {
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(recorder, 'start'),
    stop: goog.partial(recorder, 'stop'),
  });
  const t1 = goog.debug.Trace.startTracer('first');
  const expected = [['start', t1, 'first']];
  let t;
  for (let i = 0; 2 * i < goog.debug.Trace.MAX_TRACE_SIZE; i++) {
    t = goog.debug.Trace.startTracer('trace');
    goog.debug.Trace.stopTracer(t);
    expected.push(['start', t, 'trace'], ['stop', t, NORMAL_STOP]);
  }
  // Triggering the giant thread warning.
  const t2 = goog.debug.Trace.startTracer('last');
  expected.push(['start', t2, 'last']);
  // Make sure that the last id of the giant thread is released after clearing.
  assertEquals('The last id is not recycled!', t, t2);
  // Make sure that t1 and t2 are not stopped/cancelled.
  validateRecordedListener(expected, recorder);
}

function testListenerReset() {
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(recorder, 'start'),
    stop: goog.partial(recorder, 'stop'),
  });
  const t1 = goog.debug.Trace.startTracer('1st');
  const t2 = goog.debug.Trace.startTracer('2nd');
  goog.debug.Trace.stopTracer(t2);
  const t3 = goog.debug.Trace.startTracer('3rd');
  // Forcing t1 and t3 to be cancelled.
  goog.debug.Trace.clearCurrentTrace();

  const expected = [
    ['start', t1, '1st'],
    ['start', t2, '2nd'],
    ['stop', t2, NORMAL_STOP],
    ['start', t3, '3rd'],
    ['stop', t1, TRACE_CANCELLED],
    ['stop', t3, TRACE_CANCELLED],
  ];
  validateRecordedListener(expected, recorder);
}

function testRecord() {
  /** @type{number} */
  var a = 10;
  goog.debug.Trace.addTraceCallbacks(a);
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
  validateRecordedListener(
      [['start', t, 'first'], ['stop', t, NORMAL_STOP]], recorder);
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
      [['start', t, '[New Type] first'], ['stop', t, NORMAL_STOP]], recorder);
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
  validateRecordedListener(
      [['start', t, 'bar'], ['stop', t, NORMAL_STOP]], recorder);
}

function testTwoListeners() {
  const r1 = goog.testing.recordFunction();
  goog.debug.Trace.addTraceCallbacks({
    start: goog.partial(r1, 'start'),
    stop: goog.partial(r1, 'stop'),
  });
  const t0 = goog.debug.Trace.startTracer('first');
  goog.debug.Trace.stopTracer(t0);
  const expected1 = [['start', t0, 'first'], ['stop', t0, NORMAL_STOP]];
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
    ['stop', t2, NORMAL_STOP],
    ['stop', t1, NORMAL_STOP],
  ];
  validateRecordedListener(expected2, r2);

  const expectedNoComment = [
    ['start', t0, 'first'],
    ['stop', t0, NORMAL_STOP],
    ['start', t1, '[XType] second'],
    ['start', t2, 'third'],
    ['stop', t2, NORMAL_STOP],
    ['stop', t1, NORMAL_STOP],
  ];
  validateRecordedListener(expectedNoComment, r1);
}
