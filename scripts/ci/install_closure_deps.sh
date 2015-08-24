#!/bin/bash

# Install closure compiler and linter.
cd ..
git clone --depth 1 https://github.com/google/closure-compiler.git
git clone --depth 1 https://github.com/google/closure-linter.git
cd closure-compiler
ant jar
cd ../closure-linter
python ./setup.py install --user
cd ../closure-library
