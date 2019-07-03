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

goog.provide('goog.events.EventTargetTest');
goog.setTestOnly('goog.events.EventTargetTest');

goog.require('goog.events.EventTarget');
goog.require('goog.events.Listenable');
goog.require('goog.events.eventTargetTester');
goog.require('goog.events.eventTargetTester.KeyType');
goog.require('goog.events.eventTargetTester.UnlistenReturnType');
goog.require('goog.testing.jsunit');

function setUp() {
  const newListenableFn = function() {
    return new goog.events.EventTarget();
  };
  const listenFn = function(src, type, listener, opt_capt, opt_handler) {
    return src.listen(type, listener, opt_capt, opt_handler);
  };
  const unlistenFn = function(src, type, listener, opt_capt, opt_handler) {
    return src.unlisten(type, listener, opt_capt, opt_handler);
  };
  const unlistenByKeyFn = function(src, key) {
    return src.unlistenByKey(key);
  };
  const listenOnceFn = function(src, type, listener, opt_capt, opt_handler) {
    return src.listenOnce(type, listener, opt_capt, opt_handler);
  };
  const dispatchEventFn = function(src, e) {
    return src.dispatchEvent(e);
  };
  const removeAllFn = function(src, opt_type, opt_capture) {
    return src.removeAllListeners(opt_type, opt_capture);
  };
  const getListenersFn = function(src, type, capture) {
    return src.getListeners(type, capture);
  };
  const getListenerFn = function(src, type, listener, capture, opt_handler) {
    return src.getListener(type, listener, capture, opt_handler);
  };
  const hasListenerFn = function(src, opt_type, opt_capture) {
    return src.hasListener(opt_type, opt_capture);
  };

  goog.events.eventTargetTester.setUp(
      newListenableFn, listenFn, unlistenFn, unlistenByKeyFn, listenOnceFn,
      dispatchEventFn, removeAllFn, getListenersFn, getListenerFn,
      hasListenerFn, goog.events.eventTargetTester.KeyType.NUMBER,
      goog.events.eventTargetTester.UnlistenReturnType.BOOLEAN, false);
}

function tearDown() {
  goog.events.eventTargetTester.tearDown();
}

function testRuntimeTypeIsCorrect() {
  const target = new goog.events.EventTarget();
  assertTrue(goog.events.Listenable.isImplementedBy(target));
}
