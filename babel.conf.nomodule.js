module.exports = {
  babelrc: false,
  plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie 11'],
        },
      },
    ],
  ],
};
