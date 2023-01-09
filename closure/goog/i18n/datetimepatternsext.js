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
 * This file covers those locales that are not covered in
 * "datetimepatterns.js".
 *
 * @suppress {const,missingRequire,useOfGoogProvide} Suppress "missing require"
 *     warnings for names like goog.i18n.DateTimePatterns_af.
 *     They are included by requiring goog.i18n.DateTimePatterns.
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


goog.provide('goog.i18n.DateTimePatternsExt');
goog.provide('goog.i18n.DateTimePatterns_af_NA');
goog.provide('goog.i18n.DateTimePatterns_af_ZA');
goog.provide('goog.i18n.DateTimePatterns_agq');
goog.provide('goog.i18n.DateTimePatterns_agq_CM');
goog.provide('goog.i18n.DateTimePatterns_ak');
goog.provide('goog.i18n.DateTimePatterns_ak_GH');
goog.provide('goog.i18n.DateTimePatterns_am_ET');
goog.provide('goog.i18n.DateTimePatterns_ar_001');
goog.provide('goog.i18n.DateTimePatterns_ar_AE');
goog.provide('goog.i18n.DateTimePatterns_ar_BH');
goog.provide('goog.i18n.DateTimePatterns_ar_DJ');
goog.provide('goog.i18n.DateTimePatterns_ar_EH');
goog.provide('goog.i18n.DateTimePatterns_ar_ER');
goog.provide('goog.i18n.DateTimePatterns_ar_IL');
goog.provide('goog.i18n.DateTimePatterns_ar_IQ');
goog.provide('goog.i18n.DateTimePatterns_ar_JO');
goog.provide('goog.i18n.DateTimePatterns_ar_KM');
goog.provide('goog.i18n.DateTimePatterns_ar_KW');
goog.provide('goog.i18n.DateTimePatterns_ar_LB');
goog.provide('goog.i18n.DateTimePatterns_ar_LY');
goog.provide('goog.i18n.DateTimePatterns_ar_MA');
goog.provide('goog.i18n.DateTimePatterns_ar_MR');
goog.provide('goog.i18n.DateTimePatterns_ar_OM');
goog.provide('goog.i18n.DateTimePatterns_ar_PS');
goog.provide('goog.i18n.DateTimePatterns_ar_QA');
goog.provide('goog.i18n.DateTimePatterns_ar_SA');
goog.provide('goog.i18n.DateTimePatterns_ar_SD');
goog.provide('goog.i18n.DateTimePatterns_ar_SO');
goog.provide('goog.i18n.DateTimePatterns_ar_SS');
goog.provide('goog.i18n.DateTimePatterns_ar_SY');
goog.provide('goog.i18n.DateTimePatterns_ar_TD');
goog.provide('goog.i18n.DateTimePatterns_ar_TN');
goog.provide('goog.i18n.DateTimePatterns_ar_XB');
goog.provide('goog.i18n.DateTimePatterns_ar_YE');
goog.provide('goog.i18n.DateTimePatterns_as');
goog.provide('goog.i18n.DateTimePatterns_as_IN');
goog.provide('goog.i18n.DateTimePatterns_asa');
goog.provide('goog.i18n.DateTimePatterns_asa_TZ');
goog.provide('goog.i18n.DateTimePatterns_ast');
goog.provide('goog.i18n.DateTimePatterns_ast_ES');
goog.provide('goog.i18n.DateTimePatterns_az_Cyrl');
goog.provide('goog.i18n.DateTimePatterns_az_Cyrl_AZ');
goog.provide('goog.i18n.DateTimePatterns_az_Latn');
goog.provide('goog.i18n.DateTimePatterns_az_Latn_AZ');
goog.provide('goog.i18n.DateTimePatterns_bas');
goog.provide('goog.i18n.DateTimePatterns_bas_CM');
goog.provide('goog.i18n.DateTimePatterns_be_BY');
goog.provide('goog.i18n.DateTimePatterns_bem');
goog.provide('goog.i18n.DateTimePatterns_bem_ZM');
goog.provide('goog.i18n.DateTimePatterns_bez');
goog.provide('goog.i18n.DateTimePatterns_bez_TZ');
goog.provide('goog.i18n.DateTimePatterns_bg_BG');
goog.provide('goog.i18n.DateTimePatterns_bgc');
goog.provide('goog.i18n.DateTimePatterns_bgc_IN');
goog.provide('goog.i18n.DateTimePatterns_bho');
goog.provide('goog.i18n.DateTimePatterns_bho_IN');
goog.provide('goog.i18n.DateTimePatterns_bm');
goog.provide('goog.i18n.DateTimePatterns_bm_ML');
goog.provide('goog.i18n.DateTimePatterns_bn_BD');
goog.provide('goog.i18n.DateTimePatterns_bn_IN');
goog.provide('goog.i18n.DateTimePatterns_bo');
goog.provide('goog.i18n.DateTimePatterns_bo_CN');
goog.provide('goog.i18n.DateTimePatterns_bo_IN');
goog.provide('goog.i18n.DateTimePatterns_br_FR');
goog.provide('goog.i18n.DateTimePatterns_brx');
goog.provide('goog.i18n.DateTimePatterns_brx_IN');
goog.provide('goog.i18n.DateTimePatterns_bs_Cyrl');
goog.provide('goog.i18n.DateTimePatterns_bs_Cyrl_BA');
goog.provide('goog.i18n.DateTimePatterns_bs_Latn');
goog.provide('goog.i18n.DateTimePatterns_bs_Latn_BA');
goog.provide('goog.i18n.DateTimePatterns_ca_AD');
goog.provide('goog.i18n.DateTimePatterns_ca_ES');
goog.provide('goog.i18n.DateTimePatterns_ca_FR');
goog.provide('goog.i18n.DateTimePatterns_ca_IT');
goog.provide('goog.i18n.DateTimePatterns_ccp');
goog.provide('goog.i18n.DateTimePatterns_ccp_BD');
goog.provide('goog.i18n.DateTimePatterns_ccp_IN');
goog.provide('goog.i18n.DateTimePatterns_ce');
goog.provide('goog.i18n.DateTimePatterns_ce_RU');
goog.provide('goog.i18n.DateTimePatterns_ceb');
goog.provide('goog.i18n.DateTimePatterns_ceb_PH');
goog.provide('goog.i18n.DateTimePatterns_cgg');
goog.provide('goog.i18n.DateTimePatterns_cgg_UG');
goog.provide('goog.i18n.DateTimePatterns_chr_US');
goog.provide('goog.i18n.DateTimePatterns_ckb');
goog.provide('goog.i18n.DateTimePatterns_ckb_Arab');
goog.provide('goog.i18n.DateTimePatterns_ckb_Arab_IQ');
goog.provide('goog.i18n.DateTimePatterns_ckb_Arab_IR');
goog.provide('goog.i18n.DateTimePatterns_ckb_IQ');
goog.provide('goog.i18n.DateTimePatterns_ckb_IR');
goog.provide('goog.i18n.DateTimePatterns_cs_CZ');
goog.provide('goog.i18n.DateTimePatterns_cv');
goog.provide('goog.i18n.DateTimePatterns_cv_RU');
goog.provide('goog.i18n.DateTimePatterns_cy_GB');
goog.provide('goog.i18n.DateTimePatterns_da_DK');
goog.provide('goog.i18n.DateTimePatterns_da_GL');
goog.provide('goog.i18n.DateTimePatterns_dav');
goog.provide('goog.i18n.DateTimePatterns_dav_KE');
goog.provide('goog.i18n.DateTimePatterns_de_BE');
goog.provide('goog.i18n.DateTimePatterns_de_DE');
goog.provide('goog.i18n.DateTimePatterns_de_IT');
goog.provide('goog.i18n.DateTimePatterns_de_LI');
goog.provide('goog.i18n.DateTimePatterns_de_LU');
goog.provide('goog.i18n.DateTimePatterns_dje');
goog.provide('goog.i18n.DateTimePatterns_dje_NE');
goog.provide('goog.i18n.DateTimePatterns_doi');
goog.provide('goog.i18n.DateTimePatterns_doi_IN');
goog.provide('goog.i18n.DateTimePatterns_dsb');
goog.provide('goog.i18n.DateTimePatterns_dsb_DE');
goog.provide('goog.i18n.DateTimePatterns_dua');
goog.provide('goog.i18n.DateTimePatterns_dua_CM');
goog.provide('goog.i18n.DateTimePatterns_dyo');
goog.provide('goog.i18n.DateTimePatterns_dyo_SN');
goog.provide('goog.i18n.DateTimePatterns_dz');
goog.provide('goog.i18n.DateTimePatterns_dz_BT');
goog.provide('goog.i18n.DateTimePatterns_ebu');
goog.provide('goog.i18n.DateTimePatterns_ebu_KE');
goog.provide('goog.i18n.DateTimePatterns_ee');
goog.provide('goog.i18n.DateTimePatterns_ee_GH');
goog.provide('goog.i18n.DateTimePatterns_ee_TG');
goog.provide('goog.i18n.DateTimePatterns_el_CY');
goog.provide('goog.i18n.DateTimePatterns_el_GR');
goog.provide('goog.i18n.DateTimePatterns_en_001');
goog.provide('goog.i18n.DateTimePatterns_en_150');
goog.provide('goog.i18n.DateTimePatterns_en_AE');
goog.provide('goog.i18n.DateTimePatterns_en_AG');
goog.provide('goog.i18n.DateTimePatterns_en_AI');
goog.provide('goog.i18n.DateTimePatterns_en_AS');
goog.provide('goog.i18n.DateTimePatterns_en_AT');
goog.provide('goog.i18n.DateTimePatterns_en_BB');
goog.provide('goog.i18n.DateTimePatterns_en_BE');
goog.provide('goog.i18n.DateTimePatterns_en_BI');
goog.provide('goog.i18n.DateTimePatterns_en_BM');
goog.provide('goog.i18n.DateTimePatterns_en_BS');
goog.provide('goog.i18n.DateTimePatterns_en_BW');
goog.provide('goog.i18n.DateTimePatterns_en_BZ');
goog.provide('goog.i18n.DateTimePatterns_en_CC');
goog.provide('goog.i18n.DateTimePatterns_en_CH');
goog.provide('goog.i18n.DateTimePatterns_en_CK');
goog.provide('goog.i18n.DateTimePatterns_en_CM');
goog.provide('goog.i18n.DateTimePatterns_en_CX');
goog.provide('goog.i18n.DateTimePatterns_en_CY');
goog.provide('goog.i18n.DateTimePatterns_en_DE');
goog.provide('goog.i18n.DateTimePatterns_en_DG');
goog.provide('goog.i18n.DateTimePatterns_en_DK');
goog.provide('goog.i18n.DateTimePatterns_en_DM');
goog.provide('goog.i18n.DateTimePatterns_en_ER');
goog.provide('goog.i18n.DateTimePatterns_en_FI');
goog.provide('goog.i18n.DateTimePatterns_en_FJ');
goog.provide('goog.i18n.DateTimePatterns_en_FK');
goog.provide('goog.i18n.DateTimePatterns_en_FM');
goog.provide('goog.i18n.DateTimePatterns_en_GD');
goog.provide('goog.i18n.DateTimePatterns_en_GG');
goog.provide('goog.i18n.DateTimePatterns_en_GH');
goog.provide('goog.i18n.DateTimePatterns_en_GI');
goog.provide('goog.i18n.DateTimePatterns_en_GM');
goog.provide('goog.i18n.DateTimePatterns_en_GU');
goog.provide('goog.i18n.DateTimePatterns_en_GY');
goog.provide('goog.i18n.DateTimePatterns_en_HK');
goog.provide('goog.i18n.DateTimePatterns_en_IL');
goog.provide('goog.i18n.DateTimePatterns_en_IM');
goog.provide('goog.i18n.DateTimePatterns_en_IO');
goog.provide('goog.i18n.DateTimePatterns_en_JE');
goog.provide('goog.i18n.DateTimePatterns_en_JM');
goog.provide('goog.i18n.DateTimePatterns_en_KE');
goog.provide('goog.i18n.DateTimePatterns_en_KI');
goog.provide('goog.i18n.DateTimePatterns_en_KN');
goog.provide('goog.i18n.DateTimePatterns_en_KY');
goog.provide('goog.i18n.DateTimePatterns_en_LC');
goog.provide('goog.i18n.DateTimePatterns_en_LR');
goog.provide('goog.i18n.DateTimePatterns_en_LS');
goog.provide('goog.i18n.DateTimePatterns_en_MG');
goog.provide('goog.i18n.DateTimePatterns_en_MH');
goog.provide('goog.i18n.DateTimePatterns_en_MO');
goog.provide('goog.i18n.DateTimePatterns_en_MP');
goog.provide('goog.i18n.DateTimePatterns_en_MS');
goog.provide('goog.i18n.DateTimePatterns_en_MT');
goog.provide('goog.i18n.DateTimePatterns_en_MU');
goog.provide('goog.i18n.DateTimePatterns_en_MV');
goog.provide('goog.i18n.DateTimePatterns_en_MW');
goog.provide('goog.i18n.DateTimePatterns_en_MY');
goog.provide('goog.i18n.DateTimePatterns_en_NA');
goog.provide('goog.i18n.DateTimePatterns_en_NF');
goog.provide('goog.i18n.DateTimePatterns_en_NG');
goog.provide('goog.i18n.DateTimePatterns_en_NL');
goog.provide('goog.i18n.DateTimePatterns_en_NR');
goog.provide('goog.i18n.DateTimePatterns_en_NU');
goog.provide('goog.i18n.DateTimePatterns_en_NZ');
goog.provide('goog.i18n.DateTimePatterns_en_PG');
goog.provide('goog.i18n.DateTimePatterns_en_PH');
goog.provide('goog.i18n.DateTimePatterns_en_PK');
goog.provide('goog.i18n.DateTimePatterns_en_PN');
goog.provide('goog.i18n.DateTimePatterns_en_PR');
goog.provide('goog.i18n.DateTimePatterns_en_PW');
goog.provide('goog.i18n.DateTimePatterns_en_RW');
goog.provide('goog.i18n.DateTimePatterns_en_SB');
goog.provide('goog.i18n.DateTimePatterns_en_SC');
goog.provide('goog.i18n.DateTimePatterns_en_SD');
goog.provide('goog.i18n.DateTimePatterns_en_SE');
goog.provide('goog.i18n.DateTimePatterns_en_SH');
goog.provide('goog.i18n.DateTimePatterns_en_SI');
goog.provide('goog.i18n.DateTimePatterns_en_SL');
goog.provide('goog.i18n.DateTimePatterns_en_SS');
goog.provide('goog.i18n.DateTimePatterns_en_SX');
goog.provide('goog.i18n.DateTimePatterns_en_SZ');
goog.provide('goog.i18n.DateTimePatterns_en_TC');
goog.provide('goog.i18n.DateTimePatterns_en_TK');
goog.provide('goog.i18n.DateTimePatterns_en_TO');
goog.provide('goog.i18n.DateTimePatterns_en_TT');
goog.provide('goog.i18n.DateTimePatterns_en_TV');
goog.provide('goog.i18n.DateTimePatterns_en_TZ');
goog.provide('goog.i18n.DateTimePatterns_en_UG');
goog.provide('goog.i18n.DateTimePatterns_en_UM');
goog.provide('goog.i18n.DateTimePatterns_en_US_POSIX');
goog.provide('goog.i18n.DateTimePatterns_en_VC');
goog.provide('goog.i18n.DateTimePatterns_en_VG');
goog.provide('goog.i18n.DateTimePatterns_en_VI');
goog.provide('goog.i18n.DateTimePatterns_en_VU');
goog.provide('goog.i18n.DateTimePatterns_en_WS');
goog.provide('goog.i18n.DateTimePatterns_en_XA');
goog.provide('goog.i18n.DateTimePatterns_en_ZM');
goog.provide('goog.i18n.DateTimePatterns_en_ZW');
goog.provide('goog.i18n.DateTimePatterns_eo');
goog.provide('goog.i18n.DateTimePatterns_eo_001');
goog.provide('goog.i18n.DateTimePatterns_es_AR');
goog.provide('goog.i18n.DateTimePatterns_es_BO');
goog.provide('goog.i18n.DateTimePatterns_es_BR');
goog.provide('goog.i18n.DateTimePatterns_es_BZ');
goog.provide('goog.i18n.DateTimePatterns_es_CL');
goog.provide('goog.i18n.DateTimePatterns_es_CO');
goog.provide('goog.i18n.DateTimePatterns_es_CR');
goog.provide('goog.i18n.DateTimePatterns_es_CU');
goog.provide('goog.i18n.DateTimePatterns_es_DO');
goog.provide('goog.i18n.DateTimePatterns_es_EA');
goog.provide('goog.i18n.DateTimePatterns_es_EC');
goog.provide('goog.i18n.DateTimePatterns_es_GQ');
goog.provide('goog.i18n.DateTimePatterns_es_GT');
goog.provide('goog.i18n.DateTimePatterns_es_HN');
goog.provide('goog.i18n.DateTimePatterns_es_IC');
goog.provide('goog.i18n.DateTimePatterns_es_NI');
goog.provide('goog.i18n.DateTimePatterns_es_PA');
goog.provide('goog.i18n.DateTimePatterns_es_PE');
goog.provide('goog.i18n.DateTimePatterns_es_PH');
goog.provide('goog.i18n.DateTimePatterns_es_PR');
goog.provide('goog.i18n.DateTimePatterns_es_PY');
goog.provide('goog.i18n.DateTimePatterns_es_SV');
goog.provide('goog.i18n.DateTimePatterns_es_UY');
goog.provide('goog.i18n.DateTimePatterns_es_VE');
goog.provide('goog.i18n.DateTimePatterns_et_EE');
goog.provide('goog.i18n.DateTimePatterns_eu_ES');
goog.provide('goog.i18n.DateTimePatterns_ewo');
goog.provide('goog.i18n.DateTimePatterns_ewo_CM');
goog.provide('goog.i18n.DateTimePatterns_fa_AF');
goog.provide('goog.i18n.DateTimePatterns_fa_IR');
goog.provide('goog.i18n.DateTimePatterns_ff');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_BF');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_CM');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_GH');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_GM');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_GN');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_GW');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_LR');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_MR');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_NE');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_NG');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_SL');
goog.provide('goog.i18n.DateTimePatterns_ff_Adlm_SN');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_BF');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_CM');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_GH');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_GM');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_GN');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_GW');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_LR');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_MR');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_NE');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_NG');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_SL');
goog.provide('goog.i18n.DateTimePatterns_ff_Latn_SN');
goog.provide('goog.i18n.DateTimePatterns_fi_FI');
goog.provide('goog.i18n.DateTimePatterns_fil_PH');
goog.provide('goog.i18n.DateTimePatterns_fo');
goog.provide('goog.i18n.DateTimePatterns_fo_DK');
goog.provide('goog.i18n.DateTimePatterns_fo_FO');
goog.provide('goog.i18n.DateTimePatterns_fr_BE');
goog.provide('goog.i18n.DateTimePatterns_fr_BF');
goog.provide('goog.i18n.DateTimePatterns_fr_BI');
goog.provide('goog.i18n.DateTimePatterns_fr_BJ');
goog.provide('goog.i18n.DateTimePatterns_fr_BL');
goog.provide('goog.i18n.DateTimePatterns_fr_CD');
goog.provide('goog.i18n.DateTimePatterns_fr_CF');
goog.provide('goog.i18n.DateTimePatterns_fr_CG');
goog.provide('goog.i18n.DateTimePatterns_fr_CH');
goog.provide('goog.i18n.DateTimePatterns_fr_CI');
goog.provide('goog.i18n.DateTimePatterns_fr_CM');
goog.provide('goog.i18n.DateTimePatterns_fr_DJ');
goog.provide('goog.i18n.DateTimePatterns_fr_DZ');
goog.provide('goog.i18n.DateTimePatterns_fr_FR');
goog.provide('goog.i18n.DateTimePatterns_fr_GA');
goog.provide('goog.i18n.DateTimePatterns_fr_GF');
goog.provide('goog.i18n.DateTimePatterns_fr_GN');
goog.provide('goog.i18n.DateTimePatterns_fr_GP');
goog.provide('goog.i18n.DateTimePatterns_fr_GQ');
goog.provide('goog.i18n.DateTimePatterns_fr_HT');
goog.provide('goog.i18n.DateTimePatterns_fr_KM');
goog.provide('goog.i18n.DateTimePatterns_fr_LU');
goog.provide('goog.i18n.DateTimePatterns_fr_MA');
goog.provide('goog.i18n.DateTimePatterns_fr_MC');
goog.provide('goog.i18n.DateTimePatterns_fr_MF');
goog.provide('goog.i18n.DateTimePatterns_fr_MG');
goog.provide('goog.i18n.DateTimePatterns_fr_ML');
goog.provide('goog.i18n.DateTimePatterns_fr_MQ');
goog.provide('goog.i18n.DateTimePatterns_fr_MR');
goog.provide('goog.i18n.DateTimePatterns_fr_MU');
goog.provide('goog.i18n.DateTimePatterns_fr_NC');
goog.provide('goog.i18n.DateTimePatterns_fr_NE');
goog.provide('goog.i18n.DateTimePatterns_fr_PF');
goog.provide('goog.i18n.DateTimePatterns_fr_PM');
goog.provide('goog.i18n.DateTimePatterns_fr_RE');
goog.provide('goog.i18n.DateTimePatterns_fr_RW');
goog.provide('goog.i18n.DateTimePatterns_fr_SC');
goog.provide('goog.i18n.DateTimePatterns_fr_SN');
goog.provide('goog.i18n.DateTimePatterns_fr_SY');
goog.provide('goog.i18n.DateTimePatterns_fr_TD');
goog.provide('goog.i18n.DateTimePatterns_fr_TG');
goog.provide('goog.i18n.DateTimePatterns_fr_TN');
goog.provide('goog.i18n.DateTimePatterns_fr_VU');
goog.provide('goog.i18n.DateTimePatterns_fr_WF');
goog.provide('goog.i18n.DateTimePatterns_fr_YT');
goog.provide('goog.i18n.DateTimePatterns_fur');
goog.provide('goog.i18n.DateTimePatterns_fur_IT');
goog.provide('goog.i18n.DateTimePatterns_fy');
goog.provide('goog.i18n.DateTimePatterns_fy_NL');
goog.provide('goog.i18n.DateTimePatterns_ga_GB');
goog.provide('goog.i18n.DateTimePatterns_ga_IE');
goog.provide('goog.i18n.DateTimePatterns_gd');
goog.provide('goog.i18n.DateTimePatterns_gd_GB');
goog.provide('goog.i18n.DateTimePatterns_gl_ES');
goog.provide('goog.i18n.DateTimePatterns_gsw_CH');
goog.provide('goog.i18n.DateTimePatterns_gsw_FR');
goog.provide('goog.i18n.DateTimePatterns_gsw_LI');
goog.provide('goog.i18n.DateTimePatterns_gu_IN');
goog.provide('goog.i18n.DateTimePatterns_guz');
goog.provide('goog.i18n.DateTimePatterns_guz_KE');
goog.provide('goog.i18n.DateTimePatterns_gv');
goog.provide('goog.i18n.DateTimePatterns_gv_IM');
goog.provide('goog.i18n.DateTimePatterns_ha');
goog.provide('goog.i18n.DateTimePatterns_ha_GH');
goog.provide('goog.i18n.DateTimePatterns_ha_NE');
goog.provide('goog.i18n.DateTimePatterns_ha_NG');
goog.provide('goog.i18n.DateTimePatterns_haw_US');
goog.provide('goog.i18n.DateTimePatterns_he_IL');
goog.provide('goog.i18n.DateTimePatterns_hi_IN');
goog.provide('goog.i18n.DateTimePatterns_hi_Latn');
goog.provide('goog.i18n.DateTimePatterns_hi_Latn_IN');
goog.provide('goog.i18n.DateTimePatterns_hr_BA');
goog.provide('goog.i18n.DateTimePatterns_hr_HR');
goog.provide('goog.i18n.DateTimePatterns_hsb');
goog.provide('goog.i18n.DateTimePatterns_hsb_DE');
goog.provide('goog.i18n.DateTimePatterns_hu_HU');
goog.provide('goog.i18n.DateTimePatterns_hy_AM');
goog.provide('goog.i18n.DateTimePatterns_ia');
goog.provide('goog.i18n.DateTimePatterns_ia_001');
goog.provide('goog.i18n.DateTimePatterns_id_ID');
goog.provide('goog.i18n.DateTimePatterns_ig');
goog.provide('goog.i18n.DateTimePatterns_ig_NG');
goog.provide('goog.i18n.DateTimePatterns_ii');
goog.provide('goog.i18n.DateTimePatterns_ii_CN');
goog.provide('goog.i18n.DateTimePatterns_is_IS');
goog.provide('goog.i18n.DateTimePatterns_it_CH');
goog.provide('goog.i18n.DateTimePatterns_it_IT');
goog.provide('goog.i18n.DateTimePatterns_it_SM');
goog.provide('goog.i18n.DateTimePatterns_it_VA');
goog.provide('goog.i18n.DateTimePatterns_ja_JP');
goog.provide('goog.i18n.DateTimePatterns_jgo');
goog.provide('goog.i18n.DateTimePatterns_jgo_CM');
goog.provide('goog.i18n.DateTimePatterns_jmc');
goog.provide('goog.i18n.DateTimePatterns_jmc_TZ');
goog.provide('goog.i18n.DateTimePatterns_jv');
goog.provide('goog.i18n.DateTimePatterns_jv_ID');
goog.provide('goog.i18n.DateTimePatterns_ka_GE');
goog.provide('goog.i18n.DateTimePatterns_kab');
goog.provide('goog.i18n.DateTimePatterns_kab_DZ');
goog.provide('goog.i18n.DateTimePatterns_kam');
goog.provide('goog.i18n.DateTimePatterns_kam_KE');
goog.provide('goog.i18n.DateTimePatterns_kde');
goog.provide('goog.i18n.DateTimePatterns_kde_TZ');
goog.provide('goog.i18n.DateTimePatterns_kea');
goog.provide('goog.i18n.DateTimePatterns_kea_CV');
goog.provide('goog.i18n.DateTimePatterns_kgp');
goog.provide('goog.i18n.DateTimePatterns_kgp_BR');
goog.provide('goog.i18n.DateTimePatterns_khq');
goog.provide('goog.i18n.DateTimePatterns_khq_ML');
goog.provide('goog.i18n.DateTimePatterns_ki');
goog.provide('goog.i18n.DateTimePatterns_ki_KE');
goog.provide('goog.i18n.DateTimePatterns_kk_KZ');
goog.provide('goog.i18n.DateTimePatterns_kkj');
goog.provide('goog.i18n.DateTimePatterns_kkj_CM');
goog.provide('goog.i18n.DateTimePatterns_kl');
goog.provide('goog.i18n.DateTimePatterns_kl_GL');
goog.provide('goog.i18n.DateTimePatterns_kln');
goog.provide('goog.i18n.DateTimePatterns_kln_KE');
goog.provide('goog.i18n.DateTimePatterns_km_KH');
goog.provide('goog.i18n.DateTimePatterns_kn_IN');
goog.provide('goog.i18n.DateTimePatterns_ko_KP');
goog.provide('goog.i18n.DateTimePatterns_ko_KR');
goog.provide('goog.i18n.DateTimePatterns_kok');
goog.provide('goog.i18n.DateTimePatterns_kok_IN');
goog.provide('goog.i18n.DateTimePatterns_ks');
goog.provide('goog.i18n.DateTimePatterns_ks_Arab');
goog.provide('goog.i18n.DateTimePatterns_ks_Arab_IN');
goog.provide('goog.i18n.DateTimePatterns_ks_Deva');
goog.provide('goog.i18n.DateTimePatterns_ks_Deva_IN');
goog.provide('goog.i18n.DateTimePatterns_ksb');
goog.provide('goog.i18n.DateTimePatterns_ksb_TZ');
goog.provide('goog.i18n.DateTimePatterns_ksf');
goog.provide('goog.i18n.DateTimePatterns_ksf_CM');
goog.provide('goog.i18n.DateTimePatterns_ksh');
goog.provide('goog.i18n.DateTimePatterns_ksh_DE');
goog.provide('goog.i18n.DateTimePatterns_ku');
goog.provide('goog.i18n.DateTimePatterns_ku_TR');
goog.provide('goog.i18n.DateTimePatterns_kw');
goog.provide('goog.i18n.DateTimePatterns_kw_GB');
goog.provide('goog.i18n.DateTimePatterns_ky_KG');
goog.provide('goog.i18n.DateTimePatterns_lag');
goog.provide('goog.i18n.DateTimePatterns_lag_TZ');
goog.provide('goog.i18n.DateTimePatterns_lb');
goog.provide('goog.i18n.DateTimePatterns_lb_LU');
goog.provide('goog.i18n.DateTimePatterns_lg');
goog.provide('goog.i18n.DateTimePatterns_lg_UG');
goog.provide('goog.i18n.DateTimePatterns_lkt');
goog.provide('goog.i18n.DateTimePatterns_lkt_US');
goog.provide('goog.i18n.DateTimePatterns_ln_AO');
goog.provide('goog.i18n.DateTimePatterns_ln_CD');
goog.provide('goog.i18n.DateTimePatterns_ln_CF');
goog.provide('goog.i18n.DateTimePatterns_ln_CG');
goog.provide('goog.i18n.DateTimePatterns_lo_LA');
goog.provide('goog.i18n.DateTimePatterns_lrc');
goog.provide('goog.i18n.DateTimePatterns_lrc_IQ');
goog.provide('goog.i18n.DateTimePatterns_lrc_IR');
goog.provide('goog.i18n.DateTimePatterns_lt_LT');
goog.provide('goog.i18n.DateTimePatterns_lu');
goog.provide('goog.i18n.DateTimePatterns_lu_CD');
goog.provide('goog.i18n.DateTimePatterns_luo');
goog.provide('goog.i18n.DateTimePatterns_luo_KE');
goog.provide('goog.i18n.DateTimePatterns_luy');
goog.provide('goog.i18n.DateTimePatterns_luy_KE');
goog.provide('goog.i18n.DateTimePatterns_lv_LV');
goog.provide('goog.i18n.DateTimePatterns_mai');
goog.provide('goog.i18n.DateTimePatterns_mai_IN');
goog.provide('goog.i18n.DateTimePatterns_mas');
goog.provide('goog.i18n.DateTimePatterns_mas_KE');
goog.provide('goog.i18n.DateTimePatterns_mas_TZ');
goog.provide('goog.i18n.DateTimePatterns_mer');
goog.provide('goog.i18n.DateTimePatterns_mer_KE');
goog.provide('goog.i18n.DateTimePatterns_mfe');
goog.provide('goog.i18n.DateTimePatterns_mfe_MU');
goog.provide('goog.i18n.DateTimePatterns_mg');
goog.provide('goog.i18n.DateTimePatterns_mg_MG');
goog.provide('goog.i18n.DateTimePatterns_mgh');
goog.provide('goog.i18n.DateTimePatterns_mgh_MZ');
goog.provide('goog.i18n.DateTimePatterns_mgo');
goog.provide('goog.i18n.DateTimePatterns_mgo_CM');
goog.provide('goog.i18n.DateTimePatterns_mi');
goog.provide('goog.i18n.DateTimePatterns_mi_NZ');
goog.provide('goog.i18n.DateTimePatterns_mk_MK');
goog.provide('goog.i18n.DateTimePatterns_ml_IN');
goog.provide('goog.i18n.DateTimePatterns_mn_MN');
goog.provide('goog.i18n.DateTimePatterns_mni');
goog.provide('goog.i18n.DateTimePatterns_mni_Beng');
goog.provide('goog.i18n.DateTimePatterns_mni_Beng_IN');
goog.provide('goog.i18n.DateTimePatterns_mr_IN');
goog.provide('goog.i18n.DateTimePatterns_ms_BN');
goog.provide('goog.i18n.DateTimePatterns_ms_ID');
goog.provide('goog.i18n.DateTimePatterns_ms_MY');
goog.provide('goog.i18n.DateTimePatterns_ms_SG');
goog.provide('goog.i18n.DateTimePatterns_mt_MT');
goog.provide('goog.i18n.DateTimePatterns_mua');
goog.provide('goog.i18n.DateTimePatterns_mua_CM');
goog.provide('goog.i18n.DateTimePatterns_my_MM');
goog.provide('goog.i18n.DateTimePatterns_mzn');
goog.provide('goog.i18n.DateTimePatterns_mzn_IR');
goog.provide('goog.i18n.DateTimePatterns_naq');
goog.provide('goog.i18n.DateTimePatterns_naq_NA');
goog.provide('goog.i18n.DateTimePatterns_nb_NO');
goog.provide('goog.i18n.DateTimePatterns_nb_SJ');
goog.provide('goog.i18n.DateTimePatterns_nd');
goog.provide('goog.i18n.DateTimePatterns_nd_ZW');
goog.provide('goog.i18n.DateTimePatterns_ne_IN');
goog.provide('goog.i18n.DateTimePatterns_ne_NP');
goog.provide('goog.i18n.DateTimePatterns_nl_AW');
goog.provide('goog.i18n.DateTimePatterns_nl_BE');
goog.provide('goog.i18n.DateTimePatterns_nl_BQ');
goog.provide('goog.i18n.DateTimePatterns_nl_CW');
goog.provide('goog.i18n.DateTimePatterns_nl_NL');
goog.provide('goog.i18n.DateTimePatterns_nl_SR');
goog.provide('goog.i18n.DateTimePatterns_nl_SX');
goog.provide('goog.i18n.DateTimePatterns_nmg');
goog.provide('goog.i18n.DateTimePatterns_nmg_CM');
goog.provide('goog.i18n.DateTimePatterns_nn');
goog.provide('goog.i18n.DateTimePatterns_nn_NO');
goog.provide('goog.i18n.DateTimePatterns_nnh');
goog.provide('goog.i18n.DateTimePatterns_nnh_CM');
goog.provide('goog.i18n.DateTimePatterns_nus');
goog.provide('goog.i18n.DateTimePatterns_nus_SS');
goog.provide('goog.i18n.DateTimePatterns_nyn');
goog.provide('goog.i18n.DateTimePatterns_nyn_UG');
goog.provide('goog.i18n.DateTimePatterns_om');
goog.provide('goog.i18n.DateTimePatterns_om_ET');
goog.provide('goog.i18n.DateTimePatterns_om_KE');
goog.provide('goog.i18n.DateTimePatterns_or_IN');
goog.provide('goog.i18n.DateTimePatterns_os');
goog.provide('goog.i18n.DateTimePatterns_os_GE');
goog.provide('goog.i18n.DateTimePatterns_os_RU');
goog.provide('goog.i18n.DateTimePatterns_pa_Arab');
goog.provide('goog.i18n.DateTimePatterns_pa_Arab_PK');
goog.provide('goog.i18n.DateTimePatterns_pa_Guru');
goog.provide('goog.i18n.DateTimePatterns_pa_Guru_IN');
goog.provide('goog.i18n.DateTimePatterns_pcm');
goog.provide('goog.i18n.DateTimePatterns_pcm_NG');
goog.provide('goog.i18n.DateTimePatterns_pl_PL');
goog.provide('goog.i18n.DateTimePatterns_ps');
goog.provide('goog.i18n.DateTimePatterns_ps_AF');
goog.provide('goog.i18n.DateTimePatterns_ps_PK');
goog.provide('goog.i18n.DateTimePatterns_pt_AO');
goog.provide('goog.i18n.DateTimePatterns_pt_CH');
goog.provide('goog.i18n.DateTimePatterns_pt_CV');
goog.provide('goog.i18n.DateTimePatterns_pt_GQ');
goog.provide('goog.i18n.DateTimePatterns_pt_GW');
goog.provide('goog.i18n.DateTimePatterns_pt_LU');
goog.provide('goog.i18n.DateTimePatterns_pt_MO');
goog.provide('goog.i18n.DateTimePatterns_pt_MZ');
goog.provide('goog.i18n.DateTimePatterns_pt_ST');
goog.provide('goog.i18n.DateTimePatterns_pt_TL');
goog.provide('goog.i18n.DateTimePatterns_qu');
goog.provide('goog.i18n.DateTimePatterns_qu_BO');
goog.provide('goog.i18n.DateTimePatterns_qu_EC');
goog.provide('goog.i18n.DateTimePatterns_qu_PE');
goog.provide('goog.i18n.DateTimePatterns_raj');
goog.provide('goog.i18n.DateTimePatterns_raj_IN');
goog.provide('goog.i18n.DateTimePatterns_rm');
goog.provide('goog.i18n.DateTimePatterns_rm_CH');
goog.provide('goog.i18n.DateTimePatterns_rn');
goog.provide('goog.i18n.DateTimePatterns_rn_BI');
goog.provide('goog.i18n.DateTimePatterns_ro_MD');
goog.provide('goog.i18n.DateTimePatterns_ro_RO');
goog.provide('goog.i18n.DateTimePatterns_rof');
goog.provide('goog.i18n.DateTimePatterns_rof_TZ');
goog.provide('goog.i18n.DateTimePatterns_ru_BY');
goog.provide('goog.i18n.DateTimePatterns_ru_KG');
goog.provide('goog.i18n.DateTimePatterns_ru_KZ');
goog.provide('goog.i18n.DateTimePatterns_ru_MD');
goog.provide('goog.i18n.DateTimePatterns_ru_RU');
goog.provide('goog.i18n.DateTimePatterns_ru_UA');
goog.provide('goog.i18n.DateTimePatterns_rw');
goog.provide('goog.i18n.DateTimePatterns_rw_RW');
goog.provide('goog.i18n.DateTimePatterns_rwk');
goog.provide('goog.i18n.DateTimePatterns_rwk_TZ');
goog.provide('goog.i18n.DateTimePatterns_sa');
goog.provide('goog.i18n.DateTimePatterns_sa_IN');
goog.provide('goog.i18n.DateTimePatterns_sah');
goog.provide('goog.i18n.DateTimePatterns_sah_RU');
goog.provide('goog.i18n.DateTimePatterns_saq');
goog.provide('goog.i18n.DateTimePatterns_saq_KE');
goog.provide('goog.i18n.DateTimePatterns_sat');
goog.provide('goog.i18n.DateTimePatterns_sat_Olck');
goog.provide('goog.i18n.DateTimePatterns_sat_Olck_IN');
goog.provide('goog.i18n.DateTimePatterns_sbp');
goog.provide('goog.i18n.DateTimePatterns_sbp_TZ');
goog.provide('goog.i18n.DateTimePatterns_sc');
goog.provide('goog.i18n.DateTimePatterns_sc_IT');
goog.provide('goog.i18n.DateTimePatterns_sd');
goog.provide('goog.i18n.DateTimePatterns_sd_Arab');
goog.provide('goog.i18n.DateTimePatterns_sd_Arab_PK');
goog.provide('goog.i18n.DateTimePatterns_sd_Deva');
goog.provide('goog.i18n.DateTimePatterns_sd_Deva_IN');
goog.provide('goog.i18n.DateTimePatterns_se');
goog.provide('goog.i18n.DateTimePatterns_se_FI');
goog.provide('goog.i18n.DateTimePatterns_se_NO');
goog.provide('goog.i18n.DateTimePatterns_se_SE');
goog.provide('goog.i18n.DateTimePatterns_seh');
goog.provide('goog.i18n.DateTimePatterns_seh_MZ');
goog.provide('goog.i18n.DateTimePatterns_ses');
goog.provide('goog.i18n.DateTimePatterns_ses_ML');
goog.provide('goog.i18n.DateTimePatterns_sg');
goog.provide('goog.i18n.DateTimePatterns_sg_CF');
goog.provide('goog.i18n.DateTimePatterns_shi');
goog.provide('goog.i18n.DateTimePatterns_shi_Latn');
goog.provide('goog.i18n.DateTimePatterns_shi_Latn_MA');
goog.provide('goog.i18n.DateTimePatterns_shi_Tfng');
goog.provide('goog.i18n.DateTimePatterns_shi_Tfng_MA');
goog.provide('goog.i18n.DateTimePatterns_si_LK');
goog.provide('goog.i18n.DateTimePatterns_sk_SK');
goog.provide('goog.i18n.DateTimePatterns_sl_SI');
goog.provide('goog.i18n.DateTimePatterns_smn');
goog.provide('goog.i18n.DateTimePatterns_smn_FI');
goog.provide('goog.i18n.DateTimePatterns_sn');
goog.provide('goog.i18n.DateTimePatterns_sn_ZW');
goog.provide('goog.i18n.DateTimePatterns_so');
goog.provide('goog.i18n.DateTimePatterns_so_DJ');
goog.provide('goog.i18n.DateTimePatterns_so_ET');
goog.provide('goog.i18n.DateTimePatterns_so_KE');
goog.provide('goog.i18n.DateTimePatterns_so_SO');
goog.provide('goog.i18n.DateTimePatterns_sq_AL');
goog.provide('goog.i18n.DateTimePatterns_sq_MK');
goog.provide('goog.i18n.DateTimePatterns_sq_XK');
goog.provide('goog.i18n.DateTimePatterns_sr_Cyrl');
goog.provide('goog.i18n.DateTimePatterns_sr_Cyrl_BA');
goog.provide('goog.i18n.DateTimePatterns_sr_Cyrl_ME');
goog.provide('goog.i18n.DateTimePatterns_sr_Cyrl_RS');
goog.provide('goog.i18n.DateTimePatterns_sr_Cyrl_XK');
goog.provide('goog.i18n.DateTimePatterns_sr_Latn_BA');
goog.provide('goog.i18n.DateTimePatterns_sr_Latn_ME');
goog.provide('goog.i18n.DateTimePatterns_sr_Latn_RS');
goog.provide('goog.i18n.DateTimePatterns_sr_Latn_XK');
goog.provide('goog.i18n.DateTimePatterns_su');
goog.provide('goog.i18n.DateTimePatterns_su_Latn');
goog.provide('goog.i18n.DateTimePatterns_su_Latn_ID');
goog.provide('goog.i18n.DateTimePatterns_sv_AX');
goog.provide('goog.i18n.DateTimePatterns_sv_FI');
goog.provide('goog.i18n.DateTimePatterns_sv_SE');
goog.provide('goog.i18n.DateTimePatterns_sw_CD');
goog.provide('goog.i18n.DateTimePatterns_sw_KE');
goog.provide('goog.i18n.DateTimePatterns_sw_TZ');
goog.provide('goog.i18n.DateTimePatterns_sw_UG');
goog.provide('goog.i18n.DateTimePatterns_ta_IN');
goog.provide('goog.i18n.DateTimePatterns_ta_LK');
goog.provide('goog.i18n.DateTimePatterns_ta_MY');
goog.provide('goog.i18n.DateTimePatterns_ta_SG');
goog.provide('goog.i18n.DateTimePatterns_te_IN');
goog.provide('goog.i18n.DateTimePatterns_teo');
goog.provide('goog.i18n.DateTimePatterns_teo_KE');
goog.provide('goog.i18n.DateTimePatterns_teo_UG');
goog.provide('goog.i18n.DateTimePatterns_tg');
goog.provide('goog.i18n.DateTimePatterns_tg_TJ');
goog.provide('goog.i18n.DateTimePatterns_th_TH');
goog.provide('goog.i18n.DateTimePatterns_ti');
goog.provide('goog.i18n.DateTimePatterns_ti_ER');
goog.provide('goog.i18n.DateTimePatterns_ti_ET');
goog.provide('goog.i18n.DateTimePatterns_tk');
goog.provide('goog.i18n.DateTimePatterns_tk_TM');
goog.provide('goog.i18n.DateTimePatterns_to');
goog.provide('goog.i18n.DateTimePatterns_to_TO');
goog.provide('goog.i18n.DateTimePatterns_tr_CY');
goog.provide('goog.i18n.DateTimePatterns_tr_TR');
goog.provide('goog.i18n.DateTimePatterns_tt');
goog.provide('goog.i18n.DateTimePatterns_tt_RU');
goog.provide('goog.i18n.DateTimePatterns_twq');
goog.provide('goog.i18n.DateTimePatterns_twq_NE');
goog.provide('goog.i18n.DateTimePatterns_tzm');
goog.provide('goog.i18n.DateTimePatterns_tzm_MA');
goog.provide('goog.i18n.DateTimePatterns_ug');
goog.provide('goog.i18n.DateTimePatterns_ug_CN');
goog.provide('goog.i18n.DateTimePatterns_uk_UA');
goog.provide('goog.i18n.DateTimePatterns_ur_IN');
goog.provide('goog.i18n.DateTimePatterns_ur_PK');
goog.provide('goog.i18n.DateTimePatterns_uz_Arab');
goog.provide('goog.i18n.DateTimePatterns_uz_Arab_AF');
goog.provide('goog.i18n.DateTimePatterns_uz_Cyrl');
goog.provide('goog.i18n.DateTimePatterns_uz_Cyrl_UZ');
goog.provide('goog.i18n.DateTimePatterns_uz_Latn');
goog.provide('goog.i18n.DateTimePatterns_uz_Latn_UZ');
goog.provide('goog.i18n.DateTimePatterns_vai');
goog.provide('goog.i18n.DateTimePatterns_vai_Latn');
goog.provide('goog.i18n.DateTimePatterns_vai_Latn_LR');
goog.provide('goog.i18n.DateTimePatterns_vai_Vaii');
goog.provide('goog.i18n.DateTimePatterns_vai_Vaii_LR');
goog.provide('goog.i18n.DateTimePatterns_vi_VN');
goog.provide('goog.i18n.DateTimePatterns_vun');
goog.provide('goog.i18n.DateTimePatterns_vun_TZ');
goog.provide('goog.i18n.DateTimePatterns_wae');
goog.provide('goog.i18n.DateTimePatterns_wae_CH');
goog.provide('goog.i18n.DateTimePatterns_wo');
goog.provide('goog.i18n.DateTimePatterns_wo_SN');
goog.provide('goog.i18n.DateTimePatterns_xh');
goog.provide('goog.i18n.DateTimePatterns_xh_ZA');
goog.provide('goog.i18n.DateTimePatterns_xog');
goog.provide('goog.i18n.DateTimePatterns_xog_UG');
goog.provide('goog.i18n.DateTimePatterns_yav');
goog.provide('goog.i18n.DateTimePatterns_yav_CM');
goog.provide('goog.i18n.DateTimePatterns_yi');
goog.provide('goog.i18n.DateTimePatterns_yi_001');
goog.provide('goog.i18n.DateTimePatterns_yo');
goog.provide('goog.i18n.DateTimePatterns_yo_BJ');
goog.provide('goog.i18n.DateTimePatterns_yo_NG');
goog.provide('goog.i18n.DateTimePatterns_yrl');
goog.provide('goog.i18n.DateTimePatterns_yrl_BR');
goog.provide('goog.i18n.DateTimePatterns_yrl_CO');
goog.provide('goog.i18n.DateTimePatterns_yrl_VE');
goog.provide('goog.i18n.DateTimePatterns_yue');
goog.provide('goog.i18n.DateTimePatterns_yue_Hans');
goog.provide('goog.i18n.DateTimePatterns_yue_Hans_CN');
goog.provide('goog.i18n.DateTimePatterns_yue_Hant');
goog.provide('goog.i18n.DateTimePatterns_yue_Hant_HK');
goog.provide('goog.i18n.DateTimePatterns_zgh');
goog.provide('goog.i18n.DateTimePatterns_zgh_MA');
goog.provide('goog.i18n.DateTimePatterns_zh_Hans');
goog.provide('goog.i18n.DateTimePatterns_zh_Hans_CN');
goog.provide('goog.i18n.DateTimePatterns_zh_Hans_HK');
goog.provide('goog.i18n.DateTimePatterns_zh_Hans_MO');
goog.provide('goog.i18n.DateTimePatterns_zh_Hans_SG');
goog.provide('goog.i18n.DateTimePatterns_zh_Hant');
goog.provide('goog.i18n.DateTimePatterns_zh_Hant_HK');
goog.provide('goog.i18n.DateTimePatterns_zh_Hant_MO');
goog.provide('goog.i18n.DateTimePatterns_zh_Hant_TW');
goog.provide('goog.i18n.DateTimePatterns_zu_ZA');
goog.require('goog.i18n.DateTimePatterns');

