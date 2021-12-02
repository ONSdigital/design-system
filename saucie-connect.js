#!/usr/bin/env node

let saucie = require('saucie');
let pidFile = 'sc_client.pid';

let opts = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  verbose: true,
  logger: console.log,
  pidfile: pidFile,
};

saucie.connect(opts).then(function() {
  process.exit();
});
