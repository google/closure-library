// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview The file contains enumerations for ARIA states
 * and properties as defined by W3C ARIA standard:
 * http://www.w3.org/TR/wai-aria/.
 */

goog.provide('goog.a11y.aria.LivePriority');
goog.provide('goog.a11y.aria.State');


/**
 * Enumeration of ARIA states and properties.
 * @enum {string}
 */
goog.a11y.aria.State = {
  // ARIA property for setting the currently active descendant of an element,
  // for example the selected item in a list box. Value: ID of an element.
  ACTIVEDESCENDANT: 'activedescendant',

  // ARIA property that, if true, indicates that all of a changed region should
  // be presented, instead of only parts. Value: one of {true, false}.
  ATOMIC: 'atomic',

  // ARIA property to specify that input completion is provided. Value:
  // one of {'inline', 'list', 'both', 'none'}.
  AUTOCOMPLETE: 'autocomplete',

  // ARIA state to indicate that an element and its subtree are being updated.
  // Value: one of {true, false}.
  BUSY: 'busy',

  // ARIA state for a checked item. Value: one of {'true', 'false', 'mixed',
  // undefined}.
  CHECKED: 'checked',

  // ARIA property that identifies the element or elements whose contents or
  // presence are controlled by this element.
  // Value: space-separated IDs of other elements.
  CONTROLS: 'controls',

  // ARIA property that identifies the element or elements that describe
  // this element. Value: space-separated IDs of other elements.
  DESCRIBEDBY: 'describedby',

  // ARIA state for a disabled item. Value: one of {true, false}.
  DISABLED: 'disabled',

  // ARIA property that indicates what functions can be performed when a
  // dragged object is released on the drop target.  Value: one of
  // {'copy', 'move', 'link', 'execute', 'popup', 'none'}.
  DROPEFFECT: 'dropeffect',

  // ARIA state for setting whether the element like a tree node is expanded.
  // Value: one of {true, false, undefined}.
  EXPANDED: 'expanded',

  // ARIA property that identifies the next element (or elements) in the
  // recommended reading order of content. Value: space-separated ids of
  // elements to flow to.
  FLOWTO: 'flowto',

  // ARIA state that indicates an element's "grabbed" state in drag-and-drop.
  // Value: one of {true, false, undefined}.
  GRABBED: 'grabbed',

  // ARIA property indicating whether the element has a popup.
  // Value: one of {true, false}.
  HASPOPUP: 'haspopup',

  // ARIA state indicating that the element is not visible or perceivable
  // to any user. Value: one of {true, false}.
  HIDDEN: 'hidden',

  // ARIA state indicating that the entered value does not conform. Value:
  // one of {false, true, 'grammar', 'spelling'}
  INVALID: 'invalid',

  // ARIA property that provides a label to override any other text, value, or
  // contents used to describe this element. Value: string.
  LABEL: 'label',

  // ARIA property for setting the element which labels another element.
  // Value: space-separated IDs of elements.
  LABELLEDBY: 'labelledby',

  // ARIA property for setting the level of an element in the hierarchy.
  // Value: integer.
  LEVEL: 'level',

  // ARIA property indicating that an element will be updated, and
  // describes the types of updates the user agents, assistive technologies,
  // and user can expect from the live region. Value: one of {'off', 'polite',
  // 'assertive'}.
  LIVE: 'live',

  // ARIA property indicating whether a text box can accept multiline input.
  // Value: one of {true, false}.
  MULTILINE: 'multiline',

  // ARIA property indicating if the user may select more than one item.
  // Value: one of {true, false}.
  MULTISELECTABLE: 'multiselectable',

  // ARIA property indicating if the element is horizontal or vertical.
  // Value: one of {'vertical', 'horizontal'}.
  ORIENTATION: 'orientation',

  // ARIA property creating a visual, functional, or contextual parent/child
  // relationship when the DOM hierarchy can't be used to represent it.
  // Value: Space-separated IDs of elements.
  OWNS: 'owns',

  // ARIA property that defines an element's number of position in a list.
  // Value: integer.
  POSINSET: 'posinset',

  // ARIA state for a pressed item.
  // Value: one of {true, false, undefined, 'mixed'}.
  PRESSED: 'pressed',

  // ARIA property indicating that an element is not editable.
  // Value: one of {true, false}.
  READONLY: 'readonly',

  // ARIA property indicating that change notifications within this subtree
  // of a live region should be announced. Value: one of {'additions',
  // 'removals', 'text', 'all', 'additions text'}.
  RELEVANT: 'relevant',

  // ARIA property indicating that user input is required on this element
  // before a form may be submitted. Value: one of {true, false}.
  REQUIRED: 'required',

  // ARIA state for setting the currently selected item in the list.
  // Value: one of {true, false, undefined}.
  SELECTED: 'selected',

  // ARIA property defining the number of items in a list. Value: integer.
  SETSIZE: 'setsize',

  // ARIA property indicating if items are sorted. Value: one of {'ascending',
  // 'descending', 'none', 'other'}.
  SORT: 'sort',

  // ARIA property for slider maximum value. Value: number.
  VALUEMAX: 'valuemax',

  // ARIA property for slider minimum value. Value: number.
  VALUEMIN: 'valuemin',

  // ARIA property for slider active value. Value: number.
  VALUENOW: 'valuenow',

  // ARIA property for slider active value represented as text.
  // Value: string.
  VALUETEXT: 'valuetext'
};


/**
 * Enumeration of ARIA state values for live regions.
 *
 * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-live
 * for more information.
 * @enum {string}
 */
goog.a11y.aria.LivePriority = {
  /**
   * Default value.  Used for live regions that should never be spoken.
   */
  OFF: 'off',
  /**
   * Spoke only when the user is idle.  Best option in most cases.
   */
  POLITE: 'polite',
  /**
   * Spoken as soon as possible, which means that the information has a
   * higher priority than normal, but does not necessarily interrupt
   * immediately.
   */
  ASSERTIVE: 'assertive'
};
