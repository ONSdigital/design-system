module.exports = {
    babelrc: false,
    plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
    global: true,
    ignore: [/node_modules\/.*/],
    sourceType: 'module',
    presets: [
        [
            '@babel/preset-env',
            {
                modules: 'commonjs',
                targets: {
                    browsers: ['ie 11'],
                },
            },
        ],
    ],
};
