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

goog.module('goog.module.ModuleInfoTest');
goog.setTestOnly();

const BaseModule = goog.require('goog.module.BaseModule');
const MockClock = goog.require('goog.testing.MockClock');
const ModuleInfo = goog.require('goog.module.ModuleInfo');
const testSuite = goog.require('goog.testing.testSuite');

let mockClock;

class TestModule extends BaseModule {
  constructor() {
    super();
  }
}

testSuite({
  setUp() {
    mockClock = new MockClock(true);
  },

  tearDown() {
    mockClock.uninstall();
  },

  /** Test initial state of module info. */
  testNotLoadedAtStart() {
    const m = new ModuleInfo();
    assertFalse('Shouldn\'t be loaded', m.isLoaded());
  },

  /** Test loaded module info. */
  testOnLoad() {
    const m = new ModuleInfo();

    m.setModuleConstructor(TestModule);
    m.onLoad(goog.nullFunction);
    assertTrue(m.isLoaded());

    const module = m.getModule();
    assertNotNull(module);
    assertTrue(module instanceof TestModule);

    m.dispose();
    assertTrue(m.isDisposed());
    assertTrue(
        'Disposing of ModuleInfo should dispose of its module',
        module.isDisposed());
  },

  /** Test callbacks on module load. */
  testCallbacks() {
    const m = new ModuleInfo();
    m.setModuleConstructor(TestModule);
    let index = 0;
    let a = -1;
    let b = -1;
    let c = -1;
    let d = -1;

    const ca = m.registerCallback(() => {
      a = index++;
    });
    const cb = m.registerCallback(() => {
      b = index++;
    });
    const cc = m.registerCallback(() => {
      c = index++;
    });
    const cd = m.registerEarlyCallback(() => {
      d = index++;
    });
    cb.abort();
    m.onLoad(goog.nullFunction);

    assertTrue('callback A should have fired', a >= 0);
    assertFalse('callback B should have been aborted', b >= 0);
    assertTrue('callback C should have fired', c >= 0);
    assertTrue('early callback d should have fired', d >= 0);

    assertEquals('ordering of callbacks was wrong', 0, d);
    assertEquals('ordering of callbacks was wrong', 1, a);
    assertEquals('ordering of callbacks was wrong', 2, c);
  },

  testErrorsInCallbacks() {
    const m = new ModuleInfo();
    m.setModuleConstructor(TestModule);
    m.registerCallback(() => {
      throw new Error('boom1');
    });
    m.registerCallback(() => {
      throw new Error('boom2');
    });
    const hadError = m.onLoad(goog.nullFunction);
    assertTrue(hadError);

    const e = assertThrows(() => {
      mockClock.tick();
    });

    assertEquals('boom1', e.message);
  },

  /** Tests the error callbacks. */
  testErrbacks() {
    const m = new ModuleInfo();
    m.setModuleConstructor(TestModule);
    let index = 0;
    let a = -1;
    let b = -1;
    let c = -1;
    const d = -1;

    const ca = m.registerErrback(() => {
      a = index++;
    });
    const cb = m.registerErrback(() => {
      b = index++;
    });
    const cc = m.registerErrback(() => {
      c = index++;
    });
    m.onError('foo');

    assertTrue('callback A should have fired', a >= 0);
    assertTrue('callback B should have fired', b >= 0);
    assertTrue('callback C should have fired', c >= 0);

    assertEquals('ordering of callbacks was wrong', 0, a);
    assertEquals('ordering of callbacks was wrong', 1, b);
    assertEquals('ordering of callbacks was wrong', 2, c);
  },
});
