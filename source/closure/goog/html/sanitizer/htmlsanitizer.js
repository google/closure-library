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
goog.provide('goog.html.sanitizer.HtmlSanitizerAttributePolicy');
goog.provide('goog.html.sanitizer.HtmlSanitizerPolicy');
goog.provide('goog.html.sanitizer.HtmlSanitizerPolicyContext');
goog.provide('goog.html.sanitizer.HtmlSanitizerPolicyHints');
goog.provide('goog.html.sanitizer.HtmlSanitizerUrlPolicy');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.dom.NodeType');
goog.require('goog.dom.TagName');
goog.require('goog.functions');
goog.require('goog.html.SafeHtml');
goog.require('goog.html.SafeStyle');
goog.require('goog.html.SafeStyleSheet');
goog.require('goog.html.SafeUrl');
goog.require('goog.html.sanitizer.AttributeSanitizedWhitelist');
goog.require('goog.html.sanitizer.AttributeWhitelist');
goog.require('goog.html.sanitizer.CssSanitizer');
goog.require('goog.html.sanitizer.ElementWeakMap');
goog.require('goog.html.sanitizer.TagBlacklist');
goog.require('goog.html.sanitizer.TagWhitelist');
goog.require('goog.html.sanitizer.noclobber');
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
 *     (function(string, ?=, ?=, ?=):?string)=):?string}
 */
goog.html.sanitizer.HtmlSanitizerPolicy;


/**
 * Type for a URL policy function.
 *
 * @typedef {function(string, !goog.html.sanitizer.HtmlSanitizerPolicyHints=):
 *     ?goog.html.SafeUrl}
 */
goog.html.sanitizer.HtmlSanitizerUrlPolicy;


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
 * Whether the HTML sanitizer is supported. For now mainly exclude
 * IE9 or below where we know the sanitizer is insecure.
 * @private @const {boolean}
 */
goog.html.sanitizer.HTML_SANITIZER_SUPPORTED_ =
    !goog.userAgent.IE || document.documentMode >= 10;


/**
 * Whether the template tag is supported.
 * @package @const {boolean}
 */
goog.html.sanitizer.HTML_SANITIZER_TEMPLATE_SUPPORTED =
    !goog.userAgent.IE || document.documentMode == null;


/**
 * Prefix used by all internal html sanitizer booking properties.
 * @private @const {string}
 */
goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_ = 'data-sanitizer-';


/**
 * Temporary attribute name in which html sanitizer uses for bookkeeping.
 * @private @const {string}
 */
goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_ATTR_NAME_ =
    goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_ + 'elem-num';


/**
 * Attribute name added to span tags that replace unknown tags. The value of
 * this attribute is the name of the tag before the sanitization occurred.
 * @private @const {string}
 */
goog.html.sanitizer.HTML_SANITIZER_SANITIZED_ATTR_NAME_ =
    goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_ + 'original-tag';


/**
 * Attribute name added to blacklisted tags to then filter them from the output.
 * @private @const {string}
 */
goog.html.sanitizer.HTML_SANITIZER_BLACKLISTED_TAG_ =
    goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_ + 'blacklisted-tag';


/**
 * Special value for the STYLE container ID, which makes the sanitizer choose
 * a new random ID on each call to {@link sanitize}.
 * @private @const {string}
 */
goog.html.sanitizer.RANDOM_CONTAINER_ = '*';


/**
 * Creates an HTML sanitizer.
 * @param {!goog.html.sanitizer.HtmlSanitizer.Builder=} opt_builder
 * @final @constructor @struct
 */
goog.html.sanitizer.HtmlSanitizer = function(opt_builder) {
  var builder = opt_builder || new goog.html.sanitizer.HtmlSanitizer.Builder();

  builder.installPolicies_();

  /** @private @const {boolean} */
  this.shouldSanitizeTemplateContents_ =
      builder.shouldSanitizeTemplateContents_;

  /**
   * @private @const {!Object<string, !goog.html.sanitizer.HtmlSanitizerPolicy>}
   */
  this.attributeHandlers_ = goog.object.clone(builder.attributeWhitelist_);

  /** @private @const {!Object<string, boolean>} */
  this.tagBlacklist_ = goog.object.clone(builder.tagBlacklist_);

  /** @private @const {!Object<string, boolean>} */
  this.tagWhitelist_ = goog.object.clone(builder.tagWhitelist_);

  /** @private @const {boolean} */
  this.shouldAddOriginalTagNames_ = builder.shouldAddOriginalTagNames_;

  // Add whitelist data-* attributes from the builder to the attributeHandlers
  // with a default cleanUpAttribute function. data-* attributes are inert as
  // per HTML5 specs, so not much sanitization needed.
  goog.array.forEach(builder.dataAttributeWhitelist_, function(dataAttr) {
    goog.asserts.assert(goog.string.startsWith(dataAttr, 'data-'));
    goog.asserts.assert(!goog.string.startsWith(
        dataAttr, goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_));

    this.attributeHandlers_['* ' + dataAttr.toUpperCase()] =
        /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (
            goog.html.sanitizer.HtmlSanitizer.cleanUpAttribute_);
  }, this);

  /** @private @const {!goog.html.sanitizer.HtmlSanitizerUrlPolicy} */
  this.networkRequestUrlPolicy_ = builder.networkRequestUrlPolicy_;

  /** @private @const {?string} */
  this.styleContainer_ = builder.styleContainer_;

  /** @private @const {boolean} */
  this.inlineStyleRules_ = builder.inlineStyleRules_;
};


