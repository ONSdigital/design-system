// https://www.lambdatest.com/capabilities-generator/

const base = {
  base: 'WebDriver',
  config: {
    hostname: 'hub.lambdatest.com',
    port: 80,
  },
  name: 'ONS - design-system',
  user: process.env.LT_USERNAME,
  accessKey: process.env.LT_ACCESS_KEY,
  tunnel: true,
};

export default {
  browsers: ['lt_windows_10_IE_11'],

  customLaunchers: {
    /**
     * Windows
     */
    lt_windows_10_IE_11: {
      ...base,
      platformName: 'Windows 10',
      browserName: 'Internet Explorer',
      browserVersion: '11.0',
      'ie.compatibility': 11001,
    },
  },
};
