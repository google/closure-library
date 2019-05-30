// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.PerformanceTimerTest');
goog.setTestOnly();

const Deferred = goog.require('goog.async.Deferred');
const MockClock = goog.require('goog.testing.MockClock');
const PerformanceTimer = goog.require('goog.testing.PerformanceTimer');
const dom = goog.require('goog.dom');
const googMath = goog.require('goog.math');
const testSuite = goog.require('goog.testing.testSuite');

let mockClock;
let sandbox;
let timer;

/**
 * @param {boolean} useSetUp
 * @param {boolean} useTearDown
 * @param {boolean} runAsync
 */
function runAndAssert(useSetUp, useTearDown, runAsync) {
  const fakeExecutionTime = [100, 95, 98, 104, 130, 101, 96, 98, 90, 103];
  let count = 0;
  const testFunction = () => {
    mockClock.tick(fakeExecutionTime[count++]);
    if (runAsync) {
      const deferred = new Deferred();
      deferred.callback();
      return deferred;
    }
  };

  let setUpCount = 0;
  const setUpFunction = () => {
    // Should have no effect on total time.
    mockClock.tick(7);
    setUpCount++;
    if (runAsync) {
      const deferred = new Deferred();
      deferred.callback();
      return deferred;
    }
  };

  let tearDownCount = 0;
  const tearDownFunction = () => {
    // Should have no effect on total time.
    mockClock.tick(11);
    tearDownCount++;
    if (runAsync) {
      const deferred = new Deferred();
      deferred.callback();
      return deferred;
    }
  };

  // Fast test function should complete successfully in under 5 seconds...
  const task = new PerformanceTimer.Task(testFunction);
  if (useSetUp) {
    task.withSetUp(setUpFunction);
  }
  if (useTearDown) {
    task.withTearDown(tearDownFunction);
  }
  if (runAsync) {
    let assertsRan = false;
    const deferred = timer.runAsyncTask(task);
    deferred.addCallback((results) => {
      assertsRan = assertResults(
          results, useSetUp, useTearDown, setUpCount, tearDownCount,
          fakeExecutionTime);
    });
    assertTrue(assertsRan);
  } else {
    const results = timer.runTask(task);
    assertResults(
        results, useSetUp, useTearDown, setUpCount, tearDownCount,
        fakeExecutionTime);
  }
}

/**
 * @param {Array} results
 * @param {boolean} useSetUp
 * @param {boolean} useTearDown
 * @param {boolean} setUpCount
 * @param {boolean} tearDownCount
 * @param {boolean} fakeExecutionTime
 * @return {boolean} true
 */
function assertResults(
    results, useSetUp, useTearDown, setUpCount, tearDownCount,
    fakeExecutionTime) {
  assertNotNull('Results must be available.', results);

  assertEquals(
      'Average is wrong.', googMath.average.apply(null, fakeExecutionTime),
      results['average']);
  assertEquals(
      'Standard deviation is wrong.',
      googMath.standardDeviation.apply(null, fakeExecutionTime),
      results['standardDeviation']);

  assertEquals('Count must be as expected.', 10, results['count']);
  assertEquals('Maximum is wrong.', 130, results['maximum']);
  assertEquals('Mimimum is wrong.', 90, results['minimum']);
  assertEquals(
      'Total must be a nonnegative number.',
      googMath.sum.apply(null, fakeExecutionTime), results['total']);

  assertEquals(
      'Set up count must be as expected.', useSetUp ? 10 : 0, setUpCount);
  assertEquals(
      'Tear down count must be as expected.', useTearDown ? 10 : 0,
      tearDownCount);

  return true;
}

testSuite({
  setUpPage() {
    sandbox = document.getElementById('sandbox');
  },

  setUp() {
    mockClock = new MockClock(true);
    timer = new PerformanceTimer();
  },

  tearDown() {
    mockClock.dispose();
    timer = null;
    dom.removeChildren(sandbox);
  },

  testConstructor() {
    assertTrue(
        'Timer must be an instance of goog.testing.PerformanceTimer',
        timer instanceof PerformanceTimer);
    assertEquals(
        'Timer must collect the default number of samples', 10,
        timer.getNumSamples());
    assertEquals(
        'Timer must have the default timeout interval', 5000,
        timer.getTimeoutInterval());
  },

  testRun_noSetUpOrTearDown() {
    runAndAssert(false, false, false);
  },

  testRun_withSetup() {
    runAndAssert(true, false, false);
  },

  testRun_withTearDown() {
    runAndAssert(false, true, false);
  },

  testRun_withSetUpAndTearDown() {
    runAndAssert(true, true, false);
  },

  testRunAsync_noSetUpOrTearDown() {
    runAndAssert(false, false, true);
  },

  testRunAsync_withSetup() {
    runAndAssert(true, false, true);
  },

  testRunAsync_withTearDown() {
    runAndAssert(false, true, true);
  },

  testRunAsync_withSetUpAndTearDown() {
    runAndAssert(true, true, true);
  },

  testTimeout() {
    let count = 0;
    const testFunction = () => {
      mockClock.tick(100);
      ++count;
    };

    timer.setNumSamples(200);
    timer.setTimeoutInterval(2500);
    const results = timer.run(testFunction);

    assertNotNull('Results must be available', results);
    assertEquals('Count is wrong', count, results['count']);
    assertTrue(
        'Count must less than expected',
        results['count'] < timer.getNumSamples());
  },

  testCreateResults() {
    const samples = [53, 0, 103];
    const expectedResults = {
      'average': 52,
      'count': 3,
      'median': 53,
      'maximum': 103,
      'minimum': 0,
      'standardDeviation': googMath.standardDeviation.apply(null, samples),
      'total': 156,
    };
    assertObjectEquals(
        expectedResults, PerformanceTimer.createResults(samples));
  },
});
