/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Date/time formatting symbols for all locales.
 *
 * File generated from CLDR ver. 42
 *
 * To reduce the file size (which may cause issues in some JS
 * developing environments), this file will only contain locales
 * that are frequently used by web applications. This is defined as
 * proto/closure_locales_data.txt and will change (most likely addition)
 * over time.  Rest of the data can be found in another file named
 * "datetimesymbolsext.js", which will be generated at
 * the same time together with this file.
 *
 * @suppress {const,useOfGoogProvide}
 */

// clang-format off

goog.provide('goog.i18n.DateTimeSymbols');
goog.provide('goog.i18n.DateTimeSymbolsType');
goog.provide('goog.i18n.DateTimeSymbols_af');
goog.provide('goog.i18n.DateTimeSymbols_am');
goog.provide('goog.i18n.DateTimeSymbols_ar');
goog.provide('goog.i18n.DateTimeSymbols_ar_DZ');
goog.provide('goog.i18n.DateTimeSymbols_ar_EG');
goog.provide('goog.i18n.DateTimeSymbols_az');
goog.provide('goog.i18n.DateTimeSymbols_be');
goog.provide('goog.i18n.DateTimeSymbols_bg');
goog.provide('goog.i18n.DateTimeSymbols_bn');
goog.provide('goog.i18n.DateTimeSymbols_br');
goog.provide('goog.i18n.DateTimeSymbols_bs');
goog.provide('goog.i18n.DateTimeSymbols_ca');
goog.provide('goog.i18n.DateTimeSymbols_chr');
goog.provide('goog.i18n.DateTimeSymbols_cs');
goog.provide('goog.i18n.DateTimeSymbols_cy');
goog.provide('goog.i18n.DateTimeSymbols_da');
goog.provide('goog.i18n.DateTimeSymbols_de');
goog.provide('goog.i18n.DateTimeSymbols_de_AT');
goog.provide('goog.i18n.DateTimeSymbols_de_CH');
goog.provide('goog.i18n.DateTimeSymbols_el');
goog.provide('goog.i18n.DateTimeSymbols_en');
goog.provide('goog.i18n.DateTimeSymbols_en_AU');
goog.provide('goog.i18n.DateTimeSymbols_en_CA');
goog.provide('goog.i18n.DateTimeSymbols_en_GB');
goog.provide('goog.i18n.DateTimeSymbols_en_IE');
goog.provide('goog.i18n.DateTimeSymbols_en_IN');
goog.provide('goog.i18n.DateTimeSymbols_en_ISO');
goog.provide('goog.i18n.DateTimeSymbols_en_SG');
goog.provide('goog.i18n.DateTimeSymbols_en_US');
goog.provide('goog.i18n.DateTimeSymbols_en_ZA');
goog.provide('goog.i18n.DateTimeSymbols_es');
goog.provide('goog.i18n.DateTimeSymbols_es_419');
goog.provide('goog.i18n.DateTimeSymbols_es_ES');
goog.provide('goog.i18n.DateTimeSymbols_es_MX');
goog.provide('goog.i18n.DateTimeSymbols_es_US');
goog.provide('goog.i18n.DateTimeSymbols_et');
goog.provide('goog.i18n.DateTimeSymbols_eu');
goog.provide('goog.i18n.DateTimeSymbols_fa');
goog.provide('goog.i18n.DateTimeSymbols_fi');
goog.provide('goog.i18n.DateTimeSymbols_fil');
goog.provide('goog.i18n.DateTimeSymbols_fr');
goog.provide('goog.i18n.DateTimeSymbols_fr_CA');
goog.provide('goog.i18n.DateTimeSymbols_ga');
goog.provide('goog.i18n.DateTimeSymbols_gl');
goog.provide('goog.i18n.DateTimeSymbols_gsw');
goog.provide('goog.i18n.DateTimeSymbols_gu');
goog.provide('goog.i18n.DateTimeSymbols_haw');
goog.provide('goog.i18n.DateTimeSymbols_he');
goog.provide('goog.i18n.DateTimeSymbols_hi');
goog.provide('goog.i18n.DateTimeSymbols_hr');
goog.provide('goog.i18n.DateTimeSymbols_hu');
goog.provide('goog.i18n.DateTimeSymbols_hy');
goog.provide('goog.i18n.DateTimeSymbols_id');
goog.provide('goog.i18n.DateTimeSymbols_in');
goog.provide('goog.i18n.DateTimeSymbols_is');
goog.provide('goog.i18n.DateTimeSymbols_it');
goog.provide('goog.i18n.DateTimeSymbols_iw');
goog.provide('goog.i18n.DateTimeSymbols_ja');
goog.provide('goog.i18n.DateTimeSymbols_ka');
goog.provide('goog.i18n.DateTimeSymbols_kk');
goog.provide('goog.i18n.DateTimeSymbols_km');
goog.provide('goog.i18n.DateTimeSymbols_kn');
goog.provide('goog.i18n.DateTimeSymbols_ko');
goog.provide('goog.i18n.DateTimeSymbols_ky');
goog.provide('goog.i18n.DateTimeSymbols_ln');
goog.provide('goog.i18n.DateTimeSymbols_lo');
goog.provide('goog.i18n.DateTimeSymbols_lt');
goog.provide('goog.i18n.DateTimeSymbols_lv');
goog.provide('goog.i18n.DateTimeSymbols_mk');
goog.provide('goog.i18n.DateTimeSymbols_ml');
goog.provide('goog.i18n.DateTimeSymbols_mn');
goog.provide('goog.i18n.DateTimeSymbols_mo');
goog.provide('goog.i18n.DateTimeSymbols_mr');
goog.provide('goog.i18n.DateTimeSymbols_ms');
goog.provide('goog.i18n.DateTimeSymbols_mt');
goog.provide('goog.i18n.DateTimeSymbols_my');
goog.provide('goog.i18n.DateTimeSymbols_nb');
goog.provide('goog.i18n.DateTimeSymbols_ne');
goog.provide('goog.i18n.DateTimeSymbols_nl');
goog.provide('goog.i18n.DateTimeSymbols_no');
goog.provide('goog.i18n.DateTimeSymbols_no_NO');
goog.provide('goog.i18n.DateTimeSymbols_or');
goog.provide('goog.i18n.DateTimeSymbols_pa');
goog.provide('goog.i18n.DateTimeSymbols_pl');
goog.provide('goog.i18n.DateTimeSymbols_pt');
goog.provide('goog.i18n.DateTimeSymbols_pt_BR');
goog.provide('goog.i18n.DateTimeSymbols_pt_PT');
goog.provide('goog.i18n.DateTimeSymbols_ro');
goog.provide('goog.i18n.DateTimeSymbols_ru');
goog.provide('goog.i18n.DateTimeSymbols_sh');
goog.provide('goog.i18n.DateTimeSymbols_si');
goog.provide('goog.i18n.DateTimeSymbols_sk');
goog.provide('goog.i18n.DateTimeSymbols_sl');
goog.provide('goog.i18n.DateTimeSymbols_sq');
goog.provide('goog.i18n.DateTimeSymbols_sr');
goog.provide('goog.i18n.DateTimeSymbols_sr_Latn');
goog.provide('goog.i18n.DateTimeSymbols_sv');
goog.provide('goog.i18n.DateTimeSymbols_sw');
goog.provide('goog.i18n.DateTimeSymbols_ta');
goog.provide('goog.i18n.DateTimeSymbols_te');
goog.provide('goog.i18n.DateTimeSymbols_th');
goog.provide('goog.i18n.DateTimeSymbols_tl');
goog.provide('goog.i18n.DateTimeSymbols_tr');
goog.provide('goog.i18n.DateTimeSymbols_uk');
goog.provide('goog.i18n.DateTimeSymbols_ur');
goog.provide('goog.i18n.DateTimeSymbols_uz');
goog.provide('goog.i18n.DateTimeSymbols_vi');
goog.provide('goog.i18n.DateTimeSymbols_zh');
goog.provide('goog.i18n.DateTimeSymbols_zh_CN');
goog.provide('goog.i18n.DateTimeSymbols_zh_HK');
goog.provide('goog.i18n.DateTimeSymbols_zh_TW');
goog.provide('goog.i18n.DateTimeSymbols_zu');


