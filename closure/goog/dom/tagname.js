/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Defines the goog.dom.TagName class. Its constants enumerate
 * all HTML tag names specified in either the W3C HTML 4.01 index of elements
 * or the HTML5.1 specification.
 *
 * References:
 * https://www.w3.org/TR/html401/index/elements.html
 * https://www.w3.org/TR/html51/dom.html#elements
 */
goog.provide('goog.dom.TagName');

goog.require('goog.dom.HtmlElement');

/**
 * A tag name for an HTML element.
 *
 * This type is a lie. All instances are actually strings. Do not implement it.
 *
 * It exists because we need an object type to host the template type parameter,
 * and that's not possible with literal or enum types. It is a record type so
 * that runtime type checks don't try to validate the lie.
 *
 * @template T
 * @record
 */
goog.dom.TagName = class {
  /**
   * Cast a string into the tagname for the associated constructor.
   *
   * @template T
   * @param {string} name
   * @param {function(new:T, ...?)} type
   * @return {!goog.dom.TagName<T>}
   */
  static cast(name, type) {
    return /** @type {?} */ (name);
  }

  constructor() {
    /** @private {null} */
    this.googDomTagName_doNotImplementThisTypeOrElse_;

    /** @private {T} */
    this.ensureTypeScriptRemembersTypeT_;
  }

  /**
   * Appease the compiler that instances are stringafiable for the
   * purpose of being a dictionary key.
   *
   * Never implemented; always backed by `String::toString`.
   *
   * @override
   * @return {string}
   */
  toString() {}

  /**
   * Create a `TagName` with no inference.
   *
   * A lot of element constructors in the spec don't exist in various VMs and
   * cause runtime errors when accessed. Therefore, within this file, we define
   * the `TagName`s for those types without referencing the constructors.
   *
   * @param {string} name
   * @return {!goog.dom.TagName<?>}
   * @private
   */
  static privateCast_(name) {
    return /** @type {?} */ (name);
  }
};



/** @const {!goog.dom.TagName<!HTMLAnchorElement>} */
goog.dom.TagName.A = goog.dom.TagName.privateCast_('A');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.ABBR = goog.dom.TagName.privateCast_('ABBR');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.ACRONYM = goog.dom.TagName.privateCast_('ACRONYM');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.ADDRESS = goog.dom.TagName.privateCast_('ADDRESS');

/** @const {!goog.dom.TagName<!HTMLAppletElement>} */
goog.dom.TagName.APPLET = goog.dom.TagName.privateCast_('APPLET');

/** @const {!goog.dom.TagName<!HTMLAreaElement>} */
goog.dom.TagName.AREA = goog.dom.TagName.privateCast_('AREA');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.ARTICLE = goog.dom.TagName.privateCast_('ARTICLE');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.ASIDE = goog.dom.TagName.privateCast_('ASIDE');

/** @const {!goog.dom.TagName<!HTMLAudioElement>} */
goog.dom.TagName.AUDIO = goog.dom.TagName.privateCast_('AUDIO');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.B = goog.dom.TagName.privateCast_('B');

/** @const {!goog.dom.TagName<!HTMLBaseElement>} */
goog.dom.TagName.BASE = goog.dom.TagName.privateCast_('BASE');

/** @const {!goog.dom.TagName<!HTMLBaseFontElement>} */
goog.dom.TagName.BASEFONT = goog.dom.TagName.privateCast_('BASEFONT');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.BDI = goog.dom.TagName.privateCast_('BDI');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.BDO = goog.dom.TagName.privateCast_('BDO');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.BIG = goog.dom.TagName.privateCast_('BIG');

/** @const {!goog.dom.TagName<!HTMLQuoteElement>} */
goog.dom.TagName.BLOCKQUOTE = goog.dom.TagName.privateCast_('BLOCKQUOTE');

/** @const {!goog.dom.TagName<!HTMLBodyElement>} */
goog.dom.TagName.BODY = goog.dom.TagName.privateCast_('BODY');

/** @const {!goog.dom.TagName<!HTMLBRElement>} */
goog.dom.TagName.BR = goog.dom.TagName.privateCast_('BR');

/** @const {!goog.dom.TagName<!HTMLButtonElement>} */
goog.dom.TagName.BUTTON = goog.dom.TagName.privateCast_('BUTTON');

/** @const {!goog.dom.TagName<!HTMLCanvasElement>} */
goog.dom.TagName.CANVAS = goog.dom.TagName.privateCast_('CANVAS');

/** @const {!goog.dom.TagName<!HTMLTableCaptionElement>} */
goog.dom.TagName.CAPTION = goog.dom.TagName.privateCast_('CAPTION');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.CENTER = goog.dom.TagName.privateCast_('CENTER');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.CITE = goog.dom.TagName.privateCast_('CITE');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.CODE = goog.dom.TagName.privateCast_('CODE');

