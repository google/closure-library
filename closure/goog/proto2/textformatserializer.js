/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Protocol Buffer 2 Serializer which serializes messages
 *  into a user-friendly text format. Note that this code can run a bit
 *  slowly (especially for parsing) and should therefore not be used for
 *  time or space-critical applications.
 *
 * @see http://goo.gl/QDmDr
 */

goog.provide('goog.proto2.TextFormatSerializer');

goog.require('goog.asserts');
goog.require('goog.math');
goog.require('goog.math.Long');
goog.require('goog.object');
goog.require('goog.proto2.FieldDescriptor');
goog.require('goog.proto2.Message');
goog.require('goog.proto2.Serializer');
goog.require('goog.string');



/**
 * TextFormatSerializer, a serializer which turns Messages into the human
 * readable text format.
 * @param {boolean=} opt_ignoreMissingFields If true, then fields that cannot be
 *     found on the proto when parsing the text format will be ignored.
 * @param {boolean=} opt_useEnumValues If true, serialization code for enums
 *     will use enum integer values instead of human-readable symbolic names.
 * @constructor
 * @extends {goog.proto2.Serializer}
 * @final
 */
goog.proto2.TextFormatSerializer = function(
    opt_ignoreMissingFields, opt_useEnumValues) {
  'use strict';
  /**
   * Whether to ignore fields not defined on the proto when parsing the text
   * format.
   * @type {boolean}
   * @private
   */
  this.ignoreMissingFields_ = !!opt_ignoreMissingFields;

  /**
   * Whether to use integer enum values during enum serialization.
   * If false, symbolic names will be used.
   * @type {boolean}
   * @private
   */
  this.useEnumValues_ = !!opt_useEnumValues;
};
goog.inherits(goog.proto2.TextFormatSerializer, goog.proto2.Serializer);


/**
 * Deserializes a message from text format and places the data in the message.
 * @param {goog.proto2.Message} message The message in which to
 *     place the information.
 * @param {*} data The text format data.
 * @return {?string} The parse error or null on success.
 * @override
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
goog.proto2.TextFormatSerializer.prototype.deserializeTo = function(
    message, data) {
  'use strict';
  var textData = data.toString();
  var parser = new goog.proto2.TextFormatSerializer.Parser();
  if (!parser.parse(message, textData, this.ignoreMissingFields_)) {
    return parser.getError();
  }

  return null;
};


/**
 * Serializes a message to a string.
 * @param {goog.proto2.Message} message The message to be serialized.
 * @return {string} The serialized form of the message.
 * @override
 */
goog.proto2.TextFormatSerializer.prototype.serialize = function(message) {
  'use strict';
  var printer = new goog.proto2.TextFormatSerializer.Printer_();
  this.serializeMessage_(message, printer);
  return printer.toString();
};


/**
 * Serializes the message and prints the text form into the given printer.
 * @param {goog.proto2.Message} message The message to serialize.
 * @param {goog.proto2.TextFormatSerializer.Printer_} printer The printer to
 *    which the text format will be printed.
 * @private
 */
goog.proto2.TextFormatSerializer.prototype.serializeMessage_ = function(
    message, printer) {
  'use strict';
  var descriptor = message.getDescriptor();
  var fields = descriptor.getFields();

  // Add the defined fields, recursively.
  fields.forEach(function(field) {
    'use strict';
    this.printField_(message, field, printer);
  }, this);

  // Add the unknown fields, if any.
  message.forEachUnknown(function(tag, value) {
    'use strict';
    this.serializeUnknown_(tag, value, goog.asserts.assert(printer));
  }, this);
};


/**
 * Serializes an unknown field. When parsed from the JsPb object format, this
 * manifests as either a primitive type, an array, or a raw object with integer
 * keys. There is no descriptor available to interpret the types of nested
 * messages.
 * @param {number} tag The tag for the field. Since it's unknown, this is a
 *     number rather than a string.
 * @param {*} value The value of the field.
 * @param {!goog.proto2.TextFormatSerializer.Printer_} printer The printer to
 *     which the text format will be serialized.
 * @private
 */
