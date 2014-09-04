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

/**
 * @fileoverview Utilities to abstract mouse and touch events.
 */


goog.provide('goog.labs.events.touch');
goog.provide('goog.labs.events.touch.TouchData');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.events.EventType');
goog.require('goog.string');

goog.forwardDeclare('goog.events.BrowserEvent');


/**
 * Description the geometry and target of an event.
 *
 * @typedef {{
 *   clientX: number,
 *   clientY: number,
 *   screenX: number,
 *   screenY: number,
 *   target: EventTarget
 * }}
 */
goog.labs.events.touch.TouchData;


/**
 * Takes a mouse, touch, or other similar UI event and returns the relevent
 * geometry and target data.
 * @param {!Event|!goog.events.BrowserEvent} e A UI event.
 * @return {!goog.labs.events.touch.TouchData}
 */
goog.labs.events.touch.getTouchData = function(e) {

  var source = e;

  if (goog.string.startsWith(e.type, 'touch')) {
    goog.asserts.assert(
        goog.array.contains([
          goog.events.EventType.TOUCHCANCEL,
          goog.events.EventType.TOUCHEND,
          goog.events.EventType.TOUCHMOVE,
          goog.events.EventType.TOUCHSTART
        ], e.type),
        'Touch event not of valid type.');

    // If the event is end or cancel, take the first changed touch,
    // otherwise the first target touch.
    source = (e.type == goog.events.EventType.TOUCHEND ||
              e.type == goog.events.EventType.TOUCHCANCEL) ?
             e.changedTouches[0] : e.targetTouches[0];
  }

  // Duck typing -- we expect the event to be a UI or touch event that
  // exports the following properties.
  if (goog.DEBUG) {
    goog.array.forEach(
        ['clientX', 'clientY', 'screenX', 'screenY', 'target'],
        function(prop) {
          goog.asserts.assert(
              goog.isDef(source[prop]),
              'Property should be defined in source object: ' + prop);
        });
  }

  return {
    clientX: source['clientX'],
    clientY: source['clientY'],
    screenX: source['screenX'],
    screenY: source['screenY'],
    target: source['target']
  };
};
