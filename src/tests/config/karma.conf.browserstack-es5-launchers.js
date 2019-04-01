export default function() {
  return {
    browsers: ['bs_ipad_air_2', 'bs_android_galaxy_S5_mini', 'bs_mac_safari', 'bs_windows_10_IE_edge', 'bs_windows_10_IE_11'],

    customLaunchers: {
      /**
       * iOS
       */
      bs_iphone_6S: inheritBase({
        device: 'iPhone 6S',
        os: 'ios',
        os_version: '9.1',
        real_mobile: false
      }),
      bs_ipad_air_2: inheritBase({
        device: 'iPad Air 2',
        browserName: 'iPad',
        platform: 'MAC',
        os: 'ios',
        os_version: '9.1'
      }),

      /**
       * Android
       */
      bs_android_galaxy_S5_mini: inheritBase({
        device: 'Samsung Galaxy S5 Mini',
        browserName: 'android',
        platform: 'ANDROID',
        os: 'android',
        os_version: '4.4'
      }),

      /**
       * OS X
       */
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
        browser: 'Edge',
        browser_version: '15'
      }),
      bs_windows_10_IE_11: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'IE',
        browser_version: '11'
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
