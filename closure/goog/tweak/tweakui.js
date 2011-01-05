// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview A UI for editing tweak settings / clicking tweak actions.
 *
 * @author agrieve@google.com (Andrew Grieve)
 */

goog.provide('goog.tweak.EntriesPanel');
goog.provide('goog.tweak.TweakUi');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.dom.DomHelper');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.tweak');
goog.require('goog.ui.Zippy');



/**
 * A UI for editing tweak settings / clicking tweak actions.
 * @param {!goog.tweak.Registry} registry The registry to render.
 * @param {goog.dom.DomHelper=} opt_domHelper The DomHelper to render with.
 * @constructor
 */
goog.tweak.TweakUi = function(registry, opt_domHelper) {
  /**
   * The registry to create a UI from.
   * @type {!goog.tweak.Registry}
   * @private
   */
  this.registry_ = registry;

  /**
   * The element to display when the UI is visible.
   * @type {goog.tweak.EntriesPanel|undefined}
   * @private
   */
  this.entriesPanel_;

  /**
   * The DomHelper to render with.
   * @type {!goog.dom.DomHelper}
   * @private
   */
  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper();

  // Listen for newly registered entries (happens with lazy-loaded modules).
  registry.addOnRegisterListener(goog.bind(this.onNewRegisteredEntry_, this));
};


/**
 * The CSS class name unique to the tweak entry div.
 * @type {string}
 * @private
 */
goog.tweak.TweakUi.ENTRY_CSS_CLASS_ = goog.getCssName('goog-tweak-entry');


/**
 * The CSS classes for each tweak entry div.
 * @type {string}
 * @private
 */
goog.tweak.TweakUi.ENTRY_CSS_CLASSES_ = goog.tweak.TweakUi.ENTRY_CSS_CLASS_ +
    ' ' + goog.getCssName('goog-inline-block');


/**
 * Marker that the style sheet has already been installed.
 * @type {string}
 * @private
 */
goog.tweak.TweakUi.STYLE_SHEET_INSTALLED_MARKER_ =
    '__closure_tweak_installed_';


/**
 * CSS used by TweakUI.
 * @type {string}
 * @private
 */
goog.tweak.TweakUi.CSS_STYLES_ = '.' + goog.tweak.TweakUi.ENTRY_CSS_CLASS_ +
    ',.' + goog.tweak.TweakUi.ENTRY_CSS_CLASS_ + ' fieldset{' +
    // Prefer inline-block but fall back on inline.
    'display:inline;display:inline-block;' +
    // Space things out vertically a little bit so it's not so crowded.
    'line-height: 2em;' +
    '}';


/**
 * Creates a TweakUi if tweaks are enabled.
 * @param {goog.dom.DomHelper=} opt_domHelper The DomHelper to render with.
 * @return {Element|undefined} The root UI element or undefined if tweaks are
 *     not enabled.
 */
goog.tweak.TweakUi.create = function(opt_domHelper) {
  var registry = goog.tweak.getRegistry();
  if (registry) {
    var ui = new goog.tweak.TweakUi(registry, opt_domHelper);
    ui.render();
    return ui.getRootElement();
  }
};


/**
 * Creates a TweakUi inside of a show/hide link.
 * @param {goog.dom.DomHelper=} opt_domHelper The DomHelper to render with.
 * @return {Element|undefined} The root UI element or undefined if tweaks are
 *     not enabled.
 */
