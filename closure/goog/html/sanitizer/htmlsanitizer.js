// Copyright 2016 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview An HTML sanitizer that can satisfy a variety of security
 * policies.
 *
 * This package provides html sanitizing functions. It does not enforce string
 * to string conversion, instead returning a dom-like element when possible.
 *
 * Examples of usage of the static {@code goog.goog.html.sanitizer.sanitize}:
 * <pre>
 *   var safeHtml = goog.html.sanitizer.sanitize('<script src="xss.js" />');
 *   goog.dom.safe.setInnerHtml(el, safeHtml);
 * </pre>
 *
 * @supported IE 10+, Chrome 26+, Firefox 22+, Safari 7.1+, Opera 15+
 */

goog.provide('goog.html.sanitizer.HtmlSanitizer');
goog.provide('goog.html.sanitizer.HtmlSanitizer.Builder');
goog.provide('goog.html.sanitizer.HtmlSanitizerPolicy');
goog.provide('goog.html.sanitizer.HtmlSanitizerPolicyContext');
goog.provide('goog.html.sanitizer.HtmlSanitizerPolicyHints');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.dom.NodeType');
goog.require('goog.functions');
goog.require('goog.html.SafeHtml');
goog.require('goog.html.SafeStyle');
goog.require('goog.html.SafeUrl');
goog.require('goog.html.sanitizer.AttributeSanitizedWhitelist');
goog.require('goog.html.sanitizer.AttributeWhitelist');
goog.require('goog.html.sanitizer.CssSanitizer');
goog.require('goog.html.sanitizer.TagBlacklist');
goog.require('goog.html.sanitizer.TagWhitelist');
goog.require('goog.html.uncheckedconversions');
goog.require('goog.object');
goog.require('goog.string');
goog.require('goog.string.Const');
goog.require('goog.userAgent');


/**
 * Type for optional hints to policy handler functions.
 * @typedef {{
 *     tagName: (string|undefined),
 *     attributeName: (string|undefined),
 *     cssProperty: (string|undefined)
 *     }}
 */
goog.html.sanitizer.HtmlSanitizerPolicyHints;


/**
 * Type for optional context objects to the policy handler functions.
 * @typedef {{
 *     cssStyle: (?CSSStyleDeclaration|undefined)
 *     }}
 */
goog.html.sanitizer.HtmlSanitizerPolicyContext;


/**
 * Type for a policy function.
 * @typedef {function(string, goog.html.sanitizer.HtmlSanitizerPolicyHints=,
 *     goog.html.sanitizer.HtmlSanitizerPolicyContext=,
 *     goog.html.sanitizer.HtmlSanitizerPolicy=):?string}
 */
goog.html.sanitizer.HtmlSanitizerPolicy;


/**
 * Type for attribute policy configuration.
 * @typedef {{
 *     tagName: string,
 *     attributeName: string,
 *     policy: ?goog.html.sanitizer.HtmlSanitizerPolicy
 * }}
 */
goog.html.sanitizer.HtmlSanitizerAttributePolicy;


/**
 * Boolean for whether the HTML sanitizer is supported. For now mainly exclude
 * IE9 or below where we know the sanitizer is insecure.
 * @private {boolean}
 * @const
 */
goog.html.sanitizer.HTML_SANITIZER_SUPPORTED_ =
    !goog.userAgent.IE || document.documentMode >= 10;


/**
 * Boolean for whether the template tag is supported.
 * @package
 * @const
 */
goog.html.sanitizer.HTML_SANITIZER_TEMPLATE_SUPPORTED =
    !goog.userAgent.IE || !goog.isDefAndNotNull(document.documentMode);


/**
 * Prefix used by all internal html sanitizer booking properties.
 * @private {string}
 * @const
 */
goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_ = 'data-sanitizer-';


/**
 * String defining the temporary attribute name in which html sanitizer uses for
 * bookkeeping.
 * @private {string}
 * @const
 */
goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_ATTR_NAME_ =
    goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_ + 'elem-num';


/**
 * String defining the name of the attribute added to span tags that replace
 * unknown tags. The value of this attribute is the name of the tag before the
 * sanitization occurred.
 * @private
 * @const
 */
goog.html.sanitizer.HTML_SANITIZER_SANITIZED_ATTR_NAME_ =
    goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_ + 'original-tag';


/**
 * String defining the name of the attribute added to blacklisted tags to
 * then filter them from the output.
 * @private
 * @const
 */
goog.html.sanitizer.HTML_SANITIZER_BLACKLISTED_TAG_ =
    goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_ + 'blacklisted-tag';


/**
 * Map of property descriptors we use to avoid looking up the prototypes
 * multiple times.
 * @private {!Object<string, !ObjectPropertyDescriptor>}
 * @const
 */
goog.html.sanitizer.HTML_SANITIZER_PROPERTY_DESCRIPTORS_ =
    goog.html.sanitizer.HTML_SANITIZER_SUPPORTED_ ? {
      'attributes':
          Object.getOwnPropertyDescriptor(Element.prototype, 'attributes'),
      'setAttribute':
          Object.getOwnPropertyDescriptor(Element.prototype, 'setAttribute'),
      'innerHTML':
          Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML'),
      'nodeName': Object.getOwnPropertyDescriptor(Node.prototype, 'nodeName'),
      'parentNode':
          Object.getOwnPropertyDescriptor(Node.prototype, 'parentNode'),
      'childNodes':
          Object.getOwnPropertyDescriptor(Node.prototype, 'childNodes'),
      'style': Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style')
    } :
                                                    {};


/**
 * Creates an HTML sanitizer.
 * @param {!goog.html.sanitizer.HtmlSanitizer.Builder=} opt_builder
 * @final
 * @constructor @struct
 */
