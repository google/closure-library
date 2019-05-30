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

goog.module('goog.labs.events.NonDisposableEventTargetTest');
goog.setTestOnly();

const KeyType = goog.require('goog.events.eventTargetTester.KeyType');
const Listenable = goog.require('goog.events.Listenable');
const NonDisposableEventTarget = goog.require('goog.labs.events.NonDisposableEventTarget');
const UnlistenReturnType = goog.require('goog.events.eventTargetTester.UnlistenReturnType');
const eventTargetTester = goog.require('goog.events.eventTargetTester');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  setUp() {
    const newListenableFn = () => new NonDisposableEventTarget();
    const listenFn = (src, type, listener, opt_capt, opt_handler) =>
        src.listen(type, listener, opt_capt, opt_handler);
    const unlistenFn = (src, type, listener, opt_capt, opt_handler) =>
        src.unlisten(type, listener, opt_capt, opt_handler);
    const unlistenByKeyFn = (src, key) => src.unlistenByKey(key);
    const listenOnceFn = (src, type, listener, opt_capt, opt_handler) =>
        src.listenOnce(type, listener, opt_capt, opt_handler);
    const dispatchEventFn = (src, e) => src.dispatchEvent(e);
    const removeAllFn = (src, opt_type, opt_capture) =>
        src.removeAllListeners(opt_type, opt_capture);
    const getListenersFn = (src, type, capture) =>
        src.getListeners(type, capture);
    const getListenerFn = (src, type, listener, capture, opt_handler) =>
        src.getListener(type, listener, capture, opt_handler);
    const hasListenerFn = (src, opt_type, opt_capture) =>
        src.hasListener(opt_type, opt_capture);

    eventTargetTester.setUp(
        newListenableFn, listenFn, unlistenFn, unlistenByKeyFn, listenOnceFn,
        dispatchEventFn, removeAllFn, getListenersFn, getListenerFn,
        hasListenerFn, KeyType.NUMBER, UnlistenReturnType.BOOLEAN, false);
  },

  tearDown() {
    eventTargetTester.tearDown();
  },

  testRuntimeTypeIsCorrect() {
    const target = new NonDisposableEventTarget();
    assertTrue(Listenable.isImplementedBy(target));
  },
});
