import browserSync from 'browser-sync';
import browserify from 'browserify';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gulpPostCss from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import gulpSvg from 'gulp-svgo';
import gulpTerser from 'gulp-terser';
import sass from 'node-sass';
import nodeSassGlobImporter from 'node-sass-glob-importer';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

import nunjucksRendererPipe from './lib/rendering/nunjucks-renderer-pipe.js';
import postCssPlugins from './postcss.config.js';
import svgConfig from './svgo-config.js';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const babelOptions = {
  babelrc: false,
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    'rewiremock/babel',
  ],
};

const babelFallbackPresets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['ie 11'],
      },
    },
  ],
];

const babelModernPresets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['last 2 Chrome versions', 'Safari >= 12', 'iOS >= 10.3', 'last 2 Firefox versions', 'last 2 Edge versions'],
      },
    },
  ],
];

const terserOptions = {
  compress: {
    drop_console: true,
  },
};

const sassCompiler = gulpSass(sass);
const sassOptions = {
  importer: nodeSassGlobImporter(),
  includePaths: ['./node_modules/normalize-scss/sass', './mode_modules/prismjs/themes'],
};

const scripts = [
  {
    entryPoint: ['./src/js/public-path-override.js', './src/js/polyfills/index.js', './src/js/main.js'],
    outputFile: 'main.js',
    presets: babelFallbackPresets,
  },
  {
    entryPoint: ['./src/js/public-path-override.js', './src/js/polyfills/index.js', './src/js/main.js'],
    outputFile: 'main.es5.js',
    presets: babelModernPresets,
  },
  {
    entryPoint: './src/js/patternlib/index.js',
    outputFile: 'patternlib.js',
    presets: babelFallbackPresets,
  },
  {
    entryPoint: './src/js/patternlib/index.js',
    outputFile: 'patternlib.es5.js',
    presets: babelModernPresets,
  },
];

gulp.task('clean', () => {
  return Promise.resolve();
});

function createBuildScriptTask({ entryPoint, outputFile, presets }) {
  const taskName = `buildScript:${outputFile}`;
  gulp.task(taskName, () => {
    return browserify(entryPoint)
      .transform('babelify', { ...babelOptions, presets })
      .bundle()
      .pipe(source(outputFile))
      .pipe(buffer())
      .pipe(gulpIf(isProduction, gulpTerser(terserOptions)))
      .pipe(gulp.dest('./build/scripts'))
      .pipe(browserSync.stream());
  });
  return taskName;
}

gulp.task('buildScript', gulp.series(...scripts.map(createBuildScriptTask)));

gulp.task('buildStyles', () => {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sassCompiler(sassOptions).on('error', sassCompiler.logError))
    .pipe(gulpIf(isProduction, gulpPostCss(postCssPlugins())))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

gulp.task('buildSvg', () => {
  return gulp
    .src('./src/svg/**/*.svg')
    .pipe(gulpSvg(svgConfig))
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream());
});

gulp.task('buildPages', () => {
  const sources = ['./src/components/**/[^_]*.njk', './src/pages/**/[^_]*.njk'];

  return gulp
    .src(sources)
    .pipe(nunjucksRendererPipe)
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-static-files', () => {
  return gulp.src('./src/static/**/*').pipe(gulp.dest('./build'));
});

gulp.task('watch-and-build', async () => {
  browserSync.init({
    proxy: 'localhost:3010',
  });

  gulp.watch('./src/**/*.njk').on('change', browserSync.reload);
  gulp.watch('./src/**/*.scss', gulp.series('buildStyles'));
  gulp.watch('./src/**/*.js', gulp.series('buildScript'));
  gulp.watch('./src/svg/**/*.svg', gulp.series('buildSvg'));
});

gulp.task('startDevServer', async () => {
  await import('./lib/dev-server.js');
});

gulp.task('start', gulp.series('buildScript', 'buildStyles', 'buildSvg', 'watch-and-build', 'startDevServer'));
gulp.task('watch', gulp.series('watch-and-build', 'startDevServer'));
gulp.task('build', gulp.series('copy-static-files', 'buildScript', 'buildStyles', 'buildSvg', 'buildPages'));