goog.html.sanitizer.HtmlSanitizer = function(opt_builder) {
  opt_builder = opt_builder || new goog.html.sanitizer.HtmlSanitizer.Builder();

  /**
   * @private {boolean}
   */
  this.shouldSanitizeTemplateContents_ =
      opt_builder.shouldSanitizeTemplateContents_;

  /**
   * @private {!Object<string, !goog.html.sanitizer.HtmlSanitizerPolicy>}
   */
  this.attributeHandlers_ = goog.object.clone(opt_builder.attributeWhitelist_);

  /**
   * @private {!Object<string, boolean>}
   */
  this.tagBlacklist_ = goog.object.clone(opt_builder.tagBlacklist_);

  /**
   * @private {!Object<string, boolean>}
   */
  this.tagWhitelist_ = goog.object.clone(opt_builder.tagWhitelist_);

  /**
   * @private {boolean}
   */
  this.shouldAddOriginalTagNames_ = opt_builder.shouldAddOriginalTagNames_;

  // Add whitelist data-* attributes from the builder to the attributeHandlers
  // with a default cleanUpAttribute function. data-* attributes are inert as
  // per HTML5 specs, so not much sanitization needed.
  goog.array.forEach(opt_builder.dataAttributeWhitelist_, function(dataAttr) {
    // TODO(danesh): What if this is just data-, do we need to check data-\w+?
    goog.asserts.assert(goog.string.startsWith(dataAttr, 'data-'));
    goog.asserts.assert(!goog.string.startsWith(
        dataAttr, goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_));

    this.attributeHandlers_['* ' + dataAttr.toUpperCase()] =
        /** @type {goog.html.sanitizer.HtmlSanitizerPolicy} */ (
            goog.html.sanitizer.HtmlSanitizer.cleanUpAttribute_);
  }, this);
};



/**
 * Returns a function which unwraps SafeUrl from an almost HtmlSanitizerPolicy.
 * @param {!function(string, goog.html.sanitizer.HtmlSanitizerPolicyHints=)
 *     :?goog.html.SafeUrl} customUrlPolicy
 * @return {!goog.html.sanitizer.HtmlSanitizerPolicy}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.sanitizeUrl_ = function(customUrlPolicy) {
  return /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (
      function(url, policyHints) {
        var trimmed = goog.html.sanitizer.HtmlSanitizer.cleanUpAttribute_(
            url, policyHints);
        var safeUrl = customUrlPolicy(trimmed, policyHints);
        if (safeUrl && goog.html.SafeUrl.unwrap(safeUrl) !=
            goog.html.SafeUrl.INNOCUOUS_STRING) {
          return goog.html.SafeUrl.unwrap(safeUrl);
        } else {
          return null;
        }
      });
};



/**
 * A builder class for the Html Sanitizer. All methods except build return this.
 * @final
 * @constructor @struct
 */
goog.html.sanitizer.HtmlSanitizer.Builder = function() {
  /**
   * A set of attribute sanitization functions. Default built-in handlers are
   * all tag-agnostic by design. Note that some attributes behave differently
   * when attached to different nodes (for example, the href attribute will
   * generally not make a network request, but &lt;link href=""&gt; does), and
   * so when necessary a tag-specific handler can be used to override a
   * tag-agnostic one.
   * @private {!Object<string, goog.html.sanitizer.HtmlSanitizerPolicy>}
   */
  this.attributeWhitelist_ = {};
  goog.array.forEach(
      [
        goog.html.sanitizer.AttributeWhitelist,
        goog.html.sanitizer.AttributeSanitizedWhitelist
      ],
      function(wl) {
        goog.array.forEach(goog.object.getKeys(wl), function(attr) {
          this.attributeWhitelist_[attr] =
              /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */
              (goog.html.sanitizer.HtmlSanitizer.cleanUpAttribute_);
        }, this);
      },
      this);

  /**
   * A set of attribute handlers that should not inherit their default policy
   * during build().
   * @private {!Object<string, boolean>}
   */
  this.attributeOverrideList_ = {};


  /**
   * Keeps track of whether we allow form tags.
   * @private {boolean}
   */
  this.allowFormTag_ = false;

  /**
   * Whether the content of TEMPLATE tags (assuming TEMPLATE is whitelisted)
   * should be sanitized or passed through.
   * @private {boolean}
   */
  this.shouldSanitizeTemplateContents_ = true;

  /**
   * List of data attributes to whitelist. Data-attributes are inert and don't
   * require sanitization.
   * @private {!Array<string>}
   */
  this.dataAttributeWhitelist_ = [];

  /**
   * A tag blacklist, to effectively remove an element and its children from the
   * dom.
   * @private {!Object<string, boolean>}
   */
  this.tagBlacklist_ = {};

  /**
   * A tag whitelist, to effectively allow an element and its children from the
   * dom.
   * @private {!Object<string, boolean>}
   */
  this.tagWhitelist_ = goog.object.clone(goog.html.sanitizer.TagWhitelist);

  /**
   * If true, non-whitelisted, non-blacklisted tags that have been converted
   * to <span> tags will contain the original tag in a data attribute.
   * @private {boolean}
   */
  this.shouldAddOriginalTagNames_ = false;

  /**
   * A function to be applied to urls found on the parsing process which do not
   * trigger requests.
   * @private {!goog.html.sanitizer.HtmlSanitizerPolicy}
   */
  this.urlPolicy_ = goog.html.sanitizer.HtmlSanitizer.defaultUrlPolicy_;

  /**
   * A function to be applied to urls found on the parsing process which may
   * trigger requests.
   * @private {!goog.html.sanitizer.HtmlSanitizerPolicy}
   */
  this.networkRequestUrlPolicy_ =
      goog.html.sanitizer.HtmlSanitizer.defaultNetworkRequestUrlPolicy_;

  /**
   * A function to be applied to names found on the parsing process.
   * @private {!goog.html.sanitizer.HtmlSanitizerPolicy}
   */
  this.namePolicy_ = goog.html.sanitizer.HtmlSanitizer.defaultNamePolicy_;

  /**
   * A function to be applied to other tokens (i.e. classes and IDs) found on
   * the parsing process.
   * @private {!goog.html.sanitizer.HtmlSanitizerPolicy}
   */
  this.tokenPolicy_ = goog.html.sanitizer.HtmlSanitizer.defaultTokenPolicy_;

  /**
   * A function to sanitize inline CSS styles.
   * @private {(undefined|function(goog.html.sanitizer.HtmlSanitizerPolicy,
   * string,
   *     goog.html.sanitizer.HtmlSanitizerPolicyHints,
   *     goog.html.sanitizer.HtmlSanitizerPolicyContext):?string)}
   */
  this.sanitizeCssPolicy_ = undefined;
};


