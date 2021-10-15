/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for userAgentBrowser. */

goog.module('goog.labs.userAgent.browserTest');
goog.setTestOnly();

const googObject = goog.require('goog.object');
const highEntropyData = goog.require('goog.labs.userAgent.highEntropy.highEntropyData');
const testAgentData = goog.require('goog.labs.userAgent.testAgentData');
const testAgents = goog.require('goog.labs.userAgent.testAgents');
const testSuite = goog.require('goog.testing.testSuite');
const userAgentBrowser = goog.require('goog.labs.userAgent.browser');
const util = goog.require('goog.labs.userAgent.util');

/*
 * Map of browser name to checking method.
 * Used by assertBrowser() to verify that only one is true at a time.
 */
const Browser = {
  ANDROID_BROWSER: userAgentBrowser.isAndroidBrowser,
  CHROME: userAgentBrowser.isChrome,
  COAST: userAgentBrowser.isCoast,
  FIREFOX: userAgentBrowser.isFirefox,
  OPERA: userAgentBrowser.isOpera,
  IE: userAgentBrowser.isIE,
  IOS_WEBVIEW: userAgentBrowser.isIosWebview,
  SAFARI: userAgentBrowser.isSafari,
  SILK: userAgentBrowser.isSilk,
  EDGE: userAgentBrowser.isEdge
};

/*
 * Map of browser name to checking method.
 * Used by assertChromiumBrowser() to verify that only one is true at a time.
 */
const NonChromeChromiumBrowser = {
  EDGE_CHROMIUM: userAgentBrowser.isEdgeChromium,
  OPERA_CHROMIUM: userAgentBrowser.isOperaChromium
};

/*
 * Assert that the given browser is true and the others are false.
 */
function assertBrowser(browser) {
  assertTrue(
      'Supplied argument "browser" not in Browser object',
      googObject.containsValue(Browser, browser));

  // Verify that the method is true for the given browser
  // and false for all others.
  googObject.forEach(Browser, (f, name) => {
    if (f == browser) {
      assertTrue(`Value for browser ${name}`, f());
    } else {
      assertFalse('Value for browser ' + name, f());
    }
  });
}

/*
 * Assert that a given browser is a Chromium variant.
 */
function assertNonChromeChromiumBrowser(browser) {
  assertTrue(
      'Supplied argument "browser" not in ChromiumBrowser object',
      googObject.containsValue(NonChromeChromiumBrowser, browser));

  // Verify that the method is true for the given browser
  // and false for all others.
  googObject.forEach(NonChromeChromiumBrowser, (f, name) => {
    if (f == browser) {
      assertTrue(`Value for browser ${name}`, f());
    } else {
      assertFalse(`Value for browser ${name}`, f());
    }
  });
}

/**
 * Asserts that getVersion correctly returns the given version.
 * @param {string} version
 */
function assertPreUACHVersion(version) {
  assertEquals(version, userAgentBrowser.getVersion());
}

/**
 * Asserts that isVersionOrHigher correctly identifies that the browser version
 * is within the given range.
 * @param {string} lowVersion
 * @param {string} highVersion
 */
function assertPreUACHVersionBetween(lowVersion, highVersion) {
  assertTrue(userAgentBrowser.isVersionOrHigher(lowVersion));
  assertFalse(userAgentBrowser.isVersionOrHigher(highVersion));
}

/**
 * A string that is definitely not a browser brand, even as a GREASE value.
 */
const DEFINITELY_NOT_A_BROWSER =
    /** @type {!userAgentBrowser.Brand} */ ('Def1nitely not a browser');

/**
 * A list of brands used in assertVersionOf.
 * @const {!Array<!userAgentBrowser.Brand>}
 */
const brands = [
  userAgentBrowser.Brand.CHROMIUM,
  userAgentBrowser.Brand.FIREFOX,
  userAgentBrowser.Brand.IE,
  userAgentBrowser.Brand.EDGE,
  userAgentBrowser.Brand.OPERA,
  userAgentBrowser.Brand.SAFARI,
  DEFINITELY_NOT_A_BROWSER,
];

/**
 * Describes an object containing a browser brand and major version.
 * @record
 */
class BrandMajorVersion {
  constructor() {
    /** @type {!userAgentBrowser.Brand} */
    this.brand;

    /** @type {number} */
    this.version;
  }
}

