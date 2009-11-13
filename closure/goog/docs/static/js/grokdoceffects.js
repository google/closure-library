// Copyright 2009 Google Inc. All Rights Reserved.

/**
 * @fileoverview Classes and functions for adding tooltips, zippies, and an
 *     autocomplete index to a grokdoc page.
 *
 * @author westbrook@google.com (David Westbrook)
 * @author elsigh@google.com (Lindsey Simon)
 */
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.json');
goog.require('goog.net.ImageLoader');
goog.require('goog.net.XhrIo');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.AnimatedZippy');
goog.require('goog.ui.AutoComplete.Basic');
goog.require('goog.ui.Checkbox');
goog.require('goog.ui.TabBar');
goog.require('goog.ui.Tooltip');
goog.require('goog.ui.tree.TreeControl');

goog.provide('grokdoc.SectionManager');
goog.provide('grokdoc.indexTree');
goog.provide('grokdoc.zippifyAllDetails');
goog.provide('grokdoc.zippifyDetails');
goog.provide('grokdoc.AugmentedLegend');


/**
 * CSS class for the overview section of a jsdoc entry.
 * @type {string}
 */
grokdoc.OVERVIEW_CLASS = 'entryOverview';

/**
 * CSS class for the details section of a jsdoc entry.
 * @type {string}
 */
grokdoc.DETAIL_CLASS = 'entryDetails';

/**
 * CSS class for the details section of a jsdoc entry.
 * @type {string}
 */
grokdoc.ENTRY_CLASS = 'entry';


/**
 * CSS class for a section (such as "Instance Methods") of a jsdoc page.
 * @type {string}
 */
grokdoc.SECTION_CLASS = 'section';


/**
 * CSS class for a legend on a jsdoc page.
 * @type {string}
 */
grokdoc.LEGEND_CLASS = 'legend';


/**
 * CSS class for a legend keys on a jsdoc page.
 * @type {string}
 */
grokdoc.LEGEND_KEY_CLASS = 'key';


/**
 * CSS class for the link that opens and closes all the zippies in a section.
 * @type {string}
 */
grokdoc.TOGGLELINK_CLASS = 'toggleLink';

/**
 * CSS class for the link that navigates to the definition of a symbol in
 * source code.
 * @type {string}
 */
grokdoc.VIEWDEF_CLASS = 'viewdef';

/**
 * CSS class for an element containing an index tree.
 */
grokdoc.TREE_CLASS = 'indexTree';

/**
 * Adds tooltips to all  anchor tags with CSS class
 * grokdoc.VIEWDEF_CLASS that have a sibling Element. Takes the HTML for the
 * tooltip from the the innerHTML of the first sibling Element of the anchor
 * tag.
 *
 * @return {Array.<goog.ui.Tooltip>} An array containing the new tooltip
 *     objects.
 */
grokdoc.tippifyAllEntries = function() {
  var icons = goog.dom.getElementsByTagNameAndClass('a',
      grokdoc.VIEWDEF_CLASS);
  var tips = [];

  for (var i = 0; i < icons.length; i++) {
    var textElt = goog.dom.getNextElementSibling(icons[i]);
    if (textElt) {
      var tooltip = new goog.ui.Tooltip(icons[i]);
      tooltip.setHtml(textElt.innerHTML);
      tips.push(tooltip);
    }
  }
  return tips;
};

/**
 * For every jsdoc entry under a parent Element,
 * wraps the entry details in a zippy. Assumes that entry
 * details are in the first Element sibling after the overview
 * div for the entry. The overview div for the entry becomes the
 * control for opening and closing the zippy.
 *
 * @param {Element} parentElt The element under which to search for
 *     details elements.
 * @return {Array.<goog.ui.AnimatedZippy>} An array containing the new Zippy
 *     objects.
 */
grokdoc.zippifyDetails = function(parentElt) {
  var allZippies = [];
  // Get all entry elements under parentElt.
  var entries = goog.dom.getElementsByTagNameAndClass(null,
      grokdoc.ENTRY_CLASS, parentElt);

  for (var i = 0, n = entries.length; i < n; i++) {
    // For each entry, check whether it has a descendant with the CSS class
    // for a "Details" element. We want the user to be able to hide or
    // reveal an entry's details.
    var details = goog.dom.getElementsByTagNameAndClass(
        null, grokdoc.DETAIL_CLASS, entries[i]);
    if (details[0]) {
      // Make each details element a zippy, and add it to the list of zippies.
      // (the list of zippies can be used to create an "Expand All" link, for
      // example.
      var zip = new goog.ui.AnimatedZippy(entries[i],
          details[0], false);
      allZippies.push(zip);

      // Makes sure that any anchors in the element work without causing the
      // zippy to expand/collapse.
      var anchors = goog.dom.getElementsByTagNameAndClass('a', null,
          entries[i]);
      for (var j = 0, anchor; anchor = anchors[j]; j++) {
        goog.events.listen(anchor, 'click', function(e) {
          e.stopPropagation();
        });
      }
    }
  }
  return allZippies;
};

/**
 * For each section in the document, wraps all entry
 * details in zippies and assigns the zippies for that
 * section to a SectionManager that can open and close them
 * all at once.
 *
 * @return {Array.<grokdoc.SectionManager>} An array containing the new
 *     SectionManager objects.
 */
grokdoc.zippifyAllDetails = function() {
  var sections = goog.dom.getElementsByTagNameAndClass('div',
      grokdoc.SECTION_CLASS);
  var zippyManagers = [];

  for (var i = 0; i < sections.length; i++) {
    var zippies = grokdoc.zippifyDetails(sections[i]);
    var manager = new grokdoc.SectionManager(false, sections[i], zippies);
    zippyManagers.push();
  }
  return zippyManagers;
};


/**
 * Turns the text version of the legend into a component to show/hide
 * functions based on their accessibility.
 * @param {Element} legendElt The legend container element.
 * @constructor
 */
grokdoc.AugmentedLegend = function(legendElt) {

  /**
   * @type {Element}
   * @private
   */
  this.legendElt_ = legendElt;

  /**
   * This is the entire column element - i.e. a container of all the function
   * tables/rows.
   * @type {Element}
   * @private
   */
  this.containerElt_ = legendElt.parentNode;

  /**
   * The checkbox elements, stored by className as keys.
   * @type {Object}
   * @private
   */
  this.checkboxElts_ = {};

  // Insert a label into the legend now that we've got show/hide functionality.
  var showTextElt = goog.dom.createElement('strong');
  goog.dom.setTextContent(showTextElt, 'Show: ');
  goog.dom.insertSiblingBefore(showTextElt,
      goog.dom.getFirstElementChild(this.legendElt_));

  // Decorate the original legend.
  this.decorate_();
};

