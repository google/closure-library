// Copyright 2016 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.testing.MockUtil');

goog.require('goog.object');
goog.require('goog.structs.Set');

goog.setTestOnly('goog.testing.MockUtil');



/**
 * Get all properties of an object.
 *
 * <p> Depending on the browser this will return both enumerable and
 * non-enumerable properties, or only enumerable properties. It will not,
 * however, get the properties on the {@code Object.prototype} since some tests
 * depend on things like {@code toString()} to not be mocked if it has not been
 * overridden.
 *
 * @param {Object} obj The object to get the properties of.
 * @return {!Array<string>}
 * @public
 */
goog.testing.MockUtil.getAllProperties = function(obj) {
  if (!obj || obj === Object.prototype) {
    return [];
  }

  if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
    return goog.object.getKeys(obj);
  }

  var visited = new goog.structs.Set();
  visited.addAll(Object.getOwnPropertyNames(obj));

  var proto = Object.getPrototypeOf(obj);
  if (proto) {
    visited.addAll(goog.testing.MockUtil.getAllProperties(proto));
  }

  return visited.getValues();
};
