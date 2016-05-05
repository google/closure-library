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
goog.require('goog.html.SafeUrl');
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
 * Creates an HTML sanitizer.
 * @param {!goog.html.sanitizer.HtmlSanitizer.Builder=} opt_builder
 * @final
 * @constructor @struct
 */
goog.html.sanitizer.HtmlSanitizer = function(opt_builder) {
  opt_builder = opt_builder || new goog.html.sanitizer.HtmlSanitizer.Builder();

  /**
   * @private {!Object<string, !goog.html.sanitizer.HtmlSanitizerPolicy>}
   */
  this.attributeHandlers_ = goog.object.clone(opt_builder.attributeWhitelist_);

  /**
   * @private {!Object<string, boolean>}
   */
  this.tagBlacklist_ = goog.object.clone(opt_builder.tagBlacklist_);


  // Add whitelist data-* attributes from the builder to the attributeHandlers
  // with a default cleanUpAttribute function. data-* attributes are inert as
  // per HTML5 specs, so not much sanitization needed.
  goog.array.forEach(opt_builder.dataAttributeWhitelist_, function(dataAttr) {
    // TODO(danesh): What if this is just data-, do we need to check data-\w+?
    goog.asserts.assert(goog.string.startsWith(dataAttr, 'data-'));

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
  return /** @type {goog.html.sanitizer.HtmlSanitizerPolicy} */ (
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

  /**
   * Keeps track of whether we allow form tags.
   * @private {boolean}
   */
  this.allowFormTag_ = false;

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
   * A function to be applied to urls found on the parsing process which do not
   * trigger requests.
   * @private {goog.html.sanitizer.HtmlSanitizerPolicy}
   */
  this.urlPolicy_ = goog.html.sanitizer.HtmlSanitizer.defaultUrlPolicy_;

  /**
   * A function to be applied to urls found on the parsing process which may
   * trigger requests.
   * @private {goog.html.sanitizer.HtmlSanitizerPolicy}
   */
  this.networkRequestUrlPolicy_ =
      goog.html.sanitizer.HtmlSanitizer.defaultNetworkRequestUrlPolicy_;

  /**
   * A function to be applied to names found on the parsing process.
   * @private {goog.html.sanitizer.HtmlSanitizerPolicy}
   */
  this.namePolicy_ = goog.html.sanitizer.HtmlSanitizer.defaultNamePolicy_;

  /**
   * A function to be applied to other tokens (i.e. classes and IDs) found on
   * the parsing process.
   * @private {goog.html.sanitizer.HtmlSanitizerPolicy}
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
 * Build and return a goog.html.sanitizer.HtmlSanitizer object.
 * @return {!goog.html.sanitizer.HtmlSanitizer}
 */
goog.html.sanitizer.HtmlSanitizer.Builder.prototype.build = function() {
  if (!this.allowFormTag_) {
    this.tagBlacklist_['FORM'] = true;
  }

  // Binding all the non-trivial attribute sanitizers to the appropriate,
  // potentially customizable, handling functions at build().
  this.attributeWhitelist_['* USEMAP'] =
      /** @type {goog.html.sanitizer.HtmlSanitizerPolicy} */ (
          goog.html.sanitizer.HtmlSanitizer.sanitizeUrlFragment_);

  var urlAttributes = ['* ACTION', '* CITE', '* HREF'];
  goog.array.forEach(urlAttributes, function(attribute) {
    this.attributeWhitelist_[attribute] = this.urlPolicy_;
  }, this);

  var networkUrlAttributes = [
    // LONGDESC can result in a network request. See b/23381636.
    '* LONGDESC', '* SRC', 'LINK HREF'
  ];
  goog.array.forEach(networkUrlAttributes, function(attribute) {
    this.attributeWhitelist_[attribute] = this.networkRequestUrlPolicy_;
  }, this);

  var nameAttributes = ['* FOR', '* HEADERS', '* NAME'];
  goog.array.forEach(nameAttributes, function(attribute) {
    this.attributeWhitelist_[attribute] =
        /** @type {goog.html.sanitizer.HtmlSanitizerPolicy} */ (goog.partial(
            goog.html.sanitizer.HtmlSanitizer.sanitizeName_, this.namePolicy_));
  }, this);

  this.attributeWhitelist_['* CLASS'] =
      /** @type {goog.html.sanitizer.HtmlSanitizerPolicy} */ (goog.partial(
          goog.html.sanitizer.HtmlSanitizer.sanitizeClasses_,
          this.tokenPolicy_));

  this.attributeWhitelist_['* ID'] =
      /** @type {goog.html.sanitizer.HtmlSanitizerPolicy} */ (goog.partial(
          goog.html.sanitizer.HtmlSanitizer.sanitizeId_, this.tokenPolicy_));

  if (this.sanitizeCssPolicy_) {
    this.attributeWhitelist_['* STYLE'] =
        /** @type {goog.html.sanitizer.HtmlSanitizerPolicy} */ (goog.partial(
            this.sanitizeCssPolicy_, this.networkRequestUrlPolicy_));
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
  return goog.html.sanitizer.CssSanitizer.sanitizeInlineStyle(
      policyContext.cssStyle, naiveUriRewriter);
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
    var doc = document.implementation.createHTMLDocument('unsanitized input');
    iteratorParent = doc.body;
    doc.body.innerHTML = unsanitizedHtml;
  }
  return document.createTreeWalker(
      iteratorParent, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null,
      false);
};


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
      Object.getOwnPropertyDescriptor(Element.prototype, 'attributes');
  if (attrDescriptor && attrDescriptor.get) {
    return attrDescriptor.get.apply(node);
  } else {
    return node.attributes instanceof NamedNodeMap ? node.attributes : null;
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
      Object.getOwnPropertyDescriptor(Element.prototype, 'attributes');
  if (attrDescriptor && attrDescriptor.set) {
    attrDescriptor.set.call(node, value);
  } else {
    if (node.attributes instanceof NamedNodeMap) {
      var curr = node.attributes.getNamedItem(name);
      if (!curr) {
        curr = curr ? curr : document.createAttribute(name);
        node.attributes.setNamedItem(curr);
      }
      curr.value = value;
    }
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
  var styleDescriptor;
  if (node instanceof HTMLElement) {
    styleDescriptor =
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');
  }
  try {
    if (styleDescriptor && styleDescriptor.get) {
      return styleDescriptor.get.apply(node);
    } else {
      return node.style instanceof CSSStyleDeclaration ? node.style : null;
    }
  } catch (e) {
    return null;  // you have no style.
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
      Object.getOwnPropertyDescriptor(Node.prototype, 'nodeName');
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
  if (!node) {
    return null;
  }
  var parentNodeDescriptor =
      Object.getOwnPropertyDescriptor(Node.prototype, 'parentNode');
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
 * Causes the browser to parse the DOM tree of a given HTML string, then walks
 * the tree. For each element, it creates a new sanitized version, applies
 * sanitized attributes, and returns a SafeHtml object representing the
 * sanitized tree.
 * @param {?string} unsanitizedHtml
 * @return {!goog.html.SafeHtml} Sanitized HTML
 * @throws {!Error} If browser doesn't support <template> or
 *     document.implementation, or if the sanitizedParent DIV node is not found
 *     in the serialized XML. IE8 is not supported.
 * @final
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitize = function(
    unsanitizedHtml) {
  var sanitizedParent = this.sanitizeToDomNode(unsanitizedHtml);
  var sanitizedString = new XMLSerializer().serializeToString(sanitizedParent);

  // The serializeToString function acts like outerHTML, so we need to get rid
  // of the parent div.
  var sanitizedParentWithDiv = goog.dom.safeHtmlToNode(
      goog.html.uncheckedconversions
          .safeHtmlFromStringKnownToSatisfyTypeContract(
              goog.string.Const.from('Output of HTML sanitizer'),
              sanitizedString));
  return goog.html.uncheckedconversions
      .safeHtmlFromStringKnownToSatisfyTypeContract(
          goog.string.Const.from('Output of HTML sanitizer w/o outerDiv'),
          sanitizedParentWithDiv.innerHTML);
};


/**
 * Causes the browser to parse the DOM tree of a given HTML string, then walks
 * the tree. For each element, it creates a new sanitized version, applies
 * sanitized attributes, and returns a sanitized NodeList.
 * @param {?string} unsanitizedHtml
 * @return {!Element} Sanitized HTML
 * @final
 */
goog.html.sanitizer.HtmlSanitizer.prototype.sanitizeToDomNode = function(
    unsanitizedHtml) {
  if (!unsanitizedHtml ||
      (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(10))) {
    // TODO(danesh): IE9 or earlier versions don't provide an easy way to
    // parse HTML inertly. Handle in a way other than an empty div perhaps.
    return document.createElement('div');
  }

  // Get the parent and treeWalker initialized.
  var sanitizedParent = document.createElement('div');
  try {
    var treeWalker =
        goog.html.sanitizer.HtmlSanitizer.getDomTreeWalker_(unsanitizedHtml);
  } catch (e) {
    throw Error('Browser Not Supported');
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

    // Finds the parent to which cleanNode should be appended.
    var target;
    var dirtyParent =
        goog.html.sanitizer.HtmlSanitizer.getParentNode_(dirtyNode);
    var dirtyGrandParent =
        goog.html.sanitizer.HtmlSanitizer.getParentNode_(dirtyParent);
    var dirtyGrtGrandParent = !dirtyGrandParent ? null :
        goog.html.sanitizer.HtmlSanitizer.getParentNode_(dirtyGrandParent);
    var dirtyGrtGrtGrandParent = !dirtyGrtGrandParent ? null :
        goog.html.sanitizer.HtmlSanitizer.getParentNode_(dirtyGrtGrandParent);

    if (goog.isNull(dirtyParent) ||
        // The following checks if target is an immediate child of the inert
        // parent HtmlDocument
        (goog.html.sanitizer.HtmlSanitizer.getNodeName_(dirtyParent)
                 .toLowerCase() == 'body' &&
         goog.isNull(dirtyGrtGrtGrandParent)) ||
        // The following checks if target is an immediate child of the inert
        // parent template element
        (dirtyParent.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT &&
         goog.isNull(dirtyGrandParent))) {
      target = sanitizedParent;
    } else {
      target = elementMap
          [goog.html.sanitizer.HtmlSanitizer
               .getAttributes_(dirtyParent)
                   [goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_ATTR_NAME_]
               .value];
    }
    if (target.content) {
      target = target.content;
    }
    // Do not attach templates.
    if (cleanNode.nodeName.toLowerCase() != 'template') {
      target.appendChild(cleanNode);
    }
  }

  return sanitizedParent;
};


/**
 * Returns a sanitizd version of an element, with no children or attributes.
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
  var cleanElemName;
  if (elemName in goog.html.sanitizer.TagBlacklist ||
      elemName in this.tagBlacklist_) {
    // If it's in the inert blacklist, replace with template.
    cleanElemName = 'template';
  } else if (elemName in goog.html.sanitizer.TagWhitelist) {
    // If it's in the whitelist, keep as is.
    cleanElemName = elemName;
  } else {
    // If it's not in any list, replace with div.
    cleanElemName = 'div';
  }
  return document.createElement(cleanElemName);
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
  var attributesOrNull =
      goog.html.sanitizer.HtmlSanitizer.getAttributes_(dirtyNode);
  var attributes = attributesOrNull ? attributesOrNull : [];
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
  var nodeName = goog.html.sanitizer.HtmlSanitizer.getNodeName_(dirtyNode);
  var unsanitizedAttrValue = attribute.value;

  // Create policy hints object
  var policyHints = {
    tagName: goog.string.trim(nodeName).toLowerCase(),
    attributeName: goog.string.trim(attributeName).toLowerCase()
  };

  if (goog.string.startsWith(
          goog.html.sanitizer.HTML_SANITIZER_BOOKKEEPING_PREFIX_,
          attributeName)) {
    return null;
  }
  var policyContext =
      goog.html.sanitizer.HtmlSanitizer.getContext_(attributeName, dirtyNode);

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
  } else if (genericHandlerIndex in goog.html.sanitizer.AttributeWhitelist) {
    return goog.html.sanitizer.HtmlSanitizer.cleanUpAttribute_(
        unsanitizedAttrValue, policyHints);
  }
  return null;
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
  if (attributeName.toUpperCase() == 'STYLE') {
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
 * @throws {!Error} If browser doesn't support <template> or
 *     document.implementation, or if the sanitizedParent DIV node is not found
 *     in the serialized XML. IE8 is not supported.
 */
goog.html.sanitizer.HtmlSanitizer.sanitize = function(unsanitizedHtml) {
  var sanitizer = new goog.html.sanitizer.HtmlSanitizer.Builder().build();
  return sanitizer.sanitize(unsanitizedHtml);
};