/**
 * Transforms a {@link HtmlSanitizerUrlPolicy} into a
 * {@link HtmlSanitizerPolicy} by returning a wrapper that calls the {@link
 * HtmlSanitizerUrlPolicy} with the required arguments and unwraps the returned
 * {@link SafeUrl}. This is necessary because internally the sanitizer works
 * with {@HtmlSanitizerPolicy} to sanitize attributes, but its public API must
 * use {@HtmlSanitizerUrlPolicy} to ensure that callers do not violate SafeHtml
 * invariants in their custom handlers.
 * @param {!goog.html.sanitizer.HtmlSanitizerUrlPolicy} urlPolicy
 * @return {!goog.html.sanitizer.HtmlSanitizerPolicy}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.wrapUrlPolicy_ = function(urlPolicy) {
  return /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (function(
      url, policyHints) {
    var trimmed =
        goog.html.sanitizer.HtmlSanitizer.cleanUpAttribute_(url, policyHints);
    var safeUrl = urlPolicy(trimmed, policyHints);
    if (safeUrl &&
        goog.html.SafeUrl.unwrap(safeUrl) !=
            goog.html.SafeUrl.INNOCUOUS_STRING) {
      return goog.html.SafeUrl.unwrap(safeUrl);
    } else {
      return null;
    }
  });
};



/**
 * The builder for the HTML Sanitizer. All methods except build return this.
 * @final @constructor @struct
 */
goog.html.sanitizer.HtmlSanitizer.Builder = function() {
  /**
   * A set of attribute sanitization functions. Default built-in handlers are
   * all tag-agnostic by design. Note that some attributes behave differently
   * when attached to different nodes (for example, the href attribute will
   * generally not make a network request, but &lt;link href=""&gt; does), and
   * so when necessary a tag-specific handler can be used to override a
   * tag-agnostic one.
   * @private {!Object<string, !goog.html.sanitizer.HtmlSanitizerPolicy>}
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
   * @private @const {!Object<string, boolean>}
   */
  this.attributeOverrideList_ = {};

  /**
   * Whether the content of TEMPLATE tags (assuming TEMPLATE is whitelisted)
   * should be sanitized or passed through.
   * @private {boolean}
   */
  this.shouldSanitizeTemplateContents_ = true;

  /**
   * List of data attributes to whitelist. Data-attributes are inert and don't
   * require sanitization.
   * @private @const {!Array<string>}
   */
  this.dataAttributeWhitelist_ = [];

  /**
   * A tag blacklist, to effectively remove an element and its children from the
   * dom.
   * @private @const {!Object<string, boolean>}
   */
  this.tagBlacklist_ = goog.object.clone(goog.html.sanitizer.TagBlacklist);

  /**
   * A tag whitelist, to effectively allow an element and its children from the
   * dom.
   * @private {!Object<string, boolean>}
   */
  this.tagWhitelist_ = goog.object.clone(goog.html.sanitizer.TagWhitelist);

  /**
   * Whether non-whitelisted and non-blacklisted tags that have been converted
   * to &lt;span&rt; tags will contain the original tag in a data attribute.
   * @private {boolean}
   */
  this.shouldAddOriginalTagNames_ = false;

  /**
   * A function to be applied to URLs found on the parsing process which do not
   * trigger requests.
   * @private {!goog.html.sanitizer.HtmlSanitizerUrlPolicy}
   */
  this.urlPolicy_ = goog.html.sanitizer.HtmlSanitizer.defaultUrlPolicy_;

  /**
   * A function to be applied to urls found on the parsing process which may
   * trigger requests.
   * @private {!goog.html.sanitizer.HtmlSanitizerUrlPolicy}
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
   * A function to sanitize inline CSS styles. Defaults to deny all.
   * @private {function(
   *     !goog.html.sanitizer.HtmlSanitizerPolicy,
   *     string,
   *     !goog.html.sanitizer.HtmlSanitizerPolicyHints,
   *     !goog.html.sanitizer.HtmlSanitizerPolicyContext):?string}
   */
  this.sanitizeInlineCssPolicy_ = goog.functions.NULL;

  /**
   * An optional ID to restrict the scope of CSS rules when STYLE tags are
   * allowed.
   * @private {?string}
   */
  this.styleContainer_ = null;

  /**
   * Whether rules in STYLE tags should be inlined into style attributes.
   * @private {boolean}
   */
  this.inlineStyleRules_ = false;

  /**
   * True iff policies have been installed for the instance.
   * @private {boolean}
   */
  this.policiesInstalled_ = false;
};


