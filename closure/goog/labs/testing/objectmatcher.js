/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in object matchers like equalsObject,
 *     hasProperty, instanceOf, etc.
 */

goog.provide('goog.labs.testing.AnyObjectMatcher');
goog.provide('goog.labs.testing.HasPropertyMatcher');
goog.provide('goog.labs.testing.InstanceOfMatcher');
goog.provide('goog.labs.testing.IsNullMatcher');
goog.provide('goog.labs.testing.IsNullOrUndefinedMatcher');
goog.provide('goog.labs.testing.IsUndefinedMatcher');
goog.provide('goog.labs.testing.ObjectEqualsMatcher');

goog.require('goog.labs.testing.Matcher');



/**
 * Matches any object value.
 *
 * @constructor @struct @implements {goog.labs.testing.Matcher} @final
 */
goog.labs.testing.AnyObjectMatcher = function() {};


/** @override */
goog.labs.testing.AnyObjectMatcher.prototype.matches = function(actualValue) {
  'use strict';
  return goog.isObject(actualValue);
};


/** @override */
goog.labs.testing.AnyObjectMatcher.prototype.describe = function(actualValue) {
  'use strict';
  return '<' + actualValue + '> is not an object';
};



/**
 * The Equals matcher.
 *
 * @param {!Object} expectedObject The expected object.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.ObjectEqualsMatcher = function(expectedObject) {
  'use strict';
  /**
   * @type {!Object}
   * @private
   */
  this.object_ = expectedObject;
};


/**
 * Determines if two objects are the same.
 *
 * @override
 */
goog.labs.testing.ObjectEqualsMatcher.prototype.matches = function(
    actualObject) {
  'use strict';
  return actualObject === this.object_;
};


/**
 * @override
 */
goog.labs.testing.ObjectEqualsMatcher.prototype.describe = function(
    actualObject) {
  'use strict';
  return 'Input object is not the same as the expected object.';
};



/**
 * The HasProperty matcher.
 *
 * @param {string} property Name of the property to test.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.HasPropertyMatcher = function(property) {
  'use strict';
  /**
   * @type {string}
   * @private
   */
  this.property_ = property;
};


/**
 * Determines if an object has a property.
 *
 * @override
 */
goog.labs.testing.HasPropertyMatcher.prototype.matches = function(
    actualObject) {
  'use strict';
  return this.property_ in actualObject;
};


/**
 * @override
 */
goog.labs.testing.HasPropertyMatcher.prototype.describe = function(
    actualObject) {
  'use strict';
  return 'Object does not have property: ' + this.property_;
};



/**
 * The InstanceOf matcher.
 *
 * @param {!Object} object The expected class object.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.InstanceOfMatcher = function(object) {
  'use strict';
  /**
   * @type {!Object}
   * @private
   */
  this.object_ = object;
};


/**
 * Determines if an object is an instance of another object.
 *
 * @override
 */
goog.labs.testing.InstanceOfMatcher.prototype.matches = function(actualObject) {
  'use strict';
  return actualObject instanceof this.object_;
};


/**
 * @override
 */
goog.labs.testing.InstanceOfMatcher.prototype.describe = function(
    actualObject) {
  'use strict';
  return 'Input object is not an instance of the expected object';
};



/**
 * The IsNullOrUndefined matcher.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.IsNullOrUndefinedMatcher = function() {};


/**
 * Determines if input value is null or undefined.
 *
 * @override
 */
goog.labs.testing.IsNullOrUndefinedMatcher.prototype.matches = function(
    actualValue) {
  'use strict';
  return actualValue == null;
};


/**
 * @override
 */
goog.labs.testing.IsNullOrUndefinedMatcher.prototype.describe = function(
    actualValue) {
  'use strict';
  return actualValue + ' is not null or undefined.';
};



/**
 * The IsNull matcher.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.IsNullMatcher = function() {};


/**
 * Determines if input value is null.
 *
 * @override
 */
goog.labs.testing.IsNullMatcher.prototype.matches = function(actualValue) {
  'use strict';
  return actualValue === null;
};


/**
 * @override
 */
goog.labs.testing.IsNullMatcher.prototype.describe = function(actualValue) {
  'use strict';
  return actualValue + ' is not null.';
};



/**
 * The IsUndefined matcher.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.IsUndefinedMatcher = function() {};


/**
 * Determines if input value is undefined.
 *
 * @override
 */
goog.labs.testing.IsUndefinedMatcher.prototype.matches = function(actualValue) {
  'use strict';
  return actualValue === undefined;
};


/**
 * @override
 */
goog.labs.testing.IsUndefinedMatcher.prototype.describe = function(
    actualValue) {
  'use strict';
  return actualValue + ' is not undefined.';
};


/** @return {!goog.labs.testing.AnyObjectMatcher} */
var anyObject = goog.labs.testing.AnyObjectMatcher.anyObject = function() {
  'use strict';
  return new goog.labs.testing.AnyObjectMatcher();
};


/**
 * Returns a matcher that matches objects that are equal to the input object.
 * Equality in this case means the two objects are references to the same
 * object.
 *
 * @param {!Object} object The expected object.
 *
 * @return {!goog.labs.testing.ObjectEqualsMatcher} A
 *     ObjectEqualsMatcher.
 */
var equalsObject =
    goog.labs.testing.ObjectEqualsMatcher.equalsObject = function(object) {
      'use strict';
      return new goog.labs.testing.ObjectEqualsMatcher(object);
    };


/**
 * Returns a matcher that matches objects that contain the input property.
 *
 * @param {string} property The property name to check.
 *
 * @return {!goog.labs.testing.HasPropertyMatcher} A HasPropertyMatcher.
 */
var hasProperty =
    goog.labs.testing.HasPropertyMatcher.hasProperty = function(property) {
      'use strict';
      return new goog.labs.testing.HasPropertyMatcher(property);
    };


/**
 * Returns a matcher that matches instances of the input class.
 *
 * @param {!Object} object The class object.
 *
 * @return {!goog.labs.testing.InstanceOfMatcher} A
 *     InstanceOfMatcher.
 */
var instanceOfClass =
    goog.labs.testing.InstanceOfMatcher.instanceOfClass = function(object) {
      'use strict';
      return new goog.labs.testing.InstanceOfMatcher(object);
    };


/**
 * Returns a matcher that matches all null values.
 *
 * @return {!goog.labs.testing.IsNullMatcher} A IsNullMatcher.
 */
var isNull = goog.labs.testing.IsNullMatcher.isNull = function() {
  'use strict';
  return new goog.labs.testing.IsNullMatcher();
};


/**
 * Returns a matcher that matches all null and undefined values.
 *
 * @return {!goog.labs.testing.IsNullOrUndefinedMatcher} A
 *     IsNullOrUndefinedMatcher.
 */
var isNullOrUndefined =
    goog.labs.testing.IsNullOrUndefinedMatcher.isNullOrUndefined = function() {
      'use strict';
      return new goog.labs.testing.IsNullOrUndefinedMatcher();
    };


/**
 * Returns a matcher that matches undefined values.
 *
 * @return {!goog.labs.testing.IsUndefinedMatcher} A IsUndefinedMatcher.
 */
var isUndefined =
    goog.labs.testing.IsUndefinedMatcher.isUndefined = function() {
      'use strict';
      return new goog.labs.testing.IsUndefinedMatcher();
    };
