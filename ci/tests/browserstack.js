#!/usr/bin/env node

let WORKER_ID = 0;
let BrowserStack = require('browserstack');

let client = BrowserStack.createClient({
  username: process.env.BROWSER_STACK_USERNAME,
  password: process.env.BROWSER_STACK_ACCESS_KEY,
});

'SIGINT SIGTERM SIGHUP'.split(' ').forEach(function(evt) {
  process.on(evt, function() {
    console.log('Closed BrowserStack Worker process ' + evt);
    if (client !== null) {
      client.terminateWorker(WORKER_ID, function() {
        process.exit();
      });
    }
  });
});

let settings = {
  os: process.argv[2],
  os_version: process.argv[3],
  browser: process.argv[4],
  browser_version: process.argv[5],
  device: process.argv[6],
  url: process.argv[7],

  'browserstack.local': true,
  name: WORKER_ID,
  build: 'Testem Tests',
};

for (let i in settings) {
  if (settings[i] === null || settings[i] === '' || settings[i] === 'nil') {
    delete settings[i];
  }
}

client.createWorker(settings, function(error, worker) {
  if (error) console.log(error);
  WORKER_ID = worker.id;
});

setTimeout(function() {
  client.terminateWorker(WORKER_ID);
}, 600000);
