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

const depGraph = require('../../lib/depgraph');
const parser = require('../../lib/parser');

/**
 * @param {...string} lines
 * @return {string}
 */
function lines(...lines) {
  return lines.join('\n');
}


/**
 * Jasmine matcher that matches an ES6 import for the given path.
 *
 * @param {string} path
 * @return {?}
 */
function importText(path) {
  return {
    asymmetricMatch(actual) {
      return actual instanceof depGraph.Es6Import && actual.symOrPath == path;
    },

    jasmineToString() {
      return `import|export for "${path}"`;
    },
  };
}


/**
 * @param {string} symbol
 * @return {?}
 */
function requireText(symbol) {
  return {
    asymmetricMatch(actual) {
      return actual instanceof depGraph.GoogRequire &&
          actual.symOrPath == symbol;
    },

    jasmineToString() {
      return `goog.require() for "${symbol}"`;
    },
  };
}

/**
 * @param {string...} lines
 * @return {!parser.ParseResult}
 */
function parseNoErrors(...lines) {
  const result = parser.parseText(lines.join('\n'), 'testfile');
  if (result.errors.length) {
    throw new Error(
        'Had errors: ' + result.errors.map(e => e.toString()).join('\n'));
  }
  return result.dependency;
}

/**
 * @param {string} errorMessage Expected error message
 * @param {...string} lines Code lines to parse
 */
function hasFatalParseError(errorMessage, ...lines) {
  const result = parser.parseText(lines.join('\n'), 'testfile');
  if (!result.errors.length) {
    throw new Error('Had errors no errors!');
  }
  if (result.errors.length > 1) {
    throw new Error(
        'Had too many errors: ' +
        result.errors.map(e => e.toString()).join('\n'));
  }
  const actual = result.errors[0];
  expect(actual.fatal).toBe(true);
  expect(actual.message).toBe(errorMessage);
}

