#!/bin/bash
#
# Script to install dependencies and bootstrap protractor to run all Closure
# tests.

# Disable testing on Sauce for PRs. Due to:
# http://docs.travis-ci.com/user/pull-requests/#Security-Restrictions-when-testing-Pull-Requests.
# TODO(joeltine): Remove or re-enable when we figure out how we want to run
# our tests.
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
  exit 0
fi

HTTP_PORT=8080

# Make sure to kill both servers on exit (e.g., CTRL+C).
trap 'fuser -k $HTTP_PORT/tcp' EXIT

# Start web server, with POST support.
python scripts/http/simple_http_server.py 2> /dev/null & sleep 5

# Invoke protractor to run tests.
./node_modules/.bin/protractor protractor.conf.js
