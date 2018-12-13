import * as path from 'path';
import merge from 'webpack-merge';
import localLauncherConfig from './karma.conf.local-launchers';

export default function karmaConfigGenerator(webpackConfig, browserstackLaunchersConfig) {
  delete webpackConfig.entry;
  const isRunningOnTravis = process.env['RUNNING_ON_TRAVIS'];

  const {
    customLaunchers: localLaunchers,
    browsers: localBrowsers
  } = localLauncherConfig();

  const {
    customLaunchers: browserstackLaunchers,
    browsers: browserstackBrowsers
  } = browserstackLaunchersConfig();

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
          include: [
            path.resolve('./src/components/'),
            path.resolve('./src/js/')
          ]
        }
      ],
    }
  });

  return function (config) {
    config.set({
      basePath: path.resolve('./src'),

      frameworks: ['mocha', 'chai'],

      files: ['tests/**/*.spec.js', 'js/polyfills.js'],

      preprocessors: {
        'tests/**/*.spec.js': ['webpack'],
      },

      plugins: [
        'karma-chrome-launcher',
        'karma-browserstack-launcher',
        'karma-firefox-launcher',
        'karma-coverage-istanbul-reporter',
        'karma-webpack',
        'karma-mocha',
        'karma-mocha-reporter',
        'karma-chai',
      ],

      webpack: webpackConfig,

      client: {
        clearContext: false
      },

      coverageIstanbulReporter: {
        reports: ['text'],
        fixWebpackSourcePaths: true,
        combineBrowserReports: true,
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
        ...(isRunningOnTravis ? browserstackLaunchers : localLaunchers)
      },

      browsers: [
        ...(isRunningOnTravis ? browserstackBrowsers : localBrowsers)
      ],

      browserStack: {
        startTunnel: 'true',
        name: 'Karma unit tests',
        project: 'ONS - pattern-library',
        forcelocal: true
      },

      singleRun: process.env.KARMA_SINGLE_RUN !== 'false',
    });
  };
}
