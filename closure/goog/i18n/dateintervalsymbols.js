/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Date interval formatting symbols for all locales.
 *
 * File generated from CLDR ver. 42
 *
 * To reduce the file size (which may cause issues in some JS
 * developing environments), this file will only contain locales
 * that are frequently used by web applications. This is defined as
 * proto/closure_locales_data.txt and will change (most likely addition)
 * over time.  Rest of the data can be found in another file named
 * "dateintervalsymbolsext.js", which will be generated at
 * the same time together with this file.
 */

// clang-format off

goog.module('goog.i18n.dateIntervalSymbols');
const dateIntervalSymbolsCLDR41 = goog.require('goog.i18n.cldr41.dateIntervalSymbols');
const dateIntervalSymbolsCLDR42 = goog.require('goog.i18n.cldr42.dateIntervalSymbols');
const {USE_CLDR_NEXT} = goog.require('goog.i18n.cldrversion');

/**
 * Map containing the interval pattern for every calendar field.
 * @typedef {!Object<string, string>}
 */
let DateIntervalPatternMap;

/** @typedef {!DateIntervalPatternMap} */
exports.DateIntervalPatternMap;

/**
 * Collection of date interval symbols.
 * @typedef {{
 *   FULL_DATE: !DateIntervalPatternMap,
 *   LONG_DATE: !DateIntervalPatternMap,
 *   MEDIUM_DATE: !DateIntervalPatternMap,
 *   SHORT_DATE: !DateIntervalPatternMap,
 *   FULL_TIME: !DateIntervalPatternMap,
 *   LONG_TIME: !DateIntervalPatternMap,
 *   MEDIUM_TIME: !DateIntervalPatternMap,
 *   SHORT_TIME: !DateIntervalPatternMap,
 *   FULL_DATETIME: !DateIntervalPatternMap,
 *   LONG_DATETIME: !DateIntervalPatternMap,
 *   MEDIUM_DATETIME: !DateIntervalPatternMap,
 *   SHORT_DATETIME: !DateIntervalPatternMap,
 *   FALLBACK: string
 * }}
 */
let DateIntervalSymbols;

/** @typedef {!DateIntervalSymbols} */
exports.DateIntervalSymbols;

/** @type {!DateIntervalSymbols} */
let defaultSymbols;

/**
 * Returns the default DateIntervalSymbols.
 * @return {!DateIntervalSymbols}
 */
exports.getDateIntervalSymbols = function() {
  return defaultSymbols;
};

/**
 * Sets the default DateIntervalSymbols.
 * @param {!DateIntervalSymbols} symbols
 */
