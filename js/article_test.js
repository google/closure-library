// Documentation licensed under CC BY 4.0
// License available at https://creativecommons.org/licenses/by/4.0/

goog.require('goog.testing.dom');
goog.require('goog.testing.testSuite');

/**
 * Iterates over 'div#test*' elements to find test cases.  For each,
 * adds a test case that adds the "input" DOM, runs the "process" script,
 * compares against the "expected" output DOM, and then optionally runs
 * the optional "postcondition" script.  Because the 'type' attribute
 * is not "javascript" (or omitted), these scripts don't run automatically
 * when the DOM is loaded, so we can eval() them later when it makes
 * more sense.  This function is called at the end of the
 * article_test_dom.html.
 */
function initTestSuite() {
  goog.testing.testSuite((function() {
    var testElement;

    var suite = {
      setUp() {
        testElement = document.createElement('div');
        document.body.appendChild(testElement);
      },
      tearDown() {
        testElement.remove();
      },
    };

    /**
     * @param {string} type Type of script element to read.
     * @return {function()} The script contents as a function.
     */
    function getScript(type) {
      var element = div.querySelector('script[type="' + type + '"]');
      return new Function(element && element.textContent || '');
    }

    /**
     * @param {!Element} div Element to build a test case from.
     * @return {function()} A test case function.
     */
    function testCase(div) {
      var input = div.querySelector('.input');
      var expected = div.querySelector('.expected');
      expected = expected ? expected.innerHTML : '';
      var process = getScript('process');
      var postcondition = getScript('postcondition');
      var name = div.id;
      return function() {
        testElement.id = name;
        testElement.innerHTML = input.innerHTML;
        process();
        goog.testing.dom.assertHtmlMatches(expected, testElement.innerHTML);
        postcondition();
      };
    }

    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
      var div = divs[i];
      if (!/^test.+/.test(div.id)) continue;
      div.remove();
      suite[div.id] = testCase(div);
    }
    return suite;
  })());
}
