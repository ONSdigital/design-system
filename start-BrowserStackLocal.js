#!/usr/bin/env node

let BrowserStackTunnel = require('browserstacktunnel-wrapper');
let pidFile = 'browserStackLocal.pid';
let fs = require('fs');

let browserStackTunnel = new BrowserStackTunnel({
  key: process.env.BROWSER_STACK_ACCESS_KEY,
  v: true,
});

process.on('SIGINT', function() {
  if (browserStackTunnel !== null) {
    browserStackTunnel.stop(function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log('BrowserStackLocal disconnected');
        process.exit();
      }
    });
  }
});

fs.writeFileSync(pidFile, '' + process.pid, { encoding: 'utf8' });

browserStackTunnel.start(function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Tunnel started');
  }
});
