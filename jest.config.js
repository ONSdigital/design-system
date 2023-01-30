/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  preset: process.env.TEST_WITH_PUPPETEER ? 'jest-puppeteer' : undefined,
  snapshotResolver: `${process.cwd()}/src/tests/helpers/snapshotResolver.js`,
};

module.exports = config;
