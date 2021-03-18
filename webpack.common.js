import * as path from 'path';
import merge from 'webpack-merge';
import glob from 'glob';
import globImporter from 'node-sass-glob-importer';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import postcssPlugins from './postcss.config';
import svgoConfig from './svgo-config';

const OUT_DIR = 'build';

const core = {
  context: `${__dirname}/src`,

  output: {
    path: path.join(process.cwd(), OUT_DIR),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.njk', '.html'],
    modules: ['./node_modules'],
    alias: {
      js: path.resolve(__dirname, './src/js'),
      components: path.resolve(__dirname, './src/components'),
      tests: path.resolve(__dirname, './src/tests'),
      stubs: path.resolve(__dirname, './src/tests/stubs'),
    },
  },

  resolveLoader: {
    modules: ['./node_modules'],
  },

  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
  },

  plugins: [
    new ProgressBarPlugin(),

    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false,
    }),
  ],
};

const cssCore = merge(core, {
  module: {
    rules: [
      // Styles
      {
        include: [path.join(process.cwd(), 'src/scss')],
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/[name].css',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: postcssPlugins,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              precision: 8,
              includePaths: [path.join(process.cwd(), 'src/scss')],
              importer: globImporter(),
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new FixStyleOnlyEntriesPlugin({
      extensions: ['scss', 'njk', 'html'],
      silent: true,
    }),
  ],
});

const jsCore = merge(core, {
  output: {
    chunkFilename: 'scripts/[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(njk|html)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: `${__dirname}/src`,
              filters: {
                setAttribute: path.join(__dirname, '/nunjucks.setAttribute.js'),
                setAttributes: path.join(__dirname, '/nunjucks.setAttributes.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        exclude: /(node_modules)/,
        include: [path.join(process.cwd(), 'src/scss')],
        use: [
          'style-loader',
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: postcssPlugins,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              precision: 8,
              includePaths: [path.join(process.cwd(), 'src/scss')],
              importer: globImporter(),
            },
          },
        ],
      },
    ],
  },
});

const es2015plusCore = merge(jsCore, {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: ['last 2 Chrome versions', 'Safari >= 12', 'iOS >= 10.3', 'last 2 Firefox versions', 'last 2 Edge versions'],
                  },
                },
              ],
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
              'rewiremock/babel',
            ],
          },
        },
      },
    ],
  },
});

const es5Core = merge(jsCore, {
  output: {
    filename: '[name].es5.js',
    chunkFilename: 'scripts/[name].es5.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(chai-as-promised)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: ['ie 11'],
                  },
                },
              ],
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
              'rewiremock/babel',
            ],
          },
        },
      },
    ],
  },
});

const scriptsEntry = {
  'scripts/main': ['./js/public-path-override.js', './js/polyfills/index.js', './js/index.js'],
};

const patternLibScriptsEntry = {
  'scripts/patternlib': ['./js/patternlib/index.js'],
};

export default function(mode) {
  const devMode = mode === 'development';

  return {
    assets: merge(cssCore, {
      mode,

      entry: {
        'css/main': ['./scss/main.scss'],
        'css/print': ['./scss/print.scss'],
        'css/census': ['./scss/census.scss'],
      },

      module: {
        rules: [
          {
            test: /\.svg$/,
            use: [
              { loader: 'file-loader' },
              {
                loader: 'svgo-loader',
                options: {
                  plugins: svgoConfig,
                },
              },
            ],
          },
        ],
      },

      plugins: [
        new CopyWebpackPlugin(
          {
            patterns: [
              {
                from: 'fonts/**/*',
                globOptions: {
                  dot: true,
                },
              },
              {
                from: 'img/**/*',
                globOptions: {
                  dot: true,
                },
              },
              {
                from: 'favicons/**/*',
                globOptions: {
                  dot: true,
                },
              },
            ],
          },
          {
            ignore: ['.gitkeep'],
            debug: 'warning',
          },
        ),
      ],
    }),

    patternLibAssets: merge(cssCore, {
      mode,

      entry: {
        'css/patternlib': ['./scss/patternlib.scss'],
        error: ['./scss/error.scss'],
      },
      module: {
        rules: [
          {
            test: /\.svg$/,
            use: [
              { loader: 'file-loader' },
              {
                loader: 'svgo-loader',
                options: {
                  plugins: svgoConfig,
                },
              },
            ],
          },
        ],
      },

      plugins: [
        new CopyWebpackPlugin(
          {
            patterns: [
              {
                from: 'patternlib-img/**/*',
                globOptions: {
                  dot: true,
                },
              },
            ],
          },
          {
            ignore: ['.gitkeep'],
            debug: 'warning',
          },
        ),
      ],
    }),

    templates: merge(core, {
      mode,

      entry: {
        html: glob.sync('./**/*.{njk,html}', { cwd: 'src', ignore: './**/_*.{njk,html}' }),
      },

      module: {
        rules: [
          {
            test: /\.(njk|html)$/,
            loaders: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].html',
                },
              },
              {
                loader: path.resolve('./lib/nunjucks-html-loader.js'),
                options: {
                  searchPaths: `${__dirname}/src`,
                  layoutPath: 'views/layouts',
                  context: {
                    devMode,
                    isPatternLib: true,
                  },
                },
              },
            ],
          },
        ],
      },

      plugins: [
        new FixStyleOnlyEntriesPlugin({
          extensions: ['scss', 'njk', 'html'],
          silent: true,
        }),
      ],
    }),

    es2015plus: merge(es2015plusCore, {
      mode,

      entry: scriptsEntry,
    }),

    es2015plusPatternLib: merge(es2015plusCore, {
      mode,

      entry: patternLibScriptsEntry,
    }),

    es5: merge(es5Core, {
      mode,

      entry: scriptsEntry,
    }),

    es5PatternLib: merge(es5Core, {
      mode,

      entry: patternLibScriptsEntry,
    }),
  };
}
