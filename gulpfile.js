/*
  Modules
*/
const gulp = require('gulp');
const panini = require('panini');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const path = require('path');

sass.compiler = require('node-sass');

/*
  Tasks
*/
gulp.task('default', gulp.series(build, style, bundle));
gulp.task('watch', gulp.series(build, style, bundle, watch));

/*
  Functions
*/
function build() {
  return gulp
  .src('src/index.html')
  .pipe(
    panini({
      root: 'src/',
      layouts: 'src/',
      partials: 'src/partials',
      data: 'src/data'
    })
  )
  .pipe(
    gulp.dest('./')
  );
}

function style() {
  return gulp
  .src('src/scss/**/*.scss')
  .pipe(
    sass({
      includePaths: [
        './node_modules/foundation-sites/scss',
        './node_modules/motion-ui/src'
      ]
    })
    .on('error', sass.logError)
  )
  .pipe(
    gulp.dest('./')
  );
}

function bundle() {
  return gulp
  .src('src/main.js')
  .pipe(
    webpack({
      mode: 'production',
      output: {
        filename: 'bundle.js'
      }
    })
  )
  .pipe(
    gulp.dest('./')
  )
}

function refresh(done) {
  panini.refresh();
  done();
}

function watch() {
  gulp.watch('src/**/*.html', gulp.series(refresh, build));
  gulp.watch('src/data/**/*.json', gulp.series(refresh, build));
  gulp.watch('src/scss/**/*.scss', gulp.series(style));
  gulp.watch('src/**/*.js', gulp.series(bundle));
}
