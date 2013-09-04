// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview An enum that contains the possible status type's of the Gears
 * feature of an application.
 *
 */

goog.provide('goog.ui.GearsStatusType');


/**
 * The possible status types for Gears.
 *
 * This is branched from goog.gears.StatusType as goog.ui.OfflineStatusCard
 * and goog.ui.OfflineStatusComponent are still in use and rely on these status
 * codes.
 *
 * @enum {string}
 * @deprecated Gears is discontinued.
 */
goog.ui.GearsStatusType = {
  NOT_INSTALLED: 'ni',
  INSTALLED: 'i',
  PAUSED: 'p',
  OFFLINE: 'off',
  ONLINE: 'on',
  SYNCING: 's',
  CAPTURING: 'c',
  ERROR: 'e'
};
