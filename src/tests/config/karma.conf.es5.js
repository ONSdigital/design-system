import karmaConfigGenerator from './karma.conf.common';
import commonConfig from '../../../webpack.common';
import browserstackLaunchersConfig from './karma.conf.browserstack-es5-launchers.js';

const webpackConfig = commonConfig(process.env.NODE_ENV || 'production').es5;

export default karmaConfigGenerator(webpackConfig, browserstackLaunchersConfig);
