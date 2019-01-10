export default function() {
  return {
    browsers: [
      // 'bs_android_nexus_5',
      'bs_mac_chrome',
      'bs_mac_firefox',
      'bs_mac_safari',
      'bs_windows_10_IE_edge',
      'bs_windows_10_chrome_71',
      'bs_windows_10_firefox_63'
    ],

    customLaunchers: {
      /**
       * iOS
       */

      /**
       * Android
       */
      // bs_android_nexus_5: inheritBase({
      //   device: 'Google Nexus 5',
      //   browserName: 'android',
      //   platform: 'ANDROID',
      //   os: 'android',
      //   os_version: '5.0'
      // }),

      /**
       * OS X
       */
      bs_mac_chrome: inheritBase({
        browser: 'chrome',
        browser_version: '71.0',
        os: 'OS X',
        os_version: 'Mojave'
      }),
      bs_mac_firefox: inheritBase({
        browser: 'firefox',
        browser_version: '63.0',
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
      bs_windows_10_chrome_71: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: '71.0'
      }),
      bs_windows_10_firefox_63: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'firefox',
        browser_version: '63.0'
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
