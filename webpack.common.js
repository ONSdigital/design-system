import * as path from 'path';
import * as fs from 'fs';
import merge from 'webpack-merge';
import glob from 'glob';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import globImporter from 'node-sass-glob-importer';
import { NoEmitOnErrorsPlugin, NamedModulesPlugin } from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { optimize } from 'webpack';
import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import postcssPlugins from './postcss.config';

const OUT_DIR = 'build';

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(
  process.cwd(),
  'src',
  '$$_gendir',
  'node_modules'
);

const core = {
  context: `${__dirname}/src`,

  output: {
    path: path.join(process.cwd(), OUT_DIR),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.njk'],
    modules: ['./node_modules'],
    alias: {
      js: path.resolve(__dirname, './src/js'),
      components: path.resolve(__dirname, './src/components'),
    }
  },

  resolveLoader: {
    modules: ['./node_modules']
  },

  plugins: [
    new NoEmitOnErrorsPlugin(),

    new NamedModulesPlugin(),

    new ProgressBarPlugin(),

    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false
    })
  ]
};

const jsCore = merge(core, {
  entry: {
    'scripts/polyfills': ['./js/polyfills.js'],
    'scripts/bundle': ['./js/index.js'],
    'scripts/patternlib': ['./js/patternlib/index.js']
  },

  module: {
    rules: [
      {
        test: /\.njk$/,
        exclude: /(node_modules)/,
        loader: 'nunjucks-loader',
        query: {
          root: `${__dirname}/src`
        }
      }
    ]
  },

  plugins: [
    new optimize.SplitChunksPlugin({
      name: ['vendor'],
      minChunks: module => {
        return (
          module.resource &&
          (module.resource.startsWith(nodeModules) ||
            module.resource.startsWith(genDirNodeModules) ||
            module.resource.startsWith(realNodeModules))
        );
      },
      chunks: ['bundle']
    })
  ]
});

export default function (mode) {
  const devMode = mode === 'development';

  return {
    nonJs: merge(core, {
      mode,

      entry: {
        responsive: ['./styles/responsive.scss'],
        patternlib: ['./styles/patternlib.scss'],
        error: ['./styles/error.scss'],
        html: glob.sync('./**/*.njk', { cwd: 'src', ignore: './**/_*.njk' })
      },

      module: {
        rules: [
          // Styles
          {
            include: [path.join(process.cwd(), 'src/styles')],
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  indent: 'postcss',
                  plugins: postcssPlugins
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  precision: 8,
                  includePaths: [path.join(process.cwd(), 'src/styles')],
                  importer: globImporter()
                }
              }
            ]
          },
          // Templates
          {
            test: /\.njk$/,
            loaders: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].html'
                }
              },
              {
                loader: path.resolve('./lib/nunjucks-html-loader.js'),
                options: {
                  searchPaths: `${__dirname}/src`,
                  layoutPath: 'views/layouts',
                  context: {
                    devMode
                  }
                }
              }
            ]
          },
          {
            test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
            loader: 'url-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              limit: 10000
            }
          },
          {
            test: /\.(eot|svg|cur)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              limit: 10000
            }
          }
        ]
      },

      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[name].css'
        }),

        new FixStyleOnlyEntriesPlugin({
          extensions: ['scss', 'njk'],
          silent: true
        }),

        new CopyWebpackPlugin(
          [
            {
              from: {
                glob: 'fonts/**/*',
                dot: true
              }
            },
            {
              from: {
                glob: 'img/**/*',
                dot: true
              }
            },
            {
              from: {
                glob: 'favicons/**/*',
                dot: true
              }
            }
          ],
          {
            ignore: ['.gitkeep'],
            debug: 'warning'
          }
        )
      ]
    }),

    es2015plus: merge(jsCore, {
      mode,

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
                      // useBuiltIns: true,
                      targets: {
                        browsers: [
                          'Chrome >= 60',
                          'Safari >= 10.1',
                          'iOS >= 10.3',
                          'Firefox >= 54',
                          'Edge >= 15'
                        ]
                      }
                    }
                  ]
                ],
                plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime']
              }
            }
          }
        ]
      }
    }),

    es5: merge(jsCore, {
      mode,

      output: {
        filename: '[name].es5.js',
        chunkFilename: '[name].es5.js'
      },

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
                      // useBuiltIns: true,
                      targets: {
                        browsers: ['last 3 versions']
                      }
                    }
                  ]
                ],
                plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime']
              }
            }
          }
        ]
      }
    })
  };
}