/** @const {!goog.dom.TagName<!HTMLTableColElement>} */
goog.dom.TagName.COL = goog.dom.TagName.privateCast_('COL');

/** @const {!goog.dom.TagName<!HTMLTableColElement>} */
goog.dom.TagName.COLGROUP = goog.dom.TagName.privateCast_('COLGROUP');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.COMMAND = goog.dom.TagName.privateCast_('COMMAND');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.DATA = goog.dom.TagName.privateCast_('DATA');

/** @const {!goog.dom.TagName<!HTMLDataListElement>} */
goog.dom.TagName.DATALIST = goog.dom.TagName.privateCast_('DATALIST');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.DD = goog.dom.TagName.privateCast_('DD');

/** @const {!goog.dom.TagName<!HTMLModElement>} */
goog.dom.TagName.DEL = goog.dom.TagName.privateCast_('DEL');

/** @const {!goog.dom.TagName<!HTMLDetailsElement>} */
goog.dom.TagName.DETAILS = goog.dom.TagName.privateCast_('DETAILS');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.DFN = goog.dom.TagName.privateCast_('DFN');

/** @const {!goog.dom.TagName<!HTMLDialogElement>} */
goog.dom.TagName.DIALOG = goog.dom.TagName.privateCast_('DIALOG');

/** @const {!goog.dom.TagName<!HTMLDirectoryElement>} */
goog.dom.TagName.DIR = goog.dom.TagName.privateCast_('DIR');

/** @const {!goog.dom.TagName<!HTMLDivElement>} */
goog.dom.TagName.DIV = goog.dom.TagName.privateCast_('DIV');

/** @const {!goog.dom.TagName<!HTMLDListElement>} */
goog.dom.TagName.DL = goog.dom.TagName.privateCast_('DL');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.DT = goog.dom.TagName.privateCast_('DT');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.EM = goog.dom.TagName.privateCast_('EM');

/** @const {!goog.dom.TagName<!HTMLEmbedElement>} */
goog.dom.TagName.EMBED = goog.dom.TagName.privateCast_('EMBED');

/** @const {!goog.dom.TagName<!HTMLFieldSetElement>} */
goog.dom.TagName.FIELDSET = goog.dom.TagName.privateCast_('FIELDSET');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.FIGCAPTION = goog.dom.TagName.privateCast_('FIGCAPTION');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.FIGURE = goog.dom.TagName.privateCast_('FIGURE');

/** @const {!goog.dom.TagName<!HTMLFontElement>} */
goog.dom.TagName.FONT = goog.dom.TagName.privateCast_('FONT');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.FOOTER = goog.dom.TagName.privateCast_('FOOTER');

/** @const {!goog.dom.TagName<!HTMLFormElement>} */
goog.dom.TagName.FORM = goog.dom.TagName.privateCast_('FORM');

/** @const {!goog.dom.TagName<!HTMLFrameElement>} */
goog.dom.TagName.FRAME = goog.dom.TagName.privateCast_('FRAME');

/** @const {!goog.dom.TagName<!HTMLFrameSetElement>} */
goog.dom.TagName.FRAMESET = goog.dom.TagName.privateCast_('FRAMESET');

/** @const {!goog.dom.TagName<!HTMLHeadingElement>} */
goog.dom.TagName.H1 = goog.dom.TagName.privateCast_('H1');

/** @const {!goog.dom.TagName<!HTMLHeadingElement>} */
goog.dom.TagName.H2 = goog.dom.TagName.privateCast_('H2');

/** @const {!goog.dom.TagName<!HTMLHeadingElement>} */
goog.dom.TagName.H3 = goog.dom.TagName.privateCast_('H3');

/** @const {!goog.dom.TagName<!HTMLHeadingElement>} */
goog.dom.TagName.H4 = goog.dom.TagName.privateCast_('H4');

/** @const {!goog.dom.TagName<!HTMLHeadingElement>} */
goog.dom.TagName.H5 = goog.dom.TagName.privateCast_('H5');

/** @const {!goog.dom.TagName<!HTMLHeadingElement>} */
goog.dom.TagName.H6 = goog.dom.TagName.privateCast_('H6');

/** @const {!goog.dom.TagName<!HTMLHeadElement>} */
goog.dom.TagName.HEAD = goog.dom.TagName.privateCast_('HEAD');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.HEADER = goog.dom.TagName.privateCast_('HEADER');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.HGROUP = goog.dom.TagName.privateCast_('HGROUP');

/** @const {!goog.dom.TagName<!HTMLHRElement>} */
goog.dom.TagName.HR = goog.dom.TagName.privateCast_('HR');

