import assert from 'assert';
import nodeSassGlobImporter from 'node-sass-glob-importer';
import proxyquireify from 'proxyquireify';

import babelEsmConfig from './babel.conf.esm';
import babelNomoduleConfig from './babel.conf.nomodule';
import localLaunchersConfig from './karma.conf.launchers-local.js';
import saucelabsEsmLaunchersConfig from './karma.conf.launchers-saucelabs-esm.js';
import saucelabsNomoduleLaunchersConfig from './karma.conf.launchers-saucelabs-nomodule.js';

assert(['esm', 'nomodule'].includes(process.env.TEST_MODE), 'Invalid value for environment variable `TEST_MODE`.');

const babelConfig = process.env.TEST_MODE === 'esm' ? babelEsmConfig : babelNomoduleConfig;

babelConfig.sourceMapsAbsolute = true;
babelConfig.plugins.push('istanbul');

const launchersConfig = process.env.TEST_ON_SAUCELABS
  ? process.env.TEST_MODE === 'esm'
    ? saucelabsEsmLaunchersConfig
    : saucelabsNomoduleLaunchersConfig
  : localLaunchersConfig;

export default function(config) {
  config.set({
    client: {
      mocha: {
        timeout: 10000, // 10 seconds for slow IE11 execution.
      },
      captureConsole: !process.env['RUNNING_ON_CI'],
    },

    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 60000,

    frameworks: ['browserify', 'mocha', 'chai-spies', 'chai'],

    files: [
      { pattern: 'src/components/**/*.njk', included: false },
      'src/scss/main.scss',
      'src/js/public-path-override.js',
      { pattern: 'src/js/polyfills.js', included: process.env.TEST_MODE === 'nomodule' },
      'src/tests/spec/**/*.spec.js',
    ],

    exclude: [],

    preprocessors: {
      'src/scss/main.scss': ['scss'],
      'src/**/*.js': ['browserify'],
    },

    scssPreprocessor: {
      options: {
        sourceMap: true,
        importer: nodeSassGlobImporter(),
        includePaths: ['./node_modules/normalize-scss/sass', './mode_modules/prismjs/themes'],
      },
    },

    browserify: {
      debug: true,
      plugin: [proxyquireify.plugin],
      transform: [['babelify', babelConfig]],
    },

    reporters: ['dots', 'progress', 'mocha', 'coverage-istanbul', 'saucelabs'],

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

    sauceLabs: {
      name: 'Karma unit tests',
      project: 'ONS - design-system',
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      region: 'eu',
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: process.env.KARMA_SINGLE_RUN !== 'false',
    concurrency: Infinity,
  });
}
