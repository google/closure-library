// Copyright 2018 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Relative date time formatting symbols.
 *
 * File generated from CLDR ver. 34
 *
 * To reduce the file size (which may cause issues in some JS
 * developing environments), this file will only contain locales
 * that are frequently used by web applications. This is defined as
 * proto/closure_locales_data.txt and will change (most likely addition)
 * over time.  Rest of the data can be found in another file named
 * "relativedatetimesymbolsext.js", which will be generated at
 * the same time together with this file.
 */

// clang-format off

goog.module('goog.i18n.relativeDateTimeSymbols');

/**
 * Collection of relative date time unit symbols for a locale.
 * @typedef {{
 *   YEAR:    RelativeDateTimeFormatStyles!,
 *   QUARTER: RelativeDateTimeFormatStyles!,
 *   MONTH:   RelativeDateTimeFormatStyles!,
 *   WEEK:    RelativeDateTimeFormatStyles!,
 *   DAY:     RelativeDateTimeFormatStyles!,
 *   HOUR:    RelativeDateTimeFormatStyles!,
 *   MINUTE:  RelativeDateTimeFormatStyles!,
 *   SECOND:  RelativeDateTimeFormatStyles!,
 * }}
 */
var RelativeDateTimeSymbols; /* The data for the locale */

/** @typedef {!RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols;

/**
 * Collection of date interval symbols for each relative unit.
 * @typedef {{
 *   LONG:   StyleElement!,
 *   SHORT:  StyleElement!,
 *   NARROW: StyleElement!,
 * }}
 */
var RelativeDateTimeFormatStyles;

/** @typedef {!RelativeDateTimeFormatStyles} */
exports.RelativeDateTimeFormatStyles;

/**
 * Collection of relative symbols for a given style.
 * @typedef {{
 *   RELATIVE: !RelativeDateTimeDirectionMap,
 *   FUTURE:   string,
 *   PAST:     string,
 * }}
 */
var StyleElement;

/** @typedef {!StyleElement} */
exports.StyleElement;

/**
 * Map of direction options for RELATIVE data with integer keys.
 * @typedef {!Object<string, string>}
 */
var RelativeDateTimeDirectionMap;

/** @typedef {!RelativeDateTimeDirectionMap} */
exports.RelativeDateTimeDirectionMap;

/** @type {!RelativeDateTimeSymbols} */
var defaultSymbols;

/**
 * Returns the default RelativeDateTimeSymbols.
 * @return {!RelativeDateTimeSymbols}
 */
exports.getRelativeDateTimeSymbols = function() {
  return defaultSymbols;
};

/**
 * Sets the default RelativeDateTimeSymbols.
 * @param {!RelativeDateTimeSymbols} symbols
 */
exports.setRelativeDateTimeSymbols = function(symbols) {
  defaultSymbols = symbols;
};


/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_af =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'gister','-2':'eergister','0':'vandag','1':'môre','2':'oormôre'},
      PAST:'{N,plural,one{{N} dag gelede}other{{N} dae gelede}}',
      FUTURE:'{N,plural,one{oor {N} dag}other{oor {N} dae}}',
    },
    SHORT:{
      RELATIVE:{'-1':'gister','-2':'eergister','0':'vandag','1':'môre','2':'oormôre'},
      PAST:'{N,plural,one{{N} dag gelede}other{{N} dae gelede}}',
      FUTURE:'{N,plural,one{oor {N} dag}other{oor {N} dae}}',
    },
    NARROW:{
      RELATIVE:{'-1':'gister','-2':'eergister','0':'vandag','1':'môre','2':'oormôre'},
      PAST:'{N,plural,one{{N} dag gelede}other{{N} dae gelede}}',
      FUTURE:'{N,plural,one{oor {N} dag}other{oor {N} dae}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'hierdie uur'},
      PAST:'{N,plural,one{{N} uur gelede}other{{N} uur gelede}}',
      FUTURE:'{N,plural,one{oor {N} uur}other{oor {N} uur}}',
    },
    SHORT:{
      RELATIVE:{'0':'hierdie uur'},
      PAST:'{N,plural,one{{N} u. gelede}other{{N} u. gelede}}',
      FUTURE:'{N,plural,one{oor {N} u.}other{oor {N} u.}}',
    },
    NARROW:{
      RELATIVE:{'0':'hierdie uur'},
      PAST:'{N,plural,one{{N} u. gelede}other{{N} u. gelede}}',
      FUTURE:'{N,plural,one{oor {N} u.}other{oor {N} u.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'hierdie minuut'},
      PAST:'{N,plural,one{{N} minuut gelede}other{{N} minute gelede}}',
      FUTURE:'{N,plural,one{oor {N} minuut}other{oor {N} minute}}',
    },
    SHORT:{
      RELATIVE:{'0':'hierdie minuut'},
      PAST:'{N,plural,one{{N} min. gelede}other{{N} min. gelede}}',
      FUTURE:'{N,plural,one{oor {N} min.}other{oor {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'hierdie minuut'},
      PAST:'{N,plural,one{{N} min. gelede}other{{N} min. gelede}}',
      FUTURE:'{N,plural,one{oor {N} min.}other{oor {N} min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'verlede maand','0':'vandeesmaand','1':'volgende maand'},
      PAST:'{N,plural,one{{N} maand gelede}other{{N} maande gelede}}',
      FUTURE:'{N,plural,one{oor {N} maand}other{oor {N} maande}}',
    },
    SHORT:{
      RELATIVE:{'-1':'verlede maand','0':'vandeesmaand','1':'volgende maand'},
      PAST:'{N,plural,one{{N} md. gelede}other{{N} md. gelede}}',
      FUTURE:'{N,plural,one{oor {N} md.}other{oor {N} md.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'verlede maand','0':'vandeesmaand','1':'volgende maand'},
      PAST:'{N,plural,one{{N} md. gelede}other{{N} md. gelede}}',
      FUTURE:'{N,plural,one{oor {N} md.}other{oor {N} md.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'verlede kwartaal','0':'hierdie kwartaal','1':'volgende kwartaal'},
      PAST:'{N,plural,one{{N} kwartaal gelede}other{{N} kwartale gelede}}',
      FUTURE:'{N,plural,one{oor {N} kwartaal}other{oor {N} kwartale}}',
    },
    SHORT:{
      RELATIVE:{'-1':'verlede kwartaal','0':'hierdie kwartaal','1':'volgende kwartaal'},
      PAST:'{N,plural,one{{N} kw. gelede}other{{N} kw. gelede}}',
      FUTURE:'{N,plural,one{oor {N} kw.}other{oor {N} kw.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'verlede kwartaal','0':'hierdie kwartaal','1':'volgende kwartaal'},
      PAST:'{N,plural,one{{N} kw. gelede}other{{N} kw. gelede}}',
      FUTURE:'{N,plural,one{oor {N} kw.}other{oor {N} kw.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nou'},
      PAST:'{N,plural,one{{N} sekonde gelede}other{{N} sekondes gelede}}',
      FUTURE:'{N,plural,one{oor {N} sekonde}other{oor {N} sekondes}}',
    },
    SHORT:{
      RELATIVE:{'0':'nou'},
      PAST:'{N,plural,one{{N} s. gelede}other{{N} s. gelede}}',
      FUTURE:'{N,plural,one{oor {N} s.}other{oor {N} s.}}',
    },
    NARROW:{
      RELATIVE:{'0':'nou'},
      PAST:'{N,plural,one{{N} s. gelede}other{{N} s. gelede}}',
      FUTURE:'{N,plural,one{oor {N} s.}other{oor {N} s.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'verlede week','0':'hierdie week','1':'volgende week'},
      PAST:'{N,plural,one{{N} week gelede}other{{N} weke gelede}}',
      FUTURE:'{N,plural,one{oor {N} week}other{oor {N} weke}}',
    },
    SHORT:{
      RELATIVE:{'-1':'verlede week','0':'hierdie week','1':'volgende week'},
      PAST:'{N,plural,one{{N} w. gelede}other{{N} w. gelede}}',
      FUTURE:'{N,plural,one{oor {N} w.}other{oor {N} w.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'verlede week','0':'hierdie week','1':'volgende week'},
      PAST:'{N,plural,one{{N} w. gelede}other{{N} w. gelede}}',
      FUTURE:'{N,plural,one{oor {N} w.}other{oor {N} w.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'verlede jaar','0':'hierdie jaar','1':'volgende jaar'},
      PAST:'{N,plural,one{{N} jaar gelede}other{{N} jaar gelede}}',
      FUTURE:'{N,plural,one{oor {N} jaar}other{oor {N} jaar}}',
    },
    SHORT:{
      RELATIVE:{'-1':'verlede jaar','0':'hierdie jaar','1':'volgende jaar'},
      PAST:'{N,plural,one{{N} j. gelede}other{{N} j. gelede}}',
      FUTURE:'{N,plural,one{oor {N} j.}other{oor {N} j.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'verlede jaar','0':'hierdie jaar','1':'volgende jaar'},
      PAST:'{N,plural,one{{N} j. gelede}other{{N} j. gelede}}',
      FUTURE:'{N,plural,one{oor {N} j.}other{oor {N} j.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_am =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ትናንት','-2':'ከትናንት ወዲያ','0':'ዛሬ','1':'ነገ','2':'ከነገ ወዲያ'},
      PAST:'{N,plural,one{ከ{N} ቀን በፊት}other{ከ{N} ቀናት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ቀን ውስጥ}other{በ{N} ቀናት ውስጥ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ትላንትና','-2':'ከትናንት ወዲያ','0':'ዛሬ','1':'ነገ','2':'ከነገ ወዲያ'},
      PAST:'{N,plural,one{ከ {N} ቀን በፊት}other{ከ{N} ቀኖች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ቀን ውስጥ}other{በ{N} ቀኖች ውስጥ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ትላንትና','-2':'ከትናንት ወዲያ','0':'ዛሬ','1':'ነገ','2':'ከነገ ወዲያ'},
      PAST:'{N,plural,one{ከ {N} ቀን በፊት}other{ከ{N} ቀኖች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ቀን ውስጥ}other{በ{N} ቀኖች ውስጥ}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ይህ ሰዓት'},
      PAST:'{N,plural,one{ከ{N} ሰዓት በፊት}other{ከ{N} ሰዓቶች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ሰዓት ውስጥ}other{በ{N} ሰዓቶች ውስጥ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ይህ ሰዓት'},
      PAST:'{N,plural,one{ከ{N} ሰዓት በፊት}other{ከ{N} ሰዓቶች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ሰዓት ውስጥ}other{በ{N} ሰዓቶች ውስጥ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ይህ ሰዓት'},
      PAST:'{N,plural,one{ከ{N} ሰዓት በፊት}other{ከ{N} ሰዓቶች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ሰዓት ውስጥ}other{በ{N} ሰዓቶች ውስጥ}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ይህ ደቂቃ'},
      PAST:'{N,plural,one{ከ{N} ደቂቃ በፊት}other{ከ{N} ደቂቃዎች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ደቂቃ ውስጥ}other{በ{N} ደቂቃዎች ውስጥ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ይህ ደቂቃ'},
      PAST:'{N,plural,one{ከ{N} ደቂቃ በፊት}other{ከ{N} ደቂቃዎች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ደቂቃ ውስጥ}other{በ{N} ደቂቃዎች ውስጥ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ይህ ደቂቃ'},
      PAST:'{N,plural,one{ከ{N} ደቂቃ በፊት}other{ከ{N} ደቂቃዎች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ደቂቃ ውስጥ}other{በ{N} ደቂቃዎች ውስጥ}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ያለፈው ወር','0':'በዚህ ወር','1':'የሚቀጥለው ወር'},
      PAST:'{N,plural,one{ከ{N} ወር በፊት}other{ከ{N} ወራት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ወር ውስጥ}other{በ{N} ወራት ውስጥ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ያለፈው ወር','0':'በዚህ ወር','1':'የሚቀጥለው ወር'},
      PAST:'{N,plural,one{ከ{N} ወራት በፊት}other{ከ{N} ወራት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ወራት ውስጥ}other{በ{N} ወራት ውስጥ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ያለፈው ወር','0':'በዚህ ወር','1':'የሚቀጥለው ወር'},
      PAST:'{N,plural,one{ከ{N} ወራት በፊት}other{ከ{N} ወራት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ወራት ውስጥ}other{በ{N} ወራት ውስጥ}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'የመጨረሻው ሩብ','0':'ይህ ሩብ','1':'የሚቀጥለው ሩብ'},
      PAST:'{N,plural,one{{N} ሩብ በፊት}other{{N} ሩብ በፊት}}',
      FUTURE:'{N,plural,one{+{N} ሩብ}other{+{N} ሩብ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'የመጨረሻው ሩብ','0':'ይህ ሩብ','1':'የሚቀጥለው ሩብ'},
      PAST:'{N,plural,one{{N} ሩብ በፊት}other{{N} ሩብ በፊት}}',
      FUTURE:'{N,plural,one{+{N} ሩብ}other{+{N} ሩብ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'የመጨረሻው ሩብ','0':'ይህ ሩብ','1':'የሚቀጥለው ሩብ'},
      PAST:'{N,plural,one{{N} ሩብ በፊት}other{{N} ሩብ በፊት}}',
      FUTURE:'{N,plural,one{+{N} ሩብ}other{+{N} ሩብ}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'አሁን'},
      PAST:'{N,plural,one{ከ{N} ሰከንድ በፊት}other{ከ{N} ሰከንዶች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ሰከንድ ውስጥ}other{በ{N} ሰከንዶች ውስጥ}}',
    },
    SHORT:{
      RELATIVE:{'0':'አሁን'},
      PAST:'{N,plural,one{ከ{N} ሰከንድ በፊት}other{ከ{N} ሰከንዶች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ሰከንድ ውስጥ}other{በ{N} ሰከንዶች ውስጥ}}',
    },
    NARROW:{
      RELATIVE:{'0':'አሁን'},
      PAST:'{N,plural,one{ከ{N} ሰከንድ በፊት}other{ከ{N} ሰከንዶች በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ሰከንድ ውስጥ}other{በ{N} ሰከንዶች ውስጥ}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'ያለፈው ሳምንት','0':'በዚህ ሳምንት','1':'የሚቀጥለው ሳምንት'},
      PAST:'{N,plural,one{ከ{N} ሳምንት በፊት}other{ከ{N} ሳምንታት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ሳምንት ውስጥ}other{በ{N} ሳምንታት ውስጥ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ባለፈው ሳምንት','0':'በዚህ ሣምንት','1':'የሚቀጥለው ሳምንት'},
      PAST:'{N,plural,one{ከ{N} ሳምንታት በፊት}other{ከ{N} ሳምንታት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ሳምንታት ውስጥ}other{በ{N} ሳምንታት ውስጥ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ባለፈው ሳምንት','0':'በዚህ ሣምንት','1':'የሚቀጥለው ሳምንት'},
      PAST:'{N,plural,one{ከ{N} ሳምንታት በፊት}other{ከ{N} ሳምንታት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ሳምንታት ውስጥ}other{በ{N} ሳምንታት ውስጥ}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ያለፈው ዓመት','0':'በዚህ ዓመት','1':'የሚቀጥለው ዓመት'},
      PAST:'{N,plural,one{ከ{N} ዓመት በፊት}other{ከ{N} ዓመታት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ዓመታት ውስጥ}other{በ{N} ዓመታት ውስጥ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ያለፈው ዓመት','0':'በዚህ ዓመት','1':'የሚቀጥለው ዓመት'},
      PAST:'{N,plural,one{ከ{N} ዓመታት በፊት}other{ከ{N} ዓመታት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ዓመታት ውስጥ}other{በ{N} ዓመታት ውስጥ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ያለፈው ዓመት','0':'በዚህ ዓመት','1':'የሚቀጥለው ዓመት'},
      PAST:'{N,plural,one{ከ{N} ዓመታት በፊት}other{ከ{N} ዓመታት በፊት}}',
      FUTURE:'{N,plural,one{በ{N} ዓመታት ውስጥ}other{በ{N} ዓመታት ውስጥ}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ar =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'أمس','-2':'أول أمس','0':'اليوم','1':'غدًا','2':'بعد الغد'},
      PAST:'{N,plural,few{قبل {N} أيام}many{قبل {N} يومًا}one{قبل يوم واحد}other{قبل {N} يوم}two{قبل يومين}zero{قبل {N} يوم}}',
      FUTURE:'{N,plural,few{خلال {N} أيام}many{خلال {N} يومًا}one{خلال يوم واحد}other{خلال {N} يوم}two{خلال يومين}zero{خلال {N} يوم}}',
    },
    SHORT:{
      RELATIVE:{'-1':'أمس','-2':'أول أمس','0':'اليوم','1':'غدًا','2':'بعد الغد'},
      PAST:'{N,plural,few{قبل {N} أيام}many{قبل {N} يومًا}one{قبل يوم واحد}other{قبل {N} يوم}two{قبل يومين}zero{قبل {N} يوم}}',
      FUTURE:'{N,plural,few{خلال {N} أيام}many{خلال {N} يومًا}one{خلال يوم واحد}other{خلال {N} يوم}two{خلال يومين}zero{خلال {N} يوم}}',
    },
    NARROW:{
      RELATIVE:{'-1':'أمس','-2':'أول أمس','0':'اليوم','1':'غدًا','2':'بعد الغد'},
      PAST:'{N,plural,few{قبل {N} أيام}many{قبل {N} يومًا}one{قبل يوم واحد}other{قبل {N} يوم}two{قبل يومين}zero{قبل {N} يوم}}',
      FUTURE:'{N,plural,few{خلال {N} أيام}many{خلال {N} يومًا}one{خلال يوم واحد}other{خلال {N} يوم}two{خلال يومين}zero{خلال {N} يوم}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'الساعة الحالية'},
      PAST:'{N,plural,few{قبل {N} ساعات}many{قبل {N} ساعة}one{قبل ساعة واحدة}other{قبل {N} ساعة}two{قبل ساعتين}zero{قبل {N} ساعة}}',
      FUTURE:'{N,plural,few{خلال {N} ساعات}many{خلال {N} ساعة}one{خلال ساعة واحدة}other{خلال {N} ساعة}two{خلال ساعتين}zero{خلال {N} ساعة}}',
    },
    SHORT:{
      RELATIVE:{'0':'الساعة الحالية'},
      PAST:'{N,plural,few{قبل {N} ساعات}many{قبل {N} ساعة}one{قبل ساعة واحدة}other{قبل {N} ساعة}two{قبل ساعتين}zero{قبل {N} ساعة}}',
      FUTURE:'{N,plural,few{خلال {N} ساعات}many{خلال {N} ساعة}one{خلال ساعة واحدة}other{خلال {N} ساعة}two{خلال ساعتين}zero{خلال {N} ساعة}}',
    },
    NARROW:{
      RELATIVE:{'0':'الساعة الحالية'},
      PAST:'{N,plural,few{قبل {N} ساعات}many{قبل {N} ساعة}one{قبل ساعة واحدة}other{قبل {N} ساعة}two{قبل ساعتين}zero{قبل {N} ساعة}}',
      FUTURE:'{N,plural,few{خلال {N} ساعات}many{خلال {N} ساعة}one{خلال ساعة واحدة}other{خلال {N} ساعة}two{خلال ساعتين}zero{خلال {N} ساعة}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'هذه الدقيقة'},
      PAST:'{N,plural,few{قبل {N} دقائق}many{قبل {N} دقيقة}one{قبل دقيقة واحدة}other{قبل {N} دقيقة}two{قبل دقيقتين}zero{قبل {N} دقيقة}}',
      FUTURE:'{N,plural,few{خلال {N} دقائق}many{خلال {N} دقيقة}one{خلال دقيقة واحدة}other{خلال {N} دقيقة}two{خلال دقيقتين}zero{خلال {N} دقيقة}}',
    },
    SHORT:{
      RELATIVE:{'0':'هذه الدقيقة'},
      PAST:'{N,plural,few{قبل {N} دقائق}many{قبل {N} دقيقة}one{قبل دقيقة واحدة}other{قبل {N} دقيقة}two{قبل دقيقتين}zero{قبل {N} دقيقة}}',
      FUTURE:'{N,plural,few{خلال {N} دقائق}many{خلال {N} دقيقة}one{خلال دقيقة واحدة}other{خلال {N} دقيقة}two{خلال دقيقتين}zero{خلال {N} دقيقة}}',
    },
    NARROW:{
      RELATIVE:{'0':'هذه الدقيقة'},
      PAST:'{N,plural,few{قبل {N} دقائق}many{قبل {N} دقيقة}one{قبل دقيقة واحدة}other{قبل {N} دقيقة}two{قبل دقيقتين}zero{قبل {N} دقيقة}}',
      FUTURE:'{N,plural,few{خلال {N} دقائق}many{خلال {N} دقيقة}one{خلال دقيقة واحدة}other{خلال {N} دقيقة}two{خلال دقيقتين}zero{خلال {N} دقيقة}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'الشهر الماضي','0':'هذا الشهر','1':'الشهر القادم'},
      PAST:'{N,plural,few{قبل {N} أشهر}many{قبل {N} شهرًا}one{قبل شهر واحد}other{قبل {N} شهر}two{قبل شهرين}zero{قبل {N} شهر}}',
      FUTURE:'{N,plural,few{خلال {N} أشهر}many{خلال {N} شهرًا}one{خلال شهر واحد}other{خلال {N} شهر}two{خلال شهرين}zero{خلال {N} شهر}}',
    },
    SHORT:{
      RELATIVE:{'-1':'الشهر الماضي','0':'هذا الشهر','1':'الشهر القادم'},
      PAST:'{N,plural,few{خلال {N} أشهر}many{قبل {N} شهرًا}one{قبل شهر واحد}other{قبل {N} شهر}two{قبل شهرين}zero{قبل {N} شهر}}',
      FUTURE:'{N,plural,few{خلال {N} أشهر}many{خلال {N} شهرًا}one{خلال شهر واحد}other{خلال {N} شهر}two{خلال شهرين}zero{خلال {N} شهر}}',
    },
    NARROW:{
      RELATIVE:{'-1':'الشهر الماضي','0':'هذا الشهر','1':'الشهر القادم'},
      PAST:'{N,plural,few{قبل {N} أشهر}many{قبل {N} شهرًا}one{قبل شهر واحد}other{قبل {N} شهر}two{قبل شهرين}zero{قبل {N} شهر}}',
      FUTURE:'{N,plural,few{خلال {N} أشهر}many{خلال {N} شهرًا}one{خلال شهر واحد}other{خلال {N} شهر}two{خلال شهرين}zero{خلال {N} شهر}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'الربع الأخير','0':'هذا الربع','1':'الربع القادم'},
      PAST:'{N,plural,few{قبل {N} أرباع سنة}many{قبل {N} ربع سنة}one{قبل ربع سنة واحد}other{قبل {N} ربع سنة}two{قبل ربعي سنة}zero{قبل {N} ربع سنة}}',
      FUTURE:'{N,plural,few{خلال {N} أرباع سنة}many{خلال {N} ربع سنة}one{خلال ربع سنة واحد}other{خلال {N} ربع سنة}two{خلال ربعي سنة}zero{خلال {N} ربع سنة}}',
    },
    SHORT:{
      RELATIVE:{'-1':'الربع الأخير','0':'هذا الربع','1':'الربع القادم'},
      PAST:'{N,plural,few{قبل {N} أرباع سنة}many{قبل {N} ربع سنة}one{قبل ربع سنة واحد}other{قبل {N} ربع سنة}two{قبل ربعي سنة}zero{قبل {N} ربع سنة}}',
      FUTURE:'{N,plural,few{خلال {N} أرباع سنة}many{خلال {N} ربع سنة}one{خلال ربع سنة واحد}other{خلال {N} ربع سنة}two{خلال ربعي سنة}zero{خلال {N} ربع سنة}}',
    },
    NARROW:{
      RELATIVE:{'-1':'الربع الأخير','0':'هذا الربع','1':'الربع القادم'},
      PAST:'{N,plural,few{قبل {N} أرباع سنة}many{قبل {N} ربع سنة}one{قبل ربع سنة واحد}other{قبل {N} ربع سنة}two{قبل ربعي سنة}zero{قبل {N} ربع سنة}}',
      FUTURE:'{N,plural,few{خلال {N} أرباع سنة}many{خلال {N} ربع سنة}one{خلال ربع سنة واحد}other{خلال {N} ربع سنة}two{خلال ربعي سنة}zero{خلال {N} ربع سنة}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'الآن'},
      PAST:'{N,plural,few{قبل {N} ثوانِ}many{قبل {N} ثانية}one{قبل ثانية واحدة}other{قبل {N} ثانية}two{قبل ثانيتين}zero{قبل {N} ثانية}}',
      FUTURE:'{N,plural,few{خلال {N} ثوانٍ}many{خلال {N} ثانية}one{خلال ثانية واحدة}other{خلال {N} ثانية}two{خلال ثانيتين}zero{خلال {N} ثانية}}',
    },
    SHORT:{
      RELATIVE:{'0':'الآن'},
      PAST:'{N,plural,few{قبل {N} ثوانٍ}many{قبل {N} ثانية}one{قبل ثانية واحدة}other{قبل {N} ثانية}two{قبل ثانيتين}zero{قبل {N} ثانية}}',
      FUTURE:'{N,plural,few{خلال {N} ثوانٍ}many{خلال {N} ثانية}one{خلال ثانية واحدة}other{خلال {N} ثانية}two{خلال ثانيتين}zero{خلال {N} ثانية}}',
    },
    NARROW:{
      RELATIVE:{'0':'الآن'},
      PAST:'{N,plural,few{قبل {N} ثوانٍ}many{قبل {N} ثانية}one{قبل ثانية واحدة}other{قبل {N} ثانية}two{قبل ثانيتين}zero{قبل {N} ثانية}}',
      FUTURE:'{N,plural,few{خلال {N} ثوانٍ}many{خلال {N} ثانية}one{خلال ثانية واحدة}other{خلال {N} ثانية}two{خلال ثانيتين}zero{خلال {N} ثانية}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'الأسبوع الماضي','0':'هذا الأسبوع','1':'الأسبوع القادم'},
      PAST:'{N,plural,few{قبل {N} أسابيع}many{قبل {N} أسبوعًا}one{قبل أسبوع واحد}other{قبل {N} أسبوع}two{قبل أسبوعين}zero{قبل {N} أسبوع}}',
      FUTURE:'{N,plural,few{خلال {N} أسابيع}many{خلال {N} أسبوعًا}one{خلال أسبوع واحد}other{خلال {N} أسبوع}two{خلال أسبوعين}zero{خلال {N} أسبوع}}',
    },
    SHORT:{
      RELATIVE:{'-1':'الأسبوع الماضي','0':'هذا الأسبوع','1':'الأسبوع القادم'},
      PAST:'{N,plural,few{قبل {N} أسابيع}many{قبل {N} أسبوعًا}one{قبل أسبوع واحد}other{قبل {N} أسبوع}two{قبل أسبوعين}zero{قبل {N} أسبوع}}',
      FUTURE:'{N,plural,few{خلال {N} أسابيع}many{خلال {N} أسبوعًا}one{خلال أسبوع واحد}other{خلال {N} أسبوع}two{خلال {N} أسبوعين}zero{خلال {N} أسبوع}}',
    },
    NARROW:{
      RELATIVE:{'-1':'الأسبوع الماضي','0':'هذا الأسبوع','1':'الأسبوع القادم'},
      PAST:'{N,plural,few{قبل {N} أسابيع}many{قبل {N} أسبوعًا}one{قبل أسبوع واحد}other{قبل {N} أسبوع}two{قبل أسبوعين}zero{قبل {N} أسبوع}}',
      FUTURE:'{N,plural,few{خلال {N} أسابيع}many{خلال {N} أسبوعًا}one{خلال أسبوع واحد}other{خلال {N} أسبوع}two{خلال أسبوعين}zero{خلال {N} أسبوع}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'السنة الماضية','0':'السنة الحالية','1':'السنة القادمة'},
      PAST:'{N,plural,few{قبل {N} سنوات}many{قبل {N} سنة}one{قبل سنة واحدة}other{قبل {N} سنة}two{قبل سنتين}zero{قبل {N} سنة}}',
      FUTURE:'{N,plural,few{خلال {N} سنوات}many{خلال {N} سنة}one{خلال سنة واحدة}other{خلال {N} سنة}two{خلال سنتين}zero{خلال {N} سنة}}',
    },
    SHORT:{
      RELATIVE:{'-1':'السنة الماضية','0':'السنة الحالية','1':'السنة القادمة'},
      PAST:'{N,plural,few{قبل {N} سنوات}many{قبل {N} سنة}one{قبل سنة واحدة}other{قبل {N} سنة}two{قبل سنتين}zero{قبل {N} سنة}}',
      FUTURE:'{N,plural,few{خلال {N} سنوات}many{خلال {N} سنة}one{خلال سنة واحدة}other{خلال {N} سنة}two{خلال سنتين}zero{خلال {N} سنة}}',
    },
    NARROW:{
      RELATIVE:{'-1':'السنة الماضية','0':'السنة الحالية','1':'السنة القادمة'},
      PAST:'{N,plural,few{قبل {N} سنوات}many{قبل {N} سنة}one{قبل سنة واحدة}other{قبل {N} سنة}two{قبل سنتين}zero{قبل {N} سنة}}',
      FUTURE:'{N,plural,few{خلال {N} سنوات}many{خلال {N} سنة}one{خلال سنة واحدة}other{خلال {N} سنة}two{خلال سنتين}zero{خلال {N} سنة}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ar_DZ = exports.RelativeDateTimeSymbols_ar;

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ar_EG = exports.RelativeDateTimeSymbols_ar;

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_az =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'dünən','0':'bu gün','1':'sabah'},
      PAST:'{N,plural,one{{N} gün öncə}other{{N} gün öncə}}',
      FUTURE:'{N,plural,one{{N} gün ərzində}other{{N} gün ərzində}}',
    },
    SHORT:{
      RELATIVE:{'-1':'dünən','0':'bu gün','1':'sabah'},
      PAST:'{N,plural,one{{N} gün öncə}other{{N} gün öncə}}',
      FUTURE:'{N,plural,one{{N} gün ərzində}other{{N} gün ərzində}}',
    },
    NARROW:{
      RELATIVE:{'-1':'dünən','0':'bu gün','1':'sabah'},
      PAST:'{N,plural,one{{N} gün öncə}other{{N} gün öncə}}',
      FUTURE:'{N,plural,one{{N} gün ərzində}other{{N} gün ərzində}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'bu saat'},
      PAST:'{N,plural,one{{N} saat öncə}other{{N} saat öncə}}',
      FUTURE:'{N,plural,one{{N} saat ərzində}other{{N} saat ərzində}}',
    },
    SHORT:{
      RELATIVE:{'0':'bu saat'},
      PAST:'{N,plural,one{{N} saat öncə}other{{N} saat öncə}}',
      FUTURE:'{N,plural,one{{N} saat ərzində}other{{N} saat ərzində}}',
    },
    NARROW:{
      RELATIVE:{'0':'bu saat'},
      PAST:'{N,plural,one{{N} saat öncə}other{{N} saat öncə}}',
      FUTURE:'{N,plural,one{{N} saat ərzində}other{{N} saat ərzində}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'bu dəqiqə'},
      PAST:'{N,plural,one{{N} dəqiqə öncə}other{{N} dəqiqə öncə}}',
      FUTURE:'{N,plural,one{{N} dəqiqə ərzində}other{{N} dəqiqə ərzində}}',
    },
    SHORT:{
      RELATIVE:{'0':'bu dəqiqə'},
      PAST:'{N,plural,one{{N} dəqiqə öncə}other{{N} dəqiqə öncə}}',
      FUTURE:'{N,plural,one{{N} dəqiqə ərzində}other{{N} dəqiqə ərzində}}',
    },
    NARROW:{
      RELATIVE:{'0':'bu dəqiqə'},
      PAST:'{N,plural,one{{N} dəqiqə öncə}other{{N} dəqiqə öncə}}',
      FUTURE:'{N,plural,one{{N} dəqiqə ərzində}other{{N} dəqiqə ərzində}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'keçən ay','0':'bu ay','1':'gələn ay'},
      PAST:'{N,plural,one{{N} ay öncə}other{{N} ay öncə}}',
      FUTURE:'{N,plural,one{{N} ay ərzində}other{{N} ay ərzində}}',
    },
    SHORT:{
      RELATIVE:{'-1':'keçən ay','0':'bu ay','1':'gələn ay'},
      PAST:'{N,plural,one{{N} ay öncə}other{{N} ay öncə}}',
      FUTURE:'{N,plural,one{{N} ay ərzində}other{{N} ay ərzində}}',
    },
    NARROW:{
      RELATIVE:{'-1':'keçən ay','0':'bu ay','1':'gələn ay'},
      PAST:'{N,plural,one{{N} ay öncə}other{{N} ay öncə}}',
      FUTURE:'{N,plural,one{{N} ay ərzində}other{{N} ay ərzində}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'keçən rüb','0':'bu rüb','1':'gələn rüb'},
      PAST:'{N,plural,one{{N} rüb öncə}other{{N} rüb öncə}}',
      FUTURE:'{N,plural,one{{N} rüb ərzində}other{{N} rüb ərzində}}',
    },
    SHORT:{
      RELATIVE:{'-1':'keçən rüb','0':'bu rüb','1':'gələn rüb'},
      PAST:'{N,plural,one{{N} rüb öncə}other{{N} rüb öncə}}',
      FUTURE:'{N,plural,one{{N} rüb ərzində}other{{N} rüb ərzində}}',
    },
    NARROW:{
      RELATIVE:{'-1':'keçən rüb','0':'bu rüb','1':'gələn rüb'},
      PAST:'{N,plural,one{{N} rüb öncə}other{{N} rüb öncə}}',
      FUTURE:'{N,plural,one{{N} rüb ərzində}other{{N} rüb ərzində}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'indi'},
      PAST:'{N,plural,one{{N} saniyə öncə}other{{N} saniyə öncə}}',
      FUTURE:'{N,plural,one{{N} saniyə ərzində}other{{N} saniyə ərzində}}',
    },
    SHORT:{
      RELATIVE:{'0':'indi'},
      PAST:'{N,plural,one{{N} saniyə öncə}other{{N} saniyə öncə}}',
      FUTURE:'{N,plural,one{{N} saniyə ərzində}other{{N} saniyə ərzində}}',
    },
    NARROW:{
      RELATIVE:{'0':'indi'},
      PAST:'{N,plural,one{{N} saniyə öncə}other{{N} saniyə öncə}}',
      FUTURE:'{N,plural,one{{N} saniyə ərzində}other{{N} saniyə ərzində}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'keçən həftə','0':'bu həftə','1':'gələn həftə'},
      PAST:'{N,plural,one{{N} həftə öncə}other{{N} həftə öncə}}',
      FUTURE:'{N,plural,one{{N} həftə ərzində}other{{N} həftə ərzində}}',
    },
    SHORT:{
      RELATIVE:{'-1':'keçən həftə','0':'bu həftə','1':'gələn həftə'},
      PAST:'{N,plural,one{{N} həftə öncə}other{{N} həftə öncə}}',
      FUTURE:'{N,plural,one{{N} həftə ərzində}other{{N} həftə ərzində}}',
    },
    NARROW:{
      RELATIVE:{'-1':'keçən həftə','0':'bu həftə','1':'gələn həftə'},
      PAST:'{N,plural,one{{N} həftə öncə}other{{N} həftə öncə}}',
      FUTURE:'{N,plural,one{{N} həftə ərzində}other{{N} həftə ərzində}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'keçən il','0':'bu il','1':'gələn il'},
      PAST:'{N,plural,one{{N} il öncə}other{{N} il öncə}}',
      FUTURE:'{N,plural,one{{N} il ərzində}other{{N} il ərzində}}',
    },
    SHORT:{
      RELATIVE:{'-1':'keçən il','0':'bu il','1':'gələn il'},
      PAST:'{N,plural,one{{N} il öncə}other{{N} il öncə}}',
      FUTURE:'{N,plural,one{{N} il ərzində}other{{N} il ərzində}}',
    },
    NARROW:{
      RELATIVE:{'-1':'keçən il','0':'bu il','1':'gələn il'},
      PAST:'{N,plural,one{{N} il öncə}other{{N} il öncə}}',
      FUTURE:'{N,plural,one{{N} il ərzində}other{{N} il ərzində}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_be =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'учора','-2':'пазаўчора','0':'сёння','1':'заўтра','2':'паслязаўтра'},
      PAST:'{N,plural,few{{N} дні таму}many{{N} дзён таму}one{{N} дзень таму}other{{N} дня таму}}',
      FUTURE:'{N,plural,few{праз {N} дні}many{праз {N} дзён}one{праз {N} дзень}other{праз {N} дня}}',
    },
    SHORT:{
      RELATIVE:{'-1':'учора','-2':'пазаўчора','0':'сёння','1':'заўтра','2':'паслязаўтра'},
      PAST:'{N,plural,few{{N} дні таму}many{{N} дзён таму}one{{N} дзень таму}other{{N} дня таму}}',
      FUTURE:'{N,plural,few{праз {N} дні}many{праз {N} дзён}one{праз {N} дзень}other{праз {N} дня}}',
    },
    NARROW:{
      RELATIVE:{'-1':'учора','-2':'пазаўчора','0':'сёння','1':'заўтра','2':'паслязаўтра'},
      PAST:'{N,plural,few{{N} дні таму}many{{N} дзён таму}one{{N} дзень таму}other{{N} дня таму}}',
      FUTURE:'{N,plural,few{праз {N} дні}many{праз {N} дзён}one{праз {N} дзень}other{праз {N} дня}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'у гэту гадзіну'},
      PAST:'{N,plural,few{{N} гадзіны таму}many{{N} гадзін таму}one{{N} гадзіну таму}other{{N} гадзіны таму}}',
      FUTURE:'{N,plural,few{праз {N} гадзіны}many{праз {N} гадзін}one{праз {N} гадзіну}other{праз {N} гадзіны}}',
    },
    SHORT:{
      RELATIVE:{'0':'у гэту гадзіну'},
      PAST:'{N,plural,few{{N} гадз таму}many{{N} гадз таму}one{{N} гадз таму}other{{N} гадз таму}}',
      FUTURE:'{N,plural,few{праз {N} гадз}many{праз {N} гадз}one{праз {N} гадз}other{праз {N} гадз}}',
    },
    NARROW:{
      RELATIVE:{'0':'у гэту гадзіну'},
      PAST:'{N,plural,few{{N} гадз таму}many{{N} гадз таму}one{{N} гадз таму}other{{N} гадз таму}}',
      FUTURE:'{N,plural,few{праз {N} гадз}many{праз {N} гадз}one{праз {N} гадз}other{праз {N} гадз}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'у гэту хвіліну'},
      PAST:'{N,plural,few{{N} хвіліны таму}many{{N} хвілін таму}one{{N} хвіліну таму}other{{N} хвіліны таму}}',
      FUTURE:'{N,plural,few{праз {N} хвіліны}many{праз {N} хвілін}one{праз {N} хвіліну}other{праз {N} хвіліны}}',
    },
    SHORT:{
      RELATIVE:{'0':'у гэту хвіліну'},
      PAST:'{N,plural,few{{N} хв таму}many{{N} хв таму}one{{N} хв таму}other{{N} хв таму}}',
      FUTURE:'{N,plural,few{праз {N} хв}many{праз {N} хв}one{праз {N} хв}other{праз {N} хв}}',
    },
    NARROW:{
      RELATIVE:{'0':'у гэту хвіліну'},
      PAST:'{N,plural,few{{N} хв таму}many{{N} хв таму}one{{N} хв таму}other{{N} хв таму}}',
      FUTURE:'{N,plural,few{праз {N} хв}many{праз {N} хв}one{праз {N} хв}other{праз {N} хв}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'у мінулым месяцы','0':'у гэтым месяцы','1':'у наступным месяцы'},
      PAST:'{N,plural,few{{N} месяцы таму}many{{N} месяцаў таму}one{{N} месяц таму}other{{N} месяца таму}}',
      FUTURE:'{N,plural,few{праз {N} месяцы}many{праз {N} месяцаў}one{праз {N} месяц}other{праз {N} месяца}}',
    },
    SHORT:{
      RELATIVE:{'-1':'у мінулым месяцы','0':'у гэтым месяцы','1':'у наступным месяцы'},
      PAST:'{N,plural,few{{N} мес. таму}many{{N} мес. таму}one{{N} мес. таму}other{{N} мес. таму}}',
      FUTURE:'{N,plural,few{праз {N} мес.}many{праз {N} мес.}one{праз {N} мес.}other{праз {N} мес.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'у мінулым месяцы','0':'у гэтым месяцы','1':'у наступным месяцы'},
      PAST:'{N,plural,few{{N} мес. таму}many{{N} мес. таму}one{{N} мес. таму}other{{N} мес. таму}}',
      FUTURE:'{N,plural,few{праз {N} мес.}many{праз {N} мес.}one{праз {N} мес.}other{праз {N} мес.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'у мінулым квартале','0':'у гэтым квартале','1':'у наступным квартале'},
      PAST:'{N,plural,few{{N} кварталы таму}many{{N} кварталаў таму}one{{N} квартал таму}other{{N} квартала таму}}',
      FUTURE:'{N,plural,few{праз {N} кварталы}many{праз {N} кварталаў}one{праз {N} квартал}other{праз {N} квартала}}',
    },
    SHORT:{
      RELATIVE:{'-1':'у мінулым квартале','0':'у гэтым квартале','1':'у наступным квартале'},
      PAST:'{N,plural,few{{N} кв. таму}many{{N} кв. таму}one{{N} кв. таму}other{{N} кв. таму}}',
      FUTURE:'{N,plural,few{праз {N} кв.}many{праз {N} кв.}one{праз {N} кв.}other{праз {N} кв.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'у мінулым квартале','0':'у гэтым квартале','1':'у наступным квартале'},
      PAST:'{N,plural,few{{N} кв. таму}many{{N} кв. таму}one{{N} кв. таму}other{{N} кв. таму}}',
      FUTURE:'{N,plural,few{праз {N} кв.}many{праз {N} кв.}one{праз {N} кв.}other{праз {N} кв.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'цяпер'},
      PAST:'{N,plural,few{{N} секунды таму}many{{N} секунд таму}one{{N} секунду таму}other{{N} секунды таму}}',
      FUTURE:'{N,plural,few{праз {N} секунды}many{праз {N} секунд}one{праз {N} секунду}other{праз {N} секунды}}',
    },
    SHORT:{
      RELATIVE:{'0':'цяпер'},
      PAST:'{N,plural,few{{N} с таму}many{{N} с таму}one{{N} с таму}other{{N} с таму}}',
      FUTURE:'{N,plural,few{праз {N} с}many{праз {N} с}one{праз {N} с}other{праз {N} с}}',
    },
    NARROW:{
      RELATIVE:{'0':'цяпер'},
      PAST:'{N,plural,few{{N} с таму}many{{N} с таму}one{{N} с таму}other{{N} с таму}}',
      FUTURE:'{N,plural,few{праз {N} с}many{праз {N} с}one{праз {N} с}other{праз {N} с}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'на мінулым тыдні','0':'на гэтым тыдні','1':'на наступным тыдні'},
      PAST:'{N,plural,few{{N} тыдні таму}many{{N} тыдняў таму}one{{N} тыдзень таму}other{{N} тыдня таму}}',
      FUTURE:'{N,plural,few{праз {N} тыдні}many{праз {N} тыдняў}one{праз {N} тыдзень}other{праз {N} тыдня}}',
    },
    SHORT:{
      RELATIVE:{'-1':'на мінулым тыдні','0':'на гэтым тыдні','1':'на наступным тыдні'},
      PAST:'{N,plural,few{{N} тыд таму}many{{N} тыд таму}one{{N} тыд таму}other{{N} тыд таму}}',
      FUTURE:'{N,plural,few{праз {N} тыд}many{праз {N} тыд}one{праз {N} тыд}other{праз {N} тыд}}',
    },
    NARROW:{
      RELATIVE:{'-1':'на мінулым тыдні','0':'на гэтым тыдні','1':'на наступным тыдні'},
      PAST:'{N,plural,few{{N} тыд таму}many{{N} тыд таму}one{{N} тыд таму}other{{N} тыд таму}}',
      FUTURE:'{N,plural,few{праз {N} тыд}many{праз {N} тыд}one{праз {N} тыд}other{праз {N} тыд}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'у мінулым годзе','0':'у гэтым годзе','1':'у наступным годзе'},
      PAST:'{N,plural,few{{N} гады таму}many{{N} гадоў таму}one{{N} год таму}other{{N} года таму}}',
      FUTURE:'{N,plural,few{праз {N} гады}many{праз {N} гадоў}one{праз {N} год}other{праз {N} года}}',
    },
    SHORT:{
      RELATIVE:{'-1':'у мінулым годзе','0':'у гэтым годзе','1':'у наступным годзе'},
      PAST:'{N,plural,few{{N} г. таму}many{{N} г. таму}one{{N} г. таму}other{{N} г. таму}}',
      FUTURE:'{N,plural,few{праз {N} г.}many{праз {N} г.}one{праз {N} г.}other{праз {N} г.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'у мінулым годзе','0':'у гэтым годзе','1':'у наступным годзе'},
      PAST:'{N,plural,few{{N} г. таму}many{{N} г. таму}one{{N} г. таму}other{{N} г. таму}}',
      FUTURE:'{N,plural,few{праз {N} г.}many{праз {N} г.}one{праз {N} г.}other{праз {N} г.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_bg =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'вчера','-2':'онзи ден','0':'днес','1':'утре','2':'вдругиден'},
      PAST:'{N,plural,one{преди {N} ден}other{преди {N} дни}}',
      FUTURE:'{N,plural,one{след {N} ден}other{след {N} дни}}',
    },
    SHORT:{
      RELATIVE:{'-1':'вчера','-2':'онзи ден','0':'днес','1':'утре','2':'вдругиден'},
      PAST:'{N,plural,one{преди {N} ден}other{преди {N} дни}}',
      FUTURE:'{N,plural,one{след {N} ден}other{след {N} дни}}',
    },
    NARROW:{
      RELATIVE:{'-1':'вчера','-2':'онзи ден','0':'днес','1':'утре','2':'вдругиден'},
      PAST:'{N,plural,one{пр. {N} д}other{пр. {N} д}}',
      FUTURE:'{N,plural,one{сл. {N} д}other{сл. {N} д}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'в този час'},
      PAST:'{N,plural,one{преди {N} час}other{преди {N} часа}}',
      FUTURE:'{N,plural,one{след {N} час}other{след {N} часа}}',
    },
    SHORT:{
      RELATIVE:{'0':'в този час'},
      PAST:'{N,plural,one{преди {N} ч}other{преди {N} ч}}',
      FUTURE:'{N,plural,one{след {N} ч}other{след {N} ч}}',
    },
    NARROW:{
      RELATIVE:{'0':'в този час'},
      PAST:'{N,plural,one{пр. {N} ч}other{пр. {N} ч}}',
      FUTURE:'{N,plural,one{сл. {N} ч}other{сл. {N} ч}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'в тази минута'},
      PAST:'{N,plural,one{преди {N} минута}other{преди {N} минути}}',
      FUTURE:'{N,plural,one{след {N} минута}other{след {N} минути}}',
    },
    SHORT:{
      RELATIVE:{'0':'в тази минута'},
      PAST:'{N,plural,one{преди {N} мин}other{преди {N} мин}}',
      FUTURE:'{N,plural,one{след {N} мин}other{след {N} мин}}',
    },
    NARROW:{
      RELATIVE:{'0':'в тази минута'},
      PAST:'{N,plural,one{пр. {N} мин}other{пр. {N} мин}}',
      FUTURE:'{N,plural,one{сл. {N} мин}other{сл. {N} мин}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'предходен месец','0':'този месец','1':'следващ месец'},
      PAST:'{N,plural,one{преди {N} месец}other{преди {N} месеца}}',
      FUTURE:'{N,plural,one{след {N} месец}other{след {N} месеца}}',
    },
    SHORT:{
      RELATIVE:{'-1':'мин. мес.','0':'този мес.','1':'следв. мес.'},
      PAST:'{N,plural,one{преди {N} м.}other{преди {N} м.}}',
      FUTURE:'{N,plural,one{след {N} м.}other{след {N} м.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'мин. м.','0':'т. м.','1':'сл. м.'},
      PAST:'{N,plural,one{пр. {N} м.}other{пр. {N} м.}}',
      FUTURE:'{N,plural,one{сл. {N} м.}other{сл. {N} м.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'предходно тримесечие','0':'това тримесечие','1':'следващо тримесечие'},
      PAST:'{N,plural,one{преди {N} тримесечие}other{преди {N} тримесечия}}',
      FUTURE:'{N,plural,one{след {N} тримесечие}other{след {N} тримесечия}}',
    },
    SHORT:{
      RELATIVE:{'-1':'мин. трим.','0':'това трим.','1':'следв. трим.'},
      PAST:'{N,plural,one{преди {N} трим.}other{преди {N} трим.}}',
      FUTURE:'{N,plural,one{след {N} трим.}other{след {N} трим.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'мин. трим.','0':'това трим.','1':'следв. трим.'},
      PAST:'{N,plural,one{пр. {N} трим.}other{пр. {N} трим.}}',
      FUTURE:'{N,plural,one{сл. {N} трим.}other{сл. {N} трим.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'сега'},
      PAST:'{N,plural,one{преди {N} секунда}other{преди {N} секунди}}',
      FUTURE:'{N,plural,one{след {N} секунда}other{след {N} секунди}}',
    },
    SHORT:{
      RELATIVE:{'0':'сега'},
      PAST:'{N,plural,one{преди {N} сек}other{преди {N} сек}}',
      FUTURE:'{N,plural,one{след {N} сек}other{след {N} сек}}',
    },
    NARROW:{
      RELATIVE:{'0':'сега'},
      PAST:'{N,plural,one{пр. {N} сек}other{пр. {N} сек}}',
      FUTURE:'{N,plural,one{сл. {N} сек}other{сл. {N} сек}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'предходната седмица','0':'тази седмица','1':'следващата седмица'},
      PAST:'{N,plural,one{преди {N} седмица}other{преди {N} седмици}}',
      FUTURE:'{N,plural,one{след {N} седмица}other{след {N} седмици}}',
    },
    SHORT:{
      RELATIVE:{'-1':'миналата седмица','0':'тази седм.','1':'следв. седм.'},
      PAST:'{N,plural,one{преди {N} седм.}other{преди {N} седм.}}',
      FUTURE:'{N,plural,one{след {N} седм.}other{след {N} седм.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'мин. седм.','0':'тази седм.','1':'сл. седм.'},
      PAST:'{N,plural,one{пр. {N} седм.}other{пр. {N} седм.}}',
      FUTURE:'{N,plural,one{сл. {N} седм.}other{сл. {N} седм.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'миналата година','0':'тази година','1':'следващата година'},
      PAST:'{N,plural,one{преди {N} година}other{преди {N} години}}',
      FUTURE:'{N,plural,one{след {N} година}other{след {N} години}}',
    },
    SHORT:{
      RELATIVE:{'-1':'мин. г.','0':'т. г.','1':'следв. г.'},
      PAST:'{N,plural,one{преди {N} г.}other{преди {N} г.}}',
      FUTURE:'{N,plural,one{след {N} г.}other{след {N} г.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'мин. г.','0':'т. г.','1':'сл. г.'},
      PAST:'{N,plural,one{пр. {N} г.}other{пр. {N} г.}}',
      FUTURE:'{N,plural,one{сл. {N} г.}other{сл. {N} г.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_bn =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'গতকাল','-2':'গত পরশু','0':'আজ','1':'আগামীকাল','2':'আগামী পরশু'},
      PAST:'{N,plural,one{{N} দিন আগে}other{{N} দিন আগে}}',
      FUTURE:'{N,plural,one{{N} দিনের মধ্যে}other{{N} দিনের মধ্যে}}',
    },
    SHORT:{
      RELATIVE:{'-1':'গতকাল','-2':'গত পরশু','0':'আজ','1':'আগামীকাল','2':'আগামী পরশু'},
      PAST:'{N,plural,one{{N} দিন আগে}other{{N} দিন আগে}}',
      FUTURE:'{N,plural,one{{N} দিনের মধ্যে}other{{N} দিনের মধ্যে}}',
    },
    NARROW:{
      RELATIVE:{'-1':'গতকাল','-2':'গত পরশু','0':'আজ','1':'আগামীকাল','2':'আগামী পরশু'},
      PAST:'{N,plural,one{{N} দিন আগে}other{{N} দিন আগে}}',
      FUTURE:'{N,plural,one{{N} দিনের মধ্যে}other{{N} দিনের মধ্যে}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'এই ঘণ্টায়'},
      PAST:'{N,plural,one{{N} ঘন্টা আগে}other{{N} ঘন্টা আগে}}',
      FUTURE:'{N,plural,one{{N} ঘন্টায়}other{{N} ঘন্টায়}}',
    },
    SHORT:{
      RELATIVE:{'0':'এই ঘণ্টায়'},
      PAST:'{N,plural,one{{N} ঘন্টা আগে}other{{N} ঘন্টা আগে}}',
      FUTURE:'{N,plural,one{{N} ঘন্টায়}other{{N} ঘন্টায়}}',
    },
    NARROW:{
      RELATIVE:{'0':'এই ঘণ্টায়'},
      PAST:'{N,plural,one{{N} ঘন্টা আগে}other{{N} ঘন্টা আগে}}',
      FUTURE:'{N,plural,one{{N} ঘন্টায়}other{{N} ঘন্টায়}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'এই মিনিট'},
      PAST:'{N,plural,one{{N} মিনিট আগে}other{{N} মিনিট আগে}}',
      FUTURE:'{N,plural,one{{N} মিনিটে}other{{N} মিনিটে}}',
    },
    SHORT:{
      RELATIVE:{'0':'এই মিনিট'},
      PAST:'{N,plural,one{{N} মিনিট আগে}other{{N} মিনিট আগে}}',
      FUTURE:'{N,plural,one{{N} মিনিটে}other{{N} মিনিটে}}',
    },
    NARROW:{
      RELATIVE:{'0':'এই মিনিট'},
      PAST:'{N,plural,one{{N} মিনিট আগে}other{{N} মিনিট আগে}}',
      FUTURE:'{N,plural,one{{N} মিনিটে}other{{N} মিনিটে}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'গত মাস','0':'এই মাস','1':'পরের মাস'},
      PAST:'{N,plural,one{{N} মাস আগে}other{{N} মাস আগে}}',
      FUTURE:'{N,plural,one{{N} মাসে}other{{N} মাসে}}',
    },
    SHORT:{
      RELATIVE:{'-1':'গত মাস','0':'এই মাস','1':'পরের মাস'},
      PAST:'{N,plural,one{{N} মাস আগে}other{{N} মাস আগে}}',
      FUTURE:'{N,plural,one{{N} মাসে}other{{N} মাসে}}',
    },
    NARROW:{
      RELATIVE:{'-1':'গত মাস','0':'এই মাস','1':'পরের মাস'},
      PAST:'{N,plural,one{{N} মাস আগে}other{{N} মাস আগে}}',
      FUTURE:'{N,plural,one{{N} মাসে}other{{N} মাসে}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'গত ত্রৈমাসিক','0':'এই ত্রৈমাসিক','1':'পরের ত্রৈমাসিক'},
      PAST:'{N,plural,one{{N} ত্রৈমাসিক আগে}other{{N} ত্রৈমাসিক আগে}}',
      FUTURE:'{N,plural,one{{N} ত্রৈমাসিকে}other{{N} ত্রৈমাসিকে}}',
    },
    SHORT:{
      RELATIVE:{'-1':'গত ত্রৈমাসিক','0':'এই ত্রৈমাসিক','1':'পরের ত্রৈমাসিক'},
      PAST:'{N,plural,one{{N} ত্রৈমাসিক আগে}other{{N} ত্রৈমাসিক আগে}}',
      FUTURE:'{N,plural,one{{N} ত্রৈমাসিকে}other{{N} ত্রৈমাসিকে}}',
    },
    NARROW:{
      RELATIVE:{'-1':'গত ত্রৈমাসিক','0':'এই ত্রৈমাসিক','1':'পরের ত্রৈমাসিক'},
      PAST:'{N,plural,one{{N} ত্রৈমাসিক আগে}other{{N} ত্রৈমাসিক আগে}}',
      FUTURE:'{N,plural,one{{N} ত্রৈমাসিকে}other{{N} ত্রৈমাসিকে}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'এখন'},
      PAST:'{N,plural,one{{N} সেকেন্ড পূর্বে}other{{N} সেকেন্ড পূর্বে}}',
      FUTURE:'{N,plural,one{{N} সেকেন্ডে}other{{N} সেকেন্ডে}}',
    },
    SHORT:{
      RELATIVE:{'0':'এখন'},
      PAST:'{N,plural,one{{N} সেকেন্ড পূর্বে}other{{N} সেকেন্ড পূর্বে}}',
      FUTURE:'{N,plural,one{{N} সেকেন্ডে}other{{N} সেকেন্ডে}}',
    },
    NARROW:{
      RELATIVE:{'0':'এখন'},
      PAST:'{N,plural,one{{N} সেকেন্ড আগে}other{{N} সেকেন্ড আগে}}',
      FUTURE:'{N,plural,one{{N} সেকেন্ডে}other{{N} সেকেন্ডে}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'গত সপ্তাহ','0':'এই সপ্তাহ','1':'পরের সপ্তাহ'},
      PAST:'{N,plural,one{{N} সপ্তাহ আগে}other{{N} সপ্তাহ আগে}}',
      FUTURE:'{N,plural,one{{N} সপ্তাহে}other{{N} সপ্তাহে}}',
    },
    SHORT:{
      RELATIVE:{'-1':'গত সপ্তাহ','0':'এই সপ্তাহ','1':'পরের সপ্তাহ'},
      PAST:'{N,plural,one{{N} সপ্তাহ আগে}other{{N} সপ্তাহ আগে}}',
      FUTURE:'{N,plural,one{{N} সপ্তাহে}other{{N} সপ্তাহে}}',
    },
    NARROW:{
      RELATIVE:{'-1':'গত সপ্তাহ','0':'এই সপ্তাহ','1':'পরের সপ্তাহ'},
      PAST:'{N,plural,one{{N} সপ্তাহ আগে}other{{N} সপ্তাহ আগে}}',
      FUTURE:'{N,plural,one{{N} সপ্তাহে}other{{N} সপ্তাহে}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'গত বছর','0':'এই বছর','1':'পরের বছর'},
      PAST:'{N,plural,one{{N} বছর পূর্বে}other{{N} বছর পূর্বে}}',
      FUTURE:'{N,plural,one{{N} বছরে}other{{N} বছরে}}',
    },
    SHORT:{
      RELATIVE:{'-1':'গত বছর','0':'এই বছর','1':'পরের বছর'},
      PAST:'{N,plural,one{{N} বছর পূর্বে}other{{N} বছর পূর্বে}}',
      FUTURE:'{N,plural,one{{N} বছরে}other{{N} বছরে}}',
    },
    NARROW:{
      RELATIVE:{'-1':'গত বছর','0':'এই বছর','1':'পরের বছর'},
      PAST:'{N,plural,one{{N} বছর পূর্বে}other{{N} বছর পূর্বে}}',
      FUTURE:'{N,plural,one{{N} বছরে}other{{N} বছরে}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_br =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'decʼh','-2':'dercʼhent-decʼh','0':'hiziv','1':'warcʼhoazh'},
      PAST:'{N,plural,few{{N} deiz zo}many{{N} a zeizioù zo}one{{N} deiz zo}other{{N} deiz zo}two{{N} zeiz zo}}',
      FUTURE:'{N,plural,few{a-benn {N} deiz}many{a-benn {N} a zeizioù}one{a-benn {N} deiz}other{a-benn {N} deiz}two{a-benn {N} zeiz}}',
    },
    SHORT:{
      RELATIVE:{'-1':'decʼh','-2':'dercʼhent-decʼh','0':'hiziv','1':'warcʼhoazh'},
      PAST:'{N,plural,few{{N} d zo}many{{N} d zo}one{{N} d zo}other{{N} d zo}two{{N} d zo}}',
      FUTURE:'{N,plural,few{a-benn {N} d}many{a-benn {N} d}one{a-benn {N} d}other{a-benn {N} d}two{a-benn {N} d}}',
    },
    NARROW:{
      RELATIVE:{'-1':'decʼh','-2':'dercʼhent-decʼh','0':'hiziv','1':'warcʼhoazh'},
      PAST:'{N,plural,few{-{N} d}many{-{N} d}one{-{N} d}other{-{N} d}two{-{N} d}}',
      FUTURE:'{N,plural,few{+{N} d}many{+{N} d}one{+{N} d}other{+{N} d}two{+{N} d}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'dʼan eur-mañ'},
      PAST:'{N,plural,few{{N} eur zo}many{{N} a eurioù zo}one{{N} eur zo}other{{N} eur zo}two{{N} eur zo}}',
      FUTURE:'{N,plural,few{a-benn {N} eur}many{a-benn {N} a eurioù}one{a-benn {N} eur}other{a-benn {N} eur}two{a-benn {N} eur}}',
    },
    SHORT:{
      RELATIVE:{'0':'dʼan eur-mañ'},
      PAST:'{N,plural,few{{N} e zo}many{{N} e zo}one{{N} e zo}other{{N} e zo}two{{N} e zo}}',
      FUTURE:'{N,plural,few{a-benn {N} e}many{a-benn {N} e}one{a-benn {N} e}other{a-benn {N} e}two{a-benn {N} e}}',
    },
    NARROW:{
      RELATIVE:{'0':'dʼan eur-mañ'},
      PAST:'{N,plural,few{-{N} h}many{-{N} h}one{-{N} h}other{-{N} h}two{-{N} h}}',
      FUTURE:'{N,plural,few{+{N} h}many{+{N} h}one{+{N} h}other{+{N} h}two{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,few{{N} munut zo}many{{N} a vunutoù zo}one{{N} munut zo}other{{N} munut zo}two{{N} vunut zo}}',
      FUTURE:'{N,plural,few{a-benn {N} munut}many{a-benn {N} a vunutoù}one{a-benn {N} munut}other{a-benn {N} munut}two{a-benn {N} vunut}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,few{{N} min zo}many{{N} min zo}one{{N} min zo}other{{N} min zo}two{{N} min zo}}',
      FUTURE:'{N,plural,few{a-benn {N} min}many{a-benn {N} min}one{a-benn {N} min}other{a-benn {N} min}two{a-benn {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,few{-{N} min}many{-{N} min}one{-{N} min}other{-{N} min}two{-{N} min}}',
      FUTURE:'{N,plural,few{+{N} min}many{+{N} min}one{+{N} min}other{+{N} min}two{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ar miz diaraok','0':'ar miz-mañ','1':'ar miz a zeu'},
      PAST:'{N,plural,few{{N} miz zo}many{{N} a vizioù zo}one{{N} miz zo}other{{N} miz zo}two{{N} viz zo}}',
      FUTURE:'{N,plural,few{a-benn {N} miz}many{a-benn {N} a vizioù}one{a-benn {N} miz}other{a-benn {N} miz}two{a-benn {N} viz}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ar miz diaraok','0':'ar miz-mañ','1':'ar miz a zeu'},
      PAST:'{N,plural,few{{N} miz zo}many{{N} a vizioù zo}one{{N} miz zo}other{{N} miz zo}two{{N} viz zo}}',
      FUTURE:'{N,plural,few{a-benn {N} miz}many{a-benn {N} a vizioù}one{a-benn {N} miz}other{a-benn {N} miz}two{a-benn {N} viz}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ar miz diaraok','0':'ar miz-mañ','1':'ar miz a zeu'},
      PAST:'{N,plural,few{-{N} miz}many{-{N} miz}one{-{N} miz}other{-{N} miz}two{-{N} miz}}',
      FUTURE:'{N,plural,few{+{N} miz}many{+{N} miz}one{+{N} miz}other{+{N} miz}two{+{N} miz}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'an trimiziad diaraok','0':'an trimiziad-mañ','1':'an trimiziad a zeu'},
      PAST:'{N,plural,few{{N} zrimiziad zo}many{{N} a zrimiziadoù zo}one{{N} trimiziad zo}other{{N} trimiziad zo}two{{N} drimiziad zo}}',
      FUTURE:'{N,plural,few{a-benn {N} zrimiziad}many{a-benn {N} a drimiziadoù}one{a-benn {N} trimiziad}other{a-benn {N} trimiziad}two{a-benn {N} drimiziad}}',
    },
    SHORT:{
      RELATIVE:{'-1':'an trim. diaraok','0':'an trim.-mañ','1':'an trim. a zeu'},
      PAST:'{N,plural,few{{N} trim. zo}many{{N} trim. zo}one{{N} trim. zo}other{{N} trim. zo}two{{N} trim. zo}}',
      FUTURE:'{N,plural,few{a-benn {N} trim.}many{a-benn {N} trim.}one{a-benn {N} trim.}other{a-benn {N} trim.}two{a-benn {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'an trim. diaraok','0':'an trim.-mañ','1':'an trim. a zeu'},
      PAST:'{N,plural,few{-{N} trim.}many{-{N} trim.}one{-{N} trim.}other{-{N} trim.}two{-{N} trim.}}',
      FUTURE:'{N,plural,few{+{N} trim.}many{+{N} trim.}one{+{N} trim.}other{+{N} trim.}two{+{N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'bremañ'},
      PAST:'{N,plural,few{{N} eilenn zo}many{{N} eilenn zo}one{{N} eilenn zo}other{{N} eilenn zo}two{{N} eilenn zo}}',
      FUTURE:'{N,plural,few{a-benn {N} eilenn}many{a-benn {N} a eilennoù}one{a-benn {N} eilenn}other{a-benn {N} eilenn}two{a-benn {N} eilenn}}',
    },
    SHORT:{
      RELATIVE:{'0':'brem.'},
      PAST:'{N,plural,few{{N} s zo}many{{N} s zo}one{{N} s zo}other{{N} s zo}two{{N} s zo}}',
      FUTURE:'{N,plural,few{a-benn {N} s}many{a-benn {N} s}one{a-benn {N} s}other{a-benn {N} s}two{a-benn {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'brem.'},
      PAST:'{N,plural,few{-{N} s}many{-{N} s}one{-{N} s}other{-{N} s}two{-{N} s}}',
      FUTURE:'{N,plural,few{+{N} s}many{+{N} s}one{+{N} s}other{+{N} s}two{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'ar sizhun diaraok','0':'ar sizhun-mañ','1':'ar sizhun a zeu'},
      PAST:'{N,plural,few{{N} sizhun zo}many{{N} a sizhunioù zo}one{{N} sizhun zo}other{{N} sizhun zo}two{{N} sizhun zo}}',
      FUTURE:'{N,plural,few{a-benn {N} sizhun}many{a-benn {N} a sizhunioù}one{a-benn {N} sizhun}other{a-benn {N} sizhun}two{a-benn {N} sizhun}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ar sizhun diaraok','0':'ar sizhun-mañ','1':'ar sizhun a zeu'},
      PAST:'{N,plural,few{{N} sizhun zo}many{{N} a sizhunioù zo}one{{N} sizhun zo}other{{N} sizhun zo}two{{N} sizhun zo}}',
      FUTURE:'{N,plural,few{a-benn {N} sizhun}many{a-benn {N} a sizhunioù}one{a-benn {N} sizhun}other{a-benn {N} sizhun}two{a-benn {N} sizhun}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ar sizhun diaraok','0':'ar sizhun-mañ','1':'ar sizhun a zeu'},
      PAST:'{N,plural,few{{N} sizhun zo}many{{N} a sizhunioù zo}one{{N} sizhun zo}other{{N} sizhun zo}two{{N} sizhun zo}}',
      FUTURE:'{N,plural,few{a-benn {N} sizhun}many{a-benn {N} a sizhunioù}one{a-benn {N} sizhun}other{a-benn {N} sizhun}two{a-benn {N} sizhun}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'warlene','0':'hevlene','1':'ar bloaz a zeu'},
      PAST:'{N,plural,few{{N} bloaz zo}many{{N} a vloazioù zo}one{{N} bloaz zo}other{{N} vloaz zo}two{{N} vloaz zo}}',
      FUTURE:'{N,plural,few{a-benn {N} bloaz}many{a-benn {N} a vloazioù}one{a-benn {N} bloaz}other{a-benn {N} vloaz}two{a-benn {N} vloaz}}',
    },
    SHORT:{
      RELATIVE:{'-1':'warlene','0':'hevlene','1':'ar bl. a zeu'},
      PAST:'{N,plural,few{{N} bl. zo}many{{N} bl. zo}one{{N} bl. zo}other{{N} bl. zo}two{{N} bl. zo}}',
      FUTURE:'{N,plural,few{a-benn {N} bl.}many{a-benn {N} bl.}one{a-benn {N} bl.}other{a-benn {N} bl.}two{a-benn {N} bl.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'warlene','0':'hevlene','1':'ar bl. a zeu'},
      PAST:'{N,plural,few{-{N} bl.}many{-{N} bl.}one{-{N} bl.}other{-{N} bl.}two{-{N} bl.}}',
      FUTURE:'{N,plural,few{+{N} bl.}many{+{N} bl.}one{+{N} bl.}other{+{N} bl.}two{+{N} bl.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_bs =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'jučer','-2':'prekjučer','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{prije {N} dana}one{prije {N} dan}other{prije {N} dana}}',
      FUTURE:'{N,plural,few{za {N} dana}one{za {N} dan}other{za {N} dana}}',
    },
    SHORT:{
      RELATIVE:{'-1':'jučer','-2':'prekjučer','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{prije {N} d.}one{prije {N} d.}other{prije {N} d.}}',
      FUTURE:'{N,plural,few{za {N} d.}one{za {N} d.}other{za {N} d.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'jučer','-2':'prekjučer','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{prije {N} d.}one{prije {N} d.}other{prije {N} d.}}',
      FUTURE:'{N,plural,few{za {N} d.}one{za {N} d.}other{za {N} d.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ovaj sat'},
      PAST:'{N,plural,few{prije {N} sata}one{prije {N} sat}other{prije {N} sati}}',
      FUTURE:'{N,plural,few{za {N} sata}one{za {N} sat}other{za {N} sati}}',
    },
    SHORT:{
      RELATIVE:{'0':'ovaj sat'},
      PAST:'{N,plural,few{prije {N} sata}one{prije {N} sat}other{prije {N} sati}}',
      FUTURE:'{N,plural,few{za {N} sata}one{za {N} sat}other{za {N} sati}}',
    },
    NARROW:{
      RELATIVE:{'0':'ovaj sat'},
      PAST:'{N,plural,few{prije {N} sata}one{prije {N} sat}other{prije {N} sati}}',
      FUTURE:'{N,plural,few{za {N} sata}one{za {N} sat}other{za {N} sati}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ova minuta'},
      PAST:'{N,plural,few{prije {N} minute}one{prije {N} minutu}other{prije {N} minuta}}',
      FUTURE:'{N,plural,few{za {N} minute}one{za {N} minutu}other{za {N} minuta}}',
    },
    SHORT:{
      RELATIVE:{'0':'ova minuta'},
      PAST:'{N,plural,few{prije {N} min.}one{prije {N} min.}other{prije {N} min.}}',
      FUTURE:'{N,plural,few{za {N} min.}one{za {N} min.}other{za {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ova minuta'},
      PAST:'{N,plural,few{prije {N} min.}one{prije {N} min.}other{prije {N} min.}}',
      FUTURE:'{N,plural,few{za {N} min.}one{za {N} min.}other{za {N} min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'prošli mjesec','0':'ovaj mjesec','1':'sljedeći mjesec'},
      PAST:'{N,plural,few{prije {N} mjeseca}one{prije {N} mjesec}other{prije {N} mjeseci}}',
      FUTURE:'{N,plural,few{za {N} mjeseca}one{za {N} mjesec}other{za {N} mjeseci}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošli mjesec','0':'ovaj mjesec','1':'sljedeći mjesec'},
      PAST:'{N,plural,few{prije {N} mj.}one{prije {N} mj.}other{prije {N} mj.}}',
      FUTURE:'{N,plural,few{za {N} mj.}one{za {N} mj.}other{za {N} mj.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošli mjesec','0':'ovaj mjesec','1':'sljedeći mjesec'},
      PAST:'{N,plural,few{prije {N} mj.}one{prije {N} mj.}other{prije {N} mj.}}',
      FUTURE:'{N,plural,few{za {N} mj.}one{za {N} mj.}other{za {N} mj.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'posljednji kvartal','0':'ovaj kvartal','1':'sljedeći kvartal'},
      PAST:'{N,plural,few{prije {N} kvartala}one{prije {N} kvartal}other{prije {N} kvartala}}',
      FUTURE:'{N,plural,few{za {N} kvartala}one{za {N} kvartal}other{za {N} kvartala}}',
    },
    SHORT:{
      RELATIVE:{'-1':'posljednji kvartal','0':'ovaj kvartal','1':'sljedeći kvartal'},
      PAST:'{N,plural,few{prije {N} kv.}one{prije {N} kv.}other{prije {N} kv.}}',
      FUTURE:'{N,plural,few{za {N} kv.}one{za {N} kv.}other{za {N} kv.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'posljednji kvartal','0':'ovaj kvartal','1':'sljedeći kvartal'},
      PAST:'{N,plural,few{prije {N} kv.}one{prije {N} kv.}other{prije {N} kv.}}',
      FUTURE:'{N,plural,few{za {N} kv.}one{za {N} kv.}other{za {N} kv.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'sada'},
      PAST:'{N,plural,few{prije {N} sekunde}one{prije {N} sekundu}other{prije {N} sekundi}}',
      FUTURE:'{N,plural,few{za {N} sekunde}one{za {N} sekundu}other{za {N} sekundi}}',
    },
    SHORT:{
      RELATIVE:{'0':'sada'},
      PAST:'{N,plural,few{prije {N} sek.}one{prije {N} sek.}other{prije {N} sek.}}',
      FUTURE:'{N,plural,few{za {N} sek.}one{za {N} sek.}other{za {N} sek.}}',
    },
    NARROW:{
      RELATIVE:{'0':'sada'},
      PAST:'{N,plural,few{prije {N} sek.}one{prije {N} sek.}other{prije {N} sek.}}',
      FUTURE:'{N,plural,few{za {N} sek.}one{za {N} sek.}other{za {N} sek.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'prošle sedmice','0':'ove sedmice','1':'sljedeće sedmice'},
      PAST:'{N,plural,few{prije {N} sedmice}one{prije {N} sedmicu}other{prije {N} sedmica}}',
      FUTURE:'{N,plural,few{za {N} sedmice}one{za {N} sedmicu}other{za {N} sedmica}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošle sedmice','0':'ove sedmice','1':'sljedeće sedmice'},
      PAST:'{N,plural,few{prije {N} sed.}one{prije {N} sed.}other{prije {N} sed.}}',
      FUTURE:'{N,plural,few{za {N} sed.}one{za {N} sed.}other{za {N} sed.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošle sedmice','0':'ove sedmice','1':'sljedeće sedmice'},
      PAST:'{N,plural,few{prije {N} sed.}one{prije {N} sed.}other{prije {N} sed.}}',
      FUTURE:'{N,plural,few{za {N} sed.}one{za {N} sed.}other{za {N} sed.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'prošle godine','0':'ove godine','1':'sljedeće godine'},
      PAST:'{N,plural,few{prije {N} godine}one{prije {N} godinu}other{prije {N} godina}}',
      FUTURE:'{N,plural,few{za {N} godine}one{za {N} godinu}other{za {N} godina}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošle godine','0':'ove godine','1':'sljedeće godine'},
      PAST:'{N,plural,few{prije {N} god.}one{prije {N} god.}other{prije {N} god.}}',
      FUTURE:'{N,plural,few{za {N} god.}one{za {N} god.}other{za {N} god.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošle godine','0':'ove godine','1':'sljedeće godine'},
      PAST:'{N,plural,few{prije {N} g.}one{prije {N} g.}other{prije {N} g.}}',
      FUTURE:'{N,plural,few{za {N} g.}one{za {N} g.}other{za {N} g.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ca =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ahir','-2':'abans-d’ahir','0':'avui','1':'demà','2':'demà passat'},
      PAST:'{N,plural,one{fa {N} dia}other{fa {N} dies}}',
      FUTURE:'{N,plural,one{d’aquí a {N} dia}other{d’aquí a {N} dies}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ahir','-2':'abans-d’ahir','0':'avui','1':'demà','2':'demà passat'},
      PAST:'{N,plural,one{fa {N} dia}other{fa {N} dies}}',
      FUTURE:'{N,plural,one{d’aquí a {N} dia}other{d’aquí a {N} dies}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ahir','-2':'abans-d’ahir','0':'avui','1':'demà','2':'demà passat'},
      PAST:'{N,plural,one{fa {N} dia}other{fa {N} dies}}',
      FUTURE:'{N,plural,one{d’aquí a {N} dia}other{d’aquí a {N} dies}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'aquesta hora'},
      PAST:'{N,plural,one{fa {N} hora}other{fa {N} hores}}',
      FUTURE:'{N,plural,one{d’aquí a {N} hora}other{d’aquí a {N} hores}}',
    },
    SHORT:{
      RELATIVE:{'0':'aquesta hora'},
      PAST:'{N,plural,one{fa {N} h}other{fa {N} h}}',
      FUTURE:'{N,plural,one{d’aquí a {N} h}other{d’aquí a {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'aquesta hora'},
      PAST:'{N,plural,one{fa {N} h}other{fa {N} h}}',
      FUTURE:'{N,plural,one{d‘aquí a {N} h}other{d‘aquí a {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'aquest minut'},
      PAST:'{N,plural,one{fa {N} minut}other{fa {N} minuts}}',
      FUTURE:'{N,plural,one{d’aquí a {N} minut}other{d’aquí a {N} minuts}}',
    },
    SHORT:{
      RELATIVE:{'0':'aquest minut'},
      PAST:'{N,plural,one{fa {N} min}other{fa {N} min}}',
      FUTURE:'{N,plural,one{d’aquí a {N} min}other{d’aquí a {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'aquest minut'},
      PAST:'{N,plural,one{fa {N} min}other{fa {N} min}}',
      FUTURE:'{N,plural,one{d’aquí a {N} min}other{d’aquí a {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'el mes passat','0':'aquest mes','1':'el mes que ve'},
      PAST:'{N,plural,one{fa {N} mes}other{fa {N} mesos}}',
      FUTURE:'{N,plural,one{d’aquí a {N} mes}other{d’aquí a {N} mesos}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el mes passat','0':'aquest mes','1':'el mes que ve'},
      PAST:'{N,plural,one{fa {N} mes}other{fa {N} mesos}}',
      FUTURE:'{N,plural,one{d’aquí a {N} mes}other{d’aquí a {N} mesos}}',
    },
    NARROW:{
      RELATIVE:{'-1':'mes passat','0':'aquest mes','1':'mes vinent'},
      PAST:'{N,plural,one{fa {N} mes}other{fa {N} mesos}}',
      FUTURE:'{N,plural,one{d’aquí a {N} mes}other{d’aquí a {N} mesos}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'el trimestre passat','0':'aquest trimestre','1':'el trimestre que ve'},
      PAST:'{N,plural,one{fa {N} trimestre}other{fa {N} trimestres}}',
      FUTURE:'{N,plural,one{d’aquí a {N} trimestre}other{d’aquí a {N} trimestres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el trim. passat','0':'aquest trim.','1':'el trim. que ve'},
      PAST:'{N,plural,one{fa {N} trim.}other{fa {N} trim.}}',
      FUTURE:'{N,plural,one{d’aquí a {N} trim.}other{d’aquí a {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'trim. passat','0':'aquest trim.','1':'trim. vinent'},
      PAST:'{N,plural,one{fa {N} trim.}other{fa {N} trim.}}',
      FUTURE:'{N,plural,one{d’aquí a {N} trim.}other{d’aquí a {N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ara'},
      PAST:'{N,plural,one{fa {N} segon}other{fa {N} segons}}',
      FUTURE:'{N,plural,one{d’aquí a {N} segon}other{d’aquí a {N} segons}}',
    },
    SHORT:{
      RELATIVE:{'0':'ara'},
      PAST:'{N,plural,one{fa {N} s}other{fa {N} s}}',
      FUTURE:'{N,plural,one{d’aquí a {N} s}other{d’aquí a {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'ara'},
      PAST:'{N,plural,one{fa {N} s}other{fa {N} s}}',
      FUTURE:'{N,plural,one{d’aquí a {N} s}other{d’aquí a {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'la setmana passada','0':'aquesta setmana','1':'la setmana que ve'},
      PAST:'{N,plural,one{fa {N} setmana}other{fa {N} setmanes}}',
      FUTURE:'{N,plural,one{d’aquí a {N} setmana}other{d’aquí a {N} setmanes}}',
    },
    SHORT:{
      RELATIVE:{'-1':'la setm. passada','0':'aquesta setm.','1':'la setm. que ve'},
      PAST:'{N,plural,one{fa {N} setm.}other{fa {N} setm.}}',
      FUTURE:'{N,plural,one{d’aquí a {N} setm.}other{d’aquí a {N} setm.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'setm. passada','0':'aquesta setm.','1':'setm. vinent'},
      PAST:'{N,plural,one{fa {N} setm.}other{fa {N} setm.}}',
      FUTURE:'{N,plural,one{d’aquí a {N} setm.}other{d’aquí a {N} setm.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'l’any passat','0':'enguany','1':'l’any que ve'},
      PAST:'{N,plural,one{fa {N} any}other{fa {N} anys}}',
      FUTURE:'{N,plural,one{d’aquí a {N} any}other{d’aquí a {N} anys}}',
    },
    SHORT:{
      RELATIVE:{'-1':'l’any passat','0':'enguany','1':'l’any que ve'},
      PAST:'{N,plural,one{fa {N} any}other{fa {N} anys}}',
      FUTURE:'{N,plural,one{d’aquí a {N} any}other{d’aquí a {N} anys}}',
    },
    NARROW:{
      RELATIVE:{'-1':'l’any passat','0':'enguany','1':'l’any que ve'},
      PAST:'{N,plural,one{fa {N} any}other{fa {N} anys}}',
      FUTURE:'{N,plural,one{d’aquí a {N} any}other{d’aquí a {N} anys}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_chr =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ᏒᎯ','0':'ᎪᎯ ᎢᎦ','1':'ᏌᎾᎴᎢ'},
      PAST:'{N,plural,one{{N} ᎢᎦ ᏥᎨᏒ}other{{N} ᎯᎸᏍᎩ ᏧᏒᎯᏛ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎢᎦ}other{ᎾᎿ {N} ᎯᎸᏍᎩ ᏧᏒᎯᏛ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ᏒᎯ','0':'ᎪᎯ ᎢᎦ','1':'ᏌᎾᎴᎢ'},
      PAST:'{N,plural,one{{N} ᎢᎦ ᏥᎨᏒ}other{{N} ᎯᎸᏍᎩ ᏧᏒᎯᏛ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎢᎦ}other{ᎾᎿ {N} ᎯᎸᏍᎩ ᏧᏒᎯᏛ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ᏒᎯ','0':'ᎪᎯ ᎢᎦ','1':'ᏌᎾᎴᎢ'},
      PAST:'{N,plural,one{{N} ᎢᎦ ᏥᎨᏒ}other{{N} ᎯᎸᏍᎩ ᏧᏒᎯᏛ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎢᎦ}other{ᎾᎿ {N} ᎯᎸᏍᎩ ᏧᏒᎯᏛ}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ᎯᎠ ᏑᏟᎶᏓ'},
      PAST:'{N,plural,one{{N} ᏑᏟᎶᏓ ᏥᎨᏒ}other{{N} ᎢᏳᏟᎶᏓ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᏑᏟᎶᏓ}other{ᎾᎿ {N} ᎢᏳᏟᎶᏓ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ᎯᎠ ᏑᏟᎶᏓ'},
      PAST:'{N,plural,one{{N} ᏑᏟ. ᏥᎨᏒ}other{{N} ᏑᏟ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᏑᏟ.}other{ᎾᎿ {N} ᏑᏟ.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ᎯᎠ ᏑᏟᎶᏓ'},
      PAST:'{N,plural,one{{N} ᏑᏟ. ᏥᎨᏒ}other{{N} ᏑᏟ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᏑᏟ.}other{ᎾᎿ {N} ᏑᏟ.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ᎯᎠ ᎢᏯᏔᏬᏍᏔᏅ'},
      PAST:'{N,plural,one{{N} ᎢᏯᏔᏬᏍᏔᏅ ᏥᎨᏒ}other{{N} ᎢᏯᏔᏬᏍᏔᏅ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎢᏯᏔᏬᏍᏔᏅ}other{ᎾᎿ {N} ᎢᏯᏔᏬᏍᏔᏅ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ᎯᎠ ᎢᏯᏔᏬᏍᏔᏅ'},
      PAST:'{N,plural,one{{N} ᎢᏯᏔ. ᏥᎨᏒ}other{{N} ᎢᏯᏔ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎢᏯᏔ.}other{ᎾᎿ {N} ᎢᏯᏔ.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ᎯᎠ ᎢᏯᏔᏬᏍᏔᏅ'},
      PAST:'{N,plural,one{{N} ᎢᏯᏔ. ᏥᎨᏒ}other{{N} ᎢᏯᏔ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎢᏯᏔ.}other{ᎾᎿ {N} ᎢᏯᏔ.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ᎧᎸᎢ ᏥᎨᏒ','0':'ᎯᎠ ᎧᎸᎢ','1':'ᏔᎵᏁ ᎧᎸᎢ'},
      PAST:'{N,plural,one{{N} ᎧᎸᎢ ᏥᎨᏒ}other{{N} ᏗᎧᎸᎢ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎧᎸᎢ}other{ᎾᎿ {N} ᏗᎧᎸᎢ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ᎧᎸᎢ ᏥᎨᏒ','0':'ᎯᎠ ᎧᎸᎢ','1':'ᏔᎵᏁ ᎧᎸᎢ'},
      PAST:'{N,plural,one{{N} ᎧᎸ. ᏥᎨᏒ}other{{N} ᎧᎸ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎧᎸ.}other{ᎾᎿ {N} ᎧᎸ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ᎧᎸᎢ ᏥᎨᏒ','0':'ᎯᎠ ᎧᎸᎢ','1':'ᏔᎵᏁ ᎧᎸᎢ'},
      PAST:'{N,plural,one{{N} ᎧᎸ. ᏥᎨᏒ}other{{N} ᎧᎸ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎧᎸ.}other{ᎾᎿ {N} ᎧᎸ.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'ᎩᏄᏙᏗ ᏥᎨᏒ','0':'ᎯᎠ ᎩᏄᏙᏗ','1':'ᏔᎵᏁ ᎩᏄᏙᏗ'},
      PAST:'{N,plural,one{ᎾᎿ {N} ᎩᏄᏙᏗ ᏥᎨᏒ}other{{N} ᎩᏄᏙᏗ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎩᏄᏙᏗ}other{ᎾᎿ {N} ᎩᏄᏙᏗ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ᎩᏄᏙᏗ ᏥᎨᏒ','0':'ᎯᎠ ᎩᏄᏙᏗ','1':'ᏔᎵᏁ ᎩᏄᏙᏗ'},
      PAST:'{N,plural,one{{N} ᎩᏄᏘ. ᏥᎨᏒ}other{{N} ᎩᏄᏘ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎩᏄᏘ.}other{ᎾᎿ {N} ᎩᏄᏘ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ᎩᏄᏙᏗ ᏥᎨᏒ','0':'ᎯᎠ ᎩᏄᏙᏗ','1':'ᏔᎵᏁ ᎩᏄᏙᏗ'},
      PAST:'{N,plural,one{{N} ᎩᏄᏘ. ᏥᎨᏒ}other{{N} ᎩᏄᏘ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎩᏄᏘ.}other{ᎾᎿ {N} ᎩᏄᏘ.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ᏃᏊ'},
      PAST:'{N,plural,one{{N} ᎠᏎᏢ ᏥᎨᏒ}other{{N} ᏓᏓᎾᏩᏍᎬ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎠᏎᏢ}other{ᎾᎿ {N} ᏓᏓᎾᏩᏍᎬ ᏥᎨᏒ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ᏃᏊ'},
      PAST:'{N,plural,one{{N} ᎠᏎ. ᏥᎨᏒ}other{{N} ᎠᏎ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎠᏎ.}other{ᎾᎿ {N} ᎠᏎ.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ᏃᏊ'},
      PAST:'{N,plural,one{{N} ᎠᏎ. ᏥᎨᏒ}other{{N} ᎠᏎ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎠᏎ.}other{ᎾᎿ {N} ᎠᏎ.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'ᏥᏛᎵᏱᎵᏒᎢ','0':'ᎯᎠ ᎠᎵᎵᏌ','1':'ᏐᏆᎴᏅᎲ'},
      PAST:'{N,plural,one{{N} ᏒᎾᏙᏓᏆᏍᏗ ᏥᎨᏒ}other{{N} ᎢᏳᎾᏙᏓᏆᏍᏗ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᏒᎾᏙᏓᏆᏍᏗ}other{ᎾᎿ {N} ᎢᏳᎾᏙᏓᏆᏍᏗ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ᏥᏛᎵᏱᎵᏒᎢ','0':'ᎯᎠ ᎠᎵᎵᏌ','1':'ᏐᏆᎴᏅᎲ'},
      PAST:'{N,plural,one{{N} ᏒᎾ. ᏥᎨᏒ}other{{N} ᏒᎾ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᏒᎾ.}other{ᎾᎿ {N} ᏒᎾ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ᏥᏛᎵᏱᎵᏒᎢ','0':'ᎯᎠ ᎠᎵᎵᏌ','1':'ᏐᏆᎴᏅᎲ'},
      PAST:'{N,plural,one{{N} ᏒᎾ. ᏥᎨᏒ}other{{N} ᏒᎾ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᏒᎾ.}other{ᎾᎿ {N} ᏒᎾ.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ᎡᏘ ᏥᎨᏒ','0':'ᎯᎠ ᏧᏕᏘᏴᏒᏘ','1':'ᎡᏘᏴᎢ'},
      PAST:'{N,plural,one{{N} ᎤᏕᏘᏴᏌᏗᏒᎢ ᏥᎨᏒ}other{{N} ᎢᏧᏕᏘᏴᏌᏗᏒᎢ ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎤᏕᏘᏴᏌᏗᏒᎢ}other{ᎾᎿ {N} ᎢᏧᏕᏘᏴᏌᏗᏒᎢ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ᎡᏘ ᏥᎨᏒ','0':'ᎯᎠ ᏧᏕᏘᏴᏒᏘ','1':'ᎡᏘᏴᎢ'},
      PAST:'{N,plural,one{{N} ᎤᏕ. ᏥᎨᏒ}other{{N} ᎤᏕ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎤᏕ.}other{ᎾᎿ {N} ᎤᏕ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ᎡᏘ ᏥᎨᏒ','0':'ᎯᎠ ᏧᏕᏘᏴᏒᏘ','1':'ᎡᏘᏴᎢ'},
      PAST:'{N,plural,one{{N} ᎤᏕ. ᏥᎨᏒ}other{{N} ᎤᏕ. ᏥᎨᏒ}}',
      FUTURE:'{N,plural,one{ᎾᎿ {N} ᎤᏕ.}other{ᎾᎿ {N} ᎤᏕ.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_cs =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'včera','-2':'předevčírem','0':'dnes','1':'zítra','2':'pozítří'},
      PAST:'{N,plural,few{před {N} dny}many{před {N} dne}one{před {N} dnem}other{před {N} dny}}',
      FUTURE:'{N,plural,few{za {N} dny}many{za {N} dne}one{za {N} den}other{za {N} dní}}',
    },
    SHORT:{
      RELATIVE:{'-1':'včera','-2':'předevčírem','0':'dnes','1':'zítra','2':'pozítří'},
      PAST:'{N,plural,few{před {N} dny}many{před {N} dne}one{před {N} dnem}other{před {N} dny}}',
      FUTURE:'{N,plural,few{za {N} dny}many{za {N} dne}one{za {N} den}other{za {N} dní}}',
    },
    NARROW:{
      RELATIVE:{'-1':'včera','-2':'předevčírem','0':'dnes','1':'zítra','2':'pozítří'},
      PAST:'{N,plural,few{před {N} dny}many{před {N} dne}one{před {N} dnem}other{před {N} dny}}',
      FUTURE:'{N,plural,few{za {N} dny}many{za {N} dne}one{za {N} den}other{za {N} dní}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'tuto hodinu'},
      PAST:'{N,plural,few{před {N} hodinami}many{před {N} hodiny}one{před {N} hodinou}other{před {N} hodinami}}',
      FUTURE:'{N,plural,few{za {N} hodiny}many{za {N} hodiny}one{za {N} hodinu}other{za {N} hodin}}',
    },
    SHORT:{
      RELATIVE:{'0':'tuto hodinu'},
      PAST:'{N,plural,few{před {N} h}many{před {N} h}one{před {N} h}other{před {N} h}}',
      FUTURE:'{N,plural,few{za {N} h}many{za {N} h}one{za {N} h}other{za {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'tuto hodinu'},
      PAST:'{N,plural,few{před {N} h}many{před {N} h}one{před {N} h}other{před {N} h}}',
      FUTURE:'{N,plural,few{za {N} h}many{za {N} h}one{za {N} h}other{za {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'tuto minutu'},
      PAST:'{N,plural,few{před {N} minutami}many{před {N} minuty}one{před {N} minutou}other{před {N} minutami}}',
      FUTURE:'{N,plural,few{za {N} minuty}many{za {N} minuty}one{za {N} minutu}other{za {N} minut}}',
    },
    SHORT:{
      RELATIVE:{'0':'tuto minutu'},
      PAST:'{N,plural,few{před {N} min}many{před {N} min}one{před {N} min}other{před {N} min}}',
      FUTURE:'{N,plural,few{za {N} min}many{za {N} min}one{za {N} min}other{za {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'tuto minutu'},
      PAST:'{N,plural,few{před {N} min}many{před {N} min}one{před {N} min}other{před {N} min}}',
      FUTURE:'{N,plural,few{za {N} min}many{za {N} min}one{za {N} min}other{za {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'minulý měsíc','0':'tento měsíc','1':'příští měsíc'},
      PAST:'{N,plural,few{před {N} měsíci}many{před {N} měsíce}one{před {N} měsícem}other{před {N} měsíci}}',
      FUTURE:'{N,plural,few{za {N} měsíce}many{za {N} měsíce}one{za {N} měsíc}other{za {N} měsíců}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minulý měs.','0':'tento měs.','1':'příští měs.'},
      PAST:'{N,plural,few{před {N} měs.}many{před {N} měs.}one{před {N} měs.}other{před {N} měs.}}',
      FUTURE:'{N,plural,few{za {N} měs.}many{za {N} měs.}one{za {N} měs.}other{za {N} měs.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minulý měs.','0':'tento měs.','1':'příští měs.'},
      PAST:'{N,plural,few{před {N} měs.}many{před {N} měs.}one{před {N} měs.}other{před {N} měs.}}',
      FUTURE:'{N,plural,few{za {N} měs.}many{za {N} měs.}one{za {N} měs.}other{za {N} měs.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'minulé čtvrtletí','0':'toto čtvrtletí','1':'příští čtvrtletí'},
      PAST:'{N,plural,few{před {N} čtvrtletími}many{před {N} čtvrtletí}one{před {N} čtvrtletím}other{před {N} čtvrtletími}}',
      FUTURE:'{N,plural,few{za {N} čtvrtletí}many{za {N} čtvrtletí}one{za {N} čtvrtletí}other{za {N} čtvrtletí}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minulé čtvrtletí','0':'toto čtvrtletí','1':'příští čtvrtletí'},
      PAST:'{N,plural,few{-{N} Q}many{-{N} Q}one{-{N} Q}other{-{N} Q}}',
      FUTURE:'{N,plural,few{+{N} Q}many{+{N} Q}one{+{N} Q}other{+{N} Q}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minulé čtvrtletí','0':'toto čtvrtletí','1':'příští čtvrtletí'},
      PAST:'{N,plural,few{-{N} Q}many{-{N} Q}one{-{N} Q}other{-{N} Q}}',
      FUTURE:'{N,plural,few{+{N} Q}many{+{N} Q}one{+{N} Q}other{+{N} Q}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nyní'},
      PAST:'{N,plural,few{před {N} sekundami}many{před {N} sekundy}one{před {N} sekundou}other{před {N} sekundami}}',
      FUTURE:'{N,plural,few{za {N} sekundy}many{za {N} sekundy}one{za {N} sekundu}other{za {N} sekund}}',
    },
    SHORT:{
      RELATIVE:{'0':'nyní'},
      PAST:'{N,plural,few{před {N} s}many{před {N} s}one{před {N} s}other{před {N} s}}',
      FUTURE:'{N,plural,few{za {N} s}many{za {N} s}one{za {N} s}other{za {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'nyní'},
      PAST:'{N,plural,few{před {N} s}many{před {N} s}one{před {N} s}other{před {N} s}}',
      FUTURE:'{N,plural,few{za {N} s}many{za {N} s}one{za {N} s}other{za {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'minulý týden','0':'tento týden','1':'příští týden'},
      PAST:'{N,plural,few{před {N} týdny}many{před {N} týdne}one{před {N} týdnem}other{před {N} týdny}}',
      FUTURE:'{N,plural,few{za {N} týdny}many{za {N} týdne}one{za {N} týden}other{za {N} týdnů}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minulý týd.','0':'tento týd.','1':'příští týd.'},
      PAST:'{N,plural,few{před {N} týd.}many{před {N} týd.}one{před {N} týd.}other{před {N} týd.}}',
      FUTURE:'{N,plural,few{za {N} týd.}many{za {N} týd.}one{za {N} týd.}other{za {N} týd.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minulý týd.','0':'tento týd.','1':'příští týd.'},
      PAST:'{N,plural,few{před {N} týd.}many{před {N} týd.}one{před {N} týd.}other{před {N} týd.}}',
      FUTURE:'{N,plural,few{za {N} týd.}many{za {N} týd.}one{za {N} týd.}other{za {N} týd.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'minulý rok','0':'tento rok','1':'příští rok'},
      PAST:'{N,plural,few{před {N} lety}many{před {N} roku}one{před {N} rokem}other{před {N} lety}}',
      FUTURE:'{N,plural,few{za {N} roky}many{za {N} roku}one{za {N} rok}other{za {N} let}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minulý rok','0':'tento rok','1':'příští rok'},
      PAST:'{N,plural,few{před {N} r.}many{před {N} r.}one{před {N} r.}other{před {N} l.}}',
      FUTURE:'{N,plural,few{za {N} r.}many{za {N} r.}one{za {N} r.}other{za {N} l.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minulý rok','0':'tento rok','1':'příští rok'},
      PAST:'{N,plural,few{před {N} r.}many{před {N} r.}one{před {N} r.}other{před {N} l.}}',
      FUTURE:'{N,plural,few{za {N} r.}many{za {N} r.}one{za {N} r.}other{za {N} l.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_cy =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ddoe','-2':'echdoe','0':'heddiw','1':'yfory','2':'drennydd'},
      PAST:'{N,plural,few{{N} diwrnod yn ôl}many{{N} diwrnod yn ôl}one{{N} diwrnod yn ôl}other{{N} diwrnod yn ôl}two{{N} ddiwrnod yn ôl}zero{{N} diwrnod yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} diwrnod}many{ymhen {N} diwrnod}one{ymhen diwrnod}other{ymhen {N} diwrnod}two{ymhen deuddydd}zero{ymhen {N} diwrnod}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ddoe','-2':'echdoe','0':'heddiw','1':'yfory','2':'drennydd'},
      PAST:'{N,plural,few{{N} diwrnod yn ôl}many{{N} diwrnod yn ôl}one{{N} diwrnod yn ôl}other{{N} diwrnod yn ôl}two{{N} ddiwrnod yn ôl}zero{{N} diwrnod yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} diwrnod}many{ymhen {N} diwrnod}one{ymhen diwrnod}other{ymhen {N} diwrnod}two{ymhen deuddydd}zero{ymhen {N} diwrnod}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ddoe','-2':'echdoe','0':'heddiw','1':'yfory','2':'drennydd'},
      PAST:'{N,plural,few{{N} diwrnod yn ôl}many{{N} diwrnod yn ôl}one{{N} diwrnod yn ôl}other{{N} diwrnod yn ôl}two{{N} ddiwrnod yn ôl}zero{{N} diwrnod yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} diwrnod}many{ymhen {N} diwrnod}one{ymhen {N} diwrnod}other{ymhen {N} diwrnod}two{ymhen {N} diwrnod}zero{ymhen {N} diwrnod}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'yr awr hon'},
      PAST:'{N,plural,few{{N} awr yn ôl}many{{N} awr yn ôl}one{{N} awr yn ôl}other{{N} awr yn ôl}two{{N} awr yn ôl}zero{{N} awr yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} awr}many{ymhen {N} awr}one{ymhen awr}other{ymhen {N} awr}two{ymhen {N} awr}zero{ymhen {N} awr}}',
    },
    SHORT:{
      RELATIVE:{'0':'yr awr hon'},
      PAST:'{N,plural,few{{N} awr yn ôl}many{{N} awr yn ôl}one{awr yn ôl}other{{N} awr yn ôl}two{{N} awr yn ôl}zero{{N} awr yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} awr}many{ymhen {N} awr}one{ymhen awr}other{ymhen {N} awr}two{ymhen {N} awr}zero{ymhen {N} awr}}',
    },
    NARROW:{
      RELATIVE:{'0':'yr awr hon'},
      PAST:'{N,plural,few{{N} awr yn ôl}many{{N} awr yn ôl}one{{N} awr yn ôl}other{{N} awr yn ôl}two{{N} awr yn ôl}zero{{N} awr yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} awr}many{ymhen {N} awr}one{ymhen {N} awr}other{ymhen {N} awr}two{ymhen {N} awr}zero{ymhen {N} awr}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'y funud hon'},
      PAST:'{N,plural,few{{N} munud yn ôl}many{{N} munud yn ôl}one{{N} munud yn ôl}other{{N} munud yn ôl}two{{N} munud yn ôl}zero{{N} munud yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} munud}many{ymhen {N} munud}one{ymhen {N} munud}other{ymhen {N} munud}two{ymhen {N} munud}zero{ymhen {N} munud}}',
    },
    SHORT:{
      RELATIVE:{'0':'y funud hon'},
      PAST:'{N,plural,few{{N} munud yn ôl}many{{N} munud yn ôl}one{{N} munud yn ôl}other{{N} munud yn ôl}two{{N} fun. yn ôl}zero{{N} munud yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} munud}many{ymhen {N} munud}one{ymhen {N} mun.}other{ymhen {N} munud}two{ymhen {N} fun.}zero{ymhen {N} munud}}',
    },
    NARROW:{
      RELATIVE:{'0':'y funud hon'},
      PAST:'{N,plural,few{{N} mun. yn ôl}many{{N} mun. yn ôl}one{{N} mun. yn ôl}other{{N} mun. yn ôl}two{{N} mun. yn ôl}zero{{N} mun. yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} mun.}many{ymhen {N} mun.}one{ymhen {N} mun.}other{ymhen {N} mun.}two{ymhen {N} mun.}zero{ymhen {N} mun.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'mis diwethaf','0':'y mis hwn','1':'mis nesaf'},
      PAST:'{N,plural,few{{N} mis yn ôl}many{{N} mis yn ôl}one{{N} mis yn ôl}other{{N} mis yn ôl}two{{N} fis yn ôl}zero{{N} mis yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} mis}many{ymhen {N} mis}one{ymhen mis}other{ymhen {N} mis}two{ymhen deufis}zero{ymhen {N} mis}}',
    },
    SHORT:{
      RELATIVE:{'-1':'mis diwethaf','0':'y mis hwn','1':'mis nesaf'},
      PAST:'{N,plural,few{{N} mis yn ôl}many{{N} mis yn ôl}one{{N} mis yn ôl}other{{N} mis yn ôl}two{deufis yn ôl}zero{{N} mis yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} mis}many{ymhen {N} mis}one{ymhen mis}other{ymhen {N} mis}two{ymhen deufis}zero{ymhen {N} mis}}',
    },
    NARROW:{
      RELATIVE:{'-1':'mis diwethaf','0':'y mis hwn','1':'mis nesaf'},
      PAST:'{N,plural,few{{N} mis yn ôl}many{{N} mis yn ôl}one{{N} mis yn ôl}other{{N} mis yn ôl}two{{N} fis yn ôl}zero{{N} mis yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} mis}many{ymhen {N} mis}one{ymhen mis}other{ymhen {N} mis}two{ymhen deufis}zero{ymhen {N} mis}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'chwarter olaf','0':'chwarter hwn','1':'chwarter nesaf'},
      PAST:'{N,plural,few{{N} chwarter yn ôl}many{{N} chwarter yn ôl}one{{N} chwarter yn ôl}other{{N} o chwarteri yn ôl}two{{N} chwarter yn ôl}zero{{N} o chwarteri yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} chwarter}many{ymhen {N} chwarter}one{ymhen {N} chwarter}other{ymhen {N} chwarter}two{ymhen {N} chwarter}zero{ymhen {N} chwarter}}',
    },
    SHORT:{
      RELATIVE:{'-1':'chwarter olaf','0':'chwarter hwn','1':'chwarter nesaf'},
      PAST:'{N,plural,few{{N} chwarter yn ôl}many{{N} chwarter yn ôl}one{{N} chwarter yn ôl}other{{N} o chwarteri yn ôl}two{{N} chwarter yn ôl}zero{{N} o chwarteri yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} chwarter}many{ymhen {N} chwarter}one{ymhen {N} chwarter}other{ymhen {N} chwarter}two{ymhen {N} chwarter}zero{ymhen {N} chwarter}}',
    },
    NARROW:{
      RELATIVE:{'-1':'chwarter olaf','0':'chwarter hwn','1':'chwarter nesaf'},
      PAST:'{N,plural,few{{N} chwarter yn ôl}many{{N} chwarter yn ôl}one{{N} chwarter yn ôl}other{{N} o chwarteri yn ôl}two{{N} chwarter yn ôl}zero{{N} o chwarteri yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} chwarter}many{ymhen {N} chwarter}one{ymhen {N} chwarter}other{ymhen {N} chwarter}two{ymhen {N} chwarter}zero{ymhen {N} chwarter}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nawr'},
      PAST:'{N,plural,few{{N} eiliad yn ôl}many{{N} eiliad yn ôl}one{{N} eiliad yn ôl}other{{N} eiliad yn ôl}two{{N} eiliad yn ôl}zero{{N} eiliad yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} eiliad}many{ymhen {N} eiliad}one{ymhen {N} eiliad}other{ymhen {N} eiliad}two{ymhen {N} eiliad}zero{ymhen {N} eiliad}}',
    },
    SHORT:{
      RELATIVE:{'0':'nawr'},
      PAST:'{N,plural,few{{N} eiliad yn ôl}many{{N} eiliad yn ôl}one{{N} eiliad yn ôl}other{{N} eiliad yn ôl}two{{N} eiliad yn ôl}zero{{N} eiliad yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} eiliad}many{ymhen {N} eiliad}one{ymhen {N} eiliad}other{ymhen {N} eiliad}two{ymhen {N} eiliad}zero{ymhen {N} eiliad}}',
    },
    NARROW:{
      RELATIVE:{'0':'nawr'},
      PAST:'{N,plural,few{{N} eiliad yn ôl}many{{N} eiliad yn ôl}one{{N} eiliad yn ôl}other{{N} eiliad yn ôl}two{{N} eiliad yn ôl}zero{{N} eiliad yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} eiliad}many{ymhen {N} eiliad}one{ymhen {N} eiliad}other{ymhen {N} eiliad}two{ymhen {N} eiliad}zero{ymhen {N} eiliad}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'wythnos ddiwethaf','0':'yr wythnos hon','1':'wythnos nesaf'},
      PAST:'{N,plural,few{{N} wythnos yn ôl}many{{N} wythnos yn ôl}one{{N} wythnos yn ôl}other{{N} wythnos yn ôl}two{{N} wythnos yn ôl}zero{{N} wythnos yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} wythnos}many{ymhen {N} wythnos}one{ymhen wythnos}other{ymhen {N} wythnos}two{ymhen pythefnos}zero{ymhen {N} wythnos}}',
    },
    SHORT:{
      RELATIVE:{'-1':'wythnos ddiwethaf','0':'yr wythnos hon','1':'wythnos nesaf'},
      PAST:'{N,plural,few{{N} wythnos yn ôl}many{{N} wythnos yn ôl}one{{N} wythnos yn ôl}other{{N} wythnos yn ôl}two{pythefnos yn ôl}zero{{N} wythnos yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} wythnos}many{ymhen {N} wythnos}one{ymhen wythnos}other{ymhen {N} wythnos}two{ymhen pythefnos}zero{ymhen {N} wythnos}}',
    },
    NARROW:{
      RELATIVE:{'-1':'wythnos ddiwethaf','0':'yr wythnos hon','1':'wythnos nesaf'},
      PAST:'{N,plural,few{{N} wythnos yn ôl}many{{N} wythnos yn ôl}one{{N} wythnos yn ôl}other{{N} wythnos yn ôl}two{pythefnos yn ôl}zero{{N} wythnos yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} wythnos}many{ymhen {N} wythnos}one{ymhen {N} wythnos}other{ymhen {N} wythnos}two{ymhen {N} wythnos}zero{ymhen {N} wythnos}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'llynedd','0':'eleni','1':'blwyddyn nesaf'},
      PAST:'{N,plural,few{{N} blynedd yn ôl}many{{N} blynedd yn ôl}one{blwyddyn yn ôl}other{{N} o flynyddoedd yn ôl}two{{N} flynedd yn ôl}zero{{N} o flynyddoedd yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} blynedd}many{ymhen {N} blynedd}one{ymhen blwyddyn}other{ymhen {N} mlynedd}two{ymhen {N} flynedd}zero{ymhen {N} mlynedd}}',
    },
    SHORT:{
      RELATIVE:{'-1':'llynedd','0':'eleni','1':'blwyddyn nesaf'},
      PAST:'{N,plural,few{{N} blynedd yn ôl}many{{N} blynedd yn ôl}one{blwyddyn yn ôl}other{{N} o flynyddoedd yn ôl}two{{N} flynedd yn ôl}zero{{N} o flynyddoedd yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} blynedd}many{ymhen {N} blynedd}one{ymhen blwyddyn}other{ymhen {N} mlynedd}two{ymhen {N} flynedd}zero{ymhen {N} mlynedd}}',
    },
    NARROW:{
      RELATIVE:{'-1':'llynedd','0':'eleni','1':'blwyddyn nesaf'},
      PAST:'{N,plural,few{{N} blynedd yn ôl}many{{N} blynedd yn ôl}one{blwyddyn yn ôl}other{{N} o flynyddoedd yn ôl}two{{N} flynedd yn ôl}zero{{N} o flynyddoedd yn ôl}}',
      FUTURE:'{N,plural,few{ymhen {N} blynedd}many{ymhen {N} blynedd}one{ymhen blwyddyn}other{ymhen {N} mlynedd}two{ymhen {N} flynedd}zero{ymhen {N} mlynedd}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_da =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'i går','-2':'i forgårs','0':'i dag','1':'i morgen','2':'i overmorgen'},
      PAST:'{N,plural,one{for {N} dag siden}other{for {N} dage siden}}',
      FUTURE:'{N,plural,one{om {N} dag}other{om {N} dage}}',
    },
    SHORT:{
      RELATIVE:{'-1':'i går','-2':'i forgårs','0':'i dag','1':'i morgen','2':'i overmorgen'},
      PAST:'{N,plural,one{for {N} dag siden}other{for {N} dage siden}}',
      FUTURE:'{N,plural,one{om {N} dag}other{om {N} dage}}',
    },
    NARROW:{
      RELATIVE:{'-1':'i går','-2':'i forgårs','0':'i dag','1':'i morgen','2':'i overmorgen'},
      PAST:'{N,plural,one{for {N} dag siden}other{for {N} dage siden}}',
      FUTURE:'{N,plural,one{om {N} dag}other{om {N} dage}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'i den kommende time'},
      PAST:'{N,plural,one{for {N} time siden}other{for {N} timer siden}}',
      FUTURE:'{N,plural,one{om {N} time}other{om {N} timer}}',
    },
    SHORT:{
      RELATIVE:{'0':'i den kommende time'},
      PAST:'{N,plural,one{for {N} time siden}other{for {N} timer siden}}',
      FUTURE:'{N,plural,one{om {N} time}other{om {N} timer}}',
    },
    NARROW:{
      RELATIVE:{'0':'i den kommende time'},
      PAST:'{N,plural,one{for {N} time siden}other{for {N} timer siden}}',
      FUTURE:'{N,plural,one{om {N} time}other{om {N} timer}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'i det kommende minut'},
      PAST:'{N,plural,one{for {N} minut siden}other{for {N} minutter siden}}',
      FUTURE:'{N,plural,one{om {N} minut}other{om {N} minutter}}',
    },
    SHORT:{
      RELATIVE:{'0':'i det kommende minut'},
      PAST:'{N,plural,one{for {N} min. siden}other{for {N} min. siden}}',
      FUTURE:'{N,plural,one{om {N} min.}other{om {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'i det kommende minut'},
      PAST:'{N,plural,one{for {N} min. siden}other{for {N} min. siden}}',
      FUTURE:'{N,plural,one{om {N} min.}other{om {N} min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'sidste måned','0':'denne måned','1':'næste måned'},
      PAST:'{N,plural,one{for {N} måned siden}other{for {N} måneder siden}}',
      FUTURE:'{N,plural,one{om {N} måned}other{om {N} måneder}}',
    },
    SHORT:{
      RELATIVE:{'-1':'sidste md.','0':'denne md.','1':'næste md.'},
      PAST:'{N,plural,one{for {N} md. siden}other{for {N} mdr. siden}}',
      FUTURE:'{N,plural,one{om {N} md.}other{om {N} mdr.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'sidste md.','0':'denne md.','1':'næste md.'},
      PAST:'{N,plural,one{for {N} md. siden}other{for {N} mdr. siden}}',
      FUTURE:'{N,plural,one{om {N} md.}other{om {N} mdr.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'sidste kvartal','0':'dette kvartal','1':'næste kvartal'},
      PAST:'{N,plural,one{for {N} kvartal siden}other{for {N} kvartaler siden}}',
      FUTURE:'{N,plural,one{om {N} kvartal}other{om {N} kvartaler}}',
    },
    SHORT:{
      RELATIVE:{'-1':'sidste kvt.','0':'dette kvt.','1':'næste kvt.'},
      PAST:'{N,plural,one{for {N} kvt. siden}other{for {N} kvt. siden}}',
      FUTURE:'{N,plural,one{om {N} kvt.}other{om {N} kvt.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'sidste kvt.','0':'dette kvt.','1':'næste kvt.'},
      PAST:'{N,plural,one{for {N} kvt. siden}other{for {N} kvt. siden}}',
      FUTURE:'{N,plural,one{om {N} kvt.}other{om {N} kvt.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nu'},
      PAST:'{N,plural,one{for {N} sekund siden}other{for {N} sekunder siden}}',
      FUTURE:'{N,plural,one{om {N} sekund}other{om {N} sekunder}}',
    },
    SHORT:{
      RELATIVE:{'0':'nu'},
      PAST:'{N,plural,one{for {N} sek. siden}other{for {N} sek. siden}}',
      FUTURE:'{N,plural,one{om {N} sek.}other{om {N} sek.}}',
    },
    NARROW:{
      RELATIVE:{'0':'nu'},
      PAST:'{N,plural,one{for {N} sek. siden}other{for {N} sek. siden}}',
      FUTURE:'{N,plural,one{om {N} sek.}other{om {N} sek.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'sidste uge','0':'denne uge','1':'næste uge'},
      PAST:'{N,plural,one{for {N} uge siden}other{for {N} uger siden}}',
      FUTURE:'{N,plural,one{om {N} uge}other{om {N} uger}}',
    },
    SHORT:{
      RELATIVE:{'-1':'sidste uge','0':'denne uge','1':'næste uge'},
      PAST:'{N,plural,one{for {N} uge siden}other{for {N} uger siden}}',
      FUTURE:'{N,plural,one{om {N} uge}other{om {N} uger}}',
    },
    NARROW:{
      RELATIVE:{'-1':'sidste uge','0':'denne uge','1':'næste uge'},
      PAST:'{N,plural,one{for {N} uge siden}other{for {N} uger siden}}',
      FUTURE:'{N,plural,one{om {N} uge}other{om {N} uger}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'sidste år','0':'i år','1':'næste år'},
      PAST:'{N,plural,one{for {N} år siden}other{for {N} år siden}}',
      FUTURE:'{N,plural,one{om {N} år}other{om {N} år}}',
    },
    SHORT:{
      RELATIVE:{'-1':'sidste år','0':'i år','1':'næste år'},
      PAST:'{N,plural,one{for {N} år siden}other{for {N} år siden}}',
      FUTURE:'{N,plural,one{om {N} år}other{om {N} år}}',
    },
    NARROW:{
      RELATIVE:{'-1':'sidste år','0':'i år','1':'næste år'},
      PAST:'{N,plural,one{for {N} år siden}other{for {N} år siden}}',
      FUTURE:'{N,plural,one{om {N} år}other{om {N} år}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_de =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'gestern','-2':'vorgestern','0':'heute','1':'morgen','2':'übermorgen'},
      PAST:'{N,plural,one{vor {N} Tag}other{vor {N} Tagen}}',
      FUTURE:'{N,plural,one{in {N} Tag}other{in {N} Tagen}}',
    },
    SHORT:{
      RELATIVE:{'-1':'gestern','-2':'vorgestern','0':'heute','1':'morgen','2':'übermorgen'},
      PAST:'{N,plural,one{vor {N} Tag}other{vor {N} Tagen}}',
      FUTURE:'{N,plural,one{in {N} Tag}other{in {N} Tagen}}',
    },
    NARROW:{
      RELATIVE:{'-1':'gestern','-2':'vorgestern','0':'heute','1':'morgen','2':'übermorgen'},
      PAST:'{N,plural,one{vor {N} Tag}other{vor {N} Tagen}}',
      FUTURE:'{N,plural,one{in {N} Tag}other{in {N} Tagen}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'in dieser Stunde'},
      PAST:'{N,plural,one{vor {N} Stunde}other{vor {N} Stunden}}',
      FUTURE:'{N,plural,one{in {N} Stunde}other{in {N} Stunden}}',
    },
    SHORT:{
      RELATIVE:{'0':'in dieser Stunde'},
      PAST:'{N,plural,one{vor {N} Std.}other{vor {N} Std.}}',
      FUTURE:'{N,plural,one{in {N} Std.}other{in {N} Std.}}',
    },
    NARROW:{
      RELATIVE:{'0':'in dieser Stunde'},
      PAST:'{N,plural,one{vor {N} Std.}other{vor {N} Std.}}',
      FUTURE:'{N,plural,one{in {N} Std.}other{in {N} Std.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'in dieser Minute'},
      PAST:'{N,plural,one{vor {N} Minute}other{vor {N} Minuten}}',
      FUTURE:'{N,plural,one{in {N} Minute}other{in {N} Minuten}}',
    },
    SHORT:{
      RELATIVE:{'0':'in dieser Minute'},
      PAST:'{N,plural,one{vor {N} Min.}other{vor {N} Min.}}',
      FUTURE:'{N,plural,one{in {N} Min.}other{in {N} Min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'in dieser Minute'},
      PAST:'{N,plural,one{vor {N} m}other{vor {N} m}}',
      FUTURE:'{N,plural,one{in {N} m}other{in {N} m}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'letzten Monat','0':'diesen Monat','1':'nächsten Monat'},
      PAST:'{N,plural,one{vor {N} Monat}other{vor {N} Monaten}}',
      FUTURE:'{N,plural,one{in {N} Monat}other{in {N} Monaten}}',
    },
    SHORT:{
      RELATIVE:{'-1':'letzten Monat','0':'diesen Monat','1':'nächsten Monat'},
      PAST:'{N,plural,one{vor {N} Monat}other{vor {N} Monaten}}',
      FUTURE:'{N,plural,one{in {N} Monat}other{in {N} Monaten}}',
    },
    NARROW:{
      RELATIVE:{'-1':'letzten Monat','0':'diesen Monat','1':'nächsten Monat'},
      PAST:'{N,plural,one{vor {N} Monat}other{vor {N} Monaten}}',
      FUTURE:'{N,plural,one{in {N} Monat}other{in {N} Monaten}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'letztes Quartal','0':'dieses Quartal','1':'nächstes Quartal'},
      PAST:'{N,plural,one{vor {N} Quartal}other{vor {N} Quartalen}}',
      FUTURE:'{N,plural,one{in {N} Quartal}other{in {N} Quartalen}}',
    },
    SHORT:{
      RELATIVE:{'-1':'letztes Quartal','0':'dieses Quartal','1':'nächstes Quartal'},
      PAST:'{N,plural,one{vor {N} Quart.}other{vor {N} Quart.}}',
      FUTURE:'{N,plural,one{in {N} Quart.}other{in {N} Quart.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'letztes Quartal','0':'dieses Quartal','1':'nächstes Quartal'},
      PAST:'{N,plural,one{vor {N} Q}other{vor {N} Q}}',
      FUTURE:'{N,plural,one{in {N} Q}other{in {N} Q}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'jetzt'},
      PAST:'{N,plural,one{vor {N} Sekunde}other{vor {N} Sekunden}}',
      FUTURE:'{N,plural,one{in {N} Sekunde}other{in {N} Sekunden}}',
    },
    SHORT:{
      RELATIVE:{'0':'jetzt'},
      PAST:'{N,plural,one{vor {N} Sek.}other{vor {N} Sek.}}',
      FUTURE:'{N,plural,one{in {N} Sek.}other{in {N} Sek.}}',
    },
    NARROW:{
      RELATIVE:{'0':'jetzt'},
      PAST:'{N,plural,one{vor {N} s}other{vor {N} s}}',
      FUTURE:'{N,plural,one{in {N} s}other{in {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'letzte Woche','0':'diese Woche','1':'nächste Woche'},
      PAST:'{N,plural,one{vor {N} Woche}other{vor {N} Wochen}}',
      FUTURE:'{N,plural,one{in {N} Woche}other{in {N} Wochen}}',
    },
    SHORT:{
      RELATIVE:{'-1':'letzte Woche','0':'diese Woche','1':'nächste Woche'},
      PAST:'{N,plural,one{vor {N} Woche}other{vor {N} Wochen}}',
      FUTURE:'{N,plural,one{in {N} Woche}other{in {N} Wochen}}',
    },
    NARROW:{
      RELATIVE:{'-1':'letzte Woche','0':'diese Woche','1':'nächste Woche'},
      PAST:'{N,plural,one{vor {N} Wo.}other{vor {N} Wo.}}',
      FUTURE:'{N,plural,one{in {N} Wo.}other{in {N} Wo.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'letztes Jahr','0':'dieses Jahr','1':'nächstes Jahr'},
      PAST:'{N,plural,one{vor {N} Jahr}other{vor {N} Jahren}}',
      FUTURE:'{N,plural,one{in {N} Jahr}other{in {N} Jahren}}',
    },
    SHORT:{
      RELATIVE:{'-1':'letztes Jahr','0':'dieses Jahr','1':'nächstes Jahr'},
      PAST:'{N,plural,one{vor {N} Jahr}other{vor {N} Jahren}}',
      FUTURE:'{N,plural,one{in {N} Jahr}other{in {N} Jahren}}',
    },
    NARROW:{
      RELATIVE:{'-1':'letztes Jahr','0':'dieses Jahr','1':'nächstes Jahr'},
      PAST:'{N,plural,one{vor {N} Jahr}other{vor {N} Jahren}}',
      FUTURE:'{N,plural,one{in {N} Jahr}other{in {N} Jahren}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_de_AT = exports.RelativeDateTimeSymbols_de;

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_de_CH = exports.RelativeDateTimeSymbols_de;

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_el =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'χθες','-2':'προχθές','0':'σήμερα','1':'αύριο','2':'μεθαύριο'},
      PAST:'{N,plural,one{πριν από {N} ημέρα}other{πριν από {N} ημέρες}}',
      FUTURE:'{N,plural,one{σε {N} ημέρα}other{σε {N} ημέρες}}',
    },
    SHORT:{
      RELATIVE:{'-1':'χθες','0':'σήμερα','1':'αύριο'},
      PAST:'{N,plural,one{πριν από {N} ημ.}other{πριν από {N} ημ.}}',
      FUTURE:'{N,plural,one{σε {N} ημ.}other{σε {N} ημ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'χθες','0':'σήμερα','1':'αύριο'},
      PAST:'{N,plural,one{{N} ημ. πριν}other{{N} ημ. πριν}}',
      FUTURE:'{N,plural,one{σε {N} ημ.}other{σε {N} ημ.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'τρέχουσα ώρα'},
      PAST:'{N,plural,one{πριν από {N} ώρα}other{πριν από {N} ώρες}}',
      FUTURE:'{N,plural,one{σε {N} ώρα}other{σε {N} ώρες}}',
    },
    SHORT:{
      RELATIVE:{'0':'τρέχουσα ώρα'},
      PAST:'{N,plural,one{πριν από {N} ώ.}other{πριν από {N} ώ.}}',
      FUTURE:'{N,plural,one{σε {N} ώ.}other{σε {N} ώ.}}',
    },
    NARROW:{
      RELATIVE:{'0':'τρέχουσα ώρα'},
      PAST:'{N,plural,one{{N} ώ. πριν}other{{N} ώ. πριν}}',
      FUTURE:'{N,plural,one{σε {N} ώ.}other{σε {N} ώ.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'τρέχον λεπτό'},
      PAST:'{N,plural,one{πριν από {N} λεπτό}other{πριν από {N} λεπτά}}',
      FUTURE:'{N,plural,one{σε {N} λεπτό}other{σε {N} λεπτά}}',
    },
    SHORT:{
      RELATIVE:{'0':'τρέχον λεπτό'},
      PAST:'{N,plural,one{πριν από {N} λεπ.}other{πριν από {N} λεπ.}}',
      FUTURE:'{N,plural,one{σε {N} λεπ.}other{σε {N} λεπ.}}',
    },
    NARROW:{
      RELATIVE:{'0':'τρέχον λεπτό'},
      PAST:'{N,plural,one{{N} λ. πριν}other{{N} λ. πριν}}',
      FUTURE:'{N,plural,one{σε {N} λ.}other{σε {N} λ.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'προηγούμενος μήνας','0':'τρέχων μήνας','1':'επόμενος μήνας'},
      PAST:'{N,plural,one{πριν από {N} μήνα}other{πριν από {N} μήνες}}',
      FUTURE:'{N,plural,one{σε {N} μήνα}other{σε {N} μήνες}}',
    },
    SHORT:{
      RELATIVE:{'-1':'προηγούμενος μήνας','0':'τρέχων μήνας','1':'επόμενος μήνας'},
      PAST:'{N,plural,one{πριν από {N} μήνα}other{πριν από {N} μήνες}}',
      FUTURE:'{N,plural,one{σε {N} μήνα}other{σε {N} μήνες}}',
    },
    NARROW:{
      RELATIVE:{'-1':'προηγούμενος μήνας','0':'τρέχων μήνας','1':'επόμενος μήνας'},
      PAST:'{N,plural,one{{N} μ. πριν}other{{N} μ. πριν}}',
      FUTURE:'{N,plural,one{σε {N} μ.}other{σε {N} μ.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'προηγούμενο τρίμηνο','0':'τρέχον τρίμηνο','1':'επόμενο τρίμηνο'},
      PAST:'{N,plural,one{πριν από {N} τρίμηνο}other{πριν από {N} τρίμηνα}}',
      FUTURE:'{N,plural,one{σε {N} τρίμηνο}other{σε {N} τρίμηνα}}',
    },
    SHORT:{
      RELATIVE:{'-1':'προηγ. τρίμ.','0':'τρέχον τρίμ.','1':'επόμ. τρίμ.'},
      PAST:'{N,plural,one{πριν από {N} τρίμ.}other{πριν από {N} τρίμ.}}',
      FUTURE:'{N,plural,one{σε {N} τρίμ.}other{σε {N} τρίμ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'προηγ. τρίμ.','0':'τρέχον τρίμ.','1':'επόμ. τρίμ.'},
      PAST:'{N,plural,one{{N} τρίμ. πριν}other{{N} τρίμ. πριν}}',
      FUTURE:'{N,plural,one{σε {N} τρίμ.}other{σε {N} τρίμ.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'τώρα'},
      PAST:'{N,plural,one{πριν από {N} δευτερόλεπτο}other{πριν από {N} δευτερόλεπτα}}',
      FUTURE:'{N,plural,one{σε {N} δευτερόλεπτο}other{σε {N} δευτερόλεπτα}}',
    },
    SHORT:{
      RELATIVE:{'0':'τώρα'},
      PAST:'{N,plural,one{πριν από {N} δευτ.}other{πριν από {N} δευτ.}}',
      FUTURE:'{N,plural,one{σε {N} δευτ.}other{σε {N} δευτ.}}',
    },
    NARROW:{
      RELATIVE:{'0':'τώρα'},
      PAST:'{N,plural,one{{N} δ. πριν}other{{N} δ. πριν}}',
      FUTURE:'{N,plural,one{σε {N} δ.}other{σε {N} δ.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'προηγούμενη εβδομάδα','0':'τρέχουσα εβδομάδα','1':'επόμενη εβδομάδα'},
      PAST:'{N,plural,one{πριν από {N} εβδομάδα}other{πριν από {N} εβδομάδες}}',
      FUTURE:'{N,plural,one{σε {N} εβδομάδα}other{σε {N} εβδομάδες}}',
    },
    SHORT:{
      RELATIVE:{'-1':'προηγούμενη εβδομάδα','0':'τρέχουσα εβδομάδα','1':'επόμενη εβδομάδα'},
      PAST:'{N,plural,one{πριν από {N} εβδ.}other{πριν από {N} εβδ.}}',
      FUTURE:'{N,plural,one{σε {N} εβδ.}other{σε {N} εβδ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'προηγούμενη εβδομάδα','0':'τρέχουσα εβδομάδα','1':'επόμενη εβδομάδα'},
      PAST:'{N,plural,one{{N} εβδ. πριν}other{{N} εβδ. πριν}}',
      FUTURE:'{N,plural,one{σε {N} εβδ.}other{σε {N} εβδ.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'πέρσι','0':'φέτος','1':'επόμενο έτος'},
      PAST:'{N,plural,one{πριν από {N} έτος}other{πριν από {N} έτη}}',
      FUTURE:'{N,plural,one{σε {N} έτος}other{σε {N} έτη}}',
    },
    SHORT:{
      RELATIVE:{'-1':'πέρσι','0':'φέτος','1':'επόμενο έτος'},
      PAST:'{N,plural,one{πριν από {N} έτος}other{πριν από {N} έτη}}',
      FUTURE:'{N,plural,one{σε {N} έτος}other{σε {N} έτη}}',
    },
    NARROW:{
      RELATIVE:{'-1':'πέρσι','0':'φέτος','1':'επόμενο έτος'},
      PAST:'{N,plural,one{{N} έτος πριν}other{{N} έτη πριν}}',
      FUTURE:'{N,plural,one{σε {N} έτος}other{σε {N} έτη}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_en =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    SHORT:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    NARROW:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hour ago}other{{N} hours ago}}',
      FUTURE:'{N,plural,one{in {N} hour}other{in {N} hours}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr. ago}other{{N} hr. ago}}',
      FUTURE:'{N,plural,one{in {N} hr.}other{in {N} hr.}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr. ago}other{{N} hr. ago}}',
      FUTURE:'{N,plural,one{in {N} hr.}other{in {N} hr.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} minute ago}other{{N} minutes ago}}',
      FUTURE:'{N,plural,one{in {N} minute}other{in {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min. ago}other{{N} min. ago}}',
      FUTURE:'{N,plural,one{in {N} min.}other{in {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min. ago}other{{N} min. ago}}',
      FUTURE:'{N,plural,one{in {N} min.}other{in {N} min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,one{{N} month ago}other{{N} months ago}}',
      FUTURE:'{N,plural,one{in {N} month}other{in {N} months}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo. ago}other{{N} mo. ago}}',
      FUTURE:'{N,plural,one{in {N} mo.}other{in {N} mo.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo. ago}other{{N} mo. ago}}',
      FUTURE:'{N,plural,one{in {N} mo.}other{in {N} mo.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,one{{N} quarter ago}other{{N} quarters ago}}',
      FUTURE:'{N,plural,one{in {N} quarter}other{in {N} quarters}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr. ago}other{{N} qtrs. ago}}',
      FUTURE:'{N,plural,one{in {N} qtr.}other{in {N} qtrs.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr. ago}other{{N} qtrs. ago}}',
      FUTURE:'{N,plural,one{in {N} qtr.}other{in {N} qtrs.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} second ago}other{{N} seconds ago}}',
      FUTURE:'{N,plural,one{in {N} second}other{in {N} seconds}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec. ago}other{{N} sec. ago}}',
      FUTURE:'{N,plural,one{in {N} sec.}other{in {N} sec.}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec. ago}other{{N} sec. ago}}',
      FUTURE:'{N,plural,one{in {N} sec.}other{in {N} sec.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,one{{N} week ago}other{{N} weeks ago}}',
      FUTURE:'{N,plural,one{in {N} week}other{in {N} weeks}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk. ago}other{{N} wk. ago}}',
      FUTURE:'{N,plural,one{in {N} wk.}other{in {N} wk.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk. ago}other{{N} wk. ago}}',
      FUTURE:'{N,plural,one{in {N} wk.}other{in {N} wk.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,one{{N} year ago}other{{N} years ago}}',
      FUTURE:'{N,plural,one{in {N} year}other{in {N} years}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr. ago}other{{N} yr. ago}}',
      FUTURE:'{N,plural,one{in {N} yr.}other{in {N} yr.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr. ago}other{{N} yr. ago}}',
      FUTURE:'{N,plural,one{in {N} yr.}other{in {N} yr.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_en_AU =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    SHORT:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    NARROW:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hour ago}other{{N} hours ago}}',
      FUTURE:'{N,plural,one{in {N} hour}other{in {N} hours}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hrs ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hrs}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hrs ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hrs}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} minute ago}other{{N} minutes ago}}',
      FUTURE:'{N,plural,one{in {N} minute}other{in {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min. ago}other{{N} mins ago}}',
      FUTURE:'{N,plural,one{in {N} min.}other{in {N} mins}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min. ago}other{{N} mins ago}}',
      FUTURE:'{N,plural,one{in {N} min.}other{in {N} mins}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,one{{N} month ago}other{{N} months ago}}',
      FUTURE:'{N,plural,one{in {N} month}other{in {N} months}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo. ago}other{{N} mo. ago}}',
      FUTURE:'{N,plural,one{in {N} mo.}other{in {N} mo.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo. ago}other{{N} mo. ago}}',
      FUTURE:'{N,plural,one{in {N} mo.}other{in {N} mo.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,one{{N} quarter ago}other{{N} quarters ago}}',
      FUTURE:'{N,plural,one{in {N} quarter}other{in {N} quarters}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtrs ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtrs}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{in {N} qtr ago}other{{N} qtrs ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtrs}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} second ago}other{{N} seconds ago}}',
      FUTURE:'{N,plural,one{in {N} second}other{in {N} seconds}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec. ago}other{{N} secs ago}}',
      FUTURE:'{N,plural,one{in {N} sec.}other{in {N} secs}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec. ago}other{{N} secs ago}}',
      FUTURE:'{N,plural,one{in {N} sec.}other{in {N} secs}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,one{{N} week ago}other{{N} weeks ago}}',
      FUTURE:'{N,plural,one{in {N} week}other{in {N} weeks}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wks ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wks}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wks ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wks}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,one{{N} year ago}other{{N} years ago}}',
      FUTURE:'{N,plural,one{in {N} year}other{in {N} years}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yrs ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yrs}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yrs ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yrs}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_en_CA =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    SHORT:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    NARROW:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hour ago}other{{N} hours ago}}',
      FUTURE:'{N,plural,one{in {N} hour}other{in {N} hours}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr. ago}other{{N} hrs. ago}}',
      FUTURE:'{N,plural,one{in {N} hr.}other{in {N} hrs.}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr. ago}other{{N} hrs. ago}}',
      FUTURE:'{N,plural,one{in {N} hr.}other{in {N} hrs.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} minute ago}other{{N} minutes ago}}',
      FUTURE:'{N,plural,one{in {N} minute}other{in {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min. ago}other{{N} mins. ago}}',
      FUTURE:'{N,plural,one{in {N} min.}other{in {N} mins.}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min. ago}other{{N} mins. ago}}',
      FUTURE:'{N,plural,one{in {N} min.}other{in {N} mins.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,one{{N} month ago}other{{N} months ago}}',
      FUTURE:'{N,plural,one{in {N} month}other{in {N} months}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo. ago}other{{N} mos. ago}}',
      FUTURE:'{N,plural,one{in {N} mo.}other{in {N} mos.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo. ago}other{{N} mos. ago}}',
      FUTURE:'{N,plural,one{in {N} mo.}other{in {N} mos.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,one{{N} quarter ago}other{{N} quarters ago}}',
      FUTURE:'{N,plural,one{in {N} quarter}other{in {N} quarters}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr. ago}other{{N} qtrs. ago}}',
      FUTURE:'{N,plural,one{in {N} qtr.}other{in {N} qtrs.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr. ago}other{{N} qtrs. ago}}',
      FUTURE:'{N,plural,one{in {N} qtr.}other{in {N} qtrs.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} second ago}other{{N} seconds ago}}',
      FUTURE:'{N,plural,one{in {N} second}other{in {N} seconds}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec. ago}other{{N} secs. ago}}',
      FUTURE:'{N,plural,one{in {N} sec.}other{in {N} secs.}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec. ago}other{{N} secs. ago}}',
      FUTURE:'{N,plural,one{in {N} sec.}other{in {N} secs.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,one{{N} week ago}other{{N} weeks ago}}',
      FUTURE:'{N,plural,one{in {N} week}other{in {N} weeks}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk. ago}other{{N} wks. ago}}',
      FUTURE:'{N,plural,one{in {N} wk.}other{in {N} wks.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk. ago}other{{N} wks. ago}}',
      FUTURE:'{N,plural,one{in {N} wk.}other{in {N} wks.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,one{{N} year ago}other{{N} years ago}}',
      FUTURE:'{N,plural,one{in {N} year}other{in {N} years}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr. ago}other{{N} yrs. ago}}',
      FUTURE:'{N,plural,one{in {N} yr.}other{in {N} yrs.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr. ago}other{{N} yrs. ago}}',
      FUTURE:'{N,plural,one{in {N} yr.}other{in {N} yrs.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_en_GB =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    SHORT:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    NARROW:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hour ago}other{{N} hours ago}}',
      FUTURE:'{N,plural,one{in {N} hour}other{in {N} hours}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} minute ago}other{{N} minutes ago}}',
      FUTURE:'{N,plural,one{in {N} minute}other{in {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,one{{N} month ago}other{{N} months ago}}',
      FUTURE:'{N,plural,one{in {N} month}other{in {N} months}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo ago}other{{N} mo ago}}',
      FUTURE:'{N,plural,one{in {N} mo}other{in {N} mo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo ago}other{{N} mo ago}}',
      FUTURE:'{N,plural,one{in {N} mo}other{in {N} mo}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,one{{N} quarter ago}other{{N} quarters ago}}',
      FUTURE:'{N,plural,one{in {N} quarter}other{in {N} quarters}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtr ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtr}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtr ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtr}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} second ago}other{{N} seconds ago}}',
      FUTURE:'{N,plural,one{in {N} second}other{in {N} seconds}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,one{{N} week ago}other{{N} weeks ago}}',
      FUTURE:'{N,plural,one{in {N} week}other{in {N} weeks}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,one{{N} year ago}other{{N} years ago}}',
      FUTURE:'{N,plural,one{in {N} year}other{in {N} years}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_en_IE =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    SHORT:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    NARROW:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hour ago}other{{N} hours ago}}',
      FUTURE:'{N,plural,one{in {N} hour}other{in {N} hours}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} minute ago}other{{N} minutes ago}}',
      FUTURE:'{N,plural,one{in {N} minute}other{in {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,one{{N} month ago}other{{N} months ago}}',
      FUTURE:'{N,plural,one{in {N} month}other{in {N} months}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo ago}other{{N} mo ago}}',
      FUTURE:'{N,plural,one{in {N} mo}other{in {N} mo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo ago}other{{N} mo ago}}',
      FUTURE:'{N,plural,one{in {N} mo}other{in {N} mo}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,one{{N} quarter ago}other{{N} quarters ago}}',
      FUTURE:'{N,plural,one{in {N} quarter}other{in {N} quarters}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtr ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtr}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtr ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtr}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} second ago}other{{N} seconds ago}}',
      FUTURE:'{N,plural,one{in {N} second}other{in {N} seconds}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,one{{N} week ago}other{{N} weeks ago}}',
      FUTURE:'{N,plural,one{in {N} week}other{in {N} weeks}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,one{{N} year ago}other{{N} years ago}}',
      FUTURE:'{N,plural,one{in {N} year}other{in {N} years}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_en_IN =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    SHORT:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    NARROW:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hour ago}other{{N} hours ago}}',
      FUTURE:'{N,plural,one{in {N} hour}other{in {N} hours}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} minute ago}other{{N} minutes ago}}',
      FUTURE:'{N,plural,one{in {N} minute}other{in {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,one{{N} month ago}other{{N} months ago}}',
      FUTURE:'{N,plural,one{in {N} month}other{in {N} months}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo ago}other{{N} mo ago}}',
      FUTURE:'{N,plural,one{in {N} mo}other{in {N} mo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo ago}other{{N} mo ago}}',
      FUTURE:'{N,plural,one{in {N} mo}other{in {N} mo}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,one{{N} quarter ago}other{{N} quarters ago}}',
      FUTURE:'{N,plural,one{in {N} quarter}other{in {N} quarters}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtr ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtr}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtr ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtr}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} second ago}other{{N} seconds ago}}',
      FUTURE:'{N,plural,one{in {N} second}other{in {N} seconds}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,one{{N} week ago}other{{N} weeks ago}}',
      FUTURE:'{N,plural,one{in {N} week}other{in {N} weeks}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,one{{N} year ago}other{{N} years ago}}',
      FUTURE:'{N,plural,one{in {N} year}other{in {N} years}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_en_SG =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    SHORT:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    NARROW:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hour ago}other{{N} hours ago}}',
      FUTURE:'{N,plural,one{in {N} hour}other{in {N} hours}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} minute ago}other{{N} minutes ago}}',
      FUTURE:'{N,plural,one{in {N} minute}other{in {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,one{{N} month ago}other{{N} months ago}}',
      FUTURE:'{N,plural,one{in {N} month}other{in {N} months}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last mth','0':'this mth','1':'next mth'},
      PAST:'{N,plural,one{{N} mth ago}other{{N} mth ago}}',
      FUTURE:'{N,plural,one{in {N} mth}other{in {N} mth}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last mth','0':'this mth','1':'next mth'},
      PAST:'{N,plural,one{{N} mo ago}other{{N} mo ago}}',
      FUTURE:'{N,plural,one{in {N} mo}other{in {N} mo}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,one{{N} quarter ago}other{{N} quarters ago}}',
      FUTURE:'{N,plural,one{in {N} quarter}other{in {N} quarters}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last qtr','0':'this qtr','1':'next qtr'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtrs ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtrs}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last qtr','0':'this qtr','1':'next qtr'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtr ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtr}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} second ago}other{{N} seconds ago}}',
      FUTURE:'{N,plural,one{in {N} second}other{in {N} seconds}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,one{{N} week ago}other{{N} weeks ago}}',
      FUTURE:'{N,plural,one{in {N} week}other{in {N} weeks}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last wk','0':'this wk','1':'next wk'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last wk','0':'this wk','1':'next wk'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,one{{N} year ago}other{{N} years ago}}',
      FUTURE:'{N,plural,one{in {N} year}other{in {N} years}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last yr','0':'this yr','1':'next yr'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last yr','0':'this yr','1':'next yr'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_en_US = exports.RelativeDateTimeSymbols_en;

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_en_ZA =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    SHORT:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
    NARROW:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,one{{N} day ago}other{{N} days ago}}',
      FUTURE:'{N,plural,one{in {N} day}other{in {N} days}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hour ago}other{{N} hours ago}}',
      FUTURE:'{N,plural,one{in {N} hour}other{in {N} hours}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,one{{N} hr ago}other{{N} hr ago}}',
      FUTURE:'{N,plural,one{in {N} hr}other{in {N} hr}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} minute ago}other{{N} minutes ago}}',
      FUTURE:'{N,plural,one{in {N} minute}other{in {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,one{{N} min ago}other{{N} min ago}}',
      FUTURE:'{N,plural,one{in {N} min}other{in {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,one{{N} month ago}other{{N} months ago}}',
      FUTURE:'{N,plural,one{in {N} month}other{in {N} months}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo ago}other{{N} mo ago}}',
      FUTURE:'{N,plural,one{in {N} mo}other{in {N} mo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last mo.','0':'this mo.','1':'next mo.'},
      PAST:'{N,plural,one{{N} mo ago}other{{N} mo ago}}',
      FUTURE:'{N,plural,one{in {N} mo}other{in {N} mo}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,one{{N} quarter ago}other{{N} quarters ago}}',
      FUTURE:'{N,plural,one{in {N} quarter}other{in {N} quarters}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtr ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtr}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last qtr.','0':'this qtr.','1':'next qtr.'},
      PAST:'{N,plural,one{{N} qtr ago}other{{N} qtr ago}}',
      FUTURE:'{N,plural,one{in {N} qtr}other{in {N} qtr}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} second ago}other{{N} seconds ago}}',
      FUTURE:'{N,plural,one{in {N} second}other{in {N} seconds}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,one{{N} sec ago}other{{N} sec ago}}',
      FUTURE:'{N,plural,one{in {N} sec}other{in {N} sec}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,one{{N} week ago}other{{N} weeks ago}}',
      FUTURE:'{N,plural,one{in {N} week}other{in {N} weeks}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last wk.','0':'this wk.','1':'next wk.'},
      PAST:'{N,plural,one{{N} wk ago}other{{N} wk ago}}',
      FUTURE:'{N,plural,one{in {N} wk}other{in {N} wk}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,one{{N} year ago}other{{N} years ago}}',
      FUTURE:'{N,plural,one{in {N} year}other{in {N} years}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last yr.','0':'this yr.','1':'next yr.'},
      PAST:'{N,plural,one{{N} yr ago}other{{N} yr ago}}',
      FUTURE:'{N,plural,one{in {N} yr}other{in {N} yr}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_es =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ayer','-2':'anteayer','0':'hoy','1':'mañana','2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ayer','-2':'anteayer','0':'hoy','1':'mañana','2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ayer','-2':'anteayer','0':'hoy','1':'mañana','2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} hora}other{hace {N} horas}}',
      FUTURE:'{N,plural,one{dentro de {N} hora}other{dentro de {N} horas}}',
    },
    SHORT:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} h}other{hace {N} h}}',
      FUTURE:'{N,plural,one{dentro de {N} h}other{dentro de {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} h}other{hace {N} h}}',
      FUTURE:'{N,plural,one{dentro de {N} h}other{dentro de {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} minuto}other{hace {N} minutos}}',
      FUTURE:'{N,plural,one{dentro de {N} minuto}other{dentro de {N} minutos}}',
    },
    SHORT:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} min}other{hace {N} min}}',
      FUTURE:'{N,plural,one{dentro de {N} min}other{dentro de {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} min}other{hace {N} min}}',
      FUTURE:'{N,plural,one{dentro de {N} min}other{dentro de {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{hace {N} mes}other{hace {N} meses}}',
      FUTURE:'{N,plural,one{dentro de {N} mes}other{dentro de {N} meses}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{hace {N} m}other{hace {N} m}}',
      FUTURE:'{N,plural,one{dentro de {N} m}other{dentro de {N} m}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{hace {N} m}other{hace {N} m}}',
      FUTURE:'{N,plural,one{dentro de {N} m}other{dentro de {N} m}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trimestre}other{hace {N} trimestres}}',
      FUTURE:'{N,plural,one{dentro de {N} trimestre}other{dentro de {N} trimestres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trim.}other{hace {N} trim.}}',
      FUTURE:'{N,plural,one{dentro de {N} trim.}other{dentro de {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trim.}other{hace {N} trim.}}',
      FUTURE:'{N,plural,one{dentro de {N} trim.}other{dentro de {N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} segundo}other{hace {N} segundos}}',
      FUTURE:'{N,plural,one{dentro de {N} segundo}other{dentro de {N} segundos}}',
    },
    SHORT:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} s}other{hace {N} s}}',
      FUTURE:'{N,plural,one{dentro de {N} s}other{dentro de {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} s}other{hace {N} s}}',
      FUTURE:'{N,plural,one{dentro de {N} s}other{dentro de {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la próxima semana'},
      PAST:'{N,plural,one{hace {N} semana}other{hace {N} semanas}}',
      FUTURE:'{N,plural,one{dentro de {N} semana}other{dentro de {N} semanas}}',
    },
    SHORT:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la próxima semana'},
      PAST:'{N,plural,one{hace {N} sem.}other{hace {N} sem.}}',
      FUTURE:'{N,plural,one{dentro de {N} sem.}other{dentro de {N} sem.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la próxima semana'},
      PAST:'{N,plural,one{hace {N} sem.}other{hace {N} sem.}}',
      FUTURE:'{N,plural,one{dentro de {N} sem.}other{dentro de {N} sem.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'el año pasado','0':'este año','1':'el próximo año'},
      PAST:'{N,plural,one{hace {N} año}other{hace {N} años}}',
      FUTURE:'{N,plural,one{dentro de {N} año}other{dentro de {N} años}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el año pasado','0':'este año','1':'el próximo año'},
      PAST:'{N,plural,one{hace {N} a}other{hace {N} a}}',
      FUTURE:'{N,plural,one{dentro de {N} a}other{dentro de {N} a}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el año pasado','0':'este año','1':'el próximo año'},
      PAST:'{N,plural,one{hace {N} a}other{hace {N} a}}',
      FUTURE:'{N,plural,one{dentro de {N} a}other{dentro de {N} a}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_es_419 =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ayer','-2':'anteayer','0':'hoy','1':'mañana','2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
    SHORT:{
      RELATIVE:{'2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
    NARROW:{
      RELATIVE:{'2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} hora}other{hace {N} horas}}',
      FUTURE:'{N,plural,one{dentro de {N} hora}other{dentro de {N} horas}}',
    },
    SHORT:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} h}other{hace {N} h}}',
      FUTURE:'{N,plural,one{dentro de {N} h}other{dentro de {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} h}other{hace {N} h}}',
      FUTURE:'{N,plural,one{dentro de {N} h}other{dentro de {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} minuto}other{hace {N} minutos}}',
      FUTURE:'{N,plural,one{dentro de {N} minuto}other{dentro de {N} minutos}}',
    },
    SHORT:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} min}other{hace {N} min}}',
      FUTURE:'{N,plural,one{dentro de {N} min}other{dentro de {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} min}other{hace {N} min}}',
      FUTURE:'{N,plural,one{dentro de {N} min}other{dentro de {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{hace {N} mes}other{hace {N} meses}}',
      FUTURE:'{N,plural,one{dentro de {N} mes}other{dentro de {N} meses}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{hace {N} m}other{hace {N} m}}',
      FUTURE:'{N,plural,one{dentro de {N} m}other{dentro de {N} m}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{hace {N} m}other{hace {N} m}}',
      FUTURE:'{N,plural,one{dentro de {N} m}other{dentro de {N} m}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trimestre}other{hace {N} trimestres}}',
      FUTURE:'{N,plural,one{dentro de {N} trimestre}other{dentro de {N} trimestres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trim.}other{hace {N} trim.}}',
      FUTURE:'{N,plural,one{dentro de {N} trim.}other{dentro de {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trim.}other{hace {N} trim.}}',
      FUTURE:'{N,plural,one{dentro de {N} trim.}other{dentro de {N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} segundo}other{hace {N} segundos}}',
      FUTURE:'{N,plural,one{dentro de {N} segundo}other{dentro de {N} segundos}}',
    },
    SHORT:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} s}other{hace {N} s}}',
      FUTURE:'{N,plural,one{dentro de {N} s}other{dentro de {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} s}other{hace {N} s}}',
      FUTURE:'{N,plural,one{dentro de {N} s}other{dentro de {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la próxima semana'},
      PAST:'{N,plural,one{hace {N} semana}other{hace {N} semanas}}',
      FUTURE:'{N,plural,one{dentro de {N} semana}other{dentro de {N} semanas}}',
    },
    SHORT:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la próxima semana'},
      PAST:'{N,plural,one{hace {N} sem.}other{hace {N} sem.}}',
      FUTURE:'{N,plural,one{dentro de {N} sem.}other{dentro de {N} sem.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la próxima semana'},
      PAST:'{N,plural,one{hace {N} sem.}other{hace {N} sem.}}',
      FUTURE:'{N,plural,one{dentro de {N} sem.}other{dentro de {N} sem.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'el año pasado','0':'este año','1':'el próximo año'},
      PAST:'{N,plural,one{hace {N} año}other{hace {N} años}}',
      FUTURE:'{N,plural,one{dentro de {N} año}other{dentro de {N} años}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el año pasado','0':'este año'},
      PAST:'{N,plural,one{hace {N} a}other{hace {N} a}}',
      FUTURE:'{N,plural,one{dentro de {N} a}other{dentro de {N} a}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el año pasado','0':'este año'},
      PAST:'{N,plural,one{hace {N} a}other{hace {N} a}}',
      FUTURE:'{N,plural,one{dentro de {N} a}other{dentro de {N} a}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_es_ES = exports.RelativeDateTimeSymbols_es;

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_es_MX =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ayer','-2':'anteayer','0':'hoy','1':'mañana','2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
    SHORT:{
      RELATIVE:{'2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{en {N} día}other{en {N} días}}',
    },
    NARROW:{
      RELATIVE:{'2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{+{N} día}other{+{N} días}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} hora}other{hace {N} horas}}',
      FUTURE:'{N,plural,one{dentro de {N} hora}other{dentro de {N} horas}}',
    },
    SHORT:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} h}other{hace {N} h}}',
      FUTURE:'{N,plural,one{en {N} h}other{en {N} n}}',
    },
    NARROW:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} h}other{hace {N} h}}',
      FUTURE:'{N,plural,one{dentro de {N} h}other{dentro de {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} minuto}other{hace {N} minutos}}',
      FUTURE:'{N,plural,one{dentro de {N} minuto}other{dentro de {N} minutos}}',
    },
    SHORT:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} min}other{hace {N} min}}',
      FUTURE:'{N,plural,one{en {N} min}other{en {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{-{N} min}other{-{N} min}}',
      FUTURE:'{N,plural,one{+{N} min}other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el mes próximo'},
      PAST:'{N,plural,one{hace {N} mes}other{hace {N} meses}}',
      FUTURE:'{N,plural,one{en {N} mes}other{en {N} meses}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{hace {N} m}other{hace {N} m}}',
      FUTURE:'{N,plural,one{en {N} m}other{en {N} m}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{-{N} m}other{-{N} m}}',
      FUTURE:'{N,plural,one{+{N} m}other{+{N} m}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trimestre}other{hace {N} trimestres}}',
      FUTURE:'{N,plural,one{dentro de {N} trimetre}other{dentro de {N} trimetres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trim.}other{hace {N} trim.}}',
      FUTURE:'{N,plural,one{en {N} trim.}other{en {N} trim}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{-{N} T}other{-{N} T}}',
      FUTURE:'{N,plural,one{+{N} T}other{+{N} T}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} segundo}other{hace {N} segundos}}',
      FUTURE:'{N,plural,one{dentro de {N} segundo}other{dentro de {N} segundos}}',
    },
    SHORT:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} s}other{hace {N} s}}',
      FUTURE:'{N,plural,one{en {N} s}other{en {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} s}other{hace {N} s}}',
      FUTURE:'{N,plural,one{+{N} s}other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la semana próxima'},
      PAST:'{N,plural,one{hace {N} semana}other{hace {N} semanas}}',
      FUTURE:'{N,plural,one{dentro de {N} semana}other{dentro de {N} semanas}}',
    },
    SHORT:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la semana próxima'},
      PAST:'{N,plural,one{hace {N} sem.}other{hace {N} sem.}}',
      FUTURE:'{N,plural,one{en {N} sem.}other{en {N} sem.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la semana próxima'},
      PAST:'{N,plural,one{hace {N} sem.}other{hace {N} sem.}}',
      FUTURE:'{N,plural,one{dentro de {N} sem.}other{dentro de {N} sem.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'el año pasado','0':'este año','1':'el año próximo'},
      PAST:'{N,plural,one{hace {N} año}other{hace {N} años}}',
      FUTURE:'{N,plural,one{dentro de {N} año}other{dentro de {N} años}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el año pasado','0':'este año'},
      PAST:'{N,plural,one{hace {N} a}other{hace {N} a}}',
      FUTURE:'{N,plural,one{en {N} a}other{en {N} a}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el año pasado','0':'este año'},
      PAST:'{N,plural,one{-{N} a}other{-{N} a}}',
      FUTURE:'{N,plural,one{en {N} a}other{en {N} a}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_es_US =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ayer','-2':'anteayer','0':'hoy','1':'mañana','2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
    SHORT:{
      RELATIVE:{'2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
    NARROW:{
      RELATIVE:{'2':'pasado mañana'},
      PAST:'{N,plural,one{hace {N} día}other{hace {N} días}}',
      FUTURE:'{N,plural,one{dentro de {N} día}other{dentro de {N} días}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} hora}other{hace {N} horas}}',
      FUTURE:'{N,plural,one{dentro de {N} hora}other{dentro de {N} horas}}',
    },
    SHORT:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} h}other{hace {N} h}}',
      FUTURE:'{N,plural,one{dentro de {N} h}other{dentro de {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hace {N} h}other{hace {N} h}}',
      FUTURE:'{N,plural,one{dentro de {N} h}other{dentro de {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} minuto}other{hace {N} minutos}}',
      FUTURE:'{N,plural,one{dentro de {N} minuto}other{dentro de {N} minutos}}',
    },
    SHORT:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} min}other{hace {N} min}}',
      FUTURE:'{N,plural,one{dentro de {N} min}other{dentro de {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hace {N} min}other{hace {N} min}}',
      FUTURE:'{N,plural,one{dentro de {N} min}other{dentro de {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el mes próximo'},
      PAST:'{N,plural,one{hace {N} mes}other{hace {N} meses}}',
      FUTURE:'{N,plural,one{dentro de {N} mes}other{dentro de {N} meses}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{hace {N} m}other{hace {N} m}}',
      FUTURE:'{N,plural,one{dentro de {N} m}other{dentro de {N} m}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el mes pasado','0':'este mes','1':'el próximo mes'},
      PAST:'{N,plural,one{hace {N} m}other{hace {N} m}}',
      FUTURE:'{N,plural,one{dentro de {N} m}other{dentro de {N} m}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trimestre}other{hace {N} trimestres}}',
      FUTURE:'{N,plural,one{dentro de {N} trimestre}other{dentro de {N} trimestres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trim.}other{hace {N} trim.}}',
      FUTURE:'{N,plural,one{dentro de {N} trim.}other{dentro de {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el trimestre pasado','0':'este trimestre','1':'el próximo trimestre'},
      PAST:'{N,plural,one{hace {N} trim.}other{hace {N} trim.}}',
      FUTURE:'{N,plural,one{dentro de {N} trim.}other{dentro de {N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} segundo}other{hace {N} segundos}}',
      FUTURE:'{N,plural,one{dentro de {N} segundo}other{dentro de {N} segundos}}',
    },
    SHORT:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} s}other{hace {N} s}}',
      FUTURE:'{N,plural,one{dentro de {N} s}other{dentro de {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'ahora'},
      PAST:'{N,plural,one{hace {N} s}other{hace {N} s}}',
      FUTURE:'{N,plural,one{dentro de {N} s}other{dentro de {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la semana próxima'},
      PAST:'{N,plural,one{hace {N} semana}other{hace {N} semanas}}',
      FUTURE:'{N,plural,one{dentro de {N} semana}other{dentro de {N} semanas}}',
    },
    SHORT:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la semana próxima'},
      PAST:'{N,plural,one{hace {N} sem.}other{hace {N} sem.}}',
      FUTURE:'{N,plural,one{dentro de {N} sem.}other{dentro de {N} sem.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'la semana pasada','0':'esta semana','1':'la semana próxima'},
      PAST:'{N,plural,one{hace {N} sem.}other{hace {N} sem.}}',
      FUTURE:'{N,plural,one{dentro de {N} sem.}other{dentro de {N} sem.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'el año pasado','0':'este año','1':'el año próximo'},
      PAST:'{N,plural,one{hace {N} año}other{hace {N} años}}',
      FUTURE:'{N,plural,one{dentro de {N} año}other{dentro de {N} años}}',
    },
    SHORT:{
      RELATIVE:{'-1':'el año pasado','0':'este año'},
      PAST:'{N,plural,one{hace {N} a}other{hace {N} a}}',
      FUTURE:'{N,plural,one{dentro de {N} a}other{dentro de {N} a}}',
    },
    NARROW:{
      RELATIVE:{'-1':'el año pasado','0':'este año'},
      PAST:'{N,plural,one{hace {N} a}other{hace {N} a}}',
      FUTURE:'{N,plural,one{dentro de {N} a}other{dentro de {N} a}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_et =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'eile','-2':'üleeile','0':'täna','1':'homme','2':'ülehomme'},
      PAST:'{N,plural,one{{N} päeva eest}other{{N} päeva eest}}',
      FUTURE:'{N,plural,one{{N} päeva pärast}other{{N} päeva pärast}}',
    },
    SHORT:{
      RELATIVE:{'-1':'eile','-2':'üleeile','0':'täna','1':'homme','2':'ülehomme'},
      PAST:'{N,plural,one{{N} p eest}other{{N} p eest}}',
      FUTURE:'{N,plural,one{{N} p pärast}other{{N} p pärast}}',
    },
    NARROW:{
      RELATIVE:{'-1':'eile','-2':'üleeile','0':'täna','1':'homme','2':'ülehomme'},
      PAST:'{N,plural,one{{N} p eest}other{{N} p eest}}',
      FUTURE:'{N,plural,one{{N} p pärast}other{{N} p pärast}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'praegusel tunnil'},
      PAST:'{N,plural,one{{N} tunni eest}other{{N} tunni eest}}',
      FUTURE:'{N,plural,one{{N} tunni pärast}other{{N} tunni pärast}}',
    },
    SHORT:{
      RELATIVE:{'0':'praegusel tunnil'},
      PAST:'{N,plural,one{{N} t eest}other{{N} t eest}}',
      FUTURE:'{N,plural,one{{N} t pärast}other{{N} t pärast}}',
    },
    NARROW:{
      RELATIVE:{'0':'praegusel tunnil'},
      PAST:'{N,plural,one{{N} t eest}other{{N} t eest}}',
      FUTURE:'{N,plural,one{{N} t pärast}other{{N} t pärast}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'praegusel minutil'},
      PAST:'{N,plural,one{{N} minuti eest}other{{N} minuti eest}}',
      FUTURE:'{N,plural,one{{N} minuti pärast}other{{N} minuti pärast}}',
    },
    SHORT:{
      RELATIVE:{'0':'praegusel minutil'},
      PAST:'{N,plural,one{{N} min eest}other{{N} min eest}}',
      FUTURE:'{N,plural,one{{N} min pärast}other{{N} min pärast}}',
    },
    NARROW:{
      RELATIVE:{'0':'praegusel minutil'},
      PAST:'{N,plural,one{{N} min eest}other{{N} min eest}}',
      FUTURE:'{N,plural,one{{N} min pärast}other{{N} min pärast}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'eelmine kuu','0':'käesolev kuu','1':'järgmine kuu'},
      PAST:'{N,plural,one{{N} kuu eest}other{{N} kuu eest}}',
      FUTURE:'{N,plural,one{{N} kuu pärast}other{{N} kuu pärast}}',
    },
    SHORT:{
      RELATIVE:{'-1':'eelmine kuu','0':'käesolev kuu','1':'järgmine kuu'},
      PAST:'{N,plural,one{{N} kuu eest}other{{N} kuu eest}}',
      FUTURE:'{N,plural,one{{N} kuu pärast}other{{N} kuu pärast}}',
    },
    NARROW:{
      RELATIVE:{'-1':'eelmine kuu','0':'käesolev kuu','1':'järgmine kuu'},
      PAST:'{N,plural,one{{N} k eest}other{{N} k eest}}',
      FUTURE:'{N,plural,one{{N} k pärast}other{{N} k pärast}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'eelmine kvartal','0':'käesolev kvartal','1':'järgmine kvartal'},
      PAST:'{N,plural,one{{N} kvartali eest}other{{N} kvartali eest}}',
      FUTURE:'{N,plural,one{{N} kvartali pärast}other{{N} kvartali pärast}}',
    },
    SHORT:{
      RELATIVE:{'-1':'eelmine kv','0':'käesolev kv','1':'järgmine kv'},
      PAST:'{N,plural,one{{N} kv eest}other{{N} kv eest}}',
      FUTURE:'{N,plural,one{{N} kv pärast}other{{N} kv pärast}}',
    },
    NARROW:{
      RELATIVE:{'-1':'eelmine kv','0':'käesolev kv','1':'järgmine kv'},
      PAST:'{N,plural,one{{N} kv eest}other{{N} kv eest}}',
      FUTURE:'{N,plural,one{{N} kv pärast}other{{N} kv pärast}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nüüd'},
      PAST:'{N,plural,one{{N} sekundi eest}other{{N} sekundi eest}}',
      FUTURE:'{N,plural,one{{N} sekundi pärast}other{{N} sekundi pärast}}',
    },
    SHORT:{
      RELATIVE:{'0':'nüüd'},
      PAST:'{N,plural,one{{N} sek eest}other{{N} sek eest}}',
      FUTURE:'{N,plural,one{{N} sek pärast}other{{N} sek pärast}}',
    },
    NARROW:{
      RELATIVE:{'0':'nüüd'},
      PAST:'{N,plural,one{{N} s eest}other{{N} s eest}}',
      FUTURE:'{N,plural,one{{N} s pärast}other{{N} s pärast}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'eelmine nädal','0':'käesolev nädal','1':'järgmine nädal'},
      PAST:'{N,plural,one{{N} nädala eest}other{{N} nädala eest}}',
      FUTURE:'{N,plural,one{{N} nädala pärast}other{{N} nädala pärast}}',
    },
    SHORT:{
      RELATIVE:{'-1':'eelmine nädal','0':'käesolev nädal','1':'järgmine nädal'},
      PAST:'{N,plural,one{{N} näd eest}other{{N} näd eest}}',
      FUTURE:'{N,plural,one{{N} näd pärast}other{{N} näd pärast}}',
    },
    NARROW:{
      RELATIVE:{'-1':'eelmine nädal','0':'käesolev nädal','1':'järgmine nädal'},
      PAST:'{N,plural,one{{N} näd eest}other{{N} näd eest}}',
      FUTURE:'{N,plural,one{{N} näd pärast}other{{N} näd pärast}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'eelmine aasta','0':'käesolev aasta','1':'järgmine aasta'},
      PAST:'{N,plural,one{{N} aasta eest}other{{N} aasta eest}}',
      FUTURE:'{N,plural,one{{N} aasta pärast}other{{N} aasta pärast}}',
    },
    SHORT:{
      RELATIVE:{'-1':'eelmine aasta','0':'käesolev aasta','1':'järgmine aasta'},
      PAST:'{N,plural,one{{N} a eest}other{{N} a eest}}',
      FUTURE:'{N,plural,one{{N} a pärast}other{{N} a pärast}}',
    },
    NARROW:{
      RELATIVE:{'-1':'eelmine aasta','0':'käesolev aasta','1':'järgmine aasta'},
      PAST:'{N,plural,one{{N} a eest}other{{N} a eest}}',
      FUTURE:'{N,plural,one{{N} a pärast}other{{N} a pärast}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_eu =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'atzo','-2':'herenegun','0':'gaur','1':'bihar','2':'etzi'},
      PAST:'{N,plural,one{Duela {N} egun}other{Duela {N} egun}}',
      FUTURE:'{N,plural,one{{N} egun barru}other{{N} egun barru}}',
    },
    SHORT:{
      RELATIVE:{'-1':'atzo','-2':'herenegun','0':'gaur','1':'bihar','2':'etzi'},
      PAST:'{N,plural,one{Duela {N} egun}other{Duela {N} egun}}',
      FUTURE:'{N,plural,one{{N} egun barru}other{{N} egun barru}}',
    },
    NARROW:{
      RELATIVE:{'-1':'atzo','-2':'herenegun','0':'gaur','1':'bihar','2':'etzi'},
      PAST:'{N,plural,one{Duela {N} egun}other{Duela {N} egun}}',
      FUTURE:'{N,plural,one{{N} egun barru}other{{N} egun barru}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ordu honetan'},
      PAST:'{N,plural,one{Duela {N} ordu}other{Duela {N} ordu}}',
      FUTURE:'{N,plural,one{{N} ordu barru}other{{N} ordu barru}}',
    },
    SHORT:{
      RELATIVE:{'0':'ordu honetan'},
      PAST:'{N,plural,one{Duela {N} ordu}other{Duela {N} ordu}}',
      FUTURE:'{N,plural,one{{N} ordu barru}other{{N} ordu barru}}',
    },
    NARROW:{
      RELATIVE:{'0':'ordu honetan'},
      PAST:'{N,plural,one{Duela {N} ordu}other{Duela {N} ordu}}',
      FUTURE:'{N,plural,one{{N} ordu barru}other{{N} ordu barru}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'minutu honetan'},
      PAST:'{N,plural,one{Duela {N} minutu}other{Duela {N} minutu}}',
      FUTURE:'{N,plural,one{{N} minutu barru}other{{N} minutu barru}}',
    },
    SHORT:{
      RELATIVE:{'0':'minutu honetan'},
      PAST:'{N,plural,one{Duela {N} minutu}other{Duela {N} minutu}}',
      FUTURE:'{N,plural,one{{N} minutu barru}other{{N} minutu barru}}',
    },
    NARROW:{
      RELATIVE:{'0':'minutu honetan'},
      PAST:'{N,plural,one{Duela {N} minutu}other{Duela {N} minutu}}',
      FUTURE:'{N,plural,one{{N} minutu barru}other{{N} minutu barru}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'aurreko hilabetean','0':'hilabete honetan','1':'hurrengo hilabetean'},
      PAST:'{N,plural,one{Duela {N} hilabete}other{Duela {N} hilabete}}',
      FUTURE:'{N,plural,one{{N} hilabete barru}other{{N} hilabete barru}}',
    },
    SHORT:{
      RELATIVE:{'-1':'aurreko hilabetean','0':'hilabete honetan','1':'hurrengo hilabetean'},
      PAST:'{N,plural,one{Duela {N} hilabete}other{Duela {N} hilabete}}',
      FUTURE:'{N,plural,one{{N} hilabete barru}other{{N} hilabete barru}}',
    },
    NARROW:{
      RELATIVE:{'-1':'aurreko hilabetean','0':'hilabete honetan','1':'hurrengo hilabetean'},
      PAST:'{N,plural,one{Duela {N} hilabete}other{Duela {N} hilabete}}',
      FUTURE:'{N,plural,one{{N} hilabete barru}other{{N} hilabete barru}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'aurreko hiruhilekoa','0':'hiruhileko hau','1':'hurrengo hiruhilekoa'},
      PAST:'{N,plural,one{Duela {N} hiruhileko}other{Duela {N} hiruhileko}}',
      FUTURE:'{N,plural,one{{N} hiruhileko barru}other{{N} hiruhileko barru}}',
    },
    SHORT:{
      RELATIVE:{'-1':'aurreko hiruhilekoa','0':'hiruhileko hau','1':'hurrengo hiruhilekoa'},
      PAST:'{N,plural,one{Duela {N} hiruhileko}other{Duela {N} hiruhileko}}',
      FUTURE:'{N,plural,one{{N} hiruhileko barru}other{{N} hiruhileko barru}}',
    },
    NARROW:{
      RELATIVE:{'-1':'aurreko hiruhilekoa','0':'hiruhileko hau','1':'hurrengo hiruhilekoa'},
      PAST:'{N,plural,one{Duela {N} hiruhileko}other{Duela {N} hiruhileko}}',
      FUTURE:'{N,plural,one{{N} hiruhileko barru}other{{N} hiruhileko barru}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'orain'},
      PAST:'{N,plural,one{Duela {N} segundo}other{Duela {N} segundo}}',
      FUTURE:'{N,plural,one{{N} segundo barru}other{{N} segundo barru}}',
    },
    SHORT:{
      RELATIVE:{'0':'orain'},
      PAST:'{N,plural,one{Duela {N} segundo}other{Duela {N} segundo}}',
      FUTURE:'{N,plural,one{{N} segundo barru}other{{N} segundo barru}}',
    },
    NARROW:{
      RELATIVE:{'0':'orain'},
      PAST:'{N,plural,one{Duela {N} segundo}other{Duela {N} segundo}}',
      FUTURE:'{N,plural,one{{N} segundo barru}other{{N} segundo barru}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'aurreko astean','0':'aste honetan','1':'hurrengo astean'},
      PAST:'{N,plural,one{Duela {N} aste}other{Duela {N} aste}}',
      FUTURE:'{N,plural,one{{N} aste barru}other{{N} aste barru}}',
    },
    SHORT:{
      RELATIVE:{'-1':'aurreko astean','0':'aste honetan','1':'hurrengo astean'},
      PAST:'{N,plural,one{Duela {N} aste}other{Duela {N} aste}}',
      FUTURE:'{N,plural,one{{N} aste barru}other{{N} aste barru}}',
    },
    NARROW:{
      RELATIVE:{'-1':'aurreko astean','0':'aste honetan','1':'hurrengo astean'},
      PAST:'{N,plural,one{Duela {N} aste}other{Duela {N} aste}}',
      FUTURE:'{N,plural,one{{N} aste barru}other{{N} aste barru}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'iaz','0':'aurten','1':'hurrengo urtean'},
      PAST:'{N,plural,one{Duela {N} urte}other{Duela {N} urte}}',
      FUTURE:'{N,plural,one{{N} urte barru}other{{N} urte barru}}',
    },
    SHORT:{
      RELATIVE:{'-1':'aurreko urtea','0':'aurten','1':'hurrengo urtea'},
      PAST:'{N,plural,one{Duela {N} urte}other{Duela {N} urte}}',
      FUTURE:'{N,plural,one{{N} urte barru}other{{N} urte barru}}',
    },
    NARROW:{
      RELATIVE:{'-1':'aurreko urtea','0':'aurten','1':'hurrengo urtea'},
      PAST:'{N,plural,one{Duela {N} urte}other{Duela {N} urte}}',
      FUTURE:'{N,plural,one{{N} urte barru}other{{N} urte barru}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_fa =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'دیروز','-2':'پریروز','0':'امروز','1':'فردا','2':'پس‌فردا'},
      PAST:'{N,plural,one{{N} روز پیش}other{{N} روز پیش}}',
      FUTURE:'{N,plural,one{{N} روز بعد}other{{N} روز بعد}}',
    },
    SHORT:{
      RELATIVE:{'-1':'دیروز','-2':'پریروز','0':'امروز','1':'فردا','2':'پس‌فردا'},
      PAST:'{N,plural,one{{N} روز پیش}other{{N} روز پیش}}',
      FUTURE:'{N,plural,one{{N} روز بعد}other{{N} روز بعد}}',
    },
    NARROW:{
      RELATIVE:{'-1':'دیروز','-2':'پریروز','0':'امروز','1':'فردا','2':'پس‌فردا'},
      PAST:'{N,plural,one{{N} روز پیش}other{{N} روز پیش}}',
      FUTURE:'{N,plural,one{{N} روز بعد}other{{N} روز بعد}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'همین ساعت'},
      PAST:'{N,plural,one{{N} ساعت پیش}other{{N} ساعت پیش}}',
      FUTURE:'{N,plural,one{{N} ساعت بعد}other{{N} ساعت بعد}}',
    },
    SHORT:{
      RELATIVE:{'0':'همین ساعت'},
      PAST:'{N,plural,one{{N} ساعت پیش}other{{N} ساعت پیش}}',
      FUTURE:'{N,plural,one{{N} ساعت بعد}other{{N} ساعت بعد}}',
    },
    NARROW:{
      RELATIVE:{'0':'همین ساعت'},
      PAST:'{N,plural,one{{N} ساعت پیش}other{{N} ساعت پیش}}',
      FUTURE:'{N,plural,one{{N} ساعت بعد}other{{N} ساعت بعد}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'همین دقیقه'},
      PAST:'{N,plural,one{{N} دقیقه پیش}other{{N} دقیقه پیش}}',
      FUTURE:'{N,plural,one{{N} دقیقه بعد}other{{N} دقیقه بعد}}',
    },
    SHORT:{
      RELATIVE:{'0':'همین دقیقه'},
      PAST:'{N,plural,one{{N} دقیقه پیش}other{{N} دقیقه پیش}}',
      FUTURE:'{N,plural,one{{N} دقیقه بعد}other{{N} دقیقه بعد}}',
    },
    NARROW:{
      RELATIVE:{'0':'همین دقیقه'},
      PAST:'{N,plural,one{{N} دقیقه پیش}other{{N} دقیقه پیش}}',
      FUTURE:'{N,plural,one{{N} دقیقه بعد}other{{N} دقیقه بعد}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ماه گذشته','0':'این ماه','1':'ماه آینده'},
      PAST:'{N,plural,one{{N} ماه پیش}other{{N} ماه پیش}}',
      FUTURE:'{N,plural,one{{N} ماه بعد}other{{N} ماه بعد}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ماه پیش','0':'این ماه','1':'ماه آینده'},
      PAST:'{N,plural,one{{N} ماه پیش}other{{N} ماه پیش}}',
      FUTURE:'{N,plural,one{{N} ماه بعد}other{{N} ماه بعد}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ماه پیش','0':'این ماه','1':'ماه آینده'},
      PAST:'{N,plural,one{{N} ماه پیش}other{{N} ماه پیش}}',
      FUTURE:'{N,plural,one{{N} ماه بعد}other{{N} ماه بعد}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'سه‌ماههٔ گذشته','0':'سه‌ماههٔ کنونی','1':'سه‌ماههٔ آینده'},
      PAST:'{N,plural,one{{N} سه‌ماههٔ پیش}other{{N} سه‌ماههٔ پیش}}',
      FUTURE:'{N,plural,one{{N} سه‌ماههٔ بعد}other{{N} سه‌ماههٔ بعد}}',
    },
    SHORT:{
      RELATIVE:{'-1':'سه‌ماههٔ گذشته','0':'سه‌ماههٔ کنونی','1':'سه‌ماههٔ آینده'},
      PAST:'{N,plural,one{{N} سه‌ماههٔ پیش}other{{N} سه‌ماههٔ پیش}}',
      FUTURE:'{N,plural,one{{N} سه‌ماههٔ بعد}other{{N} سه‌ماههٔ بعد}}',
    },
    NARROW:{
      RELATIVE:{'-1':'سه‌ماههٔ گذشته','0':'سه‌ماههٔ کنونی','1':'سه‌ماههٔ آینده'},
      PAST:'{N,plural,one{{N} سه‌ماههٔ پیش}other{{N} سه‌ماههٔ پیش}}',
      FUTURE:'{N,plural,one{{N} سه‌ماههٔ بعد}other{{N} سه‌ماههٔ بعد}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'اکنون'},
      PAST:'{N,plural,one{{N} ثانیه پیش}other{{N} ثانیه پیش}}',
      FUTURE:'{N,plural,one{{N} ثانیه بعد}other{{N} ثانیه بعد}}',
    },
    SHORT:{
      RELATIVE:{'0':'اکنون'},
      PAST:'{N,plural,one{{N} ثانیه پیش}other{{N} ثانیه پیش}}',
      FUTURE:'{N,plural,one{{N} ثانیه بعد}other{{N} ثانیه بعد}}',
    },
    NARROW:{
      RELATIVE:{'0':'اکنون'},
      PAST:'{N,plural,one{{N} ثانیه پیش}other{{N} ثانیه پیش}}',
      FUTURE:'{N,plural,one{{N} ثانیه بعد}other{{N} ثانیه بعد}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'هفتهٔ گذشته','0':'این هفته','1':'هفتهٔ آینده'},
      PAST:'{N,plural,one{{N} هفته پیش}other{{N} هفته پیش}}',
      FUTURE:'{N,plural,one{{N} هفته بعد}other{{N} هفته بعد}}',
    },
    SHORT:{
      RELATIVE:{'-1':'هفتهٔ گذشته','0':'این هفته','1':'هفتهٔ آینده'},
      PAST:'{N,plural,one{{N} هفته پیش}other{{N} هفته پیش}}',
      FUTURE:'{N,plural,one{{N} هفته بعد}other{{N} هفته بعد}}',
    },
    NARROW:{
      RELATIVE:{'-1':'هفتهٔ گذشته','0':'این هفته','1':'هفتهٔ آینده'},
      PAST:'{N,plural,one{{N} هفته پیش}other{{N} هفته پیش}}',
      FUTURE:'{N,plural,one{{N} هفته بعد}other{{N} هفته بعد}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'سال گذشته','0':'امسال','1':'سال آینده'},
      PAST:'{N,plural,one{{N} سال پیش}other{{N} سال پیش}}',
      FUTURE:'{N,plural,one{{N} سال بعد}other{{N} سال بعد}}',
    },
    SHORT:{
      RELATIVE:{'-1':'سال گذشته','0':'امسال','1':'سال آینده'},
      PAST:'{N,plural,one{{N} سال پیش}other{{N} سال پیش}}',
      FUTURE:'{N,plural,one{{N} سال بعد}other{{N} سال بعد}}',
    },
    NARROW:{
      RELATIVE:{'-1':'سال گذشته','0':'امسال','1':'سال آینده'},
      PAST:'{N,plural,one{{N} سال پیش}other{{N} سال پیش}}',
      FUTURE:'{N,plural,one{{N} سال بعد}other{{N} سال بعد}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_fi =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'eilen','-2':'toissa päivänä','0':'tänään','1':'huomenna','2':'ylihuomenna'},
      PAST:'{N,plural,one{{N} päivä sitten}other{{N} päivää sitten}}',
      FUTURE:'{N,plural,one{{N} päivän päästä}other{{N} päivän päästä}}',
    },
    SHORT:{
      RELATIVE:{'-1':'eilen','-2':'toissap.','0':'tänään','1':'huom.','2':'ylihuom.'},
      PAST:'{N,plural,one{{N} pv sitten}other{{N} pv sitten}}',
      FUTURE:'{N,plural,one{{N} pv päästä}other{{N} pv päästä}}',
    },
    NARROW:{
      RELATIVE:{'-1':'eilen','-2':'toissap.','0':'tänään','1':'huom.','2':'ylihuom.'},
      PAST:'{N,plural,one{{N} pv sitten}other{{N} pv sitten}}',
      FUTURE:'{N,plural,one{{N} pv päästä}other{{N} pv päästä}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'tämän tunnin aikana'},
      PAST:'{N,plural,one{{N} tunti sitten}other{{N} tuntia sitten}}',
      FUTURE:'{N,plural,one{{N} tunnin päästä}other{{N} tunnin päästä}}',
    },
    SHORT:{
      RELATIVE:{'0':'tunnin sisällä'},
      PAST:'{N,plural,one{{N} t sitten}other{{N} t sitten}}',
      FUTURE:'{N,plural,one{{N} t päästä}other{{N} t päästä}}',
    },
    NARROW:{
      RELATIVE:{'0':'tunnin sisällä'},
      PAST:'{N,plural,one{{N} t sitten}other{{N} t sitten}}',
      FUTURE:'{N,plural,one{{N} t päästä}other{{N} t päästä}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'tämän minuutin aikana'},
      PAST:'{N,plural,one{{N} minuutti sitten}other{{N} minuuttia sitten}}',
      FUTURE:'{N,plural,one{{N} minuutin päästä}other{{N} minuutin päästä}}',
    },
    SHORT:{
      RELATIVE:{'0':'minuutin sisällä'},
      PAST:'{N,plural,one{{N} min sitten}other{{N} min sitten}}',
      FUTURE:'{N,plural,one{{N} min päästä}other{{N} min päästä}}',
    },
    NARROW:{
      RELATIVE:{'0':'minuutin sisällä'},
      PAST:'{N,plural,one{{N} min sitten}other{{N} min sitten}}',
      FUTURE:'{N,plural,one{{N} min päästä}other{{N} min päästä}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'viime kuussa','0':'tässä kuussa','1':'ensi kuussa'},
      PAST:'{N,plural,one{{N} kuukausi sitten}other{{N} kuukautta sitten}}',
      FUTURE:'{N,plural,one{{N} kuukauden päästä}other{{N} kuukauden päästä}}',
    },
    SHORT:{
      RELATIVE:{'-1':'viime kk','0':'tässä kk','1':'ensi kk'},
      PAST:'{N,plural,one{{N} kk sitten}other{{N} kk sitten}}',
      FUTURE:'{N,plural,one{{N} kk päästä}other{{N} kk päästä}}',
    },
    NARROW:{
      RELATIVE:{'-1':'viime kk','0':'tässä kk','1':'ensi kk'},
      PAST:'{N,plural,one{{N} kk sitten}other{{N} kk sitten}}',
      FUTURE:'{N,plural,one{{N} kk päästä}other{{N} kk päästä}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'viime neljännesvuonna','0':'tänä neljännesvuonna','1':'ensi neljännesvuonna'},
      PAST:'{N,plural,one{{N} neljännesvuosi sitten}other{{N} neljännesvuotta sitten}}',
      FUTURE:'{N,plural,one{{N} neljännesvuoden päästä}other{{N} neljännesvuoden päästä}}',
    },
    SHORT:{
      RELATIVE:{'-1':'viime neljänneksenä','0':'tänä neljänneksenä','1':'ensi neljänneksenä'},
      PAST:'{N,plural,one{{N} neljännes sitten}other{{N} neljännestä sitten}}',
      FUTURE:'{N,plural,one{{N} neljänneksen päästä}other{{N} neljänneksen päästä}}',
    },
    NARROW:{
      RELATIVE:{'-1':'viime nelj.','0':'tänä nelj.','1':'ensi nelj.'},
      PAST:'{N,plural,one{{N} nelj. sitten}other{{N} nelj. sitten}}',
      FUTURE:'{N,plural,one{{N} nelj. päästä}other{{N} nelj. päästä}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nyt'},
      PAST:'{N,plural,one{{N} sekunti sitten}other{{N} sekuntia sitten}}',
      FUTURE:'{N,plural,one{{N} sekunnin päästä}other{{N} sekunnin päästä}}',
    },
    SHORT:{
      RELATIVE:{'0':'nyt'},
      PAST:'{N,plural,one{{N} s sitten}other{{N} s sitten}}',
      FUTURE:'{N,plural,one{{N} s päästä}other{{N} s päästä}}',
    },
    NARROW:{
      RELATIVE:{'0':'nyt'},
      PAST:'{N,plural,one{{N} s sitten}other{{N} s sitten}}',
      FUTURE:'{N,plural,one{{N} s päästä}other{{N} s päästä}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'viime viikolla','0':'tällä viikolla','1':'ensi viikolla'},
      PAST:'{N,plural,one{{N} viikko sitten}other{{N} viikkoa sitten}}',
      FUTURE:'{N,plural,one{{N} viikon päästä}other{{N} viikon päästä}}',
    },
    SHORT:{
      RELATIVE:{'-1':'viime vk','0':'tällä vk','1':'ensi vk'},
      PAST:'{N,plural,one{{N} vk sitten}other{{N} vk sitten}}',
      FUTURE:'{N,plural,one{{N} vk päästä}other{{N} vk päästä}}',
    },
    NARROW:{
      RELATIVE:{'-1':'viime vk','0':'tällä vk','1':'ensi vk'},
      PAST:'{N,plural,one{{N} vk sitten}other{{N} vk sitten}}',
      FUTURE:'{N,plural,one{{N} vk päästä}other{{N} vk päästä}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'viime vuonna','0':'tänä vuonna','1':'ensi vuonna'},
      PAST:'{N,plural,one{{N} vuosi sitten}other{{N} vuotta sitten}}',
      FUTURE:'{N,plural,one{{N} vuoden päästä}other{{N} vuoden päästä}}',
    },
    SHORT:{
      RELATIVE:{'-1':'viime v','0':'tänä v','1':'ensi v'},
      PAST:'{N,plural,one{{N} v sitten}other{{N} v sitten}}',
      FUTURE:'{N,plural,one{{N} v päästä}other{{N} v päästä}}',
    },
    NARROW:{
      RELATIVE:{'-1':'viime v','0':'tänä v','1':'ensi v'},
      PAST:'{N,plural,one{{N} v sitten}other{{N} v sitten}}',
      FUTURE:'{N,plural,one{{N} v päästä}other{{N} v päästä}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_fil =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'kahapon','-2':'Araw bago ang kahapon','0':'ngayong araw','1':'bukas','2':'Samakalawa'},
      PAST:'{N,plural,one{{N} araw ang nakalipas}other{{N} (na) araw ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} araw}other{sa {N} (na) araw}}',
    },
    SHORT:{
      RELATIVE:{'-1':'kahapon','-2':'Araw bago ang kahapon','0':'ngayong araw','1':'bukas','2':'Samakalawa'},
      PAST:'{N,plural,one{{N} (na) araw ang nakalipas}other{{N} (na) araw ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} (na) araw}other{sa {N} (na) araw}}',
    },
    NARROW:{
      RELATIVE:{'-1':'kahapon','-2':'Araw bago ang kahapon','0':'ngayong araw','1':'bukas','2':'Samakalawa'},
      PAST:'{N,plural,one{{N} araw ang nakalipas}other{{N} (na) araw ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} araw}other{sa {N} (na) araw}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ngayong oras'},
      PAST:'{N,plural,one{{N} oras ang nakalipas}other{{N} (na) oras ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} oras}other{sa {N} (na) oras}}',
    },
    SHORT:{
      RELATIVE:{'0':'ngayong oras'},
      PAST:'{N,plural,one{{N} oras ang nakalipas}other{{N} (na) oras ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} oras}other{sa {N} (na) oras}}',
    },
    NARROW:{
      RELATIVE:{'0':'ngayong oras'},
      PAST:'{N,plural,one{{N} oras nakalipas}other{{N} (na) oras nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} oras}other{sa {N} (na) oras}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'sa minutong ito'},
      PAST:'{N,plural,one{{N} minuto ang nakalipas}other{{N} (na) minuto ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} minuto}other{sa {N} (na) minuto}}',
    },
    SHORT:{
      RELATIVE:{'0':'sa minutong ito'},
      PAST:'{N,plural,one{{N} min. ang nakalipas}other{{N} (na) min. ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} min.}other{sa {N} (na) min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'sa minutong ito'},
      PAST:'{N,plural,one{{N} min. ang nakalipas}other{{N} (na) min. ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} min.}other{sa {N} (na) min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'nakaraang buwan','0':'ngayong buwan','1':'susunod na buwan'},
      PAST:'{N,plural,one{{N} buwan ang nakalipas}other{{N} (na) buwan ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} buwan}other{sa {N} (na) buwan}}',
    },
    SHORT:{
      RELATIVE:{'-1':'nakaraang buwan','0':'ngayong buwan','1':'susunod na buwan'},
      PAST:'{N,plural,one{{N} buwan ang nakalipas}other{{N} (na) buwan ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} buwan}other{sa {N} (na) buwan}}',
    },
    NARROW:{
      RELATIVE:{'-1':'nakaraang buwan','0':'ngayong buwan','1':'susunod na buwan'},
      PAST:'{N,plural,one{{N} buwan ang nakalipas}other{{N} (na) buwan ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} buwan}other{sa {N} (na) buwan}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'nakaraang quarter','0':'ngayong quarter','1':'susunod na quarter'},
      PAST:'{N,plural,one{{N} quarter ang nakalipas}other{{N} (na) quarter ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} quarter}other{sa {N} (na) quarter}}',
    },
    SHORT:{
      RELATIVE:{'-1':'nakaraang quarter','0':'ngayong quarter','1':'susunod na quarter'},
      PAST:'{N,plural,one{{N} quarter ang nakalipas}other{{N} (na) quarter ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} (na) quarter}other{sa {N} (na) quarter}}',
    },
    NARROW:{
      RELATIVE:{'-1':'nakaraang quarter','0':'ngayong quarter','1':'susunod na quarter'},
      PAST:'{N,plural,one{{N} quarter ang nakalipas}other{{N} (na) quarter ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} quarter}other{sa {N} (na) quarter}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ngayon'},
      PAST:'{N,plural,one{{N} segundo ang nakalipas}other{{N} (na) segundo ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} segundo}other{sa {N} (na) segundo}}',
    },
    SHORT:{
      RELATIVE:{'0':'ngayon'},
      PAST:'{N,plural,one{{N} seg. ang nakalipas}other{{N} (na) seg. nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} seg.}other{sa {N} (na) seg.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ngayon'},
      PAST:'{N,plural,one{{N} seg. nakalipas}other{{N} (na) seg. nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} seg.}other{sa {N} (na) seg.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'nakalipas na linggo','0':'sa linggong ito','1':'susunod na linggo'},
      PAST:'{N,plural,one{{N} linggo ang nakalipas}other{{N} (na) linggo ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} linggo}other{sa {N} (na) linggo}}',
    },
    SHORT:{
      RELATIVE:{'-1':'nakaraang linggo','0':'ngayong linggo','1':'susunod na linggo'},
      PAST:'{N,plural,one{{N} linggo ang nakalipas}other{{N} (na) linggo ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} linggo}other{sa {N} (na) linggo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'nakaraang linggo','0':'ngayong linggo','1':'susunod na linggo'},
      PAST:'{N,plural,one{{N} linggo ang nakalipas}other{{N} (na) linggo ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} linggo}other{sa {N} (na) linggo}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'nakaraang taon','0':'ngayong taon','1':'susunod na taon'},
      PAST:'{N,plural,one{{N} taon ang nakalipas}other{{N} (na) taon ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} taon}other{sa {N} (na) taon}}',
    },
    SHORT:{
      RELATIVE:{'-1':'nakaraang taon','0':'ngayong taon','1':'susunod na taon'},
      PAST:'{N,plural,one{{N} taon ang nakalipas}other{{N} (na) taon ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} taon}other{sa {N} (na) taon}}',
    },
    NARROW:{
      RELATIVE:{'-1':'nakaraang taon','0':'ngayong taon','1':'susunod na taon'},
      PAST:'{N,plural,one{{N} taon ang nakalipas}other{{N} (na) taon ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} taon}other{sa {N} (na) taon}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_fr =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'hier','-2':'avant-hier','0':'aujourd’hui','1':'demain','2':'après-demain'},
      PAST:'{N,plural,one{il y a {N} jour}other{il y a {N} jours}}',
      FUTURE:'{N,plural,one{dans {N} jour}other{dans {N} jours}}',
    },
    SHORT:{
      RELATIVE:{'-1':'hier','-2':'avant-hier','0':'aujourd’hui','1':'demain','2':'après-demain'},
      PAST:'{N,plural,one{il y a {N} j}other{il y a {N} j}}',
      FUTURE:'{N,plural,one{dans {N} j}other{dans {N} j}}',
    },
    NARROW:{
      RELATIVE:{'-1':'hier','-2':'avant-hier','0':'aujourd’hui','1':'demain','2':'après-demain'},
      PAST:'{N,plural,one{-{N} j}other{-{N} j}}',
      FUTURE:'{N,plural,one{+{N} j}other{+{N} j}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'cette heure-ci'},
      PAST:'{N,plural,one{il y a {N} heure}other{il y a {N} heures}}',
      FUTURE:'{N,plural,one{dans {N} heure}other{dans {N} heures}}',
    },
    SHORT:{
      RELATIVE:{'0':'cette heure-ci'},
      PAST:'{N,plural,one{il y a {N} h}other{il y a {N} h}}',
      FUTURE:'{N,plural,one{dans {N} h}other{dans {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'cette heure-ci'},
      PAST:'{N,plural,one{-{N} h}other{-{N} h}}',
      FUTURE:'{N,plural,one{+{N} h}other{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'cette minute-ci'},
      PAST:'{N,plural,one{il y a {N} minute}other{il y a {N} minutes}}',
      FUTURE:'{N,plural,one{dans {N} minute}other{dans {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'cette minute-ci'},
      PAST:'{N,plural,one{il y a {N} min}other{il y a {N} min}}',
      FUTURE:'{N,plural,one{dans {N} min}other{dans {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'cette minute-ci'},
      PAST:'{N,plural,one{-{N} min}other{-{N} min}}',
      FUTURE:'{N,plural,one{+{N} min}other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'le mois dernier','0':'ce mois-ci','1':'le mois prochain'},
      PAST:'{N,plural,one{il y a {N} mois}other{il y a {N} mois}}',
      FUTURE:'{N,plural,one{dans {N} mois}other{dans {N} mois}}',
    },
    SHORT:{
      RELATIVE:{'-1':'le mois dernier','0':'ce mois-ci','1':'le mois prochain'},
      PAST:'{N,plural,one{il y a {N} m.}other{il y a {N} m.}}',
      FUTURE:'{N,plural,one{dans {N} m.}other{dans {N} m.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'le mois dernier','0':'ce mois-ci','1':'le mois prochain'},
      PAST:'{N,plural,one{-{N} m.}other{-{N} m.}}',
      FUTURE:'{N,plural,one{+{N} m.}other{+{N} m.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'le trimestre dernier','0':'ce trimestre','1':'le trimestre prochain'},
      PAST:'{N,plural,one{il y a {N} trimestre}other{il y a {N} trimestres}}',
      FUTURE:'{N,plural,one{dans {N} trimestre}other{dans {N} trimestres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'le trimestre dernier','0':'ce trimestre','1':'le trimestre prochain'},
      PAST:'{N,plural,one{il y a {N} trim.}other{il y a {N} trim.}}',
      FUTURE:'{N,plural,one{dans {N} trim.}other{dans {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'le trimestre dernier','0':'ce trimestre','1':'le trimestre prochain'},
      PAST:'{N,plural,one{-{N} trim.}other{-{N} trim.}}',
      FUTURE:'{N,plural,one{+{N} trim.}other{+{N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'maintenant'},
      PAST:'{N,plural,one{il y a {N} seconde}other{il y a {N} secondes}}',
      FUTURE:'{N,plural,one{dans {N} seconde}other{dans {N} secondes}}',
    },
    SHORT:{
      RELATIVE:{'0':'maintenant'},
      PAST:'{N,plural,one{il y a {N} s}other{il y a {N} s}}',
      FUTURE:'{N,plural,one{dans {N} s}other{dans {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'maintenant'},
      PAST:'{N,plural,one{-{N} s}other{-{N} s}}',
      FUTURE:'{N,plural,one{+{N} s}other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'la semaine dernière','0':'cette semaine','1':'la semaine prochaine'},
      PAST:'{N,plural,one{il y a {N} semaine}other{il y a {N} semaines}}',
      FUTURE:'{N,plural,one{dans {N} semaine}other{dans {N} semaines}}',
    },
    SHORT:{
      RELATIVE:{'-1':'la semaine dernière','0':'cette semaine','1':'la semaine prochaine'},
      PAST:'{N,plural,one{il y a {N} sem.}other{il y a {N} sem.}}',
      FUTURE:'{N,plural,one{dans {N} sem.}other{dans {N} sem.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'la semaine dernière','0':'cette semaine','1':'la semaine prochaine'},
      PAST:'{N,plural,one{-{N} sem.}other{-{N} sem.}}',
      FUTURE:'{N,plural,one{+{N} sem.}other{+{N} sem.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'l’année dernière','0':'cette année','1':'l’année prochaine'},
      PAST:'{N,plural,one{il y a {N} an}other{il y a {N} ans}}',
      FUTURE:'{N,plural,one{dans {N} an}other{dans {N} ans}}',
    },
    SHORT:{
      RELATIVE:{'-1':'l’année dernière','0':'cette année','1':'l’année prochaine'},
      PAST:'{N,plural,one{il y a {N} a}other{il y a {N} a}}',
      FUTURE:'{N,plural,one{dans {N} a}other{dans {N} a}}',
    },
    NARROW:{
      RELATIVE:{'-1':'l’année dernière','0':'cette année','1':'l’année prochaine'},
      PAST:'{N,plural,one{-{N} a}other{-{N} a}}',
      FUTURE:'{N,plural,one{+{N} a}other{+{N} a}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_fr_CA =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'hier','-2':'avant-hier','0':'aujourd’hui','1':'demain','2':'après-demain'},
      PAST:'{N,plural,one{il y a {N} jour}other{il y a {N} jours}}',
      FUTURE:'{N,plural,one{dans {N} jour}other{dans {N} jours}}',
    },
    SHORT:{
      RELATIVE:{'-1':'hier','-2':'avant-hier','0':'aujourd’hui','1':'demain','2':'après-demain'},
      PAST:'{N,plural,one{il y a {N} j}other{il y a {N} j}}',
      FUTURE:'{N,plural,other{dans {N} j}}',
    },
    NARROW:{
      RELATIVE:{'-1':'hier','-2':'avant-hier','0':'aujourd’hui','1':'demain','2':'après-demain'},
      PAST:'{N,plural,one{-{N} j}other{-{N} j}}',
      FUTURE:'{N,plural,one{+{N} j}other{+{N} j}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'cette heure-ci'},
      PAST:'{N,plural,one{il y a {N} heure}other{il y a {N} heures}}',
      FUTURE:'{N,plural,one{dans {N} heure}other{dans {N} heures}}',
    },
    SHORT:{
      RELATIVE:{'0':'cette heure-ci'},
      PAST:'{N,plural,one{il y a {N} h}other{il y a {N} h}}',
      FUTURE:'{N,plural,one{dans {N} h}other{dans {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'cette heure-ci'},
      PAST:'{N,plural,one{-{N} h}other{-{N} h}}',
      FUTURE:'{N,plural,one{+{N} h}other{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'cette minute-ci'},
      PAST:'{N,plural,one{il y a {N} minute}other{il y a {N} minutes}}',
      FUTURE:'{N,plural,one{dans {N} minute}other{dans {N} minutes}}',
    },
    SHORT:{
      RELATIVE:{'0':'cette minute-ci'},
      PAST:'{N,plural,one{il y a {N} min}other{il y a {N} min}}',
      FUTURE:'{N,plural,one{dans {N} min}other{dans {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'cette minute-ci'},
      PAST:'{N,plural,one{-{N} min}other{-{N} min}}',
      FUTURE:'{N,plural,one{+{N} min}other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'le mois dernier','0':'ce mois-ci','1':'le mois prochain'},
      PAST:'{N,plural,one{il y a {N} mois}other{il y a {N} mois}}',
      FUTURE:'{N,plural,one{dans {N} mois}other{dans {N} mois}}',
    },
    SHORT:{
      RELATIVE:{'-1':'le mois dernier','0':'ce mois-ci','1':'le mois prochain'},
      PAST:'{N,plural,one{il y a {N} m.}other{il y a {N} m.}}',
      FUTURE:'{N,plural,one{dans {N} m.}other{dans {N} m.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'le mois dernier','0':'ce mois-ci','1':'le mois prochain'},
      PAST:'{N,plural,one{-{N} m.}other{-{N} m.}}',
      FUTURE:'{N,plural,one{+{N} m.}other{+{N} m.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'le trimestre dernier','0':'ce trimestre-ci','1':'le trimestre prochain'},
      PAST:'{N,plural,one{il y a {N} trimestre}other{il y a {N} trimestres}}',
      FUTURE:'{N,plural,one{dans {N} trimestre}other{dans {N} trimestres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'trim. dernier','0':'ce trim.','1':'trim. prochain'},
      PAST:'{N,plural,one{il y a {N} trim.}other{il y a {N} trim.}}',
      FUTURE:'{N,plural,one{dans {N} trim.}other{dans {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'trim. dernier','0':'ce trim.','1':'trim.prochain'},
      PAST:'{N,plural,one{-{N} trim.}other{-{N} trim.}}',
      FUTURE:'{N,plural,one{+{N} trim.}other{+{N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'maintenant'},
      PAST:'{N,plural,one{il y a {N} seconde}other{il y a {N} secondes}}',
      FUTURE:'{N,plural,one{dans {N} seconde}other{dans {N} secondes}}',
    },
    SHORT:{
      RELATIVE:{'0':'maintenant'},
      PAST:'{N,plural,one{il y a {N} s}other{il y a {N} s}}',
      FUTURE:'{N,plural,one{dans {N} s}other{dans {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'maintenant'},
      PAST:'{N,plural,one{-{N} s}other{-{N} s}}',
      FUTURE:'{N,plural,one{+ {N} s}other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'la semaine dernière','0':'cette semaine','1':'la semaine prochaine'},
      PAST:'{N,plural,one{il y a {N} semaine}other{il y a {N} semaines}}',
      FUTURE:'{N,plural,one{dans {N} semaine}other{dans {N} semaines}}',
    },
    SHORT:{
      RELATIVE:{'-1':'la semaine dernière','0':'cette semaine','1':'la semaine prochaine'},
      PAST:'{N,plural,one{il y a {N} sem.}other{il y a {N} sem.}}',
      FUTURE:'{N,plural,one{dans {N} sem.}other{dans {N} sem.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'la semaine dernière','0':'cette semaine','1':'la semaine prochaine'},
      PAST:'{N,plural,one{-{N} sem.}other{-{N} sem.}}',
      FUTURE:'{N,plural,one{+{N} sem.}other{+{N} sem.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'l’année dernière','0':'cette année','1':'l’année prochaine'},
      PAST:'{N,plural,one{Il y a {N} an}other{Il y a {N} ans}}',
      FUTURE:'{N,plural,one{Dans {N} an}other{Dans {N} ans}}',
    },
    SHORT:{
      RELATIVE:{'-1':'l’année dernière','0':'cette année','1':'l’année prochaine'},
      PAST:'{N,plural,one{il y a {N} a}other{il y a {N} a}}',
      FUTURE:'{N,plural,one{dans {N} a}other{dans {N} a}}',
    },
    NARROW:{
      RELATIVE:{'-1':'l’année dernière','0':'cette année','1':'l’année prochaine'},
      PAST:'{N,plural,one{-{N} a}other{-{N} a}}',
      FUTURE:'{N,plural,one{+{N} a}other{+{N} a}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ga =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'inné','-2':'arú inné','0':'inniu','1':'amárach','2':'arú amárach'},
      PAST:'{N,plural,few{{N} lá ó shin}many{{N} lá ó shin}one{{N} lá ó shin}other{{N} lá ó shin}two{{N} lá ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} lá}many{i gceann {N} lá}one{i gceann {N} lá}other{i gceann {N} lá}two{i gceann {N} lá}}',
    },
    SHORT:{
      RELATIVE:{'-1':'inné','-2':'arú inné','0':'inniu','1':'amárach','2':'arú amárach'},
      PAST:'{N,plural,few{{N} lá ó shin}many{{N} lá ó shin}one{{N} lá ó shin}other{{N} lá ó shin}two{{N} lá ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} lá}many{i gceann {N} lá}one{i gceann {N} lá}other{i gceann {N} lá}two{i gceann {N} lá}}',
    },
    NARROW:{
      RELATIVE:{'-1':'inné','-2':'arú inné','0':'inniu','1':'amárach','2':'arú amárach'},
      PAST:'{N,plural,few{-{N} lá}many{-{N} lá}one{-{N} lá}other{-{N} lá}two{-{N} lá}}',
      FUTURE:'{N,plural,few{+{N} lá}many{+{N} lá}one{+{N} lá}other{+{N} lá}two{+{N} lá}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'an uair seo'},
      PAST:'{N,plural,few{{N} huaire an chloig ó shin}many{{N} n-uaire an chloig ó shin}one{{N} uair an chloig ó shin}other{{N} uair an chloig ó shin}two{{N} uair an chloig ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} huaire an chloig}many{i gceann {N} n-uaire an chloig}one{i gceann {N} uair an chloig}other{i gceann {N} uair an chloig}two{i gceann {N} uair an chloig}}',
    },
    SHORT:{
      RELATIVE:{'0':'an uair seo'},
      PAST:'{N,plural,few{{N} huaire ó shin}many{{N} n-uaire ó shin}one{{N} uair ó shin}other{{N} uair ó shin}two{{N} uair ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} huaire}many{i gceann {N} n-uaire}one{i gceann {N} uair}other{i gceann {N} uair}two{i gceann {N} uair}}',
    },
    NARROW:{
      RELATIVE:{'0':'an uair seo'},
      PAST:'{N,plural,few{-{N} u}many{-{N} u}one{-{N} u}other{-{N} u}two{-{N} u}}',
      FUTURE:'{N,plural,few{+{N} u}many{+{N} u}one{+{N} u}other{+{N} u}two{+{N} u}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'an nóiméad seo'},
      PAST:'{N,plural,few{{N} nóiméad ó shin}many{{N} nóiméad ó shin}one{{N} nóiméad ó shin}other{{N} nóiméad ó shin}two{{N} nóiméad ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} nóiméad}many{i gceann {N} nóiméad}one{i gceann {N} nóiméad}other{i gceann {N} nóiméad}two{i gceann {N} nóiméad}}',
    },
    SHORT:{
      RELATIVE:{'0':'an nóiméad seo'},
      PAST:'{N,plural,few{{N} nóim. ó shin}many{{N} nóim. ó shin}one{{N} nóim. ó shin}other{{N} nóim. ó shin}two{{N} nóim. ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} nóim.}many{i gceann {N} nóim.}one{i gceann {N} nóim.}other{i gceann {N} nóim.}two{i gceann {N} nóim.}}',
    },
    NARROW:{
      RELATIVE:{'0':'an nóiméad seo'},
      PAST:'{N,plural,few{-{N} n}many{-{N} n}one{-{N} n}other{-{N} n}two{-{N} n}}',
      FUTURE:'{N,plural,few{+{N} n}many{+{N} n}one{+{N} n}other{+{N} n}two{+{N} n}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'an mhí seo caite','0':'an mhí seo','1':'an mhí seo chugainn'},
      PAST:'{N,plural,few{{N} mhí ó shin}many{{N} mí ó shin}one{{N} mhí ó shin}other{{N} mí ó shin}two{{N} mhí ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} mhí}many{i gceann {N} mí}one{i gceann {N} mhí}other{i gceann {N} mí}two{i gceann {N} mhí}}',
    },
    SHORT:{
      RELATIVE:{'-1':'an mhí seo caite','0':'an mhí seo','1':'an mhí seo chugainn'},
      PAST:'{N,plural,few{{N} mhí ó shin}many{{N} mí ó shin}one{{N} mhí ó shin}other{{N} mí ó shin}two{{N} mhí ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} mhí}many{i gceann {N} mí}one{i gceann {N} mhí}other{i gceann {N} mí}two{i gceann {N} mhí}}',
    },
    NARROW:{
      RELATIVE:{'-1':'an mhí seo caite','0':'an mhí seo','1':'an mhí seo chugainn'},
      PAST:'{N,plural,few{-{N} mhí}many{-{N} mí}one{-{N} mhí}other{-{N} mí}two{-{N} mhí}}',
      FUTURE:'{N,plural,few{+{N} mhí}many{+{N} mí}one{+{N} mhí}other{+{N} mí}two{+{N} mhí}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'an ráithe seo caite','0':'an ráithe seo','1':'an ráithe seo chugainn'},
      PAST:'{N,plural,few{{N} ráithe ó shin}many{{N} ráithe ó shin}one{{N} ráithe ó shin}other{{N} ráithe ó shin}two{{N} ráithe ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} ráithe}many{i gceann {N} ráithe}one{i gceann {N} ráithe}other{i gceann {N} ráithe}two{i gceann {N} ráithe}}',
    },
    SHORT:{
      RELATIVE:{'-1':'an ráithe seo caite','0':'an ráithe seo','1':'an ráithe seo chugainn'},
      PAST:'{N,plural,few{{N} ráithe ó shin}many{{N} ráithe ó shin}one{{N} ráithe ó shin}other{{N} ráithe ó shin}two{{N} ráithe ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} ráithe}many{i gceann {N} ráithe}one{i gceann {N} ráithe}other{i gceann {N} ráithe}two{i gceann {N} ráithe}}',
    },
    NARROW:{
      RELATIVE:{'-1':'an ráithe seo caite','0':'an ráithe seo','1':'an ráithe seo chugainn'},
      PAST:'{N,plural,few{-{N} R}many{-{N} R}one{-{N} R}other{-{N} R}two{-{N} R}}',
      FUTURE:'{N,plural,few{+{N} R}many{+{N} R}one{+{N} R}other{+{N} R}two{+{N} R}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'anois'},
      PAST:'{N,plural,few{{N} shoicind ó shin}many{{N} soicind ó shin}one{{N} soicind ó shin}other{{N} soicind ó shin}two{{N} shoicind ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} shoicind}many{i gceann {N} soicind}one{i gceann {N} soicind}other{i gceann {N} soicind}two{i gceann {N} shoicind}}',
    },
    SHORT:{
      RELATIVE:{'0':'anois'},
      PAST:'{N,plural,few{{N} shoic. ó shin}many{{N} soic. ó shin}one{{N} soic. ó shin}other{{N} soic. ó shin}two{{N} shoic. ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} shoic.}many{i gceann {N} soic.}one{i gceann {N} soic.}other{i gceann {N} soic.}two{i gceann {N} shoic.}}',
    },
    NARROW:{
      RELATIVE:{'0':'anois'},
      PAST:'{N,plural,few{-{N} s}many{-{N} s}one{-{N} s}other{-{N} s}two{-{N} s}}',
      FUTURE:'{N,plural,few{+{N} s}many{+{N} s}one{+{N} s}other{+{N} s}two{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'an tseachtain seo caite','0':'an tseachtain seo','1':'an tseachtain seo chugainn'},
      PAST:'{N,plural,few{{N} seachtaine ó shin}many{{N} seachtaine ó shin}one{{N} seachtain ó shin}other{{N} seachtain ó shin}two{{N} sheachtain ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} seachtaine}many{i gceann {N} seachtaine}one{i gceann {N} seachtain}other{i gceann {N} seachtain}two{i gceann {N} sheachtain}}',
    },
    SHORT:{
      RELATIVE:{'-1':'an tscht. seo caite','0':'an tscht. seo','1':'an tscht. seo chugainn'},
      PAST:'{N,plural,few{{N} scht. ó shin}many{{N} scht. ó shin}one{{N} scht. ó shin}other{{N} scht. ó shin}two{{N} scht. ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} scht.}many{i gceann {N} scht.}one{i gceann {N} scht.}other{i gceann {N} scht.}two{i gceann {N} shcht.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'an tscht. seo caite','0':'an tscht. seo','1':'an tscht. seo chugainn'},
      PAST:'{N,plural,few{-{N} scht.}many{-{N} scht.}one{-{N} scht.}other{-{N} scht.}two{-{N} scht.}}',
      FUTURE:'{N,plural,few{+{N} scht.}many{+{N} scht.}one{+{N} scht.}other{+{N} scht.}two{+{N} scht.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'anuraidh','0':'an bhliain seo','1':'an bhliain seo chugainn'},
      PAST:'{N,plural,few{{N} bliana ó shin}many{{N} mbliana ó shin}one{{N} bhliain ó shin}other{{N} bliain ó shin}two{{N} bhliain ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} bliana}many{i gceann {N} mbliana}one{i gceann {N} bhliain}other{i gceann {N} bliain}two{i gceann {N} bhliain}}',
    },
    SHORT:{
      RELATIVE:{'-1':'anuraidh','0':'an bhl. seo','1':'an bhl. seo chugainn'},
      PAST:'{N,plural,few{{N} bl. ó shin}many{{N} mbl. ó shin}one{{N} bhl. ó shin}other{{N} bl. ó shin}two{{N} bhl. ó shin}}',
      FUTURE:'{N,plural,few{i gceann {N} bl.}many{i gceann {N} mbl.}one{i gceann {N} bl.}other{i gceann {N} bl.}two{i gceann {N} bhl.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'anuraidh','0':'an bhl. seo','1':'an bhl. seo chugainn'},
      PAST:'{N,plural,few{-{N} bl.}many{-{N} mbl.}one{-{N} bhl.}other{-{N} bl.}two{-{N} bhl.}}',
      FUTURE:'{N,plural,few{+{N} bl.}many{+{N} mbl.}one{+{N} bhl.}other{+{N} bl.}two{+{N} bhl.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_gl =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'onte','-2':'antonte','0':'hoxe','1':'mañá','2':'pasadomañá'},
      PAST:'{N,plural,one{hai {N} día}other{hai {N} días}}',
      FUTURE:'{N,plural,one{en {N} día}other{en {N} días}}',
    },
    SHORT:{
      RELATIVE:{'-1':'onte','-2':'antonte','0':'hoxe','1':'mañá','2':'pasadomañá'},
      PAST:'{N,plural,one{hai {N} día}other{hai {N} días}}',
      FUTURE:'{N,plural,one{en {N} día}other{en {N} días}}',
    },
    NARROW:{
      RELATIVE:{'-1':'onte','-2':'antonte','0':'hoxe','1':'mañá','2':'pasadomañá'},
      PAST:'{N,plural,one{hai {N} día}other{hai {N} días}}',
      FUTURE:'{N,plural,one{en {N} día}other{en {N} días}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hai {N} hora}other{hai {N} horas}}',
      FUTURE:'{N,plural,one{en {N} hora}other{en {N} horas}}',
    },
    SHORT:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hai {N} h}other{hai {N} h}}',
      FUTURE:'{N,plural,one{en {N} h}other{en {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{hai {N} h}other{hai {N} h}}',
      FUTURE:'{N,plural,one{en {N} h}other{en {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hai {N} minuto}other{hai {N} minutos}}',
      FUTURE:'{N,plural,one{en {N} minuto}other{en {N} minutos}}',
    },
    SHORT:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hai {N} min}other{hai {N} min}}',
      FUTURE:'{N,plural,one{en {N} min}other{en {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{hai {N} min}other{hai {N} min}}',
      FUTURE:'{N,plural,one{en {N} min}other{en {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'o mes pasado','0':'este mes','1':'o próximo mes'},
      PAST:'{N,plural,one{hai {N} mes}other{hai {N} meses}}',
      FUTURE:'{N,plural,one{en {N} mes}other{en {N} meses}}',
    },
    SHORT:{
      RELATIVE:{'-1':'m. pasado','0':'este m.','1':'m. seguinte'},
      PAST:'{N,plural,one{hai {N} mes}other{hai {N} meses}}',
      FUTURE:'{N,plural,one{en {N} mes}other{en {N} meses}}',
    },
    NARROW:{
      RELATIVE:{'-1':'m. pasado','0':'este m.','1':'m. seguinte'},
      PAST:'{N,plural,one{hai {N} mes}other{hai {N} meses}}',
      FUTURE:'{N,plural,one{en {N} mes}other{en {N} meses}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'o trimestre pasado','0':'este trimestre','1':'o próximo trimestre'},
      PAST:'{N,plural,one{hai {N} trimestre}other{hai {N} trimestres}}',
      FUTURE:'{N,plural,one{en {N} trimestre}other{en {N} trimestres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'trim. pasado','0':'este trim.','1':'trim. seguinte'},
      PAST:'{N,plural,one{hai {N} trim.}other{hai {N} trim.}}',
      FUTURE:'{N,plural,one{en {N} trim.}other{en {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'trim. pasado','0':'este trim.','1':'trim. seguinte'},
      PAST:'{N,plural,one{hai {N} trim.}other{hai {N} trim.}}',
      FUTURE:'{N,plural,one{en {N} trim.}other{en {N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'agora'},
      PAST:'{N,plural,one{hai {N} segundo}other{hai {N} segundos}}',
      FUTURE:'{N,plural,one{en {N} segundo}other{en {N} segundos}}',
    },
    SHORT:{
      RELATIVE:{'0':'agora'},
      PAST:'{N,plural,one{hai {N} s}other{hai {N} s}}',
      FUTURE:'{N,plural,one{en {N} s}other{en {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'agora'},
      PAST:'{N,plural,one{hai {N} s}other{hai {N} s}}',
      FUTURE:'{N,plural,one{en {N} s}other{en {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'a semana pasada','0':'esta semana','1':'a próxima semana'},
      PAST:'{N,plural,one{hai {N} semana}other{hai {N} semanas}}',
      FUTURE:'{N,plural,one{en {N} semana}other{en {N} semanas}}',
    },
    SHORT:{
      RELATIVE:{'-1':'sem. pasada','0':'esta sem.','1':'sem. seguinte'},
      PAST:'{N,plural,one{hai {N} sem.}other{hai {N} sem.}}',
      FUTURE:'{N,plural,one{en {N} sem.}other{en {N} sem.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'sem. pasada','0':'esta sem.','1':'sem. seguinte'},
      PAST:'{N,plural,one{hai {N} sem.}other{hai {N} sem.}}',
      FUTURE:'{N,plural,one{en {N} sem.}other{en {N} sem.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'o ano pasado','0':'este ano','1':'o próximo ano'},
      PAST:'{N,plural,one{hai {N} ano}other{hai {N} anos}}',
      FUTURE:'{N,plural,one{en {N} ano}other{en {N} anos}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ano pasado','0':'este ano','1':'seguinte ano'},
      PAST:'{N,plural,one{hai {N} ano}other{hai {N} anos}}',
      FUTURE:'{N,plural,one{en {N} ano}other{en {N} anos}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ano pasado','0':'este ano','1':'seguinte ano'},
      PAST:'{N,plural,one{hai {N} ano}other{hai {N} anos}}',
      FUTURE:'{N,plural,one{en {N} ano}other{en {N} anos}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_gsw =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'geschter','-2':'vorgeschter','0':'hüt','1':'moorn','2':'übermoorn'},
      PAST:'{N,plural,other{-{N} d}}',
      FUTURE:'{N,plural,other{+{N} d}}',
    },
    SHORT:{
      RELATIVE:{'-1':'geschter','-2':'vorgeschter','0':'hüt','1':'moorn','2':'übermoorn'},
      PAST:'{N,plural,other{-{N} d}}',
      FUTURE:'{N,plural,other{+{N} d}}',
    },
    NARROW:{
      RELATIVE:{'-1':'geschter','-2':'vorgeschter','0':'hüt','1':'moorn','2':'übermoorn'},
      PAST:'{N,plural,other{-{N} d}}',
      FUTURE:'{N,plural,other{+{N} d}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,other{-{N} h}}',
      FUTURE:'{N,plural,other{+{N} h}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,other{-{N} h}}',
      FUTURE:'{N,plural,other{+{N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,other{-{N} h}}',
      FUTURE:'{N,plural,other{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,other{-{N} min}}',
      FUTURE:'{N,plural,other{+{N} min}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,other{-{N} min}}',
      FUTURE:'{N,plural,other{+{N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,other{-{N} min}}',
      FUTURE:'{N,plural,other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,other{-{N} m}}',
      FUTURE:'{N,plural,other{+{N} m}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,other{-{N} m}}',
      FUTURE:'{N,plural,other{+{N} m}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,other{-{N} m}}',
      FUTURE:'{N,plural,other{+{N} m}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,other{-{N} Q}}',
      FUTURE:'{N,plural,other{+{N} Q}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,other{-{N} Q}}',
      FUTURE:'{N,plural,other{+{N} Q}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,other{-{N} Q}}',
      FUTURE:'{N,plural,other{+{N} Q}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,other{-{N} s}}',
      FUTURE:'{N,plural,other{+{N} s}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,other{-{N} s}}',
      FUTURE:'{N,plural,other{+{N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,other{-{N} s}}',
      FUTURE:'{N,plural,other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,other{-{N} w}}',
      FUTURE:'{N,plural,other{+{N} w}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,other{-{N} w}}',
      FUTURE:'{N,plural,other{+{N} w}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,other{-{N} w}}',
      FUTURE:'{N,plural,other{+{N} w}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,other{-{N} y}}',
      FUTURE:'{N,plural,other{+{N} y}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,other{-{N} y}}',
      FUTURE:'{N,plural,other{+{N} y}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,other{-{N} y}}',
      FUTURE:'{N,plural,other{+{N} y}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_gu =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ગઈકાલે','-2':'ગયા પરમદિવસે','0':'આજે','1':'આવતીકાલે','2':'પરમદિવસે'},
      PAST:'{N,plural,one{{N} દિવસ પહેલાં}other{{N} દિવસ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} દિવસમાં}other{{N} દિવસમાં}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ગઈકાલે','-2':'ગયા પરમદિવસે','0':'આજે','1':'આવતીકાલે','2':'પરમદિવસે'},
      PAST:'{N,plural,one{{N} દિવસ પહેલાં}other{{N} દિવસ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} દિવસમાં}other{{N} દિવસમાં}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ગઈકાલે','-2':'ગયા પરમદિવસે','0':'આજે','1':'આવતીકાલે','2':'પરમદિવસે'},
      PAST:'{N,plural,one{{N} દિવસ પહેલાં}other{{N} દિવસ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} દિવસમાં}other{{N} દિવસમાં}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'આ કલાક'},
      PAST:'{N,plural,one{{N} કલાક પહેલાં}other{{N} કલાક પહેલાં}}',
      FUTURE:'{N,plural,one{{N} કલાકમાં}other{{N} કલાકમાં}}',
    },
    SHORT:{
      RELATIVE:{'0':'આ કલાક'},
      PAST:'{N,plural,one{{N} કલાક પહેલાં}other{{N} કલાક પહેલાં}}',
      FUTURE:'{N,plural,one{{N} કલાકમાં}other{{N} કલાકમાં}}',
    },
    NARROW:{
      RELATIVE:{'0':'આ કલાક'},
      PAST:'{N,plural,one{{N} કલાક પહેલાં}other{{N} કલાક પહેલાં}}',
      FUTURE:'{N,plural,one{{N} કલાકમાં}other{{N} કલાકમાં}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'આ મિનિટ'},
      PAST:'{N,plural,one{{N} મિનિટ પહેલાં}other{{N} મિનિટ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} મિનિટમાં}other{{N} મિનિટમાં}}',
    },
    SHORT:{
      RELATIVE:{'0':'આ મિનિટ'},
      PAST:'{N,plural,one{{N} મિનિટ પહેલાં}other{{N} મિનિટ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} મિનિટમાં}other{{N} મિનિટમાં}}',
    },
    NARROW:{
      RELATIVE:{'0':'આ મિનિટ'},
      PAST:'{N,plural,one{{N} મિનિટ પહેલાં}other{{N} મિનિટ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} મિનિટમાં}other{{N} મિનિટમાં}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ગયા મહિને','0':'આ મહિને','1':'આવતા મહિને'},
      PAST:'{N,plural,one{{N} મહિના પહેલાં}other{{N} મહિના પહેલાં}}',
      FUTURE:'{N,plural,one{{N} મહિનામાં}other{{N} મહિનામાં}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ગયા મહિને','0':'આ મહિને','1':'આવતા મહિને'},
      PAST:'{N,plural,one{{N} મહિના પહેલાં}other{{N} મહિના પહેલાં}}',
      FUTURE:'{N,plural,one{{N} મહિનામાં}other{{N} મહિનામાં}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ગયા મહિને','0':'આ મહિને','1':'આવતા મહિને'},
      PAST:'{N,plural,one{{N} મહિના પહેલાં}other{{N} મહિના પહેલાં}}',
      FUTURE:'{N,plural,one{{N} મહિનામાં}other{{N} મહિનામાં}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'છેલ્લું ત્રિમાસિક','0':'આ ત્રિમાસિક','1':'પછીનું ત્રિમાસિક'},
      PAST:'{N,plural,one{{N} ત્રિમાસિક પહેલાં}other{{N} ત્રિમાસિક પહેલાં}}',
      FUTURE:'{N,plural,one{{N} ત્રિમાસિકમાં}other{{N} ત્રિમાસિકમાં}}',
    },
    SHORT:{
      RELATIVE:{'-1':'છેલ્લું ત્રિમાસિક','0':'આ ત્રિમાસિક','1':'પછીનું ત્રિમાસિક'},
      PAST:'{N,plural,one{{N} ત્રિમાસિક પહેલાં}other{{N} ત્રિમાસિક પહેલાં}}',
      FUTURE:'{N,plural,one{{N} ત્રિમાસિકમાં}other{{N} ત્રિમાસિકમાં}}',
    },
    NARROW:{
      RELATIVE:{'-1':'છેલ્લું ત્રિમાસિક','0':'આ ત્રિમાસિક','1':'પછીનું ત્રિમાસિક'},
      PAST:'{N,plural,one{{N} ત્રિમાસિક પહેલાં}other{{N} ત્રિમાસિક પહેલાં}}',
      FUTURE:'{N,plural,one{{N} ત્રિમાસિકમાં}other{{N} ત્રિમાસિકમાં}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'હમણાં'},
      PAST:'{N,plural,one{{N} સેકંડ પહેલાં}other{{N} સેકંડ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} સેકંડમાં}other{{N} સેકંડમાં}}',
    },
    SHORT:{
      RELATIVE:{'0':'હમણાં'},
      PAST:'{N,plural,one{{N} સેકંડ પહેલાં}other{{N} સેકંડ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} સેકંડમાં}other{{N} સેકંડમાં}}',
    },
    NARROW:{
      RELATIVE:{'0':'હમણાં'},
      PAST:'{N,plural,one{{N} સેકંડ પહેલાં}other{{N} સેકંડ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} સેકંડમાં}other{{N} સેકંડમાં}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'ગયા અઠવાડિયે','0':'આ અઠવાડિયે','1':'આવતા અઠવાડિયે'},
      PAST:'{N,plural,one{{N} અઠવાડિયા પહેલાં}other{{N} અઠવાડિયા પહેલાં}}',
      FUTURE:'{N,plural,one{{N} અઠવાડિયામાં}other{{N} અઠવાડિયામાં}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ગયા અઠવાડિયે','0':'આ અઠવાડિયે','1':'આવતા અઠવાડિયે'},
      PAST:'{N,plural,one{{N} અઠ. પહેલાં}other{{N} અઠ. પહેલાં}}',
      FUTURE:'{N,plural,one{{N} અઠ. માં}other{{N} અઠ. માં}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ગયા અઠવાડિયે','0':'આ અઠવાડિયે','1':'આવતા અઠવાડિયે'},
      PAST:'{N,plural,one{{N} અઠ. પહેલાં}other{{N} અઠ. પહેલાં}}',
      FUTURE:'{N,plural,one{{N} અઠ. માં}other{{N} અઠ. માં}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ગયા વર્ષે','0':'આ વર્ષે','1':'આવતા વર્ષે'},
      PAST:'{N,plural,one{{N} વર્ષ પહેલાં}other{{N} વર્ષ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} વર્ષમાં}other{{N} વર્ષમાં}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ગયા વર્ષે','0':'આ વર્ષે','1':'આવતા વર્ષે'},
      PAST:'{N,plural,one{{N} વર્ષ પહેલાં}other{{N} વર્ષ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} વર્ષમાં}other{{N} વર્ષમાં}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ગયા વર્ષે','0':'આ વર્ષે','1':'આવતા વર્ષે'},
      PAST:'{N,plural,one{{N} વર્ષ પહેલાં}other{{N} વર્ષ પહેલાં}}',
      FUTURE:'{N,plural,one{{N} વર્ષમાં}other{{N} વર્ષમાં}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_haw =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,other{-{N} d}}',
      FUTURE:'{N,plural,other{+{N} d}}',
    },
    SHORT:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,other{-{N} d}}',
      FUTURE:'{N,plural,other{+{N} d}}',
    },
    NARROW:{
      RELATIVE:{'-1':'yesterday','0':'today','1':'tomorrow'},
      PAST:'{N,plural,other{-{N} d}}',
      FUTURE:'{N,plural,other{+{N} d}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,other{-{N} h}}',
      FUTURE:'{N,plural,other{+{N} h}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,other{-{N} h}}',
      FUTURE:'{N,plural,other{+{N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,other{-{N} h}}',
      FUTURE:'{N,plural,other{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,other{-{N} min}}',
      FUTURE:'{N,plural,other{+{N} min}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,other{-{N} min}}',
      FUTURE:'{N,plural,other{+{N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,other{-{N} min}}',
      FUTURE:'{N,plural,other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,other{-{N} m}}',
      FUTURE:'{N,plural,other{+{N} m}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,other{-{N} m}}',
      FUTURE:'{N,plural,other{+{N} m}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,other{-{N} m}}',
      FUTURE:'{N,plural,other{+{N} m}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,other{-{N} Q}}',
      FUTURE:'{N,plural,other{+{N} Q}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,other{-{N} Q}}',
      FUTURE:'{N,plural,other{+{N} Q}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,other{-{N} Q}}',
      FUTURE:'{N,plural,other{+{N} Q}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,other{-{N} s}}',
      FUTURE:'{N,plural,other{+{N} s}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,other{-{N} s}}',
      FUTURE:'{N,plural,other{+{N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,other{-{N} s}}',
      FUTURE:'{N,plural,other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,other{-{N} w}}',
      FUTURE:'{N,plural,other{+{N} w}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,other{-{N} w}}',
      FUTURE:'{N,plural,other{+{N} w}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,other{-{N} w}}',
      FUTURE:'{N,plural,other{+{N} w}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,other{-{N} y}}',
      FUTURE:'{N,plural,other{+{N} y}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,other{-{N} y}}',
      FUTURE:'{N,plural,other{+{N} y}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,other{-{N} y}}',
      FUTURE:'{N,plural,other{+{N} y}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_he =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'אתמול','-2':'שלשום','0':'היום','1':'מחר','2':'מחרתיים'},
      PAST:'{N,plural,many{לפני {N} ימים}one{לפני יום {N}}other{לפני {N} ימים}two{לפני יומיים}}',
      FUTURE:'{N,plural,many{בעוד {N} ימים}one{בעוד יום {N}}other{בעוד {N} ימים}two{בעוד יומיים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'אתמול','-2':'שלשום','0':'היום','1':'מחר','2':'מחרתיים'},
      PAST:'{N,plural,many{לפני {N} ימים}one{אתמול}other{לפני {N} ימים}two{לפני יומיים}}',
      FUTURE:'{N,plural,many{בעוד {N} ימים}one{מחר}other{בעוד {N} ימים}two{בעוד יומיים}}',
    },
    NARROW:{
      RELATIVE:{'-1':'אתמול','-2':'שלשום','0':'היום','1':'מחר'},
      PAST:'{N,plural,many{לפני {N} ימים}one{אתמול}other{לפני {N} ימים}two{לפני יומיים}}',
      FUTURE:'{N,plural,many{בעוד {N} ימים}one{מחר}other{בעוד {N} ימים}two{בעוד יומיים}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'בשעה זו'},
      PAST:'{N,plural,many{לפני {N} שעות}one{לפני שעה}other{לפני {N} שעות}two{לפני שעתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שעות}one{בעוד שעה}other{בעוד {N} שעות}two{בעוד שעתיים}}',
    },
    SHORT:{
      RELATIVE:{'0':'בשעה זו'},
      PAST:'{N,plural,many{לפני {N} שע׳}one{לפני שעה}other{לפני {N} שע׳}two{לפני שעתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שע׳}one{בעוד שעה}other{בעוד {N} שע׳}two{בעוד שעתיים}}',
    },
    NARROW:{
      RELATIVE:{'0':'בשעה זו'},
      PAST:'{N,plural,many{לפני {N} שע׳}one{לפני שעה}other{לפני {N} שע׳}two{לפני שעתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שע׳}one{בעוד שעה}other{בעוד {N} שע׳}two{בעוד שעתיים}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'בדקה זו'},
      PAST:'{N,plural,many{לפני {N} דקות}one{לפני דקה}other{לפני {N} דקות}two{לפני שתי דקות}}',
      FUTURE:'{N,plural,many{בעוד {N} דקות}one{בעוד דקה}other{בעוד {N} דקות}two{בעוד שתי דקות}}',
    },
    SHORT:{
      RELATIVE:{'0':'בדקה זו'},
      PAST:'{N,plural,many{לפני {N} דק׳}one{לפני דקה}other{לפני {N} דק׳}two{לפני {N} דק׳}}',
      FUTURE:'{N,plural,many{בעוד {N} דק׳}one{בעוד דקה}other{בעוד {N} דק׳}two{בעוד שתי דק׳}}',
    },
    NARROW:{
      RELATIVE:{'0':'בדקה זו'},
      PAST:'{N,plural,many{לפני {N} דק׳}one{לפני דקה}other{לפני {N} דק׳}two{לפני שתי דק׳}}',
      FUTURE:'{N,plural,many{בעוד {N} דק׳}one{בעוד דקה}other{בעוד {N} דק׳}two{בעוד שתי דק׳}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'החודש שעבר','0':'החודש','1':'החודש הבא'},
      PAST:'{N,plural,many{לפני {N} חודשים}one{לפני חודש}other{לפני {N} חודשים}two{לפני חודשיים}}',
      FUTURE:'{N,plural,many{בעוד {N} חודשים}one{בעוד חודש}other{בעוד {N} חודשים}two{בעוד חודשיים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'החודש שעבר','0':'החודש','1':'החודש הבא'},
      PAST:'{N,plural,many{לפני {N} חודשים}one{לפני חודש}other{לפני {N} חודשים}two{לפני חודשיים}}',
      FUTURE:'{N,plural,many{בעוד {N} חודשים}one{בעוד חודש}other{בעוד {N} חודשים}two{בעוד חודשיים}}',
    },
    NARROW:{
      RELATIVE:{'-1':'החודש שעבר','0':'החודש','1':'החודש הבא'},
      PAST:'{N,plural,many{לפני {N} חו׳}one{לפני חו׳}other{לפני {N} חו׳}two{לפני חודשיים}}',
      FUTURE:'{N,plural,many{בעוד {N} חו׳}one{בעוד חו׳}other{בעוד {N} חו׳}two{בעוד חודשיים}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'הרבעון הקודם','0':'רבעון זה','1':'הרבעון הבא'},
      PAST:'{N,plural,many{לפני {N} רבעונים}one{ברבעון הקודם}other{לפני {N} רבעונים}two{לפני שני רבעונים}}',
      FUTURE:'{N,plural,many{בעוד {N} רבעונים}one{ברבעון הבא}other{בעוד {N} רבעונים}two{בעוד שני רבעונים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'הרבעון הקודם','0':'רבעון זה','1':'הרבעון הבא'},
      PAST:'{N,plural,many{לפני {N} רבע׳}one{ברבע׳ הקודם}other{לפני {N} רבע׳}two{לפני שני רבע׳}}',
      FUTURE:'{N,plural,many{בעוד {N} רבע׳}one{ברבע׳ הבא}other{בעוד {N} רבע׳}two{בעוד שני רבע׳}}',
    },
    NARROW:{
      RELATIVE:{'-1':'הרבעון הקודם','0':'רבעון זה','1':'הרבעון הבא'},
      PAST:'{N,plural,many{לפני {N} רבע׳}one{ברבע׳ הקודם}other{לפני {N} רבע׳}two{לפני שני רבע׳}}',
      FUTURE:'{N,plural,many{בעוד {N} רבע׳}one{ברבע׳ הבא}other{בעוד {N} רבע׳}two{בעוד שני רבע׳}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'עכשיו'},
      PAST:'{N,plural,many{לפני {N} שניות}one{לפני שנייה}other{לפני {N} שניות}two{לפני שתי שניות}}',
      FUTURE:'{N,plural,many{בעוד {N} שניות}one{בעוד שנייה}other{בעוד {N} שניות}two{בעוד שתי שניות}}',
    },
    SHORT:{
      RELATIVE:{'0':'עכשיו'},
      PAST:'{N,plural,many{לפני {N} שנ׳}one{לפני שנ׳}other{לפני {N} שנ׳}two{לפני שתי שנ׳}}',
      FUTURE:'{N,plural,many{בעוד {N} שנ׳}one{בעוד שנ׳}other{בעוד {N} שנ׳}two{בעוד שתי שנ׳}}',
    },
    NARROW:{
      RELATIVE:{'0':'עכשיו'},
      PAST:'{N,plural,many{לפני {N} שנ׳}one{לפני שנ׳}other{לפני {N} שנ׳}two{לפני שתי שנ׳}}',
      FUTURE:'{N,plural,many{בעוד {N} שנ׳}one{בעוד שנ׳}other{בעוד {N} שנ׳}two{בעוד שתי שנ׳}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'השבוע שעבר','0':'השבוע','1':'השבוע הבא'},
      PAST:'{N,plural,many{לפני {N} שבועות}one{לפני שבוע}other{לפני {N} שבועות}two{לפני שבועיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שבועות}one{בעוד שבוע}other{בעוד {N} שבועות}two{בעוד שבועיים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'השבוע שעבר','0':'השבוע','1':'השבוע הבא'},
      PAST:'{N,plural,many{לפני {N} שב׳}one{לפני שב׳}other{לפני {N} שב׳}two{לפני שבועיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שב׳}one{בעוד שב׳}other{בעוד {N} שב׳}two{בעוד שבועיים}}',
    },
    NARROW:{
      RELATIVE:{'-1':'השבוע שעבר','0':'השבוע','1':'השבוע הבא'},
      PAST:'{N,plural,many{לפני {N} שב׳}one{לפני שבוע}other{לפני {N} שב׳}two{לפני שבועיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שב׳}one{בעוד שב׳}other{בעוד {N} שב׳}two{בעוד שבועיים}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'השנה שעברה','0':'השנה','1':'השנה הבאה'},
      PAST:'{N,plural,many{לפני {N} שנה}one{לפני שנה}other{לפני {N} שנים}two{לפני שנתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שנה}one{בעוד שנה}other{בעוד {N} שנים}two{בעוד שנתיים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'השנה שעברה','0':'השנה','1':'השנה הבאה'},
      PAST:'{N,plural,many{לפני {N} שנה}one{לפני שנה}other{לפני {N} שנים}two{לפני שנתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שנה}one{בעוד שנה}other{בעוד {N} שנים}two{בעוד שנתיים}}',
    },
    NARROW:{
      RELATIVE:{'-1':'השנה שעברה','0':'השנה','1':'השנה הבאה'},
      PAST:'{N,plural,many{לפני {N} שנה}one{לפני שנה}other{לפני {N} שנים}two{לפני שנתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שנה}one{בעוד שנה}other{בעוד {N} שנים}two{בעוד שנתיים}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_hi =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'कल','-2':'परसों','0':'आज','1':'कल','2':'परसों'},
      PAST:'{N,plural,one{{N} दिन पहले}other{{N} दिन पहले}}',
      FUTURE:'{N,plural,one{{N} दिन में}other{{N} दिन में}}',
    },
    SHORT:{
      RELATIVE:{'-1':'कल','-2':'परसों','0':'आज','1':'कल','2':'परसों'},
      PAST:'{N,plural,one{{N} दिन पहले}other{{N} दिन पहले}}',
      FUTURE:'{N,plural,one{{N} दिन में}other{{N} दिन में}}',
    },
    NARROW:{
      RELATIVE:{'-1':'कल','-2':'परसों','0':'आज','1':'कल','2':'परसों'},
      PAST:'{N,plural,one{{N} दिन पहले}other{{N} दिन पहले}}',
      FUTURE:'{N,plural,one{{N} दिन में}other{{N} दिन में}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'यह घंटा'},
      PAST:'{N,plural,one{{N} घंटे पहले}other{{N} घंटे पहले}}',
      FUTURE:'{N,plural,one{{N} घंटे में}other{{N} घंटे में}}',
    },
    SHORT:{
      RELATIVE:{'0':'यह घंटा'},
      PAST:'{N,plural,one{{N} घं॰ पहले}other{{N} घं॰ पहले}}',
      FUTURE:'{N,plural,one{{N} घं॰ में}other{{N} घं॰ में}}',
    },
    NARROW:{
      RELATIVE:{'0':'यह घंटा'},
      PAST:'{N,plural,one{{N} घं॰ पहले}other{{N} घं॰ पहले}}',
      FUTURE:'{N,plural,one{{N} घं॰ में}other{{N} घं॰ में}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'यह मिनट'},
      PAST:'{N,plural,one{{N} मिनट पहले}other{{N} मिनट पहले}}',
      FUTURE:'{N,plural,one{{N} मिनट में}other{{N} मिनट में}}',
    },
    SHORT:{
      RELATIVE:{'0':'यह मिनट'},
      PAST:'{N,plural,one{{N} मि॰ पहले}other{{N} मि॰ पहले}}',
      FUTURE:'{N,plural,one{{N} मि॰ में}other{{N} मि॰ में}}',
    },
    NARROW:{
      RELATIVE:{'0':'यह मिनट'},
      PAST:'{N,plural,one{{N} मि॰ पहले}other{{N} मि॰ पहले}}',
      FUTURE:'{N,plural,one{{N} मि॰ में}other{{N} मि॰ में}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'पिछला माह','0':'इस माह','1':'अगला माह'},
      PAST:'{N,plural,one{{N} माह पहले}other{{N} माह पहले}}',
      FUTURE:'{N,plural,one{{N} माह में}other{{N} माह में}}',
    },
    SHORT:{
      RELATIVE:{'-1':'पिछला माह','0':'इस माह','1':'अगला माह'},
      PAST:'{N,plural,one{{N} माह पहले}other{{N} माह पहले}}',
      FUTURE:'{N,plural,one{{N} माह में}other{{N} माह में}}',
    },
    NARROW:{
      RELATIVE:{'-1':'पिछला माह','0':'इस माह','1':'अगला माह'},
      PAST:'{N,plural,one{{N} माह पहले}other{{N} माह पहले}}',
      FUTURE:'{N,plural,one{{N} माह में}other{{N} माह में}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'अंतिम तिमाही','0':'इस तिमाही','1':'अगली तिमाही'},
      PAST:'{N,plural,one{{N} तिमाही पहले}other{{N} तिमाही पहले}}',
      FUTURE:'{N,plural,one{{N} तिमाही में}other{{N} तिमाहियों में}}',
    },
    SHORT:{
      RELATIVE:{'-1':'अंतिम तिमाही','0':'इस तिमाही','1':'अगली तिमाही'},
      PAST:'{N,plural,one{{N} तिमाही पहले}other{{N} तिमाहियों पहले}}',
      FUTURE:'{N,plural,one{{N} तिमाही में}other{{N} तिमाहियों में}}',
    },
    NARROW:{
      RELATIVE:{'-1':'अंतिम तिमाही','0':'इस तिमाही','1':'अगली तिमाही'},
      PAST:'{N,plural,one{{N} ति॰ पहले}other{{N} ति॰ पहले}}',
      FUTURE:'{N,plural,one{{N} ति॰ में}other{{N} ति॰ में}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'अब'},
      PAST:'{N,plural,one{{N} सेकंड पहले}other{{N} सेकंड पहले}}',
      FUTURE:'{N,plural,one{{N} सेकंड में}other{{N} सेकंड में}}',
    },
    SHORT:{
      RELATIVE:{'0':'अब'},
      PAST:'{N,plural,one{{N} से॰ पहले}other{{N} से॰ पहले}}',
      FUTURE:'{N,plural,one{{N} से॰ में}other{{N} से॰ में}}',
    },
    NARROW:{
      RELATIVE:{'0':'अब'},
      PAST:'{N,plural,one{{N} से॰ पहले}other{{N} से॰ पहले}}',
      FUTURE:'{N,plural,one{{N} से॰ में}other{{N} से॰ में}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'पिछला सप्ताह','0':'इस सप्ताह','1':'अगला सप्ताह'},
      PAST:'{N,plural,one{{N} सप्ताह पहले}other{{N} सप्ताह पहले}}',
      FUTURE:'{N,plural,one{{N} सप्ताह में}other{{N} सप्ताह में}}',
    },
    SHORT:{
      RELATIVE:{'-1':'पिछला सप्ताह','0':'इस सप्ताह','1':'अगला सप्ताह'},
      PAST:'{N,plural,one{{N} सप्ताह पहले}other{{N} सप्ताह पहले}}',
      FUTURE:'{N,plural,one{{N} सप्ताह में}other{{N} सप्ताह में}}',
    },
    NARROW:{
      RELATIVE:{'-1':'पिछला सप्ताह','0':'इस सप्ताह','1':'अगला सप्ताह'},
      PAST:'{N,plural,one{{N} सप्ताह पहले}other{{N} सप्ताह पहले}}',
      FUTURE:'{N,plural,one{{N} सप्ताह में}other{{N} सप्ताह में}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'पिछला वर्ष','0':'इस वर्ष','1':'अगला वर्ष'},
      PAST:'{N,plural,one{{N} वर्ष पहले}other{{N} वर्ष पहले}}',
      FUTURE:'{N,plural,one{{N} वर्ष में}other{{N} वर्ष में}}',
    },
    SHORT:{
      RELATIVE:{'-1':'पिछला वर्ष','0':'इस वर्ष','1':'अगला वर्ष'},
      PAST:'{N,plural,one{{N} वर्ष पहले}other{{N} वर्ष पहले}}',
      FUTURE:'{N,plural,one{{N} वर्ष में}other{{N} वर्ष में}}',
    },
    NARROW:{
      RELATIVE:{'-1':'पिछला वर्ष','0':'इस वर्ष','1':'अगला वर्ष'},
      PAST:'{N,plural,one{{N} वर्ष पहले}other{{N} वर्ष पहले}}',
      FUTURE:'{N,plural,one{{N} वर्ष में}other{{N} वर्ष में}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_hr =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'jučer','-2':'prekjučer','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{prije {N} dana}one{prije {N} dan}other{prije {N} dana}}',
      FUTURE:'{N,plural,few{za {N} dana}one{za {N} dan}other{za {N} dana}}',
    },
    SHORT:{
      RELATIVE:{'-1':'jučer','-2':'prekjučer','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{prije {N} dana}one{prije {N} dan}other{prije {N} dana}}',
      FUTURE:'{N,plural,few{za {N} dana}one{za {N} dan}other{za {N} dana}}',
    },
    NARROW:{
      RELATIVE:{'-1':'jučer','-2':'prekjučer','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{prije {N} d}one{prije {N} d}other{prije {N} d}}',
      FUTURE:'{N,plural,few{za {N} d}one{za {N} d}other{za {N} d}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ovaj sat'},
      PAST:'{N,plural,few{prije {N} sata}one{prije {N} sat}other{prije {N} sati}}',
      FUTURE:'{N,plural,few{za {N} sata}one{za {N} sat}other{za {N} sati}}',
    },
    SHORT:{
      RELATIVE:{'0':'ovaj sat'},
      PAST:'{N,plural,few{prije {N} h}one{prije {N} h}other{prije {N} h}}',
      FUTURE:'{N,plural,few{za {N} h}one{za {N} h}other{za {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'ovaj sat'},
      PAST:'{N,plural,few{prije {N} h}one{prije {N} h}other{prije {N} h}}',
      FUTURE:'{N,plural,few{za {N} h}one{za {N} h}other{za {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ova minuta'},
      PAST:'{N,plural,few{prije {N} minute}one{prije {N} minutu}other{prije {N} minuta}}',
      FUTURE:'{N,plural,few{za {N} minute}one{za {N} minutu}other{za {N} minuta}}',
    },
    SHORT:{
      RELATIVE:{'0':'ova minuta'},
      PAST:'{N,plural,few{prije {N} min}one{prije {N} min}other{prije {N} min}}',
      FUTURE:'{N,plural,few{za {N} min}one{za {N} min}other{za {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'ova minuta'},
      PAST:'{N,plural,few{prije {N} min}one{prije {N} min}other{prije {N} min}}',
      FUTURE:'{N,plural,few{za {N} min}one{za {N} min}other{za {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'prošli mjesec','0':'ovaj mjesec','1':'sljedeći mjesec'},
      PAST:'{N,plural,few{prije {N} mjeseca}one{prije {N} mjesec}other{prije {N} mjeseci}}',
      FUTURE:'{N,plural,few{za {N} mjeseca}one{za {N} mjesec}other{za {N} mjeseci}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošli mj.','0':'ovaj mj.','1':'sljedeći mj.'},
      PAST:'{N,plural,few{prije {N} mj.}one{prije {N} mj.}other{prije {N} mj.}}',
      FUTURE:'{N,plural,few{za {N} mj.}one{za {N} mj.}other{za {N} mj.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošli mj.','0':'ovaj mj.','1':'sljedeći mj.'},
      PAST:'{N,plural,few{prije {N} mj.}one{prije {N} mj.}other{prije {N} mj.}}',
      FUTURE:'{N,plural,few{za {N} mj.}one{za {N} mj.}other{za {N} mj.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'prošli kvartal','0':'ovaj kvartal','1':'sljedeći kvartal'},
      PAST:'{N,plural,few{prije {N} kvartala}one{prije {N} kvartal}other{prije {N} kvartala}}',
      FUTURE:'{N,plural,few{za {N} kvartala}one{za {N} kvartal}other{za {N} kvartala}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošli kv.','0':'ovaj kv.','1':'sljedeći kv.'},
      PAST:'{N,plural,few{prije {N} kv.}one{prije {N} kv.}other{prije {N} kv.}}',
      FUTURE:'{N,plural,few{za {N} kv.}one{za {N} kv.}other{za {N} kv.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošli kv.','0':'ovaj kv.','1':'sljedeći kv.'},
      PAST:'{N,plural,few{prije {N} kv.}one{prije {N} kv.}other{prije {N} kv.}}',
      FUTURE:'{N,plural,few{za {N} kv.}one{za {N} kv.}other{za {N} kv.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'sad'},
      PAST:'{N,plural,few{prije {N} sekunde}one{prije {N} sekundu}other{prije {N} sekundi}}',
      FUTURE:'{N,plural,few{za {N} sekunde}one{za {N} sekundu}other{za {N} sekundi}}',
    },
    SHORT:{
      RELATIVE:{'0':'sad'},
      PAST:'{N,plural,few{prije {N} s}one{prije {N} s}other{prije {N} s}}',
      FUTURE:'{N,plural,few{za {N} s}one{za {N} s}other{za {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'sad'},
      PAST:'{N,plural,few{prije {N} s}one{prije {N} s}other{prije {N} s}}',
      FUTURE:'{N,plural,few{za {N} s}one{za {N} s}other{za {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'prošli tjedan','0':'ovaj tjedan','1':'sljedeći tjedan'},
      PAST:'{N,plural,few{prije {N} tjedna}one{prije {N} tjedan}other{prije {N} tjedana}}',
      FUTURE:'{N,plural,few{za {N} tjedna}one{za {N} tjedan}other{za {N} tjedana}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošli tj.','0':'ovaj tj.','1':'sljedeći tj.'},
      PAST:'{N,plural,few{prije {N} tj.}one{prije {N} tj.}other{prije {N} tj.}}',
      FUTURE:'{N,plural,few{za {N} tj.}one{za {N} tj.}other{za {N} tj.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošli tj.','0':'ovaj tj.','1':'sljedeći tj.'},
      PAST:'{N,plural,few{prije {N} tj.}one{prije {N} tj.}other{prije {N} tj.}}',
      FUTURE:'{N,plural,few{za {N} tj.}one{za {N} tj.}other{za {N} tj.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'prošle godine','0':'ove godine','1':'sljedeće godine'},
      PAST:'{N,plural,few{prije {N} godine}one{prije {N} godinu}other{prije {N} godina}}',
      FUTURE:'{N,plural,few{za {N} godine}one{za {N} godinu}other{za {N} godina}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošle god.','0':'ove god.','1':'sljedeće god.'},
      PAST:'{N,plural,few{prije {N} g.}one{prije {N} g.}other{prije {N} g.}}',
      FUTURE:'{N,plural,few{za {N} g.}one{za {N} g.}other{za {N} g.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošle g.','0':'ove g.','1':'sljedeće g.'},
      PAST:'{N,plural,few{prije {N} g.}one{prije {N} g.}other{prije {N} g.}}',
      FUTURE:'{N,plural,few{za {N} g.}one{za {N} g.}other{za {N} g.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_hu =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'tegnap','-2':'tegnapelőtt','0':'ma','1':'holnap','2':'holnapután'},
      PAST:'{N,plural,one{{N} nappal ezelőtt}other{{N} nappal ezelőtt}}',
      FUTURE:'{N,plural,one{{N} nap múlva}other{{N} nap múlva}}',
    },
    SHORT:{
      RELATIVE:{'-1':'tegnap','-2':'tegnapelőtt','0':'ma','1':'holnap','2':'holnapután'},
      PAST:'{N,plural,one{{N} napja}other{{N} napja}}',
      FUTURE:'{N,plural,one{{N} nap múlva}other{{N} nap múlva}}',
    },
    NARROW:{
      RELATIVE:{'-1':'tegnap','-2':'tegnapelőtt','0':'ma','1':'holnap','2':'holnapután'},
      PAST:'{N,plural,one{{N} napja}other{{N} napja}}',
      FUTURE:'{N,plural,one{{N} nap múlva}other{{N} nap múlva}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ebben az órában'},
      PAST:'{N,plural,one{{N} órával ezelőtt}other{{N} órával ezelőtt}}',
      FUTURE:'{N,plural,one{{N} óra múlva}other{{N} óra múlva}}',
    },
    SHORT:{
      RELATIVE:{'0':'ebben az órában'},
      PAST:'{N,plural,one{{N} órával ezelőtt}other{{N} órával ezelőtt}}',
      FUTURE:'{N,plural,one{{N} óra múlva}other{{N} óra múlva}}',
    },
    NARROW:{
      RELATIVE:{'0':'ebben az órában'},
      PAST:'{N,plural,one{{N} órával ezelőtt}other{{N} órával ezelőtt}}',
      FUTURE:'{N,plural,one{{N} óra múlva}other{{N} óra múlva}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ebben a percben'},
      PAST:'{N,plural,one{{N} perccel ezelőtt}other{{N} perccel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} perc múlva}other{{N} perc múlva}}',
    },
    SHORT:{
      RELATIVE:{'0':'ebben a percben'},
      PAST:'{N,plural,one{{N} perccel ezelőtt}other{{N} perccel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} perc múlva}other{{N} perc múlva}}',
    },
    NARROW:{
      RELATIVE:{'0':'ebben a percben'},
      PAST:'{N,plural,one{{N} perccel ezelőtt}other{{N} perccel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} perc múlva}other{{N} perc múlva}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'előző hónap','0':'ez a hónap','1':'következő hónap'},
      PAST:'{N,plural,one{{N} hónappal ezelőtt}other{{N} hónappal ezelőtt}}',
      FUTURE:'{N,plural,one{{N} hónap múlva}other{{N} hónap múlva}}',
    },
    SHORT:{
      RELATIVE:{'-1':'előző hónap','0':'ez a hónap','1':'következő hónap'},
      PAST:'{N,plural,one{{N} hónappal ezelőtt}other{{N} hónappal ezelőtt}}',
      FUTURE:'{N,plural,one{{N} hónap múlva}other{{N} hónap múlva}}',
    },
    NARROW:{
      RELATIVE:{'-1':'előző hónap','0':'ez a hónap','1':'következő hónap'},
      PAST:'{N,plural,one{{N} hónappal ezelőtt}other{{N} hónappal ezelőtt}}',
      FUTURE:'{N,plural,one{{N} hónap múlva}other{{N} hónap múlva}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'előző negyedév','0':'ez a negyedév','1':'következő negyedév'},
      PAST:'{N,plural,one{{N} negyedévvel ezelőtt}other{{N} negyedévvel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} negyedév múlva}other{{N} negyedév múlva}}',
    },
    SHORT:{
      RELATIVE:{'-1':'előző negyedév','0':'ez a negyedév','1':'következő negyedév'},
      PAST:'{N,plural,one{{N} negyedévvel ezelőtt}other{{N} negyedévvel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} negyedév múlva}other{{N} negyedév múlva}}',
    },
    NARROW:{
      RELATIVE:{'-1':'előző negyedév','0':'ez a negyedév','1':'következő negyedév'},
      PAST:'{N,plural,one{{N} negyedévvel ezelőtt}other{{N} negyedévvel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} n.év múlva}other{{N} n.év múlva}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'most'},
      PAST:'{N,plural,one{{N} másodperccel ezelőtt}other{{N} másodperccel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} másodperc múlva}other{{N} másodperc múlva}}',
    },
    SHORT:{
      RELATIVE:{'0':'most'},
      PAST:'{N,plural,one{{N} másodperccel ezelőtt}other{{N} másodperccel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} másodperc múlva}other{{N} másodperc múlva}}',
    },
    NARROW:{
      RELATIVE:{'0':'most'},
      PAST:'{N,plural,one{{N} másodperccel ezelőtt}other{{N} másodperccel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} másodperc múlva}other{{N} másodperc múlva}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'előző hét','0':'ez a hét','1':'következő hét'},
      PAST:'{N,plural,one{{N} héttel ezelőtt}other{{N} héttel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} hét múlva}other{{N} hét múlva}}',
    },
    SHORT:{
      RELATIVE:{'-1':'előző hét','0':'ez a hét','1':'következő hét'},
      PAST:'{N,plural,one{{N} héttel ezelőtt}other{{N} héttel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} hét múlva}other{{N} hét múlva}}',
    },
    NARROW:{
      RELATIVE:{'-1':'előző hét','0':'ez a hét','1':'következő hét'},
      PAST:'{N,plural,one{{N} héttel ezelőtt}other{{N} héttel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} hét múlva}other{{N} hét múlva}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'előző év','0':'ez az év','1':'következő év'},
      PAST:'{N,plural,one{{N} évvel ezelőtt}other{{N} évvel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} év múlva}other{{N} év múlva}}',
    },
    SHORT:{
      RELATIVE:{'-1':'előző év','0':'ez az év','1':'következő év'},
      PAST:'{N,plural,one{{N} évvel ezelőtt}other{{N} évvel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} év múlva}other{{N} év múlva}}',
    },
    NARROW:{
      RELATIVE:{'-1':'előző év','0':'ez az év','1':'következő év'},
      PAST:'{N,plural,one{{N} évvel ezelőtt}other{{N} évvel ezelőtt}}',
      FUTURE:'{N,plural,one{{N} év múlva}other{{N} év múlva}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_hy =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'երեկ','-2':'երեկ չէ առաջի օրը','0':'այսօր','1':'վաղը','2':'վաղը չէ մյուս օրը'},
      PAST:'{N,plural,one{{N} օր առաջ}other{{N} օր առաջ}}',
      FUTURE:'{N,plural,one{{N} օրից}other{{N} օրից}}',
    },
    SHORT:{
      RELATIVE:{'-1':'երեկ','-2':'երեկ չէ առաջի օրը','0':'այսօր','1':'վաղը','2':'վաղը չէ մյուս օրը'},
      PAST:'{N,plural,one{{N} օր առաջ}other{{N} օր առաջ}}',
      FUTURE:'{N,plural,one{{N} օրից}other{{N} օրից}}',
    },
    NARROW:{
      RELATIVE:{'-1':'երեկ','-2':'երեկ չէ առաջի օրը','0':'այսօր','1':'վաղը','2':'վաղը չէ մյուս օրը'},
      PAST:'{N,plural,one{{N} օր առաջ}other{{N} օր առաջ}}',
      FUTURE:'{N,plural,one{{N} օրից}other{{N} օրից}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'այս ժամին'},
      PAST:'{N,plural,one{{N} ժամ առաջ}other{{N} ժամ առաջ}}',
      FUTURE:'{N,plural,one{{N} ժամից}other{{N} ժամից}}',
    },
    SHORT:{
      RELATIVE:{'0':'այս ժամին'},
      PAST:'{N,plural,one{{N} ժ առաջ}other{{N} ժ առաջ}}',
      FUTURE:'{N,plural,one{{N} ժ-ից}other{{N} ժ-ից}}',
    },
    NARROW:{
      RELATIVE:{'0':'այս ժամին'},
      PAST:'{N,plural,one{{N} ժ առաջ}other{{N} ժ առաջ}}',
      FUTURE:'{N,plural,one{{N} ժ-ից}other{{N} ժ-ից}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'այս րոպեին'},
      PAST:'{N,plural,one{{N} րոպե առաջ}other{{N} րոպե առաջ}}',
      FUTURE:'{N,plural,one{{N} րոպեից}other{{N} րոպեից}}',
    },
    SHORT:{
      RELATIVE:{'0':'այս րոպեին'},
      PAST:'{N,plural,one{{N} ր առաջ}other{{N} ր առաջ}}',
      FUTURE:'{N,plural,one{{N} ր-ից}other{{N} ր-ից}}',
    },
    NARROW:{
      RELATIVE:{'0':'այս րոպեին'},
      PAST:'{N,plural,one{{N} ր առաջ}other{{N} ր առաջ}}',
      FUTURE:'{N,plural,one{{N} ր-ից}other{{N} ր-ից}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'նախորդ ամիս','0':'այս ամիս','1':'հաջորդ ամիս'},
      PAST:'{N,plural,one{{N} ամիս առաջ}other{{N} ամիս առաջ}}',
      FUTURE:'{N,plural,one{{N} ամսից}other{{N} ամսից}}',
    },
    SHORT:{
      RELATIVE:{'-1':'անցյալ ամիս','0':'այս ամիս','1':'հաջորդ ամիս'},
      PAST:'{N,plural,one{{N} ամիս առաջ}other{{N} ամիս առաջ}}',
      FUTURE:'{N,plural,one{{N} ամսից}other{{N} ամսից}}',
    },
    NARROW:{
      RELATIVE:{'-1':'անցյալ ամիս','0':'այս ամիս','1':'հաջորդ ամիս'},
      PAST:'{N,plural,one{{N} ամիս առաջ}other{{N} ամիս առաջ}}',
      FUTURE:'{N,plural,one{{N} ամսից}other{{N} ամսից}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'նախորդ եռամսյակ','0':'այս եռամսյակ','1':'հաջորդ եռամսյակ'},
      PAST:'{N,plural,one{{N} եռամսյակ առաջ}other{{N} եռամսյակ առաջ}}',
      FUTURE:'{N,plural,one{{N} եռամսյակից}other{{N} եռամսյակից}}',
    },
    SHORT:{
      RELATIVE:{'-1':'նախորդ եռամսյակ','0':'այս եռամսյակ','1':'հաջորդ եռամսյակ'},
      PAST:'{N,plural,one{{N} եռմս առաջ}other{{N} եռմս առաջ}}',
      FUTURE:'{N,plural,one{{N} եռմս-ից}other{{N} եռմս-ից}}',
    },
    NARROW:{
      RELATIVE:{'-1':'նախորդ եռամսյակ','0':'այս եռամսյակ','1':'հաջորդ եռամսյակ'},
      PAST:'{N,plural,one{{N} եռմս առաջ}other{{N} եռմս առաջ}}',
      FUTURE:'{N,plural,one{{N} եռմս-ից}other{{N} եռմս-ից}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'հիմա'},
      PAST:'{N,plural,one{{N} վայրկյան առաջ}other{{N} վայրկյան առաջ}}',
      FUTURE:'{N,plural,one{{N} վայրկյանից}other{{N} վայրկյանից}}',
    },
    SHORT:{
      RELATIVE:{'0':'հիմա'},
      PAST:'{N,plural,one{{N} վրկ առաջ}other{{N} վրկ առաջ}}',
      FUTURE:'{N,plural,one{{N} վրկ-ից}other{{N} վրկ-ից}}',
    },
    NARROW:{
      RELATIVE:{'0':'հիմա'},
      PAST:'{N,plural,one{{N} վ առաջ}other{{N} վ առաջ}}',
      FUTURE:'{N,plural,one{{N} վ-ից}other{{N} վ-ից}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'նախորդ շաբաթ','0':'այս շաբաթ','1':'հաջորդ շաբաթ'},
      PAST:'{N,plural,one{{N} շաբաթ առաջ}other{{N} շաբաթ առաջ}}',
      FUTURE:'{N,plural,one{{N} շաբաթից}other{{N} շաբաթից}}',
    },
    SHORT:{
      RELATIVE:{'-1':'նախորդ շաբաթ','0':'այս շաբաթ','1':'հաջորդ շաբաթ'},
      PAST:'{N,plural,one{{N} շաբ առաջ}other{{N} շաբ առաջ}}',
      FUTURE:'{N,plural,one{{N} շաբ-ից}other{{N} շաբ-ից}}',
    },
    NARROW:{
      RELATIVE:{'-1':'նախորդ շաբաթ','0':'այս շաբաթ','1':'հաջորդ շաբաթ'},
      PAST:'{N,plural,one{{N} շաբ առաջ}other{{N} շաբ առաջ}}',
      FUTURE:'{N,plural,one{{N} շաբ անց}other{{N} շաբ անց}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'նախորդ տարի','0':'այս տարի','1':'հաջորդ տարի'},
      PAST:'{N,plural,one{{N} տարի առաջ}other{{N} տարի առաջ}}',
      FUTURE:'{N,plural,one{{N} տարուց}other{{N} տարուց}}',
    },
    SHORT:{
      RELATIVE:{'-1':'նախորդ տարի','0':'այս տարի','1':'հաջորդ տարի'},
      PAST:'{N,plural,one{{N} տ առաջ}other{{N} տ առաջ}}',
      FUTURE:'{N,plural,one{{N} տարուց}other{{N} տարուց}}',
    },
    NARROW:{
      RELATIVE:{'-1':'նախորդ տարի','0':'այս տարի','1':'հաջորդ տարի'},
      PAST:'{N,plural,one{{N} տ առաջ}other{{N} տ առաջ}}',
      FUTURE:'{N,plural,one{{N} տարուց}other{{N} տարուց}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_id =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'kemarin','-2':'kemarin dulu','0':'hari ini','1':'besok','2':'lusa'},
      PAST:'{N,plural,other{{N} hari yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} hari}}',
    },
    SHORT:{
      RELATIVE:{'2':'lusa'},
      PAST:'{N,plural,other{{N} h lalu}}',
      FUTURE:'{N,plural,other{dalam {N} h}}',
    },
    NARROW:{
      RELATIVE:{'2':'lusa'},
      PAST:'{N,plural,other{{N} h lalu}}',
      FUTURE:'{N,plural,other{dalam {N} h}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'jam ini'},
      PAST:'{N,plural,other{{N} jam yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} jam}}',
    },
    SHORT:{
      RELATIVE:{'0':'jam ini'},
      PAST:'{N,plural,other{{N} jam lalu}}',
      FUTURE:'{N,plural,other{dalam {N} jam}}',
    },
    NARROW:{
      RELATIVE:{'0':'jam ini'},
      PAST:'{N,plural,other{{N} jam lalu}}',
      FUTURE:'{N,plural,other{dalam {N} jam}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'menit ini'},
      PAST:'{N,plural,other{{N} menit yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} menit}}',
    },
    SHORT:{
      RELATIVE:{'0':'menit ini'},
      PAST:'{N,plural,other{{N} mnt lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mnt}}',
    },
    NARROW:{
      RELATIVE:{'0':'menit ini'},
      PAST:'{N,plural,other{{N} mnt lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mnt}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'bulan lalu','0':'bulan ini','1':'bulan berikutnya'},
      PAST:'{N,plural,other{{N} bulan yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} bulan}}',
    },
    SHORT:{
      RELATIVE:{'-1':'bulan lalu','0':'bulan ini','1':'bulan berikutnya'},
      PAST:'{N,plural,other{{N} bln lalu}}',
      FUTURE:'{N,plural,other{dlm {N} bln}}',
    },
    NARROW:{
      RELATIVE:{'-1':'bulan lalu','0':'bulan ini','1':'bulan berikutnya'},
      PAST:'{N,plural,other{{N} bln lalu}}',
      FUTURE:'{N,plural,other{dlm {N} bln}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'Kuartal lalu','0':'kuartal ini','1':'kuartal berikutnya'},
      PAST:'{N,plural,other{{N} kuartal yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} kuartal}}',
    },
    SHORT:{
      RELATIVE:{'-1':'Kuartal lalu','0':'kuartal ini','1':'kuartal berikutnya'},
      PAST:'{N,plural,other{{N} krtl. lalu}}',
      FUTURE:'{N,plural,other{dlm {N} krtl.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'Kuartal lalu','0':'kuartal ini','1':'kuartal berikutnya'},
      PAST:'{N,plural,other{{N} krtl. lalu}}',
      FUTURE:'{N,plural,other{dlm {N} krtl.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'sekarang'},
      PAST:'{N,plural,other{{N} detik yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} detik}}',
    },
    SHORT:{
      RELATIVE:{'0':'sekarang'},
      PAST:'{N,plural,other{{N} dtk lalu}}',
      FUTURE:'{N,plural,other{dlm {N} dtk}}',
    },
    NARROW:{
      RELATIVE:{'0':'sekarang'},
      PAST:'{N,plural,other{{N} dtk lalu}}',
      FUTURE:'{N,plural,other{dlm {N} dtk}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'minggu lalu','0':'minggu ini','1':'minggu depan'},
      PAST:'{N,plural,other{{N} minggu yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} minggu}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minggu lalu','0':'minggu ini','1':'minggu depan'},
      PAST:'{N,plural,other{{N} mgg lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mgg}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minggu lalu','0':'minggu ini','1':'minggu depan'},
      PAST:'{N,plural,other{{N} mgg lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mgg}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'tahun lalu','0':'tahun ini','1':'tahun depan'},
      PAST:'{N,plural,other{{N} tahun yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} tahun}}',
    },
    SHORT:{
      RELATIVE:{'-1':'tahun lalu','0':'tahun ini','1':'tahun depan'},
      PAST:'{N,plural,other{{N} thn lalu}}',
      FUTURE:'{N,plural,other{dlm {N} thn}}',
    },
    NARROW:{
      RELATIVE:{'-1':'tahun lalu','0':'tahun ini','1':'tahun depan'},
      PAST:'{N,plural,other{{N} thn lalu}}',
      FUTURE:'{N,plural,other{dlm {N} thn}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_in =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'kemarin','-2':'kemarin dulu','0':'hari ini','1':'besok','2':'lusa'},
      PAST:'{N,plural,other{{N} hari yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} hari}}',
    },
    SHORT:{
      RELATIVE:{'2':'lusa'},
      PAST:'{N,plural,other{{N} h lalu}}',
      FUTURE:'{N,plural,other{dalam {N} h}}',
    },
    NARROW:{
      RELATIVE:{'2':'lusa'},
      PAST:'{N,plural,other{{N} h lalu}}',
      FUTURE:'{N,plural,other{dalam {N} h}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'jam ini'},
      PAST:'{N,plural,other{{N} jam yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} jam}}',
    },
    SHORT:{
      RELATIVE:{'0':'jam ini'},
      PAST:'{N,plural,other{{N} jam lalu}}',
      FUTURE:'{N,plural,other{dalam {N} jam}}',
    },
    NARROW:{
      RELATIVE:{'0':'jam ini'},
      PAST:'{N,plural,other{{N} jam lalu}}',
      FUTURE:'{N,plural,other{dalam {N} jam}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'menit ini'},
      PAST:'{N,plural,other{{N} menit yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} menit}}',
    },
    SHORT:{
      RELATIVE:{'0':'menit ini'},
      PAST:'{N,plural,other{{N} mnt lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mnt}}',
    },
    NARROW:{
      RELATIVE:{'0':'menit ini'},
      PAST:'{N,plural,other{{N} mnt lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mnt}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'bulan lalu','0':'bulan ini','1':'bulan berikutnya'},
      PAST:'{N,plural,other{{N} bulan yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} bulan}}',
    },
    SHORT:{
      RELATIVE:{'-1':'bulan lalu','0':'bulan ini','1':'bulan berikutnya'},
      PAST:'{N,plural,other{{N} bln lalu}}',
      FUTURE:'{N,plural,other{dlm {N} bln}}',
    },
    NARROW:{
      RELATIVE:{'-1':'bulan lalu','0':'bulan ini','1':'bulan berikutnya'},
      PAST:'{N,plural,other{{N} bln lalu}}',
      FUTURE:'{N,plural,other{dlm {N} bln}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'Kuartal lalu','0':'kuartal ini','1':'kuartal berikutnya'},
      PAST:'{N,plural,other{{N} kuartal yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} kuartal}}',
    },
    SHORT:{
      RELATIVE:{'-1':'Kuartal lalu','0':'kuartal ini','1':'kuartal berikutnya'},
      PAST:'{N,plural,other{{N} krtl. lalu}}',
      FUTURE:'{N,plural,other{dlm {N} krtl.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'Kuartal lalu','0':'kuartal ini','1':'kuartal berikutnya'},
      PAST:'{N,plural,other{{N} krtl. lalu}}',
      FUTURE:'{N,plural,other{dlm {N} krtl.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'sekarang'},
      PAST:'{N,plural,other{{N} detik yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} detik}}',
    },
    SHORT:{
      RELATIVE:{'0':'sekarang'},
      PAST:'{N,plural,other{{N} dtk lalu}}',
      FUTURE:'{N,plural,other{dlm {N} dtk}}',
    },
    NARROW:{
      RELATIVE:{'0':'sekarang'},
      PAST:'{N,plural,other{{N} dtk lalu}}',
      FUTURE:'{N,plural,other{dlm {N} dtk}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'minggu lalu','0':'minggu ini','1':'minggu depan'},
      PAST:'{N,plural,other{{N} minggu yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} minggu}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minggu lalu','0':'minggu ini','1':'minggu depan'},
      PAST:'{N,plural,other{{N} mgg lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mgg}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minggu lalu','0':'minggu ini','1':'minggu depan'},
      PAST:'{N,plural,other{{N} mgg lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mgg}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'tahun lalu','0':'tahun ini','1':'tahun depan'},
      PAST:'{N,plural,other{{N} tahun yang lalu}}',
      FUTURE:'{N,plural,other{dalam {N} tahun}}',
    },
    SHORT:{
      RELATIVE:{'-1':'tahun lalu','0':'tahun ini','1':'tahun depan'},
      PAST:'{N,plural,other{{N} thn lalu}}',
      FUTURE:'{N,plural,other{dlm {N} thn}}',
    },
    NARROW:{
      RELATIVE:{'-1':'tahun lalu','0':'tahun ini','1':'tahun depan'},
      PAST:'{N,plural,other{{N} thn lalu}}',
      FUTURE:'{N,plural,other{dlm {N} thn}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_is =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'í gær','-2':'í fyrradag','0':'í dag','1':'á morgun','2':'eftir tvo daga'},
      PAST:'{N,plural,one{fyrir {N} degi}other{fyrir {N} dögum}}',
      FUTURE:'{N,plural,one{eftir {N} dag}other{eftir {N} daga}}',
    },
    SHORT:{
      RELATIVE:{'-1':'í gær','-2':'í fyrradag','0':'í dag','1':'á morgun','2':'eftir tvo daga'},
      PAST:'{N,plural,one{fyrir {N} degi}other{fyrir {N} dögum}}',
      FUTURE:'{N,plural,one{eftir {N} dag}other{eftir {N} daga}}',
    },
    NARROW:{
      RELATIVE:{'-1':'í gær','-2':'í fyrradag','0':'í dag','1':'á morgun','2':'eftir tvo daga'},
      PAST:'{N,plural,one{-{N} degi}other{-{N} dögum}}',
      FUTURE:'{N,plural,one{+{N} dag}other{+{N} daga}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'þessa stundina'},
      PAST:'{N,plural,one{fyrir {N} klukkustund}other{fyrir {N} klukkustundum}}',
      FUTURE:'{N,plural,one{eftir {N} klukkustund}other{eftir {N} klukkustundir}}',
    },
    SHORT:{
      RELATIVE:{'0':'þessa stundina'},
      PAST:'{N,plural,one{fyrir {N} klst.}other{fyrir {N} klst.}}',
      FUTURE:'{N,plural,one{eftir {N} klst.}other{eftir {N} klst.}}',
    },
    NARROW:{
      RELATIVE:{'0':'þessa stundina'},
      PAST:'{N,plural,one{-{N} klst.}other{-{N} klst.}}',
      FUTURE:'{N,plural,one{+{N} klst.}other{+{N} klst.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'á þessari mínútu'},
      PAST:'{N,plural,one{fyrir {N} mínútu}other{fyrir {N} mínútum}}',
      FUTURE:'{N,plural,one{eftir {N} mínútu}other{eftir {N} mínútur}}',
    },
    SHORT:{
      RELATIVE:{'0':'á þessari mínútu'},
      PAST:'{N,plural,one{fyrir {N} mín.}other{fyrir {N} mín.}}',
      FUTURE:'{N,plural,one{eftir {N} mín.}other{eftir {N} mín.}}',
    },
    NARROW:{
      RELATIVE:{'0':'á þessari mínútu'},
      PAST:'{N,plural,one{-{N} mín.}other{-{N} mín.}}',
      FUTURE:'{N,plural,one{+{N} mín.}other{+{N} mín.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'í síðasta mánuði','0':'í þessum mánuði','1':'í næsta mánuði'},
      PAST:'{N,plural,one{fyrir {N} mánuði}other{fyrir {N} mánuðum}}',
      FUTURE:'{N,plural,one{eftir {N} mánuð}other{eftir {N} mánuði}}',
    },
    SHORT:{
      RELATIVE:{'-1':'í síðasta mán.','0':'í þessum mán.','1':'í næsta mán.'},
      PAST:'{N,plural,one{fyrir {N} mán.}other{fyrir {N} mán.}}',
      FUTURE:'{N,plural,one{eftir {N} mán.}other{eftir {N} mán.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'í síðasta mán.','0':'í þessum mán.','1':'í næsta mán.'},
      PAST:'{N,plural,one{fyrir {N} mán.}other{fyrir {N} mán.}}',
      FUTURE:'{N,plural,one{eftir {N} mán.}other{eftir {N} mán.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'síðasti ársfjórðungur','0':'þessi ársfjórðungur','1':'næsti ársfjórðungur'},
      PAST:'{N,plural,one{fyrir {N} ársfjórðungi}other{fyrir {N} ársfjórðungum}}',
      FUTURE:'{N,plural,one{eftir {N} ársfjórðung}other{eftir {N} ársfjórðunga}}',
    },
    SHORT:{
      RELATIVE:{'-1':'síðasti ársfj.','0':'þessi ársfj.','1':'næsti ársfj.'},
      PAST:'{N,plural,one{fyrir {N} ársfj.}other{fyrir {N} ársfj.}}',
      FUTURE:'{N,plural,one{eftir {N} ársfj.}other{eftir {N} ársfj.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'síðasti ársfj.','0':'þessi ársfj.','1':'næsti ársfj.'},
      PAST:'{N,plural,one{fyrir {N} ársfj.}other{fyrir {N} ársfj.}}',
      FUTURE:'{N,plural,one{eftir {N} ársfj.}other{eftir {N} ársfj.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'núna'},
      PAST:'{N,plural,one{fyrir {N} sekúndu}other{fyrir {N} sekúndum}}',
      FUTURE:'{N,plural,one{eftir {N} sekúndu}other{eftir {N} sekúndur}}',
    },
    SHORT:{
      RELATIVE:{'0':'núna'},
      PAST:'{N,plural,one{fyrir {N} sek.}other{fyrir {N} sek.}}',
      FUTURE:'{N,plural,one{eftir {N} sek.}other{eftir {N} sek.}}',
    },
    NARROW:{
      RELATIVE:{'0':'núna'},
      PAST:'{N,plural,one{-{N} sek.}other{-{N} sek.}}',
      FUTURE:'{N,plural,one{+{N} sek.}other{+{N} sek.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'í síðustu viku','0':'í þessari viku','1':'í næstu viku'},
      PAST:'{N,plural,one{fyrir {N} viku}other{fyrir {N} vikum}}',
      FUTURE:'{N,plural,one{eftir {N} viku}other{eftir {N} vikur}}',
    },
    SHORT:{
      RELATIVE:{'-1':'í síðustu viku','0':'í þessari viku','1':'í næstu viku'},
      PAST:'{N,plural,one{fyrir {N} viku}other{fyrir {N} vikum}}',
      FUTURE:'{N,plural,one{eftir {N} viku}other{eftir {N} vikur}}',
    },
    NARROW:{
      RELATIVE:{'-1':'í síðustu viku','0':'í þessari viku','1':'í næstu viku'},
      PAST:'{N,plural,one{-{N} viku}other{-{N} vikur}}',
      FUTURE:'{N,plural,one{+{N} viku}other{+{N} vikur}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'á síðasta ári','0':'á þessu ári','1':'á næsta ári'},
      PAST:'{N,plural,one{fyrir {N} ári}other{fyrir {N} árum}}',
      FUTURE:'{N,plural,one{eftir {N} ár}other{eftir {N} ár}}',
    },
    SHORT:{
      RELATIVE:{'-1':'á síðasta ári','0':'á þessu ári','1':'á næsta ári'},
      PAST:'{N,plural,one{fyrir {N} ári}other{fyrir {N} árum}}',
      FUTURE:'{N,plural,one{eftir {N} ár}other{eftir {N} ár}}',
    },
    NARROW:{
      RELATIVE:{'-1':'á síðasta ári','0':'á þessu ári','1':'á næsta ári'},
      PAST:'{N,plural,one{fyrir {N} árum}other{fyrir {N} árum}}',
      FUTURE:'{N,plural,one{eftir {N} ár}other{eftir {N} ár}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_it =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ieri','-2':'l’altro ieri','0':'oggi','1':'domani','2':'dopodomani'},
      PAST:'{N,plural,one{{N} giorno fa}other{{N} giorni fa}}',
      FUTURE:'{N,plural,one{tra {N} giorno}other{tra {N} giorni}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ieri','-2':'l’altro ieri','0':'oggi','1':'domani','2':'dopodomani'},
      PAST:'{N,plural,one{{N} g fa}other{{N} gg fa}}',
      FUTURE:'{N,plural,one{tra {N} g}other{tra {N} gg}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ieri','-2':'l’altro ieri','0':'oggi','1':'domani','2':'dopodomani'},
      PAST:'{N,plural,one{{N} g fa}other{{N} gg fa}}',
      FUTURE:'{N,plural,one{tra {N} g}other{tra {N} gg}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'quest’ora'},
      PAST:'{N,plural,one{{N} ora fa}other{{N} ore fa}}',
      FUTURE:'{N,plural,one{tra {N} ora}other{tra {N} ore}}',
    },
    SHORT:{
      RELATIVE:{'0':'quest’ora'},
      PAST:'{N,plural,one{{N} h fa}other{{N} h fa}}',
      FUTURE:'{N,plural,one{tra {N} h}other{tra {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'quest’ora'},
      PAST:'{N,plural,one{{N} h fa}other{{N} h fa}}',
      FUTURE:'{N,plural,one{tra {N} h}other{tra {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'questo minuto'},
      PAST:'{N,plural,one{{N} minuto fa}other{{N} minuti fa}}',
      FUTURE:'{N,plural,one{tra {N} minuto}other{tra {N} minuti}}',
    },
    SHORT:{
      RELATIVE:{'0':'questo minuto'},
      PAST:'{N,plural,one{{N} min fa}other{{N} min fa}}',
      FUTURE:'{N,plural,one{tra {N} min}other{tra {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'questo minuto'},
      PAST:'{N,plural,one{{N} min fa}other{{N} min fa}}',
      FUTURE:'{N,plural,one{tra {N} min}other{tra {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'mese scorso','0':'questo mese','1':'mese prossimo'},
      PAST:'{N,plural,one{{N} mese fa}other{{N} mesi fa}}',
      FUTURE:'{N,plural,one{tra {N} mese}other{tra {N} mesi}}',
    },
    SHORT:{
      RELATIVE:{'-1':'mese scorso','0':'questo mese','1':'mese prossimo'},
      PAST:'{N,plural,one{{N} mese fa}other{{N} mesi fa}}',
      FUTURE:'{N,plural,one{tra {N} mese}other{tra {N} mesi}}',
    },
    NARROW:{
      RELATIVE:{'-1':'mese scorso','0':'questo mese','1':'mese prossimo'},
      PAST:'{N,plural,one{{N} mese fa}other{{N} mesi fa}}',
      FUTURE:'{N,plural,one{tra {N} mese}other{tra {N} mesi}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'trimestre scorso','0':'questo trimestre','1':'trimestre prossimo'},
      PAST:'{N,plural,one{{N} trimestre fa}other{{N} trimestri fa}}',
      FUTURE:'{N,plural,one{tra {N} trimestre}other{tra {N} trimestri}}',
    },
    SHORT:{
      RELATIVE:{'-1':'trim. scorso','0':'questo trim.','1':'trim. prossimo'},
      PAST:'{N,plural,one{{N} trim. fa}other{{N} trim. fa}}',
      FUTURE:'{N,plural,one{tra {N} trim.}other{tra {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'trim. scorso','0':'questo trim.','1':'trim. prossimo'},
      PAST:'{N,plural,one{{N} trim. fa}other{{N} trim. fa}}',
      FUTURE:'{N,plural,one{tra {N} trim.}other{tra {N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ora'},
      PAST:'{N,plural,one{{N} secondo fa}other{{N} secondi fa}}',
      FUTURE:'{N,plural,one{tra {N} secondo}other{tra {N} secondi}}',
    },
    SHORT:{
      RELATIVE:{'0':'ora'},
      PAST:'{N,plural,one{{N} s fa}other{{N} sec. fa}}',
      FUTURE:'{N,plural,one{tra {N} s}other{tra {N} sec.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ora'},
      PAST:'{N,plural,one{{N} s fa}other{{N} s fa}}',
      FUTURE:'{N,plural,one{tra {N} s}other{tra {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'settimana scorsa','0':'questa settimana','1':'settimana prossima'},
      PAST:'{N,plural,one{{N} settimana fa}other{{N} settimane fa}}',
      FUTURE:'{N,plural,one{tra {N} settimana}other{tra {N} settimane}}',
    },
    SHORT:{
      RELATIVE:{'-1':'settimana scorsa','0':'questa settimana','1':'settimana prossima'},
      PAST:'{N,plural,one{{N} sett. fa}other{{N} sett. fa}}',
      FUTURE:'{N,plural,one{tra {N} sett.}other{tra {N} sett.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'settimana scorsa','0':'questa settimana','1':'settimana prossima'},
      PAST:'{N,plural,one{{N} sett. fa}other{{N} sett. fa}}',
      FUTURE:'{N,plural,one{tra {N} sett.}other{tra {N} sett.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'anno scorso','0':'quest’anno','1':'anno prossimo'},
      PAST:'{N,plural,one{{N} anno fa}other{{N} anni fa}}',
      FUTURE:'{N,plural,one{tra {N} anno}other{tra {N} anni}}',
    },
    SHORT:{
      RELATIVE:{'-1':'anno scorso','0':'quest’anno','1':'anno prossimo'},
      PAST:'{N,plural,one{{N} anno fa}other{{N} anni fa}}',
      FUTURE:'{N,plural,one{tra {N} anno}other{tra {N} anni}}',
    },
    NARROW:{
      RELATIVE:{'-1':'anno scorso','0':'quest’anno','1':'anno prossimo'},
      PAST:'{N,plural,one{{N} anno fa}other{{N} anni fa}}',
      FUTURE:'{N,plural,one{tra {N} anno}other{tra {N} anni}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_iw =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'אתמול','-2':'שלשום','0':'היום','1':'מחר','2':'מחרתיים'},
      PAST:'{N,plural,many{לפני {N} ימים}one{לפני יום {N}}other{לפני {N} ימים}two{לפני יומיים}}',
      FUTURE:'{N,plural,many{בעוד {N} ימים}one{בעוד יום {N}}other{בעוד {N} ימים}two{בעוד יומיים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'אתמול','-2':'שלשום','0':'היום','1':'מחר','2':'מחרתיים'},
      PAST:'{N,plural,many{לפני {N} ימים}one{אתמול}other{לפני {N} ימים}two{לפני יומיים}}',
      FUTURE:'{N,plural,many{בעוד {N} ימים}one{מחר}other{בעוד {N} ימים}two{בעוד יומיים}}',
    },
    NARROW:{
      RELATIVE:{'-1':'אתמול','-2':'שלשום','0':'היום','1':'מחר'},
      PAST:'{N,plural,many{לפני {N} ימים}one{אתמול}other{לפני {N} ימים}two{לפני יומיים}}',
      FUTURE:'{N,plural,many{בעוד {N} ימים}one{מחר}other{בעוד {N} ימים}two{בעוד יומיים}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'בשעה זו'},
      PAST:'{N,plural,many{לפני {N} שעות}one{לפני שעה}other{לפני {N} שעות}two{לפני שעתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שעות}one{בעוד שעה}other{בעוד {N} שעות}two{בעוד שעתיים}}',
    },
    SHORT:{
      RELATIVE:{'0':'בשעה זו'},
      PAST:'{N,plural,many{לפני {N} שע׳}one{לפני שעה}other{לפני {N} שע׳}two{לפני שעתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שע׳}one{בעוד שעה}other{בעוד {N} שע׳}two{בעוד שעתיים}}',
    },
    NARROW:{
      RELATIVE:{'0':'בשעה זו'},
      PAST:'{N,plural,many{לפני {N} שע׳}one{לפני שעה}other{לפני {N} שע׳}two{לפני שעתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שע׳}one{בעוד שעה}other{בעוד {N} שע׳}two{בעוד שעתיים}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'בדקה זו'},
      PAST:'{N,plural,many{לפני {N} דקות}one{לפני דקה}other{לפני {N} דקות}two{לפני שתי דקות}}',
      FUTURE:'{N,plural,many{בעוד {N} דקות}one{בעוד דקה}other{בעוד {N} דקות}two{בעוד שתי דקות}}',
    },
    SHORT:{
      RELATIVE:{'0':'בדקה זו'},
      PAST:'{N,plural,many{לפני {N} דק׳}one{לפני דקה}other{לפני {N} דק׳}two{לפני {N} דק׳}}',
      FUTURE:'{N,plural,many{בעוד {N} דק׳}one{בעוד דקה}other{בעוד {N} דק׳}two{בעוד שתי דק׳}}',
    },
    NARROW:{
      RELATIVE:{'0':'בדקה זו'},
      PAST:'{N,plural,many{לפני {N} דק׳}one{לפני דקה}other{לפני {N} דק׳}two{לפני שתי דק׳}}',
      FUTURE:'{N,plural,many{בעוד {N} דק׳}one{בעוד דקה}other{בעוד {N} דק׳}two{בעוד שתי דק׳}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'החודש שעבר','0':'החודש','1':'החודש הבא'},
      PAST:'{N,plural,many{לפני {N} חודשים}one{לפני חודש}other{לפני {N} חודשים}two{לפני חודשיים}}',
      FUTURE:'{N,plural,many{בעוד {N} חודשים}one{בעוד חודש}other{בעוד {N} חודשים}two{בעוד חודשיים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'החודש שעבר','0':'החודש','1':'החודש הבא'},
      PAST:'{N,plural,many{לפני {N} חודשים}one{לפני חודש}other{לפני {N} חודשים}two{לפני חודשיים}}',
      FUTURE:'{N,plural,many{בעוד {N} חודשים}one{בעוד חודש}other{בעוד {N} חודשים}two{בעוד חודשיים}}',
    },
    NARROW:{
      RELATIVE:{'-1':'החודש שעבר','0':'החודש','1':'החודש הבא'},
      PAST:'{N,plural,many{לפני {N} חו׳}one{לפני חו׳}other{לפני {N} חו׳}two{לפני חודשיים}}',
      FUTURE:'{N,plural,many{בעוד {N} חו׳}one{בעוד חו׳}other{בעוד {N} חו׳}two{בעוד חודשיים}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'הרבעון הקודם','0':'רבעון זה','1':'הרבעון הבא'},
      PAST:'{N,plural,many{לפני {N} רבעונים}one{ברבעון הקודם}other{לפני {N} רבעונים}two{לפני שני רבעונים}}',
      FUTURE:'{N,plural,many{בעוד {N} רבעונים}one{ברבעון הבא}other{בעוד {N} רבעונים}two{בעוד שני רבעונים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'הרבעון הקודם','0':'רבעון זה','1':'הרבעון הבא'},
      PAST:'{N,plural,many{לפני {N} רבע׳}one{ברבע׳ הקודם}other{לפני {N} רבע׳}two{לפני שני רבע׳}}',
      FUTURE:'{N,plural,many{בעוד {N} רבע׳}one{ברבע׳ הבא}other{בעוד {N} רבע׳}two{בעוד שני רבע׳}}',
    },
    NARROW:{
      RELATIVE:{'-1':'הרבעון הקודם','0':'רבעון זה','1':'הרבעון הבא'},
      PAST:'{N,plural,many{לפני {N} רבע׳}one{ברבע׳ הקודם}other{לפני {N} רבע׳}two{לפני שני רבע׳}}',
      FUTURE:'{N,plural,many{בעוד {N} רבע׳}one{ברבע׳ הבא}other{בעוד {N} רבע׳}two{בעוד שני רבע׳}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'עכשיו'},
      PAST:'{N,plural,many{לפני {N} שניות}one{לפני שנייה}other{לפני {N} שניות}two{לפני שתי שניות}}',
      FUTURE:'{N,plural,many{בעוד {N} שניות}one{בעוד שנייה}other{בעוד {N} שניות}two{בעוד שתי שניות}}',
    },
    SHORT:{
      RELATIVE:{'0':'עכשיו'},
      PAST:'{N,plural,many{לפני {N} שנ׳}one{לפני שנ׳}other{לפני {N} שנ׳}two{לפני שתי שנ׳}}',
      FUTURE:'{N,plural,many{בעוד {N} שנ׳}one{בעוד שנ׳}other{בעוד {N} שנ׳}two{בעוד שתי שנ׳}}',
    },
    NARROW:{
      RELATIVE:{'0':'עכשיו'},
      PAST:'{N,plural,many{לפני {N} שנ׳}one{לפני שנ׳}other{לפני {N} שנ׳}two{לפני שתי שנ׳}}',
      FUTURE:'{N,plural,many{בעוד {N} שנ׳}one{בעוד שנ׳}other{בעוד {N} שנ׳}two{בעוד שתי שנ׳}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'השבוע שעבר','0':'השבוע','1':'השבוע הבא'},
      PAST:'{N,plural,many{לפני {N} שבועות}one{לפני שבוע}other{לפני {N} שבועות}two{לפני שבועיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שבועות}one{בעוד שבוע}other{בעוד {N} שבועות}two{בעוד שבועיים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'השבוע שעבר','0':'השבוע','1':'השבוע הבא'},
      PAST:'{N,plural,many{לפני {N} שב׳}one{לפני שב׳}other{לפני {N} שב׳}two{לפני שבועיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שב׳}one{בעוד שב׳}other{בעוד {N} שב׳}two{בעוד שבועיים}}',
    },
    NARROW:{
      RELATIVE:{'-1':'השבוע שעבר','0':'השבוע','1':'השבוע הבא'},
      PAST:'{N,plural,many{לפני {N} שב׳}one{לפני שבוע}other{לפני {N} שב׳}two{לפני שבועיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שב׳}one{בעוד שב׳}other{בעוד {N} שב׳}two{בעוד שבועיים}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'השנה שעברה','0':'השנה','1':'השנה הבאה'},
      PAST:'{N,plural,many{לפני {N} שנה}one{לפני שנה}other{לפני {N} שנים}two{לפני שנתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שנה}one{בעוד שנה}other{בעוד {N} שנים}two{בעוד שנתיים}}',
    },
    SHORT:{
      RELATIVE:{'-1':'השנה שעברה','0':'השנה','1':'השנה הבאה'},
      PAST:'{N,plural,many{לפני {N} שנה}one{לפני שנה}other{לפני {N} שנים}two{לפני שנתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שנה}one{בעוד שנה}other{בעוד {N} שנים}two{בעוד שנתיים}}',
    },
    NARROW:{
      RELATIVE:{'-1':'השנה שעברה','0':'השנה','1':'השנה הבאה'},
      PAST:'{N,plural,many{לפני {N} שנה}one{לפני שנה}other{לפני {N} שנים}two{לפני שנתיים}}',
      FUTURE:'{N,plural,many{בעוד {N} שנה}one{בעוד שנה}other{בעוד {N} שנים}two{בעוד שנתיים}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ja =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'昨日','-2':'一昨日','0':'今日','1':'明日','2':'明後日'},
      PAST:'{N,plural,other{{N} 日前}}',
      FUTURE:'{N,plural,other{{N} 日後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'昨日','-2':'一昨日','0':'今日','1':'明日','2':'明後日'},
      PAST:'{N,plural,other{{N} 日前}}',
      FUTURE:'{N,plural,other{{N} 日後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'昨日','-2':'一昨日','0':'今日','1':'明日','2':'明後日'},
      PAST:'{N,plural,other{{N}日前}}',
      FUTURE:'{N,plural,other{{N}日後}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'1 時間以内'},
      PAST:'{N,plural,other{{N} 時間前}}',
      FUTURE:'{N,plural,other{{N} 時間後}}',
    },
    SHORT:{
      RELATIVE:{'0':'1 時間以内'},
      PAST:'{N,plural,other{{N} 時間前}}',
      FUTURE:'{N,plural,other{{N} 時間後}}',
    },
    NARROW:{
      RELATIVE:{'0':'1 時間以内'},
      PAST:'{N,plural,other{{N}時間前}}',
      FUTURE:'{N,plural,other{{N}時間後}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'1 分以内'},
      PAST:'{N,plural,other{{N} 分前}}',
      FUTURE:'{N,plural,other{{N} 分後}}',
    },
    SHORT:{
      RELATIVE:{'0':'1 分以内'},
      PAST:'{N,plural,other{{N} 分前}}',
      FUTURE:'{N,plural,other{{N} 分後}}',
    },
    NARROW:{
      RELATIVE:{'0':'1 分以内'},
      PAST:'{N,plural,other{{N}分前}}',
      FUTURE:'{N,plural,other{{N}分後}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'先月','0':'今月','1':'翌月'},
      PAST:'{N,plural,other{{N} か月前}}',
      FUTURE:'{N,plural,other{{N} か月後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'先月','0':'今月','1':'翌月'},
      PAST:'{N,plural,other{{N} か月前}}',
      FUTURE:'{N,plural,other{{N} か月後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'先月','0':'今月','1':'翌月'},
      PAST:'{N,plural,other{{N}か月前}}',
      FUTURE:'{N,plural,other{{N}か月後}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'前四半期','0':'今四半期','1':'翌四半期'},
      PAST:'{N,plural,other{{N} 四半期前}}',
      FUTURE:'{N,plural,other{{N} 四半期後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'前四半期','0':'今四半期','1':'翌四半期'},
      PAST:'{N,plural,other{{N} 四半期前}}',
      FUTURE:'{N,plural,other{{N} 四半期後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'前四半期','0':'今四半期','1':'翌四半期'},
      PAST:'{N,plural,other{{N}四半期前}}',
      FUTURE:'{N,plural,other{{N}四半期後}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'今'},
      PAST:'{N,plural,other{{N} 秒前}}',
      FUTURE:'{N,plural,other{{N} 秒後}}',
    },
    SHORT:{
      RELATIVE:{'0':'今'},
      PAST:'{N,plural,other{{N} 秒前}}',
      FUTURE:'{N,plural,other{{N} 秒後}}',
    },
    NARROW:{
      RELATIVE:{'0':'今'},
      PAST:'{N,plural,other{{N}秒前}}',
      FUTURE:'{N,plural,other{{N}秒後}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'先週','0':'今週','1':'翌週'},
      PAST:'{N,plural,other{{N} 週間前}}',
      FUTURE:'{N,plural,other{{N} 週間後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'先週','0':'今週','1':'翌週'},
      PAST:'{N,plural,other{{N} 週間前}}',
      FUTURE:'{N,plural,other{{N} 週間後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'先週','0':'今週','1':'翌週'},
      PAST:'{N,plural,other{{N}週間前}}',
      FUTURE:'{N,plural,other{{N}週間後}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'昨年','0':'今年','1':'翌年'},
      PAST:'{N,plural,other{{N} 年前}}',
      FUTURE:'{N,plural,other{{N} 年後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'昨年','0':'今年','1':'翌年'},
      PAST:'{N,plural,other{{N} 年前}}',
      FUTURE:'{N,plural,other{{N} 年後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'昨年','0':'今年','1':'翌年'},
      PAST:'{N,plural,other{{N}年前}}',
      FUTURE:'{N,plural,other{{N}年後}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ka =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'გუშინ','-2':'გუშინწინ','0':'დღეს','1':'ხვალ','2':'ზეგ'},
      PAST:'{N,plural,one{{N} დღის წინ}other{{N} დღის წინ}}',
      FUTURE:'{N,plural,one{{N} დღეში}other{{N} დღეში}}',
    },
    SHORT:{
      RELATIVE:{'-1':'გუშინ','-2':'გუშინწინ','0':'დღეს','1':'ხვალ','2':'ზეგ'},
      PAST:'{N,plural,one{{N} დღის წინ}other{{N} დღის წინ}}',
      FUTURE:'{N,plural,one{{N} დღეში}other{{N} დღეში}}',
    },
    NARROW:{
      RELATIVE:{'-1':'გუშინ','-2':'გუშინწინ','0':'დღეს','1':'ხვალ','2':'ზეგ'},
      PAST:'{N,plural,one{{N} დღის წინ}other{{N} დღის წინ}}',
      FUTURE:'{N,plural,one{{N} დღეში}other{{N} დღეში}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ამ საათში'},
      PAST:'{N,plural,one{{N} საათის წინ}other{{N} საათის წინ}}',
      FUTURE:'{N,plural,one{{N} საათში}other{{N} საათში}}',
    },
    SHORT:{
      RELATIVE:{'0':'ამ საათში'},
      PAST:'{N,plural,one{{N} სთ წინ}other{{N} სთ წინ}}',
      FUTURE:'{N,plural,one{{N} საათში}other{{N} საათში}}',
    },
    NARROW:{
      RELATIVE:{'0':'ამ საათში'},
      PAST:'{N,plural,one{{N} სთ წინ}other{{N} სთ წინ}}',
      FUTURE:'{N,plural,one{{N} საათში}other{{N} საათში}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ამ წუთში'},
      PAST:'{N,plural,one{{N} წუთის წინ}other{{N} წუთის წინ}}',
      FUTURE:'{N,plural,one{{N} წუთში}other{{N} წუთში}}',
    },
    SHORT:{
      RELATIVE:{'0':'ამ წუთში'},
      PAST:'{N,plural,one{{N} წთ წინ}other{{N} წთ წინ}}',
      FUTURE:'{N,plural,one{{N} წუთში}other{{N} წუთში}}',
    },
    NARROW:{
      RELATIVE:{'0':'ამ წუთში'},
      PAST:'{N,plural,one{{N} წთ წინ}other{{N} წთ წინ}}',
      FUTURE:'{N,plural,one{{N} წუთში}other{{N} წუთში}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'გასულ თვეს','0':'ამ თვეში','1':'მომავალ თვეს'},
      PAST:'{N,plural,one{{N} თვის წინ}other{{N} თვის წინ}}',
      FUTURE:'{N,plural,one{{N} თვეში}other{{N} თვეში}}',
    },
    SHORT:{
      RELATIVE:{'-1':'გასულ თვეს','0':'ამ თვეში','1':'მომავალ თვეს'},
      PAST:'{N,plural,one{{N} თვის წინ}other{{N} თვის წინ}}',
      FUTURE:'{N,plural,one{{N} თვეში}other{{N} თვეში}}',
    },
    NARROW:{
      RELATIVE:{'-1':'გასულ თვეს','0':'ამ თვეში','1':'მომავალ თვეს'},
      PAST:'{N,plural,one{{N} თვის წინ}other{{N} თვის წინ}}',
      FUTURE:'{N,plural,one{{N} თვეში}other{{N} თვეში}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'გასულ კვარტალში','0':'ამ კვარტალში','1':'შემდეგ კვარტალში'},
      PAST:'{N,plural,one{{N} კვარტალის წინ}other{{N} კვარტალის წინ}}',
      FUTURE:'{N,plural,one{{N} კვარტალში}other{{N} კვარტალში}}',
    },
    SHORT:{
      RELATIVE:{'-1':'გასულ კვარტალში','0':'ამ კვარტალში','1':'შემდეგ კვარტალში'},
      PAST:'{N,plural,one{{N} კვარტ. წინ}other{{N} კვარტ. წინ}}',
      FUTURE:'{N,plural,one{{N} კვარტალში}other{{N} კვარტალში}}',
    },
    NARROW:{
      RELATIVE:{'-1':'გასულ კვარტალში','0':'ამ კვარტალში','1':'შემდეგ კვარტალში'},
      PAST:'{N,plural,one{{N} კვარტ. წინ}other{{N} კვარტ. წინ}}',
      FUTURE:'{N,plural,one{{N} კვარტალში}other{{N} კვარტალში}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ახლა'},
      PAST:'{N,plural,one{{N} წამის წინ}other{{N} წამის წინ}}',
      FUTURE:'{N,plural,one{{N} წამში}other{{N} წამში}}',
    },
    SHORT:{
      RELATIVE:{'0':'ახლა'},
      PAST:'{N,plural,one{{N} წმ წინ}other{{N} წმ წინ}}',
      FUTURE:'{N,plural,one{{N} წამში}other{{N} წამში}}',
    },
    NARROW:{
      RELATIVE:{'0':'ახლა'},
      PAST:'{N,plural,one{{N} წმ წინ}other{{N} წმ წინ}}',
      FUTURE:'{N,plural,one{{N} წამში}other{{N} წამში}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'გასულ კვირაში','0':'ამ კვირაში','1':'მომავალ კვირაში'},
      PAST:'{N,plural,one{{N} კვირის წინ}other{{N} კვირის წინ}}',
      FUTURE:'{N,plural,one{{N} კვირაში}other{{N} კვირაში}}',
    },
    SHORT:{
      RELATIVE:{'-1':'გასულ კვირაში','0':'ამ კვირაში','1':'მომავალ კვირაში'},
      PAST:'{N,plural,one{{N} კვ. წინ}other{{N} კვ. წინ}}',
      FUTURE:'{N,plural,one{{N} კვირაში}other{{N} კვირაში}}',
    },
    NARROW:{
      RELATIVE:{'-1':'გასულ კვირაში','0':'ამ კვირაში','1':'მომავალ კვირაში'},
      PAST:'{N,plural,one{{N} კვირის წინ}other{{N} კვირის წინ}}',
      FUTURE:'{N,plural,one{{N} კვირაში}other{{N} კვირაში}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'გასულ წელს','0':'ამ წელს','1':'მომავალ წელს'},
      PAST:'{N,plural,one{{N} წლის წინ}other{{N} წლის წინ}}',
      FUTURE:'{N,plural,one{{N} წელიწადში}other{{N} წელიწადში}}',
    },
    SHORT:{
      RELATIVE:{'-1':'გასულ წელს','0':'ამ წელს','1':'მომავალ წელს'},
      PAST:'{N,plural,one{{N} წლის წინ}other{{N} წლის წინ}}',
      FUTURE:'{N,plural,one{{N} წელში}other{{N} წელში}}',
    },
    NARROW:{
      RELATIVE:{'-1':'გასულ წელს','0':'ამ წელს','1':'მომავალ წელს'},
      PAST:'{N,plural,one{{N} წლის წინ}other{{N} წლის წინ}}',
      FUTURE:'{N,plural,one{{N} წელში}other{{N} წელში}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_kk =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'кеше','-2':'алдыңгүні','0':'бүгін','1':'ертең','2':'бүрсігүні'},
      PAST:'{N,plural,one{{N} күн бұрын}other{{N} күн бұрын}}',
      FUTURE:'{N,plural,one{{N} күннен кейін}other{{N} күннен кейін}}',
    },
    SHORT:{
      RELATIVE:{'-1':'кеше','-2':'алдыңғы күні','0':'бүгін','1':'ертең','2':'бүрсігүні'},
      PAST:'{N,plural,one{{N} күн бұрын}other{{N} күн бұрын}}',
      FUTURE:'{N,plural,one{{N} күннен кейін}other{{N} күннен кейін}}',
    },
    NARROW:{
      RELATIVE:{'-1':'кеше','-2':'алдыңғы күні','0':'бүгін','1':'ертең','2':'бүрсігүні'},
      PAST:'{N,plural,one{{N} күн бұрын}other{{N} күн бұрын}}',
      FUTURE:'{N,plural,one{{N} күннен кейін}other{{N} күннен кейін}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'осы сағат'},
      PAST:'{N,plural,one{{N} сағат бұрын}other{{N} сағат бұрын}}',
      FUTURE:'{N,plural,one{{N} сағаттан кейін}other{{N} сағаттан кейін}}',
    },
    SHORT:{
      RELATIVE:{'0':'осы сағат'},
      PAST:'{N,plural,one{{N} сағ. бұрын}other{{N} сағ. бұрын}}',
      FUTURE:'{N,plural,one{{N} сағ. кейін}other{{N} сағ. кейін}}',
    },
    NARROW:{
      RELATIVE:{'0':'осы сағат'},
      PAST:'{N,plural,one{{N} сағ. бұрын}other{{N} сағ. бұрын}}',
      FUTURE:'{N,plural,one{{N} сағ. кейін}other{{N} сағ. кейін}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'осы минут'},
      PAST:'{N,plural,one{{N} минут бұрын}other{{N} минут бұрын}}',
      FUTURE:'{N,plural,one{{N} минуттан кейін}other{{N} минуттан кейін}}',
    },
    SHORT:{
      RELATIVE:{'0':'осы минут'},
      PAST:'{N,plural,one{{N} мин. бұрын}other{{N} мин. бұрын}}',
      FUTURE:'{N,plural,one{{N} мин. кейін}other{{N} мин. кейін}}',
    },
    NARROW:{
      RELATIVE:{'0':'осы минут'},
      PAST:'{N,plural,one{{N} мин. бұрын}other{{N} мин. бұрын}}',
      FUTURE:'{N,plural,one{{N} мин. кейін}other{{N} мин. кейін}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'өткен ай','0':'осы ай','1':'келесі ай'},
      PAST:'{N,plural,one{{N} ай бұрын}other{{N} ай бұрын}}',
      FUTURE:'{N,plural,one{{N} айдан кейін}other{{N} айдан кейін}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өткен ай','0':'осы ай','1':'келесі ай'},
      PAST:'{N,plural,one{{N} ай бұрын}other{{N} ай бұрын}}',
      FUTURE:'{N,plural,one{{N} айдан кейін}other{{N} айдан кейін}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өткен ай','0':'осы ай','1':'келесі ай'},
      PAST:'{N,plural,one{{N} ай бұрын}other{{N} ай бұрын}}',
      FUTURE:'{N,plural,one{{N} айдан кейін}other{{N} айдан кейін}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'өткен тоқсан','0':'осы тоқсан','1':'келесі тоқсан'},
      PAST:'{N,plural,one{{N} тоқсан бұрын}other{{N} тоқсан бұрын}}',
      FUTURE:'{N,plural,one{{N} тоқсаннан кейін}other{{N} тоқсаннан кейін}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өткен тоқсан','0':'осы тоқсан','1':'келесі тоқсан'},
      PAST:'{N,plural,one{{N} тқс. бұрын}other{{N} тқс. бұрын}}',
      FUTURE:'{N,plural,one{{N} тқс. кейін}other{{N} тқс. кейін}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өткен тоқсан','0':'осы тоқсан','1':'келесі тоқсан'},
      PAST:'{N,plural,one{{N} тқс. бұрын}other{{N} тқс. бұрын}}',
      FUTURE:'{N,plural,one{{N} тқс. кейін}other{{N} тқс. кейін}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'қазір'},
      PAST:'{N,plural,one{{N} секунд бұрын}other{{N} секунд бұрын}}',
      FUTURE:'{N,plural,one{{N} секундтан кейін}other{{N} секундтан кейін}}',
    },
    SHORT:{
      RELATIVE:{'0':'қазір'},
      PAST:'{N,plural,one{{N} сек. бұрын}other{{N} сек. бұрын}}',
      FUTURE:'{N,plural,one{{N} сек. кейін}other{{N} сек. кейін}}',
    },
    NARROW:{
      RELATIVE:{'0':'қазір'},
      PAST:'{N,plural,one{{N} сек. бұрын}other{{N} сек. бұрын}}',
      FUTURE:'{N,plural,one{{N} сек. кейін}other{{N} сек. кейін}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'өткен апта','0':'осы апта','1':'келесі апта'},
      PAST:'{N,plural,one{{N} апта бұрын}other{{N} апта бұрын}}',
      FUTURE:'{N,plural,one{{N} аптадан кейін}other{{N} аптадан кейін}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өткен апта','0':'осы апта','1':'келесі апта'},
      PAST:'{N,plural,one{{N} ап. бұрын}other{{N} ап. бұрын}}',
      FUTURE:'{N,plural,one{{N} ап. кейін}other{{N} ап. кейін}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өткен апта','0':'осы апта','1':'келесі апта'},
      PAST:'{N,plural,one{{N} ап. бұрын}other{{N} ап. бұрын}}',
      FUTURE:'{N,plural,one{{N} ап. кейін}other{{N} ап. кейін}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'былтырғы жыл','0':'биылғы жыл','1':'келесі жыл'},
      PAST:'{N,plural,one{{N} жыл бұрын}other{{N} жыл бұрын}}',
      FUTURE:'{N,plural,one{{N} жылдан кейін}other{{N} жылдан кейін}}',
    },
    SHORT:{
      RELATIVE:{'-1':'былтырғы жыл','0':'биылғы жыл','1':'келесі жыл'},
      PAST:'{N,plural,one{{N} ж. бұрын}other{{N} ж. бұрын}}',
      FUTURE:'{N,plural,one{{N} ж. кейін}other{{N} ж. кейін}}',
    },
    NARROW:{
      RELATIVE:{'-1':'былтырғы жыл','0':'биылғы жыл','1':'келесі жыл'},
      PAST:'{N,plural,one{{N} ж. бұрын}other{{N} ж. бұрын}}',
      FUTURE:'{N,plural,one{{N} ж. кейін}other{{N} ж. кейін}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_km =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ម្សិលមិញ','-2':'ម្សិល​ម៉្ងៃ','0':'ថ្ងៃ​នេះ','1':'ថ្ងៃ​ស្អែក','2':'​ខាន​ស្អែក'},
      PAST:'{N,plural,other{{N} ថ្ងៃ​មុន}}',
      FUTURE:'{N,plural,other{{N} ថ្ងៃទៀត}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ម្សិលមិញ','-2':'ម្សិល​ម៉្ងៃ','0':'ថ្ងៃ​នេះ','1':'ថ្ងៃស្អែក','2':'​ខាន​ស្អែក'},
      PAST:'{N,plural,other{{N} ថ្ងៃ​​មុន}}',
      FUTURE:'{N,plural,other{{N} ថ្ងៃទៀត}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ម្សិលមិញ','-2':'ម្សិល​ម៉្ងៃ','0':'ថ្ងៃ​នេះ','1':'ថ្ងៃស្អែក','2':'​ខាន​ស្អែក'},
      PAST:'{N,plural,other{{N} ថ្ងៃ​​មុន}}',
      FUTURE:'{N,plural,other{{N} ថ្ងៃទៀត}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ម៉ោងនេះ'},
      PAST:'{N,plural,other{{N} ម៉ោង​មុន}}',
      FUTURE:'{N,plural,other{ក្នុង​រយៈ​ពេល {N} ម៉ោង}}',
    },
    SHORT:{
      RELATIVE:{'0':'ម៉ោងនេះ'},
      PAST:'{N,plural,other{{N} ម៉ោង​មុន}}',
      FUTURE:'{N,plural,other{{N} ម៉ោងទៀត}}',
    },
    NARROW:{
      RELATIVE:{'0':'ម៉ោងនេះ'},
      PAST:'{N,plural,other{{N} ម៉ោង​មុន}}',
      FUTURE:'{N,plural,other{{N} ម៉ោងទៀត}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'នាទីនេះ'},
      PAST:'{N,plural,other{{N} នាទី​មុន}}',
      FUTURE:'{N,plural,other{{N} នាទីទៀត}}',
    },
    SHORT:{
      RELATIVE:{'0':'នាទីនេះ'},
      PAST:'{N,plural,other{{N} នាទី​​មុន}}',
      FUTURE:'{N,plural,other{{N} នាទីទៀត}}',
    },
    NARROW:{
      RELATIVE:{'0':'នាទីនេះ'},
      PAST:'{N,plural,other{{N} នាទី​​មុន}}',
      FUTURE:'{N,plural,other{{N} នាទីទៀត}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ខែ​មុន','0':'ខែ​នេះ','1':'ខែ​ក្រោយ'},
      PAST:'{N,plural,other{{N} ខែមុន}}',
      FUTURE:'{N,plural,other{{N} ខែទៀត}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ខែ​មុន','0':'ខែ​នេះ','1':'ខែ​ក្រោយ'},
      PAST:'{N,plural,other{{N} ខែមុន}}',
      FUTURE:'{N,plural,other{{N} ខែទៀត}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ខែ​មុន','0':'ខែ​នេះ','1':'ខែ​ក្រោយ'},
      PAST:'{N,plural,other{{N} ខែមុន}}',
      FUTURE:'{N,plural,other{{N} ខែទៀត}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'ត្រីមាស​មុន','0':'ត្រីមាស​នេះ','1':'ត្រីមាស​ក្រោយ'},
      PAST:'{N,plural,other{{N} ត្រីមាស​មុន}}',
      FUTURE:'{N,plural,other{{N} ត្រីមាសទៀត}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ត្រីមាស​មុន','0':'ត្រីមាស​នេះ','1':'ត្រីមាស​ក្រោយ'},
      PAST:'{N,plural,other{{N} ត្រីមាស​មុន}}',
      FUTURE:'{N,plural,other{{N} ត្រីមាសទៀត}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ត្រីមាស​មុន','0':'ត្រីមាស​នេះ','1':'ត្រីមាស​ក្រោយ'},
      PAST:'{N,plural,other{{N} ត្រីមាស​មុន}}',
      FUTURE:'{N,plural,other{{N} ត្រីមាសទៀត}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ឥឡូវ'},
      PAST:'{N,plural,other{{N} វិនាទី​មុន}}',
      FUTURE:'{N,plural,other{{N} វិនាទីទៀត}}',
    },
    SHORT:{
      RELATIVE:{'0':'ឥឡូវ'},
      PAST:'{N,plural,other{{N} វិនាទី​មុន}}',
      FUTURE:'{N,plural,other{{N} វិនាទីទៀត}}',
    },
    NARROW:{
      RELATIVE:{'0':'ឥឡូវ'},
      PAST:'{N,plural,other{{N} វិនាទី​មុន}}',
      FUTURE:'{N,plural,other{{N} វិនាទីទៀត}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'សប្ដាហ៍​មុន','0':'សប្ដាហ៍​នេះ','1':'សប្ដាហ៍​ក្រោយ'},
      PAST:'{N,plural,other{{N} សប្ដាហ៍​មុន}}',
      FUTURE:'{N,plural,other{{N} សប្ដាហ៍ទៀត}}',
    },
    SHORT:{
      RELATIVE:{'-1':'សប្ដាហ៍​មុន','0':'សប្ដាហ៍​នេះ','1':'សប្ដាហ៍​ក្រោយ'},
      PAST:'{N,plural,other{{N} សប្ដាហ៍​មុន}}',
      FUTURE:'{N,plural,other{{N} សប្ដាហ៍ទៀត}}',
    },
    NARROW:{
      RELATIVE:{'-1':'សប្ដាហ៍​មុន','0':'សប្ដាហ៍​នេះ','1':'សប្ដាហ៍​ក្រោយ'},
      PAST:'{N,plural,other{{N} សប្ដាហ៍​មុន}}',
      FUTURE:'{N,plural,other{{N} សប្ដាហ៍ទៀត}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ឆ្នាំ​មុន','0':'ឆ្នាំ​នេះ','1':'ឆ្នាំ​ក្រោយ'},
      PAST:'{N,plural,other{{N} ឆ្នាំ​មុន}}',
      FUTURE:'{N,plural,other{{N} ឆ្នាំទៀត}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ឆ្នាំ​មុន','0':'ឆ្នាំ​នេះ','1':'ឆ្នាំ​ក្រោយ'},
      PAST:'{N,plural,other{{N} ឆ្នាំ​មុន}}',
      FUTURE:'{N,plural,other{{N} ឆ្នាំទៀត}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ឆ្នាំ​មុន','0':'ឆ្នាំ​នេះ','1':'ឆ្នាំ​ក្រោយ'},
      PAST:'{N,plural,other{{N} ឆ្នាំ​មុន}}',
      FUTURE:'{N,plural,other{{N} ឆ្នាំទៀត}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_kn =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ನಿನ್ನೆ','-2':'ಮೊನ್ನೆ','0':'ಇಂದು','1':'ನಾಳೆ','2':'ನಾಡಿದ್ದು'},
      PAST:'{N,plural,one{{N} ದಿನದ ಹಿಂದೆ}other{{N} ದಿನಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ದಿನದಲ್ಲಿ}other{{N} ದಿನಗಳಲ್ಲಿ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ನಿನ್ನೆ','-2':'ಮೊನ್ನೆ','0':'ಇಂದು','1':'ನಾಳೆ','2':'ನಾಡಿದ್ದು'},
      PAST:'{N,plural,one{{N} ದಿನದ ಹಿಂದೆ}other{{N} ದಿನಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ದಿನದಲ್ಲಿ}other{{N} ದಿನಗಳಲ್ಲಿ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ನಿನ್ನೆ','-2':'ಮೊನ್ನೆ','0':'ಇಂದು','1':'ನಾಳೆ','2':'ನಾಡಿದ್ದು'},
      PAST:'{N,plural,one{{N} ದಿನದ ಹಿಂದೆ}other{{N} ದಿನಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ದಿನದಲ್ಲಿ}other{{N} ದಿನಗಳಲ್ಲಿ}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ಈ ಗಂಟೆ'},
      PAST:'{N,plural,one{{N} ಗಂಟೆ ಹಿಂದೆ}other{{N} ಗಂಟೆಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ಗಂಟೆಯಲ್ಲಿ}other{{N} ಗಂಟೆಗಳಲ್ಲಿ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ಈ ಗಂಟೆ'},
      PAST:'{N,plural,one{{N} ಗಂಟೆ ಹಿಂದೆ}other{{N} ಗಂಟೆಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ಗಂಟೆಯಲ್ಲಿ}other{{N} ಗಂಟೆಗಳಲ್ಲಿ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ಈ ಗಂಟೆ'},
      PAST:'{N,plural,one{{N} ಗಂಟೆ ಹಿಂದೆ}other{{N} ಗಂಟೆಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ಗಂಟೆಯಲ್ಲಿ}other{{N} ಗಂಟೆಗಳಲ್ಲಿ}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ಈ ನಿಮಿಷ'},
      PAST:'{N,plural,one{{N} ನಿಮಿಷದ ಹಿಂದೆ}other{{N} ನಿಮಿಷಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ನಿಮಿಷದಲ್ಲಿ}other{{N} ನಿಮಿಷಗಳಲ್ಲಿ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ಈ ನಿಮಿಷ'},
      PAST:'{N,plural,one{{N} ನಿಮಿಷದ ಹಿಂದೆ}other{{N} ನಿಮಿಷಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ನಿಮಿಷದಲ್ಲಿ}other{{N} ನಿಮಿಷಗಳಲ್ಲಿ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ಈ ನಿಮಿಷ'},
      PAST:'{N,plural,one{{N} ನಿಮಿಷದ ಹಿಂದೆ}other{{N} ನಿಮಿಷಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ನಿಮಿಷದಲ್ಲಿ}other{{N} ನಿಮಿಷಗಳಲ್ಲಿ}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ಕಳೆದ ತಿಂಗಳು','0':'ಈ ತಿಂಗಳು','1':'ಮುಂದಿನ ತಿಂಗಳು'},
      PAST:'{N,plural,one{{N} ತಿಂಗಳ ಹಿಂದೆ}other{{N} ತಿಂಗಳುಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ತಿಂಗಳಲ್ಲಿ}other{{N} ತಿಂಗಳುಗಳಲ್ಲಿ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ಕಳೆದ ತಿಂಗಳು','0':'ಈ ತಿಂಗಳು','1':'ಮುಂದಿನ ತಿಂಗಳು'},
      PAST:'{N,plural,one{{N} ತಿಂಗಳು ಹಿಂದೆ}other{{N} ತಿಂಗಳುಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ತಿಂಗಳಲ್ಲಿ}other{{N} ತಿಂಗಳುಗಳಲ್ಲಿ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ಕಳೆದ ತಿಂಗಳು','0':'ಈ ತಿಂಗಳು','1':'ಮುಂದಿನ ತಿಂಗಳು'},
      PAST:'{N,plural,one{{N} ತಿಂಗಳ ಹಿಂದೆ}other{{N} ತಿಂಗಳುಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ತಿಂಗಳಲ್ಲಿ}other{{N} ತಿಂಗಳುಗಳಲ್ಲಿ}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'ಹಿಂದಿನ ತ್ರೈಮಾಸಿಕ','0':'ಈ ತ್ರೈಮಾಸಿಕ','1':'ಮುಂದಿನ ತ್ರೈಮಾಸಿಕ'},
      PAST:'{N,plural,one{{N} ತ್ರೈಮಾಸಿಕದ ಹಿಂದೆ}other{{N} ತ್ರೈಮಾಸಿಕಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ತ್ರೈಮಾಸಿಕದಲ್ಲಿ}other{{N} ತ್ರೈಮಾಸಿಕಗಳಲ್ಲಿ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ಕಳೆದ ತ್ರೈಮಾಸಿಕ','0':'ಈ ತ್ರೈಮಾಸಿಕ','1':'ಮುಂದಿನ ತ್ರೈಮಾಸಿಕ'},
      PAST:'{N,plural,one{{N} ತ್ರೈ.ಮಾ. ಹಿಂದೆ}other{{N} ತ್ರೈಮಾಸಿಕಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ತ್ರೈ.ಮಾ.ದಲ್ಲಿ}other{{N} ತ್ರೈಮಾಸಿಕಗಳಲ್ಲಿ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ಕಳೆದ ತ್ರೈಮಾಸಿಕ','0':'ಈ ತ್ರೈಮಾಸಿಕ','1':'ಮುಂದಿನ ತ್ರೈಮಾಸಿಕ'},
      PAST:'{N,plural,one{{N} ತ್ರೈ.ಮಾ. ಹಿಂದೆ}other{{N} ತ್ರೈಮಾಸಿಕಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ತ್ರೈಮಾಸಿಕಗಳಲ್ಲಿ}other{{N} ತ್ರೈಮಾಸಿಕಗಳಲ್ಲಿ}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ಈಗ'},
      PAST:'{N,plural,one{{N} ಸೆಕೆಂಡ್ ಹಿಂದೆ}other{{N} ಸೆಕೆಂಡುಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ಸೆಕೆಂಡ್‌ನಲ್ಲಿ}other{{N} ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ಈಗ'},
      PAST:'{N,plural,one{{N} ಸೆಕೆಂಡ್ ಹಿಂದೆ}other{{N} ಸೆಕೆಂಡುಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ಸೆಕೆಂಡ್‌ನಲ್ಲಿ}other{{N} ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ಈಗ'},
      PAST:'{N,plural,one{{N} ಸೆಕೆಂಡ್ ಹಿಂದೆ}other{{N} ಸೆಕೆಂಡುಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ಸೆಕೆಂಡ್‌ನಲ್ಲಿ}other{{N} ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'ಕಳೆದ ವಾರ','0':'ಈ ವಾರ','1':'ಮುಂದಿನ ವಾರ'},
      PAST:'{N,plural,one{{N} ವಾರದ ಹಿಂದೆ}other{{N} ವಾರಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ವಾರದಲ್ಲಿ}other{{N} ವಾರಗಳಲ್ಲಿ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ಕಳೆದ ವಾರ','0':'ಈ ವಾರ','1':'ಮುಂದಿನ ವಾರ'},
      PAST:'{N,plural,one{{N} ವಾರದ ಹಿಂದೆ}other{{N} ವಾರಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ವಾರದಲ್ಲಿ}other{{N} ವಾರಗಳಲ್ಲಿ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ಕಳೆದ ವಾರ','0':'ಈ ವಾರ','1':'ಮುಂದಿನ ವಾರ'},
      PAST:'{N,plural,one{{N} ವಾರದ ಹಿಂದೆ}other{{N} ವಾರಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ವಾರದಲ್ಲಿ}other{{N} ವಾರಗಳಲ್ಲಿ}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ಹಿಂದಿನ ವರ್ಷ','0':'ಈ ವರ್ಷ','1':'ಮುಂದಿನ ವರ್ಷ'},
      PAST:'{N,plural,one{{N} ವರ್ಷದ ಹಿಂದೆ}other{{N} ವರ್ಷಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ವರ್ಷದಲ್ಲಿ}other{{N} ವರ್ಷಗಳಲ್ಲಿ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ಕಳೆದ ವರ್ಷ','0':'ಈ ವರ್ಷ','1':'ಮುಂದಿನ ವರ್ಷ'},
      PAST:'{N,plural,one{{N} ವರ್ಷದ ಹಿಂದೆ}other{{N} ವರ್ಷಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ವರ್ಷದಲ್ಲಿ}other{{N} ವರ್ಷಗಳಲ್ಲಿ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ಕಳೆದ ವರ್ಷ','0':'ಈ ವರ್ಷ','1':'ಮುಂದಿನ ವರ್ಷ'},
      PAST:'{N,plural,one{{N} ವರ್ಷದ ಹಿಂದೆ}other{{N} ವರ್ಷಗಳ ಹಿಂದೆ}}',
      FUTURE:'{N,plural,one{{N} ವರ್ಷದಲ್ಲಿ}other{{N} ವರ್ಷಗಳಲ್ಲಿ}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ko =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'어제','-2':'그저께','0':'오늘','1':'내일','2':'모레'},
      PAST:'{N,plural,other{{N}일 전}}',
      FUTURE:'{N,plural,other{{N}일 후}}',
    },
    SHORT:{
      RELATIVE:{'-1':'어제','-2':'그저께','0':'오늘','1':'내일','2':'모레'},
      PAST:'{N,plural,other{{N}일 전}}',
      FUTURE:'{N,plural,other{{N}일 후}}',
    },
    NARROW:{
      RELATIVE:{'-1':'어제','-2':'그저께','0':'오늘','1':'내일','2':'모레'},
      PAST:'{N,plural,other{{N}일 전}}',
      FUTURE:'{N,plural,other{{N}일 후}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'현재 시간'},
      PAST:'{N,plural,other{{N}시간 전}}',
      FUTURE:'{N,plural,other{{N}시간 후}}',
    },
    SHORT:{
      RELATIVE:{'0':'현재 시간'},
      PAST:'{N,plural,other{{N}시간 전}}',
      FUTURE:'{N,plural,other{{N}시간 후}}',
    },
    NARROW:{
      RELATIVE:{'0':'현재 시간'},
      PAST:'{N,plural,other{{N}시간 전}}',
      FUTURE:'{N,plural,other{{N}시간 후}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'현재 분'},
      PAST:'{N,plural,other{{N}분 전}}',
      FUTURE:'{N,plural,other{{N}분 후}}',
    },
    SHORT:{
      RELATIVE:{'0':'현재 분'},
      PAST:'{N,plural,other{{N}분 전}}',
      FUTURE:'{N,plural,other{{N}분 후}}',
    },
    NARROW:{
      RELATIVE:{'0':'현재 분'},
      PAST:'{N,plural,other{{N}분 전}}',
      FUTURE:'{N,plural,other{{N}분 후}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'지난달','0':'이번 달','1':'다음 달'},
      PAST:'{N,plural,other{{N}개월 전}}',
      FUTURE:'{N,plural,other{{N}개월 후}}',
    },
    SHORT:{
      RELATIVE:{'-1':'지난달','0':'이번 달','1':'다음 달'},
      PAST:'{N,plural,other{{N}개월 전}}',
      FUTURE:'{N,plural,other{{N}개월 후}}',
    },
    NARROW:{
      RELATIVE:{'-1':'지난달','0':'이번 달','1':'다음 달'},
      PAST:'{N,plural,other{{N}개월 전}}',
      FUTURE:'{N,plural,other{{N}개월 후}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'지난 분기','0':'이번 분기','1':'다음 분기'},
      PAST:'{N,plural,other{{N}분기 전}}',
      FUTURE:'{N,plural,other{{N}분기 후}}',
    },
    SHORT:{
      RELATIVE:{'-1':'지난 분기','0':'이번 분기','1':'다음 분기'},
      PAST:'{N,plural,other{{N}분기 전}}',
      FUTURE:'{N,plural,other{{N}분기 후}}',
    },
    NARROW:{
      RELATIVE:{'-1':'지난 분기','0':'이번 분기','1':'다음 분기'},
      PAST:'{N,plural,other{{N}분기 전}}',
      FUTURE:'{N,plural,other{{N}분기 후}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'지금'},
      PAST:'{N,plural,other{{N}초 전}}',
      FUTURE:'{N,plural,other{{N}초 후}}',
    },
    SHORT:{
      RELATIVE:{'0':'지금'},
      PAST:'{N,plural,other{{N}초 전}}',
      FUTURE:'{N,plural,other{{N}초 후}}',
    },
    NARROW:{
      RELATIVE:{'0':'지금'},
      PAST:'{N,plural,other{{N}초 전}}',
      FUTURE:'{N,plural,other{{N}초 후}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'지난주','0':'이번 주','1':'다음 주'},
      PAST:'{N,plural,other{{N}주 전}}',
      FUTURE:'{N,plural,other{{N}주 후}}',
    },
    SHORT:{
      RELATIVE:{'-1':'지난주','0':'이번 주','1':'다음 주'},
      PAST:'{N,plural,other{{N}주 전}}',
      FUTURE:'{N,plural,other{{N}주 후}}',
    },
    NARROW:{
      RELATIVE:{'-1':'지난주','0':'이번 주','1':'다음 주'},
      PAST:'{N,plural,other{{N}주 전}}',
      FUTURE:'{N,plural,other{{N}주 후}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'작년','0':'올해','1':'내년'},
      PAST:'{N,plural,other{{N}년 전}}',
      FUTURE:'{N,plural,other{{N}년 후}}',
    },
    SHORT:{
      RELATIVE:{'-1':'작년','0':'올해','1':'내년'},
      PAST:'{N,plural,other{{N}년 전}}',
      FUTURE:'{N,plural,other{{N}년 후}}',
    },
    NARROW:{
      RELATIVE:{'-1':'작년','0':'올해','1':'내년'},
      PAST:'{N,plural,other{{N}년 전}}',
      FUTURE:'{N,plural,other{{N}년 후}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ky =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'кечээ','-2':'мурдагы күнү','0':'бүгүн','1':'эртең','2':'бүрсүгүнү'},
      PAST:'{N,plural,one{{N} күн мурун}other{{N} күн мурун}}',
      FUTURE:'{N,plural,one{{N} күндөн кийин}other{{N} күндөн кийин}}',
    },
    SHORT:{
      RELATIVE:{'-1':'кечээ','-2':'мурдагы күнү','0':'бүгүн','1':'эртең','2':'бүрсүгүнү'},
      PAST:'{N,plural,one{{N} күн мурун}other{{N} күн мурун}}',
      FUTURE:'{N,plural,one{{N} күн. кийин}other{{N} күн. кийин}}',
    },
    NARROW:{
      RELATIVE:{'-1':'кечээ','-2':'мурдагы күнү','0':'бүгүн','1':'эртең','2':'бүрсүгүнү'},
      PAST:'{N,plural,one{{N} күн мурун}other{{N} күн мурун}}',
      FUTURE:'{N,plural,one{{N} күн. кийин}other{{N} күн. кийин}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ушул саатта'},
      PAST:'{N,plural,one{{N} саат мурун}other{{N} саат мурун}}',
      FUTURE:'{N,plural,one{{N} сааттан кийин}other{{N} сааттан кийин}}',
    },
    SHORT:{
      RELATIVE:{'0':'ушул саатта'},
      PAST:'{N,plural,one{{N} саат. мурун}other{{N} саат. мурун}}',
      FUTURE:'{N,plural,one{{N} саат. кийин}other{{N} саат. кийин}}',
    },
    NARROW:{
      RELATIVE:{'0':'ушул саатта'},
      PAST:'{N,plural,one{{N} с. мурн}other{{N} с. мурн}}',
      FUTURE:'{N,plural,one{{N} с. кийн}other{{N} с. кийн}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ушул мүнөттө'},
      PAST:'{N,plural,one{{N} мүнөт мурун}other{{N} мүнөт мурун}}',
      FUTURE:'{N,plural,one{{N} мүнөттөн кийин}other{{N} мүнөттөн кийин}}',
    },
    SHORT:{
      RELATIVE:{'0':'ушул мүнөттө'},
      PAST:'{N,plural,one{{N} мүн. мурун}other{{N} мүн. мурун}}',
      FUTURE:'{N,plural,one{{N} мүн. кийин}other{{N} мүн. кийин}}',
    },
    NARROW:{
      RELATIVE:{'0':'ушул мүнөттө'},
      PAST:'{N,plural,one{{N} мүн. мурн}other{{N} мүн. мурн}}',
      FUTURE:'{N,plural,one{{N} мүн. кийн}other{{N} мүн. кийн}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'өткөн айда','0':'бул айда','1':'эмдиги айда'},
      PAST:'{N,plural,one{{N} ай мурун}other{{N} ай мурун}}',
      FUTURE:'{N,plural,one{{N} айдан кийин}other{{N} айдан кийин}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өткөн айда','0':'бул айда','1':'эмдиги айда'},
      PAST:'{N,plural,one{{N} ай мурун}other{{N} ай мурун}}',
      FUTURE:'{N,plural,one{{N} айд. кийин}other{{N} айд. кийин}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өткөн айда','0':'бул айда','1':'эмдиги айда'},
      PAST:'{N,plural,one{{N} ай мурн}other{{N} ай мурн}}',
      FUTURE:'{N,plural,one{{N} айд. кийн}other{{N} айд. кийн}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'акыркы чейрек','0':'бул чейрек','1':'кийинки чейрек'},
      PAST:'{N,plural,one{{N} чейрек мурун}other{{N} чейрек мурун}}',
      FUTURE:'{N,plural,one{{N} чейректен кийин}other{{N} чейректен кийин}}',
    },
    SHORT:{
      RELATIVE:{'-1':'акыркы чейр.','0':'бул чейр.','1':'кийинки чейр.'},
      PAST:'{N,plural,one{{N} чейр. мурун}other{{N} чейр. мурун}}',
      FUTURE:'{N,plural,one{{N} чейректен кийин}other{{N} чейректен кийин}}',
    },
    NARROW:{
      RELATIVE:{'-1':'акыркы чейр.','0':'бул чейр.','1':'кийинки чейр.'},
      PAST:'{N,plural,one{{N} чейр. мурун}other{{N} чейр. мурун}}',
      FUTURE:'{N,plural,one{{N} чейр. кийин}other{{N} чейр. кийин}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'азыр'},
      PAST:'{N,plural,one{{N} секунд мурун}other{{N} секунд мурун}}',
      FUTURE:'{N,plural,one{{N} секунддан кийин}other{{N} секунддан кийин}}',
    },
    SHORT:{
      RELATIVE:{'0':'азыр'},
      PAST:'{N,plural,one{{N} сек. мурун}other{{N} сек. мурун}}',
      FUTURE:'{N,plural,one{{N} сек. кийин}other{{N} сек. кийин}}',
    },
    NARROW:{
      RELATIVE:{'0':'азыр'},
      PAST:'{N,plural,one{{N} сек. мурн}other{{N} сек. мурн}}',
      FUTURE:'{N,plural,one{{N} сек. кийн}other{{N} сек. кийн}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'өткөн аптада','0':'ушул аптада','1':'келерки аптада'},
      PAST:'{N,plural,one{{N} апта мурун}other{{N} апта мурун}}',
      FUTURE:'{N,plural,one{{N} аптадан кийин}other{{N} аптадан кийин}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өткөн апт.','0':'ушул апт.','1':'келерки апт.'},
      PAST:'{N,plural,one{{N} апт. мурун}other{{N} апт. мурун}}',
      FUTURE:'{N,plural,one{{N} апт. кийин}other{{N} апт. кийин}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өткөн апт.','0':'ушул апт.','1':'келерки апт.'},
      PAST:'{N,plural,one{{N} апт. мурун}other{{N} апт. мурун}}',
      FUTURE:'{N,plural,one{{N} апт. кийин}other{{N} апт. кийин}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'былтыр','0':'быйыл','1':'эмдиги жылы'},
      PAST:'{N,plural,one{{N} жыл мурун}other{{N} жыл мурун}}',
      FUTURE:'{N,plural,one{{N} жылдан кийин}other{{N} жылдан кийин}}',
    },
    SHORT:{
      RELATIVE:{'-1':'былтыр','0':'быйыл','1':'эмдиги жылы'},
      PAST:'{N,plural,one{{N} жыл мурун}other{{N} жыл мурун}}',
      FUTURE:'{N,plural,one{{N} жыл. кийин}other{{N} жыл. кийин}}',
    },
    NARROW:{
      RELATIVE:{'-1':'былтыр','0':'быйыл','1':'эмдиги жылы'},
      PAST:'{N,plural,one{{N} жыл мурун}other{{N} жыл мурун}}',
      FUTURE:'{N,plural,one{{N} жыл. кийин}other{{N} жыл. кийин}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ln =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'Lóbi elékí','0':'Lɛlɔ́','1':'Lóbi ekoyâ'},
      PAST:'{N,plural,other{-{N} d}}',
      FUTURE:'{N,plural,other{+{N} d}}',
    },
    SHORT:{
      RELATIVE:{'-1':'Lóbi elékí','0':'Lɛlɔ́','1':'Lóbi ekoyâ'},
      PAST:'{N,plural,other{-{N} d}}',
      FUTURE:'{N,plural,other{+{N} d}}',
    },
    NARROW:{
      RELATIVE:{'-1':'Lóbi elékí','0':'Lɛlɔ́','1':'Lóbi ekoyâ'},
      PAST:'{N,plural,other{-{N} d}}',
      FUTURE:'{N,plural,other{+{N} d}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,other{-{N} h}}',
      FUTURE:'{N,plural,other{+{N} h}}',
    },
    SHORT:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,other{-{N} h}}',
      FUTURE:'{N,plural,other{+{N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'this hour'},
      PAST:'{N,plural,other{-{N} h}}',
      FUTURE:'{N,plural,other{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,other{-{N} min}}',
      FUTURE:'{N,plural,other{+{N} min}}',
    },
    SHORT:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,other{-{N} min}}',
      FUTURE:'{N,plural,other{+{N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'this minute'},
      PAST:'{N,plural,other{-{N} min}}',
      FUTURE:'{N,plural,other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,other{-{N} m}}',
      FUTURE:'{N,plural,other{+{N} m}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,other{-{N} m}}',
      FUTURE:'{N,plural,other{+{N} m}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last month','0':'this month','1':'next month'},
      PAST:'{N,plural,other{-{N} m}}',
      FUTURE:'{N,plural,other{+{N} m}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,other{-{N} Q}}',
      FUTURE:'{N,plural,other{+{N} Q}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,other{-{N} Q}}',
      FUTURE:'{N,plural,other{+{N} Q}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last quarter','0':'this quarter','1':'next quarter'},
      PAST:'{N,plural,other{-{N} Q}}',
      FUTURE:'{N,plural,other{+{N} Q}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,other{-{N} s}}',
      FUTURE:'{N,plural,other{+{N} s}}',
    },
    SHORT:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,other{-{N} s}}',
      FUTURE:'{N,plural,other{+{N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'now'},
      PAST:'{N,plural,other{-{N} s}}',
      FUTURE:'{N,plural,other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,other{-{N} w}}',
      FUTURE:'{N,plural,other{+{N} w}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,other{-{N} w}}',
      FUTURE:'{N,plural,other{+{N} w}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last week','0':'this week','1':'next week'},
      PAST:'{N,plural,other{-{N} w}}',
      FUTURE:'{N,plural,other{+{N} w}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,other{-{N} y}}',
      FUTURE:'{N,plural,other{+{N} y}}',
    },
    SHORT:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,other{-{N} y}}',
      FUTURE:'{N,plural,other{+{N} y}}',
    },
    NARROW:{
      RELATIVE:{'-1':'last year','0':'this year','1':'next year'},
      PAST:'{N,plural,other{-{N} y}}',
      FUTURE:'{N,plural,other{+{N} y}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_lo =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ມື້ວານ','-2':'ມື້ກ່ອນ','0':'ມື້ນີ້','1':'ມື້ອື່ນ','2':'ມື້ຮື'},
      PAST:'{N,plural,other{{N} ມື້ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ມື້}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ມື້ວານ','-2':'ມື້ກ່ອນ','0':'ມື້ນີ້','1':'ມື້ອື່ນ','2':'ມື້ຮື'},
      PAST:'{N,plural,other{{N} ມື້ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ມື້}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ມື້ວານ','-2':'ມື້ກ່ອນ','0':'ມື້ນີ້','1':'ມື້ອື່ນ','2':'ມື້ຮື'},
      PAST:'{N,plural,other{{N} ມື້ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ມື້}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ຊົ່ວໂມງນີ້'},
      PAST:'{N,plural,other{{N} ຊົ່ວໂມງກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ຊົ່ວໂມງ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ຊົ່ວໂມງນີ້'},
      PAST:'{N,plural,other{{N} ຊມ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ຊມ.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ຊົ່ວໂມງນີ້'},
      PAST:'{N,plural,other{{N} ຊມ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ຊມ.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ນາທີນີ້'},
      PAST:'{N,plural,other{{N} ນາທີກ່ອນ}}',
      FUTURE:'{N,plural,other{{N} ໃນອີກ 0 ນາທີ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ນາທີນີ້'},
      PAST:'{N,plural,other{{N} ນທ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນ {N} ນທ.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ນາທີນີ້'},
      PAST:'{N,plural,other{{N} ນທ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນ {N} ນທ.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ເດືອນແລ້ວ','0':'ເດືອນນີ້','1':'ເດືອນໜ້າ'},
      PAST:'{N,plural,other{{N} ເດືອນກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ເດືອນ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ເດືອນແລ້ວ','0':'ເດືອນນີ້','1':'ເດືອນໜ້າ'},
      PAST:'{N,plural,other{{N} ດ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ດ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ເດືອນແລ້ວ','0':'ເດືອນນີ້','1':'ເດືອນໜ້າ'},
      PAST:'{N,plural,other{{N} ດ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ດ.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'ໄຕຣມາດກ່ອນໜ້າ','0':'ໄຕຣມາດນີ້','1':'ໄຕຣມາດໜ້າ'},
      PAST:'{N,plural,other{{N} ໄຕຣມາດກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ໄຕຣມາດ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ໄຕຣມາດກ່ອນໜ້າ','0':'ໄຕຣມາດນີ້','1':'ໄຕຣມາດໜ້າ'},
      PAST:'{N,plural,other{{N} ຕມ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນ {N} ຕມ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ໄຕຣມາດກ່ອນໜ້າ','0':'ໄຕຣມາດນີ້','1':'ໄຕຣມາດໜ້າ'},
      PAST:'{N,plural,other{{N} ຕມ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນ {N} ຕມ.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ຕອນນີ້'},
      PAST:'{N,plural,other{{N} ວິນາທີກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ວິນາທີ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ຕອນນີ້'},
      PAST:'{N,plural,other{{N} ວິ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນ {N} ວິ.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ຕອນນີ້'},
      PAST:'{N,plural,other{{N} ວິ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນ {N} ວິ.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'ອາທິດແລ້ວ','0':'ອາທິດນີ້','1':'ອາທິດໜ້າ'},
      PAST:'{N,plural,other{{N} ອາທິດກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ອາທິດ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ອາທິດແລ້ວ','0':'ອາທິດນີ້','1':'ອາທິດໜ້າ'},
      PAST:'{N,plural,other{{N} ອທ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ອທ.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ອາທິດແລ້ວ','0':'ອາທິດນີ້','1':'ອາທິດໜ້າ'},
      PAST:'{N,plural,other{{N} ອທ. ກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ອທ.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ປີກາຍ','0':'ປີນີ້','1':'ປີໜ້າ'},
      PAST:'{N,plural,other{{N} ປີກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ປີ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ປີກາຍ','0':'ປີນີ້','1':'ປີໜ້າ'},
      PAST:'{N,plural,other{{N} ປີກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ປີ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ປີກາຍ','0':'ປີນີ້','1':'ປີໜ້າ'},
      PAST:'{N,plural,other{{N} ປີກ່ອນ}}',
      FUTURE:'{N,plural,other{ໃນອີກ {N} ປີ}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_lt =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'vakar','-2':'užvakar','0':'šiandien','1':'rytoj','2':'poryt'},
      PAST:'{N,plural,few{prieš {N} dienas}many{prieš {N} dienos}one{prieš {N} dieną}other{prieš {N} dienų}}',
      FUTURE:'{N,plural,few{po {N} dienų}many{po {N} dienos}one{po {N} dienos}other{po {N} dienų}}',
    },
    SHORT:{
      RELATIVE:{'-1':'vakar','-2':'užvakar','0':'šiandien','1':'rytoj','2':'poryt'},
      PAST:'{N,plural,few{prieš {N} d.}many{prieš {N} d.}one{prieš {N} d.}other{prieš {N} d.}}',
      FUTURE:'{N,plural,few{po {N} d.}many{po {N} d.}one{po {N} d.}other{po {N} d.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'vakar','-2':'užvakar','0':'šiandien','1':'rytoj','2':'poryt'},
      PAST:'{N,plural,few{prieš {N} d.}many{prieš {N} d.}one{prieš {N} d.}other{prieš {N} d.}}',
      FUTURE:'{N,plural,few{po {N} d.}many{po {N} d.}one{po {N} d.}other{po {N} d.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'šią valandą'},
      PAST:'{N,plural,few{prieš {N} valandas}many{prieš {N} valandos}one{prieš {N} valandą}other{prieš {N} valandų}}',
      FUTURE:'{N,plural,few{po {N} valandų}many{po {N} valandos}one{po {N} valandos}other{po {N} valandų}}',
    },
    SHORT:{
      RELATIVE:{'0':'šią valandą'},
      PAST:'{N,plural,few{prieš {N} val.}many{prieš {N} val.}one{prieš {N} val.}other{prieš {N} val.}}',
      FUTURE:'{N,plural,few{po {N} val.}many{po {N} val.}one{po {N} val.}other{po {N} val.}}',
    },
    NARROW:{
      RELATIVE:{'0':'šią valandą'},
      PAST:'{N,plural,few{prieš {N} val.}many{prieš {N} val.}one{prieš {N} val.}other{prieš {N} val.}}',
      FUTURE:'{N,plural,few{po {N} val.}many{po {N} val.}one{po {N} val.}other{po {N} val.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'šią minutę'},
      PAST:'{N,plural,few{prieš {N} minutes}many{prieš {N} minutės}one{prieš {N} minutę}other{prieš {N} minučių}}',
      FUTURE:'{N,plural,few{po {N} minučių}many{po {N} minutės}one{po {N} minutės}other{po {N} minučių}}',
    },
    SHORT:{
      RELATIVE:{'0':'šią minutę'},
      PAST:'{N,plural,few{prieš {N} min.}many{prieš {N} min.}one{prieš {N} min.}other{prieš {N} min.}}',
      FUTURE:'{N,plural,few{po {N} min.}many{po {N} min.}one{po {N} min.}other{po {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'šią minutę'},
      PAST:'{N,plural,few{prieš {N} min.}many{prieš {N} min.}one{prieš {N} min.}other{prieš {N} min.}}',
      FUTURE:'{N,plural,few{po {N} min.}many{po {N} min.}one{po {N} min.}other{po {N} min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'praėjusį mėnesį','0':'šį mėnesį','1':'kitą mėnesį'},
      PAST:'{N,plural,few{prieš {N} mėnesius}many{prieš {N} mėnesio}one{prieš {N} mėnesį}other{prieš {N} mėnesių}}',
      FUTURE:'{N,plural,few{po {N} mėnesių}many{po {N} mėnesio}one{po {N} mėnesio}other{po {N} mėnesių}}',
    },
    SHORT:{
      RELATIVE:{'-1':'praėjusį mėnesį','0':'šį mėnesį','1':'kitą mėnesį'},
      PAST:'{N,plural,few{prieš {N} mėn.}many{prieš {N} mėn.}one{prieš {N} mėn.}other{prieš {N} mėn.}}',
      FUTURE:'{N,plural,few{po {N} mėn.}many{po {N} mėn.}one{po {N} mėn.}other{po {N} mėn.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'praėjusį mėnesį','0':'šį mėnesį','1':'kitą mėnesį'},
      PAST:'{N,plural,few{prieš {N} mėn.}many{prieš {N} mėn.}one{prieš {N} mėn.}other{prieš {N} mėn.}}',
      FUTURE:'{N,plural,few{po {N} mėn.}many{po {N} mėn.}one{po {N} mėn.}other{po {N} mėn.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'praėjęs ketvirtis','0':'šis ketvirtis','1':'kitas ketvirtis'},
      PAST:'{N,plural,few{prieš {N} ketvirčius}many{prieš {N} ketvirčio}one{prieš {N} ketvirtį}other{prieš {N} ketvirčių}}',
      FUTURE:'{N,plural,few{po {N} ketvirčių}many{po {N} ketvirčio}one{po {N} ketvirčio}other{po {N} ketvirčių}}',
    },
    SHORT:{
      RELATIVE:{'-1':'praėjęs ketvirtis','0':'šis ketvirtis','1':'kitas ketvirtis'},
      PAST:'{N,plural,few{prieš {N} ketv.}many{prieš {N} ketv.}one{prieš {N} ketv.}other{prieš {N} ketv.}}',
      FUTURE:'{N,plural,few{po {N} ketv.}many{po {N} ketv.}one{po {N} ketv.}other{po {N} ketv.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'praėjęs ketvirtis','0':'šis ketvirtis','1':'kitas ketvirtis'},
      PAST:'{N,plural,few{prieš {N} ketv.}many{prieš {N} ketv.}one{prieš {N} ketv.}other{prieš {N} ketv.}}',
      FUTURE:'{N,plural,few{po {N} ketv.}many{po {N} ketv.}one{po {N} ketv.}other{po {N} ketv.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'dabar'},
      PAST:'{N,plural,few{prieš {N} sekundes}many{prieš {N} sekundės}one{prieš {N} sekundę}other{prieš {N} sekundžių}}',
      FUTURE:'{N,plural,few{po {N} sekundžių}many{po {N} sekundės}one{po {N} sekundės}other{po {N} sekundžių}}',
    },
    SHORT:{
      RELATIVE:{'0':'dabar'},
      PAST:'{N,plural,few{prieš {N} sek.}many{prieš {N} sek.}one{prieš {N} sek.}other{prieš {N} sek.}}',
      FUTURE:'{N,plural,few{po {N} sek.}many{po {N} sek.}one{po {N} sek.}other{po {N} sek.}}',
    },
    NARROW:{
      RELATIVE:{'0':'dabar'},
      PAST:'{N,plural,few{prieš {N} s}many{prieš {N} s}one{prieš {N} s}other{prieš {N} s}}',
      FUTURE:'{N,plural,few{po {N} s}many{po {N} s}one{po {N} s}other{po {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'praėjusią savaitę','0':'šią savaitę','1':'kitą savaitę'},
      PAST:'{N,plural,few{prieš {N} savaites}many{prieš {N} savaitės}one{prieš {N} savaitę}other{prieš {N} savaičių}}',
      FUTURE:'{N,plural,few{po {N} savaičių}many{po {N} savaitės}one{po {N} savaitės}other{po {N} savaičių}}',
    },
    SHORT:{
      RELATIVE:{'-1':'praėjusią savaitę','0':'šią savaitę','1':'kitą savaitę'},
      PAST:'{N,plural,few{prieš {N} sav.}many{prieš {N} sav.}one{prieš {N} sav.}other{prieš {N} sav.}}',
      FUTURE:'{N,plural,few{po {N} sav.}many{po {N} sav.}one{po {N} sav.}other{po {N} sav.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'praėjusią savaitę','0':'šią savaitę','1':'kitą savaitę'},
      PAST:'{N,plural,few{prieš {N} sav.}many{prieš {N} sav.}one{prieš {N} sav.}other{prieš {N} sav.}}',
      FUTURE:'{N,plural,few{po {N} sav.}many{po {N} sav.}one{po {N} sav.}other{po {N} sav.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'praėjusiais metais','0':'šiais metais','1':'kitais metais'},
      PAST:'{N,plural,few{prieš {N} metus}many{prieš {N} metų}one{prieš {N} metus}other{prieš {N} metų}}',
      FUTURE:'{N,plural,few{po {N} metų}many{po {N} metų}one{po {N} metų}other{po {N} metų}}',
    },
    SHORT:{
      RELATIVE:{'-1':'praėjusiais metais','0':'šiais metais','1':'kitais metais'},
      PAST:'{N,plural,few{prieš {N} m.}many{prieš {N} m.}one{prieš {N} m.}other{prieš {N} m.}}',
      FUTURE:'{N,plural,few{po {N} m.}many{po {N} m.}one{po {N} m.}other{po {N} m.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'praėjusiais metais','0':'šiais metais','1':'kitais metais'},
      PAST:'{N,plural,few{prieš {N} m.}many{prieš {N} m.}one{prieš {N} m.}other{prieš {N} m.}}',
      FUTURE:'{N,plural,few{po {N} m.}many{po {N} m.}one{po {N} m.}other{po {N} m.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_lv =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'vakar','-2':'aizvakar','0':'šodien','1':'rīt','2':'parīt'},
      PAST:'{N,plural,one{pirms {N} dienas}other{pirms {N} dienām}zero{pirms {N} dienām}}',
      FUTURE:'{N,plural,one{pēc {N} dienas}other{pēc {N} dienām}zero{pēc {N} dienām}}',
    },
    SHORT:{
      RELATIVE:{'-1':'vakar','-2':'aizvakar','0':'šodien','1':'rīt','2':'parīt'},
      PAST:'{N,plural,one{pirms {N} d.}other{pirms {N} d.}zero{pirms {N} d.}}',
      FUTURE:'{N,plural,one{pēc {N} d.}other{pēc {N} d.}zero{pēc {N} d.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'vakar','-2':'aizvakar','0':'šodien','1':'rīt','2':'parīt'},
      PAST:'{N,plural,one{pirms {N} d.}other{pirms {N} d.}zero{pirms {N} d.}}',
      FUTURE:'{N,plural,one{pēc {N} d.}other{pēc {N} d.}zero{pēc {N} d.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'šajā stundā'},
      PAST:'{N,plural,one{pirms {N} stundas}other{pirms {N} stundām}zero{pirms {N} stundām}}',
      FUTURE:'{N,plural,one{pēc {N} stundas}other{pēc {N} stundām}zero{pēc {N} stundām}}',
    },
    SHORT:{
      RELATIVE:{'0':'šajā stundā'},
      PAST:'{N,plural,one{pirms {N} st.}other{pirms {N} st.}zero{pirms {N} st.}}',
      FUTURE:'{N,plural,one{pēc {N} st.}other{pēc {N} st.}zero{pēc {N} st.}}',
    },
    NARROW:{
      RELATIVE:{'0':'šajā stundā'},
      PAST:'{N,plural,one{pirms {N} h}other{pirms {N} h}zero{pirms {N} h}}',
      FUTURE:'{N,plural,one{pēc {N} h}other{pēc {N} h}zero{pēc {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'šajā minūtē'},
      PAST:'{N,plural,one{pirms {N} minūtes}other{pirms {N} minūtēm}zero{pirms {N} minūtēm}}',
      FUTURE:'{N,plural,one{pēc {N} minūtes}other{pēc {N} minūtēm}zero{pēc {N} minūtēm}}',
    },
    SHORT:{
      RELATIVE:{'0':'šajā minūtē'},
      PAST:'{N,plural,one{pirms {N} min.}other{pirms {N} min.}zero{pirms {N} min.}}',
      FUTURE:'{N,plural,one{pēc {N} min.}other{pēc {N} min.}zero{pēc {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'šajā minūtē'},
      PAST:'{N,plural,one{pirms {N} min}other{pirms {N} min}zero{pirms {N} min}}',
      FUTURE:'{N,plural,one{pēc {N} min}other{pēc {N} min}zero{pēc {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'pagājušajā mēnesī','0':'šajā mēnesī','1':'nākamajā mēnesī'},
      PAST:'{N,plural,one{pirms {N} mēneša}other{pirms {N} mēnešiem}zero{pirms {N} mēnešiem}}',
      FUTURE:'{N,plural,one{pēc {N} mēneša}other{pēc {N} mēnešiem}zero{pēc {N} mēnešiem}}',
    },
    SHORT:{
      RELATIVE:{'-1':'pagājušajā mēnesī','0':'šajā mēnesī','1':'nākamajā mēnesī'},
      PAST:'{N,plural,one{pirms {N} mēn.}other{pirms {N} mēn.}zero{pirms {N} mēn.}}',
      FUTURE:'{N,plural,one{pēc {N} mēn.}other{pēc {N} mēn.}zero{pēc {N} mēn.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'pagājušajā mēnesī','0':'šajā mēnesī','1':'nākamajā mēnesī'},
      PAST:'{N,plural,one{pirms {N} mēn.}other{pirms {N} mēn.}zero{pirms {N} mēn.}}',
      FUTURE:'{N,plural,one{pēc {N} mēn.}other{pēc {N} mēn.}zero{pēc {N} mēn.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'pēdējais ceturksnis','0':'šis ceturksnis','1':'nākamais ceturksnis'},
      PAST:'{N,plural,one{pirms {N} ceturkšņa}other{pirms {N} ceturkšņiem}zero{pirms {N} ceturkšņiem}}',
      FUTURE:'{N,plural,one{pēc {N} ceturkšņa}other{pēc {N} ceturkšņiem}zero{pēc {N} ceturkšņiem}}',
    },
    SHORT:{
      RELATIVE:{'-1':'pēdējais ceturksnis','0':'šis ceturksnis','1':'nākamais ceturksnis'},
      PAST:'{N,plural,one{pirms {N} cet.}other{pirms {N} cet.}zero{pirms {N} cet.}}',
      FUTURE:'{N,plural,one{pēc {N} cet.}other{pēc {N} cet.}zero{pēc {N} cet.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'pēdējais ceturksnis','0':'šis ceturksnis','1':'nākamais ceturksnis'},
      PAST:'{N,plural,one{pirms {N} cet.}other{pirms {N} cet.}zero{pirms {N} cet.}}',
      FUTURE:'{N,plural,one{pēc {N} cet.}other{pēc {N} cet.}zero{pēc {N} cet.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'tagad'},
      PAST:'{N,plural,one{pirms {N} sekundes}other{pirms {N} sekundēm}zero{pirms {N} sekundēm}}',
      FUTURE:'{N,plural,one{pēc {N} sekundes}other{pēc {N} sekundēm}zero{pēc {N} sekundēm}}',
    },
    SHORT:{
      RELATIVE:{'0':'tagad'},
      PAST:'{N,plural,one{pirms {N} sek.}other{pirms {N} sek.}zero{pirms {N} sek.}}',
      FUTURE:'{N,plural,one{pēc {N} sek.}other{pēc {N} sek.}zero{pēc {N} sek.}}',
    },
    NARROW:{
      RELATIVE:{'0':'tagad'},
      PAST:'{N,plural,one{pirms {N} s}other{pirms {N} s}zero{pirms {N} s}}',
      FUTURE:'{N,plural,one{pēc {N} s}other{pēc {N} s}zero{pēc {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'pagājušajā nedēļā','0':'šajā nedēļā','1':'nākamajā nedēļā'},
      PAST:'{N,plural,one{pirms {N} nedēļas}other{pirms {N} nedēļām}zero{pirms {N} nedēļām}}',
      FUTURE:'{N,plural,one{pēc {N} nedēļas}other{pēc {N} nedēļām}zero{pēc {N} nedēļām}}',
    },
    SHORT:{
      RELATIVE:{'-1':'pagājušajā nedēļā','0':'šajā nedēļā','1':'nākamajā nedēļā'},
      PAST:'{N,plural,one{pirms {N} ned.}other{pirms {N} ned.}zero{pirms {N} ned.}}',
      FUTURE:'{N,plural,one{pēc {N} ned.}other{pēc {N} ned.}zero{pēc {N} ned.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'pagājušajā nedēļā','0':'šajā nedēļā','1':'nākamajā nedēļā'},
      PAST:'{N,plural,one{pirms {N} ned.}other{pirms {N} ned.}zero{pirms {N} ned.}}',
      FUTURE:'{N,plural,one{pēc {N} ned.}other{pēc {N} ned.}zero{pēc {N} ned.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'pagājušajā gadā','0':'šajā gadā','1':'nākamajā gadā'},
      PAST:'{N,plural,one{pirms {N} gada}other{pirms {N} gadiem}zero{pirms {N} gadiem}}',
      FUTURE:'{N,plural,one{pēc {N} gada}other{pēc {N} gadiem}zero{pēc {N} gadiem}}',
    },
    SHORT:{
      RELATIVE:{'-1':'pagājušajā gadā','0':'šajā gadā','1':'nākamajā gadā'},
      PAST:'{N,plural,one{pirms {N} g.}other{pirms {N} g.}zero{pirms {N} g.}}',
      FUTURE:'{N,plural,one{pēc {N} g.}other{pēc {N} g.}zero{pēc {N} g.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'pagājušajā gadā','0':'šajā gadā','1':'nākamajā gadā'},
      PAST:'{N,plural,one{pirms {N} g.}other{pirms {N} g.}zero{pirms {N} g.}}',
      FUTURE:'{N,plural,one{pēc {N} g.}other{pēc {N} g.}zero{pēc {N} g.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_mk =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'вчера','-2':'завчера','0':'денес','1':'утре','2':'задутре'},
      PAST:'{N,plural,one{пред {N} ден}other{пред {N} дена}}',
      FUTURE:'{N,plural,one{за {N} ден}other{за {N} дена}}',
    },
    SHORT:{
      RELATIVE:{'-1':'вчера','-2':'завчера','0':'денес','1':'утре','2':'задутре'},
      PAST:'{N,plural,one{пред {N} ден}other{пред {N} дена}}',
      FUTURE:'{N,plural,one{за {N} ден}other{за {N} дена}}',
    },
    NARROW:{
      RELATIVE:{'-1':'вчера','-2':'завчера','0':'денес','1':'утре','2':'задутре'},
      PAST:'{N,plural,one{пред {N} ден}other{пред {N} дена}}',
      FUTURE:'{N,plural,one{за {N} ден}other{за {N} дена}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'часов'},
      PAST:'{N,plural,one{пред {N} час}other{пред {N} часа}}',
      FUTURE:'{N,plural,one{за {N} час}other{за {N} часа}}',
    },
    SHORT:{
      RELATIVE:{'0':'часов'},
      PAST:'{N,plural,one{пред {N} час}other{пред {N} часа}}',
      FUTURE:'{N,plural,one{за {N} час}other{за {N} часа}}',
    },
    NARROW:{
      RELATIVE:{'0':'часов'},
      PAST:'{N,plural,one{пред {N} час}other{пред {N} часа}}',
      FUTURE:'{N,plural,one{за {N} час}other{за {N} часа}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'оваа минута'},
      PAST:'{N,plural,one{пред {N} минута}other{пред {N} минути}}',
      FUTURE:'{N,plural,one{за {N} минута}other{за {N} минути}}',
    },
    SHORT:{
      RELATIVE:{'0':'оваа минута'},
      PAST:'{N,plural,one{пред {N} мин.}other{пред {N} мин.}}',
      FUTURE:'{N,plural,one{за {N} мин.}other{за {N} мин.}}',
    },
    NARROW:{
      RELATIVE:{'0':'оваа минута'},
      PAST:'{N,plural,one{пред {N} мин.}other{пред {N} мин.}}',
      FUTURE:'{N,plural,one{за {N} мин.}other{за {N} мин.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'минатиот месец','0':'овој месец','1':'следниот месец'},
      PAST:'{N,plural,one{пред {N} месец}other{пред {N} месеци}}',
      FUTURE:'{N,plural,one{за {N} месец}other{за {N} месеци}}',
    },
    SHORT:{
      RELATIVE:{'-1':'минатиот месец','0':'овој месец','1':'следниот месец'},
      PAST:'{N,plural,one{пред {N} месец}other{пред {N} месеци}}',
      FUTURE:'{N,plural,one{за {N} месец}other{за {N} месеци}}',
    },
    NARROW:{
      RELATIVE:{'-1':'минатиот месец','0':'овој месец','1':'следниот месец'},
      PAST:'{N,plural,one{пред {N} месец}other{пред {N} месеци}}',
      FUTURE:'{N,plural,one{за {N} месец}other{за {N} месеци}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'последното тромесечје','0':'ова тромесечје','1':'следното тромесечје'},
      PAST:'{N,plural,one{пред {N} тромесечје}other{пред {N} тромесечја}}',
      FUTURE:'{N,plural,one{за {N} тромесечје}other{за {N} тромесечја}}',
    },
    SHORT:{
      RELATIVE:{'-1':'последното тромесечје','0':'ова тромесечје','1':'следното тромесечје'},
      PAST:'{N,plural,one{пред {N} тромес.}other{пред {N} тромес.}}',
      FUTURE:'{N,plural,one{за {N} тромес.}other{за {N} тромес.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'последното тромесечје','0':'ова тромесечје','1':'следното тромесечје'},
      PAST:'{N,plural,one{пред {N} тромес.}other{пред {N} тромес.}}',
      FUTURE:'{N,plural,one{за {N} тромес.}other{за {N} тромес.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'сега'},
      PAST:'{N,plural,one{пред {N} секунда}other{пред {N} секунди}}',
      FUTURE:'{N,plural,one{за {N} секунда}other{за {N} секунди}}',
    },
    SHORT:{
      RELATIVE:{'0':'сега'},
      PAST:'{N,plural,one{пред {N} сек.}other{пред {N} сек.}}',
      FUTURE:'{N,plural,one{за {N} сек.}other{за {N} сек.}}',
    },
    NARROW:{
      RELATIVE:{'0':'сега'},
      PAST:'{N,plural,one{пред {N} сек.}other{пред {N} сек.}}',
      FUTURE:'{N,plural,one{за {N} сек.}other{за {N} сек.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'минатата седмица','0':'оваа седмица','1':'следната седмица'},
      PAST:'{N,plural,one{пред {N} седмица}other{пред {N} седмици}}',
      FUTURE:'{N,plural,one{за {N} седмица}other{за {N} седмици}}',
    },
    SHORT:{
      RELATIVE:{'-1':'минатата седмица','0':'оваа седмица','1':'следната седмица'},
      PAST:'{N,plural,one{пред {N} седмица}other{пред {N} седмици}}',
      FUTURE:'{N,plural,one{за {N} седмица}other{за {N} седмици}}',
    },
    NARROW:{
      RELATIVE:{'-1':'минатата седмица','0':'оваа седмица','1':'следната седмица'},
      PAST:'{N,plural,one{пред {N} седмица}other{пред {N} седмици}}',
      FUTURE:'{N,plural,one{за {N} седмица}other{за {N} седмици}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'минатата година','0':'оваа година','1':'следната година'},
      PAST:'{N,plural,one{пред {N} година}other{пред {N} години}}',
      FUTURE:'{N,plural,one{за {N} година}other{за {N} години}}',
    },
    SHORT:{
      RELATIVE:{'-1':'минатата година','0':'оваа година','1':'следната година'},
      PAST:'{N,plural,one{пред {N} год.}other{пред {N} год.}}',
      FUTURE:'{N,plural,one{за {N} год.}other{за {N} год.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'минатата година','0':'оваа година','1':'следната година'},
      PAST:'{N,plural,one{пред {N} год.}other{пред {N} год.}}',
      FUTURE:'{N,plural,one{за {N} год.}other{за {N} год.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ml =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ഇന്നലെ','-2':'മിനിഞ്ഞാന്ന്','0':'ഇന്ന്','1':'നാളെ','2':'മറ്റന്നാൾ'},
      PAST:'{N,plural,one{{N} ദിവസം മുമ്പ്}other{{N} ദിവസം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} ദിവസത്തിൽ}other{{N} ദിവസത്തിൽ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ഇന്നലെ','-2':'മിനിഞ്ഞാന്ന്','0':'ഇന്ന്','1':'നാളെ','2':'മറ്റന്നാൾ'},
      PAST:'{N,plural,one{{N} ദിവസം മുമ്പ്}other{{N} ദിവസം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} ദിവസത്തിൽ}other{{N} ദിവസത്തിൽ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ഇന്നലെ','-2':'മിനിഞ്ഞാന്ന്','0':'ഇന്ന്','1':'നാളെ','2':'മറ്റന്നാൾ'},
      PAST:'{N,plural,one{{N} ദിവസം മുമ്പ്}other{{N} ദിവസം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} ദിവസത്തിൽ}other{{N} ദിവസത്തിൽ}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ഈ മണിക്കൂറിൽ'},
      PAST:'{N,plural,one{{N} മണിക്കൂർ മുമ്പ്}other{{N} മണിക്കൂർ മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} മണിക്കൂറിൽ}other{{N} മണിക്കൂറിൽ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ഈ മണിക്കൂറിൽ'},
      PAST:'{N,plural,one{{N} മണിക്കൂർ മുമ്പ്}other{{N} മണിക്കൂർ മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} മണിക്കൂറിൽ}other{{N} മണിക്കൂറിൽ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ഈ മണിക്കൂറിൽ'},
      PAST:'{N,plural,one{{N} മണിക്കൂർ മുമ്പ്}other{{N} മണിക്കൂർ മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} മണിക്കൂറിൽ}other{{N} മണിക്കൂറിൽ}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ഈ മിനിറ്റിൽ'},
      PAST:'{N,plural,one{{N} മിനിറ്റ് മുമ്പ്}other{{N} മിനിറ്റ് മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} മിനിറ്റിൽ}other{{N} മിനിറ്റിൽ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ഈ മിനിറ്റിൽ'},
      PAST:'{N,plural,one{{N} മിനിറ്റ് മുമ്പ്}other{{N} മിനിറ്റ് മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} മിനിറ്റിൽ}other{{N} മിനിറ്റിൽ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ഈ മിനിറ്റിൽ'},
      PAST:'{N,plural,one{{N} മിനിറ്റ് മുമ്പ്}other{{N} മിനിറ്റ് മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} മിനിറ്റിൽ}other{{N} മിനിറ്റിൽ}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'കഴിഞ്ഞ മാസം','0':'ഈ മാസം','1':'അടുത്ത മാസം'},
      PAST:'{N,plural,one{{N} മാസം മുമ്പ്}other{{N} മാസം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} മാസത്തിൽ}other{{N} മാസത്തിൽ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'കഴിഞ്ഞ മാസം','0':'ഈ മാസം','1':'അടുത്ത മാസം'},
      PAST:'{N,plural,one{{N} മാസം മുമ്പ്}other{{N} മാസം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} മാസത്തിൽ}other{{N} മാസത്തിൽ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'കഴിഞ്ഞ മാസം','0':'ഈ മാസം','1':'അടുത്ത മാസം'},
      PAST:'{N,plural,one{{N} മാസം മുമ്പ്}other{{N} മാസം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} മാസത്തിൽ}other{{N} മാസത്തിൽ}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'കഴിഞ്ഞ പാദം','0':'ഈ പാദം','1':'അടുത്ത പാദം'},
      PAST:'{N,plural,one{{N} പാദം മുമ്പ്}other{{N} പാദം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} പാദത്തിൽ}other{{N} പാദത്തിൽ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'കഴിഞ്ഞ പാദം','0':'ഈ പാദം','1':'അടുത്ത പാദം'},
      PAST:'{N,plural,one{{N} പാദം മുമ്പ്}other{{N} പാദം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} പാദത്തിൽ}other{{N} പാദത്തിൽ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'കഴിഞ്ഞ പാദം','0':'ഈ പാദം','1':'അടുത്ത പാദം'},
      PAST:'{N,plural,one{{N} പാദം മുമ്പ്}other{{N} പാദം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} പാദത്തിൽ}other{{N} പാദത്തിൽ}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ഇപ്പോൾ'},
      PAST:'{N,plural,one{{N} സെക്കൻഡ് മുമ്പ്}other{{N} സെക്കൻഡ് മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} സെക്കൻഡിൽ}other{{N} സെക്കൻഡിൽ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ഇപ്പോൾ'},
      PAST:'{N,plural,one{{N} സെക്കൻഡ് മുമ്പ്}other{{N} സെക്കൻഡ് മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} സെക്കൻഡിൽ}other{{N} സെക്കൻഡിൽ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ഇപ്പോൾ'},
      PAST:'{N,plural,one{{N} സെക്കൻഡ് മുമ്പ്}other{{N} സെക്കൻഡ് മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} സെക്കൻഡിൽ}other{{N} സെക്കൻഡിൽ}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'കഴിഞ്ഞ ആഴ്‌ച','0':'ഈ ആഴ്ച','1':'അടുത്ത ആഴ്ച'},
      PAST:'{N,plural,one{{N} ആഴ്ച മുമ്പ്}other{{N} ആഴ്ച മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} ആഴ്ചയിൽ}other{{N} ആഴ്ചയിൽ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'കഴിഞ്ഞ ആഴ്‌ച','0':'ഈ ആഴ്ച','1':'അടുത്ത ആഴ്ച'},
      PAST:'{N,plural,one{{N} ആഴ്ച മുമ്പ്}other{{N} ആഴ്ച മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} ആഴ്ചയിൽ}other{{N} ആഴ്ചയിൽ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'കഴിഞ്ഞ ആഴ്‌ച','0':'ഈ ആഴ്ച','1':'അടുത്ത ആഴ്ച'},
      PAST:'{N,plural,one{{N} ആഴ്ച മുമ്പ്}other{{N} ആഴ്ച മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} ആഴ്ചയിൽ}other{{N} ആഴ്ചയിൽ}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'കഴിഞ്ഞ വർഷം','0':'ഈ വർ‌ഷം','1':'അടുത്തവർഷം'},
      PAST:'{N,plural,one{{N} വർഷം മുമ്പ്}other{{N} വർഷം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} വർഷത്തിൽ}other{{N} വർഷത്തിൽ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'കഴിഞ്ഞ വർഷം','0':'ഈ വർ‌ഷം','1':'അടുത്തവർഷം'},
      PAST:'{N,plural,one{{N} വർഷം മുമ്പ്}other{{N} വർഷം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} വർഷത്തിൽ}other{{N} വർഷത്തിൽ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'കഴിഞ്ഞ വർഷം','0':'ഈ വർ‌ഷം','1':'അടുത്തവർഷം'},
      PAST:'{N,plural,one{{N} വർഷം മുമ്പ്}other{{N} വർഷം മുമ്പ്}}',
      FUTURE:'{N,plural,one{{N} വർഷത്തിൽ}other{{N} വർഷത്തിൽ}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_mn =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'өчигдөр','-2':'уржигдар','0':'өнөөдөр','1':'маргааш','2':'нөгөөдөр'},
      PAST:'{N,plural,one{{N} өдрийн өмнө}other{{N} өдрийн өмнө}}',
      FUTURE:'{N,plural,one{{N} өдрийн дараа}other{{N} өдрийн дараа}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өчигдөр','-2':'уржигдар','0':'өнөөдөр','1':'маргааш','2':'нөгөөдөр'},
      PAST:'{N,plural,one{{N} өдрийн өмнө}other{{N} өдрийн өмнө}}',
      FUTURE:'{N,plural,one{{N} өдрийн дараа}other{{N} өдрийн дараа}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өчигдөр','-2':'уржигдар','0':'өнөөдөр','1':'маргааш','2':'нөгөөдөр'},
      PAST:'{N,plural,one{{N} өдрийн өмнө}other{{N} өдрийн өмнө}}',
      FUTURE:'{N,plural,one{{N} өдрийн дараа}other{{N} өдрийн дараа}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'энэ цаг'},
      PAST:'{N,plural,one{{N} цагийн өмнө}other{{N} цагийн өмнө}}',
      FUTURE:'{N,plural,one{{N} цагийн дараа}other{{N} цагийн дараа}}',
    },
    SHORT:{
      RELATIVE:{'0':'энэ цаг'},
      PAST:'{N,plural,one{{N} ц өмнө}other{{N} ц өмнө}}',
      FUTURE:'{N,plural,one{{N} ц дараа}other{{N} ц дараа}}',
    },
    NARROW:{
      RELATIVE:{'0':'энэ цаг'},
      PAST:'{N,plural,one{{N} ц өмнө}other{{N} ц өмнө}}',
      FUTURE:'{N,plural,one{{N} ц дараа}other{{N} ц дараа}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'энэ минут'},
      PAST:'{N,plural,one{{N} минутын өмнө}other{{N} минутын өмнө}}',
      FUTURE:'{N,plural,one{{N} минутын дараа}other{{N} минутын дараа}}',
    },
    SHORT:{
      RELATIVE:{'0':'энэ минут'},
      PAST:'{N,plural,one{{N} мин өмнө}other{{N} мин өмнө}}',
      FUTURE:'{N,plural,one{{N} мин дараа}other{{N} мин дараа}}',
    },
    NARROW:{
      RELATIVE:{'0':'энэ минут'},
      PAST:'{N,plural,one{{N} мин өмнө}other{{N} мин өмнө}}',
      FUTURE:'{N,plural,one{{N} мин дараа}other{{N} мин дараа}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'өнгөрсөн сар','0':'энэ сар','1':'ирэх сар'},
      PAST:'{N,plural,one{{N} сарын өмнө}other{{N} сарын өмнө}}',
      FUTURE:'{N,plural,one{{N} сарын дараа}other{{N} сарын дараа}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өнгөрсөн сар','0':'энэ сар','1':'ирэх сар'},
      PAST:'{N,plural,one{{N} сарын өмнө}other{{N} сарын өмнө}}',
      FUTURE:'{N,plural,one{{N} сарын дараа}other{{N} сарын дараа}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өнгөрсөн сар','0':'энэ сар','1':'ирэх сар'},
      PAST:'{N,plural,one{{N} сарын өмнө}other{{N} сарын өмнө}}',
      FUTURE:'{N,plural,one{{N} сарын дараа}other{{N} сарын дараа}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'өнгөрсөн улирал','0':'энэ улирал','1':'дараагийн улирал'},
      PAST:'{N,plural,one{{N} улирлын өмнө}other{{N} улирлын өмнө}}',
      FUTURE:'{N,plural,one{{N} улирлын дараа}other{{N} улирлын дараа}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өнгөрсөн улирал','0':'энэ улирал','1':'дараагийн улирал'},
      PAST:'{N,plural,one{{N} улирлын өмнө}other{{N} улирлын өмнө}}',
      FUTURE:'{N,plural,one{{N} улирлын дараа}other{{N} улирлын дараа}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өнгөрсөн улирал','0':'энэ улирал','1':'дараагийн улирал'},
      PAST:'{N,plural,one{{N} улирлын өмнө}other{{N} улирлын өмнө}}',
      FUTURE:'{N,plural,one{{N} улирлын дараа}other{{N} улирлын дараа}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'одоо'},
      PAST:'{N,plural,one{{N} секундын өмнө}other{{N} секундын өмнө}}',
      FUTURE:'{N,plural,one{{N} секундын дараа}other{{N} секундын дараа}}',
    },
    SHORT:{
      RELATIVE:{'0':'одоо'},
      PAST:'{N,plural,one{{N} сек өмнө}other{{N} сек өмнө}}',
      FUTURE:'{N,plural,one{{N} сек дараа}other{{N} сек дараа}}',
    },
    NARROW:{
      RELATIVE:{'0':'одоо'},
      PAST:'{N,plural,one{{N} сек өмнө}other{{N} сек өмнө}}',
      FUTURE:'{N,plural,one{{N} сек дараа}other{{N} сек дараа}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'өнгөрсөн долоо хоног','0':'энэ долоо хоног','1':'ирэх долоо хоног'},
      PAST:'{N,plural,one{{N} долоо хоногийн өмнө}other{{N} долоо хоногийн өмнө}}',
      FUTURE:'{N,plural,one{{N} долоо хоногийн дараа}other{{N} долоо хоногийн дараа}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өнгөрсөн долоо хоног','0':'энэ долоо хоног','1':'ирэх долоо хоног'},
      PAST:'{N,plural,one{{N} 7 хоногийн өмнө}other{{N} 7 хоногийн өмнө}}',
      FUTURE:'{N,plural,one{{N} 7 хоногийн дараа}other{{N} 7 хоногийн дараа}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өнгөрсөн долоо хоног','0':'энэ долоо хоног','1':'ирэх долоо хоног'},
      PAST:'{N,plural,one{{N} 7 хоногийн өмнө}other{{N} 7 хоногийн өмнө}}',
      FUTURE:'{N,plural,one{{N} 7 хоногийн дараа}other{{N} 7 хоногийн дараа}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'өнгөрсөн жил','0':'энэ жил','1':'ирэх жил'},
      PAST:'{N,plural,one{{N} жилийн өмнө}other{{N} жилийн өмнө}}',
      FUTURE:'{N,plural,one{{N} жилийн дараа}other{{N} жилийн дараа}}',
    },
    SHORT:{
      RELATIVE:{'-1':'өнгөрсөн жил','0':'энэ жил','1':'ирэх жил'},
      PAST:'{N,plural,one{{N} жилийн өмнө}other{{N} жилийн өмнө}}',
      FUTURE:'{N,plural,one{{N} жилийн дараа}other{{N} жилийн дараа}}',
    },
    NARROW:{
      RELATIVE:{'-1':'өнгөрсөн жил','0':'энэ жил','1':'ирэх жил'},
      PAST:'{N,plural,one{{N} жилийн өмнө}other{{N} жилийн өмнө}}',
      FUTURE:'{N,plural,one{{N} жилийн дараа}other{{N} жилийн дараа}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_mo =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ieri','-2':'alaltăieri','0':'azi','1':'mâine','2':'poimâine'},
      PAST:'{N,plural,few{acum {N} zile}one{acum {N} zi}other{acum {N} de zile}}',
      FUTURE:'{N,plural,few{peste {N} zile}one{peste {N} zi}other{peste {N} de zile}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ieri','-2':'alaltăieri','0':'azi','1':'mâine','2':'poimâine'},
      PAST:'{N,plural,few{acum {N} zile}one{acum {N} zi}other{acum {N} de zile}}',
      FUTURE:'{N,plural,few{peste {N} zile}one{peste {N} zi}other{peste {N} de zile}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ieri','-2':'alaltăieri','0':'azi','1':'mâine','2':'poimâine'},
      PAST:'{N,plural,few{-{N} zile}one{-{N} zi}other{-{N} zile}}',
      FUTURE:'{N,plural,few{+{N} zile}one{+{N} zi}other{+{N} zile}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ora aceasta'},
      PAST:'{N,plural,few{acum {N} ore}one{acum {N} oră}other{acum {N} de ore}}',
      FUTURE:'{N,plural,few{peste {N} ore}one{peste {N} oră}other{peste {N} de ore}}',
    },
    SHORT:{
      RELATIVE:{'0':'ora aceasta'},
      PAST:'{N,plural,few{acum {N} h}one{acum {N} h}other{acum {N} h}}',
      FUTURE:'{N,plural,few{peste {N} h}one{peste {N} h}other{peste {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'ora aceasta'},
      PAST:'{N,plural,few{-{N} h}one{-{N} h}other{-{N} h}}',
      FUTURE:'{N,plural,few{+{N} h}one{+{N} h}other{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'minutul acesta'},
      PAST:'{N,plural,few{acum {N} minute}one{acum {N} minut}other{acum {N} de minute}}',
      FUTURE:'{N,plural,few{peste {N} minute}one{peste {N} minut}other{peste {N} de minute}}',
    },
    SHORT:{
      RELATIVE:{'0':'minutul acesta'},
      PAST:'{N,plural,few{acum {N} min.}one{acum {N} min.}other{acum {N} min.}}',
      FUTURE:'{N,plural,few{peste {N} min.}one{peste {N} min.}other{peste {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'minutul acesta'},
      PAST:'{N,plural,few{-{N} m}one{-{N} m}other{-{N} m}}',
      FUTURE:'{N,plural,few{+{N} m}one{+{N} m}other{+{N} m}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'luna trecută','0':'luna aceasta','1':'luna viitoare'},
      PAST:'{N,plural,few{acum {N} luni}one{acum {N} lună}other{acum {N} de luni}}',
      FUTURE:'{N,plural,few{peste {N} luni}one{peste {N} lună}other{peste {N} de luni}}',
    },
    SHORT:{
      RELATIVE:{'-1':'luna trecută','0':'luna aceasta','1':'luna viitoare'},
      PAST:'{N,plural,few{acum {N} luni}one{acum {N} lună}other{acum {N} luni}}',
      FUTURE:'{N,plural,few{peste {N} luni}one{peste {N} lună}other{peste {N} luni}}',
    },
    NARROW:{
      RELATIVE:{'-1':'luna trecută','0':'luna aceasta','1':'luna viitoare'},
      PAST:'{N,plural,few{-{N} luni}one{-{N} lună}other{-{N} luni}}',
      FUTURE:'{N,plural,few{+{N} luni}one{+{N} lună}other{+{N} luni}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'trimestrul trecut','0':'trimestrul acesta','1':'trimestrul viitor'},
      PAST:'{N,plural,few{acum {N} trimestre}one{acum {N} trimestru}other{acum {N} de trimestre}}',
      FUTURE:'{N,plural,few{peste {N} trimestre}one{peste {N} trimestru}other{peste {N} de trimestre}}',
    },
    SHORT:{
      RELATIVE:{'-1':'trim. trecut','0':'trim. acesta','1':'trim. viitor'},
      PAST:'{N,plural,few{acum {N} trim.}one{acum {N} trim.}other{acum {N} trim.}}',
      FUTURE:'{N,plural,few{peste {N} trim.}one{peste {N} trim.}other{peste {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'trim. trecut','0':'trim. acesta','1':'trim. viitor'},
      PAST:'{N,plural,few{-{N} trim.}one{-{N} trim.}other{-{N} trim.}}',
      FUTURE:'{N,plural,few{+{N} trim.}one{+{N} trim.}other{+{N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'acum'},
      PAST:'{N,plural,few{acum {N} secunde}one{acum {N} secundă}other{acum {N} de secunde}}',
      FUTURE:'{N,plural,few{peste {N} secunde}one{peste {N} secundă}other{peste {N} de secunde}}',
    },
    SHORT:{
      RELATIVE:{'0':'acum'},
      PAST:'{N,plural,few{acum {N} sec.}one{acum {N} sec.}other{acum {N} sec.}}',
      FUTURE:'{N,plural,few{peste {N} sec.}one{peste {N} sec.}other{peste {N} sec.}}',
    },
    NARROW:{
      RELATIVE:{'0':'acum'},
      PAST:'{N,plural,few{-{N} s}one{-{N} s}other{-{N} s}}',
      FUTURE:'{N,plural,few{+{N} s}one{+{N} s}other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'săptămâna trecută','0':'săptămâna aceasta','1':'săptămâna viitoare'},
      PAST:'{N,plural,few{acum {N} săptămâni}one{acum {N} săptămână}other{acum {N} de săptămâni}}',
      FUTURE:'{N,plural,few{peste {N} săptămâni}one{peste {N} săptămână}other{peste {N} de săptămâni}}',
    },
    SHORT:{
      RELATIVE:{'-1':'săpt. trecută','0':'săpt. aceasta','1':'săpt. viitoare'},
      PAST:'{N,plural,few{acum {N} săpt.}one{acum {N} săpt.}other{acum {N} săpt.}}',
      FUTURE:'{N,plural,few{peste {N} săpt.}one{peste {N} săpt.}other{peste {N} săpt.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'săpt. trecută','0':'săptămâna aceasta','1':'săpt. viitoare'},
      PAST:'{N,plural,few{-{N} săpt.}one{-{N} săpt.}other{-{N} săpt.}}',
      FUTURE:'{N,plural,few{+{N} săpt.}one{+{N} săpt.}other{+{N} săpt.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'anul trecut','0':'anul acesta','1':'anul viitor'},
      PAST:'{N,plural,few{acum {N} ani}one{acum {N} an}other{acum {N} de ani}}',
      FUTURE:'{N,plural,few{peste {N} ani}one{peste {N} an}other{peste {N} de ani}}',
    },
    SHORT:{
      RELATIVE:{'-1':'anul trecut','0':'anul acesta','1':'anul viitor'},
      PAST:'{N,plural,few{acum {N} ani}one{acum {N} an}other{acum {N} de ani}}',
      FUTURE:'{N,plural,few{peste {N} ani}one{peste {N} an}other{peste {N} de ani}}',
    },
    NARROW:{
      RELATIVE:{'-1':'anul trecut','0':'anul acesta','1':'anul viitor'},
      PAST:'{N,plural,few{-{N} ani}one{-{N} an}other{-{N} ani}}',
      FUTURE:'{N,plural,few{+{N} ani}one{+{N} an}other{+{N} ani}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_mr =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'काल','0':'आज','1':'उद्या'},
      PAST:'{N,plural,one{{N} दिवसापूर्वी}other{{N} दिवसांपूर्वी}}',
      FUTURE:'{N,plural,one{येत्या {N} दिवसामध्ये}other{येत्या {N} दिवसांमध्ये}}',
    },
    SHORT:{
      RELATIVE:{'-1':'काल','0':'आज','1':'उद्या'},
      PAST:'{N,plural,one{{N} दिवसापूर्वी}other{{N} दिवसांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} दिवसामध्ये}other{येत्या {N} दिवसांमध्ये}}',
    },
    NARROW:{
      RELATIVE:{'-1':'काल','0':'आज','1':'उद्या'},
      PAST:'{N,plural,one{{N} दिवसापूर्वी}other{{N} दिवसांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} दिवसामध्ये}other{{N} दिवसांमध्ये}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'तासात'},
      PAST:'{N,plural,one{{N} तासापूर्वी}other{{N} तासांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} तासामध्ये}other{{N} तासांमध्ये}}',
    },
    SHORT:{
      RELATIVE:{'0':'तासात'},
      PAST:'{N,plural,one{{N} तासापूर्वी}other{{N} तासांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} तासामध्ये}other{{N} तासांमध्ये}}',
    },
    NARROW:{
      RELATIVE:{'0':'तासात'},
      PAST:'{N,plural,one{{N} तासापूर्वी}other{{N} तासांपूर्वी}}',
      FUTURE:'{N,plural,one{येत्या {N} तासामध्ये}other{येत्या {N} तासांमध्ये}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'या मिनिटात'},
      PAST:'{N,plural,one{{N} मिनिटापूर्वी}other{{N} मिनिटांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} मिनिटामध्ये}other{{N} मिनिटांमध्ये}}',
    },
    SHORT:{
      RELATIVE:{'0':'या मिनिटात'},
      PAST:'{N,plural,one{{N} मिनि. पूर्वी}other{{N} मिनि. पूर्वी}}',
      FUTURE:'{N,plural,one{{N} मिनि. मध्ये}other{{N} मिनि. मध्ये}}',
    },
    NARROW:{
      RELATIVE:{'0':'या मिनिटात'},
      PAST:'{N,plural,one{{N} मिनि. पूर्वी}other{{N} मिनि. पूर्वी}}',
      FUTURE:'{N,plural,one{{N} मिनि. मध्ये}other{{N} मिनि. मध्ये}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'मागील महिना','0':'हा महिना','1':'पुढील महिना'},
      PAST:'{N,plural,one{{N} महिन्यापूर्वी}other{{N} महिन्यांपूर्वी}}',
      FUTURE:'{N,plural,one{येत्या {N} महिन्यामध्ये}other{येत्या {N} महिन्यांमध्ये}}',
    },
    SHORT:{
      RELATIVE:{'-1':'मागील महिना','0':'हा महिना','1':'पुढील महिना'},
      PAST:'{N,plural,one{{N} महिन्यापूर्वी}other{{N} महिन्यांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} महिन्यामध्ये}other{{N} महिन्यामध्ये}}',
    },
    NARROW:{
      RELATIVE:{'-1':'मागील महिना','0':'हा महिना','1':'पुढील महिना'},
      PAST:'{N,plural,one{{N} महिन्यापूर्वी}other{{N} महिन्यांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} महिन्यामध्ये}other{{N} महिन्यांमध्ये}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'मागील तिमाही','0':'ही तिमाही','1':'पुढील तिमाही'},
      PAST:'{N,plural,one{{N} तिमाहीपूर्वी}other{{N} तिमाहींपूर्वी}}',
      FUTURE:'{N,plural,one{{N} तिमाहीमध्ये}other{{N} तिमाहींमध्ये}}',
    },
    SHORT:{
      RELATIVE:{'-1':'मागील तिमाही','0':'ही तिमाही','1':'पुढील तिमाही'},
      PAST:'{N,plural,one{{N} तिमाहीपूर्वी}other{{N} तिमाहींपूर्वी}}',
      FUTURE:'{N,plural,one{येत्या {N} तिमाहीमध्ये}other{येत्या {N} तिमाहींमध्ये}}',
    },
    NARROW:{
      RELATIVE:{'-1':'मागील तिमाही','0':'ही तिमाही','1':'पुढील तिमाही'},
      PAST:'{N,plural,one{{N} तिमाहीपूर्वी}other{{N} तिमाहींपूर्वी}}',
      FUTURE:'{N,plural,one{{N} तिमाहीमध्ये}other{{N} तिमाहींमध्ये}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'आत्ता'},
      PAST:'{N,plural,one{{N} सेकंदापूर्वी}other{{N} सेकंदांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} सेकंदामध्ये}other{{N} सेकंदांमध्ये}}',
    },
    SHORT:{
      RELATIVE:{'0':'आत्ता'},
      PAST:'{N,plural,one{{N} से. पूर्वी}other{{N} से. पूर्वी}}',
      FUTURE:'{N,plural,one{{N} से. मध्ये}other{{N} से. मध्ये}}',
    },
    NARROW:{
      RELATIVE:{'0':'आत्ता'},
      PAST:'{N,plural,one{{N} से. पूर्वी}other{{N} से. पूर्वी}}',
      FUTURE:'{N,plural,one{{N} से. मध्ये}other{येत्या {N} से. मध्ये}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'मागील आठवडा','0':'हा आठवडा','1':'पुढील आठवडा'},
      PAST:'{N,plural,one{{N} आठवड्यापूर्वी}other{{N} आठवड्यांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} आठवड्यामध्ये}other{{N} आठवड्यांमध्ये}}',
    },
    SHORT:{
      RELATIVE:{'-1':'मागील आठवडा','0':'हा आठवडा','1':'पुढील आठवडा'},
      PAST:'{N,plural,one{{N} आठवड्यापूर्वी}other{{N} आठवड्यांपूर्वी}}',
      FUTURE:'{N,plural,one{येत्या {N} आठवड्यामध्ये}other{येत्या {N} आठवड्यांमध्ये}}',
    },
    NARROW:{
      RELATIVE:{'-1':'मागील आठवडा','0':'हा आठवडा','1':'पुढील आठवडा'},
      PAST:'{N,plural,one{{N} आठवड्यापूर्वी}other{{N} आठवड्यांपूर्वी}}',
      FUTURE:'{N,plural,one{येत्या {N} आठवड्यामध्ये}other{येत्या {N} आठवड्यांमध्ये}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'मागील वर्ष','0':'हे वर्ष','1':'पुढील वर्ष'},
      PAST:'{N,plural,one{{N} वर्षापूर्वी}other{{N} वर्षांपूर्वी}}',
      FUTURE:'{N,plural,one{येत्या {N} वर्षामध्ये}other{येत्या {N} वर्षांमध्ये}}',
    },
    SHORT:{
      RELATIVE:{'-1':'मागील वर्ष','0':'हे वर्ष','1':'पुढील वर्ष'},
      PAST:'{N,plural,one{{N} वर्षापूर्वी}other{{N} वर्षांपूर्वी}}',
      FUTURE:'{N,plural,one{{N} वर्षामध्ये}other{{N} वर्षांमध्ये}}',
    },
    NARROW:{
      RELATIVE:{'-1':'मागील वर्ष','0':'हे वर्ष','1':'पुढील वर्ष'},
      PAST:'{N,plural,one{{N} वर्षापूर्वी}other{{N} वर्षांपूर्वी}}',
      FUTURE:'{N,plural,one{येत्या {N} वर्षामध्ये}other{येत्या {N} वर्षांमध्ये}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ms =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'semalam','-2':'kelmarin','0':'hari ini','1':'esok','2':'lusa'},
      PAST:'{N,plural,other{{N} hari lalu}}',
      FUTURE:'{N,plural,other{dalam {N} hari}}',
    },
    SHORT:{
      RELATIVE:{'-1':'semlm','-2':'kelmarin','0':'hari ini','1':'esok','2':'lusa'},
      PAST:'{N,plural,other{{N} hari lalu}}',
      FUTURE:'{N,plural,other{dlm {N} hari}}',
    },
    NARROW:{
      RELATIVE:{'-1':'semlm','-2':'kelmarin','0':'hari ini','1':'esok','2':'lusa'},
      PAST:'{N,plural,other{{N} hari lalu}}',
      FUTURE:'{N,plural,other{dlm {N} hari}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'jam ini'},
      PAST:'{N,plural,other{{N} jam lalu}}',
      FUTURE:'{N,plural,other{dalam {N} jam}}',
    },
    SHORT:{
      RELATIVE:{'0':'jam ini'},
      PAST:'{N,plural,other{{N} jam lalu}}',
      FUTURE:'{N,plural,other{dlm {N} jam}}',
    },
    NARROW:{
      RELATIVE:{'0':'jam ini'},
      PAST:'{N,plural,other{{N} jam lalu}}',
      FUTURE:'{N,plural,other{dlm {N} jam}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'pada minit ini'},
      PAST:'{N,plural,other{{N} minit lalu}}',
      FUTURE:'{N,plural,other{dalam {N} minit}}',
    },
    SHORT:{
      RELATIVE:{'0':'pada minit ini'},
      PAST:'{N,plural,other{{N} min lalu}}',
      FUTURE:'{N,plural,other{dlm {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'pada minit ini'},
      PAST:'{N,plural,other{{N} min lalu}}',
      FUTURE:'{N,plural,other{dlm {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'bulan lalu','0':'bulan ini','1':'bulan depan'},
      PAST:'{N,plural,other{{N} bulan lalu}}',
      FUTURE:'{N,plural,other{dalam {N} bulan}}',
    },
    SHORT:{
      RELATIVE:{'-1':'bln lalu','0':'bln ini','1':'bln depan'},
      PAST:'{N,plural,other{{N} bln lalu}}',
      FUTURE:'{N,plural,other{dlm {N} bln}}',
    },
    NARROW:{
      RELATIVE:{'-1':'bln lalu','0':'bln ini','1':'bln depan'},
      PAST:'{N,plural,other{{N} bulan lalu}}',
      FUTURE:'{N,plural,other{dlm {N} bln}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'suku tahun lalu','0':'suku tahun ini','1':'suku tahun seterusnya'},
      PAST:'{N,plural,other{{N} suku tahun lalu}}',
      FUTURE:'{N,plural,other{dalam {N} suku tahun}}',
    },
    SHORT:{
      RELATIVE:{'-1':'suku lepas','0':'suku ini','1':'suku seterusnya'},
      PAST:'{N,plural,other{{N} suku thn lalu}}',
      FUTURE:'{N,plural,other{dlm {N} suku thn}}',
    },
    NARROW:{
      RELATIVE:{'-1':'suku lepas','0':'suku ini','1':'suku seterusnya'},
      PAST:'{N,plural,other{{N} suku thn lalu}}',
      FUTURE:'{N,plural,other{dlm {N} suku thn}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'sekarang'},
      PAST:'{N,plural,other{{N} saat lalu}}',
      FUTURE:'{N,plural,other{dalam {N} saat}}',
    },
    SHORT:{
      RELATIVE:{'0':'sekarang'},
      PAST:'{N,plural,other{{N} saat lalu}}',
      FUTURE:'{N,plural,other{dlm {N} saat}}',
    },
    NARROW:{
      RELATIVE:{'0':'sekarang'},
      PAST:'{N,plural,other{{N} saat lalu}}',
      FUTURE:'{N,plural,other{dlm {N} saat}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'minggu lalu','0':'minggu ini','1':'minggu depan'},
      PAST:'{N,plural,other{{N} minggu lalu}}',
      FUTURE:'{N,plural,other{dalam {N} minggu}}',
    },
    SHORT:{
      RELATIVE:{'-1':'mng lepas','0':'mng ini','1':'mng depan'},
      PAST:'{N,plural,other{{N} mgu lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mgu}}',
    },
    NARROW:{
      RELATIVE:{'-1':'mng lepas','0':'mng ini','1':'mng depan'},
      PAST:'{N,plural,other{{N} mgu lalu}}',
      FUTURE:'{N,plural,other{dlm {N} mgu}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'tahun lalu','0':'tahun ini','1':'tahun depan'},
      PAST:'{N,plural,other{{N} tahun lalu}}',
      FUTURE:'{N,plural,other{dalam {N} tahun}}',
    },
    SHORT:{
      RELATIVE:{'-1':'thn lepas','0':'thn ini','1':'thn depan'},
      PAST:'{N,plural,other{{N} thn lalu}}',
      FUTURE:'{N,plural,other{dalam {N} thn}}',
    },
    NARROW:{
      RELATIVE:{'-1':'thn lepas','0':'thn ini','1':'thn depan'},
      PAST:'{N,plural,other{{N} thn lalu}}',
      FUTURE:'{N,plural,other{dalam {N} thn}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_mt =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'lbieraħ','0':'illum','1':'għada'},
      PAST:'{N,plural,few{{N} ġranet ilu}many{{N}-il ġurnata ilu}one{ġurnata ilu}other{{N}-il ġurnata ilu}}',
      FUTURE:'{N,plural,few{fi żmien {N} ġurnata oħra}many{fi żmien {N} ġurnata oħra}one{fi żmien ġurnata}other{fi żmien {N} ġurnata oħra}}',
    },
    SHORT:{
      RELATIVE:{'-1':'lbieraħ','0':'illum','1':'għada'},
      PAST:'{N,plural,few{{N} ġranet ilu}many{{N}-il ġurnata ilu}one{ġurnata ilu}other{{N}-il ġurnata ilu}}',
      FUTURE:'{N,plural,few{fi żmien {N} ġurnata oħra}many{fi żmien {N} ġurnata oħra}one{fi żmien ġurnata}other{fi żmien {N} ġurnata oħra}}',
    },
    NARROW:{
      RELATIVE:{'-1':'lbieraħ','0':'illum','1':'għada'},
      PAST:'{N,plural,few{{N} ġranet ilu}many{{N}-il ġurnata ilu}one{ġurnata ilu}other{{N}-il ġurnata ilu}}',
      FUTURE:'{N,plural,few{fi żmien {N} ġurnata oħra}many{fi żmien {N} ġurnata oħra}one{fi żmien ġurnata}other{fi żmien {N} ġurnata oħra}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'din is-siegħa'},
      PAST:'{N,plural,few{{N} sigħat ilu}many{{N} sigħat ilu}one{siegħa ilu}other{{N} sigħat ilu}}',
      FUTURE:'{N,plural,few{fi żmien {N} sigħat}many{fi żmien{N} sigħat}one{fi żmien siegħa oħra}other{fi żmien {N} sigħat}}',
    },
    SHORT:{
      RELATIVE:{'0':'din is-siegħa'},
      PAST:'{N,plural,few{{N} sigħat ilu}many{{N} sigħat ilu}one{siegħa ilu}other{{N} sigħat ilu}}',
      FUTURE:'{N,plural,few{fi żmien {N} sigħat}many{+{N} h}one{fi żmien siegħa oħra}other{fi żmien {N} sigħat}}',
    },
    NARROW:{
      RELATIVE:{'0':'din is-siegħa'},
      PAST:'{N,plural,few{{N} sigħat ilu}many{{N} sigħat ilu}one{siegħa ilu}other{{N} sigħat ilu}}',
      FUTURE:'{N,plural,few{fi żmien {N} sigħat}many{fi żmien {N} sigħat}one{fi żmien siegħa oħra}other{fi żmien {N} sigħat}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'din il-minuta'},
      PAST:'{N,plural,few{{N} minuti ilu}many{{N} minuti ilu}one{minuta ilu}other{{N} minuti ilu}}',
      FUTURE:'{N,plural,few{sa {N} minuti oħra}many{sa {N} minuti oħra}one{sa minuta oħra}other{sa {N} minuti oħra}}',
    },
    SHORT:{
      RELATIVE:{'0':'din il-minuta'},
      PAST:'{N,plural,few{{N} min. ilu}many{{N} minuti ilu}one{min. ilu}other{{N} min. ilu}}',
      FUTURE:'{N,plural,few{sa {N} min. oħra}many{sa {N} min. oħra}one{sa min. oħra}other{sa {N} min. oħra}}',
    },
    NARROW:{
      RELATIVE:{'0':'din il-minuta'},
      PAST:'{N,plural,few{{N} min. ilu}many{{N} min. ilu}one{min. ilu}other{{N} min. ilu}}',
      FUTURE:'{N,plural,few{sa {N} min. oħra}many{+{N} min}one{sa min. oħra}other{sa {N} min. oħra}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'Ix-xahar li għadda','0':'Dan ix-xahar','1':'Ix-xahar id-dieħel'},
      PAST:'{N,plural,few{{N} xhur ilu}many{{N} xhur ilu}one{xahar ilu}other{{N} xhur ilu}}',
      FUTURE:'{N,plural,few{fi {N} xhur oħra}many{fi {N} xhur oħra}one{sa xahar ieħor}other{fi {N} xhur oħra}}',
    },
    SHORT:{
      RELATIVE:{'-1':'Ix-xahar li għadda','0':'Dan ix-xahar','1':'Ix-xahar id-dieħel'},
      PAST:'{N,plural,few{{N} xhur ilu}many{{N} xhur ilu}one{{N} xahar ilu}other{{N} xhur ilu}}',
      FUTURE:'{N,plural,few{sa {N} xhur oħra}many{sa {N} xhur oħra}one{sa xahar ieħor}other{sa {N} xhur oħra}}',
    },
    NARROW:{
      RELATIVE:{'-1':'Ix-xahar li għadda','0':'Dan ix-xahar','1':'Ix-xahar id-dieħel'},
      PAST:'{N,plural,few{{N} xhur ilu}many{{N} xhur ilu}one{xahar ilu}other{{N} xhur ilu}}',
      FUTURE:'{N,plural,few{sa {N} xhur oħra}many{sa {N} xhur oħra}one{sa xahar ieħor}other{sa {N} xhur oħra}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'il-kwart ta’ sena li għadda','0':'il-kwart ta’ sena li qegħdin fih','1':'il-kwart li jmiss tas-sena'},
      PAST:'{N,plural,few{{N} kwarti ta’ sena li għaddew}many{{N} kwarti ta’ sena li għaddew}one{il-kwart ta’ sena li għadda}other{{N} kwarti ta’ sena li għaddew}}',
      FUTURE:'{N,plural,few{f’{N} kwarti ta’ sena oħrajn}many{f’{N} kwarti ta’ sena oħrajn}one{f’{N} kwarti ta’ sena oħrajn}other{f’{N} kwarti ta’ sena oħrajn}}',
    },
    SHORT:{
      RELATIVE:{'-1':'il-kwart ta’ sena li għadda','0':'il-kwart ta’ sena li qegħdin fih','1':'il-kwart li jmiss tas-sena'},
      PAST:'{N,plural,few{{N} kwarti ta’ sena ilu}many{{N} kwarti ta’ sena ilu}one{fil-kwart tas-sena li għadda}other{{N} kwarti ta’ sena ilu}}',
      FUTURE:'{N,plural,few{f’{N} kwarti ta’ sena oħrajn}many{f’{N} kwarti ta’ sena oħrajn}one{fil-kwart tas-sena li ġej}other{f’{N} kwarti ta’ sena oħrajn}}',
    },
    NARROW:{
      RELATIVE:{'-1':'il-kwart ta’ sena li għadda','0':'il-kwart ta’ sena li qegħdin fih','1':'il-kwart li jmiss tas-sena'},
      PAST:'{N,plural,few{{N} kwarti ta’ sena ilu}many{{N} kwarti ta’ sena ilu}one{fil-kwart tas-sena li għadda}other{{N} kwarti ta’ sena ilu}}',
      FUTURE:'{N,plural,few{f’{N} kwarti ta’ sena oħrajn}many{f’{N} kwarti ta’ sena oħrajn}one{fi kwart ta’ sena ieħor}other{f’{N} kwarti ta’ sena oħrajn}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'issa'},
      PAST:'{N,plural,few{{N} sekondi ilu}many{{N} sekondi ilu}one{sekonda ilu}other{{N} sekondi ilu}}',
      FUTURE:'{N,plural,few{sa {N} sekondi oħra}many{sa {N} sekondi oħra}one{sa {N} sekondi oħra}other{sa {N} sekondi oħra}}',
    },
    SHORT:{
      RELATIVE:{'0':'issa'},
      PAST:'{N,plural,few{{N} sek. ilu}many{{N} sek. ilu}one{sek. ilu}other{{N} sek. ilu}}',
      FUTURE:'{N,plural,few{sa {N} sek. oħra}many{sa {N} sek. oħra}one{sa {N} sekondi oħra}other{sa {N} sekondi oħra}}',
    },
    NARROW:{
      RELATIVE:{'0':'issa'},
      PAST:'{N,plural,few{{N} sek. ilu}many{{N} sek. ilu}one{sek. ilu}other{{N} sek. ilu}}',
      FUTURE:'{N,plural,few{sa {N} sek. oħra}many{sa {N} sek. oħra}one{sa sek. oħra}other{sa {N} sek. oħra}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'il-ġimgħa li għaddiet','0':'din il-ġimgħa','1':'il-ġimgħa d-dieħla'},
      PAST:'{N,plural,few{{N} ġimgħat ilu}many{{N} ġimgħat ilu}one{ġimgħa ilu}other{{N} ġimgħat ilu}}',
      FUTURE:'{N,plural,few{sa {N} ġimgħat oħra}many{sa {N} ġimgħat oħra}one{sa ġimgħa oħra}other{sa {N} ġimgħat oħra}}',
    },
    SHORT:{
      RELATIVE:{'-1':'il-ġimgħa li għaddiet','0':'din il-ġimgħa','1':'il-ġimgħa d-dieħla'},
      PAST:'{N,plural,few{{N} ġimgħat ilu}many{{N} ġimgħat ilu}one{ġimgħa ilu}other{{N} ġimgħat ilu}}',
      FUTURE:'{N,plural,few{sa {N} ġimgħat oħra}many{sa {N} ġimgħat oħra}one{sa ġimgħa oħra}other{+{N} w}}',
    },
    NARROW:{
      RELATIVE:{'-1':'il-ġimgħa li għaddiet','0':'din il-ġimgħa','1':'il-ġimgħa d-dieħla'},
      PAST:'{N,plural,few{{N} ġimgħat ilu}many{{N} ġimgħat ilu}one{ġimgħa ilu}other{{N} ġimgħat ilu}}',
      FUTURE:'{N,plural,few{sa {N} ġimgħat oħra}many{sa {N} ġimgħat oħra}one{sa ġimgħa oħra}other{sa {N} ġimgħat oħra}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'is-sena l-oħra','0':'din is-sena','1':'is-sena d-dieħla'},
      PAST:'{N,plural,few{{N} snin ilu}many{{N} snin ilu}one{sena ilu}other{{N} snin ilu}}',
      FUTURE:'{N,plural,few{fi żmien {N} snin oħra}many{fi żmien {N} snin oħra}one{fi żmien sena}other{fi żmien {N} snin oħra}}',
    },
    SHORT:{
      RELATIVE:{'-1':'is-sena l-oħra','0':'din is-sena','1':'is-sena d-dieħla'},
      PAST:'{N,plural,few{{N} snin ilu}many{{N} snin ilu}one{sa sena ilu}other{{N} snin ilu}}',
      FUTURE:'{N,plural,few{fi żmien {N} snin oħra}many{fi żmien {N} snin oħra}one{fi żmien sena}other{fi żmien {N} snin oħra}}',
    },
    NARROW:{
      RELATIVE:{'-1':'is-sena l-oħra','0':'din is-sena','1':'is-sena d-dieħla'},
      PAST:'{N,plural,few{{N} snin ilu}many{{N} snin ilu}one{sena ilu}other{{N} snin ilu}}',
      FUTURE:'{N,plural,few{fi żmien {N} snin oħra}many{fi żmien {N} snin oħra}one{fi żmien sena}other{fi żmien {N} snin oħra}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_my =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'မနေ့က','-2':'တစ်နေ့က','0':'ယနေ့','1':'မနက်ဖြန်','2':'သန်ဘက်ခါ'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} ရက်}}',
      FUTURE:'{N,plural,other{{N} ရက်အတွင်း}}',
    },
    SHORT:{
      RELATIVE:{'-1':'မနေ့က','-2':'တစ်နေ့က','0':'ယနေ့','1':'မနက်ဖြန်','2':'သန်ဘက်ခါ'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} ရက်}}',
      FUTURE:'{N,plural,other{{N} ရက်အတွင်း}}',
    },
    NARROW:{
      RELATIVE:{'-1':'မနေ့က','-2':'တစ်နေ့က','0':'ယနေ့','1':'မနက်ဖြန်','2':'သန်ဘက်ခါ'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} ရက်}}',
      FUTURE:'{N,plural,other{{N} ရက်အတွင်း}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ဤအချိန်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} နာရီ}}',
      FUTURE:'{N,plural,other{{N} နာရီအတွင်း}}',
    },
    SHORT:{
      RELATIVE:{'0':'ဤအချိန်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} နာရီ}}',
      FUTURE:'{N,plural,other{{N} နာရီအတွင်း}}',
    },
    NARROW:{
      RELATIVE:{'0':'ဤအချိန်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} နာရီ}}',
      FUTURE:'{N,plural,other{{N} နာရီအတွင်း}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ဤမိနစ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} မိနစ်}}',
      FUTURE:'{N,plural,other{{N} မိနစ်အတွင်း}}',
    },
    SHORT:{
      RELATIVE:{'0':'ဤမိနစ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} မိနစ်}}',
      FUTURE:'{N,plural,other{{N} မိနစ်အတွင်း}}',
    },
    NARROW:{
      RELATIVE:{'0':'ဤမိနစ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} မိနစ်}}',
      FUTURE:'{N,plural,other{{N} မိနစ်အတွင်း}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ပြီးခဲ့သည့်လ','0':'ယခုလ','1':'လာမည့်လ'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} လ}}',
      FUTURE:'{N,plural,other{{N} လအတွင်း}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ပြီးခဲ့သည့်လ','0':'ယခုလ','1':'လာမည့်လ'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} လ}}',
      FUTURE:'{N,plural,other{{N} လအတွင်း}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ပြီးခဲ့သည့်လ','0':'ယခုလ','1':'လာမည့်လ'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} လ}}',
      FUTURE:'{N,plural,other{{N} လအတွင်း}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'ပြီးခဲ့သည့် သုံးလပတ်','0':'ယခု သုံးလပတ်','1':'လာမည့် သုံးလပတ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် သုံးလပတ်ကာလ {N} ခုအတွင်း}}',
      FUTURE:'{N,plural,other{သုံးလပတ်ကာလ {N} အတွင်း}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ပြီးခဲ့သောသုံးလပတ်','0':'ယခုသုံးလပတ်','1':'နောက်လာမည့်သုံးလပတ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် သုံးလပတ်ကာလ {N} ခုအတွင်း}}',
      FUTURE:'{N,plural,other{သုံးလပတ်ကာလ {N} ခုအတွင်း}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ပြီးခဲ့သောသုံးလပတ်','0':'ယခုသုံးလပတ်','1':'နောက်လာမည့်သုံးလပတ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် သုံးလပတ်ကာလ {N} ခုအတွင်း}}',
      FUTURE:'{N,plural,other{သုံးလပတ်ကာလ {N} ခုအတွင်း}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ယခု'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} စက္ကန့်}}',
      FUTURE:'{N,plural,other{{N} စက္ကန့်အတွင်း}}',
    },
    SHORT:{
      RELATIVE:{'0':'ယခု'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} စက္ကန့်}}',
      FUTURE:'{N,plural,other{{N} စက္ကန့်အတွင်း}}',
    },
    NARROW:{
      RELATIVE:{'0':'ယခု'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} စက္ကန့်}}',
      FUTURE:'{N,plural,other{{N} စက္ကန့်အတွင်း}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'ပြီးခဲ့သည့် သီတင်းပတ်','0':'ယခု သီတင်းပတ်','1':'လာမည့် သီတင်းပတ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} ပတ်}}',
      FUTURE:'{N,plural,other{{N} ပတ်အတွင်း}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ပြီးခဲ့သည့် သီတင်းပတ်','0':'ယခု သီတင်းပတ်','1':'လာမည့် သီတင်းပတ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} ပတ်}}',
      FUTURE:'{N,plural,other{{N} ပတ်အတွင်း}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ပြီးခဲ့သည့် သီတင်းပတ်','0':'ယခု သီတင်းပတ်','1':'လာမည့် သီတင်းပတ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} ပတ်}}',
      FUTURE:'{N,plural,other{{N} ပတ်အတွင်း}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ယမန်နှစ်','0':'ယခုနှစ်','1':'လာမည့်နှစ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} နှစ်}}',
      FUTURE:'{N,plural,other{{N} နှစ်အတွင်း}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ယမန်နှစ်','0':'ယခုနှစ်','1':'လာမည့်နှစ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} နှစ်}}',
      FUTURE:'{N,plural,other{{N} နှစ်အတွင်း}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ယမန်နှစ်','0':'ယခုနှစ်','1':'လာမည့်နှစ်'},
      PAST:'{N,plural,other{ပြီးခဲ့သည့် {N} နှစ်}}',
      FUTURE:'{N,plural,other{{N} နှစ်အတွင်း}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_nb =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'i går','-2':'i forgårs','0':'i dag','1':'i morgen','2':'i overmorgen'},
      PAST:'{N,plural,one{for {N} døgn siden}other{for {N} døgn siden}}',
      FUTURE:'{N,plural,one{om {N} døgn}other{om {N} døgn}}',
    },
    SHORT:{
      RELATIVE:{'-1':'i går','-2':'i forgårs','0':'i dag','1':'i morgen','2':'i overmorgen'},
      PAST:'{N,plural,one{for {N} d. siden}other{for {N} d. siden}}',
      FUTURE:'{N,plural,one{om {N} d.}other{om {N} d.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'i går','-2':'-2 d.','0':'i dag','1':'i morgen','2':'+2 d.'},
      PAST:'{N,plural,one{-{N} d.}other{-{N} d.}}',
      FUTURE:'{N,plural,one{+{N} d.}other{+{N} d.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'denne timen'},
      PAST:'{N,plural,one{for {N} time siden}other{for {N} timer siden}}',
      FUTURE:'{N,plural,one{om {N} time}other{om {N} timer}}',
    },
    SHORT:{
      RELATIVE:{'0':'denne timen'},
      PAST:'{N,plural,one{for {N} t siden}other{for {N} t siden}}',
      FUTURE:'{N,plural,one{om {N} t}other{om {N} t}}',
    },
    NARROW:{
      RELATIVE:{'0':'denne timen'},
      PAST:'{N,plural,one{-{N} t}other{-{N} t}}',
      FUTURE:'{N,plural,one{+{N} t}other{+{N} t}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'dette minuttet'},
      PAST:'{N,plural,one{for {N} minutt siden}other{for {N} minutter siden}}',
      FUTURE:'{N,plural,one{om {N} minutt}other{om {N} minutter}}',
    },
    SHORT:{
      RELATIVE:{'0':'dette minuttet'},
      PAST:'{N,plural,one{for {N} min siden}other{for {N} min siden}}',
      FUTURE:'{N,plural,one{om {N} min}other{om {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'dette minuttet'},
      PAST:'{N,plural,one{-{N} min}other{-{N} min}}',
      FUTURE:'{N,plural,one{+{N} min}other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'forrige måned','0':'denne måneden','1':'neste måned'},
      PAST:'{N,plural,one{for {N} måned siden}other{for {N} måneder siden}}',
      FUTURE:'{N,plural,one{om {N} måned}other{om {N} måneder}}',
    },
    SHORT:{
      RELATIVE:{'-1':'forrige md.','0':'denne md.','1':'neste md.'},
      PAST:'{N,plural,one{for {N} md. siden}other{for {N} md. siden}}',
      FUTURE:'{N,plural,one{om {N} md.}other{om {N} md.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'forrige md.','0':'denne md.','1':'neste md.'},
      PAST:'{N,plural,one{-{N} md.}other{-{N} md.}}',
      FUTURE:'{N,plural,one{+{N} md.}other{+{N} md.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'forrige kvartal','0':'dette kvartalet','1':'neste kvartal'},
      PAST:'{N,plural,one{for {N} kvartal siden}other{for {N} kvartaler siden}}',
      FUTURE:'{N,plural,one{om {N} kvartal}other{om {N} kvartaler}}',
    },
    SHORT:{
      RELATIVE:{'-1':'forrige kv.','0':'dette kv.','1':'neste kv.'},
      PAST:'{N,plural,one{for {N} kv. siden}other{for {N} kv. siden}}',
      FUTURE:'{N,plural,one{om {N} kv.}other{om {N} kv.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'forrige kv.','0':'dette kv.','1':'neste kv.'},
      PAST:'{N,plural,one{–{N} kv.}other{–{N} kv.}}',
      FUTURE:'{N,plural,one{+{N} kv.}other{+{N} kv.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nå'},
      PAST:'{N,plural,one{for {N} sekund siden}other{for {N} sekunder siden}}',
      FUTURE:'{N,plural,one{om {N} sekund}other{om {N} sekunder}}',
    },
    SHORT:{
      RELATIVE:{'0':'nå'},
      PAST:'{N,plural,one{for {N} sek siden}other{for {N} sek siden}}',
      FUTURE:'{N,plural,one{om {N} sek}other{om {N} sek}}',
    },
    NARROW:{
      RELATIVE:{'0':'nå'},
      PAST:'{N,plural,one{-{N} s}other{-{N} s}}',
      FUTURE:'{N,plural,one{+{N} s}other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'forrige uke','0':'denne uken','1':'neste uke'},
      PAST:'{N,plural,one{for {N} uke siden}other{for {N} uker siden}}',
      FUTURE:'{N,plural,one{om {N} uke}other{om {N} uker}}',
    },
    SHORT:{
      RELATIVE:{'-1':'forrige uke','0':'denne uken','1':'neste uke'},
      PAST:'{N,plural,one{for {N} u. siden}other{for {N} u. siden}}',
      FUTURE:'{N,plural,one{om {N} u.}other{om {N} u.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'forrige uke','0':'denne uken','1':'neste uke'},
      PAST:'{N,plural,one{-{N} u.}other{-{N} u.}}',
      FUTURE:'{N,plural,one{+{N} u.}other{+{N} u.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'i fjor','0':'i år','1':'neste år'},
      PAST:'{N,plural,one{for {N} år siden}other{for {N} år siden}}',
      FUTURE:'{N,plural,one{om {N} år}other{om {N} år}}',
    },
    SHORT:{
      RELATIVE:{'-1':'i fjor','0':'i år','1':'neste år'},
      PAST:'{N,plural,one{for {N} år siden}other{for {N} år siden}}',
      FUTURE:'{N,plural,one{om {N} år}other{om {N} år}}',
    },
    NARROW:{
      RELATIVE:{'-1':'i fjor','0':'i år','1':'neste år'},
      PAST:'{N,plural,one{–{N} år}other{–{N} år}}',
      FUTURE:'{N,plural,one{+{N} år}other{+{N} år}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ne =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'हिजो','-2':'अस्ति','0':'आज','1':'भोलि','2':'पर्सि'},
      PAST:'{N,plural,one{{N} दिन पहिले}other{{N} दिन पहिले}}',
      FUTURE:'{N,plural,one{{N} दिनमा}other{{N} दिनमा}}',
    },
    SHORT:{
      RELATIVE:{'-1':'हिजो','-2':'अस्ति','0':'आज','1':'भोलि','2':'पर्सि'},
      PAST:'{N,plural,one{{N} दिन पहिले}other{{N} दिन पहिले}}',
      FUTURE:'{N,plural,one{{N} दिनमा}other{{N} दिनमा}}',
    },
    NARROW:{
      RELATIVE:{'-1':'हिजो','-2':'अस्ति','0':'आज','1':'भोलि','2':'पर्सि'},
      PAST:'{N,plural,one{{N} दिन पहिले}other{{N} दिन पहिले}}',
      FUTURE:'{N,plural,one{{N} दिनमा}other{{N} दिनमा}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'यस घडीमा'},
      PAST:'{N,plural,one{{N} घण्टा पहिले}other{{N} घण्टा पहिले}}',
      FUTURE:'{N,plural,one{{N} घण्टामा}other{{N} घण्टामा}}',
    },
    SHORT:{
      RELATIVE:{'0':'यस घडीमा'},
      PAST:'{N,plural,one{{N} घण्टा पहिले}other{{N} घण्टा पहिले}}',
      FUTURE:'{N,plural,one{{N} घण्टामा}other{{N} घण्टामा}}',
    },
    NARROW:{
      RELATIVE:{'0':'यस घडीमा'},
      PAST:'{N,plural,one{{N} घण्टा पहिले}other{{N} घण्टा पहिले}}',
      FUTURE:'{N,plural,one{{N} घण्टामा}other{{N} घण्टामा}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'यही मिनेटमा'},
      PAST:'{N,plural,one{{N} मिनेट पहिले}other{{N} मिनेट पहिले}}',
      FUTURE:'{N,plural,one{{N} मिनेटमा}other{{N} मिनेटमा}}',
    },
    SHORT:{
      RELATIVE:{'0':'यही मिनेटमा'},
      PAST:'{N,plural,one{{N} मिनेट पहिले}other{{N} मिनेट पहिले}}',
      FUTURE:'{N,plural,one{{N} मिनेटमा}other{{N} मिनेटमा}}',
    },
    NARROW:{
      RELATIVE:{'0':'यही मिनेटमा'},
      PAST:'{N,plural,one{{N} मिनेट पहिले}other{{N} मिनेट पहिले}}',
      FUTURE:'{N,plural,one{{N} मिनेटमा}other{{N} मिनेटमा}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'गत महिना','0':'यो महिना','1':'अर्को महिना'},
      PAST:'{N,plural,one{{N} महिना पहिले}other{{N} महिना पहिले}}',
      FUTURE:'{N,plural,one{{N} महिनामा}other{{N} महिनामा}}',
    },
    SHORT:{
      RELATIVE:{'-1':'गत महिना','0':'यो महिना','1':'अर्को महिना'},
      PAST:'{N,plural,one{{N} महिना पहिले}other{{N} महिना पहिले}}',
      FUTURE:'{N,plural,one{{N} महिनामा}other{{N} महिनामा}}',
    },
    NARROW:{
      RELATIVE:{'-1':'गत महिना','0':'यो महिना','1':'अर्को महिना'},
      PAST:'{N,plural,one{{N} महिना पहिले}other{{N} महिना पहिले}}',
      FUTURE:'{N,plural,one{{N} महिनामा}other{{N} महिनामा}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'अघिल्लो सत्र','0':'यो सत्र','1':'अर्को सत्र'},
      PAST:'{N,plural,one{{N}सत्र अघि}other{{N}सत्र अघि}}',
      FUTURE:'{N,plural,one{+{N} सत्रमा}other{{N}सत्रमा}}',
    },
    SHORT:{
      RELATIVE:{'-1':'अघिल्लो सत्र','0':'यो सत्र','1':'अर्को सत्र'},
      PAST:'{N,plural,one{{N}सत्र अघि}other{{N}सत्र अघि}}',
      FUTURE:'{N,plural,one{{N}सत्रमा}other{{N}सत्रमा}}',
    },
    NARROW:{
      RELATIVE:{'-1':'अघिल्लो सत्र','0':'यो सत्र','1':'अर्को सत्र'},
      PAST:'{N,plural,one{{N}सत्र अघि}other{{N}सत्र अघि}}',
      FUTURE:'{N,plural,one{{N}सत्रमा}other{{N}सत्रमा}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'अहिले'},
      PAST:'{N,plural,one{{N} सेकेन्ड पहिले}other{{N} सेकेन्ड पहिले}}',
      FUTURE:'{N,plural,one{{N} सेकेन्डमा}other{{N} सेकेन्डमा}}',
    },
    SHORT:{
      RELATIVE:{'0':'अहिले'},
      PAST:'{N,plural,one{{N} सेकेन्ड पहिले}other{{N} सेकेन्ड पहिले}}',
      FUTURE:'{N,plural,one{{N} सेकेन्डमा}other{{N} सेकेन्डमा}}',
    },
    NARROW:{
      RELATIVE:{'0':'अहिले'},
      PAST:'{N,plural,one{{N} सेकेन्ड पहिले}other{{N} सेकेन्ड पहिले}}',
      FUTURE:'{N,plural,one{{N} सेकेन्डमा}other{{N} सेकेन्डमा}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'गत हप्ता','0':'यो हप्ता','1':'आउने हप्ता'},
      PAST:'{N,plural,one{{N} हप्ता पहिले}other{{N} हप्ता पहिले}}',
      FUTURE:'{N,plural,one{{N} हप्तामा}other{{N} हप्तामा}}',
    },
    SHORT:{
      RELATIVE:{'-1':'गत हप्ता','0':'यो हप्ता','1':'आउने हप्ता'},
      PAST:'{N,plural,one{{N} हप्ता पहिले}other{{N} हप्ता पहिले}}',
      FUTURE:'{N,plural,one{{N} हप्तामा}other{{N} हप्तामा}}',
    },
    NARROW:{
      RELATIVE:{'-1':'गत हप्ता','0':'यो हप्ता','1':'आउने हप्ता'},
      PAST:'{N,plural,one{{N} हप्ता पहिले}other{{N} हप्ता पहिले}}',
      FUTURE:'{N,plural,one{{N} हप्तामा}other{{N} हप्तामा}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'गत वर्ष','0':'यो वर्ष','1':'आगामी वर्ष'},
      PAST:'{N,plural,one{{N} वर्ष अघि}other{{N} वर्ष अघि}}',
      FUTURE:'{N,plural,one{{N} वर्षमा}other{{N} वर्षमा}}',
    },
    SHORT:{
      RELATIVE:{'-1':'गत वर्ष','0':'यो वर्ष','1':'आगामी वर्ष'},
      PAST:'{N,plural,one{{N} वर्ष अघि}other{{N} वर्ष अघि}}',
      FUTURE:'{N,plural,one{{N} वर्षमा}other{{N} वर्षमा}}',
    },
    NARROW:{
      RELATIVE:{'-1':'गत वर्ष','0':'यो वर्ष','1':'आगामी वर्ष'},
      PAST:'{N,plural,one{{N} वर्ष अघि}other{{N} वर्ष अघि}}',
      FUTURE:'{N,plural,one{{N} वर्षमा}other{{N} वर्षमा}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_nl =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'gisteren','-2':'eergisteren','0':'vandaag','1':'morgen','2':'overmorgen'},
      PAST:'{N,plural,one{{N} dag geleden}other{{N} dagen geleden}}',
      FUTURE:'{N,plural,one{over {N} dag}other{over {N} dagen}}',
    },
    SHORT:{
      RELATIVE:{'-1':'gisteren','-2':'eergisteren','0':'vandaag','1':'morgen','2':'overmorgen'},
      PAST:'{N,plural,one{{N} dag geleden}other{{N} dgn geleden}}',
      FUTURE:'{N,plural,one{over {N} dag}other{over {N} dgn}}',
    },
    NARROW:{
      RELATIVE:{'-1':'gisteren','-2':'eergisteren','0':'vandaag','1':'morgen','2':'overmorgen'},
      PAST:'{N,plural,one{{N} dag geleden}other{{N} dgn geleden}}',
      FUTURE:'{N,plural,one{over {N} dag}other{over {N} dgn}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'binnen een uur'},
      PAST:'{N,plural,one{{N} uur geleden}other{{N} uur geleden}}',
      FUTURE:'{N,plural,one{over {N} uur}other{over {N} uur}}',
    },
    SHORT:{
      RELATIVE:{'0':'binnen een uur'},
      PAST:'{N,plural,one{{N} uur geleden}other{{N} uur geleden}}',
      FUTURE:'{N,plural,one{over {N} uur}other{over {N} uur}}',
    },
    NARROW:{
      RELATIVE:{'0':'binnen een uur'},
      PAST:'{N,plural,one{{N} uur geleden}other{{N} uur geleden}}',
      FUTURE:'{N,plural,one{over {N} uur}other{over {N} uur}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'binnen een minuut'},
      PAST:'{N,plural,one{{N} minuut geleden}other{{N} minuten geleden}}',
      FUTURE:'{N,plural,one{over {N} minuut}other{over {N} minuten}}',
    },
    SHORT:{
      RELATIVE:{'0':'binnen een minuut'},
      PAST:'{N,plural,one{{N} min. geleden}other{{N} min. geleden}}',
      FUTURE:'{N,plural,one{over {N} min.}other{over {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'binnen een minuut'},
      PAST:'{N,plural,one{{N} min. geleden}other{{N} min. geleden}}',
      FUTURE:'{N,plural,one{over {N} min.}other{over {N} min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'vorige maand','0':'deze maand','1':'volgende maand'},
      PAST:'{N,plural,one{{N} maand geleden}other{{N} maanden geleden}}',
      FUTURE:'{N,plural,one{over {N} maand}other{over {N} maanden}}',
    },
    SHORT:{
      RELATIVE:{'-1':'vorige maand','0':'deze maand','1':'volgende maand'},
      PAST:'{N,plural,one{{N} maand geleden}other{{N} maanden geleden}}',
      FUTURE:'{N,plural,one{over {N} maand}other{over {N} maanden}}',
    },
    NARROW:{
      RELATIVE:{'-1':'vorige maand','0':'deze maand','1':'volgende maand'},
      PAST:'{N,plural,one{{N} maand geleden}other{{N} maanden geleden}}',
      FUTURE:'{N,plural,one{over {N} maand}other{over {N} maanden}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'vorig kwartaal','0':'dit kwartaal','1':'volgend kwartaal'},
      PAST:'{N,plural,one{{N} kwartaal geleden}other{{N} kwartalen geleden}}',
      FUTURE:'{N,plural,one{over {N} kwartaal}other{over {N} kwartalen}}',
    },
    SHORT:{
      RELATIVE:{'-1':'vorig kwartaal','0':'dit kwartaal','1':'volgend kwartaal'},
      PAST:'{N,plural,one{{N} kwartaal geleden}other{{N} kwartalen geleden}}',
      FUTURE:'{N,plural,one{over {N} kwartaal}other{over {N} kwartalen}}',
    },
    NARROW:{
      RELATIVE:{'-1':'vorig kwartaal','0':'dit kwartaal','1':'volgend kwartaal'},
      PAST:'{N,plural,one{{N} kwartaal geleden}other{{N} kwartalen geleden}}',
      FUTURE:'{N,plural,one{over {N} kw.}other{over {N} kwartalen}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nu'},
      PAST:'{N,plural,one{{N} seconde geleden}other{{N} seconden geleden}}',
      FUTURE:'{N,plural,one{over {N} seconde}other{over {N} seconden}}',
    },
    SHORT:{
      RELATIVE:{'0':'nu'},
      PAST:'{N,plural,one{{N} sec. geleden}other{{N} sec. geleden}}',
      FUTURE:'{N,plural,one{over {N} sec.}other{over {N} sec.}}',
    },
    NARROW:{
      RELATIVE:{'0':'nu'},
      PAST:'{N,plural,one{{N} sec. geleden}other{{N} sec. geleden}}',
      FUTURE:'{N,plural,one{over {N} sec.}other{over {N} sec.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'vorige week','0':'deze week','1':'volgende week'},
      PAST:'{N,plural,one{{N} week geleden}other{{N} weken geleden}}',
      FUTURE:'{N,plural,one{over {N} week}other{over {N} weken}}',
    },
    SHORT:{
      RELATIVE:{'-1':'vorige week','0':'deze week','1':'volgende week'},
      PAST:'{N,plural,one{{N} week geleden}other{{N} weken geleden}}',
      FUTURE:'{N,plural,one{over {N} week}other{over {N} weken}}',
    },
    NARROW:{
      RELATIVE:{'-1':'vorige week','0':'deze week','1':'volgende week'},
      PAST:'{N,plural,one{{N} week geleden}other{{N} weken geleden}}',
      FUTURE:'{N,plural,one{over {N} week}other{over {N} weken}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'vorig jaar','0':'dit jaar','1':'volgend jaar'},
      PAST:'{N,plural,one{{N} jaar geleden}other{{N} jaar geleden}}',
      FUTURE:'{N,plural,one{over {N} jaar}other{over {N} jaar}}',
    },
    SHORT:{
      RELATIVE:{'-1':'vorig jaar','0':'dit jaar','1':'volgend jaar'},
      PAST:'{N,plural,one{{N} jaar geleden}other{{N} jaar geleden}}',
      FUTURE:'{N,plural,one{over {N} jaar}other{over {N} jaar}}',
    },
    NARROW:{
      RELATIVE:{'-1':'vorig jaar','0':'dit jaar','1':'volgend jaar'},
      PAST:'{N,plural,one{{N} jaar geleden}other{{N} jaar geleden}}',
      FUTURE:'{N,plural,one{over {N} jaar}other{over {N} jaar}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_no =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'i går','-2':'i forgårs','0':'i dag','1':'i morgen','2':'i overmorgen'},
      PAST:'{N,plural,one{for {N} døgn siden}other{for {N} døgn siden}}',
      FUTURE:'{N,plural,one{om {N} døgn}other{om {N} døgn}}',
    },
    SHORT:{
      RELATIVE:{'-1':'i går','-2':'i forgårs','0':'i dag','1':'i morgen','2':'i overmorgen'},
      PAST:'{N,plural,one{for {N} d. siden}other{for {N} d. siden}}',
      FUTURE:'{N,plural,one{om {N} d.}other{om {N} d.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'i går','-2':'-2 d.','0':'i dag','1':'i morgen','2':'+2 d.'},
      PAST:'{N,plural,one{-{N} d.}other{-{N} d.}}',
      FUTURE:'{N,plural,one{+{N} d.}other{+{N} d.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'denne timen'},
      PAST:'{N,plural,one{for {N} time siden}other{for {N} timer siden}}',
      FUTURE:'{N,plural,one{om {N} time}other{om {N} timer}}',
    },
    SHORT:{
      RELATIVE:{'0':'denne timen'},
      PAST:'{N,plural,one{for {N} t siden}other{for {N} t siden}}',
      FUTURE:'{N,plural,one{om {N} t}other{om {N} t}}',
    },
    NARROW:{
      RELATIVE:{'0':'denne timen'},
      PAST:'{N,plural,one{-{N} t}other{-{N} t}}',
      FUTURE:'{N,plural,one{+{N} t}other{+{N} t}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'dette minuttet'},
      PAST:'{N,plural,one{for {N} minutt siden}other{for {N} minutter siden}}',
      FUTURE:'{N,plural,one{om {N} minutt}other{om {N} minutter}}',
    },
    SHORT:{
      RELATIVE:{'0':'dette minuttet'},
      PAST:'{N,plural,one{for {N} min siden}other{for {N} min siden}}',
      FUTURE:'{N,plural,one{om {N} min}other{om {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'dette minuttet'},
      PAST:'{N,plural,one{-{N} min}other{-{N} min}}',
      FUTURE:'{N,plural,one{+{N} min}other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'forrige måned','0':'denne måneden','1':'neste måned'},
      PAST:'{N,plural,one{for {N} måned siden}other{for {N} måneder siden}}',
      FUTURE:'{N,plural,one{om {N} måned}other{om {N} måneder}}',
    },
    SHORT:{
      RELATIVE:{'-1':'forrige md.','0':'denne md.','1':'neste md.'},
      PAST:'{N,plural,one{for {N} md. siden}other{for {N} md. siden}}',
      FUTURE:'{N,plural,one{om {N} md.}other{om {N} md.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'forrige md.','0':'denne md.','1':'neste md.'},
      PAST:'{N,plural,one{-{N} md.}other{-{N} md.}}',
      FUTURE:'{N,plural,one{+{N} md.}other{+{N} md.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'forrige kvartal','0':'dette kvartalet','1':'neste kvartal'},
      PAST:'{N,plural,one{for {N} kvartal siden}other{for {N} kvartaler siden}}',
      FUTURE:'{N,plural,one{om {N} kvartal}other{om {N} kvartaler}}',
    },
    SHORT:{
      RELATIVE:{'-1':'forrige kv.','0':'dette kv.','1':'neste kv.'},
      PAST:'{N,plural,one{for {N} kv. siden}other{for {N} kv. siden}}',
      FUTURE:'{N,plural,one{om {N} kv.}other{om {N} kv.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'forrige kv.','0':'dette kv.','1':'neste kv.'},
      PAST:'{N,plural,one{–{N} kv.}other{–{N} kv.}}',
      FUTURE:'{N,plural,one{+{N} kv.}other{+{N} kv.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nå'},
      PAST:'{N,plural,one{for {N} sekund siden}other{for {N} sekunder siden}}',
      FUTURE:'{N,plural,one{om {N} sekund}other{om {N} sekunder}}',
    },
    SHORT:{
      RELATIVE:{'0':'nå'},
      PAST:'{N,plural,one{for {N} sek siden}other{for {N} sek siden}}',
      FUTURE:'{N,plural,one{om {N} sek}other{om {N} sek}}',
    },
    NARROW:{
      RELATIVE:{'0':'nå'},
      PAST:'{N,plural,one{-{N} s}other{-{N} s}}',
      FUTURE:'{N,plural,one{+{N} s}other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'forrige uke','0':'denne uken','1':'neste uke'},
      PAST:'{N,plural,one{for {N} uke siden}other{for {N} uker siden}}',
      FUTURE:'{N,plural,one{om {N} uke}other{om {N} uker}}',
    },
    SHORT:{
      RELATIVE:{'-1':'forrige uke','0':'denne uken','1':'neste uke'},
      PAST:'{N,plural,one{for {N} u. siden}other{for {N} u. siden}}',
      FUTURE:'{N,plural,one{om {N} u.}other{om {N} u.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'forrige uke','0':'denne uken','1':'neste uke'},
      PAST:'{N,plural,one{-{N} u.}other{-{N} u.}}',
      FUTURE:'{N,plural,one{+{N} u.}other{+{N} u.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'i fjor','0':'i år','1':'neste år'},
      PAST:'{N,plural,one{for {N} år siden}other{for {N} år siden}}',
      FUTURE:'{N,plural,one{om {N} år}other{om {N} år}}',
    },
    SHORT:{
      RELATIVE:{'-1':'i fjor','0':'i år','1':'neste år'},
      PAST:'{N,plural,one{for {N} år siden}other{for {N} år siden}}',
      FUTURE:'{N,plural,one{om {N} år}other{om {N} år}}',
    },
    NARROW:{
      RELATIVE:{'-1':'i fjor','0':'i år','1':'neste år'},
      PAST:'{N,plural,one{–{N} år}other{–{N} år}}',
      FUTURE:'{N,plural,one{+{N} år}other{+{N} år}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_no_NO = exports.RelativeDateTimeSymbols_no;

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_or =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ଗତକାଲି','0':'ଆଜି','1':'ଆସନ୍ତାକାଲି'},
      PAST:'{N,plural,one{{N} ଦିନ ପୂର୍ବେ}other{{N} ଦିନ ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ଦିନରେ}other{{N} ଦିନରେ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ଗତକାଲି','0':'ଆଜି','1':'ଆସନ୍ତାକାଲି'},
      PAST:'{N,plural,one{{N} ଦିନ ପୂର୍ବେ}other{{N} ଦିନ ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ଦିନରେ}other{{N} ଦିନରେ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ଗତକାଲି','0':'ଆଜି','1':'ଆସନ୍ତାକାଲି'},
      PAST:'{N,plural,one{{N} ଦିନ ପୂର୍ବେ}other{{N} ଦିନ ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ଦିନରେ}other{{N} ଦିନରେ}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ଏହି ଘଣ୍ଟା'},
      PAST:'{N,plural,one{{N} ଘଣ୍ଟା ପୂର୍ବେ}other{{N} ଘଣ୍ଟା ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ଘଣ୍ଟାରେ}other{{N} ଘଣ୍ଟାରେ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ଏହି ଘଣ୍ଟା'},
      PAST:'{N,plural,one{{N} ଘ. ପୂର୍ବେ}other{{N} ଘ. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ଘ. ରେ}other{{N} ଘ. ରେ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ଏହି ଘଣ୍ଟା'},
      PAST:'{N,plural,one{{N} ଘ. ପୂର୍ବେ}other{{N} ଘ. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ଘ. ରେ}other{{N} ଘ. ରେ}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ଏହି ମିନିଟ୍'},
      PAST:'{N,plural,one{{N} ମିନିଟ୍ ପୂର୍ବେ}other{{N} ମିନିଟ୍ ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ମିନିଟ୍‌‌ରେ}other{{N} ମିନିଟ୍‌‌ରେ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ଏହି ମିନିଟ୍'},
      PAST:'{N,plural,one{{N} ମି. ପୂର୍ବେ}other{{N} ମି. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ମି. ରେ}other{{N} ମି. ରେ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ଏହି ମିନିଟ୍'},
      PAST:'{N,plural,one{{N} ମି. ପୂର୍ବେ}other{{N} ମି. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ମି. ରେ}other{{N} ମି. ରେ}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ଗତ ମାସ','0':'ଏହି ମାସ','1':'ଆଗାମୀ ମାସ'},
      PAST:'{N,plural,one{{N} ମାସ ପୂର୍ବେ}other{{N} ମାସ ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ମାସରେ}other{{N} ମାସରେ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ଗତ ମାସ','0':'ଏହି ମାସ','1':'ଆଗାମୀ ମାସ'},
      PAST:'{N,plural,one{{N} ମା. ପୂର୍ବେ}other{{N} ମା. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ମା. ରେ}other{{N} ମା. ରେ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ଗତ ମାସ','0':'ଏହି ମାସ','1':'ଆଗାମୀ ମାସ'},
      PAST:'{N,plural,one{{N} ମା. ପୂର୍ବେ}other{{N} ମା. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ମା. ରେ}other{{N} ମା. ରେ}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'ଗତ ତ୍ରୟମାସ','0':'ଗତ ତ୍ରୟମାସ','1':'ଆଗାମୀ ତ୍ରୟମାସ'},
      PAST:'{N,plural,one{{N} ତ୍ରୟମାସ ପୂର୍ବେ}other{{N} ତ୍ରୟମାସ ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ତ୍ରୟମାସରେ}other{{N} ତ୍ରୟମାସରେ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ଗତ ତ୍ରୟମାସ','0':'ଗତ ତ୍ରୟମାସ','1':'ଆଗାମୀ ତ୍ରୟମାସ'},
      PAST:'{N,plural,one{{N} ତ୍ରୟ. ପୂର୍ବେ}other{{N} ତ୍ରୟ. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ତ୍ରୟ. ରେ}other{{N} ତ୍ରୟ. ରେ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ଗତ ତ୍ରୟମାସ','0':'ଗତ ତ୍ରୟମାସ','1':'ଆଗାମୀ ତ୍ରୟମାସ'},
      PAST:'{N,plural,one{{N} ତ୍ରୟ. ପୂର୍ବେ}other{{N} ତ୍ରୟ. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ତ୍ରୟ. ରେ}other{{N} ତ୍ରୟ. ରେ}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ବର୍ତ୍ତମାନ'},
      PAST:'{N,plural,one{{N} ସେକେଣ୍ଡ ପୂର୍ବେ}other{{N} ସେକେଣ୍ଡ ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ସେକେଣ୍ଡରେ}other{{N} ସେକେଣ୍ଡରେ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ବର୍ତ୍ତମାନ'},
      PAST:'{N,plural,one{{N} ସେ. ପୂର୍ବେ}other{{N} ସେ. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ସେ. ରେ}other{{N} ସେ. ରେ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ବର୍ତ୍ତମାନ'},
      PAST:'{N,plural,one{{N} ସେ. ପୂର୍ବେ}other{{N} ସେ. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ସେ. ରେ}other{{N} ସେ. ରେ}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'ଗତ ସପ୍ତାହ','0':'ଏହି ସପ୍ତାହ','1':'ଆଗାମୀ ସପ୍ତାହ'},
      PAST:'{N,plural,one{{N} ସପ୍ତାହରେ}other{{N} ସପ୍ତାହ ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ସପ୍ତାହରେ}other{{N} ସପ୍ତାହରେ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ଗତ ସପ୍ତାହ','0':'ଏହି ସପ୍ତାହ','1':'ଆଗାମୀ ସପ୍ତାହ'},
      PAST:'{N,plural,one{{N} ସପ୍ତା. ପୂର୍ବେ}other{{N} ସପ୍ତା. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ସପ୍ତା. ରେ}other{{N} ସପ୍ତା. ରେ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ଗତ ସପ୍ତାହ','0':'ଏହି ସପ୍ତାହ','1':'ଆଗାମୀ ସପ୍ତାହ'},
      PAST:'{N,plural,one{{N} ସପ୍ତା. ପୂର୍ବେ}other{{N} ସପ୍ତା. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ସପ୍ତା. ରେ}other{{N} ସପ୍ତା. ରେ}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ଗତ ବର୍ଷ','0':'ଏହି ବର୍ଷ','1':'ଆଗାମୀ ବର୍ଷ'},
      PAST:'{N,plural,one{{N} ବର୍ଷ ପୂର୍ବେ}other{{N} ବର୍ଷ ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ବର୍ଷରେ}other{{N} ବର୍ଷରେ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ଗତ ବର୍ଷ','0':'ଏହି ବର୍ଷ','1':'ଆଗାମୀ ବର୍ଷ'},
      PAST:'{N,plural,one{{N} ବ. ପୂର୍ବେ}other{{N} ବ. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ବ. ରେ}other{{N} ବ. ରେ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ଗତ ବର୍ଷ','0':'ଏହି ବର୍ଷ','1':'ଆଗାମୀ ବର୍ଷ'},
      PAST:'{N,plural,one{{N} ବ. ପୂର୍ବେ}other{{N} ବ. ପୂର୍ବେ}}',
      FUTURE:'{N,plural,one{{N} ବ. ରେ}other{{N} ବ. ରେ}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_pa =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ਬੀਤਿਆ ਕੱਲ੍ਹ','0':'ਅੱਜ','1':'ਭਲਕੇ'},
      PAST:'{N,plural,one{{N} ਦਿਨ ਪਹਿਲਾਂ}other{{N} ਦਿਨ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਦਿਨ ਵਿੱਚ}other{{N} ਦਿਨਾਂ ਵਿੱਚ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ਬੀਤਿਆ ਕੱਲ੍ਹ','0':'ਅੱਜ','1':'ਭਲਕੇ'},
      PAST:'{N,plural,one{{N} ਦਿਨ ਪਹਿਲਾਂ}other{{N} ਦਿਨ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਦਿਨ ਵਿੱਚ}other{{N} ਦਿਨਾਂ ਵਿੱਚ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ਬੀਤਿਆ ਕੱਲ੍ਹ','0':'ਅੱਜ','1':'ਭਲਕੇ'},
      PAST:'{N,plural,one{{N} ਦਿਨ ਪਹਿਲਾਂ}other{{N} ਦਿਨ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਦਿਨ ਵਿੱਚ}other{{N} ਦਿਨਾਂ ਵਿੱਚ}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ਇਸ ਘੰਟੇ'},
      PAST:'{N,plural,one{{N} ਘੰਟਾ ਪਹਿਲਾਂ}other{{N} ਘੰਟੇ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਘੰਟੇ ਵਿੱਚ}other{{N} ਘੰਟਿਆਂ ਵਿੱਚ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ਇਸ ਘੰਟੇ'},
      PAST:'{N,plural,one{{N} ਘੰਟਾ ਪਹਿਲਾਂ}other{{N} ਘੰਟੇ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਘੰਟੇ ਵਿੱਚ}other{{N} ਘੰਟਿਆਂ ਵਿੱਚ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ਇਸ ਘੰਟੇ'},
      PAST:'{N,plural,one{{N} ਘੰਟਾ ਪਹਿਲਾਂ}other{{N} ਘੰਟੇ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਘੰਟੇ ਵਿੱਚ}other{{N} ਘੰਟਿਆਂ ਵਿੱਚ}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ਇਸ ਮਿੰਟ'},
      PAST:'{N,plural,one{{N} ਮਿੰਟ ਪਹਿਲਾਂ}other{{N} ਮਿੰਟ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਮਿੰਟ ਵਿੱਚ}other{{N} ਮਿੰਟਾਂ ਵਿੱਚ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ਇਸ ਮਿੰਟ'},
      PAST:'{N,plural,one{{N} ਮਿੰਟ ਪਹਿਲਾਂ}other{{N} ਮਿੰਟ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਮਿੰਟ ਵਿੱਚ}other{{N} ਮਿੰਟਾਂ ਵਿੱਚ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ਇਸ ਮਿੰਟ'},
      PAST:'{N,plural,one{{N} ਮਿੰਟ ਪਹਿਲਾਂ}other{{N} ਮਿੰਟ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਮਿੰਟ ਵਿੱਚ}other{{N} ਮਿੰਟਾਂ ਵਿੱਚ}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'ਪਿਛਲਾ ਮਹੀਨਾ','0':'ਇਹ ਮਹੀਨਾ','1':'ਅਗਲਾ ਮਹੀਨਾ'},
      PAST:'{N,plural,one{{N} ਮਹੀਨਾ ਪਹਿਲਾਂ}other{{N} ਮਹੀਨੇ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਮਹੀਨੇ ਵਿੱਚ}other{{N} ਮਹੀਨਿਆਂ ਵਿੱਚ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ਪਿਛਲਾ ਮਹੀਨਾ','0':'ਇਹ ਮਹੀਨਾ','1':'ਅਗਲਾ ਮਹੀਨਾ'},
      PAST:'{N,plural,one{{N} ਮਹੀਨਾ ਪਹਿਲਾਂ}other{{N} ਮਹੀਨੇ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਮਹੀਨੇ ਵਿੱਚ}other{{N} ਮਹੀਨਿਆਂ ਵਿੱਚ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ਪਿਛਲਾ ਮਹੀਨਾ','0':'ਇਹ ਮਹੀਨਾ','1':'ਅਗਲਾ ਮਹੀਨਾ'},
      PAST:'{N,plural,one{{N} ਮਹੀਨਾ ਪਹਿਲਾਂ}other{{N} ਮਹੀਨੇ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਮਹੀਨੇ ਵਿੱਚ}other{{N} ਮਹੀਨਿਆਂ ਵਿੱਚ}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'ਪਿਛਲੀ ਤਿਮਾਹੀ','0':'ਇਸ ਤਿਮਾਹੀ','1':'ਅਗਲੀ ਤਿਮਾਹੀ'},
      PAST:'{N,plural,one{{N} ਤਿਮਾਹੀ ਪਹਿਲਾਂ}other{{N} ਤਿਮਾਹੀਆਂ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਤਿਮਾਹੀ ਵਿੱਚ}other{{N} ਤਿਮਾਹੀਆਂ ਵਿੱਚ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ਪਿਛਲੀ ਤਿਮਾਹੀ','0':'ਇਹ ਤਿਮਾਹੀ','1':'ਅਗਲੀ ਤਿਮਾਹੀ'},
      PAST:'{N,plural,one{{N} ਤਿਮਾਹੀ ਪਹਿਲਾਂ}other{{N} ਤਿਮਾਹੀਆਂ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਤਿਮਾਹੀ ਵਿੱਚ}other{{N} ਤਿਮਾਹੀਆਂ ਵਿੱਚ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ਪਿਛਲੀ ਤਿਮਾਹੀ','0':'ਇਹ ਤਿਮਾਹੀ','1':'ਅਗਲੀ ਤਿਮਾਹੀ'},
      PAST:'{N,plural,one{{N} ਤਿਮਾਹੀ ਪਹਿਲਾਂ}other{{N} ਤਿਮਾਹੀਆਂ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਤਿਮਾਹੀ ਵਿੱਚ}other{{N} ਤਿਮਾਹੀਆਂ ਵਿੱਚ}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ਹੁਣ'},
      PAST:'{N,plural,one{{N} ਸਕਿੰਟ ਪਹਿਲਾਂ}other{{N} ਸਕਿੰਟ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਸਕਿੰਟ ਵਿੱਚ}other{{N} ਸਕਿੰਟਾਂ ਵਿੱਚ}}',
    },
    SHORT:{
      RELATIVE:{'0':'ਹੁਣ'},
      PAST:'{N,plural,one{{N} ਸਕਿੰਟ ਪਹਿਲਾਂ}other{{N} ਸਕਿੰਟ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਸਕਿੰਟ ਵਿੱਚ}other{{N} ਸਕਿੰਟਾਂ ਵਿੱਚ}}',
    },
    NARROW:{
      RELATIVE:{'0':'ਹੁਣ'},
      PAST:'{N,plural,one{{N} ਸਕਿੰਟ ਪਹਿਲਾਂ}other{{N} ਸਕਿੰਟ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਸਕਿੰਟ ਵਿੱਚ}other{{N} ਸਕਿੰਟਾਂ ਵਿੱਚ}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'ਪਿਛਲਾ ਹਫ਼ਤਾ','0':'ਇਹ ਹਫ਼ਤਾ','1':'ਅਗਲਾ ਹਫ਼ਤਾ'},
      PAST:'{N,plural,one{{N} ਹਫ਼ਤਾ ਪਹਿਲਾਂ}other{{N} ਹਫ਼ਤੇ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਹਫ਼ਤੇ ਵਿੱਚ}other{{N} ਹਫ਼ਤਿਆਂ ਵਿੱਚ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ਪਿਛਲਾ ਹਫ਼ਤਾ','0':'ਇਹ ਹਫ਼ਤਾ','1':'ਅਗਲਾ ਹਫ਼ਤਾ'},
      PAST:'{N,plural,one{{N} ਹਫ਼ਤਾ ਪਹਿਲਾਂ}other{{N} ਹਫ਼ਤੇ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਹਫ਼ਤੇ ਵਿੱਚ}other{{N} ਹਫ਼ਤਿਆਂ ਵਿੱਚ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ਪਿਛਲਾ ਹਫ਼ਤਾ','0':'ਇਹ ਹਫ਼ਤਾ','1':'ਅਗਲਾ ਹਫ਼ਤਾ'},
      PAST:'{N,plural,one{{N} ਹਫ਼ਤਾ ਪਹਿਲਾਂ}other{{N} ਹਫ਼ਤੇ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਹਫ਼ਤੇ ਵਿੱਚ}other{{N} ਹਫ਼ਤਿਆਂ ਵਿੱਚ}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ਪਿਛਲਾ ਸਾਲ','0':'ਇਹ ਸਾਲ','1':'ਅਗਲਾ ਸਾਲ'},
      PAST:'{N,plural,one{{N} ਸਾਲ ਪਹਿਲਾਂ}other{{N} ਸਾਲ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਸਾਲ ਵਿੱਚ}other{{N} ਸਾਲਾਂ ਵਿੱਚ}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ਪਿਛਲਾ ਸਾਲ','0':'ਇਹ ਸਾਲ','1':'ਅਗਲਾ ਸਾਲ'},
      PAST:'{N,plural,one{{N} ਸਾਲ ਪਹਿਲਾਂ}other{{N} ਸਾਲ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਸਾਲ ਵਿੱਚ}other{{N} ਸਾਲਾਂ ਵਿੱਚ}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ਪਿਛਲਾ ਸਾਲ','0':'ਇਹ ਸਾਲ','1':'ਅਗਲਾ ਸਾਲ'},
      PAST:'{N,plural,one{{N} ਸਾਲ ਪਹਿਲਾਂ}other{{N} ਸਾਲ ਪਹਿਲਾਂ}}',
      FUTURE:'{N,plural,one{{N} ਸਾਲ ਵਿੱਚ}other{{N} ਸਾਲਾਂ ਵਿੱਚ}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_pl =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'wczoraj','-2':'przedwczoraj','0':'dzisiaj','1':'jutro','2':'pojutrze'},
      PAST:'{N,plural,few{{N} dni temu}many{{N} dni temu}one{{N} dzień temu}other{{N} dnia temu}}',
      FUTURE:'{N,plural,few{za {N} dni}many{za {N} dni}one{za {N} dzień}other{za {N} dnia}}',
    },
    SHORT:{
      RELATIVE:{'-2':'przedwczoraj','2':'pojutrze'},
      PAST:'{N,plural,few{{N} dni temu}many{{N} dni temu}one{{N} dzień temu}other{{N} dnia temu}}',
      FUTURE:'{N,plural,few{za {N} dni}many{za {N} dni}one{za {N} dzień}other{za {N} dnia}}',
    },
    NARROW:{
      RELATIVE:{'-2':'przedwczoraj','2':'pojutrze'},
      PAST:'{N,plural,few{{N} dni temu}many{{N} dni temu}one{{N} dzień temu}other{{N} dnia temu}}',
      FUTURE:'{N,plural,few{za {N} dni}many{za {N} dni}one{za {N} dzień}other{za {N} dnia}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ta godzina'},
      PAST:'{N,plural,few{{N} godziny temu}many{{N} godzin temu}one{{N} godzinę temu}other{{N} godziny temu}}',
      FUTURE:'{N,plural,few{za {N} godziny}many{za {N} godzin}one{za {N} godzinę}other{za {N} godziny}}',
    },
    SHORT:{
      RELATIVE:{'0':'ta godzina'},
      PAST:'{N,plural,few{{N} godz. temu}many{{N} godz. temu}one{{N} godz. temu}other{{N} godz. temu}}',
      FUTURE:'{N,plural,few{za {N} godz.}many{za {N} godz.}one{za {N} godz.}other{za {N} godz.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ta godzina'},
      PAST:'{N,plural,few{{N} g. temu}many{{N} g. temu}one{{N} g. temu}other{{N} g. temu}}',
      FUTURE:'{N,plural,few{za {N} g.}many{za {N} g.}one{za {N} g.}other{za {N} g.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ta minuta'},
      PAST:'{N,plural,few{{N} minuty temu}many{{N} minut temu}one{{N} minutę temu}other{{N} minuty temu}}',
      FUTURE:'{N,plural,few{za {N} minuty}many{za {N} minut}one{za {N} minutę}other{za {N} minuty}}',
    },
    SHORT:{
      RELATIVE:{'0':'ta minuta'},
      PAST:'{N,plural,few{{N} min temu}many{{N} min temu}one{{N} min temu}other{{N} min temu}}',
      FUTURE:'{N,plural,few{za {N} min}many{za {N} min}one{za {N} min}other{za {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'ta minuta'},
      PAST:'{N,plural,few{{N} min temu}many{{N} min temu}one{{N} min temu}other{{N} min temu}}',
      FUTURE:'{N,plural,few{za {N} min}many{za {N} min}one{za {N} min}other{za {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'w zeszłym miesiącu','0':'w tym miesiącu','1':'w przyszłym miesiącu'},
      PAST:'{N,plural,few{{N} miesiące temu}many{{N} miesięcy temu}one{{N} miesiąc temu}other{{N} miesiąca temu}}',
      FUTURE:'{N,plural,few{za {N} miesiące}many{za {N} miesięcy}one{za {N} miesiąc}other{za {N} miesiąca}}',
    },
    SHORT:{
      RELATIVE:{'-1':'w zeszłym miesiącu','0':'w tym miesiącu','1':'w przyszłym miesiącu'},
      PAST:'{N,plural,few{{N} mies. temu}many{{N} mies. temu}one{{N} mies. temu}other{{N} mies. temu}}',
      FUTURE:'{N,plural,few{za {N} mies.}many{za {N} mies.}one{za {N} mies.}other{za {N} mies.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'w zeszłym miesiącu','0':'w tym miesiącu','1':'w przyszłym miesiącu'},
      PAST:'{N,plural,few{{N} mies. temu}many{{N} mies. temu}one{{N} mies. temu}other{{N} mies. temu}}',
      FUTURE:'{N,plural,few{za {N} mies.}many{za {N} mies.}one{za {N} mies.}other{za {N} mies.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'w zeszłym kwartale','0':'w tym kwartale','1':'w przyszłym kwartale'},
      PAST:'{N,plural,few{{N} kwartały temu}many{{N} kwartałów temu}one{{N} kwartał temu}other{{N} kwartału temu}}',
      FUTURE:'{N,plural,few{za {N} kwartały}many{za {N} kwartałów}one{za {N} kwartał}other{za {N} kwartału}}',
    },
    SHORT:{
      RELATIVE:{'-1':'w zeszłym kwartale','0':'w tym kwartale','1':'w przyszłym kwartale'},
      PAST:'{N,plural,few{{N} kw. temu}many{{N} kw. temu}one{{N} kw. temu}other{{N} kw. temu}}',
      FUTURE:'{N,plural,few{za {N} kw.}many{za {N} kw.}one{za {N} kw.}other{za {N} kw.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'w zeszłym kwartale','0':'w tym kwartale','1':'w przyszłym kwartale'},
      PAST:'{N,plural,few{{N} kw. temu}many{{N} kw. temu}one{{N} kw. temu}other{{N} kw. temu}}',
      FUTURE:'{N,plural,few{za {N} kw.}many{za {N} kw.}one{za {N} kw.}other{za {N} kw.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'teraz'},
      PAST:'{N,plural,few{{N} sekundy temu}many{{N} sekund temu}one{{N} sekundę temu}other{{N} sekundy temu}}',
      FUTURE:'{N,plural,few{za {N} sekundy}many{za {N} sekund}one{za {N} sekundę}other{za {N} sekundy}}',
    },
    SHORT:{
      RELATIVE:{'0':'teraz'},
      PAST:'{N,plural,few{{N} sek. temu}many{{N} sek. temu}one{{N} sek. temu}other{{N} sek. temu}}',
      FUTURE:'{N,plural,few{za {N} sek.}many{za {N} sek.}one{za {N} sek.}other{za {N} sek.}}',
    },
    NARROW:{
      RELATIVE:{'0':'teraz'},
      PAST:'{N,plural,few{{N} s temu}many{{N} s temu}one{{N} s temu}other{{N} s temu}}',
      FUTURE:'{N,plural,few{za {N} s}many{za {N} s}one{za {N} s}other{za {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'w zeszłym tygodniu','0':'w tym tygodniu','1':'w przyszłym tygodniu'},
      PAST:'{N,plural,few{{N} tygodnie temu}many{{N} tygodni temu}one{{N} tydzień temu}other{{N} tygodnia temu}}',
      FUTURE:'{N,plural,few{za {N} tygodnie}many{za {N} tygodni}one{za {N} tydzień}other{za {N} tygodnia}}',
    },
    SHORT:{
      RELATIVE:{'-1':'w zeszłym tygodniu','0':'w tym tygodniu','1':'w przyszłym tygodniu'},
      PAST:'{N,plural,few{{N} tyg. temu}many{{N} tyg. temu}one{{N} tydz. temu}other{{N} tyg. temu}}',
      FUTURE:'{N,plural,few{za {N} tyg.}many{za {N} tyg.}one{za {N} tydz.}other{za {N} tyg.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'w zeszłym tygodniu','0':'w tym tygodniu','1':'w przyszłym tygodniu'},
      PAST:'{N,plural,few{{N} tyg. temu}many{{N} tyg. temu}one{{N} tydz. temu}other{{N} tyg. temu}}',
      FUTURE:'{N,plural,few{za {N} tyg.}many{za {N} tyg.}one{za {N} tydz.}other{za {N} tyg.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'w zeszłym roku','0':'w tym roku','1':'w przyszłym roku'},
      PAST:'{N,plural,few{{N} lata temu}many{{N} lat temu}one{{N} rok temu}other{{N} roku temu}}',
      FUTURE:'{N,plural,few{za {N} lata}many{za {N} lat}one{za {N} rok}other{za {N} roku}}',
    },
    SHORT:{
      RELATIVE:{'-1':'w zeszłym roku','0':'w tym roku','1':'w przyszłym roku'},
      PAST:'{N,plural,few{{N} lata temu}many{{N} lat temu}one{{N} rok temu}other{{N} roku temu}}',
      FUTURE:'{N,plural,few{za {N} lata}many{za {N} lat}one{za {N} rok}other{za {N} roku}}',
    },
    NARROW:{
      RELATIVE:{'-1':'w zeszłym roku','0':'w tym roku','1':'w przyszłym roku'},
      PAST:'{N,plural,few{{N} lata temu}many{{N} lat temu}one{{N} rok temu}other{{N} roku temu}}',
      FUTURE:'{N,plural,few{za {N} lata}many{za {N} lat}one{za {N} rok}other{za {N} roku}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_pt =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ontem','-2':'anteontem','0':'hoje','1':'amanhã','2':'depois de amanhã'},
      PAST:'{N,plural,one{há {N} dia}other{há {N} dias}}',
      FUTURE:'{N,plural,one{em {N} dia}other{em {N} dias}}',
    },
    SHORT:{
      RELATIVE:{'-2':'anteontem','2':'depois de amanhã'},
      PAST:'{N,plural,one{há {N} dia}other{há {N} dias}}',
      FUTURE:'{N,plural,one{em {N} dia}other{em {N} dias}}',
    },
    NARROW:{
      RELATIVE:{'-2':'anteontem','2':'depois de amanhã'},
      PAST:'{N,plural,one{há {N} dia}other{há {N} dias}}',
      FUTURE:'{N,plural,one{em {N} dia}other{em {N} dias}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{há {N} hora}other{há {N} horas}}',
      FUTURE:'{N,plural,one{em {N} hora}other{em {N} horas}}',
    },
    SHORT:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{há {N} h}other{há {N} h}}',
      FUTURE:'{N,plural,one{em {N} h}other{em {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{há {N} h}other{há {N} h}}',
      FUTURE:'{N,plural,one{em {N} h}other{em {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{há {N} minuto}other{há {N} minutos}}',
      FUTURE:'{N,plural,one{em {N} minuto}other{em {N} minutos}}',
    },
    SHORT:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{há {N} min.}other{há {N} min.}}',
      FUTURE:'{N,plural,one{em {N} min.}other{em {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{há {N} min.}other{há {N} min.}}',
      FUTURE:'{N,plural,one{em {N} min.}other{em {N} min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'mês passado','0':'este mês','1':'próximo mês'},
      PAST:'{N,plural,one{há {N} mês}other{há {N} meses}}',
      FUTURE:'{N,plural,one{em {N} mês}other{em {N} meses}}',
    },
    SHORT:{
      RELATIVE:{'-1':'mês passado','0':'este mês','1':'próximo mês'},
      PAST:'{N,plural,one{há {N} mês}other{há {N} meses}}',
      FUTURE:'{N,plural,one{em {N} mês}other{em {N} meses}}',
    },
    NARROW:{
      RELATIVE:{'-1':'mês passado','0':'este mês','1':'próximo mês'},
      PAST:'{N,plural,one{há {N} mês}other{há {N} meses}}',
      FUTURE:'{N,plural,one{em {N} mês}other{em {N} meses}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'último trimestre','0':'este trimestre','1':'próximo trimestre'},
      PAST:'{N,plural,one{há {N} trimestre}other{há {N} trimestres}}',
      FUTURE:'{N,plural,one{em {N} trimestre}other{em {N} trimestres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'último trimestre','0':'este trimestre','1':'próximo trimestre'},
      PAST:'{N,plural,one{há {N} trim.}other{{N} trim. atrás}}',
      FUTURE:'{N,plural,one{em {N} trim.}other{em {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'último trimestre','0':'este trimestre','1':'próximo trimestre'},
      PAST:'{N,plural,one{há {N} trim.}other{há {N} trim.}}',
      FUTURE:'{N,plural,one{em {N} trim.}other{em {N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'agora'},
      PAST:'{N,plural,one{há {N} segundo}other{há {N} segundos}}',
      FUTURE:'{N,plural,one{em {N} segundo}other{em {N} segundos}}',
    },
    SHORT:{
      RELATIVE:{'0':'agora'},
      PAST:'{N,plural,one{há {N} seg.}other{há {N} seg.}}',
      FUTURE:'{N,plural,one{em {N} seg.}other{em {N} seg.}}',
    },
    NARROW:{
      RELATIVE:{'0':'agora'},
      PAST:'{N,plural,one{há {N} seg.}other{há {N} seg.}}',
      FUTURE:'{N,plural,one{em {N} seg.}other{em {N} seg.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'semana passada','0':'esta semana','1':'próxima semana'},
      PAST:'{N,plural,one{há {N} semana}other{há {N} semanas}}',
      FUTURE:'{N,plural,one{em {N} semana}other{em {N} semanas}}',
    },
    SHORT:{
      RELATIVE:{'-1':'semana passada','0':'esta semana','1':'próxima semana'},
      PAST:'{N,plural,one{há {N} sem.}other{há {N} sem.}}',
      FUTURE:'{N,plural,one{em {N} sem.}other{em {N} sem.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'semana passada','0':'esta semana','1':'próxima semana'},
      PAST:'{N,plural,one{há {N} sem.}other{há {N} sem.}}',
      FUTURE:'{N,plural,one{em {N} sem.}other{em {N} sem.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ano passado','0':'este ano','1':'próximo ano'},
      PAST:'{N,plural,one{há {N} ano}other{há {N} anos}}',
      FUTURE:'{N,plural,one{em {N} ano}other{em {N} anos}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ano passado','0':'este ano','1':'próximo ano'},
      PAST:'{N,plural,one{há {N} ano}other{há {N} anos}}',
      FUTURE:'{N,plural,one{em {N} ano}other{em {N} anos}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ano passado','0':'este ano','1':'próximo ano'},
      PAST:'{N,plural,one{há {N} ano}other{{N} anos atrás}}',
      FUTURE:'{N,plural,one{em {N} ano}other{em {N} anos}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_pt_BR = exports.RelativeDateTimeSymbols_pt;

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_pt_PT =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ontem','-2':'anteontem','0':'hoje','1':'amanhã','2':'depois de amanhã'},
      PAST:'{N,plural,one{há {N} dia}other{há {N} dias}}',
      FUTURE:'{N,plural,one{dentro de {N} dia}other{dentro de {N} dias}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ontem','-2':'anteontem','0':'hoje','1':'amanhã','2':'depois de amanhã'},
      PAST:'{N,plural,one{há {N} dia}other{há {N} dias}}',
      FUTURE:'{N,plural,one{dentro de {N} dia}other{dentro de {N} dias}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ontem','-2':'anteontem','0':'hoje','1':'amanhã','2':'depois de amanhã'},
      PAST:'{N,plural,one{há {N} dias}other{há {N} dias}}',
      FUTURE:'{N,plural,one{+{N} dia}other{+{N} dias}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{há {N} hora}other{há {N} horas}}',
      FUTURE:'{N,plural,one{dentro de {N} hora}other{dentro de {N} horas}}',
    },
    SHORT:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{há {N} h}other{há {N} h}}',
      FUTURE:'{N,plural,one{dentro de {N} h}other{dentro de {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'esta hora'},
      PAST:'{N,plural,one{-{N} h}other{-{N} h}}',
      FUTURE:'{N,plural,one{+{N} h}other{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{há {N} minuto}other{há {N} minutos}}',
      FUTURE:'{N,plural,one{dentro de {N} minuto}other{dentro de {N} minutos}}',
    },
    SHORT:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{há {N} min}other{há {N} min}}',
      FUTURE:'{N,plural,one{dentro de {N} min}other{dentro de {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'este minuto'},
      PAST:'{N,plural,one{-{N} min}other{-{N} min}}',
      FUTURE:'{N,plural,one{+{N} min}other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'mês passado','0':'este mês','1':'próximo mês'},
      PAST:'{N,plural,one{há {N} mês}other{há {N} meses}}',
      FUTURE:'{N,plural,one{dentro de {N} mês}other{dentro de {N} meses}}',
    },
    SHORT:{
      RELATIVE:{'-1':'mês passado','0':'este mês','1':'próximo mês'},
      PAST:'{N,plural,one{há {N} mês}other{há {N} meses}}',
      FUTURE:'{N,plural,one{dentro de {N} mês}other{dentro de {N} meses}}',
    },
    NARROW:{
      RELATIVE:{'-1':'mês passado','0':'este mês','1':'próximo mês'},
      PAST:'{N,plural,one{-{N} mês}other{-{N} meses}}',
      FUTURE:'{N,plural,one{+{N} mês}other{+{N} meses}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'trimestre passado','0':'este trimestre','1':'próximo trimestre'},
      PAST:'{N,plural,one{há {N} trimestre}other{há {N} trimestres}}',
      FUTURE:'{N,plural,one{dentro de {N} trimestre}other{dentro de {N} trimestres}}',
    },
    SHORT:{
      RELATIVE:{'-1':'trim. passado','0':'este trim.','1':'próximo trim.'},
      PAST:'{N,plural,one{há {N} trim.}other{há {N} trim.}}',
      FUTURE:'{N,plural,one{dentro de {N} trim.}other{dentro de {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'trim. passado','0':'este trim.','1':'próximo trim.'},
      PAST:'{N,plural,one{-{N} trim.}other{-{N} trim.}}',
      FUTURE:'{N,plural,one{+{N} trim.}other{+{N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'agora'},
      PAST:'{N,plural,one{há {N} segundo}other{há {N} segundos}}',
      FUTURE:'{N,plural,one{dentro de {N} segundo}other{dentro de {N} segundos}}',
    },
    SHORT:{
      RELATIVE:{'0':'agora'},
      PAST:'{N,plural,one{há {N} s}other{há {N} s}}',
      FUTURE:'{N,plural,one{dentro de {N} s}other{dentro de {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'agora'},
      PAST:'{N,plural,one{-{N} s}other{-{N} s}}',
      FUTURE:'{N,plural,one{+{N} s}other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'semana passada','0':'esta semana','1':'próxima semana'},
      PAST:'{N,plural,one{há {N} semana}other{há {N} semanas}}',
      FUTURE:'{N,plural,one{dentro de {N} semana}other{dentro de {N} semanas}}',
    },
    SHORT:{
      RELATIVE:{'-1':'semana passada','0':'esta semana','1':'próxima semana'},
      PAST:'{N,plural,one{há {N} sem.}other{há {N} sem.}}',
      FUTURE:'{N,plural,one{dentro de {N} sem.}other{dentro de {N} sem.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'semana passada','0':'esta semana','1':'próxima semana'},
      PAST:'{N,plural,one{-{N} sem.}other{-{N} sem.}}',
      FUTURE:'{N,plural,one{+{N} sem.}other{+{N} sem.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ano passado','0':'este ano','1':'próximo ano'},
      PAST:'{N,plural,one{há {N} ano}other{há {N} anos}}',
      FUTURE:'{N,plural,one{dentro de {N} ano}other{dentro de {N} anos}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ano passado','0':'este ano','1':'próximo ano'},
      PAST:'{N,plural,one{há {N} ano}other{há {N} anos}}',
      FUTURE:'{N,plural,one{dentro de {N} ano}other{dentro de {N} anos}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ano passado','0':'este ano','1':'próximo ano'},
      PAST:'{N,plural,one{-{N} ano}other{-{N} anos}}',
      FUTURE:'{N,plural,one{+{N} ano}other{+{N} anos}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ro =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ieri','-2':'alaltăieri','0':'azi','1':'mâine','2':'poimâine'},
      PAST:'{N,plural,few{acum {N} zile}one{acum {N} zi}other{acum {N} de zile}}',
      FUTURE:'{N,plural,few{peste {N} zile}one{peste {N} zi}other{peste {N} de zile}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ieri','-2':'alaltăieri','0':'azi','1':'mâine','2':'poimâine'},
      PAST:'{N,plural,few{acum {N} zile}one{acum {N} zi}other{acum {N} de zile}}',
      FUTURE:'{N,plural,few{peste {N} zile}one{peste {N} zi}other{peste {N} de zile}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ieri','-2':'alaltăieri','0':'azi','1':'mâine','2':'poimâine'},
      PAST:'{N,plural,few{-{N} zile}one{-{N} zi}other{-{N} zile}}',
      FUTURE:'{N,plural,few{+{N} zile}one{+{N} zi}other{+{N} zile}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ora aceasta'},
      PAST:'{N,plural,few{acum {N} ore}one{acum {N} oră}other{acum {N} de ore}}',
      FUTURE:'{N,plural,few{peste {N} ore}one{peste {N} oră}other{peste {N} de ore}}',
    },
    SHORT:{
      RELATIVE:{'0':'ora aceasta'},
      PAST:'{N,plural,few{acum {N} h}one{acum {N} h}other{acum {N} h}}',
      FUTURE:'{N,plural,few{peste {N} h}one{peste {N} h}other{peste {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'ora aceasta'},
      PAST:'{N,plural,few{-{N} h}one{-{N} h}other{-{N} h}}',
      FUTURE:'{N,plural,few{+{N} h}one{+{N} h}other{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'minutul acesta'},
      PAST:'{N,plural,few{acum {N} minute}one{acum {N} minut}other{acum {N} de minute}}',
      FUTURE:'{N,plural,few{peste {N} minute}one{peste {N} minut}other{peste {N} de minute}}',
    },
    SHORT:{
      RELATIVE:{'0':'minutul acesta'},
      PAST:'{N,plural,few{acum {N} min.}one{acum {N} min.}other{acum {N} min.}}',
      FUTURE:'{N,plural,few{peste {N} min.}one{peste {N} min.}other{peste {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'minutul acesta'},
      PAST:'{N,plural,few{-{N} m}one{-{N} m}other{-{N} m}}',
      FUTURE:'{N,plural,few{+{N} m}one{+{N} m}other{+{N} m}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'luna trecută','0':'luna aceasta','1':'luna viitoare'},
      PAST:'{N,plural,few{acum {N} luni}one{acum {N} lună}other{acum {N} de luni}}',
      FUTURE:'{N,plural,few{peste {N} luni}one{peste {N} lună}other{peste {N} de luni}}',
    },
    SHORT:{
      RELATIVE:{'-1':'luna trecută','0':'luna aceasta','1':'luna viitoare'},
      PAST:'{N,plural,few{acum {N} luni}one{acum {N} lună}other{acum {N} luni}}',
      FUTURE:'{N,plural,few{peste {N} luni}one{peste {N} lună}other{peste {N} luni}}',
    },
    NARROW:{
      RELATIVE:{'-1':'luna trecută','0':'luna aceasta','1':'luna viitoare'},
      PAST:'{N,plural,few{-{N} luni}one{-{N} lună}other{-{N} luni}}',
      FUTURE:'{N,plural,few{+{N} luni}one{+{N} lună}other{+{N} luni}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'trimestrul trecut','0':'trimestrul acesta','1':'trimestrul viitor'},
      PAST:'{N,plural,few{acum {N} trimestre}one{acum {N} trimestru}other{acum {N} de trimestre}}',
      FUTURE:'{N,plural,few{peste {N} trimestre}one{peste {N} trimestru}other{peste {N} de trimestre}}',
    },
    SHORT:{
      RELATIVE:{'-1':'trim. trecut','0':'trim. acesta','1':'trim. viitor'},
      PAST:'{N,plural,few{acum {N} trim.}one{acum {N} trim.}other{acum {N} trim.}}',
      FUTURE:'{N,plural,few{peste {N} trim.}one{peste {N} trim.}other{peste {N} trim.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'trim. trecut','0':'trim. acesta','1':'trim. viitor'},
      PAST:'{N,plural,few{-{N} trim.}one{-{N} trim.}other{-{N} trim.}}',
      FUTURE:'{N,plural,few{+{N} trim.}one{+{N} trim.}other{+{N} trim.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'acum'},
      PAST:'{N,plural,few{acum {N} secunde}one{acum {N} secundă}other{acum {N} de secunde}}',
      FUTURE:'{N,plural,few{peste {N} secunde}one{peste {N} secundă}other{peste {N} de secunde}}',
    },
    SHORT:{
      RELATIVE:{'0':'acum'},
      PAST:'{N,plural,few{acum {N} sec.}one{acum {N} sec.}other{acum {N} sec.}}',
      FUTURE:'{N,plural,few{peste {N} sec.}one{peste {N} sec.}other{peste {N} sec.}}',
    },
    NARROW:{
      RELATIVE:{'0':'acum'},
      PAST:'{N,plural,few{-{N} s}one{-{N} s}other{-{N} s}}',
      FUTURE:'{N,plural,few{+{N} s}one{+{N} s}other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'săptămâna trecută','0':'săptămâna aceasta','1':'săptămâna viitoare'},
      PAST:'{N,plural,few{acum {N} săptămâni}one{acum {N} săptămână}other{acum {N} de săptămâni}}',
      FUTURE:'{N,plural,few{peste {N} săptămâni}one{peste {N} săptămână}other{peste {N} de săptămâni}}',
    },
    SHORT:{
      RELATIVE:{'-1':'săpt. trecută','0':'săpt. aceasta','1':'săpt. viitoare'},
      PAST:'{N,plural,few{acum {N} săpt.}one{acum {N} săpt.}other{acum {N} săpt.}}',
      FUTURE:'{N,plural,few{peste {N} săpt.}one{peste {N} săpt.}other{peste {N} săpt.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'săpt. trecută','0':'săptămâna aceasta','1':'săpt. viitoare'},
      PAST:'{N,plural,few{-{N} săpt.}one{-{N} săpt.}other{-{N} săpt.}}',
      FUTURE:'{N,plural,few{+{N} săpt.}one{+{N} săpt.}other{+{N} săpt.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'anul trecut','0':'anul acesta','1':'anul viitor'},
      PAST:'{N,plural,few{acum {N} ani}one{acum {N} an}other{acum {N} de ani}}',
      FUTURE:'{N,plural,few{peste {N} ani}one{peste {N} an}other{peste {N} de ani}}',
    },
    SHORT:{
      RELATIVE:{'-1':'anul trecut','0':'anul acesta','1':'anul viitor'},
      PAST:'{N,plural,few{acum {N} ani}one{acum {N} an}other{acum {N} de ani}}',
      FUTURE:'{N,plural,few{peste {N} ani}one{peste {N} an}other{peste {N} de ani}}',
    },
    NARROW:{
      RELATIVE:{'-1':'anul trecut','0':'anul acesta','1':'anul viitor'},
      PAST:'{N,plural,few{-{N} ani}one{-{N} an}other{-{N} ani}}',
      FUTURE:'{N,plural,few{+{N} ani}one{+{N} an}other{+{N} ani}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ru =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'вчера','-2':'позавчера','0':'сегодня','1':'завтра','2':'послезавтра'},
      PAST:'{N,plural,few{{N} дня назад}many{{N} дней назад}one{{N} день назад}other{{N} дня назад}}',
      FUTURE:'{N,plural,few{через {N} дня}many{через {N} дней}one{через {N} день}other{через {N} дня}}',
    },
    SHORT:{
      RELATIVE:{'-2':'позавчера','2':'послезавтра'},
      PAST:'{N,plural,few{{N} дн. назад}many{{N} дн. назад}one{{N} дн. назад}other{{N} дн. назад}}',
      FUTURE:'{N,plural,few{через {N} дн.}many{через {N} дн.}one{через {N} дн.}other{через {N} дн.}}',
    },
    NARROW:{
      RELATIVE:{'-2':'позавчера','2':'послезавтра'},
      PAST:'{N,plural,few{-{N} дн.}many{-{N} дн.}one{-{N} дн.}other{-{N} дн.}}',
      FUTURE:'{N,plural,few{+{N} дн.}many{+{N} дн.}one{+{N} дн.}other{+{N} дн.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'в этот час'},
      PAST:'{N,plural,few{{N} часа назад}many{{N} часов назад}one{{N} час назад}other{{N} часа назад}}',
      FUTURE:'{N,plural,few{через {N} часа}many{через {N} часов}one{через {N} час}other{через {N} часа}}',
    },
    SHORT:{
      RELATIVE:{'0':'в этот час'},
      PAST:'{N,plural,few{{N} ч. назад}many{{N} ч. назад}one{{N} ч. назад}other{{N} ч. назад}}',
      FUTURE:'{N,plural,few{через {N} ч.}many{через {N} ч.}one{через {N} ч.}other{через {N} ч.}}',
    },
    NARROW:{
      RELATIVE:{'0':'в этот час'},
      PAST:'{N,plural,few{-{N} ч.}many{-{N} ч.}one{-{N} ч.}other{-{N} ч.}}',
      FUTURE:'{N,plural,few{+{N} ч.}many{+{N} ч.}one{+{N} ч.}other{+{N} ч.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'в эту минуту'},
      PAST:'{N,plural,few{{N} минуты назад}many{{N} минут назад}one{{N} минуту назад}other{{N} минуты назад}}',
      FUTURE:'{N,plural,few{через {N} минуты}many{через {N} минут}one{через {N} минуту}other{через {N} минуты}}',
    },
    SHORT:{
      RELATIVE:{'0':'в эту минуту'},
      PAST:'{N,plural,few{{N} мин. назад}many{{N} мин. назад}one{{N} мин. назад}other{{N} мин. назад}}',
      FUTURE:'{N,plural,few{через {N} мин.}many{через {N} мин.}one{через {N} мин.}other{через {N} мин.}}',
    },
    NARROW:{
      RELATIVE:{'0':'в эту минуту'},
      PAST:'{N,plural,few{-{N} мин.}many{-{N} мин.}one{-{N} мин.}other{-{N} мин.}}',
      FUTURE:'{N,plural,few{+{N} мин.}many{+{N} мин.}one{+{N} мин.}other{+{N} мин.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'в прошлом месяце','0':'в этом месяце','1':'в следующем месяце'},
      PAST:'{N,plural,few{{N} месяца назад}many{{N} месяцев назад}one{{N} месяц назад}other{{N} месяца назад}}',
      FUTURE:'{N,plural,few{через {N} месяца}many{через {N} месяцев}one{через {N} месяц}other{через {N} месяца}}',
    },
    SHORT:{
      RELATIVE:{'-1':'в прошлом мес.','0':'в этом мес.','1':'в следующем мес.'},
      PAST:'{N,plural,few{{N} мес. назад}many{{N} мес. назад}one{{N} мес. назад}other{{N} мес. назад}}',
      FUTURE:'{N,plural,few{через {N} мес.}many{через {N} мес.}one{через {N} мес.}other{через {N} мес.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'в пр. мес.','0':'в эт. мес.','1':'в след. мес.'},
      PAST:'{N,plural,few{-{N} мес.}many{-{N} мес.}one{-{N} мес.}other{-{N} мес.}}',
      FUTURE:'{N,plural,few{+{N} мес.}many{+{N} мес.}one{+{N} мес.}other{+{N} мес.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'в прошлом квартале','0':'в текущем квартале','1':'в следующем квартале'},
      PAST:'{N,plural,few{{N} квартала назад}many{{N} кварталов назад}one{{N} квартал назад}other{{N} квартала назад}}',
      FUTURE:'{N,plural,few{через {N} квартала}many{через {N} кварталов}one{через {N} квартал}other{через {N} квартала}}',
    },
    SHORT:{
      RELATIVE:{'-1':'последний кв.','0':'текущий кв.','1':'следующий кв.'},
      PAST:'{N,plural,few{{N} кв. назад}many{{N} кв. назад}one{{N} кв. назад}other{{N} кв. назад}}',
      FUTURE:'{N,plural,few{через {N} кв.}many{через {N} кв.}one{через {N} кв.}other{через {N} кв.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'посл. кв.','0':'тек. кв.','1':'след. кв.'},
      PAST:'{N,plural,few{-{N} кв.}many{-{N} кв.}one{-{N} кв.}other{-{N} кв.}}',
      FUTURE:'{N,plural,few{+{N} кв.}many{+{N} кв.}one{+{N} кв.}other{+{N} кв.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'сейчас'},
      PAST:'{N,plural,few{{N} секунды назад}many{{N} секунд назад}one{{N} секунду назад}other{{N} секунды назад}}',
      FUTURE:'{N,plural,few{через {N} секунды}many{через {N} секунд}one{через {N} секунду}other{через {N} секунды}}',
    },
    SHORT:{
      RELATIVE:{'0':'сейчас'},
      PAST:'{N,plural,few{{N} сек. назад}many{{N} сек. назад}one{{N} сек. назад}other{{N} сек. назад}}',
      FUTURE:'{N,plural,few{через {N} сек.}many{через {N} сек.}one{через {N} сек.}other{через {N} сек.}}',
    },
    NARROW:{
      RELATIVE:{'0':'сейчас'},
      PAST:'{N,plural,few{-{N} с}many{-{N} с}one{-{N} с}other{-{N} с}}',
      FUTURE:'{N,plural,few{+{N} с}many{+{N} с}one{+{N} с}other{+{N} с}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'на прошлой неделе','0':'на этой неделе','1':'на следующей неделе'},
      PAST:'{N,plural,few{{N} недели назад}many{{N} недель назад}one{{N} неделю назад}other{{N} недели назад}}',
      FUTURE:'{N,plural,few{через {N} недели}many{через {N} недель}one{через {N} неделю}other{через {N} недели}}',
    },
    SHORT:{
      RELATIVE:{'-1':'на прошлой нед.','0':'на этой нед.','1':'на следующей нед.'},
      PAST:'{N,plural,few{{N} нед. назад}many{{N} нед. назад}one{{N} нед. назад}other{{N} нед. назад}}',
      FUTURE:'{N,plural,few{через {N} нед.}many{через {N} нед.}one{через {N} нед.}other{через {N} нед.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'на пр. нед.','0':'на эт. нед.','1':'на след. неделе'},
      PAST:'{N,plural,few{-{N} нед.}many{-{N} нед.}one{-{N} нед.}other{-{N} нед.}}',
      FUTURE:'{N,plural,few{+{N} нед.}many{+{N} нед.}one{+{N} нед.}other{+{N} нед.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'в прошлом году','0':'в этом году','1':'в следующем году'},
      PAST:'{N,plural,few{{N} года назад}many{{N} лет назад}one{{N} год назад}other{{N} года назад}}',
      FUTURE:'{N,plural,few{через {N} года}many{через {N} лет}one{через {N} год}other{через {N} года}}',
    },
    SHORT:{
      RELATIVE:{'-1':'в прошлом г.','0':'в этом г.','1':'в след. г.'},
      PAST:'{N,plural,few{{N} г. назад}many{{N} л. назад}one{{N} г. назад}other{{N} г. назад}}',
      FUTURE:'{N,plural,few{через {N} г.}many{через {N} л.}one{через {N} г.}other{через {N} г.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'в пр. г.','0':'в эт. г.','1':'в сл. г.'},
      PAST:'{N,plural,few{-{N} г.}many{-{N} л.}one{-{N} г.}other{-{N} г.}}',
      FUTURE:'{N,plural,few{+{N} г.}many{+{N} л.}one{+{N} г.}other{+{N} г.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_sh =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'juče','-2':'prekjuče','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{pre {N} dana}one{pre {N} dana}other{pre {N} dana}}',
      FUTURE:'{N,plural,few{za {N} dana}one{za {N} dan}other{za {N} dana}}',
    },
    SHORT:{
      RELATIVE:{'-1':'juče','-2':'prekjuče','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{pre {N} d.}one{pre {N} d.}other{pre {N} d.}}',
      FUTURE:'{N,plural,few{za {N} d.}one{za {N} d.}other{za {N} d.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'juče','-2':'prekjuče','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{pre {N} d.}one{pre {N} d.}other{pre {N} d.}}',
      FUTURE:'{N,plural,few{za {N} d.}one{za {N} d.}other{za {N} d.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ovog sata'},
      PAST:'{N,plural,few{pre {N} sata}one{pre {N} sata}other{pre {N} sati}}',
      FUTURE:'{N,plural,few{za {N} sata}one{za {N} sat}other{za {N} sati}}',
    },
    SHORT:{
      RELATIVE:{'0':'ovog sata'},
      PAST:'{N,plural,few{pre {N} č.}one{pre {N} č.}other{pre {N} č.}}',
      FUTURE:'{N,plural,few{za {N} č.}one{za {N} č.}other{za {N} č.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ovog sata'},
      PAST:'{N,plural,few{pre {N} č.}one{pre {N} č.}other{pre {N} č.}}',
      FUTURE:'{N,plural,few{za {N} č.}one{za {N} č.}other{za {N} č.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ovog minuta'},
      PAST:'{N,plural,few{pre {N} minuta}one{pre {N} minuta}other{pre {N} minuta}}',
      FUTURE:'{N,plural,few{za {N} minuta}one{za {N} minut}other{za {N} minuta}}',
    },
    SHORT:{
      RELATIVE:{'0':'ovog minuta'},
      PAST:'{N,plural,few{pre {N} min.}one{pre {N} min.}other{pre {N} min.}}',
      FUTURE:'{N,plural,few{za {N} min.}one{za {N} min.}other{za {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ovog minuta'},
      PAST:'{N,plural,few{pre {N} min.}one{pre {N} min.}other{pre {N} min.}}',
      FUTURE:'{N,plural,few{za {N} min.}one{za {N} min.}other{za {N} min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'prošlog meseca','0':'ovog meseca','1':'sledećeg meseca'},
      PAST:'{N,plural,few{pre {N} meseca}one{pre {N} meseca}other{pre {N} meseci}}',
      FUTURE:'{N,plural,few{za {N} meseca}one{za {N} mesec}other{za {N} meseci}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošlog mes.','0':'ovog mes.','1':'sledećeg mes.'},
      PAST:'{N,plural,few{pre {N} mes.}one{pre {N} mes.}other{pre {N} mes.}}',
      FUTURE:'{N,plural,few{za {N} mes.}one{za {N} mes.}other{za {N} mes.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošlog m.','0':'ovog m.','1':'sledećeg m.'},
      PAST:'{N,plural,few{pre {N} m.}one{pre {N} m.}other{pre {N} m.}}',
      FUTURE:'{N,plural,few{za {N} m.}one{za {N} m.}other{za {N} m.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'prošlog kvartala','0':'ovog kvartala','1':'sledećeg kvartala'},
      PAST:'{N,plural,few{pre {N} kvartala}one{pre {N} kvartala}other{pre {N} kvartala}}',
      FUTURE:'{N,plural,few{za {N} kvartala}one{za {N} kvartal}other{za {N} kvartala}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošlog kvartala','0':'ovog kvartala','1':'sledećeg kvartala'},
      PAST:'{N,plural,few{pre {N} kv.}one{pre {N} kv.}other{pre {N} kv.}}',
      FUTURE:'{N,plural,few{za {N} kv.}one{za {N} kv.}other{za {N} kv.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošlog kvartala','0':'ovog kvartala','1':'sledećeg kvartala'},
      PAST:'{N,plural,few{pre {N} kv.}one{pre {N} kv.}other{pre {N} kv.}}',
      FUTURE:'{N,plural,few{za {N} kv.}one{za {N} kv.}other{za {N} kv.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'sada'},
      PAST:'{N,plural,few{pre {N} sekunde}one{pre {N} sekunde}other{pre {N} sekundi}}',
      FUTURE:'{N,plural,few{za {N} sekunde}one{za {N} sekundu}other{za {N} sekundi}}',
    },
    SHORT:{
      RELATIVE:{'0':'sada'},
      PAST:'{N,plural,few{pre {N} sek.}one{pre {N} sek.}other{pre {N} sek.}}',
      FUTURE:'{N,plural,few{za {N} sek.}one{za {N} sek.}other{za {N} sek.}}',
    },
    NARROW:{
      RELATIVE:{'0':'sada'},
      PAST:'{N,plural,few{pre {N} s.}one{pre {N} s.}other{pre {N} s.}}',
      FUTURE:'{N,plural,few{za {N} s.}one{za {N} s.}other{za {N} s.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'prošle nedelje','0':'ove nedelje','1':'sledeće nedelje'},
      PAST:'{N,plural,few{pre {N} nedelje}one{pre {N} nedelje}other{pre {N} nedelja}}',
      FUTURE:'{N,plural,few{za {N} nedelje}one{za {N} nedelju}other{za {N} nedelja}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošle ned.','0':'ove ned.','1':'sledeće ned.'},
      PAST:'{N,plural,few{pre {N} ned.}one{pre {N} ned.}other{pre {N} ned.}}',
      FUTURE:'{N,plural,few{za {N} ned.}one{za {N} ned.}other{za {N} ned.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošle n.','0':'ove n.','1':'sledeće n.'},
      PAST:'{N,plural,few{pre {N} n.}one{pre {N} n.}other{pre {N} n.}}',
      FUTURE:'{N,plural,few{za {N} n.}one{za {N} n.}other{za {N} n.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'prošle godine','0':'ove godine','1':'sledeće godine'},
      PAST:'{N,plural,few{pre {N} godine}one{pre {N} godine}other{pre {N} godina}}',
      FUTURE:'{N,plural,few{za {N} godine}one{za {N} godinu}other{za {N} godina}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošle god.','0':'ove god.','1':'sledeće god.'},
      PAST:'{N,plural,few{pre {N} god.}one{pre {N} god.}other{pre {N} god.}}',
      FUTURE:'{N,plural,few{za {N} god.}one{za {N} god.}other{za {N} god.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošle g.','0':'ove g.','1':'sledeće g.'},
      PAST:'{N,plural,few{pre {N} g.}one{pre {N} g.}other{pre {N} g.}}',
      FUTURE:'{N,plural,few{za {N} g.}one{za {N} g.}other{za {N} g.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_si =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'ඊයේ','-2':'පෙරේදා','0':'අද','1':'හෙට','2':'අනිද්දා'},
      PAST:'{N,plural,one{දින {N}කට පෙර}other{දින {N}කට පෙර}}',
      FUTURE:'{N,plural,one{දින {N}න්}other{දින {N}න්}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ඊයේ','-2':'පෙරේදා','0':'අද','1':'හෙට','2':'අනිද්දා'},
      PAST:'{N,plural,one{දින {N}කට පෙර}other{දින {N}කට පෙර}}',
      FUTURE:'{N,plural,one{දින {N}න්}other{දින {N}න්}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ඊයේ','-2':'පෙරේදා','0':'අද','1':'හෙට','2':'අනිද්දා'},
      PAST:'{N,plural,one{දින {N}කට පෙර}other{දින {N}කට පෙර}}',
      FUTURE:'{N,plural,one{දින {N}න්}other{දින {N}න්}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'මෙම පැය'},
      PAST:'{N,plural,one{පැය {N}කට පෙර}other{පැය {N}කට පෙර}}',
      FUTURE:'{N,plural,one{පැය {N}කින්}other{පැය {N}කින්}}',
    },
    SHORT:{
      RELATIVE:{'0':'මෙම පැය'},
      PAST:'{N,plural,one{පැය {N}කට පෙර}other{පැය {N}කට පෙර}}',
      FUTURE:'{N,plural,one{පැය {N}කින්}other{පැය {N}කින්}}',
    },
    NARROW:{
      RELATIVE:{'0':'මෙම පැය'},
      PAST:'{N,plural,one{පැය {N}කට පෙර}other{පැය {N}කට පෙර}}',
      FUTURE:'{N,plural,one{පැය {N}කින්}other{පැය {N}කින්}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'මෙම මිනිත්තුව'},
      PAST:'{N,plural,one{මිනිත්තු {N}කට පෙර}other{මිනිත්තු {N}කට පෙර}}',
      FUTURE:'{N,plural,one{මිනිත්තු {N}කින්}other{මිනිත්තු {N}කින්}}',
    },
    SHORT:{
      RELATIVE:{'0':'මෙම මිනිත්තුව'},
      PAST:'{N,plural,one{මිනිත්තු {N}කට පෙර}other{මිනිත්තු {N}කට පෙර}}',
      FUTURE:'{N,plural,one{මිනිත්තු {N}කින්}other{මිනිත්තු {N}කින්}}',
    },
    NARROW:{
      RELATIVE:{'0':'මෙම මිනිත්තුව'},
      PAST:'{N,plural,one{මිනිත්තු {N}කට පෙර}other{මිනිත්තු {N}කට පෙර}}',
      FUTURE:'{N,plural,one{මිනිත්තු {N}කින්}other{මිනිත්තු {N}කින්}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'පසුගිය මාසය','0':'මෙම මාසය','1':'ඊළඟ මාසය'},
      PAST:'{N,plural,one{මාස {N}කට පෙර}other{මාස {N}කට පෙර}}',
      FUTURE:'{N,plural,one{මාස {N}කින්}other{මාස {N}කින්}}',
    },
    SHORT:{
      RELATIVE:{'-1':'පසුගිය මාස.','0':'මෙම මාස.','1':'ඊළඟ මාස.'},
      PAST:'{N,plural,one{මාස {N}කට පෙර}other{මාස {N}කට පෙර}}',
      FUTURE:'{N,plural,one{මාස {N}කින්}other{මාස {N}කින්}}',
    },
    NARROW:{
      RELATIVE:{'-1':'පසුගිය මාස.','0':'මෙම මාස.','1':'ඊළඟ මාස.'},
      PAST:'{N,plural,one{මාස {N}කට පෙර}other{මාස {N}කට පෙර}}',
      FUTURE:'{N,plural,one{මාස {N}කින්}other{මාස {N}කින්}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'පසුගිය කාර්තුව','0':'මෙම කාර්තුව','1':'ඊළඟ කාර්තුව'},
      PAST:'{N,plural,one{කාර්තු {N}කට පෙර}other{කාර්තු {N}කට පෙර}}',
      FUTURE:'{N,plural,one{කාර්තු {N}කින්}other{කාර්තු {N}කින්}}',
    },
    SHORT:{
      RELATIVE:{'-1':'පසුගිය කාර්.','0':'මෙම කාර්.','1':'ඊළඟ කාර්.'},
      PAST:'{N,plural,one{කාර්. {N}කට පෙර}other{කාර්. {N}කට පෙර}}',
      FUTURE:'{N,plural,one{කාර්. {N}කින්}other{කාර්. {N}කින්}}',
    },
    NARROW:{
      RELATIVE:{'-1':'පසුගිය කාර්.','0':'මෙම කාර්.','1':'ඊළඟ කාර්.'},
      PAST:'{N,plural,one{කාර්. {N}කට පෙර}other{කාර්. {N}කට පෙර}}',
      FUTURE:'{N,plural,one{කාර්. {N}කින්}other{කාර්. {N}කින්}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'දැන්'},
      PAST:'{N,plural,one{තත්පර {N}කට පෙර}other{තත්පර {N}කට පෙර}}',
      FUTURE:'{N,plural,one{තත්පර {N}කින්}other{තත්පර {N}කින්}}',
    },
    SHORT:{
      RELATIVE:{'0':'දැන්'},
      PAST:'{N,plural,one{තත්පර {N}කට පෙර}other{තත්පර {N}කට පෙර}}',
      FUTURE:'{N,plural,one{තත්පර {N}කින්}other{තත්පර {N}කින්}}',
    },
    NARROW:{
      RELATIVE:{'0':'දැන්'},
      PAST:'{N,plural,one{තත්පර {N}කට පෙර}other{තත්පර {N}කට පෙර}}',
      FUTURE:'{N,plural,one{තත්පර {N}කින්}other{තත්පර {N}කින්}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'පසුගිය සතිය','0':'මෙම සතිය','1':'ඊළඟ සතිය'},
      PAST:'{N,plural,one{සති {N}කට පෙර}other{සති {N}කට පෙර}}',
      FUTURE:'{N,plural,one{සති {N}කින්}other{සති {N}කින්}}',
    },
    SHORT:{
      RELATIVE:{'-1':'පසුගිය සති.','0':'මෙම සති.','1':'ඊළඟ සති.'},
      PAST:'{N,plural,one{සති {N}කට පෙර}other{සති {N}කට පෙර}}',
      FUTURE:'{N,plural,one{සති {N}කින්}other{සති {N}කින්}}',
    },
    NARROW:{
      RELATIVE:{'-1':'පසුගිය සති.','0':'මෙම සති.','1':'ඊළඟ සති.'},
      PAST:'{N,plural,one{සති {N}කට පෙර}other{සති {N}කට පෙර}}',
      FUTURE:'{N,plural,one{සති {N}කින්}other{සති {N}කින්}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'පසුගිය වසර','0':'මෙම වසර','1':'ඊළඟ වසර'},
      PAST:'{N,plural,one{වසර {N}කට පෙර}other{වසර {N}කට පෙර}}',
      FUTURE:'{N,plural,one{වසර {N}කින්}other{වසර {N}කින්}}',
    },
    SHORT:{
      RELATIVE:{'-1':'පසුගිය වසර','0':'මෙම වසර','1':'ඊළඟ වසර'},
      PAST:'{N,plural,one{වසර {N}කට පෙර}other{වසර {N}කට පෙර}}',
      FUTURE:'{N,plural,one{වසර {N}කින්}other{වසර {N}කින්}}',
    },
    NARROW:{
      RELATIVE:{'-1':'පසුගිය වසර','0':'මෙම වසර','1':'ඊළඟ වසර'},
      PAST:'{N,plural,one{වසර {N}කට පෙර}other{වසර {N}කට පෙර}}',
      FUTURE:'{N,plural,one{වසර {N}කින්}other{වසර {N}කින්}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_sk =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'včera','-2':'predvčerom','0':'dnes','1':'zajtra','2':'pozajtra'},
      PAST:'{N,plural,few{pred {N} dňami}many{pred {N} dňa}one{pred {N} dňom}other{pred {N} dňami}}',
      FUTURE:'{N,plural,few{o {N} dni}many{o {N} dňa}one{o {N} deň}other{o {N} dní}}',
    },
    SHORT:{
      RELATIVE:{'-1':'včera','-2':'predvčerom','0':'dnes','1':'zajtra','2':'pozajtra'},
      PAST:'{N,plural,few{pred {N} d.}many{pred {N} d.}one{pred {N} d.}other{pred {N} d.}}',
      FUTURE:'{N,plural,few{o {N} d.}many{o {N} d.}one{o {N} d.}other{o {N} d.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'včera','-2':'predvčerom','0':'dnes','1':'zajtra','2':'pozajtra'},
      PAST:'{N,plural,few{pred {N} d.}many{pred {N} d.}one{pred {N} d.}other{pred {N} d.}}',
      FUTURE:'{N,plural,few{o {N} d.}many{o {N} d.}one{o {N} d.}other{o {N} d.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'v tejto hodine'},
      PAST:'{N,plural,few{pred {N} hodinami}many{pred {N} hodinou}one{pred {N} hodinou}other{pred {N} hodinami}}',
      FUTURE:'{N,plural,few{o {N} hodiny}many{o {N} hodiny}one{o {N} hodinu}other{o {N} hodín}}',
    },
    SHORT:{
      RELATIVE:{'0':'v tejto hodine'},
      PAST:'{N,plural,few{pred {N} h}many{pred {N} h}one{pred {N} h}other{pred {N} h}}',
      FUTURE:'{N,plural,few{o {N} h}many{o {N} h}one{o {N} h}other{o {N} h}}',
    },
    NARROW:{
      RELATIVE:{'0':'v tejto hodine'},
      PAST:'{N,plural,few{pred {N} h}many{pred {N} h}one{pred {N} h}other{pred {N} h}}',
      FUTURE:'{N,plural,few{o {N} h}many{o {N} h}one{o {N} h}other{o {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'v tejto minúte'},
      PAST:'{N,plural,few{pred {N} minútami}many{pred {N} minúty}one{pred {N} minútou}other{pred {N} minútami}}',
      FUTURE:'{N,plural,few{o {N} minúty}many{o {N} minúty}one{o {N} minútu}other{o {N} minút}}',
    },
    SHORT:{
      RELATIVE:{'0':'v tejto minúte'},
      PAST:'{N,plural,few{pred {N} min}many{pred {N} min}one{pred {N} min}other{pred {N} min}}',
      FUTURE:'{N,plural,few{o {N} min}many{o {N} min}one{o {N} min}other{o {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'v tejto minúte'},
      PAST:'{N,plural,few{pred {N} min}many{pred {N} min}one{pred {N} min}other{pred {N} min}}',
      FUTURE:'{N,plural,few{o {N} min}many{o {N} min}one{o {N} min}other{o {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'minulý mesiac','0':'tento mesiac','1':'budúci mesiac'},
      PAST:'{N,plural,few{pred {N} mesiacmi}many{pred {N} mesiaca}one{pred {N} mesiacom}other{pred {N} mesiacmi}}',
      FUTURE:'{N,plural,few{o {N} mesiace}many{o {N} mesiaca}one{o {N} mesiac}other{o {N} mesiacov}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minulý mes.','0':'tento mes.','1':'budúci mes.'},
      PAST:'{N,plural,few{pred {N} mes.}many{pred {N} mes.}one{pred {N} mes.}other{pred {N} mes.}}',
      FUTURE:'{N,plural,few{o {N} mes.}many{o {N} mes.}one{o {N} mes.}other{o {N} mes.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minulý mes.','0':'tento mes.','1':'budúci mes.'},
      PAST:'{N,plural,few{pred {N} mes.}many{pred {N} mes.}one{pred {N} mes.}other{pred {N} mes.}}',
      FUTURE:'{N,plural,few{o {N} mes.}many{o {N} mes.}one{o {N} mes.}other{o {N} mes.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'minulý štvrťrok','0':'tento štvrťrok','1':'budúci štvrťrok'},
      PAST:'{N,plural,few{pred {N} štvrťrokmi}many{pred {N} štvrťroka}one{pred {N} štvrťrokom}other{pred {N} štvrťrokmi}}',
      FUTURE:'{N,plural,few{o {N} štvrťroky}many{o {N} štvrťroka}one{o {N} štvrťrok}other{o {N} štvrťrokov}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minulý štvrťr.','0':'tento štvrťr.','1':'budúci štvrťr.'},
      PAST:'{N,plural,few{pred {N} štvrťr.}many{pred {N} štvrťr.}one{pred {N} štvrťr.}other{pred {N} štvrťr.}}',
      FUTURE:'{N,plural,few{o {N} štvrťr.}many{o {N} štvrťr.}one{o {N} štvrťr.}other{o {N} štvrťr.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minulý štvrťr.','0':'tento štvrťr.','1':'budúci štvrťr.'},
      PAST:'{N,plural,few{pred {N} štvrťr.}many{pred {N} štvrťr.}one{pred {N} štvrťr.}other{pred {N} štvrťr.}}',
      FUTURE:'{N,plural,few{o {N} štvrťr.}many{o {N} štvrťr.}one{o {N} štvrťr.}other{o {N} štvrťr.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'teraz'},
      PAST:'{N,plural,few{pred {N} sekundami}many{pred {N} sekundy}one{pred {N} sekundou}other{pred {N} sekundami}}',
      FUTURE:'{N,plural,few{o {N} sekundy}many{o {N} sekundy}one{o {N} sekundu}other{o {N} sekúnd}}',
    },
    SHORT:{
      RELATIVE:{'0':'teraz'},
      PAST:'{N,plural,few{pred {N} s}many{pred {N} s}one{pred {N} s}other{pred {N} s}}',
      FUTURE:'{N,plural,few{o {N} s}many{o {N} s}one{o {N} s}other{o {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'teraz'},
      PAST:'{N,plural,few{pred {N} s}many{pred {N} s}one{pred {N} s}other{pred {N} s}}',
      FUTURE:'{N,plural,few{o {N} s}many{o {N} s}one{o {N} s}other{o {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'minulý týždeň','0':'tento týždeň','1':'budúci týždeň'},
      PAST:'{N,plural,few{pred {N} týždňami}many{pred {N} týždňa}one{pred {N} týždňom}other{pred {N} týždňami}}',
      FUTURE:'{N,plural,few{o {N} týždne}many{o {N} týždňa}one{o {N} týždeň}other{o {N} týždňov}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minulý týž.','0':'tento týž.','1':'budúci týž.'},
      PAST:'{N,plural,few{pred {N} týž.}many{pred {N} týž.}one{pred {N} týž.}other{pred {N} týž.}}',
      FUTURE:'{N,plural,few{o {N} týž.}many{o {N} týž.}one{o {N} týž.}other{o {N} týž.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minulý týž.','0':'tento týž.','1':'budúci týž.'},
      PAST:'{N,plural,few{pred {N} týž.}many{pred {N} týž.}one{pred {N} týž.}other{pred {N} týž.}}',
      FUTURE:'{N,plural,few{o {N} týž.}many{o {N} týž.}one{o {N} týž.}other{o {N} týž.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'minulý rok','0':'tento rok','1':'budúci rok'},
      PAST:'{N,plural,few{pred {N} rokmi}many{pred {N} roka}one{pred {N} rokom}other{pred {N} rokmi}}',
      FUTURE:'{N,plural,few{o {N} roky}many{o {N} roka}one{o {N} rok}other{o {N} rokov}}',
    },
    SHORT:{
      RELATIVE:{'-1':'minulý rok','0':'tento rok','1':'budúci rok'},
      PAST:'{N,plural,few{pred {N} r.}many{pred {N} r.}one{pred {N} r.}other{pred {N} r.}}',
      FUTURE:'{N,plural,few{o {N} r.}many{o {N} r.}one{o {N} r.}other{o {N} r.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'minulý rok','0':'tento rok','1':'budúci rok'},
      PAST:'{N,plural,few{pred {N} r.}many{pred {N} r.}one{pred {N} r.}other{pred {N} r.}}',
      FUTURE:'{N,plural,few{o {N} r.}many{o {N} r.}one{o {N} r.}other{o {N} r.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_sl =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'včeraj','-2':'predvčerajšnjim','0':'danes','1':'jutri','2':'pojutrišnjem'},
      PAST:'{N,plural,few{pred {N} dnevi}one{pred {N} dnevom}other{pred {N} dnevi}two{pred {N} dnevoma}}',
      FUTURE:'{N,plural,few{čez {N} dni}one{čez {N} dan}other{čez {N} dni}two{čez {N} dneva}}',
    },
    SHORT:{
      RELATIVE:{'-1':'včeraj','-2':'predvčerajšnjim','0':'danes','1':'jutri','2':'pojutrišnjem'},
      PAST:'{N,plural,few{pred {N} dnevi}one{pred {N} dnevom}other{pred {N} dnevi}two{pred {N} dnevoma}}',
      FUTURE:'{N,plural,few{čez {N} dni}one{čez {N} dan}other{čez {N} dni}two{čez {N} dneva}}',
    },
    NARROW:{
      RELATIVE:{'-1':'včeraj','-2':'predvčerajšnjim','0':'danes','1':'jutri','2':'pojutrišnjem'},
      PAST:'{N,plural,few{pred {N} dnevi}one{pred {N} dnevom}other{pred {N} dnevi}two{pred {N} dnevoma}}',
      FUTURE:'{N,plural,few{čez {N} dni}one{čez {N} dan}other{čez {N} dni}two{čez {N} dneva}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'v tej uri'},
      PAST:'{N,plural,few{pred {N} urami}one{pred {N} uro}other{pred {N} urami}two{pred {N} urama}}',
      FUTURE:'{N,plural,few{čez {N} ure}one{čez {N} uro}other{čez {N} ur}two{čez {N} uri}}',
    },
    SHORT:{
      RELATIVE:{'0':'v tej uri'},
      PAST:'{N,plural,few{pred {N} urami}one{pred {N} uro}other{pred {N} urami}two{pred {N} urama}}',
      FUTURE:'{N,plural,few{čez {N} ure}one{čez {N} uro}other{čez {N} ur}two{čez {N} uri}}',
    },
    NARROW:{
      RELATIVE:{'0':'v tej uri'},
      PAST:'{N,plural,few{pred {N} h}one{pred {N} h}other{pred {N} h}two{pred {N} h}}',
      FUTURE:'{N,plural,few{čez {N} h}one{čez {N} h}other{čez {N} h}two{čez {N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'to minuto'},
      PAST:'{N,plural,few{pred {N} minutami}one{pred {N} minuto}other{pred {N} minutami}two{pred {N} minutama}}',
      FUTURE:'{N,plural,few{čez {N} minute}one{čez {N} minuto}other{čez {N} minut}two{čez {N} minuti}}',
    },
    SHORT:{
      RELATIVE:{'0':'to minuto'},
      PAST:'{N,plural,few{pred {N} min.}one{pred {N} min.}other{pred {N} min.}two{pred {N} min.}}',
      FUTURE:'{N,plural,few{čez {N} min.}one{čez {N} min.}other{čez {N} min.}two{čez {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'to minuto'},
      PAST:'{N,plural,few{pred {N} min}one{pred {N} min}other{pred {N} min}two{pred {N} min}}',
      FUTURE:'{N,plural,few{čez {N} min}one{čez {N} min}other{čez {N} min}two{čez {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'prejšnji mesec','0':'ta mesec','1':'naslednji mesec'},
      PAST:'{N,plural,few{pred {N} meseci}one{pred {N} mesecem}other{pred {N} meseci}two{pred {N} mesecema}}',
      FUTURE:'{N,plural,few{čez {N} mesece}one{čez {N} mesec}other{čez {N} mesecev}two{čez {N} meseca}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prejšnji mesec','0':'ta mesec','1':'naslednji mesec'},
      PAST:'{N,plural,few{pred {N} mes.}one{pred {N} mes.}other{pred {N} mes.}two{pred {N} mes.}}',
      FUTURE:'{N,plural,few{čez {N} mes.}one{čez {N} mes.}other{čez {N} mes.}two{čez {N} mes.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prejšnji mesec','0':'ta mesec','1':'naslednji mesec'},
      PAST:'{N,plural,few{pred {N} mes.}one{pred {N} mes.}other{pred {N} mes.}two{pred {N} mes.}}',
      FUTURE:'{N,plural,few{čez {N} mes.}one{čez {N} mes.}other{čez {N} mes.}two{čez {N} mes.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'zadnje četrtletje','0':'to četrtletje','1':'naslednje četrtletje'},
      PAST:'{N,plural,few{pred {N} četrtletji}one{pred {N} četrtletjem}other{pred {N} četrtletji}two{pred {N} četrtletjema}}',
      FUTURE:'{N,plural,few{čez {N} četrtletja}one{čez {N} četrtletje}other{čez {N} četrtletij}two{čez {N} četrtletji}}',
    },
    SHORT:{
      RELATIVE:{'-1':'zadnje četrtletje','0':'to četrtletje','1':'naslednje četrtletje'},
      PAST:'{N,plural,few{pred {N} četrtl.}one{pred {N} četrtl.}other{pred {N} četrtl.}two{pred {N} četrtl.}}',
      FUTURE:'{N,plural,few{čez {N} četrtl.}one{čez {N} četrtl.}other{čez {N} četrtl.}two{čez {N} četrtl.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'zadnje četrtletje','0':'to četrtletje','1':'naslednje četrtletje'},
      PAST:'{N,plural,few{pred {N} četr.}one{pred {N} četr.}other{pred {N} četr.}two{pred {N} četr.}}',
      FUTURE:'{N,plural,few{čez {N} četr.}one{čez {N} četr.}other{čez {N} četr.}two{čez {N} četr.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'zdaj'},
      PAST:'{N,plural,few{pred {N} sekundami}one{pred {N} sekundo}other{pred {N} sekundami}two{pred {N} sekundama}}',
      FUTURE:'{N,plural,few{čez {N} sekunde}one{čez {N} sekundo}other{čez {N} sekund}two{čez {N} sekundi}}',
    },
    SHORT:{
      RELATIVE:{'0':'zdaj'},
      PAST:'{N,plural,few{pred {N} s}one{pred {N} s}other{pred {N} s}two{pred {N} s}}',
      FUTURE:'{N,plural,few{čez {N} s}one{čez {N} s}other{čez {N} s}two{čez {N} s}}',
    },
    NARROW:{
      RELATIVE:{'0':'zdaj'},
      PAST:'{N,plural,few{pred {N} s}one{pred {N} s}other{pred {N} s}two{pred {N} s}}',
      FUTURE:'{N,plural,few{čez {N} s}one{čez {N} s}other{čez {N} s}two{čez {N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'prejšnji teden','0':'ta teden','1':'naslednji teden'},
      PAST:'{N,plural,few{pred {N} tedni}one{pred {N} tednom}other{pred {N} tedni}two{pred {N} tednoma}}',
      FUTURE:'{N,plural,few{čez {N} tedne}one{čez {N} teden}other{čez {N} tednov}two{čez {N} tedna}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prejšnji teden','0':'ta teden','1':'naslednji teden'},
      PAST:'{N,plural,few{pred {N} ted.}one{pred {N} ted.}other{pred {N} ted.}two{pred {N} ted.}}',
      FUTURE:'{N,plural,few{čez {N} ted.}one{čez {N} ted.}other{čez {N} ted.}two{čez {N} ted.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prejšnji teden','0':'ta teden','1':'naslednji teden'},
      PAST:'{N,plural,few{pred {N} ted.}one{pred {N} ted.}other{pred {N} ted.}two{pred {N} ted.}}',
      FUTURE:'{N,plural,few{čez {N} ted.}one{čez {N} ted.}other{čez {N} ted.}two{čez {N} ted.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'lani','0':'letos','1':'naslednje leto'},
      PAST:'{N,plural,few{pred {N} leti}one{pred {N} letom}other{pred {N} leti}two{pred {N} letoma}}',
      FUTURE:'{N,plural,few{čez {N} leta}one{čez {N} leto}other{čez {N} let}two{čez {N} leti}}',
    },
    SHORT:{
      RELATIVE:{'-1':'lani','0':'letos','1':'naslednje leto'},
      PAST:'{N,plural,few{pred {N} leti}one{pred {N} letom}other{pred {N} leti}two{pred {N} letoma}}',
      FUTURE:'{N,plural,few{čez {N} leta}one{čez {N} leto}other{čez {N} let}two{čez {N} leti}}',
    },
    NARROW:{
      RELATIVE:{'-1':'lani','0':'letos','1':'naslednje leto'},
      PAST:'{N,plural,few{pred {N} leti}one{pred {N} letom}other{pred {N} leti}two{pred {N} letoma}}',
      FUTURE:'{N,plural,few{čez {N} leta}one{čez {N} leto}other{čez {N} let}two{čez {N} leti}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_sq =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'dje','0':'sot','1':'nesër'},
      PAST:'{N,plural,one{{N} ditë më parë}other{{N} ditë më parë}}',
      FUTURE:'{N,plural,one{pas {N} dite}other{pas {N} ditësh}}',
    },
    SHORT:{
      RELATIVE:{'-1':'dje','0':'sot','1':'nesër'},
      PAST:'{N,plural,one{{N} ditë më parë}other{{N} ditë më parë}}',
      FUTURE:'{N,plural,one{pas {N} dite}other{pas {N} ditësh}}',
    },
    NARROW:{
      RELATIVE:{'-1':'dje','0':'sot','1':'nesër'},
      PAST:'{N,plural,one{{N} ditë më parë}other{{N} ditë më parë}}',
      FUTURE:'{N,plural,one{pas {N} dite}other{pas {N} ditësh}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'këtë orë'},
      PAST:'{N,plural,one{{N} orë më parë}other{{N} orë më parë}}',
      FUTURE:'{N,plural,one{pas {N} ore}other{pas {N} orësh}}',
    },
    SHORT:{
      RELATIVE:{'0':'këtë orë'},
      PAST:'{N,plural,one{{N} orë më parë}other{{N} orë më parë}}',
      FUTURE:'{N,plural,one{pas {N} ore}other{pas {N} orësh}}',
    },
    NARROW:{
      RELATIVE:{'0':'këtë orë'},
      PAST:'{N,plural,one{{N} orë më parë}other{{N} orë më parë}}',
      FUTURE:'{N,plural,one{pas {N} ore}other{pas {N} orësh}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'këtë minutë'},
      PAST:'{N,plural,one{{N} minutë më parë}other{{N} minuta më parë}}',
      FUTURE:'{N,plural,one{pas {N} minute}other{pas {N} minutash}}',
    },
    SHORT:{
      RELATIVE:{'0':'këtë minutë'},
      PAST:'{N,plural,one{{N} min më parë}other{{N} min më parë}}',
      FUTURE:'{N,plural,one{pas {N} min}other{pas {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'këtë minutë'},
      PAST:'{N,plural,one{{N} min më parë}other{{N} min më parë}}',
      FUTURE:'{N,plural,one{pas {N} min}other{pas {N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'muajin e kaluar','0':'këtë muaj','1':'muajin e ardhshëm'},
      PAST:'{N,plural,one{{N} muaj më parë}other{{N} muaj më parë}}',
      FUTURE:'{N,plural,one{pas {N} muaji}other{pas {N} muajsh}}',
    },
    SHORT:{
      RELATIVE:{'-1':'muajin e kaluar','0':'këtë muaj','1':'muajin e ardhshëm'},
      PAST:'{N,plural,one{{N} muaj më parë}other{{N} muaj më parë}}',
      FUTURE:'{N,plural,one{pas {N} muaji}other{pas {N} muajsh}}',
    },
    NARROW:{
      RELATIVE:{'-1':'muajin e kaluar','0':'këtë muaj','1':'muajin e ardhshëm'},
      PAST:'{N,plural,one{{N} muaj më parë}other{{N} muaj më parë}}',
      FUTURE:'{N,plural,one{pas {N} muaji}other{pas {N} muajsh}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'tremujorin e kaluar','0':'këtë tremujor','1':'tremujorin e ardhshëm'},
      PAST:'{N,plural,one{{N} tremujor më parë}other{{N} tremujorë më parë}}',
      FUTURE:'{N,plural,one{pas {N} tremujori}other{pas {N} tremujorësh}}',
    },
    SHORT:{
      RELATIVE:{'-1':'tremujorin e kaluar','0':'këtë tremujor','1':'tremujorin e ardhshëm'},
      PAST:'{N,plural,one{{N} tremujor më parë}other{{N} tremujorë më parë}}',
      FUTURE:'{N,plural,one{pas {N} tremujori}other{pas {N} tremujorësh}}',
    },
    NARROW:{
      RELATIVE:{'-1':'tremujorin e kaluar','0':'këtë tremujor','1':'tremujorin e ardhshëm'},
      PAST:'{N,plural,one{{N} tremujor më parë}other{{N} tremujorë më parë}}',
      FUTURE:'{N,plural,one{pas {N} tremujori}other{pas {N} tremujorësh}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'tani'},
      PAST:'{N,plural,one{{N} sekondë më parë}other{{N} sekonda më parë}}',
      FUTURE:'{N,plural,one{pas {N} sekonde}other{pas {N} sekondash}}',
    },
    SHORT:{
      RELATIVE:{'0':'tani'},
      PAST:'{N,plural,one{{N} sek më parë}other{{N} sek më parë}}',
      FUTURE:'{N,plural,one{pas {N} sek}other{pas {N} sek}}',
    },
    NARROW:{
      RELATIVE:{'0':'tani'},
      PAST:'{N,plural,one{{N} sek më parë}other{{N} sek më parë}}',
      FUTURE:'{N,plural,one{pas {N} sek}other{pas {N} sek}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'javën e kaluar','0':'këtë javë','1':'javën e ardhshme'},
      PAST:'{N,plural,one{{N} javë më parë}other{{N} javë më parë}}',
      FUTURE:'{N,plural,one{pas {N} jave}other{pas {N} javësh}}',
    },
    SHORT:{
      RELATIVE:{'-1':'javën e kaluar','0':'këtë javë','1':'javën e ardhshme'},
      PAST:'{N,plural,one{{N} javë më parë}other{{N} javë më parë}}',
      FUTURE:'{N,plural,one{pas {N} jave}other{pas {N} javësh}}',
    },
    NARROW:{
      RELATIVE:{'-1':'javën e kaluar','0':'këtë javë','1':'javën e ardhshme'},
      PAST:'{N,plural,one{{N} javë më parë}other{{N} javë më parë}}',
      FUTURE:'{N,plural,one{pas {N} jave}other{pas {N} javësh}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'vjet','0':'sivjet','1':'mot'},
      PAST:'{N,plural,one{{N} vit më parë}other{{N} vjet më parë}}',
      FUTURE:'{N,plural,one{pas {N} viti}other{pas {N} vjetësh}}',
    },
    SHORT:{
      RELATIVE:{'-1':'vitin e kaluar','0':'këtë vit','1':'vitin e ardhshëm'},
      PAST:'{N,plural,one{{N} vit më parë}other{{N} vjet më parë}}',
      FUTURE:'{N,plural,one{pas {N} viti}other{pas {N} vjetësh}}',
    },
    NARROW:{
      RELATIVE:{'-1':'vitin e kaluar','0':'këtë vit','1':'vitin e ardhshëm'},
      PAST:'{N,plural,one{{N} vit më parë}other{{N} vjet më parë}}',
      FUTURE:'{N,plural,one{pas {N} viti}other{pas {N} vjetësh}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_sr =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'јуче','-2':'прекјуче','0':'данас','1':'сутра','2':'прекосутра'},
      PAST:'{N,plural,few{пре {N} дана}one{пре {N} дана}other{пре {N} дана}}',
      FUTURE:'{N,plural,few{за {N} дана}one{за {N} дан}other{за {N} дана}}',
    },
    SHORT:{
      RELATIVE:{'-1':'јуче','-2':'прекјуче','0':'данас','1':'сутра','2':'прекосутра'},
      PAST:'{N,plural,few{пре {N} д.}one{пре {N} д.}other{пре {N} д.}}',
      FUTURE:'{N,plural,few{за {N} д.}one{за {N} д.}other{за {N} д.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'јуче','-2':'прекјуче','0':'данас','1':'сутра','2':'прекосутра'},
      PAST:'{N,plural,few{пре {N} д.}one{пре {N} д.}other{пре {N} д.}}',
      FUTURE:'{N,plural,few{за {N} д.}one{за {N} д.}other{за {N} д.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'овог сата'},
      PAST:'{N,plural,few{пре {N} сата}one{пре {N} сата}other{пре {N} сати}}',
      FUTURE:'{N,plural,few{за {N} сата}one{за {N} сат}other{за {N} сати}}',
    },
    SHORT:{
      RELATIVE:{'0':'овог сата'},
      PAST:'{N,plural,few{пре {N} ч.}one{пре {N} ч.}other{пре {N} ч.}}',
      FUTURE:'{N,plural,few{за {N} ч.}one{за {N} ч.}other{за {N} ч.}}',
    },
    NARROW:{
      RELATIVE:{'0':'овог сата'},
      PAST:'{N,plural,few{пре {N} ч.}one{пре {N} ч.}other{пре {N} ч.}}',
      FUTURE:'{N,plural,few{за {N} ч.}one{за {N} ч.}other{за {N} ч.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'овог минута'},
      PAST:'{N,plural,few{пре {N} минута}one{пре {N} минута}other{пре {N} минута}}',
      FUTURE:'{N,plural,few{за {N} минута}one{за {N} минут}other{за {N} минута}}',
    },
    SHORT:{
      RELATIVE:{'0':'овог минута'},
      PAST:'{N,plural,few{пре {N} мин.}one{пре {N} мин.}other{пре {N} мин.}}',
      FUTURE:'{N,plural,few{за {N} мин.}one{за {N} мин.}other{за {N} мин.}}',
    },
    NARROW:{
      RELATIVE:{'0':'овог минута'},
      PAST:'{N,plural,few{пре {N} мин.}one{пре {N} мин.}other{пре {N} мин.}}',
      FUTURE:'{N,plural,few{за {N} мин.}one{за {N} мин.}other{за {N} мин.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'прошлог месеца','0':'овог месеца','1':'следећег месеца'},
      PAST:'{N,plural,few{пре {N} месеца}one{пре {N} месеца}other{пре {N} месеци}}',
      FUTURE:'{N,plural,few{за {N} месеца}one{за {N} месец}other{за {N} месеци}}',
    },
    SHORT:{
      RELATIVE:{'-1':'прошлог мес.','0':'овог мес.','1':'следећег мес.'},
      PAST:'{N,plural,few{пре {N} мес.}one{пре {N} мес.}other{пре {N} мес.}}',
      FUTURE:'{N,plural,few{за {N} мес.}one{за {N} мес.}other{за {N} мес.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'прошлог м.','0':'овог м.','1':'следећег м.'},
      PAST:'{N,plural,few{пре {N} м.}one{пре {N} м.}other{пре {N} м.}}',
      FUTURE:'{N,plural,few{за {N} м.}one{за {N} м.}other{за {N} м.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'прошлог квартала','0':'овог квартала','1':'следећег квартала'},
      PAST:'{N,plural,few{пре {N} квартала}one{пре {N} квартала}other{пре {N} квартала}}',
      FUTURE:'{N,plural,few{за {N} квартала}one{за {N} квартал}other{за {N} квартала}}',
    },
    SHORT:{
      RELATIVE:{'-1':'прошлог квартала','0':'овог квартала','1':'следећег квартала'},
      PAST:'{N,plural,few{пре {N} кв.}one{пре {N} кв.}other{пре {N} кв.}}',
      FUTURE:'{N,plural,few{за {N} кв.}one{за {N} кв.}other{за {N} кв.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'прошлог квартала','0':'овог квартала','1':'следећег квартала'},
      PAST:'{N,plural,few{пре {N} кв.}one{пре {N} кв.}other{пре {N} кв.}}',
      FUTURE:'{N,plural,few{за {N} кв.}one{за {N} кв.}other{за {N} кв.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'сада'},
      PAST:'{N,plural,few{пре {N} секунде}one{пре {N} секунде}other{пре {N} секунди}}',
      FUTURE:'{N,plural,few{за {N} секунде}one{за {N} секунду}other{за {N} секунди}}',
    },
    SHORT:{
      RELATIVE:{'0':'сада'},
      PAST:'{N,plural,few{пре {N} сек.}one{пре {N} сек.}other{пре {N} сек.}}',
      FUTURE:'{N,plural,few{за {N} сек.}one{за {N} сек.}other{за {N} сек.}}',
    },
    NARROW:{
      RELATIVE:{'0':'сада'},
      PAST:'{N,plural,few{пре {N} с.}one{пре {N} с.}other{пре {N} с.}}',
      FUTURE:'{N,plural,few{за {N} с.}one{за {N} с.}other{за {N} с.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'прошле недеље','0':'ове недеље','1':'следеће недеље'},
      PAST:'{N,plural,few{пре {N} недеље}one{пре {N} недеље}other{пре {N} недеља}}',
      FUTURE:'{N,plural,few{за {N} недеље}one{за {N} недељу}other{за {N} недеља}}',
    },
    SHORT:{
      RELATIVE:{'-1':'прошле нед.','0':'ове нед.','1':'следеће нед.'},
      PAST:'{N,plural,few{пре {N} нед.}one{пре {N} нед.}other{пре {N} нед.}}',
      FUTURE:'{N,plural,few{за {N} нед.}one{за {N} нед.}other{за {N} нед.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'прошле н.','0':'ове н.','1':'следеће н.'},
      PAST:'{N,plural,few{пре {N} н.}one{пре {N} н.}other{пре {N} н.}}',
      FUTURE:'{N,plural,few{за {N} н.}one{за {N} н.}other{за {N} н.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'прошле године','0':'ове године','1':'следеће године'},
      PAST:'{N,plural,few{пре {N} године}one{пре {N} године}other{пре {N} година}}',
      FUTURE:'{N,plural,few{за {N} године}one{за {N} годину}other{за {N} година}}',
    },
    SHORT:{
      RELATIVE:{'-1':'прошле год.','0':'ове год.','1':'следеће год.'},
      PAST:'{N,plural,few{пре {N} год.}one{пре {N} год.}other{пре {N} год.}}',
      FUTURE:'{N,plural,few{за {N} год.}one{за {N} год.}other{за {N} год.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'прошле г.','0':'ове г.','1':'следеће г.'},
      PAST:'{N,plural,few{пре {N} г.}one{пре {N} г.}other{пре {N} г.}}',
      FUTURE:'{N,plural,few{за {N} г.}one{за {N} г.}other{за {N} г.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_sr_Latn =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'juče','-2':'prekjuče','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{pre {N} dana}one{pre {N} dana}other{pre {N} dana}}',
      FUTURE:'{N,plural,few{za {N} dana}one{za {N} dan}other{za {N} dana}}',
    },
    SHORT:{
      RELATIVE:{'-1':'juče','-2':'prekjuče','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{pre {N} d.}one{pre {N} d.}other{pre {N} d.}}',
      FUTURE:'{N,plural,few{za {N} d.}one{za {N} d.}other{za {N} d.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'juče','-2':'prekjuče','0':'danas','1':'sutra','2':'prekosutra'},
      PAST:'{N,plural,few{pre {N} d.}one{pre {N} d.}other{pre {N} d.}}',
      FUTURE:'{N,plural,few{za {N} d.}one{za {N} d.}other{za {N} d.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ovog sata'},
      PAST:'{N,plural,few{pre {N} sata}one{pre {N} sata}other{pre {N} sati}}',
      FUTURE:'{N,plural,few{za {N} sata}one{za {N} sat}other{za {N} sati}}',
    },
    SHORT:{
      RELATIVE:{'0':'ovog sata'},
      PAST:'{N,plural,few{pre {N} č.}one{pre {N} č.}other{pre {N} č.}}',
      FUTURE:'{N,plural,few{za {N} č.}one{za {N} č.}other{za {N} č.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ovog sata'},
      PAST:'{N,plural,few{pre {N} č.}one{pre {N} č.}other{pre {N} č.}}',
      FUTURE:'{N,plural,few{za {N} č.}one{za {N} č.}other{za {N} č.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ovog minuta'},
      PAST:'{N,plural,few{pre {N} minuta}one{pre {N} minuta}other{pre {N} minuta}}',
      FUTURE:'{N,plural,few{za {N} minuta}one{za {N} minut}other{za {N} minuta}}',
    },
    SHORT:{
      RELATIVE:{'0':'ovog minuta'},
      PAST:'{N,plural,few{pre {N} min.}one{pre {N} min.}other{pre {N} min.}}',
      FUTURE:'{N,plural,few{za {N} min.}one{za {N} min.}other{za {N} min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ovog minuta'},
      PAST:'{N,plural,few{pre {N} min.}one{pre {N} min.}other{pre {N} min.}}',
      FUTURE:'{N,plural,few{za {N} min.}one{za {N} min.}other{za {N} min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'prošlog meseca','0':'ovog meseca','1':'sledećeg meseca'},
      PAST:'{N,plural,few{pre {N} meseca}one{pre {N} meseca}other{pre {N} meseci}}',
      FUTURE:'{N,plural,few{za {N} meseca}one{za {N} mesec}other{za {N} meseci}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošlog mes.','0':'ovog mes.','1':'sledećeg mes.'},
      PAST:'{N,plural,few{pre {N} mes.}one{pre {N} mes.}other{pre {N} mes.}}',
      FUTURE:'{N,plural,few{za {N} mes.}one{za {N} mes.}other{za {N} mes.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošlog m.','0':'ovog m.','1':'sledećeg m.'},
      PAST:'{N,plural,few{pre {N} m.}one{pre {N} m.}other{pre {N} m.}}',
      FUTURE:'{N,plural,few{za {N} m.}one{za {N} m.}other{za {N} m.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'prošlog kvartala','0':'ovog kvartala','1':'sledećeg kvartala'},
      PAST:'{N,plural,few{pre {N} kvartala}one{pre {N} kvartala}other{pre {N} kvartala}}',
      FUTURE:'{N,plural,few{za {N} kvartala}one{za {N} kvartal}other{za {N} kvartala}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošlog kvartala','0':'ovog kvartala','1':'sledećeg kvartala'},
      PAST:'{N,plural,few{pre {N} kv.}one{pre {N} kv.}other{pre {N} kv.}}',
      FUTURE:'{N,plural,few{za {N} kv.}one{za {N} kv.}other{za {N} kv.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošlog kvartala','0':'ovog kvartala','1':'sledećeg kvartala'},
      PAST:'{N,plural,few{pre {N} kv.}one{pre {N} kv.}other{pre {N} kv.}}',
      FUTURE:'{N,plural,few{za {N} kv.}one{za {N} kv.}other{za {N} kv.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'sada'},
      PAST:'{N,plural,few{pre {N} sekunde}one{pre {N} sekunde}other{pre {N} sekundi}}',
      FUTURE:'{N,plural,few{za {N} sekunde}one{za {N} sekundu}other{za {N} sekundi}}',
    },
    SHORT:{
      RELATIVE:{'0':'sada'},
      PAST:'{N,plural,few{pre {N} sek.}one{pre {N} sek.}other{pre {N} sek.}}',
      FUTURE:'{N,plural,few{za {N} sek.}one{za {N} sek.}other{za {N} sek.}}',
    },
    NARROW:{
      RELATIVE:{'0':'sada'},
      PAST:'{N,plural,few{pre {N} s.}one{pre {N} s.}other{pre {N} s.}}',
      FUTURE:'{N,plural,few{za {N} s.}one{za {N} s.}other{za {N} s.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'prošle nedelje','0':'ove nedelje','1':'sledeće nedelje'},
      PAST:'{N,plural,few{pre {N} nedelje}one{pre {N} nedelje}other{pre {N} nedelja}}',
      FUTURE:'{N,plural,few{za {N} nedelje}one{za {N} nedelju}other{za {N} nedelja}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošle ned.','0':'ove ned.','1':'sledeće ned.'},
      PAST:'{N,plural,few{pre {N} ned.}one{pre {N} ned.}other{pre {N} ned.}}',
      FUTURE:'{N,plural,few{za {N} ned.}one{za {N} ned.}other{za {N} ned.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošle n.','0':'ove n.','1':'sledeće n.'},
      PAST:'{N,plural,few{pre {N} n.}one{pre {N} n.}other{pre {N} n.}}',
      FUTURE:'{N,plural,few{za {N} n.}one{za {N} n.}other{za {N} n.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'prošle godine','0':'ove godine','1':'sledeće godine'},
      PAST:'{N,plural,few{pre {N} godine}one{pre {N} godine}other{pre {N} godina}}',
      FUTURE:'{N,plural,few{za {N} godine}one{za {N} godinu}other{za {N} godina}}',
    },
    SHORT:{
      RELATIVE:{'-1':'prošle god.','0':'ove god.','1':'sledeće god.'},
      PAST:'{N,plural,few{pre {N} god.}one{pre {N} god.}other{pre {N} god.}}',
      FUTURE:'{N,plural,few{za {N} god.}one{za {N} god.}other{za {N} god.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'prošle g.','0':'ove g.','1':'sledeće g.'},
      PAST:'{N,plural,few{pre {N} g.}one{pre {N} g.}other{pre {N} g.}}',
      FUTURE:'{N,plural,few{za {N} g.}one{za {N} g.}other{za {N} g.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_sv =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'i går','-2':'i förrgår','0':'i dag','1':'i morgon','2':'i övermorgon'},
      PAST:'{N,plural,one{för {N} dag sedan}other{för {N} dagar sedan}}',
      FUTURE:'{N,plural,one{om {N} dag}other{om {N} dagar}}',
    },
    SHORT:{
      RELATIVE:{'-1':'i går','-2':'i förrgår','0':'i dag','1':'i morgon','2':'i övermorgon'},
      PAST:'{N,plural,one{för {N} d sedan}other{för {N} d sedan}}',
      FUTURE:'{N,plural,one{om {N} d}other{om {N} d}}',
    },
    NARROW:{
      RELATIVE:{'-1':'igår','-2':'i förrgår','0':'idag','1':'imorgon','2':'i övermorgon'},
      PAST:'{N,plural,one{−{N} d}other{−{N} d}}',
      FUTURE:'{N,plural,one{+{N} d}other{+{N} d}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'denna timme'},
      PAST:'{N,plural,one{för {N} timme sedan}other{för {N} timmar sedan}}',
      FUTURE:'{N,plural,one{om {N} timme}other{om {N} timmar}}',
    },
    SHORT:{
      RELATIVE:{'0':'denna timme'},
      PAST:'{N,plural,one{för {N} tim sedan}other{för {N} tim sedan}}',
      FUTURE:'{N,plural,one{om {N} tim}other{om {N} tim}}',
    },
    NARROW:{
      RELATIVE:{'0':'denna timme'},
      PAST:'{N,plural,one{−{N} h}other{−{N} h}}',
      FUTURE:'{N,plural,one{+{N} h}other{+{N} h}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'denna minut'},
      PAST:'{N,plural,one{för {N} minut sedan}other{för {N} minuter sedan}}',
      FUTURE:'{N,plural,one{om {N} minut}other{om {N} minuter}}',
    },
    SHORT:{
      RELATIVE:{'0':'denna minut'},
      PAST:'{N,plural,one{för {N} min sen}other{för {N} min sen}}',
      FUTURE:'{N,plural,one{om {N} min}other{om {N} min}}',
    },
    NARROW:{
      RELATIVE:{'0':'denna minut'},
      PAST:'{N,plural,one{−{N} min}other{−{N} min}}',
      FUTURE:'{N,plural,one{+{N} min}other{+{N} min}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'förra månaden','0':'denna månad','1':'nästa månad'},
      PAST:'{N,plural,one{för {N} månad sedan}other{för {N} månader sedan}}',
      FUTURE:'{N,plural,one{om {N} månad}other{om {N} månader}}',
    },
    SHORT:{
      RELATIVE:{'-1':'förra mån.','0':'denna mån.','1':'nästa mån.'},
      PAST:'{N,plural,one{för {N} mån. sen}other{för {N} mån. sen}}',
      FUTURE:'{N,plural,one{om {N} mån.}other{om {N} mån.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'förra mån.','0':'denna mån.','1':'nästa mån.'},
      PAST:'{N,plural,one{−{N} mån}other{−{N} mån}}',
      FUTURE:'{N,plural,one{+{N} mån.}other{+{N} mån.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'förra kvartalet','0':'detta kvartal','1':'nästa kvartal'},
      PAST:'{N,plural,one{för {N} kvartal sedan}other{för {N} kvartal sedan}}',
      FUTURE:'{N,plural,one{om {N} kvartal}other{om {N} kvartal}}',
    },
    SHORT:{
      RELATIVE:{'-1':'förra kv.','0':'detta kv.','1':'nästa kv.'},
      PAST:'{N,plural,one{för {N} kv. sen}other{för {N} kv. sen}}',
      FUTURE:'{N,plural,one{om {N} kv.}other{om {N} kv.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'förra kv.','0':'detta kv.','1':'nästa kv.'},
      PAST:'{N,plural,one{−{N} kv}other{−{N} kv}}',
      FUTURE:'{N,plural,one{+{N} kv.}other{+{N} kv.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'nu'},
      PAST:'{N,plural,one{för {N} sekund sedan}other{för {N} sekunder sedan}}',
      FUTURE:'{N,plural,one{om {N} sekund}other{om {N} sekunder}}',
    },
    SHORT:{
      RELATIVE:{'0':'nu'},
      PAST:'{N,plural,one{för {N} s sen}other{för {N} s sen}}',
      FUTURE:'{N,plural,one{om {N} sek}other{om {N} sek}}',
    },
    NARROW:{
      RELATIVE:{'0':'nu'},
      PAST:'{N,plural,one{−{N} s}other{−{N} s}}',
      FUTURE:'{N,plural,one{+{N} s}other{+{N} s}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'förra veckan','0':'denna vecka','1':'nästa vecka'},
      PAST:'{N,plural,one{för {N} vecka sedan}other{för {N} veckor sedan}}',
      FUTURE:'{N,plural,one{om {N} vecka}other{om {N} veckor}}',
    },
    SHORT:{
      RELATIVE:{'-1':'förra v.','0':'denna v.','1':'nästa v.'},
      PAST:'{N,plural,one{för {N} v. sedan}other{för {N} v. sedan}}',
      FUTURE:'{N,plural,one{om {N} v.}other{om {N} v.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'förra v.','0':'denna v.','1':'nästa v.'},
      PAST:'{N,plural,one{−{N} v}other{−{N} v}}',
      FUTURE:'{N,plural,one{+{N} v.}other{+{N} v.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'i fjol','0':'i år','1':'nästa år'},
      PAST:'{N,plural,one{för {N} år sedan}other{för {N} år sedan}}',
      FUTURE:'{N,plural,one{om {N} år}other{om {N} år}}',
    },
    SHORT:{
      RELATIVE:{'-1':'i fjol','0':'i år','1':'nästa år'},
      PAST:'{N,plural,one{för {N} år sen}other{för {N} år sen}}',
      FUTURE:'{N,plural,one{om {N} år}other{om {N} år}}',
    },
    NARROW:{
      RELATIVE:{'-1':'i fjol','0':'i år','1':'nästa år'},
      PAST:'{N,plural,one{−{N} år}other{−{N} år}}',
      FUTURE:'{N,plural,one{+{N} år}other{+{N} år}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_sw =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'jana','-2':'juzi','0':'leo','1':'kesho','2':'kesho kutwa'},
      PAST:'{N,plural,one{siku {N} iliyopita}other{siku {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya siku {N}}other{baada ya siku {N}}}',
    },
    SHORT:{
      RELATIVE:{'-1':'jana','-2':'juzi','0':'leo','1':'kesho','2':'kesho kutwa'},
      PAST:'{N,plural,one{siku {N} iliyopita}other{siku {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya siku {N}}other{baada ya siku {N}}}',
    },
    NARROW:{
      RELATIVE:{'-1':'jana','-2':'juzi','0':'leo','1':'kesho','2':'kesho kutwa'},
      PAST:'{N,plural,one{siku {N} iliyopita}other{siku {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya siku {N}}other{baada ya siku {N}}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'saa hii'},
      PAST:'{N,plural,one{saa {N} iliyopita}other{saa {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya saa {N}}other{baada ya saa {N}}}',
    },
    SHORT:{
      RELATIVE:{'0':'saa hii'},
      PAST:'{N,plural,one{saa {N} iliyopita}other{saa {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya saa {N}}other{baada ya saa {N}}}',
    },
    NARROW:{
      RELATIVE:{'0':'saa hii'},
      PAST:'{N,plural,one{Saa {N} iliyopita}other{Saa {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya saa {N}}other{baada ya saa {N}}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'dakika hii'},
      PAST:'{N,plural,one{dakika {N} iliyopita}other{dakika {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya dakika {N}}other{baada ya dakika {N}}}',
    },
    SHORT:{
      RELATIVE:{'0':'dakika hii'},
      PAST:'{N,plural,one{dakika {N} iliyopita}other{dakika {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya dakika {N}}other{baada ya dakika {N}}}',
    },
    NARROW:{
      RELATIVE:{'0':'dakika hii'},
      PAST:'{N,plural,one{dakika {N} iliyopita}other{dakika {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya dakika {N}}other{baada ya dakika {N}}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'mwezi uliopita','0':'mwezi huu','1':'mwezi ujao'},
      PAST:'{N,plural,one{mwezi {N} uliopita}other{miezi {N} iliyopita}}',
      FUTURE:'{N,plural,one{baada ya mwezi {N}}other{baada ya miezi {N}}}',
    },
    SHORT:{
      RELATIVE:{'-1':'mwezi uliopita','0':'mwezi huu','1':'mwezi ujao'},
      PAST:'{N,plural,one{mwezi {N} uliopita}other{miezi {N} iliyopita}}',
      FUTURE:'{N,plural,one{baada ya mwezi {N}}other{baada ya miezi {N}}}',
    },
    NARROW:{
      RELATIVE:{'-1':'mwezi uliopita','0':'mwezi huu','1':'mwezi ujao'},
      PAST:'{N,plural,one{mwezi {N} uliopita}other{miezi {N} iliyopita}}',
      FUTURE:'{N,plural,one{baada ya mwezi {N}}other{baada ya miezi {N}}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'robo ya mwaka iliyopita','0':'robo hii ya mwaka','1':'robo ya mwaka inayofuata'},
      PAST:'{N,plural,one{robo {N} iliyopita}other{robo {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya robo {N}}other{baada ya robo {N}}}',
    },
    SHORT:{
      RELATIVE:{'-1':'robo ya mwaka iliyopita','0':'robo hii ya mwaka','1':'robo ya mwaka inayofuata'},
      PAST:'{N,plural,one{robo {N} iliyopita}other{robo {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya robo {N}}other{baada ya robo {N}}}',
    },
    NARROW:{
      RELATIVE:{'-1':'robo ya mwaka iliyopita','0':'robo hii ya mwaka','1':'robo ya mwaka inayofuata'},
      PAST:'{N,plural,one{robo {N} iliyopita}other{robo {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya robo {N}}other{baada ya robo {N}}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'sasa hivi'},
      PAST:'{N,plural,one{Sekunde {N} iliyopita}other{Sekunde {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya sekunde {N}}other{baada ya sekunde {N}}}',
    },
    SHORT:{
      RELATIVE:{'0':'sasa hivi'},
      PAST:'{N,plural,one{sekunde {N} iliyopita}other{sekunde {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya sekunde {N}}other{baada ya sekunde {N}}}',
    },
    NARROW:{
      RELATIVE:{'0':'sasa hivi'},
      PAST:'{N,plural,one{sekunde {N} iliyopita}other{sekunde {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya sekunde {N}}other{baada ya sekunde {N}}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'wiki iliyopita','0':'wiki hii','1':'wiki ijayo'},
      PAST:'{N,plural,one{wiki {N} iliyopita}other{wiki {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya wiki {N}}other{baada ya wiki {N}}}',
    },
    SHORT:{
      RELATIVE:{'-1':'wiki iliyopita','0':'wiki hii','1':'wiki ijayo'},
      PAST:'{N,plural,one{wiki {N} iliyopita}other{wiki {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya wiki {N}}other{baada ya wiki {N}}}',
    },
    NARROW:{
      RELATIVE:{'-1':'wiki iliyopita','0':'wiki hii','1':'wiki ijayo'},
      PAST:'{N,plural,one{wiki {N} iliyopita}other{wiki {N} zilizopita}}',
      FUTURE:'{N,plural,one{baada ya wiki {N}}other{baada ya wiki {N}}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'mwaka uliopita','0':'mwaka huu','1':'mwaka ujao'},
      PAST:'{N,plural,one{mwaka {N} uliopita}other{miaka {N} iliyopita}}',
      FUTURE:'{N,plural,one{baada ya mwaka {N}}other{baada ya miaka {N}}}',
    },
    SHORT:{
      RELATIVE:{'-1':'mwaka uliopita','0':'mwaka huu','1':'mwaka ujao'},
      PAST:'{N,plural,one{mwaka {N} uliopita}other{miaka {N} iliyopita}}',
      FUTURE:'{N,plural,one{baada ya mwaka {N}}other{baada ya miaka {N}}}',
    },
    NARROW:{
      RELATIVE:{'-1':'mwaka uliopita','0':'mwaka huu','1':'mwaka ujao'},
      PAST:'{N,plural,one{mwaka {N} uliopita}other{miaka {N} iliyopita}}',
      FUTURE:'{N,plural,one{baada ya mwaka {N}}other{baada ya miaka {N}}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ta =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'நேற்று','-2':'நேற்று முன் தினம்','0':'இன்று','1':'நாளை','2':'நாளை மறுநாள்'},
      PAST:'{N,plural,one{{N} நாளுக்கு முன்}other{{N} நாட்களுக்கு முன்}}',
      FUTURE:'{N,plural,one{{N} நாளில்}other{{N} நாட்களில்}}',
    },
    SHORT:{
      RELATIVE:{'-1':'நேற்று','-2':'நேற்று முன் தினம்','0':'இன்று','1':'நாளை','2':'நாளை மறுநாள்'},
      PAST:'{N,plural,one{{N} நாளுக்கு முன்}other{{N} நாட்களுக்கு முன்}}',
      FUTURE:'{N,plural,one{{N} நாளில்}other{{N} நாட்களில்}}',
    },
    NARROW:{
      RELATIVE:{'-1':'நேற்று','-2':'நேற்று முன் தினம்','0':'இன்று','1':'நாளை','2':'நாளை மறுநாள்'},
      PAST:'{N,plural,one{{N} நா. முன்}other{{N} நா. முன்}}',
      FUTURE:'{N,plural,one{{N} நா.}other{{N} நா.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'இந்த ஒரு மணிநேரத்தில்'},
      PAST:'{N,plural,one{{N} மணிநேரம் முன்}other{{N} மணிநேரம் முன்}}',
      FUTURE:'{N,plural,one{{N} மணிநேரத்தில்}other{{N} மணிநேரத்தில்}}',
    },
    SHORT:{
      RELATIVE:{'0':'இந்த ஒரு மணிநேரத்தில்'},
      PAST:'{N,plural,one{{N} மணி. முன்}other{{N} மணி. முன்}}',
      FUTURE:'{N,plural,one{{N} மணி.}other{{N} மணி.}}',
    },
    NARROW:{
      RELATIVE:{'0':'இந்த ஒரு மணிநேரத்தில்'},
      PAST:'{N,plural,one{{N} ம. முன்}other{{N} ம. முன்}}',
      FUTURE:'{N,plural,one{{N} ம.}other{{N} ம.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'இந்த ஒரு நிமிடத்தில்'},
      PAST:'{N,plural,one{{N} நிமிடத்திற்கு முன்}other{{N} நிமிடங்களுக்கு முன்}}',
      FUTURE:'{N,plural,one{{N} நிமிடத்தில்}other{{N} நிமிடங்களில்}}',
    },
    SHORT:{
      RELATIVE:{'0':'இந்த ஒரு நிமிடத்தில்'},
      PAST:'{N,plural,one{{N} நிமி. முன்}other{{N} நிமி. முன்}}',
      FUTURE:'{N,plural,one{{N} நிமி.}other{{N} நிமி.}}',
    },
    NARROW:{
      RELATIVE:{'0':'இந்த ஒரு நிமிடத்தில்'},
      PAST:'{N,plural,one{{N} நி. முன்}other{{N} நி. முன்}}',
      FUTURE:'{N,plural,one{{N} நி.}other{{N} நி.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'கடந்த மாதம்','0':'இந்த மாதம்','1':'அடுத்த மாதம்'},
      PAST:'{N,plural,one{{N} மாதத்துக்கு முன்}other{{N} மாதங்களுக்கு முன்}}',
      FUTURE:'{N,plural,one{{N} மாதத்தில்}other{{N} மாதங்களில்}}',
    },
    SHORT:{
      RELATIVE:{'-1':'கடந்த மாதம்','0':'இந்த மாதம்','1':'அடுத்த மாதம்'},
      PAST:'{N,plural,one{{N} மாத. முன்}other{{N} மாத. முன்}}',
      FUTURE:'{N,plural,one{{N} மாத.}other{{N} மாத.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'கடந்த மாதம்','0':'இந்த மாதம்','1':'அடுத்த மாதம்'},
      PAST:'{N,plural,one{{N} மா. முன்}other{{N} மா. முன்}}',
      FUTURE:'{N,plural,one{{N} மா.}other{{N} மா.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'கடந்த காலாண்டு','0':'இந்த காலாண்டு','1':'அடுத்த காலாண்டு'},
      PAST:'{N,plural,one{{N} காலாண்டுக்கு முன்}other{{N} காலாண்டுகளுக்கு முன்}}',
      FUTURE:'{N,plural,one{+{N} காலாண்டில்}other{{N} காலாண்டுகளில்}}',
    },
    SHORT:{
      RELATIVE:{'-1':'இறுதி காலாண்டு','0':'இந்த காலாண்டு','1':'அடுத்த காலாண்டு'},
      PAST:'{N,plural,one{{N} காலா. முன்}other{{N} காலா. முன்}}',
      FUTURE:'{N,plural,one{{N} காலா.}other{{N} காலா.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'இறுதி காலாண்டு','0':'இந்த காலாண்டு','1':'அடுத்த காலாண்டு'},
      PAST:'{N,plural,one{{N} கா. முன்}other{{N} கா. முன்}}',
      FUTURE:'{N,plural,one{{N} கா.}other{{N} கா.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'இப்போது'},
      PAST:'{N,plural,one{{N} விநாடிக்கு முன்}other{{N} விநாடிகளுக்கு முன்}}',
      FUTURE:'{N,plural,one{{N} விநாடியில்}other{{N} விநாடிகளில்}}',
    },
    SHORT:{
      RELATIVE:{'0':'இப்போது'},
      PAST:'{N,plural,one{{N} விநா. முன்}other{{N} விநா. முன்}}',
      FUTURE:'{N,plural,one{{N} விநா.}other{{N} விநா.}}',
    },
    NARROW:{
      RELATIVE:{'0':'இப்போது'},
      PAST:'{N,plural,one{{N} வி. முன்}other{{N} வி. முன்}}',
      FUTURE:'{N,plural,one{{N} வி.}other{{N} வி.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'கடந்த வாரம்','0':'இந்த வாரம்','1':'அடுத்த வாரம்'},
      PAST:'{N,plural,one{{N} வாரத்திற்கு முன்}other{{N} வாரங்களுக்கு முன்}}',
      FUTURE:'{N,plural,one{{N} வாரத்தில்}other{{N} வாரங்களில்}}',
    },
    SHORT:{
      RELATIVE:{'-1':'கடந்த வாரம்','0':'இந்த வாரம்','1':'அடுத்த வாரம்'},
      PAST:'{N,plural,one{{N} வார. முன்}other{{N} வார. முன்}}',
      FUTURE:'{N,plural,one{{N} வார.}other{{N} வார.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'கடந்த வாரம்','0':'இந்த வாரம்','1':'அடுத்த வாரம்'},
      PAST:'{N,plural,one{{N} வா. முன்}other{{N} வா. முன்}}',
      FUTURE:'{N,plural,one{{N} வா.}other{{N} வா.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'கடந்த ஆண்டு','0':'இந்த ஆண்டு','1':'அடுத்த ஆண்டு'},
      PAST:'{N,plural,one{{N} ஆண்டிற்கு முன்}other{{N} ஆண்டுகளுக்கு முன்}}',
      FUTURE:'{N,plural,one{{N} ஆண்டில்}other{{N} ஆண்டுகளில்}}',
    },
    SHORT:{
      RELATIVE:{'-1':'கடந்த ஆண்டு','0':'இந்த ஆண்டு','1':'அடுத்த ஆண்டு'},
      PAST:'{N,plural,one{{N} ஆண்டிற்கு முன்}other{{N} ஆண்டுகளுக்கு முன்}}',
      FUTURE:'{N,plural,one{{N} ஆண்டில்}other{{N} ஆண்டுகளில்}}',
    },
    NARROW:{
      RELATIVE:{'-1':'கடந்த ஆண்டு','0':'இந்த ஆண்டு','1':'அடுத்த ஆண்டு'},
      PAST:'{N,plural,one{{N} ஆ. முன்}other{{N} ஆ. முன்}}',
      FUTURE:'{N,plural,one{{N} ஆ.}other{{N} ஆ.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_te =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'నిన్న','-2':'మొన్న','0':'ఈ రోజు','1':'రేపు','2':'ఎల్లుండి'},
      PAST:'{N,plural,one{{N} రోజు క్రితం}other{{N} రోజుల క్రితం}}',
      FUTURE:'{N,plural,one{{N} రోజులో}other{{N} రోజుల్లో}}',
    },
    SHORT:{
      RELATIVE:{'-1':'నిన్న','-2':'మొన్న','0':'ఈ రోజు','1':'రేపు','2':'ఎల్లుండి'},
      PAST:'{N,plural,one{{N} రోజు క్రితం}other{{N} రోజుల క్రితం}}',
      FUTURE:'{N,plural,one{{N} రోజులో}other{{N} రోజుల్లో}}',
    },
    NARROW:{
      RELATIVE:{'-1':'నిన్న','-2':'మొన్న','0':'ఈ రోజు','1':'రేపు','2':'ఎల్లుండి'},
      PAST:'{N,plural,one{{N} రోజు క్రితం}other{{N} రోజుల క్రితం}}',
      FUTURE:'{N,plural,one{{N} రోజులో}other{{N} రోజుల్లో}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ఈ గంట'},
      PAST:'{N,plural,one{{N} గంట క్రితం}other{{N} గంటల క్రితం}}',
      FUTURE:'{N,plural,one{{N} గంటలో}other{{N} గంటల్లో}}',
    },
    SHORT:{
      RELATIVE:{'0':'ఈ గంట'},
      PAST:'{N,plural,one{{N} గం. క్రితం}other{{N} గం. క్రితం}}',
      FUTURE:'{N,plural,one{{N} గం.లో}other{{N} గం.లో}}',
    },
    NARROW:{
      RELATIVE:{'0':'ఈ గంట'},
      PAST:'{N,plural,one{{N} గం. క్రితం}other{{N} గం. క్రితం}}',
      FUTURE:'{N,plural,one{{N} గం.లో}other{{N} గం.లో}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'ఈ నిమిషం'},
      PAST:'{N,plural,one{{N} నిమిషం క్రితం}other{{N} నిమిషాల క్రితం}}',
      FUTURE:'{N,plural,one{{N} నిమిషంలో}other{{N} నిమిషాల్లో}}',
    },
    SHORT:{
      RELATIVE:{'0':'ఈ నిమిషం'},
      PAST:'{N,plural,one{{N} నిమి. క్రితం}other{{N} నిమి. క్రితం}}',
      FUTURE:'{N,plural,one{{N} నిమి.లో}other{{N} నిమి.లో}}',
    },
    NARROW:{
      RELATIVE:{'0':'ఈ నిమిషం'},
      PAST:'{N,plural,one{{N} నిమి. క్రితం}other{{N} నిమి. క్రితం}}',
      FUTURE:'{N,plural,one{{N} నిమి.లో}other{{N} నిమి.లో}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'గత నెల','0':'ఈ నెల','1':'తదుపరి నెల'},
      PAST:'{N,plural,one{{N} నెల క్రితం}other{{N} నెలల క్రితం}}',
      FUTURE:'{N,plural,one{{N} నెలలో}other{{N} నెలల్లో}}',
    },
    SHORT:{
      RELATIVE:{'-1':'గత నెల','0':'ఈ నెల','1':'తదుపరి నెల'},
      PAST:'{N,plural,one{{N} నెల క్రితం}other{{N} నెలల క్రితం}}',
      FUTURE:'{N,plural,one{{N} నెలలో}other{{N} నెలల్లో}}',
    },
    NARROW:{
      RELATIVE:{'-1':'గత నెల','0':'ఈ నెల','1':'తదుపరి నెల'},
      PAST:'{N,plural,one{{N} నెల క్రితం}other{{N} నెలల క్రితం}}',
      FUTURE:'{N,plural,one{{N} నెలలో}other{{N} నెలల్లో}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'గత త్రైమాసికం','0':'ఈ త్రైమాసికం','1':'తదుపరి త్రైమాసికం'},
      PAST:'{N,plural,one{{N} త్రైమాసికం క్రితం}other{{N} త్రైమాసికాల క్రితం}}',
      FUTURE:'{N,plural,one{{N} త్రైమాసికంలో}other{{N} త్రైమాసికాల్లో}}',
    },
    SHORT:{
      RELATIVE:{'-1':'గత త్రైమాసికం','0':'ఈ త్రైమాసికం','1':'తదుపరి త్రైమాసికం'},
      PAST:'{N,plural,one{{N} త్రైమా. క్రితం}other{{N} త్రైమా. క్రితం}}',
      FUTURE:'{N,plural,one{{N} త్రైమా.లో}other{{N} త్రైమా.ల్లో}}',
    },
    NARROW:{
      RELATIVE:{'-1':'గత త్రైమాసికం','0':'ఈ త్రైమాసికం','1':'తదుపరి త్రైమాసికం'},
      PAST:'{N,plural,one{{N} త్రైమా. క్రితం}other{{N} త్రైమా. క్రితం}}',
      FUTURE:'{N,plural,one{{N} త్రైమాసికంలో}other{{N} త్రైమాసికాల్లో}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ప్రస్తుతం'},
      PAST:'{N,plural,one{{N} సెకను క్రితం}other{{N} సెకన్ల క్రితం}}',
      FUTURE:'{N,plural,one{{N} సెకనులో}other{{N} సెకన్లలో}}',
    },
    SHORT:{
      RELATIVE:{'0':'ప్రస్తుతం'},
      PAST:'{N,plural,one{{N} సెక. క్రితం}other{{N} సెక. క్రితం}}',
      FUTURE:'{N,plural,one{{N} సెకనులో}other{{N} సెకన్లలో}}',
    },
    NARROW:{
      RELATIVE:{'0':'ప్రస్తుతం'},
      PAST:'{N,plural,one{{N} సెక. క్రితం}other{{N} సెక. క్రితం}}',
      FUTURE:'{N,plural,one{{N} సెక.లో}other{{N} సెక. లో}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'గత వారం','0':'ఈ వారం','1':'తదుపరి వారం'},
      PAST:'{N,plural,one{{N} వారం క్రితం}other{{N} వారాల క్రితం}}',
      FUTURE:'{N,plural,one{{N} వారంలో}other{{N} వారాల్లో}}',
    },
    SHORT:{
      RELATIVE:{'-1':'గత వారం','0':'ఈ వారం','1':'తదుపరి వారం'},
      PAST:'{N,plural,one{{N} వారం క్రితం}other{{N} వారాల క్రితం}}',
      FUTURE:'{N,plural,one{{N} వారంలో}other{{N} వారాల్లో}}',
    },
    NARROW:{
      RELATIVE:{'-1':'గత వారం','0':'ఈ వారం','1':'తదుపరి వారం'},
      PAST:'{N,plural,one{{N} వారం క్రితం}other{{N} వారాల క్రితం}}',
      FUTURE:'{N,plural,one{{N} వారంలో}other{{N} వారాల్లో}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'గత సంవత్సరం','0':'ఈ సంవత్సరం','1':'తదుపరి సంవత్సరం'},
      PAST:'{N,plural,one{{N} సంవత్సరం క్రితం}other{{N} సంవత్సరాల క్రితం}}',
      FUTURE:'{N,plural,one{{N} సంవత్సరంలో}other{{N} సంవత్సరాల్లో}}',
    },
    SHORT:{
      RELATIVE:{'-1':'గత సంవత్సరం','0':'ఈ సంవత్సరం','1':'తదుపరి సంవత్సరం'},
      PAST:'{N,plural,one{{N} సం. క్రితం}other{{N} సం. క్రితం}}',
      FUTURE:'{N,plural,one{{N} సం.లో}other{{N} సం.ల్లో}}',
    },
    NARROW:{
      RELATIVE:{'-1':'గత సంవత్సరం','0':'ఈ సంవత్సరం','1':'తదుపరి సంవత్సరం'},
      PAST:'{N,plural,one{{N} సం. క్రితం}other{{N} సం. క్రితం}}',
      FUTURE:'{N,plural,one{{N} సం.లో}other{{N} సం.ల్లో}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_th =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'เมื่อวาน','-2':'เมื่อวานซืน','0':'วันนี้','1':'พรุ่งนี้','2':'มะรืนนี้'},
      PAST:'{N,plural,other{{N} วันที่ผ่านมา}}',
      FUTURE:'{N,plural,other{ในอีก {N} วัน}}',
    },
    SHORT:{
      RELATIVE:{'-1':'เมื่อวาน','-2':'เมื่อวานซืน','0':'วันนี้','1':'พรุ่งนี้','2':'มะรืนนี้'},
      PAST:'{N,plural,other{{N} วันที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} วัน}}',
    },
    NARROW:{
      RELATIVE:{'-1':'เมื่อวาน','-2':'เมื่อวานซืน','0':'วันนี้','1':'พรุ่งนี้','2':'มะรืนนี้'},
      PAST:'{N,plural,other{{N} วันที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} วัน}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ชั่วโมงนี้'},
      PAST:'{N,plural,other{{N} ชั่วโมงที่ผ่านมา}}',
      FUTURE:'{N,plural,other{ในอีก {N} ชั่วโมง}}',
    },
    SHORT:{
      RELATIVE:{'0':'ชั่วโมงนี้'},
      PAST:'{N,plural,other{{N} ชม. ที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} ชม.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ชั่วโมงนี้'},
      PAST:'{N,plural,other{{N} ชม. ที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} ชม.}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'นาทีนี้'},
      PAST:'{N,plural,other{{N} นาทีที่ผ่านมา}}',
      FUTURE:'{N,plural,other{ในอีก {N} นาที}}',
    },
    SHORT:{
      RELATIVE:{'0':'นาทีนี้'},
      PAST:'{N,plural,other{{N} นาทีที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} นาที}}',
    },
    NARROW:{
      RELATIVE:{'0':'นาทีนี้'},
      PAST:'{N,plural,other{{N} นาทีที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} นาที}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'เดือนที่แล้ว','0':'เดือนนี้','1':'เดือนหน้า'},
      PAST:'{N,plural,other{{N} เดือนที่ผ่านมา}}',
      FUTURE:'{N,plural,other{ในอีก {N} เดือน}}',
    },
    SHORT:{
      RELATIVE:{'-1':'เดือนที่แล้ว','0':'เดือนนี้','1':'เดือนหน้า'},
      PAST:'{N,plural,other{{N} เดือนที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} เดือน}}',
    },
    NARROW:{
      RELATIVE:{'-1':'เดือนที่แล้ว','0':'เดือนนี้','1':'เดือนหน้า'},
      PAST:'{N,plural,other{{N} เดือนที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} เดือน}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'ไตรมาสที่แล้ว','0':'ไตรมาสนี้','1':'ไตรมาสหน้า'},
      PAST:'{N,plural,other{{N} ไตรมาสที่แล้ว}}',
      FUTURE:'{N,plural,other{ในอีก {N} ไตรมาส}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ไตรมาสที่แล้ว','0':'ไตรมาสนี้','1':'ไตรมาสหน้า'},
      PAST:'{N,plural,other{{N} ไตรมาสที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} ไตรมาส}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ไตรมาสที่แล้ว','0':'ไตรมาสนี้','1':'ไตรมาสหน้า'},
      PAST:'{N,plural,other{{N} ไตรมาสที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} ไตรมาส}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ขณะนี้'},
      PAST:'{N,plural,other{{N} วินาทีที่ผ่านมา}}',
      FUTURE:'{N,plural,other{ในอีก {N} วินาที}}',
    },
    SHORT:{
      RELATIVE:{'0':'ขณะนี้'},
      PAST:'{N,plural,other{{N} วินาทีที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} วินาที}}',
    },
    NARROW:{
      RELATIVE:{'0':'ขณะนี้'},
      PAST:'{N,plural,other{{N} วินาทีที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} วินาที}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'สัปดาห์ที่แล้ว','0':'สัปดาห์นี้','1':'สัปดาห์หน้า'},
      PAST:'{N,plural,other{{N} สัปดาห์ที่ผ่านมา}}',
      FUTURE:'{N,plural,other{ในอีก {N} สัปดาห์}}',
    },
    SHORT:{
      RELATIVE:{'-1':'สัปดาห์ที่แล้ว','0':'สัปดาห์นี้','1':'สัปดาห์หน้า'},
      PAST:'{N,plural,other{{N} สัปดาห์ที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} สัปดาห์}}',
    },
    NARROW:{
      RELATIVE:{'-1':'สัปดาห์ที่แล้ว','0':'สัปดาห์นี้','1':'สัปดาห์หน้า'},
      PAST:'{N,plural,other{{N} สัปดาห์ที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} สัปดาห์}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'ปีที่แล้ว','0':'ปีนี้','1':'ปีหน้า'},
      PAST:'{N,plural,other{{N} ปีที่แล้ว}}',
      FUTURE:'{N,plural,other{ในอีก {N} ปี}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ปีที่แล้ว','0':'ปีนี้','1':'ปีหน้า'},
      PAST:'{N,plural,other{{N} ปีที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} ปี}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ปีที่แล้ว','0':'ปีนี้','1':'ปีหน้า'},
      PAST:'{N,plural,other{{N} ปีที่แล้ว}}',
      FUTURE:'{N,plural,other{ใน {N} ปี}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_tl =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'kahapon','-2':'Araw bago ang kahapon','0':'ngayong araw','1':'bukas','2':'Samakalawa'},
      PAST:'{N,plural,one{{N} araw ang nakalipas}other{{N} (na) araw ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} araw}other{sa {N} (na) araw}}',
    },
    SHORT:{
      RELATIVE:{'-1':'kahapon','-2':'Araw bago ang kahapon','0':'ngayong araw','1':'bukas','2':'Samakalawa'},
      PAST:'{N,plural,one{{N} (na) araw ang nakalipas}other{{N} (na) araw ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} (na) araw}other{sa {N} (na) araw}}',
    },
    NARROW:{
      RELATIVE:{'-1':'kahapon','-2':'Araw bago ang kahapon','0':'ngayong araw','1':'bukas','2':'Samakalawa'},
      PAST:'{N,plural,one{{N} araw ang nakalipas}other{{N} (na) araw ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} araw}other{sa {N} (na) araw}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'ngayong oras'},
      PAST:'{N,plural,one{{N} oras ang nakalipas}other{{N} (na) oras ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} oras}other{sa {N} (na) oras}}',
    },
    SHORT:{
      RELATIVE:{'0':'ngayong oras'},
      PAST:'{N,plural,one{{N} oras ang nakalipas}other{{N} (na) oras ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} oras}other{sa {N} (na) oras}}',
    },
    NARROW:{
      RELATIVE:{'0':'ngayong oras'},
      PAST:'{N,plural,one{{N} oras nakalipas}other{{N} (na) oras nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} oras}other{sa {N} (na) oras}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'sa minutong ito'},
      PAST:'{N,plural,one{{N} minuto ang nakalipas}other{{N} (na) minuto ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} minuto}other{sa {N} (na) minuto}}',
    },
    SHORT:{
      RELATIVE:{'0':'sa minutong ito'},
      PAST:'{N,plural,one{{N} min. ang nakalipas}other{{N} (na) min. ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} min.}other{sa {N} (na) min.}}',
    },
    NARROW:{
      RELATIVE:{'0':'sa minutong ito'},
      PAST:'{N,plural,one{{N} min. ang nakalipas}other{{N} (na) min. ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} min.}other{sa {N} (na) min.}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'nakaraang buwan','0':'ngayong buwan','1':'susunod na buwan'},
      PAST:'{N,plural,one{{N} buwan ang nakalipas}other{{N} (na) buwan ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} buwan}other{sa {N} (na) buwan}}',
    },
    SHORT:{
      RELATIVE:{'-1':'nakaraang buwan','0':'ngayong buwan','1':'susunod na buwan'},
      PAST:'{N,plural,one{{N} buwan ang nakalipas}other{{N} (na) buwan ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} buwan}other{sa {N} (na) buwan}}',
    },
    NARROW:{
      RELATIVE:{'-1':'nakaraang buwan','0':'ngayong buwan','1':'susunod na buwan'},
      PAST:'{N,plural,one{{N} buwan ang nakalipas}other{{N} (na) buwan ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} buwan}other{sa {N} (na) buwan}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'nakaraang quarter','0':'ngayong quarter','1':'susunod na quarter'},
      PAST:'{N,plural,one{{N} quarter ang nakalipas}other{{N} (na) quarter ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} quarter}other{sa {N} (na) quarter}}',
    },
    SHORT:{
      RELATIVE:{'-1':'nakaraang quarter','0':'ngayong quarter','1':'susunod na quarter'},
      PAST:'{N,plural,one{{N} quarter ang nakalipas}other{{N} (na) quarter ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} (na) quarter}other{sa {N} (na) quarter}}',
    },
    NARROW:{
      RELATIVE:{'-1':'nakaraang quarter','0':'ngayong quarter','1':'susunod na quarter'},
      PAST:'{N,plural,one{{N} quarter ang nakalipas}other{{N} (na) quarter ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} quarter}other{sa {N} (na) quarter}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'ngayon'},
      PAST:'{N,plural,one{{N} segundo ang nakalipas}other{{N} (na) segundo ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} segundo}other{sa {N} (na) segundo}}',
    },
    SHORT:{
      RELATIVE:{'0':'ngayon'},
      PAST:'{N,plural,one{{N} seg. ang nakalipas}other{{N} (na) seg. nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} seg.}other{sa {N} (na) seg.}}',
    },
    NARROW:{
      RELATIVE:{'0':'ngayon'},
      PAST:'{N,plural,one{{N} seg. nakalipas}other{{N} (na) seg. nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} seg.}other{sa {N} (na) seg.}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'nakalipas na linggo','0':'sa linggong ito','1':'susunod na linggo'},
      PAST:'{N,plural,one{{N} linggo ang nakalipas}other{{N} (na) linggo ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} linggo}other{sa {N} (na) linggo}}',
    },
    SHORT:{
      RELATIVE:{'-1':'nakaraang linggo','0':'ngayong linggo','1':'susunod na linggo'},
      PAST:'{N,plural,one{{N} linggo ang nakalipas}other{{N} (na) linggo ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} linggo}other{sa {N} (na) linggo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'nakaraang linggo','0':'ngayong linggo','1':'susunod na linggo'},
      PAST:'{N,plural,one{{N} linggo ang nakalipas}other{{N} (na) linggo ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} linggo}other{sa {N} (na) linggo}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'nakaraang taon','0':'ngayong taon','1':'susunod na taon'},
      PAST:'{N,plural,one{{N} taon ang nakalipas}other{{N} (na) taon ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} taon}other{sa {N} (na) taon}}',
    },
    SHORT:{
      RELATIVE:{'-1':'nakaraang taon','0':'ngayong taon','1':'susunod na taon'},
      PAST:'{N,plural,one{{N} taon ang nakalipas}other{{N} (na) taon ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} taon}other{sa {N} (na) taon}}',
    },
    NARROW:{
      RELATIVE:{'-1':'nakaraang taon','0':'ngayong taon','1':'susunod na taon'},
      PAST:'{N,plural,one{{N} taon ang nakalipas}other{{N} (na) taon ang nakalipas}}',
      FUTURE:'{N,plural,one{sa {N} taon}other{sa {N} (na) taon}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_tr =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'dün','-2':'evvelsi gün','0':'bugün','1':'yarın','2':'öbür gün'},
      PAST:'{N,plural,one{{N} gün önce}other{{N} gün önce}}',
      FUTURE:'{N,plural,one{{N} gün sonra}other{{N} gün sonra}}',
    },
    SHORT:{
      RELATIVE:{'-1':'dün','-2':'evvelsi gün','0':'bugün','1':'yarın','2':'öbür gün'},
      PAST:'{N,plural,one{{N} gün önce}other{{N} gün önce}}',
      FUTURE:'{N,plural,one{{N} gün sonra}other{{N} gün sonra}}',
    },
    NARROW:{
      RELATIVE:{'-1':'dün','-2':'evvelsi gün','0':'bugün','1':'yarın','2':'öbür gün'},
      PAST:'{N,plural,one{{N} gün önce}other{{N} gün önce}}',
      FUTURE:'{N,plural,one{{N} gün sonra}other{{N} gün sonra}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'bu saat'},
      PAST:'{N,plural,one{{N} saat önce}other{{N} saat önce}}',
      FUTURE:'{N,plural,one{{N} saat sonra}other{{N} saat sonra}}',
    },
    SHORT:{
      RELATIVE:{'0':'bu saat'},
      PAST:'{N,plural,one{{N} sa. önce}other{{N} sa. önce}}',
      FUTURE:'{N,plural,one{{N} sa. sonra}other{{N} sa. sonra}}',
    },
    NARROW:{
      RELATIVE:{'0':'bu saat'},
      PAST:'{N,plural,one{{N} sa. önce}other{{N} sa. önce}}',
      FUTURE:'{N,plural,one{{N} sa. sonra}other{{N} sa. sonra}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'bu dakika'},
      PAST:'{N,plural,one{{N} dakika önce}other{{N} dakika önce}}',
      FUTURE:'{N,plural,one{{N} dakika sonra}other{{N} dakika sonra}}',
    },
    SHORT:{
      RELATIVE:{'0':'bu dakika'},
      PAST:'{N,plural,one{{N} dk. önce}other{{N} dk. önce}}',
      FUTURE:'{N,plural,one{{N} dk. sonra}other{{N} dk. sonra}}',
    },
    NARROW:{
      RELATIVE:{'0':'bu dakika'},
      PAST:'{N,plural,one{{N} dk. önce}other{{N} dk. önce}}',
      FUTURE:'{N,plural,one{{N} dk. sonra}other{{N} dk. sonra}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'geçen ay','0':'bu ay','1':'gelecek ay'},
      PAST:'{N,plural,one{{N} ay önce}other{{N} ay önce}}',
      FUTURE:'{N,plural,one{{N} ay sonra}other{{N} ay sonra}}',
    },
    SHORT:{
      RELATIVE:{'-1':'geçen ay','0':'bu ay','1':'gelecek ay'},
      PAST:'{N,plural,one{{N} ay önce}other{{N} ay önce}}',
      FUTURE:'{N,plural,one{{N} ay sonra}other{{N} ay sonra}}',
    },
    NARROW:{
      RELATIVE:{'-1':'geçen ay','0':'bu ay','1':'gelecek ay'},
      PAST:'{N,plural,one{{N} ay önce}other{{N} ay önce}}',
      FUTURE:'{N,plural,one{{N} ay sonra}other{{N} ay sonra}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'geçen çeyrek','0':'bu çeyrek','1':'gelecek çeyrek'},
      PAST:'{N,plural,one{{N} çeyrek önce}other{{N} çeyrek önce}}',
      FUTURE:'{N,plural,one{{N} çeyrek sonra}other{{N} çeyrek sonra}}',
    },
    SHORT:{
      RELATIVE:{'-1':'geçen çeyrek','0':'bu çeyrek','1':'gelecek çeyrek'},
      PAST:'{N,plural,one{{N} çyr. önce}other{{N} çyr. önce}}',
      FUTURE:'{N,plural,one{{N} çyr. sonra}other{{N} çyr. sonra}}',
    },
    NARROW:{
      RELATIVE:{'-1':'geçen çeyrek','0':'bu çeyrek','1':'gelecek çeyrek'},
      PAST:'{N,plural,one{{N} çyr. önce}other{{N} çyr. önce}}',
      FUTURE:'{N,plural,one{{N} çyr. sonra}other{{N} çyr. sonra}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'şimdi'},
      PAST:'{N,plural,one{{N} saniye önce}other{{N} saniye önce}}',
      FUTURE:'{N,plural,one{{N} saniye sonra}other{{N} saniye sonra}}',
    },
    SHORT:{
      RELATIVE:{'0':'şimdi'},
      PAST:'{N,plural,one{{N} sn. önce}other{{N} sn. önce}}',
      FUTURE:'{N,plural,one{{N} sn. sonra}other{{N} sn. sonra}}',
    },
    NARROW:{
      RELATIVE:{'0':'şimdi'},
      PAST:'{N,plural,one{{N} sn. önce}other{{N} sn. önce}}',
      FUTURE:'{N,plural,one{{N} sn. sonra}other{{N} sn. sonra}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'geçen hafta','0':'bu hafta','1':'gelecek hafta'},
      PAST:'{N,plural,one{{N} hafta önce}other{{N} hafta önce}}',
      FUTURE:'{N,plural,one{{N} hafta sonra}other{{N} hafta sonra}}',
    },
    SHORT:{
      RELATIVE:{'-1':'geçen hafta','0':'bu hafta','1':'gelecek hafta'},
      PAST:'{N,plural,one{{N} hf. önce}other{{N} hf. önce}}',
      FUTURE:'{N,plural,one{{N} hf. sonra}other{{N} hf. sonra}}',
    },
    NARROW:{
      RELATIVE:{'-1':'geçen hafta','0':'bu hafta','1':'gelecek hafta'},
      PAST:'{N,plural,one{{N} hf. önce}other{{N} hf. önce}}',
      FUTURE:'{N,plural,one{{N} hf. sonra}other{{N} hf. sonra}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'geçen yıl','0':'bu yıl','1':'gelecek yıl'},
      PAST:'{N,plural,one{{N} yıl önce}other{{N} yıl önce}}',
      FUTURE:'{N,plural,one{{N} yıl sonra}other{{N} yıl sonra}}',
    },
    SHORT:{
      RELATIVE:{'-1':'geçen yıl','0':'bu yıl','1':'gelecek yıl'},
      PAST:'{N,plural,one{{N} yıl önce}other{{N} yıl önce}}',
      FUTURE:'{N,plural,one{{N} yıl sonra}other{{N} yıl sonra}}',
    },
    NARROW:{
      RELATIVE:{'-1':'geçen yıl','0':'bu yıl','1':'gelecek yıl'},
      PAST:'{N,plural,one{{N} yıl önce}other{{N} yıl önce}}',
      FUTURE:'{N,plural,one{{N} yıl sonra}other{{N} yıl sonra}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_uk =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'учора','-2':'позавчора','0':'сьогодні','1':'завтра','2':'післязавтра'},
      PAST:'{N,plural,few{{N} дні тому}many{{N} днів тому}one{{N} день тому}other{{N} дня тому}}',
      FUTURE:'{N,plural,few{через {N} дні}many{через {N} днів}one{через {N} день}other{через {N} дня}}',
    },
    SHORT:{
      RELATIVE:{'-1':'учора','-2':'позавчора','0':'сьогодні','1':'завтра','2':'післязавтра'},
      PAST:'{N,plural,few{{N} дн. тому}many{{N} дн. тому}one{{N} дн. тому}other{{N} дн. тому}}',
      FUTURE:'{N,plural,few{через {N} дн.}many{через {N} дн.}one{через {N} дн.}other{через {N} дн.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'учора','-2':'позавчора','0':'сьогодні','1':'завтра','2':'післязавтра'},
      PAST:'{N,plural,few{-{N} дн.}many{-{N} дн.}one{{N} д. тому}other{-{N} дн.}}',
      FUTURE:'{N,plural,few{за {N} д.}many{за {N} д.}one{за {N} д.}other{за {N} д.}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'цієї години'},
      PAST:'{N,plural,few{{N} години тому}many{{N} годин тому}one{{N} годину тому}other{{N} години тому}}',
      FUTURE:'{N,plural,few{через {N} години}many{через {N} годин}one{через {N} годину}other{через {N} години}}',
    },
    SHORT:{
      RELATIVE:{'0':'цієї години'},
      PAST:'{N,plural,few{{N} год тому}many{{N} год тому}one{{N} год тому}other{{N} год тому}}',
      FUTURE:'{N,plural,few{через {N} год}many{через {N} год}one{через {N} год}other{через {N} год}}',
    },
    NARROW:{
      RELATIVE:{'0':'цієї години'},
      PAST:'{N,plural,few{{N} год тому}many{{N} год тому}one{{N} год тому}other{{N} год тому}}',
      FUTURE:'{N,plural,few{за {N} год}many{за {N} год}one{за {N} год}other{за {N} год}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'цієї хвилини'},
      PAST:'{N,plural,few{{N} хвилини тому}many{{N} хвилин тому}one{{N} хвилину тому}other{{N} хвилини тому}}',
      FUTURE:'{N,plural,few{через {N} хвилини}many{через {N} хвилин}one{через {N} хвилину}other{через {N} хвилини}}',
    },
    SHORT:{
      RELATIVE:{'0':'цієї хвилини'},
      PAST:'{N,plural,few{{N} хв тому}many{{N} хв тому}one{{N} хв тому}other{{N} хв тому}}',
      FUTURE:'{N,plural,few{через {N} хв}many{через {N} хв}one{через {N} хв}other{через {N} хв}}',
    },
    NARROW:{
      RELATIVE:{'0':'цієї хвилини'},
      PAST:'{N,plural,few{{N} хв тому}many{{N} хв тому}one{{N} хв тому}other{{N} хв тому}}',
      FUTURE:'{N,plural,few{за {N} хв}many{за {N} хв}one{за {N} хв}other{за {N} хв}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'минулого місяця','0':'цього місяця','1':'наступного місяця'},
      PAST:'{N,plural,few{{N} місяці тому}many{{N} місяців тому}one{{N} місяць тому}other{{N} місяця тому}}',
      FUTURE:'{N,plural,few{через {N} місяці}many{через {N} місяців}one{через {N} місяць}other{через {N} місяця}}',
    },
    SHORT:{
      RELATIVE:{'-1':'минулого місяця','0':'цього місяця','1':'наступного місяця'},
      PAST:'{N,plural,few{{N} міс. тому}many{{N} міс. тому}one{{N} міс. тому}other{{N} міс. тому}}',
      FUTURE:'{N,plural,few{через {N} міс.}many{через {N} міс.}one{через {N} міс.}other{через {N} міс.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'минулого місяця','0':'цього місяця','1':'наступного місяця'},
      PAST:'{N,plural,few{{N} міс. тому}many{{N} міс. тому}one{{N} міс. тому}other{{N} міс. тому}}',
      FUTURE:'{N,plural,few{за {N} міс.}many{за {N} міс.}one{за {N} міс.}other{за {N} міс.}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'минулого кварталу','0':'цього кварталу','1':'наступного кварталу'},
      PAST:'{N,plural,few{{N} квартали тому}many{{N} кварталів тому}one{{N} квартал тому}other{{N} кварталу тому}}',
      FUTURE:'{N,plural,few{через {N} квартали}many{через {N} кварталів}one{через {N} квартал}other{через {N} кварталу}}',
    },
    SHORT:{
      RELATIVE:{'-1':'минулого кв.','0':'цього кв.','1':'наступного кв.'},
      PAST:'{N,plural,few{{N} кв. тому}many{{N} кв. тому}one{{N} кв. тому}other{{N} кв. тому}}',
      FUTURE:'{N,plural,few{через {N} кв.}many{через {N} кв.}one{через {N} кв.}other{через {N} кв.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'минулого кв.','0':'цього кв.','1':'наступного кв.'},
      PAST:'{N,plural,few{{N} кв. тому}many{{N} кв. тому}one{{N} кв. тому}other{{N} кв. тому}}',
      FUTURE:'{N,plural,few{за {N} кв.}many{за {N} кв.}one{за {N} кв.}other{за {N} кв.}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'зараз'},
      PAST:'{N,plural,few{{N} секунди тому}many{{N} секунд тому}one{{N} секунду тому}other{{N} секунди тому}}',
      FUTURE:'{N,plural,few{через {N} секунди}many{через {N} секунд}one{через {N} секунду}other{через {N} секунди}}',
    },
    SHORT:{
      RELATIVE:{'0':'зараз'},
      PAST:'{N,plural,few{{N} с тому}many{{N} с тому}one{{N} с тому}other{{N} с тому}}',
      FUTURE:'{N,plural,few{через {N} с}many{через {N} с}one{через {N} с}other{через {N} с}}',
    },
    NARROW:{
      RELATIVE:{'0':'зараз'},
      PAST:'{N,plural,few{{N} с тому}many{{N} с тому}one{{N} с тому}other{{N} с тому}}',
      FUTURE:'{N,plural,few{за {N} с}many{за {N} с}one{за {N} с}other{за {N} с}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'минулого тижня','0':'цього тижня','1':'наступного тижня'},
      PAST:'{N,plural,few{{N} тижні тому}many{{N} тижнів тому}one{{N} тиждень тому}other{{N} тижня тому}}',
      FUTURE:'{N,plural,few{через {N} тижні}many{через {N} тижнів}one{через {N} тиждень}other{через {N} тижня}}',
    },
    SHORT:{
      RELATIVE:{'-1':'минулого тижня','0':'цього тижня','1':'наступного тижня'},
      PAST:'{N,plural,few{{N} тиж. тому}many{{N} тиж. тому}one{{N} тиж. тому}other{{N} тиж. тому}}',
      FUTURE:'{N,plural,few{через {N} тиж.}many{через {N} тиж.}one{через {N} тиж.}other{через {N} тиж.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'минулого тижня','0':'цього тижня','1':'наступного тижня'},
      PAST:'{N,plural,few{{N} тиж. тому}many{{N} тиж. тому}one{{N} тиж. тому}other{{N} тиж. тому}}',
      FUTURE:'{N,plural,few{за {N} тиж.}many{за {N} тиж.}one{за {N} тиж.}other{за {N} тиж.}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'торік','0':'цього року','1':'наступного року'},
      PAST:'{N,plural,few{{N} роки тому}many{{N} років тому}one{{N} рік тому}other{{N} року тому}}',
      FUTURE:'{N,plural,few{через {N} роки}many{через {N} років}one{через {N} рік}other{через {N} року}}',
    },
    SHORT:{
      RELATIVE:{'-1':'торік','0':'цього року','1':'наступного року'},
      PAST:'{N,plural,few{{N} р. тому}many{{N} р. тому}one{{N} р. тому}other{{N} р. тому}}',
      FUTURE:'{N,plural,few{через {N} р.}many{через {N} р.}one{через {N} р.}other{через {N} р.}}',
    },
    NARROW:{
      RELATIVE:{'-1':'торік','0':'цього року','1':'наступного року'},
      PAST:'{N,plural,few{{N} р. тому}many{{N} р. тому}one{{N} р. тому}other{{N} р. тому}}',
      FUTURE:'{N,plural,few{за {N} р.}many{за {N} р.}one{за {N} р.}other{за {N} р.}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_ur =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'گزشتہ کل','-2':'گزشتہ پرسوں','0':'آج','1':'آئندہ کل','2':'آنے والا پرسوں'},
      PAST:'{N,plural,one{{N} دن پہلے}other{{N} دنوں پہلے}}',
      FUTURE:'{N,plural,one{{N} دن میں}other{{N} دنوں میں}}',
    },
    SHORT:{
      RELATIVE:{'-1':'گزشتہ کل','-2':'گزشتہ پرسوں','0':'آج','1':'آئندہ کل','2':'آنے والا پرسوں'},
      PAST:'{N,plural,one{{N} دن پہلے}other{{N} دنوں پہلے}}',
      FUTURE:'{N,plural,one{{N} دن میں}other{{N} دنوں میں}}',
    },
    NARROW:{
      RELATIVE:{'-1':'گزشتہ کل','-2':'گزشتہ پرسوں','0':'آج','1':'آئندہ کل','2':'آنے والا پرسوں'},
      PAST:'{N,plural,one{{N} دن پہلے}other{{N} دن پہلے}}',
      FUTURE:'{N,plural,one{{N} دن میں}other{{N} دنوں میں}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'اس گھنٹے'},
      PAST:'{N,plural,one{{N} گھنٹہ پہلے}other{{N} گھنٹے پہلے}}',
      FUTURE:'{N,plural,one{{N} گھنٹے میں}other{{N} گھنٹے میں}}',
    },
    SHORT:{
      RELATIVE:{'0':'اس گھنٹے'},
      PAST:'{N,plural,one{{N} گھنٹے پہلے}other{{N} گھنٹے پہلے}}',
      FUTURE:'{N,plural,one{{N} گھنٹے میں}other{{N} گھنٹے میں}}',
    },
    NARROW:{
      RELATIVE:{'0':'اس گھنٹے'},
      PAST:'{N,plural,one{{N} گھنٹہ پہلے}other{{N} گھنٹے پہلے}}',
      FUTURE:'{N,plural,one{{N} گھنٹے میں}other{{N} گھنٹوں میں}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'اس منٹ'},
      PAST:'{N,plural,one{{N} منٹ پہلے}other{{N} منٹ پہلے}}',
      FUTURE:'{N,plural,one{{N} منٹ میں}other{{N} منٹ میں}}',
    },
    SHORT:{
      RELATIVE:{'0':'اس منٹ'},
      PAST:'{N,plural,one{{N} منٹ پہلے}other{{N} منٹ پہلے}}',
      FUTURE:'{N,plural,one{{N} منٹ میں}other{{N} منٹ میں}}',
    },
    NARROW:{
      RELATIVE:{'0':'اس منٹ'},
      PAST:'{N,plural,one{{N} منٹ پہلے}other{{N} منٹ پہلے}}',
      FUTURE:'{N,plural,one{{N} منٹ میں}other{{N} منٹ میں}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'پچھلا مہینہ','0':'اس مہینہ','1':'اگلا مہینہ'},
      PAST:'{N,plural,one{{N} مہینہ پہلے}other{{N} مہینے پہلے}}',
      FUTURE:'{N,plural,one{{N} مہینہ میں}other{{N} مہینے میں}}',
    },
    SHORT:{
      RELATIVE:{'-1':'پچھلے مہینہ','0':'اس مہینہ','1':'اگلے مہینہ'},
      PAST:'{N,plural,one{{N} ماہ قبل}other{{N} ماہ قبل}}',
      FUTURE:'{N,plural,one{{N} ماہ میں}other{{N} ماہ میں}}',
    },
    NARROW:{
      RELATIVE:{'-1':'پچھلے مہینہ','0':'اس مہینہ','1':'اگلے مہینہ'},
      PAST:'{N,plural,one{{N} ماہ پہلے}other{{N} ماہ پہلے}}',
      FUTURE:'{N,plural,one{{N} ماہ میں}other{{N} ماہ میں}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'گزشتہ سہ ماہی','0':'اس سہ ماہی','1':'اگلے سہ ماہی'},
      PAST:'{N,plural,one{{N} سہ ماہی پہلے}other{{N} سہ ماہی پہلے}}',
      FUTURE:'{N,plural,one{{N} سہ ماہی میں}other{{N} سہ ماہی میں}}',
    },
    SHORT:{
      RELATIVE:{'-1':'گزشتہ سہ ماہی','0':'اس سہ ماہی','1':'اگلے سہ ماہی'},
      PAST:'{N,plural,one{{N} سہ ماہی قبل}other{{N} سہ ماہی قبل}}',
      FUTURE:'{N,plural,one{{N} سہ ماہی میں}other{{N} سہ ماہی میں}}',
    },
    NARROW:{
      RELATIVE:{'-1':'گزشتہ سہ ماہی','0':'اس سہ ماہی','1':'اگلے سہ ماہی'},
      PAST:'{N,plural,one{{N} سہ ماہی پہلے}other{{N} سہ ماہی پہلے}}',
      FUTURE:'{N,plural,one{{N} سہ ماہی میں}other{{N} سہ ماہی میں}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'اب'},
      PAST:'{N,plural,one{{N} سیکنڈ پہلے}other{{N} سیکنڈ پہلے}}',
      FUTURE:'{N,plural,one{{N} سیکنڈ میں}other{{N} سیکنڈ میں}}',
    },
    SHORT:{
      RELATIVE:{'0':'اب'},
      PAST:'{N,plural,one{{N} سیکنڈ پہلے}other{{N} سیکنڈ پہلے}}',
      FUTURE:'{N,plural,one{{N} سیکنڈ میں}other{{N} سیکنڈ میں}}',
    },
    NARROW:{
      RELATIVE:{'0':'اب'},
      PAST:'{N,plural,one{{N} سیکنڈ پہلے}other{{N} سیکنڈ پہلے}}',
      FUTURE:'{N,plural,one{{N} سیکنڈ میں}other{{N} سیکنڈ میں}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'پچھلے ہفتہ','0':'اس ہفتہ','1':'اگلے ہفتہ'},
      PAST:'{N,plural,one{{N} ہفتہ پہلے}other{{N} ہفتے پہلے}}',
      FUTURE:'{N,plural,one{{N} ہفتہ میں}other{{N} ہفتے میں}}',
    },
    SHORT:{
      RELATIVE:{'-1':'پچھلے ہفتہ','0':'اس ہفتہ','1':'اگلے ہفتہ'},
      PAST:'{N,plural,one{{N} ہفتے پہلے}other{{N} ہفتے پہلے}}',
      FUTURE:'{N,plural,one{{N} ہفتے میں}other{{N} ہفتے میں}}',
    },
    NARROW:{
      RELATIVE:{'-1':'پچھلے ہفتہ','0':'اس ہفتہ','1':'اگلے ہفتہ'},
      PAST:'{N,plural,one{{N} ہفتہ پہلے}other{{N} ہفتے پہلے}}',
      FUTURE:'{N,plural,one{{N} ہفتہ میں}other{{N} ہفتے میں}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'گزشتہ سال','0':'اس سال','1':'اگلے سال'},
      PAST:'{N,plural,one{{N} سال پہلے}other{{N} سال پہلے}}',
      FUTURE:'{N,plural,one{{N} سال میں}other{{N} سال میں}}',
    },
    SHORT:{
      RELATIVE:{'-1':'گزشتہ سال','0':'اس سال','1':'اگلے سال'},
      PAST:'{N,plural,one{{N} سال پہلے}other{{N} سال پہلے}}',
      FUTURE:'{N,plural,one{{N} سال میں}other{{N} سال میں}}',
    },
    NARROW:{
      RELATIVE:{'-1':'گزشتہ سال','0':'اس سال','1':'اگلے سال'},
      PAST:'{N,plural,one{{N} سال پہلے}other{{N} سال پہلے}}',
      FUTURE:'{N,plural,one{{N} سال میں}other{{N} سال میں}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_uz =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'kecha','0':'bugun','1':'ertaga'},
      PAST:'{N,plural,one{{N} kun oldin}other{{N} kun oldin}}',
      FUTURE:'{N,plural,one{{N} kundan keyin}other{{N} kundan keyin}}',
    },
    SHORT:{
      RELATIVE:{'-1':'kecha','0':'bugun','1':'ertaga'},
      PAST:'{N,plural,one{{N} kun oldin}other{{N} kun oldin}}',
      FUTURE:'{N,plural,one{{N} kundan keyin}other{{N} kundan keyin}}',
    },
    NARROW:{
      RELATIVE:{'-1':'kecha','0':'bugun','1':'ertaga'},
      PAST:'{N,plural,one{{N} kun oldin}other{{N} kun oldin}}',
      FUTURE:'{N,plural,one{{N} kundan keyin}other{{N} kundan keyin}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'shu soatda'},
      PAST:'{N,plural,one{{N} soat oldin}other{{N} soat oldin}}',
      FUTURE:'{N,plural,one{{N} soatdan keyin}other{{N} soatdan keyin}}',
    },
    SHORT:{
      RELATIVE:{'0':'shu soatda'},
      PAST:'{N,plural,one{{N} soat oldin}other{{N} soat oldin}}',
      FUTURE:'{N,plural,one{{N} soatdan keyin}other{{N} soatdan keyin}}',
    },
    NARROW:{
      RELATIVE:{'0':'shu soatda'},
      PAST:'{N,plural,one{{N} soat oldin}other{{N} soat oldin}}',
      FUTURE:'{N,plural,one{{N} soatdan keyin}other{{N} soatdan keyin}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'shu daqiqada'},
      PAST:'{N,plural,one{{N} daqiqa oldin}other{{N} daqiqa oldin}}',
      FUTURE:'{N,plural,one{{N} daqiqadan keyin}other{{N} daqiqadan keyin}}',
    },
    SHORT:{
      RELATIVE:{'0':'shu daqiqada'},
      PAST:'{N,plural,one{{N} daqiqa oldin}other{{N} daqiqa oldin}}',
      FUTURE:'{N,plural,one{{N} daqiqadan keyin}other{{N} daqiqadan keyin}}',
    },
    NARROW:{
      RELATIVE:{'0':'shu daqiqada'},
      PAST:'{N,plural,one{{N} daqiqa oldin}other{{N} daqiqa oldin}}',
      FUTURE:'{N,plural,one{{N} daqiqadan keyin}other{{N} daqiqadan keyin}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'o‘tgan oy','0':'shu oy','1':'keyingi oy'},
      PAST:'{N,plural,one{{N} oy oldin}other{{N} oy oldin}}',
      FUTURE:'{N,plural,one{{N} oydan keyin}other{{N} oydan keyin}}',
    },
    SHORT:{
      RELATIVE:{'-1':'o‘tgan oy','0':'shu oy','1':'keyingi oy'},
      PAST:'{N,plural,one{{N} oy oldin}other{{N} oy oldin}}',
      FUTURE:'{N,plural,one{{N} oydan keyin}other{{N} oydan keyin}}',
    },
    NARROW:{
      RELATIVE:{'-1':'o‘tgan oy','0':'shu oy','1':'keyingi oy'},
      PAST:'{N,plural,one{{N} oy oldin}other{{N} oy oldin}}',
      FUTURE:'{N,plural,one{{N} oydan keyin}other{{N} oydan keyin}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'o‘tgan chorak','0':'shu chorak','1':'keyingi chorak'},
      PAST:'{N,plural,one{{N} chorak oldin}other{{N} chorak oldin}}',
      FUTURE:'{N,plural,one{{N} chorakdan keyin}other{{N} chorakdan keyin}}',
    },
    SHORT:{
      RELATIVE:{'-1':'o‘tgan chorak','0':'shu chorak','1':'keyingi chorak'},
      PAST:'{N,plural,one{{N} chorak oldin}other{{N} chorak oldin}}',
      FUTURE:'{N,plural,one{{N} chorakdan keyin}other{{N} chorakdan keyin}}',
    },
    NARROW:{
      RELATIVE:{'-1':'o‘tgan chorak','0':'shu chorak','1':'keyingi chorak'},
      PAST:'{N,plural,one{{N} chorak oldin}other{{N} chorak oldin}}',
      FUTURE:'{N,plural,one{{N} chorakdan keyin}other{{N} chorakdan keyin}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'hozir'},
      PAST:'{N,plural,one{{N} soniya oldin}other{{N} soniya oldin}}',
      FUTURE:'{N,plural,one{{N} soniyadan keyin}other{{N} soniyadan keyin}}',
    },
    SHORT:{
      RELATIVE:{'0':'hozir'},
      PAST:'{N,plural,one{{N} soniya oldin}other{{N} soniya oldin}}',
      FUTURE:'{N,plural,one{{N} soniyadan keyin}other{{N} soniyadan keyin}}',
    },
    NARROW:{
      RELATIVE:{'0':'hozir'},
      PAST:'{N,plural,one{{N} soniya oldin}other{{N} soniya oldin}}',
      FUTURE:'{N,plural,one{{N} soniyadan keyin}other{{N} soniyadan keyin}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'o‘tgan hafta','0':'shu hafta','1':'keyingi hafta'},
      PAST:'{N,plural,one{{N} hafta oldin}other{{N} hafta oldin}}',
      FUTURE:'{N,plural,one{{N} haftadan keyin}other{{N} haftadan keyin}}',
    },
    SHORT:{
      RELATIVE:{'-1':'o‘tgan hafta','0':'shu hafta','1':'keyingi hafta'},
      PAST:'{N,plural,one{{N} hafta oldin}other{{N} hafta oldin}}',
      FUTURE:'{N,plural,one{{N} haftadan keyin}other{{N} haftadan keyin}}',
    },
    NARROW:{
      RELATIVE:{'-1':'o‘tgan hafta','0':'shu hafta','1':'keyingi hafta'},
      PAST:'{N,plural,one{{N} hafta oldin}other{{N} hafta oldin}}',
      FUTURE:'{N,plural,one{{N} haftadan keyin}other{{N} haftadan keyin}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'o‘tgan yil','0':'shu yil','1':'keyingi yil'},
      PAST:'{N,plural,one{{N} yil oldin}other{{N} yil oldin}}',
      FUTURE:'{N,plural,one{{N} yildan keyin}other{{N} yildan keyin}}',
    },
    SHORT:{
      RELATIVE:{'-1':'oʻtgan yil','0':'bu yil','1':'keyingi yil'},
      PAST:'{N,plural,one{{N} yil oldin}other{{N} yil oldin}}',
      FUTURE:'{N,plural,one{{N} yildan keyin}other{{N} yildan keyin}}',
    },
    NARROW:{
      RELATIVE:{'-1':'oʻtgan yil','0':'bu yil','1':'keyingi yil'},
      PAST:'{N,plural,one{{N} yil oldin}other{{N} yil oldin}}',
      FUTURE:'{N,plural,one{{N} yildan keyin}other{{N} yildan keyin}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_vi =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'Hôm qua','-2':'Hôm kia','0':'Hôm nay','1':'Ngày mai','2':'Ngày kia'},
      PAST:'{N,plural,other{{N} ngày trước}}',
      FUTURE:'{N,plural,other{sau {N} ngày nữa}}',
    },
    SHORT:{
      RELATIVE:{'-2':'Hôm kia','2':'Ngày kia'},
      PAST:'{N,plural,other{{N} ngày trước}}',
      FUTURE:'{N,plural,other{sau {N} ngày nữa}}',
    },
    NARROW:{
      RELATIVE:{'-2':'Hôm kia','2':'Ngày kia'},
      PAST:'{N,plural,other{{N} ngày trước}}',
      FUTURE:'{N,plural,other{sau {N} ngày nữa}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'giờ này'},
      PAST:'{N,plural,other{{N} giờ trước}}',
      FUTURE:'{N,plural,other{sau {N} giờ nữa}}',
    },
    SHORT:{
      RELATIVE:{'0':'giờ này'},
      PAST:'{N,plural,other{{N} giờ trước}}',
      FUTURE:'{N,plural,other{sau {N} giờ nữa}}',
    },
    NARROW:{
      RELATIVE:{'0':'giờ này'},
      PAST:'{N,plural,other{{N} giờ trước}}',
      FUTURE:'{N,plural,other{sau {N} giờ nữa}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'phút này'},
      PAST:'{N,plural,other{{N} phút trước}}',
      FUTURE:'{N,plural,other{sau {N} phút nữa}}',
    },
    SHORT:{
      RELATIVE:{'0':'phút này'},
      PAST:'{N,plural,other{{N} phút trước}}',
      FUTURE:'{N,plural,other{sau {N} phút nữa}}',
    },
    NARROW:{
      RELATIVE:{'0':'phút này'},
      PAST:'{N,plural,other{{N} phút trước}}',
      FUTURE:'{N,plural,other{sau {N} phút nữa}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'tháng trước','0':'tháng này','1':'tháng sau'},
      PAST:'{N,plural,other{{N} tháng trước}}',
      FUTURE:'{N,plural,other{sau {N} tháng nữa}}',
    },
    SHORT:{
      RELATIVE:{'-1':'tháng trước','0':'tháng này','1':'tháng sau'},
      PAST:'{N,plural,other{{N} tháng trước}}',
      FUTURE:'{N,plural,other{sau {N} tháng nữa}}',
    },
    NARROW:{
      RELATIVE:{'-1':'tháng trước','0':'tháng này','1':'tháng sau'},
      PAST:'{N,plural,other{{N} tháng trước}}',
      FUTURE:'{N,plural,other{sau {N} tháng nữa}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'quý trước','0':'quý này','1':'quý sau'},
      PAST:'{N,plural,other{{N} quý trước}}',
      FUTURE:'{N,plural,other{sau {N} quý nữa}}',
    },
    SHORT:{
      RELATIVE:{'-1':'quý trước','0':'quý này','1':'quý sau'},
      PAST:'{N,plural,other{{N} quý trước}}',
      FUTURE:'{N,plural,other{sau {N} quý nữa}}',
    },
    NARROW:{
      RELATIVE:{'-1':'quý trước','0':'quý này','1':'quý sau'},
      PAST:'{N,plural,other{{N} quý trước}}',
      FUTURE:'{N,plural,other{sau {N} quý nữa}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'bây giờ'},
      PAST:'{N,plural,other{{N} giây trước}}',
      FUTURE:'{N,plural,other{sau {N} giây nữa}}',
    },
    SHORT:{
      RELATIVE:{'0':'bây giờ'},
      PAST:'{N,plural,other{{N} giây trước}}',
      FUTURE:'{N,plural,other{sau {N} giây nữa}}',
    },
    NARROW:{
      RELATIVE:{'0':'bây giờ'},
      PAST:'{N,plural,other{{N} giây trước}}',
      FUTURE:'{N,plural,other{sau {N} giây nữa}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'tuần trước','0':'tuần này','1':'tuần sau'},
      PAST:'{N,plural,other{{N} tuần trước}}',
      FUTURE:'{N,plural,other{sau {N} tuần nữa}}',
    },
    SHORT:{
      RELATIVE:{'-1':'tuần trước','0':'tuần này','1':'tuần sau'},
      PAST:'{N,plural,other{{N} tuần trước}}',
      FUTURE:'{N,plural,other{sau {N} tuần nữa}}',
    },
    NARROW:{
      RELATIVE:{'-1':'tuần trước','0':'tuần này','1':'tuần sau'},
      PAST:'{N,plural,other{{N} tuần trước}}',
      FUTURE:'{N,plural,other{sau {N} tuần nữa}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'năm ngoái','0':'năm nay','1':'năm sau'},
      PAST:'{N,plural,other{{N} năm trước}}',
      FUTURE:'{N,plural,other{sau {N} năm nữa}}',
    },
    SHORT:{
      RELATIVE:{'-1':'năm ngoái','0':'năm nay','1':'năm sau'},
      PAST:'{N,plural,other{{N} năm trước}}',
      FUTURE:'{N,plural,other{sau {N} năm nữa}}',
    },
    NARROW:{
      RELATIVE:{'-1':'năm ngoái','0':'năm nay','1':'năm sau'},
      PAST:'{N,plural,other{{N} năm trước}}',
      FUTURE:'{N,plural,other{sau {N} năm nữa}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_zh =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'昨天','-2':'前天','0':'今天','1':'明天','2':'后天'},
      PAST:'{N,plural,other{{N}天前}}',
      FUTURE:'{N,plural,other{{N}天后}}',
    },
    SHORT:{
      RELATIVE:{'-1':'昨天','-2':'前天','0':'今天','1':'明天','2':'后天'},
      PAST:'{N,plural,other{{N}天前}}',
      FUTURE:'{N,plural,other{{N}天后}}',
    },
    NARROW:{
      RELATIVE:{'-1':'昨天','-2':'前天','0':'今天','1':'明天','2':'后天'},
      PAST:'{N,plural,other{{N}天前}}',
      FUTURE:'{N,plural,other{{N}天后}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'这一时间 / 此时'},
      PAST:'{N,plural,other{{N}小时前}}',
      FUTURE:'{N,plural,other{{N}小时后}}',
    },
    SHORT:{
      RELATIVE:{'0':'这一时间 / 此时'},
      PAST:'{N,plural,other{{N}小时前}}',
      FUTURE:'{N,plural,other{{N}小时后}}',
    },
    NARROW:{
      RELATIVE:{'0':'这一时间 / 此时'},
      PAST:'{N,plural,other{{N}小时前}}',
      FUTURE:'{N,plural,other{{N}小时后}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'此刻'},
      PAST:'{N,plural,other{{N}分钟前}}',
      FUTURE:'{N,plural,other{{N}分钟后}}',
    },
    SHORT:{
      RELATIVE:{'0':'此刻'},
      PAST:'{N,plural,other{{N}分钟前}}',
      FUTURE:'{N,plural,other{{N}分钟后}}',
    },
    NARROW:{
      RELATIVE:{'0':'此刻'},
      PAST:'{N,plural,other{{N}分钟前}}',
      FUTURE:'{N,plural,other{{N}分钟后}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'上个月','0':'本月','1':'下个月'},
      PAST:'{N,plural,other{{N}个月前}}',
      FUTURE:'{N,plural,other{{N}个月后}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上个月','0':'本月','1':'下个月'},
      PAST:'{N,plural,other{{N}个月前}}',
      FUTURE:'{N,plural,other{{N}个月后}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上个月','0':'本月','1':'下个月'},
      PAST:'{N,plural,other{{N}个月前}}',
      FUTURE:'{N,plural,other{{N}个月后}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'上季度','0':'本季度','1':'下季度'},
      PAST:'{N,plural,other{{N}个季度前}}',
      FUTURE:'{N,plural,other{{N}个季度后}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上季度','0':'本季度','1':'下季度'},
      PAST:'{N,plural,other{{N}个季度前}}',
      FUTURE:'{N,plural,other{{N}个季度后}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上季度','0':'本季度','1':'下季度'},
      PAST:'{N,plural,other{{N}个季度前}}',
      FUTURE:'{N,plural,other{{N}个季度后}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'现在'},
      PAST:'{N,plural,other{{N}秒钟前}}',
      FUTURE:'{N,plural,other{{N}秒钟后}}',
    },
    SHORT:{
      RELATIVE:{'0':'现在'},
      PAST:'{N,plural,other{{N}秒前}}',
      FUTURE:'{N,plural,other{{N}秒后}}',
    },
    NARROW:{
      RELATIVE:{'0':'现在'},
      PAST:'{N,plural,other{{N}秒前}}',
      FUTURE:'{N,plural,other{{N}秒后}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'上周','0':'本周','1':'下周'},
      PAST:'{N,plural,other{{N}周前}}',
      FUTURE:'{N,plural,other{{N}周后}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上周','0':'本周','1':'下周'},
      PAST:'{N,plural,other{{N}周前}}',
      FUTURE:'{N,plural,other{{N}周后}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上周','0':'本周','1':'下周'},
      PAST:'{N,plural,other{{N}周前}}',
      FUTURE:'{N,plural,other{{N}周后}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'去年','0':'今年','1':'明年'},
      PAST:'{N,plural,other{{N}年前}}',
      FUTURE:'{N,plural,other{{N}年后}}',
    },
    SHORT:{
      RELATIVE:{'-1':'去年','0':'今年','1':'明年'},
      PAST:'{N,plural,other{{N}年前}}',
      FUTURE:'{N,plural,other{{N}年后}}',
    },
    NARROW:{
      RELATIVE:{'-1':'去年','0':'今年','1':'明年'},
      PAST:'{N,plural,other{{N}年前}}',
      FUTURE:'{N,plural,other{{N}年后}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_zh_CN = exports.RelativeDateTimeSymbols_zh;

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_zh_HK =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'昨日','-2':'前日','0':'今日','1':'明日','2':'後日'},
      PAST:'{N,plural,other{{N} 日前}}',
      FUTURE:'{N,plural,other{{N} 日後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'昨日','-2':'前日','0':'今日','1':'明日','2':'後日'},
      PAST:'{N,plural,other{{N} 日前}}',
      FUTURE:'{N,plural,other{{N} 日後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'昨日','-2':'前日','0':'今日','1':'明日','2':'後日'},
      PAST:'{N,plural,other{{N}日前}}',
      FUTURE:'{N,plural,other{{N}日後}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'這個小時'},
      PAST:'{N,plural,other{{N} 小時前}}',
      FUTURE:'{N,plural,other{{N} 小時後}}',
    },
    SHORT:{
      RELATIVE:{'0':'這個小時'},
      PAST:'{N,plural,other{{N} 小時前}}',
      FUTURE:'{N,plural,other{{N} 小時後}}',
    },
    NARROW:{
      RELATIVE:{'0':'這個小時'},
      PAST:'{N,plural,other{{N}小時前}}',
      FUTURE:'{N,plural,other{{N}小時後}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'這分鐘'},
      PAST:'{N,plural,other{{N} 分鐘前}}',
      FUTURE:'{N,plural,other{{N} 分鐘後}}',
    },
    SHORT:{
      RELATIVE:{'0':'這分鐘'},
      PAST:'{N,plural,other{{N} 分鐘前}}',
      FUTURE:'{N,plural,other{{N} 分鐘後}}',
    },
    NARROW:{
      RELATIVE:{'0':'這分鐘'},
      PAST:'{N,plural,other{{N}分前}}',
      FUTURE:'{N,plural,other{{N}分後}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'上個月','0':'本月','1':'下個月'},
      PAST:'{N,plural,other{{N} 個月前}}',
      FUTURE:'{N,plural,other{{N} 個月後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上個月','0':'本月','1':'下個月'},
      PAST:'{N,plural,other{{N} 個月前}}',
      FUTURE:'{N,plural,other{{N} 個月後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上個月','0':'本月','1':'下個月'},
      PAST:'{N,plural,other{{N}個月前}}',
      FUTURE:'{N,plural,other{{N}個月後}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'上一季','0':'今季','1':'下一季'},
      PAST:'{N,plural,other{{N} 季前}}',
      FUTURE:'{N,plural,other{{N} 季後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上季','0':'今季','1':'下季'},
      PAST:'{N,plural,other{{N} 季前}}',
      FUTURE:'{N,plural,other{{N} 季後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上季','0':'今季','1':'下季'},
      PAST:'{N,plural,other{-{N}Q}}',
      FUTURE:'{N,plural,other{+{N}Q}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'現在'},
      PAST:'{N,plural,other{{N} 秒前}}',
      FUTURE:'{N,plural,other{{N} 秒後}}',
    },
    SHORT:{
      RELATIVE:{'0':'現在'},
      PAST:'{N,plural,other{{N} 秒前}}',
      FUTURE:'{N,plural,other{{N} 秒後}}',
    },
    NARROW:{
      RELATIVE:{'0':'現在'},
      PAST:'{N,plural,other{{N}秒前}}',
      FUTURE:'{N,plural,other{{N}秒後}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'上星期','0':'本星期','1':'下星期'},
      PAST:'{N,plural,other{{N} 星期前}}',
      FUTURE:'{N,plural,other{{N} 星期後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上星期','0':'本星期','1':'下星期'},
      PAST:'{N,plural,other{{N} 星期前}}',
      FUTURE:'{N,plural,other{{N} 星期後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上星期','0':'本星期','1':'下星期'},
      PAST:'{N,plural,other{{N}星期前}}',
      FUTURE:'{N,plural,other{{N}星期後}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'上年','0':'今年','1':'下年'},
      PAST:'{N,plural,other{{N} 年前}}',
      FUTURE:'{N,plural,other{{N} 年後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上年','0':'今年','1':'下年'},
      PAST:'{N,plural,other{{N} 年前}}',
      FUTURE:'{N,plural,other{{N} 年後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上年','0':'今年','1':'下年'},
      PAST:'{N,plural,other{{N}年前}}',
      FUTURE:'{N,plural,other{{N}年後}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_zh_TW =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'昨天','-2':'前天','0':'今天','1':'明天','2':'後天'},
      PAST:'{N,plural,other{{N} 天前}}',
      FUTURE:'{N,plural,other{{N} 天後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'昨天','-2':'前天','0':'今天','1':'明天','2':'後天'},
      PAST:'{N,plural,other{{N} 天前}}',
      FUTURE:'{N,plural,other{{N} 天後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'昨天','-2':'前天','0':'今天','1':'明天','2':'後天'},
      PAST:'{N,plural,other{{N} 天前}}',
      FUTURE:'{N,plural,other{{N} 天後}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'這一小時'},
      PAST:'{N,plural,other{{N} 小時前}}',
      FUTURE:'{N,plural,other{{N} 小時後}}',
    },
    SHORT:{
      RELATIVE:{'0':'這一小時'},
      PAST:'{N,plural,other{{N} 小時前}}',
      FUTURE:'{N,plural,other{{N} 小時後}}',
    },
    NARROW:{
      RELATIVE:{'0':'這一小時'},
      PAST:'{N,plural,other{{N} 小時前}}',
      FUTURE:'{N,plural,other{{N} 小時後}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'這一分鐘'},
      PAST:'{N,plural,other{{N} 分鐘前}}',
      FUTURE:'{N,plural,other{{N} 分鐘後}}',
    },
    SHORT:{
      RELATIVE:{'0':'這一分鐘'},
      PAST:'{N,plural,other{{N} 分鐘前}}',
      FUTURE:'{N,plural,other{{N} 分鐘後}}',
    },
    NARROW:{
      RELATIVE:{'0':'這一分鐘'},
      PAST:'{N,plural,other{{N} 分鐘前}}',
      FUTURE:'{N,plural,other{{N} 分鐘後}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'上個月','0':'本月','1':'下個月'},
      PAST:'{N,plural,other{{N} 個月前}}',
      FUTURE:'{N,plural,other{{N} 個月後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上個月','0':'本月','1':'下個月'},
      PAST:'{N,plural,other{{N} 個月前}}',
      FUTURE:'{N,plural,other{{N} 個月後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上個月','0':'本月','1':'下個月'},
      PAST:'{N,plural,other{{N} 個月前}}',
      FUTURE:'{N,plural,other{{N} 個月後}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'上一季','0':'這一季','1':'下一季'},
      PAST:'{N,plural,other{{N} 季前}}',
      FUTURE:'{N,plural,other{{N} 季後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上一季','0':'這一季','1':'下一季'},
      PAST:'{N,plural,other{{N} 季前}}',
      FUTURE:'{N,plural,other{{N} 季後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上一季','0':'這一季','1':'下一季'},
      PAST:'{N,plural,other{{N} 季前}}',
      FUTURE:'{N,plural,other{{N} 季後}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'現在'},
      PAST:'{N,plural,other{{N} 秒前}}',
      FUTURE:'{N,plural,other{{N} 秒後}}',
    },
    SHORT:{
      RELATIVE:{'0':'現在'},
      PAST:'{N,plural,other{{N} 秒前}}',
      FUTURE:'{N,plural,other{{N} 秒後}}',
    },
    NARROW:{
      RELATIVE:{'0':'現在'},
      PAST:'{N,plural,other{{N} 秒前}}',
      FUTURE:'{N,plural,other{{N} 秒後}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'上週','0':'本週','1':'下週'},
      PAST:'{N,plural,other{{N} 週前}}',
      FUTURE:'{N,plural,other{{N} 週後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'上週','0':'本週','1':'下週'},
      PAST:'{N,plural,other{{N} 週前}}',
      FUTURE:'{N,plural,other{{N} 週後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'上週','0':'本週','1':'下週'},
      PAST:'{N,plural,other{{N} 週前}}',
      FUTURE:'{N,plural,other{{N} 週後}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'去年','0':'今年','1':'明年'},
      PAST:'{N,plural,other{{N} 年前}}',
      FUTURE:'{N,plural,other{{N} 年後}}',
    },
    SHORT:{
      RELATIVE:{'-1':'去年','0':'今年','1':'明年'},
      PAST:'{N,plural,other{{N} 年前}}',
      FUTURE:'{N,plural,other{{N} 年後}}',
    },
    NARROW:{
      RELATIVE:{'-1':'去年','0':'今年','1':'明年'},
      PAST:'{N,plural,other{{N} 年前}}',
      FUTURE:'{N,plural,other{{N} 年後}}',
    },
  },
};

/** const {RelativeDateTimeSymbols} */
exports.RelativeDateTimeSymbols_zu =  {
  DAY: {
    LONG:{
      RELATIVE:{'-1':'izolo','-2':'usuku olwandulela olwayizolo','0':'namhlanje','1':'kusasa','2':'usuku olulandela olwakusasa'},
      PAST:'{N,plural,one{osukwini olungu-{N} olwedlule}other{ezinsukwini ezingu-{N} ezedlule.}}',
      FUTURE:'{N,plural,one{osukwini olungu-{N} oluzayo}other{ezinsukwini ezingu-{N} ezizayo}}',
    },
    SHORT:{
      RELATIVE:{'-1':'izolo','0':'namhlanje','1':'kusasa'},
      PAST:'{N,plural,one{{N} usuku olwedlule}other{{N} izinsuku ezedlule}}',
      FUTURE:'{N,plural,one{osukwini olungu-{N} oluzayo}other{ezinsukwini ezingu-{N} ezizayo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'izolo','0':'namhlanje','1':'kusasa'},
      PAST:'{N,plural,one{{N} usuku olwedlule}other{{N} izinsuku ezedlule}}',
      FUTURE:'{N,plural,one{osukwini olungu-{N} oluzayo}other{ezinsukwini ezingu-{N} ezizayo}}',
    },
  },
  HOUR: {
    LONG:{
      RELATIVE:{'0':'leli hora'},
      PAST:'{N,plural,one{{N} ihora eledlule}other{emahoreni angu-{N} edlule}}',
      FUTURE:'{N,plural,one{ehoreni elingu-{N} elizayo}other{emahoreni angu-{N} ezayo}}',
    },
    SHORT:{
      RELATIVE:{'0':'leli hora'},
      PAST:'{N,plural,one{{N} ihora eledlule}other{emahoreni angu-{N} edlule}}',
      FUTURE:'{N,plural,one{ehoreni elingu-{N} elizayo}other{emahoreni angu-{N} ezayo}}',
    },
    NARROW:{
      RELATIVE:{'0':'leli hora'},
      PAST:'{N,plural,one{{N} ihora eledlule}other{{N} amahora edlule}}',
      FUTURE:'{N,plural,one{ehoreni elingu-{N} elizayo}other{emahoreni angu-{N} ezayo}}',
    },
  },
  MINUTE: {
    LONG:{
      RELATIVE:{'0':'leli minithi'},
      PAST:'{N,plural,one{{N} iminithi eledlule}other{{N} amaminithi edlule}}',
      FUTURE:'{N,plural,one{kuminithi elingu-{N} elizayo}other{kumaminithi angu-{N} ezayo}}',
    },
    SHORT:{
      RELATIVE:{'0':'leli minithi'},
      PAST:'{N,plural,one{{N} iminithi eledlule}other{{N} amaminithi edlule}}',
      FUTURE:'{N,plural,one{kuminithi elingu-{N} elizayo}other{kumaminithi angu-{N} ezayo}}',
    },
    NARROW:{
      RELATIVE:{'0':'leli minithi'},
      PAST:'{N,plural,one{{N} iminithi eledlule}other{{N} amaminithi edlule}}',
      FUTURE:'{N,plural,one{kuminithi elingu-{N} elizayo}other{kumaminithi angu-{N} ezayo}}',
    },
  },
  MONTH: {
    LONG:{
      RELATIVE:{'-1':'inyanga edlule','0':'le nyanga','1':'inyanga ezayo'},
      PAST:'{N,plural,one{{N} inyanga edlule}other{{N} izinyanga ezedlule}}',
      FUTURE:'{N,plural,one{enyangeni engu-{N}}other{ezinyangeni ezingu-{N} ezizayo}}',
    },
    SHORT:{
      RELATIVE:{'-1':'inyanga edlule','0':'le nyanga','1':'inyanga ezayo'},
      PAST:'{N,plural,one{{N} izinyanga ezedlule}other{{N} izinyanga ezedlule}}',
      FUTURE:'{N,plural,one{ezinyangeni ezingu-{N} ezizayo}other{ezinyangeni ezingu-{N} ezizayo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'inyanga edlule','0':'le nyanga','1':'inyanga ezayo'},
      PAST:'{N,plural,one{{N} izinyanga ezedlule}other{{N} izinyanga ezedlule}}',
      FUTURE:'{N,plural,one{enyangeni engu-{N} ezayo}other{enyangeni engu-{N} ezayo}}',
    },
  },
  QUARTER: {
    LONG:{
      RELATIVE:{'-1':'ikota edlule','0':'le kota','1':'ikota ezayo'},
      PAST:'{N,plural,one{{N} ikota edlule}other{{N} amakota adlule}}',
      FUTURE:'{N,plural,one{kwikota engu-{N} ezayo}other{kumakota angu-{N} ezayo}}',
    },
    SHORT:{
      RELATIVE:{'-1':'ikota edlule','0':'le kota','1':'ikota ezayo'},
      PAST:'{N,plural,one{{N} amakota adlule}other{{N} amakota edlule}}',
      FUTURE:'{N,plural,one{kwikota engu-{N} ezayo}other{kumakota angu-{N} ezayo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'ikota edlule','0':'le kota','1':'ikota ezayo'},
      PAST:'{N,plural,one{{N} amakota adlule}other{{N} amakota edlule}}',
      FUTURE:'{N,plural,one{kumakota angu-{N}}other{kumakota angu-{N}}}',
    },
  },
  SECOND: {
    LONG:{
      RELATIVE:{'0':'manje'},
      PAST:'{N,plural,one{{N} isekhondi eledlule}other{{N} amasekhondi edlule}}',
      FUTURE:'{N,plural,one{kusekhondi elingu-{N} elizayo}other{kumasekhondi angu-{N} ezayo}}',
    },
    SHORT:{
      RELATIVE:{'0':'manje'},
      PAST:'{N,plural,one{{N} isekhondi eledlule}other{{N} amasekhondi edlule}}',
      FUTURE:'{N,plural,one{kusekhondi elingu-{N} elizayo}other{kumasekhondi angu-{N} ezayo}}',
    },
    NARROW:{
      RELATIVE:{'0':'manje'},
      PAST:'{N,plural,one{{N} isekhondi eledlule}other{{N} amasekhondi edlule}}',
      FUTURE:'{N,plural,one{kusekhondi elingu-{N} elizayo}other{kumasekhondi angu-{N} ezayo}}',
    },
  },
  WEEK: {
    LONG:{
      RELATIVE:{'-1':'iviki eledlule','0':'leli viki','1':'iviki elizayo'},
      PAST:'{N,plural,one{evikini elingu-{N} eledlule}other{amaviki angu-{N} edlule}}',
      FUTURE:'{N,plural,one{evikini elingu-{N}}other{emavikini angu-{N}}}',
    },
    SHORT:{
      RELATIVE:{'-1':'iviki eledlule','0':'leli viki','1':'iviki elizayo'},
      PAST:'{N,plural,one{amaviki angu-{N} edlule}other{amaviki angu-{N} edlule}}',
      FUTURE:'{N,plural,one{evikini elingu-{N} elizayo}other{emavikini angu-{N} ezayo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'iviki eledlule','0':'leli viki','1':'iviki elizayo'},
      PAST:'{N,plural,one{amaviki angu-{N} edlule}other{amaviki angu-{N} edlule}}',
      FUTURE:'{N,plural,one{emavikini angu-{N} ezayo}other{emavikini angu-{N} ezayo}}',
    },
  },
  YEAR: {
    LONG:{
      RELATIVE:{'-1':'onyakeni odlule','0':'kulo nyaka','1':'unyaka ozayo'},
      PAST:'{N,plural,one{{N} unyaka odlule}other{{N} iminyaka edlule}}',
      FUTURE:'{N,plural,one{onyakeni ongu-{N} ozayo}other{eminyakeni engu-{N} ezayo}}',
    },
    SHORT:{
      RELATIVE:{'-1':'onyakeni odlule','0':'kulo nyaka','1':'unyaka ozayo'},
      PAST:'{N,plural,one{{N} unyaka odlule}other{{N} unyaka odlule}}',
      FUTURE:'{N,plural,one{onyakeni ongu-{N} ozayo}other{eminyakeni engu-{N} ezayo}}',
    },
    NARROW:{
      RELATIVE:{'-1':'onyakeni odlule','0':'kulo nyaka','1':'unyaka ozayo'},
      PAST:'{N,plural,one{{N} unyaka odlule}other{{N} unyaka odlule}}',
      FUTURE:'{N,plural,one{onyakeni ongu-{N} ozayo}other{eminyakeni engu-{N} ezayo}}',
    },
  },
};

switch (goog.LOCALE) {
  case 'af':
    defaultSymbols = exports.RelativeDateTimeSymbols_af;
    break;
  case 'am':
    defaultSymbols = exports.RelativeDateTimeSymbols_am;
    break;
  case 'ar':
    defaultSymbols = exports.RelativeDateTimeSymbols_ar;
    break;
  case 'ar_DZ':
  case 'ar-DZ':
    defaultSymbols = exports.RelativeDateTimeSymbols_ar_DZ;
    break;
  case 'ar_EG':
  case 'ar-EG':
    defaultSymbols = exports.RelativeDateTimeSymbols_ar_EG;
    break;
  case 'az':
    defaultSymbols = exports.RelativeDateTimeSymbols_az;
    break;
  case 'be':
    defaultSymbols = exports.RelativeDateTimeSymbols_be;
    break;
  case 'bg':
    defaultSymbols = exports.RelativeDateTimeSymbols_bg;
    break;
  case 'bn':
    defaultSymbols = exports.RelativeDateTimeSymbols_bn;
    break;
  case 'br':
    defaultSymbols = exports.RelativeDateTimeSymbols_br;
    break;
  case 'bs':
    defaultSymbols = exports.RelativeDateTimeSymbols_bs;
    break;
  case 'ca':
    defaultSymbols = exports.RelativeDateTimeSymbols_ca;
    break;
  case 'chr':
    defaultSymbols = exports.RelativeDateTimeSymbols_chr;
    break;
  case 'cs':
    defaultSymbols = exports.RelativeDateTimeSymbols_cs;
    break;
  case 'cy':
    defaultSymbols = exports.RelativeDateTimeSymbols_cy;
    break;
  case 'da':
    defaultSymbols = exports.RelativeDateTimeSymbols_da;
    break;
  case 'de':
    defaultSymbols = exports.RelativeDateTimeSymbols_de;
    break;
  case 'de_AT':
  case 'de-AT':
    defaultSymbols = exports.RelativeDateTimeSymbols_de_AT;
    break;
  case 'de_CH':
  case 'de-CH':
    defaultSymbols = exports.RelativeDateTimeSymbols_de_CH;
    break;
  case 'el':
    defaultSymbols = exports.RelativeDateTimeSymbols_el;
    break;
  case 'en':
    defaultSymbols = exports.RelativeDateTimeSymbols_en;
    break;
  case 'en_AU':
  case 'en-AU':
    defaultSymbols = exports.RelativeDateTimeSymbols_en_AU;
    break;
  case 'en_CA':
  case 'en-CA':
    defaultSymbols = exports.RelativeDateTimeSymbols_en_CA;
    break;
  case 'en_GB':
  case 'en-GB':
    defaultSymbols = exports.RelativeDateTimeSymbols_en_GB;
    break;
  case 'en_IE':
  case 'en-IE':
    defaultSymbols = exports.RelativeDateTimeSymbols_en_IE;
    break;
  case 'en_IN':
  case 'en-IN':
    defaultSymbols = exports.RelativeDateTimeSymbols_en_IN;
    break;
  case 'en_SG':
  case 'en-SG':
    defaultSymbols = exports.RelativeDateTimeSymbols_en_SG;
    break;
  case 'en_US':
  case 'en-US':
    defaultSymbols = exports.RelativeDateTimeSymbols_en_US;
    break;
  case 'en_ZA':
  case 'en-ZA':
    defaultSymbols = exports.RelativeDateTimeSymbols_en_ZA;
    break;
  case 'es':
    defaultSymbols = exports.RelativeDateTimeSymbols_es;
    break;
  case 'es_419':
  case 'es-419':
    defaultSymbols = exports.RelativeDateTimeSymbols_es_419;
    break;
  case 'es_ES':
  case 'es-ES':
    defaultSymbols = exports.RelativeDateTimeSymbols_es_ES;
    break;
  case 'es_MX':
  case 'es-MX':
    defaultSymbols = exports.RelativeDateTimeSymbols_es_MX;
    break;
  case 'es_US':
  case 'es-US':
    defaultSymbols = exports.RelativeDateTimeSymbols_es_US;
    break;
  case 'et':
    defaultSymbols = exports.RelativeDateTimeSymbols_et;
    break;
  case 'eu':
    defaultSymbols = exports.RelativeDateTimeSymbols_eu;
    break;
  case 'fa':
    defaultSymbols = exports.RelativeDateTimeSymbols_fa;
    break;
  case 'fi':
    defaultSymbols = exports.RelativeDateTimeSymbols_fi;
    break;
  case 'fil':
    defaultSymbols = exports.RelativeDateTimeSymbols_fil;
    break;
  case 'fr':
    defaultSymbols = exports.RelativeDateTimeSymbols_fr;
    break;
  case 'fr_CA':
  case 'fr-CA':
    defaultSymbols = exports.RelativeDateTimeSymbols_fr_CA;
    break;
  case 'ga':
    defaultSymbols = exports.RelativeDateTimeSymbols_ga;
    break;
  case 'gl':
    defaultSymbols = exports.RelativeDateTimeSymbols_gl;
    break;
  case 'gsw':
    defaultSymbols = exports.RelativeDateTimeSymbols_gsw;
    break;
  case 'gu':
    defaultSymbols = exports.RelativeDateTimeSymbols_gu;
    break;
  case 'haw':
    defaultSymbols = exports.RelativeDateTimeSymbols_haw;
    break;
  case 'he':
    defaultSymbols = exports.RelativeDateTimeSymbols_he;
    break;
  case 'hi':
    defaultSymbols = exports.RelativeDateTimeSymbols_hi;
    break;
  case 'hr':
    defaultSymbols = exports.RelativeDateTimeSymbols_hr;
    break;
  case 'hu':
    defaultSymbols = exports.RelativeDateTimeSymbols_hu;
    break;
  case 'hy':
    defaultSymbols = exports.RelativeDateTimeSymbols_hy;
    break;
  case 'id':
    defaultSymbols = exports.RelativeDateTimeSymbols_id;
    break;
  case 'in':
    defaultSymbols = exports.RelativeDateTimeSymbols_in;
    break;
  case 'is':
    defaultSymbols = exports.RelativeDateTimeSymbols_is;
    break;
  case 'it':
    defaultSymbols = exports.RelativeDateTimeSymbols_it;
    break;
  case 'iw':
    defaultSymbols = exports.RelativeDateTimeSymbols_iw;
    break;
  case 'ja':
    defaultSymbols = exports.RelativeDateTimeSymbols_ja;
    break;
  case 'ka':
    defaultSymbols = exports.RelativeDateTimeSymbols_ka;
    break;
  case 'kk':
    defaultSymbols = exports.RelativeDateTimeSymbols_kk;
    break;
  case 'km':
    defaultSymbols = exports.RelativeDateTimeSymbols_km;
    break;
  case 'kn':
    defaultSymbols = exports.RelativeDateTimeSymbols_kn;
    break;
  case 'ko':
    defaultSymbols = exports.RelativeDateTimeSymbols_ko;
    break;
  case 'ky':
    defaultSymbols = exports.RelativeDateTimeSymbols_ky;
    break;
  case 'ln':
    defaultSymbols = exports.RelativeDateTimeSymbols_ln;
    break;
  case 'lo':
    defaultSymbols = exports.RelativeDateTimeSymbols_lo;
    break;
  case 'lt':
    defaultSymbols = exports.RelativeDateTimeSymbols_lt;
    break;
  case 'lv':
    defaultSymbols = exports.RelativeDateTimeSymbols_lv;
    break;
  case 'mk':
    defaultSymbols = exports.RelativeDateTimeSymbols_mk;
    break;
  case 'ml':
    defaultSymbols = exports.RelativeDateTimeSymbols_ml;
    break;
  case 'mn':
    defaultSymbols = exports.RelativeDateTimeSymbols_mn;
    break;
  case 'mo':
    defaultSymbols = exports.RelativeDateTimeSymbols_mo;
    break;
  case 'mr':
    defaultSymbols = exports.RelativeDateTimeSymbols_mr;
    break;
  case 'ms':
    defaultSymbols = exports.RelativeDateTimeSymbols_ms;
    break;
  case 'mt':
    defaultSymbols = exports.RelativeDateTimeSymbols_mt;
    break;
  case 'my':
    defaultSymbols = exports.RelativeDateTimeSymbols_my;
    break;
  case 'nb':
    defaultSymbols = exports.RelativeDateTimeSymbols_nb;
    break;
  case 'ne':
    defaultSymbols = exports.RelativeDateTimeSymbols_ne;
    break;
  case 'nl':
    defaultSymbols = exports.RelativeDateTimeSymbols_nl;
    break;
  case 'no':
    defaultSymbols = exports.RelativeDateTimeSymbols_no;
    break;
  case 'no_NO':
  case 'no-NO':
    defaultSymbols = exports.RelativeDateTimeSymbols_no_NO;
    break;
  case 'or':
    defaultSymbols = exports.RelativeDateTimeSymbols_or;
    break;
  case 'pa':
    defaultSymbols = exports.RelativeDateTimeSymbols_pa;
    break;
  case 'pl':
    defaultSymbols = exports.RelativeDateTimeSymbols_pl;
    break;
  case 'pt':
    defaultSymbols = exports.RelativeDateTimeSymbols_pt;
    break;
  case 'pt_BR':
  case 'pt-BR':
    defaultSymbols = exports.RelativeDateTimeSymbols_pt_BR;
    break;
  case 'pt_PT':
  case 'pt-PT':
    defaultSymbols = exports.RelativeDateTimeSymbols_pt_PT;
    break;
  case 'ro':
    defaultSymbols = exports.RelativeDateTimeSymbols_ro;
    break;
  case 'ru':
    defaultSymbols = exports.RelativeDateTimeSymbols_ru;
    break;
  case 'sh':
    defaultSymbols = exports.RelativeDateTimeSymbols_sh;
    break;
  case 'si':
    defaultSymbols = exports.RelativeDateTimeSymbols_si;
    break;
  case 'sk':
    defaultSymbols = exports.RelativeDateTimeSymbols_sk;
    break;
  case 'sl':
    defaultSymbols = exports.RelativeDateTimeSymbols_sl;
    break;
  case 'sq':
    defaultSymbols = exports.RelativeDateTimeSymbols_sq;
    break;
  case 'sr':
    defaultSymbols = exports.RelativeDateTimeSymbols_sr;
    break;
  case 'sr_Latn':
  case 'sr-Latn':
    defaultSymbols = exports.RelativeDateTimeSymbols_sr_Latn;
    break;
  case 'sv':
    defaultSymbols = exports.RelativeDateTimeSymbols_sv;
    break;
  case 'sw':
    defaultSymbols = exports.RelativeDateTimeSymbols_sw;
    break;
  case 'ta':
    defaultSymbols = exports.RelativeDateTimeSymbols_ta;
    break;
  case 'te':
    defaultSymbols = exports.RelativeDateTimeSymbols_te;
    break;
  case 'th':
    defaultSymbols = exports.RelativeDateTimeSymbols_th;
    break;
  case 'tl':
    defaultSymbols = exports.RelativeDateTimeSymbols_tl;
    break;
  case 'tr':
    defaultSymbols = exports.RelativeDateTimeSymbols_tr;
    break;
  case 'uk':
    defaultSymbols = exports.RelativeDateTimeSymbols_uk;
    break;
  case 'ur':
    defaultSymbols = exports.RelativeDateTimeSymbols_ur;
    break;
  case 'uz':
    defaultSymbols = exports.RelativeDateTimeSymbols_uz;
    break;
  case 'vi':
    defaultSymbols = exports.RelativeDateTimeSymbols_vi;
    break;
  case 'zh':
    defaultSymbols = exports.RelativeDateTimeSymbols_zh;
    break;
  case 'zh_CN':
  case 'zh-CN':
    defaultSymbols = exports.RelativeDateTimeSymbols_zh_CN;
    break;
  case 'zh_HK':
  case 'zh-HK':
    defaultSymbols = exports.RelativeDateTimeSymbols_zh_HK;
    break;
  case 'zh_TW':
  case 'zh-TW':
    defaultSymbols = exports.RelativeDateTimeSymbols_zh_TW;
    break;
  case 'zu':
    defaultSymbols = exports.RelativeDateTimeSymbols_zu;
    break;
  default:
    defaultSymbols = exports.RelativeDateTimeSymbols_en;
}
