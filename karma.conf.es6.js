import * as path from 'path';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

let webpackConfig = commonConfig('production').es2015plus;
delete webpackConfig.entry;

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
          path.resolve('src/components/'),
          path.resolve('src/js/')
        ]
      }
    ],
  }
});

export default function (config) {
  config.set({
    basePath: 'src',

    frameworks: ['mocha', 'chai'],

    files: ['tests/**/*.spec.js'],

    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
    },

    plugins: [
      'karma-chrome-launcher',
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

    reporters: ['progress', 'mocha', 'coverage-istanbul'],

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

    browsers: ['Chrome'],

    singleRun: process.env.KARMA_SINGLE_RUN !== 'false',
  });
}
