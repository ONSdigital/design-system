#!/bin/bash
node ./lighthouse/lighthouse-get-urls.js
npx http-server -p 9000 ./build &
npm install -g @lhci/cli@0.7.x
lhci healthcheck --fatal
for url in $(jq '.urls[]' ./lighthouse/urls.json); do sem
    lhci collect "--url=$url" --additive --config=./lighthouse/lighthouserc.js &
done    
sem --wait
lhci assert --config=./lighthouse/lighthouserc.js
lhci upload --config=./lighthouse/lighthouserc.js
EXIT_CODE=$?
kill $!
exit $EXIT_CODE
