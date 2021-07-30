// https://saucelabs.com/platform/platform-configurator#/

export default {
  browsers: [
    'sl_iphone_11_simulator',
    'sl_google_android_emulator',
    'sl_mac_chrome',
    'sl_mac_safari',
    'sl_windows_10_IE_edge',
    'sl_windows_10_chrome',
  ],

  customLaunchers: {
    /**
     * iOS
     */
    sl_iphone_11_simulator: {
      base: 'SauceLabs',
      deviceName: 'iPhone 11 Simulator',
      platformVersion: '13.4',
      platformName: 'iOS',
      browserName: 'Safari',
      appiumVersion: '1.17.1',
      deviceOrientation: 'portrait',
    },

    /**
     * Android
     */
    sl_google_android_emulator: {
      base: 'SauceLabs',
      deviceName: 'Android GoogleAPI Emulator',
      platform: 'Android',
      version: '11.0',
      browserName: 'chrome',
      appiumVersion: '1.18.1',
      deviceOrientation: 'portrait',
    },

    /**
     * OS X
     */
    sl_mac_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'macOS 10.15',
    },
    sl_mac_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      browserVersion: '13.1',
      platformName: 'macOS 10.15',
    },

    /**
     * Windows
     */
    sl_windows_10_IE_edge: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      browserVersion: 'latest',
      platformName: 'Windows 10',
    },
    sl_windows_10_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'Windows 10',
    },
  },
};
