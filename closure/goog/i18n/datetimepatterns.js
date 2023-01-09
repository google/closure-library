/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Extended date/time patterns.
 *
 * File generated from CLDR ver. 42
 *
 * To reduce the file size (which may cause issues in some JS
 * developing environments), this file will only contain locales
 * that are frequently used by web applications. This is defined as
 * proto/closure_locales_data.txt and will change (most likely addition)
 * over time.  Rest of the data can be found in another file named
 * "datetimepatternsext.js", which will be generated at
 * the same time together with this file.
 *
 * @suppress {const,useOfGoogProvide}
 */

// clang-format off

/**
 * Only locales that can be enumerated in ICU are supported. For the rest
 * of the locales, it will fallback to 'en'.
 * The code is designed to work with Closure compiler using
 * ADVANCED_OPTIMIZATIONS. We will continue to add popular date/time
 * patterns over time. There is no intention to cover all possible
 * usages. If simple pattern works fine, it won't be covered here either.
 * For example, pattern 'MMM' will work well to get short month name for
 * almost all locales thus won't be included here.
 */


goog.provide('goog.i18n.DateTimePatterns');
goog.provide('goog.i18n.DateTimePatterns_af');
goog.provide('goog.i18n.DateTimePatterns_am');
goog.provide('goog.i18n.DateTimePatterns_ar');
goog.provide('goog.i18n.DateTimePatterns_ar_DZ');
goog.provide('goog.i18n.DateTimePatterns_ar_EG');
goog.provide('goog.i18n.DateTimePatterns_az');
goog.provide('goog.i18n.DateTimePatterns_be');
goog.provide('goog.i18n.DateTimePatterns_bg');
goog.provide('goog.i18n.DateTimePatterns_bn');
goog.provide('goog.i18n.DateTimePatterns_br');
goog.provide('goog.i18n.DateTimePatterns_bs');
goog.provide('goog.i18n.DateTimePatterns_ca');
goog.provide('goog.i18n.DateTimePatterns_chr');
goog.provide('goog.i18n.DateTimePatterns_cs');
goog.provide('goog.i18n.DateTimePatterns_cy');
goog.provide('goog.i18n.DateTimePatterns_da');
goog.provide('goog.i18n.DateTimePatterns_de');
goog.provide('goog.i18n.DateTimePatterns_de_AT');
goog.provide('goog.i18n.DateTimePatterns_de_CH');
goog.provide('goog.i18n.DateTimePatterns_el');
goog.provide('goog.i18n.DateTimePatterns_en');
goog.provide('goog.i18n.DateTimePatterns_en_AU');
goog.provide('goog.i18n.DateTimePatterns_en_CA');
goog.provide('goog.i18n.DateTimePatterns_en_GB');
goog.provide('goog.i18n.DateTimePatterns_en_IE');
goog.provide('goog.i18n.DateTimePatterns_en_IN');
goog.provide('goog.i18n.DateTimePatterns_en_SG');
goog.provide('goog.i18n.DateTimePatterns_en_US');
goog.provide('goog.i18n.DateTimePatterns_en_ZA');
goog.provide('goog.i18n.DateTimePatterns_es');
goog.provide('goog.i18n.DateTimePatterns_es_419');
goog.provide('goog.i18n.DateTimePatterns_es_ES');
goog.provide('goog.i18n.DateTimePatterns_es_MX');
goog.provide('goog.i18n.DateTimePatterns_es_US');
goog.provide('goog.i18n.DateTimePatterns_et');
goog.provide('goog.i18n.DateTimePatterns_eu');
goog.provide('goog.i18n.DateTimePatterns_fa');
goog.provide('goog.i18n.DateTimePatterns_fi');
goog.provide('goog.i18n.DateTimePatterns_fil');
goog.provide('goog.i18n.DateTimePatterns_fr');
goog.provide('goog.i18n.DateTimePatterns_fr_CA');
goog.provide('goog.i18n.DateTimePatterns_ga');
goog.provide('goog.i18n.DateTimePatterns_gl');
goog.provide('goog.i18n.DateTimePatterns_gsw');
goog.provide('goog.i18n.DateTimePatterns_gu');
goog.provide('goog.i18n.DateTimePatterns_haw');
goog.provide('goog.i18n.DateTimePatterns_he');
goog.provide('goog.i18n.DateTimePatterns_hi');
goog.provide('goog.i18n.DateTimePatterns_hr');
goog.provide('goog.i18n.DateTimePatterns_hu');
goog.provide('goog.i18n.DateTimePatterns_hy');
goog.provide('goog.i18n.DateTimePatterns_id');
goog.provide('goog.i18n.DateTimePatterns_in');
goog.provide('goog.i18n.DateTimePatterns_is');
goog.provide('goog.i18n.DateTimePatterns_it');
goog.provide('goog.i18n.DateTimePatterns_iw');
goog.provide('goog.i18n.DateTimePatterns_ja');
goog.provide('goog.i18n.DateTimePatterns_ka');
goog.provide('goog.i18n.DateTimePatterns_kk');
goog.provide('goog.i18n.DateTimePatterns_km');
goog.provide('goog.i18n.DateTimePatterns_kn');
goog.provide('goog.i18n.DateTimePatterns_ko');
goog.provide('goog.i18n.DateTimePatterns_ky');
goog.provide('goog.i18n.DateTimePatterns_ln');
goog.provide('goog.i18n.DateTimePatterns_lo');
goog.provide('goog.i18n.DateTimePatterns_lt');
goog.provide('goog.i18n.DateTimePatterns_lv');
goog.provide('goog.i18n.DateTimePatterns_mk');
goog.provide('goog.i18n.DateTimePatterns_ml');
goog.provide('goog.i18n.DateTimePatterns_mn');
goog.provide('goog.i18n.DateTimePatterns_mo');
goog.provide('goog.i18n.DateTimePatterns_mr');
goog.provide('goog.i18n.DateTimePatterns_ms');
goog.provide('goog.i18n.DateTimePatterns_mt');
goog.provide('goog.i18n.DateTimePatterns_my');
goog.provide('goog.i18n.DateTimePatterns_nb');
goog.provide('goog.i18n.DateTimePatterns_ne');
goog.provide('goog.i18n.DateTimePatterns_nl');
goog.provide('goog.i18n.DateTimePatterns_no');
goog.provide('goog.i18n.DateTimePatterns_no_NO');
goog.provide('goog.i18n.DateTimePatterns_or');
goog.provide('goog.i18n.DateTimePatterns_pa');
goog.provide('goog.i18n.DateTimePatterns_pl');
goog.provide('goog.i18n.DateTimePatterns_pt');
goog.provide('goog.i18n.DateTimePatterns_pt_BR');
goog.provide('goog.i18n.DateTimePatterns_pt_PT');
goog.provide('goog.i18n.DateTimePatterns_ro');
goog.provide('goog.i18n.DateTimePatterns_ru');
goog.provide('goog.i18n.DateTimePatterns_sh');
goog.provide('goog.i18n.DateTimePatterns_si');
goog.provide('goog.i18n.DateTimePatterns_sk');
goog.provide('goog.i18n.DateTimePatterns_sl');
goog.provide('goog.i18n.DateTimePatterns_sq');
goog.provide('goog.i18n.DateTimePatterns_sr');
goog.provide('goog.i18n.DateTimePatterns_sr_Latn');
goog.provide('goog.i18n.DateTimePatterns_sv');
goog.provide('goog.i18n.DateTimePatterns_sw');
goog.provide('goog.i18n.DateTimePatterns_ta');
goog.provide('goog.i18n.DateTimePatterns_te');
goog.provide('goog.i18n.DateTimePatterns_th');
goog.provide('goog.i18n.DateTimePatterns_tl');
goog.provide('goog.i18n.DateTimePatterns_tr');
goog.provide('goog.i18n.DateTimePatterns_uk');
goog.provide('goog.i18n.DateTimePatterns_ur');
goog.provide('goog.i18n.DateTimePatterns_uz');
goog.provide('goog.i18n.DateTimePatterns_vi');
goog.provide('goog.i18n.DateTimePatterns_zh');
goog.provide('goog.i18n.DateTimePatterns_zh_CN');
goog.provide('goog.i18n.DateTimePatterns_zh_HK');
goog.provide('goog.i18n.DateTimePatterns_zh_TW');
goog.provide('goog.i18n.DateTimePatterns_zu');

