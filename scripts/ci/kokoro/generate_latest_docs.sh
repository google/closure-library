#!/bin/sh

# Copyright The Closure Library Authors.
# SPDX-License-Identifier: Apache-2.0

# Generate docs (without pushing them anywhere).

set -ex
cd "${KOKORO_ARTIFACTS_DIR}/git/closure-library-staging"

export GH_PAGES=$(mktemp -d)

git clone --depth=1 https://github.com/google/closure-library $GH_PAGES
./scripts/ci/generate_latest_docs.sh
