// Copyright 2016 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.dom.TypedTagName');



/**
 * A tag name with the type of the element stored in the generic.
 * @param {string} tagName
 * @constructor
 * @template T
 */
goog.dom.TypedTagName = function(tagName) {
  /** @private {string} */
  this.tagName_ = tagName;
};


/**
 * Returns the tag name.
 * @return {string}
 * @override
 */
goog.dom.TypedTagName.prototype.toString = function() {
  return this.tagName_;
};


/** @type {!goog.dom.TypedTagName<!HTMLAnchorElement>} */
goog.dom.TypedTagName.A = new goog.dom.TypedTagName('A');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.ABBR = new goog.dom.TypedTagName('ABBR');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.ACRONYM = new goog.dom.TypedTagName('ACRONYM');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.ADDRESS = new goog.dom.TypedTagName('ADDRESS');


/** @type {!goog.dom.TypedTagName<!HTMLAppletElement>} */
goog.dom.TypedTagName.APPLET = new goog.dom.TypedTagName('APPLET');


/** @type {!goog.dom.TypedTagName<!HTMLAreaElement>} */
goog.dom.TypedTagName.AREA = new goog.dom.TypedTagName('AREA');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.ARTICLE = new goog.dom.TypedTagName('ARTICLE');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.ASIDE = new goog.dom.TypedTagName('ASIDE');


/** @type {!goog.dom.TypedTagName<!HTMLAudioElement>} */
goog.dom.TypedTagName.AUDIO = new goog.dom.TypedTagName('AUDIO');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.B = new goog.dom.TypedTagName('B');


/** @type {!goog.dom.TypedTagName<!HTMLBaseElement>} */
goog.dom.TypedTagName.BASE = new goog.dom.TypedTagName('BASE');


/** @type {!goog.dom.TypedTagName<!HTMLBaseFontElement>} */
goog.dom.TypedTagName.BASEFONT = new goog.dom.TypedTagName('BASEFONT');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.BDI = new goog.dom.TypedTagName('BDI');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.BDO = new goog.dom.TypedTagName('BDO');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.BIG = new goog.dom.TypedTagName('BIG');


/** @type {!goog.dom.TypedTagName<!HTMLQuoteElement>} */
goog.dom.TypedTagName.BLOCKQUOTE = new goog.dom.TypedTagName('BLOCKQUOTE');


/** @type {!goog.dom.TypedTagName<!HTMLBodyElement>} */
goog.dom.TypedTagName.BODY = new goog.dom.TypedTagName('BODY');


/** @type {!goog.dom.TypedTagName<!HTMLBRElement>} */
goog.dom.TypedTagName.BR = new goog.dom.TypedTagName('BR');


/** @type {!goog.dom.TypedTagName<!HTMLButtonElement>} */
goog.dom.TypedTagName.BUTTON = new goog.dom.TypedTagName('BUTTON');


/** @type {!goog.dom.TypedTagName<!HTMLCanvasElement>} */
goog.dom.TypedTagName.CANVAS = new goog.dom.TypedTagName('CANVAS');


/** @type {!goog.dom.TypedTagName<!HTMLTableCaptionElement>} */
goog.dom.TypedTagName.CAPTION = new goog.dom.TypedTagName('CAPTION');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.CENTER = new goog.dom.TypedTagName('CENTER');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.CITE = new goog.dom.TypedTagName('CITE');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.CODE = new goog.dom.TypedTagName('CODE');


/** @type {!goog.dom.TypedTagName<!HTMLTableColElement>} */
goog.dom.TypedTagName.COL = new goog.dom.TypedTagName('COL');


/** @type {!goog.dom.TypedTagName<!HTMLTableColElement>} */
goog.dom.TypedTagName.COLGROUP = new goog.dom.TypedTagName('COLGROUP');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.COMMAND = new goog.dom.TypedTagName('COMMAND');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.DATA = new goog.dom.TypedTagName('DATA');


/** @type {!goog.dom.TypedTagName<!HTMLDataListElement>} */
goog.dom.TypedTagName.DATALIST = new goog.dom.TypedTagName('DATALIST');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.DD = new goog.dom.TypedTagName('DD');


/** @type {!goog.dom.TypedTagName<!HTMLModElement>} */
goog.dom.TypedTagName.DEL = new goog.dom.TypedTagName('DEL');


