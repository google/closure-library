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

goog.provide('goog.locale.countryLanguageNamesTest');
goog.setTestOnly('goog.locale.countryLanguageNamesTest');

goog.require('goog.locale');
goog.require('goog.testing.jsunit');

var LocaleNameConstants_en;

function setUpPage() {
  // Test data from //googledata/i18n/js_locale_data/LocaleNameConstants__de.js
  var LocaleNameConstants_de = {
    LANGUAGE: {
      'cad': 'Caddo',
      'fr': 'Franz\u00f6sisch',
      'fr_CA': 'Canadian French',
      'fr_CH': 'Swiss French',
      'zh': 'Chinesisch',
      'zh_Hans': 'Chinesisch (vereinfacht)',
      'zh_Hant': 'Chinesisch (traditionell)'
    },
    COUNTRY: {'CN': 'China', 'ES': 'Spanien', 'FR': 'Frankreich'}
  };
  registerLocalNameConstants(LocaleNameConstants_de, 'de');

  // Test data from //googledata/i18n/js_locale_data/LocaleNameConstants__en.js
  LocaleNameConstants_en = {
    LANGUAGE: {
      'cad': 'Caddo',
      'fr': 'French',
      'fr_CA': 'Canadian French',
      'fr_CH': 'Swiss French',
      'zh': 'Chinese',
      'zh_Hans': 'Simplified Chinese',
      'zh_Hant': 'Traditional Chinese'
    },
    COUNTRY: {'CN': 'China', 'ES': 'Spain', 'FR': 'France'}
  };
  registerLocalNameConstants(LocaleNameConstants_en, 'en');

  goog.locale.setLocale('de');
}

function testLoadLoacleSymbols() {
  var result = goog.locale.getLocalizedCountryName('fr-FR');
  assertEquals('Frankreich', result);
}

function testGetNativeCountryName() {
  var result = goog.locale.getNativeCountryName('de-DE');
  assertEquals('Deutschland', result);

  result = goog.locale.getNativeCountryName('de_DE');
  assertEquals('Deutschland', result);

  result = goog.locale.getNativeCountryName('und');
  assertEquals('und', result);

  result = goog.locale.getNativeCountryName('de-CH');
  assertEquals('Schweiz', result);

  result = goog.locale.getNativeCountryName('fr-CH');
  assertEquals('Suisse', result);

  result = goog.locale.getNativeCountryName('it-CH');
  assertEquals('Svizzera', result);
}

function testGetLocalizedCountryName() {
  var result = goog.locale.getLocalizedCountryName('es-ES');
  assertEquals('Spanien', result);

  result = goog.locale.getLocalizedCountryName('es-ES', LocaleNameConstants_en);
  assertEquals('Spain', result);

  result = goog.locale.getLocalizedCountryName('zh-CN-cmn');
  assertEquals('China', result);

  result = goog.locale.getLocalizedCountryName('zh_CN_cmn');
  assertEquals('China', result);

  // 'und' is a non-existing locale, default behavior is to
  // return the locale name itself if no mapping is found.
  result = goog.locale.getLocalizedCountryName('und');
  assertEquals('und', result);
}


function testGetLocalizedRegionNameFromRegionCode() {
  var result = goog.locale.getLocalizedRegionNameFromRegionCode('ES');
  assertEquals('Spanien', result);

  result = goog.locale.getLocalizedRegionNameFromRegionCode(
      'ES', LocaleNameConstants_en);
  assertEquals('Spain', result);

  result = goog.locale.getLocalizedRegionNameFromRegionCode('CN');
  assertEquals('China', result);

  // 'XX' is a non-existing country code, default behavior is to
  // return the code itself if no mapping is found.
  result = goog.locale.getLocalizedRegionNameFromRegionCode('XX');
  assertEquals('XX', result);
}

