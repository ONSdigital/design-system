require('@babel/register');
const request = require('request');
const Services = {};

const nightwatchConfig = {
  src_folders: ['./src/tests/spec'],
  output_folder: './src/tests/reports',

  test_settings: {
    default: {
      end_session_on_fail: false,
      disable_error_log: false,
      launch_url: `http://localhost`,
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      desiredCapabilities: {
        'browserstack.user': process.env.BROWSERSTACK_USER,
        'browserstack.key': process.env.BROWSERSTACK_KEY,
        'browserstack.local': true,
        browserName: process.env.BROWSER || 'chrome',
        browser: process.env.BROWSER || 'Chrome',
        chromeOptions: {},
      },

      webdriver: {
        start_process: true,
        port: 9515,
        server_path: Services.chromedriver ? Services.chromedriver.path : '',
        cli_args: [
          // --verbose
        ],
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

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // This tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: false,
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ],
        },
      },

      webdriver: {
        start_process: true,
        port: 9515,
        server_path: Services.chromedriver ? Services.chromedriver.path : '',
        cli_args: [
          // --verbose
        ],
      },
    },

    headless: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless', '--no-sandbox'],
        },
      },
    },
  },
};

nightwatchConfig.test_runner = {
  type: 'mocha',
  options: {
    ui: 'bdd',
    reporter: 'spec',
  },
};

nightwatchConfig.selenium = {
  start_process: false,
  host: 'hub-cloud.browserstack.com',
  port: 80,
};

const defaultTestSettings = nightwatchConfig.test_settings.default;
defaultTestSettings.selenium_host = nightwatchConfig.selenium.host;
defaultTestSettings.selenium_port = nightwatchConfig.selenium.port;

module.exports = nightwatchConfig;
