// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview A content-aware textarea control that grows and shrinks
 * automatically. This implementation extends {@link goog.ui.Control}.
 * This code is inspired by Dojo Dijit's Textarea implementation with
 * modifications to support native (when available) textarea resizing and
 * minHeight and maxHeight enforcement.
 *
*
 * @see ../demos/textarea.html
 */

goog.provide('goog.ui.Textarea');

goog.require('goog.Timer');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.style');
goog.require('goog.ui.Control');
goog.require('goog.ui.TextareaRenderer');
goog.require('goog.userAgent');
goog.require('goog.userAgent.product');


/**
 * A textarea control to handle growing/shrinking with textarea.value.
 *
 * @param {string} content Text to set as the textarea's value.
 * @param {goog.ui.TextareaRenderer=} opt_renderer Renderer used to render or
 *     decorate the textarea. Defaults to {@link goog.ui.TextareaRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM hepler, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.Control}
 */
goog.ui.Textarea = function(content, opt_renderer, opt_domHelper) {
  goog.ui.Control.call(this, content, opt_renderer ||
      goog.ui.TextareaRenderer.getInstance(), opt_domHelper);

  this.setHandleMouseEvents(false);
  this.setAllowTextSelection(true);
  if (!content) {
    this.setContentInternal('');
  }
};
goog.inherits(goog.ui.Textarea, goog.ui.Control);


/**
 * When the UA is <= IE7 we need to lose padding & border in getHeight_.
 * This is because -ms-box-sizing (which we set) didn't work until IE8.
 * @type {boolean}
 * @private
 */
goog.ui.Textarea.NEEDS_PADDING_FIX_ = goog.userAgent.IE &&
    !goog.userAgent.isVersion('8') && goog.dom.isCss1CompatMode();


/**
 * Some UAs will shrink the textarea automatically, some won't.
 * @type {boolean}
 * @private
 */
goog.ui.Textarea.NEEDS_HELP_SHRINKING_ = goog.userAgent.GECKO ||
    goog.userAgent.WEBKIT;


/**
 * True if the resizing function is executing, false otherwise.
 * @type {boolean}
 * @private
 */
goog.ui.Textarea.prototype.isResizing_ = false;


/**
 * The height of the textarea as last measured.
 * @type {number}
 * @private
 */
goog.ui.Textarea.prototype.height_ = 0;


/**
 * A maximum height for the textarea. When set to 0, the default, there is no
 * enforcement of this value during resize.
 * @type {number}
 * @private
 */
goog.ui.Textarea.prototype.maxHeight_ = 0;


/**
 * A minimum height for the textarea. When set to 0, the default, there is no
 * enforcement of this value during resize.
 * @type {number}
 * @private
 */
goog.ui.Textarea.prototype.minHeight_ = 0;



/**
 * Whether or not scrollHeight behavior has been discovered.
 * @type {boolean}
 * @private
 */
goog.ui.Textarea.prototype.hasDiscoveredScrollHeightBehavior_ = false;


/**
 * Whether or not scrollHeight of a textarea includes the padding box.
 * @type {boolean}
 * @private
 */
goog.ui.Textarea.prototype.scrollHeightIncludesPadding_ = false;


/**
 * Whether or not scrollHeight of a textarea includes the border box.
 * @type {boolean}
 * @private
 */
goog.ui.Textarea.prototype.scrollHeightIncludesBorder_ = false;


/**
 * @return {number} The minHeight value.
 */
goog.ui.Textarea.prototype.getMinHeight = function() {
  return this.minHeight_;
};


/**
 * @return {number} The minHeight value with a potential padding fix.
 * @private
 */
goog.ui.Textarea.prototype.getMinHeight_ = function() {
  var minHeight = this.minHeight_;
  var textarea = this.getElement();
  if (minHeight && textarea && goog.ui.Textarea.NEEDS_PADDING_FIX_) {
    var paddingBox = goog.style.getPaddingBox(textarea);
    var borderBox = goog.style.getBorderBox(textarea);
    var paddingBorderBoxHeight = paddingBox.top + paddingBox.bottom +
        borderBox.top + borderBox.bottom;
    minHeight -= paddingBorderBoxHeight;
  }
  return minHeight;
};