exports.setDateIntervalSymbols = function(symbols) {
  defaultSymbols = symbols;
};

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_af = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_af : dateIntervalSymbolsCLDR41.DateIntervalSymbols_af;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_am = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_am : dateIntervalSymbolsCLDR41.DateIntervalSymbols_am;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ar = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ar : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ar;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ar_DZ = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ar_DZ : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ar_DZ;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ar_EG = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ar_EG : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ar_EG;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_az = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_az : dateIntervalSymbolsCLDR41.DateIntervalSymbols_az;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_be = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_be : dateIntervalSymbolsCLDR41.DateIntervalSymbols_be;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_bg = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_bg : dateIntervalSymbolsCLDR41.DateIntervalSymbols_bg;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_bn = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_bn : dateIntervalSymbolsCLDR41.DateIntervalSymbols_bn;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_br = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_br : dateIntervalSymbolsCLDR41.DateIntervalSymbols_br;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_bs = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_bs : dateIntervalSymbolsCLDR41.DateIntervalSymbols_bs;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ca = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ca : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ca;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_chr = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_chr : dateIntervalSymbolsCLDR41.DateIntervalSymbols_chr;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_cs = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_cs : dateIntervalSymbolsCLDR41.DateIntervalSymbols_cs;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_cy = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_cy : dateIntervalSymbolsCLDR41.DateIntervalSymbols_cy;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_da = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_da : dateIntervalSymbolsCLDR41.DateIntervalSymbols_da;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_de = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_de : dateIntervalSymbolsCLDR41.DateIntervalSymbols_de;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_de_AT = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_de_AT : dateIntervalSymbolsCLDR41.DateIntervalSymbols_de_AT;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_de_CH = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_de_CH : dateIntervalSymbolsCLDR41.DateIntervalSymbols_de_CH;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_el = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_el : dateIntervalSymbolsCLDR41.DateIntervalSymbols_el;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_en = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_en : dateIntervalSymbolsCLDR41.DateIntervalSymbols_en;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_en_AU = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_en_AU : dateIntervalSymbolsCLDR41.DateIntervalSymbols_en_AU;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_en_CA = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_en_CA : dateIntervalSymbolsCLDR41.DateIntervalSymbols_en_CA;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_en_GB = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_en_GB : dateIntervalSymbolsCLDR41.DateIntervalSymbols_en_GB;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_en_IE = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_en_IE : dateIntervalSymbolsCLDR41.DateIntervalSymbols_en_IE;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_en_IN = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_en_IN : dateIntervalSymbolsCLDR41.DateIntervalSymbols_en_IN;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_en_SG = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_en_SG : dateIntervalSymbolsCLDR41.DateIntervalSymbols_en_SG;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_en_US = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_en_US : dateIntervalSymbolsCLDR41.DateIntervalSymbols_en_US;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_en_ZA = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_en_ZA : dateIntervalSymbolsCLDR41.DateIntervalSymbols_en_ZA;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_es = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_es : dateIntervalSymbolsCLDR41.DateIntervalSymbols_es;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_es_419 = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_es_419 : dateIntervalSymbolsCLDR41.DateIntervalSymbols_es_419;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_es_ES = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_es_ES : dateIntervalSymbolsCLDR41.DateIntervalSymbols_es_ES;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_es_MX = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_es_MX : dateIntervalSymbolsCLDR41.DateIntervalSymbols_es_MX;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_es_US = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_es_US : dateIntervalSymbolsCLDR41.DateIntervalSymbols_es_US;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_et = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_et : dateIntervalSymbolsCLDR41.DateIntervalSymbols_et;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_eu = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_eu : dateIntervalSymbolsCLDR41.DateIntervalSymbols_eu;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_fa = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_fa : dateIntervalSymbolsCLDR41.DateIntervalSymbols_fa;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_fi = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_fi : dateIntervalSymbolsCLDR41.DateIntervalSymbols_fi;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_fil = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_fil : dateIntervalSymbolsCLDR41.DateIntervalSymbols_fil;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_fr = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_fr : dateIntervalSymbolsCLDR41.DateIntervalSymbols_fr;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_fr_CA = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_fr_CA : dateIntervalSymbolsCLDR41.DateIntervalSymbols_fr_CA;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ga = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ga : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ga;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_gl = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_gl : dateIntervalSymbolsCLDR41.DateIntervalSymbols_gl;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_gsw = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_gsw : dateIntervalSymbolsCLDR41.DateIntervalSymbols_gsw;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_gu = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_gu : dateIntervalSymbolsCLDR41.DateIntervalSymbols_gu;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_haw = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_haw : dateIntervalSymbolsCLDR41.DateIntervalSymbols_haw;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_he = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_he : dateIntervalSymbolsCLDR41.DateIntervalSymbols_he;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_hi = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_hi : dateIntervalSymbolsCLDR41.DateIntervalSymbols_hi;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_hr = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_hr : dateIntervalSymbolsCLDR41.DateIntervalSymbols_hr;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_hu = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_hu : dateIntervalSymbolsCLDR41.DateIntervalSymbols_hu;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_hy = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_hy : dateIntervalSymbolsCLDR41.DateIntervalSymbols_hy;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_id = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_id : dateIntervalSymbolsCLDR41.DateIntervalSymbols_id;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_in = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_in : dateIntervalSymbolsCLDR41.DateIntervalSymbols_in;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_is = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_is : dateIntervalSymbolsCLDR41.DateIntervalSymbols_is;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_it = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_it : dateIntervalSymbolsCLDR41.DateIntervalSymbols_it;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_iw = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_iw : dateIntervalSymbolsCLDR41.DateIntervalSymbols_iw;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ja = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ja : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ja;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ka = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ka : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ka;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_kk = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_kk : dateIntervalSymbolsCLDR41.DateIntervalSymbols_kk;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_km = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_km : dateIntervalSymbolsCLDR41.DateIntervalSymbols_km;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_kn = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_kn : dateIntervalSymbolsCLDR41.DateIntervalSymbols_kn;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ko = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ko : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ko;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ky = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ky : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ky;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ln = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ln : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ln;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_lo = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_lo : dateIntervalSymbolsCLDR41.DateIntervalSymbols_lo;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_lt = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_lt : dateIntervalSymbolsCLDR41.DateIntervalSymbols_lt;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_lv = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_lv : dateIntervalSymbolsCLDR41.DateIntervalSymbols_lv;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_mk = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_mk : dateIntervalSymbolsCLDR41.DateIntervalSymbols_mk;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ml = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ml : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ml;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_mn = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_mn : dateIntervalSymbolsCLDR41.DateIntervalSymbols_mn;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_mo = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_mo : dateIntervalSymbolsCLDR41.DateIntervalSymbols_mo;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_mr = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_mr : dateIntervalSymbolsCLDR41.DateIntervalSymbols_mr;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ms = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ms : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ms;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_mt = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_mt : dateIntervalSymbolsCLDR41.DateIntervalSymbols_mt;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_my = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_my : dateIntervalSymbolsCLDR41.DateIntervalSymbols_my;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_nb = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_nb : dateIntervalSymbolsCLDR41.DateIntervalSymbols_nb;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ne = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ne : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ne;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_nl = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_nl : dateIntervalSymbolsCLDR41.DateIntervalSymbols_nl;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_no = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_no : dateIntervalSymbolsCLDR41.DateIntervalSymbols_no;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_no_NO = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_no_NO : dateIntervalSymbolsCLDR41.DateIntervalSymbols_no_NO;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_or = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_or : dateIntervalSymbolsCLDR41.DateIntervalSymbols_or;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_pa = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_pa : dateIntervalSymbolsCLDR41.DateIntervalSymbols_pa;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_pl = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_pl : dateIntervalSymbolsCLDR41.DateIntervalSymbols_pl;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_pt = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_pt : dateIntervalSymbolsCLDR41.DateIntervalSymbols_pt;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_pt_BR = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_pt_BR : dateIntervalSymbolsCLDR41.DateIntervalSymbols_pt_BR;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_pt_PT = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_pt_PT : dateIntervalSymbolsCLDR41.DateIntervalSymbols_pt_PT;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ro = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ro : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ro;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ru = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ru : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ru;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_sh = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_sh : dateIntervalSymbolsCLDR41.DateIntervalSymbols_sh;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_si = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_si : dateIntervalSymbolsCLDR41.DateIntervalSymbols_si;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_sk = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_sk : dateIntervalSymbolsCLDR41.DateIntervalSymbols_sk;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_sl = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_sl : dateIntervalSymbolsCLDR41.DateIntervalSymbols_sl;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_sq = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_sq : dateIntervalSymbolsCLDR41.DateIntervalSymbols_sq;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_sr = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_sr : dateIntervalSymbolsCLDR41.DateIntervalSymbols_sr;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_sr_Latn = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_sr_Latn : dateIntervalSymbolsCLDR41.DateIntervalSymbols_sr_Latn;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_sv = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_sv : dateIntervalSymbolsCLDR41.DateIntervalSymbols_sv;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_sw = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_sw : dateIntervalSymbolsCLDR41.DateIntervalSymbols_sw;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ta = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ta : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ta;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_te = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_te : dateIntervalSymbolsCLDR41.DateIntervalSymbols_te;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_th = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_th : dateIntervalSymbolsCLDR41.DateIntervalSymbols_th;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_tl = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_tl : dateIntervalSymbolsCLDR41.DateIntervalSymbols_tl;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_tr = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_tr : dateIntervalSymbolsCLDR41.DateIntervalSymbols_tr;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_uk = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_uk : dateIntervalSymbolsCLDR41.DateIntervalSymbols_uk;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_ur = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_ur : dateIntervalSymbolsCLDR41.DateIntervalSymbols_ur;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_uz = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_uz : dateIntervalSymbolsCLDR41.DateIntervalSymbols_uz;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_vi = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_vi : dateIntervalSymbolsCLDR41.DateIntervalSymbols_vi;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_zh = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_zh : dateIntervalSymbolsCLDR41.DateIntervalSymbols_zh;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_zh_CN = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_zh_CN : dateIntervalSymbolsCLDR41.DateIntervalSymbols_zh_CN;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_zh_HK = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_zh_HK : dateIntervalSymbolsCLDR41.DateIntervalSymbols_zh_HK;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_zh_TW = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_zh_TW : dateIntervalSymbolsCLDR41.DateIntervalSymbols_zh_TW;

