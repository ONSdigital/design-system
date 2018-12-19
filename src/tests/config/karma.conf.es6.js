import karmaConfigGenerator from './karma.conf.common';
import commonConfig from '../../../webpack.common';
import browserstackLaunchersConfig from './karma.conf.browserstack-es6-launchers.js';

const webpackConfig = commonConfig(process.env.NODE_ENV || 'production').es2015plus;

export default karmaConfigGenerator(webpackConfig, browserstackLaunchersConfig);
