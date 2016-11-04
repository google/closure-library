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

goog.provide('goog.i18n.DateTimeFormatTest');
goog.setTestOnly('goog.i18n.DateTimeFormatTest');

goog.require('goog.date.Date');
goog.require('goog.date.DateTime');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimePatterns');
goog.require('goog.i18n.DateTimePatterns_ar');
goog.require('goog.i18n.DateTimePatterns_de');
goog.require('goog.i18n.DateTimePatterns_en');
goog.require('goog.i18n.DateTimePatterns_fa');
goog.require('goog.i18n.DateTimePatterns_fr');
goog.require('goog.i18n.DateTimePatterns_ja');
goog.require('goog.i18n.DateTimePatterns_sv');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('goog.i18n.DateTimeSymbols_ar');
goog.require('goog.i18n.DateTimeSymbols_ar_AE');
goog.require('goog.i18n.DateTimeSymbols_ar_SA');
goog.require('goog.i18n.DateTimeSymbols_bn_BD');
goog.require('goog.i18n.DateTimeSymbols_de');
goog.require('goog.i18n.DateTimeSymbols_en');
goog.require('goog.i18n.DateTimeSymbols_en_GB');
goog.require('goog.i18n.DateTimeSymbols_en_IE');
goog.require('goog.i18n.DateTimeSymbols_en_IN');
goog.require('goog.i18n.DateTimeSymbols_en_US');
goog.require('goog.i18n.DateTimeSymbols_fa');
goog.require('goog.i18n.DateTimeSymbols_fr');
goog.require('goog.i18n.DateTimeSymbols_fr_DJ');
goog.require('goog.i18n.DateTimeSymbols_he_IL');
goog.require('goog.i18n.DateTimeSymbols_ja');
goog.require('goog.i18n.DateTimeSymbols_ro_RO');
goog.require('goog.i18n.DateTimeSymbols_sv');
goog.require('goog.i18n.TimeZone');
goog.require('goog.testing.jsunit');

// Initial values
goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en;
goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en;

function tearDown() {
  // We always revert to a known state
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en;
  goog.i18n.DateTimeFormat.setEnforceAsciiDigits(false);
}

// Helpers to make tests work regardless of the timeZone we're in.
function timezoneString(date) {
  var timeZone = goog.i18n.TimeZone.createTimeZone(date.getTimezoneOffset());
  return timeZone.getShortName(date);
}

function timezoneId(date) {
  var timeZone = goog.i18n.TimeZone.createTimeZone(date.getTimezoneOffset());
  return timeZone.getTimeZoneId(date);
}

function timezoneStringRFC(date) {
  var timeZone = goog.i18n.TimeZone.createTimeZone(date.getTimezoneOffset());
  return timeZone.getRFCTimeZoneString(date);
}

// Where could such data be found
// In js_i18n_data in http://go/i18n_dir, we have a bunch of files with names
// like TimeZoneConstant__<locale>.js
// We strongly discourage you to use them directly as those data can make
// your client code bloated. You should try to provide this data from server
// in a selective manner. In typical scenario, user's time zone is retrieved
// and only data for that time zone should be provided.
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

