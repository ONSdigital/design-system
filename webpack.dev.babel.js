import * as path from 'path';
import * as os from 'os';
import merge from 'webpack-merge';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import chalk from 'chalk';

import commonConfig from './webpack.common';

const port = process.env.PATTERN_LIB_PORT || 3030;
const common = commonConfig('development');

function getIP() {
  const interfaces = os.networkInterfaces();
  let interfaceArray = [];

  for (let key in interfaces) {
    if (interfaces.hasOwnProperty(key)) {
      interfaceArray = interfaceArray.concat(interfaces[key]);
    }
  }

  const _interface = interfaceArray.filter(_interface => _interface.family === 'IPv4' && _interface.address !== '127.0.0.1')[0];

  return _interface ? _interface.address : 'localhost';
}

const serverSettings = {
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: false,
    disableHostCheck: true,
    port,
    after: function() {
      setTimeout(() => {
        console.log(chalk.blue.bold('======================================='));
        console.log(chalk.bold.cyan('Server started'));
        console.log(`${chalk.bold.cyan('Local:')} ${chalk.bold.green(`http://localhost:${port}`)}`);
        console.log(`${chalk.bold.cyan('Remote:')} ${chalk.bold.green(`http://${getIP()}:${port}`)}`);
        console.log(chalk.blue.bold('======================================='));
      }, 2000);
    },
    stats: 'errors-only',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  plugins: [new LiveReloadPlugin()],
};

export default [
  merge(common.assets, serverSettings),
  merge(common.patternLibAssets, serverSettings),
  merge(common.templates, serverSettings),
  merge(common.es2015plus, serverSettings),
  merge(common.es5, serverSettings),
  merge(common.es2015plusPatternLib, serverSettings),
  merge(common.es5PatternLib, serverSettings),
];
