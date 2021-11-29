#!/usr/bin/env node

process.kill(parseInt(process.argv[2]), 'SIGINT');
