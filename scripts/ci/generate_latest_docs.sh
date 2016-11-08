#!/bin/bash

# Rebuild gh-pages branch, adapted from
# https://github.com/google/dagger/blob/master/util/generate-latest-docs.sh

DIR=$(mktemp -d)
mkdir -p "$DIR"

if [ "$TRAVIS_REPO_SLUG" = "google/closure-library" -a \
     "$TRAVIS_PULL_REQUEST" = "false" -a \
     "$TRAVIS_BRANCH" = "master" ]; then
  echo -e "Publishing documentation...\n"

  # Files to omit from documentation
  declare -A BLACKLIST
  BLACKLIST['events/eventtargettester.js']=true
  BLACKLIST['i18n/compactnumberformatsymbolsext.js']=true
  BLACKLIST['i18n/datetimepatternsext.js']=true
  BLACKLIST['i18n/numberformatsymbolsext.js']=true
  BLACKLIST['i18n/listsymbolsext.js']=true
  BLACKLIST['promise/testsuiteadapter.js']=true
  BLACKLIST['proto2/package_test.pb.js']=true
  BLACKLIST['proto2/test.pb.js']=true
  BLACKLIST['soy/soy_testhelper.js']=true
  BLACKLIST['style/stylescrollbartester.js']=true
  BLACKLIST['testing/parallel_closure_test_suite.js']=true
  BLACKLIST['test_module.js']=true
  BLACKLIST['test_module_dep.js']=true
  BLACKLIST['tweak/testhelpers.js']=true
  BLACKLIST['useragent/useragenttestutil.js']=true

  (
    # Wipe out any existing documentation entirely.
    cd "$DIR"
    git clone --quiet --branch=gh-pages \
        "https://${GH_TOKEN}@github.com/google/closure-library gh-pages" > /dev/null
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "travis-ci"
    cd gh-pages
    find . -path ./.git -prune -o -exec rm -rf {} \; 2> /dev/null || true
  )

  # Rearrange files from the repo.
  cp -r doc/* "$DIR/gh-pages/"
  mkdir -p "$DIR/gh-pages/source/closure"
  cp -r closure/* "$DIR/gh-pages/source/closure/"
  mkdir -p "$DIR/gh-pages/api"

  # Download the latest js-dossier release.
  npm install js-dossier

  # Build up the dossier command line.
  command=(
    java -jar node_modules/js-dossier/dossier.jar
    --output "$DIR/gh-pages/api"
    --readme scripts/ci/dossier_readme.md
    --source_url_template
        'https://github.com/google/closure-library/blob/master/%path%#L%line%'
    --type_filter '^goog\.i18n\.\w+_.*'
    --type_filter '^goog\.labs\.i18n\.\w+_.*'
    --type_filter '^.*+_$'
  )

  while read -r file; do
    file=${file#./}
    if [[ "$file" =~ ^closure/goog/demos ]]; then continue; fi
    if [[ "$file" =~ _test\.js$ || "$file" =~ _perf\.js$ ]]; then continue; fi
    if [[ "${BLACKLIST[${file#closure/goog/}]}" == true ]]; then continue; fi
    if [[ "$file" =~ ^closure/goog || "$file" =~ ^third_party/closure/goog ]]; then
      command=("${command[@]}" --source "$file")
    fi
  done < <(find . -name '*.js')

  # Run dossier.
  "${command[@]}"

  # Make a commit and push it.
  (
    cd "$DIR/gh-pages"
    git add -A
    git commit -m "Latest documentation auto-pushed to gh-pages

Built from commit $TRAVIS_COMMIT after successful travis build $TRAVIS_BUILD_NUMBER"
    git push -fq origin gh-pages > /dev/null
  )

  echo -e "Published gh-pages.\n";
fi