/**
 * A list of classNames for the legend keys.
 * @type {Array.<string>}
 */
grokdoc.AugmentedLegend.CLASS_NAMES = ['publickey', 'protectedkey',
    'privatekey'];

/**
 * Decorates our legend with checkboxes, labels and event handling.
 * In the end, we'll end up with a 'label' element enclosing a
 * checkbox 'input' and the text for the function type followed by
 * the count of this type of function in parentheses.
 * Additionally we'll end up with an additional table row that becomes
 * visible when functions of that type are hidden saying:
 * "n# of items hidden."
 * @private
 */
grokdoc.AugmentedLegend.prototype.decorate_ = function() {
  var legendKeys = goog.dom.getElementsByTagNameAndClass('span',
      grokdoc.LEGEND_KEY_CLASS, this.legendElt_);
  for (var i = 0, key; key = legendKeys[i]; i++) {
    var labelElt = goog.dom.createElement('label');
    var checkboxContainerElt = goog.dom.createElement('div');
    checkboxContainerElt.className = grokdoc.LEGEND_KEY_CLASS + '-bg';
    var checkboxElt = goog.dom.createElement('input');
    checkboxElt.type = 'checkbox';
    var functionType;
    for (var i = 0, type; type = grokdoc.AugmentedLegend.CLASS_NAMES[i]; i++) {
      if (goog.dom.classes.has(key, type)) {
        functionType = type;
        break;
      }
    }
    goog.dom.classes.add(checkboxContainerElt, functionType);
    checkboxElt.className = functionType;
    checkboxElt.id = functionType + '-cb';
    labelElt.setAttribute('for', checkboxElt.id);

    // Stores a reference to each checkbox.
    this.checkboxElts_[functionType] = checkboxElt;

    // By default, only the public functions should be visible.
    if (functionType == 'publickey') {
      checkboxElt.checked = true;
    } else {
      this.setFunctionVisibility_(functionType, false);
    }

    checkboxContainerElt.appendChild(checkboxElt);
    goog.events.listen(checkboxElt, 'click', this.checkboxClickHandler_, false,
        this);

    // Now replace the text node with a label node for easy of click.
    var keyTextElt = goog.dom.getNextElementSibling(key);
    // Get a count of this type's functions.
    var tableRowFunctionTypeClass = functionType.replace('key', '');
    var typeFunctions = goog.dom.getElementsByTagNameAndClass('tr',
        tableRowFunctionTypeClass, this.containerElt_);
    var newLabelText = document.createTextNode(
        goog.dom.getTextContent(keyTextElt) + ' (' +
        typeFunctions.length + ')');

    // Adds a TR after the last function of each type in a table to provide
    // some reminder of the hidden rows when they're hidden.
    if (typeFunctions.length > 0) {
      var functionAndPropertiesTables = goog.dom.getElementsByTagNameAndClass(
          'table', 'horiz-rule', this.containerElt_);
      for (var j = 0, table; table = functionAndPropertiesTables[j]; j++) {
        var typeRows = goog.dom.getElementsByTagNameAndClass(
          'tr', tableRowFunctionTypeClass, table);
        if (typeRows.length > 0) {
          var lastRowOfType = typeRows[typeRows.length - 1];
          var row = table.insertRow(lastRowOfType.rowIndex + 1);
          row.className = 'funcs-hidden-' + tableRowFunctionTypeClass;
          var accessCell = row.insertCell(0);
          accessCell.className = 'access';
          var cell = row.insertCell(1);
          cell.className = functionType + '-toggle';
          cell.functionType = functionType;
          cell.setAttribute('colspan', lastRowOfType.cells.length - 1);
          cell.innerHTML = typeRows.length + ' hidden ' +
              tableRowFunctionTypeClass + ' item' +
              (typeRows.length > 1 ? 's' : '') + '.';
          var instance = this;
          goog.events.listen(cell, 'click',
              this.hiddenFunctionTypeRowClickHandler_, false, this);
        }
      }
    }

    labelElt.appendChild(checkboxContainerElt);
    labelElt.appendChild(newLabelText);
    goog.dom.insertSiblingAfter(labelElt, keyTextElt);
    goog.dom.removeNode(keyTextElt);
    goog.dom.removeNode(key);
  }
};

/**
 * Handles clicks on the additional rows with the text "n# of hidden items".
 * @param {goog.events.Event} e A click event.
 * @private
 */
grokdoc.AugmentedLegend.prototype.hiddenFunctionTypeRowClickHandler_ =
    function(e) {
  var cell = e.currentTarget;
  var functionType = cell.functionType;
  this.checkboxElts_[functionType].checked = true;
  this.setFunctionVisibility_(functionType, true);
};

/**
 * Handles clicks on the legend key checkboxes.
 * @param {goog.events.Event} e A click event.
 * @private
 */
grokdoc.AugmentedLegend.prototype.checkboxClickHandler_ = function(e) {
  var checkbox = e.currentTarget;
  var functionType = checkbox.className;
  this.setFunctionVisibility_(functionType, checkbox.checked);
};

/**
 * Sets functions to be visible or not by type.
 * @param {string} type A string representing the function type, i.e. publickey.
 * @param {boolean} isVisible True if this type should be visible, or false
 *     otherwise.
 * @private
 */
grokdoc.AugmentedLegend.prototype.setFunctionVisibility_ = function(
    functionType, isVisible) {
  goog.dom.classes.enable(this.containerElt_, 'func-hide-' + functionType,
      !isVisible);
};


/**
 * Maintains a set of zippies for a section and enables a
 * link to open and close all the zippies at once.
 *
 * @param {boolean} startOpen Whether the section's zippies start in
 *     the open state.
 * @param {Element} sectionElt The Element containing the section.
 * @param {Array.<goog.ui.AnimatedZippy>} zippies An array of the zippies to
 *     be managed by the SectionManager.
 * @constructor
 */
grokdoc.SectionManager = function(startOpen, sectionElt, zippies) {
  this.open = startOpen;
  this.zippies = zippies;

  var toggleLinks = goog.dom.getElementsByTagNameAndClass('a',
      grokdoc.TOGGLELINK_CLASS, sectionElt);

  if (toggleLinks.length > 0) {
    this.toggleElt = toggleLinks[0];
    this.setToggleText();
    goog.events.listen(this.toggleElt, goog.events.EventType.CLICK,
        this.handleClick, false, this);
  }
};