/**
 * Describes an object containing a browser brand and full version.
 * @record
 */
class BrandFullVersion {
  constructor() {
    /** @type {!userAgentBrowser.Brand} */
    this.brand;

    /** @type {string} */
    this.version;
  }
}

/**
 * Assert that versionOf returns the correct version for each given brand, and
 * correctly returns NaN for brands not in the list.
 * @param {!Array<!BrandMajorVersion>} brandVersions
 */
function assertVersionOf(brandVersions) {
  for (const {brand, version} of brandVersions) {
    assertEquals(
        `versionOf(${brand}) returns non-NaN for a browser that is ${brand}`,
        version, userAgentBrowser.versionOf(brand));
  }
  for (const brand of brands) {
    if (!brandVersions.find(brandVersion => brandVersion.brand === brand)) {
      assertTrue(
          `versionOf(${brand}) returns NaN for a browser that is not ${brand}`,
          isNaN(userAgentBrowser.versionOf(brand)));
    }
  }
}

/**
 * Assert that fullVersionOf returns the correct full version for each given
 * brand, and correctly returns undefined for brands not in the list.
 * @param {!Array<!BrandFullVersion>} brandVersions A list of objects
 *     that represent which brands the browser is expected to match, and their
 *     corresponding versions.
 * @param {boolean=} alreadyLoaded Whether getIfLoaded() should be expected to
 * return a defined value before load() is ever called.
 */
async function assertFullVersionOf(brandVersions, alreadyLoaded = false) {
  highEntropyData.resetAllForTesting();

  // A test will call this function with alreadyLoaded = true if it is
  // expected that versions will be synchronously available without calling
  // load() for the first time. Otherwise, it should be expected that
  // getIfLoaded returns undefined.
  for (const {brand, version} of brandVersions) {
    const fullVersion = userAgentBrowser.fullVersionOf(brand);
    assertNotNullNorUndefined(fullVersion);
    if (alreadyLoaded) {
      assertEquals(
          version, fullVersion.getIfLoaded()?.toVersionStringForLogging());
    } else {
      assertNullOrUndefined(fullVersion.getIfLoaded());
    }
  }

  // Check that for each given brand-version pair, the requested version matches
  // what is expected for the given brand.
  for (const {brand, version} of brandVersions) {
    const fullVersion = userAgentBrowser.fullVersionOf(brand);
    assertNotNullNorUndefined(fullVersion);
    assertEquals(
        version, (await fullVersion.load()).toVersionStringForLogging());
    assertEquals(
        version, fullVersion.getIfLoaded()?.toVersionStringForLogging());
  }

  // Check that for all other browsers, there is no version for each brand.
  for (const brand of brands) {
    if (!brandVersions.find(brandVersion => brandVersion.brand === brand)) {
      assertUndefined(
          `fullVersionOf(${brand}) returns a value for a browser that is not ${
              brand}`,
          userAgentBrowser.fullVersionOf(brand));
    }
  }
}

/**
 * Assert that fullVersionOf returns a full version that is within the given
 * range.
 * @param {!userAgentBrowser.Brand} brand The brand for which the browser's
 *     version should be checked.
 * @param {string} lowVersion A version that is lower or equal to the browser's
 *     version for this brand.
 * @param {string} highVersion A version that is high than the browser's version
 *     for this brand.
 */
async function assertFullVersionOfBetween(brand, lowVersion, highVersion) {
  highEntropyData.resetAllForTesting();
  const fullVersion = userAgentBrowser.fullVersionOf(brand);
  assertNotNullNorUndefined(fullVersion);
  const loadedFullVersion = await fullVersion.load();
  assertNotNullNorUndefined(loadedFullVersion);
  assertTrue(loadedFullVersion.isAtLeast(lowVersion));
  assertFalse(loadedFullVersion.isAtLeast(highVersion));
}

/**
 * Assert that getVersionStringForLogging returns the most complete version
 * string for a given browser brand that is currently synchronously available.
 * @param {!userAgentBrowser.Brand} brand The brand for which the browser's
 *     version should be checked.
 * @param {string} lowEntropy The string that should be returned when only the
 *     major version is available, or the string that should always be returned
 *     (if highEntropy is not specified).
 * @param {string=} highEntropy The string that should be returned when the full
 *     version is available.
 */
