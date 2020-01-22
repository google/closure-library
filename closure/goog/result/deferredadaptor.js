/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An adaptor from a Result to a Deferred.
 *
 * TODO (vbhasin): cancel() support.
 * TODO (vbhasin): See if we can make this a static.
 * TODO (gboyer, vbhasin): Rename to "Adapter" once this graduates; this is the
 * proper programmer spelling.
 */


goog.provide('goog.result.DeferredAdaptor');

goog.require('goog.async.Deferred');
goog.require('goog.result');
goog.require('goog.result.Result');



/**
 * An adaptor from Result to a Deferred, for use with existing Deferred chains.
 *
 * @param {!goog.result.Result} result A result.
 * @constructor
 * @extends {goog.async.Deferred}
 * @final
 * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration
 */
goog.result.DeferredAdaptor = function(result) {
  goog.result.DeferredAdaptor.base(this, 'constructor');
  goog.result.wait(result, function(result) {
    if (this.hasFired()) {
      return;
    }
    if (result.getState() == goog.result.Result.State.SUCCESS) {
      this.callback(result.getValue());
    } else if (result.getState() == goog.result.Result.State.ERROR) {
      if (result.getError() instanceof goog.result.Result.CancelError) {
        this.cancel();
      } else {
        this.errback(result.getError());
      }
    }
  }, this);
};
goog.inherits(goog.result.DeferredAdaptor, goog.async.Deferred);
