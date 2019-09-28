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

goog.module('goog.events.EventTargetW3CTest');
goog.setTestOnly();

const GoogEventTarget = goog.require('goog.events.EventTarget');
const eventTargetTester = goog.require('goog.events.eventTargetTester');
const testSuite = goog.require('goog.testing.testSuite');

const KeyType = eventTargetTester.KeyType;
const UnlistenReturnType = eventTargetTester.UnlistenReturnType;

testSuite(Object.assign(
    {
      setUp() {
        const newListenableFn = () => new GoogEventTarget();
        const listenFn = (src, type, listener, opt_capt, opt_handler) => {
          src.addEventListener(type, listener, opt_capt, opt_handler);
        };
        const unlistenFn = (src, type, listener, opt_capt, opt_handler) => {
          src.removeEventListener(type, listener, opt_capt, opt_handler);
        };
        const dispatchEventFn = (src, e) => src.dispatchEvent(e);

        eventTargetTester.setUp(
            newListenableFn, listenFn, unlistenFn, null /* unlistenByKeyFn */,
            null /* listenOnceFn */, dispatchEventFn, null /* removeAllFn */,
            null /* getListenersFn */, null /* getListenerFn */,
            null /* hasListenerFn */, KeyType.UNDEFINED,
            UnlistenReturnType.UNDEFINED, true);
      },

      tearDown() {
        eventTargetTester.tearDown();
      },
    },
    eventTargetTester.commonTests));
