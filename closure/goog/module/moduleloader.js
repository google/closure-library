// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview The module loader for loading modules across the network.
 *
 * Browsers do not guarantee that scripts appended to the document
 * are executed in the order they are added. For production mode, we use
 * XHRs to load scripts, because they do not have this problem and they
 * have superior mechanisms for handling failure. However, XHR-evaled
 * scripts are harder to debug.
 *
 * In debugging mode, we use normal script tags. In order to make this work,
 * we load the scripts in serial: we do not execute script B to the document
 * until we are certain that script A is finished loading.
 *
 */

goog.provide('goog.module.ModuleLoader');

goog.require('goog.loader.ModuleLoader');
/** @suppress {extraRequire} */
goog.require('goog.module');

/**
 * @const
 * @deprecated Please use goog.loader.ModuleLoader.
 */
goog.module.ModuleLoader = goog.loader.ModuleLoader
