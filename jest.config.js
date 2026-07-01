/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    preset: process.env.TEST_WITH_PUPPETEER ? 'jest-puppeteer' : undefined,
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