/** @const {!goog.dom.TagName<!HTMLHtmlElement>} */
goog.dom.TagName.HTML = goog.dom.TagName.privateCast_('HTML');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.I = goog.dom.TagName.privateCast_('I');

/** @const {!goog.dom.TagName<!HTMLIFrameElement>} */
goog.dom.TagName.IFRAME = goog.dom.TagName.privateCast_('IFRAME');

/** @const {!goog.dom.TagName<!HTMLImageElement>} */
goog.dom.TagName.IMG = goog.dom.TagName.privateCast_('IMG');

/** @const {!goog.dom.TagName<!HTMLInputElement>} */
goog.dom.TagName.INPUT = goog.dom.TagName.privateCast_('INPUT');

/** @const {!goog.dom.TagName<!HTMLModElement>} */
goog.dom.TagName.INS = goog.dom.TagName.privateCast_('INS');

/** @const {!goog.dom.TagName<!HTMLIsIndexElement>} */
goog.dom.TagName.ISINDEX = goog.dom.TagName.privateCast_('ISINDEX');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.KBD = goog.dom.TagName.privateCast_('KBD');

// HTMLKeygenElement is deprecated.
/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.KEYGEN = goog.dom.TagName.privateCast_('KEYGEN');

/** @const {!goog.dom.TagName<!HTMLLabelElement>} */
goog.dom.TagName.LABEL = goog.dom.TagName.privateCast_('LABEL');

/** @const {!goog.dom.TagName<!HTMLLegendElement>} */
goog.dom.TagName.LEGEND = goog.dom.TagName.privateCast_('LEGEND');

/** @const {!goog.dom.TagName<!HTMLLIElement>} */
goog.dom.TagName.LI = goog.dom.TagName.privateCast_('LI');

/** @const {!goog.dom.TagName<!HTMLLinkElement>} */
goog.dom.TagName.LINK = goog.dom.TagName.privateCast_('LINK');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.MAIN = goog.dom.TagName.privateCast_('MAIN');

/** @const {!goog.dom.TagName<!HTMLMapElement>} */
goog.dom.TagName.MAP = goog.dom.TagName.privateCast_('MAP');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.MARK = goog.dom.TagName.privateCast_('MARK');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.MATH = goog.dom.TagName.privateCast_('MATH');

/** @const {!goog.dom.TagName<!HTMLMenuElement>} */
goog.dom.TagName.MENU = goog.dom.TagName.privateCast_('MENU');

/** @const {!goog.dom.TagName<!HTMLMenuItemElement>} */
goog.dom.TagName.MENUITEM = goog.dom.TagName.privateCast_('MENUITEM');

/** @const {!goog.dom.TagName<!HTMLMetaElement>} */
goog.dom.TagName.META = goog.dom.TagName.privateCast_('META');

/** @const {!goog.dom.TagName<!HTMLMeterElement>} */
goog.dom.TagName.METER = goog.dom.TagName.privateCast_('METER');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.NAV = goog.dom.TagName.privateCast_('NAV');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.NOFRAMES = goog.dom.TagName.privateCast_('NOFRAMES');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.NOSCRIPT = goog.dom.TagName.privateCast_('NOSCRIPT');

/** @const {!goog.dom.TagName<!HTMLObjectElement>} */
goog.dom.TagName.OBJECT = goog.dom.TagName.privateCast_('OBJECT');

/** @const {!goog.dom.TagName<!HTMLOListElement>} */
goog.dom.TagName.OL = goog.dom.TagName.privateCast_('OL');

/** @const {!goog.dom.TagName<!HTMLOptGroupElement>} */
goog.dom.TagName.OPTGROUP = goog.dom.TagName.privateCast_('OPTGROUP');

/** @const {!goog.dom.TagName<!HTMLOptionElement>} */
goog.dom.TagName.OPTION = goog.dom.TagName.privateCast_('OPTION');

/** @const {!goog.dom.TagName<!HTMLOutputElement>} */
goog.dom.TagName.OUTPUT = goog.dom.TagName.privateCast_('OUTPUT');

/** @const {!goog.dom.TagName<!HTMLParagraphElement>} */
goog.dom.TagName.P = goog.dom.TagName.privateCast_('P');

/** @const {!goog.dom.TagName<!HTMLParamElement>} */
goog.dom.TagName.PARAM = goog.dom.TagName.privateCast_('PARAM');

/** @const {!goog.dom.TagName<!HTMLPictureElement>} */
goog.dom.TagName.PICTURE = goog.dom.TagName.privateCast_('PICTURE');

/** @const {!goog.dom.TagName<!HTMLPreElement>} */
goog.dom.TagName.PRE = goog.dom.TagName.privateCast_('PRE');

