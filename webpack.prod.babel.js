import merge from 'webpack-merge';

import commonConfig from './webpack.common';

const mode = 'production';

export default merge(commonConfig(mode), {
  mode
});