goog.require('goog.i18n.cldr41.DateTimePatterns');
goog.require('goog.i18n.cldr41.DateTimePatterns_af_NA');
goog.require('goog.i18n.cldr41.DateTimePatterns_af_ZA');
goog.require('goog.i18n.cldr41.DateTimePatterns_agq');
goog.require('goog.i18n.cldr41.DateTimePatterns_agq_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ak');
goog.require('goog.i18n.cldr41.DateTimePatterns_ak_GH');
goog.require('goog.i18n.cldr41.DateTimePatterns_am_ET');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_001');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_AE');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_BH');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_DJ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_EH');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_ER');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_IL');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_IQ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_JO');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_KM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_KW');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_LB');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_LY');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_MA');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_MR');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_OM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_PS');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_QA');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_SA');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_SD');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_SO');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_SS');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_SY');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_TD');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_TN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_XB');
goog.require('goog.i18n.cldr41.DateTimePatterns_ar_YE');
goog.require('goog.i18n.cldr41.DateTimePatterns_as');
goog.require('goog.i18n.cldr41.DateTimePatterns_as_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_asa');
goog.require('goog.i18n.cldr41.DateTimePatterns_asa_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ast');
goog.require('goog.i18n.cldr41.DateTimePatterns_ast_ES');
goog.require('goog.i18n.cldr41.DateTimePatterns_az_Cyrl');
goog.require('goog.i18n.cldr41.DateTimePatterns_az_Cyrl_AZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_az_Latn');
goog.require('goog.i18n.cldr41.DateTimePatterns_az_Latn_AZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_bas');
goog.require('goog.i18n.cldr41.DateTimePatterns_bas_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_be_BY');
goog.require('goog.i18n.cldr41.DateTimePatterns_bem');
goog.require('goog.i18n.cldr41.DateTimePatterns_bem_ZM');
goog.require('goog.i18n.cldr41.DateTimePatterns_bez');
goog.require('goog.i18n.cldr41.DateTimePatterns_bez_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_bg_BG');
goog.require('goog.i18n.cldr41.DateTimePatterns_bm');
goog.require('goog.i18n.cldr41.DateTimePatterns_bm_ML');
goog.require('goog.i18n.cldr41.DateTimePatterns_bn_BD');
goog.require('goog.i18n.cldr41.DateTimePatterns_bn_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_bo');
goog.require('goog.i18n.cldr41.DateTimePatterns_bo_CN');
goog.require('goog.i18n.cldr41.DateTimePatterns_bo_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_br_FR');
goog.require('goog.i18n.cldr41.DateTimePatterns_brx');
goog.require('goog.i18n.cldr41.DateTimePatterns_brx_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_bs_Cyrl');
goog.require('goog.i18n.cldr41.DateTimePatterns_bs_Cyrl_BA');
goog.require('goog.i18n.cldr41.DateTimePatterns_bs_Latn');
goog.require('goog.i18n.cldr41.DateTimePatterns_bs_Latn_BA');
goog.require('goog.i18n.cldr41.DateTimePatterns_ca_AD');
goog.require('goog.i18n.cldr41.DateTimePatterns_ca_ES');
goog.require('goog.i18n.cldr41.DateTimePatterns_ca_FR');
goog.require('goog.i18n.cldr41.DateTimePatterns_ca_IT');
goog.require('goog.i18n.cldr41.DateTimePatterns_ccp');
goog.require('goog.i18n.cldr41.DateTimePatterns_ccp_BD');
goog.require('goog.i18n.cldr41.DateTimePatterns_ccp_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ce');
goog.require('goog.i18n.cldr41.DateTimePatterns_ce_RU');
goog.require('goog.i18n.cldr41.DateTimePatterns_ceb');
goog.require('goog.i18n.cldr41.DateTimePatterns_ceb_PH');
goog.require('goog.i18n.cldr41.DateTimePatterns_cgg');
goog.require('goog.i18n.cldr41.DateTimePatterns_cgg_UG');
goog.require('goog.i18n.cldr41.DateTimePatterns_chr_US');
goog.require('goog.i18n.cldr41.DateTimePatterns_ckb');
goog.require('goog.i18n.cldr41.DateTimePatterns_ckb_Arab');
goog.require('goog.i18n.cldr41.DateTimePatterns_ckb_Arab_IQ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ckb_Arab_IR');
goog.require('goog.i18n.cldr41.DateTimePatterns_ckb_IQ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ckb_IR');
goog.require('goog.i18n.cldr41.DateTimePatterns_cs_CZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_cy_GB');
goog.require('goog.i18n.cldr41.DateTimePatterns_da_DK');
goog.require('goog.i18n.cldr41.DateTimePatterns_da_GL');
goog.require('goog.i18n.cldr41.DateTimePatterns_dav');
goog.require('goog.i18n.cldr41.DateTimePatterns_dav_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_de_BE');
goog.require('goog.i18n.cldr41.DateTimePatterns_de_DE');
goog.require('goog.i18n.cldr41.DateTimePatterns_de_IT');
goog.require('goog.i18n.cldr41.DateTimePatterns_de_LI');
goog.require('goog.i18n.cldr41.DateTimePatterns_de_LU');
goog.require('goog.i18n.cldr41.DateTimePatterns_dje');
goog.require('goog.i18n.cldr41.DateTimePatterns_dje_NE');
goog.require('goog.i18n.cldr41.DateTimePatterns_doi');
goog.require('goog.i18n.cldr41.DateTimePatterns_doi_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_dsb');
goog.require('goog.i18n.cldr41.DateTimePatterns_dsb_DE');
goog.require('goog.i18n.cldr41.DateTimePatterns_dua');
goog.require('goog.i18n.cldr41.DateTimePatterns_dua_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_dyo');
goog.require('goog.i18n.cldr41.DateTimePatterns_dyo_SN');
goog.require('goog.i18n.cldr41.DateTimePatterns_dz');
goog.require('goog.i18n.cldr41.DateTimePatterns_dz_BT');
goog.require('goog.i18n.cldr41.DateTimePatterns_ebu');
goog.require('goog.i18n.cldr41.DateTimePatterns_ebu_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_ee');
goog.require('goog.i18n.cldr41.DateTimePatterns_ee_GH');
goog.require('goog.i18n.cldr41.DateTimePatterns_ee_TG');
goog.require('goog.i18n.cldr41.DateTimePatterns_el_CY');
goog.require('goog.i18n.cldr41.DateTimePatterns_el_GR');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_001');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_150');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_AE');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_AG');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_AI');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_AS');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_AT');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_BB');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_BE');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_BI');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_BM');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_BS');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_BW');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_BZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_CC');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_CH');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_CK');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_CX');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_CY');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_DE');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_DG');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_DK');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_DM');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_ER');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_FI');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_FJ');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_FK');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_FM');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_GD');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_GG');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_GH');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_GI');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_GM');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_GU');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_GY');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_HK');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_IL');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_IM');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_IO');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_JE');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_JM');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_KI');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_KN');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_KY');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_LC');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_LR');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_LS');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MG');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MH');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MO');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MP');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MS');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MT');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MU');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MV');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MW');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_MY');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_NA');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_NF');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_NG');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_NL');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_NR');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_NU');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_NZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_PG');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_PH');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_PK');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_PN');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_PR');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_PW');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_RW');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SB');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SC');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SD');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SE');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SH');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SI');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SL');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SS');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SX');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_SZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_TC');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_TK');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_TO');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_TT');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_TV');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_UG');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_UM');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_US_POSIX');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_VC');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_VG');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_VI');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_VU');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_WS');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_XA');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_ZM');
goog.require('goog.i18n.cldr41.DateTimePatterns_en_ZW');
goog.require('goog.i18n.cldr41.DateTimePatterns_eo');
goog.require('goog.i18n.cldr41.DateTimePatterns_eo_001');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_AR');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_BO');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_BR');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_BZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_CL');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_CO');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_CR');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_CU');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_DO');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_EA');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_EC');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_GQ');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_GT');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_HN');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_IC');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_NI');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_PA');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_PE');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_PH');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_PR');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_PY');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_SV');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_UY');
goog.require('goog.i18n.cldr41.DateTimePatterns_es_VE');
goog.require('goog.i18n.cldr41.DateTimePatterns_et_EE');
goog.require('goog.i18n.cldr41.DateTimePatterns_eu_ES');
goog.require('goog.i18n.cldr41.DateTimePatterns_ewo');
goog.require('goog.i18n.cldr41.DateTimePatterns_ewo_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_fa_AF');
goog.require('goog.i18n.cldr41.DateTimePatterns_fa_IR');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_BF');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_GH');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_GM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_GN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_GW');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_LR');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_MR');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_NE');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_NG');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_SL');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Adlm_SN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_BF');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_GH');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_GM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_GN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_GW');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_LR');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_MR');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_NE');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_NG');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_SL');
goog.require('goog.i18n.cldr41.DateTimePatterns_ff_Latn_SN');
goog.require('goog.i18n.cldr41.DateTimePatterns_fi_FI');
goog.require('goog.i18n.cldr41.DateTimePatterns_fil_PH');
goog.require('goog.i18n.cldr41.DateTimePatterns_fo');
goog.require('goog.i18n.cldr41.DateTimePatterns_fo_DK');
goog.require('goog.i18n.cldr41.DateTimePatterns_fo_FO');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_BE');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_BF');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_BI');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_BJ');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_BL');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_CD');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_CF');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_CG');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_CH');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_CI');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_DJ');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_DZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_FR');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_GA');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_GF');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_GN');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_GP');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_GQ');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_HT');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_KM');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_LU');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_MA');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_MC');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_MF');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_MG');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_ML');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_MQ');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_MR');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_MU');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_NC');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_NE');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_PF');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_PM');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_RE');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_RW');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_SC');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_SN');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_SY');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_TD');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_TG');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_TN');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_VU');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_WF');
goog.require('goog.i18n.cldr41.DateTimePatterns_fr_YT');
goog.require('goog.i18n.cldr41.DateTimePatterns_fur');
goog.require('goog.i18n.cldr41.DateTimePatterns_fur_IT');
goog.require('goog.i18n.cldr41.DateTimePatterns_fy');
goog.require('goog.i18n.cldr41.DateTimePatterns_fy_NL');
goog.require('goog.i18n.cldr41.DateTimePatterns_ga_GB');
goog.require('goog.i18n.cldr41.DateTimePatterns_ga_IE');
goog.require('goog.i18n.cldr41.DateTimePatterns_gd');
goog.require('goog.i18n.cldr41.DateTimePatterns_gd_GB');
goog.require('goog.i18n.cldr41.DateTimePatterns_gl_ES');
goog.require('goog.i18n.cldr41.DateTimePatterns_gsw_CH');
goog.require('goog.i18n.cldr41.DateTimePatterns_gsw_FR');
goog.require('goog.i18n.cldr41.DateTimePatterns_gsw_LI');
goog.require('goog.i18n.cldr41.DateTimePatterns_gu_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_guz');
goog.require('goog.i18n.cldr41.DateTimePatterns_guz_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_gv');
goog.require('goog.i18n.cldr41.DateTimePatterns_gv_IM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ha');
goog.require('goog.i18n.cldr41.DateTimePatterns_ha_GH');
goog.require('goog.i18n.cldr41.DateTimePatterns_ha_NE');
goog.require('goog.i18n.cldr41.DateTimePatterns_ha_NG');
goog.require('goog.i18n.cldr41.DateTimePatterns_haw_US');
goog.require('goog.i18n.cldr41.DateTimePatterns_he_IL');
goog.require('goog.i18n.cldr41.DateTimePatterns_hi_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_hi_Latn');
goog.require('goog.i18n.cldr41.DateTimePatterns_hi_Latn_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_hr_BA');
goog.require('goog.i18n.cldr41.DateTimePatterns_hr_HR');
goog.require('goog.i18n.cldr41.DateTimePatterns_hsb');
goog.require('goog.i18n.cldr41.DateTimePatterns_hsb_DE');
goog.require('goog.i18n.cldr41.DateTimePatterns_hu_HU');
goog.require('goog.i18n.cldr41.DateTimePatterns_hy_AM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ia');
goog.require('goog.i18n.cldr41.DateTimePatterns_ia_001');
goog.require('goog.i18n.cldr41.DateTimePatterns_id_ID');
goog.require('goog.i18n.cldr41.DateTimePatterns_ig');
goog.require('goog.i18n.cldr41.DateTimePatterns_ig_NG');
goog.require('goog.i18n.cldr41.DateTimePatterns_ii');
goog.require('goog.i18n.cldr41.DateTimePatterns_ii_CN');
goog.require('goog.i18n.cldr41.DateTimePatterns_is_IS');
goog.require('goog.i18n.cldr41.DateTimePatterns_it_CH');
goog.require('goog.i18n.cldr41.DateTimePatterns_it_IT');
goog.require('goog.i18n.cldr41.DateTimePatterns_it_SM');
goog.require('goog.i18n.cldr41.DateTimePatterns_it_VA');
goog.require('goog.i18n.cldr41.DateTimePatterns_ja_JP');
goog.require('goog.i18n.cldr41.DateTimePatterns_jgo');
goog.require('goog.i18n.cldr41.DateTimePatterns_jgo_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_jmc');
goog.require('goog.i18n.cldr41.DateTimePatterns_jmc_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_jv');
goog.require('goog.i18n.cldr41.DateTimePatterns_jv_ID');
goog.require('goog.i18n.cldr41.DateTimePatterns_ka_GE');
goog.require('goog.i18n.cldr41.DateTimePatterns_kab');
goog.require('goog.i18n.cldr41.DateTimePatterns_kab_DZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_kam');
goog.require('goog.i18n.cldr41.DateTimePatterns_kam_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_kde');
goog.require('goog.i18n.cldr41.DateTimePatterns_kde_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_kea');
goog.require('goog.i18n.cldr41.DateTimePatterns_kea_CV');
goog.require('goog.i18n.cldr41.DateTimePatterns_kgp');
goog.require('goog.i18n.cldr41.DateTimePatterns_kgp_BR');
goog.require('goog.i18n.cldr41.DateTimePatterns_khq');
goog.require('goog.i18n.cldr41.DateTimePatterns_khq_ML');
goog.require('goog.i18n.cldr41.DateTimePatterns_ki');
goog.require('goog.i18n.cldr41.DateTimePatterns_ki_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_kk_KZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_kkj');
goog.require('goog.i18n.cldr41.DateTimePatterns_kkj_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_kl');
goog.require('goog.i18n.cldr41.DateTimePatterns_kl_GL');
goog.require('goog.i18n.cldr41.DateTimePatterns_kln');
goog.require('goog.i18n.cldr41.DateTimePatterns_kln_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_km_KH');
goog.require('goog.i18n.cldr41.DateTimePatterns_kn_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ko_KP');
goog.require('goog.i18n.cldr41.DateTimePatterns_ko_KR');
goog.require('goog.i18n.cldr41.DateTimePatterns_kok');
goog.require('goog.i18n.cldr41.DateTimePatterns_kok_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ks');
goog.require('goog.i18n.cldr41.DateTimePatterns_ks_Arab');
goog.require('goog.i18n.cldr41.DateTimePatterns_ks_Arab_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ks_Deva');
goog.require('goog.i18n.cldr41.DateTimePatterns_ks_Deva_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ksb');
goog.require('goog.i18n.cldr41.DateTimePatterns_ksb_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ksf');
goog.require('goog.i18n.cldr41.DateTimePatterns_ksf_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_ksh');
goog.require('goog.i18n.cldr41.DateTimePatterns_ksh_DE');
goog.require('goog.i18n.cldr41.DateTimePatterns_ku');
goog.require('goog.i18n.cldr41.DateTimePatterns_ku_TR');
goog.require('goog.i18n.cldr41.DateTimePatterns_kw');
goog.require('goog.i18n.cldr41.DateTimePatterns_kw_GB');
goog.require('goog.i18n.cldr41.DateTimePatterns_ky_KG');
goog.require('goog.i18n.cldr41.DateTimePatterns_lag');
goog.require('goog.i18n.cldr41.DateTimePatterns_lag_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_lb');
goog.require('goog.i18n.cldr41.DateTimePatterns_lb_LU');
goog.require('goog.i18n.cldr41.DateTimePatterns_lg');
goog.require('goog.i18n.cldr41.DateTimePatterns_lg_UG');
goog.require('goog.i18n.cldr41.DateTimePatterns_lkt');
goog.require('goog.i18n.cldr41.DateTimePatterns_lkt_US');
goog.require('goog.i18n.cldr41.DateTimePatterns_ln_AO');
goog.require('goog.i18n.cldr41.DateTimePatterns_ln_CD');
goog.require('goog.i18n.cldr41.DateTimePatterns_ln_CF');
goog.require('goog.i18n.cldr41.DateTimePatterns_ln_CG');
goog.require('goog.i18n.cldr41.DateTimePatterns_lo_LA');
goog.require('goog.i18n.cldr41.DateTimePatterns_lrc');
goog.require('goog.i18n.cldr41.DateTimePatterns_lrc_IQ');
goog.require('goog.i18n.cldr41.DateTimePatterns_lrc_IR');
goog.require('goog.i18n.cldr41.DateTimePatterns_lt_LT');
goog.require('goog.i18n.cldr41.DateTimePatterns_lu');
goog.require('goog.i18n.cldr41.DateTimePatterns_lu_CD');
goog.require('goog.i18n.cldr41.DateTimePatterns_luo');
goog.require('goog.i18n.cldr41.DateTimePatterns_luo_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_luy');
goog.require('goog.i18n.cldr41.DateTimePatterns_luy_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_lv_LV');
goog.require('goog.i18n.cldr41.DateTimePatterns_mai');
goog.require('goog.i18n.cldr41.DateTimePatterns_mai_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_mas');
goog.require('goog.i18n.cldr41.DateTimePatterns_mas_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_mas_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_mer');
goog.require('goog.i18n.cldr41.DateTimePatterns_mer_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_mfe');
goog.require('goog.i18n.cldr41.DateTimePatterns_mfe_MU');
goog.require('goog.i18n.cldr41.DateTimePatterns_mg');
goog.require('goog.i18n.cldr41.DateTimePatterns_mg_MG');
goog.require('goog.i18n.cldr41.DateTimePatterns_mgh');
goog.require('goog.i18n.cldr41.DateTimePatterns_mgh_MZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_mgo');
goog.require('goog.i18n.cldr41.DateTimePatterns_mgo_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_mi');
goog.require('goog.i18n.cldr41.DateTimePatterns_mi_NZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_mk_MK');
goog.require('goog.i18n.cldr41.DateTimePatterns_ml_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_mn_MN');
goog.require('goog.i18n.cldr41.DateTimePatterns_mni');
goog.require('goog.i18n.cldr41.DateTimePatterns_mni_Beng');
goog.require('goog.i18n.cldr41.DateTimePatterns_mni_Beng_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_mr_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ms_BN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ms_ID');
goog.require('goog.i18n.cldr41.DateTimePatterns_ms_MY');
goog.require('goog.i18n.cldr41.DateTimePatterns_ms_SG');
goog.require('goog.i18n.cldr41.DateTimePatterns_mt_MT');
goog.require('goog.i18n.cldr41.DateTimePatterns_mua');
goog.require('goog.i18n.cldr41.DateTimePatterns_mua_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_my_MM');
goog.require('goog.i18n.cldr41.DateTimePatterns_mzn');
goog.require('goog.i18n.cldr41.DateTimePatterns_mzn_IR');
goog.require('goog.i18n.cldr41.DateTimePatterns_naq');
goog.require('goog.i18n.cldr41.DateTimePatterns_naq_NA');
goog.require('goog.i18n.cldr41.DateTimePatterns_nb_NO');
goog.require('goog.i18n.cldr41.DateTimePatterns_nb_SJ');
goog.require('goog.i18n.cldr41.DateTimePatterns_nd');
goog.require('goog.i18n.cldr41.DateTimePatterns_nd_ZW');
goog.require('goog.i18n.cldr41.DateTimePatterns_ne_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ne_NP');
goog.require('goog.i18n.cldr41.DateTimePatterns_nl_AW');
goog.require('goog.i18n.cldr41.DateTimePatterns_nl_BE');
goog.require('goog.i18n.cldr41.DateTimePatterns_nl_BQ');
goog.require('goog.i18n.cldr41.DateTimePatterns_nl_CW');
goog.require('goog.i18n.cldr41.DateTimePatterns_nl_NL');
goog.require('goog.i18n.cldr41.DateTimePatterns_nl_SR');
goog.require('goog.i18n.cldr41.DateTimePatterns_nl_SX');
goog.require('goog.i18n.cldr41.DateTimePatterns_nmg');
goog.require('goog.i18n.cldr41.DateTimePatterns_nmg_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_nn');
goog.require('goog.i18n.cldr41.DateTimePatterns_nn_NO');
goog.require('goog.i18n.cldr41.DateTimePatterns_nnh');
goog.require('goog.i18n.cldr41.DateTimePatterns_nnh_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_nus');
goog.require('goog.i18n.cldr41.DateTimePatterns_nus_SS');
goog.require('goog.i18n.cldr41.DateTimePatterns_nyn');
goog.require('goog.i18n.cldr41.DateTimePatterns_nyn_UG');
goog.require('goog.i18n.cldr41.DateTimePatterns_om');
goog.require('goog.i18n.cldr41.DateTimePatterns_om_ET');
goog.require('goog.i18n.cldr41.DateTimePatterns_om_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_or_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_os');
goog.require('goog.i18n.cldr41.DateTimePatterns_os_GE');
goog.require('goog.i18n.cldr41.DateTimePatterns_os_RU');
goog.require('goog.i18n.cldr41.DateTimePatterns_pa_Arab');
goog.require('goog.i18n.cldr41.DateTimePatterns_pa_Arab_PK');
goog.require('goog.i18n.cldr41.DateTimePatterns_pa_Guru');
goog.require('goog.i18n.cldr41.DateTimePatterns_pa_Guru_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_pcm');
goog.require('goog.i18n.cldr41.DateTimePatterns_pcm_NG');
goog.require('goog.i18n.cldr41.DateTimePatterns_pl_PL');
goog.require('goog.i18n.cldr41.DateTimePatterns_ps');
goog.require('goog.i18n.cldr41.DateTimePatterns_ps_AF');
goog.require('goog.i18n.cldr41.DateTimePatterns_ps_PK');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_AO');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_CH');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_CV');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_GQ');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_GW');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_LU');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_MO');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_MZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_ST');
goog.require('goog.i18n.cldr41.DateTimePatterns_pt_TL');
goog.require('goog.i18n.cldr41.DateTimePatterns_qu');
goog.require('goog.i18n.cldr41.DateTimePatterns_qu_BO');
goog.require('goog.i18n.cldr41.DateTimePatterns_qu_EC');
goog.require('goog.i18n.cldr41.DateTimePatterns_qu_PE');
goog.require('goog.i18n.cldr41.DateTimePatterns_rm');
goog.require('goog.i18n.cldr41.DateTimePatterns_rm_CH');
goog.require('goog.i18n.cldr41.DateTimePatterns_rn');
goog.require('goog.i18n.cldr41.DateTimePatterns_rn_BI');
goog.require('goog.i18n.cldr41.DateTimePatterns_ro_MD');
goog.require('goog.i18n.cldr41.DateTimePatterns_ro_RO');
goog.require('goog.i18n.cldr41.DateTimePatterns_rof');
goog.require('goog.i18n.cldr41.DateTimePatterns_rof_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ru_BY');
goog.require('goog.i18n.cldr41.DateTimePatterns_ru_KG');
goog.require('goog.i18n.cldr41.DateTimePatterns_ru_KZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ru_MD');
goog.require('goog.i18n.cldr41.DateTimePatterns_ru_RU');
goog.require('goog.i18n.cldr41.DateTimePatterns_ru_UA');
goog.require('goog.i18n.cldr41.DateTimePatterns_rw');
goog.require('goog.i18n.cldr41.DateTimePatterns_rw_RW');
goog.require('goog.i18n.cldr41.DateTimePatterns_rwk');
goog.require('goog.i18n.cldr41.DateTimePatterns_rwk_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_sa');
goog.require('goog.i18n.cldr41.DateTimePatterns_sa_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_sah');
goog.require('goog.i18n.cldr41.DateTimePatterns_sah_RU');
goog.require('goog.i18n.cldr41.DateTimePatterns_saq');
goog.require('goog.i18n.cldr41.DateTimePatterns_saq_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_sat');
goog.require('goog.i18n.cldr41.DateTimePatterns_sat_Olck');
goog.require('goog.i18n.cldr41.DateTimePatterns_sat_Olck_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_sbp');
goog.require('goog.i18n.cldr41.DateTimePatterns_sbp_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_sc');
goog.require('goog.i18n.cldr41.DateTimePatterns_sc_IT');
goog.require('goog.i18n.cldr41.DateTimePatterns_sd');
goog.require('goog.i18n.cldr41.DateTimePatterns_sd_Arab');
goog.require('goog.i18n.cldr41.DateTimePatterns_sd_Arab_PK');
goog.require('goog.i18n.cldr41.DateTimePatterns_sd_Deva');
goog.require('goog.i18n.cldr41.DateTimePatterns_sd_Deva_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_se');
goog.require('goog.i18n.cldr41.DateTimePatterns_se_FI');
goog.require('goog.i18n.cldr41.DateTimePatterns_se_NO');
goog.require('goog.i18n.cldr41.DateTimePatterns_se_SE');
goog.require('goog.i18n.cldr41.DateTimePatterns_seh');
goog.require('goog.i18n.cldr41.DateTimePatterns_seh_MZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_ses');
goog.require('goog.i18n.cldr41.DateTimePatterns_ses_ML');
goog.require('goog.i18n.cldr41.DateTimePatterns_sg');
goog.require('goog.i18n.cldr41.DateTimePatterns_sg_CF');
goog.require('goog.i18n.cldr41.DateTimePatterns_shi');
goog.require('goog.i18n.cldr41.DateTimePatterns_shi_Latn');
goog.require('goog.i18n.cldr41.DateTimePatterns_shi_Latn_MA');
goog.require('goog.i18n.cldr41.DateTimePatterns_shi_Tfng');
goog.require('goog.i18n.cldr41.DateTimePatterns_shi_Tfng_MA');
goog.require('goog.i18n.cldr41.DateTimePatterns_si_LK');
goog.require('goog.i18n.cldr41.DateTimePatterns_sk_SK');
goog.require('goog.i18n.cldr41.DateTimePatterns_sl_SI');
goog.require('goog.i18n.cldr41.DateTimePatterns_smn');
goog.require('goog.i18n.cldr41.DateTimePatterns_smn_FI');
goog.require('goog.i18n.cldr41.DateTimePatterns_sn');
goog.require('goog.i18n.cldr41.DateTimePatterns_sn_ZW');
goog.require('goog.i18n.cldr41.DateTimePatterns_so');
goog.require('goog.i18n.cldr41.DateTimePatterns_so_DJ');
goog.require('goog.i18n.cldr41.DateTimePatterns_so_ET');
goog.require('goog.i18n.cldr41.DateTimePatterns_so_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_so_SO');
goog.require('goog.i18n.cldr41.DateTimePatterns_sq_AL');
goog.require('goog.i18n.cldr41.DateTimePatterns_sq_MK');
goog.require('goog.i18n.cldr41.DateTimePatterns_sq_XK');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Cyrl');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Cyrl_BA');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Cyrl_ME');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Cyrl_RS');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Cyrl_XK');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Latn_BA');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Latn_ME');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Latn_RS');
goog.require('goog.i18n.cldr41.DateTimePatterns_sr_Latn_XK');
goog.require('goog.i18n.cldr41.DateTimePatterns_su');
goog.require('goog.i18n.cldr41.DateTimePatterns_su_Latn');
goog.require('goog.i18n.cldr41.DateTimePatterns_su_Latn_ID');
goog.require('goog.i18n.cldr41.DateTimePatterns_sv_AX');
goog.require('goog.i18n.cldr41.DateTimePatterns_sv_FI');
goog.require('goog.i18n.cldr41.DateTimePatterns_sv_SE');
goog.require('goog.i18n.cldr41.DateTimePatterns_sw_CD');
goog.require('goog.i18n.cldr41.DateTimePatterns_sw_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_sw_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_sw_UG');
goog.require('goog.i18n.cldr41.DateTimePatterns_ta_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ta_LK');
goog.require('goog.i18n.cldr41.DateTimePatterns_ta_MY');
goog.require('goog.i18n.cldr41.DateTimePatterns_ta_SG');
goog.require('goog.i18n.cldr41.DateTimePatterns_te_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_teo');
goog.require('goog.i18n.cldr41.DateTimePatterns_teo_KE');
goog.require('goog.i18n.cldr41.DateTimePatterns_teo_UG');
goog.require('goog.i18n.cldr41.DateTimePatterns_tg');
goog.require('goog.i18n.cldr41.DateTimePatterns_tg_TJ');
goog.require('goog.i18n.cldr41.DateTimePatterns_th_TH');
goog.require('goog.i18n.cldr41.DateTimePatterns_ti');
goog.require('goog.i18n.cldr41.DateTimePatterns_ti_ER');
goog.require('goog.i18n.cldr41.DateTimePatterns_ti_ET');
goog.require('goog.i18n.cldr41.DateTimePatterns_tk');
goog.require('goog.i18n.cldr41.DateTimePatterns_tk_TM');
goog.require('goog.i18n.cldr41.DateTimePatterns_to');
goog.require('goog.i18n.cldr41.DateTimePatterns_to_TO');
goog.require('goog.i18n.cldr41.DateTimePatterns_tr_CY');
goog.require('goog.i18n.cldr41.DateTimePatterns_tr_TR');
goog.require('goog.i18n.cldr41.DateTimePatterns_tt');
goog.require('goog.i18n.cldr41.DateTimePatterns_tt_RU');
goog.require('goog.i18n.cldr41.DateTimePatterns_twq');
goog.require('goog.i18n.cldr41.DateTimePatterns_twq_NE');
goog.require('goog.i18n.cldr41.DateTimePatterns_tzm');
goog.require('goog.i18n.cldr41.DateTimePatterns_tzm_MA');
goog.require('goog.i18n.cldr41.DateTimePatterns_ug');
goog.require('goog.i18n.cldr41.DateTimePatterns_ug_CN');
goog.require('goog.i18n.cldr41.DateTimePatterns_uk_UA');
goog.require('goog.i18n.cldr41.DateTimePatterns_ur_IN');
goog.require('goog.i18n.cldr41.DateTimePatterns_ur_PK');
goog.require('goog.i18n.cldr41.DateTimePatterns_uz_Arab');
goog.require('goog.i18n.cldr41.DateTimePatterns_uz_Arab_AF');
goog.require('goog.i18n.cldr41.DateTimePatterns_uz_Cyrl');
goog.require('goog.i18n.cldr41.DateTimePatterns_uz_Cyrl_UZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_uz_Latn');
goog.require('goog.i18n.cldr41.DateTimePatterns_uz_Latn_UZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_vai');
goog.require('goog.i18n.cldr41.DateTimePatterns_vai_Latn');
goog.require('goog.i18n.cldr41.DateTimePatterns_vai_Latn_LR');
goog.require('goog.i18n.cldr41.DateTimePatterns_vai_Vaii');
goog.require('goog.i18n.cldr41.DateTimePatterns_vai_Vaii_LR');
goog.require('goog.i18n.cldr41.DateTimePatterns_vi_VN');
goog.require('goog.i18n.cldr41.DateTimePatterns_vun');
goog.require('goog.i18n.cldr41.DateTimePatterns_vun_TZ');
goog.require('goog.i18n.cldr41.DateTimePatterns_wae');
goog.require('goog.i18n.cldr41.DateTimePatterns_wae_CH');
goog.require('goog.i18n.cldr41.DateTimePatterns_wo');
goog.require('goog.i18n.cldr41.DateTimePatterns_wo_SN');
goog.require('goog.i18n.cldr41.DateTimePatterns_xh');
goog.require('goog.i18n.cldr41.DateTimePatterns_xh_ZA');
goog.require('goog.i18n.cldr41.DateTimePatterns_xog');
goog.require('goog.i18n.cldr41.DateTimePatterns_xog_UG');
goog.require('goog.i18n.cldr41.DateTimePatterns_yav');
goog.require('goog.i18n.cldr41.DateTimePatterns_yav_CM');
goog.require('goog.i18n.cldr41.DateTimePatterns_yi');
goog.require('goog.i18n.cldr41.DateTimePatterns_yi_001');
goog.require('goog.i18n.cldr41.DateTimePatterns_yo');
goog.require('goog.i18n.cldr41.DateTimePatterns_yo_BJ');
goog.require('goog.i18n.cldr41.DateTimePatterns_yo_NG');
goog.require('goog.i18n.cldr41.DateTimePatterns_yrl');
goog.require('goog.i18n.cldr41.DateTimePatterns_yrl_BR');
goog.require('goog.i18n.cldr41.DateTimePatterns_yrl_CO');
goog.require('goog.i18n.cldr41.DateTimePatterns_yrl_VE');
goog.require('goog.i18n.cldr41.DateTimePatterns_yue');
goog.require('goog.i18n.cldr41.DateTimePatterns_yue_Hans');
goog.require('goog.i18n.cldr41.DateTimePatterns_yue_Hans_CN');
goog.require('goog.i18n.cldr41.DateTimePatterns_yue_Hant');
goog.require('goog.i18n.cldr41.DateTimePatterns_yue_Hant_HK');
goog.require('goog.i18n.cldr41.DateTimePatterns_zgh');
goog.require('goog.i18n.cldr41.DateTimePatterns_zgh_MA');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_Hans');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_Hans_CN');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_Hans_HK');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_Hans_MO');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_Hans_SG');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_Hant');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_Hant_HK');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_Hant_MO');
goog.require('goog.i18n.cldr41.DateTimePatterns_zh_Hant_TW');
goog.require('goog.i18n.cldr41.DateTimePatterns_zu_ZA');
goog.require('goog.i18n.cldr42.DateTimePatterns_af_NA');
goog.require('goog.i18n.cldr42.DateTimePatterns_af_ZA');
goog.require('goog.i18n.cldr42.DateTimePatterns_agq');
goog.require('goog.i18n.cldr42.DateTimePatterns_agq_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ak');
goog.require('goog.i18n.cldr42.DateTimePatterns_ak_GH');
goog.require('goog.i18n.cldr42.DateTimePatterns_am_ET');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_001');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_AE');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_BH');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_DJ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_EH');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_ER');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_IL');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_IQ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_JO');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_KM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_KW');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_LB');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_LY');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_MA');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_MR');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_OM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_PS');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_QA');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_SA');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_SD');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_SO');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_SS');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_SY');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_TD');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_TN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_XB');
goog.require('goog.i18n.cldr42.DateTimePatterns_ar_YE');
goog.require('goog.i18n.cldr42.DateTimePatterns_as');
goog.require('goog.i18n.cldr42.DateTimePatterns_as_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_asa');
goog.require('goog.i18n.cldr42.DateTimePatterns_asa_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ast');
goog.require('goog.i18n.cldr42.DateTimePatterns_ast_ES');
goog.require('goog.i18n.cldr42.DateTimePatterns_az_Cyrl');
goog.require('goog.i18n.cldr42.DateTimePatterns_az_Cyrl_AZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_az_Latn');
goog.require('goog.i18n.cldr42.DateTimePatterns_az_Latn_AZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_bas');
goog.require('goog.i18n.cldr42.DateTimePatterns_bas_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_be_BY');
goog.require('goog.i18n.cldr42.DateTimePatterns_bem');
goog.require('goog.i18n.cldr42.DateTimePatterns_bem_ZM');
goog.require('goog.i18n.cldr42.DateTimePatterns_bez');
goog.require('goog.i18n.cldr42.DateTimePatterns_bez_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_bg_BG');
goog.require('goog.i18n.cldr42.DateTimePatterns_bgc');
goog.require('goog.i18n.cldr42.DateTimePatterns_bgc_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_bho');
goog.require('goog.i18n.cldr42.DateTimePatterns_bho_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_bm');
goog.require('goog.i18n.cldr42.DateTimePatterns_bm_ML');
goog.require('goog.i18n.cldr42.DateTimePatterns_bn_BD');
goog.require('goog.i18n.cldr42.DateTimePatterns_bn_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_bo');
goog.require('goog.i18n.cldr42.DateTimePatterns_bo_CN');
goog.require('goog.i18n.cldr42.DateTimePatterns_bo_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_br_FR');
goog.require('goog.i18n.cldr42.DateTimePatterns_brx');
goog.require('goog.i18n.cldr42.DateTimePatterns_brx_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_bs_Cyrl');
goog.require('goog.i18n.cldr42.DateTimePatterns_bs_Cyrl_BA');
goog.require('goog.i18n.cldr42.DateTimePatterns_bs_Latn');
goog.require('goog.i18n.cldr42.DateTimePatterns_bs_Latn_BA');
goog.require('goog.i18n.cldr42.DateTimePatterns_ca_AD');
goog.require('goog.i18n.cldr42.DateTimePatterns_ca_ES');
goog.require('goog.i18n.cldr42.DateTimePatterns_ca_FR');
goog.require('goog.i18n.cldr42.DateTimePatterns_ca_IT');
goog.require('goog.i18n.cldr42.DateTimePatterns_ccp');
goog.require('goog.i18n.cldr42.DateTimePatterns_ccp_BD');
goog.require('goog.i18n.cldr42.DateTimePatterns_ccp_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ce');
goog.require('goog.i18n.cldr42.DateTimePatterns_ce_RU');
goog.require('goog.i18n.cldr42.DateTimePatterns_ceb');
goog.require('goog.i18n.cldr42.DateTimePatterns_ceb_PH');
goog.require('goog.i18n.cldr42.DateTimePatterns_cgg');
goog.require('goog.i18n.cldr42.DateTimePatterns_cgg_UG');
goog.require('goog.i18n.cldr42.DateTimePatterns_chr_US');
goog.require('goog.i18n.cldr42.DateTimePatterns_ckb');
goog.require('goog.i18n.cldr42.DateTimePatterns_ckb_Arab');
goog.require('goog.i18n.cldr42.DateTimePatterns_ckb_Arab_IQ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ckb_Arab_IR');
goog.require('goog.i18n.cldr42.DateTimePatterns_ckb_IQ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ckb_IR');
goog.require('goog.i18n.cldr42.DateTimePatterns_cs_CZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_cv');
goog.require('goog.i18n.cldr42.DateTimePatterns_cv_RU');
goog.require('goog.i18n.cldr42.DateTimePatterns_cy_GB');
goog.require('goog.i18n.cldr42.DateTimePatterns_da_DK');
goog.require('goog.i18n.cldr42.DateTimePatterns_da_GL');
goog.require('goog.i18n.cldr42.DateTimePatterns_dav');
goog.require('goog.i18n.cldr42.DateTimePatterns_dav_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_de_BE');
goog.require('goog.i18n.cldr42.DateTimePatterns_de_DE');
goog.require('goog.i18n.cldr42.DateTimePatterns_de_IT');
goog.require('goog.i18n.cldr42.DateTimePatterns_de_LI');
goog.require('goog.i18n.cldr42.DateTimePatterns_de_LU');
goog.require('goog.i18n.cldr42.DateTimePatterns_dje');
goog.require('goog.i18n.cldr42.DateTimePatterns_dje_NE');
goog.require('goog.i18n.cldr42.DateTimePatterns_doi');
goog.require('goog.i18n.cldr42.DateTimePatterns_doi_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_dsb');
goog.require('goog.i18n.cldr42.DateTimePatterns_dsb_DE');
goog.require('goog.i18n.cldr42.DateTimePatterns_dua');
goog.require('goog.i18n.cldr42.DateTimePatterns_dua_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_dyo');
goog.require('goog.i18n.cldr42.DateTimePatterns_dyo_SN');
goog.require('goog.i18n.cldr42.DateTimePatterns_dz');
goog.require('goog.i18n.cldr42.DateTimePatterns_dz_BT');
goog.require('goog.i18n.cldr42.DateTimePatterns_ebu');
goog.require('goog.i18n.cldr42.DateTimePatterns_ebu_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_ee');
goog.require('goog.i18n.cldr42.DateTimePatterns_ee_GH');
goog.require('goog.i18n.cldr42.DateTimePatterns_ee_TG');
goog.require('goog.i18n.cldr42.DateTimePatterns_el_CY');
goog.require('goog.i18n.cldr42.DateTimePatterns_el_GR');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_001');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_150');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_AE');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_AG');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_AI');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_AS');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_AT');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_BB');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_BE');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_BI');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_BM');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_BS');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_BW');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_BZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_CC');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_CH');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_CK');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_CX');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_CY');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_DE');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_DG');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_DK');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_DM');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_ER');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_FI');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_FJ');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_FK');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_FM');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_GD');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_GG');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_GH');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_GI');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_GM');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_GU');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_GY');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_HK');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_IL');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_IM');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_IO');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_JE');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_JM');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_KI');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_KN');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_KY');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_LC');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_LR');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_LS');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MG');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MH');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MO');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MP');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MS');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MT');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MU');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MV');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MW');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_MY');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_NA');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_NF');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_NG');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_NL');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_NR');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_NU');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_NZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_PG');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_PH');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_PK');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_PN');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_PR');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_PW');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_RW');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SB');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SC');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SD');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SE');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SH');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SI');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SL');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SS');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SX');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_SZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_TC');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_TK');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_TO');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_TT');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_TV');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_UG');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_UM');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_US_POSIX');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_VC');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_VG');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_VI');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_VU');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_WS');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_XA');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_ZM');
goog.require('goog.i18n.cldr42.DateTimePatterns_en_ZW');
goog.require('goog.i18n.cldr42.DateTimePatterns_eo');
goog.require('goog.i18n.cldr42.DateTimePatterns_eo_001');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_AR');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_BO');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_BR');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_BZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_CL');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_CO');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_CR');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_CU');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_DO');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_EA');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_EC');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_GQ');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_GT');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_HN');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_IC');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_NI');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_PA');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_PE');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_PH');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_PR');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_PY');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_SV');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_UY');
goog.require('goog.i18n.cldr42.DateTimePatterns_es_VE');
goog.require('goog.i18n.cldr42.DateTimePatterns_et_EE');
goog.require('goog.i18n.cldr42.DateTimePatterns_eu_ES');
goog.require('goog.i18n.cldr42.DateTimePatterns_ewo');
goog.require('goog.i18n.cldr42.DateTimePatterns_ewo_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_fa_AF');
goog.require('goog.i18n.cldr42.DateTimePatterns_fa_IR');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_BF');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_GH');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_GM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_GN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_GW');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_LR');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_MR');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_NE');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_NG');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_SL');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Adlm_SN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_BF');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_GH');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_GM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_GN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_GW');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_LR');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_MR');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_NE');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_NG');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_SL');
goog.require('goog.i18n.cldr42.DateTimePatterns_ff_Latn_SN');
goog.require('goog.i18n.cldr42.DateTimePatterns_fi_FI');
goog.require('goog.i18n.cldr42.DateTimePatterns_fil_PH');
goog.require('goog.i18n.cldr42.DateTimePatterns_fo');
goog.require('goog.i18n.cldr42.DateTimePatterns_fo_DK');
goog.require('goog.i18n.cldr42.DateTimePatterns_fo_FO');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_BE');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_BF');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_BI');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_BJ');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_BL');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_CD');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_CF');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_CG');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_CH');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_CI');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_DJ');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_DZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_FR');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_GA');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_GF');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_GN');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_GP');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_GQ');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_HT');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_KM');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_LU');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_MA');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_MC');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_MF');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_MG');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_ML');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_MQ');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_MR');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_MU');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_NC');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_NE');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_PF');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_PM');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_RE');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_RW');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_SC');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_SN');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_SY');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_TD');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_TG');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_TN');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_VU');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_WF');
goog.require('goog.i18n.cldr42.DateTimePatterns_fr_YT');
goog.require('goog.i18n.cldr42.DateTimePatterns_fur');
goog.require('goog.i18n.cldr42.DateTimePatterns_fur_IT');
goog.require('goog.i18n.cldr42.DateTimePatterns_fy');
goog.require('goog.i18n.cldr42.DateTimePatterns_fy_NL');
goog.require('goog.i18n.cldr42.DateTimePatterns_ga_GB');
goog.require('goog.i18n.cldr42.DateTimePatterns_ga_IE');
goog.require('goog.i18n.cldr42.DateTimePatterns_gd');
goog.require('goog.i18n.cldr42.DateTimePatterns_gd_GB');
goog.require('goog.i18n.cldr42.DateTimePatterns_gl_ES');
goog.require('goog.i18n.cldr42.DateTimePatterns_gsw_CH');
goog.require('goog.i18n.cldr42.DateTimePatterns_gsw_FR');
goog.require('goog.i18n.cldr42.DateTimePatterns_gsw_LI');
goog.require('goog.i18n.cldr42.DateTimePatterns_gu_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_guz');
goog.require('goog.i18n.cldr42.DateTimePatterns_guz_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_gv');
goog.require('goog.i18n.cldr42.DateTimePatterns_gv_IM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ha');
goog.require('goog.i18n.cldr42.DateTimePatterns_ha_GH');
goog.require('goog.i18n.cldr42.DateTimePatterns_ha_NE');
goog.require('goog.i18n.cldr42.DateTimePatterns_ha_NG');
goog.require('goog.i18n.cldr42.DateTimePatterns_haw_US');
goog.require('goog.i18n.cldr42.DateTimePatterns_he_IL');
goog.require('goog.i18n.cldr42.DateTimePatterns_hi_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_hi_Latn');
goog.require('goog.i18n.cldr42.DateTimePatterns_hi_Latn_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_hr_BA');
goog.require('goog.i18n.cldr42.DateTimePatterns_hr_HR');
goog.require('goog.i18n.cldr42.DateTimePatterns_hsb');
goog.require('goog.i18n.cldr42.DateTimePatterns_hsb_DE');
goog.require('goog.i18n.cldr42.DateTimePatterns_hu_HU');
goog.require('goog.i18n.cldr42.DateTimePatterns_hy_AM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ia');
goog.require('goog.i18n.cldr42.DateTimePatterns_ia_001');
goog.require('goog.i18n.cldr42.DateTimePatterns_id_ID');
goog.require('goog.i18n.cldr42.DateTimePatterns_ig');
goog.require('goog.i18n.cldr42.DateTimePatterns_ig_NG');
goog.require('goog.i18n.cldr42.DateTimePatterns_ii');
goog.require('goog.i18n.cldr42.DateTimePatterns_ii_CN');
goog.require('goog.i18n.cldr42.DateTimePatterns_is_IS');
goog.require('goog.i18n.cldr42.DateTimePatterns_it_CH');
goog.require('goog.i18n.cldr42.DateTimePatterns_it_IT');
goog.require('goog.i18n.cldr42.DateTimePatterns_it_SM');
goog.require('goog.i18n.cldr42.DateTimePatterns_it_VA');
goog.require('goog.i18n.cldr42.DateTimePatterns_ja_JP');
goog.require('goog.i18n.cldr42.DateTimePatterns_jgo');
goog.require('goog.i18n.cldr42.DateTimePatterns_jgo_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_jmc');
goog.require('goog.i18n.cldr42.DateTimePatterns_jmc_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_jv');
goog.require('goog.i18n.cldr42.DateTimePatterns_jv_ID');
goog.require('goog.i18n.cldr42.DateTimePatterns_ka_GE');
goog.require('goog.i18n.cldr42.DateTimePatterns_kab');
goog.require('goog.i18n.cldr42.DateTimePatterns_kab_DZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_kam');
goog.require('goog.i18n.cldr42.DateTimePatterns_kam_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_kde');
goog.require('goog.i18n.cldr42.DateTimePatterns_kde_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_kea');
goog.require('goog.i18n.cldr42.DateTimePatterns_kea_CV');
goog.require('goog.i18n.cldr42.DateTimePatterns_kgp');
goog.require('goog.i18n.cldr42.DateTimePatterns_kgp_BR');
goog.require('goog.i18n.cldr42.DateTimePatterns_khq');
goog.require('goog.i18n.cldr42.DateTimePatterns_khq_ML');
goog.require('goog.i18n.cldr42.DateTimePatterns_ki');
goog.require('goog.i18n.cldr42.DateTimePatterns_ki_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_kk_KZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_kkj');
goog.require('goog.i18n.cldr42.DateTimePatterns_kkj_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_kl');
goog.require('goog.i18n.cldr42.DateTimePatterns_kl_GL');
goog.require('goog.i18n.cldr42.DateTimePatterns_kln');
goog.require('goog.i18n.cldr42.DateTimePatterns_kln_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_km_KH');
goog.require('goog.i18n.cldr42.DateTimePatterns_kn_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ko_KP');
goog.require('goog.i18n.cldr42.DateTimePatterns_ko_KR');
goog.require('goog.i18n.cldr42.DateTimePatterns_kok');
goog.require('goog.i18n.cldr42.DateTimePatterns_kok_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ks');
goog.require('goog.i18n.cldr42.DateTimePatterns_ks_Arab');
goog.require('goog.i18n.cldr42.DateTimePatterns_ks_Arab_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ks_Deva');
goog.require('goog.i18n.cldr42.DateTimePatterns_ks_Deva_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ksb');
goog.require('goog.i18n.cldr42.DateTimePatterns_ksb_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ksf');
goog.require('goog.i18n.cldr42.DateTimePatterns_ksf_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_ksh');
goog.require('goog.i18n.cldr42.DateTimePatterns_ksh_DE');
goog.require('goog.i18n.cldr42.DateTimePatterns_ku');
goog.require('goog.i18n.cldr42.DateTimePatterns_ku_TR');
goog.require('goog.i18n.cldr42.DateTimePatterns_kw');
goog.require('goog.i18n.cldr42.DateTimePatterns_kw_GB');
goog.require('goog.i18n.cldr42.DateTimePatterns_ky_KG');
goog.require('goog.i18n.cldr42.DateTimePatterns_lag');
goog.require('goog.i18n.cldr42.DateTimePatterns_lag_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_lb');
goog.require('goog.i18n.cldr42.DateTimePatterns_lb_LU');
goog.require('goog.i18n.cldr42.DateTimePatterns_lg');
goog.require('goog.i18n.cldr42.DateTimePatterns_lg_UG');
goog.require('goog.i18n.cldr42.DateTimePatterns_lkt');
goog.require('goog.i18n.cldr42.DateTimePatterns_lkt_US');
goog.require('goog.i18n.cldr42.DateTimePatterns_ln_AO');
goog.require('goog.i18n.cldr42.DateTimePatterns_ln_CD');
goog.require('goog.i18n.cldr42.DateTimePatterns_ln_CF');
goog.require('goog.i18n.cldr42.DateTimePatterns_ln_CG');
goog.require('goog.i18n.cldr42.DateTimePatterns_lo_LA');
goog.require('goog.i18n.cldr42.DateTimePatterns_lrc');
goog.require('goog.i18n.cldr42.DateTimePatterns_lrc_IQ');
goog.require('goog.i18n.cldr42.DateTimePatterns_lrc_IR');
goog.require('goog.i18n.cldr42.DateTimePatterns_lt_LT');
goog.require('goog.i18n.cldr42.DateTimePatterns_lu');
goog.require('goog.i18n.cldr42.DateTimePatterns_lu_CD');
goog.require('goog.i18n.cldr42.DateTimePatterns_luo');
goog.require('goog.i18n.cldr42.DateTimePatterns_luo_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_luy');
goog.require('goog.i18n.cldr42.DateTimePatterns_luy_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_lv_LV');
goog.require('goog.i18n.cldr42.DateTimePatterns_mai');
goog.require('goog.i18n.cldr42.DateTimePatterns_mai_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_mas');
goog.require('goog.i18n.cldr42.DateTimePatterns_mas_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_mas_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_mer');
goog.require('goog.i18n.cldr42.DateTimePatterns_mer_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_mfe');
goog.require('goog.i18n.cldr42.DateTimePatterns_mfe_MU');
goog.require('goog.i18n.cldr42.DateTimePatterns_mg');
goog.require('goog.i18n.cldr42.DateTimePatterns_mg_MG');
goog.require('goog.i18n.cldr42.DateTimePatterns_mgh');
goog.require('goog.i18n.cldr42.DateTimePatterns_mgh_MZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_mgo');
goog.require('goog.i18n.cldr42.DateTimePatterns_mgo_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_mi');
goog.require('goog.i18n.cldr42.DateTimePatterns_mi_NZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_mk_MK');
goog.require('goog.i18n.cldr42.DateTimePatterns_ml_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_mn_MN');
goog.require('goog.i18n.cldr42.DateTimePatterns_mni');
goog.require('goog.i18n.cldr42.DateTimePatterns_mni_Beng');
goog.require('goog.i18n.cldr42.DateTimePatterns_mni_Beng_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_mr_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ms_BN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ms_ID');
goog.require('goog.i18n.cldr42.DateTimePatterns_ms_MY');
goog.require('goog.i18n.cldr42.DateTimePatterns_ms_SG');
goog.require('goog.i18n.cldr42.DateTimePatterns_mt_MT');
goog.require('goog.i18n.cldr42.DateTimePatterns_mua');
goog.require('goog.i18n.cldr42.DateTimePatterns_mua_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_my_MM');
goog.require('goog.i18n.cldr42.DateTimePatterns_mzn');
goog.require('goog.i18n.cldr42.DateTimePatterns_mzn_IR');
goog.require('goog.i18n.cldr42.DateTimePatterns_naq');
goog.require('goog.i18n.cldr42.DateTimePatterns_naq_NA');
goog.require('goog.i18n.cldr42.DateTimePatterns_nb_NO');
goog.require('goog.i18n.cldr42.DateTimePatterns_nb_SJ');
goog.require('goog.i18n.cldr42.DateTimePatterns_nd');
goog.require('goog.i18n.cldr42.DateTimePatterns_nd_ZW');
goog.require('goog.i18n.cldr42.DateTimePatterns_ne_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ne_NP');
goog.require('goog.i18n.cldr42.DateTimePatterns_nl_AW');
goog.require('goog.i18n.cldr42.DateTimePatterns_nl_BE');
goog.require('goog.i18n.cldr42.DateTimePatterns_nl_BQ');
goog.require('goog.i18n.cldr42.DateTimePatterns_nl_CW');
goog.require('goog.i18n.cldr42.DateTimePatterns_nl_NL');
goog.require('goog.i18n.cldr42.DateTimePatterns_nl_SR');
goog.require('goog.i18n.cldr42.DateTimePatterns_nl_SX');
goog.require('goog.i18n.cldr42.DateTimePatterns_nmg');
goog.require('goog.i18n.cldr42.DateTimePatterns_nmg_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_nn');
goog.require('goog.i18n.cldr42.DateTimePatterns_nn_NO');
goog.require('goog.i18n.cldr42.DateTimePatterns_nnh');
goog.require('goog.i18n.cldr42.DateTimePatterns_nnh_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_nus');
goog.require('goog.i18n.cldr42.DateTimePatterns_nus_SS');
goog.require('goog.i18n.cldr42.DateTimePatterns_nyn');
goog.require('goog.i18n.cldr42.DateTimePatterns_nyn_UG');
goog.require('goog.i18n.cldr42.DateTimePatterns_om');
goog.require('goog.i18n.cldr42.DateTimePatterns_om_ET');
goog.require('goog.i18n.cldr42.DateTimePatterns_om_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_or_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_os');
goog.require('goog.i18n.cldr42.DateTimePatterns_os_GE');
goog.require('goog.i18n.cldr42.DateTimePatterns_os_RU');
goog.require('goog.i18n.cldr42.DateTimePatterns_pa_Arab');
goog.require('goog.i18n.cldr42.DateTimePatterns_pa_Arab_PK');
goog.require('goog.i18n.cldr42.DateTimePatterns_pa_Guru');
goog.require('goog.i18n.cldr42.DateTimePatterns_pa_Guru_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_pcm');
goog.require('goog.i18n.cldr42.DateTimePatterns_pcm_NG');
goog.require('goog.i18n.cldr42.DateTimePatterns_pl_PL');
goog.require('goog.i18n.cldr42.DateTimePatterns_ps');
goog.require('goog.i18n.cldr42.DateTimePatterns_ps_AF');
goog.require('goog.i18n.cldr42.DateTimePatterns_ps_PK');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_AO');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_CH');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_CV');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_GQ');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_GW');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_LU');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_MO');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_MZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_ST');
goog.require('goog.i18n.cldr42.DateTimePatterns_pt_TL');
goog.require('goog.i18n.cldr42.DateTimePatterns_qu');
goog.require('goog.i18n.cldr42.DateTimePatterns_qu_BO');
goog.require('goog.i18n.cldr42.DateTimePatterns_qu_EC');
goog.require('goog.i18n.cldr42.DateTimePatterns_qu_PE');
goog.require('goog.i18n.cldr42.DateTimePatterns_raj');
goog.require('goog.i18n.cldr42.DateTimePatterns_raj_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_rm');
goog.require('goog.i18n.cldr42.DateTimePatterns_rm_CH');
goog.require('goog.i18n.cldr42.DateTimePatterns_rn');
goog.require('goog.i18n.cldr42.DateTimePatterns_rn_BI');
goog.require('goog.i18n.cldr42.DateTimePatterns_ro_MD');
goog.require('goog.i18n.cldr42.DateTimePatterns_ro_RO');
goog.require('goog.i18n.cldr42.DateTimePatterns_rof');
goog.require('goog.i18n.cldr42.DateTimePatterns_rof_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ru_BY');
goog.require('goog.i18n.cldr42.DateTimePatterns_ru_KG');
goog.require('goog.i18n.cldr42.DateTimePatterns_ru_KZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ru_MD');
goog.require('goog.i18n.cldr42.DateTimePatterns_ru_RU');
goog.require('goog.i18n.cldr42.DateTimePatterns_ru_UA');
goog.require('goog.i18n.cldr42.DateTimePatterns_rw');
goog.require('goog.i18n.cldr42.DateTimePatterns_rw_RW');
goog.require('goog.i18n.cldr42.DateTimePatterns_rwk');
goog.require('goog.i18n.cldr42.DateTimePatterns_rwk_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_sa');
goog.require('goog.i18n.cldr42.DateTimePatterns_sa_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_sah');
goog.require('goog.i18n.cldr42.DateTimePatterns_sah_RU');
goog.require('goog.i18n.cldr42.DateTimePatterns_saq');
goog.require('goog.i18n.cldr42.DateTimePatterns_saq_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_sat');
goog.require('goog.i18n.cldr42.DateTimePatterns_sat_Olck');
goog.require('goog.i18n.cldr42.DateTimePatterns_sat_Olck_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_sbp');
goog.require('goog.i18n.cldr42.DateTimePatterns_sbp_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_sc');
goog.require('goog.i18n.cldr42.DateTimePatterns_sc_IT');
goog.require('goog.i18n.cldr42.DateTimePatterns_sd');
goog.require('goog.i18n.cldr42.DateTimePatterns_sd_Arab');
goog.require('goog.i18n.cldr42.DateTimePatterns_sd_Arab_PK');
goog.require('goog.i18n.cldr42.DateTimePatterns_sd_Deva');
goog.require('goog.i18n.cldr42.DateTimePatterns_sd_Deva_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_se');
goog.require('goog.i18n.cldr42.DateTimePatterns_se_FI');
goog.require('goog.i18n.cldr42.DateTimePatterns_se_NO');
goog.require('goog.i18n.cldr42.DateTimePatterns_se_SE');
goog.require('goog.i18n.cldr42.DateTimePatterns_seh');
goog.require('goog.i18n.cldr42.DateTimePatterns_seh_MZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_ses');
goog.require('goog.i18n.cldr42.DateTimePatterns_ses_ML');
goog.require('goog.i18n.cldr42.DateTimePatterns_sg');
goog.require('goog.i18n.cldr42.DateTimePatterns_sg_CF');
goog.require('goog.i18n.cldr42.DateTimePatterns_shi');
goog.require('goog.i18n.cldr42.DateTimePatterns_shi_Latn');
goog.require('goog.i18n.cldr42.DateTimePatterns_shi_Latn_MA');
goog.require('goog.i18n.cldr42.DateTimePatterns_shi_Tfng');
goog.require('goog.i18n.cldr42.DateTimePatterns_shi_Tfng_MA');
goog.require('goog.i18n.cldr42.DateTimePatterns_si_LK');
goog.require('goog.i18n.cldr42.DateTimePatterns_sk_SK');
goog.require('goog.i18n.cldr42.DateTimePatterns_sl_SI');
goog.require('goog.i18n.cldr42.DateTimePatterns_smn');
goog.require('goog.i18n.cldr42.DateTimePatterns_smn_FI');
goog.require('goog.i18n.cldr42.DateTimePatterns_sn');
goog.require('goog.i18n.cldr42.DateTimePatterns_sn_ZW');
goog.require('goog.i18n.cldr42.DateTimePatterns_so');
goog.require('goog.i18n.cldr42.DateTimePatterns_so_DJ');
goog.require('goog.i18n.cldr42.DateTimePatterns_so_ET');
goog.require('goog.i18n.cldr42.DateTimePatterns_so_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_so_SO');
goog.require('goog.i18n.cldr42.DateTimePatterns_sq_AL');
goog.require('goog.i18n.cldr42.DateTimePatterns_sq_MK');
goog.require('goog.i18n.cldr42.DateTimePatterns_sq_XK');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Cyrl');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Cyrl_BA');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Cyrl_ME');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Cyrl_RS');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Cyrl_XK');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Latn_BA');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Latn_ME');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Latn_RS');
goog.require('goog.i18n.cldr42.DateTimePatterns_sr_Latn_XK');
goog.require('goog.i18n.cldr42.DateTimePatterns_su');
goog.require('goog.i18n.cldr42.DateTimePatterns_su_Latn');
goog.require('goog.i18n.cldr42.DateTimePatterns_su_Latn_ID');
goog.require('goog.i18n.cldr42.DateTimePatterns_sv_AX');
goog.require('goog.i18n.cldr42.DateTimePatterns_sv_FI');
goog.require('goog.i18n.cldr42.DateTimePatterns_sv_SE');
goog.require('goog.i18n.cldr42.DateTimePatterns_sw_CD');
goog.require('goog.i18n.cldr42.DateTimePatterns_sw_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_sw_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_sw_UG');
goog.require('goog.i18n.cldr42.DateTimePatterns_ta_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ta_LK');
goog.require('goog.i18n.cldr42.DateTimePatterns_ta_MY');
goog.require('goog.i18n.cldr42.DateTimePatterns_ta_SG');
goog.require('goog.i18n.cldr42.DateTimePatterns_te_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_teo');
goog.require('goog.i18n.cldr42.DateTimePatterns_teo_KE');
goog.require('goog.i18n.cldr42.DateTimePatterns_teo_UG');
goog.require('goog.i18n.cldr42.DateTimePatterns_tg');
goog.require('goog.i18n.cldr42.DateTimePatterns_tg_TJ');
goog.require('goog.i18n.cldr42.DateTimePatterns_th_TH');
goog.require('goog.i18n.cldr42.DateTimePatterns_ti');
goog.require('goog.i18n.cldr42.DateTimePatterns_ti_ER');
goog.require('goog.i18n.cldr42.DateTimePatterns_ti_ET');
goog.require('goog.i18n.cldr42.DateTimePatterns_tk');
goog.require('goog.i18n.cldr42.DateTimePatterns_tk_TM');
goog.require('goog.i18n.cldr42.DateTimePatterns_to');
goog.require('goog.i18n.cldr42.DateTimePatterns_to_TO');
goog.require('goog.i18n.cldr42.DateTimePatterns_tr_CY');
goog.require('goog.i18n.cldr42.DateTimePatterns_tr_TR');
goog.require('goog.i18n.cldr42.DateTimePatterns_tt');
goog.require('goog.i18n.cldr42.DateTimePatterns_tt_RU');
goog.require('goog.i18n.cldr42.DateTimePatterns_twq');
goog.require('goog.i18n.cldr42.DateTimePatterns_twq_NE');
goog.require('goog.i18n.cldr42.DateTimePatterns_tzm');
goog.require('goog.i18n.cldr42.DateTimePatterns_tzm_MA');
goog.require('goog.i18n.cldr42.DateTimePatterns_ug');
goog.require('goog.i18n.cldr42.DateTimePatterns_ug_CN');
goog.require('goog.i18n.cldr42.DateTimePatterns_uk_UA');
goog.require('goog.i18n.cldr42.DateTimePatterns_ur_IN');
goog.require('goog.i18n.cldr42.DateTimePatterns_ur_PK');
goog.require('goog.i18n.cldr42.DateTimePatterns_uz_Arab');
goog.require('goog.i18n.cldr42.DateTimePatterns_uz_Arab_AF');
goog.require('goog.i18n.cldr42.DateTimePatterns_uz_Cyrl');
goog.require('goog.i18n.cldr42.DateTimePatterns_uz_Cyrl_UZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_uz_Latn');
goog.require('goog.i18n.cldr42.DateTimePatterns_uz_Latn_UZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_vai');
goog.require('goog.i18n.cldr42.DateTimePatterns_vai_Latn');
goog.require('goog.i18n.cldr42.DateTimePatterns_vai_Latn_LR');
goog.require('goog.i18n.cldr42.DateTimePatterns_vai_Vaii');
goog.require('goog.i18n.cldr42.DateTimePatterns_vai_Vaii_LR');
goog.require('goog.i18n.cldr42.DateTimePatterns_vi_VN');
goog.require('goog.i18n.cldr42.DateTimePatterns_vun');
goog.require('goog.i18n.cldr42.DateTimePatterns_vun_TZ');
goog.require('goog.i18n.cldr42.DateTimePatterns_wae');
goog.require('goog.i18n.cldr42.DateTimePatterns_wae_CH');
goog.require('goog.i18n.cldr42.DateTimePatterns_wo');
goog.require('goog.i18n.cldr42.DateTimePatterns_wo_SN');
goog.require('goog.i18n.cldr42.DateTimePatterns_xh');
goog.require('goog.i18n.cldr42.DateTimePatterns_xh_ZA');
goog.require('goog.i18n.cldr42.DateTimePatterns_xog');
goog.require('goog.i18n.cldr42.DateTimePatterns_xog_UG');
goog.require('goog.i18n.cldr42.DateTimePatterns_yav');
goog.require('goog.i18n.cldr42.DateTimePatterns_yav_CM');
goog.require('goog.i18n.cldr42.DateTimePatterns_yi');
goog.require('goog.i18n.cldr42.DateTimePatterns_yi_001');
goog.require('goog.i18n.cldr42.DateTimePatterns_yo');
goog.require('goog.i18n.cldr42.DateTimePatterns_yo_BJ');
goog.require('goog.i18n.cldr42.DateTimePatterns_yo_NG');
goog.require('goog.i18n.cldr42.DateTimePatterns_yrl');
goog.require('goog.i18n.cldr42.DateTimePatterns_yrl_BR');
goog.require('goog.i18n.cldr42.DateTimePatterns_yrl_CO');
goog.require('goog.i18n.cldr42.DateTimePatterns_yrl_VE');
goog.require('goog.i18n.cldr42.DateTimePatterns_yue');
goog.require('goog.i18n.cldr42.DateTimePatterns_yue_Hans');
goog.require('goog.i18n.cldr42.DateTimePatterns_yue_Hans_CN');
goog.require('goog.i18n.cldr42.DateTimePatterns_yue_Hant');
goog.require('goog.i18n.cldr42.DateTimePatterns_yue_Hant_HK');
goog.require('goog.i18n.cldr42.DateTimePatterns_zgh');
goog.require('goog.i18n.cldr42.DateTimePatterns_zgh_MA');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_Hans');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_Hans_CN');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_Hans_HK');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_Hans_MO');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_Hans_SG');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_Hant');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_Hant_HK');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_Hant_MO');
goog.require('goog.i18n.cldr42.DateTimePatterns_zh_Hant_TW');
goog.require('goog.i18n.cldr42.DateTimePatterns_zu_ZA');
goog.require('goog.i18n.cldrversion');
goog.requireType('goog.i18n.DateTimePatternsType');


