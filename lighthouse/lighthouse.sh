#!/bin/bash
#!/bin/bash

# Run the URL generation script
node ./lighthouse/lighthouse-get-urls.js

# Start the HTTP server in the background and capture its PID
npx http-server -p 9000 ./build > http-server.log 2>&1 &
HTTP_SERVER_PID=$!

# Wait a bit to ensure the server is fully up
sleep 2

# Install the necessary Lighthouse CI CLI globally
npm install -g @lhci/cli@0.12.x

# Perform a health check with Lighthouse CI
lhci healthcheck --fatal || { echo "Healthcheck failed"; exit 1; }

# Collect data for each URL
for url in $(jq -r '.urls[]' ./lighthouse/urls.json); do
    lhci collect "--url=$url" --additive --config=./lighthouse/lighthouserc.js &
done

# Wait for all background lhci collect processes to finish
wait

# Assert the collected data
lhci assert --config=./lighthouse/lighthouserc.js || { echo "Assertion failed"; exit 1; }

# Upload the results
lhci upload --config=./lighthouse/lighthouserc.js || { echo "Upload failed"; exit 1; }

# Capture the exit code of the last command
EXIT_CODE=$?

# Kill the HTTP server
kill $HTTP_SERVER_PID

# Exit with the captured exit code
exit $EXIT_CODE

