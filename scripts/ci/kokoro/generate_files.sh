#!/bin/sh

# Copyright The Closure Library Authors.
# SPDX-License-Identifier: Apache-2.0

# Ensure that all generated files are generate without error.

set -ex
cd "${KOKORO_ARTIFACTS_DIR}/git/closure-library-staging"

npm install
npm run gen_deps_js
npm run gen_deps_js_with_tests
npm run gen_test_htmls
npm run gen_alltests_js