/**
 * Extended set of localized date/time patterns for locale af_NA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_af_NA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_af_NA : goog.i18n.cldr41.DateTimePatterns_af_NA);


/**
 * Extended set of localized date/time patterns for locale af_ZA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_af_ZA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_af_ZA : goog.i18n.cldr41.DateTimePatterns_af_ZA);


/**
 * Extended set of localized date/time patterns for locale agq.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_agq = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_agq : goog.i18n.cldr41.DateTimePatterns_agq);


/**
 * Extended set of localized date/time patterns for locale agq_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_agq_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_agq_CM : goog.i18n.cldr41.DateTimePatterns_agq_CM);


/**
 * Extended set of localized date/time patterns for locale ak.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ak = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ak : goog.i18n.cldr41.DateTimePatterns_ak);


/**
 * Extended set of localized date/time patterns for locale ak_GH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ak_GH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ak_GH : goog.i18n.cldr41.DateTimePatterns_ak_GH);


/**
 * Extended set of localized date/time patterns for locale am_ET.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_am_ET = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_am_ET : goog.i18n.cldr41.DateTimePatterns_am_ET);


/**
 * Extended set of localized date/time patterns for locale ar_001.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_001 = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_001 : goog.i18n.cldr41.DateTimePatterns_ar_001);


/**
 * Extended set of localized date/time patterns for locale ar_AE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_AE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_AE : goog.i18n.cldr41.DateTimePatterns_ar_AE);


/**
 * Extended set of localized date/time patterns for locale ar_BH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_BH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_BH : goog.i18n.cldr41.DateTimePatterns_ar_BH);


/**
 * Extended set of localized date/time patterns for locale ar_DJ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_DJ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_DJ : goog.i18n.cldr41.DateTimePatterns_ar_DJ);


/**
 * Extended set of localized date/time patterns for locale ar_EH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_EH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_EH : goog.i18n.cldr41.DateTimePatterns_ar_EH);


/**
 * Extended set of localized date/time patterns for locale ar_ER.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_ER = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_ER : goog.i18n.cldr41.DateTimePatterns_ar_ER);


/**
 * Extended set of localized date/time patterns for locale ar_IL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_IL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_IL : goog.i18n.cldr41.DateTimePatterns_ar_IL);


/**
 * Extended set of localized date/time patterns for locale ar_IQ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_IQ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_IQ : goog.i18n.cldr41.DateTimePatterns_ar_IQ);


/**
 * Extended set of localized date/time patterns for locale ar_JO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_JO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_JO : goog.i18n.cldr41.DateTimePatterns_ar_JO);


/**
 * Extended set of localized date/time patterns for locale ar_KM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_KM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_KM : goog.i18n.cldr41.DateTimePatterns_ar_KM);


/**
 * Extended set of localized date/time patterns for locale ar_KW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_KW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_KW : goog.i18n.cldr41.DateTimePatterns_ar_KW);


/**
 * Extended set of localized date/time patterns for locale ar_LB.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_LB = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_LB : goog.i18n.cldr41.DateTimePatterns_ar_LB);


/**
 * Extended set of localized date/time patterns for locale ar_LY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_LY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_LY : goog.i18n.cldr41.DateTimePatterns_ar_LY);


/**
 * Extended set of localized date/time patterns for locale ar_MA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_MA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_MA : goog.i18n.cldr41.DateTimePatterns_ar_MA);


/**
 * Extended set of localized date/time patterns for locale ar_MR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_MR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_MR : goog.i18n.cldr41.DateTimePatterns_ar_MR);


/**
 * Extended set of localized date/time patterns for locale ar_OM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_OM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_OM : goog.i18n.cldr41.DateTimePatterns_ar_OM);


/**
 * Extended set of localized date/time patterns for locale ar_PS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_PS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_PS : goog.i18n.cldr41.DateTimePatterns_ar_PS);


/**
 * Extended set of localized date/time patterns for locale ar_QA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_QA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_QA : goog.i18n.cldr41.DateTimePatterns_ar_QA);


/**
 * Extended set of localized date/time patterns for locale ar_SA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_SA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_SA : goog.i18n.cldr41.DateTimePatterns_ar_SA);


/**
 * Extended set of localized date/time patterns for locale ar_SD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_SD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_SD : goog.i18n.cldr41.DateTimePatterns_ar_SD);


/**
 * Extended set of localized date/time patterns for locale ar_SO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_SO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_SO : goog.i18n.cldr41.DateTimePatterns_ar_SO);


/**
 * Extended set of localized date/time patterns for locale ar_SS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_SS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_SS : goog.i18n.cldr41.DateTimePatterns_ar_SS);


/**
 * Extended set of localized date/time patterns for locale ar_SY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_SY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_SY : goog.i18n.cldr41.DateTimePatterns_ar_SY);


/**
 * Extended set of localized date/time patterns for locale ar_TD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_TD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_TD : goog.i18n.cldr41.DateTimePatterns_ar_TD);


/**
 * Extended set of localized date/time patterns for locale ar_TN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_TN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_TN : goog.i18n.cldr41.DateTimePatterns_ar_TN);


/**
 * Extended set of localized date/time patterns for locale ar_XB.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_XB = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_XB : goog.i18n.cldr41.DateTimePatterns_ar_XB);


/**
 * Extended set of localized date/time patterns for locale ar_YE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ar_YE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ar_YE : goog.i18n.cldr41.DateTimePatterns_ar_YE);


/**
 * Extended set of localized date/time patterns for locale as.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_as = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_as : goog.i18n.cldr41.DateTimePatterns_as);


/**
 * Extended set of localized date/time patterns for locale as_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_as_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_as_IN : goog.i18n.cldr41.DateTimePatterns_as_IN);


/**
 * Extended set of localized date/time patterns for locale asa.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_asa = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_asa : goog.i18n.cldr41.DateTimePatterns_asa);


/**
 * Extended set of localized date/time patterns for locale asa_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_asa_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_asa_TZ : goog.i18n.cldr41.DateTimePatterns_asa_TZ);


/**
 * Extended set of localized date/time patterns for locale ast.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ast = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ast : goog.i18n.cldr41.DateTimePatterns_ast);


/**
 * Extended set of localized date/time patterns for locale ast_ES.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ast_ES = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ast_ES : goog.i18n.cldr41.DateTimePatterns_ast_ES);


/**
 * Extended set of localized date/time patterns for locale az_Cyrl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_az_Cyrl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_az_Cyrl : goog.i18n.cldr41.DateTimePatterns_az_Cyrl);


/**
 * Extended set of localized date/time patterns for locale az_Cyrl_AZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_az_Cyrl_AZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_az_Cyrl_AZ : goog.i18n.cldr41.DateTimePatterns_az_Cyrl_AZ);


/**
 * Extended set of localized date/time patterns for locale az_Latn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_az_Latn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_az_Latn : goog.i18n.cldr41.DateTimePatterns_az_Latn);


/**
 * Extended set of localized date/time patterns for locale az_Latn_AZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_az_Latn_AZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_az_Latn_AZ : goog.i18n.cldr41.DateTimePatterns_az_Latn_AZ);


/**
 * Extended set of localized date/time patterns for locale bas.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bas = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bas : goog.i18n.cldr41.DateTimePatterns_bas);


/**
 * Extended set of localized date/time patterns for locale bas_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bas_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bas_CM : goog.i18n.cldr41.DateTimePatterns_bas_CM);


/**
 * Extended set of localized date/time patterns for locale be_BY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_be_BY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_be_BY : goog.i18n.cldr41.DateTimePatterns_be_BY);


/**
 * Extended set of localized date/time patterns for locale bem.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bem = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bem : goog.i18n.cldr41.DateTimePatterns_bem);


/**
 * Extended set of localized date/time patterns for locale bem_ZM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bem_ZM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bem_ZM : goog.i18n.cldr41.DateTimePatterns_bem_ZM);


/**
 * Extended set of localized date/time patterns for locale bez.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bez = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bez : goog.i18n.cldr41.DateTimePatterns_bez);


/**
 * Extended set of localized date/time patterns for locale bez_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bez_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bez_TZ : goog.i18n.cldr41.DateTimePatterns_bez_TZ);


/**
 * Extended set of localized date/time patterns for locale bg_BG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bg_BG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bg_BG : goog.i18n.cldr41.DateTimePatterns_bg_BG);


/**
 * Extended set of localized date/time patterns for locale bgc.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bgc = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bgc : goog.i18n.cldr41.DateTimePatterns);


/**
 * Extended set of localized date/time patterns for locale bgc_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bgc_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bgc_IN : goog.i18n.cldr41.DateTimePatterns);


/**
 * Extended set of localized date/time patterns for locale bho.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bho = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bho : goog.i18n.cldr41.DateTimePatterns);


/**
 * Extended set of localized date/time patterns for locale bho_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bho_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bho_IN : goog.i18n.cldr41.DateTimePatterns);


/**
 * Extended set of localized date/time patterns for locale bm.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bm = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bm : goog.i18n.cldr41.DateTimePatterns_bm);


/**
 * Extended set of localized date/time patterns for locale bm_ML.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bm_ML = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bm_ML : goog.i18n.cldr41.DateTimePatterns_bm_ML);


/**
 * Extended set of localized date/time patterns for locale bn_BD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bn_BD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bn_BD : goog.i18n.cldr41.DateTimePatterns_bn_BD);


/**
 * Extended set of localized date/time patterns for locale bn_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bn_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bn_IN : goog.i18n.cldr41.DateTimePatterns_bn_IN);


/**
 * Extended set of localized date/time patterns for locale bo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bo : goog.i18n.cldr41.DateTimePatterns_bo);


/**
 * Extended set of localized date/time patterns for locale bo_CN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bo_CN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bo_CN : goog.i18n.cldr41.DateTimePatterns_bo_CN);


/**
 * Extended set of localized date/time patterns for locale bo_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bo_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bo_IN : goog.i18n.cldr41.DateTimePatterns_bo_IN);


/**
 * Extended set of localized date/time patterns for locale br_FR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_br_FR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_br_FR : goog.i18n.cldr41.DateTimePatterns_br_FR);


/**
 * Extended set of localized date/time patterns for locale brx.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_brx = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_brx : goog.i18n.cldr41.DateTimePatterns_brx);


/**
 * Extended set of localized date/time patterns for locale brx_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_brx_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_brx_IN : goog.i18n.cldr41.DateTimePatterns_brx_IN);


/**
 * Extended set of localized date/time patterns for locale bs_Cyrl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bs_Cyrl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bs_Cyrl : goog.i18n.cldr41.DateTimePatterns_bs_Cyrl);


/**
 * Extended set of localized date/time patterns for locale bs_Cyrl_BA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bs_Cyrl_BA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bs_Cyrl_BA : goog.i18n.cldr41.DateTimePatterns_bs_Cyrl_BA);


/**
 * Extended set of localized date/time patterns for locale bs_Latn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bs_Latn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bs_Latn : goog.i18n.cldr41.DateTimePatterns_bs_Latn);


/**
 * Extended set of localized date/time patterns for locale bs_Latn_BA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_bs_Latn_BA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_bs_Latn_BA : goog.i18n.cldr41.DateTimePatterns_bs_Latn_BA);


/**
 * Extended set of localized date/time patterns for locale ca_AD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ca_AD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ca_AD : goog.i18n.cldr41.DateTimePatterns_ca_AD);


/**
 * Extended set of localized date/time patterns for locale ca_ES.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ca_ES = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ca_ES : goog.i18n.cldr41.DateTimePatterns_ca_ES);


/**
 * Extended set of localized date/time patterns for locale ca_FR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ca_FR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ca_FR : goog.i18n.cldr41.DateTimePatterns_ca_FR);


/**
 * Extended set of localized date/time patterns for locale ca_IT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ca_IT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ca_IT : goog.i18n.cldr41.DateTimePatterns_ca_IT);


/**
 * Extended set of localized date/time patterns for locale ccp.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ccp = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ccp : goog.i18n.cldr41.DateTimePatterns_ccp);


/**
 * Extended set of localized date/time patterns for locale ccp_BD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ccp_BD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ccp_BD : goog.i18n.cldr41.DateTimePatterns_ccp_BD);


/**
 * Extended set of localized date/time patterns for locale ccp_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ccp_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ccp_IN : goog.i18n.cldr41.DateTimePatterns_ccp_IN);


/**
 * Extended set of localized date/time patterns for locale ce.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ce = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ce : goog.i18n.cldr41.DateTimePatterns_ce);


/**
 * Extended set of localized date/time patterns for locale ce_RU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ce_RU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ce_RU : goog.i18n.cldr41.DateTimePatterns_ce_RU);


/**
 * Extended set of localized date/time patterns for locale ceb.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ceb = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ceb : goog.i18n.cldr41.DateTimePatterns_ceb);


/**
 * Extended set of localized date/time patterns for locale ceb_PH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ceb_PH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ceb_PH : goog.i18n.cldr41.DateTimePatterns_ceb_PH);


/**
 * Extended set of localized date/time patterns for locale cgg.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_cgg = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_cgg : goog.i18n.cldr41.DateTimePatterns_cgg);


/**
 * Extended set of localized date/time patterns for locale cgg_UG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_cgg_UG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_cgg_UG : goog.i18n.cldr41.DateTimePatterns_cgg_UG);


/**
 * Extended set of localized date/time patterns for locale chr_US.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_chr_US = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_chr_US : goog.i18n.cldr41.DateTimePatterns_chr_US);


/**
 * Extended set of localized date/time patterns for locale ckb.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ckb = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ckb : goog.i18n.cldr41.DateTimePatterns_ckb);


/**
 * Extended set of localized date/time patterns for locale ckb_Arab.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ckb_Arab = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ckb_Arab : goog.i18n.cldr41.DateTimePatterns_ckb_Arab);


/**
 * Extended set of localized date/time patterns for locale ckb_Arab_IQ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ckb_Arab_IQ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ckb_Arab_IQ : goog.i18n.cldr41.DateTimePatterns_ckb_Arab_IQ);


/**
 * Extended set of localized date/time patterns for locale ckb_Arab_IR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ckb_Arab_IR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ckb_Arab_IR : goog.i18n.cldr41.DateTimePatterns_ckb_Arab_IR);


/**
 * Extended set of localized date/time patterns for locale ckb_IQ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ckb_IQ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ckb_IQ : goog.i18n.cldr41.DateTimePatterns_ckb_IQ);


/**
 * Extended set of localized date/time patterns for locale ckb_IR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ckb_IR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ckb_IR : goog.i18n.cldr41.DateTimePatterns_ckb_IR);


/**
 * Extended set of localized date/time patterns for locale cs_CZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_cs_CZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_cs_CZ : goog.i18n.cldr41.DateTimePatterns_cs_CZ);


/**
 * Extended set of localized date/time patterns for locale cv.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_cv = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_cv : goog.i18n.cldr41.DateTimePatterns);


/**
 * Extended set of localized date/time patterns for locale cv_RU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_cv_RU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_cv_RU : goog.i18n.cldr41.DateTimePatterns);


/**
 * Extended set of localized date/time patterns for locale cy_GB.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_cy_GB = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_cy_GB : goog.i18n.cldr41.DateTimePatterns_cy_GB);


/**
 * Extended set of localized date/time patterns for locale da_DK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_da_DK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_da_DK : goog.i18n.cldr41.DateTimePatterns_da_DK);


/**
 * Extended set of localized date/time patterns for locale da_GL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_da_GL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_da_GL : goog.i18n.cldr41.DateTimePatterns_da_GL);


/**
 * Extended set of localized date/time patterns for locale dav.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dav = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dav : goog.i18n.cldr41.DateTimePatterns_dav);


/**
 * Extended set of localized date/time patterns for locale dav_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dav_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dav_KE : goog.i18n.cldr41.DateTimePatterns_dav_KE);


/**
 * Extended set of localized date/time patterns for locale de_BE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_de_BE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_de_BE : goog.i18n.cldr41.DateTimePatterns_de_BE);


/**
 * Extended set of localized date/time patterns for locale de_DE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_de_DE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_de_DE : goog.i18n.cldr41.DateTimePatterns_de_DE);


/**
 * Extended set of localized date/time patterns for locale de_IT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_de_IT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_de_IT : goog.i18n.cldr41.DateTimePatterns_de_IT);


/**
 * Extended set of localized date/time patterns for locale de_LI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_de_LI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_de_LI : goog.i18n.cldr41.DateTimePatterns_de_LI);


/**
 * Extended set of localized date/time patterns for locale de_LU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_de_LU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_de_LU : goog.i18n.cldr41.DateTimePatterns_de_LU);


/**
 * Extended set of localized date/time patterns for locale dje.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dje = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dje : goog.i18n.cldr41.DateTimePatterns_dje);


/**
 * Extended set of localized date/time patterns for locale dje_NE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dje_NE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dje_NE : goog.i18n.cldr41.DateTimePatterns_dje_NE);


/**
 * Extended set of localized date/time patterns for locale doi.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_doi = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_doi : goog.i18n.cldr41.DateTimePatterns_doi);


/**
 * Extended set of localized date/time patterns for locale doi_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_doi_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_doi_IN : goog.i18n.cldr41.DateTimePatterns_doi_IN);


/**
 * Extended set of localized date/time patterns for locale dsb.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dsb = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dsb : goog.i18n.cldr41.DateTimePatterns_dsb);


/**
 * Extended set of localized date/time patterns for locale dsb_DE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dsb_DE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dsb_DE : goog.i18n.cldr41.DateTimePatterns_dsb_DE);


/**
 * Extended set of localized date/time patterns for locale dua.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dua = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dua : goog.i18n.cldr41.DateTimePatterns_dua);


/**
 * Extended set of localized date/time patterns for locale dua_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dua_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dua_CM : goog.i18n.cldr41.DateTimePatterns_dua_CM);


/**
 * Extended set of localized date/time patterns for locale dyo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dyo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dyo : goog.i18n.cldr41.DateTimePatterns_dyo);


/**
 * Extended set of localized date/time patterns for locale dyo_SN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dyo_SN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dyo_SN : goog.i18n.cldr41.DateTimePatterns_dyo_SN);


/**
 * Extended set of localized date/time patterns for locale dz.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dz = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dz : goog.i18n.cldr41.DateTimePatterns_dz);


/**
 * Extended set of localized date/time patterns for locale dz_BT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_dz_BT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_dz_BT : goog.i18n.cldr41.DateTimePatterns_dz_BT);


/**
 * Extended set of localized date/time patterns for locale ebu.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ebu = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ebu : goog.i18n.cldr41.DateTimePatterns_ebu);


/**
 * Extended set of localized date/time patterns for locale ebu_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ebu_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ebu_KE : goog.i18n.cldr41.DateTimePatterns_ebu_KE);


/**
 * Extended set of localized date/time patterns for locale ee.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ee = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ee : goog.i18n.cldr41.DateTimePatterns_ee);


/**
 * Extended set of localized date/time patterns for locale ee_GH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ee_GH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ee_GH : goog.i18n.cldr41.DateTimePatterns_ee_GH);


/**
 * Extended set of localized date/time patterns for locale ee_TG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ee_TG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ee_TG : goog.i18n.cldr41.DateTimePatterns_ee_TG);


/**
 * Extended set of localized date/time patterns for locale el_CY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_el_CY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_el_CY : goog.i18n.cldr41.DateTimePatterns_el_CY);


/**
 * Extended set of localized date/time patterns for locale el_GR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_el_GR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_el_GR : goog.i18n.cldr41.DateTimePatterns_el_GR);


/**
 * Extended set of localized date/time patterns for locale en_001.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_001 = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_001 : goog.i18n.cldr41.DateTimePatterns_en_001);


/**
 * Extended set of localized date/time patterns for locale en_150.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_150 = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_150 : goog.i18n.cldr41.DateTimePatterns_en_150);


/**
 * Extended set of localized date/time patterns for locale en_AE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_AE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_AE : goog.i18n.cldr41.DateTimePatterns_en_AE);


/**
 * Extended set of localized date/time patterns for locale en_AG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_AG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_AG : goog.i18n.cldr41.DateTimePatterns_en_AG);


/**
 * Extended set of localized date/time patterns for locale en_AI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_AI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_AI : goog.i18n.cldr41.DateTimePatterns_en_AI);


/**
 * Extended set of localized date/time patterns for locale en_AS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_AS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_AS : goog.i18n.cldr41.DateTimePatterns_en_AS);


/**
 * Extended set of localized date/time patterns for locale en_AT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_AT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_AT : goog.i18n.cldr41.DateTimePatterns_en_AT);


/**
 * Extended set of localized date/time patterns for locale en_BB.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_BB = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_BB : goog.i18n.cldr41.DateTimePatterns_en_BB);


/**
 * Extended set of localized date/time patterns for locale en_BE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_BE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_BE : goog.i18n.cldr41.DateTimePatterns_en_BE);


/**
 * Extended set of localized date/time patterns for locale en_BI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_BI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_BI : goog.i18n.cldr41.DateTimePatterns_en_BI);


/**
 * Extended set of localized date/time patterns for locale en_BM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_BM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_BM : goog.i18n.cldr41.DateTimePatterns_en_BM);


/**
 * Extended set of localized date/time patterns for locale en_BS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_BS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_BS : goog.i18n.cldr41.DateTimePatterns_en_BS);


/**
 * Extended set of localized date/time patterns for locale en_BW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_BW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_BW : goog.i18n.cldr41.DateTimePatterns_en_BW);


/**
 * Extended set of localized date/time patterns for locale en_BZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_BZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_BZ : goog.i18n.cldr41.DateTimePatterns_en_BZ);


/**
 * Extended set of localized date/time patterns for locale en_CC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_CC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_CC : goog.i18n.cldr41.DateTimePatterns_en_CC);


/**
 * Extended set of localized date/time patterns for locale en_CH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_CH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_CH : goog.i18n.cldr41.DateTimePatterns_en_CH);


/**
 * Extended set of localized date/time patterns for locale en_CK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_CK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_CK : goog.i18n.cldr41.DateTimePatterns_en_CK);


/**
 * Extended set of localized date/time patterns for locale en_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_CM : goog.i18n.cldr41.DateTimePatterns_en_CM);


/**
 * Extended set of localized date/time patterns for locale en_CX.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_CX = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_CX : goog.i18n.cldr41.DateTimePatterns_en_CX);


/**
 * Extended set of localized date/time patterns for locale en_CY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_CY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_CY : goog.i18n.cldr41.DateTimePatterns_en_CY);


/**
 * Extended set of localized date/time patterns for locale en_DE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_DE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_DE : goog.i18n.cldr41.DateTimePatterns_en_DE);


/**
 * Extended set of localized date/time patterns for locale en_DG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_DG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_DG : goog.i18n.cldr41.DateTimePatterns_en_DG);


/**
 * Extended set of localized date/time patterns for locale en_DK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_DK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_DK : goog.i18n.cldr41.DateTimePatterns_en_DK);


/**
 * Extended set of localized date/time patterns for locale en_DM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_DM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_DM : goog.i18n.cldr41.DateTimePatterns_en_DM);


/**
 * Extended set of localized date/time patterns for locale en_ER.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_ER = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_ER : goog.i18n.cldr41.DateTimePatterns_en_ER);


/**
 * Extended set of localized date/time patterns for locale en_FI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_FI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_FI : goog.i18n.cldr41.DateTimePatterns_en_FI);


/**
 * Extended set of localized date/time patterns for locale en_FJ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_FJ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_FJ : goog.i18n.cldr41.DateTimePatterns_en_FJ);


/**
 * Extended set of localized date/time patterns for locale en_FK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_FK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_FK : goog.i18n.cldr41.DateTimePatterns_en_FK);


/**
 * Extended set of localized date/time patterns for locale en_FM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_FM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_FM : goog.i18n.cldr41.DateTimePatterns_en_FM);


/**
 * Extended set of localized date/time patterns for locale en_GD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_GD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_GD : goog.i18n.cldr41.DateTimePatterns_en_GD);


/**
 * Extended set of localized date/time patterns for locale en_GG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_GG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_GG : goog.i18n.cldr41.DateTimePatterns_en_GG);


/**
 * Extended set of localized date/time patterns for locale en_GH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_GH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_GH : goog.i18n.cldr41.DateTimePatterns_en_GH);


/**
 * Extended set of localized date/time patterns for locale en_GI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_GI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_GI : goog.i18n.cldr41.DateTimePatterns_en_GI);


/**
 * Extended set of localized date/time patterns for locale en_GM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_GM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_GM : goog.i18n.cldr41.DateTimePatterns_en_GM);


/**
 * Extended set of localized date/time patterns for locale en_GU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_GU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_GU : goog.i18n.cldr41.DateTimePatterns_en_GU);


/**
 * Extended set of localized date/time patterns for locale en_GY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_GY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_GY : goog.i18n.cldr41.DateTimePatterns_en_GY);


/**
 * Extended set of localized date/time patterns for locale en_HK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_HK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_HK : goog.i18n.cldr41.DateTimePatterns_en_HK);


/**
 * Extended set of localized date/time patterns for locale en_IL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_IL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_IL : goog.i18n.cldr41.DateTimePatterns_en_IL);


/**
 * Extended set of localized date/time patterns for locale en_IM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_IM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_IM : goog.i18n.cldr41.DateTimePatterns_en_IM);


/**
 * Extended set of localized date/time patterns for locale en_IO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_IO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_IO : goog.i18n.cldr41.DateTimePatterns_en_IO);


/**
 * Extended set of localized date/time patterns for locale en_JE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_JE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_JE : goog.i18n.cldr41.DateTimePatterns_en_JE);


/**
 * Extended set of localized date/time patterns for locale en_JM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_JM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_JM : goog.i18n.cldr41.DateTimePatterns_en_JM);


/**
 * Extended set of localized date/time patterns for locale en_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_KE : goog.i18n.cldr41.DateTimePatterns_en_KE);


/**
 * Extended set of localized date/time patterns for locale en_KI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_KI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_KI : goog.i18n.cldr41.DateTimePatterns_en_KI);


/**
 * Extended set of localized date/time patterns for locale en_KN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_KN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_KN : goog.i18n.cldr41.DateTimePatterns_en_KN);


/**
 * Extended set of localized date/time patterns for locale en_KY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_KY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_KY : goog.i18n.cldr41.DateTimePatterns_en_KY);


/**
 * Extended set of localized date/time patterns for locale en_LC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_LC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_LC : goog.i18n.cldr41.DateTimePatterns_en_LC);


/**
 * Extended set of localized date/time patterns for locale en_LR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_LR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_LR : goog.i18n.cldr41.DateTimePatterns_en_LR);


/**
 * Extended set of localized date/time patterns for locale en_LS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_LS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_LS : goog.i18n.cldr41.DateTimePatterns_en_LS);


/**
 * Extended set of localized date/time patterns for locale en_MG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MG : goog.i18n.cldr41.DateTimePatterns_en_MG);


/**
 * Extended set of localized date/time patterns for locale en_MH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MH : goog.i18n.cldr41.DateTimePatterns_en_MH);


/**
 * Extended set of localized date/time patterns for locale en_MO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MO : goog.i18n.cldr41.DateTimePatterns_en_MO);


/**
 * Extended set of localized date/time patterns for locale en_MP.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MP = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MP : goog.i18n.cldr41.DateTimePatterns_en_MP);


/**
 * Extended set of localized date/time patterns for locale en_MS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MS : goog.i18n.cldr41.DateTimePatterns_en_MS);


/**
 * Extended set of localized date/time patterns for locale en_MT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MT : goog.i18n.cldr41.DateTimePatterns_en_MT);


/**
 * Extended set of localized date/time patterns for locale en_MU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MU : goog.i18n.cldr41.DateTimePatterns_en_MU);


/**
 * Extended set of localized date/time patterns for locale en_MV.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MV = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MV : goog.i18n.cldr41.DateTimePatterns_en_MV);


/**
 * Extended set of localized date/time patterns for locale en_MW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MW : goog.i18n.cldr41.DateTimePatterns_en_MW);


/**
 * Extended set of localized date/time patterns for locale en_MY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_MY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_MY : goog.i18n.cldr41.DateTimePatterns_en_MY);


/**
 * Extended set of localized date/time patterns for locale en_NA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_NA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_NA : goog.i18n.cldr41.DateTimePatterns_en_NA);


/**
 * Extended set of localized date/time patterns for locale en_NF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_NF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_NF : goog.i18n.cldr41.DateTimePatterns_en_NF);


/**
 * Extended set of localized date/time patterns for locale en_NG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_NG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_NG : goog.i18n.cldr41.DateTimePatterns_en_NG);


/**
 * Extended set of localized date/time patterns for locale en_NL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_NL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_NL : goog.i18n.cldr41.DateTimePatterns_en_NL);


/**
 * Extended set of localized date/time patterns for locale en_NR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_NR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_NR : goog.i18n.cldr41.DateTimePatterns_en_NR);


/**
 * Extended set of localized date/time patterns for locale en_NU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_NU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_NU : goog.i18n.cldr41.DateTimePatterns_en_NU);


/**
 * Extended set of localized date/time patterns for locale en_NZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_NZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_NZ : goog.i18n.cldr41.DateTimePatterns_en_NZ);


/**
 * Extended set of localized date/time patterns for locale en_PG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_PG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_PG : goog.i18n.cldr41.DateTimePatterns_en_PG);


/**
 * Extended set of localized date/time patterns for locale en_PH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_PH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_PH : goog.i18n.cldr41.DateTimePatterns_en_PH);


/**
 * Extended set of localized date/time patterns for locale en_PK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_PK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_PK : goog.i18n.cldr41.DateTimePatterns_en_PK);


/**
 * Extended set of localized date/time patterns for locale en_PN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_PN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_PN : goog.i18n.cldr41.DateTimePatterns_en_PN);


/**
 * Extended set of localized date/time patterns for locale en_PR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_PR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_PR : goog.i18n.cldr41.DateTimePatterns_en_PR);


/**
 * Extended set of localized date/time patterns for locale en_PW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_PW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_PW : goog.i18n.cldr41.DateTimePatterns_en_PW);


/**
 * Extended set of localized date/time patterns for locale en_RW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_RW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_RW : goog.i18n.cldr41.DateTimePatterns_en_RW);


/**
 * Extended set of localized date/time patterns for locale en_SB.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SB = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SB : goog.i18n.cldr41.DateTimePatterns_en_SB);


/**
 * Extended set of localized date/time patterns for locale en_SC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SC : goog.i18n.cldr41.DateTimePatterns_en_SC);


/**
 * Extended set of localized date/time patterns for locale en_SD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SD : goog.i18n.cldr41.DateTimePatterns_en_SD);


/**
 * Extended set of localized date/time patterns for locale en_SE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SE : goog.i18n.cldr41.DateTimePatterns_en_SE);


/**
 * Extended set of localized date/time patterns for locale en_SH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SH : goog.i18n.cldr41.DateTimePatterns_en_SH);


/**
 * Extended set of localized date/time patterns for locale en_SI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SI : goog.i18n.cldr41.DateTimePatterns_en_SI);


/**
 * Extended set of localized date/time patterns for locale en_SL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SL : goog.i18n.cldr41.DateTimePatterns_en_SL);


/**
 * Extended set of localized date/time patterns for locale en_SS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SS : goog.i18n.cldr41.DateTimePatterns_en_SS);


/**
 * Extended set of localized date/time patterns for locale en_SX.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SX = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SX : goog.i18n.cldr41.DateTimePatterns_en_SX);


/**
 * Extended set of localized date/time patterns for locale en_SZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_SZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_SZ : goog.i18n.cldr41.DateTimePatterns_en_SZ);


/**
 * Extended set of localized date/time patterns for locale en_TC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_TC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_TC : goog.i18n.cldr41.DateTimePatterns_en_TC);


/**
 * Extended set of localized date/time patterns for locale en_TK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_TK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_TK : goog.i18n.cldr41.DateTimePatterns_en_TK);


/**
 * Extended set of localized date/time patterns for locale en_TO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_TO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_TO : goog.i18n.cldr41.DateTimePatterns_en_TO);


/**
 * Extended set of localized date/time patterns for locale en_TT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_TT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_TT : goog.i18n.cldr41.DateTimePatterns_en_TT);


/**
 * Extended set of localized date/time patterns for locale en_TV.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_TV = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_TV : goog.i18n.cldr41.DateTimePatterns_en_TV);


/**
 * Extended set of localized date/time patterns for locale en_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_TZ : goog.i18n.cldr41.DateTimePatterns_en_TZ);


/**
 * Extended set of localized date/time patterns for locale en_UG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_UG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_UG : goog.i18n.cldr41.DateTimePatterns_en_UG);


/**
 * Extended set of localized date/time patterns for locale en_UM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_UM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_UM : goog.i18n.cldr41.DateTimePatterns_en_UM);


/**
 * Extended set of localized date/time patterns for locale en_US_POSIX.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_US_POSIX = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_US_POSIX : goog.i18n.cldr41.DateTimePatterns_en_US_POSIX);


/**
 * Extended set of localized date/time patterns for locale en_VC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_VC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_VC : goog.i18n.cldr41.DateTimePatterns_en_VC);


/**
 * Extended set of localized date/time patterns for locale en_VG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_VG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_VG : goog.i18n.cldr41.DateTimePatterns_en_VG);


/**
 * Extended set of localized date/time patterns for locale en_VI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_VI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_VI : goog.i18n.cldr41.DateTimePatterns_en_VI);


/**
 * Extended set of localized date/time patterns for locale en_VU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_VU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_VU : goog.i18n.cldr41.DateTimePatterns_en_VU);


/**
 * Extended set of localized date/time patterns for locale en_WS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_WS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_WS : goog.i18n.cldr41.DateTimePatterns_en_WS);


/**
 * Extended set of localized date/time patterns for locale en_XA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_XA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_XA : goog.i18n.cldr41.DateTimePatterns_en_XA);


/**
 * Extended set of localized date/time patterns for locale en_ZM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_ZM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_ZM : goog.i18n.cldr41.DateTimePatterns_en_ZM);


/**
 * Extended set of localized date/time patterns for locale en_ZW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_en_ZW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_en_ZW : goog.i18n.cldr41.DateTimePatterns_en_ZW);


/**
 * Extended set of localized date/time patterns for locale eo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_eo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_eo : goog.i18n.cldr41.DateTimePatterns_eo);


/**
 * Extended set of localized date/time patterns for locale eo_001.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_eo_001 = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_eo_001 : goog.i18n.cldr41.DateTimePatterns_eo_001);


/**
 * Extended set of localized date/time patterns for locale es_AR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_AR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_AR : goog.i18n.cldr41.DateTimePatterns_es_AR);


/**
 * Extended set of localized date/time patterns for locale es_BO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_BO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_BO : goog.i18n.cldr41.DateTimePatterns_es_BO);


/**
 * Extended set of localized date/time patterns for locale es_BR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_BR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_BR : goog.i18n.cldr41.DateTimePatterns_es_BR);


/**
 * Extended set of localized date/time patterns for locale es_BZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_BZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_BZ : goog.i18n.cldr41.DateTimePatterns_es_BZ);


/**
 * Extended set of localized date/time patterns for locale es_CL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_CL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_CL : goog.i18n.cldr41.DateTimePatterns_es_CL);


/**
 * Extended set of localized date/time patterns for locale es_CO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_CO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_CO : goog.i18n.cldr41.DateTimePatterns_es_CO);


/**
 * Extended set of localized date/time patterns for locale es_CR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_CR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_CR : goog.i18n.cldr41.DateTimePatterns_es_CR);


/**
 * Extended set of localized date/time patterns for locale es_CU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_CU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_CU : goog.i18n.cldr41.DateTimePatterns_es_CU);


/**
 * Extended set of localized date/time patterns for locale es_DO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_DO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_DO : goog.i18n.cldr41.DateTimePatterns_es_DO);


/**
 * Extended set of localized date/time patterns for locale es_EA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_EA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_EA : goog.i18n.cldr41.DateTimePatterns_es_EA);


/**
 * Extended set of localized date/time patterns for locale es_EC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_EC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_EC : goog.i18n.cldr41.DateTimePatterns_es_EC);


/**
 * Extended set of localized date/time patterns for locale es_GQ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_GQ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_GQ : goog.i18n.cldr41.DateTimePatterns_es_GQ);


/**
 * Extended set of localized date/time patterns for locale es_GT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_GT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_GT : goog.i18n.cldr41.DateTimePatterns_es_GT);


/**
 * Extended set of localized date/time patterns for locale es_HN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_HN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_HN : goog.i18n.cldr41.DateTimePatterns_es_HN);


/**
 * Extended set of localized date/time patterns for locale es_IC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_IC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_IC : goog.i18n.cldr41.DateTimePatterns_es_IC);


/**
 * Extended set of localized date/time patterns for locale es_NI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_NI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_NI : goog.i18n.cldr41.DateTimePatterns_es_NI);


/**
 * Extended set of localized date/time patterns for locale es_PA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_PA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_PA : goog.i18n.cldr41.DateTimePatterns_es_PA);


/**
 * Extended set of localized date/time patterns for locale es_PE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_PE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_PE : goog.i18n.cldr41.DateTimePatterns_es_PE);


/**
 * Extended set of localized date/time patterns for locale es_PH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_PH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_PH : goog.i18n.cldr41.DateTimePatterns_es_PH);


/**
 * Extended set of localized date/time patterns for locale es_PR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_PR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_PR : goog.i18n.cldr41.DateTimePatterns_es_PR);


/**
 * Extended set of localized date/time patterns for locale es_PY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_PY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_PY : goog.i18n.cldr41.DateTimePatterns_es_PY);


/**
 * Extended set of localized date/time patterns for locale es_SV.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_SV = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_SV : goog.i18n.cldr41.DateTimePatterns_es_SV);


/**
 * Extended set of localized date/time patterns for locale es_UY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_UY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_UY : goog.i18n.cldr41.DateTimePatterns_es_UY);


/**
 * Extended set of localized date/time patterns for locale es_VE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_es_VE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_es_VE : goog.i18n.cldr41.DateTimePatterns_es_VE);


/**
 * Extended set of localized date/time patterns for locale et_EE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_et_EE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_et_EE : goog.i18n.cldr41.DateTimePatterns_et_EE);


/**
 * Extended set of localized date/time patterns for locale eu_ES.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_eu_ES = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_eu_ES : goog.i18n.cldr41.DateTimePatterns_eu_ES);


/**
 * Extended set of localized date/time patterns for locale ewo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ewo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ewo : goog.i18n.cldr41.DateTimePatterns_ewo);


/**
 * Extended set of localized date/time patterns for locale ewo_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ewo_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ewo_CM : goog.i18n.cldr41.DateTimePatterns_ewo_CM);


/**
 * Extended set of localized date/time patterns for locale fa_AF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fa_AF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fa_AF : goog.i18n.cldr41.DateTimePatterns_fa_AF);


/**
 * Extended set of localized date/time patterns for locale fa_IR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fa_IR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fa_IR : goog.i18n.cldr41.DateTimePatterns_fa_IR);


/**
 * Extended set of localized date/time patterns for locale ff.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff : goog.i18n.cldr41.DateTimePatterns_ff);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm : goog.i18n.cldr41.DateTimePatterns_ff_Adlm);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_BF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_BF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_BF : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_BF);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_CM : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_CM);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_GH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_GH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_GH : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_GH);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_GM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_GM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_GM : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_GM);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_GN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_GN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_GN : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_GN);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_GW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_GW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_GW : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_GW);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_LR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_LR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_LR : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_LR);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_MR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_MR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_MR : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_MR);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_NE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_NE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_NE : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_NE);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_NG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_NG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_NG : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_NG);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_SL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_SL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_SL : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_SL);


/**
 * Extended set of localized date/time patterns for locale ff_Adlm_SN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Adlm_SN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Adlm_SN : goog.i18n.cldr41.DateTimePatterns_ff_Adlm_SN);


/**
 * Extended set of localized date/time patterns for locale ff_Latn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn : goog.i18n.cldr41.DateTimePatterns_ff_Latn);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_BF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_BF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_BF : goog.i18n.cldr41.DateTimePatterns_ff_Latn_BF);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_CM : goog.i18n.cldr41.DateTimePatterns_ff_Latn_CM);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_GH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_GH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_GH : goog.i18n.cldr41.DateTimePatterns_ff_Latn_GH);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_GM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_GM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_GM : goog.i18n.cldr41.DateTimePatterns_ff_Latn_GM);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_GN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_GN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_GN : goog.i18n.cldr41.DateTimePatterns_ff_Latn_GN);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_GW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_GW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_GW : goog.i18n.cldr41.DateTimePatterns_ff_Latn_GW);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_LR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_LR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_LR : goog.i18n.cldr41.DateTimePatterns_ff_Latn_LR);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_MR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_MR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_MR : goog.i18n.cldr41.DateTimePatterns_ff_Latn_MR);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_NE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_NE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_NE : goog.i18n.cldr41.DateTimePatterns_ff_Latn_NE);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_NG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_NG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_NG : goog.i18n.cldr41.DateTimePatterns_ff_Latn_NG);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_SL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_SL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_SL : goog.i18n.cldr41.DateTimePatterns_ff_Latn_SL);


/**
 * Extended set of localized date/time patterns for locale ff_Latn_SN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ff_Latn_SN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ff_Latn_SN : goog.i18n.cldr41.DateTimePatterns_ff_Latn_SN);


/**
 * Extended set of localized date/time patterns for locale fi_FI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fi_FI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fi_FI : goog.i18n.cldr41.DateTimePatterns_fi_FI);


/**
 * Extended set of localized date/time patterns for locale fil_PH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fil_PH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fil_PH : goog.i18n.cldr41.DateTimePatterns_fil_PH);


/**
 * Extended set of localized date/time patterns for locale fo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fo : goog.i18n.cldr41.DateTimePatterns_fo);


/**
 * Extended set of localized date/time patterns for locale fo_DK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fo_DK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fo_DK : goog.i18n.cldr41.DateTimePatterns_fo_DK);


/**
 * Extended set of localized date/time patterns for locale fo_FO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fo_FO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fo_FO : goog.i18n.cldr41.DateTimePatterns_fo_FO);


/**
 * Extended set of localized date/time patterns for locale fr_BE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_BE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_BE : goog.i18n.cldr41.DateTimePatterns_fr_BE);


/**
 * Extended set of localized date/time patterns for locale fr_BF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_BF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_BF : goog.i18n.cldr41.DateTimePatterns_fr_BF);


/**
 * Extended set of localized date/time patterns for locale fr_BI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_BI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_BI : goog.i18n.cldr41.DateTimePatterns_fr_BI);


/**
 * Extended set of localized date/time patterns for locale fr_BJ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_BJ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_BJ : goog.i18n.cldr41.DateTimePatterns_fr_BJ);


/**
 * Extended set of localized date/time patterns for locale fr_BL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_BL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_BL : goog.i18n.cldr41.DateTimePatterns_fr_BL);


/**
 * Extended set of localized date/time patterns for locale fr_CD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_CD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_CD : goog.i18n.cldr41.DateTimePatterns_fr_CD);


/**
 * Extended set of localized date/time patterns for locale fr_CF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_CF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_CF : goog.i18n.cldr41.DateTimePatterns_fr_CF);


/**
 * Extended set of localized date/time patterns for locale fr_CG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_CG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_CG : goog.i18n.cldr41.DateTimePatterns_fr_CG);


/**
 * Extended set of localized date/time patterns for locale fr_CH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_CH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_CH : goog.i18n.cldr41.DateTimePatterns_fr_CH);


/**
 * Extended set of localized date/time patterns for locale fr_CI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_CI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_CI : goog.i18n.cldr41.DateTimePatterns_fr_CI);


/**
 * Extended set of localized date/time patterns for locale fr_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_CM : goog.i18n.cldr41.DateTimePatterns_fr_CM);


/**
 * Extended set of localized date/time patterns for locale fr_DJ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_DJ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_DJ : goog.i18n.cldr41.DateTimePatterns_fr_DJ);


/**
 * Extended set of localized date/time patterns for locale fr_DZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_DZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_DZ : goog.i18n.cldr41.DateTimePatterns_fr_DZ);


/**
 * Extended set of localized date/time patterns for locale fr_FR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_FR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_FR : goog.i18n.cldr41.DateTimePatterns_fr_FR);


/**
 * Extended set of localized date/time patterns for locale fr_GA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_GA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_GA : goog.i18n.cldr41.DateTimePatterns_fr_GA);


/**
 * Extended set of localized date/time patterns for locale fr_GF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_GF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_GF : goog.i18n.cldr41.DateTimePatterns_fr_GF);


/**
 * Extended set of localized date/time patterns for locale fr_GN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_GN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_GN : goog.i18n.cldr41.DateTimePatterns_fr_GN);


/**
 * Extended set of localized date/time patterns for locale fr_GP.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_GP = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_GP : goog.i18n.cldr41.DateTimePatterns_fr_GP);


/**
 * Extended set of localized date/time patterns for locale fr_GQ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_GQ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_GQ : goog.i18n.cldr41.DateTimePatterns_fr_GQ);


/**
 * Extended set of localized date/time patterns for locale fr_HT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_HT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_HT : goog.i18n.cldr41.DateTimePatterns_fr_HT);


/**
 * Extended set of localized date/time patterns for locale fr_KM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_KM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_KM : goog.i18n.cldr41.DateTimePatterns_fr_KM);


/**
 * Extended set of localized date/time patterns for locale fr_LU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_LU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_LU : goog.i18n.cldr41.DateTimePatterns_fr_LU);


/**
 * Extended set of localized date/time patterns for locale fr_MA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_MA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_MA : goog.i18n.cldr41.DateTimePatterns_fr_MA);


/**
 * Extended set of localized date/time patterns for locale fr_MC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_MC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_MC : goog.i18n.cldr41.DateTimePatterns_fr_MC);


/**
 * Extended set of localized date/time patterns for locale fr_MF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_MF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_MF : goog.i18n.cldr41.DateTimePatterns_fr_MF);


/**
 * Extended set of localized date/time patterns for locale fr_MG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_MG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_MG : goog.i18n.cldr41.DateTimePatterns_fr_MG);


/**
 * Extended set of localized date/time patterns for locale fr_ML.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_ML = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_ML : goog.i18n.cldr41.DateTimePatterns_fr_ML);


/**
 * Extended set of localized date/time patterns for locale fr_MQ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_MQ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_MQ : goog.i18n.cldr41.DateTimePatterns_fr_MQ);


/**
 * Extended set of localized date/time patterns for locale fr_MR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_MR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_MR : goog.i18n.cldr41.DateTimePatterns_fr_MR);


/**
 * Extended set of localized date/time patterns for locale fr_MU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_MU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_MU : goog.i18n.cldr41.DateTimePatterns_fr_MU);


/**
 * Extended set of localized date/time patterns for locale fr_NC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_NC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_NC : goog.i18n.cldr41.DateTimePatterns_fr_NC);


/**
 * Extended set of localized date/time patterns for locale fr_NE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_NE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_NE : goog.i18n.cldr41.DateTimePatterns_fr_NE);


/**
 * Extended set of localized date/time patterns for locale fr_PF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_PF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_PF : goog.i18n.cldr41.DateTimePatterns_fr_PF);


/**
 * Extended set of localized date/time patterns for locale fr_PM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_PM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_PM : goog.i18n.cldr41.DateTimePatterns_fr_PM);


/**
 * Extended set of localized date/time patterns for locale fr_RE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_RE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_RE : goog.i18n.cldr41.DateTimePatterns_fr_RE);


/**
 * Extended set of localized date/time patterns for locale fr_RW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_RW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_RW : goog.i18n.cldr41.DateTimePatterns_fr_RW);


/**
 * Extended set of localized date/time patterns for locale fr_SC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_SC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_SC : goog.i18n.cldr41.DateTimePatterns_fr_SC);


/**
 * Extended set of localized date/time patterns for locale fr_SN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_SN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_SN : goog.i18n.cldr41.DateTimePatterns_fr_SN);


/**
 * Extended set of localized date/time patterns for locale fr_SY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_SY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_SY : goog.i18n.cldr41.DateTimePatterns_fr_SY);


/**
 * Extended set of localized date/time patterns for locale fr_TD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_TD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_TD : goog.i18n.cldr41.DateTimePatterns_fr_TD);


/**
 * Extended set of localized date/time patterns for locale fr_TG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_TG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_TG : goog.i18n.cldr41.DateTimePatterns_fr_TG);


/**
 * Extended set of localized date/time patterns for locale fr_TN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_TN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_TN : goog.i18n.cldr41.DateTimePatterns_fr_TN);


/**
 * Extended set of localized date/time patterns for locale fr_VU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_VU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_VU : goog.i18n.cldr41.DateTimePatterns_fr_VU);


/**
 * Extended set of localized date/time patterns for locale fr_WF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_WF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_WF : goog.i18n.cldr41.DateTimePatterns_fr_WF);


/**
 * Extended set of localized date/time patterns for locale fr_YT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fr_YT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fr_YT : goog.i18n.cldr41.DateTimePatterns_fr_YT);


/**
 * Extended set of localized date/time patterns for locale fur.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fur = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fur : goog.i18n.cldr41.DateTimePatterns_fur);


/**
 * Extended set of localized date/time patterns for locale fur_IT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fur_IT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fur_IT : goog.i18n.cldr41.DateTimePatterns_fur_IT);


/**
 * Extended set of localized date/time patterns for locale fy.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fy = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fy : goog.i18n.cldr41.DateTimePatterns_fy);


/**
 * Extended set of localized date/time patterns for locale fy_NL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_fy_NL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_fy_NL : goog.i18n.cldr41.DateTimePatterns_fy_NL);


/**
 * Extended set of localized date/time patterns for locale ga_GB.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ga_GB = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ga_GB : goog.i18n.cldr41.DateTimePatterns_ga_GB);


/**
 * Extended set of localized date/time patterns for locale ga_IE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ga_IE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ga_IE : goog.i18n.cldr41.DateTimePatterns_ga_IE);


/**
 * Extended set of localized date/time patterns for locale gd.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gd = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gd : goog.i18n.cldr41.DateTimePatterns_gd);


/**
 * Extended set of localized date/time patterns for locale gd_GB.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gd_GB = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gd_GB : goog.i18n.cldr41.DateTimePatterns_gd_GB);


/**
 * Extended set of localized date/time patterns for locale gl_ES.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gl_ES = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gl_ES : goog.i18n.cldr41.DateTimePatterns_gl_ES);


/**
 * Extended set of localized date/time patterns for locale gsw_CH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gsw_CH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gsw_CH : goog.i18n.cldr41.DateTimePatterns_gsw_CH);


/**
 * Extended set of localized date/time patterns for locale gsw_FR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gsw_FR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gsw_FR : goog.i18n.cldr41.DateTimePatterns_gsw_FR);


/**
 * Extended set of localized date/time patterns for locale gsw_LI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gsw_LI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gsw_LI : goog.i18n.cldr41.DateTimePatterns_gsw_LI);


/**
 * Extended set of localized date/time patterns for locale gu_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gu_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gu_IN : goog.i18n.cldr41.DateTimePatterns_gu_IN);


/**
 * Extended set of localized date/time patterns for locale guz.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_guz = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_guz : goog.i18n.cldr41.DateTimePatterns_guz);


/**
 * Extended set of localized date/time patterns for locale guz_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_guz_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_guz_KE : goog.i18n.cldr41.DateTimePatterns_guz_KE);


/**
 * Extended set of localized date/time patterns for locale gv.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gv = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gv : goog.i18n.cldr41.DateTimePatterns_gv);


/**
 * Extended set of localized date/time patterns for locale gv_IM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_gv_IM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_gv_IM : goog.i18n.cldr41.DateTimePatterns_gv_IM);


/**
 * Extended set of localized date/time patterns for locale ha.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ha = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ha : goog.i18n.cldr41.DateTimePatterns_ha);


/**
 * Extended set of localized date/time patterns for locale ha_GH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ha_GH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ha_GH : goog.i18n.cldr41.DateTimePatterns_ha_GH);


/**
 * Extended set of localized date/time patterns for locale ha_NE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ha_NE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ha_NE : goog.i18n.cldr41.DateTimePatterns_ha_NE);


/**
 * Extended set of localized date/time patterns for locale ha_NG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ha_NG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ha_NG : goog.i18n.cldr41.DateTimePatterns_ha_NG);


/**
 * Extended set of localized date/time patterns for locale haw_US.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_haw_US = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_haw_US : goog.i18n.cldr41.DateTimePatterns_haw_US);


/**
 * Extended set of localized date/time patterns for locale he_IL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_he_IL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_he_IL : goog.i18n.cldr41.DateTimePatterns_he_IL);


/**
 * Extended set of localized date/time patterns for locale hi_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hi_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hi_IN : goog.i18n.cldr41.DateTimePatterns_hi_IN);


/**
 * Extended set of localized date/time patterns for locale hi_Latn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hi_Latn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hi_Latn : goog.i18n.cldr41.DateTimePatterns_hi_Latn);


/**
 * Extended set of localized date/time patterns for locale hi_Latn_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hi_Latn_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hi_Latn_IN : goog.i18n.cldr41.DateTimePatterns_hi_Latn_IN);


/**
 * Extended set of localized date/time patterns for locale hr_BA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hr_BA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hr_BA : goog.i18n.cldr41.DateTimePatterns_hr_BA);


/**
 * Extended set of localized date/time patterns for locale hr_HR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hr_HR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hr_HR : goog.i18n.cldr41.DateTimePatterns_hr_HR);


/**
 * Extended set of localized date/time patterns for locale hsb.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hsb = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hsb : goog.i18n.cldr41.DateTimePatterns_hsb);


/**
 * Extended set of localized date/time patterns for locale hsb_DE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hsb_DE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hsb_DE : goog.i18n.cldr41.DateTimePatterns_hsb_DE);


/**
 * Extended set of localized date/time patterns for locale hu_HU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hu_HU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hu_HU : goog.i18n.cldr41.DateTimePatterns_hu_HU);


/**
 * Extended set of localized date/time patterns for locale hy_AM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_hy_AM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_hy_AM : goog.i18n.cldr41.DateTimePatterns_hy_AM);


/**
 * Extended set of localized date/time patterns for locale ia.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ia = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ia : goog.i18n.cldr41.DateTimePatterns_ia);


/**
 * Extended set of localized date/time patterns for locale ia_001.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ia_001 = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ia_001 : goog.i18n.cldr41.DateTimePatterns_ia_001);


/**
 * Extended set of localized date/time patterns for locale id_ID.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_id_ID = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_id_ID : goog.i18n.cldr41.DateTimePatterns_id_ID);


/**
 * Extended set of localized date/time patterns for locale ig.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ig = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ig : goog.i18n.cldr41.DateTimePatterns_ig);


/**
 * Extended set of localized date/time patterns for locale ig_NG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ig_NG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ig_NG : goog.i18n.cldr41.DateTimePatterns_ig_NG);


/**
 * Extended set of localized date/time patterns for locale ii.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ii = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ii : goog.i18n.cldr41.DateTimePatterns_ii);


/**
 * Extended set of localized date/time patterns for locale ii_CN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ii_CN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ii_CN : goog.i18n.cldr41.DateTimePatterns_ii_CN);


/**
 * Extended set of localized date/time patterns for locale is_IS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_is_IS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_is_IS : goog.i18n.cldr41.DateTimePatterns_is_IS);


/**
 * Extended set of localized date/time patterns for locale it_CH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_it_CH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_it_CH : goog.i18n.cldr41.DateTimePatterns_it_CH);


/**
 * Extended set of localized date/time patterns for locale it_IT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_it_IT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_it_IT : goog.i18n.cldr41.DateTimePatterns_it_IT);


/**
 * Extended set of localized date/time patterns for locale it_SM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_it_SM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_it_SM : goog.i18n.cldr41.DateTimePatterns_it_SM);


/**
 * Extended set of localized date/time patterns for locale it_VA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_it_VA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_it_VA : goog.i18n.cldr41.DateTimePatterns_it_VA);


/**
 * Extended set of localized date/time patterns for locale ja_JP.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ja_JP = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ja_JP : goog.i18n.cldr41.DateTimePatterns_ja_JP);


/**
 * Extended set of localized date/time patterns for locale jgo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_jgo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_jgo : goog.i18n.cldr41.DateTimePatterns_jgo);


/**
 * Extended set of localized date/time patterns for locale jgo_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_jgo_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_jgo_CM : goog.i18n.cldr41.DateTimePatterns_jgo_CM);


/**
 * Extended set of localized date/time patterns for locale jmc.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_jmc = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_jmc : goog.i18n.cldr41.DateTimePatterns_jmc);


/**
 * Extended set of localized date/time patterns for locale jmc_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_jmc_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_jmc_TZ : goog.i18n.cldr41.DateTimePatterns_jmc_TZ);


/**
 * Extended set of localized date/time patterns for locale jv.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_jv = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_jv : goog.i18n.cldr41.DateTimePatterns_jv);


/**
 * Extended set of localized date/time patterns for locale jv_ID.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_jv_ID = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_jv_ID : goog.i18n.cldr41.DateTimePatterns_jv_ID);


/**
 * Extended set of localized date/time patterns for locale ka_GE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ka_GE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ka_GE : goog.i18n.cldr41.DateTimePatterns_ka_GE);


/**
 * Extended set of localized date/time patterns for locale kab.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kab = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kab : goog.i18n.cldr41.DateTimePatterns_kab);


/**
 * Extended set of localized date/time patterns for locale kab_DZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kab_DZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kab_DZ : goog.i18n.cldr41.DateTimePatterns_kab_DZ);


/**
 * Extended set of localized date/time patterns for locale kam.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kam = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kam : goog.i18n.cldr41.DateTimePatterns_kam);


/**
 * Extended set of localized date/time patterns for locale kam_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kam_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kam_KE : goog.i18n.cldr41.DateTimePatterns_kam_KE);


/**
 * Extended set of localized date/time patterns for locale kde.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kde = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kde : goog.i18n.cldr41.DateTimePatterns_kde);


/**
 * Extended set of localized date/time patterns for locale kde_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kde_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kde_TZ : goog.i18n.cldr41.DateTimePatterns_kde_TZ);


/**
 * Extended set of localized date/time patterns for locale kea.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kea = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kea : goog.i18n.cldr41.DateTimePatterns_kea);


/**
 * Extended set of localized date/time patterns for locale kea_CV.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kea_CV = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kea_CV : goog.i18n.cldr41.DateTimePatterns_kea_CV);


/**
 * Extended set of localized date/time patterns for locale kgp.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kgp = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kgp : goog.i18n.cldr41.DateTimePatterns_kgp);


/**
 * Extended set of localized date/time patterns for locale kgp_BR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kgp_BR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kgp_BR : goog.i18n.cldr41.DateTimePatterns_kgp_BR);


/**
 * Extended set of localized date/time patterns for locale khq.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_khq = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_khq : goog.i18n.cldr41.DateTimePatterns_khq);


/**
 * Extended set of localized date/time patterns for locale khq_ML.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_khq_ML = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_khq_ML : goog.i18n.cldr41.DateTimePatterns_khq_ML);


/**
 * Extended set of localized date/time patterns for locale ki.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ki = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ki : goog.i18n.cldr41.DateTimePatterns_ki);


/**
 * Extended set of localized date/time patterns for locale ki_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ki_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ki_KE : goog.i18n.cldr41.DateTimePatterns_ki_KE);


/**
 * Extended set of localized date/time patterns for locale kk_KZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kk_KZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kk_KZ : goog.i18n.cldr41.DateTimePatterns_kk_KZ);


/**
 * Extended set of localized date/time patterns for locale kkj.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kkj = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kkj : goog.i18n.cldr41.DateTimePatterns_kkj);


/**
 * Extended set of localized date/time patterns for locale kkj_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kkj_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kkj_CM : goog.i18n.cldr41.DateTimePatterns_kkj_CM);


/**
 * Extended set of localized date/time patterns for locale kl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kl : goog.i18n.cldr41.DateTimePatterns_kl);


/**
 * Extended set of localized date/time patterns for locale kl_GL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kl_GL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kl_GL : goog.i18n.cldr41.DateTimePatterns_kl_GL);


/**
 * Extended set of localized date/time patterns for locale kln.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kln = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kln : goog.i18n.cldr41.DateTimePatterns_kln);


/**
 * Extended set of localized date/time patterns for locale kln_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kln_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kln_KE : goog.i18n.cldr41.DateTimePatterns_kln_KE);


/**
 * Extended set of localized date/time patterns for locale km_KH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_km_KH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_km_KH : goog.i18n.cldr41.DateTimePatterns_km_KH);


/**
 * Extended set of localized date/time patterns for locale kn_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kn_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kn_IN : goog.i18n.cldr41.DateTimePatterns_kn_IN);


/**
 * Extended set of localized date/time patterns for locale ko_KP.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ko_KP = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ko_KP : goog.i18n.cldr41.DateTimePatterns_ko_KP);


/**
 * Extended set of localized date/time patterns for locale ko_KR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ko_KR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ko_KR : goog.i18n.cldr41.DateTimePatterns_ko_KR);


/**
 * Extended set of localized date/time patterns for locale kok.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kok = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kok : goog.i18n.cldr41.DateTimePatterns_kok);


/**
 * Extended set of localized date/time patterns for locale kok_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kok_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kok_IN : goog.i18n.cldr41.DateTimePatterns_kok_IN);


/**
 * Extended set of localized date/time patterns for locale ks.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ks = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ks : goog.i18n.cldr41.DateTimePatterns_ks);


/**
 * Extended set of localized date/time patterns for locale ks_Arab.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ks_Arab = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ks_Arab : goog.i18n.cldr41.DateTimePatterns_ks_Arab);


/**
 * Extended set of localized date/time patterns for locale ks_Arab_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ks_Arab_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ks_Arab_IN : goog.i18n.cldr41.DateTimePatterns_ks_Arab_IN);


/**
 * Extended set of localized date/time patterns for locale ks_Deva.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ks_Deva = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ks_Deva : goog.i18n.cldr41.DateTimePatterns_ks_Deva);


/**
 * Extended set of localized date/time patterns for locale ks_Deva_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ks_Deva_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ks_Deva_IN : goog.i18n.cldr41.DateTimePatterns_ks_Deva_IN);


/**
 * Extended set of localized date/time patterns for locale ksb.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ksb = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ksb : goog.i18n.cldr41.DateTimePatterns_ksb);


/**
 * Extended set of localized date/time patterns for locale ksb_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ksb_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ksb_TZ : goog.i18n.cldr41.DateTimePatterns_ksb_TZ);


/**
 * Extended set of localized date/time patterns for locale ksf.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ksf = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ksf : goog.i18n.cldr41.DateTimePatterns_ksf);


/**
 * Extended set of localized date/time patterns for locale ksf_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ksf_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ksf_CM : goog.i18n.cldr41.DateTimePatterns_ksf_CM);


/**
 * Extended set of localized date/time patterns for locale ksh.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ksh = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ksh : goog.i18n.cldr41.DateTimePatterns_ksh);


/**
 * Extended set of localized date/time patterns for locale ksh_DE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ksh_DE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ksh_DE : goog.i18n.cldr41.DateTimePatterns_ksh_DE);


/**
 * Extended set of localized date/time patterns for locale ku.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ku = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ku : goog.i18n.cldr41.DateTimePatterns_ku);


/**
 * Extended set of localized date/time patterns for locale ku_TR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ku_TR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ku_TR : goog.i18n.cldr41.DateTimePatterns_ku_TR);


/**
 * Extended set of localized date/time patterns for locale kw.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kw = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kw : goog.i18n.cldr41.DateTimePatterns_kw);


/**
 * Extended set of localized date/time patterns for locale kw_GB.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_kw_GB = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_kw_GB : goog.i18n.cldr41.DateTimePatterns_kw_GB);


/**
 * Extended set of localized date/time patterns for locale ky_KG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ky_KG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ky_KG : goog.i18n.cldr41.DateTimePatterns_ky_KG);


/**
 * Extended set of localized date/time patterns for locale lag.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lag = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lag : goog.i18n.cldr41.DateTimePatterns_lag);


/**
 * Extended set of localized date/time patterns for locale lag_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lag_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lag_TZ : goog.i18n.cldr41.DateTimePatterns_lag_TZ);


/**
 * Extended set of localized date/time patterns for locale lb.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lb = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lb : goog.i18n.cldr41.DateTimePatterns_lb);


/**
 * Extended set of localized date/time patterns for locale lb_LU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lb_LU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lb_LU : goog.i18n.cldr41.DateTimePatterns_lb_LU);


/**
 * Extended set of localized date/time patterns for locale lg.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lg = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lg : goog.i18n.cldr41.DateTimePatterns_lg);


/**
 * Extended set of localized date/time patterns for locale lg_UG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lg_UG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lg_UG : goog.i18n.cldr41.DateTimePatterns_lg_UG);


/**
 * Extended set of localized date/time patterns for locale lkt.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lkt = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lkt : goog.i18n.cldr41.DateTimePatterns_lkt);


/**
 * Extended set of localized date/time patterns for locale lkt_US.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lkt_US = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lkt_US : goog.i18n.cldr41.DateTimePatterns_lkt_US);


/**
 * Extended set of localized date/time patterns for locale ln_AO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ln_AO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ln_AO : goog.i18n.cldr41.DateTimePatterns_ln_AO);


/**
 * Extended set of localized date/time patterns for locale ln_CD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ln_CD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ln_CD : goog.i18n.cldr41.DateTimePatterns_ln_CD);


/**
 * Extended set of localized date/time patterns for locale ln_CF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ln_CF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ln_CF : goog.i18n.cldr41.DateTimePatterns_ln_CF);


/**
 * Extended set of localized date/time patterns for locale ln_CG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ln_CG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ln_CG : goog.i18n.cldr41.DateTimePatterns_ln_CG);


/**
 * Extended set of localized date/time patterns for locale lo_LA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lo_LA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lo_LA : goog.i18n.cldr41.DateTimePatterns_lo_LA);


/**
 * Extended set of localized date/time patterns for locale lrc.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lrc = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lrc : goog.i18n.cldr41.DateTimePatterns_lrc);


/**
 * Extended set of localized date/time patterns for locale lrc_IQ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lrc_IQ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lrc_IQ : goog.i18n.cldr41.DateTimePatterns_lrc_IQ);


/**
 * Extended set of localized date/time patterns for locale lrc_IR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lrc_IR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lrc_IR : goog.i18n.cldr41.DateTimePatterns_lrc_IR);


/**
 * Extended set of localized date/time patterns for locale lt_LT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lt_LT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lt_LT : goog.i18n.cldr41.DateTimePatterns_lt_LT);


/**
 * Extended set of localized date/time patterns for locale lu.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lu = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lu : goog.i18n.cldr41.DateTimePatterns_lu);


/**
 * Extended set of localized date/time patterns for locale lu_CD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lu_CD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lu_CD : goog.i18n.cldr41.DateTimePatterns_lu_CD);


/**
 * Extended set of localized date/time patterns for locale luo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_luo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_luo : goog.i18n.cldr41.DateTimePatterns_luo);


/**
 * Extended set of localized date/time patterns for locale luo_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_luo_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_luo_KE : goog.i18n.cldr41.DateTimePatterns_luo_KE);


/**
 * Extended set of localized date/time patterns for locale luy.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_luy = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_luy : goog.i18n.cldr41.DateTimePatterns_luy);


/**
 * Extended set of localized date/time patterns for locale luy_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_luy_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_luy_KE : goog.i18n.cldr41.DateTimePatterns_luy_KE);


/**
 * Extended set of localized date/time patterns for locale lv_LV.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_lv_LV = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_lv_LV : goog.i18n.cldr41.DateTimePatterns_lv_LV);


/**
 * Extended set of localized date/time patterns for locale mai.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mai = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mai : goog.i18n.cldr41.DateTimePatterns_mai);


/**
 * Extended set of localized date/time patterns for locale mai_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mai_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mai_IN : goog.i18n.cldr41.DateTimePatterns_mai_IN);


/**
 * Extended set of localized date/time patterns for locale mas.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mas = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mas : goog.i18n.cldr41.DateTimePatterns_mas);


/**
 * Extended set of localized date/time patterns for locale mas_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mas_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mas_KE : goog.i18n.cldr41.DateTimePatterns_mas_KE);


/**
 * Extended set of localized date/time patterns for locale mas_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mas_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mas_TZ : goog.i18n.cldr41.DateTimePatterns_mas_TZ);


/**
 * Extended set of localized date/time patterns for locale mer.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mer = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mer : goog.i18n.cldr41.DateTimePatterns_mer);


/**
 * Extended set of localized date/time patterns for locale mer_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mer_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mer_KE : goog.i18n.cldr41.DateTimePatterns_mer_KE);


/**
 * Extended set of localized date/time patterns for locale mfe.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mfe = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mfe : goog.i18n.cldr41.DateTimePatterns_mfe);


/**
 * Extended set of localized date/time patterns for locale mfe_MU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mfe_MU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mfe_MU : goog.i18n.cldr41.DateTimePatterns_mfe_MU);


/**
 * Extended set of localized date/time patterns for locale mg.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mg = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mg : goog.i18n.cldr41.DateTimePatterns_mg);


/**
 * Extended set of localized date/time patterns for locale mg_MG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mg_MG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mg_MG : goog.i18n.cldr41.DateTimePatterns_mg_MG);


/**
 * Extended set of localized date/time patterns for locale mgh.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mgh = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mgh : goog.i18n.cldr41.DateTimePatterns_mgh);


/**
 * Extended set of localized date/time patterns for locale mgh_MZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mgh_MZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mgh_MZ : goog.i18n.cldr41.DateTimePatterns_mgh_MZ);


/**
 * Extended set of localized date/time patterns for locale mgo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mgo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mgo : goog.i18n.cldr41.DateTimePatterns_mgo);


/**
 * Extended set of localized date/time patterns for locale mgo_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mgo_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mgo_CM : goog.i18n.cldr41.DateTimePatterns_mgo_CM);


/**
 * Extended set of localized date/time patterns for locale mi.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mi = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mi : goog.i18n.cldr41.DateTimePatterns_mi);


/**
 * Extended set of localized date/time patterns for locale mi_NZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mi_NZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mi_NZ : goog.i18n.cldr41.DateTimePatterns_mi_NZ);


/**
 * Extended set of localized date/time patterns for locale mk_MK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mk_MK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mk_MK : goog.i18n.cldr41.DateTimePatterns_mk_MK);


/**
 * Extended set of localized date/time patterns for locale ml_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ml_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ml_IN : goog.i18n.cldr41.DateTimePatterns_ml_IN);


/**
 * Extended set of localized date/time patterns for locale mn_MN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mn_MN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mn_MN : goog.i18n.cldr41.DateTimePatterns_mn_MN);


/**
 * Extended set of localized date/time patterns for locale mni.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mni = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mni : goog.i18n.cldr41.DateTimePatterns_mni);


/**
 * Extended set of localized date/time patterns for locale mni_Beng.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mni_Beng = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mni_Beng : goog.i18n.cldr41.DateTimePatterns_mni_Beng);


/**
 * Extended set of localized date/time patterns for locale mni_Beng_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mni_Beng_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mni_Beng_IN : goog.i18n.cldr41.DateTimePatterns_mni_Beng_IN);


/**
 * Extended set of localized date/time patterns for locale mr_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mr_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mr_IN : goog.i18n.cldr41.DateTimePatterns_mr_IN);


/**
 * Extended set of localized date/time patterns for locale ms_BN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ms_BN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ms_BN : goog.i18n.cldr41.DateTimePatterns_ms_BN);


/**
 * Extended set of localized date/time patterns for locale ms_ID.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ms_ID = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ms_ID : goog.i18n.cldr41.DateTimePatterns_ms_ID);


/**
 * Extended set of localized date/time patterns for locale ms_MY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ms_MY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ms_MY : goog.i18n.cldr41.DateTimePatterns_ms_MY);


/**
 * Extended set of localized date/time patterns for locale ms_SG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ms_SG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ms_SG : goog.i18n.cldr41.DateTimePatterns_ms_SG);


/**
 * Extended set of localized date/time patterns for locale mt_MT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mt_MT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mt_MT : goog.i18n.cldr41.DateTimePatterns_mt_MT);


/**
 * Extended set of localized date/time patterns for locale mua.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mua = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mua : goog.i18n.cldr41.DateTimePatterns_mua);


/**
 * Extended set of localized date/time patterns for locale mua_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mua_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mua_CM : goog.i18n.cldr41.DateTimePatterns_mua_CM);


/**
 * Extended set of localized date/time patterns for locale my_MM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_my_MM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_my_MM : goog.i18n.cldr41.DateTimePatterns_my_MM);


/**
 * Extended set of localized date/time patterns for locale mzn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mzn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mzn : goog.i18n.cldr41.DateTimePatterns_mzn);


/**
 * Extended set of localized date/time patterns for locale mzn_IR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_mzn_IR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_mzn_IR : goog.i18n.cldr41.DateTimePatterns_mzn_IR);


/**
 * Extended set of localized date/time patterns for locale naq.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_naq = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_naq : goog.i18n.cldr41.DateTimePatterns_naq);


/**
 * Extended set of localized date/time patterns for locale naq_NA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_naq_NA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_naq_NA : goog.i18n.cldr41.DateTimePatterns_naq_NA);


/**
 * Extended set of localized date/time patterns for locale nb_NO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nb_NO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nb_NO : goog.i18n.cldr41.DateTimePatterns_nb_NO);


/**
 * Extended set of localized date/time patterns for locale nb_SJ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nb_SJ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nb_SJ : goog.i18n.cldr41.DateTimePatterns_nb_SJ);


/**
 * Extended set of localized date/time patterns for locale nd.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nd = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nd : goog.i18n.cldr41.DateTimePatterns_nd);


/**
 * Extended set of localized date/time patterns for locale nd_ZW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nd_ZW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nd_ZW : goog.i18n.cldr41.DateTimePatterns_nd_ZW);


/**
 * Extended set of localized date/time patterns for locale ne_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ne_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ne_IN : goog.i18n.cldr41.DateTimePatterns_ne_IN);


/**
 * Extended set of localized date/time patterns for locale ne_NP.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ne_NP = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ne_NP : goog.i18n.cldr41.DateTimePatterns_ne_NP);


/**
 * Extended set of localized date/time patterns for locale nl_AW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nl_AW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nl_AW : goog.i18n.cldr41.DateTimePatterns_nl_AW);


/**
 * Extended set of localized date/time patterns for locale nl_BE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nl_BE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nl_BE : goog.i18n.cldr41.DateTimePatterns_nl_BE);


/**
 * Extended set of localized date/time patterns for locale nl_BQ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nl_BQ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nl_BQ : goog.i18n.cldr41.DateTimePatterns_nl_BQ);


/**
 * Extended set of localized date/time patterns for locale nl_CW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nl_CW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nl_CW : goog.i18n.cldr41.DateTimePatterns_nl_CW);


/**
 * Extended set of localized date/time patterns for locale nl_NL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nl_NL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nl_NL : goog.i18n.cldr41.DateTimePatterns_nl_NL);


/**
 * Extended set of localized date/time patterns for locale nl_SR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nl_SR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nl_SR : goog.i18n.cldr41.DateTimePatterns_nl_SR);


/**
 * Extended set of localized date/time patterns for locale nl_SX.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nl_SX = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nl_SX : goog.i18n.cldr41.DateTimePatterns_nl_SX);


/**
 * Extended set of localized date/time patterns for locale nmg.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nmg = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nmg : goog.i18n.cldr41.DateTimePatterns_nmg);


/**
 * Extended set of localized date/time patterns for locale nmg_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nmg_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nmg_CM : goog.i18n.cldr41.DateTimePatterns_nmg_CM);


/**
 * Extended set of localized date/time patterns for locale nn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nn : goog.i18n.cldr41.DateTimePatterns_nn);


/**
 * Extended set of localized date/time patterns for locale nn_NO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nn_NO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nn_NO : goog.i18n.cldr41.DateTimePatterns_nn_NO);


/**
 * Extended set of localized date/time patterns for locale nnh.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nnh = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nnh : goog.i18n.cldr41.DateTimePatterns_nnh);


/**
 * Extended set of localized date/time patterns for locale nnh_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nnh_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nnh_CM : goog.i18n.cldr41.DateTimePatterns_nnh_CM);


/**
 * Extended set of localized date/time patterns for locale nus.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nus = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nus : goog.i18n.cldr41.DateTimePatterns_nus);


/**
 * Extended set of localized date/time patterns for locale nus_SS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nus_SS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nus_SS : goog.i18n.cldr41.DateTimePatterns_nus_SS);


/**
 * Extended set of localized date/time patterns for locale nyn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nyn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nyn : goog.i18n.cldr41.DateTimePatterns_nyn);


/**
 * Extended set of localized date/time patterns for locale nyn_UG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_nyn_UG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_nyn_UG : goog.i18n.cldr41.DateTimePatterns_nyn_UG);


/**
 * Extended set of localized date/time patterns for locale om.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_om = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_om : goog.i18n.cldr41.DateTimePatterns_om);


/**
 * Extended set of localized date/time patterns for locale om_ET.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_om_ET = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_om_ET : goog.i18n.cldr41.DateTimePatterns_om_ET);


/**
 * Extended set of localized date/time patterns for locale om_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_om_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_om_KE : goog.i18n.cldr41.DateTimePatterns_om_KE);


/**
 * Extended set of localized date/time patterns for locale or_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_or_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_or_IN : goog.i18n.cldr41.DateTimePatterns_or_IN);


/**
 * Extended set of localized date/time patterns for locale os.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_os = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_os : goog.i18n.cldr41.DateTimePatterns_os);


/**
 * Extended set of localized date/time patterns for locale os_GE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_os_GE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_os_GE : goog.i18n.cldr41.DateTimePatterns_os_GE);


/**
 * Extended set of localized date/time patterns for locale os_RU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_os_RU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_os_RU : goog.i18n.cldr41.DateTimePatterns_os_RU);


/**
 * Extended set of localized date/time patterns for locale pa_Arab.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pa_Arab = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pa_Arab : goog.i18n.cldr41.DateTimePatterns_pa_Arab);


/**
 * Extended set of localized date/time patterns for locale pa_Arab_PK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pa_Arab_PK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pa_Arab_PK : goog.i18n.cldr41.DateTimePatterns_pa_Arab_PK);


/**
 * Extended set of localized date/time patterns for locale pa_Guru.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pa_Guru = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pa_Guru : goog.i18n.cldr41.DateTimePatterns_pa_Guru);


/**
 * Extended set of localized date/time patterns for locale pa_Guru_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pa_Guru_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pa_Guru_IN : goog.i18n.cldr41.DateTimePatterns_pa_Guru_IN);


/**
 * Extended set of localized date/time patterns for locale pcm.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pcm = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pcm : goog.i18n.cldr41.DateTimePatterns_pcm);


/**
 * Extended set of localized date/time patterns for locale pcm_NG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pcm_NG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pcm_NG : goog.i18n.cldr41.DateTimePatterns_pcm_NG);


/**
 * Extended set of localized date/time patterns for locale pl_PL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pl_PL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pl_PL : goog.i18n.cldr41.DateTimePatterns_pl_PL);


/**
 * Extended set of localized date/time patterns for locale ps.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ps = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ps : goog.i18n.cldr41.DateTimePatterns_ps);


/**
 * Extended set of localized date/time patterns for locale ps_AF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ps_AF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ps_AF : goog.i18n.cldr41.DateTimePatterns_ps_AF);


/**
 * Extended set of localized date/time patterns for locale ps_PK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ps_PK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ps_PK : goog.i18n.cldr41.DateTimePatterns_ps_PK);


/**
 * Extended set of localized date/time patterns for locale pt_AO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_AO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_AO : goog.i18n.cldr41.DateTimePatterns_pt_AO);


/**
 * Extended set of localized date/time patterns for locale pt_CH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_CH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_CH : goog.i18n.cldr41.DateTimePatterns_pt_CH);


/**
 * Extended set of localized date/time patterns for locale pt_CV.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_CV = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_CV : goog.i18n.cldr41.DateTimePatterns_pt_CV);


/**
 * Extended set of localized date/time patterns for locale pt_GQ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_GQ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_GQ : goog.i18n.cldr41.DateTimePatterns_pt_GQ);


/**
 * Extended set of localized date/time patterns for locale pt_GW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_GW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_GW : goog.i18n.cldr41.DateTimePatterns_pt_GW);


/**
 * Extended set of localized date/time patterns for locale pt_LU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_LU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_LU : goog.i18n.cldr41.DateTimePatterns_pt_LU);


/**
 * Extended set of localized date/time patterns for locale pt_MO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_MO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_MO : goog.i18n.cldr41.DateTimePatterns_pt_MO);


/**
 * Extended set of localized date/time patterns for locale pt_MZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_MZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_MZ : goog.i18n.cldr41.DateTimePatterns_pt_MZ);


/**
 * Extended set of localized date/time patterns for locale pt_ST.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_ST = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_ST : goog.i18n.cldr41.DateTimePatterns_pt_ST);


/**
 * Extended set of localized date/time patterns for locale pt_TL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_pt_TL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_pt_TL : goog.i18n.cldr41.DateTimePatterns_pt_TL);


/**
 * Extended set of localized date/time patterns for locale qu.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_qu = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_qu : goog.i18n.cldr41.DateTimePatterns_qu);


/**
 * Extended set of localized date/time patterns for locale qu_BO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_qu_BO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_qu_BO : goog.i18n.cldr41.DateTimePatterns_qu_BO);


/**
 * Extended set of localized date/time patterns for locale qu_EC.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_qu_EC = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_qu_EC : goog.i18n.cldr41.DateTimePatterns_qu_EC);


/**
 * Extended set of localized date/time patterns for locale qu_PE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_qu_PE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_qu_PE : goog.i18n.cldr41.DateTimePatterns_qu_PE);


/**
 * Extended set of localized date/time patterns for locale raj.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_raj = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_raj : goog.i18n.cldr41.DateTimePatterns);


/**
 * Extended set of localized date/time patterns for locale raj_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_raj_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_raj_IN : goog.i18n.cldr41.DateTimePatterns);


/**
 * Extended set of localized date/time patterns for locale rm.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rm = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rm : goog.i18n.cldr41.DateTimePatterns_rm);


/**
 * Extended set of localized date/time patterns for locale rm_CH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rm_CH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rm_CH : goog.i18n.cldr41.DateTimePatterns_rm_CH);


/**
 * Extended set of localized date/time patterns for locale rn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rn : goog.i18n.cldr41.DateTimePatterns_rn);


/**
 * Extended set of localized date/time patterns for locale rn_BI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rn_BI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rn_BI : goog.i18n.cldr41.DateTimePatterns_rn_BI);


/**
 * Extended set of localized date/time patterns for locale ro_MD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ro_MD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ro_MD : goog.i18n.cldr41.DateTimePatterns_ro_MD);


/**
 * Extended set of localized date/time patterns for locale ro_RO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ro_RO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ro_RO : goog.i18n.cldr41.DateTimePatterns_ro_RO);


/**
 * Extended set of localized date/time patterns for locale rof.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rof = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rof : goog.i18n.cldr41.DateTimePatterns_rof);


/**
 * Extended set of localized date/time patterns for locale rof_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rof_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rof_TZ : goog.i18n.cldr41.DateTimePatterns_rof_TZ);


/**
 * Extended set of localized date/time patterns for locale ru_BY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ru_BY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ru_BY : goog.i18n.cldr41.DateTimePatterns_ru_BY);


/**
 * Extended set of localized date/time patterns for locale ru_KG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ru_KG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ru_KG : goog.i18n.cldr41.DateTimePatterns_ru_KG);


/**
 * Extended set of localized date/time patterns for locale ru_KZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ru_KZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ru_KZ : goog.i18n.cldr41.DateTimePatterns_ru_KZ);


/**
 * Extended set of localized date/time patterns for locale ru_MD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ru_MD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ru_MD : goog.i18n.cldr41.DateTimePatterns_ru_MD);


/**
 * Extended set of localized date/time patterns for locale ru_RU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ru_RU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ru_RU : goog.i18n.cldr41.DateTimePatterns_ru_RU);


/**
 * Extended set of localized date/time patterns for locale ru_UA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ru_UA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ru_UA : goog.i18n.cldr41.DateTimePatterns_ru_UA);


/**
 * Extended set of localized date/time patterns for locale rw.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rw = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rw : goog.i18n.cldr41.DateTimePatterns_rw);


/**
 * Extended set of localized date/time patterns for locale rw_RW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rw_RW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rw_RW : goog.i18n.cldr41.DateTimePatterns_rw_RW);


/**
 * Extended set of localized date/time patterns for locale rwk.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rwk = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rwk : goog.i18n.cldr41.DateTimePatterns_rwk);


/**
 * Extended set of localized date/time patterns for locale rwk_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_rwk_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_rwk_TZ : goog.i18n.cldr41.DateTimePatterns_rwk_TZ);


/**
 * Extended set of localized date/time patterns for locale sa.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sa = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sa : goog.i18n.cldr41.DateTimePatterns_sa);


/**
 * Extended set of localized date/time patterns for locale sa_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sa_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sa_IN : goog.i18n.cldr41.DateTimePatterns_sa_IN);


/**
 * Extended set of localized date/time patterns for locale sah.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sah = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sah : goog.i18n.cldr41.DateTimePatterns_sah);


/**
 * Extended set of localized date/time patterns for locale sah_RU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sah_RU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sah_RU : goog.i18n.cldr41.DateTimePatterns_sah_RU);


/**
 * Extended set of localized date/time patterns for locale saq.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_saq = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_saq : goog.i18n.cldr41.DateTimePatterns_saq);


/**
 * Extended set of localized date/time patterns for locale saq_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_saq_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_saq_KE : goog.i18n.cldr41.DateTimePatterns_saq_KE);


/**
 * Extended set of localized date/time patterns for locale sat.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sat = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sat : goog.i18n.cldr41.DateTimePatterns_sat);


/**
 * Extended set of localized date/time patterns for locale sat_Olck.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sat_Olck = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sat_Olck : goog.i18n.cldr41.DateTimePatterns_sat_Olck);


/**
 * Extended set of localized date/time patterns for locale sat_Olck_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sat_Olck_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sat_Olck_IN : goog.i18n.cldr41.DateTimePatterns_sat_Olck_IN);


/**
 * Extended set of localized date/time patterns for locale sbp.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sbp = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sbp : goog.i18n.cldr41.DateTimePatterns_sbp);


/**
 * Extended set of localized date/time patterns for locale sbp_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sbp_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sbp_TZ : goog.i18n.cldr41.DateTimePatterns_sbp_TZ);


/**
 * Extended set of localized date/time patterns for locale sc.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sc = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sc : goog.i18n.cldr41.DateTimePatterns_sc);


/**
 * Extended set of localized date/time patterns for locale sc_IT.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sc_IT = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sc_IT : goog.i18n.cldr41.DateTimePatterns_sc_IT);


/**
 * Extended set of localized date/time patterns for locale sd.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sd = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sd : goog.i18n.cldr41.DateTimePatterns_sd);


/**
 * Extended set of localized date/time patterns for locale sd_Arab.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sd_Arab = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sd_Arab : goog.i18n.cldr41.DateTimePatterns_sd_Arab);


/**
 * Extended set of localized date/time patterns for locale sd_Arab_PK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sd_Arab_PK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sd_Arab_PK : goog.i18n.cldr41.DateTimePatterns_sd_Arab_PK);


/**
 * Extended set of localized date/time patterns for locale sd_Deva.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sd_Deva = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sd_Deva : goog.i18n.cldr41.DateTimePatterns_sd_Deva);


/**
 * Extended set of localized date/time patterns for locale sd_Deva_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sd_Deva_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sd_Deva_IN : goog.i18n.cldr41.DateTimePatterns_sd_Deva_IN);


/**
 * Extended set of localized date/time patterns for locale se.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_se = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_se : goog.i18n.cldr41.DateTimePatterns_se);


/**
 * Extended set of localized date/time patterns for locale se_FI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_se_FI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_se_FI : goog.i18n.cldr41.DateTimePatterns_se_FI);


/**
 * Extended set of localized date/time patterns for locale se_NO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_se_NO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_se_NO : goog.i18n.cldr41.DateTimePatterns_se_NO);


/**
 * Extended set of localized date/time patterns for locale se_SE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_se_SE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_se_SE : goog.i18n.cldr41.DateTimePatterns_se_SE);


/**
 * Extended set of localized date/time patterns for locale seh.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_seh = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_seh : goog.i18n.cldr41.DateTimePatterns_seh);


/**
 * Extended set of localized date/time patterns for locale seh_MZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_seh_MZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_seh_MZ : goog.i18n.cldr41.DateTimePatterns_seh_MZ);


/**
 * Extended set of localized date/time patterns for locale ses.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ses = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ses : goog.i18n.cldr41.DateTimePatterns_ses);


/**
 * Extended set of localized date/time patterns for locale ses_ML.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ses_ML = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ses_ML : goog.i18n.cldr41.DateTimePatterns_ses_ML);


/**
 * Extended set of localized date/time patterns for locale sg.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sg = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sg : goog.i18n.cldr41.DateTimePatterns_sg);


/**
 * Extended set of localized date/time patterns for locale sg_CF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sg_CF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sg_CF : goog.i18n.cldr41.DateTimePatterns_sg_CF);


/**
 * Extended set of localized date/time patterns for locale shi.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_shi = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_shi : goog.i18n.cldr41.DateTimePatterns_shi);


/**
 * Extended set of localized date/time patterns for locale shi_Latn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_shi_Latn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_shi_Latn : goog.i18n.cldr41.DateTimePatterns_shi_Latn);


/**
 * Extended set of localized date/time patterns for locale shi_Latn_MA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_shi_Latn_MA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_shi_Latn_MA : goog.i18n.cldr41.DateTimePatterns_shi_Latn_MA);


/**
 * Extended set of localized date/time patterns for locale shi_Tfng.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_shi_Tfng = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_shi_Tfng : goog.i18n.cldr41.DateTimePatterns_shi_Tfng);


/**
 * Extended set of localized date/time patterns for locale shi_Tfng_MA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_shi_Tfng_MA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_shi_Tfng_MA : goog.i18n.cldr41.DateTimePatterns_shi_Tfng_MA);


/**
 * Extended set of localized date/time patterns for locale si_LK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_si_LK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_si_LK : goog.i18n.cldr41.DateTimePatterns_si_LK);


/**
 * Extended set of localized date/time patterns for locale sk_SK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sk_SK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sk_SK : goog.i18n.cldr41.DateTimePatterns_sk_SK);


/**
 * Extended set of localized date/time patterns for locale sl_SI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sl_SI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sl_SI : goog.i18n.cldr41.DateTimePatterns_sl_SI);


/**
 * Extended set of localized date/time patterns for locale smn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_smn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_smn : goog.i18n.cldr41.DateTimePatterns_smn);


/**
 * Extended set of localized date/time patterns for locale smn_FI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_smn_FI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_smn_FI : goog.i18n.cldr41.DateTimePatterns_smn_FI);


/**
 * Extended set of localized date/time patterns for locale sn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sn : goog.i18n.cldr41.DateTimePatterns_sn);


/**
 * Extended set of localized date/time patterns for locale sn_ZW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sn_ZW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sn_ZW : goog.i18n.cldr41.DateTimePatterns_sn_ZW);


/**
 * Extended set of localized date/time patterns for locale so.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_so = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_so : goog.i18n.cldr41.DateTimePatterns_so);


/**
 * Extended set of localized date/time patterns for locale so_DJ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_so_DJ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_so_DJ : goog.i18n.cldr41.DateTimePatterns_so_DJ);


/**
 * Extended set of localized date/time patterns for locale so_ET.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_so_ET = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_so_ET : goog.i18n.cldr41.DateTimePatterns_so_ET);


/**
 * Extended set of localized date/time patterns for locale so_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_so_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_so_KE : goog.i18n.cldr41.DateTimePatterns_so_KE);


/**
 * Extended set of localized date/time patterns for locale so_SO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_so_SO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_so_SO : goog.i18n.cldr41.DateTimePatterns_so_SO);


/**
 * Extended set of localized date/time patterns for locale sq_AL.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sq_AL = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sq_AL : goog.i18n.cldr41.DateTimePatterns_sq_AL);


/**
 * Extended set of localized date/time patterns for locale sq_MK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sq_MK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sq_MK : goog.i18n.cldr41.DateTimePatterns_sq_MK);


/**
 * Extended set of localized date/time patterns for locale sq_XK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sq_XK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sq_XK : goog.i18n.cldr41.DateTimePatterns_sq_XK);


/**
 * Extended set of localized date/time patterns for locale sr_Cyrl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Cyrl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Cyrl : goog.i18n.cldr41.DateTimePatterns_sr_Cyrl);


/**
 * Extended set of localized date/time patterns for locale sr_Cyrl_BA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Cyrl_BA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Cyrl_BA : goog.i18n.cldr41.DateTimePatterns_sr_Cyrl_BA);


/**
 * Extended set of localized date/time patterns for locale sr_Cyrl_ME.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Cyrl_ME = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Cyrl_ME : goog.i18n.cldr41.DateTimePatterns_sr_Cyrl_ME);


/**
 * Extended set of localized date/time patterns for locale sr_Cyrl_RS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Cyrl_RS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Cyrl_RS : goog.i18n.cldr41.DateTimePatterns_sr_Cyrl_RS);


/**
 * Extended set of localized date/time patterns for locale sr_Cyrl_XK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Cyrl_XK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Cyrl_XK : goog.i18n.cldr41.DateTimePatterns_sr_Cyrl_XK);


/**
 * Extended set of localized date/time patterns for locale sr_Latn_BA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Latn_BA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Latn_BA : goog.i18n.cldr41.DateTimePatterns_sr_Latn_BA);


/**
 * Extended set of localized date/time patterns for locale sr_Latn_ME.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Latn_ME = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Latn_ME : goog.i18n.cldr41.DateTimePatterns_sr_Latn_ME);


/**
 * Extended set of localized date/time patterns for locale sr_Latn_RS.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Latn_RS = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Latn_RS : goog.i18n.cldr41.DateTimePatterns_sr_Latn_RS);


/**
 * Extended set of localized date/time patterns for locale sr_Latn_XK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sr_Latn_XK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sr_Latn_XK : goog.i18n.cldr41.DateTimePatterns_sr_Latn_XK);


/**
 * Extended set of localized date/time patterns for locale su.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_su = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_su : goog.i18n.cldr41.DateTimePatterns_su);


/**
 * Extended set of localized date/time patterns for locale su_Latn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_su_Latn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_su_Latn : goog.i18n.cldr41.DateTimePatterns_su_Latn);


/**
 * Extended set of localized date/time patterns for locale su_Latn_ID.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_su_Latn_ID = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_su_Latn_ID : goog.i18n.cldr41.DateTimePatterns_su_Latn_ID);


/**
 * Extended set of localized date/time patterns for locale sv_AX.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sv_AX = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sv_AX : goog.i18n.cldr41.DateTimePatterns_sv_AX);


/**
 * Extended set of localized date/time patterns for locale sv_FI.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sv_FI = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sv_FI : goog.i18n.cldr41.DateTimePatterns_sv_FI);


/**
 * Extended set of localized date/time patterns for locale sv_SE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sv_SE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sv_SE : goog.i18n.cldr41.DateTimePatterns_sv_SE);


/**
 * Extended set of localized date/time patterns for locale sw_CD.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sw_CD = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sw_CD : goog.i18n.cldr41.DateTimePatterns_sw_CD);


/**
 * Extended set of localized date/time patterns for locale sw_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sw_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sw_KE : goog.i18n.cldr41.DateTimePatterns_sw_KE);


/**
 * Extended set of localized date/time patterns for locale sw_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sw_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sw_TZ : goog.i18n.cldr41.DateTimePatterns_sw_TZ);


/**
 * Extended set of localized date/time patterns for locale sw_UG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_sw_UG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_sw_UG : goog.i18n.cldr41.DateTimePatterns_sw_UG);


/**
 * Extended set of localized date/time patterns for locale ta_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ta_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ta_IN : goog.i18n.cldr41.DateTimePatterns_ta_IN);


/**
 * Extended set of localized date/time patterns for locale ta_LK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ta_LK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ta_LK : goog.i18n.cldr41.DateTimePatterns_ta_LK);


/**
 * Extended set of localized date/time patterns for locale ta_MY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ta_MY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ta_MY : goog.i18n.cldr41.DateTimePatterns_ta_MY);


/**
 * Extended set of localized date/time patterns for locale ta_SG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ta_SG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ta_SG : goog.i18n.cldr41.DateTimePatterns_ta_SG);


/**
 * Extended set of localized date/time patterns for locale te_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_te_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_te_IN : goog.i18n.cldr41.DateTimePatterns_te_IN);


/**
 * Extended set of localized date/time patterns for locale teo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_teo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_teo : goog.i18n.cldr41.DateTimePatterns_teo);


/**
 * Extended set of localized date/time patterns for locale teo_KE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_teo_KE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_teo_KE : goog.i18n.cldr41.DateTimePatterns_teo_KE);


/**
 * Extended set of localized date/time patterns for locale teo_UG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_teo_UG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_teo_UG : goog.i18n.cldr41.DateTimePatterns_teo_UG);


/**
 * Extended set of localized date/time patterns for locale tg.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tg = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tg : goog.i18n.cldr41.DateTimePatterns_tg);


/**
 * Extended set of localized date/time patterns for locale tg_TJ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tg_TJ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tg_TJ : goog.i18n.cldr41.DateTimePatterns_tg_TJ);


/**
 * Extended set of localized date/time patterns for locale th_TH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_th_TH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_th_TH : goog.i18n.cldr41.DateTimePatterns_th_TH);


/**
 * Extended set of localized date/time patterns for locale ti.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ti = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ti : goog.i18n.cldr41.DateTimePatterns_ti);


/**
 * Extended set of localized date/time patterns for locale ti_ER.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ti_ER = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ti_ER : goog.i18n.cldr41.DateTimePatterns_ti_ER);


/**
 * Extended set of localized date/time patterns for locale ti_ET.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ti_ET = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ti_ET : goog.i18n.cldr41.DateTimePatterns_ti_ET);


/**
 * Extended set of localized date/time patterns for locale tk.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tk = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tk : goog.i18n.cldr41.DateTimePatterns_tk);


/**
 * Extended set of localized date/time patterns for locale tk_TM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tk_TM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tk_TM : goog.i18n.cldr41.DateTimePatterns_tk_TM);


/**
 * Extended set of localized date/time patterns for locale to.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_to = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_to : goog.i18n.cldr41.DateTimePatterns_to);


/**
 * Extended set of localized date/time patterns for locale to_TO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_to_TO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_to_TO : goog.i18n.cldr41.DateTimePatterns_to_TO);


/**
 * Extended set of localized date/time patterns for locale tr_CY.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tr_CY = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tr_CY : goog.i18n.cldr41.DateTimePatterns_tr_CY);


/**
 * Extended set of localized date/time patterns for locale tr_TR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tr_TR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tr_TR : goog.i18n.cldr41.DateTimePatterns_tr_TR);


/**
 * Extended set of localized date/time patterns for locale tt.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tt = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tt : goog.i18n.cldr41.DateTimePatterns_tt);


/**
 * Extended set of localized date/time patterns for locale tt_RU.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tt_RU = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tt_RU : goog.i18n.cldr41.DateTimePatterns_tt_RU);


/**
 * Extended set of localized date/time patterns for locale twq.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_twq = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_twq : goog.i18n.cldr41.DateTimePatterns_twq);


/**
 * Extended set of localized date/time patterns for locale twq_NE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_twq_NE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_twq_NE : goog.i18n.cldr41.DateTimePatterns_twq_NE);


/**
 * Extended set of localized date/time patterns for locale tzm.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tzm = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tzm : goog.i18n.cldr41.DateTimePatterns_tzm);


/**
 * Extended set of localized date/time patterns for locale tzm_MA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_tzm_MA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_tzm_MA : goog.i18n.cldr41.DateTimePatterns_tzm_MA);


/**
 * Extended set of localized date/time patterns for locale ug.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ug = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ug : goog.i18n.cldr41.DateTimePatterns_ug);


/**
 * Extended set of localized date/time patterns for locale ug_CN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ug_CN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ug_CN : goog.i18n.cldr41.DateTimePatterns_ug_CN);


/**
 * Extended set of localized date/time patterns for locale uk_UA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_uk_UA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_uk_UA : goog.i18n.cldr41.DateTimePatterns_uk_UA);


/**
 * Extended set of localized date/time patterns for locale ur_IN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ur_IN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ur_IN : goog.i18n.cldr41.DateTimePatterns_ur_IN);


/**
 * Extended set of localized date/time patterns for locale ur_PK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_ur_PK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_ur_PK : goog.i18n.cldr41.DateTimePatterns_ur_PK);


/**
 * Extended set of localized date/time patterns for locale uz_Arab.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_uz_Arab = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_uz_Arab : goog.i18n.cldr41.DateTimePatterns_uz_Arab);


/**
 * Extended set of localized date/time patterns for locale uz_Arab_AF.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_uz_Arab_AF = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_uz_Arab_AF : goog.i18n.cldr41.DateTimePatterns_uz_Arab_AF);


/**
 * Extended set of localized date/time patterns for locale uz_Cyrl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_uz_Cyrl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_uz_Cyrl : goog.i18n.cldr41.DateTimePatterns_uz_Cyrl);


/**
 * Extended set of localized date/time patterns for locale uz_Cyrl_UZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_uz_Cyrl_UZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_uz_Cyrl_UZ : goog.i18n.cldr41.DateTimePatterns_uz_Cyrl_UZ);


/**
 * Extended set of localized date/time patterns for locale uz_Latn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_uz_Latn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_uz_Latn : goog.i18n.cldr41.DateTimePatterns_uz_Latn);


/**
 * Extended set of localized date/time patterns for locale uz_Latn_UZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_uz_Latn_UZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_uz_Latn_UZ : goog.i18n.cldr41.DateTimePatterns_uz_Latn_UZ);


/**
 * Extended set of localized date/time patterns for locale vai.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_vai = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_vai : goog.i18n.cldr41.DateTimePatterns_vai);


/**
 * Extended set of localized date/time patterns for locale vai_Latn.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_vai_Latn = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_vai_Latn : goog.i18n.cldr41.DateTimePatterns_vai_Latn);


/**
 * Extended set of localized date/time patterns for locale vai_Latn_LR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_vai_Latn_LR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_vai_Latn_LR : goog.i18n.cldr41.DateTimePatterns_vai_Latn_LR);


/**
 * Extended set of localized date/time patterns for locale vai_Vaii.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_vai_Vaii = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_vai_Vaii : goog.i18n.cldr41.DateTimePatterns_vai_Vaii);


/**
 * Extended set of localized date/time patterns for locale vai_Vaii_LR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_vai_Vaii_LR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_vai_Vaii_LR : goog.i18n.cldr41.DateTimePatterns_vai_Vaii_LR);


/**
 * Extended set of localized date/time patterns for locale vi_VN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_vi_VN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_vi_VN : goog.i18n.cldr41.DateTimePatterns_vi_VN);


/**
 * Extended set of localized date/time patterns for locale vun.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_vun = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_vun : goog.i18n.cldr41.DateTimePatterns_vun);


/**
 * Extended set of localized date/time patterns for locale vun_TZ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_vun_TZ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_vun_TZ : goog.i18n.cldr41.DateTimePatterns_vun_TZ);


/**
 * Extended set of localized date/time patterns for locale wae.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_wae = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_wae : goog.i18n.cldr41.DateTimePatterns_wae);


/**
 * Extended set of localized date/time patterns for locale wae_CH.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_wae_CH = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_wae_CH : goog.i18n.cldr41.DateTimePatterns_wae_CH);


/**
 * Extended set of localized date/time patterns for locale wo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_wo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_wo : goog.i18n.cldr41.DateTimePatterns_wo);


/**
 * Extended set of localized date/time patterns for locale wo_SN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_wo_SN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_wo_SN : goog.i18n.cldr41.DateTimePatterns_wo_SN);


/**
 * Extended set of localized date/time patterns for locale xh.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_xh = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_xh : goog.i18n.cldr41.DateTimePatterns_xh);


/**
 * Extended set of localized date/time patterns for locale xh_ZA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_xh_ZA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_xh_ZA : goog.i18n.cldr41.DateTimePatterns_xh_ZA);


/**
 * Extended set of localized date/time patterns for locale xog.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_xog = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_xog : goog.i18n.cldr41.DateTimePatterns_xog);


/**
 * Extended set of localized date/time patterns for locale xog_UG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_xog_UG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_xog_UG : goog.i18n.cldr41.DateTimePatterns_xog_UG);


/**
 * Extended set of localized date/time patterns for locale yav.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yav = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yav : goog.i18n.cldr41.DateTimePatterns_yav);


/**
 * Extended set of localized date/time patterns for locale yav_CM.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yav_CM = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yav_CM : goog.i18n.cldr41.DateTimePatterns_yav_CM);


/**
 * Extended set of localized date/time patterns for locale yi.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yi = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yi : goog.i18n.cldr41.DateTimePatterns_yi);


/**
 * Extended set of localized date/time patterns for locale yi_001.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yi_001 = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yi_001 : goog.i18n.cldr41.DateTimePatterns_yi_001);


/**
 * Extended set of localized date/time patterns for locale yo.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yo = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yo : goog.i18n.cldr41.DateTimePatterns_yo);


/**
 * Extended set of localized date/time patterns for locale yo_BJ.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yo_BJ = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yo_BJ : goog.i18n.cldr41.DateTimePatterns_yo_BJ);


/**
 * Extended set of localized date/time patterns for locale yo_NG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yo_NG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yo_NG : goog.i18n.cldr41.DateTimePatterns_yo_NG);


/**
 * Extended set of localized date/time patterns for locale yrl.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yrl = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yrl : goog.i18n.cldr41.DateTimePatterns_yrl);


/**
 * Extended set of localized date/time patterns for locale yrl_BR.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yrl_BR = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yrl_BR : goog.i18n.cldr41.DateTimePatterns_yrl_BR);


/**
 * Extended set of localized date/time patterns for locale yrl_CO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yrl_CO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yrl_CO : goog.i18n.cldr41.DateTimePatterns_yrl_CO);


/**
 * Extended set of localized date/time patterns for locale yrl_VE.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yrl_VE = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yrl_VE : goog.i18n.cldr41.DateTimePatterns_yrl_VE);


/**
 * Extended set of localized date/time patterns for locale yue.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yue = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yue : goog.i18n.cldr41.DateTimePatterns_yue);


/**
 * Extended set of localized date/time patterns for locale yue_Hans.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yue_Hans = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yue_Hans : goog.i18n.cldr41.DateTimePatterns_yue_Hans);


/**
 * Extended set of localized date/time patterns for locale yue_Hans_CN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yue_Hans_CN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yue_Hans_CN : goog.i18n.cldr41.DateTimePatterns_yue_Hans_CN);


/**
 * Extended set of localized date/time patterns for locale yue_Hant.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yue_Hant = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yue_Hant : goog.i18n.cldr41.DateTimePatterns_yue_Hant);


/**
 * Extended set of localized date/time patterns for locale yue_Hant_HK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_yue_Hant_HK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_yue_Hant_HK : goog.i18n.cldr41.DateTimePatterns_yue_Hant_HK);


/**
 * Extended set of localized date/time patterns for locale zgh.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zgh = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zgh : goog.i18n.cldr41.DateTimePatterns_zgh);


/**
 * Extended set of localized date/time patterns for locale zgh_MA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zgh_MA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zgh_MA : goog.i18n.cldr41.DateTimePatterns_zgh_MA);


/**
 * Extended set of localized date/time patterns for locale zh_Hans.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_Hans = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_Hans : goog.i18n.cldr41.DateTimePatterns_zh_Hans);


/**
 * Extended set of localized date/time patterns for locale zh_Hans_CN.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_Hans_CN = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_Hans_CN : goog.i18n.cldr41.DateTimePatterns_zh_Hans_CN);


/**
 * Extended set of localized date/time patterns for locale zh_Hans_HK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_Hans_HK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_Hans_HK : goog.i18n.cldr41.DateTimePatterns_zh_Hans_HK);


/**
 * Extended set of localized date/time patterns for locale zh_Hans_MO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_Hans_MO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_Hans_MO : goog.i18n.cldr41.DateTimePatterns_zh_Hans_MO);


/**
 * Extended set of localized date/time patterns for locale zh_Hans_SG.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_Hans_SG = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_Hans_SG : goog.i18n.cldr41.DateTimePatterns_zh_Hans_SG);


/**
 * Extended set of localized date/time patterns for locale zh_Hant.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_Hant = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_Hant : goog.i18n.cldr41.DateTimePatterns_zh_Hant);


/**
 * Extended set of localized date/time patterns for locale zh_Hant_HK.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_Hant_HK = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_Hant_HK : goog.i18n.cldr41.DateTimePatterns_zh_Hant_HK);


/**
 * Extended set of localized date/time patterns for locale zh_Hant_MO.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_Hant_MO = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_Hant_MO : goog.i18n.cldr41.DateTimePatterns_zh_Hant_MO);


/**
 * Extended set of localized date/time patterns for locale zh_Hant_TW.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zh_Hant_TW = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zh_Hant_TW : goog.i18n.cldr41.DateTimePatterns_zh_Hant_TW);


/**
 * Extended set of localized date/time patterns for locale zu_ZA.
 * @type {!goog.i18n.DateTimePatternsType}
 */
