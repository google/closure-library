// Copyright 2015 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Parallel closure_test_suite test file. This test is not
 * intended to be ran or depended on directly.
 *
 */

goog.provide('goog.testing.parallelClosureTestSuite');
goog.setTestOnly('goog.testing.parallelClosureTestSuite');

goog.require('goog.Promise');
goog.require('goog.events');
goog.require('goog.testing.MultiTestRunner');
goog.require('goog.testing.TestCase');
goog.require('goog.testing.jsunit');

var testRunner;

function setUpPage() {
  // G_parallelTestRunner is exported in gen_parallel_test_html.py.
  var timeout = goog.global['G_parallelTestRunner']['testTimeout'];
  var allTests = goog.global['G_parallelTestRunner']['allTests'];
  var parallelFrames = goog.global['G_parallelTestRunner']['parallelFrames'];
  var parallelTimeout = goog.global['G_parallelTestRunner']['parallelTimeout'];

  // Create a test runner and render it.
  testRunner = new goog.testing.MultiTestRunner()
                   .setName(document.title)
                   .setBasePath('/google3/')
                   .setPoolSize(parallelFrames)
                   .setStatsBucketSizes(5, 500)
                   .setTimeout(parallelTimeout * 1000)
                   .addTests(allTests);

  testRunner.render(document.getElementById('runner'));

  goog.testing.TestCase.getActiveTestCase().promiseTimeout = timeout * 1000;
}

function testRunAllTests() {
  var failurePromise = new goog.Promise(function(resolve, reject) {
    goog.events.listen(testRunner, 'testsFinished', resolve);
  });

  testRunner.start();

  return failurePromise.then(function(failures) {
    var totalFailed = failures['failureReports'].length;
    if (totalFailed) {
      fail(totalFailed + ' of ' + failures['totalTests'] +
           ' test(s) failed!\n ' + failures['failureReports'].join('\n\n'));
    }
  });
}