goog.proto2.TextFormatSerializer.prototype.serializeUnknown_ = function(
    tag, value, printer) {
  'use strict';
  if (value == null) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach(function(val) {
      'use strict';
      this.serializeUnknown_(tag, val, printer);
    }, this);
    return;
  }

  if (goog.isObject(value)) {
    printer.append(tag);
    printer.append(' {');
    printer.appendLine();
    printer.indent();
    if (value instanceof goog.proto2.Message) {
      // Note(user): This conditional is here to make the
      // testSerializationOfUnknown unit test pass, but in practice we should
      // never have a Message for an "unknown" field.
      this.serializeMessage_(value, printer);
    } else {
      // For an unknown message, fields are keyed by positive integers. We
      // don't have a 'length' property to use for enumeration, so go through
      // all properties and ignore the ones that aren't legal keys.
      for (var key in value) {
        var keyAsNumber = goog.string.parseInt(key);
        goog.asserts.assert(goog.math.isInt(keyAsNumber));
        this.serializeUnknown_(keyAsNumber, value[key], printer);
      }
    }
    printer.dedent();
    printer.append('}');
    printer.appendLine();
    return;
  }

  if (typeof value === 'string') {
    value = goog.string.quote(value);
  }
  printer.append(tag);
  printer.append(': ');
  printer.append(value);
  printer.appendLine();
};


/**
 * Prints the serialized value for the given field to the printer.
 * @param {*} value The field's value.
 * @param {goog.proto2.FieldDescriptor} field The field whose value is being
 *    printed.
 * @param {goog.proto2.TextFormatSerializer.Printer_} printer The printer to
 *    which the value will be printed.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
goog.proto2.TextFormatSerializer.prototype.printFieldValue_ = function(
    value, field, printer) {
  'use strict';
  switch (field.getFieldType()) {
    case goog.proto2.FieldDescriptor.FieldType.DOUBLE:
    case goog.proto2.FieldDescriptor.FieldType.FLOAT:
    case goog.proto2.FieldDescriptor.FieldType.INT64:
    case goog.proto2.FieldDescriptor.FieldType.UINT64:
    case goog.proto2.FieldDescriptor.FieldType.INT32:
    case goog.proto2.FieldDescriptor.FieldType.UINT32:
    case goog.proto2.FieldDescriptor.FieldType.FIXED64:
    case goog.proto2.FieldDescriptor.FieldType.FIXED32:
    case goog.proto2.FieldDescriptor.FieldType.BOOL:
    case goog.proto2.FieldDescriptor.FieldType.SFIXED32:
    case goog.proto2.FieldDescriptor.FieldType.SFIXED64:
    case goog.proto2.FieldDescriptor.FieldType.SINT32:
    case goog.proto2.FieldDescriptor.FieldType.SINT64:
      printer.append(value);
      break;

    case goog.proto2.FieldDescriptor.FieldType.BYTES:
    case goog.proto2.FieldDescriptor.FieldType.STRING:
      value = goog.string.quote(value.toString());
      printer.append(value);
      break;

    case goog.proto2.FieldDescriptor.FieldType.ENUM:
      if (!this.useEnumValues_) {
        // Search the enum type for a matching key.
        var found = false;
        goog.object.forEach(field.getNativeType(), function(eValue, key) {
          'use strict';
          if (!found && eValue == value) {
            printer.append(key);
            found = true;
          }
        });
      }

      if (!found || this.useEnumValues_) {
        // Otherwise, just print the numeric value.
        printer.append(value.toString());
      }
      break;

    case goog.proto2.FieldDescriptor.FieldType.GROUP:
    case goog.proto2.FieldDescriptor.FieldType.MESSAGE:
      this.serializeMessage_(
          /** @type {goog.proto2.Message} */ (value), printer);
      break;
  }
};