/**
 * Text to display in the toggle link when the zippies are open.
 * @type {string}
 */
grokdoc.SectionManager.CLOSEALL_TEXT = 'Close all';

/**
 * Text to display in the toggle link when the zippies are closed.
 * @type {string}
 */
grokdoc.SectionManager.OPENALL_TEXT = 'Expand all';

/**
 * Click event handler for the toggle link.
 *
 * @param {goog.events.Event} e The event to handle.
 */
grokdoc.SectionManager.prototype.handleClick = function(e) {
  this.open = !this.open;
  for (var i = 0; i < this.zippies.length; i++) {
    this.zippies[i].setExpanded(this.open);
  }
  this.setToggleText();
};

/**
 * Sets the text of the toggle link based on the current state
 * (open or closed).
 */
grokdoc.SectionManager.prototype.setToggleText = function() {
  goog.dom.setTextContent(this.toggleElt, this.open ?
      grokdoc.SectionManager.CLOSEALL_TEXT :
      grokdoc.SectionManager.OPENALL_TEXT
      );
};


/**
 * Retrieves json data for the type and file index to be used in both
 * the autocomplete and the tree index widget.
 * @constructor
 */
grokdoc.IndexDownloader = function() {
  this.xhr_ = new goog.net.XhrIo();
  // Fail silently. TODO: retry on error.
  goog.events.listen(this.xhr_, goog.net.EventType.SUCCESS,
      this.loadData, false, this);
  this.callbacks_ = [];
};

/**
 * Registers a function to be called when the index has downloaded.
 * @param {function(Array.<string|null|Object>)} f A function to call
 *     when the index has been downloaded and parsed. Must take a single
 *     parameter in the same format as the data parameter of
 *     grokdoc.extendTree().
 * @param {Object?} opt_context An object to serve as the meaning of the keyword
 *     this during the execution of f.
 */
grokdoc.IndexDownloader.prototype.registerCallback = function(f, opt_context) {
  var boundf = opt_context ? goog.bind(f, opt_context) : f;
  this.callbacks_.push(boundf);
};

/**
 * Triggers the request for the index data. All callbacks must be registered
 * with registerCallback() before calling send().
 * @param {string} url The Url from which to download the index data.
 */
grokdoc.IndexDownloader.prototype.send = function(url) {
  this.xhr_.send(url);
};

/**
 * Event handler to handle the successful completion of the index download.
 * Evaluates the json data, and passes the result to each callback function.
 *
 * @param {Event} e An event announcing successful completion of the index
 *     download.
 */
grokdoc.IndexDownloader.prototype.loadData = function(e) {
  // URL path names violated the restrictions in the safe parse. I'm assuming
  // unsafe is ok because the source is trusted.
  var data = goog.json.unsafeParse(this.xhr_.getResponseText());
  for (var i = 0; i < this.callbacks_.length; i++) {
    this.callbacks_[i](data);
  }
};

/**
 * Handles asynchronous downloading of index data and
 * installation of an autocomplete that
 * uses that data. Index downloading fails silently.
 *
 * @param {Element} autocompleteField The field element to which to attach
 *     the autocomplete.
 * @param {number} opt_maxMatches The maximum number of items to show in the
 *     autocomplete menu.
 * @param {string} opt_blankUrl URL for a clear dummy image to use for icons in
 *     autocomplete rows.
 * @constructor
 */
grokdoc.Selector = function(autocompleteField, opt_maxMatches, opt_blankUrl) {
  this.acElt = autocompleteField;
  this.numToShow = opt_maxMatches || grokdoc.Selector.DEFAULT_MAX_MATCHES;
  this.blankUrl = opt_blankUrl || grokdoc.Selector.DEFAULT_BLANK_URL;
};

/**
 * The default number of items to show in the autocomplete menu.
 * @type {number}
 */
grokdoc.Selector.DEFAULT_MAX_MATCHES = 25;

/**
 * The default URL for a clear dummy image to use for icons
 * in autocomplete rows.
 * @type {string}
 */
grokdoc.Selector.DEFAULT_BLANK_URL = _staticFilePath + 'images/blank.gif';

 /**
  * A map from kinds of items to the path separator for that kind of item.
  * Class paths are separated by dots, filepaths by slashes.
  * @type {Object}
  */
grokdoc.Selector.KIND_TO_SEPARATOR = {
  'class': '.',
  'file': '/'
};

/**
 * Builds the autocomplete using data provided in a tree data structure (the
 * same format that is used to build the index tree widget).
 * @param {Array} tree Data for the autocomplete.
 *     This data uses the same format as the data parameter of
 *     grokdoc.extendTree(): a three-element array, specifying a tree. The first
 *     element is the type of the item, used to determine the item's icon. The
 *     second element is the url to load when the item is selected.
 *     The third element is a map from names to data arrays for child nodes.
 *     The tree structure will be flattened when the autocomplete is built.
 */
grokdoc.Selector.prototype.buildAc = function(tree) {
  this.rows_ = [];
  this.index_ = [];
  this.addSubtree('', tree['typeIndex'], []);
  this.addSubtree('', tree['fileIndex'], []);

  var ac = new grokdoc.IconifiedAutoComplete(
    this.rows_, this.acElt, this.blankUrl, false, true);
  ac.setMaxMatches(this.numToShow);

  goog.events.listen(ac, goog.ui.AutoComplete.EventType.UPDATE,
      this.choiceHandler, false, this);
};

/**
 * Recursively traverses the data tree and builds the autocomplete.
 * @param {string} subtreeName The name of the current node.
 * @param {Array.<string|Object|null>} subtreeData Data for the autocomplete.
 *     This data uses the same format as the data parameter of
 *     grokdoc.extendTree(): a three-element array, specifying a tree. The first
 *     element is the type of the item, used to determine the item's icon. The
 *     second element is the url to load when the item is selected.
 *     The third element is a map from names to data arrays for child nodes.
 *     The tree structure will be flattened when the autocomplete is built.
 * @param {Array.<string>} path An array of the names of the nodes on the
 *     path from the root to the current node.
 */
grokdoc.Selector.prototype.addSubtree = function(
    subtreeName, subtreeData, path) {
  this.addItem(subtreeName, subtreeData, path);
  for (var key in subtreeData[2]) {
    this.addSubtree(key, subtreeData[2][key], path.concat(subtreeName));
  }
};

