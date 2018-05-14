// Copyright 2012 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

goog.provide('goog.result.transformTest');
goog.setTestOnly('goog.result.transformTest');

goog.require('goog.Timer');
goog.require('goog.result');
goog.require('goog.result.SimpleResult');
goog.require('goog.testing.MockClock');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');

var result, resultCallback, multiplyResult, mockClock;

function setUpPage() {
  mockClock = new goog.testing.MockClock();
  mockClock.install();
}

function setUp() {
  mockClock.reset();
  result = new goog.result.SimpleResult();
  resultCallback = new goog.testing.recordFunction();
  multiplyResult = goog.testing.recordFunction(function(value) {
      return value * 2;
    });
}

function tearDown() {
  result = multiplyResult = null;
}

function tearDownPage() {
  mockClock.uninstall();
  goog.dispose(mockClock);
}

function testTransformWhenResultSuccess() {
  var transformedResult = goog.result.transform(result, multiplyResult);
  goog.result.wait(transformedResult, resultCallback);

  assertEquals(goog.result.Result.State.PENDING, result.getState());
  result.setValue(1);
  assertTransformerCall(multiplyResult, 1);
  assertSuccessCall(resultCallback, transformedResult, 2);
}

function testTransformWhenResultSuccessAsync() {
  var transformedResult = goog.result.transform(result, multiplyResult);
  goog.result.wait(transformedResult, resultCallback);

  goog.Timer.callOnce(function() {
    result.setValue(1);
  });

  assertEquals(goog.result.Result.State.PENDING, result.getState());
  mockClock.tick();
  assertTransformerCall(multiplyResult, 1);
  assertSuccessCall(resultCallback, transformedResult, 2);
}

function testTransformWhenResultError() {
  var transformedResult = goog.result.transform(result, multiplyResult);
  goog.result.wait(transformedResult, resultCallback);

  assertEquals(goog.result.Result.State.PENDING, result.getState());
  result.setError(4);
  assertNoCall(multiplyResult);
  assertErrorCall(resultCallback, transformedResult, 4);
}

function testTransformWhenResultErrorAsync() {
  var transformedResult = goog.result.transform(result, multiplyResult);

  goog.result.wait(transformedResult, resultCallback);

  goog.Timer.callOnce(function() {
    result.setError(5);
  });

  assertEquals(goog.result.Result.State.PENDING, result.getState());
  mockClock.tick();
  assertNoCall(multiplyResult);
  assertErrorCall(resultCallback, transformedResult, 5);
}

function testCancelParentResults() {
  var transformedResult = goog.result.transform(result, multiplyResult);
  goog.result.wait(transformedResult, resultCallback);

  goog.result.cancelParentResults(transformedResult);

  assertTrue(result.isCanceled());
  result.setValue(1);
  assertNoCall(multiplyResult);
}

function testDoubleTransformCancel() {
  var step1Result = goog.result.transform(result, multiplyResult);
  var step2Result = goog.result.transform(step1Result, multiplyResult);

  goog.result.cancelParentResults(step2Result);

  assertFalse(result.isCanceled());
  assertTrue(step1Result.isCanceled());
  assertTrue(step2Result.isCanceled());
}

function assertSuccessCall(recordFunction, result, value) {
  assertEquals(1, recordFunction.getCallCount());

  var res = recordFunction.popLastCall().getArgument(0);
  assertEquals(result, res);
  assertEquals(goog.result.Result.State.SUCCESS, res.getState());
  assertEquals(value, res.getValue());
}

function assertErrorCall(recordFunction, result, value) {
  assertEquals(1, recordFunction.getCallCount());

  var res = recordFunction.popLastCall().getArgument(0);
  assertEquals(result, res);
  assertEquals(goog.result.Result.State.ERROR, res.getState());
  assertEquals(value, res.getError());
}

function assertNoCall(recordFunction) {
  assertEquals(0, recordFunction.getCallCount());
}

function assertTransformerCall(recordFunction, value) {
  assertEquals(1, recordFunction.getCallCount());

  var argValue = recordFunction.popLastCall().getArgument(0);
  assertEquals(value, argValue);
}