var europeBerlinData = {
  'transitions': [
    89953,  60, 94153,  0, 98521,  60, 102889, 0, 107257, 60, 111625, 0,
    115993, 60, 120361, 0, 124729, 60, 129265, 0, 133633, 60, 138001, 0,
    142369, 60, 146737, 0, 151105, 60, 155473, 0, 159841, 60, 164209, 0,
    168577, 60, 172945, 0, 177313, 60, 181849, 0, 186217, 60, 190585, 0,
    194953, 60, 199321, 0, 203689, 60, 208057, 0, 212425, 60, 216793, 0,
    221161, 60, 225529, 0, 230065, 60, 235105, 0, 238801, 60, 243841, 0,
    247537, 60, 252577, 0, 256273, 60, 261481, 0, 265009, 60, 270217, 0,
    273745, 60, 278953, 0, 282649, 60, 287689, 0, 291385, 60, 296425, 0,
    300121, 60, 305329, 0, 308857, 60, 314065, 0, 317593, 60, 322801, 0,
    326329, 60, 331537, 0, 335233, 60, 340273, 0, 343969, 60, 349009, 0,
    352705, 60, 357913, 0, 361441, 60, 366649, 0, 370177, 60, 375385, 0,
    379081, 60, 384121, 0, 387817, 60, 392857, 0, 396553, 60, 401593, 0,
    405289, 60, 410497, 0, 414025, 60, 419233, 0, 422761, 60, 427969, 0,
    431665, 60, 436705, 0, 440401, 60, 445441, 0, 449137, 60, 454345, 0,
    457873, 60, 463081, 0, 466609, 60, 471817, 0, 475513, 60, 480553, 0,
    484249, 60, 489289, 0, 492985, 60, 498025, 0, 501721, 60, 506929, 0,
    510457, 60, 515665, 0, 519193, 60, 524401, 0, 528097, 60, 533137, 0,
    536833, 60, 541873, 0, 545569, 60, 550777, 0, 554305, 60, 559513, 0,
    563041, 60, 568249, 0, 571777, 60, 576985, 0, 580681, 60, 585721, 0,
    589417, 60, 594457, 0
  ],
  'names': [
    'MEZ', 'Mitteleurop\u00e4ische Zeit', 'MESZ',
    'Mitteleurop\u00e4ische Sommerzeit'
  ],
  'names_ext': {
    STD_LONG_NAME_GMT: 'GMT+01:00',
    STD_GENERIC_LOCATION: 'Deutschland Zeit',
    DST_LONG_NAME_GMT: 'GMT+02:00',
    DST_GENERIC_LOCATION: 'Deutschland Zeit'
  },
  'id': 'Europe/Berlin',
  'std_offset': 60
};

var date;

function testHHmmss() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('HH:mm:ss');
  assertEquals('13:10:10', fmt.format(date));
}

function testhhmmssa() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('h:mm:ss a');
  assertEquals('1:10:10 nachm.', fmt.format(date));
}

function testEEEMMMddyy() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('EEE, MMM d, yy');
  assertEquals('Do., Juli 27, 06', fmt.format(date));
}

function testEEEEMMMddyy() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('EEEE,MMMM dd, yyyy');
  assertEquals('Donnerstag,Juli 27, 2006', fmt.format(date));
}

function testyyyyMMddG() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(Date.UTC(2006, 6, 27, 13, 10, 10, 250));
  var timeZone =
      goog.i18n.TimeZone.createTimeZone(420, goog.i18n.DateTimeSymbols_de);
  var fmt = new goog.i18n.DateTimeFormat('yyyy.MM.dd G \'at\' HH:mm:ss vvvv');
  assertEquals(
      '2006.07.27 n. Chr. at 06:10:10 Etc/GMT+7', fmt.format(date, timeZone));
}

function testyyyyyMMMMM() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('yyyyy.MMMMM.dd GGG hh:mm aaa');
  assertEquals('02006.J.27 n. Chr. 01:10 nachm.', fmt.format(date));

  date = new Date(972, 11, 25, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('yyyyy.MMMMM.dd');
  assertEquals('00972.D.25', fmt.format(date));
}

function testQQQQyy() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 0, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('QQQQ yy');
  assertEquals('1. Quartal 06', fmt.format(date));
  date = new Date(2006, 1, 27, 13, 10, 10, 250);
  assertEquals('1. Quartal 06', fmt.format(date));
  date = new Date(2006, 2, 27, 13, 10, 10, 250);
  assertEquals('1. Quartal 06', fmt.format(date));
  date = new Date(2006, 3, 27, 13, 10, 10, 250);
  assertEquals('2. Quartal 06', fmt.format(date));
  date = new Date(2006, 4, 27, 13, 10, 10, 250);
  assertEquals('2. Quartal 06', fmt.format(date));
  date = new Date(2006, 5, 27, 13, 10, 10, 250);
  assertEquals('2. Quartal 06', fmt.format(date));
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  assertEquals('3. Quartal 06', fmt.format(date));
  date = new Date(2006, 7, 27, 13, 10, 10, 250);
  assertEquals('3. Quartal 06', fmt.format(date));
  date = new Date(2006, 8, 27, 13, 10, 10, 250);
  assertEquals('3. Quartal 06', fmt.format(date));
  date = new Date(2006, 9, 27, 13, 10, 10, 250);
  assertEquals('4. Quartal 06', fmt.format(date));
  date = new Date(2006, 10, 27, 13, 10, 10, 250);
  assertEquals('4. Quartal 06', fmt.format(date));
  date = new Date(2006, 11, 27, 13, 10, 10, 250);
  assertEquals('4. Quartal 06', fmt.format(date));
}

