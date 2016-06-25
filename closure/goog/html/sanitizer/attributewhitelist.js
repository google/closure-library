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


/**
 * @fileoverview Contains the attribute whitelist for use in the Html sanitizer.
 */

goog.provide('goog.html.sanitizer.AttributeWhitelist');


/**
 * A tag whitelist for allowed attributes.
 * @const @dict {boolean}
 */
goog.html.sanitizer.AttributeWhitelist = {
  '* ARIA-CHECKED': true,
  '* ARIA-DESCRIBEDBY': true,
  '* ARIA-DISABLED': true,
  '* ARIA-LABEL': true,
  '* ARIA-LABELLEDBY': true,
  '* ARIA-READONLY': true,
  '* ARIA-REQUIRED': true,
  '* ARIA-SELECTED': true,
  '* ABBR': true,
  '* ACCEPT': true,
  '* ACCESSKEY': true,
  '* ALIGN': true,
  '* ALT': true,
  '* AUTOCOMPLETE': true,
  '* AXIS': true,
  '* BGCOLOR': true,
  '* BORDER': true,
  '* CELLPADDING': true,
  '* CELLSPACING': true,
  '* CHAROFF': true,
  '* CHAR': true,
  '* CHECKED': true,
  '* CLEAR': true,
  '* COLOR': true,
  '* COLSPAN': true,
  '* COLS': true,
  '* COMPACT': true,
  '* COORDS': true,
  '* DATETIME': true,
  '* DIR': true,
  '* DISABLED': true,
  '* ENCTYPE': true,
  '* FACE': true,
  '* FRAME': true,
  '* HEIGHT': true,
  '* HREFLANG': true,
  '* HSPACE': true,
  '* ISMAP': true,
  '* LABEL': true,
  '* LANG': true,
  '* MAXLENGTH': true,
  '* METHOD': true,
  '* MULTIPLE': true,
  '* NOHREF': true,
  '* NOSHADE': true,
  '* NOWRAP': true,
  '* READONLY': true,
  '* REL': true,
  '* REV': true,
  '* ROWSPAN': true,
  '* ROWS': true,
  '* RULES': true,
  '* SCOPE': true,
  '* SELECTED': true,
  '* SHAPE': true,
  '* SIZE': true,
  '* SPAN': true,
  '* START': true,
  '* SUMMARY': true,
  '* TABINDEX': true,
  '* TITLE': true,
  '* TYPE': true,
  '* VALIGN': true,
  '* VALUE': true,
  '* VSPACE': true,
  '* WIDTH': true
};
