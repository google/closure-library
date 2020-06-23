/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.iter.StopIteration');

goog.module.declareLegacyNamespace();

/**
 * Singleton Error object that is used to terminate iterations.
 * @const {!Error}
 */
exports = ('StopIteration' in goog.global) ?
    // For script engines that support legacy iterators.
    goog.global['StopIteration'] :
    {message: 'StopIteration', stack: ''};