/**
 * Adds an item to the autocomplete.
 * @param {string} itemName The name of the item.
 * @param  {Array} itemData A three element array
 *     describing the node. The first element indicates what kind of thing
 *     is represented by the item (a class, file, or interface, for example).
 *     The second element is the url to be loaded when this item is selected.
 *     If this element is null, the item will not be added to the autocomplete.
 *     The third element is an Object containing the items children in the
 *     data tree, but this element is not used by this method.
 * @param {Array.<string>} path An array of the names of the nodes on the
 *     path from the root to the current node. This array is used to construct
 *     a path string, so that the autocomplete can match any portion of the
 *     path. For type nodes, the path represents package structure. For file
 *     nodes, the path represents the filepath of the file.
 */
grokdoc.Selector.prototype.addItem = function(itemName, itemData, path) {
  var url = itemData[1];
  if (!url) {
    return;
  }
  var kind = itemData[0];

  path.shift();
  var pathStr = path.join(grokdoc.Selector.KIND_TO_SEPARATOR[kind]) +
    grokdoc.Selector.KIND_TO_SEPARATOR[kind];
  var rowData = new grokdoc.AutoCompleteRowData(itemName, pathStr, kind);
  var fullName = rowData.toString();

  this.index_[fullName] = url;
  this.rows_.push(rowData);
};

/**
 * Handles the selection of an item from the autocomplete. Triggers browser
 * navigation to the url for the selected jsdoc page.
 *
 * @param {Event} e An event triggered by the the user's selection of an
 *     item from the autocomplete menu.
 */
grokdoc.Selector.prototype.choiceHandler = function(e) {
  window.location = this.index_[e.row];
};


/**
 * Represents an autocomplete item. The primary purpose of this class
 * is to implement the toString method used by the autocomplete matcher.
 * The formatted string displayed in the autocomplete may differ from the
 * string used for matching, depending on the kind of item (type, file, etc.),
 * so the class also provides getters for the various components of the
 * string returned by toString().
 * @param {string} name The name of the item.
 * @param {string} pathname A path associated with the item. For items
 *     representing files, the pathname is a filepath. For items
 *     representing types, the pathname is a package path. In both
 *     cases the pathname is included in the string that the
 *     autocomplete tries to match.
 * @param {string} kind The kind of thing represented by this item (class, file,
 *     or interface, for example).
 * @constructor
 */
grokdoc.AutoCompleteRowData = function(name, pathname, kind) {
  this.name = name;
  this.pathname = pathname;
  this.fullname = this.pathname + this.name;
  this.kind = kind;
};

/**
 * @return {string} The string to match against in an autocomplete.
 */
grokdoc.AutoCompleteRowData.prototype.toString = function() {
  return this.fullname;
};

/**
 * @return {string} The name of the item.
 */
grokdoc.AutoCompleteRowData.prototype.getName = function() {
  return this.name;
};

/**
 * @return {string} The filepath or package path to the thing represented
 *     by this item.
 */
grokdoc.AutoCompleteRowData.prototype.getPathname = function() {
  return this.pathname;
};

/**
 * @return {string} The kind of thing represented by this item (class, file,
 *     interface, etc.).
 */
grokdoc.AutoCompleteRowData.prototype.getKind = function() {
  return this.kind;
};

/**
 * A custom renderer for autocomplete rows that adds an icon to the row. Also
 * formats paths differently for rows representing types and rows
 * representing files.
 * @param {string} blankImgUrl The url of a clear image to be used for the
 *     icon. The actual icon will be the background image of this image
 *     element, controlled by CSS classes.
 * @constructor
 */
grokdoc.IconRowRenderer = function(blankImgUrl) {
  this.blankImg = blankImgUrl;
};

/**
 * CSS class for the default icon.
 * @type {string}
 */
grokdoc.IconRowRenderer.DEFAULT_ICON_KIND_CLASS = 'gdoc-ac-file-icon';

/**
 * A map from kind of node to the css class used for the node icon.
 * @type {Object}
 */
grokdoc.IconRowRenderer.KIND_ICON_MAP = {
  'class': 'gdoc-ac-class-icon',
  'file': 'gdoc-ac-file-icon'
};

/**
 * CSS class for the icon image element itself.
 * @type {string}
 */
grokdoc.IconRowRenderer.ICON_CLASS = 'goog-tree-icon';

/**
 * CSS class for a span of text specifying a path.
 * @type {string}
 */
grokdoc.IconRowRenderer.PATH_CLASS = 'entryNamespace';

/**
 * Takes the DOM element for an autocomplete row and builds the DOM structure
 * for a row with an icon.
 * @param {Object} row An object representing a row in an autocomplete menu.
 * @param {string} token The token to highlight within the row. That is, the
 *     token typed by the user in the autocomplete field. Can also be an
 *     array of tokens.
 * @param {Element} node The DOM element under which to render the row.
 */
grokdoc.IconRowRenderer.prototype.renderRow = function(row, token, node) {
  var kind = row.data.getKind();
  var kindCssClass = grokdoc.IconRowRenderer.KIND_ICON_MAP[kind] ||
      grokdoc.IconRowRenderer.DEFAULT_ICON_KIND_CLASS;

  var img = goog.dom.createDom('img', {'src': this.blankImg});
  goog.dom.classes.add(img, kindCssClass, grokdoc.IconRowRenderer.ICON_CLASS);
  node.appendChild(img);

  if (kind === 'file') {
    // File paths are long, so if the item represents a file we put the path
    // after the item name and make the text of the path small (by applying
    // a CSS class).
    var name = goog.dom.createTextNode(row.data.getName() + ' ');
    var pathSpan = goog.dom.createDom('span', null, row.data.getPathname());
    goog.dom.classes.add(pathSpan, grokdoc.IconRowRenderer.PATH_CLASS);
    node.appendChild(name);
    node.appendChild(pathSpan);
  } else {
    var content = goog.dom.createTextNode(row.data.toString());
    node.appendChild(content);
  }
};


/**
 * Differs from goog.ui.AutoComplete.Basic only in that it uses an
 * IconRowRenderer custom renderer.
 * @param {Array} data Data array.
 * @param {Element} input Input element or text area.
 * @param {string} blankUrl The url of a clear image to be used for the
 *     icon in an autocomplete menu item. The actual icon will
 *     be the background image of this image element, controlled by CSS classes.
 * @param {boolean} opt_multi Whether to allow multiple entries separated with
 *     semi-colons or colons.
 * @param {boolean} opt_useSimilar Whether to use similar matches. For example,
 *     "gost" => "ghost".
 * @extends {goog.ui.AutoComplete}
 * @constructor
 */