/** @type {!goog.dom.TypedTagName<!HTMLDetailsElement>} */
goog.dom.TypedTagName.DETAILS = new goog.dom.TypedTagName('DETAILS');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.DFN = new goog.dom.TypedTagName('DFN');


/** @type {!goog.dom.TypedTagName<!HTMLDialogElement>} */
goog.dom.TypedTagName.DIALOG = new goog.dom.TypedTagName('DIALOG');


/** @type {!goog.dom.TypedTagName<!HTMLDirectoryElement>} */
goog.dom.TypedTagName.DIR = new goog.dom.TypedTagName('DIR');


/** @type {!goog.dom.TypedTagName<!HTMLDivElement>} */
goog.dom.TypedTagName.DIV = new goog.dom.TypedTagName('DIV');


/** @type {!goog.dom.TypedTagName<!HTMLDListElement>} */
goog.dom.TypedTagName.DL = new goog.dom.TypedTagName('DL');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.DT = new goog.dom.TypedTagName('DT');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.EM = new goog.dom.TypedTagName('EM');


/** @type {!goog.dom.TypedTagName<!HTMLEmbedElement>} */
goog.dom.TypedTagName.EMBED = new goog.dom.TypedTagName('EMBED');


/** @type {!goog.dom.TypedTagName<!HTMLFieldSetElement>} */
goog.dom.TypedTagName.FIELDSET = new goog.dom.TypedTagName('FIELDSET');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.FIGCAPTION = new goog.dom.TypedTagName('FIGCAPTION');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.FIGURE = new goog.dom.TypedTagName('FIGURE');


/** @type {!goog.dom.TypedTagName<!HTMLFontElement>} */
goog.dom.TypedTagName.FONT = new goog.dom.TypedTagName('FONT');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.FOOTER = new goog.dom.TypedTagName('FOOTER');


/** @type {!goog.dom.TypedTagName<!HTMLFormElement>} */
goog.dom.TypedTagName.FORM = new goog.dom.TypedTagName('FORM');


/** @type {!goog.dom.TypedTagName<!HTMLFrameElement>} */
goog.dom.TypedTagName.FRAME = new goog.dom.TypedTagName('FRAME');


/** @type {!goog.dom.TypedTagName<!HTMLFrameSetElement>} */
goog.dom.TypedTagName.FRAMESET = new goog.dom.TypedTagName('FRAMESET');


/** @type {!goog.dom.TypedTagName<!HTMLHeadingElement>} */
goog.dom.TypedTagName.H1 = new goog.dom.TypedTagName('H1');


/** @type {!goog.dom.TypedTagName<!HTMLHeadingElement>} */
goog.dom.TypedTagName.H2 = new goog.dom.TypedTagName('H2');


/** @type {!goog.dom.TypedTagName<!HTMLHeadingElement>} */
goog.dom.TypedTagName.H3 = new goog.dom.TypedTagName('H3');


/** @type {!goog.dom.TypedTagName<!HTMLHeadingElement>} */
goog.dom.TypedTagName.H4 = new goog.dom.TypedTagName('H4');


/** @type {!goog.dom.TypedTagName<!HTMLHeadingElement>} */
goog.dom.TypedTagName.H5 = new goog.dom.TypedTagName('H5');


/** @type {!goog.dom.TypedTagName<!HTMLHeadingElement>} */
goog.dom.TypedTagName.H6 = new goog.dom.TypedTagName('H6');


/** @type {!goog.dom.TypedTagName<!HTMLHeadElement>} */
goog.dom.TypedTagName.HEAD = new goog.dom.TypedTagName('HEAD');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.HEADER = new goog.dom.TypedTagName('HEADER');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.HGROUP = new goog.dom.TypedTagName('HGROUP');


/** @type {!goog.dom.TypedTagName<!HTMLHRElement>} */
goog.dom.TypedTagName.HR = new goog.dom.TypedTagName('HR');


/** @type {!goog.dom.TypedTagName<!HTMLHtmlElement>} */
goog.dom.TypedTagName.HTML = new goog.dom.TypedTagName('HTML');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.I = new goog.dom.TypedTagName('I');


/** @type {!goog.dom.TypedTagName<!HTMLIFrameElement>} */
goog.dom.TypedTagName.IFRAME = new goog.dom.TypedTagName('IFRAME');


/** @type {!goog.dom.TypedTagName<!HTMLImageElement>} */
goog.dom.TypedTagName.IMG = new goog.dom.TypedTagName('IMG');