goog.require('goog.i18n.cldr41.DateTimeSymbols_af');
goog.require('goog.i18n.cldr41.DateTimeSymbols_am');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ar');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ar_DZ');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ar_EG');
goog.require('goog.i18n.cldr41.DateTimeSymbols_az');
goog.require('goog.i18n.cldr41.DateTimeSymbols_be');
goog.require('goog.i18n.cldr41.DateTimeSymbols_bg');
goog.require('goog.i18n.cldr41.DateTimeSymbols_bn');
goog.require('goog.i18n.cldr41.DateTimeSymbols_br');
goog.require('goog.i18n.cldr41.DateTimeSymbols_bs');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ca');
goog.require('goog.i18n.cldr41.DateTimeSymbols_chr');
goog.require('goog.i18n.cldr41.DateTimeSymbols_cs');
goog.require('goog.i18n.cldr41.DateTimeSymbols_cy');
goog.require('goog.i18n.cldr41.DateTimeSymbols_da');
goog.require('goog.i18n.cldr41.DateTimeSymbols_de');
goog.require('goog.i18n.cldr41.DateTimeSymbols_de_AT');
goog.require('goog.i18n.cldr41.DateTimeSymbols_de_CH');
goog.require('goog.i18n.cldr41.DateTimeSymbols_el');
goog.require('goog.i18n.cldr41.DateTimeSymbols_en');
goog.require('goog.i18n.cldr41.DateTimeSymbols_en_AU');
goog.require('goog.i18n.cldr41.DateTimeSymbols_en_CA');
goog.require('goog.i18n.cldr41.DateTimeSymbols_en_GB');
goog.require('goog.i18n.cldr41.DateTimeSymbols_en_IE');
goog.require('goog.i18n.cldr41.DateTimeSymbols_en_IN');
goog.require('goog.i18n.cldr41.DateTimeSymbols_en_SG');
goog.require('goog.i18n.cldr41.DateTimeSymbols_en_US');
goog.require('goog.i18n.cldr41.DateTimeSymbols_en_ZA');
goog.require('goog.i18n.cldr41.DateTimeSymbols_es');
goog.require('goog.i18n.cldr41.DateTimeSymbols_es_419');
goog.require('goog.i18n.cldr41.DateTimeSymbols_es_ES');
goog.require('goog.i18n.cldr41.DateTimeSymbols_es_MX');
goog.require('goog.i18n.cldr41.DateTimeSymbols_es_US');
goog.require('goog.i18n.cldr41.DateTimeSymbols_et');
goog.require('goog.i18n.cldr41.DateTimeSymbols_eu');
goog.require('goog.i18n.cldr41.DateTimeSymbols_fa');
goog.require('goog.i18n.cldr41.DateTimeSymbols_fi');
goog.require('goog.i18n.cldr41.DateTimeSymbols_fil');
goog.require('goog.i18n.cldr41.DateTimeSymbols_fr');
goog.require('goog.i18n.cldr41.DateTimeSymbols_fr_CA');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ga');
goog.require('goog.i18n.cldr41.DateTimeSymbols_gl');
goog.require('goog.i18n.cldr41.DateTimeSymbols_gsw');
goog.require('goog.i18n.cldr41.DateTimeSymbols_gu');
goog.require('goog.i18n.cldr41.DateTimeSymbols_haw');
goog.require('goog.i18n.cldr41.DateTimeSymbols_he');
goog.require('goog.i18n.cldr41.DateTimeSymbols_hi');
goog.require('goog.i18n.cldr41.DateTimeSymbols_hr');
goog.require('goog.i18n.cldr41.DateTimeSymbols_hu');
goog.require('goog.i18n.cldr41.DateTimeSymbols_hy');
goog.require('goog.i18n.cldr41.DateTimeSymbols_id');
goog.require('goog.i18n.cldr41.DateTimeSymbols_in');
goog.require('goog.i18n.cldr41.DateTimeSymbols_is');
goog.require('goog.i18n.cldr41.DateTimeSymbols_it');
goog.require('goog.i18n.cldr41.DateTimeSymbols_iw');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ja');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ka');
goog.require('goog.i18n.cldr41.DateTimeSymbols_kk');
goog.require('goog.i18n.cldr41.DateTimeSymbols_km');
goog.require('goog.i18n.cldr41.DateTimeSymbols_kn');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ko');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ky');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ln');
goog.require('goog.i18n.cldr41.DateTimeSymbols_lo');
goog.require('goog.i18n.cldr41.DateTimeSymbols_lt');
goog.require('goog.i18n.cldr41.DateTimeSymbols_lv');
goog.require('goog.i18n.cldr41.DateTimeSymbols_mk');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ml');
goog.require('goog.i18n.cldr41.DateTimeSymbols_mn');
goog.require('goog.i18n.cldr41.DateTimeSymbols_mo');
goog.require('goog.i18n.cldr41.DateTimeSymbols_mr');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ms');
goog.require('goog.i18n.cldr41.DateTimeSymbols_mt');
goog.require('goog.i18n.cldr41.DateTimeSymbols_my');
goog.require('goog.i18n.cldr41.DateTimeSymbols_nb');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ne');
goog.require('goog.i18n.cldr41.DateTimeSymbols_nl');
goog.require('goog.i18n.cldr41.DateTimeSymbols_no');
goog.require('goog.i18n.cldr41.DateTimeSymbols_no_NO');
goog.require('goog.i18n.cldr41.DateTimeSymbols_or');
goog.require('goog.i18n.cldr41.DateTimeSymbols_pa');
goog.require('goog.i18n.cldr41.DateTimeSymbols_pl');
goog.require('goog.i18n.cldr41.DateTimeSymbols_pt');
goog.require('goog.i18n.cldr41.DateTimeSymbols_pt_BR');
goog.require('goog.i18n.cldr41.DateTimeSymbols_pt_PT');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ro');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ru');
goog.require('goog.i18n.cldr41.DateTimeSymbols_sh');
goog.require('goog.i18n.cldr41.DateTimeSymbols_si');
goog.require('goog.i18n.cldr41.DateTimeSymbols_sk');
goog.require('goog.i18n.cldr41.DateTimeSymbols_sl');
goog.require('goog.i18n.cldr41.DateTimeSymbols_sq');
goog.require('goog.i18n.cldr41.DateTimeSymbols_sr');
goog.require('goog.i18n.cldr41.DateTimeSymbols_sr_Latn');
goog.require('goog.i18n.cldr41.DateTimeSymbols_sv');
goog.require('goog.i18n.cldr41.DateTimeSymbols_sw');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ta');
goog.require('goog.i18n.cldr41.DateTimeSymbols_te');
goog.require('goog.i18n.cldr41.DateTimeSymbols_th');
goog.require('goog.i18n.cldr41.DateTimeSymbols_tl');
goog.require('goog.i18n.cldr41.DateTimeSymbols_tr');
goog.require('goog.i18n.cldr41.DateTimeSymbols_uk');
goog.require('goog.i18n.cldr41.DateTimeSymbols_ur');
goog.require('goog.i18n.cldr41.DateTimeSymbols_uz');
goog.require('goog.i18n.cldr41.DateTimeSymbols_vi');
goog.require('goog.i18n.cldr41.DateTimeSymbols_zh');
goog.require('goog.i18n.cldr41.DateTimeSymbols_zh_CN');
goog.require('goog.i18n.cldr41.DateTimeSymbols_zh_HK');
goog.require('goog.i18n.cldr41.DateTimeSymbols_zh_TW');
goog.require('goog.i18n.cldr41.DateTimeSymbols_zu');
goog.require('goog.i18n.cldr42.DateTimeSymbols_af');
goog.require('goog.i18n.cldr42.DateTimeSymbols_am');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ar');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ar_DZ');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ar_EG');
goog.require('goog.i18n.cldr42.DateTimeSymbols_az');
goog.require('goog.i18n.cldr42.DateTimeSymbols_be');
goog.require('goog.i18n.cldr42.DateTimeSymbols_bg');
goog.require('goog.i18n.cldr42.DateTimeSymbols_bn');
goog.require('goog.i18n.cldr42.DateTimeSymbols_br');
goog.require('goog.i18n.cldr42.DateTimeSymbols_bs');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ca');
goog.require('goog.i18n.cldr42.DateTimeSymbols_chr');
goog.require('goog.i18n.cldr42.DateTimeSymbols_cs');
goog.require('goog.i18n.cldr42.DateTimeSymbols_cy');
goog.require('goog.i18n.cldr42.DateTimeSymbols_da');
goog.require('goog.i18n.cldr42.DateTimeSymbols_de');
goog.require('goog.i18n.cldr42.DateTimeSymbols_de_AT');
goog.require('goog.i18n.cldr42.DateTimeSymbols_de_CH');
goog.require('goog.i18n.cldr42.DateTimeSymbols_el');
goog.require('goog.i18n.cldr42.DateTimeSymbols_en');
goog.require('goog.i18n.cldr42.DateTimeSymbols_en_AU');
goog.require('goog.i18n.cldr42.DateTimeSymbols_en_CA');
goog.require('goog.i18n.cldr42.DateTimeSymbols_en_GB');
goog.require('goog.i18n.cldr42.DateTimeSymbols_en_IE');
goog.require('goog.i18n.cldr42.DateTimeSymbols_en_IN');
goog.require('goog.i18n.cldr42.DateTimeSymbols_en_SG');
goog.require('goog.i18n.cldr42.DateTimeSymbols_en_US');
goog.require('goog.i18n.cldr42.DateTimeSymbols_en_ZA');
goog.require('goog.i18n.cldr42.DateTimeSymbols_es');
goog.require('goog.i18n.cldr42.DateTimeSymbols_es_419');
goog.require('goog.i18n.cldr42.DateTimeSymbols_es_ES');
goog.require('goog.i18n.cldr42.DateTimeSymbols_es_MX');
goog.require('goog.i18n.cldr42.DateTimeSymbols_es_US');
goog.require('goog.i18n.cldr42.DateTimeSymbols_et');
goog.require('goog.i18n.cldr42.DateTimeSymbols_eu');
goog.require('goog.i18n.cldr42.DateTimeSymbols_fa');
goog.require('goog.i18n.cldr42.DateTimeSymbols_fi');
goog.require('goog.i18n.cldr42.DateTimeSymbols_fil');
goog.require('goog.i18n.cldr42.DateTimeSymbols_fr');
goog.require('goog.i18n.cldr42.DateTimeSymbols_fr_CA');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ga');
goog.require('goog.i18n.cldr42.DateTimeSymbols_gl');
goog.require('goog.i18n.cldr42.DateTimeSymbols_gsw');
goog.require('goog.i18n.cldr42.DateTimeSymbols_gu');
goog.require('goog.i18n.cldr42.DateTimeSymbols_haw');
goog.require('goog.i18n.cldr42.DateTimeSymbols_he');
goog.require('goog.i18n.cldr42.DateTimeSymbols_hi');
goog.require('goog.i18n.cldr42.DateTimeSymbols_hr');
goog.require('goog.i18n.cldr42.DateTimeSymbols_hu');
goog.require('goog.i18n.cldr42.DateTimeSymbols_hy');
goog.require('goog.i18n.cldr42.DateTimeSymbols_id');
goog.require('goog.i18n.cldr42.DateTimeSymbols_in');
goog.require('goog.i18n.cldr42.DateTimeSymbols_is');
goog.require('goog.i18n.cldr42.DateTimeSymbols_it');
goog.require('goog.i18n.cldr42.DateTimeSymbols_iw');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ja');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ka');
goog.require('goog.i18n.cldr42.DateTimeSymbols_kk');
goog.require('goog.i18n.cldr42.DateTimeSymbols_km');
goog.require('goog.i18n.cldr42.DateTimeSymbols_kn');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ko');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ky');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ln');
goog.require('goog.i18n.cldr42.DateTimeSymbols_lo');
goog.require('goog.i18n.cldr42.DateTimeSymbols_lt');
goog.require('goog.i18n.cldr42.DateTimeSymbols_lv');
goog.require('goog.i18n.cldr42.DateTimeSymbols_mk');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ml');
goog.require('goog.i18n.cldr42.DateTimeSymbols_mn');
goog.require('goog.i18n.cldr42.DateTimeSymbols_mo');
goog.require('goog.i18n.cldr42.DateTimeSymbols_mr');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ms');
goog.require('goog.i18n.cldr42.DateTimeSymbols_mt');
goog.require('goog.i18n.cldr42.DateTimeSymbols_my');
goog.require('goog.i18n.cldr42.DateTimeSymbols_nb');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ne');
goog.require('goog.i18n.cldr42.DateTimeSymbols_nl');
goog.require('goog.i18n.cldr42.DateTimeSymbols_no');
goog.require('goog.i18n.cldr42.DateTimeSymbols_no_NO');
goog.require('goog.i18n.cldr42.DateTimeSymbols_or');
goog.require('goog.i18n.cldr42.DateTimeSymbols_pa');
goog.require('goog.i18n.cldr42.DateTimeSymbols_pl');
goog.require('goog.i18n.cldr42.DateTimeSymbols_pt');
goog.require('goog.i18n.cldr42.DateTimeSymbols_pt_BR');
goog.require('goog.i18n.cldr42.DateTimeSymbols_pt_PT');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ro');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ru');
goog.require('goog.i18n.cldr42.DateTimeSymbols_sh');
goog.require('goog.i18n.cldr42.DateTimeSymbols_si');
goog.require('goog.i18n.cldr42.DateTimeSymbols_sk');
goog.require('goog.i18n.cldr42.DateTimeSymbols_sl');
goog.require('goog.i18n.cldr42.DateTimeSymbols_sq');
goog.require('goog.i18n.cldr42.DateTimeSymbols_sr');
goog.require('goog.i18n.cldr42.DateTimeSymbols_sr_Latn');
goog.require('goog.i18n.cldr42.DateTimeSymbols_sv');
goog.require('goog.i18n.cldr42.DateTimeSymbols_sw');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ta');
goog.require('goog.i18n.cldr42.DateTimeSymbols_te');
goog.require('goog.i18n.cldr42.DateTimeSymbols_th');
goog.require('goog.i18n.cldr42.DateTimeSymbols_tl');
goog.require('goog.i18n.cldr42.DateTimeSymbols_tr');
goog.require('goog.i18n.cldr42.DateTimeSymbols_uk');
goog.require('goog.i18n.cldr42.DateTimeSymbols_ur');
goog.require('goog.i18n.cldr42.DateTimeSymbols_uz');
goog.require('goog.i18n.cldr42.DateTimeSymbols_vi');
goog.require('goog.i18n.cldr42.DateTimeSymbols_zh');
goog.require('goog.i18n.cldr42.DateTimeSymbols_zh_CN');
goog.require('goog.i18n.cldr42.DateTimeSymbols_zh_HK');
goog.require('goog.i18n.cldr42.DateTimeSymbols_zh_TW');
goog.require('goog.i18n.cldr42.DateTimeSymbols_zu');
goog.require('goog.i18n.cldrversion');


