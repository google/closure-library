/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for string newlines.
 */


/**
 * Namespace for string utilities
 */
goog.provide('goog.string.newlines');
goog.provide('goog.string.newlines.Line');

goog.require('goog.array');


/**
 * Splits a string into lines, properly handling universal newlines.
 * @param {string} str String to split.
 * @param {boolean=} opt_keepNewlines Whether to keep the newlines in the
 *     resulting strings. Defaults to false.
 * @return {!Array<string>} String split into lines.
 */
goog.string.newlines.splitLines = function(str, opt_keepNewlines) {
  var lines = goog.string.newlines.getLines(str);
  return goog.array.map(lines, function(line) {
    return opt_keepNewlines ? line.getFullLine() : line.getContent();
  });
};



/**
 * Line metadata class that records the start/end indicies of lines
 * in a string.  Can be used to implement common newline use cases such as
 * splitLines() or determining line/column of an index in a string.
 * Also implements methods to get line contents.
 *
 * Indexes are expressed as string indicies into string.substring(), inclusive
 * at the start, exclusive at the end.
 *
 * Create an array of these with goog.string.newlines.getLines().
 * @param {string} string The original string.
 * @param {number} startLineIndex The index of the start of the line.
 * @param {number} endContentIndex The index of the end of the line, excluding
 *     newlines.
 * @param {number} endLineIndex The index of the end of the line, index
 *     newlines.
 * @constructor
 * @struct
 * @final
 */
goog.string.newlines.Line = function(
    string, startLineIndex, endContentIndex, endLineIndex) {
  /**
   * The original string.
   * @type {string}
   */
  this.string = string;

  /**
   * Index of the start of the line.
   * @type {number}
   */
  this.startLineIndex = startLineIndex;

  /**
   * Index of the end of the line, excluding any newline characters.
   * Index is the first character after the line, suitable for
   * String.substring().
   * @type {number}
   */
  this.endContentIndex = endContentIndex;

  /**
   * Index of the end of the line, excluding any newline characters.
   * Index is the first character after the line, suitable for
   * String.substring().
   * @type {number}
   */

  this.endLineIndex = endLineIndex;
};


/**
 * @return {string} The content of the line, excluding any newline characters.
 */
goog.string.newlines.Line.prototype.getContent = function() {
  return this.string.substring(this.startLineIndex, this.endContentIndex);
};


/**
 * @return {string} The full line, including any newline characters.
 */
goog.string.newlines.Line.prototype.getFullLine = function() {
  return this.string.substring(this.startLineIndex, this.endLineIndex);
};


/**
 * @return {string} The newline characters, if any ('\n', \r', '\r\n', '', etc).
 */
goog.string.newlines.Line.prototype.getNewline = function() {
  return this.string.substring(this.endContentIndex, this.endLineIndex);
};


/**
 * Splits a string into an array of line metadata.
 * @param {string} str String to split.
 * @return {!Array<!goog.string.newlines.Line>} Array of line metadata.
 */
goog.string.newlines.getLines = function(str) {
  // We use the constructor because literals are evaluated only once in
  // < ES 3.1.
  // See http://www.mail-archive.com/es-discuss@mozilla.org/msg01796.html
  var re = RegExp('\r\n|\r|\n', 'g');
  var sliceIndex = 0;
  var result;
  var lines = [];

  while (result = re.exec(str)) {
    var line = new goog.string.newlines.Line(
        str, sliceIndex, result.index, result.index + result[0].length);
    lines.push(line);

    // remember where to start the slice from
    sliceIndex = re.lastIndex;
  }

  // If the string does not end with a newline, add the last line.
  if (sliceIndex < str.length) {
    var line =
        new goog.string.newlines.Line(str, sliceIndex, str.length, str.length);
    lines.push(line);
  }

  return lines;
};
