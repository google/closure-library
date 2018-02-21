// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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

goog.provide('test.js.ProvideRequiresGoogModuleGet');

goog.require('test.js.GoogModule');

goog.scope(function() {

var GoogModule = goog.module.get('test.js.GoogModule');

/**
 * @extends {test.js.GoogModule}
 * @struct @constructor
 */
test.js.ProvideRequiresGoogModuleGet = function() {
  test.js.ProvideRequiresGoogModuleGet.base(this, 'constructor');
};
goog.inherits(test.js.ProvideRequiresGoogModuleGet, GoogModule);

/** @const {string} */
test.js.ProvideRequiresGoogModuleGet.NAME = 'PROVIDE-REQUIRES-GOOG-MODULE-GET';
});  // goog.scope
