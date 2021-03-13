#!/bin/sh

# Copyright The Closure Library Authors.
# SPDX-License-Identifier: Apache-2.0

# Compile Closure Library with the external compiler.

set -ex
cd "${KOKORO_ARTIFACTS_DIR}/git/closure-library-staging"

./scripts/ci/install_closure_deps.sh
./scripts/ci/compile_closure.sh

# Generate docs (without pushing them anywhere).

export GH_PAGES=$(mktemp -d)

git clone --depth=1 https://github.com/google/closure-library $GH_PAGES
./scripts/ci/generate_latest_docs.sh

# Install Node 14.
# TODO: Use an image that contains it instead.

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install v14

# Ensure that all generated files are generate without error.

npm install
npm run gen_deps_js
npm run gen_deps_js_with_tests
npm run gen_test_htmls
npm run gen_alltests_js

# Run tests for closure-deps.

cd closure-deps
npm install
npm test
