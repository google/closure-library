// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Tests for goog.module.ModuleLoader.
 * @author nicksantos@google.com (Nick Santos)
 */

goog.provide('goog.module.ModuleLoaderTest');

goog.require('goog.Promise');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.functions');
goog.require('goog.html.TrustedResourceUrl');
goog.require('goog.loader.activeModuleManager');
goog.require('goog.module.ModuleLoader');
goog.require('goog.module.ModuleManager');
goog.require('goog.net.BulkLoader');
goog.require('goog.net.XmlHttp');
goog.require('goog.object');
goog.require('goog.string.Const');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.TestCase');
goog.require('goog.testing.events.EventObserver');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');

goog.setTestOnly('goog.module.ModuleLoaderTest');


window.modA1Loaded = false;
window.modA2Loaded = false;
window.modB1Loaded = false;

let moduleLoader = null;
let moduleManager = null;
const stubs = new goog.testing.PropertyReplacer();
const modA1 = goog.html.TrustedResourceUrl.fromConstant(
    goog.string.Const.from('testdata/modA_1.js'));
const modA2 = goog.html.TrustedResourceUrl.fromConstant(
    goog.string.Const.from('testdata/modA_2.js'));
const modB1 = goog.html.TrustedResourceUrl.fromConstant(
    goog.string.Const.from('testdata/modB_1.js'));

const EventType = goog.module.ModuleLoader.EventType;
let observer;

function setUpPage() {
  goog.testing.TestCase.getActiveTestCase().promiseTimeout = 10000;  // 10s
}

function setUp() {
  modA1Loaded = false;
  modA2Loaded = false;
  modB1Loaded = false;

  goog.provide = goog.nullFunction;
  moduleManager = goog.module.ModuleManager.getInstance();
  stubs.replace(moduleManager, 'getBackOff_', goog.functions.constant(0));

  moduleLoader = new goog.module.ModuleLoader();
  observer = new goog.testing.events.EventObserver();

  goog.events.listen(moduleLoader, goog.object.getValues(EventType), observer);

  moduleManager.setLoader(moduleLoader);
  moduleManager.setAllModuleInfo({'modA': [], 'modB': ['modA']});
  moduleManager.setModuleTrustedUris({'modA': [modA1, modA2], 'modB': [modB1]});

  assertNotLoaded('modA');
  assertNotLoaded('modB');
  assertFalse(modA1Loaded);
}

function tearDown() {
  stubs.reset();
  goog.dispose(moduleLoader);

  // Ensure that the module manager was created.
  assertNotNull(goog.module.ModuleManager.getInstance());
  goog.loader.activeModuleManager.reset();

  // tear down the module loaded flag.
  modA1Loaded = false;

  // Remove all the fake scripts.
  const scripts =
      goog.array.clone(goog.dom.getElementsByTagName(goog.dom.TagName.SCRIPT));
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf('testdata') != -1) {
      goog.dom.removeNode(scripts[i]);
    }
  }
}

function testLoadModuleA() {
  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modA', function() {
          assertLoaded('modA');
          assertNotLoaded('modB');
          assertTrue(modA1Loaded);

          // The code is not evaluated immediately, but only after a browser
          // yield.
          assertEquals(
              'EVALUATE_CODE', 0,
              observer.getEvents(EventType.EVALUATE_CODE).length);
          assertEquals(
              'REQUEST_SUCCESS', 1,
              observer.getEvents(EventType.REQUEST_SUCCESS).length);
          assertArrayEquals(
              ['modA'],
              observer.getEvents(EventType.REQUEST_SUCCESS)[0].moduleIds);
          assertEquals(
              'REQUEST_ERROR', 0,
              observer.getEvents(EventType.REQUEST_ERROR).length);
          resolve();
        });
      })
      .then(function() {
        assertEquals(
            'EVALUATE_CODE after tick', 1,
            observer.getEvents(EventType.EVALUATE_CODE).length);
        assertEquals(
            'REQUEST_SUCCESS after tick', 1,
            observer.getEvents(EventType.REQUEST_SUCCESS).length);
        assertEquals(
            'REQUEST_ERROR after tick', 0,
            observer.getEvents(EventType.REQUEST_ERROR).length);
      });
}

