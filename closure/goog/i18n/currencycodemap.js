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

/**
 * @fileoverview Currency code map.
 */


/**
 * Namespace for locale number format functions
 */
goog.provide('goog.i18n.currencyCodeMap');
goog.provide('goog.i18n.currencyCodeMapTier2');


/**
 * Deprecated.
 * The mapping of currency symbol through intl currency code.
 * The source of information is mostly from wikipedia and CLDR. Since there is
 * no authoritative source, items are judged by personal perception.

 * If an application need currency support that available in tier2, it
 * should extend currencyCodeMap to include tier2 data by doing this:
 *     goog.object.extend(goog.i18n.currencyCodeMap,
 *                        goog.i18n.currencyCodeMapTier2);
 *
 * @deprecated Use {@link goog.i18n.currency.getLocalCurrencyPattern} instead.
 * @const {!Object<string, string>}
 */
goog.i18n.currencyCodeMap = {
  'AED': '\u062F\u002e\u0625',
  'ARS': '$',
  'AUD': '$',
  'BDT': '\u09F3',
  'BRL': 'R$',
  'CAD': '$',
  'CHF': 'Fr.',
  'CLP': '$',
  'CNY': '\u00a5',
  'COP': '$',
  'CRC': '\u20a1',
  'CUP': '$',
  'CZK': 'K\u010d',
  'DKK': 'kr.',
  'DOP': 'RD$',
  'EGP': '\u00a3',
  'EUR': '\u20ac',
  'GBP': '\u00a3',
  'HKD': '$',
  'HRK': 'kn',
  'HUF': 'Ft',
  'IDR': 'Rp',
  'ILS': '\u20AA',
  'INR': 'Rs',
  'IQD': '\u0639\u062F',
  'ISK': 'kr',
  'JMD': '$',
  'JPY': '\u00a5',
  'KRW': '\u20A9',
  'KWD': '\u062F\u002e\u0643',
  'LKR': 'Rs',
  'LVL': 'Ls',
  'MNT': '\u20AE',
  'MXN': '$',
  'MYR': 'RM',
  'NOK': 'kr',
  'NZD': '$',
  'PAB': 'B/.',
  'PEN': 'S/.',
  'PHP': 'P',
  'PKR': 'Rs.',
  'PLN': 'z\u0142',
  'RON': 'L',
  'RUB': '\u20bd',
  'SAR': '\u0633\u002E\u0631',
  'SEK': 'kr',
  'SGD': '$',
  'SYP': 'SYP',
  'THB': '\u0e3f',
  'TRY': 'TL',
  'TWD': 'NT$',
  'USD': '$',
  'UYU': '$',
  'VEF': 'Bs.F',
  'VND': '\u20AB',
  'XAF': 'FCFA',
  'XCD': '$',
  'YER': 'YER',
  'ZAR': 'R'
};


/**
 * This group of currency data is unlikely to be used. In case they are,
 * program need to merge it into goog.locale.CurrencyCodeMap.
 *
 * @const {!Object<string, string>}
 */
goog.i18n.currencyCodeMapTier2 = {
  'AFN': '\u060b',
  'ALL': 'Lek',
  'AMD': '\u0564\u0580\u002e',
  'ANG': 'ANf.',
  'AOA': 'Kz',
  'AWG': '\u0192',
  'AZN': '\u20bc',
  'BAM': '\u041a\u041c',
  'BBD': '$',
  'BGN': '\u043b\u0432',
  'BHD': '\u0628\u002e\u062f\u002e',
  'BIF': 'FBu',
  'BMD': '$',
  'BND': '$',
  'BOB': 'B$',
  'BSD': '$',
  'BTN': 'Nu.',
  'BWP': 'P',
  'BYR': 'p.',
  'BZD': '$',
  'CDF': 'F',
  'CUC': 'CUC$',
  'CVE': '$',
  'DJF': 'Fdj',
  'DZD': '\u062f\u062C',
  'ERN': 'Nfk',
  'ETB': 'Br',
  'FJD': '$',
  'FKP': '\u00a3',
  'GEL': 'GEL',
  'GHS': '\u20B5',
  'GIP': '\u00a3',
  'GMD': 'D',
  'GNF': 'FG',
  'GTQ': 'Q',
  'GYD': '$',
  'HNL': 'L',
  'HTG': 'G',
  'IRR': '\ufdfc',
  'JOD': 'JOD',
  'KES': 'KSh',
  'KGS': 'som',
  'KHR': '\u17DB',
  'KMF': 'KMF',
  'KPW': '\u20A9',
  'KYD': '$',
  'KZT': 'KZT',
  'LAK': '\u20AD',
  'LBP': '\u0644\u002e\u0644',
  'LRD': '$',
  'LSL': 'L',
  'LTL': 'Lt',
  'LYD': '\u0644\u002e\u062F',
  'MAD': '\u0645\u002E\u062F\u002E',
  'MDL': 'MDL',
  'MGA': 'MGA',
  'MKD': 'MKD',
  'MMK': 'K',
  'MOP': 'MOP$',
  'MRO': 'UM',
  'MUR': 'Rs',
  'MVR': 'Rf',
  'MWK': 'MK',
  'MZN': 'MTn',
  'NAD': '$',
  'NGN': '\u20A6',
  'NIO': 'C$',
  'NPR': 'Rs',
  'OMR': '\u0639\u002E\u062F\u002E',
  'PGK': 'K',
  'PYG': 'Gs.',
  'QAR': '\u0642\u002E\u0631',
  'RSD': '\u0420\u0421\u0414',
  'RWF': 'RF',
  'SBD': '$',
  'SCR': 'SR',
  'SDG': 'SDG',
  'SHP': '\u00a3',
  'SLL': 'Le',
  'SOS': 'So. Sh.',
  'SRD': '$',
  'SSP': '£',
  'STD': 'Db',
  'SZL': 'L',
  'TJS': 'TJS',
  'TND': '\u062F\u002e\u062A ',
  'TOP': 'T$',
  'TTD': '$',
  'TZS': 'TZS',
  'UAH': 'грн.',
  'UGX': 'USh',
  'UZS': 'UZS',
  'VUV': 'Vt',
  'WST': 'WS$',
  'XOF': 'CFA',
  'XPF': 'F',
  'ZMW': 'ZMW',
  'ZWD': '$'
};
