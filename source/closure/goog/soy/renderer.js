/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a soy renderer that allows registration of
 * injected data ("globals") that will be passed into the rendered
 * templates.
 */

goog.provide('goog.soy.Renderer');

goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.soy');
goog.require('goog.soy.data.SanitizedContent');
goog.require('goog.soy.data.SanitizedContentKind');
goog.requireType('goog.html.SafeHtml');
goog.requireType('goog.html.SafeStyleSheet');
goog.requireType('goog.soy.InjectedDataSupplier');
goog.requireType('goog.soy.data.SanitizedCss');
goog.requireType('goog.soy.data.SanitizedHtml');
goog.requireType('goog.soy.data.SanitizedUri');


/**
 * Creates a new soy renderer. Note that the renderer will only be
 * guaranteed to work correctly within the document scope provided in
 * the DOM helper.
 *
 * @param {?goog.soy.InjectedDataSupplier=} opt_injectedDataSupplier A supplier
 *     that provides an injected data.
 * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper;
 *     defaults to that provided by `goog.dom.getDomHelper()`.
 * @constructor
 */
goog.soy.Renderer = function(opt_injectedDataSupplier, opt_domHelper) {
  'use strict';
  /**
   * @const {!goog.dom.DomHelper}
   * @private
   */
  this.dom_ = opt_domHelper || goog.dom.getDomHelper();

  /**
   * @const {?goog.soy.InjectedDataSupplier}
   * @private
   */
  this.supplier_ = opt_injectedDataSupplier || null;
};


/**
 * Renders a Soy template into a single node or a document fragment.
 * Delegates to `goog.soy.renderAsFragment`.
 *
 * @param {function(ARG_TYPES, ?Object<string, *>=): *} template The Soy
 *     template defining the element's content.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @return {!Node} The resulting node or document fragment.
 * @template ARG_TYPES
 */
goog.soy.Renderer.prototype.renderAsFragment = function(
    template, opt_templateData) {
  'use strict';
  const node = goog.soy.renderAsFragment(
      template, opt_templateData, this.getInjectedData_(), this.dom_);
  this.handleRender(node, goog.soy.data.SanitizedContentKind.HTML);
  return node;
};


/**
 * Renders a Soy template into a single node. If the rendered HTML
 * string represents a single node, then that node is returned.
 * Otherwise, a DIV element is returned containing the rendered nodes.
 * Delegates to `goog.soy.renderAsElement`.
 *
 * @param {function(ARG_TYPES, ?Object<string, *>=): *} template The Soy
 *     template defining the element's content.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @return {!Element} Rendered template contents, wrapped in a parent DIV
 *     element if necessary.
 * @template ARG_TYPES
 */
goog.soy.Renderer.prototype.renderAsElement = function(
    template, opt_templateData) {
  'use strict';
  const element = goog.soy.renderAsElement(
      template, opt_templateData, this.getInjectedData_(), this.dom_);
  this.handleRender(element, goog.soy.data.SanitizedContentKind.HTML);
  return element;
};


/**
 * Renders a Soy template and then set the output string as the
 * innerHTML of the given element. Delegates to `goog.soy.renderElement`.
 *
 * @param {?Element} element The element whose content we are rendering.
 * @param {function(ARG_TYPES, ?Object<string, *>=): *} template The Soy
 *     template defining the element's content.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @template ARG_TYPES
 */
goog.soy.Renderer.prototype.renderElement = function(
    element, template, opt_templateData) {
  'use strict';
  goog.soy.renderElement(
      element, template, opt_templateData, this.getInjectedData_());
  this.handleRender(element, goog.soy.data.SanitizedContentKind.HTML);
};


/**
 * Renders a Soy template and returns the output string.
 * If the template is strict, it must be of kind HTML. To render strict
 * templates of other kinds, use `renderText` (for `kind="text"`) or
 * `renderStrictOfKind`.
 *
 * @param {function(ARG_TYPES, ?Object<string, *>=): *} template The Soy
 *     template to render.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @return {string} The return value of rendering the template directly.
 * @template ARG_TYPES
 */
goog.soy.Renderer.prototype.render = function(template, opt_templateData) {
  'use strict';
  const result = template(opt_templateData || {}, this.getInjectedData_());
  goog.asserts.assert(
      !(result instanceof goog.soy.data.SanitizedContent) ||
          result.contentKind === goog.soy.data.SanitizedContentKind.HTML,
      'render was called with a strict template of kind other than "html"' +
          ' (consider using renderText or renderStrict)');
  const contentKind = result instanceof goog.soy.data.SanitizedContent ?
      result.contentKind :
      null;
  this.handleRender(null /* node */, contentKind);
  return String(result);
};


/**
 * Renders a strict Soy template of kind="text" and returns the output string.
 * It is an error to use renderText on templates of kinds other than "text".
 *
 * @param {function(ARG_TYPES, ?Object<string,*>=): string} template The Soy
 *     template to render.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @return {string} The return value of rendering the template directly.
 * @template ARG_TYPES
 */
