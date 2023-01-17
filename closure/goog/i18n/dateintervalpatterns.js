/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Date interval formatting patterns for all locales.
 *
 * File generated from CLDR ver. 42
 *
 * To reduce the file size (which may cause issues in some JS
 * developing environments), this file will only contain locales
 * that are frequently used by web applications. This is defined as
 * proto/closure_locales_data.txt and will change (most likely addition)
 * over time.  Rest of the data can be found in another file named
 * "dateintervalpatternsext.js", which will be generated at
 * the same time together with this file.
 */

// clang-format off

goog.module('goog.i18n.dateIntervalPatterns');

const dateIntervalPatternsCLDR41 = goog.require('goog.i18n.cldr41.dateIntervalPatterns');
const dateIntervalPatternsCLDR42 = goog.require('goog.i18n.cldr42.dateIntervalPatterns');
const dateIntervalSymbols = goog.require('goog.i18n.dateIntervalSymbols');
const {USE_CLDR_NEXT} = goog.require('goog.i18n.cldrversion');
/**
 * Collection of date interval patterns.
 * @typedef {{
 *   YEAR_FULL: !dateIntervalSymbols.DateIntervalPatternMap,
 *   YEAR_FULL_WITH_ERA: !dateIntervalSymbols.DateIntervalPatternMap,
 *   YEAR_MONTH_ABBR: !dateIntervalSymbols.DateIntervalPatternMap,
 *   YEAR_MONTH_FULL: !dateIntervalSymbols.DateIntervalPatternMap,
 *   YEAR_MONTH_SHORT: !dateIntervalSymbols.DateIntervalPatternMap,
 *   MONTH_DAY_ABBR: !dateIntervalSymbols.DateIntervalPatternMap,
 *   MONTH_DAY_FULL: !dateIntervalSymbols.DateIntervalPatternMap,
 *   MONTH_DAY_SHORT: !dateIntervalSymbols.DateIntervalPatternMap,
 *   MONTH_DAY_MEDIUM: !dateIntervalSymbols.DateIntervalPatternMap,
 *   MONTH_DAY_YEAR_MEDIUM: !dateIntervalSymbols.DateIntervalPatternMap,
 *   WEEKDAY_MONTH_DAY_MEDIUM: !dateIntervalSymbols.DateIntervalPatternMap,
 *   WEEKDAY_MONTH_DAY_YEAR_MEDIUM: !dateIntervalSymbols.DateIntervalPatternMap,
 *   DAY_ABBR: !dateIntervalSymbols.DateIntervalPatternMap
 * }}
 */
let DateIntervalPatterns;

/** @typedef {!DateIntervalPatterns} */
exports.DateIntervalPatterns;

/** @type {!DateIntervalPatterns} */
let defaultPatterns;
    
/**
 * Returns the default DateIntervalPatterns.
 * @return {!DateIntervalPatterns}
 */
exports.getDateIntervalPatterns = function() {
  return defaultPatterns;
};

/**
 * Sets the default DateIntervalPatterns.
 * @param {!DateIntervalPatterns} patterns
 */
