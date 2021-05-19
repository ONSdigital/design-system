#!/bin/bash
node ./lighthouse/lighthouse-get-pages.js
npx http-server -p 9000 ./build &
npm install -g @lhci/cli@0.7.x
lhci healthcheck --fatal

for url in $(jq '.urls[]' ./lighthouse/urls.json); do
    lhci collect "--url=$url" --additive --config=./lighthouse/lighthouserc.js
done
EXIT_CODE=$?

kill $!
exit $EXIT_CODE
