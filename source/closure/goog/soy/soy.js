/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides utility methods to render soy template.
 */

goog.provide('goog.soy');

goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.dom.NodeType');
goog.require('goog.dom.TagName');
goog.require('goog.dom.safe');
goog.require('goog.html.SafeHtml');
goog.require('goog.soy.data.SanitizedContent');
goog.requireType('goog.soy.data.SanitizedHtml');

/**
 * A structural interface for injected data.
 *
 * <p>Soy generated code contributes optional properties.
 *
 * @record
 */
goog.soy.IjData = function() {};

/**
 * Helper typedef for ij parameters.  This is what soy generates.
 * @private
 * @typedef {!goog.soy.IjData|!Object<string, *>}
 */
goog.soy.CompatibleIj_;

/**
 * Type definition for strict Soy templates. Very useful when passing a template
 * as an argument.
 * @typedef {function(?=,
 * ?goog.soy.CompatibleIj_=):(string|!goog.soy.data.SanitizedContent)}
 */
goog.soy.StrictTemplate;

/**
 * Type definition for strict Soy HTML templates. Very useful when passing
 * a template as an argument.
 * @typedef {function(?=,
 * ?goog.soy.CompatibleIj_=):!goog.soy.data.SanitizedHtml}
 */
goog.soy.StrictHtmlTemplate;


/**
 * Type definition for text templates.
 * @typedef {function(?=, ?goog.soy.CompatibleIj_=):string}
 */
goog.soy.TextTemplate;


/**
 * Sets the processed template as the innerHTML of an element. It is recommended
 * to use this helper function instead of directly setting innerHTML in your
 * hand-written code, so that it will be easier to audit the code for cross-site
 * scripting vulnerabilities.
 *
 * @param {?Element|?ShadowRoot} element The element whose content we are
 *     rendering into.
 * @param {!goog.soy.data.SanitizedContent} templateResult The processed
 *     template of kind HTML or TEXT (which will be escaped).
 * @template ARG_TYPES
 */
goog.soy.renderHtml = function(element, templateResult) {
  'use strict';
  goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(
      goog.asserts.assert(element),
      goog.soy.ensureTemplateOutputHtml_(templateResult));
};


/**
 * Renders a Soy template and then set the output string as
 * the innerHTML of an element. It is recommended to use this helper function
 * instead of directly setting innerHTML in your hand-written code, so that it
 * will be easier to audit the code for cross-site scripting vulnerabilities.
 *
 * @param {?Element|?ShadowRoot} element The element whose content we are
 *     rendering into.
 * @param {function(ARG_TYPES, ?goog.soy.CompatibleIj_=): *} template The Soy
 *     template defining the element's content.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @param {Object=} opt_injectedData The injected data for the template.
 * @template ARG_TYPES
 */
goog.soy.renderElement = function(
    element, template, opt_templateData, opt_injectedData) {
  'use strict';
  const html = goog.soy.ensureTemplateOutputHtml_(template(
      opt_templateData || goog.soy.defaultTemplateData_, opt_injectedData));
  goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(
      goog.asserts.assert(element), html);
};

/**
 * Renders a Soy template into a single node or a document
 * fragment. If the rendered HTML string represents a single node, then that
 * node is returned (note that this is *not* a fragment, despite the name of the
 * method). Otherwise a document fragment is returned containing the rendered
 * nodes.
 *
 * @param {function(ARG_TYPES, ?goog.soy.CompatibleIj_=): *} template The Soy
 *     template defining the element's content. The kind of the template must be
 *     "html" or "text".
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @param {Object=} opt_injectedData The injected data for the template.
 * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper used to
 *     create DOM nodes; defaults to `goog.dom.getDomHelper`.
 * @return {!Node} The resulting node or document fragment.
 * @template ARG_TYPES
 */
goog.soy.renderAsFragment = function(
    template, opt_templateData, opt_injectedData, opt_domHelper) {
  'use strict';
  const dom = opt_domHelper || goog.dom.getDomHelper();
  const output = template(
      opt_templateData || goog.soy.defaultTemplateData_, opt_injectedData);
  const html = goog.soy.ensureTemplateOutputHtml_(output);
  goog.soy.assertFirstTagValid_(html.getTypedStringValue());
  return dom.safeHtmlToNode(html);
};

/**
 * Renders a Soy template into a single node. If the rendered
 * HTML string represents a single node, then that node is returned. Otherwise,
 * a DIV element is returned containing the rendered nodes.
 *
 * @param {function(ARG_TYPES, ?goog.soy.CompatibleIj_=): *} template
 *     The Soy template defining the element's content.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @param {Object=} opt_injectedData The injected data for the template.
 * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper used to
 *     create DOM nodes; defaults to `goog.dom.getDomHelper`.
 * @return {!Element} Rendered template contents, wrapped in a parent DIV
 *     element if necessary.
 * @template ARG_TYPES
 */
