// https://www.browserstack.com/automate/capabilities

export default function() {
  return {
    browsers: [
      'bs_iphone_11_pro',
      'bs_google_pixel_4',
      'bs_mac_chrome',
      // 'bs_mac_firefox',
      'bs_mac_safari',
      'bs_windows_10_IE_edge',
      'bs_windows_10_chrome',
      // 'bs_windows_10_firefox',
    ],

    customLaunchers: {
      /**
       * iOS
       */
      bs_iphone_11_pro: inheritBase({
        device: 'iPhone 11 Pro',
        os: 'ios',
        os_version: '13',
        real_mobile: true,
      }),

      /**
       * Android
       */
      bs_google_pixel_4: inheritBase({
        device: 'Google Pixel 4',
        os: 'android',
        os_version: '11.0',
        real_mobile: true,
      }),

      /**
       * OS X
       */
      bs_mac_chrome: inheritBase({
        browser: 'chrome',
        browser_version: 'latest',
        os: 'OS X',
        os_version: 'Catalina',
      }),
      // bs_mac_firefox: inheritBase({
      //   browser: 'firefox',
      //   browser_version: '70.0',
      //   os: 'OS X',
      //   os_version: 'High Sierra',
      // }),
      bs_mac_safari: inheritBase({
        browser: 'safari',
        browser_version: '13.0',
        os: 'OS X',
        os_version: 'Catalina',
      }),

      /**
       * Windows
       */
      bs_windows_10_IE_edge: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'Edge',
        browser_version: 'latest',
      }),
      bs_windows_10_chrome: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: 'latest',
      }),
      // bs_windows_10_firefox: inheritBase({
      //   os: 'Windows',
      //   os_version: '10',
      //   browser: 'firefox',
      //   browser_version: '56.0',
      // }),
    },
  };
}

function inheritBase(obj) {
  return {
    base: 'BrowserStack',
    ...obj,
  };
}