grokdoc.IconifiedAutoComplete = function(
    data, input, blankUrl, opt_multi, opt_useSimilar) {
  var matcher = new goog.ui.AutoComplete.ArrayMatcher(data, !opt_useSimilar);
  var customRenderer = new grokdoc.IconRowRenderer(blankUrl);
  var renderer = new goog.ui.AutoComplete.Renderer(null, customRenderer);
  var inputhandler =
  new goog.ui.AutoComplete.InputHandler(null, null, !!opt_multi);

  goog.ui.AutoComplete.call(this, matcher, renderer, inputhandler);

  inputhandler.attachAutoComplete(this);
  inputhandler.attachInputs(input);
};
goog.inherits(grokdoc.IconifiedAutoComplete, goog.ui.AutoComplete);


//============== Index page stuff. TODO(westbrook): separate file for index js.

/**
 * Extends TreeControl in order to allow nodes to use custom icons.
 * @param {string} html The html content of the node label.
 * @param {Object} opt_config The configuration for the tree. See
 *    goog.ui.tree.TreeControl.DefaultConfig. If not specified, a default config
 *    will be used.
 * @param {goog.dom.DomHelper} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.tree.TreeControl}
 */
grokdoc.TypedTreeControl = function(html, opt_config, opt_domHelper) {
  var config = opt_config ||
      goog.object.clone(goog.ui.tree.TreeControl.defaultConfig);
  config.cleardotPath = _staticFilePath + 'images/cleardot.gif';
  this.current = false;
  goog.ui.tree.TreeControl.call(this, html, config, opt_domHelper);
};
goog.inherits(grokdoc.TypedTreeControl, goog.ui.tree.TreeControl);



/**
 * Sets the node to be expanded, and expands the child iff there is
 * exactly one child.
 * @param {boolean} expand Whether to expand or close the node.
 * @override
 */
grokdoc.TypedTreeControl.prototype.setExpanded = function(expand) {
  grokdoc.TypedTreeControl.superClass_.setExpanded.call(this, expand);
  grokdoc.TypedTreeNode.expandSingleChild(this, expand);
};


/**
 * Creates a new tree node using the same config as the root.
 * @param {string} name The name of the node.
 * @param {string} html The html content of the node label.
 * @param {string} kind The kind of thing represented by the node. For example,
 *     in a class tree, the kind might be 'class', 'interface', or 'namespace'.
 *     See grokdoc.TypedTreeNode.KIND_ICON_MAP for allowed values. Used to set
 *     the css class of the node's icon element. If kind is
 *     omitted, the class for the standard folder or file icon will be used.
 * @return {goog.ui.tree.TreeNode} The new item.
 */
grokdoc.TypedTreeControl.prototype.createNode = function(name, html, kind) {
  return new grokdoc.TypedTreeNode(name, html, this.config_, this.dom_, kind);
};

/**
 * An single node in the tree. The node's kind (class, interface, file, etc.)
 * determines the icon used to represent the node.
 * @param {string} name The name of the node.
 * @param {string} html The html content of the node label.
 * @param {Object} opt_config The configuration for the tree. See
 *    goog.ui.tree.TreeControl.DefaultConfig. If not specified, a default config
 *    will be used.
 * @param {goog.dom.DomHelper} opt_domHelper Optional DOM helper.
 * @param {string} opt_kind The kind of thing represented by the node.
 *     For example, in a class tree, the kind might be 'class', 'interface',
 *     or 'namespace'. See grokdoc.TypedTreeNode.KIND_ICON_MAP for allowed
 *     values. Used to set the css class of the node's icon element. If kind is
 *     omitted, the class for the standard folder or file icon will be used.
 * @constructor
 * @extends {goog.ui.tree.TreeNode}
 */
grokdoc.TypedTreeNode = function(
    name, html, opt_config, opt_domHelper, opt_kind) {
  goog.ui.tree.TreeNode.call(this, html, opt_config, opt_domHelper);
  this.name = name;
  this.type_ = opt_kind;
};
goog.inherits(grokdoc.TypedTreeNode, goog.ui.tree.TreeNode);


/**
 * A map from kind of node to the css class used for the node icon.
 * @type {Object}
 */
grokdoc.TypedTreeNode.KIND_ICON_MAP = {
  'class': 'gdoc-tree-class-icon',
  'file': 'gdoc-tree-file-icon'
};

/**
 * A map from kind of node to the css class used for the node label.
 */
grokdoc.TypedTreeNode.KIND_LABEL_MAP = {
  'class': 'gdoc-tree-class-label',
  'namespace': 'gdoc-tree-namespace-label',
  'file': 'gdoc-tree-class-label',
  'folder': 'gdoc-tree-namespace-label'
};

/**
 * CSS class to apply to the node described by the current class page.
 * @type {string}
 */
grokdoc.TypedTreeNode.CURRENT_CLASS = 'current';

/**
 * @return {string} The name of this node.
 */
grokdoc.TypedTreeNode.prototype.getName = function() {
  return this.name;
};

/**
 * @return {string} The type of this node.
 */
grokdoc.TypedTreeNode.prototype.getType = function() {
  return this.type_;
};

/**
 * Returns the css class for the icon for this node.
 * @return {string} Css class for the icon. If the node's kind is in
 *     grokdoc.TypedTreeNode.KIND_ICON_MAP, return the class for this kind.
 *     Otherwise return the class for either a folder or file icon.
 */
grokdoc.TypedTreeNode.prototype.getCalculatedIconClass = function() {
  if (this.type_ in grokdoc.TypedTreeNode.KIND_ICON_MAP) {
    return this.config_.cssTreeIcon + ' ' +
        grokdoc.TypedTreeNode.KIND_ICON_MAP[this.type_];
  }

  // if classic then the openIcon is used for expanded, otherwise openIcon is
  // used for selected
  var behavior = this.getTree() ? this.getTree().getBehavior() :
                 this.config_.defaultBehavior;
  var expanded = behavior == 'classic' && this.getExpanded() ||
                 behavior != 'classic' && this.isSelected();
  if (expanded && this.expandedIconClass_) {
    return this.expandedIconClass_;
  }
  if (!expanded && this.iconClass_) {
    return this.iconClass_;
  }

  // fall back on default icons
  if (this.hasChildren()) {
    if (expanded && this.config_.cssExpandedFolderIcon) {
      return this.config_.cssTreeIcon + ' ' +
             this.config_.cssExpandedFolderIcon;
    } else if (!expanded && this.config_.cssCollapsedFolderIcon) {
      return this.config_.cssTreeIcon + ' ' +
             this.config_.cssCollapsedFolderIcon;
    }
  } else {
    if (this.config_.cssFileIcon) {
      return this.config_.cssTreeIcon + ' ' + this.config_.cssFileIcon;
    }
  }
  return '';
};


