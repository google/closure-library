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


/**
 * @fileoverview Unit tests for Closure's base.js that require debug loading.
 * @suppress {missingRequire}
 */

goog.provide('goog.baseDebugLoaderTest');

goog.setTestOnly('goog.baseDebugLoaderTest');

goog.require('goog.functions');
goog.require('goog.object');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');

var stubs = new goog.testing.PropertyReplacer();
var originalGoogBind = goog.bind;

/**
 * @param {string} path
 * @param {string} relativePath
 * @param {!Array<string>} provides
 * @param {!Array<string>} requires
 * @param {!Object<string, string>} loadFlags
 * @param {boolean} needsTranspile
 * @struct @constructor
 * @extends {goog.Dependency}
 */
function FakeDependency(
    path, relativePath, provides, requires, loadFlags, needsTranspile) {
  FakeDependency.base(
      this, 'constructor', path, relativePath, provides, requires, loadFlags);
  this.loadCalled = false;
  this.needsTranspile = needsTranspile;
}
goog.inherits(FakeDependency, goog.Dependency);


/** @override */
FakeDependency.prototype.load = function(controller) {
  this.loadCalled = true;
  controller.loaded();
};


/**
 * @struct @constructor
 * @extends {goog.DependencyFactory}
 */
function FakeDependencyFactory() {
  this.realFactory = new goog.DependencyFactory();
}
goog.inherits(FakeDependencyFactory, goog.DependencyFactory);


/** @override */
FakeDependencyFactory.prototype.createDependency = function(
    path, relativePath, provides, requires, loadFlags, needsTranspile) {
  var dep = new FakeDependency(
      path, relativePath, provides, requires, loadFlags, needsTranspile);
  testDependencies.push(dep);
  realDependencies.push(this.realFactory.createDependency(
      path, relativePath, provides, requires, loadFlags, needsTranspile));
  return dep;
};


var testDependencies = [];
var realDependencies = [];


function setUpPage() {
  CLOSURE_NO_DEPS = true;
}


function setUp() {
  testDependencies = [];
  realDependencies = [];
  goog.debugLoader_ = new goog.DebugLoader_();
  goog.setDependencyFactory(new FakeDependencyFactory());
}


function tearDown() {
  goog.setCssNameMapping(undefined);
  stubs.reset();
  goog.bind = originalGoogBind;
}

function testInHtmlDocument() {
  var savedGoogGlobal = goog.global;
  try {
    goog.global = {};
    assertFalse(goog.inHtmlDocument_());
    goog.global.document = {};
    assertFalse(goog.inHtmlDocument_());
    goog.global.document.write = function() {};
    assertTrue(goog.inHtmlDocument_());
  } finally {
    // Restore context to respect other tests.
    goog.global = savedGoogGlobal;
  }
}

/** @suppress {missingRequire|visibility} */
function testLoadInNonHtmlNotThrows() {
  var savedGoogGlobal = goog.global;
  try {
    goog.global = {};
    goog.global.document = {};
    assertFalse(goog.inHtmlDocument_());
    // The goog code which is executed at load.
    goog.findBasePath_();
    goog.setDependencyFactory(new goog.DependencyFactory());
    goog.addDependency(
        'loadInNonHtmlNotThrows', ['load.InNonHtmlNotThrows'], []);
    var require = goog.require;
    require('load.InNonHtmlNotThrows');
  } finally {
    // Restore context to respect other tests.
    goog.global = savedGoogGlobal;
  }
}

function testLoadBaseWithQueryParamOk() {
  var savedGoogGlobal = goog.global;
  try {
    goog.global = {};
    goog.global.document = {
      write: goog.nullFunction,
      getElementsByTagName:
          goog.functions.constant([{src: '/path/to/base.js?zx=5'}])
    };
    assertTrue(goog.inHtmlDocument_());
    goog.findBasePath_();
    assertEquals('/path/to/', goog.basePath);
  } finally {
    // Restore context to respect other tests.
    goog.global = savedGoogGlobal;
  }
}

function testLoadBaseFromGlobalVariableOk() {
  var savedGoogGlobal = goog.global;
  try {
    goog.global = {};
    goog.global.document = {
      write: goog.nullFunction,
      getElementsByTagName:
          goog.functions.constant([{src: '/path/to/base.js?zx=5'}])
    };
    goog.global.CLOSURE_BASE_PATH = '/from/constant/';
    goog.findBasePath_();
    assertEquals(goog.global.CLOSURE_BASE_PATH, goog.basePath);
  } finally {
    // Restore context to respect other tests.
    goog.global = savedGoogGlobal;
  }
}