function testLoadModuleB() {
  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modB', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertLoaded('modB');
        assertTrue(modA1Loaded);
      });
}

function testLoadDebugModuleA() {
  moduleLoader.setDebugMode(true);
  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modA', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertNotLoaded('modB');
        assertTrue(modA1Loaded);
      });
}

function testLoadDebugModuleB() {
  moduleLoader.setDebugMode(true);
  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modB', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertLoaded('modB');
        assertTrue(modA1Loaded);
      });
}

function testLoadDebugModuleAThenB() {
  // Swap the script tags of module A, to introduce a race condition.
  // See the comments on this in ModuleLoader's debug loader.
  moduleManager.setModuleTrustedUris({'modA': [modA2, modA1], 'modB': [modB1]});
  moduleLoader.setDebugMode(true);
  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modB', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertLoaded('modB');

        const scripts = goog.array.clone(
            goog.dom.getElementsByTagName(goog.dom.TagName.SCRIPT));
        let seenLastScriptOfModuleA = false;
        for (let i = 0; i < scripts.length; i++) {
          const uri = scripts[i].src;
          if (uri.indexOf('modA_1.js') >= 0) {
            seenLastScriptOfModuleA = true;
          } else if (uri.indexOf('modB') >= 0) {
            assertTrue(seenLastScriptOfModuleA);
          }
        }
      });
}

function testLoadScriptTagModuleA() {
  moduleLoader.setUseScriptTags(true);
  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modA', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertNotLoaded('modB');
        assertTrue(modA1Loaded);
      });
}

function testLoadScriptTagModuleB() {
  moduleLoader.setUseScriptTags(true);
  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modB', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertLoaded('modB');
        assertTrue(modA1Loaded);
      });
}

function testSourceInjection() {
  moduleLoader.setSourceUrlInjection(true);
  return assertSourceInjection();
}

function testSourceInjectionViaDebugMode() {
  moduleLoader.setDebugMode(true);
  return assertSourceInjection();
}

function assertSourceInjection() {
  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modB', resolve);
      })
      .then(function() {
        assertTrue(!!throwErrorInModuleB);

        const ex = assertThrows(function() {
          throwErrorInModuleB();
        });

        if (!ex.stack) {
          return;
        }

        const stackTrace = ex.stack.toString();
        const expectedString = 'testdata/modB_1.js';

        if (goog.module.ModuleLoader.supportsSourceUrlStackTraces()) {
          // Source URL should be added in eval or in jsloader.
          assertContains(expectedString, stackTrace);
        } else if (moduleLoader.getDebugMode()) {
          // Browsers used jsloader, thus URLs are present.
          assertContains(expectedString, stackTrace);
        } else {
          // Browser used eval, does not support source URL.
          assertNotContains(expectedString, stackTrace);
        }
      });
}

function testModuleLoaderRecursesTooDeep(opt_numModules) {
  // There was a bug in the module loader where it would retry recursively
  // whenever there was a synchronous failure in the module load. When you
  // asked for modB, it would try to load its dependency modA. When modA
  // failed, it would move onto modB, and then start over, repeating until it
  // ran out of stack.
  const numModules = opt_numModules || 1;
  const uris = {};
  const deps = {};
  const mods = [];
  for (let num = 0; num < numModules; num++) {
    const modName = 'mod' + num;
    mods.unshift(modName);
    uris[modName] = [];
    deps[modName] = num ? ['mod' + (num - 1)] : [];
    for (let i = 0; i < 5; i++) {
      uris[modName].push(goog.html.TrustedResourceUrl.format(
          goog.string.Const.from(
              'https://www.google.com/crossdomain%{num}x%{i}.js'),
          {'num': num, 'i': i}));
    }
  }

  moduleManager.setAllModuleInfo(deps);
  moduleManager.setModuleTrustedUris(uris);

  // Make all XHRs throw an error, so that we test the error-handling
  // functionality.
  const oldXmlHttp = goog.net.XmlHttp;
  stubs.set(goog.net, 'XmlHttp', function() {
    return {open: goog.functions.error('mock error'), abort: goog.nullFunction};
  });
  goog.object.extend(goog.net.XmlHttp, oldXmlHttp);

  let errorCount = 0;
  const errorIds = [];
  const errorHandler = function(ignored, modId) {
    errorCount++;
    errorIds.push(modId);
  };
  moduleManager.registerCallback(
      goog.module.ModuleManager.CallbackType.ERROR, errorHandler);

  moduleManager.execOnLoad(
      mods[0], function() { fail('modB should not load successfully'); });

  assertEquals(mods.length, errorCount);

  goog.array.sort(mods);
  goog.array.sort(errorIds);
  assertArrayEquals(mods, errorIds);

  assertArrayEquals([], moduleManager.requestedModuleIdsQueue_);
  assertArrayEquals([], moduleManager.userInitiatedLoadingModuleIds_);
}

