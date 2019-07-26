// https://www.browserstack.com/automate/capabilities

export default function() {
  return {
    browsers: ['bs_windows_10_IE_11'],

    customLaunchers: {
      /**
       * Windows
       */
      bs_windows_10_IE_11: inheritBase({
        os: 'Windows',
        os_version: '10',
        browser: 'IE',
        browser_version: '11',
      }),
    },
  };
}

function inheritBase(obj) {
  return {
    base: 'BrowserStack',
    ...obj,
  };
}
