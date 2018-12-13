export default function () {
  return {
    browsers: [
      'bs_iphone5',
      'bs_ipad4',
      'bs_android_galaxy_S5',
      'bs_mac_chrome',
      'bs_mac_firefox',
      'bs_mac_safari',
      'bs_windows_10_IE_edge',
      'bs_windows_10_IE_11',
      'bs_windows_8_1_IE_11',
      'bs_windows_10_chrome_66',
      'bs_windows_10_firefox_60'
    ],

    customLaunchers: {
      /**
       * iOS
       */
      bs_iphone5: inheritBase({
        device: 'iPhone 5',
        os: 'ios',
        os_version: '6.0'
      }),
      // Works
      /*bs_ipad2: {
        base: 'BrowserStack',
        device: 'iPad 5th',
        browserName: 'iPad',
        platform: 'MAC',
        os: 'ios',
        os_version: '11.0'
      },*/
      bs_ipad4: inheritBase({
        device: 'iPad 4th',
        browserName: 'iPad',
        platform: 'MAC',
        os: 'ios',
        os_version: '7.0'
      }),

      /**
       * Android
       */
      bs_android_galaxy_S5: inheritBase({
        device: 'Samsung Galaxy S5',
        browserName: 'android',
        platform: 'ANDROID',
        os: 'android',
        os_version: '4.4'
      }),

      /**
       * Mac OS X
       */
      bs_mac_chrome: inheritBase({
        browser: 'chrome',
        browser_version: '66.0',
        os: 'OS X',
        os_version: 'Sierra'
      }),
      bs_mac_firefox: inheritBase({
        browser: 'firefox',
        browser_version: '63.0',
        os: 'OS X',
        os_version: 'Sierra'
      }),
      bs_mac_safari: inheritBase({
        browser: 'safari',
        browser_version: '9.1',
        os: 'OS X',
        os_version: 'El Capitan'
      }),

      /**
       * Windows
       */
      bs_windows_10_IE_edge: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'Edge'
      }),
      bs_windows_10_IE_11: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'IE',
        browser_version: '11',
      }),
      bs_windows_8_1_IE_11: inheritBase({
        os: 'Windows',
        os_version: '8.1',
        browser: 'IE',
        browser_version: '11',
      }),
      bs_windows_10_chrome_66: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: '66.0'
      }),
      bs_windows_10_firefox_60: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'firefox',
        browser_version: '60.0'
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