/**
 * Prints the serialized field to the printer.
 * @param {goog.proto2.Message} message The parent message.
 * @param {goog.proto2.FieldDescriptor} field The field to print.
 * @param {goog.proto2.TextFormatSerializer.Printer_} printer The printer to
 *    which the field will be printed.
 * @private
 */
goog.proto2.TextFormatSerializer.prototype.printField_ = function(
    message, field, printer) {
  'use strict';
  // Skip fields not present.
  if (!message.has(field)) {
    return;
  }

  var count = message.countOf(field);
  for (var i = 0; i < count; ++i) {
    // Field name.
    printer.append(field.getName());

    // Field delimiter.
    if (field.getFieldType() == goog.proto2.FieldDescriptor.FieldType.MESSAGE ||
        field.getFieldType() == goog.proto2.FieldDescriptor.FieldType.GROUP) {
      printer.append(' {');
      printer.appendLine();
      printer.indent();
    } else {
      printer.append(': ');
    }

    // Write the field value.
    this.printFieldValue_(message.get(field, i), field, printer);

    // Close the field.
    if (field.getFieldType() == goog.proto2.FieldDescriptor.FieldType.MESSAGE ||
        field.getFieldType() == goog.proto2.FieldDescriptor.FieldType.GROUP) {
      printer.dedent();
      printer.append('}');
      printer.appendLine();
    } else {
      printer.appendLine();
    }
  }
};


////////////////////////////////////////////////////////////////////////////////



/**
 * Helper class used by the text format serializer for pretty-printing text.
 * @constructor
 * @private
 */
goog.proto2.TextFormatSerializer.Printer_ = function() {
  'use strict';
  /**
   * The current indentation count.
   * @type {number}
   * @private
   */
  this.indentation_ = 0;

  /**
   * The buffer of string pieces.
   * @type {Array<string>}
   * @private
   */
  this.buffer_ = [];

  /**
   * Whether indentation is required before the next append of characters.
   * @type {boolean}
   * @private
   */
  this.requiresIndentation_ = true;
};


/**
 * @return {string} The contents of the printer.
 * @override
 */
goog.proto2.TextFormatSerializer.Printer_.prototype.toString = function() {
  'use strict';
  return this.buffer_.join('');
};


/**
 * Increases the indentation in the printer.
 */
goog.proto2.TextFormatSerializer.Printer_.prototype.indent = function() {
  'use strict';
  this.indentation_ += 2;
};


/**
 * Decreases the indentation in the printer.
 */
goog.proto2.TextFormatSerializer.Printer_.prototype.dedent = function() {
  'use strict';
  this.indentation_ -= 2;
  goog.asserts.assert(this.indentation_ >= 0);
};


/**
 * Appends the given value to the printer.
 * @param {*} value The value to append.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
goog.proto2.TextFormatSerializer.Printer_.prototype.append = function(value) {
  'use strict';
  if (this.requiresIndentation_) {
    for (var i = 0; i < this.indentation_; ++i) {
      this.buffer_.push(' ');
    }
    this.requiresIndentation_ = false;
  }

  this.buffer_.push(String(value));
};


/**
 * Appends a newline to the printer.
 */
goog.proto2.TextFormatSerializer.Printer_.prototype.appendLine = function() {
  'use strict';
  this.buffer_.push('\n');
  this.requiresIndentation_ = true;
};


////////////////////////////////////////////////////////////////////////////////



/**
 * Helper class for tokenizing the text format.
 * @param {string} data The string data to tokenize.
 * @param {boolean=} opt_ignoreWhitespace If true, whitespace tokens will not
 *    be reported by the tokenizer.
 * @param {boolean=} opt_ignoreComments If true, comment tokens will not be
 *    reported by the tokenizer.
 * @constructor
 * @private
 */
