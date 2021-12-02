#!/usr/bin/env node

let saucie = require('saucie');
let pidFile = 'sc_client.pid';

saucie.disconnect(pidFile);