/**
 * Sets a minimum height for the textarea, and calls resize if rendered.
 * @param {number} height New minHeight value.
 */
goog.ui.Textarea.prototype.setMinHeight = function(height) {
  this.minHeight_ = height;
  this.resize();
};


/**
 * @return {number} The maxHeight value.
 */
goog.ui.Textarea.prototype.getMaxHeight = function() {
  return this.maxHeight_;
};


/**
 * @return {number} The maxHeight value with a potential padding fix.
 * @private
 */
goog.ui.Textarea.prototype.getMaxHeight_ = function() {
  var maxHeight = this.maxHeight_;
  var textarea = this.getElement();
  if (maxHeight && textarea && goog.ui.Textarea.NEEDS_PADDING_FIX_) {
    var paddingBox = goog.style.getPaddingBox(textarea);
    var borderBox = goog.style.getBorderBox(textarea);
    var paddingBorderBoxHeight = paddingBox.top + paddingBox.bottom +
        borderBox.top + borderBox.bottom;
    maxHeight -= paddingBorderBoxHeight;
  }
  return maxHeight;
};


/**
 * Sets a minimum height for the textarea, and calls resize if rendered.
 * @param {number} height New maxHeight value.
 */
goog.ui.Textarea.prototype.setMaxHeight = function(height) {
  this.maxHeight_ = height;
  this.resize();
};


/**
 * Sets the textarea's value.
 * @param {*} value The value property for the textarea, will be cast to a
 *     string by the browser when setting textarea.value.
 */
goog.ui.Textarea.prototype.setValue = function(value) {
  this.setContent(/** @type {goog.ui.ControlContent} */ (value));
};


/**
 * Gets the textarea's value.
 * @return {string} value The value of the textarea.
 */
goog.ui.Textarea.prototype.getValue = function() {
  return this.getElement().value;
};


/** @inheritDoc */
goog.ui.Textarea.prototype.setContent = function(content) {
  goog.ui.Textarea.superClass_.setContent.call(this, content);
  this.resize();
};


/** @inheritDoc **/
goog.ui.Textarea.prototype.setEnabled = function(enable) {
  goog.ui.Textarea.superClass_.setEnabled.call(this, enable);
  this.getElement().disabled = !enable;
};


/**
 * Resizes the textarea vertically.
 */
goog.ui.Textarea.prototype.resize = function() {
  if (this.getElement()) {
    this.grow_();
  }
};


/** @inheritDoc **/
goog.ui.Textarea.prototype.enterDocument = function() {
  var textarea = this.getElement();

  // Eliminates the vertical scrollbar and changes the box-sizing mode for the
  // textarea to the border-box (aka quirksmode) paradigm.
  goog.style.setStyle(textarea, {
    'overflowY': 'hidden',
    'overflowX': 'auto',
    'boxSizing': 'border-box',
    'MsBoxSizing': 'border-box',
    'WebkitBoxSizing': 'border-box',
    'MozBoxSizing': 'border-box'});

  this.getHandler().
      listen(textarea, goog.events.EventType.SCROLL, this.grow_).
      listen(textarea, goog.events.EventType.FOCUS, this.grow_).
      listen(textarea, goog.events.EventType.KEYUP, this.grow_).
      listen(textarea, goog.events.EventType.MOUSEUP, this.mouseUpListener_);

  this.resize();
};


/**
 * Gets the textarea's content height + padding height + border height.
 * This is done by getting the scrollHeight and adjusting from there.
 * In the end this result is what we want the new offsetHeight to equal.
 * @return {number} The height of the textarea.
 * @private
 */
