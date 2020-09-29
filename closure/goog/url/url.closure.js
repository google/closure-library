/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 *
 * @fileoverview Class for parsing strings into URLs using browser native
 * resolution.
 *
 * Use `resolveUrl` to resolve a url string with an optional base url string to
 * URL. Will throw an error if the resulting URL would not be valid. This can
 * be used in place of the [URL Web API][1] while providing support in IE and
 * working around various inconsistencies in Edge.
 *
 * Use `resolveRelativeUrl` to resolve any relative URL into an absolute URL for
 * the current location.
 *
 * Use `createUrl` to easily construct a new URL from an existing URL.
 *
 * This package attempts to follow the [WHATWG URL standard][2] where
 * possible, deviating only when there are significant advantages to doing so
 * such as splitting out searchParams from a property to a function call to
 * allow the compiler to remove the relevant polyfill code if unused, or
 * removing functionality that can cause confusion, unexpected
 * results, or unnecessary code size increases to the package. This package
 * also adds checks that are missing in some browsers (e.g. throwing errors when
 * a potential URL doesn't have a protocol or hostname), and generally tries to
 * ensure consistency among browsers while still accurately reporting how a
 * browser will interpret a given URL.
 *
 * Unlike goog.URI, this package is NOT intended to be used with URLs that are
 * "special", and is only guaranteed to return useful results for the schemes
 * listed in the spec (http(s), ws(s), ftp, file, blob). Various browsers
 * (Chrome included) do not correctly parse special URLs and the results will
 * be inaccurate in those cases. If you need to parse URLs using these
 * protocols, prefer to use goog.Uri (or goog.uri.utils) instead.
 * [1]: https://developer.mozilla.org/en-US/docs/Web/API/URL
 * [2]: https://url.spec.whatwg.org/
 *
 * Generated from: third_party/closure/goog/url/url.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('google3.third_party.javascript.closure.url.url');
var module = module || { id: 'third_party/closure/goog/url/url.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_asserts_1 = goog.requireType("goog.asserts");
const tsickle_iters_2 = goog.requireType("goog.collections.iters");
const tsickle_safe_3 = goog.requireType("goog.dom.safe");
const tsickle_uncheckedconversions_4 = goog.requireType("goog.html.uncheckedconversions");
const tsickle_Const_5 = goog.requireType("goog.string.Const");
const goog_goog_asserts_1 = goog.require('goog.asserts');
const goog_goog_collections_iters_1 = goog.require('goog.collections.iters');
const safe = goog.require('goog.dom.safe');
const uncheckedConversions = goog.require('goog.html.uncheckedconversions');
const goog_goog_string_Const_1 = goog.require('goog.string.Const');
/** @type {boolean} */
const ASSUME_COMPLIANT_URL_API = goog.define('ASSUME_COMPLIANT_URL_API', 
// TODO(user) narrow this down if earlier featureset years allow,
// if they get defined. FY2020 does NOT include Edge (EdgeHTML), which is
// good as workarounds are needed for spec compliance and a searchParams
// polyfill.
goog.FEATURESET_YEAR >= 2020);
/** @type {string} */
let urlBase = goog.global.document.baseURI ||
    // baseURI is not available in IE11 and earlier
    goog.global.window.location.href || '';
/**
 * For testing only - this adjusts the base used in `resolveRelativeUrl`.
 * Maybe this should just be visible to allow others using this package to test
 * it?
 * @package
 * @param {string} base
 * @return {void}
 */
function setUrlBaseForTesting(base) {
    urlBase = base;
}
exports.setUrlBaseForTesting = setUrlBaseForTesting;
/**
 * Feature-detection for native URL parsing
 * @type {boolean}
 */
const supportsNativeURLConstructor = {
    // TODO(user) Does this work without JSCompiler?
    /**
     * @return {boolean}
     */
    valueOf() {
        if (ASSUME_COMPLIANT_URL_API) {
            return true;
        }
        try {
            new URL('http://example.com');
            return true;
        }
        catch (e) {
            return false;
        }
    }
}.valueOf();
/**
 * ReadonlySearchParams partially implements the URLSearchParams interface,
 * excluding all mutability methods and some less-useful methods for reading the
 * underlying data. Exclusions:
 *  - append
 *  - delete
 *  - set
 *  - sort
 *  - values()
 *  - entries()
 *  - forEach(...)
 * @record
 * @extends {Iterable}
 */
function ReadonlySearchParams() { }
exports.ReadonlySearchParams = ReadonlySearchParams;
/* istanbul ignore if */
if (false) {
    /**
     * @param {string} key The key to retrieve a value for. Must not be url-encoded.
     * @return {(null|string)} The value. If a key is specified more than once, the first value
     *     is returned (as per the spec). All values will be url-decoded already.
     */
    ReadonlySearchParams.prototype.get = function (key) { };
    /**
     * @param {string} key The key to retrieve all values for. Must not be url-encoded.
     * @return {!ReadonlyArray<string>} The list of values for this key. Will return the
     *     empty array if there are no values for the key. All values will have
     *     been url-decoded already.
     */
    ReadonlySearchParams.prototype.getAll = function (key) { };
    /**
     * @param {string} key The key to search for. Must not be url-encoded.
     * @return {boolean} True iff this key exists within the search params.
     */
    ReadonlySearchParams.prototype.has = function (key) { };
    /**
     * Basic override.
     * @return {string}
     */
    ReadonlySearchParams.prototype.toString = function () { };
}
/**
 * A polyfill implementation of ReadonlySearchParams that is only used in older
 * browsers that don't natively support searchParams. This includes IE and Edge
 * (EdgeHTML).
 * @implements {ReadonlySearchParams}
 */
class SearchParamsImpl {
    /**
     * @param {string} search The search string from URL resolution. May
     *     optionally begin with '?', and is expected to be URL-encoded.
     */
    constructor(search) {
        if (search.indexOf('?') == 0) {
            search = search.substring(1);
        }
        /** @type {!Array<string>} */
        const params = search.split('&');
        /** @type {!Map<string, !Array<string>>} */
        const map = new Map();
        this.paramMap = map;
        for (let p of params) {
            /** @type {string} */
            let key = p;
            /** @type {string} */
            let val = '';
            /** @type {!Array<string>} */
            const keyValueSplit = p.split('=');
            /** @type {boolean} */
            const isKV = keyValueSplit.length > 1;
            if (isKV) {
                key = decodeURIComponent(keyValueSplit[0].replace('+', ' '));
                val = decodeURIComponent(keyValueSplit[1].replace('+', ' '));
            }
            /** @type {(undefined|!Array<string>)} */
            let entries = map.get(key);
            if (entries == null) {
                entries = [];
                map.set(key, entries);
            }
            entries.push(val);
        }
    }
    /**
     * @param {string} key
     * @return {(null|string)}
     */
    get(key) {
        /** @type {(undefined|!ReadonlyArray<string>)} */
        const values = this.paramMap.get(key);
        return values && values.length ? values[0] : null;
    }
    /**
     * @param {string} key
     * @return {!ReadonlyArray<string>}
     */
    getAll(key) {
        // As per the spec, this returns the "empty sequence" if the key is not
        // found.
        return [...(this.paramMap.get(key) || [])];
    }
    /**
     * @param {string} key
     * @return {boolean}
     */
    has(key) {
        return this.paramMap.has(key);
    }
    /**
     * @return {!IterableIterator<!ReadonlyArray<string>>}
     */
    [Symbol.iterator]() {
        return goog_goog_collections_iters_1.concat(...goog_goog_collections_iters_1.map(this.paramMap, (/**
         * @param {!Array<?>} e
         * @return {!IterableIterator<!Array<string>>}
         */
        (e) => {
            /** @type {string} */
            const key = e[0];
            /** @type {!ReadonlyArray<string>} */
            const values = e[1];
            return goog_goog_collections_iters_1.map(values, (/**
             * @param {string} v
             * @return {!Array<string>}
             */
            (v) => {
                return [key, v];
            }));
        })));
    }
    /**
     * @return {string}
     */
    toString() {
        return iterableSearchParamsToString(this);
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @type {!ReadonlyMap<string, !ReadonlyArray<string>>}
     * @private
     */
    SearchParamsImpl.prototype.paramMap;
}
/**
 * @param {!Iterable<!ReadonlyArray<string>>} iterable The iterable which acts like a URLSearchParams object (each
 *     iteration returns another key and value). Note that both keys and values
 *     must NOT be already URL encoded.
 * @return {string} The serialized SearchParams, with all keys and values
 *     correctly encoded.
 */
function iterableSearchParamsToString(iterable) {
    // Some characters are not form-encoded properly by encodeURIComponent, so we
    // enumerate their replacements here for use later.
    /**
     * @param {string} s
     * @return {string}
     */
    function encode(s) {
        // Form encoding is defined [in the spec][1] but there are some values that
        // are not encoded the right way by encodeURIComponent. Thus, we replace
        // their representation in the resulting encoded string with their actual
        // encoding.
        // [1]: https://url.spec.whatwg.org/#urlencoded-serializing
        return encodeURIComponent(s).replace(/[!()~']|(%20)/g, (/**
         * @param {string} c
         * @return {string}
         */
        (c) => {
            return ((/** @type {!Object<string,string>} */ ({
                '!': '%21',
                '(': '%28',
                ')': '%29',
                '%20': '+',
                '\'': '%27',
                '~': '%7E',
            })))[c];
        }));
    }
    ;
    return Array
        .from(iterable, (/**
     * @param {!ReadonlyArray<string>} keyValuePair
     * @return {string}
     */
    (keyValuePair) => encode(keyValuePair[0]) + '=' + encode(keyValuePair[1])))
        .join('&');
}
exports.iterableSearchParamsToString = iterableSearchParamsToString;
;
/**
 * UrlLike mirrors most of the public readonly interface of the URL object in
 * the URL Web API.
 * Notable exclusions:
 *  - toJson()
 *  - searchParams
 *
 * Instead of using the searchParams property, use `getSearchParams` from this
 * package. This allows for the relevant code to be removed when inspection of
 * search parameters is not needed.
 * @record
 */
function UrlLike() { }
exports.UrlLike = UrlLike;
/* istanbul ignore if */
if (false) {
    /** @type {string} */
    UrlLike.prototype.href;
    /** @type {string} */
    UrlLike.prototype.protocol;
    /** @type {string} */
    UrlLike.prototype.username;
    /** @type {string} */
    UrlLike.prototype.password;
    /** @type {string} */
    UrlLike.prototype.host;
    /** @type {string} */
    UrlLike.prototype.hostname;
    /** @type {string} */
    UrlLike.prototype.port;
    /** @type {string} */
    UrlLike.prototype.origin;
    /** @type {string} */
    UrlLike.prototype.pathname;
    /** @type {string} */
    UrlLike.prototype.search;
    /** @type {string} */
    UrlLike.prototype.hash;
    /**
     * @return {string}
     */
    UrlLike.prototype.toString = function () { };
}
/**
 * This function is equivalent to 'new URL(href)' in newer browsers, and will
 * automatically work around the Security Problems in IE, retrying the parse
 * automatically while extracting the userinfo.
 * @param {string} urlStr
 * @return {!UrlLike} A canonicalized version of the information from the URL.
 *     Will throw if the resulting URL is invalid.
 */
function createAnchorElementInIE(urlStr) {
    /** @type {!HTMLAnchorElement} */
    const aTag = document.createElement('a');
    /** @type {?} */
    let protocol;
    try {
        safe.setAnchorHref(aTag, uncheckedConversions.safeUrlFromStringKnownToSatisfyTypeContract(goog_goog_string_Const_1.from('This url is attached to an Anchor tag that is NEVER attached ' +
            ' to the DOM and is not returned from this function.'), urlStr));
        // If the URL is actually invalid, trying to read from it will throw.
        protocol = aTag.protocol;
    }
    catch (e) {
        // We catch and re-throw an error here as the default error in IE is
        // simply 'Invalid argument.' with no useful information.
        throw new Error(`${urlStr} is not a valid URL.`);
    }
    // The anchor tag will be created and assigned some values, but a URL missing
    // a protocol and/or hostname is not valid in a browser and other browsers URL
    // APIs reject them.
    // '' : IE11.719.18362, IE11.0.9600
    // ':' : IE11.??? (web testing version as of 04/03/2020)
    // last char != ':': hunch...
    if (protocol === '' || protocol === ':' ||
        protocol[protocol.length - 1] != ':') {
        throw new Error(`${urlStr} is not a valid URL.`);
    }
    if (!canonicalPortForProtocols.has(protocol)) {
        throw new Error(`${urlStr} is not a valid URL.`);
    }
    if (!aTag.hostname) {
        throw new Error(`${urlStr} is not a valid URL.`);
    }
    /** @type {?} */
    const urlLike = (/** @type {?} */ ({
        href: aTag.href,
        protocol: aTag.protocol,
        username: '',
        password: '',
        // Host, origin, and port assigned below after canonicalization.
        hostname: aTag.hostname,
        pathname: '/' + aTag.pathname,
        search: aTag.search,
        hash: aTag.hash,
    }));
    // Canonicalize the port out from the URL if it matches
    /** @type {(undefined|string)} */
    const canonicalPort = canonicalPortForProtocols.get(aTag.protocol);
    if (canonicalPort === aTag.port) {
        urlLike.host = urlLike.hostname;
        urlLike.port = '';
        // This does not work for blob and file protocol types - they are far more
        // complicated.
        urlLike.origin = urlLike.protocol + '//' + urlLike.hostname;
    }
    else {
        urlLike.host = aTag.host;
        urlLike.port = aTag.port;
        urlLike.origin =
            urlLike.protocol + '//' + urlLike.hostname + ':' + urlLike.port;
    }
    return urlLike;
}
exports.createAnchorElementInIE = createAnchorElementInIE;
;
/**
 * @param {(null|string)} username
 * @param {(null|string)} password
 * @return {string} The serialized userinfo string
 */
function assembleUserInfo(username, password) {
    if (username && password) {
        return username + ':' + password + '@';
    }
    else if (username) {
        return username + '@';
    }
    else if (password) {
        return ':' + password + '@';
    }
    else {
        return '';
    }
}
;
/**
 * This function wraps 'new URL(href)' in newer browsers adds common checks for
 * parts of the URL spec (e.g. no protocol, no hostname for well-known protocols
 * like HTTP(s) and WS(S)) that some browsers don't adhere to. It also adds
 * origin construction for browsers that don't support it (Edge).
 * @param {string} urlStr
 * @return {!UrlLike}
 */
function urlParseWithCommonChecks(urlStr) {
    /** @type {?} */
    let res;
    try {
        res = new URL(urlStr);
    }
    catch (e) {
        throw new Error(`${urlStr} is not a valid URL.`);
    }
    /** @type {(undefined|string)} */
    const canonicalPort = canonicalPortForProtocols.get(res.protocol);
    if (!canonicalPort) {
        throw new Error(`${urlStr} is not a valid URL.`);
    }
    if (!res.hostname) {
        throw new Error(`${urlStr} is not a valid URL.`);
    }
    // For some protocols, Edge doen't know how to construct the origin.
    if (res.origin != 'null') {
        return res;
    }
    // We can't assign to the native object's origin property (it is ignored), so
    // we make a copy here.
    /** @type {!UrlLike} */
    const urlLike = (/** @type {!UrlLike} */ ({
        href: res.href,
        protocol: res.protocol,
        username: '',
        password: '',
        host: res.host,
        port: res.port,
        // origin assigned below after canonicalization.
        hostname: res.hostname,
        pathname: res.pathname,
        search: res.search,
        // We don't copy searchParams because Edge doesn't have it anyways.
        hash: res.hash,
    }));
    if (canonicalPort === res.port) {
        // This does not work for blob and file protocol types - they are far more
        // complicated.
        ((/** @type {{origin: string}} */ (urlLike))).origin = res.protocol + '//' + res.hostname;
    }
    else {
        ((/** @type {{origin: string}} */ (urlLike))).origin =
            res.protocol + '//' + res.hostname + ':' + res.port;
    }
    return urlLike;
}
;
/**
 * Resolves the given url string (with the optional base) into a URL object
 * according to the [URL spec][https://url.spec.whatwg.org/]. Will throw an
 * error if the resulting URL is invalid or if the browser can't or won't use
 * that URL for some reason. Relative URLs are considered invalid without a base
 * and will throw an error - please use `resolveRelativeUrl` instead for this
 * use-case.
 *
 * Note that calling resolveUrl with both urlStr and baseStr may have surprising
 * behavior. For example, any invocation with both parameters will never use the
 * hash value from baseStr. Similarly, passing a path segment in urlStr will
 * append (or replace) the path in baseStr, but will ALSO exclude the search and
 * hash portions of baseStr from the resulting URL. See the unit tests
 * (specifically testWithBase* test cases) for examples.
 *
 * Compatibility notes:
 * - both IE (all versions) and Edge (EdgeHTML only) disallow URLs to have user
 *   information in them, and parsing those strings will throw an error.
 * - FireFox disallows URLs with just a password in the userinfo.
 * @param {string} urlStr A potential absolute URL as a string, or a relative
 *     URL if baseStr is provided.
 * @param {(undefined|string)=} baseStr An optional base url as a string, only required if
 *     the url is relative.
 * @return {!UrlLike} An object that describes the various parts of the URL if
 *     valid. Throws an error if invalid. While this object is the native URL
 *     object where possible, users should NOT rely on this property and instead
 *     treat it as a simple record.
 */
function resolveUrl(urlStr, baseStr) {
    if (ASSUME_COMPLIANT_URL_API) {
        // Safari throws a TypeError if you call the constructor with a second
        // argument that isn't defined, so we can't pass baseStr all the time.
        return baseStr ? new URL(urlStr, baseStr) : new URL(urlStr);
    }
    // Ideally, this should effectively become
    // if Edge
    // and the else should effectively become
    // if IE
    // TODO(user) Some use of FEATURESET_YEAR near here would help strip
    // down the implementation even more for browsers we are more sure support the
    // URL Web API (including Edge). 2019? Maybe?
    if (supportsNativeURLConstructor) {
        if (!baseStr) {
            return urlParseWithCommonChecks(urlStr);
        }
        // Edge doesn't throw if baseStr is not a valid absolute URL when the
        // urlStr is absolute. This is against the spec, so try and parse this with
        // commonChecks (which will throw if baseStr is not a valid absolute URL).
        /** @type {!UrlLike} */
        const baseUrl = urlParseWithCommonChecks(baseStr);
        // If urlStr is present and absolute, then only those values are used.
        try {
            return urlParseWithCommonChecks(urlStr);
        }
        catch (e) {
            // urlStr is not absolute. We shall give both pieces to the constructor
            // below and see what it thinks.
        }
        return new URL(urlStr, baseUrl.href);
    }
    else {
        if (!baseStr) {
            return createAnchorElementInIE(urlStr);
        }
        // It is against the spec to provide a baseStr that is not absolute.
        /** @type {!UrlLike} */
        const baseUrl = createAnchorElementInIE(baseStr);
        // If urlStr is present and absolute, then only those values are used even
        // if baseStr is defined. The spec says we must try and parse baseStr first
        // (and error on it) before we do this though.
        try {
            return createAnchorElementInIE(urlStr);
        }
        catch (e) {
            // urlStr is not absolute. We shall assemble base pieces + url pieces
            // below.
            // Deliberate fallthrough
        }
        // If the base is present and absolute, check for special characters that
        // help determine what parts of base we use vs the relative parts.
        // This is similar to the [state machine][1] mentioned in the
        // spec except we already know that urlStr is NOT absolute.
        // [1]: https://url.spec.whatwg.org/#relative-state
        /** @type {string} */
        const newBaseStr = baseUrl.protocol + '//' +
            assembleUserInfo(baseUrl.username, baseUrl.password) + baseUrl.host;
        /** @type {?} */
        let /** string */ href;
        /** @type {string} */
        const firstChar = urlStr[0];
        if (firstChar === '/' || firstChar === '\\') {
            href = newBaseStr + urlStr;
        }
        else if (firstChar === '?') {
            href = newBaseStr + baseUrl.pathname + urlStr;
        }
        else if (!firstChar || firstChar === '#') {
            href = newBaseStr + baseUrl.pathname + baseUrl.search + urlStr;
        }
        else {
            // This doesn't start with any of the authority terminating characters,
            // but other browsers treat it implicitly as an extension to the existing
            // path, removing anything after the last '/' and appending urlStr to it.
            /** @type {number} */
            const lastPathSeparator = baseUrl.pathname.lastIndexOf('/');
            /** @type {string} */
            const path = lastPathSeparator > 0 ?
                baseUrl.pathname.substring(0, lastPathSeparator) :
                '';
            href = newBaseStr + path + '/' + urlStr;
        }
        return createAnchorElementInIE(href);
    }
}
exports.resolveUrl = resolveUrl;
;
/**
 * Browsers will canonicalize a URL if the scheme has a "canonical" port for it.
 * This maps schemes to their canonical port. These mappings are defined in the
 * [spec][1].
 *
 * [1]: https://url.spec.whatwg.org/#url-miscellaneous
 * @type {!Map<string, string>}
 */
const canonicalPortForProtocols = new Map([
    ['http:', '80'],
    ['https:', '443'],
    ['ws:', '80'],
    ['wss:', '443'],
    ['ftp:', '21'],
]);
/**
 * Returns a URLSearchParams-like object for a given URL object. This is used
 * instead of the native URL object's 'searchParams' property to allow the
 * Closure Compiler to code-strip the polyfill if searchParams are never used.
 * @param {(!UrlLike|!URL)} url The URL object to derive SearchParams for.
 * @return {!ReadonlySearchParams} The URLSearchParams-like object for the URL.
 */
function getSearchParams(url) {
    if (goog.FEATURESET_YEAR >= 2020 ||
        (supportsNativeURLConstructor &&
            ((/** @type {{searchParams: !ReadonlySearchParams}} */ (url))).searchParams)) {
        return ((/** @type {{searchParams: !ReadonlySearchParams}} */ (url))).searchParams;
    }
    return new SearchParamsImpl(url.search);
}
exports.getSearchParams = getSearchParams;
;
/**
 * Resolves the given relative URL string without requiring a specific base URL
 * (unlike resolveUrl). Will resolve the relative URL against the current
 * document's BaseURI, and the resulting URL WILL contain properties from
 * this URI.
 * @param {string} relativeURL A string which may be only a relative URL (i.e.
 *     has no protocol, userinfo, hostname, or port).
 * @return {!UrlLike} A URL that is relative to the current document's Base URI
 *     with all the relevant relative parts from the input parameter.
 */
function resolveRelativeUrl(relativeURL) {
    return resolveUrl(relativeURL, urlBase);
}
exports.resolveRelativeUrl = resolveRelativeUrl;
;
/**
 * @record
 */
function UrlPrimitivePartsPartial() { }
exports.UrlPrimitivePartsPartial = UrlPrimitivePartsPartial;
/* istanbul ignore if */
if (false) {
    /** @type {(undefined|string)} */
    UrlPrimitivePartsPartial.prototype.protocol;
    /** @type {(undefined|string)} */
    UrlPrimitivePartsPartial.prototype.username;
    /** @type {(undefined|string)} */
    UrlPrimitivePartsPartial.prototype.password;
    /** @type {(undefined|string)} */
    UrlPrimitivePartsPartial.prototype.hostname;
    /** @type {(undefined|string)} */
    UrlPrimitivePartsPartial.prototype.port;
    /** @type {(undefined|string)} */
    UrlPrimitivePartsPartial.prototype.pathname;
    /** @type {(undefined|string)} */
    UrlPrimitivePartsPartial.prototype.search;
    /** @type {(undefined|!Iterable<!ReadonlyArray<string>>)} */
    UrlPrimitivePartsPartial.prototype.searchParams;
    /** @type {(undefined|string)} */
    UrlPrimitivePartsPartial.prototype.hash;
}
/**
 * Creates a new URL object from primitve parts, optionally allowing for some of
 * those parts to be taken from a base URL object. Parts only accepts primitive
 * parts of the URL (e.g will NOT accept origin or host) for simplicity, and
 * only accepts either a search OR searchParams property, not both at the same
 * time. The resulting URL-like string is then parsed by `resolveUrl`, and as
 * such this method will also throw an error if the result is not a valid URL
 * (unlike Object.assign and other similar combinations of object properties).
 *
 * This method does some validation of its inputs, and in general is NOT a good
 * way to clone an existing URL object. For that purpose, prefer to use
 * `resolveUrl(existingURLObject.href)`.
 * @param {!UrlPrimitivePartsPartial} parts The parts that should be combined together to create a new URL.
 * @param {(undefined|!UrlLike)=} base An optional base whose primitive parts are used if
 *     they are not specified in the parts param. If all required primitive
 *     parts (host, protocol) are specified in the parts param, this can be
 *     omitted.
 * @return {!UrlLike} The resulting URL object if valid. Will throw an error if
 *     the resulting combination of parts and base is invalid.
 */
function createUrl(parts, base) {
    goog_goog_asserts_1.assert(!(parts.search && parts.searchParams), 'Only provide search or searchParams, not both');
    // Alas we cannot use Object.assign as the native URL object will not let its
    // properties be copied over.
    /** @type {?} */
    let newParts = (/** @type {?} */ ({}));
    if (base) {
        newParts.protocol = base.protocol;
        newParts.username = base.username;
        newParts.password = base.password;
        newParts.hostname = base.hostname;
        newParts.port = base.port;
        newParts.pathname = base.pathname;
        newParts.search = base.search;
        // Note we don't copy over searchParams here as we won't use it anyways.
        // search should be available instead.
        newParts.hash = base.hash;
    }
    Object.assign(newParts, parts);
    // Check for spec compliance
    if (newParts.port && newParts.port[0] === ':') {
        throw new Error('port should not start with \':\'');
    }
    if (newParts.hash && newParts.hash[0] != '#') {
        newParts.hash = '#' + newParts.hash;
    }
    // Manually assign search/searchParams from parts and clean up newParts so it
    // only specifies a search property.
    // precedence is as follows:
    // parts.search
    // parts.searchParams
    // newParts.search (aka base.search)
    if (parts.search) {
        if (parts.search[0] != '?') {
            newParts.search = '?' + parts.search;
        }
        // newParts.search is already equal to parts.search due to Object.assign
        // above. searchParams will be undefined here as it isn't copied from base.
    }
    else if (parts.searchParams) {
        newParts.search = '?' + iterableSearchParamsToString(parts.searchParams);
        // Not strictly necessary, but clear searchParams now we have serialized it.
        newParts.searchParams = undefined;
    }
    /** @type {string} */
    let sb = '';
    if (newParts.protocol) {
        sb += newParts.protocol + '//';
    }
    /** @type {string} */
    const userinfo = assembleUserInfo(newParts.username, newParts.password);
    sb += userinfo;
    sb += newParts.hostname || '';
    if (newParts.port) {
        sb += ':' + newParts.port;
    }
    sb += newParts.pathname || '';
    sb += newParts.search || '';
    sb += newParts.hash || '';
    return resolveUrl(sb);
}
exports.createUrl = createUrl;
;
/** @typedef {?} */
var InitializableUrlLike;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdGhpcmRfcGFydHkvamF2YXNjcmlwdC9jbG9zdXJlL3VybC91cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUNBLHlEQUF5QztBQUN6Qyw2RUFBeUY7QUFDekYsMkNBQTJDO0FBQzNDLDRFQUE0RTtBQUM1RSxtRUFBaUQ7O01BRzNDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxNQUFNLENBQ3hDLDBCQUEwQjtBQUMxQixpRUFBaUU7QUFDakUseUVBQXlFO0FBQ3pFLHdFQUF3RTtBQUN4RSxZQUFZO0FBQ1osSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUM7O0lBRTdCLE9BQU8sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPO0lBQzlDLCtDQUErQztJQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUU7Ozs7Ozs7OztBQVExQyxTQUFnQixvQkFBb0IsQ0FBQyxJQUFZO0lBQy9DLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDakIsQ0FBQztBQUZELG9EQUVDOzs7OztNQU1LLDRCQUE0QixHQUFZOzs7OztJQUU1QyxPQUFPO1FBQ0wsSUFBSSx3QkFBd0IsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSTtZQUNGLElBQUksR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Q0FDRixDQUFDLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0FBY1gsbUNBMEJDOzs7Ozs7Ozs7SUFwQkMsd0RBQThCOzs7Ozs7O0lBUTlCLDJEQUF1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QjtJQUNELEVBQUUsSUFBSSxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztJQUM5QixFQUFFLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDNUIsRUFBRSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzFCLE9BQU8sVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUE5REQsOEJBOERDO0FBQUEsQ0FBQzs7QUFFRix5QkFFa0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgVGhlIENsb3N1cmUgTGlicmFyeSBBdXRob3JzLlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgQ2xhc3MgZm9yIHBhcnNpbmcgc3RyaW5ncyBpbnRvIFVSTHMgdXNpbmcgYnJvd3NlciBuYXRpdmVcbiAqIHJlc29sdXRpb24uXG4gKlxuICogVXNlIGByZXNvbHZlVXJsYCB0byByZXNvbHZlIGEgdXJsIHN0cmluZyB3aXRoIGFuIG9wdGlvbmFsIGJhc2UgdXJsIHN0cmluZyB0b1xuICogVVJMLiBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSByZXN1bHRpbmcgVVJMIHdvdWxkIG5vdCBiZSB2YWxpZC4gVGhpcyBjYW5cbiAqIGJlIHVzZWQgaW4gcGxhY2Ugb2YgdGhlIFtVUkwgV2ViIEFQSV1bMV0gd2hpbGUgcHJvdmlkaW5nIHN1cHBvcnQgaW4gSUUgYW5kXG4gKiB3b3JraW5nIGFyb3VuZCB2YXJpb3VzIGluY29uc2lzdGVuY2llcyBpbiBFZGdlLlxuICpcbiAqIFVzZSBgcmVzb2x2ZVJlbGF0aXZlVXJsYCB0byByZXNvbHZlIGFueSByZWxhdGl2ZSBVUkwgaW50byBhbiBhYnNvbHV0ZSBVUkwgZm9yXG4gKiB0aGUgY3VycmVudCBsb2NhdGlvbi5cbiAqXG4gKiBVc2UgYGNyZWF0ZVVybGAgdG8gZWFzaWx5IGNvbnN0cnVjdCBhIG5ldyBVUkwgZnJvbSBhbiBleGlzdGluZyBVUkwuXG4gKlxuICogVGhpcyBwYWNrYWdlIGF0dGVtcHRzIHRvIGZvbGxvdyB0aGUgW1dIQVRXRyBVUkwgc3RhbmRhcmRdWzJdIHdoZXJlXG4gKiBwb3NzaWJsZSwgZGV2aWF0aW5nIG9ubHkgd2hlbiB0aGVyZSBhcmUgc2lnbmlmaWNhbnQgYWR2YW50YWdlcyB0byBkb2luZyBzb1xuICogc3VjaCBhcyBzcGxpdHRpbmcgb3V0IHNlYXJjaFBhcmFtcyBmcm9tIGEgcHJvcGVydHkgdG8gYSBmdW5jdGlvbiBjYWxsIHRvXG4gKiBhbGxvdyB0aGUgY29tcGlsZXIgdG8gcmVtb3ZlIHRoZSByZWxldmFudCBwb2x5ZmlsbCBjb2RlIGlmIHVudXNlZCwgb3JcbiAqIHJlbW92aW5nIGZ1bmN0aW9uYWxpdHkgdGhhdCBjYW4gY2F1c2UgY29uZnVzaW9uLCB1bmV4cGVjdGVkXG4gKiByZXN1bHRzLCBvciB1bm5lY2Vzc2FyeSBjb2RlIHNpemUgaW5jcmVhc2VzIHRvIHRoZSBwYWNrYWdlLiBUaGlzIHBhY2thZ2VcbiAqIGFsc28gYWRkcyBjaGVja3MgdGhhdCBhcmUgbWlzc2luZyBpbiBzb21lIGJyb3dzZXJzIChlLmcuIHRocm93aW5nIGVycm9ycyB3aGVuXG4gKiBhIHBvdGVudGlhbCBVUkwgZG9lc24ndCBoYXZlIGEgcHJvdG9jb2wgb3IgaG9zdG5hbWUpLCBhbmQgZ2VuZXJhbGx5IHRyaWVzIHRvXG4gKiBlbnN1cmUgY29uc2lzdGVuY3kgYW1vbmcgYnJvd3NlcnMgd2hpbGUgc3RpbGwgYWNjdXJhdGVseSByZXBvcnRpbmcgaG93IGFcbiAqIGJyb3dzZXIgd2lsbCBpbnRlcnByZXQgYSBnaXZlbiBVUkwuXG4gKlxuICogVW5saWtlIGdvb2cuVVJJLCB0aGlzIHBhY2thZ2UgaXMgTk9UIGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aCBVUkxzIHRoYXQgYXJlXG4gKiBcInNwZWNpYWxcIiwgYW5kIGlzIG9ubHkgZ3VhcmFudGVlZCB0byByZXR1cm4gdXNlZnVsIHJlc3VsdHMgZm9yIHRoZSBzY2hlbWVzXG4gKiBsaXN0ZWQgaW4gdGhlIHNwZWMgKGh0dHAocyksIHdzKHMpLCBmdHAsIGZpbGUsIGJsb2IpLiBWYXJpb3VzIGJyb3dzZXJzXG4gKiAoQ2hyb21lIGluY2x1ZGVkKSBkbyBub3QgY29ycmVjdGx5IHBhcnNlIHNwZWNpYWwgVVJMcyBhbmQgdGhlIHJlc3VsdHMgd2lsbFxuICogYmUgaW5hY2N1cmF0ZSBpbiB0aG9zZSBjYXNlcy4gSWYgeW91IG5lZWQgdG8gcGFyc2UgVVJMcyB1c2luZyB0aGVzZVxuICogcHJvdG9jb2xzLCBwcmVmZXIgdG8gdXNlIGdvb2cuVXJpIChvciBnb29nLnVyaS51dGlscykgaW5zdGVhZC5cbiAqIFsxXTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTFxuICogWzJdOiBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvXG4gKi9cblxuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2dvb2c6Z29vZy5hc3NlcnRzJztcbmltcG9ydCB7Y29uY2F0IGFzIGl0ZXJhYmxlQ29uY2F0LCBtYXAgYXMgaXRlcmFibGVNYXB9IGZyb20gJ2dvb2c6Z29vZy5jb2xsZWN0aW9ucy5pdGVycyc7XG5pbXBvcnQgKiBhcyBzYWZlIGZyb20gJ2dvb2c6Z29vZy5kb20uc2FmZSc7XG5pbXBvcnQgKiBhcyB1bmNoZWNrZWRDb252ZXJzaW9ucyBmcm9tICdnb29nOmdvb2cuaHRtbC51bmNoZWNrZWRjb252ZXJzaW9ucyc7XG5pbXBvcnQgQ29uc3RTdHJpbmcgZnJvbSAnZ29vZzpnb29nLnN0cmluZy5Db25zdCc7XG5cbi8qKiBAZGVmaW5lIHtib29sZWFufSAqL1xuY29uc3QgQVNTVU1FX0NPTVBMSUFOVF9VUkxfQVBJID0gZ29vZy5kZWZpbmUoXG4gICAgJ0FTU1VNRV9DT01QTElBTlRfVVJMX0FQSScsXG4gICAgLy8gVE9ETyh1c2VyKSBuYXJyb3cgdGhpcyBkb3duIGlmIGVhcmxpZXIgZmVhdHVyZXNldCB5ZWFycyBhbGxvdyxcbiAgICAvLyBpZiB0aGV5IGdldCBkZWZpbmVkLiBGWTIwMjAgZG9lcyBOT1QgaW5jbHVkZSBFZGdlIChFZGdlSFRNTCksIHdoaWNoIGlzXG4gICAgLy8gZ29vZCBhcyB3b3JrYXJvdW5kcyBhcmUgbmVlZGVkIGZvciBzcGVjIGNvbXBsaWFuY2UgYW5kIGEgc2VhcmNoUGFyYW1zXG4gICAgLy8gcG9seWZpbGwuXG4gICAgZ29vZy5GRUFUVVJFU0VUX1lFQVIgPj0gMjAyMCk7XG5cbmxldCB1cmxCYXNlOiBzdHJpbmcgPSBnb29nLmdsb2JhbC5kb2N1bWVudC5iYXNlVVJJIHx8XG4gICAgLy8gYmFzZVVSSSBpcyBub3QgYXZhaWxhYmxlIGluIElFMTEgYW5kIGVhcmxpZXJcbiAgICBnb29nLmdsb2JhbC53aW5kb3cubG9jYXRpb24uaHJlZiB8fCAnJztcblxuLyoqXG4gKiBGb3IgdGVzdGluZyBvbmx5IC0gdGhpcyBhZGp1c3RzIHRoZSBiYXNlIHVzZWQgaW4gYHJlc29sdmVSZWxhdGl2ZVVybGAuXG4gKiBNYXliZSB0aGlzIHNob3VsZCBqdXN0IGJlIHZpc2libGUgdG8gYWxsb3cgb3RoZXJzIHVzaW5nIHRoaXMgcGFja2FnZSB0byB0ZXN0XG4gKiBpdD9cbiAqIEBwYWNrYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRVcmxCYXNlRm9yVGVzdGluZyhiYXNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgdXJsQmFzZSA9IGJhc2U7XG59XG5cblxuLyoqXG4gKiBGZWF0dXJlLWRldGVjdGlvbiBmb3IgbmF0aXZlIFVSTCBwYXJzaW5nXG4gKi9cbmNvbnN0IHN1cHBvcnRzTmF0aXZlVVJMQ29uc3RydWN0b3I6IGJvb2xlYW4gPSB7XG4gIC8vIFRPRE8odXNlcikgRG9lcyB0aGlzIHdvcmsgd2l0aG91dCBKU0NvbXBpbGVyP1xuICB2YWx1ZU9mKCk6IGJvb2xlYW4ge1xuICAgIGlmIChBU1NVTUVfQ09NUExJQU5UX1VSTF9BUEkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbmV3IFVSTCgnaHR0cDovL2V4YW1wbGUuY29tJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59LnZhbHVlT2YoKTtcblxuLyoqXG4gKiBSZWFkb25seVNlYXJjaFBhcmFtcyBwYXJ0aWFsbHkgaW1wbGVtZW50cyB0aGUgVVJMU2VhcmNoUGFyYW1zIGludGVyZmFjZSxcbiAqIGV4Y2x1ZGluZyBhbGwgbXV0YWJpbGl0eSBtZXRob2RzIGFuZCBzb21lIGxlc3MtdXNlZnVsIG1ldGhvZHMgZm9yIHJlYWRpbmcgdGhlXG4gKiB1bmRlcmx5aW5nIGRhdGEuIEV4Y2x1c2lvbnM6XG4gKiAgLSBhcHBlbmRcbiAqICAtIGRlbGV0ZVxuICogIC0gc2V0XG4gKiAgLSBzb3J0XG4gKiAgLSB2YWx1ZXMoKVxuICogIC0gZW50cmllcygpXG4gKiAgLSBmb3JFYWNoKC4uLilcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWFkb25seVNlYXJjaFBhcmFtcyBleHRlbmRzIEl0ZXJhYmxlPHJlYWRvbmx5IHN0cmluZ1tdPiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gcmV0cmlldmUgYSB2YWx1ZSBmb3IuIE11c3Qgbm90IGJlIHVybC1lbmNvZGVkLlxuICAgKiBAcmV0dXJuIFRoZSB2YWx1ZS4gSWYgYSBrZXkgaXMgc3BlY2lmaWVkIG1vcmUgdGhhbiBvbmNlLCB0aGUgZmlyc3QgdmFsdWVcbiAgICogICAgIGlzIHJldHVybmVkIChhcyBwZXIgdGhlIHNwZWMpLiBBbGwgdmFsdWVzIHdpbGwgYmUgdXJsLWRlY29kZWQgYWxyZWFkeS5cbiAgICovXG4gIGdldChrZXk6IHN0cmluZyk6IHN0cmluZ3xudWxsO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gcmV0cmlldmUgYWxsIHZhbHVlcyBmb3IuIE11c3Qgbm90IGJlIHVybC1lbmNvZGVkLlxuICAgKiBAcmV0dXJuIFRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgdGhpcyBrZXkuIFdpbGwgcmV0dXJuIHRoZVxuICAgKiAgICAgZW1wdHkgYXJyYXkgaWYgdGhlcmUgYXJlIG5vIHZhbHVlcyBmb3IgdGhlIGtleS4gQWxsIHZhbHVlcyB3aWxsIGhhdmVcbiAgICogICAgIGJlZW4gdXJsLWRlY29kZWQgYWxyZWFkeS5cbiAgICovXG4gIGdldEFsbChrZXk6IHN0cmluZyk6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci4gTXVzdCBub3QgYmUgdXJsLWVuY29kZWQuXG4gICAqIEByZXR1cm4gVHJ1ZSBpZmYgdGhpcyBrZXkgZXhpc3RzIHdpdGhpbiB0aGUgc2VhcmNoIHBhcmFtcy5cbiAgICovXG4gIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEJhc2ljIG92ZXJyaWRlLlxuICAgKi9cbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEEgcG9seWZpbGwgaW1wbGVtZW50YXRpb24gb2YgUmVhZG9ubHlTZWFyY2hQYXJhbXMgdGhhdCBpcyBvbmx5IHVzZWQgaW4gb2xkZXJcbiAqIGJyb3dzZXJzIHRoYXQgZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBzZWFyY2hQYXJhbXMuIFRoaXMgaW5jbHVkZXMgSUUgYW5kIEVkZ2VcbiAqIChFZGdlSFRNTCkuXG4gKi9cbmNsYXNzIFNlYXJjaFBhcmFtc0ltcGwgaW1wbGVtZW50cyBSZWFkb25seVNlYXJjaFBhcmFtcyB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGFyYW1NYXA6IFJlYWRvbmx5TWFwPHN0cmluZywgcmVhZG9ubHkgc3RyaW5nW10+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gc2VhcmNoIFRoZSBzZWFyY2ggc3RyaW5nIGZyb20gVVJMIHJlc29sdXRpb24uIE1heVxuICAgKiAgICAgb3B0aW9uYWxseSBiZWdpbiB3aXRoICc/JywgYW5kIGlzIGV4cGVjdGVkIHRvIGJlIFVSTC1lbmNvZGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3Ioc2VhcmNoOiBzdHJpbmcpIHtcbiAgICBpZiAoc2VhcmNoLmluZGV4T2YoJz8nKSA9PSAwKSB7XG4gICAgICBzZWFyY2ggPSBzZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXMgPSBzZWFyY2guc3BsaXQoJyYnKTtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG4gICAgdGhpcy5wYXJhbU1hcCA9IG1hcDtcbiAgICBmb3IgKGxldCBwIG9mIHBhcmFtcykge1xuICAgICAgbGV0IGtleSA9IHA7XG4gICAgICBsZXQgdmFsID0gJyc7XG4gICAgICBjb25zdCBrZXlWYWx1ZVNwbGl0ID0gcC5zcGxpdCgnPScpO1xuICAgICAgY29uc3QgaXNLViA9IGtleVZhbHVlU3BsaXQubGVuZ3RoID4gMTtcbiAgICAgIGlmIChpc0tWKSB7XG4gICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrZXlWYWx1ZVNwbGl0WzBdLnJlcGxhY2UoJysnLCAnICcpKTtcbiAgICAgICAgdmFsID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleVZhbHVlU3BsaXRbMV0ucmVwbGFjZSgnKycsICcgJykpO1xuICAgICAgfVxuICAgICAgbGV0IGVudHJpZXMgPSBtYXAuZ2V0KGtleSk7XG4gICAgICBpZiAoZW50cmllcyA9PSBudWxsKSB7XG4gICAgICAgIGVudHJpZXMgPSBbXTtcbiAgICAgICAgbWFwLnNldChrZXksIGVudHJpZXMpO1xuICAgICAgfVxuICAgICAgZW50cmllcy5wdXNoKHZhbCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMucGFyYW1NYXAuZ2V0KGtleSk7XG4gICAgcmV0dXJuIHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoID8gdmFsdWVzWzBdIDogbnVsbDtcbiAgfVxuXG4gIGdldEFsbChrZXk6IHN0cmluZyk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICAvLyBBcyBwZXIgdGhlIHNwZWMsIHRoaXMgcmV0dXJucyB0aGUgXCJlbXB0eSBzZXF1ZW5jZVwiIGlmIHRoZSBrZXkgaXMgbm90XG4gICAgLy8gZm91bmQuXG4gICAgcmV0dXJuIFsuLi4odGhpcy5wYXJhbU1hcC5nZXQoa2V5KSB8fCBbXSldO1xuICB9XG5cbiAgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1NYXAuaGFzKGtleSk7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPHJlYWRvbmx5IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIGl0ZXJhYmxlQ29uY2F0KC4uLml0ZXJhYmxlTWFwKHRoaXMucGFyYW1NYXAsIChlKSA9PiB7XG4gICAgICBjb25zdCBrZXk6IHN0cmluZyA9IGVbMF07XG4gICAgICBjb25zdCB2YWx1ZXM6IHJlYWRvbmx5IHN0cmluZ1tdID0gZVsxXTtcbiAgICAgIHJldHVybiBpdGVyYWJsZU1hcCh2YWx1ZXMsICh2KSA9PiB7XG4gICAgICAgIHJldHVybiBba2V5LCB2XTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZXJhYmxlU2VhcmNoUGFyYW1zVG9TdHJpbmcodGhpcyk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gaXRlcmFibGUgVGhlIGl0ZXJhYmxlIHdoaWNoIGFjdHMgbGlrZSBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QgKGVhY2hcbiAqICAgICBpdGVyYXRpb24gcmV0dXJucyBhbm90aGVyIGtleSBhbmQgdmFsdWUpLiBOb3RlIHRoYXQgYm90aCBrZXlzIGFuZCB2YWx1ZXNcbiAqICAgICBtdXN0IE5PVCBiZSBhbHJlYWR5IFVSTCBlbmNvZGVkLlxuICogQHJldHVybiBUaGUgc2VyaWFsaXplZCBTZWFyY2hQYXJhbXMsIHdpdGggYWxsIGtleXMgYW5kIHZhbHVlc1xuICogICAgIGNvcnJlY3RseSBlbmNvZGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXRlcmFibGVTZWFyY2hQYXJhbXNUb1N0cmluZyhcbiAgICBpdGVyYWJsZTogSXRlcmFibGU8cmVhZG9ubHkgc3RyaW5nW10+KTogc3RyaW5nIHtcbiAgLy8gU29tZSBjaGFyYWN0ZXJzIGFyZSBub3QgZm9ybS1lbmNvZGVkIHByb3Blcmx5IGJ5IGVuY29kZVVSSUNvbXBvbmVudCwgc28gd2VcbiAgLy8gZW51bWVyYXRlIHRoZWlyIHJlcGxhY2VtZW50cyBoZXJlIGZvciB1c2UgbGF0ZXIuXG4gIGZ1bmN0aW9uIGVuY29kZShzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIEZvcm0gZW5jb2RpbmcgaXMgZGVmaW5lZCBbaW4gdGhlIHNwZWNdWzFdIGJ1dCB0aGVyZSBhcmUgc29tZSB2YWx1ZXMgdGhhdFxuICAgIC8vIGFyZSBub3QgZW5jb2RlZCB0aGUgcmlnaHQgd2F5IGJ5IGVuY29kZVVSSUNvbXBvbmVudC4gVGh1cywgd2UgcmVwbGFjZVxuICAgIC8vIHRoZWlyIHJlcHJlc2VudGF0aW9uIGluIHRoZSByZXN1bHRpbmcgZW5jb2RlZCBzdHJpbmcgd2l0aCB0aGVpciBhY3R1YWxcbiAgICAvLyBlbmNvZGluZy5cbiAgICAvLyBbMV06IGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsZW5jb2RlZC1zZXJpYWxpemluZ1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQocykucmVwbGFjZSgvWyEoKX4nXXwoJTIwKS9nLCAoYzogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgJyEnOiAnJTIxJyxcbiAgICAgICAgJygnOiAnJTI4JyxcbiAgICAgICAgJyknOiAnJTI5JyxcbiAgICAgICAgJyUyMCc6ICcrJyxcbiAgICAgICAgJ1xcJyc6ICclMjcnLFxuICAgICAgICAnfic6ICclN0UnLFxuICAgICAgfSBhcyB7W2tleTogc3RyaW5nXTogc3RyaW5nfSlbY107XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBBcnJheVxuICAgICAgLmZyb20oXG4gICAgICAgICAgaXRlcmFibGUsXG4gICAgICAgICAgKGtleVZhbHVlUGFpcjogcmVhZG9ubHkgc3RyaW5nW10pID0+XG4gICAgICAgICAgICAgIGVuY29kZShrZXlWYWx1ZVBhaXJbMF0pICsgJz0nICsgZW5jb2RlKGtleVZhbHVlUGFpclsxXSkpXG4gICAgICAuam9pbignJicpO1xufTtcblxuLyoqXG4gKiBVcmxMaWtlIG1pcnJvcnMgbW9zdCBvZiB0aGUgcHVibGljIHJlYWRvbmx5IGludGVyZmFjZSBvZiB0aGUgVVJMIG9iamVjdCBpblxuICogdGhlIFVSTCBXZWIgQVBJLlxuICogTm90YWJsZSBleGNsdXNpb25zOlxuICogIC0gdG9Kc29uKClcbiAqICAtIHNlYXJjaFBhcmFtc1xuICpcbiAqIEluc3RlYWQgb2YgdXNpbmcgdGhlIHNlYXJjaFBhcmFtcyBwcm9wZXJ0eSwgdXNlIGBnZXRTZWFyY2hQYXJhbXNgIGZyb20gdGhpc1xuICogcGFja2FnZS4gVGhpcyBhbGxvd3MgZm9yIHRoZSByZWxldmFudCBjb2RlIHRvIGJlIHJlbW92ZWQgd2hlbiBpbnNwZWN0aW9uIG9mXG4gKiBzZWFyY2ggcGFyYW1ldGVycyBpcyBub3QgbmVlZGVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVybExpa2Uge1xuICByZWFkb25seSBocmVmOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHByb3RvY29sOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHVzZXJuYW1lOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHBhc3N3b3JkOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGhvc3Q6IHN0cmluZztcbiAgcmVhZG9ubHkgaG9zdG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgcG9ydDogc3RyaW5nO1xuICByZWFkb25seSBvcmlnaW46IHN0cmluZztcbiAgcmVhZG9ubHkgcGF0aG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgc2VhcmNoOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGhhc2g6IHN0cmluZztcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgZXF1aXZhbGVudCB0byAnbmV3IFVSTChocmVmKScgaW4gbmV3ZXIgYnJvd3NlcnMsIGFuZCB3aWxsXG4gKiBhdXRvbWF0aWNhbGx5IHdvcmsgYXJvdW5kIHRoZSBTZWN1cml0eSBQcm9ibGVtcyBpbiBJRSwgcmV0cnlpbmcgdGhlIHBhcnNlXG4gKiBhdXRvbWF0aWNhbGx5IHdoaWxlIGV4dHJhY3RpbmcgdGhlIHVzZXJpbmZvLlxuICogQHJldHVybiBBIGNhbm9uaWNhbGl6ZWQgdmVyc2lvbiBvZiB0aGUgaW5mb3JtYXRpb24gZnJvbSB0aGUgVVJMLlxuICogICAgIFdpbGwgdGhyb3cgaWYgdGhlIHJlc3VsdGluZyBVUkwgaXMgaW52YWxpZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFuY2hvckVsZW1lbnRJbklFKHVybFN0cjogc3RyaW5nKTogVXJsTGlrZSB7XG4gIGNvbnN0IGFUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgbGV0IHByb3RvY29sO1xuICB0cnkge1xuICAgIHNhZmUuc2V0QW5jaG9ySHJlZihcbiAgICAgICAgYVRhZyxcbiAgICAgICAgdW5jaGVja2VkQ29udmVyc2lvbnMuc2FmZVVybEZyb21TdHJpbmdLbm93blRvU2F0aXNmeVR5cGVDb250cmFjdChcbiAgICAgICAgICAgIENvbnN0U3RyaW5nLmZyb20oXG4gICAgICAgICAgICAgICAgJ1RoaXMgdXJsIGlzIGF0dGFjaGVkIHRvIGFuIEFuY2hvciB0YWcgdGhhdCBpcyBORVZFUiBhdHRhY2hlZCAnICtcbiAgICAgICAgICAgICAgICAnIHRvIHRoZSBET00gYW5kIGlzIG5vdCByZXR1cm5lZCBmcm9tIHRoaXMgZnVuY3Rpb24uJyksXG4gICAgICAgICAgICB1cmxTdHIpKTtcbiAgICAvLyBJZiB0aGUgVVJMIGlzIGFjdHVhbGx5IGludmFsaWQsIHRyeWluZyB0byByZWFkIGZyb20gaXQgd2lsbCB0aHJvdy5cbiAgICBwcm90b2NvbCA9IGFUYWcucHJvdG9jb2w7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBXZSBjYXRjaCBhbmQgcmUtdGhyb3cgYW4gZXJyb3IgaGVyZSBhcyB0aGUgZGVmYXVsdCBlcnJvciBpbiBJRSBpc1xuICAgIC8vIHNpbXBseSAnSW52YWxpZCBhcmd1bWVudC4nIHdpdGggbm8gdXNlZnVsIGluZm9ybWF0aW9uLlxuICAgIHRocm93IG5ldyBFcnJvcihgJHt1cmxTdHJ9IGlzIG5vdCBhIHZhbGlkIFVSTC5gKTtcbiAgfVxuICAvLyBUaGUgYW5jaG9yIHRhZyB3aWxsIGJlIGNyZWF0ZWQgYW5kIGFzc2lnbmVkIHNvbWUgdmFsdWVzLCBidXQgYSBVUkwgbWlzc2luZ1xuICAvLyBhIHByb3RvY29sIGFuZC9vciBob3N0bmFtZSBpcyBub3QgdmFsaWQgaW4gYSBicm93c2VyIGFuZCBvdGhlciBicm93c2VycyBVUkxcbiAgLy8gQVBJcyByZWplY3QgdGhlbS5cbiAgLy8gJycgOiBJRTExLjcxOS4xODM2MiwgSUUxMS4wLjk2MDBcbiAgLy8gJzonIDogSUUxMS4/Pz8gKHdlYiB0ZXN0aW5nIHZlcnNpb24gYXMgb2YgMDQvMDMvMjAyMClcbiAgLy8gbGFzdCBjaGFyICE9ICc6JzogaHVuY2guLi5cbiAgaWYgKHByb3RvY29sID09PSAnJyB8fCBwcm90b2NvbCA9PT0gJzonIHx8XG4gICAgICBwcm90b2NvbFtwcm90b2NvbC5sZW5ndGggLSAxXSAhPSAnOicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dXJsU3RyfSBpcyBub3QgYSB2YWxpZCBVUkwuYCk7XG4gIH1cbiAgaWYgKCFjYW5vbmljYWxQb3J0Rm9yUHJvdG9jb2xzLmhhcyhwcm90b2NvbCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dXJsU3RyfSBpcyBub3QgYSB2YWxpZCBVUkwuYCk7XG4gIH1cbiAgaWYgKCFhVGFnLmhvc3RuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke3VybFN0cn0gaXMgbm90IGEgdmFsaWQgVVJMLmApO1xuICB9XG4gIGNvbnN0IHVybExpa2UgPSB7XG4gICAgaHJlZjogYVRhZy5ocmVmLFxuICAgIHByb3RvY29sOiBhVGFnLnByb3RvY29sLFxuICAgIHVzZXJuYW1lOiAnJyxcbiAgICBwYXNzd29yZDogJycsXG4gICAgLy8gSG9zdCwgb3JpZ2luLCBhbmQgcG9ydCBhc3NpZ25lZCBiZWxvdyBhZnRlciBjYW5vbmljYWxpemF0aW9uLlxuICAgIGhvc3RuYW1lOiBhVGFnLmhvc3RuYW1lLFxuICAgIHBhdGhuYW1lOiAnLycgKyBhVGFnLnBhdGhuYW1lLFxuICAgIHNlYXJjaDogYVRhZy5zZWFyY2gsXG4gICAgaGFzaDogYVRhZy5oYXNoLFxuICB9IGFzIEluaXRpYWxpemFibGVVcmxMaWtlO1xuICAvLyBDYW5vbmljYWxpemUgdGhlIHBvcnQgb3V0IGZyb20gdGhlIFVSTCBpZiBpdCBtYXRjaGVzXG4gIGNvbnN0IGNhbm9uaWNhbFBvcnQgPSBjYW5vbmljYWxQb3J0Rm9yUHJvdG9jb2xzLmdldChhVGFnLnByb3RvY29sKTtcbiAgaWYgKGNhbm9uaWNhbFBvcnQgPT09IGFUYWcucG9ydCkge1xuICAgIHVybExpa2UuaG9zdCA9IHVybExpa2UuaG9zdG5hbWU7XG4gICAgdXJsTGlrZS5wb3J0ID0gJyc7XG4gICAgLy8gVGhpcyBkb2VzIG5vdCB3b3JrIGZvciBibG9iIGFuZCBmaWxlIHByb3RvY29sIHR5cGVzIC0gdGhleSBhcmUgZmFyIG1vcmVcbiAgICAvLyBjb21wbGljYXRlZC5cbiAgICB1cmxMaWtlLm9yaWdpbiA9IHVybExpa2UucHJvdG9jb2wgKyAnLy8nICsgdXJsTGlrZS5ob3N0bmFtZTtcbiAgfSBlbHNlIHtcbiAgICB1cmxMaWtlLmhvc3QgPSBhVGFnLmhvc3Q7XG4gICAgdXJsTGlrZS5wb3J0ID0gYVRhZy5wb3J0O1xuICAgIHVybExpa2Uub3JpZ2luID1cbiAgICAgICAgdXJsTGlrZS5wcm90b2NvbCArICcvLycgKyB1cmxMaWtlLmhvc3RuYW1lICsgJzonICsgdXJsTGlrZS5wb3J0O1xuICB9XG4gIHJldHVybiB1cmxMaWtlO1xufTtcblxuLyoqIEByZXR1cm4gVGhlIHNlcmlhbGl6ZWQgdXNlcmluZm8gc3RyaW5nICovXG5mdW5jdGlvbiBhc3NlbWJsZVVzZXJJbmZvKHVzZXJuYW1lOiBzdHJpbmd8bnVsbCwgcGFzc3dvcmQ6IHN0cmluZ3xudWxsKTogc3RyaW5nIHtcbiAgaWYgKHVzZXJuYW1lICYmIHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQgKyAnQCc7XG4gIH0gZWxzZSBpZiAodXNlcm5hbWUpIHtcbiAgICByZXR1cm4gdXNlcm5hbWUgKyAnQCc7XG4gIH0gZWxzZSBpZiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gJzonICsgcGFzc3dvcmQgKyAnQCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gd3JhcHMgJ25ldyBVUkwoaHJlZiknIGluIG5ld2VyIGJyb3dzZXJzIGFkZHMgY29tbW9uIGNoZWNrcyBmb3JcbiAqIHBhcnRzIG9mIHRoZSBVUkwgc3BlYyAoZS5nLiBubyBwcm90b2NvbCwgbm8gaG9zdG5hbWUgZm9yIHdlbGwta25vd24gcHJvdG9jb2xzXG4gKiBsaWtlIEhUVFAocykgYW5kIFdTKFMpKSB0aGF0IHNvbWUgYnJvd3NlcnMgZG9uJ3QgYWRoZXJlIHRvLiBJdCBhbHNvIGFkZHNcbiAqIG9yaWdpbiBjb25zdHJ1Y3Rpb24gZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBpdCAoRWRnZSkuXG4gKi9cbmZ1bmN0aW9uIHVybFBhcnNlV2l0aENvbW1vbkNoZWNrcyh1cmxTdHI6IHN0cmluZyk6IFVybExpa2Uge1xuICBsZXQgcmVzO1xuICB0cnkge1xuICAgIHJlcyA9IG5ldyBVUkwodXJsU3RyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHt1cmxTdHJ9IGlzIG5vdCBhIHZhbGlkIFVSTC5gKTtcbiAgfVxuICBjb25zdCBjYW5vbmljYWxQb3J0ID0gY2Fub25pY2FsUG9ydEZvclByb3RvY29scy5nZXQocmVzLnByb3RvY29sKTtcbiAgaWYgKCFjYW5vbmljYWxQb3J0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke3VybFN0cn0gaXMgbm90IGEgdmFsaWQgVVJMLmApO1xuICB9XG4gIGlmICghcmVzLmhvc3RuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke3VybFN0cn0gaXMgbm90IGEgdmFsaWQgVVJMLmApO1xuICB9XG4gIC8vIEZvciBzb21lIHByb3RvY29scywgRWRnZSBkb2VuJ3Qga25vdyBob3cgdG8gY29uc3RydWN0IHRoZSBvcmlnaW4uXG4gIGlmIChyZXMub3JpZ2luICE9ICdudWxsJykge1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgLy8gV2UgY2FuJ3QgYXNzaWduIHRvIHRoZSBuYXRpdmUgb2JqZWN0J3Mgb3JpZ2luIHByb3BlcnR5IChpdCBpcyBpZ25vcmVkKSwgc29cbiAgLy8gd2UgbWFrZSBhIGNvcHkgaGVyZS5cbiAgY29uc3QgdXJsTGlrZSA9IHtcbiAgICBocmVmOiByZXMuaHJlZixcbiAgICBwcm90b2NvbDogcmVzLnByb3RvY29sLFxuICAgIHVzZXJuYW1lOiAnJyxcbiAgICBwYXNzd29yZDogJycsXG4gICAgaG9zdDogcmVzLmhvc3QsXG4gICAgcG9ydDogcmVzLnBvcnQsXG4gICAgLy8gb3JpZ2luIGFzc2lnbmVkIGJlbG93IGFmdGVyIGNhbm9uaWNhbGl6YXRpb24uXG4gICAgaG9zdG5hbWU6IHJlcy5ob3N0bmFtZSxcbiAgICBwYXRobmFtZTogcmVzLnBhdGhuYW1lLFxuICAgIHNlYXJjaDogcmVzLnNlYXJjaCxcbiAgICAvLyBXZSBkb24ndCBjb3B5IHNlYXJjaFBhcmFtcyBiZWNhdXNlIEVkZ2UgZG9lc24ndCBoYXZlIGl0IGFueXdheXMuXG4gICAgaGFzaDogcmVzLmhhc2gsXG4gIH0gYXMgVXJsTGlrZTtcbiAgaWYgKGNhbm9uaWNhbFBvcnQgPT09IHJlcy5wb3J0KSB7XG4gICAgLy8gVGhpcyBkb2VzIG5vdCB3b3JrIGZvciBibG9iIGFuZCBmaWxlIHByb3RvY29sIHR5cGVzIC0gdGhleSBhcmUgZmFyIG1vcmVcbiAgICAvLyBjb21wbGljYXRlZC5cbiAgICAodXJsTGlrZSBhcyB7b3JpZ2luOiBzdHJpbmd9KS5vcmlnaW4gPSByZXMucHJvdG9jb2wgKyAnLy8nICsgcmVzLmhvc3RuYW1lO1xuICB9IGVsc2Uge1xuICAgICh1cmxMaWtlIGFzIHtvcmlnaW46IHN0cmluZ30pLm9yaWdpbiA9XG4gICAgICAgIHJlcy5wcm90b2NvbCArICcvLycgKyByZXMuaG9zdG5hbWUgKyAnOicgKyByZXMucG9ydDtcbiAgfVxuICByZXR1cm4gdXJsTGlrZTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGdpdmVuIHVybCBzdHJpbmcgKHdpdGggdGhlIG9wdGlvbmFsIGJhc2UpIGludG8gYSBVUkwgb2JqZWN0XG4gKiBhY2NvcmRpbmcgdG8gdGhlIFtVUkwgc3BlY11baHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnL10uIFdpbGwgdGhyb3cgYW5cbiAqIGVycm9yIGlmIHRoZSByZXN1bHRpbmcgVVJMIGlzIGludmFsaWQgb3IgaWYgdGhlIGJyb3dzZXIgY2FuJ3Qgb3Igd29uJ3QgdXNlXG4gKiB0aGF0IFVSTCBmb3Igc29tZSByZWFzb24uIFJlbGF0aXZlIFVSTHMgYXJlIGNvbnNpZGVyZWQgaW52YWxpZCB3aXRob3V0IGEgYmFzZVxuICogYW5kIHdpbGwgdGhyb3cgYW4gZXJyb3IgLSBwbGVhc2UgdXNlIGByZXNvbHZlUmVsYXRpdmVVcmxgIGluc3RlYWQgZm9yIHRoaXNcbiAqIHVzZS1jYXNlLlxuICpcbiAqIE5vdGUgdGhhdCBjYWxsaW5nIHJlc29sdmVVcmwgd2l0aCBib3RoIHVybFN0ciBhbmQgYmFzZVN0ciBtYXkgaGF2ZSBzdXJwcmlzaW5nXG4gKiBiZWhhdmlvci4gRm9yIGV4YW1wbGUsIGFueSBpbnZvY2F0aW9uIHdpdGggYm90aCBwYXJhbWV0ZXJzIHdpbGwgbmV2ZXIgdXNlIHRoZVxuICogaGFzaCB2YWx1ZSBmcm9tIGJhc2VTdHIuIFNpbWlsYXJseSwgcGFzc2luZyBhIHBhdGggc2VnbWVudCBpbiB1cmxTdHIgd2lsbFxuICogYXBwZW5kIChvciByZXBsYWNlKSB0aGUgcGF0aCBpbiBiYXNlU3RyLCBidXQgd2lsbCBBTFNPIGV4Y2x1ZGUgdGhlIHNlYXJjaCBhbmRcbiAqIGhhc2ggcG9ydGlvbnMgb2YgYmFzZVN0ciBmcm9tIHRoZSByZXN1bHRpbmcgVVJMLiBTZWUgdGhlIHVuaXQgdGVzdHNcbiAqIChzcGVjaWZpY2FsbHkgdGVzdFdpdGhCYXNlKiB0ZXN0IGNhc2VzKSBmb3IgZXhhbXBsZXMuXG4gKlxuICogQ29tcGF0aWJpbGl0eSBub3RlczpcbiAqIC0gYm90aCBJRSAoYWxsIHZlcnNpb25zKSBhbmQgRWRnZSAoRWRnZUhUTUwgb25seSkgZGlzYWxsb3cgVVJMcyB0byBoYXZlIHVzZXJcbiAqICAgaW5mb3JtYXRpb24gaW4gdGhlbSwgYW5kIHBhcnNpbmcgdGhvc2Ugc3RyaW5ncyB3aWxsIHRocm93IGFuIGVycm9yLlxuICogLSBGaXJlRm94IGRpc2FsbG93cyBVUkxzIHdpdGgganVzdCBhIHBhc3N3b3JkIGluIHRoZSB1c2VyaW5mby5cbiAqIEBwYXJhbSB1cmxTdHIgQSBwb3RlbnRpYWwgYWJzb2x1dGUgVVJMIGFzIGEgc3RyaW5nLCBvciBhIHJlbGF0aXZlXG4gKiAgICAgVVJMIGlmIGJhc2VTdHIgaXMgcHJvdmlkZWQuXG4gKiBAcGFyYW0gYmFzZVN0ciBBbiBvcHRpb25hbCBiYXNlIHVybCBhcyBhIHN0cmluZywgb25seSByZXF1aXJlZCBpZlxuICogICAgIHRoZSB1cmwgaXMgcmVsYXRpdmUuXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGRlc2NyaWJlcyB0aGUgdmFyaW91cyBwYXJ0cyBvZiB0aGUgVVJMIGlmXG4gKiAgICAgdmFsaWQuIFRocm93cyBhbiBlcnJvciBpZiBpbnZhbGlkLiBXaGlsZSB0aGlzIG9iamVjdCBpcyB0aGUgbmF0aXZlIFVSTFxuICogICAgIG9iamVjdCB3aGVyZSBwb3NzaWJsZSwgdXNlcnMgc2hvdWxkIE5PVCByZWx5IG9uIHRoaXMgcHJvcGVydHkgYW5kIGluc3RlYWRcbiAqICAgICB0cmVhdCBpdCBhcyBhIHNpbXBsZSByZWNvcmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlVXJsKHVybFN0cjogc3RyaW5nLCBiYXNlU3RyPzogc3RyaW5nKTogVXJsTGlrZSB7XG4gIGlmIChBU1NVTUVfQ09NUExJQU5UX1VSTF9BUEkpIHtcbiAgICAvLyBTYWZhcmkgdGhyb3dzIGEgVHlwZUVycm9yIGlmIHlvdSBjYWxsIHRoZSBjb25zdHJ1Y3RvciB3aXRoIGEgc2Vjb25kXG4gICAgLy8gYXJndW1lbnQgdGhhdCBpc24ndCBkZWZpbmVkLCBzbyB3ZSBjYW4ndCBwYXNzIGJhc2VTdHIgYWxsIHRoZSB0aW1lLlxuICAgIHJldHVybiBiYXNlU3RyID8gbmV3IFVSTCh1cmxTdHIsIGJhc2VTdHIpIDogbmV3IFVSTCh1cmxTdHIpO1xuICB9XG5cbiAgLy8gSWRlYWxseSwgdGhpcyBzaG91bGQgZWZmZWN0aXZlbHkgYmVjb21lXG4gIC8vIGlmIEVkZ2VcbiAgLy8gYW5kIHRoZSBlbHNlIHNob3VsZCBlZmZlY3RpdmVseSBiZWNvbWVcbiAgLy8gaWYgSUVcblxuICAvLyBUT0RPKHVzZXIpIFNvbWUgdXNlIG9mIEZFQVRVUkVTRVRfWUVBUiBuZWFyIGhlcmUgd291bGQgaGVscCBzdHJpcFxuICAvLyBkb3duIHRoZSBpbXBsZW1lbnRhdGlvbiBldmVuIG1vcmUgZm9yIGJyb3dzZXJzIHdlIGFyZSBtb3JlIHN1cmUgc3VwcG9ydCB0aGVcbiAgLy8gVVJMIFdlYiBBUEkgKGluY2x1ZGluZyBFZGdlKS4gMjAxOT8gTWF5YmU/XG5cbiAgaWYgKHN1cHBvcnRzTmF0aXZlVVJMQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoIWJhc2VTdHIpIHtcbiAgICAgIHJldHVybiB1cmxQYXJzZVdpdGhDb21tb25DaGVja3ModXJsU3RyKTtcbiAgICB9XG4gICAgLy8gRWRnZSBkb2Vzbid0IHRocm93IGlmIGJhc2VTdHIgaXMgbm90IGEgdmFsaWQgYWJzb2x1dGUgVVJMIHdoZW4gdGhlXG4gICAgLy8gdXJsU3RyIGlzIGFic29sdXRlLiBUaGlzIGlzIGFnYWluc3QgdGhlIHNwZWMsIHNvIHRyeSBhbmQgcGFyc2UgdGhpcyB3aXRoXG4gICAgLy8gY29tbW9uQ2hlY2tzICh3aGljaCB3aWxsIHRocm93IGlmIGJhc2VTdHIgaXMgbm90IGEgdmFsaWQgYWJzb2x1dGUgVVJMKS5cbiAgICBjb25zdCBiYXNlVXJsID0gdXJsUGFyc2VXaXRoQ29tbW9uQ2hlY2tzKGJhc2VTdHIpO1xuXG4gICAgLy8gSWYgdXJsU3RyIGlzIHByZXNlbnQgYW5kIGFic29sdXRlLCB0aGVuIG9ubHkgdGhvc2UgdmFsdWVzIGFyZSB1c2VkLlxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdXJsUGFyc2VXaXRoQ29tbW9uQ2hlY2tzKHVybFN0cik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gdXJsU3RyIGlzIG5vdCBhYnNvbHV0ZS4gV2Ugc2hhbGwgZ2l2ZSBib3RoIHBpZWNlcyB0byB0aGUgY29uc3RydWN0b3JcbiAgICAgIC8vIGJlbG93IGFuZCBzZWUgd2hhdCBpdCB0aGlua3MuXG4gICAgfVxuICAgIHJldHVybiBuZXcgVVJMKHVybFN0ciwgYmFzZVVybC5ocmVmKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWJhc2VTdHIpIHtcbiAgICAgIHJldHVybiBjcmVhdGVBbmNob3JFbGVtZW50SW5JRSh1cmxTdHIpO1xuICAgIH1cbiAgICAvLyBJdCBpcyBhZ2FpbnN0IHRoZSBzcGVjIHRvIHByb3ZpZGUgYSBiYXNlU3RyIHRoYXQgaXMgbm90IGFic29sdXRlLlxuICAgIGNvbnN0IGJhc2VVcmwgPSBjcmVhdGVBbmNob3JFbGVtZW50SW5JRShiYXNlU3RyKTtcblxuICAgIC8vIElmIHVybFN0ciBpcyBwcmVzZW50IGFuZCBhYnNvbHV0ZSwgdGhlbiBvbmx5IHRob3NlIHZhbHVlcyBhcmUgdXNlZCBldmVuXG4gICAgLy8gaWYgYmFzZVN0ciBpcyBkZWZpbmVkLiBUaGUgc3BlYyBzYXlzIHdlIG11c3QgdHJ5IGFuZCBwYXJzZSBiYXNlU3RyIGZpcnN0XG4gICAgLy8gKGFuZCBlcnJvciBvbiBpdCkgYmVmb3JlIHdlIGRvIHRoaXMgdGhvdWdoLlxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gY3JlYXRlQW5jaG9yRWxlbWVudEluSUUodXJsU3RyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyB1cmxTdHIgaXMgbm90IGFic29sdXRlLiBXZSBzaGFsbCBhc3NlbWJsZSBiYXNlIHBpZWNlcyArIHVybCBwaWVjZXNcbiAgICAgIC8vIGJlbG93LlxuICAgICAgLy8gRGVsaWJlcmF0ZSBmYWxsdGhyb3VnaFxuICAgIH1cblxuICAgIC8vIElmIHRoZSBiYXNlIGlzIHByZXNlbnQgYW5kIGFic29sdXRlLCBjaGVjayBmb3Igc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXRcbiAgICAvLyBoZWxwIGRldGVybWluZSB3aGF0IHBhcnRzIG9mIGJhc2Ugd2UgdXNlIHZzIHRoZSByZWxhdGl2ZSBwYXJ0cy5cbiAgICAvLyBUaGlzIGlzIHNpbWlsYXIgdG8gdGhlIFtzdGF0ZSBtYWNoaW5lXVsxXSBtZW50aW9uZWQgaW4gdGhlXG4gICAgLy8gc3BlYyBleGNlcHQgd2UgYWxyZWFkeSBrbm93IHRoYXQgdXJsU3RyIGlzIE5PVCBhYnNvbHV0ZS5cbiAgICAvLyBbMV06IGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jcmVsYXRpdmUtc3RhdGVcbiAgICBjb25zdCBuZXdCYXNlU3RyID0gYmFzZVVybC5wcm90b2NvbCArICcvLycgK1xuICAgICAgICBhc3NlbWJsZVVzZXJJbmZvKGJhc2VVcmwudXNlcm5hbWUsIGJhc2VVcmwucGFzc3dvcmQpICsgYmFzZVVybC5ob3N0O1xuICAgIGxldCAvKiogc3RyaW5nICovIGhyZWY7XG4gICAgY29uc3QgZmlyc3RDaGFyID0gdXJsU3RyWzBdO1xuICAgIGlmIChmaXJzdENoYXIgPT09ICcvJyB8fCBmaXJzdENoYXIgPT09ICdcXFxcJykge1xuICAgICAgaHJlZiA9IG5ld0Jhc2VTdHIgKyB1cmxTdHI7XG4gICAgfSBlbHNlIGlmIChmaXJzdENoYXIgPT09ICc/Jykge1xuICAgICAgaHJlZiA9IG5ld0Jhc2VTdHIgKyBiYXNlVXJsLnBhdGhuYW1lICsgdXJsU3RyO1xuICAgIH0gZWxzZSBpZiAoIWZpcnN0Q2hhciB8fCBmaXJzdENoYXIgPT09ICcjJykge1xuICAgICAgaHJlZiA9IG5ld0Jhc2VTdHIgKyBiYXNlVXJsLnBhdGhuYW1lICsgYmFzZVVybC5zZWFyY2ggKyB1cmxTdHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgZG9lc24ndCBzdGFydCB3aXRoIGFueSBvZiB0aGUgYXV0aG9yaXR5IHRlcm1pbmF0aW5nIGNoYXJhY3RlcnMsXG4gICAgICAvLyBidXQgb3RoZXIgYnJvd3NlcnMgdHJlYXQgaXQgaW1wbGljaXRseSBhcyBhbiBleHRlbnNpb24gdG8gdGhlIGV4aXN0aW5nXG4gICAgICAvLyBwYXRoLCByZW1vdmluZyBhbnl0aGluZyBhZnRlciB0aGUgbGFzdCAnLycgYW5kIGFwcGVuZGluZyB1cmxTdHIgdG8gaXQuXG4gICAgICBjb25zdCBsYXN0UGF0aFNlcGFyYXRvciA9IGJhc2VVcmwucGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKTtcbiAgICAgIGNvbnN0IHBhdGggPSBsYXN0UGF0aFNlcGFyYXRvciA+IDAgP1xuICAgICAgICAgIGJhc2VVcmwucGF0aG5hbWUuc3Vic3RyaW5nKDAsIGxhc3RQYXRoU2VwYXJhdG9yKSA6XG4gICAgICAgICAgJyc7XG4gICAgICBocmVmID0gbmV3QmFzZVN0ciArIHBhdGggKyAnLycgKyB1cmxTdHI7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVBbmNob3JFbGVtZW50SW5JRShocmVmKTtcbiAgfVxufTtcblxuLyoqXG4gKiBCcm93c2VycyB3aWxsIGNhbm9uaWNhbGl6ZSBhIFVSTCBpZiB0aGUgc2NoZW1lIGhhcyBhIFwiY2Fub25pY2FsXCIgcG9ydCBmb3IgaXQuXG4gKiBUaGlzIG1hcHMgc2NoZW1lcyB0byB0aGVpciBjYW5vbmljYWwgcG9ydC4gVGhlc2UgbWFwcGluZ3MgYXJlIGRlZmluZWQgaW4gdGhlXG4gKiBbc3BlY11bMV0uXG4gKlxuICogWzFdOiBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybC1taXNjZWxsYW5lb3VzXG4gKi9cbmNvbnN0IGNhbm9uaWNhbFBvcnRGb3JQcm90b2NvbHMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPihbXG4gIFsnaHR0cDonLCAnODAnXSxcbiAgWydodHRwczonLCAnNDQzJ10sXG4gIFsnd3M6JywgJzgwJ10sXG4gIFsnd3NzOicsICc0NDMnXSxcbiAgWydmdHA6JywgJzIxJ10sXG5dKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgVVJMU2VhcmNoUGFyYW1zLWxpa2Ugb2JqZWN0IGZvciBhIGdpdmVuIFVSTCBvYmplY3QuIFRoaXMgaXMgdXNlZFxuICogaW5zdGVhZCBvZiB0aGUgbmF0aXZlIFVSTCBvYmplY3QncyAnc2VhcmNoUGFyYW1zJyBwcm9wZXJ0eSB0byBhbGxvdyB0aGVcbiAqIENsb3N1cmUgQ29tcGlsZXIgdG8gY29kZS1zdHJpcCB0aGUgcG9seWZpbGwgaWYgc2VhcmNoUGFyYW1zIGFyZSBuZXZlciB1c2VkLlxuICogQHBhcmFtIHVybCBUaGUgVVJMIG9iamVjdCB0byBkZXJpdmUgU2VhcmNoUGFyYW1zIGZvci5cbiAqIEByZXR1cm4gVGhlIFVSTFNlYXJjaFBhcmFtcy1saWtlIG9iamVjdCBmb3IgdGhlIFVSTC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlYXJjaFBhcmFtcyh1cmw6IFVybExpa2V8VVJMKTogUmVhZG9ubHlTZWFyY2hQYXJhbXMge1xuICBpZiAoZ29vZy5GRUFUVVJFU0VUX1lFQVIgPj0gMjAyMCB8fFxuICAgICAgKHN1cHBvcnRzTmF0aXZlVVJMQ29uc3RydWN0b3IgJiZcbiAgICAgICAodXJsIGFzIHtzZWFyY2hQYXJhbXM6IFJlYWRvbmx5U2VhcmNoUGFyYW1zfSkuc2VhcmNoUGFyYW1zKSkge1xuICAgIHJldHVybiAodXJsIGFzIHtzZWFyY2hQYXJhbXM6IFJlYWRvbmx5U2VhcmNoUGFyYW1zfSkuc2VhcmNoUGFyYW1zO1xuICB9XG4gIHJldHVybiBuZXcgU2VhcmNoUGFyYW1zSW1wbCh1cmwuc2VhcmNoKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGdpdmVuIHJlbGF0aXZlIFVSTCBzdHJpbmcgd2l0aG91dCByZXF1aXJpbmcgYSBzcGVjaWZpYyBiYXNlIFVSTFxuICogKHVubGlrZSByZXNvbHZlVXJsKS4gV2lsbCByZXNvbHZlIHRoZSByZWxhdGl2ZSBVUkwgYWdhaW5zdCB0aGUgY3VycmVudFxuICogZG9jdW1lbnQncyBCYXNlVVJJLCBhbmQgdGhlIHJlc3VsdGluZyBVUkwgV0lMTCBjb250YWluIHByb3BlcnRpZXMgZnJvbVxuICogdGhpcyBVUkkuXG4gKiBAcGFyYW0gcmVsYXRpdmVVUkwgQSBzdHJpbmcgd2hpY2ggbWF5IGJlIG9ubHkgYSByZWxhdGl2ZSBVUkwgKGkuZS5cbiAqICAgICBoYXMgbm8gcHJvdG9jb2wsIHVzZXJpbmZvLCBob3N0bmFtZSwgb3IgcG9ydCkuXG4gKiBAcmV0dXJuIEEgVVJMIHRoYXQgaXMgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgZG9jdW1lbnQncyBCYXNlIFVSSVxuICogICAgIHdpdGggYWxsIHRoZSByZWxldmFudCByZWxhdGl2ZSBwYXJ0cyBmcm9tIHRoZSBpbnB1dCBwYXJhbWV0ZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUmVsYXRpdmVVcmwocmVsYXRpdmVVUkw6IHN0cmluZyk6IFVybExpa2Uge1xuICByZXR1cm4gcmVzb2x2ZVVybChyZWxhdGl2ZVVSTCwgdXJsQmFzZSk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFVybFByaW1pdGl2ZVBhcnRzUGFydGlhbCB7XG4gIHJlYWRvbmx5IHByb3RvY29sPzogc3RyaW5nO1xuICByZWFkb25seSB1c2VybmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGhvc3RuYW1lPzogc3RyaW5nO1xuICByZWFkb25seSBwb3J0Pzogc3RyaW5nO1xuICByZWFkb25seSBwYXRobmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgc2VhcmNoPzogc3RyaW5nO1xuICByZWFkb25seSBzZWFyY2hQYXJhbXM/OiBJdGVyYWJsZTxyZWFkb25seSBzdHJpbmdbXT47XG4gIHJlYWRvbmx5IGhhc2g/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgb2JqZWN0IGZyb20gcHJpbWl0dmUgcGFydHMsIG9wdGlvbmFsbHkgYWxsb3dpbmcgZm9yIHNvbWUgb2ZcbiAqIHRob3NlIHBhcnRzIHRvIGJlIHRha2VuIGZyb20gYSBiYXNlIFVSTCBvYmplY3QuIFBhcnRzIG9ubHkgYWNjZXB0cyBwcmltaXRpdmVcbiAqIHBhcnRzIG9mIHRoZSBVUkwgKGUuZyB3aWxsIE5PVCBhY2NlcHQgb3JpZ2luIG9yIGhvc3QpIGZvciBzaW1wbGljaXR5LCBhbmRcbiAqIG9ubHkgYWNjZXB0cyBlaXRoZXIgYSBzZWFyY2ggT1Igc2VhcmNoUGFyYW1zIHByb3BlcnR5LCBub3QgYm90aCBhdCB0aGUgc2FtZVxuICogdGltZS4gVGhlIHJlc3VsdGluZyBVUkwtbGlrZSBzdHJpbmcgaXMgdGhlbiBwYXJzZWQgYnkgYHJlc29sdmVVcmxgLCBhbmQgYXNcbiAqIHN1Y2ggdGhpcyBtZXRob2Qgd2lsbCBhbHNvIHRocm93IGFuIGVycm9yIGlmIHRoZSByZXN1bHQgaXMgbm90IGEgdmFsaWQgVVJMXG4gKiAodW5saWtlIE9iamVjdC5hc3NpZ24gYW5kIG90aGVyIHNpbWlsYXIgY29tYmluYXRpb25zIG9mIG9iamVjdCBwcm9wZXJ0aWVzKS5cbiAqXG4gKiBUaGlzIG1ldGhvZCBkb2VzIHNvbWUgdmFsaWRhdGlvbiBvZiBpdHMgaW5wdXRzLCBhbmQgaW4gZ2VuZXJhbCBpcyBOT1QgYSBnb29kXG4gKiB3YXkgdG8gY2xvbmUgYW4gZXhpc3RpbmcgVVJMIG9iamVjdC4gRm9yIHRoYXQgcHVycG9zZSwgcHJlZmVyIHRvIHVzZVxuICogYHJlc29sdmVVcmwoZXhpc3RpbmdVUkxPYmplY3QuaHJlZilgLlxuICogQHBhcmFtIHBhcnRzIFRoZSBwYXJ0cyB0aGF0IHNob3VsZCBiZSBjb21iaW5lZCB0b2dldGhlciB0byBjcmVhdGUgYSBuZXcgVVJMLlxuICogQHBhcmFtIGJhc2UgQW4gb3B0aW9uYWwgYmFzZSB3aG9zZSBwcmltaXRpdmUgcGFydHMgYXJlIHVzZWQgaWZcbiAqICAgICB0aGV5IGFyZSBub3Qgc3BlY2lmaWVkIGluIHRoZSBwYXJ0cyBwYXJhbS4gSWYgYWxsIHJlcXVpcmVkIHByaW1pdGl2ZVxuICogICAgIHBhcnRzIChob3N0LCBwcm90b2NvbCkgYXJlIHNwZWNpZmllZCBpbiB0aGUgcGFydHMgcGFyYW0sIHRoaXMgY2FuIGJlXG4gKiAgICAgb21pdHRlZC5cbiAqIEByZXR1cm4gVGhlIHJlc3VsdGluZyBVUkwgb2JqZWN0IGlmIHZhbGlkLiBXaWxsIHRocm93IGFuIGVycm9yIGlmXG4gKiAgICAgdGhlIHJlc3VsdGluZyBjb21iaW5hdGlvbiBvZiBwYXJ0cyBhbmQgYmFzZSBpcyBpbnZhbGlkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXJsKFxuICAgIHBhcnRzOiBVcmxQcmltaXRpdmVQYXJ0c1BhcnRpYWwsIGJhc2U/OiBVcmxMaWtlKTogVXJsTGlrZSB7XG4gIGFzc2VydChcbiAgICAgICEocGFydHMuc2VhcmNoICYmIHBhcnRzLnNlYXJjaFBhcmFtcyksXG4gICAgICAnT25seSBwcm92aWRlIHNlYXJjaCBvciBzZWFyY2hQYXJhbXMsIG5vdCBib3RoJyk7XG4gIC8vIEFsYXMgd2UgY2Fubm90IHVzZSBPYmplY3QuYXNzaWduIGFzIHRoZSBuYXRpdmUgVVJMIG9iamVjdCB3aWxsIG5vdCBsZXQgaXRzXG4gIC8vIHByb3BlcnRpZXMgYmUgY29waWVkIG92ZXIuXG4gIGxldCBuZXdQYXJ0cyA9IHt9IGFzIEluaXRpYWxpemFibGVVcmxMaWtlO1xuICBpZiAoYmFzZSkge1xuICAgIG5ld1BhcnRzLnByb3RvY29sID0gYmFzZS5wcm90b2NvbDtcbiAgICBuZXdQYXJ0cy51c2VybmFtZSA9IGJhc2UudXNlcm5hbWU7XG4gICAgbmV3UGFydHMucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgIG5ld1BhcnRzLmhvc3RuYW1lID0gYmFzZS5ob3N0bmFtZTtcbiAgICBuZXdQYXJ0cy5wb3J0ID0gYmFzZS5wb3J0O1xuICAgIG5ld1BhcnRzLnBhdGhuYW1lID0gYmFzZS5wYXRobmFtZTtcbiAgICBuZXdQYXJ0cy5zZWFyY2ggPSBiYXNlLnNlYXJjaDtcbiAgICAvLyBOb3RlIHdlIGRvbid0IGNvcHkgb3ZlciBzZWFyY2hQYXJhbXMgaGVyZSBhcyB3ZSB3b24ndCB1c2UgaXQgYW55d2F5cy5cbiAgICAvLyBzZWFyY2ggc2hvdWxkIGJlIGF2YWlsYWJsZSBpbnN0ZWFkLlxuICAgIG5ld1BhcnRzLmhhc2ggPSBiYXNlLmhhc2g7XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihuZXdQYXJ0cywgcGFydHMpO1xuXG4gIC8vIENoZWNrIGZvciBzcGVjIGNvbXBsaWFuY2VcbiAgaWYgKG5ld1BhcnRzLnBvcnQgJiYgbmV3UGFydHMucG9ydFswXSA9PT0gJzonKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwb3J0IHNob3VsZCBub3Qgc3RhcnQgd2l0aCBcXCc6XFwnJyk7XG4gIH1cbiAgaWYgKG5ld1BhcnRzLmhhc2ggJiYgbmV3UGFydHMuaGFzaFswXSAhPSAnIycpIHtcbiAgICBuZXdQYXJ0cy5oYXNoID0gJyMnICsgbmV3UGFydHMuaGFzaDtcbiAgfVxuICAvLyBNYW51YWxseSBhc3NpZ24gc2VhcmNoL3NlYXJjaFBhcmFtcyBmcm9tIHBhcnRzIGFuZCBjbGVhbiB1cCBuZXdQYXJ0cyBzbyBpdFxuICAvLyBvbmx5IHNwZWNpZmllcyBhIHNlYXJjaCBwcm9wZXJ0eS5cbiAgLy8gcHJlY2VkZW5jZSBpcyBhcyBmb2xsb3dzOlxuICAvLyBwYXJ0cy5zZWFyY2hcbiAgLy8gcGFydHMuc2VhcmNoUGFyYW1zXG4gIC8vIG5ld1BhcnRzLnNlYXJjaCAoYWthIGJhc2Uuc2VhcmNoKVxuICBpZiAocGFydHMuc2VhcmNoKSB7XG4gICAgaWYgKHBhcnRzLnNlYXJjaFswXSAhPSAnPycpIHtcbiAgICAgIG5ld1BhcnRzLnNlYXJjaCA9ICc/JyArIHBhcnRzLnNlYXJjaDtcbiAgICB9XG4gICAgLy8gbmV3UGFydHMuc2VhcmNoIGlzIGFscmVhZHkgZXF1YWwgdG8gcGFydHMuc2VhcmNoIGR1ZSB0byBPYmplY3QuYXNzaWduXG4gICAgLy8gYWJvdmUuIHNlYXJjaFBhcmFtcyB3aWxsIGJlIHVuZGVmaW5lZCBoZXJlIGFzIGl0IGlzbid0IGNvcGllZCBmcm9tIGJhc2UuXG4gIH0gZWxzZSBpZiAocGFydHMuc2VhcmNoUGFyYW1zKSB7XG4gICAgbmV3UGFydHMuc2VhcmNoID0gJz8nICsgaXRlcmFibGVTZWFyY2hQYXJhbXNUb1N0cmluZyhwYXJ0cy5zZWFyY2hQYXJhbXMpO1xuICAgIC8vIE5vdCBzdHJpY3RseSBuZWNlc3NhcnksIGJ1dCBjbGVhciBzZWFyY2hQYXJhbXMgbm93IHdlIGhhdmUgc2VyaWFsaXplZCBpdC5cbiAgICBuZXdQYXJ0cy5zZWFyY2hQYXJhbXMgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBsZXQgc2IgPSAnJztcbiAgaWYgKG5ld1BhcnRzLnByb3RvY29sKSB7XG4gICAgc2IgKz0gbmV3UGFydHMucHJvdG9jb2wgKyAnLy8nO1xuICB9XG5cbiAgY29uc3QgdXNlcmluZm8gPSBhc3NlbWJsZVVzZXJJbmZvKG5ld1BhcnRzLnVzZXJuYW1lLCBuZXdQYXJ0cy5wYXNzd29yZCk7XG4gIHNiICs9IHVzZXJpbmZvO1xuICBzYiArPSBuZXdQYXJ0cy5ob3N0bmFtZSB8fCAnJztcbiAgaWYgKG5ld1BhcnRzLnBvcnQpIHtcbiAgICBzYiArPSAnOicgKyBuZXdQYXJ0cy5wb3J0O1xuICB9XG4gIHNiICs9IG5ld1BhcnRzLnBhdGhuYW1lIHx8ICcnO1xuICBzYiArPSBuZXdQYXJ0cy5zZWFyY2ggfHwgJyc7XG4gIHNiICs9IG5ld1BhcnRzLmhhc2ggfHwgJyc7XG4gIHJldHVybiByZXNvbHZlVXJsKHNiKTtcbn07XG5cbnR5cGUgSW5pdGlhbGl6YWJsZVVybExpa2UgPSB7XG4gIC1yZWFkb25seVtLIGluIGtleW9mIFVybExpa2VdOiBVcmxMaWtlW0tdXG59JntzZWFyY2hQYXJhbXM/OiBNYXA8c3RyaW5nLCByZWFkb25seSBzdHJpbmdbXT59O1xuIl19