/**
 * Allow specified data attributes.
 * @param {!Array<string>} dataAttributeWhitelist
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.allowDataAttributes =
    function(dataAttributeWhitelist) {
  goog.array.extend(this.dataAttributeWhitelist_, dataAttributeWhitelist);
  return this;
};


/**
 * Allow form tags in the HTML. Without this all form tags and content will be
 * dropped.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.allowFormTag = function() {
  this.allowFormTag_ = true;
  return this;
};


/**
 * Package-internal utility method to extend the tag whitelist.
 *
 * @param {!Array<string>} tags The list of tags to be added to the whitelist.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 * @package
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype
    .alsoAllowTagsPrivateDoNotAccessOrElse = function(tags) {
  goog.array.forEach(tags, function(tag) {
    this.tagWhitelist_[tag.toUpperCase()] = true;
  }, this);
  return this;
};


/**
 * Package-internal utility method to extend the attribute whitelist.
 *
 * @param {!Array<(string|!goog.html.sanitizer.HtmlSanitizerAttributePolicy)>}
 *     attrs The list of attributes to be added to the whitelist.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 * @package
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype
    .alsoAllowAttributesPrivateDoNotAccessOrElse = function(attrs) {
  goog.array.forEach(attrs, function(attr) {
    if (goog.isString(attr)) {
      attr = {tagName: '*', attributeName: attr, policy: null};
    }
    var handlerName = goog.html.sanitizer.HtmlSanitizer.attrIdentifier_(
        attr.tagName, attr.attributeName);
    this.attributeWhitelist_[handlerName] = attr.policy ?
        attr.policy :
        /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (
            goog.html.sanitizer.HtmlSanitizer.cleanUpAttribute_);
    this.attributeOverrideList_[handlerName] = true;
  }, this);
  return this;
};


/**
 * Package-internal utility method to turn off sanitization of template tag
 * contents and pass them unmodified.
 *
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 * @throws {!Error}
 * @package
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype
    .keepUnsanitizedTemplateContentsPrivateDoNotAccessOrElse = function() {
  if (!goog.html.sanitizer.HTML_SANITIZER_TEMPLATE_SUPPORTED) {
    throw new Error(
        'Cannot let unsanitized template contents through on ' +
        'browsers that do not support TEMPLATE');
  }
  this.shouldSanitizeTemplateContents_ = false;
  return this;
};


/**
 * Allows only the provided whitelist of tags. Tags still need to be in the
 * TagWhitelist to be allowed.
 * <p>
 * SPAN tags are ALWAYS ALLOWED as part of the mechanism required to preserve
 * the HTML tree structure (when removing non-blacklisted tags and
 * non-whitelisted tags).
 * @param {!Array<string>} tagWhitelist
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 * @throws {Error} Thrown if an attempt is made to allow a non-whitelisted tag.
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.onlyAllowTags = function(
    tagWhitelist) {
  this.tagWhitelist_ = {'SPAN': true};
  goog.array.forEach(tagWhitelist, function(tag) {
    tag = tag.toUpperCase();
    if (goog.html.sanitizer.TagWhitelist[tag]) {
      this.tagWhitelist_[tag] = true;
    } else {
      throw new Error(
          'Only whitelisted tags can be allowed. See ' +
          'goog.html.sanitizer.TagWhitelist');
    }
  }, this);
  return this;
};


/**
 * Allows only the provided whitelist of attributes, possibly setting a custom
 * policy for them. The set of tag/attribute combinations need to be a subset of
 * the currently allowed combinations.
 *
 * Note that you cannot define a generic handler for an attribute if only a
 * tag-specific one is present, and viceversa. To configure the sanitizer to
 * accept an attribute only for a specific tag when only a generic handler is
 * whitelisted, use the goog.html.sanitizer.HtmlSanitizerPolicyHints parameter
 * and simply reject the attribute in unwanted tags.
 *
 * Also note that the sanitizer's policy is still called after the provided one,
 * to ensure that supplying misconfigured policy cannot introduce
 * vulnerabilities. To completely override an existing attribute policy or to
 * allow new attributes, see the goog.html.sanitizer.unsafe package.
 *
 * @param {!Array<(string|!goog.html.sanitizer.HtmlSanitizerAttributePolicy)>}
 *     attrWhitelist The subset of attributes that the sanitizer will accept.
 *     Attributes can come in of two forms:
 *     - string: allow all values for this attribute on all tags.
 *     - HtmlSanitizerAttributePolicy: allows specifying a policy for a
 *         particular tag. The tagName can be "*", which means all tags. If no
 *         policy is passed, the default is to allow all values.
 *     The tag and attribute names are case-insensitive.
 *     Note that the policy for id, URLs, names etc is controlled separately
 *     (using withCustom* methods).
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 * @throws {Error} Thrown if an attempt is made to allow a non-whitelisted
 *     attribute.
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.onlyAllowAttributes =
    function(attrWhitelist) {
  var oldWhitelist = this.attributeWhitelist_;
  this.attributeWhitelist_ = {};
  goog.array.forEach(attrWhitelist, function(attr) {
    if (goog.typeOf(attr) === 'string') {
      attr = {tagName: '*', attributeName: attr.toUpperCase(), policy: null};
    }
    var handlerName = goog.html.sanitizer.HtmlSanitizer.attrIdentifier_(
        attr.tagName, attr.attributeName);
    if (!oldWhitelist[handlerName]) {
      throw new Error('Only whitelisted attributes can be allowed.');
    }
    this.attributeWhitelist_[handlerName] = attr.policy ?
        attr.policy :
        /** @type {goog.html.sanitizer.HtmlSanitizerPolicy} */ (
            goog.html.sanitizer.HtmlSanitizer.cleanUpAttribute_);
  }, this);
  return this;
};