goog.ui.Textarea.prototype.getHeight_ = function() {
  this.discoverScrollHeightBehavior_();
  var textarea = this.getElement();
  // Accounts for a possible (though unlikely) horizontal scrollbar.
  var height = this.getElement().scrollHeight +
      this.getHorizontalScrollBarHeight_();
  if (goog.ui.Textarea.NEEDS_PADDING_FIX_) {
    var paddingBox = goog.style.getPaddingBox(textarea);
    var borderBox = goog.style.getBorderBox(textarea);
    var paddingBorderBoxHeight = paddingBox.top + paddingBox.bottom +
        borderBox.top + borderBox.bottom;
    height -= paddingBorderBoxHeight;
  } else {
    if (!this.scrollHeightIncludesPadding_) {
      var paddingBox = goog.style.getPaddingBox(textarea);
      var paddingBoxHeight = paddingBox.top + paddingBox.bottom;
      height += paddingBoxHeight;
    }
    if (!this.scrollHeightIncludesBorder_) {
      var borderBox = goog.style.getBorderBox(textarea);
      var borderBoxHeight = borderBox.top + borderBox.bottom;
      height += borderBoxHeight;
    }
  }
  return height;
};


/**
 * Sets the textarea's height.
 * @param {number} height The height to set.
 * @private
 */
goog.ui.Textarea.prototype.setHeight_ = function(height) {
  if (this.height_ != height) {
    this.height_ = height;
    this.getElement().style.height = height + 'px';
  }
};


/**
 * Sets the textarea's rows attribute to be the number of newlines + 1.
 * This is necessary when the textarea is hidden, in which case scrollHeight
 * is not available.
 * @private
 */
goog.ui.Textarea.prototype.setHeightToEstimate_ = function() {
  var textarea = this.getElement();
  textarea.style.height = 'auto';
  var newlines = textarea.value.match(/\n/g) || [];
  textarea.rows = newlines.length + 1;
};


/**
 * Gets the the height of (possibly present) horizontal scrollbar.
 * @return {number} The height of the horizontal scrollbar.
 * @private
 */
goog.ui.Textarea.prototype.getHorizontalScrollBarHeight_ =
    function() {
  var textarea = this.getElement();
  var height = textarea.offsetHeight - textarea.clientHeight;
  if (!this.scrollHeightIncludesPadding_) {
    var paddingBox = goog.style.getPaddingBox(textarea);
    var paddingBoxHeight = paddingBox.top + paddingBox.bottom;
    height -= paddingBoxHeight;
  }
  if (!this.scrollHeightIncludesBorder_) {
    var borderBox = goog.style.getBorderBox(textarea);
    var borderBoxHeight = borderBox.top + borderBox.bottom;
    height -= borderBoxHeight;
  }
  // Prevent negative number results, which sometimes show up.
  return height > 0 ? height : 0;
};


/**
 * In order to assess the correct height for a textarea, we need to know
 * whether the scrollHeight (the full height of the text) property includes
 * the values for padding and borders. Instead of hardcoding a list of
 * currently known behaviors and testing for quirksmode, we do
 * a runtime check out of the flow. The performance impact should be very
 * small.
 * @private
 */
goog.ui.Textarea.prototype.discoverScrollHeightBehavior_ = function() {
  if (!this.hasDiscoveredScrollHeightBehavior_) {
    var textarea = /** @type {!Element} */ (this.getElement().cloneNode(false));
    // We need to overwrite/write box model specific styles that might
    // affect height.
    goog.style.setStyle(textarea, {
      'position': 'absolute',
      'height': 'auto',
      'top': '-9999px',
      'margin': '0',
      'padding': '1px',
      'border': '1px solid #000',
      'overflow': 'hidden'
    });
    goog.dom.appendChild(this.getDomHelper().getDocument().body, textarea);
    var initialScrollHeight = textarea.scrollHeight;

    textarea.style.padding = '10px';
    var paddingScrollHeight = textarea.scrollHeight;
    this.scrollHeightIncludesPadding_ = paddingScrollHeight >
        initialScrollHeight;

    initialScrollHeight = paddingScrollHeight;
    textarea.style.borderWidth = '10px';
    var borderScrollHeight = textarea.scrollHeight;
    this.scrollHeightIncludesBorder_ = borderScrollHeight > initialScrollHeight;

    goog.dom.removeNode(textarea);
    this.hasDiscoveredScrollHeightBehavior_ = true;
  }
};


/**
 * Resizes the textarea to grow/shrink to match its contents.
 * @param {goog.events.Event=} opt_e The browser event.
 * @private
 */
