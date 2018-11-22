import * as path from 'path';
import merge from 'webpack-merge';
import LiveReloadPlugin from 'webpack-livereload-plugin';

import commonConfig from './webpack.common';

const mode = 'development';

export default merge(commonConfig(mode), {
  mode,

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: false,
    port: 3000
  },

  plugins: [new LiveReloadPlugin()]
});