/**
 * The type definition for date/time symbols.
 * @record
 */
 goog.i18n.DateTimeSymbolsType = class {
  constructor() {
    /** @type {!Array<string>} */
    this.ERAS;

    /** @type {!Array<string>} */
    this.ERANAMES;

    /** @type {!Array<string>} */
    this.NARROWMONTHS;

    /** @type {!Array<string>} */
    this.STANDALONENARROWMONTHS;

    /** @type {!Array<string>} */
    this.MONTHS;

    /** @type {!Array<string>} */
    this.STANDALONEMONTHS;

    /** @type {!Array<string>} */
    this.SHORTMONTHS;

    /** @type {!Array<string>} */
    this.STANDALONESHORTMONTHS;

    /** @type {!Array<string>} */
    this.WEEKDAYS;

    /** @type {!Array<string>} */
    this.SHORTWEEKDAYS;

    /** @type {!Array<string>} */
    this.STANDALONESHORTWEEKDAYS;

    /** @type {!Array<string>} */
    this.STANDALONEWEEKDAYS;

    /** @type {!Array<string>} */
    this.NARROWWEEKDAYS;

    /** @type {!Array<string>} */
    this.STANDALONENARROWWEEKDAYS;

    /** @type {!Array<string>} */
    this.SHORTQUARTERS;

    /** @type {!Array<string>} */
    this.QUARTERS;

    /** @type {!Array<string>} */
    this.AMPMS;

    /** @type {!Array<string>} */
    this.DATEFORMATS;

    /** @type {!Array<string>} */
    this.TIMEFORMATS;

    /** @type {!Array<string>} */
    this.DATETIMEFORMATS;

    /** @type {number|undefined} */
    this.ZERODIGIT;

    /** @type {number} */
    this.FIRSTDAYOFWEEK;

    /** @type {!Array<number>} */
    this.WEEKENDRANGE;

    /** @type {number} */
    this.FIRSTWEEKCUTOFFDAY;
  }
};