/** @type {!goog.dom.TypedTagName<!HTMLInputElement>} */
goog.dom.TypedTagName.INPUT = new goog.dom.TypedTagName('INPUT');


/** @type {!goog.dom.TypedTagName<!HTMLModElement>} */
goog.dom.TypedTagName.INS = new goog.dom.TypedTagName('INS');


/** @type {!goog.dom.TypedTagName<!HTMLIsIndexElement>} */
goog.dom.TypedTagName.ISINDEX = new goog.dom.TypedTagName('ISINDEX');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.KBD = new goog.dom.TypedTagName('KBD');


// HTMLKeygenElement is deprecated.
/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.KEYGEN = new goog.dom.TypedTagName('KEYGEN');


/** @type {!goog.dom.TypedTagName<!HTMLLabelElement>} */
goog.dom.TypedTagName.LABEL = new goog.dom.TypedTagName('LABEL');


/** @type {!goog.dom.TypedTagName<!HTMLLegendElement>} */
goog.dom.TypedTagName.LEGEND = new goog.dom.TypedTagName('LEGEND');


/** @type {!goog.dom.TypedTagName<!HTMLLIElement>} */
goog.dom.TypedTagName.LI = new goog.dom.TypedTagName('LI');


/** @type {!goog.dom.TypedTagName<!HTMLLinkElement>} */
goog.dom.TypedTagName.LINK = new goog.dom.TypedTagName('LINK');


/** @type {!goog.dom.TypedTagName<!HTMLMapElement>} */
goog.dom.TypedTagName.MAP = new goog.dom.TypedTagName('MAP');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.MARK = new goog.dom.TypedTagName('MARK');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.MATH = new goog.dom.TypedTagName('MATH');


/** @type {!goog.dom.TypedTagName<!HTMLMenuElement>} */
goog.dom.TypedTagName.MENU = new goog.dom.TypedTagName('MENU');


/** @type {!goog.dom.TypedTagName<!HTMLMetaElement>} */
goog.dom.TypedTagName.META = new goog.dom.TypedTagName('META');


/** @type {!goog.dom.TypedTagName<!HTMLMeterElement>} */
goog.dom.TypedTagName.METER = new goog.dom.TypedTagName('METER');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.NAV = new goog.dom.TypedTagName('NAV');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.NOFRAMES = new goog.dom.TypedTagName('NOFRAMES');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.NOSCRIPT = new goog.dom.TypedTagName('NOSCRIPT');


/** @type {!goog.dom.TypedTagName<!HTMLObjectElement>} */
goog.dom.TypedTagName.OBJECT = new goog.dom.TypedTagName('OBJECT');


/** @type {!goog.dom.TypedTagName<!HTMLOListElement>} */
goog.dom.TypedTagName.OL = new goog.dom.TypedTagName('OL');


/** @type {!goog.dom.TypedTagName<!HTMLOptGroupElement>} */
goog.dom.TypedTagName.OPTGROUP = new goog.dom.TypedTagName('OPTGROUP');


/** @type {!goog.dom.TypedTagName<!HTMLOptionElement>} */
goog.dom.TypedTagName.OPTION = new goog.dom.TypedTagName('OPTION');


/** @type {!goog.dom.TypedTagName<!HTMLOutputElement>} */
goog.dom.TypedTagName.OUTPUT = new goog.dom.TypedTagName('OUTPUT');


/** @type {!goog.dom.TypedTagName<!HTMLParagraphElement>} */
goog.dom.TypedTagName.P = new goog.dom.TypedTagName('P');


/** @type {!goog.dom.TypedTagName<!HTMLParamElement>} */
goog.dom.TypedTagName.PARAM = new goog.dom.TypedTagName('PARAM');


/** @type {!goog.dom.TypedTagName<!HTMLPreElement>} */
goog.dom.TypedTagName.PRE = new goog.dom.TypedTagName('PRE');


/** @type {!goog.dom.TypedTagName<!HTMLProgressElement>} */
goog.dom.TypedTagName.PROGRESS = new goog.dom.TypedTagName('PROGRESS');


/** @type {!goog.dom.TypedTagName<!HTMLQuoteElement>} */
goog.dom.TypedTagName.Q = new goog.dom.TypedTagName('Q');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.RP = new goog.dom.TypedTagName('RP');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.RT = new goog.dom.TypedTagName('RT');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.RUBY = new goog.dom.TypedTagName('RUBY');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.S = new goog.dom.TypedTagName('S');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.SAMP = new goog.dom.TypedTagName('SAMP');