goog.require('goog.i18n.cldr41.DateTimePatterns_af');
goog.require('goog.i18n.cldr41.DateTimePatterns_am');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_DZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_EG');
goog.require('goog.i18n.cldr41.DateTimePatterns_az');
goog.require('goog.i18n.cldr41.DateTimePatterns_be');
goog.require('goog.i18n.cldr41.DateTimePatterns_bg');
goog.require('goog.i18n.cldr41.DateTimePatterns_bn');
goog.require('goog.i18n.cldr41.DateTimePatterns_br');
goog.require('goog.i18n.cldr41.DateTimePatterns_bs');
goog.require('goog.i18n.cldr41.DateTimePatterns_ca');
goog.require('goog.i18n.cldr41.DateTimePatterns_chr');
goog.require('goog.i18n.cldr41.DateTimePatterns_cs');
goog.require('goog.i18n.cldr41.DateTimePatterns_cy');
goog.require('goog.i18n.cldr41.DateTimePatterns_da');
goog.require('goog.i18n.cldr41.DateTimePatterns_de');
goog.require('goog.i18n.cldr41.DateTimePatterns_de_AT');
goog.require('goog.i18n.cldr41.DateTimePatterns_de_CH');
goog.require('goog.i18n.cldr41.DateTimePatterns_el');
goog.require('goog.i18n.cldr41.DateTimePatterns_en');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_AU');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_CA');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_GB');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_IE');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SG');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_US');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_ZA');
goog.require('goog.i18n.cldr41.DateTimePatterns_es');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_419');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_ES');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_MX');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_US');
goog.require('goog.i18n.cldr41.DateTimePatterns_et');
goog.require('goog.i18n.cldr41.DateTimePatterns_eu');
goog.require('goog.i18n.cldr41.DateTimePatterns_fa');
goog.require('goog.i18n.cldr41.DateTimePatterns_fi');
goog.require('goog.i18n.cldr41.DateTimePatterns_fil');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_CA');
goog.require('goog.i18n.cldr41.DateTimePatterns_ga');
goog.require('goog.i18n.cldr41.DateTimePatterns_gl');
goog.require('goog.i18n.cldr41.DateTimePatterns_gsw');
goog.require('goog.i18n.cldr41.DateTimePatterns_gu');
goog.require('goog.i18n.cldr41.DateTimePatterns_haw');
goog.require('goog.i18n.cldr41.DateTimePatterns_he');
goog.require('goog.i18n.cldr41.DateTimePatterns_hi');
goog.require('goog.i18n.cldr41.DateTimePatterns_hr');
goog.require('goog.i18n.cldr41.DateTimePatterns_hu');
goog.require('goog.i18n.cldr41.DateTimePatterns_hy');
goog.require('goog.i18n.cldr41.DateTimePatterns_id');
goog.require('goog.i18n.cldr41.DateTimePatterns_in');
goog.require('goog.i18n.cldr41.DateTimePatterns_is');
goog.require('goog.i18n.cldr41.DateTimePatterns_it');
goog.require('goog.i18n.cldr41.DateTimePatterns_iw');
goog.require('goog.i18n.cldr41.DateTimePatterns_ja');
goog.require('goog.i18n.cldr41.DateTimePatterns_ka');
goog.require('goog.i18n.cldr41.DateTimePatterns_kk');
goog.require('goog.i18n.cldr41.DateTimePatterns_km');
goog.require('goog.i18n.cldr41.DateTimePatterns_kn');
goog.require('goog.i18n.cldr41.DateTimePatterns_ko');
goog.require('goog.i18n.cldr41.DateTimePatterns_ky');
goog.require('goog.i18n.cldr41.DateTimePatterns_ln');
goog.require('goog.i18n.cldr41.DateTimePatterns_lo');
goog.require('goog.i18n.cldr41.DateTimePatterns_lt');
goog.require('goog.i18n.cldr41.DateTimePatterns_lv');
goog.require('goog.i18n.cldr41.DateTimePatterns_mk');
goog.require('goog.i18n.cldr41.DateTimePatterns_ml');
goog.require('goog.i18n.cldr41.DateTimePatterns_mn');
goog.require('goog.i18n.cldr41.DateTimePatterns_mo');
goog.require('goog.i18n.cldr41.DateTimePatterns_mr');
goog.require('goog.i18n.cldr41.DateTimePatterns_ms');
goog.require('goog.i18n.cldr41.DateTimePatterns_mt');
goog.require('goog.i18n.cldr41.DateTimePatterns_my');
goog.require('goog.i18n.cldr41.DateTimePatterns_nb');
goog.require('goog.i18n.cldr41.DateTimePatterns_ne');
goog.require('goog.i18n.cldr41.DateTimePatterns_nl');
goog.require('goog.i18n.cldr41.DateTimePatterns_no');
goog.require('goog.i18n.cldr41.DateTimePatterns_no_NO');
goog.require('goog.i18n.cldr41.DateTimePatterns_or');
goog.require('goog.i18n.cldr41.DateTimePatterns_pa');
goog.require('goog.i18n.cldr41.DateTimePatterns_pl');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_BR');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_PT');
goog.require('goog.i18n.cldr41.DateTimePatterns_ro');
goog.require('goog.i18n.cldr41.DateTimePatterns_ru');
goog.require('goog.i18n.cldr41.DateTimePatterns_sh');
goog.require('goog.i18n.cldr41.DateTimePatterns_si');
goog.require('goog.i18n.cldr41.DateTimePatterns_sk');
goog.require('goog.i18n.cldr41.DateTimePatterns_sl');
goog.require('goog.i18n.cldr41.DateTimePatterns_sq');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Latn');
goog.require('goog.i18n.cldr41.DateTimePatterns_sv');
goog.require('goog.i18n.cldr41.DateTimePatterns_sw');
goog.require('goog.i18n.cldr41.DateTimePatterns_ta');
goog.require('goog.i18n.cldr41.DateTimePatterns_te');
goog.require('goog.i18n.cldr41.DateTimePatterns_th');
goog.require('goog.i18n.cldr41.DateTimePatterns_tl');
goog.require('goog.i18n.cldr41.DateTimePatterns_tr');
goog.require('goog.i18n.cldr41.DateTimePatterns_uk');
goog.require('goog.i18n.cldr41.DateTimePatterns_ur');
goog.require('goog.i18n.cldr41.DateTimePatterns_uz');
goog.require('goog.i18n.cldr41.DateTimePatterns_vi');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_CN');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_HK');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_TW');
goog.require('goog.i18n.cldr41.DateTimePatterns_zu');
goog.require('goog.i18n.cldr42.DateTimePatterns_af');
goog.require('goog.i18n.cldr42.DateTimePatterns_am');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_DZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_EG');
goog.require('goog.i18n.cldr42.DateTimePatterns_az');
goog.require('goog.i18n.cldr42.DateTimePatterns_be');
goog.require('goog.i18n.cldr42.DateTimePatterns_bg');
goog.require('goog.i18n.cldr42.DateTimePatterns_bn');
goog.require('goog.i18n.cldr42.DateTimePatterns_br');
goog.require('goog.i18n.cldr42.DateTimePatterns_bs');
goog.require('goog.i18n.cldr42.DateTimePatterns_ca');
goog.require('goog.i18n.cldr42.DateTimePatterns_chr');
goog.require('goog.i18n.cldr42.DateTimePatterns_cs');
goog.require('goog.i18n.cldr42.DateTimePatterns_cy');
goog.require('goog.i18n.cldr42.DateTimePatterns_da');
goog.require('goog.i18n.cldr42.DateTimePatterns_de');
goog.require('goog.i18n.cldr42.DateTimePatterns_de_AT');
goog.require('goog.i18n.cldr42.DateTimePatterns_de_CH');
goog.require('goog.i18n.cldr42.DateTimePatterns_el');
goog.require('goog.i18n.cldr42.DateTimePatterns_en');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_AU');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_CA');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_GB');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_IE');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SG');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_US');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_ZA');
goog.require('goog.i18n.cldr42.DateTimePatterns_es');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_419');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_ES');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_MX');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_US');
goog.require('goog.i18n.cldr42.DateTimePatterns_et');
goog.require('goog.i18n.cldr42.DateTimePatterns_eu');
goog.require('goog.i18n.cldr42.DateTimePatterns_fa');
goog.require('goog.i18n.cldr42.DateTimePatterns_fi');
goog.require('goog.i18n.cldr42.DateTimePatterns_fil');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_CA');
goog.require('goog.i18n.cldr42.DateTimePatterns_ga');
goog.require('goog.i18n.cldr42.DateTimePatterns_gl');
goog.require('goog.i18n.cldr42.DateTimePatterns_gsw');
goog.require('goog.i18n.cldr42.DateTimePatterns_gu');
goog.require('goog.i18n.cldr42.DateTimePatterns_haw');
goog.require('goog.i18n.cldr42.DateTimePatterns_he');
goog.require('goog.i18n.cldr42.DateTimePatterns_hi');
goog.require('goog.i18n.cldr42.DateTimePatterns_hr');
goog.require('goog.i18n.cldr42.DateTimePatterns_hu');
goog.require('goog.i18n.cldr42.DateTimePatterns_hy');
goog.require('goog.i18n.cldr42.DateTimePatterns_id');
goog.require('goog.i18n.cldr42.DateTimePatterns_in');
goog.require('goog.i18n.cldr42.DateTimePatterns_is');
goog.require('goog.i18n.cldr42.DateTimePatterns_it');
goog.require('goog.i18n.cldr42.DateTimePatterns_iw');
goog.require('goog.i18n.cldr42.DateTimePatterns_ja');
goog.require('goog.i18n.cldr42.DateTimePatterns_ka');
goog.require('goog.i18n.cldr42.DateTimePatterns_kk');
goog.require('goog.i18n.cldr42.DateTimePatterns_km');
goog.require('goog.i18n.cldr42.DateTimePatterns_kn');
goog.require('goog.i18n.cldr42.DateTimePatterns_ko');
goog.require('goog.i18n.cldr42.DateTimePatterns_ky');
goog.require('goog.i18n.cldr42.DateTimePatterns_ln');
goog.require('goog.i18n.cldr42.DateTimePatterns_lo');
goog.require('goog.i18n.cldr42.DateTimePatterns_lt');
goog.require('goog.i18n.cldr42.DateTimePatterns_lv');
goog.require('goog.i18n.cldr42.DateTimePatterns_mk');
goog.require('goog.i18n.cldr42.DateTimePatterns_ml');
goog.require('goog.i18n.cldr42.DateTimePatterns_mn');
goog.require('goog.i18n.cldr42.DateTimePatterns_mo');
goog.require('goog.i18n.cldr42.DateTimePatterns_mr');
goog.require('goog.i18n.cldr42.DateTimePatterns_ms');
goog.require('goog.i18n.cldr42.DateTimePatterns_mt');
goog.require('goog.i18n.cldr42.DateTimePatterns_my');
goog.require('goog.i18n.cldr42.DateTimePatterns_nb');
goog.require('goog.i18n.cldr42.DateTimePatterns_ne');
goog.require('goog.i18n.cldr42.DateTimePatterns_nl');
goog.require('goog.i18n.cldr42.DateTimePatterns_no');
goog.require('goog.i18n.cldr42.DateTimePatterns_no_NO');
goog.require('goog.i18n.cldr42.DateTimePatterns_or');
goog.require('goog.i18n.cldr42.DateTimePatterns_pa');
goog.require('goog.i18n.cldr42.DateTimePatterns_pl');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_BR');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_PT');
goog.require('goog.i18n.cldr42.DateTimePatterns_ro');
goog.require('goog.i18n.cldr42.DateTimePatterns_ru');
goog.require('goog.i18n.cldr42.DateTimePatterns_sh');
goog.require('goog.i18n.cldr42.DateTimePatterns_si');
goog.require('goog.i18n.cldr42.DateTimePatterns_sk');
goog.require('goog.i18n.cldr42.DateTimePatterns_sl');
goog.require('goog.i18n.cldr42.DateTimePatterns_sq');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Latn');
goog.require('goog.i18n.cldr42.DateTimePatterns_sv');
goog.require('goog.i18n.cldr42.DateTimePatterns_sw');
goog.require('goog.i18n.cldr42.DateTimePatterns_ta');
goog.require('goog.i18n.cldr42.DateTimePatterns_te');
goog.require('goog.i18n.cldr42.DateTimePatterns_th');
goog.require('goog.i18n.cldr42.DateTimePatterns_tl');
goog.require('goog.i18n.cldr42.DateTimePatterns_tr');
goog.require('goog.i18n.cldr42.DateTimePatterns_uk');
goog.require('goog.i18n.cldr42.DateTimePatterns_ur');
goog.require('goog.i18n.cldr42.DateTimePatterns_uz');
goog.require('goog.i18n.cldr42.DateTimePatterns_vi');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_CN');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_HK');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_TW');
goog.require('goog.i18n.cldr42.DateTimePatterns_zu');
goog.require('goog.i18n.cldrversion');
goog.requireType('goog.i18n.DateTimePatternsType');