goog.tweak.TweakUi.createCollapsible = function(opt_domHelper) {
  var registry = goog.tweak.getRegistry();
  if (registry) {
    var dh = opt_domHelper || goog.dom.getDomHelper();

    // The following strings are for internal debugging only.  No translation
    // necessary.  Do NOT wrap goog.getMsg() around these strings.
    var showLink = dh.createDom('a', {href: 'javascript:;'}, 'Show Tweaks');
    var hideLink = dh.createDom('a', {href: 'javascript:;'}, 'Hide Tweaks');
    var ret = dh.createDom('div', null, showLink);

    function lazyCreate() {
      // Lazily render the UI.
      var ui = new goog.tweak.TweakUi(
          /** @type {!goog.tweak.Registry} */ (registry), dh);
      ui.render();
      // Put the hide link on the same line as the "Show Descriptions" link.
      // Set the style lazily because we can.
      hideLink.style.marginRight = '10px';
      var tweakElem = ui.getRootElement();
      tweakElem.insertBefore(hideLink, tweakElem.firstChild);
      ret.appendChild(tweakElem);
      return tweakElem;
    }
    new goog.ui.Zippy(showLink, lazyCreate, false /* expanded */, hideLink);
    return ret;
  }
};


/**
 * Compares the given entries. Orders by settings, boolean groups, buttons.
 * Within those groups, it orders alphabetically by label.
 * @param {goog.tweak.BaseEntry} a The first entry to compare.
 * @param {goog.tweak.BaseEntry} b The second entry to compare.
 * @return {number} Refer to goog.array.defaultCompare.
 * @private
 */
goog.tweak.TweakUi.entryCompare_ = function(a, b) {
  var labelCompare = goog.array.defaultCompare(a.label, b.label);
  var isGroupCompare = goog.array.defaultCompare(
      a instanceof goog.tweak.BooleanGroup,
      b instanceof goog.tweak.BooleanGroup);
  var isButtonCompare = goog.array.defaultCompare(
      a instanceof goog.tweak.BaseSetting,
      b instanceof goog.tweak.BaseSetting);
  return -isButtonCompare || isGroupCompare || labelCompare;
};


/**
 * Returns the list of entries from the given boolean group.
 * @param {!goog.tweak.BooleanGroup} group The group to get the entries from.
 * @return {!Array.<!goog.tweak.BaseEntry>} The sorted entries.
 * @private
 */
goog.tweak.TweakUi.extractBooleanGroupEntries_ = function(group) {
  var ret = goog.object.getValues(group.getChildEntries());
  ret.sort(goog.tweak.TweakUi.entryCompare_);
  return ret;
};


/**
 * Returns the list of entries to render.
 * @return {!Array.<!goog.tweak.BaseEntry>} The sorted top-level entries.
 * @private
 */
goog.tweak.TweakUi.prototype.extractTopLevelEntries_ = function() {
  var ret = this.registry_.extractEntries(true /* excludeChildEntries */,
      false /* excludeNonSettings */);
  ret.sort(goog.tweak.TweakUi.entryCompare_);
  return ret;
};


/**
 * @return {!Element} The root element. Must not be called before render().
 */
goog.tweak.TweakUi.prototype.getRootElement = function() {
  goog.asserts.assert(this.entriesPanel_,
      'TweakUi.getRootElement called before render().');
  return this.entriesPanel_.getRootElement();
};


/**
 * Reloads the page with query parameters set by the UI.
 * @private
 */
goog.tweak.TweakUi.prototype.restartWithAppliedTweaks_ = function() {
  var queryString = this.registry_.makeUrlQuery();
  var wnd = this.domHelper_.getWindow();
  if (queryString != wnd.location.search) {
    wnd.location.search = queryString;
  } else {
    wnd.location.reload();
  }
};


/**
 * Installs the required CSS styles.
 * @private
 */
goog.tweak.TweakUi.prototype.installStyles_ = function() {
  // Use an marker to install the styles only once per document.
  // Styles are injected via JS instead of in a separate style sheet so that
  // they are automatically excluded when tweaks are stripped out.
  var doc = this.domHelper_.getDocument();
  if (!(goog.tweak.TweakUi.STYLE_SHEET_INSTALLED_MARKER_ in doc)) {
    goog.style.installStyles(
        goog.tweak.TweakUi.CSS_STYLES_, doc);
    doc[goog.tweak.TweakUi.STYLE_SHEET_INSTALLED_MARKER_] = true;
  }
};


