import * as path from 'path';
import merge from 'webpack-merge';
import LiveReloadPlugin from 'webpack-livereload-plugin';

import commonConfig from './webpack.common';

const mode = 'development';
const common = commonConfig(mode);

const serverSettings = {
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: false,
    port: 3000
  },

  plugins: [new LiveReloadPlugin()]
};

export default [
  merge(common.nonJs, serverSettings),
  merge(common.es2015plus, serverSettings),
  merge(common.es5, serverSettings)
];