/**
 * Extends the list of allowed data attributes.
 * @param {!Array<string>} dataAttributeWhitelist
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.allowDataAttributes =
    function(dataAttributeWhitelist) {
  goog.array.extend(this.dataAttributeWhitelist_, dataAttributeWhitelist);
  return this;
};


/**
 * Allows form tags in the HTML. Without this all form tags and content will be
 * dropped.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.allowFormTag = function() {
  delete this.tagBlacklist_['FORM'];
  return this;
};


/**
 * Allows STYLE tags. Note that the sanitizer wraps the output of each call to
 * {@link sanitize} with a SPAN tag, give it a random ID unique across multiple
 * calls, and then restrict all CSS rules found inside STYLE tags to only apply
 * to children of the SPAN tag. This means that CSS rules in STYLE tags will
 * only apply to content provided in the same call to {@link sanitize}. This
 * feature is not compatible with {@link inlineStyleRules}.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.allowStyleTag = function() {
  if (this.inlineStyleRules_) {
    throw new Error('Rules from STYLE tags are already being inlined.');
  }
  delete this.tagBlacklist_['STYLE'];
  this.styleContainer_ = goog.html.sanitizer.RANDOM_CONTAINER_;
  return this;
};


/**
 * Fixes the ID of the style container used for CSS rules found in STYLE tags,
 * and disables automatic wrapping with the container. This allows multiple
 * calls to {@link sanitize} to share STYLE rules. If opt_styleContainer is
 * missing, the sanitizer will stop restricting the scope of CSS rules
 * altogether. Requires {@link allowStyleTag} to be called first.
 * @param {string=} opt_styleContainer An optional container ID to restrict the
 *     scope of any CSS rule found in STYLE tags.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.withStyleContainer =
    function(opt_styleContainer) {
  if ('STYLE' in this.tagBlacklist_) {
    throw new Error('STYLE tags must first be allowed through allowStyleTag.');
  }
  if (opt_styleContainer != undefined) {
    if (!/^[a-zA-Z][\w-:\.]*$/.test(opt_styleContainer)) {
      throw new Error('Invalid ID.');
    }
    this.styleContainer_ = opt_styleContainer;
  } else {
    this.styleContainer_ = null;
  }
  return this;
};


/**
 * Converts rules in STYLE tags into style attributes on the tags they apply to.
 * This feature is not compatible with {@link withStyleContainer} and {@link
 * allowStyleTag}. This method requires {@link allowCssStyles} (otherwise rules
 * would be deleted after being inlined), and is not compatible with {@link
 * allowStyleTag}.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.inlineStyleRules =
    function() {
  if (this.sanitizeInlineCssPolicy_ == goog.functions.NULL) {
    throw new Error(
        'Inlining style rules requires allowing STYLE attributes ' +
        'first.');
  }
  if (!('STYLE' in this.tagBlacklist_)) {
    throw new Error(
        'You have already configured the builder to allow STYLE tags in the ' +
        'output. Inlining style rules would prevent STYLE tags from ' +
        'appearing in the output and conflict with such directive.');
  }
  this.inlineStyleRules_ = true;
  return this;
};


/**
 * Allows inline CSS styles.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.allowCssStyles =
    function() {
  this.sanitizeInlineCssPolicy_ =
      goog.html.sanitizer.HtmlSanitizer.sanitizeCssDeclarationList_;
  return this;
};


/**
 * Extends the tag whitelist (Package-internal utility method only).
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
 * Extends the attribute whitelist (Package-internal utility method only).
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
 * Turns off sanitization of template tag contents and pass them unmodified
 * (Package-internal utility method only).
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 * @throws {!Error}
 * @package
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype
    .keepUnsanitizedTemplateContentsPrivateDoNotAccessOrElse = function() {
  if (!goog.html.sanitizer.HTML_SANITIZER_TEMPLATE_SUPPORTED) {
    throw new Error(
        'Cannot let unsanitized template contents through on ' +
        'browsers that do not support TEMPLATE.');
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
          'goog.html.sanitizer.TagWhitelist.');
    }
  }, this);
  return this;
};


/**
 * Allows only the provided whitelist of attributes, possibly setting a custom
 * policy for them. The set of tag/attribute combinations need to be a subset of
 * the currently allowed combinations.
 * <p>
 * Note that you cannot define a generic handler for an attribute if only a
 * tag-specific one is present, and vice versa. To configure the sanitizer to
 * accept an attribute only for a specific tag when only a generic handler is
 * whitelisted, use the goog.html.sanitizer.HtmlSanitizerPolicyHints parameter
 * and simply reject the attribute in unwanted tags.
 * <p>
 * Also note that the sanitizer's policy is still called after the provided one,
 * to ensure that supplying misconfigured policy cannot introduce
 * vulnerabilities. To completely override an existing attribute policy or to
 * allow new attributes, see the goog.html.sanitizer.unsafe package.
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
 * Adds the original tag name in the data attribute 'original-tag' when unknown
 * tags are sanitized to &lt;span&rt;, so that caller can distinguish them from
 * actual &lt;span&rt; tags.
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.addOriginalTagNames =
    function() {
  this.shouldAddOriginalTagNames_ = true;
  return this;
};


/**
 * Sets a custom network URL policy.
 * @param {!goog.html.sanitizer.HtmlSanitizerUrlPolicy}
 *     customNetworkReqUrlPolicy
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype
    .withCustomNetworkRequestUrlPolicy = function(customNetworkReqUrlPolicy) {
  this.networkRequestUrlPolicy_ = customNetworkReqUrlPolicy;
  return this;
};


/**
 * Sets a custom non-network URL policy.
 * @param {!goog.html.sanitizer.HtmlSanitizerUrlPolicy} customUrlPolicy
 * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.withCustomUrlPolicy =
    function(customUrlPolicy) {
  this.urlPolicy_ = customUrlPolicy;
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
  return /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (function(
      value, hints, ctx, policy) {
    var result = customPolicy(value, hints, ctx, policy);
    return result == null ? null : defaultPolicy(result, hints, ctx, policy);
  });
};


/**
 * Installs the sanitizer's default policy for a specific tag/attribute
 * combination on the provided whitelist, but only if a policy already exists.
 * @param {!Object<string, !goog.html.sanitizer.HtmlSanitizerPolicy>}
 *     whitelist The whitelist to modify.
 * @param {!Object<string, boolean>} overrideList The set of attributes handlers
 *     that should not be wrapped with a default policy.
 * @param {string} key The tag/attribute combination
 * @param {!goog.html.sanitizer.HtmlSanitizerPolicy} defaultPolicy The
 *     sanitizer's policy.
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.installDefaultPolicy_ = function(
    whitelist, overrideList, key, defaultPolicy) {
  if (whitelist[key] && !overrideList[key]) {
    whitelist[key] = goog.html.sanitizer.HtmlSanitizer.wrapPolicy_(
        whitelist[key], defaultPolicy);
  }
};


/**
 * Builds and returns a goog.html.sanitizer.HtmlSanitizer object.
 * @return {!goog.html.sanitizer.HtmlSanitizer}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.build = function() {
  return new goog.html.sanitizer.HtmlSanitizer(this);
};


/**
 * Installs the sanitization policies for the attributes.
 * May only be called once.
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.installPolicies_ =
    function() {
  if (this.policiesInstalled_) {
    throw new Error('HtmlSanitizer.Builder.build() can only be used once.');
  }

  var installPolicy = goog.html.sanitizer.HtmlSanitizer.installDefaultPolicy_;

  // Binding all the non-trivial attribute sanitizers to the appropriate,
  // potentially customizable, handling functions at build().
  installPolicy(
      this.attributeWhitelist_, this.attributeOverrideList_, '* USEMAP',
      /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */ (
          goog.html.sanitizer.HtmlSanitizer.sanitizeUrlFragment_));

  var urlAttributes = ['* ACTION', '* CITE', '* HREF'];
  var urlPolicy =
      goog.html.sanitizer.HtmlSanitizer.wrapUrlPolicy_(this.urlPolicy_);
  goog.array.forEach(urlAttributes, function(attribute) {
    installPolicy(
        this.attributeWhitelist_, this.attributeOverrideList_, attribute,
        urlPolicy);
  }, this);

  var networkUrlAttributes = [
    // LONGDESC can result in a network request. See b/23381636.
    '* LONGDESC', '* SRC', 'LINK HREF'
  ];
  var networkRequestUrlPolicy =
      goog.html.sanitizer.HtmlSanitizer.wrapUrlPolicy_(
          this.networkRequestUrlPolicy_);
  goog.array.forEach(networkUrlAttributes, function(attribute) {
    installPolicy(
        this.attributeWhitelist_, this.attributeOverrideList_, attribute,
        networkRequestUrlPolicy);
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

  installPolicy(
      this.attributeWhitelist_, this.attributeOverrideList_, '* STYLE',
      /** @type {!goog.html.sanitizer.HtmlSanitizerPolicy} */
      (goog.partial(this.sanitizeInlineCssPolicy_, networkRequestUrlPolicy)));

  this.policiesInstalled_ = true;
};


/**
 * The default policy for URLs: allow any.
 * @private @const {!goog.html.sanitizer.HtmlSanitizerUrlPolicy}
 */
goog.html.sanitizer.HtmlSanitizer.defaultUrlPolicy_ =
    goog.html.SafeUrl.sanitize;


/**
 * The default policy for URLs which cause network requests: drop all.
 * @private @const {!goog.html.sanitizer.HtmlSanitizerUrlPolicy}
 */
goog.html.sanitizer.HtmlSanitizer.defaultNetworkRequestUrlPolicy_ =
    goog.functions.NULL;


/**
 * The default policy for attribute names: drop all.
 * @private @const {!goog.html.sanitizer.HtmlSanitizerPolicy}
 */
goog.html.sanitizer.HtmlSanitizer.defaultNamePolicy_ = goog.functions.NULL;


/**
 * The default policy for other tokens (i.e. class names and IDs): drop all.
 * @private @const {!goog.html.sanitizer.HtmlSanitizerPolicy}
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
 * Sanitizes a list of CSS declarations.
 * @param {goog.html.sanitizer.HtmlSanitizerPolicy} policySanitizeUrl
 * @param {string} attrValue
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyContext} policyContext
 * @return {?string} sanitizedCss from the policyContext
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.sanitizeCssDeclarationList_ = function(
    policySanitizeUrl, attrValue, policyHints, policyContext) {
  if (!policyContext.cssStyle) {
    return null;
  }
  var naiveUriRewriter = function(uri, prop) {
    policyHints.cssProperty = prop;
    var sanitizedUrl = policySanitizeUrl(uri, policyHints);
    if (sanitizedUrl == null) {
      return null;
    }
    return goog.html.uncheckedconversions
        .safeUrlFromStringKnownToSatisfyTypeContract(
            goog.string.Const.from(
                'HtmlSanitizerPolicy created with networkRequestUrlPolicy_ ' +
                'when installing \'* STYLE\' handler.'),
            sanitizedUrl);
  };
  var sanitizedStyle = goog.html.SafeStyle.unwrap(
      goog.html.sanitizer.CssSanitizer.sanitizeInlineStyle(
          policyContext.cssStyle, naiveUriRewriter));
  return sanitizedStyle == '' ? null : sanitizedStyle;
};


/**
 * Cleans up an attribute value that we don't particularly want to do anything
 * to. At the moment we just trim the whitespace.
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
 * Allows a set of attribute values.
 * @param {!Array<string>} allowedValues Set of allowed values lowercased.
 * @param {string} attrValue
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.allowedAttributeValues_ = function(
    allowedValues, attrValue, policyHints) {
  var trimmed = goog.string.trim(attrValue);
  return goog.array.contains(allowedValues, trimmed.toLowerCase()) ? trimmed :
                                                                     null;
};


/**
 * Sanitizes URL fragments.
 * @param {string} urlFragment
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.sanitizeUrlFragment_ = function(
    urlFragment, policyHints) {
  var trimmed = goog.string.trim(urlFragment);
  if (trimmed && trimmed.charAt(0) == '#') {
    // We do not apply the name or token policy to Url Fragments by design.
    return trimmed;
  }
  return null;
};


/**
 * Runs an attribute name through a name policy.
 * @param {goog.html.sanitizer.HtmlSanitizerPolicy} namePolicy
 * @param {string} attrName
 * @param {goog.html.sanitizer.HtmlSanitizerPolicyHints} policyHints
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.sanitizeName_ = function(
    namePolicy, attrName, policyHints) {
  var trimmed = goog.string.trim(attrName);
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
 * Ensures that the class prefix is present on all space-separated tokens
 * (i.e. all class names).
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
  return sanitizedClasses.length == 0 ? null : sanitizedClasses.join(' ');
};


/**
 * Ensures that the id prefix is present.
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
 * Parses a string of unsanitized HTML and provides an iterator over the
 * resulting DOM tree nodes. This DOM parsing must be wholly inert (that is,
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
      iteratorParent, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
      null /* filter */, false /* entityReferenceExpansion */);
};