/**
 * Creates the element to display when the UI is visible.
 * @return {!Element} The root element.
 */
goog.tweak.TweakUi.prototype.render = function() {
  this.installStyles_();
  var dh = this.domHelper_;
  // The submit button
  var submitButton = dh.createDom('button', {style: 'font-weight:bold'},
      'Apply Tweaks');
  submitButton.onclick = goog.bind(this.restartWithAppliedTweaks_, this);

  var topLevelEntries = this.extractTopLevelEntries_();
  this.entriesPanel_ = new goog.tweak.EntriesPanel(topLevelEntries, dh);
  this.entriesPanel_.render(submitButton);
  return this.getRootElement();
};


/**
 * Updates the UI with the given entry.
 * @param {!goog.tweak.BaseEntry} entry The newly registered entry.
 * @private
 */
goog.tweak.TweakUi.prototype.onNewRegisteredEntry_ = function(entry) {
  if (this.entriesPanel_) {
    this.insertEntry_(entry);
  }
};


/**
 * Updates the UI with the given entry.
 * @param {!goog.tweak.BaseEntry} entry The newly registered entry.
 * @private
 */
goog.tweak.TweakUi.prototype.insertEntry_ = function(entry) {
  var panel = this.entriesPanel_;
  var newEntryList;
  if (entry instanceof goog.tweak.BooleanInGroupSetting) {
    var group = entry.getGroup();
    panel = panel.childPanels[group.getId()];
    goog.asserts.assert(panel, 'Missing panel for entry %s', entry.getId());
    newEntryList = goog.tweak.TweakUi.extractBooleanGroupEntries_(group);
  } else {
    newEntryList = this.extractTopLevelEntries_();
  }
  var insertIndex = goog.array.indexOf(newEntryList, entry);
  if (insertIndex != -1) {
    panel.insertEntry(entry, insertIndex);
  }
};



/**
 * The body of the tweaks UI and also used for BooleanGroup.
 * @param {!Array.<!goog.tweak.BaseEntry>} entries The entries to show in the
 *     panel.
 * @param {goog.dom.DomHelper=} opt_domHelper The DomHelper to render with.
 * @constructor
 */
goog.tweak.EntriesPanel = function(entries, opt_domHelper) {
  // This if statement works around a bug in JsCompiler that prevents this class
  // from being stripped.
  // TODO(agrieve): Isolate this bug.
  if (!goog.tweak.STRIP_TWEAKS) {
    /**
     * The entries to show in the panel.
     * @type {!Array.<!goog.tweak.BaseEntry>} entries
     * @private
     */
    this.entries_ = entries;

    var self = this;
    /**
     * The bound onclick handler for the help question marks.
     * @this {Element}
     * @private
     */
    this.boundHelpOnClickHandler_ = function() {
      self.onHelpClick_(this.parentNode);
    };

    /**
     * The element that contains the UI.
     * @type {Element}
     * @private
     */
    this.rootElem_;

    /**
     * The element that contains all of the settings and the endElement.
     * @type {Element}
     * @private
     */
    this.mainPanel_;

    /**
     * Flips between true/false each time the "Toggle Descriptions" link is
     * clicked.
     * @type {boolean}
     * @private
     */
    this.showAllDescriptionsState_;

    /**
     * The DomHelper to render with.
     * @type {!goog.dom.DomHelper}
     * @private
     */
    this.domHelper_ = opt_domHelper || goog.dom.getDomHelper();

    /**
     * Map of tweak ID -> EntriesPanel for child panels (BooleanGroups).
     * @type {!Object.<!goog.tweak.EntriesPanel>}
     */
    this.childPanels = {};
  }
};


/**
 * @return {!Element} Returns the expanded element. Must not be called before
 *     render().
 */