/**
 * Date/time formatting symbols for locale en_ISO.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en_ISO = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['AM', 'PM'],
  DATEFORMATS: ['EEEE, y MMMM dd', 'y MMMM d', 'y MMM d', 'yyyy-MM-dd'],
  TIMEFORMATS: ['HH:mm:ss v', 'HH:mm:ss z', 'HH:mm:ss', 'HH:mm'],
  DATETIMEFORMATS: ['{1} \'at\' {0}', '{1} \'at\' {0}', '{1}, {0}', '{1}, {0}'],
  AVAILABLEFORMATS: {'Md': 'M/d', 'MMMMd': 'MMMM d', 'MMMd': 'MMM d'},
  FIRSTDAYOFWEEK: 0,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 3
};

/**
 * Date/time formatting symbols for locale af.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_af = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_af : goog.i18n.cldr41.DateTimeSymbols_af);


/**
 * Date/time formatting symbols for locale am.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_am = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_am : goog.i18n.cldr41.DateTimeSymbols_am);


/**
 * Date/time formatting symbols for locale ar.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ar = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ar : goog.i18n.cldr41.DateTimeSymbols_ar);


/**
 * Date/time formatting symbols for locale ar_DZ.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ar_DZ = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ar_DZ : goog.i18n.cldr41.DateTimeSymbols_ar_DZ);


/**
 * Date/time formatting symbols for locale ar_EG.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ar_EG = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ar_EG : goog.i18n.cldr41.DateTimeSymbols_ar_EG);


/**
 * Date/time formatting symbols for locale az.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_az = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_az : goog.i18n.cldr41.DateTimeSymbols_az);


/**
 * Date/time formatting symbols for locale be.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_be = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_be : goog.i18n.cldr41.DateTimeSymbols_be);


/**
 * Date/time formatting symbols for locale bg.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_bg = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_bg : goog.i18n.cldr41.DateTimeSymbols_bg);


/**
 * Date/time formatting symbols for locale bn.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_bn = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_bn : goog.i18n.cldr41.DateTimeSymbols_bn);


/**
 * Date/time formatting symbols for locale br.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_br = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_br : goog.i18n.cldr41.DateTimeSymbols_br);


/**
 * Date/time formatting symbols for locale bs.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_bs = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_bs : goog.i18n.cldr41.DateTimeSymbols_bs);


/**
 * Date/time formatting symbols for locale ca.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ca = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ca : goog.i18n.cldr41.DateTimeSymbols_ca);


/**
 * Date/time formatting symbols for locale chr.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_chr = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_chr : goog.i18n.cldr41.DateTimeSymbols_chr);


/**
 * Date/time formatting symbols for locale cs.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_cs = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_cs : goog.i18n.cldr41.DateTimeSymbols_cs);


/**
 * Date/time formatting symbols for locale cy.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_cy = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_cy : goog.i18n.cldr41.DateTimeSymbols_cy);


/**
 * Date/time formatting symbols for locale da.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_da = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_da : goog.i18n.cldr41.DateTimeSymbols_da);


/**
 * Date/time formatting symbols for locale de.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_de = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_de : goog.i18n.cldr41.DateTimeSymbols_de);


/**
 * Date/time formatting symbols for locale de_AT.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_de_AT = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_de_AT : goog.i18n.cldr41.DateTimeSymbols_de_AT);


/**
 * Date/time formatting symbols for locale de_CH.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_de_CH = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_de_CH : goog.i18n.cldr41.DateTimeSymbols_de_CH);


/**
 * Date/time formatting symbols for locale el.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_el = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_el : goog.i18n.cldr41.DateTimeSymbols_el);


/**
 * Date/time formatting symbols for locale en.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_en : goog.i18n.cldr41.DateTimeSymbols_en);


/**
 * Date/time formatting symbols for locale en_AU.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en_AU = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_en_AU : goog.i18n.cldr41.DateTimeSymbols_en_AU);


/**
 * Date/time formatting symbols for locale en_CA.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en_CA = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_en_CA : goog.i18n.cldr41.DateTimeSymbols_en_CA);


/**
 * Date/time formatting symbols for locale en_GB.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en_GB = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_en_GB : goog.i18n.cldr41.DateTimeSymbols_en_GB);


/**
 * Date/time formatting symbols for locale en_IE.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en_IE = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_en_IE : goog.i18n.cldr41.DateTimeSymbols_en_IE);


/**
 * Date/time formatting symbols for locale en_IN.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en_IN = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_en_IN : goog.i18n.cldr41.DateTimeSymbols_en_IN);


/**
 * Date/time formatting symbols for locale en_SG.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en_SG = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_en_SG : goog.i18n.cldr41.DateTimeSymbols_en_SG);


/**
 * Date/time formatting symbols for locale en_US.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en_US = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_en_US : goog.i18n.cldr41.DateTimeSymbols_en_US);


/**
 * Date/time formatting symbols for locale en_ZA.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_en_ZA = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_en_ZA : goog.i18n.cldr41.DateTimeSymbols_en_ZA);


/**
 * Date/time formatting symbols for locale es.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_es = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_es : goog.i18n.cldr41.DateTimeSymbols_es);


/**
 * Date/time formatting symbols for locale es_419.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_es_419 = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_es_419 : goog.i18n.cldr41.DateTimeSymbols_es_419);


/**
 * Date/time formatting symbols for locale es_ES.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_es_ES = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_es_ES : goog.i18n.cldr41.DateTimeSymbols_es_ES);


/**
 * Date/time formatting symbols for locale es_MX.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_es_MX = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_es_MX : goog.i18n.cldr41.DateTimeSymbols_es_MX);


/**
 * Date/time formatting symbols for locale es_US.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_es_US = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_es_US : goog.i18n.cldr41.DateTimeSymbols_es_US);


/**
 * Date/time formatting symbols for locale et.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_et = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_et : goog.i18n.cldr41.DateTimeSymbols_et);


/**
 * Date/time formatting symbols for locale eu.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_eu = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_eu : goog.i18n.cldr41.DateTimeSymbols_eu);


/**
 * Date/time formatting symbols for locale fa.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_fa = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_fa : goog.i18n.cldr41.DateTimeSymbols_fa);


/**
 * Date/time formatting symbols for locale fi.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_fi = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_fi : goog.i18n.cldr41.DateTimeSymbols_fi);


/**
 * Date/time formatting symbols for locale fil.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_fil = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_fil : goog.i18n.cldr41.DateTimeSymbols_fil);


/**
 * Date/time formatting symbols for locale fr.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_fr = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_fr : goog.i18n.cldr41.DateTimeSymbols_fr);


/**
 * Date/time formatting symbols for locale fr_CA.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_fr_CA = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_fr_CA : goog.i18n.cldr41.DateTimeSymbols_fr_CA);


/**
 * Date/time formatting symbols for locale ga.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ga = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ga : goog.i18n.cldr41.DateTimeSymbols_ga);


/**
 * Date/time formatting symbols for locale gl.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_gl = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_gl : goog.i18n.cldr41.DateTimeSymbols_gl);


/**
 * Date/time formatting symbols for locale gsw.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_gsw = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_gsw : goog.i18n.cldr41.DateTimeSymbols_gsw);


/**
 * Date/time formatting symbols for locale gu.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_gu = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_gu : goog.i18n.cldr41.DateTimeSymbols_gu);


/**
 * Date/time formatting symbols for locale haw.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_haw = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_haw : goog.i18n.cldr41.DateTimeSymbols_haw);


/**
 * Date/time formatting symbols for locale he.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_he = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_he : goog.i18n.cldr41.DateTimeSymbols_he);


/**
 * Date/time formatting symbols for locale hi.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_hi = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_hi : goog.i18n.cldr41.DateTimeSymbols_hi);


/**
 * Date/time formatting symbols for locale hr.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_hr = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_hr : goog.i18n.cldr41.DateTimeSymbols_hr);


/**
 * Date/time formatting symbols for locale hu.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_hu = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_hu : goog.i18n.cldr41.DateTimeSymbols_hu);


/**
 * Date/time formatting symbols for locale hy.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_hy = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_hy : goog.i18n.cldr41.DateTimeSymbols_hy);


/**
 * Date/time formatting symbols for locale id.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_id = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_id : goog.i18n.cldr41.DateTimeSymbols_id);


/**
 * Date/time formatting symbols for locale in.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_in = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_in : goog.i18n.cldr41.DateTimeSymbols_in);


/**
 * Date/time formatting symbols for locale is.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_is = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_is : goog.i18n.cldr41.DateTimeSymbols_is);


/**
 * Date/time formatting symbols for locale it.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_it = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_it : goog.i18n.cldr41.DateTimeSymbols_it);


/**
 * Date/time formatting symbols for locale iw.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_iw = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_iw : goog.i18n.cldr41.DateTimeSymbols_iw);


/**
 * Date/time formatting symbols for locale ja.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ja = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ja : goog.i18n.cldr41.DateTimeSymbols_ja);


/**
 * Date/time formatting symbols for locale ka.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ka = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ka : goog.i18n.cldr41.DateTimeSymbols_ka);


/**
 * Date/time formatting symbols for locale kk.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_kk = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_kk : goog.i18n.cldr41.DateTimeSymbols_kk);


/**
 * Date/time formatting symbols for locale km.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_km = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_km : goog.i18n.cldr41.DateTimeSymbols_km);


/**
 * Date/time formatting symbols for locale kn.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_kn = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_kn : goog.i18n.cldr41.DateTimeSymbols_kn);


/**
 * Date/time formatting symbols for locale ko.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ko = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ko : goog.i18n.cldr41.DateTimeSymbols_ko);


/**
 * Date/time formatting symbols for locale ky.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ky = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ky : goog.i18n.cldr41.DateTimeSymbols_ky);


/**
 * Date/time formatting symbols for locale ln.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ln = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ln : goog.i18n.cldr41.DateTimeSymbols_ln);


/**
 * Date/time formatting symbols for locale lo.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_lo = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_lo : goog.i18n.cldr41.DateTimeSymbols_lo);


/**
 * Date/time formatting symbols for locale lt.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_lt = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_lt : goog.i18n.cldr41.DateTimeSymbols_lt);


/**
 * Date/time formatting symbols for locale lv.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_lv = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_lv : goog.i18n.cldr41.DateTimeSymbols_lv);


/**
 * Date/time formatting symbols for locale mk.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_mk = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_mk : goog.i18n.cldr41.DateTimeSymbols_mk);


/**
 * Date/time formatting symbols for locale ml.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ml = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ml : goog.i18n.cldr41.DateTimeSymbols_ml);


/**
 * Date/time formatting symbols for locale mn.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_mn = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_mn : goog.i18n.cldr41.DateTimeSymbols_mn);


/**
 * Date/time formatting symbols for locale mo.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_mo = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_mo : goog.i18n.cldr41.DateTimeSymbols_mo);


/**
 * Date/time formatting symbols for locale mr.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_mr = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_mr : goog.i18n.cldr41.DateTimeSymbols_mr);


/**
 * Date/time formatting symbols for locale ms.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ms = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ms : goog.i18n.cldr41.DateTimeSymbols_ms);


/**
 * Date/time formatting symbols for locale mt.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_mt = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_mt : goog.i18n.cldr41.DateTimeSymbols_mt);


/**
 * Date/time formatting symbols for locale my.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_my = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_my : goog.i18n.cldr41.DateTimeSymbols_my);


/**
 * Date/time formatting symbols for locale nb.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_nb = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_nb : goog.i18n.cldr41.DateTimeSymbols_nb);


/**
 * Date/time formatting symbols for locale ne.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ne = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ne : goog.i18n.cldr41.DateTimeSymbols_ne);


/**
 * Date/time formatting symbols for locale nl.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_nl = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_nl : goog.i18n.cldr41.DateTimeSymbols_nl);


/**
 * Date/time formatting symbols for locale no.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_no = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_no : goog.i18n.cldr41.DateTimeSymbols_no);


/**
 * Date/time formatting symbols for locale no_NO.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_no_NO = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_no_NO : goog.i18n.cldr41.DateTimeSymbols_no_NO);


/**
 * Date/time formatting symbols for locale or.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_or = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_or : goog.i18n.cldr41.DateTimeSymbols_or);


/**
 * Date/time formatting symbols for locale pa.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_pa = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_pa : goog.i18n.cldr41.DateTimeSymbols_pa);


/**
 * Date/time formatting symbols for locale pl.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_pl = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_pl : goog.i18n.cldr41.DateTimeSymbols_pl);


/**
 * Date/time formatting symbols for locale pt.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_pt = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_pt : goog.i18n.cldr41.DateTimeSymbols_pt);


/**
 * Date/time formatting symbols for locale pt_BR.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_pt_BR = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_pt_BR : goog.i18n.cldr41.DateTimeSymbols_pt_BR);


/**
 * Date/time formatting symbols for locale pt_PT.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_pt_PT = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_pt_PT : goog.i18n.cldr41.DateTimeSymbols_pt_PT);


/**
 * Date/time formatting symbols for locale ro.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ro = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ro : goog.i18n.cldr41.DateTimeSymbols_ro);


/**
 * Date/time formatting symbols for locale ru.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ru = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ru : goog.i18n.cldr41.DateTimeSymbols_ru);


/**
 * Date/time formatting symbols for locale sh.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_sh = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_sh : goog.i18n.cldr41.DateTimeSymbols_sh);


/**
 * Date/time formatting symbols for locale si.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_si = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_si : goog.i18n.cldr41.DateTimeSymbols_si);


/**
 * Date/time formatting symbols for locale sk.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_sk = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_sk : goog.i18n.cldr41.DateTimeSymbols_sk);


/**
 * Date/time formatting symbols for locale sl.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_sl = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_sl : goog.i18n.cldr41.DateTimeSymbols_sl);


/**
 * Date/time formatting symbols for locale sq.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_sq = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_sq : goog.i18n.cldr41.DateTimeSymbols_sq);


/**
 * Date/time formatting symbols for locale sr.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_sr = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_sr : goog.i18n.cldr41.DateTimeSymbols_sr);


/**
 * Date/time formatting symbols for locale sr_Latn.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_sr_Latn = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_sr_Latn : goog.i18n.cldr41.DateTimeSymbols_sr_Latn);


/**
 * Date/time formatting symbols for locale sv.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_sv = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_sv : goog.i18n.cldr41.DateTimeSymbols_sv);


/**
 * Date/time formatting symbols for locale sw.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_sw = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_sw : goog.i18n.cldr41.DateTimeSymbols_sw);


/**
 * Date/time formatting symbols for locale ta.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ta = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ta : goog.i18n.cldr41.DateTimeSymbols_ta);


/**
 * Date/time formatting symbols for locale te.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_te = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_te : goog.i18n.cldr41.DateTimeSymbols_te);


/**
 * Date/time formatting symbols for locale th.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_th = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_th : goog.i18n.cldr41.DateTimeSymbols_th);


/**
 * Date/time formatting symbols for locale tl.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_tl = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_tl : goog.i18n.cldr41.DateTimeSymbols_tl);


/**
 * Date/time formatting symbols for locale tr.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_tr = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_tr : goog.i18n.cldr41.DateTimeSymbols_tr);


/**
 * Date/time formatting symbols for locale uk.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_uk = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_uk : goog.i18n.cldr41.DateTimeSymbols_uk);


/**
 * Date/time formatting symbols for locale ur.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_ur = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_ur : goog.i18n.cldr41.DateTimeSymbols_ur);


/**
 * Date/time formatting symbols for locale uz.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_uz = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_uz : goog.i18n.cldr41.DateTimeSymbols_uz);


/**
 * Date/time formatting symbols for locale vi.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_vi = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_vi : goog.i18n.cldr41.DateTimeSymbols_vi);


/**
 * Date/time formatting symbols for locale zh.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_zh = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_zh : goog.i18n.cldr41.DateTimeSymbols_zh);


/**
 * Date/time formatting symbols for locale zh_CN.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_zh_CN = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_zh_CN : goog.i18n.cldr41.DateTimeSymbols_zh_CN);


/**
 * Date/time formatting symbols for locale zh_HK.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_zh_HK = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_zh_HK : goog.i18n.cldr41.DateTimeSymbols_zh_HK);


/**
 * Date/time formatting symbols for locale zh_TW.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_zh_TW = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_zh_TW : goog.i18n.cldr41.DateTimeSymbols_zh_TW);


/**
 * Date/time formatting symbols for locale zu.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols_zu = /** @type {!goog.i18n.DateTimeSymbolsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimeSymbols_zu : goog.i18n.cldr41.DateTimeSymbols_zu);


/** @type {!goog.i18n.DateTimeSymbolsType} */
goog.i18n.DateTimeSymbols;


