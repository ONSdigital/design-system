import * as path from 'path';
import * as fs from 'fs';
import glob from 'glob';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import globImporter from 'node-sass-glob-importer';
import { NoEmitOnErrorsPlugin, NamedModulesPlugin } from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
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

export default function (mode) {
  const devMode = mode === 'development';

  return {
    context: `${__dirname}/src`,

    entry: {
      polyfills: ['./js/polyfills.js'],
      bundle: ['./js/index.js'],
      responsive: ['./styles/responsive.scss'],
      patternlib: ['./styles/patternlib.scss'],
      html: glob.sync('./**/*.njk', { cwd: 'src', ignore: './**/_*.njk' })
    },

    output: {
      path: path.join(process.cwd(), OUT_DIR),
      filename: '[name].js',
      chunkFilename: '[id].js'
    },

    resolve: {
      extensions: ['.js', '.njk'],
      modules: ['./node_modules']
    },

    resolveLoader: {
      modules: ['./node_modules']
    },

    module: {
      rules: [
        // Scripts
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [['@babel/preset-env', { modules: false }]]
            }
          }
        },
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
      new NoEmitOnErrorsPlugin(),

      new NamedModulesPlugin(),

      new ProgressPlugin(),

      new CircularDependencyPlugin({
        exclude: /(\\|\/)node_modules(\\|\/)/,
        failOnError: false
      }),

      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),

      new FixStyleOnlyEntriesPlugin(),

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
              glob: 'favicon.ico',
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
  };
}