goog.ui.Textarea.prototype.grow_ = function(opt_e) {
  if (this.isResizing_) {
    return;
  }
  var shouldCallShrink = false;
  this.isResizing_ = true;
  var textarea = this.getElement();
  if (textarea.scrollHeight) {
    var setMinHeight = false;
    var setMaxHeight = false;
    var newHeight = this.getHeight_();
    var currentHeight = textarea.offsetHeight;
    var minHeight = this.getMinHeight_();
    var maxHeight = this.getMaxHeight_();
    if (minHeight && newHeight < minHeight) {
      this.setHeight_(minHeight);
      setMinHeight = true;
    } else if (maxHeight && newHeight > maxHeight) {
      this.setHeight_(maxHeight);
      // If the content is greater than the height, we'll want the vertical
      // scrollbar back.
      textarea.style.overflowY = '';
      setMaxHeight = true;
    } else if (currentHeight != newHeight) {
      this.setHeight_(newHeight);
    // Makes sure that height_ is at least set.
    } else if (!this.height_) {
      this.height_ = newHeight;
    }
    if (!setMinHeight && !setMaxHeight &&
        goog.ui.Textarea.NEEDS_HELP_SHRINKING_) {
      shouldCallShrink = true;
    }
  } else {
    this.setHeightToEstimate_();
  }
  this.isResizing_ = false;

  if (shouldCallShrink) {
    this.shrink_();
  }
};


/**
 * Resizes the texarea to shrink to fit its contents. The way this works is
 * by increasing the padding of the textarea by 1px (it's important here that
 * we're in box-sizing: border-box mode). If the size of the textarea grows,
 * then the box is filled up to the padding box with text.
 * If it doesn't change, then we can shrink.
 * @private
 */
goog.ui.Textarea.prototype.shrink_ = function() {
  var textarea = this.getElement();
  if (!this.isResizing_) {
    this.isResizing_ = true;
    var isEmpty = false;
    if (!textarea.value) {
      // Prevents height from becoming 0.
      textarea.value = ' ';
      isEmpty = true;
    }
    var scrollHeight = textarea.scrollHeight;
    if (!scrollHeight) {
      this.setHeightToEstimate_();
    } else {
      var currentHeight = this.getHeight_();
      var minHeight = this.getMinHeight_();
      var maxHeight = this.getMaxHeight_();
      if (!(minHeight && currentHeight <= minHeight) &&
          !(maxHeight && currentHeight >= maxHeight)) {
        // Nudge the padding by 1px.
        var paddingBox = goog.style.getPaddingBox(textarea);
        textarea.style.paddingBottom = paddingBox.bottom + 1 + 'px';
        var heightAfterNudge = this.getHeight_();
        // If the one px of padding had no effect, then we can shrink.
        if (heightAfterNudge == currentHeight) {
          textarea.style.paddingBottom = paddingBox.bottom + scrollHeight +
              'px';
          textarea.scrollTop = 0;
          var shrinkToHeight = this.getHeight_() - scrollHeight;
          if (shrinkToHeight >= minHeight) {
            this.setHeight_(shrinkToHeight);
          } else {
            this.setHeight_(minHeight);
          }
        }
        textarea.style.paddingBottom = paddingBox.bottom + 'px';
      }
    }
    if (isEmpty) {
      textarea.value = '';
    }
    this.isResizing_ = false;
  }
};


/**
 * We use this listener to check if the textarea has been natively resized
 * and if so we reset minHeight so that we don't ever shrink smaller than
 * the user's manually set height.
 * @param {goog.events.BrowserEvent} e The mousedown event.
 * @private
 */
goog.ui.Textarea.prototype.mouseUpListener_ = function(e) {
  var textarea = this.getElement();
  var height = textarea.offsetHeight;
  if (goog.ui.Textarea.NEEDS_PADDING_FIX_) {
    var paddingBox = goog.style.getPaddingBox(textarea);
    var borderBox = goog.style.getBorderBox(textarea);
    var paddingBorderBoxHeight = paddingBox.top + paddingBox.bottom +
        borderBox.top + borderBox.bottom;
    height -= paddingBorderBoxHeight;
  }

  if (height != this.height_) {
    this.minHeight_ = height;
    this.height_ = height;
  }
};
