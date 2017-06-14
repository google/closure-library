#!/bin/bash
#
# Script to install all necessary dependencies for running Closure tests,
# linting, formatting and compiling.

declare -r CLANG_VERSION="3.7.1"
declare -r CLANG_BUILD="clang+llvm-${CLANG_VERSION}-x86_64-linux-gnu-ubuntu-14.04"
declare -r CLANG_TAR="${CLANG_BUILD}.tar.xz"
declare -r CLANG_URL="http://llvm.org/releases/${CLANG_VERSION}/${CLANG_TAR}"
declare -r CLOSURE_COMPILER_REPO="https://oss.sonatype.org/content/repositories/snapshots/com/google/javascript/closure-compiler/1.0-SNAPSHOT/"

set -ex

cd ..

# Install clang-format.
wget --quiet $CLANG_URL
tar xf $CLANG_TAR
mv $CLANG_BUILD clang
rm -f $CLANG_TAR

# Install closure compiler and linter.
CLOSURE_URL=$(
  curl -o - "$CLOSURE_COMPILER_REPO" |
    sed -n 's+.*<a href="\('"$CLOSURE_COMPILER_REPO"'closure-compiler-[-.0-9]*\.jar\)".*+\1+p' |
    head -n 1)
[ -n $CLOSURE_URL ]
wget -O closure-compiler-1.0-SNAPSHOT.jar "$CLOSURE_URL"

cd closure-library

# Installs node "devDependencies" found in package.json.
npm install

# Install Selenium.
./node_modules/protractor/bin/webdriver-manager update
