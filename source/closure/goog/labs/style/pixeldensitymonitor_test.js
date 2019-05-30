// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

/** @fileoverview Tests for PixelDensityMonitor. */

goog.module('goog.labs.style.PixelDensityMonitorTest');
goog.setTestOnly();

const DomHelper = goog.require('goog.dom.DomHelper');
const MockControl = goog.require('goog.testing.MockControl');
const PixelDensityMonitor = goog.require('goog.labs.style.PixelDensityMonitor');
const events = goog.require('goog.events');
const googArray = goog.require('goog.array');
const testSuite = goog.require('goog.testing.testSuite');
const testingRecordFunction = goog.require('goog.testing.recordFunction');

let fakeWindow;
let recordFunction;
let monitor;
let mockControl;
let mediaQueryLists;

function setUpMonitor(initialRatio, hasMatchMedia) {
  fakeWindow = {devicePixelRatio: initialRatio};

  if (hasMatchMedia) {
    // Every call to matchMedia should return a new media query list with its
    // own set of listeners.
    fakeWindow.matchMedia = (query) => {
      const listeners = [];
      const newList = {
        addListener: function(listener) {
          listeners.push(listener);
        },
        removeListener: function(listener) {
          googArray.remove(listeners, listener);
        },
        callListeners: function() {
          for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
          }
        },
        getListenerCount: function() {
          return listeners.length;
        },
      };
      mediaQueryLists.push(newList);
      return newList;
    };
  }

  const domHelper = mockControl.createStrictMock(DomHelper);
  domHelper.getWindow().$returns(fakeWindow);
  mockControl.$replayAll();

  monitor = new PixelDensityMonitor(domHelper);
  events.listen(monitor, PixelDensityMonitor.EventType.CHANGE, recordFunction);
}

function setNewRatio(newRatio) {
  fakeWindow.devicePixelRatio = newRatio;
  for (let i = 0; i < mediaQueryLists.length; i++) {
    mediaQueryLists[i].callListeners();
  }
}

testSuite({
  setUp() {
    recordFunction = testingRecordFunction();
    mediaQueryLists = [];
    mockControl = new MockControl();
  },

  tearDown() {
    mockControl.$verifyAll();
    goog.dispose(monitor);
    goog.dispose(recordFunction);
  },

  testNormalDensity() {
    setUpMonitor(1, false);
    assertEquals(PixelDensityMonitor.Density.NORMAL, monitor.getDensity());
  },

  testHighDensity() {
    setUpMonitor(1.5, false);
    assertEquals(PixelDensityMonitor.Density.HIGH, monitor.getDensity());
  },

  testNormalDensityIfUndefined() {
    setUpMonitor(undefined, false);
    assertEquals(PixelDensityMonitor.Density.NORMAL, monitor.getDensity());
  },

  testChangeEvent() {
    setUpMonitor(1, true);
    assertEquals(PixelDensityMonitor.Density.NORMAL, monitor.getDensity());
    monitor.start();

    setNewRatio(2);
    let call = recordFunction.popLastCall();
    assertEquals(
        PixelDensityMonitor.Density.HIGH,
        call.getArgument(0).target.getDensity());
    assertEquals(PixelDensityMonitor.Density.HIGH, monitor.getDensity());

    setNewRatio(1);
    call = recordFunction.popLastCall();
    assertEquals(
        PixelDensityMonitor.Density.NORMAL,
        call.getArgument(0).target.getDensity());
    assertEquals(PixelDensityMonitor.Density.NORMAL, monitor.getDensity());
  },

  testListenerIsDisposed() {
    setUpMonitor(1, true);
    monitor.start();

    assertEquals(1, mediaQueryLists.length);
    assertEquals(1, mediaQueryLists[0].getListenerCount());

    goog.dispose(monitor);

    assertEquals(1, mediaQueryLists.length);
    assertEquals(0, mediaQueryLists[0].getListenerCount());
  },
});