/**
 * Parses the DOM tree of a given HTML string, then walks the tree. For each
 * element, it creates a new sanitized version, applies sanitized attributes,
 * and returns a SafeHtml object representing the sanitized tree.
 * @param {string} unsanitizedHtml
 * @return {!goog.html.SafeHtml} Sanitized HTML
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitize = function(
    unsanitizedHtml) {
  var styleContainer = this.getStyleContainerId_();
  var sanitizedParent =
      this.sanitizeToDomNode_(unsanitizedHtml, styleContainer);
  var sanitizedString = new XMLSerializer().serializeToString(sanitizedParent);

  // Remove the outer span added in sanitizeToDomNode. We could create an
  // element from it and then pull out the innerHTML, but this is more
  // performant.
  sanitizedString = sanitizedString.slice(
      sanitizedString.indexOf('>') + 1, sanitizedString.lastIndexOf('</'));
  if (sanitizedString == '') {
    return goog.html.SafeHtml.EMPTY;
  }

  var safeHtml = goog.html.uncheckedconversions
                     .safeHtmlFromStringKnownToSatisfyTypeContract(
                         goog.string.Const.from('Output of HTML sanitizer'),
                         sanitizedString);
  // If appropriate, rewrap the output with a style container.
  if (this.styleContainer_ == goog.html.sanitizer.RANDOM_CONTAINER_) {
    safeHtml = goog.html.SafeHtml.create(
        goog.dom.TagName.SPAN, {id: styleContainer}, safeHtml);
  }

  return safeHtml;
};


/**
 * Parses the DOM tree of a given HTML string, then walks the tree. For each
 * element, it creates a new sanitized version, applies sanitized attributes,
 * and returns a span element containing the sanitized content.
 * @param {string} unsanitizedHtml
 * @return {!HTMLSpanElement} Sanitized HTML
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeToDomNode = function(
    unsanitizedHtml) {
  return this.sanitizeToDomNode_(unsanitizedHtml);
};


/**
 * Private variant of {@link sanitizeToDomNode} that allows passing a style
 * container. If used with an unsafe style container, it can cause an XSS and
 * thus we keep it private. Use the {@link withStyleContainer} builder function
 * to set a name for the style container.
 * @param {string} unsanitizedHtml
 * @param {?string=} opt_styleContainer
 * @return {!HTMLSpanElement} Sanitized HTML
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeToDomNode_ = function(
    unsanitizedHtml, opt_styleContainer) {
  var sanitizedParent =
      /** @type {!HTMLSpanElement} */ (document.createElement('span'));

  if (!goog.html.sanitizer.HTML_SANITIZER_SUPPORTED_) {
    return sanitizedParent;
  }

  // Inline style rules on the unsanitized input, so that we don't have to
  // worry about customTokenPolicy and customNamePolicy interferring with
  // selectors.
  if (this.inlineStyleRules_) {
    // TODO(pelizzi): we are going to parse the document into a DOM tree twice,
    // once with DOMParser here, and once with TEMPLATE in the main sanitization
    // loop. It would be best if we used one technique consistently and parse it
    // once, but the decision to use TEMPLATE in the main body predates the work
    // on supporting STYLE tags, and we later found on that TEMPLATE inert
    // documents do not have computed stylesheet information on STYLE tags.
    var inertUnsanitizedDom =
        goog.html.sanitizer.CssSanitizer.safeParseHtmlAndGetInertElement(
            '<span>' + unsanitizedHtml + '</span>');
    goog.asserts.assert(
        inertUnsanitizedDom,
        'Older browsers that don\'t support inert ' +
            'parsing should not get to this branch');
    goog.html.sanitizer.CssSanitizer.inlineStyleRules(inertUnsanitizedDom);
    unsanitizedHtml = inertUnsanitizedDom.innerHTML;
  }


  var styleContainer = opt_styleContainer != undefined ?
      opt_styleContainer :
      this.getStyleContainerId_();
  if (styleContainer) {
    sanitizedParent.id = styleContainer;
  }

  // Get the treeWalker initialized.
  try {
    var treeWalker =
        goog.html.sanitizer.HtmlSanitizer.getDomTreeWalker_(unsanitizedHtml);
  } catch (e) {
    return sanitizedParent;
  }

  // Used in order to find the correct parent node in the sanitizedParent.
  var elementMap = goog.html.sanitizer.ElementWeakMap.newWeakMap();
  // Used for iteration.
  var dirtyNode;
  while (dirtyNode = treeWalker.nextNode()) {
    // Get a clean (sanitized) version of the dirty node.
    var cleanNode = this.sanitizeNode_(dirtyNode, styleContainer);
    if (goog.html.sanitizer.noclobber.isNodeElement(cleanNode)) {
      // If sanitizeNode_ returned an element, then the original node was also
      // an element.
      dirtyNode = goog.html.sanitizer.noclobber.assertNodeIsElement(dirtyNode);
      cleanNode = goog.html.sanitizer.noclobber.assertNodeIsElement(cleanNode);
      this.sanitizeAttrs_(dirtyNode, cleanNode);
      elementMap.set(dirtyNode, cleanNode);

      // Template tag contents require special handling as they are not
      // traversed by the treewalker.
      this.maybeProcessTemplateContents_(dirtyNode, cleanNode);
    }

    // TODO(pelizzi): [IMPROVEMENT] type-checking against clobbering (e.g.
    // ClobberedNode wrapper). Closure can unwrap these at compile time, see
    // ClosureOptimizePrimitives.java, jakubvrana has created one for
    // goog.dom.Tag. Alternatively, create two actual wrappers that expose
    // clobber-safe functions, getters and setters for Node and Element.

    // TODO(pelizzi): [IMPROVEMENT] add an API to sanitize *from* DOM nodes so
    // that we don't have to use innerHTML on template recursion but instead we
    // can use importNode. The API could also be public as it is still a way to
    // make a document fragment conform to a policy, somewhat useful.

    // Finds the parent to which cleanNode should be appended.
    var dirtyParent = goog.html.sanitizer.noclobber.getParentNode(dirtyNode);
    var isSanitizedParent = false;
    if (dirtyParent) {
      var dirtyParentNodeType =
          goog.html.sanitizer.noclobber.getNodeType(dirtyParent);
      var dirtyParentNodeName =
          goog.html.sanitizer.noclobber.getNodeName(dirtyParent).toLowerCase();
      var dirtyGrandParent =
          goog.html.sanitizer.noclobber.getParentNode(dirtyParent);
      // The following checks if target is an immediate child of the inert
      // parent template element
      if (dirtyParentNodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT &&
          !dirtyGrandParent) {
        isSanitizedParent = true;
      } else if (dirtyParentNodeName == 'body' && dirtyGrandParent) {
        // The following checks if target is an immediate child of the inert
        // parent HtmlDocument.
        var dirtyGreatGrandParent =
            goog.html.sanitizer.noclobber.getParentNode(dirtyGrandParent);
        if (dirtyGreatGrandParent &&
            !goog.html.sanitizer.noclobber.getParentNode(
                dirtyGreatGrandParent)) {
          isSanitizedParent = true;
        }
      }
    }
    var target;
    if (isSanitizedParent || !dirtyParent) {
      target = sanitizedParent;
    } else if (goog.html.sanitizer.noclobber.isNodeElement(dirtyParent)) {
      target = elementMap.get(/** @type {!Element} */ (dirtyParent));
    }
    if (target.content) {
      target = target.content;
    }
    // Do not attach blacklisted tags that have been sanitized into templates.
    if (!goog.html.sanitizer.noclobber.isNodeElement(cleanNode) ||
        !cleanNode.hasAttribute(
            goog.html.sanitizer.HTML_SANITIZER_BLACKLISTED_TAG_)) {
      target.appendChild(cleanNode);
    }
  }
  if (elementMap.clear) {
    elementMap.clear();
  }
  return sanitizedParent;
};


