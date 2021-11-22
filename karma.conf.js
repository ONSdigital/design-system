import assert from 'assert';
import proxyquireify from 'proxyquireify';

import babelEsmConfig from './babel.conf.esm';
import babelNomoduleConfig from './babel.conf.nomodule';
import browserstackEsmLaunchersConfig from './karma.conf.launchers-browserstack-esm.js';
import browserstackNomoduleLaunchersConfig from './karma.conf.launchers-browserstack-nomodule.js';
import localLaunchersConfig from './karma.conf.launchers-local.js';

assert(['esm', 'nomodule'].includes(process.env.TEST_MODE), 'Invalid value for environment variable `TEST_MODE`.');

const babelConfig = process.env.TEST_MODE === 'esm' ? babelEsmConfig : babelNomoduleConfig;

babelConfig.sourceMapsAbsolute = true;
babelConfig.plugins.push('istanbul');

const launchersConfig = process.env.TEST_ON_BROWSERSTACK
  ? process.env.TEST_MODE === 'esm'
    ? browserstackEsmLaunchersConfig
    : browserstackNomoduleLaunchersConfig
  : localLaunchersConfig;

export default function(config) {
  config.set({
    client: {
      mocha: {
        timeout: 10000, // 10 seconds for slow IE11 execution.
      },
      captureConsole: !process.env['RUNNING_ON_CI'],
    },

    browserDisconnectTimeout: 10000,
    browserNoActivityTimeout: 20000,
    concurrency: 1,

    frameworks: ['browserify', 'mocha', 'chai-spies', 'chai'],

    files: [
      { pattern: 'src/components/**/*.njk', included: false },
      { pattern: 'src/static/fonts/*', included: false },
      'build/css/main.css',
      { pattern: 'src/js/polyfills.js', included: process.env.TEST_MODE === 'nomodule' },
      'src/tests/spec/**/*.spec.js',
    ],

    exclude: [],

    proxies: {
      '/base/src/fonts/': '/base/src/static/fonts/',
    },

    preprocessors: {
      'src/**/*.js': ['browserify'],
    },

    browserify: {
      debug: true,
      plugin: [proxyquireify.plugin],
      transform: [['babelify', babelConfig]],
    },

    reporters: ['dots', 'progress', 'mocha', 'coverage-istanbul', 'BrowserStack'],

    mochaReporter: {
      output: 'full',
      symbols: {
        success: '✅ ',
        error: '❌ ',
        warning: '⚠️ ',
        info: 'ℹ️ ',
      },
    },

    coverageIstanbulReporter: {
      reports: ['text', 'lcovonly'],
      fixWebpackSourcePaths: true,
      combineBrowserReports: true,
      dir: 'coverage',
      // skipFilesWithNoCoverage: true,
    },

    browsers: launchersConfig.browsers,
    customLaunchers: launchersConfig.customLaunchers,

    browserStack: {
      startTunnel: 'true',
      name: 'Karma unit tests',
      project: 'ONS - design-system',
      forcelocal: true,
      username: process.env.BROWSER_STACK_USERNAME,
      accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
      timeout: 1800,
      console: true,
      localIdentifier: 'random',
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: process.env.KARMA_SINGLE_RUN !== 'false',
  });
}