/**
 * When unknown tags are sanitized to <span>, pass the original tag name in
 * the data attribute 'original-tag', so that caller can distinguish them from
 * actual <span> tags.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.addOriginalTagNames =
    function() {
  this.shouldAddOriginalTagNames_ = true;
  return this;
};


/**
 * Sets a custom network URL policy.
 * @param {!function(string, goog.html.sanitizer.HtmlSanitizerPolicyHints=)
 *     :?goog.html.SafeUrl} customNetworkReqUrlPolicy
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype
    .withCustomNetworkRequestUrlPolicy = function(customNetworkReqUrlPolicy) {
  this.networkRequestUrlPolicy_ =
      goog.html.sanitizer.HtmlSanitizer.sanitizeUrl_(customNetworkReqUrlPolicy);
  return this;
};


/**
 * Sets a custom non-network URL policy.
 * @param {!function(string, goog.html.sanitizer.HtmlSanitizerPolicyHints=)
 *     :?goog.html.SafeUrl} customUrlPolicy
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.withCustomUrlPolicy =
    function(customUrlPolicy) {
  this.urlPolicy_ =
      goog.html.sanitizer.HtmlSanitizer.sanitizeUrl_(customUrlPolicy);
  return this;
};


/**
 * Sets a custom name policy.
 * @param {!goog.html.sanitizer.HtmlSanitizerPolicy} customNamePolicy
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.withCustomNamePolicy =
    function(customNamePolicy) {
  this.namePolicy_ = customNamePolicy;
  return this;
};


/**
 * Sets a custom token policy.
 * @param {!goog.html.sanitizer.HtmlSanitizerPolicy} customTokenPolicy
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.withCustomTokenPolicy =
    function(customTokenPolicy) {
  this.tokenPolicy_ = customTokenPolicy;
  return this;
};


/**
 * Allows inline CSS styles.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.allowCssStyles =
    function() {
  this.sanitizeCssPolicy_ = goog.html.sanitizer.HtmlSanitizer.sanitizeCssBlock_;
  return this;
};


/**
 * Wraps a custom policy function with the sanitizer's default policy.
 * @param {?goog.html.sanitizer.HtmlSanitizerPolicy} customPolicy The custom
 *     policy for the tag/attribute combination.
 * @param {!goog.html.sanitizer.HtmlSanitizerPolicy} defaultPolicy The
 *     sanitizer's policy that is always called after the custom policy.
 * @return {!goog.html.sanitizer.HtmlSanitizerPolicy}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.wrapPolicy_ = function(
    customPolicy, defaultPolicy) {
  return /** @type {goog.html.sanitizer.HtmlSanitizerPolicy} */ (function(
      value, hints, ctx, policy) {
    var result = customPolicy(value, hints, ctx, policy);
    if (goog.isNull(result)) {
      return null;
    }
    return defaultPolicy(result, hints, ctx, policy);
  });
};


/**
 * Installs the sanitizer's default policy for a specific tag/attribute
 * combination on the provided whitelist, but only if a policy already exists.
 *
 * @param {!Object<string, goog.html.sanitizer.HtmlSanitizerPolicy>} wl The
 *     whitelist to modify.
 * @param {!Object<string, boolean>} ol The set of attributes handlers that
 *     should not be wrapped with a default policy.
 * @param {string} key The tag/attribute combination
 * @param {!goog.html.sanitizer.HtmlSanitizerPolicy} defaultPolicy The
 * sanitizer's
 *     policy.
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.installDefaultPolicy_ = function(
    wl, ol, key, defaultPolicy) {
  if (wl[key] && !ol[key]) {
    wl[key] =
        goog.html.sanitizer.HtmlSanitizer.wrapPolicy_(wl[key], defaultPolicy);
  }
};


/**
 * Build and return a goog.html.sanitizer.HtmlSanitizer object.
 * @return {!goog.html.sanitizer.HtmlSanitizer}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.build = function() {
  if (!this.allowFormTag_) {
    this.tagBlacklist_['FORM'] = true;
  }

  var installPolicy = goog.html.sanitizer.HtmlSanitizer.installDefaultPolicy_;

  // Binding all the non-trivial attribute sanitizers to the appropriate,
  // potentially customizable, handling functions at build().
  installPolicy(
      this.attributeWhitelist_, this.attributeOverrideList_, '* USEMAP',
      /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (
          goog.html.sanitizer.HtmlSanitizer.sanitizeUrlFragment_));

  var urlAttributes = ['* ACTION', '* CITE', '* HREF'];
  goog.array.forEach(urlAttributes, function(attribute) {
    installPolicy(
        this.attributeWhitelist_, this.attributeOverrideList_, attribute,
        this.urlPolicy_);
  }, this);

  var networkUrlAttributes = [
    // LONGDESC can result in a network request. See b/23381636.
    '* LONGDESC', '* SRC', 'LINK HREF'
  ];
  goog.array.forEach(networkUrlAttributes, function(attribute) {
    installPolicy(
        this.attributeWhitelist_, this.attributeOverrideList_, attribute,
        this.networkRequestUrlPolicy_);
  }, this);

  var nameAttributes = ['* FOR', '* HEADERS', '* NAME'];
  goog.array.forEach(nameAttributes, function(attribute) {
    installPolicy(
        this.attributeWhitelist_, this.attributeOverrideList_, attribute,
        /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (goog.partial(
            goog.html.sanitizer.HtmlSanitizer.sanitizeName_,
            this.namePolicy_)));
  }, this);

  installPolicy(
      this.attributeWhitelist_, this.attributeOverrideList_, 'A TARGET',
      /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (goog.partial(
          goog.html.sanitizer.HtmlSanitizer.allowedAttributeValues_,
          ['_blank', '_self'])));

  installPolicy(
      this.attributeWhitelist_, this.attributeOverrideList_, '* CLASS',
      /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (goog.partial(
          goog.html.sanitizer.HtmlSanitizer.sanitizeClasses_,
          this.tokenPolicy_)));

  installPolicy(
      this.attributeWhitelist_, this.attributeOverrideList_, '* ID',
      /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (goog.partial(
          goog.html.sanitizer.HtmlSanitizer.sanitizeId_, this.tokenPolicy_)));

  if (this.sanitizeCssPolicy_) {
    installPolicy(
        this.attributeWhitelist_, this.attributeOverrideList_, '* STYLE',
        /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (goog.partial(
            this.sanitizeCssPolicy_, this.networkRequestUrlPolicy_)));
  } else {
    installPolicy(
        this.attributeWhitelist_, this.attributeOverrideList_, '* STYLE',
        goog.functions.NULL);
  }

  return new goog.html.sanitizer.HtmlSanitizer(this);
};


/**
 * The default policy for URLs: allow any.
 * @param {string} token The URL to undergo this policy.
 * @return {?string}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.defaultUrlPolicy_ =
    goog.html.sanitizer.HtmlSanitizer.sanitizeUrl_(goog.html.SafeUrl.sanitize);


/**
 * The default policy for URLs which cause network requests: drop all.
 * @param {string} token The URL to undergo this policy.
 * @return {null}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.defaultNetworkRequestUrlPolicy_ =
    goog.functions.NULL;


/**
 * The default policy for attribute names: drop all.
 * @param {string} token The name to undergo this policy.
 * @return {?string}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.defaultNamePolicy_ = goog.functions.NULL;


/**
 * The default policy for other tokens (i.e. class names and IDs): drop all.
 * @param {string} token The token to undergo this policy.
 * @return {?string}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.defaultTokenPolicy_ = goog.functions.NULL;



/**
 * Returns a key into the attribute handlers dictionary given a node name and
 * an attribute name. If no node name is given, returns a key applying to all
 * nodes.
 * @param {?string} nodeName
 * @param {string} attributeName
 * @return {string} key into attribute handlers dict
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.attrIdentifier_ = function(
    nodeName, attributeName) {
  if (!nodeName) {
    nodeName = '*';
  }
  return (nodeName + ' ' + attributeName).toUpperCase();
};


/**
 * Sanitizes a block of CSS rules.
 * @param {goog.html.sanitizer.HtmlSanitizerPolicy} policySanitizeUrl
 * @param {string} attrValue
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyContext} policyContext
 * @return {?string} sanitizedCss from the policyContext
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.sanitizeCssBlock_ = function(
    policySanitizeUrl, attrValue, policyHints, policyContext) {
  if (!policyContext.cssStyle) {
    return null;
  }

  var naiveUriRewriter = /** @type {function(string, string): string} */
      (function(uri, prop) {
        policyHints.cssProperty = prop;
        return policySanitizeUrl(uri, policyHints);
      });
  var sanitizedStyle = goog.html.SafeStyle.unwrap(
      goog.html.sanitizer.CssSanitizer.sanitizeInlineStyle(
          policyContext.cssStyle, naiveUriRewriter));
  return sanitizedStyle == '' ? null : sanitizedStyle;
};