function testGetNativeLanguageName() {
  var result = goog.locale.getNativeLanguageName('fr');
  assertEquals('fran\u00E7ais', result);

  result = goog.locale.getNativeLanguageName('fr-latn-FR');
  assertEquals('fran\u00E7ais', result);

  result = goog.locale.getNativeLanguageName('fr_FR');
  assertEquals('fran\u00E7ais', result);

  result = goog.locale.getNativeLanguageName('error');
  assertEquals('error', result);
}

function testGetLocalizedLanguageName() {
  var result = goog.locale.getLocalizedLanguageName('fr');
  assertEquals('Franz\u00F6sisch', result);

  result = goog.locale.getLocalizedLanguageName('fr', LocaleNameConstants_en);
  assertEquals('French', result);

  result = goog.locale.getLocalizedLanguageName('fr-latn-FR');
  assertEquals('Franz\u00F6sisch', result);

  result = goog.locale.getLocalizedLanguageName('fr_FR');
  assertEquals('Franz\u00F6sisch', result);

  result = goog.locale.getLocalizedLanguageName('cad');
  assertEquals('Caddo', result);

  result = goog.locale.getLocalizedLanguageName('error');
  assertEquals('error', result);

  result =
      goog.locale.getLocalizedLanguageName('zh_Hans', LocaleNameConstants_en);
  assertEquals('Simplified Chinese', result);
}


function testGetLocalizedLanguageNameForGivenSymbolset() {
  var result = goog.locale.getLocalizedCountryName('fr-FR');
  assertEquals('Frankreich', result);

  result = goog.locale.getLocalizedCountryName('fr-FR', LocaleNameConstants_en);
  assertEquals('France', result);

  result = goog.locale.getLocalizedCountryName('fr-FR');
  assertEquals('Frankreich', result);
}

/**
 * Valid combination of sub tags:
 *  1)  LanguageSubtag'-'RegionSubtag
 *  2)  LanguageSubtag'-'ScriptSubtag'-'RegionSubtag
 *  3)  LanguageSubtag'-'RegionSubtag'-'VariantSubtag
 *  4)  LanguageSubtag'-'ScriptSubTag'-'RegionSubtag'-'VariantSubtag
 */

function testGetRegionSubTag() {
  var result = goog.locale.getRegionSubTag('de-CH');
  assertEquals('CH', result);

  result = goog.locale.getRegionSubTag('de-latn-CH');
  assertEquals('CH', result);

  result = goog.locale.getRegionSubTag('de_latn_CH');
  assertEquals('CH', result);

  result = goog.locale.getRegionSubTag('de-CH-xxx');
  assertEquals('CH', result);

  result = goog.locale.getRegionSubTag('de-latn-CH-xxx');
  assertEquals('CH', result);

  result = goog.locale.getRegionSubTag('es-latn-419-xxx');
  assertEquals('419', result);

  result = goog.locale.getRegionSubTag('es_latn_419_xxx');
  assertEquals('419', result);

  // No region sub tag present
  result = goog.locale.getRegionSubTag('de');
  assertEquals('', result);
}

function testGetLanguageSubTag() {
  var result = goog.locale.getLanguageSubTag('de');
  assertEquals('de', result);

  result = goog.locale.getLanguageSubTag('de-DE');
  assertEquals('de', result);

  result = goog.locale.getLanguageSubTag('de-latn-DE-xxx');
  assertEquals('de', result);

  result = goog.locale.getLanguageSubTag('nds');
  assertEquals('nds', result);

  result = goog.locale.getLanguageSubTag('nds-DE');
  assertEquals('nds', result);
}

function testGetScriptSubTag() {
  var result = goog.locale.getScriptSubTag('fr');
  assertEquals('', result);

  result = goog.locale.getScriptSubTag('fr-Latn');
  assertEquals('Latn', result);

  result = goog.locale.getScriptSubTag('fr-Arab-AA');
  assertEquals('Arab', result);

  result = goog.locale.getScriptSubTag('de-Latin-DE');
  assertEquals('', result);

  result = goog.locale.getScriptSubTag('srn-Ar-DE');
  assertEquals('', result);
}
