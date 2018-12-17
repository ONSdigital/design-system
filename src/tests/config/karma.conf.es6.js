import karmaConfigGenerator from './karma.conf.common';
import commonConfig from '../../../webpack.common';
import browserstackLaunchersConfig from './karma.conf.browserstack-es6-launchers.js';

const webpackConfig = commonConfig('production').es2015plus;

export default karmaConfigGenerator(webpackConfig, browserstackLaunchersConfig);