function testQQyyyy() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 0, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('QQ yyyy');
  assertEquals('Q1 2006', fmt.format(date));
  date = new Date(2006, 1, 27, 13, 10, 10, 250);
  assertEquals('Q1 2006', fmt.format(date));
  date = new Date(2006, 2, 27, 13, 10, 10, 250);
  assertEquals('Q1 2006', fmt.format(date));
  date = new Date(2006, 3, 27, 13, 10, 10, 250);
  assertEquals('Q2 2006', fmt.format(date));
  date = new Date(2006, 4, 27, 13, 10, 10, 250);
  assertEquals('Q2 2006', fmt.format(date));
  date = new Date(2006, 5, 27, 13, 10, 10, 250);
  assertEquals('Q2 2006', fmt.format(date));
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  assertEquals('Q3 2006', fmt.format(date));
  date = new Date(2006, 7, 27, 13, 10, 10, 250);
  assertEquals('Q3 2006', fmt.format(date));
  date = new Date(2006, 8, 27, 13, 10, 10, 250);
  assertEquals('Q3 2006', fmt.format(date));
  date = new Date(2006, 9, 27, 13, 10, 10, 250);
  assertEquals('Q4 2006', fmt.format(date));
  date = new Date(2006, 10, 27, 13, 10, 10, 250);
  assertEquals('Q4 2006', fmt.format(date));
  date = new Date(2006, 11, 27, 13, 10, 10, 250);
  assertEquals('Q4 2006', fmt.format(date));
}

function testMMddyyyyHHmmsszzz() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zzz');
  assertEquals('07/27/2006 13:10:10 ' + timezoneString(date), fmt.format(date));
}

function testMMddyyyyHHmmssZ() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss Z');
  assertEquals(
      '07/27/2006 13:10:10 ' + timezoneStringRFC(date), fmt.format(date));
}

function testPatternMonthDayMedium() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  var fmt =
      new goog.i18n.DateTimeFormat(goog.i18n.DateTimePatterns.MONTH_DAY_MEDIUM);
  assertEquals('27. Juli', fmt.format(date));
}

function testPatternDayOfWeekMonthDayMedium() {
  date = new Date(2006, 6, 27, 13, 10, 10, 250);

  var fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimePatterns.WEEKDAY_MONTH_DAY_MEDIUM);
  assertEquals('Thu, Jul 27', fmt.format(date));

  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimePatterns.WEEKDAY_MONTH_DAY_MEDIUM);
  assertEquals('Do., 27. Juli', fmt.format(date));
}

function testPatternDayOfWeekMonthDayYearMedium() {
  date = new Date(2012, 5, 28, 13, 10, 10, 250);

  var fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimePatterns.WEEKDAY_MONTH_DAY_YEAR_MEDIUM);
  assertEquals('Thu, Jun 28, 2012', fmt.format(date));
  var fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimePatterns.MONTH_DAY_YEAR_MEDIUM);
  assertEquals('Jun 28, 2012', fmt.format(date));

  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sv;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sv;
  var fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimePatterns.WEEKDAY_MONTH_DAY_YEAR_MEDIUM);
  assertEquals('tors 28 juni 2012', fmt.format(date));
  var fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimePatterns.MONTH_DAY_YEAR_MEDIUM);
  assertEquals('28 juni 2012', fmt.format(date));
}

function testQuote() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 250);
  var fmt = new goog.i18n.DateTimeFormat('HH \'o\'\'clock\'');
  assertEquals('13 o\'clock', fmt.format(date));
  fmt = new goog.i18n.DateTimeFormat('HH \'oclock\'');
  assertEquals('13 oclock', fmt.format(date));
  fmt = new goog.i18n.DateTimeFormat('HH \'\'');
  assertEquals('13 \'', fmt.format(date));
}

