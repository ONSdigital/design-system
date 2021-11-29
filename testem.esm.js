module.exports = {
  framework: 'mocha+chai',
  parallel: 5,
  port: 1337,
  timeout: 1200,
  browser_start_timeout: 2000,
  disable_watching: true,
  browser_disconnect_timeout: 120,
  serve_files: ['build/scripts/main.js', 'build/scripts/tests.js'],
  routes: {
    '/browser-source-map-support.js': 'node_modules/source-map-support/browser-source-map-support.js',
  },
  test_page: 'src/tests/tests.mustache',

  launch_in_dev: ['chrome'],
  launch_in_ci: ['bs_windows_10_chrome'],

  on_start: {
    command: "kill -9 $(ps -A | grep BrowserStackLocal | grep -v grep | cut -d ' ' -f2); node start-BrowserStackLocal.js &",
    wait_for_text: 'Tunnel started',
    wait_for_text_timeout: 300000,
  },

  on_exit: 'node stop-BrowserStackLocal.js `cat browserStackLocal.pid`; rm -f browserStackLocal.pid',

  launchers: {
    bs_windows_10_chrome: {
      exe: './ci/tests/browserstack.js',
      args: ['Windows', '10', 'chrome', 'latest', ''],
      protocol: 'browser',
    },
  },
};
