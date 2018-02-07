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

goog.provide('test.js.ProvideRequiresGoogModuleDLN');

goog.require('test.js.GoogModuleDLN');

/**
 * @extends {test.js.GoogModuleDLN}
 * @struct @constructor
 */
test.js.ProvideRequiresGoogModuleDLN = function() {
  test.js.ProvideRequiresGoogModuleDLN.base(this, 'constructor');
};
goog.inherits(test.js.ProvideRequiresGoogModuleDLN, test.js.GoogModuleDLN);

/** @const {string} */
test.js.ProvideRequiresGoogModuleDLN.NAME = 'PROVIDE-REQUIRES-GOOG-MODULE-DLN';