goog.proto2.TextFormatSerializer.Tokenizer_ = function(
    data, opt_ignoreWhitespace, opt_ignoreComments) {
  'use strict';
  /**
   * Whether to skip whitespace tokens on output.
   * @private {boolean}
   */
  this.ignoreWhitespace_ = !!opt_ignoreWhitespace;

  /**
   * Whether to skip comment tokens on output.
   * @private {boolean}
   */
  this.ignoreComments_ = !!opt_ignoreComments;

  /**
   * The data being tokenized.
   * @private {string}
   */
  this.data_ = data;

  /**
   * The current index in the data.
   * @private {number}
   */
  this.index_ = 0;

  /**
   * The data string starting at the current index.
   * @private {string}
   */
  this.currentData_ = data;

  /**
   * The current token type.
   * @private {goog.proto2.TextFormatSerializer.Tokenizer_.Token}
   */
  this.current_ = {
    type: goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes.END,
    value: null
  };
};


/**
 * @typedef {{type: goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes,
 *            value: ?string}}
 */
goog.proto2.TextFormatSerializer.Tokenizer_.Token;


/**
 * @return {goog.proto2.TextFormatSerializer.Tokenizer_.Token} The current
 *     token.
 */
goog.proto2.TextFormatSerializer.Tokenizer_.prototype.getCurrent = function() {
  'use strict';
  return this.current_;
};


/**
 * An enumeration of all the token types.
 * @enum {!RegExp}
 */
goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes = {
  // Terminal tokens: END if the input data has been exhausted; BAD if not.
  // Their regexes don't match any string.
  END: /$ end $/,
  BAD: /$ bad $/,
  // Leading "-" to identify "-infinity"."
  IDENTIFIER: /^-?[a-zA-Z][a-zA-Z0-9_]*/,
  // NOTE: the textproto grammar treats negation as a separate token, so this
  // serializer accepts a subset language.
  // From the grammar, a number is -?(FLOAT|DEC_INT|OCT_INT|HEX_INT)
  // FLOAT | DEC_INT = ( float_lit | dec_lit ), [ "F" | "f" ]
  // float_lit | dec_lit
  //  = ".", dec, { dec }, [ exp ]
  //   | dec_lit, ".", { dec }, [ exp ]
  //   | dec_lit, exp | dec_lit
  //  = ( ".", dec, {dec} | dec_lit, [ ".", {dec} ] ) [exp]
  NUMBER:
      /^-?(0[0-7]+|0x[0-9a-f]+|([.][0-9]+|(0|[1-9][0-9]*)([.][0-9]*)?)(e[+-]?[0-9]+)?f?)/i,
  COMMENT: /^#.*/,
  OPEN_BRACE: /^{/,
  CLOSE_BRACE: /^}/,
  OPEN_TAG: /^</,
  CLOSE_TAG: /^>/,
  OPEN_LIST: /^\[/,
  CLOSE_LIST: /^\]/,
  STRING: new RegExp('^"([^"\\\\]|\\\\.)*"'),
  COLON: /^:/,
  COMMA: /^,/,
  SEMI: /^;/,
  WHITESPACE: /^\s/
};


/**
 * Advances to the next token.
 * @return {boolean} True if a valid token was found, false if the end was
 *    reached or no valid token was found.
 */
goog.proto2.TextFormatSerializer.Tokenizer_.prototype.next = function() {
  'use strict';
  var types = goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes;

  // Skip any whitespace if requested.
  while (this.nextInternal_()) {
    var type = this.getCurrent().type;
    if ((type != types.WHITESPACE && type != types.COMMENT) ||
        (type == types.WHITESPACE && !this.ignoreWhitespace_) ||
        (type == types.COMMENT && !this.ignoreComments_)) {
      return true;
    }
  }

  // If we reach this point, set the current token to END.
  this.current_ = {
    type: this.currentData_.length == 0 ? types.END : types.BAD,
    value: null
  };

  return false;
};


