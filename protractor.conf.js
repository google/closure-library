var httpServer = require('http-server');
var PROTRACTOR_TIMEOUT = process.env.PROTRACTOR_TIMEOUT ?
    parseInt(process.env.PROTRACTOR_TIMEOUT, 10) : 10 * 60 * 1000;
exports.config = {
  directConnect: false,
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'firefox'
  },

  framework: 'jasmine2',

  specs: ['protractor_spec.js'],

  jasmineNodeOpts: {
    //default timeout plus 10 seconds to make sure spec times out before runner
    defaultTimeoutInterval: PROTRACTOR_TIMEOUT + 10000
  },

  beforeLaunch: function () {
    httpServer.createServer({
      showDir: false
    }).listen('8080', 'localhost');
  }
};