function testFractionalSeconds() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 6, 27, 13, 10, 10, 256);
  var fmt = new goog.i18n.DateTimeFormat('s:S');
  assertEquals('10:3', fmt.format(date));
  var fmt = new goog.i18n.DateTimeFormat('s:SS');
  assertEquals('10:26', fmt.format(date));
  var fmt = new goog.i18n.DateTimeFormat('s:SSS');
  assertEquals('10:256', fmt.format(date));
  var fmt = new goog.i18n.DateTimeFormat('s:SSSS');
  assertEquals('10:2560', fmt.format(date));
  var fmt = new goog.i18n.DateTimeFormat('s:SSSSS');
  assertEquals('10:25600', fmt.format(date));
}

function testPredefinedFormatter() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  date = new Date(2006, 7, 4, 13, 49, 24, 0);
  var fmt =
      new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.FULL_DATE);
  assertEquals('Freitag, 4. August 2006', fmt.format(date));
  fmt = new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.LONG_DATE);
  assertEquals('4. August 2006', fmt.format(date));
  fmt =
      new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.MEDIUM_DATE);
  assertEquals('04.08.2006', fmt.format(date));
  fmt =
      new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.SHORT_DATE);
  assertEquals('04.08.06', fmt.format(date));
  fmt = new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.FULL_TIME);
  assertEquals('13:49:24 ' + timezoneString(date), fmt.format(date));
  fmt = new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.LONG_TIME);
  assertEquals('13:49:24 ' + timezoneString(date), fmt.format(date));
  fmt =
      new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.MEDIUM_TIME);
  assertEquals('13:49:24', fmt.format(date));
  fmt =
      new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.SHORT_TIME);
  assertEquals('13:49', fmt.format(date));
  fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.FULL_DATETIME);
  assertEquals(
      'Freitag, 4. August 2006 um 13:49:24 ' + timezoneString(date),
      fmt.format(date));
  fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.LONG_DATETIME);
  assertEquals(
      '4. August 2006 um 13:49:24 ' + timezoneString(date), fmt.format(date));
  fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.MEDIUM_DATETIME);
  assertEquals('04.08.2006, 13:49:24', fmt.format(date));
  fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.SHORT_DATETIME);
  assertEquals('04.08.06, 13:49', fmt.format(date));
}

