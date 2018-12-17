import karmaConfigGenerator from './karma.conf.common';
import commonConfig from '../../../webpack.common';
import browserstackLaunchersConfig from './karma.conf.browserstack-es5-launchers.js';

const webpackConfig = commonConfig('production').es5;

export default karmaConfigGenerator(webpackConfig, browserstackLaunchersConfig);
