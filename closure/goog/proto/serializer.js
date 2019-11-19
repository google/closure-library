/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Protocol buffer serializer.
 * @author arv@google.com (Erik Arvidsson)
 */


// TODO(arv): Serialize booleans as 0 and 1


goog.provide('goog.proto.Serializer');


goog.require('goog.json.Serializer');
goog.require('goog.string');



/**
 * Object that can serialize objects or values to a protocol buffer string.
 * @constructor
 * @extends {goog.json.Serializer}
 * @final
 */
goog.proto.Serializer = function() {
  goog.json.Serializer.call(this);
};
goog.inherits(goog.proto.Serializer, goog.json.Serializer);


/**
 * Serializes an array to a protocol buffer string. This overrides the JSON
 * method to don't output trailing null or undefined.
 * @param {Array<*>} arr The array to serialize.
 * @param {Array<string>} sb Array used as a string builder.
 * @override
 */
goog.proto.Serializer.prototype.serializeArray = function(arr, sb) {
  var l = arr.length;
  sb.push('[');
  var emptySlots = 0;
  var sep = '';
  for (var i = 0; i < l; i++) {
    if (arr[i] == null) {  // catches undefined as well
      emptySlots++;
    } else {
      sb.push(sep);
      if (emptySlots > 0) {
        sb.push(goog.string.repeat('null,', emptySlots));
        emptySlots = 0;
      }
      this.serializeInternal(arr[i], sb);
      sep = ',';
    }
  }
  sb.push(']');
};
