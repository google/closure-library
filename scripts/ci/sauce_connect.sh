#!/bin/bash

set -e -o pipefail

# Setup and start Sauce Connect for your TravisCI build
CONNECT_URL="https://saucelabs.com/downloads/sc-4.3.12-linux.tar.gz"
CONNECT_DIR="/tmp/sauce-connect-$RANDOM"
CONNECT_DOWNLOAD="sc-latest-linux.tar.gz"

BROWSER_PROVIDER_READY_FILE="/tmp/sauce-connect-ready"
CONNECT_LOG="/tmp/sauce-connect"
CONNECT_STDOUT="/tmp/sauce-connect.stdout"
CONNECT_STDERR="/tmp/sauce-connect.stderr"

# Get Connect and start it
mkdir -p $CONNECT_DIR
cd $CONNECT_DIR
curl $CONNECT_URL -o $CONNECT_DOWNLOAD 2> /dev/null 1> /dev/null
mkdir sauce-connect
tar --extract --file=$CONNECT_DOWNLOAD --strip-components=1 --directory=sauce-connect > /dev/null
rm $CONNECT_DOWNLOAD

SAUCE_ACCESS_KEY=`echo $SAUCE_ACCESS_KEY | rev`

ARGS=""

# Set tunnel-id only on Travis, to make local testing easier.
if [ ! -z "$TRAVIS_JOB_NUMBER" ]; then
  ARGS="$ARGS --tunnel-identifier $TRAVIS_JOB_NUMBER"
fi
if [ ! -z "$BROWSER_PROVIDER_READY_FILE" ]; then
  ARGS="$ARGS --readyfile $BROWSER_PROVIDER_READY_FILE"
fi


echo "Starting Sauce Connect in the background, logging into:"
echo "  $CONNECT_LOG"
echo "  $CONNECT_STDOUT"
echo "  $CONNECT_STDERR"
# -B java.com helps to disable Java update popups in IE.
sauce-connect/bin/sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY $ARGS \
  --logfile $CONNECT_LOG -B java.com &

# Wait for Connect to be ready before exiting
printf "Connecting to Sauce."
while [ ! -f $BROWSER_PROVIDER_READY_FILE ]; do
  printf "."
  sleep .5
done
echo "Connected"
