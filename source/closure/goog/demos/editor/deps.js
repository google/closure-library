/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.addDependency(
    'demos/editor/equationeditor.js', ['goog.demos.editor.EquationEditor'],
    ['goog.ui.equation.EquationEditorDialog']);
goog.addDependency(
    'demos/editor/helloworld.js', ['goog.demos.editor.HelloWorld'],
    ['goog.dom', 'goog.dom.TagName', 'goog.editor.Plugin']);
goog.addDependency(
    'demos/editor/helloworlddialog.js',
    [
      'goog.demos.editor.HelloWorldDialog',
      'goog.demos.editor.HelloWorldDialog.OkEvent'
    ],
    [
      'goog.dom.TagName', 'goog.events.Event', 'goog.string',
      'goog.ui.editor.AbstractDialog', 'goog.ui.editor.AbstractDialog.Builder',
      'goog.ui.editor.AbstractDialog.EventType'
    ]);
goog.addDependency(
    'demos/editor/helloworlddialogplugin.js',
    [
      'goog.demos.editor.HelloWorldDialogPlugin',
      'goog.demos.editor.HelloWorldDialogPlugin.Command'
    ],
    [
      'goog.demos.editor.HelloWorldDialog', 'goog.dom.TagName',
      'goog.editor.plugins.AbstractDialogPlugin', 'goog.editor.range',
      'goog.functions', 'goog.ui.editor.AbstractDialog.EventType'
    ]);