goog.soy.renderAsElement = function(
    template, opt_templateData, opt_injectedData, opt_domHelper) {
  'use strict';
  return goog.soy.convertToElement_(
      template(
          opt_templateData || goog.soy.defaultTemplateData_, opt_injectedData),
      opt_domHelper);
};


/**
 * Converts a processed Soy template into a single node. If the rendered
 * HTML string represents a single node, then that node is returned. Otherwise,
 * a DIV element is returned containing the rendered nodes.
 *
 * @param {!goog.soy.data.SanitizedContent} templateResult The processed
 *     template of kind HTML or TEXT (which will be escaped).
 * @param {?goog.dom.DomHelper=} opt_domHelper The DOM helper used to
 *     create DOM nodes; defaults to `goog.dom.getDomHelper`.
 * @return {!Element} Rendered template contents, wrapped in a parent DIV
 *     element if necessary.
 */
goog.soy.convertToElement = function(templateResult, opt_domHelper) {
  'use strict';
  return goog.soy.convertToElement_(templateResult, opt_domHelper);
};


/**
 * Non-strict version of `goog.soy.convertToElement`.
 *
 * @param {*} templateResult The processed template.
 * @param {?goog.dom.DomHelper=} opt_domHelper The DOM helper used to
 *     create DOM nodes; defaults to `goog.dom.getDomHelper`.
 * @return {!Element} Rendered template contents, wrapped in a parent DIV
 *     element if necessary.
 * @private
 */
goog.soy.convertToElement_ = function(templateResult, opt_domHelper) {
  'use strict';
  const dom = opt_domHelper || goog.dom.getDomHelper();
  const wrapper = dom.createElement(goog.dom.TagName.DIV);
  const html = goog.soy.ensureTemplateOutputHtml_(templateResult);
  goog.soy.assertFirstTagValid_(html.getTypedStringValue());
  goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(wrapper, html);

  // If the template renders as a single element, return it.
  if (wrapper.childNodes.length == 1) {
    const firstChild = wrapper.firstChild;
    if (firstChild.nodeType == goog.dom.NodeType.ELEMENT) {
      return /** @type {!Element} */ (firstChild);
    }
  }

  // Otherwise, return the wrapper DIV.
  return wrapper;
};


/**
 * Ensures the result is "safe" to insert as HTML.
 *
 * In the case the argument is a SanitizedContent object, it either must
 * already be of kind HTML, or if it is kind="text", the output will be HTML
 * escaped.
 *
 * @param {*} templateResult The template result.
 * @return {!goog.html.SafeHtml} The assumed-safe HTML output string.
 * @private
 */
goog.soy.ensureTemplateOutputHtml_ = function(templateResult) {
  'use strict';
  // Note we allow everything that isn't an object, because some non-escaping
  // templates end up returning non-strings if their only print statement is a
  // non-escaped argument, plus some unit tests spoof templates.
  // TODO(gboyer): Track down and fix these cases.
  if (!goog.isObject(templateResult)) {
    return goog.html.SafeHtml.htmlEscape(String(templateResult));
  }

  // Allow SanitizedContent of kind HTML.
  if (templateResult instanceof goog.soy.data.SanitizedContent) {
    return templateResult.toSafeHtml();
  }

  goog.asserts.fail(
      'Soy template output is unsafe for use as HTML: ' + templateResult);

  // In production, return a safe string, rather than failing hard.
  return goog.html.SafeHtml.htmlEscape('zSoyz');
};


/**
 * Checks that the rendered HTML does not start with an invalid tag that would
 * likely cause unexpected output from renderAsElement or renderAsFragment.
 * See {@link http://www.w3.org/TR/html5/semantics.html#semantics} for reference
 * as to which HTML elements can be parents of each other.
 * @param {string} html The output of a template.
 * @private
 */
goog.soy.assertFirstTagValid_ = function(html) {
  'use strict';
  if (goog.asserts.ENABLE_ASSERTS) {
    const matches = html.match(goog.soy.INVALID_TAG_TO_RENDER_);
    goog.asserts.assert(
        !matches, 'This template starts with a %s, which ' +
            'cannot be a child of a <div>, as required by soy internals. ' +
            'Consider using goog.soy.renderElement instead.\nTemplate output: %s',
        matches && matches[0], html);
  }
};


/**
 * A pattern to find templates that cannot be rendered by renderAsElement or
 * renderAsFragment, as these elements cannot exist as the child of a <div>.
 * @type {!RegExp}
 * @private
 */
goog.soy.INVALID_TAG_TO_RENDER_ =
    /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i;


/**
 * Immutable object that is passed into templates that are rendered
 * without any data.
 * @private @const
 */
goog.soy.defaultTemplateData_ = {};
