require('@babel/register');
const APP_PORT = 3000;
nightwatch_config = {
  app_port: APP_PORT,
  src_folders: ['src/tests/spec'],
  live_output: true,

  selenium: {
    start_process: false,
    host: 'hub-cloud.browserstack.com',
    port: 80,
  },

  common_capabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USER,
    'browserstack.key': process.env.BROWSERSTACK_KEY,
    'browserstack.debug': true,
    'browserstack.local': true,
  },

  test_runner: {
    type: 'mocha',
    options: {
      ui: 'bdd',
      reporter: 'spec',
    },
  },

  test_settings: {
    default: {
      launch_url: `http://localhost:${APP_PORT}/`,
    },
    chrome: {
      desiredCapabilities: {
        browser: 'chrome',
      },
    },
    firefox: {
      desiredCapabilities: {
        browser: 'firefox',
      },
    },
    safari: {
      desiredCapabilities: {
        browser: 'safari',
      },
    },
  },
};

// Code to support common capabilites
for (let i in nightwatch_config.test_settings) {
  let config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for (let j in nightwatch_config.common_capabilities) {
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
  }
}

module.exports = nightwatch_config;
