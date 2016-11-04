// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.i18n.TimeZoneTest');
goog.setTestOnly('goog.i18n.TimeZoneTest');

goog.require('goog.i18n.TimeZone');
goog.require('goog.testing.jsunit');

// Where could such data be found
// In js_i18n_data in http://go/i18n_dir, we have a bunch of files with names
// like TimeZoneConstant__<locale>.js
// We strongly discourage you to use them directly as those data can make
// your client code bloated. You should try to provide this data from server
// in a selective manner. In typical scenario, user's time zone is retrieved
// and only data for that time zone should be provided.
// This piece of data is in JSON format. It requires double quote.
var americaLosAngelesData = {
  'transitions': [
    2770,   60, 7137,   0, 11506,  60, 16041,  0, 20410,  60, 24777,  0,
    29146,  60, 33513,  0, 35194,  60, 42249,  0, 45106,  60, 50985,  0,
    55354,  60, 59889,  0, 64090,  60, 68625,  0, 72994,  60, 77361,  0,
    81730,  60, 86097,  0, 90466,  60, 94833,  0, 99202,  60, 103569, 0,
    107938, 60, 112473, 0, 116674, 60, 121209, 0, 125578, 60, 129945, 0,
    134314, 60, 138681, 0, 143050, 60, 147417, 0, 151282, 60, 156153, 0,
    160018, 60, 165057, 0, 168754, 60, 173793, 0, 177490, 60, 182529, 0,
    186394, 60, 191265, 0, 195130, 60, 200001, 0, 203866, 60, 208905, 0,
    212602, 60, 217641, 0, 221338, 60, 226377, 0, 230242, 60, 235113, 0,
    238978, 60, 243849, 0, 247714, 60, 252585, 0, 256450, 60, 261489, 0,
    265186, 60, 270225, 0, 273922, 60, 278961, 0, 282826, 60, 287697, 0,
    291562, 60, 296433, 0, 300298, 60, 305337, 0, 309034, 60, 314073, 0,
    317770, 60, 322809, 0, 326002, 60, 331713, 0, 334738, 60, 340449, 0,
    343474, 60, 349185, 0, 352378, 60, 358089, 0, 361114, 60, 366825, 0,
    369850, 60, 375561, 0, 378586, 60, 384297, 0, 387322, 60, 393033, 0,
    396058, 60, 401769, 0, 404962, 60, 410673, 0, 413698, 60, 419409, 0,
    422434, 60, 428145, 0, 431170, 60, 436881, 0, 439906, 60, 445617, 0,
    448810, 60, 454521, 0, 457546, 60, 463257, 0, 466282, 60, 471993, 0,
    475018, 60, 480729, 0, 483754, 60, 489465, 0, 492490, 60, 498201, 0,
    501394, 60, 507105, 0, 510130, 60, 515841, 0, 518866, 60, 524577, 0,
    527602, 60, 533313, 0, 536338, 60, 542049, 0, 545242, 60, 550953, 0,
    553978, 60, 559689, 0, 562714, 60, 568425, 0, 571450, 60, 577161, 0,
    580186, 60, 585897, 0, 588922, 60, 594633, 0
  ],
  'names': ['PST', 'Pacific Standard Time', 'PDT', 'Pacific Daylight Time'],
  'names_ext': {
    STD_LONG_NAME_GMT: 'GMT-08:00',
    STD_GENERIC_LOCATION: 'Los Angeles Time',
    DST_LONG_NAME_GMT: 'GMT-07:00',
    DST_GENERIC_LOCATION: 'Los Angeles Time'
  },
  'id': 'America/Los_Angeles',
  'std_offset': -480
};