goog.tweak.EntriesPanel.prototype.getRootElement = function() {
  goog.asserts.assert(this.rootElem_,
      'EntriesPanel.getRootElement called before render().');
  return /** @type {!Element} */ (this.rootElem_);
};


/**
 * Creates and returns the expanded element.
 * The markup looks like:
 * <div>
 *   <a>Show Descriptions</a>
 *   <div>
 *      ...
 *      {endElement}
 *   </div>
 * </div>
 * @param {Element|DocumentFragment=} opt_endElement Element to insert after all
 *     tweak entries.
 * @return {!Element} The root element for the panel.
 */
goog.tweak.EntriesPanel.prototype.render = function(opt_endElement) {
  var dh = this.domHelper_;
  var entries = this.entries_;
  var ret = dh.createDom('div', {style: 'background:#ffc;padding:0 4px'});

  var showAllDescriptionsLink = dh.createDom('a', {
    href: 'javascript:;',
    onclick: goog.bind(this.toggleAllDescriptions, this)
  }, 'Toggle all Descriptions');
  ret.appendChild(showAllDescriptionsLink);

  // Add all of the entries.
  var mainPanel = dh.createElement('div');
  this.mainPanel_ = mainPanel;
  for (var i = 0, entry; entry = entries[i]; i++) {
    mainPanel.appendChild(this.createEntryElem_(entry));
  }

  if (opt_endElement) {
    mainPanel.appendChild(opt_endElement);
  }
  ret.appendChild(mainPanel);
  this.rootElem_ = ret;
  return /** @type {!Element} */ (ret);
};


/**
 * Inserts the given entry into the panel.
 * @param {!goog.tweak.BaseEntry} entry The entry to insert.
 * @param {number} index The index to insert it at.
 */
goog.tweak.EntriesPanel.prototype.insertEntry = function(entry, index) {
  goog.array.insertAt(this.entries_, entry, index);
  this.mainPanel_.insertBefore(
      this.createEntryElem_(entry),
      // IE doesn't like 'undefined' here.
      this.mainPanel_.childNodes[index] || null);
};


/**
 * Creates and returns a form element for the given entry.
 * @param {goog.tweak.BaseEntry} entry The entry.
 * @return {!Element} The root DOM element for the entry.
 * @private
 */
goog.tweak.EntriesPanel.prototype.createEntryElem_ = function(entry) {
  var dh = this.domHelper_;
  var ret = dh.createDom('div', goog.tweak.TweakUi.ENTRY_CSS_CLASSES_,
      dh.createDom('label', {
        // Make the hover text the description.
        title: entry.description,
        style: 'color:' + (entry.isRestartRequired() ? '' : 'blue')
      }, this.createTweakEntryDom_(entry)),
      // Add the expandable help question mark.
      this.createHelpElem_(entry));
  return ret;
};


/**
 * Click handler for the help link.
 * @param {Node} entryDiv The div that contains the tweak.
 * @private
 */
goog.tweak.EntriesPanel.prototype.onHelpClick_ = function(entryDiv) {
  this.showDescription_(entryDiv, !entryDiv.style.display);
};


/**
 * Twiddle the DOM so that the entry within the given span is shown/hidden.
 * @param {Node} entryDiv The div that contains the tweak.
 * @param {boolean} show True to show, false to hide.
 * @private
 */
goog.tweak.EntriesPanel.prototype.showDescription_ =
    function(entryDiv, show) {
  var descriptionElem = entryDiv.lastChild.lastChild;
  goog.style.showElement(/** @type {Element} */ (descriptionElem), show);
  entryDiv.style.display = show ? 'block' : '';
};


/**
 * Creates and returns a help element for the given entry.
 * @param {goog.tweak.BaseEntry} entry The entry.
 * @return {!Element} The root element of the created DOM.
 * @private
 */
