import * as path from 'path';
import merge from 'webpack-merge';
import localLauncherConfig from './karma.conf.local-launchers';

export default function karmaConfigGenerator(webpackConfig, browserstackLaunchersConfig) {
  delete webpackConfig.entry;
  const runOnBrowserstack = process.env['TEST_ON_BROWSERSTACK'];

  const { customLaunchers: localLaunchers, browsers: localBrowsers } = localLauncherConfig();

  const { customLaunchers: browserstackLaunchers, browsers: browserstackBrowsers } = browserstackLaunchersConfig();

  webpackConfig = merge(webpackConfig, {
    module: {
      rules: [
        // instrument only testing sources with Istanbul
        {
          test: /\.js$/,
          loader: 'istanbul-instrumenter-loader',
          query: {
            esModules: true
          },
          include: [path.resolve('./src/components/'), path.resolve('./src/js/')],
          exclude: [path.resolve('./src/js/polyfills')]
        }
      ]
    }
  });

  return function(config) {
    config.set({
      basePath: path.resolve('./src'),

      frameworks: ['mocha', 'chai'],

      files: ['js/polyfills/index.js', 'tests/**/*.spec.js'],

      preprocessors: {
        'js/polyfills/index.js': ['webpack'],
        'tests/**/*.spec.js': ['webpack']
      },

      plugins: [
        'karma-chrome-launcher',
        'karma-browserstack-launcher',
        'karma-firefox-launcher',
        'karma-coverage-istanbul-reporter',
        'karma-webpack',
        'karma-mocha',
        'karma-mocha-reporter',
        'karma-chai'
      ],

      webpack: webpackConfig,

      client: {
        clearContext: false
      },

      coverageIstanbulReporter: {
        reports: ['text', 'lcovonly'],
        fixWebpackSourcePaths: true,
        combineBrowserReports: true,
        dir: 'coverage'
        // skipFilesWithNoCoverage: true,
      },

      reporters: ['progress', 'mocha', 'coverage-istanbul', 'BrowserStack'],

      mochaReporter: {
        output: 'full',
        symbols: {
          success: '✅ ',
          error: '❌ ',
          warning: '⚠️ ',
          info: 'ℹ️ '
        }
      },

      port: 9876,

      colors: true,

      logLevel: config.LOG_INFO,

      autoWatch: true,

      customLaunchers: {
        ...(runOnBrowserstack ? browserstackLaunchers : localLaunchers)
      },

      browsers: [...(runOnBrowserstack ? browserstackBrowsers : localBrowsers)],

      browserStack: {
        startTunnel: 'true',
        name: 'Karma unit tests',
        project: 'ONS - pattern-library',
        forcelocal: true
      },

      singleRun: process.env.KARMA_SINGLE_RUN !== 'false'
    });
  };
}
