#!/bin/sh

# Copyright The Closure Library Authors.
# SPDX-License-Identifier: Apache-2.0

# Run tests for closure-deps.

set -ex
cd "${KOKORO_ARTIFACTS_DIR}/git/closure-library-staging/closure-deps"

npm install
npm test
