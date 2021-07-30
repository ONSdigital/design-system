// https://saucelabs.com/platform/platform-configurator#/

export default {
  browsers: ['sl_windows_10_IE_11'],

  customLaunchers: {
    /**
     * Windows
     */
    sl_windows_10_IE_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 10',
    },
  },
};