/**
 * An attribute handler which "cleans up" attributes that we don't particularly
 * want to do anything to. At the moment we just trim the whitespace.
 * @param {string} attrValue
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @return {string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.cleanUpAttribute_ = function(
    attrValue, policyHints) {
  return goog.string.trim(attrValue);
};


/**
 * An attribute handler which only allows a set of attribute values.
 * @param {!Array<string>} allowedAttrs Set of allowed attributes lowercased.
 * @param {string} attrValue
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.allowedAttributeValues_ = function(
    allowedAttrs, attrValue, policyHints) {
  attrValue = goog.string.trim(attrValue);
  if (goog.array.contains(allowedAttrs, attrValue.toLowerCase())) {
    return attrValue;
  }
  return null;
};


/**
 * An attribute handler which sanitizes fragments.
 * @param {string} attrValue
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.sanitizeUrlFragment_ = function(
    attrValue, policyHints) {
  var trimmed = goog.string.trim(attrValue);
  if (attrValue && trimmed.charAt(0) == '#') {
    // We do not apply the name or token policy to Url Fragments by design.
    return trimmed;
  }
  return null;
};


/**
 * An attribute handler which simply runs the value through the name policy.
 * @param {goog.html.sanitizer.HtmlSanitizerPolicy} namePolicy
 * @param {string} attrValue
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.sanitizeName_ = function(
    namePolicy, attrValue, policyHints) {
  var trimmed = goog.string.trim(attrValue);
  /* TODO(user): fail on names which contain illegal characters.
   * NOTE(jasvir):
   * There are two cases to be concerned about - escaped quotes in attribute
   * values which is the responsibility of the serializer and illegal
   * characters.  The latter does violate the spec but I do not believe it has
   * a security consequence.
   */
  return namePolicy(trimmed, policyHints);
};


/**
 * An attribute handler which ensures that the class prefix is present on all
 * space-separated tokens (i.e. all class names).
 * @param {goog.html.sanitizer.HtmlSanitizerPolicy} tokenPolicy
 * @param {string} attrValue
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.sanitizeClasses_ = function(
    tokenPolicy, attrValue, policyHints) {
  // TODO(user): use a browser-supplied class list instead of a string.
  var classes = attrValue.split(/(?:\s+)/);
  var sanitizedClasses = [];
  for (var i = 0; i < classes.length; i++) {
    // TODO(user): skip classes which contain illegal characters.
    var sanitizedClass = tokenPolicy(classes[i], policyHints);
    if (sanitizedClass) {
      sanitizedClasses.push(sanitizedClass);
    }
  }
  if (sanitizedClasses.length == 0) {
    return null;
  } else {
    return sanitizedClasses.join(' ');
  }
};


/**
 * An attribute handler which ensures that the id prefix is present.
 * @param {goog.html.sanitizer.HtmlSanitizerPolicy} tokenPolicy
 * @param {string} attrValue
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.sanitizeId_ = function(
    tokenPolicy, attrValue, policyHints) {
  var trimmed = goog.string.trim(attrValue);
  // TODO(user): fail on IDs which contain illegal characters.
  return tokenPolicy(trimmed, policyHints);
};


/**
 * Takes a string of unsanitized HTML and parses it, providing an iterator over
 * the resulting DOM tree nodes. This DOM parsing must be wholly inert (that is,
 * it does not cause execution of any active content or cause the browser to
 * issue any requests). The returned iterator is guaranteed to iterate over a
 * parent element before iterating over any of its children.
 * @param {string} unsanitizedHtml
 * @return {!TreeWalker} Dom tree iterator
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getDomTreeWalker_ = function(
    unsanitizedHtml) {
  var iteratorParent;
  // Use a <template> element if possible.
  var templateElement = document.createElement('template');
  if ('content' in templateElement) {
    templateElement.innerHTML = unsanitizedHtml;
    iteratorParent = templateElement.content;
  } else {
    // In browsers where <template> is not implemented, use an HTMLDocument.
    var doc = document.implementation.createHTMLDocument('x');
    iteratorParent = doc.body;
    doc.body.innerHTML = unsanitizedHtml;
  }
  return document.createTreeWalker(
      iteratorParent, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null,
      false);
};

// TODO(pelizzi): both getAttribute* functions accept a Node but are defined on
// Element. Investigate.

/**
 * Provides a way to get an element's attributes without falling prey to things
 * like &lt;form&gt;&lt;input name="attributes"&gt;
 * &lt;input name="attributes"&gt;&lt;/form&gt;.
 * Usage: goog.html.sanitizer.HtmlSanitizer.getAttributes_(elem)
 * @param {!Node} node
 * @return {?NamedNodeMap}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getAttributes_ = function(node) {
  var attrDescriptor =
      goog.html.sanitizer.HTML_SANITIZER_PROPERTY_DESCRIPTORS_['attributes'];
  if (attrDescriptor && attrDescriptor.get) {
    return attrDescriptor.get.apply(node);
  } else {
    return node.attributes instanceof NamedNodeMap ? node.attributes : null;
  }
};

/**
 * Provides a way to get a specific attribute from an element without falling
 * prey to clobbering.
 * Usage: goog.html.sanitizer.HtmlSanitizer.getAttribute(elem, attr_name)
 * @param {!Node} node
 * @param {string} name
 * @return {string}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getAttribute_ = function(node, name) {
  var protoFn = Element.prototype.getAttribute;
  if (protoFn) {
    var ret = protoFn.call(/** @type {!Element} */ (node), name);
    return ret ? ret : '';  // FF returns null
  } else {
    return '';
  }
};

