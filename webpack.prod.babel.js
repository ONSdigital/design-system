import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';

import commonConfig from './webpack.common';

const common = commonConfig('production');

const optimizationConfig = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};

export default [
  merge(common.assets, {}),
  merge(common.patternLibAssets, {}),
  merge(common.templates, {}),
  merge(
    common.es2015plus,
    {
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          defaultSizes: 'gzip',
          generateStatsFile: true,
          statsFilename: 'es6.stats.json',
          reportFilename: 'es6.stats.html',
          openAnalyzer: process.env.NODE_ENV === 'development',
          excludeAssets: /patternlib.js/,
        }),
      ],
    },
    optimizationConfig,
  ),
  merge(
    common.es5,
    {
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          defaultSizes: 'gzip',
          generateStatsFile: true,
          statsFilename: 'es5.stats.json',
          reportFilename: 'es5.stats.html',
          openAnalyzer: process.env.NODE_ENV === 'development',
          excludeAssets: /patternlib.es5.js/,
        }),
      ],
    },
    optimizationConfig,
  ),
  merge(common.es2015plusPatternLib, {}),
  merge(common.es5PatternLib, {}),
];
