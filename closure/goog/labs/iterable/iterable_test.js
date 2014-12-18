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

/**
 * @fileoverview Tests for goog.labs.iterable
 */

goog.module('goog.labs.iterableTest');

goog.module.declareTestMethods();
goog.setTestOnly();

goog.require('goog.testing.jsunit');

var iterable = goog.require('goog.labs.iterable');
var recordFunction = goog.require('goog.testing.recordFunction');


/**
 * Create an iterable starting at "start" and increments up to
 * (but not including) "stop".
 */
function createRangeIterable(start, stop) {
  var value = start;
  var next = function() {
    if (value < stop) {
      return {
        value: value++,
        done: false
      };
    }

    return {
      value: undefined,
      done: true
    };
  };

  return {
    next: next
  };
}

exports.testCreateRangeIterable = function() {
  var range = createRangeIterable(0, 3);

  for (var i = 0; i < 3; i++) {
    assertObjectEquals({
      value: i,
      done: false
    }, range.next());
  }

  for (var i = 0; i < 3; i++) {
    assertObjectEquals({
      value: undefined,
      done: true
    }, range.next());
  }
};

exports.testForEach = function() {
  var range = createRangeIterable(0, 3);

  var self = {};
  var callback = recordFunction();
  iterable.forEach(callback, range, self);

  callback.assertCallCount(3);

  var calls = callback.getCalls();
  for (var i = 0; i < calls.length; i++) {
    var call = calls[i];
    assertArrayEquals([i], call.getArguments());
    assertEquals(self, call.getThis());
  }
};
