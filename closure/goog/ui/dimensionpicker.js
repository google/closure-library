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

/**
 * @fileoverview A dimension picker control.  A dimension picker allows the
 * user to visually select a row and column count.
 *
 * @author robbyw@google.com (Robby Walker)
 * @see ../demos/dimensionpicker.html
 * @see ../demos/dimensionpicker_rtl.html
 */

goog.provide('goog.ui.DimensionPicker');

goog.require('goog.events.BrowserEvent.PointerType');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.math.Size');
goog.require('goog.ui.Component');
goog.require('goog.ui.ComponentUtil');
goog.require('goog.ui.Control');
goog.require('goog.ui.DimensionPickerRenderer');
goog.require('goog.ui.registry');



/**
 * A dimension picker allows the user to visually select a row and column
 * count using their mouse and keyboard.
 *
 * The currently selected dimension is controlled by an ACTION event.  Event
 * listeners may retrieve the selected item using the
 * {@link #getValue} method.
 *
 * @param {goog.ui.DimensionPickerRenderer=} opt_renderer Renderer used to
 *     render or decorate the palette; defaults to
 *     {@link goog.ui.DimensionPickerRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.Control}
 * @final
 */
goog.ui.DimensionPicker = function(opt_renderer, opt_domHelper) {
  goog.ui.Control.call(
      this, null, opt_renderer || goog.ui.DimensionPickerRenderer.getInstance(),
      opt_domHelper);

  this.size_ = new goog.math.Size(this.minColumns, this.minRows);
};
goog.inherits(goog.ui.DimensionPicker, goog.ui.Control);


/**
 * Minimum number of columns to show in the grid.
 * @type {number}
 */
goog.ui.DimensionPicker.prototype.minColumns = 5;


/**
 * Minimum number of rows to show in the grid.
 * @type {number}
 */
goog.ui.DimensionPicker.prototype.minRows = 5;


/**
 * Maximum number of columns to show in the grid.
 * @type {number}
 */
goog.ui.DimensionPicker.prototype.maxColumns = 20;


/**
 * Maximum number of rows to show in the grid.
 * @type {number}
 */
goog.ui.DimensionPicker.prototype.maxRows = 20;


/**
 * Palette dimensions (columns x rows).
 * @type {goog.math.Size}
 * @private
 */
goog.ui.DimensionPicker.prototype.size_;


/**
 * Currently highlighted row count.
 * @type {number}
 * @private
 */
goog.ui.DimensionPicker.prototype.highlightedRows_ = 1;


/**
 * Currently highlighted column count.
 * @type {number}
 * @private
 */
goog.ui.DimensionPicker.prototype.highlightedColumns_ = 1;


/** @override */
goog.ui.DimensionPicker.prototype.enterDocument = function() {
  goog.ui.DimensionPicker.superClass_.enterDocument.call(this);

  var MouseEventType = goog.ui.ComponentUtil.getMouseEventType(this);

  var handler = this.getHandler();
  handler
      .listen(
          this.getRenderer().getMouseMoveElement(this),
          MouseEventType.MOUSEMOVE, this.handleMouseMove)
      .listen(
          this.getDomHelper().getWindow(), goog.events.EventType.RESIZE,
          this.handleWindowResize);

  var parent = this.getParent();
  if (parent) {
    handler.listen(parent, goog.ui.Component.EventType.SHOW, this.handleShow_);
  }
};


/** @override */
goog.ui.DimensionPicker.prototype.exitDocument = function() {
  goog.ui.DimensionPicker.superClass_.exitDocument.call(this);

  var MouseEventType = goog.ui.ComponentUtil.getMouseEventType(this);

  var handler = this.getHandler();
  handler
      .unlisten(
          this.getRenderer().getMouseMoveElement(this),
          MouseEventType.MOUSEMOVE, this.handleMouseMove)
      .unlisten(
          this.getDomHelper().getWindow(), goog.events.EventType.RESIZE,
          this.handleWindowResize);

  var parent = this.getParent();
  if (parent) {
    handler.unlisten(
        parent, goog.ui.Component.EventType.SHOW, this.handleShow_);
  }
};


/**
 * Resets the highlighted size when the picker is shown.
 * @private
 */
goog.ui.DimensionPicker.prototype.handleShow_ = function() {
  if (this.isVisible()) {
    this.setValue(1, 1);
  }
};


/** @override */
goog.ui.DimensionPicker.prototype.disposeInternal = function() {
  goog.ui.DimensionPicker.superClass_.disposeInternal.call(this);
  delete this.size_;
};


// Palette event handling.


/**
 * Handles mousemove events. Determines which palette size was moused over and
 * highlights it.
 * @param {goog.events.BrowserEvent} e Mouse event to handle.
 * @protected
 */
goog.ui.DimensionPicker.prototype.handleMouseMove = function(e) {
  var highlightedSizeX = this.getRenderer().getGridOffsetX(
      this, this.isRightToLeft() ?
          /** @type {!HTMLElement} */ (e.target).offsetWidth - e.offsetX :
          e.offsetX);
  var highlightedSizeY = this.getRenderer().getGridOffsetY(this, e.offsetY);

  this.setValue(highlightedSizeX, highlightedSizeY);
};


/**
 * Override `handleMouseDown` for pointer events.
 * @override
 */