var americaLosAngelesDataStringKeys = {
  'transitions': [
    2770,   60, 7137,   0, 11506,  60, 16041,  0, 20410,  60, 24777,  0,
    29146,  60, 33513,  0, 35194,  60, 42249,  0, 45106,  60, 50985,  0,
    55354,  60, 59889,  0, 64090,  60, 68625,  0, 72994,  60, 77361,  0,
    81730,  60, 86097,  0, 90466,  60, 94833,  0, 99202,  60, 103569, 0,
    107938, 60, 112473, 0, 116674, 60, 121209, 0, 125578, 60, 129945, 0,
    134314, 60, 138681, 0, 143050, 60, 147417, 0, 151282, 60, 156153, 0,
    160018, 60, 165057, 0, 168754, 60, 173793, 0, 177490, 60, 182529, 0,
    186394, 60, 191265, 0, 195130, 60, 200001, 0, 203866, 60, 208905, 0,
    212602, 60, 217641, 0, 221338, 60, 226377, 0, 230242, 60, 235113, 0,
    238978, 60, 243849, 0, 247714, 60, 252585, 0, 256450, 60, 261489, 0,
    265186, 60, 270225, 0, 273922, 60, 278961, 0, 282826, 60, 287697, 0,
    291562, 60, 296433, 0, 300298, 60, 305337, 0, 309034, 60, 314073, 0,
    317770, 60, 322809, 0, 326002, 60, 331713, 0, 334738, 60, 340449, 0,
    343474, 60, 349185, 0, 352378, 60, 358089, 0, 361114, 60, 366825, 0,
    369850, 60, 375561, 0, 378586, 60, 384297, 0, 387322, 60, 393033, 0,
    396058, 60, 401769, 0, 404962, 60, 410673, 0, 413698, 60, 419409, 0,
    422434, 60, 428145, 0, 431170, 60, 436881, 0, 439906, 60, 445617, 0,
    448810, 60, 454521, 0, 457546, 60, 463257, 0, 466282, 60, 471993, 0,
    475018, 60, 480729, 0, 483754, 60, 489465, 0, 492490, 60, 498201, 0,
    501394, 60, 507105, 0, 510130, 60, 515841, 0, 518866, 60, 524577, 0,
    527602, 60, 533313, 0, 536338, 60, 542049, 0, 545242, 60, 550953, 0,
    553978, 60, 559689, 0, 562714, 60, 568425, 0, 571450, 60, 577161, 0,
    580186, 60, 585897, 0, 588922, 60, 594633, 0
  ],
  'names': ['PST', 'Pacific Standard Time', 'PDT', 'Pacific Daylight Time'],
  'names_ext': {
    'STD_LONG_NAME_GMT': 'GMT-08:00',
    'STD_GENERIC_LOCATION': 'Los Angeles Time',
    'DST_LONG_NAME_GMT': 'GMT-07:00',
    'DST_GENERIC_LOCATION': 'Los Angeles Time'
  },
  'id': 'America/Los_Angeles',
  'std_offset': -480
};

function testIsDaylightTime() {
  var usPacific = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var dt = new Date(2007, 7 - 1, 1);
  assertTrue(usPacific.isDaylightTime(dt));
  // 2007/03/11 2:00am has daylight change. We set time through UTC so that
  // this test won't be affected by browser's local time handling.
  dt = new Date(2007, 3 - 1, 11);
  // The date above is created with a timezone of the computer it is run on.
  // Therefore the UTC day has to be set explicitly to be sure that the date
  // is correct for timezones east of Greenwich  where 2007/3/11 0:00 is still
  // 2007/03/10 in UTC.
  dt.setUTCDate(11);
  dt.setUTCHours(2 + 8);
  dt.setUTCMinutes(1);
  assertTrue(usPacific.isDaylightTime(dt));
  dt.setUTCHours(1 + 8);
  dt.setUTCMinutes(59);
  assertTrue(!usPacific.isDaylightTime(dt));

  dt = new Date(2007, 11 - 1, 4);
  // Set the UTC day explicitly to make it work in timezones east of
  // Greenwich.
  dt.setUTCDate(4);
  dt.setUTCHours(2 + 7);
  dt.setUTCMinutes(1);
  assertTrue(!usPacific.isDaylightTime(dt));

  // there seems to be a browser bug. local time 1:59am should still be PDT.
  dt.setUTCHours(0 + 7);
  dt.setUTCMinutes(59);
  assertTrue(usPacific.isDaylightTime(dt));
}

function testGetters() {
  var date = new Date();
  var usPacific = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  assertEquals('America/Los_Angeles', usPacific.getTimeZoneId());
  assertObjectEquals(americaLosAngelesData, usPacific.getTimeZoneData());
}

function testNames() {
  var usPacific = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var dt = new Date(2007, 7 - 1, 1);
  assertTrue(usPacific.isDaylightTime(dt));
  assertEquals('PDT', usPacific.getShortName(dt));
  assertEquals('Pacific Daylight Time', usPacific.getLongName(dt));

  dt = new Date(2007, 12 - 1, 1);
  assertTrue(!usPacific.isDaylightTime(dt));
  assertEquals('PST', usPacific.getShortName(dt));
  assertEquals('Pacific Standard Time', usPacific.getLongName(dt));
}

function testNamesExt() {
  var usPacific = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var dt = new Date(2007, 7 - 1, 1);
  assertTrue(usPacific.isDaylightTime(dt));
  assertEquals('GMT-07:00', usPacific.getLongNameGMT(dt));
  assertEquals('Los Angeles Time', usPacific.getGenericLocation(dt));

  dt = new Date(2007, 12 - 1, 1);
  assertTrue(!usPacific.isDaylightTime(dt));
  assertEquals('GMT-08:00', usPacific.getLongNameGMT(dt));
  assertEquals('Los Angeles Time', usPacific.getGenericLocation(dt));
}