/**
 * Sets the node to be expanded, and expands the child iff there is
 * exactly one child.
 * @param {boolean} expand Whether to expand or close the node.
 * @override
 */
grokdoc.TypedTreeNode.prototype.setExpanded = function(expand) {
  grokdoc.TypedTreeNode.superClass_.setExpanded.call(this, expand);
  grokdoc.TypedTreeNode.expandSingleChild(this, expand);
};

/**
 * Sets a flag that indicates whether this node is the node represented
 * by the current type page.
 * @param {boolean} current Whether this node is the node represented
 *     by the current type page.
 */
grokdoc.TypedTreeNode.prototype.setCurrent = function(current) {
  this.current = current;
};

/**
 * @return {boolean} Whether this node is the node represented by the current
 *     type page.
 */
grokdoc.TypedTreeNode.prototype.isCurrent = function() {
  return this.current;
};

/**
 * @return {string} The CSS class(es) to apply to an item's row.
 * @override
 */
grokdoc.TypedTreeNode.prototype.getRowClassName = function() {
  var selectedClass = this.isSelected() ? ' selected' : '';
  var currentClass = this.isCurrent() ? ' '
      + grokdoc.TypedTreeNode.CURRENT_CLASS : '';
  return this.config_.cssTreeRow + selectedClass + currentClass;
};

/**
 * Builds HTML for the label of a node. Overrides the BaseNode method
 * to allow different styling for namespace nodes and type nodes.
 * @return {string} HTML to apply to the node label.
 * @override
 */
grokdoc.TypedTreeNode.prototype.getLabelHtml = function() {
  var labelClass = this.config_.cssItemLabel;
  var typeAtt = '';
  if (this.type_ in grokdoc.TypedTreeNode.KIND_LABEL_MAP) {
    labelClass = grokdoc.TypedTreeNode.KIND_LABEL_MAP[this.type_];
    typeAtt = 'type="expand" ';
  }
  var toolTip = this.getToolTip();
  var tree = this.getTree();
  var sb = new goog.string.StringBuffer();
  var childCount = this.hasChildren() ? ' (' + this.children_.length + ')' : '';
  sb.append('<span ', typeAtt, 'class="', labelClass, '" ',
    (toolTip ? (' title="' + goog.string.htmlEscape(toolTip) + '" ') : ' '),
    '>', this.getHtml(), childCount, '</span>',
    '<span>', this.getAfterLabelHtml(), '</span>');
  return sb.toString();
};


/**
 * Returns the html for the node.
 * @param {goog.string.StringBuffer} sb A string buffer to which the
 *     HTML will be appended.
 * @override
 */
grokdoc.TypedTreeNode.prototype.toHtml = function(sb) {
  var tree = this.getTree();
  var hideLines = !tree.getShowLines() ||
      tree == this.getParent() && !tree.getShowRootLines();

  var childClass = hideLines ? this.config_.cssChildrenNoLines :
      this.config_.cssChildren;

  var nonEmptyAndExpanded = this.getExpanded() && this.hasChildren();

  // Allow nodes with children to be styled specially.
  var parentClass = this.hasChildren() ? ' gdoc-treenodewithchildren' : '';

  sb.append('<div class="', this.config_.cssItem, parentClass,
    '" id="', this.getId(), '">',
    this.getRowHtml(),
    '<div class="', childClass, '" style="',
    this.getLineStyle(),
    (nonEmptyAndExpanded ? '' : 'display:none;'),
    '">');

  if (nonEmptyAndExpanded) {
    // children
    this.forEachChild(function(child) {
      child.toHtml(sb);
    });
  }

  // and tags
  sb.append('</div></div>');
};

/**
 * Expands the child iff the component only has one child.
 * @param {goog.ui.Component} component A component.
 * @param {boolean} b Whether to expand or close the child.
 */
grokdoc.TypedTreeNode.expandSingleChild = function(component, b) {
  if (b && component.getChildCount() == 1) {
    var child = component.getChildAt(0);
    if (child.setExpanded) {
      child.setExpanded(true);
    }
  }
};

/**
 * Takes a string that specifies a dot-delimited sequence of
 * tree node names and performs an action for each node on this
 * path. The traversal stops as soon as it fails to find a child of the current
 * node on the path with the name indicated by the next path element.
 * @param {string} separator A string that indicates the boundary between
 *     path elements.
 * @param {string} pathStr A string consisting of a sequence of node names
 *     separated by periods. This node path is assumed to progress from
 *     parent to child.
 * @param {goog.ui.tree.TreeNode} startNode The node from which to start
 *     traversing the tree path.
 * @param {function(goog.ui.tree.TreeNode)} opt_eachNodeAction A function to
 *     call for each node in the path.
 * @param {function(goog.ui.tree.TreeNode, goog.ui.tree.TreeNode)}
 *     opt_endNodeAction A function to call for the last node in the path.
 */
grokdoc.TypedTreeNode.followPath = function(separator, pathStr, startNode,
  opt_eachNodeAction, opt_endNodeAction) {
  var nodeNames = pathStr.split(separator);
  var foundNode = startNode;

  for (var n = 0; n < nodeNames.length && foundNode; n++) {
    var children = foundNode.getChildren();
    var parent = foundNode;
    foundNode = null;

    for (var c = 0; c < children.length; c++) {
      var currNodeName = children[c].getName();
      if (currNodeName == nodeNames[n]) {
        foundNode = children[c];
        if (opt_eachNodeAction) {
          opt_eachNodeAction(foundNode);
        }
      }
    }
  }
  if (foundNode && opt_endNodeAction) {
    opt_endNodeAction(foundNode, parent);
  }
};

/**
 * Builds a subtree TreeControl out of a data array and adds the subtree to
 * an existing TreeControl node.
 * @param {goog.ui.TreeControl} parent The parent tree node under which to
 *     build the new tree.
 * @param {string} nodeName The name to display in the node's label.
 * @param {Array.<string|Object|null>} data Data specifying the structure
 *     and content of the tree. A three-element array. The first
 *     element indicates what kind of thing the the subtree root node
 *     represents (class, interface, file, etc.).
 *     It is used to determine the node's icon. The
 *     second element is the url to which the node's link should point, if any.
 *     The third element is a map from names to data arrays for child nodes.
 */
