module.exports = {
  framework: 'mocha+chai',

  serve_files: ['build/scripts/main.js', 'build/scripts/tests.js'],
  routes: {
    '/browser-source-map-support.js': 'node_modules/source-map-support/browser-source-map-support.js',
  },

  test_page: 'src/tests/tests.mustache',

  launch_in_dev: ['chrome'],
  launch_in_ci: ['bs_mac_safari', 'bs_windows_10_IE_edge', 'bs_windows_10_chrome'],

  parallel: 5,
  on_start: {
    command: "kill -9 $(ps -A | grep BrowserStackLocal | grep -v grep | cut -d ' ' -f2); node start-BrowserStackLocal.js &",
    wait_for_text: 'Tunnel started',
    wait_for_text_timeout: 300000,
  },
  on_exit: 'node stop-BrowserStackLocal.js `cat browserStackLocal.pid`; rm browserStackLocal.pid',

  launchers: {
    bs_iphone_11_pro: {
      command: "node run_on_browserstack.js ios 13 nil nil 'iPhone 11 Pro' <url>",
      protocol: 'browser',
    },

    bs_google_pixel_4: {
      command: "node run_on_browserstack.js android 11.0 nil nil 'Google Pixel 4' <url>",
      protocol: 'browser',
    },

    bs_mac_safari: {
      command: "node run_on_browserstack.js 'OS X' 'Catalina' safari 13.0 nil <url>",
      protocol: 'browser',
    },

    bs_windows_10_IE_edge: {
      command: 'node run_on_browserstack.js Windows 10 Edge latest nil <url>',
      protocol: 'browser',
    },

    bs_windows_10_chrome: {
      command: 'node run_on_browserstack.js Windows 10 Chrome latest nil <url>',
      protocol: 'browser',
    },
  },
};