function testMMddyyyyHHmmssZSimpleTimeZone() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var date = new Date(Date.UTC(2006, 6, 27, 13, 10, 10));
  var timeZone = goog.i18n.TimeZone.createTimeZone(480);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss Z');
  assertEquals('07/27/2006 05:10:10 -0800', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss ZZ');
  assertEquals('07/27/2006 05:10:10 -0800', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss ZZZ');
  assertEquals('07/27/2006 05:10:10 -0800', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss ZZZZ');
  assertEquals('07/27/2006 05:10:10 GMT-08:00', fmt.format(date, timeZone));
}


function testMMddyyyyHHmmssZCommonTimeZone() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var date = new Date(Date.UTC(2006, 6, 27, 13, 10, 10));
  var timeZone = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss Z');
  assertEquals('07/27/2006 06:10:10 -0700', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss ZZ');
  assertEquals('07/27/2006 06:10:10 -0700', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss ZZZ');
  assertEquals('07/27/2006 06:10:10 -0700', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss ZZZZ');
  assertEquals('07/27/2006 06:10:10 GMT-07:00', fmt.format(date, timeZone));
  date = new Date(Date.UTC(2006, 1, 27, 13, 10, 10));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss Z');
  assertEquals('02/27/2006 05:10:10 -0800', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss ZZ');
  assertEquals('02/27/2006 05:10:10 -0800', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss ZZZ');
  assertEquals('02/27/2006 05:10:10 -0800', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss ZZZZ');
  assertEquals('02/27/2006 05:10:10 GMT-08:00', fmt.format(date, timeZone));
}

function testMMddyyyyHHmmsszSimpleTimeZone() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var date = new Date(Date.UTC(2006, 6, 27, 13, 10, 10));
  var timeZone = goog.i18n.TimeZone.createTimeZone(420);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss z');
  assertEquals('07/27/2006 06:10:10 UTC-7', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zz');
  assertEquals('07/27/2006 06:10:10 UTC-7', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zzz');
  assertEquals('07/27/2006 06:10:10 UTC-7', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zzzz');
  assertEquals('07/27/2006 06:10:10 UTC-7', fmt.format(date, timeZone));
}


function testMMddyyyyHHmmsszCommonTimeZone() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var date = new Date(Date.UTC(2006, 6, 27, 13, 10, 10));
  var timeZone = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss z');
  assertEquals('07/27/2006 06:10:10 PDT', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zz');
  assertEquals('07/27/2006 06:10:10 PDT', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zzz');
  assertEquals('07/27/2006 06:10:10 PDT', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zzzz');
  assertEquals(
      '07/27/2006 06:10:10 Pacific Daylight Time', fmt.format(date, timeZone));
  date = new Date(Date.UTC(2006, 1, 27, 13, 10, 10));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss z');
  assertEquals('02/27/2006 05:10:10 PST', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zz');
  assertEquals('02/27/2006 05:10:10 PST', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zzz');
  assertEquals('02/27/2006 05:10:10 PST', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zzzz');
  assertEquals(
      '02/27/2006 05:10:10 Pacific Standard Time', fmt.format(date, timeZone));

  timeZone = goog.i18n.TimeZone.createTimeZone(europeBerlinData);
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss z');
  assertEquals('02/27/2006 14:10:10 MEZ', fmt.format(date, timeZone));
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss zzzz');
  assertEquals(
      '02/27/2006 14:10:10 Mitteleurop\u00e4ische Zeit',
      fmt.format(date, timeZone));
}

function testMMddyyyyHHmmssvCommonTimeZone() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var date = new Date(Date.UTC(2006, 6, 27, 13, 10, 10));
  var timeZone = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss v');
  assertEquals(
      '07/27/2006 06:10:10 America/Los_Angeles', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss vv');
  assertEquals(
      '07/27/2006 06:10:10 America/Los_Angeles', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss vvv');
  assertEquals(
      '07/27/2006 06:10:10 America/Los_Angeles', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss vvvv');
  assertEquals(
      '07/27/2006 06:10:10 America/Los_Angeles', fmt.format(date, timeZone));
}

function testMMddyyyyHHmmssvSimpleTimeZone() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var date = new Date(Date.UTC(2006, 6, 27, 13, 10, 10));
  var timeZone = goog.i18n.TimeZone.createTimeZone(420);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss v');
  assertEquals('07/27/2006 06:10:10 Etc/GMT+7', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss vv');
  assertEquals('07/27/2006 06:10:10 Etc/GMT+7', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss vvv');
  assertEquals('07/27/2006 06:10:10 Etc/GMT+7', fmt.format(date, timeZone));
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss vvvv');
  assertEquals('07/27/2006 06:10:10 Etc/GMT+7', fmt.format(date, timeZone));
}

function testMMddyyyyHHmmssVCommonTimeZone() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var date = new Date(Date.UTC(2006, 6, 27, 13, 10, 10));
  var timeZone = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss V');
  assertEquals(
      '07/27/2006 06:10:10 America/Los_Angeles', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss VV');
  assertEquals(
      '07/27/2006 06:10:10 America/Los_Angeles', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss VVV');
  assertEquals(
      '07/27/2006 06:10:10 Los Angeles Time', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss VVVV');
  assertEquals(
      '07/27/2006 06:10:10 Los Angeles Time', fmt.format(date, timeZone));
}

function testMMddyyyyHHmmssVSimpleTimeZone() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var date = new Date(Date.UTC(2006, 6, 27, 13, 10, 10));
  var timeZone = goog.i18n.TimeZone.createTimeZone(420);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss V');
  assertEquals('07/27/2006 06:10:10 Etc/GMT+7', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss VV');
  assertEquals('07/27/2006 06:10:10 Etc/GMT+7', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss VVV');
  assertEquals('07/27/2006 06:10:10 GMT-07:00', fmt.format(date, timeZone));
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss VVVV');
  assertEquals('07/27/2006 06:10:10 GMT-07:00', fmt.format(date, timeZone));
}

function test_yyyyMMddG() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var date = new Date(Date.UTC(2006, 6, 27, 20, 10, 10));
  var timeZone = goog.i18n.TimeZone.createTimeZone(420);
  var fmt = new goog.i18n.DateTimeFormat('yyyy.MM.dd G \'at\' HH:mm:ss vvvv');
  assertEquals(
      '2006.07.27 n. Chr. at 13:10:10 Etc/GMT+7', fmt.format(date, timeZone));

  timeZone = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  fmt = new goog.i18n.DateTimeFormat('yyyy.MM.dd G \'at\' HH:mm:ss vvvv');
  assertEquals(
      '2006.07.27 n. Chr. at 13:10:10 America/Los_Angeles',
      fmt.format(date, timeZone));
}

function test_daylightTimeTransition() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;

  // US PST transition to PDT on 2006/4/2/ 2:00am, jump to 2006/4/2 3:00am,
  // That's UTC time 2006/4/2 10:00am
  var timeZone = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var date = new Date(Date.UTC(2006, 4 - 1, 2, 9, 59, 0));
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss z');
  assertEquals('04/02/2006 01:59:00 PST', fmt.format(date, timeZone));
  date = new Date(Date.UTC(2006, 4 - 1, 2, 10, 1, 0));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss z');
  assertEquals('04/02/2006 03:01:00 PDT', fmt.format(date, timeZone));
  date = new Date(Date.UTC(2006, 4 - 1, 2, 10, 0, 0));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss z');
  assertEquals('04/02/2006 03:00:00 PDT', fmt.format(date, timeZone));
}

function test_timeDisplayOnDaylighTimeTransition() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;

  // US PST transition to PDT on 2006/4/2/ 2:00am, jump to 2006/4/2 3:00am,
  var date = new Date(Date.UTC(2006, 4 - 1, 2, 2, 30, 0));
  var timeZone = goog.i18n.TimeZone.createTimeZone(0);
  var fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss Z');
  assertEquals('04/02/2006 02:30:00 +0000', fmt.format(date, timeZone));

  // US PDT transition to PST on 2006/10/29/ 2:00am, jump back to PDT
  // 2006/4/2 1:00am,
  date = new Date(Date.UTC(2006, 10 - 1, 29, 1, 30, 0));
  fmt = new goog.i18n.DateTimeFormat('MM/dd/yyyy HH:mm:ss Z');
  assertEquals('10/29/2006 01:30:00 +0000', fmt.format(date, timeZone));
}

function testTimeDisplayOnDaylightTimeTransitionDayChange() {
  // NOTE: this test is a regression test only if the test browser has an OS
  // timezone of PST. While the test should still work in other timezones, it
  // does not serve as a regression test in them.
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;

  // Time is 2015/11/01 3:00:01am after US PDT -> PST. 11:00:01am UTC.
  var date = new Date(Date.UTC(2015, 11 - 1, 1, 11, 0, 1));
  // Convert to GMT-12, across DST transition.
  // The date should also change, but does not change when subtracting 4 hours
  // from PST/PDT due to the extra hour from switching DST.
  var timeZone = goog.i18n.TimeZone.createTimeZone(12 * 60);
  var fmt = new goog.i18n.DateTimeFormat('yyyy/MM/dd HH:mm:ss Z');
  // Regression test: this once returned 2015/11/01 instead.
  assertEquals('2015/10/31 23:00:01 -1200', fmt.format(date, timeZone));
}

function test_nativeDigits_fa() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fa;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fa;

  date = new Date(2006, 7 - 1, 27, 13, 10, 10, 250);
  var timeZone = goog.i18n.TimeZone.createTimeZone(420);
  var fmt = new goog.i18n.DateTimeFormat('y/MM/dd H:mm:ss٫SS');
  assertEquals('۲۰۰۶/۰۷/۲۷ ۱۳:۱۰:۱۰٫۲۵', fmt.format(date));

  // Make sure standardized timezone formats don't use native digits
  fmt = new goog.i18n.DateTimeFormat('Z');
  assertEquals('-0700', fmt.format(date, timeZone));
}

function test_nativeDigits_ar() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar;

  date = new Date(2006, 7 - 1, 27, 13, 10, 10, 250);
  var timeZone = goog.i18n.TimeZone.createTimeZone(420);
  var fmt = new goog.i18n.DateTimeFormat('y/MM/dd H:mm:ss٫SS');
  assertEquals('٢٠٠٦/٠٧/٢٧ ١٣:١٠:١٠٫٢٥', fmt.format(date));

  var fmt = new goog.i18n.DateTimeFormat(11);
  assertEquals('٢٧\u200f/٧\u200f/٢٠٠٦ ١:١٠ م', fmt.format(date));

  // Make sure standardized timezone formats don't use native digits
  fmt = new goog.i18n.DateTimeFormat('Z');
  assertEquals('-0700', fmt.format(date, timeZone));
}

function test_enforceAsciiDigits_ar() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar;

  goog.i18n.DateTimeFormat.setEnforceAsciiDigits(true);
  date = new Date(2006, 7 - 1, 27, 13, 10, 10, 250);
  var timeZone = goog.i18n.TimeZone.createTimeZone(420);
  var fmt = new goog.i18n.DateTimeFormat('y/MM/dd H:mm:ss٫SS');
  assertEquals('2006/07/27 13:10:10٫25', fmt.format(date));

  var fmt = new goog.i18n.DateTimeFormat(11);
  assertEquals('27/7/2006 1:10 م', fmt.format(date));

  // Make sure standardized timezone formats don't use native digits
  fmt = new goog.i18n.DateTimeFormat('Z');
  assertEquals('-0700', fmt.format(date, timeZone));
}

// Making sure that the date-time combination is not a simple concatenation
function test_dateTimeConcatenation() {
  var date = new Date(Date.UTC(2006, 4 - 1, 2, 2, 30, 0));
  var timeZone = goog.i18n.TimeZone.createTimeZone(americaLosAngelesData);
  var fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.FULL_DATETIME);
  // {1} 'at' {0}
  assertEquals(
      'Saturday, April 1, 2006 at 6:30:00 PM Pacific Standard Time',
      fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.LONG_DATETIME);
  assertEquals('April 1, 2006 at 6:30:00 PM PST', fmt.format(date, timeZone));
  // {1}, {0}
  fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.MEDIUM_DATETIME);
  assertEquals('Apr 1, 2006, 6:30:00 PM', fmt.format(date, timeZone));
  fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.SHORT_DATETIME);
  assertEquals('4/1/06, 6:30 PM', fmt.format(date, timeZone));
}

function testNotUsingGlobalSymbols() {
  date = new Date(2013, 10, 15);

  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fr;
  var fmtFr =
      new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.FULL_DATE);

  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  var fmtDe =
      new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.FULL_DATE);

  // The two formatters should return different results (French & German)
  assertEquals('vendredi 15 novembre 2013', fmtFr.format(date));
  assertEquals('Freitag, 15. November 2013', fmtDe.format(date));
}

function testConstructorSymbols() {
  date = new Date(2013, 10, 15);

  var fmtFr = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.FULL_DATE, goog.i18n.DateTimeSymbols_fr);

  var fmtDe = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.FULL_DATE, goog.i18n.DateTimeSymbols_de);

  // The two formatters should return different results (French & German)
  assertEquals('vendredi 15 novembre 2013', fmtFr.format(date));
  assertEquals('Freitag, 15. November 2013', fmtDe.format(date));
}

function testQuotedPattern() {
  // Regression test for b/29990921.
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en;
  date = new Date(2013, 10, 15);

  // Literal apostrophe
  var fmt = new goog.i18n.DateTimeFormat('MMM \'\'yy');
  assertEquals('Nov \'13', fmt.format(date));
  // Quoted text
  fmt = new goog.i18n.DateTimeFormat('MMM dd\'th\' yyyy');
  assertEquals('Nov 15th 2013', fmt.format(date));
  // Quoted text (only opening apostrophe)
  fmt = new goog.i18n.DateTimeFormat('MMM dd\'th yyyy');
  assertEquals('Nov 15th yyyy', fmt.format(date));
  // Quoted text with literal apostrophe
  fmt = new goog.i18n.DateTimeFormat('MMM dd\'th\'\'\'');
  assertEquals('Nov 15th\'', fmt.format(date));
  // Quoted text with literal apostrophe (only opening apostrophe)
  fmt = new goog.i18n.DateTimeFormat('MMM dd\'th\'\'');
  assertEquals('Nov 15th\'', fmt.format(date));
}

function testSupportForWeekInYear() {
  var date = new Date(2013, 1, 25);

  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fr;
  var fmt = new goog.i18n.DateTimeFormat('\'week\' w');
  assertEquals('week 9', fmt.format(date));
  var fmt = new goog.i18n.DateTimeFormat('\'week\' ww');
  assertEquals('week 09', fmt.format(date));

  // Make sure it uses native digits when needed
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fa;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fa;
  var fmt = new goog.i18n.DateTimeFormat('\'week\' w');
  assertEquals('week ۹', fmt.format(date));
  var fmt = new goog.i18n.DateTimeFormat('\'week\' ww');
  assertEquals('week ۰۹', fmt.format(date));
}

function testSupportForYearAndEra() {
  var date = new Date(2013, 1, 25);
  var fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimePatterns.YEAR_FULL_WITH_ERA);

  assertEquals('2013 AD', fmt.format(date));

  date.setFullYear(213);
  assertEquals('213 AD', fmt.format(date));

  date.setFullYear(11);
  assertEquals('11 AD', fmt.format(date));

  date.setFullYear(-213);
  assertEquals('213 BC', fmt.format(date));

  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
  fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimePatterns.YEAR_FULL_WITH_ERA);

  date.setFullYear(2013);
  assertEquals('2013 n. Chr.', fmt.format(date));

  date.setFullYear(213);
  assertEquals('213 n. Chr.', fmt.format(date));

  date.setFullYear(11);
  assertEquals('11 n. Chr.', fmt.format(date));

  date.setFullYear(-213);
  assertEquals('213 v. Chr.', fmt.format(date));

  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ja;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ja;
  fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimePatterns.YEAR_FULL_WITH_ERA);

  date.setFullYear(2013);
  assertEquals('西暦2013年', fmt.format(date));

  date.setFullYear(213);
  assertEquals('西暦213年', fmt.format(date));

  date.setFullYear(11);
  assertEquals('西暦11年', fmt.format(date));

  date.setFullYear(-213);
  assertEquals('紀元前213年', fmt.format(date));
}

// Creates a string by concatenating the week number for 7 successive days
function weekInYearFor7Days() {
  var date = new Date(2013, 0, 1);  // January
  var fmt = new goog.i18n.DateTimeFormat('w');
  var result = '';
  for (var i = 1; i <= 7; ++i) {
    date.setDate(i);
    result += fmt.format(date);
  }
  return result;
}

// Expected results from ICU4J v51. One entry will change in v52.
// These cover all combinations of FIRSTDAYOFWEEK / FIRSTWEEKCUTOFFDAY in use.
function testWeekInYearI18n() {
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_bn_BD;
  assertEquals('bn_BD', '১১১২২২২', weekInYearFor7Days());
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_IE;
  assertEquals('en_IE', '1111122', weekInYearFor7Days());
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fr_DJ;
  assertEquals('fr_DJ', '1111222', weekInYearFor7Days());
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_he_IL;
  assertEquals('he_IL', '1111122', weekInYearFor7Days());
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar_SA;
  assertEquals('ar_SA', '١١١١١٢٢', weekInYearFor7Days());
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar_AE;
  assertEquals('ar_AE', '١١١١٢٢٢', weekInYearFor7Days());
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_IN;
  assertEquals('en_IN', '1111122', weekInYearFor7Days());
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_GB;
  assertEquals('en_GB', '1111112', weekInYearFor7Days());
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_US;
  assertEquals('en_US', '1111122', weekInYearFor7Days());
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ro_RO;
  assertEquals('ro_RO', '1111112', weekInYearFor7Days());
}

// Regression for b/11567443 (no method 'getHours' when formatting a
// goog.date.Date)
function test_variousDateTypes() {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr;
  goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fr;

  var fmt = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeFormat.Format.MEDIUM_DATETIME);

  var date = new Date(2006, 6, 27, 13, 10, 42, 250);
  assertEquals('27 juil. 2006 à 13:10:42', fmt.format(date));

  var gdatetime = new goog.date.DateTime(2006, 6, 27, 13, 10, 42, 250);
  assertEquals('27 juil. 2006 à 13:10:42', fmt.format(gdatetime));

  var gdate = new goog.date.Date(2006, 6, 27);
  var fmtDate =
      new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.MEDIUM_DATE);
  assertEquals('27 juil. 2006', fmtDate.format(gdatetime));
  try {
    fmt.format(gdate);
    fail('Should have thrown exception.');
  } catch (e) {
  }
}

function testExceptionWhenFormattingNull() {
  var fmt = new goog.i18n.DateTimeFormat('M/d/y');
  try {
    fmt.format(null);
    fail('Should have thrown exception.');
  } catch (e) {
  }
}
