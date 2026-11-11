/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    testTimeout: 10000,
    preset: process.env.TEST_WITH_PUPPETEER ? 'jest-puppeteer' : undefined,
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
    setupFiles: [`${process.cwd()}/src/tests/helpers/jest.setup.js`],
    snapshotResolver: `${process.cwd()}/src/tests/helpers/snapshotResolver.js`,
    modulePathIgnorePatterns: ['templates/components', 'build'],
    transform: {
        '^.+\\.m?js$': [
            'babel-jest',
            {
                babelrc: false,
                configFile: false,
                sourceType: 'unambiguous',
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            bugfixes: true,
                            modules: 'commonjs',
                            targets: {
                                node: 'current',
                            },
                        },
                    ],
                ],
            },
        ],
    },
};

module.exports = config;