grokdoc.extendTree = function(parent, nodeName, data) {
  var newNode = parent.getTree().createNode(nodeName, null, data[0]);

  var nodeHTML = nodeName;
  if (goog.isString(data[1])) {
    nodeHTML = '<a href="' + data[1] + '">' + nodeHTML + '</a>';
    newNode.onClick_ = goog.nullFunction;
  }
  newNode.setHtml(nodeHTML);

  parent.add(newNode);

  var keys = goog.object.getKeys(data[2]);
  keys.sort();
  for (var k = 0; k < keys.length; k++) {
    var key = keys[k];
    grokdoc.extendTree(newNode, key, data[2][key]);
  }
};

/**
 * Build and render a TreeControl.
 * @param {string} rootName The name with which to label the tree's root.
 * @param {Element} renderPeg The DOM element under which to render the tree.
 * @param {Array.<string|Object|null>} data Data specifying the structure
 *     and content of the tree. A three-element array. The first
 *     element is the type of the root, used to determine the root's icon. The
 *     second element is the url to which the root's link should point, if any.
 *     The third element is a map from names to data arrays for child nodes.
 * @return {grokdoc.TypedTreeControl} The root node of the tree.
 */
grokdoc.makeTree = function(rootName, renderPeg, data) {
  var root = new grokdoc.TypedTreeControl(rootName);

  var keys = goog.object.getKeys(data[2]);
  keys.sort();
  for (var k = 0; k < keys.length; k++) {
    var key = keys[k];
    grokdoc.extendTree(root, key, data[2][key]);
  }
  root.render(renderPeg);
  root.setExpanded(true);
  return root;
};

/**
 * A class to manage the tabs on an index page.
 * @param {Element} barElt The element to decorate with a TabBar.
 * @constructor
 */
grokdoc.TabManager = function(barElt) {
  var elt = goog.dom.getElement(barElt);
  this.tabs = new goog.ui.TabBar();
  this.tabs.decorate(elt);
  this.tabToPageMap = {};
  this.currTab = null;

  goog.events.listen(this.tabs, goog.ui.Component.EventType.SELECT,
                     this.selectHandler, false, this);
};

/**
 * Builds an index tree under a tab, given data for the tree.
 * @param {string} tabName The name of the tab under which to build the tree.
 * @param {string} rootLabel A label for the root of the tree.
 * @param {Element} pageElm The element containing the tab's content.
 * @param {Array.<string|Object|null>} data Data specifying the structure
 *     and content of the tree. A three-element array. The first
 *     element is the type of the root, used to determine the root's icon. The
 *     second element is the url to which the root's link should point, if any.
 *     The third element is a map from names to data arrays for child nodes.
 */
grokdoc.TabManager.prototype.addTreeToTab = function(
    tabName, rootLabel, pageElm, data) {
  pageElm.style.display = 'none';

  var treeElts = goog.dom.getElementsByTagNameAndClass(
    'div', grokdoc.TREE_CLASS, pageElm);
  grokdoc.makeTree(rootLabel, treeElts[0], data);
  this.tabToPageMap[tabName] = pageElm;

  if (!this.currTab) {
    this.showTab(tabName);
  }
};

/**
 * Adds a plain tab (a tab without a tree).
 * @param {string} tabName The name of the tab.
 * @param {Element} pageElm The element containing the tab's content.
 *
 */
grokdoc.TabManager.prototype.addTab = function(tabName, pageElm) {
  pageElm.style.display = 'none';
  this.tabToPageMap[tabName] = pageElm;

  if (!this.currTab) {
    this.showTab(tabName);
  }
};

/**
 * Displays the content for a tab.
 * @param {string} tabName The name of the tab to display.
 */
grokdoc.TabManager.prototype.showTab = function(tabName) {
  if (this.currTab) {
    var page = this.tabToPageMap[this.currTab];
    page.style.display = 'none';
  }
  this.currTab = tabName;
  this.tabToPageMap[this.currTab].style.display = 'block';
};

/**
 * The event handler to handle SELECT events indicating a tab click. Displays
 * the clicked tab's content.
 * @param {goog.events.Event} e The event to handle.
 */
grokdoc.TabManager.prototype.selectHandler = function(e) {
  this.showTab(e.target.getCaption());
};


//============== Main:

function load() {

  /**
   * Takes grokdoc index data and adds two tabs to the page: one
   * tab containing a tree widget for the file index, and one
   * containing a tree widget for the type index. To be used as a
   * callback for the IndexDownloader.
   *
   * @param {Object} data An object specifying the structure
   *     and content of the index trees. The object must have two properties:
   *     a 'typeIndex' property containing the package tree for the type index,
   *     and a 'fileIndex' property containing the directory tree for the file
   *     index. For both trees, a tree node is represented by a three-element
   *     array. The first element specifies the kind of icon that should be
   *     displayed for the tree node. The second element is the url to which
   *     the root's link should point, if any. The third element is a map from
   *     names to data arrays for child nodes.
   */
  function makeTabs(data) {
    // The type index is added under a tab named 'Class Index', with a root
    // node named 'goog', within the element classPage. The classPage element
    // and the tabbar object tabs are provided via closure so that this function
    // can serve as an IndexDownloader callback.
    tabs.addTreeToTab('Type Index', 'goog', typePage,
                      data['typeIndex'][2]['goog']);
    // The file index is added under a tab named 'File Index', with a root
    // node named 'Source', within the element filePage.
    tabs.addTreeToTab('File Index', 'Source', filePage,
                      data['fileIndex']);
    // The demos tab is optional:
    if (demoPage) {
      tabs.addTab('Demos', demoPage);
    }
    goog.dom.getElement('loading').style.display = 'none';
  }

  /**
   * Expands a tree node. For use as an argument to
   * grokdoc.TypedTreeNode.followPath().
   * @param {goog.ui.tree.TreeNode} node The node to expand.
   */
  function expandPathToNode(node) {
    node.setExpanded(true);
  }

  /**
   * Sets a boolean flag on a node to indicate that the node represents the
   * type or file that is the subject of the current page, and initializes
   * the CSS class of the node's element.
   * @param {grokdoc.TypedTreeNode} node The node to mark.
   * @param {grokdoc.TypedTreeNode} parent The parent of the node to mark.
   */
  function markAsCurrentNode(node, parent) {
    // Can't get to child DOM until parent is expanded, so we expand it.
    parent.setExpanded(true);
    node.setCurrent(true);
    goog.dom.classes.add(node.getRowElement(),
        grokdoc.TypedTreeNode.CURRENT_CLASS);
    parent.setExpanded(false);
  }

  /**
   * Builds a div that displays the local structure of the tree: the current
   * page's topic, along with its siblings.
   * @param {grokdoc.TypedTreeNode} node The node represented by the current
   *     page.
   * @param {grokdoc.TypedTreeNode} parent The parent of the current page's
   *     page.
   */
  function buildLocalView(node, parent) {
    var localView = goog.dom.getElement('localView');
    var siblings = parent.getChildren();
    for (var c = 0; c < siblings.length; c++) {
      if (siblings[c].getType() == 'namespace') {
        continue;
      }
      var row = goog.dom.createDom('div');
      row.innerHTML = siblings[c].getHtml();
      localView.appendChild(row);

      if (siblings[c] == node) {
        goog.dom.classes.add(row, grokdoc.TypedTreeNode.CURRENT_CLASS);
      }
      else {
        goog.dom.classes.add(row, 'localView');
      }
    }
  }

  /**
   * Adds a type index tree to a sidebar in the page.
   * @param {Element} sideIndexElt The element under which to build the tree.
   * @param {boolean} isTypeIndex Whether the index is a type index (indicated
   *      by a value of true) or a file index (indicated by false).
   * @param {Object} data An object specifying the structure
   *     and content of the index trees. See comment on makeTabs() above.
   */
  function makeSideIndex(sideIndexElt, isTypeIndex, data) {
    var currentNodePath = sideIndexElt.getAttribute('current');
    var rootPath = sideIndexElt.getAttribute('rootPath');

    var separator = isTypeIndex ? '.' : '/';
    var fullTreeData = isTypeIndex ? data['typeIndex'] : data['fileIndex'];
    var indexData = getRoot(fullTreeData, rootPath, separator);

    var root = grokdoc.makeTree('<span style="display:none;"></span>',
        sideIndexElt, indexData);
    grokdoc.TypedTreeNode.followPath(separator, currentNodePath, root,
        null, buildLocalView);
  }

  /**
   * Selects the portion of the data tree to use for building the
   * index tree widget.
   * @param {Object} data An object specifying the structure
   *     and content of the index trees. See comment on makeTabs() above.
   * @param {string} rootPath A path string indicating the tree node we
   *     want to treat as the root of the tree. Only children of this node
   *     will be displayed in the index tree.
   * @param {string} separator The separator for the rootPath. Should be '.'
   *     for the typeIndex and '/' for the file index.
   * @return {Object} The branch of data to use to build the index tree.
   */
  function getRoot(data, rootPath, separator) {
    var nodeNames = rootPath.split(separator);
    var root = data;
    for (var i = 0; i < nodeNames.length; i++) {
      root = root[2][nodeNames[i]];
    }
    return root;
  }

  /**
   * Sets the visibility of all elements with a given CSS class.
   * @param {string} classname The CSS class for which to set visibility.
   * @param {boolean} visible  Whether to show or hide elements with the
   *     the given class.
   */
  function toggleClass(classname, visible) {
    var elts = goog.dom.getElementsByTagNameAndClass(null, classname);

    for (var i = 0; i < elts.length; i++) {
      goog.style.showElement(elts[i], visible);
    }
  }

  /**
   * Returns an event listener function for a goog.ui.Checkbox. The listener
   * sets the visibility of all elements with a given CSS class to match the
   * state of the checkbox.
   * @param {string} classname The CSS class to hide and show.
   * @return {Function} A listener function.
   */
  function getAclListener(classname) {
    return function(event) {
        toggleClass(classname, this.isChecked());
      };
  }

  /**
   * Sets up the interface for the page. Triggered after image loader
   * completes.
   *
   * @param {goog.events.Event} e The event that triggers the initializing of
   *     the interface.
   */
  function initDom(e) {
    var managers = grokdoc.zippifyAllDetails();
    var tooltips = grokdoc.tippifyAllEntries();

    var downloader = new grokdoc.IndexDownloader();

    var acField = document.getElementById('ac');
    var selector = acField ? new grokdoc.Selector(acField): null;
    if (selector) {
      downloader.registerCallback(selector.buildAc, selector);
    }

    var acls = document.getElementById('acls');
    if (acls) {
      var aclBoxes = goog.dom.getElementsByTagNameAndClass(
          null, 'aclbox', acls);
      for (var i = 0; i < aclBoxes.length; i++) {
        var boxController = new goog.ui.Checkbox(true);
        var accessLevel = aclBoxes[i].getAttribute('accessLevel');
        var boxListener = getAclListener(accessLevel);
        goog.events.listen(boxController, goog.ui.Component.EventType.CHANGE,
            boxListener);
        boxController.decorate(aclBoxes[i]);
      }
    }

    if (tabs) {
      downloader.registerCallback(makeTabs);
    }

    var sideTypeIndex = goog.dom.getElement('sideTypeIndex');
    if (sideTypeIndex) {
      downloader.registerCallback(
          goog.partial(makeSideIndex, sideTypeIndex, true));
    }

    var sideFileIndex = goog.dom.getElement('sideFileIndex');
    if (sideFileIndex) {
      downloader.registerCallback(
          goog.partial(makeSideIndex, sideFileIndex, false));
    }

    downloader.send('doc_json_index.js?zx=' + Math.random());

    var legends = goog.dom.getElementsByTagNameAndClass('div',
        grokdoc.LEGEND_CLASS);
    for (var i = 0, legend; legend = legends[i]; i++) {
      var augmentedLegend = new grokdoc.AugmentedLegend(legend);
    }
  }

  var tabbar = goog.dom.getElement('tabbar');
  var typePage = goog.dom.getElement('typePage');
  var filePage = goog.dom.getElement('filePage');
  var demoPage = goog.dom.getElement('demoPage');

  // The demoPage is optional, but we require the typePage and the filePage.
  var tabs = tabbar && typePage && filePage ?
      new grokdoc.TabManager(tabbar): null;

  var imgLoader = new goog.net.ImageLoader();
  var imgNames = ['I.png', 'check-outline.gif', 'custom-logo.png',
    'minus.png', 'arrow.gif', 'check.gif', 'inherit.gif', 'plus.png',
    'blank.gif', 'cleardot.gif', 'loading.gif', 'sidetree.png',
    'bluearrow.png', 'logo.png', 'tree.png'];
  goog.array.forEach(imgNames, function(elt, i, arr) {
      imgLoader.addImage(elt, _staticFilePath + 'images/' + elt);
    });

  goog.events.listen(imgLoader, goog.net.EventType.COMPLETE, initDom);
  imgLoader.start();
}

goog.events.listenOnce(window, 'load', load);