/**
 * Gets the style container ID for the sanitized output, or creates a new random
 * one. If no style container is necessary or style containment is disabled,
 * returns null.
 * @return {?string}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.getStyleContainerId_ = function() {
  var randomStyleContainmentEnabled =
      this.styleContainer_ == goog.html.sanitizer.RANDOM_CONTAINER_;
  var randomStyleContainmentNecessary =
      !('STYLE' in this.tagBlacklist_) && 'STYLE' in this.tagWhitelist_;
  // If the builder was configured to create a random unique ID, create one, but
  // do so only if STYLE is allowed to begin with.
  return randomStyleContainmentEnabled && randomStyleContainmentNecessary ?
      'sanitizer-' + goog.string.getRandomString() :
      this.styleContainer_;
};


/**
 * Returns a sanitized version of a node, with no children or user-provided
 * attributes.
 * @param {!Node} dirtyNode
 * @param {?string} styleContainer
 * @return {!Node}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeNode_ = function(
    dirtyNode, styleContainer) {
  // Text nodes don't need to be sanitized, unless they are children of STYLE
  // and STYLE tags are allowed.
  if (goog.html.sanitizer.noclobber.getNodeType(dirtyNode) ==
      goog.dom.NodeType.TEXT) {
    var textContent = dirtyNode.data;
    // If STYLE is allowed, apply a policy to its text content. Ideally
    // sanitizing text content of tags shouldn't be hardcoded for STYLE, but we
    // have no plans to support sanitizing the text content of other nodes for
    // now.
    var dirtyParent = goog.html.sanitizer.noclobber.getParentNode(dirtyNode);
    if (dirtyParent &&
        goog.html.sanitizer.noclobber.getNodeName(dirtyParent).toLowerCase() ==
            'style' &&
        !('STYLE' in this.tagBlacklist_) && 'STYLE' in this.tagWhitelist_) {
      // Note that we don't have access to the parsed CSS declarations inside a
      // TEMPLATE tag, so the CSS sanitizer accepts a string and parses it
      // on its own using DOMParser.
      textContent = goog.html.SafeStyleSheet.unwrap(
          goog.html.sanitizer.CssSanitizer.sanitizeStyleSheetString(
              textContent, styleContainer, goog.bind(function(uri, propName) {
                return this.networkRequestUrlPolicy_(
                    uri, {cssProperty: propName});
              }, this)));
    }
    return document.createTextNode(textContent);
  }

  // Non text nodes get an empty node based on black/white lists.
  var elemName =
      goog.html.sanitizer.noclobber.getNodeName(dirtyNode).toUpperCase();
  var sanitized = false;
  var blacklisted = false;
  var cleanElemName;
  if (elemName in this.tagBlacklist_) {
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
    goog.html.sanitizer.noclobber.setElementAttribute(
        cleanElem, goog.html.sanitizer.HTML_SANITIZER_SANITIZED_ATTR_NAME_,
        elemName.toLowerCase());
  }
  if (blacklisted) {
    goog.html.sanitizer.noclobber.setElementAttribute(
        cleanElem, goog.html.sanitizer.HTML_SANITIZER_BLACKLISTED_TAG_, '');
  }
  return cleanElem;
};


/**
 * Applies sanitized versions of attributes from a dirtyElement to a
 * corresponding cleanElement.
 * @param {!Element} dirtyElement
 * @param {!Element} cleanElement
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeAttrs_ = function(
    dirtyElement, cleanElement) {
  var attributes =
      goog.html.sanitizer.noclobber.getElementAttributes(dirtyElement);
  if (attributes == null) {
    return;
  }
  for (var i = 0, attribute; attribute = attributes[i]; i++) {
    if (attribute.specified) {
      var cleanValue = this.sanitizeAttribute_(dirtyElement, attribute);
      if (!goog.isNull(cleanValue)) {
        goog.html.sanitizer.noclobber.setElementAttribute(
            cleanElement, attribute.name, cleanValue);
      }
    }
  }
};


/**
 * Sanitizes an attribute value by looking up an attribute handler for the given
 * node and attribute names.
 * @param {!Element} dirtyElement
 * @param {!Attr} attribute
 * @return {?string} sanitizedAttrValue
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeAttribute_ = function(
    dirtyElement, attribute) {
  var attributeName = attribute.name;
  if (goog.string.startsWith(
          attributeName,
          goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_)) {
    return null;
  }

  var elementName = goog.html.sanitizer.noclobber.getNodeName(dirtyElement);
  var unsanitizedAttrValue = attribute.value;

  // Create policy hints object
  var policyHints = {
    tagName: goog.string.trim(elementName).toLowerCase(),
    attributeName: goog.string.trim(attributeName).toLowerCase()
  };
  var policyContext = goog.html.sanitizer.HtmlSanitizer.getContext_(
      policyHints.attributeName, dirtyElement);

  // Prefer attribute handler for this specific tag.
  var tagHandlerIndex = goog.html.sanitizer.HtmlSanitizer.attrIdentifier_(
      elementName, attributeName);
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
 * <p>
 * If the relevant builder option is enabled and the template tag is allowed,
 * this method copies the contents over to the output DOM tree without
 * sanitization, otherwise the template contents are sanitized recursively.
 * @param {!Element} dirtyElement
 * @param {!Element} cleanElement
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.prototype.maybeProcessTemplateContents_ =
    function(dirtyElement, cleanElement) {
  var dirtyElementName =
      goog.html.sanitizer.noclobber.getNodeName(dirtyElement);
  if (!goog.html.sanitizer.HTML_SANITIZER_TEMPLATE_SUPPORTED ||
      dirtyElementName.toLowerCase() != 'template' ||
      cleanElement.hasAttribute(
          goog.html.sanitizer.HTML_SANITIZER_BLACKLISTED_TAG_)) {
    return;
  }

  // If the template element was sanitized into a span tag, do not insert
  // unsanitized tags!
  if (this.shouldSanitizeTemplateContents_ ||
      cleanElement.nodeName.toLowerCase() !== 'template') {
    var dirtyElementHTML =
        goog.html.sanitizer.noclobber.getElementInnerHTML(dirtyElement);
    var templateSpan = this.sanitizeToDomNode(dirtyElementHTML);
    // appendChild with a forEach instead of an innertHTML as the latter is
    // slower.
    goog.array.forEach(templateSpan.childNodes, function(node) {
      cleanElement.appendChild(node);
    });
  } else {
    var templateDoc =
        /** @type {!HTMLTemplateElement} */ (cleanElement)
            .content.ownerDocument;
    var dirtyCopy =
        goog.asserts.assert(templateDoc.importNode(dirtyElement, true));
    var dirtyCopyChildren =
        goog.html.sanitizer.noclobber.getChildNodes(dirtyCopy);
    // appendChild with a forEach instead of an innerHTML as the latter is
    // slower and vulnerable to mXSS.
    goog.array.forEach(dirtyCopyChildren, function(node) {
      cleanElement.appendChild(node);
    });
  }
};


/**
 * Retrieves a HtmlSanitizerPolicyContext from a dirty node given an attribute
 * name.
 * @param {string} attributeName
 * @param {!Element} dirtyElement
 * @return {!goog.html.sanitizer.HtmlSanitizerPolicyContext}
 * @private
 */
goog.html.sanitizer.HtmlSanitizer.getContext_ = function(
    attributeName, dirtyElement) {
  var policyContext = {cssStyle: undefined};
  if (attributeName == 'style') {
    policyContext.cssStyle =
        goog.html.sanitizer.noclobber.getElementStyle(dirtyElement);
  }
  return policyContext;
};


/**
 * Sanitizes a HTML string using a sanitizer with default options.
 * @param {string} unsanitizedHtml
 * @return {!goog.html.SafeHtml} sanitizedHtml
 */
goog.html.sanitizer.HtmlSanitizer.sanitize = function(unsanitizedHtml) {
  var sanitizer = new goog.html.sanitizer.HtmlSanitizer.Builder().build();
  return sanitizer.sanitize(unsanitizedHtml);
};
