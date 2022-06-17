module.exports = {
  browserContext: 'incognito',
  exitOnPageError: false,
  launch: {
    args: [
      // Workaround for the 'No usable sandbox! Update your kernel' error
      // see more https://github.com/Googlechrome/puppeteer/issues/290
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // Workaround for 'ContextResult::kTransientFailure: Failed to send GpuControl.CreateCommandBuffer'
      '--disable-gpu',
    ],
    dumpio: true,
  },
  server: {
    command: `yarn test:start-server`,
    launchTimeout: 30000,
    port: process.env.TEST_PORT,
  },
};
