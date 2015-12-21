#!/bin/bash
#
# Script to determine if .js files in Pull Request are properly formatted.
# Exits with non 0 exit code if formatting is needed.

set -e

FORMAT_DIFF=$(git diff -U0 HEAD^ |
              ../clang/share/clang/clang-format-diff.py -p1 -style=Google)

if [ -z "${FORMAT_DIFF}" ]; then
  # No formatting necessary.
  echo "All files in PR properly formatted."
  exit 0
else
  # Found diffs.
  echo "ERROR: Found formatting errors!"
  echo "${FORMAT_DIFF}"
  echo "See https://goo.gl/wUEkW9 for instructions to format your PR."
  exit 1
fi
