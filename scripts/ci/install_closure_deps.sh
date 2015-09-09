#!/bin/bash
#
# Script to install all necessary dependencies for running Closure tests,
# linting, and compiling.

set -ex

# Install closure compiler and linter.
cd ..
git clone --depth 1 https://github.com/google/closure-compiler.git
git clone --depth 1 https://github.com/google/closure-linter.git
cd closure-compiler
ant jar
cd ../closure-linter
python ./setup.py install --user
cd ../closure-library

# Installs node "devDependencies" found in package.json.
npm install

# Install Selenium.
./node_modules/protractor/bin/webdriver-manager update
