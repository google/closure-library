/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper class for recording the calls of a constructor.
 *
 * Example:
 * <pre>
 * var stubs = new goog.testing.PropertyReplacer();
 *
 * function tearDown() {
 *   stubs.reset();
 * }
 *
 * function testOpenDialog() {
 *   stubs.replace(goog.ui, 'Dialog',
 *       goog.testing.recordConstructor(goog.ui.Dialog));
 *   openConfirmDialog();
 *   var lastDialogInstance = goog.ui.Dialog.getLastCall().getThis();
 *   assertEquals('confirm', lastDialogInstance.getTitle());
 * }
 * </pre>
 */

goog.module('goog.testing.recordConstructor');
goog.module.declareLegacyNamespace();
goog.setTestOnly('goog.testing.recordConstructor');

const recordFunction = goog.require('goog.testing.recordFunction');

/**
 * Same as {@link goog.testing.recordFunction} but the recorded function will
 * have the same prototype and static fields as the original one. It can be
 * used with constructors.
 *
 * @param {!Function} ctor The function to wrap and record.
 * @return {!Function} The wrapped function.
 */
function recordConstructor(ctor) {
  const recordedConstructor = recordFunction(ctor);
  recordedConstructor.prototype = ctor.prototype;

  // NOTE: This does not handle non-enumerable properties, should it?
  for (const x in ctor) {
    recordedConstructor[x] = ctor[x];
  }
  return recordedConstructor;
}

exports = recordConstructor;
