/**
 * @license
 * Copyright 2018 The Closure Library Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {SourceError} = require('./sourceerror');
const depGraph = require('./depgraph');
const fs = require('fs');
const {gjd} = require('google-closure-compiler');
const path = require('path');


class ParseResult {
  /**
   * @param {!depGraph.Dependency} dependency
   * @param {!Array<!ParseError>} errors
   */
  constructor(dependency, errors) {
    /** @const */
    this.dependency = dependency;
    /** @const */
    this.errors = errors;
    /** @const {boolean} */
    this.hasFatalError = errors.some(e => e.fatal);
  }
}
exports.ParseResult = ParseResult;


class ParseError {
  /**
   * @param {boolean} fatal
   * @param {string} message
   * @param {string} sourceName
   * @param {number} line
   * @param {number} lineOffset
   */
  constructor(fatal, message, sourceName, line, lineOffset) {
    /** @const */
    this.fatal = fatal;
    /** @const */
    this.message = message;
    /** @const */
    this.sourceName = sourceName;
    /** @const */
    this.line = line;
    /** @const */
    this.lineOffset = lineOffset;
  }

  /** @override */
  toString() {
    return `${this.fatal ? 'ERROR' : 'WARNING'} in ${this.sourceName} at ${
        this.line}, ${this.lineOffset}: ${this.message}`;
  }
}
exports.ParseError = ParseError;


/**
 * @param {string} path
 * @return {!ParseResult}
 */
const parseFile = exports.parseFile = function(path) {
  return parseText(fs.readFileSync(path, 'utf8'), path);
};


/**
 * @param {string} path
 * @return {!Promise<!ParseResult>}
 */
const parseFileAsync = exports.parseFileAsync = async function(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(parseText(data, path));
      } catch (e) {
        reject(e);
      }
    });
  });
};


const MultipleSymbolsInClosureModuleError =
    exports.MultipleSymbolsInClosureModuleError = class extends SourceError {
  /**
   * @param {string} filePath
   */
  constructor(filePath) {
    super('Closure modules cannot contain more than one namespace.', filePath);
  }
};


const MultipleSymbolsInEs6ModuleError =
    exports.MultipleSymbolsInEs6ModuleError = class extends SourceError {
  /**
   * @param {string} filePath
   */
  constructor(filePath) {
    super('ES6 modules cannot contain more than one namespace.', filePath);
  }
};


/**
 * @param {string} text
 * @param {string} filePath
 * @return {!ParseResult}
 */
const parseText = exports.parseText = function(text, filePath) {
  const errors = [];

  /**
   * @param {boolean} fatal
   * @param {string} message
   * @param {string} sourceName
   * @param {number} line
   * @param {number} lineOffset
   */
  function report(fatal, message, sourceName, line, lineOffset) {
    errors.push(new ParseError(fatal, message, sourceName, line, lineOffset));
  }

  const data = gjd(text, filePath, report);

  if (errors.some(e => e.fatal)) {
    return new ParseResult(
        new depGraph.Dependency(
            depGraph.DependencyType.SCRIPT, filePath, [], []),
        errors);
  }

  function getLoadFlag(key, defaultValue) {
    if (data.load_flags) {
      for (const [k, v] of data.load_flags) {
        if (key === k) {
          return v;
        }
      }
    }
    return defaultValue;
  }

  const loadFlags = new Map(data.load_flags || []);
  const module = loadFlags.get('module');
  const language = loadFlags.get('lang') || 'es3';

  const imports = [];
  if (data.imported_modules) {
    data.imported_modules.forEach(r => imports.push(new depGraph.Es6Import(r)));
  }
  if (data.requires) {
    data.requires.forEach(r => imports.push(new depGraph.GoogRequire(r)));
  }

  const provides = data.provides || [];

  let dependency;

  if (module == 'es6') {
    if (provides.length > 1) {
      throw new MultipleSymbolsInEs6ModuleError(filePath);
    }

    dependency = new depGraph.Dependency(
        depGraph.DependencyType.ES6_MODULE, filePath, provides, imports,
        language);
  } else if (module == 'goog') {
    if (provides.length > 1) {
      throw new MultipleSymbolsInClosureModuleError(filePath);
    }

    dependency = new depGraph.Dependency(
        depGraph.DependencyType.CLOSURE_MODULE, filePath, provides, imports,
        language);
  } else if (provides.length) {
    dependency = new depGraph.Dependency(
        depGraph.DependencyType.CLOSURE_PROVIDE, filePath, provides, imports,
        language);
  } else {
    dependency = new depGraph.Dependency(
        depGraph.DependencyType.SCRIPT, filePath, provides, imports, language);
  }

  return new ParseResult(dependency, errors);
};
