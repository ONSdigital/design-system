module.exports = {
  framework: 'mocha+chai',
  parallel: 5,
  port: 7000,
  timeout: 600,
  browser_start_timeout: 90,
  on_start: './saucie-connect.js',
  on_exit: './saucie-disconnect.js',
  serve_files: ['build/scripts/main.js', 'build/scripts/tests.js'],
  routes: {
    '/browser-source-map-support.js': 'node_modules/source-map-support/browser-source-map-support.js',
  },
  test_page: 'src/tests/tests.mustache',

  launch_in_dev: ['chrome'],
  launch_in_ci: ['bs_windows_10_chrome'],

  launchers: {
    bs_windows_10_chrome: {
      exe: './node_modules/.bin/saucie',
      args: ['-b', 'chrome', '-p', 'Windows 10', '-v', 'latest', '--no-connect', '--attach', '-u'],
      protocol: 'browser',
    },
  },
};