/**
 * Extended set of localized date/time patterns for locale af.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_af = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_af : goog.i18n.cldr41.DateTimePatterns_af);


/**
 * Extended set of localized date/time patterns for locale am.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_am = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_am : goog.i18n.cldr41.DateTimePatterns_am);


/**
 * Extended set of localized date/time patterns for locale ar.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar : goog.i18n.cldr41.DateTimePatterns_ar);


/**
 * Extended set of localized date/time patterns for locale ar_DZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_DZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_DZ : goog.i18n.cldr41.DateTimePatterns_ar_DZ);


/**
 * Extended set of localized date/time patterns for locale ar_EG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_EG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_EG : goog.i18n.cldr41.DateTimePatterns_ar_EG);


/**
 * Extended set of localized date/time patterns for locale az.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_az = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_az : goog.i18n.cldr41.DateTimePatterns_az);


/**
 * Extended set of localized date/time patterns for locale be.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_be = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_be : goog.i18n.cldr41.DateTimePatterns_be);


/**
 * Extended set of localized date/time patterns for locale bg.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bg = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bg : goog.i18n.cldr41.DateTimePatterns_bg);


/**
 * Extended set of localized date/time patterns for locale bn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bn : goog.i18n.cldr41.DateTimePatterns_bn);


/**
 * Extended set of localized date/time patterns for locale br.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_br = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_br : goog.i18n.cldr41.DateTimePatterns_br);


/**
 * Extended set of localized date/time patterns for locale bs.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bs = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bs : goog.i18n.cldr41.DateTimePatterns_bs);


/**
 * Extended set of localized date/time patterns for locale ca.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ca = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ca : goog.i18n.cldr41.DateTimePatterns_ca);


/**
 * Extended set of localized date/time patterns for locale chr.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_chr = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_chr : goog.i18n.cldr41.DateTimePatterns_chr);


/**
 * Extended set of localized date/time patterns for locale cs.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_cs = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_cs : goog.i18n.cldr41.DateTimePatterns_cs);


/**
 * Extended set of localized date/time patterns for locale cy.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_cy = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_cy : goog.i18n.cldr41.DateTimePatterns_cy);


/**
 * Extended set of localized date/time patterns for locale da.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_da = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_da : goog.i18n.cldr41.DateTimePatterns_da);


/**
 * Extended set of localized date/time patterns for locale de.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_de = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_de : goog.i18n.cldr41.DateTimePatterns_de);


/**
 * Extended set of localized date/time patterns for locale de_AT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_de_AT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_de_AT : goog.i18n.cldr41.DateTimePatterns_de_AT);


/**
 * Extended set of localized date/time patterns for locale de_CH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_de_CH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_de_CH : goog.i18n.cldr41.DateTimePatterns_de_CH);


/**
 * Extended set of localized date/time patterns for locale el.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_el = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_el : goog.i18n.cldr41.DateTimePatterns_el);


/**
 * Extended set of localized date/time patterns for locale en.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en : goog.i18n.cldr41.DateTimePatterns_en);


/**
 * Extended set of localized date/time patterns for locale en_AU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_AU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_AU : goog.i18n.cldr41.DateTimePatterns_en_AU);


/**
 * Extended set of localized date/time patterns for locale en_CA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_CA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_CA : goog.i18n.cldr41.DateTimePatterns_en_CA);


/**
 * Extended set of localized date/time patterns for locale en_GB.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_GB = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_GB : goog.i18n.cldr41.DateTimePatterns_en_GB);


/**
 * Extended set of localized date/time patterns for locale en_IE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_IE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_IE : goog.i18n.cldr41.DateTimePatterns_en_IE);


/**
 * Extended set of localized date/time patterns for locale en_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_IN : goog.i18n.cldr41.DateTimePatterns_en_IN);


/**
 * Extended set of localized date/time patterns for locale en_SG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SG : goog.i18n.cldr41.DateTimePatterns_en_SG);


/**
 * Extended set of localized date/time patterns for locale en_US.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_US = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_US : goog.i18n.cldr41.DateTimePatterns_en_US);


/**
 * Extended set of localized date/time patterns for locale en_ZA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_ZA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_ZA : goog.i18n.cldr41.DateTimePatterns_en_ZA);


/**
 * Extended set of localized date/time patterns for locale es.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es : goog.i18n.cldr41.DateTimePatterns_es);


/**
 * Extended set of localized date/time patterns for locale es_419.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_419 = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_419 : goog.i18n.cldr41.DateTimePatterns_es_419);


/**
 * Extended set of localized date/time patterns for locale es_ES.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_ES = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_ES : goog.i18n.cldr41.DateTimePatterns_es_ES);


/**
 * Extended set of localized date/time patterns for locale es_MX.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_MX = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_MX : goog.i18n.cldr41.DateTimePatterns_es_MX);


/**
 * Extended set of localized date/time patterns for locale es_US.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_US = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_US : goog.i18n.cldr41.DateTimePatterns_es_US);


/**
 * Extended set of localized date/time patterns for locale et.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_et = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_et : goog.i18n.cldr41.DateTimePatterns_et);


/**
 * Extended set of localized date/time patterns for locale eu.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_eu = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_eu : goog.i18n.cldr41.DateTimePatterns_eu);


/**
 * Extended set of localized date/time patterns for locale fa.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fa = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fa : goog.i18n.cldr41.DateTimePatterns_fa);


/**
 * Extended set of localized date/time patterns for locale fi.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fi = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fi : goog.i18n.cldr41.DateTimePatterns_fi);


/**
 * Extended set of localized date/time patterns for locale fil.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fil = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fil : goog.i18n.cldr41.DateTimePatterns_fil);


/**
 * Extended set of localized date/time patterns for locale fr.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr : goog.i18n.cldr41.DateTimePatterns_fr);


/**
 * Extended set of localized date/time patterns for locale fr_CA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_CA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_CA : goog.i18n.cldr41.DateTimePatterns_fr_CA);


/**
 * Extended set of localized date/time patterns for locale ga.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ga = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ga : goog.i18n.cldr41.DateTimePatterns_ga);


/**
 * Extended set of localized date/time patterns for locale gl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gl : goog.i18n.cldr41.DateTimePatterns_gl);


/**
 * Extended set of localized date/time patterns for locale gsw.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gsw = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gsw : goog.i18n.cldr41.DateTimePatterns_gsw);


/**
 * Extended set of localized date/time patterns for locale gu.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gu = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gu : goog.i18n.cldr41.DateTimePatterns_gu);


/**
 * Extended set of localized date/time patterns for locale haw.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_haw = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_haw : goog.i18n.cldr41.DateTimePatterns_haw);


/**
 * Extended set of localized date/time patterns for locale he.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_he = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_he : goog.i18n.cldr41.DateTimePatterns_he);


/**
 * Extended set of localized date/time patterns for locale hi.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hi = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hi : goog.i18n.cldr41.DateTimePatterns_hi);


/**
 * Extended set of localized date/time patterns for locale hr.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hr = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hr : goog.i18n.cldr41.DateTimePatterns_hr);


/**
 * Extended set of localized date/time patterns for locale hu.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hu = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hu : goog.i18n.cldr41.DateTimePatterns_hu);


/**
 * Extended set of localized date/time patterns for locale hy.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hy = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hy : goog.i18n.cldr41.DateTimePatterns_hy);


/**
 * Extended set of localized date/time patterns for locale id.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_id = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_id : goog.i18n.cldr41.DateTimePatterns_id);


/**
 * Extended set of localized date/time patterns for locale in.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_in = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_in : goog.i18n.cldr41.DateTimePatterns_in);


/**
 * Extended set of localized date/time patterns for locale is.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_is = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_is : goog.i18n.cldr41.DateTimePatterns_is);


/**
 * Extended set of localized date/time patterns for locale it.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_it = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_it : goog.i18n.cldr41.DateTimePatterns_it);


/**
 * Extended set of localized date/time patterns for locale iw.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_iw = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_iw : goog.i18n.cldr41.DateTimePatterns_iw);


/**
 * Extended set of localized date/time patterns for locale ja.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ja = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ja : goog.i18n.cldr41.DateTimePatterns_ja);


/**
 * Extended set of localized date/time patterns for locale ka.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ka = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ka : goog.i18n.cldr41.DateTimePatterns_ka);


/**
 * Extended set of localized date/time patterns for locale kk.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kk = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kk : goog.i18n.cldr41.DateTimePatterns_kk);


/**
 * Extended set of localized date/time patterns for locale km.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_km = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_km : goog.i18n.cldr41.DateTimePatterns_km);


/**
 * Extended set of localized date/time patterns for locale kn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kn : goog.i18n.cldr41.DateTimePatterns_kn);


/**
 * Extended set of localized date/time patterns for locale ko.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ko = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ko : goog.i18n.cldr41.DateTimePatterns_ko);


/**
 * Extended set of localized date/time patterns for locale ky.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ky = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ky : goog.i18n.cldr41.DateTimePatterns_ky);


/**
 * Extended set of localized date/time patterns for locale ln.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ln = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ln : goog.i18n.cldr41.DateTimePatterns_ln);


/**
 * Extended set of localized date/time patterns for locale lo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lo : goog.i18n.cldr41.DateTimePatterns_lo);


/**
 * Extended set of localized date/time patterns for locale lt.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lt = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lt : goog.i18n.cldr41.DateTimePatterns_lt);


/**
 * Extended set of localized date/time patterns for locale lv.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lv = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lv : goog.i18n.cldr41.DateTimePatterns_lv);


/**
 * Extended set of localized date/time patterns for locale mk.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mk = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mk : goog.i18n.cldr41.DateTimePatterns_mk);


/**
 * Extended set of localized date/time patterns for locale ml.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ml = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ml : goog.i18n.cldr41.DateTimePatterns_ml);


/**
 * Extended set of localized date/time patterns for locale mn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mn : goog.i18n.cldr41.DateTimePatterns_mn);


/**
 * Extended set of localized date/time patterns for locale mo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mo : goog.i18n.cldr41.DateTimePatterns_mo);


/**
 * Extended set of localized date/time patterns for locale mr.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mr = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mr : goog.i18n.cldr41.DateTimePatterns_mr);


/**
 * Extended set of localized date/time patterns for locale ms.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ms = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ms : goog.i18n.cldr41.DateTimePatterns_ms);


/**
 * Extended set of localized date/time patterns for locale mt.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mt = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mt : goog.i18n.cldr41.DateTimePatterns_mt);


/**
 * Extended set of localized date/time patterns for locale my.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_my = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_my : goog.i18n.cldr41.DateTimePatterns_my);


/**
 * Extended set of localized date/time patterns for locale nb.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nb = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nb : goog.i18n.cldr41.DateTimePatterns_nb);


/**
 * Extended set of localized date/time patterns for locale ne.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ne = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ne : goog.i18n.cldr41.DateTimePatterns_ne);


/**
 * Extended set of localized date/time patterns for locale nl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nl : goog.i18n.cldr41.DateTimePatterns_nl);


/**
 * Extended set of localized date/time patterns for locale no.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_no = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_no : goog.i18n.cldr41.DateTimePatterns_no);


/**
 * Extended set of localized date/time patterns for locale no_NO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_no_NO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_no_NO : goog.i18n.cldr41.DateTimePatterns_no_NO);


/**
 * Extended set of localized date/time patterns for locale or.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_or = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_or : goog.i18n.cldr41.DateTimePatterns_or);


/**
 * Extended set of localized date/time patterns for locale pa.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pa = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pa : goog.i18n.cldr41.DateTimePatterns_pa);


/**
 * Extended set of localized date/time patterns for locale pl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pl : goog.i18n.cldr41.DateTimePatterns_pl);


/**
 * Extended set of localized date/time patterns for locale pt.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt : goog.i18n.cldr41.DateTimePatterns_pt);


/**
 * Extended set of localized date/time patterns for locale pt_BR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_BR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_BR : goog.i18n.cldr41.DateTimePatterns_pt_BR);


/**
 * Extended set of localized date/time patterns for locale pt_PT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_PT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_PT : goog.i18n.cldr41.DateTimePatterns_pt_PT);


/**
 * Extended set of localized date/time patterns for locale ro.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ro = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ro : goog.i18n.cldr41.DateTimePatterns_ro);


/**
 * Extended set of localized date/time patterns for locale ru.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ru = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ru : goog.i18n.cldr41.DateTimePatterns_ru);


/**
 * Extended set of localized date/time patterns for locale sh.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sh = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sh : goog.i18n.cldr41.DateTimePatterns_sh);


/**
 * Extended set of localized date/time patterns for locale si.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_si = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_si : goog.i18n.cldr41.DateTimePatterns_si);


/**
 * Extended set of localized date/time patterns for locale sk.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sk = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sk : goog.i18n.cldr41.DateTimePatterns_sk);


/**
 * Extended set of localized date/time patterns for locale sl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sl : goog.i18n.cldr41.DateTimePatterns_sl);


/**
 * Extended set of localized date/time patterns for locale sq.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sq = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sq : goog.i18n.cldr41.DateTimePatterns_sq);


/**
 * Extended set of localized date/time patterns for locale sr.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr : goog.i18n.cldr41.DateTimePatterns_sr);


/**
 * Extended set of localized date/time patterns for locale sr_Latn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Latn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Latn : goog.i18n.cldr41.DateTimePatterns_sr_Latn);


/**
 * Extended set of localized date/time patterns for locale sv.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sv = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sv : goog.i18n.cldr41.DateTimePatterns_sv);


/**
 * Extended set of localized date/time patterns for locale sw.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sw = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sw : goog.i18n.cldr41.DateTimePatterns_sw);


/**
 * Extended set of localized date/time patterns for locale ta.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ta = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ta : goog.i18n.cldr41.DateTimePatterns_ta);


/**
 * Extended set of localized date/time patterns for locale te.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_te = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_te : goog.i18n.cldr41.DateTimePatterns_te);


/**
 * Extended set of localized date/time patterns for locale th.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_th = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_th : goog.i18n.cldr41.DateTimePatterns_th);


/**
 * Extended set of localized date/time patterns for locale tl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tl : goog.i18n.cldr41.DateTimePatterns_tl);


/**
 * Extended set of localized date/time patterns for locale tr.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tr = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tr : goog.i18n.cldr41.DateTimePatterns_tr);


/**
 * Extended set of localized date/time patterns for locale uk.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_uk = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_uk : goog.i18n.cldr41.DateTimePatterns_uk);


/**
 * Extended set of localized date/time patterns for locale ur.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ur = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ur : goog.i18n.cldr41.DateTimePatterns_ur);


/**
 * Extended set of localized date/time patterns for locale uz.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_uz = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_uz : goog.i18n.cldr41.DateTimePatterns_uz);


/**
 * Extended set of localized date/time patterns for locale vi.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_vi = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_vi : goog.i18n.cldr41.DateTimePatterns_vi);


/**
 * Extended set of localized date/time patterns for locale zh.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh : goog.i18n.cldr41.DateTimePatterns_zh);


/**
 * Extended set of localized date/time patterns for locale zh_CN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_CN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_CN : goog.i18n.cldr41.DateTimePatterns_zh_CN);


/**
 * Extended set of localized date/time patterns for locale zh_HK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_HK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_HK : goog.i18n.cldr41.DateTimePatterns_zh_HK);


/**
 * Extended set of localized date/time patterns for locale zh_TW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_TW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_TW : goog.i18n.cldr41.DateTimePatterns_zh_TW);


/**
 * Extended set of localized date/time patterns for locale zu.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zu = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zu : goog.i18n.cldr41.DateTimePatterns_zu);


/**
 * Select date/time pattern by locale.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en;

switch (goog.LOCALE) {
  case 'af':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_af;
    break;
  case 'am':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_am;
    break;
  case 'ar':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar;
    break;
  case 'ar_DZ':
  case 'ar-DZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_DZ;
    break;
  case 'ar_EG':
  case 'ar-EG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_EG;
    break;
  case 'az':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_az;
    break;
  case 'be':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_be;
    break;
  case 'bg':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bg;
    break;
  case 'bn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bn;
    break;
  case 'br':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_br;
    break;
  case 'bs':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bs;
    break;
  case 'ca':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ca;
    break;
  case 'chr':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_chr;
    break;
  case 'cs':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_cs;
    break;
  case 'cy':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_cy;
    break;
  case 'da':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_da;
    break;
  case 'de':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
    break;
  case 'de_AT':
  case 'de-AT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de_AT;
    break;
  case 'de_CH':
  case 'de-CH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de_CH;
    break;
  case 'el':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_el;
    break;
  case 'en':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en;
    break;
  case 'en_AU':
  case 'en-AU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_AU;
    break;
  case 'en_CA':
  case 'en-CA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_CA;
    break;
  case 'en_GB':
  case 'en-GB':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_GB;
    break;
  case 'en_IE':
  case 'en-IE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_IE;
    break;
  case 'en_IN':
  case 'en-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_IN;
    break;
  case 'en_SG':
  case 'en-SG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SG;
    break;
  case 'en_US':
  case 'en-US':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_US;
    break;
  case 'en_ZA':
  case 'en-ZA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_ZA;
    break;
  case 'es':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es;
    break;
  case 'es_419':
  case 'es-419':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_419;
    break;
  case 'es_ES':
  case 'es-ES':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_ES;
    break;
  case 'es_MX':
  case 'es-MX':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_MX;
    break;
  case 'es_US':
  case 'es-US':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_US;
    break;
  case 'et':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_et;
    break;
  case 'eu':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_eu;
    break;
  case 'fa':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fa;
    break;
  case 'fi':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fi;
    break;
  case 'fil':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fil;
    break;
  case 'fr':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr;
    break;
  case 'fr_CA':
  case 'fr-CA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_CA;
    break;
  case 'ga':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ga;
    break;
  case 'gl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gl;
    break;
  case 'gsw':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gsw;
    break;
  case 'gu':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gu;
    break;
  case 'haw':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_haw;
    break;
  case 'he':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_he;
    break;
  case 'hi':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hi;
    break;
  case 'hr':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hr;
    break;
  case 'hu':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hu;
    break;
  case 'hy':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hy;
    break;
  case 'id':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_id;
    break;
  case 'in':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_in;
    break;
  case 'is':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_is;
    break;
  case 'it':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_it;
    break;
  case 'iw':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_iw;
    break;
  case 'ja':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ja;
    break;
  case 'ka':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ka;
    break;
  case 'kk':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kk;
    break;
  case 'km':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_km;
    break;
  case 'kn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kn;
    break;
  case 'ko':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ko;
    break;
  case 'ky':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ky;
    break;
  case 'ln':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ln;
    break;
  case 'lo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lo;
    break;
  case 'lt':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lt;
    break;
  case 'lv':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lv;
    break;
  case 'mk':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mk;
    break;
  case 'ml':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ml;
    break;
  case 'mn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mn;
    break;
  case 'mo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mo;
    break;
  case 'mr':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mr;
    break;
  case 'ms':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ms;
    break;
  case 'mt':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mt;
    break;
  case 'my':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_my;
    break;
  case 'nb':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nb;
    break;
  case 'ne':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ne;
    break;
  case 'nl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nl;
    break;
  case 'no':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_no;
    break;
  case 'no_NO':
  case 'no-NO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_no_NO;
    break;
  case 'or':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_or;
    break;
  case 'pa':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pa;
    break;
  case 'pl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pl;
    break;
  case 'pt':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt;
    break;
  case 'pt_BR':
  case 'pt-BR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_BR;
    break;
  case 'pt_PT':
  case 'pt-PT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_PT;
    break;
  case 'ro':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ro;
    break;
  case 'ru':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ru;
    break;
  case 'sh':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sh;
    break;
  case 'si':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_si;
    break;
  case 'sk':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sk;
    break;
  case 'sl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sl;
    break;
  case 'sq':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sq;
    break;
  case 'sr':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr;
    break;
  case 'sr_Latn':
  case 'sr-Latn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Latn;
    break;
  case 'sv':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sv;
    break;
  case 'sw':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sw;
    break;
  case 'ta':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ta;
    break;
  case 'te':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_te;
    break;
  case 'th':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_th;
    break;
  case 'tl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tl;
    break;
  case 'tr':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tr;
    break;
  case 'uk':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uk;
    break;
  case 'ur':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ur;
    break;
  case 'uz':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uz;
    break;
  case 'vi':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vi;
    break;
  case 'zh':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh;
    break;
  case 'zh_CN':
  case 'zh-CN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_CN;
    break;
  case 'zh_HK':
  case 'zh-HK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_HK;
    break;
  case 'zh_TW':
  case 'zh-TW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_TW;
    break;
  case 'zu':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zu;
    break;
}
