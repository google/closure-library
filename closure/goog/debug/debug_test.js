/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.debugTest');
goog.setTestOnly();

const asserts = goog.require('goog.asserts');
const debug = goog.require('goog.debug');
const errorcontext = goog.require('goog.debug.errorcontext');
const testSuite = goog.require('goog.testing.testSuite');

/**
 * Asserts that a substring can be found in a specified text string.
 * @param {string} substring The substring to search for.
 * @param {string} text The text string to search within.
 */
function assertContainsSubstring(substring, text) {
  assertNotEquals(
      `Could not find "${substring}" in "${text}"`, -1, text.search(substring));
}

testSuite({
  testMakeWhitespaceVisible() {
    assertEquals(
        'Hello[_][_]World![r][n]\n' +
            '[r][n]\n' +
            '[f][f]I[_]am[t][t]here![r][n]\n',
        debug.makeWhitespaceVisible(
            'Hello  World!\r\n\r\n\f\fI am\t\there!\r\n'));
  },

  testGetFunctionNameOfMultilineFunction() {
    // DO NOT FORMAT THIS - it is expected that "oddlyFormatted" be on a
    // separate line from the function keyword.
    // clang-format off
    function
        oddlyFormatted() {}
    // clang-format on
    assertEquals('oddlyFormatted', debug.getFunctionName(oddlyFormatted));
  },

  testDeepExpose() {
    const a = {};
    const b = {};
    const c = {};
    a.ancestor = a;
    a.otherObject = b;
    a.otherObjectAgain = b;
    b.nextLevel = c;
    // Add Uid to a before deepExpose.
    const aUid = goog.getUid(a);

    const deepExpose = debug.deepExpose(a);

    assertContainsSubstring(
        `ancestor = ... reference loop detected .id=${aUid}. ...`, deepExpose);

    assertContainsSubstring('otherObjectAgain = {', deepExpose);

    // Make sure we've reset Uids after the deepExpose call.
    assert(goog.hasUid(a));
    assertFalse(goog.hasUid(b));
    assertFalse(goog.hasUid(c));
  },

  testEnhanceErrorWithContext() {
    const err = 'abc';
    const context = {firstKey: 'first', secondKey: 'another key'};
    const errorWithContext = debug.enhanceErrorWithContext(err, context);
    assertObjectEquals(context, errorcontext.getErrorContext(errorWithContext));
  },

  testEnhanceErrorWithContext_combinedContext() {
    const err = new Error('abc');
    errorcontext.addErrorContext(err, 'a', '123');
    const context = {b: '456', c: '789'};
    const errorWithContext = debug.enhanceErrorWithContext(err, context);
    assertObjectEquals(
        {a: '123', b: '456', c: '789'},
        errorcontext.getErrorContext(errorWithContext));
  },

  testFreeze_nonDebug() {
    if (goog.DEBUG && typeof Object.freeze == 'function') return;
    const a = {};
    assertEquals(a, debug.freeze(a));
    a.foo = 42;
    assertEquals(42, a.foo);
  },

  testFreeze_debug() {
    if (goog.DEBUG || typeof Object.freeze != 'function') return;
    const a = {};
    assertEquals(a, debug.freeze(a));
    try {
      a.foo = 42;
    } catch (expectedInStrictMode) {
    }
    assertUndefined(a.foo);
  },

  testNormalizeErrorObject_actualErrorObject() {
    const err = debug.normalizeErrorObject(new Error('abc'));

    assertEquals('Error', err.name);
    assertEquals('abc', err.message);
  },

  testNormalizeErrorObject_actualErrorObject_withNoMessage() {
    const err = debug.normalizeErrorObject(new Error());

    assertEquals('Error', err.name);
    assertEquals('', err.message);
  },

  testNormalizeErrorObject_null() {
    const err = debug.normalizeErrorObject(null);

    assertEquals('Unknown error', err.name);
    assertEquals('Unknown Error of type "null/undefined"', err.message);
  },

  testNormalizeErrorObject_undefined() {
    const err = debug.normalizeErrorObject(undefined);

    assertEquals('Unknown error', err.name);
    assertEquals('Unknown Error of type "null/undefined"', err.message);
  },

  testNormalizeErrorObject_string() {
    const err = debug.normalizeErrorObject('abc');

    assertEquals('Unknown error', err.name);
    assertEquals('abc', err.message);
  },

  testNormalizeErrorObject_number() {
    const err = debug.normalizeErrorObject(10);

    assertEquals('UnknownError', err.name);
    assertEquals('Unknown Error of type "Number"', err.message);
  },

  testNormalizeErrorObject_nonErrorObject() {
    const err = debug.normalizeErrorObject({foo: 'abc'});

    assertEquals('UnknownError', err.name);
    assertEquals('Unknown Error of type "Object"', err.message);
  },

  testNormalizeErrorObject_objectCreateNull() {
    const err = debug.normalizeErrorObject(Object.create(null));

    assertEquals('UnknownError', err.name);
    assertEquals('Unknown Error of unknown type', err.message);
  },

  testNormalizeErrorObject_instanceOfClass() {
    const TestClass = function(text) {
      this.text = text;
    };
    const instance = new TestClass('abc');
    const err = debug.normalizeErrorObject(instance);

    assertEquals('UnknownError', err.name);
    // https://www.ecma-international.org/ecma-262/6.0/#sec-assignment-operators-runtime-semantics-evaluation
    // says `instance.contstructor.name` should be "TestClass", but IE & Edge
    // don't match that spec, so get "[Anonymous]" from
    // `goog.debug.getFunctionName`.
    if (TestClass.name) {
      assertEquals('Unknown Error of type "TestClass"', err.message);
    } else {
      assertEquals('Unknown Error of type "[Anonymous]"', err.message);
    }
  },

  testDeepFreeze: {
    testObject() {
      const a = {
        'b': 'c',
        'c': true,
        'd': false,
        'e': null,
        'f': 5,
        'g': undefined,
      };
      const f = debug.deepFreeze(a);
      assertEquals('c', f.b);
      assertTrue(f.c);
      assertFalse(f.d);
      assertNull(f.e);
      assertEquals(5, f.f);
      assertTrue(f.hasOwnProperty('g'));
      assertThrows(() => {
        f.e = 5;
      });
      assertThrows(() => {
        console.log(a.e);
      });
      assertEquals('c', f.b);
      assertTrue(f.c);
      assertFalse(f.d);
      assertNull(f.e);
      assertEquals(5, f.f);
    },

    testObjectWithArray() {
      const a = {
        'b': 'c',
        'c': ['d', 'e', 'f'],
      };
      const f = debug.deepFreeze(a);
      assertEquals('c', f.b);
      assertEquals('d', f.c[0]);
      assertEquals('e', f.c[1]);
      assertEquals('f', f.c[2]);
      asserts.assertArray(f.c);
      assertThrows(() => {
        f.c = 'hello world!';
      });
      assertThrows(() => {
        console.log(a.c);
      });
      assertEquals('c', f.b);
      assertEquals('d', f.c[0]);
      assertEquals('e', f.c[1]);
      assertEquals('f', f.c[2]);
    },

    testObjectWithChildObjects() {
      const a = {
        'c': {
          'd': 'e',
          'r': 'f',
        },
      };
      const f = debug.deepFreeze(a);
      assertEquals('e', f.c.d);
      assertEquals('f', f.c.r);
      assertThrows(() => {
        f.c.r = 10;
      });
      assertThrows(() => {
        f.c = {};
      });
      assertThrows(() => {
        console.log(a.c);
      });

      assertThrows(() => {
        a.c = {};
      });
      assertEquals('e', f.c.d);
      assertEquals('f', f.c.r);
    },

    testObjectWithSymbolKeys() {
      const s = Symbol(5);
      const a = {};
      a[s] = 'hello world';
      const f = debug.deepFreeze(a);
      assertEquals('hello world', f[s]);
      // The below check would be an assertThrows, but the Symbol polyfill for
      // IE doesn't throw when changing a frozen symbol key's value.
      try {
        f[s] = 'new thing!';
      } catch (expectedInStrictMode) {
      }
      assertEquals('hello world', f[s]);
      assertThrows(() => {
        console.log(a[s]);
      });
    },

    testObjectWithSymbolValues() {
      const s = Symbol(5);
      if (s instanceof Object) {
        // The below test doesn't work in IE as the Symbol polyfill is detected
        // to be an object that is not an object literal.
        // TODO(user): run this test on IE.
        return;
      }
      const a = {
        's': s,
      };
      const f = debug.deepFreeze(a);
      assertEquals(s, f.s);

      assertThrows(() => {
        f.s = Symbol(10);
      });
      assertThrows(() => {
        console.log(a.s);
      });
      assertEquals(s, f.s);
    },

    testArray() {
      const a = new Array(5);
      a[2] = 5;
      const f = debug.deepFreeze(a);
      assertEquals(a.length, f.length);
      assertEquals(5, f[2]);
      asserts.assertArray(f);
      assertThrows(() => {
        f[2] = 'hello world!';
      });
      assertThrows(() => {
        console.log(a[2]);
      });
    },

    testFailsWithFunctions() {
      assertThrows(() => {
        debug.deepFreeze(function() {
          console.log('');
        });
      });
    },

    testFailsWithFunctionInObject() {
      assertThrows(() => {
        debug.deepFreeze({
          a: function() {
            console.log('');
          },
        });
      });
    },

    testFailsWithClasses() {
      assertThrows(() => {
        class C {
          hello() {
            console.log('Hello');
          }
        }
        const b = new C();
        debug.deepFreeze(b);
      });
    },

    testFailsWithClassInObject() {
      assertThrows(() => {
        class C {
          hello() {
            console.log('Hello');
          }
        }
        const b = new C();
        debug.deepFreeze({
          'b': b,
        });
      });
    },

    testFailsWithClassDefinition() {
      assertThrows(() => {
        const b = class C {};
        debug.deepFreeze(b);
      });
    },

    testFailsWithClassDefinitionInObject() {
      assertThrows(() => {
        const b = class C {};
        debug.deepFreeze({
          'b': b,
        });
      });
    },

    testFailsWithGetters() {
      assertThrows(() => {
        debug.deepFreeze({
          get aThing() {
            return 5;
          },
        });
      });
    },

    testFailsWithSetters() {
      assertThrows(() => {
        debug.deepFreeze({
          a: 5,
          set aThing(v) {
            a++;
          },
        });
      });
    },


    testFailsWithCyclicReferences() {
      const a = {b: {}};
      a.b.c = a;
      assertThrows(() => {
        debug.deepFreeze(a);
      });
    },
  },
});