/** @type {!goog.dom.TypedTagName<!HTMLScriptElement>} */
goog.dom.TypedTagName.SCRIPT = new goog.dom.TypedTagName('SCRIPT');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.SECTION = new goog.dom.TypedTagName('SECTION');


/** @type {!goog.dom.TypedTagName<!HTMLSelectElement>} */
goog.dom.TypedTagName.SELECT = new goog.dom.TypedTagName('SELECT');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.SMALL = new goog.dom.TypedTagName('SMALL');


/** @type {!goog.dom.TypedTagName<!HTMLSourceElement>} */
goog.dom.TypedTagName.SOURCE = new goog.dom.TypedTagName('SOURCE');


/** @type {!goog.dom.TypedTagName<!HTMLSpanElement>} */
goog.dom.TypedTagName.SPAN = new goog.dom.TypedTagName('SPAN');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.STRIKE = new goog.dom.TypedTagName('STRIKE');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.STRONG = new goog.dom.TypedTagName('STRONG');


/** @type {!goog.dom.TypedTagName<!HTMLStyleElement>} */
goog.dom.TypedTagName.STYLE = new goog.dom.TypedTagName('STYLE');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.SUB = new goog.dom.TypedTagName('SUB');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.SUMMARY = new goog.dom.TypedTagName('SUMMARY');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.SUP = new goog.dom.TypedTagName('SUP');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.SVG = new goog.dom.TypedTagName('SVG');


/** @type {!goog.dom.TypedTagName<!HTMLTableElement>} */
goog.dom.TypedTagName.TABLE = new goog.dom.TypedTagName('TABLE');


/** @type {!goog.dom.TypedTagName<!HTMLTableSectionElement>} */
goog.dom.TypedTagName.TBODY = new goog.dom.TypedTagName('TBODY');


/** @type {!goog.dom.TypedTagName<!HTMLTableCellElement>} */
goog.dom.TypedTagName.TD = new goog.dom.TypedTagName('TD');


/** @type {!goog.dom.TypedTagName<!HTMLTemplateElement>} */
goog.dom.TypedTagName.TEMPLATE = new goog.dom.TypedTagName('TEMPLATE');


/** @type {!goog.dom.TypedTagName<!HTMLTextAreaElement>} */
goog.dom.TypedTagName.TEXTAREA = new goog.dom.TypedTagName('TEXTAREA');


/** @type {!goog.dom.TypedTagName<!HTMLTableSectionElement>} */
goog.dom.TypedTagName.TFOOT = new goog.dom.TypedTagName('TFOOT');


/** @type {!goog.dom.TypedTagName<!HTMLTableCellElement>} */
goog.dom.TypedTagName.TH = new goog.dom.TypedTagName('TH');


/** @type {!goog.dom.TypedTagName<!HTMLTableSectionElement>} */
goog.dom.TypedTagName.THEAD = new goog.dom.TypedTagName('THEAD');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.TIME = new goog.dom.TypedTagName('TIME');


/** @type {!goog.dom.TypedTagName<!HTMLTitleElement>} */
goog.dom.TypedTagName.TITLE = new goog.dom.TypedTagName('TITLE');


/** @type {!goog.dom.TypedTagName<!HTMLTableRowElement>} */
goog.dom.TypedTagName.TR = new goog.dom.TypedTagName('TR');


/** @type {!goog.dom.TypedTagName<!HTMLTrackElement>} */
goog.dom.TypedTagName.TRACK = new goog.dom.TypedTagName('TRACK');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.TT = new goog.dom.TypedTagName('TT');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.U = new goog.dom.TypedTagName('U');


/** @type {!goog.dom.TypedTagName<!HTMLUListElement>} */
goog.dom.TypedTagName.UL = new goog.dom.TypedTagName('UL');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.VAR = new goog.dom.TypedTagName('VAR');


/** @type {!goog.dom.TypedTagName<!HTMLVideoElement>} */
goog.dom.TypedTagName.VIDEO = new goog.dom.TypedTagName('VIDEO');


/** @type {!goog.dom.TypedTagName<!HTMLElement>} */
goog.dom.TypedTagName.WBR = new goog.dom.TypedTagName('WBR');
