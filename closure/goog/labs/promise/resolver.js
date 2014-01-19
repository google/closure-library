// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.labs.Resolver');



/**
 * Resolver interface for promises. The resolver is a convenience interface that
 * bundles the promise and its associated resolve and reject functions together,
 * for cases where the resolver needs to be persisted internally.
 *
 * @interface
 * @template TYPE
 */
goog.labs.Resolver = function() {};


/**
 * The promise that created this resolver.
 * @const {!goog.labs.Promise.<TYPE>}
 */
goog.labs.Resolver.prototype.promise;


/**
 * Resolves this resolver with the specified value.
 * @const {function((TYPE|goog.labs.Promise.<TYPE>|Thenable))}
 */
goog.labs.Resolver.prototype.resolve;


/**
 * Rejects this resolver with the specified reason.
 * @const {function(*): void}
 */
goog.labs.Resolver.prototype.reject;
