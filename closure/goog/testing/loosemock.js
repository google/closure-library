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

/**
 * @fileoverview This file defines a loose mock implementation.
 */

goog.provide('goog.testing.LooseExpectationCollection');
goog.provide('goog.testing.LooseMock');

goog.require('goog.array');
goog.require('goog.structs.Map');
goog.require('goog.testing.Mock');



/**
 * This class is an ordered collection of expectations for one method. Since
 * the loose mock does most of its verification at the time of $verify, this
 * class is necessary to manage the return/throw behavior when the mock is
 * being called.
 * @constructor
 */
goog.testing.LooseExpectationCollection = function() {
  /**
   * The list of expectations. All of these should have the same name.
   * @type {Array.<goog.testing.MockExpectation>}
   * @private
   */
  this.expectations_ = [];
};


/**
 * Adds an expectation to this collection.
 * @param {goog.testing.MockExpectation} expectation The expectation to add.
 */
goog.testing.LooseExpectationCollection.prototype.addExpectation =
    function(expectation) {
  this.expectations_.push(expectation);
};


/**
 * Gets the list of expectations in this collection.
 * @return {Array.<goog.testing.MockExpectation>} The array of expectations.
 */
goog.testing.LooseExpectationCollection.prototype.getExpectations = function() {
  return this.expectations_;
};



/**
 * A mock with loose call expectations. Whereas StrictMock verifies what calls
 * are made, how many times they are called, and in what order they are called,
 * LooseMock does not. For example:
 * <pre>
 *   var duck = new goog.testing.LooseMock(Duck);
 *   duck.feet().$returns(2);
 *   duck.fly().$returns(true);
 *   duck.flies().$returns(true);
 *   duck.activities().$returns(1);
 *
 *   duck.$replay();
 *
 *   assertTrue(duck.flies());
 *   assertEquals(duck.flies(), duck.fly());
 *   assertEquals(undefined, duck.runs());
 *   assertEquals(duck.runs(), duck.run());
 *   assertEquals(1, duck.activities());
 *
 *   duck.$verify();
 * </pre>
 *
 * Some verification is often desirable for special cases, such as whether
 * or not dispose() was called exactly once on a mock object. This is achieved
 * by explicitly calling $times() or related methods. For example, if we want
 * to ensure our duck object was disposed of properly, we can add the
 * expectation explicity with duck.dispose().$times(1). The mock object will
 * now verify the dispose() method is called exactly once. Loose mocks do not
 * verify call order, though, so if we want to ensure the dispose() method was
 * called last, we need to use a strick mock instead.
 *
 * @param {Object} objectToMock The object to mock.
 * @param {boolean=} opt_ignoreUnexpectedCalls Whether to ignore unexpected
 *     calls. Default is true.
 * @param {boolean=} opt_mockStaticMethods An optional argument denoting that
 *     a mock should be constructed from the static functions of a class.
 * @param {boolean=} opt_createProxy An optional argument denoting that
 *     a proxy for the target mock should be created.
 * @constructor
 * @extends {goog.testing.Mock}
 */
goog.testing.LooseMock = function(objectToMock, opt_ignoreUnexpectedCalls,
    opt_mockStaticMethods, opt_createProxy) {
  if (!goog.isDef(opt_ignoreUnexpectedCalls)) {
    opt_ignoreUnexpectedCalls = true;
  }
  goog.testing.Mock.call(this, objectToMock, opt_mockStaticMethods,
      opt_createProxy);

  /**
   * A map of method names to a LooseExpectationCollection for that method.
   * @type {goog.structs.Map}
   * @private
   */
  this.$expectations_ = new goog.structs.Map();

  /**
   * The calls that have been made; we cache them to verify at the end. Each
   * element is an array where the first element is the name, and the second
   * element is the arguments.
   * @type {Array.<Array.<*>>}
   * @private
   */
  this.$calls_ = [];

  /**
   * Whether to ignore unexpected calls.
   * @type {boolean}
   * @private
   */
  this.$ignoreUnexpectedCalls_ = !!opt_ignoreUnexpectedCalls;
};
goog.inherits(goog.testing.LooseMock, goog.testing.Mock);


/**
 * A setter for the ignoreUnexpectedCalls field.
 * @param {boolean} ignoreUnexpectedCalls Whether to ignore unexpected calls.
 * @return {goog.testing.LooseMock} This mock object.
 */
goog.testing.LooseMock.prototype.$setIgnoreUnexpectedCalls = function(
    ignoreUnexpectedCalls) {
  this.$ignoreUnexpectedCalls_ = ignoreUnexpectedCalls;
  return this;
};