goog.soy.Renderer.prototype.renderText = function(template, opt_templateData) {
  'use strict';
  const result = template(opt_templateData || {}, this.getInjectedData_());
  if (goog.asserts.ENABLE_ASSERTS) {
    /** @suppress {checkTypes} Runtime check for untyped code. */
    const isSanitizedContent = result instanceof goog.soy.data.SanitizedContent;
    goog.asserts.assertString(
        result,
        isSanitizedContent ?
            'renderText was called with a template of kind other than "text"' :
            'renderText was called with a non-template');
  }
  return String(result);
};


/**
 * Renders a strict Soy HTML template and returns the output SanitizedHtml
 * object.
 * @param {function(ARG_TYPES, ?Object<string,*>=):
 *     !goog.soy.data.SanitizedHtml} template The Soy template to render.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @return {!goog.soy.data.SanitizedHtml}
 * @template ARG_TYPES
 */
goog.soy.Renderer.prototype.renderStrict = function(
    template, opt_templateData) {
  'use strict';
  return this.renderStrictOfKind(
      template, opt_templateData, goog.soy.data.SanitizedContentKind.HTML);
};


/**
 * Renders a strict Soy template and returns the output SanitizedUri object.
 *
 * @param {function(ARG_TYPES, ?Object<string, *>=):
 *     !goog.soy.data.SanitizedUri} template The Soy template to render.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @return {!goog.soy.data.SanitizedUri}
 * @template ARG_TYPES
 */
goog.soy.Renderer.prototype.renderStrictUri = function(
    template, opt_templateData) {
  'use strict';
  return this.renderStrictOfKind(
      template, opt_templateData, goog.soy.data.SanitizedContentKind.URI);
};


/**
 * Renders a strict Soy template and returns the output SanitizedContent object.
 *
 * @param {function(ARG_TYPES, ?Object<string, *>=): RETURN_TYPE} template The
 *     Soy template to render.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @param {?goog.soy.data.SanitizedContentKind=} opt_kind The output kind to
 *     assert. If null, the template must be of kind="html" (i.e., opt_kind
 *     defaults to goog.soy.data.SanitizedContentKind.HTML).
 * @return {RETURN_TYPE} The SanitizedContent object. This return type is
 *     generic based on the return type of the template, such as
 *     goog.soy.data.SanitizedHtml.
 * @template ARG_TYPES, RETURN_TYPE
 */
goog.soy.Renderer.prototype.renderStrictOfKind = function(
    template, opt_templateData, opt_kind) {
  'use strict';
  const result = template(opt_templateData || {}, this.getInjectedData_());
  goog.asserts.assertInstanceof(
      result, goog.soy.data.SanitizedContent,
      'renderStrict cannot be called on a text soy template');
  goog.asserts.assert(
      result.contentKind ===
          (opt_kind || goog.soy.data.SanitizedContentKind.HTML),
      'renderStrict was called with the wrong kind of template');
  this.handleRender(null /* node */, result.contentKind);
  return result;
};


/**
 * Renders a strict Soy template of kind="html" and returns the result as
 * a goog.html.SafeHtml object.
 *
 * Rendering a template that is not a strict template of kind="html" results in
 * a runtime error.
 *
 * @param {function(ARG_TYPES, ?Object<string, *>=):
 *     !goog.soy.data.SanitizedHtml} template The Soy template to render.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @return {!goog.html.SafeHtml}
 * @template ARG_TYPES
 */
goog.soy.Renderer.prototype.renderSafeHtml = function(
    template, opt_templateData) {
  'use strict';
  const result = this.renderStrict(template, opt_templateData);
  // Convert from SanitizedHtml to SafeHtml.
  return result.toSafeHtml();
};


/**
 * Renders a strict Soy template of kind="css" and returns the result as
 * a goog.html.SafeStyleSheet object.
 *
 * Rendering a template that is not a strict template of kind="css" results in
 * a runtime and compile-time error.
 *
 * @param {function(ARG_TYPES, ?Object<string, *>=):
 *     !goog.soy.data.SanitizedCss} template The Soy template to render.
 * @param {ARG_TYPES=} opt_templateData The data for the template.
 * @return {!goog.html.SafeStyleSheet}
 * @template ARG_TYPES
 */
goog.soy.Renderer.prototype.renderSafeStyleSheet = function(
    template, opt_templateData) {
  'use strict';
  const result = this.renderStrictOfKind(
      template, opt_templateData, goog.soy.data.SanitizedContentKind.CSS);
  return result.toSafeStyleSheet();
};


/**
 * @return {!goog.dom.DomHelper}
 * @protected
 */
goog.soy.Renderer.prototype.getDom = function() {
  'use strict';
  return this.dom_;
};


/**
 * Observes rendering of non-text templates by this renderer.
 * @param {?Node} node Relevant node, if available. The node may or may
 *     not be in the document, depending on whether Soy is creating an element
 *     or writing into an existing one.
 * @param {?goog.soy.data.SanitizedContentKind} kind of the template, or null if
 *     it was not strict.
 * @protected
 */
goog.soy.Renderer.prototype.handleRender = goog.nullFunction;


/**
 * Creates the injectedParams map if necessary and calls the configuration
 * service to prepopulate it.
 * @return {?} The injected params.
 * @private
 */
goog.soy.Renderer.prototype.getInjectedData_ = function() {
  'use strict';
  return this.supplier_ ? this.supplier_.getData() : {};
};