async function assertGetVersionStringForLogging(
    brand, lowEntropy, highEntropy) {
  if (highEntropy === undefined) {
    highEntropy = lowEntropy;
  }
  highEntropyData.resetAllForTesting();
  const lowEntropyVersion =
      await userAgentBrowser.getVersionStringForLogging(brand);
  assertEquals(lowEntropy, lowEntropyVersion);
  try {
    await userAgentBrowser.fullVersionOf(brand)?.load();
  } catch (e) {
  }
  const highEntropyVersion =
      await userAgentBrowser.getVersionStringForLogging(brand);
  assertEquals(highEntropy, highEntropyVersion);
}

testSuite({
  setUp() {
    // setUserAgent uses the browser's original user agent string if null is
    // passed to it, so pass an empty string instead.
    util.setUserAgent('');
    util.setUserAgentData(null);
    highEntropyData.resetAllForTesting();
  },

  async testOpera10() {
    util.setUserAgent(testAgents.OPERA_10);
    assertBrowser(Browser.OPERA);
    assertPreUACHVersion('10.00');
    assertPreUACHVersionBetween('10.00', '10.10');

    assertVersionOf([{brand: userAgentBrowser.Brand.OPERA, version: 10}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.OPERA, version: '10.00'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.OPERA, '10.00', '10.10');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.OPERA, '10.00', '10.00');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testOperaMac() {
    util.setUserAgent(testAgents.OPERA_MAC);
    assertBrowser(Browser.OPERA);
    assertPreUACHVersion('11.52');
    assertPreUACHVersionBetween('11.50', '12.00');

    assertVersionOf([{brand: userAgentBrowser.Brand.OPERA, version: 11}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.OPERA, version: '11.52'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.OPERA, '11.50', '12.00');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.OPERA, '11.52', '11.52');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testOperaLinux() {
    util.setUserAgent(testAgents.OPERA_LINUX);
    assertBrowser(Browser.OPERA);
    assertPreUACHVersion('11.50');
    assertPreUACHVersionBetween('11.00', '12.00');

    assertVersionOf([{brand: userAgentBrowser.Brand.OPERA, version: 11}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.OPERA, version: '11.50'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.OPERA, '11.00', '12.00');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.OPERA, '11.50', '11.50');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testOpera15() {
    util.setUserAgent(testAgents.OPERA_15);
    // Opera 15 is Chromium 28.  We treat all Chromium variants as Chrome.
    assertBrowser(Browser.CHROME);
    assertNonChromeChromiumBrowser(NonChromeChromiumBrowser.OPERA_CHROMIUM);
    assertPreUACHVersion('28.0.1500.52');
    assertPreUACHVersionBetween('28.00', '29.00');

    assertVersionOf([
      {brand: userAgentBrowser.Brand.CHROMIUM, version: 28},
      {brand: userAgentBrowser.Brand.OPERA, version: 15}
    ]);
    await assertFullVersionOf(
        [
          {brand: userAgentBrowser.Brand.CHROMIUM, version: '28.0.1500.52'},
          {brand: userAgentBrowser.Brand.OPERA, version: '15.0.1147.100'}
        ],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '28.00', '29.00');
  },

  async testOperaMini() {
    util.setUserAgent(testAgents.OPERA_MINI);
    assertBrowser(Browser.OPERA);
    assertPreUACHVersion('11.10');
    assertPreUACHVersionBetween('11.00', '12.00');

    assertVersionOf([{brand: userAgentBrowser.Brand.OPERA, version: 11}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.OPERA, version: '11.10'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.OPERA, '11.00', '12.00');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.OPERA, '11.10', '11.10');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testIE6() {
    util.setUserAgent(testAgents.IE_6);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('6.0');
    assertPreUACHVersionBetween('5.0', '7.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.IE, version: 6}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.IE, version: '6.0'}], true);
    await assertFullVersionOfBetween(userAgentBrowser.Brand.IE, '5.0', '7.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.IE, '6.0', '6.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testIE7() {
    util.setUserAgent(testAgents.IE_7);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('7.0');
  },

  async testIE8() {
    util.setUserAgent(testAgents.IE_8);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('8.0');
    assertPreUACHVersionBetween('7.0', '9.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.IE, version: 8}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.IE, version: '8.0'}], true);
    await assertFullVersionOfBetween(userAgentBrowser.Brand.IE, '7.0', '9.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.IE, '8.0', '8.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testIE8Compatibility() {
    util.setUserAgent(testAgents.IE_8_COMPATIBILITY);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('8.0');
  },

  async testIE9() {
    util.setUserAgent(testAgents.IE_9);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('9.0');
    assertPreUACHVersionBetween('8.0', '10.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.IE, version: 9}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.IE, version: '9.0'}], true);
    await assertFullVersionOfBetween(userAgentBrowser.Brand.IE, '8.0', '10.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.IE, '9.0', '9.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testIE9Compatibility() {
    util.setUserAgent(testAgents.IE_9_COMPATIBILITY);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('9.0');
  },

  async testIE10() {
    util.setUserAgent(testAgents.IE_10);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('10.0');
    assertPreUACHVersionBetween('10.0', '11.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.IE, version: 10}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.IE, version: '10.0'}], true);
    await assertFullVersionOfBetween(userAgentBrowser.Brand.IE, '10.0', '11.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.IE, '10.0', '10.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testIE10Compatibility() {
    util.setUserAgent(testAgents.IE_10_COMPATIBILITY);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('10.0');
  },

  async testIE10Mobile() {
    util.setUserAgent(testAgents.IE_10_MOBILE);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('10.0');
  },

  async testIE11() {
    util.setUserAgent(testAgents.IE_11);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('11.0');
    assertPreUACHVersionBetween('10.0', '12.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.IE, version: 11}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.IE, version: '11.0'}], true);
    await assertFullVersionOfBetween(userAgentBrowser.Brand.IE, '10.0', '12.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.IE, '11.0', '11.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testIE11CompatibilityMSIE7() {
    util.setUserAgent(testAgents.IE_11_COMPATIBILITY_MSIE_7);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('11.0');
  },

  async testIE11CompatibilityMSIE9() {
    util.setUserAgent(testAgents.IE_11_COMPATIBILITY_MSIE_9);
    assertBrowser(Browser.IE);
    assertPreUACHVersion('11.0');
  },

  async testEdge120() {
    util.setUserAgent(testAgents.EDGE_12_0);
    assertBrowser(Browser.EDGE);
    assertPreUACHVersion('12.0');
    assertPreUACHVersionBetween('11.0', '13.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.EDGE, version: 12}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.EDGE, version: '12.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.EDGE, '11.0', '13.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.EDGE, '12.0', '12.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testEdge() {
    util.setUserAgent(testAgents.EDGE_12_9600);
    assertBrowser(Browser.EDGE);
    assertPreUACHVersion('12.9600');
    assertPreUACHVersionBetween('11.0', '13.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.EDGE, version: 12}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.EDGE, version: '12.9600'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.EDGE, '11.0', '13.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.EDGE, '12.9600', '12.9600');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testEdgeChromium() {
    util.setUserAgent(testAgents.EDGE_CHROMIUM);
    assertBrowser(Browser.CHROME);
    assertNonChromeChromiumBrowser(NonChromeChromiumBrowser.EDGE_CHROMIUM);
    assertPreUACHVersion('74.1.96.24');
    assertPreUACHVersionBetween('74.1', '74.2');

    assertVersionOf([
      {brand: userAgentBrowser.Brand.CHROMIUM, version: 74},
      {brand: userAgentBrowser.Brand.EDGE, version: 74}
    ]);
    await assertFullVersionOf(
        [
          {brand: userAgentBrowser.Brand.CHROMIUM, version: '74.0.3729.48'},
          {brand: userAgentBrowser.Brand.EDGE, version: '74.1.96.24'}
        ],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.EDGE, '74.1', '74.2');
  },

  async testFirefox19() {
    util.setUserAgent(testAgents.FIREFOX_19);
    assertBrowser(Browser.FIREFOX);
    assertPreUACHVersion('19.0');
    assertPreUACHVersionBetween('18.0', '20.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.FIREFOX, version: 19}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.FIREFOX, version: '19.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.FIREFOX, '18.0', '20.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.FIREFOX, '19.0', '19.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testFirefoxWindows() {
    util.setUserAgent(testAgents.FIREFOX_WINDOWS);
    assertBrowser(Browser.FIREFOX);
    assertPreUACHVersion('14.0.1');
    assertPreUACHVersionBetween('14.0', '15.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.FIREFOX, version: 14}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.FIREFOX, version: '14.0.1'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.FIREFOX, '14.0', '15.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.FIREFOX, '14.0.1', '14.0.1');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testFirefoxLinux() {
    util.setUserAgent(testAgents.FIREFOX_LINUX);
    assertBrowser(Browser.FIREFOX);
    assertTrue(userAgentBrowser.isFirefox());
    assertPreUACHVersion('15.0.1');
  },

  async testFirefoxiOS() {
    util.setUserAgent(testAgents.FIREFOX_IPHONE);
    assertBrowser(Browser.FIREFOX);
    assertTrue(userAgentBrowser.isFirefox());
    assertFalse(userAgentBrowser.isSafari());
    assertPreUACHVersion('1.0');
  },

  async testChromeAndroid() {
    util.setUserAgent(testAgents.CHROME_ANDROID);
    assertBrowser(Browser.CHROME);
    assertTrue(userAgentBrowser.isChrome());
    assertPreUACHVersion('18.0.1025.133');
    assertPreUACHVersionBetween('18.0', '19.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.CHROMIUM, version: 18}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.CHROMIUM, version: '18.0.1025.133'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '18.0', '19.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '18.0.1025.133', '18.0.1025.133');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
    assertPreUACHVersionBetween('17.0', '18.1');
  },

  async testChromeHeadless() {
    util.setUserAgent(testAgents.CHROME_HEADLESS);
    assertBrowser(Browser.CHROME);
    assertTrue(userAgentBrowser.isChrome());
    assertPreUACHVersion('79.0.3945.84');
    assertPreUACHVersionBetween('78.0', '80.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.CHROMIUM, version: 79}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.CHROMIUM, version: '79.0.3945.84'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '78.0', '80.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '79.0.3945.84', '79.0.3945.84');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
    assertPreUACHVersionBetween('79.0', '79.1');
  },

  async testChromeIphone() {
    util.setUserAgent(testAgents.CHROME_IPHONE);
    assertBrowser(Browser.CHROME);
    assertTrue(userAgentBrowser.isChrome());
    assertPreUACHVersion('22.0.1194.0');
    assertPreUACHVersionBetween('22.0', '23.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.CHROMIUM, version: 22}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.CHROMIUM, version: '22.0.1194.0'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '22.0', '23.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '22.0.1194.0', '22.0.1194.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
    assertPreUACHVersionBetween('22.0', '22.10');
  },

  async testChromeIpad() {
    util.setUserAgent(testAgents.CHROME_IPAD);
    assertBrowser(Browser.CHROME);
    assertTrue(userAgentBrowser.isChrome());
    assertPreUACHVersion('32.0.1700.20');
    assertPreUACHVersionBetween('32.0', '33.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.CHROMIUM, version: 32}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.CHROMIUM, version: '32.0.1700.20'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '32.0', '33.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '32.0.1700.20', '32.0.1700.20');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
    assertPreUACHVersionBetween('32.0', '32.10');
  },

  async testChromeMac() {
    util.setUserAgent(testAgents.CHROME_MAC);
    assertBrowser(Browser.CHROME);
    assertTrue(userAgentBrowser.isChrome());
    assertPreUACHVersion('24.0.1309.0');
    assertPreUACHVersionBetween('24.0', '25.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.CHROMIUM, version: 24}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.CHROMIUM, version: '24.0.1309.0'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '24.0', '25.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '24.0.1309.0', '24.0.1309.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
    assertPreUACHVersionBetween('24.0', '24.10');
  },

  async testSafariIpad() {
    util.setUserAgent(testAgents.IPAD_6);
    assertBrowser(Browser.SAFARI);
    assertTrue(userAgentBrowser.isSafari());
    assertPreUACHVersion('6.0');
    assertPreUACHVersionBetween('5.1', '7.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.SAFARI, version: 6}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.SAFARI, version: '6.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.SAFARI, '5.1', '7.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.SAFARI, '6.0', '6.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testSafari6() {
    util.setUserAgent(testAgents.SAFARI_6);
    assertBrowser(Browser.SAFARI);
    assertTrue(userAgentBrowser.isSafari());
    assertPreUACHVersion('6.0');
    assertPreUACHVersionBetween('6.0', '7.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.SAFARI, version: 6}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.SAFARI, version: '6.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.SAFARI, '6.0', '7.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.SAFARI, '6.0', '6.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testSafariIphone() {
    util.setUserAgent(testAgents.SAFARI_IPHONE_6);
    assertBrowser(Browser.SAFARI);
    assertTrue(userAgentBrowser.isSafari());
    assertPreUACHVersion('6.0');
    assertPreUACHVersionBetween('5.0', '7.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.SAFARI, version: 6}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.SAFARI, version: '6.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.SAFARI, '5.0', '7.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.SAFARI, '6.0', '6.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testSafariOnIphoneIos14() {
    util.setUserAgent(testAgents.SAFARI_IPHONE_IOS_14);
    assertBrowser(Browser.SAFARI);
    assertTrue(userAgentBrowser.isSafari());
    assertPreUACHVersion('14.1.1');
    assertPreUACHVersionBetween('14.0', '15.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.SAFARI, version: 14}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.SAFARI, version: '14.1.1'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.SAFARI, '14.0', '15.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.SAFARI, '14.1.1', '14.1.1');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testSafariOnIphoneIos15() {
    util.setUserAgent(testAgents.SAFARI_IPHONE_IOS_15);
    assertBrowser(Browser.SAFARI);
    assertTrue(userAgentBrowser.isSafari());
    assertPreUACHVersion('15.0');
    assertPreUACHVersionBetween('15.0', '16.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.SAFARI, version: 15}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.SAFARI, version: '15.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.SAFARI, '15.0', '16.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.SAFARI, '15.0', '15.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testSafariDesktopOnIpadIos15() {
    util.setUserAgent(testAgents.SAFARI_DESKTOP_IPAD_IOS_15);
    assertBrowser(Browser.SAFARI);
    assertTrue(userAgentBrowser.isSafari());
    assertPreUACHVersion('15.0');
    assertPreUACHVersionBetween('15.0', '16.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.SAFARI, version: 15}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.SAFARI, version: '15.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.SAFARI, '15.0', '16.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.SAFARI, '15.0', '15.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testSafariMobileOnIpadIos15() {
    util.setUserAgent(testAgents.SAFARI_MOBILE_IPAD_IOS_15);
    assertBrowser(Browser.SAFARI);
    assertTrue(userAgentBrowser.isSafari());
    assertPreUACHVersion('15.0');
    assertPreUACHVersionBetween('15.0', '16.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.SAFARI, version: 15}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.SAFARI, version: '15.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.SAFARI, '15.0', '16.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.SAFARI, '15.0', '15.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testSafariOnMacOsBigSur() {
    util.setUserAgent(testAgents.SAFARI_MAC_OS_BIG_SUR);
    assertBrowser(Browser.SAFARI);
    assertTrue(userAgentBrowser.isSafari());
    assertPreUACHVersion('14.1.2');
    assertPreUACHVersionBetween('14.1', '14.2');

    assertVersionOf([{brand: userAgentBrowser.Brand.SAFARI, version: 14}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.SAFARI, version: '14.1.2'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.SAFARI, '14.1', '14.2');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.SAFARI, '14.1.2', '14.1.2');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testCoast() {
    util.setUserAgent(testAgents.COAST);
    assertBrowser(Browser.COAST);
  },

  async testWebviewIOS() {
    util.setUserAgent(testAgents.WEBVIEW_IPHONE);
    assertBrowser(Browser.IOS_WEBVIEW);
    util.setUserAgent(testAgents.WEBVIEW_IPAD);
    assertBrowser(Browser.IOS_WEBVIEW);
  },

  async testAndroidBrowser235() {
    util.setUserAgent(testAgents.ANDROID_BROWSER_235);
    assertBrowser(Browser.ANDROID_BROWSER);
    assertPreUACHVersion('4.0');
    assertPreUACHVersionBetween('3.0', '5.0');

    assertVersionOf(
        [{brand: userAgentBrowser.Brand.ANDROID_BROWSER, version: 4}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.ANDROID_BROWSER, version: '4.0'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.ANDROID_BROWSER, '3.0', '5.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.ANDROID_BROWSER, '4.0', '4.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testAndroidBrowser403() {
    util.setUserAgent(testAgents.ANDROID_BROWSER_403);
    assertBrowser(Browser.ANDROID_BROWSER);
    assertPreUACHVersion('4.0');
    assertPreUACHVersionBetween('3.0', '5.0');

    assertVersionOf(
        [{brand: userAgentBrowser.Brand.ANDROID_BROWSER, version: 4}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.ANDROID_BROWSER, version: '4.0'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.ANDROID_BROWSER, '3.0', '5.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.ANDROID_BROWSER, '4.0', '4.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testAndroidBrowser233() {
    util.setUserAgent(testAgents.ANDROID_BROWSER_233);
    assertBrowser(Browser.ANDROID_BROWSER);
    assertPreUACHVersion('4.0');
    assertPreUACHVersionBetween('3.0', '5.0');

    assertVersionOf(
        [{brand: userAgentBrowser.Brand.ANDROID_BROWSER, version: 4}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.ANDROID_BROWSER, version: '4.0'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.ANDROID_BROWSER, '3.0', '5.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.ANDROID_BROWSER, '4.0', '4.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testAndroidWebView411() {
    util.setUserAgent(testAgents.ANDROID_WEB_VIEW_4_1_1);
    assertBrowser(Browser.ANDROID_BROWSER);
    assertPreUACHVersion('4.0');
    assertPreUACHVersionBetween('3.0', '5.0');

    assertVersionOf(
        [{brand: userAgentBrowser.Brand.ANDROID_BROWSER, version: 4}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.ANDROID_BROWSER, version: '4.0'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.ANDROID_BROWSER, '3.0', '5.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.ANDROID_BROWSER, '4.0', '4.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testAndroidWebView44() {
    util.setUserAgent(testAgents.ANDROID_WEB_VIEW_4_4);
    assertBrowser(Browser.CHROME);
    assertPreUACHVersion('30.0.0.0');
    assertPreUACHVersionBetween('29.0', '31.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.CHROMIUM, version: 30}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.CHROMIUM, version: '30.0.0.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '29.0', '31.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '30.0.0.0', '30.0.0.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testSilk() {
    util.setUserAgent(testAgents.KINDLE_FIRE);
    assertBrowser(Browser.SILK);
    assertPreUACHVersion('2.1');
  },

  async testFirefoxOnAndroidTablet() {
    util.setUserAgent(testAgents.FIREFOX_ANDROID_TABLET);
    assertBrowser(Browser.FIREFOX);
    assertPreUACHVersion('28.0');
    assertPreUACHVersionBetween('27.0', '29.0');

    assertVersionOf([{brand: userAgentBrowser.Brand.FIREFOX, version: 28}]);
    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.FIREFOX, version: '28.0'}], true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.FIREFOX, '27.0', '29.0');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.FIREFOX, '28.0', '28.0');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testOperaChromiumUserAgentData() {
    // Note: The full versions listed here are fictional, made up by bumping
    // a legitimate version's major version number by 10 (e.g. 91.* -> 101.*).
    const userAgentDataWithVersion = testAgentData.withHighEntropyData(
        testAgentData.OPERACHROMIUM_USERAGENT_DATA, {
          fullVersionList: [
            {brand: 'Chromium', version: '101.0.4472.164'},
            {brand: 'Opera', version: '87.0.4054.80'},
          ]
        });
    util.setUserAgentData(userAgentDataWithVersion);

    assertBrowser(Browser.CHROME);
    assertNonChromeChromiumBrowser(NonChromeChromiumBrowser.OPERA_CHROMIUM);
    assertFalse(userAgentBrowser.isOpera());

    assertVersionOf([
      {brand: userAgentBrowser.Brand.CHROMIUM, version: 101},
      {brand: userAgentBrowser.Brand.OPERA, version: 87}
    ]);

    await assertFullVersionOf([
      {brand: userAgentBrowser.Brand.OPERA, version: '87.0.4054.80'},
      {brand: userAgentBrowser.Brand.CHROMIUM, version: '101.0.4472.164'}
    ]);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.OPERA, '86.1', '87.1');
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '101.0', '109.1.4500');

    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '101', '101.0.4472.164');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.OPERA, '87', '87.0.4054.80');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testEdgeChromiumUserAgentData() {
    // Note: The full versions listed here are fictional, made up by bumping
    // a legitimate version's major version number by 10 (e.g. 91.* -> 101.*).
    const userAgentDataWithVersion = testAgentData.withHighEntropyData(
        testAgentData.EDGECHROMIUM_USERAGENT_DATA, {
          fullVersionList: [
            {brand: 'Chromium', version: '101.0.4472.77'},
            {brand: 'Microsoft Edge', version: '101.0.864.37'},
          ]
        });
    util.setUserAgentData(userAgentDataWithVersion);

    assertBrowser(Browser.CHROME);
    assertNonChromeChromiumBrowser(NonChromeChromiumBrowser.EDGE_CHROMIUM);
    assertFalse(userAgentBrowser.isEdge());

    assertVersionOf([
      {brand: userAgentBrowser.Brand.CHROMIUM, version: 101},
      {brand: userAgentBrowser.Brand.EDGE, version: 101}
    ]);

    await assertFullVersionOf([
      {brand: userAgentBrowser.Brand.CHROMIUM, version: '101.0.4472.77'},
      {brand: userAgentBrowser.Brand.EDGE, version: '101.0.864.37'}
    ]);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '101.0', '101.1');
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.EDGE, '101.0', '101.1');

    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '101', '101.0.4472.77');
    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.EDGE, '101', '101.0.864.37');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testChromeUserAgentData() {
    // Note: The full versions listed here are fictional, made up by bumping
    // a legitimate version's major version number by 10 (e.g. 91.* -> 101.*).
    const userAgentDataWithVersion = testAgentData.withHighEntropyData(
        testAgentData.CHROME_USERAGENT_DATA,
        {fullVersionList: [{brand: 'Chromium', version: '101.0.4472.77'}]});
    util.setUserAgentData(userAgentDataWithVersion);

    assertBrowser(Browser.CHROME);
    assertTrue(userAgentBrowser.isChrome());

    assertVersionOf([{brand: userAgentBrowser.Brand.CHROMIUM, version: 101}]);

    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.CHROMIUM, version: '101.0.4472.77'}]);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '101.0', '101.1');

    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '101', '101.0.4472.77');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  async testChromeNoFullVersionUserAgentData() {
    // For versions of Chrome where fullVersionList is not yet implemented, we
    // should fall back to navigator.userAgent. This is safe as long as there
    // is no version of Chrome where (1) fullVersionList is not implemented and
    // (2) the user agent string is at least partially frozen.
    util.setUserAgent(testAgents.CHROME_LINUX_91);
    util.setUserAgentData(
        testAgentData.CHROME_NO_FULLVERSIONLIST_USERAGENT_DATA);

    assertBrowser(Browser.CHROME);
    assertTrue(userAgentBrowser.isChrome());

    assertVersionOf([{brand: userAgentBrowser.Brand.CHROMIUM, version: 91}]);

    await assertFullVersionOf(
        [{brand: userAgentBrowser.Brand.CHROMIUM, version: '91.0.4472.77'}],
        true);
    await assertFullVersionOfBetween(
        userAgentBrowser.Brand.CHROMIUM, '91.0', '91.1');

    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '91.0.4472.77');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },

  testIncompleteUserAgentData() {
    util.setUserAgentData(testAgentData.INCOMPLETE_USERAGENT_DATA);
    util.setUserAgent(testAgents.CHROME_HEADLESS);
    assertBrowser(Browser.CHROME);
    assertTrue(userAgentBrowser.isChrome());
  },

  async testChromeUserAgentDataWithRejectedHighEntropyValues() {
    util.setUserAgentData(testAgentData.CHROME_USERAGENT_DATA);

    const fullChromeVersion =
        userAgentBrowser.fullVersionOf(userAgentBrowser.Brand.CHROMIUM);
    assertNotNullNorUndefined(fullChromeVersion);
    assertEquals(undefined, fullChromeVersion.getIfLoaded());

    await assertRejects(fullChromeVersion.load());
    assertEquals(undefined, fullChromeVersion.getIfLoaded());

    await assertGetVersionStringForLogging(
        userAgentBrowser.Brand.CHROMIUM, '101', '101');
    await assertGetVersionStringForLogging(DEFINITELY_NOT_A_BROWSER, '', '');
  },
});