/**
 * Provides a way to set an element's attributes without falling prey to things
 * like &lt;form&gt;&lt;input name="attributes"&gt;
 * &lt;input name="attributes"&gt;&lt;/form&gt;.
 * Usage: goog.html.sanitizer.HtmlSanitizer.attributes_(elem)
 * @param {!Node} node
 * @param {string} name
 * @param {string} value
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.setAttribute_ = function(node, name, value) {
  var attrDescriptor =
      goog.html.sanitizer.HTML_SANITIZER_PROPERTY_DESCRIPTORS_['setAttribute'];
  if (attrDescriptor && attrDescriptor.value) {
    attrDescriptor.value.call(node, name, value);
  }
};


/**
 * Provides a way to get to a node's innerHTML property value without falling
 * prey to clobbering.
 * @param {!Node} node
 * @return {string}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getInnerHTML_ = function(node) {
  var descriptor =
      goog.html.sanitizer.HTML_SANITIZER_PROPERTY_DESCRIPTORS_['innerHTML'];
  if (descriptor && descriptor.get) {
    return descriptor.get.apply(node);
  } else {
    return (typeof node.innerHTML == 'string') ? node.innerHTML : '';
  }
};


/**
 * Provides a way to get an element's style without falling prey to things
 * like &lt;form&gt;&lt;input name="style"&gt;
 * &lt;input name="style"&gt;&lt;/form&gt;.
 * Usage: goog.html.sanitizer.HtmlSanitizer.getStyle_(elem)
 * @param {!Node} node
 * @return {?CSSStyleDeclaration}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getStyle_ = function(node) {
  var styleDescriptor =
      goog.html.sanitizer.HTML_SANITIZER_PROPERTY_DESCRIPTORS_['style'];
  if (node instanceof HTMLElement && styleDescriptor && styleDescriptor.get) {
    return styleDescriptor.get.apply(node);
  } else {
    return node.style instanceof CSSStyleDeclaration ? node.style : null;
  }
};


/**
 * Provides a way to get a node's nodeName without falling prey to things like
 * &lt;form&gt;&lt;input name="nodeName"&gt;&lt;/form&gt;.
 * Usage: goog.html.sanitizer.HtmlSanitizer.nodeName_(elem)
 * @param {!Node} node
 * @return {string}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getNodeName_ = function(node) {
  var nodeNameDescriptor =
      goog.html.sanitizer.HTML_SANITIZER_PROPERTY_DESCRIPTORS_['nodeName'];
  if (nodeNameDescriptor && nodeNameDescriptor.get) {
    return nodeNameDescriptor.get.apply(node);
  } else {
    return (typeof node.nodeName == 'string') ? node.nodeName : 'unknown';
  }
};


/**
 * Provides a way to get a node's parentNode without falling prey to things
 * like &lt;form&gt;&lt;input name="parentNode"&gt;&lt;/form&gt;.
 * Usage: goog.html.sanitizer.HtmlSanitizer.parentNode_(elem)
 * @param {?Node} node
 * @return {?Node}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getParentNode_ = function(node) {
  if (!goog.isDefAndNotNull(node)) {
    return null;
  }
  var parentNodeDescriptor =
      goog.html.sanitizer.HTML_SANITIZER_PROPERTY_DESCRIPTORS_['parentNode'];
  if (parentNodeDescriptor && parentNodeDescriptor.get) {
    return parentNodeDescriptor.get.apply(node);
  } else {
    // We need to ensure that parentNode is returning the actual parent node
    // and not a child node that happens to have a name of "parentNode".
    // We check that the node returned by parentNode is itself not named
    // "parentNode" - this could happen legitimately but on IE we have no better
    // means of avoiding the pitfall.
    var parentNode = node.parentNode;
    if (parentNode && parentNode.name && typeof parentNode.name == 'string' &&
        parentNode.name.toLowerCase() == 'parentnode') {
      return null;
    } else {
      return parentNode;
    }
  }
};


/**
 * Provides a way to get the value of node.childNodes without falling prey to
 * clobbering.
 * @param {!Node} node
 * @return {?NodeList}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getChildNodes_ = function(node) {
  var descriptor =
      goog.html.sanitizer.HTML_SANITIZER_PROPERTY_DESCRIPTORS_['childNodes'];
  if (goog.dom.isElement(node) && descriptor && descriptor.get) {
    return descriptor.get.apply(node);
  } else {
    return node.childNodes instanceof NodeList ? node.childNodes : null;
  }
};


/**
 * Causes the browser to parse the DOM tree of a given HTML string, then walks
 * the tree. For each element, it creates a new sanitized version, applies
 * sanitized attributes, and returns a SafeHtml object representing the
 * sanitized tree.
 * @param {?string} unsanitizedHtml
 * @return {!goog.html.SafeHtml} Sanitized HTML
 * @final
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitize = function(
    unsanitizedHtml) {
  var sanitizedParent = this.sanitizeToDomNode(unsanitizedHtml);
  var sanitizedString = new XMLSerializer().serializeToString(sanitizedParent);

  // Remove the outer span added in sanitizeToDomNode. We could create an
  // element from it and then pull out the innerHtml, but this is more
  // performant.
  if (goog.string.startsWith(sanitizedString, '<span')) {
    if (goog.string.endsWith(sanitizedString, '</span>')) {
      sanitizedString = sanitizedString.slice(
          sanitizedString.indexOf('>') + 1, -1 * ('</span>'.length));
    } else if (goog.string.endsWith(sanitizedString, '/>')) {
      sanitizedString = '';
    }
  }

  return goog.html.uncheckedconversions
      .safeHtmlFromStringKnownToSatisfyTypeContract(
          goog.string.Const.from('Output of HTML sanitizer'), sanitizedString);
};


/**
 * Causes the browser to parse the DOM tree of a given HTML string, then walks
 * the tree. For each element, it creates a new sanitized version, applies
 * sanitized attributes, and returns a span element containing the sanitized
 * content.
 * @param {?string} unsanitizedHtml
 * @return {!HTMLSpanElement} Sanitized HTML
 * @final
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeToDomNode = function(
    unsanitizedHtml) {
  var sanitizedParent =
      /** @type {!HTMLSpanElement} */ (document.createElement('span'));

  if (!goog.html.sanitizer.HTML_SANITIZER_SUPPORTED_ || !unsanitizedHtml) {
    // TODO(danesh): IE9 or earlier versions don't provide an easy way to
    // parse HTML inertly. Handle in a way other than an empty span perhaps.
    return sanitizedParent;
  }

  // Get the treeWalker initialized.
  try {
    var treeWalker =
        goog.html.sanitizer.HtmlSanitizer.getDomTreeWalker_(unsanitizedHtml);
  } catch (e) {
    return sanitizedParent;
  }

  // Used in order to find the correct parent node in the sanitizedParent.
  var elementMap = {};
  // Used in order to give a unique identifier to each node for lookups.
  var elemNum = 0;
  // Used for iteration.
  var dirtyNode;
  while (dirtyNode = treeWalker.nextNode()) {
    elemNum++;

    // Get a clean (sanitized) version of the dirty node.
    var cleanNode = this.sanitizeElement_(dirtyNode);
    if (cleanNode.nodeType != goog.dom.NodeType.TEXT) {
      this.sanitizeAttrs_(dirtyNode, cleanNode);
      elementMap[elemNum] = cleanNode;
      goog.html.sanitizer.HtmlSanitizer.setAttribute_(
          dirtyNode, goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_ATTR_NAME_,
          String(elemNum));
    }

    // TODO(pelizzi): [IMPROVEMENT] type-checking against clobbering (e.g.
    // ClobberedNode wrapper). Closure can unwrap these at compile time, see
    // ClosureOptimizePrimitives.java, jakubvrana has created one for
    // goog.dom.Tag. Alternatively, create two actual wrappers that expose
    // clobber-safe functions, getters and setters for Node and Element.

    // TODO(pelizzi): [IMPROVEMENT] consider switching from elementMap[elemNum]
    // to a WeakMap for browsers that support it (e.g. use a ElementWeakMap that
    // falls back to using data attributes).
    // @type {ElementWeakMap<ClobberedNode, Node>}

    // TODO(pelizzi): [IMPROVEMENT] add an API to sanitize *from* DOM nodes so
    // that we don't have to use innerHTML on template recursion but instead we
    // can use importNode. The API could also be public as it is still a way to
    // make a document fragment conform to a policy, somewhat useful.

    // Template tag contents require special handling as they are not traversed
    // by the treewalker.
    var dirtyNodeName =
        goog.html.sanitizer.HtmlSanitizer.getNodeName_(dirtyNode);
    if (goog.html.sanitizer.HTML_SANITIZER_TEMPLATE_SUPPORTED &&
        dirtyNodeName.toLowerCase() === 'template' &&
        !cleanNode.hasAttribute(
            goog.html.sanitizer.HTML_SANITIZER_BLACKLISTED_TAG_)) {
      this.processTemplateContents_(dirtyNode, cleanNode);
    }

    // Finds the parent to which cleanNode should be appended.
    var target;
    var dirtyParent =
        goog.html.sanitizer.HtmlSanitizer.getParentNode_(dirtyNode);
    var isSanitizedParent = false;
    if (goog.isNull(dirtyParent)) {
      isSanitizedParent = true;
    } else if (
        goog.html.sanitizer.HtmlSanitizer.getNodeName_(dirtyParent)
                .toLowerCase() == 'body' ||
        dirtyParent.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT) {
      var dirtyGrandParent =
          goog.html.sanitizer.HtmlSanitizer.getParentNode_(dirtyParent);
      // The following checks if target is an immediate child of the inert
      // parent template element
      if (dirtyParent.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT &&
          goog.isNull(dirtyGrandParent)) {
        isSanitizedParent = true;
      } else if (
          goog.html.sanitizer.HtmlSanitizer.getNodeName_(dirtyParent)
              .toLowerCase() == 'body') {
        // The following checks if target is an immediate child of the inert
        // parent HtmlDocument
        var dirtyGrtGrandParent =
            goog.html.sanitizer.HtmlSanitizer.getParentNode_(dirtyGrandParent);
        if (goog.isNull(goog.html.sanitizer.HtmlSanitizer.getParentNode_(
                dirtyGrtGrandParent))) {
          isSanitizedParent = true;
        }
      }
    }
    if (isSanitizedParent || goog.isNull(dirtyParent)) {
      target = sanitizedParent;
    } else {
      target = elementMap[goog.html.sanitizer.HtmlSanitizer.getAttribute_(
          dirtyParent,
          goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_ATTR_NAME_)];
    }
    if (target.content) {
      target = target.content;
    }
    // Do not attach blacklisted tags that have been sanitized into templates.
    if (!goog.dom.isElement(cleanNode) ||
        !cleanNode.hasAttribute(
            goog.html.sanitizer.HTML_SANITIZER_BLACKLISTED_TAG_)) {
      target.appendChild(cleanNode);
    }
  }

  return sanitizedParent;
};