function testModuleLoaderRecursesTooDeep2modules() {
  testModuleLoaderRecursesTooDeep(2);
}

function testModuleLoaderRecursesTooDeep3modules() {
  testModuleLoaderRecursesTooDeep(3);
}

function testModuleLoaderRecursesTooDeep4modules() {
  testModuleLoaderRecursesTooDeep(3);
}

function testErrback() {
  // Don't run this test on IE, because the way the test runner catches
  // errors on IE plays badly with the simulated errors in the test.
  if (goog.userAgent.IE) return;

  // Modules will throw an exception if this boolean is set to true.
  modA1Loaded = true;

  return new goog.Promise(function(resolve, reject) {
    const errorHandler = function() {
      try {
        assertNotLoaded('modA');
      } catch (e) {
        reject(e);
      }
      resolve();
    };
    moduleManager.registerCallback(
        goog.module.ModuleManager.CallbackType.ERROR, errorHandler);

    moduleManager.execOnLoad(
        'modA', function() { fail('modA should not load successfully'); });
  });
}

function testEventError() {
  // Don't run this test on older IE, because the way the test runner catches
  // errors on IE plays badly with the simulated errors in the test.
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(11)) {
    return;
  }

  // Modules will throw an exception if this boolean is set to true.
  modA1Loaded = true;

  return new goog
      .Promise(function(resolve, reject) {
        const errorHandler = function() {
          try {
            assertNotLoaded('modA');
          } catch (e) {
            reject(e);
          }
          resolve();
        };
        moduleManager.registerCallback(
            goog.module.ModuleManager.CallbackType.ERROR, errorHandler);

        moduleManager.execOnLoad(
            'modA', function() { fail('modA should not load successfully'); });
      })
      .then(function() {
        assertEquals(
            'EVALUATE_CODE', 3,
            observer.getEvents(EventType.EVALUATE_CODE).length);
        assertUndefined(observer.getEvents(EventType.EVALUATE_CODE)[0].error);

        assertEquals(
            'REQUEST_SUCCESS', 3,
            observer.getEvents(EventType.REQUEST_SUCCESS).length);
        assertUndefined(observer.getEvents(EventType.REQUEST_SUCCESS)[0].error);

        const requestErrors = observer.getEvents(EventType.REQUEST_ERROR);
        assertEquals('REQUEST_ERROR', 3, requestErrors.length);
        const requestError = requestErrors[0];
        assertNotNull(requestError.error);
        const expectedString = 'loaded twice';
        const messageAndStack =
            requestErrors[0].error.message + requestErrors[0].error.stack;
        assertContains(expectedString, messageAndStack);
        assertNull(requestError.status);
      });
}

function testPrefetchThenLoadModuleA() {
  moduleManager.prefetchModule('modA');
  stubs.set(goog.net.BulkLoader.prototype, 'load', function() {
    fail('modA should not be reloaded');
  });

  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modA', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertEquals(
            'REQUEST_SUCCESS', 1,
            observer.getEvents(EventType.REQUEST_SUCCESS).length);
        assertArrayEquals(
            ['modA'],
            observer.getEvents(EventType.REQUEST_SUCCESS)[0].moduleIds);
        assertEquals(
            'REQUEST_ERROR', 0,
            observer.getEvents(EventType.REQUEST_ERROR).length);
      });
}