/**
 * Selected date/time formatting symbols by locale.
 * @const {!goog.i18n.DateTimeSymbolsType}
 */
goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en;

switch (goog.LOCALE) {
  case 'en_ISO':
  case 'en-ISO':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_ISO;
    break;
  case 'af':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_af;
    break;
  case 'am':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_am;
    break;
  case 'ar':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar;
    break;
  case 'ar_DZ':
  case 'ar-DZ':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar_DZ;
    break;
  case 'ar_EG':
  case 'ar-EG':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar_EG;
    break;
  case 'az':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_az;
    break;
  case 'be':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_be;
    break;
  case 'bg':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_bg;
    break;
  case 'bn':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_bn;
    break;
  case 'br':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_br;
    break;
  case 'bs':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_bs;
    break;
  case 'ca':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ca;
    break;
  case 'chr':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_chr;
    break;
  case 'cs':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_cs;
    break;
  case 'cy':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_cy;
    break;
  case 'da':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_da;
    break;
  case 'de':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
    break;
  case 'de_AT':
  case 'de-AT':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de_AT;
    break;
  case 'de_CH':
  case 'de-CH':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de_CH;
    break;
  case 'el':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_el;
    break;
  case 'en':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en;
    break;
  case 'en_AU':
  case 'en-AU':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_AU;
    break;
  case 'en_CA':
  case 'en-CA':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_CA;
    break;
  case 'en_GB':
  case 'en-GB':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_GB;
    break;
  case 'en_IE':
  case 'en-IE':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_IE;
    break;
  case 'en_IN':
  case 'en-IN':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_IN;
    break;
  case 'en_SG':
  case 'en-SG':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_SG;
    break;
  case 'en_US':
  case 'en-US':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_US;
    break;
  case 'en_ZA':
  case 'en-ZA':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_ZA;
    break;
  case 'es':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es;
    break;
  case 'es_419':
  case 'es-419':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es_419;
    break;
  case 'es_ES':
  case 'es-ES':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es_ES;
    break;
  case 'es_MX':
  case 'es-MX':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es_MX;
    break;
  case 'es_US':
  case 'es-US':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es_US;
    break;
  case 'et':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_et;
    break;
  case 'eu':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_eu;
    break;
  case 'fa':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fa;
    break;
  case 'fi':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fi;
    break;
  case 'fil':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fil;
    break;
  case 'fr':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fr;
    break;
  case 'fr_CA':
  case 'fr-CA':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fr_CA;
    break;
  case 'ga':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ga;
    break;
  case 'gl':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_gl;
    break;
  case 'gsw':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_gsw;
    break;
  case 'gu':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_gu;
    break;
  case 'haw':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_haw;
    break;
  case 'he':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_he;
    break;
  case 'hi':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_hi;
    break;
  case 'hr':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_hr;
    break;
  case 'hu':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_hu;
    break;
  case 'hy':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_hy;
    break;
  case 'id':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_id;
    break;
  case 'in':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_in;
    break;
  case 'is':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_is;
    break;
  case 'it':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_it;
    break;
  case 'iw':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_iw;
    break;
  case 'ja':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ja;
    break;
  case 'ka':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ka;
    break;
  case 'kk':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_kk;
    break;
  case 'km':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_km;
    break;
  case 'kn':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_kn;
    break;
  case 'ko':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ko;
    break;
  case 'ky':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ky;
    break;
  case 'ln':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ln;
    break;
  case 'lo':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_lo;
    break;
  case 'lt':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_lt;
    break;
  case 'lv':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_lv;
    break;
  case 'mk':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mk;
    break;
  case 'ml':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ml;
    break;
  case 'mn':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mn;
    break;
  case 'mo':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mo;
    break;
  case 'mr':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mr;
    break;
  case 'ms':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ms;
    break;
  case 'mt':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mt;
    break;
  case 'my':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_my;
    break;
  case 'nb':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_nb;
    break;
  case 'ne':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ne;
    break;
  case 'nl':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_nl;
    break;
  case 'no':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_no;
    break;
  case 'no_NO':
  case 'no-NO':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_no_NO;
    break;
  case 'or':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_or;
    break;
  case 'pa':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pa;
    break;
  case 'pl':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pl;
    break;
  case 'pt':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pt;
    break;
  case 'pt_BR':
  case 'pt-BR':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pt_BR;
    break;
  case 'pt_PT':
  case 'pt-PT':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pt_PT;
    break;
  case 'ro':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ro;
    break;
  case 'ru':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ru;
    break;
  case 'sh':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sh;
    break;
  case 'si':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_si;
    break;
  case 'sk':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sk;
    break;
  case 'sl':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sl;
    break;
  case 'sq':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sq;
    break;
  case 'sr':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sr;
    break;
  case 'sr_Latn':
  case 'sr-Latn':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sr_Latn;
    break;
  case 'sv':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sv;
    break;
  case 'sw':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sw;
    break;
  case 'ta':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ta;
    break;
  case 'te':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_te;
    break;
  case 'th':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_th;
    break;
  case 'tl':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_tl;
    break;
  case 'tr':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_tr;
    break;
  case 'uk':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_uk;
    break;
  case 'ur':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ur;
    break;
  case 'uz':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_uz;
    break;
  case 'vi':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_vi;
    break;
  case 'zh':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zh;
    break;
  case 'zh_CN':
  case 'zh-CN':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zh_CN;
    break;
  case 'zh_HK':
  case 'zh-HK':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zh_HK;
    break;
  case 'zh_TW':
  case 'zh-TW':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zh_TW;
    break;
  case 'zu':
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zu;
    break;
}
