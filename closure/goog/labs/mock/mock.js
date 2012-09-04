// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Provides a mocking framework in Closure to make unit tests easy
 * to write and understand. The methods provided here can be used to replace
 * implementations of existing objects with 'mock' objects to abstract out
 * external services and dependencies thereby isolating the code under test.
 * Apart from mocking, methods are also provided to just monitor calls to an
 * object (spying) and returning specific values for some or all the inputs to
 * methods (stubbing).
 *
 */


goog.provide('goog.labs.mock');

goog.require('goog.array');


/**
 * Mocks a given object or class.
 *
 * @param {!Object} objectOrClass An instance or a constructor of a class to be
 *     mocked.
 *
 * @return {!Object} The mocked object.
 */
goog.labs.mock = function(objectOrClass) {
  // Go over properties of 'objectOrClass' and create a MockManager to
  // be used for stubbing out calls to methods.
  var mockedObject = new goog.labs.mock.MockManager_(objectOrClass);
  return mockedObject.getMockedObject();
};


/**
 * This array contains the name of the functions that are part of the base
 * Object prototype.
 * Basically a copy of goog.object.PROTOTYPE_FIELDS_.
 * @const
 * @type {!Array.<string>}
 * @private
 */
goog.labs.mock.PROTOTYPE_FIELDS_ = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];



/**
 * Sets up mock for the given object (or class), stubbing out all the defined
 * methods. By default, all stubs return {@code undefined}, though stubs can be
 * later defined using {@code goog.labs.mock.when}.
 *
 * @param {!Object|!Function} objOrClass The object to set up the mock for.
 *
 * @constructor
 * @private
 */
goog.labs.mock.MockManager_ = function(objOrClass) {
  /**
   * Proxies the methods for the mocked object or class to execute the stubs.
   * @type {!Object}
   * @private
   * TODO(user): make instanceof work.
   */
  this.mockedObject_ = {};

  var obj;
  if (goog.isFunction(objOrClass)) {
    // Create a temporary subclass with a no-op constructor so that we can
    // create an instance and determine what methods it has.
    /** @constructor */
    function tempCtor() {};
    goog.inherits(tempCtor, objOrClass);
    obj = new tempCtor();
  } else {
    obj = objOrClass;
  }

  var enumerableProperties = goog.object.getKeys(obj);
  // The non enumerable properties are added due to the fact that IE8 does not
  // enumerate any of the prototype Object functions even when overriden and
  // mocking these is sometimes needed.
  for (var i = 0; i < goog.labs.mock.PROTOTYPE_FIELDS_.length; i++) {
    var prop = goog.labs.mock.PROTOTYPE_FIELDS_[i];
    if (!goog.array.contains(enumerableProperties, prop)) {
      enumerableProperties.push(prop);
    }
  }

  // Adds the properties to the mock, creating a proxy stub for each method on
  // the instance.
  for (var i = 0; i < enumerableProperties.length; i++) {
    var prop = enumerableProperties[i];
    if (goog.isFunction(obj[prop])) {
      this.mockedObject_[prop] = goog.bind(this.executeStub_, this, prop);
    }
  }
};


/**
 * Returns the method proxy for this mock object. This should have a stubbed
 * method for each method on the mocked object.
 *
 * @return {!Object} The method proxy.
 */
goog.labs.mock.MockManager_.prototype.getMockedObject = function() {
  return this.mockedObject_;
};


/**
 * Looks up the list of stubs defined on the mock object and executes the
 * function associated with that stub.
 *
 * @param {string} methodName The name of the method to execute.
 * @param {...} var_args The arguments passed to the method.
 *
 * @return {*} Value returned by the stub function.
 * @private
 */
goog.labs.mock.MockManager_.prototype.executeStub_ =
    function(methodName, var_args) {
  // TODO(user): Look up stub bindings and find the appropriate one for this
  //    method and set of arguments.
};
