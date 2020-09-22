import * as path from 'path';
import merge from 'webpack-merge';
import { HotModuleReplacementPlugin } from 'webpack';
import RewireMockWebpackPlugin from 'rewiremock/webpack/plugin';
import localLauncherConfig from './karma.conf.local-launchers';

export default function karmaConfigGenerator(webpackConfig, browserstackLaunchersConfig) {
  delete webpackConfig.entry;
  delete webpackConfig.context;
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
            esModules: true,
          },
          include: [path.resolve('./src/components/'), path.resolve('./src/js/')],
          exclude: [path.resolve('./src/js/polyfills')],
        },
      ],
    },

    plugins: [new HotModuleReplacementPlugin(), new RewireMockWebpackPlugin()],
  });

  return function(config) {
    config.set({
      frameworks: ['mocha', 'chai-spies', 'chai'],

      files: ['../../js/polyfills/index.js', '../../tests/**/*.spec.js'],

      preprocessors: {
        '../../js/polyfills/index.js': ['webpack'],
        '../../tests/**/*.spec.js': ['webpack'],
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
        'karma-chai-spies',
      ],

      webpack: webpackConfig,

      client: {
        clearContext: false,
        captureConsole: !process.env['RUNNING_ON_TRAVIS'],
      },

      coverageIstanbulReporter: {
        reports: ['text', 'lcovonly'],
        fixWebpackSourcePaths: true,
        combineBrowserReports: true,
        dir: 'coverage',
        // skipFilesWithNoCoverage: true,
      },

      reporters: ['dots', 'mocha', 'coverage-istanbul', 'BrowserStack'],

      mochaReporter: {
        output: 'full',
        symbols: {
          success: '✅ ',
          error: '❌ ',
          warning: '⚠️ ',
          info: 'ℹ️ ',
        },
      },

      port: 9876,

      colors: true,

      logLevel: config.LOG_INFO,

      autoWatch: true,

      customLaunchers: {
        ...(runOnBrowserstack ? browserstackLaunchers : localLaunchers),
      },

      browsers: [...(runOnBrowserstack ? browserstackBrowsers : localBrowsers)],

      browserStack: {
        startTunnel: 'true',
        name: 'Karma unit tests',
        project: 'ONS - design-system',
        forcelocal: true,
        username: process.env.BROWSER_STACK_USERNAME,
        accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
      },
      singleRun: process.env.KARMA_SINGLE_RUN !== 'false',
    });
  };
}
