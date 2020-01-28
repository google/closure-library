/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Abstract interface for storing and retrieving data using
 * some persistence mechanism.
 */

goog.provide('goog.storage.mechanism.Mechanism');



/**
 * Basic interface for all storage mechanisms.
 *
 * @constructor
 * @struct
 */
goog.storage.mechanism.Mechanism = function() {};


/**
 * Set a value for a key.
 *
 * @param {string} key The key to set.
 * @param {string} value The string to save.
 */
goog.storage.mechanism.Mechanism.prototype.set = goog.abstractMethod;


/**
 * Get the value stored under a key.
 *
 * @param {string} key The key to get.
 * @return {?string} The corresponding value, null if not found.
 */
goog.storage.mechanism.Mechanism.prototype.get = goog.abstractMethod;


/**
 * Remove a key and its value.
 *
 * @param {string} key The key to remove.
 */
goog.storage.mechanism.Mechanism.prototype.remove = goog.abstractMethod;
