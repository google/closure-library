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
goog.require('goog.debug.Error');
goog.require('goog.functions');


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

  /**
   * Holds the stub bindings established so far.
   * @private
   */
  this.methodBindings_ = [];

  /**
   * Proxies the calls to establish the first step of the stub bindings (object
   * and method name)
   * @private
   */
  this.binderProxy_ = {};

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
      this.binderProxy_[prop] = goog.bind(this.handleMockCall_, this, prop);
    }
  }

  this.mockedObject_.$binderProxy = this.binderProxy_;
};


/**
 * Handles the first step in creating a stub, returning a stub-binder that
 * is later used to bind a stub for a method.
 *
 * @param {string} methodName The name of the method being bound.
 * @param {...} var_args The arguments to the method.
 *
 * @return {!goog.labs.mock.StubBinder_} The stub binder.
 * @private
 */
goog.labs.mock.MockManager_.prototype.handleMockCall_ =
    function(methodName, var_args) {
  var args = goog.array.slice(arguments, 1);
  return new goog.labs.mock.StubBinder_(this, methodName, args);
};


/**
 * Returns the mock object. This should have a stubbed method for each method
 * on the object being mocked.
 *
 * @return {!Object} The mock object.
 */
goog.labs.mock.MockManager_.prototype.getMockedObject = function() {
  return this.mockedObject_;
};


/**
 * Adds a binding for the method name and arguments to be stubbed.
 *
 * @param {string} methodName The name of the stubbed method.
 * @param {!Array} args The arguments passed to the method.
 * @param {!Function} func The stub function.
 *
 */
goog.labs.mock.MockManager_.prototype.addBinding =
    function(methodName, args, func) {
  var binding = new goog.labs.mock.MethodBinding_(methodName, args, func);
  this.methodBindings_.push(binding);
};


/**
 * Returns a stub, if defined, for the method and arguments passed in as
 * parameters.
 *
 * @param {string} methodName The name of the stubbed method.
 * @param {Array} args The arguments passed to the method.
 *
 * @return {!Function|undefined} The stub function or undefined.
 * @private
 */
goog.labs.mock.MockManager_.prototype.findBinding_ =
    function(methodName, args) {
  var stub = goog.array.find(this.methodBindings_, function(binding) {
    return binding.matches(methodName, args);
  });
  return stub && stub.getStub();
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
  var args = goog.array.slice(arguments, 1);
  var func = this.findBinding_(methodName, args);
  if (func) {
    return func.apply(null, args);
  }
};



/**
 * The stub binder is the object that helps define the stubs by binding
 * method name to the stub method.
 *
 * @param {!goog.labs.mock.MockManager_} mockManager The mock manager.
 * @param {string} name The method name.
 * @param {!Array} args The other arguments to the method.
 *
 * @constructor
 * @private
 */
goog.labs.mock.StubBinder_ = function(mockManager, name, args) {
  /**
   * The mock manager instance.
   * @type {!goog.labs.mock.MockManager_}
   * @private
   */
  this.mockManager_ = mockManager;

  /**
   * Holds the name of the method to be bound.
   * @type {string}
   * @private
   */
  this.name_ = name;

  /**
   * Holds the arguments for the method.
   * @type {!Array}
   * @private
   */
  this.args_ = args;
};


/**
 * Defines the stub to be called for the method name and arguments bound
 * earlier.
 * TODO(user): Add support for the 'Answer' interface.
 *
 * @param {!Function} func The stub.
 */
goog.labs.mock.StubBinder_.prototype.then = function(func) {
  this.mockManager_.addBinding(this.name_, this.args_, func);
};


/**
 * Defines the stub to return a specific value for a method name and arguments.
 *
 * @param {*} value The value to return.
 */
goog.labs.mock.StubBinder_.prototype.thenReturn = function(value) {
  this.mockManager_.addBinding(this.name_, this.args_,
                               goog.functions.constant(value));
};


/**
 * Facilitates (and is the first step in) setting up stubs. Obtains an object
 * on which, the method to be mocked is called to create a stub. Sample usage:
 *
 * var mockObj = goog.labs.mock(objectBeingMocked);
 * goog.labs.mock.when(mockObj).getFoo(3).thenReturn(4);
 *
 * @param {!Object} mockObject The mocked object.
 *
 * @return {!goog.labs.mock.StubBinder_} The property binder.
 */
goog.labs.mock.when = function(mockObject) {
  return mockObject.$binderProxy;
};



/**
 * Represents a binding between a method name, args and a stub.
 *
 * @param {string} methodName The name of the method being stubbed.
 * @param {!Array} args The arguments passed to the method.
 * @param {!Function} stub The stub function to be called for the given method.
 * @constructor
 * @private
 */
goog.labs.mock.MethodBinding_ = function(methodName, args, stub) {
  /**
   * The name of the method being stubbed.
   * @type {string}
   * @private
   */
  this.methodName_ = methodName;

  /**
   * The arguments for the method being stubbed.
   * @type {!Array}
   * @private
   */
  this.args_ = args;

  /**
   * The stub function.
   * @type {!Function}
   * @private
   */
  this.stub_ = stub;
};


/**
 * @return {!Function} The stub to be executed.
 */
goog.labs.mock.MethodBinding_.prototype.getStub = function() {
  return this.stub_;
};


/**
 * Determines whether the given args match the stored args_. Used to determine
 * which stub to invoke for a method.
 *
 * @param {string} methodName The name of the method being stubbed.
 * @param {!Array} args An array of arguments.
 * @return {boolean} If it matches the stored arguments.
 */
goog.labs.mock.MethodBinding_.prototype.matches = function(methodName, args) {
  //TODO(user): More elaborate argument matching.
  return this.methodName_ == methodName &&
         goog.array.equals(args, this.args_);
};
