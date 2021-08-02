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
  browsers: ['lt_iphone_11_pro', 'lt_google_pixel_4', 'lt_mac_chrome', 'lt_mac_safari', 'lt_windows_10_IE_edge', 'lt_windows_10_chrome'],

  customLaunchers: {
    /**
     * iOS
     */
    lt_iphone_11_pro: {
      ...base,
      platformName: 'iOS',
      deviceName: 'iPhone 11',
      platformVersion: '13.6',
      appiumVersion: '1.17.1',
      browserName: 'Safari',
    },

    /**
     * Android
     */
    lt_google_pixel_4: {
      ...base,
      platformName: 'Android',
      deviceName: 'Google Pixel 4',
      platformVersion: '11',
      browserName: 'Chrome',
    },

    /**
     * OS X
     */
    lt_mac_chrome: {
      ...base,
      platformName: 'MacOS Catalina',
      browserName: 'Chrome',
      browserVersion: '91.0',
    },
    lt_mac_safari: {
      ...base,
      platformName: 'MacOS Catalina',
      browserName: 'Safari',
      browserVersion: '13.0',
    },

    /**
     * Windows
     */
    lt_windows_10_IE_edge: {
      ...base,
      platformName: 'Windows 10',
      browserName: 'MicrosoftEdge',
      browserVersion: '92.0',
    },
    lt_windows_10_chrome: {
      ...base,
      platformName: 'Windows 10',
      browserName: 'Chrome',
      browserVersion: '92.0',
    },
  },
};