exports.setDateIntervalPatterns = function(patterns) {
  defaultPatterns = patterns;
};

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_af = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_af : dateIntervalPatternsCLDR41.DateIntervalPatterns_af;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_am = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_am : dateIntervalPatternsCLDR41.DateIntervalPatterns_am;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ar = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ar : dateIntervalPatternsCLDR41.DateIntervalPatterns_ar;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ar_DZ = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ar_DZ : dateIntervalPatternsCLDR41.DateIntervalPatterns_ar_DZ;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ar_EG = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ar_EG : dateIntervalPatternsCLDR41.DateIntervalPatterns_ar_EG;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_az = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_az : dateIntervalPatternsCLDR41.DateIntervalPatterns_az;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_be = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_be : dateIntervalPatternsCLDR41.DateIntervalPatterns_be;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_bg = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_bg : dateIntervalPatternsCLDR41.DateIntervalPatterns_bg;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_bn = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_bn : dateIntervalPatternsCLDR41.DateIntervalPatterns_bn;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_br = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_br : dateIntervalPatternsCLDR41.DateIntervalPatterns_br;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_bs = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_bs : dateIntervalPatternsCLDR41.DateIntervalPatterns_bs;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ca = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ca : dateIntervalPatternsCLDR41.DateIntervalPatterns_ca;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_chr = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_chr : dateIntervalPatternsCLDR41.DateIntervalPatterns_chr;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_cs = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_cs : dateIntervalPatternsCLDR41.DateIntervalPatterns_cs;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_cy = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_cy : dateIntervalPatternsCLDR41.DateIntervalPatterns_cy;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_da = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_da : dateIntervalPatternsCLDR41.DateIntervalPatterns_da;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_de = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_de : dateIntervalPatternsCLDR41.DateIntervalPatterns_de;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_de_AT = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_de_AT : dateIntervalPatternsCLDR41.DateIntervalPatterns_de_AT;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_de_CH = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_de_CH : dateIntervalPatternsCLDR41.DateIntervalPatterns_de_CH;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_el = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_el : dateIntervalPatternsCLDR41.DateIntervalPatterns_el;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_en = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_en : dateIntervalPatternsCLDR41.DateIntervalPatterns_en;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_en_AU = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_en_AU : dateIntervalPatternsCLDR41.DateIntervalPatterns_en_AU;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_en_CA = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_en_CA : dateIntervalPatternsCLDR41.DateIntervalPatterns_en_CA;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_en_GB = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_en_GB : dateIntervalPatternsCLDR41.DateIntervalPatterns_en_GB;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_en_IE = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_en_IE : dateIntervalPatternsCLDR41.DateIntervalPatterns_en_IE;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_en_IN = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_en_IN : dateIntervalPatternsCLDR41.DateIntervalPatterns_en_IN;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_en_SG = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_en_SG : dateIntervalPatternsCLDR41.DateIntervalPatterns_en_SG;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_en_US = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_en_US : dateIntervalPatternsCLDR41.DateIntervalPatterns_en_US;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_en_ZA = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_en_ZA : dateIntervalPatternsCLDR41.DateIntervalPatterns_en_ZA;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_es = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_es : dateIntervalPatternsCLDR41.DateIntervalPatterns_es;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_es_419 = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_es_419 : dateIntervalPatternsCLDR41.DateIntervalPatterns_es_419;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_es_ES = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_es_ES : dateIntervalPatternsCLDR41.DateIntervalPatterns_es_ES;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_es_MX = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_es_MX : dateIntervalPatternsCLDR41.DateIntervalPatterns_es_MX;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_es_US = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_es_US : dateIntervalPatternsCLDR41.DateIntervalPatterns_es_US;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_et = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_et : dateIntervalPatternsCLDR41.DateIntervalPatterns_et;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_eu = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_eu : dateIntervalPatternsCLDR41.DateIntervalPatterns_eu;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_fa = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_fa : dateIntervalPatternsCLDR41.DateIntervalPatterns_fa;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_fi = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_fi : dateIntervalPatternsCLDR41.DateIntervalPatterns_fi;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_fil = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_fil : dateIntervalPatternsCLDR41.DateIntervalPatterns_fil;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_fr = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_fr : dateIntervalPatternsCLDR41.DateIntervalPatterns_fr;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_fr_CA = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_fr_CA : dateIntervalPatternsCLDR41.DateIntervalPatterns_fr_CA;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ga = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ga : dateIntervalPatternsCLDR41.DateIntervalPatterns_ga;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_gl = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_gl : dateIntervalPatternsCLDR41.DateIntervalPatterns_gl;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_gsw = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_gsw : dateIntervalPatternsCLDR41.DateIntervalPatterns_gsw;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_gu = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_gu : dateIntervalPatternsCLDR41.DateIntervalPatterns_gu;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_haw = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_haw : dateIntervalPatternsCLDR41.DateIntervalPatterns_haw;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_he = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_he : dateIntervalPatternsCLDR41.DateIntervalPatterns_he;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_hi = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_hi : dateIntervalPatternsCLDR41.DateIntervalPatterns_hi;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_hr = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_hr : dateIntervalPatternsCLDR41.DateIntervalPatterns_hr;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_hu = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_hu : dateIntervalPatternsCLDR41.DateIntervalPatterns_hu;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_hy = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_hy : dateIntervalPatternsCLDR41.DateIntervalPatterns_hy;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_id = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_id : dateIntervalPatternsCLDR41.DateIntervalPatterns_id;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_in = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_in : dateIntervalPatternsCLDR41.DateIntervalPatterns_in;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_is = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_is : dateIntervalPatternsCLDR41.DateIntervalPatterns_is;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_it = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_it : dateIntervalPatternsCLDR41.DateIntervalPatterns_it;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_iw = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_iw : dateIntervalPatternsCLDR41.DateIntervalPatterns_iw;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ja = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ja : dateIntervalPatternsCLDR41.DateIntervalPatterns_ja;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ka = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ka : dateIntervalPatternsCLDR41.DateIntervalPatterns_ka;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_kk = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_kk : dateIntervalPatternsCLDR41.DateIntervalPatterns_kk;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_km = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_km : dateIntervalPatternsCLDR41.DateIntervalPatterns_km;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_kn = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_kn : dateIntervalPatternsCLDR41.DateIntervalPatterns_kn;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ko = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ko : dateIntervalPatternsCLDR41.DateIntervalPatterns_ko;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ky = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ky : dateIntervalPatternsCLDR41.DateIntervalPatterns_ky;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ln = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ln : dateIntervalPatternsCLDR41.DateIntervalPatterns_ln;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_lo = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_lo : dateIntervalPatternsCLDR41.DateIntervalPatterns_lo;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_lt = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_lt : dateIntervalPatternsCLDR41.DateIntervalPatterns_lt;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_lv = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_lv : dateIntervalPatternsCLDR41.DateIntervalPatterns_lv;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_mk = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_mk : dateIntervalPatternsCLDR41.DateIntervalPatterns_mk;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ml = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ml : dateIntervalPatternsCLDR41.DateIntervalPatterns_ml;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_mn = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_mn : dateIntervalPatternsCLDR41.DateIntervalPatterns_mn;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_mo = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_mo : dateIntervalPatternsCLDR41.DateIntervalPatterns_mo;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_mr = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_mr : dateIntervalPatternsCLDR41.DateIntervalPatterns_mr;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ms = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ms : dateIntervalPatternsCLDR41.DateIntervalPatterns_ms;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_mt = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_mt : dateIntervalPatternsCLDR41.DateIntervalPatterns_mt;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_my = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_my : dateIntervalPatternsCLDR41.DateIntervalPatterns_my;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_nb = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_nb : dateIntervalPatternsCLDR41.DateIntervalPatterns_nb;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ne = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ne : dateIntervalPatternsCLDR41.DateIntervalPatterns_ne;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_nl = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_nl : dateIntervalPatternsCLDR41.DateIntervalPatterns_nl;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_no = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_no : dateIntervalPatternsCLDR41.DateIntervalPatterns_no;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_no_NO = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_no_NO : dateIntervalPatternsCLDR41.DateIntervalPatterns_no_NO;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_or = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_or : dateIntervalPatternsCLDR41.DateIntervalPatterns_or;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_pa = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_pa : dateIntervalPatternsCLDR41.DateIntervalPatterns_pa;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_pl = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_pl : dateIntervalPatternsCLDR41.DateIntervalPatterns_pl;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_pt = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_pt : dateIntervalPatternsCLDR41.DateIntervalPatterns_pt;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_pt_BR = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_pt_BR : dateIntervalPatternsCLDR41.DateIntervalPatterns_pt_BR;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_pt_PT = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_pt_PT : dateIntervalPatternsCLDR41.DateIntervalPatterns_pt_PT;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ro = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ro : dateIntervalPatternsCLDR41.DateIntervalPatterns_ro;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ru = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ru : dateIntervalPatternsCLDR41.DateIntervalPatterns_ru;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_sh = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_sh : dateIntervalPatternsCLDR41.DateIntervalPatterns_sh;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_si = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_si : dateIntervalPatternsCLDR41.DateIntervalPatterns_si;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_sk = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_sk : dateIntervalPatternsCLDR41.DateIntervalPatterns_sk;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_sl = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_sl : dateIntervalPatternsCLDR41.DateIntervalPatterns_sl;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_sq = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_sq : dateIntervalPatternsCLDR41.DateIntervalPatterns_sq;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_sr = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_sr : dateIntervalPatternsCLDR41.DateIntervalPatterns_sr;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_sr_Latn = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_sr_Latn : dateIntervalPatternsCLDR41.DateIntervalPatterns_sr_Latn;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_sv = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_sv : dateIntervalPatternsCLDR41.DateIntervalPatterns_sv;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_sw = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_sw : dateIntervalPatternsCLDR41.DateIntervalPatterns_sw;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ta = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ta : dateIntervalPatternsCLDR41.DateIntervalPatterns_ta;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_te = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_te : dateIntervalPatternsCLDR41.DateIntervalPatterns_te;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_th = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_th : dateIntervalPatternsCLDR41.DateIntervalPatterns_th;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_tl = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_tl : dateIntervalPatternsCLDR41.DateIntervalPatterns_tl;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_tr = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_tr : dateIntervalPatternsCLDR41.DateIntervalPatterns_tr;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_uk = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_uk : dateIntervalPatternsCLDR41.DateIntervalPatterns_uk;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_ur = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_ur : dateIntervalPatternsCLDR41.DateIntervalPatterns_ur;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_uz = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_uz : dateIntervalPatternsCLDR41.DateIntervalPatterns_uz;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_vi = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_vi : dateIntervalPatternsCLDR41.DateIntervalPatterns_vi;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_zh = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_zh : dateIntervalPatternsCLDR41.DateIntervalPatterns_zh;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_zh_CN = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_zh_CN : dateIntervalPatternsCLDR41.DateIntervalPatterns_zh_CN;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_zh_HK = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_zh_HK : dateIntervalPatternsCLDR41.DateIntervalPatterns_zh_HK;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_zh_TW = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_zh_TW : dateIntervalPatternsCLDR41.DateIntervalPatterns_zh_TW;