describe('parse', function() {
  it('goog requires', function() {
    const dep = parseNoErrors(
        'goog.require("my.example");', 'goog.require("my.second.example");');

    expect(dep.imports).toEqual([
      requireText('goog'),
      requireText('my.example'),
      requireText('my.second.example'),
    ]);
  });

  it('goog provides', function() {
    const dep = parseNoErrors(
        'goog.provide("my.example");', 'goog.provide("my.second.example");');
    expect(dep.type).toEqual(depGraph.DependencyType.CLOSURE_PROVIDE);
    expect(dep.closureSymbols).toEqual(['my.example', 'my.second.example']);
    expect(dep.imports).toEqual([requireText('goog')]);
  });

  describe('goog module', function() {
    it('', function() {
      const dep = parseNoErrors('goog.module("my.example")');
      expect(dep.type).toEqual(
          depGraph.DependencyType.CLOSURE_MODULE);
      expect(dep.closureSymbols).toEqual(['my.example']);
      expect(dep.imports).toEqual([requireText('goog')]);
    });

    it('multiple is error', function() {
      expect(
          () => parseNoErrors(
              'goog.module("my.example");',
              'goog.module("my.second.example");'))
          .toThrow(jasmine.any(parser.MultipleSymbolsInClosureModuleError));
    });

    it('declareLegacyNamespace', function() {
      const dep = parseNoErrors(
          'goog.module("my.example");', 'goog.module.declareLegacyNamespace()');
      expect(dep.type).toEqual(
          depGraph.DependencyType.CLOSURE_MODULE);
      expect(dep.closureSymbols).toEqual(['my.example']);
      expect(dep.imports).toEqual([requireText('goog')]);
    });

    it('with default exports', function() {
      // Important test that we aren't overlapping with
      // es6 export.
      const dep = parseNoErrors('goog.module(\'x\');', 'exports = 0;');

      expect(dep.type).toEqual(
          depGraph.DependencyType.CLOSURE_MODULE);
    });
  });

  describe('es6 module', function() {
    describe('no dependencies', function() {
      let dep;

      beforeEach(() => dep = null);

      afterEach(() => {
        expect(dep.type).toEqual(
            depGraph.DependencyType.ES6_MODULE);
        expect(dep.closureSymbols).toEqual([]);
        expect(dep.imports).toEqual([]);
      });

      const exportText = [
        '{};',
        'default 0;',
        'const f = 0;',
        'function foo() {}',
        'class c{}',
      ];

      for (const text of exportText) {
        const t = `export ${text}`;
        it(`"${t}"`, function() {
          dep = parseNoErrors(t);
        });
      }
    });

    describe('single dependency', function() {
      const expectOneDep = (text) => {
        it(text, function() {
          const dep = parseNoErrors(text);
          expect(dep.type).toEqual(
              depGraph.DependencyType.ES6_MODULE);
          expect(dep.closureSymbols).toEqual([]);
          expect(dep.imports).toEqual([importText('id')]);
        });
      };

      expectOneDep(`import 'id';`);

      expectOneDep(`import Default from 'id';`);

      expectOneDep(`import { name } from 'id';`);

      expectOneDep(`import * as id from 'id';`);

      expectOneDep(`import Default, { name } from 'id';`);

      expectOneDep(`import Default, * as id from 'id';`);

      expectOneDep(`export * from 'id';`);

      expectOneDep(`export { name } from 'id';`);
    });

    describe('multiple dependencies', function() {
      it('imports and exports', function() {
        const dep = parseNoErrors(
            'import stuff from "one";', 'export * from "two";',
            'import mixed, {style} from "three";', 'export let ignored;');

        expect(dep.type).toEqual(
            depGraph.DependencyType.ES6_MODULE);
        expect(dep.closureSymbols).toEqual([]);
        expect(dep.imports).toEqual([
          importText('one'), importText('two'), importText('three')
        ]);
      });
    });

    describe('goog.require', function() {
      it('and no imports', function() {
        const dep = parseNoErrors(
            'const v = goog.require("my.example");', 'export let ignored;');

        expect(dep.type).toEqual(
            depGraph.DependencyType.ES6_MODULE);
        expect(dep.closureSymbols).toEqual([]);
        expect(dep.imports).toEqual([
          requireText('goog'),
          requireText('my.example'),
        ]);
      });

      it('and import', function() {
        const dep = parseNoErrors(
            'const v = goog.require("my.example");', 'import "es6";');

        expect(dep.type).toEqual(
            depGraph.DependencyType.ES6_MODULE);
        expect(dep.closureSymbols).toEqual([]);
        expect(dep.imports).toEqual([
          importText('es6'),
          requireText('goog'),
          requireText('my.example'),
        ]);
      });
    });

    describe('declareNamespace', function() {
      it('first then export', function() {
        const dep = parseNoErrors(
            'goog.module.declareNamespace("my.es6");', 'export {};');

        expect(dep.type).toEqual(
            depGraph.DependencyType.ES6_MODULE);
        expect(dep.closureSymbols).toEqual(['my.es6']);
      });

      it('after export', function() {
        const dep = parseNoErrors(
            'export {};', 'goog.module.declareNamespace("my.es6");');

        expect(dep.type).toEqual(
            depGraph.DependencyType.ES6_MODULE);
        expect(dep.closureSymbols).toEqual(['my.es6']);
      });

      it('twice is error', function() {
        hasFatalParseError(
            'goog.module.declareNamespace can only be called once per ES6 ' +
                'module.',
            'export {};', 'goog.module.declareNamespace("my.es6");',
            'goog.module.declareNamespace("my.es6_0");');
      });
    });
  });

  it('no signals is script', function() {
    const dep = parseNoErrors('');
    expect(dep.type).toEqual(depGraph.DependencyType.SCRIPT);
  });

  it('only requires is script', function() {
    const dep = parseNoErrors('goog.require("stuff");');
    expect(dep.type).toEqual(depGraph.DependencyType.SCRIPT);
  });

  describe('declareNamespace is error in', function() {
    it('goog.provide', function() {
      hasFatalParseError(
          'goog.module.declareNamespace can only be called within ES6 modules.',
          'goog.provide("a.b");', 'goog.module.declareNamespace("ex");');
    });

    it('goog.module', function() {
      hasFatalParseError(
          'goog.module.declareNamespace can only be called within ES6 modules.',
          'goog.module("a.b");', 'goog.module.declareNamespace("ex");');
    });
  });

  describe('declareLegacyNamespace is error in', function() {
    it('goog.provide', function() {
      hasFatalParseError(
          'goog.module.declareLegacyNamespace may only be called in ' +
              'a goog.module.',
          'goog.provide("a.b");', 'goog.module.declareLegacyNamespace();');
    });

    it('es6 module', function() {
      hasFatalParseError(
          'goog.module.declareLegacyNamespace may only be called in ' +
              'a goog.module.',
          'export {}', 'goog.module.declareLegacyNamespace();');
    });
  });

  describe('error with mixed signals', function() {
    const signals = [
      'export {};',
      'goog.provide("x");',
      'goog.module("y")',
    ];

    for (let s1 of signals) {
      for (let s2 of signals) {
        if (s1 == s2) continue;
        it(`"${s1}" and "${s2}"`, function() {
          expect(() => parseNoErrors(s1, s2)).toThrow();
        });
      }
    }
  });

  describe('should recognize language', function() {
    function expectLanguage(language, code) {
      it(language, function() {
        const dependency = parseNoErrors(code);
        expect(dependency.language).toBe(language);
      });
    }

    expectLanguage('es3', 'var s');
    expectLanguage('es5', 'var s = {trailing: t,}');
    expectLanguage('es6', 'let s');
    expectLanguage('es7', '2**2;');
    expectLanguage('es8', 'async function foo() {}');
  });
});
