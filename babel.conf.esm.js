module.exports = {
  babelrc: false,
  plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 Chrome versions', 'Safari >= 12', 'iOS >= 10.3', 'last 2 Firefox versions', 'last 2 Edge versions'],
        },
      },
    ],
  ],
};
