// See https://github.com/angular/protractor/blob/master/docs/referenceConf.js
// for full protractor config reference.

function getJobName(browser) {
  var branchAndCommit =
      process.env.TRAVIS_BRANCH + '-' + process.env.TRAVIS_COMMIT;

  return process.env.TRAVIS_PULL_REQUEST == 'false' ?
             'CO-' + browser + '-' + branchAndCommit :
             'PR-' + browser + '-' + process.env.TRAVIS_PULL_REQUEST + '-' +
                 branchAndCommit;
}

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,

  sauceKey: process.env.SAUCE_ACCESS_KEY,


  multiCapabilities: [
    {
      'browserName': 'chrome',
      'name': getJobName('chrome-latest'),
    }
  ],

  // Testing framework used for spec file.
  framework: 'jasmine2',

  // Relative path to spec (i.e., tests).
  specs: ['protractor_spec.js'],

  jasmineNodeOpts: {
    // Timeout in ms before a test fails. 30 minutes.
    defaultTimeoutInterval: 30 * 60 * 1000
  }
};