goog.tweak.EntriesPanel.prototype.createHelpElem_ = function(entry) {
  // The markup looks like:
  // <span onclick=...><b>?</b><span>{description}</span></span>
  var ret = this.domHelper_.createElement('span');
  ret.innerHTML = '<b style="padding:0 1em 0 .5em">?</b>' +
      '<span style="display:none;color:#666"></span>';
  ret.onclick = this.boundHelpOnClickHandler_;
  var descriptionElem = ret.lastChild;
  goog.dom.setTextContent(/** @type {Element} */ (descriptionElem),
      entry.description);
  if (entry.isRestartRequired()) {
    descriptionElem.innerHTML +=
        ' <span style="color:red">(requires restart)</span>';
  } else {
    descriptionElem.innerHTML +=
        ' <span style="color:blue">(no restart required)</span>';
  }
  return ret;
};


/**
 * Show all entry descriptions (has the same effect as clicking on all ?'s).
 */
goog.tweak.EntriesPanel.prototype.toggleAllDescriptions = function() {
  var show = !this.showAllDescriptionsState_;
  this.showAllDescriptionsState_ = show;
  var entryDivs = this.domHelper_.getElementsByTagNameAndClass('div',
      goog.tweak.TweakUi.ENTRY_CSS_CLASS_, this.rootElem_);
  for (var i = 0, div; div = entryDivs[i]; i++) {
    this.showDescription_(div, show);
  }
};


/**
 * Creates the DOM element to control the given enum setting.
 * @param {!goog.tweak.StringSetting|!goog.tweak.NumericSetting} tweak The
 *     setting.
 * @param {!Function} onchangeFunc onchange event handler.
 * @return {!DocumentFragment} The DOM element.
 * @private
 */
goog.tweak.EntriesPanel.prototype.createComboBoxDom_ =
    function(tweak, onchangeFunc) {
  // The markup looks like:
  // Label: <select><option></option></select>
  var dh = this.domHelper_;
  var ret = dh.getDocument().createDocumentFragment();
  ret.appendChild(dh.createTextNode(tweak.label + ': '));
  var selectElem = dh.createElement('select');
  var values = tweak.getValidValues();
  for (var i = 0, il = values.length; i < il; ++i) {
    var optionElem = dh.createElement('option');
    optionElem.text = String(values[i]);
    // Setting the option tag's value is required for selectElem.value to work
    // properly.
    optionElem.value = String(values[i]);
    selectElem.appendChild(optionElem);
  }
  ret.appendChild(selectElem);

  // Set the value and add a callback.
  selectElem.value = tweak.getNewValue();
  selectElem.onchange = onchangeFunc;
  tweak.addCallback(function() {
    selectElem.value = tweak.getNewValue();
  });
  return ret;
};


/**
 * Creates the DOM element to control the given boolean setting.
 * @param {!goog.tweak.BooleanSetting} tweak The setting.
 * @return {!DocumentFragment} The DOM elements.
 * @private
 */
goog.tweak.EntriesPanel.prototype.createBooleanSettingDom_ =
    function(tweak) {
  var dh = this.domHelper_;
  var ret = dh.getDocument().createDocumentFragment();
  var checkbox = dh.createDom('input', {type: 'checkbox'});
  ret.appendChild(checkbox);
  ret.appendChild(dh.createTextNode(tweak.label));

  // Needed on IE6 to ensure the textbox doesn't get cleared
  // when added to the DOM.
  checkbox.defaultChecked = tweak.getNewValue();

  checkbox.checked = tweak.getNewValue();
  checkbox.onchange = function() {
    tweak.setValue(checkbox.checked);
  };
  tweak.addCallback(function() {
    checkbox.checked = tweak.getNewValue();
  });
  return ret;
};


/**
 * Creates the DOM element to control the given boolean group.
 * @param {!goog.tweak.BooleanGroup} booleanGroup The group.
 * @return {!DocumentFragment} The DOM element.
 * @private
 */
