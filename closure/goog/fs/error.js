// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview A wrapper for the HTML5 FileError object.
 *
 */

goog.provide('goog.fs.Error');
goog.provide('goog.fs.Error.ErrorCode');

goog.require('goog.debug.Error');
goog.require('goog.object');
goog.require('goog.string');



/**
 * A filesystem error. Since the filesystem API is asynchronous, stack traces
 * are less useful for identifying where errors come from, so this includes a
 * large amount of metadata in the message.
 *
 * @param {!DOMError|number} errorOrCode Will be changed soon
 *     to accept only DOMError, not number, so don't pass ErrorCode in new code.
 * @param {string} action The action being undertaken when the error was raised.
 * @constructor
 * @extends {goog.debug.Error}
 * @final
 */
goog.fs.Error = function(errorOrCode, action) {
  /** @type {string} */
  this.name;

  /**
   * @type {goog.fs.Error.ErrorCode}
   * @deprecated Use the 'name' or 'message' field instead.
   */
  this.code;

  if (goog.isNumber(errorOrCode)) {
    var code = /** @type {goog.fs.Error.ErrorCode} */ (errorOrCode);
    this.code = code;
    this.name = goog.fs.Error.getNameFromCode_(code);
  } else {
    /** @type {!DOMError} */
    var error = errorOrCode;
    if (goog.isDef(error.name)) {
      this.name = error.name;
      this.code = goog.fs.Error.getCodeFromName_(error.name);
    } else {
      this.code = error.code;
      this.name = goog.fs.Error.getNameFromCode_(error.code);
    }
  }
  goog.base(this, goog.string.subs('%s %s', this.name, action));
};
goog.inherits(goog.fs.Error, goog.debug.Error);


/**
 * Error codes for file errors.
 * @see http://www.w3.org/TR/file-system-api/#idl-def-FileException
 *
 * @enum {number}
 * @deprecated Use the 'name' or 'message' attribute instead.
 */
goog.fs.Error.ErrorCode = {
  NOT_FOUND: 1,
  SECURITY: 2,
  ABORT: 3,
  NOT_READABLE: 4,
  ENCODING: 5,
  NO_MODIFICATION_ALLOWED: 6,
  INVALID_STATE: 7,
  SYNTAX: 8,
  INVALID_MODIFICATION: 9,
  QUOTA_EXCEEDED: 10,
  TYPE_MISMATCH: 11,
  PATH_EXISTS: 12
};


/**
 * @param {number} errorCode The error code for the error.
 * @return {string} A debug message for the given error code. These messages are
 *     for debugging only and are not localized.
 * @deprecated Use the 'message' property of a goog.fs.Error object.
 */
goog.fs.Error.getDebugMessage = function(errorCode) {
  switch (errorCode) {
    case goog.fs.Error.ErrorCode.NOT_FOUND:
      return 'File or directory not found';
    case goog.fs.Error.ErrorCode.SECURITY:
      return 'Insecure or disallowed operation';
    case goog.fs.Error.ErrorCode.ABORT:
      return 'Operation aborted';
    case goog.fs.Error.ErrorCode.NOT_READABLE:
      return 'File or directory not readable';
    case goog.fs.Error.ErrorCode.ENCODING:
      return 'Invalid encoding';
    case goog.fs.Error.ErrorCode.NO_MODIFICATION_ALLOWED:
      return 'Cannot modify file or directory';
    case goog.fs.Error.ErrorCode.INVALID_STATE:
      return 'Invalid state';
    case goog.fs.Error.ErrorCode.SYNTAX:
      return 'Invalid line-ending specifier';
    case goog.fs.Error.ErrorCode.INVALID_MODIFICATION:
      return 'Invalid modification';
    case goog.fs.Error.ErrorCode.QUOTA_EXCEEDED:
      return 'Quota exceeded';
    case goog.fs.Error.ErrorCode.TYPE_MISMATCH:
      return 'Invalid filetype';
    case goog.fs.Error.ErrorCode.PATH_EXISTS:
      return 'File or directory already exists at specified path';
    default:
      return 'Unrecognized error';
  }
};


/**
 * @param {goog.fs.Error.ErrorCode} code
 * @return {string} name
 * @private
 */
goog.fs.Error.getNameFromCode_ = function(code) {
  var name = goog.object.findKey(goog.fs.Error.NameToCodeMap_, function(c) {
    return code == c;
  });
  if (!goog.isDef(name)) {
    throw new Error('Invalid code: ' + code);
  }
  return name;
};


/**
 * Returns the code that corresponds to the given name.
 * @param {string} name
 * @return {goog.fs.Error.ErrorCode} code
 * @private
 */
goog.fs.Error.getCodeFromName_ = function(name) {
  return goog.fs.Error.NameToCodeMap_[name];
};


/**
 * Mapping from error names to values from the ErrorCode enum.
 * @see http://www.w3.org/TR/file-system-api/#definitions.
 * @private {!Object.<string, goog.fs.Error.ErrorCode>}
 */
goog.fs.Error.NameToCodeMap_ = {
  'NotFoundError': goog.fs.Error.ErrorCode.NOT_FOUND,
  'SecurityError': goog.fs.Error.ErrorCode.SECURITY,
  'AbortError': goog.fs.Error.ErrorCode.ABORT,
  'EncodingError': goog.fs.Error.ErrorCode.ENCODING,
  'NoModificationAllowedError': goog.fs.Error.ErrorCode.NO_MODIFICATION_ALLOWED,
  'InvalidStateError': goog.fs.Error.ErrorCode.INVALID_STATE,
  'SyntaxError': goog.fs.Error.ErrorCode.SYNTAX,
  'InvalidModificationError': goog.fs.Error.ErrorCode.INVALID_MODIFICATION,
  'QuotaExceededError': goog.fs.Error.ErrorCode.QUOTA_EXCEEDED,
  'TypeMismatchError': goog.fs.Error.ErrorCode.TYPE_MISMATCH
};
