// https://www.browserstack.com/automate/capabilities

export default function() {
  return {
    browsers: [
      // 'bs_iphone_xs',
      // 'bs_nexus_5',
      'bs_mac_chrome',
      'bs_mac_firefox',
      'bs_mac_safari',
      'bs_windows_10_IE_edge',
      'bs_windows_10_chrome',
      'bs_windows_10_firefox'
    ],

    customLaunchers: {
      /**
       * iOS
       */
      // bs_iphone_xs: inheritBase({
      //   device: 'iPhone XS Max',
      //   os: 'ios',
      //   os_version: '12.0'
      // }),

      /**
       * Android
       */
      // bs_nexus_5: inheritBase({
      //   device: 'Google Nexus 5',
      //   platform: 'ANDROID',
      //   os: 'android',
      //   os_version: '5.0'
      // }),

      /**
       * OS X
       */
      bs_mac_chrome: inheritBase({
        browser: 'chrome',
        browser_version: '75.0',
        os: 'OS X',
        os_version: 'Mojave'
      }),
      bs_mac_firefox: inheritBase({
        browser: 'firefox',
        browser_version: '66.0',
        os: 'OS X',
        os_version: 'Mojave'
      }),
      bs_mac_safari: inheritBase({
        browser: 'safari',
        browser_version: '12',
        os: 'OS X',
        os_version: 'Mojave'
      }),

      /**
       * Windows
       */
      bs_windows_10_IE_edge: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'Edge',
        browser_version: '18'
      }),
      bs_windows_10_chrome: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: '75.0'
      }),
      bs_windows_10_firefox: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'firefox',
        browser_version: '67.0'
      })
    }
  };
}

function inheritBase(obj) {
  return {
    base: 'BrowserStack',
    ...obj
  };
}