/**
 * Internal method for determining the next token.
 * @return {boolean} True if a next token was found, false otherwise.
 * @private
 */
goog.proto2.TextFormatSerializer.Tokenizer_.prototype.nextInternal_ =
    function() {
  'use strict';
  if (this.index_ >= this.data_.length) {
    return false;
  }

  var data = this.currentData_;
  var types = goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes;
  var next = null;

  // Loop through each token type and try to match the beginning of the string
  // with the token's regular expression.
  goog.object.some(types, function(type, id) {
    'use strict';
    if (next || type == types.END) {
      return false;
    }

    // Note: This regular expression check is at, minimum, O(n).
    var info = type.exec(data);
    if (info && info.index == 0) {
      next = {type: type, value: info[0]};
    }

    return !!next;
  });

  // Advance the index by the length of the token.
  if (next) {
    // From the textformat spec: There is one edge case that requires special
    // attention: a number token (FLOAT, DEC_INT, OCT_INT, or HEX_INT) may not
    // be immediately followed by an IDENT token.
    if (this.current_.type == types.NUMBER && next.type == types.IDENTIFIER) {
      return false;
    }
    this.current_ =
        /** @type {goog.proto2.TextFormatSerializer.Tokenizer_.Token} */ (next);
    this.index_ += next.value.length;
    this.currentData_ = this.currentData_.substring(next.value.length);
  }

  return !!next;
};


////////////////////////////////////////////////////////////////////////////////



/**
 * Helper class for parsing the text format.
 * @constructor
 * @final
 */
goog.proto2.TextFormatSerializer.Parser = function() {
  'use strict';
  /**
   * The error during parsing, if any.
   * @type {?string}
   * @private
   */
  this.error_ = null;

  /**
   * The current tokenizer.
   * @type {?goog.proto2.TextFormatSerializer.Tokenizer_}
   * @private
   */
  this.tokenizer_ = null;

  /**
   * Whether to ignore missing fields in the proto when parsing.
   * @type {boolean}
   * @private
   */
  this.ignoreMissingFields_ = false;
};


/**
 * Parses the given data, filling the message as it goes.
 * @param {goog.proto2.Message} message The message to fill.
 * @param {string} data The text format data.
 * @param {boolean=} opt_ignoreMissingFields If true, fields missing in the
 *     proto will be ignored.
 * @return {boolean} True on success, false on failure. On failure, the
 *     getError method can be called to get the reason for failure.
 */
goog.proto2.TextFormatSerializer.Parser.prototype.parse = function(
    message, data, opt_ignoreMissingFields) {
  'use strict';
  this.error_ = null;
  this.ignoreMissingFields_ = !!opt_ignoreMissingFields;
  this.tokenizer_ =
      new goog.proto2.TextFormatSerializer.Tokenizer_(data, true, true);
  this.tokenizer_.next();
  return this.consumeMessage_(message, '');
};


/**
 * @return {?string} The parse error, if any.
 */
goog.proto2.TextFormatSerializer.Parser.prototype.getError = function() {
  'use strict';
  return this.error_;
};