function testNamesExtStringKeys() {
  var usPacific =
      goog.i18n.TimeZone.createTimeZone(americaLosAngelesDataStringKeys);
  var dt = new Date(2007, 7 - 1, 1);
  assertTrue(usPacific.isDaylightTime(dt));
  assertEquals('GMT-07:00', usPacific.getLongNameGMT(dt));
  assertEquals('Los Angeles Time', usPacific.getGenericLocation(dt));

  dt = new Date(2007, 12 - 1, 1);
  assertTrue(!usPacific.isDaylightTime(dt));
  assertEquals('GMT-08:00', usPacific.getLongNameGMT(dt));
  assertEquals('Los Angeles Time', usPacific.getGenericLocation(dt));
}

function testGeneratedData() {
  var usPacific = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var dt = new Date(2007, 7 - 1, 1);
  assertTrue(usPacific.isDaylightTime(dt));
  assertEquals(420, usPacific.getOffset(dt));
  assertEquals('GMT-07:00', usPacific.getGMTString(dt));
  assertEquals('-0700', usPacific.getRFCTimeZoneString(dt));

  dt = new Date(2007, 12 - 1, 1);
  assertTrue(!usPacific.isDaylightTime(dt));
  assertEquals(480, usPacific.getOffset(dt));
  assertEquals('GMT-08:00', usPacific.getGMTString(dt));
  assertEquals('-0800', usPacific.getRFCTimeZoneString(dt));
}

function testSimpleTimeZonePositive() {
  var date = new Date();
  var simpleTimeZone = goog.i18n.TimeZone.createTimeZone(480);
  assertEquals(480, simpleTimeZone.getOffset(date));
  assertEquals('GMT-08:00', simpleTimeZone.getGMTString(date));
  assertEquals('Etc/GMT+8', simpleTimeZone.getTimeZoneId());
  assertEquals('UTC-8', simpleTimeZone.getLongName(date));
  assertEquals('UTC-8', simpleTimeZone.getShortName(date));
  assertEquals('-0800', simpleTimeZone.getRFCTimeZoneString(date));
  assertEquals('GMT-08:00', simpleTimeZone.getLongNameGMT(date));
  assertEquals('GMT-08:00', simpleTimeZone.getGenericLocation(date));
  assertEquals(false, simpleTimeZone.isDaylightTime(date));

  simpleTimeZone = goog.i18n.TimeZone.createTimeZone(630);
  assertEquals(630, simpleTimeZone.getOffset(date));
  assertEquals('GMT-10:30', simpleTimeZone.getGMTString(date));
  assertEquals('Etc/GMT+10:30', simpleTimeZone.getTimeZoneId());
  assertEquals('UTC-10:30', simpleTimeZone.getLongName(date));
  assertEquals('UTC-10:30', simpleTimeZone.getShortName(date));
  assertEquals('-1030', simpleTimeZone.getRFCTimeZoneString(date));
  assertEquals('GMT-10:30', simpleTimeZone.getLongNameGMT(date));
  assertEquals('GMT-10:30', simpleTimeZone.getGenericLocation(date));
  assertEquals(false, simpleTimeZone.isDaylightTime(date));
}

function testSimpleTimeZoneNegative() {
  var date = new Date();
  var simpleTimeZone = goog.i18n.TimeZone.createTimeZone(-480);
  assertEquals(-480, simpleTimeZone.getOffset(date));
  assertEquals('GMT+08:00', simpleTimeZone.getGMTString(date));
  assertEquals('Etc/GMT-8', simpleTimeZone.getTimeZoneId());
  assertEquals('UTC+8', simpleTimeZone.getLongName(date));
  assertEquals('UTC+8', simpleTimeZone.getShortName(date));
  assertEquals('+0800', simpleTimeZone.getRFCTimeZoneString(date));
  assertEquals('GMT+08:00', simpleTimeZone.getLongNameGMT(date));
  assertEquals('GMT+08:00', simpleTimeZone.getGenericLocation(date));
  assertEquals(false, simpleTimeZone.isDaylightTime(date));
}

function testSimpleTimeZoneZero() {
  var date = new Date();
  var simpleTimeZone = goog.i18n.TimeZone.createTimeZone(0);
  assertEquals(0, simpleTimeZone.getOffset(date));
  assertEquals('GMT+00:00', simpleTimeZone.getGMTString(date));
  assertEquals('Etc/GMT', simpleTimeZone.getTimeZoneId());
  assertEquals('UTC', simpleTimeZone.getLongName(date));
  assertEquals('UTC', simpleTimeZone.getShortName(date));
  assertEquals('+0000', simpleTimeZone.getRFCTimeZoneString(date));
  assertEquals('GMT+00:00', simpleTimeZone.getLongNameGMT(date));
  assertEquals('GMT+00:00', simpleTimeZone.getGenericLocation(date));
  assertEquals(false, simpleTimeZone.isDaylightTime(date));
}
