// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Restricted class definitions for Closure.
 *
 * @author johnlenz@google.com (John Lenz)
 */

goog.provide('goog.labs.classdef');

/**
 * @param {Function} superClass The superclass or null.
 * @param {goog.defineClass.ClassDescriptor} def
 * @return {!Function} The class constructor.
 */
goog.labs.classdef.defineClass = goog.defineClass;