/**
 * Returns a sanitized version of an element, with no children or user-provided
 * attributes.
 * @param {!Node} dirtyNode
 * @return {!Node}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeElement_ = function(
    dirtyNode) {
  // Text nodes don't need to be sanitized.
  if (dirtyNode.nodeType == goog.dom.NodeType.TEXT) {
    return document.createTextNode(dirtyNode.data);
  }
  // Non text nodes get an empty node based on black/white lists.
  var elemName =
      goog.html.sanitizer.HtmlSanitizer.getNodeName_(dirtyNode).toUpperCase();
  var sanitized = false;
  var blacklisted = false;
  var cleanElemName;
  if (elemName in goog.html.sanitizer.TagBlacklist ||
      elemName in this.tagBlacklist_) {
    // If it's in the inert blacklist, replace with template (and then add a
    // special data attribute to distinguish it from real template tags).
    // Note that this node will not be added to the final output, i.e. the
    // template tag is only an internal representation, and eventually will be
    // deleted.
    cleanElemName = 'template';
    blacklisted = true;
  } else if (this.tagWhitelist_[elemName]) {
    // If it's in the whitelist, keep as is.
    cleanElemName = elemName;
  } else {
    // If it's not in any list, replace with span. If the relevant builder
    // option is enabled, they will bear the original tag name in a data
    // attribute.
    cleanElemName = 'span';
    sanitized = true;
  }
  var cleanElem = document.createElement(cleanElemName);
  if (this.shouldAddOriginalTagNames_ && sanitized) {
    goog.html.sanitizer.HtmlSanitizer.setAttribute_(
        cleanElem, goog.html.sanitizer.HTML_SANITIZER_SANITIZED_ATTR_NAME_,
        elemName.toLowerCase());
  }
  if (blacklisted) {
    goog.html.sanitizer.HtmlSanitizer.setAttribute_(
        cleanElem, goog.html.sanitizer.HTML_SANITIZER_BLACKLISTED_TAG_, '');
  }
  return cleanElem;
};


/**
 * Applies sanitized versions of attributes from a dirtyNode to a corresponding
 * cleanNode.
 * @param {!Node} dirtyNode
 * @param {!Node} cleanNode
 * @return {!Node} cleanNode with sanitized attributes
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeAttrs_ = function(
    dirtyNode, cleanNode) {
  var attributes = goog.html.sanitizer.HtmlSanitizer.getAttributes_(dirtyNode);
  if (!goog.isDefAndNotNull(attributes)) {
    return cleanNode;
  }
  for (var i = 0; i < attributes.length; i++) {
    var attrib = attributes[i];
    if (attrib.specified) {
      var cleanValue = this.sanitizeAttribute_(dirtyNode, attrib);
      // at this point cleanValue should be null or a string
      if (!goog.isNull(cleanValue)) {
        goog.html.sanitizer.HtmlSanitizer.setAttribute_(
            cleanNode, attrib.name, cleanValue);
      }
    }
  }
  return cleanNode;
};


/**
 * Sanitizes an attribute value by looking up an attribute handler for the given
 * node and attribute names.
 * @param {!Node} dirtyNode
 * @param {!Attr} attribute
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeAttribute_ = function(
    dirtyNode, attribute) {

  var attributeName = attribute.name;
  if (goog.string.startsWith(
          goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_,
          attributeName)) {
    return null;
  }

  var nodeName = goog.html.sanitizer.HtmlSanitizer.getNodeName_(dirtyNode);
  var unsanitizedAttrValue = attribute.value;

  // Create policy hints object
  var policyHints = {
    tagName: goog.string.trim(nodeName).toLowerCase(),
    attributeName: goog.string.trim(attributeName).toLowerCase()
  };
  var policyContext = goog.html.sanitizer.HtmlSanitizer.getContext_(
      policyHints.attributeName, dirtyNode);

  // Prefer attribute handler for this specific tag.
  var tagHandlerIndex = goog.html.sanitizer.HtmlSanitizer.attrIdentifier_(
      nodeName, attributeName);
  if (tagHandlerIndex in this.attributeHandlers_) {
    var handler = this.attributeHandlers_[tagHandlerIndex];
    return handler(unsanitizedAttrValue, policyHints, policyContext);
  }
  // Fall back on attribute handler for wildcard tag.
  var genericHandlerIndex =
      goog.html.sanitizer.HtmlSanitizer.attrIdentifier_(null, attributeName);
  if (genericHandlerIndex in this.attributeHandlers_) {
    var handler = this.attributeHandlers_[genericHandlerIndex];
    return handler(unsanitizedAttrValue, policyHints, policyContext);
  }
  return null;
};


/**
 * Processes the contents of a template tag. These are not traversed through the
 * treewalker because they belong to a separate document, and thus require
 * special handling.
 *
 * If the relevant builder option is enabled and the template tag is allowed,
 * this method copies the contents over to the output DOM tree without
 * sanitization, otherwise the template contents are sanitized recursively.
 *
 * @param {!Node} dirtyNode
 * @param {!Node} cleanNode
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.processTemplateContents_ = function(
    dirtyNode, cleanNode) {
  // If the template element was sanitized into a span tag, do not insert
  // unsanitized tags!
  if (this.shouldSanitizeTemplateContents_ ||
      cleanNode.nodeName.toLowerCase() !== 'template') {
    var dirtyNodeHTML =
        goog.html.sanitizer.HtmlSanitizer.getInnerHTML_(dirtyNode);
    var templateSpan = this.sanitizeToDomNode(dirtyNodeHTML);
    goog.array.forEach(templateSpan.childNodes, function(node) {
      cleanNode.appendChild(node);
    });
    // Slower alternative, but safe
    // cleanNode.innerHTML =
    //     goog.html.SafeHtml.unwrap(this.sanitize(dirtyNode.innerHTML));
  } else {
    var templateDoc = cleanNode.content.ownerDocument;
    var dirtyCopy = templateDoc.importNode(dirtyNode, true);
    var dirtyCopyChildren =
        goog.html.sanitizer.HtmlSanitizer.getChildNodes_(dirtyCopy);
    goog.array.forEach(
        dirtyCopyChildren, function(node) { cleanNode.appendChild(node); });
    // This might be vulnerable to mxss and slower
    // cleanNode.innerHTML = dirtyNode.innerHTML;
  }

};


/**
 * Function to retrieve HtmlSanitizerContext from a dirty node given an
 * attributeName and nodeName.
 * @param {string} attributeName
 * @param {!Node} dirtyNode
 * @return {!goog.html.sanitizer.HtmlSanitizerPolicyContext}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getContext_ = function(
    attributeName, dirtyNode) {
  var policyContext = {cssStyle: undefined};
  if (attributeName == 'style') {
    policyContext.cssStyle =
        goog.html.sanitizer.HtmlSanitizer.getStyle_(dirtyNode);
  }
  return policyContext;
};


/**
 * Static function to sanitize a string. Simply creates a new instance of the
 * sanitizer with default options and uses this to sanitize.
 * @param {string} unsanitizedHtml
 * @return {!goog.html.SafeHtml} sanitizedHtml
 */
goog.html.sanitizer.HtmlSanitizer.sanitize = function(unsanitizedHtml) {
  var sanitizer = new goog.html.sanitizer.HtmlSanitizer.Builder().build();
  return sanitizer.sanitize(unsanitizedHtml);
};