/**
 * Reports a parse error.
 * @param {string} msg The error message.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.reportError_ = function(msg) {
  'use strict';
  this.error_ = msg;
};


/**
 * Attempts to consume the given message.
 * @param {goog.proto2.Message} message The message to consume and fill. If
 *    null, then the message contents will be consumed without ever being set
 *    to anything.
 * @param {string} delimiter The delimiter expected at the end of the message.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consumeMessage_ = function(
    message, delimiter) {
  'use strict';
  var types = goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes;
  while (!this.lookingAt_('>') && !this.lookingAt_('}') &&
         !this.lookingAtType_(types.END)) {
    if (!this.consumeField_(message)) {
      return false;
    }
  }

  if (delimiter) {
    if (!this.consume_(delimiter)) {
      return false;
    }
  } else {
    if (!this.lookingAtType_(types.END)) {
      this.reportError_('Expected END token');
    }
  }

  return true;
};


/**
 * Attempts to consume the value of the given field.
 * @param {goog.proto2.Message} message The parent message.
 * @param {goog.proto2.FieldDescriptor} field The field.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consumeFieldValue_ = function(
    message, field) {
  'use strict';
  var value = this.getFieldValue_(field);
  if (value === null) {
    return false;
  }

  if (field.isRepeated()) {
    message.add(field, value);
  } else {
    message.set(field, value);
  }

  return true;
};

/**
 * Detects the radix of a number.
 * @param {string} num a number.
 * @return {number} The radix of `num`, or 0 if the number is a float.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.getRadix_ = function(num) {
  return /^-?0x/i.test(num) ?
      16 :
      /^-?0[0-7]/.test(num) ?
      8 :
      // NOTE: hexadecimal literals are already excluded here, so a decimal
      // point, an "e" (as in 1e3), or an "f" suffix (as in 1f) all indicate
      // floating point.
      /[.ef]/i.test(num) ? 0 :
                           10;
};

/**
 * Attempts to convert a string to a number.
 * @param {string} num in hexadecimal or float format.
 * @return {number} The converted number or null on error.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.getNumberFromString_ = function(num) {
  'use strict';
  const radix = goog.proto2.TextFormatSerializer.Parser.getRadix_(num);
  const returnValue = radix == 0 ? parseFloat(num) : parseInt(num, radix);

  goog.asserts.assert(!isNaN(returnValue));
  goog.asserts.assert(isFinite(returnValue));

  return returnValue;
};


/**
 * Parse NaN, positive infinity, or negative infinity from a string.
 * @param {string} identifier An identifier string to check.
 * @return {?number} Infinity, negative infinity, NaN, or null if none
 *     of the constants could be parsed.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.parseNumericalConstant_ = function(
    identifier) {
  'use strict';
  if (/^-?inf(?:inity)?f?$/i.test(identifier)) {
    return Infinity * (goog.string.startsWith(identifier, '-') ? -1 : 1);
  }

  if (/^nanf?$/i.test(identifier)) {
    return NaN;
  }

  return null;
};


/**
 * Attempts to parse the given field's value from the stream.
 * @param {goog.proto2.FieldDescriptor} field The field.
 * @return {*} The field's value or null if none.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.getFieldValue_ = function(
    field) {
  'use strict';
  var types = goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes;
  switch (field.getFieldType()) {
    case goog.proto2.FieldDescriptor.FieldType.DOUBLE:
    case goog.proto2.FieldDescriptor.FieldType.FLOAT:

      var identifier = this.consumeIdentifier_();
      if (identifier) {
        var numericalIdentifier =
            goog.proto2.TextFormatSerializer.Parser.parseNumericalConstant_(
                identifier);
        // Use isDefAndNotNull since !!NaN is false.
        if (numericalIdentifier != null) {
          return numericalIdentifier;
        }
      }

    case goog.proto2.FieldDescriptor.FieldType.INT32:
    case goog.proto2.FieldDescriptor.FieldType.UINT32:
    case goog.proto2.FieldDescriptor.FieldType.FIXED32:
    case goog.proto2.FieldDescriptor.FieldType.SFIXED32:
    case goog.proto2.FieldDescriptor.FieldType.SINT32:
      var num = this.consumeNumber_();
      if (!num) {
        return null;
      }

      return goog.proto2.TextFormatSerializer.Parser.getNumberFromString_(num);

    case goog.proto2.FieldDescriptor.FieldType.INT64:
    case goog.proto2.FieldDescriptor.FieldType.UINT64:
    case goog.proto2.FieldDescriptor.FieldType.FIXED64:
    case goog.proto2.FieldDescriptor.FieldType.SFIXED64:
    case goog.proto2.FieldDescriptor.FieldType.SINT64:
      var num = this.consumeNumber_();
      if (!num) {
        return null;
      }

      if (field.getNativeType() == Number) {
        // 64-bit number stored as a number.
        return goog.proto2.TextFormatSerializer.Parser.getNumberFromString_(
            num);
      }
      // Normalize numeric literals to decimal.
      const radix = goog.proto2.TextFormatSerializer.Parser.getRadix_(num);
      if (radix != 10) {
        num = goog.math.Long.fromString(num, radix).toString(10);
      }
      return num;  // 64-bit numbers are by default stored as strings.

    case goog.proto2.FieldDescriptor.FieldType.BOOL:
      var ident = this.consumeIdentifier_();
      if (!ident) {
        return null;
      }

      switch (ident) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          this.reportError_('Unknown type for bool: ' + ident);
          return null;
      }

    case goog.proto2.FieldDescriptor.FieldType.ENUM:
      if (this.lookingAtType_(types.NUMBER)) {
        var num = this.consumeNumber_();
        if (!num) {
          return null;
        }

        return goog.proto2.TextFormatSerializer.Parser.getNumberFromString_(
            num);
      } else {
        // Search the enum type for a matching key.
        var name = this.consumeIdentifier_();
        if (!name) {
          return null;
        }

        var enumValue = field.getNativeType()[name];
        if (enumValue == null) {
          this.reportError_('Unknown enum value: ' + name);
          return null;
        }

        return enumValue;
      }

    case goog.proto2.FieldDescriptor.FieldType.BYTES:
    case goog.proto2.FieldDescriptor.FieldType.STRING:
      return this.consumeString_();
  }
};


/**
 * Attempts to consume a nested message.
 * @param {goog.proto2.Message} message The parent message.
 * @param {goog.proto2.FieldDescriptor} field The field.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consumeNestedMessage_ =
    function(message, field) {
  'use strict';
  var delimiter = '';

  // Messages support both < > and { } as delimiters for legacy reasons.
  if (this.tryConsume_('<')) {
    delimiter = '>';
  } else {
    if (!this.consume_('{')) {
      return false;
    }
    delimiter = '}';
  }

  var msg = field.getFieldMessageType().createMessageInstance();
  var result = this.consumeMessage_(msg, delimiter);
  if (!result) {
    return false;
  }

  // Add the message to the parent message.
  if (field.isRepeated()) {
    message.add(field, msg);
  } else {
    message.set(field, msg);
  }

  return true;
};


/**
 * Attempts to consume the value of an unknown field. This method uses
 * heuristics to try to consume just the right tokens.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consumeUnknownFieldValue_ =
    function() {
  'use strict';
  // : is optional.
  this.tryConsume_(':');

  // Handle form: [.. , ... , ..]
  if (this.tryConsume_('[')) {
    while (true) {
      this.tokenizer_.next();
      if (this.tryConsume_(']')) {
        break;
      }
      if (!this.consume_(',')) {
        return false;
      }
    }

    return true;
  }

  // Handle nested messages/groups.
  if (this.tryConsume_('<')) {
    return this.consumeMessage_(null /* unknown */, '>');
  } else if (this.tryConsume_('{')) {
    return this.consumeMessage_(null /* unknown */, '}');
  } else {
    // Otherwise, consume a single token for the field value.
    this.tokenizer_.next();
  }

  return true;
};


