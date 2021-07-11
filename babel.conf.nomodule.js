module.exports = {
  babelrc: false,
  ignore: [/node_modules\/(?!(chai-as-promised)\/).*/],
  plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie 11'],
          esmodules: false,
        },
      },
    ],
  ],
};