/** @const {!goog.dom.TagName<!HTMLProgressElement>} */
goog.dom.TagName.PROGRESS = goog.dom.TagName.privateCast_('PROGRESS');

/** @const {!goog.dom.TagName<!HTMLQuoteElement>} */
goog.dom.TagName.Q = goog.dom.TagName.privateCast_('Q');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.RP = goog.dom.TagName.privateCast_('RP');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.RT = goog.dom.TagName.privateCast_('RT');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.RTC = goog.dom.TagName.privateCast_('RTC');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.RUBY = goog.dom.TagName.privateCast_('RUBY');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.S = goog.dom.TagName.privateCast_('S');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.SAMP = goog.dom.TagName.privateCast_('SAMP');

/** @const {!goog.dom.TagName<!HTMLScriptElement>} */
goog.dom.TagName.SCRIPT = goog.dom.TagName.privateCast_('SCRIPT');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.SECTION = goog.dom.TagName.privateCast_('SECTION');

/** @const {!goog.dom.TagName<!HTMLSelectElement>} */
goog.dom.TagName.SELECT = goog.dom.TagName.privateCast_('SELECT');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.SMALL = goog.dom.TagName.privateCast_('SMALL');

/** @const {!goog.dom.TagName<!HTMLSourceElement>} */
goog.dom.TagName.SOURCE = goog.dom.TagName.privateCast_('SOURCE');

/** @const {!goog.dom.TagName<!HTMLSpanElement>} */
goog.dom.TagName.SPAN = goog.dom.TagName.privateCast_('SPAN');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.STRIKE = goog.dom.TagName.privateCast_('STRIKE');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.STRONG = goog.dom.TagName.privateCast_('STRONG');

/** @const {!goog.dom.TagName<!HTMLStyleElement>} */
goog.dom.TagName.STYLE = goog.dom.TagName.privateCast_('STYLE');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.SUB = goog.dom.TagName.privateCast_('SUB');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.SUMMARY = goog.dom.TagName.privateCast_('SUMMARY');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.SUP = goog.dom.TagName.privateCast_('SUP');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.SVG = goog.dom.TagName.privateCast_('SVG');

/** @const {!goog.dom.TagName<!HTMLTableElement>} */
goog.dom.TagName.TABLE = goog.dom.TagName.privateCast_('TABLE');

/** @const {!goog.dom.TagName<!HTMLTableSectionElement>} */
goog.dom.TagName.TBODY = goog.dom.TagName.privateCast_('TBODY');

/** @const {!goog.dom.TagName<!HTMLTableCellElement>} */
goog.dom.TagName.TD = goog.dom.TagName.privateCast_('TD');

/** @const {!goog.dom.TagName<!HTMLTemplateElement>} */
goog.dom.TagName.TEMPLATE = goog.dom.TagName.privateCast_('TEMPLATE');

/** @const {!goog.dom.TagName<!HTMLTextAreaElement>} */
goog.dom.TagName.TEXTAREA = goog.dom.TagName.privateCast_('TEXTAREA');

/** @const {!goog.dom.TagName<!HTMLTableSectionElement>} */
goog.dom.TagName.TFOOT = goog.dom.TagName.privateCast_('TFOOT');

/** @const {!goog.dom.TagName<!HTMLTableCellElement>} */
goog.dom.TagName.TH = goog.dom.TagName.privateCast_('TH');

/** @const {!goog.dom.TagName<!HTMLTableSectionElement>} */
goog.dom.TagName.THEAD = goog.dom.TagName.privateCast_('THEAD');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.TIME = goog.dom.TagName.privateCast_('TIME');

/** @const {!goog.dom.TagName<!HTMLTitleElement>} */
goog.dom.TagName.TITLE = goog.dom.TagName.privateCast_('TITLE');

/** @const {!goog.dom.TagName<!HTMLTableRowElement>} */
goog.dom.TagName.TR = goog.dom.TagName.privateCast_('TR');

/** @const {!goog.dom.TagName<!HTMLTrackElement>} */
goog.dom.TagName.TRACK = goog.dom.TagName.privateCast_('TRACK');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.TT = goog.dom.TagName.privateCast_('TT');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.U = goog.dom.TagName.privateCast_('U');

/** @const {!goog.dom.TagName<!HTMLUListElement>} */
goog.dom.TagName.UL = goog.dom.TagName.privateCast_('UL');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.VAR = goog.dom.TagName.privateCast_('VAR');

/** @const {!goog.dom.TagName<!HTMLVideoElement>} */
goog.dom.TagName.VIDEO = goog.dom.TagName.privateCast_('VIDEO');

/** @const {!goog.dom.TagName<!goog.dom.HtmlElement>} */
goog.dom.TagName.WBR = goog.dom.TagName.privateCast_('WBR');
