// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview A viewport size monitor that buffers RESIZE events until the
 * window size has stopped changing, within a specified period of time.  For
 * every RESIZE event dispatched, this will dispatch up to two *additional*
 * events:
 * - {@link #EventType.RESIZE_WIDTH} if the viewport's width has changed since
 *   the last buffered dispatch.
 * - {@link #EventType.RESIZE_HEIGHT} if the viewport's height has changed since
 *   the last buffered dispatch.
 * You likely only need to listen to one of the three events.  But if you need
 * more, just be cautious of duplicating effort.
 *
 */

goog.provide('goog.dom.BufferedViewportSizeMonitor');

goog.require('goog.async.Delay');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');
goog.require('goog.math.Size');



/**
 * Creates a new BufferedViewportSizeMonitor.
 * @param {!goog.dom.ViewportSizeMonitor} viewportSizeMonitor The
 *     underlying viewport size monitor.
 * @param {number=} opt_bufferMs The buffer time, in ms. If not specified, this
 *     value defaults to {@link #RESIZE_EVENT_DELAY_MS_}.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
goog.dom.BufferedViewportSizeMonitor = function(
    viewportSizeMonitor, opt_bufferMs) {
  goog.base(this);

  /**
   * The underlying viewport size monitor.
   * @type {goog.dom.ViewportSizeMonitor}
   * @private
   */
  this.viewportSizeMonitor_ = viewportSizeMonitor;

  /**
   * The current size of the viewport.
   * @type {goog.math.Size}
   * @private
   */
  this.currentSize_ = this.viewportSizeMonitor_.getSize();

  /**
   * The previously recorded size of the viewport.
   * @type {goog.math.Size}
   * @private
   */
  this.previousSize_ = this.currentSize_;

  /**
   * The resize buffer time in ms.
   * @type {number}
   * @private
   */
  this.resizeBufferMs_ = opt_bufferMs ||
      goog.dom.BufferedViewportSizeMonitor.RESIZE_EVENT_DELAY_MS_;

  goog.events.listen(
      this.viewportSizeMonitor_,
      goog.events.EventType.RESIZE,
      this.handleResize_,
      false /* opt_capture */,
      this);
};
goog.inherits(goog.dom.BufferedViewportSizeMonitor, goog.events.EventTarget);


/**
 * Additional events to dispatch.
 * @enum {string}
 */
goog.dom.BufferedViewportSizeMonitor.EventType = {
  RESIZE_HEIGHT: goog.events.getUniqueId('rh'),
  RESIZE_WIDTH: goog.events.getUniqueId('rw')
};


/**
 * Delay for the resize event.
 * @type {goog.async.Delay}
 * @private
 */
goog.dom.BufferedViewportSizeMonitor.prototype.resizeDelay_;


/**
 * Whether the monitoring has been paused.
 * @type {boolean}
 * @private
 */
goog.dom.BufferedViewportSizeMonitor.prototype.paused_;


/**
 * Default number of milliseconds to wait after a resize event to relayout the
 * page.
 * @type {number}
 * @const
 * @private
 */
goog.dom.BufferedViewportSizeMonitor.RESIZE_EVENT_DELAY_MS_ = 100;


/** @override */
goog.dom.BufferedViewportSizeMonitor.prototype.disposeInternal =
    function() {
  goog.events.unlisten(
      this.viewportSizeMonitor_,
      goog.events.EventType.RESIZE,
      this.handleResize_,
      false /* opt_capture */,
      this);
  goog.base(this, 'disposeInternal');
};


/**
 * Handles resize events on the underlying ViewportMonitor.
 * @param {goog.events.Event} e The resize event.
 * @private
 */
goog.dom.BufferedViewportSizeMonitor.prototype.handleResize_ =
    function(e) {
  if (!this.resizeDelay_) {
    this.resizeDelay_ = new goog.async.Delay(
        goog.bind(this.onWindowResize_, this, e), this.resizeBufferMs_);
    this.registerDisposable(this.resizeDelay_);
  }
  this.resizeDelay_.start();
};


/**
 * Window resize callback that determines whether to reflow the view contents.
 * @param {goog.events.Event} e The resize event.
 * @private
 */
goog.dom.BufferedViewportSizeMonitor.prototype.onWindowResize_ =
    function(e) {
  if (this.viewportSizeMonitor_.isDisposed()) {
    return;
  }
  var viewportSize = this.viewportSizeMonitor_.getSize();
  if (!this.paused_ &&
      !goog.math.Size.equals(viewportSize, this.currentSize_)) {
    if (!this.previousSize_ ||
        viewportSize.width != this.previousSize_.width) {
      this.dispatchEvent(
          goog.dom.BufferedViewportSizeMonitor.EventType.RESIZE_WIDTH);
    }
    if (!this.previousSize_ ||
        viewportSize.height != this.previousSize_.height) {
      this.dispatchEvent(
          goog.dom.BufferedViewportSizeMonitor.EventType.RESIZE_HEIGHT);
    }
    this.previousSize_ = this.currentSize_;
    this.currentSize_ = viewportSize;
    this.dispatchEvent(e);
  }
};


/**
 * Returns the current size of the viewport.
 * @return {goog.math.Size?} The current viewport size.
 */
goog.dom.BufferedViewportSizeMonitor.prototype.getSize = function() {
  return this.currentSize_ ? this.currentSize_.clone() : null;
};


/**
 * Returns the previous size of the viewport.
 * @return {goog.math.Size?} The previous size of the viewport on the last
 *     RESIZE event.
 */
goog.dom.BufferedViewportSizeMonitor.prototype.getPreviousSize = function() {
  return this.previousSize_ ? this.previousSize_.clone() : null;
};


/**
 * Pauses and unpauses viewport size monitoring.
 * @param {boolean} paused True to pause.
 */
goog.dom.BufferedViewportSizeMonitor.prototype.setPaused = function(paused) {
  this.paused_ = paused;
};