/** @override */
goog.testing.LooseMock.prototype.$recordExpectation = function() {
  if (!this.$expectations_.containsKey(this.$pendingExpectation.name)) {
    this.$expectations_.set(this.$pendingExpectation.name,
        new goog.testing.LooseExpectationCollection());
  }

  var collection = this.$expectations_.get(this.$pendingExpectation.name);
  collection.addExpectation(this.$pendingExpectation);
};


/** @override */
goog.testing.LooseMock.prototype.$recordCall = function(name, args) {
  if (!this.$expectations_.containsKey(name)) {
    if (this.$ignoreUnexpectedCalls_) {
      return;
    }
    this.$throwCallException(name, args);
  }

  // Start from the beginning of the expectations for this name,
  // and iterate over them until we find an expectation that matches
  // and also has calls remaining.
  var expectation = null;
  var candidate = undefined;  // save last candidate for $throwCallException
  var collection = this.$expectations_.get(name);
  var expectations = collection.getExpectations();
  for (var i = 0; i < expectations.length; i++) {
    candidate = expectations[i];
    if (this.$verifyCall(candidate, name, args)) {
      expectation = candidate;
      if (expectation.actualCalls < expectation.maxCalls) {
        break;
      } // else continue and see if we can find something that does match
    }
  }
  if (expectation == null) {
    this.$throwCallException(name, args, candidate);
  }

  expectation.actualCalls++;
  if (expectation.actualCalls > expectation.maxCalls) {
    if (!this.$ignoreUnexpectedCalls_ || expectation.explicitCounts) {
      this.$throwException('Too many calls to ' + expectation.name +
          '\nExpected: ' + expectation.maxCalls + ' but was: ' +
          expectation.actualCalls);
    }
  }

  this.$calls_.push([name, args]);
  return this.$do(expectation, args);
};


/** @override */
goog.testing.LooseMock.prototype.$reset = function() {
  goog.testing.LooseMock.superClass_.$reset.call(this);

  this.$expectations_ = new goog.structs.Map();
  this.$calls_ = [];
};


/** @override */
goog.testing.LooseMock.prototype.$replay = function() {
  goog.testing.LooseMock.superClass_.$replay.call(this);

  // Verify there are no expectations that can never be reached. If this
  // expectation can be called infinite times, check if any subsequent
  // expectation has the exact same argument list. This can't catch every
  // situation, but it is a decent sanity check, and it's similar to the
  // behavior of EasyMock in java.
  var collections = this.$expectations_.getValues();
  for (var i = 0; i < collections.length; i++) {
    var expectations = collections[i].getExpectations();
    for (var j = 0; j < expectations.length - 1; j++) {  // all but the last
      var expectation = expectations[j];
      if (!isFinite(expectation.maxCalls)) {
        var argumentList = expectation.argumentList;
        for (var k = j + 1; k < expectations.length; k++) {
          var laterExpectation = expectations[k];
          if (laterExpectation.minCalls > 0 &&
              goog.array.equals(argumentList, laterExpectation.argumentList)) {
            var name = expectation.name;
            var args = this.$argumentsAsString(expectation.argumentList);
            this.$throwException([
              'Expected call to ', name, ' with arguments ', args,
              ' has an infinite max number of calls; can\'t expect an',
              ' identical call later with a positive min number of calls'
            ].join(''));
          }
        }
      }
    }
  }
};


/** @override */
goog.testing.LooseMock.prototype.$verify = function() {
  goog.testing.LooseMock.superClass_.$verify.call(this);

  var collections = this.$expectations_.getValues();
  var ignoreUnexpectedCalls = this.$ignoreUnexpectedCalls_;
  for (var i = 0; i < collections.length; i++) {
    var expectations = collections[i].getExpectations();
    for (var j = 0; j < expectations.length; j++) {
      var expectation = expectations[j];
      if (!ignoreUnexpectedCalls || expectation.explicitCounts) {
        if (expectation.actualCalls > expectation.maxCalls) {
          this.$throwException('Too many calls to ' + expectation.name +
              '\nExpected: ' + expectation.maxCalls + ' but was: ' +
              expectation.actualCalls);
        } else if (expectation.actualCalls < expectation.minCalls) {
          this.$throwException('Not enough calls to ' + expectation.name +
              '\nExpected: ' + expectation.minCalls + ' but was: ' +
              expectation.actualCalls);
        }
      }
    }
  }
};
