#!/bin/sh

# Copyright The Closure Library Authors.
# SPDX-License-Identifier: Apache-2.0

# Compile Closure Library with the external compiler.

set -ex
cd "${KOKORO_ARTIFACTS_DIR}/git/closure-library-staging"

./scripts/ci/install_closure_deps.sh
./scripts/ci/compile_closure.sh
