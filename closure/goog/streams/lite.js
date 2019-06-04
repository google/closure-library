// Copyright 2019 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview A lite polyfill of the ReadableStream native API with a subset
 * of methods supported.
 */
goog.module('goog.streams.lite');

/**
 * The underlying source for a ReadableStream.
 * @template T
 * @record
 */
class ReadableStreamUnderlyingSource {
  constructor() {
    /**
     * A start method that is called when the ReadableStream is constructed.
     *
     * For the purpose of the lite version, this method is not optional,
     * and the return value is not used. In other versions, a Promise return
     * value will prevent calls to pull until the Promise is resolved.
     * @type {(function(!ReadableStreamDefaultController<T>):
     *     (!Promise<undefined>|undefined))|undefined}
     */
    this.start;
  }
}

/**
 * TODO(b/134170243): Implement this class.
 * @template T
 */
class ReadableStreamDefaultController {}

exports = {
  ReadableStreamUnderlyingSource,
};
