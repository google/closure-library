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
 * of methods supported that uses the native ReadableStream.
 */
goog.module('goog.streams.liteNativeImpl');

const liteTypes = goog.require('goog.streams.liteTypes');

/**
 * @template T
 * @extends {liteTypes.ReadableStream<T>}
 */
class NativeReadableStream extends liteTypes.ReadableStream {
  /**
   * @param {!ReadableStream} stream
   */
  constructor(stream) {
    super();

    /** @private @const {!ReadableStream} */
    this.stream_ = stream;
  }

  /** @override */
  get locked() {
    return this.stream_.locked;
  }

  /** @override */
  getReader() {
    return new NativeReadableStreamDefaultReader(
        /** @type {!ReadableStreamDefaultReader} */ (this.stream_.getReader()));
  }
}

/**
 * @param {!liteTypes.ReadableStreamUnderlyingSource<T>} underlyingSource
 * @return {!NativeReadableStream<T>}
 * @suppress {strictMissingProperties}
 * @template T
 */
function newReadableStream(underlyingSource) {
  /** @const {!ReadableStreamSource} */
  const source = {
    start(controller) {
      return underlyingSource.start(
          new NativeReadableStreamDefaultController(controller));
    },
  };
  const stream = new ReadableStream(source);
  return new NativeReadableStream(stream);
}

/**
 * @template T
 * @extends {liteTypes.ReadableStreamDefaultReader<T>}
 */
class NativeReadableStreamDefaultReader extends
    liteTypes.ReadableStreamDefaultReader {
  /**
   * @param {!ReadableStreamDefaultReader} reader
   */
  constructor(reader) {
    super();

    /** @private @const {!ReadableStreamDefaultReader} */
    this.reader_ = reader;
  }

  /** @override */
  get closed() {
    return this.reader_.closed;
  }

  /** @override */
  read() {
    return this.reader_.read();
  }

  /** @override */
  releaseLock() {
    this.reader_.releaseLock();
  }
}

/**
 * @template T
 * @extends {liteTypes.ReadableStreamDefaultController<T>}
 */
class NativeReadableStreamDefaultController extends
    liteTypes.ReadableStreamDefaultController {
  /**
   * @param {!ReadableStreamDefaultController} controller
   */
  constructor(controller) {
    super();

    /** @private @const {!ReadableStreamDefaultController} */
    this.controller_ = controller;
  }

  /** @override */
  close() {
    this.controller_.close();
  }

  /** @override */
  enqueue(chunk) {
    this.controller_.enqueue(chunk);
  }

  /** @override */
  error(e) {
    this.controller_.error(e);
  }
}

exports = {
  NativeReadableStream,
  NativeReadableStreamDefaultController,
  NativeReadableStreamDefaultReader,
  newReadableStream,
};
