#!/bin/bash

# Rebuild gh-pages branch, adapted from
# https://github.com/google/dagger/blob/master/util/generate-latest-docs.sh
# See also http://stackoverflow.com/a/22977235 for ssh-based deploy.

if [ "$TRAVIS_REPO_SLUG" != "google/closure-library" -o \
     "$TRAVIS_PULL_REQUEST" != "false" -o \
     "$TRAVIS_BRANCH" != "master" ]; then
  exit 0
fi

echo "Publishing documentation..."

DIR=$(mktemp -d)
mkdir -p "$DIR"

# Do everything in a subshell so that we can cleanup afterwards.
(
  set -e

  # Files to omit from documentation
  BLACKLIST_FILES=(
    events/eventtargettester.js
    i18n/compactnumberformatsymbolsext.js
    i18n/datetimepatternsext.js
    i18n/listsymbolsext.js
    i18n/numberformatsymbolsext.js
    promise/testsuiteadapter.js
    proto2/package_test.pb.js
    proto2/test.pb.js
    soy/soy_testhelper.js
    style/stylescrollbartester.js
    testing/parallel_closure_test_suite.js
    test_module.js
    test_module_dep.js
    tweak/testhelpers.js
    useragent/useragenttestutil.js
  )
  declare -A BLACKLIST
  for file in "${BLACKLIST_FILES[@]}"; do
     BLACKLIST["$file"]=true
  done

  # Start by decrypting the deploy password, and pre-populate GitHub's
  # RSA key to avoid needing to manually accept it when connecting.
  touch ./scripts/ci/deploy
  chmod 600 ./scripts/ci/deploy
  openssl aes-256-cbc -k "$deploy_password" -d -a \
          -in ./scripts/ci/deploy.enc -out ./scripts/ci/deploy \
          &> /dev/null
  echo -e "Host github.com\n  IdentityFile $PWD/scripts/ci/deploy" > ~/.ssh/config
  echo "github.com ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6Tb
        Qa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsd
        lLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+S
        e8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOz
        QgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA
        8VJiS5ap43JXiUFFAaQ==" | sed 's/^ *//' | tr -d '\n' > ~/.ssh/known_hosts

  (
    # Wipe out any existing documentation entirely.
    cd "$DIR"
    git init
    git remote add origin git@github.com:google/closure-library.git
    git pull origin gh-pages > /dev/null
    git config user.email "travis@travis-ci.org"
    git config user.name "travis-ci"
    find . -path ./.git -prune -o -exec rm -rf {} \; 2> /dev/null || true
  )

  # Rearrange files from the repo.
  cp -r doc/* "$DIR/"
  mkdir -p "$DIR/source/closure"
  cp -r closure/* "$DIR/source/closure/"
  mkdir -p "$DIR/api"

  # Download the latest js-dossier release.
  npm install js-dossier

  # Build up the dossier command line.
  command=(
    java -jar node_modules/js-dossier/dossier.jar
    --output "$DIR/api"
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

  (
    # Make a commit and push it.
    cd "$DIR"
    git add -A
    git commit -m "Latest documentation auto-pushed to gh-pages

Built from commit $TRAVIS_COMMIT after successful travis build $TRAVIS_BUILD_NUMBER"
    git push -fq origin gh-pages > /dev/null
  )

  echo -e "Published gh-pages.\n";
)
CODE=$?

# Clean up by deleting the repository and the decrypted key
rm -rf "$DIR"
rm -f ./scripts/ci/deploy
exit "$CODE"
