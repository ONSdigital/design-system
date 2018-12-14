import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import commonConfig from './webpack.common';

const common = commonConfig('production');

export default [
  merge(common.nonJs, {}),
  merge(common.es2015plus, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        generateStatsFile: true,
        statsFilename: 'es6.stats.json',
        reportFilename: 'es6.stats.html',
        openAnalyzer: process.env.NODE_ENV === 'development',
        excludeAssets: /patternlib.js/
      })
    ]
  }),
  merge(common.es5, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        generateStatsFile: true,
        statsFilename: 'es5.stats.json',
        reportFilename: 'es5.stats.html',
        openAnalyzer: process.env.NODE_ENV === 'development',
        excludeAssets: /patternlib.es5.js/
      })
    ]
  })
];
