#!/bin/bash
#
# Script to install dependencies and bootstrap protractor to run all Closure
# tests.

HTTP_PORT=8080

# Make sure to kill both servers on exit (e.g., CTRL+C).
trap 'fuser -k $HTTP_PORT/tcp' EXIT

# Start web server, with POST support.
python scripts/http/simple_http_server.py 2> /dev/null & sleep 5

./scripts/ci/sauce_connect.sh

# Invoke protractor to run tests.
./node_modules/.bin/protractor protractor.conf.js
