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

goog.provide('goog.labs.testing.Environment');

goog.require('goog.array');
goog.require('goog.testing.TestCase');
goog.require('goog.testing.jsunit');


/**
 * JsUnit environments allow developers to customize the existing testing
 * lifecycle by hitching additional setUp and tearDown behaviors to tests.
 *
 * Environments will run their setUp steps in the order in which they
 * are instantiated and registered. During tearDown, the environments will
 * unwind the setUp and execute in reverse order.
 *
 * See http://go/jsunit-env for more information.
 */
goog.labs.testing.Environment = goog.defineClass(null, {
  /** @constructor */
  constructor: function() {
    goog.labs.testing.EnvironmentTestCase_.getInstance().
        registerEnvironment_(this);
  },


  /** Runs immediately before the setUpPage phase of JsUnit tests. */
  setUpPage: goog.nullFunction,


  /** Runs immediately after the tearDownPage phase of JsUnit tests. */
  tearDownPage: goog.nullFunction,


  /** Runs immediately before the setUp phase of JsUnit tests. */
  setUp: goog.nullFunction,


  /** Runs immediately after the tearDown phase of JsUnit tests. */
  tearDown: goog.nullFunction
});



/**
 * An internal TestCase used to hook environments into the JsUnit test runner.
 * Environments cannot be used in conjunction with custom TestCases for JsUnit.
 * @private @final @constructor
 * @extends {goog.testing.TestCase}
 */
goog.labs.testing.EnvironmentTestCase_ = function() {
  goog.labs.testing.EnvironmentTestCase_.base(this, 'constructor');

  /** @private {!Array.<!goog.labs.testing.Environment>}> */
  this.environments_ = [];

  // Automatically install this TestCase when any environment is used in a test.
  goog.testing.TestCase.initializeTestRunner(this);
};
goog.inherits(goog.labs.testing.EnvironmentTestCase_, goog.testing.TestCase);
goog.addSingletonGetter(goog.labs.testing.EnvironmentTestCase_);


/**
 * Override the default global scope discovery of lifecycle functions to prevent
 * overriding the custom environment setUp(Page)/tearDown(Page) logic.
 * @override
 */
goog.labs.testing.EnvironmentTestCase_.prototype.autoDiscoverLifecycle =
    function() {
  if (goog.global['runTests']) {
    this.runTests = goog.bind(goog.global['runTests'], goog.global);
  }
  if (goog.global['shouldRunTests']) {
    this.shouldRunTests = goog.bind(goog.global['shouldRunTests'], goog.global);
  }
};


/**
 * Adds an environment to the JsUnit test.
 * @param {!goog.labs.testing.Environment} env
 * @private
 */
goog.labs.testing.EnvironmentTestCase_.prototype.registerEnvironment_ =
    function(env) {
  this.environments_.push(env);
};


/** @override */
goog.labs.testing.EnvironmentTestCase_.prototype.setUpPage = function() {
  goog.array.forEach(this.environments_, function(env) {
    env.setUpPage();
  });

  // User defined setUpPage method.
  if (goog.global['setUpPage']) {
    goog.global['setUpPage']();
  }
};


/** @override */
goog.labs.testing.EnvironmentTestCase_.prototype.setUp = function() {
  // User defined configure method.
  if (goog.global['configureEnvironment']) {
    goog.global['configureEnvironment']();
  }

  goog.array.forEach(this.environments_, function(env) {
    env.setUp();
  }, this);

  // User defined setUp method.
  if (goog.global['setUp']) {
    goog.global['setUp']();
  }
};


/** @override */
goog.labs.testing.EnvironmentTestCase_.prototype.tearDown = function() {
  // User defined tearDown method.
  if (goog.global['tearDown']) {
    goog.global['tearDown']();
  }

  // Execute the tearDown methods for the environment in the reverse order
  // in which they were registered to "unfold" the setUp.
  goog.array.forEachRight(this.environments_, function(env) {
    env.tearDown();
  });
};


/** @override */
goog.labs.testing.EnvironmentTestCase_.prototype.tearDownPage = function() {
  // User defined tearDownPage method.
  if (goog.global['tearDownPage']) {
    goog.global['tearDownPage']();
  }

  goog.array.forEachRight(this.environments_, function(env) {
    env.tearDownPage();
  });
};