/** @const {!DateIntervalSymbols} */
exports.DateIntervalSymbols_zu = USE_CLDR_NEXT ? dateIntervalSymbolsCLDR42.DateIntervalSymbols_zu : dateIntervalSymbolsCLDR41.DateIntervalSymbols_zu;

switch (goog.LOCALE) {
  case 'af':
    defaultSymbols = exports.DateIntervalSymbols_af;
    break;
  case 'am':
    defaultSymbols = exports.DateIntervalSymbols_am;
    break;
  case 'ar':
    defaultSymbols = exports.DateIntervalSymbols_ar;
    break;
  case 'ar_DZ':
  case 'ar-DZ':
    defaultSymbols = exports.DateIntervalSymbols_ar_DZ;
    break;
  case 'ar_EG':
  case 'ar-EG':
    defaultSymbols = exports.DateIntervalSymbols_ar_EG;
    break;
  case 'az':
    defaultSymbols = exports.DateIntervalSymbols_az;
    break;
  case 'be':
    defaultSymbols = exports.DateIntervalSymbols_be;
    break;
  case 'bg':
    defaultSymbols = exports.DateIntervalSymbols_bg;
    break;
  case 'bn':
    defaultSymbols = exports.DateIntervalSymbols_bn;
    break;
  case 'br':
    defaultSymbols = exports.DateIntervalSymbols_br;
    break;
  case 'bs':
    defaultSymbols = exports.DateIntervalSymbols_bs;
    break;
  case 'ca':
    defaultSymbols = exports.DateIntervalSymbols_ca;
    break;
  case 'chr':
    defaultSymbols = exports.DateIntervalSymbols_chr;
    break;
  case 'cs':
    defaultSymbols = exports.DateIntervalSymbols_cs;
    break;
  case 'cy':
    defaultSymbols = exports.DateIntervalSymbols_cy;
    break;
  case 'da':
    defaultSymbols = exports.DateIntervalSymbols_da;
    break;
  case 'de':
    defaultSymbols = exports.DateIntervalSymbols_de;
    break;
  case 'de_AT':
  case 'de-AT':
    defaultSymbols = exports.DateIntervalSymbols_de_AT;
    break;
  case 'de_CH':
  case 'de-CH':
    defaultSymbols = exports.DateIntervalSymbols_de_CH;
    break;
  case 'el':
    defaultSymbols = exports.DateIntervalSymbols_el;
    break;
  case 'en':
    defaultSymbols = exports.DateIntervalSymbols_en;
    break;
  case 'en_AU':
  case 'en-AU':
    defaultSymbols = exports.DateIntervalSymbols_en_AU;
    break;
  case 'en_CA':
  case 'en-CA':
    defaultSymbols = exports.DateIntervalSymbols_en_CA;
    break;
  case 'en_GB':
  case 'en-GB':
    defaultSymbols = exports.DateIntervalSymbols_en_GB;
    break;
  case 'en_IE':
  case 'en-IE':
    defaultSymbols = exports.DateIntervalSymbols_en_IE;
    break;
  case 'en_IN':
  case 'en-IN':
    defaultSymbols = exports.DateIntervalSymbols_en_IN;
    break;
  case 'en_SG':
  case 'en-SG':
    defaultSymbols = exports.DateIntervalSymbols_en_SG;
    break;
  case 'en_US':
  case 'en-US':
    defaultSymbols = exports.DateIntervalSymbols_en_US;
    break;
  case 'en_ZA':
  case 'en-ZA':
    defaultSymbols = exports.DateIntervalSymbols_en_ZA;
    break;
  case 'es':
    defaultSymbols = exports.DateIntervalSymbols_es;
    break;
  case 'es_419':
  case 'es-419':
    defaultSymbols = exports.DateIntervalSymbols_es_419;
    break;
  case 'es_ES':
  case 'es-ES':
    defaultSymbols = exports.DateIntervalSymbols_es_ES;
    break;
  case 'es_MX':
  case 'es-MX':
    defaultSymbols = exports.DateIntervalSymbols_es_MX;
    break;
  case 'es_US':
  case 'es-US':
    defaultSymbols = exports.DateIntervalSymbols_es_US;
    break;
  case 'et':
    defaultSymbols = exports.DateIntervalSymbols_et;
    break;
  case 'eu':
    defaultSymbols = exports.DateIntervalSymbols_eu;
    break;
  case 'fa':
    defaultSymbols = exports.DateIntervalSymbols_fa;
    break;
  case 'fi':
    defaultSymbols = exports.DateIntervalSymbols_fi;
    break;
  case 'fil':
    defaultSymbols = exports.DateIntervalSymbols_fil;
    break;
  case 'fr':
    defaultSymbols = exports.DateIntervalSymbols_fr;
    break;
  case 'fr_CA':
  case 'fr-CA':
    defaultSymbols = exports.DateIntervalSymbols_fr_CA;
    break;
  case 'ga':
    defaultSymbols = exports.DateIntervalSymbols_ga;
    break;
  case 'gl':
    defaultSymbols = exports.DateIntervalSymbols_gl;
    break;
  case 'gsw':
    defaultSymbols = exports.DateIntervalSymbols_gsw;
    break;
  case 'gu':
    defaultSymbols = exports.DateIntervalSymbols_gu;
    break;
  case 'haw':
    defaultSymbols = exports.DateIntervalSymbols_haw;
    break;
  case 'he':
    defaultSymbols = exports.DateIntervalSymbols_he;
    break;
  case 'hi':
    defaultSymbols = exports.DateIntervalSymbols_hi;
    break;
  case 'hr':
    defaultSymbols = exports.DateIntervalSymbols_hr;
    break;
  case 'hu':
    defaultSymbols = exports.DateIntervalSymbols_hu;
    break;
  case 'hy':
    defaultSymbols = exports.DateIntervalSymbols_hy;
    break;
  case 'id':
    defaultSymbols = exports.DateIntervalSymbols_id;
    break;
  case 'in':
    defaultSymbols = exports.DateIntervalSymbols_in;
    break;
  case 'is':
    defaultSymbols = exports.DateIntervalSymbols_is;
    break;
  case 'it':
    defaultSymbols = exports.DateIntervalSymbols_it;
    break;
  case 'iw':
    defaultSymbols = exports.DateIntervalSymbols_iw;
    break;
  case 'ja':
    defaultSymbols = exports.DateIntervalSymbols_ja;
    break;
  case 'ka':
    defaultSymbols = exports.DateIntervalSymbols_ka;
    break;
  case 'kk':
    defaultSymbols = exports.DateIntervalSymbols_kk;
    break;
  case 'km':
    defaultSymbols = exports.DateIntervalSymbols_km;
    break;
  case 'kn':
    defaultSymbols = exports.DateIntervalSymbols_kn;
    break;
  case 'ko':
    defaultSymbols = exports.DateIntervalSymbols_ko;
    break;
  case 'ky':
    defaultSymbols = exports.DateIntervalSymbols_ky;
    break;
  case 'ln':
    defaultSymbols = exports.DateIntervalSymbols_ln;
    break;
  case 'lo':
    defaultSymbols = exports.DateIntervalSymbols_lo;
    break;
  case 'lt':
    defaultSymbols = exports.DateIntervalSymbols_lt;
    break;
  case 'lv':
    defaultSymbols = exports.DateIntervalSymbols_lv;
    break;
  case 'mk':
    defaultSymbols = exports.DateIntervalSymbols_mk;
    break;
  case 'ml':
    defaultSymbols = exports.DateIntervalSymbols_ml;
    break;
  case 'mn':
    defaultSymbols = exports.DateIntervalSymbols_mn;
    break;
  case 'mo':
    defaultSymbols = exports.DateIntervalSymbols_mo;
    break;
  case 'mr':
    defaultSymbols = exports.DateIntervalSymbols_mr;
    break;
  case 'ms':
    defaultSymbols = exports.DateIntervalSymbols_ms;
    break;
  case 'mt':
    defaultSymbols = exports.DateIntervalSymbols_mt;
    break;
  case 'my':
    defaultSymbols = exports.DateIntervalSymbols_my;
    break;
  case 'nb':
    defaultSymbols = exports.DateIntervalSymbols_nb;
    break;
  case 'ne':
    defaultSymbols = exports.DateIntervalSymbols_ne;
    break;
  case 'nl':
    defaultSymbols = exports.DateIntervalSymbols_nl;
    break;
  case 'no':
    defaultSymbols = exports.DateIntervalSymbols_no;
    break;
  case 'no_NO':
  case 'no-NO':
    defaultSymbols = exports.DateIntervalSymbols_no_NO;
    break;
  case 'or':
    defaultSymbols = exports.DateIntervalSymbols_or;
    break;
  case 'pa':
    defaultSymbols = exports.DateIntervalSymbols_pa;
    break;
  case 'pl':
    defaultSymbols = exports.DateIntervalSymbols_pl;
    break;
  case 'pt':
    defaultSymbols = exports.DateIntervalSymbols_pt;
    break;
  case 'pt_BR':
  case 'pt-BR':
    defaultSymbols = exports.DateIntervalSymbols_pt_BR;
    break;
  case 'pt_PT':
  case 'pt-PT':
    defaultSymbols = exports.DateIntervalSymbols_pt_PT;
    break;
  case 'ro':
    defaultSymbols = exports.DateIntervalSymbols_ro;
    break;
  case 'ru':
    defaultSymbols = exports.DateIntervalSymbols_ru;
    break;
  case 'sh':
    defaultSymbols = exports.DateIntervalSymbols_sh;
    break;
  case 'si':
    defaultSymbols = exports.DateIntervalSymbols_si;
    break;
  case 'sk':
    defaultSymbols = exports.DateIntervalSymbols_sk;
    break;
  case 'sl':
    defaultSymbols = exports.DateIntervalSymbols_sl;
    break;
  case 'sq':
    defaultSymbols = exports.DateIntervalSymbols_sq;
    break;
  case 'sr':
    defaultSymbols = exports.DateIntervalSymbols_sr;
    break;
  case 'sr_Latn':
  case 'sr-Latn':
    defaultSymbols = exports.DateIntervalSymbols_sr_Latn;
    break;
  case 'sv':
    defaultSymbols = exports.DateIntervalSymbols_sv;
    break;
  case 'sw':
    defaultSymbols = exports.DateIntervalSymbols_sw;
    break;
  case 'ta':
    defaultSymbols = exports.DateIntervalSymbols_ta;
    break;
  case 'te':
    defaultSymbols = exports.DateIntervalSymbols_te;
    break;
  case 'th':
    defaultSymbols = exports.DateIntervalSymbols_th;
    break;
  case 'tl':
    defaultSymbols = exports.DateIntervalSymbols_tl;
    break;
  case 'tr':
    defaultSymbols = exports.DateIntervalSymbols_tr;
    break;
  case 'uk':
    defaultSymbols = exports.DateIntervalSymbols_uk;
    break;
  case 'ur':
    defaultSymbols = exports.DateIntervalSymbols_ur;
    break;
  case 'uz':
    defaultSymbols = exports.DateIntervalSymbols_uz;
    break;
  case 'vi':
    defaultSymbols = exports.DateIntervalSymbols_vi;
    break;
  case 'zh':
    defaultSymbols = exports.DateIntervalSymbols_zh;
    break;
  case 'zh_CN':
  case 'zh-CN':
    defaultSymbols = exports.DateIntervalSymbols_zh_CN;
    break;
  case 'zh_HK':
  case 'zh-HK':
    defaultSymbols = exports.DateIntervalSymbols_zh_HK;
    break;
  case 'zh_TW':
  case 'zh-TW':
    defaultSymbols = exports.DateIntervalSymbols_zh_TW;
    break;
  case 'zu':
    defaultSymbols = exports.DateIntervalSymbols_zu;
    break;
  default:
    defaultSymbols = exports.DateIntervalSymbols_en;
}