goog.i18n.DateTimePatterns_zu_ZA = /** @type {!goog.i18n.DateTimePatternsType} */ (goog.i18n.cldrversion.USE_CLDR_NEXT ? goog.i18n.cldr42.DateTimePatterns_zu_ZA : goog.i18n.cldr41.DateTimePatterns_zu_ZA);


/**
 * Select date/time pattern by locale.
 */
switch (goog.LOCALE) {
  case 'af_NA':
  case 'af-NA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_af_NA;
    break;
  case 'af_ZA':
  case 'af-ZA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_af_ZA;
    break;
  case 'agq':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_agq;
    break;
  case 'agq_CM':
  case 'agq-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_agq_CM;
    break;
  case 'ak':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ak;
    break;
  case 'ak_GH':
  case 'ak-GH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ak_GH;
    break;
  case 'am_ET':
  case 'am-ET':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_am_ET;
    break;
  case 'ar_001':
  case 'ar-001':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_001;
    break;
  case 'ar_AE':
  case 'ar-AE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_AE;
    break;
  case 'ar_BH':
  case 'ar-BH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_BH;
    break;
  case 'ar_DJ':
  case 'ar-DJ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_DJ;
    break;
  case 'ar_EH':
  case 'ar-EH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_EH;
    break;
  case 'ar_ER':
  case 'ar-ER':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_ER;
    break;
  case 'ar_IL':
  case 'ar-IL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_IL;
    break;
  case 'ar_IQ':
  case 'ar-IQ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_IQ;
    break;
  case 'ar_JO':
  case 'ar-JO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_JO;
    break;
  case 'ar_KM':
  case 'ar-KM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_KM;
    break;
  case 'ar_KW':
  case 'ar-KW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_KW;
    break;
  case 'ar_LB':
  case 'ar-LB':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_LB;
    break;
  case 'ar_LY':
  case 'ar-LY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_LY;
    break;
  case 'ar_MA':
  case 'ar-MA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_MA;
    break;
  case 'ar_MR':
  case 'ar-MR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_MR;
    break;
  case 'ar_OM':
  case 'ar-OM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_OM;
    break;
  case 'ar_PS':
  case 'ar-PS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_PS;
    break;
  case 'ar_QA':
  case 'ar-QA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_QA;
    break;
  case 'ar_SA':
  case 'ar-SA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_SA;
    break;
  case 'ar_SD':
  case 'ar-SD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_SD;
    break;
  case 'ar_SO':
  case 'ar-SO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_SO;
    break;
  case 'ar_SS':
  case 'ar-SS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_SS;
    break;
  case 'ar_SY':
  case 'ar-SY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_SY;
    break;
  case 'ar_TD':
  case 'ar-TD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_TD;
    break;
  case 'ar_TN':
  case 'ar-TN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_TN;
    break;
  case 'ar_XB':
  case 'ar-XB':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_XB;
    break;
  case 'ar_YE':
  case 'ar-YE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar_YE;
    break;
  case 'as':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_as;
    break;
  case 'as_IN':
  case 'as-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_as_IN;
    break;
  case 'asa':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_asa;
    break;
  case 'asa_TZ':
  case 'asa-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_asa_TZ;
    break;
  case 'ast':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ast;
    break;
  case 'ast_ES':
  case 'ast-ES':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ast_ES;
    break;
  case 'az_Cyrl':
  case 'az-Cyrl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_az_Cyrl;
    break;
  case 'az_Cyrl_AZ':
  case 'az-Cyrl-AZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_az_Cyrl_AZ;
    break;
  case 'az_Latn':
  case 'az-Latn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_az_Latn;
    break;
  case 'az_Latn_AZ':
  case 'az-Latn-AZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_az_Latn_AZ;
    break;
  case 'bas':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bas;
    break;
  case 'bas_CM':
  case 'bas-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bas_CM;
    break;
  case 'be_BY':
  case 'be-BY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_be_BY;
    break;
  case 'bem':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bem;
    break;
  case 'bem_ZM':
  case 'bem-ZM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bem_ZM;
    break;
  case 'bez':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bez;
    break;
  case 'bez_TZ':
  case 'bez-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bez_TZ;
    break;
  case 'bg_BG':
  case 'bg-BG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bg_BG;
    break;
  case 'bgc':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bgc;
    break;
  case 'bgc_IN':
  case 'bgc-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bgc_IN;
    break;
  case 'bho':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bho;
    break;
  case 'bho_IN':
  case 'bho-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bho_IN;
    break;
  case 'bm':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bm;
    break;
  case 'bm_ML':
  case 'bm-ML':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bm_ML;
    break;
  case 'bn_BD':
  case 'bn-BD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bn_BD;
    break;
  case 'bn_IN':
  case 'bn-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bn_IN;
    break;
  case 'bo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bo;
    break;
  case 'bo_CN':
  case 'bo-CN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bo_CN;
    break;
  case 'bo_IN':
  case 'bo-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bo_IN;
    break;
  case 'br_FR':
  case 'br-FR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_br_FR;
    break;
  case 'brx':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_brx;
    break;
  case 'brx_IN':
  case 'brx-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_brx_IN;
    break;
  case 'bs_Cyrl':
  case 'bs-Cyrl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bs_Cyrl;
    break;
  case 'bs_Cyrl_BA':
  case 'bs-Cyrl-BA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bs_Cyrl_BA;
    break;
  case 'bs_Latn':
  case 'bs-Latn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bs_Latn;
    break;
  case 'bs_Latn_BA':
  case 'bs-Latn-BA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bs_Latn_BA;
    break;
  case 'ca_AD':
  case 'ca-AD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ca_AD;
    break;
  case 'ca_ES':
  case 'ca-ES':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ca_ES;
    break;
  case 'ca_FR':
  case 'ca-FR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ca_FR;
    break;
  case 'ca_IT':
  case 'ca-IT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ca_IT;
    break;
  case 'ccp':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ccp;
    break;
  case 'ccp_BD':
  case 'ccp-BD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ccp_BD;
    break;
  case 'ccp_IN':
  case 'ccp-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ccp_IN;
    break;
  case 'ce':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ce;
    break;
  case 'ce_RU':
  case 'ce-RU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ce_RU;
    break;
  case 'ceb':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ceb;
    break;
  case 'ceb_PH':
  case 'ceb-PH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ceb_PH;
    break;
  case 'cgg':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_cgg;
    break;
  case 'cgg_UG':
  case 'cgg-UG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_cgg_UG;
    break;
  case 'chr_US':
  case 'chr-US':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_chr_US;
    break;
  case 'ckb':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ckb;
    break;
  case 'ckb_Arab':
  case 'ckb-Arab':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ckb_Arab;
    break;
  case 'ckb_Arab_IQ':
  case 'ckb-Arab-IQ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ckb_Arab_IQ;
    break;
  case 'ckb_Arab_IR':
  case 'ckb-Arab-IR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ckb_Arab_IR;
    break;
  case 'ckb_IQ':
  case 'ckb-IQ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ckb_IQ;
    break;
  case 'ckb_IR':
  case 'ckb-IR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ckb_IR;
    break;
  case 'cs_CZ':
  case 'cs-CZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_cs_CZ;
    break;
  case 'cv':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_cv;
    break;
  case 'cv_RU':
  case 'cv-RU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_cv_RU;
    break;
  case 'cy_GB':
  case 'cy-GB':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_cy_GB;
    break;
  case 'da_DK':
  case 'da-DK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_da_DK;
    break;
  case 'da_GL':
  case 'da-GL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_da_GL;
    break;
  case 'dav':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dav;
    break;
  case 'dav_KE':
  case 'dav-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dav_KE;
    break;
  case 'de_BE':
  case 'de-BE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de_BE;
    break;
  case 'de_DE':
  case 'de-DE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de_DE;
    break;
  case 'de_IT':
  case 'de-IT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de_IT;
    break;
  case 'de_LI':
  case 'de-LI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de_LI;
    break;
  case 'de_LU':
  case 'de-LU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de_LU;
    break;
  case 'dje':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dje;
    break;
  case 'dje_NE':
  case 'dje-NE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dje_NE;
    break;
  case 'doi':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_doi;
    break;
  case 'doi_IN':
  case 'doi-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_doi_IN;
    break;
  case 'dsb':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dsb;
    break;
  case 'dsb_DE':
  case 'dsb-DE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dsb_DE;
    break;
  case 'dua':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dua;
    break;
  case 'dua_CM':
  case 'dua-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dua_CM;
    break;
  case 'dyo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dyo;
    break;
  case 'dyo_SN':
  case 'dyo-SN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dyo_SN;
    break;
  case 'dz':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dz;
    break;
  case 'dz_BT':
  case 'dz-BT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_dz_BT;
    break;
  case 'ebu':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ebu;
    break;
  case 'ebu_KE':
  case 'ebu-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ebu_KE;
    break;
  case 'ee':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ee;
    break;
  case 'ee_GH':
  case 'ee-GH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ee_GH;
    break;
  case 'ee_TG':
  case 'ee-TG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ee_TG;
    break;
  case 'el_CY':
  case 'el-CY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_el_CY;
    break;
  case 'el_GR':
  case 'el-GR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_el_GR;
    break;
  case 'en_001':
  case 'en-001':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_001;
    break;
  case 'en_150':
  case 'en-150':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_150;
    break;
  case 'en_AE':
  case 'en-AE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_AE;
    break;
  case 'en_AG':
  case 'en-AG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_AG;
    break;
  case 'en_AI':
  case 'en-AI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_AI;
    break;
  case 'en_AS':
  case 'en-AS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_AS;
    break;
  case 'en_AT':
  case 'en-AT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_AT;
    break;
  case 'en_BB':
  case 'en-BB':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_BB;
    break;
  case 'en_BE':
  case 'en-BE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_BE;
    break;
  case 'en_BI':
  case 'en-BI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_BI;
    break;
  case 'en_BM':
  case 'en-BM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_BM;
    break;
  case 'en_BS':
  case 'en-BS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_BS;
    break;
  case 'en_BW':
  case 'en-BW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_BW;
    break;
  case 'en_BZ':
  case 'en-BZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_BZ;
    break;
  case 'en_CC':
  case 'en-CC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_CC;
    break;
  case 'en_CH':
  case 'en-CH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_CH;
    break;
  case 'en_CK':
  case 'en-CK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_CK;
    break;
  case 'en_CM':
  case 'en-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_CM;
    break;
  case 'en_CX':
  case 'en-CX':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_CX;
    break;
  case 'en_CY':
  case 'en-CY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_CY;
    break;
  case 'en_DE':
  case 'en-DE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_DE;
    break;
  case 'en_DG':
  case 'en-DG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_DG;
    break;
  case 'en_DK':
  case 'en-DK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_DK;
    break;
  case 'en_DM':
  case 'en-DM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_DM;
    break;
  case 'en_ER':
  case 'en-ER':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_ER;
    break;
  case 'en_FI':
  case 'en-FI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_FI;
    break;
  case 'en_FJ':
  case 'en-FJ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_FJ;
    break;
  case 'en_FK':
  case 'en-FK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_FK;
    break;
  case 'en_FM':
  case 'en-FM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_FM;
    break;
  case 'en_GD':
  case 'en-GD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_GD;
    break;
  case 'en_GG':
  case 'en-GG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_GG;
    break;
  case 'en_GH':
  case 'en-GH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_GH;
    break;
  case 'en_GI':
  case 'en-GI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_GI;
    break;
  case 'en_GM':
  case 'en-GM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_GM;
    break;
  case 'en_GU':
  case 'en-GU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_GU;
    break;
  case 'en_GY':
  case 'en-GY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_GY;
    break;
  case 'en_HK':
  case 'en-HK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_HK;
    break;
  case 'en_IL':
  case 'en-IL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_IL;
    break;
  case 'en_IM':
  case 'en-IM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_IM;
    break;
  case 'en_IO':
  case 'en-IO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_IO;
    break;
  case 'en_JE':
  case 'en-JE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_JE;
    break;
  case 'en_JM':
  case 'en-JM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_JM;
    break;
  case 'en_KE':
  case 'en-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_KE;
    break;
  case 'en_KI':
  case 'en-KI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_KI;
    break;
  case 'en_KN':
  case 'en-KN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_KN;
    break;
  case 'en_KY':
  case 'en-KY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_KY;
    break;
  case 'en_LC':
  case 'en-LC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_LC;
    break;
  case 'en_LR':
  case 'en-LR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_LR;
    break;
  case 'en_LS':
  case 'en-LS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_LS;
    break;
  case 'en_MG':
  case 'en-MG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MG;
    break;
  case 'en_MH':
  case 'en-MH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MH;
    break;
  case 'en_MO':
  case 'en-MO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MO;
    break;
  case 'en_MP':
  case 'en-MP':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MP;
    break;
  case 'en_MS':
  case 'en-MS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MS;
    break;
  case 'en_MT':
  case 'en-MT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MT;
    break;
  case 'en_MU':
  case 'en-MU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MU;
    break;
  case 'en_MV':
  case 'en-MV':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MV;
    break;
  case 'en_MW':
  case 'en-MW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MW;
    break;
  case 'en_MY':
  case 'en-MY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_MY;
    break;
  case 'en_NA':
  case 'en-NA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_NA;
    break;
  case 'en_NF':
  case 'en-NF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_NF;
    break;
  case 'en_NG':
  case 'en-NG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_NG;
    break;
  case 'en_NL':
  case 'en-NL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_NL;
    break;
  case 'en_NR':
  case 'en-NR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_NR;
    break;
  case 'en_NU':
  case 'en-NU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_NU;
    break;
  case 'en_NZ':
  case 'en-NZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_NZ;
    break;
  case 'en_PG':
  case 'en-PG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_PG;
    break;
  case 'en_PH':
  case 'en-PH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_PH;
    break;
  case 'en_PK':
  case 'en-PK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_PK;
    break;
  case 'en_PN':
  case 'en-PN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_PN;
    break;
  case 'en_PR':
  case 'en-PR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_PR;
    break;
  case 'en_PW':
  case 'en-PW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_PW;
    break;
  case 'en_RW':
  case 'en-RW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_RW;
    break;
  case 'en_SB':
  case 'en-SB':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SB;
    break;
  case 'en_SC':
  case 'en-SC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SC;
    break;
  case 'en_SD':
  case 'en-SD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SD;
    break;
  case 'en_SE':
  case 'en-SE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SE;
    break;
  case 'en_SH':
  case 'en-SH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SH;
    break;
  case 'en_SI':
  case 'en-SI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SI;
    break;
  case 'en_SL':
  case 'en-SL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SL;
    break;
  case 'en_SS':
  case 'en-SS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SS;
    break;
  case 'en_SX':
  case 'en-SX':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SX;
    break;
  case 'en_SZ':
  case 'en-SZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SZ;
    break;
  case 'en_TC':
  case 'en-TC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_TC;
    break;
  case 'en_TK':
  case 'en-TK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_TK;
    break;
  case 'en_TO':
  case 'en-TO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_TO;
    break;
  case 'en_TT':
  case 'en-TT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_TT;
    break;
  case 'en_TV':
  case 'en-TV':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_TV;
    break;
  case 'en_TZ':
  case 'en-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_TZ;
    break;
  case 'en_UG':
  case 'en-UG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_UG;
    break;
  case 'en_UM':
  case 'en-UM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_UM;
    break;
  case 'en_US_POSIX':
  case 'en-US-POSIX':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_US_POSIX;
    break;
  case 'en_VC':
  case 'en-VC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_VC;
    break;
  case 'en_VG':
  case 'en-VG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_VG;
    break;
  case 'en_VI':
  case 'en-VI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_VI;
    break;
  case 'en_VU':
  case 'en-VU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_VU;
    break;
  case 'en_WS':
  case 'en-WS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_WS;
    break;
  case 'en_XA':
  case 'en-XA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_XA;
    break;
  case 'en_ZM':
  case 'en-ZM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_ZM;
    break;
  case 'en_ZW':
  case 'en-ZW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_ZW;
    break;
  case 'eo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_eo;
    break;
  case 'eo_001':
  case 'eo-001':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_eo_001;
    break;
  case 'es_AR':
  case 'es-AR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_AR;
    break;
  case 'es_BO':
  case 'es-BO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_BO;
    break;
  case 'es_BR':
  case 'es-BR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_BR;
    break;
  case 'es_BZ':
  case 'es-BZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_BZ;
    break;
  case 'es_CL':
  case 'es-CL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_CL;
    break;
  case 'es_CO':
  case 'es-CO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_CO;
    break;
  case 'es_CR':
  case 'es-CR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_CR;
    break;
  case 'es_CU':
  case 'es-CU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_CU;
    break;
  case 'es_DO':
  case 'es-DO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_DO;
    break;
  case 'es_EA':
  case 'es-EA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_EA;
    break;
  case 'es_EC':
  case 'es-EC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_EC;
    break;
  case 'es_GQ':
  case 'es-GQ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_GQ;
    break;
  case 'es_GT':
  case 'es-GT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_GT;
    break;
  case 'es_HN':
  case 'es-HN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_HN;
    break;
  case 'es_IC':
  case 'es-IC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_IC;
    break;
  case 'es_NI':
  case 'es-NI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_NI;
    break;
  case 'es_PA':
  case 'es-PA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_PA;
    break;
  case 'es_PE':
  case 'es-PE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_PE;
    break;
  case 'es_PH':
  case 'es-PH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_PH;
    break;
  case 'es_PR':
  case 'es-PR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_PR;
    break;
  case 'es_PY':
  case 'es-PY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_PY;
    break;
  case 'es_SV':
  case 'es-SV':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_SV;
    break;
  case 'es_UY':
  case 'es-UY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_UY;
    break;
  case 'es_VE':
  case 'es-VE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es_VE;
    break;
  case 'et_EE':
  case 'et-EE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_et_EE;
    break;
  case 'eu_ES':
  case 'eu-ES':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_eu_ES;
    break;
  case 'ewo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ewo;
    break;
  case 'ewo_CM':
  case 'ewo-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ewo_CM;
    break;
  case 'fa_AF':
  case 'fa-AF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fa_AF;
    break;
  case 'fa_IR':
  case 'fa-IR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fa_IR;
    break;
  case 'ff':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff;
    break;
  case 'ff_Adlm':
  case 'ff-Adlm':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm;
    break;
  case 'ff_Adlm_BF':
  case 'ff-Adlm-BF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_BF;
    break;
  case 'ff_Adlm_CM':
  case 'ff-Adlm-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_CM;
    break;
  case 'ff_Adlm_GH':
  case 'ff-Adlm-GH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_GH;
    break;
  case 'ff_Adlm_GM':
  case 'ff-Adlm-GM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_GM;
    break;
  case 'ff_Adlm_GN':
  case 'ff-Adlm-GN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_GN;
    break;
  case 'ff_Adlm_GW':
  case 'ff-Adlm-GW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_GW;
    break;
  case 'ff_Adlm_LR':
  case 'ff-Adlm-LR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_LR;
    break;
  case 'ff_Adlm_MR':
  case 'ff-Adlm-MR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_MR;
    break;
  case 'ff_Adlm_NE':
  case 'ff-Adlm-NE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_NE;
    break;
  case 'ff_Adlm_NG':
  case 'ff-Adlm-NG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_NG;
    break;
  case 'ff_Adlm_SL':
  case 'ff-Adlm-SL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_SL;
    break;
  case 'ff_Adlm_SN':
  case 'ff-Adlm-SN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Adlm_SN;
    break;
  case 'ff_Latn':
  case 'ff-Latn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn;
    break;
  case 'ff_Latn_BF':
  case 'ff-Latn-BF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_BF;
    break;
  case 'ff_Latn_CM':
  case 'ff-Latn-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_CM;
    break;
  case 'ff_Latn_GH':
  case 'ff-Latn-GH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_GH;
    break;
  case 'ff_Latn_GM':
  case 'ff-Latn-GM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_GM;
    break;
  case 'ff_Latn_GN':
  case 'ff-Latn-GN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_GN;
    break;
  case 'ff_Latn_GW':
  case 'ff-Latn-GW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_GW;
    break;
  case 'ff_Latn_LR':
  case 'ff-Latn-LR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_LR;
    break;
  case 'ff_Latn_MR':
  case 'ff-Latn-MR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_MR;
    break;
  case 'ff_Latn_NE':
  case 'ff-Latn-NE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_NE;
    break;
  case 'ff_Latn_NG':
  case 'ff-Latn-NG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_NG;
    break;
  case 'ff_Latn_SL':
  case 'ff-Latn-SL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_SL;
    break;
  case 'ff_Latn_SN':
  case 'ff-Latn-SN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ff_Latn_SN;
    break;
  case 'fi_FI':
  case 'fi-FI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fi_FI;
    break;
  case 'fil_PH':
  case 'fil-PH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fil_PH;
    break;
  case 'fo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fo;
    break;
  case 'fo_DK':
  case 'fo-DK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fo_DK;
    break;
  case 'fo_FO':
  case 'fo-FO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fo_FO;
    break;
  case 'fr_BE':
  case 'fr-BE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_BE;
    break;
  case 'fr_BF':
  case 'fr-BF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_BF;
    break;
  case 'fr_BI':
  case 'fr-BI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_BI;
    break;
  case 'fr_BJ':
  case 'fr-BJ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_BJ;
    break;
  case 'fr_BL':
  case 'fr-BL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_BL;
    break;
  case 'fr_CD':
  case 'fr-CD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_CD;
    break;
  case 'fr_CF':
  case 'fr-CF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_CF;
    break;
  case 'fr_CG':
  case 'fr-CG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_CG;
    break;
  case 'fr_CH':
  case 'fr-CH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_CH;
    break;
  case 'fr_CI':
  case 'fr-CI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_CI;
    break;
  case 'fr_CM':
  case 'fr-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_CM;
    break;
  case 'fr_DJ':
  case 'fr-DJ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_DJ;
    break;
  case 'fr_DZ':
  case 'fr-DZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_DZ;
    break;
  case 'fr_FR':
  case 'fr-FR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_FR;
    break;
  case 'fr_GA':
  case 'fr-GA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_GA;
    break;
  case 'fr_GF':
  case 'fr-GF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_GF;
    break;
  case 'fr_GN':
  case 'fr-GN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_GN;
    break;
  case 'fr_GP':
  case 'fr-GP':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_GP;
    break;
  case 'fr_GQ':
  case 'fr-GQ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_GQ;
    break;
  case 'fr_HT':
  case 'fr-HT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_HT;
    break;
  case 'fr_KM':
  case 'fr-KM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_KM;
    break;
  case 'fr_LU':
  case 'fr-LU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_LU;
    break;
  case 'fr_MA':
  case 'fr-MA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_MA;
    break;
  case 'fr_MC':
  case 'fr-MC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_MC;
    break;
  case 'fr_MF':
  case 'fr-MF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_MF;
    break;
  case 'fr_MG':
  case 'fr-MG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_MG;
    break;
  case 'fr_ML':
  case 'fr-ML':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_ML;
    break;
  case 'fr_MQ':
  case 'fr-MQ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_MQ;
    break;
  case 'fr_MR':
  case 'fr-MR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_MR;
    break;
  case 'fr_MU':
  case 'fr-MU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_MU;
    break;
  case 'fr_NC':
  case 'fr-NC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_NC;
    break;
  case 'fr_NE':
  case 'fr-NE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_NE;
    break;
  case 'fr_PF':
  case 'fr-PF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_PF;
    break;
  case 'fr_PM':
  case 'fr-PM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_PM;
    break;
  case 'fr_RE':
  case 'fr-RE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_RE;
    break;
  case 'fr_RW':
  case 'fr-RW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_RW;
    break;
  case 'fr_SC':
  case 'fr-SC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_SC;
    break;
  case 'fr_SN':
  case 'fr-SN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_SN;
    break;
  case 'fr_SY':
  case 'fr-SY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_SY;
    break;
  case 'fr_TD':
  case 'fr-TD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_TD;
    break;
  case 'fr_TG':
  case 'fr-TG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_TG;
    break;
  case 'fr_TN':
  case 'fr-TN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_TN;
    break;
  case 'fr_VU':
  case 'fr-VU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_VU;
    break;
  case 'fr_WF':
  case 'fr-WF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_WF;
    break;
  case 'fr_YT':
  case 'fr-YT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_YT;
    break;
  case 'fur':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fur;
    break;
  case 'fur_IT':
  case 'fur-IT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fur_IT;
    break;
  case 'fy':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fy;
    break;
  case 'fy_NL':
  case 'fy-NL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fy_NL;
    break;
  case 'ga_GB':
  case 'ga-GB':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ga_GB;
    break;
  case 'ga_IE':
  case 'ga-IE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ga_IE;
    break;
  case 'gd':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gd;
    break;
  case 'gd_GB':
  case 'gd-GB':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gd_GB;
    break;
  case 'gl_ES':
  case 'gl-ES':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gl_ES;
    break;
  case 'gsw_CH':
  case 'gsw-CH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gsw_CH;
    break;
  case 'gsw_FR':
  case 'gsw-FR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gsw_FR;
    break;
  case 'gsw_LI':
  case 'gsw-LI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gsw_LI;
    break;
  case 'gu_IN':
  case 'gu-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gu_IN;
    break;
  case 'guz':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_guz;
    break;
  case 'guz_KE':
  case 'guz-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_guz_KE;
    break;
  case 'gv':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gv;
    break;
  case 'gv_IM':
  case 'gv-IM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gv_IM;
    break;
  case 'ha':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ha;
    break;
  case 'ha_GH':
  case 'ha-GH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ha_GH;
    break;
  case 'ha_NE':
  case 'ha-NE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ha_NE;
    break;
  case 'ha_NG':
  case 'ha-NG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ha_NG;
    break;
  case 'haw_US':
  case 'haw-US':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_haw_US;
    break;
  case 'he_IL':
  case 'he-IL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_he_IL;
    break;
  case 'hi_IN':
  case 'hi-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hi_IN;
    break;
  case 'hi_Latn':
  case 'hi-Latn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hi_Latn;
    break;
  case 'hi_Latn_IN':
  case 'hi-Latn-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hi_Latn_IN;
    break;
  case 'hr_BA':
  case 'hr-BA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hr_BA;
    break;
  case 'hr_HR':
  case 'hr-HR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hr_HR;
    break;
  case 'hsb':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hsb;
    break;
  case 'hsb_DE':
  case 'hsb-DE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hsb_DE;
    break;
  case 'hu_HU':
  case 'hu-HU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hu_HU;
    break;
  case 'hy_AM':
  case 'hy-AM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hy_AM;
    break;
  case 'ia':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ia;
    break;
  case 'ia_001':
  case 'ia-001':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ia_001;
    break;
  case 'id_ID':
  case 'id-ID':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_id_ID;
    break;
  case 'ig':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ig;
    break;
  case 'ig_NG':
  case 'ig-NG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ig_NG;
    break;
  case 'ii':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ii;
    break;
  case 'ii_CN':
  case 'ii-CN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ii_CN;
    break;
  case 'is_IS':
  case 'is-IS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_is_IS;
    break;
  case 'it_CH':
  case 'it-CH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_it_CH;
    break;
  case 'it_IT':
  case 'it-IT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_it_IT;
    break;
  case 'it_SM':
  case 'it-SM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_it_SM;
    break;
  case 'it_VA':
  case 'it-VA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_it_VA;
    break;
  case 'ja_JP':
  case 'ja-JP':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ja_JP;
    break;
  case 'jgo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_jgo;
    break;
  case 'jgo_CM':
  case 'jgo-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_jgo_CM;
    break;
  case 'jmc':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_jmc;
    break;
  case 'jmc_TZ':
  case 'jmc-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_jmc_TZ;
    break;
  case 'jv':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_jv;
    break;
  case 'jv_ID':
  case 'jv-ID':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_jv_ID;
    break;
  case 'ka_GE':
  case 'ka-GE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ka_GE;
    break;
  case 'kab':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kab;
    break;
  case 'kab_DZ':
  case 'kab-DZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kab_DZ;
    break;
  case 'kam':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kam;
    break;
  case 'kam_KE':
  case 'kam-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kam_KE;
    break;
  case 'kde':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kde;
    break;
  case 'kde_TZ':
  case 'kde-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kde_TZ;
    break;
  case 'kea':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kea;
    break;
  case 'kea_CV':
  case 'kea-CV':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kea_CV;
    break;
  case 'kgp':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kgp;
    break;
  case 'kgp_BR':
  case 'kgp-BR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kgp_BR;
    break;
  case 'khq':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_khq;
    break;
  case 'khq_ML':
  case 'khq-ML':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_khq_ML;
    break;
  case 'ki':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ki;
    break;
  case 'ki_KE':
  case 'ki-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ki_KE;
    break;
  case 'kk_KZ':
  case 'kk-KZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kk_KZ;
    break;
  case 'kkj':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kkj;
    break;
  case 'kkj_CM':
  case 'kkj-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kkj_CM;
    break;
  case 'kl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kl;
    break;
  case 'kl_GL':
  case 'kl-GL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kl_GL;
    break;
  case 'kln':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kln;
    break;
  case 'kln_KE':
  case 'kln-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kln_KE;
    break;
  case 'km_KH':
  case 'km-KH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_km_KH;
    break;
  case 'kn_IN':
  case 'kn-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kn_IN;
    break;
  case 'ko_KP':
  case 'ko-KP':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ko_KP;
    break;
  case 'ko_KR':
  case 'ko-KR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ko_KR;
    break;
  case 'kok':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kok;
    break;
  case 'kok_IN':
  case 'kok-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kok_IN;
    break;
  case 'ks':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ks;
    break;
  case 'ks_Arab':
  case 'ks-Arab':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ks_Arab;
    break;
  case 'ks_Arab_IN':
  case 'ks-Arab-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ks_Arab_IN;
    break;
  case 'ks_Deva':
  case 'ks-Deva':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ks_Deva;
    break;
  case 'ks_Deva_IN':
  case 'ks-Deva-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ks_Deva_IN;
    break;
  case 'ksb':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ksb;
    break;
  case 'ksb_TZ':
  case 'ksb-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ksb_TZ;
    break;
  case 'ksf':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ksf;
    break;
  case 'ksf_CM':
  case 'ksf-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ksf_CM;
    break;
  case 'ksh':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ksh;
    break;
  case 'ksh_DE':
  case 'ksh-DE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ksh_DE;
    break;
  case 'ku':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ku;
    break;
  case 'ku_TR':
  case 'ku-TR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ku_TR;
    break;
  case 'kw':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kw;
    break;
  case 'kw_GB':
  case 'kw-GB':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kw_GB;
    break;
  case 'ky_KG':
  case 'ky-KG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ky_KG;
    break;
  case 'lag':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lag;
    break;
  case 'lag_TZ':
  case 'lag-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lag_TZ;
    break;
  case 'lb':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lb;
    break;
  case 'lb_LU':
  case 'lb-LU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lb_LU;
    break;
  case 'lg':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lg;
    break;
  case 'lg_UG':
  case 'lg-UG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lg_UG;
    break;
  case 'lkt':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lkt;
    break;
  case 'lkt_US':
  case 'lkt-US':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lkt_US;
    break;
  case 'ln_AO':
  case 'ln-AO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ln_AO;
    break;
  case 'ln_CD':
  case 'ln-CD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ln_CD;
    break;
  case 'ln_CF':
  case 'ln-CF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ln_CF;
    break;
  case 'ln_CG':
  case 'ln-CG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ln_CG;
    break;
  case 'lo_LA':
  case 'lo-LA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lo_LA;
    break;
  case 'lrc':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lrc;
    break;
  case 'lrc_IQ':
  case 'lrc-IQ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lrc_IQ;
    break;
  case 'lrc_IR':
  case 'lrc-IR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lrc_IR;
    break;
  case 'lt_LT':
  case 'lt-LT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lt_LT;
    break;
  case 'lu':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lu;
    break;
  case 'lu_CD':
  case 'lu-CD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lu_CD;
    break;
  case 'luo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_luo;
    break;
  case 'luo_KE':
  case 'luo-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_luo_KE;
    break;
  case 'luy':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_luy;
    break;
  case 'luy_KE':
  case 'luy-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_luy_KE;
    break;
  case 'lv_LV':
  case 'lv-LV':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lv_LV;
    break;
  case 'mai':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mai;
    break;
  case 'mai_IN':
  case 'mai-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mai_IN;
    break;
  case 'mas':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mas;
    break;
  case 'mas_KE':
  case 'mas-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mas_KE;
    break;
  case 'mas_TZ':
  case 'mas-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mas_TZ;
    break;
  case 'mer':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mer;
    break;
  case 'mer_KE':
  case 'mer-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mer_KE;
    break;
  case 'mfe':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mfe;
    break;
  case 'mfe_MU':
  case 'mfe-MU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mfe_MU;
    break;
  case 'mg':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mg;
    break;
  case 'mg_MG':
  case 'mg-MG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mg_MG;
    break;
  case 'mgh':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mgh;
    break;
  case 'mgh_MZ':
  case 'mgh-MZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mgh_MZ;
    break;
  case 'mgo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mgo;
    break;
  case 'mgo_CM':
  case 'mgo-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mgo_CM;
    break;
  case 'mi':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mi;
    break;
  case 'mi_NZ':
  case 'mi-NZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mi_NZ;
    break;
  case 'mk_MK':
  case 'mk-MK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mk_MK;
    break;
  case 'ml_IN':
  case 'ml-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ml_IN;
    break;
  case 'mn_MN':
  case 'mn-MN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mn_MN;
    break;
  case 'mni':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mni;
    break;
  case 'mni_Beng':
  case 'mni-Beng':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mni_Beng;
    break;
  case 'mni_Beng_IN':
  case 'mni-Beng-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mni_Beng_IN;
    break;
  case 'mr_IN':
  case 'mr-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mr_IN;
    break;
  case 'ms_BN':
  case 'ms-BN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ms_BN;
    break;
  case 'ms_ID':
  case 'ms-ID':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ms_ID;
    break;
  case 'ms_MY':
  case 'ms-MY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ms_MY;
    break;
  case 'ms_SG':
  case 'ms-SG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ms_SG;
    break;
  case 'mt_MT':
  case 'mt-MT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mt_MT;
    break;
  case 'mua':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mua;
    break;
  case 'mua_CM':
  case 'mua-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mua_CM;
    break;
  case 'my_MM':
  case 'my-MM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_my_MM;
    break;
  case 'mzn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mzn;
    break;
  case 'mzn_IR':
  case 'mzn-IR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mzn_IR;
    break;
  case 'naq':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_naq;
    break;
  case 'naq_NA':
  case 'naq-NA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_naq_NA;
    break;
  case 'nb_NO':
  case 'nb-NO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nb_NO;
    break;
  case 'nb_SJ':
  case 'nb-SJ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nb_SJ;
    break;
  case 'nd':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nd;
    break;
  case 'nd_ZW':
  case 'nd-ZW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nd_ZW;
    break;
  case 'ne_IN':
  case 'ne-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ne_IN;
    break;
  case 'ne_NP':
  case 'ne-NP':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ne_NP;
    break;
  case 'nl_AW':
  case 'nl-AW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nl_AW;
    break;
  case 'nl_BE':
  case 'nl-BE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nl_BE;
    break;
  case 'nl_BQ':
  case 'nl-BQ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nl_BQ;
    break;
  case 'nl_CW':
  case 'nl-CW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nl_CW;
    break;
  case 'nl_NL':
  case 'nl-NL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nl_NL;
    break;
  case 'nl_SR':
  case 'nl-SR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nl_SR;
    break;
  case 'nl_SX':
  case 'nl-SX':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nl_SX;
    break;
  case 'nmg':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nmg;
    break;
  case 'nmg_CM':
  case 'nmg-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nmg_CM;
    break;
  case 'nn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nn;
    break;
  case 'nn_NO':
  case 'nn-NO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nn_NO;
    break;
  case 'nnh':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nnh;
    break;
  case 'nnh_CM':
  case 'nnh-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nnh_CM;
    break;
  case 'nus':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nus;
    break;
  case 'nus_SS':
  case 'nus-SS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nus_SS;
    break;
  case 'nyn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nyn;
    break;
  case 'nyn_UG':
  case 'nyn-UG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nyn_UG;
    break;
  case 'om':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_om;
    break;
  case 'om_ET':
  case 'om-ET':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_om_ET;
    break;
  case 'om_KE':
  case 'om-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_om_KE;
    break;
  case 'or_IN':
  case 'or-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_or_IN;
    break;
  case 'os':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_os;
    break;
  case 'os_GE':
  case 'os-GE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_os_GE;
    break;
  case 'os_RU':
  case 'os-RU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_os_RU;
    break;
  case 'pa_Arab':
  case 'pa-Arab':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pa_Arab;
    break;
  case 'pa_Arab_PK':
  case 'pa-Arab-PK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pa_Arab_PK;
    break;
  case 'pa_Guru':
  case 'pa-Guru':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pa_Guru;
    break;
  case 'pa_Guru_IN':
  case 'pa-Guru-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pa_Guru_IN;
    break;
  case 'pcm':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pcm;
    break;
  case 'pcm_NG':
  case 'pcm-NG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pcm_NG;
    break;
  case 'pl_PL':
  case 'pl-PL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pl_PL;
    break;
  case 'ps':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ps;
    break;
  case 'ps_AF':
  case 'ps-AF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ps_AF;
    break;
  case 'ps_PK':
  case 'ps-PK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ps_PK;
    break;
  case 'pt_AO':
  case 'pt-AO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_AO;
    break;
  case 'pt_CH':
  case 'pt-CH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_CH;
    break;
  case 'pt_CV':
  case 'pt-CV':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_CV;
    break;
  case 'pt_GQ':
  case 'pt-GQ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_GQ;
    break;
  case 'pt_GW':
  case 'pt-GW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_GW;
    break;
  case 'pt_LU':
  case 'pt-LU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_LU;
    break;
  case 'pt_MO':
  case 'pt-MO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_MO;
    break;
  case 'pt_MZ':
  case 'pt-MZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_MZ;
    break;
  case 'pt_ST':
  case 'pt-ST':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_ST;
    break;
  case 'pt_TL':
  case 'pt-TL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_TL;
    break;
  case 'qu':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_qu;
    break;
  case 'qu_BO':
  case 'qu-BO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_qu_BO;
    break;
  case 'qu_EC':
  case 'qu-EC':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_qu_EC;
    break;
  case 'qu_PE':
  case 'qu-PE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_qu_PE;
    break;
  case 'raj':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_raj;
    break;
  case 'raj_IN':
  case 'raj-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_raj_IN;
    break;
  case 'rm':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rm;
    break;
  case 'rm_CH':
  case 'rm-CH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rm_CH;
    break;
  case 'rn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rn;
    break;
  case 'rn_BI':
  case 'rn-BI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rn_BI;
    break;
  case 'ro_MD':
  case 'ro-MD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ro_MD;
    break;
  case 'ro_RO':
  case 'ro-RO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ro_RO;
    break;
  case 'rof':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rof;
    break;
  case 'rof_TZ':
  case 'rof-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rof_TZ;
    break;
  case 'ru_BY':
  case 'ru-BY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ru_BY;
    break;
  case 'ru_KG':
  case 'ru-KG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ru_KG;
    break;
  case 'ru_KZ':
  case 'ru-KZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ru_KZ;
    break;
  case 'ru_MD':
  case 'ru-MD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ru_MD;
    break;
  case 'ru_RU':
  case 'ru-RU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ru_RU;
    break;
  case 'ru_UA':
  case 'ru-UA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ru_UA;
    break;
  case 'rw':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rw;
    break;
  case 'rw_RW':
  case 'rw-RW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rw_RW;
    break;
  case 'rwk':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rwk;
    break;
  case 'rwk_TZ':
  case 'rwk-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_rwk_TZ;
    break;
  case 'sa':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sa;
    break;
  case 'sa_IN':
  case 'sa-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sa_IN;
    break;
  case 'sah':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sah;
    break;
  case 'sah_RU':
  case 'sah-RU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sah_RU;
    break;
  case 'saq':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_saq;
    break;
  case 'saq_KE':
  case 'saq-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_saq_KE;
    break;
  case 'sat':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sat;
    break;
  case 'sat_Olck':
  case 'sat-Olck':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sat_Olck;
    break;
  case 'sat_Olck_IN':
  case 'sat-Olck-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sat_Olck_IN;
    break;
  case 'sbp':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sbp;
    break;
  case 'sbp_TZ':
  case 'sbp-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sbp_TZ;
    break;
  case 'sc':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sc;
    break;
  case 'sc_IT':
  case 'sc-IT':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sc_IT;
    break;
  case 'sd':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sd;
    break;
  case 'sd_Arab':
  case 'sd-Arab':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sd_Arab;
    break;
  case 'sd_Arab_PK':
  case 'sd-Arab-PK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sd_Arab_PK;
    break;
  case 'sd_Deva':
  case 'sd-Deva':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sd_Deva;
    break;
  case 'sd_Deva_IN':
  case 'sd-Deva-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sd_Deva_IN;
    break;
  case 'se':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_se;
    break;
  case 'se_FI':
  case 'se-FI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_se_FI;
    break;
  case 'se_NO':
  case 'se-NO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_se_NO;
    break;
  case 'se_SE':
  case 'se-SE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_se_SE;
    break;
  case 'seh':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_seh;
    break;
  case 'seh_MZ':
  case 'seh-MZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_seh_MZ;
    break;
  case 'ses':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ses;
    break;
  case 'ses_ML':
  case 'ses-ML':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ses_ML;
    break;
  case 'sg':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sg;
    break;
  case 'sg_CF':
  case 'sg-CF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sg_CF;
    break;
  case 'shi':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_shi;
    break;
  case 'shi_Latn':
  case 'shi-Latn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_shi_Latn;
    break;
  case 'shi_Latn_MA':
  case 'shi-Latn-MA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_shi_Latn_MA;
    break;
  case 'shi_Tfng':
  case 'shi-Tfng':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_shi_Tfng;
    break;
  case 'shi_Tfng_MA':
  case 'shi-Tfng-MA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_shi_Tfng_MA;
    break;
  case 'si_LK':
  case 'si-LK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_si_LK;
    break;
  case 'sk_SK':
  case 'sk-SK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sk_SK;
    break;
  case 'sl_SI':
  case 'sl-SI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sl_SI;
    break;
  case 'smn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_smn;
    break;
  case 'smn_FI':
  case 'smn-FI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_smn_FI;
    break;
  case 'sn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sn;
    break;
  case 'sn_ZW':
  case 'sn-ZW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sn_ZW;
    break;
  case 'so':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_so;
    break;
  case 'so_DJ':
  case 'so-DJ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_so_DJ;
    break;
  case 'so_ET':
  case 'so-ET':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_so_ET;
    break;
  case 'so_KE':
  case 'so-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_so_KE;
    break;
  case 'so_SO':
  case 'so-SO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_so_SO;
    break;
  case 'sq_AL':
  case 'sq-AL':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sq_AL;
    break;
  case 'sq_MK':
  case 'sq-MK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sq_MK;
    break;
  case 'sq_XK':
  case 'sq-XK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sq_XK;
    break;
  case 'sr_Cyrl':
  case 'sr-Cyrl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Cyrl;
    break;
  case 'sr_Cyrl_BA':
  case 'sr-Cyrl-BA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Cyrl_BA;
    break;
  case 'sr_Cyrl_ME':
  case 'sr-Cyrl-ME':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Cyrl_ME;
    break;
  case 'sr_Cyrl_RS':
  case 'sr-Cyrl-RS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Cyrl_RS;
    break;
  case 'sr_Cyrl_XK':
  case 'sr-Cyrl-XK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Cyrl_XK;
    break;
  case 'sr_Latn_BA':
  case 'sr-Latn-BA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Latn_BA;
    break;
  case 'sr_Latn_ME':
  case 'sr-Latn-ME':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Latn_ME;
    break;
  case 'sr_Latn_RS':
  case 'sr-Latn-RS':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Latn_RS;
    break;
  case 'sr_Latn_XK':
  case 'sr-Latn-XK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr_Latn_XK;
    break;
  case 'su':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_su;
    break;
  case 'su_Latn':
  case 'su-Latn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_su_Latn;
    break;
  case 'su_Latn_ID':
  case 'su-Latn-ID':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_su_Latn_ID;
    break;
  case 'sv_AX':
  case 'sv-AX':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sv_AX;
    break;
  case 'sv_FI':
  case 'sv-FI':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sv_FI;
    break;
  case 'sv_SE':
  case 'sv-SE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sv_SE;
    break;
  case 'sw_CD':
  case 'sw-CD':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sw_CD;
    break;
  case 'sw_KE':
  case 'sw-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sw_KE;
    break;
  case 'sw_TZ':
  case 'sw-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sw_TZ;
    break;
  case 'sw_UG':
  case 'sw-UG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sw_UG;
    break;
  case 'ta_IN':
  case 'ta-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ta_IN;
    break;
  case 'ta_LK':
  case 'ta-LK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ta_LK;
    break;
  case 'ta_MY':
  case 'ta-MY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ta_MY;
    break;
  case 'ta_SG':
  case 'ta-SG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ta_SG;
    break;
  case 'te_IN':
  case 'te-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_te_IN;
    break;
  case 'teo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_teo;
    break;
  case 'teo_KE':
  case 'teo-KE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_teo_KE;
    break;
  case 'teo_UG':
  case 'teo-UG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_teo_UG;
    break;
  case 'tg':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tg;
    break;
  case 'tg_TJ':
  case 'tg-TJ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tg_TJ;
    break;
  case 'th_TH':
  case 'th-TH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_th_TH;
    break;
  case 'ti':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ti;
    break;
  case 'ti_ER':
  case 'ti-ER':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ti_ER;
    break;
  case 'ti_ET':
  case 'ti-ET':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ti_ET;
    break;
  case 'tk':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tk;
    break;
  case 'tk_TM':
  case 'tk-TM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tk_TM;
    break;
  case 'to':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_to;
    break;
  case 'to_TO':
  case 'to-TO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_to_TO;
    break;
  case 'tr_CY':
  case 'tr-CY':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tr_CY;
    break;
  case 'tr_TR':
  case 'tr-TR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tr_TR;
    break;
  case 'tt':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tt;
    break;
  case 'tt_RU':
  case 'tt-RU':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tt_RU;
    break;
  case 'twq':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_twq;
    break;
  case 'twq_NE':
  case 'twq-NE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_twq_NE;
    break;
  case 'tzm':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tzm;
    break;
  case 'tzm_MA':
  case 'tzm-MA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tzm_MA;
    break;
  case 'ug':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ug;
    break;
  case 'ug_CN':
  case 'ug-CN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ug_CN;
    break;
  case 'uk_UA':
  case 'uk-UA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uk_UA;
    break;
  case 'ur_IN':
  case 'ur-IN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ur_IN;
    break;
  case 'ur_PK':
  case 'ur-PK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ur_PK;
    break;
  case 'uz_Arab':
  case 'uz-Arab':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uz_Arab;
    break;
  case 'uz_Arab_AF':
  case 'uz-Arab-AF':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uz_Arab_AF;
    break;
  case 'uz_Cyrl':
  case 'uz-Cyrl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uz_Cyrl;
    break;
  case 'uz_Cyrl_UZ':
  case 'uz-Cyrl-UZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uz_Cyrl_UZ;
    break;
  case 'uz_Latn':
  case 'uz-Latn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uz_Latn;
    break;
  case 'uz_Latn_UZ':
  case 'uz-Latn-UZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uz_Latn_UZ;
    break;
  case 'vai':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vai;
    break;
  case 'vai_Latn':
  case 'vai-Latn':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vai_Latn;
    break;
  case 'vai_Latn_LR':
  case 'vai-Latn-LR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vai_Latn_LR;
    break;
  case 'vai_Vaii':
  case 'vai-Vaii':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vai_Vaii;
    break;
  case 'vai_Vaii_LR':
  case 'vai-Vaii-LR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vai_Vaii_LR;
    break;
  case 'vi_VN':
  case 'vi-VN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vi_VN;
    break;
  case 'vun':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vun;
    break;
  case 'vun_TZ':
  case 'vun-TZ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vun_TZ;
    break;
  case 'wae':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_wae;
    break;
  case 'wae_CH':
  case 'wae-CH':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_wae_CH;
    break;
  case 'wo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_wo;
    break;
  case 'wo_SN':
  case 'wo-SN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_wo_SN;
    break;
  case 'xh':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_xh;
    break;
  case 'xh_ZA':
  case 'xh-ZA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_xh_ZA;
    break;
  case 'xog':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_xog;
    break;
  case 'xog_UG':
  case 'xog-UG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_xog_UG;
    break;
  case 'yav':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yav;
    break;
  case 'yav_CM':
  case 'yav-CM':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yav_CM;
    break;
  case 'yi':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yi;
    break;
  case 'yi_001':
  case 'yi-001':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yi_001;
    break;
  case 'yo':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yo;
    break;
  case 'yo_BJ':
  case 'yo-BJ':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yo_BJ;
    break;
  case 'yo_NG':
  case 'yo-NG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yo_NG;
    break;
  case 'yrl':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yrl;
    break;
  case 'yrl_BR':
  case 'yrl-BR':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yrl_BR;
    break;
  case 'yrl_CO':
  case 'yrl-CO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yrl_CO;
    break;
  case 'yrl_VE':
  case 'yrl-VE':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yrl_VE;
    break;
  case 'yue':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yue;
    break;
  case 'yue_Hans':
  case 'yue-Hans':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yue_Hans;
    break;
  case 'yue_Hans_CN':
  case 'yue-Hans-CN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yue_Hans_CN;
    break;
  case 'yue_Hant':
  case 'yue-Hant':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yue_Hant;
    break;
  case 'yue_Hant_HK':
  case 'yue-Hant-HK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_yue_Hant_HK;
    break;
  case 'zgh':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zgh;
    break;
  case 'zgh_MA':
  case 'zgh-MA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zgh_MA;
    break;
  case 'zh_Hans':
  case 'zh-Hans':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_Hans;
    break;
  case 'zh_Hans_CN':
  case 'zh-Hans-CN':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_Hans_CN;
    break;
  case 'zh_Hans_HK':
  case 'zh-Hans-HK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_Hans_HK;
    break;
  case 'zh_Hans_MO':
  case 'zh-Hans-MO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_Hans_MO;
    break;
  case 'zh_Hans_SG':
  case 'zh-Hans-SG':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_Hans_SG;
    break;
  case 'zh_Hant':
  case 'zh-Hant':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_Hant;
    break;
  case 'zh_Hant_HK':
  case 'zh-Hant-HK':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_Hant_HK;
    break;
  case 'zh_Hant_MO':
  case 'zh-Hant-MO':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_Hant_MO;
    break;
  case 'zh_Hant_TW':
  case 'zh-Hant-TW':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh_Hant_TW;
    break;
  case 'zu_ZA':
  case 'zu-ZA':
    goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zu_ZA;
    break;
}
