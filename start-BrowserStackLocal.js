#!/usr/bin/env node

if (process.argv[2]) {
  console.log('THIS');
  process.kill(parseInt(process.argv[2]), 'SIGINT');
  process.exit(0);
}

let browserstack = require('browserstack-local');
let fs = require('fs');

let pidFile = 'browserstack-local.pid';
let bs_local = new browserstack.Local();
let bs_local_args = {
  key: process.env.BROWSER_STACK_ACCESS_KEY,
  forcelocal: true,
  v: true,
};

process.on('SIGINT', function() {
  if (bs_local !== null) {
    bs_local.stop(function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log('BrowserStackLocal Disconnected');
        process.exit();
      }
    });
  }
});

fs.writeFileSync(pidFile, '' + process.pid, { encoding: 'utf8' });

bs_local.start(bs_local_args, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Tunnel Started');
  }
});
