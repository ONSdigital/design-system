import merge from 'webpack-merge';

import commonConfig from './webpack.common';

const mode = 'production';
const common = commonConfig(mode);

export default [
  merge(common.nonJs, {}),
  merge(common.es2015plus, {}),
  merge(common.es5, {})
];
