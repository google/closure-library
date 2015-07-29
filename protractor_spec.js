var EC = protractor.ExpectedConditions;
var PROTRACTOR_TIMEOUT = process.env.PROTRACTOR_TIMEOUT ?
    parseInt(process.env.PROTRACTOR_TIMEOUT, 10) : 10 * 60 * 1000

describe('alltests', function() {
  beforeEach(function() { browser.ignoreSynchronization = true; });

  it('should successfully run all tests', function(done) {
    browser.get('http://localhost:8080/all_tests.html');
    $('.goog-testrunner-buttons button:first-child').click();
    var summary = $('.goog-testrunner-progress-summary');
    //Same timeout as parent global timeout
    browser.wait(EC.textToBePresentInElement(summary, 'passed'), PROTRACTOR_TIMEOUT)
        .then(function() {
          console.log('done waiting');
          summary.getText().then(function(text) {
            $('.goog-testrunner-report')
                .getText()
                .then(function(failures) {
                  console.log(failures);
                  expect(text.split('\n')[1]).toContain('0 failed');
                  done();
                });
          });
        });
  });
});
