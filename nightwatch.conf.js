require('@babel/register');
const request = require('request');
const seleniumServer = require('selenium-server');

const nightwatchConfig = {
  src_folders: ['./src/tests/spec'],
  output_folder: './src/tests/reports',

  test_settings: {
    default: {
      end_session_on_fail: false,
      disable_error_log: false,
      desiredCapabilities: {
        browserName: 'chrome',
      },

      webdriver: {
        start_process: true,
        server_path: seleniumServer.path,
      },

      globals: {
        waitForConditionTimeout: 15000,
        afterEach(client, done) {
          if (client.currentTest.results.failed > 0) {
            request({
              method: 'PUT',
              uri: `https://api.browserstack.com/automate/sessions/${client.sessionId}.json`,
              auth: {
                user: process.env.BROWSERSTACK_USER,
                pass: process.env.BROWSERSTACK_KEY,
              },
              form: {
                status: 'error',
                reason: '',
              },
            });
            const cliOptions = process.argv.slice(2);
            const envIndex = cliOptions.indexOf('--env');
            const envName = cliOptions[envIndex + 1];

            request({
              method: 'PUT',
              uri: `https://api.browserstack.com/automate/sessions/${client.sessionId}.json`,
              auth: {
                user: process.env.BROWSERSTACK_USER,
                pass: process.env.BROWSERSTACK_KEY,
              },
              form: {
                name: `${envName} env: ${client.currentTest.module}`,
              },
            });
          }
          done();
          client.end();
        },
      },
    },
    test_runner: {
      type: 'mocha',
      options: {
        ui: 'bdd',
        reporter: 'spec',
      },
    },
    'browserstack.local': {
      extends: 'browserstack',
      desiredCapabilities: {
        'browserstack.local': true,
      },
    },
    browserstack: {
      selenium: {
        host: 'hub-cloud.browserstack.com',
        port: 443,
      },
      desiredCapabilities: {
        'bstack:options': {
          // sets BrowserStack's credentials via environment variables
          userName: '${BROWSERSTACK_USER}',
          accessKey: '${BROWSERSTACK_KEY}',
        },
      },
    },
  },
};

module.exports = nightwatchConfig;