function testPrefetchThenLoadModuleB() {
  moduleManager.prefetchModule('modB');
  stubs.set(goog.net.BulkLoader.prototype, 'load', function() {
    fail('modA and modB should not be reloaded');
  });

  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modB', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertLoaded('modB');
        assertEquals(
            'REQUEST_SUCCESS', 2,
            observer.getEvents(EventType.REQUEST_SUCCESS).length);
        assertArrayEquals(
            ['modA'],
            observer.getEvents(EventType.REQUEST_SUCCESS)[0].moduleIds);
        assertArrayEquals(
            ['modB'],
            observer.getEvents(EventType.REQUEST_SUCCESS)[1].moduleIds);
        assertEquals(
            'REQUEST_ERROR', 0,
            observer.getEvents(EventType.REQUEST_ERROR).length);
      });
}

function testPrefetchModuleAThenLoadModuleB() {
  moduleManager.prefetchModule('modA');

  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modB', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertLoaded('modB');
        assertEquals(
            'REQUEST_SUCCESS', 2,
            observer.getEvents(EventType.REQUEST_SUCCESS).length);
        assertArrayEquals(
            ['modA'],
            observer.getEvents(EventType.REQUEST_SUCCESS)[0].moduleIds);
        assertArrayEquals(
            ['modB'],
            observer.getEvents(EventType.REQUEST_SUCCESS)[1].moduleIds);
        assertEquals(
            'REQUEST_ERROR', 0,
            observer.getEvents(EventType.REQUEST_ERROR).length);
      });
}

function testLoadModuleBThenPrefetchModuleA() {
  return new goog
      .Promise(function(resolve, reject) {
        moduleManager.execOnLoad('modB', resolve);
      })
      .then(function() {
        assertLoaded('modA');
        assertLoaded('modB');
        assertEquals(
            'REQUEST_SUCCESS', 2,
            observer.getEvents(EventType.REQUEST_SUCCESS).length);
        assertArrayEquals(
            ['modA'],
            observer.getEvents(EventType.REQUEST_SUCCESS)[0].moduleIds);
        assertArrayEquals(
            ['modB'],
            observer.getEvents(EventType.REQUEST_SUCCESS)[1].moduleIds);
        assertEquals(
            'REQUEST_ERROR', 0,
            observer.getEvents(EventType.REQUEST_ERROR).length);
        assertThrows('Module load already requested: modB', function() {
          moduleManager.prefetchModule('modA');
        });
      });
}

function testPrefetchModuleWithBatchModeEnabled() {
  moduleManager.setBatchModeEnabled(true);
  assertThrows(
      'Modules prefetching is not supported in batch mode',
      function() { moduleManager.prefetchModule('modA'); });
}

function testLoadErrorCallbackExecutedWhenPrefetchFails() {
  // Make all XHRs throw an error, so that we test the error-handling
  // functionality.
  const oldXmlHttp = goog.net.XmlHttp;
  stubs.set(goog.net, 'XmlHttp', function() {
    return {open: goog.functions.error('mock error'), abort: goog.nullFunction};
  });
  goog.object.extend(goog.net.XmlHttp, oldXmlHttp);

  let errorCount = 0;
  const errorHandler = function() {
    errorCount++;
  };
  moduleManager.registerCallback(
      goog.module.ModuleManager.CallbackType.ERROR, errorHandler);

  moduleLoader.prefetchModule('modA', moduleManager.moduleInfoMap['modA']);
  moduleLoader.loadModules(['modA'], moduleManager.moduleInfoMap, function() {
    fail('modA should not load successfully');
  }, errorHandler);

  assertEquals(1, errorCount);
}

function assertLoaded(id) {
  assertTrue(moduleManager.getModuleInfo(id).isLoaded());
}

function assertNotLoaded(id) {
  assertFalse(moduleManager.getModuleInfo(id).isLoaded());
}
