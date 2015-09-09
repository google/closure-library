#!/bin/bash
#
# Compiles pertinent Closure library files.

java -jar ../closure-compiler/build/compiler.jar \
  -O ADVANCED \
  --warning_level VERBOSE \
  --jscomp_error='*' \
  --jscomp_off=inferredConstCheck \
  --jscomp_off=extraRequire \
  --jscomp_off=unnecessaryCasts \
  --jscomp_off=deprecated \
  --jscomp_off=lintChecks \
  --js='**.js' \
  --js='!**_test.js' \
  --js='!**_perf.js' \
  --js='!**tester.js' \
  --js='!**promise/testsuiteadapter.js' \
  --js='!**osapi/osapi.js' \
  --js='!**svgpan/svgpan.js' \
  --js='!**alltests.js' \
  --js_output_file=$(mktemp);
