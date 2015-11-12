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

/**
 * @fileoverview A polyfill for window.requestAnimationFrame and
 * window.cancelAnimationFrame.
 * Code based on https://gist.github.com/paulirish/1579671
 */

goog.provide('goog.dom.animationFrame.polyfill');


/**
 * @define {boolean} If true, will install the requestAnimationFrame polyfill.
 */
goog.define('goog.dom.animationFrame.polyfill.ENABLED', true);


/**
 * Installs the requestAnimationFrame (and cancelAnimationFrame) polyfill.
 */
goog.dom.animationFrame.polyfill.install = function() {
  if (goog.dom.animationFrame.polyfill.ENABLED) {
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var i = 0, v; v = vendors[i] && !window.requestAnimationFrame; ++i) {
      window.requestAnimationFrame = window[v + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[v + 'CancelAnimationFrame'] ||
          window[v + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      var lastTime = 0;
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        lastTime = currTime + timeToCall;
        return window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
      };

      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
      }
    }
  }
};