/**
 * Attempts to consume a field under a message.
 * @param {goog.proto2.Message} message The parent message. If null, then the
 *     field value will be consumed without being assigned to anything.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consumeField_ = function(
    message) {
  'use strict';
  var fieldName = this.consumeIdentifier_();
  if (!fieldName) {
    this.reportError_('Missing field name');
    return false;
  }

  var field = null;
  if (message) {
    field = message.getDescriptor().findFieldByName(fieldName.toString());
  }

  if (field == null) {
    if (this.ignoreMissingFields_) {
      return this.consumeUnknownFieldValue_();
    } else {
      this.reportError_('Unknown field: ' + fieldName);
      return false;
    }
  }

  if (field.getFieldType() == goog.proto2.FieldDescriptor.FieldType.MESSAGE ||
      field.getFieldType() == goog.proto2.FieldDescriptor.FieldType.GROUP) {
    // : is optional here.
    this.tryConsume_(':');
    if (!this.consumeNestedMessage_(message, field)) {
      return false;
    }
  } else {
    // Long Format: "someField: 123"
    // Short Format: "someField: [123, 456, 789]"
    if (!this.consume_(':')) {
      return false;
    }

    if (field.isRepeated() && this.tryConsume_('[')) {
      // Short repeated format, e.g.  "foo: [1, 2, 3]"
      while (true) {
        if (!this.consumeFieldValue_(message, field)) {
          return false;
        }
        if (this.tryConsume_(']')) {
          break;
        }
        if (!this.consume_(',')) {
          return false;
        }
      }
    } else {
      // Normal field format.
      if (!this.consumeFieldValue_(message, field)) {
        return false;
      }
    }
  }

  // For historical reasons, fields may optionally be separated by commas or
  // semicolons.
  this.tryConsume_(',') || this.tryConsume_(';');
  return true;
};


/**
 * Attempts to consume a token with the given string value.
 * @param {string} value The string value for the token.
 * @return {boolean} True if the token matches and was consumed, false
 *    otherwise.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.tryConsume_ = function(
    value) {
  'use strict';
  if (this.lookingAt_(value)) {
    this.tokenizer_.next();
    return true;
  }
  return false;
};


/**
 * Consumes a token of the given type.
 * @param {goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes} type The type
 *     of the token to consume.
 * @return {?string} The string value of the token or null on error.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consumeToken_ = function(
    type) {
  'use strict';
  if (!this.lookingAtType_(type)) {
    this.reportError_('Expected token type: ' + type);
    return null;
  }

  var value = this.tokenizer_.getCurrent().value;
  this.tokenizer_.next();
  return value;
};


/**
 * Consumes an IDENTIFIER token.
 * @return {?string} The string value or null on error.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consumeIdentifier_ =
    function() {
  'use strict';
  var types = goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes;
  return this.consumeToken_(types.IDENTIFIER);
};


/**
 * Consumes a NUMBER token.
 * @return {?string} The string value or null on error.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consumeNumber_ = function() {
  'use strict';
  var types = goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes;
  return this.consumeToken_(types.NUMBER);
};


/**
 * Consumes a STRING token. Strings may come in multiple adjacent tokens which
 * are automatically concatenated, like in C or Python.
 * @return {?string} The *deescaped* string value or null on error.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consumeString_ = function() {
  'use strict';
  var types = goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes;
  var value = this.consumeToken_(types.STRING);
  if (!value) {
    return null;
  }

  var stringValue = JSON.parse(/** @type {string} */ (value)).toString();
  while (this.lookingAtType_(types.STRING)) {
    value = this.consumeToken_(types.STRING);
    stringValue += JSON.parse(/** @type {string} */ (value)).toString();
  }

  return stringValue;
};


/**
 * Consumes a token with the given value. If not found, reports an error.
 * @param {string} value The string value expected for the token.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.consume_ = function(value) {
  'use strict';
  if (!this.tryConsume_(value)) {
    this.reportError_('Expected token "' + value + '"');
    return false;
  }

  return true;
};


/**
 * @param {string} value The value to check against.
 * @return {boolean} True if the current token has the given string value.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.lookingAt_ = function(value) {
  'use strict';
  return this.tokenizer_.getCurrent().value == value;
};


/**
 * @param {goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes} type The
 *     token type.
 * @return {boolean} True if the current token has the given type.
 * @private
 */
goog.proto2.TextFormatSerializer.Parser.prototype.lookingAtType_ = function(
    type) {
  'use strict';
  return this.tokenizer_.getCurrent().type == type;
};