function testLoadBaseFromGlobalVariableDOMClobbered() {
  var savedGoogGlobal = goog.global;
  try {
    goog.global = {};
    goog.global.document = {
      write: goog.nullFunction,
      getElementsByTagName:
          goog.functions.constant([{src: '/path/to/base.js?zx=5'}])
    };
    // Make goog.global.CLOSURE_BASE_PATH an object with a toString, like
    // it would be if it were a DOM clobbered HTMLElement.
    goog.global.CLOSURE_BASE_PATH = {};
    goog.global.CLOSURE_BASE_PATH.toString = function() {
      return '/from/constant/';
    };
    goog.findBasePath_();
    assertEquals('/path/to/', goog.basePath);
  } finally {
    // Restore context to respect other tests.
    goog.global = savedGoogGlobal;
  }
}

function testLoadBaseFromCurrentScriptIgnoringOthers() {
  var savedGoogGlobal = goog.global;
  try {
    goog.global = {};
    goog.global.document = {
      write: goog.nullFunction,
      currentScript: {src: '/currentScript/base.js?zx=5'},
      getElementsByTagName:
          goog.functions.constant([{src: '/path/to/base.js?zx=5'}])
    };
    goog.findBasePath_();
    assertEquals('/currentScript/', goog.basePath);
  } finally {
    // Restore context to respect other tests.
    goog.global = savedGoogGlobal;
  }
}


function testAddDependency() {
  goog.addDependency('foo.js', ['testDep.foo'], ['testDep.bar']);

  // alias to avoid the being picked up by the deps scanner.
  var provide = goog.provide;

  provide('testDep.bar');

  // To differentiate this call from the real one.
  var require = goog.require;

  // this used to throw an exception
  require('testDep.foo');

  assertTrue(goog.isObject(testDep.bar));

  // Unset provided namespace so the test can be re-run.
  testDep = undefined;
}


/**
 * Asserts all test deps up to and including the expected index have loaded,
 * and anything past that has not.
 *
 * @param {number} expected
 */
function assertLoaded(expected) {
  for (var i = 0; i < testDependencies.length; i++) {
    assertEquals(expected >= i, testDependencies[i].loadCalled);
  }
}


/**
 * @param {!goog.Dependency} dep
 * @param {string} relPath
 * @param {!Array<string>} provides
 * @param {!Array<string>} requires
 * @param {!Object<string, string>} loadFlags
 */
function assertDepData(dep, relPath, provides, requires, loadFlags) {
  assertEquals(relPath, dep.relativePath);
  assertArrayEquals(provides, dep.provides);
  assertArrayEquals(requires, dep.requires);
  assertTrue(goog.object.equals(loadFlags, dep.loadFlags));
}


function testAddDependencyModule() {
  goog.addDependency('mod.js', ['testDep.mod'], [], true);
  goog.addDependency('empty.js', ['testDep.empty'], [], {});
  goog.addDependency('mod-goog.js', ['testDep.goog'], [], {'module': 'goog'});

  // To differentiate this call from the real one.
  var require = goog.require;

  require('testDep.mod');
  assertLoaded(0);
  assertDepData(
      realDependencies[0], 'mod.js', ['testDep.mod'], [], {'module': 'goog'});
  assertTrue(realDependencies[0] instanceof goog.GoogModuleDependency);

  require('testDep.empty');
  assertLoaded(1);
  assertDepData(realDependencies[1], 'empty.js', ['testDep.empty'], [], {});
  assertTrue(realDependencies[0] instanceof goog.Dependency);

  require('testDep.goog');
  assertLoaded(2);
  assertDepData(
      realDependencies[2], 'mod-goog.js', ['testDep.goog'], [],
      {'module': 'goog'});
  assertTrue(realDependencies[2] instanceof goog.GoogModuleDependency);

  // Unset provided namespace so the test can be re-run.
  testDep = undefined;
}


function testAddDependencyEs6Module() {
  try {
    goog.addDependency('mod-es6.js', ['testDep.es6'], [], {'module': 'es6'});
    fail('Expected ES6 modules to not be supported');
  } catch (e) {
    // expected
  }
}


function testAddDependencyTranspile() {
  var requireTranspilation = false;
  stubs.set(goog.transpiler_, 'needsTranspile', function() {
    return requireTranspilation;
  });

  goog.addDependency(
      'fancy.js', ['testDep.fancy'], [],
      {'lang': 'es6-impl', 'module': 'goog'});
  requireTranspilation = true;
  goog.addDependency('super.js', ['testDep.superFancy'], [], {'lang': 'es6'});

  assertFalse(testDependencies[0].needsTranspile);
  assertTrue(testDependencies[1].needsTranspile);

  // Unset provided namespace so the test can be re-run.
  testDep = undefined;
}
