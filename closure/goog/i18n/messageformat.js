// Copyright 2010 Google Inc. All Rights Reserved
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
 * @fileoverview Message/plural format library with locale support.
 *
 *
 * Message format grammar:
 *
 * messageFormatPattern := string ( "{" messageFormatElement "}" string )*
 * messageFormatElement := argumentIndex [ "," elementFormat ]
 * elementFormat := "plural" "," pluralStyle
 *                  | "select" "," selectStyle
 * pluralStyle :=  pluralFormatPattern
 * selectStyle :=  selectFormatPattern
 * pluralFormatPattern := [ "offset" ":" offsetIndex ] pluralForms*
 * selectFormatPattern := pluralForms*
 * pluralForms := stringKey "{" ( "{" messageFormatElement "}"|string )* "}"
 *
 *
 * Message example:
 *
 * In English:
 * I see {0, plural, offset:1
 *         =0 {no one at all}
 *         =1 {{1}}
 *         one {{1} and one other person}
 *         other {{1} and # other people}}
 * in {2}.
 *
 * Calling format([2, 'Mark', 'Athens']) would produce
 * "I see Mark and one other person in Athens." as output.
 *
 * Equivalent in Serbian, with exploded cases per locale requirement:
 * Ja {0, plural, offset:1
 *      =0 {ne vidim nikoga}
 *      =1 {vidim {1}}
 *      one {vidim {1} i jos # osobu}
 *      few {vidim {1} i jos # osobe}
 *      many {vidim {1} i jos # osoba}
 *      other {{1} i jos # osoba}
 *    } u {2}.
 *
 * See messageformat_test.html for more examples.
 */

goog.provide('goog.i18n.MessageFormat');

goog.require('goog.asserts');
goog.require('goog.i18n.NumberFormat');
goog.require('goog.i18n.pluralRules');



/**
 * Constructor of MessageFormat.
 * @param {string} pattern The pattern we parse and apply positional parameters
 *     to.
 * @constructor
 */
goog.i18n.MessageFormat = function(pattern) {
  /**
   * All encountered literals during parse stage. Keys are in form of
   * \uFDDF_x_ where x is a number, starting with 0 for double quote literal.
   * @type {Object}
   * @private
   */
  this.literals_ = {};

  /**
   * Input pattern gets parsed into objects for faster formatting.
   * @type {Array.<Object>}
   * @private
   */
  this.parsedPattern_ = [];

  /**
   * Locale aware number formatter.
   * @type {Object}
   * @private
   */
  this.numberFormatter_ = new goog.i18n.NumberFormat(
      goog.i18n.NumberFormat.Format.DECIMAL);

  this.parsePattern_(pattern);
};


/**
 * Literal strings, including '', are replaced with \uFDDF_x_ for
 * parsing purposes, and recovered during format phase.
 * \uFDDF is a Unicode nonprinting character, not expected to be found in the
 * typical message.
 * @type {string}
 * @private
 */
goog.i18n.MessageFormat.LITERAL_PLACEHOLDER_ = '\uFDDF_';


/**
 * Special case for quote literal.
 * _GooG_MeSsAgE_FoRMaT_LiTeRaL_x_ for parsing purposes, and recovered during
 * format phase.
 * @type {string}
 * @private
 */
goog.i18n.MessageFormat.QUOTE_LITERAL_PLACEHOLDER_ =
    goog.i18n.MessageFormat.LITERAL_PLACEHOLDER_ + '0_';


/**
 * Marks a string and block during parsing.
 * @enum {number}
 * @private
 */
goog.i18n.MessageFormat.Element_ = {
  STRING: 0,
  BLOCK: 1
};


/**
 * Block type.
 * @enum {number}
 * @private
 */
goog.i18n.MessageFormat.BlockType_ = {
  PLURAL: 0,
  SELECT: 1,
  NUMERIC: 2,
  STRING: 3,
  UNKNOWN: 4
};


/**
 * Mandatory option in both select and plural form.
 * @type {string}
 * @private
 */
goog.i18n.MessageFormat.OTHER_ = 'other';


/**
 * Regular expression for looking for placeholders in the message.
 * @type {RegExp}
 * @private
 */
goog.i18n.MessageFormat.REGEX_PLACEHOLDER_ = new RegExp(
    '(' + goog.i18n.MessageFormat.LITERAL_PLACEHOLDER_ + '\\d+_)', 'g');


/**
 * Formats a message.
 * @param {Array.<number|string>} positionalParameters Parameters that either
 *     influence the formatting or are used as actual data.
 *     I.e. in call to fmt.format([5, 'Angela']), array [5, 'Angela'] is
 *     positional parameter array. 1st parameter could mean 5 people, which
 *     could influence plural format, and 2nd parameter is just a data to be
 *     printed out in proper position.
 * @return {string} Formatted message. This throws an error if the message can't
 *     be formatted.
 */
goog.i18n.MessageFormat.prototype.format = function(positionalParameters) {
  if (this.parsedPattern_.length == 0) {
    return '';
  }

  var result = [];
  this.formatBlock_(this.parsedPattern_, positionalParameters, result);
  var message = result.join('');

  goog.asserts.assert(message.search('#') == -1, 'Not all # were replaced.');

  var literals = this.literals_;

  message = message.replace(goog.i18n.MessageFormat.REGEX_PLACEHOLDER_,
                            function(item) {
    var literal = literals[item];
    goog.asserts.assertString(literal, 'Undefined literal.');
    return literal;
  });

  var regexPlaceholder = new RegExp(
      '(' + goog.i18n.MessageFormat.QUOTE_LITERAL_PLACEHOLDER_ + ')', 'g');

  return message.replace(regexPlaceholder, function(item) {
    return literals[item];
  });
};


/**
 * Parse generic block and return a formatted string.
 * @param {!Array.<!Object>} parsedPattern Holds parsed tree.
 * @param {Array.<number|string>} positionalParameters Parameters that either
 *     influence the formatting or are used as actual data.
 * @param {!Array.<!string>} result Each formatting stage appends its product
 *     to the result.
 * @private
 */
goog.i18n.MessageFormat.prototype.formatBlock_ = function(
    parsedPattern, positionalParameters, result) {
  for (var i = 0; i < parsedPattern.length; i++) {
    switch (parsedPattern[i].type) {
      case goog.i18n.MessageFormat.BlockType_.STRING:
        result.push(parsedPattern[i].value);
        break;
      case goog.i18n.MessageFormat.BlockType_.NUMERIC:
        var value = positionalParameters[parsedPattern[i].value];
        goog.asserts.assertString(value, 'Format parameter is undefined.');
        result.push(value);
        break;
      case goog.i18n.MessageFormat.BlockType_.SELECT:
        var pattern = parsedPattern[i].value;
      this.formatSelectBlock_(pattern, positionalParameters, result);
        break;
      case goog.i18n.MessageFormat.BlockType_.PLURAL:
        var pattern = parsedPattern[i].value;
      this.formatPluralBlock_(pattern, positionalParameters, result);
        break;
      default:
        goog.asserts.fail('Unrecognized block type.');
    }
  }
};


/**
 * Formats select block. Only one option is selected.
 * @param {Object} parsedPattern JSON object containing select block info.
 * @param {Array.<number|string>} positionalParameters Parameters that either
 *     influence the formatting or are used as actual data.
 * @param {!Array.<!string>} result Each formatting stage appends its product
 *     to the result.
 * @private
 */
goog.i18n.MessageFormat.prototype.formatSelectBlock_ = function(
    parsedPattern, positionalParameters, result) {
  var argumentIndex = parsedPattern.argumentIndex;
  var option = parsedPattern[positionalParameters[argumentIndex]];
  if (!goog.isDef(option)) {
    option = parsedPattern[goog.i18n.MessageFormat.OTHER_];
    goog.asserts.assertArray(
        option, 'Invalid option or missing other option for select block.');
  }

  this.formatBlock_(option, positionalParameters, result);
};


/**
 * Formats plural block. Only one option is selected and all # are replaced.
 * @param {Object} parsedPattern JSON object containing plural block info.
 * @param {Array.<number|string>} positionalParameters Parameters that either
 *     influence the formatting or are used as actual data.
 * @param {!Array.<!string>} result Each formatting stage appends its product
 *     to the result.
 * @private
 */
goog.i18n.MessageFormat.prototype.formatPluralBlock_ = function(
    parsedPattern, positionalParameters, result) {
  var argumentIndex = parsedPattern.argumentIndex;
  var argumentOffset = parsedPattern.argumentOffset;
  var diff = positionalParameters[argumentIndex] - argumentOffset;

  // Check if there is an exact match.
  var option = parsedPattern[positionalParameters[argumentIndex]];
  if (!goog.isDef(option)) {
    goog.asserts.assert(diff >= 0, 'Argument index smaller than offset.');

    var item = goog.i18n.pluralRules.select(diff);
    goog.asserts.assertString(item, 'Invalid plural key.');

    option = parsedPattern[item];
    goog.asserts.assertArray(
        option, 'Invalid option or missing other option for select block.');
  }

  this.formatBlock_(option, positionalParameters, result);
  var localeAwareDiff = this.numberFormatter_.format(diff);
  var plural = result.pop();
  goog.asserts.assertString(plural, 'Empty block in plural.');
  result.push(plural.replace(/#/g, function() { return localeAwareDiff }));
};


/**
 * Parses input pattern into an array, for faster reformatting with
 * different input parameters.
 * Parsing is locale independent.
 * @param {string} pattern MessageFormat pattern to parse.
 * @private
 */
goog.i18n.MessageFormat.prototype.parsePattern_ = function(pattern) {
  if (pattern) {
    // Make sure developer didn't use literal placeholder in the source.
    var regexPlaceholder = new RegExp(
        goog.i18n.MessageFormat.LITERAL_PLACEHOLDER_);
    goog.asserts.assert(pattern.search(regexPlaceholder) == -1,
        'Reserved placeholder in the message.');

    pattern = this.insertPlaceholders_(pattern);

    this.parsedPattern_ = this.parseBlock_(pattern);
  }
};


/**
 * Replaces '' and string literals with literal placeholders.
 * Builds a dictionary so we can recover literals during format phase.
 * @param {string} pattern Pattern to clean up.
 * @return {string} Pattern with literals replaced with placeholders.
 * @private
 */
goog.i18n.MessageFormat.prototype.insertPlaceholders_ = function(pattern) {
  this.literals_[goog.i18n.MessageFormat.QUOTE_LITERAL_PLACEHOLDER_] = "'";

  // Replace all '' with LITERAL_PLACEHOLDER_0_.
  pattern = pattern.replace(
      /''/g, goog.i18n.MessageFormat.QUOTE_LITERAL_PLACEHOLDER_);

  // Replace the rest of '...' strings with placeholders.
  var literalCount = 1;
  var literals = this.literals_;
  pattern = pattern.replace(/\'.*?\'/g, function(literal) {
    var literalKey = goog.i18n.MessageFormat.LITERAL_PLACEHOLDER_ +
        literalCount + '_';
    // Remove ' before saving.
    literals[literalKey] = literal.replace(/\'/g, '');
    literalCount++;
    return literalKey;
  });

  return pattern;
};


/**
 * Breaks pattern into strings and top level {...} blocks.
 * @param {string} pattern (sub)Pattern to be broken.
 * @return {Array.<Object>} Each item is {type, value}.
 * @private
 */
goog.i18n.MessageFormat.prototype.extractParts_ = function(pattern) {
  var prevPos = 0;
  var inBlock = false;
  var braceStack = [];
  var results = [];

  var braces = /[{}]/g;
  braces.lastIndex = 0;  // lastIndex doesn't get set to 0 so we have to.
  var match;

  while ((match = braces.exec(pattern))) {
    var pos = match.index;
    if (match[0] == '}') {
      var brace = braceStack.pop();
      goog.asserts.assert(goog.isDef(brace) && brace == '{',
                          'No matching { for }.');

      if (braceStack.length == 0) {
        // End of the block.
        var part = {};
        part.type = goog.i18n.MessageFormat.Element_.BLOCK;
        part.value = pattern.substring(prevPos, pos);
        results.push(part);
        prevPos = pos + 1;
        inBlock = false;
      }
    } else {
      if (braceStack.length == 0) {
        inBlock = true;
        var substring = pattern.substring(prevPos, pos);
        if (substring != '') {
          results.push({
              type: goog.i18n.MessageFormat.Element_.STRING,
              value: substring
          });
        }
        prevPos = pos + 1;
      }
      braceStack.push('{');
    }
  }

  // Take care of the final string, and check if the braceStack is empty.
  goog.asserts.assert(braceStack.length == 0,
                      'There are mismatched { or } in the pattern.');

  var substring = pattern.substring(prevPos);
  if (substring != '') {
    results.push({
      type: goog.i18n.MessageFormat.Element_.STRING,
      value: substring
    });
  }

  return results;
};


/**
 * Detects which type of a block is the pattern.
 * @param {string} pattern Content of the block.
 * @return {goog.i18n.MessageFormat.BlockType_} One of the block types.
 * @private
 */
goog.i18n.MessageFormat.prototype.parseBlockType_ = function(pattern) {
  if (/\s*\d+\s*,\s*plural.*/.test(pattern)) {
    return goog.i18n.MessageFormat.BlockType_.PLURAL;
  }

  if (/\s*\d+\s*,\s*select.*/.test(pattern)) {
    return goog.i18n.MessageFormat.BlockType_.SELECT;
  }

  if (/\s*\d+\s*/.test(pattern)) {
    return goog.i18n.MessageFormat.BlockType_.NUMERIC;
  }

  return goog.i18n.MessageFormat.BlockType_.UNKNOWN;
};


/**
 * Parses generic block.
 * @param {string} pattern Content of the block to parse.
 * @return {Array.<Object>} Subblocks marked as strings, select...
 * @private
 */
goog.i18n.MessageFormat.prototype.parseBlock_ = function(pattern) {
  var result = [];
  var parts = this.extractParts_(pattern);
  for (var i = 0; i < parts.length; i++) {
    var block = {};
    if (goog.i18n.MessageFormat.Element_.STRING == parts[i].type) {
      block.type = goog.i18n.MessageFormat.BlockType_.STRING;
      block.value = parts[i].value;
    } else if (goog.i18n.MessageFormat.Element_.BLOCK == parts[i].type) {
      var blockType = this.parseBlockType_(parts[i].value);

      switch (blockType) {
        case goog.i18n.MessageFormat.BlockType_.SELECT:
          block.type = goog.i18n.MessageFormat.BlockType_.SELECT;
          block.value = this.parseSelectBlock_(parts[i].value);
          break;
        case goog.i18n.MessageFormat.BlockType_.PLURAL:
          block.type = goog.i18n.MessageFormat.BlockType_.PLURAL;
          block.value = this.parsePluralBlock_(parts[i].value);
          break;
        case goog.i18n.MessageFormat.BlockType_.NUMERIC:
          block.type = goog.i18n.MessageFormat.BlockType_.NUMERIC;
          block.value = this.parseNumericBlock_(parts[i].value);
          break;
        default:
          goog.asserts.fail('Unknown block type.');
      }
    } else {
      goog.asserts.fail('Unknown part of the pattern.');
    }
    result.push(block);
  }

  return result;
};


/**
 * Parses a select type of a block and produces JSON object for it.
 * @param {string} pattern Subpattern that needs to be parsed as select pattern.
 * @return {Object} Object with select block info.
 * @private
 */
goog.i18n.MessageFormat.prototype.parseSelectBlock_ = function(pattern) {
  var argumentIndex = 0;
  var replace = /\s*(\d+)\s*,\s*select\s*,/;
  pattern = pattern.replace(replace, function(string, number) {
      argumentIndex = parseInt(number, 10);
      return '';
    });
  var result = {};
  result.argumentIndex = argumentIndex;

  var parts = this.extractParts_(pattern);
  // Looking for (key block)+ sequence. One of the keys has to be "other".
  var pos = 0;
  while (pos < parts.length) {
    var key = parts[pos].value;
    goog.asserts.assertString(key, 'Missing select key element.');

    pos++;
    goog.asserts.assert(pos < parts.length,
                        'Missing or invalid select value element.');

    if (goog.i18n.MessageFormat.Element_.BLOCK == parts[pos].type) {
      var value = this.parseBlock_(parts[pos].value);
    } else {
      goog.asserts.fail('Expected block type.');
    }
    result[key.replace(/\s/g, '')] = value;
    pos++;
  }

  goog.asserts.assertArray(result[goog.i18n.MessageFormat.OTHER_],
                           'Missing other key in select statement.');
  return result;
};


/**
 * Parses a plural type of a block and produces JSON object for it.
 * @param {string} pattern Subpattern that needs to be parsed as plural pattern.
 * @return {Object} Object with select block info.
 * @private
 */
goog.i18n.MessageFormat.prototype.parsePluralBlock_ = function(pattern) {
  var argumentIndex = 0;
  var argumentOffset = 0;
  var replace = /\s*(\d+)\s*,\s*plural\s*,(?:\s*offset:(\d+))?/;
  pattern = pattern.replace(replace, function(string, number, offset) {
      argumentIndex = parseInt(number, 10);
      if (offset) {
        argumentOffset = parseInt(offset, 10);
      }
      return '';
    });

  var result = {};
  result.argumentIndex = argumentIndex;
  result.argumentOffset = argumentOffset;

  var parts = this.extractParts_(pattern);
  // Looking for (key block)+ sequence.
  var pos = 0;
  while (pos < parts.length) {
    var key = parts[pos].value;
    goog.asserts.assertString(key, 'Missing plural key element.');

    pos++;
    goog.asserts.assert(pos < parts.length,
                        'Missing or invalid plural value element.');

    if (goog.i18n.MessageFormat.Element_.BLOCK == parts[pos].type) {
      var value = this.parseBlock_(parts[pos].value);
    } else {
      goog.asserts.fail('Expected block type.');
    }
    result[key.replace(/\s*(?:=)?(\w+)\s*/, '$1')] = value;
    pos++;
  }

  goog.asserts.assertArray(result[goog.i18n.MessageFormat.OTHER_],
                           'Missing other key in select statement.');

  return result;
};


/**
 * Parses a numeric type of a block and produces simple number for it.
 * @param {string} pattern Subpattern that needs to be parsed as number.
 * @return {number} Value of the parsed string.
 * @private
 */
goog.i18n.MessageFormat.prototype.parseNumericBlock_ = function(pattern) {
  return parseInt(pattern.match(/\s*(\d+)\s*/), 10);
};