goog.tweak.EntriesPanel.prototype.createBooleanGroupDom_ =
    function(booleanGroup) {
  var dh = this.domHelper_;
  var toggleLink = dh.createDom('a', {href: 'javascript:;'},
      booleanGroup.label + ' \xBB');
  var toggleLink2 = dh.createDom('a', {href: 'javascript:;'},
      '\xAB ' + booleanGroup.label);

  var childEntries =
      goog.tweak.TweakUi.extractBooleanGroupEntries_(booleanGroup);

  var innerUi = new goog.tweak.EntriesPanel(childEntries, dh);
  this.childPanels[booleanGroup.getId()] = innerUi;

  var elem = innerUi.render();
  var childrenElem = dh.createDom('fieldset', null,
      dh.createDom('legend', null, toggleLink2),
      elem);

  new goog.ui.Zippy(toggleLink, childrenElem, false /* expanded */,
      toggleLink2);

  var ret = dh.getDocument().createDocumentFragment();
  ret.appendChild(toggleLink);
  ret.appendChild(childrenElem);
  return ret;
};


/**
 * Creates the DOM element to control the given string setting.
 * @param {!goog.tweak.StringSetting|!goog.tweak.NumericSetting} tweak The
 *     setting.
 * @param {!Function} onchangeFunc onchange event handler.
 * @return {!DocumentFragment} The DOM element.
 * @private
 */
goog.tweak.EntriesPanel.prototype.createTextBoxDom_ =
    function(tweak, onchangeFunc) {
  var dh = this.domHelper_;
  var ret = dh.getDocument().createDocumentFragment();
  ret.appendChild(dh.createTextNode(tweak.label + ': '));
  var textBox = dh.createDom('input', {
    value: tweak.getNewValue(),
    // TODO(agrieve): Make size configurable or autogrow.
    size: 5,
    onblur: onchangeFunc
  });
  ret.appendChild(textBox);
  tweak.addCallback(function() {
    textBox.value = tweak.getNewValue();
  });
  return ret;
};


/**
 * Creates the DOM element to control the given button action.
 * @param {!goog.tweak.ButtonAction} tweak The action.
 * @return {!Element} The DOM element.
 * @private
 */
goog.tweak.EntriesPanel.prototype.createButtonActionDom_ =
    function(tweak) {
  return this.domHelper_.createDom('button', {
    onclick: goog.bind(tweak.fireCallbacks, tweak)
  }, tweak.label);
};


/**
 * Creates the DOM element to control the given entry.
 * @param {!goog.tweak.BaseEntry} entry The entry.
 * @return {!Element|!DocumentFragment} The DOM element.
 * @private
 */
goog.tweak.EntriesPanel.prototype.createTweakEntryDom_ = function(entry) {
  if (entry instanceof goog.tweak.BooleanSetting) {
    return this.createBooleanSettingDom_(entry);
  } else if (entry instanceof goog.tweak.BooleanGroup) {
    return this.createBooleanGroupDom_(entry);
  } else if (entry instanceof goog.tweak.StringSetting) {
    /** @this {Element} */
    var setValueFunc = function() {
      entry.setValue(this.value);
    };
    return entry.getValidValues() ?
        this.createComboBoxDom_(entry, setValueFunc) :
        this.createTextBoxDom_(entry, setValueFunc);
  } else if (entry instanceof goog.tweak.NumericSetting) {
    setValueFunc = function() {
      // Reset the value if it's not a number.
      if (isNaN(this.value)) {
        this.value = entry.getNewValue();
      } else {
        entry.setValue(+this.value);
      }
    };
    return entry.getValidValues() ?
        this.createComboBoxDom_(entry, setValueFunc) :
        this.createTextBoxDom_(entry, setValueFunc);
  }
  goog.asserts.assertInstanceof(entry, goog.tweak.ButtonAction,
      'invalid entry: %s', entry);
  return this.createButtonActionDom_(
      /** @type {!goog.tweak.ButtonAction} */ (entry));
};