goog.ui.DimensionPicker.prototype.handleMouseDown = function(e) {
  // For touch events, check for intersection with the grid element to prevent
  // taps on the invisible mouse catcher element from performing an action.
  if (goog.ui.DimensionPicker.isTouchEvent_(e) && !this.isEventOnGrid_(e)) {
    return;
  }

  goog.ui.DimensionPicker.base(this, 'handleMouseDown', e);

  // For touch events, delegate to `handleMouseMove` to update the highlight
  // state immediately. Not needed for mouse since we assume hover mousemove
  // events have already taken care of this.
  if (goog.ui.DimensionPicker.isTouchEvent_(e)) {
    this.handleMouseMove(/** @type {?goog.events.BrowserEvent} */ (e));
  }
};


/**
 * Override `handleMouseUp` for pointer events.
 * @override
 */
goog.ui.DimensionPicker.prototype.handleMouseUp = function(e) {
  // For touch events, check for intersection with the grid element to prevent
  // taps on the invisible mouse catcher element from performing an action.
  if (goog.ui.DimensionPicker.isTouchEvent_(e) && !this.isEventOnGrid_(e)) {
    return;
  }

  goog.ui.DimensionPicker.base(this, 'handleMouseUp', e);
};


/**
 * Handles window resize events.  Ensures no scrollbars are introduced by the
 * renderer's mouse catcher.
 * @param {goog.events.Event} e Resize event to handle.
 * @protected
 */
goog.ui.DimensionPicker.prototype.handleWindowResize = function(e) {
  this.getRenderer().positionMouseCatcher(this);
};


/**
 * Handle key events if supported, so the user can use the keyboard to
 * manipulate the highlighted rows and columns.
 * @param {goog.events.KeyEvent} e The key event object.
 * @return {boolean} Whether the key event was handled.
 * @override
 */
goog.ui.DimensionPicker.prototype.handleKeyEvent = function(e) {
  var rows = this.highlightedRows_;
  var columns = this.highlightedColumns_;
  switch (e.keyCode) {
    case goog.events.KeyCodes.DOWN:
      rows++;
      break;
    case goog.events.KeyCodes.UP:
      rows--;
      break;
    case goog.events.KeyCodes.LEFT:
      if (this.isRightToLeft()) {
        columns++;
      } else {
        if (columns == 1) {
          // Delegate to parent.
          return false;
        } else {
          columns--;
        }
      }
      break;
    case goog.events.KeyCodes.RIGHT:
      if (this.isRightToLeft()) {
        if (columns == 1) {
          // Delegate to parent.
          return false;
        } else {
          columns--;
        }
      } else {
        columns++;
      }
      break;
    default:
      return goog.ui.DimensionPicker.superClass_.handleKeyEvent.call(this, e);
  }
  this.setValue(columns, rows);
  return true;
};


// Palette management.


/**
 * @return {goog.math.Size} Current table size shown (columns x rows).
 */
goog.ui.DimensionPicker.prototype.getSize = function() {
  return this.size_;
};


/**
 * @return {!goog.math.Size} size The currently highlighted dimensions.
 */
goog.ui.DimensionPicker.prototype.getValue = function() {
  return new goog.math.Size(this.highlightedColumns_, this.highlightedRows_);
};


/**
 * Sets the currently highlighted dimensions. If the dimensions are not valid
 * (not between 1 and the maximum number of columns/rows to show), they will
 * be changed to the closest valid value.
 * @param {(number|!goog.math.Size)} columns The number of columns to highlight,
 *     or a goog.math.Size object containing both.
 * @param {number=} opt_rows The number of rows to highlight.  Can be
 *     omitted when columns is a good.math.Size object.
 */
goog.ui.DimensionPicker.prototype.setValue = function(columns, opt_rows) {
  if (!goog.isDef(opt_rows)) {
    columns = /** @type {!goog.math.Size} */ (columns);
    opt_rows = columns.height;
    columns = columns.width;
  } else {
    columns = /** @type {number} */ (columns);
  }

  // Ensure that the row and column values are within the minimum value (1) and
  // maxmimum values.
  columns = Math.max(1, columns);
  opt_rows = Math.max(1, opt_rows);
  columns = Math.min(this.maxColumns, columns);
  opt_rows = Math.min(this.maxRows, opt_rows);

  if (this.highlightedColumns_ != columns ||
      this.highlightedRows_ != opt_rows) {
    var renderer = this.getRenderer();
    // Show one more row/column than highlighted so the user understands the
    // palette can grow.
    this.size_.width =
        Math.max(Math.min(columns + 1, this.maxColumns), this.minColumns);
    this.size_.height =
        Math.max(Math.min(opt_rows + 1, this.maxRows), this.minRows);
    renderer.updateSize(this, this.getElement());

    this.highlightedColumns_ = columns;
    this.highlightedRows_ = opt_rows;
    renderer.setHighlightedSize(this, columns, opt_rows);
  }
};


/**
 * Returns whether the given event intersects the grid element.
 * @param {?goog.events.Event} e Mouse event to handle.
 * @return {boolean}
 * @private
 */
goog.ui.DimensionPicker.prototype.isEventOnGrid_ = function(e) {
  var gridEl = this.getRenderer().getMouseMoveElement(this);
  var gridBounds = gridEl.getBoundingClientRect();
  return e.clientX >= gridBounds.left && e.clientX <= gridBounds.right &&
      e.clientY >= gridBounds.top && e.clientY <= gridBounds.bottom;
};


/**
 * @param {?goog.events.Event} e Mouse or pointer event to handle.
 * @return {boolean}
 * @private
 */
goog.ui.DimensionPicker.isTouchEvent_ = function(e) {
  return e.pointerType &&
      e.pointerType != goog.events.BrowserEvent.PointerType.MOUSE;
};


/**
 * Register this control so it can be created from markup
 */
goog.ui.registry.setDecoratorByClassName(
    goog.ui.DimensionPickerRenderer.CSS_CLASS,
    function() { return new goog.ui.DimensionPicker(); });