/** @const {!DateIntervalPatterns} */
exports.DateIntervalPatterns_zu = USE_CLDR_NEXT ? dateIntervalPatternsCLDR42.DateIntervalPatterns_zu : dateIntervalPatternsCLDR41.DateIntervalPatterns_zu;

switch (goog.LOCALE) {
  case 'af':
    defaultPatterns = exports.DateIntervalPatterns_af;
    break;
  case 'am':
    defaultPatterns = exports.DateIntervalPatterns_am;
    break;
  case 'ar':
    defaultPatterns = exports.DateIntervalPatterns_ar;
    break;
  case 'ar_DZ':
  case 'ar-DZ':
    defaultPatterns = exports.DateIntervalPatterns_ar_DZ;
    break;
  case 'ar_EG':
  case 'ar-EG':
    defaultPatterns = exports.DateIntervalPatterns_ar_EG;
    break;
  case 'az':
    defaultPatterns = exports.DateIntervalPatterns_az;
    break;
  case 'be':
    defaultPatterns = exports.DateIntervalPatterns_be;
    break;
  case 'bg':
    defaultPatterns = exports.DateIntervalPatterns_bg;
    break;
  case 'bn':
    defaultPatterns = exports.DateIntervalPatterns_bn;
    break;
  case 'br':
    defaultPatterns = exports.DateIntervalPatterns_br;
    break;
  case 'bs':
    defaultPatterns = exports.DateIntervalPatterns_bs;
    break;
  case 'ca':
    defaultPatterns = exports.DateIntervalPatterns_ca;
    break;
  case 'chr':
    defaultPatterns = exports.DateIntervalPatterns_chr;
    break;
  case 'cs':
    defaultPatterns = exports.DateIntervalPatterns_cs;
    break;
  case 'cy':
    defaultPatterns = exports.DateIntervalPatterns_cy;
    break;
  case 'da':
    defaultPatterns = exports.DateIntervalPatterns_da;
    break;
  case 'de':
    defaultPatterns = exports.DateIntervalPatterns_de;
    break;
  case 'de_AT':
  case 'de-AT':
    defaultPatterns = exports.DateIntervalPatterns_de_AT;
    break;
  case 'de_CH':
  case 'de-CH':
    defaultPatterns = exports.DateIntervalPatterns_de_CH;
    break;
  case 'el':
    defaultPatterns = exports.DateIntervalPatterns_el;
    break;
  case 'en':
    defaultPatterns = exports.DateIntervalPatterns_en;
    break;
  case 'en_AU':
  case 'en-AU':
    defaultPatterns = exports.DateIntervalPatterns_en_AU;
    break;
  case 'en_CA':
  case 'en-CA':
    defaultPatterns = exports.DateIntervalPatterns_en_CA;
    break;
  case 'en_GB':
  case 'en-GB':
    defaultPatterns = exports.DateIntervalPatterns_en_GB;
    break;
  case 'en_IE':
  case 'en-IE':
    defaultPatterns = exports.DateIntervalPatterns_en_IE;
    break;
  case 'en_IN':
  case 'en-IN':
    defaultPatterns = exports.DateIntervalPatterns_en_IN;
    break;
  case 'en_SG':
  case 'en-SG':
    defaultPatterns = exports.DateIntervalPatterns_en_SG;
    break;
  case 'en_US':
  case 'en-US':
    defaultPatterns = exports.DateIntervalPatterns_en_US;
    break;
  case 'en_ZA':
  case 'en-ZA':
    defaultPatterns = exports.DateIntervalPatterns_en_ZA;
    break;
  case 'es':
    defaultPatterns = exports.DateIntervalPatterns_es;
    break;
  case 'es_419':
  case 'es-419':
    defaultPatterns = exports.DateIntervalPatterns_es_419;
    break;
  case 'es_ES':
  case 'es-ES':
    defaultPatterns = exports.DateIntervalPatterns_es_ES;
    break;
  case 'es_MX':
  case 'es-MX':
    defaultPatterns = exports.DateIntervalPatterns_es_MX;
    break;
  case 'es_US':
  case 'es-US':
    defaultPatterns = exports.DateIntervalPatterns_es_US;
    break;
  case 'et':
    defaultPatterns = exports.DateIntervalPatterns_et;
    break;
  case 'eu':
    defaultPatterns = exports.DateIntervalPatterns_eu;
    break;
  case 'fa':
    defaultPatterns = exports.DateIntervalPatterns_fa;
    break;
  case 'fi':
    defaultPatterns = exports.DateIntervalPatterns_fi;
    break;
  case 'fil':
    defaultPatterns = exports.DateIntervalPatterns_fil;
    break;
  case 'fr':
    defaultPatterns = exports.DateIntervalPatterns_fr;
    break;
  case 'fr_CA':
  case 'fr-CA':
    defaultPatterns = exports.DateIntervalPatterns_fr_CA;
    break;
  case 'ga':
    defaultPatterns = exports.DateIntervalPatterns_ga;
    break;
  case 'gl':
    defaultPatterns = exports.DateIntervalPatterns_gl;
    break;
  case 'gsw':
    defaultPatterns = exports.DateIntervalPatterns_gsw;
    break;
  case 'gu':
    defaultPatterns = exports.DateIntervalPatterns_gu;
    break;
  case 'haw':
    defaultPatterns = exports.DateIntervalPatterns_haw;
    break;
  case 'he':
    defaultPatterns = exports.DateIntervalPatterns_he;
    break;
  case 'hi':
    defaultPatterns = exports.DateIntervalPatterns_hi;
    break;
  case 'hr':
    defaultPatterns = exports.DateIntervalPatterns_hr;
    break;
  case 'hu':
    defaultPatterns = exports.DateIntervalPatterns_hu;
    break;
  case 'hy':
    defaultPatterns = exports.DateIntervalPatterns_hy;
    break;
  case 'id':
    defaultPatterns = exports.DateIntervalPatterns_id;
    break;
  case 'in':
    defaultPatterns = exports.DateIntervalPatterns_in;
    break;
  case 'is':
    defaultPatterns = exports.DateIntervalPatterns_is;
    break;
  case 'it':
    defaultPatterns = exports.DateIntervalPatterns_it;
    break;
  case 'iw':
    defaultPatterns = exports.DateIntervalPatterns_iw;
    break;
  case 'ja':
    defaultPatterns = exports.DateIntervalPatterns_ja;
    break;
  case 'ka':
    defaultPatterns = exports.DateIntervalPatterns_ka;
    break;
  case 'kk':
    defaultPatterns = exports.DateIntervalPatterns_kk;
    break;
  case 'km':
    defaultPatterns = exports.DateIntervalPatterns_km;
    break;
  case 'kn':
    defaultPatterns = exports.DateIntervalPatterns_kn;
    break;
  case 'ko':
    defaultPatterns = exports.DateIntervalPatterns_ko;
    break;
  case 'ky':
    defaultPatterns = exports.DateIntervalPatterns_ky;
    break;
  case 'ln':
    defaultPatterns = exports.DateIntervalPatterns_ln;
    break;
  case 'lo':
    defaultPatterns = exports.DateIntervalPatterns_lo;
    break;
  case 'lt':
    defaultPatterns = exports.DateIntervalPatterns_lt;
    break;
  case 'lv':
    defaultPatterns = exports.DateIntervalPatterns_lv;
    break;
  case 'mk':
    defaultPatterns = exports.DateIntervalPatterns_mk;
    break;
  case 'ml':
    defaultPatterns = exports.DateIntervalPatterns_ml;
    break;
  case 'mn':
    defaultPatterns = exports.DateIntervalPatterns_mn;
    break;
  case 'mo':
    defaultPatterns = exports.DateIntervalPatterns_mo;
    break;
  case 'mr':
    defaultPatterns = exports.DateIntervalPatterns_mr;
    break;
  case 'ms':
    defaultPatterns = exports.DateIntervalPatterns_ms;
    break;
  case 'mt':
    defaultPatterns = exports.DateIntervalPatterns_mt;
    break;
  case 'my':
    defaultPatterns = exports.DateIntervalPatterns_my;
    break;
  case 'nb':
    defaultPatterns = exports.DateIntervalPatterns_nb;
    break;
  case 'ne':
    defaultPatterns = exports.DateIntervalPatterns_ne;
    break;
  case 'nl':
    defaultPatterns = exports.DateIntervalPatterns_nl;
    break;
  case 'no':
    defaultPatterns = exports.DateIntervalPatterns_no;
    break;
  case 'no_NO':
  case 'no-NO':
    defaultPatterns = exports.DateIntervalPatterns_no_NO;
    break;
  case 'or':
    defaultPatterns = exports.DateIntervalPatterns_or;
    break;
  case 'pa':
    defaultPatterns = exports.DateIntervalPatterns_pa;
    break;
  case 'pl':
    defaultPatterns = exports.DateIntervalPatterns_pl;
    break;
  case 'pt':
    defaultPatterns = exports.DateIntervalPatterns_pt;
    break;
  case 'pt_BR':
  case 'pt-BR':
    defaultPatterns = exports.DateIntervalPatterns_pt_BR;
    break;
  case 'pt_PT':
  case 'pt-PT':
    defaultPatterns = exports.DateIntervalPatterns_pt_PT;
    break;
  case 'ro':
    defaultPatterns = exports.DateIntervalPatterns_ro;
    break;
  case 'ru':
    defaultPatterns = exports.DateIntervalPatterns_ru;
    break;
  case 'sh':
    defaultPatterns = exports.DateIntervalPatterns_sh;
    break;
  case 'si':
    defaultPatterns = exports.DateIntervalPatterns_si;
    break;
  case 'sk':
    defaultPatterns = exports.DateIntervalPatterns_sk;
    break;
  case 'sl':
    defaultPatterns = exports.DateIntervalPatterns_sl;
    break;
  case 'sq':
    defaultPatterns = exports.DateIntervalPatterns_sq;
    break;
  case 'sr':
    defaultPatterns = exports.DateIntervalPatterns_sr;
    break;
  case 'sr_Latn':
  case 'sr-Latn':
    defaultPatterns = exports.DateIntervalPatterns_sr_Latn;
    break;
  case 'sv':
    defaultPatterns = exports.DateIntervalPatterns_sv;
    break;
  case 'sw':
    defaultPatterns = exports.DateIntervalPatterns_sw;
    break;
  case 'ta':
    defaultPatterns = exports.DateIntervalPatterns_ta;
    break;
  case 'te':
    defaultPatterns = exports.DateIntervalPatterns_te;
    break;
  case 'th':
    defaultPatterns = exports.DateIntervalPatterns_th;
    break;
  case 'tl':
    defaultPatterns = exports.DateIntervalPatterns_tl;
    break;
  case 'tr':
    defaultPatterns = exports.DateIntervalPatterns_tr;
    break;
  case 'uk':
    defaultPatterns = exports.DateIntervalPatterns_uk;
    break;
  case 'ur':
    defaultPatterns = exports.DateIntervalPatterns_ur;
    break;
  case 'uz':
    defaultPatterns = exports.DateIntervalPatterns_uz;
    break;
  case 'vi':
    defaultPatterns = exports.DateIntervalPatterns_vi;
    break;
  case 'zh':
    defaultPatterns = exports.DateIntervalPatterns_zh;
    break;
  case 'zh_CN':
  case 'zh-CN':
    defaultPatterns = exports.DateIntervalPatterns_zh_CN;
    break;
  case 'zh_HK':
  case 'zh-HK':
    defaultPatterns = exports.DateIntervalPatterns_zh_HK;
    break;
  case 'zh_TW':
  case 'zh-TW':
    defaultPatterns = exports.DateIntervalPatterns_zh_TW;
    break;
  case 'zu':
    defaultPatterns = exports.DateIntervalPatterns_zu;
    break;
  default:
    defaultPatterns = exports.DateIntervalPatterns_en;
}
